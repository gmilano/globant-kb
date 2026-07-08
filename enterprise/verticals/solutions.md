# Enterprise Vertical Solutions — AI-Ready Platforms

> Real platforms Globant can fork, customize, and layer AI on top of.
> Model: start with a functional system → add agentic layer → build vertical solution.
> Last updated: 2026-07-08

## ERP (Enterprise Resource Planning)

### Odoo
- **Repo**: [github.com/odoo/odoo](https://github.com/odoo/odoo) | LGPL-3.0 | 52k stars
- **Stack**: Python, PostgreSQL, OWL (JS framework), Docker
- **Modules**: Accounting, Inventory, Manufacturing, CRM, HR, eCommerce, Project, Purchase, Sales
- **AI Integration Points**:
  - Odoo AI module (Odoo 18): CRM lead scoring, email summarization, chatbot builder
  - REST/RPC API for agent-driven CRUD on any model
  - n8n official Odoo node for workflow automation
  - Custom module pattern: inherit `mail.thread` → inject LLM suggestions into chatter
- **Globant Use Case**: Mid-market manufacturing/distribution ERP modernization with AI copilots
- **LATAM Presence**: Strong Brazil, Mexico, Argentina deployments; 100+ Odoo partners in LATAM

### ERPNext + Frappe
- **Repo**: [github.com/frappe/erpnext](https://github.com/frappe/erpnext) | GPL-3.0 | 36k stars
- **Stack**: Python (Frappe Framework), MariaDB, Redis, Vue.js
- **Modules**: Accounting, HR, Payroll, Manufacturing, Supply Chain, CRM, Project
- **AI Integration Points**:
  - [ERPNext MCP Server](https://github.com/rakeshgangwar/erpnext-mcp-server) — expose ERP as MCP tools for Claude/GPT
  - Frappe Framework API-first: every DocType auto-generates REST + Webhooks
  - AI extensions available: frappe-ai (text generation), frappe-copilot (smart forms)
  - LangChain integration via REST API and webhook triggers
- **Globant Use Case**: SME ERP implementation with AI-driven procurement, invoicing, and supply chain agents
- **LATAM Fit**: GPL-3.0 allows deployment; actively used in India + emerging markets; LATAM community growing

---

## CRM (Customer Relationship Management)

### Twenty CRM
- **Repo**: [github.com/twentyhq/twenty](https://github.com/twentyhq/twenty) | AGPL-3.0 | 45k stars
- **Stack**: TypeScript, React, Node.js, PostgreSQL, GraphQL
- **AI Integration Points**:
  - **Native MCP server** (Cloud) — AI agents read/write CRM records, pipelines, contacts via natural language
  - GraphQL + REST API-first — every object queryable by AI agents
  - Custom objects and fields with schema-driven AI form completion
  - n8n integration for automated deal stage progressions
- **Best For**: AI-native sales teams, startups, and enterprises wanting Salesforce alternatives
- **Globant Use Case**: Build AI-augmented sales copilot on top of Twenty for client sales teams

### SuiteCRM
- **Repo**: [github.com/salesagility/SuiteCRM](https://github.com/salesagility/SuiteCRM) | AGPL-3.0 | 4k stars
- **Stack**: PHP, MySQL/MariaDB, Bootstrap
- **Scale**: ~2M downloads, 5M active users globally
- **AI Integration Points**:
  - REST API v8 for agent-driven lead/contact/opportunity CRUD
  - Logic Hooks (PHP callbacks) as agentic trigger points
  - Email-to-case, call transcription → AI summary plugins
  - Community AI modules for lead scoring via scikit-learn
- **Globant Use Case**: Legacy SuiteCRM migration to AI-augmented CRM for large sales organizations

---

## Collaboration & ITSM

### Mattermost
- **Repo**: [github.com/mattermost/mattermost](https://github.com/mattermost/mattermost) | AGPL-3.0 | 29k stars
- **Stack**: Go (server), React (web), PostgreSQL/MySQL
- **AI Integration Points**:
  - Plugin system: deploy LLM agents as Mattermost bots (slash commands, auto-responses)
  - Mattermost Copilot plugin (self-hosted): LLM-powered thread summarization and Q&A
  - Webhook bots: agents receive events and post AI-generated responses
  - Integration with n8n for multi-channel enterprise automation
- **Globant Use Case**: Deploy AI team assistant bot in Mattermost for knowledge retrieval, meeting summaries, and ticket creation

### GLPI
- **Repo**: [github.com/glpi-project/glpi](https://github.com/glpi-project/glpi) | GPL-3.0 | 4k stars (200k+ production deployments)
- **Stack**: PHP, MySQL/MariaDB
- **Modules**: Ticketing, Asset Management, Change Management, CMDB, Service Catalog
- **AI Integration Points**:
  - REST API for agent-driven ticket creation, update, and resolution
  - FusionInventory plugin for AI-driven asset discovery and cataloging
  - Custom plugin pattern: AI ticket classifier (RAGFlow → GLPI category assignment)
  - Webhook → n8n → LLM → GLPI for intelligent auto-routing
- **Globant Use Case**: AI-augmented ITSM for large enterprises — intelligent ticket triage, KB article suggestions

---

## HR & Payroll

### Frappe HR (HRMS)
- **Repo**: [github.com/frappe/hrms](https://github.com/frappe/hrms) | GPL-3.0 | 2k stars
- **Stack**: Python (Frappe), MariaDB, Vue.js
- **Modules**: Recruitment, Onboarding, Leave & Attendance, Expense Management, Payroll, Performance Reviews, Taxation
- **AI Integration Points**:
  - ERPNext MCP Server exposes all HR DocTypes to AI agents
  - AI resume screening: hook recruitment workflow to LLM scoring
  - Payroll Engine can call LLM for regulation interpretation
  - n8n integration for onboarding workflow automation
- **Globant Use Case**: AI-augmented HR platform for mid-market clients — resume screening, payroll anomaly detection

---

## Business Intelligence

### Metabase
- **Repo**: [github.com/metabase/metabase](https://github.com/metabase/metabase) | AGPL-3.0 | 38k stars
- **Stack**: Clojure (server), React (frontend), H2/Postgres/MySQL (app DB)
- **AI Integration Points**:
  - Built-in NL query: "Show me revenue by country last quarter" → SQL
  - Embedding API: embed AI-generated dashboards in enterprise portals
  - REST API: agents can read questions, cards, and dashboards
  - AI agents can generate Metabase questions via API and embed results in chat
- **Globant Use Case**: Build AI analytics copilot on top of Metabase for client reporting teams

---

## No-Code / Low-Code Enterprise Apps

### NocoBase
- **Repo**: [github.com/nocobase/nocobase](https://github.com/nocobase/nocobase) | Apache-2.0 | 15k stars
- **Stack**: Node.js, React, PostgreSQL
- **Best For**: Custom internal tools, CRM/ERP extensions, workflow apps without heavy dev
- **AI Integration Points**:
  - AI plugin system: embed LLM agents in workflow nodes
  - Apache-2.0 license — cleanest for Globant to build commercial products
  - REST API for all data models
  - Use as frontend for ERPNext/Odoo with AI overlay layer
- **Globant Use Case**: Rapid custom enterprise app development with AI-driven workflow automation

---

## How to Layer AI on Any Platform

```
1. CONNECT: Expose platform via REST API / MCP server / Webhooks
2. ORCHESTRATE: n8n (automation layer) or LangGraph (stateful agents) as middleware
3. GENERATE: RAGFlow for document Q&A; Dify for GenAI workflows; Flowise for quick PoC
4. ACT: Agents read platform state → reason → write back (create ticket, update CRM, post message)
5. GOVERN: LangFuse for tracing; MLflow for model management; EU AI Act audit log
```

### Stack Recommendation by Client Size

| Client Size | ERP | CRM | AI Layer | Automation |
|-------------|-----|-----|----------|------------|
| SME (<200 employees) | ERPNext + Frappe HR | Twenty CRM | Dify (self-hosted) | n8n |
| Mid-market (200–2000) | Odoo | SuiteCRM or Twenty | Dify + RAGFlow | n8n + LangGraph |
| Enterprise (2000+) | Odoo or SAP (custom) | SuiteCRM or Salesforce | MAF + RAGFlow | Microsoft Agent Framework + n8n |
