# Foundational Repos — Financial Services

> Stable, well-maintained bases for building financial AI systems.
> Focus: actively maintained, open license, suitable for production.
> Last updated: 2026-07-06

## Core Frameworks

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [TradingAgents](https://github.com/TauricResearch/TradingAgents) | Apache-2.0 | ~80k | Multi-agent LLM trading framework — Bull/Bear/Fundamentals/Technicals/Risk agents. Reference architecture for agentic financial workflows. | Yes — full multi-agent orchestration |
| [OpenBB](https://github.com/OpenBB-finance/OpenBB) | AGPL-3.0 | ~70k | Open-source Bloomberg Terminal replacement. Modular data connectors (equity, macro, crypto, alternatives). Use as the data layer under AI agents. | Yes — rich data SDK |
| [ccxt](https://github.com/ccxt/ccxt) | MIT | ~43k | Unified API for 100+ crypto exchanges (Python/TS/PHP/Go/Java). Normalized market data, WebSocket streams, order execution. Essential for any crypto-facing agent. | Yes — MIT, multi-language |
| [zipline](https://github.com/quantopian/zipline) | Apache-2.0 | ~19.9k | Pythonic algorithmic trading backtesting engine, originally powering Quantopian. Still the most mature OSS backtester for equities. | Yes — plug ML models in as signals |
| [hummingbot](https://github.com/hummingbot/hummingbot) | Apache-2.0 | ~19k | Modular market-making and algo trading framework for crypto. Pre-built strategies (AMM arbitrage, cross-exchange market-making) + connector library. | Yes — strategy as code |
| [FinRL](https://github.com/AI4Finance-Foundation/FinRL) | MIT | ~15.6k | Financial reinforcement learning framework (PPO, A2C, SAC on stock/crypto/futures). Backbone of FinRL Contest; FinRL-Trading for production. | Yes — DRL trading agents |
| [FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | MIT | ~20.8k | Fine-tuned financial LLMs (sentiment, Q&A, forecasting). Trained on news, earnings, filings. Plug into any agent as domain-specific reasoning. | Yes — MIT LLMs for finance |
| [tf-quant-finance](https://github.com/google/tf-quant-finance) | Apache-2.0 | ~5.4k | Google's TensorFlow library for quantitative finance: option pricing, Monte Carlo, rates models. Accelerated by GPU/TPU for large-scale derivatives pricing. | Yes — pricing primitives for risk agents |
| [PyPortfolioOpt](https://github.com/robertmartin8/PyPortfolioOpt) | MIT | ~5.8k | Portfolio optimization in Python: mean-variance, Black-Litterman, hierarchical risk parity. Used by FinRL and FinRobot as portfolio allocation layer. | Yes — MIT, scikit-learn compatible |
| [Apache Fineract](https://github.com/apache/fineract) | Apache-2.0 | ~1.8k | Production-grade open-source core banking system. Client management, loans, savings, real-time accounting, reporting. Mifos X is the reference front-end. AI agents can wrap Fineract APIs for autonomous banking workflows. | Yes — REST APIs, agent skill available |

## Data & Infrastructure

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [Zipline-Reloaded](https://github.com/stefan-jansen/zipline-reloaded) | Apache-2.0 | ~1.8k | Maintained fork of Zipline (Quantopian went defunct). Active Python 3.11+ support. Use this over the original. |
| [QuantLib](https://github.com/lballabio/QuantLib) | BSD-3-Clause | ~5.7k | C++ library for quantitative finance: bonds, options, swaps, credit, rates. 25+ years in production; Python bindings via QuantLib-SWIG. |
| [QuantLib-SWIG](https://github.com/lballabio/QuantLib-SWIG) | BSD-3-Clause | ~250 | Python / Java / C# bindings for QuantLib. Bridge QuantLib pricing into Python agent toolchains. |
| [Riskfolio-Lib](https://github.com/dcajasn/Riskfolio-Lib) | BSD-3-Clause | ~4.3k | Advanced portfolio optimization and risk analysis. HRP, CVaR, CDaR. Complement to PyPortfolioOpt for complex risk-adjusted allocation. |
| [FinRobot](https://github.com/AI4Finance-Foundation/FinRobot) | Apache-2.0 | ~7.3k | Agent platform atop FinGPT/FinRL ecosystem. Market forecasting, document analysis, trading strategy agents. FinRobot Pro for commercial deployments. |

## Key dependencies map

```
Data layer:          ccxt (crypto) | OpenBB (equities/macro) | FRED API | Polymarket API
Backtest/sim:        zipline-reloaded | hummingbot (live sim)
ML/RL:               FinRL (DRL) | tf-quant-finance (derivatives)
LLM reasoning:       FinGPT (domain LLMs) | TradingAgents (multi-agent)
Portfolio math:      PyPortfolioOpt | Riskfolio-Lib
Core banking:        Apache Fineract | Mifos X
Agent orchestration: FinRobot | AgenticTrading | LangGraph (see enterprise-kb)
```

---
*See also: `verticals/solutions.md` for full vertical platforms.*
