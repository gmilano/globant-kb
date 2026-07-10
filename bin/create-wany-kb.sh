#!/bin/bash
# create-wany-kb — scaffold a new Wany KB from this template.
#
# Usage:
#   bash bin/create-wany-kb.sh <new-kb-name> [options]
#
# Arguments:
#   <new-kb-name>           REQUIRED. Name of the new directory + git repo.
#
# Options:
#   --parent-dir <path>     Where to create the new KB. Defaults to cwd.
#   --ingest-from <dir>     Seed raw/articles/ from a local directory.
#                           Every .md file is copied recursively; files without
#                           frontmatter get a default compiled:false frontmatter
#                           so the compiler picks them up on first run.
#   --remote <git-url>      Set the new repo's origin to this URL after init.
#   --push                  After the initial commit, push to origin. Implies
#                           --remote must be set (or origin already configured).
#   --no-compile            Skip the first compile pass even if ANTHROPIC_API_KEY
#                           is set (otherwise we offer to run it).
#   --github <owner/repo>   Shortcut: create the repo on GitHub via `gh`, set
#                           origin, and push the initial commit. Requires `gh`.
#   --viewer-port <n>       Port for the viewer (default 3700 + offset).
#   --gitnexus-port <n>     Port for the per-KB gitnexus instance (default 3800 + offset).
#   --no-gitnexus           Skip the gitnexus analyze + pm2 start step.
#   --no-pm2                Don't create pm2 processes at the end (just print
#                           the commands to run).
#
# Example:
#   bash bin/create-wany-kb.sh jnj-kb \
#     --parent-dir ~/Projects \
#     --ingest-from ~/Desktop/iwiki_jnj_20260405_1 \
#     --github gmilano/jnj-kb \
#     --push
#
# The scaffolder:
#   1. Copies the framework code (viewer, services, themes, skills, harness-
#      builder, onboarding, scripts, kb.sh, Makefile, AGENTS.md, README,
#      providers.yaml, vercel.json, api/, .vercelignore, .gitignore)
#   2. Strips existing content (wiki/, raw/ except what you ingest, decisions/
#      except 0001, viz/)
#   3. If --ingest-from, copies every .md into raw/articles/ and adds default
#      frontmatter when missing
#   4. Initializes a fresh git repo with one commit
#   5. Optionally creates + pushes the GitHub repo
#   6. Prints next-step instructions

set -euo pipefail

# ── Parse args ────────────────────────────────────────────────────────────────
NEW_NAME=""
PARENT_DIR="$(pwd)"
INGEST_FROM=""
REMOTE=""
PUSH_AFTER=0
NO_COMPILE=0
GH_REPO=""
VIEWER_PORT=""
GITNEXUS_PORT=""
NO_GITNEXUS=0
NO_PM2=0

while [ $# -gt 0 ]; do
  case "$1" in
    --parent-dir) PARENT_DIR="$2"; shift 2 ;;
    --ingest-from) INGEST_FROM="$2"; shift 2 ;;
    --remote) REMOTE="$2"; shift 2 ;;
    --push) PUSH_AFTER=1; shift ;;
    --no-compile) NO_COMPILE=1; shift ;;
    --github) GH_REPO="$2"; shift 2 ;;
    --viewer-port) VIEWER_PORT="$2"; shift 2 ;;
    --gitnexus-port) GITNEXUS_PORT="$2"; shift 2 ;;
    --no-gitnexus) NO_GITNEXUS=1; shift ;;
    --no-pm2) NO_PM2=1; shift ;;
    -h|--help) grep '^#' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    --*) echo "❌ Unknown option: $1"; exit 1 ;;
    *)
      if [ -z "$NEW_NAME" ]; then NEW_NAME="$1"; shift
      else echo "❌ Unexpected argument: $1"; exit 1; fi
      ;;
  esac
done

# Auto-pick ports if not given: first free pair >= 3700/3800, stepping +10
pick_free_port() {
  local port="$1"
  while lsof -ti:"$port" >/dev/null 2>&1; do
    port=$((port + 1))
  done
  echo "$port"
}
if [ -z "$VIEWER_PORT" ]; then VIEWER_PORT=$(pick_free_port 3710); fi
if [ -z "$GITNEXUS_PORT" ]; then GITNEXUS_PORT=$(pick_free_port 3810); fi

if [ -z "$NEW_NAME" ]; then
  echo "Usage: create-wany-kb.sh <new-kb-name> [options]"
  echo "       --parent-dir <path>    --ingest-from <dir>"
  echo "       --remote <git-url>     --push"
  echo "       --github <owner/repo>  --no-compile"
  exit 1
fi

SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET="$PARENT_DIR/$NEW_NAME"

if [ -e "$TARGET" ]; then
  echo "❌ Target already exists: $TARGET"
  exit 1
fi

if [ -n "$INGEST_FROM" ] && [ ! -d "$INGEST_FROM" ]; then
  echo "❌ --ingest-from dir not found: $INGEST_FROM"
  exit 1
fi

if [ "$PUSH_AFTER" = "1" ] && [ -z "$REMOTE" ] && [ -z "$GH_REPO" ]; then
  echo "❌ --push requires --remote <url> or --github <owner/repo>"
  exit 1
fi

echo "📦 Scaffolding new Wany KB"
echo "   target:         $TARGET"
echo "   template:       $SOURCE_DIR"
echo "   viewer port:    $VIEWER_PORT"
echo "   gitnexus port:  $GITNEXUS_PORT"
[ -n "$INGEST_FROM" ] && echo "   ingest from:    $INGEST_FROM"
[ -n "$REMOTE" ]      && echo "   remote:         $REMOTE"
[ -n "$GH_REPO" ]     && echo "   github:         $GH_REPO (will create via gh)"

mkdir -p "$TARGET"

# ── 1. Copy framework ────────────────────────────────────────────────────────
FRAMEWORK=(
  "viewer/server.js"
  "viewer/app.js"
  "viewer/zoom.js"
  "viewer/package.json"
  "viewer/package-lock.json"
  "viewer/public"
  "viewer/services"
  "viewer/scripts"
  "skills/README.md"
  "skills/_registry.json"
  "bootstrap"
  "harness-builder"
  "onboarding/tutor.nlah.md"
  "onboarding/run.js"
  "onboarding/README.md"
  "scripts"
  "kb.sh"
  "providers.yaml"
  "Makefile"
  "README.md"
  "AGENTS.md"
  "api"
  "vercel.json"
  ".vercelignore"
  ".gitignore"
  "bin/create-wany-kb.sh"
)

for item in "${FRAMEWORK[@]}"; do
  src="$SOURCE_DIR/$item"
  if [ -e "$src" ]; then
    dest="$TARGET/$item"
    mkdir -p "$(dirname "$dest")"
    cp -r "$src" "$dest"
  fi
done

# ── 2. Empty content dirs ────────────────────────────────────────────────────
for dir in wiki wiki/concepts wiki/tools wiki/research raw raw/articles raw/projects raw/research raw/research/news raw/research/papers viz viz/ideas decisions; do
  mkdir -p "$TARGET/$dir"
  touch "$TARGET/$dir/.gitkeep"
done

# ── 3. Seed ADR 0001 so decisions/ has the vision seed ───────────────────────
if [ -f "$SOURCE_DIR/decisions/0001-knowledge-fulfillment-center.md" ]; then
  cp "$SOURCE_DIR/decisions/0001-knowledge-fulfillment-center.md" "$TARGET/decisions/"
fi

# ── 4. Seed raw/ from --ingest-from if provided ──────────────────────────────
if [ -n "$INGEST_FROM" ]; then
  echo "📥 Ingesting markdown from $INGEST_FROM..."
  COUNT=0
  while IFS= read -r -d '' f; do
    rel="${f#$INGEST_FROM/}"
    target_file="$TARGET/raw/articles/$rel"
    mkdir -p "$(dirname "$target_file")"
    # If the file lacks frontmatter, add a default one so pack.js treats it as uncompiled
    if head -n1 "$f" | grep -q '^---$'; then
      cp "$f" "$target_file"
    else
      {
        echo "---"
        echo "source: $INGEST_FROM/$rel"
        echo "ingested: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
        echo "compiled: false"
        echo "type: ingested"
        echo "---"
        echo ""
        cat "$f"
      } > "$target_file"
    fi
    COUNT=$((COUNT + 1))
  done < <(find "$INGEST_FROM" -type f -name '*.md' -print0 2>/dev/null)
  echo "   → $COUNT markdown files copied into raw/articles/"
fi

# ── 5. Seed a welcome wiki INDEX ─────────────────────────────────────────────
cat > "$TARGET/wiki/INDEX.md" <<EOF
---
title: $NEW_NAME
updated: $(date +%Y-%m-%d)
---

# $NEW_NAME

Fresh Wany KB scaffolded from the wany-kb template. Add raw sources to
\`raw/\`, then run \`./kb.sh compile\` to pack them into wiki concepts.

- Pipeline rationale: [decisions/0001-knowledge-fulfillment-center.md](../decisions/0001-knowledge-fulfillment-center.md)
- Behavior contract:  [AGENTS.md](../AGENTS.md)
- Onboarding:         \`make onboarding\` (requires ANTHROPIC_API_KEY)
EOF

# ── 6. .env.example + .env pre-filled with the picked ports ────────────────
cat > "$TARGET/.env.example" <<EOF
# Wany KB env vars

# Required for Knowledge Prime + compile (Vercel AI SDK → Anthropic)
ANTHROPIC_API_KEY=sk-ant-...

# Optional for embeddings and a few routes
OPENAI_API_KEY=sk-...

# Theme selection (catppuccin | primer | catppuccin-light | primer-light)
# KB_THEME=primer

# Pack config
# KB_PACK_MODEL=claude-sonnet-4-6
# KB_PACK_MAX_FILES=20

# Per-KB ports — each KB on the same machine gets its own viewer + gitnexus.
KB_VIEWER_PORT=$VIEWER_PORT
KB_GITNEXUS_URL=http://localhost:$GITNEXUS_PORT
EOF

# .env is a ready-to-use copy of .env.example with the picked ports
cat > "$TARGET/.env" <<EOF
# Auto-generated by create-wany-kb.sh on $(date -u +%Y-%m-%dT%H:%M:%SZ)
# Edit to add ANTHROPIC_API_KEY and OPENAI_API_KEY.
KB_VIEWER_PORT=$VIEWER_PORT
KB_GITNEXUS_URL=http://localhost:$GITNEXUS_PORT
EOF

# ── 7. Initialize git ────────────────────────────────────────────────────────
cd "$TARGET"
git init -q
git add .
git commit -q -m "chore: scaffold $NEW_NAME from wany-kb template

Scaffolded via bin/create-wany-kb.sh from $(basename "$SOURCE_DIR").
$([ -n "$INGEST_FROM" ] && echo "Raw seed: $INGEST_FROM")

--no-decision
"

# ── 8. Remote + GitHub + push ────────────────────────────────────────────────
if [ -n "$GH_REPO" ]; then
  if ! command -v gh >/dev/null 2>&1; then
    echo "⚠️  gh CLI not found — skipping GitHub repo creation. Set REMOTE manually:"
    echo "    git remote add origin <url>"
  else
    echo "🐙 Creating GitHub repo $GH_REPO..."
    gh repo create "$GH_REPO" --private --source=. --remote=origin --push 2>&1 | tail -5
    # gh repo create --push already pushes, so clear PUSH_AFTER to avoid double-push
    PUSH_AFTER=0
  fi
elif [ -n "$REMOTE" ]; then
  git remote add origin "$REMOTE"
  echo "✅ origin set to $REMOTE"
fi

if [ "$PUSH_AFTER" = "1" ] && git remote get-url origin >/dev/null 2>&1; then
  echo "🚀 Pushing initial commit to origin..."
  # Try main first, fall back to master
  BRANCH=$(git symbolic-ref --short HEAD)
  git push -u origin "$BRANCH" 2>&1 | tail -3
fi

# ── 9. Install viewer deps ───────────────────────────────────────────────────
echo "📦 Installing viewer dependencies..."
(cd "$TARGET/viewer" && npm install --silent 2>&1 | tail -3) || echo "⚠️  npm install failed — run manually later"

# ── 10. GitNexus initial analyze ─────────────────────────────────────────────
if [ "$NO_GITNEXUS" = "0" ]; then
  echo "🧠 Running initial gitnexus analyze (this may take a minute)..."
  (cd "$TARGET" && npx --yes gitnexus analyze 2>&1 | tail -5) || \
    echo "⚠️  gitnexus analyze failed — run 'npx gitnexus analyze' manually later"
fi

# ── 11. Start pm2 processes for the viewer + gitnexus ────────────────────────
if [ "$NO_PM2" = "0" ] && command -v pm2 >/dev/null 2>&1; then
  VIEWER_NAME="kb-$NEW_NAME-viewer"
  GITNEXUS_NAME="kb-$NEW_NAME-gitnexus"

  echo "🚀 Starting viewer via pm2 on port $VIEWER_PORT..."
  pm2 delete "$VIEWER_NAME" >/dev/null 2>&1 || true
  (
    cd "$TARGET/viewer" && \
    KB_VIEWER_PORT="$VIEWER_PORT" \
    KB_GITNEXUS_URL="http://localhost:$GITNEXUS_PORT" \
    pm2 start server.js --name "$VIEWER_NAME" --update-env 2>&1 | tail -3
  )

  if [ "$NO_GITNEXUS" = "0" ]; then
    echo "🕸 Starting gitnexus via pm2 on port $GITNEXUS_PORT..."
    pm2 delete "$GITNEXUS_NAME" >/dev/null 2>&1 || true
    pm2 start "npx gitnexus serve --port $GITNEXUS_PORT" \
      --name "$GITNEXUS_NAME" \
      --cwd "$TARGET" 2>&1 | tail -3
  fi

  pm2 save >/dev/null 2>&1 || true
fi

# ── 12. Instructions ─────────────────────────────────────────────────────────
INGEST_COUNT=0
if [ -n "$INGEST_FROM" ]; then
  INGEST_COUNT=$(find "$TARGET/raw/articles" -type f -name '*.md' 2>/dev/null | wc -l | tr -d ' ')
fi

cat <<EOF

✅ Scaffolded: $TARGET
$([ "$INGEST_COUNT" -gt 0 ] && echo "   Seeded $INGEST_COUNT files into raw/articles/")
   Viewer:    http://localhost:$VIEWER_PORT
   GitNexus:  http://localhost:$GITNEXUS_PORT

Next steps:
  cd $TARGET
  edit .env                                 # add ANTHROPIC_API_KEY and OPENAI_API_KEY
  ./kb.sh compile                           # first inbound → wiki pass
  open http://localhost:$VIEWER_PORT

Pipelines (optional):
  pm2 list                                  # confirm the viewer + gitnexus processes
  make onboarding                           # agent-generated onboarding report

EOF
