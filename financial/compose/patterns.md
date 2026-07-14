# 🧩 Patrones de composición — Financial Services AI

> Recetas concretas para construir soluciones combinando repos + agentes + MCPs.
> Última actualización: 2026-07-14 (v6)

---

## P1 — Multi-Agent Research Desk (TradingAgents + OpenBB + FinGPT)

**Caso de uso**: banco de inversión o gestora que quiere automatizar research de equities con calidad institucional.

**Stack**:
```
OpenBB MCP v4 (datos multi-provider: fundamentals, macro, news)
    ↓
TradingAgents v0.3.1 (debate bull/bear/riesgo con LangGraph checkpoints)
    ↓
FinGPT (sentiment analysis sobre noticias + earnings call transcripts)
    ↓
FinSight pipeline (VLM chart refinement + redacción de reporte)
    ↓
Output: research report institucional con audit trail completo
```

**Código base**:
```python
from tradingagents import TradingAgentsGraph
from openbb import obb
import anthropic

client = anthropic.Anthropic()

obb.user.preferences.output_type = "dataframe"

ta = TradingAgentsGraph(
    llm_provider="anthropic",
    model="claude-sonnet-5-20260101",
    data_provider="openbb",
    enable_checkpoint=True,
    use_point_in_time=True
)

result = ta.run_analysis(
    ticker="AAPL",
    start_date="2026-01-01",
    end_date="2026-07-01",
    debate_rounds=3
)
```

**Tiempo de implementación**: 2-3 semanas | **Licencias**: MIT + AGPLv3

---

## P2 — Self-Improving Trading System (Patrón ATLAS)

**Caso de uso**: firma de gestión de activos que quiere agentes que mejoran autónomamente con feedback de mercado.

**Stack**:
```
TradingAgents v0.3.1 (base de agentes especializados)
    ↓
ATLAS Darwinian loop (Sharpe ratio como loss function)
    ↓
Peor agente → prompt rewrite automático cada 5 días
    ↓
open-paper-trading-mcp (validación sin riesgo de nuevas estrategias)
    ↓
Alpaca MCP (ejecución live con límites de riesgo)
```

**Código conceptual**:
```python
import anthropic
from mcp import MCPClient

client = anthropic.Anthropic()
paper_trading_mcp = MCPClient("http://localhost:8080")

def evaluate_agent_performance(agent_id: str, days: int = 5) -> float:
    trades = paper_trading_mcp.call_tool("get_agent_trades", {"agent_id": agent_id, "days": days})
    returns = [t["pnl"] for t in trades["trades"]]
    if len(returns) < 2:
        return 0.0
    import numpy as np
    return (np.mean(returns) / np.std(returns)) * (252 ** 0.5)

def rewrite_agent_prompt(agent_id: str, current_prompt: str, performance_history: list) -> str:
    response = client.messages.create(
        model="claude-sonnet-5-20260101",
        max_tokens=2000,
        messages=[{"role": "user", "content": f"Improve underperforming trading agent.\nCurrent prompt: {current_prompt}\nPerformance: {performance_history}\nReturn ONLY new prompt."}]
    )
    return response.content[0].text

def darwinian_selection_loop(agents: dict, iterations: int = 30):
    for day in range(iterations):
        performances = {aid: evaluate_agent_performance(aid) for aid in agents}
        worst_agent = min(performances, key=performances.get)
        if day % 5 == 0 or performances[worst_agent] < -0.5:
            agents[worst_agent]["prompt"] = rewrite_agent_prompt(
                worst_agent, agents[worst_agent]["prompt"], list(performances.values())
            )
    return agents
```

**Tiempo de implementación**: 4-6 semanas | **Licencias**: MIT

---

## P3 — Core Banking Agentico (FinAegis + FINOS AIGF MCP)

**Caso de uso**: banco regional o fintech que quiere core banking con IA nativa y compliance EU AI Act desde día uno.

**Stack**:
```
FinAegis (core banking: 61 módulos DDD, event sourcing, CQRS)
    ↓
mcp.zelta.app (12 banking tools: accounts, loans, payments, compliance)
    ↓
FINOS AIGF MCP (EU AI Act + OWASP risk catalogue como MCP)
    ↓
Claude como orchestrator (con HITL para decisiones de alto riesgo)
    ↓
Audit log inmutable (requerido EU AI Act Anexo III)
```

**Código base**:
```python
import anthropic
from mcp import MCPClient

client = anthropic.Anthropic()
banking_mcp = MCPClient("https://mcp.zelta.app", headers={"Authorization": f"Bearer {FINAEGIS_TOKEN}"})
aigf_mcp = MCPClient("https://aigf.finos.org/mcp")

def process_loan_application(applicant_id: str, amount: float, purpose: str):
    customer_data = banking_mcp.call_tool("get_customer_profile", {"id": applicant_id})
    ai_risks = aigf_mcp.call_tool("assess_ai_decision_risk", {
        "decision_type": "credit_scoring",
        "regulation": "EU_AI_ACT_ANNEX_III",
        "data_sensitivity": "HIGH"
    })
    response = client.messages.create(
        model="claude-sonnet-5-20260101",
        max_tokens=2000,
        messages=[{"role": "user", "content": f"Evaluate loan for {applicant_id}. Amount: {amount} EUR. Risks: {ai_risks}. Provide structured recommendation with explainability for EU AI Act compliance."}]
    )
    return {"recommendation": response.content[0].text, "requires_human_review": amount > 50000, "audit_log": ai_risks}
```

**Tiempo de implementación**: 3-4 semanas | **Licencias**: Apache-2.0 | **Revenue**: $500k-2M

---

## P4 — Personal Finance Agent LATAM (Open Finance + Claude)

**Caso de uso**: asistente financiero personal para el mercado latinoamericano usando Open Finance de Brasil/Chile.

**Stack**:
```
Open Finance Brasil (API Banco Central BR) o Chile (CMF APIs)
    ↓ [consentimiento del usuario]
Datos reales: extractos, movimientos, saldo, deudas, inversiones
    ↓
Claude como asistente financiero personal (con Pix Automático H2 2026)
    ↓
Features: resumen de gastos, alertas de saldo, forecast de flujo, comparador de créditos
    ↓ [opcional]
Mastercard AP4M o Pix Automático (pagos recurrentes auto-gestionados)
```

**Código base**:
```python
import anthropic
from openbanking_br import OpenFinanceBR

client = anthropic.Anthropic()
of = OpenFinanceBR(consent_token=USER_CONSENT_TOKEN)

def personal_finance_assistant(user_question: str, user_id: str) -> str:
    accounts = of.get_accounts(user_id)
    transactions = of.get_transactions(user_id, days=30)
    credit_cards = of.get_credit_cards(user_id)
    response = client.messages.create(
        model="claude-sonnet-5-20260101",
        max_tokens=1000,
        system="Você é um assistente financeiro pessoal. Use os dados do Open Finance para dar conselhos práticos. Nunca compartilhe dados além do necessário.",
        messages=[{"role": "user", "content": f"Contas: {accounts}\nTransações: {transactions[:20]}\nPergunta: {user_question}"}]
    )
    return response.content[0].text
```

**Tiempo de implementación**: 2-3 semanas | **Licencias**: MIT | **Revenue**: SaaS $10-30/usuario/mes

---

## P5 — KYC/AML Automation con EU AI Act Compliance

**Caso de uso**: banco o fintech que necesita automatizar KYC/AML con trazabilidad para EU AI Act.

**Stack**:
```
kyc-analyst (17 checkpoints HITL, MIT) — primera capa de scoring
    ↓
jube (monitoreo transacciones en tiempo real, AGPL-3.0) — detección continua
    ↓
FINOS AIGF MCP (EU AI Act mapping, OWASP) — compliance layer
    ↓
Claude (orquestador con explicabilidad obligatoria)
    ↓
Audit log inmutable + Human Review Queue (requerido por EU AI Act)
```

**Código base**:
```python
import anthropic
from mcp import MCPClient

client = anthropic.Anthropic()
aigf_mcp = MCPClient("https://aigf.finos.org/mcp")

def kyc_aml_check(customer_id: str, transaction: dict) -> dict:
    risk_context = aigf_mcp.call_tool("get_regulatory_requirements", {
        "system_type": "aml_monitoring", "jurisdiction": "EU", "regulation": "EU_AI_ACT_ANNEX_III"
    })
    response = client.messages.create(
        model="claude-sonnet-5-20260101",
        max_tokens=1500,
        system=f"EU AI Act HIGH-RISK AML system. Requirements: {risk_context}. List EVERY factor, assign confidence, flag if >€10k, reference regulation, output JSON for audit.",
        messages=[{"role": "user", "content": f"Analyze AML risk: {transaction}\nCustomer: {customer_id}"}]
    )
    return {"explanation": response.content[0].text, "requires_human": transaction.get("amount", 0) > 10000, "regulatory_basis": "EU_AI_ACT_ANNEX_III + AMLD6"}
```

**Tiempo de implementación**: 3-4 semanas | **Licencias**: MIT + AGPL-3.0 | **Revenue**: $200k-600k

---

## P6 — Paper Trading Sandbox para Entrenar y Evaluar Agentes

**Caso de uso**: empresa que quiere validar agentes de trading antes de conectarlos a dinero real.

**Stack**:
```
open-paper-trading-mcp (43 tools: stocks, options, ETFs, bonds)
    ↓ [entrenamiento y evaluación sin riesgo]
TradingAgents v0.3.1 (agentes multi-experto)
    ↓ [si Sharpe ratio > threshold]
financial-datasets-mcp (datos reales para backtesting)
    ↓ [si performance validada]
Alpaca MCP (ejecución live regulada)
```

**Código base**:
```python
import anthropic
from mcp import MCPClient

client = anthropic.Anthropic()
paper_mcp = MCPClient("http://localhost:8080")

def run_trading_agent_session(strategy_prompt: str, capital: float = 100000) -> dict:
    available_tools = paper_mcp.list_tools()
    account = paper_mcp.call_tool("create_paper_account", {"initial_capital": capital, "currency": "USD"})
    response = client.messages.create(
        model="claude-sonnet-5-20260101",
        max_tokens=4000,
        tools=available_tools,
        system=f"Trading agent in paper sandbox. Strategy: {strategy_prompt}. Account: {account['account_id']}. Run 5 decisions with position sizing (max 10%) and document reasoning.",
        messages=[{"role": "user", "content": "Begin trading session."}]
    )
    final_portfolio = paper_mcp.call_tool("get_portfolio", {"account_id": account["account_id"]})
    return {"session_pnl": final_portfolio["total_pnl"], "sharpe_ratio": final_portfolio["sharpe_ratio"], "ready_for_live": final_portfolio["sharpe_ratio"] > 1.5}
```

**Tiempo de implementación**: 1-2 semanas | **Licencias**: MIT

---

## P7 — FinSight Research Automation (ACL 2026)

**Caso de uso**: sell-side o IR team que quiere generar research reports de calidad institucional automáticamente.

**Stack**:
```
FinSight pipeline (ACL 2026, MIT):
    1. DataCollectionAgent → fundamentals + filings + noticias + macro
    2. AnalysisAgent → ratios financieros + comparación de pares
    3. VLMChartAgent → charts con critique iterativo de VLM
    4. Chain-of-Analysis → insights estructurados
    5. ReportGenerationAgent → report publicable con charts + citas
```

**Código conceptual**:
```python
import anthropic
from finsight import FinSightPipeline

client = anthropic.Anthropic()
pipeline = FinSightPipeline(llm_provider="anthropic", model="claude-sonnet-5-20260101")

def generate_equity_report(ticker: str, report_type: str = "initiating_coverage") -> str:
    report = pipeline.run(
        ticker=ticker,
        report_type=report_type,
        include_charts=True,
        chart_critique_rounds=3,
        citation_format="institutional"
    )
    return report.full_text_with_charts

report = generate_equity_report("NVDA", "initiating_coverage")
# Score benchmark: 8.09 vs OpenAI Deep Research 6.11
```

**Tiempo de implementación**: 1 semana | **Licencias**: MIT | **Revenue**: $100k-300k

---

## P8 — Agentic Payments Loop (Mastercard AP4M + Alpaca MCP)

**Caso de uso**: sistema de treasury o procurement que ejecuta pagos autónomamente con límites de riesgo.

**Stack**:
```
Claude (agente de treasury/procurement)
    ↓ [decisión de pago]
Verificación de política (límites pre-configurados, anti-fraude)
    ↓ [si dentro de límites]
Mastercard AP4M (pago M2M con Agentic Tokens en blockchain)
    ↓ [liquidación en segundos]
Audit log con intent + policy + settlement
    ↓ [si supera límites]
Human-in-the-loop approval queue
```

**Código base**:
```python
import anthropic, json

client = anthropic.Anthropic()

PAYMENT_POLICY = {
    "auto_approve_limit": 5000,
    "require_human_above": 50000,
    "allowed_categories": ["SaaS", "Cloud", "Office Supplies", "Travel"],
    "daily_limit": 25000
}

def treasury_payment_agent(payment_request: dict) -> dict:
    tools = [
        {"name": "execute_payment", "description": "Execute via Mastercard AP4M", "input_schema": {"type": "object", "properties": {"amount": {"type": "number"}, "recipient": {"type": "string"}, "currency": {"type": "string"}}, "required": ["amount", "recipient", "currency"]}},
        {"name": "escalate_for_human_approval", "description": "Escalate above policy limits", "input_schema": {"type": "object", "properties": {"reason": {"type": "string"}}}}
    ]
    response = client.messages.create(
        model="claude-sonnet-5-20260101",
        max_tokens=1000,
        tools=tools,
        system=f"Treasury agent. Policy: {json.dumps(PAYMENT_POLICY)}. Execute if within limits, escalate if above, always log reasoning.",
        messages=[{"role": "user", "content": f"Process: {json.dumps(payment_request)}"}]
    )
    return {"status": "processed", "audit_log": response.content}
```

**Tiempo de implementación**: 2-3 semanas | **Revenue**: $200k-500k

---

## P9 — EU AI Act Compliance Sprint (deadline: 2 ago 2026)

**Caso de uso**: firma financiera en Europa que necesita compliance urgente en 19 días.

**Checklist de compliance (EU AI Act Anexo III — Financial Services)**:

```markdown
## Sistemas High-Risk en Finanzas

### Scoring crediticio / decisiones de préstamo
- [ ] Risk management system documentado
- [ ] Human oversight points definidos
- [ ] Data governance: qué datos, de dónde, desde cuándo
- [ ] Technical documentation: modelo, versión, training data
- [ ] Audit log: cada decisión con timestamp + inputs + output
- [ ] Declaración de conformidad firmada

### Monitoreo AML / fraude
- [ ] Explicabilidad por qué se flaggeó una transacción (obligatorio)
- [ ] False positive rate documentado
- [ ] Procedimiento de revisión humana para falsos positivos

### Penalización: €35M o 7% del facturado global
```

**Stack OSS para implementar**:
```
FINOS AIGF MCP → clasificación de riesgo (high vs limited)
    ↓
FINOS Common Controls → checklists ejecutables
    ↓
Audit log inmutable (cada decisión AI registrada)
    ↓
HITL checkpoints (supervisión humana documentada)
    ↓
Declaración de conformidad + registro ante autoridad
```

**Tiempo de implementación**: 4-8 semanas | **Licencias**: Apache-2.0 | **Revenue**: $150k-400k urgente

---

## P10 — Darwinian Multi-Agent Ensemble para Análisis Crediticio LATAM

**Caso de uso**: institución financiera que quiere mejorar continuamente su scoring de crédito.

**Concepto** (basado en ATLAS pattern):
```python
import anthropic

client = anthropic.Anthropic()

CREDIT_ANALYSTS = {
    "conservative_analyst": {
        "prompt": "Analyze credit with extreme caution. Focus on debt-to-income, credit history, payment consistency.",
        "sharpe_proxy": 0.0
    },
    "growth_analyst": {
        "prompt": "Analyze credit with focus on growth potential and alternative data (Pix frequency, Open Finance cash flow, digital footprint).",
        "sharpe_proxy": 0.0
    },
    "latam_specialist": {
        "prompt": "Analyze considering LATAM factors: income informality, seasonal patterns, family networks, Pix volume as income proxy.",
        "sharpe_proxy": 0.0
    }
}

def evaluate_credit_ensemble(application: dict) -> dict:
    decisions = {}
    for analyst_id, analyst in CREDIT_ANALYSTS.items():
        response = client.messages.create(
            model="claude-sonnet-5-20260101",
            max_tokens=500,
            system=analyst["prompt"],
            messages=[{"role": "user", "content": f"Evaluate: {application}. Return JSON: {{approve: bool, confidence: 0-1, reasoning: str}}"}]
        )
        decisions[analyst_id] = response.content[0].text
    return {
        "decisions": decisions,
        "ensemble_recommendation": "WEIGHTED_VOTE",
        "weights": {k: v["sharpe_proxy"] for k, v in CREDIT_ANALYSTS.items()}
    }
```

**Tiempo de implementación**: 4-6 semanas | **Licencias**: MIT | **ROI esperado**: -15-25% tasa de default en underbanked LATAM

---

## Resumen de patrones

| Patrón | Caso de uso | Tiempo | Licencias | Revenue potencial |
|--------|-------------|--------|-----------|------------------|
| P1 — Multi-Agent Research Desk | Investigación equities institucional | 2-3 sem | MIT + AGPLv3 | $150k-500k proyecto |
| P2 — ATLAS Self-Improving System | Trading agents auto-optimizados | 4-6 sem | MIT | $300k-1M retainer |
| P3 — Core Banking Agentico (FinAegis) | Banco digital con AI nativa | 3-4 sem | Apache-2.0 | $500k-2M proyecto |
| P4 — Personal Finance LATAM | Asistente financiero Open Finance | 2-3 sem | MIT | SaaS $10-30/usuario/mes |
| P5 — KYC/AML EU AI Act | Compliance automatizado | 3-4 sem | MIT + AGPL | $200k-600k proyecto |
| P6 — Paper Trading Sandbox | Training ground para agentes | 1-2 sem | MIT | Componente de P2 |
| P7 — FinSight Research Automation | Reports institucionales en 20 min | 1 sem | MIT | $100k-300k proyecto |
| P8 — Agentic Payments Loop | Treasury/procurement autónomo | 2-3 sem | MIT | $200k-500k proyecto |
| P9 — EU AI Act Compliance Sprint | Compliance 19 días deadline | 4-8 sem | Apache-2.0 | $150k-400k urgente |
| P10 — Credit Ensemble LATAM | Crédito para underbanked | 4-6 sem | MIT | $500k+ + equity deal |

---
*Actualizado automáticamente por el pipeline de ingest. v6.*
