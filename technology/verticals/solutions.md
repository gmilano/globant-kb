# 🏭 Verticales de partida — Technology

> Plataformas existentes customizables con AI. Modelo: partir de algo funcional, añadir capa agéntica encima.
> Última actualización: 2026-07-13

## Plataformas recomendadas

| Plataforma | Licencia | URL | Stack | Caso de uso AI |
|------------|----------|-----|-------|----------------|
| **Gitea** | MIT | [go-gitea/gitea](https://github.com/go-gitea/gitea) | Go | Self-hosted git + CI/CD; añadir MCP server → agente revisa PRs, genera changelogs, detecta deuda técnica |
| **Forgejo** | GPL-3.0 | [codeberg.org/forgejo](https://codeberg.org/forgejo/forgejo) | Go | Fork community de Gitea; gobernanza abierta; + forgejo-mcp (103 tools) para AI-first DevOps |
| **Backstage** | Apache-2.0 | [backstage/backstage](https://github.com/backstage/backstage) | React/Node | Developer portal CNCF; catálogo de servicios; + plugin AI para onboarding, tech radar, runbooks |
| **Dify** | Apache-2.0 | [langgenius/dify](https://github.com/langgenius/dify) | Python/Next.js | Plataforma full-stack LLM: workflow visual, RAG, API, 1M+ apps en prod; base para cualquier producto AI |
| **Ollama** | MIT | [ollama/ollama](https://github.com/ollama/ollama) | Go | Servidor local de LLMs; API OpenAI-compatible; base para edge AI, air-gapped, LATAM con baja latencia |
| **Langfuse** | MIT | [langfuse/langfuse](https://github.com/langfuse/langfuse) | TypeScript | Observabilidad LLMOps self-hosted; trazas, evals, costos, dashboards; obligatorio en producción |
| **n8n** | Fair-code | [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | Workflow automation con 400+ integraciones; añadir nodos AI → automatización enterprise sin código |
| **Mattermost** | Apache-2.0 | [mattermost/mattermost](https://github.com/mattermost/mattermost) | Go/React | Slack self-hosted; añadir bots AI con MCP → ChatOps con agentes que actúan sobre DevOps stack |
| **Kapitan** | Apache-2.0 | [kapicorp/kapitan](https://github.com/kapicorp/kapitan) | Python | Config management Kubernetes/Helm; + agent-toolkit-for-kapitan MCP → agente gestiona infra K8s |
| **OpenTelemetry** | Apache-2.0 | [open-telemetry/opentelemetry-collector](https://github.com/open-telemetry/opentelemetry-collector) | Go | Colector de trazas/métricas/logs; base para observabilidad AI-native (Langfuse integra nativo) |

## Cómo customizar con AI

### Patrón genérico

1. **Fork del repo base** (Gitea, Backstage, Dify...)
2. **Añadir endpoint AI** → conectar a LiteLLM (abstracción multi-provider: OpenAI/Anthropic/Ollama local)
3. **Wrappear flujos existentes** → LangGraph para orchestration, Mem0 para persistencia de contexto
4. **Observabilidad** → Langfuse para trazas, costos y evals desde día 1
5. **MCP server** → exponer capacidades de la plataforma al agente (forgejo-mcp como modelo a seguir)
6. **UI conversacional** → Dify o interfaz custom sobre la plataforma base

### Stack mínimo recomendado (open source, self-hosted)

```
Git: Gitea/Forgejo  +  forgejo-mcp
CI/CD: Gitea Actions o Woodpecker CI
Modelos: Ollama (local) + LiteLLM (gateway multi-provider)
Orchestration: LangGraph o smolagents
Memoria: Mem0
Observabilidad: Langfuse
Portal dev: Backstage con plugin AI
ChatOps: Mattermost + bot MCP
```
