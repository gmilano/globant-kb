import { anthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const MODEL = process.env.KB_PACK_MODEL || "claude-sonnet-4-6";
const MAX_RAW_CHARS = Number(process.env.KB_PACK_MAX_CHARS || 20000);

const ConceptSchema = z.object({
  path: z.string().describe("Ruta relativa al wiki, p.ej. concepts/slug-kebab-case.md"),
  action: z.enum(["create", "update"]),
  content: z.string().describe("Markdown completo del artículo con frontmatter"),
});

const CompileResultSchema = z.object({
  concepts: z.array(ConceptSchema),
  index_entries: z.array(z.string()).describe("Líneas para INDEX.md, formato: '- [[slug]] — descripción'"),
  skip_reason: z.string().nullable().describe("Si la fuente no amerita conceptos, motivo breve; null si se procesó"),
});

async function loadPrompt() {
  return fs.readFile(path.join(__dirname, "prompts", "compile.md"), "utf8");
}

export async function findUncompiled(rawDir) {
  const out = [];
  async function walk(dir) {
    let entries;
    try { entries = await fs.readdir(dir, { withFileTypes: true }); }
    catch { return; }
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) { await walk(p); continue; }
      if (!e.name.endsWith(".md")) continue;
      const raw = await fs.readFile(p, "utf8");
      let fm;
      try { fm = matter(raw); }
      catch (err) {
        out.push({ path: p, raw, frontmatter: {}, body: raw, _yamlError: err.message });
        continue;
      }
      if (fm.data.compiled !== true) {
        out.push({ path: p, raw, frontmatter: fm.data, body: fm.content });
      }
    }
  }
  await walk(rawDir);
  return out;
}

async function readWikiIndex(wikiDir) {
  try { return await fs.readFile(path.join(wikiDir, "INDEX.md"), "utf8"); }
  catch { return "Wiki vacío — empezar desde cero"; }
}

function renderPrompt(tpl, vars) {
  return tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => (vars[k] ?? ""));
}

// Per-KB relevance context — lets each scaffolded KB have its own topic focus
// without forking the prompt template.
const KB_CONTEXT_NAME = process.env.KB_CONTEXT_NAME || 'Wany';
const KB_CONTEXT_DESC = process.env.KB_CONTEXT_DESC || 'empresa de AI agents';
const KB_DISPLAY_NAME = process.env.KB_DISPLAY_NAME || KB_CONTEXT_NAME;

export async function compileRawFile({ rawFile, wikiDir, tpl, wikiIndex }) {
  const prompt = renderPrompt(tpl, {
    raw_path: path.relative(path.dirname(wikiDir), rawFile.path),
    raw_content: rawFile.body.slice(0, MAX_RAW_CHARS),
    wiki_index: wikiIndex.slice(0, 8000),
    date: new Date().toISOString().slice(0, 10),
    kb_context_name: KB_CONTEXT_NAME,
    kb_context_desc: KB_CONTEXT_DESC,
    kb_display_name: KB_DISPLAY_NAME,
  });

  const { object } = await generateObject({
    model: anthropic(MODEL),
    schema: CompileResultSchema,
    prompt,
    maxTokens: 4096,
  });

  const writes = [];
  const sourceRel = path.relative(path.dirname(wikiDir), rawFile.path);
  for (const c of object.concepts) {
    const target = path.join(wikiDir, c.path);
    await fs.mkdir(path.dirname(target), { recursive: true });
    // Provenance: stamp the generated article with provider / model / context
    // so each node can be re-done and audited. Merge into LLM-emitted frontmatter.
    let enriched = c.content;
    try {
      const fmParsed = matter(c.content);
      fmParsed.data.generated_by = 'vercel-ai-sdk';
      fmParsed.data.provider = 'anthropic';
      fmParsed.data.model = MODEL;
      fmParsed.data.context_name = KB_CONTEXT_NAME;
      fmParsed.data.compiled_at = new Date().toISOString();
      fmParsed.data.source_file = sourceRel;
      fmParsed.data.action = c.action || 'create';
      enriched = matter.stringify(fmParsed.content, fmParsed.data);
    } catch {
      enriched = `---\ngenerated_by: vercel-ai-sdk\nprovider: anthropic\nmodel: ${MODEL}\ncontext_name: ${KB_CONTEXT_NAME}\ncompiled_at: ${new Date().toISOString()}\nsource_file: ${sourceRel}\naction: ${c.action || 'create'}\n---\n\n${c.content}`;
    }
    await fs.writeFile(target, enriched, "utf8");
    writes.push({ path: target, action: c.action });
  }

  const fm = matter(rawFile.raw);
  fm.data.compiled = true;
  fm.data.compiled_at = new Date().toISOString();
  await fs.writeFile(rawFile.path, matter.stringify(fm.content, fm.data), "utf8");

  return {
    file: rawFile.path,
    writes,
    index_entries: object.index_entries,
    skip_reason: object.skip_reason,
  };
}

export async function compileRawToWiki({ rawDir, wikiDir, maxFiles = 20 }) {
  if (!process.env.ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY not set");
  const tpl = await loadPrompt();
  const wikiIndex = await readWikiIndex(wikiDir);
  const uncompiled = (await findUncompiled(rawDir)).slice(0, maxFiles);
  const results = [];
  for (const rf of uncompiled) {
    try {
      const r = await compileRawFile({ rawFile: rf, wikiDir, tpl, wikiIndex });
      results.push({ ok: true, ...r });
    } catch (e) {
      results.push({ ok: false, file: rf.path, error: e.message });
    }
  }
  return results;
}
