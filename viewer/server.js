import express from 'express';
import { readdir, readFile, stat, writeFile, mkdir } from 'fs/promises';
import { createReadStream, readdirSync, statSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked } from 'marked';
import { exec } from 'child_process';
import { promisify } from 'util';
import OpenAI from 'openai';
import multer from 'multer';
import session from 'express-session';
import { knowledgePrime, cacheStats as primeCacheStats } from './services/knowledge-prime.js';
import {
  composeBookAbout,
  composeBookAboutStream,
  listBooks,
  patchBookMeta,
  generateBookCover,
  generateBookPrologue,
  generateBookIndex,
  generateBookReferences,
  generateBookIdeas,
  loadBookIdeas,
  exploreForMore,
  acceptExploreProposals,
  clearBookSection,
} from './services/book.js';

const execAsync = promisify(exec);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KB_ROOT = path.resolve(__dirname, '..');
// PORT / GITNEXUS URL are configurable so multiple KBs can run on the same
// machine with their own viewer + their own gitnexus instance per repo.
const PORT = Number(process.env.KB_VIEWER_PORT || process.env.PORT || 3700);
const KB_GITNEXUS_URL = process.env.KB_GITNEXUS_URL || 'http://localhost:3800';
// Repo name derived from the KB root's basename, overridable via env.
// Used by the viewer frontend to scope gitnexus queries to THIS KB instead
// of picking up neighbouring repos from the global registry.
const KB_REPO_NAME = process.env.KB_REPO_NAME || path.basename(path.resolve(__dirname, '..'));
// Display name shown in the sidebar logo + <title>. "wany-kb" → "WANY KB",
// "jnj-kb" → "JNJ KB". Override with KB_DISPLAY_NAME if you want custom casing.
const KB_DISPLAY_NAME = process.env.KB_DISPLAY_NAME || KB_REPO_NAME.replace(/[-_]/g, ' ').toUpperCase();

// Load .env from the KB root so pm2-managed viewers pick up secrets without
// a manual `source .env`. Simple key=value parser, ignores comments + quotes.
// Existing env vars win (pm2 --update-env takes precedence).
try {
  const { readFileSync: _rfs, existsSync: _exs } = await import('fs');
  const envPath = path.resolve(__dirname, '..', '.env');
  if (_exs(envPath)) {
    const raw = _rfs(envPath, 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/i);
      if (!m) continue;
      const key = m[1];
      let val = m[2] || '';
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = val;
    }
  }
} catch { /* no-op */ }

// Env fallback: load ANTHROPIC_API_KEY from ~/.openclaw/openclaw.json if unset
if (!process.env.ANTHROPIC_API_KEY) {
  try {
    const { readFileSync } = await import('fs');
    const homeDir = process.env.HOME || '';
    const cfg = JSON.parse(readFileSync(`${homeDir}/.openclaw/openclaw.json`, 'utf8'));
    if (cfg?.env?.ANTHROPIC_API_KEY) process.env.ANTHROPIC_API_KEY = cfg.env.ANTHROPIC_API_KEY;
  } catch { /* no-op */ }
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'sk-missing-not-configured' });

// In-memory metrics for the Fulfillment Dashboard (last N requests)
const _primeRequests = [];
const PRIME_METRICS_MAX = 100;
function recordPrimeMetric(entry) {
  _primeRequests.unshift({ ...entry, at: Date.now() });
  if (_primeRequests.length > PRIME_METRICS_MAX) _primeRequests.length = PRIME_METRICS_MAX;
}

const app = express();

// --- Theme static assets (KB_THEME selects which bundle to serve) ---
const KB_THEME = process.env.KB_THEME || 'catppuccin';
app.use('/themes', express.static(path.join(__dirname, 'public', 'themes'), {
  maxAge: process.env.NODE_ENV === 'production' ? '1h' : 0,
}));

// --- Session middleware ---
app.use(session({
  secret: process.env.SESSION_SECRET || 'wany-kb-session-secret-' + Date.now(),
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax', maxAge: 30 * 24 * 60 * 60 * 1000 }
}));

// --- Helpers ---

async function walkDir(dir, base = '') {
  const entries = await readdir(dir, { withFileTypes: true });
  const tree = [];
  for (const e of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (e.name.startsWith('.') || e.name === 'node_modules') continue;
    const rel = path.join(base, e.name);
    if (e.isDirectory()) {
      tree.push({ name: e.name, path: rel, type: 'dir', children: await walkDir(path.join(dir, e.name), rel) });
    } else if (e.name.endsWith('.md')) {
      tree.push({ name: e.name, path: rel, type: 'file' });
    }
  }
  return tree;
}

function extractWikilinks(content) {
  const re = /\[\[([^\]]+)\]\]/g;
  const links = new Set();
  let m;
  while ((m = re.exec(content)) !== null) links.add(m[1]);
  return [...links];
}

async function allMarkdownFiles(dir, base = '') {
  const entries = await readdir(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    if (e.name.startsWith('.') || e.name === 'node_modules') continue;
    const rel = path.join(base, e.name);
    if (e.isDirectory()) {
      files = files.concat(await allMarkdownFiles(path.join(dir, e.name), rel));
    } else if (e.name.endsWith('.md')) {
      files.push({ abs: path.join(dir, e.name), rel });
    }
  }
  return files;
}

// --- GitHub OAuth ---
const GH_CLIENT_ID = process.env.GITHUB_CLIENT_ID || '';
const GH_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || '';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';

app.get('/auth/github', (req, res) => {
  if (!GH_CLIENT_ID) return res.status(404).send('GitHub OAuth not configured');
  const redirect_uri = `${req.protocol}://${req.get('host')}/auth/github/callback`;
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${GH_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=read:user`);
});

app.get('/auth/github/callback', async (req, res) => {
  const { code } = req.query;
  if (!code || !GH_CLIENT_ID) return res.redirect('/');
  try {
    // Exchange code for token
    const tokenResp = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ client_id: GH_CLIENT_ID, client_secret: GH_CLIENT_SECRET, code })
    });
    const tokenData = await tokenResp.json();
    if (!tokenData.access_token) return res.redirect('/');
    // Get user profile
    const userResp = await fetch('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${tokenData.access_token}`, 'User-Agent': 'wany-kb' }
    });
    const user = await userResp.json();
    req.session.user = { login: user.login, name: user.name || user.login, avatar_url: user.avatar_url };
    res.redirect('/');
  } catch (err) {
    console.error('GitHub OAuth error:', err.message);
    res.redirect('/');
  }
});

// ── Google OAuth ─────────────────────────────────────────────────
app.get('/auth/google', (req, res) => {
  if (!GOOGLE_CLIENT_ID) return res.status(404).send('Google OAuth not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET env vars.');
  const redirect_uri = `${req.protocol}://${req.get('host')}/auth/google/callback`;
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'online',
  });
  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
});

app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  if (!code || !GOOGLE_CLIENT_ID) return res.redirect('/');
  try {
    const redirect_uri = `${req.protocol}://${req.get('host')}/auth/google/callback`;
    // Exchange code for tokens
    const tokenResp = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri,
        grant_type: 'authorization_code',
      }).toString(),
    });
    const tokenData = await tokenResp.json();
    if (!tokenData.access_token && !tokenData.id_token) return res.redirect('/');
    // Get user profile from Google
    const userResp = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const user = await userResp.json();
    req.session.user = {
      login: user.email,
      name: user.name || user.email,
      avatar_url: user.picture || '',
      provider: 'google',
    };
    res.redirect('/');
  } catch (err) {
    console.error('Google OAuth error:', err.message);
    res.redirect('/');
  }
});

app.get('/auth/me', (req, res) => {
  res.json({
    user: req.session.user || null,
    github_auth_enabled: !!GH_CLIENT_ID,
    google_auth_enabled: !!GOOGLE_CLIENT_ID,
  });
});

app.post('/auth/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

// --- API Routes ---

app.get('/api/files', async (req, res) => {
  try {
    const wiki = await walkDir(path.join(KB_ROOT, 'wiki'), 'wiki');
    const raw = await walkDir(path.join(KB_ROOT, 'raw'), 'raw');
    const viz = await walkDir(path.join(KB_ROOT, 'viz'), 'viz');
    const finetune = await walkDir(path.join(KB_ROOT, 'finetune/data'), 'finetune/data').catch(() => []);

    // Synthetic "Books" node — walkDir only surfaces .md files, so the
    // raw/books/*.json payloads would be invisible otherwise. Each book
    // becomes a virtual tree entry whose path is a book:<slug> pseudo-URL
    // that the client recognises and routes to the book reader.
    let booksNode = null;
    try {
      const books = await listBooks();
      if (books.length) {
        booksNode = {
          name: 'books',
          path: '__books__',
          type: 'dir',
          synthetic: true,
          children: books.map((b) => ({
            name: (b.title || b.topic || b.slug) + '.book',
            path: 'book:' + b.slug,
            type: 'file',
            synthetic: true,
            book_slug: b.slug,
          })),
        };
      }
    } catch {}

    // Synthetic "Ideas" node — collapses viz/ideas/ and any nested folders
    // (like from-books/<slug>/) into one discoverable top-level entry.
    let ideasNode = null;
    try {
      const ideasChildren = await walkDir(path.join(KB_ROOT, 'viz', 'ideas'), 'viz/ideas').catch(() => []);
      if (ideasChildren.length) {
        ideasNode = {
          name: 'ideas',
          path: 'viz/ideas',
          type: 'dir',
          synthetic: true,
          children: ideasChildren,
        };
      }
    } catch {}

    const response = [
      { name: 'wiki', path: 'wiki', type: 'dir', children: wiki },
    ];
    if (booksNode) response.push(booksNode);
    if (ideasNode) response.push(ideasNode);
    response.push({ name: 'viz', path: 'viz', type: 'dir', children: viz });
    response.push({ name: 'raw', path: 'raw', type: 'dir', children: raw });
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Build Globant page-id → KB path map (lazy, cached)
let _globantIdMap = null;
async function getGlobantIdMap() {
  if (_globantIdMap) return _globantIdMap;
  _globantIdMap = new Map();
  try {
    const files = await readdir(path.join(KB_ROOT, 'raw', 'articles'));
    for (const f of files) {
      const m = f.match(/^(\d+)-/);
      if (m) _globantIdMap.set(m[1], `raw/articles/${f}`);
    }
  } catch {}
  return _globantIdMap;
}

// Replace /en/wiki?<id>,<title> links with KB-internal links
async function rewriteGlobantLinks(html) {
  const idMap = await getGlobantIdMap();
  return html.replace(/href="\/en\/wiki\?([^"]+)"/g, (match, query) => {
    const id = query.split(',')[0].trim();
    const kbPath = idMap.get(id);
    if (kbPath) return `href="javascript:void(0)" data-kb-path="${kbPath}" class="kb-internal-link"`;
    return `href="https://docs.globant.ai/en/wiki?${query}" target="_blank"`;
  });
}

app.get('/api/file', async (req, res) => {
  try {
    const filePath = req.query.path;
    if (!filePath) return res.status(400).json({ error: 'path required' });
    const abs = path.resolve(KB_ROOT, filePath);
    if (!abs.startsWith(KB_ROOT)) return res.status(403).json({ error: 'forbidden' });
    const raw = await readFile(abs, 'utf-8');
    const { data: frontmatter, content } = matter(raw);
    let html = marked(content);
    // Rewrite Globant internal links to KB paths
    html = await rewriteGlobantLinks(html);
    const wikilinks = extractWikilinks(content);
    res.json({ path: filePath, frontmatter, content, html, wikilinks });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.get('/api/graph', async (req, res) => {
  try {
    const wikiFiles = await allMarkdownFiles(path.join(KB_ROOT, 'wiki'), 'wiki');
    const rawFiles = await allMarkdownFiles(path.join(KB_ROOT, 'raw'), 'raw');
    const allFiles = [...wikiFiles, ...rawFiles];

    const nodes = [];
    const edges = [];
    const nameToPath = new Map();

    for (const f of allFiles) {
      const name = path.basename(f.rel, '.md');
      const group = f.rel.startsWith('wiki/concepts') ? 'concepts' :
                    f.rel.startsWith('wiki/tools') ? 'tools' :
                    f.rel.startsWith('wiki/research') ? 'research' :
                    f.rel.startsWith('wiki') ? 'wiki' :
                    f.rel.startsWith('raw/projects') ? 'project' : 'raw';
      nodes.push({ id: f.rel, name: name.replace(/-/g, ' '), group });
      // Index by multiple keys for fuzzy matching
      const normalized = name.toLowerCase().replace(/-/g, ' ');
      nameToPath.set(normalized, f.rel);
      nameToPath.set(name.toLowerCase(), f.rel);
      nameToPath.set(name.toLowerCase().replace(/-/g, ''), f.rel);
    }

    for (const f of allFiles) {
      const raw = await readFile(f.abs, 'utf-8');
      const links = extractWikilinks(raw);
      for (const link of links) {
        const normalized = link.toLowerCase().replace(/-/g, ' ').replace(/_/g, ' ');
        const target = nameToPath.get(normalized) ||
                       nameToPath.get(link.toLowerCase()) ||
                       nameToPath.get(link.toLowerCase().replace(/\s+/g, '-'));
        if (target && target !== f.rel) {
          edges.push({ source: f.rel, target });
        }
      }
    }

    // Also auto-link wiki articles that share keywords (category-based edges)
    const wikiNodes = nodes.filter(n => n.group === 'concepts' || n.group === 'tools' || n.group === 'research');
    for (const a of wikiNodes) {
      for (const b of wikiNodes) {
        if (a.id >= b.id) continue;
        // Share common words (min 1 meaningful word)
        const wordsA = new Set(a.name.split(/\s+/).filter(w => w.length > 4));
        const wordsB = new Set(b.name.split(/\s+/).filter(w => w.length > 4));
        const shared = [...wordsA].filter(w => wordsB.has(w));
        if (shared.length > 0) {
          edges.push({ source: a.id, target: b.id, weak: true });
        }
      }
    }

    res.json({ nodes, edges });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/search', async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) return res.json([]);
    
    const FGR = process.env.FGR_PATH || '/Users/gmilano/Projects/fast-grep-rust/target/release/fgr';
    // Per-KB index path — hardcoding '/tmp/wany-kb-index' made every KB
    // query wany-kb's index and return foreign paths.
    const KB_NAME = path.basename(KB_ROOT);
    const INDEX = process.env.FGR_INDEX || `/tmp/${KB_NAME}-index`;
    const { execFile } = await import('child_process');
    const { promisify } = await import('util');
    const { existsSync } = await import('fs');
    const execFileAsync = promisify(execFile);

    const canUseFgr = existsSync(FGR) && existsSync(INDEX);

    // Try fast-grep first (if index exists for this KB), fallback to text search
    try {
      if (!canUseFgr) throw new Error('no fgr index for this KB — using fallback');
      const { stdout } = await execFileAsync(FGR, [
        q, KB_ROOT, '--index', INDEX, '-l'
      ], { timeout: 5000 });

      const files = stdout.trim().split('\n').filter(Boolean)
        // Reject anything outside KB_ROOT — guard against a shared/stale index
        .filter((f) => path.resolve(f).startsWith(KB_ROOT + path.sep));
      const results = await Promise.all(files.slice(0, 20).map(async filePath => {
        try {
          const content = await readFile(filePath, 'utf-8');
          const lines = content.split('\n');
          const matchIdx = lines.findIndex(l => l.toLowerCase().includes(q.toLowerCase()));
          const relPath = path.relative(KB_ROOT, filePath);
          const name = path.basename(filePath, '.md');
          const snippet = lines.slice(Math.max(0, matchIdx - 1), matchIdx + 3).join('\n');
          return { path: relPath, name, snippet, line: matchIdx + 1 };
        } catch { return null; }
      }));
      const filtered = results.filter(Boolean);
      if (filtered.length === 0) throw new Error('fgr returned nothing — trying fallback');
      return res.json(filtered);
    } catch {
      // Fallback: simple text search
      const allFiles = await allMarkdownFiles(KB_ROOT);
      const results = [];
      for (const f of allFiles) {
        const content = await readFile(f.abs, 'utf-8').catch(() => '');
        if (content.toLowerCase().includes(q.toLowerCase())) {
          const lines = content.split('\n');
          const idx = lines.findIndex(l => l.toLowerCase().includes(q.toLowerCase()));
          results.push({ path: f.rel, name: path.basename(f.rel, '.md'), snippet: lines.slice(Math.max(0,idx-1), idx+3).join('\n'), line: idx+1 });
        }
        if (results.length >= 20) break;
      }
      return res.json(results);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/backlinks', async (req, res) => {
  try {
    const target = req.query.path;
    if (!target) return res.status(400).json({ error: 'path required' });
    const targetName = path.basename(target, '.md').toLowerCase();
    const wikiFiles = await allMarkdownFiles(path.join(KB_ROOT, 'wiki'), 'wiki');
    const rawFiles = await allMarkdownFiles(path.join(KB_ROOT, 'raw'), 'raw');
    const backlinks = [];
    for (const f of [...wikiFiles, ...rawFiles]) {
      if (f.rel === target) continue;
      const content = await readFile(f.abs, 'utf-8');
      const links = extractWikilinks(content);
      if (links.some(l => l.toLowerCase() === targetName)) {
        backlinks.push({ path: f.rel, name: path.basename(f.rel, '.md') });
      }
    }
    res.json(backlinks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Knowledge Prime API (Pick → Pack → Deliver) ---

app.use(express.json({ limit: '1mb' }));

app.post('/api/knowledge', async (req, res) => {
  const { query, format = 'context', maxItems = 8, budgetMs = 1500, noCache = false } = req.body || {};
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'query (string) required' });
  }
  const agent = req.body?.agent_id || 'anonymous';
  try {
    const result = await knowledgePrime({ query, format, maxItems, budgetMs, noCache });
    recordPrimeMetric({
      query,
      format,
      agent,
      cached: result.cached,
      total_ms: result.metrics.total_ms,
      pick_ms: result.metrics.stages?.pick_ms ?? null,
      pack_ms: result.metrics.stages?.pack_ms ?? null,
      hits: result.metrics.pick_hits ?? 0,
      ok: true,
    });
    res.json(result);
  } catch (err) {
    recordPrimeMetric({ query, format, agent, ok: false, error: err.message, total_ms: 0 });
    res.status(500).json({ error: err.message });
  }
});

// M6 item 1 — compose chat for New Page modal (uses Anthropic via Vercel AI SDK)
app.post('/api/chat-compose', async (req, res) => {
  try {
    const { messages = [], title = '' } = req.body || {};
    if (!Array.isArray(messages) || !messages.length) {
      return res.status(400).json({ error: 'messages[] required' });
    }
    const { anthropic } = await import('@ai-sdk/anthropic');
    const { generateText } = await import('ai');
    const system = `Sos un asistente de composición para la Wany KB. Ayudás a escribir artículos de wiki en markdown claro y estructurado.
Cuando te piden contenido, respondé con markdown listo para pegar en un artículo (headings ## / ###, listas, code blocks, frontmatter solo si el usuario lo pide).
Si la respuesta es corta, no inventes secciones extra. Si hay un título de página, alineá el contenido con ese tema.
Título actual de la página: ${title || '(sin título todavía)'}
Respondé en el mismo idioma del usuario.`;
    const prompt = messages.map((m) => (m.role === 'user' ? 'User: ' : 'Assistant: ') + m.content).join('\n\n') + '\n\nAssistant: ';
    const { text } = await generateText({
      model: anthropic(process.env.KB_COMPOSE_MODEL || 'claude-sonnet-4-6'),
      system,
      prompt,
      maxTokens: 1500,
    });
    res.json({ ok: true, reply: text });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get('/api/skills', async (req, res) => {
  try {
    const registryPath = path.join(KB_ROOT, 'skills', '_registry.json');
    try {
      const raw = await readFile(registryPath, 'utf-8');
      const registry = JSON.parse(raw);
      const skills = Array.isArray(registry) ? registry : (registry.skills || []);
      res.json({ ok: true, count: skills.length, skills });
    } catch (err) {
      if (err.code === 'ENOENT') {
        return res.json({
          ok: true,
          count: 0,
          skills: [],
          hint: "No skills/_registry.json found. Run: bash bootstrap/install-skills.sh"
        });
      }
      throw err;
    }
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Identity endpoint — the frontend asks this to know which repo to scope
// gitnexus queries against. Avoids the stale hardcoded "wany-kb" that used
// to leak neighbour-repo data in scaffolded KBs.
app.get('/api/kb-info', (req, res) => {
  res.json({
    repo: KB_REPO_NAME,
    displayName: KB_DISPLAY_NAME,
    viewerPort: PORT,
    gitnexusUrl: KB_GITNEXUS_URL,
    kbRoot: KB_ROOT,
  });
});

app.get('/api/decisions', async (req, res) => {
  try {
    const decisionsDir = path.join(KB_ROOT, 'decisions');
    const entries = await readdir(decisionsDir).catch(() => []);
    const adrs = [];
    for (const fname of entries.sort()) {
      if (!fname.endsWith('.md')) continue;
      const abs = path.join(decisionsDir, fname);
      const raw = await readFile(abs, 'utf-8').catch(() => '');
      const fm = matter(raw);
      adrs.push({
        id: fm.data.id || fname.replace(/\.md$/, ''),
        title: fm.data.title || fname,
        status: fm.data.status || 'unknown',
        date: fm.data.date || null,
        deciders: fm.data.deciders || [],
        supersedes: fm.data.supersedes || [],
        superseded_by: fm.data.superseded_by || [],
        related: fm.data.related || [],
        tags: fm.data.tags || [],
        path: path.relative(KB_ROOT, abs),
        body: fm.content,
      });
    }
    // sort by id asc (ADR numbering is stable)
    adrs.sort((a, b) => String(a.id).localeCompare(String(b.id)));
    res.json({ adrs, count: adrs.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/book-about — streaming SSE-over-POST. Emits one data event per
// stage (picking, reading, composing, finalizing, done) plus a final event
// carrying the full book payload. Client uses fetch().body.getReader() to
// parse the stream and update the status UI live.
app.post('/api/book-about', async (req, res) => {
  try {
    const { topic } = req.body || {};
    if (!topic || typeof topic !== 'string') {
      return res.status(400).json({ error: 'topic (string) required' });
    }
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    // Hint nginx/proxies not to buffer
    res.setHeader('X-Accel-Buffering', 'no');
    const emit = (obj) => {
      try { res.write('data: ' + JSON.stringify(obj) + '\n\n'); } catch {}
    };

    try {
      const force = !!(req.body && req.body.force);
      const lang = (req.body && req.body.lang) || 'auto';
      const result = await composeBookAboutStream({ topic, lang, force, onProgress: emit });
      emit({ stage: 'result', result });
    } catch (e) {
      emit({ stage: 'error', message: e.message });
    }
    res.end();
  } catch (err) {
    try { res.status(500).json({ ok: false, error: err.message }); } catch {}
  }
});

// GET /api/books — list cached books from raw/books/
app.get('/api/books', async (req, res) => {
  try {
    const books = await listBooks();
    res.json({ ok: true, books });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// GET /api/books/:slug — load a specific cached book by slug
app.get('/api/books/:slug', async (req, res) => {
  try {
    const slug = String(req.params.slug || '').replace(/[^a-z0-9-]/gi, '');
    if (!slug) return res.status(400).json({ ok: false, error: 'invalid slug' });
    const file = path.join(KB_ROOT, 'raw', 'books', `${slug}.json`);
    const expectedPrefix = path.join(KB_ROOT, 'raw', 'books');
    if (!file.startsWith(expectedPrefix)) return res.status(403).json({ ok: false, error: 'forbidden' });
    const raw = await readFile(file, 'utf-8').catch(() => null);
    if (!raw) return res.status(404).json({ ok: false, error: 'book not found' });
    res.json({ ok: true, ...JSON.parse(raw) });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// DELETE /api/books/:slug — remove a cached book so the next compose re-runs
app.delete('/api/books/:slug', async (req, res) => {
  try {
    const slug = String(req.params.slug || '').replace(/[^a-z0-9-]/gi, '');
    const booksDir = path.join(KB_ROOT, 'raw', 'books');
    const jsonFile = path.join(booksDir, `${slug}.json`);
    if (!jsonFile.startsWith(booksDir)) return res.status(403).json({ ok: false, error: 'forbidden' });
    const { unlink } = await import('fs/promises');
    // Remove the book JSON, its cover PNG, and the derived-ideas folder.
    await unlink(jsonFile).catch(() => {});
    await unlink(path.join(booksDir, `${slug}.png`)).catch(() => {});
    const { rm } = await import('fs/promises');
    await rm(path.join(KB_ROOT, 'viz', 'ideas', 'from-books', slug), { recursive: true, force: true }).catch(() => {});
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ──────────────────────────────────────────────────────────────────────
// Book mutation + enrichment endpoints — all operate on raw/books/<slug>.json
// ──────────────────────────────────────────────────────────────────────
const safeSlug = (s) => String(s || '').replace(/[^a-z0-9-]/gi, '');

// PATCH /api/books/:slug — rename title/subtitle/topic (keeps slug stable)
app.patch('/api/books/:slug', async (req, res) => {
  try {
    const slug = safeSlug(req.params.slug);
    if (!slug) return res.status(400).json({ ok: false, error: 'invalid slug' });
    const { title, subtitle, topic } = req.body || {};
    const updated = await patchBookMeta(slug, { title, subtitle, topic });
    res.json({ ok: true, ...updated });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// POST /api/books/:slug/cover — generate DALL-E 3 cover
app.post('/api/books/:slug/cover', async (req, res) => {
  try {
    const slug = safeSlug(req.params.slug);
    if (!slug) return res.status(400).json({ ok: false, error: 'invalid slug' });
    const result = await generateBookCover(slug);
    res.json({ ok: true, ...result });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// POST /api/books/:slug/prologue — generate narrative prologue
app.post('/api/books/:slug/prologue', async (req, res) => {
  try {
    const slug = safeSlug(req.params.slug);
    if (!slug) return res.status(400).json({ ok: false, error: 'invalid slug' });
    const book = await generateBookPrologue(slug);
    res.json({ ok: true, ...book });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// POST /api/books/:slug/index — thematic back-of-book index
app.post('/api/books/:slug/index', async (req, res) => {
  try {
    const slug = safeSlug(req.params.slug);
    if (!slug) return res.status(400).json({ ok: false, error: 'invalid slug' });
    const book = await generateBookIndex(slug);
    res.json({ ok: true, ...book });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// POST /api/books/:slug/references — deterministic reference list from FM
app.post('/api/books/:slug/references', async (req, res) => {
  try {
    const slug = safeSlug(req.params.slug);
    if (!slug) return res.status(400).json({ ok: false, error: 'invalid slug' });
    const book = await generateBookReferences(slug);
    res.json({ ok: true, ...book });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// POST /api/books/:slug/ideas — generate ideas from the book + user context
app.post('/api/books/:slug/ideas', async (req, res) => {
  try {
    const slug = safeSlug(req.params.slug);
    if (!slug) return res.status(400).json({ ok: false, error: 'invalid slug' });
    const { context = '', count = 10 } = req.body || {};
    const result = await generateBookIdeas(slug, { context, count: Number(count) || 10 });
    res.json({ ok: true, ...result });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// GET /api/books/:slug/ideas — load cached ideas
app.get('/api/books/:slug/ideas', async (req, res) => {
  try {
    const slug = safeSlug(req.params.slug);
    if (!slug) return res.status(400).json({ ok: false, error: 'invalid slug' });
    const ideas = await loadBookIdeas(slug);
    if (!ideas) return res.status(404).json({ ok: false, error: 'no ideas generated yet' });
    res.json({ ok: true, ...ideas });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// POST /api/books/:slug/explore — LLM proposes missing wiki concepts
app.post('/api/books/:slug/explore', async (req, res) => {
  try {
    const slug = safeSlug(req.params.slug);
    if (!slug) return res.status(400).json({ ok: false, error: 'invalid slug' });
    const { count = 6 } = req.body || {};
    const result = await exploreForMore(slug, { count: Number(count) || 6 });
    res.json({ ok: true, ...result });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// DELETE /api/books/:slug/section/:name — remove a generated section so the
// UI can re-generate it. Sections: prologue, index, references, cover.
app.delete('/api/books/:slug/section/:name', async (req, res) => {
  try {
    const slug = safeSlug(req.params.slug);
    const section = String(req.params.name || '').replace(/[^a-z]/gi, '');
    if (!slug || !section) return res.status(400).json({ ok: false, error: 'invalid params' });
    const book = await clearBookSection(slug, section);
    res.json({ ok: true, ...book });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// POST /api/books/:slug/explore/accept — write approved proposals to wiki
app.post('/api/books/:slug/explore/accept', async (req, res) => {
  try {
    const slug = safeSlug(req.params.slug);
    if (!slug) return res.status(400).json({ ok: false, error: 'invalid slug' });
    const { proposals = [] } = req.body || {};
    const result = await acceptExploreProposals(slug, proposals);
    res.json({ ok: true, ...result });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Audiobook generation
app.post('/api/books/:slug/audio', async (req, res) => {
  try {
    const slug = safeSlug(req.params.slug);
    if (!slug) return res.status(400).json({ ok: false, error: 'invalid slug' });
    const { voice = 'nova' } = req.body || {};
    const { generate } = await import('./services/audiobook.js');
    const result = await generate(slug, { voice });
    res.json({ ok: true, ...result });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Audiobook download
app.get('/api/books/:slug/audio/download', async (req, res) => {
  try {
    const slug = safeSlug(req.params.slug);
    if (!slug) return res.status(400).end();
    const mp3 = path.join(KB_ROOT, 'raw', 'books', slug, `${slug}.mp3`);
    if (!existsSync(mp3)) return res.status(404).json({ error: 'Audiobook not generated yet. POST /api/books/:slug/audio first.' });
    res.download(mp3, `${slug}.mp3`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/knowledge/stats', async (req, res) => {
  const reqs = _primeRequests;
  const ok = reqs.filter((r) => r.ok);
  const totals = ok.map((r) => r.total_ms).sort((a, b) => a - b);
  const p = (q) => (totals.length ? totals[Math.floor((totals.length - 1) * q)] : null);
  res.json({
    warehouse: {
      raw_count: (await allMarkdownFiles(path.join(KB_ROOT, 'raw'), 'raw')).length,
      wiki_count: (await allMarkdownFiles(path.join(KB_ROOT, 'wiki'), 'wiki')).length,
    },
    cache: primeCacheStats(),
    recent: reqs.slice(0, 20),
    sla: {
      count: ok.length,
      p50: p(0.5),
      p95: p(0.95),
      p99: p(0.99),
      cache_hit_rate: ok.length ? ok.filter((r) => r.cached).length / ok.length : 0,
    },
  });
});

// --- Ideas API ---

app.get('/api/ideas', async (req, res) => {
  try {
    const ideasDir = path.join(KB_ROOT, 'viz', 'ideas');
    const ideas = [];
    // Walk ideas/ recursively so nested folders (e.g. from-books/<slug>/)
    // are picked up and shown in the Ideas tab alongside top-level notes.
    async function walk(dir, relBase) {
      let entries;
      try { entries = await readdir(dir, { withFileTypes: true }); } catch { return; }
      for (const e of entries) {
        if (e.name.startsWith('.')) continue;
        const abs = path.join(dir, e.name);
        const rel = relBase ? `${relBase}/${e.name}` : e.name;
        if (e.isDirectory()) { await walk(abs, rel); continue; }
        if (!e.name.endsWith('.md')) continue;
        const raw = await readFile(abs, 'utf-8').catch(() => '');
        if (!raw) continue;
        const { data: frontmatter, content } = matter(raw);
        const html = marked(content);
        ideas.push({
          filename: rel,
          date: frontmatter.date || e.name.replace('ideas-', '').replace('.md', ''),
          concept: frontmatter.concept || '',
          sources: frontmatter.sources || '',
          source_book: frontmatter.source_book || null,
          source_book_slug: frontmatter.source_book_slug || null,
          folder: relBase || null,
          content,
          html,
        });
      }
    }
    await walk(ideasDir, '');
    ideas.sort((a, b) => b.date.toString().localeCompare(a.date.toString()));
    res.json(ideas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use(express.json({ limit: '10mb' }));
app.post('/api/generate-ideas', (req, res) => {
  const script = path.join(KB_ROOT, 'ingest', 'ideas-generator.sh');
  exec(`bash "${script}"`, { timeout: 120000 }, (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr || err.message });
    res.json({ ok: true, output: stdout });
  });
});

// --- Chat per Idea (SSE streaming) ---

async function getWikiContext(ideaContent) {
  const wikiFiles = await allMarkdownFiles(path.join(KB_ROOT, 'wiki'), 'wiki');
  const ideaLower = ideaContent.toLowerCase();
  const relevant = [];
  for (const f of wikiFiles) {
    const name = path.basename(f.rel, '.md').replace(/-/g, ' ').toLowerCase();
    if (ideaLower.includes(name) || name.split(' ').some(w => w.length > 4 && ideaLower.includes(w))) {
      const content = await readFile(f.abs, 'utf-8');
      const { content: body } = matter(content);
      relevant.push(`## ${name}\n${body.slice(0, 1500)}`);
      if (relevant.length >= 5) break;
    }
  }
  return relevant.join('\n\n---\n\n');
}

app.post('/api/chat-idea', async (req, res) => {
  try {
    const { idea_content, message, history, idea_date } = req.body;
    if (!message) return res.status(400).json({ error: 'message required' });

    const wikiContext = await getWikiContext(idea_content || '');

    const systemPrompt = `Eres un asistente especializado en la KB de Wany. Tienes acceso a esta idea:\n${idea_content || '(sin idea)'}\nY a estos artículos relevantes del wiki:\n${wikiContext || '(ninguno encontrado)'}\nAyuda a desarrollar, implementar o profundizar la idea. Sé concreto y técnico.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...(history || []),
      { role: 'user', content: message }
    ];

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      stream: true,
    });

    let fullResponse = '';
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        fullResponse += content;
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    // Save chat history
    if (idea_date) {
      const chatDir = path.join(KB_ROOT, 'viz', 'ideas');
      await mkdir(chatDir, { recursive: true });
      const chatFile = path.join(chatDir, `chat-${idea_date}.json`);
      let existing = [];
      try { existing = JSON.parse(await readFile(chatFile, 'utf-8')); } catch {}
      existing.push({ role: 'user', content: message });
      existing.push({ role: 'assistant', content: fullResponse });
      await writeFile(chatFile, JSON.stringify(existing, null, 2));
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    } else {
      res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
      res.end();
    }
  }
});

app.post('/api/save-chat-to-kb', async (req, res) => {
  try {
    const { idea_date, response_text } = req.body;
    if (!idea_date || !response_text) return res.status(400).json({ error: 'idea_date and response_text required' });
    const ideaFile = path.join(KB_ROOT, 'viz', 'ideas', `ideas-${idea_date}.md`);
    let existing = '';
    try { existing = await readFile(ideaFile, 'utf-8'); } catch {}
    const updated = existing + '\n\n---\n\n## Chat Insight\n\n' + response_text + '\n';
    await writeFile(ideaFile, updated);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/chat-history', async (req, res) => {
  try {
    const date = req.query.date;
    if (!date) return res.json([]);
    const chatFile = path.join(KB_ROOT, 'viz', 'ideas', `chat-${date}.json`);
    const data = JSON.parse(await readFile(chatFile, 'utf-8'));
    res.json(data);
  } catch {
    res.json([]);
  }
});

// --- Voice Ingest ---

app.post('/api/voice-ingest', express.raw({ type: '*/*', limit: '50mb' }), async (req, res) => {
  try {
    const timestamp = Date.now();
    const tmpPath = `/tmp/kb-voice-${timestamp}.webm`;
    await writeFile(tmpPath, req.body);

    const transcription = await openai.audio.transcriptions.create({
      file: createReadStream(tmpPath),
      model: 'whisper-1',
    });

    res.json({ text: transcription.text, timestamp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/save-voice', async (req, res) => {
  try {
    const { text, timestamp, as_idea } = req.body;
    if (!text) return res.status(400).json({ error: 'text required' });

    const ts = timestamp || Date.now();
    const date = new Date(ts).toISOString().split('T')[0];

    // Save to raw/voice/
    const voiceDir = path.join(KB_ROOT, 'raw', 'voice');
    await mkdir(voiceDir, { recursive: true });
    const voiceFile = path.join(voiceDir, `${ts}.md`);
    const voiceMd = `---\ndate: ${date}\nsource: voice\ntimestamp: ${ts}\n---\n\n${text}\n`;
    await writeFile(voiceFile, voiceMd);

    let ideaPath = null;
    if (as_idea) {
      const ideasDir = path.join(KB_ROOT, 'viz', 'ideas');
      await mkdir(ideasDir, { recursive: true });
      const ideaFile = path.join(ideasDir, `ideas-${date}.md`);
      let existing = '';
      try { existing = await readFile(ideaFile, 'utf-8'); } catch {}
      if (existing) {
        const updated = existing + '\n\n---\n\n## Voice Note\n\n' + text + '\n';
        await writeFile(ideaFile, updated);
      } else {
        const ideaMd = `---\ndate: ${date}\nconcept: Voice Note\nsources: microphone\n---\n\n${text}\n`;
        await writeFile(ideaFile, ideaMd);
      }
      ideaPath = `viz/ideas/ideas-${date}.md`;
    }

    res.json({ ok: true, path: `raw/voice/${ts}.md`, ideaPath });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Realtime Voice Assistant ---

app.post('/api/realtime-session', async (req, res) => {
  try {
    const { filePath, selectionText } = req.body;
    
    // Load article content to inject into voice context
    let articleContent = '';
    let articleTitle = '';
    if (filePath) {
      const abs = path.resolve(KB_ROOT, filePath);
      if (abs.startsWith(KB_ROOT)) {
        articleContent = await readFile(abs, 'utf-8').catch(() => '');
        articleTitle = path.basename(filePath, '.md').replace(/-/g, ' ');
      }
    }
    
    const resp = await fetch('https://api.openai.com/v1/realtime/sessions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-realtime-preview',
        voice: 'alloy'
      })
    });
    const data = await resp.json();
    if (!resp.ok) return res.status(resp.status).json({ error: data.error || data });
    
    res.json({
      client_secret: data.client_secret,
      article_content: articleContent.slice(0, 8000), // cap at 8k chars
      article_title: articleTitle,
      selection_text: selectionText || '',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/article/update', async (req, res) => {
  try {
    const { filePath, content, reason } = req.body;
    if (!filePath || content == null) return res.status(400).json({ error: 'filePath and content required' });
    const abs = path.resolve(KB_ROOT, filePath);
    if (!abs.startsWith(KB_ROOT)) return res.status(403).json({ error: 'forbidden' });
    await writeFile(abs, content, 'utf-8');
    res.json({ ok: true, reason });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/article/create', async (req, res) => {
  try {
    const { filePath, content } = req.body;
    if (!filePath) return res.status(400).json({ error: 'filePath required' });
    const abs = path.resolve(KB_ROOT, filePath);
    if (!abs.startsWith(KB_ROOT)) return res.status(403).json({ error: 'forbidden' });
    await mkdir(path.dirname(abs), { recursive: true });
    await writeFile(abs, content || '', 'utf-8');
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/article/append-section', async (req, res) => {
  try {
    const { filePath, title, content } = req.body;
    if (!filePath || !title || !content) return res.status(400).json({ error: 'filePath, title and content required' });
    const abs = path.resolve(KB_ROOT, filePath);
    if (!abs.startsWith(KB_ROOT)) return res.status(403).json({ error: 'forbidden' });
    const existing = await readFile(abs, 'utf-8').catch(() => '');
    const updated = existing.trimEnd() + '\n\n## ' + title + '\n\n' + content + '\n';
    await writeFile(abs, updated, 'utf-8');
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Widgets API ---

app.get('/api/widgets', async (req, res) => {
  try {
    const widgetsDir = path.join(KB_ROOT, 'viz', 'widgets');
    await mkdir(widgetsDir, { recursive: true });
    const entries = await readdir(widgetsDir);
    const widgets = [];
    for (const fname of entries) {
      if (!fname.endsWith('.html')) continue;
      const abs = path.join(widgetsDir, fname);
      const s = await stat(abs);
      widgets.push({ name: fname.replace('.html', ''), file: fname, path: 'viz/widgets/' + fname, created: s.mtime });
    }
    widgets.sort((a, b) => new Date(b.created) - new Date(a.created));
    res.json(widgets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/widget-content', async (req, res) => {
  try {
    const fname = req.query.file;
    if (!fname) return res.status(400).json({ error: 'file required' });
    const abs = path.resolve(KB_ROOT, 'viz', 'widgets', fname);
    if (!abs.startsWith(path.join(KB_ROOT, 'viz', 'widgets'))) return res.status(403).json({ error: 'forbidden' });
    const content = await readFile(abs, 'utf-8');
    res.json({ ok: true, html_content: content });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.get('/api/widget-html', async (req, res) => {
  try {
    const fname = req.query.file;
    if (!fname) return res.status(400).send('file required');
    const abs = path.resolve(KB_ROOT, 'viz', 'widgets', fname);
    if (!abs.startsWith(path.join(KB_ROOT, 'viz', 'widgets'))) return res.status(403).send('forbidden');
    const content = await readFile(abs, 'utf-8');
    res.setHeader('Content-Type', 'text/html');
    res.send(content);
  } catch (err) {
    res.status(404).send('Not found');
  }
});

app.post('/api/generate-widget', async (req, res) => {
  try {
    const { prompt, data_context } = req.body;
    if (!prompt) return res.status(400).json({ error: 'prompt required' });

    const systemPrompt = `Generás visualizaciones interactivas como HTML completo self-contained.
Usás Chart.js, D3.js v7, Observable Plot o Mermaid según lo más apropiado.
El HTML incluye las libraries via CDN, los datos hardcodeados, estilos dark theme (#0d0d16 bg, #cba6f7 accent) y es completamente standalone.
Solo devolvés el HTML, sin explicaciones, sin markdown.`;

    const userMsg = data_context
      ? `Visualización: ${prompt}\n\nDatos/contexto:\n${data_context}`
      : `Visualización: ${prompt}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMsg }
      ]
    });

    let html = completion.choices[0].message.content.trim();
    // Strip markdown code fences if present
    if (html.startsWith('```')) {
      html = html.replace(/^```html?\n?/, '').replace(/\n?```$/, '');
    }

    const slug = prompt.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40);
    const ts = Date.now();
    const fileName = `${slug}-${ts}.html`;
    const widgetsDir = path.join(KB_ROOT, 'viz', 'widgets');
    await mkdir(widgetsDir, { recursive: true });
    await writeFile(path.join(widgetsDir, fileName), html, 'utf-8');

    res.json({ ok: true, html_content: html, file_path: 'viz/widgets/' + fileName });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Git History ---

// Fast endpoint: just the last-modified date (git or mtime fallback)
app.get('/api/file-date', async (req, res) => {
  try {
    const filePath = req.query.path;
    if (!filePath) return res.status(400).json({ error: 'path required' });
    const abs = path.resolve(KB_ROOT, filePath);
    if (!abs.startsWith(KB_ROOT)) return res.status(403).json({ error: 'forbidden' });
    // Try git log first (fast, one commit)
    const { stdout } = await execAsync(
      `git -C ${JSON.stringify(KB_ROOT)} log -1 --pretty=format:"%ar|%ad" --date=format:"%Y-%m-%d" -- ${JSON.stringify(filePath)}`,
      { timeout: 3000 }
    ).catch(() => ({ stdout: '' }));
    if (stdout.trim()) {
      const [relative, iso] = stdout.trim().split('|');
      return res.json({ date: iso, relative, source: 'git' });
    }
    // Fallback: filesystem mtime
    const s = statSync(abs);
    const d = s.mtime;
    const iso = d.toISOString().slice(0, 10);
    const diff = Date.now() - d.getTime();
    const days = Math.floor(diff / 86400000);
    const relative = days === 0 ? 'hoy' : days === 1 ? 'ayer' : `hace ${days} días`;
    return res.json({ date: iso, relative, source: 'fs' });
  } catch { res.json({ date: null, relative: null }); }
});

app.get('/api/git-history', async (req, res) => {
  try {
    const filePath = req.query.path;
    if (!filePath) return res.status(400).json({ error: 'path required' });
    const abs = path.resolve(KB_ROOT, filePath);
    if (!abs.startsWith(KB_ROOT)) return res.status(403).json({ error: 'forbidden' });
    const { stdout } = await execAsync(
      `git -C ${JSON.stringify(KB_ROOT)} log --follow --pretty=format:"%H|%an|%ae|%ar|%s" -20 -- ${JSON.stringify(filePath)}`,
      { timeout: 10000 }
    );
    const commits = stdout.trim().split('\n').filter(Boolean).map(line => {
      const [hash, author, email, when, ...msgParts] = line.split('|');
      return { hash, author, email, when, message: msgParts.join('|') };
    });
    res.json(commits);
  } catch (err) {
    res.json([]);
  }
});

app.get('/api/git-diff', async (req, res) => {
  try {
    const { path: filePath, hash } = req.query;
    if (!filePath || !hash) return res.status(400).json({ error: 'path and hash required' });
    if (!/^[a-f0-9]+$/i.test(hash)) return res.status(400).json({ error: 'invalid hash' });
    const { stdout } = await execAsync(
      `git -C ${JSON.stringify(KB_ROOT)} show --stat ${hash} -- ${JSON.stringify(filePath)}`,
      { timeout: 10000 }
    );
    res.json({ diff: stdout });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Article Save (with git commit) ---

app.post('/api/article/save', async (req, res) => {
  try {
    const { filePath, content, commitMessage, userId } = req.body;
    if (!filePath || content == null) return res.status(400).json({ error: 'filePath and content required' });
    const abs = path.resolve(KB_ROOT, filePath);
    if (!abs.startsWith(KB_ROOT)) return res.status(403).json({ error: 'forbidden' });
    await writeFile(abs, content, 'utf-8');

    // Bump the file version so other clients can detect the remote change
    const newHash = await hashFileContent(content);
    fileVersions.set(filePath, {
      hash: newHash,
      savedAt: new Date().toISOString(),
      savedBy: userId || null,
    });
    // Clear the dirty flag for the saving user (and for everyone who had the
    // same content hash — they just got what they were trying to save)
    const editors = presenceMap.get(filePath);
    if (editors && userId && editors.has(userId)) {
      editors.get(userId).dirty = false;
      editors.get(userId).lastSeen = Date.now();
    }

    const msg = (commitMessage || 'Edit: ' + path.basename(filePath)).replace(/"/g, '\\"');
    await execAsync('git -C ' + JSON.stringify(KB_ROOT) + ' add ' + JSON.stringify(abs));
    const { stdout: diffOut } = await execAsync('git -C ' + JSON.stringify(KB_ROOT) + ' diff --cached --name-only');
    if (!diffOut.trim()) {
      return res.json({ ok: true, commitHash: null, message: 'No changes to commit', fileVersion: fileVersions.get(filePath) });
    }
    const { stdout } = await execAsync('git -C ' + JSON.stringify(KB_ROOT) + ' commit -m "' + msg + '"');
    const hashMatch = stdout.match(/\[[\w-]+ ([a-f0-9]+)\]/);

    // Best-effort git push — fire and forget so the client isn't blocked on
    // slow networks. Fails silently when there's no remote configured or the
    // remote rejects (auth/permissions) — we surface it in the response so the
    // UI can show a hint but the save is already committed locally.
    let pushResult = { ok: null, error: null };
    try {
      const { stdout: pushOut, stderr: pushErr } = await execAsync(
        'git -C ' + JSON.stringify(KB_ROOT) + ' push 2>&1',
        { timeout: 15000 }
      );
      pushResult = { ok: true, output: (pushOut || pushErr || '').slice(0, 500) };
    } catch (pushErr) {
      pushResult = { ok: false, error: (pushErr.message || '').slice(0, 500) };
    }

    res.json({
      ok: true,
      commitHash: hashMatch ? hashMatch[1] : null,
      fileVersion: fileVersions.get(filePath),
      push: pushResult,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Presence System ---

const presenceMap = new Map(); // filePath → Map<userId, { userId, userName, color, since, lastSeen, cursor, dirty }>

// File version map: filePath → { hash, savedAt, savedBy }
// Every successful /api/article/save bumps the hash. Clients compare it
// against their last-known hash to detect remote changes and auto-reload.
const fileVersions = new Map();

async function hashFileContent(content) {
  const { createHash } = await import('crypto');
  return createHash('sha256').update(content).digest('hex').slice(0, 12);
}

async function getFileVersion(filePath) {
  // Always compute from disk — safe for Vercel serverless where in-memory Maps
  // are not shared across instances. Falls back to cached value if file read fails.
  try {
    const abs = path.resolve(KB_ROOT, filePath);
    if (!abs.startsWith(KB_ROOT)) return fileVersions.get(filePath) || null;
    const content = await readFile(abs, 'utf-8');
    const hash = await hashFileContent(content);
    const version = { hash, savedAt: Date.now(), savedBy: null };
    fileVersions.set(filePath, version);
    return version;
  } catch {
    return fileVersions.get(filePath) || null;
  }
}

function getPresenceColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  const hue = Math.abs(h) % 360;
  return `hsl(${hue}, 70%, 65%)`;
}

// Cleanup stale presence every 10s
setInterval(() => {
  const now = Date.now();
  for (const [fp, editors] of presenceMap) {
    for (const [uid, info] of editors) {
      if (now - info.lastSeen > 30000) editors.delete(uid);
    }
    if (editors.size === 0) presenceMap.delete(fp);
  }
}, 10000);

app.get('/api/presence', async (req, res) => {
  const fp = req.query.filePath;
  if (!fp) return res.json({ editors: [], fileVersion: null });
  const editors = presenceMap.get(fp);
  // getFileVersion now reads from disk — works correctly in Vercel serverless
  const fileVersion = await getFileVersion(fp);
  if (!editors || editors.size === 0) return res.json({ editors: [], fileVersion });
  res.json({
    editors: [...editors.values()].map(({ userId, userName, color, since, cursor, dirty }) => ({
      id: userId,
      name: userName,
      color,
      since,
      cursor: cursor || null,
      dirty: !!dirty,
    })),
    fileVersion,
  });
});

app.post('/api/presence/join', (req, res) => {
  const { filePath, userId, userName, cursor, dirty } = req.body;
  if (!filePath || !userId) return res.status(400).json({ error: 'filePath and userId required' });
  if (!presenceMap.has(filePath)) presenceMap.set(filePath, new Map());
  const name = userName || 'Anonymous';
  const existing = presenceMap.get(filePath).get(userId) || {};
  presenceMap.get(filePath).set(userId, {
    userId,
    userName: name,
    color: getPresenceColor(name),
    since: existing.since || new Date().toISOString(),
    lastSeen: Date.now(),
    cursor: cursor ?? existing.cursor ?? null,
    dirty: dirty ?? existing.dirty ?? false,
  });
  res.json({ ok: true, fileVersion: getFileVersion(filePath) });
});

// Lightweight cursor-only update — called from the editor on caret change.
// Also carries the dirty flag so other users can see unsaved-edits indicators.
app.post('/api/presence/cursor', (req, res) => {
  const { filePath, userId, cursor, dirty } = req.body;
  if (!filePath || !userId) return res.status(400).json({ error: 'filePath and userId required' });
  const editors = presenceMap.get(filePath);
  if (!editors || !editors.has(userId)) return res.json({ ok: true, warning: 'not joined' });
  const entry = editors.get(userId);
  if (cursor !== undefined) entry.cursor = cursor;
  if (dirty !== undefined) entry.dirty = !!dirty;
  entry.lastSeen = Date.now();
  res.json({ ok: true });
});

app.post('/api/presence/leave', (req, res) => {
  const { filePath, userId } = req.body;
  if (filePath && userId && presenceMap.has(filePath)) {
    presenceMap.get(filePath).delete(userId);
    if (presenceMap.get(filePath).size === 0) presenceMap.delete(filePath);
  }
  res.json({ ok: true });
});

app.get('/api/presence/stream', (req, res) => {
  const fp = req.query.filePath;
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  const interval = setInterval(() => {
    const editors = presenceMap.get(fp);
    const list = editors ? [...editors.values()].map(({ userId, userName, color, since }) => ({ id: userId, name: userName, color, since })) : [];
    res.write(`data: ${JSON.stringify({ editors: list })}\n\n`);
  }, 5000);
  req.on('close', () => clearInterval(interval));
});

// --- Frontend ---

// Permalink routes — tab URLs (/ideas, /prime, /decisions, etc) and wiki file URLs (/w/*)
// all serve the SPA shell; the client-side router in app.js decodes the URL and
// switches state. See applyUrlState() in app.js.
const PERMALINK_TABS = ['dashboard', 'wiki', 'ideas', 'widgets', 'nexus', 'feed', 'pipelines', 'prime', 'decisions', 'books', 'agents'];
const serveSpaShell = (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(HTML);
};
app.get('/', serveSpaShell);
for (const t of PERMALINK_TABS) {
  app.get('/' + t, serveSpaShell);
}
app.get(/^\/w\/.+/, serveSpaShell); // /w/<any wiki file path>
app.get(/^\/book\/[a-z0-9-]+\/?$/i, serveSpaShell); // /book/<slug>

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${KB_DISPLAY_NAME}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:wght@700;900&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
<link id="kb-theme-link" rel="stylesheet" href="/themes/${KB_THEME}/tokens.css">
<!-- CodeMirror CSS must come BEFORE our _shared/components.css so our overrides
     win (cursor color, gutter background, selection, token colors). -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/codemirror@5.65.16/lib/codemirror.min.css">
<link rel="stylesheet" href="/themes/_shared/components.css">
<script src="https://unpkg.com/lucide@0.378.0/dist/umd/lucide.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/highlight.min.js" defer></script>
<!-- CodeMirror 5 modes + hint addon for autocomplete (wikilinks + anyword) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/codemirror@5.65.16/addon/hint/show-hint.min.css">
<script src="https://cdn.jsdelivr.net/npm/codemirror@5.65.16/lib/codemirror.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/codemirror@5.65.16/mode/shell/shell.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/codemirror@5.65.16/mode/yaml/yaml.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/codemirror@5.65.16/mode/javascript/javascript.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/codemirror@5.65.16/mode/python/python.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/codemirror@5.65.16/mode/markdown/markdown.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/codemirror@5.65.16/addon/hint/show-hint.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/codemirror@5.65.16/addon/hint/anyword-hint.min.js" defer></script>
<script>
  (function () {
    var override = null;
    try { override = localStorage.getItem('kb-theme'); } catch (e) {}
    if (override && override !== ${JSON.stringify(KB_THEME)}) {
      var link = document.getElementById('kb-theme-link');
      if (link) link.href = '/themes/' + override + '/tokens.css';
    }
  })();
</script>
</head>
<body>
<div id="reading-progress"></div>
<button id="reading-mode-exit" onclick="toggleReadingMode(false)"><i data-lucide="x"></i> Exit reading</button>
<div id="app">
  <!-- Global top nav bar: logo + tabs + user. Spans full viewport width. -->
  <nav id="top-nav-bar">
    <div id="top-brand">
      <button id="top-hamburger" title="Toggle sidebar"><i data-lucide="menu"></i></button>
      <span id="top-logo"><i data-lucide="hexagon" style="width:16px;height:16px;color:var(--accent);"></i>${KB_DISPLAY_NAME}</span>
    </div>
    <div class="tab-bar" id="top-tab-bar">
      <button class="tab-btn" data-tab="dashboard"><i data-lucide="layout-dashboard"></i>Dashboard</button>
      <button class="tab-btn active" data-tab="wiki"><i data-lucide="book-open"></i>Wiki</button>
      <button class="tab-btn" data-tab="ideas"><i data-lucide="lightbulb"></i>Ideas</button>
      <button class="tab-btn" data-tab="widgets"><i data-lucide="sparkles"></i>Widgets</button>
      <button class="tab-btn" data-tab="nexus"><i data-lucide="network"></i>GitNexus</button>
      <button class="tab-btn" data-tab="feed"><i data-lucide="film"></i>Feed</button>
      <button class="tab-btn" data-tab="trees"><i data-lucide="git-branch"></i>Trees</button>
      <button class="tab-btn" data-tab="pipelines"><i data-lucide="workflow"></i>Pipelines</button>
      <button class="tab-btn" data-tab="prime"><i data-lucide="package"></i>Prime</button>
      <button class="tab-btn" data-tab="decisions"><i data-lucide="gavel"></i>Decisions</button>
      <button class="tab-btn" data-tab="books"><i data-lucide="library"></i>Books</button>
      <button class="tab-btn" data-tab="agents"><i data-lucide="bot"></i>Agents</button>
    </div>
    <div id="top-actions">
      <button id="btn-new-page" title="New page" class="top-action-btn"><i data-lucide="plus"></i> New</button>
      <button id="btn-book-about" title="Compose a book about a topic" class="top-action-btn"><i data-lucide="book-open-text"></i> Book about…</button>
      <a href="/auth/github" id="github-login-btn" class="top-action-btn"><svg viewBox="0 0 16 16" width="14" height="14" style="vertical-align:-2px;"><path fill="currentColor" fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg> GitHub</a>
      <a href="/auth/google" id="google-login-btn" class="top-action-btn" style="display:none;"><svg viewBox="0 0 24 24" width="14" height="14" style="vertical-align:-2px;"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> Google</a>
      <div id="user-info"><img id="user-avatar" src="" alt=""><span id="user-name"></span><button id="logout-btn" title="Logout">&times;</button></div>
    </div>
  </nav>

  <div id="main-area">
  <div id="sidebar">
    <div id="sidebar-header">
      <div style="position:relative;">
        <i data-lucide="search" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);width:14px;height:14px;color:var(--subtext);pointer-events:none;"></i>
        <input id="search-box" type="text" placeholder="Search articles..." style="padding-left:34px;" />
      </div>
    </div>
    <div id="file-tree"></div>
    <div id="search-results"></div>
    <div id="sidebar-footer" style="padding:10px 14px;border-top:1px solid var(--surface2);display:flex;align-items:center;gap:8px;">
      <span style="font-size:10px;color:var(--subtext);font-family:'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:.08em;">Theme</span>
      <select id="theme-picker" onchange="switchTheme(this.value)" style="flex:1;padding:6px 8px;background:var(--surface2);border:1px solid var(--surface3);color:var(--text);border-radius:6px;font-size:11px;font-family:'Inter',sans-serif;cursor:pointer;outline:none;">
        <optgroup label="Dark">
          <option value="catppuccin">Catppuccin Mocha</option>
          <option value="primer">GitHub Primer</option>
        </optgroup>
        <optgroup label="Light">
          <option value="catppuccin-light">Catppuccin Latte</option>
          <option value="primer-light">GitHub Primer Light</option>
        </optgroup>
      </select>
    </div>
  </div>
  <div id="sidebar-overlay"></div>
  <div id="content">
    <div id="content-header">
      <div class="breadcrumb" id="breadcrumb" style="min-width:0;flex:1;flex-wrap:wrap;"><span class="bc-part" style="color:var(--subtext)">Select a file</span></div>
      <button id="btn-edit-inline" class="top-action-btn" style="display:none;" title="Edit this page"><i data-lucide="pencil"></i> Edit page</button>
      <span class="last-edited" id="last-edited" style="display:none;flex-shrink:0;"></span>
      <span class="filepath" id="current-path" style="display:none;">Select a file</span>
      <span class="presence-avatars" id="presence-avatars"></span>
      <span class="unsaved-dot" id="unsaved-dot"></span>
    </div>

    <!-- Floating right rail: subtle action bar pinned to the right edge of the document -->
    <aside id="doc-action-rail">
      <button id="btn-edit" class="rail-btn" title="Edit article"><i data-lucide="pencil"></i></button>
      <button id="btn-history" class="rail-btn" title="Git history"><i data-lucide="history"></i></button>
      <button id="btn-zoom" class="rail-btn btn-zoom" title="Zoom" onclick="toggleZoomPanel()"><i data-lucide="zoom-in"></i></button>
      <button id="btn-graph" class="rail-btn" title="Knowledge graph"><i data-lucide="share-2"></i></button>
      <button id="btn-reading-mode" class="rail-btn" title="Reading mode"><i data-lucide="book-open-text"></i></button>
      <button id="btn-voice" class="rail-btn" title="Voice ingest"><i data-lucide="mic"></i></button>
      <button id="btn-realtime-voice" class="rail-btn" title="Voice assistant"><i data-lucide="headphones"></i></button>
      <button id="btn-comments" class="rail-btn" title="Comments"><i data-lucide="message-square"></i><span id="comments-badge-wrap"></span></button>
    </aside>
    <div class="presence-banner" id="presence-banner"></div>
    <div id="zoom-panel"></div>
    <div id="editor-container">
      <div class="editor-toolbar">
        <button class="btn-save" id="editor-save"><i data-lucide="save"></i> Save</button>
        <button class="btn-discard" id="editor-discard">Discard</button>
        <button class="btn-fullscreen" id="editor-fullscreen"><i data-lucide="maximize"></i> Fullscreen</button>
        <span class="tb-sep"></span>
        <!-- Formatting -->
        <button class="tb-btn" data-fmt="bold" title="Bold (Cmd/Ctrl+B)"><i data-lucide="bold"></i></button>
        <button class="tb-btn" data-fmt="italic" title="Italic (Cmd/Ctrl+I)"><i data-lucide="italic"></i></button>
        <button class="tb-btn" data-fmt="strike" title="Strikethrough"><i data-lucide="strikethrough"></i></button>
        <span class="tb-sep"></span>
        <button class="tb-btn" data-fmt="h1" title="Heading 1"><i data-lucide="heading-1"></i></button>
        <button class="tb-btn" data-fmt="h2" title="Heading 2"><i data-lucide="heading-2"></i></button>
        <button class="tb-btn" data-fmt="h3" title="Heading 3"><i data-lucide="heading-3"></i></button>
        <span class="tb-sep"></span>
        <button class="tb-btn" data-fmt="ul" title="Bullet list"><i data-lucide="list"></i></button>
        <button class="tb-btn" data-fmt="ol" title="Numbered list"><i data-lucide="list-ordered"></i></button>
        <button class="tb-btn" data-fmt="quote" title="Blockquote"><i data-lucide="quote"></i></button>
        <button class="tb-btn" data-fmt="task" title="Task list"><i data-lucide="square-check"></i></button>
        <span class="tb-sep"></span>
        <button class="tb-btn" data-fmt="link" title="Insert link"><i data-lucide="link"></i></button>
        <button class="tb-btn" data-fmt="wikilink" title="Insert wiki page"><i data-lucide="book-marked"></i></button>
        <button class="tb-btn" data-fmt="code" title="Inline code"><i data-lucide="code"></i></button>
        <button class="tb-btn" data-fmt="codeblock" title="Code block"><i data-lucide="code-2"></i></button>
        <button class="tb-btn" data-fmt="hr" title="Horizontal rule"><i data-lucide="minus"></i></button>
        <span class="tb-sep"></span>
        <button class="btn-media tb-btn" id="editor-upload-img" title="Upload image"><i data-lucide="image"></i></button>
        <button class="btn-media tb-btn" id="editor-gen-img" title="Generate image with DALL-E"><i data-lucide="image-plus"></i></button>
        <button class="btn-media tb-btn" id="editor-gen-video" title="Generate video"><i data-lucide="video"></i></button>
        <input type="file" id="editor-file-input" accept="image/*" style="display:none" />
        <span class="save-indicator" id="save-indicator"></span>
      </div>

      <!-- Wiki page picker modal (triggered by the wikilink toolbar button) -->
      <div id="wiki-picker-modal" style="display:none;">
        <div class="wiki-picker-shell">
          <div class="wiki-picker-header">
            <i data-lucide="book-marked" style="width:15px;height:15px;color:var(--accent);"></i>
            <input id="wiki-picker-input" type="text" placeholder="Search wiki pages…" />
            <button onclick="closeWikiPicker()" class="wiki-picker-close"><i data-lucide="x"></i></button>
          </div>
          <div class="wiki-picker-list" id="wiki-picker-list"></div>
        </div>
      </div>
      <div class="editor-split">
        <div class="editor-pane" style="position:relative;">
          <textarea id="editor-textarea" spellcheck="false"></textarea>
          <div id="wikilink-dropdown"></div>
        </div>
        <div class="editor-preview md-content" id="editor-preview"></div>
      </div>
    </div>
    
    <!-- Repo Panel — shown for raw/projects/ articles -->
    <div id="repo-panel" style="display:none;margin:0 32px 16px;border:1px solid var(--surface2);border-radius:8px;overflow:hidden;">
      <div id="repo-header" style="padding:10px 16px;background:var(--surface);display:flex;align-items:center;justify-content:space-between;gap:12px;">
        <div>
          <span id="repo-title" style="font-size:13px;font-weight:700;color:var(--accent)">📦 Cargando repo...</span>
          <span id="repo-meta" style="font-size:11px;color:var(--subtext);margin-left:8px;"></span>
        </div>
        <div style="display:flex;gap:6px;">
          <button class="repo-tab-btn active" data-tab="readme" onclick="switchRepoTab('readme',this)"><i data-lucide="file-text"></i> README</button>
          <button class="repo-tab-btn" data-tab="files" onclick="switchRepoTab('files',this)"><i data-lucide="folder-tree"></i> Files</button>
          <button class="repo-tab-btn" data-tab="ask" onclick="switchRepoTab('ask',this)"><i data-lucide="message-circle"></i> Ask</button>
        </div>
      </div>
      <div id="repo-readme" class="repo-tab-content active md-content" style="padding:16px;max-height:400px;overflow-y:auto;font-size:13px;"></div>
      <div id="repo-files" class="repo-tab-content" style="display:none;padding:16px;max-height:400px;overflow-y:auto;">
        <div id="repo-file-list" style="font-family:monospace;font-size:12px;"></div>
        <div id="repo-file-content" style="display:none;margin-top:12px;padding:12px;background:var(--bg);border-radius:6px;font-size:12px;font-family:monospace;white-space:pre-wrap;max-height:200px;overflow-y:auto;"></div>
      </div>
      <div id="repo-ask" class="repo-tab-content" style="display:none;padding:16px;">
        <div id="repo-chat-msgs" style="max-height:200px;overflow-y:auto;margin-bottom:12px;font-size:13px;"></div>
        <div style="display:flex;gap:8px;">
          <input id="repo-question" type="text" placeholder="Preguntá sobre el código..." style="flex:1;background:var(--bg);border:1px solid var(--surface2);border-radius:6px;padding:8px 12px;color:var(--text);font-size:13px;outline:none;">
          <button onclick="askRepo()" style="background:var(--accent);border:none;border-radius:6px;padding:8px 14px;color:var(--bg);font-weight:700;cursor:pointer;font-size:12px;">Preguntar</button>
        </div>
      </div>
      <div style="padding:10px 16px;border-top:1px solid var(--surface2);display:flex;justify-content:flex-end;">
        <button onclick="suggestRepo()" style="background:var(--surface2);border:1px solid var(--surface3);color:var(--text);padding:6px 14px;border-radius:6px;cursor:pointer;font-size:12px;">💡 Sugerir mejora</button>
        <a id="repo-link" href="#" target="_blank" style="margin-left:8px;background:var(--surface2);border:1px solid var(--surface3);color:var(--text);padding:6px 14px;border-radius:6px;font-size:12px;text-decoration:none;">⬡ Ver en GitHub</a>
      </div>
    </div>
    <div id="content-body">
      <div class="home-hub" id="home-hub">
        <h1><i data-lucide="hexagon"></i>Wany Knowledge Base</h1>
        <p class="tagline">Knowledge Fulfillment Center · Pick → Pack → Deliver</p>

        <h2><i data-lucide="activity"></i>Warehouse stats</h2>
        <div class="home-hub-grid" id="home-stats">
          <div class="home-stat-card" onclick="document.querySelector('[data-tab=\\'prime\\']').click()">
            <div class="label">Raw in warehouse</div>
            <div class="value" id="hh-raw">—</div>
            <div class="meta">Sources awaiting pack</div>
          </div>
          <div class="home-stat-card" onclick="document.querySelector('[data-tab=\\'wiki\\']').click()">
            <div class="label">Wiki compiled</div>
            <div class="value" id="hh-wiki">—</div>
            <div class="meta">Structured concepts</div>
          </div>
          <div class="home-stat-card" onclick="document.querySelector('[data-tab=\\'decisions\\']').click()">
            <div class="label">ADRs</div>
            <div class="value" id="hh-adrs">—</div>
            <div class="meta">Architectural decisions</div>
          </div>
          <div class="home-stat-card" onclick="document.querySelector('[data-tab=\\'ideas\\']').click()">
            <div class="label">Ideas</div>
            <div class="value" id="hh-ideas">—</div>
            <div class="meta">Daily AI proposals</div>
          </div>
        </div>

        <h2><i data-lucide="zap"></i>Quick actions</h2>
        <div class="home-quick-actions">
          <button class="home-quick-action" onclick="openNewPageModal()"><i data-lucide="plus"></i>New page</button>
          <button class="home-quick-action" onclick="document.querySelector('[data-tab=\\'prime\\']').click()"><i data-lucide="package"></i>Knowledge Prime</button>
          <button class="home-quick-action" onclick="document.querySelector('[data-tab=\\'decisions\\']').click()"><i data-lucide="gavel"></i>Decisions timeline</button>
          <button class="home-quick-action" onclick="document.querySelector('[data-tab=\\'nexus\\']').click()"><i data-lucide="network"></i>Graph explorer</button>
          <button class="home-quick-action" onclick="document.querySelector('[data-tab=\\'feed\\']').click()"><i data-lucide="film"></i>Feed</button>
        </div>

        <h2><i data-lucide="clock"></i>Recently updated</h2>
        <div class="home-recent-list" id="home-recent"></div>

        <h2><i data-lucide="lightbulb"></i>Latest ideas</h2>
        <div class="home-recent-list" id="home-latest-ideas"></div>
      </div>
    </div>
    <div id="dashboard-panel" style="display:none;flex:1;overflow-y:auto;padding:32px 48px;"></div>
    <div id="ideas-panel"></div>
    <div id="widgets-panel"></div>
    <div id="nexus-panel" style="display:none;flex:1;flex-direction:column;overflow:hidden;position:relative;">
      <div id="nexus-toolbar" style="padding:12px 24px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px;flex-shrink:0;">
        <span style="font-size:13px;font-weight:600;color:var(--accent);">🕸 GitNexus</span>
        <span id="nexus-stats" style="font-size:11px;color:var(--subtext);"></span>
        <div style="margin-left:auto;display:flex;gap:8px;">
          <input id="nexus-search" type="text" placeholder="Buscar nodo..." style="background:var(--surface2);border:1px solid var(--border);color:var(--text);padding:5px 10px;border-radius:6px;font-size:12px;width:180px;" oninput="nexusSearch(this.value)">
          <select id="nexus-filter" onchange="nexusFilter(this.value)" style="background:var(--surface2);border:1px solid var(--border);color:var(--text);padding:5px 8px;border-radius:6px;font-size:12px;">
            <option value="all">Todos los tipos</option>
            <option value="File">Archivos</option>
            <option value="Section">Secciones</option>
            <option value="Function">Funciones</option>
            <option value="Class">Clases</option>
          </select>
          <button onclick="nexusReset()" style="background:var(--surface2);border:1px solid var(--border);color:var(--text);padding:5px 10px;border-radius:6px;font-size:12px;cursor:pointer;">Reset</button>
        </div>
      </div>
      <div id="nexus-graph" style="flex:1;min-height:0;height:100%;width:100%;"></div>
      <div id="nexus-detail" style="display:none;position:absolute;right:16px;top:80px;width:280px;background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:16px;font-size:12px;z-index:100;max-height:60vh;overflow-y:auto;"></div>
    </div>
    <div id="feed-panel" style="display:none;flex:1;flex-direction:column;overflow:hidden;background:var(--bg);">
      <!-- Mode switcher -->
      <div style="display:flex;gap:0;border-bottom:1px solid var(--border);flex-shrink:0;background:var(--surface);">
        <button id="feed-mode-wiki" onclick="setFeedMode('wiki')" style="flex:1;padding:10px;border:none;background:var(--accent);color:var(--accent-fg);font-size:13px;font-weight:700;cursor:pointer;">📖 Wiki</button>
        <button id="feed-mode-news" onclick="setFeedMode('news')" style="flex:1;padding:10px;border:none;background:var(--surface);color:var(--subtext);font-size:13px;font-weight:600;cursor:pointer;">📰 Noticias</button>
      </div>

      <!-- Wiki TikTok feed -->
      <div id="feed-wiki" style="flex:1;overflow-y:scroll;scroll-snap-type:y mandatory;scroll-behavior:smooth;">
        <div id="feed-wiki-cards" style=""></div>
      </div>

      <!-- News Stories -->
      <div id="feed-news" style="display:none;flex:1;flex-direction:column;overflow:hidden;">
        <!-- Progress bars -->
        <div id="stories-progress" style="display:flex;gap:3px;padding:8px 12px;flex-shrink:0;">
        </div>
        <!-- Story card -->
        <div id="story-card" style="flex:1;padding:20px 24px;display:flex;flex-direction:column;justify-content:flex-end;cursor:pointer;position:relative;">
          <div id="story-bg" style="position:absolute;inset:0;background:linear-gradient(180deg,transparent 30%,rgba(0,0,0,0.85) 100%);border-radius:0;"></div>
          <div style="position:relative;z-index:1;">
            <div id="story-source" style="font-size:10px;color:#cba6f7;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px;"></div>
            <div id="story-title" style="font-size:20px;font-weight:800;color:#fff;line-height:1.3;margin-bottom:10px;"></div>
            <div id="story-meta" style="font-size:12px;color:rgba(255,255,255,0.6);margin-bottom:16px;"></div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <button onclick="prevStory()" style="background:rgba(255,255,255,0.15);border:none;color:#fff;padding:8px 16px;border-radius:20px;font-size:13px;cursor:pointer;">← Anterior</button>
              <button onclick="nextStory()" style="background:rgba(255,255,255,0.15);border:none;color:#fff;padding:8px 16px;border-radius:20px;font-size:13px;cursor:pointer;">Siguiente →</button>
              <button id="story-open-btn" onclick="openCurrentStory()" style="background:var(--accent);color:var(--accent-fg);border:none;padding:8px 18px;border-radius:20px;font-size:13px;font-weight:700;cursor:pointer;">🔗 Abrir</button>
            </div>
          </div>
        </div>
        <!-- Tap zones -->
        <div onclick="prevStory()" style="position:absolute;left:0;top:60px;width:30%;height:calc(100% - 120px);z-index:5;cursor:pointer;"></div>
        <div onclick="nextStory()" style="position:absolute;right:0;top:60px;width:30%;height:calc(100% - 120px);z-index:5;cursor:pointer;"></div>
      </div>
    </div>
    <div id="trees-panel" style="display:none;flex:1;flex-direction:column;overflow-y:auto;">
      <div style="padding:32px 48px;">
        <div style="margin-bottom:28px;">
          <h2 style="font-size:18px;font-weight:700;color:var(--text);margin:0 0 6px;">🌳 Trees</h2>
          <p style="font-size:13px;color:var(--subtext);margin:0;">Recorridos guiados por la documentación — leer múltiples páginas con un propósito claro</p>
        </div>
        <div id="trees-list" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px;"></div>
        <!-- Tree reader -->
        <div id="tree-reader" style="display:none;margin-top:32px;">
          <button onclick="closeTreeReader()" style="background:none;border:none;color:var(--subtext);cursor:pointer;font-size:12px;margin-bottom:16px;padding:0;">← Volver a Trees</button>
          <div id="tree-content"></div>
        </div>
      </div>
    </div>
    <div id="pipelines-panel" style="display:none;flex:1;flex-direction:column;overflow-y:auto;">
      <div style="padding:32px 48px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
          <div>
            <h2 style="font-size:18px;font-weight:700;color:var(--text);margin:0;display:flex;align-items:center;gap:10px;"><i data-lucide="workflow" style="width:20px;height:20px;color:var(--accent);"></i>Pipelines de Ingesta</h2>
            <p style="font-size:12px;color:var(--subtext);margin:4px 0 0;">Sources y scripts que alimentan la KB</p>
          </div>
          <button onclick="loadPipelines()" style="background:var(--surface2);border:1px solid var(--border);color:var(--text);padding:7px 14px;border-radius:6px;font-size:12px;cursor:pointer;">🔄 Refrescar</button>
        </div>
        <div id="pipelines-list">
          <div style="color:var(--subtext);font-size:13px;">Cargando...</div>
        </div>
        <!-- Script editor -->
        <div id="pipeline-editor" style="display:none;margin-top:24px;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
            <span id="pipeline-editor-title" style="font-size:13px;font-weight:600;color:var(--accent);"></span>
            <button onclick="savePipelineScript()" style="background:var(--accent);color:var(--accent-fg);border:none;padding:6px 14px;border-radius:6px;font-size:12px;cursor:pointer;font-weight:600;margin-left:auto;">💾 Guardar</button>
            <button onclick="document.getElementById('pipeline-editor').style.display='none'" style="background:var(--surface2);border:1px solid var(--border);color:var(--subtext);padding:6px 10px;border-radius:6px;font-size:12px;cursor:pointer;">✕</button>
          </div>
          <textarea id="pipeline-script-content" style="width:100%;height:400px;background:var(--surface);border:1px solid var(--border);color:var(--text);font-family:'JetBrains Mono',monospace;font-size:12px;padding:12px;border-radius:6px;resize:vertical;line-height:1.6;box-sizing:border-box;"></textarea>
        </div>
        <!-- Run output -->
        <div id="pipeline-run-output" style="display:none;margin-top:16px;background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:14px;font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text);max-height:200px;overflow-y:auto;white-space:pre-wrap;"></div>
      </div>
    </div>
    <div id="books-panel" style="display:none;flex:1;flex-direction:column;overflow-y:auto;">
      <div style="padding:32px 48px;max-width:1200px;margin:0 auto;width:100%;">
        <div style="display:flex;align-items:baseline;gap:12px;margin-bottom:6px;">
          <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:800;color:var(--text);margin:0;display:flex;align-items:center;gap:12px;"><i data-lucide="library" style="width:26px;height:26px;color:var(--accent);"></i>Books library</h2>
        </div>
        <p style="font-size:13px;color:var(--subtext);margin:0 0 24px;font-family:'Source Serif 4',Georgia,serif;font-style:italic;">AI-composed books built from the wiki. Click any to read, or compose a new one on a fresh topic.</p>
        <div style="display:flex;gap:10px;margin-bottom:26px;">
          <button onclick="openBookModal()" class="pp-btn pp-btn-primary"><i data-lucide="sparkles"></i> Compose new book</button>
          <button onclick="refreshBooksPanel()" class="pp-btn"><i data-lucide="refresh-cw"></i> Refresh</button>
        </div>
        <div id="books-grid" class="books-grid"></div>
      </div>
    </div>

    <div id="agents-panel" style="display:none;flex:1;flex-direction:column;overflow-y:auto;">
      <div style="padding:32px 48px;max-width:1200px;margin:0 auto;width:100%;">
        <div style="display:flex;align-items:baseline;gap:12px;margin-bottom:6px;">
          <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:800;color:var(--text);margin:0;display:flex;align-items:center;gap:12px;"><i data-lucide="bot" style="width:26px;height:26px;color:var(--accent);"></i>Agents</h2>
        </div>
        <p style="font-size:13px;color:var(--subtext);margin:0 0 24px;font-family:'Source Serif 4',Georgia,serif;font-style:italic;">Conversational AI agents scoped to your knowledge base. Each agent has a methodology and a set of stages — open one and feed it a document, an idea, or a proposal.</p>
        <div id="agents-grid" class="agents-grid"></div>
      </div>
    </div>

    <div id="decisions-panel" style="display:none;flex:1;flex-direction:column;overflow-y:auto;">
      <div style="padding:32px 48px;max-width:1100px;margin:0 auto;width:100%;">
        <div style="display:flex;align-items:baseline;gap:12px;margin-bottom:6px;">
          <h2 style="font-size:20px;font-weight:800;color:var(--text);margin:0;display:flex;align-items:center;gap:10px;"><i data-lucide="gavel" style="width:22px;height:22px;color:var(--accent);"></i>Decisions Timeline</h2>
          <span style="font-size:11px;color:var(--subtext);font-family:'JetBrains Mono',monospace;">Architecture Decision Records (ADRs)</span>
        </div>
        <p style="font-size:12px;color:var(--subtext);margin:0 0 24px;">Versioned log of architectural decisions. Each commit should reference a decision-id. The git history becomes the rationale for the codebase.</p>

        <div id="decisions-stats" style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:24px;">
          <div class="prime-stat"><div class="prime-stat-label">Total ADRs</div><div class="prime-stat-val" id="ds-total">—</div></div>
          <div class="prime-stat"><div class="prime-stat-label">Accepted</div><div class="prime-stat-val" id="ds-accepted">—</div></div>
          <div class="prime-stat"><div class="prime-stat-label">Superseded</div><div class="prime-stat-val" id="ds-superseded">—</div></div>
          <div class="prime-stat"><div class="prime-stat-label">Latest</div><div class="prime-stat-val" id="ds-latest" style="font-size:14px;">—</div></div>
        </div>

        <div id="decisions-timeline" style="position:relative;padding-left:24px;border-left:2px solid var(--surface3);"></div>

        <div id="decision-detail" style="display:none;position:fixed;inset:0;background:var(--overlay-600);z-index:200;align-items:center;justify-content:center;padding:40px;backdrop-filter:blur(4px);" onclick="if(event.target===this)closeDecisionDetail()">
          <div style="background:var(--surface);border:1px solid var(--surface3);border-radius:var(--radius);max-width:860px;width:100%;max-height:90vh;overflow-y:auto;padding:32px 40px;">
            <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:16px;">
              <h2 id="dd-title" style="font-size:20px;font-weight:800;color:var(--text);margin:0;"></h2>
              <button onclick="closeDecisionDetail()" style="background:none;border:none;color:var(--subtext);cursor:pointer;padding:4px;"><i data-lucide="x"></i></button>
            </div>
            <div id="dd-meta" style="display:flex;gap:16px;font-size:11px;color:var(--subtext);font-family:'JetBrains Mono',monospace;margin-bottom:20px;flex-wrap:wrap;"></div>
            <div id="dd-body" class="prime-md"></div>
          </div>
        </div>
      </div>
    </div>

    <div id="prime-panel" style="display:none;flex:1;flex-direction:column;overflow-y:auto;">
      <div style="padding:32px 48px;max-width:1100px;margin:0 auto;width:100%;">
        <div style="display:flex;align-items:baseline;gap:12px;margin-bottom:6px;">
          <h2 style="font-size:20px;font-weight:800;color:var(--text);margin:0;display:flex;align-items:center;gap:10px;"><i data-lucide="package" style="width:22px;height:22px;color:var(--accent);"></i>Knowledge Fulfillment Center</h2>
          <span style="font-size:11px;color:var(--subtext);font-family:'JetBrains Mono',monospace;">Pick → Pack → Deliver</span>
        </div>
        <p style="font-size:12px;color:var(--subtext);margin:0 0 20px;">Un agente pide conocimiento; el warehouse entrega contexto estructurado en el budget solicitado.</p>

        <div id="prime-warehouse" style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:20px;">
          <div class="prime-stat"><div class="prime-stat-label">Raw in warehouse</div><div class="prime-stat-val" id="ps-raw">—</div></div>
          <div class="prime-stat"><div class="prime-stat-label">Wiki compiled</div><div class="prime-stat-val" id="ps-wiki">—</div></div>
          <div class="prime-stat"><div class="prime-stat-label">Cache size</div><div class="prime-stat-val" id="ps-cache">—</div></div>
          <div class="prime-stat"><div class="prime-stat-label">Cache hit rate</div><div class="prime-stat-val" id="ps-hit">—</div></div>
        </div>

        <div style="display:flex;gap:8px;margin-bottom:10px;">
          <input id="prime-query" type="text" placeholder="What does the agent need to know?" style="flex:1;padding:12px 16px;background:var(--surface2);border:1px solid var(--surface3);border-radius:var(--radius);color:var(--text);font-family:'Inter',sans-serif;font-size:13px;outline:none;" />
          <select id="prime-format" style="padding:12px;background:var(--surface2);border:1px solid var(--surface3);border-radius:var(--radius);color:var(--text);font-family:'Inter',sans-serif;font-size:12px;">
            <option value="context">context</option>
            <option value="brief">brief</option>
            <option value="agent-prompt">agent-prompt</option>
          </select>
          <button id="prime-fire" onclick="firePrime()" style="padding:12px 22px;background:var(--accent);color:var(--accent-fg);border:none;border-radius:var(--radius);font-weight:700;font-size:13px;cursor:pointer;">Deliver</button>
        </div>

        <div id="prime-tracker" style="display:none;margin:18px 0 6px;">
          <div style="display:flex;gap:10px;align-items:center;">
            <div class="prime-stage" data-stage="pick">Pick</div>
            <div class="prime-stage-arrow" data-arrow="pick-pack"></div>
            <div class="prime-stage" data-stage="pack">Pack</div>
            <div class="prime-stage-arrow" data-arrow="pack-deliver"></div>
            <div class="prime-stage" data-stage="deliver">Deliver</div>
            <div id="prime-tracker-ms" style="margin-left:auto;font-size:11px;color:var(--subtext);font-family:'JetBrains Mono',monospace;"></div>
          </div>
        </div>

        <div id="prime-result" style="margin-top:18px;"></div>

        <div style="margin-top:32px;">
          <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:10px;">
            <h3 style="font-size:13px;font-weight:700;color:var(--text);margin:0;letter-spacing:.5px;">SLA (recent runs)</h3>
            <span id="prime-sla" style="font-size:11px;color:var(--subtext);font-family:'JetBrains Mono',monospace;">—</span>
          </div>
          <div id="prime-recent"></div>
        </div>
      </div>
    </div>
    <div id="backlinks"></div>
  </div>
  </div><!-- /#main-area -->

  <!-- Book About modal + reader -->
  <div id="book-modal">
    <div class="book-modal-shell">
      <div class="book-modal-header">
        <i data-lucide="book-open-text" style="width:18px;height:18px;color:var(--accent);"></i>
        <h2>Compose a book about…</h2>
        <button onclick="closeBookModal()" class="book-modal-close"><i data-lucide="x"></i></button>
      </div>
      <div class="book-modal-body">
        <p class="book-modal-hint">Describe what you want to learn. We'll scan the wiki, pick the most relevant articles, and organize them into a book with chapters you can read top-to-bottom.</p>
        <input id="book-topic-input" type="text" placeholder="e.g. cedar policy patterns, Globant transactions, agent memory architectures…" autofocus />
        <div class="book-modal-lang">
          <label>Language:</label>
          <select id="book-lang">
            <option value="auto">Auto-detect</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
        <div class="book-modal-actions">
          <button onclick="closeBookModal()" class="pp-btn">Cancel</button>
          <button onclick="composeBook()" class="pp-btn pp-btn-primary" id="book-compose-btn"><i data-lucide="sparkles"></i> Compose book</button>
        </div>
        <div id="book-modal-status" class="book-modal-status"></div>
        <div id="book-library" class="book-library"></div>
      </div>
    </div>
  </div>

  <div id="book-reader">
    <aside id="book-toc">
      <div class="book-toc-header">
        <i data-lucide="book-open-text" style="width:14px;height:14px;color:var(--accent);"></i>
        <span>Table of contents</span>
        <button onclick="closeBookReader()" class="book-reader-close" title="Close book"><i data-lucide="x"></i></button>
      </div>
      <nav id="book-toc-list"></nav>
    </aside>
    <main id="book-content">
      <div id="book-content-inner"></div>
    </main>
    <!-- Side panel that opens when the reader clicks a wikilink inside a book
         chapter. Shows the linked wiki article WITHOUT leaving the book. -->
    <aside id="book-side-panel">
      <div class="book-side-header">
        <i data-lucide="file-text" style="width:14px;height:14px;color:var(--accent);"></i>
        <span id="book-side-title">Article</span>
        <button onclick="openSidePanelInWiki()" class="book-side-open" title="Open in wiki"><i data-lucide="external-link"></i></button>
        <button onclick="closeBookSidePanel()" class="book-side-close" title="Close panel"><i data-lucide="x"></i></button>
      </div>
      <div id="book-side-content" class="md-content"></div>
    </aside>
  </div>

  <!-- M6 item 1 — New page modal with side chat -->
  <div id="new-page-modal">
    <div class="npm-shell">
      <div class="npm-header">
        <h2><i data-lucide="file-plus"></i>New page</h2>
        <input type="text" class="npm-title-input" id="npm-title" placeholder="Page title (becomes the slug)" />
        <button class="npm-close" onclick="closeNewPageModal()" title="Close"><i data-lucide="x"></i></button>
      </div>
      <div class="npm-body">
        <div class="npm-editor">
          <textarea id="npm-editor" placeholder="Write in markdown, or ask the AI on the right to draft for you.
It will reply with markdown you can copy in or let it write directly."></textarea>
        </div>
        <div class="npm-chat">
          <div class="npm-chat-header"><i data-lucide="message-circle"></i>AI compose chat</div>
          <div class="npm-chat-messages" id="npm-chat-messages">
            <div class="npm-msg system">Pedile algo al asistente — te escribe secciones, las pega en el editor con "Insert".</div>
          </div>
          <div class="npm-chat-input">
            <input type="text" id="npm-chat-input" placeholder="Ej: dame un borrador sobre cedar policy" />
            <button onclick="sendNewPageChat()"><i data-lucide="send"></i></button>
          </div>
        </div>
      </div>
      <div class="npm-footer">
        <button class="npm-cancel" onclick="closeNewPageModal()">Cancel</button>
        <button class="npm-save" onclick="saveNewPage()"><i data-lucide="save"></i>Save to wiki</button>
      </div>
    </div>
  </div>

  <div id="graph-modal">
    <div id="graph-modal-header">
      <div style="display:flex;align-items:center;gap:12px;"><h3>&#x1F310; Grafo de conocimiento</h3><span class="graph-stats" id="graph-stats"></span></div>
      <div class="graph-controls">
        <button id="btn-zoom-in" title="Zoom in">+</button>
        <button id="btn-zoom-out" title="Zoom out">&minus;</button>
        <button id="btn-zoom-reset" title="Reset zoom">Reset</button>
        <button id="btn-close-graph">Close</button>
      </div>
    </div>
    <div class="graph-area">
      <div id="graph-svg-container"></div>
      <div id="connection-inspector">
        <div class="ci-body"></div>
      </div>
    </div>
  </div>
  <div id="idea-graph-modal">
    <div class="igm-header">
      <h3 id="igm-title">Idea Graph</h3>
      <div class="igm-controls">
        <button id="igm-zoom-in">+</button>
        <button id="igm-zoom-out">&minus;</button>
        <button id="igm-zoom-reset">Reset</button>
        <button id="igm-close">Close</button>
      </div>
    </div>
    <div class="igm-body" id="igm-body"></div>
  </div>
  <div id="voice-modal">
    <div class="voice-box">
      <h3 style="display:flex;align-items:center;gap:8px;"><i data-lucide="mic"></i>Voice Ingest <button id="voice-close" style="margin-left:auto;">&times;</button></h3>
      <div class="voice-waveform"><canvas id="voice-canvas"></canvas></div>
      <div class="voice-controls">
        <button class="voice-btn-record" id="voice-record"><i data-lucide="mic"></i> Grabar</button>
        <button class="voice-btn-stop" id="voice-stop" disabled><i data-lucide="square"></i> Detener</button>
      </div>
      <div class="voice-status" id="voice-status">Presioná Grabar para empezar</div>
      <textarea class="voice-transcript" id="voice-transcript" placeholder="La transcripción aparecerá aquí..."></textarea>
      <div class="voice-save-actions" id="voice-actions">
        <button class="save-raw" id="voice-save-raw">Guardar en raw/</button>
        <button class="save-idea" id="voice-save-idea">Crear idea</button>
      </div>
    </div>
  </div>
  <div id="realtime-modal">
    <div class="rt-box">
      <h3 style="display:flex;align-items:center;gap:8px;"><i data-lucide="headphones"></i>Voice Assistant <button id="rt-close" style="margin-left:auto;">&times;</button></h3>
      <div class="rt-waveform"><canvas id="rt-canvas"></canvas></div>
      <div class="rt-transcript" id="rt-transcript"></div>
      <div class="rt-status" id="rt-status">Conectando...</div>
      <div class="rt-controls">
        <button class="rt-btn-stop pulse" id="rt-stop"><i data-lucide="square"></i> Detener</button>
      </div>
    </div>
  </div>
</div>
<div id="comments-panel">
  <div class="comments-header"><h3>&#x1F4AC; Comments</h3><button id="comments-close">&times;</button></div>
  <div class="comments-list" id="comments-list"></div>
  <div class="comments-form" id="comments-form">
    <div class="cf-selection" id="cf-selection"></div>
    <input type="text" id="cf-anon-name" placeholder="Tu nombre (opcional)" style="display:none;">
    <textarea id="cf-text" placeholder="Escribí un comentario..."></textarea>
    <button class="cf-submit" id="cf-submit">Comentar</button>
  </div>
</div>
<div id="history-panel">
  <div class="history-header"><h3 style="display:flex;align-items:center;gap:8px;"><i data-lucide="history"></i>Git History</h3><button id="history-close">&times;</button></div>
  <div class="history-list" id="history-list"></div>
</div>

<!-- Image Generation Modal -->
<div class="gen-modal-overlay" id="gen-img-modal">
  <div class="gen-modal">
    <h3>&#x1F3A8; Generar imagen con DALL-E 3</h3>
    <label style="font-size:12px;color:var(--subtext);display:block;margin-bottom:4px;">Prompt</label>
    <textarea id="gen-img-prompt" placeholder="Describí la imagen que querés generar..."></textarea>
    <div class="gen-preview" id="gen-img-preview"></div>
    <div class="gen-status" id="gen-img-status"></div>
    <div class="gen-actions">
      <button class="gen-btn-secondary" id="gen-img-cancel">Cancelar</button>
      <button class="gen-btn-primary" id="gen-img-submit">Generar</button>
      <button class="gen-btn-primary" id="gen-img-insert" style="display:none;">Insertar en articulo</button>
    </div>
  </div>
</div>

<!-- Video Generation Modal -->
<div class="gen-modal-overlay" id="gen-video-modal">
  <div class="gen-modal">
    <h3>&#x1F3AC; Generar video con Seedance</h3>
    <label style="font-size:12px;color:var(--subtext);display:block;margin-bottom:4px;">Prompt</label>
    <textarea id="gen-video-prompt" placeholder="Describí el video que querés generar..."></textarea>
    <div class="gen-preview" id="gen-video-preview"></div>
    <div class="gen-status" id="gen-video-status"></div>
    <div class="gen-actions">
      <button class="gen-btn-secondary" id="gen-video-cancel">Cancelar</button>
      <button class="gen-btn-primary" id="gen-video-submit">Generar</button>
      <button class="gen-btn-primary" id="gen-video-insert" style="display:none;">Insertar en articulo</button>
    </div>
  </div>
</div>

<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="/app.js"></script>
<script src="/zoom.js"></script>
</body>
</html>`;

// --- Static JS files ---
app.get('/app.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'app.js'));
});



// --- Zoom In / Zoom Out endpoint ---
// Level → suffix used for disk-persisted zoom variants alongside the original
const ZOOM_LEVEL_SUFFIX = { 0: 'aerial', 1: 'summary', 3: 'detailed', 4: 'deep' };

function zoomCacheFile(abs, level) {
  const suffix = ZOOM_LEVEL_SUFFIX[level];
  if (!suffix) return null;
  // wiki/concepts/foo.md → wiki/concepts/foo.aerial.md
  return abs.replace(/\.md$/i, '.' + suffix + '.md');
}

app.post('/api/zoom', async (req, res) => {
  try {
    const { filePath, level = 3, content_override, force = false } = req.body;
    const abs = path.resolve(KB_ROOT, filePath);
    if (!abs.startsWith(KB_ROOT)) return res.status(403).json({ error: 'forbidden' });

    // Use provided content or read from file
    const original = content_override || await readFile(abs, 'utf-8').catch(() => '');
    if (!original.trim()) return res.status(400).json({ error: 'empty article' });

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    const send = t => res.write('data: ' + JSON.stringify({ text: t }) + '\n\n');

    // Disk-persisted cache: for each (file, level) pair, store the LLM output
    // as a sibling file with a level suffix (e.g. agent-memory.deep.md). On
    // subsequent requests for the same pair we stream the cached content back
    // in small chunks so the UI behaves identically to a fresh LLM stream.
    const cacheFile = zoomCacheFile(abs, level);
    if (cacheFile && !force) {
      const cached = await readFile(cacheFile, 'utf-8').catch(() => null);
      if (cached) {
        // Stream in chunks to mimic the LLM tick cadence
        const CHUNK = 180;
        for (let i = 0; i < cached.length; i += CHUNK) {
          send(cached.slice(i, i + CHUNK));
          // Small yield so the client can paint between chunks
          await new Promise((r) => setTimeout(r, 5));
        }
        return res.end();
      }
    }

    const ZOOM_INSTRUCTIONS = {
      0: `ZOOM LEVEL: Vista aérea (muy alejado).
Transformá este documento en una vista de pájaro.
REGLAS ESTRICTAS:
- Conservá TODOS los headers (## y ###) exactamente como están
- Para cada sección: una sola frase de 10-15 palabras que capture la esencia
- Eliminá todo el resto: ejemplos, código, listas, párrafos explicativos
- El resultado debe ser navegable y dar una idea completa del mapa del documento
- Estilo: limpio, directo, mismo vocabulario técnico del original`,
      
      1: `ZOOM LEVEL: Resumen (alejado).
Condensá este documento preservando su estructura y estilo.
REGLAS ESTRICTAS:
- Conservá TODOS los headers exactamente como están
- Cada sección: 2-3 oraciones que capturen los puntos más importantes
- Mantené listas si son 3 ítems o menos; condensá las más largas
- Conservá el código si es un ejemplo clave; eliminá los secundarios
- Mismo tono y vocabulario técnico del original`,
      
      3: `ZOOM LEVEL: Detallado (acercado).
Expandí este documento con más profundidad, preservando el estilo y estructura original.
REGLAS ESTRICTAS:
- Conservá TODO el contenido original tal cual — no lo resumas ni lo cambies
- Para cada sección existente: agregá 1-2 párrafos de expansión con ejemplos concretos
- Podés agregar subsecciones (###) nuevas si tienen sentido
- Mantené el mismo tono técnico y vocabulario del original
- Los ejemplos deben ser específicos y accionables`,
      
      4: `ZOOM LEVEL: Profundo (muy acercado).
Hacé un deep dive completo de este documento, preservando el original e incorporando nuevo contenido.
REGLAS ESTRICTAS:
- Conservá TODO el contenido original sin cambios
- Expandí cada sección con: implementación técnica, casos de uso reales, trade-offs
- Agregá secciones nuevas al final: "## Implementación Práctica", "## Conexiones", "## Preguntas Abiertas"
- Los [[wikilinks]] existentes se conservan; podés agregar nuevos si corresponde
- Mismo estilo técnico, mismo nivel de profundidad que el original`
    };

    const instruction = ZOOM_INSTRUCTIONS[level];
    if (!instruction) return res.status(400).json({ error: 'level not supported for zoom' });

    const tokenLimits = {0: 400, 1: 600, 3: 1200, 4: 2000};
    const maxTok = tokenLimits[level] || 800;
    const stream = openai.chat.completions.stream({
      model: 'gpt-4o',  // use gpt-4o for better quality
      messages: [
        { 
          role: 'system', 
          content: `Sos un experto en transformar documentos markdown preservando su estilo, vocabulario técnico y estructura.
Tu trabajo es aplicar una transformación de zoom (como Google Earth) sobre un documento: más zoom = más detalle del mismo contenido, menos zoom = vista más comprimida pero fiel al original.
NUNCA cambies el significado. SIEMPRE preservá los [[wikilinks]] y el formato markdown.
Respondé SOLO con el documento transformado en markdown, sin explicaciones.`
        },
        { 
          role: 'user', 
          content: instruction + '\n\n---\nDOCUMENTO ORIGINAL:\n' + original
        }
      ],
      stream: true
    });

    // Accumulate while streaming so we can persist to disk at the end
    let fullOutput = '';
    for await (const chunk of stream) {
      const t = chunk.choices?.[0]?.delta?.content || '';
      if (t) { send(t); fullOutput += t; }
    }
    // Persist to disk for future requests (any user, any session)
    if (cacheFile && fullOutput.trim()) {
      try {
        await writeFile(cacheFile, fullOutput, 'utf-8');
      } catch (e) {
        console.warn('[zoom] cache write failed:', e.message);
      }
    }
    res.end();
  } catch (err) {
    res.write('data: ' + JSON.stringify({ text: '\nError: ' + err.message }) + '\n\n');
    res.end();
  }
});


app.get('/zoom.js', (req, res) => {
  const zoomPath = path.join(__dirname, 'zoom.js');
  console.log('Serving zoom.js from:', zoomPath);
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(zoomPath, (err) => {
    if (err) { console.error('sendFile error:', err); res.status(500).end(); }
  });
});

// ─── Repo Lens endpoints ──────────────────────────────────────────────────────

app.get('/api/repo-info', async (req, res) => {
  try {
    const { path: filePath } = req.query;
    const abs = path.resolve(KB_ROOT, filePath);
    const content = await readFile(abs, 'utf-8').catch(() => '');
    
    // Extract repo URL from frontmatter or content
    const sourceMatch = content.match(/source:\s*(https:\/\/github\.com\/[^\s\n]+)/);
    const repoMatch = content.match(/https:\/\/github\.com\/([^/]+\/[^/\s\n]+)/);
    const repoUrl = sourceMatch?.[1] || repoMatch?.[0];
    
    if (!repoUrl) return res.status(404).json({ error: 'No GitHub URL found in article' });
    
    const repoPath = repoUrl.replace('https://github.com/', '');
    const headers = { 'User-Agent': 'wany-kb', Accept: 'application/vnd.github.v3+json' };
    if (process.env.GITHUB_TOKEN) headers.Authorization = 'token ' + process.env.GITHUB_TOKEN;
    
    // Fetch repo info
    const [infoResp, readmeResp, treeResp] = await Promise.allSettled([
      fetch('https://api.github.com/repos/' + repoPath, { headers }),
      fetch('https://api.github.com/repos/' + repoPath + '/readme', { headers }),
      fetch('https://api.github.com/repos/' + repoPath + '/git/trees/HEAD?recursive=0', { headers })
    ]);
    
    const info = infoResp.status === 'fulfilled' ? await infoResp.value.json() : {};
    let readme = '';
    if (readmeResp.status === 'fulfilled') {
      const readmeData = await readmeResp.value.json();
      if (readmeData.content) readme = Buffer.from(readmeData.content, 'base64').toString('utf-8');
    }
    const treeData = treeResp.status === 'fulfilled' ? await treeResp.value.json() : { tree: [] };
    
    res.json({
      repo_url: repoUrl,
      repo_path: repoPath,
      name: info.name || repoPath,
      description: info.description || '',
      stars: info.stargazers_count || 0,
      language: info.language || '',
      readme: readme.slice(0, 8000),
      files: (treeData.tree || []).filter(f => f.type === 'blob').slice(0, 50).map(f => f.path)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/repo-file', async (req, res) => {
  try {
    const { repo, path: filePath } = req.query;
    const headers = { 'User-Agent': 'wany-kb' };
    if (process.env.GITHUB_TOKEN) headers.Authorization = 'token ' + process.env.GITHUB_TOKEN;
    const url = 'https://raw.githubusercontent.com/' + repo + '/HEAD/' + filePath;
    const resp = await fetch(url, { headers });
    if (!resp.ok) return res.status(404).json({ error: 'File not found' });
    const text = await resp.text();
    res.json({ content: text.slice(0, 10000), url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/repo-chat', async (req, res) => {
  try {
    const { repo_url, question, readme, structure } = req.body;
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    const send = t => res.write('data: ' + JSON.stringify({ text: t }) + '\n\n');
    
    const OpenAI = (await import('openai')).default;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'sk-missing-not-configured' });
    
    const stream = openai.chat.completions.stream({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Eres un asistente de código. Tenés acceso al README y estructura del repo. Respondé en español, sé técnico y conciso.' },
        { role: 'user', content: 'Repo: ' + repo_url + '\n\nREADME:\n' + (readme || '').slice(0, 3000) + '\n\nEstructura:\n' + (structure || []).slice(0, 30).join('\n') + '\n\nPregunta: ' + question }
      ],
      stream: true
    });
    
    for await (const chunk of stream) {
      const t = chunk.choices?.[0]?.delta?.content || '';
      if (t) send(t);
    }
    res.end();
  } catch (err) {
    res.write('data: ' + JSON.stringify({ text: 'Error: ' + err.message }) + '\n\n');
    res.end();
  }
});

app.post('/api/repo-suggest', async (req, res) => {
  try {
    const { repo_path, title, body, type = 'Feature Request' } = req.body;
    if (!process.env.GITHUB_TOKEN) return res.status(400).json({ error: 'GITHUB_TOKEN not configured' });
    const resp = await fetch('https://api.github.com/repos/' + repo_path + '/issues', {
      method: 'POST',
      headers: { Authorization: 'token ' + process.env.GITHUB_TOKEN, 'Content-Type': 'application/json', 'User-Agent': 'wany-kb' },
      body: JSON.stringify({ title: '[' + type + '] ' + title, body })
    });
    const data = await resp.json();
    res.json({ ok: resp.ok, issue_url: data.html_url, number: data.number });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ─── SelectionContext endpoints ───────────────────────────────────────────────

app.post('/api/selection-action', async (req, res) => {
  try {
    const { action, text, paragraph, filePath } = req.body;
    const prompts = {
      rewrite: 'Reescribí este texto de forma más clara y concisa. Solo devolvé el texto reescrito, sin explicaciones.',
      expand: 'Expandí este texto con más detalle técnico y ejemplos concretos. Solo devolvé el texto expandido.',
      simplify: 'Simplificá este texto a su esencia en 1-2 oraciones. Solo devolvé el texto simplificado.',
    };
    const prompt = prompts[action];
    if (!prompt) return res.status(400).json({ error: 'unknown action' });
    
    const OpenAI = (await import('openai')).default;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'sk-missing-not-configured' });
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: 'Contexto del párrafo:\n' + (paragraph || '') + '\n\nTexto a procesar:\n' + text }
      ]
    });
    res.json({ result: completion.choices[0].message.content.trim() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/article/rewrite-selection', async (req, res) => {
  try {
    const { filePath, original, replacement } = req.body;
    const abs = path.resolve(KB_ROOT, filePath);
    if (!abs.startsWith(KB_ROOT)) return res.status(403).json({ error: 'forbidden' });
    let content = await readFile(abs, 'utf-8');
    if (content.includes(original)) {
      content = content.replace(original, replacement);
      await writeFile(abs, content);
      res.json({ ok: true });
    } else {
      res.status(404).json({ error: 'original text not found in article' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ─── Ideas Planning endpoint ─────────────────────────────────────────────────

app.post('/api/plan-idea', async (req, res) => {
  try {
    const { idea_content, idea_title } = req.body;
    
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    const send = t => res.write('data: ' + JSON.stringify({ text: t }) + '\n\n');
    
    const OpenAI = (await import('openai')).default;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'sk-missing-not-configured' });
    
    const stream = openai.chat.completions.stream({
      model: 'gpt-4o',
      messages: [{
        role: 'system',
        content: `Sos un experto en product management y ejecución de proyectos tech. 
Dado el concepto de una idea, generá un plan de ejecución concreto y accionable.
Formato markdown:

## 🎯 Objetivo
Una oración clara de qué se va a construir/lograr.

## ⏱ Estimación
Tiempo total estimado (horas/días).

## 📋 Tareas
Lista ordenada de tareas concretas. Cada tarea:
- [ ] Nombre de la tarea (Xh)
  - Descripción breve
  - Herramientas/tech específica a usar
  - Output esperado

## 🚦 Criterios de éxito
Cómo saber que está hecho.

## ⚠️ Riesgos
2-3 riesgos concretos y cómo mitigarlos.

Sé muy concreto, técnico y accionable. No teoría.`
      }, {
        role: 'user', 
        content: '## Idea: ' + (idea_title || 'Sin título') + '\n\n' + idea_content
      }],
      stream: true
    });
    
    for await (const chunk of stream) {
      const t = chunk.choices?.[0]?.delta?.content || '';
      if (t) send(t);
    }
    res.end();
  } catch (err) {
    res.write('data: ' + JSON.stringify({ text: 'Error: ' + err.message }) + '\n\n');
    res.end();
  }
});

// --- Image Upload ---

const imgStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const dir = path.join(KB_ROOT, 'raw', 'images');
    await mkdir(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.png';
    cb(null, Date.now() + '-' + file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_'));
  }
});
const upload = multer({ storage: imgStorage, limits: { fileSize: 20 * 1024 * 1024 } });

app.post('/api/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'no image uploaded' });
  const rel = path.relative(KB_ROOT, req.file.path);
  res.json({ ok: true, path: rel, markdown: `![image](${rel})` });
});

app.get('/raw-file', async (req, res) => {
  try {
    const filePath = req.query.path;
    if (!filePath) return res.status(400).send('path required');
    const abs = path.resolve(KB_ROOT, filePath);
    if (!abs.startsWith(KB_ROOT)) return res.status(403).send('forbidden');
    const ext = path.extname(abs).toLowerCase();
    const mimeMap = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.mp4': 'video/mp4' };
    res.setHeader('Content-Type', mimeMap[ext] || 'application/octet-stream');
    createReadStream(abs).pipe(res);
  } catch (err) {
    res.status(404).send('not found');
  }
});

// --- Generate Image (DALL-E 3) ---

app.post('/api/generate-image-for-article', async (req, res) => {
  try {
    const { prompt, filePath } = req.body;
    if (!prompt) return res.status(400).json({ error: 'prompt required' });

    const result = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      size: '1792x1024',
      quality: 'hd',
      n: 1,
    });

    const imageUrl = result.data[0].url;
    // Download and save
    const resp = await fetch(imageUrl);
    const buffer = Buffer.from(await resp.arrayBuffer());
    const dir = path.join(KB_ROOT, 'raw', 'images');
    await mkdir(dir, { recursive: true });
    const fname = Date.now() + '.png';
    const dest = path.join(dir, fname);
    await writeFile(dest, buffer);
    const rel = 'raw/images/' + fname;

    res.json({ ok: true, path: rel, markdown: `![${prompt.slice(0, 40)}](${rel})`, image_url: imageUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Generate Video (Seedance) ---

app.post('/api/generate-video-for-article', async (req, res) => {
  try {
    const { prompt, filePath } = req.body;
    if (!prompt) return res.status(400).json({ error: 'prompt required' });

    const SEEDANCE_KEY = 'sk-sd_V3dsuHb5OhFOBLSbLcTDWBr4U7lKhVMUND9sCFRO';

    // Start generation
    const genResp = await fetch('https://seedance2.app/api/v1/generate', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + SEEDANCE_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'doubao-seedance-1-5-pro',
        prompt,
        generation_type: 'text_to_video',
        duration: 5,
        resolution: '720p'
      })
    });
    const genData = await genResp.json();
    if (!genResp.ok) return res.status(500).json({ error: genData.error || 'seedance error' });

    const taskId = genData.id || genData.task_id;
    if (!taskId) return res.json({ ok: true, video_url: genData.video_url || '', markdown: `[Video: ${prompt.slice(0, 40)}](${genData.video_url || ''})` });

    // Poll for completion
    for (let i = 0; i < 60; i++) {
      await new Promise(r => setTimeout(r, 5000));
      const pollResp = await fetch('https://seedance2.app/api/v1/generate/' + taskId, {
        headers: { 'Authorization': 'Bearer ' + SEEDANCE_KEY }
      });
      const pollData = await pollResp.json();
      if (pollData.status === 'completed' || pollData.status === 'success') {
        const videoUrl = pollData.video_url || pollData.output?.video_url || '';
        return res.json({ ok: true, video_url: videoUrl, markdown: `[Video: ${prompt.slice(0, 40)}](${videoUrl})` });
      }
      if (pollData.status === 'failed' || pollData.status === 'error') {
        return res.status(500).json({ error: 'Video generation failed: ' + (pollData.error || pollData.message || 'unknown') });
      }
    }
    res.status(504).json({ error: 'Video generation timed out' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Article names list (for wikilink autocomplete) ---

app.get('/api/article-names', async (req, res) => {
  try {
    const wikiFiles = await allMarkdownFiles(path.join(KB_ROOT, 'wiki'), 'wiki');
    const rawFiles = await allMarkdownFiles(path.join(KB_ROOT, 'raw'), 'raw');
    const names = [...wikiFiles, ...rawFiles].map(f => ({
      name: path.basename(f.rel, '.md').replace(/-/g, ' '),
      path: f.rel
    }));
    res.json(names);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/send-plan-to-tonga', async (req, res) => {
  try {
    const { idea_title, plan_content } = req.body;
    
    // Send via openclaw system event → Telegram
    const { exec } = await import('child_process');
    const { promisify } = await import('util');
    const execAsync = promisify(exec);
    
    const msg = '📋 *Plan de ejecución — ' + (idea_title || 'Idea') + '*\n\n' + plan_content.slice(0, 3000);
    const escaped = msg.replace(/"/g, '\\"');
    
    await execAsync('openclaw system event --text "' + escaped + '" --mode now');
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// --- Comments API ---

function commentFilePath(articlePath) {
  const sanitized = articlePath.replace(/\//g, '__').replace(/\.md$/, '');
  return path.join(KB_ROOT, 'raw', 'comments', sanitized + '.json');
}

async function readComments(articlePath) {
  try {
    const data = await readFile(commentFilePath(articlePath), 'utf-8');
    return JSON.parse(data);
  } catch { return []; }
}

async function writeComments(articlePath, comments) {
  const dir = path.join(KB_ROOT, 'raw', 'comments');
  await mkdir(dir, { recursive: true });
  await writeFile(commentFilePath(articlePath), JSON.stringify(comments, null, 2));
}

app.get('/api/comments', async (req, res) => {
  const { path: articlePath } = req.query;
  if (!articlePath) return res.status(400).json({ error: 'path required' });
  res.json(await readComments(articlePath));
});

app.post('/api/comments', async (req, res) => {
  const { path: articlePath, comment, selection, selection_start } = req.body;
  if (!articlePath || !comment) return res.status(400).json({ error: 'path and comment required' });
  const user = req.session.user;
  const comments = await readComments(articlePath);
  const newComment = {
    id: 'c-' + Date.now(),
    author: user ? user.login : 'anon',
    author_name: user ? user.name : (req.body.author_name || 'Anónimo'),
    author_avatar: user ? user.avatar_url : '',
    created_at: new Date().toISOString(),
    selection: selection || '',
    selection_start: selection_start || null,
    comment,
    resolved: false,
    replies: []
  };
  comments.push(newComment);
  await writeComments(articlePath, comments);
  res.json(newComment);
});

app.put('/api/comments/:id/resolve', async (req, res) => {
  const { path: articlePath } = req.body;
  if (!articlePath) return res.status(400).json({ error: 'path required' });
  const comments = await readComments(articlePath);
  const c = comments.find(c => c.id === req.params.id);
  if (!c) return res.status(404).json({ error: 'not found' });
  c.resolved = !c.resolved;
  await writeComments(articlePath, comments);
  res.json(c);
});

app.delete('/api/comments/:id', async (req, res) => {
  const { path: articlePath } = req.query;
  if (!articlePath) return res.status(400).json({ error: 'path required' });
  const user = req.session.user;
  let comments = await readComments(articlePath);
  const c = comments.find(c => c.id === req.params.id);
  if (!c) return res.status(404).json({ error: 'not found' });
  if (user && c.author !== user.login && c.author !== 'anon') return res.status(403).json({ error: 'forbidden' });
  comments = comments.filter(c => c.id !== req.params.id);
  await writeComments(articlePath, comments);
  res.json({ ok: true });
});

app.post('/api/comments/:id/reply', async (req, res) => {
  const { path: articlePath, comment } = req.body;
  if (!articlePath || !comment) return res.status(400).json({ error: 'path and comment required' });
  const user = req.session.user;
  const comments = await readComments(articlePath);
  const c = comments.find(c => c.id === req.params.id);
  if (!c) return res.status(404).json({ error: 'not found' });
  const reply = {
    id: 'r-' + Date.now(),
    author: user ? user.login : 'anon',
    author_name: user ? user.name : (req.body.author_name || 'Anónimo'),
    author_avatar: user ? user.avatar_url : '',
    created_at: new Date().toISOString(),
    comment
  };
  c.replies.push(reply);
  await writeComments(articlePath, comments);
  res.json(reply);
});

// ─── Dynamic Pages: Latest News, Repos, Articles, Dashboard ──────────────────

app.get('/api/latest-news', async (req, res) => {
  try {
    const newsDir = path.join(KB_ROOT, 'raw', 'research', 'news');
    const { readdir } = await import('fs/promises');
    const files = (await readdir(newsDir).catch(() => []))
      .filter(f => f.endsWith('.md'))
      .sort().reverse().slice(0, 5);
    
    const items = await Promise.all(files.map(async f => {
      const content = await readFile(path.join(newsDir, f), 'utf-8').catch(() => '');
      // Extract HN stories
      const stories = [];
      const lines = content.split('\n');
      let current = null;
      for (const line of lines) {
        if (line.startsWith('### ')) {
          if (current) stories.push(current);
          current = { title: line.slice(4).trim(), url: '', pts: 0, date: f.slice(10,20) };
        } else if (current && line.startsWith('**URL:**')) {
          current.url = line.replace('**URL:**', '').trim();
        } else if (current && line.startsWith('**Image:**')) {
          current.image = line.replace('**Image:**', '').trim();
        } else if (current && line.startsWith('**Description:**')) {
          current.description = line.replace('**Description:**', '').trim();
        } else if (current && line.includes('pts')) {
          const m = line.match(/(\d+)\s*pts?/);
          if (m) current.pts = parseInt(m[1]);
          const cm = line.match(/(\d+)\s*[Cc]omments?/);
          if (cm) current.comments = parseInt(cm[1]);
        }
      }
      if (current) stories.push(current);
      return { file: f, date: f.slice(10,20), stories: stories.slice(0, 10) };
    }));
    res.json(items.filter(i => i.stories.length > 0));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/latest-repos', async (req, res) => {
  try {
    const trendDir = path.join(KB_ROOT, 'raw', 'research', 'trending');
    const { readdir } = await import('fs/promises');
    const files = (await readdir(trendDir).catch(() => []))
      .filter(f => f.endsWith('.md'))
      .sort().reverse().slice(0, 3);
    
    const repos = [];
    const seen = new Set();
    for (const f of files) {
      const content = await readFile(path.join(trendDir, f), 'utf-8').catch(() => '');
      const lines = content.split('\n');
      let current = null;
      for (const line of lines) {
        if (line.startsWith('### ')) {
          if (current && !seen.has(current.name)) { repos.push(current); seen.add(current.name); }
          current = { name: line.slice(4).trim(), url: '', stars: 0, desc: '', date: f.slice(24,34) };
        } else if (current && line.startsWith('**URL:**')) {
          current.url = line.replace('**URL:**', '').trim();
        } else if (current && line.startsWith('**Stars')) {
          const m = line.match(/([\d,]+)/);
          if (m) current.stars = parseInt(m[1].replace(',',''));
        } else if (current && line.startsWith('**Descripción:**')) {
          current.desc = line.replace('**Descripción:**', '').trim();
        }
      }
      if (current && !seen.has(current?.name)) { repos.push(current); seen.add(current.name); }
    }
    res.json(repos.slice(0, 30));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/latest-articles', async (req, res) => {
  try {
    const { execFile } = await import('child_process');
    const { promisify } = await import('util');
    const execAsync = promisify(execFile);
    // Get recently modified wiki files
    const { stdout } = await execAsync('git', [
      '-C', KB_ROOT, 'log', '--diff-filter=AM', '--name-only', '--pretty=format:', '-50'
    ]).catch(() => ({ stdout: '' }));
    
    const wikiFiles = [...new Set(
      stdout.split('\n').filter(f => f.startsWith('wiki/') && f.endsWith('.md'))
    )].slice(0, 20);
    
    const articles = await Promise.all(wikiFiles.map(async rel => {
      const abs = path.join(KB_ROOT, rel);
      const content = await readFile(abs, 'utf-8').catch(() => '');
      const titleMatch = content.match(/^# (.+)$/m);
      const firstPara = content.split('\n').filter(l => l && !l.startsWith('#') && !l.startsWith('---') && !l.startsWith('|'))[0] || '';
      const name = titleMatch?.[1] || path.basename(rel,'.md').replace(/-/g,' ');
      return { path: rel, name, title: name, summary: firstPara.slice(0,300), content: firstPara.slice(0,300) };
    }));
    res.json(articles.filter(a => a.title));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/dashboard', async (req, res) => {
  try {
    // Aggregate stats
    const wikiFiles = await allMarkdownFiles(path.join(KB_ROOT, 'wiki'));
    const rawFiles = await allMarkdownFiles(path.join(KB_ROOT, 'raw'));
    const ideasFiles = (await import('fs/promises')).then(fs => 
      fs.readdir(path.join(KB_ROOT, 'viz', 'ideas')).catch(() => [])
    );
    const { readdir } = await import('fs/promises');
    const ideaCount = (await readdir(path.join(KB_ROOT, 'viz', 'ideas')).catch(() => [])).filter(f => f.endsWith('.md')).length;
    const newsCount = (await readdir(path.join(KB_ROOT, 'raw', 'research', 'news')).catch(() => [])).filter(f => f.endsWith('.md')).length;
    const trendCount = (await readdir(path.join(KB_ROOT, 'raw', 'research', 'trending')).catch(() => [])).filter(f => f.endsWith('.md')).length;
    
    // Last git commit
    const { execFile } = await import('child_process');
    const { promisify } = await import('util');
    const execAsync = promisify(execFile);
    const { stdout: gitLog } = await execAsync('git', ['-C', KB_ROOT, 'log', '--oneline', '-5']).catch(() => ({ stdout: '' }));
    
    res.json({
      stats: {
        wiki_articles: wikiFiles.length,
        raw_sources: rawFiles.length,
        ideas_generated: ideaCount,
        news_ingested: newsCount,
        trending_batches: trendCount,
      },
      recent_commits: gitLog.trim().split('\n').slice(0, 5),
      last_updated: new Date().toISOString()
    });
  } catch (err) { res.status(500).json({ error: err.message }); }
});


// ─── Dynamic Agent API — spawned from KB ontology ────────────────────────────
// GET /api/agents/list → lists all available agent skills
// POST /api/agents/:domain/chat → chat with a domain-specialized agent
// GET /api/agents/:domain/info → get agent skill info

app.get('/api/agents/list', async (req, res) => {
  try {
    const skillsDir = path.join(KB_ROOT, 'viz', 'agent-skills');
    const { readdir } = await import('fs/promises');
    const files = (await readdir(skillsDir).catch(() => [])).filter(f => f.endsWith('.md'));
    
    const agents = await Promise.all(files.map(async f => {
      const content = await readFile(path.join(skillsDir, f), 'utf-8').catch(() => '');
      const domain = f.replace('agent-', '').replace('.md', '');
      const titleMatch = content.match(/^# (.+)$/m);
      const articlesMatch = content.match(/^articles:\s*(\d+)/m);
      const entitiesMatch = content.match(/^entities:\s*(\d+)/m);
      return {
        id: domain,
        name: titleMatch?.[1] || domain,
        domain,
        articles: parseInt(articlesMatch?.[1] || '0'),
        entities: parseInt(entitiesMatch?.[1] || '0'),
        endpoint: '/api/agents/' + domain + '/chat'
      };
    }));
    res.json({ ok: true, agents });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/agents/:domain/info', async (req, res) => {
  try {
    const { domain } = req.params;
    const skillPath = path.join(KB_ROOT, 'viz', 'agent-skills', 'agent-' + domain + '.md');
    const skill = await readFile(skillPath, 'utf-8').catch(() => null);
    if (!skill) return res.status(404).json({ error: 'Agent not found' });
    res.json({ ok: true, domain, skill });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/agents/:domain/chat', async (req, res) => {
  try {
    const { domain } = req.params;
    const { message, history = [], stream: useStream = true } = req.body;
    if (!message) return res.status(400).json({ error: 'message required' });
    
    // Load agent skill
    const skillPath = path.join(KB_ROOT, 'viz', 'agent-skills', 'agent-' + domain + '.md');
    const skill = await readFile(skillPath, 'utf-8').catch(() => null);
    if (!skill) return res.status(404).json({ error: 'Agent not found: ' + domain });
    
    // Load relevant wiki articles for context
    const wikiIndex = await readFile(path.join(KB_ROOT, 'wiki', 'INDEX.md'), 'utf-8').catch(() => '');
    
    // Build system prompt from skill
    const systemPrompt = `Eres un agente especializado extraído de la Knowledge Base de Wany.

Tu especialización está definida por este skill:
---
${skill.slice(0, 1500)}
---

Índice del wiki disponible:
${wikiIndex.slice(0, 1000)}

Responde en español. Sé técnico, conciso y fundamentado en el conocimiento de la KB.
Si no sabes algo, dilo — no alucines.`;
    
    const messages = [
      { role: 'system', content: systemPrompt },
      ...history.slice(-6),
      { role: 'user', content: message }
    ];
    
    if (useStream) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      const send = t => res.write('data: ' + JSON.stringify({ text: t }) + '\n\n');
      
      const stream = openai.chat.completions.stream({
        model: 'gpt-4o-mini',
        messages,
        stream: true
      });
      for await (const chunk of stream) {
        const t = chunk.choices?.[0]?.delta?.content || '';
        if (t) send(t);
      }
      res.end();
    } else {
      const completion = await openai.chat.completions.create({ model: 'gpt-4o-mini', messages });
      res.json({ ok: true, response: completion.choices[0].message.content });
    }
  } catch (err) {
    if (!res.headersSent) res.status(500).json({ error: err.message });
    else { res.write('data: ' + JSON.stringify({ text: '\nError: ' + err.message }) + '\n\n'); res.end(); }
  }
});


// --- GitNexus proxy ---
const GITNEXUS_URL = KB_GITNEXUS_URL;
app.get('/api/nexus/:endpoint(*)', async (req, res) => {
  try {
    const url = `${GITNEXUS_URL}/api/${req.params.endpoint}${req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : ''}`;
    const r = await fetch(url);
    const ct = r.headers.get('content-type') || 'application/json';
    res.set('Content-Type', ct);
    res.send(await r.text());
  } catch (e) {
    res.status(503).json({ error: 'GitNexus server not running at ' + GITNEXUS_URL });
  }
});


// ── Pipelines ──────────────────────────────────────────────────────────────
const yaml = await import('js-yaml').catch(() => null);

async function loadProviders() {
  try {
    const raw = await readFile(path.join(KB_ROOT, 'providers.yaml'), 'utf-8');
    // Simple YAML parser para listas básicas (evitar dep extra)
    const providers = [];
    let current = null;
    for (const line of raw.split('\n')) {
      if (line.match(/^  - id:/)) {
        if (current) providers.push(current);
        current = { id: line.split(':')[1].trim() };
      } else if (current && line.match(/^    \w/)) {
        const m = line.match(/^    (\w+):\s*(.+)/);
        if (m) current[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
      }
    }
    if (current) providers.push(current);
    return providers;
  } catch { return []; }
}

async function getProviderStats(provider) {
  try {
    const outDir = path.join(KB_ROOT, provider.output_dir || '');
    // readdirSync and statSync imported at top
    if (!outDir || !existsSync(outDir)) return { files: 0, lastRun: null };
    const files = readdirSync(outDir).filter(f => f.endsWith('.md') || f.endsWith('.json'));
    const lastRun = files.length > 0
      ? Math.max(...files.map(f => statSync(path.join(outDir, f)).mtimeMs))
      : null;
    return { files: files.length, lastRun: lastRun ? new Date(lastRun).toISOString() : null };
  } catch { return { files: 0, lastRun: null }; }
}

app.get('/api/pipelines', async (req, res) => {
  try {
    const providers = await loadProviders();
    const withStats = await Promise.all(providers.map(async p => ({
      ...p,
      stats: await getProviderStats(p),
    })));
    res.json(withStats);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/pipelines/:id/script', async (req, res) => {
  try {
    const providers = await loadProviders();
    const p = providers.find(p => p.id === req.params.id);
    if (!p || !p.script) return res.status(404).json({ error: 'not found' });
    const scriptPath = path.join(KB_ROOT, p.script);
    if (!scriptPath.startsWith(KB_ROOT)) return res.status(403).json({ error: 'forbidden' });
    const content = await readFile(scriptPath, 'utf-8');
    res.json({ id: p.id, script: p.script, content });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/pipelines/:id/script', async (req, res) => {
  try {
    const providers = await loadProviders();
    const p = providers.find(p => p.id === req.params.id);
    if (!p || !p.script) return res.status(404).json({ error: 'not found' });
    const scriptPath = path.join(KB_ROOT, p.script);
    if (!scriptPath.startsWith(KB_ROOT)) return res.status(403).json({ error: 'forbidden' });
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: 'content required' });
    await writeFile(scriptPath, content, 'utf-8');
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Debounced gitnexus reindex. Pipelines write to raw/ and the gitnexus index
// becomes stale; we kick off `npx gitnexus analyze` in the background so the
// new content gets indexed. Debounced to 5 min so a burst of pipeline runs
// doesn't thrash the indexer.
let _lastGitnexusReindexAt = 0;
const GITNEXUS_REINDEX_DEBOUNCE_MS = 5 * 60 * 1000;
function maybeReindexGitnexus(reason) {
  const now = Date.now();
  if (now - _lastGitnexusReindexAt < GITNEXUS_REINDEX_DEBOUNCE_MS) {
    return { triggered: false, reason: 'debounced', remaining_ms: GITNEXUS_REINDEX_DEBOUNCE_MS - (now - _lastGitnexusReindexAt) };
  }
  _lastGitnexusReindexAt = now;
  try {
    const { spawn } = require('child_process');
    const proc = spawn('npx', ['gitnexus', 'analyze'], {
      cwd: KB_ROOT,
      detached: true,
      stdio: 'ignore',
    });
    proc.on('error', (e) => console.log('[gitnexus] reindex error:', e.message));
    proc.unref();
    console.log('[gitnexus] reindex triggered:', reason);
    return { triggered: true, reason };
  } catch (e) {
    // fallback for ESM import — use spawn via dynamic import
    import('child_process').then(({ spawn }) => {
      const proc = spawn('npx', ['gitnexus', 'analyze'], {
        cwd: KB_ROOT,
        detached: true,
        stdio: 'ignore',
      });
      proc.on('error', () => {});
      proc.unref();
      console.log('[gitnexus] reindex triggered (async):', reason);
    }).catch(() => {});
    return { triggered: true, reason, mode: 'async' };
  }
}

app.post('/api/pipelines/:id/run', async (req, res) => {
  try {
    const providers = await loadProviders();
    const p = providers.find(p => p.id === req.params.id);
    if (!p || !p.script) return res.status(404).json({ error: 'not found' });
    const scriptPath = path.join(KB_ROOT, p.script);
    if (!scriptPath.startsWith(KB_ROOT)) return res.status(403).json({ error: 'forbidden' });
    const { execFile } = await import('child_process');
    execFile('bash', [scriptPath], { cwd: KB_ROOT, timeout: 60000 }, (err, stdout, stderr) => {
      const reindex = !err ? maybeReindexGitnexus('pipeline:' + req.params.id) : null;
      res.json({
        ok: !err,
        stdout: stdout?.slice(0, 2000),
        stderr: stderr?.slice(0, 500),
        exit: err?.code,
        gitnexus_reindex: reindex,
      });
    });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Flip `enabled: false` ↔ `enabled: true` for a provider id inside providers.yaml,
// preserving every other line. Home-grown rewriter because we don't parse full YAML.
async function setProviderEnabled(id, enabled) {
  const p = path.join(KB_ROOT, 'providers.yaml');
  const raw = await readFile(p, 'utf-8');
  const lines = raw.split('\n');
  let currentId = null;
  let changed = false;
  for (let i = 0; i < lines.length; i++) {
    const idMatch = lines[i].match(/^  - id:\s*(.+?)\s*$/);
    if (idMatch) { currentId = idMatch[1]; continue; }
    if (currentId === id && lines[i].match(/^    enabled:\s*(true|false)/)) {
      lines[i] = '    enabled: ' + (enabled ? 'true' : 'false');
      changed = true;
      break;
    }
  }
  if (!changed) throw new Error('enabled field not found for id=' + id);
  await writeFile(p, lines.join('\n'), 'utf-8');
}

// Run a pm2 command and return {code, stdout, stderr}.
async function pm2Cmd(args, timeout = 8000) {
  const { execFile } = await import('child_process');
  return new Promise((resolve) => {
    execFile('pm2', args, { timeout, env: process.env }, (err, stdout, stderr) => {
      resolve({ code: err?.code ?? 0, stdout: stdout || '', stderr: stderr || '' });
    });
  });
}

// POST /api/pipelines/:id/enabled — body { enabled: true|false }
// Flips enabled in providers.yaml AND (re)installs or removes the pm2 cron.
app.post('/api/pipelines/:id/enabled', async (req, res) => {
  try {
    const { id } = req.params;
    const enabled = !!req.body?.enabled;
    const providers = await loadProviders();
    const p = providers.find((x) => x.id === id);
    if (!p) return res.status(404).json({ error: 'provider not found' });
    if (!p.script) return res.status(400).json({ error: 'provider has no script' });

    await setProviderEnabled(id, enabled);

    const pm2Name = 'kb-' + id;
    const scriptAbs = path.join(KB_ROOT, p.script);

    if (enabled) {
      // Always delete-then-start so cron changes apply
      await pm2Cmd(['delete', pm2Name]);
      if (!p.cron) {
        return res.json({ ok: true, enabled: true, warning: 'enabled in yaml but provider has no `cron:` — skipped pm2 install' });
      }
      const start = await pm2Cmd([
        'start', 'bash', '--name', pm2Name,
        '--no-autorestart',
        '--cron-restart', p.cron,
        '--', scriptAbs,
      ]);
      if (start.code !== 0) {
        return res.status(500).json({ ok: false, enabled: true, error: 'pm2 start failed', stderr: start.stderr });
      }
      // Persist pm2 state so the cron survives reboots
      pm2Cmd(['save']).catch(() => {});
      return res.json({ ok: true, enabled: true, pm2: pm2Name, cron: p.cron });
    } else {
      const del = await pm2Cmd(['delete', pm2Name]);
      pm2Cmd(['save']).catch(() => {});
      return res.json({ ok: true, enabled: false, pm2_deleted: del.code === 0 });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/pipelines/:id/cron/status — is the pm2 job present?
app.get('/api/pipelines/:id/cron/status', async (req, res) => {
  const pm2Name = 'kb-' + req.params.id;
  const result = await pm2Cmd(['describe', pm2Name], 6000);
  const installed = result.code === 0 && result.stdout.includes(pm2Name);
  res.json({ installed, pm2: pm2Name });
});

app.get('/api/pipelines/providers.yaml', async (req, res) => {
  try {
    const content = await readFile(path.join(KB_ROOT, 'providers.yaml'), 'utf-8');
    res.json({ content });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/pipelines/providers.yaml', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: 'content required' });
    await writeFile(path.join(KB_ROOT, 'providers.yaml'), content, 'utf-8');
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});


// ══════════════════════════════════════════════════════════════════════════
// AGENT READINESS — Cloudflare isitagentready.com spec
// Discoverability · Content · Bot Access Control · Capabilities
// ══════════════════════════════════════════════════════════════════════════

// RFC 8288 Link headers on all responses
app.use((req, res, next) => {
  const base = `${req.protocol}://${req.get('host')}`;
  res.set('Link', [
    `<${base}/.well-known/mcp.json>; rel="mcp-server"`,
    `<${base}/.well-known/agent-skills/index.json>; rel="agent-skills"`,
    `<${base}/sitemap.xml>; rel="sitemap"`,
  ].join(', '));
  next();
});

// robots.txt — Content Signals + AI agent rules
app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send([
    'User-agent: *',
    'Allow: /',
    '',
    '# AI crawlers explicitly allowed',
    'User-agent: GPTBot',
    'Allow: /',
    'User-agent: ClaudeBot',
    'Allow: /',
    'User-agent: anthropic-ai',
    'Allow: /',
    '',
    '# Content Signals (contentsignals.org)',
    'ai-usage: allowed',
    '',
    `Sitemap: ${req.protocol}://${req.get('host')}/sitemap.xml`,
  ].join('\n'));
});

// sitemap.xml
app.get('/sitemap.xml', async (req, res) => {
  try {
    const base = `${req.protocol}://${req.get('host')}`;
    const wikiDir = path.join(KB_ROOT, 'wiki');
    const files = [];
    const walk = async (dir) => {
      for (const e of await readdir(dir, { withFileTypes: true }).catch(() => [])) {
        if (e.isDirectory()) await walk(path.join(dir, e.name));
        else if (e.name.endsWith('.md')) files.push(path.join(dir, e.name));
      }
    };
    await walk(wikiDir);
    const urls = files.slice(0, 500).map(f =>
      `  <url><loc>${base}/wiki/${path.relative(wikiDir, f)}</loc><changefreq>weekly</changefreq></url>`
    ).join('\n');
    res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${base}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>
${urls}
</urlset>`);
  } catch(e) { res.status(500).send('error'); }
});

// Markdown content negotiation — Accept: text/markdown
app.get('/wiki/:file(*)', async (req, res, next) => {
  const accepts = req.headers['accept'] || '';
  if (!accepts.includes('text/markdown')) return next();
  try {
    const fp = path.join(KB_ROOT, 'wiki', req.params.file);
    if (!fp.startsWith(path.join(KB_ROOT, 'wiki'))) return res.status(403).end();
    const content = await readFile(fp, 'utf-8');
    res.set('Content-Type', 'text/markdown; charset=utf-8');
    res.set('Link', `</.well-known/mcp.json>; rel="mcp-server"`);
    res.send(content);
  } catch { next(); }
});

// MCP Server Card (.well-known/mcp.json)
app.get('/.well-known/mcp.json', (req, res) => {
  const base = `${req.protocol}://${req.get('host')}`;
  res.json({
    name: KB_DISPLAY_NAME,
    description: `${KB_DISPLAY_NAME} — AI-native second brain. Compiles 700+ sources into structured wiki via LLM. Search, synthesis, book generation, knowledge graph.`,
    version: '1.0.0',
    mcp_version: '2024-11-05',
    capabilities: { tools: true, resources: true, prompts: true },
    transports: [{ type: 'stdio', command: 'node', args: [path.join(KB_ROOT, 'bin', 'kb-mcp.js')] }],
    tools: [
      { name: 'kb_search', description: 'Search the knowledge base' },
      { name: 'kb_prime', description: 'Pick→Pack→Deliver: synthesized context for a query' },
      { name: 'kb_book_compose', description: 'Compose a book on any topic from KB articles' },
      { name: 'kb_book_audiobook', description: 'Generate MP3 audiobook from a composed book' },
      { name: 'kb_file_read', description: 'Read any KB article by path' },
      { name: 'kb_compile', description: 'Compile raw sources into wiki articles' },
    ],
  });
});

// Agent Skills index (.well-known/agent-skills/index.json)
app.get('/.well-known/agent-skills/index.json', (req, res) => {
  const base = `${req.protocol}://${req.get('host')}`;
  res.json({
    version: '1.0',
    name: KB_DISPLAY_NAME,
    skills: [
      { id: 'kb.search', name: 'KB Search', description: 'Fast-grep indexed search over 700+ sources', endpoint: `${base}/api/search`, method: 'GET', parameters: { q: { type: 'string', required: true } } },
      { id: 'kb.prime', name: 'KB Prime', description: 'Full fulfillment pipeline: retrieve + synthesize knowledge', endpoint: `${base}/api/prime`, method: 'GET', parameters: { q: { type: 'string', required: true }, format: { type: 'string', enum: ['context', 'markdown', 'answer'] } } },
      { id: 'kb.book_compose', name: 'Book Composer', description: 'Compose a structured book on any topic', endpoint: `${base}/api/books/compose`, method: 'POST' },
      { id: 'kb.audiobook', name: 'Audiobook Generator', description: 'Generate MP3 audiobook via OpenAI TTS', endpoint: `${base}/api/books/:slug/audio`, method: 'POST' },
    ],
  });
});

// API Catalog RFC 9727
app.get('/.well-known/api-catalog', (req, res) => {
  const base = `${req.protocol}://${req.get('host')}`;
  res.set('Content-Type', 'application/linkset+json');
  res.json({ linkset: [{ anchor: base, 'https://www.iana.org/assignments/link-relations/service-desc': [{ href: `${base}/.well-known/mcp.json`, type: 'application/json' }] }] });
});

// kb_prime HTTP endpoint (for agent-skills)
app.get('/api/prime', async (req, res) => {
  const q = (req.query.q || '').trim();
  const fmt = req.query.format || 'markdown';
  if (!q) return res.status(400).json({ error: 'q required' });
  try {
    const fgr = path.join(KB_ROOT, '..', 'fast-grep-rust', 'target', 'release', 'fgr');
    const { execFile: ef2 } = await import('child_process');
    const { promisify: p2 } = await import('util');
    const ea2 = p2(ef2);
    const { stdout } = await ea2(fgr, [q, KB_ROOT, '--index', '/tmp/wany-kb-index', '-l'], { timeout: 5000 }).catch(() => ({ stdout: '' }));
    const files = stdout.trim().split('\n').filter(Boolean).slice(0, 8);
    const articles = await Promise.all(files.map(async f => {
      const content = await readFile(f, 'utf-8').catch(() => '');
      return `## ${path.relative(KB_ROOT, f)}\n${content.slice(0, 1000)}`;
    }));
    if (fmt === 'markdown') {
      res.set('Content-Type', 'text/markdown; charset=utf-8');
      res.send(`# ${KB_DISPLAY_NAME} — Context: ${q}\n\n${articles.join('\n\n---\n\n')}`);
    } else {
      res.json({ query: q, articles: articles.length, context: articles.join('\n\n') });
    }
  } catch(e) { res.status(500).json({ error: e.message }); }
});

// ══════════════════════════════════════════════════════════════════════════



// ── Globant docs redirect: /en/wiki?<id>,<title> → KB article ───────────────
app.get('/en/wiki', async (req, res) => {
  const query = Object.keys(req.query)[0] || '';
  // Format: "3669,Integrations" or just "3669"
  const id = query.split(',')[0].trim();
  if (!id || !/^\d+$/.test(id)) return res.redirect('/');

  // Find matching file in raw/articles/
  try {
    const files = await readdir(path.join(KB_ROOT, 'raw', 'articles'));
    const match = files.find(f => f.startsWith(id + '-'));
    if (match) {
      // Serve the file directly via the KB viewer (loadFile format)
      return res.redirect(`/?file=${encodeURIComponent('raw/articles/' + match)}`);
    }
    // Also check wiki/
    const wikiFiles = await readdir(path.join(KB_ROOT, 'wiki')).catch(() => []);
    // fallback: redirect to search
    const title = query.split(',').slice(1).join(',').replace(/\+/g, ' ');
    return res.redirect(`/?q=${encodeURIComponent(title || id)}`);
  } catch {
    return res.redirect('/');
  }
});

// Also handle /en/GlobantEnterpriseAI → home
app.get('/en/:section', (req, res) => {
  if (req.path.startsWith('/en/wiki')) return;
  res.redirect('/');
});

// ── Trees ────────────────────────────────────────────────────────────────────
app.get('/api/trees', async (req, res) => {
  try {
    const treesDir = path.join(KB_ROOT, 'viz', 'trees');
    const files = await readdir(treesDir).catch(() => []);
    const trees = await Promise.all(
      files.filter(f => f.endsWith('.json')).map(async f => {
        try {
          const raw = JSON.parse(await readFile(path.join(treesDir, f), 'utf-8'));
          // Count total nodes
          let total = 0;
          const count = (nodes) => { for (const n of nodes || []) { if (n.path) total++; if (n.children) count(n.children); } };
          count(raw.nodes);
          return { id: raw.id, title: raw.title, subtitle: raw.subtitle, description: raw.description, audience: raw.audience, estimatedTime: raw.estimatedTime, icon: raw.icon || '🌳', totalPages: total };
        } catch { return null; }
      })
    );
    res.json(trees.filter(Boolean));
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/trees/:id', async (req, res) => {
  try {
    const id = req.params.id.replace(/[^a-z0-9-]/gi, '');
    const file = path.join(KB_ROOT, 'viz', 'trees', `${id}.json`);
    if (!existsSync(file)) return res.status(404).json({ error: 'tree not found' });
    const tree = JSON.parse(await readFile(file, 'utf-8'));
    res.json(tree);
  } catch(e) { res.status(500).json({ error: e.message }); }
});

// Dual deployability: local (pm2/node) vs Vercel serverless.
// On Vercel, `@vercel/node` imports this module and wraps `app` as the handler;
// we must NOT bind a port. Locally, process.env.VERCEL is unset.
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`${KB_DISPLAY_NAME} Viewer running at http://localhost:${PORT}`);
  });
}

export default app;
