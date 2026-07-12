# Technology Vertical Platforms — AI-Ready

> Existing open-source platforms customizable with AI.
> Model: start with something functional, add an agentic layer on top.
> Last updated: 2026-07-12

## Developer Tooling Platforms

| Platform | License | URL | Stack | AI Use Case |
|----------|---------|-----|-------|-------------|
| Gitea | MIT | [go-gitea/gitea](https://github.com/go-gitea/gitea) | Go, SQLite/Postgres | Self-hosted Git server. Add AI PR review (OpenHands/SWE-agent) + code summarization on top. Enterprise alternative to GitHub for air-gapped clients. |
| GitLab CE | MIT | [gitlab-org/gitlab](https://github.com/gitlab-org/gitlab-foss) | Ruby on Rails, React | Full DevSecOps platform. AI Duo integration hooks. Add Claude for MR review, pipeline generation, vulnerability triage. |
| Zed Editor | GPL-3.0 | [zed-industries/zed](https://github.com/zed-industries/zed) | Rust | AI-native code editor v1.0 (April 2026). Built-in Agent Panel, Zeta2 local completion model, Ollama support. <500ms cold start, <2ms keystroke latency. $32M Sequoia funding. |
| Jenkins | MIT | [jenkinsci/jenkins](https://github.com/jenkinsci/jenkins) | Java | Ubiquitous CI/CD. Add LLM plugin for pipeline-as-code generation, test failure root cause analysis. |
| Drone CI | Apache-2.0 | [harness/drone](https://github.com/harness/drone) | Go | Lightweight container-native CI. Simpler to instrument with AI agents than Jenkins. |

## Spec-Driven Development Platforms

| Platform | License | URL | Stack | AI Use Case |
|----------|---------|-----|-------|-------------|
| GitHub Spec-Kit | MIT | [github/spec-kit](https://github.com/github/spec-kit) | Node.js CLI | Spec-Driven Development toolkit. `specify` CLI + templates. Agent-agnostic (30+ agents). The production antidote to vibe coding — prescribes specify → plan → tasks → implement. |
| Amazon Kiro (CLI) | Proprietary* | Amazon Kiro | TypeScript | Spec-native IDE (GA May 7, 2026). *Proprietary but worth knowing as the spec-driven paradigm's commercial flagship. |

## Persistent Memory & Agent Platforms

| Platform | License | URL | Stack | AI Use Case |
|----------|---------|-----|-------|-------------|
| Hermes Agent | MIT | [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python, SQLite | 3-tier persistent memory agent (holographic FTS5 + semantic + episodic). No vector DB required. Self-hosted on $5 VPS. |
| OpenClaw | MIT | [openclaw/openclaw](https://github.com/openclaw/openclaw) | Multi-platform | Local-first AI assistant with 50+ integrations. Non-profit foundation governance. Ideal for LATAM private deployments. |
| Dify | Apache-2.0 | [langgenius/dify](https://github.com/langgenius/dify) | Python/Docker | Low-code LLM app + agent platform. Visual workflow builder, knowledge base RAG, MCP integration. 10k+ enterprise deployments. |

## MLOps & AI Engineering Platforms

| Platform | License | URL | Stack | AI Use Case |
|----------|---------|-----|-------|-------------|
| MLflow | Apache-2.0 | [mlflow/mlflow](https://github.com/mlflow/mlflow) | Python | Experiment tracking, model registry, AI gateway for routing LLM calls. Standard for Globant ML projects. |
| Kubeflow | Apache-2.0 | [kubeflow/kubeflow](https://github.com/kubeflow/kubeflow) | Kubernetes, Python | End-to-end ML pipeline platform on K8s. AI-driven hyperparameter optimization via Katib. |
| Prefect | Apache-2.0 | [PrefectHQ/prefect](https://github.com/PrefectHQ/prefect) | Python | Data/AI pipeline orchestration. Native AI task automation, observability built in. |
| Apache Airflow | Apache-2.0 | [apache/airflow](https://github.com/apache/airflow) | Python | Workflow scheduling. Add LLM-powered DAG generation + anomaly detection in pipeline runs. |

## Observability Platforms

| Platform | License | URL | Stack | AI Use Case |
|----------|---------|-----|-------|-------------|
| OpenObserve | Apache-2.0 | [openobserve/openobserve](https://github.com/openobserve/openobserve) | Rust, Vue.js | Unified logs/metrics/traces. SQL + PromQL. Ranked #1 open-source obs platform 2026. Add AI anomaly detection + root cause agent. |
| Grafana | AGPL-3.0 | [grafana/grafana](https://github.com/grafana/grafana) | Go, TypeScript | Visualization. AI-assisted dashboard generation in Grafana 11+. Works with any data source. |
| Prometheus | Apache-2.0 | [prometheus/prometheus](https://github.com/prometheus/prometheus) | Go | Metrics collection. Add LLM-powered alert rule generation, PromQL query assistant. |
| Netdata | GPL-3.0 | [netdata/netdata](https://github.com/netdata/netdata) | C, Python | Per-second real-time metrics. Anomaly detection built in. Low overhead for edge/LATAM servers. |

## Knowledge Management & Internal Tooling

| Platform | License | URL | Stack | AI Use Case |
|----------|---------|-----|-------|-------------|
| Outline | BSL* | [outline/outline](https://github.com/outline/outline) | Node.js, React | Team wiki/docs. *BSL but self-hostable for internal use. Add AI search + document summarization. |
| AppFlowy | AGPL-3.0 | [AppFlowy-IO/AppFlowy](https://github.com/AppFlowy-IO/AppFlowy) | Flutter, Rust | Notion alternative. AI writing assistant built in. Self-hosted for IP-sensitive clients. |
| Mattermost | Apache-2.0 | [mattermost/mattermost](https://github.com/mattermost/mattermost) | Go, React | Slack alternative. Add AI bot for incident response, PR notifications, code review summaries. |

## How to Add AI to Any Platform

1. **Fork** the base repo or run it self-hosted
2. **Add an MCP server** or OpenAI-compatible API endpoint pointing at Claude/local LLM
3. **Wrap existing workflows** with LangGraph agents for multi-step automation
4. **Add Spec-Driven Development** via GitHub Spec-Kit to structure AI delivery
5. **Add Hermes Agent** for persistent institutional memory across sessions
6. **Add conversational UI** via Dify or a custom React/Next.js frontend with Vercel AI SDK
7. **Instrument with OpenTelemetry** from day one — you'll need traces when debugging agent runs
