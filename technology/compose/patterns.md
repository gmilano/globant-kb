# Composition Patterns — Technology

> Concrete recipes for building AI-powered technology solutions using real OSS repos + agents.
> Each pattern names the specific repos, how to wire them, and estimated Globant delivery scope.
> Last updated: 2026-07-14 (v6)

---

## P1 — AI Software Factory (Full-Stack Agentic Dev)

**Goal**: A client engineering team wants to ship 30–35% faster using AI-augmented development.

**Stack**:
- [OpenHands](https://github.com/All-Hands-AI/OpenHands) (MIT) — autonomous coding agent for isolated tasks
- [LangGraph](https://github.com/langchain-ai/langgraph) (MIT) — workflow orchestration with HITL checkpoints
- [Aider](https://github.com/Aider-AI/aider) (Apache-2.0) — Git-native pair programmer for incremental changes
- [FastMCP](https://github.com/jlowin/fastmcp) (MIT) — MCP servers for client's internal tools (Jira, Confluence, internal APIs)
- [claude-code-security-review](https://github.com/anthropics/claude-code-security-review) (MIT) — automated security review on every PR
- Claude Opus 4.8 or Fable 5 via Anthropic API

**Architecture**:
```
[Ticket (Jira MCP)] → [LangGraph orchestrator]
                              ↓
                    [OpenHands: write code]
                              ↓
                    [Aider: refine + Git commit]
                              ↓
                    [Security Review Action: PR scan]
                              ↓
                    [Human checkpoint: approve/reject]
                              ↓
                    [CI/CD: merge + deploy]
```

**Python wiring example**:
```python
from langgraph.graph import StateGraph
from openhands import OpenHandsAgent

def build_software_factory(ticket_text: str):
    agent = OpenHandsAgent(model="claude-opus-4-8", mcp_servers=["jira", "github"])
    graph = StateGraph(state_schema=dict)
    graph.add_node("code", lambda s: agent.run(s["ticket"]))
    graph.add_node("review", lambda s: run_security_review(s["pr_url"]))
    graph.add_node("human", lambda s: human_approval_gate(s))
    graph.add_edge("code", "review")
    graph.add_edge("review", "human")
    return graph.compile().invoke({"ticket": ticket_text})
```

**Delivery scope**: 6–12 weeks. $120k–$400k.

---

## P2 — Multi-Agent Code Review Pipeline

**Goal**: Automated, multi-perspective code review on every PR — catching bugs, security issues, and style violations before a human reviewer touches it.

**Stack**:
- [CrewAI](https://github.com/crewAIInc/crewAI) (MIT, v0.105) — multi-agent crew coordination
- [claude-code-security-review](https://github.com/anthropics/claude-code-security-review) (MIT) — security-focused agent (GitHub Action)
- [Aider](https://github.com/Aider-AI/aider) (Apache-2.0) — diff-aware code understanding
- [FastMCP](https://github.com/jlowin/fastmcp) (MIT) — MCP server exposing GitHub PR data
- Claude Sonnet 5 or Opus 4.8

**Agent crew**:
```python
from crewai import Agent, Task, Crew

security_agent = Agent(role="Security Reviewer", goal="Find OWASP Top 10 + supply chain risks", llm="claude-opus-4-8")
perf_agent = Agent(role="Performance Reviewer", goal="Find N+1 queries, memory leaks, O(n²) patterns", llm="claude-opus-4-8")
style_agent = Agent(role="Code Style Reviewer", goal="Enforce coding standards, naming conventions", llm="claude-sonnet-5")
arch_agent = Agent(role="Architecture Reviewer", goal="Flag violations of system design principles", llm="claude-opus-4-8")

crew = Crew(agents=[security_agent, perf_agent, style_agent, arch_agent],
            tasks=[review_task],
            verbose=True)
result = crew.kickoff(inputs={"pr_diff": pr_diff, "codebase_context": context})
```

**Delivery scope**: 3–5 weeks. $40k–$90k.

---

## P3 — LLMOps Platform (MLflow + Evidently + LiteLLM)

**Goal**: A client is deploying multiple AI models and LLM features to production and needs unified observability, cost tracking, and drift detection.

**Stack**:
- [MLflow](https://github.com/mlflow/mlflow) (Apache-2.0) — experiment tracking, model registry, prompt management, AI gateway
- [Evidently](https://github.com/evidentlyai/evidently) (Apache-2.0) — LLM output monitoring, drift detection, data quality
- [LiteLLM](https://github.com/BerriAI/litellm) (MIT) — unified LLM gateway (cost tracking, rate limits, fallbacks)
- [Ray Serve](https://github.com/ray-project/ray) (Apache-2.0) — scalable model serving
- [DVC](https://github.com/iterative/dvc) (Apache-2.0) — data versioning

**Architecture**:
```
[Client Apps]
     ↓
[LiteLLM Gateway] ←→ [Cost & rate tracking]
     ↓
[Models: Claude / GPT-5 / local via Ray Serve]
     ↓
[MLflow: log prompts, responses, latency]
     ↓
[Evidently: drift alerts, quality reports]
     ↑
[DVC: version training data + eval sets]
```

**Delivery scope**: 8–14 weeks. $150k–$500k.

---

## P4 — Self-Hosted Enterprise AI Platform (Dify + OpenHands + MCP)

**Goal**: A LATAM enterprise (LGPD/PDPA compliance) wants a fully self-hosted AI platform with agentic workflows, zero data leaving their cloud.

**Stack**:
- [Dify](https://github.com/langgenius/dify) (Apache-2.0) — LLM app platform (RAG, workflows, agent orchestration)
- [OpenHands](https://github.com/All-Hands-AI/OpenHands) (MIT) — software engineering agent for automated tasks
- [n8n](https://github.com/n8n-io/n8n) (Apache-2.0*) — workflow automation connecting business systems
- [FastMCP](https://github.com/jlowin/fastmcp) (MIT) — MCP servers for internal tools
- [Ollama](https://github.com/ollama/ollama) (MIT) — on-premise model serving (Llama 3, Mistral)
- Hosted on AWS São Paulo / GCP São Paulo / Azure Brazil South

**Setup (Docker Compose)**:
```yaml
services:
  dify:
    image: langgenius/dify:latest
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}  # or use Ollama endpoint
  n8n:
    image: n8nio/n8n
  ollama:
    image: ollama/ollama
    volumes:
      - ./models:/root/.ollama
  mcp-server:
    build: ./internal-mcp-server  # FastMCP wrapping internal APIs
```

**Delivery scope**: 10–16 weeks. $180k–$600k.

---

## P5 — Knowledge Graph Codebase Intelligence

**Goal**: A large enterprise with a complex codebase (500k+ LOC) wants AI assistants that understand cross-cutting concerns, not just local file context.

**Stack**:
- Graphify (emerging) — codebase → queryable knowledge graph
- [FastMCP](https://github.com/jlowin/fastmcp) (MIT) — expose knowledge graph as MCP resource
- [opencode](https://github.com/anomalyco/opencode) (MIT) — coding agent consuming the MCP graph
- [LangGraph](https://github.com/langchain-ai/langgraph) (MIT) — orchestrate multi-step code analysis queries
- [MLflow](https://github.com/mlflow/mlflow) (Apache-2.0) — track query quality and retrieval evals

**Pattern**:
```
[Codebase] → [Graphify: build knowledge graph]
                     ↓
              [FastMCP: expose as MCP tools]
              (query_dependencies, find_callers,
               impact_analysis, get_docs)
                     ↓
              [opencode / Claude Code]
              (aware of full system structure)
                     ↓
              [LangGraph: multi-step reasoning]
              (understand impact before changing)
```

**Delivery scope**: 4–8 weeks. $60k–$150k.

---

## P6 — MetaGPT Software Project Generator

**Goal**: Rapidly generate boilerplate, architecture documents, and initial code for new software projects from a high-level specification.

**Stack**:
- [MetaGPT](https://github.com/geekan/MetaGPT) (MIT, 67.9k stars) — full software company simulation
- [Aider](https://github.com/Aider-AI/aider) (Apache-2.0) — refine and iterate on generated code
- [LangGraph](https://github.com/langchain-ai/langgraph) (MIT) — orchestrate the generate → refine → test loop
- [claude-code-security-review](https://github.com/anthropics/claude-code-security-review) (MIT) — automated security review of generated code

```python
from metagpt.software_company import SoftwareCompany
from metagpt.roles import ProjectManager, Architect, Engineer, QAEngineer

company = SoftwareCompany()
company.hire([ProjectManager(), Architect(), Engineer(), QAEngineer()])
company.invest(investment=3.0)
company.start_project(
    "Build a REST API for inventory management with JWT auth, "
    "PostgreSQL, Redis cache, and Docker deployment"
)
asyncio.run(company.run(n_round=5))
```

**Output**: PRD, architecture diagram, API spec, initial code, test cases.
**Delivery scope**: 2–4 weeks. $25k–$60k.

---

## P7 — Agentic CI/CD Pipeline (Full Autonomous Software Delivery)

**Goal**: Integrate AI agents into the full CI/CD pipeline — from ticket to production with human gates at key stages.

**Stack**:
- [OpenHands](https://github.com/All-Hands-AI/OpenHands) (MIT) — code the feature
- [SWE-agent](https://github.com/princeton-nlp/SWE-agent) (MIT) — fix failing tests
- [Aider](https://github.com/Aider-AI/aider) (Apache-2.0) — targeted fixes and refactoring
- [claude-code-security-review](https://github.com/anthropics/claude-code-security-review) (MIT) — PR security scan
- [LangGraph](https://github.com/langchain-ai/langgraph) (MIT) — orchestrate the full pipeline
- GitHub Actions — CI/CD runner

**Pipeline**:
```
Jira Ticket Created
       ↓
[LangGraph: classify + assign]
       ↓
[OpenHands: write implementation]
       ↓
[SWE-agent: fix test failures] ← loop until tests pass
       ↓
[PR Created: security review auto-runs]
       ↓
[Human Gate: senior dev approves diff]
       ↓
[Merge + Deploy: standard CI/CD]
       ↓
[Evidently: monitor prod for regressions]
```

**Delivery scope**: 12–20 weeks. $250k–$750k.

---

## P8 — LATAM Data-Sovereign AI Dev Platform

**Goal**: Brazilian/Argentine client wants AI-assisted development but cannot use US cloud services for certain data categories (LGPD/PDPA). Fully on-premise or regional cloud.

**Stack**:
- [Ollama](https://github.com/ollama/ollama) (MIT) — on-premise LLM serving (Llama 3.3, Mistral, CodeLlama)
- [opencode](https://github.com/anomalyco/opencode) (MIT) — coding agent pointed at Ollama endpoint
- [n8n](https://github.com/n8n-io/n8n) (Apache-2.0*) — self-hosted workflow automation
- [Dify](https://github.com/langgenius/dify) (Apache-2.0) — self-hosted LLM app platform
- [MLflow](https://github.com/mlflow/mlflow) (Apache-2.0) — self-hosted experiment tracking
- Deployed on AWS São Paulo or GCP São Paulo

**Compliance checklist**:
- All model inference on AWS São Paulo / GCP São Paulo (data residency)
- No customer data sent to US endpoints
- MLflow tracks all inference calls for audit trail (LGPD Art. 18 data subject rights)
- n8n self-hosted eliminates SaaS data sharing concerns
- Ollama: models run on-device / on-prem server; no external calls after download

**Delivery scope**: 14–22 weeks. $220k–$700k.

---

## P9 — Agentic Developer Onboarding Assistant

**Goal**: New developers onboard to a complex codebase in days, not weeks. AI assistant that knows the architecture, conventions, and recent changes.

**Stack**:
- [Dify](https://github.com/langgenius/dify) (Apache-2.0) — RAG pipeline over internal docs, ADRs, runbooks
- [FastMCP](https://github.com/jlowin/fastmcp) (MIT) — MCP server for codebase, Git history, CI results
- [LangGraph](https://github.com/langchain-ai/langgraph) (MIT) — multi-step onboarding workflows
- [smolagents](https://github.com/huggingface/smolagents) (Apache-2.0) — lightweight agent for answering specific questions
- Claude Sonnet 5 (cost-effective for high-volume Q&A)

**Onboarding agent capabilities**:
- "Explain the authentication flow in this codebase"
- "What changed in the payment module this month?"
- "Create me a task for adding a new API endpoint following our patterns"
- "Run the dev environment setup for me"
- "Where should I put a new service for X feature?"

**Delivery scope**: 4–8 weeks. $50k–$150k.

---

## P10 — Observability-First Agent Deployment

**Goal**: Any production agent system needs observability from day one. This pattern adds the monitoring layer to any of the above.

**Stack**:
- [MLflow](https://github.com/mlflow/mlflow) (Apache-2.0) — experiment tracking + AI gateway + prompt management
- [Evidently](https://github.com/evidentlyai/evidently) (Apache-2.0) — drift detection, LLM output quality
- [LiteLLM](https://github.com/BerriAI/litellm) (MIT) — cost tracking, rate limiting, multi-model routing
- OpenTelemetry (CNCF, Apache-2.0) — distributed tracing for agent calls

**Metrics to track**:
```python
# MLflow: log every agent call
mlflow.log_metrics({
    "latency_ms": latency,
    "token_cost_usd": cost,
    "task_success_rate": success_rate,
    "human_intervention_rate": human_rate
})

# Evidently: LLM quality monitoring
report = Report(metrics=[TextEvals(column_name="response", descriptors=[
    Sentiment(), TextLength(), IncludesWords(words_list=["error", "cannot", "sorry"])
])])
```

**Add to any pattern**: +2 weeks, +$20k–$40k.

---
*Recipes are concrete and opinionated. Adjust model choices based on client data residency, cost constraints, and performance requirements.*
