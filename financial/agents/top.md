# Top AI Agents — Financial Services

> Last updated: 2026-07-11 | v9 | Focus: agentic trading, AML/compliance, wealth management, investment research

## Core Agents & Frameworks

| # | Agent / Repo | Stars | License | Category | Description |
|---|---|---|---|---|---|
| 1 | [virattt/ai-hedge-fund](https://github.com/virattt/ai-hedge-fund) | ~60k | MIT | Trading | 19-agent multi-agent hedge fund. 14 investor persona agents modeled on Buffett, Graham, Burry, Wood, Taleb, Lynch, Munger, Ackman, Fisher, Druckenmiller, Damodaran, Pabrai, Jhunjhunwala + Risk Manager + Portfolio Manager. Synthesizes signals into final allocation decisions. Educational POC, not for live trading. |
| 2 | [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | ~55k | MIT | Trading | Full trading-desk simulation: analyst agents (fundamentals, technicals, bull/bear), risk manager, portfolio manager, fund manager—all as autonomous LLM agents. v0.3.1 (Jul 2026): Claude Sonnet 5 / Fable 5 support, Alpha Vantage look-ahead bias filtering, graph-router crash-safety. |
| 3 | [AI4Finance-Foundation/FinRobot](https://github.com/AI4Finance-Foundation/FinRobot) | ~1.2k | Apache-2.0 | Research Platform | Multi-layer AI agent platform: Financial Chain-of-Thought (CoT) layer → LLM algorithm layer → LLMOps/DataOps → multi-source LLM foundation. Covers investment research, market forecasting, portfolio management, financial report analysis. |
| 4 | [AI4Finance-Foundation/FinRL](https://github.com/AI4Finance-Foundation/FinRL) | ~3.4k | MIT | RL Trading | Financial Reinforcement Learning framework. Train RL agents on historical market data for portfolio optimization, stock trading, crypto strategies. Integrates Gymnasium, Stable-Baselines3. The foundational RL-for-finance library. |
| 5 | [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | ~2.9k | MIT | LLM | Open-source financial LLMs fine-tuned on SEC filings, earnings calls, financial news. Tasks: sentiment analysis, credit scoring, financial Q&A, robo-advisory. Models available on HuggingFace. |
| 6 | [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) | ~17k | MIT | Personal Agent | Personal trading agent. Robinhood Agentic Trading support added May 2026. Bounded autonomy: filesystem-level instant kill switch, preemptive flatten, mandate auto-expiry. User sets committed mandate; agent acts within it only. |
| 7 | [Open-Finance-Lab/AgenticTrading](https://github.com/Open-Finance-Lab/AgenticTrading) | ~500 | Apache-2.0 | Research Lab | Interactive research/educational platform for LLM-powered trading. Systematic survey of agentic trading research. Supports live-market paper trading via real-time market data. Useful for benchmarking agent strategies before live deployment. |
| 8 | [jube-home/aml-fraud-transaction-monitoring](https://github.com/jube-home/aml-fraud-transaction-monitoring) | ~600 | AGPL-3.0 | AML/Compliance | Real-time AML and fraud detection. Combines supervised/unsupervised ML, rule-based detection with thresholds, sanctions screening, workflow-driven case management, adaptive learning. Full stack, no vendor lock-in. Production-grade. |
| 9 | [mominalix/AI-Based-Anti-Money-Laundering-AML-System](https://github.com/mominalix/AI-Based-Anti-Money-Laundering-AML-System) | ~300 | MIT | AML/Compliance | Microservices AML platform. ML models analyze transaction patterns, screen sanctions lists, auto-generate regulatory reports. OpenAI-integrated but LLM-swappable. Reference architecture for compliance teams. |
| 10 | [georgezouq/awesome-ai-in-finance](https://github.com/georgezouq/awesome-ai-in-finance) | ~3k | MIT | Curated List | Curated list of LLMs, deep learning strategies, datasets, and tools for financial markets. Best starting point for discovering the full landscape. |

## Agent Capability Matrix

| Agent | Real-time Data | Multi-LLM | Explainability | Audit Trail | Regulatory Ready |
|---|---|---|---|---|---|
| ai-hedge-fund | ✓ | ✓ | ✓ (reasoning chains) | ✓ | Educational only |
| TradingAgents | ✓ | ✓ (Claude/GPT/Gemini/Fable) | ✓ | ✓ | Educational only |
| FinRobot | ✓ | ✓ | ✓ (CoT) | Partial | Research |
| FinRL | Historical | ✗ | Partial | ✓ | Research |
| FinGPT | ✓ (news/filings) | ✗ | Partial | ✓ | Research |
| Vibe-Trading | ✓ | ✓ | ✓ | ✓ | Personal use |
| AgenticTrading | Paper/live | ✓ | ✓ | ✓ | Research |
| Jube AML | ✓ | ✗ | ✓ (SHAP + rules) | ✓ | Production |
| AML System | ✓ | ✓ | Partial | ✓ | POC → production |

## JPMorgan AI Agents Milestone (July 2026)

Bloomberg reported (2026-07-09) that JPMorgan's internal AI agents **beat the 60/40 portfolio in backtests**. The bank runs 400+ AI use cases with 2,000+ AI specialists on a $2B annual AI budget, generating $1.5B in cumulative cost savings. This is the market signal that agentic financial AI has moved from POC to institutional-grade production.

## EU AI Act — High-Risk AI Classification (August 2026)

Credit scoring, lending decisions, AML, anti-fraud detection = **high-risk AI** under EU AI Act. Enforcement began August 2026. Production deployments require:
- Human oversight mechanisms
- Explainability / audit logs (SHAP, decision traces)
- Registration in EU AI Act database
- GDPR compatibility for personal financial data
- Penalties up to 7% of global annual turnover for non-compliance

Use educational/research agents as POC starting points only. Layer Jube-style audit trails + SHAP explainability before any production EU deployment.
