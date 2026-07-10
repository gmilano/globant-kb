#!/bin/bash
# Ingesta Tech News → KB cada 3h
# Fuentes: Hacker News top stories + arXiv CS papers

KB_DIR="$(dirname "$0")/.."
RAW_DIR="$KB_DIR/raw/research/news"
mkdir -p "$RAW_DIR"

DATE=$(date +%Y-%m-%d)
HOUR=$(date +%H)
OUTPUT="$RAW_DIR/tech-news-$DATE-$HOUR.md"

echo "---
source: hackernews+arxiv
ingested: $(date -u +%Y-%m-%dT%H:%M:%SZ)
compiled: false
type: tech-news
date: $DATE
---

# Tech News & Research - $DATE $HOUR:00
" > "$OUTPUT"

# Hacker News Top Stories
echo "## Hacker News - Top Stories" >> "$OUTPUT"
echo "" >> "$OUTPUT"

curl -s "https://hacker-news.firebaseio.com/v0/topstories.json" | python3 -c "
import sys, json, urllib.request, re

def fetch_og(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'}, method='GET')
        with urllib.request.urlopen(req, timeout=4) as r:
            html = r.read(4096).decode('utf-8', errors='ignore')
        img = re.search(r'<meta[^>]+(?:property|name)=[\"\']og:image[\"\'][^>]+content=[\"\']([^\"\'>]+)', html)
        if not img:
            img = re.search(r'<meta[^>]+content=[\"\']([^\"\'>]+)[\"\'][^>]+(?:property|name)=[\"\']og:image', html)
        desc = re.search(r'<meta[^>]+(?:property|name)=[\"\']og:description[\"\'][^>]+content=[\"\']([^\"\'>]{10,300})', html)
        if not desc:
            desc = re.search(r'<meta[^>]+name=[\"\']description[\"\'][^>]+content=[\"\']([^\"\'>]{10,300})', html)
        return (img.group(1).strip() if img else ''), (desc.group(1).strip() if desc else '')
    except:
        return '', ''

ids = json.load(sys.stdin)[:15]
for id in ids:
    try:
        with urllib.request.urlopen(f'https://hacker-news.firebaseio.com/v0/item/{id}.json', timeout=3) as r:
            item = json.load(r)
        if item.get('type') == 'story' and item.get('url'):
            img, desc = fetch_og(item['url'])
            print(f\"### {item.get('title','')}\")           
            print(f\"**URL:** {item.get('url','')}\")         
            print(f\"**Score:** {item.get('score',0)} pts | **Comments:** {item.get('descendants',0)}\")  
            if img: print(f\"**Image:** {img}\")  
            if desc: print(f\"**Description:** {desc[:200]}\")  
            print()
    except:
        pass
" >> "$OUTPUT" 2>/dev/null

# arXiv CS papers recientes
echo "" >> "$OUTPUT"
echo "## arXiv --- Papers recientes (CS.AI + CS.LG)" >> "$OUTPUT"
echo "" >> "$OUTPUT"

# Save RSS to temp file to avoid shell interpretation issues with heredoc + XML content
ARXIV_TMP=$(mktemp /tmp/arxiv-rss-XXXXXX.xml)
curl -sL "https://rss.arxiv.org/rss/cs.AI" > "$ARXIV_TMP" 2>/dev/null

if grep -q "<item>" "$ARXIV_TMP" 2>/dev/null; then
  ARXIV_HAS_ITEMS=1
else
  ARXIV_HAS_ITEMS=0
fi

if [ "$ARXIV_HAS_ITEMS" -eq 0 ]; then
  echo "*(sin papers hoy --- arXiv no publica sabados ni domingos)*" >> "$OUTPUT"
else
  python3 - "$ARXIV_TMP" << 'PYEOF' >> "$OUTPUT" 2>/dev/null
import sys, re
with open(sys.argv[1]) as f:
    content = f.read()
items = re.findall(r'<item>(.*?)</item>', content, re.DOTALL)[:10]
for item in items:
    title = re.search(r'<title>(.*?)</title>', item)
    link = re.search(r'<link[^>]*>(.*?)</link>', item, re.DOTALL)
    desc = re.search(r'<description>(.*?)</description>', item, re.DOTALL)
    if title:
        t = re.sub(r'<[^>]+>', '', title.group(1)).strip()
        l = (re.sub(r'<[^>]+>', '', link.group(1)) if link else '').strip()
        d = re.sub(r'<[^>]+>', '', desc.group(1) if desc else '').strip()[:200]
        print(f'### {t}')
        if l: print(f'**URL:** {l}')
        if d: print(f'**Abstract:** {d}...')
        print()
PYEOF
fi
rm -f "$ARXIV_TMP"

echo "✅ Tech news ingesta: $OUTPUT"
