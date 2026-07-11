# Foundational Repos — Technology

> Core open source platforms to build on. Open license, active community, production-proven.
> Last updated: 2026-07-11 (v8)

## Core Platforms & Frameworks

| Repo | License | Description | Stars | AI-Ready? |
|------|---------|-------------|-------|-----------|
| [microsoft/vscode](https://github.com/microsoft/vscode) | MIT | The dominant code editor (60M+ users); v1.110 (Feb 2026) introduced agent plugin architecture; extensible MCP + AI agent host | 170k+ | Yes — agent plugin host |
| [ollama/ollama](https://github.com/ollama/ollama) | MIT | Local LLM runtime; runs Llama 3, Mistral, Phi-3, CodeLlama, DeepSeek-Coder locally; REST API compatible with OpenAI SDK; foundation for on-prem AI | 100k+ | Yes — local model runtime |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Apache-2.0 | The standard ML model library; 100k+ models, fine-tuning pipelines, PEFT adapters; base for any custom model work | 130k+ | Yes — model training + inference |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | Stateful agent runtime; cyclic graphs, checkpointing, human-in-the-loop; 34.5M monthly downloads; de facto enterprise agent standard | 12k | Yes — agent orchestration |
| [go-gitea/gitea](https://github.com/go-gitea/gitea) | MIT | Self-hosted Git forge (GitHub alternative); Actions CI/CD built-in, Gitea AI integrations, lightweight Go binary, SQLite/Postgres | 45k+ | Yes — AI-augmentable DevOps |
| [backstage/backstage](https://github.com/backstage/backstage) | Apache-2.0 | Spotify's open source developer portal; software catalog, TechDocs, scaffolder, 200+ plugins; AI plugins emerging for service discovery | 30k+ | Yes — developer experience layer |
| [opentofu/opentofu](https://github.com/opentofu/opentofu) | MPL-2.0 | Community-governed Terraform fork (Linux Foundation); CNCF Sandbox; drop-in replacement after HashiCorp BSL move | 30k+ | Yes — IaC automation target |
| [prometheus/prometheus](https://github.com/prometheus/prometheus) | Apache-2.0 | Time-series monitoring; v3.0 (2025) native histograms stable, OpenTelemetry compat, Remote Write 2.0; base for AIOps observability | 55k+ | Yes — AIOps data source |
| [argoproj/argo-cd](https://github.com/argoproj/argo-cd) | Apache-2.0 | GitOps CD for Kubernetes; declarative app definitions, automated sync, audit trails; AI drift-detection patterns emerging | 17k+ | Yes — GitOps automation |
| [All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands) | MIT | Autonomous software engineer platform; Docker sandbox, REST API, multi-agent support; best open-source Devin alternative | 68k | Yes — autonomous SDLC |
| [langgenius/dify](https://github.com/langgenius/dify) | MIT | LLM app platform with visual pipeline builder, RAG engine, 100+ integrations, multi-model support; production-ready at 144k stars | 144k | Yes — LLM app platform |
| [TabbyML/tabby](https://github.com/TabbyML/tabby) | Apache-2.0 | Self-hosted AI coding server; OpenAPI, supports StarCoder2/CodeLlama/DeepSeek; enterprise on-prem alternative to GitHub Copilot | 33k | Yes — self-hosted autocomplete |

---

## Selection Rationale

These repos were chosen because:
1. **Permissive license** (MIT / Apache-2.0 / MPL-2.0) — safe for Globant client deliverables
2. **Active community** — thousands of contributors, regular releases in 2025-2026
3. **AI augmentation path** — each has an obvious agentic layer Globant can add on top
4. **Production proven** — used by enterprises with >1M users or >10k GitHub stars

---
*See also: `verticals/solutions.md` for full vertical platforms.*
