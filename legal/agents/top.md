# 🎯 Agentes AI — Legal Services

> Agentes y herramientas AI open source para la industria legal. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-11 (v10)

## Agentes y herramientas destacadas

| Nombre | Licencia | Descripción | Stars |
|--------|----------|-------------|-------|
| [OpenContracts (cite)](https://github.com/Open-Source-Legal/OpenContracts) | MIT | Open document intelligence platform — DMS for the agentic world. Programmable citation graph, human annotation, structured extraction, built-in MCP server, GraphQL + REST API. v3 "cite" release Jun 2026. Self-hostable. | 1.4k |
| [Docassemble](https://github.com/jhpyle/docassemble) | MIT | Free, open-source expert system for guided interviews and document assembly. Python/YAML/Markdown. Auto-determines question flow. Industry standard for legal document automation since 2016. 100s of legal aid implementations. | 1.2k |
| [DISC-LawLLM](https://github.com/FudanDISC/DISC-LawLLM) | Apache-2.0 | Chinese legal LLM system (Fudan + Inspur + China University of Political Science). ChatGLM-based, trained on massive Chinese judicial corpus. Full pipeline: query → retrieval → generation. 9+ legal NLP datasets. | 937 |
| [Blackstone](https://github.com/ICLRandD/Blackstone) | Apache-2.0 | spaCy pipeline and model for NLP on unstructured legal text. Trained on UK case law. Named entity recognition, sentence boundary detection, legislation detection for legal corpora. | 691 |
| [LegalBench](https://github.com/HazyResearch/legalbench) | Apache-2.0 | Open science benchmark: 162 legal reasoning tasks designed by lawyers, covering contract analysis, statutory interpretation, and case law. Stanford / Hazy Research. Replacing LexGLUE in practice. | 520 |
| [claude-legal-skill](https://github.com/evolsb/claude-legal-skill) | MIT | AI-powered contract review skill with CUAD risk detection, market benchmarks, and lawyer-ready redlines. Follows open AgentSkills standard. Works with Claude Code, Codex, Cursor, 26+ tools. | 355 |
| [lavern](https://github.com/AnttiHero/lavern) | Apache-2.0 | Agentic law firm: 67 specialist AI agents that review documents through evidence-backed debate, mandatory human gates, and a 10-pass verification loop. Built for production law firms. | 267 |
| [awesome-legaltech](https://github.com/Vaquill-AI/awesome-legaltech) | MIT | Curated list of LegalTech resources: open source platforms, AI models, MCP servers, companies, datasets, and tools for the global legal ecosystem. Maintained 2026. | 210 |
| [AgentCounsel](https://github.com/zgbrenner/agentcounsel) | Apache-2.0 | AI-agnostic legal skills library: 198 skills across 20 practice areas + 35 cross-cutting (Legal Ops, Methodology, Setup). Plain Markdown SKILL.md format — works with any MCP agent. | 120 |
| [Nomos](https://github.com/nomos-legal/nomos) | Apache-2.0 | Programming language for legal reasoning. Typed rules with jurisdiction and validity dates, LLM-powered fact extraction, defeasible logic, and proof trees that cite statutes and cases. Novel formal approach to encoding law. | ~90 |
| [ContractGuard](https://github.com/he-yufeng/ContractGuard) | MIT | AI agent that reads every clause, flags red flags and unfair terms in plain English, surfaces what to negotiate — in under 30 seconds. Upload any contract. | 85 |
| [ai-legal-claude](https://github.com/zubair-trabzada/ai-legal-claude) | MIT | AI Legal Assistant for Claude Code: contract review, risk analysis, NDA generation, compliance auditing, negotiation strategy, PDF reports — 14 skills, 5 parallel agents. | 85 |
| [LegalBench-RAG](https://github.com/ZeroEntropy-AI/legalbenchrag) | Apache-2.0 | First open-source retrieval benchmark for the legal domain. Tests RAG pipelines on legal documents: 2,400+ QA pairs, 6 legal domains. Paper: arXiv 2408.10343. | 140 |

---

## Por área de práctica

### Revisión de contratos
- `claude-legal-skill` — CUAD risk detection + redlines (MIT)
- `ContractGuard` — flag unfair clauses in 30s (MIT)
- `AgentCounsel` — 198 practice-area skills including CLM (Apache-2.0)
- `ai-legal-claude` — 5 parallel review agents (MIT)

### Research Legal
- `LegalBench` — benchmark and evaluate LLM legal reasoning (Apache-2.0)
- `LegalBench-RAG` — RAG pipeline evaluation on legal docs (Apache-2.0)
- `Blackstone` — NLP for unstructured UK/common law text (Apache-2.0)
- `DISC-LawLLM` — Chinese judicial corpus + ChatGLM (Apache-2.0)

### Razonamiento legal formal
- `Nomos` — typed rules, defeasible logic, proof trees with statute citations (Apache-2.0)

### Automatización de documentos
- `Docassemble` — guided interview → document generation (MIT)
- `OpenContracts` — annotation graph + MCP server + extraction (MIT)

### Orquestación multi-agente
- `lavern` — 67 agents + debate + human gates (law firm pattern) (Apache-2.0)
- `AgentCounsel` — 198 skills composables via MCP (Apache-2.0)

---

## MCP Servers para Legal (jurisdicciones)

| Servidor | Licencia | Cobertura |
|----------|----------|-----------|
| [uspto_fpd_mcp](https://github.com/Tam1379/uspto_fpd_mcp) | MIT | USPTO Final Petition Decisions — patent analysis |
| Korean Law MCP | MIT | 41 Korean government legal APIs |
| [ayunis-legal-mcp](https://github.com/ayunis/ayunis-legal-mcp) | MIT | German legal codes (BGB, HGB, etc.) |
| Pasal MCP | MIT | 40,000+ Indonesian regulations |
| Yargı MCP | MIT | Turkish legal databases |
| MCP Taiwan Legal DB | MIT | Taiwan judicial records |

---
*Actualizado automáticamente por el pipeline de ingest. v10 — 2026-07-11.*
