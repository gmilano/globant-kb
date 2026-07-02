# Top AI Agents & Tools — Technology Industry

> Last updated: 2026-07-02 | Focus: MIT / Apache 2.0 licenses Globant can build on

## AI Agents Table

| # | Name | GitHub | License | Stars | Description |
|---|------|--------|---------|-------|-------------|
| 1 | **OpenHands** | [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) | MIT | 68k+ | Autonomous coding agent platform; sandboxed Docker environment with terminal, editor, browser, and file system access; handles multi-file feature implementation and debugging end-to-end — open-source Devin alternative |
| 2 | **Aider** | [paul-gauthier/aider](https://github.com/paul-gauthier/aider) | Apache 2.0 | 41k+ | CLI coding agent; maps entire repo, edits files, auto-commits to git; top-tier SWE-bench scores; supports GPT-4o, Claude 3.5+, and local models via Ollama |
| 3 | **Cline** | [cline/cline](https://github.com/cline/cline) | Apache 2.0 | 58k+ | VS Code AI coding agent extension; autonomous multi-file editing, terminal command execution, browser control; model-agnostic (Anthropic, OpenAI, Gemini, Ollama) |
| 4 | **CrewAI** | [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | 52k+ | Role-based multi-agent orchestration framework; define crews of specialist agents (Researcher, Engineer, QA, DevOps) that collaborate via task delegation; 5M+ monthly downloads |
| 5 | **LangGraph** | [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | 12k+ | Graph-based stateful agent orchestration; fine-grained control over agent state, branching, cycles, and persistence; the "serious engineering" option for production agentic pipelines |
| 6 | **AutoGen** | [microsoft/autogen](https://github.com/microsoft/autogen) | MIT | 42k+ | Microsoft's conversational multi-agent framework; agents debate, collaborate, and solve problems through dialogue; ideal for code review, debugging, and architecture discussion agents |
| 7 | **MetaGPT** | [geekan/MetaGPT](https://github.com/geekan/MetaGPT) | MIT | 50k+ | Multi-agent software company simulation; assigns roles (Product Manager, Architect, Engineer, QA) and executes end-to-end software projects from a single English requirement |
| 8 | **Continue** | [continuedev/continue](https://github.com/continuedev/continue) | Apache 2.0 | 31k+ | Open-source AI code assistant for VS Code and JetBrains; inline completions, chat sidebar, slash commands for refactor/test/explain; fully configurable backend (any LLM) |
| 9 | **Tabby** | [TabbyML/tabby](https://github.com/TabbyML/tabby) | Apache 2.0 | 33k+ | Self-hosted AI coding assistant server; OpenAPI-compatible, connects to VS Code/JetBrains/Neovim; enterprise-grade with SSO, access control, and RAG over internal codebase |
| 10 | **Plandex** | [plandex-ai/plandex](https://github.com/plandex-ai/plandex) | AGPL-3.0 | 11k+ | Plan-first CLI coding agent; builds features across multiple files with structured plan steps and 2M token context; designed for large, complex changes spanning many files |

## Notes

- **Coding agents dominate**: The technology industry's most impactful AI agents are software engineering agents — OpenHands, Aider, Cline, Plandex are all autonomous coders that replace or amplify developers.
- **Framework vs. application**: CrewAI, LangGraph, AutoGen are orchestration frameworks; OpenHands, Aider, Cline, Plandex are ready-to-deploy coding agents.
- **Self-hosted is winning**: Tabby (self-hosted) addresses enterprise data-residency requirements; 65% of enterprise tech teams require on-prem or VPC deployment for AI coding tools.
- **SWE-bench is the benchmark**: Aider and OpenHands both rank on SWE-bench (the industry standard for autonomous code editing) — use SWE-bench scores as the key evaluation criterion for client proposals.
- **MetaGPT for greenfield**: When a client needs a proof-of-concept system built from scratch, MetaGPT's "software company in a box" pattern can produce a working MVP from a plain-English spec.
- **License note**: Plandex is AGPL-3.0 — check with Globant legal before embedding in client deliverables; all others are MIT or Apache 2.0 (commercially safe).
