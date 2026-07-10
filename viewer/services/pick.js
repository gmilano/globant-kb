import fs from "fs/promises";
import fssync from "fs";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";
import { fileURLToPath } from "url";

const execFileP = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KB_ROOT = path.resolve(__dirname, "..", "..");
const KB_NAME = path.basename(KB_ROOT);

const FGR = process.env.FGR_PATH || "/Users/gmilano/Projects/fast-grep-rust/target/release/fgr";
// Per-KB index path — without this, every KB queried the same shared index and
// pick() returned paths outside KB_ROOT (relative paths starting with "..").
const FGR_INDEX = process.env.FGR_INDEX || `/tmp/${KB_NAME}-index`;
const FGR_INDEX_EXISTS = fssync.existsSync(FGR_INDEX) && fssync.existsSync(FGR);

const WIKILINK_RE = /\[\[([^\]]+)\]\]/g;

function extractWikilinks(text) {
  const out = new Set();
  let m;
  while ((m = WIKILINK_RE.exec(text)) !== null) out.add(m[1].trim().toLowerCase());
  return [...out];
}

async function walkMarkdown(root) {
  const out = [];
  async function walk(dir) {
    let entries;
    try { entries = await fs.readdir(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (e.name.startsWith(".") || e.name === "node_modules") continue;
      const p = path.join(dir, e.name);
      if (e.isDirectory()) await walk(p);
      else if (e.name.endsWith(".md")) out.push(p);
    }
  }
  await walk(root);
  return out;
}

const EXCLUDE_RE = /\/(node_modules|\.agents|\.graphify|graphify-out|\.git|finetune)\//;

function passesPathFilter(p) {
  if (!p.endsWith(".md") || EXCLUDE_RE.test(p)) return false;
  // Reject anything outside KB_ROOT — protects against shared/stale fgr indexes
  // that return absolute paths belonging to a different KB.
  const abs = path.resolve(p);
  return abs.startsWith(KB_ROOT + path.sep);
}

function tokenize(query) {
  return query
    .toLowerCase()
    .split(/[\s\-_/]+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 3);
}

async function lexicalSearchFgr(query, limit) {
  if (!FGR_INDEX_EXISTS) return [];
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];
  // Run fgr per token, score = number of tokens that matched that file
  const scores = new Map();
  for (const tok of tokens) {
    try {
      const { stdout } = await execFileP(FGR, [tok, KB_ROOT, "--index", FGR_INDEX, "-l"], { timeout: 3000 });
      const hits = stdout.trim().split("\n").filter(passesPathFilter);
      for (const h of hits) scores.set(h, (scores.get(h) || 0) + 1);
    } catch { /* token failed, skip */ }
  }
  // Also try the full phrase — phrase matches score higher
  try {
    const { stdout } = await execFileP(FGR, [query, KB_ROOT, "--index", FGR_INDEX, "-l"], { timeout: 3000 });
    const hits = stdout.trim().split("\n").filter(passesPathFilter);
    for (const h of hits) scores.set(h, (scores.get(h) || 0) + tokens.length);
  } catch { /* phrase failed, skip */ }
  return [...scores.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([p, s]) => ({ path: p, lexScore: s, maxTokens: tokens.length }));
}

async function lexicalSearchFallback(query, limit) {
  const tokens = tokenize(query);
  const q = query.toLowerCase();
  const files = (await walkMarkdown(KB_ROOT)).filter(passesPathFilter);
  const scored = [];
  for (const f of files) {
    const content = (await fs.readFile(f, "utf8").catch(() => "")).toLowerCase();
    if (!content) continue;
    let score = 0;
    for (const tok of tokens) if (content.includes(tok)) score += 1;
    if (content.includes(q)) score += tokens.length;
    if (score > 0) scored.push({ path: f, lexScore: score, maxTokens: tokens.length });
  }
  scored.sort((a, b) => b.lexScore - a.lexScore);
  return scored.slice(0, limit);
}

function buildSnippet(content, query, radius = 2) {
  const lines = content.split("\n");
  const idx = lines.findIndex((l) => l.toLowerCase().includes(query.toLowerCase()));
  if (idx < 0) return lines.slice(0, 4).join("\n");
  return lines.slice(Math.max(0, idx - radius), idx + radius + 2).join("\n");
}

function groupFor(rel) {
  if (rel.startsWith("wiki/concepts")) return "concept";
  if (rel.startsWith("wiki/tools")) return "tool";
  if (rel.startsWith("wiki/research")) return "research";
  if (rel.startsWith("wiki")) return "wiki";
  if (rel.startsWith("raw/research/papers")) return "paper";
  if (rel.startsWith("raw/research/news")) return "news";
  if (rel.startsWith("raw/projects")) return "project";
  if (rel.startsWith("raw/studios")) return "studio";
  return "raw";
}

function recencyBoost(mtime) {
  const days = (Date.now() - mtime) / 86_400_000;
  if (days < 7) return 1.2;
  if (days < 30) return 1.1;
  if (days < 90) return 1.0;
  return 0.9;
}

function groupBoost(group) {
  // prefer compiled wiki over raw for direct hits
  if (group === "concept" || group === "tool") return 1.3;
  if (group === "research" || group === "wiki") return 1.15;
  if (group === "paper" || group === "studio") return 1.05;
  return 1.0;
}

async function expandHit(hitPath, nameIndex, visited) {
  const content = await fs.readFile(hitPath, "utf8").catch(() => "");
  const links = extractWikilinks(content);
  const expanded = [];
  for (const name of links) {
    const normalized = name.replace(/\s+/g, "-");
    const target = nameIndex.get(name) || nameIndex.get(normalized) || nameIndex.get(name.replace(/-/g, " "));
    if (target && !visited.has(target)) expanded.push(target);
  }
  return expanded;
}

async function buildNameIndex() {
  const files = await walkMarkdown(KB_ROOT);
  const idx = new Map();
  for (const f of files) {
    const name = path.basename(f, ".md").toLowerCase();
    idx.set(name, f);
    idx.set(name.replace(/-/g, " "), f);
  }
  return idx;
}

// When KB_SEARCH_BACKEND=static (or on Vercel), use the prebuilt MiniSearch
// index instead of fgr / walkMarkdown. The static path is latency-free on
// serverless cold starts and does not need a Rust binary or a fs walk.
const STATIC_BACKEND = process.env.KB_SEARCH_BACKEND === "static" || process.env.VERCEL === "1" || process.env.VERCEL === "true";

export async function pick({ query, maxItems = 15, budgetMs = 800, expand = true }) {
  const t0 = Date.now();
  const metrics = { pick_ms: 0, stages: {} };

  if (!query || !query.trim()) {
    return { query, hits: [], metrics: { ...metrics, pick_ms: Date.now() - t0 } };
  }

  if (STATIC_BACKEND) {
    try {
      const { searchStatic, isAvailable } = await import("./search-static.js");
      if (await isAvailable()) {
        const res = await searchStatic(query, { maxItems });
        return res;
      }
    } catch (e) {
      // Fall through to the local lexical path if the prebuilt index is missing
      console.warn("[pick] static backend failed:", e.message);
    }
  }

  // Stage 1: lexical (fgr → fallback if sparse)
  const s1 = Date.now();
  let lexHits = [];
  try { lexHits = await lexicalSearchFgr(query, maxItems * 2); }
  catch { /* fgr unavailable */ }
  if (lexHits.length < 3) {
    const fallback = await lexicalSearchFallback(query, maxItems * 2);
    // merge, prefer higher lexScore
    const merged = new Map(lexHits.map((h) => [h.path, h]));
    for (const h of fallback) {
      const existing = merged.get(h.path);
      if (!existing || h.lexScore > existing.lexScore) merged.set(h.path, h);
    }
    lexHits = [...merged.values()].sort((a, b) => b.lexScore - a.lexScore).slice(0, maxItems * 2);
    metrics.stages.fallback_used = true;
  }
  metrics.stages.lexical_ms = Date.now() - s1;

  // Stage 2: score
  const s2 = Date.now();
  const visited = new Set();
  const hits = [];
  for (const lh of lexHits) {
    const abs = lh.path;
    const rel = path.relative(KB_ROOT, abs);
    if (visited.has(rel)) continue;
    visited.add(rel);
    const stat = await fs.stat(abs).catch(() => null);
    if (!stat) continue;
    const content = await fs.readFile(abs, "utf8").catch(() => "");
    const group = groupFor(rel);
    const termCoverage = lh.maxTokens ? lh.lexScore / (lh.maxTokens * 2) : 1.0; // 0..1
    const baseScore = 0.5 + termCoverage;
    const score = baseScore * groupBoost(group) * recencyBoost(stat.mtimeMs);
    hits.push({
      path: rel,
      group,
      score,
      snippet: buildSnippet(content, query),
      reason: "lexical",
      lex_score: lh.lexScore,
      size: content.length,
    });
    if (Date.now() - t0 > budgetMs * 0.6) break;
  }
  metrics.stages.score_ms = Date.now() - s2;

  // Stage 3: expand via wikilinks (1-hop)
  if (expand && hits.length > 0 && Date.now() - t0 < budgetMs * 0.8) {
    const s3 = Date.now();
    const nameIndex = await buildNameIndex();
    const seeds = hits.slice(0, Math.min(5, hits.length));
    const addedPaths = new Set();
    for (const seed of seeds) {
      const absSeed = path.join(KB_ROOT, seed.path);
      const expandedAbs = await expandHit(absSeed, nameIndex, visited);
      for (const abs of expandedAbs) {
        const rel = path.relative(KB_ROOT, abs);
        if (visited.has(rel) || addedPaths.has(rel)) continue;
        addedPaths.add(rel);
        const stat = await fs.stat(abs).catch(() => null);
        if (!stat) continue;
        const content = await fs.readFile(abs, "utf8").catch(() => "");
        const group = groupFor(rel);
        const score = 0.7 * groupBoost(group) * recencyBoost(stat.mtimeMs);
        hits.push({
          path: rel,
          group,
          score,
          snippet: content.split("\n").slice(0, 6).join("\n"),
          reason: `expand:${seed.path}`,
          size: content.length,
        });
      }
      if (Date.now() - t0 > budgetMs * 0.95) break;
    }
    metrics.stages.expand_ms = Date.now() - s3;
  }

  // Stage 4: rank + truncate
  hits.sort((a, b) => b.score - a.score);
  const ranked = hits.slice(0, maxItems);

  metrics.pick_ms = Date.now() - t0;
  metrics.total_hits = ranked.length;
  return { query, hits: ranked, metrics };
}
