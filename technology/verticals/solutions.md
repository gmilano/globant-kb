# 🏭 Vertical Solutions — Technology Industry

> Existing open source platforms that technology companies and dev teams run.
> The play: deploy these as the base, add an AI agent layer on top.
> Last updated: 2026-07-09 v4

## DevOps & CI/CD Platforms

| Platform | License | Repo | Stack | Use Case |
|----------|---------|------|-------|----------|
| GitLab CE | MIT | [gitlab-org/gitlab-foss](https://github.com/gitlab-org/gitlab-foss) | Ruby, Go, Vue | Complete DevOps platform — source control, CI/CD, security, monitoring in one. Self-hosted. |
| Gitea | MIT | [go-gitea/gitea](https://github.com/go-gitea/gitea) | Go | Lightweight self-hosted Git; webhook-native, low resource footprint, LATAM teams love it |
| Drone CI | Apache-2.0 | [harness/drone](https://github.com/harness/drone) | Go | Container-native CI/CD; plugin-per-step architecture makes it ideal for injecting AI steps |
| Tekton | Apache-2.0 | [tektoncd/pipeline](https://github.com/tektoncd/pipeline) | Go, K8s | Kubernetes-native CI/CD pipelines; CNCF project, runs on any K8s cluster |
| ArgoCD | Apache-2.0 | [argoproj/argo-cd](https://github.com/argoproj/argo-cd) | Go | GitOps continuous delivery for Kubernetes; declarative app deployment and drift detection |

### AI-Augmented CI/CD Options (2026)

| Tool | License | Cost | How It Works |
|------|---------|------|--------------|
| **Gemini CLI GitHub Actions** | Apache-2.0 | **Free** (personal Google account) | Autonomous agent for routine CI tasks + on-demand collaborator; `@gemini-bot` in issues/PRs triggers AI; runs as GitHub Action |
| **claude-code-security-review** | MIT | API cost only | AI security review on every PR diff; posts inline comments; zero-config GitHub Action |
| **Aider in CI** | Apache-2.0 | API cost only | `aider --review` in CI pipeline; code quality + maintainability scan per PR |

## Observability & Monitoring

| Platform | License | Repo | Stack | Use Case |
|----------|---------|------|-------|----------|
| Grafana | AGPL-3.0 | [grafana/grafana](https://github.com/grafana/grafana) | Go, TypeScript | Universal observability dashboards; plugins for AI anomaly detection (2026 Grafana AI plugin GA) |
| Prometheus | Apache-2.0 | [prometheus/prometheus](https://github.com/prometheus/prometheus) | Go | Time-series metrics; gold standard for cloud-native; pairs with Grafana for full stack |
| Jaeger | Apache-2.0 | [jaegertracing/jaeger](https://github.com/jaegertracing/jaeger) | Go | Distributed tracing; CNCF project, integrates with AI root-cause analysis agents |
| OpenTelemetry Collector | Apache-2.0 | [open-telemetry/opentelemetry-collector](https://github.com/open-telemetry/opentelemetry-collector) | Go | Vendor-agnostic observability pipeline; feeds traces/metrics/logs into AI systems |
| Netdata | GPL-3.0 | [netdata/netdata](https://github.com/netdata/netdata) | C, Python | Real-time performance monitoring with built-in ML anomaly detection |

## Developer Portals & Platform Engineering

| Platform | License | Repo | Stack | Use Case |
|----------|---------|------|-------|----------|
| Backstage | Apache-2.0 | [backstage/backstage](https://github.com/backstage/backstage) | TypeScript, React | Spotify's developer portal framework; software catalog, TechDocs, scaffolding — ideal for AI plugin layer |
| Port | Apache-2.0 | [port-labs/port-docs](https://github.com/port-labs/port-docs) | TypeScript | Internal developer portal; service catalog + AI action suggestions; popular in platform engineering |

## Code Quality & Security

| Platform | License | Repo | Stack | Use Case |
|----------|---------|------|-------|----------|
| SonarQube CE | LGPL-3.0 | [SonarSource/sonarqube](https://github.com/SonarSource/sonarqube) | Java | Static code analysis; plugin with AI-generated fix suggestions in 2026 version |
| Semgrep | LGPL-2.1 | [semgrep/semgrep](https://github.com/semgrep/semgrep) | Python, OCaml | Fast, AST-level code scanning; rules-as-code, AI-powered rule generation support |
| Trivy | Apache-2.0 | [aquasecurity/trivy](https://github.com/aquasecurity/trivy) | Go | All-in-one security scanner for containers, IaC, code, dependencies |

## MLOps & AI Infrastructure

| Platform | License | Repo | Stack | Use Case |
|----------|---------|------|-------|----------|
| MLflow | Apache-2.0 | [mlflow/mlflow](https://github.com/mlflow/mlflow) | Python | Experiment tracking, model registry, deployment, evaluation; v3.x adds LLM tracing + agent observability |
| Kubeflow | Apache-2.0 | [kubeflow/kubeflow](https://github.com/kubeflow/kubeflow) | Python, Go, K8s | End-to-end ML on Kubernetes; pipelines, hyperparameter tuning, model serving |
| BentoML | Apache-2.0 | [bentoml/bentoml](https://github.com/bentoml/bentoml) | Python | Build and deploy ML model APIs; Kubernetes-native, supports any framework |
| vLLM | Apache-2.0 | [vllm-project/vllm](https://github.com/vllm-project/vllm) | Python, CUDA | High-throughput LLM inference server; the standard for self-hosting open LLMs at scale |
| Ollama | MIT | [ollama/ollama](https://github.com/ollama/ollama) | Go | Run LLMs locally on any machine; Mac/Linux/Windows, GGUF model support, REST API |

## LLM Observability Platforms

| Platform | License | Repo | Stack | Use Case |
|----------|---------|------|-------|----------|
| Langfuse | MIT | [langfuse/langfuse](https://github.com/langfuse/langfuse) | TypeScript, Python | Self-hosted LLM observability: traces, eval datasets, prompt versioning, user sessions; 28k stars Jul 2026 |
| Opik | Apache-2.0 | [comet-ml/opik](https://github.com/comet-ml/opik) | Python | LLM evaluation platform; CI/CD eval integration, hallucination scoring, annotation workflows |
| Arize Phoenix | Elastic-2.0 | [Arize-ai/phoenix](https://github.com/Arize-ai/phoenix) | Python | ML-grade LLM observability; OpenInference traces, embeddings drift, built on OpenTelemetry |

### Langfuse Quick Setup (Docker Compose)

```yaml
# docker-compose.yml
version: "3.8"
services:
  langfuse-server:
    image: langfuse/langfuse:3
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: "postgresql://langfuse:secret@db/langfuse"
      NEXTAUTH_SECRET: "your-secret"
      NEXTAUTH_URL: "http://localhost:3000"
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
# Instrument any LLM call
from langfuse import Langfuse
from langfuse.decorators import observe
from anthropic import Anthropic

langfuse = Langfuse(host="http://localhost:3000")
client = Anthropic()

@observe()  # automatically traces this function
def ask_agent(question: str) -> str:
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        messages=[{"role": "user", "content": question}]
    )
    return response.content[0].text
```

## Internal Developer Platforms

| Platform | License | Repo | Stack | Use Case |
|----------|---------|------|-------|----------|
| Backstage | Apache-2.0 | [backstage/backstage](https://github.com/backstage/backstage) | TypeScript | Spotify's developer portal; software catalog, TechDocs, scaffolding — AI plugin layer on top |
| OpenChoreo | Apache-2.0 | [wso2/choreo](https://github.com/wso2/choreo) | Go, TypeScript | CNCF Sandbox IDP (Jan 2026); exposes MCP servers so AI agents deploy components and reason about platform state; built-in SRE LLM agent |

## Secrets & Config Management

| Platform | License | Repo | Stack | Use Case |
|----------|---------|------|-------|----------|
| Vault (OpenBao) | MPL-2.0 | [openbao/openbao](https://github.com/openbao/openbao) | Go | Community fork of HashiCorp Vault post-BSL change; secrets management, dynamic credentials |
| Infisical | MIT | [Infisical/infisical](https://github.com/Infisical/infisical) | TypeScript | Open-source secret management for teams; SDK integrations for AI apps needing API key rotation |

## IaC & Multi-Cloud Platforms

| Platform | License | Repo | Stack | Use Case |
|----------|---------|------|-------|----------|
| OpenTofu | MPL-2.0 | [opentofu/opentofu](https://github.com/opentofu/opentofu) | Go | Terraform fork; v1.8 feature-parity; Linux Foundation; preferred target for AI IaC agents |
| Pulumi | Apache-2.0 | [pulumi/pulumi](https://github.com/pulumi/pulumi) | Go/Python/TS | Code-first IaC; AI agents generate and apply Pulumi stacks in real languages; Apache-2.0 |
| Backplane | Apache-2.0 | [backplane-cloud/backplane](https://github.com/backplane-cloud/backplane) | Go | Open-source multi-cloud abstraction; unified API for AWS/Azure/GCP/OCI accounts, costs, access controls |

## How to Add AI on Top

```
1. Pick a vertical platform (e.g., Backstage for developer portal)
2. Deploy the base platform (Docker Compose / Helm)
3. Add AI agent layer:
   - MCP server exposing platform APIs as tools
   - LangGraph or CrewAI agent with domain tools
   - Anthropic Claude or local vLLM as the LLM backend
4. Build conversational interface or GitHub App on top
5. Integrate with existing CI/CD via webhooks
```

### Quick Wins by Platform

- **Grafana + k8sgpt**: Add AI cluster diagnostics to existing monitoring in < 1 day
- **Backstage + CrewAI**: AI scaffold generator that creates new services from chat
- **GitLab + claude-code-security-review**: AI security review on every PR in < 2 hours
- **MLflow + LangGraph**: AI experiment comparison and hyperparameter suggestion agent
