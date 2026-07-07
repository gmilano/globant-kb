# 🏗️ Repos fundacionales — Legal

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-07

---

## Categoría 1: Document Intelligence & NLP

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|---------------|
| [Open-Source-Legal/OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | MIT ✅ | ~1.4k | DMS agentico con citation graph, annotation engine, MCP server nativo (/mcp/), vector search, GraphQL+REST API. En producción desde 2019. | ✅ Nativo |
| [ICLRandD/Blackstone](https://github.com/ICLRandD/Blackstone) | Apache-2.0 ✅ | ~691 | Pipeline spaCy para NLP en texto legal inglés: NER (casos, cortes, fechas, instrumentos, jueces), sentence segmentation aware de abreviaturas legales. | ✅ Alto |
| [LexPredict/lexpredict-lexnlp](https://github.com/LexPredict/lexpredict-lexnlp) | AGPL-3.0 ⚠️ | ~790 | Extrae 18+ entidades de contratos: fechas, montos, partes, definiciones, condiciones, terminaciones, regulaciones. Word embeddings legales pre-entrenados. Núcleo de ContraxSuite. | ✅ Alto |
| [maastrichtlawtech/awesome-legal-nlp](https://github.com/maastrichtlawtech/awesome-legal-nlp) | MIT ✅ | ~331 | Lista curada de recursos Legal NLP: datasets, modelos, papers, benchmarks. Punto de entrada para explorar el ecosistema. | ✅ Referencia |

## Categoría 2: Agentic Legal Systems

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|---------------|
| [AnttiHero/lavern](https://github.com/AnttiHero/lavern) | Apache-2.0 ✅ | ~400 | 67 agentes especializados con protocolo de debate citado, 10-pass verification, modo autónomo. 155k+ líneas. Backends Claude/Mistral. | ✅ Nativo |
| [willchen96/mike](https://github.com/willchen96/mike) | AGPL-3.0 ⚠️ | ~2.2k | Harvey/Legora OSS: chat documental, extracción tabular de cientos de docs en paralelo. Self-hosted. Claude/Gemini backends. | ✅ Nativo |
| [FudanDISC/DISC-LawLLM](https://github.com/FudanDISC/DISC-LawLLM) | Apache-2.0 ✅ | ~937 | LLM chino fine-tuned en corpus judicial: consultoría multi-turno, recuperación de casos, asistencia en exámenes. SOTA en LawBench para derecho chino. | ✅ Fine-tune base |

## Categoría 3: Case & Matter Management

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|---------------|
| [NodineLegal/OpenLawOffice](https://github.com/NodineLegal/OpenLawOffice) | Apache-2.0 ✅ | ~420 | Sistema de gestión de bufete: casos, facturación, tareas, contactos, documentos. API REST. | ⚡ Medio — vía API |
| ArkCase Community | Apache-2.0 ✅ | Community | Case management FedRAMP/HIPAA: FOIA, quejas, correspondencia. OCR engine incluido. AI integration hooks. | ⚡ Medio — vía hooks |

## Categoría 4: Benchmarks & Evaluación

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|---------------|
| [HazyResearch/legalbench](https://github.com/HazyResearch/legalbench) | MIT ✅ | ~620 | 162 tareas para evaluar LLMs en razonamiento legal. Gold standard para selección de modelos. | ✅ Evaluación |
| [coastalcph/lex-glue](https://github.com/coastalcph/lex-glue) | MIT ✅ | ~410 | 7 tareas de clasificación legal (ECtHR, EURLEX, SCOTUS, LEDGAR, UNFAIR-ToS, CaseHOLD). Fine-tuning baselines BERT/RoBERTa/Longformer. | ✅ Fine-tune |

---

## Matriz AI-Readiness

| Repo | Licencia | REST/API | MCP | Vector DB | Fine-tune | Deploy |
|------|----------|----------|-----|-----------|-----------|--------|
| OpenContracts | MIT ✅ | GraphQL+REST | ✅ | pgvector | — | Docker |
| Blackstone | Apache-2.0 ✅ | Python lib | — | — | ✅ | pip |
| LexNLP | AGPL-3.0 ⚠️ | Python lib | — | — | — | pip |
| lavern | Apache-2.0 ✅ | — | — | — | — | Docker |
| mike | AGPL-3.0 ⚠️ | REST | — | — | — | Docker |
| OpenLawOffice | Apache-2.0 ✅ | REST | — | — | — | .NET |
| DISC-LawLLM | Apache-2.0 ✅ | HuggingFace | — | — | ✅ | GPU |
| LegalBench | MIT ✅ | Python | — | — | — | pip |
| LexGLUE | MIT ✅ | HuggingFace | — | — | ✅ | pip |

### Notas de riesgo de licencia

- **MIT / Apache-2.0**: Máxima libertad. Uso comercial, modificación, distribución sin restricciones. Preferir para productos SaaS.
- **AGPL-3.0** (LexNLP, Mike): Uso interno libre. Si se expone como servicio web → publicar modificaciones. Requiere análisis legal pre-despliegue como producto.
- **LGPL**: Generalmente OK si la aplicación usa la librería como dependencia sin modificar el core.

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
