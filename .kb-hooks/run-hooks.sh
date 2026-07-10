#!/bin/bash
# KB Hook Runner — globant-kb
KB_DIR="$(cd "$(dirname "$0")/.." && pwd)"
EVENT="${1:-post-compile}"
OPENAI_API_KEY="${OPENAI_API_KEY:-$(python3 -c "import json; d=json.load(open('$HOME/.openclaw/openclaw.json')); print(d.get('env',{}).get('OPENAI_API_KEY',''))" 2>/dev/null)}"
export KB_DIR OPENAI_API_KEY

echo "🔗 Running KB hooks: $EVENT"

case "$EVENT" in
  post-compile|post-article-create|daily)
    python3 "$KB_DIR/.kb-hooks/04-studio-classifier.py" 2>&1 || true
    for hook in "$KB_DIR/.kb-hooks"/[0-9]*.py; do
      echo "▶ $(basename $hook)"
      OPENAI_API_KEY="$OPENAI_API_KEY" KB_DIR="$KB_DIR" python3 "$hook" "${@:2}" 2>&1
    done
    cd "$KB_DIR"
    git add raw/ontology/ viz/agent-skills/ wiki/ raw/studios/ 2>/dev/null
    CHANGED=$(git diff --cached --name-only 2>/dev/null | wc -l | tr -d ' ')
    if [ "$CHANGED" -gt 0 ]; then
      git commit -m "hooks: ontology + graph + agents — $CHANGED files [$(date +%H:%M)]" --no-verify 2>/dev/null
      echo "✅ Committed $CHANGED hook outputs"
    fi
    ;;
  *) echo "Unknown event: $EVENT" ;;
esac
echo "✅ Hooks complete"
