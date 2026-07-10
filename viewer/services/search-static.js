// search-static.js — serverless-friendly search backend.
//
// Loads the MiniSearch index that was pre-built at deploy time and serves
// ranked queries in ~1ms. Zero native deps, zero filesystem walks, zero
// external processes. This is the backend used on Vercel (and anywhere else
// where the Rust fgr binary or a full KB walk is not viable).
//
// Local dev keeps using pick.js's fgr/walk path — this module only kicks in
// when pick.js decides to call it (see KB_SEARCH_BACKEND / VERCEL env).

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import MiniSearch from "minisearch";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const KB_ROOT = path.resolve(__dirname, "..", "..");

// The builder writes these at deploy time. On Vercel, process.cwd() is the
// deployed function's working directory, which contains public/.
const INDEX_FILE = path.join(KB_ROOT, "public", "search", "index.json");
const DOCS_FILE = path.join(KB_ROOT, "public", "search", "docs.json");

let _mini = null;
let _docs = null;
let _loadPromise = null;

async function ensureLoaded() {
  if (_mini && _docs) return;
  if (_loadPromise) return _loadPromise;
  _loadPromise = (async () => {
    try {
      const [rawIndex, rawDocs] = await Promise.all([
        fs.readFile(INDEX_FILE, "utf8"),
        fs.readFile(DOCS_FILE, "utf8"),
      ]);
      _mini = MiniSearch.loadJSON(rawIndex, {
        fields: ["title", "tags", "body"],
        storeFields: ["path", "title", "group", "snippet", "size"],
        searchOptions: {
          boost: { title: 3, tags: 2 },
          fuzzy: 0.15,
          prefix: true,
        },
      });
      _docs = JSON.parse(rawDocs);
    } catch (e) {
      throw new Error(
        `search-static: failed to load prebuilt index at ${INDEX_FILE}. ` +
          `Did you run 'node scripts/build-search-index.js' (or deploy via Vercel which runs it as buildCommand)? — ${e.message}`
      );
    }
  })();
  return _loadPromise;
}

export async function searchStatic(query, { maxItems = 15 } = {}) {
  await ensureLoaded();
  if (!query || !query.trim()) return { query, hits: [], metrics: { backend: "static", pick_ms: 0 } };
  const t0 = Date.now();
  const raw = _mini.search(query, { combineWith: "AND" });
  // If AND is too strict, fall back to OR
  let results = raw;
  if (results.length < 3) {
    results = _mini.search(query, { combineWith: "OR" });
  }
  const hits = results.slice(0, maxItems).map((r) => ({
    path: r.path,
    group: r.group,
    score: r.score,
    snippet: r.snippet || "",
    size: r.size,
    reason: "minisearch",
  }));
  return {
    query,
    hits,
    metrics: {
      backend: "static",
      pick_ms: Date.now() - t0,
      total_hits: raw.length,
    },
  };
}

export async function isAvailable() {
  try {
    await fs.access(INDEX_FILE);
    return true;
  } catch {
    return false;
  }
}
