# Foundational Repos — Technology Industry

> Bases to build on. Open license, active community, production-proven.
> Last updated: 2026-07-11

## AI / LLM Infrastructure

| Repo | License | Stars | Description | AI Starting Point? |
|------|---------|-------|-------------|-------------------|
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | MIT | 139k | The agent engineering platform. 100M+ monthly downloads, $1.25B valuation. Document loaders, chains, tools, memory. | Yes — universal LLM integration layer |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT* | 36.7k | Stateful graph runtime for agents. Supports durable execution, human-in-the-loop, sub-graphs, streaming. *Production API = commercial. | Yes — multi-step agentic workflows |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Apache-2.0 | 140k+ | The foundational model hub. 600k+ models, fine-tuning pipelines, inference servers. | Yes — model layer for any AI feature |
| [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | MIT | 18k | Official MCP reference implementations: GitHub, Slack, filesystem, Git, memory, fetch, time. | Yes — standard tool-use protocol |
| [ollama/ollama](https://github.com/ollama/ollama) | MIT | 110k+ | Run LLMs locally (Llama, Mistral, Gemma, Qwen, etc.). REST API compatible with OpenAI SDK. LATAM data-residency key. | Yes — local LLM inference |

## MLOps & Model Lifecycle

| Repo | License | Stars | Description | AI Starting Point? |
|------|---------|-------|-------------|-------------------|
| [mlflow/mlflow](https://github.com/mlflow/mlflow) | Apache-2.0 | 20k | Open-source ML platform: experiment tracking, model registry, deployment, AI gateway for LLMs. | Yes — experiment tracking + deployment |
| [kubeflow/kubeflow](https://github.com/kubeflow/kubeflow) | Apache-2.0 | 14k | ML on Kubernetes: Pipelines, Katib hyperparameter tuning, KServe model serving. | Yes — production ML on K8s |
| [iterative/dvc](https://github.com/iterative/dvc) | Apache-2.0 | 14k | Data Version Control — Git for ML datasets + model versioning. Integrates with S3, GCS, Azure. | Yes — data + model versioning |
| [ray-project/ray](https://github.com/ray-project/ray) | Apache-2.0 | 35k | Distributed Python framework. RLlib (RL), Train (distributed training), Serve (model serving). | Yes — scale any Python AI workload |

## Observability & DevOps

| Repo | License | Stars | Description | AI Starting Point? |
|------|---------|-------|-------------|-------------------|
| [openobserve/openobserve](https://github.com/openobserve/openobserve) | Apache-2.0 | 14k | Unified observability: logs, metrics, traces, frontend monitoring. SQL + PromQL, OpenTelemetry-native. Best open-source obs platform 2026. | Yes — observe AI agent pipelines |
| [prometheus/prometheus](https://github.com/prometheus/prometheus) | Apache-2.0 | 56k | Industry-standard metrics collection + alerting. Pull-based, PromQL, Kubernetes-native. | Yes — metrics for AI services |
| [grafana/grafana](https://github.com/grafana/grafana) | AGPL-3.0 | 65k | Visualization platform. Works with Prometheus, Loki, Tempo, Pyroscope. AI-assisted dashboards in 2026. | Yes — dashboards for AI system monitoring |
| [open-telemetry/opentelemetry-collector](https://github.com/open-telemetry/opentelemetry-collector) | Apache-2.0 | 4.8k | Vendor-agnostic telemetry pipeline. Receive, process, export logs/metrics/traces anywhere. | Yes — instrument AI agent observability |
| [hashicorp/terraform](https://github.com/hashicorp/terraform) | BUSL-1.1* | 43k | Infrastructure as Code. *BUSL but widely used. OpenTofu (MPL-2.0) is the open fork. | Yes — provision AI infra reproducibly |

---
*See also: `verticals/solutions.md` for complete vertical platforms.*
