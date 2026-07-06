# Agentes AI — Legal Services

> Agentes y herramientas AI open source para la industria legal. Foco: MIT / Apache 2.0 / AGPL.
> Última actualización: 2026-07-06

## Agentes y herramientas destacadas

| Nombre | Licencia | Repo | Stars | Descripción |
|--------|----------|------|-------|-------------|
| [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | MIT | Open-Source-Legal/OpenContracts | ~1.4k | Document intelligence platform para el mundo agéntico: MCP server integrado, GraphQL + REST API, anotación humana, extracción estructurada, y semantic search sobre repositorios de contratos. Base ideal para agentes de revisión contractual. |
| [Mike OSS](https://github.com/willchen96/mike) | AGPL-3.0 | willchen96/mike | ~2.2k | Plataforma legal AI open source construida por ex-Latham & Watkins como alternativa a Harvey y Legora. Full-stack: research, drafting, review, con tu propia API key. 1k★ en 72h de lanzamiento (mayo 2026). |
| [lavern](https://github.com/AnttiHero/lavern) | Apache-2.0 | AnttiHero/lavern | ~267 | "Tu despacho agéntico". 67 agentes especialistas que revisan documentos mediante debate con evidencias, human gates obligatorios y loop de verificación de 10 pasadas. |
| [DISC-LawLLM](https://github.com/FudanDISC/DISC-LawLLM) | Apache-2.0 | FudanDISC/DISC-LawLLM | ~937 | Sistema legal inteligente basado en LLM (Fudan + Inspur + China University of Political Science). Fine-tuned en corpus judicial chino masivo. Arquitectura base para vertical jurídica. |
| [Blackstone](https://github.com/ICLRandD/Blackstone) | Apache-2.0 | ICLRandD/Blackstone | ~691 | Pipeline spaCy + modelo para NLP en texto legal no estructurado (UK common law). Identifica spans como CASENAME, LEGIS, CITATION, COURT, JUDGE. Producción en firmas del Reino Unido. |
| [LexNLP](https://github.com/LexPredict/lexpredict-lexnlp) | AGPL-3.0 | LexPredict/lexpredict-lexnlp | ~790 | Extracción NLP sobre texto legal y regulatorio: fechas, partes, montos, entidades geopolíticas, definiciones, citas legales. Base de ContraxSuite. Dual-licensing disponible. |
| [LegalBench](https://github.com/HazyResearch/legalbench) | MIT | HazyResearch/legalbench | ~600 | Benchmark colaborativo (Stanford/Cornell) con 90+ tasks para evaluar razonamiento legal en LLMs. Usado para seleccionar modelos base en proyectos legales. |
| [LexGLUE](https://github.com/coastalcph/lex-glue) | MIT | coastalcph/lex-glue | ~400 | Benchmark de comprensión legal en inglés: ECtHR, SCOTUS, EUR-LEX, LEDGAR, UNFAIR-ToS, CaseHOLD. Integrado con Hugging Face Datasets. Referencia de evaluación. |
| [lawglance](https://github.com/lawglance/lawglance) | MIT | lawglance/lawglance | ~50 | AI legal assistant basado en RAG (Redis + vector DB). Respuestas legales rápidas sobre corpus indexado. Arquitectura simple para productizar asesoramiento legal básico. |
| [awesome-legal-nlp](https://github.com/maastrichtlawtech/awesome-legal-nlp) | MIT | maastrichtlawtech/awesome-legal-nlp | ~331 | Curated list de recursos LegalNLP: datasets, modelos, papers, herramientas. Punto de entrada para investigar el stack técnico legal. |

---

## Herramientas MCP para jurisdicciones específicas

| MCP Server | Jurisdicción | Descripción |
|------------|-------------|-------------|
| Korean Law MCP | Korea | 17 tools sobre 41 APIs legales gubernamentales coreanas, verificación de citas, diff temporal |
| ayunis-legal-mcp | Alemania | Expone códigos legales alemanes vía MCP |
| Pasal MCP | Indonesia | 40k+ regulaciones indonesias con acceso grounded para agentes |
| MCP Taiwan Legal DB | Taiwan | Sentencias del Judicial Yuan + base nacional de estatutos |
| Yargı MCP | Turquía | Bases de datos legales turcas vía MCP |

---

## Datasets y benchmarks para fine-tuning

| Dataset | Licencia | Descripción |
|---------|----------|-------------|
| CUAD (Contract Understanding Atticus Dataset) | CC-BY-4.0 | 510 contratos, 41 categorías de cláusulas anotadas por abogados. Gold standard para contract review. |
| LEDGAR | CC-BY | 100k+ cláusulas contractuales de SEC EDGAR clasificadas en 100 tipos. |
| EUR-LEX | CC-BY | Legislación EU anotada para clasificación multilingüe. |
| CaseHOLD | CC-BY | 53k+ citas legales de US Federal Courts para QA de precedentes. |

---
*Actualizado automáticamente por el pipeline de ingest. Segunda pasada: 2026-07-06.*
