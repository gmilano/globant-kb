# Composition Patterns — Financial Services AI

> Concrete recipes for building solutions by combining repos + agents + AI.
> Each pattern names specific repos, wiring, and estimated delivery time.
> Last updated: 2026-07-05

---

## Pattern 1: Multi-Agent Investment Research Platform

**Goal**: Automate equity research: generate analyst-grade stock reports with market data, news sentiment, fundamentals, and technical analysis.

**Stack**:
- Data: [OpenBB](https://github.com/OpenBB-finance/OpenBB) via MCP server (500+ financial data sources)
- Sentiment: [FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) LoRA fine-tuned on earnings calls + news
- Debate: [TradingAgents](https://github.com/TauricResearch/TradingAgents) multi-agent framework (Bull/Bear debate pattern)
- Reasoning: Claude (claude-sonnet-5) or Llama-3-70B
- Orchestration: LangGraph
- Output: Markdown report → PDF (WeasyPrint)

**Architecture**:
```
OpenBB MCP Server
    ↓ (market data, SEC filings, earnings transcripts)
FinGPT Sentiment Agent → score [-1, +1] per news item
Fundamental Analyst Agent → P/E, revenue, margins, debt
Technical Analyst Agent → RSI, MACD, support/resistance
    ↓ (all signals)
Researcher Team → Bull Agent vs Bear Agent debate (LangGraph)
Risk Manager Agent → position sizing, stop-loss recommendation
    ↓
Portfolio Manager Agent → final BUY/HOLD/SELL + reasoning
    ↓
Report Generator → structured Markdown with citations
```

**Estimated delivery**: 6-10 weeks (2 engineers)
**Client type**: Hedge funds, family offices, wealth management

---

## Pattern 2: Intelligent Loan Origination Agent

**Goal**: AI loan officer that reviews applications, retrieves credit bureau data, assesses risk, drafts decision memos, and routes to human approval for edge cases.

**Stack**:
- Core banking: [Apache Fineract](https://github.com/apache/fineract) (loan lifecycle management)
- LLM: Llama-3-70B (self-hosted for data privacy) or Claude via API
- Orchestration: LangChain + LangGraph
- Document processing: Unstructured.io (PDF/image extraction)
- Vector DB: Qdrant (for similar past cases RAG)
- Frontend: Chainlit (conversational UI)

**Architecture**:
```
Loan Application (PDF/form)
    ↓
Document Extraction Agent (Unstructured.io)
    ↓
Credit Assessment Agent
    ├── Pulls Fineract loan history via REST API
    ├── Retrieves credit bureau data (pluggable connector)
    ├── Compares vs similar approved/rejected cases (Qdrant RAG)
    └── Scores risk across: capacity, capital, collateral, conditions
    ↓
Decision Draft Agent → generates decision memo (approved/declined + reasons)
    ↓
Human Review Queue (if score in ambiguous zone 45-65)
    ↓
Apache Fineract → creates/updates loan record on approval
```

**Key feature**: Full audit trail stored in Fineract for EU AI Act compliance. Every LLM reasoning step logged with timestamp + hash.

**Estimated delivery**: 10-16 weeks (3 engineers)
**Client type**: Regional banks, credit unions, microfinance institutions, LATAM neobanks

---

## Pattern 3: Agentic Payment Orchestration

**Goal**: AI agent dynamically selects the optimal payment processor for each transaction based on real-time cost, success rate, currency, and merchant preferences.

**Stack**:
- Payment routing: [Hyperswitch](https://github.com/juspay/hyperswitch) (Apache 2.0, Rust, 120+ PSPs)
- Intelligence layer: LangChain tool-using agent
- LLM: Claude or GPT-5 for complex routing decisions
- Data: Hyperswitch analytics API (success rates, costs, latency per PSP)
- Monitoring: Prometheus + Grafana

**Architecture**:
```
Payment Intent received
    ↓
Hyperswitch Routing Agent
    ├── Tool: get_psp_success_rates(amount, currency, card_type)
    ├── Tool: get_psp_costs(amount, currency)
    ├── Tool: get_merchant_preferences()
    └── Tool: get_real_time_psp_status()
    ↓
LLM reasons: "Stripe has 94% success for Visa Mexico but costs 2.9%+$0.30;
              Conekta has 91% success and costs 1.8%+$3 MXN for same card type"
    ↓
Decision: route to optimal PSP with fallback chain
    ↓
Revenue Recovery Agent: on failure, retry next-best PSP within 200ms
    ↓
Reconciliation Agent: daily 3-way reconciliation report
```

**Key metric**: Typical 5-8% improvement in payment success rate, 15-25% cost reduction.

**Estimated delivery**: 6-10 weeks (2 engineers)
**Client type**: E-commerce, fintechs, marketplaces in LATAM

---

## Pattern 4: AML + Fraud Detection with Explainable AI

**Goal**: Real-time transaction monitoring combining ML anomaly detection with LLM-generated human-readable explanations, routed to analyst case management.

**Stack**:
- ML engine: [Jube](https://github.com/jube-home/aml-fraud-transaction-monitoring) (AGPL, C# — or Python equivalents: PyOD + scikit-learn)
- Compliance screening: [OpenSanctions](https://github.com/opensanctions/opensanctions) (CC-BY, global sanctions + PEP lists)
- LLM reasoning: Claude for explainability reports
- Orchestration: LangGraph (event-driven, triggered by Jube alerts)
- Case management: Metabase + custom workflow UI

**Architecture**:
```
Transaction stream (Kafka/Webhooks)
    ↓
Jube ML Engine
    ├── Unsupervised: anomaly vs customer's behavioral baseline
    ├── Supervised: known fraud patterns
    └── Rules: velocity checks, geo-anomaly, amount thresholds
    ↓ (flagged transactions)
OpenSanctions Screening Agent → check sender/receiver vs global lists
    ↓ (if score > threshold)
LLM Explanation Agent
    ├── Input: transaction data + ML score + matched patterns + past cases
    ├── Output: "This transaction is flagged because: (1) amount 3.4x above
    │          customer's 90-day average, (2) first transaction to this
    │          beneficiary country, (3) beneficiary name matches OFAC list
    │          similarity 87%. Recommendation: hold for analyst review."
    └── Hash reasoning + log for EU AI Act audit trail
    ↓
Case Management Queue → analyst reviews with full context
    ↓
Decision + feedback loop → retrain ML model monthly
```

**Estimated delivery**: 8-14 weeks (3 engineers)
**Client type**: Banks, payment processors, LATAM fintechs with BACEN/SBS/CNBV requirements

---

## Pattern 5: CFO AI Copilot on ERPNext

**Goal**: Conversational AI copilot for CFOs/finance teams: answer questions about financial position, flag anomalies, generate management reports on demand.

**Stack**:
- ERP: [ERPNext](https://github.com/frappe/erpnext) (GPL, Python/Frappe)
- LLM layer: LlamaIndex over ERPNext data (SQL agent + RAG on documents)
- Embedding: text-embedding-3-small or Nomic-embed
- Vector DB: ChromaDB (lightweight, self-hosted)
- UI: Frappe's built-in chatbot widget or Slack bot

**Architecture**:
```
CFO asks: "What's our AR aging this month compared to last quarter?
           Which customers are most at risk of default?"
    ↓
SQL Agent → generates ERPNext MariaDB query for AR aging data
RAG Agent → retrieves relevant past board memos on credit risk policy
Financial Analysis Agent
    ├── Computes AR aging buckets (0-30, 31-60, 61-90, 90+ days)
    ├── Flags customers with deteriorating payment patterns
    └── Cross-references with news sentiment for public companies
    ↓
Report Generator → Markdown table + narrative explanation
    ↓
Action Suggester → "Consider sending dunning notices to [customers];
                    adjust credit limit for [company] given 45-day delay trend"
```

**Pre-built queries to implement**:
- Cash flow 13-week forecast
- Budget vs actual variance analysis
- Gross margin by product line / region
- FX exposure summary (multi-currency)
- Accounts payable optimization (early payment discount opportunities)

**Estimated delivery**: 6-10 weeks (2 engineers)
**Client type**: Mid-market companies already on ERPNext or willing to migrate

---

## Pattern 6: FinRL Quantitative Strategy Agent

**Goal**: RL-trained portfolio management agent that learns optimal trading policies from historical market data, backtests against benchmarks, and operates in paper trading.

**Stack**:
- RL framework: [FinRL](https://github.com/AI4Finance-Foundation/FinRL) (MIT, PyTorch)
- Data: [OpenBB](https://github.com/OpenBB-finance/OpenBB) for historical OHLCV + fundamentals
- Backtesting: [zipline-reloaded](https://github.com/stefan-jansen/zipline-reloaded) or FinRL built-in env
- Paper trading: Alpaca Markets API (free paper trading account)
- Monitoring: MLflow for experiment tracking

**Architecture**:
```
Training Phase:
OpenBB → 5+ years OHLCV + fundamentals for 50-500 assets
    ↓
FinRL Environment → StockTradingEnv (multi-asset, transaction costs)
    ↓
DRL Training → PPO agent (best for portfolio problems)
    → 500k environment steps, ~4 hours on A100
    ↓
Evaluation → Sharpe ratio, max drawdown, Calmar ratio vs S&P500 / 60-40

Deployment Phase:
    ↓
Paper Trading Agent → receives live market data via OpenBB
    → queries trained PPO policy for action (weights per asset)
    → executes via Alpaca paper trading API
    ↓
TradingAgents Debate Layer → RL signal + LLM analyst debate → final decision
    ↓
Risk Manager Agent → enforces position limits, stop-losses
```

**Estimated delivery**: 8-12 weeks (2 ML engineers)
**Client type**: Quant funds, family offices, hedge funds evaluating systematic strategies

---

## Component Quick-Reference

| Need | Open-Source Tool | License |
|------|-----------------|---------|
| Financial market data | OpenBB MCP Server | AGPL |
| Sentiment analysis | FinGPT (LoRA fine-tune) | MIT |
| Multi-agent debate | TradingAgents | Apache 2.0 |
| RL portfolio | FinRL | MIT |
| Core banking | Apache Fineract | Apache 2.0 |
| Payments orchestration | Hyperswitch | Apache 2.0 |
| ERP + accounting | ERPNext / Frappe | GPL |
| KYC/AML screening | OpenSanctions | CC-BY |
| Fraud/AML ML | Jube | AGPL |
| Crypto exchange API | ccxt | MIT |
| Portfolio optimization | PyPortfolioOpt | MIT |
| Subscription billing | Kill Bill | Apache 2.0 |
