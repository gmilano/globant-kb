# 🧩 Composition Patterns — Technology Industry

> Concrete recipes for building AI solutions: specific repos + agents + wiring instructions.
> Each pattern is a production-ready architecture Globant can deliver.
> Last updated: 2026-07-03

---

## Architecture Base

```
[Vertical Platform (Backstage / Gitea / Supabase / Dify)]
                    ↓
        [MCP Tool Servers / REST APIs]
                    ↓
    [Agent Orchestrator (LangGraph / CrewAI)]
                    ↓
      [LLM (Claude / GPT-4o / local vLLM)]
                    ↓
    [Observability (Langfuse) + Memory (Mem0)]
                    ↓
    [Output: code patch / PR / ticket / alert / deploy]
```

---

## Recipe 1: AI Autonomous Code Review & Fix Agent

**Goal**: Every PR automatically reviewed, bugs found, and fix suggestions applied as commits.

**Stack**:
- **Trigger**: GitHub/Gitea webhook on PR open
- **Orchestrator**: [LangGraph](https://github.com/langchain-ai/langgraph) (stateful workflow)
- **Agent**: [SWE-agent](https://github.com/SWE-agent/SWE-agent) (code analysis + fix generation)
- **LLM**: Claude claude-sonnet-4-6 or local [vLLM](https://github.com/vllm-project/vllm) + Qwen2.5-Coder
- **Memory**: [Mem0](https://github.com/mem0ai/mem0) (remember project conventions across PRs)
- **Observability**: [Langfuse](https://github.com/langfuse/langfuse) (trace every review, eval quality)

**Wire-up**:
```python
# LangGraph workflow
graph = StateGraph(ReviewState)
graph.add_node("fetch_diff", fetch_pr_diff_node)
graph.add_node("analyze", swe_agent_analyze_node)   # SWE-agent ACI
graph.add_node("propose_fix", llm_fix_node)
graph.add_node("post_comment", github_comment_node)
graph.add_edge("fetch_diff", "analyze")
graph.add_conditional_edges("analyze", route_by_severity)

# Langfuse wraps the whole workflow
with langfuse.trace(name="pr-review") as trace:
    result = graph.invoke({"pr_url": pr_url})
```

**Estimated build**: 3–4 weeks  
**ROI**: Catch 60–80% of common bugs before human review. Save 30min/PR for senior engineers.

---

## Recipe 2: Multi-Agent Software Development Crew

**Goal**: Given a feature spec, a crew of agents plans, implements, tests, and opens a PR — autonomously.

**Stack**:
- **Framework**: [CrewAI](https://github.com/crewAIInc/crewAI) (role-based crews)
- **Agents**:
  - `PlannerAgent`: breaks spec into tasks (Claude claude-opus-4-8 for reasoning)
  - `ArchitectAgent`: chooses patterns, writes interfaces (Claude claude-sonnet-4-6)
  - `ImplementerAgent`: writes code using [Aider](https://github.com/Aider-AI/aider) tool (Claude claude-sonnet-4-6)
  - `TesterAgent`: generates and runs tests via [OpenHands](https://github.com/OpenHands/OpenHands) sandbox
  - `ReviewerAgent`: final code review, opens PR (Claude claude-haiku-4-5 for efficiency)
- **Observability**: [Langfuse](https://github.com/langfuse/langfuse) (trace each agent step, cost per feature)
- **Output**: Git branch + PR with implementation, tests, and changelog

```python
from crewai import Agent, Task, Crew

planner = Agent(role="Tech Lead", goal="Break feature into implementable tasks",
                tools=[jira_tool, confluence_tool], llm="claude-opus-4-8")
implementer = Agent(role="Senior Engineer", goal="Implement assigned tasks",
                    tools=[aider_tool, shell_tool], llm="claude-sonnet-4-6")
tester = Agent(role="QA Engineer", goal="Write and run tests for all changes",
               tools=[openhands_sandbox_tool], llm="claude-sonnet-4-6")

crew = Crew(agents=[planner, implementer, tester],
            tasks=[plan_task, implement_task, test_task],
            process=Process.sequential)

result = crew.kickoff(inputs={"feature_spec": spec})
```

**Estimated build**: 5–7 weeks (incl. tool integration)  
**ROI**: 10x output per engineer on well-defined features. Best for backlog burn-down sprints.

---

## Recipe 3: AI Internal Developer Portal (Backstage + AI)

**Goal**: Backstage IDP where developers ask questions in natural language: "How do I deploy service X to staging?" and get live, accurate answers from runbooks + live cluster state.

**Stack**:
- **Base**: [Backstage](https://github.com/backstage/backstage) (developer portal)
- **Infra data**: [Crossplane](https://github.com/crossplane/crossplane) (K8s-native resource discovery) + [Argo CD](https://github.com/argoproj/argo-cd) (deployment state)
- **RAG**: [Langchain](https://github.com/langchain-ai/langchain) + [Supabase](https://github.com/supabase/supabase) pgvector (index all runbooks, ADRs, READMEs)
- **Orchestrator**: [LangGraph](https://github.com/langchain-ai/langgraph) (route query → RAG vs. live API vs. agent action)
- **LLM**: Claude claude-sonnet-4-6 or local [vLLM](https://github.com/vllm-project/vllm)
- **Observability**: [Langfuse](https://github.com/langfuse/langfuse)

**Architecture**:
```
Developer asks: "Why is auth-service deployment failing?"
        ↓
LangGraph router: classify query
        ↓
Parallel: [RAG over runbooks] + [Argo CD API: get deployment logs] + [Crossplane: get resource status]
        ↓
Claude synthesizes: "Deployment failing because PVC quota exceeded. Runbook step 3: increase quota."
        ↓
Backstage UI shows answer + link to runbook + one-click fix action
```

**Estimated build**: 4–6 weeks  
**ROI**: 60–70% reduction in L1 developer support tickets. Senior engineers freed from answering repetitive infra questions.

---

## Recipe 4: LLMOps Pipeline — AI App Factory

**Goal**: Rapid deployment of client AI applications using Dify as the platform backbone, with full observability and continuous improvement loop.

**Stack**:
- **Platform**: [Dify](https://github.com/langgenius/dify) (visual builder + RAG + monitoring, self-hosted)
- **LLM Gateway**: [LiteLLM](https://github.com/BerriAI/litellm) (route to Claude/GPT-4o/local based on cost/quality)
- **LLM Serving**: [vLLM](https://github.com/vllm-project/vllm) (on-premise for sensitive client data)
- **Observability**: [Langfuse](https://github.com/langfuse/langfuse) (Dify → Langfuse via OpenTelemetry integration)
- **Memory**: [Mem0](https://github.com/mem0ai/mem0) (user memory across sessions)

**Flow**:
```
Client requirement (3 day POC)
        ↓
Dify: visual workflow (drag-and-drop) → deployed app in hours
        ↓
LiteLLM: route expensive queries to Claude claude-opus-4-8, simple to Claude claude-haiku-4-5 (80% cost savings)
        ↓
Langfuse: track user sessions, eval quality, optimize prompts
        ↓
Graduate to LangGraph code when workflow complexity exceeds Dify's visual builder
```

**Estimated build (client POC)**: 3–5 days  
**Estimated build (production)**: 3–5 weeks (add Langfuse eval loop, LiteLLM cost optimization, Mem0 memory)

---

## Recipe 5: Self-Healing CI/CD with AI Agents

**Goal**: When CI fails, an AI agent diagnoses the failure, patches the code, and re-runs — without human intervention for known failure patterns.

**Stack**:
- **Trigger**: GitHub Actions / Gitea CI on test failure
- **Agent**: [OpenHands](https://github.com/OpenHands/OpenHands) (autonomous coding in sandbox)
- **Orchestrator**: [LangGraph](https://github.com/langchain-ai/langgraph) (retry loop with human escalation after N attempts)
- **Memory**: [Mem0](https://github.com/mem0ai/mem0) (remember fix patterns — "flaky test X fixed by Y approach")
- **Observability**: [Langfuse](https://github.com/langfuse/langfuse) (trace each fix attempt, success rate KPI)

```python
# LangGraph self-healing loop
def should_retry(state: CIState) -> str:
    if state.attempt_count > 3:
        return "escalate_to_human"
    if state.fix_confidence < 0.7:
        return "escalate_to_human"
    return "apply_fix"

graph.add_conditional_edges("diagnose", should_retry)
```

**Estimated build**: 4–5 weeks  
**ROI**: 40–60% of CI failures auto-resolved (flaky tests, import errors, env vars, linting). Saves 15-30min/failure for developer who would otherwise investigate.

---

## Recipe 6: AI DevOps Assistant (n8n + MCP)

**Goal**: Slack-connected AI assistant that answers operational questions, triggers runbooks, and creates tickets — all from a single chat interface.

**Stack**:
- **Workflow**: [n8n](https://github.com/n8n-io/n8n) (Slack webhook → AI node → Jira/PagerDuty/GitHub actions)
- **AI Node**: Claude claude-sonnet-4-6 via Anthropic API (n8n has native Anthropic integration)
- **MCP Tools**: Kubernetes MCP server, GitHub MCP server, Jira MCP server
- **Knowledge Base**: [Langfuse](https://github.com/langfuse/langfuse) dataset of past incidents + resolutions
- **Memory**: [Mem0](https://github.com/mem0ai/mem0) (remember infrastructure context per team)

```
Slack: "@ai-ops why is prod latency spiking?"
        ↓
n8n: route to AI node
        ↓
Claude + K8s MCP: query pod metrics, recent deploys, resource usage
        ↓
n8n: format response with charts (Grafana snapshot)
        ↓
Slack: "Latency spike started 14:23 UTC, correlates with deploy #1234. auth-service pods using 95% CPU. Recommend: scale auth-service to 6 replicas. [one-click action]"
```

**Estimated build**: 2–3 weeks  
**ROI**: On-call engineers answer 70% fewer Slack questions. Mean time to diagnosis (MTTD) drops from 20min to 2min.

---

---

## Recipe 7: Self-Hosted Copilot Alternative (Tabby + Continue + Ollama)

**Goal**: Replace GitHub Copilot Enterprise ($39/user/month) with a self-hosted stack that keeps all code on-prem.

**Stack**:
- **Completion server**: [Tabby](https://github.com/TabbyML/tabby) (Apache-2.0, ~33k stars) — LSP-compatible server
- **IDE plugin**: [Continue](https://github.com/continuedev/continue) (Apache-2.0) — VS Code + JetBrains integration
- **LLM inference**: [Ollama](https://github.com/ollama/ollama) (MIT, ~120k stars) — runs Codestral / Qwen2.5-Coder locally
- **Model**: Codestral (Mistral) or DeepSeek Coder V2 — best open-weight code models as of mid-2026

**Wire-up**:
```
Developer in VS Code → Continue plugin:
  Inline completion → Tabby (LSP) → Ollama (Codestral model, GPU server)
  Chat sidebar → Continue → Ollama (Qwen2.5-Coder-32B)
  Codebase Q&A → Continue → Tabby repo index → Gitea API

Tabby admin (one-time):
  - Point Tabby at Gitea repos for context indexing
  - Enable enterprise auth (SSO via OIDC)
  - View team analytics dashboard for adoption metrics
```

**Cost breakdown (20-dev team)**:
- GitHub Copilot Enterprise: 20 × $39 = $780/month
- Self-hosted: 1× RTX 4090 GPU server ~$600/month cloud, all OSS software = $0
- Break-even: **~20 developers**; profitable above that
- **Bonus**: Code never leaves client infrastructure — satisfies data sovereignty requirements

**Build timeline**: 1–2 weeks (infra) + 1 week (IDE rollout)

---

## Recipe 8: Sovereign Dev Platform (LATAM / Regulated Clients)

**Goal**: Full self-hosted development platform replacing GitHub + GitHub Actions + DataDog for clients with data sovereignty, regulatory, or cost requirements.

**Stack**:
- [forgejo/forgejo](https://codeberg.org/forgejo/forgejo) — self-hosted Git + code review + issue tracker (MIT)
- [woodpecker-ci/woodpecker](https://github.com/woodpecker-ci/woodpecker) — CI/CD pipelines (Apache-2.0)
- [backstage/backstage](https://github.com/backstage/backstage) — internal developer portal (Apache-2.0)
- [SigNoz/signoz](https://github.com/SigNoz/signoz) — full-stack observability + LLM traces (Apache-2.0)
- [ollama/ollama](https://github.com/ollama/ollama) — on-premise LLM runtime (MIT)
- [cline/cline](https://github.com/cline/cline) — AI coding (Apache-2.0, points to local Ollama)
- [langfuse/langfuse](https://github.com/langfuse/langfuse) — LLM observability (MIT)

**Infrastructure sizing**:
```
On-premise or private cloud:
├── Forgejo               — 2 CPU, 4GB RAM per 100 devs
├── Woodpecker CI         — scales horizontally with worker agents
├── Backstage IDP         — Node.js + PostgreSQL, 4 CPU, 8GB
├── SigNoz                — ClickHouse backend, 3-node min, 8 CPU, 16GB
├── Ollama (GPU server)   — NVIDIA A10G or equiv for 70B models
└── Cline (dev laptops)   — VS Code extension → Ollama endpoint
```

**Migration path from GitHub** (LATAM enterprise):
```
Phase 1 (4 weeks): Mirror — Forgejo mirrors GitHub repos, both active
Phase 2 (4 weeks): CI/CD — Woodpecker runs alongside GitHub Actions
Phase 3 (4 weeks): Cut-over — Forgejo primary, GitHub archived read-only
Phase 4 (ongoing): AI layer — Ollama + Cline + LangGraph on Forgejo webhooks
```

**Build timeline**: 12–16 weeks for full migration + AI layer  
**ROI**: ~60–70% cost reduction vs. GitHub Enterprise + GitHub Copilot + DataDog; complete data sovereignty; satisfies LGPD (Brazil), open source procurement mandates (LATAM government); no per-seat licensing.

---

## Recipe 9: AI SRE — Autonomous Incident Response

**Goal**: Reduce on-call burden by 35%+. L1/L2 incidents auto-diagnosed and remediated; only novel/high-severity incidents reach humans.

**Stack**:
- **Alerting**: [prometheus/prometheus](https://github.com/prometheus/prometheus) (Apache-2.0) + [grafana/grafana](https://github.com/grafana/grafana) (AGPL-3.0, Grafana 13 with native AI agent metrics panel)
- **APM + LLM spans**: [SigNoz/signoz](https://github.com/SigNoz/signoz) (AGPL-3.0) — unified infra + AI call observability in ClickHouse
- **Agent orchestration**: [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) (MIT) — stateful incident workflow with HITL gates for destructive actions
- **Durable execution**: [temporalio/temporal](https://github.com/temporalio/temporal) (MIT) — long-running remediations (DB vacuum, node drain) with guaranteed retry
- **Agent observability**: [langfuse/langfuse](https://github.com/langfuse/langfuse) (MIT) — trace every AI reasoning step for post-incident review
- **Notification**: Mattermost bot (AGPL-3.0) or PagerDuty webhook

**Wire-up**:
```python
from langgraph.graph import StateGraph
from langchain_anthropic import ChatAnthropic

def build_incident_graph():
    graph = StateGraph(IncidentState)
    
    # Nodes
    graph.add_node("fetch_context", fetch_logs_metrics_runbook)  # Pull Prometheus/SigNoz data
    graph.add_node("diagnose", llm_diagnose_root_cause)          # LLM reasons with runbook
    graph.add_node("propose_fix", generate_remediation_plan)
    graph.add_node("human_approval", wait_for_mattermost_approval)  # HITL for prod-critical
    graph.add_node("execute_fix", run_kubectl_or_remediation_script)
    graph.add_node("verify_resolution", check_prometheus_alert_cleared)
    graph.add_node("notify", post_incident_report_to_mattermost)

    # Edges
    graph.add_edge("fetch_context", "diagnose")
    graph.add_edge("diagnose", "propose_fix")
    graph.add_conditional_edges(
        "propose_fix",
        route_by_severity,  # LOW/MEDIUM → auto; HIGH/CRITICAL → human approval
        {"auto": "execute_fix", "manual": "human_approval"}
    )
    graph.add_edge("human_approval", "execute_fix")
    graph.add_edge("execute_fix", "verify_resolution")
    graph.add_edge("verify_resolution", "notify")
    return graph.compile()

# Prometheus AlertManager webhook receiver
# receivers:
#   - name: ai-sre
#     webhook_configs:
#       - url: http://ai-sre-agent:8080/alert
#         send_resolved: true
```

```go
// Temporal workflow for long-running remediations (e.g., PostgreSQL vacuum, node drain)
func RemediationWorkflow(ctx workflow.Context, incident Incident) error {
    ao := workflow.ActivityOptions{StartToCloseTimeout: 2 * time.Hour, RetryPolicy: &temporal.RetryPolicy{MaxAttempts: 3}}
    ctx = workflow.WithActivityOptions(ctx, ao)
    
    var plan string
    workflow.ExecuteActivity(ctx, DiagnoseActivity, incident).Get(ctx, &plan)
    workflow.ExecuteActivity(ctx, ExecuteRemediationActivity, plan).Get(ctx, nil)
    workflow.ExecuteActivity(ctx, VerifyResolutionActivity, incident).Get(ctx, nil)
    return nil
}
```

**Grafana 13 setup** (GrafanaCON 2026):
- New AI/LLM metrics panel type: visualize agent decision latency, resolution confidence score
- AlertManager → Grafana annotations → LangGraph webhook pipeline
- SigNoz embedded LLM spans: see when the AI agent called the LLM and what it cost

**Build timeline**: 6–10 weeks (2 weeks MVP with human approval on all actions; 4-6 weeks to autonomous L1/L2)
**ROI**: MTTR -40-70% for L1/L2 incidents; on-call pages -35%; Gartner: 85% enterprises using AI SRE by 2029

---

## Quick-Start Matrix

| Client need | Start here | Timeline | Complexity |
|-------------|-----------|----------|------------|
| AI code review | SWE-agent + LangGraph | 3 weeks | Low |
| Automate feature development | CrewAI multi-agent crew | 6 weeks | Medium |
| Developer portal with AI | Backstage + RAG + Claude | 5 weeks | Medium |
| Rapid AI app for client | Dify + Langfuse | 5 days (POC) | Low |
| Self-healing CI | OpenHands + LangGraph | 4 weeks | Medium |
| DevOps Slack assistant | n8n + Claude + MCP | 2 weeks | Low |
| Private LLM deployment | vLLM + Ollama + LiteLLM | 2 weeks | Medium |
| On-prem Copilot replacement | Tabby + Continue + Ollama | 2 weeks | Low-Medium |
| AI SRE / autonomous ops | LangGraph + Prometheus + Grafana 13 + Temporal + Langfuse | 8 weeks | Medium-High |
| Sovereign dev platform | Forgejo + Woodpecker + Backstage + SigNoz + Ollama | 12 weeks | Medium-High |
