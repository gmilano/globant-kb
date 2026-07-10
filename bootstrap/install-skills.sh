#!/usr/bin/env bash
# bootstrap/install-skills.sh — Wany KB Skills Framework installer
#
# Walks skills/*/SKILL.md (and skills/*/*/SKILL.md), parses the YAML
# frontmatter of each, and writes skills/_registry.json.
#
# Idempotent: running twice produces a byte-identical registry (fields
# are sorted and there is no timestamp). Never fails the pipeline —
# malformed skills are warned about on stderr and skipped.
#
# Usage:  bash bootstrap/install-skills.sh

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SKILLS_DIR="$REPO_ROOT/skills"
REGISTRY="$SKILLS_DIR/_registry.json"

if [[ ! -d "$SKILLS_DIR" ]]; then
  echo "install-skills: no skills/ directory at $SKILLS_DIR" >&2
  exit 0
fi

# Prefer python3 for YAML parsing — it is already a hard dep of the repo
# (see ingest/analyze-repo.py). Fall back with a clear error if missing.
if ! command -v python3 >/dev/null 2>&1; then
  echo "install-skills: python3 not found; cannot parse SKILL.md frontmatter" >&2
  exit 1
fi

python3 - "$SKILLS_DIR" "$REGISTRY" <<'PY'
import json, os, re, sys

skills_dir, registry_path = sys.argv[1], sys.argv[2]

REQUIRED = ("name", "agent", "description", "inputs", "outputs")
FRONTMATTER_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.DOTALL)

def parse_yaml(block: str):
    """Tiny YAML subset parser — just enough for SKILL.md frontmatter.

    Supports scalars, inline arrays, block sequences of dicts and simple
    nested 2-space indentation. Not a general YAML parser — do not reuse
    outside this file.
    """
    out, lines, i = {}, block.splitlines(), 0

    def parse_scalar(v):
        v = v.strip()
        if v.startswith("[") and v.endswith("]"):
            inner = v[1:-1].strip()
            if not inner:
                return []
            return [parse_scalar(x) for x in inner.split(",")]
        if v.startswith('"') and v.endswith('"'):
            return v[1:-1]
        if v.startswith("'") and v.endswith("'"):
            return v[1:-1]
        if v in ("true", "false"):
            return v == "true"
        try:
            if "." in v:
                return float(v)
            return int(v)
        except ValueError:
            return v

    while i < len(lines):
        line = lines[i]
        if not line.strip() or line.lstrip().startswith("#"):
            i += 1
            continue
        # top-level key
        m = re.match(r"^([a-zA-Z_][\w-]*):\s*(.*)$", line)
        if not m:
            i += 1
            continue
        key, rest = m.group(1), m.group(2)
        if rest.strip() == "":
            # block child — could be list of dicts or nested mapping
            block_lines, j = [], i + 1
            while j < len(lines) and (lines[j].startswith("  ") or lines[j].strip() == ""):
                block_lines.append(lines[j])
                j += 1
            # list of dicts?
            if any(bl.lstrip().startswith("- ") for bl in block_lines):
                items, cur = [], None
                for bl in block_lines:
                    if not bl.strip():
                        continue
                    stripped = bl.lstrip()
                    if stripped.startswith("- "):
                        if cur is not None:
                            items.append(cur)
                        cur = {}
                        kv = stripped[2:]
                        km = re.match(r"^([a-zA-Z_][\w-]*):\s*(.*)$", kv)
                        if km:
                            k2, v2 = km.group(1), km.group(2)
                            if v2.strip():
                                cur[k2] = parse_scalar(v2)
                    else:
                        km = re.match(r"^([a-zA-Z_][\w-]*):\s*(.*)$", stripped)
                        if km and cur is not None:
                            k2, v2 = km.group(1), km.group(2)
                            if v2.strip():
                                cur[k2] = parse_scalar(v2)
                if cur is not None:
                    items.append(cur)
                out[key] = items
            else:
                # nested mapping
                nested = {}
                for bl in block_lines:
                    if not bl.strip():
                        continue
                    stripped = bl.strip()
                    km = re.match(r"^([a-zA-Z_][\w-]*):\s*(.*)$", stripped)
                    if km:
                        nested[km.group(1)] = parse_scalar(km.group(2))
                out[key] = nested
            i = j
            continue
        out[key] = parse_scalar(rest)
        i += 1
    return out

def find_skill_files(root):
    for dirpath, _dirs, files in os.walk(root):
        if "SKILL.md" in files:
            yield os.path.join(dirpath, "SKILL.md")

skills = []
warnings = []
for path in sorted(find_skill_files(skills_dir)):
    rel = os.path.relpath(path, os.path.dirname(skills_dir))
    try:
        with open(path, "r", encoding="utf-8") as fh:
            text = fh.read()
    except OSError as e:
        warnings.append(f"{rel}: read error: {e}")
        continue
    m = FRONTMATTER_RE.match(text)
    if not m:
        warnings.append(f"{rel}: missing YAML frontmatter, skipped")
        continue
    try:
        fm = parse_yaml(m.group(1))
    except Exception as e:
        warnings.append(f"{rel}: frontmatter parse error ({e}), skipped")
        continue
    missing = [k for k in REQUIRED if k not in fm]
    if missing:
        warnings.append(f"{rel}: missing required fields {missing}, skipped")
        continue
    skills.append({
        "name":        fm["name"],
        "agent":       fm["agent"],
        "version":     fm.get("version", "0.1.0"),
        "description": fm["description"],
        "inputs":      fm["inputs"],
        "outputs":     fm["outputs"],
        "tags":        fm.get("tags", []),
        "path":        rel,
    })

skills.sort(key=lambda s: (s["agent"], s["name"]))

registry = {
    "$schema": "https://wany.kb/skills/registry.schema.json",
    "count": len(skills),
    "skills": skills,
}

with open(registry_path, "w", encoding="utf-8") as fh:
    json.dump(registry, fh, indent=2, sort_keys=True)
    fh.write("\n")

for w in warnings:
    print(f"install-skills: WARN {w}", file=sys.stderr)

names = ", ".join(s["name"] for s in skills) or "(none)"
print(f"Registered {len(skills)} skills: [{names}]")
PY
