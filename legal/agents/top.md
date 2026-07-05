# 🎯 Agentes AI — Legal Services

> Agentes y herramientas AI open source para la industria legal. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-05

## Agentes y herramientas destacadas

| Nombre | Licencia | Descripción | Stars |
|--------|----------|-------------|-------|
| [lavern](https://github.com/AnttiHero/lavern) | Apache-2.0 | Agentic law firm: 67 specialist AI agents review docs via evidence-backed debate, mandatory human gates, 10-pass verification loop | 267★ |
| [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | MIT | Self-hosted open document intelligence platform: programmable citation graph, human annotation, AI agents, MCP server, vector search | 920★ |
| [docassemble](https://github.com/jhpyle/docassemble) | MIT | Gold-standard guided legal interview + document assembly platform; powers pro-bono/court self-help portals globally | 2.6k★ |
| [DISC-LawLLM](https://github.com/FudanDISC/DISC-LawLLM) | Apache-2.0 | Chinese judicial LLM (Fudan/Inspur/CUPL): legal provision retrieval, case analysis, syllogistic reasoning for judgments | 937★ |
| [LexNLP](https://github.com/LexPredict/lexpredict-lexnlp) | Apache-2.0 | Production-grade contract NLP library: clause extraction, date/party/obligation parsing, CUAD-compatible | 3.2k★ |
| [Blackstone](https://github.com/ICLRandD/Blackstone) | Apache-2.0 | spaCy pipeline for unstructured legal text (UK case law); NER for provisions, citations, instruments | 691★ |
| [LegalBench](https://github.com/HazyResearch/legalbench) | MIT | Stanford HazyResearch: 162-task legal reasoning benchmark for LLMs — contract interpretation, statutory analysis, case classification | 820★ |
| [agentcounsel](https://github.com/zgbrenner/agentcounsel) | MIT | Open-source AI-agnostic skills for legal teams; plug into Claude Code, Cursor, and 26+ tools | 180★ |
| [claude-legal-skill](https://github.com/evolsb/claude-legal-skill) | MIT | Contract review skill: CUAD risk detection, market benchmarks, lawyer-ready redlines, PDF reports | 355★ |
| [legalbenchrag](https://github.com/zeroentropy-ai/legalbenchrag) | MIT | LegalBench-RAG: RAG-specific legal retrieval benchmark (ICAIL 2025); tests retrieval precision over case law corpora | 310★ |

---

## Cuándo usar cada agente

| Caso de uso | Agente recomendado |
|-------------|-------------------|
| Revisión de contratos | OpenContracts + LexNLP + claude-legal-skill |
| Due diligence M&A | lavern (67-agent pipeline) |
| Entrevistas guiadas y formularios | docassemble |
| NLP sobre ley española/LATAM | Blackstone (adaptar) + LexNLP |
| Benchmarking de modelos legales | LegalBench + legalbenchrag |
| Equipo legal en firma mediana | agentcounsel + OpenContracts |

---
*Actualizado automáticamente por el pipeline de ingest.*
