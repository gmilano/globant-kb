#!/usr/bin/env node
import path from "path";
import { fileURLToPath } from "url";
import { compileRawToWiki } from "./pack.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KB_DIR = path.resolve(__dirname, "..", "..");
const rawDir = process.env.RAW_DIR || path.join(KB_DIR, "raw");
const wikiDir = process.env.WIKI_DIR || path.join(KB_DIR, "wiki");
const maxFiles = Number(process.env.KB_PACK_MAX_FILES || 20);

if (!process.env.ANTHROPIC_API_KEY) {
  console.error("❌ ANTHROPIC_API_KEY no definido.");
  console.error("   Definí la env var o agregala en ~/.openclaw/openclaw.json → env.ANTHROPIC_API_KEY");
  process.exit(1);
}

console.log(`🔨 Pack: ${rawDir} → ${wikiDir} (max ${maxFiles} archivos por corrida)`);

const results = await compileRawToWiki({ rawDir, wikiDir, maxFiles });
const ok = results.filter((r) => r.ok);
const err = results.filter((r) => !r.ok);
const skipped = ok.filter((r) => r.skip_reason);
const compiled = ok.filter((r) => !r.skip_reason);

console.log(`\n✅ Compilados: ${compiled.length}`);
for (const r of compiled) {
  const rel = path.relative(KB_DIR, r.file);
  console.log(`  - ${rel} → ${r.writes.length} concepto(s)`);
  for (const w of r.writes) console.log(`      ${w.action.padEnd(6)} ${path.relative(KB_DIR, w.path)}`);
}

if (skipped.length) {
  console.log(`\n⏭  Saltados: ${skipped.length}`);
  for (const r of skipped) console.log(`  - ${path.relative(KB_DIR, r.file)}: ${r.skip_reason}`);
}

if (err.length) {
  console.log(`\n❌ Errores: ${err.length}`);
  for (const r of err) console.log(`  - ${path.relative(KB_DIR, r.file)}: ${r.error}`);
  process.exit(2);
}
