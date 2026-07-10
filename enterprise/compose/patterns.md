# 🧩 Patrones de composición — Enterprise AI

> Recetas concretas para construir soluciones enterprise combinando repos + agentes + AI.
> Última actualización: 2026-07-10

## Stack base enterprise

```
[Plataforma vertical (Odoo / ERPNext / Twenty / OFBiz)]
          ↓ API REST / MCP Server
[Capa de integración AI (n8n / Dify)]
          ↓ tool calls
[Agentes especializados (LangGraph / CrewAI)]
          ↓ embeddings + retrieval
[Knowledge Base (RAGFlow + pgvector)]
          ↓ governance
[Agent Governance Toolkit (OWASP + EU AI Act)]
          ↓
[UI conversacional / Slack / Teams / Web App]
```

---

## P1 — Enterprise Knowledge Base con RAG Trazable

**Objetivo:** Reemplazar búsqueda en documentos internos (contratos, normativas, manuales) con un agente que responde con citaciones verificables.

**Stack:**
- RAGFlow (infiniflow/ragflow, Apache-2.0) — ingestion + parsing con deep document understanding
- LangGraph (langchain-ai/langgraph, MIT) — orchestration con multi-step retrieval
- Dify (langgenius/dify, Apache-2.0) — UI + workflow builder para usuarios no técnicos
- Agent Governance Toolkit (microsoft/agent-governance-toolkit, MIT) — compliance grading

**Arquitectura:**
```
Documentos (PDF/Word/Excel)
    ↓ RAGFlow parser (deep doc understanding)
Vector Store (pgvector/Qdrant)
    ↓ LangGraph retrieval agent
    │   ├── search_knowledge_base(query) → chunks con fuente
    │   ├── synthesize_answer(chunks) → respuesta con citas
    │   └── verify_compliance(answer) → Agent Governance check
    ↓ Dify canvas
UI Web / Slack bot
```

**Código esqueleto (Python):**
```python
from langgraph.graph import StateGraph, END
from ragflow_sdk import RAGFlow

ragflow = RAGFlow(api_key="...", base_url="http://ragflow:9380")

def retrieve_docs(state):
    dataset = ragflow.list_datasets(name="enterprise-docs")[0]
    chunks = dataset.retrieve(
        question=state["query"],
        top_k=5,
        highlight=True
    )
    return {"chunks": chunks, "sources": [c.document_name for c in chunks]}

def synthesize(state):
    # Claude llama con citaciones
    response = claude.messages.create(
        model="claude-opus-4-8",
        messages=[{
            "role": "user",
            "content": f"Basándote en estos documentos:\n{state['chunks']}\n\nResponde: {state['query']}\n\nCita la fuente de cada afirmación."
        }]
    )
    return {"answer": response.content[0].text}

graph = StateGraph(EnterpriseKBState)
graph.add_node("retrieve", retrieve_docs)
graph.add_node("synthesize", synthesize)
graph.add_edge("retrieve", "synthesize")
graph.add_edge("synthesize", END)

app = graph.compile()
```

**Tiempo estimado:** 6–10 semanas
**Costo proyecto:** $100k–$500k
**ROI típico:** Reducción 70% tiempo en búsqueda de documentos; compliance audit en minutos vs días.

---

## P2 — CRM AI Copilot (Twenty CRM + LangGraph + Claude)

**Objetivo:** Agente que entiende el pipeline de ventas y ejecuta acciones CRM en lenguaje natural desde Slack/Teams.

**Stack:**
- Twenty CRM (twentyhq/twenty, MIT) — CRM con MCP server nativo
- LangGraph (langchain-ai/langgraph, MIT) — orchestration con HITL para confirmaciones
- n8n (n8n-io/n8n) — triggers de eventos CRM (deal stage change, inactivity alerts)
- Claude (Anthropic) — LLM via MCP

**Flujo:**
```
Usuario en Slack: "¿Qué deals en riesgo tenemos este mes?"
    ↓ LangGraph agent
    ├── twenty_mcp.search_opportunities(stage="Negotiation", close_date="<30d")
    ├── twenty_mcp.get_activities(opportunity_id=[...])
    ├── analyze_risk(deals, activities) → risk_scores
    └── format_report() → Slack block
    
"Agrega nota de seguimiento al deal de Acme Corp"
    ↓ LangGraph + HITL
    ├── twenty_mcp.find_company(name="Acme Corp")
    ├── twenty_mcp.find_opportunity(company_id=..., stage="active")
    │   [HITL: "¿Confirmar nota en deal 'Q3 Expansion - Acme'?"]
    └── twenty_mcp.create_note(opportunity_id=..., body=...)
```

**Código esqueleto (Python):**
```python
from mcp import ClientSession, StdioServerParameters
from langgraph.prebuilt import create_react_agent
from langgraph.checkpoint.memory import MemorySaver

# Twenty CRM como MCP server
twenty_mcp_params = StdioServerParameters(
    command="npx",
    args=["twenty-mcp-server", "--api-key", TWENTY_API_KEY]
)

async def build_crm_agent():
    async with ClientSession(*twenty_mcp_params) as session:
        tools = await session.list_tools()
        agent = create_react_agent(
            model=claude_model,
            tools=[t.as_tool() for t in tools],
            checkpointer=MemorySaver(),
            interrupt_before=["twenty_create_note", "twenty_update_opportunity"]  # HITL
        )
        return agent
```

**Tiempo estimado:** 4–8 semanas
**Costo proyecto:** $80k–$400k
**ROI típico:** 3h/semana/rep ahorradas en CRM data entry; pipeline accuracy +25%.

---

## P3 — Governed Agent Pipeline (OWASP + EU AI Act Ready)

**Objetivo:** Envolver cualquier agente LangGraph/CrewAI con governance runtime que genera evidencia de compliance automática.

**Stack:**
- Agent Governance Toolkit (microsoft/agent-governance-toolkit, MIT) — runtime security
- LangGraph (langchain-ai/langgraph, MIT) — agentes de negocio
- LangSmith — observabilidad y auditoría

**Configuración:**
```python
from agent_governance_toolkit import GovernancePolicy, AgentGuard, ComplianceReport
from agent_governance_toolkit.integrations.langgraph import wrap_with_governance

# Define política (YAML o Python)
policy = GovernancePolicy.from_yaml("""
owasp_coverage:
  - goal_hijacking: block
  - tool_misuse: alert
  - identity_abuse: block
  - memory_poisoning: sanitize
  - cascading_failures: rate_limit(max_calls=50/min)
regulatory:
  eu_ai_act: high_risk  # activa logging + human oversight
  hipaa: enabled        # si aplica
  soc2: enabled
actions:
  on_violation: block_and_log
  require_hitl_for: ["delete_*", "send_email", "update_financial_*"]
""")

# Wrap el agente existente
governed_agent = wrap_with_governance(
    agent=my_langgraph_agent,
    policy=policy,
    audit_log="./audit/agent_logs.jsonl"
)

# Generar reporte de compliance
report = ComplianceReport.generate(
    audit_log="./audit/agent_logs.jsonl",
    framework="eu_ai_act"
)
report.export_pdf("compliance_evidence.pdf")  # listo para auditor
```

**Tiempo estimado:** 2–4 semanas (añadir a proyecto existente)
**Costo proyecto:** $50k–$200k
**ROI típico:** Evita multas EU AI Act (hasta €15M o 3% revenue); desbloquea proyectos paralizados por compliance.

---

## P4 — ERPNext + AI Augmentation (LATAM SMB)

**Objetivo:** Añadir capa de AI sobre ERPNext existente para automatizar tareas de back-office (PO approval, inventory alerts, financial reports).

**Stack:**
- ERPNext (frappe/erpnext, GPL-3.0) — ERP base
- erpnext-mcp-server (rakeshgangwar/erpnext-mcp-server, MIT) — MCP bridge
- LangGraph (MIT) — orchestration
- n8n — triggers de eventos ERP → agentes

**Flujo para aprobación automatizada de PO:**
```
n8n trigger: "Purchase Order submitted" (ERPNext webhook)
    ↓
LangGraph PO Review Agent
    ├── erpnext_mcp.get_purchase_order(po_id=...)
    ├── erpnext_mcp.get_supplier_history(supplier_id=...)
    ├── erpnext_mcp.check_budget_availability(cost_center=..., amount=...)
    ├── analyze_risk(po, supplier_history, budget) → risk_score
    │
    ├── if risk_score < 0.3:
    │   └── erpnext_mcp.approve_purchase_order(po_id=...)  # auto-approve
    │
    └── if risk_score >= 0.3:
        ├── [HITL: notificar approver con resumen]
        └── esperar confirmación
```

**Código esqueleto:**
```python
# n8n webhook → LangGraph
from fastapi import FastAPI
from langgraph.prebuilt import create_react_agent

app = FastAPI()

@app.post("/webhook/erp/po_submitted")
async def handle_po_submitted(event: dict):
    po_id = event["docname"]
    
    result = await po_review_agent.ainvoke({
        "messages": [{"role": "user", "content": f"Review PO {po_id} for auto-approval"}],
        "po_id": po_id
    })
    
    return {"status": "processed", "action": result["action"]}
```

**Tiempo estimado:** 8–14 semanas (incluyendo ERPNext setup)
**Costo proyecto:** $120k–$600k
**ROI típico:** 80% reducción tiempo ciclo PO; 40% menos errores en procurement; $200k–$1M ahorro anual para empresas medianas.

---

## P5 — SAP Modernization Sprint (Open ERP Migration + AI)

**Objetivo:** Migrar cliente de SAP ECC 6.0 a ERPNext + añadir capa AI que supera funcionalidad de SAP Joule, a fracción del costo.

**Stack:**
- ERPNext (frappe/erpnext, GPL-3.0) — ERP destino
- Frappe (frappe/frappe, MIT) — framework base
- LangGraph (MIT) — agentes de negocio
- RAGFlow (Apache-2.0) — knowledge base con documentación de procesos migrados
- Agent Governance Toolkit (MIT) — compliance enterprise
- n8n — workflows de integración

**Fases:**
```
Fase 1 (4-6 semanas): Data Migration
    SAP extractors → staging DB → ERPNext importers
    Validación: financial reconciliation agents (LangGraph)

Fase 2 (6-8 semanas): Process Mapping + AI Layer  
    Documentar procesos SAP → RAGFlow knowledge base
    Build LangGraph agents para los top 10 procesos críticos

Fase 3 (4-6 semanas): Cutover + Governed Deployment
    Agent Governance Toolkit wrapping
    LangSmith observabilidad
    HITL workflows para procesos de alto riesgo

Fase 4 (ongoing): Continuous Improvement
    n8n triggers → agentes → aprendizaje continuo
```

**Tiempo estimado:** 14–20 semanas total
**Costo proyecto:** $400k–$2M
**Ahorro cliente:** $500k–$5M/año en licencias SAP eliminadas + $200k–$1M en eficiencia operativa.

---

## P6 — Multi-Agent Workflow para Onboarding de Empleados

**Objetivo:** Agentes especializados que orquestan el onboarding completo (HR, IT, Facilities, Formación) sin intervención humana en el 80% de los pasos.

**Stack:**
- CrewAI (crewAIInc/crewAI, MIT) — crew de agentes especializados
- ERPNext HR (frappe/erpnext, GPL-3.0) — datos del empleado
- n8n — triggers y workflows de notificación
- RAGFlow — knowledge base de políticas de RRHH

**Crew:**
```python
from crewai import Agent, Task, Crew, Process

hr_agent = Agent(
    role="HR Coordinator",
    goal="Setup employee record and benefits in ERPNext",
    tools=[erpnext_mcp_tools],
    llm=claude_model
)

it_agent = Agent(
    role="IT Provisioner",
    goal="Create accounts, provision laptop, setup VPN access",
    tools=[jira_mcp_tools, okta_mcp_tools],
    llm=claude_model
)

training_agent = Agent(
    role="Learning Coordinator",
    goal="Enroll employee in mandatory training modules",
    tools=[moodle_mcp_tools, calendar_mcp_tools],
    llm=claude_model
)

policy_agent = Agent(
    role="Policy Guide",
    goal="Answer employee questions using company policies in RAGFlow",
    tools=[ragflow_search_tool],
    llm=claude_model
)

onboarding_crew = Crew(
    agents=[hr_agent, it_agent, training_agent, policy_agent],
    tasks=[...],  # tasks definidas por rol
    process=Process.sequential,
    verbose=True
)

result = onboarding_crew.kickoff(inputs={"employee_name": "...", "start_date": "..."})
```

**Tiempo estimado:** 8–12 semanas
**Costo proyecto:** $100k–$400k
**ROI típico:** Onboarding de 5 días → 1 día; costo por onboarding -60%; satisfacción empleado new-hire +40%.

---

## P7 — AI Governance Readiness Sprint (EU AI Act / LGPD)

**Objetivo:** Auditar agentes existentes del cliente, generar evidencia de compliance y remediar gaps críticos en 4–6 semanas.

**Stack:**
- Agent Governance Toolkit (microsoft/agent-governance-toolkit, MIT)
- LangSmith (observabilidad de agentes existentes)
- RAGFlow — indexar regulaciones aplicables (EU AI Act, LGPD, HIPAA)

**Deliverables:**
1. Inventario de todos los agentes en uso (producción + piloto)
2. Risk classification (high/medium/low risk per EU AI Act Annex III)
3. OWASP Agentic AI Top 10 assessment por agente
4. Compliance grading report (EU AI Act / LGPD)
5. Remediation plan priorizado
6. Agent Governance Toolkit integrado en top 3 agentes críticos
7. Documentación de evidencia para auditoría

**Tiempo estimado:** 4–6 semanas
**Costo proyecto:** $50k–$200k
**ROI típico:** Evita multas EU AI Act (€15M o 3% revenue); desbloquea proyectos en espera de aprobación legal; genera diferenciador competitivo "governed AI" para el cliente.

---

## Matriz de selección de patrón

| Situación cliente | Patrón recomendado | Time-to-value |
|-------------------|-------------------|---------------|
| "Nuestros empleados pierden tiempo buscando documentos internos" | P1 — Knowledge Base RAG | 6–10 sem |
| "Quiero que el equipo de ventas use el CRM, no que lo evite" | P2 — CRM AI Copilot | 4–8 sem |
| "Legal nos bloqueó el proyecto de AI por compliance" | P3 — Governed Agent Pipeline / P7 Sprint | 2–6 sem |
| "Tenemos SAP ECC que ya no podemos pagar" | P5 — SAP Modernization | 14–20 sem |
| "El onboarding nos toma 2 semanas por persona" | P6 — Multi-Agent Onboarding | 8–12 sem |
| "Ya tenemos ERPNext pero queremos automatizar procurement" | P4 — ERPNext AI Augmentation | 8–14 sem |
| "Tenemos que reportar compliance a la junta directiva" | P7 — AI Governance Sprint | 4–6 sem |
