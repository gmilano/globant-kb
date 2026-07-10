# Market Intelligence — Technology Industry

> Key players, market map, LATAM opportunities.
> Last updated: 2026-07-10 (v7)

## Market Size — AI in Tech/Software Development

| Segment | 2026 Size | Projection | CAGR | Source |
|---------|-----------|------------|------|--------|
| Enterprise AI Coding Agents | $9.8B–$11.0B (annualized Apr 2026) | ~$30B by 2028 | ~45% | Gartner May 2026 |
| AI Code Gen & Developer Assistant Market | $16.13B | $78.97B by 2031 | 37.39% | Mordor Intelligence 2026 |
| Agentic AI Market (broad) | $7.84B | $52.62B by 2030 | ~46% | Grand View Research |
| MLOps Market | $2.19B | $16.6B by 2030 | 40.5% | Grand View Research |
| Agentic AI → enterprise app software revenue | 2% of app revenue (2025) | 30% ($450B+) by 2035 | — | Gartner |

## Key Players

| Company | Type | Strength | Weakness | License / Model |
|---------|------|----------|---------|----------------|
| Anthropic | Model + Tooling | Claude Code $8B ARR; 54% market share; 4% of GitHub commits; MCP creator | API costs at scale | Closed model, MCP = open standard |
| Google | Model + Infra | Gemini CLI (free 1K/day); ADK; Vertex AI; Antigravity 2.0; Qwen3 competitor Gemma 4 | Closed Gemini model | Apache-2.0 tools |
| Microsoft / GitHub | Tooling + Cloud | GitHub Copilot; Azure Hosted Agents; Semantic Kernel; AutoGen; Deloitte deal (470k employees) | Proprietary platform | Mixed open/closed |
| OpenAI | Model + Tooling | Agents SDK; Codex CLI; GPT-4.5; dominant mindshare | Closed model, pricing premium | Apache-2.0 SDK |
| ByteDance | Agent Frameworks | DeerFlow super-agent (#1 GitHub Feb 2026); Doubao enterprise LLM | Regulatory risk (US market) | Apache-2.0 |
| JetBrains | IDE | Junie AI agent in IDEs; Cline integration | Proprietary platform fee | Proprietary |
| Cursor | AI IDE | Best IDE experience; multi-file editing | Closed, subscription | Proprietary |
| Windsurf (Codeium) | AI IDE | Enterprise focus; strong autocomplete | Closed | Proprietary |
| Cline | Coding Agent | Apache-2.0; 1.5M VS Code installs; JetBrains; multi-agent; BYOK | No cloud hosting product | Apache-2.0 |
| HuggingFace | Models + Tools | smolagents; open model hub; Qwen3/DeepSeek hosting | Limited enterprise support | Apache-2.0 / MIT |
| Databricks | ML Platform | MLflow creator; Unity Catalog; DBRX open model | Complex enterprise pricing | Apache-2.0 MLflow |
| Alibaba | Open Models | Qwen3 leads open-source benchmarks (2026); Apache-2.0 | Regulatory risk (US market) | Apache-2.0 |

## Key Statistics — Developer AI Adoption 2026

| Metric | Data | Source |
|--------|------|--------|
| Engineers using AI in their work | ~60% of all work | Anthropic 2026 Agentic Coding Report |
| "Fully delegate" capability (agents) | 0-20% of tasks | Anthropic 2026 — "the delegation gap" |
| Engineering teams using AI tools daily | 73% (up from 41% in 2025) | Industry surveys 2026 |
| Claude Code market share | 54% | SemiAnalysis Apr 2026 |
| Claude Code GitHub commits share | 4% of all public commits | SemiAnalysis; projected >20% by end 2026 |
| Enterprise apps with task-specific AI agents | 40% by end 2026 (up from <5% in 2025) | Gartner 2025-08-26 |
| Agentic AI projects canceled by 2027 | 40%+ | Gartner (cost, unclear value, risk) |
| Multi-agent system inquiry surge | +1,445% (Q1 2024 → Q2 2025) | Gartner |
| New work created by AI assistance | 27% of AI-assisted work didn't exist before | Anthropic 2026 Report |
| Productivity with context engineering | 55% faster, 40% fewer errors | Anthropic 2026 Report |
| AI repos on GitHub | 4.3 million+ | GitHub Octoverse 2025 |
| MCP servers (active public) | 10,000+ | modelcontextprotocol.io Jul 2026 |
| MCP SDK downloads/month | 97 million | MCP RC announcement Jul 2026 |
| Fortune 500 with MCP deployed | 28% | Stacklok 2026 |

## MCP Ecosystem Status (July 2026)

- **RC Spec**: July 28, 2026 — stateless core, Extensions, Tasks, MCP Apps (sandboxed HTML UI), EMA stable
- **Servers**: 10,000+ active public MCP servers; 9,652 in official registry
- **SDK downloads**: 97 million / month
- **Fortune 500 adoption**: 28% have deployed MCP
- **Production**: 41% of software orgs in limited/broad production (Stacklok 2026)
- **Cross-vendor support**: OpenAI, Google, Microsoft, IBM, Amazon, Atlassian, Salesforce all adopted
- **Tasks extension**: async long-running work via `tools/call` → task handle → `tasks/get`/`tasks/cancel`

## LATAM Opportunities

### Brazil
- Largest tech market in LATAM; strong fintech + agritech AI demand
- Local model preference: DeepSeek R1 (cost), Qwen3 (performance/cost), Llama (privacy)
- Government AI programs: MCTI digital transformation; São Paulo tech hub
- **Opportunity**: AI DevOps platforms for mid-market; MLOps for agritech; context engineering as a service

### Mexico
- 77% tech company AI adoption; 80% bank partnerships
- Nearshore to US → AI-augmented dev teams in high demand
- Strong Node.js / Python ecosystem
- **Opportunity**: Agentic software factories (DeerFlow / MetaGPT / CrewAI) for export software shops

### Argentina / Colombia
- Strong engineering talent pool; AI agent startups emerging
- Buenos Aires: AI studio cluster forming
- **Opportunity**: Internal developer portals (Backstage + AI); CI/CD agent automation; context engineering programs

## Globant Positioning

| Practice | Open Source Starting Point | Differentiator |
|----------|---------------------------|----------------|
| AI Coding Agents | Cline + OpenHands + CrewAI + LangGraph | Pre-built agent crew templates per domain + context engineering setup |
| Context Engineering | CLAUDE.md + DESIGN.md + Qdrant | 55% speed + 40% error reduction — measurable, quantifiable outcome |
| Developer Portals | Backstage + Dify MCP | AI-native catalog + conversational developer experience |
| MLOps Modernization | MLflow + Kubeflow + Prefect | End-to-end ML pipeline with AI-assisted monitoring |
| Agentic DevOps | n8n + OpenHands + Prometheus | CI/CD orchestration with autonomous remediation |
| Knowledge Platforms | Qdrant + LangGraph + Dify | Enterprise RAG with audit trail and compliance |
| Long-Horizon Agents | DeerFlow + LangGraph | Multi-hour research + code tasks; sub-agent orchestration |

## The Delegation Gap — Globant's Core Opportunity

> Developers use AI in 60% of their work but can only fully delegate 0-20% of tasks.

This gap is Globant's TAM:
1. **Context Engineering Sprints** — 4-6 week engagements to build CLAUDE.md, DESIGN.md, and knowledge bases that close the delegation gap
2. **Agent Orchestration Design** — build the orchestration layer (LangGraph / DeerFlow) that coordinates specialized agents
3. **Agentic Project Governance** — for the 40% of projects Gartner says will be canceled: build the cost tracking, evaluation, and ROI measurement layer
