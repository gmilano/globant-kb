# 🎯 Agentes AI — Legal

> Agentes y herramientas AI open source para la industria legal. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-07

## Agentes y herramientas destacadas

| Nombre | Licencia | Stars | Descripción |
|--------|----------|-------|-------------|
| [Open-Source-Legal/OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | MIT | ~1.4k | Document intelligence platform with programmable citation graph, human annotation, structured extraction, AI agents, and built-in MCP server at /mcp/. Self-hosted DMS for the agentic world. Ships /llms.txt and /.well-known/mcp.json. |
| [willchen96/mike](https://github.com/willchen96/mike) | AGPL-3.0 | ~2.2k | Open-source Harvey/Legora alternative built by former Latham & Watkins associate Will Chen. Document-aware chat for contracts, tabular extraction across hundreds of docs, Claude+Gemini API backends. 2.2k★ + 614 forks in first week (May 2026). |
| [AnttiHero/lavern](https://github.com/AnttiHero/lavern) | Apache-2.0 | ~400 | Agentic law firm: 67 specialist AI agents (59 specialists, 7 orchestrators, 1 base) reviewing documents through evidence-backed debate. 10-pass verification loop, mandatory human gates. 155k+ lines of code. Claude/Mistral backends. |
| [FudanDISC/DISC-LawLLM](https://github.com/FudanDISC/DISC-LawLLM) | Apache-2.0 | ~937 | Chinese legal LLM fine-tuned from Baichuan-13B on judicial corpora. Multi-turn legal consultation, court case retrieval, examination assistance. LawBench SOTA for Chinese law. |
| [ICLRandD/Blackstone](https://github.com/ICLRandD/Blackstone) | Apache-2.0 | ~691 | spaCy NLP pipeline and models for unstructured English legal text: named entity recognition (cases, courts, dates, instruments, judges, locations, organisations), sentence segmentation aware of legal abbreviations. |
| [LexPredict/lexpredict-lexnlp](https://github.com/LexPredict/lexpredict-lexnlp) | AGPL-3.0 | ~790 | Legal NLP library powering ContraxSuite: extracts 18+ entity types (dates, amounts, durations, geoentities, parties, definitions, conditions, terminations, regulations), pre-trained legal word embeddings. Python. |
| [HazyResearch/legalbench](https://github.com/HazyResearch/legalbench) | MIT | ~620 | 162-task benchmark suite for evaluating LLM legal reasoning: contract NLI, statutory reasoning, CUAD issue spotting, privacy policy, international law. Gold standard for legal LLM evaluation. |
| [coastalcph/lex-glue](https://github.com/coastalcph/lex-glue) | MIT | ~410 | LexGLUE benchmark for legal language understanding: 7 classification tasks (ECtHR, EURLEX, SCOTUS, LEDGAR, UNFAIR-ToS, CaseHOLD). Multi-task fine-tuning baselines for BERT/RoBERTa/Longformer. |
| [evolsb/claude-legal-skill](https://github.com/evolsb/claude-legal-skill) | MIT | ~355 | Claude Code skill for AI-powered contract review: CUAD-based risk detection, market benchmark scoring, lawyer-ready redlines. Works with Claude Code, Codex, Cursor. |
| [maastrichtlawtech/awesome-legal-nlp](https://github.com/maastrichtlawtech/awesome-legal-nlp) | MIT | ~331 | Curated list of Legal NLP resources: datasets (CUAD, LEDGAR, CaseHOLD, ContractNLI, MultiLexSum), models, papers, tools, benchmarks. Maintained by Maastricht Law Tech. |

---

## MCP Servers para Legal AI

| Servidor | Licencia | Descripción |
|----------|----------|--------------|
| [OpenContracts /mcp/](https://github.com/Open-Source-Legal/OpenContracts) | MIT | Corpus management, document search, annotation queries, citation graph traversal |
| [agentic-ops/legal-mcp](https://github.com/agentic-ops/legal-mcp) | MIT | Comprehensive MCP server for legal workflows: contract analysis, clause extraction, compliance checks |
| [Tam1379/uspto_fpd_mcp](https://github.com/Tam1379/uspto_fpd_mcp) | MIT | USPTO Final Petition Decisions: high-performance patent analysis with context reduction |

---

## Datasets clave

| Dataset | Tamaño | Tarea | Licencia |
|---------|--------|-------|----------|
| CUAD (Contract Understanding Atticus Dataset) | 510 contratos, 13k+ anotaciones | Clause extraction, risk detection | CC BY 4.0 |
| LEDGAR | 850k+ cláusulas | Clause classification | CC BY 4.0 |
| CaseHOLD | 53k+ citas | Legal holding prediction | CC BY 4.0 |
| MultiLexSum | 41k+ documentos | Legal summarization | CC BY 4.0 |
| ContractNLI | 607 contratos | NLI on contracts | Research |

---
*Actualizado automáticamente por el pipeline de ingest.*
