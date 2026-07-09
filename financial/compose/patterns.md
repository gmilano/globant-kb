# 🧩 Composition Patterns — Financial Services AI

> Concrete recipes for building financial AI solutions.
> Each pattern names specific repos + agents + wiring.
> Last updated: 2026-07-09 (v5)

---

## Pattern 1: AI Credit Scoring Agent on Apache Fineract

**Use case:** Microfinance / neobank — automated credit decisions for underserved populations (LATAM focus)
**Repos:** [apache/fineract](https://github.com/apache/fineract) + [AI4Finance-Foundation/FinRL](https://github.com/AI4Finance-Foundation/FinRL) + Claude claude-haiku-4-5
**License:** Apache-2.0 + MIT
**Deal size:** $80k–$200k
**Time:** 6–10 weeks

### Architecture
```
Loan Application (Fineract REST API)
    │
    ▼
Feature Extraction Agent (LangChain tool)
    ├── Alternative data: mobile usage, social, utility payments
    ├── Fineract historical loan data
    └── OpenBB macro data (BCB, CNBV indicators)
    │
    ▼
Credit Scoring Agent (FinRL-trained model)
    ├── DRL policy trained on Fineract loan outcomes
    ├── Outputs: approved/rejected + probability + reasons
    └── Explainability report (EU AI Act Article 13 compliant)
    │
    ▼
Human Review Queue (edge cases only — score 0.4–0.6)
    │
    ▼
Fineract Loan Decisioning API → Disbursement
```

### Key code
```python
from finrl.agents.stablebaselines3.models import DRLAgent
import fineract_client  # REST client from apache/fineract
import gymnasium as gym

class CreditEnv(gym.Env):
    def __init__(self, fineract_api):
        self.api = fineract_api
        self.action_space = spaces.Discrete(3)  # approve, reject, manual_review
    
    def step(self, action):
        loan_outcome = self.api.get_loan_outcome(self.current_loan_id)
        reward = 1.0 if action == loan_outcome else -1.0
        return self.observe(), reward, done, {}

agent = DRLAgent(env=CreditEnv(fineract_client))
agent.get_model("ppo").learn(total_timesteps=100_000)
```

---

## Pattern 2: Multi-Agent Equity Research Platform

**Use case:** Asset manager / family office — automated equity research reports at scale
**Repos:** [RUC-NLPIR/FinSight](https://github.com/RUC-NLPIR/FinSight) + [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) + [virattt/ai-hedge-fund](https://github.com/virattt/ai-hedge-fund)
**License:** MIT + AGPLv3 + MIT
**Deal size:** $100k–$400k
**Time:** 8–14 weeks

### Architecture
```
Ticker Input (CLI / UI)
    │
    ▼
OpenBB MCP Server
    ├── Price data, fundamentals, earnings
    ├── Macro indicators (interest rates, GDP)
    └── News feeds (Reuters, Bloomberg summary)
    │
    ▼
ai-hedge-fund Analyst Council (parallel agents)
    ├── Bull Agent (growth catalysts, upside scenarios)
    ├── Bear Agent (red flags, downside risks)
    ├── Fundamentals Agent (P/E, FCF, debt ratios)
    ├── Technicals Agent (RSI, MACD, support/resistance)
    └── Risk Agent (portfolio-level impact, position sizing)
    │
    ▼
FinSight Report Generator
    ├── Synthesizes analyst council debate
    ├── Generates professional charts
    └── Publication-ready report (PDF/Markdown)
    │
    ▼
Distribution via Vibe-Trading adapters (Slack, Teams, Email, WhatsApp)
```

### Key wiring
```python
from openbb import obb
from langchain_anthropic import ChatAnthropic

data = obb.equity.price.historical(symbol="AAPL", start_date="2025-01-01")
fundamentals = obb.equity.fundamental.ratios(symbol="AAPL")

llm = ChatAnthropic(model="claude-haiku-4-5-20251001")
bull_analysis = bull_agent.analyze(ticker="AAPL", data=data, fundamentals=fundamentals)
bear_analysis = bear_agent.analyze(ticker="AAPL", data=data, fundamentals=fundamentals)

report = finsight.generate_report(ticker="AAPL", analyses=[bull_analysis, bear_analysis])
```

---

## Pattern 3: AI Trading Firm (LLM Simulation) — TradingAgents v0.3.1

**Use case:** Prop desk / family office — multi-agent trading firm with structured debate
**Repos:** [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) + [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB)
**License:** MIT + AGPLv3
**Deal size:** $120k–$400k
**Time:** 10–16 weeks

### Agent Graph
```
Market Data (OpenBB MCP + FRED + Polymarket)
    │
    ▼
[Fundamentals Analyst] [Technicals Analyst] [Sentiment Analyst] [News Analyst]
         ↘                   ↘                  ↗                  ↗
              ──────── Risk Manager ────────
                            │
                            ▼
                   Portfolio Manager
                            │
                            ▼
                     Fund Manager
                     (Final decision)
                            │
                   ┌────────┴────────┐
                   ▼                 ▼
            Execute via        Log with reasoning
           ccxt/hummingbot     (EU AI Act audit trail)
```

### Key code (v0.3.1 with Claude Fable 5)
```python
from tradingagents.graph.trading_graph import TradingAgentsGraph
from tradingagents.default_config import DEFAULT_CONFIG

config = DEFAULT_CONFIG.copy()
config["llm_provider"] = "anthropic"
config["deep_think_llm"] = "claude-fable-5"    # Risk Manager + Fund Manager
config["quick_think_llm"] = "claude-haiku-4-5-20251001"  # Analyst agents
config["ANTHROPIC_EFFORT"] = "high"  # configurable per v0.3.1

ta = TradingAgentsGraph(debug=True, config=config)
_, decision = ta.propagate("AAPL", "2026-07-09")
report = ta.save_reports("./reports")  # v0.3.1 headless reporting
print(decision)  # BUY/SELL/HOLD with full reasoning chain
```

---

## Pattern 4: AML / KYC Automation Agent

**Use case:** Bank / neobank — automated anti-money laundering screening and KYC document processing
**Repos:** Custom LLM agent + [apache/fineract](https://github.com/apache/fineract) + [apache/atlas](https://github.com/apache/atlas)
**License:** Apache-2.0
**Deal size:** $150k–$500k
**Time:** 12–20 weeks

### Architecture
```
Customer Onboarding Event (Fineract webhook)
    │
    ▼
Document Processing Agent (Claude claude-opus-4-8)
    ├── OCR + extraction: ID docs, proof of address, source of funds
    ├── Entity resolution against sanctions lists (OFAC, UN, EU)
    └── PEP screening (Politically Exposed Persons)
    │
    ▼
Risk Scoring Agent
    ├── Behavioral pattern analysis (transaction velocity, counterparty graph)
    ├── Geographic risk assessment (FATF list awareness)
    └── Typology matching (structuring, layering, integration patterns)
    │
    ▼
Decision Agent
    ├── Low risk → auto-approve, log to Apache Atlas lineage
    ├── Medium risk → enhanced due diligence queue
    └── High risk → alert + freeze + compliance officer notification
    │
    ▼
Apache Atlas (audit trail + data lineage)
    └── EU AI Act Article 12: automated logs retained 10 years
```

---

## Pattern 5: SME AI CFO on ERPNext

**Use case:** SME / startup — conversational financial management, forecasting, tax optimization
**Repos:** [frappe/erpnext](https://github.com/frappe/erpnext) + [AI4Finance-Foundation/FinRobot](https://github.com/AI4Finance-Foundation/FinRobot)
**License:** GPL-3.0 + Apache-2.0
**Deal size:** $60k–$150k
**Time:** 6–10 weeks

### Features
```
ERPNext (accounting, invoicing, payroll, inventory)
    │  REST API + webhooks
    ▼
FinRobot-style Orchestrator
    ├── Cash Flow Agent: monitors AR/AP, forecasts 90-day cash position
    ├── Tax Agent: identifies deductions, schedules payments, alerts deadlines
    ├── Reconciliation Agent: auto-matches bank statement → ERPNext journal entries
    ├── FX Agent: hedging recommendations for multi-currency SMEs (LATAM)
    └── Anomaly Agent: flags unusual transactions, duplicate invoices, expense policy violations
    │
    ▼
Conversational UI (Claude API + chat widget)
    └── "What's my cash position next month?" → agent queries ERPNext → natural language answer
```

### Key code
```python
import anthropic
import frappe

client = anthropic.Anthropic()

def get_cash_position(days_ahead: int = 90) -> dict:
    ar = frappe.db.sql("""
        SELECT SUM(outstanding_amount) FROM `tabSales Invoice`
        WHERE due_date <= DATE_ADD(NOW(), INTERVAL %s DAY) AND status='Unpaid'
    """, days_ahead)[0][0]
    ap = frappe.db.sql("""
        SELECT SUM(outstanding_amount) FROM `tabPurchase Invoice`  
        WHERE due_date <= DATE_ADD(NOW(), INTERVAL %s DAY) AND status='Unpaid'
    """, days_ahead)[0][0]
    return {"receivables": float(ar or 0), "payables": float(ap or 0), "net": float((ar or 0) - (ap or 0))}

response = client.messages.create(
    model="claude-haiku-4-5-20251001",
    tools=[{"name": "get_cash_position", "description": "Get 90-day cash forecast", 
            "input_schema": {"type": "object", "properties": {"days_ahead": {"type": "integer"}}}}],
    messages=[{"role": "user", "content": "What's our cash position in 90 days?"}]
)
```

---

## Pattern 6: Real-Time Fraud Detection Agent

**Use case:** Neobank / fintech — real-time PIX/SPEI transaction fraud scoring
**Repos:** [AI4Finance-Foundation/FinRL](https://github.com/AI4Finance-Foundation/FinRL) + custom streaming agent
**License:** MIT
**Deal size:** $150k–$400k
**Time:** 10–16 weeks

### Architecture
```
Payment Event Stream (Kafka / AWS EventBridge)
    │ < 50ms window
    ▼
Feature Extraction (real-time)
    ├── Transaction velocity (last 1h, 24h, 7d)
    ├── Counterparty risk score
    ├── Geographic distance from last transaction
    └── Time-of-day and day-of-week patterns
    │
    ▼
FinRL-trained Anomaly Model (< 10ms inference)
    │
    ▼
Decision Logic
    ├── Score < 0.3 → approve instantly
    ├── Score 0.3–0.7 → 2FA challenge or step-up auth
    └── Score > 0.7 → block + LLM explanation agent
    │
    ▼
Explanation Agent (Claude Haiku, async)
    └── Generates human-readable fraud explanation for compliance report
```

---

## Pattern 7: Trading Signal Distribution (Vibe-Trading)

**Use case:** Quant fund / trading desk — distribute AI trading signals to multiple channels
**Repos:** [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) + [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents)
**License:** MIT
**Deal size:** $40k–$100k
**Time:** 3–6 weeks

### Architecture
```
TradingAgents analysis (scheduled: 30min before market open)
    │ Output: signal {ticker, direction, confidence, reasoning}
    ▼
Vibe-Trading Signal Formatter
    │ Template: "🟢 BUY AAPL | Confidence: 78% | Bull catalyst: iPhone cycle + services growth"
    ▼
16 Adapters → Route by channel:
    ├── Telegram → retail clients
    ├── Slack → internal trading desk
    ├── Teams → compliance and risk team
    ├── Email → institutional clients
    └── WhatsApp → LATAM clients (highest mobile penetration)
```

---

## Pattern 8: EU AI Act Compliance Audit Trail

**Use case:** European bank or fintech — achieve compliance with EU AI Act high-risk AI obligations (Aug 2, 2026 deadline)
**Repos:** Custom + [great-expectations/great_expectations](https://github.com/great-expectations/great_expectations) + Apache Atlas + Claude
**License:** Apache-2.0
**Deal size:** $50k–$200k
**Time:** 4–10 weeks

### Compliance Checklist (Article 12 + 13 + 14)
```
✅ Automated logging of all AI agent decisions (who, what data, what output, timestamp)
✅ Risk management system documentation for each high-risk AI system
✅ Data governance: training data lineage in Apache Atlas
✅ Bias monitoring with Great Expectations data quality checks
✅ Technical documentation: model card for each credit/fraud/insurance model
✅ Human oversight: UI for compliance officer review of edge cases
✅ Transparency: plain-language explanation of each AI decision for affected customers
```

### Key code: Audit logger
```python
import anthropic
from datetime import datetime
import json

class EUAIActAuditLogger:
    def log_ai_decision(self, system_id, input_data, output, model, confidence):
        entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "ai_system_id": system_id,
            "model": model,
            "input_hash": hash(json.dumps(input_data, sort_keys=True)),
            "output": output,
            "confidence": confidence,
            "human_override_available": True,
        }
        self.audit_store.append(entry)  # append-only WORM storage
        
        if output.get("decision") == "rejected":
            return {**entry, "customer_explanation": self._explain(input_data, output)}
    
    def _explain(self, input_data, output):
        client = anthropic.Anthropic()
        return client.messages.create(
            model="claude-haiku-4-5-20251001",
            messages=[{"role": "user", "content": 
                f"Generate plain-language explanation for credit rejection. "
                f"Decision factors: {output['factors']}. Be specific, actionable, non-discriminatory."}]
        ).content[0].text
```

---

## Pattern 9: Qlib + RD-Agent Automated Quant R&D

**Use case:** Quant fund — AI that generates, tests, and deploys trading strategies autonomously
**Repos:** [microsoft/qlib](https://github.com/microsoft/qlib) + [microsoft/RD-Agent](https://github.com/microsoft/RD-Agent)
**License:** MIT
**Deal size:** $200k–$600k
**Time:** 12–20 weeks

### Automated Research Loop
```
RD-Agent (LLM-driven research automation)
    │ Generates trading hypothesis in natural language
    ▼
Qlib Backtesting Engine
    ├── 10+ years historical data
    ├── Transaction cost modeling
    └── Multi-asset evaluation → Sharpe, Calmar, drawdown
    ▼
RD-Agent Evaluation
    ├── Hypothesis confirmed? → promote to paper trading
    ├── Hypothesis rejected? → generate variant or new hypothesis
    └── Top-N hypotheses → portfolio construction
    ▼
Qlib Production Pipeline
    └── Paper trading (2 weeks) → live trading (after human approval gate)
```

---

## Pattern 10: Open Finance Platform (Apache Fineract + Full AI Stack)

**Use case:** Launch a new neobank or digital lender in LATAM — full stack open source + AI
**Repos:** Fineract + ERPNext + FinRL + FinRobot + Vibe-Trading + Claude API
**License:** Apache-2.0 + GPL-3.0 + MIT
**Deal size:** $500k–$2M
**Time:** 6–18 months

### Full Stack
```
Mobile/Web App (React Native)
    │
    ▼
API Gateway (Kong or AWS API Gateway)
    │
    ┌────────┬──────────────┬──────────────────┐
    ▼        ▼              ▼                  ▼
Apache    ERPNext      Credit Agent        AML Agent
Fineract  (accounting) (FinRL + Claude)   (LLM + Atlas)
(core     (GL, tax,    (auto-approve       (KYC, sanctions
banking)  payroll)      microloans)         screening)
    │        │              │                  │
    └────────┴──────────────┴──────────────────┘
                            │
                            ▼
                  Audit Trail (Apache Atlas)
                  EU AI Act compliant logging
                            │
                            ▼
                  Analytics Dashboard
                  (OpenBB data + FinSight reports)
                            │
                            ▼
                  Signal Distribution
                  (Vibe-Trading 16 adapters → client notifications)
```

---

## Pattern 11: x402 Agentic Payment Infrastructure (NEW v5)

**Use case:** Fintech / B2B platform — enable AI agents to buy and sell services autonomously via stablecoin micropayments
**Repos:** x402 SDK (Coinbase, MIT) + Coinbase Agentic Wallets + [apache/fineract](https://github.com/apache/fineract)
**License:** MIT + Apache-2.0
**Deal size:** $80k–$300k
**Time:** 4–8 weeks

### Architecture
```
AI Agent (any LLM runtime)
    │ Needs: live financial data, compute, or service
    ▼
GET /premium-endpoint
    │ HTTP 402 Payment Required
    │ Response: {"amount": "0.10", "currency": "USDC", "address": "0x...", "chain": "base"}
    ▼
x402 Payment Middleware (agent auto-pays)
    ├── Coinbase Agentic Wallet (non-custodial TEE)
    ├── USDC transfer on Base (< 1 second, < $0.001 fee)
    └── Proof-of-payment header: X-Payment: <signed receipt>
    ▼
GET /premium-endpoint with proof
    │ 200 OK + content
    ▼
Agent receives: live price data, analytics report, execution signal
```

### Key code (TypeScript)
```typescript
import { createAgenticWallet } from "@coinbase/agentkit";
import { x402Middleware } from "x402-client";

// Create agent wallet with spending guardrails
const wallet = await createAgenticWallet({
  maxSpendPerTx: "1.00",  // USD in USDC
  maxSpendPerDay: "50.00",
  allowedMerchants: ["data.openbb.finance", "api.findata.com"],
  auditLog: true,  // WORM log for EU AI Act compliance
});

// Wrap any fetch call with x402 auto-payment
const fetch402 = x402Middleware(fetch, wallet);

// Agent autonomously pays for premium financial data
const data = await fetch402("https://data.openbb.finance/premium/AAPL/fundamentals");
// → auto-detects 402 → pays 0.10 USDC → retries → gets response
```

### Fineract integration: AI agent-to-agent B2B payments
```python
import anthropic

client = anthropic.Anthropic()

tools = [{
    "name": "initiate_x402_payment",
    "description": "Pay for a service via x402 stablecoin micropayment",
    "input_schema": {
        "type": "object",
        "properties": {
            "endpoint": {"type": "string"},
            "max_amount_usdc": {"type": "number"}
        },
        "required": ["endpoint", "max_amount_usdc"]
    }
}]

# Agent autonomously purchases market data for trading decision
response = client.messages.create(
    model="claude-haiku-4-5-20251001",
    tools=tools,
    messages=[{"role": "user", "content": 
        "Get live AAPL fundamentals (spend up to $0.50 USDC) and give me a buy/sell recommendation"}]
)
```

---

## Pattern 12: FinClaw Multi-Market Analysis Agent (NEW v5)

**Use case:** Hedge fund / trading desk — unified analysis across equities, A-shares, crypto, and prediction markets
**Repos:** [Fin-Chelae/FinClaw](https://github.com/Fin-Chelae/FinClaw) + [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) + [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents)
**License:** MIT
**Deal size:** $60k–$150k
**Time:** 4–8 weeks

### Market Coverage Matrix
```
FinClaw unified agent
    ├── US/Global equities    → Yahoo Finance (real-time)
    ├── Chinese A-shares      → AKShare (SSE + SZSE + HK)
    ├── Macro indicators      → FRED (Federal Reserve, 800k+ series)
    ├── Crypto + DeFi         → DexScreener + CoinGecko (24h volume, liquidity)
    └── Prediction markets    → Polymarket + Kalshi (information markets)
    │
    ▼
TradingAgents Analyst Council
    ├── Cross-market correlation analysis
    ├── Prediction market sentiment as leading indicator
    └── A-share momentum signal for global portfolio

    ▼
Signal Delivery (multi-channel)
    ├── Telegram → retail clients (LATAM: BR, MX, AR)
    ├── Slack → internal desk
    └── Email → institutional
```

### Key pattern: Prediction markets as leading indicators
```python
import anthropic

client = anthropic.Anthropic()

# FinClaw pulls cross-market data
context = {
    "polymarket_election_odds": polymarket.get_market("US-GDP-Q3-2026"),
    "kalshi_fed_rate_contract": kalshi.get_market("FED-RATE-SEP-2026"),
    "aapl_price": yahoo.get_price("AAPL"),
    "spx_futures": cme.get_future("ES"),
    "cny_usd": aakshare.get_fx("CNYUSD"),
}

response = client.messages.create(
    model="claude-fable-5",  # TradingAgents v0.3.1 preferred model
    messages=[{
        "role": "user",
        "content": f"Given these cross-market signals, analyze: prediction market implies "
                   f"{context['polymarket_election_odds']}% on GDP growth — "
                   f"what does this mean for AAPL + SPX position sizing? Data: {context}"
    }]
)
```

---
*See `agents/top.md` for full agent details and `verticals/solutions.md` for platform details.*
