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
