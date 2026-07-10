#!/usr/bin/env python3
"""
Hook 04: Studio Classifier
Clasifica papers y artículos de research hacia los Studios de Wany relevantes.
Crea symlinks/referencias en raw/studios/{studio-name}/ para cada artículo relevante.

Studios de Wany:
- legal-studio: legal tech, contratos, compliance, normativa, jurisprudencia
- financial-studio: fintech, mercados, trading, análisis financiero, forecasting
- healthcare-studio: salud, medicina, diagnóstico, clinical notes
- media-studio: contenido, generación de video/audio/imagen, branding
- retail-studio: e-commerce, inventory, customer support, supply chain
- travel-studio: hospitality, concierge, reservas, turismo
- tech-studio: engineering, coding agents, software development, devtools
- research-studio: papers académicos, AI research, benchmarks, modelos
"""
import sys, os, json, re, urllib.request
from pathlib import Path
from datetime import datetime

KB_ROOT = Path(__file__).parent.parent
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY', '')

STUDIOS = {
    'legal-studio': {
        'name': 'Legal Studio',
        'emoji': '⚖️',
        'keywords': ['legal', 'contract', 'compliance', 'regulation', 'law', 'attorney', 'court', 
                     'jurisdiction', 'clause', 'normativa', 'juridico', 'contrato', 'LATAM'],
        'description': 'Legal tech, contratos, compliance y normativa LATAM'
    },
    'financial-studio': {
        'name': 'Financial Studio', 
        'emoji': '📈',
        'keywords': ['finance', 'trading', 'market', 'investment', 'portfolio', 'fintech', 
                     'forecasting', 'stock', 'crypto', 'banking', 'financial', 'economic',
                     'mercado', 'inversion', 'bolsa', 'hedge fund', 'quant'],
        'description': 'Fintech, mercados, trading y análisis financiero'
    },
    'healthcare-studio': {
        'name': 'Healthcare Studio',
        'emoji': '🏥',
        'keywords': ['health', 'medical', 'clinical', 'patient', 'diagnosis', 'treatment',
                     'hospital', 'drug', 'biomedical', 'healthcare', 'doctor', 'EHR',
                     'salud', 'medico', 'clinico', 'diagnostico'],
        'description': 'Salud, medicina, diagnóstico clínico'
    },
    'media-studio': {
        'name': 'Media Studio',
        'emoji': '🎬',
        'keywords': ['video', 'audio', 'image', 'content', 'media', 'generation', 'creative',
                     'diffusion', 'synthesis', 'music', 'voice', 'text-to-', 'multimodal',
                     'video generation', 'image generation', 'TTS', 'speech'],
        'description': 'Generación de contenido multimedia, video, audio, imagen'
    },
    'retail-studio': {
        'name': 'Retail Studio',
        'emoji': '🛒',
        'keywords': ['retail', 'ecommerce', 'inventory', 'supply chain', 'customer support',
                     'recommendation', 'product', 'shop', 'commerce', 'logistics',
                     'demand forecasting', 'pricing'],
        'description': 'E-commerce, inventory, supply chain y customer support'
    },
    'travel-studio': {
        'name': 'Travel Studio',
        'emoji': '✈️',
        'keywords': ['travel', 'hotel', 'booking', 'hospitality', 'tourism', 'concierge',
                     'reservation', 'airline', 'trip', 'itinerary', 'accommodation'],
        'description': 'Hospitality, concierge, reservas y turismo'
    },
    'tech-studio': {
        'name': 'Tech Studio',
        'emoji': '💻',
        'keywords': ['coding', 'software', 'developer', 'engineering', 'code generation',
                     'programming', 'devtools', 'IDE', 'testing', 'debugging', 'CI/CD',
                     'agent', 'harness', 'benchmark', 'LLM', 'transformer'],
        'description': 'Engineering, coding agents, software development'
    },
    'research-studio': {
        'name': 'Research Studio',
        'emoji': '🔬',
        'keywords': ['paper', 'arxiv', 'research', 'study', 'experiment', 'dataset', 
                     'model', 'training', 'evaluation', 'benchmark', 'sota', 'neural',
                     'knowledge', 'reasoning', 'alignment', 'safety'],
        'description': 'Papers académicos, AI research, benchmarks y modelos'
    }
}

def keyword_classify(content: str, title: str) -> list[str]:
    """Fast keyword-based classification"""
    text = (title + ' ' + content[:2000]).lower()
    matches = []
    for studio_id, studio in STUDIOS.items():
        score = sum(1 for kw in studio['keywords'] if kw.lower() in text)
        if score >= 2:
            matches.append((studio_id, score))
    return [s for s, _ in sorted(matches, key=lambda x: -x[1])]

def llm_classify(content: str, title: str) -> list[str]:
    """LLM-based classification for ambiguous cases"""
    if not OPENAI_API_KEY:
        return []
    
    studio_list = '\n'.join([f"- {sid}: {s['description']}" for sid, s in STUDIOS.items()])
    
    payload = json.dumps({
        "model": "gpt-4o-mini",
        "messages": [{
            "role": "user",
            "content": f"""Clasificá este artículo en los Studios de Wany relevantes.

ARTÍCULO:
Título: {title}
Contenido: {content[:1000]}

STUDIOS DISPONIBLES:
{studio_list}

Devolvé SOLO un JSON: {{"studios": ["studio-id-1", "studio-id-2"]}}
Máximo 3 studios. Solo los MUY relevantes. Si no aplica a ninguno, devolvé {{"studios": []}}"""
        }],
        "max_tokens": 100,
        "temperature": 0
    }).encode()
    
    req = urllib.request.Request(
        'https://api.openai.com/v1/chat/completions',
        data=payload,
        headers={'Authorization': f'Bearer {OPENAI_API_KEY}', 'Content-Type': 'application/json'}
    )
    with urllib.request.urlopen(req, timeout=15) as r:
        result = json.load(r)
    
    raw = result['choices'][0]['message']['content'].strip()
    raw = re.sub(r'^```json\s*', '', raw).rstrip('```')
    data = json.loads(raw)
    return [s for s in data.get('studios', []) if s in STUDIOS]

def classify_article(article_path: Path) -> list[str]:
    """Classify article into relevant studios"""
    content = article_path.read_text()
    title = article_path.stem.replace('-', ' ').title()
    
    # Extract title from frontmatter
    title_match = re.search(r'^# (.+)$', content, re.MULTILINE)
    if title_match:
        title = title_match.group(1)
    
    # Fast keyword check first
    keyword_studios = keyword_classify(content, title)
    
    # If ambiguous or no clear match, use LLM
    if not keyword_studios and OPENAI_API_KEY:
        return llm_classify(content, title)
    
    return keyword_studios[:3]  # max 3 studios

def create_studio_reference(article_path: Path, studio_id: str) -> Path:
    """Create a reference file in the studio directory"""
    studio_dir = KB_ROOT / 'raw' / 'studios' / studio_id
    studio_dir.mkdir(parents=True, exist_ok=True)
    
    ref_path = studio_dir / article_path.name
    
    # Read original content
    original = article_path.read_text()
    
    # Add studio tag to frontmatter
    if '---' in original[:50]:
        # Has frontmatter - add studio
        original = original.replace('---\n', f'---\nstudio: {studio_id}\n', 1)
    
    # Create reference file (soft copy with studio tag)
    if not ref_path.exists():
        ref_path.write_text(original)
    
    return ref_path

def update_studio_index(studio_id: str, articles: list[Path]):
    """Update the studio index markdown"""
    studio_dir = KB_ROOT / 'raw' / 'studios' / studio_id
    studio = STUDIOS[studio_id]
    
    index_path = studio_dir / 'INDEX.md'
    
    all_refs = list(studio_dir.glob('*.md'))
    all_refs = [f for f in all_refs if f.name != 'INDEX.md']
    
    lines = [
        f"# {studio['emoji']} {studio['name']} — Knowledge Base",
        f"\n_{studio['description']}_\n",
        f"**{len(all_refs)} artículos relevantes**\n",
        f"_Actualizado: {datetime.utcnow().strftime('%Y-%m-%d')}_\n",
        "\n## Artículos\n"
    ]
    
    for ref in sorted(all_refs, key=lambda f: f.stat().st_mtime, reverse=True):
        title = ref.stem.replace('-', ' ').title()
        content = ref.read_text()
        title_match = re.search(r'^# (.+)$', content, re.MULTILINE)
        if title_match:
            title = title_match.group(1)
        lines.append(f"- [[{title}]] — `{ref.name}`")
    
    index_path.write_text('\n'.join(lines))

def main():
    # Get articles to classify
    if len(sys.argv) > 1:
        articles = [Path(a) for a in sys.argv[1:] if Path(a).exists()]
    else:
        # Process recently added research articles
        search_dirs = [
            KB_ROOT / 'raw' / 'research' / 'papers',
            KB_ROOT / 'wiki' / 'concepts',
            KB_ROOT / 'wiki' / 'research',
            KB_ROOT / 'wiki' / 'tools',
        ]
        articles = []
        for d in search_dirs:
            if d.exists():
                articles.extend(sorted(d.glob('*.md'), key=lambda f: f.stat().st_mtime, reverse=True)[:10])
    
    classified = {}  # studio_id → list of articles
    
    for article in articles[:20]:  # max 20 per run
        studios = classify_article(article)
        if studios:
            title = article.stem.replace('-', ' ').title()
            print(f"  📄 {title} → {', '.join(studios)}")
            
            for studio_id in studios:
                create_studio_reference(article, studio_id)
                classified.setdefault(studio_id, []).append(article)
    
    # Update indexes
    for studio_id, articles in classified.items():
        update_studio_index(studio_id, articles)
        print(f"  📁 {STUDIOS[studio_id]['emoji']} {studio_id}: {len(articles)} artículos referenciados")
    
    total = sum(len(v) for v in classified.values())
    print(f"\n✅ Clasificados {total} artículos en {len(classified)} studios")

if __name__ == '__main__':
    main()
