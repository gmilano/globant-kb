# 📈 Trending Repos — Financial Services

> Gaining momentum in Q2-Q3 2026. High-star and fast-rising newcomers.
> Last updated: 2026-07-10 (v7)

## Breakout Repos (2026)

| Repo | License | Stars | Why Trending |
|------|---------|-------|--------------|
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | MIT | 80k+ | Most-starred AI trading repo; v0.3.1 Jul 2026: Claude Fable 5 + Bedrock + NVIDIA/Kimi/Groq/Mistral; FRED + Polymarket data; Alpha Vantage look-ahead fix |
| [virattt/ai-hedge-fund](https://github.com/virattt/ai-hedge-fund) | MIT | 59k+ | 14 legendary investor persona debate architecture; backtesting module; widely forked for bespoke quant funds |
| **[xbtlin/ai-berkshire](https://github.com/xbtlin/ai-berkshire)** | MIT | **11.8k** | **NEW v7** — Claude Code native value investing; 4-master adversarial debate; /investment-team skills; ¥1.46M+ live returns; launched Jun 27 2026 |
| [HKUDS/AI-Trader](https://github.com/HKUDS/AI-Trader) | Apache-2.0 | 20.6k | 100% agent-native trading; Claude Code + Codex + Cursor runtime support; modular architecture |
| [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) | MIT | 16.9k | 16 message adapters (WhatsApp, Signal, Matrix, Teams, WeChat, Feishu, DingTalk, Telegram, Slack, Discord, QQ, email + more); live signals to any channel |
| [RUC-NLPIR/FinSight](https://github.com/RUC-NLPIR/FinSight) | MIT | 1.2k+ | ACL 2026 Main — SOTA financial research agent; one ticker → full report with charts; outperforms OpenAI + Gemini Deep Research |
| [Fin-Chelae/FinClaw](https://github.com/Fin-Chelae/FinClaw) | MIT | growing | openclaw-style financial agent: US + A-shares + FRED + crypto + Polymarket/Kalshi; multi-channel delivery |
| [OpenBB-finance/agents-for-openbb](https://github.com/OpenBB-finance/agents-for-openbb) | MIT | growing | Custom AI agent plugins for OpenBB Workspace; MCP server for AI agent financial data access |
| [microsoft/qlib](https://github.com/microsoft/qlib) | MIT | 44k+ | RD-Agent integration: LLM generates quant hypotheses → backtests → iterates → promotes to live |
| [xpaysh/awesome-x402](https://github.com/xpaysh/awesome-x402) | MIT | growing | x402 HTTP 402 payment protocol for AI agents; Python/TS/Rust SDKs; 22-member Foundation |
| [chrisworsey55/atlas-gic](https://github.com/chrisworsey55/atlas-gic) | MIT | 2k | ATLAS: self-improving trading system; Darwinian agent selection; autonomous spawning 25→31 agents; live +30% |
| [mirror29/openfinclaw-cli](https://github.com/mirror29/openfinclaw-cli) | MIT | growing | OpenFinClaw-CLI: 60-second quant agent for Claude Code; 5 markets; MCP-native; community leaderboard |
| [FinAegis/core-banking-prototype-laravel](https://github.com/FinAegis/core-banking-prototype-laravel) | Apache-2.0 | growing | FinAegis: x402-native core banking; 61 DDD domains; built-in MCP server; multi-asset; Laravel 12 |

## Repo Archetypes Emerging in 2026

### 1. Claude Code Native Finance Tools (NEW v7)
The newest pattern: financial research as Claude Code skills — no separate app, no UI, just slash commands:
- **AI Berkshire**: `/investment-team` `/earnings-review` `/industry-research` → complete value investing workflow in Claude Code; 11.8k★ in 2 weeks
- **OpenFinClaw-CLI**: `npx openfinclaw` → auto-registers as MCP tool → 60-second quant trading from Claude Code
- **trading-agents-plugin**: TradingAgents as a Claude Code slash command; no separate LLM API cost
- **ai-berkshire fork** (Hugoistaske): Buffett + Munger methodology focus; companion repo rising in parallel

Key pattern: remove the tool-switching overhead. Analysts stay inside Claude Code; slash commands invoke multi-agent research pipelines.

### 2. Self-Improving Agent Systems
The frontier of financial AI: agents that evolve their own decision logic based on market performance:
- **ATLAS**: prompts as weights, Sharpe as loss, Darwinian selection, autonomous spawning
- **OpenFinClaw**: self-writing skills at runtime, natural language → live strategy in 60 seconds
- **Qlib RD-Agent**: LLM generates quant hypotheses → backtests → promotes winners to production

Key pattern: remove the human from the strategy iteration loop. Agent modifies itself, market provides ground truth.

### 3. Agent-Native Trading (not LLM wrappers)
Repos where LLM orchestration is the primary architecture, not added on top:
- AI-Trader, Vibe-Trading, TradingAgents, FinClaw, OpenFinClaw-CLI
- Key pattern: multi-agent debate → structured decision → execution → feedback loop → channel delivery

### 4. Agentic Payment Infrastructure (v7 maturing)
The most transformative new category — AI agents with native payment capability:
- **x402 Protocol** (22-member Foundation): HTTP 402 internet-native USDC payments; production live
- **Amazon Bedrock AgentCore Payments** (May 7, 2026): managed x402 wallet for all Bedrock agents; AWS enterprise grade
- **FinAegis**: open source core banking with x402 built in; MCP-native
- **Mastercard AP4M + BVNK** ($1.8B acquisition): Agentic Tokens; machine-speed settlement; 30+ platform partners
- **Visa Intelligent Commerce MCP Server**: any agent can query + initiate Visa transactions

All three payment pillars (open protocol + cloud-managed + legacy network) now production-live and converging on x402 interoperability.

### 5. MCP-First Financial Data
- agents-for-openbb: OpenBB as MCP server → any Claude/GPT/Gemini agent queries financial data
- TradingAgents v0.3.1: FRED + Polymarket natively as MCP-compatible data vendors
- FinClaw: prediction markets (Polymarket + Kalshi) as first-class data sources
- FinAegis: full core banking operations via MCP (account creation, loan disbursement, payments)

### 6. Prediction Market Infrastructure
- FinClaw integrates Polymarket + Kalshi natively (CCXT-style)
- TradingAgents v0.3.1 ships Polymarket data vendor
- 36GB Polymarket historical dataset available for training forecasting agents

### 7. Benchmarking Infrastructure for Financial Agents
Three production-quality 2026 benchmarks enable real quality gates:
- **Herculean** (arXiv:2605.14355): agentic financial intelligence benchmark
- **BigFinanceBench** (arXiv:2606.03829): workflow-grounded financial research evaluation
- **FinDeepForecast** (arXiv:2601.05039): live weekly benchmark — 1,314 companies × 8 economies; public leaderboard

### 8. Open Source AI Governance for FSI (NEW v7)
- **FINOS AI Fund / OSERA**: machine-readable EU AI Act + FCA Consumer Duty compliance; Apache-2.0; Jun 23 2026
- **Great Expectations + Apache Atlas**: data quality + lineage for EU AI Act Article 12 (10-year log retention)
- **ATLAS autoresearch log**: every prompt modification + Sharpe impact = native audit trail

## GitHub Topics to Monitor

- [finance-ai](https://github.com/topics/finance-ai)
- [finance-agent](https://github.com/topics/finance-agent)
- [trading-agent](https://github.com/topics/trading-agent)
- [finrl](https://github.com/topics/finrl)
- [openbb](https://github.com/topics/openbb)
- [quantitative-trading-tool](https://github.com/topics/quantitative-trading-tool)
- [finance-agents](https://github.com/topics/finance-agents)
- [agentic-payments](https://github.com/topics/agentic-payments)
- [value-investing](https://github.com/topics/value-investing)

## Curated Discovery Lists

| Resource | Focus |
|----------|-------|
| [georgezouq/awesome-ai-in-finance](https://github.com/georgezouq/awesome-ai-in-finance) | LLMs + DL strategies + tools in financial markets |
| [leoncuhk/awesome-quant-ai](https://github.com/leoncuhk/awesome-quant-ai) | Quantitative investment + trading with AI/ML |
| [caramaschiHG/awesome-ai-agents-2026](https://github.com/caramaschiHG/awesome-ai-agents-2026) | 300+ AI agents across industries, finance section; updated monthly |
| [moov-io/awesome-fintech](https://github.com/moov-io/awesome-fintech) | Curated open source fintech libraries and resources |
| [xpaysh/awesome-x402](https://github.com/xpaysh/awesome-x402) | x402 ecosystem: agentic payment SDKs, tutorials, MCP integration |
| [LLMQuant](https://github.com/LLMQuant) | Organization focused on LLM applications in quantitative finance |

---
*Auto-updated by the Globant AI Studios ingest pipeline.*
