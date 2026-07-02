# Composition Patterns — Financial AI

_Concrete recipes using the repos and agents identified in this KB. Ready to pitch to clients._

---

## Pattern 1: Multi-Agent Investment Research Platform

**Use case:** Asset manager or PE firm replacing manual analyst first-pass with AI

**Stack:**
```
virattt/ai-hedge-fund          ← orchestration layer (18-agent committee)
OpenBB-finance/OpenBB          ← data layer (market data, fundamentals, news)
AI4Finance-Foundation/FinGPT   ← sentiment analysis on earnings calls / news
AI4Finance-Foundation/FinRL    ← technical signal generation (RL-trained)
```

**Wiring:**
1. OpenBB fetches daily fundamentals (P/E, EV/EBITDA, revenue growth), price data, and news
2. FinGPT processes news and earnings call transcripts → sentiment scores per ticker
3. FinRL agent generates technical trading signals (momentum, mean-reversion)
4. All signals fed into ai-hedge-fund's 18-agent committee — each agent evaluates through its investor philosophy lens
5. Portfolio manager module aggregates confidence-weighted signals → buy/hold/sell recommendation with reasoning

**Output:** Structured JSON with recommendation, confidence, agent reasoning chains, risk score

**Deployment:** Python microservice, runs nightly or on-demand per portfolio

---

## Pattern 2: RAG-Based Compliance Assistant

**Use case:** Bank compliance team needing instant answers on regulatory documents (Basel III, Dodd-Frank, MiFID II, DORA)

**Stack:**
```
LangChain or LlamaIndex         ← RAG orchestration
FinGuard (Qwen3-8B fine-tuned) ← compliance-specialized LLM
Apache Fineract                 ← core banking data source
RasaHQ/rasa                    ← conversational interface
Chroma or Qdrant               ← vector store for regulatory documents
```

**Wiring:**
1. Ingest: SEC filings, internal compliance policies, Basel III / DORA documents → Chroma vector store
2. Rasa handles conversational turn management and intent extraction from compliance officers
3. Retriever pulls top-k relevant chunks from vector store
4. FinGuard LLM (on-premise, DORA-compliant) generates grounded answer with source citations
5. Fineract integration: flag transactions or accounts referenced in queries for review

**Key advantage:** FinGuard deployed on-premise satisfies DORA/GDPR data residency requirements

---

## Pattern 3: Algorithmic Trading Bot with AI Strategy Optimizer

**Use case:** Crypto-native trading firm automating strategy discovery and execution

**Stack:**
```
freqtrade/freqtrade             ← trading engine (execution, paper trading, live)
AI4Finance-Foundation/FinRL    ← RL-based strategy training
OpenBB-finance/OpenBB          ← market data and news feeds
AI4Finance-Foundation/FinGPT   ← news sentiment as RL state feature
stefan-jansen/zipline-reloaded ← equity backtesting (if stocks, not crypto)
```

**Wiring:**
1. FinRL trains strategy agent on historical OHLCV + FinGPT sentiment features
2. Trained policy exported as Freqtrade-compatible strategy class
3. Freqtrade runs backtesting → paper trading → live trading pipeline
4. OpenBB provides additional data signals (on-chain metrics, macro events)
5. Hyperopt (Freqtrade) + Optuna tunes strategy parameters per market regime

**Deployment:** Docker stack; Freqtrade runs on VPS; FinRL training on GPU server or cloud

---

## Pattern 4: AI-Augmented Core Banking (Microfinance)

**Use case:** Microfinance institution deploying AI for loan decisioning and KYC in emerging markets

**Stack:**
```
apache/fineract                 ← core banking platform (loans, savings, accounting)
RasaHQ/rasa                    ← conversational loan officer assistant
AI4Finance-Foundation/FinGPT   ← document understanding (KYC, loan applications)
Custom RL agent (FinRL-based)  ← credit risk scoring with alternative data
```

**Wiring:**
1. Fineract exposes REST API for client profiles, loan history, repayment records
2. Rasa handles loan officer queries: "What is the credit risk for client #4521?"
3. FinGPT processes uploaded KYC documents (ID, proof of income) → structured fields
4. RL agent scores credit risk using repayment history + alternative signals (mobile money, utility payments)
5. Loan officer gets AI-recommended decision with risk explanation; makes final call

**Deployment:** On-premise (Android/USSD compatible for offline-first markets)

---

## Pattern 5: SME Financial Automation Stack

**Use case:** SME needing automated invoicing, anomaly detection, and CFO-level financial Q&A

**Stack:**
```
github.com/idurar/idurar-erp-crm  ← ERP/CRM/accounting core (MIT license)
AI4Finance-Foundation/FinGPT      ← invoice text understanding + anomaly detection
LangChain                         ← LLM orchestration for financial Q&A
Qwen3-8B or Llama 3 (on-prem)    ← natural language query over financial data
```

**Wiring:**
1. iDURAR ERP handles invoices, expenses, inventory, customer records via REST API
2. FinGPT pipeline classifies incoming invoices (vendor category, payment priority, duplicate detection)
3. Anomaly detection: embeddings over transaction history → flag statistical outliers for CFO review
4. LangChain tool connects to iDURAR API; CFO asks: "What's our burn rate this quarter?" or "Which clients are 30 days overdue?"
5. Qwen3-8B on-premise generates natural language answers with supporting data

**Deployment:** Docker Compose stack; all on-premise for financial data privacy

---

## Pattern 6: Open-Source Bloomberg Terminal Alternative

**Use case:** Boutique asset manager or quant researcher replacing Bloomberg Terminal ($24K/year/seat)

**Stack:**
```
OpenBB-finance/OpenBB          ← core terminal (market data, macro, fundamentals)
AI4Finance-Foundation/FinGPT   ← earnings call and news summarization
AI4Finance-Foundation/FinRL    ← backtesting trading hypotheses
lballabio/QuantLib             ← derivatives and fixed income pricing
Custom OpenBB plugins          ← proprietary data sources
```

**Wiring:**
1. OpenBB v5.0 agentic workflow: researcher types natural language query
2. Agent determines which data sources to query (equity, macro, news, crypto)
3. FinGPT summarizes relevant earnings calls and analyst reports
4. FinRL backtests any trading hypothesis surfaced by the research
5. QuantLib prices any derivatives positions in the portfolio

**Cost:** $0 licensing vs $24K+/year Bloomberg; add data vendor costs only for premium feeds
