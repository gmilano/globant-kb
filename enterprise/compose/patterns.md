# Composition Patterns — Enterprise AI

> Concrete recipes: which repos, which agents, how to wire them, estimated effort.
> All patterns use only MIT/Apache/AGPL-licensed components.
> Last updated: 2026-07-08

## Architecture Stack (Reference)

```
┌─────────────────────────────────────────────────────────┐
│  ENTERPRISE SYSTEMS LAYER (ERP / CRM / ITSM / HR)       │
│  Odoo · ERPNext · Twenty · SuiteCRM · GLPI · Frappe HR  │
└──────────────────────┬──────────────────────────────────┘
                       │ REST / MCP / Webhooks
┌──────────────────────▼──────────────────────────────────┐
│  ORCHESTRATION LAYER                                     │
│  n8n (automation glue) · LangGraph (stateful agents)    │
│  Microsoft Agent Framework (enterprise .NET/Python)      │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│  AI / KNOWLEDGE LAYER                                    │
│  Dify (GenAI platform) · RAGFlow (document RAG)         │
│  Flowise (visual LLM flows) · Smolagents (code agents)  │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│  LLM LAYER                                              │
│  Claude (Anthropic API) · Ollama (local/private)        │
│  Azure OpenAI · Groq (for speed-critical tasks)         │
└─────────────────────────────────────────────────────────┘
```

---

## Pattern 1: Enterprise Knowledge Base Copilot

**Goal**: Give employees a chat interface to query all company documents (policies, contracts, SOPs, product manuals) with source citations.

**Stack**:
- **RAGFlow** (github.com/infiniflow/ragflow, Apache-2.0) — document ingestion, chunking, retrieval
- **Dify** (github.com/langgenius/dify, Apache-2.0) — chat UI and agent orchestration
- **Mattermost** (github.com/mattermost/mattermost, AGPL-3.0) — enterprise chat channel integration
- **LLM**: Claude 3.5 Sonnet via Anthropic API (or Ollama + Llama 3 for air-gapped)

**Architecture**:
```python
# 1. Ingest all company documents into RAGFlow
ragflow_client.upload(docs=[pdfs, word_docs, excels])
ragflow_client.parse_all()  # Deep PDF table extraction

# 2. Configure Dify agent to call RAGFlow knowledge base
dify_agent = DifyAgent(
    knowledge_base=ragflow_kb_id,
    llm="claude-3-5-sonnet",
    system_prompt="""You are the company knowledge assistant.
    Always cite the source document and page number.
    If you're unsure, say so — never hallucinate."""
)

# 3. Expose via Mattermost bot
@mattermost_bot.on_mention
def handle_query(message):
    response = dify_agent.chat(message.text)
    return f"{response.answer}\n\nSources: {response.citations}"
```

**Customization**:
- Add SharePoint/Google Drive ingest via RAGFlow connectors
- Add BigQuery ingest for analytics Q&A (RAGFlow July 2026 feature)
- Multi-language: configure RAGFlow with Spanish/Portuguese embedding model
- Add LangFuse for audit trail (compliance)

**Effort**: 3–5 weeks | **Team**: 1 BE + 1 DevOps
**LATAM Note**: Use Maritaca AI (sabiá-3) as local Portuguese LLM for Brazil data-residency clients.

---

## Pattern 2: Agentic CRM — AI-Driven Sales Automation

**Goal**: AI agent monitors deal pipeline, drafts follow-up emails, schedules meetings, and updates CRM records — reducing manual CRM hygiene by 70%.

**Stack**:
- **Twenty CRM** (github.com/twentyhq/twenty, AGPL-3.0) — CRM with native MCP server
- **CrewAI** (github.com/crewAIInc/crewAI, MIT) — multi-agent orchestration
- **n8n** (github.com/n8n-io/n8n, AGPL-3.0) — automation triggers and scheduling
- **LLM**: Claude 3.5 Sonnet (reasoning) + Groq/Llama (email drafting speed)

**Architecture**:
```python
from crewai import Agent, Task, Crew

# Define specialized agents
deal_analyst = Agent(
    role="Deal Analyst",
    goal="Identify deals at risk of stagnation in Twenty CRM",
    tools=[twenty_mcp_client],  # MCP server exposes CRM as tools
    llm="claude-3-5-sonnet"
)

email_drafter = Agent(
    role="Sales Email Writer",
    goal="Draft personalized follow-up emails for stale deals",
    llm="groq/llama-3-70b"  # Fast, cost-effective for generation
)

crm_updater = Agent(
    role="CRM Administrator",
    goal="Update opportunity stages and next actions in Twenty CRM",
    tools=[twenty_mcp_client]
)

# Crew orchestrates the pipeline
crew = Crew(
    agents=[deal_analyst, email_drafter, crm_updater],
    tasks=[analyze_pipeline, draft_emails, update_crm],
    process="sequential"
)

# n8n triggers this crew every Monday 8am
crew.kickoff()
```

**n8n Trigger Workflow**:
- Schedule: Monday 8am → CrewAI webhook
- Email sent → Twenty CRM activity logged via API
- Reply received → sentiment analysis → update deal probability

**Effort**: 4–6 weeks | **Team**: 1 BE + 1 AI engineer
**Expected ROI**: 3–5 hours/week saved per sales rep × team size

---

## Pattern 3: Intelligent ERP Operations Agent

**Goal**: AI agent handles routine ERP operations via natural language — "Create a purchase order for 100 units of SKU-4521 from Supplier ACME" executes directly in ERPNext.

**Stack**:
- **ERPNext + Frappe** (github.com/frappe/erpnext, GPL-3.0) — ERP system
- **ERPNext MCP Server** (github.com/rakeshgangwar/erpnext-mcp-server, MIT) — exposes ERP as MCP tools
- **Microsoft Agent Framework** (github.com/microsoft/agent-framework, MIT) — agent orchestration (.NET or Python)
- **Dify** — chat interface for non-technical users

**Architecture**:
```python
# ERPNext MCP Server exposes 40+ ERP operations as tools
# MAF agent uses these tools to operate ERP

from microsoft_agent_framework import Agent, MCPToolProvider

erp_tools = MCPToolProvider(
    server_url="http://erpnext-mcp:3000",
    capabilities=["sales_order", "purchase_order", "invoice", 
                  "inventory", "customer", "supplier", "payroll"]
)

erp_agent = Agent(
    name="ERP Operations Agent",
    tools=[erp_tools],
    system_prompt="""You are an ERP assistant for {company_name}.
    You can create and update sales orders, purchase orders, invoices,
    and inventory transfers. Always confirm before executing any action
    that modifies financial data. Show the user what you're about to do.""",
    llm="claude-3-5-sonnet",
    human_in_loop=True  # Confirm before writes
)

# Dify wraps this agent in a web chat UI
# Users: procurement team, warehouse managers, finance staff
```

**Guardrails**:
- Human-in-the-loop for all financial write operations
- LangFuse logging for audit trail
- Role-based access: agent respects ERPNext user permissions

**Effort**: 5–8 weeks | **Team**: 1 BE + 1 ERPNext specialist + 1 AI engineer
**LATAM Note**: ERPNext used extensively in Brazil/Mexico/Argentina — high demand for this pattern.

---

## Pattern 4: AI-Augmented ITSM — Intelligent Ticket Routing

**Goal**: Automatically classify incoming support tickets, suggest KB articles, route to correct team, and auto-resolve simple issues — reducing MTTR by 40%.

**Stack**:
- **GLPI** (github.com/glpi-project/glpi, GPL-3.0) — ITSM platform
- **RAGFlow** (github.com/infiniflow/ragflow, Apache-2.0) — knowledge base of past tickets + runbooks
- **LangGraph** (github.com/langchain-ai/langgraph, MIT) — stateful routing agent
- **n8n** — webhook bridge between GLPI and AI layer

**Architecture**:
```python
from langgraph.graph import StateGraph, END
from typing import TypedDict

class TicketState(TypedDict):
    ticket_id: str
    title: str
    description: str
    category: str
    kb_articles: list
    recommended_team: str
    auto_resolve: bool

# LangGraph routing workflow
workflow = StateGraph(TicketState)

def classify_ticket(state: TicketState):
    """LLM classifies ticket category and urgency"""
    classification = llm.invoke(f"""
    Classify this IT ticket:
    Title: {state['title']}
    Description: {state['description']}
    
    Categories: Network, Hardware, Software, Security, Access, Other
    Urgency: Critical, High, Medium, Low
    Output JSON only.
    """)
    return {"category": classification["category"]}

def search_knowledge_base(state: TicketState):
    """RAGFlow retrieves relevant KB articles and past ticket resolutions"""
    results = ragflow.search(
        query=f"{state['title']} {state['description']}",
        knowledge_base="itsm-kb",
        top_k=5
    )
    return {"kb_articles": results}

def route_and_respond(state: TicketState):
    """Route to team and optionally auto-resolve"""
    # Simple issues: auto-resolve with KB article
    if state["category"] == "Access" and "password reset" in state["description"].lower():
        glpi_api.update_ticket(state["ticket_id"], {
            "status": "solved",
            "solution": kb_articles[0]["content"],
            "assigned_team": "Self-Service"
        })
        return {"auto_resolve": True}
    
    # Complex issues: route to correct team
    team_mapping = {"Network": "NetOps", "Security": "SecOps", "Software": "AppSupport"}
    glpi_api.assign_ticket(state["ticket_id"], team_mapping[state["category"]])
    return {"auto_resolve": False}

workflow.add_node("classify", classify_ticket)
workflow.add_node("search_kb", search_knowledge_base)
workflow.add_node("route", route_and_respond)
workflow.add_edge("classify", "search_kb")
workflow.add_edge("search_kb", "route")
workflow.add_edge("route", END)

# n8n webhook: GLPI new ticket → POST to LangGraph API → LangGraph updates GLPI
```

**Effort**: 4–6 weeks | **Team**: 1 BE + 1 AI engineer
**Expected impact**: 35–40% reduction in ticket routing time; 20–30% auto-resolution rate for Tier 1.

---

## Pattern 5: HR Onboarding & Payroll Automation

**Goal**: Automate new employee onboarding workflows and payroll anomaly detection using AI agents connected to Frappe HR.

**Stack**:
- **Frappe HR** (github.com/frappe/hrms, GPL-3.0) — HR and payroll system
- **n8n** (github.com/n8n-io/n8n, AGPL-3.0) — workflow automation and scheduling
- **Dify** (github.com/langgenius/dify, Apache-2.0) — AI workflows for resume screening and payroll Q&A
- **CrewAI** (github.com/crewAIInc/crewAI, MIT) — multi-agent for complex onboarding sequences

**Architecture**:

```python
# Onboarding Agent Crew
from crewai import Agent, Task, Crew

recruiter_agent = Agent(
    role="Recruiter Assistant",
    goal="Screen resumes against job requirements and rank top 5 candidates",
    tools=[document_reader, frappe_hr_api],
    llm="claude-3-5-sonnet"
)

onboarding_agent = Agent(
    role="Onboarding Coordinator",
    goal="Create employee record, schedule orientation, assign equipment",
    tools=[frappe_hr_api, calendar_api, slack_notifier],
    llm="claude-3-5-sonnet"
)

payroll_auditor = Agent(
    role="Payroll Anomaly Detector",
    goal="Flag payroll entries that deviate >20% from historical average",
    tools=[frappe_hr_api, analytics_query_tool],
    llm="claude-3-5-sonnet"
)

# n8n Triggers:
# - New job application → recruiter_agent screens → Frappe HR updates status
# - Offer accepted → onboarding_agent creates employee + schedules tasks
# - Payroll run → payroll_auditor checks all entries → flags anomalies
```

**n8n Workflow Nodes**:
1. `Frappe HR Webhook` (new application) → `Dify Resume Scorer` → `Frappe HR Update`
2. `Cron (monthly)` → `Frappe HR Get Payroll Entries` → `CrewAI Payroll Audit` → `Email Flagged Items`
3. `Offer Letter Signed` → `CrewAI Onboarding Crew` → `Slack Welcome` + `IT Ticket` + `HR Record`

**Effort**: 5–7 weeks | **Team**: 1 BE + 1 AI engineer + 1 Frappe specialist
**Expected impact**: 60% reduction in onboarding admin time; catch 90%+ of payroll data entry errors before run.

---

## Pattern 6: AI Analytics Copilot (Metabase + LLM)

**Goal**: Business users ask data questions in plain language and get charts, SQL, and insights — no BI analyst required for routine reporting.

**Stack**:
- **Metabase** (github.com/metabase/metabase, AGPL-3.0) — BI platform with NL query
- **Dify** (github.com/langgenius/dify, Apache-2.0) — agent workflow for multi-step analytics
- **RAGFlow** — knowledge base of metric definitions, KPI descriptions, and data dictionary
- **LLM**: Claude 3.5 Sonnet (complex reasoning) + fast model for SQL generation

**Architecture**:
```python
# Dify workflow for business analytics copilot
# Step 1: User asks question in chat
# Step 2: RAGFlow retrieves metric definitions and table schemas
# Step 3: LLM generates Metabase question (SQL + visualization config)
# Step 4: Metabase API creates the question and returns embed URL
# Step 5: Agent returns answer + embedded chart in chat

def analytics_agent_workflow(user_question: str) -> dict:
    # Retrieve data dictionary context
    context = ragflow.search(user_question, kb="data-dictionary")
    
    # Generate Metabase question config
    metabase_config = llm.invoke(f"""
    Given this data dictionary: {context}
    Generate a Metabase API query config for: {user_question}
    Return: database_id, sql, visualization_type, chart_config
    """)
    
    # Create question in Metabase
    question = metabase_api.create_question(metabase_config)
    
    # Return answer + embed URL
    return {
        "answer": llm.invoke(f"Summarize this data in 2 sentences: {question.data}"),
        "chart_url": question.embed_url,
        "sql": question.sql
    }
```

**Effort**: 3–5 weeks | **Team**: 1 BE + 1 data engineer
**Expected impact**: Self-service analytics for 80% of routine business questions; 5–10 hours/week saved per business analyst.

---

## Quickstart: Deploy the Full Stack in 1 Day

```bash
# 1. Start RAGFlow (document knowledge base)
docker compose -f ragflow/docker-compose.yml up -d

# 2. Start Dify (GenAI platform + chat UI)
docker compose -f dify/docker-compose.yml up -d

# 3. Start n8n (workflow automation)
docker run -d --name n8n -p 5678:5678 n8nio/n8n

# 4. Start ERPNext (ERP, optional)
bench init erp-bench && cd erp-bench
bench get-app erpnext && bench new-site demo.local
bench start

# 5. Configure Dify to use RAGFlow knowledge base
# → Dify UI > Knowledge > Add RAGFlow datasource

# 6. Install ERPNext MCP server (ERP AI bridge)
npm install -g erpnext-mcp-server
erpnext-mcp start --url http://erp:8000 --api-key $ERP_API_KEY

# 7. Connect n8n to all services
# → n8n UI > Credentials > Add Dify, ERPNext, GLPI credentials
```

---

## Pattern 7: EU AI Act Compliance Agent (⚠️ Deadline Aug 2, 2026)

**Goal**: Automated AI governance — classify AI systems by risk level, generate compliance documentation, create audit trails before the August 2 EU AI Act deadline.

**Stack**:
- **OpenMetadata** (github.com/open-metadata/OpenMetadata, Apache-2.0) — AI system registry + lineage
- **LangGraph** (github.com/langchain-ai/langgraph, MIT) — compliance assessment workflow
- **LangFuse** (github.com/langfuse/langfuse, MIT) — audit trails and decision logging
- **Open Policy Agent** (github.com/open-policy-agent/opa, Apache-2.0) — policy enforcement
- **Claude claude-sonnet-5** — risk assessment reasoning

**Architecture**:
```python
from langgraph.graph import StateGraph, END
from langchain_anthropic import ChatAnthropic
from typing import TypedDict, List

class ComplianceState(TypedDict):
    system_name: str
    description: str
    use_case: str
    processes_eu_data: bool
    risk_level: str          # UNACCEPTABLE/HIGH/LIMITED/MINIMAL
    required_controls: List[str]
    documentation: dict
    gaps: List[str]

llm = ChatAnthropic(model="claude-sonnet-5")

EU_AI_ACT_CLASSIFIER = """
Classify this AI system under EU AI Act risk categories:

System: {system_name}
Description: {description}  
Use case: {use_case}

UNACCEPTABLE: real-time biometric in public, social scoring, manipulation of vulnerable groups
HIGH: HR/recruitment, credit scoring, law enforcement, critical infrastructure, education assessment
LIMITED: chatbots, emotion recognition (transparency required)
MINIMAL: spam filters, AI games, recommendation systems

Required controls by level:
- HIGH: conformity assessment, technical documentation, human oversight, incident reporting, registration in EU database
- LIMITED: disclosure to users that they're interacting with AI
- MINIMAL: voluntary codes of conduct

Respond as JSON: {{"risk_level": "...", "required_controls": [...], "documentation_needed": [...]}}
"""

def classify_risk(state: ComplianceState) -> ComplianceState:
    response = llm.invoke(EU_AI_ACT_CLASSIFIER.format(**state))
    import json
    data = json.loads(response.content)
    state["risk_level"] = data["risk_level"]
    state["required_controls"] = data["required_controls"]
    state["documentation"] = {"needed": data["documentation_needed"]}
    return state

def audit_current_state(state: ComplianceState) -> ComplianceState:
    gaps = []
    if "human_oversight" in state["required_controls"]:
        gaps.append("No human-in-the-loop mechanism documented")
    if "technical_documentation" in state["required_controls"]:
        gaps.append("Model card and training data provenance not available")
    if "incident_reporting" in state["required_controls"]:
        gaps.append("No incident reporting workflow configured")
    state["gaps"] = gaps
    return state

graph = StateGraph(ComplianceState)
graph.add_node("classify", classify_risk)
graph.add_node("audit", audit_current_state)
graph.add_edge("classify", "audit")
graph.add_edge("audit", END)
graph.set_entry_point("classify")
compliance_app = graph.compile()

# Run for each AI system
systems = [
    {"system_name": "Loan Approval Agent", "use_case": "credit_scoring", "processes_eu_data": True},
    {"system_name": "HR Resume Screener", "use_case": "recruitment", "processes_eu_data": True},
    {"system_name": "Customer Support Bot", "use_case": "chatbot", "processes_eu_data": True},
]
for system in systems:
    result = compliance_app.invoke(system)
    print(f"{system['system_name']}: {result['risk_level']} — {len(result['gaps'])} gaps")
```

**Effort**: 2–3 weeks | Globant package: AI Act Compliance Sprint
**LATAM note**: Add LGPD checks for Brazil — personal data processing by AI agents requires legal basis documentation

---

## Pattern 8: LATAM LGPD-Compliant Self-Hosted AI Stack

**Goal**: Full on-premise enterprise AI for regulated LATAM clients (Brazil LGPD, Argentina Ley de Datos). Zero data egress — all LLM processing stays within client network.

**Stack**:
- **Ollama** (github.com/ollama/ollama, MIT) — local LLM (Llama 3.1 70B or Qwen2.5 72B)
- **Dify self-hosted** (github.com/langgenius/dify, Apache-2.0) — agentic platform
- **pgvector** (github.com/pgvector/pgvector, MIT) — vector store in PostgreSQL
- **ERPNext** (github.com/frappe/erpnext, GPL-3.0) — on-premise ERP
- **Rocket.Chat** (github.com/RocketChat/Rocket.Chat, MIT) — self-hosted messaging
- **Keycloak** (github.com/keycloak/keycloak, Apache-2.0) — identity/SSO

**Docker Compose**:
```yaml
version: "3.9"
services:
  ollama:
    image: ollama/ollama:latest
    volumes: [ollama_data:/root/.ollama]
    ports: ["11434:11434"]
    environment:
      - OLLAMA_KEEP_ALIVE=24h
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              capabilities: [gpu]

  dify-api:
    image: langgenius/dify-api:latest
    environment:
      - SECRET_KEY=${SECRET_KEY}
      - OPENAI_API_BASE=http://ollama:11434/v1
      - OPENAI_API_KEY=ollama
      - DATABASE_URL=postgresql://dify:${DB_PASS}@postgres/dify
      - REDIS_URL=redis://redis:6379/0
    depends_on: [postgres, redis, ollama]

  dify-web:
    image: langgenius/dify-web:latest
    environment:
      - NEXT_PUBLIC_API_PREFIX=http://dify-api:5001/v1

  postgres:
    image: pgvector/pgvector:pg16
    environment:
      POSTGRES_PASSWORD: ${DB_PASS}
    volumes: [pg_data:/var/lib/postgresql/data]

  redis:
    image: redis:7-alpine

  keycloak:
    image: quay.io/keycloak/keycloak:latest
    command: start-dev
    environment:
      KC_DB: postgres
      KC_DB_URL: jdbc:postgresql://postgres/keycloak
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: ${KC_PASS}

volumes:
  ollama_data:
  pg_data:
```

**Model pull on first run**:
```bash
docker exec ollama ollama pull llama3.1:70b    # Portuguese/Spanish capable
docker exec ollama ollama pull nomic-embed-text  # Embeddings for RAG
```

**LGPD Checklist**:
- [x] All processing on-premise (no external API calls)
- [x] Audit logs in local PostgreSQL with 5-year retention
- [x] Keycloak RBAC ensures only authorized personnel access AI outputs
- [x] Data subject rights handled via ERPNext contacts module
- [ ] Data Protection Officer (DPO) documentation required
- [ ] ROPA (Records of Processing Activities) to be maintained

**Effort**: 3–4 weeks infrastructure + 2–4 weeks application layer
**Target clients**: Brazilian financial services, healthcare, government, regulated telcos

---

**LangFuse for observability** (add to any pattern):
```python
from langfuse import Langfuse
langfuse = Langfuse(public_key=LANGFUSE_KEY, secret_key=LANGFUSE_SECRET)

# Wrap any LLM call with tracing (EU AI Act audit trail)
with langfuse.trace(name="erp-agent-action", user_id=user_id) as trace:
    result = agent.run(task)
    trace.score(name="outcome", value=1 if result.success else 0)
```
