# 🧩 Patrones de composición — Enterprise AI

> Recetas concretas para construir soluciones enterprise combinando repos + agentes + AI.
> Cada patrón nombra repos específicos, licencias y cómo conectarlos.
> Última actualización: 2026-07-09

---

## Patrón 1: ERPNext AI Assistant con MCP
**Caso de uso:** PME/PYME con ERPNext que quiere un copiloto para facturación, inventario, compras y reportes financieros usando lenguaje natural.

**Stack:**
- [frappe/frappe](https://github.com/frappe/frappe) (MIT) — framework base
- [frappe/erpnext](https://github.com/frappe/erpnext) (GPL-3.0) — ERP
- [rakeshgangwar/erpnext-mcp-server](https://github.com/rakeshgangwar/erpnext-mcp-server) (MIT) — MCP server
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) (MIT) — orquestación
- Claude Sonnet 5 — modelo

```python
# 1. Instalar erpnext-mcp-server
# pip install erpnext-mcp-server

# 2. Agent con MCP tools de ERPNext
import anthropic
from langgraph.graph import StateGraph, MessagesState

client = anthropic.Anthropic()
MODEL = "claude-sonnet-5"

# MCP tools auto-discover desde erpnext-mcp-server
def erp_agent_node(state: MessagesState):
    response = client.messages.create(
        model=MODEL,
        max_tokens=4096,
        tools=[
            {"type": "mcp", "server": "erpnext", "tool": "get_sales_orders"},
            {"type": "mcp", "server": "erpnext", "tool": "create_purchase_order"},
            {"type": "mcp", "server": "erpnext", "tool": "get_stock_ledger"},
            {"type": "mcp", "server": "erpnext", "tool": "get_financial_statements"},
        ],
        messages=state["messages"]
    )
    return {"messages": [response]}

graph = StateGraph(MessagesState)
graph.add_node("erp_agent", erp_agent_node)
graph.set_entry_point("erp_agent")
app = graph.compile()

# Uso
result = app.invoke({"messages": [
    {"role": "user", "content": "¿Cuáles son las 5 órdenes de venta pendientes más antiguas?"}
]})
```

**Tiempo estimado:** 3–6 semanas | **Deal size:** $80k–$300k

---

## Patrón 2: Visual AI Builder Enterprise (Dify + Claude + MCP)
**Caso de uso:** Empresa que quiere que sus domain experts (no-devs) construyan agentes para tareas repetitivas: análisis de documentos, respuestas a clientes, generación de reportes.

**Stack:**
- [langgenius/dify](https://github.com/langgenius/dify) (Apache-2.0) — plataforma visual
- Claude Sonnet 5 — modelo (configurado en Dify)
- [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) (MIT) — MCP tools

```yaml
# docker-compose.dify.yml
version: "3.8"
services:
  dify-api:
    image: langgenius/dify-api:latest
    environment:
      SECRET_KEY: ${SECRET_KEY}
      ANTHROPIC_API_KEY: ${ANTHROPIC_API_KEY}
      DATABASE_URL: postgresql://dify:${DB_PASS}@db/dify
      REDIS_URL: redis://redis:6379/0
      VECTOR_STORE: weaviate
      WEAVIATE_HOST: weaviate
    depends_on: [db, redis, weaviate]
  
  dify-web:
    image: langgenius/dify-web:latest
    environment:
      NEXT_PUBLIC_API_PREFIX: http://dify-api:5001/v1
  
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: dify
      POSTGRES_PASSWORD: ${DB_PASS}
  
  redis:
    image: redis:7-alpine
  
  weaviate:
    image: semitechnologies/weaviate:latest
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: "true"
      DEFAULT_VECTORIZER_MODULE: none

# Acceso: http://localhost:3000 (HTTPS en prod)
# Luego desde UI: crear App → Agent → conectar Claude → añadir MCP tools
```

**Capacidades:** RAG sobre documentos internos, HITL aprobaciones, multi-agent pipelines visuales.
**Tiempo estimado:** 2–4 semanas | **Deal size:** $50k–$200k

---

## Patrón 3: Multi-Agent Sales Intelligence con CrewAI + SuiteCRM
**Caso de uso:** Equipo de ventas que quiere análisis automático de leads, scoring, y síntesis de inteligencia competitiva sobre cada cuenta.

**Stack:**
- [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) (MIT) — orquestación multi-agent
- [suitecrmio/suitecrm-core](https://github.com/suitecrmio/suitecrm-core) (AGPL-3.0) — CRM
- Claude Sonnet 5 — modelo
- [langfuse/langfuse](https://github.com/langfuse/langfuse) (MIT) — observabilidad

```python
from crewai import Agent, Crew, Task, Process
from crewai.tools import tool
import anthropic
import requests

# Tool: consultar SuiteCRM via REST API
@tool("SuiteCRM Lead Query")
def get_crm_leads(account_name: str) -> dict:
    """Get lead and account data from SuiteCRM"""
    response = requests.get(
        f"{SUITECRM_URL}/api/v8/module/Accounts",
        params={"filter[name]": account_name},
        headers={"Authorization": f"Bearer {CRM_TOKEN}"}
    )
    return response.json()

# Agentes especializados
lead_researcher = Agent(
    role="Lead Intelligence Analyst",
    goal="Research and score incoming sales leads",
    backstory="Expert in B2B lead qualification and market intelligence",
    tools=[get_crm_leads],
    llm="claude-sonnet-5",
    verbose=True
)

competitive_analyst = Agent(
    role="Competitive Intelligence Specialist", 
    goal="Analyze competitive landscape for each account",
    backstory="Expert in competitive analysis and positioning",
    llm="claude-sonnet-5",
)

sales_strategist = Agent(
    role="Sales Strategy Advisor",
    goal="Generate personalized outreach strategy",
    backstory="Senior enterprise sales consultant with 15 years experience",
    llm="claude-sonnet-5",
)

# Crew pipeline
crew = Crew(
    agents=[lead_researcher, competitive_analyst, sales_strategist],
    tasks=[
        Task(description="Research account {account_name} in CRM and public sources", agent=lead_researcher),
        Task(description="Analyze competitive position and recent news for {account_name}", agent=competitive_analyst),
        Task(description="Generate personalized sales strategy for {account_name}", agent=sales_strategist),
    ],
    process=Process.sequential,
    verbose=True
)

result = crew.kickoff(inputs={"account_name": "Empresa XYZ SA"})
```

**Tiempo estimado:** 4–8 semanas | **Deal size:** $100k–$400k

---

## Patrón 4: Enterprise Data Catalog AI con OpenMetadata + LangGraph
**Caso de uso:** Empresa con cientos de datasets/pipelines que necesita un agente que responda preguntas sobre sus datos: "¿Quién es dueño de este dataset?", "¿Qué pipeline alimenta este reporte?", "¿Qué datos tengo sobre clientes?"

**Stack:**
- [open-metadata/OpenMetadata](https://github.com/open-metadata/OpenMetadata) (Apache-2.0) — data catalog
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) (MIT) — orquestación
- [langfuse/langfuse](https://github.com/langfuse/langfuse) (MIT) — audit trail (EU AI Act)
- Claude Sonnet 5 — modelo

```python
from langgraph.graph import StateGraph, MessagesState
from langfuse import Langfuse
import anthropic, requests

langfuse = Langfuse()  # self-hosted para compliance
client = anthropic.Anthropic()

# Tool: OpenMetadata REST API
def search_metadata(query: str) -> list:
    """Search OpenMetadata catalog"""
    resp = requests.get(
        f"{OPENMETADATA_URL}/api/v1/search/query",
        params={"q": query, "index": "table_search_index", "size": 10},
        headers={"Authorization": f"Bearer {OM_TOKEN}"}
    )
    return resp.json().get("hits", {}).get("hits", [])

def get_lineage(entity_id: str) -> dict:
    """Get data lineage for an entity"""
    resp = requests.get(
        f"{OPENMETADATA_URL}/api/v1/lineage/table/{entity_id}",
        headers={"Authorization": f"Bearer {OM_TOKEN}"}
    )
    return resp.json()

# LangGraph agent con HITL para acciones destructivas
def data_agent_node(state: MessagesState):
    with langfuse.trace(name="data-catalog-query") as trace:
        trace.metadata = {"eu_ai_act_compliant": True}
        response = client.messages.create(
            model="claude-sonnet-5",
            max_tokens=2048,
            tools=[
                {"name": "search_metadata", "description": "Search data catalog", 
                 "input_schema": {"type": "object", "properties": {"query": {"type": "string"}}}},
                {"name": "get_lineage", "description": "Get data lineage",
                 "input_schema": {"type": "object", "properties": {"entity_id": {"type": "string"}}}},
            ],
            messages=state["messages"]
        )
        trace.output = response.content[0].text if response.content else ""
    return {"messages": [response]}

graph = StateGraph(MessagesState)
graph.add_node("data_agent", data_agent_node)
graph.set_entry_point("data_agent")
app = graph.compile()
```

**Tiempo estimado:** 6–10 semanas | **Deal size:** $150k–$600k

---

## Patrón 5: EU AI Act Compliance Agent (URGENT — 25 días)
**Caso de uso:** Empresa con sistemas high-risk (Annex III EU AI Act) que necesita urgentemente documentación de conformidad, audit trails y gestión continua de riesgos antes del 2 de agosto de 2026.

**Stack:**
- [open-metadata/OpenMetadata](https://github.com/open-metadata/OpenMetadata) (Apache-2.0) — AI system registry
- [langfuse/langfuse](https://github.com/langfuse/langfuse) (MIT) — audit trail LLM decisions
- [open-policy-agent/opa](https://github.com/open-policy-agent/opa) (Apache-2.0) — policy enforcement
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) (MIT) — HITL workflows

```python
# eu_ai_act_compliance_agent.py
from langchain_anthropic import ChatAnthropic
from langgraph.graph import StateGraph
from langgraph.checkpoint.memory import MemorySaver
from langfuse import Langfuse
from typing import TypedDict, Annotated
import requests

langfuse = Langfuse()

class ComplianceState(TypedDict):
    system_name: str
    risk_tier: str
    checks_completed: list
    issues_found: list
    human_review_required: bool

# Check OPA policy for high-risk AI system
def check_opa_policy(system_name: str, action: str) -> bool:
    """Verify action is allowed by OPA policy"""
    resp = requests.post(
        "http://opa:8181/v1/data/euaiact/allow",
        json={"input": {"system": system_name, "action": action, "risk_tier": "high"}}
    )
    return resp.json().get("result", False)

def audit_log_decision(system_name: str, decision: str, rationale: str):
    """Log AI decision to Langfuse for EU AI Act Annex VIII audit trail"""
    with langfuse.trace(name=f"eu-ai-act-decision-{system_name}") as trace:
        trace.metadata = {
            "annex_viii_compliant": True,
            "system": system_name,
            "decision": decision,
            "timestamp": "2026-07-08T00:00:00Z"
        }
        trace.output = rationale

# Compliance assessment workflow
def run_compliance_assessment(system: dict) -> dict:
    """Run EU AI Act Annex III compliance checklist"""
    llm = ChatAnthropic(model="claude-sonnet-5")
    
    checklist_prompt = f"""
    Assess EU AI Act compliance for: {system['name']}
    Risk tier: {system['risk_tier']}
    Description: {system['description']}
    
    Check these Annex III requirements:
    1. Risk management system (Art. 9)
    2. Data governance (Art. 10)
    3. Technical documentation (Art. 11)
    4. Transparency obligations (Art. 13)
    5. Human oversight measures (Art. 14)
    6. Accuracy & robustness (Art. 15)
    
    For each: COMPLIANT / NON-COMPLIANT / NEEDS-REVIEW + evidence required.
    """
    
    response = llm.invoke(checklist_prompt)
    audit_log_decision(system['name'], "compliance-assessment", response.content)
    return {"assessment": response.content, "system": system['name']}

# Usage
high_risk_systems = [
    {"name": "HR Screening AI", "risk_tier": "high", "description": "Automated CV ranking for job candidates"},
    {"name": "Credit Scoring AI", "risk_tier": "high", "description": "Loan approval recommendation system"},
]

for system in high_risk_systems:
    result = run_compliance_assessment(system)
    print(f"✅ Assessment complete for {result['system']}")
    # Audit trail stored in Langfuse — retrievable for EU AI Act audits
```

**Urgencia:** Deadline Aug 2, 2026 (25 días). Proyectos iniciados hoy llegan justo.
**Tiempo estimado:** 4–8 semanas | **Deal size:** $150k–$800k

---

## Patrón 6: Enterprise DevOps Automation con OpenHands + LangGraph
**Caso de uso:** Engineering team que quiere automatizar: code review, legacy refactoring, test generation, y bug triage — usando OpenHands (72% SWE-bench) orquestado por LangGraph.

**Stack:**
- [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) (MIT) — coding agent engine
- [OpenHands/software-agent-sdk](https://github.com/OpenHands/software-agent-sdk) (MIT) — production SDK
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) (MIT) — orquestación multi-agent

```python
# devops_orchestrator.py
from langgraph.graph import StateGraph, MessagesState, START, END
from langgraph.checkpoint.memory import MemorySaver
import anthropic

client = anthropic.Anthropic()

def triage_agent(state: MessagesState):
    """Classifies incoming GitHub issue/PR"""
    response = client.messages.create(
        model="claude-haiku-4-5",  # Económico para clasificación
        max_tokens=512,
        messages=state["messages"],
        system="Classify this GitHub issue: bug/feature/refactor/test. Return JSON."
    )
    return {"messages": [response]}

def code_review_agent(state: MessagesState):
    """Runs OpenHands code review on PR diff"""
    # OpenHands SDK: run review task
    from openhands_sdk import OpenHandsAgent
    agent = OpenHandsAgent(model="claude-sonnet-5")
    diff = state["messages"][-1].content
    review = agent.run(f"Review this PR diff for bugs, security issues, and style:\n{diff}")
    return {"messages": [{"role": "assistant", "content": review}]}

def fix_agent(state: MessagesState):
    """OpenHands autonomous bug fix (SWE-bench 72%)"""
    from openhands_sdk import OpenHandsAgent
    agent = OpenHandsAgent(model="claude-sonnet-5")
    issue = state["messages"][-1].content
    fix = agent.run(f"Fix this bug autonomously:\n{issue}", workspace="/tmp/repo")
    return {"messages": [{"role": "assistant", "content": fix}]}

# Workflow: triage → route → review/fix
graph = StateGraph(MessagesState)
graph.add_node("triage", triage_agent)
graph.add_node("code_review", code_review_agent)
graph.add_node("fix", fix_agent)
graph.add_edge(START, "triage")

def route_by_type(state):
    last = state["messages"][-1].content
    if "bug" in last.lower(): return "fix"
    return "code_review"

graph.add_conditional_edges("triage", route_by_type, {"fix": "fix", "code_review": "code_review"})
graph.add_edge("code_review", END)
graph.add_edge("fix", END)

app = graph.compile(checkpointer=MemorySaver())
```

**Tiempo estimado:** 6–10 semanas | **Deal size:** $200k–$800k

---

## Patrón 7: LATAM LGPD Self-Hosted Stack (Brasil / Argentina)
**Caso de uso:** Empresa LATAM con restricciones LGPD (Brasil) o privacidad de datos que necesita stack enterprise AI 100% self-hosted, sin datos saliendo del país.

**Stack:**
- [ollama/ollama](https://github.com/ollama/ollama) (MIT) — LLM self-hosted
- [langgenius/dify](https://github.com/langgenius/dify) (Apache-2.0) — visual builder
- [keycloak/keycloak](https://github.com/keycloak/keycloak) (Apache-2.0) — AuthN/AuthZ
- [langfuse/langfuse](https://github.com/langfuse/langfuse) (MIT) — observabilidad self-hosted

```yaml
# docker-compose.latam-lgpd.yml
version: "3.8"
services:
  # LLM local (Brasil: datos no salen del país)
  ollama:
    image: ollama/ollama:latest
    volumes:
      - ollama_models:/root/.ollama
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
  
  # Modelo: llama3.2 o mistral para tasks simples; qwen2.5:72b para tareas complejas
  ollama-init:
    image: ollama/ollama:latest
    command: pull llama3.2:latest
    depends_on: [ollama]
  
  # Visual builder: Dify con Ollama como provider
  dify-api:
    image: langgenius/dify-api:latest
    environment:
      OLLAMA_API_BASE: http://ollama:11434
      DATABASE_URL: postgresql://dify:${DB_PASS}@postgres/dify
      # NO OpenAI/Anthropic API keys — todo self-hosted
  
  # Auth empresarial
  keycloak:
    image: quay.io/keycloak/keycloak:latest
    command: start-dev
    environment:
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: ${KC_PASS}
    ports:
      - "8080:8080"
  
  # Observabilidad self-hosted (audit trail LGPD)
  langfuse:
    image: langfuse/langfuse:latest
    environment:
      DATABASE_URL: postgresql://langfuse:${LF_PASS}@postgres/langfuse
      NEXTAUTH_SECRET: ${NEXTAUTH_SECRET}
      NEXTAUTH_URL: http://localhost:3001
    ports:
      - "3001:3000"
  
  postgres:
    image: postgres:15
    environment:
      POSTGRES_MULTIPLE_DATABASES: dify,langfuse
      POSTGRES_PASSWORD: ${DB_PASS}
  
  redis:
    image: redis:7-alpine

volumes:
  ollama_models:
```

```bash
# Deploy en servidor Brasil (AWS São Paulo, AWS Brasil, Azure Brazil South)
docker compose -f docker-compose.latam-lgpd.yml up -d

# Verificar compliance LGPD:
# ✅ LLM self-hosted (Ollama) — datos no salen
# ✅ Dify self-hosted — workflows en local  
# ✅ Keycloak — AuthN/AuthZ enterprise
# ✅ Langfuse — audit trail local
# ✅ PostgreSQL — datos en Brasil
```

**Tiempo estimado:** 4–8 semanas | **Deal size:** $80k–$350k

---

## Patrón 8: n8n Workflow + Claude para Ops Automation Enterprise
**Caso de uso:** Equipo de Operations que quiere automatizar procesos cross-sistemas sin escribir código: email processing, invoice extraction, report generation, Slack alerts.

**Stack:**
- [n8n-io/n8n](https://github.com/n8n-io/n8n) (Sustainable Use) — workflow automation
- Claude Haiku 4.5 — modelo económico para tasks simples
- MCP tools de n8n — Google Workspace, Slack, Jira, PostgreSQL, etc.

```javascript
// n8n workflow: Invoice Processing with Claude
// Importar en n8n UI o usar API

const invoiceWorkflow = {
  "name": "AI Invoice Processor",
  "nodes": [
    {
      "name": "Email Trigger",
      "type": "n8n-nodes-base.emailReadImap",
      "parameters": {
        "mailbox": "invoices@company.com",
        "format": "resolved"
      }
    },
    {
      "name": "Extract PDF",
      "type": "n8n-nodes-base.extractFromFile",
      "parameters": {"operation": "pdf"}
    },
    {
      "name": "Claude Extract Data",
      "type": "@n8n/n8n-nodes-langchain.lmChatAnthropic",
      "parameters": {
        "model": "claude-haiku-4-5",  // Económico para extracción
        "prompt": `Extract invoice data as JSON:
          - invoice_number
          - vendor_name  
          - amount
          - currency
          - date
          - line_items
          
          Invoice text: {{$json.text}}`
      }
    },
    {
      "name": "Save to ERP",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "url": "http://erpnext:8069/api/method/erpnext.accounts.doctype.purchase_invoice.purchase_invoice.make_purchase_invoice",
        "method": "POST",
        "body": "={{ $json }}"
      }
    },
    {
      "name": "Notify Slack",
      "type": "n8n-nodes-base.slack",
      "parameters": {
        "text": "✅ Invoice {{$json.invoice_number}} from {{$json.vendor_name}} processed: {{$json.currency}} {{$json.amount}}"
      }
    }
  ]
}
```

**Tiempo estimado:** 2–4 semanas | **Deal size:** $30k–$150k

---

## Patrón 9: Microsoft Agent Framework + Semantic Kernel (.NET Enterprise)
**Caso de uso:** Cliente enterprise con stack .NET/Azure que quiere agentes multi-step usando el framework oficial de Microsoft (MAF 1.0 GA Apr 3, 2026).

**Stack:**
- [ag2ai/ag2](https://github.com/ag2ai/ag2) (Apache-2.0) — AG2/AutoGen base
- [microsoft/semantic-kernel](https://github.com/microsoft/semantic-kernel) (MIT) — enterprise features
- Claude Sonnet 5 — modelo (SK tiene soporte nativo Anthropic)

```csharp
// Microsoft Agent Framework 1.0 + Claude
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using Anthropic.SDK;

// Configurar Semantic Kernel con Claude
var builder = Kernel.CreateBuilder();
builder.AddAnthropicChatCompletion(
    modelId: "claude-sonnet-5",
    apiKey: Environment.GetEnvironmentVariable("ANTHROPIC_API_KEY")
);

// Añadir plugins enterprise
builder.Plugins.AddFromType<ERP_Plugin>();
builder.Plugins.AddFromType<CRM_Plugin>();
builder.Plugins.AddFromType<HR_Plugin>();

var kernel = builder.Build();

// Crear agente enterprise con MAF 1.0
var agent = new ChatCompletionAgent
{
    Name = "EnterpriseAssistant",
    Instructions = @"You are an enterprise AI assistant with access to ERP, CRM, and HR systems.
                    Always use HITL for financial decisions > $10,000.
                    All decisions are logged to Langfuse for EU AI Act compliance.",
    Kernel = kernel,
    ExecutionSettings = new AnthropicPromptExecutionSettings
    {
        MaxTokens = 4096,
        Temperature = 0.1
    }
};

// Grupo conversacional multi-agent (MAF 1.0 pattern)
var groupChat = new AgentGroupChat(agent)
{
    ExecutionSettings = new AgentGroupChatSettings
    {
        SelectionStrategy = new KernelFunctionSelectionStrategy(kernel),
        TerminationStrategy = new KernelFunctionTerminationStrategy(kernel)
    }
};

await foreach (var message in groupChat.InvokeAsync())
{
    Console.WriteLine($"[{message.Role}]: {message.Content}");
}
```

**Tiempo estimado:** 6–12 semanas | **Deal size:** $200k–$1M

---

## Patrón 10: Agentic Analytics sobre OpenMetadata + Langfuse + Superset
**Caso de uso:** Enterprise CDO que quiere un agente que responda preguntas analíticas complejas sobre datos corporativos, con audit trail completo para governance.

**Stack:**
- [open-metadata/OpenMetadata](https://github.com/open-metadata/OpenMetadata) (Apache-2.0) — data catalog
- [apache/superset](https://github.com/apache/superset) (Apache-2.0) — analytics/dashboards
- [langfuse/langfuse](https://github.com/langfuse/langfuse) (MIT) — LLM audit trail
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) (MIT) — orquestación

```python
# analytics_agent.py — Data analyst AI con governance
from langgraph.graph import StateGraph, MessagesState, START, END
from langfuse import Langfuse
import anthropic, requests, json

langfuse = Langfuse()  # self-hosted
client = anthropic.Anthropic()

def search_catalog(query: str) -> list:
    """Search OpenMetadata for relevant datasets"""
    resp = requests.get(
        f"{OPENMETADATA_URL}/api/v1/search/query",
        params={"q": query, "index": "table_search_index"},
        headers={"Authorization": f"Bearer {OM_TOKEN}"}
    )
    hits = resp.json().get("hits", {}).get("hits", [])
    return [{"name": h["_source"]["name"], "description": h["_source"].get("description")} 
            for h in hits[:5]]

def run_superset_query(sql: str, datasource_id: int) -> dict:
    """Execute SQL via Superset API"""
    resp = requests.post(
        f"{SUPERSET_URL}/api/v1/sqllab/execute/",
        json={"sql": sql, "database_id": datasource_id},
        headers={"Authorization": f"Bearer {SUPERSET_TOKEN}"}
    )
    return resp.json()

def analytics_agent_node(state: MessagesState):
    with langfuse.trace(name="enterprise-analytics-query") as trace:
        trace.input = state["messages"][-1]["content"]
        
        response = client.messages.create(
            model="claude-sonnet-5",
            max_tokens=4096,
            tools=[
                {
                    "name": "search_catalog",
                    "description": "Search OpenMetadata data catalog for relevant datasets",
                    "input_schema": {"type": "object", "properties": {
                        "query": {"type": "string", "description": "Search query"}
                    }, "required": ["query"]}
                },
                {
                    "name": "run_sql",
                    "description": "Execute SQL query via Superset",
                    "input_schema": {"type": "object", "properties": {
                        "sql": {"type": "string"},
                        "datasource_id": {"type": "integer"}
                    }, "required": ["sql", "datasource_id"]}
                }
            ],
            messages=state["messages"],
            system="You are a data analyst. Use search_catalog to find datasets, then run_sql to query them. Always cite the dataset name and owner from the catalog."
        )
        trace.output = response.content[0].text if response.stop_reason == "end_turn" else "[tool_use]"
    
    return {"messages": [response]}

graph = StateGraph(MessagesState)
graph.add_node("analytics", analytics_agent_node)
graph.set_entry_point("analytics")
app = graph.compile()

# Ejemplo: Business question → SQL → resultado
result = app.invoke({"messages": [
    {"role": "user", "content": "¿Cuál fue el revenue por región en Q2 2026 comparado con Q2 2025?"}
]})
```

**Tiempo estimado:** 8–12 semanas | **Deal size:** $200k–$900k

---

## Patrón 11: Twenty CRM + Claude vía MCP Nativo
**Caso de uso:** Equipo de ventas o customer success que quiere interactuar con su CRM en lenguaje natural: consultar pipeline, actualizar deals, crear contactos, generar reportes — directamente desde Claude o cualquier agente AI.

**Stack:**
- [twentyhq/twenty](https://github.com/twentyhq/twenty) (AGPL-3.0, 45.5k ★) — CRM moderno open source
- [mhenry3164/twenty-crm-mcp-server](https://github.com/mhenry3164/twenty-crm-mcp-server) (MIT) — MCP server para self-hosted
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) (MIT) — orquestación
- Claude Sonnet 5 — modelo

```python
# Opción A: Twenty Cloud (MCP server nativo incluido)
# En Claude Desktop: Settings → MCP Servers → Twenty
# URL: https://api.twenty.com/mcp/{workspace_id}
# Autenticación: Twenty API key

# Opción B: Twenty self-hosted + twenty-crm-mcp-server
# pip install twenty-crm-mcp-server

import anthropic
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def twenty_crm_agent(user_query: str):
    """Agent con acceso nativo a Twenty CRM vía MCP"""
    client = anthropic.Anthropic()
    
    server_params = StdioServerParameters(
        command="twenty-mcp-server",
        env={
            "TWENTY_API_URL": "http://localhost:3000/api",
            "TWENTY_API_KEY": "your-api-key"
        }
    )
    
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            
            # Listar tools disponibles del MCP server
            tools = await session.list_tools()
            mcp_tools = [
                {
                    "name": t.name,
                    "description": t.description,
                    "input_schema": t.inputSchema
                }
                for t in tools.tools
            ]
            
            # Claude con acceso completo a CRM via MCP
            response = client.messages.create(
                model="claude-sonnet-5",
                max_tokens=4096,
                tools=mcp_tools,
                messages=[{"role": "user", "content": user_query}],
                system="""You are a CRM expert. Use Twenty CRM tools to:
                - Query and update deals, contacts, companies
                - Track pipeline stages and activities
                - Generate sales reports and forecasts
                Always confirm before creating or deleting records."""
            )
            
            return response

# Ejemplos de queries en lenguaje natural:
queries = [
    "¿Qué deals en pipeline tienen valor > $50k y lleven más de 30 días sin actividad?",
    "Crea una nota de seguimiento para Empresa XYZ: 'Reunión programada para el 15-Jul'",
    "Muestra el forecast de ventas de este trimestre por owner",
    "¿Cuáles son los top 5 clientes por revenue en los últimos 90 días?",
]

# LangGraph wrapper para workflow multi-step
from langgraph.graph import StateGraph, MessagesState
from langfuse import Langfuse

langfuse = Langfuse()  # Audit trail para compliance

def crm_agent_node(state: MessagesState):
    with langfuse.trace(name="twenty-crm-agent") as trace:
        result = asyncio.run(twenty_crm_agent(state["messages"][-1]["content"]))
        trace.output = result.content[0].text if result.content else ""
    return {"messages": [result]}
```

**Ventajas vs Salesforce:**
- Self-hosted: datos en tus servidores (LGPD/GDPR compliant)
- MCP nativo: Claude accede directo sin middleware custom
- 45.5k ★ creciendo: comunidad activa + Y Combinator backed
- AGPL-3.0: revisar con legal si hay redistribución comercial

**Tiempo estimado:** 2–4 semanas | **Deal size:** $50k–$250k

---

## Matriz de selección de patrón

| Si el cliente tiene... | Y necesita... | Recomienda Patrón |
|------------------------|---------------|-------------------|
| ERPNext/Frappe existente | Chat con su ERP | P1 (MCP sobre ERPNext) |
| Domain experts no-devs | Construir agentes rápido | P2 (Dify Visual Builder) |
| Salesforce/CRM + equipo ventas | Sales intelligence | P3 (CrewAI + CRM) |
| Data warehouse + preguntas de negocio | Analytics conversacional | P10 (OpenMetadata + Superset) |
| Regulación LGPD/datos sensibles LATAM | Stack self-hosted | P7 (LGPD Stack) |
| EU AI Act Annex III compliance urgente | Audit trail + governance | P5 (EU AI Act Agent) |
| Operaciones manuales y repetitivas | Automatización ops | P8 (n8n + Claude) |
| Legacy code / deuda técnica | Coding automation | P6 (OpenHands + LangGraph) |
| Stack Microsoft/.NET | Enterprise agents | P9 (MAF + SK) |
| Cualquier ERP legacy | Data intelligence | P4 (OpenMetadata) |
| CRM moderno + equipo ventas | AI sobre CRM en lenguaje natural | P11 (Twenty CRM + MCP) |

---
*Ver también: `agents/top.md` para detalles de cada framework y `verticals/solutions.md` para plataformas base.*
