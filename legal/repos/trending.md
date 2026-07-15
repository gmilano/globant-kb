# 📈 Trending Repos — Legal AI

> GitHub trending repositories for legal AI. Week of 2026-07-15.

## Currently Trending

| Repo | License | Stars | What Makes It Notable |
|------|---------|-------|------------------------|
| [AnttiHero/lavern](https://github.com/AnttiHero/lavern) | Apache-2.0 | 267 | "Agentic law firm" — 67 specialist AI agents covering full law firm workflow from document intake to risk rating. Multi-agent orchestration pattern for legal services. |
| [evolsb/claude-legal-skill](https://github.com/evolsb/claude-legal-skill) | MIT | 355 | CUAD-powered contract review as a Claude agent skill. Clean example of attaching legal domain knowledge (CUAD 41 clause types) to an LLM skill layer. |
| [lowtidebuild/contract-review-agent](https://github.com/lowtidebuild/contract-review-agent) | Apache-2.0 | 40 | Local-first contract review: no cloud, runs on Ollama + SaulLM. Full pipeline from PDF to structured risk report. Good reference implementation. |
| [Tam1379/uspto_fpd_mcp](https://github.com/Tam1379/uspto_fpd_mcp) | MIT | 2 | MCP server wrapping USPTO Final Patent Decisions API. Early signal of "legal data as MCP tool" pattern that will define legal agents in 2026. |
| [kjgdgch65g/nl-rag-qdrant-legal](https://github.com/kjgdgch65g/nl-rag-qdrant-legal) | MIT | 6 | RAG reference implementation for legal Q&A using Qdrant. Private document set querying with source citations, configurable chunk strategy for long contracts. |
| [thm-msror/Unsupervised-CLM](https://github.com/thm-msror/Unsupervised-CLM) | MIT | — | Unsupervised AI-powered CLM: zero annotation needed, uses LLM to extract contract data and flag risks. QDB Hackathon 2025 winner. |
| [Kalyuzhner1966/uk-legal-workflows](https://github.com/Kalyuzhner1966/uk-legal-workflows) | unknown | 2 | UK-focused AI agent templates: compliance checking, contract automation, litigation support — English law jurisdiction. |
| [sandip-pathe/arin](https://github.com/sandip-pathe/arin) | unknown | 1 | Local-first legal document workspace for reading, summarizing, and discussing legal documents. Privacy-preserving, no cloud required. |
| [Afifmutaz/ClauseCopilot](https://github.com/Afifmutaz/ClauseCopilot) | unknown | 0 | Vendor contract analyzer providing risk assessment and redline suggestions at clause level. Early stage but clause-copilot pattern is emerging broadly. |

## Datasets Rising in Use

| Dataset | Source | License | What It's Used For |
|---------|--------|---------|---------------------|
| CUAD | [HuggingFace cuad](https://huggingface.co/datasets/cuad) | CC-BY-4.0 | 510 contracts, 41 clause categories. Standard training + eval benchmark for contract review agents. |
| Harvard Caselaw Access Project | [case.law](https://case.law/) | CC0 (bulk) | 6.9M US legal cases, 360 years of case law. Fully public since 2024. RAG source for precedent retrieval. |
| CourtListener | [courtlistener.com](https://www.courtlistener.com/) | Apache-2.0 | 250M pages of US court opinions. REST API for real-time case research agents. |
| ECtHR Dataset | [HuggingFace ecthr_cases](https://huggingface.co/datasets/ecthr_cases) | CC-BY-4.0 | European Court of Human Rights cases. Key for EU/international legal AI training. |

## Patterns Emerging in New Repos

1. **Offline-first legal agents**: Ollama + SaulLM + local Qdrant + Docassemble — no vendor lock-in, no data leak
2. **MCP-gated legal APIs**: Major legal data sources (USPTO, CourtListener, PACER, EUR-Lex) getting MCP wrappers so agents query them directly
3. **CUAD as universal contract benchmark**: New contract tools ship with CUAD baseline scores as a credibility signal
4. **Jurisdiction-specific agents**: UK, Chinese, EU law repos proliferating — moving beyond US-centric legal AI

---
*Auto-updated by ingest pipeline.*
