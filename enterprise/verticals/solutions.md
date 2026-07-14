# Enterprise Vertical Platforms — Open Source

> Real platforms: fork, deploy, add AI on top. Customizable with agentic layer.
> Model: Start with a working system, then add the agentic layer above it.
> Last updated: 2026-07-14

## ERP Platforms

| Platform | Repo | License | Stars | Stack | AI Readiness | Use Case |
|----------|------|---------|-------|-------|--------------|----------|
| ERPNext | [frappe/erpnext](https://github.com/frappe/erpnext) | GPL-3.0 | 36k | Python/Frappe | Via marketplace: NextAI, ChatNext, changAI, MCP bridges | Full ERP: accounting, inventory, sales, HR, manufacturing, CRM. LATAM strong adoption. Fork-and-customize. |
| Odoo 18 | [odoo/odoo](https://github.com/odoo/odoo) | LGPL-3.0 (Community) | 52k | Python/JS | Community: no native AI. Enterprise ($24.90/user): AI sales forecasting, smart assistant | World's most popular open ERP. 80+ modules, 40k+ marketplace apps. Community edition fully LGPL. |
| Frappe Framework | [frappe/frappe](https://github.com/frappe/frappe) | MIT | 10k | Python/JS | Native REST API; custom doctypes; build AI integrations directly | Low-code framework powering ERPNext. MIT licensed. Best starting point for custom enterprise apps. |
| Apache OFBiz | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Apache-2.0 | 1.1k | Java | REST API ready for AI layer | Java ERP + CRM + e-commerce + supply chain. Maintained by Apache Software Foundation. Enterprise-grade SCM. |
| NocoBase | [nocobase/nocobase](https://github.com/nocobase/nocobase) | Apache-2.0 | 15k | Node.js/React | AI-native; plugin-driven; data-model driven design | No-code/low-code ERP builder. All source code open. Plugin architecture for AI extensions. Rising fast. |

## CRM Platforms

| Platform | Repo | License | Stars | Stack | AI Readiness | Use Case |
|----------|------|---------|-------|-------|--------------|----------|
| Twenty | [twentyhq/twenty](https://github.com/twentyhq/twenty) | AGPL-3.0 | 45k | Node.js/React/PostgreSQL | Native MCP server (Claude/ChatGPT/Cursor OOB); workflow automation engine | Modern CRM. Free self-hosted. $9/user/month cloud. Best CRM for AI-agent integration in 2026. |
| SuiteCRM | [salesagility/SuiteCRM](https://github.com/salesagility/SuiteCRM) | AGPL-3.0 | 4k | PHP | REST API; AI via custom modules | SugarCRM fork. 1M+ deployments. Feature-rich sales/service/marketing. Customizable with AI modules. |

## Work Management & Productivity

| Platform | Repo | License | Stars | Stack | AI Readiness | Use Case |
|----------|------|---------|-------|-------|--------------|----------|
| Plane | [makeplane/plane](https://github.com/makeplane/plane) | AGPL-3.0 | 27k | Python/Next.js | AI assist features; REST API | Open-source Jira alternative. Project + sprint + issue tracking. Enterprise self-hosted. |
| AppFlowy | [AppFlowy-IO/AppFlowy](https://github.com/AppFlowy-IO/AppFlowy) | AGPL-3.0 | 58k | Rust/Flutter | AI-native sidebar; local LLM support; plugin API | Open Notion alternative. AI writing assistant built-in. Self-hosted, private-data first. |
| Mattermost | [mattermost/mattermost](https://github.com/mattermost/mattermost) | AGPL-3.0 | 30k | Go/React | AI agents via plugin system; MCP integration | Slack alternative for enterprise. Team messaging + workflow automation. Self-hostable. |

## BI & Analytics

| Platform | Repo | License | Stars | Stack | AI Readiness | Use Case |
|----------|------|---------|-------|-------|--------------|----------|
| Metabase | [metabase/metabase](https://github.com/metabase/metabase) | AGPL-3.0 | 38k | Clojure/React | Metabot natural-language querying; AI-powered insights | Self-service BI. Natural language to SQL. Connect to any SQL database or warehouse. |
| Apache Superset | [apache/superset](https://github.com/apache/superset) | Apache-2.0 | 62k | Python/React | SQL Lab + AI assist; REST API for agent integration | Enterprise data exploration + dashboards. Apache foundation. Zero vendor lock-in. |

## Workflow Automation (No-Code Layer)

| Platform | Repo | License | Stars | Stack | AI Readiness | Use Case |
|----------|------|---------|-------|-------|--------------|----------|
| n8n | [n8n-io/n8n](https://github.com/n8n-io/n8n) | Apache-2.0 | 182k | Node.js | AI agent nodes + LangChain built-in; 400+ integrations | Enterprise workflow automation with native AI agent support. Self-hostable. |
| Dify | [langgenius/dify](https://github.com/langgenius/dify) | Apache-2.0 | 136k | Python/Next.js | Full LLMOps: RAG + agents + observability | Best for chat-first RAG apps. LLM-agnostic (OpenAI, Anthropic, local). |
| Langflow | [langflow-ai/langflow](https://github.com/langflow-ai/langflow) | MIT | 147k | Python | Native MCP; visual + REST API deployment | Python-first visual agent builder. Best for RAG + multi-agent enterprise flows. |

## How to Add an Agentic Layer

```
Step 1: Deploy the vertical platform (ERPNext / Odoo / Twenty)
         ↓ Self-host or managed cloud
Step 2: Expose data via MCP or REST
         ↓ Use MCP server (Twenty native / erpnext-mcp-server / custom)
Step 3: Build agent workflows
         ↓ LangGraph (HITL) / CrewAI (role-based) / MAF (Microsoft shops)
Step 4: Add orchestration layer
         ↓ n8n (enterprise) / Langflow (Python) / Dify (RAG-first)
Step 5: Add conversational UI
         ↓ OpenClaw (omnichannel) / custom web chat / Mattermost bot
```

---
*Auto-updated by the Globant AI Studios ingest pipeline.*
