# 🏗️ Foundational Repos — Technology Industry

> The bedrock open source projects Globant can build on. Real stars, real licenses, active communities.
> Last updated: 2026-07-09 v4

## Agent & LLM Frameworks

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | MIT | 100k+ | Composable LLM application framework; chains, tools, memory, RAG, agents — the de facto standard | Yes — core building block |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | 13k | Stateful multi-agent graph orchestration on top of LangChain; 34.5M downloads/month | Yes — agent orchestration |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | MIT | 37k | Data framework for LLM applications; RAG pipelines, structured data agents, 200+ data connectors | Yes — RAG layer |
| [microsoft/autogen](https://github.com/microsoft/autogen) | MIT | 58.7k | Multi-agent framework; merged with Semantic Kernel → Microsoft Agent Framework (GA Q1 2026); 856k downloads/month | Yes — multi-agent |
| [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | 52.8k | Role-based multi-agent crew orchestration; 5.2M downloads/month, strong LATAM community | Yes — agent crews |
| [huggingface/smolagents](https://github.com/huggingface/smolagents) | Apache-2.0 | 27.7k | Minimal code-first agent framework by Hugging Face; code-as-action, tool-calling, local model support | Yes — lightweight |
| [geekan/MetaGPT](https://github.com/geekan/MetaGPT) | MIT | 50k+ | Assigns SOP roles (PM, architect, engineer) to LLMs, simulates a full software company; MGX platform for interactive agent dev teams | Yes — multi-agent SW company |

## MLOps & Model Lifecycle

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [mlflow/mlflow](https://github.com/mlflow/mlflow) | Apache-2.0 | 19k | Most widely adopted MLOps framework; experiment tracking, model registry, serving, evaluation | Yes — production ML |
| [kubeflow/kubeflow](https://github.com/kubeflow/kubeflow) | Apache-2.0 | 14k | ML workflows on Kubernetes; pipelines, hyperparameter tuning, model serving at scale | Yes — K8s ML |
| [zenml-io/zenml](https://github.com/zenml-io/zenml) | Apache-2.0 | 4.2k | Extensible MLOps framework for reproducible pipelines; stack-agnostic, cloud-native | Yes — pipeline layer |
| [ray-project/ray](https://github.com/ray-project/ray) | Apache-2.0 | 35k | Distributed computing for AI/ML; Ray Serve for model deployment, Ray Train for distributed training | Yes — scale layer |

## LLM Observability (New Category — Mandatory for Production AI)

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [langfuse/langfuse](https://github.com/langfuse/langfuse) | MIT | 28k | Open-source LLM observability leader; traces, evals, prompt management, datasets; self-hostable Docker; OpenTelemetry-native | Yes — purpose-built for AI |
| [comet-ml/opik](https://github.com/comet-ml/opik) | Apache-2.0 | 8.5k | End-to-end LLM evaluation and tracing; CI/CD eval integration, prompt playground, annotation workflows | Yes — evaluation-first |
| [Arize-ai/phoenix](https://github.com/Arize-ai/phoenix) | Elastic-2.0 | 7.2k | ML-grade LLM observability; OpenInference traces, embeddings drift detection, hallucination evals | Yes — ML rigor |
| [traceloop/openllmetry](https://github.com/traceloop/openllmetry) | Apache-2.0 | 3.1k | OpenTelemetry-based LLM instrumentation; vendor-neutral, drop-in for any OpenAI/Anthropic SDK | Yes — zero-vendor-lock |

## Infrastructure Observability

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [prometheus/prometheus](https://github.com/prometheus/prometheus) | Apache-2.0 | 55k | Time-series metrics collection and alerting; gold standard for cloud-native monitoring | Pair with AI for anomaly detection |
| [grafana/grafana](https://github.com/grafana/grafana) | AGPL-3.0 | 65k | Observability and data visualization platform; Grafana + Prometheus = full metrics stack | Yes — Grafana AI plugin GA 2026 |
| [open-telemetry/opentelemetry-collector](https://github.com/open-telemetry/opentelemetry-collector) | Apache-2.0 | 4.4k | Vendor-agnostic telemetry pipeline; traces, metrics, logs — feeds both LLM observability and AI anomaly detection | Yes — foundation for both |
| [jaegertracing/jaeger](https://github.com/jaegertracing/jaeger) | Apache-2.0 | 20k | Distributed tracing for microservices; now integrates with AI root-cause analysis | Yes — trace layer |
| [hashicorp/terraform](https://github.com/hashicorp/terraform) | BUSL-1.1* | 43k | Infrastructure as Code; 3,000+ providers, largest IaC ecosystem (*BUSL since 2023, OSS forks: OpenTofu) | Pair with AI for drift detection |
| [opentofu/opentofu](https://github.com/opentofu/opentofu) | MPL-2.0 | 23k | Community fork of Terraform under MPL-2.0; v1.8 feature-parity with Terraform; Linux Foundation project | Yes — truly open IaC |

## Developer Platform & API Layer

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [tiangolo/fastapi](https://github.com/tiangolo/fastapi) | MIT | 80k | High-performance Python web framework; auto-generates OpenAPI docs, ideal for AI microservices | Yes — AI API layer |
| [pallets/flask](https://github.com/pallets/flask) | BSD-3-Clause | 68k | Lightweight Python web framework; simple to add AI routes and middleware | Yes — rapid prototyping |
| [go-gitea/gitea](https://github.com/go-gitea/gitea) | MIT | 45k | Self-hosted Git service written in Go; full GitHub alternative, webhook-native for CI/CD | Yes — self-hosted GitOps |
| [harness/drone](https://github.com/harness/drone) | Apache-2.0 | 31k | Container-native CI/CD platform; plugin architecture ideal for AI pipeline steps | Yes — CI/CD for AI |

## Kubernetes AI Infrastructure

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [kagent-dev/kagent](https://github.com/kagent-dev/kagent) | Apache-2.0 | 3.2k | Kubernetes-native AI agent framework; define agents as K8s CRDs, observe/govern via kubectl and GitOps | Yes — K8s-native agents |
| [k8sgpt-ai/k8sgpt](https://github.com/k8sgpt-ai/k8sgpt) | Apache-2.0 | 6.5k | AI-native K8s diagnostics; scans clusters, triages issues, outputs plain-language remediation | Yes — AIOps foundation |
| [argoproj/argo-cd](https://github.com/argoproj/argo-cd) | Apache-2.0 | 18k | GitOps continuous delivery for Kubernetes; declarative app deployment, drift detection, pairs with AI for auto-remediation | Yes — GitOps layer |

## IaC & Cloud Automation

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [opentofu/opentofu](https://github.com/opentofu/opentofu) | MPL-2.0 | 23k | Community fork of Terraform under MPL-2.0; v1.8 feature-parity; Linux Foundation; AI IaC agents targeting OpenTofu | Yes — IaC layer |
| [pulumi/pulumi](https://github.com/pulumi/pulumi) | Apache-2.0 | 22k | Infrastructure as Code using real languages (Python/TypeScript/Go); multi-cloud; Apache-2.0 core; AI agents can generate + apply Pulumi stacks | Yes — code-first IaC |
| [wso2/choreo](https://github.com/wso2/choreo) | Apache-2.0 | 2k | CNCF Sandbox IDP (OpenChoreo); exposes MCP servers so AI agents deploy components; built-in SRE LLM agent | Yes — IDP + MCP |

## Terminal AI Agents (Foundation Layer)

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) | Apache-2.0 | 80k+ | Google's open-source terminal AI agent; Gemini 2.5 Pro, MCP-native, GitHub Actions integration, free personal tier | Yes — terminal+CI |
| [All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands) | MIT | 77k+ | $18.8M Series A; Kubernetes support; Planning Mode; 72% SWE-bench Verified; OpenHands Index live leaderboard | Yes — autonomous SW eng |
| [paul-gauthier/aider](https://github.com/paul-gauthier/aider) | Apache-2.0 | 48k | AI pair-programmer in terminal; multi-file edits via git diffs; supports 100+ LLMs; strongest all-around OSS coding agent | Yes — terminal coding |

---
*Foundations = high-star, production-proven, MIT/Apache-2.0 preferred. Updated 2026-07-09 v4.*
