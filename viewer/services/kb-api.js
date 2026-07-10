// kb-api.js — the unified surface for the KB.
//
// Every way to interact with a Wany-style KB (CLI, MCP, A2A, HTTP) calls
// these functions. Nothing else. If a capability isn't exported here, it
// isn't exposed to external integrators — by design, so we have one place
// to audit and evolve the contract.
//
// All paths are relative to KB_ROOT. All writes stay inside KB_ROOT.

import "./env-clean.js"; // strips wrapping quotes from process.env keys
import fs from "fs/promises";
import fssync from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";
import { pick } from "./pick.js";
import { knowledgePrime } from "./knowledge-prime.js";
import { compileRawToWiki, compileRawFile } from "./pack.js";
import {
  listBooks,
  composeBookAboutStream,
  composeBookAbout,
  patchBookMeta,
  clearBookSection,
  generateBookCover,
  generateBookPrologue,
  generateBookIndex,
  generateBookReferences,
  generateBookIdeas,
  loadBookIdeas,
  exploreForMore,
  acceptExploreProposals,
} from "./book.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const KB_ROOT = path.resolve(__dirname, "..", "..");
export const KB_NAME = path.basename(KB_ROOT);
export const KB_DISPLAY_NAME = process.env.KB_DISPLAY_NAME || KB_NAME.replace(/[-_]/g, " ").toUpperCase();
export const KB_CONTEXT_NAME = process.env.KB_CONTEXT_NAME || "Wany";
export const KB_CONTEXT_DESC = process.env.KB_CONTEXT_DESC || "personal knowledge base";

function safeResolve(rel) {
  const abs = path.resolve(KB_ROOT, rel);
  if (!abs.startsWith(KB_ROOT + path.sep) && abs !== KB_ROOT) {
    throw new Error(`path escapes KB_ROOT: ${rel}`);
  }
  return abs;
}

// ─────────────────────────────────────────────────────────────────────
// Meta
// ─────────────────────────────────────────────────────────────────────
export function info() {
  return {
    name: KB_NAME,
    display_name: KB_DISPLAY_NAME,
    context_name: KB_CONTEXT_NAME,
    context_desc: KB_CONTEXT_DESC,
    kb_root: KB_ROOT,
  };
}

export async function stats() {
  async function countMd(dir) {
    let n = 0;
    async function walk(d) {
      let entries;
      try { entries = await fs.readdir(d, { withFileTypes: true }); } catch { return; }
      for (const e of entries) {
        if (e.name.startsWith(".") || e.name === "node_modules") continue;
        const p = path.join(d, e.name);
        if (e.isDirectory()) await walk(p);
        else if (e.name.endsWith(".md")) n++;
      }
    }
    await walk(dir);
    return n;
  }
  const [raw, wiki, ideasCount] = await Promise.all([
    countMd(path.join(KB_ROOT, "raw")),
    countMd(path.join(KB_ROOT, "wiki")),
    countMd(path.join(KB_ROOT, "viz", "ideas")),
  ]);
  const books = await listBooks().catch(() => []);
  return {
    ...info(),
    raw_count: raw,
    wiki_count: wiki,
    ideas_count: ideasCount,
    book_count: books.length,
  };
}

// ─────────────────────────────────────────────────────────────────────
// File operations — read/write/list/search under KB_ROOT
// ─────────────────────────────────────────────────────────────────────

export async function fileRead(relPath) {
  const abs = safeResolve(relPath);
  const raw = await fs.readFile(abs, "utf8");
  let fm = { data: {}, content: raw };
  try { fm = matter(raw); } catch {}
  return {
    path: relPath,
    frontmatter: fm.data || {},
    content: fm.content || raw,
    raw,
    size: raw.length,
  };
}

export async function fileWrite(relPath, content, { createDirs = true } = {}) {
  const abs = safeResolve(relPath);
  if (createDirs) await fs.mkdir(path.dirname(abs), { recursive: true });
  await fs.writeFile(abs, content, "utf8");
  return { path: relPath, size: content.length, written: true };
}

export async function fileDelete(relPath) {
  const abs = safeResolve(relPath);
  await fs.unlink(abs);
  return { path: relPath, deleted: true };
}

export async function fileList({ dir = "", recursive = true, extensions = [".md"] } = {}) {
  const base = safeResolve(dir);
  const out = [];
  async function walk(d, relBase) {
    let entries;
    try { entries = await fs.readdir(d, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (e.name.startsWith(".") || e.name === "node_modules") continue;
      const rel = relBase ? `${relBase}/${e.name}` : e.name;
      const abs = path.join(d, e.name);
      if (e.isDirectory()) {
        if (recursive) await walk(abs, rel);
        continue;
      }
      if (extensions.length && !extensions.includes(path.extname(e.name))) continue;
      const stat = await fs.stat(abs);
      out.push({
        path: path.relative(KB_ROOT, abs),
        name: e.name,
        size: stat.size,
        modified: stat.mtime.toISOString(),
      });
    }
  }
  await walk(base, dir);
  return out;
}

// Structured tree for the whole KB
export async function fileTree() {
  async function walk(dir, base = "") {
    let entries;
    try { entries = await fs.readdir(dir, { withFileTypes: true }); } catch { return []; }
    const out = [];
    for (const e of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      if (e.name.startsWith(".") || e.name === "node_modules") continue;
      const rel = path.join(base, e.name);
      if (e.isDirectory()) {
        out.push({ name: e.name, path: rel, type: "dir", children: await walk(path.join(dir, e.name), rel) });
      } else if (e.name.endsWith(".md")) {
        out.push({ name: e.name, path: rel, type: "file" });
      }
    }
    return out;
  }
  return {
    wiki: await walk(path.join(KB_ROOT, "wiki"), "wiki"),
    raw: await walk(path.join(KB_ROOT, "raw"), "raw"),
    viz: await walk(path.join(KB_ROOT, "viz"), "viz"),
  };
}

// ─────────────────────────────────────────────────────────────────────
// Search, pick, prime
// ─────────────────────────────────────────────────────────────────────

// Lexical + semantic search — returns ranked article refs.
export async function search(query, { maxItems = 15, expand = true } = {}) {
  return pick({ query, maxItems, expand });
}

// Knowledge Prime — full Pick → Pack → Deliver pipeline.
export async function prime(query, { format = "context", maxItems = 8, budgetMs = 1500, noCache = false } = {}) {
  return knowledgePrime({ query, format, maxItems, budgetMs, noCache });
}

// Wikilinks and backlinks
const WIKILINK_RE = /\[\[([^\]]+)\]\]/g;

export async function wikilinks(relPath) {
  const { content } = await fileRead(relPath);
  const out = new Set();
  let m;
  while ((m = WIKILINK_RE.exec(content)) !== null) out.add(m[1].trim());
  return [...out];
}

export async function backlinks(relPath) {
  const targetName = path.basename(relPath, ".md").toLowerCase();
  const files = [
    ...await fileList({ dir: "wiki", recursive: true }),
    ...await fileList({ dir: "raw", recursive: true }),
  ];
  const hits = [];
  for (const f of files) {
    if (f.path === relPath) continue;
    try {
      const { content } = await fileRead(f.path);
      if (new RegExp("\\[\\[" + targetName.replace(/[-]/g, "[ -]") + "\\]\\]", "i").test(content)) {
        hits.push(f.path);
      }
    } catch {}
  }
  return hits;
}

// ─────────────────────────────────────────────────────────────────────
// Compile raw → wiki
// ─────────────────────────────────────────────────────────────────────

export async function compileAll({ maxFiles = 20 } = {}) {
  return compileRawToWiki({
    rawDir: path.join(KB_ROOT, "raw"),
    wikiDir: path.join(KB_ROOT, "wiki"),
    maxFiles,
  });
}

// ─────────────────────────────────────────────────────────────────────
// Books — all book operations
// ─────────────────────────────────────────────────────────────────────

export const books = {
  list: () => listBooks(),
  compose: (topic, { lang = "auto", force = false } = {}) => composeBookAbout({ topic, lang, force }),
  composeStream: (topic, onProgress, { lang = "auto", force = false } = {}) =>
    composeBookAboutStream({ topic, lang, force, onProgress }),
  get: async (slug) => {
    const file = safeResolve(path.join("raw", "books", `${slug}.json`));
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw);
  },
  patch: (slug, meta) => patchBookMeta(slug, meta),
  delete: async (slug) => {
    const booksDir = path.join(KB_ROOT, "raw", "books");
    await fs.unlink(path.join(booksDir, `${slug}.json`)).catch(() => {});
    await fs.unlink(path.join(booksDir, `${slug}.png`)).catch(() => {});
    await fs.rm(path.join(KB_ROOT, "viz", "ideas", "from-books", slug), { recursive: true, force: true }).catch(() => {});
    return { deleted: true, slug };
  },
  clearSection: (slug, section) => clearBookSection(slug, section),
  generateCover: (slug) => generateBookCover(slug),
  generatePrologue: (slug) => generateBookPrologue(slug),
  generateIndex: (slug) => generateBookIndex(slug),
  generateReferences: (slug) => generateBookReferences(slug),
  generateIdeas: (slug, opts = {}) => generateBookIdeas(slug, opts),
  loadIdeas: (slug) => loadBookIdeas(slug),
  explore: (slug, opts = {}) => exploreForMore(slug, opts),
  acceptExplore: (slug, proposals) => acceptExploreProposals(slug, proposals),
};

// ─────────────────────────────────────────────────────────────────────
// Ideas — all .md files under viz/ideas/
// ─────────────────────────────────────────────────────────────────────

export const ideas = {
  list: async () => {
    const ideasDir = path.join(KB_ROOT, "viz", "ideas");
    const out = [];
    async function walk(dir, relBase) {
      let entries;
      try { entries = await fs.readdir(dir, { withFileTypes: true }); } catch { return; }
      for (const e of entries) {
        if (e.name.startsWith(".")) continue;
        const abs = path.join(dir, e.name);
        const rel = relBase ? `${relBase}/${e.name}` : e.name;
        if (e.isDirectory()) { await walk(abs, rel); continue; }
        if (!e.name.endsWith(".md")) continue;
        const raw = await fs.readFile(abs, "utf8").catch(() => "");
        if (!raw) continue;
        let fm = { data: {}, content: raw };
        try { fm = matter(raw); } catch {}
        out.push({
          path: path.relative(KB_ROOT, abs),
          date: fm.data?.date || e.name.replace("ideas-", "").replace(".md", ""),
          concept: fm.data?.concept || "",
          sources: fm.data?.sources || "",
          source_book: fm.data?.source_book || null,
          folder: relBase || null,
          content: fm.content || raw,
        });
      }
    }
    await walk(ideasDir, "");
    out.sort((a, b) => String(b.date).localeCompare(String(a.date)));
    return out;
  },
  get: async (relPath) => fileRead(relPath),
  create: async ({ concept, body, date }) => {
    const d = date || new Date().toISOString().slice(0, 10);
    const slug = String(concept || "idea")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || `idea-${Date.now()}`;
    const rel = `viz/ideas/${d}-${slug}.md`;
    const md = `---\ndate: ${d}\nconcept: ${JSON.stringify(concept)}\nsources: manual\n---\n\n${body || ""}\n`;
    await fileWrite(rel, md);
    return { path: rel };
  },
};

// ─────────────────────────────────────────────────────────────────────
// Nexus (GitNexus) — proxy to local gitnexus server if available.
// ─────────────────────────────────────────────────────────────────────

const NEXUS_URL = process.env.KB_GITNEXUS_URL || "http://localhost:3800";
const USE_STATIC_GRAPH = process.env.VERCEL === "1" || process.env.VERCEL === "true" || process.env.KB_NEXUS_BACKEND === "static";

// When running on Vercel, there is no long-lived gitnexus server to proxy
// to. Load the prebuilt public/nexus/graph.json and answer queries from
// memory using the same helpers the serverless routes use.
let _staticGraphStorePromise = null;
async function staticGraphStore() {
  if (!_staticGraphStorePromise) {
    // Dynamic import so local dev doesn't pay the parse cost for files
    // that may not exist yet.
    _staticGraphStorePromise = import(path.join(KB_ROOT, "api", "nexus", "_graph-store.js"));
  }
  return _staticGraphStorePromise;
}

export const nexus = {
  available: async () => {
    if (USE_STATIC_GRAPH) {
      try {
        const mod = await staticGraphStore();
        await mod.getGraph();
        return true;
      } catch { return false; }
    }
    try {
      const r = await fetch(`${NEXUS_URL}/health`, { signal: AbortSignal.timeout(1500) });
      return r.ok;
    } catch { return false; }
  },
  graph: async () => {
    if (USE_STATIC_GRAPH) {
      const mod = await staticGraphStore();
      return mod.getGraph();
    }
    const r = await fetch(`${NEXUS_URL}/api/graph?repo=${encodeURIComponent(KB_NAME)}`);
    if (!r.ok) throw new Error(`gitnexus /api/graph returned ${r.status}`);
    return r.json();
  },
  query: async (q) => {
    if (USE_STATIC_GRAPH) {
      const mod = await staticGraphStore();
      const nodes = await mod.findNodes(q, 20);
      return { query: q, nodes, processes: [], count: nodes.length };
    }
    const r = await fetch(`${NEXUS_URL}/api/query?repo=${encodeURIComponent(KB_NAME)}&query=${encodeURIComponent(q)}`);
    if (!r.ok) throw new Error(`gitnexus /api/query returned ${r.status}`);
    return r.json();
  },
  context: async (name) => {
    if (USE_STATIC_GRAPH) {
      const mod = await staticGraphStore();
      return mod.getContext(name);
    }
    const r = await fetch(`${NEXUS_URL}/api/context?repo=${encodeURIComponent(KB_NAME)}&name=${encodeURIComponent(name)}`);
    if (!r.ok) throw new Error(`gitnexus /api/context returned ${r.status}`);
    return r.json();
  },
};

// ─────────────────────────────────────────────────────────────────────
// Top-level default export for convenience
// ─────────────────────────────────────────────────────────────────────
export default {
  info,
  stats,
  fileRead,
  fileWrite,
  fileDelete,
  fileList,
  fileTree,
  search,
  prime,
  wikilinks,
  backlinks,
  compileAll,
  books,
  ideas,
  nexus,
  KB_ROOT,
  KB_NAME,
};
