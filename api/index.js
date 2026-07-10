// Single catch-all serverless function. Vercel's Hobby plan caps you at
// 12 functions, so we route every /api/* path through this one file. Each
// route is a pattern mapping to a handler module under lib/handlers/.
//
// Vercel's filename convention: [[...slug]] is an optional catch-all. It
// matches /api, /api/foo, /api/foo/bar/baz — anything under /api. We parse
// the URL path ourselves and dispatch from there.

const handlers = new Map();

async function load(mod) {
  if (!handlers.has(mod)) {
    handlers.set(mod, (await import(`../lib/handlers/${mod}.js`)).default);
  }
  return handlers.get(mod);
}

// Static routes (exact path match) → handler module
const ROUTES = {
  "info": "info",
  "stats": "stats",
  "kb-info": "kb-info",
  "search": "search",
  "knowledge": "prime",
  "prime": "prime",
  "files": "files",
  "file": "file",
  "ideas": "ideas",
  "raw-file": "raw-file",
  "books": "books",
  "book-about": "book-about",
  "latest-news": "latest-news",
  "latest-repos": "latest-repos",
  "latest-articles": "latest-articles",
  "dashboard": "dashboard",
  "knowledge/stats": "knowledge-stats",
  "pipelines": "pipelines",
  "decisions": "decisions",
  "widgets": "widgets",
  "graph": "graph",
  "article-names": "article-names",
  "comments": "comments",
  "auth-me": "auth-me",
  "well-known": "well-known",
  "robots.txt": "well-known",
  "sitemap.xml": "well-known",
  "zoom": "zoom",
  "backlinks": "backlinks",
  "file-date": "file-date",
  "widget-html": "widget-html",
  "realtime-session": "realtime-session",
  "chat-compose": "chat-compose",
  "agents": "agents/list",
  "presence": "presence",
  "presence/cursor": "presence/cursor",
  "presence/join": "presence/join",
  "presence/leave": "presence/leave",
  "article/save": "article/save",
  "article/create": "article/create",
  "article/update": "article/update",
  "article/append-section": "article/append-section",
  "article/rewrite-selection": "article/rewrite-selection",
  "editor/file": "editor/file",
  "editor/flush": "editor/flush",
  "editor/presence": "editor/presence",
  "nexus/graph": "nexus/graph",
  "nexus/query": "nexus/query",
  "nexus/context": "nexus/context",
};

// Pattern routes (regex → handler + extracted params)
const PATTERNS = [
  // /books/<slug>/audio[/download]
  {
    re: /^books\/([a-z0-9-]+)\/audio(\/download)?$/i,
    handler: "books/audio",
  },
  // /books/<slug>/cover, /prologue, /index, /references, /ideas, /explore
  {
    re: /^books\/([a-z0-9-]+)\/cover$/i,
    handler: "books/cover",
  },
  {
    re: /^books\/([a-z0-9-]+)\/prologue$/i,
    handler: "books/prologue",
  },
  {
    re: /^books\/([a-z0-9-]+)\/index$/i,
    handler: "books/thematic-index",
  },
  {
    re: /^books\/([a-z0-9-]+)\/references$/i,
    handler: "books/references",
  },
  {
    re: /^books\/([a-z0-9-]+)\/ideas$/i,
    handler: "books/ideas",
  },
  {
    re: /^books\/([a-z0-9-]+)\/explore$/i,
    handler: "books/explore",
  },
  // /books/<slug> — GET/PATCH/DELETE
  {
    re: /^books\/([a-z0-9-]+)$/i,
    handler: "books/[slug]",
  },
  // /pipelines/<id>/run — fire GitHub Actions workflow_dispatch
  {
    re: /^pipelines\/[a-z0-9-]+\/run$/i,
    handler: "pipelines/run",
  },
  // /books/<slug>/chapters/<n>/chat — multi-turn Iris chat scoped to a chapter
  {
    re: /^books\/([a-z0-9-]+)\/chapters\/\d+\/chat$/i,
    handler: "books/chapter-chat",
  },
  // /books/<slug>/chapters/<n> — PATCH (update) or DELETE
  {
    re: /^books\/([a-z0-9-]+)\/chapters\/\d+$/i,
    handler: "books/chapter-patch",
  },
  // /books/<slug>/chapters — POST to add a new chapter
  {
    re: /^books\/([a-z0-9-]+)\/chapters$/i,
    handler: "books/chapter-add",
  },
  // /agents/<slug>/run — stream an agent turn
  {
    re: /^agents\/[a-z0-9-]+\/run$/i,
    handler: "agents/run",
  },
  // /agents/<slug> — load an agent spec
  {
    re: /^agents\/[a-z0-9-]+$/i,
    handler: "agents/get",
  },
];

export default async function (req, res) {
  // CORS preflight — always OK
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") { res.statusCode = 204; return res.end(); }

  // Vercel rewrites /api/<rest> → /api/index?__route=<rest> for this
  // catch-all function. The route key is `__route` (not `path`) so it
  // doesn't collide with handlers that use `?path=` for their own params
  // (e.g. /api/file?path=wiki/foo.md).
  const url = new URL(req.url, "http://localhost");
  let pathname = url.searchParams.get("__route") || url.pathname;
  pathname = String(pathname).replace(/^\/+/, "").replace(/\/+$/, "");
  if (pathname.startsWith("api/")) pathname = pathname.slice(4);
  if (pathname === "index" || pathname === "") pathname = url.pathname.replace(/^\/api\/?/, "").replace(/^\/+/, "");
  if (pathname === "index") pathname = "";

  try {
    // 0. well-known and public paths (no auth needed)
    if (pathname.startsWith('.well-known') || pathname === 'robots.txt' || pathname === 'sitemap.xml') {
      const handler = await load('well-known');
      return handler(req, res);
    }

    // 1. Exact match
    if (pathname in ROUTES) {
      const handler = await load(ROUTES[pathname]);
      return handler(req, res);
    }

    // 2. Pattern match
    for (const p of PATTERNS) {
      const m = pathname.match(p.re);
      if (m) {
        const handler = await load(p.handler);
        return handler(req, res);
      }
    }

    // 3. Not found
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ ok: false, error: `no route for /${pathname}` }));
  } catch (e) {
    console.error("[api]", req.url, "error:", e.stack || e.message);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: false, error: e.message || String(e) }));
  }
}

export const config = {
  maxDuration: 60,
};
