# Foundational Repos — Financial Services

> The solid foundations to build on. Open licenses, active communities, production-grade.
> Last updated: 2026-07-05

## Platform & Framework Foundations

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [Hyperswitch](https://github.com/juspay/hyperswitch) | Apache-2.0 | 43.2k | Open-source composable payments platform built in Rust. Connects 120+ PSPs, PCI-compliant vault, intelligent routing, revenue recovery, and reconciliation automation. The open-source Stripe for complex payment orchestration. | Yes — wrap with AI agent for dynamic routing |
| [Apache Fineract](https://github.com/apache/fineract) | Apache-2.0 | 2.3k | Cloud-ready core banking platform. Client data management, loan/savings portfolio management, real-time accounting, and reporting. Powers 400+ institutions serving 20M+ customers. | Yes — add LLM layer for loan officer agent |
| [ERPNext](https://github.com/frappe/erpnext) | GPL-3.0 | 36.4k | Full-featured open ERP with financial accounting module: GL, AR/AP, cost centers, multi-currency, financial statements. Built on Frappe Framework (Python + JS). | Yes — add Frappe AI or LangChain agent on top |
| [tf-quant-finance](https://github.com/google/tf-quant-finance) | Apache-2.0 | 5.4k | Google's high-performance TensorFlow library for quantitative finance: options pricing, interest rate models, volatility surface fitting, Monte Carlo simulation. | Yes — embed in ML pipeline |
| [QuantLib-Python](https://github.com/lballabio/QuantLib) | BSD-3-Clause | 5.5k | The industry-standard derivatives pricing and risk management library (C++ with Python bindings). Covers bonds, options, swaps, caps, floors, and exotic derivatives. | Yes — call from agent for real pricing |
| [zipline-reloaded](https://github.com/stefan-jansen/zipline-reloaded) | Apache-2.0 | 1.5k | Community-maintained fork of Zipline (Quantopian's backtesting engine). Event-driven backtesting, data bundles, performance analytics. The active replacement for the original Zipline. | Yes — backtesting environment for RL agents |
| [Backtrader](https://github.com/mementum/backtrader) | GPL-3.0 | 21k | Python event-driven backtesting framework: live trading, multi-broker, 200+ technical indicators. Widely used but reduced maintenance cadence. | Yes — legacy, consider migrating to FinRL |
| [moov-io/awesome-fintech](https://github.com/moov-io/awesome-fintech) | Apache-2.0 | 338 | Curated collection of production-grade open-source fintech libs: ACH, ISO 8583, FedWire, NACHA. Essential reference for payment infrastructure agents. | Yes — foundational payment primitives |

## Data & Analytics Foundations

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [OpenBB](https://github.com/OpenBB-finance/OpenBB) | AGPL-3.0 | 70.1k | Open data platform for quants and AI agents. 500+ data sources, MCP server, Python SDK, REST API. Best starting point for financial data layer. |
| [awesome-ai-in-finance](https://github.com/georgezouq/awesome-ai-in-finance) | MIT | 4.8k | Curated map of LLMs, RL frameworks, NLP tools, and datasets for financial markets. Essential orientation resource. |
| [PyPortfolioOpt](https://github.com/robertmartin8/PyPortfolioOpt) | MIT | 5.8k | Portfolio optimization: mean-variance, Black-Litterman, HRP. Production-grade, drop into any investment agent. |

---
*See also: `verticals/solutions.md` for complete vertical platforms.*
