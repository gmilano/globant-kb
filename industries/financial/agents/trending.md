# Trending AI Agents — Financial (Week of 2026-07-02)

## Breakout Projects

### TradingAgents v0.2.2 — 90.4K Stars (New #1)
[TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) — Apache-2.0

The fastest-growing finance AI repo in GitHub history. v0.2.2 (March 2026) released with:
- Multi-provider LLM support: GPT-5.4, Gemini 3.1, Claude 4.6, Grok 4.x
- Anthropic effort control + five-tier rating scale
- OpenAI Responses API integration
- Simulates full trading firm: fundamental/sentiment/technical analysts → researcher → trader → risk manager
- Built on LangGraph for stateful, graph-based agent workflows

*Why it matters for Globant*: Apache-2.0, production-quality architecture, can be deployed as a client-facing trading intelligence platform. The architecture is the new reference model for multi-agent financial systems.

### ai-hedge-fund — 60.7K Stars (Updated)
[virattt/ai-hedge-fund](https://github.com/virattt/ai-hedge-fund) — MIT

Updated star count from previous run (50K → 60.7K in 6 weeks). New:
- 13 investor persona agents (up from initial set)
- Supports 13 LLM providers simultaneously
- React 18 + FastAPI + LangGraph full-stack reference architecture
- Bull/Bear agent debate architecture is now being copied by commercial products

### Vibe-Trading — 16.9K Stars, Rapid Growth
[HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) — MIT

+thousands of stars/week. Multi-agent trading research workspace with:
- Conversational strategy generation
- Real backtesting integration
- Portfolio analysis in one unified interface
- Fills the UX gap between technical trading tools and non-quant users

### OpenBB MCP Server — Paradigm Shift
[OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) — AGPL-3.0

MCP (Model Context Protocol) server integration now live — AI agents (Claude, GPT, open models) can call live market data, fundamentals, and economic indicators as **native tool calls**. No custom API wrappers needed. This is the most significant architecture change in financial AI tooling in 2026.

### AutoHedge — New Swarm-Based Entry
[The-Swarm-Corporation/AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge) — Apache-2.0

"Build an autonomous hedge fund in minutes" — swarm intelligence approach (not LangGraph) for multi-agent market analysis, risk management, and trade execution. Growing fast as an alternative architecture to TradingAgents.

### FinGuard — Compliance Specialist Model
New open-source compliance detection LLM, initialized from Qwen3-8B, trained via supervised fine-tuning + self-play RL:
- 90.23 / 85.43 F1 on compliance detection benchmarks
- Outperforms larger general-purpose models on FinReg tasks
- Detects financial regulatory non-compliance in LLM interactions
- [Paper: arxiv.org/pdf/2605.29427](https://arxiv.org/pdf/2605.29427)

## Ecosystem Signals

- **$2.1B VC** flowed into AI-powered fintech in Q1 2026 alone
- **44%** of finance teams using agentic AI in 2026 (up from <7% in 2025)
- **95%** of PE firms have begun or plan agentic AI adoption
- AI agents in financial services market: $1.96B (2026) → $6.53B (2035)
- Multi-agent debate (Bull vs. Bear → risk review → execution) is now the *de facto* standard architecture

## Architecture Pattern Convergence

Both TradingAgents and ai-hedge-fund independently converged on the same model:
```
Specialist analysts (Fundamental / Sentiment / Technical)
          ↓
Bull agent ←→ Bear agent (structured debate)
          ↓
Risk Manager review
          ↓
Final trading decision
```
This is now the reference architecture for any Globant financial AI engagement.
