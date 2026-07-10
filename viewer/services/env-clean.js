// env-clean.js — defensively strip wrapping quotes from env vars.
//
// When users paste API keys into Vercel's dashboard with surrounding
// double or single quotes (a very common mistake), the value comes back
// to process.env with the quotes included. The quotes then get sent
// verbatim as part of HTTP headers, and every upstream API rejects the
// request with an "invalid key" error.
//
// We run this unconditionally at import time so every service that
// reads process.env.* gets a clean value. It's safe because a real
// API key never legitimately starts+ends with the same quote char.

const KEYS = [
  "ANTHROPIC_API_KEY",
  "OPENAI_API_KEY",
  "GITHUB_TOKEN",
  "GITHUB_REPO",
  "GITHUB_BRANCH",
  "KB_SITE_PASSWORD",
  "KB_SITE_SALT",
  "KB_DISPLAY_NAME",
  "KB_CONTEXT_NAME",
  "KB_CONTEXT_DESC",
  "KB_GITNEXUS_URL",
  "KV_REST_API_URL",
  "KV_REST_API_TOKEN",
];

function strip(value) {
  if (typeof value !== "string") return value;
  let out = value.trim();
  // Strip matching wrapping quotes ("..." or '...')
  while (
    out.length >= 2 &&
    ((out.startsWith('"') && out.endsWith('"')) ||
      (out.startsWith("'") && out.endsWith("'")))
  ) {
    out = out.slice(1, -1).trim();
  }
  return out;
}

for (const k of KEYS) {
  if (process.env[k] !== undefined) {
    const cleaned = strip(process.env[k]);
    if (cleaned !== process.env[k]) {
      process.env[k] = cleaned;
    }
  }
}

export {}; // ES module marker
