#!/usr/bin/env python3
"""
Hook 01: Ontology Builder
Extrae conceptos, relaciones y tipos de cada artículo nuevo/modificado.
Crea/actualiza raw/ontology/{article-slug}.json
"""
import sys, os, json, re, urllib.request
from pathlib import Path
from datetime import datetime

KB_ROOT = Path(__file__).parent.parent
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY', '')

def extract_ontology(article_path: Path) -> dict:
    """Extract structured ontology from an article"""
    content = article_path.read_text()
    if not content.strip() or len(content) < 100:
        return {}
    
    if not OPENAI_API_KEY:
        # Fallback: basic extraction from headers and bold text
        concepts = re.findall(r'^## (.+)$', content, re.MULTILINE)
        entities = re.findall(r'\*\*([^*]+)\*\*', content)
        wikilinks = re.findall(r'\[\[([^\]]+)\]\]', content)
        return {
            'concepts': concepts[:10],
            'entities': list(set(entities))[:15],
            'related': wikilinks[:10],
            'method': 'regex'
        }
    
    # LLM extraction
    prompt = f"""Analiza este artículo de una Knowledge Base y extrae su ontología estructurada.

ARTÍCULO:
{content[:2000]}

Devuelve SOLO un JSON válido con esta estructura:
{{
  "concepts": ["concepto principal", "concepto2"],
  "entities": [
    {{"name": "nombre", "type": "tool|person|org|concept|pattern", "description": "1 línea"}}
  ],
  "relations": [
    {{"from": "concepto A", "relation": "uses|implements|extends|competes|enables", "to": "concepto B"}}
  ],
  "domain": "ai-agents|search|devtools|enterprise|research|other",
  "maturity": "experimental|stable|production",
  "tags": ["tag1", "tag2"]
}}"""

    payload = json.dumps({
        "model": "gpt-4o-mini",
        "messages": [
            {"role": "system", "content": "Eres un experto en ontologías. Devuelves SOLO JSON válido, sin markdown."},
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 600,
        "temperature": 0.1
    }).encode()
    
    req = urllib.request.Request(
        'https://api.openai.com/v1/chat/completions',
        data=payload,
        headers={'Authorization': f'Bearer {OPENAI_API_KEY}', 'Content-Type': 'application/json'}
    )
    
    with urllib.request.urlopen(req, timeout=30) as r:
        result = json.load(r)
    
    raw = result['choices'][0]['message']['content'].strip()
    # Strip markdown if present
    raw = re.sub(r'^```json\s*', '', raw)
    raw = re.sub(r'^```\s*', '', raw)
    raw = re.sub(r'```\s*$', '', raw)
    
    ontology = json.loads(raw)
    ontology['method'] = 'llm'
    ontology['source'] = str(article_path.relative_to(KB_ROOT))
    ontology['updated'] = datetime.utcnow().isoformat()
    return ontology

def main():
    # Get articles to process
    if len(sys.argv) > 1:
        articles = [Path(a) for a in sys.argv[1:] if Path(a).exists()]
    else:
        # Process recently modified wiki articles
        articles = sorted((KB_ROOT / 'wiki').rglob('*.md'), key=lambda p: p.stat().st_mtime, reverse=True)[:5]
    
    ont_dir = KB_ROOT / 'raw' / 'ontology'
    ont_dir.mkdir(parents=True, exist_ok=True)
    
    for article in articles:
        slug = article.stem
        ont_path = ont_dir / f"{slug}.json"
        
        # Skip if recently updated (< 1h)
        if ont_path.exists() and (ont_path.stat().st_mtime > article.stat().st_mtime):
            continue
        
        print(f"Building ontology: {article.name}...")
        try:
            ontology = extract_ontology(article)
            if ontology:
                with open(ont_path, 'w') as f:
                    json.dump(ontology, f, indent=2, ensure_ascii=False)
                print(f"  ✅ {len(ontology.get('entities', []))} entities, {len(ontology.get('relations', []))} relations")
        except Exception as e:
            print(f"  ❌ Error: {e}")

if __name__ == '__main__':
    main()
