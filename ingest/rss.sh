#!/bin/bash
# RSS Feeds → globant-kb — cada 6h
set -eo pipefail
KB_DIR="$(cd "$(dirname "$0")/.." && pwd)"
RAW_DIR="$KB_DIR/raw/research/blogs"
mkdir -p "$RAW_DIR"
DATE=$(date +%Y-%m-%d); HOUR=$(date +%H)
OUTPUT="$RAW_DIR/rss-feeds-$DATE-$HOUR.md"
[ -f "$OUTPUT" ] && exit 0

FEEDS=(
  "https://www.businesswire.com/rss/home/?rss=G22"
  "https://techcrunch.com/tag/outsourcing/feed/"
  "https://www.anthropic.com/news/rss.xml"
  "https://openai.com/news/rss.xml"
)

echo "---
source: rss-feeds
kb: globant-kb
ingested: $(date -u +%Y-%m-%dT%H:%M:%SZ)
type: rss
date: $DATE
---

# RSS Feeds (Globant Intelligence) — $DATE $HOUR:00
" > "$OUTPUT"

for FEED_URL in "${FEEDS[@]}"; do
  curl -sL --max-time 10 -A "Mozilla/5.0 globant-kb-ingest" "$FEED_URL" | FEED_URL="$FEED_URL" python3 -c "
import sys, os, re
from xml.etree import ElementTree as ET
raw = sys.stdin.read()
if not raw.strip(): sys.exit(0)
try: root = ET.fromstring(raw)
except: sys.exit(0)
ns = {'atom': 'http://www.w3.org/2005/Atom'}
def strip_html(s): return re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', s or '')).strip()
items = []
for item in root.iter('item'):
    items.append((strip_html(item.findtext('title') or ''), strip_html(item.findtext('link') or ''), strip_html(item.findtext('description') or '')[:200]))
for entry in root.findall('{http://www.w3.org/2005/Atom}entry'):
    link_el = entry.find('{http://www.w3.org/2005/Atom}link')
    items.append((strip_html(entry.findtext('{http://www.w3.org/2005/Atom}title') or ''), link_el.get('href','') if link_el is not None else '', strip_html(entry.findtext('{http://www.w3.org/2005/Atom}summary') or '')[:200]))
feed_name = os.environ['FEED_URL'].split('/')[2]
if items:
    print(f'## {feed_name}')
    for title, link, desc in items[:5]:
        if title:
            print(f'### {title}')
            if link: print(f'**URL:** {link}')
            if desc: print(f'**Summary:** {desc}')
            print()
" >> "$OUTPUT" 2>/dev/null
done
echo "✅ RSS → $OUTPUT"
