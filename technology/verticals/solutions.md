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
| [SigNoz](https://signoz.io) | Apache-2.0 | [SigNoz/signoz](https://github.com/SigNoz/signoz) | Go + React | Full-stack observability native to OpenTelemetry (logs, traces, metrics, LLM observability). Open DataDog/NewRelic alternative. 20k stars. | AI anomaly detection agent on ClickHouse backend; natural language metric/trace queries via LangGraph tool nodes; LLM observability for agent deployments. |
| [Forgejo](https://forgejo.org) | MIT | [forgejo/forgejo](https://codeberg.org/forgejo/forgejo) | Go | Community-driven Gitea fork. True open governance. Used by Codeberg.org (European Git hosting). Recommended over Gitea for new sovereign deployments. 10k+ stars. | Expose Forgejo API to AI agents for PR analysis, automated release notes, issue triage, security scanning. Pairs with Woodpecker CI for full sovereign SDLC. |

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

## MLOps & AI Engineering Platforms (Added: Third Pass 2026-07-07)

For client engagements involving model training, fine-tuning, or systematic evaluation of AI pipelines:

| Platform | License | Repo | Stack | Use Case | AI Integration Point |
|----------|---------|------|-------|----------|--------------------|
| **MLflow** | Apache-2.0 | [mlflow/mlflow](https://github.com/mlflow/mlflow) | Python | ML experiment tracking, model registry, model serving. MLflow 3.0: LLM tracing + GenAI eval. Linux Foundation-backed. | Add LLM tracing to any LangGraph agent: every agent run becomes a tracked experiment with prompt versions, costs, and outcomes. |
| **Kubeflow** | Apache-2.0 | [kubeflow/kubeflow](https://github.com/kubeflow/kubeflow) | Python, K8s | Full K8s-native ML platform: Pipelines, KServe (model serving), Katib (HPO), Training Operator. CNCF project. | Deploy and serve fine-tuned models (Qwen2.5-Coder, Llama 3.3) at scale on K8s clusters with autoscaling GPU allocation. |
| **Prefect** | Apache-2.0 | [PrefectHQ/prefect](https://github.com/PrefectHQ/prefect) | Python | Modern workflow orchestration — retries, scheduling, visibility. ML pipelines, ETL, and AI agent workflow scheduling. | Schedule RAG knowledge base refreshes, trigger agent re-training on new client data, orchestrate multi-step data pipelines feeding AI systems. |
| **ZenML** | Apache-2.0 | [zenml-io/zenml](https://github.com/zenml-io/zenml) | Python | Framework-agnostic MLOps abstraction — write pipelines once, deploy to Kubeflow/Airflow/Vertex/Sagemaker. | Portable ML pipelines across client environments; avoids rewriting code when client switches cloud provider. |

### Pattern E: AI Engineering Pipeline (MLflow + LangGraph + Prefect)
```
1. Prefect schedules weekly pipeline run
   ↓
2. ETL: pull new client data → chunk → embed → upsert to pgvector (Supabase)
   ↓
3. Eval harness: MLflow logs 100 RAG queries against golden dataset
   ↓
4. MLflow model registry: promote if accuracy ≥ threshold; alert if degraded
   ↓
5. LangGraph agent: notifies stakeholders via Slack MCP server with eval report
```
This closes the "continuous improvement loop" that distinguishes production AI from demo AI.

## LLM Inference Servers (Sovereign / On-Premise AI)

For LATAM clients with data sovereignty requirements (LGPD in Brazil, LFPDPPP in Mexico) or air-gapped environments:

| Platform | License | Repo | Stack | Use Case |
|----------|---------|------|-------|----------|
| **vLLM** | Apache-2.0 | [vllm-project/vllm](https://github.com/vllm-project/vllm) | Python + CUDA | High-throughput LLM serving. PagedAttention gives ~24x throughput vs vanilla HuggingFace. OpenAI-compatible API. Serves Qwen2.5-Coder, Llama 3.3, Mistral. Production-grade serving for GPU clusters. |
| **Ollama** | MIT | [ollama/ollama](https://github.com/ollama/ollama) | Go | Single-command local model serving. Zero-config. Works on Mac/Linux/Windows with 120k+ stars. For dev environments and air-gapped demos. Drop-in OpenAI API. |
| **Tabby** | Apache-2.0 | [TabbyML/tabby](https://github.com/TabbyML/tabby) | Rust | Self-hosted AI code completion server. RAG over private codebase for context-aware completions. Enterprise auth, team analytics. Drop-in Copilot replacement via LSP. ~33k stars. |
| **LiteLLM** | MIT | [BerriAI/litellm](https://github.com/BerriAI/litellm) | Python | Universal LLM gateway — routes to 100+ providers (vLLM, Ollama, Anthropic, OpenAI, Bedrock) with unified API. Cost tracking, load balancing, rate limiting, audit logging. |

### Quick-Start: Sovereign AI Coding Stack (Zero Data Egress)
```bash
# 1. Deploy vLLM with Qwen2.5-Coder (Apache-2.0 weights — commercially safe)
docker run --gpus all -p 8000:8000 vllm/vllm-openai:latest \
  --model Qwen/Qwen2.5-Coder-32B-Instruct --max-model-len 32768

# 2. Configure Tabby to point at vLLM and index private repos
# tabby-config.toml:
# [model.completion]
# kind = "openai/completion"
# api_endpoint = "http://vllm:8000/v1"
# [repository]
# - git = { url = "https://gitea.internal/org/private-repo" }

# 3. Configure Continue (VS Code) to use local vLLM
# config.json: apiBase = "http://vllm.internal:8000/v1"

# 4. Add Langfuse for local observability
docker compose up langfuse  # All traces stay on-premise
```
**Result**: AI coding capability with zero data egress. 60-70% of GPT-4o quality at $0 API cost.
