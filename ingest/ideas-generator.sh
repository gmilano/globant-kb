#!/bin/bash
# Generador de ideas diarias — Globant Intelligence
KB_DIR="$(cd "$(dirname "$0")/.." && pwd)"
VIZ_DIR="$KB_DIR/viz/ideas"
mkdir -p "$VIZ_DIR"
DATE=$(date +%Y-%m-%d)
OUTPUT="$VIZ_DIR/ideas-$DATE.md"
[ -f "$OUTPUT" ] && echo "Ya existe: $OUTPUT" && exit 0

RECENT_NEWS=$(ls -t "$KB_DIR/raw/research/news/"*.md 2>/dev/null | head -2 | xargs cat 2>/dev/null | head -100)
RECENT_TRENDING=$(ls -t "$KB_DIR/raw/research/trending/"*.md 2>/dev/null | head -1 | xargs cat 2>/dev/null | head -80)
RECENT_REDDIT=$(ls -t "$KB_DIR/raw/research/community/"*.md 2>/dev/null | head -1 | xargs cat 2>/dev/null | head -80)

claude --dangerously-skip-permissions -p "
Sos el generador de ideas de Gastón Milano para el sector: Globant Intelligence.

## Dominio
Globant como empresa: estrategia competitiva frente a Accenture/Cognizant/EPAM, crecimiento en LatAm, adquisiciones, diferenciadores tecnológicos y oportunidades de mercado

## Trending
$RECENT_TRENDING

## Noticias
$RECENT_NEWS

## Comunidad Reddit
$RECENT_REDDIT

## Tu tarea
Generá exactamente 5 ideas accionables para hoy en Globant Intelligence + AI.
Cada idea debe ser específica al sector, implementable con LLMs actuales, y con potencial comercial.

### Idea N: [Título]
**Concepto:** qué es (1-2 oraciones)
**Por qué ahora:** conexión con el momento del sector
**Cómo implementar:** 3 pasos concretos con AI
**Impacto esperado:** qué mejora
" > "$OUTPUT" 2>&1

if [ -s "$OUTPUT" ]; then
  COUNT=$(grep -c "^### Idea" "$OUTPUT" 2>/dev/null || echo "5")
  echo "✅ $COUNT ideas generadas para Globant Intelligence → $OUTPUT"
  openclaw system event --text "💡 $COUNT ideas nuevas para Globant Intelligence" --mode now 2>/dev/null || true
else
  echo "⚠️  Sin contexto — corré 'make ingest' primero"
fi
