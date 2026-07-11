# Composition Patterns — Financial Services AI

> Last updated: 2026-07-11 | v9
> Concrete recipes: specific repos + agents + wiring instructions.

---

## Pattern 1: Agentic Investment Research Platform

**Problem**: Analysts spend 4-6 hours per company on research synthesis. Automate the first draft.

**Stack**:
- **FinRobot** ([AI4Finance-Foundation/FinRobot](https://github.com/AI4Finance-Foundation/FinRobot)) — orchestration + Financial CoT
- **FinGPT** ([AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT)) — financial sentiment on news + SEC filings
- **ccxt** ([ccxt/ccxt](https://github.com/ccxt/ccxt)) — market data ingestion
- **Claude Sonnet 5** — synthesis and report generation

**Wiring**:
```
1. User inputs ticker symbol
2. FinRobot Financial CoT decomposes into sub-tasks:
   a. FinGPT → analyze last 4 earnings calls for sentiment
   b. FinGPT → analyze recent 10-K/10-Q from EDGAR
   c. ccxt → pull 12-month price + volume history
   d. FinRobot → fundamental analysis agent
3. Claude Sonnet 5 synthesizes into investment memo
4. Output: 2-page structured memo (thesis, risks, valuation)
```

**Estimated Build Time**: 3-4 weeks for POC, 3 months for production  
**Licensing**: Apache-2.0 + MIT — Globant can build on this commercially  
**EU AI Act**: High-risk if used for actual investment decisions; add human review gate

---

## Pattern 2: Agentic AML / Financial Crimes Detection

**Problem**: Manual AML investigation takes 2-4 hours per case; false positive rates are 95%+.

**Stack**:
- **Jube** ([jube-home/aml-fraud-transaction-monitoring](https://github.com/jube-home/aml-fraud-transaction-monitoring)) — real-time transaction scoring + case management
- **Claude Sonnet 5** — SAR narrative generation, investigation reasoning
- **Apache Fineract** ([apache/fineract](https://github.com/apache/fineract)) — transaction data source (if client uses Fineract core banking)

**Wiring**:
```
1. Jube ML model scores incoming transactions in real-time (<50ms)
2. Flagged transactions (score > threshold) enter Jube case management
3. Claude agent called with transaction graph + customer history:
   a. Patterns matching known typologies?
   b. Sanctions list cross-reference
   c. Network analysis: connected accounts flagged?
4. Claude generates SAR narrative draft for compliance officer
5. Human reviews + approves before filing (EU AI Act requirement)
6. Jube audit trail captures full decision chain
```

**Estimated Build Time**: 6-8 weeks POC, 4-6 months to regulatory approval  
**Licensing**: Jube is AGPL-3.0 (copyleft) — client must either open-source or negotiate commercial license  
**EU AI Act**: High-risk. Full audit trail (Jube provides) + human oversight (pattern provides) = compliant

---

## Pattern 3: Open Banking Robo-Advisor

**Problem**: Banks want personalized financial advice at scale without hiring 10,000 advisors.

**Stack**:
- **Plaid API** (US) or **PSD2 API** (EU) — open banking transaction data
- **PyPortfolioOpt** ([robertmartin8/PyPortfolioOpt](https://github.com/robertmartin8/PyPortfolioOpt)) — portfolio optimization engine
- **FinGPT** — financial sentiment + market context
- **Claude Sonnet 5** — conversational interface + personalized advice generation

**Wiring**:
```
1. User connects bank accounts via Plaid/PSD2 OAuth
2. Transaction categorization agent (Claude) analyzes 12 months of spending
3. Financial health score computed (savings rate, debt ratio, emergency fund)
4. PyPortfolioOpt generates personalized portfolio allocation:
   a. Risk profile from spending patterns + explicit survey
   b. Time horizon from stated goals
   c. Mean-variance or Black-Litterman optimization
5. FinGPT provides market context (sector sentiment, macro)
6. Claude generates personalized recommendation in plain language
7. Weekly rebalancing alerts via conversation
```

**Estimated Build Time**: 4-6 weeks POC, 4-6 months for regulatory approval  
**Licensing**: MIT (PyPortfolioOpt) — fully commercial  
**Regulatory**: Investment advice regulation varies by jurisdiction; add appropriate disclaimers and HNWI/retail distinctions

---

## Pattern 4: Multi-Agent Trading Desk (Research-Grade)

**Problem**: Quant teams want to test multi-agent trading strategies before committing to live trading.

**Stack**:
- **TradingAgents** ([TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents)) — full trading desk orchestration
- **zipline** ([quantopian/zipline](https://github.com/quantopian/zipline)) — event-driven backtesting engine
- **FinRL** ([AI4Finance-Foundation/FinRL](https://github.com/AI4Finance-Foundation/FinRL)) — RL-trained specialized agents
- **ccxt** ([ccxt/ccxt](https://github.com/ccxt/ccxt)) — live market data + paper trading execution

**Wiring**:
```
1. TradingAgents orchestrates:
   - Fundamentals agent: P/E, EV/EBITDA, DCF analysis
   - Technicals agent: moving averages, RSI, MACD
   - Sentiment agent: FinGPT on news + social signals
   - RL agent (FinRL): trained on historical patterns
   - Risk manager: position limits, max drawdown, VaR
   - Portfolio manager: signal synthesis → allocation
2. zipline runs backtest with look-ahead bias prevention
3. ccxt connects paper trading for live validation
4. Vibe-Trading safety model applied before any real money:
   - Bounded mandate definition
   - Kill switch wired to ccxt
```

**Estimated Build Time**: 2-3 weeks to configure TradingAgents + zipline, 3 months for live paper trading validation  
**Licensing**: MIT + Apache-2.0 — all commercially usable  
**Note**: Never skip the look-ahead bias fix in TradingAgents v0.3.1 — inflated backtest returns are a major client risk

---

## Pattern 5: AI-Enhanced Core Banking (Apache Fineract)

**Problem**: Client runs Apache Fineract for MFI/digital banking; wants AI layer for loan officers.

**Stack**:
- **Apache Fineract** ([apache/fineract](https://github.com/apache/fineract)) — core banking engine
- **FinGPT** — credit risk assessment from alternative data
- **Claude Sonnet 5** — loan officer copilot (Q&A on customer files, risk narrative generation)
- **Jube AML** — transaction monitoring overlay

**Wiring**:
```
1. Fineract REST API exposes: client data, loan history, payment schedule, transactions
2. Loan application triggers AI workflow:
   a. FinGPT analyzes available financial history + alternative data
   b. Credit score agent generates risk rating (A-F)
   c. Claude generates loan officer memo: "Customer X, risk rating B+, reasoning: ..."
3. Loan officer reviews AI memo in Fineract UI (custom widget)
4. Approval/rejection decision remains with human officer
5. Jube monitors approved loan repayments for early delinquency signals
6. Claude generates collection agent script when early default risk detected
```

**Estimated Build Time**: 6-8 weeks for Fineract integration + AI layer POC  
**Licensing**: Apache Fineract (Apache-2.0), FinGPT (MIT) — fully commercial  
**LATAM**: High-value pattern for Brazil, Mexico, Colombia MFI clients (60M+ underserved)

---

## Pattern 6: Financial Compliance Reporting Agent

**Problem**: Compliance teams spend days preparing regulatory reports (FINRA, Basel III, BCRA, CNBV).

**Stack**:
- **ERPNext** ([frappe/erpnext](https://github.com/frappe/erpnext)) — financial data source (GL, ledgers, transactions)
- **Claude Sonnet 5** — regulatory interpretation + report generation
- **Jube AML** — transaction monitoring data for suspicious activity reports
- Custom MCP server exposing ERPNext + Jube data

**Wiring**:
```
1. Build MCP server with tools:
   - get_gl_entries(period, account)
   - get_flagged_transactions(threshold, period)
   - get_capital_ratios(date)
2. Claude agent with regulatory knowledge:
   - Reads applicable regulation text (RAG over regulation corpus)
   - Pulls data via MCP tools
   - Drafts regulatory report sections
3. Human compliance officer reviews + edits
4. Final report exported as structured document
```

**Estimated Build Time**: 4-6 weeks for MCP server + initial prompting  
**Licensing**: ERPNext MIT, custom MCP server custom  
**Regulatory**: Report content reviewed by compliance officer before submission (always required)

---

## Pattern 7: Bounded-Autonomy Personal Finance Agent

**Problem**: Users want an AI that manages their finances autonomously but safely.

**Stack**:
- **Vibe-Trading** ([HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading)) — bounded autonomy safety model (reference)
- **Plaid** — open banking data aggregation
- **PyPortfolioOpt** — portfolio optimization
- **Claude Sonnet 5** — reasoning + user communication

**Safety Model (from Vibe-Trading)**:
```
User defines mandate:
  - Max position size: $X per asset
  - Risk tolerance: conservative / moderate / aggressive
  - Asset classes: stocks / ETFs / crypto (explicit list)
  - Mandate expiry: 30-day rolling (auto-expire)

Agent controls:
  - Kill switch: single API call halts all positions
  - Preemptive flatten: agent triggers on anomaly detection
  - All actions logged with rationale
  - No action without rationale in audit log
```

**Estimated Build Time**: 6-8 weeks including safety validation  
**Licensing**: MIT  
**Regulatory**: Requires RIA registration or partnership in most jurisdictions

---

## Pattern 8: Financial Document Intelligence (RAG + FinGPT)

**Problem**: Analysts need to extract insights from thousands of financial documents (10-Ks, contracts, prospectuses).

**Stack**:
- **FinGPT** ([AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT)) — fine-tuned financial NLP
- **LangGraph** or **LlamaIndex** — RAG orchestration
- **Claude Sonnet 5** — synthesis and Q&A
- **EDGAR** API — SEC filing data source

**Wiring**:
```
1. Document ingestion pipeline:
   - Pull 10-Ks, 10-Qs, 8-Ks from EDGAR for target companies
   - Chunk + embed with financial-aware chunking (preserve tables, footnotes)
   - Store in vector DB (Chroma, Pgvector)
2. FinGPT extracts structured data from financial statements
3. User queries: "What are the top 3 risk factors for $TICKER?"
4. RAG retrieves relevant chunks across all filings
5. Claude synthesizes answer with citations to specific document sections
6. Output includes: direct quotes + page references + confidence indicators
```

**Estimated Build Time**: 3-4 weeks for POC, 2-3 months for enterprise quality  
**Licensing**: MIT (FinGPT) + Apache-2.0 (LangGraph) — fully commercial  
**Value**: 80% reduction in analyst time on document review (typical client claim)
