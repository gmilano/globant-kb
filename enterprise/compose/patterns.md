# Composition Patterns — Enterprise AI

> Concrete recipes combining real repos + agents + AI for enterprise use cases.
> Every pattern names specific repos, shows wiring code, and estimates delivery time.
> Last updated: 2026-07-14

## Architecture Baseline

```
[Enterprise Vertical Platform]          ERPNext / Odoo / Twenty / Metabase
          ↓ MCP or REST
[Data / Context Layer]                  pgvector / Redis / MCP server
          ↓
[Agent Orchestration]                   LangGraph / CrewAI / MAF
          ↓ LangChain tools / MCP tools
[AI Reasoning]                          Claude API / GPT-4o / local LLM
          ↓
[Observability]                         OpenTelemetry → Grafana / LangSmith
          ↓
[Human-in-the-Loop]                     HITL checkpoint (LangGraph/MAF)
          ↓
[Enterprise Channel]                    n8n / OpenClaw / Mattermost / WhatsApp
```

---

## P1 — Intelligent Document Processing (ERP AP Automation)

**Use case**: Accounts payable automation — receive invoice via email, extract fields, validate against PO in ERPNext, trigger payment or flag exception.

**Repos**:
- [frappe/erpnext](https://github.com/frappe/erpnext) — GPL-3.0 — ERP backend
- [rakeshgangwar/erpnext-mcp-server](https://github.com/rakeshgangwar/erpnext-mcp-server) — MIT — MCP bridge
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — MIT — HITL orchestration
- [n8n-io/n8n](https://github.com/n8n-io/n8n) — Apache-2.0 — email trigger + notification

**Architecture**:
```
Email (n8n trigger)
  → PDF/image invoice → Claude Vision (extract fields)
  → ERPNext MCP Server (lookup PO)
  → LangGraph node: validate match
      ↓ MATCH: trigger ERPNext payment API
      ↓ MISMATCH: HITL checkpoint → human review → approve/reject
  → n8n: send Slack/email notification
```

**Python Code (LangGraph HITL core)**:
```python
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.postgres import PostgresSaver
import anthropic, requests

client = anthropic.Anthropic()

def extract_invoice(state):
    result = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": [
                {"type": "image", "source": {"type": "base64", "media_type": "application/pdf", "data": state["invoice_b64"]}},
                {"type": "text", "text": "Extract: vendor, invoice_number, amount, due_date, line_items as JSON"}
            ]
        }]
    )
    state["extracted"] = result.content[0].text
    return state

def validate_against_po(state):
    # Call ERPNext via MCP server
    resp = requests.get(
        f"{MCP_SERVER_URL}/purchase-order",
        params={"invoice_number": state["extracted"]["invoice_number"]}
    )
    state["po"] = resp.json()
    state["match"] = abs(state["extracted"]["amount"] - state["po"]["amount"]) < 0.01
    return state

def route_validation(state):
    return "approve" if state["match"] else "human_review"

def approve_payment(state):
    requests.post(f"{ERPNEXT_URL}/api/method/create_payment", json=state["extracted"])
    return state

# HITL: interrupt here; human reviews state["extracted"] vs state["po"]
def human_review(state):
    return state  # LangGraph pauses; resumes after human input

builder = StateGraph(dict)
builder.add_node("extract", extract_invoice)
builder.add_node("validate", validate_against_po)
builder.add_node("approve", approve_payment)
builder.add_node("human_review", human_review)
builder.set_entry_point("extract")
builder.add_edge("extract", "validate")
builder.add_conditional_edges("validate", route_validation, {"approve": "approve", "human_review": "human_review"})
builder.add_edge("approve", END)
builder.add_edge("human_review", "approve")  # after human approves

checkpointer = PostgresSaver.from_conn_string("postgresql://...")
graph = builder.compile(checkpointer=checkpointer, interrupt_before=["human_review"])
```

**Delivery estimate**: 3–4 weeks MVP | **ROI**: 90% processing time reduction (industry benchmark)

---

## P2 — Enterprise Multi-Agent Sales Crew (CrewAI + ERP/CRM)

**Use case**: Multi-agent sales pipeline — research prospect, personalize pitch, draft proposal, update CRM, schedule follow-up.

**Repos**:
- [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) — MIT — multi-agent orchestration
- [twentyhq/twenty](https://github.com/twentyhq/twenty) — AGPL-3.0 — MCP-native CRM
- [n8n-io/n8n](https://github.com/n8n-io/n8n) — Apache-2.0 — trigger + scheduling

**Python Code**:
```python
from crewai import Agent, Task, Crew, Process
from crewai_tools import MCPTool

# Twenty CRM MCP server exposes leads, contacts, deals
twenty_mcp = MCPTool(server_url="http://twenty-crm:3000/mcp")

research_agent = Agent(
    role="Prospect Researcher",
    goal="Research company background, recent news, pain points",
    backstory="Expert B2B sales researcher with access to web and CRM",
    tools=[twenty_mcp],
    llm="claude-sonnet-5"
)

pitch_agent = Agent(
    role="Sales Pitch Writer",
    goal="Craft personalized value proposition based on research",
    backstory="Senior enterprise sales executive with 15y experience",
    llm="claude-sonnet-5"
)

crm_agent = Agent(
    role="CRM Updater",
    goal="Update deal stage, log activities, schedule follow-up in Twenty CRM",
    tools=[twenty_mcp],
    llm="claude-haiku-4-5-20251001"  # cheaper for deterministic CRUD
)

research_task = Task(
    description="Research {company_name}: size, industry, recent news, tech stack, pain points",
    agent=research_agent, output_file="research.md"
)
pitch_task = Task(
    description="Based on research, write a 3-paragraph personalized pitch. Focus on ROI.",
    agent=pitch_agent, context=[research_task]
)
crm_task = Task(
    description="Update {company_name} deal in Twenty CRM: add research notes, pitch draft, set follow-up for +3 days",
    agent=crm_agent, context=[research_task, pitch_task]
)

crew = Crew(
    agents=[research_agent, pitch_agent, crm_agent],
    tasks=[research_task, pitch_task, crm_task],
    process=Process.sequential,
    verbose=True
)

result = crew.kickoff(inputs={"company_name": "Acme Corp"})
```

**Delivery estimate**: 2–3 weeks | **ROI**: 5–8h per deal saved on research + CRM hygiene

---

## P3 — Enterprise RAG over ERP Data (Dify + ERPNext)

**Use case**: Natural-language querying of ERPNext data — "What are our top 10 overdue invoices?" → live answer with breakdown.

**Repos**:
- [langgenius/dify](https://github.com/langgenius/dify) — Apache-2.0 — RAG + agent platform
- [frappe/erpnext](https://github.com/frappe/erpnext) — GPL-3.0 — ERP data source
- [rakeshgangwar/erpnext-mcp-server](https://github.com/rakeshgangwar/erpnext-mcp-server) — MIT — MCP bridge

**Architecture**:
```
User → Dify Chat App
  → ERPNext MCP Tool (live data query, no ingestion lag)
  → Claude API (reasoning + formatting)
  → Response with drill-down links to ERPNext records
```

**Setup (Dify config)**:
```yaml
# dify/tools/erpnext_mcp.yaml
type: api
name: ERPNext MCP
description: Query live ERPNext data via MCP
api:
  base_url: http://erpnext-mcp:8000
  endpoints:
    - name: list_documents
      method: GET
      path: /resources/{doctype}
      params: [filters, fields, limit]
    - name: get_document
      method: GET
      path: /resources/{doctype}/{name}
```

**System Prompt**:
```
You are an enterprise data analyst with access to live ERPNext data via tools.
Always query the tool before answering financial questions.
Format currency in the user's locale. Include document links for drill-down.
Never guess figures — if uncertain, query again.
```

**Delivery estimate**: 1–2 weeks | **Users**: Finance managers, operations directors, C-suite

---

## P4 — Hyperautomation Pipeline (n8n + LangGraph)

**Use case**: End-to-end procurement automation — PO request → vendor selection → approval → PO creation in ERP.

**Repos**:
- [n8n-io/n8n](https://github.com/n8n-io/n8n) — Apache-2.0 — event trigger + notification
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — MIT — multi-step reasoning + HITL
- [frappe/erpnext](https://github.com/frappe/erpnext) — GPL-3.0 — ERP backend

**Architecture**:
```
n8n Trigger: Slack command "/po request {item} {qty}"
  → LangGraph workflow:
      Node 1: Parse request + validate budget
      Node 2: Query ERPNext for approved vendors
      Node 3: AI compares vendor quotes (price, lead time, quality score)
      Node 4: HITL checkpoint — CFO approval for >$10k
      Node 5: Create PO in ERPNext via API
  → n8n: notify requester + finance team
```

**n8n AI Agent node config**:
```json
{
  "node": "AI Agent",
  "model": "claude-sonnet-5",
  "tools": [
    {"type": "langgraph", "url": "http://langgraph-server:8000/po-workflow"},
    {"type": "http", "url": "http://erpnext/api/resource/Purchase%20Order", "method": "POST"}
  ],
  "systemMessage": "You orchestrate procurement workflows. Always check budget before creating POs. Escalate to HITL for amounts over configured threshold."
}
```

**Delivery estimate**: 4–6 weeks | **ROI**: 70% reduction in PO cycle time

---

## P5 — LATAM WhatsApp Enterprise Agent (OpenClaw + n8n)

**Use case**: Customer service / sales agent accessible via WhatsApp for LATAM SMEs — handles product queries, order status, appointment booking.

**Repos**:
- [openclaw/openclaw](https://github.com/openclaw/openclaw) — MIT — omnichannel AI assistant
- [n8n-io/n8n](https://github.com/n8n-io/n8n) — Apache-2.0 — backend workflow + ERP sync
- [frappe/erpnext](https://github.com/frappe/erpnext) — GPL-3.0 — order/inventory data

**Architecture**:
```
WhatsApp Business API
  → OpenClaw (WhatsApp channel + Task Brain)
  → ClawHub Skill: ERPNext order lookup
  → n8n webhook: update order status / create appointment
  → OpenClaw: reply in Spanish/Portuguese via Claude
```

**OpenClaw skill config** (openclaw-skill.yml):
```yaml
name: erpnext-orders
description: Look up customer orders and status in ERPNext
channel: whatsapp
trigger: "order|pedido|meu pedido|status"
action:
  type: http
  url: "${N8N_WEBHOOK_URL}/order-lookup"
  method: POST
  body:
    customer_phone: "{{ message.from }}"
    query: "{{ message.text }}"
response_template: |
  Hola {{customer_name}}, tu pedido {{order_id}} está {{status}}.
  Fecha estimada de entrega: {{delivery_date}}.
  ¿Necesitas algo más?
```

**n8n workflow** (webhook → ERPNext → response):
```javascript
// n8n Function node
const phone = $input.first().json.customer_phone;
const salesOrder = await $http.get(
  `${ERPNEXT_URL}/api/resource/Sales Order`,
  { params: { filters: JSON.stringify([["contact_mobile", "=", phone]]), fields: '["name","status","delivery_date"]' } }
);
return { order_id: salesOrder.data[0].name, status: salesOrder.data[0].status, delivery_date: salesOrder.data[0].delivery_date };
```

**Delivery estimate**: 2–3 weeks | **Market**: 75% of LATAM enterprises expect WhatsApp agents by end-2026

---

## P6 — Microsoft MAF Enterprise Approval Agent (.NET / Azure)

**Use case**: Budget approval multi-agent system for Microsoft-stack enterprise — agent collects data, routes to approvers, enforces policy, logs audit trail.

**Repos**:
- [microsoft/agent-framework](https://github.com/microsoft/agent-framework) — MIT — MAF 1.0 SDK
- n8n or Azure Logic Apps — trigger layer
- Azure Monitor + OpenTelemetry — observability

**Python Code (MAF)**:
```python
from agent_framework import Agent, AgentGraph, HITLCheckpoint, OTelConfig

otel = OTelConfig(endpoint="http://otel-collector:4317", service_name="budget-approval-agent")

data_collector = Agent(
    name="DataCollector",
    instructions="Collect budget request details from the requestor and validate against policy.",
    tools=["erp_query", "policy_lookup"],
    model="claude-sonnet-5"
)

policy_validator = Agent(
    name="PolicyValidator",
    instructions="Validate the request against budget policy. Determine approval tier (auto / manager / CFO).",
    tools=["policy_lookup"],
    model="claude-haiku-4-5-20251001"
)

notifier = Agent(
    name="Notifier",
    instructions="Send approval notifications via Teams and log audit trail.",
    tools=["teams_message", "audit_log"],
    model="claude-haiku-4-5-20251001"
)

graph = AgentGraph(otel=otel)
graph.add_node(data_collector)
graph.add_node(policy_validator)
graph.add_node(HITLCheckpoint(name="manager_approval", notify_via="teams"))
graph.add_node(notifier)

graph.add_edge(data_collector, policy_validator)
graph.add_conditional_edge(
    policy_validator,
    condition=lambda state: state["approval_tier"],
    routes={"auto": notifier, "manager": "manager_approval", "cfo": "manager_approval"}
)
graph.add_edge("manager_approval", notifier)

result = await graph.run(thread_id="budget-req-001", initial_state={"request": budget_request})
```

**Delivery estimate**: 4–5 weeks | **Best for**: Microsoft Azure / .NET enterprise clients

---

## P7 — Enterprise Observability-First Agent Stack

**Use case**: Build any enterprise agent with production-grade observability from day one — traces, evals, cost tracking, replay.

**Repos**:
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — MIT — orchestration
- [langchain-ai/langsmith-sdk](https://github.com/langchain-ai/langsmith-sdk) — MIT — LLM observability
- [open-telemetry/opentelemetry-python](https://github.com/open-telemetry/opentelemetry-python) — Apache-2.0 — standard tracing

**Python Code**:
```python
from langsmith import traceable, Client
from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor

# OTel setup (routes to Grafana / Azure Monitor)
provider = TracerProvider()
provider.add_span_processor(BatchSpanProcessor(OTLPSpanExporter(endpoint="http://otel-collector:4317")))
trace.set_tracer_provider(provider)
tracer = trace.get_tracer("enterprise-agent")

ls_client = Client()  # LangSmith traces + evals

@traceable(name="enterprise-agent-run", run_type="chain")
def run_enterprise_agent(user_input: str, session_id: str):
    with tracer.start_as_current_span("agent-execution") as span:
        span.set_attribute("session.id", session_id)
        span.set_attribute("user.input.length", len(user_input))

        # Run LangGraph workflow
        result = graph.invoke(
            {"messages": [{"role": "user", "content": user_input}]},
            config={"configurable": {"thread_id": session_id}}
        )

        span.set_attribute("output.tokens", result.get("usage", {}).get("output_tokens", 0))
        return result

# Evaluation: run weekly evals against golden dataset
def run_evals():
    dataset = ls_client.read_dataset(dataset_name="enterprise-agent-golden")
    ls_client.run_on_dataset(
        dataset_name="enterprise-agent-golden",
        llm_or_chain_factory=run_enterprise_agent,
        evaluation=["criteria:correctness", "criteria:helpfulness"]
    )
```

**Delivery estimate**: Add 1 week to any agent project | **Value**: Makes agent deployment defensible to enterprise stakeholders

---

## P8 — Open ERP + Local LLM (LATAM Data Sovereignty Stack)

**Use case**: Enterprise AI over ERP data with no data leaving the country — on-prem ERPNext + local LLM + Langflow, fully air-gapped.

**Repos**:
- [frappe/erpnext](https://github.com/frappe/erpnext) — GPL-3.0 — ERP
- [langflow-ai/langflow](https://github.com/langflow-ai/langflow) — MIT — visual agent builder
- [ollama/ollama](https://github.com/ollama/ollama) — MIT — local LLM runtime
- [rakeshgangwar/erpnext-mcp-server](https://github.com/rakeshgangwar/erpnext-mcp-server) — MIT — MCP bridge

**Docker Compose Stack**:
```yaml
version: "3.9"
services:
  erpnext:
    image: frappe/erpnext:v15
    ports: ["8000:8000"]
    environment:
      - DB_HOST=mariadb
      - REDIS_CACHE=redis:6379

  erpnext-mcp:
    image: ghcr.io/rakeshgangwar/erpnext-mcp-server:latest
    environment:
      - ERPNEXT_URL=http://erpnext:8000
      - API_KEY=${ERPNEXT_API_KEY}
    ports: ["8001:8000"]

  ollama:
    image: ollama/ollama:latest
    volumes: ["ollama-data:/root/.ollama"]
    ports: ["11434:11434"]
    deploy:
      resources:
        reservations:
          devices: [{driver: nvidia, count: 1, capabilities: [gpu]}]

  langflow:
    image: langflowai/langflow:latest
    ports: ["7860:7860"]
    environment:
      - LANGFLOW_DATABASE_URL=postgresql://langflow:password@postgres/langflow
      - OLLAMA_BASE_URL=http://ollama:11434

volumes:
  ollama-data:
```

**Langflow config**: Set Ollama as LLM provider → connect ERPNext MCP tool → build RAG flow → export as REST API.

**Data flow** (fully local):
```
User query → Langflow → Ollama (Llama 3.1 70B or Mistral) → ERPNext MCP → Response
                      ↑ No internet required after setup
```

**Delivery estimate**: 3–5 weeks | **Best for**: LATAM clients with LGPD/data residency requirements

---

*Auto-updated by the Globant AI Studios ingest pipeline.*
