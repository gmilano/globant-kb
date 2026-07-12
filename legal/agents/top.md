# 🎯 Agentes AI — Legal Services

> Agentes y herramientas AI open source para la industria legal. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-12

## Agentes y herramientas destacadas

| Nombre | Licencia | Descripción | Stars |
|--------|----------|-------------|-------|
| [lavern](https://github.com/AnttiHero/lavern) | Apache-2.0 | Agentic law firm: 67 specialist AI agents reviewing documents via evidence-backed debate, 10-pass verification loop, mandatory human gates. v0.15.0 (May 2026). Runs on Anthropic, Mistral EU, or fully local via Ollama. 155k+ lines. | 267+ |
| [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | MIT | Open document intelligence platform — programmable citation graph over legal repositories. Built-in MCP server, GraphQL+REST API, React UI. Self-hosted. Annotate + extract + query contracts with agents. From Open Source Legal org. | 1.4k |
| [Docassemble](https://github.com/jhpyle/docassemble) | MIT | Free, open-source expert system for guided interviews and document assembly (Python/YAML/Markdown). Used by courts and legal aid orgs to automate intake forms, NDAs, wills, and pleadings. De facto standard in access-to-justice tech. | 2.9k |
| [LexNLP](https://github.com/LexPredict/lexpredict-lexnlp) | AGPLv3 | Python library for extracting 18+ types of structured information from legal text: dates, parties, money, citations, deadlines, definitions, regulations. Pre-LLM but vendored inside most commercial contract tools. | 790 |
| [DISC-LawLLM](https://github.com/FudanDISC/DISC-LawLLM) | Apache-2.0 | Chinese legal LLM system: case consultation, legal reasoning, judgment prediction, statute retrieval. Based on ChatGLM, fine-tuned on massive judicial corpus. Fudan University + Inspur. | 937 |
| [claude-legal-skill](https://github.com/evolsb/claude-legal-skill) | MIT | Contract review skill for Claude/Codex/Cursor: CUAD-based risk detection across 41 clause types, market benchmarks, lawyer-ready redlined output. Compatible with 26+ Claude Code tools. | 355 |
| [Blackstone](https://github.com/ICLRandD/Blackstone) | Apache-2.0 | spaCy pipeline for unstructured legal text — NER (LEGISLATION, CASE, COURT, JUDGE, PROVISION), sentence segmentation adapted to legal grammar, span categorizer. From Institute and Faculty of Actuaries R&D. | 691 |
| [legal-mcp](https://github.com/agentic-ops/legal-mcp) | MIT | Comprehensive MCP server for legal AI workflows — integrates with Claude, GPT-4, Gemini. No external calls by default; structured for extension (tools/, resources/, prompts/, integrations/). Designed to be forked per client. | 85 |
| [us-legal-mcp](https://github.com/JamesANZ/us-legal-mcp) | MIT | MCP server providing authoritative US legal information (Congress, Federal Register, CourtListener) into Claude Desktop, Cursor, and any MCP client. No API key required. Multi-source search across legislation, regulations, case law. | 42 |
| [open-legal-compliance-mcp](https://github.com/TCoder920x/open-legal-compliance-mcp) | MIT | MCP server for compliance analysis using free government APIs — searches US federal + state law, EU regulations (EUR-Lex), GDPR, AI Act provisions. Ideal for multi-jurisdictional compliance workflows. | 28 |

---

## Datasets y benchmarks de referencia

| Nombre | Licencia | Descripción | Uso |
|--------|----------|-------------|-----|
| [CUAD](https://github.com/TheAtticusProject/cuad) | CC BY 4.0 | Contract Understanding Atticus Dataset: 510 contracts, 13k+ expert annotations for 41 legal clause types. Gold standard for contract AI evaluation. | Fine-tuning / eval |
| [LegalBench](https://github.com/HazyResearch/legalbench) | CC BY 4.0 | 162 tasks for evaluating LLMs on legal reasoning: statutory interpretation, rule application, issue spotting, contract Q&A. Used by Harvey, Clio, Robin AI. | Benchmark |
| [LexGLUE](https://github.com/coastalcph/lex-glue) | Apache-2.0 | Legal language benchmark: 7 datasets spanning ECHR, EU legislation, US court opinions, and contract clauses. Standard for legal NLP papers. | NLP benchmark |
| [CourtListener](https://www.courtlistener.com/help/api/) | Free/CC | Free Law Project: 250M+ pages of US court opinions, dockets, oral arguments. REST API + bulk download. Critical data source for US case law RAG. | RAG / research |

---

## MCP Servers legales en producción (julio 2026)

El ecosistema MCP para legal creció 4x en H1 2026. El MCP Registry (registry.modelcontextprotocol.io) se convirtió en el "app store" de legal AI — Vaquill.ai lo documenta como el nuevo punto de integración estándar:

- **legal-mcp** — workflows generales, base para customización
- **us-legal-mcp** — legislación, regulaciones y jurisprudencia USA sin API key
- **open-legal-compliance-mcp** — compliance multi-jurisdicción (US + EU)
- **OpenContracts MCP** — citation graph sobre repositorio privado de contratos
- **CanLII MCP** (SkyWork AI) — jurisprudencia canadiense
- **uspto-fpd-mcp** — decisiones finales USPTO sobre patentes

---
*Actualizado automáticamente por el pipeline de ingest.*
