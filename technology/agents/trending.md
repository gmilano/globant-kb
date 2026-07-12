# Trending AI Agents — Technology (Week of 2026-07-12)

> What's gaining momentum this week in the AI developer tools ecosystem.

## Breakout Repos This Week

### 1. OpenClaw — 346k+ Stars, Fastest-Growing OSS Project Ever
- **Repo**: [openclaw/openclaw](https://github.com/openclaw/openclaw)
- **Why now**: Went from 9k to 250k stars in 60 days (January 2026), overtaking React to become the most-starred software project on GitHub. It's a self-hosted personal AI assistant that connects to 50+ messaging platforms with no cloud dependency. OpenAI is sponsoring it under a non-profit foundation (Peter Steinberger joined OpenAI Feb 2026). The "lobster way" branding resonated virally.
- **License**: MIT
- **LATAM angle**: No cloud required — runs on any server. Ideal for LATAM regulated environments.

### 2. Hermes Agent — 175k Stars, #1 on OpenRouter
- **Repo**: [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)
- **Why now**: Released February 25, 2026 by Nous Research. Three-tier persistent memory (holographic SQLite FTS5 facts + semantic search + episodic logs) lets agents remember context across sessions without a vector database. Overtook OpenClaw as the most-used open-source agent on OpenRouter's daily inference rankings in May 2026. Memory OS — a 6-layer open-source memory stack — shipped on top of Hermes in June 2026.
- **License**: MIT
- **LATAM angle**: Runs on a $5 VPS. No GPU required for basic tasks.

### 3. GitHub Spec-Kit — 111k Stars, Antidote to Vibe Coding
- **Repo**: [github/spec-kit](https://github.com/github/spec-kit)
- **Why now**: GitHub's own toolkit for Spec-Driven Development — write a specification first, let AI generate code that matches it, validate against the spec. The "Spec-Kit vs Vibe Coding" debate dominated developer Twitter/X in May 2026. Crossed 90k then 111k stars in rapid succession. Supports 30+ AI coding agents as of v0.11.0 (June 2026). Shipped 55+ releases since late February 2026.
- **License**: MIT
- **LATAM angle**: Agent-agnostic — works with free/local models, not just paid APIs.

### 4. Zed Editor v1.0 — 55k Stars, AI-Native IDE in Rust
- **Repo**: [zed-industries/zed](https://github.com/zed-industries/zed)
- **Why now**: Version 1.0 released April 2026 after $32M in Sequoia funding. Built in Rust: <500ms cold start, <2ms keystroke latency. Native Agent Panel, built-in Zeta2 code prediction model (open-source), full Ollama support for local AI. Real-time multiplayer collaboration built in. Growing as the VS Code alternative for performance-sensitive teams.
- **License**: GPL-3.0
- **LATAM angle**: Local AI (Ollama + Zeta2) works without any API keys — privacy by default.

### 5. OpenAI Codex CLI — 95k Stars, Terminal Coding Agent
- **Repo**: [openai/codex](https://github.com/openai/codex)
- **Why now**: OpenAI's own lightweight terminal-based coding agent. 95k stars. Integrates with Spec-Kit's 30+ supported agents. Available via spec-kit `specify` CLI alongside Claude Code, Cursor, and Gemini CLI.
- **License**: Apache-2.0

### 6. Memory OS (Hermes Extension) — June 2026 Launch
- **Repo**: Building on NousResearch/hermes-agent
- **Why now**: A 6-layer open-source memory stack built on top of Hermes Agent launched June 1, 2026. Adds a structured hierarchy: world model → episodic → semantic → procedural → working → sensory memory layers. Enables agents to build rich, queryable knowledge graphs from experience.
- **License**: MIT (follows Hermes)

## Signals to Watch

- **Spec-Driven Development is displacing Vibe Coding**: Amazon's spec-native Kiro IDE went to global GA on May 7, 2026. GitHub Spec-Kit, Cursor's spec mode, and Kiro all follow the same "write spec first" paradigm.
- **Agent session length 4x in one year**: Anthropic's 2026 Agentic Coding Trends Report documents average session length growing from 4 minutes (Q1 2025) to 23 minutes (Q1 2026) — direct evidence that agents are taking on substantially more complex, long-running work.
- **Persistent memory as the next frontier**: Hermes Agent's 3-tier architecture and Memory OS are the first production-ready open-source answer to "agents that remember." The pattern eliminates RAG overhead for personal/enterprise knowledge agents.
- **CLI > IDE**: Command-line AI agents (Claude Code, Codex CLI, Goose, Aider) are outpacing IDE plugins. Developers want agentic loops in terminals, not just autocomplete in editors.

---
*Pipeline automático — se actualiza cada hora.*
