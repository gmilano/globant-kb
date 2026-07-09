#!/bin/bash
# Globant KB Ingest — wrapper de pipeline
# Usage: ./run.sh gaming
#        ./run.sh --all
#        ./run.sh gaming --dry

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ -z "$GITHUB_TOKEN" ]; then
  echo "⚠ GITHUB_TOKEN no seteado — requests sin auth (60/hora limit)"
  echo "  Setear: export GITHUB_TOKEN=ghp_..."
fi

node "$SCRIPT_DIR/pipeline.js" "$@"
