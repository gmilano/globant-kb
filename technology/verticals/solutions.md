# 🏭 Verticales de partida — Technology / Software Companies

> Plataformas open source usadas por empresas de tecnología.
> Estrategia: partir de algo funcional y producción-ready, añadir capa agéntica encima.
> Última actualización: 2026-07-13 (v12)

## Plataformas recomendadas

| Plataforma | Licencia | Repo | Stack | Caso de uso principal |
|------------|----------|------|-------|-----------------------|
| [Gitea](https://github.com/go-gitea/gitea) | MIT | go-gitea/gitea | Go | Self-hosted Git para empresas que no pueden usar GitHub Cloud. Base para AI code review agents. |
| [Supabase](https://github.com/supabase/supabase) | Apache-2.0 | supabase/supabase | Postgres + TypeScript | Firebase open source. Backend-as-a-Service con auth, storage, realtime, functions. |
| [Appwrite](https://github.com/appwrite/appwrite) | BSD-3-Clause | appwrite/appwrite | PHP + TypeScript | BaaS multi-plataforma. Auth, DB, Functions, Storage. Self-hosteable. |
| [Grafana](https://github.com/grafana/grafana) | AGPL-3.0 | grafana/grafana | Go + TypeScript | Observabilidad y dashboards. Integra con cualquier datasource. |
| [Dify](https://github.com/langgenius/dify) | Apache-2.0 | langgenius/dify | Python + Next.js | LLM app platform completo. Puede reemplazar MLflow + LangChain + prompt management juntos. |
| [Portainer](https://github.com/portainer/portainer) | zlib | portainer/portainer | Go | Container management (Docker/Kubernetes). UI para devops no-expertos. |
| [SonarQube Community](https://github.com/SonarSource/sonarqube) | LGPL-3.0 | SonarSource/sonarqube | Java | Code quality y security analysis. Se integra con CI/CD. Base para AI code review. |
| [Mattermost](https://github.com/mattermost/mattermost) | Apache-2.0 | mattermost/mattermost | Go + TypeScript | Slack open source con bots MCP y AI integrations. Governa en enterprises con compliance. |

## Cómo añadir AI encima

### Sobre Gitea → AI Code Review Agent
```
Gitea webhooks (PR events)
  → OpenHands o Claude Code Action
  → Análisis de diff con LLM
  → Comentarios automáticos en el PR
  → SonarQube para quality gates
```

### Sobre Supabase → AI Data Assistant
```
Supabase (Postgres + Auth + Realtime)
  → MCP server de Supabase (oficial, MIT)
  → Agente Cline / opencode con acceso al schema
  → Queries en lenguaje natural
  → Alertas proactivas via Grafana + LLM
```

### Sobre Dify → Enterprise AI Portal
```
Dify (auto-hosted)
  → Modelos propios (Ollama local o Anthropic API)
  → Conectado a bases de datos internas via MCP
  → UI de agentes para usuarios no-técnicos
  → Audit log nativo (compliance)
```

### Sobre Mattermost → DevOps ChatOps Agent
```
Mattermost (self-hosted, compliance)
  → Bot con MCP tools: Kubernetes, GitHub, CI/CD
  → Agente que responde /deploy, /rollback, /status
  → Integración con Grafana para alertas
  → Logs auditables para SOC
```

---
*Ver también: `repos/foundations.md` para frameworks base.*
