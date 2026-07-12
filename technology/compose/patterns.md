# Composition Patterns — Technology Industry

> Concrete recipes combining real repos + agents + AI for technology client engagements.
> Last updated: 2026-07-12

## Architecture Template

```
[Vertical Platform Base — Gitea / GitLab CE / MLflow / OpenObserve]
            ↓
[Spec-Driven Layer — GitHub Spec-Kit (specify CLI)]
            ↓
[Agent Orchestration Layer — LangGraph / CrewAI / Dify]
            ↓
[Specialized AI Agents — OpenHands / Hermes Agent / OpenClaw / SWE-agent]
            ↓
[Persistent Memory — Hermes 3-tier memory / Memory OS]
            ↓
[LLM Layer — Claude API / Ollama (local) / HuggingFace Inference]
            ↓
[Observability — OpenObserve + OpenTelemetry + Langfuse]
            ↓
[UI / API — Dify chat UI / Vercel AI SDK / MCP Client]
```

---

## Pattern 1: Autonomous PR Review & Code Quality Agent

**Goal**: Automatically review every PR for bugs, security issues, and style — reducing human review burden by 60%+.

**Stack**:
- [anthropics/claude-code-security-review](https://github.com/anthropics/claude-code-security-review) (MIT, 5.4k stars) — GitHub Action for AI security review
- [All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands) (MIT, 70k+) — autonomous agent for code analysis
- [Gitea](https://github.com/go-gitea/gitea) or GitHub — source control platform
- Claude API (claude-opus-4-8 for review; claude-haiku-4-5 for inline comments)
- [openobserve/openobserve](https://github.com/openobserve/openobserve) — log all agent decisions + review actions

**Wire-up**:
```yaml
# .github/workflows/ai-review.yml
on: [pull_request]
jobs:
  security-review:
    uses: anthropics/claude-code-security-review/.github/workflows/review.yml
    with:
      model: claude-opus-4-8
  code-review-agent:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run OpenHands review agent
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          docker run -e ANTHROPIC_API_KEY \
            ghcr.io/all-hands-ai/openhands:latest \
            python -m openhands.core.main \
            -t "Review this PR diff for correctness bugs, security issues, and simplification opportunities. Output a structured JSON report."
```

**Estimated effort**: 3–5 days to deploy and tune thresholds.

---

## Pattern 2: Sovereign AI Developer Stack (Air-Gapped / LATAM)

**Goal**: Full AI-augmented development environment for clients with data residency requirements (Brazil LGPD, Mexico data locality, banking/government clients).

**Stack**:
- [ollama/ollama](https://github.com/ollama/ollama) (MIT, 110k+) — run Llama 3.1 70B or Qwen3 72B locally
- [continuedev/continue](https://github.com/continuedev/continue) (Apache-2.0, 31k) — VS Code AI assistant pointing at Ollama
- [zed-industries/zed](https://github.com/zed-industries/zed) (GPL-3.0, 55k) — AI-native editor with built-in Agent Panel + Zeta2 model; Ollama integration
- [go-gitea/gitea](https://github.com/go-gitea/gitea) (MIT) — self-hosted Git server
- [block/goose](https://github.com/block/goose) (Apache-2.0, 32k) — local autonomous developer agent
- [openclaw/openclaw](https://github.com/openclaw/openclaw) (MIT, 346k+) — local AI assistant gateway
- [openobserve/openobserve](https://github.com/openobserve/openobserve) (Apache-2.0) — observability, self-hosted

**Wire-up** (docker-compose.yml skeleton):
```yaml
services:
  ollama:
    image: ollama/ollama:latest
    volumes: [ollama_models:/root/.ollama]
    deploy:
      resources:
        reservations:
          devices: [{capabilities: [gpu]}]
  
  gitea:
    image: gitea/gitea:latest
    ports: ["3000:3000", "22:22"]
    volumes: [gitea_data:/data]
  
  openclaw:
    image: ghcr.io/openclaw/openclaw:latest
    ports: ["3001:3001"]
    environment:
      OPENCLAW_MODEL_URL: http://ollama:11434
  
  openobserve:
    image: public.ecr.aws/zinclabs/openobserve:latest
    ports: ["5080:5080"]
    environment:
      ZO_ROOT_USER_EMAIL: admin@example.com
      ZO_ROOT_USER_PASSWORD: "${OZ_PASSWORD}"

# Goose config: GOOSE_MODEL=ollama/qwen3:72b GOOSE_BASE_URL=http://ollama:11434
# Zed config: Agent Panel → Ollama endpoint at http://ollama:11434
```

**Estimated effort**: 5–8 days for full stack deployment + client onboarding.

---

## Pattern 3: Autonomous CI/CD Fix Agent (LangGraph + OpenHands)

**Goal**: When a CI pipeline fails, an agent automatically analyzes the logs, identifies the root cause, proposes a fix, opens a PR, and notifies the team.

**Stack**:
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) (MIT, 36.7k) — stateful agent graph for multi-step pipeline
- [All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands) (MIT, 70k+) — code execution and patching agent
- [PrefectHQ/prefect](https://github.com/PrefectHQ/prefect) (Apache-2.0) — pipeline orchestration triggering the agent flow
- Claude API — LLM reasoning for log analysis and fix proposal
- [mattermost/mattermost](https://github.com/mattermost/mattermost) (Apache-2.0) — notification channel

**Agent Graph**:
```python
from langgraph.graph import StateGraph

graph = StateGraph(CIFixState)
graph.add_node("fetch_logs", fetch_ci_logs)             # Call GitHub/Jenkins API
graph.add_node("analyze_failure", analyze_with_claude)   # LLM root cause analysis
graph.add_node("generate_fix", openhands_fix_agent)      # OpenHands patches code
graph.add_node("open_pr", create_draft_pr)               # GitHub PR creation
graph.add_node("notify", send_mattermost_message)        # Team notification
graph.add_node("human_review", human_in_the_loop)        # HITL gate before merge

graph.add_edge("fetch_logs", "analyze_failure")
graph.add_conditional_edges("analyze_failure", route_by_confidence, {
    "high": "generate_fix",
    "low": "notify"  # escalate to human if not confident
})
graph.add_edge("generate_fix", "open_pr")
graph.add_edge("open_pr", "notify")
graph.add_edge("notify", "human_review")
```

**Estimated effort**: 8–12 days including testing and HITL approval workflow.

---

## Pattern 4: MLOps Platform for AI Product Teams

**Goal**: Give a client's AI/ML team a complete, self-hosted MLOps platform — experiment tracking, model registry, pipeline orchestration, serving, and monitoring.

**Stack**:
- [mlflow/mlflow](https://github.com/mlflow/mlflow) (Apache-2.0, 20k) — experiment tracking + model registry + AI gateway
- [kubeflow/kubeflow](https://github.com/kubeflow/kubeflow) (Apache-2.0, 14k) — pipeline orchestration on K8s + KServe model serving
- [iterative/dvc](https://github.com/iterative/dvc) (Apache-2.0, 14k) — dataset + model versioning in Git
- [ray-project/ray](https://github.com/ray-project/ray) (Apache-2.0, 35k) — distributed training + hyperparameter tuning
- [openobserve/openobserve](https://github.com/openobserve/openobserve) — LLM call traces + model serving metrics
- Claude API — AI assistant for MLflow UI, model card generation, A/B test analysis

**Pipeline flow**:
```
Data scientist → DVC push (data version) →
  Kubeflow Pipeline triggered →
    Ray Train (distributed fine-tuning) →
      MLflow autolog (metrics, params, artifacts) →
        MLflow Model Registry (staging → production promotion) →
          KServe InferenceService (deploy model endpoint) →
            OpenObserve (monitor latency, error rate, token cost)
```

**Estimated effort**: 15–20 days for full platform deployment + documentation.

---

## Pattern 5: Internal Knowledge Agent (RAG + MCP + LangGraph)

**Goal**: Give a technology company's engineers a conversational agent that answers questions from internal docs, runbooks, ADRs, and code repositories.

**Stack**:
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) (MIT, 36.7k) — agent orchestration
- [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) (MIT, 18k) — Git MCP server (read codebase), filesystem MCP (read docs)
- [langgenius/dify](https://github.com/langgenius/dify) (Apache-2.0, 148k) — RAG pipeline + chat UI
- Claude API — semantic understanding, answer synthesis
- [openobserve/openobserve](https://github.com/openobserve/openobserve) — query logs, answer quality metrics

**Agent flow**:
```
User question →
  LangGraph router:
    → RAG over Dify knowledge base (embedding + vector search)
    → Code search via Git MCP server
    → Web search (via Fetch MCP server) for external references
  → Claude synthesis (multi-source answer with citations)
  → Response with source links
```

**Estimated effort**: 5–7 days for MVP; 2–3 weeks for production with SSO + access control.

---

## Pattern 6: Agentic Code Migration (Legacy → Modern Stack)

**Goal**: Use an autonomous agent fleet to migrate a legacy codebase (e.g., Java 8 → Java 21, Python 2 → 3, monolith → microservices) — a high-value Globant service line.

**Stack**:
- [princeton-nlp/SWE-agent](https://github.com/princeton-nlp/SWE-agent) (MIT, 15k) — file-by-file code transformation agent
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — orchestrate the migration fleet (parallel file agents)
- [paul-gauthier/aider](https://github.com/paul-gauthier/aider) (Apache-2.0, 41k) — interactive refactoring for complex modules
- [iterative/dvc](https://github.com/iterative/dvc) — checkpoint the migration state
- Jenkins / GitHub Actions — run tests after each agent batch

**Migration loop**:
```python
# LangGraph migration orchestrator
for file_batch in chunk_by_complexity(legacy_files, batch_size=10):
    for file in parallel(file_batch):
        swe_agent.transform(file, rules=MIGRATION_RULES)
    
    test_result = run_test_suite()
    if not test_result.passed:
        aider.interactive_fix(test_result.failures)  # human-in-the-loop for failures
    
    dvc.commit(f"migration: batch {batch_id}")  # checkpoint progress
```

**Estimated effort**: 3–6 weeks depending on codebase size; scales with fleet parallelism.

---

## Pattern 7: AI-Powered Developer Productivity Dashboard

**Goal**: Give engineering leadership real-time visibility into team velocity, code quality, and AI tool adoption.

**Stack**:
- [grafana/grafana](https://github.com/grafana/grafana) (AGPL-3.0, 65k) — visualization
- [prometheus/prometheus](https://github.com/prometheus/prometheus) (Apache-2.0, 56k) — metrics collection
- [openobserve/openobserve](https://github.com/openobserve/openobserve) (Apache-2.0) — logs + LLM call traces
- [open-telemetry/opentelemetry-collector](https://github.com/open-telemetry/opentelemetry-collector) (Apache-2.0) — unified telemetry pipeline
- Claude API — weekly AI-generated narrative summaries of team metrics

**Metrics tracked**:
- Deployment frequency, lead time, MTTR, change failure rate (DORA)
- AI tool usage: tokens consumed per engineer, PR acceptance rate, agent task completion rate
- Code quality: test coverage trends, security finding counts, tech debt indicators
- LLM cost per merged PR, ROI calculation
- Spec-Kit adoption: ratio of spec-driven vs vibe-coded PRs

**Estimated effort**: 4–6 days for dashboard deployment + metric instrumentation guide.

---

## Pattern 8: Spec-Driven AI Delivery (GitHub Spec-Kit + Claude Code)

**Goal**: Adopt Spec-Driven Development as Globant's standard AI delivery methodology — improving reproducibility, traceability, and reducing rework on agentic projects.

**Stack**:
- [github/spec-kit](https://github.com/github/spec-kit) (MIT, 111k) — specify CLI + templates for spec-driven workflow
- Claude Code CLI (Anthropic) — AI coding agent implementing tasks from the spec
- [go-gitea/gitea](https://github.com/go-gitea/gitea) (MIT) — self-hosted git for storing spec artifacts
- [openobserve/openobserve](https://github.com/openobserve/openobserve) — audit trail for spec → code traceability

**Workflow**:
```bash
# 1. Bootstrap a new project with Spec-Kit
npx specify init my-feature

# 2. Spec-Kit creates: SPECIFICATION.md, TECHNICAL_PLAN.md, TASKS.md
# Edit SPECIFICATION.md with the client's requirements (natural language)
# Then generate a technical plan:
npx specify plan

# 3. Generate task breakdown from the plan
npx specify tasks

# 4. Let Claude Code implement each task
# Claude Code reads TASKS.md, implements each atomic task as a commit
claude "implement the tasks in TASKS.md one by one, committing each"

# 5. Validate implementation against spec
npx specify validate

# 6. Commit spec artifacts alongside code — traceability baked in
git add SPECIFICATION.md TECHNICAL_PLAN.md TASKS.md
git commit -m "feat: <feature> — spec-driven implementation"
```

**Benefit for Globant**:
- Spec artifacts become client deliverables (not just code)
- Reduces ambiguity-driven rework by 40–60% (teams using SDD report)
- Every AI-generated commit traces back to a spec task — auditable, reviewable

**Estimated effort**: 1–2 days to adopt the workflow + 1 sprint to retrain a delivery team.

---

## Pattern 9: Persistent Memory Agent for Enterprise Knowledge (Hermes Agent)

**Goal**: Deploy an agent with institutional memory that accumulates knowledge about a client's codebase, team, and processes — so it never forgets context across sessions.

**Stack**:
- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) (MIT, 175k) — 3-tier persistent memory: holographic SQLite FTS5 + semantic + episodic logs
- Memory OS 6-layer stack (June 2026) — world model + episodic + semantic + procedural + working + sensory layers
- Claude API (claude-opus-4-8) — reasoning layer for complex queries
- [ollama/ollama](https://github.com/ollama/ollama) (MIT) — optional local LLM for privacy-first deployments
- [openobserve/openobserve](https://github.com/openobserve/openobserve) — audit memory read/write events

**Deployment**:
```python
from hermes_agent import HermesAgent, MemoryConfig

# Initialize with enterprise-grade memory config
agent = HermesAgent(
    memory=MemoryConfig(
        backend="sqlite",           # holographic FTS5 — no vector DB needed
        db_path="./enterprise_kb.db",
        semantic_model="ollama/qwen3:7b",   # local model for privacy
        episodic_window=1000        # sessions to retain
    ),
    llm_api="anthropic",
    model="claude-opus-4-8"
)

# Agent accumulates facts from every conversation
agent.learn("Our checkout service is in Python/FastAPI, team lead is María García")
agent.learn("We deploy to AWS us-east-1 and us-west-2 with Terraform")

# Next session, it remembers:
agent.ask("Who leads the checkout team?")
# → "María García leads the checkout team (Python/FastAPI service)"
```

**LATAM use case**: Run entirely on-prem. Hermes Agent + Ollama = zero API cost, zero data leaves the client's infrastructure.

**Estimated effort**: 3–5 days for single-team deployment; 2 weeks for org-wide rollout with SSO and multi-tenant memory namespacing.
