# 🧩 Patrones de composición — Financial Services AI

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-14 (v6) | EU AI Act deadline: **2026-08-02 — 19 días**

## Stack base

```
[Plataforma financiera base (Fineract / OpenBB / ERPNext)]
          ↓
[Capa MCP — datos de mercado, GL, transacciones, Open Finance]
          ↓
[Agentes especializados (TradingAgents / FinRobot / kyc-analyst)]
          ↓
[Governance Layer — MAS SAFR: policy bound + audit log + human gates]
          ↓
[Orquestador LLM multi-provider (Claude / GPT-4o / FinGPT fine-tuned / DeepSeek)]
          ↓
[UI conversacional / API / Dashboard compliance / App nativa]
```

---

## Receta 1: AI Research Desk para banco de inversión
**Tiempo estimado**: 3-4 semanas | **Licencias**: Apache-2.0 + AGPLv3

```python
import anthropic

client = anthropic.Anthropic()

def financial_research_agent(ticker: str, research_question: str) -> dict:
    """
    Pipeline: OpenBB MCP + TradingAgents multi-agent debate + FinSight-style report
    """
    response = client.beta.messages.create(
        model="claude-sonnet-5",
        max_tokens=8192,
        mcp_servers=[
            {"url": "http://localhost:3001", "name": "openbb-mcp"},      # OpenBB v4
            {"url": "http://localhost:3002", "name": "tradingview-mcp"}, # TA + screeners
            {"url": "http://localhost:3003", "name": "financekit-mcp"},  # risk metrics
        ],
        messages=[{
            "role": "user",
            "content": f"""Analyze {ticker} as a multi-agent investment committee:
            
1. BullAnalyst: find 3 strongest positive catalysts using OpenBB fundamentals data
2. BearAnalyst: identify 3 key risks and bear thesis (use recent news + technicals)  
3. FundamentalsAgent: calculate P/E, EV/EBITDA, DCF at 3 scenarios (bull/base/bear)
4. RiskManager: compute VAR 95%, max drawdown, Sharpe ratio using financekit-mcp
5. FundManager: synthesize and give BUY/HOLD/SELL with conviction 1-10

Research question: {research_question}

Return structured JSON with each agent's output and final recommendation.
Include: reasoning_trace, data_sources_used, confidence_score."""
        }]
    )
    
    # Each agent response is JSON-typed (structured-output pattern)
    return response

# Usage
result = financial_research_agent("ITUB4", "Should we increase position ahead of Q2 earnings?")
```

**Por qué funciona**: replica el workflow de un comité de inversión. El banco puede mostrar al regulador qué agente dijo qué. Structured-output hace que cada paso sea parseable y testeable. LangGraph checkpoints permiten retomar sin perder contexto.

---

## Receta 2: KYC/AML Pipeline SAFR-compliant para Fintech LATAM
**Tiempo estimado**: 2-3 semanas | **Licencias**: MIT + AGPL-3.0

```python
import anthropic
import json
from datetime import datetime

client = anthropic.Anthropic()

# SAFR Policy: mandato pre-aprobado por Chief Risk Officer
POLICY = {
    "max_auto_approve_risk_score": 30,     # 0-100: autoaproba si riesgo < 30
    "require_human_review_above": 70,       # humano obligatorio si > 70
    "blocked_countries": ["KP", "IR", "SY"],
    "max_transaction_without_enhanced_dd": 10000,  # USD
}

def kyc_agent_safr_compliant(customer_data: dict) -> dict:
    """
    kyc-analyst pattern + MAS SAFR compliance:
    - Policy Bound Execution: solo opera dentro del POLICY dict
    - Real-Time Validation: verifica antes de aprobar
    - Auditability: log inmutable de cada paso
    """
    audit_log = {
        "timestamp": datetime.utcnow().isoformat(),
        "customer_id": customer_data.get("id"),
        "policy_version": "1.0",
        "steps": []
    }
    
    # Step 1: Policy validation (SAFR: Policy Bound Execution)
    if customer_data.get("country") in POLICY["blocked_countries"]:
        audit_log["steps"].append({"step": "policy_check", "result": "BLOCKED", "reason": "sanctioned_country"})
        return {"decision": "BLOCKED", "audit_log": audit_log, "human_required": False}
    
    # Step 2: AI risk assessment
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2048,
        messages=[{
            "role": "user",
            "content": f"""Perform KYC risk assessment for:
{json.dumps(customer_data, indent=2)}

Check against: OFAC SDN list patterns, PEP indicators, adverse news signals,
transaction pattern anomalies, beneficial ownership complexity.

Return JSON: {{
  "risk_score": 0-100,
  "risk_factors": ["factor1", "factor2"],
  "pep_indicators": true/false,
  "enhanced_dd_required": true/false,
  "reasoning": "brief explanation"
}}"""
        }]
    )
    
    risk_result = json.loads(response.content[0].text)
    risk_score = risk_result["risk_score"]
    
    audit_log["steps"].append({
        "step": "ai_risk_assessment", 
        "risk_score": risk_score,
        "factors": risk_result["risk_factors"],
        "model": "claude-sonnet-5"
    })
    
    # Step 3: Policy decision (SAFR: Real-Time Validation before execution)
    if risk_score <= POLICY["max_auto_approve_risk_score"]:
        decision = "APPROVED"
        human_required = False
    elif risk_score >= POLICY["require_human_review_above"]:
        decision = "PENDING_HUMAN_REVIEW"
        human_required = True
    else:
        decision = "ENHANCED_DD_REQUIRED"
        human_required = True
    
    audit_log["steps"].append({"step": "policy_decision", "decision": decision, "risk_score": risk_score})
    
    return {
        "decision": decision,
        "risk_score": risk_score,
        "human_required": human_required,
        "audit_log": audit_log,  # SAFR: Auditability — log inmutable
        "risk_factors": risk_result["risk_factors"]
    }
```

**Costo vs vendor**: kyc-analyst + jube + Claude API ≈ $500-2k/mes vs $30-50k/año de vendor.

---

## Receta 3: Portfolio Optimizer para Asset Manager LATAM
**Tiempo estimado**: 2-3 semanas | **Licencias**: MIT + BSD-3

```
yfinance / Alpha Vantage MCP → datos históricos multi-asset + bonos LATAM
    ↓
PyPortfolioOpt (robertmartin8/PyPortfolioOpt — MIT)
    • Mean-Variance con restricciones ESG
    • Black-Litterman con views de analistas
    • Hierarchical Risk Parity para portfolios alternativos
    ↓
Riskfolio-Lib (dcajasn/Riskfolio-Lib — BSD-3)
    • CVaR optimization
    • Stress testing con escenarios históricos
    ↓
Agente conversacional (Claude) que explica la recomendación en lenguaje natural
    ↓
Rebalanceo automático via Alpaca MCP (si cliente lo autoriza)
```

**Diferenciador LATAM**: incluir bonos soberanos AR/BR/MX, dólar CCL, inflación como inputs del modelo.

---

## Receta 4: CFO Assistant para empresa mediana
**Tiempo estimado**: 3-4 semanas | **Licencias**: GPL-3.0 + MIT

```
ERPNext → módulo de cuentas (GL, cash flow, AR/AP)
    ↓
Conector MCP que expone datos contables como contexto
    ↓
FinRobot (AI4Finance-Foundation/FinRobot — MIT)
    • Análisis de estados financieros
    • Comparación con peers de la industria (datos OpenBB)
    • Proyección de flujo de caja a 30/60/90 días
    ↓
Claude como orquestador + generador de reportes narrativos
    ↓
CFO dashboard: semáforo de liquidez, alertas de deuda, escenarios
```

**Caso LATAM**: CFO de empresa argentina con ingresos en pesos y deuda en dólares. El agente monitorea la brecha cambiaria y alerta cuando la cobertura de deuda cae por debajo del ratio objetivo.

---

## Receta 5: Equity Research Automation (FinSight pipeline)
**Tiempo estimado**: 4-5 semanas | **Licencias**: MIT

```python
import anthropic

client = anthropic.Anthropic()

def equity_research_pipeline(ticker: str, sector: str) -> str:
    """
    FinSight-style pipeline: ACL 2026, score 8.09 vs OpenAI Deep Research 6.11
    Un ticker → reporte institucional en ~20 min
    """
    response = client.beta.messages.create(
        model="claude-sonnet-5",
        max_tokens=16000,
        mcp_servers=[
            {"url": "http://localhost:3001", "name": "openbb-mcp"},
            {"url": "http://localhost:3002", "name": "financekit-mcp"},
            {"url": "http://localhost:3003", "name": "financial-datasets-mcp"},
        ],
        messages=[{
            "role": "user",
            "content": f"""Generate institutional equity research report for {ticker} ({sector}).

Follow the FinSight multi-stage pipeline:

STAGE 1 — DataCollection:
- Fetch financials: income statement, balance sheet, cash flow (3 years)
- Get market data: price history, volume, technical indicators
- Collect news: last 30 days earnings, management changes, sector news
- Macro context: sector performance, comparable companies

STAGE 2 — Analysis:  
- Calculate key ratios: P/E, EV/EBITDA, ROE, ROIC, debt ratios
- Peer comparison: identify 5 closest comps, score vs each metric
- Historical trend: revenue CAGR, margin expansion/contraction
- Risk factors: top 5 with probability and impact assessment

STAGE 3 — Report Generation:
- Executive Summary (3 sentences: thesis, key catalyst, key risk)
- Investment Thesis (BUY/HOLD/SELL, target price, time horizon)
- Financials analysis with table
- Peer comparison table  
- Risk factors with mitigation
- Conclusion

Format: professional sell-side research note. Include data sources for each claim."""
        }]
    )
    
    return response.content[0].text

# Usage
report = equity_research_pipeline("VALE3", "Mining/Commodities LATAM")
```

**Escala**: un equipo de 3 analistas puede cubrir **50+ empresas en earnings season** vs 10-15 sin AI.

---

## Receta 6: Core Banking Modernization con AI Layer
**Tiempo estimado**: 6-8 semanas | **Licencias**: Apache-2.0

```
Sistema core legacy (COBOL / AS400 / sistema propietario)
    ↓
Apache Fineract (apache/fineract — Apache-2.0) como middleware moderno
    • Expone APIs REST sobre el core legacy
    • Gestión de productos: préstamos, ahorro, GL
    ↓
Capa de agentes:
    • Agente de onboarding (kyc-analyst SAFR-compliant)
    • Agente de cobranza (predicción de default con FinRL patterns)
    • Agente de ventas cruzadas (recomendación de productos)
    ↓
Claude como interfaz conversacional para el cliente final
    ↓
Canal: WhatsApp Business API + web widget
```

**Por qué Fineract**: Apache-2.0, sin royalties, en producción en 400+ instituciones en 80+ países.

---

## Receta 7: Agente de Compliance Tributario (Brasil — Reforma Tributaria)
**Tiempo estimado**: 4-6 semanas | **Licencias**: MIT + GPL

```
ERPNext (contabilidad) → extrae operaciones del período
    ↓
RAG sobre normativas (PDFs de la Receita Federal, Portal Nacional)
    construido con LangChain + ChromaDB (MIT)
    ↓
Agente de clasificación tributaria (CBS/IBS/IS)
    • Identifica la alícuota aplicable por tipo de operación
    • Detecta operaciones en el régimen de transición (2026-2032)
    ↓
Claude genera el borrador de declaración con notas técnicas
    ↓
Revisor humano valida y firma digitalmente (SPED)
    ↓
Audit log inmutable (registro de cada clasificación + norma citada)
```

**Por qué ahora**: Reforma Tributária brasileña en implementación gradual 2026-2032.

---

## Receta 8: Open Finance Personal Finance Agent (Brasil / Chile)
**Tiempo estimado**: 2-3 semanas | **Licencias**: MIT + Apache-2.0

```
Open Finance MCP (open-finance-ai — MIT)
    • Brasil: conecta vía CPF + credenciales bancarias (Open Finance Fase 4)
    • Chile: conecta vía CMF APIs (implementación obligatoria desde abr 2026)
    ↓
Datos reales del usuario: extractos, movimientos, balances, productos activos
    sin datos sensibles transmitidos externamente
    ↓
Claude como orquestador del agente personal financiero
    ↓
Features:
    • Resumen de gastos por categoría
    • Alerta de saldo bajo o gasto inusual
    • Forecast de flujo de caja a 30-90 días
    • Comparador de tasas (crédito, ahorro, seguros)
    • Detección de cargos duplicados o suscripciones olvidadas
    ↓
UI: app móvil (React Native + Claude API) o WhatsApp bot
```

**Modelo de negocio**: SaaS B2B para bancos (white-label) o B2C directo en Brasil/Chile.

---

## Receta 9: Financial AI Evaluation Sprint (Pre-Go-Live)
**Tiempo estimado**: 1 semana | **Licencias**: MIT

```
Sistema de agentes financieros del cliente (cualquier arquitectura)
    ↓
Suite de benchmarks 2026:
    • FinGAIA (SUFE-AIFLM-Lab/FinGAIA — MIT) — 407 tareas, conocimiento general
    • BigFinanceBench (RogoAI — arXiv:2606.03829) — 928 tareas, workflow buy-side
    • ICBCBench (DeepFin-Intelligence — arXiv:2606.17458) — consorcio industrial, deep research
    ↓
Gap analysis:
    • FinGAIA: % vs baseline humano (>84%) y vs best LLM (48.9%)
    • BigFinanceBench: rubric score % vs 58.8% best frontier
    • ICBCBench: expert alignment + citation consistency
    ↓
Plan de mejora priorizado:
    • Fine-tuning con datos del cliente
    • RAG sobre normativas regulatorias
    • Human-in-the-loop en tareas con accuracy < 60%
    ↓
Contrato de mantenimiento: re-ejecutar suite cada trimestre
```

**Deal size**: $30-80k por evaluación + $15-30k/año mantenimiento.

---

## Receta 10: EU AI Act Compliance Sprint
**Tiempo estimado**: 2-6 semanas por cliente | **Licencias**: MIT + Apache-2.0

```
Inventario de sistemas AI del cliente (entrevistas + análisis de arquitectura)
    ↓
Clasificación EU AI Act Anexo III
    • scoring crediticio / decisiones de préstamo → alto riesgo
    • monitoreo AML / transacciones → alto riesgo
    • suscripción de seguros → alto riesgo
    • chatbots de atención al cliente → riesgo limitado
    ↓
Para cada sistema de alto riesgo:
    (a) Risk Management System (documento vivo)
    (b) Audit Log inmutable — cada decisión: input, model version, output, timestamp, reasoning
    (c) Human Oversight Mechanism — workflow de revisión en decisiones críticas
    (d) Explainability layer — SHAP/LIME para ML; CoT capture para LLMs
    ↓
Conformity Assessment prep:
    • Technical documentation (Art. 11)
    • Instructions for use (Art. 13)
    • Declaration of conformity (Art. 47)
    ↓
BigFinanceBench / FinGAIA evaluation sprint para medir calidad del sistema
    ↓
Entregable: carpeta de conformidad + informe de gaps + roadmap de remediación
```

**Deadline**: 2 agosto 2026 — **19 días**. Sanción: €35M o 7% del facturado global.
**Deal size**: €40k-€250k por cliente financiero en UE.

---

## Receta 11: FinSight — Research Factory para sell-side / IR teams
**Tiempo estimado**: 4-6 semanas | **Licencias**: MIT + AGPLv3

```
Ticker o sector de input
    ↓
FinSight (RUC-NLPIR/FinSight — MIT) — ACL 2026, supera OpenAI Deep Research (8.09 vs 6.11)
    • DataCollectionAgent → OpenBB MCP (fundamentals, filings, news, macro)
    • AnalysisAgent → ratios financieros, análisis de pares, comparación histórica
    • VLMChartAgent → genera charts → VLM critica calidad → itera hasta publicable
    • Chain-of-Analysis → destila insights en segmentos estructurados
    • ReportGenerationAgent → reporte institucional con charts + citas
    ↓
Revisión humana del analista (30-45 min vs 8h original)
    ↓
Alertas: cuando nuevo filing o earnings event → trigger automático del pipeline
```

**Escala**: 3 analistas cubren **50+ empresas en earnings season** vs 10-15 sin AI.
**Deal size**: $120k-$500k (bancos de inversión, gestoras, IR advisories).

---

## Receta 12: Agente de Trading con Pagos Autónomos (Mastercard Agent Pay)
**Tiempo estimado**: 8-12 semanas | **Licencias**: MIT

```
TradingAgents v0.3.1 (TauricResearch — MIT)
    • BullAnalyst / BearAnalyst / FundamentalsAgent / TechnicalsAgent
    • RiskManager con límites de posición y VaR
    • FundManager con decisión final
    ↓
Capa de ejecución de pagos:
    • Mastercard Agent Pay for Machines (30+ partners: Stripe, Adyen, Coinbase)
      → Agentic Token: agent + merchant scope + policy
      → Micropagos M2M en stablecoins para posiciones DeFi
    • Alpaca MCP para ejecución en equities (paper trading first)
    • CCXT (MIT, 43k★) para ejecución en exchanges crypto
    ↓
Audit log inmutable de cada transacción (EU AI Act + MAS SAFR compliant)
Human gate: trades > threshold → aprobación humana requerida
    ↓
Dashboard de posiciones, P&L, audit trail de decisiones
```

**Prerequisito**: SAFR policy bound (mandato pre-aprobado), kill-switch configurable.
**Deal size**: $300k-$1.5M.

---

## Receta 13: SAFR-Compliant Agent Governance Layer (MAS SAFR v1.0)
**Tiempo estimado**: 2-4 semanas | **Licencias**: MIT + Apache-2.0

```python
import anthropic
import json
from datetime import datetime
from typing import Callable

client = anthropic.Anthropic()

class SAFRAgent:
    """
    MAS SAFR v1.0 compliant agent wrapper.
    Co-authored with JPMorgan, Mastercard, Visa, HSBC, Ant International.
    Four pillars: Policy Bound Execution, Real-Time Validation, Auditability, Interoperability.
    """
    
    def __init__(self, policy: dict, agent_id: str):
        self.policy = policy          # Policy Bound Execution — mandatos pre-aprobados
        self.agent_id = agent_id
        self.audit_log = []           # Auditability — log inmutable
    
    def execute(self, action: str, params: dict, human_validator: Callable = None) -> dict:
        """Real-Time Validation before execution (SAFR pillar 2)."""
        
        # 1. Policy check
        if not self._within_policy(action, params):
            self._log("policy_violation", action, params, "BLOCKED")
            return {"status": "BLOCKED", "reason": "outside_policy_mandate"}
        
        # 2. AI reasoning
        response = client.messages.create(
            model="claude-sonnet-5",
            max_tokens=2048,
            messages=[{
                "role": "user",
                "content": f"Execute {action} with params: {json.dumps(params)}. "
                          f"Policy constraints: {json.dumps(self.policy)}. "
                          f"Return: reasoning, proposed_action, risk_level (low/medium/high), "
                          f"confidence (0-1), requires_human_approval (bool)"
            }]
        )
        
        result = json.loads(response.content[0].text)
        self._log("ai_reasoning", action, params, result)
        
        # 3. Human gate if needed (SAFR: human oversight activation)
        if result.get("requires_human_approval") or result.get("risk_level") == "high":
            if human_validator:
                approved = human_validator(action, params, result)
                if not approved:
                    self._log("human_rejected", action, params, "REJECTED")
                    return {"status": "REJECTED_BY_HUMAN", "reasoning": result}
        
        # 4. Execute and log (SAFR: Auditability)
        self._log("execution", action, params, "EXECUTED")
        return {"status": "EXECUTED", "result": result, "audit_log": self.audit_log[-3:]}
    
    def _within_policy(self, action: str, params: dict) -> bool:
        allowed_actions = self.policy.get("allowed_actions", [])
        max_amount = self.policy.get("max_transaction_amount", 0)
        return (action in allowed_actions and 
                params.get("amount", 0) <= max_amount)
    
    def _log(self, step: str, action: str, params: dict, result):
        self.audit_log.append({
            "timestamp": datetime.utcnow().isoformat(),
            "agent_id": self.agent_id,
            "step": step,
            "action": action,
            "params_hash": hash(str(params)),  # no almacena datos sensibles
            "result": str(result)
        })

# Usage: treasury sweep agent
TREASURY_POLICY = {
    "allowed_actions": ["sweep_to_mmf", "fx_hedge", "short_term_invest"],
    "max_transaction_amount": 100000,  # USD
    "require_human_above": 50000,
    "restricted_currencies": ["KPW", "IRR"],
}

agent = SAFRAgent(policy=TREASURY_POLICY, agent_id="treasury-001")
result = agent.execute("sweep_to_mmf", {"amount": 75000, "currency": "USD"})
```

**Por qué ahora**: MAS SAFR publicado julio 2026 con JP Morgan, Mastercard, Visa como co-autores → se convierte en estándar de facto en APAC y referencia para reguladores globales.

**Deal size**: $60k-$200k (governance layer) + integración con sistemas existentes.

---

## Receta 14: AML con Claude — FIS+Anthropic Pattern (open source replica)
**Tiempo estimado**: 3-5 semanas | **Licencias**: MIT + AGPL-3.0

```python
import anthropic
import json

client = anthropic.Anthropic()

AML_TYPOLOGIES = [
    "structuring/smurfing",      # múltiples transacciones < umbral
    "layering",                   # capas de transferencias para ocultar origen
    "trade_based_laundering",     # over/under invoicing en comercio
    "real_estate_laundering",     # compras inmobiliarias en efectivo
    "crypto_mixing",              # uso de mixers/tumblers
    "shell_company_network",      # empresas fachada interconectadas
]

def aml_investigation_agent(
    customer_id: str,
    transactions: list,
    core_banking_data: dict
) -> dict:
    """
    Replica del FIS+Anthropic Financial Crimes Agent pattern:
    - Ensambla evidencia a través de sistemas core del banco
    - Evalúa contra tipologías AML conocidas
    - Surfea casos de mayor riesgo al investigador
    - Cada conclusión vinculada a fuente de datos
    """
    
    # Prepare evidence package
    evidence = {
        "customer_profile": core_banking_data.get("customer"),
        "account_history": core_banking_data.get("account_history"),
        "transaction_summary": {
            "total_count": len(transactions),
            "total_volume": sum(t["amount"] for t in transactions),
            "avg_transaction": sum(t["amount"] for t in transactions) / max(len(transactions), 1),
            "unique_counterparties": len(set(t.get("counterparty") for t in transactions)),
            "transactions": transactions[:50]  # últimas 50
        }
    }
    
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=4096,
        messages=[{
            "role": "user",
            "content": f"""Conduct AML investigation for customer {customer_id}.

Evidence package:
{json.dumps(evidence, indent=2)}

Known typologies to evaluate: {json.dumps(AML_TYPOLOGIES, indent=2)}

For each typology:
1. Check if patterns match
2. If match: cite specific transactions (with IDs) as evidence
3. Calculate probability 0-100 that typology applies
4. Flag transactions that require Suspicious Activity Report (SAR)

Return JSON:
{{
  "risk_level": "low|medium|high|critical",
  "overall_aml_score": 0-100,
  "typology_matches": [
    {{
      "typology": "...",
      "probability": 0-100,
      "evidence_transactions": ["txn_id_1", "txn_id_2"],
      "explanation": "..."
    }}
  ],
  "sar_required": true/false,
  "sar_transactions": ["txn_ids"],
  "investigator_notes": "...",
  "data_sources_used": ["core_banking", "transaction_history"]
}}

Every conclusion MUST link to specific transaction IDs as evidence."""
        }]
    )
    
    result = json.loads(response.content[0].text)
    
    # Human investigator always has final decision
    result["human_decision_required"] = result.get("aml_score", 0) > 40 or result.get("sar_required", False)
    result["agent_id"] = "aml-001"
    result["timestamp"] = "2026-07-14T00:00:00Z"
    
    return result
```

**Inspirado en**: FIS + Anthropic Financial Crimes AI Agent (mayo 2026). BMO y Amalgamated Bank como early adopters.
**Costo**: Open source replica con Claude API → $2k-5k/mes vs precio enterprise de FIS.

---

*Ver también: `agents/top.md` para agentes individuales · `verticals/solutions.md` para plataformas base.*
