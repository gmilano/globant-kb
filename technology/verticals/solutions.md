# 🏭 Vertical Solutions — Technology Industry

> Full vertical platforms that can be customized with AI layers on top.
> Model: start with something functional, add agentic intelligence above it.
> Last updated: 2026-07-03

## Recommended Platforms

| Platform | License | Repo | Stack | Use Case | AI Extension Point |
|----------|---------|------|-------|----------|--------------------|
| [Backstage](https://backstage.io) | Apache-2.0 | [backstage/backstage](https://github.com/backstage/backstage) | TypeScript, React, Node | Internal Developer Portal — service catalog, API docs, runbooks | Add AI assistant plugin: NL queries over service catalog, AI-generated runbooks, incident root cause analysis |
| [Gitea](https://gitea.io) | MIT | [go-gitea/gitea](https://github.com/go-gitea/gitea) | Go | Self-hosted Git service (GitHub alternative). Lightweight, fast, 40k+ stars. | Add AI code review agent (OpenHands/SWE-agent) as Gitea webhook handler. Auto-triage issues. |
| [n8n](https://n8n.io) | Source-available ELv2 | [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript, Vue | Workflow automation — 400+ integrations, visual builder | Native AI nodes: LLM calls, AI agents, vector stores. Build agentic automation on existing n8n flows. |
| [Grafana](https://grafana.com) | AGPL-3.0 | [grafana/grafana](https://github.com/grafana/grafana) | Go, TypeScript | Observability dashboards. Metrics, logs, traces. Industry standard. | AI anomaly detection plugin, NL query interface ("show me errors from the auth service last hour"), alert summarization |
| [Supabase](https://supabase.com) | Apache-2.0 | [supabase/supabase](https://github.com/supabase/supabase) | TypeScript, Go, Postgres | Open source Firebase — database, auth, storage, realtime, edge functions | Native pgvector support: RAG, semantic search. AI-ready backend for any app. 80k+ stars. |
| [Dify](https://dify.ai) | Apache-2.0 | [langgenius/dify](https://github.com/langgenius/dify) | Python, TypeScript | LLMOps platform — RAG + agents + monitoring | Starting point for any client AI app. Customize workflows, add domain tools, white-label UI. |
| [Gitpod](https://gitpod.io) | AGPL-3.0 | [gitpod-io/gitpod](https://github.com/gitpod-io/gitpod) | TypeScript, Go | Cloud development environments. Browser-based VSCode with workspace automation. | Add AI coding agent (Aider/OpenHands) to workspace init. Pre-warm AI context with codebase docs. |
| [Harbor](https://goharbor.io) | Apache-2.0 | [goharbor/harbor](https://github.com/goharbor/harbor) | Go | Enterprise container registry — security scanning, RBAC, replication | AI-driven vulnerability triage agent: scan reports → priority ranking → automated ticket creation |
| [Twenty CRM](https://twenty.com) | AGPL-3.0 | [twentyhq/twenty](https://github.com/twentyhq/twenty) | TypeScript, React | Modern open source CRM, Salesforce alternative. Metadata-driven, API-first. | AI sales agent: auto-enrich contacts, draft emails, predict churn, summarize deal history. 45k+ stars. |
| [Odoo](https://odoo.com) | LGPL-3.0 | [odoo/odoo](https://github.com/odoo/odoo) | Python, JavaScript | Full ERP + CRM suite. Modules for HR, accounting, inventory, sales. 40k+ stars. | AI procurement agent, AI HR assistant, document AI for invoices. Use Odoo as data backbone, layer agents on top. |

## How to Add AI to These Platforms

### Pattern A: Webhook Agent
1. Platform emits event (PR opened, alert triggered, ticket created)
2. Webhook hits your AI orchestrator (LangGraph/CrewAI)
3. Agent analyzes context, takes action (comments, patches, escalates)
4. Result written back via platform API

### Pattern B: AI Plugin/Extension
1. Build platform-native plugin (Backstage plugin, Grafana plugin, Gitea webhook)
2. Plugin calls LLM API or local vLLM endpoint
3. Results rendered in platform native UI
4. Zero friction for developers — AI inside the tool they already use

### Pattern C: LLMOps Wrapper (Dify)
1. Deploy Dify with platform data sources (Gitea API, Grafana metrics, Supabase DB)
2. Configure RAG over platform docs/runbooks
3. Expose conversational interface to developers
4. Log everything in Langfuse for continuous improvement

### Pattern D: SDK Integration (OpenHands SDK)
1. Integrate OpenHands software-agent-sdk into CI/CD pipeline
2. On test failure: agent reads logs, identifies root cause, proposes fix
3. Human approves → auto-commit and re-run
4. Full audit trail in Langfuse
