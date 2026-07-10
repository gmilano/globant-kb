#!/usr/bin/env python3
"""
Hook 02: Graph Connector
Usa las ontologías para conectar artículos relacionados con [[wikilinks]].
Detecta conceptos compartidos y actualiza los artículos para referenciarlos.
"""
import sys, os, json, re
from pathlib import Path
from collections import defaultdict

KB_ROOT = Path(__file__).parent.parent

def load_ontologies() -> dict:
    """Load all ontology files"""
    ont_dir = KB_ROOT / 'raw' / 'ontology'
    ontologies = {}
    for f in ont_dir.glob('*.json'):
        try:
            with open(f) as fp:
                data = json.load(fp)
            ontologies[f.stem] = data
        except:
            pass
    return ontologies

def find_article(slug: str) -> Path | None:
    """Find wiki article by slug"""
    for f in (KB_ROOT / 'wiki').rglob(f'{slug}.md'):
        return f
    return None

def add_wikilinks(article_path: Path, suggestions: list[str]) -> bool:
    """Add missing wikilinks to See Also section"""
    content = article_path.read_text()
    
    # Find existing wikilinks
    existing = set(re.findall(r'\[\[([^\]]+)\]\]', content))
    new_links = [s for s in suggestions if s not in existing and s != article_path.stem.replace('-', ' ')]
    
    if not new_links:
        return False
    
    # Add to See Also section or create it
    see_also = '\n'.join(f'- [[{link}]]' for link in new_links[:5])
    
    if '## Ver también' in content or '## See Also' in content:
        # Append to existing section
        content = re.sub(
            r'(## Ver también|## See Also)\n',
            f'\\1\n{see_also}\n',
            content, count=1
        )
    else:
        # Add section before the last section or at end
        content = content.rstrip() + f'\n\n## Ver también\n{see_also}\n'
    
    article_path.write_text(content)
    return True

def main():
    ontologies = load_ontologies()
    if not ontologies:
        print("No ontologies found. Run 01-ontology-builder.py first.")
        return
    
    # Build concept → articles index
    concept_index = defaultdict(set)  # concept → set of article slugs
    for slug, ont in ontologies.items():
        for concept in ont.get('concepts', []):
            concept_index[concept.lower()].add(slug)
        for entity in ont.get('entities', []):
            if isinstance(entity, dict):
                concept_index[entity['name'].lower()].add(slug)
            else:
                concept_index[str(entity).lower()].add(slug)
        for tag in ont.get('tags', []):
            concept_index[tag.lower()].add(slug)
    
    # For each article, find related articles via shared concepts
    connected = 0
    for slug, ont in ontologies.items():
        article = find_article(slug)
        if not article:
            continue
        
        # Find articles sharing concepts
        related = defaultdict(int)
        all_concepts = (
            [c.lower() for c in ont.get('concepts', [])] +
            [e['name'].lower() if isinstance(e, dict) else e.lower() for e in ont.get('entities', [])] +
            ont.get('tags', [])
        )
        
        for concept in all_concepts:
            for related_slug in concept_index.get(concept, set()):
                if related_slug != slug:
                    related[related_slug] += 1
        
        # Top 5 related articles
        top_related = sorted(related.items(), key=lambda x: x[1], reverse=True)[:5]
        suggestions = [slug.replace('-', ' ').title() for slug, _ in top_related if _ >= 2]
        
        if suggestions:
            modified = add_wikilinks(article, suggestions)
            if modified:
                print(f"  📎 {slug} → connected to: {', '.join(suggestions[:3])}")
                connected += 1
    
    print(f"✅ Connected {connected} articles")

if __name__ == '__main__':
    main()
