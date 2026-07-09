# 🧩 Patrones de composición — Financial Services

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-08

---

## Arquitectura base

```
[Plataforma vertical base (Fineract / Odoo / OpenBB)]
          ↓
[MCP Servers: financial-datasets + OpenBB + alpaca]
          ↓
[Orquestación LangGraph + Claude Haiku (ops) / Sonnet (análisis)]
          ↓
[UI conversacional / API / WhatsApp Gateway para el cliente]
```

---

## Patrón 1 — Multi-Agent Trading Desk (AI4Finance stack)

**Objetivo**: Plataforma de research + trading con múltiples agentes que debaten antes de ejecutar.

**Repos**:
- [TauricResearch/TradingAgents](https://github.com/tauricresearch/tradingagents) — MIT (framework base)
- [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) — AGPLv3 (datos)
- [hummingbot/hummingbot](https://github.com/hummingbot/hummingbot) — Apache-2.0 (ejecución)

**Arquitectura**:
```python
# TradingAgents v0.3.1 + Claude Sonnet 5
from tradingagents import TradingAgentsGraph
from openbb import obb

# Inicializar el grafo de agentes (bull, bear, fundamentals, technicals, risk, portfolio)
graph = TradingAgentsGraph(
    llm="claude-sonnet-5",   # o claude-fable-5 para mayor calidad
    debate_rounds=2,
    risk_tolerance="medium"
)

# Obtener datos vía OpenBB
stock_data = obb.equity.price.historical("AAPL", provider="polygon")
fundamentals = obb.equity.fundamental.income("AAPL", provider="fmp")

# Correr el debate multi-agente
result = graph.run(
    ticker="AAPL",
    current_date="2026-07-08",
    market_data=stock_data,
    fundamentals=fundamentals
)
print(result["final_decision"])  # BUY/SELL/HOLD con justificación multi-agente
```

**Wire-up con Hummingbot para ejecución**:
```python
# Cuando el agente decide BUY, Hummingbot ejecuta
from hummingbot.connector.exchange.binance import BinanceExchange
if result["action"] == "BUY" and result["confidence"] > 0.75:
    hb.place_order(symbol="BTCUSDT", side="buy", amount=result["size"])
```

**Tiempo estimado**: 4-6 semanas | **Deal size**: $150k-500k

---

## Patrón 2 — Financial Research Automation (Dexter + FinSight + OpenBB)

**Objetivo**: Agente autónomo que genera reportes de due diligence o equity research en minutos.

**Repos**:
- [virattt/dexter](https://github.com/virattt/dexter) — MIT (research agent base)
- [RUC-NLPIR/FinSight](https://github.com/RUC-NLPIR/FinSight) — Apache-2.0 (report generation)
- [financial-datasets/mcp-server](https://github.com/financial-datasets/mcp-server) — MIT (datos MCP)

**Flujo**:
```
Usuario: "Analiza NVDA antes de la junta del Q2"
    ↓
Dexter: descompone la tarea en subtareas
    ├── Fetch financials (financial-datasets MCP)
    ├── Fetch news (finance-news MCP)
    ├── Fetch SEC filings (OpenBB MCP)
    └── Self-validates cada hallazgo
    ↓
FinSight CAVM: genera el reporte PDF/Markdown
    ├── Code Agent ejecuta análisis cuantitativo
    ├── VLM genera y critica gráficos
    └── Multi-agent review loop
    ↓
Output: PDF publication-ready con gráficos y citations
```

**Setup rápido**:
```bash
# Dexter
git clone https://github.com/virattt/dexter
cd dexter && pip install -r requirements.txt
export ANTHROPIC_API_KEY=sk-ant-...

# FinSight
git clone https://github.com/RUC-NLPIR/FinSight
cd FinSight && pip install -r requirements.txt

# MCP server de datos financieros
pip install financial-datasets-mcp
```

**Tiempo estimado**: 3-5 semanas | **Deal size**: $100k-400k

---

## Patrón 3 — Open Finance Platform LATAM (OpenBB MCP + Apache Fineract)

**Objetivo**: Plataforma de aggregación de datos financieros Open Banking + agente de asesoría para consumidores LATAM.

**Repos**:
- [apache/fineract](https://github.com/apache/fineract) — Apache-2.0 (core banking + cuentas)
- [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) — AGPLv3 (datos de mercado)
- LangGraph + Claude Haiku (ops baratas) / Sonnet (análisis profundo)

**Arquitectura**:
```python
import anthropic
from langgraph.graph import StateGraph
from openbb import obb

client = anthropic.Anthropic()

# MCP servers disponibles para el agente
mcp_tools = [
    {"name": "openbb_financial_data", "server": "openbb_mcp_server"},
    {"name": "fineract_accounts", "server": "fineract_mcp_proxy"},
    {"name": "market_news", "server": "finance-news-mcp"}
]

def financial_advisor_agent(user_query: str, user_id: str):
    """Agente de asesoría financiera personalizado"""
    # 1. Obtener contexto del usuario desde Fineract
    user_accounts = fineract_client.get_client_accounts(user_id)
    
    # 2. Analizar con Claude usando MCP tools
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",  # Haiku para ops económicas
        max_tokens=2048,
        tools=mcp_tools,
        messages=[{
            "role": "user",
            "content": f"Usuario tiene: {user_accounts}. Pregunta: {user_query}"
        }]
    )
    return response
```

**Tiempo estimado**: 6-10 semanas | **Deal size**: $150k-600k

---

## Patrón 4 — Core Banking AI Layer (Credit + KYC con LangGraph)

**Objetivo**: Añadir capa agéntica sobre Apache Fineract para automatizar crédito, KYC y AML.

**Repos**:
- [apache/fineract](https://github.com/apache/fineract) — Apache-2.0
- [finos/open-regtech-sig](https://github.com/finos/open-regtech-sig) — Apache-2.0
- LangGraph para orquestación multi-agente

**Grafo de agentes**:
```python
from langgraph.graph import StateGraph, END
import anthropic

def build_credit_graph():
    graph = StateGraph(CreditApplicationState)
    
    # Agente 1: KYC/AML verification
    graph.add_node("kyc_agent", kyc_verification_node)
    
    # Agente 2: Credit scoring alternativo (bureau + datos alternativos)
    graph.add_node("credit_agent", credit_scoring_node)
    
    # Agente 3: Risk assessment
    graph.add_node("risk_agent", risk_assessment_node)
    
    # Agente 4: Compliance check (LGPD/GDPR/EU AI Act)
    graph.add_node("compliance_agent", compliance_check_node)
    
    # Human-in-the-loop para decisiones >$50k (EU AI Act requirement)
    graph.add_node("human_review", human_review_node)
    
    graph.add_edge("kyc_agent", "credit_agent")
    graph.add_edge("credit_agent", "risk_agent")
    graph.add_conditional_edges(
        "risk_agent",
        lambda s: "human_review" if s["loan_amount"] > 50000 else "compliance_agent"
    )
    return graph.compile()

# Usar Claude Sonnet para análisis complejo
def credit_scoring_node(state):
    client = anthropic.Anthropic()
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        messages=[{"role": "user", "content": f"Analiza riesgo crediticio: {state['application']}"}]
    )
    return {"credit_score": response.content[0].text, "confidence": 0.87}
```

**Tiempo estimado**: 8-14 semanas | **Deal size**: $200k-800k

---

## Patrón 5 — RegTech EU AI Act Compliance (URGENTE — deadline ago-2, 2026)

**Objetivo**: Auditoría rápida + documentación de sistemas AI financieros para cumplir EU AI Act.

**Repos**:
- [finos/common-domain-model](https://github.com/finos/common-domain-model) — Apache-2.0 (schema)
- [finos/open-regtech-sig](https://github.com/finos/open-regtech-sig) — Apache-2.0

**Entregables en 3-4 semanas**:
```yaml
eu_ai_act_checklist:
  high_risk_systems:
    - credit_scoring_models: ✅ inventariados
    - aml_transaction_monitoring: ✅ documentados  
    - insurance_underwriting: ✅ auditados
    
  technical_requirements:
    - transparency_report: generado con Claude (explainability per decision)
    - risk_management_system: LangGraph audit trail habilitado
    - human_oversight_mechanism: HITL mandatory para decisiones >threshold
    - data_governance_log: FINOS CDM para trazabilidad de datos
    
  documentation:
    - conformity_assessment: Claude genera informe XAI por sistema
    - technical_file: registro de versiones + cambios de modelo
    - instructions_for_use: documento para operadores
```

**Script de auditoría**:
```python
import anthropic

def audit_ai_system(system_name: str, system_docs: str) -> dict:
    client = anthropic.Anthropic()
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=4096,
        messages=[{
            "role": "user",
            "content": f"""Analiza este sistema AI bajo EU AI Act Annex III:
            
Sistema: {system_name}
Documentación: {system_docs}

Determina:
1. ¿Es high-risk bajo Annex III? (credit scoring / AML / insurance)
2. Brechas de cumplimiento identificadas
3. Pasos específicos para cumplir antes de ago-2, 2026
4. Riesgo de multa estimado si no cumple (hasta €30M o 6% facturación global)

Formato: JSON con risk_level, gaps[], action_items[], timeline_weeks"""
        }]
    )
    return response

# Correr para cada sistema AI del cliente
for system in client_ai_systems:
    audit = audit_ai_system(system["name"], system["docs"])
    print(audit)
```

**Tiempo estimado**: 3-4 semanas | **Deal size**: $80k-300k (urgente)

---

## Patrón 6 — AI Hedge Fund Clone (ai-hedge-fund como base)

**Objetivo**: Fork y customización de `virattt/ai-hedge-fund` para cliente de family office o fund manager.

**Repos**:
- [virattt/ai-hedge-fund](https://github.com/virattt/ai-hedge-fund) — MIT (18 agentes: 12 personas + 6 especialistas)
- [PyPortfolioOpt/PyPortfolioOpt](https://github.com/robertmartin8/PyPortfolioOpt) — MIT (optimización)
- [financial-datasets/mcp-server](https://github.com/financial-datasets/mcp-server) — MIT (datos)

**Customizaciones para cliente**:
```python
# Agregar persona personalizada del cliente
CUSTOM_ANALYSTS = {
    "client_cio": {
        "name": "Chief Investment Officer (Cliente)",
        "prompt": """Eres el CIO de {client_name}. 
        Tu tesis de inversión: {client_thesis}.
        Universo permitido: {client_universe}.
        Restricciones: {client_restrictions} (por estatutos del fondo)""",
        "weight": 0.3  # Peso en el debate multi-agente
    }
}

# Reemplazar Yahoo Finance con datos premium del cliente
def get_market_data(ticker: str, date: str):
    # Primero bloomberg si disponible, sino financial-datasets MCP
    if bloomberg_available:
        return bloomberg_mcp.get_historical(ticker, date)
    else:
        return financial_datasets_mcp.get_prices(ticker, date)
```

**Tiempo estimado**: 4-8 semanas | **Deal size**: $150k-500k

---

## Patrón 7 — RegTech Multi-Jurisdiccional LATAM (LangGraph + RAG regulatorio)

**Objetivo**: Agente que responde preguntas de cumplimiento regulatorio para bancos operando en múltiples países LATAM.

**Repos**:
- LangGraph (orquestación)
- pgvector (base vectorial para regulaciones)
- Claude Sonnet para razonamiento complejo
- OpenBB MCP para datos de referencia

**Arquitectura**:
```python
# RAG sobre regulaciones por país
REGULATORY_DOCS = {
    "brasil": ["Resolução BCB 4.966", "LGPD", "Circular CMN 3.978 AML"],
    "mexico": ["CNBV LRITF", "LFPIORPI AML", "Ley FinTech 2018"],
    "colombia": ["Decreto 1842 Open Banking", "SARLAFT AML"],
    "chile": ["Ley 21.521 Fintech", "Norma CMF para IA"],
    "peru": ["Resolución SBS 3274 Open Banking", "Circular AML"]
}

def regulatory_agent(query: str, jurisdictions: list):
    """Responde preguntas de compliance multi-jurisdicción"""
    # 1. Retrieval de regulaciones relevantes
    relevant_regs = vector_db.similarity_search(
        query, 
        filter={"jurisdiction": {"$in": jurisdictions}}
    )
    
    # 2. Claude Sonnet analiza y responde
    client = anthropic.Anthropic()
    response = client.messages.create(
        model="claude-sonnet-5",
        messages=[{
            "role": "user",
            "content": f"Pregunta: {query}\n\nRegulaciones relevantes:\n{relevant_regs}"
        }]
    )
    return response
```

**Tiempo estimado**: 6-10 semanas | **Deal size**: $150k-500k

---

## Patrón 8 — Bank Reconciliation con Claude Vision (Odoo + PDF bancarios)

**Objetivo**: Agente que procesa extractos bancarios en PDF y los reconcilia automáticamente en Odoo.

**Repos**:
- [odoo/odoo](https://github.com/odoo/odoo) — LGPL-3.0 (ERP destino)
- Claude Vision (extracción de datos de PDFs bancarios)

```python
import anthropic
import base64
from pathlib import Path

def reconcile_bank_statement(pdf_path: str, odoo_client):
    """Lee extracto bancario PDF y reconcilia en Odoo"""
    client = anthropic.Anthropic()
    
    # Leer PDF como imagen para Claude Vision
    pdf_data = Path(pdf_path).read_bytes()
    
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=4096,
        messages=[{
            "role": "user",
            "content": [
                {
                    "type": "document",
                    "source": {"type": "base64", "media_type": "application/pdf", "data": base64.b64encode(pdf_data).decode()}
                },
                {
                    "type": "text",
                    "text": """Extrae todas las transacciones bancarias en JSON:
[{"date": "YYYY-MM-DD", "description": "...", "amount": 0.00, "currency": "BRL", "type": "debit|credit"}]
Solo JSON, sin texto adicional."""
                }
            ]
        }]
    )
    
    # Parsear transacciones extraídas
    transactions = json.loads(response.content[0].text)
    
    # Crear líneas de conciliación en Odoo
    for tx in transactions:
        odoo_client.create_bank_statement_line(
            journal_id=bank_journal_id,
            date=tx["date"],
            name=tx["description"],
            amount=tx["amount"]
        )
    
    return f"Reconciliadas {len(transactions)} transacciones en Odoo"

# Uso: procesar todos los PDFs bancarios del mes
for pdf in Path("/bank_statements/").glob("*.pdf"):
    result = reconcile_bank_statement(str(pdf), odoo)
    print(result)
```

**Tiempo estimado**: 3-5 semanas | **Deal size**: $80k-250k

---

## Matriz de selección de patrón

| Si el cliente es... | Y necesita... | Usa Patrón |
|--------------------|---------------|------------|
| Asset manager / hedge fund | Trading algorítmico + research | P1 + P6 |
| Investment bank / sellside | Equity research automation | P2 |
| Fintech LATAM | Open Finance + asesoría consumidores | P3 |
| Banco tradicional | Crédito + KYC automatizado | P4 |
| Banco europeo | EU AI Act compliance urgente (ago-2026) | P5 |
| Family office LATAM | Agente de inversión personalizado | P6 |
| Banco multi-país LATAM | Compliance regulatorio multi-jurisdicción | P7 |
| PYME / contabilidad | Conciliación bancaria automática | P8 |
