# 🎯 Top AI Agents — Financial Services

> Open source AI agents and tools for financial industry verticals.
> Focus: MIT / Apache 2.0 — licenses Globant can build on commercially.
> Last updated: 2026-07-09

## Top 10 AI Agents & Frameworks

| Name | Repo | License | Stars | Description |
|------|------|---------|-------|-------------|
| TradingAgents | [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | MIT | 80k+ | Multi-agent LLM framework that simulates a full trading firm: analysts, risk managers, portfolio managers, and fund manager as specialized agents collaborating via structured debate |
| ai-hedge-fund | [virattt/ai-hedge-fund](https://github.com/virattt/ai-hedge-fund) | MIT | 50k+ | Multi-role AI hedge fund deploying 14 legendary investor personas (Buffett, Munger, Burry) plus analytical agents (bull, bear, fundamentals, technicals, risk) that debate stock picks |
| OpenBB | [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) | AGPLv3 | 38.4k | Open Data Platform for analysts, quants, and AI agents — "connect once, consume everywhere" infrastructure exposing financial data to Python, Excel, MCP servers, and REST APIs |
| Microsoft Qlib | [microsoft/qlib](https://github.com/microsoft/qlib) | MIT | 44k+ | AI-oriented Quant investment platform covering the full pipeline from research to production; supports supervised learning, market dynamics modeling, RL, and integrates RD-Agent for automated R&D |
| CCXT | [ccxt/ccxt](https://github.com/ccxt/ccxt) | MIT | 43.5k | Unified crypto trading API connecting 100+ exchanges in JavaScript/Python/PHP; essential infrastructure layer for any crypto trading agent |
| FinRobot | [AI4Finance-Foundation/FinRobot](https://github.com/AI4Finance-Foundation/FinRobot) | Apache-2.0 | 3k+ | Multi-agent equity research platform where a Lead Agent orchestrates specialized agents (Data, Analysis, Modeling, Synthesis, Report, Bull, Bear, Judge) through a pipeline execution engine |
| HKUDS AI-Trader | [HKUDS/AI-Trader](https://github.com/HKUDS/AI-Trader) | Apache-2.0 | 20.6k | 100% fully automated agent-native trading framework from HKU Data Science Lab; supports Claude Code, Codex, Cursor; yfinance fallback for live prices; highly modular |
| FinSight | [RUC-NLPIR/FinSight](https://github.com/RUC-NLPIR/FinSight) | MIT | 1.2k+ | ACL 2026 multi-agent deep research system: one ticker → one click → publication-ready report with charts; scores 8.09 vs OpenAI Deep Research 6.11 and Gemini-2.5-Pro 6.82 |
| FinRL | [AI4Finance-Foundation/FinRL](https://github.com/AI4Finance-Foundation/FinRL) | MIT | 12k | Financial reinforcement learning library: DRL algorithms (PPO, SAC, TD3) for trading, portfolio allocation, and risk management on stocks, crypto, and forex |
| hummingbot | [hummingbot/hummingbot](https://github.com/hummingbot/hummingbot) | Apache-2.0 | 19k | Open source high-frequency market making and arbitrage trading bot; supports 40+ exchanges; deployable as agent with strategy scripts |

## Agent Architecture Patterns

| Pattern | Repos | Use Case |
|---------|-------|---------|
| Analyst council | TradingAgents + ai-hedge-fund | Multiple LLM agents debate before trading |
| Data layer + analysis | OpenBB + FinRobot | Standardized data feed → multi-agent research pipeline |
| RL continuous optimization | FinRL + Qlib | Train and adapt strategies on live market data |
| Agent-native trading | AI-Trader + Vibe-Trading | Fully autonomous execution with 16 message adapters |
| Deep research reports | FinSight + OpenBB | Automated equity research reports, ACL 2026-grade quality |

## New Q2-Q3 2026 Agents

| Name | Repo | What's New |
|------|------|------------|
| Vibe-Trading | [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) | Personal trading agent with 16 built-in message adapters (WhatsApp, Slack, Discord, Telegram, WeChat, etc.) — ships trading signals to any channel |
| agents-for-openbb | [OpenBB-finance/agents-for-openbb](https://github.com/OpenBB-finance/agents-for-openbb) | Custom agent plugins for OpenBB Workspace; MCP server integration for AI agent data access |
| FinSight (ACL 2026) | [RUC-NLPIR/FinSight](https://github.com/RUC-NLPIR/FinSight) | Published ACL 2026 Main — outperforms all commercial deep research systems on financial report quality |

---
*Auto-updated by the Globant AI Studios ingest pipeline.*
