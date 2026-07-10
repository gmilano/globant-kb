#!/bin/bash
# Reddit → globant-kb — cada 4h
set -eo pipefail
KB_DIR="$(cd "$(dirname "$0")/.." && pwd)"
RAW_DIR="$KB_DIR/raw/research/community"
mkdir -p "$RAW_DIR"

run_subreddit() {
  local SUBREDDIT="$1"
  local DATE=$(date +%Y-%m-%d)
  local HOUR=$(date +%H)
  local OUTPUT="$RAW_DIR/reddit-${SUBREDDIT}-$DATE-$HOUR.md"
  [ -f "$OUTPUT" ] && return

  echo "---
source: https://www.reddit.com/r/${SUBREDDIT}
ingested: $(date -u +%Y-%m-%dT%H:%M:%SZ)
compiled: false
type: reddit
subreddit: ${SUBREDDIT}
kb: globant-kb
---" > "$OUTPUT"

  curl -sL -A "globant-kb/1.0" "https://www.reddit.com/r/${SUBREDDIT}/hot.json?limit=20" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
except: sys.exit(0)
for post in data.get('data', {}).get('children', []):
    p = post.get('data', {})
    if p.get('stickied') or p.get('score', 0) < 10: continue
    title = p.get('title', '')
    url = p.get('url', '')
    score = p.get('score', 0)
    selftext = p.get('selftext', '')[:300]
    print(f'### {title}')
    print(f'**Score:** {score} | **Comments:** {p.get("num_comments", 0)}')
    if url and 'reddit.com' not in url: print(f'**URL:** {url}')
    if selftext: print(f'**Summary:** {selftext[:200]}...')
    print()
" >> "$OUTPUT" 2>/dev/null
  echo "  ✅ r/${SUBREDDIT} → $OUTPUT"
}

  run_subreddit "technology"
  run_subreddit "startups"
  run_subreddit "outsourcing"
