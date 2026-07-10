#!/usr/bin/env node
/**
 * harness-builder/build.js
 *
 * Compile a YAML process spec into an NLAH (Natural Language Agent Harness)
 * markdown file. Archon-style: deterministic, repeatable, reviewable.
 *
 * Usage:
 *   node harness-builder/build.js <path-to-yaml>
 *
 * Writes <basename>.nlah.md next to the input YAML.
 */
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import yaml from "js-yaml";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const SCHEMA_PATH = path.join(__dirname, "schema", "process.schema.json");
const TEMPLATE_PATH = path.join(__dirname, "templates", "nlah.md.template");

// ---------- tiny JSON Schema validator (subset we use) ----------

function validate(node, schema, pathStack, errors, root) {
  root = root || schema;
  if (schema.$ref) {
    // not used, but keep future-proof
  }
  const t = schema.type;
  if (t) {
    const actual = Array.isArray(node) ? "array" : node === null ? "null" : typeof node;
    const expected = Array.isArray(t) ? t : [t];
    if (!expected.includes(actual === "number" && Number.isInteger(node) ? "integer" : actual) &&
        !expected.includes(actual)) {
      errors.push(`${pathStack.join(".") || "<root>"}: expected ${expected.join("|")}, got ${actual}`);
      return;
    }
  }
  if (schema.enum && !schema.enum.includes(node)) {
    errors.push(`${pathStack.join(".")}: value "${node}" not in [${schema.enum.join(", ")}]`);
  }
  if (schema.pattern && typeof node === "string") {
    if (!new RegExp(schema.pattern).test(node)) {
      errors.push(`${pathStack.join(".")}: "${node}" does not match /${schema.pattern}/`);
    }
  }
  if (schema.minLength && typeof node === "string" && node.length < schema.minLength) {
    errors.push(`${pathStack.join(".")}: string shorter than ${schema.minLength}`);
  }
  if (typeof node === "number") {
    if (schema.minimum != null && node < schema.minimum)
      errors.push(`${pathStack.join(".")}: ${node} < min ${schema.minimum}`);
    if (schema.maximum != null && node > schema.maximum)
      errors.push(`${pathStack.join(".")}: ${node} > max ${schema.maximum}`);
  }
  if (t === "object" || (node && typeof node === "object" && !Array.isArray(node))) {
    const required = schema.required || [];
    for (const key of required) {
      if (!(key in (node || {}))) {
        errors.push(`${pathStack.join(".") || "<root>"}: missing required "${key}"`);
      }
    }
    if (schema.properties && node) {
      for (const [k, v] of Object.entries(node)) {
        if (schema.properties[k]) {
          validate(v, schema.properties[k], [...pathStack, k], errors, root);
        } else if (schema.additionalProperties === false) {
          errors.push(`${pathStack.join(".") || "<root>"}: unknown property "${k}"`);
        }
      }
    }
  }
  if ((t === "array" || Array.isArray(node)) && schema.items && Array.isArray(node)) {
    if (schema.minItems && node.length < schema.minItems) {
      errors.push(`${pathStack.join(".")}: array shorter than ${schema.minItems}`);
    }
    node.forEach((item, i) => validate(item, schema.items, [...pathStack, `[${i}]`], errors, root));
  }
}

// ---------- cross-field semantic checks ----------

function semanticChecks(spec) {
  const errors = [];
  const stepNames = new Set((spec.steps || []).map(s => s.name));
  for (const s of spec.steps || []) {
    if (s.type === "agent" && !s.agent) errors.push(`step "${s.name}": type=agent requires "agent"`);
    if (s.type === "tool" && !s.tool) errors.push(`step "${s.name}": type=tool requires "tool"`);
    if (s.type === "llm" && !s.prompt) errors.push(`step "${s.name}": type=llm requires "prompt"`);
    if (s.type === "decision" && !s.branches) errors.push(`step "${s.name}": type=decision requires "branches"`);
    for (const dep of s.depends_on || []) {
      if (!stepNames.has(dep)) errors.push(`step "${s.name}": depends_on unknown step "${dep}"`);
    }
  }
  for (const hc of spec.human_checkpoints || []) {
    if (!stepNames.has(hc.after_step)) {
      errors.push(`human_checkpoint: after_step "${hc.after_step}" is not a declared step`);
    }
  }
  return errors;
}

// ---------- renderer ----------

function renderList(items, fn) {
  if (!items || !items.length) return "_none_";
  return items.map(fn).join("\n");
}

function renderStep(step, idx) {
  const lines = [];
  lines.push(`### Step ${idx + 1} — \`${step.name}\``);
  lines.push("");
  lines.push(`**Type:** \`${step.type}\``);
  if (step.agent) lines.push(`**Agent:** \`${step.agent}\``);
  if (step.tool) lines.push(`**Tool:** \`${step.tool}\``);
  if (step.model) lines.push(`**Model:** \`${step.model}\``);
  if (step.timeout_ms) lines.push(`**Timeout:** ${step.timeout_ms}ms`);
  if (step.retries != null) lines.push(`**Retries:** ${step.retries}`);
  if (step.depends_on?.length) lines.push(`**Depends on:** ${step.depends_on.map(d => `\`${d}\``).join(", ")}`);
  lines.push("");
  lines.push(`**Description:** ${step.description}`);
  if (step.prompt) {
    lines.push("");
    lines.push("**Prompt:**");
    lines.push("");
    lines.push("```");
    lines.push(step.prompt.trim());
    lines.push("```");
  }
  if (step.branches) {
    lines.push("");
    lines.push("**Branches:**");
    for (const [cond, target] of Object.entries(step.branches)) {
      lines.push(`- \`${cond}\` → \`${target}\``);
    }
  }
  if (step.outputs?.length) {
    lines.push("");
    lines.push(`**Outputs:** ${step.outputs.map(o => `\`${o}\``).join(", ")}`);
  }
  return lines.join("\n");
}

function renderCheckpoint(hc) {
  const req = hc.required === false ? "optional" : "required";
  const sla = hc.sla_minutes ? ` (SLA ${hc.sla_minutes}m)` : "";
  const expected = hc.expected_input ? ` _[expects: ${hc.expected_input}]_` : "";
  return `- **After \`${hc.after_step}\`** — ${req}${sla}${expected}\n    > ${hc.prompt}`;
}

function renderInput(i) {
  const req = i.required === false ? "optional" : "required";
  const ex = i.example != null ? ` _(e.g. \`${JSON.stringify(i.example)}\`)_` : "";
  return `- \`${i.name}\` (${i.type}, ${req})${i.description ? " — " + i.description : ""}${ex}`;
}

function renderOutput(o) {
  return `- \`${o.name}\` (${o.type})${o.description ? " — " + o.description : ""}${o.sink ? ` → **${o.sink}**` : ""}`;
}

function applyTemplate(tpl, vars) {
  return tpl.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, key) => {
    const v = key.split(".").reduce((o, k) => (o == null ? o : o[k]), vars);
    return v == null ? "" : String(v);
  });
}

function render(spec) {
  const tpl = fs.readFileSync(TEMPLATE_PATH, "utf8");
  const trigger = spec.trigger
    ? `${spec.trigger.type}${spec.trigger.cron ? ` \`${spec.trigger.cron}\`` : ""}${spec.trigger.event ? ` on \`${spec.trigger.event}\`` : ""}${spec.trigger.source ? ` from \`${spec.trigger.source}\`` : ""}`
    : "manual";

  const ep = spec.error_policy || {};
  const errorPolicy =
    `retry=${ep.retry ?? 0}, backoff=${ep.backoff ?? "none"}, on_failure=${ep.on_failure ?? "halt"}` +
    (ep.fallback_agent ? `, fallback=\`${ep.fallback_agent}\`` : "");

  const owner = `${spec.owner.name}${spec.owner.team ? ` (${spec.owner.team})` : ""}${spec.owner.contact ? ` — ${spec.owner.contact}` : ""}`;

  return applyTemplate(tpl, {
    process_name: spec.process_name,
    version: spec.version,
    description: spec.description,
    owner,
    trigger,
    generated_at: new Date().toISOString(),
    tags: (spec.tags || []).map(t => `\`${t}\``).join(" ") || "_none_",
    inputs: renderList(spec.inputs, renderInput),
    outputs: renderList(spec.outputs, renderOutput),
    steps: (spec.steps || []).map(renderStep).join("\n\n"),
    checkpoints: renderList(spec.human_checkpoints, renderCheckpoint),
    error_policy: errorPolicy,
    step_count: (spec.steps || []).length,
    checkpoint_count: (spec.human_checkpoints || []).length,
  });
}

// ---------- main ----------

function main() {
  const input = process.argv[2];
  if (!input) {
    console.error("Usage: node harness-builder/build.js <path-to-yaml>");
    process.exit(2);
  }
  const absIn = path.resolve(input);
  if (!fs.existsSync(absIn)) {
    console.error(`✗ Not found: ${absIn}`);
    process.exit(2);
  }

  const schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, "utf8"));
  const spec = yaml.load(fs.readFileSync(absIn, "utf8"));

  const errors = [];
  validate(spec, schema, [], errors);
  errors.push(...semanticChecks(spec || {}));

  if (errors.length) {
    console.error(`✗ Validation failed for ${path.basename(absIn)}:`);
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }

  const out = render(spec);
  const outPath = absIn.replace(/\.ya?ml$/i, ".nlah.md");
  fs.writeFileSync(outPath, out);
  const steps = (spec.steps || []).length;
  const checks = (spec.human_checkpoints || []).length;
  console.log(`✅ Built ${spec.process_name} → ${path.relative(process.cwd(), outPath)} (${steps} steps, ${checks} checkpoints)`);
}

main();
