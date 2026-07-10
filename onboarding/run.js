#!/usr/bin/env node
/**
 * Wany KB Onboarding Tutor — runner.
 *
 * Implements `onboarding/tutor.nlah.md` using the Vercel AI SDK
 * (`generateObject` + Zod schema), same pattern as `viewer/services/pack.js`.
 *
 * Usage: node onboarding/run.js
 * Requires: ANTHROPIC_API_KEY
 *
 * Dependencies are resolved from `viewer/node_modules` (the viewer already
 * installs `@ai-sdk/anthropic`, `ai`, and `zod`). See onboarding/README.md.
 */

import { createRequire } from "module";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");

// Resolve AI SDK + zod from viewer/node_modules so we don't duplicate deps.
const viewerRequire = createRequire(path.join(REPO_ROOT, "viewer", "package.json"));
const { anthropic } = viewerRequire("@ai-sdk/anthropic");
const { generateObject } = viewerRequire("ai");
const { z } = viewerRequire("zod");

const MODEL = process.env.ONBOARDING_MODEL || "claude-sonnet-4-6";
const MAX_FILE_CHARS = Number(process.env.ONBOARDING_MAX_FILE_CHARS || 8000);
const TOP_CONCEPTS_BY_MTIME = 20;

const ConceptSchema = z.object({
  name: z.string(),
  summary: z.string(),
  source_file: z.string().describe("Repo-relative path present in the bundle"),
});

const QuizItemSchema = z.object({
  question: z.string(),
  expected_answer: z.string(),
  source_file: z.string(),
});

const SelfGradeSchema = z.object({
  question_idx: z.number().int().min(0),
  score: z.number().min(0).max(1),
  reasoning: z.string(),
});

const GapSchema = z.object({
  issue: z.string(),
  files: z.array(z.string()),
  severity: z.enum(["low", "medium", "high"]),
});

const OnboardingResultSchema = z.object({
  concepts: z.array(ConceptSchema).length(10),
  quiz: z.array(QuizItemSchema).length(10),
  self_grades: z.array(SelfGradeSchema).length(10),
  gaps: z.array(GapSchema),
  overall_readiness: z.number().min(0).max(1),
});

// --- Discovery ---------------------------------------------------------------

async function safeRead(abs) {
  try {
    const buf = await fs.readFile(abs, "utf8");
    return buf.length > MAX_FILE_CHARS ? buf.slice(0, MAX_FILE_CHARS) + "\n…[truncated]" : buf;
  } catch {
    return null;
  }
}

async function statMtime(abs) {
  try {
    const st = await fs.stat(abs);
    return st.mtimeMs;
  } catch {
    return 0;
  }
}

async function collectBundle() {
  const bundle = [];

  const push = async (rel) => {
    const abs = path.join(REPO_ROOT, rel);
    const content = await safeRead(abs);
    if (content != null) bundle.push({ path: rel, content });
  };

  // Top-level anchors
  await push("README.md");
  await push("AGENTS.md");
  await push("CLAUDE.md");

  // Decisions (all ADRs)
  try {
    const entries = await fs.readdir(path.join(REPO_ROOT, "decisions"));
    for (const e of entries.filter((n) => n.endsWith(".md")).sort()) {
      await push(path.join("decisions", e));
    }
  } catch { /* optional */ }

  // Wiki INDEX
  await push("wiki/INDEX.md");

  // Top N concepts by mtime
  try {
    const conceptsDir = path.join(REPO_ROOT, "wiki", "concepts");
    const entries = await fs.readdir(conceptsDir);
    const scored = await Promise.all(
      entries
        .filter((n) => n.endsWith(".md"))
        .map(async (n) => ({ n, mt: await statMtime(path.join(conceptsDir, n)) }))
    );
    scored.sort((a, b) => b.mt - a.mt);
    for (const { n } of scored.slice(0, TOP_CONCEPTS_BY_MTIME)) {
      await push(path.join("wiki", "concepts", n));
    }
  } catch { /* optional */ }

  // Latest ideas file
  try {
    const ideasDir = path.join(REPO_ROOT, "viz", "ideas");
    const entries = (await fs.readdir(ideasDir))
      .filter((n) => /^ideas-.*\.md$/.test(n))
      .sort();
    const latest = entries[entries.length - 1];
    if (latest) await push(path.join("viz", "ideas", latest));
  } catch { /* optional */ }

  return bundle;
}

// --- Prompt ------------------------------------------------------------------

async function loadTutorSpec() {
  return fs.readFile(path.join(__dirname, "tutor.nlah.md"), "utf8");
}

function renderBundle(bundle) {
  return bundle
    .map(
      (f) =>
        `\n\n===== FILE: ${f.path} =====\n${f.content}\n===== END ${f.path} =====`
    )
    .join("\n");
}

// --- Report rendering --------------------------------------------------------

function renderReport({ result, bundle, model, dateIso }) {
  const lines = [];
  lines.push(`# Wany KB Onboarding Report — ${dateIso}`);
  lines.push("");
  lines.push(`**Model:** \`${model}\`  `);
  lines.push(`**Files reviewed:** ${bundle.length}  `);
  lines.push(`**Overall readiness:** **${(result.overall_readiness * 100).toFixed(0)}%**`);
  lines.push("");
  lines.push("## Key concepts (10)");
  lines.push("");
  result.concepts.forEach((c, i) => {
    lines.push(`### ${i + 1}. ${c.name}`);
    lines.push(`*Source:* \`${c.source_file}\``);
    lines.push("");
    lines.push(c.summary);
    lines.push("");
  });
  lines.push("## Quiz + self-grades");
  lines.push("");
  result.quiz.forEach((q, i) => {
    const g = result.self_grades.find((x) => x.question_idx === i) || { score: 0, reasoning: "(no grade)" };
    lines.push(`**Q${i + 1}. ${q.question}**`);
    lines.push(`*Expected:* ${q.expected_answer}`);
    lines.push(`*Source:* \`${q.source_file}\``);
    lines.push(`*Self-grade:* ${(g.score * 100).toFixed(0)}% — ${g.reasoning}`);
    lines.push("");
  });
  lines.push("## Gaps detected");
  lines.push("");
  if (result.gaps.length === 0) {
    lines.push("_None reported._");
  } else {
    for (const g of result.gaps) {
      lines.push(`- **[${g.severity}]** ${g.issue}`);
      if (g.files.length) lines.push(`  - files: ${g.files.map((f) => `\`${f}\``).join(", ")}`);
    }
  }
  lines.push("");
  lines.push("## Files reviewed");
  lines.push("");
  for (const f of bundle) lines.push(`- \`${f.path}\``);
  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push(
    "_Generated by `onboarding/run.js` (tutor spec: `onboarding/tutor.nlah.md`). Readiness = mean self-grade − 0.05 per high-severity gap._"
  );
  return lines.join("\n") + "\n";
}

// --- Main --------------------------------------------------------------------

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY not set. Aborting.");
    console.error("Tip: a hand-written sample lives at onboarding/reports/onboarding-report-SAMPLE.md");
    process.exit(1);
  }

  console.log("[onboarding] collecting bundle…");
  const bundle = await collectBundle();
  console.log(`[onboarding] bundle: ${bundle.length} files`);
  if (bundle.length === 0) {
    console.error("No discoverable context files found. Check that you ran this from the repo root.");
    process.exit(2);
  }

  const spec = await loadTutorSpec();
  const prompt =
    spec +
    "\n\n---\n\n# REPO CONTEXT BUNDLE\n" +
    renderBundle(bundle) +
    "\n\n# END BUNDLE\n\nReturn the structured object now.";

  console.log(`[onboarding] calling ${MODEL}…`);
  const { object: result } = await generateObject({
    model: anthropic(MODEL),
    schema: OnboardingResultSchema,
    prompt,
    maxTokens: 4096,
  });

  const dateIso = new Date().toISOString().slice(0, 10);
  const reportDir = path.join(__dirname, "reports");
  await fs.mkdir(reportDir, { recursive: true });
  const reportPath = path.join(reportDir, `onboarding-report-${dateIso}.md`);
  await fs.writeFile(reportPath, renderReport({ result, bundle, model: MODEL, dateIso }), "utf8");

  console.log("");
  console.log("=".repeat(60));
  console.log(`Onboarding report: ${path.relative(REPO_ROOT, reportPath)}`);
  console.log(`Readiness: ${(result.overall_readiness * 100).toFixed(0)}%`);
  console.log(`Concepts: ${result.concepts.length} | Quiz: ${result.quiz.length} | Gaps: ${result.gaps.length}`);
  const high = result.gaps.filter((g) => g.severity === "high").length;
  if (high) console.log(`High-severity gaps: ${high}`);
  console.log("=".repeat(60));
}

main().catch((err) => {
  console.error("[onboarding] failed:", err);
  process.exit(1);
});
