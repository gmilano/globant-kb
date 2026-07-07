# 🏗️ Foundation Repos — Technology Industry

> The bedrock open source projects to build AI solutions on top of.
> All MIT, Apache-2.0, or MPL — commercially safe for Globant engagements.
> Last updated: 2026-07-07 (Third Pass)

## Agent Frameworks & Orchestration

| Repo | License | Stars | Description | Build On For |
|------|---------|-------|-------------|--------------|
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | MIT | ~100k | Core LLM application framework. Chains, tools, memory, retrievers. The lingua franca of LLM development. | Any LLM app, RAG systems, tool-calling agents |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | ~12.8k | Graph-based stateful agent orchestration. Production standard for complex multi-step agents. | Enterprise agents needing audit trails and rollback |
| [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | ~52k | Role-based multi-agent framework. Define agent roles, goals, backstory; wire into crews. | Multi-agent teams, role-based automation |
| [microsoft/autogen](https://github.com/microsoft/autogen) | MIT | ~42k | Conversational multi-agent framework. Agents talk to each other to solve tasks. | Human-in-the-loop workflows, agentic conversations |
| [huggingface/smolagents](https://github.com/huggingface/smolagents) | Apache-2.0 | ~27.7k | Code-first agents — LLM writes Python to complete tasks. Sandboxed execution. | Open-weight model agents, research workflows |

## LLM Infrastructure & Serving

| Repo | License | Stars | Description | Build On For |
|------|---------|-------|-------------|--------------|
| [vllm-project/vllm](https://github.com/vllm-project/vllm) | Apache-2.0 | ~45k | High-throughput memory-efficient LLM serving engine. PagedAttention for ~24x throughput vs HuggingFace. | On-premise/private LLM serving, batch inference |
| [BerriAI/litellm](https://github.com/BerriAI/litellm) | MIT | ~22k | Universal LLM gateway — 100+ providers (OpenAI, Anthropic, Bedrock, Azure, local) in one API. Cost tracking, load balancing, guardrails. | Multi-provider LLM routing, enterprise cost control |
| [ollama/ollama](https://github.com/ollama/ollama) | MIT | ~120k | Run LLMs locally in one command. macOS, Linux, Windows. REST API + CLI. | Local dev, air-gapped deployments, demos |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Apache-2.0 | ~28k | Memory layer for AI agents. Persistent, intelligent memory across sessions. User/agent/session scopes. | Any stateful AI agent needing memory between interactions |

## LLMOps & Observability

| Repo | License | Stars | Description | Build On For |
|------|---------|-------|-------------|--------------|
| [langfuse/langfuse](https://github.com/langfuse/langfuse) | MIT | ~28k | LLM observability platform. Traces, evals, prompt versioning, datasets. Self-hostable. The open source LangSmith. | All production AI apps — monitoring, debugging, eval |
| [langgenius/dify](https://github.com/langgenius/dify) | Apache-2.0 | ~144k | Full-stack LLMOps platform: visual builder + RAG + agents + monitoring. 50+ LLM providers, 10k+ app templates. | Rapid prototyping, no/low-code AI apps for clients |

## Autonomous Coding Agents

| Repo | License | Stars | Description | Build On For |
|------|---------|-------|-------------|--------------|
| [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) | MIT | ~78k | Autonomous coding agent. Edits files, runs commands, browses web in sandboxed env. SWE-bench 53%+ with Claude. $18.8M Series A. | Software development automation, CI self-healing |
| [SWE-agent/SWE-agent](https://github.com/SWE-agent/SWE-agent) | MIT | ~15k | Automated software engineer from Princeton. ACI (Agent-Computer Interface) standardizes agent-tool interaction. Mini-SWE-Agent: 74% on SWE-bench Verified. | Bug fixing automation, code review, SWE-bench evals |
| [Aider-AI/aider](https://github.com/Aider-AI/aider) | Apache-2.0 | ~41k | Git-aware AI pair programmer. Terminal-based, any LLM. Auto-commits with descriptive messages. New architect/editor model split for efficiency. | Developer productivity augmentation, code editing agents |
| [cline/cline](https://github.com/cline/cline) | Apache-2.0 | ~58k | VS Code autonomous coding agent. File system + terminal + Playwright browser access. 200+ community configs. Most-starred VS Code AI extension. | IDE-embedded agent for developer teams |
| [continuedev/continue](https://github.com/continuedev/continue) | Apache-2.0 | ~31k | Open-source IDE autopilot for VS Code and JetBrains. Configurable to any LLM, 200+ integrations. Best for IDE AI without vendor lock-in. | Code completion + chat for any IDE |
| [block/goose](https://github.com/block/goose) | Apache-2.0 | ~32k | Block's MCP-native developer agent. Extensible via marketplace of MCP extensions. Runs tasks autonomously in terminal. | Tool-augmented developer automation, MCP extension development |
| [TabbyML/tabby](https://github.com/TabbyML/tabby) | Apache-2.0 | ~33k | Self-hosted AI code completion server. Drop-in Copilot replacement via LSP. Fine-tune on client codebase. Enterprise auth + team analytics. | On-prem Copilot alternative for privacy-sensitive clients |

## DevOps & Platform Engineering

| Repo | License | Stars | Description | Build On For |
|------|---------|-------|-------------|--------------|
| [backstage/backstage](https://github.com/backstage/backstage) | Apache-2.0 | 21.5k | Developer portal framework (Spotify/CNCF). 3,000+ adopting companies, 2M+ users. CNCF's "global open source standard for platform engineering" (Mar 2026). | Internal Developer Platforms (IDPs) with AI layer |
| [opentofu/opentofu](https://github.com/opentofu/opentofu) | MPL-2.0 | ~24k | Open source Terraform fork (Linux Foundation). Full Terraform HCL compatibility. IaC for any cloud. | Cloud infra provisioning when Terraform BSL is a concern |
| [crossplane/crossplane](https://github.com/crossplane/crossplane) | Apache-2.0 | ~9.8k | Kubernetes-native infrastructure provisioning. CNCF Graduated (Nov 2025). Multi-cloud control plane. | Platform engineering teams offering self-service infra |
| [argoproj/argo-cd](https://github.com/argoproj/argo-cd) | Apache-2.0 | ~18k | GitOps continuous delivery for Kubernetes. Declarative, auditable, rollback-capable. | Kubernetes CD pipelines, agent-driven deployment automation |

## Observability & Monitoring

| Repo | License | Stars | Description | Build On For |
|------|---------|-------|-------------|--------------|
| [SigNoz/signoz](https://github.com/SigNoz/signoz) | Apache-2.0 | 20k | Full-stack observability platform native to OpenTelemetry. Logs + traces + metrics + LLM observability in one app. Open DataDog/NewRelic alternative. ClickHouse backend. | Production monitoring, AI agent observability, LATAM regulated clients |
| [prometheus/prometheus](https://github.com/prometheus/prometheus) | Apache-2.0 | 57k | CNCF gold standard for metrics monitoring in cloud-native environments. Efficient time-series, powerful PromQL. | Infrastructure metrics, Grafana data source, natural language metric queries |
| [open-telemetry/opentelemetry-collector](https://github.com/open-telemetry/opentelemetry-collector) | Apache-2.0 | 4.8k | Vendor-neutral telemetry pipeline (CNCF). Pipes traces/metrics/logs to any backend. | Agent observability, distributed tracing, AI agent span tracking |

## Sovereign Self-Hosted Git & CI/CD

| Repo | License | Stars | Description | Build On For |
|------|---------|-------|-------------|--------------|
| [go-gitea/gitea](https://github.com/go-gitea/gitea) | MIT | 47k | Lightweight self-hosted Git service in Go. GitHub-like features, single binary. Basis for Forgejo. | Sovereign Git for clients needing on-prem |
| [forgejo/forgejo](https://codeberg.org/forgejo/forgejo) | MIT | 10k+ | Community-driven Gitea fork (Oct 2022). No corporate strings. True open governance. Recommended over Gitea for new deployments. | Sovereign dev platform, LATAM government clients, data sovereignty |
| [woodpecker-ci/woodpecker](https://github.com/woodpecker-ci/woodpecker) | Apache-2.0 | 4.2k | Lightweight Docker-native CI/CD. Fork of Drone. First-class Gitea/Forgejo support. Replaces GitHub Actions for self-hosted stacks. | Self-hosted CI/CD alongside Forgejo |

## Identity, Secrets & Workflow

| Repo | License | Stars | Description | Build On For |
|------|---------|-------|-------------|--------------|
| [keycloak/keycloak](https://github.com/keycloak/keycloak) | Apache-2.0 | ~23k | Enterprise IAM: SSO, SAML, OAuth2, OIDC. CNCF incubation (Red Hat-backed). Industry-standard identity server. | Secure AI agent service accounts with fine-grained RBAC; MFA enforcement for AI tool access; audit trails |
| [temporalio/temporal](https://github.com/temporalio/temporal) | MIT | ~12k | Durable workflow execution engine. Handles retries, timeouts, long-running tasks. Replaces fragile cron jobs and state machines. | Power multi-step AI agent workflows that span hours/days; guaranteed exactly-once execution |
| [hashicorp/vault](https://github.com/hashicorp/vault) | MPL-2.0 | ~32k | Secrets management: dynamic credentials, PKI, encryption-as-service. Runtime secret injection without hardcoded keys. | AI agents retrieve API keys and credentials securely at runtime; no secrets in agent prompts or config |

## MCP Ecosystem (Official Vendor Collections)

| Repo | License | Stars | Description | Build On For |
|------|---------|-------|-------------|--------------|
| [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | MIT | ~10k | Official Anthropic MCP reference servers: filesystem, Postgres, Slack, GitHub, Brave, Google Drive, Git | Standard tool integration for any MCP-aware agent; educational foundation for custom MCP development |
| [modelcontextprotocol/python-sdk](https://github.com/modelcontextprotocol/python-sdk) | MIT | ~5k | Official Python SDK for building MCP servers and clients. Next spec v2026-07-28 adds structured output resources. | Build custom MCP servers for proprietary client systems (ERP, CRM, legacy APIs) |
| [awslabs/mcp](https://github.com/awslabs/mcp) | Apache-2.0 | ~3k | Official AWS MCP servers: S3, EC2, Lambda, CloudWatch, DynamoDB, CDK, Bedrock | AI agents managing AWS infrastructure; pairs with LangGraph or CrewAI orchestration |
| [microsoft/mcp](https://github.com/microsoft/mcp) | MIT | ~2k | Official Microsoft MCP servers: Azure services, Teams, DevOps pipelines, OneDrive, SharePoint | AI agents integrating with Microsoft enterprise stack; enterprise-grade authentication |

## MLOps & AI Engineering (Added: Third Pass 2026-07-07)

| Repo | License | Stars | Description | Build On For |
|------|---------|-------|-------------|--------------|
| [mlflow/mlflow](https://github.com/mlflow/mlflow) | Apache-2.0 | ~20k | Linux Foundation ML lifecycle platform. MLflow 3.0 adds LLM tracing + GenAI evaluation alongside classical experiment tracking + model registry. The open-source standard. | ML experiment tracking, model versioning, LLM evaluation, agent run logging |
| [kubeflow/kubeflow](https://github.com/kubeflow/kubeflow) | Apache-2.0 | ~14k | Kubernetes-native ML platform: Pipelines, Katib (HPO), KServe (model serving), Training Operator. Best for teams with dedicated platform engineering. | End-to-end ML workflows on K8s; production model serving with autoscaling |
| [PrefectHQ/prefect](https://github.com/PrefectHQ/prefect) | Apache-2.0 | ~17k | Modern Python workflow orchestration — retries, scheduling, observability, UI. Lighter-weight than Airflow. Increasingly used for LLM pipelines and AI agent workflows. | Data pipelines feeding AI agents; scheduled re-training; ETL for RAG knowledge bases |
| [zenml-io/zenml](https://github.com/zenml-io/zenml) | Apache-2.0 | ~4.5k | Framework-agnostic MLOps stack with pipeline abstraction over Kubeflow, Airflow, and vertex. "Terraform for ML pipelines" — write once, deploy to any orchestrator. | ML team standardization across multiple cloud providers; avoids vendor lock-in |

## AI-Readiness Matrix (Full Foundation Stack, Updated 2026-07-07)

| Category | Best OSS Foundation | License | When to Use |
|----------|--------------------|---------|-----------| 
| Agent orchestration | LangGraph | MIT | Complex stateful workflows, audit trails needed |
| Multi-agent roles | CrewAI | MIT | Team-of-agents pattern, client-friendly metaphor |
| Low-code agents | Dify | Apache-2.0 | Non-technical client, rapid POC |
| Local LLM serving | Ollama (dev) / vLLM (prod) | MIT / Apache-2.0 | Data sovereignty, cost control |
| LLM observability | Langfuse | MIT | Every production AI app, mandatory |
| ML experiment tracking | MLflow | Apache-2.0 | Any engagement with model training/fine-tuning |
| Workflow orchestration | Prefect | Apache-2.0 | Scheduled pipelines, ETL for RAG |
| K8s ML platform | Kubeflow | Apache-2.0 | Enterprise MLOps with dedicated platform team |
| Identity / auth | Keycloak | Apache-2.0 | Multi-user AI platforms, enterprise SSO |
| Durable workflows | Temporal | MIT | Long-running agent tasks (minutes to hours) |
| Secrets management | Vault | MPL-2.0 | AI agents needing dynamic API key rotation |
| Self-hosted Git | Forgejo | MIT | Data sovereignty, LATAM government mandates |
| Self-hosted CI/CD | Woodpecker CI | Apache-2.0 | Alongside Forgejo; sovereign dev stack |
| Dev portal (IDP) | Backstage | Apache-2.0 | Internal developer platform with AI plugin |
| Full-stack observability | SigNoz | Apache-2.0 | DataDog/NewRelic replacement; LLM traces built-in |

---
*See also: `verticals/solutions.md` for full vertical platforms and `intel/trends.md` for sovereign stack (Trend 11) and agentic engineering (Trend 14) use cases.*
