# 🎯 Top AI Agents — Financial Services

> Open-source AI agents & tools for the financial industry. Focus: MIT / Apache 2.0 licenses Globant can build on.
> Última actualización: 2026-07-08

## Core AI Agents

| Nombre | Repo | Licencia | Stars | Descripción |
|--------|------|----------|-------|-------------|
| **ai-hedge-fund** | [virattt/ai-hedge-fund](https://github.com/virattt/ai-hedge-fund) | MIT | 60.9k | Multi-agent hedge fund simulation: 18 agents (12 famous investor personas: Buffett, Munger, Lynch + 6 specialist agents for valuation, risk, sentiment, fundamentals). LangGraph + FastAPI backend |
| **Dexter** | [virattt/dexter](https://github.com/virattt/dexter) | MIT | 24.8k | Autonomous financial research agent: task planning, self-reflection, real-time data fetching, self-validation, WhatsApp gateway, eval suite. "Claude Code for finance" |
| **TradingAgents** | [TauricResearch/TradingAgents](https://github.com/tauricresearch/tradingagents) | MIT | 18.2k | Multi-agent LLM trading framework modelling a real trading desk: bull/bear analysts, fundamentals, technicals, risk manager, portfolio manager — all debate via LangGraph. v0.3.1 Jul-2026 adds Claude Sonnet 5 / Fable 5 support |
| **FinRobot** | [AI4Finance-Foundation/FinRobot](https://github.com/AI4Finance-Foundation/FinRobot) | Apache-2.0 | 3.2k | AI Agent platform for financial analysis unifying LLMs, RL, and quantitative analytics. Multi-agent workflows for investment research automation and algorithmic trading |
| **FinRL** | [AI4Finance-Foundation/FinRL](https://github.com/AI4Finance-Foundation/FinRL) | MIT | 11.8k | First open-source financial reinforcement learning framework. FinRL-X / FinRL-Trading is the next-gen production-ready evolution for live trading deployment |
| **Vibe-Trading** | [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) | MIT | 16.9k | "Your Personal Trading Agent" — LLM-powered trading with graph-based market understanding and multi-step reasoning |
| **FinSight** | [RUC-NLPIR/FinSight](https://github.com/RUC-NLPIR/FinSight) | Apache-2.0 | 1.4k | ACL 2026 Main — multi-agent framework generating publication-ready financial reports: one ticker → one click → full report. Code Agent with Variable Memory (CAVM) architecture, VLM chart generation with critique loops |
| **prediction-market-analysis** | [jon-becker/prediction-market-analysis](https://github.com/jon-becker/prediction-market-analysis) | MIT | 2.3k | Largest public prediction market dataset (36GB) from Polymarket + Kalshi. Multi-agent Bayesian analysis, market microstructure research, 2 ACL papers published from this dataset |
| **OpenBB** | [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) | AGPLv3 | 38.4k | Open Data Platform: normalizes financial data from 30+ providers (FMP, FRED, Yahoo Finance, Polygon, SEC) behind one Python SDK. MCP server extension exposes every endpoint as an MCP tool for AI agents |
| **CCXT** | [ccxt/ccxt](https://github.com/ccxt/ccxt) | MIT | 43.5k | Cryptocurrency trading API supporting 100+ exchanges in JavaScript/Python/PHP. The universal crypto exchange connector |

---

## MCP Servers for Financial AI

| Servidor | Repo | Descripción |
|----------|------|-------------|
| **financial-datasets-mcp** | [financial-datasets/mcp-server](https://github.com/financial-datasets/mcp-server) | Stock market data MCP: income statements, balance sheets, cash flows, prices, news — all via Claude |
| **yahoo-finance-mcp** | [Alex2Yang97/yahoo-finance-mcp](https://github.com/Alex2Yang97/yahoo-finance-mcp) | Yahoo Finance MCP: historical prices, company info, financials, options, market news |
| **blpapi-mcp** | [djsamseng/blpapi-mcp](https://github.com/djsamseng/blpapi-mcp) | Bloomberg Terminal MCP — requires BBComm locally; unlocks Bloomberg data for AI agents |
| **OpenBB MCP** | [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) | `openbb_mcp_server` extension: 30+ provider endpoints as MCP tools |
| **alpaca-mcp** | [alpacahq/alpaca-mcp-server](https://github.com/alpacahq/alpaca-mcp-server) | Alpaca brokerage MCP: place orders, check positions, stream quotes via Claude |

---

## Benchmarks & Evaluation

| Benchmark | Paper | Descripción |
|-----------|-------|-------------|
| **FinMTM** | [HiThink-Research/FinMTM](https://github.com/HiThink-Research/FinMTM) — ACL 2026 | Multi-Turn Multimodal benchmark for financial reasoning and agent evaluation |
| **CLEF-2026 FinMMEval** | arXiv:2602.10886 | Multilingual + multimodal evaluation of financial AI systems across languages |
| **TradingAgents Benchmark** | arXiv:2412.20138 | Multi-agent trading framework paper with reproducible backtests vs. baselines |

---
*Actualizado automáticamente por el pipeline de ingest.*
