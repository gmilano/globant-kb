# Vertical Platforms — Technology Industry

> Customizable open source platforms to add AI on top of.
> Strategy: start with something working, layer in the agentic capability.
> Last updated: 2026-07-10 (v7)

## LLM App & Agent Platforms

| Platform | License | URL | Stack | Use Case |
|----------|---------|-----|-------|----------|
| Dify | Apache-2.0 | [github.com/langgenius/dify](https://github.com/langgenius/dify) | Python + Next.js + PostgreSQL | End-to-end LLM app: chatbots, RAG, agent workflows, API backend; 144k★; 50+ tool integrations |
| Flowise | Apache-2.0 | [github.com/FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) | Node.js + React | Visual LangChain builder; drag-and-drop agent design; best for rapid RAG prototyping; 51k★ |
| n8n | Fair-code | [github.com/n8n-io/n8n](https://github.com/n8n-io/n8n) | Node.js + Vue | Workflow automation with 400+ integrations + AI nodes; HITL; self-hosted; 182k★ |
| Langflow | MIT | [github.com/langflow-ai/langflow](https://github.com/langflow-ai/langflow) | Python + React | Visual LangChain/LlamaIndex builder; DataStax-backed; Docker-deployable; API-first |
| DeerFlow | Apache-2.0 | [github.com/bytedance/deer-flow](https://github.com/bytedance/deer-flow) | Python + LangGraph | Super-agent harness; sandboxed FS + memory + skills + sub-agents; best for long-horizon tasks; ~47k★ |
| Cline | Apache-2.0 | [github.com/cline/cline](https://github.com/cline/cline) | TypeScript | Coding agent SDK + VS Code/JetBrains extension + CLI; 1.5M installs; multi-agent; BYOK |

## Developer Portals & Internal Tools

| Platform | License | URL | Stack | Use Case |
|----------|---------|-----|-------|----------|
| Backstage | Apache-2.0 | [github.com/backstage/backstage](https://github.com/backstage/backstage) | Node.js + React + TypeScript | Spotify's internal developer portal; software catalog; plugin ecosystem; AI dev assistant integration layer |
| Gitea | MIT | [github.com/go-gitea/gitea](https://github.com/go-gitea/gitea) | Go + Vue | Self-hosted Git (GitHub alternative); code review + CI/CD + package registry; perfect for on-prem AI coding agent |
| Plane | AGPL-3.0 | [github.com/makeplane/plane](https://github.com/makeplane/plane) | Python + Next.js | Open source Linear/Jira alternative; issue tracking; AI sprint planning integration ready |
| Mattermost | MIT / EE | [github.com/mattermost/mattermost](https://github.com/mattermost/mattermost) | Go + React | Self-hosted team messaging; AI bot integration; webhooks; MCP server available |

## MLOps & AI Infrastructure Platforms

| Platform | License | URL | Stack | Use Case |
|----------|---------|-----|-------|----------|
| MLflow | Apache-2.0 | [github.com/mlflow/mlflow](https://github.com/mlflow/mlflow) | Python + React | End-to-end ML lifecycle: experiments, registry, serving; 30M monthly downloads; Linux Foundation |
| Kubeflow | Apache-2.0 | [github.com/kubeflow/kubeflow](https://github.com/kubeflow/kubeflow) | Python + Go + Kubernetes | ML pipelines on K8s; training operators (PyTorch, TF); Katib HPO; 33k★; CNCF |
| Label Studio | Apache-2.0 | [github.com/heartexlabs/label-studio](https://github.com/heartexlabs/label-studio) | Python + React | Data labeling platform for ML training data; supports text, images, audio, video |
| Feast | Apache-2.0 | [github.com/feast-dev/feast](https://github.com/feast-dev/feast) | Python | Feature store for ML; online + offline; supports Redis, BigQuery, Snowflake, DynamoDB |

## Observability & Operations

| Platform | License | URL | Stack | Use Case |
|----------|---------|-----|-------|----------|
| Grafana | AGPL-3.0 | [github.com/grafana/grafana](https://github.com/grafana/grafana) | Go + React | Dashboards for metrics, logs, traces; AI anomaly detection plugins; 66k★ |
| Prometheus | Apache-2.0 | [github.com/prometheus/prometheus](https://github.com/prometheus/prometheus) | Go | Metrics collection and alerting; de-facto K8s standard; base for AI alerting agents |
| OpenTelemetry | Apache-2.0 | [github.com/open-telemetry/opentelemetry-collector](https://github.com/open-telemetry/opentelemetry-collector) | Go | Unified observability standard; traces + metrics + logs; MCP server in development |
| Netdata | GPL-3.0 | [github.com/netdata/netdata](https://github.com/netdata/netdata) | C + Python | Real-time infrastructure monitoring; ML-based anomaly detection built-in; zero-config |

## Vector & Search Infrastructure

| Platform | License | URL | Stack | Use Case |
|----------|---------|-----|-------|----------|
| Qdrant | Apache-2.0 | [github.com/qdrant/qdrant](https://github.com/qdrant/qdrant) | Rust | Highest-performance vector DB; filtering; hybrid search; payload indexing; top benchmark 2026 |
| Weaviate | BSD-3 | [github.com/weaviate/weaviate](https://github.com/weaviate/weaviate) | Go | Vector + keyword hybrid; built-in ML models; GraphQL; multi-modal; MCP server available |
| Meilisearch | MIT | [github.com/meilisearch/meilisearch](https://github.com/meilisearch/meilisearch) | Rust | Fast full-text + vector hybrid search; sub-50ms; Typo tolerance; great developer UX |

## MCP Infrastructure (2026 RC Standard)

| Platform | License | URL | Use Case |
|----------|---------|-----|----------|
| modelcontextprotocol/servers | MIT | [github.com/modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | Official reference MCP servers (filesystem, GitHub, Slack, Postgres, etc.); starting point for custom servers |
| MCP TypeScript SDK | MIT | [github.com/modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk) | Build production MCP servers in TypeScript; RC-compliant; stateless + EMA + Tasks + MCP Apps |
| MCP Python SDK | MIT | [github.com/modelcontextprotocol/python-sdk](https://github.com/modelcontextprotocol/python-sdk) | Build MCP servers in Python; FastMCP decorator pattern for rapid development |

## How to Layer AI On Top (2026 Pattern)

```
1. Pick a vertical platform above as the operational foundation
2. Add MCP server to expose its APIs to AI agents (TypeScript SDK, RC-compliant)
   - Stateless: deploy behind standard load balancer (no sticky sessions)
   - EMA: enterprise-managed auth via org IdP
   - Tasks: expose long-running operations as async tasks
3. Write a CLAUDE.md + DESIGN.md for the project (context engineering)
4. Connect Dify or LangGraph as the orchestration layer
5. Wire in Claude / Gemini / Qwen3 (local) as the reasoning model
6. Deploy Cline (IDE) + DeerFlow (long-horizon tasks) + OpenHands (autonomous coding)
7. Add Grafana/Prometheus for agent observability
8. Build governance layer: cost ceilings, human-in-the-loop checkpoints, audit trails
   (prevents the 40% Gartner cancellation rate)
```
