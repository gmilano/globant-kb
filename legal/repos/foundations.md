# Repos fundacionales — Legal Services

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-09 (v6)

## Plataformas y frameworks base

| Repo | Licencia | Descripción | Base para AI |
|------|----------|-------------|-------------|
| [claude-for-legal](https://github.com/anthropics/claude-for-legal) | Apache-2.0 | Suite oficial Anthropic: 12 plugins por área de práctica, 80+ agentes especializados, 20+ conectores MCP (CourtListener, Ironclad, DocuSign, iManage, Everlaw); Managed Agents API para rutinas background; lanzado mayo 2026 | Sí — **8.7k★** |
| [courtlistener](https://github.com/freelawproject/courtlistener) | Apache-2.0 | Archivo indexable de datos judiciales EE.UU.: 8M+ opiniones, dockets PACER, transcripciones orales, jueces, citas; API REST + MCP para Claude (mayo 2026) | Sí — 2.1k★ |
| [docassemble](https://github.com/jhpyle/docassemble) | MIT | Sistema experto YAML/Python para entrevistas guiadas y ensamblado de documentos legales; genera PDF/DOCX; base de Suffolk LIT Lab y courts estatales de Massachusetts | Sí — 926★ |
| [legalbench](https://github.com/HazyResearch/legalbench) | MIT | Benchmark colaborativo Stanford: 162 tareas de razonamiento legal en inglés (IRAC, interpretación estatutaria, contratos, regulaciones); estándar de facto para evaluar LLMs legales | Sí — 1.1k★ |
| [DISC-LawLLM](https://github.com/FudanDISC/DISC-LawLLM) | Apache-2.0 | LLM legal chino (Fudan + Inspur); fine-tuning supervisado sobre corpus judicial masivo; herramientas de búsqueda + RAG legal integradas; arquitectura de referencia para LLMs jurisdiccionales | Sí — 937★ |
| [Blackstone](https://github.com/ICLRandD/Blackstone) | Apache-2.0 | Pipeline spaCy para NLP en texto legal inglés: NER de entidades (INSTRUMENT, PERSON, COURT, ORG, CITATION), clasificación de sentencias; modelo preentrenado en corpus ICLR & D | Sí — 691★ |
| [LRAGE](https://github.com/hoorangyee/LRAGE) | MIT | Framework de evaluación de pipelines RAG especializado en dominio legal: integra Pile-of-Law, LegalBench, LawBench, KBL; índices BM25+FAISS precompilados para corpora legales; integración smolagents para agentes LLM | Eval — 180★ |
| [LegalMD](https://github.com/openlegaldata/legal-md) | MIT | Markdown dialect para documentos legales: primitivos `@party`, `@cite`, `@clause`, `@deadline`; parser TypeScript, resolver de citas contra datos legales abiertos, renderers HTML/JSON, extensión VS Code; alternativa estructurada al DOCX | Sí |
| [legalbenchrag](https://github.com/zeroentropy-ai/legalbenchrag) | MIT | Benchmark RAG legal: 6,858 pares query-answer sobre 79M+ caracteres (NDAs, M&A, contratos, privacy policies); evalúa chunking, embeddings y retrieval para documentos legales | Sí — 280★ |
| [OpenNyAI](https://github.com/OpenNyAI/Opennyai) | MIT | Pipeline NLP end-to-end para documentos legales indios: NER, etiquetado retórico (13 roles), sumarización de sentencias, QA sobre jurisprudencia; datasets anotados de alta calidad | Sí — 310★ |
| [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | Apache-2.0 | DMS open para el mundo agéntico: anotación semántica de documentos legales, análisis colaborativo, API REST; soporte para corpus masivos de contratos | Sí — 390★ |
| [awesome-legal-nlp](https://github.com/maastrichtlawtech/awesome-legal-nlp) | MIT | Lista curada de recursos LegalNLP: datasets multilingues, modelos, benchmarks, papers; mantenida por Maastricht Law Tech — referencia para investigación | Ref — 331★ |
| [LegalAgentBench](https://github.com/CSHaitao/LegalAgentBench) | MIT | Benchmark multi-hop para agentes en dominio legal chino: 17 corpus, 37 herramientas, 300 tareas anotadas de razonamiento y redacción; paper ICLR 2025 | Eval — 420★ |
| [korean-law-mcp](https://github.com/chrisryugj/korean-law-mcp) | MIT | MCP server para leyes coreanas (모범 de patrón jurisdiccional): 41 APIs del National Law Information Center, verificación anti-hallucination, grafo de impacto; 2.1k★ — modelo para replicar en LATAM | MCP — 2155★ |
| [legal-rag-bench](https://github.com/isaacus-dev/legal-rag-bench) | MIT | Benchmark reasoning-intensive para RAG legal end-to-end: evalúa precisión, recuperación y razonamiento sobre documentos legales reales; complementa LegalBench (tareas) con evaluación de sistemas completos | Eval — 165★ |
| [GLAW](https://github.com/lawve-ai/glaw) | MIT | Virtual law firm skill: 179 skills en 10 departamentos, pipeline completo con human gates; referencia de arquitectura para despachos virtuales AI; genera attorney work-product con supervisión | Arch — 340★ |
| [harvey-labs](https://github.com/harveyai/harvey-labs) | MIT | **NUEVO v6** — Harvey: benchmark open-source para agentes legales de largo horizonte; 1,200+ tareas, 24 áreas de práctica, 75k+ criterios escritos por abogados reales; Claude Fable 5 lidera con 14.2% all-pass | Eval — 920★ |
| [Nomos](https://github.com/haqq-ai/nomos) | MIT | **NUEVO v6** — HAQQ: "Cursor para abogados" — interface legal agent-native open source; self-hostable; integra GLAW skills + claude-for-legal plugins; diseñada para que AI engine y abogado sean co-primeros usuarios | Arch — 310★ |

---

## Datasets fundacionales legales

| Dataset | Tamaño | Descripción | Licencia |
|---------|--------|-------------|----------|
| MultiLegalPile | 689 GB | Corpus legal en 24 idiomas, 17 jurisdicciones — mayor dataset legal multilingue open | CC BY 4.0 |
| LegalBench-RAG corpus | 79M chars | NDAs, M&A, contratos comerciales, privacy policies — anotado por expertos legales | MIT |
| LEXam | 7,537 QA | Bilingual EN/DE, exámenes de derecho; evalúa razonamiento jurídico avanzado | Apache-2.0 |
| CUAD (Contract Understanding) | 510 contratos | Anotación de 41 tipos de cláusulas de riesgo — gold standard para revisión contractual | CC BY 4.0 |
| Pile-of-Law | ~256 GB | Corpus legal en inglés de alta calidad: leyes federales/estatales EE.UU., court opinions, comentarios regulatorios | CC BY 4.0 |

---

## Stacks fundacionales por caso de uso

| Stack | Repos | Caso de uso |
|-------|-------|-------------|
| A — Research Agent | CourtListener MCP + claude-for-legal + LangGraph | Investigación legal multi-jurisdicción |
| B — Contract Review | claude-for-legal + OpenContracts + CUAD dataset | Revisión contractual + redlines CUAD |
| C — Mass Litigation | docassemble + FastAPI + LangGraph + pgvector | Litigios masivos escala LATAM |
| D — Legal NLP Pipeline | Blackstone + OpenNyAI + LRAGE | NLP para texto legal inglés/indio/español |
| E — Self-hosted Platform | Mike / Suzie Law + Anthropic API | Plataforma AI legal propia del cliente |
| F — Evaluation | LegalBench + HAQQ-LAB + LRAGE + legal-rag-bench | Evaluación de sistemas AI antes de producción |
| G — Virtual Law Firm | GLAW + Claude Code + CourtListener MCP | Despacho virtual AI con 10 departamentos |
| H — Jurisdicción-específica MCP | korean-law-mcp (patrón) + APIs locales LATAM | MCP legal para PJe/CEJAT/EJE/SCJN |
| I — Nomos Workspace | Nomos (MIT) + GLAW skills + Master Claude for Legal | Despacho virtual self-hosted sin costo de licencia |
| J — Evaluation Suite | harvey-labs (MIT) + HAQQ-LAB + LRAGE + legal-rag-bench | Quality gate completo antes de producción |

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas. — v6 2026-07-09.*
