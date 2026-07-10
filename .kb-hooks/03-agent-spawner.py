#!/usr/bin/env python3
"""
Hook 03: Agent Spawner
Cuando la ontología de un dominio es suficientemente rica (>5 artículos, >20 entidades),
genera automáticamente un skill de agente especializado en ese dominio.
"""
import sys, os, json, re, urllib.request
from pathlib import Path
from collections import defaultdict, Counter
from datetime import datetime

KB_ROOT = Path(__file__).parent.parent
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY', '')

SKILLS_DIR = KB_ROOT / 'viz' / 'agent-skills'
MIN_ARTICLES = 2  # minimum articles in domain to spawn agent
MIN_ENTITIES = 3  # minimum entities across domain

def load_ontologies_by_domain() -> dict:
    """Group ontologies by domain"""
    ont_dir = KB_ROOT / 'raw' / 'ontology'
    domains = defaultdict(list)
    
    for f in ont_dir.glob('*.json'):
        try:
            with open(f) as fp:
                data = json.load(fp)
            domain = data.get('domain', 'other')
            data['_slug'] = f.stem
            domains[domain].append(data)
        except:
            pass
    return dict(domains)

def should_spawn_agent(domain: str, articles: list) -> bool:
    """Check if domain is rich enough for an agent"""
    if len(articles) < MIN_ARTICLES:
        return False
    
    total_entities = sum(len(a.get('entities', [])) for a in articles)
    if total_entities < MIN_ENTITIES:
        return False
    
    # Check if agent skill already exists
    skill_path = SKILLS_DIR / f"agent-{domain}.md"
    if skill_path.exists():
        # Only regenerate if articles grew significantly
        existing = skill_path.read_text()
        article_count = existing.count('- [[')
        if article_count >= len(articles) - 1:
            return False
    
    return True

def generate_agent_skill(domain: str, articles: list) -> str:
    """Generate agent skill markdown from domain ontology"""
    # Collect all knowledge
    all_concepts = []
    all_entities = []
    all_relations = []
    article_names = []
    
    for a in articles:
        all_concepts.extend(a.get('concepts', []))
        all_entities.extend(a.get('entities', []) if isinstance(a.get('entities', [{}])[0], dict) 
                            else [{'name': e, 'type': 'concept'} for e in a.get('entities', [])])
        all_relations.extend(a.get('relations', []))
        article_names.append(a.get('_slug', '').replace('-', ' '))
    
    # Deduplicate
    unique_concepts = list(dict.fromkeys(all_concepts))[:20]
    entity_counts = Counter(e['name'] if isinstance(e, dict) else e for e in all_entities)
    key_entities = [name for name, _ in entity_counts.most_common(15)]
    
    domain_names = {
        'ai-agents': 'AI Agents', 'search': 'Search & Retrieval',
        'devtools': 'Developer Tools', 'enterprise': 'Enterprise AI',
        'research': 'AI Research', 'other': 'General Knowledge'
    }
    domain_name = domain_names.get(domain, domain.replace('-', ' ').title())
    
    if OPENAI_API_KEY:
        # Generate with LLM
        prompt = f"""Genera un skill de agente especializado en "{domain_name}" para una Knowledge Base.

Dominio: {domain_name}
Artículos disponibles: {', '.join(article_names[:10])}
Conceptos clave: {', '.join(unique_concepts[:10])}
Entidades importantes: {', '.join(key_entities[:10])}

El skill debe:
1. Describir el dominio de especialización
2. Listar las herramientas/commands que puede usar
3. Definir casos de uso específicos
4. Explicar cómo usar la KB para responder preguntas
5. Dar ejemplos de prompts para activar el agente

Formato: markdown limpio, máximo 500 palabras, orientado a práctica."""

        payload = json.dumps({
            "model": "gpt-4o-mini",
            "messages": [
                {"role": "system", "content": "Eres un experto en diseño de agentes AI. Generas skills concisos y accionables."},
                {"role": "user", "content": prompt}
            ],
            "max_tokens": 800
        }).encode()
        
        req = urllib.request.Request(
            'https://api.openai.com/v1/chat/completions',
            data=payload,
            headers={'Authorization': f'Bearer {OPENAI_API_KEY}', 'Content-Type': 'application/json'}
        )
        with urllib.request.urlopen(req, timeout=30) as r:
            result = json.load(r)
        skill_content = result['choices'][0]['message']['content']
    else:
        # Fallback template
        skill_content = f"""## Especialización: {domain_name}

Este agente tiene conocimiento profundo sobre {domain_name} basado en {len(articles)} artículos de la KB.

### Conceptos clave
{chr(10).join(f'- {c}' for c in unique_concepts[:8])}

### Artículos de referencia
{chr(10).join(f'- [[{a}]]' for a in article_names[:8])}

### Casos de uso
- Responder preguntas técnicas sobre {domain_name}
- Conectar conceptos relacionados
- Sugerir implementaciones basadas en el conocimiento disponible
"""
    
    return f"""---
type: agent-skill
domain: {domain}
articles: {len(articles)}
entities: {len(key_entities)}
generated: {datetime.utcnow().strftime('%Y-%m-%d')}
---

# Agente Especializado: {domain_name}

{skill_content}

## Artículos de la KB
{chr(10).join(f'- [[{a}]]' for a in article_names[:12])}
"""

def main():
    SKILLS_DIR.mkdir(parents=True, exist_ok=True)
    
    domains = load_ontologies_by_domain()
    spawned = 0
    
    for domain, articles in domains.items():
        if domain == 'other' or len(articles) < 2:
            continue
        
        if should_spawn_agent(domain, articles):
            print(f"🤖 Spawning agent for domain: {domain} ({len(articles)} articles)...")
            try:
                skill = generate_agent_skill(domain, articles)
                skill_path = SKILLS_DIR / f"agent-{domain}.md"
                skill_path.write_text(skill)
                print(f"  ✅ Saved: {skill_path.relative_to(KB_ROOT)}")
                spawned += 1
            except Exception as e:
                print(f"  ❌ Error: {e}")
    
    if spawned:
        print(f"\n🎉 Spawned {spawned} new agent skills in viz/agent-skills/")
    else:
        print("No new agents needed yet (domains not rich enough)")

if __name__ == '__main__':
    main()
