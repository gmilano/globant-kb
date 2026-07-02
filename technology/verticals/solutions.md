# Vertical Solutions — Technology Industry

> Real platforms with open-source cores that Globant can build AI on top of

## Developer Tooling & DevOps Platforms

| Platform | Repo | License | Best For | AI Opportunity |
|----------|------|---------|----------|----------------|
| **Gitea** | [go-gitea/gitea](https://github.com/go-gitea/gitea) | MIT | Self-hosted GitHub alternative; full Git hosting, PR reviews, CI integration, issue tracking | AI code review agent on every PR (connect Aider/OpenHands to Gitea webhooks); automated issue triage agent; AI-generated release notes |
| **Drone CI** | [harness/drone](https://github.com/harness/drone) | Apache 2.0 | Lightweight CI/CD for containerized pipelines; YAML-first configuration | AI pipeline optimizer that rewrites CI YAML for speed; failed-build diagnosis agent that reads logs and proposes fixes; LLM-generated pipeline from `package.json` |
| **Netdata** | [netdata/netdata](https://github.com/netdata/netdata) | GPL-3.0 | Real-time infrastructure monitoring with 3k+ metrics collected per node | AI anomaly detection agent on top of Netdata streaming API; LLM-powered incident narrative generation from metric spikes |
| **Casdoor** | [casdoor/casdoor](https://github.com/casdoor/casdoor) | Apache 2.0 | Open-source SSO/OAuth identity platform | AI-assisted role mapping from org chart; anomalous login detection agent; automated access review agent |

## Developer Platforms / Internal Tools

| Platform | Repo | License | Best For | AI Opportunity |
|----------|------|---------|----------|----------------|
| **Appsmith** | [appsmithorg/appsmith](https://github.com/appsmithorg/appsmith) | Apache 2.0 | Low-code internal tool builder; drag-and-drop UI over any API/DB | AI widget that embeds LangChain queries into Appsmith dashboards; natural language query UI widget backed by Text2SQL agent |
| **Tooljet** | [ToolJet/ToolJet](https://github.com/ToolJet/ToolJet) | AGPL-3.0 | Low-code internal app builder; 50+ data source connectors | AI form autofill agent using company data; LLM-powered data transformation component |
| **Twenty (CRM)** | [twentyhq/twenty](https://github.com/twentyhq/twenty) | MIT | Modern open-source CRM with native MCP server; AI-agent-ready data layer | AI sales agent (Claude/GPT via MCP) that reads deal pipeline, drafts follow-ups, qualifies leads; 45.5k stars in 2026 |
| **Plane** | [makeplane/plane](https://github.com/makeplane/plane) | AGPL-3.0 | Open-source Linear/Jira alternative; project management | AI issue description generator; sprint planning agent that estimates story points from codebase analysis; automated dependency detection |

## LLM Infrastructure & MLOps

| Platform | Repo | License | Best For | AI Opportunity |
|----------|------|---------|----------|----------------|
| **Ollama** | [ollama/ollama](https://github.com/ollama/ollama) | MIT | Self-hosted local LLM server; the foundation of all private AI deployments | Deploy Ollama as the inference backend for all client-facing AI features; combine with Tabby for private coding assistant; wrap in OpenAI-compatible API for drop-in replacement |
| **LiteLLM** | [BerriAI/litellm](https://github.com/BerriAI/litellm) | MIT | Universal LLM proxy with OpenAI-compatible API; routes to 100+ providers | Model gateway for multi-vendor AI deployments; A/B testing different models; cost tracking and rate limiting across the team |
| **Langfuse** | [langfuse/langfuse](https://github.com/langfuse/langfuse) | MIT | Open-source LLM observability, tracing, and evaluation platform | Monitor all AI agent calls in production; detect prompt injection, measure latency, track cost per feature; self-hostable for enterprise |
| **Qdrant** | [qdrant/qdrant](https://github.com/qdrant/qdrant) | Apache 2.0 | High-performance vector database for embedding search | RAG knowledge bases for coding assistants (codebase search, documentation Q&A); semantic search over internal wikis and runbooks |
| **Dify** | [langgenius/dify](https://github.com/langgenius/dify) | Apache 2.0 | LLMOps platform: RAG pipeline + agent builder + workflow + monitoring | One-stop AI app platform for teams without ML expertise; 144k stars — the most-starred LLMOps platform |

## Platform Selection Guide

| Scenario | Recommended Stack |
|----------|------------------|
| Enterprise client wants internal coding assistant | Tabby (self-hosted) + Continue (VS Code) + Qdrant (codebase RAG) + Langfuse (observability) |
| Client needs AI-powered DevOps | Gitea (hosting) + Drone CI + OpenHands (PR agent) + LangGraph (pipeline orchestration) |
| Build internal tool with AI features | Appsmith or Twenty + LiteLLM gateway + LangChain agent + Langfuse tracing |
| Client wants private ChatGPT | Lobe-chat (self-hosted UI) + Ollama (local models) + Qdrant (document RAG) |
| Greenfield AI-native app | Dify (full LLMOps) + CrewAI (multi-agent logic) + Langfuse (monitoring) |
| Tech startup needs CRM + AI | Twenty (MIT CRM with MCP server) + Claude/GPT via MCP + LangGraph for complex workflows |
