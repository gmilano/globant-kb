# Repos fundacionales — Legal Services

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-08 (v3)

## Plataformas y frameworks base

| Repo | Licencia | Descripción | Base para AI |
|------|----------|-------------|-------------|
| [courtlistener](https://github.com/freelawproject/courtlistener) | Apache-2.0 | Archivo indexable de datos judiciales EE.UU.: 8M+ opiniones, dockets PACER, transcripciones orales, jueces, citas; API REST + MCP para Claude (mayo 2026) | Sí — 2.1k ★ |
| [docassemble](https://github.com/jhpyle/docassemble) | MIT | Sistema experto YAML/Python para entrevistas guiadas y ensamblado de documentos legales; genera PDF/DOCX; base de Suffolk LIT Lab y courts estatales de Massachusetts | Sí — 926 ★ |
| [legalbench](https://github.com/HazyResearch/legalbench) | MIT | Benchmark colaborativo Stanford: 162 tareas de razonamiento legal en inglés (IRAC, interpretación estatutaria, contratos, regulaciones); estándar de facto para evaluar LLMs legales | Sí — 1.1k ★ |
| [DISC-LawLLM](https://github.com/FudanDISC/DISC-LawLLM) | Apache-2.0 | LLM legal chino (Fudan + Inspur); fine-tuning supervisado sobre corpus judicial masivo; herramientas de búsqueda + RAG legal integradas; arquitectura de referencia para LLMs jurisdiccionales | Sí — 937 ★ |
| [Blackstone](https://github.com/ICLRandD/Blackstone) | Apache-2.0 | Pipeline spaCy para NLP en texto legal inglés: NER de entidades (INSTRUMENT, PERSON, COURT, ORG, CITATION), clasificación de sentencias; modelo preentrenado en corpus ICLR & D | Sí — 691 ★ |
| [legalbenchrag](https://github.com/zeroentropy-ai/legalbenchrag) | MIT | Benchmark RAG legal: 6,858 pares query-answer sobre 79M+ caracteres (NDAs, M&A, contratos, privacy policies); evalúa chunking, embeddings y retrieval para documentos legales | Sí — 280 ★ |
| [OpenNyAI](https://github.com/OpenNyAI/Opennyai) | MIT | Pipeline NLP end-to-end para documentos legales indios: NER, etiquetado retórico (13 roles), sumarización de sentencias, QA sobre jurisprudencia; datasets anotados de alta calidad | Sí — 310 ★ |
| [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | Apache-2.0 | DMS open para el mundo agéntico: anotación semántica de documentos legales, análisis colaborativo, API REST; soporte para corpus masivos de contratos | Sí — 390 ★ |
| [awesome-legal-nlp](https://github.com/maastrichtlawtech/awesome-legal-nlp) | MIT | Lista curada de recursos LegalNLP: datasets multilingues, modelos, benchmarks, papers; mantenida por Maastricht Law Tech — referencia para investigación | Ref — 331 ★ |
| [LegalAgentBench](https://github.com/CSHaitao/LegalAgentBench) | MIT | Benchmark multi-hop para agentes en dominio legal chino: 17 corpus, 37 herramientas, 300 tareas anotadas de razonamiento y redacción; paper ICLR 2025 | Eval — 420 ★ |

---

## Datasets fundacionales legales

| Dataset | Tamaño | Descripción | Licencia |
|---------|--------|-------------|----------|
| MultiLegalPile | 689 GB | Corpus legal en 24 idiomas, 17 jurisdicciones — mayor dataset legal multilingue open | CC BY 4.0 |
| LegalBench-RAG corpus | 79M chars | NDAs, M&A, contratos comerciales, privacy policies — anotado por expertos legales | MIT |
| LEXam | 7,537 QA | Bilingual EN/DE, exámenes de derecho; evalúa razonamiento jurídico avanzado | Apache-2.0 |
| CUAD (Contract Understanding) | 510 contratos | Anotación de 41 tipos de cláusulas de riesgo — gold standard para revisión contractual | CC BY 4.0 |

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
