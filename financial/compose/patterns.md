# 🧩 Composition Patterns — Financial Services AI

> Concrete recipes for building financial AI solutions.
> Each pattern names specific repos + agents + wiring.
> Last updated: 2026-07-10 (v7)

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
| **P11 AI Berkshire Value Investing Platform** | **$80k–$300k** | **6–12w** | **Medium** | **★★★★☆** |

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
    ├── Bull Agent (growth catalysts, upside scenarios)
    ├── Bear Agent (risks, downside scenarios)
    └── Risk Agent (portfolio-level exposure)
    │
    ▼
PDF / Word Report + Structured JSON Signal
```

### Key code
```python
import subprocess

def run_finsight(ticker: str) -> dict:
    result = subprocess.run(
        ["python", "finsight/main.py", "--ticker", ticker],
        capture_output=True, text=True, cwd="./FinSight"
    )
    return {"report": result.stdout, "ticker": ticker}

def run_debate(ticker: str, finsight_report: str) -> dict:
    from ai_hedge_fund.agents import BullAgent, BearAgent, RiskAgent
    bull = BullAgent(context=finsight_report).analyze(ticker)
    bear = BearAgent(context=finsight_report).analyze(ticker)
    risk = RiskAgent(bull=bull, bear=bear).synthesize()
    return {"signal": risk.recommendation, "confidence": risk.score}
```

---

## Pattern 3: Agentic Fraud Detection Agent

**Use case:** Bank or payment processor — real-time transaction fraud scoring with explainability
**Repos:** [AI4Finance-Foundation/FinRL](https://github.com/AI4Finance-Foundation/FinRL) + Claude claude-sonnet-5 + [apache/atlas](https://github.com/apache/atlas)
**License:** MIT + Apache-2.0
**Deal size:** $120k–$350k | **Time:** 8–12 weeks

### Architecture
```
Transaction Stream (Kafka / REST)
    │
    ▼
Feature Engineering Agent
    ├── Velocity checks (24h, 7d patterns)
    ├── Device fingerprinting
    └── Behavioral baseline (FinRL-derived)
    │
    ▼
Scoring Agent (Claude + FinRL hybrid)
    ├── RL model: pattern matching (fast, <10ms)
    └── Claude claude-haiku-4-5: edge cases + explanations
    │
    ▼
Decision + Audit Trail (Apache Atlas lineage)
    ├── AUTO_APPROVE (score < 0.15)
    ├── CHALLENGE (score 0.15–0.65)
    └── BLOCK + ALERT (score > 0.65)
```

### Key code
```python
import anthropic

client = anthropic.Anthropic()

def score_transaction(txn: dict, rl_score: float) -> dict:
    if rl_score < 0.15:
        return {"decision": "APPROVE", "score": rl_score}
    if rl_score > 0.65:
        return {"decision": "BLOCK", "score": rl_score, "reason": "high_risk_pattern"}

    # Edge cases: ask Claude for explainability
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=256,
        messages=[{
            "role": "user",
            "content": f"Transaction: {txn}. RL fraud score: {rl_score:.2f}. "
                       "Is this fraudulent? Respond: decision (APPROVE/CHALLENGE/BLOCK) + 1-sentence reason."
        }]
    )
    return {"decision": "CHALLENGE", "explanation": response.content[0].text, "score": rl_score}
```

---

## Pattern 4: AI CFO Agent on ERPNext

**Use case:** SME / corporate — autonomous cash flow forecasting, AP/AR automation, FX hedging recommendations
**Repos:** [frappe/erpnext](https://github.com/frappe/erpnext) + [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) + Claude claude-sonnet-5
**License:** GPL-3.0 + AGPLv3 + commercial API
**Deal size:** $60k–$180k | **Time:** 4–8 weeks

### Architecture
```
ERPNext (Frappe)
    │ REST API + Webhooks
    ▼
Data Aggregation Agent
    ├── AR/AP aging, cash position, outstanding invoices
    ├── FX exposure (multi-currency accounts)
    └── OpenBB macro: FX rates, interest rates, commodity prices
    │
    ▼
CFO Intelligence Agent (Claude claude-sonnet-5)
    ├── Weekly cash flow forecast (4-week horizon)
    ├── FX hedge recommendation (forward/option)
    ├── AP optimization (early payment discount vs. float)
    └── Anomaly alerts (unusual spend patterns)
    │
    ▼
Dashboard + Email Digest + ERPNext Task Creation
```

### Key code
```python
import anthropic
import frappe

client = anthropic.Anthropic()

def weekly_cfo_brief() -> str:
    ar_aging = frappe.db.get_list("Sales Invoice", filters={"docstatus": 1, "outstanding_amount": [">", 0]})
    cash_position = frappe.db.get_value("Account", {"account_type": "Cash"}, "balance")

    prompt = f"""
    As CFO of this company, analyze:
    - Cash position: {cash_position}
    - AR aging summary: {ar_aging[:10]}
    Provide: (1) 4-week cash flow forecast, (2) top 3 action items, (3) FX risks if any.
    """

    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    )
    return response.content[0].text
```

---

## Pattern 5: EU AI Act Compliance Sprint (FINOS OSERA Based)

**Use case:** Bank / insurer — AI system inventory, risk classification, governance documentation
**Repos:** [FINOS OSERA](https://ai.finos.org/governance-as-code/) + [apache/atlas](https://github.com/apache/atlas) + Claude claude-sonnet-5
**License:** Apache-2.0 (FINOS outputs) + Apache-2.0 (Atlas)
**Deal size:** $50k–$200k | **Time:** 4–6 weeks
**Deadline:** Dec 2, 2027 for Annex III deployers (providers: Aug 2, 2026)

### Deliverables
1. **AI System Inventory**: document all AI systems in scope (Annex III classification)
2. **Risk Assessment**: high-risk vs. minimal-risk determination per system
3. **FINOS OSERA policy wiring**: governance-as-code templates for each system
4. **Apache Atlas lineage**: 10-year audit trail setup for Article 12 compliance
5. **Human oversight playbook**: Article 14 documentation per system

### Architecture
```
Discovery Sprint (Week 1–2)
    ├── Stakeholder interviews
    ├── System enumeration (credit scoring, AML, insurance pricing, HR)
    └── Annex III checklist per system

Classification (Week 2–3)
    ├── FINOS OSERA policy definition: high-risk / minimal-risk / exempt
    ├── Claude claude-sonnet-5: generate technical documentation drafts
    └── Apache Atlas: tag and classify all data assets per system

Remediation (Week 3–5)
    ├── Logging setup (Apache Atlas + time-series DB for 10-year retention)
    ├── Human oversight workflows (human-in-the-loop triggers)
    ├── Bias monitoring setup (Great Expectations for training data)
    └── Technical documentation finalization

Governance Runtime (Week 5–6)
    ├── FINOS OSERA policy deployment
    ├── Automated compliance validation pipeline
    └── Incident reporting workflow
```

### Key code
```python
import anthropic

client = anthropic.Anthropic()

def classify_ai_system(system_description: str) -> dict:
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=512,
        system="You are an EU AI Act compliance expert. Classify AI systems per Annex III.",
        messages=[{
            "role": "user",
            "content": f"""
            System: {system_description}
            Classify: (1) Is this in Annex III? Which point? (2) High-risk / prohibited / minimal?
            (3) Key compliance obligations. (4) Aug 2 2026 (provider) or Dec 2 2027 (deployer) deadline?
            """
        }]
    )
    return {"classification": response.content[0].text, "system": system_description}
```

---

## Pattern 6: ATLAS Self-Improving Trading System

**Use case:** Hedge fund / proprietary trading — fully autonomous, self-evolving AI trading agent
**Repos:** [chrisworsey55/atlas-gic](https://github.com/chrisworsey55/atlas-gic) + Claude claude-sonnet-5 + [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB)
**License:** MIT + AGPLv3
**Deal size:** $100k–$400k | **Time:** 6–12 weeks

### Architecture (4-layer ATLAS)
```
Market Data Layer
    ├── Macro (FMP/Finnhub/FRED/Polymarket)
    ├── Sector data (earnings, industry flows)
    └── Portfolio state (current positions, P&L)
    │
    ▼
Macro Analysis (10 agents)
    │
    ▼
Sector Desks (7 specialist agents)
    │
    ▼
Superinvestor Personas (4 agents: Buffett, Soros, Lynch, Dalio styles)
    │
    ▼
Decision Layer (4 agents: signals, risk, position sizing, execution)
    │
    ▼
Autoresearch Loop (Karpathy-style)
    ├── Sharpe drops below threshold → identify underperforming agents
    ├── Generate N prompt variations → evaluate → keep if Sharpe improves
    ├── Detect knowledge gaps → spawn new specialist agents
    └── PRISM: route signals through regime-specific agent cohort
    │
    ▼
Execution + Audit Log (every prompt change + Sharpe impact logged)
```

### Key code
```python
import anthropic

client = anthropic.Anthropic()

def autoresearch_agent(agent_name: str, current_prompt: str, sharpe_before: float) -> dict:
    modification_prompt = f"""
    Agent: {agent_name}
    Current prompt: {current_prompt}
    Current Sharpe ratio: {sharpe_before:.3f}

    Generate 3 improved prompt variations that might improve Sharpe ratio.
    Each variation should test a different hypothesis about what's underperforming.
    Format: [VARIATION_1], [VARIATION_2], [VARIATION_3]
    """
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        messages=[{"role": "user", "content": modification_prompt}]
    )
    return {"variations": response.content[0].text, "agent": agent_name}
```

---

## Pattern 7: FinAegis Neobank + x402 Agentic Payments

**Use case:** Neobank / digital bank — zero-license core banking with native AI agent payment rails
**Repos:** [FinAegis/core-banking-prototype-laravel](https://github.com/FinAegis/core-banking-prototype-laravel) + Coinbase x402 SDK + Claude claude-sonnet-5
**License:** Apache-2.0 + MIT
**Deal size:** $150k–$600k | **Time:** 10–16 weeks

### Architecture
```
Customer (Web / Mobile)
    │
    ▼
FinAegis Core Banking (Laravel 12)
    ├── 61 DDD bounded contexts
    ├── Multi-asset accounts + lending + compliance
    ├── ISO 20022 / PSD2 / ACH / SEPA / FedNow
    └── Built-in MCP server
    │
    ▼
Claude Agent (via MCP)
    ├── Account management agent
    ├── Loan origination agent
    ├── KYC/AML agent
    └── Customer support agent
    │
    ▼
x402 Payment Rails (via FinAegis x402 module)
    ├── Credit data lookup (bureau APIs — pay per query)
    ├── KYC verification (identity providers — pay per check)
    ├── External data (macro, fraud feeds — pay per call)
    └── B2B agent settlements (pay suppliers autonomously)
```

### Key code
```python
import anthropic

client = anthropic.Anthropic()

def process_loan_application(applicant_id: str, loan_amount: float) -> dict:
    tools = [
        {
            "name": "get_account_info",
            "description": "Retrieve account history and balances from FinAegis via MCP",
            "input_schema": {"type": "object", "properties": {"account_id": {"type": "string"}}}
        },
        {
            "name": "initiate_credit_check",
            "description": "Initiate x402 payment to credit bureau and retrieve score",
            "input_schema": {"type": "object", "properties": {
                "applicant_id": {"type": "string"},
                "bureau": {"type": "string", "enum": ["equifax", "experian", "transunion"]}
            }}
        },
        {
            "name": "create_loan_offer",
            "description": "Create a loan offer in FinAegis core banking",
            "input_schema": {"type": "object", "properties": {
                "applicant_id": {"type": "string"}, "amount": {"type": "number"},
                "rate": {"type": "number"}, "term_months": {"type": "integer"}
            }}
        }
    ]

    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        tools=tools,
        messages=[{
            "role": "user",
            "content": f"Process loan application for applicant {applicant_id}, requested amount: ${loan_amount:,.2f}"
        }]
    )
    return {"response": response.content, "stop_reason": response.stop_reason}
```

---

## Pattern 8: WhatsApp Banking Bot on Fineract

**Use case:** LATAM microfinance / community bank — conversational banking via WhatsApp (zero app download)
**Repos:** [apache/fineract](https://github.com/apache/fineract) + Twilio WhatsApp API + Claude claude-haiku-4-5
**License:** Apache-2.0 + commercial API (Twilio)
**Deal size:** $40k–$120k | **Time:** 3–6 weeks

### Key code
```python
import anthropic
from flask import Flask, request

app = Flask(__name__)
client = anthropic.Anthropic()

@app.route("/whatsapp", methods=["POST"])
def handle_whatsapp():
    user_message = request.form.get("Body", "")
    user_phone = request.form.get("From", "")
    account_data = get_fineract_account(user_phone)

    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=256,
        system=f"""You are a banking assistant for {account_data['bank_name']}.
        Customer account: balance {account_data['balance']}, loan balance {account_data['loan_balance']}.
        Respond in the customer's language (detect from their message). Keep responses under 160 chars.
        You can: check balance, show recent transactions, answer loan questions, schedule payments.""",
        messages=[{"role": "user", "content": user_message}]
    )
    return send_whatsapp_reply(user_phone, response.content[0].text)

def get_fineract_account(phone: str) -> dict:
    # Fineract REST API lookup by phone number
    return {"balance": 1250.00, "loan_balance": 500.00, "bank_name": "MicroBanco"}
```

---

## Pattern 9: FinSight Equity Research SaaS

**Use case:** Boutique asset manager / independent research firm — ACL 2026-grade automated research
**Repos:** [RUC-NLPIR/FinSight](https://github.com/RUC-NLPIR/FinSight) + [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB)
**License:** MIT + AGPLv3
**Deal size:** $80k–$300k | **Time:** 6–10 weeks

### Architecture
```
Ticker + Research Horizon → FinSight API endpoint
    │
    ├── OpenBB MCP: price data + fundamentals + news
    ├── FinSight Data Agent: SEC filings + earnings + analyst consensus
    ├── FinSight Analysis Agent: financial ratios + peer comparison
    ├── FinSight Chart Agent: revenue/margin/valuation charts
    └── FinSight Synthesis Agent: narrative + investment thesis
    │
    ▼
PDF report + JSON signal + Email delivery
Score: 8.09/10 (vs OpenAI Deep Research 6.11)
```

---

## Pattern 10: OpenFinClaw Quant Strategy MVP

**Use case:** Hedge fund / algo trader — rapid PoC for AI quant strategy in 60 seconds
**Repos:** [mirror29/openfinclaw-cli](https://github.com/mirror29/openfinclaw-cli) + Claude Code
**License:** MIT
**Deal size:** $30k–$100k | **Time:** 2–4 weeks

### Setup
```bash
# Install OpenFinClaw as Claude Code MCP tool
npx openfinclaw
# This auto-registers as MCP server in Claude Code

# Then inside Claude Code:
# /analyze AAPL last 90 days momentum + mean reversion signals
# /backtest above strategy 2023-01-01 to 2026-01-01
# /paper-trade start with $100k virtual portfolio
# /leaderboard submit strategy to community rankings
```

---

## Pattern 11: AI Berkshire Value Investing Platform (NEW v7)

**Use case:** Family office / private bank / wealth management — institutional-grade value investing research via Claude Code
**Repos:** [xbtlin/ai-berkshire](https://github.com/xbtlin/ai-berkshire) + [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) + Claude claude-sonnet-5
**License:** MIT + AGPLv3
**Deal size:** $80k–$300k | **Time:** 6–12 weeks

### Architecture
```
Analyst's Claude Code Workspace
    │
    ├── /investment-team TICKER
    │       ├── Buffett Agent: intrinsic value + moat analysis + circle of competence check
    │       ├── Munger Agent: mental models + inversion + latticework of models
    │       ├── Duan Yongping Agent: long-term consumer franchise + ethical management screen
    │       └── Li Lu Agent: emerging market context + contrarian value opportunity
    │
    ├── /earnings-review TICKER Q[1-4] YYYY
    │       ├── QoQ delta analysis: revenue, margins, cash flow
    │       ├── Management guidance credibility score (vs. prior guidance)
    │       └── Bull/bear scenario with 1-year price target range
    │
    ├── /industry-research SECTOR
    │       ├── Porter's Five Forces (each force as a separate agent)
    │       ├── Moat screen: cost advantage, network effects, switching costs, intangibles
    │       └── Competitor mapping: relative quality + relative price positioning
    │
    └── OpenBB MCP: real-time fundamentals, SEC filings, earnings, macro data
    │
    ▼
Investment Memo (structured markdown + PDF export)
    ├── Thesis summary (2-3 sentences)
    ├── 4-master adversarial debate section
    ├── Bull/Bear/Base 12-month price targets
    ├── Position sizing recommendation (Kelly criterion)
    └── Monitoring triggers (what would invalidate the thesis)
```

### Key code
```python
import anthropic
import subprocess

client = anthropic.Anthropic()

MASTER_PROMPTS = {
    "buffett": """You are Warren Buffett analyzing {ticker}. Focus on:
    1. Economic moat (pricing power, switching costs, network effects, cost advantage, intangibles)
    2. Management quality and capital allocation track record
    3. Intrinsic value vs. current price (DCF with conservative assumptions)
    4. Circle of competence: do we understand this business well enough?
    Conclude: BUY / HOLD / PASS with one key reason.""",

    "munger": """You are Charlie Munger analyzing {ticker}. Use latticework of mental models:
    1. Inversion: what could go wrong? What would destroy this business?
    2. Second-order effects: what happens after the obvious effects play out?
    3. Incentive analysis: do management incentives align with shareholders?
    4. Lollapalooza: multiple factors pushing in same direction (good or bad)?
    Conclude: Strong conviction / Weak conviction / Avoid with reasoning.""",

    "duan": """You are Duan Yongping analyzing {ticker}. Focus on:
    1. Is this a long-term consumer franchise with brand loyalty?
    2. Does management have integrity and a long-term mindset?
    3. 'BoBo' principle: do the right thing, not just what's profitable short-term
    4. Competitive advantage in 10 years: will the moat be wider or narrower?
    Conclude: Buy and hold forever / Monitor / Avoid.""",

    "li_lu": """You are Li Lu analyzing {ticker}. Emerging market value perspective:
    1. Is this a business operating in a market others overlook or misunderstand?
    2. First-mover advantages in growing market vs. commodity competition
    3. Political/regulatory risk assessment for this geography/sector
    4. Contrarian angle: why does the market misprize this today?
    Conclude: High conviction / Moderate / Pass."""
}

def run_investment_team(ticker: str, fundamentals: dict) -> dict:
    debates = {}
    for master, prompt_template in MASTER_PROMPTS.items():
        prompt = prompt_template.format(ticker=ticker) + f"\n\nFundamentals: {fundamentals}"
        response = client.messages.create(
            model="claude-sonnet-5",
            max_tokens=512,
            messages=[{"role": "user", "content": prompt}]
        )
        debates[master] = response.content[0].text

    # Synthesis agent
    synthesis = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": f"""
            Four legendary investors have analyzed {ticker}:
            Buffett: {debates['buffett']}
            Munger: {debates['munger']}
            Duan Yongping: {debates['duan']}
            Li Lu: {debates['li_lu']}

            Synthesize: (1) consensus thesis if any, (2) key disagreements,
            (3) final recommendation: BUY/HOLD/PASS with position size (% of portfolio),
            (4) what would change your mind (monitoring triggers).
            """
        }]
    )
    return {
        "ticker": ticker,
        "master_debates": debates,
        "synthesis": synthesis.content[0].text,
        "recommendation": extract_recommendation(synthesis.content[0].text)
    }

def extract_recommendation(synthesis_text: str) -> str:
    for keyword in ["BUY", "HOLD", "PASS"]:
        if keyword in synthesis_text.upper():
            return keyword
    return "UNCLEAR"
```

### Deployment for Wealth Management Clients
```python
# Wrap as a web service for portfolio analysts
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class ResearchRequest(BaseModel):
    ticker: str
    research_type: str  # "investment_team" | "earnings_review" | "industry_research"

@app.post("/research")
async def research_endpoint(req: ResearchRequest):
    # Fetch fundamentals from OpenBB MCP
    fundamentals = fetch_openbb_fundamentals(req.ticker)
    if req.research_type == "investment_team":
        return run_investment_team(req.ticker, fundamentals)
    # ... other research types
```

### Customization for LATAM Clients
- Add LATAM-specific master: Brazilian value investor (Luiz Barsi style) for Bovespa stocks
- Wire into Bloomberg Terminal via BQL API for institutional-grade data
- Add PIX payment integration for fractional share recommendations
- LGPD compliance: no PII in LLM prompts; all data anonymized before Claude API calls

**Why it wins:**
- ¥1.46M+ live returns validates the methodology (2 years, outperforms S&P/HSI/CSI 300)
- 11.8k★ in 2 weeks = fastest-growing financial AI repo in July 2026
- Claude Code native = analysts already in the tool; zero new software to buy
- 4-master debate catches blind spots that single-model analysis misses
- MIT license = Globant can white-label, extend, and deploy for any client

---
*Auto-updated by the Globant AI Studios ingest pipeline.*
