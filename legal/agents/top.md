# Agentes AI — Legal

> Agentes y herramientas AI open source para la industria legal. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-07

## Agentes y herramientas destacadas

| Nombre | Licencia | Descripción | Stars |
|--------|----------|-------------|-------|
| [lavern](https://github.com/AnttiHero/lavern) | Apache-2.0 | Agentic law firm: 67 specialist AI agents que revisan documentos via debate con evidencia, mandatory human gates y 10-pass verification loop. TypeScript. | ~268 |
| [claude-legal-skill](https://github.com/evolsb/claude-legal-skill) | MIT | Contract review con CUAD risk detection, market benchmarks y lawyer-ready redlines. Funciona con Claude Code, Codex, Cursor y 26+ tools. | ~363 |
| [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | MIT | Plataforma de document intelligence: annotation, structured extraction, AI agents, MCP server integrado, vector search y citation graph. Self-hostable. | ~400 |
| [korean-law-mcp](https://github.com/chrisryugj/korean-law-mcp) | MIT | 17 MCP tools que wrappean 41 APIs del gobierno coreano: statute queries, case law, ordinances con hallucination verification. TypeScript. | ~2.2k |
| [dd-agents](https://github.com/zoharbabin/due-diligence-agents) | Apache-2.0 | Plataforma M&A due diligence: orquesta 13 AI agents en un pipeline de 38 pasos para análisis legal completo de transacciones. | ~120 |
| [DISC-LawLLM](https://github.com/FudanDISC/DISC-LawLLM) | Apache-2.0 | LLM legal chino de la Universidad de Fudan: sistema integral con statute retrieval, syllogistic reasoning y diálogo legal. Fudan DISC. | ~937 |
| [Blackstone](https://github.com/ICLRandD/Blackstone) | Apache-2.0 | Pipeline spaCy + modelo NLP para texto legal UK no estructurado: NER legal, extracción de citaciones, clasificación. ICLR&D. | ~691 |
| [Opennyai](https://github.com/OpenNyAI/Opennyai) | MIT | Pipeline NLP para documentos legales indios: NER, rhetorical roles, summarization. Soporta jurisprudencia de la Corte Suprema de India. | ~350 |
| [EU-Compliance-MCP](https://github.com/Ansvar-Systems/EU_compliance_MCP) | MIT | 61 regulaciones EU (GDPR, AI Act, DORA, NIS2, etc.) con 4,095 artículos y comparación cross-regulation via MCP. Crítico para clientes europeos. | ~80 |
| [SaulLM-7B](https://huggingface.co/Equall/Saul-7B-Instruct-v1) | MIT | Mistral 7B pre-entrenado en 30B+ tokens legales en inglés. Primero LLM legal a escala de uso general. Equall AI. Variantes hasta 141B disponibles. | ~450 |
| [ContextGem](https://github.com/shcherbak-ai/contextgem) | Apache-2.0 | Extracción LLM-based de documentos legales/business con schemas declarativos: define qué extraer, el agente lo encuentra. Python. | ~300 |
| [courtlistener-mcp](https://github.com/DefendTheDisabled/courtlistener-mcp) | MIT | Semantic search + hybrid retrieval + citation verification sobre CourtListener (9M+ opiniones US). Natural language queries sobre 3,352 cortes. | ~95 |

---

## Frameworks de agentes usados en legal

| Framework | Por qué aplica en legal |
|-----------|-------------------------|
| [LangGraph](https://github.com/langchain-ai/langgraph) MIT ~24k | Workflows multi-step con estado: revisión contractual en etapas con human-in-the-loop gates |
| [CrewAI](https://github.com/crewAIInc/crewAI) MIT ~52k | Múltiples roles legales (abogado revisor, paralegal, compliance) como agentes coordinados |
| [AutoGen](https://github.com/microsoft/autogen) MIT ~50k | Debate entre agentes para validación legal: un agente propone, otro refuta, juez decide |
| [Smolagents](https://github.com/huggingface/smolagents) Apache-2.0 ~27k | Code agents para análisis de contratos con tool use ligero |

---

## MCP Servers legales por jurisdicción

| Servidor | Jurisdicción | Datos |
|----------|--------------|-------|
| [vaquill-mcp](https://github.com/vaquill-AI/vaquill-mcp) | US | 8M+ federal/state opinions, US Code, CFR |
| [courtlistener-mcp](https://github.com/DefendTheDisabled/courtlistener-mcp) | US | 9M+ opiniones, PACER, semantic search |
| [EU-Compliance-MCP](https://github.com/Ansvar-Systems/EU_compliance_MCP) | EU | GDPR, AI Act, DORA, 61 regs, 4,095 artículos |
| [mcp-server-legifrance](https://github.com/pylegifrance/mcp-server-legifrance) | Francia | Légifrance/PISTE estatutos, códigos, jurisprudencia |
| [yargi-mcp](https://github.com/saidsurucu/yargi-mcp) | Turquía | Yargıtay, Danıştay, Anayasa Mahkemesi |
| [pasal](https://github.com/ilhamfp/pasal) | Indonesia | 40k+ regulaciones via MCP, REST y web |
| [ayunis-legal-mcp](https://github.com/ayunis-core/ayunis-legal-mcp) | Alemania | Gesetze-im-Internet códigos legales |
| [auslaw-mcp](https://github.com/russellbrenner/auslaw-mcp) | Australia/NZ | AustLII case law y legislación |
| [direito-familiar-imobiliario](https://github.com/maiconfuhr/direito-familiar-imobiliario) | Brasil | Derecho civil: inmuebles, divorcio, herencia. MIT. Mayo 2026. |

---
*Actualizado automáticamente por el pipeline de ingest.*
