# AI Agents — Financial Services

> Open-source AI agents and tools for financial services. Focus: MIT / Apache 2.0 / BSD.
> Last updated: 2026-07-06 (second pass — deep refresh)

## Top Agents & Tools

| Name | License | Stars | Description |
|------|---------|-------|-------------|
| [TradingAgents](https://github.com/TauricResearch/TradingAgents) | Apache-2.0 | ~80k | Multi-agent LLM framework simulating a full trading firm: Bull Agent, Bear Agent, Fundamentals Agent, Technicals Agent, Risk Manager. v0.3.1 (Jul 2026) adds Claude Sonnet 5 / Fable 5 support, FRED + Polymarket data vendors, Bedrock auth, and a CI gate. |
| [OpenBB](https://github.com/OpenBB-finance/OpenBB) | AGPL-3.0 | ~70k | Open-source investment research platform replacing Bloomberg Terminal. Aggregates market data, news, fundamentals, macroeconomics. Extensible plugin system; backend for building financial AI copilots. |
| [ccxt](https://github.com/ccxt/ccxt) | MIT | ~43k | CryptoCurrency eXchange Trading Library — unified REST + WebSocket API for 100+ exchanges in Python, TypeScript, PHP, Go, Java. Normalized order books, OHLCV, trades; CLI; the de-facto crypto data layer for agent builders. |
| [FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | MIT | ~20.8k | Open-source financial LLMs from AI4Finance Foundation. Fine-tuned on financial news, earnings calls, SEC filings. Covers sentiment analysis, robo-advising, forecasting. Companion to FinRL and FinRobot in the AI4Finance ecosystem. |
| [hummingbot](https://github.com/hummingbot/hummingbot) | Apache-2.0 | ~19k | Open-source market-making and algorithmic trading bot for crypto DEX/CEX. Modular strategy framework, connector library, and backtesting. Used in institutional quant workflows. |
| [FinRL](https://github.com/AI4Finance-Foundation/FinRL) | MIT | ~15.6k | First open-source framework for financial reinforcement learning. Covers stock/crypto/futures trading with DRL agents (PPO, A2C, SAC). FinRL-X / FinRL-Trading for production pipelines; active FinRL Contest 2025-2026. |
| [Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) | MIT | ~16.9k | "Your Personal Trading Agent" from HKUDS lab. LLM-powered conversational trading agent for individual portfolio analysis. Surged in stars Jan-Mar 2026 as the "vibe coding" trend reached finance. |
| [FinRobot](https://github.com/AI4Finance-Foundation/FinRobot) | Apache-2.0 | ~7.3k | Multi-agent platform built on top of FinGPT/FinRL ecosystem. Four-layer architecture: Financial AI Agents → Financial LLM Algorithms → LLMOps/DataOps → Foundation Models. Covers market forecasting, document analysis, trading strategy agents. FinRobot Pro is the commercial deployment track. |
| [AgenticTrading](https://github.com/Open-Finance-Lab/AgenticTrading) | MIT | ~500 | Open Finance Lab's experimental agentic trading playground. FastAPI backend + SQLite + paper trading + LLM validator. FinAgent multi-agent orchestration framework with DAG-based planning and memory systems. Good scaffold for Globant prototypes. |
| [awesome-trading-agents](https://github.com/LLMQuant/awesome-trading-agents) | MIT | ~300 | LLMQuant's curated list of LLM-driven trading agents, MCP servers, and agent skills. Covers market research, strategy generation, and execution. Community hub for the quant-AI intersection; companion to LLMQuant/data-mcp (updated Jul 2026). |

## Licensing summary for Globant

| License | Usability | Projects |
|---------|-----------|---------|
| MIT | Full commercial use, modification, distribution | ccxt, FinGPT, FinRL, Vibe-Trading, AgenticTrading |
| Apache-2.0 | Full commercial use, patent grant | TradingAgents, hummingbot, FinRobot |
| AGPL-3.0 | Copyleft — open any server-side modifications | OpenBB (use as data backend only, keep separate service) |

## What these unlock for Globant

- **ccxt + FinGPT + FinRL** = data → sentiment → strategy pipeline (all MIT)
- **TradingAgents** = reference architecture for multi-agent trading firms
- **FinRobot** = fastest path to a financial research AI agent
- **Apache Fineract** (see verticals) = foundation for agent-augmented core banking

---
*Auto-updated by the ingest pipeline.*
