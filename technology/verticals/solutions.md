# 🏭 Verticales de Partida — Technology

> Plataformas verticales existentes customizables con AI para la industria tech.
> Modelo: partir de algo funcional y maduro, añadir capa agéntica encima.
> Última actualización: 2026-07-12

## Plataformas recomendadas

| Plataforma | Licencia | URL | Stack | Caso de uso AI |
|------------|----------|-----|-------|----------------|
| **Dify** | Apache-2.0 | [langgenius/dify](https://github.com/langgenius/dify) | Python / TypeScript / Next.js | Base para apps AI productivas: RAG pipelines, workflow agéntico, model management, API gateway para LLMs |
| **n8n** | Apache-2.0 | [n8n-io/n8n](https://github.com/n8n-io/n8n) | Node.js / TypeScript / Vue | Automatización AI no-code/low-code; trigger → agente → acción; MCP client nativo desde v1.70+ |
| **Open WebUI** | MIT | [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python / Svelte | Chat UI self-hosted sobre Ollama + cualquier API OpenAI-compatible; RAG, tools, multimodal |
| **Flowise** | Apache-2.0 | [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) | Node.js / TypeScript | Builder visual drag-and-drop de LLM flows y agentes; para prototipos rápidos y teams sin código |
| **MLflow** | Apache-2.0 | [mlflow/mlflow](https://github.com/mlflow/mlflow) | Python / React | Tracking de experimentos ML, model registry, serving; estándar de facto para MLOps en enterprise |
| **Kubeflow** | Apache-2.0 | [kubeflow/kubeflow](https://github.com/kubeflow/kubeflow) | Kubernetes / Python | ML pipelines productivos en k8s; training distribuido, model serving, hyperparameter tuning |
| **Gitea** | MIT | [go-gitea/gitea](https://github.com/go-gitea/gitea) | Go / JavaScript | Git service self-hosted liviano; base para flujos DevOps con AI integrado en CI/CD |
| **Plane** | Apache-2.0 | [makeplane/plane](https://github.com/makeplane/plane) | Python / Next.js | Project management open source (alternativa a Linear/Jira); base para AI-powered project tracking |
| **Appsmith** | Apache-2.0 | [appsmithorg/appsmith](https://github.com/appsmithorg/appsmith) | Java / TypeScript | Builder de internal tools; conecta con cualquier DB/API y añade UI conversacional con AI |
| **Mattermost** | MIT | [mattermost/mattermost](https://github.com/mattermost/mattermost) | Go / React | Team communications self-hosted; plataforma para bots AI y asistentes internos en enterprise |

## Cómo customizar con AI

### Patrón estándar (3-4 semanas)

```
1. Fork del repo base (Dify, n8n, o Gitea según el caso)
2. Definir el dominio de conocimiento (embeddings de docs internos)
3. Configurar provider AI: Anthropic / OpenAI / Ollama local
4. Wrappear flujos existentes con agentes (LangGraph o CrewAI)
5. Exponer UI conversacional o API REST para el cliente
```

### Integración AI sobre DevOps existente

```
Gitea (self-hosted Git)
      ↓
CI/CD pipeline (Gitea Actions / Jenkins / GitHub Actions)
      ↓
Claude Code Security Review (GitHub Action MIT)
      ↓
MLflow (tracking de métricas / model registry)
      ↓
Kubeflow (deployment en k8s)
```

### Stack mínimo viable para AI dev tools interno

- **Backend**: Dify (orquestación) + MLflow (tracking) + Ollama (modelos locales)
- **Frontend**: Open WebUI (chat) + Plane (PM)
- **Automatización**: n8n (triggers y workflows)
- **Infra**: Kubernetes + Kubeflow para training; Docker para serving
