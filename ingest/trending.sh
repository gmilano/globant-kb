#!/bin/bash
# Ingesta GitHub Trending → KB cada 3h
# Llamado por cron: */180 * * * * /path/to/trending.sh

KB_DIR="$(dirname "$0")/.."
RAW_DIR="$KB_DIR/raw/research/trending"
mkdir -p "$RAW_DIR"

DATE=$(date +%Y-%m-%d)
HOUR=$(date +%H)
OUTPUT="$RAW_DIR/github-trending-$DATE-$HOUR.md"

echo "---
source: https://github.com/trending
ingested: $(date -u +%Y-%m-%dT%H:%M:%SZ)
compiled: false
type: trending
date: $DATE
---

# GitHub Trending — $DATE $HOUR:00
" > "$OUTPUT"

# Scrapear trending
curl -sL "https://github.com/trending" | python3 -c "
import sys, re
content = sys.stdin.read()
# Extraer repos
repos = re.findall(r'<h2[^>]*>\s*<a[^>]*href=\"(/[^\"]+)\"[^>]*>\s*(.*?)\s*</a>', content, re.DOTALL)
descs = re.findall(r'<p[^>]*class=\"[^\"]*col-9[^\"]*\"[^>]*>\s*(.*?)\s*</p>', content, re.DOTALL)
stars = re.findall(r'([0-9,]+)\s*stars today', content)

print('## Repositorios del día\n')
for i, (path, name) in enumerate(repos[:25]):
    name = re.sub(r'\s+', ' ', name).strip()
    url = f'https://github.com{path}'
    desc = re.sub(r'\s+', ' ', descs[i]).strip() if i < len(descs) else ''
    star = stars[i] if i < len(stars) else '?'
    print(f'### {name}')
    print(f'**URL:** {url}')
    print(f'**Stars hoy:** {star}')
    if desc:
        print(f'**Descripción:** {desc}')
    print()
" >> "$OUTPUT" 2>/dev/null

echo "✅ Trending ingesta: $OUTPUT"

# Auto-compilar si hay cambios significativos
OPENAI_API_KEY=$(python3 -c "import json; d=json.load(open('$HOME/.openclaw/openclaw.json')); print(d.get('env',{}).get('OPENAI_API_KEY',''))" 2>/dev/null)
if [ -n "$OPENAI_API_KEY" ]; then
    OPENAI_API_KEY="$OPENAI_API_KEY" "$KB_DIR/kb.sh" compile 2>/dev/null &
    echo "🔨 Compilando KB en background..."
    
    # Analyze recurring repos (2+ days) in background
    (OPENAI_API_KEY="$OPENAI_API_KEY" TRENDING_DIR="$RAW_DIR" WIKI_DIR="$KB_DIR/wiki" KB_DIR="$KB_DIR" bash "$KB_DIR/ingest/repo-analyzer.sh" 2>/dev/null | python3 -c "
import sys, json, os, subprocess
try:
    repos = json.load(sys.stdin)
except:
    sys.exit(0)
for r in repos[:2]:
    print(f\"Analyzing {r[\\\"name\\\"]} ({r[\\\"days\\\"]}d trending)...\")
    subprocess.run(
        ['python3', os.path.join(os.environ.get('KB_DIR','.'), 'ingest/analyze-repo.py'), r['url'], '--days', str(r['days'])],
        env={**os.environ},
        timeout=120
    )
" 2>/dev/null) &
fi
