# Agentes AI — Legal Services

> Agentes y herramientas AI open source para la industria legal. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-08 (v4)

## Agentes y herramientas destacadas

| Nombre | Licencia | Descripción | Stars |
|--------|----------|-------------|-------|
| [claude-for-legal](https://github.com/anthropics/claude-for-legal) | Apache-2.0 | Suite oficial Anthropic: 12 plugins por área de práctica (Corporate, M&A, Employment, Privacy, IP, Litigation, AI Governance…), 80+ agentes especializados, 20+ conectores MCP (CourtListener, Ironclad, DocuSign, iManage, Everlaw); Managed Agents API para rutinas background sin intervención humana | 882 |
| [Mike](https://github.com/willchen96/mike) | AGPL-3.0 | Plataforma legal AI self-hostable (alternativa Harvey): Next.js + Express + Supabase; chat con documentos, redlines .docx, 12 personas por área de práctica, multi-modelo (Anthropic/Gemini/OpenAI); 2.2k★ y 614 forks en 72h del lanzamiento — récord legaltech | 2200 |
| [Suzie Law](https://github.com/firelex/suzielaw) | Apache-2.0 | Open-source Harvey alternativa de Scissero: 12 practice-area personas, 160+ agentic workflows, redlines DOCX, investigación legal en 19 jurisdicciones; migratable de hosted a self-hosted con un comando; base extensible con Claude Code | 800 |
| [legalbench](https://github.com/HazyResearch/legalbench) | MIT | Benchmark colaborativo Stanford/Hazy Research: 162 tareas de razonamiento legal en inglés (IRAC, interpretación estatutaria, análisis contractual); estándar de evaluación de LLMs legales | 1.1k |
| [DISC-LawLLM](https://github.com/FudanDISC/DISC-LawLLM) | Apache-2.0 | LLM legal chino (Fudan + Inspur + CUPL); fine-tuning sobre corpus judicial masivo; herramientas de búsqueda, consulta y razonamiento legal integradas | 937 |
| [Blackstone](https://github.com/ICLRandD/Blackstone) | Apache-2.0 | Pipeline spaCy para NLP en texto legal no estructurado inglés; NER de entidades legales, clasificación de sentencias, tokenización especializada para documentos forenses | 691 |
| [claude-legal-skill](https://github.com/evolsb/claude-legal-skill) | MIT | Contract review con detección de riesgos CUAD, genera redlines .docx y PDFs tracked-changes, benchmarks de mercado; compatible con Claude Code, Cursor, Codex y 26+ herramientas | 355 |
| [LegalAgentBench](https://github.com/CSHaitao/LegalAgentBench) | MIT | Benchmark de agentes LLM en dominio legal chino: 17 corpus reales, 37 herramientas, 300 tareas anotadas multi-hop (razonamiento + redacción); paper ICLR 2025 | 420 |
| [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | Apache-2.0 | Plataforma DMS open para el mundo agéntico: anotación semántica colaborativa, análisis de documentos legales, API REST; base para construir review agents sobre contratos | 390 |
| [legalbenchrag](https://github.com/zeroentropy-ai/legalbenchrag) | MIT | Benchmark RAG para dominio legal: 6,858 pares query-answer anotados por expertos sobre 79M+ caracteres (NDAs, M&A, contratos comerciales, políticas de privacidad) | 280 |
| [lawglance](https://github.com/lawglance/lawglance) | MIT | RAG-based legal assistant open source para acceso democrático a asesoría legal; soporte multi-jurisdicción en expansión (India, Canadá); incluye generación de documentos legales | 150 |
| [lavern](https://github.com/AnttiHero/lavern) | Apache-2.0 | Agentic law firm con 67 agentes especialistas; debate multi-evidencia con human gates obligatorios y 10-pass verification loop; arquitectura multi-agente lista para producción | 267 |
| [courtlistener](https://github.com/freelawproject/courtlistener) | Apache-2.0 | Archivo completamente indexable de datos judiciales EE.UU. (8M+ opiniones, PACER, jueces, citas); MCP connector para Claude disponible desde mayo 2026 | 2.1k |
| [docassemble](https://github.com/jhpyle/docassemble) | MIT | Sistema experto open source para entrevistas guiadas y ensamblado de documentos legales; YAML + Python + Markdown, PDF/DOCX; usado por Suffolk LIT Lab y tribunales de MA | 926 |
| [LRAGE](https://github.com/hoorangyee/LRAGE) | MIT | Framework de evaluación de pipelines RAG especializado en dominio legal: integra Pile-of-Law, LegalBench, LawBench, KBL; índices BM25+FAISS precompilados; integración smolagents para agentes LLM multi-step | 180 |
| [OpenNyAI](https://github.com/OpenNyAI/Opennyai) | MIT | Pipeline NLP end-to-end para documentos legales indios (Supremo Tribunal): NER, etiquetado retórico, sumarización, QA; datasets de alta calidad incluidos | 310 |
| [awesome-legaltech](https://github.com/Vaquill-AI/awesome-legaltech) | MIT | Lista curada 2026 de recursos LegalTech: plataformas open source, modelos AI, MCP servers (US, India, Canadá), datasets, benchmarks y herramientas globales | 185 |

---

## MCP Servers legales (2026) — conectores para agentes Claude/LangChain

| Servidor MCP | Cobertura | Licencia |
|--------------|-----------|----------|
| [CourtListener MCP](https://free.law/2026/05/12/courtlistener-is-now-available-inside-claude/) | 8M+ opiniones judiciales EE.UU., PACER, análisis de citas, jueces | Apache-2.0 |
| [claude-for-legal MCP connectors](https://github.com/anthropics/claude-for-legal) | Ironclad, DocuSign, iManage, Everlaw, Slack, Google Drive, Box | Apache-2.0 |
| [Vaquill AI MCP (US)](https://github.com/Vaquill-AI/awesome-legaltech) | 8M+ sentencias federales y estatales EE.UU. + US Code + CFR | Apache-2.0 |
| [Vaquill AI MCP (India)](https://github.com/Vaquill-AI/awesome-legaltech) | 20M+ sentencias Supremo Tribunal, High Courts y Tribunales de India | Propietario con tier gratuito |
| [CanLII MCP](https://github.com/Vaquill-AI/awesome-legaltech) | Base jurídica canadiense CanLII, búsqueda semántica + verificación de citas | Apache-2.0 |
| [USPTO FPD MCP](https://github.com/Tam1379/uspto_fpd_mcp) | USPTO Final Petition Decisions; análisis de patentes de alta performance | MIT |

---

## Benchmarks legales (2026) — estado del arte

| Benchmark | Tareas | Jurisdicciones | Ganador 2026 | Hallazgo clave |
|-----------|--------|---------------|--------------|----------------|
| Harvey LAB | 1,200+ (24 áreas práctica) | EE.UU. (common law) | Claude Sonnet 5 | Primer open-source de largo horizonte; 75k+ criterios |
| HAQQ-LAB | 300 (51 áreas práctica) | 20+ (US, UK, EU, UAE, DIFC, Saudi, Lebanon, Egypt, Qatar, SG, AU) | Claude Opus 4.8 — 30.02/35 | Civil law MENA; 24% hallucination rate en todos los modelos |
| LegalAgentBench | 300 (multi-hop) | China (civil law) | — | 37 herramientas, 17 corpus reales; paper ICLR 2025 |
| LegalBench | 162 | EE.UU. (inglés) | — | Estándar académico desde Stanford/Hazy Research |
| LRAGE | Multi-benchmark | Multi-jurisdicción | — | RAG evaluation: BM25+FAISS, integración smolagents |

> **Alerta**: HAQQ-LAB reveló que el **24% de todas las respuestas** de los 10 principales modelos frontiers citaron o aplicaron ley incorrectamente. 1,313 casos judiciales documentados con alucinaciones AI a julio 2026. La supervisión humana no es opcional.

---

## Harvey Legal Agent Benchmark (LAB) — Mayo 2026

Harvey lanzó el primer benchmark open-source para agentes legales de largo horizonte:
- 1,200+ tareas de agentes en **24 áreas de práctica legal**
- 75,000+ criterios de evaluación escritos por expertos legales
- Respaldado por NVIDIA, OpenAI, Anthropic, Mistral, DeepMind
- Fuente: [harvey.ai/blog/introducing-harveys-legal-agent-benchmark](https://www.harvey.ai/blog/introducing-harveys-legal-agent-benchmark)

---
*Actualizado automáticamente por el pipeline de ingest — v4 2026-07-08.*
