# Foundational Repos — Technology Industry

> The bedrock open-source projects every technology AI initiative should know

| # | Repo | License | Stars | Role |
|---|------|---------|-------|------|
| 1 | [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | 12k+ | Graph-based stateful agent orchestration; the production standard for building multi-step AI pipelines with retries, human-in-the-loop checkpointing, and streaming; used across all technology verticals |
| 2 | [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | MIT | 95k+ | Core LLM framework; provides the tool ecosystem, prompt templates, memory backends, and vector store integrations that power most AI applications; 95k GitHub stars makes it the most starred AI framework |
| 3 | [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | 52k+ | Multi-agent crew orchestration; define specialist agents with roles and let them collaborate on tasks; 5.2M monthly downloads — the dominant multi-agent framework as of 2026 |
| 4 | [microsoft/autogen](https://github.com/microsoft/autogen) | MIT | 42k+ | Microsoft's conversational multi-agent framework; agents communicate through structured dialogue to solve complex programming and reasoning tasks; production-ready with Studio UI |
| 5 | [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) | MIT | 68k+ | Autonomous coding agent platform with sandboxed runtime; executes terminal commands, edits files, browses the web, and runs tests inside Docker; the open-source Devin replacement |
| 6 | [paul-gauthier/aider](https://github.com/paul-gauthier/aider) | Apache 2.0 | 41k+ | CLI git-integrated coding agent; maps repo structure, edits files, auto-commits; top SWE-bench scores; supports 100+ LLMs including local models via Ollama |
| 7 | [ollama/ollama](https://github.com/ollama/ollama) | MIT | 165k+ | Local LLM server; run Llama 3, Qwen 2.5, DeepSeek, Mistral, and 100+ models locally with a simple API; the foundation for all local/private AI deployment |
| 8 | [TabbyML/tabby](https://github.com/TabbyML/tabby) | Apache 2.0 | 33k+ | Self-hosted AI coding assistant server; enterprise-grade with SSO, RBAC, telemetry, and RAG over internal codebase via code graph indexing |
| 9 | [continuedev/continue](https://github.com/continuedev/continue) | Apache 2.0 | 31k+ | Open-source AI code assistant for VS Code and JetBrains; configurable LLM backend, slash commands, inline completions, and codebase context |
| 10 | [geekan/MetaGPT](https://github.com/geekan/MetaGPT) | MIT | 50k+ | Multi-agent software company framework; Product Manager + Architect + Engineer + QA agents collaborate to produce working code from a plain-English spec |

## Selection Rationale

- **Agent orchestration**: LangGraph (complex stateful flows with cycles and retries) or CrewAI (role-based crews for parallel tasks) — both MIT, both production-proven.
- **Local-first LLM runtime**: Ollama (MIT, 165k stars) is the undisputed standard for private local inference; any enterprise requiring data residency should start here.
- **Coding agents**: OpenHands for autonomous multi-step feature implementation; Aider for CLI/git-integrated pair programming; Tabby for the always-on self-hosted assistant.
- **Framework breadth**: LangChain (95k stars, MIT) provides the widest ecosystem of tools, memory backends, and integrations — still the default for RAG and tool-calling applications.
- **Multi-agent simulations**: MetaGPT (MIT, 50k stars) is the only framework that simulates a full software team — use for greenfield prototype generation from requirements.
- **License posture**: All 10 are MIT or Apache 2.0, making them commercially safe for Globant client deliverables without copyleft restrictions.
