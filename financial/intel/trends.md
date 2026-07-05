# Trends — Financial Services AI

> Current trends shaping financial AI in 2026. Based on industry research and OSS momentum.
> Last updated: 2026-07-05

## Macro Trend: The Agentic Finance Year

2026 is the deployment year for agentic AI in finance. The shift is from:
- **2024**: Pilots, chatbots, summarization tools
- **2025**: Production RAG, copilots for analysts
- **2026**: Autonomous multi-agent systems executing real financial workflows

Wolters Kluwer: 44% of finance teams will use agentic AI in 2026 (+600% YoY). Average ROI: 2.3x within 13 months. Frontier firms achieving 2.84x vs laggards at 0.84x.

---

## Trend 1: Multi-Agent Debate as Standard Architecture

**What**: Instead of one LLM making a decision, multiple specialized agents debate before acting.

**Evidence**: TradingAgents (91k★ Apache 2.0) and ai-hedge-fund independently converged on the same architecture: specialist analysts → structured bull/bear debate → risk manager review → final decision. The pattern is now referenced in academic literature (ICLR 2026).

**Impact for Globant**: Any financial AI engagement should use this pattern. It improves accuracy and provides natural explainability for regulators.

**Recipe**: Fundamental Analyst + Sentiment Analyst + Technical Analyst → Researcher debate → Risk Manager → Portfolio Manager. All LangGraph nodes.

---

## Trend 2: Financial LLM Fine-Tuning at <$300

**What**: The era of $3M proprietary models (BloombergGPT) is over. FinGPT-style LoRA fine-tuning on domain data costs <$300 and matches or exceeds Bloomberg on financial NLP tasks.

**Evidence**: FinGPT (MIT, 20.8k★) demonstrates F1 scores matching BloombergGPT on FPB, FiQA-SA, TFNS sentiment benchmarks using Llama-3 + LoRA. Training cost: <$300 on A100.

**Impact for Globant**: Stop recommending proprietary financial LLMs. Fine-tune open-source models (Llama-3, Qwen, DeepSeek-R1) on client data. Client owns the resulting model — no vendor dependency.

---

## Trend 3: MCP as the Financial Data API Standard

**What**: Model Context Protocol (MCP) is becoming the standard way AI agents connect to financial data. OpenBB's MCP server lets Claude/GPT read stock prices, SEC filings, earnings transcripts, macro data without custom integration code.

**Evidence**: OpenBB (AGPL, 70.1k★) launched MCP server in early 2026; star growth accelerated. Multiple fintech startups now describe their product as "an MCP server for [X financial data]."

**Impact for Globant**: Design financial AI architectures with MCP as the data layer. OpenBB MCP server → Claude agent is now a 1-day setup for any investment research use case.

---

## Trend 4: Agentic Payments (Visa/Mastercard AI Frameworks)

**What**: Both Visa and Mastercard launched frameworks in Q1 2026 enabling AI agents to browse, select, and transact autonomously. The agent has a payment credential and makes purchase decisions within set constraints.

**Evidence**: IMF Notes Volume 2026 Issue 004 specifically analyzes "How Agentic AI Will Reshape Payments." JPMorgan, Goldman Sachs, and Stripe all announced agent-compatible APIs.

**Impact for Globant**: Agentic commerce is the next wave. Hyperswitch (Apache 2.0, 43k★) + LangGraph agent is the open-source implementation. Build client POCs now before proprietary lock-in.

---

## Trend 5: EU AI Act High-Risk Classification (Aug 2026)

**What**: The EU AI Act's enforcement date for high-risk AI systems is August 2026. Financial AI systems (credit scoring, fraud detection, investment advice) are classified as high-risk, requiring full explainability, audit trails, human oversight, and bias testing.

**Impact for Globant**: Every EU financial AI engagement needs:
1. Decision audit log (hash every reasoning step)
2. Human-in-the-loop for high-stakes decisions
3. Bias and fairness testing on protected attributes
4. Model card and risk assessment documentation

**OSS tools**: LangSmith (tracing), OpenSanctions (KYC), Jube (explainable ML scores), SHAP/LIME for model explainability.

---

## Trend 6: Open-Source Core Banking Renaissance

**What**: Apache Fineract + Hyperswitch + LedgerSMB form a viable open-source banking stack for the first time. Previously, core banking was proprietary and expensive (Temenos, FIS, Finastra). In 2026, LATAM neobanks and credit unions are building on OSS.

**Evidence**: Apache Fineract serves 400+ institutions, 20M+ customers. Hyperswitch reached 43k stars with production deployments. open-bank-oss (new, Kotlin/Quarkus) demonstrates cloud-native reference architecture.

**Impact for Globant**: Greenfield banking clients in LATAM can launch with Apache Fineract + Hyperswitch + Claude agent for <$200k in implementation costs. Previously would have required $1M+ proprietary stack.

---

## Trend 7: Quantitative Finance → Reinforcement Learning Transition

**What**: Classical quant (mean-reversion, momentum, arbitrage) is being augmented/replaced by deep RL agents that learn optimal policies from market data. FinRL (MIT, 15.6k★) is the reference framework.

**Evidence**: FinRL provides DRL agents (PPO, A2C, SAC, TD3) trained in Gym-compatible market environments. Academic papers at ICAIF 2026 show RL portfolios outperforming 60/40 in high-volatility regimes.

**Impact for Globant**: Quant fund clients should evaluate FinRL-based strategies. Pure rule-based strategies are losing edge. Combine FinRL signals with TradingAgents debate for robust decision-making.

---

## Key Numbers to Know

| Metric | Value | Source |
|--------|-------|---------|
| Financial AI market 2024→2030 | $38B → $190B (CAGR 30%) | Industry research |
| Finance teams using agentic AI 2026 | 44% (+600% YoY) | Wolters Kluwer |
| VC into AI fintech Q1 2026 | $2.1B | Venture data |
| JPMorgan annual AI business value target | $1.5–2B | JPMorgan IR |
| Average agentic AI ROI | 2.3x in 13 months | Accenture |
| FinGPT fine-tuning cost vs BloombergGPT | $300 vs $3M | AI4Finance |
| Financial industry AI investment by 2027 | $97B | Industry research |
