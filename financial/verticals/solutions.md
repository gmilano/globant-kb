# 🏭 Vertical Platforms — Financial Services

> Existing open source platforms to customize with AI. Strategy: fork a working system, add an agentic layer.
> Last updated: 2026-07-11 (v8)

## Core Banking & Microfinance

| Platform | License | Repo | Stack | Stars | Add AI On Top |
|----------|---------|------|-------|-------|---------------|
| **Apache Fineract** | Apache-2.0 | [apache/fineract](https://github.com/apache/fineract) | Java, Spring Boot, REST API | 2.3k | Credit scoring agent (FinRL/FinRL-X), loan approval automation, fraud detection, KYC; 400+ institutions, 20M+ customers in 80 countries |
| **FinAegis** | Apache-2.0 | [FinAegis/core-banking-prototype-laravel](https://github.com/FinAegis/core-banking-prototype-laravel) | Laravel 12, PHP 8.4, GraphQL, event sourcing | growing | AI-FIRST: 61 DDD bounded contexts; built-in MCP server (connect Claude Desktop/Cursor directly); x402/MPP machine payments native; multi-LLM (Claude + OpenAI); ISO 20022 / PSD2 / ACH / SEPA / FedNow; AI agents initiate accounts, loans, transfers via MCP |
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
| **zipline-reloaded** | Apache-2.0 | [stefan-jansen/zipline-reloaded](https://github.com/stefan-jansen/zipline-reloaded) | 1.7k | Active fork of Quantopian's zipline backtester; event-driven; integrate FinRL-X signals |
| **AI Berkshire** | MIT | [xbtlin/ai-berkshire](https://github.com/xbtlin/ai-berkshire) | 11.8k+ | Claude Code native value investing: 4-master methodology debate as slash commands; ¥1.46M+ live returns; drop-in for wealth management / family office workflows |

## Compliance & RegTech

| Platform | License | Repo | Use Case |
|----------|---------|------|---------|
| **Great Expectations** | Apache-2.0 | [great-expectations/great_expectations](https://github.com/great-expectations/great_expectations) | Data quality for financial pipelines; pair with AI agents to auto-detect anomalies in training data; required for SR 26-2 model validation documentation |
| **Apache Atlas** | Apache-2.0 | [apache/atlas](https://github.com/apache/atlas) | Data governance, lineage, classification; audit trail for EU AI Act Article 12 compliance (10-year log retention); recommended for financial crimes AI pipeline (FIS + Anthropic pattern) |
| **FINOS OSERA** | Apache-2.0 | [ai.finos.org](https://ai.finos.org) | Governance-as-code: machine-readable EU AI Act + FCA Consumer Duty + PRA resilience + SEC model risk compliance; DTCC + Morgan Stanley + RBC + NatWest; Jun 23, 2026; critical for FCA Q4 2026 consultation readiness |
| **auditLens pattern** | MIT | [SashaEee/auditLens](https://github.com/SashaEee/auditLens) | LLM + RAG for internal bank product audit with cited references; explainability pattern |

## Enterprise Agentic Banking Platforms (Proprietary — Architecture Reference)

> These proprietary platforms set the feature bar that Globant's open-source builds should match.
> Use them as competitor benchmarks and client expectation setters, not as buildable foundations.

| Platform | Vendor | Architecture Parallel | What to Match with Open Source |
|----------|--------|----------------------|-------------------------------|
| **agentOS** | Fiserv | Agent orchestration + governance + connector ecosystem for banking | FinAegis MCP + n8n (fair-code, 189k★) + FINOS OSERA |
| **Financial Crimes AI Agent** | FIS + Anthropic | Claude for AML + fraud + SAR; deployed at BMO + Amalgamated Bank | Apache Fineract + Claude claude-haiku-4-5 + Apache Atlas + Great Expectations |
| **Einstein Copilot** | Salesforce | Banking workflows; NLP to Salesforce actions | ERPNext + Frappe + Claude claude-sonnet-5 |
| **Joule AI** | SAP | Finance copilot; MCP integration | Apache OFBiz + Claude + MCP wrapper |
| **Temenos AI** | Temenos | AI-native LOS, fraud, compliance on core banking | Apache Fineract + FinRL-X + FINOS OSERA |

## Agent Payment Infrastructure (v8 Updated)

> AI agents now have native payment rails across open protocol, cloud-managed, and legacy network layers — all converging on x402 interoperability.
> 85% of FSI professionals believe agents will execute payment transactions; 65% say a new authorization model is required (CSA, Jun 2026).

| Platform | License | Description | Production Status |
|----------|---------|-------------|------------------|
| **x402 Protocol** | Open/MIT | HTTP 402 payment for AI agents (Coinbase): server returns 402 → agent pays USDC → content unlocked; TypeScript/Python/Rust SDKs; MCP integration; AWS CloudFront + WAF native; **22-member Foundation** including Google, Microsoft, AWS, Visa, Mastercard, American Express, Shopify, Stripe, Cloudflare | ✅ Live — 165M+ txns, $600M annualized |
| **Amazon Bedrock AgentCore Payments** | Proprietary (AWS) | Managed x402 wallet for all Bedrock agents; launched May 7, 2026; AWS + Coinbase + Stripe; built-in spending controls + audit trail; 200ms settlement; 4 regions (US-East, US-West, EU-Frankfurt, APAC-Sydney) | ✅ Live May 7, 2026 (preview) |
| **Coinbase Agentic Wallets** | MIT | Non-custodial wallets in TEEs for agents; programmable spending limits; multi-party approval; audit logs; built on x402 | ✅ Live Feb 2026 |
| **Mastercard Agent Pay for Machines** | Proprietary | Agentic Tokens: tokenized credential bound to specific agent + merchant scope + consent policy; machine-speed settlement; 30+ platform adopters (Stripe, Adyen, Checkout.com); BVNK acquisition ($1.8B, Mar 2026) for stablecoin expansion; **x402 interoperability** | ✅ Live Jun 10, 2026 |
| **Visa Intelligent Commerce** | Proprietary + MCP SDK | MCP Server for Visa APIs; tokenization + real-time fraud monitoring for AI-initiated transactions; **x402 interoperability collaboration** | ✅ Live 2026 |
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
│  MCP Server Layer               │  FinAegis built-in, or wrap Fineract REST as MCP
│  (expose operations to agents)  │
└─────────────────┬───────────────┘
                  │ Tool calls
                  ▼
┌─────────────────────────────────┐
│  Claude / Multi-Agent Stack     │  TradingAgents, AI Berkshire, FinRobot, ATLAS, FinRL-X
│  (decision + orchestration)     │
└─────────────────┬───────────────┘
                  │ Actions + x402 payments
                  ▼
┌─────────────────────────────────┐
│  Payment Rails                  │  x402 USDC, AgentCore Payments, Mastercard AP4M, Visa IC
│  (settle agent transactions)    │
└─────────────────────────────────┘

                  ▼ NEW v8
┌─────────────────────────────────┐
│  Governance Layer               │  FINOS OSERA, Great Expectations, Apache Atlas
│  (compliance + audit trails)    │  EU AI Act / FCA / PRA / SR 26-2 / SEC model risk
└─────────────────────────────────┘
```
