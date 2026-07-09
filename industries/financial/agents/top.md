# Top AI Agents — Financial Industry

_Last updated: 2026-07-02_

| Agent | Repo | License | Stars | Description |
|-------|------|---------|-------|-------------|
| TradingAgents | [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | Apache-2.0 | 90.4k | Multi-agent LLM trading framework built on LangGraph — simulates a full trading firm with specialist fundamental/sentiment/technical analyst agents, risk manager, and fund manager; supports GPT-5, Gemini 3, Claude 4 |
| ai-hedge-fund | [virattt/ai-hedge-fund](https://github.com/virattt/ai-hedge-fund) | MIT | 60.7k | AI hedge fund with 13 investor persona agents (Buffett, Graham, Munger, Ackman, Burry, Wood); Bull/Bear multi-agent debate → risk review → portfolio decision; backtesting built in; React+FastAPI+LangGraph |
| OpenBB | [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) | AGPL-3.0 | 69.8k | Open-source Bloomberg alternative — financial data platform for analysts, quants, and AI agents; MCP server integration (agents call live market data as native tools) |
| Freqtrade | [freqtrade/freqtrade](https://github.com/freqtrade/freqtrade) | GPL-3.0 | 48k | Full-featured crypto trading bot with dry-run, backtesting, hyperopt, Telegram/web UI; ML strategy support built in; note GPL license for commercial use |
| CCXT | [ccxt/ccxt](https://github.com/ccxt/ccxt) | MIT | 43.2k | Unified cryptocurrency exchange connectivity library — 100+ exchanges, unified API in JS/Python/PHP/Go; the standard trading agent execution layer |
| Hummingbot | [hummingbot/hummingbot](https://github.com/hummingbot/hummingbot) | Apache-2.0 | 19k | High-frequency market making and arbitrage framework with 50+ CEX/DEX connectors; v2.13 (2026) adds native AI agent integration |
| Vibe-Trading | [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) | MIT | 16.9k | Personal multi-agent trading research workspace: conversational strategy generation, backtesting, and portfolio analysis in one interface |
| FinRobot | [AI4Finance-Foundation/FinRobot](https://github.com/ai4finance-foundation/FinRobot) | Apache-2.0 | 7.5k | AI agent platform for financial analysis using LLMs — automates equity research reports, DCF valuation, peer comparison, SEC filing analysis, multi-page PDF output |
| FinRL | [AI4Finance-Foundation/FinRL](https://github.com/AI4Finance-Foundation/FinRL) | MIT | 10.5k | Financial reinforcement learning library — agents learn sequential trading policies across stocks, crypto, futures; DQN, PPO, A2C, SAC implementations |
| PyPortfolioOpt | [robertmartin8/PyPortfolioOpt](https://github.com/robertmartin8/PyPortfolioOpt) | MIT | 5.8k | Portfolio optimization in Python — efficient frontier, Black-Litterman, risk parity; composable as a tool layer for AI strategy agents |

## Notes for Globant Engagements

- **TradingAgents (90k★)** is the must-know project of 2026 — fastest-growing finance AI repo; Apache-2.0 so safe for client products
- **ai-hedge-fund (60k★)** is the fastest entry point for a multi-agent investor simulation demo; ready-made React UI
- **MIT + Apache-2.0 first**: TradingAgents, ai-hedge-fund, FinRL, CCXT, Hummingbot, PyPortfolioOpt are all safe for commercial client work
- **OpenBB's MCP server** is a paradigm shift: AI agents can call live financial data as native tools without custom API wrappers
- **GPL/AGPL caution**: Freqtrade (GPL) and OpenBB (AGPL) have viral licensing — use as back-end services or obtain commercial licenses for embedded use
- **AI4Finance stack** (FinRL + FinRobot + FinGPT) is coherent and production-tested; all Apache/MIT
