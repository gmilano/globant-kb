# Vertical Platforms — Technology Infrastructure

> Open-source platforms that can be customized with AI agents on top.
> Model: start from something functional → add agentic layer.
> Updated: 2026-07-09.

## Developer Platforms & Source Control

| Platform | License | Stars | Stack | AI Customization Potential |
|----------|---------|-------|-------|---------------------------|
| [Gitea](https://github.com/go-gitea/gitea) | MIT | 46k | Go | Self-hosted GitHub alternative. Add AI code review bots via webhooks + MCP. Active Globant case study for air-gapped clients. |
| [Forgejo](https://codeberg.org/forgejo/forgejo) | MIT | 8k | Go | Gitea fork, community-led. Slightly more governance-friendly for enterprises. Drop-in Gitea replacement. |
| [GitLab CE](https://gitlab.com/gitlab-org/gitlab-foss) | MIT | 25k | Ruby/Vue | Full DevOps platform. Open core (CE = MIT). Native CI/CD, issues, MR reviews. Best base for AI-augmented DevOps platform. |

## DevOps & Infrastructure

| Platform | License | Stars | Stack | AI Customization Potential |
|----------|---------|-------|-------|---------------------------|
| [Coolify](https://github.com/coollabsio/coolify) | AGPL-3.0 | 39k | PHP/Livewire | Self-hosted Heroku/Netlify/Vercel. Add AI deployment advisor, cost optimizer. |
| [Dokku](https://github.com/dokku/dokku) | MIT | 30k | Bash | Smallest PaaS on a single server. MCP server wrapper for AI-driven deployments. |
| [Caprover](https://github.com/caprover/caprover) | Apache-2.0 | 14k | Node.js | App and database deployment platform. REST API makes it easy to wrap with AI agents. |
| [n8n](https://github.com/n8n-io/n8n) | Fair Code (custom) | 52k | Node.js/Vue | Workflow automation platform. Thousands of integrations, self-hosted, MCP-compatible in 2026. |

## Observability & Monitoring

| Platform | License | Stars | Stack | AI Customization Potential |
|----------|---------|-------|-------|---------------------------|
| [Grafana](https://github.com/grafana/grafana) | AGPL-3.0 | 65k | Go/React | Observability and dashboards. Add AI anomaly narration agent via MCP server on Grafana API. |
| [Prometheus](https://github.com/prometheus/prometheus) | Apache-2.0 | 58k | Go | Metrics collection and alerting. Power AI-driven alert triage agents with PromQL + LLM. |
| [Netdata](https://github.com/netdata/netdata) | GPL-3.0 | 74k | C/Python | Real-time infrastructure monitoring. ML-based anomaly detection built in since v1.35. |
| [OpenTelemetry Collector](https://github.com/open-telemetry/opentelemetry-collector) | Apache-2.0 | 4.9k | Go | Vendor-agnostic telemetry pipeline. Foundation for AI-powered observability agents. |
| [Jaeger](https://github.com/jaegertracing/jaeger) | Apache-2.0 | 21k | Go | Distributed tracing. Wire AI root-cause analysis agent via Jaeger API + LangGraph. |

## Container & Registry

| Platform | License | Stars | Stack | AI Customization Potential |
|----------|---------|-------|-------|---------------------------|
| [Harbor](https://github.com/goharbor/harbor) | Apache-2.0 | 25k | Go | Enterprise container registry. Add AI-powered vulnerability prioritization via Harbor API. |
| [Portainer CE](https://github.com/portainer/portainer) | Zlib | 32k | Go/Angular | Container management UI. REST API enables AI agent for container lifecycle management. |

## MLOps Platforms

| Platform | License | Stars | Stack | AI Customization Potential |
|----------|---------|-------|-------|---------------------------|
| [MLflow](https://github.com/mlflow/mlflow) | Apache-2.0 | 20k | Python | Experiment tracking, model registry, deployment. 100% OSS forever. Core of most ML platforms. |
| [Kubeflow](https://github.com/kubeflow/kubeflow) | Apache-2.0 | 14.5k | Python/K8s | ML pipelines on Kubernetes. Add AI pipeline optimizer agent via KFP SDK. |
| [ZenML](https://github.com/zenml-io/zenml) | Apache-2.0 | 4.5k | Python | MLOps framework with stack abstraction. Good for AI-native pipeline orchestration. |
| [DVC](https://github.com/iterative/dvc) | Apache-2.0 | 14.2k | Python | Data and model versioning. Pair with AI data quality agent for automated checks. |

## Project Management (AI-Augmentable)

| Platform | License | Stars | Stack | AI Customization Potential |
|----------|---------|-------|-------|---------------------------|
| [Plane](https://github.com/makeplane/plane) | AGPL-3.0 | 32k | Python/Next.js | Open-source Linear/Jira alternative. REST API + webhooks for AI sprint planning agent. |
| [Taiga](https://github.com/taigaio/taiga-back) | AGPL-3.0 | 2.6k | Python/Django | Agile PM tool. Add AI retrospective and velocity prediction agents. |
| [Mattermost](https://github.com/mattermost/mattermost) | AGPL-3.0 | 31k | Go/React | Open-source Slack alternative. MCP-server for AI chatbot integrations. Air-gap friendly. |

## Recommended Starting Stack for AI-Augmented DevOps Platform

```
GitLab CE          → Source control, CI/CD, MR workflows
      +
Plane              → Issue tracking and sprint planning
      +
MLflow + Kubeflow  → ML experimentation and deployment
      +
Prometheus + Grafana → Observability
      +
OpenHands / CrewAI → Agentic layer (code review, deployment, triage)
      +
MCP SDK            → Tool integration glue
```

This stack is fully MIT/Apache-2.0/AGPL and can be deployed on-premise — important for LATAM enterprise clients with data sovereignty requirements.

---
*See `compose/patterns.md` for concrete wiring recipes.*
