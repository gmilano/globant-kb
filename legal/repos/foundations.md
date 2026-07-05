# 🏗️ Repos fundacionales — Legal Services

> Bases sobre las cuales construir soluciones legales con AI. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-05

## Plataformas y frameworks base

| Repo | Licencia | Descripción | ¿Base para AI? |
|------|----------|-------------|----------------|
| [docassemble](https://github.com/jhpyle/docassemble) | MIT | Entrevistas legales guiadas + ensamblado de documentos; estándar en portales de acceso a justicia y formularios de corte | Sí — 2.6k★ |
| [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | MIT | Plataforma de inteligencia documental: anotación humana, agentes AI, MCP server, búsqueda vectorial, API unificada | Sí — 920★ |
| [LexNLP](https://github.com/LexPredict/lexpredict-lexnlp) | Apache-2.0 | Librería NLP para contratos: extrae fechas, partes, obligaciones, cláusulas, referencias legales; CUAD-compatible | Sí — 3.2k★ |
| [Blackstone](https://github.com/ICLRandD/Blackstone) | Apache-2.0 | Pipeline spaCy para texto legal no estructurado (UK case law): NER de provisiones, citaciones, instrumentos | Sí — 691★ |
| [LegalBench](https://github.com/HazyResearch/legalbench) | MIT | Benchmark Stanford: 162 tareas de razonamiento legal para evaluar LLMs (contratos, estatutos, clasificación de casos) | Sí — 820★ |
| [DISC-LawLLM](https://github.com/FudanDISC/DISC-LawLLM) | Apache-2.0 | LLM judicial chino (Fudan/Inspur/CUPL): retrieval de provisiones, análisis de casos, razonamiento silogístico | Sí — 937★ |
| [awesome-legaltech](https://github.com/Vaquill-AI/awesome-legaltech) | MIT | Lista curada de recursos legaltech: plataformas OSS, modelos AI, MCP servers, datasets, herramientas | Sí — índice |
| [legal-ml-datasets](https://github.com/neelguha/legal-ml-datasets) | MIT | Colección de datasets y tareas para ML legal: CUAD, ECtHR, MultiLex, CaseHOLD, LegalBench | Sí — 450★ |

---

## Datasets fundamentales

| Dataset | Fuente | Descripción | Uso |
|---------|--------|-------------|-----|
| CUAD | Atticus Project | 510 contratos, 41 tipos de cláusulas anotadas manualmente | Benchmark extracción de cláusulas |
| LegalBench | Stanford HazyResearch | 162 tareas de razonamiento legal | Evaluación de LLMs |
| ECtHR | Tribunal Europeo DDHH | Decisiones del TEDH anotadas | Clasificación de violaciones |
| MultiLex | EU/Multilingual | Documentos legales multilingüe | NLP legal plurilingüe |
| CaseHOLD | Harvard LIL | Precedentes judiciales de US | Retrieval jurisprudencial |

---

## Stack de referencia para proyectos nuevos

```
docassemble          → entrevistas guiadas / formularios
LexNLP               → extracción de entidades y cláusulas
OpenContracts        → repositorio + anotación + agentes
LegalBench           → evaluación continua del LLM elegido
Claude Sonnet 5 / Qwen3-235B  → motor de razonamiento
```

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
