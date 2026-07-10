#!/usr/bin/env node
/**
 * Theme validator.
 * Parses THEME_CONTRACT.md, extracts required variables from the tables,
 * then walks viewer/public/themes/<theme>/tokens.css and reports missing vars.
 *
 * Usage: node scripts/theme-validate.js [theme-name]
 * Exit codes: 0 ok, 1 missing vars, 2 theme not found
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const THEMES_DIR = path.join(__dirname, "..", "public", "themes");
const CONTRACT = path.join(THEMES_DIR, "THEME_CONTRACT.md");

function requiredVars() {
  const md = fs.readFileSync(CONTRACT, "utf8");
  // match | `--name` | ... | rows in markdown tables
  const re = /^\|\s*`(--[a-z0-9-]+)`\s*\|/gim;
  const out = new Set();
  let m;
  while ((m = re.exec(md)) !== null) out.add(m[1]);
  return [...out];
}

function tokensProvided(themeName) {
  const p = path.join(THEMES_DIR, themeName, "tokens.css");
  if (!fs.existsSync(p)) return null;
  const css = fs.readFileSync(p, "utf8");
  const re = /(--[a-z0-9-]+)\s*:/gi;
  const out = new Set();
  let m;
  while ((m = re.exec(css)) !== null) out.add(m[1]);
  return [...out];
}

function listThemes() {
  return fs.readdirSync(THEMES_DIR)
    .filter((n) => !n.startsWith("_") && !n.endsWith(".md"))
    .filter((n) => fs.statSync(path.join(THEMES_DIR, n)).isDirectory());
}

function validate(theme) {
  const required = requiredVars();
  const provided = tokensProvided(theme);
  if (!provided) {
    console.error(`❌ Theme "${theme}" not found at ${path.join(THEMES_DIR, theme, "tokens.css")}`);
    return 2;
  }
  const missing = required.filter((v) => !provided.includes(v));
  const extra = provided.filter((v) => !required.includes(v));
  console.log(`Theme: ${theme}`);
  console.log(`  required: ${required.length}`);
  console.log(`  provided: ${provided.length}`);
  if (missing.length) {
    console.log(`  ❌ missing ${missing.length}:`);
    for (const m of missing) console.log(`     ${m}`);
  }
  if (extra.length) {
    console.log(`  ℹ  extra ${extra.length} (not required, allowed): ${extra.join(", ")}`);
  }
  if (!missing.length) console.log(`  ✅ valid`);
  return missing.length ? 1 : 0;
}

const target = process.argv[2];
let code = 0;
if (target) {
  code = validate(target);
} else {
  const themes = listThemes();
  console.log(`Validating ${themes.length} theme(s) against ${path.basename(CONTRACT)}\n`);
  for (const t of themes) {
    code = Math.max(code, validate(t));
    console.log();
  }
}
process.exit(code);
