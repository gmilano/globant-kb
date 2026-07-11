# Foundational Repos — Financial Services AI

> Last updated: 2026-07-11 | v9 | Focus: MIT / Apache 2.0 bases Globant can build on

## AI & Machine Learning for Finance

| Repo | Stars | License | Category | Description |
|------|-------|---------|----------|-------------|
| [AI4Finance-Foundation/FinRL](https://github.com/AI4Finance-Foundation/FinRL) | ~3.4k | MIT | RL Trading | Financial Reinforcement Learning. Train agents on market data (stocks, crypto, portfolio). Integrates Gymnasium, Stable-Baselines3, multiple data sources. THE reference RL-for-finance library. |
| [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | ~2.9k | MIT | LLM | Open-source financial LLMs fine-tuned on SEC filings, earnings calls, financial news. HuggingFace-hosted models. Tasks: sentiment, credit scoring, Q&A. |
| [AI4Finance-Foundation/FinRobot](https://github.com/AI4Finance-Foundation/FinRobot) | ~1.2k | Apache-2.0 | Agent Platform | Multi-layer AI agent platform for financial applications. Financial CoT, LLM algorithm selection, LLMOps, multi-source foundation models. |
| [georgezouq/awesome-ai-in-finance](https://github.com/georgezouq/awesome-ai-in-finance) | ~3k | MIT | Curated | Curated list of LLMs, deep learning strategies, tools, datasets for financial markets. Essential reading for any financial AI project. |
| [google/tf-quant-finance](https://github.com/google/tf-quant-finance) | ~5.4k | Apache-2.0 | Quant | High-performance TensorFlow library for quantitative finance. Derivatives pricing, interest rate models, Black-Scholes, Monte Carlo. Google-maintained. |

## Trading & Backtesting Infrastructure

| Repo | Stars | License | Category | Description |
|------|-------|---------|----------|-------------|
| [quantopian/zipline](https://github.com/quantopian/zipline) | ~19.9k | Apache-2.0 | Backtesting | Pythonic algorithmic trading library. Event-driven backtesting engine. Integrates with Alphalens, Pyfolio for factor analysis and performance attribution. Industry standard. |
| [ccxt/ccxt](https://github.com/ccxt/ccxt) | ~43k | MIT | Exchange Connectivity | Cryptocurrency trading library connecting 100+ exchanges. JavaScript/Python/PHP. De-facto standard for crypto connectivity in AI trading agents. |
| [hummingbot/hummingbot](https://github.com/hummingbot/hummingbot) | ~19k | Apache-2.0 | Market Making | Open source market-making and arbitrage bot framework. Supports 40+ exchanges. Used as infrastructure layer by algorithmic trading teams. |
| [PyPortfolioOpt/PyPortfolioOpt](https://github.com/robertmartin8/PyPortfolioOpt) | ~5.8k | MIT | Portfolio | Financial portfolio optimization: mean-variance, Black-Litterman, hierarchical risk parity, post-processing constraints. Standard Python portfolio optimization library. |
| [dcajasn/Riskfolio-Lib](https://github.com/dcajasn/Riskfolio-Lib) | ~4.3k | BSD-3-Clause | Risk | Portfolio risk management and optimization. CVaR, maximum diversification, risk budgeting. Research-grade quantitative risk management. |

## Core Banking & Infrastructure

| Repo | Stars | License | Category | Description |
|------|-------|---------|----------|-------------|
| [apache/fineract](https://github.com/apache/fineract) | ~1.5k | Apache-2.0 | Core Banking | Apache Fineract: open-source core banking engine. Loan/savings portfolio management, real-time accounting, reporting. 400+ institutions, 20M+ customers. Cloud-ready API-first architecture. |
| [openMF/web-app](https://github.com/openMF/web-app) | ~500 | MPL-2.0 | Banking UI | Mifos X Web App: Angular-based banking web UI on top of Apache Fineract. Reference implementation for staff/customer-facing banking interfaces. |
| [moov-io/awesome-fintech](https://github.com/moov-io/awesome-fintech) | ~1k | MIT | Curated | Curated collection of open-source fintech libraries: payments, ACH, ISO 20022, wire transfers, regulatory compliance. Moov.io ecosystem. |
| [quantmind/awesome-open-finance](https://github.com/quantmind/awesome-open-finance) | ~500 | MIT | Curated | Open finance and open banking resources: APIs, data, PSD2, open banking standards. |

## AML & Compliance

| Repo | Stars | License | Category | Description |
|------|-------|---------|----------|-------------|
| [jube-home/aml-fraud-transaction-monitoring](https://github.com/jube-home/aml-fraud-transaction-monitoring) | ~600 | AGPL-3.0 | AML | Real-time AML + fraud detection. Supervised/unsupervised ML, rule-based detection, sanctions screening, case management. Production-capable, full audit trails. |

## Key Technical Characteristics

| Repo | Python | REST API | Docker | Kubernetes | GPU |
|------|--------|----------|--------|------------|-----|
| FinRL | ✓ | ✗ | ✓ | ✗ | Optional |
| FinGPT | ✓ | ✗ | ✓ | ✗ | Required |
| FinRobot | ✓ | ✗ | ✓ | ✗ | Optional |
| zipline | ✓ | ✗ | ✓ | ✗ | ✗ |
| Apache Fineract | Java | ✓ | ✓ | ✓ | ✗ |
| ccxt | Python/JS | ✓ | ✓ | ✗ | ✗ |
| Jube AML | C#/.NET | ✓ | ✓ | ✓ | Optional |
| tf-quant-finance | Python | ✗ | ✓ | ✗ | ✓ (TF) |
