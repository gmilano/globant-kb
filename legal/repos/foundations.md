# 🏗️ Repos fundacionales — Legal

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-06 (segunda pasada)

## Plataformas y frameworks base

| Repo | Licencia | Descripción | ¿Base para AI? |
|------|----------|-------------|----------------|
| [LexNLP](https://github.com/LexPredict/lexpredict-lexnlp) | Apache-2.0 | Biblioteca Python para NLP sobre texto legal no estructurado: extracción de fechas, montos, partes, clasificación de cláusulas, segmentación de contratos. Usado en producción por LexPredict/ContractPodAi. | Sí — ~3.4k★ |
| [docassemble](https://github.com/jhpyle/docassemble) | MIT | Expert system para entrevistas guiadas y ensamblado de documentos legales. Python + YAML + Markdown. El gold-standard para automatización de formularios legales; usado masivamente en clínicas jurídicas de EE.UU. | Sí — ~2.6k★ |
| [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | MIT | DMS agentic: grafo de citas programable, anotación humana, extracción estructurada, agentes AI, servidor MCP integrado, API GraphQL + REST + React UI. Self-hosted desde 2019. | Sí — ~980★ |
| [CourtListener](https://github.com/freelawproject/courtlistener) | BSD | Django source del mayor archivo abierto de jurisprudencia US: 9M+ opiniones, argumentos orales, jueces, registros financieros, PACER/RECAP filings. Free Law Project. | Sí — ~961★ |
| [DISC-LawLLM](https://github.com/FudanDISC/DISC-LawLLM) | Apache-2.0 | LLM judicial chino (ChatGLM base) entrenado en corpus judicial masivo + fine-tuning supervisado para Q&A legal, análisis de casos y recuperación de estatutos. | Sí — ~950★ |
| [Blackstone](https://github.com/ICLRandD/Blackstone) | Apache-2.0 | Pipeline spaCy + modelo NER para texto legal anglosajón no estructurado; detecta casos, legislación, disposiciones e instrumentos. Construido por ICLR&D. | Sí — ~700★ |
| [awesome-legal-nlp](https://github.com/maastrichtlawtech/awesome-legal-nlp) | MIT | Lista curada de recursos LegalNLP: datasets (CUAD, ContractNLI, LEDGAR), modelos, papers, herramientas. Mantenida por Maastricht LawTech. | Referencia — ~350★ |

## Notas de integración

- **LexNLP** es el punto de entrada más maduro para NLP contractual en Python; combina bien con LangChain/LangGraph para pipelines de extracción.
- **docassemble** genera formularios interactivos; añadir un endpoint LLM encima convierte las entrevistas guiadas en diálogos conversacionales.
- **OpenContracts** ya tiene agentes y MCP: es el punto de partida más completo para un sistema de gestión documental agentic.
- **CourtListener** provee el corpus jurisprudencial; combinado con `courtlistener-mcp` permite RAG sobre 9M+ opiniones desde cualquier LLM.

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
