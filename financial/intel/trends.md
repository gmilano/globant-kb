# 📡 Trends — Financial Services AI

> Current movements shaping where financial AI is going. Updated with fresh signals.
> Last updated: 2026-07-09

## Macro Trend: Agentic Finance is Here

2026 marks the inflection where financial AI moved from analytical copilots to **autonomous agents that act**:
- Approving loans, reconciling transactions, flagging compliance risks, negotiating contract terms — all without human in the loop
- 84% of visionary CFOs deployed autonomous agents for real-time treasury management (Gartner 2026)
- 65% of financial institutions deployed AI tools for analytics, trading, or risk monitoring

---

## T1 — Agentic Treasury Management (84% CFO Adoption)

Gartner's 2026 FinTech Survey: 84% of visionary CFOs deployed autonomous agents for real-time treasury management. AI agents now monitor cash positions, execute FX hedges, and optimize short-term liquidity without human approval — within pre-approved parameters.

**Key repos:** Qlib (strategy layer), OpenBB (data layer), QuantConnect Lean (execution)

---

## T2 — EU AI Act Aug 2, 2026 — Financial Services Compliance Deadline

The EU AI Act's high-risk provisions are live as of August 2, 2026. In scope for financial institutions:
- Credit scoring and creditworthiness assessment of natural persons
- Risk assessment and pricing in life and health insurance
- AI systems evaluating financial standing of individuals (AML, fraud detection scores)

Penalties: €15M or 3% of global annual turnover. Requirements: automated logging, risk management, data governance, technical documentation, bias monitoring, human oversight.

**Business opportunity:** Most compliance functions don't have an AI system inventory. Globant can deliver an "EU AI Act Readiness" accelerator.

---

## T3 — Visa + Mastercard AI Agent Payment Authorization

Both Visa and Mastercard launched frameworks in 2026 enabling merchants to:
- Verify AI agents as trusted payment initiators
- Process payments autonomously without a human clicking "buy"

This unlocks true agentic commerce: AI assistants that book travel, purchase services, and execute B2B purchases end-to-end.

---

## T4 — Multi-Agent Trading Firm Simulation (80k★ TradingAgents)

TradingAgents crossed 80k GitHub stars, cementing multi-agent LLM simulation as the dominant architecture for AI trading:
- Analyst agents (fundamentals, technicals, sentiment, news) work in parallel
- Risk manager agent gates decisions
- Portfolio manager synthesizes and positions
- Fund manager sets strategy context

Pattern adopted from real trading desk org charts → simulated in LLM agent graph.

---

## T5 — FinSight ACL 2026: AI Outperforms Commercial Deep Research

FinSight (ACL 2026 Main) from Renmin University:
- Multi-agent pipeline: data collection → analysis → chart generation → publication-ready report
- Scores 8.09 vs Gemini-2.5-Pro Deep Research (6.82) and OpenAI Deep Research (6.11)
- Open source (MIT) — Globant can deploy this for equity research automation

---

## T6 — HKUDS Vibe-Trading: 16 Messaging Adapters

Vibe-Trading (16.9k★) represents the "trading signals as notifications" paradigm:
- Agent analyzes market, executes analysis, pushes signal to any messaging platform
- 16 adapters: WhatsApp, Signal, Matrix, Teams, WeChat, Feishu, DingTalk, Telegram, Slack, Discord, QQ/NapCat, WeCom, Lark, email, Mochat
- Pattern: AI agent → any channel → human decision to confirm (or full auto)

---

## T7 — Embedded Finance Acceleration

Non-financial platforms integrating financial capabilities directly into user experiences:
- Lending, insurance, savings, payroll, wealth management inside non-fintech apps
- Stripe + Airwallex enabling multi-card, multi-currency checkout orchestration
- AI agents as the "finance layer" inside B2B SaaS products

---

## T8 — LATAM: Capital to Profitable Verticals (Not Neobanks)

Fintech investment in LATAM is maturing:
- 2026 capital flows: B2B payments, SME credit, embedded finance — not consumer neobanks
- Brazil dominates: 4 of top 10 Q1 2026 fintech deals
- Mexico: 77% AI adoption, 80% fintech-bank partnerships
- Unit economics now matter; "users without profit" are no longer fundable

**Globant angle:** SME AI CFO (ERPNext + LLM), credit agent for underserved (Fineract + FinRL), AML for Brazilian banks.

---

## T9 — KYC / AML Automation: Clearest ROI in LATAM

KYC and AML automation identified as the clearest short-term ROI use cases in LATAM:
- BCB (Brazil) and CNBV (Mexico) both require written model governance and human oversight on high-impact decisions
- Document verification agents + AML transaction monitoring agents = immediate cost reduction
- Pipeline: document ingestion → LLM extraction → risk scoring → human review on edge cases

---

## T10 — Microsoft Qlib + RD-Agent: Automated Quant R&D

Microsoft Qlib now integrates RD-Agent, enabling automated quant research pipelines:
- LLM generates trading hypotheses → backtests → evaluates → iterates
- From idea to production-ready strategy without human quant analyst
- 44k+ stars; MIT license; deployable on Azure

---

## T11 — Prediction Market AI Infrastructure

The "CCXT for prediction markets" moment:
- Polymarket and Kalshi getting unified API treatment
- 36GB Polymarket historical dataset available for training forecasting agents
- AI agents trading information markets — new category for hedge funds and macro traders

---

## T12 — OpenBB MCP Server: Financial Data for AI Agents

OpenBB's MCP server integration means any MCP-compatible AI agent (Claude, GPT-4o, Gemini) can:
- Query financial data (prices, fundamentals, earnings, macro) via natural language
- Get standardized, cleaned data without writing custom connectors
- Replaces Bloomberg Terminal for programmatic agent data needs

---

## T13 — Brazil's Fintech Dominance: 4/10 Top Q1 2026 Deals

Brazil cements its position as LATAM's #1 fintech hub:
- 14.92% of regional fintech investment share
- PIX open banking API enables AI agent access to bank data with customer consent
- Nubank (100M+ customers) setting AI-native credit scoring benchmark for region

---

## T14 — Agent-Native vs Tool-Using LLMs: Architecture Shift

New architecture paradigm becoming standard in 2026:
- **Old**: LLM with tool-use capabilities added on top of existing system
- **New**: System designed from the ground up for LLM orchestration as the primary flow

Repos demonstrating this: AI-Trader, Vibe-Trading, TradingAgents. Characteristics:
- Multi-agent debate before any action
- Continuous feedback loop from execution outcomes
- Modular agent components, not monolithic prompts

---

## T15 — Autonomous Loan Approval + Contract Negotiation

Moving beyond analytics into autonomous action:
- AI agents proactively approving microloans (within credit policy bounds)
- Contract negotiation agents in B2B lending and insurance
- 58% of finance departments used AI agents in 2024 → estimated 75%+ in 2026

---

*Sources: Gartner 2026, Finastra, Mordor Intelligence, Innowise, Infutrix, Fintech.Global, Galileo-FT, EU AI Act Official Text, GitHub.*
