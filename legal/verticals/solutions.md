# 🏭 Vertical Solutions — Legal Services

> Real platforms that can be customized with AI. Strategy: fork something functional, add an agentic layer on top.
> Last updated: 2026-07-15

## Core Platforms

| Platform | Repo / URL | License | Stack | Primary Use Case |
|----------|-----------|---------|-------|------------------|
| **Docassemble** | [jhpyle/docassemble](https://github.com/jhpyle/docassemble) | MIT | Python, YAML, Docker | Legal document automation. Guided interview flows → auto-generated PDFs/DOCX. Dominant in US legal aid, court self-help clinics. AI layer: add LLM backend for conversational intake. |
| **OpenLawOffice** | [NodineLegal/OpenLawOffice](https://github.com/NodineLegal/OpenLawOffice) | Apache-2.0 | Rails, PostgreSQL | Law office management: matter/case management, billing, tasks, contacts, time tracking. AI layer: add contract analysis + scheduling agent on top. |
| **OpenCLM** | [openclm.ai](https://openclm.ai/) | AGPL-3.0 | Docker, REST API | Contract Lifecycle Management: authoring, approval workflows, e-signatures, clause libraries, obligations, analytics. Self-hostable. Unlimited users. AI layer: pipe OpenCLM contracts through LLM clause review + risk rating. |
| **ERPNext (Frappe)** | [frappe/erpnext](https://github.com/frappe/erpnext) | GPL-3.0 | Python, MariaDB, Vue | Full ERP including HR, billing, project management. Legal module proposed for laws, contracts, certifications. AI layer: agent-driven contract generation and compliance tracking on Frappe framework. |
| **Twenty CRM** | [twentyhq/twenty](https://github.com/twentyhq/twenty) | AGPL-3.0 | TypeScript, PostgreSQL | Modern CRM with native MCP server — AI agents can query/update CRM directly without API glue. 45k+ stars. Good fit for law firm client relationship management with AI assistants. |
| **ContraxSuite** | [LexPredict/lexpredict-contraxsuite](https://github.com/LexPredict/lexpredict-contraxsuite) | MIT | Python, Django, PostgreSQL | Contract analytics platform built on LexNLP. Document upload, clause extraction, obligation tracking, reporting. Stack: LexNLP + Elasticsearch + LLM = full contract intelligence layer. |

## Open Data Platforms

| Platform | URL | License | Notes |
|----------|-----|---------|-------|
| **CourtListener** | [courtlistener.com](https://www.courtlistener.com/) | Apache-2.0 | 250M pages of US court data. REST API, bulk data downloads. Free Law Project. Build legal research agents on top. |
| **Harvard Caselaw Access Project** | [case.law](https://case.law/) | CC0 (bulk) | 6.9M US cases, 360 years of history. Fully public since 2024. Ideal RAG corpus for US legal precedent retrieval. |
| **EUR-Lex** | [eur-lex.europa.eu](https://eur-lex.europa.eu/) | Open (reuse permitted) | Full text of EU law: regulations, directives, case law. SPARQL endpoint + bulk XML. Essential for EU compliance agents. |
| **PACER / RECAP** | [free.law/recap](https://free.law/recap/) | Public domain | PACER federal court filings extracted by Free Law Project's RECAP browser extension. Millions of federal docket entries. |

## Recommended Stack for Law Firm AI (Self-Hosted)

```
Client intake       → Docassemble (YAML interview) + LLM backend (Ollama/SaulLM)
Matter management  → OpenLawOffice (Rails API)
Contract review    → OpenCLM → contract-review-agent → CUAD risk scoring
Legal research     → CourtListener API + RAG (Qdrant) + SaulLM-54B
Client CRM         → Twenty CRM (MCP-native, agent-queryable)
Document storage   → MinIO (S3-compatible, self-hosted)
LLM backend        → Ollama + SaulLM-7B (local) or SaulLM-54B (high accuracy)
```

## Customization Playbook

1. **Fork the base platform** (Docassemble or OpenCLM depending on use case)
2. **Add LLM endpoint** — environment variable pointing to Ollama/vLLM running SaulLM
3. **Wire intake → contract generation**: Docassemble interview → LLM drafts clauses → OpenCLM stores + tracks obligations
4. **Add review agent**: On contract upload, trigger contract-review-agent for CUAD clause analysis, return structured risk report
5. **Enable conversational UI**: Wrap existing views with a chat sidebar powered by SaulLM with RAG over the firm's document history

---
*See also: `repos/foundations.md` for data and model layers.*
