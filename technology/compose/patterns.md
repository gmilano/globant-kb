# 🧩 Compose Patterns — Technology Industry

> Concrete recipes for building AI-powered solutions using the repos and agents in this KB.
> Each pattern names specific repos + wiring + estimated time to first demo.
> Last updated: 2026-07-09 v4

---

## Pattern 1: Private AI Coding Assistant (On-Prem Copilot)

**Problem**: Engineering teams want AI coding help but can't send code to external APIs (IP, compliance).  
**Stack**: Ollama + vLLM + Cline + GitLab CE  
**Licenses**: MIT (Ollama) + Apache-2.0 (vLLM) + Apache-2.0 (Cline) + MIT (GitLab CE)  
**Time to demo**: 4 hours

```
[Engineer in VS Code]
        ↓ Cline (VS Code extension, Apache-2.0)
[Ollama / vLLM serving Qwen2.5-Coder or DeepSeek-Coder-V3]
  (runs on internal GPU server, no data leaves org)
        ↓ REST API
[GitLab CE webhooks → Cline auto-PR reviews on push]
        ↓
[CI pipeline (Drone/Tekton) runs tests, reports back to Cline]
```

```bash
# Quick start
docker run -d -v ollama:/root/.ollama -p 11434:11434 ollama/ollama
ollama pull qwen2.5-coder:32b

# Configure Cline in VS Code: point to http://localhost:11434
# Set model: qwen2.5-coder:32b
```

**Key Win**: 100% private, zero API costs, matches GPT-4 on coding benchmarks at 32B parameter size.

---

## Pattern 2: AI-Powered Code Review in CI/CD

**Problem**: Security and quality reviews are a bottleneck; too slow, too inconsistent.  
**Stack**: claude-code-security-review + Semgrep + GitLab CI / GitHub Actions  
**Licenses**: MIT (claude-code-security-review) + LGPL-2.1 (Semgrep)  
**Time to demo**: 2 hours

```yaml
# .github/workflows/ai-review.yml
name: AI Security Review
on: [pull_request]

jobs:
  semgrep:
    uses: semgrep/semgrep-action@v2
    with:
      config: auto

  ai-security-review:
    uses: anthropics/claude-code-security-review@v1
    with:
      anthropic-api-key: ${{ secrets.ANTHROPIC_API_KEY }}
      # Reviews diff, posts inline comments on security issues

  ai-quality-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Aider code review
        run: |
          pip install aider-chat
          aider --review --message "Review this PR for code quality, naming, and maintainability"
```

**Key Win**: Security issues caught before human review; reviewers focus on architecture, not OWASP top 10.

---

## Pattern 3: Autonomous Bug-Fix Agent (SWE-agent Pattern)

**Problem**: Backlog of known bugs that no one has time to fix.  
**Stack**: OpenHands + SWE-agent + GitLab + Pytest  
**Licenses**: MIT (OpenHands, SWE-agent)  
**Time to demo**: 1 day

```python
# autonomous_bugfix.py
from openhands import Agent, GitHubEnvironment

agent = Agent(
    llm="claude-sonnet-5",  # or local vLLM endpoint
    environment=GitHubEnvironment(
        repo="org/repo",
        token=os.environ["GITHUB_TOKEN"]
    )
)

# Pull open bugs tagged "ai-fixable" from GitLab
issues = gitlab.issues.list(labels=["ai-fixable"], state="opened")

for issue in issues[:10]:  # process 10 bugs per run
    result = agent.solve(
        task=f"Fix bug: {issue.title}\n\n{issue.description}",
        constraints=[
            "Must pass all existing tests",
            "Must not change public API signatures",
            "PR description must explain root cause"
        ]
    )
    if result.tests_pass:
        gitlab.mergerequests.create({
            "source_branch": result.branch,
            "target_branch": "main",
            "title": f"fix: {issue.title} (AI-generated)",
            "description": result.explanation,
            "labels": ["ai-generated", "needs-human-review"]
        })
```

**Key Win**: 10-40% of backlog bugs fixed autonomously; team focuses on complex issues and review.

---

## Pattern 4: AIOps Platform (Kubernetes + AI Diagnostics)

**Problem**: SRE team spends 60% of time on alert triage vs. proactive reliability work.  
**Stack**: Prometheus + Grafana + k8sgpt + LangGraph  
**Licenses**: Apache-2.0 (Prometheus, k8sgpt) + AGPL-3.0 (Grafana) + MIT (LangGraph)  
**Time to demo**: 1 day

```python
# aiops_agent.py
from langchain_anthropic import ChatAnthropic
from langgraph.graph import StateGraph
import subprocess

llm = ChatAnthropic(model="claude-sonnet-5")

def check_k8s(state):
    # k8sgpt scans cluster and outputs issues as JSON
    result = subprocess.run(
        ["k8sgpt", "analyze", "--output", "json", "--explain"],
        capture_output=True, text=True
    )
    state["k8s_issues"] = json.loads(result.stdout)
    return state

def query_prometheus(state):
    # Query for anomalies in the last hour
    query = 'rate(http_requests_total{status=~"5.."}[5m]) > 0.1'
    response = requests.get(f"{PROMETHEUS_URL}/api/v1/query", params={"query": query})
    state["error_rate_metrics"] = response.json()["data"]["result"]
    return state

def triage_and_route(state):
    issues = state["k8s_issues"] + state["error_rate_metrics"]
    analysis = llm.invoke(f"""
    Analyze these infrastructure issues:
    {json.dumps(issues, indent=2)}
    
    For each issue:
    1. Severity (P1/P2/P3)
    2. Root cause hypothesis
    3. Recommended remediation steps
    4. Auto-fix if safe (restart pod, scale deployment, etc.)
    
    Output JSON array of actions.
    """)
    state["actions"] = json.loads(analysis.content)
    return state

def execute_safe_remediations(state):
    for action in state["actions"]:
        if action["severity"] == "P1" and action["auto_fix"] and action["risk"] == "low":
            subprocess.run(action["kubectl_command"], shell=True)
            # Post to Slack: f"Auto-fixed P1: {action['description']}"
    return state

# Build the graph
graph = StateGraph(dict)
graph.add_node("k8s_check", check_k8s)
graph.add_node("metrics_query", query_prometheus)
graph.add_node("triage", triage_and_route)
graph.add_node("remediate", execute_safe_remediations)

graph.add_edge("k8s_check", "triage")
graph.add_edge("metrics_query", "triage")
graph.add_edge("triage", "remediate")

aiops_agent = graph.compile()

# Run every 5 minutes via cron
if __name__ == "__main__":
    aiops_agent.invoke({"k8s_issues": [], "error_rate_metrics": [], "actions": []})
```

**Key Win**: P1 incidents auto-remediated in <2 min; MTTR drops 50%; SREs focus on root cause, not firefighting.

---

## Pattern 5: Agent-Powered Developer Portal (Backstage + CrewAI)

**Problem**: Developers waste 2+ hours/day on boilerplate service setup, documentation lookup, platform navigation.  
**Stack**: Backstage + CrewAI + GitHub MCP + Confluence MCP  
**Licenses**: Apache-2.0 (Backstage, CrewAI)  
**Time to demo**: 2 days

```python
# backstage_agent_crew.py
from crewai import Agent, Task, Crew, Process
from crewai_tools import MCPClientToolset

# Connect to existing platform tools via MCP
github_tools = MCPClientToolset(server_url="http://github-mcp:3000")
jira_tools = MCPClientToolset(server_url="http://jira-mcp:3000")
backstage_tools = MCPClientToolset(server_url="http://backstage-mcp:3000")

# Define specialized agents
architect = Agent(
    role="Platform Architect",
    goal="Design the new service scaffolding",
    tools=[backstage_tools],
    llm="claude-sonnet-5"
)

integrator = Agent(
    role="Integration Specialist",
    goal="Wire up the service to platform services (auth, logging, tracing)",
    tools=[github_tools],
    llm="claude-sonnet-5"
)

documenter = Agent(
    role="Technical Writer",
    goal="Generate TechDocs for Backstage catalog",
    tools=[backstage_tools],
    llm="claude-haiku-4-5"  # cheaper model for docs
)

# Developer says: "Create a new Python FastAPI service called payment-processor"
user_request = "Create a new Python FastAPI service called payment-processor with JWT auth, Postgres, and Prometheus metrics"

crew = Crew(
    agents=[architect, integrator, documenter],
    tasks=[
        Task(agent=architect, description=f"Scaffold service: {user_request}"),
        Task(agent=integrator, description="Create GitHub repo, add CI/CD workflow, wire service mesh"),
        Task(agent=documenter, description="Write TechDocs, register in Backstage catalog")
    ],
    process=Process.sequential
)

result = crew.kickoff()
# Result: complete repo, CI/CD, docs, Backstage entry — in 5 minutes vs 2 hours manual
```

**Key Win**: New service setup drops from 2 hours → 5 minutes; developer experience score (DX) improvement measurable.

---

## Pattern 6: MLOps Experiment Agent

**Problem**: ML team runs experiments ad-hoc; no reproducibility, results scattered, best model hard to find.  
**Stack**: MLflow + ZenML + LangGraph + Ray  
**Licenses**: Apache-2.0 (MLflow, ZenML, Ray) + MIT (LangGraph)  
**Time to demo**: 3 days

```python
# mlops_experiment_agent.py
import mlflow
from zenml.pipelines import pipeline
from zenml.steps import step
from langchain_anthropic import ChatAnthropic

llm = ChatAnthropic(model="claude-sonnet-5")

@step
def analyze_experiments(experiment_name: str) -> str:
    """AI agent that reads MLflow experiments and suggests next run."""
    client = mlflow.tracking.MlflowClient()
    runs = client.search_runs(
        experiment_ids=[client.get_experiment_by_name(experiment_name).experiment_id],
        order_by=["metrics.val_accuracy DESC"],
        max_results=20
    )
    
    runs_summary = [
        {
            "run_id": r.info.run_id,
            "params": r.data.params,
            "metrics": r.data.metrics,
            "status": r.info.status
        }
        for r in runs
    ]
    
    suggestion = llm.invoke(f"""
    You are an ML experiment optimizer. Analyze these experiment runs:
    {json.dumps(runs_summary, indent=2)}
    
    Suggest the next 3 hyperparameter configurations to try.
    Explain why based on the trends you observe.
    Output as JSON array with keys: learning_rate, batch_size, epochs, rationale.
    """)
    
    return suggestion.content

@step
def run_suggested_experiments(suggestions: str) -> dict:
    """Launch Ray distributed training for suggested configs."""
    configs = json.loads(suggestions)
    
    import ray
    from ray import tune
    
    ray.init()
    
    analysis = tune.run(
        train_fn,  # your training function
        config={
            "learning_rate": tune.grid_search([c["learning_rate"] for c in configs]),
            "batch_size": tune.grid_search([c["batch_size"] for c in configs]),
        },
        num_samples=len(configs),
        resources_per_trial={"cpu": 4, "gpu": 1}
    )
    
    best_config = analysis.best_config
    mlflow.log_params(best_config)
    
    return {"best_config": best_config, "best_metric": analysis.best_result["val_accuracy"]}

@pipeline
def mlops_agent_pipeline():
    suggestions = analyze_experiments(experiment_name="churn-prediction")
    results = run_suggested_experiments(suggestions=suggestions)
```

**Key Win**: AI suggests next experiments based on run history; 60% less human time on hyperparameter search.

---

## Pattern 7: Automated Documentation Agent

**Problem**: Code documentation is always out of date; engineers don't write it, PMs can't read the code.  
**Stack**: Aider + OpenHands + GitHub Actions + MkDocs  
**Licenses**: Apache-2.0 (Aider, OpenHands) + MIT (MkDocs)  
**Time to demo**: 4 hours

```yaml
# .github/workflows/auto-docs.yml
name: AI Documentation Update
on:
  push:
    branches: [main]
    paths:
      - 'src/**/*.py'
      - 'src/**/*.ts'

jobs:
  update-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 2  # get diff

      - name: Install Aider
        run: pip install aider-chat

      - name: Detect changed files
        id: changed
        run: |
          echo "files=$(git diff --name-only HEAD~1 HEAD | grep -E '\.(py|ts)$' | tr '\n' ' ')" >> $GITHUB_OUTPUT

      - name: Update docs with Aider
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          aider --model claude-haiku-4-5 \
                --message "Update the documentation in docs/ to reflect changes in: ${{ steps.changed.outputs.files }}. 
                           Update API docs, add new function docs, update README if needed.
                           Keep docs accurate to the actual code — never invent behavior." \
                ${{ steps.changed.outputs.files }} docs/

      - name: Build and deploy docs
        run: |
          pip install mkdocs mkdocs-material
          mkdocs gh-deploy --force

      - name: Open PR for doc changes
        uses: peter-evans/create-pull-request@v6
        with:
          title: "docs: auto-update for changes in ${{ steps.changed.outputs.files }}"
          body: "AI-generated documentation update. Please review before merging."
          branch: "auto-docs-${{ github.sha }}"
          labels: "auto-docs,needs-review"
```

**Key Win**: Docs update automatically on every merge; junior developers can understand codebase faster.

---

## Pattern 8: Multi-Language Codebase Migration Agent

**Problem**: Client has a large Java 8 / PHP 5 legacy codebase they need to migrate to modern stack.  
**Stack**: OpenHands + SWE-agent + LangGraph + Pytest/JUnit  
**Licenses**: MIT (OpenHands, SWE-agent, LangGraph)  
**Time to first module migrated**: 1 week

```python
# migration_agent.py
from openhands import Agent, LocalEnvironment
from langgraph.graph import StateGraph

def analyze_module(state):
    """Analyze a legacy module: dependencies, complexity, test coverage."""
    agent = Agent(llm="claude-sonnet-5", environment=LocalEnvironment())
    analysis = agent.run(f"""
    Analyze the legacy module: {state['module_path']}
    
    Report:
    1. External dependencies (package versions)
    2. Internal dependencies (other modules it calls)
    3. Cyclomatic complexity per function
    4. Existing test coverage (%)
    5. Migration complexity: LOW / MEDIUM / HIGH
    6. Suggested target stack (FastAPI/Spring Boot/NestJS)
    """)
    state['analysis'] = analysis
    return state

def write_tests_first(state):
    """Generate characterization tests before migration — lock in current behavior."""
    agent = Agent(llm="claude-sonnet-5", environment=LocalEnvironment())
    agent.run(f"""
    Write comprehensive characterization tests for: {state['module_path']}
    
    Rules:
    - Tests must pass against the EXISTING code
    - Cover all public functions/endpoints
    - Include edge cases found in the code
    - Output as pytest / JUnit format
    - Place in tests/characterization/{state['module_name']}/
    """)
    return state

def migrate_module(state):
    """Migrate the module to modern stack, guided by characterization tests."""
    agent = Agent(llm="claude-sonnet-5", environment=LocalEnvironment())
    agent.run(f"""
    Migrate {state['module_path']} to {state['analysis']['target_stack']}.
    
    Constraints:
    - ALL characterization tests in tests/characterization/{state['module_name']}/ must pass
    - Preserve the same public API contract
    - Use modern patterns (async/await, type hints, dependency injection)
    - Add proper error handling and logging
    - Output to: src_new/{state['module_name']}/
    """)
    return state

# LangGraph orchestration
graph = StateGraph(dict)
graph.add_node("analyze", analyze_module)
graph.add_node("test", write_tests_first)
graph.add_node("migrate", migrate_module)

graph.add_edge("analyze", "test")
graph.add_edge("test", "migrate")

migration_graph = graph.compile()
```

**Key Win**: Characterization tests prevent regressions; agent handles boilerplate migration, humans handle architecture decisions.

---

---

## Pattern 9: LLM Observability Foundation (Langfuse Self-Hosted)

**Problem**: AI agents in production behave unexpectedly — hallucinations, high latency, prompt regressions — and there's no visibility into what's happening.  
**Stack**: Langfuse + OpenTelemetry + Claude (Anthropic SDK) + PostgreSQL  
**Licenses**: MIT (Langfuse) + Apache-2.0 (OpenTelemetry)  
**Time to demo**: 4 hours

```yaml
# docker-compose.yml — self-hosted Langfuse
version: "3.8"
services:
  langfuse-server:
    image: langfuse/langfuse:3
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: "postgresql://langfuse:secret@db/langfuse"
      NEXTAUTH_SECRET: "change-me-in-production"
      NEXTAUTH_URL: "http://localhost:3000"
      LANGFUSE_ENABLE_EXPERIMENTAL_FEATURES: "true"
    depends_on: [db]
  db:
    image: postgres:16
    environment:
      POSTGRES_DB: langfuse
      POSTGRES_USER: langfuse
      POSTGRES_PASSWORD: secret
    volumes: [postgres_data:/var/lib/postgresql/data]
volumes:
  postgres_data:
```

```python
# agent_with_observability.py
import os
from langfuse import Langfuse
from langfuse.decorators import observe, langfuse_context
from anthropic import Anthropic

langfuse = Langfuse(
    host=os.environ["LANGFUSE_HOST"],       # http://localhost:3000
    public_key=os.environ["LANGFUSE_PUBLIC_KEY"],
    secret_key=os.environ["LANGFUSE_SECRET_KEY"],
)
client = Anthropic()

@observe(name="code-review-agent")
def review_pull_request(pr_diff: str, repo: str) -> dict:
    """Review a PR diff for security and quality issues."""
    langfuse_context.update_current_observation(
        metadata={"repo": repo, "diff_lines": len(pr_diff.splitlines())}
    )

    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2048,
        messages=[{
            "role": "user",
            "content": f"""Review this PR diff for security vulnerabilities and code quality:

{pr_diff}

Output JSON: {{"issues": [{{"severity": "HIGH|MEDIUM|LOW", "file": "...", "line": 0, "description": "..."}}], "overall_quality": "PASS|REVIEW|FAIL"}}"""
        }]
    )

    result = response.content[0].text
    langfuse_context.update_current_observation(
        output=result,
        usage={"input": response.usage.input_tokens, "output": response.usage.output_tokens}
    )
    return result

# Run an eval pipeline on traced outputs
def run_weekly_eval():
    """Score recent traces for hallucination and quality."""
    dataset = langfuse.get_dataset("pr-reviews-sample")
    for item in dataset.items:
        with item.observe(run_name="eval-run-2026-07") as trace_id:
            result = review_pull_request(item.input["diff"], item.input["repo"])
            item.link(trace_id, run_name="eval-run-2026-07")
            langfuse.score(
                name="format-correctness",
                value=1.0 if "issues" in result else 0.0,
                trace_id=trace_id
            )
```

**Key Win**: Full trace visibility into every AI call; eval datasets catch prompt regressions; EU AI Act compliance documentation auto-generated from traces. $50k–$150k engagement size.

---

## Pattern 10: Kubernetes AI Platform (kagent + k8sgpt + LangGraph)

**Problem**: Platform engineering team wants to deploy AI agents to production on Kubernetes using the same GitOps workflow as all other workloads.  
**Stack**: kagent + k8sgpt + LangGraph + Prometheus + Anthropic Claude  
**Licenses**: Apache-2.0 (kagent, k8sgpt, LangGraph, Prometheus)  
**Time to demo**: 1 day

```yaml
# kagent-sre-agent.yaml — deploy an AI agent as a K8s resource
apiVersion: kagent.dev/v1alpha1
kind: Agent
metadata:
  name: sre-incident-responder
  namespace: ai-ops
spec:
  description: "Monitors cluster health, triages incidents, auto-remediates P1s"
  systemPrompt: |
    You are an SRE agent for our production Kubernetes cluster.
    When given an alert, you must:
    1. Query Prometheus for related metrics (last 30 min)
    2. Run k8sgpt analyze to scan affected namespace
    3. Determine root cause with confidence level
    4. If confidence > 0.85 AND severity == P1 AND action is safe: execute remediation
    5. Otherwise: create incident report and page on-call via PagerDuty MCP
    Always log reasoning to Langfuse trace.
  model:
    apiKeySecret: anthropic-api-key
    provider: anthropic
    name: claude-sonnet-5
  tools:
    - type: MCPServer
      mcpServer:
        url: http://prometheus-mcp:8080   # Prometheus queries
    - type: MCPServer
      mcpServer:
        url: http://k8sgpt-mcp:8080       # K8s diagnostics
    - type: MCPServer
      mcpServer:
        url: http://pagerduty-mcp:8080    # incident management
```

```python
# sre_langraph_brain.py — optional: LangGraph orchestration for complex multi-step incidents
from langchain_anthropic import ChatAnthropic
from langgraph.graph import StateGraph, END
from typing import TypedDict
import subprocess, json, requests

class IncidentState(TypedDict):
    alert: dict
    k8s_analysis: str
    metrics: list
    root_cause: str
    confidence: float
    action_taken: str

llm = ChatAnthropic(model="claude-sonnet-5")

def gather_context(state: IncidentState) -> IncidentState:
    ns = state["alert"].get("namespace", "default")
    # k8sgpt analyze
    k8s = subprocess.run(
        ["k8sgpt", "analyze", "-n", ns, "--output", "json", "--explain"],
        capture_output=True, text=True
    )
    state["k8s_analysis"] = k8s.stdout
    # Prometheus — fetch error rate for namespace
    q = f'sum(rate(http_requests_total{{namespace="{ns}",status=~"5.."}}[5m]))'
    r = requests.get(f"{PROMETHEUS_URL}/api/v1/query", params={"query": q}).json()
    state["metrics"] = r["data"]["result"]
    return state

def diagnose(state: IncidentState) -> IncidentState:
    response = llm.invoke(f"""
Alert: {json.dumps(state['alert'])}
K8s diagnostics: {state['k8s_analysis']}
Error rate metrics: {json.dumps(state['metrics'])}

Identify root cause and provide:
- root_cause: one sentence
- confidence: float 0.0–1.0
- remediation: kubectl command if safe, else null
Output as JSON.
""")
    parsed = json.loads(response.content)
    state["root_cause"] = parsed["root_cause"]
    state["confidence"] = parsed["confidence"]
    state["remediation"] = parsed.get("remediation")
    return state

def remediate(state: IncidentState) -> IncidentState:
    if state["confidence"] >= 0.85 and state.get("remediation"):
        result = subprocess.run(state["remediation"].split(), capture_output=True, text=True)
        state["action_taken"] = f"Auto-remediated: {state['remediation']}"
    else:
        state["action_taken"] = "Escalated to on-call (confidence too low for auto-remediation)"
    return state

def should_auto_remediate(state: IncidentState) -> str:
    return "remediate" if state["confidence"] >= 0.85 else "escalate"

graph = StateGraph(IncidentState)
graph.add_node("gather", gather_context)
graph.add_node("diagnose", diagnose)
graph.add_node("remediate", remediate)
graph.add_node("escalate", lambda s: {**s, "action_taken": "Paged on-call"})

graph.set_entry_point("gather")
graph.add_edge("gather", "diagnose")
graph.add_conditional_edges("diagnose", should_auto_remediate, {"remediate": "remediate", "escalate": "escalate"})
graph.add_edge("remediate", END)
graph.add_edge("escalate", END)

sre_agent = graph.compile()
```

```bash
# Deploy via kubectl (GitOps-compatible)
kubectl apply -f kagent-sre-agent.yaml

# View agent status like any K8s resource
kubectl get agents -n ai-ops
kubectl describe agent sre-incident-responder -n ai-ops
kubectl logs -n ai-ops -l app=kagent-agent --follow
```

**Key Win**: AI agents managed with existing K8s tooling (kubectl, GitOps, Helm); SREs don't need to learn new platforms. P1 incidents auto-remediated in <2 min; 50% MTTR reduction. $100k–$400k engagement size.

---

---

## Pattern 11: Gemini CLI + GitHub Actions Free AI CI (Zero-Cost Baseline)

**Problem**: Client wants AI in CI/CD pipeline but can't justify per-seat licensing costs.  
**Stack**: Gemini CLI GitHub Actions + claude-code-security-review + Semgrep  
**Licenses**: Apache-2.0 (Gemini CLI, Semgrep LGPL-2.1) + MIT (claude-code-security-review)  
**Time to demo**: 2 hours  
**Deal size**: $40k–$120k (setup + customization)

```yaml
# .github/workflows/ai-ci-dual.yml
name: AI CI Suite
on: [pull_request]

jobs:
  gemini-review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
      - name: Gemini CLI Code Review
        uses: google-gemini/gemini-cli-action@v1
        with:
          google_api_key: ${{ secrets.GOOGLE_API_KEY }}
          # Free with personal Google account API key
          prompt: |
            Review this PR diff for:
            1. Logic errors and edge cases
            2. Performance concerns
            3. Code style and naming
            Post a detailed review comment.

  claude-security:
    uses: anthropics/claude-code-security-review@v1
    with:
      anthropic-api-key: ${{ secrets.ANTHROPIC_API_KEY }}
      # Reviews diff for OWASP top 10, secrets, injection vulnerabilities

  semgrep-scan:
    uses: semgrep/semgrep-action@v2
    with:
      config: auto  # OWASP + community rules, free tier available
```

**Dual-Agent Pattern**: Gemini CLI handles code quality + logic; Claude handles security. Different models catch different issues — higher combined catch rate than single model.

**Key Win**: Zero per-seat cost for basic AI CI (Gemini free tier + Semgrep community); ~$40k engagement to customize rules, integrate with Jira, train team.

---

## Pattern 12: LATAM AI Nearshore Team Kit

**Problem**: Client needs to scale AI development capacity without $146k+/year US AI engineer costs.  
**Stack**: Ollama + Cline + LangGraph + Langfuse + GitHub Actions  
**Licenses**: All MIT/Apache-2.0 — zero licensing cost  
**Setup time**: 2-3 weeks  
**Deal size**: $200k–$800k (team augmentation + tooling setup)

```python
# team_ai_kit/setup.py
"""
LATAM AI Nearshore Team Stack — standardizes tooling across 3-6 person LATAM squad.
Cost model: ~$40,800/yr per LATAM AI engineer vs $146,714 US. Save ~$100k/engineer/yr.
"""

TEAM_STACK = {
    "local_ai": {
        "tool": "Ollama + Qwen2.5-Coder:32b",
        "license": "MIT",
        "cost": "$0/month (runs on team GPU server)",
        "why": "Private coding AI — no code leaves org, no API costs for day-to-day dev",
    },
    "ide_agent": {
        "tool": "Cline (VS Code) or Aider (terminal)",
        "license": "Apache-2.0",
        "why": "Each engineer gets personal AI pair-programmer; routes to Ollama server",
    },
    "orchestration": {
        "tool": "LangGraph + CrewAI",
        "license": "MIT",
        "why": "Team builds agent workflows using same OSS stack as US-based AI shops",
    },
    "observability": {
        "tool": "Langfuse (self-hosted Docker)",
        "license": "MIT",
        "cost": "$0 (self-hosted)",
        "why": "All AI traces visible to client; EU AI Act + LGPD compliant; no data to third parties",
    },
    "ci_ai": {
        "tool": "Gemini CLI GitHub Actions + claude-code-security-review",
        "license": "Apache-2.0 + MIT",
        "cost": "Free tier + API cost",
        "why": "Automated quality gate — AI reviews every PR before human code review",
    },
}

# Quick Ollama + Qwen team setup
OLLAMA_SETUP = """
# On team GPU server (A10G or similar)
docker run -d --gpus all -v ollama:/root/.ollama -p 11434:11434 ollama/ollama
ollama pull qwen2.5-coder:32b

# Each team member's Cline config (VS Code settings.json)
{
  "cline.apiProvider": "ollama",
  "cline.ollamaBaseUrl": "http://gpu-server.internal:11434",
  "cline.ollamaModelId": "qwen2.5-coder:32b"
}
"""

# Langfuse team observability
LANGFUSE_DOCKER = """
docker compose up -d  # standard langfuse docker-compose.yml
# All agent traces from LATAM team visible to client dashboard
# LGPD compliant: data stays in client's cloud (AWS São Paulo / GCP Chile)
"""
```

**LATAM Region Guide**:

| Country | Timezone vs US-East | English Level | AI Talent Pool | Best For |
|---------|---------------------|---------------|----------------|----------|
| Mexico | UTC-6 (1h behind ET) | High | Very deep, USMCA contracts | Full team; best overlap with US East |
| Colombia | UTC-5 (same as ET) | High | Growing fast | Real-time collaboration; 20-30% cheaper than Mexico |
| Argentina | UTC-3 (2h ahead ET) | High | Strong ML/data science | Complex AI/ML work; highest per-capita GitHub activity |
| Brazil | UTC-3 | Medium | Deep pool | Large-scale; LGPD compliance experience |
| Chile | UTC-4 | High | Fintech-focused | Regulated industries; strong English |

**Key Win**: Save $100k/engineer/year vs US hire; team uses same OSS stack as top AI shops; Langfuse traces give client full visibility into LATAM team's AI-assisted output quality.

---

## Pattern Selection Guide

| Client Situation | Start With | Why | Deal Size |
|-----------------|-----------|-----|-----------|
| Wants to try AI coding | Pattern 1 (Private Copilot) | Zero risk, immediate dev productivity | $60k–$200k |
| Security/compliance concern | Pattern 2 (AI Code Review) | Measurable security improvement, CI/CD native | $40k–$120k |
| Bug backlog out of control | Pattern 3 (Autonomous Bug Fix) | Quantifiable ROI: bugs closed / sprint | $80k–$250k |
| SRE team overwhelmed | Pattern 4 (AIOps) | MTTR reduction is easy to measure | $100k–$400k |
| Platform engineering modernization | Pattern 5 (Dev Portal) | Developer experience transformation | $150k–$500k |
| Data science team needs structure | Pattern 6 (MLOps) | Reproducibility + experiment ROI | $120k–$350k |
| Documentation always stale | Pattern 7 (Auto Docs) | Quick win, high perceived value by non-tech | $30k–$80k |
| Legacy modernization project | Pattern 8 (Migration Agent) | Reduce migration cost by 40-60% | $200k–$800k |
| AI in prod with no visibility | Pattern 9 (LLM Observability) | Langfuse self-hosted; EU AI Act readiness | $50k–$150k |
| K8s platform + AI agents | Pattern 10 (kagent platform) | GitOps-native agent deployment; SRE + AI bundled | $100k–$400k |
| Zero-cost AI CI/CD baseline | Pattern 11 (Gemini CLI Actions) | Free tier + Apache-2.0; great client POC entry | $40k–$120k |
| Scale dev team without US cost | Pattern 12 (LATAM Nearshore Kit) | $100k/engineer savings; same OSS stack | $200k–$800k |
