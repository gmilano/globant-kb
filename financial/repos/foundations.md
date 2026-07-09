# 🏗️ Foundation Repos — Financial Services

> Core open source libraries and platforms Globant can build AI solutions on top of.
> Focus: active maintenance, permissive licenses, real production deployments.
> Last updated: 2026-07-09

## Core AI / Quant Finance Frameworks

| Repo | License | Stars | Description | Best For |
|------|---------|-------|-------------|---------|
| [microsoft/qlib](https://github.com/microsoft/qlib) | MIT | 44k+ | AI-oriented quant investment platform: data → signal → strategy → execution pipeline; RL, supervised, and market dynamics modeling; integrates RD-Agent for automated R&D | Quant research automation, AI strategy discovery |
| [AI4Finance-Foundation/FinRL](https://github.com/AI4Finance-Foundation/FinRL) | MIT | 12k | Financial reinforcement learning: PPO, SAC, TD3 agents for stocks, crypto, forex; Gymnasium-compatible env; multi-task support | Continuous RL trading strategies |
| [quantopian/zipline](https://github.com/quantopian/zipline) | Apache-2.0 | 17k | Pythonic algorithmic trading backtester; event-driven; official fork: [stefan-jansen/zipline-reloaded](https://github.com/stefan-jansen/zipline-reloaded) | Backtesting before live deployment |
| [QuantConnect/Lean](https://github.com/QuantConnect/Lean) | Apache-2.0 | 19.9k | Algorithmic trading engine (Python, C#); supports equities, crypto, forex, options, futures; cloud and local deploy | Production-grade multi-asset algo trading |
| [google/tf-quant-finance](https://github.com/google/tf-quant-finance) | Apache-2.0 | 5.4k | High-performance TensorFlow library for quantitative finance: derivatives pricing, Monte Carlo, rate models | Derivatives, options, rate model pricing at scale |
| [robertmartin8/PyPortfolioOpt](https://github.com/robertmartin8/PyPortfolioOpt) | MIT | 5.8k | Portfolio optimization: mean-variance, Black-Litterman, HRP, CVaR; scikit-learn compatible | Portfolio construction with AI-generated signals |
| [ccxt/ccxt](https://github.com/ccxt/ccxt) | MIT | 43.5k | Unified API for 100+ crypto exchanges (JS/Python/PHP); the de facto connector layer for crypto trading agents | Crypto exchange connectivity |

## Core Banking & Financial Platforms (build AI on top)

| Repo | License | Stars | Description | LATAM Relevance |
|------|---------|-------|-------------|----------------|
| [apache/fineract](https://github.com/apache/fineract) | Apache-2.0 | 2.3k | Cloud-ready core banking platform from Mifos Initiative; REST API; 400+ institutions; 20M+ customers; open banking APIs | High — widely used in emerging markets microfinance |
| [frappe/erpnext](https://github.com/frappe/erpnext) | GPL-3.0 | 21k+ | Full ERP with accounting, banking, payroll, GST/tax; Frappe Framework; Python + Vue | SME financial management platform |
| [hummingbot/hummingbot](https://github.com/hummingbot/hummingbot) | Apache-2.0 | 19k | Open source market making and arbitrage bot; 40+ exchanges; scriptable strategies; deployable as AI agent | Crypto market making automation |
| [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Apache-2.0 | 800+ | Enterprise ERP + CRM + accounting framework; Java; mature and extensible | Enterprise financial workflows |

## Data & Infrastructure

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) | AGPLv3 | 38.4k | Open data platform; MCP server integration; connects analysts, quants, and AI agents to financial data sources |
| [wilsonfreitas/awesome-quant](https://github.com/wilsonfreitas/awesome-quant) | — | 5k+ | Curated list of quant finance libraries; use as a discovery index |
| [lballabio/QuantLib](https://github.com/lballabio/QuantLib) | BSD-3-Clause | 4k+ | C++ derivatives pricing library; Python bindings via QuantLib-SWIG; options, bonds, rates |
| [avhz/RustQuant](https://github.com/avhz/RustQuant) | Apache-2.0 | 1.8k | Rust library for quantitative finance — growing community; high-perf option pricing |

## Key Licenses at a Glance

| License | Repos | Commercial Use OK? |
|---------|-------|-------------------|
| MIT | FinRL, Qlib, CCXT, PyPortfolioOpt | ✅ Yes, including SaaS |
| Apache-2.0 | Lean, Fineract, tf-quant-finance, OFBiz, hummingbot, zipline | ✅ Yes, patent protection included |
| AGPLv3 | OpenBB | ⚠️ Copyleft — must open-source if serving over network; use OpenBB SDK under MIT for agent integrations |
| GPL-3.0 | ERPNext | ⚠️ Copyleft — OK for on-premise client deployments |
| BSD-3-Clause | QuantLib | ✅ Yes |

---
*See also: `verticals/solutions.md` for vertical platforms and `agents/top.md` for AI agents.*
