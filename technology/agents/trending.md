# 📈 Trending AI Agents — Technology (Week of 2026-07-05)

> What's moving fast this week in AI for software development and DevOps.

## 🔥 Hot This Week

### 1. OpenHands Software Agent SDK
- **Repo**: [OpenHands/software-agent-sdk](https://github.com/OpenHands/software-agent-sdk)
- **License**: MIT
- **Why trending**: OpenHands V1 launched a clean, modular SDK for building production agents. The ACI (Agent-Computer Interface) is now a public API. Major companies integrating: AMD, Apple, Google.
- **Globant angle**: Fork and extend for client software engineering automation. Replace junior-task automation in CI pipelines.

### 2. Langfuse v3.x — Tracing for Multi-Agent Systems
- **Repo**: [langfuse/langfuse](https://github.com/langfuse/langfuse)
- **License**: MIT
- **Why trending**: New release adds multi-agent trace trees, cost attribution per agent, and LLM-as-judge eval templates. First observability platform with native A2A trace support.
- **Globant angle**: Mandatory for any production AI app delivery. Bill clients by actual token cost per workflow.

### 3. smolagents — HuggingFace Code Agents
- **Repo**: [huggingface/smolagents](https://github.com/huggingface/smolagents)
- **License**: Apache-2.0
- **Why trending**: Fastest-growing agent framework of 2026 (0 → 27.7k stars in 15 months). New release adds MCP tool integration and multi-agent support.
- **Globant angle**: Best framework when clients want to run open-weight models (Llama, Mistral) instead of paying per-token to OpenAI/Anthropic.

### 4. Google ADK — A2A Protocol Adoption
- **Repo**: [google/adk-python](https://github.com/google/adk-python)
- **License**: Apache-2.0
- **Why trending**: A2A (Agent-to-Agent) protocol allows cross-framework agent interoperability. An ADK agent can now call a CrewAI or LangGraph agent via standardized task interface.
- **Globant angle**: Build once with ADK, expose via A2A for clients using different stacks. Future-proof multi-vendor architectures.

### 5. LangGraph — Production Enterprise Adoption Surge
- **Repo**: [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph)
- **License**: MIT
- **Why trending**: Surpassed CrewAI in enterprise GitHub stars in early 2026. New features: parallel node execution, sub-graphs, streaming token output. Adopted as the production standard at Fortune 500 AI teams.
- **Globant angle**: Use for stateful, auditable agent workflows where clients need checkpointing and rollback — compliance-heavy industries (finance, healthcare).

### 6. Goose — MCP Extension Marketplace Launched
- **Repo**: [block/goose](https://github.com/block/goose)
- **License**: Apache-2.0
- **Stars**: ~32k (+2.1k this week)
- **Why trending**: Block launched the Goose MCP Extension Marketplace — pre-built extensions for Jira, GitHub, Slack, Kubernetes. Goose becomes the most extensible CLI dev agent. Viral Block engineering blog post.
- **Globant angle**: Build Goose extensions for internal tools (Jira, Confluence, client-specific APIs). Deliver as reusable connectors across engagements.

### 7. LangGraph 0.4 — HITL + State Persistence
- **Repo**: [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph)
- **License**: MIT
- **Stars**: ~110k+ (surged past CrewAI in enterprise adoption)
- **Why trending**: LangGraph 0.4 (April 2026) sharpened state persistence and HITL checkpoints — the #1 feature enterprise teams asked for. Compliance-heavy clients (finance, healthcare, legal) can now audit every agent decision and roll back to any checkpoint.
- **Globant angle**: Lead with LangGraph for any client that mentions "compliance," "auditability," or "human approval" requirements.

## 📊 Signals from GitHub This Week

- **4.3 million** AI-related repos on GitHub — 178% YoY jump in LLM-focused projects
- **Visual builders** dominating stars: Langflow (146k), Dify (130k+), Flowise (51k)
- **n8n** crossed 182k stars — enterprise workflow automation is the 2026 breakout
- **MCP adoption accelerating**: 500+ community MCP servers; all major coding agents now MCP-native
- **Coding agent triangle**: OpenHands (platform, 78k MIT) + Cline (IDE, 58k Apache) + Goose (CLI, 32k Apache) covers all developer environments
- **Platform engineering + AI**: Backstage plugin ecosystem exploding with AI-native plugins

## 🆕 New Repos to Watch

| Repo | Stars | Signal |
|------|-------|--------|
| [OpenHands/software-agent-sdk](https://github.com/OpenHands/software-agent-sdk) | New | Agent SDK split from OpenHands platform — embed in CI/CD without full platform |
| [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) | ~18k | v2.0 with MCP support — the missing frontend layer for any agent stack |
| [Bumblebee (Perplexity)](https://github.com/perplexity-ai/bumblebee) | ~2.6k | MCP supply chain security scanner — audit MCP servers before installing |
| [OpenChoreo](https://github.com/openchoreo/openchoreo) | Rising | AI agents + GitOps on Kubernetes developer platforms (v1.0 Apr 2026) |
| [mastraai/mastra](https://github.com/mastraai/mastra) | ~12k | TypeScript-first agent framework surging with Node.js community in 2026 |

---
*Pipeline automático — se actualiza cada hora.*
