# Vertical Solutions — Legal Industry

> Existing platforms customizable with AI. Strategy: start from something functional, add agentic layer on top.
> Last updated: 2026-07-12 (v11)

## Recommended Open Source Platforms

| Platform | License | URL | Stars | Stack | Use Case |
|----------|---------|-----|-------|-------|---------|
| **OpenContracts** | MIT | [github.com/Open-Source-Legal/OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | ~1.4k | Django + React + PostgreSQL + pgvector | Document intelligence, contract management, MCP-native DMS |
| **ArkCase** | Apache-2.0 | [arkcase.com](https://www.arkcase.com/product/arkcase-open-source-case-management-platform/) | — | Java + Spring + Angular | Legal case management, FOIA, complaint management. FedRAMP Authorized. v25.09.01 (Feb 2026). |
| **Lavern** | Apache-2.0 | [github.com/AnttiHero/lavern](https://github.com/AnttiHero/lavern) | ~2.1k | Node.js + LLM APIs | Full agentic law firm — contracts, due diligence, litigation support |
| **LegalMD** | MIT | [github.com/legalmd/legalmd](https://github.com/legalmd/legalmd) | ~340 | TypeScript + VS Code ext | Markdown dialect for legal documents — `@party`, `@cite`, `@clause`, `@deadline` primitives with citation verification |
| **Nomos** | Apache-2.0 | [github.com/nomos-law/nomos](https://github.com/nomos-law/nomos) | ~210 | Rust + Python | Programming language for legal reasoning: typed rules, jurisdiction/validity dates, LLM fact extraction, defeasible logic, proof trees citing statutes |
| **Blackstone** | Apache-2.0 | [github.com/ICLRandD/Blackstone](https://github.com/ICLRandD/Blackstone) | 691 | Python + spaCy | NLP foundation for legal text: NER, sentence segmentation, reference detection |
| **Corteza** | Apache-2.0 | [cortezaproject.org](https://cortezaproject.org/) | — | Go + Vue.js | Open source low-code platform — CRM + case management. Can host legal firm workflows. |
| **DISC-LawLLM** | Apache-2.0 | [github.com/FudanDISC/DISC-LawLLM](https://github.com/FudanDISC/DISC-LawLLM) | 937 | Python + ChatGLM | Chinese legal AI system — judgment generation, Q&A, judicial reasoning |

---

## Platform Selection Guide

### Contract Lifecycle Management (CLM)
**Start with**: OpenContracts (document platform + MCP) + claude-legal-skill (review)
- OpenContracts provides the document store, annotation, and citation graph
- claude-legal-skill does CUAD-based clause extraction and risk detection
- Lavern adds multi-agent review workflows on top
- Result: full CLM platform in < 4 weeks

### Legal Case Management
**Start with**: ArkCase Community Edition
- FedRAMP-authorized, Apache-2.0, Java/Spring/Angular
- Add AI layer: LangGraph orchestration + Claude for case analysis
- Add RAG: Blackstone NLP + pgvector for case law search
- Result: case management with AI-assisted research

### Regulatory Compliance Platform
**Start with**: Nomos (legal rules engine) + agent-governance-toolkit
- Nomos encodes jurisdiction-specific rules with validity dates
- agent-governance-toolkit enforces EU AI Act compliance at runtime
- Claude Sonnet interprets ambiguous regulations
- Result: auditable, explainable compliance system

### Document Intelligence (Enterprise)
**Start with**: OpenContracts
- Built-in MCP server exposes documents to any AI agent
- pgvector for semantic search across document corpus
- GraphQL API for integration with existing systems
- Human annotation layer for training data and corrections
- Result: enterprise document intelligence in weeks, not months

---

## How to Add AI to Any Platform

1. **MCP-first integration**: expose platform data as MCP resources (OpenContracts does this natively)
2. **RAG layer**: Blackstone NLP preprocessing → pgvector embeddings → semantic search
3. **Agent orchestration**: LangGraph or Lavern's workflow engine for multi-step tasks
4. **Governance layer**: agent-governance-toolkit as middleware before any agent action executes
5. **Conversational UI**: React + streaming responses + human-in-the-loop approval gates

---

## LATAM-Specific Considerations

- **Brazil**: Reforma Tributária (IBS/CBS) creates urgent need for tax-aware legal AI. Specialized agents emerging for Brazilian contract templates.
- **Spanish-speaking markets**: DISC-LawLLM approach (Chinese) can be replicated for Spanish legal corpus — opportunity for Globant.
- **Data sovereignty**: ArkCase self-hosted + OpenContracts self-hosted = full data in-country for LATAM legal firms.
- **Cost**: Using Ollama (local models) + OpenContracts self-hosted = zero per-token cost for high-volume document processing.
