# Vertical Solutions — Technology

> Existing open source platforms that can be customized with AI. Strategy: fork a working system, add agentic layer on top.
> Last updated: 2026-07-11 (v8)

## Platform Recommendations

| Platform | License | URL | Stack | Use Case | AI Opportunity |
|----------|---------|-----|-------|----------|----------------|
| **Gitea** | MIT | [github.com/go-gitea/gitea](https://github.com/go-gitea/gitea) | Go, SQLite/Postgres | Self-hosted GitHub alternative; 45k stars | AI code review agent as Gitea Action; PR summarization; issue triage bot |
| **Backstage** | Apache-2.0 | [github.com/backstage/backstage](https://github.com/backstage/backstage) | TypeScript, React | Spotify's developer portal; software catalog, TechDocs | AI service discovery; natural-language IDP queries; auto-documentation |
| **Plane** | AGPL-3.0 | [github.com/makeplane/plane](https://github.com/makeplane/plane) | Next.js, Python/Django | Open source Jira alternative; 30k stars | AI sprint planning agent; automated issue creation from Slack/GitHub |
| **Mattermost** | Apache-2.0 | [github.com/mattermost/mattermost](https://github.com/mattermost/mattermost) | Go, React | Self-hosted Slack alternative | AI incident response bot; on-call routing; meeting summarizer |
| **OpenProject** | GPL-3.0 | [github.com/opf/openproject](https://github.com/opf/openproject) | Ruby on Rails, Angular | Enterprise project management; Gantt, Agile, Scrum | AI project risk analyzer; resource optimization agent; auto-reporting |
| **Woodpecker CI** | Apache-2.0 | [github.com/woodpecker-ci/woodpecker](https://github.com/woodpecker-ci/woodpecker) | Go, Vue | Lightweight Drone CI fork; YAML pipeline, Docker | AI pipeline optimizer; auto-parallelization; failure root-cause analysis |
| **OpenTofu** | MPL-2.0 | [github.com/opentofu/opentofu](https://github.com/opentofu/opentofu) | Go, HCL | Community Terraform replacement; CNCF sandbox | AI IaC generator from natural language; drift detection agent; cost optimizer |
| **Prometheus + Grafana** | Apache-2.0 | [github.com/prometheus/prometheus](https://github.com/prometheus/prometheus) | Go, React | Time-series monitoring; 55k stars | AIOps anomaly detection; auto-alert tuning; LLM-powered runbook execution |
| **Dify** | MIT | [github.com/langgenius/dify](https://github.com/langgenius/dify) | Python, Next.js | LLM app platform; visual pipeline, RAG; 144k stars | The platform itself — deploy as internal AI app hub for clients |
| **Ollama** | MIT | [github.com/ollama/ollama](https://github.com/ollama/ollama) | Go, C++ | Local LLM runtime; OpenAI-compatible API | On-prem AI inference layer; removes cloud dependency for sensitive data |

## How to Customize with AI

### Pattern A — Add MCP Server to Existing Platform
1. Deploy the platform (Gitea, Backstage, Plane, etc.) via Docker Compose
2. Implement an MCP server that wraps platform APIs (REST/GraphQL → MCP tools)
3. Connect to Claude Code / OpenHands / Cline via MCP configuration
4. Agents can now read issues, create PRs, update tickets autonomously

### Pattern B — Embed Agentic Layer via Webhook
1. Platform emits webhooks on events (PR opened, issue created, deploy failed)
2. Agent service (OpenHands / Dify workflow) receives webhook → analyzes context
3. Agent writes back to platform via API (post comment, assign label, trigger action)
4. No platform fork required — runs alongside existing installation

### Pattern C — Replace Manual Workflows with Agent
1. Identify high-volume manual tasks (code review, release notes, sprint grooming)
2. Build CrewAI or LangGraph crew that replicates the workflow
3. Connect to platform via existing APIs or MCP servers
4. Deploy as autonomous scheduled job or triggered by platform event

---
*See also: `compose/patterns.md` for concrete wiring recipes.*
