# Composition Patterns — Technology Industry

> Concrete recipes using real repos + agents + wiring instructions.
> Last updated: 2026-07-10

## Architecture Base

```
[Open Source Vertical Platform]
         ↓
[MCP Server Layer (expose APIs)]
         ↓
[Agent Orchestration (LangGraph / CrewAI)]
         ↓
[Reasoning Model (Claude / Gemini / Ollama)]
         ↓
[Specialized Coding Agents (OpenHands / MetaGPT)]
         ↓
[Observability (Grafana + Prometheus)]
```

---

## P1 — Autonomous Code Review Pipeline

**Problem**: manual PR reviews are a bottleneck; junior code quality inconsistent.

**Stack**: OpenHands + GitHub MCP + Claude Fable 5 + LangGraph

```python
from langgraph.graph import StateGraph
from anthropic import Anthropic

client = Anthropic()

def review_pr(state):
    pr_diff = state["diff"]
    response = client.messages.create(
        model="claude-fable-5",
        max_tokens=4096,
        tools=[{"name": "mcp__github__pull_request_review_write", ...}],
        messages=[{
            "role": "user",
            "content": f"""Review this PR diff for:
1. Security vulnerabilities (OWASP Top 10)
2. Performance issues
3. Test coverage gaps
4. Style violations

Diff:
{pr_diff}

Post inline comments via the GitHub MCP tool."""
        }]
    )
    return {"review": response}

def run_tests(state):
    # OpenHands runs tests in sandboxed container
    pass

graph = StateGraph(dict)
graph.add_node("review", review_pr)
graph.add_node("test", run_tests)
graph.add_edge("review", "test")
```

**Wiring**: GitHub Actions webhook → LangGraph → Claude review → OpenHands test run → GitHub MCP post comments

**Timeline**: 2-3 weeks | **Deal size**: $40k-$120k | **ROI**: 60-80% reduction in review cycle time

---

## P2 — Agentic Software Factory (MetaGPT + OpenHands)

**Problem**: client needs to accelerate feature delivery without proportional headcount growth.

**Stack**: MetaGPT + OpenHands + LangGraph + Dify frontend + Claude

```python
import asyncio
from metagpt.software_company import generate_repo
from openhands.controller.agent import Agent

async def software_factory(requirement: str):
    # MetaGPT: PM → Architect → Engineer pipeline
    repo = await generate_repo(
        idea=requirement,
        investment=10.0,  # token budget
        n_round=5,
    )
    
    # OpenHands: execute and test the generated code
    agent = Agent.get_cls("CodeActAgent")(
        llm={"model": "claude-fable-5", "api_key": "..."}
    )
    result = await agent.run(
        task=f"Execute, test, and fix this codebase: {repo.workdir}"
    )
    return result

# Run: asyncio.run(software_factory("Build a REST API for inventory management"))
```

**Wiring**: Dify chat UI → MetaGPT planning → code generation → OpenHands execution + tests → GitHub PR

**Timeline**: 4-8 weeks to productionize | **Deal size**: $120k-$500k | **ROI**: 3-5× team velocity

---

## P3 — MCP-Native Internal Developer Portal

**Problem**: developers waste hours hunting for services, docs, and runbooks; knowledge is siloed.

**Stack**: Backstage + Dify + Qdrant + Claude + custom MCP servers

```yaml
# backstage/app-config.yaml — AI plugin config
ai:
  model: claude-fable-5
  mcp_servers:
    - name: confluence
      url: http://mcp-confluence:3000
    - name: github
      url: http://mcp-github:3001
    - name: jira
      url: http://mcp-jira:3002
    - name: knowledge-base
      url: http://mcp-qdrant:3003

# Developer query flow:
# "How do I deploy service X to staging?"
# → Claude queries: Confluence (docs) + GitHub (recent changes) + Jira (open tickets)
# → Synthesized answer with links, no hallucination on internal systems
```

```python
# Build the Qdrant knowledge index
from qdrant_client import QdrantClient
from anthropic import Anthropic

client = QdrantClient("localhost", port=6333)
anthropic = Anthropic()

def index_confluence_docs(docs: list[dict]):
    for doc in docs:
        embedding_resp = anthropic.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=100,
            messages=[{"role": "user", "content": f"Embed: {doc['text'][:500]}"}]
        )
        # Use text-embedding-3-small or voyage-3 for actual embeddings
        client.upsert("internal-docs", points=[...])
```

**Timeline**: 6-10 weeks | **Deal size**: $150k-$400k | **ROI**: 2-3h/dev/week saved

---

## P4 — MLOps Pipeline with AI-Assisted Monitoring

**Problem**: ML models drift in production; retraining is manual and slow.

**Stack**: MLflow + Kubeflow + Prefect + Grafana + Claude

```python
import mlflow
from prefect import flow, task
from anthropic import Anthropic

anthropic = Anthropic()

@task
def check_model_drift(model_name: str, metrics: dict) -> dict:
    response = anthropic.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": f"""Analyze these model metrics for drift:
Model: {model_name}
Current metrics: {metrics}

Return JSON with:
- drift_detected: bool
- severity: low/medium/high
- recommended_action: retrain/monitor/alert
- reasoning: str"""
        }]
    )
    return eval(response.content[0].text)

@flow
def daily_model_health_check():
    client = mlflow.tracking.MlflowClient()
    for model in client.search_registered_models():
        latest = client.get_latest_versions(model.name)[0]
        metrics = client.get_run(latest.run_id).data.metrics
        result = check_model_drift(model.name, metrics)
        
        if result["drift_detected"] and result["severity"] == "high":
            # Trigger Kubeflow retraining pipeline
            trigger_retraining(model.name)

daily_model_health_check()
```

**Timeline**: 6-12 weeks | **Deal size**: $200k-$800k | **ROI**: 50-70% reduction in model degradation incidents

---

## P5 — Agentic DevOps: Self-Healing Infrastructure

**Problem**: on-call alerts at 3am; runbooks are outdated; manual remediation is slow.

**Stack**: n8n + OpenHands + Prometheus + Grafana + Claude + PagerDuty MCP

```javascript
// n8n workflow: alert → diagnose → remediate → verify
{
  "trigger": "webhook",  // Prometheus AlertManager → n8n
  "nodes": [
    {
      "name": "Parse Alert",
      "type": "claude-ai",
      "prompt": "Parse this Prometheus alert and identify: service, severity, likely root cause"
    },
    {
      "name": "Fetch Context",
      "type": "http",  // Grafana API for recent metrics
    },
    {
      "name": "Diagnose",
      "type": "claude-ai",
      "prompt": "Given alert + metrics context, diagnose root cause and generate remediation steps"
    },
    {
      "name": "Human Approval",  // HITL for severity > medium
      "type": "wait-for-approval",
    },
    {
      "name": "Execute Remediation",
      "type": "openhands-agent",  // OpenHands runs kubectl/terraform commands
    },
    {
      "name": "Verify Recovery",
      "type": "prometheus-check",
    }
  ]
}
```

**Timeline**: 8-12 weeks | **Deal size**: $150k-$400k | **ROI**: 70-80% reduction in MTTR; on-call burden cut 40%

---

## P6 — RAG Knowledge Platform for Tech Teams

**Problem**: engineering teams re-solve the same problems; documentation is fragmented.

**Stack**: Qdrant + Dify + LangGraph + Claude + GitHub/Confluence MCP

```python
from qdrant_client import QdrantClient
from langchain.vectorstores import Qdrant
from langchain_anthropic import ChatAnthropic
from langgraph.graph import StateGraph

# Indexing pipeline (runs on schedule via Prefect)
def build_tech_kb(sources: list):
    """Index: Confluence, GitHub wikis, Jira epics, Slack threads, RFCs"""
    vectorstore = Qdrant(
        client=QdrantClient("localhost"),
        collection_name="tech-kb",
        embeddings=VoyageEmbeddings(model="voyage-3")
    )
    for source in sources:
        docs = load_source(source)
        vectorstore.add_documents(docs)

# Query agent (via Dify frontend)
def answer_tech_question(question: str) -> str:
    llm = ChatAnthropic(model="claude-fable-5")
    docs = vectorstore.similarity_search(question, k=5)
    
    response = llm.invoke([
        SystemMessage("You are an expert on this team's tech stack and practices."),
        HumanMessage(f"Question: {question}\n\nContext:\n{format_docs(docs)}")
    ])
    return response.content
```

**Dify deployment**: drag-and-drop chatbot UI on top of this pipeline; zero-code for end users

**Timeline**: 3-5 weeks | **Deal size**: $60k-$180k | **ROI**: 30-40% reduction in repeated questions to senior engineers

---

## P7 — OpenClaw SKILL.md Automation Platform

**Problem**: company has repetitive tech tasks that cross messaging apps, code repos, and cloud consoles.

**Stack**: OpenClaw + SKILL.md + Claude + GitHub MCP + Slack

```markdown
# skills/deploy-to-staging.md
---
name: deploy-to-staging
description: Deploy a service to staging environment
triggers:
  - "deploy {service} to staging"
  - "stage {service}"
---

## Steps
1. Check GitHub for latest passing CI on main branch
2. Run: `kubectl set image deployment/{service} {service}=registry.io/{service}:latest -n staging`
3. Wait for rollout: `kubectl rollout status deployment/{service} -n staging`
4. Run smoke tests: `curl https://staging.company.com/{service}/health`
5. Report result to the requesting channel
```

```bash
# Install OpenClaw with custom skills
git clone https://github.com/openclaw/openclaw
cp skills/ ~/.openclaw/skills/

# Configure in Slack
openclaw configure --platform slack --model claude-fable-5
# Now: "@OpenClaw deploy auth-service to staging" in any Slack channel
```

**Timeline**: 2-4 weeks | **Deal size**: $40k-$100k | **ROI**: 15-20 engineering-hours/week saved on repetitive ops

---

## P8 — Continuous AI Code Quality Agent

**Problem**: technical debt accumulates silently; security issues discovered late.

**Stack**: Aider + LangGraph + Claude Code Security Review Action + GitHub Actions

```yaml
# .github/workflows/ai-quality.yml
name: AI Code Quality
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  ai-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Security Review
        uses: anthropics/claude-code-security-review@v1
        with:
          model: claude-fable-5
          
      - name: Aider Auto-Fix
        run: |
          pip install aider-chat
          # Auto-fix linting/style issues on the branch
          aider --model claude-sonnet-5 \
                --auto-commits \
                --message "Fix: auto-resolve linting and style issues flagged by CI" \
                $(git diff --name-only origin/main)
```

**Timeline**: 1-2 weeks | **Deal size**: $20k-$60k | **ROI**: 40-60% reduction in post-merge bug rate

---

## P9 — Multi-Model Inference Cost Optimizer

**Problem**: AI API costs growing 5-10× per quarter as agents go into production.

**Stack**: LangGraph + Claude + Gemini Flash + Ollama + MLflow (cost tracking)

```python
from langgraph.graph import StateGraph
from anthropic import Anthropic
import google.generativeai as genai
import ollama

anthropic_client = Anthropic()

def route_by_complexity(state: dict) -> str:
    """Route tasks to the right model based on complexity."""
    task = state["task"]
    
    # Simple classification (uses cheap Haiku)
    response = anthropic_client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=10,
        messages=[{
            "role": "user",
            "content": f"Classify complexity as 'low', 'medium', or 'high': {task}"
        }]
    )
    return response.content[0].text.strip()

def execute_low(state):
    # Gemini Flash: $0.075/1M tokens — repetitive tasks
    model = genai.GenerativeModel("gemini-2.0-flash")
    return {"result": model.generate_content(state["task"]).text}

def execute_medium(state):
    # DeepSeek R1 via Ollama: free local — intermediate reasoning
    return {"result": ollama.generate(model="deepseek-r1:7b", prompt=state["task"])["response"]}

def execute_high(state):
    # Claude Fable 5: complex reasoning, security, architecture
    response = anthropic_client.messages.create(
        model="claude-fable-5",
        max_tokens=4096,
        messages=[{"role": "user", "content": state["task"]}]
    )
    return {"result": response.content[0].text}

graph = StateGraph(dict)
graph.add_node("route", route_by_complexity)
graph.add_node("low", execute_low)
graph.add_node("medium", execute_medium)
graph.add_node("high", execute_high)
graph.add_conditional_edges("route", lambda s: s["complexity"])
```

**Cost reduction**: 60-80% vs routing everything to frontier model

**Timeline**: 3-4 weeks | **Deal size**: $60k-$150k

---

## P10 — Developer AI Onboarding Agent (New Engineer Ramp-Up)

**Problem**: new engineers take 3-6 months to be productive; senior engineers lose 30% of time to mentoring.

**Stack**: Dify + Qdrant + Backstage + GitHub MCP + Claude + OpenHands

```python
# Day 1 onboarding agent flow
ONBOARDING_FLOW = """
You are an AI onboarding assistant for new engineers at {company}.
You have access to:
- Internal KB (Qdrant): architecture docs, runbooks, decisions
- GitHub MCP: codebase, PRs, issues
- Backstage: service catalog, dependencies

For every question:
1. Check internal KB first (reduces hallucination on company-specific info)
2. Cross-reference with actual codebase (GitHub MCP)
3. If task-based: spawn OpenHands to demonstrate on a sandbox env
4. Track what the new engineer learned (update their profile)

Goal: new engineer productive in 4 weeks instead of 3 months.
"""

# Dify frontend: conversational interface
# Qdrant: indexed architecture docs + ADRs + runbooks
# GitHub MCP: "show me an example of how this service handles auth"
# OpenHands: "run the local dev environment for me and show me how it works"
```

**Timeline**: 4-6 weeks | **Deal size**: $80k-$250k | **ROI**: $50k-$200k per engineer in saved ramp-up time

---

## Quick-Start Matrix

| Pattern | Time | Cost | Best For |
|---------|------|------|----------|
| P1 Code Review Pipeline | 2-3w | $40k-$120k | Any software shop |
| P2 Software Factory | 4-8w | $120k-$500k | High-volume feature delivery |
| P3 Developer Portal | 6-10w | $150k-$400k | Orgs with scattered knowledge |
| P4 MLOps AI Monitoring | 6-12w | $200k-$800k | ML-heavy orgs |
| P5 Self-Healing Infra | 8-12w | $150k-$400k | SRE / DevOps teams |
| P6 Tech RAG Platform | 3-5w | $60k-$180k | Knowledge-intensive teams |
| P7 SKILL.md Automation | 2-4w | $40k-$100k | Ops-heavy orgs |
| P8 AI Code Quality | 1-2w | $20k-$60k | Quick win / entry point |
| P9 Multi-Model Optimizer | 3-4w | $60k-$150k | AI cost reduction |
| P10 Onboarding Agent | 4-6w | $80k-$250k | Fast-growing eng teams |
