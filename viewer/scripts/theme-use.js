#!/usr/bin/env node
/**
 * Switch the active theme by writing KB_THEME=<name> to viewer/.env and
 * reloading pm2 kb-viewer. Usage: node scripts/theme-use.js <theme>
 */
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const THEMES_DIR = path.join(__dirname, "..", "public", "themes");
const ENV_FILE = path.join(__dirname, "..", ".env");

const target = process.argv[2];
if (!target) {
  console.error("Usage: theme:use <theme>");
  console.error("Available:", fs.readdirSync(THEMES_DIR).filter((n) => !n.startsWith("_") && !n.endsWith(".md")).join(", "));
  process.exit(1);
}

if (!fs.existsSync(path.join(THEMES_DIR, target, "tokens.css"))) {
  console.error(`❌ Theme "${target}" not found`);
  process.exit(2);
}

// Rewrite .env preserving other keys
let env = {};
if (fs.existsSync(ENV_FILE)) {
  for (const line of fs.readFileSync(ENV_FILE, "utf8").split("\n")) {
    const [k, ...v] = line.split("=");
    if (k && !k.startsWith("#")) env[k.trim()] = v.join("=");
  }
}
env.KB_THEME = target;
fs.writeFileSync(ENV_FILE, Object.entries(env).map(([k, v]) => `${k}=${v}`).join("\n") + "\n");
console.log(`✅ KB_THEME=${target} written to ${path.relative(process.cwd(), ENV_FILE)}`);

try {
  execSync("pm2 restart kb-viewer --update-env", { stdio: "inherit" });
  console.log(`🔄 kb-viewer restarted with ${target} theme`);
} catch {
  console.log(`ℹ  Not using pm2 or restart failed. Restart the viewer manually to apply.`);
}
