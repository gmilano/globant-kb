# Patrones de composición — Financial AI

> Recetas de arquitectura listas para implementar.
> Repos específicos, timelines, código de orquestación.
> Última actualización: 2026-07-08 (v2)

## Arquitectura base

```
MCP Layer (datos financieros):
  openbb-mcp (equities/crypto/macro) + sec-edgar-mcp (filings) + alpha-vantage-mcp
         ↓
Agentes especializados:
  TradingAgents pattern | FinRobot (research) | FinGPT (sentiment/NLP) | FinRL (DRL execution)
         ↓
Orquestación (LangGraph / CrewAI):
  Stateful workflows + checkpoints + human-in-the-loop gates
         ↓
Plataformas base:
  OpenBB (research) | LEAN (trading) | Fineract (banking) | Marble (compliance)
```

---

## Receta 1: AI Trading Research Platform (4-6 semanas)

**Objetivo:** Plataforma de investigación de inversiones con multi-agent analysis y debate estructurado.
**Stack:** TradingAgents + OpenBB MCP + SEC EDGAR MCP + LangGraph + FinGPT sentiment

```python
# Patrón basado en TradingAgents (Apache-2.0, 91.6k★)
from langgraph.graph import StateGraph, END
from langchain_anthropic import ChatAnthropic

llm = ChatAnthropic(model="claude-sonnet-5")

# Equipo de analistas — ejecutan en paralelo
async def fundamentals_analyst(state: dict) -> dict:
    """Analiza P&L, balance, flujos de caja con SEC EDGAR MCP"""
    filing = await mcp_client.call("sec-edgar-mcp", "get_latest_10k", {"ticker": state["ticker"]})
    analysis = await llm.ainvoke(f"Analiza los fundamentales de {state['ticker']}: {filing}")
    return {**state, "fundamentals": analysis.content}

async def sentiment_analyst(state: dict) -> dict:
    """Analiza sentimiento de noticias y Reddit/StockTwits con FinGPT"""
    sentiment_score = await fingpt_sentiment(state["ticker"])
    return {**state, "sentiment": sentiment_score}

async def technical_analyst(state: dict) -> dict:
    """Analiza MACD, RSI, Bollinger con OpenBB MCP"""
    tech_data = await mcp_client.call("openbb-mcp", "get_technical_indicators", {
        "symbol": state["ticker"], "indicators": ["macd", "rsi", "bbands"]
    })
    return {**state, "technicals": tech_data}

# Researchers en debate (patrón bull/bear)
async def bullish_researcher(state: dict) -> dict:
    prompt = f"""Construye el caso ALCISTA más sólido para {state['ticker']}.
    Fundamentales: {state['fundamentals']}
    Sentimiento: {state['sentiment']}
    Técnicos: {state['technicals']}
    Cita evidencia específica. Sé persuasivo pero honesto sobre riesgos."""
    response = await llm.ainvoke(prompt)
    return {**state, "bull_case": response.content}

async def bearish_researcher(state: dict) -> dict:
    prompt = f"""Construye el caso BAJISTA más sólido contra {state['ticker']}.
    Bull case a refutar: {state['bull_case']}
    Identifica falacias, riesgos ocultos, y escenarios de downside."""
    response = await llm.ainvoke(prompt)
    return {**state, "bear_case": response.content}

async def portfolio_manager(state: dict) -> dict:
    """Síntesis final: BUY/HOLD/SELL con sizing"""
    prompt = f"""Como Portfolio Manager, evalúa {state['ticker']}:
    BULL: {state['bull_case']}
    BEAR: {state['bear_case']}
    
    Decide: acción (BUY/HOLD/SELL), tamaño de posición (% del portfolio), 
    stop-loss, take-profit, y timeframe de inversión."""
    response = await llm.ainvoke(prompt)
    return {**state, "recommendation": response.content, "requires_human_approval": True}

# Human gate — obligatorio para decisiones de capital
async def human_approval_gate(state: dict):
    if state.get("requires_human_approval"):
        return "human_review"
    return "execute"

# Grafo LangGraph con patrón fan-out para analistas paralelos
graph = StateGraph(dict)
graph.add_node("fundamentals", fundamentals_analyst)
graph.add_node("sentiment", sentiment_analyst)
graph.add_node("technicals", technical_analyst)
graph.add_node("bull_research", bullish_researcher)
graph.add_node("bear_research", bearish_researcher)
graph.add_node("portfolio_decision", portfolio_manager)
graph.add_node("human_review", human_review_interrupt)

graph.add_edge("fundamentals", "bull_research")
graph.add_edge("sentiment", "bull_research")
graph.add_edge("technicals", "bull_research")
graph.add_edge("bull_research", "bear_research")
graph.add_edge("bear_research", "portfolio_decision")
graph.add_conditional_edges("portfolio_decision", human_approval_gate)
```

**Entregables:** Research report en PDF/HTML, recommendation con evidencia trazable, audit log de todas las decisiones.
**Timeline:** 4-6 semanas. Deal size estimado: $150k-400k.

---

## Receta 2: Agentic Hedge Fund — 19 Investor Personas (6-10 semanas)

**Objetivo:** Sistema de análisis multi-perspectiva con inversores legendarios + ejecutor de trades.
**Stack:** ai-hedge-fund pattern (MIT, 60.9k★) + FinRL + LEAN + OpenBB MCP

```python
# Patrón ai-hedge-fund (MIT)
from crewai import Agent, Task, Crew

warren_buffett = Agent(
    role="Warren Buffett - Value Investor",
    goal="Find quality businesses at fair prices. Focus on moats, ROE, FCF",
    backstory="""You think like Warren Buffett: long-term owner mentality, 
    competitive moats, management quality. You hate complexity and love 
    businesses you can understand in 5 minutes.""",
    llm="claude-sonnet-5"
)

michael_burry = Agent(
    role="Michael Burry - Deep Value Contrarian",
    goal="Find severely undervalued assets the market is ignoring or misunderstanding",
    backstory="""You think like Michael Burry: contrarian, patient, willing to be 
    early (and look wrong) before being right. You love misunderstood complexity.""",
    llm="claude-sonnet-5"
)

nassim_taleb = Agent(
    role="Nassim Taleb - Tail Risk Analyst",
    goal="Identify hidden tail risks and fragilities that could destroy the thesis",
    backstory="""You think like Taleb: Black Swans lurk everywhere. Optionality matters.
    Fragile vs robust. The downside is always underestimated. Skin in the game.""",
    llm="claude-sonnet-5"
)

risk_manager = Agent(
    role="Risk Manager",
    goal="Ensure position sizing respects portfolio risk limits and correlation constraints",
    llm="claude-sonnet-5"
)

portfolio_manager_agent = Agent(
    role="Portfolio Manager",
    goal="Synthesize all perspectives into a final actionable recommendation with sizing",
    llm="claude-sonnet-5",
)

final_decision = Task(
    description="Based on all analyses, provide BUY/HOLD/SELL with position size and rationale",
    agent=portfolio_manager_agent,
    human_input=True  # Mandatory gate before capital deployment
)

crew = Crew(
    agents=[warren_buffett, michael_burry, nassim_taleb, risk_manager, portfolio_manager_agent],
    tasks=[],  # Un task por agente
    process="hierarchical",
    manager_llm="claude-sonnet-5"
)
```

**Extensión con FinRL para ejecución:**
```python
# FinRL (MIT, 15.7k★) para ejecución algorítmica después de aprobación humana
from finrl.agents.stablebaselines3.models import DRLAgent

env_train = StockTradingEnv(df=historical_data)
agent = DRLAgent(env=env_train)
model_ppo = agent.get_model("ppo")
trained_ppo = agent.train_model(model=model_ppo, tb_log_name="ppo", total_timesteps=50000)
```

**Timeline:** 6-10 semanas. Deal size estimado: $300k-1M.

---

## Receta 3: AML / Compliance Pipeline (4-7 semanas)

**Objetivo:** Sistema de detección de lavado de dinero con AI que cumple BACEN/CNBV/EU.
**Stack:** Marble (BSL-1.1) + LangGraph + FinGPT + OpenSign (AGPL, firma de reportes)

```python
from langgraph.graph import StateGraph

async def transaction_monitor(state: dict) -> dict:
    result = await marble_client.evaluate_transaction(
        transaction=state["transaction"],
        ruleset="latam_aml_v2"
    )
    return {**state, "risk_score": result.score, "triggered_rules": result.rules}

async def sanctions_screener(state: dict) -> dict:
    hits = await marble_client.screen_sanctions(
        entity=state["transaction"]["counterparty"],
        lists=["ofac", "un", "eu", "bcb_lista_pld"]
    )
    return {**state, "sanctions_hits": hits}

async def ai_investigation_agent(state: dict) -> dict:
    if state["risk_score"] < 70 and not state["sanctions_hits"]:
        return {**state, "disposition": "clear", "requires_human": False}
    
    narrative = await llm.ainvoke(f"""
    Analiza esta transacción sospechosa para reporte SAR/ROS:
    Transacción: {state['transaction']}
    Risk score: {state['risk_score']} (razones: {state['triggered_rules']})
    Hits de sanctions: {state['sanctions_hits']}
    
    Genera: (1) Resumen ejecutivo, (2) Indicadores de lavado detectados,
    (3) Recomendación de acción (SAR/ROS filing, enhanced due diligence, freeze),
    (4) Próximos pasos para el investigador.
    Cumple con requisitos GAFI/FATF Recomendación 16.""")
    
    return {**state, "investigation_narrative": narrative.content, "requires_human": True}

async def compliance_report_generator(state: dict) -> dict:
    report = generate_sar_report(state)
    signed_doc = await opensign_client.create_signing_request(
        document=report,
        signers=["compliance_officer@bank.com"],
        expiry_hours=24
    )
    return {**state, "report_url": signed_doc.url, "status": "pending_signature"}

graph = StateGraph(dict)
graph.add_node("monitor", transaction_monitor)
graph.add_node("screen", sanctions_screener)
graph.add_node("investigate", ai_investigation_agent)
graph.add_node("report", compliance_report_generator)
graph.add_node("human_review", human_interrupt)

graph.add_edge("monitor", "screen")
graph.add_edge("screen", "investigate")
graph.add_conditional_edges(
    "investigate",
    lambda s: "human_review" if s["requires_human"] else "clear_transaction"
)
graph.add_edge("human_review", "report")
```

**Métricas:** 85%+ reducción de falsos positivos vs reglas estáticas; audit trail completo por transacción.
**Timeline:** 4-7 semanas. Deal size estimado: $200k-600k.

---

## Receta 4: M&A Financial Due Diligence (8-14 semanas)

**Objetivo:** Pipeline completo de due diligence financiero con AI: de documentos a investment memo.
**Stack:** FinRobot (Apache-2.0) + SEC EDGAR MCP + dd-agents pattern + OpenBB MCP

```python
FINANCIAL_DD_PIPELINE = [
    # Fase 1: Recolección de datos (paralela)
    {"step": "sec_filings_pull", "tool": "sec-edgar-mcp", "docs": ["10-K", "10-Q", "8-K", "DEF14A"]},
    {"step": "news_sentiment", "tool": "openbb-mcp", "data": "news_last_12m"},
    {"step": "comparable_companies", "tool": "openbb-mcp", "screen": "SIC_code_peers"},
    {"step": "institutional_holdings", "tool": "isofinancial-mcp", "data": "13F_filings"},
    # Fase 2: Análisis financiero (FinRobot pipeline agents)
    {"step": "income_statement_analysis", "agent": "FinRobot.AnalysisAgent"},
    {"step": "balance_sheet_deep_dive", "agent": "FinRobot.ModelingAgent"},
    {"step": "cash_flow_quality", "agent": "FinRobot.AnalysisAgent"},
    # Fase 3: Valuación
    {"step": "dcf_model", "agent": "FinRobot.ModelingAgent", "model": "DCF"},
    {"step": "comparable_comps", "agent": "FinRobot.ModelingAgent", "model": "EV/EBITDA"},
    {"step": "lbo_analysis", "agent": "FinRobot.ModelingAgent", "model": "LBO"},
    {"step": "monte_carlo_simulation", "agent": "FinRobot.ModelingAgent", "runs": 10000},
    # Fase 4: Bull/Bear debate
    {"step": "bull_investment_thesis", "agent": "FinRobot.BullAgent"},
    {"step": "bear_risk_case", "agent": "FinRobot.BearAgent"},
    {"step": "judge_synthesis", "agent": "FinRobot.JudgeAgent"},
    # Fase 5: Reporte (human gate obligatorio)
    {"step": "investment_memo_draft", "agent": "FinRobot.ReportAgent"},
    {"step": "human_partner_review", "gate": "human_in_the_loop"},
    {"step": "final_investment_committee_presentation", "agent": "FinRobot.ReportAgent"},
]

async def run_financial_dd(target_company: str, target_ticker: str) -> dict:
    state = {"company": target_company, "ticker": target_ticker}
    for step in FINANCIAL_DD_PIPELINE:
        if step.get("gate") == "human_in_the_loop":
            await interrupt_for_partner_review(state)
            continue
        state = await execute_step(step, state)
    return state
```

**Output:** Investment memo con DCF + comps + LBO + bull/bear case (30-50 páginas).
**Tiempo:** M&A DD de 3-4 semanas → 2-3 días con este pipeline.
**Timeline:** 8-14 semanas para implementar. Deal size estimado: $400k-1.2M.

---

## Receta 5: Credit Scoring para Desbancarizados LATAM (5-8 semanas)

**Objetivo:** Sistema de crédito alternativo para 170M+ adultos sin historial bancario formal en LATAM.
**Stack:** FinGPT fine-tuned PT-BR/ES + Apache Fineract + OpenBB MCP (macro) + Marble (fraud)

```python
class LatamAlternativeCreditScorer:
    def __init__(self):
        self.fingpt_model = load_fingpt_latam("fingpt-latam-credit-v1")
        self.fraud_checker = MarbleClient(config="latam_fraud_rules")
    
    async def score_applicant(self, applicant_data: dict) -> CreditDecision:
        features = await self.extract_alternative_features(applicant_data)
        text_features = await self.fingpt_model.analyze(
            documents=applicant_data.get("documents", []),
            task="credit_risk_assessment",
            language=applicant_data["country_code"]
        )
        macro_risk = await openbb_mcp.get_macro_indicators(
            country=applicant_data["country"],
            indicators=["gdp_growth", "unemployment", "inflation", "default_rate"]
        )
        fraud_check = await self.fraud_checker.check_applicant(applicant_data)
        decision = await llm.ainvoke(f"""
        Evalúa solicitud de crédito:
        Datos alternativos: {features}
        Análisis documental FinGPT: {text_features}  
        Contexto macro: {macro_risk}
        Risk score fraude Marble: {fraud_check}
        
        Genera: (1) Score crediticio 0-1000 con componentes explicados,
        (2) Decisión (APROBADO/RECHAZADO/MANUAL) con límite y tasa,
        (3) Justificación en lenguaje simple para el solicitante (regulatorio),
        (4) Factores que mejorarían el score para el futuro.
        Cumple: BCB Resolução 96 (BR) / CNBV Circular 3/2015 (MX) sobre explicabilidad.""")
        return CreditDecision.from_llm_response(decision, fraud_check)
    
    async def extract_alternative_features(self, data: dict) -> dict:
        return {
            "pix_transaction_frequency": data.get("pix_history", {}).get("monthly_avg"),
            "pix_avg_transaction_size": data.get("pix_history", {}).get("avg_amount"),
            "utility_payment_consistency": data.get("utility_bills", {}).get("on_time_pct"),
            "phone_usage_stability": data.get("telecom", {}).get("months_same_number"),
            "ecommerce_order_history": data.get("marketplace", {}).get("total_orders"),
            "open_finance_debt_ratio": data.get("open_finance", {}).get("debt_to_income"),
        }
```

**Impacto:** 3-5x más préstamos sin incrementar default rate. 170M+ clientes potenciales.
**Timeline:** 5-8 semanas. Deal size estimado: $200k-600k.

---

## Receta 6: RegTech AI Compliance Monitor (3-5 semanas)

**Objetivo:** Monitoreo continuo de cambios regulatorios financieros con alertas automáticas.
**Stack:** LangGraph + OpenBB MCP + sec-edgar-mcp + BCB/CNBV regulatory feeds + FinGPT

```python
async def financial_regulatory_monitor(client_config: dict) -> None:
    new_regulations = await gather_regulatory_updates(client_config["jurisdictions"])
    for reg in new_regulations:
        impact = await llm.ainvoke(f"""
        Nueva regulación/circular detectada:
        Fuente: {reg['source']} (ej: BCB, CNBV, ESMA, FCA)
        Texto: {reg['text']}
        Cliente: {client_config['name']}
        Modelos AI en producción: {client_config['ai_models']}
        
        Analiza:
        1. ¿Esta regulación aplica a este cliente? (sí/no/parcialmente)
        2. Si aplica: ¿Qué cambios operativos o de modelo son requeridos?
        3. ¿Cuál es el plazo de cumplimiento?
        4. ¿Hay riesgo de sanción si no se actúa? (estimado en $)
        5. Acción recomendada con prioridad (P1/P2/P3).
        Sé específico. Cita artículos exactos de la regulación.""")
        if impact.priority in ["P1", "P2"]:
            await send_compliance_alert(client_config["compliance_team"], reg, impact)

async def gather_regulatory_updates(jurisdictions: list) -> list:
    updates = []
    if "US" in jurisdictions:
        updates.extend(await sec_edgar_mcp.get_new_rulemaking(days=7))
    if "BR" in jurisdictions:
        updates.extend(await bcb_scraper.get_new_circulares(days=7))
    if "EU" in jurisdictions:
        updates.extend(await eu_compliance_mcp.get_financial_updates(days=7))
    return updates
```

**Timeline:** 3-5 semanas. Deal size estimado: $100k-300k (SaaS recurrente natural).

---

---

## Receta 7: RegTech Multi-Jurisdiccional LATAM (4-6 semanas)

**Objetivo:** Agente de compliance que entiende simultáneamente BCB Brasil + CNBV México + SFC Colombia + EU AI Act.
**Stack:** LangGraph + pgvector + RAG sobre textos regulatorios + Claude Haiku (velocidad) + Sonnet 5 (análisis complejo)

```python
from langgraph.graph import StateGraph
from langchain_anthropic import ChatAnthropic
import psycopg2

# pgvector store con textos regulatorios actualizados
async def update_regulatory_corpus(jurisdictions: list[str]) -> None:
    sources = {
        "BR": "https://www.bcb.gov.br/api/circulares",
        "MX": "https://www.cnbv.gob.mx/circulares",
        "CO": "https://www.superfinanciera.gov.co/normativa",
        "EU": "eu-ai-act-mcp://latest"
    }
    for j in jurisdictions:
        docs = await fetch_regulatory_updates(sources[j])
        await embed_and_store(docs, metadata={"jurisdiction": j, "date": today()})

async def jurisdiction_classifier(state: dict) -> dict:
    """Identifica qué jurisdicciones aplican a esta operación."""
    llm = ChatAnthropic(model="claude-haiku-4-5-20251001")
    response = await llm.ainvoke(
        f"¿Qué marcos regulatorios aplican a: {state['operation_description']}?\n"
        f"Países involucrados: {state['countries']}\n"
        "Responde con lista de códigos: [BR, MX, CO, EU, US]"
    )
    return {**state, "applicable_jurisdictions": parse_jurisdictions(response.content)}

async def regulatory_rag_agent(state: dict) -> dict:
    """RAG sobre textos regulatorios para cada jurisdicción aplicable."""
    llm = ChatAnthropic(model="claude-sonnet-5")
    findings = []
    for jurisdiction in state["applicable_jurisdictions"]:
        # Recuperar fragmentos regulatorios relevantes via pgvector
        relevant_regs = await vector_store.similarity_search(
            query=state["operation_description"],
            filter={"jurisdiction": jurisdiction},
            k=5
        )
        analysis = await llm.ainvoke(
            f"Analiza el cumplimiento de esta operación bajo {jurisdiction}:\n"
            f"Operación: {state['operation_description']}\n"
            f"Regulaciones aplicables:\n{format_regs(relevant_regs)}\n\n"
            "Responde: (1) ¿Cumple? (2) Gaps encontrados (3) Acciones requeridas (4) Plazo"
        )
        findings.append({"jurisdiction": jurisdiction, "analysis": analysis.content})
    return {**state, "compliance_findings": findings}

async def conflict_detector(state: dict) -> dict:
    """Detecta conflictos entre requisitos de distintas jurisdicciones."""
    if len(state["applicable_jurisdictions"]) < 2:
        return {**state, "conflicts": []}
    
    llm = ChatAnthropic(model="claude-sonnet-5")
    response = await llm.ainvoke(
        f"Analiza si hay conflictos regulatorios entre:\n{format_findings(state['compliance_findings'])}\n"
        "¿Algún requisito de una jurisdicción contradice a otra? ¿Cómo resolver?"
    )
    return {**state, "conflicts": parse_conflicts(response.content)}

async def compliance_report_generator(state: dict) -> dict:
    """Genera reporte ejecutivo multi-jurisdiccional."""
    report = {
        "operation": state["operation_description"],
        "jurisdictions_checked": state["applicable_jurisdictions"],
        "findings_by_jurisdiction": state["compliance_findings"],
        "cross_jurisdiction_conflicts": state["conflicts"],
        "overall_status": determine_overall_status(state),
        "required_actions": extract_actions(state),
        "deadline": calculate_nearest_deadline(state)
    }
    return {**state, "report": report, "requires_compliance_officer_review": True}

graph = StateGraph(dict)
graph.add_node("classify", jurisdiction_classifier)
graph.add_node("rag_analysis", regulatory_rag_agent)
graph.add_node("conflict_check", conflict_detector)
graph.add_node("generate_report", compliance_report_generator)
graph.add_node("human_review", human_compliance_officer_gate)

graph.add_edge("classify", "rag_analysis")
graph.add_edge("rag_analysis", "conflict_check")
graph.add_edge("conflict_check", "generate_report")
graph.add_conditional_edges("generate_report",
    lambda s: "human_review" if s["requires_compliance_officer_review"] else END)
```

**Jurisdicciones soportadas:** BCB Brasil (Res. 96/2021, LGPD), CNBV México (Ley Fintech), SFC Colombia, Superfinanciera Chile, EU AI Act (agosto 2026), OCC/FDIC US.
**Timeline:** 4-6 semanas. Deal size estimado: $150k-500k (SaaS recurrente natural con actualizaciones regulatorias).

---

## Receta 8: Reconciliación Bancaria con Claude Vision (3-5 semanas)

**Objetivo:** Automatizar reconciliación de estados de cuenta bancarios en PDF con el ERP (Odoo/ERPNext).
**Stack:** Claude Vision (PDF parsing) + pandas + Odoo External API + LangGraph

```python
import anthropic
import pandas as pd
import xmlrpc.client
import base64

client = anthropic.Anthropic()

async def extract_bank_transactions_from_pdf(pdf_path: str) -> list[dict]:
    """Claude Vision lee PDFs de bancos LATAM (Itaú, BBVA, Santander, Bancolombia)."""
    with open(pdf_path, "rb") as f:
        pdf_data = base64.standard_b64encode(f.read()).decode("utf-8")
    
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=4096,
        messages=[{
            "role": "user",
            "content": [
                {
                    "type": "document",
                    "source": {"type": "base64", "media_type": "application/pdf", "data": pdf_data}
                },
                {
                    "type": "text",
                    "text": """Extrae TODAS las transacciones de este estado de cuenta bancario.
                    Para cada transacción devuelve JSON con:
                    - date (YYYY-MM-DD)
                    - description (texto original del banco)
                    - amount (positivo=crédito, negativo=débito)
                    - balance_after (saldo después de la transacción)
                    - reference (número de referencia/operación si existe)
                    Devuelve lista JSON. Sin markdown, solo JSON puro."""
                }
            ]
        }]
    )
    return parse_json_response(response.content[0].text)

async def get_odoo_accounting_entries(odoo_config: dict, date_range: tuple) -> pd.DataFrame:
    """Obtiene asientos contables de Odoo para el período del estado de cuenta."""
    url, db, username, password = (odoo_config[k] for k in ["url", "db", "username", "password"])
    common = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/common")
    uid = common.authenticate(db, username, password, {})
    models = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/object")
    
    entries = models.execute_kw(db, uid, password, "account.move.line", "search_read",
        [[["date", ">=", date_range[0]], ["date", "<=", date_range[1]],
          ["account_id.code", "like", "1%"]]],  # Cuentas de activo (bancarias)
        {"fields": ["date", "name", "debit", "credit", "ref", "move_id"], "limit": 1000}
    )
    return pd.DataFrame(entries)

async def reconcile_transactions(bank_txns: list[dict], odoo_entries: pd.DataFrame) -> dict:
    """Concilia transacciones banco vs ERP con AI para los casos difíciles."""
    bank_df = pd.DataFrame(bank_txns)
    
    # Matching automático por fecha+monto (casos simples)
    exact_matches = []
    unmatched_bank = []
    unmatched_odoo = []
    
    for _, bank_txn in bank_df.iterrows():
        mask = (
            (odoo_entries["date"] == bank_txn["date"]) &
            (abs(odoo_entries["debit"] - odoo_entries["credit"] - bank_txn["amount"]) < 0.01)
        )
        matches = odoo_entries[mask]
        if len(matches) == 1:
            exact_matches.append({"bank": bank_txn.to_dict(), "odoo": matches.iloc[0].to_dict()})
        else:
            unmatched_bank.append(bank_txn.to_dict())
    
    # AI para casos difíciles (descripción diferente, múltiples asientos, comisiones)
    if unmatched_bank:
        llm_response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=2048,
            messages=[{
                "role": "user",
                "content": f"""Concilia estas transacciones bancarias con asientos de Odoo.
                Sin conciliar del banco: {unmatched_bank[:20]}
                Asientos Odoo disponibles: {odoo_entries[["date","name","debit","credit","ref"]].to_dict("records")[:50]}
                
                Para cada transacción bancaria:
                1. ¿Existe un asiento Odoo correspondiente? (busca por monto, fecha cercana, descripción similar)
                2. Si hay match probable: indica el move_id y tu nivel de confianza (alto/medio/bajo)
                3. Si no hay match: clasifica como (falta_registro / diferencia_FX / comisión_banco / error)
                Devuelve JSON."""
            }]
        )
        ai_matches = parse_json_response(llm_response.content[0].text)
    
    return {
        "exact_matches": exact_matches,
        "ai_suggested_matches": ai_matches if unmatched_bank else [],
        "unreconciled_bank": [t for t in unmatched_bank if t not in [m["bank"] for m in ai_matches]],
        "unreconciled_odoo": unmatched_odoo,
        "reconciliation_rate": len(exact_matches) / len(bank_txns) if bank_txns else 0
    }

async def generate_reconciliation_report(result: dict) -> str:
    """Genera reporte ejecutivo de reconciliación para el contador."""
    total = len(result["exact_matches"]) + len(result["ai_suggested_matches"])
    rate = result["reconciliation_rate"]
    
    report = f"""
    REPORTE DE RECONCILIACIÓN BANCARIA
    ===================================
    Tasa de conciliación automática: {rate:.1%}
    Matches exactos: {len(result['exact_matches'])}
    Matches sugeridos por AI (requieren aprobación): {len(result['ai_suggested_matches'])}
    Sin conciliar (requieren acción): {len(result['unreconciled_bank'])}
    
    ITEMS PENDIENTES DE REVISIÓN:
    {format_unreconciled(result['unreconciled_bank'])}
    """
    return report
```

**Bancos LATAM soportados:** Itaú, BBVA, Santander, Bancolombia, Banco do Brasil, HSBC MX, Banorte — cualquier PDF de estado de cuenta.
**Impacto:** Reconciliación manual de 2-3 días/mes → 30 minutos + revisión humana de excepciones.
**Timeline:** 3-5 semanas. Deal size estimado: $80k-250k (alto ROI inmediato para CFOs).

---

## Tabla resumen de recetas

| Receta | Stack principal | Semanas | Deal size | ROI del cliente |
|--------|----------------|---------|-----------|----------------|
| Trading Research Platform | TradingAgents + OpenBB MCP + LangGraph | 4-6 | $150k-400k | Research de días → horas |
| Agentic Hedge Fund (19 personas) | ai-hedge-fund + FinRL + LEAN | 6-10 | $300k-1M | 50-person quant team → AI |
| AML / Compliance Pipeline | Marble + LangGraph + FinGPT | 4-7 | $200k-600k | 85% menos falsos positivos |
| M&A Financial Due Diligence | FinRobot + SEC EDGAR MCP + OpenBB | 8-14 | $400k-1.2M | DD de semanas → días |
| Credit Scoring Desbancarizados LATAM | FinGPT fine-tune + Fineract + Marble | 5-8 | $200k-600k | 3-5x más préstamos |
| RegTech Compliance Monitor | LangGraph + BCB/CNBV feeds + EU MCP | 3-5 | $100k-300k | Evitar multas; SaaS recurrente |
| RegTech Multi-Jurisdiccional LATAM | LangGraph + pgvector + RAG regulatorio | 4-6 | $150k-500k | Compliance automático multi-país |
| Reconciliación Bancaria Claude Vision | Claude Vision PDF + pandas + Odoo API | 3-5 | $80k-250k | 2-3 días/mes → 30 minutos |
