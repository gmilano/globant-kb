# 🏭 Vertical Solutions — Enterprise AI

> Existing open-source enterprise platforms customizable with AI.
> Model: start with something functional, add an agentic layer on top.
> Last updated: 2026-07-13 (v4)

## Core Enterprise Platforms (ERP / CRM / ITSM / Collab)

| Platform | Repo | License | Stars | Stack | AI Opportunity |
|----------|------|---------|-------|-------|----------------|
| **Odoo** | [odoo/odoo](https://github.com/odoo/odoo) | LGPL-3.0 | ~52.8k | Python/PostgreSQL | 50+ modules (CRM, Inventory, Manufacturing, HR, Accounting); MCP server enables any AI agent to read/write ERP data; AI Studio in v18 adds native LLM triggers |
| **ERPNext** | [frappe/erpnext](https://github.com/frappe/erpnext) | GPL-3.0 | ~36.4k | Python/MariaDB (Frappe) | Full ERP with REST API; AI layer via [erpnext-mcp-server](https://github.com/rakeshgangwar/erpnext-mcp-server) — purchase orders, inventory, HR as agent tools |
| **Twenty CRM** | [twentyhq/twenty](https://github.com/twentyhq/twenty) | AGPL-3.0 | ~45.5k | TypeScript/React/PostgreSQL | Modern developer CRM; native MCP server for Claude/GPT integration; fastest-growing OSS CRM; self-hosted free, cloud $9/user/mo |
| **Frappe Framework** | [frappe/frappe](https://github.com/frappe/frappe) | MIT | ~10.4k | Python/JS | Low-code web framework under ERPNext; MIT license; build custom ERP/CRM modules with AI hooks |
| **Mattermost** | [mattermost/mattermost](https://github.com/mattermost/mattermost) | AGPL-3.0 | ~32k | Go/React | Self-hosted Slack alternative; AI Copilot feature (MIT plugin); enterprise teams can deploy LLM assistants inside the chat |
| **Nextcloud** | [nextcloud/server](https://github.com/nextcloud/server) | AGPL-3.0 | ~29k | PHP | Enterprise file/collaboration; AI assistant (text generation, summarization) built into Nextcloud AI suite |

## Workflow Automation Platforms

| Platform | Repo | License | Stars | Stack | AI Opportunity |
|----------|------|---------|-------|-------|----------------|
| **n8n** | [n8n-io/n8n](https://github.com/n8n-io/n8n) | Apache-2.0 | ~182k | TypeScript | 400+ integrations + native AI nodes (Claude, GPT-4, Gemini, Ollama); self-hosted; wire AI into any enterprise workflow |
| **Dify** | [langgenius/dify](https://github.com/langgenius/dify) | Apache-2.0 | ~136k | Python/TypeScript | Production AI workflow platform; RAG pipeline, model routing, agentic workflows, built-in observability; 100k+ enterprise deployments |
| **Temporal** | [temporalio/temporal](https://github.com/temporalio/temporal) | MIT | ~12k | Go | Durable execution for long-running agentic workflows; survives outages; mandatory for enterprise AI tasks >5min |
| **Prefect** | [PrefectHQ/prefect](https://github.com/PrefectHQ/prefect) | Apache-2.0 | ~16k | Python | @flow/@task decorator orchestration; production scheduling + observability for AI data pipelines |

## Specialized Enterprise Verticals

| Platform | Repo | License | Stars | Domain | AI Opportunity |
|----------|------|---------|-------|--------|----------------|
| **Metabase** | [metabase/metabase](https://github.com/metabase/metabase) | AGPL-3.0 | ~41k | BI/Analytics | Add natural language query layer (LLM → SQL) via MCP; AI-powered dashboard generation |
| **Superset** | [apache/superset](https://github.com/apache/superset) | Apache-2.0 | ~65k | BI/Analytics | Apache project; REST API enables AI agents to generate charts and run SQL queries programmatically |
| **GLPI** | [glpi-project/glpi](https://github.com/glpi-project/glpi) | GPL-2.0 | ~4.5k | ITSM/Helpdesk | Self-hosted IT service management; AI layer for ticket triage, auto-assignment, and resolution suggestion |
| **Frappe HR** | [frappe/hrms](https://github.com/frappe/hrms) | GPL-3.0 | ~1.5k | HR/Payroll | MIT-licensed Frappe framework; AI agents for leave approval, payroll processing, performance reviews |

## How to Add AI to Any Platform

```
1. Expose data via REST API or MCP server
          ↓
2. Configure AI agent with tool access (Claude + MCP or LangGraph + tools)
          ↓
3. Build agentic workflows (n8n or Dify for visual, LangGraph for code)
          ↓
4. Add approval checkpoints (HITL via LangGraph interrupt() or n8n wait node)
          ↓
5. Deploy observability (OpenTelemetry → Grafana; CrewAI enterprise metrics)
```

## License Quick Reference for Enterprise Legal

| License | Can Customize? | Can Keep Private? | Globant Recommendation |
|---------|---------------|-------------------|------------------------|
| MIT | ✅ Yes | ✅ Yes | Green light |
| Apache-2.0 | ✅ Yes | ✅ Yes | Green light |
| LGPL-3.0 (Odoo) | ✅ Yes (modules) | ✅ Yes (modules are LGPL-OK) | Green light for Odoo modules |
| AGPL-3.0 | ⚠️ Yes but must open-source if you expose via network | ❌ Must open SaaS | Consult legal |
| GPL-3.0 | ⚠️ Copyleft | ❌ Modifications must be GPL | Consult legal |
