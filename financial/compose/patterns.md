# Composition Patterns — Financial Services AI

> Concrete recipes combining specific repos + agents + wiring code.
> All patterns use MIT / Apache 2.0 / BSD licensed components.
> Last updated: 2026-07-06

## Architecture baseline

```
[Financial Data Layer]          [AI Reasoning Layer]         [Execution / Output Layer]
  ccxt / OpenBB / FRED    →    TradingAgents / FinGPT    →    hummingbot / Fineract API
  (market, macro, alt data)    (LLM agents, domain LLMs)      (trades, reports, decisions)
```

---

## Recipe 1: Multi-Agent Research Analyst (TradingAgents Pattern)

**Goal**: Automated investment research report combining fundamental + technical + sentiment analysis.

**Components**:
- `TauricResearch/TradingAgents` — multi-agent orchestration framework
- `OpenBB-finance/OpenBB` — market data, fundamentals, macro
- `AI4Finance-Foundation/FinGPT` — sentiment on news/filings
- `AI4Finance-Foundation/FinRL` — technical signal generation
- Claude Sonnet 5 / claude-fable-5 as LLM backbone

**Architecture**:
```python
# 1. Start TradingAgents with Claude Sonnet 5 backend
from tradingagents.graph.trading_graph import TradingAgentsGraph
from tradingagents.default_config import DEFAULT_CONFIG

config = {**DEFAULT_CONFIG, "llm_provider": "anthropic", "deep_think_llm": "claude-sonnet-5"}
ta = TradingAgentsGraph(debug=True, config=config)

# 2. Run analysis — agents automatically coordinate:
#    - Fundamentals Analyst reads OpenBB company filings + earnings
#    - Technical Analyst computes TA indicators on price data
#    - Sentiment Analyst runs FinGPT on news headlines
#    - Bull + Bear Research Agents debate the thesis
#    - Risk Manager validates position sizing
#    - Trader synthesizes final decision

_, decision = ta.propagate("NVDA", "2026-07-06")
print(decision)
```

**When to use**: Client wants an AI-powered equity research function. Replace $25k/year Bloomberg Terminal subscriptions.

**Time to prototype**: 1 week with TradingAgents scaffold.

---

## Recipe 2: AI-Augmented Core Banking on Apache Fineract

**Goal**: Add AI loan origination, KYC automation, and anomaly detection agents to a microfinance platform.

**Components**:
- `apache/fineract` — core banking REST API
- `AI4Finance-Foundation/FinGPT` — credit language understanding
- Anthropic Claude (via API) — document analysis, decision reasoning
- `great-expectations/great_expectations` — data quality monitoring
- `openMF/community-app` — reference front-end

**Agent architecture**:
```python
# Tool definitions for Claude agent wrapping Fineract
FINERACT_TOOLS = [
    {
        "name": "create_loan_application",
        "description": "Create a loan application in Fineract for a client",
        "input_schema": {"type": "object", "properties": {
            "client_id": {"type": "integer"},
            "principal": {"type": "number"},
            "loan_term_months": {"type": "integer"},
            "purpose": {"type": "string"}
        }}
    },
    {
        "name": "get_client_transactions",
        "description": "Get last 90 days of transactions for credit scoring",
        "input_schema": {"type": "object", "properties": {
            "client_id": {"type": "integer"}
        }}
    },
    {
        "name": "flag_transaction_for_review",
        "description": "Flag a transaction for AML review with reason",
        "input_schema": {"type": "object", "properties": {
            "transaction_id": {"type": "string"},
            "reason": {"type": "string"},
            "risk_score": {"type": "number"}
        }}
    }
]

# Credit scoring agent
import anthropic
client = anthropic.Anthropic()

def run_credit_agent(application_data: dict) -> dict:
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2048,
        system="""You are a credit officer at a microfinance institution.
        Evaluate loan applications using the client's transaction history,
        purpose, and repayment capacity. Be conservative on first-time borrowers.
        Always provide a reason for your decision.""",
        tools=FINERACT_TOOLS,
        messages=[{"role": "user", "content": f"Evaluate this loan application: {application_data}"}]
    )
    return response
```

**Human gate**: Any loan above $5,000 USD requires human officer review. Agent flags with recommendation only.

**When to use**: Microfinance or digital bank client in LATAM wanting to scale loan processing.

**Time to prototype**: 2 weeks (Fineract setup + agent layer).

---

## Recipe 3: Crypto Algorithmic Trading Agent (ccxt + hummingbot)

**Goal**: LLM-directed market-making strategy that reads market microstructure and adjusts parameters dynamically.

**Components**:
- `ccxt/ccxt` — unified exchange connectivity
- `hummingbot/hummingbot` — strategy execution + backtesting
- `AI4Finance-Foundation/FinRL` — RL-trained strategy models
- TradingAgents `Risk Manager` agent — position sizing oversight

**Architecture**:
```python
import ccxt
import anthropic

exchange = ccxt.binance({
    'apiKey': 'YOUR_API_KEY',
    'secret': 'YOUR_SECRET',
})

def get_market_context(symbol: str) -> dict:
    orderbook = exchange.fetch_order_book(symbol, limit=20)
    ticker = exchange.fetch_ticker(symbol)
    ohlcv = exchange.fetch_ohlcv(symbol, '1h', limit=24)
    return {"orderbook": orderbook, "ticker": ticker, "ohlcv": ohlcv}

def llm_strategy_advisor(market_ctx: dict) -> dict:
    client = anthropic.Anthropic()
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",  # fast + cheap for real-time decisions
        max_tokens=512,
        system="You are a market-making strategy advisor. Given order book and price data, recommend: spread width, inventory limit, skew direction. Output JSON.",
        messages=[{"role": "user", "content": f"Market context: {market_ctx}"}]
    )
    return response  # parse JSON recommendation → pass to hummingbot strategy params

# hummingbot then executes the strategy with the LLM-recommended parameters
```

**Note**: Never give the LLM direct order execution authority. Always route through a risk check layer.

**When to use**: Crypto exchange or trading desk client wanting AI-adaptive market-making.

---

## Recipe 4: Agentic Compliance Monitor (AML / Transaction Monitoring)

**Goal**: Autonomous agent that monitors transactions, detects anomalies, generates SAR drafts.

**Components**:
- `apache/fineract` — transaction stream source
- Anthropic Claude (claude-sonnet-5) — reasoning and SAR drafting
- `great-expectations/great_expectations` — data quality checks on the transaction pipeline
- Custom rule engine (Python) — hard-coded regulatory thresholds as non-negotiable guardrails

**Pattern**:
```python
COMPLIANCE_SYSTEM_PROMPT = """
You are a compliance officer AI assistant. Your job is to:
1. Analyze flagged transactions for AML patterns
2. Check against known typologies (structuring, layering, placement)
3. If suspicious, draft a SAR (Suspicious Activity Report) with:
   - Subject details
   - Transaction summary
   - Suspicious activity description
   - Supporting evidence

IMPORTANT: All SARs must be reviewed and approved by a human compliance officer before filing.
Do not file reports autonomously.
"""

def monitor_transaction_batch(transactions: list[dict]) -> list[dict]:
    # Hard-coded rules first (non-negotiable)
    flagged = [t for t in transactions if
               t["amount"] > 9000 or  # structuring threshold
               t["country"] in HIGH_RISK_COUNTRIES or
               t["counterparty"] in SANCTIONS_LIST]

    # LLM analysis for pattern detection
    if flagged:
        client = anthropic.Anthropic()
        response = client.messages.create(
            model="claude-sonnet-5",
            max_tokens=4096,
            system=COMPLIANCE_SYSTEM_PROMPT,
            messages=[{"role": "user", "content": f"Analyze these flagged transactions: {flagged}"}]
        )
        # Returns draft SARs for human review
        return {"flagged": flagged, "sar_drafts": response}
```

**Regulatory note**: Under EU AI Act (Aug 2026), AML AI systems are high-risk — mandatory human review gates, audit logging, explainability. Build these in from day one.

**When to use**: Banks, MFIs, payment processors needing scalable compliance. Replaces expensive compliance analyst teams for tier-1 filtering.

---

## Recipe 5: Open Banking Personal Finance Agent

**Goal**: MCP-based personal finance agent connecting to user's bank accounts via open banking APIs.

**Components**:
- Bank open banking APIs (EU PSD2, Brazil Open Finance, Mexico CNBV)
- Claude as MCP host
- Custom MCP server wrapping bank APIs
- `AI4Finance-Foundation/FinGPT` — expense categorization model
- Odoo (optional) — SME accounting backend

**MCP Server skeleton**:
```python
# personal_finance_mcp.py — MCP server wrapping open banking APIs
from mcp.server import Server
from mcp.server.models import InitializationOptions
import mcp.types as types

server = Server("personal-finance")

@server.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    return [
        types.Tool(
            name="get_account_balance",
            description="Get current balance for user's bank accounts",
            inputSchema={"type": "object", "properties": {"account_ids": {"type": "array"}}}
        ),
        types.Tool(
            name="get_transactions",
            description="Get transactions for a date range",
            inputSchema={"type": "object", "properties": {
                "account_id": {"type": "string"},
                "from_date": {"type": "string"},
                "to_date": {"type": "string"}
            }}
        ),
        types.Tool(
            name="categorize_and_analyze",
            description="Run FinGPT categorization on transactions and return spending insights",
            inputSchema={"type": "object"}
        ),
    ]

# User talks to Claude Desktop → Claude calls MCP tools → agent reads bank data
# → generates personalized financial advice, spending analysis, savings recommendations
```

**When to use**: B2C fintech product or bank wanting a conversational finance assistant.

---

## Recipe 6: AI Portfolio Optimizer (FinRL + PyPortfolioOpt)

**Goal**: RL-trained agent that continuously rebalances a portfolio using both quantitative signals and LLM sentiment.

**Components**:
- `AI4Finance-Foundation/FinRL` — DRL agent (PPO) for portfolio allocation
- `robertmartin8/PyPortfolioOpt` — mean-variance + HRP optimization as risk constraint
- `AI4Finance-Foundation/FinGPT` — sentiment signal from news
- `OpenBB-finance/OpenBB` — data feed (price, fundamentals, macro)

**Pipeline**:
```
Daily 9:00 AM:
  1. OpenBB pulls price data + earnings calendar + macro indicators
  2. FinGPT scores news sentiment for each holding (+1 to -1)
  3. FinRL's PPO agent generates action weights based on state (price features + sentiment)
  4. PyPortfolioOpt applies HRP constraint: limit individual position to max 15%
  5. Agent generates trade list (buys/sells to rebalance)
  6. Human review: trader approves or overrides
  7. ccxt executes approved trades
```

**Backtesting**: Run the full pipeline on Zipline-Reloaded with FinGPT sentiment signals as factors. Compare Sharpe ratio vs. equal-weight and market-cap-weight benchmarks.

**When to use**: RIA (Registered Investment Advisor) or family office wanting systematic, AI-assisted portfolio management. **Do not market as autonomous trading to retail clients** without regulatory approval.

---

## Anti-patterns to avoid

| Anti-pattern | Why it fails | Fix |
|-------------|-------------|-----|
| LLM direct order execution | Hallucinations cause random trades; no audit trail | Always route through a deterministic rule layer + human gate |
| Using OpenBB under AGPL in a closed-source SaaS | Violates AGPL — must open server-side code | Keep OpenBB as a separate service with its own exposed API |
| Fine-tuning FinGPT on client PII data | GDPR/LGPD violation; model memorization of secrets | Use differential privacy; anonymize training data first |
| Single LLM for all compliance decisions | EU AI Act requires explainability + human review for high-risk | Multi-agent with human gate; log every agent decision |
| Polling exchange APIs in a tight loop | Rate limits, IP bans, account suspension | Use WebSocket streams (ccxt has unified WS) + exponential backoff |
| Deploying in EU without AI Act compliance | $35M or 7% global revenue fine | Build explainability + human review gates from day one |

---
*See `repos/foundations.md` for all referenced repos and `verticals/solutions.md` for platform starting points.*
