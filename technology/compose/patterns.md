# Compose Patterns — Technology AI

> Concrete recipes: specific repos + agents + wiring instructions

---

## Pattern 1: AI-Augmented Pull Request Review Pipeline

**Use case**: Every PR in a client's Gitea/GitHub repo automatically receives an AI code review covering correctness bugs, security issues, style violations, and test coverage gaps — before a human reviewer opens the diff.

**Components:**
- **[go-gitea/gitea](https://github.com/go-gitea/gitea)** (MIT) — self-hosted git hosting with webhook support
- **[langchain-ai/langgraph](https://github.com/langchain-ai/langgraph)** (MIT) — stateful review agent graph
- **[paul-gauthier/aider](https://github.com/paul-gauthier/aider)** (Apache 2.0) — repo-context-aware code analysis
- **[langfuse/langfuse](https://github.com/langfuse/langfuse)** (MIT) — trace every review for cost and quality monitoring

**Wiring:**
```python
# 1. Gitea webhook → FastAPI endpoint → LangGraph review agent
from fastapi import FastAPI, Request
from langgraph.graph import StateGraph, END
from langchain_anthropic import ChatAnthropic
from langfuse.callback import CallbackHandler

app = FastAPI()
llm = ChatAnthropic(model="claude-sonnet-5")
langfuse_handler = CallbackHandler()  # traces to self-hosted Langfuse

def fetch_pr_diff(pr_url: str) -> str:
    """Fetch the diff from Gitea PR API."""
    import httpx
    resp = httpx.get(f"{pr_url}/files", headers={"Authorization": f"token {GITEA_TOKEN}"})
    return resp.json()

def review_node(state: dict) -> dict:
    diff = state["diff"]
    prompt = f"""You are a senior software engineer reviewing a PR diff.
    Analyze this diff for:
    1. Correctness bugs (logic errors, off-by-one, null safety)
    2. Security issues (injection, auth bypass, secret exposure)
    3. Missing tests for changed code paths
    4. Performance issues
    
    Diff:
    {diff}
    
    Return structured findings as JSON."""
    result = llm.invoke(prompt, config={"callbacks": [langfuse_handler]})
    return {"review": result.content}

def post_review_node(state: dict) -> dict:
    """Post review comment back to Gitea PR."""
    import httpx
    httpx.post(
        f"{state['pr_url']}/comments",
        json={"body": format_review(state["review"])},
        headers={"Authorization": f"token {GITEA_TOKEN}"}
    )
    return state

# Build LangGraph pipeline
workflow = StateGraph(dict)
workflow.add_node("review", review_node)
workflow.add_node("post", post_review_node)
workflow.set_entry_point("review")
workflow.add_edge("review", "post")
workflow.add_edge("post", END)
review_agent = workflow.compile()

@app.post("/webhook/pr")
async def handle_pr(request: Request):
    payload = await request.json()
    diff = fetch_pr_diff(payload["pull_request"]["url"])
    review_agent.invoke({"diff": diff, "pr_url": payload["pull_request"]["url"]})
    return {"status": "review posted"}
```

**Estimated impact**: Catches 60–70% of common bugs before human review; reduces review cycle time by 40%.

---

## Pattern 2: Self-Hosted Enterprise Coding Assistant (Private Codebase RAG)

**Use case**: A tech company wants GitHub Copilot functionality but cannot send code to the cloud. Deploy a fully private AI coding assistant that understands their proprietary codebase.

**Components:**
- **[TabbyML/tabby](https://github.com/TabbyML/tabby)** (Apache 2.0) — self-hosted coding assistant server
- **[continuedev/continue](https://github.com/continuedev/continue)** (Apache 2.0) — VS Code / JetBrains IDE extension
- **[ollama/ollama](https://github.com/ollama/ollama)** (MIT) — local LLM inference (Qwen 2.5 Coder 32B)
- **[qdrant/qdrant](https://github.com/qdrant/qdrant)** (Apache 2.0) — vector DB for codebase embeddings

**Wiring (docker-compose.yml):**
```yaml
version: "3.8"
services:
  ollama:
    image: ollama/ollama:latest
    ports: ["11434:11434"]
    volumes: [ollama_data:/root/.ollama]
    deploy:
      resources:
        reservations:
          devices: [{driver: nvidia, capabilities: [gpu]}]

  qdrant:
    image: qdrant/qdrant:latest
    ports: ["6333:6333"]
    volumes: [qdrant_data:/qdrant/storage]

  tabby:
    image: tabbyml/tabby:latest
    command: serve --model Qwen2.5-Coder-32B-Instruct --device cuda
    ports: ["8080:8080"]
    environment:
      - TABBY_COMPLETION_MODEL=http://ollama:11434/api/generate
      - TABBY_CHAT_MODEL=http://ollama:11434/api/chat
    depends_on: [ollama]

volumes:
  ollama_data:
  qdrant_data:
```

**Continue config (.continue/config.json):**
```json
{
  "models": [{"title": "Private Tabby", "provider": "openai", 
               "apiBase": "http://tabby:8080/v1", "model": "tabby"}],
  "tabAutocompleteModel": {"title": "Tabby Autocomplete", 
                            "provider": "openai", "apiBase": "http://tabby:8080"},
  "contextProviders": [{"name": "codebase"}]
}
```

**Setup commands:**
```bash
# Pull the coding model
docker exec ollama ollama pull qwen2.5-coder:32b

# Index codebase into Tabby's repository context
docker exec tabby tabby-cpu --model Qwen2.5-Coder-32B-Instruct repository index --url file:///workspace/client-repo
```

**Result**: GPT-4-level code completion, chat, and codebase Q&A — 100% private, zero data egress.

---

## Pattern 3: Multi-Agent Software Team (MetaGPT → Prototype Generator)

**Use case**: A client has a product requirement document and wants a working MVP prototype in 48 hours. Use a multi-agent software company simulation to generate the initial codebase.

**Components:**
- **[geekan/MetaGPT](https://github.com/geekan/MetaGPT)** (MIT) — multi-agent software company
- **[OpenHands/OpenHands](https://github.com/OpenHands/OpenHands)** (MIT) — autonomous agent to run, fix, and test the generated code
- **[paul-gauthier/aider](https://github.com/paul-gauthier/aider)** (Apache 2.0) — targeted fixes and refinement

**Wiring:**
```python
# Phase 1: MetaGPT generates the codebase from requirements
import asyncio
from metagpt.software_company import SoftwareCompany
from metagpt.roles import ProjectManager, ProductManager, Architect, Engineer, QaEngineer

async def generate_prototype(requirement: str, output_dir: str):
    company = SoftwareCompany()
    company.hire([
        ProductManager(),   # Writes PRD from requirement
        Architect(),        # Designs system architecture
        Engineer(n_borg=4), # 4 parallel engineers write code
        QaEngineer()        # Writes and runs tests
    ])
    company.invest(investment=10.0)  # Budget in USD (estimated LLM cost)
    company.start_project(requirement)
    await company.run(n_round=5)

# Run MetaGPT
asyncio.run(generate_prototype(
    requirement="Build a REST API for a task management app with user auth, CRUD for tasks, and real-time notifications via WebSocket",
    output_dir="/workspace/prototype"
))

# Phase 2: OpenHands validates and fixes the generated code
# OpenHands runs in Docker sandbox, executes tests, fixes failures
import subprocess
subprocess.run([
    "python", "-m", "openhands.core.main",
    "-t", "Run the generated code in /workspace/prototype, fix any import errors or test failures, ensure all tests pass",
    "--workspace-dir", "/workspace/prototype"
])

# Phase 3: Aider for targeted refinements
# aider --model claude-sonnet-5 "Add input validation and error handling to all API endpoints"
```

**Timeline**: MetaGPT generates skeleton in ~2 hours; OpenHands validation/fix pass in ~4 hours; Aider refinement ~2 hours. **Total: ~8 hours to a tested prototype**.

---

## Pattern 4: LLMOps Stack — Production AI Observability

**Use case**: Any AI-powered application needs observability: trace every LLM call, measure quality, track costs, detect regressions. This is the standard Globant LLMOps baseline.

**Components:**
- **[langfuse/langfuse](https://github.com/langfuse/langfuse)** (MIT) — traces, evaluations, prompt management
- **[BerriAI/litellm](https://github.com/BerriAI/litellm)** (MIT) — model gateway with cost tracking
- **[qdrant/qdrant](https://github.com/qdrant/qdrant)** (Apache 2.0) — vector store for RAG

**Wiring:**
```python
# litellm as the unified model gateway (routes to Anthropic/OpenAI/Ollama)
# litellm_config.yaml:
# model_list:
#   - model_name: gpt-4o
#     litellm_params:
#       model: openai/gpt-4o
#       api_key: os.environ/OPENAI_API_KEY
#   - model_name: claude-sonnet
#     litellm_params:
#       model: anthropic/claude-sonnet-5
#       api_key: os.environ/ANTHROPIC_API_KEY
#   - model_name: local-qwen
#     litellm_params:
#       model: ollama/qwen2.5:32b
#       api_base: http://ollama:11434

# Application code: LangChain + Langfuse tracing
from langchain_openai import ChatOpenAI  # points to LiteLLM proxy
from langfuse.callback import CallbackHandler

langfuse_handler = CallbackHandler(
    public_key=LANGFUSE_PUBLIC_KEY,
    secret_key=LANGFUSE_SECRET_KEY,
    host="http://langfuse:3000"  # self-hosted
)

llm = ChatOpenAI(
    model="claude-sonnet",  # LiteLLM alias
    base_url="http://litellm:4000",
    api_key=LITELLM_KEY
)

# Every call is automatically traced in Langfuse
response = llm.invoke(
    "Summarize this incident report: ...",
    config={"callbacks": [langfuse_handler]}
)
```

**Dashboard provides**: Cost per feature/user, p50/p95 latency, error rates, prompt version comparison, LLM evaluation scores.

---

## Pattern 5: Autonomous Dependency Update Agent

**Use case**: Keep client codebases secure and up-to-date by running an agent that checks for outdated/vulnerable dependencies, creates PRs with updates, and runs tests to validate — autonomously.

**Components:**
- **[paul-gauthier/aider](https://github.com/paul-gauthier/aider)** (Apache 2.0) — makes the file edits
- **[langchain-ai/langgraph](https://github.com/langchain-ai/langgraph)** (MIT) — orchestrates the check → update → test loop
- **[go-gitea/gitea](https://github.com/go-gitea/gitea)** (MIT) — target repo hosting (or GitHub)

**Wiring:**
```python
from langgraph.graph import StateGraph, END
import subprocess, json

def check_vulnerabilities(state):
    """Run safety/npm audit to find vulnerable packages."""
    result = subprocess.run(["pip-audit", "--json"], capture_output=True, text=True)
    vulns = json.loads(result.stdout)
    return {**state, "vulnerabilities": vulns}

def update_dependencies(state):
    """Use Aider to update requirements.txt / package.json."""
    vulns = state["vulnerabilities"]
    packages = [v["name"] for v in vulns if v["fix_versions"]]
    
    aider_prompt = f"Update these packages to their latest safe versions: {packages}. Edit requirements.txt only."
    subprocess.run(["aider", "--model", "claude-sonnet-5", "--message", aider_prompt, "--yes"])
    return state

def run_tests(state):
    """Run test suite after updates."""
    result = subprocess.run(["pytest", "--tb=short", "-q"], capture_output=True, text=True)
    return {**state, "tests_passed": result.returncode == 0, "test_output": result.stdout}

def create_pr(state):
    """Push branch and open PR if tests pass."""
    if state["tests_passed"]:
        subprocess.run(["git", "checkout", "-b", "ai/dependency-updates"])
        subprocess.run(["git", "add", "requirements.txt"])
        subprocess.run(["git", "commit", "-m", "fix: update vulnerable dependencies (auto)"])
        subprocess.run(["git", "push", "-u", "origin", "ai/dependency-updates"])
        # Create PR via Gitea API
    return state

# LangGraph workflow
workflow = StateGraph(dict)
workflow.add_node("check", check_vulnerabilities)
workflow.add_node("update", update_dependencies)
workflow.add_node("test", run_tests)
workflow.add_node("pr", create_pr)
workflow.set_entry_point("check")
workflow.add_edge("check", "update")
workflow.add_edge("update", "test")
workflow.add_edge("test", "pr")
workflow.add_edge("pr", END)
agent = workflow.compile()

# Run weekly via cron
agent.invoke({"repo_path": "/workspace/client-repo"})
```

**Impact**: Zero-touch dependency hygiene; catches CVEs before they reach production; PR with passing tests requires only human approval.
