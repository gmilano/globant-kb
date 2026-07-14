# 🏭 Vertical Platforms — Technology

> Existing open source platforms customizable with AI on top.
> Model: start from something functional, add agentic layer on top.
> Last updated: 2026-07-14 (v7)

## Recommended Platforms

| Platform | License | URL | Stack | AI Use Case |
|----------|---------|-----|-------|-------------|
| **Dify** | Apache-2.0 | [dify.ai](https://github.com/langgenius/dify) | Python / Next.js / PostgreSQL | Visual LLM workflow builder + RAG + plugin marketplace; 34M active builders; ideal starting point for any LLM product |
| **Gitea / Forgejo** | MIT | [gitea.io](https://github.com/go-gitea/gitea) / [forgejo.org](https://codeberg.org/forgejo/forgejo) | Go | Self-hosted Git forge; add AI code review bots, PR agents, issue triage; integrates with OpenHands |
| **GitLab CE** | MIT | [gitlab.com](https://gitlab.com/gitlab-org/gitlab) | Ruby / Go / Vue | Full DevOps lifecycle; add AI pipelines via CI/CD + LLM hooks; Duo AI features in CE |
| **Woodpecker CI** | Apache-2.0 | [woodpecker-ci.org](https://github.com/woodpecker-ci/woodpecker) | Go | Lightweight self-hosted CI; Docker-native pipelines; add AI test generation and review steps |
| **OpenHands** | Apache-2.0 | [all-hands.dev](https://github.com/All-Hands-AI/OpenHands) | Python / React | Self-hosted agentic coding platform; Docker sandbox; RBAC; 72% SWE-bench; add custom agent plugins |
| **Grafana + LGTM Stack** | AGPL-3.0 | [grafana.com](https://github.com/grafana/grafana) | Go / TypeScript | Full-stack observability (Loki+Grafana+Tempo+Mimir); add AI anomaly detection agents; gold standard 2026 |
| **MLflow** | Apache-2.0 | [mlflow.org](https://github.com/mlflow/mlflow) | Python | ML experiment tracking, model registry, LLMOps; integrates with any LLM provider; gateway for routing |
| **OpenTofu** | MPL-2.0 | [opentofu.org](https://github.com/opentofu/opentofu) | Go / HCL | Infrastructure-as-Code platform; Terraform replacement; add AI infrastructure planning agents |
| **Ollama** | MIT | [ollama.com](https://github.com/ollama/ollama) | Go / C++ | Local LLM serving; OpenAI-compatible API; add any open model; ~45ms TTFT; Apple Silicon + CPU |
| **n8n** | Apache-2.0 (core) | [n8n.io](https://github.com/n8n-io/n8n) | TypeScript | Low-code workflow automation; 400+ integrations; AI nodes for LLM calls; embed agent pipelines |

## How to Add AI to Each Platform

### Dify (recommended first choice)
```bash
git clone https://github.com/langgenius/dify
docker compose up -d
# Configure LLM provider (Anthropic / OpenAI / Ollama)
# Build visual agentic workflow → deploy as API
# Add RAG knowledge base from domain docs
```

### Gitea + OpenHands AI Code Review
```yaml
# .woodpecker.yml pipeline step
steps:
  ai-review:
    image: ghcr.io/all-hands-ai/openhands:latest
    commands:
      - python -m openhands.review --pr $CI_COMMIT_SHA
    environment:
      - ANTHROPIC_API_KEY
```

### MLflow LLMOps Gateway
```python
import mlflow

mlflow.set_tracking_uri("http://localhost:5000")
with mlflow.start_run():
    result = mlflow.openai.log_model(
        model="claude-sonnet-5",
        artifact_path="model"
    )
```

### Ollama + OpenHands Local Stack
```bash
# 100% local, no data leaves your infra
ollama pull llama3.2:70b
docker run -e LLM_MODEL=ollama/llama3.2:70b \
  -e LLM_BASE_URL=http://host.docker.internal:11434 \
  ghcr.io/all-hands-ai/openhands:latest
```

### n8n + MCP Agent Pipeline
```json
{
  "nodes": [
    { "type": "n8n-nodes-base.webhook", "name": "GitHub PR Trigger" },
    { "type": "n8n-nodes-langchain.agent", "name": "Code Review Agent",
      "parameters": { "mcpServer": "http://localhost:3000" } },
    { "type": "n8n-nodes-base.github", "name": "Post Review Comment" }
  ]
}
```

## LATAM-Specific Considerations

| Country | Key Platform Consideration | Recommendation |
|---------|---------------------------|----------------|
| Brazil | LGPD data residency; prefer on-prem | Gitea + Woodpecker + Ollama (no cloud LLM) |
| Colombia | AWS São Paulo or local DC | Dify self-hosted on AWS sa-east-1 |
| Mexico | Strong Azure presence | n8n + Azure OpenAI regional endpoint |
| Argentina | Cost sensitivity; OSS preference | Full LGTM + Ollama local stack |
| Chile | Regulatory banking/fintech | OpenHands with audit trails + RBAC |

---
*v7 — Updated 2026-07-14*
