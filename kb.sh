#!/bin/bash
# Wany KB — Karpathy-style Knowledge Base
# Uso: ./kb.sh [ingest|compile|health|query|search|serve]

KB_DIR="$(dirname "$0")"
RAW_DIR="$KB_DIR/raw"
WIKI_DIR="$KB_DIR/wiki"
VIZ_DIR="$KB_DIR/viz"
ACTION="${1:-help}"
OPENAI_API_KEY="${OPENAI_API_KEY:-$(python3 -c "import json; print(json.load(open('$HOME/.openclaw/openclaw.json')).get('env',{}).get('OPENAI_API_KEY',''))" 2>/dev/null)}"

# ── INGEST ──────────────────────────────────────────────────────────────────
ingest() {
  SOURCE="$1"
  if [ -z "$SOURCE" ]; then echo "Uso: ./kb.sh ingest <url|archivo>"; exit 1; fi

  if [[ "$SOURCE" == http* ]]; then
    # URL → descarga como markdown
    echo "📥 Descargando: $SOURCE"
    FILENAME=$(echo "$SOURCE" | md5 | cut -c1-8)
    TITLE=$(curl -sL "$SOURCE" | python3 -c "
import sys
from html.parser import HTMLParser
class TitleParser(HTMLParser):
    title = ''; in_title = False
    def handle_starttag(self, t, a):
        if t == 'title': self.in_title = True
    def handle_endtag(self, t):
        if t == 'title': self.in_title = False
    def handle_data(self, d):
        if self.in_title: self.title += d
p = TitleParser(); p.feed(sys.stdin.read()); print(p.title.strip()[:60] or 'article')
" 2>/dev/null || echo "article")
    
    SAFE_TITLE=$(echo "$TITLE" | tr ' ' '_' | tr -dc '[:alnum:]_-' | cut -c1-50)
    OUTPUT="$RAW_DIR/articles/${SAFE_TITLE}_${FILENAME}.md"
    
    # Convertir URL a markdown con pandoc o fallback a text
    curl -sL "$SOURCE" | pandoc -f html -t markdown --wrap=none 2>/dev/null > "$OUTPUT" || \
      curl -sL "$SOURCE" | python3 -c "
import sys, re
content = sys.stdin.read()
# Remove scripts and styles
content = re.sub(r'<script[^>]*>.*?</script>', '', content, flags=re.DOTALL)
content = re.sub(r'<style[^>]*>.*?</style>', '', content, flags=re.DOTALL)
content = re.sub(r'<[^>]+>', ' ', content)
content = re.sub(r'\s+', ' ', content).strip()
print(content)
" > "$OUTPUT"
    
    # Agregar metadata
    TEMP=$(mktemp)
    echo "---
source: $SOURCE
ingested: $(date -u +%Y-%m-%dT%H:%M:%SZ)
compiled: false
---

" > "$TEMP"
    cat "$OUTPUT" >> "$TEMP"
    mv "$TEMP" "$OUTPUT"
    
    echo "✅ Guardado: $OUTPUT"
    
  else
    # Archivo local → copiar a raw/
    cp "$SOURCE" "$RAW_DIR/articles/"
    echo "✅ Copiado a raw/articles/"
  fi
  
  echo "💡 Corré './kb.sh compile' para actualizar el wiki"
}

# ── COMPILE ─────────────────────────────────────────────────────────────────
compile() {
  echo "🔨 Compilando wiki desde raw/ (via Vercel AI SDK + Anthropic)..."

  RAW_COUNT=$(find "$RAW_DIR" -type f -name "*.md" | wc -l | tr -d ' ')
  WIKI_COUNT=$(find "$WIKI_DIR" -type f -name "*.md" | wc -l | tr -d ' ')
  echo "Fuentes: $RAW_COUNT | Artículos wiki actuales: $WIKI_COUNT"

  # ANTHROPIC_API_KEY: env override → openclaw.json fallback
  if [ -z "$ANTHROPIC_API_KEY" ]; then
    ANTHROPIC_API_KEY=$(python3 -c "import json; print(json.load(open('$HOME/.openclaw/openclaw.json')).get('env',{}).get('ANTHROPIC_API_KEY',''))" 2>/dev/null)
  fi

  if [ -z "$ANTHROPIC_API_KEY" ]; then
    echo "❌ ANTHROPIC_API_KEY no definido."
    echo "   Exportalo (export ANTHROPIC_API_KEY=...) o agregalo a ~/.openclaw/openclaw.json → env.ANTHROPIC_API_KEY"
    return 1
  fi

  ANTHROPIC_API_KEY="$ANTHROPIC_API_KEY" \
  RAW_DIR="$RAW_DIR" WIKI_DIR="$WIKI_DIR" \
  KB_PACK_MAX_FILES="${KB_PACK_MAX_FILES:-20}" \
    node "$KB_DIR/viewer/services/pack-cli.js"
}

# ── HEALTH ──────────────────────────────────────────────────────────────────
health() {
  echo "🏥 Health check del wiki..."
  REPORT="$VIZ_DIR/health-$(date +%Y-%m-%d).md"
  
  claude --dangerously-skip-permissions -p "
Eres el curador de la Knowledge Base de Wany.

Wiki location: $WIKI_DIR

Corre un health check completo:

1. **Inconsistencias** — datos contradictorios entre artículos
2. **Backlinks rotos** — [[links]] que apuntan a artículos inexistentes  
3. **Gaps** — conceptos importantes mencionados sin artículo propio
4. **Sugerencias** — 5 nuevos artículos que agregarían valor
5. **Conexiones ocultas** — relaciones entre artículos no explicitadas aún

Guarda el reporte completo en: $REPORT
Muestra un resumen aquí.
" 2>&1
  
  echo "Reporte guardado en: $REPORT"
}

# ── QUERY ────────────────────────────────────────────────────────────────────
query() {
  QUESTION="$*"
  if [ -z "$QUESTION" ]; then echo "Uso: ./kb.sh query 'tu pregunta'"; exit 1; fi
  
  TIMESTAMP=$(date +%Y%m%d-%H%M)
  OUTPUT="$VIZ_DIR/query-$TIMESTAMP.md"
  
  # Construir índice rápido para orientar al agente
  INDEX=$(cat "$WIKI_DIR/INDEX.md" 2>/dev/null || echo "Wiki vacío")
  
  claude --dangerously-skip-permissions -p "
Eres el asistente de la Knowledge Base de Wany.

## Pregunta
$QUESTION

## Índice del Wiki
$INDEX

## Instrucciones
1. Lee el INDEX.md para identificar artículos relevantes
2. Lee los artículos del wiki/ que sean pertinentes
3. Si necesitás más detalle, consulta raw/
4. Responde con fundamento, citando las fuentes

Guarda la respuesta en: $OUTPUT
(formato markdown, con secciones claras, backlinks a artículos relacionados)

También muestra la respuesta aquí.
" 2>&1
  
  echo ""
  echo "💾 Respuesta guardada en: $OUTPUT"
  echo "💡 Para enriquecer el wiki: './kb.sh file-back $OUTPUT'"
}

# ── FILE BACK ────────────────────────────────────────────────────────────────
file_back() {
  # Archiva un output de vuelta al wiki para enriquecerlo
  FILE="$1"
  if [ -z "$FILE" ]; then echo "Uso: ./kb.sh file-back <archivo>"; exit 1; fi
  
  claude --dangerously-skip-permissions -p "
El siguiente output de query es valioso para enriquecer el wiki.
Analiza el archivo: $FILE
Determina qué artículos del wiki actualizar con este nuevo conocimiento.
Actualiza los artículos correspondientes en $WIKI_DIR/
Actualiza el INDEX.md si se crearon artículos nuevos.
" 2>&1
}

# ── SEARCH ───────────────────────────────────────────────────────────────────
search() {
  QUERY="$*"
  if [ -z "$QUERY" ]; then echo "Uso: ./kb.sh search <término>"; exit 1; fi
  
  echo "🔍 Buscando: $QUERY"
  echo "---"
  
  # Búsqueda simple con grep primero
  grep -rn --include="*.md" -i "$QUERY" "$WIKI_DIR" 2>/dev/null | \
    sed 's|'"$WIKI_DIR/"'||' | \
    head -20
}

# ── SERVE ────────────────────────────────────────────────────────────────────
serve() {
  # Abre Obsidian con el vault
  echo "📖 Abriendo en Obsidian..."
  open "obsidian://open?vault=wany-kb&path=wiki/INDEX.md" 2>/dev/null || \
    open "$KB_DIR" 2>/dev/null
}

# ── HELP ─────────────────────────────────────────────────────────────────────
help() {
  cat << 'HELP'
Wany KB — Karpathy-style Knowledge Base

Comandos:
  ingest <url|file>    Ingesta una fuente al raw/
  compile              Compila raw/ → wiki/ usando Claude
  health               Health check del wiki (inconsistencias, gaps)
  query <pregunta>     Q&A contra el wiki
  file-back <archivo>  Archiva un output de query de vuelta al wiki
  search <término>     Búsqueda rápida en el wiki
  serve                Abre en Obsidian

Workflow típico:
  ./kb.sh ingest https://arxiv.org/abs/2512.13564
  ./kb.sh compile
  ./kb.sh query "¿Qué dice el paper sobre memoria agéntica?"
  ./kb.sh health
HELP
}

# ── DISPATCH ─────────────────────────────────────────────────────────────────
case "$ACTION" in
  ingest) ingest "$2" ;;
  compile)
    compile
    # Auto-commit changes after compile
    cd "$KB_DIR"
    if git -C "$KB_DIR" diff --cached --name-only 2>/dev/null | grep -q "." || git -C "$KB_DIR" status --porcelain 2>/dev/null | grep -q "^[AM]"; then
      git -C "$KB_DIR" add wiki/ raw/ viz/ 2>/dev/null
      CHANGED=$(git -C "$KB_DIR" diff --cached --name-only 2>/dev/null | wc -l | tr -d ' ')
      if [ "$CHANGED" -gt 0 ]; then
        git -C "$KB_DIR" commit -m "kb: auto-compile — ${CHANGED} files updated $(date +%Y-%m-%d)" 2>/dev/null && echo "✅ Auto-committed ${CHANGED} changes"
      fi
    fi
    
    # Run post-compile hooks (ontology, graph, agents) in background
    OPENAI_API_KEY="$OPENAI_API_KEY" KB_DIR="$KB_DIR" bash "$KB_DIR/.kb-hooks/run-hooks.sh" post-compile >/tmp/kb-hooks.log 2>&1 &
    echo "🔗 KB hooks running in background (log: /tmp/kb-hooks.log)"
    ;;
  analyze)
    REPO_URL="$2"
    DAYS="${3:-2}"
    if [ -z "$REPO_URL" ]; then echo "Uso: ./kb.sh analyze <github_url> [days]"; exit 1; fi
    OPENAI_API_KEY="$OPENAI_API_KEY" python3 "$KB_DIR/ingest/analyze-repo.py" "$REPO_URL" --days "$DAYS"
    ;;
  health) health ;;
  query) shift; query "$@" ;;
  file-back) file_back "$2" ;;
  search) shift; search "$@" ;;
  serve) serve ;;
  *) help ;;
esac
