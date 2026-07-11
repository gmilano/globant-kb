# Vertical Solutions — Financial Services

> Last updated: 2026-07-11 | v9
> Strategy: start with an existing open-source financial platform, layer AI agents on top.

## Core Banking Platforms

| Platform | License | GitHub | Stack | AI Integration Point | Deployed At |
|----------|---------|--------|-------|----------------------|-------------|
| **Apache Fineract** | Apache-2.0 | [apache/fineract](https://github.com/apache/fineract) | Java 21, PostgreSQL 18, Spring Boot | REST API → AI agent wrapper; FinGPT on loan officer workflow | 400+ institutions, 20M+ customers |
| **Mifos X** | MPL-2.0 | [openMF/web-app](https://github.com/openMF/web-app) | Angular (UI) + Fineract (backend) | AI chatbot for loan officers; automated credit assessment | Microfinance institutions globally |
| **open-bank-oss** | Apache-2.0 | [JiRaska/open-bank-oss](https://github.com/JiRaska/open-bank-oss) | Kotlin/Quarkus, Next.js, Kafka | Event-driven AI triggers on banking microservices | Reference implementation (new, 2026) |

## ERP & Financial Management

| Platform | License | GitHub | Stack | AI Integration Point | Use Cases |
|----------|---------|--------|-------|----------------------|-----------|
| **ERPNext / Frappe Finance** | MIT | [frappe/erpnext](https://github.com/frappe/erpnext) | Python, Vue.js, MariaDB | Custom Frappe apps for AI reporting agents; AI-driven GL reconciliation | Banks, NBFCs, insurers, brokerages. Adopted by financial services firms in LATAM. |
| **Odoo (Community)** | LGPL-3.0 | [odoo/odoo](https://github.com/odoo/odoo) | Python, JavaScript, PostgreSQL | Odoo modules + AI agents for accounts payable/receivable automation | SME financial management; LATAM adoption strong |

## Trading & Market Data Infrastructure

| Platform | License | GitHub | Stack | AI Integration Point | Use Cases |
|----------|---------|--------|-------|----------------------|-----------|
| **zipline** | Apache-2.0 | [quantopian/zipline](https://github.com/quantopian/zipline) | Python | RL agent training loop; backtesting AI-generated strategies | Algo trading, hedge fund POC |
| **hummingbot** | Apache-2.0 | [hummingbot/hummingbot](https://github.com/hummingbot/hummingbot) | Python | LLM strategy agent → hummingbot execution layer | Crypto market making, DeFi liquidity |
| **CCXT** | MIT | [ccxt/ccxt](https://github.com/ccxt/ccxt) | Python / JS | Universal data source + execution layer for trading agents | All crypto trading agent projects |

## AML & Compliance Platforms

| Platform | License | GitHub | Stack | AI Integration Point | Key Feature |
|----------|---------|--------|-------|----------------------|-------------|
| **Jube** | AGPL-3.0 | [jube-home/aml-fraud-transaction-monitoring](https://github.com/jube-home/aml-fraud-transaction-monitoring) | C#/.NET | ML model integration; rules engine hooks; case management workflows | Real-time monitoring, full audit trail, production-ready |

## Portfolio & Risk Management

| Platform | License | GitHub | Stack | AI Integration Point | Use Cases |
|----------|---------|--------|-------|----------------------|-----------|
| **PyPortfolioOpt** | MIT | [robertmartin8/PyPortfolioOpt](https://github.com/robertmartin8/PyPortfolioOpt) | Python | FinRL agent → PyPortfolioOpt optimization | Portfolio construction, robo-advisor backends |
| **Riskfolio-Lib** | BSD-3-Clause | [dcajasn/Riskfolio-Lib](https://github.com/dcajasn/Riskfolio-Lib) | Python | Risk budgeting layer for agentic portfolios | CVaR optimization, maximum diversification |
| **tf-quant-finance** | Apache-2.0 | [google/tf-quant-finance](https://github.com/google/tf-quant-finance) | TensorFlow/Python | Neural network derivatives pricing; Monte Carlo agent | Derivatives pricing, interest rate modeling |

## AI-Over-Platform Layering Model

```
┌─────────────────────────────────────────────────────┐
│                  CLIENT INTERFACE                    │
│         (Conversational UI / API / Dashboard)        │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│              AI AGENT ORCHESTRATION                  │
│   (TradingAgents / FinRobot / custom LangGraph)      │
│   - Intent parsing  - Tool selection  - Audit logs   │
└──────┬───────────┬───────────┬────────────┬─────────┘
       │           │           │            │
  ┌────▼───┐  ┌───▼────┐  ┌──▼──────┐ ┌──▼──────┐
  │FinRobot│  │FinGPT  │  │FinRL/   │ │Jube AML │
  │Research│  │Sentiment│  │zipline  │ │Compliance│
  └────┬───┘  └───┬────┘  └──┬──────┘ └──┬──────┘
       │           │           │            │
┌──────▼───────────▼───────────▼────────────▼─────────┐
│            VERTICAL PLATFORM LAYER                   │
│   Apache Fineract  |  ERPNext  |  hummingbot  | ccxt │
└─────────────────────────────────────────────────────-┘
```

## LATAM-Specific Notes

- **ERPNext** has strong LATAM adoption (Brazil, Argentina, Mexico) for financial management. Good starting point for AI overlay projects in the region.
- **Apache Fineract**: Deployed at microfinance institutions across Latin America (MFIs in Colombia, Peru, Mexico). AI credit scoring layer is high-value add.
- **Odoo Community**: Widely adopted by LATAM SMEs; accounting + payroll modules are natural AI targets for reconciliation agents.
- Regulatory environment varies: Brazil (BACEN AI guidelines), Mexico (CNBV fintech law), Colombia (SFC sandbox). EU AI Act irrelevant for LATAM but local equivalents emerging.
