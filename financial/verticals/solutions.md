# 🏭 Vertical Platforms — Financial Services

> Existing open source platforms to customize with AI. Strategy: fork a working system, add an agentic layer.
> Last updated: 2026-07-09 (v5)

## Core Banking & Microfinance

| Platform | License | Repo | Stack | Stars | Add AI On Top |
|----------|---------|------|-------|-------|---------------|
| **Apache Fineract** | Apache-2.0 | [apache/fineract](https://github.com/apache/fineract) | Java, Spring Boot, REST API | 2.3k | Credit scoring agent (FinRL), loan approval automation, fraud detection, KYC; 400+ institutions, 20M+ customers in 80 countries |
| **Mifos X** | MPL-2.0 | [openMF/mifos-mobile](https://github.com/openMF/mifos-mobile) | Android/iOS mobile banking | 750+ | Mobile banking agent: conversational loan applications, balance queries, payment routing via WhatsApp or Telegram |
| **open-bank-oss** | Apache-2.0 | [JiRaska/open-bank-oss](https://github.com/JiRaska/open-bank-oss) | Kotlin/Quarkus + Next.js, event-driven microservices | 6 | Modern cloud-native reference architecture; AI agents as microservices on event bus |

## ERP & Accounting

| Platform | License | Repo | Stars | Use Case |
|----------|---------|------|-------|---------|
| **Odoo** | LGPL / Enterprise | [odoo/odoo](https://github.com/odoo/odoo) | 36k | Full ERP: accounting, invoicing, treasury; add AI agent for financial reconciliation, cash flow forecasting |
| **ERPNext** | GPL-3.0 | [frappe/erpnext](https://github.com/frappe/erpnext) | 21k | Open source ERP: accounting, payroll, GST/LATAM taxes; Frappe Python/Vue; strong India/LATAM adoption; AI CFO layer target |
| **GnuCash** | GPL-2.0 | [Gnucash/gnucash](https://github.com/Gnucash/gnucash) | 4.5k | Double-entry accounting; plugin API; AI automates transaction categorization and reconciliation |
| **Apache OFBiz** | Apache-2.0 | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | 800+ | Enterprise ERP + CRM + GL; Java; extensible; add AI agents as service engine tasks |
| **Frappe Framework** | MIT | [frappe/frappe](https://github.com/frappe/frappe) | 8k | Core framework behind ERPNext; MIT license; build custom finance apps with AI agent actions |

## Investment & Trading Platforms

| Platform | License | Repo | Stars | Use Case |
|----------|---------|------|-------|---------|
| **OpenBB** | AGPLv3 | [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) | 38.4k | Open data platform for analysts, quants, AI agents; MCP server integration; Python + CLI + REST API |
| **QuantConnect Lean** | Apache-2.0 | [QuantConnect/Lean](https://github.com/QuantConnect/Lean) | 19.9k | Multi-asset algo trading engine (equities, options, crypto, forex, futures); cloud + local deploy |
| **hummingbot** | Apache-2.0 | [hummingbot/hummingbot](https://github.com/hummingbot/hummingbot) | 19k | Market making + arbitrage bot; 40+ exchanges; strategies as Python scripts; scriptable AI strategies |
| **zipline-reloaded** | Apache-2.0 | [stefan-jansen/zipline-reloaded](https://github.com/stefan-jansen/zipline-reloaded) | 1.7k | Active fork of Quantopian's zipline backtester; event-driven; integrate FinRL signals |

## Compliance & RegTech

| Platform | License | Repo | Use Case |
|----------|---------|------|---------|
| **Great Expectations** | Apache-2.0 | [great-expectations/great_expectations](https://github.com/great-expectations/great_expectations) | 10k | Data quality for financial pipelines; pair with AI agents to auto-detect anomalies in training data |
| **Apache Atlas** | Apache-2.0 | [apache/atlas](https://github.com/apache/atlas) | 2.2k | Data governance, lineage, classification; audit trail for EU AI Act Article 12 compliance (10-year log retention) |
| **auditLens pattern** | MIT | [SashaEee/auditLens](https://github.com/SashaEee/auditLens) | — | LLM + RAG for internal bank product audit with cited references; explainability pattern |

## Agent Payment Infrastructure (NEW v5)

> AI agents now have native payment rails — this changes what financial AI can do autonomously.

| Platform | License | Description | Production Status |
|----------|---------|-------------|------------------|
| **x402 Protocol** | Open/MIT | HTTP 402 payment for AI agents (Coinbase): server returns 402 → agent pays USDC → content unlocked; TypeScript/Python/Rust SDKs; MCP integration; AWS CloudFront + WAF native | ✅ Live — 165M+ txns, $600M annualized |
| **Coinbase Agentic Wallets** | MIT | Non-custodial wallets in TEEs for agents; programmable spending limits; multi-party approval; audit logs; built on x402 | ✅ Live Feb 2026 |
| **Mastercard Agent Pay** | Proprietary | Agentic Tokens: tokenized credential bound to specific agent + merchant scope + consent policy; machine-speed settlement; 30+ platform adopters (Stripe, Adyen, Checkout.com) | ✅ Live Jun 10, 2026 |
| **Visa Intelligent Commerce** | Proprietary + MCP SDK | MCP Server for Visa APIs; tokenization + real-time fraud monitoring for AI-initiated transactions; OpenAI partnership | ✅ Live 2026 |

## How to Add AI to Any Platform

```
┌─────────────────────────────────┐
│  Open Source Platform           │  e.g., Apache Fineract, ERPNext, OpenBB
│  (core banking / ERP / trading) │
└─────────────────┬───────────────┘
                  │ REST API / webhooks / MCP
                  ▼
┌─────────────────────────────────┐
│  AI Integration Layer           │  LangGraph / LangChain / MCP
│  - Tool wrappers for platform   │
│  - Event listeners (webhooks)   │
│  - x402 payment capability      │
└─────────────────┬───────────────┘
                  │
                  ▼
┌─────────────────────────────────┐
│  Specialized Financial Agents   │  FinRobot / FinSight / FinClaw / custom
│  - Credit scoring agent         │
│  - Fraud detection agent        │
│  - Reconciliation agent         │
│  - Compliance reporting agent   │
│  - Payment execution agent      │
└─────────────────┬───────────────┘
                  │
                  ▼
┌─────────────────────────────────┐
│  Conversational UI / Dashboard  │  Claude + Fineract UI / ERPNext UI
└─────────────────────────────────┘
```

## LATAM-Specific Recommendations

| Country | Platform | Why |
|---------|----------|-----|
| Brazil | Fineract + ERPNext | BCB open banking APIs; PIX integration; strong local dev community |
| Mexico | Apache Fineract | CNBV microfinance compliance; SPEI payment rails integration |
| Colombia | ERPNext | SFC compliance; local accounting standards; Frappe LATAM community |
| Argentina | GnuCash / ERPNext | Multi-currency critical (ARS/USD); offline-capable for connectivity gaps |
| LATAM-wide | x402 + Fineract | Stablecoin-based cross-border SME payments; avoiding traditional correspondent banking friction |

---
*See also: `agents/top.md` for AI agents to layer on these platforms.*
