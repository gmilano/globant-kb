# Vertical Solutions — Financial Services

> Existing open-source platforms that can be customized with an AI layer.
> Model: start from something functional, add the agentic layer on top.
> Last updated: 2026-07-06

## Core Banking

| Platform | License | Stars | Stack | AI Customization Path |
|----------|---------|-------|-------|----------------------|
| [Apache Fineract](https://github.com/apache/fineract) | Apache-2.0 | ~1.8k | Java/Spring Boot, REST APIs, MySQL/PostgreSQL | Full API surface for agent wrapping: loan origination agent, KYC automation agent, transaction monitoring agent. AI Agent Skill available (`npx skills add apache/fineract`). Active MCP integration work underway. |
| [Mifos X / Community App](https://github.com/openMF/community-app) | MPL-2.0 | ~350 | AngularJS front-end on Fineract backend | Reference implementation for microfinance; use Fineract REST API + an LLM layer for field agent mobile copilot. Used in 50+ countries for financial inclusion. |
| [open-bank-oss](https://github.com/JiRaska/open-bank-oss) | Apache-2.0 | ~6 | Kotlin/Quarkus + Next.js, event-driven microservices | New (2026), architecturally modern, designed for cloud-native + AI integration from the start. Good greenfield starting point. |

## Accounting & ERP (Finance Module)

| Platform | License | Stars | Stack | AI Customization Path |
|----------|---------|-------|-------|----------------------|
| [ERPNext / Frappe](https://github.com/frappe/erpnext) | GPL-3.0 | ~22k | Python/Frappe framework, MariaDB | Full-featured accounting, invoicing, payroll. Frappe AI SDK allows adding agents on top. Frappe Cloud or self-host. Widely used in LATAM mid-market. |
| [Odoo (Community)](https://github.com/odoo/odoo) | LGPL-3.0 (community) | ~52.8k | Python/PostgreSQL | Most complete open-source ERP. Finance modules: accounting, expense, payroll, bank sync. Add AI copilot via Odoo's module system + local Ollama or Anthropic API. €7B valuation; 12M+ users. |
| [Akaunting](https://github.com/akaunting/akaunting) | GPL-3.0 | ~8.7k | Laravel/PHP, Vue.js | SME-focused accounting. Online payments, invoicing, expense tracking, multi-currency. REST API for AI agent integration. Widely used in LATAM SMEs. |
| [Dolibarr](https://github.com/Dolibarr/dolibarr) | GPL-3.0 | ~5.4k | PHP/HTML/JS | ERP + CRM for SMEs: invoicing, contracts, bank, expense reports. REST API v2 available. Simple to add an LLM module. |

## Investment & Trading Infrastructure

| Platform | License | Stars | Stack | AI Customization Path |
|----------|---------|-------|-------|----------------------|
| [OpenBB](https://github.com/OpenBB-finance/OpenBB) | AGPL-3.0 | ~70k | Python, FastAPI, React | Replace Bloomberg Terminal data layer. MCP server: Claude queries equity data, macro indicators, earnings. Build research analyst agents directly on top. |
| [zipline-reloaded](https://github.com/stefan-jansen/zipline-reloaded) | Apache-2.0 | ~1.8k | Python | Algorithmic trading backtest engine. Integrate ML signals (FinGPT sentiment, FinRL models) as alpha factors in a Zipline pipeline. |
| [hummingbot](https://github.com/hummingbot/hummingbot) | Apache-2.0 | ~19k | Python, AsyncIO | Market-making + strategy execution. Add LLM-powered strategy selection: agent reads market microstructure, chooses strategy parameters. |

## Payments & Compliance

| Platform | License | Stars | Stack | AI Customization Path |
|----------|---------|-------|-------|----------------------|
| [OpenPayments / Rafiki](https://github.com/interledger/rafiki) | Apache-2.0 | ~850 | TypeScript/Node, PostgreSQL | Open Payments implementation by Interledger Foundation. Wallet-side agent: autonomous payment routing, peer payment instructions. |
| [FINOS Projects](https://github.com/finos) | Apache-2.0 / MIT | Various | Java / Python | Fintech Open Source Foundation (Linux Foundation). Projects: Legend (data modeling), Perspective (real-time data viz), FDC3 (desktop interoperability). Enterprise fintech AI building blocks. |
| [great_expectations](https://github.com/great-expectations/great_expectations) | Apache-2.0 | ~10.4k | Python | Data quality validation. Build a financial data quality agent that monitors pipeline integrity — critical for regulatory reporting. |

## How to customize any of these with AI

```
Step 1: Fork the repo (or run it locally / docker-compose up)
Step 2: Map the REST / event API surface
Step 3: Build an MCP server or LangGraph tool wrapping the APIs
Step 4: Layer on a domain LLM (FinGPT for financial reasoning)
Step 5: Define agent goals: "process loan application", "flag AML transaction", "generate P&L report"
Step 6: Add human-in-the-loop gates for high-risk financial decisions (regulatory requirement)
Step 7: Deploy with observability (Langfuse / OpenTelemetry traces on all agent decisions)
```

## LATAM-specific considerations

- **Odoo** is the most deployed open-source ERP in LATAM mid-market — highest leverage for Globant
- **Apache Fineract** powers microfinance in Brazil, Colombia, Mexico — MFI clients are a direct opportunity
- **ERPNext / Frappe** growing in LATAM tech-forward mid-market companies
- EU AI Act (Aug 2026) affects any EU-facing financial AI — build human-review gates into any Fineract/Odoo AI agent from day one

---
*See `compose/patterns.md` for concrete wiring recipes.*
