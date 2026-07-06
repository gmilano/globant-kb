# Repos fundacionales — Legal Services

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-06

## NLP y modelos para texto legal

| Repo | Licencia | Stars | Stack | ¿Base para AI? |
|------|----------|-------|-------|----------------|
| [Open-Source-Legal/OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | MIT | ~1.4k | Python, Django, GraphQL, React, MCP | Sí — DMS agéntico, citation graph, extraction, semantic search |
| [FudanDISC/DISC-LawLLM](https://github.com/FudanDISC/DISC-LawLLM) | Apache-2.0 | ~937 | Python, PyTorch, ChatGLM | Sí — LLM legal chino fine-tuned, arquitectura referencia |
| [ICLRandD/Blackstone](https://github.com/ICLRandD/Blackstone) | Apache-2.0 | ~691 | Python, spaCy | Sí — pipeline NER para texto legal en inglés (casenames, citations, legislation) |
| [LexPredict/lexpredict-lexnlp](https://github.com/LexPredict/lexpredict-lexnlp) | AGPL-3.0 | ~790 | Python, NLTK, scikit-learn | Sí — extracción de entidades, fechas, montos, partes desde contratos |
| [HazyResearch/legalbench](https://github.com/HazyResearch/legalbench) | MIT | ~600 | Python, HuggingFace | Sí — evaluación de LLMs en 90+ tareas legales (Stanford/Cornell) |
| [coastalcph/lex-glue](https://github.com/coastalcph/lex-glue) | MIT | ~400 | Python, HuggingFace | Sí — benchmark ECtHR, SCOTUS, EUR-LEX, CaseHOLD para clasificación |
| [maastrichtlawtech/awesome-legal-nlp](https://github.com/maastrichtlawtech/awesome-legal-nlp) | MIT | ~331 | Curated list | Referencia — datasets, modelos, papers de LegalNLP |
| [Legal-NLP-EkStep/legal_NER](https://github.com/Legal-NLP-EkStep/legal_NER) | Apache-2.0 | ~200 | Python, spaCy, HuggingFace | Sí — NER para texto judicial indio (OpenNyAI mission, acceso a justicia) |
| [felipemaiapolo/legalnlp](https://github.com/felipemaiapolo/legalnlp) | MIT | ~180 | Python | Sí — NLP para texto legal brasileño (LATAM relevante) |
| [CSHaitao/Awesome-LegalAI-Resources](https://github.com/CSHaitao/Awesome-LegalAI-Resources) | MIT | creciente | Curated list | Referencia — datos, modelos, benchmarks para sistemas de justicia inteligente |

---

## Frameworks multi-agente aplicables a legal

| Repo | Licencia | Stars | Caso de uso legal |
|------|----------|-------|-------------------|
| [AnttiHero/lavern](https://github.com/AnttiHero/lavern) | Apache-2.0 | ~267 | 67 agentes especializados con debate + human gates — modelo de "agentic law firm" |
| [willchen96/mike](https://github.com/willchen96/mike) | AGPL-3.0 | ~2.2k | Plataforma full-stack: research, drafting, review. API key propia, self-hosted. |
| [lowtidebuild/contract-review-agent](https://github.com/lowtidebuild/contract-review-agent) | Apache-2.0 | ~40 | Agente local-first de revisión contractual |

---

## Datasets de referencia para fine-tuning y evaluación

| Dataset | Licencia | Descripción | Dónde obtener |
|---------|----------|-------------|----------------|
| CUAD | CC-BY-4.0 | 510 contratos, 41 categorías de cláusulas legales anotadas | HuggingFace: `alvanlii/contract-understanding-atticus-dataset` |
| LEDGAR | CC-BY | 100k+ cláusulas contractuales SEC EDGAR, 100 tipos | HuggingFace: `rcavi/LEDGAR` |
| EUR-LEX | CC-BY | Legislación EU multilingüe | HuggingFace: `coastalcph/lex_glue` |
| CaseHOLD | CC-BY | 53k+ citas de US Federal Courts para QA de precedentes | HuggingFace: `coastalcph/lex_glue` |
| UNFAIR-ToS | CC-BY | Términos de servicio con cláusulas injustas anotadas | HuggingFace: `coastalcph/lex_glue` |

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
