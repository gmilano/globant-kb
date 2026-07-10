# Repos fundacionales — Legal Services

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-10 (v8)

## Plataformas y frameworks base

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|--------------|
| [freelawproject/courtlistener](https://github.com/freelawproject/courtlistener) | Apache-2.0 | 3.8k | Free Law Project: 250M+ páginas jurisprudencia US; PACER/RECAP; redes de citas; argumentos orales; MCP server nativo (May 2026); API pública gratuita | Sí — corpus legal masivo + MCP |
| [HazyResearch/legalbench](https://github.com/HazyResearch/legalbench) | MIT | 1.1k | Benchmark colaborativo Stanford: 162 tareas razonamiento legal inglés (IRAC, statutory interpretation, contract analysis); estándar evaluación LLMs legales | Sí — eval suite para cualquier LLM legal |
| [ICLRandD/Blackstone](https://github.com/ICLRandD/Blackstone) | Apache-2.0 | 691 | Pipeline spaCy para NLP en texto legal no estructurado inglés; NER entidades legales, clasificación sentencias, tokenización forense; pre-LLM pero se sigue vendoreando | Sí — componente NER/NLP sobre documentos |
| [FudanDISC/DISC-LawLLM](https://github.com/FudanDISC/DISC-LawLLM) | Apache-2.0 | 937 | LLM legal chino (Fudan + Inspur + CUPL); fine-tuning sobre corpus judicial masivo; herramientas de búsqueda, consulta y razonamiento legal; producción en China | Sí — receta fine-tuning para LLM legal |
| [Open-Source-Legal/OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | Apache-2.0 | 390 | Plataforma DMS para mundo agéntico: anotación semántica colaborativa, análisis documentos, API REST; base extensible para contract review agents | Sí — DMS open source + agentic-ready |
| [docassemble/docassemble](https://github.com/jhpyle/docassemble) | MIT | 780 | Document automation framework para entrevistas legales guiadas: genera contratos, demandas, formularios automáticamente; Python + YAML; ampliamente usado en pro bono | Sí — automatización de documentos legales |
| [alea-institute/folio-mcp](https://github.com/alea-institute/folio-mcp) | MIT | 95 | 18,000+ conceptos legales FOLIO en MCP: 12 herramientas, 11 templates, multilingüe (EN/ES/FR/JA/ZH/HI); ontología legal para agentes AI | Sí — vocabulario legal estructurado para LLMs |
| [zeroentropy-ai/legalbenchrag](https://github.com/zeroentropy-ai/legalbenchrag) | MIT | 280 | Benchmark RAG dominio legal: 6,858 pares query-answer anotados por expertos sobre 79M+ chars (NDAs, M&A, privacidad, comercial) | Sí — eval RAG para dominio legal |
| [freelaw/free-law-machine](https://github.com/freelawproject/free-law-machine) | CC-BY | 320 | Datasets legales abiertos: Case Law Access Project (6.9M casos desde 1658, open desde 2024); Harvard Law School | Sí — datos para fine-tuning / RAG |

## Datasets legales para RAG / fine-tuning

| Dataset | Licencia | Descripción |
|---------|----------|-------------|
| Harvard Caselaw Access Project | CC-BY-NC | 6.9M casos US (1658-2020); completamente abierto desde 2024 |
| CourtListener (RECAP) | CC-BY | 250M páginas PACER docs + 4.5M+ dockets federales US |
| EU EUR-Lex | CC-BY | Legislación EU completa, todos los idiomas oficiales |
| CUAD v1 | CC-BY | 13,000 anotaciones de contratos por abogados (42 categorías) — gold standard contract review |
| MultiLegal Pile | CC | 689B tokens legales en 24 idiomas — para pre-training de LLMs legales |

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
