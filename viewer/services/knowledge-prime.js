import { anthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { pick } from "./pick.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KB_ROOT = path.resolve(__dirname, "..", "..");

const MODEL = process.env.KB_PRIME_MODEL || "claude-sonnet-4-6";
const MAX_CONTENT_CHARS = Number(process.env.KB_PRIME_MAX_CHARS || 4000);

// ── Cache (in-memory LRU, swap for Upstash in Vercel) ──────────────────────
const CACHE_MAX = 200;
const CACHE_TTL_MS = 24 * 3600 * 1000;
const _cache = new Map();

function cacheGet(key) {
  const entry = _cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.t > CACHE_TTL_MS) { _cache.delete(key); return null; }
  _cache.delete(key); _cache.set(key, entry); // LRU touch
  return entry.v;
}
function cacheSet(key, v) {
  _cache.set(key, { t: Date.now(), v });
  if (_cache.size > CACHE_MAX) {
    const oldest = _cache.keys().next().value;
    _cache.delete(oldest);
  }
}
export function cacheStats() {
  return { size: _cache.size, max: CACHE_MAX, ttl_ms: CACHE_TTL_MS };
}

// ── Schemas per format ─────────────────────────────────────────────────────
const ContextBundleSchema = z.object({
  summary: z.string().describe("Resumen ejecutivo en 2-3 oraciones respondiendo la query"),
  key_points: z.array(z.string()).describe("Bullets con los hechos clave (5-10)"),
  sources: z.array(z.object({
    path: z.string(),
    relevance: z.string().describe("Por qué este source es relevante, 1 oración"),
  })),
  related_concepts: z.array(z.string()).describe("Otros conceptos relacionados a explorar"),
});

const BriefSchema = z.object({
  title: z.string(),
  tldr: z.string(),
  sections: z.array(z.object({
    heading: z.string(),
    body: z.string(),
  })),
  sources: z.array(z.string()),
});

const AgentPromptSchema = z.object({
  system_prompt: z.string().describe("System prompt listo para inyectar en un agente, con el contexto relevante embebido"),
  sources_cited: z.array(z.string()),
});

const FORMATS = {
  context: { schema: ContextBundleSchema, instructions: "Genera un bundle de contexto estructurado." },
  brief: { schema: BriefSchema, instructions: "Genera un brief tipo wiki: título, TL;DR, secciones." },
  "agent-prompt": { schema: AgentPromptSchema, instructions: "Genera un system prompt listo para inyectar en un agente con el contexto relevante ya embebido." },
};

// ── Core ───────────────────────────────────────────────────────────────────
function hashKey(query, hitPaths, format) {
  const h = crypto.createHash("sha256");
  h.update(query);
  h.update("|");
  h.update([...hitPaths].sort().join(","));
  h.update("|");
  h.update(format);
  return h.digest("hex").slice(0, 32);
}

async function readHitContent(hits) {
  const chunks = [];
  for (const h of hits) {
    const abs = path.join(KB_ROOT, h.path);
    const content = await fs.readFile(abs, "utf8").catch(() => "");
    chunks.push({
      path: h.path,
      group: h.group,
      content: content.slice(0, MAX_CONTENT_CHARS),
    });
  }
  return chunks;
}

function renderPackPrompt(query, chunks, instructions) {
  const sources = chunks.map((c, i) =>
    `### Source ${i + 1} — [${c.group}] ${c.path}\n\n${c.content}\n`
  ).join("\n---\n\n");
  return `Eres el "Pack service" del Knowledge Fulfillment Center de Wany.

## Query del agente
${query}

## Sources recuperados (ya filtrados por el Pick service)

${sources}

## Tarea
${instructions}

Responde SOLO citando información presente en los sources. Si un source no es relevante, omitilo de tu respuesta. No inventes datos.`;
}

export async function knowledgePrime({
  query,
  format = "context",
  maxItems = 8,
  budgetMs = 1500,
  noCache = false,
}) {
  if (!FORMATS[format]) throw new Error(`Unknown format: ${format}. Valid: ${Object.keys(FORMATS).join(", ")}`);
  if (!process.env.ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY not set");

  const t0 = Date.now();
  const metrics = { stages: {} };

  // PICK
  const s1 = Date.now();
  const picked = await pick({ query, maxItems, budgetMs: Math.min(400, budgetMs * 0.3) });
  metrics.stages.pick_ms = Date.now() - s1;
  metrics.pick_hits = picked.hits.length;

  if (picked.hits.length === 0) {
    metrics.total_ms = Date.now() - t0;
    return { query, format, result: null, cached: false, metrics, sources: [] };
  }

  // CACHE lookup
  const key = hashKey(query, picked.hits.map((h) => h.path), format);
  if (!noCache) {
    const cached = cacheGet(key);
    if (cached) {
      metrics.total_ms = Date.now() - t0;
      metrics.cache_hit = true;
      return { query, format, result: cached, cached: true, metrics, sources: picked.hits };
    }
  }

  // READ
  const s2 = Date.now();
  const chunks = await readHitContent(picked.hits);
  metrics.stages.read_ms = Date.now() - s2;

  // PACK (LLM)
  const s3 = Date.now();
  const { schema, instructions } = FORMATS[format];
  const prompt = renderPackPrompt(query, chunks, instructions);
  const { object } = await generateObject({
    model: anthropic(MODEL),
    schema,
    prompt,
    maxTokens: 2048,
  });
  metrics.stages.pack_ms = Date.now() - s3;

  cacheSet(key, object);
  metrics.total_ms = Date.now() - t0;
  metrics.cache_hit = false;

  return { query, format, result: object, cached: false, metrics, sources: picked.hits };
}
