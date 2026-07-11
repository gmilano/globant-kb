# Composition Patterns — Enterprise AI

> Concrete recipes for building enterprise AI solutions with the repos in this KB.
> Each pattern names the specific repos, wiring, and estimated engagement size.
> Last updated: 2026-07-11

---

## Pattern P1: Enterprise Knowledge Hub
**"Ask anything about your company — get grounded, cited answers"**

**Problem**: Enterprise knowledge is scattered across SharePoint, Confluence, PDFs, Notion, JIRA, email. Employees waste 20% of workday searching for information.

**Stack**:
```
[RAGFlow (infiniflow/ragflow — Apache-2.0)]
        ↓  ingest documents (PDF, Word, slides, spreadsheets, Confluence export)
        ↓  DeepDoc extracts tables/charts from complex PDFs
[LangGraph (langchain-ai/langgraph — MIT)]
        ↓  stateful Q&A agent with follow-up handling
        ↓  human-in-the-loop for sensitive/uncertain answers
[Mem0 (mem0ai/mem0 — Apache-2.0)]
        ↓  remembers user context, previous questions, department
[n8n (n8n-io/n8n)]
        ↓  auto-ingests new documents from SharePoint/Confluence/email
        ↓  Slack/Teams notification when new relevant docs added
[Dify (langgenius/dify — Apache-2.0)]
        ↓  monitoring dashboard, usage analytics, prompt A/B testing
```

**Outputs**: Internal chatbot with cited answers, accessible via Slack/Teams/web widget.

**Wiring**:
1. RAGFlow REST API → LangGraph tool (RAG retrieval tool)
2. LangGraph → Mem0 (read/write user memory at session start/end)
3. n8n webhook trigger → RAGFlow ingestion API (auto-update on new docs)
4. Dify wraps the LangGraph agent for a polished UI + observability

**Engagement size**: USD 80k–200k (2-3 months, 2-3 engineers)
**LATAM relevance**: High — Spanish document support; on-prem deployment for LGPD compliance

---

## Pattern P2: ERP AI Copilot
**"Talk to your ERP instead of clicking through 40 screens"**

**Problem**: ERP systems (Odoo, ERPNext, SAP) have powerful data but terrible UX. Finance and operations teams spend hours on routine tasks: generating reports, creating purchase orders, checking inventory, approving workflows.

**Stack**:
```
[ERPNext / erpnext-mcp-server (MIT — rakeshgangwar/erpnext-mcp-server)]
        ↓  exposes ERPNext as an MCP server (inventory, orders, HR, accounting)
        ↓  OR use Odoo REST API directly if client is on Odoo
[LangGraph (langchain-ai/langgraph — MIT)]
        ↓  multi-step agent: query → verify → act → confirm
        ↓  approval chain: agent proposes action, human approves via Slack
[RAGFlow (infiniflow/ragflow — Apache-2.0)]
        ↓  company policies, SOPs, account codes, vendor contracts as context
[Claude API (Anthropic)]
        ↓  200k context window handles large financial reports
        ↓  JSON tool use drives ERP API calls reliably
[Mattermost or Slack]
        ↓  approval UI: agent posts proposed action, manager clicks Approve/Reject
```

**Outputs**: "Create PO for vendor ABC for $12k per last month's rate, pending CFO approval" → complete workflow in 30 seconds.

**Wiring**:
1. Install `erpnext-mcp-server` on ERPNext instance
2. LangGraph agent uses ERPNext MCP tools as its action space
3. RAGFlow indexes company policies → LangGraph uses as retrieval tool
4. Approval nodes: LangGraph `interrupt()` → post to Mattermost → resume on webhook
5. Dify provides the employee-facing chat UI

**Engagement size**: USD 120k–350k (3-4 months)
**LATAM relevance**: Very high — ERPNext widely used in LATAM SME/mid-market; PIX/PSE payment adapters can be added as custom n8n nodes

---

## Pattern P3: IT Helpdesk Agent
**"Resolve 40-50% of IT tickets automatically"**

**Problem**: IT helpdesk handles thousands of repetitive tickets: password resets, VPN access, software installation, onboarding checklists. L1 support is expensive and slow.

**Stack**:
```
[n8n (n8n-io/n8n)]
        ↓  trigger: new ticket from ITSM (ServiceNow, Jira Service Mgmt, Freshdesk)
        ↓  classify ticket type via AI node
[RAGFlow (infiniflow/ragflow — Apache-2.0)]
        ↓  knowledge base: runbooks, IT policies, known issue database
[LangGraph (langchain-ai/langgraph — MIT)]
        ↓  resolution agent: diagnose → attempt fix → escalate if needed
        ↓  tools: AD API (password reset), SCCM (software push), VPN provisioning
[Mattermost (mattermost/mattermost — Apache-2.0)]
        ↓  agent posts resolution steps; escalates to human with full context
[Mem0 (mem0ai/mem0 — Apache-2.0)]
        ↓  remembers recurring issues per user/machine; accelerates future resolutions
```

**Outputs**: Auto-resolve password resets, access requests, and known issues. Escalate with full context and attempted resolutions.

**Metrics**: 40-50% ticket deflection in first 3 months (industry benchmark). Payback period: 3-4 months.

**Wiring**:
1. n8n webhook from ITSM → classify via AI node → route to LangGraph
2. LangGraph agent has tools: RAGFlow retrieval, AD API, SCCM API, Mattermost
3. RAGFlow indexes runbooks, known issues, user manuals
4. If unresolved: LangGraph generates summary → posts to Mattermost L2 channel
5. Mem0 stores per-user and per-device history for pattern detection

**Engagement size**: USD 80k–200k (2-3 months)
**LATAM relevance**: High — Spanish runbooks, on-prem deployment for regulated clients

---

## Pattern P4: Finance Automation Agent
**"Accounts payable and expense workflows on autopilot"**

**Problem**: Finance teams process thousands of invoices monthly. Manual data entry, approval routing, and reconciliation consume 50%+ of AP team time.

**Stack**:
```
[RAGFlow (infiniflow/ragflow — Apache-2.0)]
        ↓  invoice OCR + extraction (vendor, amount, line items, PO match)
        ↓  supports PDFs with complex table layouts
[LangGraph (langchain-ai/langgraph — MIT)]
        ↓  agent: extract → match PO → route for approval → post to ERP
        ↓  anomaly detection: flag invoices that deviate from contract rates
[ERPNext or Odoo (via REST API)]
        ↓  post approved invoices, create journal entries, update vendor ledger
[n8n (n8n-io/n8n)]
        ↓  email trigger (new invoice) → OCR pipeline → approval workflow
        ↓  Slack/Teams notification for approval requests
[Dify (langgenius/dify)]
        ↓  CFO/finance manager dashboard: invoice queue, anomaly alerts, audit log
```

**Outputs**: Invoice auto-extract, 3-way PO match, approval routing, ERP posting — 80% automation rate.

**Industry benchmark**: 50% reduction in AP processing time (Forrester 2026); 3-6 month payback.

**Engagement size**: USD 100k–250k (2-3 months)
**LATAM relevance**: Very high — NF-e (Brazil), CFDI (Mexico) e-invoicing formats; PIX payment integration

---

## Pattern P5: Multi-Agent HR Onboarding
**"Day-1 ready: accounts, docs, training, and FAQs handled before the new hire arrives"**

**Problem**: HR onboarding involves 30+ steps across IT, HR, Finance, and Facilities. New hires wait days for access; HR teams are buried in coordination emails.

**Stack**:
```
[CrewAI (crewAIInc/crewAI — MIT)]
        ↓  crew: IT Provisioning Agent, HR Documents Agent, Training Agent, Facilities Agent
        ↓  orchestrator: coordinates all 4 agents in parallel
[n8n (n8n-io/n8n)]
        ↓  trigger: new hire record created in HRIS
        ↓  dispatches tasks to each agent; monitors completion
[ERPNext HR module]
        ↓  employee record, payroll setup, leave policies
[RAGFlow (infiniflow/ragflow)]
        ↓  onboarding guides, company policies, benefits FAQs indexed
[Mattermost]
        ↓  new hire welcome bot; FAQ answers; manager notification on completion
```

**Outputs**: Complete onboarding checklist auto-executed in <4 hours. New hire's Day-1 Mattermost message: "Your accounts are ready, here's your schedule, here are the policies most people ask about."

**Engagement size**: USD 80k–200k (2 months)
**LATAM relevance**: High — adapts to LATAM labor law specifics (CLT Brazil, labor contracts Colombia)

---

## Pattern P6: Supply Chain Intelligence Agent
**"Know about inventory shortfalls and disruptions before they hit production"**

**Problem**: Supply chains have 50+ variables. Procurement teams detect issues reactively — after a stockout, after a late shipment, after a quality failure.

**Stack**:
```
[ERPNext (frappe/erpnext — GPL-3.0)]
        ↓  source of truth: inventory, purchase orders, supplier records, BOM
[LangGraph (langchain-ai/langgraph — MIT)]
        ↓  monitoring agent: daily scan of inventory levels vs. demand forecast
        ↓  risk agent: cross-references news and supplier lead times
        ↓  action agent: draft POs, escalation emails, expedite requests
[RAGFlow (infiniflow/ragflow)]
        ↓  indexes supplier contracts, SLA terms, historical lead time data
[n8n (n8n-io/n8n)]
        ↓  daily trigger → agent run → Slack/Teams alert if risk detected
        ↓  integrates with 3PL APIs, shipping tracking APIs
[Haystack (deepset-ai/haystack)]
        ↓  supply chain news monitoring: supplier financial news, port disruptions
```

**Outputs**: Daily briefing: "3 items at risk of stockout in 14 days, 2 suppliers with delayed shipments, recommended actions." General Mills pattern: $20M+ shipment savings.

**Engagement size**: USD 100k–280k (3-4 months)

---

## Pattern P7: On-Premise Sovereign AI Stack (LATAM)
**"Full enterprise AI with no data leaving your data center"**

**Problem**: LGPD (Brazil), Colombia/Chile sector rules, and enterprise data governance policies prevent sending sensitive data to cloud AI APIs. But clients still want AI productivity.

**Stack**:
```
[Ollama (ollama/ollama — MIT)]
        ↓  local LLM inference: Llama 3.3, Mistral, Qwen 2.5
        ↓  GPU server on-premise or private cloud
[Dify (langgenius/dify — Apache-2.0, self-hosted)]
        ↓  visual workflow builder connected to Ollama backend
        ↓  self-hosted: no data leaves the client environment
[RAGFlow (infiniflow/ragflow — Apache-2.0, self-hosted)]
        ↓  document ingestion and retrieval, fully on-prem
[Mattermost (mattermost/mattermost — Apache-2.0, on-prem)]
        ↓  team collaboration with AI bot built in
[n8n (self-hosted)]
        ↓  workflow automation: all integrations stay within the network perimeter
```

**Deployment**: Docker Compose → single server setup for SME; Kubernetes for enterprise scale.

**Outputs**: Full AI productivity stack — knowledge base, workflow automation, team chat with AI — with zero cloud data exposure.

**Engagement size**: USD 60k–180k (1-2 months) + recurring managed services
**LATAM relevance**: Critical differentiator. This is the pattern for LGPD-regulated clients in Brazil, financial sector in Colombia, government in any LATAM country.

---

## Pattern P8: Internal Developer AI Platform (Globant Internal)
**"Ship 30% faster by giving every developer an AI co-pilot"**

**Problem**: Developers context-switch constantly: find the right API, understand legacy code, write tests, review PRs. Each task has 5-10 minutes of friction.

**Stack**:
```
[Backstage (backstage/backstage — Apache-2.0)]
        ↓  software catalog: every service, API, team, runbook indexed
        ↓  AI plugin: natural language search over the catalog
[OpenHands (All-Hands-AI/OpenHands — MIT)]
        ↓  SWE agent: automated code review, PR description generation, test writing
        ↓  Docker sandbox: safe code execution
[RAGFlow (infiniflow/ragflow — Apache-2.0)]
        ↓  technical documentation, architecture decisions, code standards indexed
[Claude API (Anthropic)]
        ↓  200k context: entire codebase context for large refactors
        ↓  Globant–Anthropic preferred partner pricing
[Microsoft Agent Framework (MIT)]
        ↓  .NET/Azure shops: agent orchestration within Microsoft toolchain
```

**Outputs**: Developer types "add error handling to the payment service like we did in checkout" → agent reads both services from catalog, generates PR, requests review.

**Benchmark**: TELUS 30% faster delivery + 500k hours saved with Claude Code; Morgan Stanley 280k dev hours saved.

**Engagement size**: USD 150k–350k for enterprise deployment + $X/developer/month managed service
**Applicability**: Globant can run this internally AND sell it to clients as a Developer Productivity Platform

---

## Quick Reference: Pattern × Repo Matrix

| Pattern | LangGraph | CrewAI | n8n | RAGFlow | Dify | ERPNext | Mem0 | MAF |
|---------|-----------|--------|-----|---------|------|---------|------|-----|
| P1 Knowledge Hub | ✅ | | ✅ | ✅ | ✅ | | ✅ | |
| P2 ERP Copilot | ✅ | | | ✅ | ✅ | ✅ | | |
| P3 IT Helpdesk | ✅ | | ✅ | ✅ | | | ✅ | |
| P4 Finance Automation | ✅ | | ✅ | ✅ | ✅ | ✅ | | |
| P5 HR Onboarding | | ✅ | ✅ | ✅ | | ✅ | | |
| P6 Supply Chain | ✅ | | ✅ | ✅ | | ✅ | | |
| P7 Sovereign LATAM | | | ✅ | ✅ | ✅ | | | |
| P8 Dev Platform | | | | ✅ | | | | ✅ |

---
*Updated 2026-07-11 by ingest pipeline.*
