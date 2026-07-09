# Vertical Solutions — Financial Industry

_Open source platforms that can be customized with AI on top. Prioritized by Globant-usable licenses. Last updated: 2026-07-02_

---

## Core Banking & Microfinance

### [Apache Fineract](https://github.com/apache/fineract) — Apache-2.0
- **Language:** Java (Spring Boot)
- **Domain:** Core Banking Platform
- **Description:** Full-stack microfinance platform powering financial services for 2 billion+ underbanked globally. Client management, loan portfolio, savings accounts, real-time accounting, payment gateway integrations.
- **AI Opportunities:**
  - LLM agent for loan officer decision support
  - Fraud detection layer on transaction streams
  - NLP for KYC document processing (Claude vision on passport images)
  - Conversational banking interface via Rasa
- **Used by:** Mifos, FINERACT-CN deployments in 30+ countries

### [open-bank-oss](https://github.com/JiRaska/open-bank-oss) — Apache-2.0
- **Language:** Kotlin/Quarkus + Next.js + Kafka
- **Domain:** Cloud-Native Retail Banking Reference Implementation
- **Description:** Event-driven microservices retail banking architecture — new but architecturally sound. Good starting point for cloud-native banking platforms.
- **AI Opportunities:** Compliance agent layer, fraud detection, customer AI assistant

---

## Accounting & ERP

### [Apache OFBiz](https://github.com/apache/ofbiz-framework) — Apache-2.0 ✓ (Best license)
- **Language:** Java + Groovy
- **Domain:** Full ERP
- **Description:** Mature Apache Foundation ERP covering accounting, manufacturing, supply chain, CRM, HR, and e-commerce. Apache license = clean for commercial use with no copyleft risk.
- **AI Opportunities:** AI demand forecasting, AP/AR automation, compliance monitoring agent

### [Odoo Community](https://github.com/odoo/odoo) — LGPL-3.0
- **Language:** Python + PostgreSQL + JavaScript
- **Domain:** Modular ERP/CRM
- **Stars:** 39k
- **Description:** Industry-standard modular ERP — accounting, CRM, inventory, manufacturing. LGPL core enables commercial AI modules on top without triggering copyleft for the module itself.
- **AI Opportunities:** AI invoice extraction, sales forecasting, document workflow automation

### [iDURAR ERP-CRM](https://github.com/idurar/idurar-erp-crm) — MIT ✓
- **Language:** Node.js (Express) + React + MongoDB
- **Domain:** ERP/CRM/Accounting
- **Description:** All-in-one ERP-CRM for SMEs: customer management, sales, procurement, inventory, financials. MIT — cleanest license for client work.
- **AI Opportunities:** Sales forecasting agents, automated procurement, LLM financial KPI narrative

### [Akaunting](https://github.com/akaunting/akaunting) — EUPL-1.2
- **Language:** PHP (Laravel) + Vue.js
- **Stars:** 9.9k
- **Domain:** SMB Accounting
- **Description:** Modern online accounting for SMEs and freelancers. Invoicing, expense tracking, multi-currency, inventory.
- **AI Opportunities:** LLM invoice classification and anomaly detection, cash flow forecasting, natural language query for accountants

### [GNUCash](https://github.com/Gnucash/gnucash) — GPL-2.0
- **Language:** C / Scheme
- **Domain:** Personal/Small Business Accounting
- **Description:** Double-entry accounting with investments, budgeting, and financial reports. 25+ years active.

---

## Investment Research

### [OpenBB Platform](https://github.com/OpenBB-finance/OpenBB) — AGPL-3.0
- **Language:** Python + FastAPI + TypeScript
- **Stars:** 69.8k
- **Domain:** Investment Research Terminal
- **Description:** Open-source Bloomberg Terminal alternative. Stocks, crypto, forex, macro data. MCP server now available — AI agents call live data as native tools.
- **AI Opportunities:**
  - Custom research agents on proprietary data
  - Automated earnings call summarization
  - Portfolio risk analysis with FinRL
  - MCP integration means zero custom API wrappers needed
- **License note:** AGPL-3.0 — use as a service/backend; buy commercial license for embedded deployments

---

## Trading & Market Data

### [Freqtrade](https://github.com/freqtrade/freqtrade) — GPL-3.0
- **Language:** Python
- **Stars:** 48k
- **Domain:** Algorithmic Crypto Trading
- **Description:** Full-featured trading bot with backtesting, paper trading, and live trading. ML strategy optimization via Hyperopt/Optuna.
- **License note:** GPL-3.0 — use as a standalone service; avoid embedding in proprietary client products

### [Hummingbot](https://github.com/hummingbot/hummingbot) — Apache-2.0 ✓
- **Language:** Python
- **Stars:** 19k
- **Domain:** Market Making / HFT
- **Description:** High-frequency market making and arbitrage with 50+ CEX/DEX connectors. v2.13 adds AI agent integration.

### [CCXT](https://github.com/ccxt/ccxt) — MIT ✓
- **Language:** JS/Python/PHP/Go
- **Stars:** 43.2k
- **Domain:** Exchange Connectivity
- **Description:** Universal cryptocurrency exchange library — 100+ exchanges. The standard connectivity layer for any trading agent.

---

## Financial Services Open Standards

### [FINOS Foundation](https://github.com/finos) — Apache-2.0 ✓
- **Domain:** Financial Services Open Source Standards
- **Key Projects:** Legend (data modeling — Goldman Sachs), FDC3 (desktop interoperability), Symphony (secure messaging)
- **AI Opportunities:** FDC3 as integration bus for financial desktop AI agents; Legend for financial data schema generation

---

## Platform Selection Guide

| Client Need | Recommended Starting Point | License Risk |
|-------------|---------------------------|--------------|
| Enterprise ERP + AI forecasting | Apache OFBiz or Odoo | Low (Apache/LGPL) |
| SMB accounting + AI bookkeeper | iDURAR (MIT) or Akaunting | Very Low / Low |
| Equity research portal | OpenBB + ai-hedge-fund | Medium (AGPL — use as service) |
| Core banking + AI loan decisioning | Apache Fineract | None (Apache-2.0) |
| Crypto trading operations | Hummingbot + CCXT | None (Apache/MIT) |
| Wealth management + portfolio AI | OpenBB + PyPortfolioOpt + FinRobot | Medium (AGPL for OpenBB) |
