# Trends — Financial AI

> Current technology, regulatory, and business model trends.
> Last updated: 2026-07-06

## Trend 1: Agentic AI as "Digital Co-Workers" at Wall Street Banks

2026 is the year agentic AI moved from pilot to production at scale in financial services. Goldman Sachs' Claude-powered agents autonomously handle core trade accounting and client onboarding. JPMorgan projects $1.5–2B annual AI-generated value. This signals that **the barrier for enterprise financial AI is not technology — it's governance frameworks**.

**Implication for Globant**: The opportunity is in the governance + integration layer, not just the AI models.

## Trend 2: MCP as the Open Standard for Financial Agent Connectivity

Morgan Stanley's June 2026 announcement — opening its wealth management platform to external AI agents via **Model Context Protocol (MCP)** — is a landmark. It means:
- Any MCP-compatible agent (Claude, GPT-4o) can now query financial data via standardized connectors
- LLMQuant's `data-mcp`, OpenBB's MCP server, and Fineract Agent Skills are the open-source equivalents
- **The race to build MCP servers for every financial data source has begun**

**Implication for Globant**: Build a library of financial MCP servers (brokerage data, tax authorities, banking APIs) as a productized offering.

## Trend 3: Multi-Agent Trading Firm Architecture

TradingAgents (80k+ stars) popularized the "simulated trading firm" pattern: separate specialized agents (Bull Analyst, Bear Analyst, Risk Manager, Fundamentals Analyst) that debate and reach consensus before executing. This pattern is being adapted for:
- **Investment research**: parallel analyst agents covering different sectors
- **Credit decisioning**: multiple agents evaluating creditworthiness from different angles
- **M&A due diligence**: parallel agents scanning legal, financial, ESG dimensions

## Trend 4: Agentic Compliance & AML Automation

Financial crime compliance is labor-intensive (AML analysts manually review SAR filings, KYC documents). Agentic AI frameworks now automate:
- **Transaction monitoring**: agent watches for patterns, flags, escalates
- **SAR generation**: agent drafts Suspicious Activity Reports from flagged transactions
- **KYC document processing**: agent extracts, verifies, cross-references ID documents

Research paper ("Agentic AI for Financial Crime Compliance", arxiv 2509.13137) describes a full orchestration framework. BCG warns that agentic AI could also **industrialize financial scams** — 90% cost reduction for scammers, 2× volume surge expected. This creates demand for defensive agentic AI.

## Trend 5: Prediction Market Data as Agent Calibration Signal

The Jon-Becker prediction-market-analysis dataset (36 GB from Polymarket + Kalshi) is becoming the calibration ground for LLM trading agents. TradingAgents v0.3.0 integrated Polymarket directly. The signal: **prediction market prices encode collective intelligence** that LLM agents can use as a prior for macro and event-driven trading.

## Trend 6: Fine-Tuned Financial LLMs Replacing General-Purpose Models for Domain Tasks

FinGPT continues to outperform general LLMs on financial-specific tasks (sentiment on earnings calls, SEC filing analysis, credit language parsing). The 2026 FinRL Contest added fine-tuned LLM tracks. Trend: **vertical financial LLMs > general LLMs for domain-specific signals**.

**Implication**: Globant can offer fine-tuning services for financial clients — take FinGPT base and fine-tune on client's proprietary data (loan applications, internal filings).

## Trend 7: AI-Native CFO Tools for Mid-Market

Ramp ($16B) and Brex ($12.3B) are building AI-native financial operations for mid-market companies. The open-source equivalent: Odoo + FinGPT + an expense categorization agent. **44% of finance teams are using agentic AI in 2026** — up from virtually zero in 2024. Mid-market CFOs want this; they just can't afford Ramp/Brex implementations.

## Trend 8: Real-Time Risk Management Agents

Traditional risk management is batch (overnight var calculations). Agentic AI enables real-time:
- Continuous portfolio stress-testing against live market data
- Automated hedging suggestions when risk thresholds are breached
- Multi-agent debate (bull vs. bear) before any risk limit change

QuantLib + TensorFlow Quant Finance provide the pricing primitives; TradingAgents provides the orchestration pattern.

## Trend 9: Open Banking + AI = Hyper-Personalized Finance

Regulatory open banking mandates (EU PSD2, Brazil Open Finance, Mexico API rules) expose bank APIs to third parties. **AI agents as the interface layer** for open banking: personalized savings recommendations, automated switching to best rates, predictive cash flow management. All built on top of open banking APIs + local LLMs.

## Trend 10: EU AI Act August 2026 Deadline — Financial AI Compliance

The EU AI Act's **August 2026 compliance deadline** for high-risk AI systems includes:
- Credit scoring models
- Insurance underwriting
- Fraud detection systems

Requirements: explainability, human oversight, auditability, bias testing. Any Globant client deploying AI in EU financial services needs compliance-by-design. **This is a direct consulting and implementation opportunity**.

## Trend 11: Quantitative AI (Quant-AI) Merging Disciplines

LLMQuant, Open Finance Lab, TauricResearch are merging classical quant finance (factor models, regime detection, risk management) with LLM reasoning. The pattern: LLMs for narrative/sentiment signals + traditional quant for risk management + RL for execution. TradingAgents v0.3.1 exemplifies this — the framework is now used both by quant researchers and by engineers building agentic trading products.

---
*See `intel/market.md` for sizing, players, and LATAM analysis.*
