# 🧩 Composition Patterns — Enterprise AI

> Concrete recipes combining specific repos + agents + wiring instructions.
> Last updated: 2026-07-13 (v4)

## Pattern Stack Reference

```
[Enterprise Platform (Odoo / ERPNext / Twenty / n8n)]
          ↓ MCP / REST API
[AI Orchestration Layer (LangGraph / CrewAI / n8n AI nodes)]
          ↓
[LLM (Claude Sonnet 5 / GPT-4o / local Mistral via Ollama)]
          ↓
[Observability (OpenTelemetry → Grafana)]
          ↓
[Human Approval (HITL checkpoint / n8n wait node / email/Slack)]
```

---

## P1 — Agentic ERP Automation (Odoo + LangGraph + Claude)

**Problem**: Purchase orders, vendor approvals, and inventory reordering are manual, error-prone, and slow.

**Stack**:
- [odoo/odoo](https://github.com/odoo/odoo) (LGPL) — ERP data source
- MCP server for Odoo (custom, 1 week to build) or REST API integration
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) (MIT) — orchestration with HITL checkpoints
- Claude Sonnet 5 — LLM reasoning
- [open-telemetry/opentelemetry-python](https://github.com/open-telemetry/opentelemetry-python) (Apache) — audit logging

**Wiring**:
```python
# LangGraph supervisor agent manages specialist sub-agents
from langgraph.graph import StateGraph
from langgraph.checkpoint.memory import MemorySaver

# Agents: PurchaseOrderAgent, VendorEvalAgent, ApprovalAgent
# HITL: interrupt() before any PO > $10k
# Tools: odoo_create_po, odoo_check_inventory, odoo_get_vendor_history
```

**Estimated effort**: 8–12 weeks | **Expected ROI**: 40–60% reduction in PO processing time; 15–25% reduction in procurement errors

---

## P2 — Enterprise CRM AI Copilot (Twenty + CrewAI + n8n)

**Problem**: Sales reps spend 30% of time on manual data entry, follow-up scheduling, and pipeline updates.

**Stack**:
- [twentyhq/twenty](https://github.com/twentyhq/twenty) (AGPL) — CRM with native MCP server
- [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) (MIT) — role-based agents
- [n8n-io/n8n](https://github.com/n8n-io/n8n) (Apache-2.0) — trigger workflows on CRM events
- Claude Sonnet 5 — email drafting, deal analysis

**Crew roles**:
- `ResearchAgent` — enriches contact data from web
- `EmailAgent` — drafts personalized follow-ups
- `PipelineAgent` — updates deal stages and forecasts
- `SchedulingAgent` — proposes meeting slots via calendar API

**n8n trigger**: New contact created in Twenty → fire CrewAI crew → output back to Twenty via MCP

**Estimated effort**: 6–8 weeks | **Expected ROI**: Sales rep saves 6–8h/week (matches Microsoft 6.4h/wk benchmark); 20–30% pipeline velocity improvement

---

## P3 — Multi-Agent Knowledge Management (Dify + ERPNext + RAG)

**Problem**: Enterprise knowledge is siloed across ERP, wikis, emails, and documents; employees can't find answers fast.

**Stack**:
- [langgenius/dify](https://github.com/langgenius/dify) (Apache-2.0) — RAG platform with knowledge base management
- [frappe/erpnext](https://github.com/frappe/erpnext) (GPL) — ERP data source
- [rakeshgangwar/erpnext-mcp-server](https://github.com/rakeshgangwar/erpnext-mcp-server) (MIT) — MCP bridge
- Vector DB: Weaviate (BSD) or Chroma (Apache-2.0)
- Claude Haiku 4.5 — fast retrieval responses

**Wiring**:
```
Documents (PDF, Confluence, Sharepoint) → Dify knowledge base ingestion
ERPNext live data → MCP server → Dify tool call
Employee query → Dify RAG + tool routing → grounded answer with citations
```

**Key feature**: Dify's built-in knowledge chunking + citation tracking; no hallucination about company-specific data

**Estimated effort**: 4–6 weeks | **Expected ROI**: 50–70% reduction in internal support tickets; 2–3h/week saved per knowledge worker

---

## P4 — Compliance-Ready Workflow Automation (n8n + LangGraph + HITL)

**Problem**: Regulated enterprises (banking, insurance) need AI automation with mandatory human approval checkpoints and full audit trails.

**Stack**:
- [n8n-io/n8n](https://github.com/n8n-io/n8n) (Apache-2.0) — business process trigger and integration layer
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) (MIT) — HITL checkpointing and state persistence
- [temporalio/temporal](https://github.com/temporalio/temporal) (MIT) — durable execution for long-running approvals (days/weeks)
- OpenTelemetry (Apache) — immutable audit log

**Pattern**:
```
n8n trigger (new loan application)
  → LangGraph DocumentReviewAgent (extracts data, flags risks)
  → interrupt() — human underwriter reviews in UI
  → LangGraph DecisionAgent (generates approval letter or rejection)
  → Temporal durable task (waits for customer e-signature, up to 30 days)
  → n8n notification (CRM update, email, document storage)
  → OpenTelemetry logs every decision + human approval timestamp
```

**Compliance features**: Full decision audit trail; HITL timestamps; rollback via LangGraph state; immutable logs via OTel

**Estimated effort**: 10–16 weeks | **Expected ROI**: 60–80% reduction in processing time; audit-ready by default

---

## P5 — Internal Developer Productivity Agent (OpenHands + MAF + Jira/GitHub)

**Problem**: Engineering teams spend 30–40% of time on boilerplate, PR reviews, documentation, and bug triaging.

**Stack**:
- [All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands) (MIT) — software engineering agent
- [microsoft/autogen](https://github.com/microsoft/autogen) (MIT) — multi-agent coordination (MAF pattern)
- GitHub MCP server (MIT) — repo access, PR creation, issue management
- Claude Sonnet 5 — code generation and review

**Crew**:
- `TriageAgent` — classifies incoming GitHub issues, assigns priority
- `CodeAgent` (OpenHands) — implements fixes for labeled bugs
- `ReviewAgent` — reviews PRs against team coding standards
- `DocAgent` — generates/updates docs for merged PRs

**Estimated effort**: 8–12 weeks | **Expected ROI**: 20–35% dev velocity improvement; SWE-bench validated performance on real bugs

---

## P6 — Agentic Business Intelligence (Superset + LangGraph + Natural Language)

**Problem**: Business users can't write SQL; BI team is bottlenecked by dashboard requests.

**Stack**:
- [apache/superset](https://github.com/apache/superset) (Apache-2.0) — BI platform with REST API
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) (MIT) — agent with SQL generation + retry loop
- [langgenius/dify](https://github.com/langgenius/dify) (Apache-2.0) — chat UI + knowledge base (schema docs)
- Claude Sonnet 5 — NL → SQL translation with schema-aware prompting

**Flow**:
```
User asks: "Show me sales by region for Q2 2026 vs Q2 2025"
→ Dify retrieves schema documentation
→ LangGraph SQLGenerationAgent writes SELECT query
→ LangGraph ValidationAgent checks for injection risks + schema correctness
→ Superset REST API executes query, returns chart
→ Agent narrates the insight in plain language
```

**Estimated effort**: 6–10 weeks | **Expected ROI**: 80% reduction in ad-hoc BI request backlog; business users self-serve in <30 seconds

---

## P7 — Enterprise Self-Hosted AI Assistant (OpenClaw/Fork + Ollama + Mattermost)

**Problem**: Employees need an internal AI assistant but CIO blocks cloud LLMs due to data privacy (no data leaves the firewall).

**Stack**:
- [openclaw/openclaw](https://github.com/openclaw/openclaw) fork (MIT) — self-hosted AI assistant skeleton
- Ollama (MIT) + Mistral 7B or LLaMA 3.3 — local LLM inference (no cloud)
- [mattermost/mattermost](https://github.com/mattermost/mattermost) (AGPL) — chat interface
- [n8n-io/n8n](https://github.com/n8n-io/n8n) (Apache) — tool integrations (calendar, ERP, HR)
- [rakeshgangwar/erpnext-mcp-server](https://github.com/rakeshgangwar/erpnext-mcp-server) (MIT) — ERP tool access

**Key selling point**: 100% on-premise; LGPD/GDPR compliant; no data to any cloud vendor; Mattermost is already deployed at many enterprises

**Estimated effort**: 6–10 weeks | **Expected ROI**: Replaces $30–75/user/month Microsoft Copilot or Google Agentspace; saves $360–$900/user/year

---

## P8 — Supply Chain Multi-Agent System (ERPNext + CrewAI + Temporal)

**Problem**: Supply chain disruptions require real-time response across procurement, logistics, and finance — currently siloed.

**Stack**:
- [frappe/erpnext](https://github.com/frappe/erpnext) (GPL) — inventory, procurement, supplier data
- [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) (MIT) — specialist crew
- [temporalio/temporal](https://github.com/temporalio/temporal) (MIT) — durable long-running supply chain workflows
- Claude Sonnet 5 — disruption analysis and mitigation planning

**Crew**:
- `SupplyMonitorAgent` — polls supplier APIs, detects delays
- `ImpactAnalysisAgent` — calculates downstream SKU impact
- `ReorderAgent` — initiates emergency POs with alternative suppliers
- `FinanceAgent` — updates cash flow projections
- `CommunicationsAgent` — drafts supplier and customer notifications

**Estimated effort**: 12–18 weeks | **Expected ROI**: 30–50% reduction in stockouts; 20–40% faster disruption response time

---

## P9 — HR Automation Agent (Frappe HR + LangGraph + n8n)

**Problem**: HR team spends 60% of time on repetitive tasks: onboarding, leave approvals, payroll queries, performance reviews.

**Stack**:
- [frappe/hrms](https://github.com/frappe/hrms) (GPL) — HR and payroll platform
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) (MIT) — workflow orchestration with HITL
- [n8n-io/n8n](https://github.com/n8n-io/n8n) (Apache) — trigger on HR events
- Claude Haiku 4.5 — fast responses to employee queries

**Workflows**:
- New hire → automated IT provisioning, org chart update, welcome package
- Leave request → policy check → auto-approve within limits, escalate edge cases
- Employee question → RAG over HR policies → instant answer
- Performance cycle → automated review collection, manager reminders, insights

**Estimated effort**: 6–10 weeks | **Expected ROI**: HR team saves 15–25h/week; onboarding time reduced 50%; employee satisfaction +30%
