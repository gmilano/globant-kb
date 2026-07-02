# Trending AI Agents — Technology Industry

> What's new and gaining momentum as of 2026-07-02

## Breakout This Week / Month

### OpenClaw (Nous Research)
- **Repo**: [NousResearch/hermes-function-calling](https://github.com/NousResearch/hermes-function-calling) (Hermes/OpenClaw family)
- **License**: MIT
- **Stars**: 280k+ (fastest-growing OS project in GitHub history in early 2026)
- **What it does**: Personal AI assistant running entirely on local devices; acts as a local gateway connecting AI models to 50+ integrations (WhatsApp, Telegram, Slack, Discord, Signal, iMessage); exploded from 9k to 210k+ stars in days after going viral
- **Why it matters for Globant**: The "AI integration hub" pattern it pioneered is what enterprise clients want — a local agent that connects internal tools without data leaving the network

### Goose (Block)
- **Repo**: [block/goose](https://github.com/block/goose)
- **License**: Apache 2.0
- **Stars**: 32k+
- **What it does**: Terminal-native autonomous coding agent from Block (formerly Square); installs extensions, runs commands, edits files; designed as a generalist dev agent for day-to-day engineering tasks
- **Why it matters**: Strong enterprise pedigree from Block's engineering team; Apache 2.0 means clean Globant IP posture

### OpenHands Software Agent SDK
- **Repo**: [OpenHands/software-agent-sdk](https://github.com/OpenHands/software-agent-sdk)
- **License**: MIT
- **Stars**: 5k+ (launched 2026)
- **What it does**: Clean, modular SDK for building AI agents with OpenHands V1; designed for embedding OpenHands capabilities into custom applications — the "embed the coding agent" pattern
- **Why it matters**: Enables Globant to ship branded coding agent products on top of the OpenHands runtime

### Google Agent Dev Kit (ADK)
- **Repo**: [google/adk-python](https://github.com/google/adk-python)
- **License**: Apache 2.0
- **Stars**: 20k+ (launched April 2025, grew rapidly)
- **What it does**: Google's official agent framework; integrates natively with Gemini, Vertex AI, and Google Cloud services; A2A (Agent-to-Agent) protocol support for multi-agent mesh architectures
- **Why it matters**: Clients on Google Cloud should use ADK for native Vertex AI integration; A2A protocol is becoming the interoperability standard for enterprise agent mesh

### Mastra
- **Repo**: [mastra-ai/mastra](https://github.com/mastra-ai/mastra)
- **License**: Apache 2.0
- **Stars**: 15k+
- **What it does**: TypeScript-native agent framework with built-in workflow engine, vector memory, and tool registry; first-class support for deploying agents to Vercel/Cloudflare Edge
- **Why it matters**: Best choice for TypeScript-first teams building agent APIs; fills the gap LangChain left for JS/TS developers

## Momentum Chart

| Agent/Framework | Stars Δ (30d) | Direction | Momentum Driver |
|----------------|---------------|-----------|-----------------|
| OpenClaw | +180k | 🚀 Viral | Personal AI hub + local-first angle |
| Google ADK | +5k | ↑ Steady | Enterprise Google Cloud adoption |
| Mastra | +4k | ↑ Rising | TypeScript community + Vercel/Edge deploy |
| Goose | +3k | ↑ Rising | Block open-source credibility |
| OpenHands SDK | +3k | ↑ Rising | Embedded coding agent use case |
| CrewAI | +2k | → Stable | Largest community, production deployments |
| Cline | +2k | → Stable | VS Code dominance maintained |

## Declining / Consolidating

- **LangChain (raw)**: Usage shifting to LangGraph (stateful) and Mastra (TypeScript) — still relevant but no longer the first choice for new builds
- **Flowise**: Visual builder use cases consolidating around Langflow and Dify which have larger ecosystems
