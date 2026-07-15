# 📈 Trending This Week — Legal AI

> What's gaining momentum in legal AI. Week of 2026-07-15.

## Breakout Projects (July 2026)

| Name | Repo | License | Signal |
|------|------|---------|--------|
| Lavern | [AnttiHero/lavern](https://github.com/AnttiHero/lavern) | Apache-2.0 | 67-agent orchestrated law firm. Multi-agent document review workflow that passes briefs through specialized reviewer agents (contract-specialist, compliance-checker, risk-rater). Rapid star growth. |
| claude-legal-skill | [evolsb/claude-legal-skill](https://github.com/evolsb/claude-legal-skill) | MIT | CUAD-based risk detection as a Claude skill. Fastest path to plug CUAD clause risk tags into a Claude Code workspace. |
| uk-legal-workflows | [Kalyuzhner1966/uk-legal-workflows](https://github.com/Kalyuzhner1966/uk-legal-workflows) | unknown | UK Legal AI Agents 2026 — automation templates for compliance, contracts, and litigation under English law. |
| nl-rag-qdrant-legal | [kjgdgch65g/nl-rag-qdrant-legal](https://github.com/kjgdgch65g/nl-rag-qdrant-legal) | MIT | RAG over legal documents using Qdrant vector DB. Reference implementation for legal Q&A over private document sets. |
| uspto_fpd_mcp | [Tam1379/uspto_fpd_mcp](https://github.com/Tam1379/uspto_fpd_mcp) | MIT | MCP server for USPTO Final Patent Decisions. Brings patent case data into any MCP-compatible agent workspace. |
| Unsupervised-CLM | [thm-msror/Unsupervised-CLM](https://github.com/thm-msror/Unsupervised-CLM) | MIT | AI-powered CLM built at QDB Hackathon 2025. Extracts key data and risk flags from contracts in seconds with no pre-labeling. |

## Key Themes This Week

### Agentic Law Firm Pattern
Multi-agent architectures where each agent owns a specialized legal role (contract-reader, risk-rater, redline-drafter) are the dominant pattern in new repos. Lavern is the clearest example: 67 specialist agents covering an entire law firm's workflow.

### MCP for Legal Data Sources
MCP servers wrapping legal databases (USPTO, CourtListener, PACER) are emerging, turning previously siloed public legal data into first-class tools for agent workspaces. USPTO MCP is a signal of this trend.

### Local-First / On-Premise Priority
Data sovereignty is a hard requirement in legal. New projects uniformly advertise local-first, self-hosted, no-data-leaves-your-server architecture. The open source stack (Ollama + SaulLM + Qdrant + Docassemble) is a credible alternative to Harvey AI at 1/10th the cost.

### SaulLM Family Expansion
Equall released SaulLM-54B and SaulLM-141B in 2026, achieving state-of-the-art on LegalBench and outperforming GPT-4 across US legal analysis tasks. Both available under MIT. Legal firms are moving from GPT-4-based solutions to on-premise SaulLM deployments.

### CUAD Dataset Integration
The Contract Understanding Atticus Dataset (CUAD, Apache-2.0) with 510 contracts and 41 clause types is becoming the standard benchmark and training target for contract review agents. Multiple new repos integrate CUAD risk detection directly.

---
*Pipeline auto-update — refreshed each run.*
