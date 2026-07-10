#!/bin/bash
# Ingest completo — globant-kb
KB_DIR="$(cd "$(dirname "$0")/.." && pwd)"
echo "🔄 Iniciando ingest: globant-kb (Globant Intelligence)"
bash "$KB_DIR/ingest/reddit.sh"      2>&1 | tail -4
bash "$KB_DIR/ingest/tech-news.sh"   2>&1 | tail -2
bash "$KB_DIR/ingest/trending.sh"    2>&1 | tail -2
bash "$KB_DIR/ingest/rss.sh"         2>&1 | tail -2
bash "$KB_DIR/ingest/ideas-generator.sh" 2>&1 | tail -3
bash "$KB_DIR/.kb-hooks/run-hooks.sh" daily 2>&1
echo "✅ globant-kb ingest completo"
