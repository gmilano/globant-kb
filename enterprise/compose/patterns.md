# 🧩 Composition Patterns — Enterprise AI

> Concrete recipes combining specific repos + agents + wiring instructions.
> Each pattern names exact repos, estimated effort, and expected outcome.
> Last updated: 2026-07-06 (second pass)

---

## Pattern 1: Agentic ERP Assistant (ERPNext + LangGraph + Claude)

**Problem:** Finance/ops teams spend hours querying ERP data, generating reports, and updating records manually.

**Stack:**
- `frappe/erpnext` (GPL-3.0, 36.4k★) — ERP backbone
- `frappe/frappe` (MIT, 10.4k★) — REST API + webhooks
- `rakeshgangwar/erpnext-mcp-server` (MIT) — MCP bridge: exposes ERPNext as AI tools
- `langchain-ai/langgraph` (MIT, 126k★) — stateful agent orchestration
- Claude Sonnet 4.6 — reasoning + NL generation

**Architecture:**
```
User (NL query) → LangGraph Agent
                    ↓
              erpnext-mcp-server (MCP)
                    ↓
              ERPNext REST API
                    ↓
            Query results → LangGraph → Claude generates answer
                    ↓
              HITL gate (for write operations)
                    ↓
            ERPNext record update + audit log
```

**Key agent tools:**
- `get_sales_report(period, filters)` — pulls Sales Analytics from ERPNext
- `create_purchase_order(vendor, items)` — writes PO with HITL approval gate
- `get_outstanding_invoices(customer)` — AR aging queries
- `run_payroll(period)` — HR payroll with mandatory human approval

**Wiring (LangGraph):**
```python
from langgraph.graph import StateGraph
from langchain_anthropic import ChatAnthropic

# Load erpnext-mcp-server as LangGraph tools
# Set PostgreSQL checkpointer for persistent state
# Add HITL interrupt before any write operation
graph = StateGraph(AgentState)
graph.add_node("agent", call_claude_with_erpnext_tools)
graph.add_node("human_review", wait_for_approval)  # interrupt point
```

**Effort:** 4–6 weeks  
**Outcome:** Finance team self-serves ERP queries in NL; write operations gated by HITL; full audit trail for compliance  
**LATAM fit:** ERPNext has Argentina, Brazil, Chile, Colombia, Mexico localizations — tax/fiscal compliance built in

---

## Pattern 2: AI-Native CRM Pipeline (Twenty + CrewAI + n8n)

**Problem:** Sales team manually logs CRM updates, writes follow-up emails, and qualifies leads — high time cost, inconsistent quality.

**Stack:**
- `twentyhq/twenty` (Apache-2.0, 45.5k★) — MCP-native CRM (Salesforce alternative)
- `crewAIInc/crewAI` (MIT, 52.8k★) — role-based multi-agent team
- `n8n-io/n8n` (Sustainable, 182k★) — trigger automation + 400+ integrations; n8n 2.0 enterprise security
- Claude Haiku 4.5 — fast, cost-efficient for high-volume tasks

**Agent Crew:**
1. **Lead Qualifier Agent** — scores inbound leads using ICP criteria from CRM history
2. **Outreach Writer Agent** — drafts personalized emails using deal context from Twenty
3. **CRM Updater Agent** — writes activity logs, updates deal stages via Twenty MCP
4. **Sales Coach Agent** — analyzes lost deals, surfaces coaching insights for reps

**Wiring:**
```
n8n trigger: new lead arrives (webhook from website form)
    ↓
CrewAI crew.kickoff()
    Lead Qualifier → reads company data via Twenty MCP
    Outreach Writer → drafts email (Claude Haiku)
    CRM Updater → posts activity + sets stage in Twenty
    ↓
n8n: send email via SendGrid; notify Slack channel
```

**n8n integration:** Configure n8n webhook to trigger on new Twenty contacts; n8n handles email sending + Slack notification after CrewAI crew completes.

**Effort:** 3–5 weeks  
**Outcome:** 70–80% reduction in manual CRM data entry; consistent lead qualification; personalized outreach at scale  
**Cost:** Claude Haiku at $0.80/MTok input — very affordable for high-volume CRM tasks

---

## Pattern 3: Enterprise Data Governance Agent (DataHub + OpenMetadata + LangGraph)

**Problem:** Data teams spend weeks manually cataloging datasets, tracking lineage, and answering "where does this data come from?" — blocking AI projects from getting started.

**Stack:**
- `datahub-project/datahub` (Apache-2.0, 11.8k★) — metadata platform + MCP server
- `open-metadata/OpenMetadata` (Apache-2.0, 8.2k★) — data context layer, 130+ connectors, MCP server
- `langchain-ai/langgraph` (MIT, 126k★) — stateful governance agent
- Claude Sonnet 4.6 — complex reasoning over metadata graphs

**Agents:**
- **Data Discovery Agent** — "Find all tables related to customer revenue in Q2" → queries DataHub MCP, returns ranked results with lineage
- **Quality Monitor Agent** — polls OpenMetadata quality metrics, alerts on SLA breaches
- **Governance Advisor Agent** — assesses new datasets against LGPD/GDPR rules, flags PII fields
- **Lineage Explainer Agent** — "How was this metric calculated?" → traces full lineage graph via DataHub API

**Wiring:**
```python
# Both DataHub and OpenMetadata expose MCP servers
# LangGraph agent uses them as tools

tools = [
    datahub_mcp_client.get_tool("search_datasets"),
    datahub_mcp_client.get_tool("get_lineage"),
    openmetadata_mcp_client.get_tool("get_data_quality"),
    openmetadata_mcp_client.get_tool("get_pii_fields"),
]
agent = create_react_agent(claude_sonnet, tools)
graph = StateGraph(GovernanceState).add_node("agent", agent).compile()
```

**Effort:** 5–7 weeks  
**Outcome:** Self-service data discovery; automated LGPD/GDPR compliance checks; lineage questions answered in seconds not days  
**LATAM fit:** LGPD (Brazil) + Ley de Protección de Datos (Argentina, Chile, Colombia) compliance is a current pain point

---

## Pattern 4: Enterprise RAG Knowledge Base (Dify + DataHub + Claude)

**Problem:** Enterprise knowledge is siloed across Confluence, SharePoint, PDFs, Slack — employees can't find answers; onboarding takes weeks.

**Stack:**
- `langgenius/dify` (Apache-2.0, 144k★) — RAG pipeline + agent deployment platform
- `datahub-project/datahub` (Apache-2.0, 11.8k★) — data catalog as retrieval context
- Claude Sonnet 4.6 — reasoning + answer generation
- Self-hosted vector DB (pgvector in PostgreSQL, or Qdrant MIT)

**Architecture:**
```
Document ingestion:
  Confluence / SharePoint / PDFs → Dify ingestion pipeline
  → chunking + embedding (Dify managed)
  → pgvector / Qdrant

Query path:
  Employee question → Dify RAG agent
      → hybrid search (semantic + keyword) over knowledge base
      → DataHub MCP: fetch governance context (who owns this data, is it current?)
      → Claude Sonnet: synthesize answer with citations
      → HITL: flag low-confidence answers for human review
```

**Dify configuration:**
- Enable dataset with Confluence + SharePoint connectors
- Set retrieval mode: hybrid search (semantic + full-text)
- Add DataHub as custom tool via MCP
- Set Claude Sonnet as reasoning model; Claude Haiku for classification tasks

**Effort:** 2–4 weeks (quickest win on this list)  
**Outcome:** Employee self-service answers with source citations; 40–60% reduction in internal support tickets  
**Cost model:** Dify self-hosted = $0 platform cost; only LLM inference (Claude Haiku for most queries)

---

## Pattern 5: Customer Support Agent with HITL (SuiteCRM + LangGraph + Claude)

**Problem:** Customer support team handles 80% routine queries manually; complex cases escalate slowly; no learning loop.

**Stack:**
- `salesagility/SuiteCRM` (AGPL-3.0, 4.3k★) — enterprise CRM with case management
- `langchain-ai/langgraph` (MIT, 126k★) — stateful agent with HITL interrupt
- `langgenius/dify` (Apache-2.0, 144k★) — RAG over product docs / support KB
- Claude Haiku 4.5 — fast, cheap for routine classification + response drafting
- Claude Sonnet 4.6 — complex reasoning for escalated cases

**Agent flow:**
```
Inbound ticket (email/chat) → LangGraph agent
    ↓
Classify: routine | complex | escalate (Claude Haiku)
    ├── routine → RAG search Dify KB → draft response → HITL light check → auto-send
    ├── complex → retrieve customer history from SuiteCRM REST API
    │              → Claude Sonnet reasons over history + KB
    │              → draft response → human agent reviews (HITL) → send
    └── escalate → create SuiteCRM case, assign to senior rep, draft context summary
```

**SuiteCRM integration:** REST API v8 for case CRUD, customer history retrieval, activity logging. Webhook triggers on new case creation.

**LangGraph HITL:** PostgreSQL checkpointer stores state; agent pauses at `human_review` node; human approves/edits via Slack or web UI; agent resumes.

**Effort:** 5–7 weeks  
**Outcome:** 60–70% of tickets auto-resolved; human agents focus on complex/high-value cases; full audit trail per case  
**Compliance:** Every decision node logged for GDPR/LGPD subject access request fulfillment

---

## Pattern 6: Internal Developer Productivity Platform (Backstage + OpenHands + MAF)

**Problem:** Large engineering org has no single view of services, fragmented runbooks, and devs lose hours to toil (boilerplate PRs, dependency updates, incident lookups).

**Stack:**
- `backstage/backstage` (Apache-2.0, 36k★, 3,400+ companies, Toyota $10M ROI) — internal developer portal
- `All-Hands-AI/OpenHands` (MIT, 78.5k★, v1.6.0 Kubernetes RBAC) — software engineering agent (72% SWE-bench)
- `microsoft/agent-framework` (MIT, 18k★) — MAF 1.0 for enterprise .NET orchestration
- `langchain-ai/langgraph` (MIT, 126k★) — Python workflow orchestration
- Claude Sonnet 4.6 — code reasoning, PR review, documentation

**Agents wired into Backstage:**
1. **Service Health Agent** — queries Backstage catalog + telemetry; answers "is service X healthy?" in NL
2. **PR Automation Agent** (OpenHands) — auto-creates PRs for dependency bumps, lint fixes, minor bugs
3. **Incident Response Agent** — fetches runbook from TechDocs + service graph from Backstage; drafts incident report
4. **Onboarding Agent** — new hire asks "how do I deploy to production?" → NL search over TechDocs + service catalog

**Wiring:**
```
Backstage plugin (custom) → calls LangGraph API
LangGraph Agent:
  tools = [
    backstage_catalog_search(query),   # REST API to Backstage
    openhands_run_task(task_spec),     # OpenHands for code changes
    techdocs_search(query),             # Backstage TechDocs search
    github_create_pr(branch, body),    # GitHub MCP tool
  ]
```

**For .NET shops:** Replace LangGraph with MAF 1.0 (agent-framework); same tool set, C# implementation.

**Effort:** 8–12 weeks  
**Outcome:** Dev productivity +35–55% on routine tasks; incident MTTR reduced 40%; new hire time-to-productivity cut by half  
**Globant play:** Position as "AI-native internal platform" transformation — high-value, multi-year engagement

---

## Pattern 7: A2A Multi-Agent Federation (Google ADK + LangGraph + MCP)

**Problem:** Enterprise functions (legal review, financial approval, HR verification) live in separate agent systems, each built by different teams. Complex business processes require cross-functional agent coordination with no custom middleware budget.

**Stack:**
- `google/adk-python` (Apache-2.0) — Agent Development Kit 1.0 GA with native A2A support
- `langchain-ai/langgraph` (MIT, 126k★) — orchestrator agent (Python)
- `modelcontextprotocol/servers` (MIT) — MCP servers for each backend system
- Claude Sonnet 4.6 — reasoning in the orchestrator
- Claude Haiku 4.5 — fast classification in leaf agents

**Scenario:** Employee onboarding requires coordinating: IT provisioning agent + HR verification agent + Legal compliance agent — each built independently, each maintaining its own state.

**Architecture:**
```
User submits onboarding request
    ↓
LangGraph Orchestrator Agent (Claude Sonnet 4.6)
    ↓ discovers agents via A2A Agent Cards
    ├── A2A call → IT Provisioning Agent (ADK)
    │       ↓ MCP: ServiceNow + Azure AD
    │       → provisions accounts, returns task ID
    │
    ├── A2A call → HR Verification Agent (ADK)
    │       ↓ MCP: Workday / ERPNext HR module
    │       → verifies employment status, returns verified=true
    │
    └── A2A call → Legal Compliance Agent (LangGraph)
            ↓ MCP: DocuSign + legal policy KB (Dify RAG)
            → checks compliance, requires NDA signing if needed
            → returns compliance_status

LangGraph Orchestrator: waits for all 3, aggregates, emails onboarding report
```

**A2A wiring (Agent Card for IT Provisioning Agent):**
```json
{
  "id": "it-provisioning-agent",
  "name": "IT Provisioning Agent",
  "description": "Provisions Azure AD, M365, and ServiceNow access for new employees",
  "capabilities": ["provision_user", "deprovision_user", "check_status"],
  "endpoint": "https://it-agents.internal/a2a",
  "auth": {"type": "oauth2", "scope": "agent.provision"}
}
```

**LangGraph orchestrator delegating via A2A:**
```python
from google.adk.a2a import A2AClient

async def call_it_provisioning(state: OnboardingState):
    client = A2AClient("https://it-agents.internal/a2a")
    result = await client.call_task(
        capability="provision_user",
        payload={"employee_id": state["employee_id"], "role": state["role"]},
        timeout=300
    )
    return {"it_status": result["status"], "accounts": result["accounts"]}
```

**Effort:** 6–10 weeks (includes building 3 specialist agents + orchestrator)  
**Outcome:** Complex multi-system onboarding goes from 3–5 business days to < 2 hours; each agent remains independently deployable and versioned; no custom integration code between agent teams  
**Governance:** Each A2A call is logged; orchestrator maintains full lineage; HITL gate before final account activation

---

## Pattern 8: LLMOps Observability Stack (Langfuse + LangGraph + OpenTelemetry)

**Problem:** Production AI agents are a black box. When Claude returns a wrong answer or a tool call fails silently, teams can't debug. No prompt version control means improvements are lost.

**Stack:**
- `langfuse/langfuse` (MIT, ~12k★) — LLM observability, prompt management, evals
- `langchain-ai/langgraph` (MIT, 126k★) — agent framework with built-in Langfuse tracing
- `traceloop/openllmetry` (Apache-2.0) — OpenTelemetry bridge to existing APM
- Claude Sonnet 4.6 / Claude Haiku 4.5 — LLM calls (traced automatically)

**What you get:**
- Full trace of every agent run: which tools were called, in what order, latency per step
- Token cost per conversation + per agent node
- Prompt versioning — roll back to v3.1 if v3.2 regresses
- LLM-as-judge evaluations: automatically score agent outputs against rubrics
- User feedback loop: thumbs up/down in the UI → fed back to evaluation dataset

**Wiring:**
```python
import os
from langfuse import Langfuse
from langfuse.callback import CallbackHandler

# Langfuse self-hosted (Docker) or cloud
langfuse = Langfuse(
    public_key=os.environ["LANGFUSE_PUBLIC_KEY"],
    secret_key=os.environ["LANGFUSE_SECRET_KEY"],
    host="https://langfuse.internal"   # self-hosted
)
langfuse_handler = CallbackHandler()

# Pass to LangGraph agent
result = graph.invoke(
    {"messages": [("user", query)]},
    config={"callbacks": [langfuse_handler]}
)
# Every node call, tool invocation, and LLM call is now traced
```

**Self-hosted deployment:**
```bash
# docker-compose with Langfuse + PostgreSQL
docker compose up -d
# All traces stored locally — no data leaves your VPC
```

**Effort:** 1–2 weeks to wire; ongoing prompt optimization  
**Outcome:** Mean time to diagnose production agent failures drops from hours to minutes; prompt improvements are versioned and reversible; compliance teams have full audit trail of every LLM decision  
**Cost:** Langfuse self-hosted = $0 platform; only LLM inference costs

---

## Anti-Patterns to Avoid

| Anti-Pattern | Why It Fails | What to Do Instead |
|-------------|-------------|-------------------|
| Automate existing broken processes | 40% of agentic projects canceled because agents inherit process debt | Redesign the process first; then automate |
| No data governance before AI | Agents hallucinate or pull from stale/wrong sources | Deploy DataHub/OpenMetadata first |
| Single giant agent for everything | Context window limits; no audit trail; hard to debug | Decompose into specialist agents with clear interfaces |
| Skip HITL for high-stakes actions | Compliance failure; trust erosion after first bad automated action | HITL gates on any irreversible action |
| Deploy without observability | Can't debug production issues; no feedback loop | Langfuse or Dify observability from day 1 |
| Start with Opus/GPT-4 for everything | 10x cost; latency; overkill for classification/extraction | Haiku for routine tasks; Sonnet for reasoning; Opus for complex judgment |
| Build custom agent-to-agent middleware | Reinventing A2A; lock-in; maintenance burden | Adopt A2A + Google ADK; let the Linux Foundation standard do the work |

---
*Auto-updated by ingest pipeline — 2026-07-06.*
