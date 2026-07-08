# 🏗️ Foundational Repos — Technology Industry

> The bedrock open source projects Globant can build on. Real stars, real licenses, active communities.
> Last updated: 2026-07-08

## Agent & LLM Frameworks

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | MIT | 100k+ | Composable LLM application framework; chains, tools, memory, RAG, agents — the de facto standard | Yes — core building block |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | 13k | Stateful multi-agent graph orchestration on top of LangChain; 34.5M downloads/month | Yes — agent orchestration |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | MIT | 37k | Data framework for LLM applications; RAG pipelines, structured data agents, 200+ data connectors | Yes — RAG layer |
| [microsoft/autogen](https://github.com/microsoft/autogen) | MIT | 58.7k | Multi-agent conversation framework; async v0.4 rewrite stable, 856k downloads/month | Yes — multi-agent |
| [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | 52.8k | Role-based multi-agent crew orchestration; 5.2M downloads/month, strong LATAM community | Yes — agent crews |
| [huggingface/smolagents](https://github.com/huggingface/smolagents) | Apache-2.0 | 27.7k | Minimal code-first agent framework by Hugging Face; code-as-action, tool-calling, local model support | Yes — lightweight |

## MLOps & Model Lifecycle

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [mlflow/mlflow](https://github.com/mlflow/mlflow) | Apache-2.0 | 19k | Most widely adopted MLOps framework; experiment tracking, model registry, serving, evaluation | Yes — production ML |
| [kubeflow/kubeflow](https://github.com/kubeflow/kubeflow) | Apache-2.0 | 14k | ML workflows on Kubernetes; pipelines, hyperparameter tuning, model serving at scale | Yes — K8s ML |
| [zenml-io/zenml](https://github.com/zenml-io/zenml) | Apache-2.0 | 4.2k | Extensible MLOps framework for reproducible pipelines; stack-agnostic, cloud-native | Yes — pipeline layer |
| [ray-project/ray](https://github.com/ray-project/ray) | Apache-2.0 | 35k | Distributed computing for AI/ML; Ray Serve for model deployment, Ray Train for distributed training | Yes — scale layer |

## Observability & Infrastructure

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [prometheus/prometheus](https://github.com/prometheus/prometheus) | Apache-2.0 | 55k | Time-series metrics collection and alerting; gold standard for cloud-native monitoring | Pair with AI for anomaly detection |
| [grafana/grafana](https://github.com/grafana/grafana) | AGPL-3.0 | 65k | Observability and data visualization platform; Grafana + Prometheus = full metrics stack | Yes — Grafana AI plugin (2026) |
| [open-telemetry/opentelemetry-collector](https://github.com/open-telemetry/opentelemetry-collector) | Apache-2.0 | 4.4k | Vendor-agnostic telemetry pipeline; traces, metrics, logs — feeds AI anomaly detection | Yes — observability foundation |
| [jaegertracing/jaeger](https://github.com/jaegertracing/jaeger) | Apache-2.0 | 20k | Distributed tracing for microservices; now integrates with AI root-cause analysis | Yes — trace layer |
| [hashicorp/terraform](https://github.com/hashicorp/terraform) | BUSL-1.1* | 43k | Infrastructure as Code; 3,000+ providers, largest IaC ecosystem (*BUSL since 2023, OSS forks: OpenTofu) | Pair with AI for drift detection |
| [opentofu/opentofu](https://github.com/opentofu/opentofu) | MPL-2.0 | 23k | Community fork of Terraform under MPL-2.0; drop-in replacement, Linux Foundation project | Yes — truly open IaC |

## Developer Platform & API Layer

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [tiangolo/fastapi](https://github.com/tiangolo/fastapi) | MIT | 80k | High-performance Python web framework; auto-generates OpenAPI docs, ideal for AI microservices | Yes — AI API layer |
| [pallets/flask](https://github.com/pallets/flask) | BSD-3-Clause | 68k | Lightweight Python web framework; simple to add AI routes and middleware | Yes — rapid prototyping |
| [go-gitea/gitea](https://github.com/go-gitea/gitea) | MIT | 45k | Self-hosted Git service written in Go; full GitHub alternative, webhook-native for CI/CD | Yes — self-hosted GitOps |
| [harness/drone](https://github.com/harness/drone) | Apache-2.0 | 31k | Container-native CI/CD platform; plugin architecture ideal for AI pipeline steps | Yes — CI/CD for AI |

---
*Foundations = high-star, production-proven, MIT/Apache-2.0 preferred. Updated 2026-07-08.*
