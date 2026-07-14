# 🏗️ Repos fundacionales — Legal

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-14 (v7)

## Plataformas y frameworks base

| Repo | Licencia | Descripción | Base para AI |
|------|----------|-------------|---------------|
| [TheAtticusProject/cuad](https://github.com/TheAtticusProject/cuad) | CC-BY 4.0 | CUAD: 510 contratos comerciales, 13k+ labels, 41 tipos de cláusulas (NeurIPS 2021); gold standard dataset para contract review AI | Sí — base de entrenamiento/eval |
| [Open-Source-Legal/OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | MIT | DMS agentico con grafo de citas, GraphQL+REST+MCP, búsqueda semántica, pydantic-ai agents, auto-anotación sobre corpus legales | Sí — plataforma central |
| [ICLRandD/Blackstone](https://github.com/ICLRandD/Blackstone) | Apache-2.0 | Pipeline spaCy + modelos para NLP sobre texto legal inglés; reconocimiento de entidades (casos, legislación, citas), pipeline production-ready | Sí — 691 ★ |
| [FudanDISC/DISC-LawLLM](https://github.com/FudanDISC/DISC-LawLLM) | Apache-2.0 | LLM legal chino de Fudan; corpus judicial masivo; fine-tuned para consulta, análisis de casos, predicción de sentencias | Sí — 937 ★ |
| [harvard-lil/olaw](https://github.com/harvard-lil/olaw) | MIT | Harvard LIL Open Legal AI Workbench; RAG tool-based sobre CourtListener API; framework extensible para research legal AI UX | Sí — referencia académica |
| [hoorangyee/LRAGE](https://github.com/hoorangyee/LRAGE) | MIT | Legal RAG Evaluation; KBL+LegalBench+LawBench; Retriever+Reranker+LLM-judge; Pile-of-Law BM25+FAISS precompilados; arXiv:2504.01840 | Sí — evaluación estándar |
| [Vaquill-AI/courtlistener-mcp](https://github.com/Vaquill-AI/courtlistener-mcp) | MIT | MCP server para 250M+ páginas US courts (PACER, eCFR, federal+state); BYOK; Claude, Cursor, Windsurf, VS Code | Sí — acceso a datos legales |
| [lawglance/lawglance](https://github.com/lawglance/lawglance) | MIT | Asistente legal RAG gratuito; voice command; multi-jurisdicción (India, Canada, expansión global) | Sí — base legal assistant |
| [zoharbabin/due-diligence-agents](https://github.com/zoharbabin/due-diligence-agents) | Apache-2.0 | 13 agentes M&A forensicos; 9 dominios; 38 pasos, 5 quality gates; cross-referencia entre dominios | Sí — patrón DD multi-agente |
| [CSHaitao/Awesome-LegalAI-Resources](https://github.com/CSHaitao/Awesome-LegalAI-Resources) | MIT | Repositorio exhaustivo de recursos Legal AI: datasets, modelos, papers, sistemas | Sí — directorio de recursos |

---

## Datasets legales clave

| Dataset | Licencia | Descripción | Tamaño |
|---------|----------|-------------|--------|
| [CUAD](https://github.com/TheAtticusProject/cuad) | CC-BY 4.0 | 510 contratos, 41 tipos de cláusulas, NeurIPS 2021 | 13k+ labels |
| [Pile-of-Law](https://huggingface.co/datasets/pile-of-law/pile-of-law) | CC-BY 4.0 | Corpus masivo de texto legal US (leyes, reglamentos, opiniones) | ~256GB |
| [CourtListener](https://www.courtlistener.com/help/api/bulk-data/) | CC BY-SA | 250M+ páginas de tribunales federales y estatales US; PACER | 250M+ docs |
| [Harvard Caselaw Access Project](https://case.law/) | CC BY 4.0 | 6.9M casos, 360 años de derecho US; completamente abierto desde 2024 | 6.9M casos |
| [ContractNLI](https://stanfordnlp.github.io/contract-nli/) | CC-BY 4.0 | NLI para contratos; 607 contratos anotados; Stanford NLP | 607 contratos |

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
