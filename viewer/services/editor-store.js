// editor-store.js — Vercel-friendly store for in-flight editor content
// and remote-cursor presence.
//
// Backed by Upstash Redis (the Vercel KV provider) when the env vars are
// set, otherwise an in-memory Map for local dev. Both implementations share
// the same API so the serverless endpoints don't care which is in use.
//
// Keys:
//   content:<path>     — latest draft content (TTL 1h, bumped on every write)
//   version:<path>     — monotonically-increasing version counter
//   cursors:<path>     — hash of { userId → { label, line, ch, color, ts } }
//   dirty:paths        — set of paths that have unflushed content
//
// Required env (on Vercel):
//   KV_REST_API_URL       — from your Upstash Redis add-on
//   KV_REST_API_TOKEN     — same
// The @upstash/redis client reads these automatically via Redis.fromEnv().

const DRAFT_TTL_S = 60 * 60; // 1h
const CURSOR_TTL_S = 15;

let _client = null;
let _memory = null;

async function client() {
  if (_client) return _client;
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const { Redis } = await import("@upstash/redis");
    _client = Redis.fromEnv();
    return _client;
  }
  // Local dev fallback: in-memory
  if (!_memory) _memory = new Map();
  const memHashes = new Map(); // for hash-like ops
  _client = {
    async get(k) { return _memory.get(k) || null; },
    async set(k, v, opts) {
      _memory.set(k, v);
      if (opts?.ex) setTimeout(() => _memory.delete(k), opts.ex * 1000);
      return "OK";
    },
    async del(k) { const had = _memory.has(k); _memory.delete(k); return had ? 1 : 0; },
    async incr(k) { const v = (parseInt(_memory.get(k) || "0", 10) || 0) + 1; _memory.set(k, v); return v; },
    async sadd(k, m) {
      const set = _memory.get(k) || new Set();
      set.add(m);
      _memory.set(k, set);
      return 1;
    },
    async srem(k, m) {
      const set = _memory.get(k);
      if (!set) return 0;
      set.delete(m);
      return 1;
    },
    async smembers(k) {
      const set = _memory.get(k);
      return set ? [...set] : [];
    },
    async hset(k, obj) {
      const h = memHashes.get(k) || {};
      Object.assign(h, obj);
      memHashes.set(k, h);
      return Object.keys(obj).length;
    },
    async hgetall(k) { return memHashes.get(k) || {}; },
    async hdel(k, f) {
      const h = memHashes.get(k);
      if (!h) return 0;
      const had = f in h;
      delete h[f];
      return had ? 1 : 0;
    },
    async expire(k, s) {
      setTimeout(() => { _memory.delete(k); memHashes.delete(k); }, s * 1000);
      return 1;
    },
  };
  return _client;
}

// ── Draft content ────────────────────────────────────────────────────

export async function getDraft(filePath) {
  const c = await client();
  const [content, versionRaw] = await Promise.all([
    c.get(`content:${filePath}`),
    c.get(`version:${filePath}`),
  ]);
  if (content == null) return null;
  return { content: String(content), version: Number(versionRaw) || 0 };
}

export async function saveDraft(filePath, content, { userId } = {}) {
  const c = await client();
  const version = await c.incr(`version:${filePath}`);
  // Upstash takes TTL via the `ex` option
  await c.set(`content:${filePath}`, content, { ex: DRAFT_TTL_S });
  await c.sadd("dirty:paths", filePath);
  return { version, savedAt: new Date().toISOString(), savedBy: userId || null };
}

export async function clearDraft(filePath) {
  const c = await client();
  await c.del(`content:${filePath}`);
  await c.del(`version:${filePath}`);
  await c.srem("dirty:paths", filePath);
}

export async function listDirty() {
  const c = await client();
  return c.smembers("dirty:paths");
}

// ── Cursor presence ──────────────────────────────────────────────────

export async function upsertCursor(filePath, userId, cursor) {
  const c = await client();
  const key = `cursors:${filePath}`;
  const payload = {
    userId,
    ts: Date.now(),
    ...cursor,
  };
  await c.hset(key, { [userId]: JSON.stringify(payload) });
  await c.expire(key, CURSOR_TTL_S * 4);
  return payload;
}

export async function listCursors(filePath) {
  const c = await client();
  const raw = await c.hgetall(`cursors:${filePath}`);
  if (!raw) return [];
  const now = Date.now();
  const cutoff = now - CURSOR_TTL_S * 1000;
  const out = [];
  for (const [userId, value] of Object.entries(raw)) {
    try {
      const parsed = typeof value === "string" ? JSON.parse(value) : value;
      if (parsed.ts >= cutoff) out.push(parsed);
    } catch {}
  }
  return out;
}

export async function removeCursor(filePath, userId) {
  const c = await client();
  await c.hdel(`cursors:${filePath}`, userId);
}
