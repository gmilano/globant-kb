import "./env-clean.js"; // strip wrapping quotes before the SDK reads the key
import { anthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";
import { pick } from "./pick.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KB_ROOT = path.resolve(__dirname, "..", "..");

const MODEL = process.env.KB_BOOK_MODEL || process.env.KB_PACK_MODEL || "claude-sonnet-4-6";
const MAX_CHUNK_CHARS = Number(process.env.KB_BOOK_MAX_CHUNK || 3500);
const MAX_CANDIDATES = Number(process.env.KB_BOOK_MAX_CANDIDATES || 40);
const KB_CONTEXT_NAME = process.env.KB_CONTEXT_NAME || "Wany";
const KB_CONTEXT_DESC = process.env.KB_CONTEXT_DESC || "empresa de AI agents";

// Zod schema for the structured book output. Each chapter maps to a handful
// of wiki articles from the pick result; the LLM decides the grouping, order,
// and narrative flow.
// NOTE: Anthropic's structured-output JSON schema has two restrictions:
// (1) array minItems can only be 0 or 1
// (2) integer type cannot carry minimum/maximum bounds
// We avoid both by using only strings/arrays of strings in the schema and
// deriving chapter numbers from array index server-side.
const ChapterSchema = z.object({
  title: z.string().describe("Short chapter title (3-8 words)"),
  summary: z.string().describe("2-3 sentence summary of what this chapter teaches"),
  key_points: z.array(z.string()).describe("3 to 6 key takeaway bullets"),
  concept_paths: z.array(z.string()).describe("Wiki file paths that back this chapter — pick only from the provided list, preserving the exact path including wiki/ prefix and .md suffix"),
});

const BookSchema = z.object({
  title: z.string().describe("Book title — concise and evocative"),
  subtitle: z.string().describe("One-line tagline"),
  intro: z.string().describe("2-4 paragraph introduction to the topic and why it matters"),
  reading_order_rationale: z.string().describe("Short explanation of why chapters are ordered this way"),
  chapters: z.array(ChapterSchema).describe("Between 3 and 10 chapters, ordered pedagogically (prerequisites first, advanced last)"),
  further_reading: z.array(z.string()).describe("Optional — related concept slugs the reader can explore next"),
});

// Walk wiki/ and collect {path, title} for every .md file. Used by the
// semantic fallback when lexical pick returns nothing.
async function listAllWikiTitles() {
  const wikiDir = path.join(KB_ROOT, "wiki");
  const out = [];
  async function walk(dir) {
    let entries;
    try { entries = await fs.readdir(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (e.name.startsWith(".")) continue;
      const abs = path.join(dir, e.name);
      if (e.isDirectory()) await walk(abs);
      else if (e.name.endsWith(".md")) {
        const rel = path.relative(KB_ROOT, abs);
        const raw = await fs.readFile(abs, "utf8").catch(() => "");
        let title = path.basename(e.name, ".md").replace(/-/g, " ");
        let summary = "";
        try {
          const fm = matter(raw);
          if (fm.data?.title) title = fm.data.title;
          if (fm.data?.summary) summary = String(fm.data.summary).slice(0, 160);
          else summary = (fm.content || "").replace(/[#>*_`\-]/g, "").replace(/\s+/g, " ").trim().slice(0, 160);
        } catch {}
        out.push({ path: rel, title, summary });
      }
    }
  }
  await walk(wikiDir);
  return out;
}

// Ask the LLM to pick ~20 titles most relevant to the topic. Returns an array
// of wiki paths (exact strings from the input).
async function semanticPickFromTitles(topic, titles) {
  const catalog = titles
    .map((t, i) => `[${i + 1}] ${t.path}\n  title: ${t.title}${t.summary ? `\n  summary: ${t.summary}` : ""}`)
    .join("\n\n");
  const PickSchema = z.object({
    paths: z.array(z.string()).describe("Wiki paths that are semantically relevant to the topic, ordered by relevance. Use exact path strings including wiki/ prefix and .md suffix."),
  });
  const prompt = `You are helping build a book about "${topic}" from a knowledge base about ${KB_CONTEXT_NAME} (${KB_CONTEXT_DESC}).

The lexical search returned nothing, so you must pick semantically. Below is the full catalog of wiki articles (title + short summary). Pick up to 30 that are most relevant to "${topic}" — think broadly: prerequisite concepts, methodologies, examples, case studies, adjacent ideas. If truly nothing is relevant, return an empty list.

## Catalog

${catalog}

Return the list of paths, ordered by relevance (most relevant first). Use exact path strings.`;
  try {
    const { object } = await generateObject({
      model: anthropic(MODEL),
      schema: PickSchema,
      prompt,
      maxTokens: 2048,
    });
    return object.paths || [];
  } catch (e) {
    console.warn("[book] semantic pick failed:", e.message);
    return [];
  }
}

async function readCandidateChunks(hits, wikiDir) {
  const chunks = [];
  for (const h of hits) {
    const abs = path.join(KB_ROOT, h.path);
    const raw = await fs.readFile(abs, "utf8").catch(() => "");
    if (!raw) continue;
    let fm;
    try { fm = matter(raw); } catch { fm = { data: {}, content: raw }; }
    const title = fm.data?.title || path.basename(h.path, ".md").replace(/-/g, " ");
    const body = (fm.content || raw).slice(0, MAX_CHUNK_CHARS);
    chunks.push({ path: h.path, title, body, group: h.group });
  }
  return chunks;
}

function renderBookPrompt(topic, chunks, lang) {
  const sources = chunks.map((c, i) =>
    `[${i + 1}] ${c.path}\n  title: ${c.title}\n  content: ${c.body.replace(/\n+/g, " ").slice(0, 1200)}`
  ).join("\n\n");
  const langInstruction = lang === "en"
    ? "Write the book (title, subtitle, intro, chapter titles, summaries, key points) in ENGLISH regardless of the topic's language."
    : lang === "es"
      ? "Escribí el libro (title, subtitle, intro, títulos de capítulo, summaries, key points) en ESPAÑOL sin importar el idioma del topic."
      : `Respond in the same language as the topic ("${topic}"). If the topic is ambiguous (proper noun, single word), default to the majority language of the source articles.`;
  return `You are an expert curriculum designer for a knowledge base about ${KB_CONTEXT_NAME} (${KB_CONTEXT_DESC}).

The reader wants to learn about: **${topic}**

Below is a set of wiki articles from the KB that are potentially relevant. Your job:
1. Select the ones that actually matter for learning ${topic}. Discard noise.
2. Organize them into a linear book with 3–10 chapters, ordered pedagogically
   (prerequisites first, advanced last).
3. For each chapter, write a short summary, key takeaways, and list the
   concept_paths (from the set below) that back it.
4. Write a short intro (2–4 paragraphs) and a title + subtitle for the book.
5. Propose "further_reading" — concept slugs (without .md) the reader could
   explore next. These can include paths from the set that didn't make it
   into the main chapters.

${langInstruction}
Be concrete and grounded in the source content — do not invent facts.

## Available wiki articles

${sources}

## Output

Return the structured book. Use paths exactly as given (including the "wiki/"
prefix and ".md" suffix) for concept_paths.`;
}

// Slug a topic string into a filename-safe identifier. Keeps lowercase
// alphanumerics + dashes, caps at 80 chars so very long topics don't overflow.
function slugifyTopic(topic) {
  return topic
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const BOOKS_DIR = path.join(KB_ROOT, "raw", "books");
const USE_GITHUB_STORE = process.env.KB_WRITE_BACKEND === "github" || process.env.VERCEL === "1" || process.env.VERCEL === "true";

async function loadCachedBook(slug) {
  const rel = `raw/books/${slug}.json`;
  try {
    // Local filesystem first (always correct when we have it)
    const file = path.join(BOOKS_DIR, `${slug}.json`);
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw);
  } catch {}
  // Fall through to GitHub (useful when the viewer is serving a cold deploy
  // and the book was just committed by another function invocation)
  if (USE_GITHUB_STORE) {
    try {
      const { getFile, isConfigured } = await import("./github-store.js");
      if (isConfigured()) {
        const f = await getFile(rel);
        if (f) return JSON.parse(f.content);
      }
    } catch (e) {
      console.warn("[book] github load failed:", e.message);
    }
  }
  return null;
}

async function saveBook(slug, payload) {
  const json = JSON.stringify(payload, null, 2);
  const rel = `raw/books/${slug}.json`;
  if (USE_GITHUB_STORE) {
    try {
      const { putFile, isConfigured } = await import("./github-store.js");
      if (isConfigured()) {
        const res = await putFile(rel, json, { message: `kb: update book ${slug}` });
        return res.path;
      }
    } catch (e) {
      console.warn("[book] github save failed:", e.message);
    }
  }
  try {
    await fs.mkdir(BOOKS_DIR, { recursive: true });
    const file = path.join(BOOKS_DIR, `${slug}.json`);
    await fs.writeFile(file, json, "utf8");
    return file;
  } catch (e) {
    console.warn("[book] local save failed:", e.message);
    return null;
  }
}

export async function listBooks() {
  try {
    await fs.mkdir(BOOKS_DIR, { recursive: true });
    const entries = await fs.readdir(BOOKS_DIR);
    const out = [];
    for (const f of entries) {
      if (!f.endsWith(".json")) continue;
      // Skip leftover side-files from the old ideas storage (e.g. foo.ideas.json)
      if (f.endsWith(".ideas.json")) continue;
      try {
        const raw = await fs.readFile(path.join(BOOKS_DIR, f), "utf8");
        const data = JSON.parse(raw);
        out.push({
          slug: f.replace(/\.json$/, ""),
          topic: data.topic,
          title: data.book?.title,
          subtitle: data.book?.subtitle,
          chapters: data.book?.chapters?.length || 0,
          composed_at: data.composed_at,
          model: data.model,
          cover_path: data.book?.cover_path || null,
          cover_generated_at: data.book?.cover_generated_at || null,
        });
      } catch {}
    }
    return out.sort((a, b) => (b.composed_at || "").localeCompare(a.composed_at || ""));
  } catch { return []; }
}

// Streaming version: emits progress events via the `onProgress` callback as
// each stage completes. The HTTP layer wraps this in an SSE response so the
// client gets live feedback ("picking", "reading N articles", "composing",
// "done"). Results are persisted to raw/books/<slug>.json so the same topic
// returns the same book on subsequent requests (unless force: true).
export async function composeBookAboutStream({ topic, lang = "auto", onProgress = () => {}, force = false }) {
  if (!topic || !topic.trim()) throw new Error("topic required");
  if (!process.env.ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY not set");

  const metrics = { stages: {} };
  const t0 = Date.now();
  // Slug includes language so "Adizes en" and "Adizes es" cache separately
  const baseSlug = slugifyTopic(topic);
  const slug = lang && lang !== "auto" ? `${baseSlug}-${lang}` : baseSlug;

  // Cache lookup — skip the LLM round-trip if we already composed this topic
  if (!force) {
    onProgress({ stage: "checking-cache", message: "Checking for existing book on this topic…" });
    const cached = await loadCachedBook(slug);
    if (cached && cached.book) {
      metrics.total_ms = Date.now() - t0;
      onProgress({
        stage: "cached",
        message: `Loaded cached book from ${path.relative(KB_ROOT, path.join(BOOKS_DIR, slug + ".json"))}`,
        result: { ...cached, cached: true, metrics },
      });
      return { ...cached, cached: true, metrics };
    }
  }

  onProgress({ stage: "picking", message: "Searching wiki for relevant articles…" });
  const s1 = Date.now();
  const picked = await pick({ query: topic, maxItems: MAX_CANDIDATES, budgetMs: 1500 });
  const wikiHits = (picked.hits || []).filter((h) => h.path.startsWith("wiki/"));
  metrics.stages.pick_ms = Date.now() - s1;
  metrics.pick_hits_total = picked.hits.length;
  metrics.pick_hits_wiki = wikiHits.length;

  // Semantic fallback: if lexical pick found nothing in wiki/, let the LLM
  // pick candidates from the full set of wiki titles. Lexical search only
  // matches literal tokens, so vague queries like "How to innovate" miss
  // everything even when the KB has relevant concepts under different names.
  if (wikiHits.length === 0) {
    onProgress({ stage: "picking", message: "No lexical match — asking Iris to pick from wiki titles…" });
    const allWiki = await listAllWikiTitles();
    if (allWiki.length === 0) {
      onProgress({ stage: "error", message: "Wiki is empty. Compile some content first." });
      return { ok: false, error: "Wiki is empty.", metrics };
    }
    const semanticPaths = await semanticPickFromTitles(topic, allWiki);
    const chosen = semanticPaths
      .map((p) => allWiki.find((w) => w.path === p))
      .filter(Boolean)
      .slice(0, MAX_CANDIDATES);
    if (chosen.length === 0) {
      onProgress({ stage: "error", message: "No wiki articles relevant to this topic. Try a different query." });
      return { ok: false, error: "No relevant wiki articles.", metrics };
    }
    wikiHits.push(...chosen.map((c) => ({ path: c.path, group: "wiki" })));
    metrics.semantic_fallback = true;
    metrics.semantic_candidates = chosen.length;
  }

  onProgress({
    stage: "reading",
    message: `Reading ${wikiHits.length} candidate articles…`,
    count: wikiHits.length,
  });
  const s2 = Date.now();
  const wikiDir = path.join(KB_ROOT, "wiki");
  const chunks = await readCandidateChunks(wikiHits, wikiDir);
  metrics.stages.read_ms = Date.now() - s2;

  onProgress({
    stage: "composing",
    message: `Asking Iris to organize ${chunks.length} articles into chapters…`,
    count: chunks.length,
  });
  const s3 = Date.now();
  const prompt = renderBookPrompt(topic, chunks, lang);
  const { object } = await generateObject({
    model: anthropic(MODEL),
    schema: BookSchema,
    prompt,
    maxTokens: 4096,
  });
  metrics.stages.compose_ms = Date.now() - s3;

  onProgress({
    stage: "finalizing",
    message: `Assembling ${object.chapters.length} chapters…`,
    count: object.chapters.length,
  });
  const pathIndex = new Map(chunks.map((c) => [c.path, c]));
  const enrichedChapters = object.chapters.map((ch, idx) => {
    const articles = (ch.concept_paths || [])
      .map((p) => pathIndex.get(p))
      .filter(Boolean)
      .map(({ path, title, body }) => ({ path, title, body }));
    return { number: idx + 1, ...ch, articles };
  });

  metrics.total_ms = Date.now() - t0;
  const result = {
    ok: true,
    topic,
    slug,
    composed_at: new Date().toISOString(),
    model: MODEL,
    context_name: KB_CONTEXT_NAME,
    book: {
      title: object.title,
      subtitle: object.subtitle,
      intro: object.intro,
      reading_order_rationale: object.reading_order_rationale,
      chapters: enrichedChapters,
      further_reading: object.further_reading || [],
    },
    metrics,
  };

  // Persist to raw/books/<slug>.json so subsequent requests for the same
  // topic return the same book instead of re-running the LLM.
  const savedPath = await saveBook(slug, result);
  if (savedPath) result.saved_to = path.relative(KB_ROOT, savedPath);

  onProgress({ stage: "done", message: `Ready — ${enrichedChapters.length} chapters`, result });
  return result;
}

// Non-streaming wrapper for callers that just want the final book
export async function composeBookAbout({ topic }) {
  return composeBookAboutStream({ topic, onProgress: () => {} });
}

// Persist a whole book object as-is (used by chapter CRUD handlers).
// Bypasses the compose pipeline — just saves what you hand it.
export async function patchBookWhole(slug, book) {
  await saveBook(slug, book);
  return book;
}

// Add a new chapter to an existing book. Inserts at the end by default,
// re-numbers, and persists.
export async function addChapter(slug, { title, summary, key_points = [], body = "", position }) {
  const book = await mustLoadBook(slug);
  const chapters = book.book.chapters || [];
  const newChapter = {
    number: 0, // placeholder; set after insertion
    title: title || "Untitled chapter",
    summary: summary || "",
    key_points: Array.isArray(key_points) ? key_points : [],
    body: body || "",
    articles: [],
    concept_paths: [],
    created_at: new Date().toISOString(),
  };
  const idx = typeof position === "number" && position >= 0 && position <= chapters.length
    ? position
    : chapters.length;
  chapters.splice(idx, 0, newChapter);
  chapters.forEach((c, i) => (c.number = i + 1));
  book.book.chapters = chapters;
  await saveBook(slug, book);
  return { chapter: newChapter, book };
}

// ─────────────────────────────────────────────────────────────────────────
// Book mutation + enrichment: everything below operates on an already-saved
// book JSON at raw/books/<slug>.json. All functions load, mutate, save.
// ─────────────────────────────────────────────────────────────────────────

async function mustLoadBook(slug) {
  const b = await loadCachedBook(slug);
  if (!b) throw new Error(`book not found: ${slug}`);
  return b;
}

// Clear a generated section so the user can regenerate it. The UI shows
// generated sections as "done" and clicking them calls this to reset.
export async function clearBookSection(slug, section) {
  const book = await mustLoadBook(slug);
  const fieldMap = {
    prologue: ['prologue', 'prologue_generated_at'],
    index: ['thematic_index', 'thematic_index_generated_at'],
    references: ['references', 'references_generated_at'],
    cover: ['cover_path', 'cover_generated_at'],
  };
  const fields = fieldMap[section];
  if (!fields) throw new Error(`unknown section: ${section}`);
  for (const f of fields) delete book.book[f];
  // For cover, also delete the PNG file on disk
  if (section === 'cover') {
    const imgPath = path.join(BOOKS_DIR, `${slug}.png`);
    await fs.unlink(imgPath).catch(() => {});
  }
  await saveBook(slug, book);
  return book;
}

// PATCH: rename title/subtitle (and optionally the topic). We keep the same
// slug so URLs don't break — renaming only affects the display strings.
export async function patchBookMeta(slug, { title, subtitle, topic } = {}) {
  const book = await mustLoadBook(slug);
  if (typeof title === "string" && title.trim()) book.book.title = title.trim();
  if (typeof subtitle === "string") book.book.subtitle = subtitle.trim();
  if (typeof topic === "string" && topic.trim()) book.topic = topic.trim();
  book.updated_at = new Date().toISOString();
  await saveBook(slug, book);
  return book;
}

// DALL-E 3 cover generation. Uses OpenAI SDK (already installed). Image is
// saved to raw/books/<slug>.png and the book JSON gets a `cover_path` field
// pointing at it (relative to KB_ROOT so the viewer can serve it via /raw-file).
export async function generateBookCover(slug) {
  if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY not set");
  const book = await mustLoadBook(slug);
  const { default: OpenAI } = await import("openai");
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const title = book.book.title || book.topic || slug;
  const subtitle = book.book.subtitle || "";
  const chapterTitles = (book.book.chapters || []).slice(0, 5).map((c) => c.title).join(", ");
  const prompt = `Book cover illustration for "${title}". ${subtitle}. Themes: ${chapterTitles}. Editorial magazine-style, warm muted palette, abstract conceptual art, no text, no typography, no letters, no words. Flipboard-style sophisticated composition with depth and negative space. Rendered as a cohesive symbolic scene that suggests the subject without being literal.`;
  const resp = await client.images.generate({
    model: "dall-e-3",
    prompt: prompt.slice(0, 3800),
    size: "1024x1024",
    quality: "standard",
    n: 1,
  });
  const imageUrl = resp.data?.[0]?.url;
  if (!imageUrl) throw new Error("no image returned by DALL-E");
  const imgResp = await fetch(imageUrl);
  const buf = Buffer.from(await imgResp.arrayBuffer());
  const relImg = `raw/books/${slug}.png`;
  if (USE_GITHUB_STORE) {
    const { putFile, isConfigured } = await import("./github-store.js");
    if (isConfigured()) {
      await putFile(relImg, buf, { message: `kb: cover for ${slug}`, binary: true });
    }
  } else {
    await fs.mkdir(BOOKS_DIR, { recursive: true });
    const imgPath = path.join(BOOKS_DIR, `${slug}.png`);
    await fs.writeFile(imgPath, buf);
  }
  book.book.cover_path = relImg;
  book.book.cover_generated_at = new Date().toISOString();
  await saveBook(slug, book);
  return { cover_path: book.book.cover_path, book };
}

// Prologue: a long-form narrative intro (3-6 paragraphs) written after the
// chapters exist, grounded in the actual chapter content. Stored at
// `book.book.prologue`.
export async function generateBookPrologue(slug) {
  const book = await mustLoadBook(slug);
  const chaptersDigest = (book.book.chapters || [])
    .map((c) => `Ch ${c.number} — ${c.title}\n  ${c.summary || ""}\n  Key: ${(c.key_points || []).join("; ")}`)
    .join("\n\n");
  const PrologueSchema = z.object({
    prologue: z.string().describe("3 to 6 paragraphs of engaging narrative prologue, like a preface in a real book"),
  });
  const prompt = `You are writing the prologue for a book titled "${book.book.title}" (subtitle: "${book.book.subtitle || ""}") about ${book.topic}.

Context: ${KB_CONTEXT_NAME} — ${KB_CONTEXT_DESC}.

The prologue should:
- Hook the reader with a concrete observation, question, or small story
- Explain why this topic matters NOW
- Preview the intellectual journey (what the reader will learn, in narrative form — do not list chapters literally)
- End with an invitation to read on

Length: 3 to 6 paragraphs. Voice: warm, curious, editorial. Do not use section headers, bullet points, or meta-commentary. Write in the same language as the book's existing intro.

## Chapter digest (do not copy verbatim — use as grounding)

${chaptersDigest}

## Existing intro (for tone reference)

${book.book.intro || ""}`;
  const { object } = await generateObject({
    model: anthropic(MODEL),
    schema: PrologueSchema,
    prompt,
    maxTokens: 2048,
  });
  book.book.prologue = object.prologue;
  book.book.prologue_generated_at = new Date().toISOString();
  await saveBook(slug, book);
  return book;
}

// Thematic index: alphabetized list of concepts → chapter numbers. Different
// from the TOC (which is chapter-ordered). Stored at `book.book.thematic_index`.
export async function generateBookIndex(slug) {
  const book = await mustLoadBook(slug);
  const chaptersDigest = (book.book.chapters || [])
    .map((c) => {
      const articleTitles = (c.articles || []).map((a) => a.title).join(", ");
      return `Ch ${c.number} — ${c.title}\n  Summary: ${c.summary || ""}\n  Articles: ${articleTitles}\n  Key: ${(c.key_points || []).join("; ")}`;
    })
    .join("\n\n");
  const IndexEntrySchema = z.object({
    term: z.string().describe("Concept or keyword, capitalized"),
    chapters: z.array(z.string()).describe("Chapter numbers where this concept appears, as strings"),
  });
  const IndexSchema = z.object({
    entries: z.array(IndexEntrySchema).describe("Between 15 and 50 concepts from the book, alphabetized"),
  });
  const prompt = `Generate a thematic index (like the back-of-book index in a printed book) for the book titled "${book.book.title}" about ${book.topic}.

Extract 15 to 50 important concepts, names, frameworks, and terms that appear across the chapters. For each, list the chapter numbers where it's discussed. Alphabetize the output by term.

Use the same language as the chapter titles.

## Chapter digest

${chaptersDigest}`;
  const { object } = await generateObject({
    model: anthropic(MODEL),
    schema: IndexSchema,
    prompt,
    maxTokens: 3000,
  });
  book.book.thematic_index = object.entries;
  book.book.thematic_index_generated_at = new Date().toISOString();
  await saveBook(slug, book);
  return book;
}

// References: parse each article's frontmatter and build a citation list.
// Deterministic, no LLM — just reads source_url, author, date from the raw
// article files. Stored at `book.book.references`.
export async function generateBookReferences(slug) {
  const book = await mustLoadBook(slug);
  const seen = new Set();
  const refs = [];
  for (const ch of book.book.chapters || []) {
    for (const a of ch.articles || []) {
      if (!a.path || seen.has(a.path)) continue;
      seen.add(a.path);
      const abs = path.join(KB_ROOT, a.path);
      const raw = await fs.readFile(abs, "utf8").catch(() => "");
      if (!raw) continue;
      let fm = { data: {} };
      try { fm = matter(raw); } catch {}
      const d = fm.data || {};
      refs.push({
        path: a.path,
        title: d.title || a.title || path.basename(a.path, ".md"),
        author: d.author || d.authors || d.by || null,
        date: d.date || d.published || d.created || null,
        source_url: d.source_url || d.url || d.source || null,
        publisher: d.publisher || d.site || d.source_site || null,
        chapter: ch.number,
      });
    }
  }
  refs.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
  book.book.references = refs;
  book.book.references_generated_at = new Date().toISOString();
  await saveBook(slug, book);
  return book;
}

// Ideas from book: LLM reads the book + user-provided context and emits N
// actionable ideas. Each idea is saved as a real markdown note under
// viz/ideas/from-books/<slug>/ so it shows up in the Ideas tab alongside
// hand-written notes and voice notes. Not stored as a separate JSON blob.
const BOOK_IDEAS_ROOT = path.join(KB_ROOT, "viz", "ideas", "from-books");

function slugifyIdea(title) {
  return String(title || "idea")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export async function generateBookIdeas(slug, { context = "", count = 10 } = {}) {
  const book = await mustLoadBook(slug);
  const chaptersDigest = (book.book.chapters || [])
    .map((c) => `Ch ${c.number} — ${c.title}: ${c.summary || ""}\n  Takeaways: ${(c.key_points || []).join(" | ")}`)
    .join("\n\n");
  const IdeaSchema = z.object({
    title: z.string().describe("Short punchy idea title (5-10 words)"),
    pitch: z.string().describe("1-2 sentence pitch explaining the idea"),
    rationale: z.string().describe("Why this idea follows from the book — cite chapter numbers"),
    next_steps: z.array(z.string()).describe("2-4 concrete next steps to explore this idea"),
  });
  const IdeasSchema = z.object({
    ideas: z.array(IdeaSchema).describe(`Between 5 and ${count} distinct ideas`),
  });
  const prompt = `You have just finished reading the book "${book.book.title}" about ${book.topic}. Now generate ${count} concrete, actionable ideas derived from the book.

${context ? `## Context from the user (who the ideas are for, constraints, goals)\n\n${context}\n\n` : ""}
## Book chapters

${chaptersDigest}

Each idea must:
- Be specific enough to act on (not "think about X")
- Reference at least one chapter as its grounding
- Fit the user's context if provided

Use the same language as the book. Avoid generic advice — tie each idea to something concrete from the chapters.`;
  const { object } = await generateObject({
    model: anthropic(MODEL),
    schema: IdeasSchema,
    prompt,
    maxTokens: 3500,
  });

  // Write each idea as its own markdown note so it shows up in the Ideas tab
  const targetDir = path.join(BOOK_IDEAS_ROOT, slug);
  await fs.mkdir(targetDir, { recursive: true });
  const date = new Date().toISOString().slice(0, 10);
  const generatedAt = new Date().toISOString();
  const written = [];
  const contextYaml = context ? `context: ${JSON.stringify(context)}\n` : "";
  for (let i = 0; i < object.ideas.length; i++) {
    const idea = object.ideas[i];
    const ideaSlug = `${String(i + 1).padStart(2, "0")}-${slugifyIdea(idea.title)}`;
    const file = path.join(targetDir, `${ideaSlug}.md`);
    const body = `---
date: ${date}
concept: ${JSON.stringify(idea.title)}
sources: book:${slug}
source_book: ${JSON.stringify(book.book.title)}
source_book_slug: ${slug}
${contextYaml}generated_at: ${generatedAt}
generated_by: ${MODEL}
---

# ${idea.title}

${idea.pitch}

## Rationale

${idea.rationale}

## Next steps

${(idea.next_steps || []).map((s) => `- ${s}`).join("\n")}

---

*Derived from the book [[${book.book.title}]].*
`;
    await fs.writeFile(file, body, "utf8");
    written.push({
      path: path.relative(KB_ROOT, file),
      title: idea.title,
      pitch: idea.pitch,
      rationale: idea.rationale,
      next_steps: idea.next_steps || [],
    });
  }

  return {
    slug,
    book_title: book.book.title,
    context,
    generated_at: generatedAt,
    model: MODEL,
    folder: path.relative(KB_ROOT, targetDir),
    ideas: written,
  };
}

// Load previously-generated ideas for a book by walking its folder.
export async function loadBookIdeas(slug) {
  try {
    const dir = path.join(BOOK_IDEAS_ROOT, slug);
    const entries = await fs.readdir(dir);
    const ideas = [];
    for (const fname of entries.sort()) {
      if (!fname.endsWith(".md")) continue;
      const raw = await fs.readFile(path.join(dir, fname), "utf8");
      let fm = { data: {}, content: raw };
      try { fm = matter(raw); } catch {}
      const content = fm.content || "";
      // Extract pitch, rationale, next_steps from the markdown structure
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const pitchMatch = content.match(/^#\s+.+\n+([\s\S]*?)(?=\n## |$)/m);
      const rationaleMatch = content.match(/## Rationale\s*\n+([\s\S]*?)(?=\n## |$)/);
      const stepsMatch = content.match(/## Next steps\s*\n+([\s\S]*?)(?=\n## |\n---|$)/);
      ideas.push({
        path: path.relative(KB_ROOT, path.join(dir, fname)),
        title: fm.data?.concept || (titleMatch ? titleMatch[1].trim() : fname),
        pitch: (pitchMatch ? pitchMatch[1] : "").trim(),
        rationale: (rationaleMatch ? rationaleMatch[1] : "").trim(),
        next_steps: (stepsMatch ? stepsMatch[1] : "")
          .split("\n")
          .map((l) => l.replace(/^-\s*/, "").trim())
          .filter(Boolean),
      });
    }
    if (ideas.length === 0) return null;
    return {
      slug,
      folder: path.relative(KB_ROOT, dir),
      ideas,
    };
  } catch { return null; }
}

// Explore for more: LLM reads the book and proposes N new wiki concepts that
// *should* exist but don't. User confirms, we write stubs into wiki/concepts/.
// The book itself gets updated with a "suggested_reading" array that lists
// the new paths so renderBook can show a "Suggested reading" chapter.
export async function exploreForMore(slug, { count = 6 } = {}) {
  const book = await mustLoadBook(slug);
  const existing = new Set();
  for (const ch of book.book.chapters || []) {
    for (const a of ch.articles || []) existing.add(a.path);
  }
  const allWiki = await listAllWikiTitles();
  const existingTitles = allWiki.map((w) => w.title).join(", ");
  const chaptersDigest = (book.book.chapters || [])
    .map((c) => `Ch ${c.number} — ${c.title}: ${c.summary || ""}`)
    .join("\n");
  const StubSchema = z.object({
    title: z.string().describe("Concept title — proper noun case, no .md suffix"),
    slug: z.string().describe("kebab-case slug derived from title"),
    summary: z.string().describe("1-2 sentence summary of what this concept is"),
    outline: z.array(z.string()).describe("3-6 section headings the stub should contain"),
    why_missing: z.string().describe("Why this concept would strengthen the book — reference chapter numbers"),
  });
  const ExploreSchema = z.object({
    proposals: z.array(StubSchema).describe(`Between 3 and ${count} new concepts not yet in the wiki`),
  });
  const prompt = `You are expanding the book "${book.book.title}" about ${book.topic}. Your job: identify ${count} important concepts that are MISSING from the current wiki and would strengthen the book if added.

## Book chapters

${chaptersDigest}

## Concepts already in the wiki (do NOT propose any of these)

${existingTitles}

Propose new concepts that:
- Are clearly missing from the list above
- Would naturally fit as new chapters or sub-topics in the book
- Have enough depth to warrant their own wiki article
- Use the same language as the book`;
  const { object } = await generateObject({
    model: anthropic(MODEL),
    schema: ExploreSchema,
    prompt,
    maxTokens: 3000,
  });
  return { proposals: object.proposals };
}

// Accept proposals: write each as a stub to wiki/concepts/<slug>.md and
// append the paths to book.book.suggested_reading. User-triggered after they
// review the explore results.
export async function acceptExploreProposals(slug, proposals = []) {
  const book = await mustLoadBook(slug);
  const conceptsDir = path.join(KB_ROOT, "wiki", "concepts");
  await fs.mkdir(conceptsDir, { recursive: true });
  const written = [];
  for (const p of proposals) {
    const stubSlug = String(p.slug || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    if (!stubSlug) continue;
    const file = path.join(conceptsDir, `${stubSlug}.md`);
    try {
      // Don't clobber existing files
      await fs.access(file);
      continue;
    } catch {}
    const body = `---
title: ${p.title}
source: book-explore
source_book: ${book.book.title}
source_slug: ${slug}
created: ${new Date().toISOString().slice(0, 10)}
stub: true
---

# ${p.title}

${p.summary || ""}

${(p.outline || []).map((h) => `## ${h}\n\n_To be written._\n`).join("\n")}

---

*This stub was generated from the book [[${book.book.title}]] — Explore for more.*
`;
    await fs.writeFile(file, body, "utf8");
    const rel = path.relative(KB_ROOT, file);
    written.push({ path: rel, title: p.title, summary: p.summary });
  }
  const existing = book.book.suggested_reading || [];
  book.book.suggested_reading = [...existing, ...written];
  book.book.suggested_reading_updated_at = new Date().toISOString();
  await saveBook(slug, book);
  return { written, book };
}
