# 🏭 Vertical Platforms — Financial Services

> Existing open source platforms to customize with AI. Strategy: fork a working system, add an agentic layer.
> Last updated: 2026-07-10 (v6)

## Core Banking & Microfinance

| Platform | License | Repo | Stack | Stars | Add AI On Top |
|----------|---------|------|-------|-------|---------------|
| **Apache Fineract** | Apache-2.0 | [apache/fineract](https://github.com/apache/fineract) | Java, Spring Boot, REST API | 2.3k | Credit scoring agent (FinRL), loan approval automation, fraud detection, KYC; 400+ institutions, 20M+ customers in 80 countries |
| **FinAegis** | Apache-2.0 | [FinAegis/core-banking-prototype-laravel](https://github.com/FinAegis/core-banking-prototype-laravel) | Laravel 12, PHP 8.4, GraphQL, event sourcing | growing | **NEW v6** — AI-FIRST: 61 DDD bounded contexts; built-in MCP server (connect Claude Desktop/Cursor directly); x402/MPP machine payments native; multi-LLM (Claude + OpenAI); ISO 20022 / PSD2 / ACH / SEPA / FedNow; non-custodial wallet backend; AI agents can initiate accounts, loans, transfers via MCP |
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

## Agent Payment Infrastructure

> AI agents now have native payment rails — this changes what financial AI can do autonomously.

| Platform | License | Description | Production Status |
|----------|---------|-------------|------------------|
| **x402 Protocol** | Open/MIT | HTTP 402 payment for AI agents (Coinbase): server returns 402 → agent pays USDC → content unlocked; TypeScript/Python/Rust SDKs; MCP integration; AWS CloudFront + WAF native; **22-member Foundation** including Google, Microsoft, AWS, Visa, Mastercard, American Express, Shopify, Stripe, Cloudflare | ✅ Live — 165M+ txns, $600M annualized |
| **Coinbase Agentic Wallets** | MIT | Non-custodial wallets in TEEs for agents; programmable spending limits; multi-party approval; audit logs; built on x402 | ✅ Live Feb 2026 |
| **Mastercard Agent Pay for Machines** | Proprietary | Agentic Tokens: tokenized credential bound to specific agent + merchant scope + consent policy; machine-speed settlement; 30+ platform adopters (Stripe, Adyen, Checkout.com); **interoperating with x402 Foundation** | ✅ Live Jun 10, 2026 |
| **Visa Intelligent Commerce** | Proprietary + MCP SDK | MCP Server for Visa APIs; tokenization + real-time fraud monitoring for AI-initiated transactions; OpenAI partnership; **x402 interoperability collaboration** | ✅ Live 2026 |
| **FinAegis x402 module** | Apache-2.0 | x402 + MPP machine payments built into open source core banking — AI agents can initiate and settle transactions via REST/GraphQL/MCP natively | ✅ Available in FinAegis |

## How to Add AI to Any Platform

```
┌─────────────────────────────────┐
│  Open Source Platform           │  e.g., Apache Fineract, ERPNext, OpenBB, FinAegis
│  (core banking / ERP / trading) │
└─────────────────┬───────────────┘
                  │ REST API / webhooks / MCP
                  ▼
┌─────────────────────────────────┐
│  MCP Server Layer               │  FinAegis built-in, or wrap Fineract REST
│  (expose operations to agents)  │
└─────────────────┬───────────────┘
                  │ Tool calls
                  ▼
┌─────────────────────────────────┐
│  Claude / Multi-Agent Stack     │  TradingAgents, FinRobot, ATLAS, FinRL
│  (decision + orchestration)     │
└─────────────────┬───────────────┘
                  │ Actions + x402 payments
                  ▼
┌─────────────────────────────────┐
│  Payment Rails                  │  x402 USDC, Mastercard AP4M, Visa IC
│  (settle agent transactions)    │
└─────────────────────────────────┘
```

## Platform Selection Guide (LATAM Focus)

| Client Type | Recommended Platform | AI Layer | Why |
|------------|---------------------|---------|-----|
| Microfinance / neobank | Apache Fineract | FinRL + Claude | Battle-tested, 400+ institutions, LATAM-native |
| Greenfield fintech (PHP team) | FinAegis | Claude MCP native | AI-first from day 1; x402 payments built in |
| SME / mid-market | ERPNext | AI CFO agents | GPL ok for on-premise; LATAM tax compliance |
| Asset manager / family office | OpenBB + FinSight | FinSight + TradingAgents | ACL 2026 SOTA research quality |
| Crypto / DeFi | hummingbot + CCXT | FinRL + ATLAS | High-frequency, self-improving |
| Bank (enterprise) | Apache Fineract + OFBiz | FinRobot + compliance agents | Apache-2.0, enterprise Java |

---
*Auto-updated by the Globant AI Studios ingest pipeline.*
