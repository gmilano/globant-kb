# Foundational Repos — Enterprise AI

> Core platforms and frameworks for building enterprise AI solutions.
> Priority: MIT / Apache 2.0 / LGPL — safe for commercial customization.
> Last updated: 2026-07-07

## Enterprise Platforms (ERP / CRM / Collaboration)

| Repo | License | Stars | Description | AI Readiness |
|------|---------|-------|-------------|--------------|
| [odoo/odoo](https://github.com/odoo/odoo) | LGPL-3.0 | 52k | Full business suite: CRM, inventory, accounting, HR, e-commerce, manufacturing. Modular architecture — add AI via Odoo Apps or custom modules. | REST API + webhooks; AI modules available |
| [frappe/erpnext](https://github.com/frappe/erpnext) | GPL-3.0 | 36k | Free, open-source ERP covering accounting, inventory, HR, payroll, manufacturing, and supply chain. Built on Frappe Framework. MCP server (rakeshgangwar/erpnext-mcp-server) enables direct AI agent access. | MCP server, REST API, webhooks |
| [frappe/frappe](https://github.com/frappe/frappe) | MIT | 10k | Low-code Python + JS web framework powering ERPNext, Frappe HR, and 100+ Frappe Apps. DocType model makes schema changes AI-scriptable. | MIT license — best for AI integration layer |
| [twentyhq/twenty](https://github.com/twentyhq/twenty) | AGPL-3.0 | 45k | Modern open-source CRM with native MCP server (Cloud). GraphQL + REST API-first. AI agents can query, create, update CRM records via natural language. Top pick for AI-native CRM stack. | Native MCP, GraphQL, AI-first design |
| [salesagility/SuiteCRM](https://github.com/salesagility/SuiteCRM) | AGPL-3.0 | 4k | World's most-downloaded open-source CRM (~2M downloads, 5M users). Mature feature set: territory management, quote generation, advanced reporting. No native AI but strong REST API. | REST API; AI via custom modules |

## Collaboration & Communication

| Repo | License | Stars | Description | AI Readiness |
|------|---------|-------|-------------|--------------|
| [mattermost/mattermost](https://github.com/mattermost/mattermost) | AGPL-3.0 | 29k | Self-hosted team messaging platform. Slash commands, webhooks, plugin system. AI bots and agents can be deployed as plugins or webhook integrations. | Webhook bots, plugin AI agents |
| [nextcloud/server](https://github.com/nextcloud/server) | AGPL-3.0 | 26k | Self-hosted file sync and collaboration. AI Assistant app (Nextcloud AI) integrates LLMs for document Q&A, summarization, and generation directly in the UI. | Native AI Assistant app |

## ITSM & Operations

| Repo | License | Stars | Description | AI Readiness |
|------|---------|-------|-------------|--------------|
| [glpi-project/glpi](https://github.com/glpi-project/glpi) | GPL-3.0 | 4k | Enterprise ITSM platform — ticketing, asset management, change management, CMDB. 200k+ active deployments. AI plugins for ticket classification and auto-assignment. | REST API; AI ticket routing plugins |
| [frappe/hrms](https://github.com/frappe/hrms) | GPL-3.0 | 2k | Open-source HR and payroll system built on Frappe. Recruitment, onboarding, leave/attendance, expense management, payroll, performance reviews. AI-scriptable via ERPNext MCP server. | Frappe API; AI resume screening |

## Business Intelligence & Data

| Repo | License | Stars | Description | AI Readiness |
|------|---------|-------|-------------|--------------|
| [metabase/metabase](https://github.com/metabase/metabase) | AGPL-3.0 | 38k | Open-source BI and data visualization. Natural language queries ("ask a question") built in. Embed dashboards in enterprise portals. AI agents can query Metabase APIs. | NL queries built-in, REST API |
| [nocobase/nocobase](https://github.com/nocobase/nocobase) | Apache-2.0 | 15k | No-code/low-code enterprise platform for building CRM, ERP, and workflow apps with a plugin architecture. AI-driven data model builder, embed LLM agents in workflows. | Apache-2.0; AI plugin system |

## Agent Orchestration Layer

| Repo | License | Stars | Description | AI Readiness |
|------|---------|-------|-------------|--------------|
| [langgenius/dify](https://github.com/langgenius/dify) | Apache-2.0 | 144k | Visual GenAI application platform — workflow builder, RAG pipelines, prompt management, multi-model support. Deploy as self-hosted or cloud. REST API for embedding in enterprise systems. | Purpose-built for enterprise AI |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | AGPL-3.0 | 150k+ | Self-hosted workflow automation with 400+ integrations and native AI nodes (ReAct agents, memory, LLM chains). The integration glue between enterprise systems and AI models. | Native AI nodes, self-hosted |

---
*See also: `verticals/solutions.md` for full platform profiles with customization guides.*
