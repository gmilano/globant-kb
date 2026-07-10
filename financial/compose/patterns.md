# 🧩 Composition Patterns — Financial Services AI

> Concrete recipes for building financial AI solutions.
> Each pattern names specific repos + agents + wiring.
> Last updated: 2026-07-10 (v6)

---

## Quick-Start Matrix

| Pattern | Deal Size | Time | Difficulty | LATAM Fit |
|---------|-----------|------|-----------|-----------|
| P1 AI Credit Scoring on Fineract | $80k–$200k | 6–10w | Medium | ★★★★★ |
| P2 Multi-Agent Equity Research | $100k–$400k | 8–14w | Medium | ★★★☆☆ |
| P3 Agentic Fraud Detection | $120k–$350k | 8–12w | Medium-Hard | ★★★★☆ |
| P4 AI CFO Agent on ERPNext | $60k–$180k | 4–8w | Medium | ★★★★★ |
| P5 EU AI Act Compliance Sprint | $50k–$200k | 4–6w | Medium | ★★☆☆☆ |
| P6 ATLAS Self-Improving Trading | $100k–$400k | 6–12w | Hard | ★★☆☆☆ |
| P7 FinAegis Neobank + x402 Payments | $150k–$600k | 10–16w | Hard | ★★★★☆ |
| P8 WhatsApp Banking Bot on Fineract | $40k–$120k | 3–6w | Low-Medium | ★★★★★ |
| P9 FinSight Equity Research SaaS | $80k–$300k | 6–10w | Medium | ★★★☆☆ |
| P10 OpenFinClaw Quant Strategy MVP | $30k–$100k | 2–4w | Low | ★★★☆☆ |

---

## Pattern 1: AI Credit Scoring Agent on Apache Fineract

**Use case:** Microfinance / neobank — automated credit decisions for underserved populations (LATAM focus)
**Repos:** [apache/fineract](https://github.com/apache/fineract) + [AI4Finance-Foundation/FinRL](https://github.com/AI4Finance-Foundation/FinRL) + Claude claude-haiku-4-5
**License:** Apache-2.0 + MIT
**Deal size:** $80k–$200k | **Time:** 6–10 weeks

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
**Deal size:** $100k–$400k | **Time:** 8–14 weeks

### Architecture
```
Ticker Input (CLI / Web UI)
    │
    ▼
OpenBB MCP Server
    ├── Price data, fundamentals, earnings
    ├── Macro indicators (interest rates, GDP)
    └── News feeds (Reuters, Bloomberg summary)
    │
    ▼
FinSight Multi-Agent Pipeline
    ├── Data Collection Agent
    ├── Financial Analysis Agent (ratios, trends)
    ├── Chart Generation Agent
    └── Report Synthesis Agent
    │
    ▼
ai-hedge-fund Debate Layer
    ├── Bull Agent (Buffett persona)
    ├── Bear Agent (Burry persona)
    └── Risk Manager (position sizing)
    │
    ▼
Publication-ready PDF / Markdown report
```

---

## Pattern 3: Agentic Fraud Detection System

**Use case:** Bank or fintech — real-time fraud scoring for PIX / SPEI / FedNow transactions
**Repos:** [AI4Finance-Foundation/FinRL](https://github.com/AI4Finance-Foundation/FinRL) + [apache/atlas](https://github.com/apache/atlas) + [great-expectations/great_expectations](https://github.com/great-expectations/great_expectations) + Claude claude-sonnet-5
**License:** MIT + Apache-2.0 + Apache-2.0
**Deal size:** $120k–$350k | **Time:** 8–12 weeks

### Architecture
```
Transaction Event (PIX / SPEI webhook)
    │
    ▼
Feature Pipeline (Great Expectations validated)
    ├── Transaction velocity features
    ├── Account graph features (multi-hop)
    ├── Device + geolocation signals
    └── Historical pattern features
    │
    ▼
FinRL Anomaly Agent
    ├── DRL policy trained on labeled fraud data
    ├── Outputs: fraud_score (0.0–1.0) + confidence
    └── Feature importance for explainability
    │
    ▼
Claude Explainability Narrator (EU AI Act compliant)
    ├── "Transaction blocked because: account created 3 days ago..."
    └── Audit log to Apache Atlas (10-year retention)
    │
    ▼
Action: block | flag | allow (with alert)
```

### Key code
```python
import anthropic

client = anthropic.Anthropic()

def explain_fraud_decision(transaction: dict, fraud_score: float, features: dict) -> str:
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=256,
        messages=[{
            "role": "user",
            "content": f"""Explain this fraud decision in plain language for audit purposes.
Transaction: {transaction}
Fraud score: {fraud_score:.3f}
Top features: {features}
Keep under 100 words. Be specific about which signals triggered the score."""
        }]
    )
    return response.content[0].text
```

---

## Pattern 4: AI CFO Agent on ERPNext

**Use case:** SME — conversational financial management on top of ERPNext
**Repos:** [frappe/erpnext](https://github.com/frappe/erpnext) + [AI4Finance-Foundation/FinRobot](https://github.com/AI4Finance-Foundation/FinRobot) + Claude
**License:** GPL-3.0 + Apache-2.0
**Deal size:** $60k–$180k | **Time:** 4–8 weeks

### Architecture
```
Natural Language Query ("Do I have enough cash for payroll next Friday?")
    │
    ▼
Claude Tool-Use Agent
    ├── ERPNext MCP adapter (GL, AP, AR, payroll)
    ├── Bank reconciliation queries
    └── Cash flow projection model
    │
    ▼
FinRobot Analysis Layer
    ├── Working capital analysis
    ├── Payable/receivable aging
    └── 30-day cash flow forecast
    │
    ▼
Response + Recommended action
("Cash available: $45k. Payroll total: $38k. ✅ Sufficient.
 Note: AR invoice #1234 ($12k, overdue 15 days) should be collected first.")
```

---

## Pattern 5: EU AI Act Compliance Sprint

**Use case:** European bank or insurer — rapid AI systems inventory + remediation before Aug 2, 2026
**Repos:** [apache/atlas](https://github.com/apache/atlas) + [great-expectations/great_expectations](https://github.com/great-expectations/great_expectations) + Claude
**License:** Apache-2.0
**Deal size:** $50k–$200k | **Time:** 4–6 weeks

### Sprint Structure
```
Week 1-2: AI Systems Discovery
    ├── Claude interviews system owners (MCP-enabled documentation scan)
    ├── Classify each system by Annex III risk tier
    └── Map data flows (Apache Atlas lineage graph)

Week 3-4: Gap Analysis + Remediation Plan
    ├── Automated logging implementation (Article 12 — 10-year retention)
    ├── Bias monitoring dashboards (Great Expectations)
    └── Human oversight mechanism design

Week 5-6: Documentation + Registry
    ├── Technical documentation per high-risk system
    ├── Risk management documentation
    └── EU AI Act compliance registry (ongoing monitoring)
```

### Deliverables
- AI System Inventory (Excel / Confluence)
- Risk Tier Classification per system
- Automated audit logging implementation
- Compliance gap remediation roadmap
- EU AI Act Article 11 technical documentation templates

---

## Pattern 6: ATLAS Self-Improving Trading System (NEW v6)

**Use case:** Trading firm or asset manager — self-evolving multi-agent strategy that improves without human prompt engineering
**Repos:** [chrisworsey55/atlas-gic](https://github.com/chrisworsey55/atlas-gic) + Claude claude-sonnet-5 + [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB)
**License:** MIT + AGPLv3
**Deal size:** $100k–$400k | **Time:** 6–12 weeks

### Architecture
```
Market Data Layer
    ├── Macro: FRED (interest rates, inflation, GDP, employment)
    ├── Equities: FMP / Finnhub / Polygon (prices, earnings, SEC filings)
    └── Sentiment: news + social via Claude

ATLAS 4-Layer Agent Stack
    ├── Layer 1: Macro Analysis (10 agents — economy, geopolitics, rates, inflation...)
    ├── Layer 2: Sector Desks (7 agents — tech, financials, energy, consumer...)
    ├── Layer 3: Superinvestor Personas (4 agents — Buffett/Soros/Lynch/Druckenmiller style)
    └── Layer 4: Decision Layer (4 agents — position sizing, timing, risk, execution)

PRISM Regime Detection
    ├── Classify current market regime (bull, crisis, tightening, liquidity...)
    └── Route to regime-specific agent cohort

Autoresearch Loop (daily)
    ├── Identify lowest-Sharpe agents
    ├── Claude generates prompt variants for underperformers
    ├── Backtest variant vs incumbent on rolling 90-day window
    └── Keep variant if Sharpe improves, else revert

Autonomous Spawning
    └── If agent detects coverage gap → create new specialist agent

Output → Execution via CCXT / hummingbot
```

### Key code
```python
import anthropic
import json
from typing import Optional

client = anthropic.Anthropic()

def autoresearch_loop(agent_name: str, current_prompt: str,
                      sharpe_30d: float, trade_log: list) -> Optional[str]:
    """Returns improved prompt if Sharpe gains >0.05, else None."""
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": f"""You are improving a trading agent's decision prompt.
Agent: {agent_name}
Current 30-day Sharpe: {sharpe_30d:.3f}
Recent trade log (last 10):
{json.dumps(trade_log[-10:], indent=2)}

Current prompt:
{current_prompt}

Generate an improved version that addresses the patterns of loss.
Focus on ONE specific improvement. Output only the new prompt text."""
        }]
    )
    new_prompt = response.content[0].text.strip()
    # Caller backtests new_prompt and compares Sharpe before replacing
    return new_prompt
```

---

## Pattern 7: FinAegis Neobank + x402 Machine Payments (NEW v6)

**Use case:** Greenfield neobank or LATAM fintech — full core banking with AI-native agent operations and stablecoin settlement between agents
**Repos:** [FinAegis/core-banking-prototype-laravel](https://github.com/FinAegis/core-banking-prototype-laravel) + Claude + Coinbase x402 SDK
**License:** Apache-2.0 + MIT
**Deal size:** $150k–$600k | **Time:** 10–16 weeks

### Architecture
```
Customer / Agent Interaction Layer
    ├── WhatsApp / Telegram (conversational banking)
    ├── REST API (mobile app)
    └── Claude Code via MCP (internal AI agents)

FinAegis MCP Server (built-in)
    ├── account.create / account.balance
    ├── loan.apply / loan.approve / loan.disburse
    ├── transfer.initiate / transfer.settle
    └── compliance.kyc / compliance.aml_check

61 DDD Bounded Contexts (event-sourced)
    ├── Customer Management
    ├── Account Management
    ├── Lending / Credit
    ├── Payments (ACH / SEPA / PIX / FedNow / RTP)
    ├── Compliance / KYC / AML
    └── x402 Machine Payment Module

x402 Payment Layer
    ├── Agent-to-agent USDC settlements
    ├── AI agent pays for external data APIs (OpenBB, news)
    └── B2B cross-border via stablecoin (no correspondent bank)

Audit Trail
    └── Every event = immutable log → EU AI Act Article 12 compliant
```

### Key code
```typescript
// Using FinAegis MCP server via Claude
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

async function processloanApplication(applicationData: object) {
  const response = await client.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 2048,
    tools: [
      {
        name: "finaegis_loan_apply",
        description: "Submit a loan application to FinAegis core banking",
        input_schema: {
          type: "object",
          properties: {
            customer_id: { type: "string" },
            amount: { type: "number" },
            term_months: { type: "integer" },
            purpose: { type: "string" },
          },
          required: ["customer_id", "amount", "term_months"],
        },
      },
      {
        name: "finaegis_credit_score",
        description: "Run credit scoring on a customer using FinRL model",
        input_schema: {
          type: "object",
          properties: { customer_id: { type: "string" } },
          required: ["customer_id"],
        },
      },
    ],
    messages: [
      {
        role: "user",
        content: `Process this loan application: ${JSON.stringify(applicationData)}. 
First check the credit score, then submit the application if score > 0.65.`,
      },
    ],
  });
  return response;
}
```

---

## Pattern 8: WhatsApp Banking Bot on Apache Fineract

**Use case:** Microfinance / LATAM bank — conversational banking via WhatsApp without a mobile app
**Repos:** [apache/fineract](https://github.com/apache/fineract) + Claude claude-haiku-4-5 + Meta WhatsApp Business API
**License:** Apache-2.0 + MIT
**Deal size:** $40k–$120k | **Time:** 3–6 weeks

### Architecture
```
Customer sends WhatsApp message
    │
    ▼
Meta WhatsApp Business API webhook → FastAPI endpoint
    │
    ▼
Claude claude-haiku-4-5 (low latency, Portuguese/Spanish)
    ├── Intent classification: balance | loan | payment | support
    ├── Entity extraction: account number, amount, date
    └── Context management: 5-turn conversation memory
    │
    ▼
Fineract REST API
    ├── GET /clients/{clientId}/accounts → balance
    ├── POST /loans → loan application
    └── POST /savingsaccounts/{accountId}/transactions → payment
    │
    ▼
WhatsApp reply (< 2s target latency)
```

### Key code
```python
import anthropic
import requests

client = anthropic.Anthropic()
FINERACT_BASE = "https://fineract.client.example/fineract-provider/api/v1"

def handle_banking_query(user_message: str, customer_id: str, lang: str = "pt") -> str:
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=512,
        system=f"""You are a banking assistant. Language: {lang}.
Extract the banking intent and parameters from the customer message.
Respond with JSON: {{"intent": "balance|loan|payment|support", "params": {{}}}}""",
        messages=[{"role": "user", "content": user_message}]
    )

    parsed = json.loads(response.content[0].text)
    if parsed["intent"] == "balance":
        accts = requests.get(
            f"{FINERACT_BASE}/clients/{customer_id}/accounts",
            headers={"Authorization": "Basic ..."}
        ).json()
        return f"Saldo disponível: R$ {accts['savingsAccounts'][0]['accountBalance']:.2f}"
    # ... handle other intents
```

---

## Pattern 9: FinSight Equity Research SaaS

**Use case:** Wealth management firm or broker — automated equity research reports as a client-facing product
**Repos:** [RUC-NLPIR/FinSight](https://github.com/RUC-NLPIR/FinSight) + [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB)
**License:** MIT + AGPLv3
**Deal size:** $80k–$300k | **Time:** 6–10 weeks

### Architecture
```
Research request (ticker or theme)
    │
    ▼
OpenBB MCP data ingestion
    ├── Price history, earnings, SEC filings
    ├── Analyst estimates, insider trades
    └── Macro context (rates, sector performance)
    │
    ▼
FinSight 4-agent pipeline
    ├── Agent 1: Data collection + validation
    ├── Agent 2: Financial ratio analysis
    ├── Agent 3: Chart generation (matplotlib → PNG)
    └── Agent 4: Report synthesis (markdown → PDF)
    │
    ▼
Quality gate: ACL 2026 rubric (8.09 target score)
    │
    ▼
Branded PDF / Notion page / Slack summary delivered to client
```

---

## Pattern 10: OpenFinClaw Rapid Quant MVP

**Use case:** Fintech startup or internal quant team — validate a trading hypothesis in hours, not weeks
**Repos:** [mirror29/openfinclaw-cli](https://github.com/mirror29/openfinclaw-cli) + Claude Code
**License:** MIT
**Deal size:** $30k–$100k | **Time:** 2–4 weeks

### Setup (60 seconds)
```bash
# In Claude Code
npx openfinclaw   # auto-registers MCP tools

# Then in natural language inside Claude Code:
# "Analyze NVDA momentum over the last 90 days using
#  technical + sentiment + macro factors, develop a
#  strategy, backtest it, and show me the equity curve"
```

### What it does automatically
1. Downloads NVDA price history (yfinance)
2. Computes technical indicators (RSI, MACD, Bollinger)
3. Scrapes sentiment (news + social)
4. Queries FRED for macro context
5. Generates a backtest-ready Python strategy
6. Runs backtest with performance metrics (Sharpe, drawdown, CAGR)
7. Posts the equity curve chart to Claude Code side panel
8. (Optional) publishes strategy to community leaderboard

**Best used for:** client demo in 24 hours, internal PoC validation, hackathon proof-of-concept.

---
*Auto-updated by the Globant AI Studios ingest pipeline.*
