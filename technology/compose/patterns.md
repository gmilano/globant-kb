# 🧩 Composition Patterns — Technology

> Concrete recipes for building AI-augmented technology solutions.
> Each pattern names specific repos + agents + how to wire them.
> Last updated: 2026-07-14 (v7)

## Architecture Base

```
[Open Source Platform (Dify / Gitea / OpenHands / n8n)]
          ↓
[MCP Tool Layer (MCP servers for enterprise systems)]
          ↓
[Agent Orchestration (LangGraph / CrewAI / MAF)]
          ↓
[LLM Serving (Ollama local / vLLM GPU / Anthropic API)]
          ↓
[Observability (LGTM Stack: Loki+Grafana+Tempo+Mimir)]
          ↓
[Client Channel (Web UI / WhatsApp / VS Code / API)]
```

---

## P1 — Self-Hosted AI Coding Agent Platform (LATAM / Data Residency)

**When to use**: Client requires no data to leave their infra (LGPD, PDPA, banking regs)

**Stack**: `forgejo/forgejo` (MIT) + `woodpecker-ci/woodpecker` (Apache-2.0) + `All-Hands-AI/OpenHands` (Apache-2.0) + `ollama/ollama` (MIT) + `grafana/grafana`

```yaml
# docker-compose.yml — complete local AI DevOps stack
version: "3.9"
services:
  gitea:
    image: gitea/gitea:latest
    ports: ["3000:3000"]
    volumes: ["gitea_data:/data"]

  woodpecker-server:
    image: woodpeckerci/woodpecker-server:latest
    environment:
      - WOODPECKER_GITEA=true
      - WOODPECKER_GITEA_URL=http://gitea:3000

  ollama:
    image: ollama/ollama:latest
    ports: ["11434:11434"]
    volumes: ["ollama_models:/root/.ollama"]
    deploy:
      resources:
        reservations:
          devices: [{driver: nvidia, count: all, capabilities: [gpu]}]

  openhands:
    image: ghcr.io/all-hands-ai/openhands:latest
    ports: ["3001:3000"]
    environment:
      - LLM_MODEL=ollama/llama4:70b
      - LLM_BASE_URL=http://ollama:11434

  grafana:
    image: grafana/grafana:latest
    ports: ["4000:3000"]
```

**Outcome**: Full AI-augmented DevOps; zero data to cloud; LATAM-compliant; 3–4 weeks to production.

---

## P2 — Enterprise MCP Integration Hub

**When to use**: Client has heterogeneous enterprise systems (ERP, CRM, databases) and wants AI agents to query them via MCP 2026-07-28 stateless spec.

**Stack**: `modelcontextprotocol/python-sdk` + `langchain-ai/langgraph` (MIT) + Claude Opus 4.8 + `grafana/loki`

```python
# mcp_enterprise_hub.py — stateless MCP server (2026-07-28 spec)
from mcp.server import Server
from mcp.server.http import create_http_app
import httpx

server = Server("enterprise-hub")

@server.list_tools()
async def list_tools():
    return [
        {"name": "query_erp", "description": "Query SAP ERP for order/inventory data"},
        {"name": "query_crm", "description": "Query Salesforce for customer data"},
        {"name": "create_ticket", "description": "Create ServiceNow incident ticket"},
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict):
    match name:
        case "query_erp":
            async with httpx.AsyncClient() as client:
                r = await client.get(f"{SAP_BASE}/api/orders", params=arguments,
                                    headers={"Authorization": f"Bearer {SAP_TOKEN}"})
            return r.json()
        case "query_crm":
            soql = f"SELECT Id, Name, Amount FROM Opportunity WHERE {arguments['filter']}"
            return await sf_client.query(soql)

# Stateless — no Mcp-Session-Id; add Mcp-Method header for load balancer routing
app = create_http_app(server)

# LangGraph agent with HITL for write operations
from langgraph.prebuilt import create_react_agent
from langchain_anthropic import ChatAnthropic

llm = ChatAnthropic(model="claude-opus-4-8-20260401")
agent = create_react_agent(llm, tools=mcp_tools, checkpointer=MemorySaver())
```

**Outcome**: Unified AI access to enterprise systems; full audit trail; HITL for writes; ~6 weeks.

---

## P3 — AI-Augmented CI/CD Pipeline

**When to use**: Add AI code review, test generation, and security scanning to existing CI/CD.

**Stack**: `woodpecker-ci/woodpecker` + `anthropics/claude-code-security-review` (MIT) + `All-Hands-AI/OpenHands`

```yaml
# .woodpecker.yml — AI-augmented pipeline
steps:
  - name: ai-security-review
    image: python:3.12-slim
    commands:
      - pip install anthropic
      - python scripts/ai_security_review.py
    environment: [ANTHROPIC_API_KEY, CI_COMMIT_SHA]
    when: { event: pull_request }

  - name: ai-test-generation
    image: ghcr.io/all-hands-ai/openhands:latest
    commands:
      - python -m openhands.task "Generate missing unit tests for diff at $CI_COMMIT_SHA"
    environment: [ANTHROPIC_API_KEY, GITHUB_TOKEN]

  - name: coverage-gate
    image: python:3.12-slim
    commands:
      - python -m pytest --cov=. --cov-fail-under=80
```

```python
# scripts/ai_security_review.py
import anthropic, subprocess

client = anthropic.Anthropic()
diff = subprocess.check_output(["git", "diff", "HEAD~1"], text=True)

response = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=2048,
    system="You are a security code reviewer. Identify OWASP Top 10 vulnerabilities, hardcoded secrets, SQL injection, XSS, and SSRF risks. Output JSON with severity and line number.",
    messages=[{"role": "user", "content": f"Review this diff:\n\n{diff}"}]
)
print(response.content[0].text)
```

**Outcome**: Automated security + quality gate on every PR; ~2 weeks to integrate.

---

## P4 — Multi-Agent Software Development Crew (CrewAI)

**When to use**: Automate end-to-end feature development: spec → code → review → test → PR.

**Stack**: `crewAIInc/crewAI` (MIT) v1.14 + `All-Hands-AI/OpenHands` (Apache-2.0) + Claude Opus 4.8

```python
# dev_crew.py — CrewAI software development crew
from crewai import Agent, Task, Crew, Process
from crewai_tools import CodeExecutionTool, GitHubTool

architect = Agent(role="Software Architect",
    goal="Design clean, scalable solutions and create implementation specs",
    backstory="Senior architect with 15 years building distributed systems",
    llm="claude-opus-4-8-20260401", tools=[])

developer = Agent(role="Senior Developer",
    goal="Implement features following the architect's specs with clean code",
    backstory="Expert Python/TypeScript developer, test-driven development",
    llm="claude-sonnet-5", tools=[CodeExecutionTool(), GitHubTool()])

reviewer = Agent(role="Code Reviewer",
    goal="Review code for security, performance, and correctness",
    backstory="Security-focused engineer, OWASP expert",
    llm="claude-opus-4-8-20260401", tools=[CodeExecutionTool()])

qa_engineer = Agent(role="QA Engineer",
    goal="Write comprehensive tests and validate implementation",
    backstory="TDD advocate, pytest and playwright expert",
    llm="claude-sonnet-5", tools=[CodeExecutionTool()])

def build_feature_crew(feature: str) -> Crew:
    spec = Task(description=f"Create implementation spec for: {feature}",
        expected_output="Technical spec with API design, data models, edge cases", agent=architect)
    impl = Task(description="Implement the feature following the spec",
        expected_output="Working code", agent=developer, context=[spec])
    review = Task(description="Review implementation for security and quality",
        expected_output="Review report with findings", agent=reviewer, context=[impl])
    tests = Task(description="Write comprehensive unit and integration tests",
        expected_output="Test suite >90% coverage, all passing", agent=qa_engineer, context=[impl, review])
    return Crew(agents=[architect, developer, reviewer, qa_engineer],
        tasks=[spec, impl, review, tests], process=Process.sequential, verbose=True)

crew = build_feature_crew("Add OAuth2 SSO login with Google and GitHub")
result = crew.kickoff()
```

**Outcome**: End-to-end feature automation; ~40–60% time reduction on standard features.

---

## P5 — LLM-Powered Developer Platform (Dify + OpenHands)

**When to use**: Build an internal AI developer platform with visual workflow builder for non-technical stakeholders.

**Stack**: `langgenius/dify` (Apache-2.0) + `All-Hands-AI/OpenHands` (Apache-2.0) + `vllm-project/vllm` (Apache-2.0)

```bash
# Deploy Dify with vLLM backend
git clone https://github.com/langgenius/dify && cd dify/docker
echo "OPENAI_API_BASE=http://vllm-server:8000/v1" >> .env
echo "OPENAI_API_KEY=dummy" >> .env
docker compose up -d

# Deploy vLLM for team GPU serving (16.6x Ollama throughput at scale)
docker run --gpus all -p 8000:8000 vllm/vllm-openai:latest \
  --model meta-llama/Llama-4-70B --tensor-parallel-size 4 --max-model-len 128000

# In Dify UI: Knowledge → Create → Upload chunked codebase docs
# Build "Code Assistant" workflow: Webhook → RAG retrieval → LLM → OpenHands sandbox → reply
```

**Outcome**: Internal AI dev platform accessible to PMs, designers, ops teams; ~5 weeks build.

---

## P6 — WhatsApp DevOps Bot for LATAM Teams

**When to use**: LATAM engineering teams want CI/CD alerts + AI assistance via WhatsApp (BR 120M / MX 88M / CO 35M users).

**Stack**: `n8n-io/n8n` (Apache-2.0) + WhatsApp Business API + `woodpecker-ci/woodpecker`

```javascript
// n8n workflow: Woodpecker CI failure → WhatsApp + AI explanation in Spanish
// Node 1: Woodpecker webhook
{ "type": "n8n-nodes-base.webhook", "parameters": { "path": "/ci-events" } }

// Node 2: AI explain failure in Spanish
{
  "type": "@n8n/n8n-nodes-langchain.lmChatAnthropic",
  "parameters": {
    "model": "claude-sonnet-5",
    "systemMessage": "Eres un experto en DevOps. Explica este error de CI en español simple. Sugiere los pasos para corregirlo. Máximo 3 párrafos.",
    "messages": [{"role": "user", "content": "={{$json.build.error_log}}"}]
  }
}

// Node 3: Send WhatsApp message
{
  "type": "n8n-nodes-base.httpRequest",
  "parameters": {
    "url": "https://graph.facebook.com/v21.0/{{PHONE_NUMBER_ID}}/messages",
    "method": "POST",
    "body": { "messaging_product": "whatsapp", "to": "={{$json.team_lead_phone}}",
      "type": "text", "text": { "body": "🚨 *Build Fallido*: {{$json.repo}}\n\n={{$node['AI'].json.text}}" } }
  }
}
```

**Outcome**: LATAM teams get AI-explained CI failures in Spanish via WhatsApp; ~1 week to deploy.

---

## P7 — Agent Observability Stack (LGTM + LLM Tracing)

**When to use**: Client deploying AI agents in production needs full observability: cost, latency, errors, model performance.

**Stack**: `grafana/grafana` + `prometheus/prometheus` + `grafana/loki` + `grafana/tempo` + `mlflow/mlflow` + OpenTelemetry SDK

```python
# agent_observability.py — instrument any agent with OTel + MLflow
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
import mlflow, time

provider = TracerProvider()
provider.add_span_processor(BatchSpanProcessor(OTLPSpanExporter(endpoint="http://tempo:4317")))
trace.set_tracer_provider(provider)
tracer = trace.get_tracer("ai-agent")
mlflow.set_tracking_uri("http://mlflow:5000")

def traced_llm_call(model: str, prompt: str, **kwargs):
    with tracer.start_as_current_span("llm-call") as span:
        span.set_attributes({"llm.model": model, "llm.prompt_tokens": len(prompt.split())})
        start = time.time()
        with mlflow.start_run(nested=True):
            mlflow.log_param("model", model)
            response = anthropic_client.messages.create(
                model=model, messages=[{"role": "user", "content": prompt}], **kwargs)
            latency_ms = (time.time() - start) * 1000
            mlflow.log_metrics({
                "latency_ms": latency_ms,
                "input_tokens": response.usage.input_tokens,
                "output_tokens": response.usage.output_tokens,
                "cost_usd": calculate_cost(model, response.usage)
            })
            span.set_attribute("llm.latency_ms", latency_ms)
            return response
# Import Grafana dashboard 18576 (LLM Observability) for instant dashboards
```

**Outcome**: Full LLM cost/latency/error observability; compliance audit logs; ~2 weeks to production.

---

## P8 — Stateless MCP Server for Enterprise (2026-07-28 Spec)

**When to use**: Build an MCP server that scales horizontally under the new stateless spec.

**Stack**: `modelcontextprotocol/python-sdk` (Apache-2.0) + FastAPI (MIT) + Nginx (Mcp-Method header routing)

```python
# stateless_mcp_server.py — MCP 2026-07-28 compliant
from mcp.server import Server
from mcp.server.http import create_http_app
import asyncpg

server = Server("enterprise-data-mcp")

@server.list_tools()
async def list_tools():
    return [{
        "name": "query_database",
        "description": "Run read-only SQL query on enterprise database",
        "inputSchema": {
            "type": "object",
            "properties": {
                "sql": {"type": "string", "description": "SELECT query only"},
                "database": {"type": "string", "enum": ["analytics", "crm", "erp"]}
            },
            "required": ["sql", "database"]
        }
    }]

@server.call_tool()
async def call_tool(name: str, arguments: dict):
    if name == "query_database":
        conn = await asyncpg.connect(DATABASE_URLS[arguments["database"]])
        try:
            sql = arguments["sql"].strip()
            if not sql.upper().startswith("SELECT"):
                return {"error": "Only SELECT queries allowed"}
            rows = await conn.fetch(sql)
            return {"rows": [dict(r) for r in rows], "count": len(rows)}
        finally:
            await conn.close()

# Stateless — no Mcp-Session-Id; Nginx routes via Mcp-Method header without body inspection
mcp_app = create_http_app(server)
```

**Outcome**: Horizontally scalable MCP server; no sticky sessions; deploy to any K8s cluster; 1–2 weeks.

---

## P9 — RAG-Augmented Code Intelligence Agent

**When to use**: Client wants AI that understands their specific codebase and internal patterns.

**Stack**: `langgenius/dify` (Apache-2.0) + `qdrant/qdrant` (Apache-2.0) + `anomalyco/opencode` (MIT) + `All-Hands-AI/OpenHands` (Apache-2.0)

```python
# codebase_rag.py — index codebase for AI retrieval
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
import anthropic, ast
from pathlib import Path

qdrant = QdrantClient("http://qdrant:6333")
client = anthropic.Anthropic()

qdrant.create_collection("codebase", vectors_config=VectorParams(size=1536, distance=Distance.COSINE))

def chunk_python_file(path: Path) -> list[dict]:
    source = path.read_text()
    tree = ast.parse(source)
    return [{
        "file": str(path), "name": node.name,
        "type": type(node).__name__, "source": ast.get_source_segment(source, node), "line": node.lineno
    } for node in ast.walk(tree) if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef, ast.ClassDef))]

def embed_and_index(root_dir: str):
    points = []
    for py_file in Path(root_dir).rglob("*.py"):
        for chunk in chunk_python_file(py_file):
            points.append(PointStruct(
                id=hash(f"{chunk['file']}:{chunk['name']}") % (2**31),
                vector=get_embedding(chunk["source"]),  # voyage-code-2 or nomic-embed-code
                payload=chunk
            ))
    qdrant.upsert(collection_name="codebase", points=points)

def query_codebase(question: str, top_k: int = 5) -> str:
    results = qdrant.search("codebase", query_vector=get_embedding(question), limit=top_k)
    context = "\n\n".join([f"# {r.payload['file']}:{r.payload['line']}\n{r.payload['source']}" for r in results])
    response = client.messages.create(
        model="claude-opus-4-8-20260401", max_tokens=4096,
        system="You are an expert on this codebase. Answer questions using the provided code context.",
        messages=[{"role": "user", "content": f"Context:\n{context}\n\nQuestion: {question}"}]
    )
    return response.content[0].text
```

**Outcome**: AI that knows client's codebase; accelerates onboarding, review, refactoring; ~3 weeks.

---

## P10 — Agent Compliance & HITL Governance (Enterprise)

**When to use**: Enterprise client needs human-in-the-loop gates and immutable audit trail for AI workflows.

**Stack**: `langchain-ai/langgraph` (MIT) v1.0+ + `mlflow/mlflow` (Apache-2.0) + `grafana/loki`

```python
# hitl_governance.py — HITL agent with approval gates and audit trail
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from typing import TypedDict
import anthropic, mlflow

class AgentState(TypedDict):
    task: str
    plan: str
    human_approval: str | None
    result: str | None

def plan_node(state: AgentState) -> AgentState:
    client = anthropic.Anthropic()
    r = client.messages.create(model="claude-opus-4-8-20260401",
        messages=[{"role": "user", "content": f"Create a step-by-step plan for: {state['task']}"}])
    return {**state, "plan": r.content[0].text}

def human_gate_node(state: AgentState) -> AgentState:
    mlflow.log_text(state["plan"], "pending_approval.txt")
    return state  # LangGraph interrupt() pauses graph here; resume() after Slack/email approval

def execute_node(state: AgentState) -> AgentState:
    if state.get("human_approval") != "approved":
        return {**state, "result": "REJECTED"}
    result = execute_plan(state["plan"])
    mlflow.log_text(result, "execution_result.txt")
    return {**state, "result": result}

builder = StateGraph(AgentState)
builder.add_node("plan", plan_node)
builder.add_node("human_gate", human_gate_node)
builder.add_node("execute", execute_node)
builder.add_edge("plan", "human_gate")
builder.add_edge("human_gate", "execute")
builder.add_edge("execute", END)

graph = builder.compile(checkpointer=MemorySaver(), interrupt_before=["execute"])

with mlflow.start_run(run_name="agent-execution"):
    mlflow.log_param("task", task_description)
    config = {"configurable": {"thread_id": "task-001"}}
    state = graph.invoke({"task": task_description, "human_approval": None}, config)
    # After Slack/webhook approval:
    final = graph.invoke({"human_approval": "approved"}, config)
    mlflow.log_text(final["result"], "final_result.txt")
```

**Outcome**: Full HITL governance for sensitive AI workflows; immutable audit trail; regulatory compliance; ~2 weeks.

---
*v7 — Updated 2026-07-14. 10 patterns with Python/YAML code.*
