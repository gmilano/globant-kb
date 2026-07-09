# 🎯 Top AI Agents — Technology Industry

> Open source AI agents and tools for software development, DevOps, and technology operations.
> Focus: MIT / Apache 2.0 licenses — safe for Globant client engagements.
> Last updated: 2026-07-09 v4

## AI Coding Agents

| Name | License | Repo | Stars | Description |
|------|---------|------|-------|-------------|
| OpenHands | MIT | [All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands) | 77k+ | $18.8M Series A raised; v1.6.0 Kubernetes support + Planning Mode beta; 72% SWE-bench Verified; OpenHands Index live leaderboard |
| Cline | Apache-2.0 | [cline/cline](https://github.com/cline/cline) | 61k | Autonomous coding agent for VS Code; creates/edits files, runs shell commands, uses browser — model-agnostic; 10k stars/month after Roo Code archived |
| Aider | Apache-2.0 | [paul-gauthier/aider](https://github.com/paul-gauthier/aider) | 48k | AI pair-programmer in the terminal; edits multi-file codebases via git-integrated diffs, supports 100+ LLMs; strongest all-around OSS agent in 2026 |
| SWE-agent | MIT | [princeton-nlp/SWE-agent](https://github.com/princeton-nlp/SWE-agent) | 15k | Princeton NLP lab agent; Agent-Computer Interface (ACI) paradigm, solves real GitHub issues autonomously |
| OpenCode | MIT | [anomalyco/opencode](https://github.com/anomalyco/opencode) | 185k | v1.17.14 (Jul 6 2026): added MCP adapter for confined orchestration scripts; 75+ model providers, LSP integration |
| Gemini CLI | Apache-2.0 | [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) | 80k+ | Google's open-source terminal AI agent; Gemini 2.5 Pro free with personal Google account; MCP-native via ~/.gemini/settings.json; GitHub Actions integration |
| Codex CLI | Apache-2.0 | [openai/codex](https://github.com/openai/codex) | 97k | OpenAI's lightweight coding agent; sandboxed execution, multi-file edits; spawned OpenClaw 210k+ fork ecosystem |
| Goose | Apache-2.0 | [block/goose](https://github.com/block/goose) | 19k | Extensible CLI agent by Block (Square); installs, executes, edits, and tests with any LLM; skill-based + MCP-native |

## Agent Frameworks (Build Your Own)

| Name | License | Repo | Stars | Description |
|------|---------|------|-------|-------------|
| AutoGen | MIT | [microsoft/autogen](https://github.com/microsoft/autogen) | 58.7k | Microsoft Research multi-agent conversation framework; async v0.4 stable, 856k monthly downloads |
| CrewAI | MIT | [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | 52.8k | Orchestrate crews of role-playing AI agents; 5.2M monthly downloads, strong enterprise adoption |
| smolagents | Apache-2.0 | [huggingface/smolagents](https://github.com/huggingface/smolagents) | 27.7k | Hugging Face's minimal code-first agent framework; code-as-action paradigm, tool-calling, local model support |
| LangGraph | MIT | [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | 13k | Graph-based stateful multi-agent orchestration; 34.5M monthly downloads, #1 enterprise production adoption |
| Dify | Apache-2.0 | [langgenius/dify](https://github.com/langgenius/dify) | 136k | Production-ready LLM app platform; visual workflow builder, RAG pipeline, agent tooling, 100+ integrations |
| Langflow | MIT | [logspace-ai/langflow](https://github.com/logspace-ai/langflow) | 146k | Visual drag-and-drop pipeline builder; v1.4 adds agentic workflow nodes; deploy agents as REST APIs |

## DevOps & Infrastructure AI Agents

| Name | License | Repo | Stars | Description |
|------|---------|------|-------|-------------|
| k8sgpt | Apache-2.0 | [k8sgpt-ai/k8sgpt](https://github.com/k8sgpt-ai/k8sgpt) | 6.5k | Kubernetes diagnostics agent; scans clusters, triages issues, explains problems in plain language |
| kagent | Apache-2.0 | [kagent-dev/kagent](https://github.com/kagent-dev/kagent) | 3.2k | Kubernetes-native AI agent framework; deploy, observe, and govern agents with kubectl + GitOps — same workflow as any K8s workload |
| DevOpsGPT | MIT | [kuafuai/DevOpsGPT](https://github.com/kuafuai/DevOpsGPT) | 7.1k | Multi-agent system for automated software development; requirements → code → test → CI/CD pipeline |
| claude-code-security-review | MIT | [anthropics/claude-code-security-review](https://github.com/anthropics/claude-code-security-review) | 5.4k | GitHub Action using Claude to analyze code changes for security vulnerabilities on every PR |

## LLM Observability Agents

| Name | License | Repo | Stars | Description |
|------|---------|------|-------|-------------|
| Langfuse | MIT | [langfuse/langfuse](https://github.com/langfuse/langfuse) | 28k | Open-source LLM observability: traces, evals, datasets, prompt management; self-hostable; 28k stars Jul 2026 |
| Opik | Apache-2.0 | [comet-ml/opik](https://github.com/comet-ml/opik) | 8.5k | End-to-end LLM evaluation and tracing by Comet; Apache-2.0, integrates with any LLM SDK |
| Arize Phoenix | Elastic-2.0 | [Arize-ai/phoenix](https://github.com/Arize-ai/phoenix) | 7.2k | ML-grade LLM observability; OpenTelemetry-native via OpenInference, embeddings drift detection |

## MetaGPT — Multi-Agent Software Company

| Name | License | Repo | Stars | Description |
|------|---------|------|-------|-------------|
| MetaGPT | MIT | [geekan/MetaGPT](https://github.com/geekan/MetaGPT) | 50k+ | Assigns SOP roles (PM, architect, engineer) to LLMs, simulates a full software company; MGX (MetaGPT X) platform launched 2025 for interactive collaborative agent dev teams |

## SWE-Bench Reference (Jul 2026)

| Agent / Model | SWE-bench Verified | SWE-bench Lite | SWE-bench Pro | Notes |
|--------------|-------------------|---------------|---------------|-------|
| Claude Mythos 5 | **95.5%** | — | — | Leads Verified leaderboard as of Jul 6, 2026 |
| Claude Fable 5 | 95.0% | — | **80.3%** | Leads SWE-bench Pro as of Jul 7, 2026 |
| Claude Opus 4.8 | 88.6% | — | 69.2% | Previous leader |
| Claude Opus 4.6 | — | **62.7%** | — | Leads SWE-bench Lite (Jul 5, 2026); 47 models evaluated, avg 28.1 |
| Tencent Hy3 | — | — | 57.9% | New entrant (Jul 2026) — first major APAC model to crack top 5 on Pro |
| OpenHands + Claude | ~72% | — | — | Best fully open-source agent score (v1.6.0, MIT) |
| Aider + GPT-4o | ~43% | — | — | Terminal-native; competitive on medium tasks |

---
*Auto-updated by ingest pipeline. Real repos, real licenses, verified on 2026-07-09 v4.*
