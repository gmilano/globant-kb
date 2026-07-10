// agents.js — load agent specs from wiki/agents/*.md and run them via Iris.
//
// Each agent is a markdown file with YAML frontmatter declaring its name,
// methodology, stages (with per-stage prompts), model, and tags. The body
// of the file is the human-readable description.
//
// Agents are first-class ontology entities — they live in the wiki,
// wikilinkable, version-controlled, and discoverable via the same search
// that serves every other concept.

import "./env-clean.js";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";
import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const KB_ROOT = path.resolve(__dirname, "..", "..");
const AGENTS_DIR = path.join(KB_ROOT, "wiki", "agents");

const DEFAULT_MODEL = process.env.KB_AGENT_MODEL || process.env.KB_BOOK_MODEL || "claude-sonnet-4-6";

// ─── discovery ─────────────────────────────────────────────────────

export async function listAgents() {
  const out = [];
  let entries;
  try { entries = await fs.readdir(AGENTS_DIR); } catch { return out; }
  for (const fname of entries) {
    if (!fname.endsWith(".md")) continue;
    try {
      const raw = await fs.readFile(path.join(AGENTS_DIR, fname), "utf8");
      const { data, content } = matter(raw);
      if (data?.type !== "agent") continue;
      out.push({
        slug: data.slug || fname.replace(/\.md$/, ""),
        name: data.name || fname,
        description: data.description || "",
        icon: data.icon || "bot",
        color: data.color || null,
        tags: data.tags || [],
        builtin: !!data.builtin,
        stageCount: Array.isArray(data.stages) ? data.stages.length : 0,
        path: `wiki/agents/${fname}`,
      });
    } catch {}
  }
  return out.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getAgent(slug) {
  const clean = String(slug || "").replace(/[^a-z0-9-]/gi, "");
  if (!clean) throw new Error("invalid slug");
  const abs = path.join(AGENTS_DIR, `${clean}.md`);
  const raw = await fs.readFile(abs, "utf8");
  const { data, content } = matter(raw);
  if (data?.type !== "agent") throw new Error("not an agent");
  return {
    slug: data.slug || clean,
    name: data.name || clean,
    description: data.description || "",
    model: data.model || DEFAULT_MODEL,
    methodology: data.methodology || null,
    icon: data.icon || "bot",
    color: data.color || null,
    tags: data.tags || [],
    stages: Array.isArray(data.stages) ? data.stages : [],
    tools: Array.isArray(data.tools) ? data.tools : [],
    body: content,
    path: `wiki/agents/${clean}.md`,
  };
}

// ─── run ───────────────────────────────────────────────────────────

// Run one turn of an agent conversation. The caller ships:
//   { slug, stageId, messages, userInput }
// where messages is the accumulated conversation so far (across stages),
// and userInput is the initial document/text the agent is critiquing.
// We compose a system prompt that includes the agent's description + the
// current stage's prompt, and stream the response.
export async function* runAgentTurn({ slug, stageId, messages, userInput }) {
  const agent = await getAgent(slug);
  const stage = agent.stages.find((s) => s.id === stageId) || agent.stages[0];
  if (!stage) throw new Error("agent has no stages defined");

  const stageList = agent.stages
    .map((s, i) => `${i + 1}. ${s.name} — ${s.label || ""}`)
    .join("\n");

  const systemPrompt = `Sos ${agent.name}.

${agent.description}

Estás trabajando en fases. Las fases de esta metodología son:
${stageList}

FASE ACTUAL: ${stage.name} — ${stage.label || ""}

${stage.prompt}

CONTEXTO: el usuario te dio este input para analizar. Mantenelo siempre presente.

---
INPUT DEL USUARIO:
${userInput || "(el usuario todavía no pegó contenido — pedile que lo haga)"}
---`;

  const modelMessages = messages.map((m) => ({ role: m.role, content: m.content || "" }));
  if (modelMessages.length === 0) {
    modelMessages.push({ role: "user", content: "Empezá." });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY not set");
  }

  const result = streamText({
    model: anthropic(agent.model),
    system: systemPrompt,
    messages: modelMessages,
    maxTokens: 2500,
  });

  for await (const text of result.textStream) {
    yield { type: "delta", text };
  }
}
