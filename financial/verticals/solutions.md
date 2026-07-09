# 🏭 Vertical Platforms — Financial Services

> Existing open source platforms to customize with AI. Strategy: fork a working system, add an agentic layer.
> Last updated: 2026-07-09

## Core Banking & Microfinance

| Platform | License | Repo | Stack | Stars | Add AI On Top |
|----------|---------|------|-------|-------|---------------|
| **Apache Fineract** | Apache-2.0 | [apache/fineract](https://github.com/apache/fineract) | Java, Spring Boot, REST API | 2.3k | Credit scoring agent, loan approval automation, fraud detection; 400+ institutions, 20M+ customers |
| **Mifos X** | MPL-2.0 | [openMF/mifos-mobile](https://github.com/openMF/mifos-mobile) | Android/iOS mobile banking | 750+ | Mobile banking agent: conversational loan applications, balance queries, payment routing |
| **open-bank-oss** | Apache-2.0 | [JiRaska/open-bank-oss](https://github.com/JiRaska/open-bank-oss) | Kotlin/Quarkus + Next.js, event-driven microservices | 6 | Modern cloud-native reference architecture; add AI agent services as microservices |

## ERP & Accounting

| Platform | License | Repo | Stars | Use Case |
|----------|---------|------|-------|---------|
| **Odoo** | LGPL / Enterprise | [odoo/odoo](https://github.com/odoo/odoo) | 36k | Full ERP: accounting, invoicing, treasury; add AI agent for financial reconciliation, forecasting |
| **ERPNext** | GPL-3.0 | [frappe/erpnext](https://github.com/frappe/erpnext) | 21k | Open source full ERP with accounting, payroll, GST; Frappe Python/Vue; strong India/LATAM adoption |
| **GnuCash** | GPL-2.0 | [Gnucash/gnucash](https://github.com/Gnucash/gnucash) | 4.5k | Desktop double-entry accounting; plugin API; AI can automate transaction categorization |
| **Apache OFBiz** | Apache-2.0 | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | 800+ | Enterprise ERP + CRM + GL; Java; extensible; add AI agents as service engine tasks |
| **Frappe Accounting** | MIT | [frappe/frappe](https://github.com/frappe/frappe) | 8k | Framework behind ERPNext; MIT license for the core; build custom finance apps with AI actions |

## Investment & Trading Platforms

| Platform | License | Repo | Stars | Use Case |
|----------|---------|------|-------|---------|
| **OpenBB** | AGPLv3 | [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) | 38.4k | Open data platform for analysts, quants, AI agents; MCP server integration; Python + CLI + API |
| **QuantConnect Lean** | Apache-2.0 | [QuantConnect/Lean](https://github.com/QuantConnect/Lean) | 19.9k | Multi-asset algo trading engine (equities, options, crypto, forex, futures); cloud + local deploy |
| **hummingbot** | Apache-2.0 | [hummingbot/hummingbot](https://github.com/hummingbot/hummingbot) | 19k | Market making + arbitrage bot; 40+ exchanges; strategies as Python scripts; scriptable AI strategies |
| **zipline-reloaded** | Apache-2.0 | [stefan-jansen/zipline-reloaded](https://github.com/stefan-jansen/zipline-reloaded) | 1.7k | Active fork of Quantopian's zipline backtester; event-driven; integrate FinRL signals |

## Compliance & RegTech

| Platform | License | Repo | Use Case |
|----------|---------|------|---------|
| **Great Expectations** | Apache-2.0 | [great-expectations/great_expectations](https://github.com/great-expectations/great_expectations) | 10k | Data quality for financial data pipelines; pair with AI agents to auto-detect anomalies |
| **Apache Atlas** | Apache-2.0 | [apache/atlas](https://github.com/apache/atlas) | 2.2k | Data governance, lineage, classification; pair with AI for AML audit trails |
| **auditLens pattern** | MIT | [SashaEee/auditLens](https://github.com/SashaEee/auditLens) | — | Deep-research LLM agent + RAG for internal bank product audit with cited references |

## How to Add AI to Any Platform

```
┌─────────────────────────────────┐
│  Open Source Platform           │  e.g., Apache Fineract, ERPNext
│  (core banking / ERP / trading) │
└─────────────────┬───────────────┘
                  │ REST API / webhooks
                  ▼
┌─────────────────────────────────┐
│  AI Integration Layer           │  LangGraph / LangChain / MCP
│  - Tool wrappers for platform   │
│  - Event listeners (webhooks)   │
└─────────────────┬───────────────┘
                  │
                  ▼
┌─────────────────────────────────┐
│  Specialized Financial Agents   │  FinRobot / FinSight / custom
│  - Credit scoring agent         │
│  - Fraud detection agent        │
│  - Reconciliation agent         │
│  - Compliance reporting agent   │
└─────────────────┬───────────────┘
                  │
                  ▼
┌─────────────────────────────────┐
│  Conversational UI / Dashboard  │  Claude / GPT-4o + Fineract UI
└─────────────────────────────────┘
```

## LATAM-Specific Recommendations

| Country | Platform | Why |
|---------|----------|-----|
| Brazil | Fineract + ERPNext | BCB open banking APIs; PIX integration; strong local dev community |
| Mexico | Apache Fineract | CNBV microfinance compliance; SPEI payment rails integration |
| Colombia | ERPNext | SFC compliance; local accounting standards; Frappe LATAM community |
| Argentina | GnuCash / ERPNext | Multi-currency critical (ARS/USD); offline-capable for connectivity gaps |

---
*See also: `agents/top.md` for AI agents to layer on these platforms.*
