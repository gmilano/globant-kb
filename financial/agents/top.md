# 🎯 Top AI Agents — Financial Services

> Open source AI agents and tools for financial industry verticals.
> Focus: MIT / Apache 2.0 — licenses Globant can build on commercially.
> Last updated: 2026-07-10 (v6)

## Top 12 AI Agents & Frameworks

| Name | Repo | License | Stars | Description |
|------|------|---------|-------|-------------|
| TradingAgents | [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | MIT | 80k+ | Multi-agent LLM trading firm: analysts (fundamentals, technicals, sentiment, news) + risk manager + portfolio manager + fund manager in structured debate; v0.3.1 adds Claude Fable 5 / Bedrock / NVIDIA / Kimi / Groq / Mistral + FRED + Polymarket data vendors + Alpha Vantage look-ahead filtering |
| ai-hedge-fund | [virattt/ai-hedge-fund](https://github.com/virattt/ai-hedge-fund) | MIT | 50k+ | 14 legendary investor personas (Buffett, Munger, Burry, Lynch, Ackman) plus analytical agents (bull, bear, fundamentals, technicals, risk) that debate stock picks via structured adversarial rounds |
| OpenBB | [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) | AGPLv3 | 38.4k | Open Data Platform for analysts, quants, and AI agents — MCP server integration means any Claude/GPT/Gemini agent can query prices, fundamentals, macro, news via natural language |
| Microsoft Qlib | [microsoft/qlib](https://github.com/microsoft/qlib) | MIT | 44k+ | AI-oriented quant investment platform: full pipeline from data → signal → strategy → execution; RD-Agent integration for automated quant R&D (LLM generates hypotheses → backtests → iterates) |
| CCXT | [ccxt/ccxt](https://github.com/ccxt/ccxt) | MIT | 43.5k | Unified crypto trading API for 100+ exchanges (JS/Python/PHP); the de facto connector layer for any crypto trading agent |
| FinRobot | [AI4Finance-Foundation/FinRobot](https://github.com/AI4Finance-Foundation/FinRobot) | Apache-2.0 | 3k+ | Multi-agent equity research: Lead Agent orchestrates Data → Analysis → Modeling → Synthesis → Report → Bull/Bear/Judge pipeline execution engine |
| HKUDS AI-Trader | [HKUDS/AI-Trader](https://github.com/HKUDS/AI-Trader) | Apache-2.0 | 20.6k | 100% agent-native trading from HKU Data Science Lab; supports Claude Code, Codex, Cursor; yfinance fallback; highly modular component architecture |
| FinSight | [RUC-NLPIR/FinSight](https://github.com/RUC-NLPIR/FinSight) | MIT | 1.2k+ | ACL 2026 Main — multi-agent financial deep research: one ticker → one click → publication-ready report with charts; outscores OpenAI Deep Research (8.09 vs 6.11) and Gemini-2.5-Pro (8.09 vs 6.82) |
| FinRL | [AI4Finance-Foundation/FinRL](https://github.com/AI4Finance-Foundation/FinRL) | MIT | 12k | Financial reinforcement learning: DRL algorithms (PPO, SAC, TD3) for stocks, crypto, forex; Gymnasium-compatible; multi-task support |
| hummingbot | [hummingbot/hummingbot](https://github.com/hummingbot/hummingbot) | Apache-2.0 | 19k | High-frequency market making + arbitrage bot; 40+ exchanges; Python strategy scripts; deployable as autonomous trading agent |
| **ATLAS** | [chrisworsey55/atlas-gic](https://github.com/chrisworsey55/atlas-gic) | MIT | 2k | **NEW v6** — Self-improving AI trading system by General Intelligence Capital: 4-layer architecture (Macro 10 agents → Sector 7 → Superinvestor 4 → Decision 4), Karpathy-style autoresearch where Sharpe ratio IS the loss function; Darwinian selection kills underperformers; autonomous specialist spawning; PRISM Regime Training (separate agent cohorts per market regime: bull, crisis, rate tightening); Soros Reflexivity Engine; MiroFish Simulation (thousands of simulated market participants); +22% 18-month backtest (Sept 2024–Mar 2026), live +30% |
| **OpenFinClaw-CLI** | [mirror29/openfinclaw-cli](https://github.com/mirror29/openfinclaw-cli) | MIT | 58 | **NEW v6** — 60-second quant trading workflow agent: TypeScript 94.3%, MCP-native, 60+ built-in analysis capabilities (technical, fundamental, sentiment, risk, factor), 5 markets (US equities, A-shares, HK, crypto, FX), community strategy leaderboard, zero-install browser playground, Claude Code + Cursor native via auto MCP registration |

## New Q3 2026 Agents

| Name | Repo | License | Stars | What's New |
|------|------|---------|-------|------------|
| FinClaw | [Fin-Chelae/FinClaw](https://github.com/Fin-Chelae/FinClaw) | MIT | growing | openclaw-style financial agent: US/global equities (Yahoo Finance), Chinese A-shares (AKShare), macro (FRED), crypto (DexScreener + CoinGecko), prediction markets (Polymarket + Kalshi); push signals to Telegram, Discord, Slack, email, CLI |
| agents-for-openbb | [OpenBB-finance/agents-for-openbb](https://github.com/OpenBB-finance/agents-for-openbb) | MIT | growing | Custom AI agent workflows as OpenBB Workspace extensions; MCP server lets any Claude/GPT agent query financial data natively |
| trading-agents-plugin | [lucemia/trading-agents-plugin](https://github.com/lucemia/trading-agents-plugin) | MIT | growing | Multi-agent trading analysis as a Claude Code slash command — runs TradingAgents inside Claude Code with no external LLM API cost |
| Vibe-Trading | [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) | MIT | 16.9k | Personal trading agent: 16 message adapters (WhatsApp, Signal, Matrix, Teams, WeChat, Feishu, DingTalk, Telegram, Slack, Discord, QQ, email, Mochat, WeCom, Lark) |

## Agent Architecture Patterns

| Pattern | Repos | Use Case |
|---------|-------|---------|
| Analyst council debate | TradingAgents + ai-hedge-fund | Multiple LLM agents in structured bull/bear/risk debate before any trade |
| Data layer + analysis | OpenBB + FinRobot | MCP-first data feed → multi-agent research pipeline |
| RL continuous optimization | FinRL + Qlib | Train and adapt strategies on live market data via DRL |
| Agent-native trading | AI-Trader + FinClaw | Fully autonomous execution with messaging channel delivery |
| Deep research reports | FinSight + OpenBB | ACL 2026-grade automated equity research reports |
| Agentic payments | x402 + Mastercard Agent Pay | AI agents pay for services and execute B2B transactions autonomously |
| Self-improving agents | ATLAS | Agent prompts as model weights; Sharpe ratio as loss function; continuous evolution without GPUs |
| 60-second quant | OpenFinClaw-CLI | Natural language → strategy → backtest → paper trade in one MCP prompt |

## Benchmark Leaderboard (Financial Agents, Jul 2026)

| Benchmark | Winner | Score | Source |
|-----------|--------|-------|--------|
| FinSight Report Quality | FinSight (MIT) | 8.09/10 | vs OpenAI Deep Research 6.11, Gemini-2.5-Pro 6.82 (ACL 2026 Main) |
| ATLAS Live Performance | ATLAS (MIT) | +30% live / +22% 18-month backtest | General Intelligence Capital (Sept 2024–Mar 2026) |
| Herculean Financial Intelligence | TBD (arXiv:2605.14355) | benchmark released May 2026 | Multi-domain financial agent tasks |
| BigFinanceBench | TBD (arXiv:2606.03829) | benchmark released Jun 2026 | Workflow-grounded financial research |
| FinDeepForecast | Live leaderboard | weekly updated | 1,314 companies × 8 economies × 13 forecasting methods |
| Look-Ahead-Bench | — | arXiv:2601.13770 | Point-in-time bias detection in financial LLMs |

---
*Auto-updated by the Globant AI Studios ingest pipeline.*
