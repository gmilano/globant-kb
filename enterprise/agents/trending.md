# 📈 Trending AI Agents — Enterprise (Week of 2026-07-13)

> What's new and breaking in enterprise AI agents this week.

## 🔥 Breaking This Week

### Microsoft Agent Framework (MAF) Unification
AutoGen and Semantic Kernel are officially merging into the **Microsoft Agent Framework (MAF)**. Enterprise orgs with Azure investments get a single unified agentic SDK. The `spec-to-agents` reference implementation ([microsoft/spec-to-agents](https://github.com/microsoft/spec-to-agents)) demonstrates the new pattern: event-driven multi-agent planning with Semantic Kernel orchestration + AutoGen execution. This is the recommended path for enterprise Microsoft shops.

### LangGraph 0.4 — HITL Checkpoints Hardened
LangGraph 0.4 (April 2026) sharpened state persistence and Human-In-The-Loop (HITL) checkpoints — critical for enterprise compliance where audit trails are mandatory. Surpassed CrewAI in GitHub stars in Q1 2026, driven by enterprise production deployments. The `interrupt()` + checkpoint API is now the de facto enterprise standard for agentic approval workflows.

### CrewAI 0.105 — Enterprise Observability
CrewAI 0.105 (March 2026) ships enterprise observability (Prometheus metrics, Grafana dashboards) and scheduling (cron-based crew triggers). 1,500+ organizations in production; 60%+ Fortune 500 companies using it. New `CrewOutput` structured schema makes downstream integrations cleaner.

### Q2 2026: Busiest Agent Framework Quarter Ever
April–July 2026 delivered more shipped features across the agent-framework ecosystem than any prior quarter in history. Gartner now predicts 40% of enterprise apps will embed task-specific AI agents by EOY 2026, up from <5% in 2025 — the fastest enterprise tech adoption curve ever measured.

### n8n 182k Stars — Enterprises Self-Hosting at Scale
n8n crossed 182k GitHub stars. The native AI node ecosystem (OpenAI, Anthropic Claude, Gemini, Ollama) allows enterprises to wire AI into any existing workflow without a dedicated ML team. The Apache-2.0 (fair-code) `n8n-io/n8n` license is accepted by most enterprise legal teams.

### Pydantic AI Rising for Enterprise Data Pipelines
Pydantic AI's type-safe approach to agent building is gaining traction in enterprises with strict schema contracts (banking, insurance, healthcare compliance). Structured outputs with Pydantic validation prevent hallucination-induced data corruption in automated pipelines.

## 📊 GitHub Star Velocity (Last 30 Days)

| Repo | Stars Added | Total |
|------|------------|-------|
| openclaw/openclaw | +12k | ~375k |
| n8n-io/n8n | +3k | ~182k |
| langflow-ai/langflow | +2.5k | ~146k |
| langgenius/dify | +3k | ~136k |
| crewAIInc/crewAI | +1.8k | ~32k |
| langchain-ai/langgraph | +2.1k | ~18k |
| pydantic/pydantic-ai | +1.2k | ~12k |

## 🎯 Globant Studio Signal

- **MAF unification** = opportunity to position Globant as the Microsoft-aligned enterprise agent integrator for Azure-native clients
- **HITL checkpointing** in LangGraph = sellable as compliance/risk-reduction for regulated industries (banking, insurance, pharma)
- **n8n self-hosted** = rapid enterprise pilot deployments without cloud vendor lock-in — ideal for LATAM clients with data residency requirements
- Gartner's "40% of apps by EOY 2026" creates executive urgency — use this stat in client decks and RFPs
- CrewAI's Fortune 500 penetration makes it a safe enterprise recommendation; pair with LangGraph for compliance-critical flows
