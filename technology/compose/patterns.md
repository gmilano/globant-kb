# 🧩 Patrones de Composición — Technology

> Recetas concretas para construir soluciones AI para clientes tech.
> Cada patrón nombra repos específicos + cómo conectarlos.
> Última actualización: 2026-07-12

## Patrón base

```
[Plataforma vertical base (open source)]
          ↓
[Capa de integración AI — LangGraph / n8n / Dify]
          ↓
[Agentes especializados — OpenHands / CrewAI / MetaGPT]
          ↓
[UI conversacional / API para el cliente]
```

---

## P1 — AI-Native Software Delivery (4-6 semanas)

> **Problema**: Software factory quiere reducir 40% el tiempo de dev en proyectos nuevos.

**Stack**:
- [anomalyco/opencode](https://github.com/anomalyco/opencode) (MIT) — coding agent terminal para devs
- [all-hands-ai/OpenHands](https://github.com/all-hands-ai/OpenHands) (MIT) — agente autónomo para tareas largas (crear módulos completos)
- [go-gitea/gitea](https://github.com/go-gitea/gitea) (MIT) — Git self-hosted con Gitea Actions para CI/CD
- [anthropics/claude-code-security-review](https://github.com/anthropics/claude-code-security-review) (MIT) — security review automático en cada PR
- [mlflow/mlflow](https://github.com/mlflow/mlflow) (Apache-2.0) — tracking de métricas de calidad de código

**Arquitectura**:
```
Developer → opencode (terminal, tareas cortas)
         → OpenHands (sandbox Docker, tareas largas: módulo completo)
         → Gitea (PR creado por agente)
         → Gitea Actions → claude-code-security-review (automático)
         → Merge si pasa seguridad
         → MLflow: tracking de métricas (cobertura tests, vulnerabilidades)
```

**Tiempo estimado**: 4-6 semanas para setup + onboarding equipo.

---

## P2 — Self-Hosted AI Dev Platform para Enterprise (6-8 semanas)

> **Problema**: Enterprise con restricciones de datos quiere toda la AI on-premise, sin mandar código a APIs externas.

**Stack**:
- [ollama/ollama](https://github.com/ollama/ollama) (MIT) — LLMs 100% locales (Llama 3.3, DeepSeek, Qwen)
- [open-webui/open-webui](https://github.com/open-webui/open-webui) (MIT) — chat UI self-hosted sobre Ollama
- [langchain-ai/langchain](https://github.com/langchain-ai/langchain) (MIT) — framework para conectar LLM local con tools internas
- [paul-gauthier/aider](https://github.com/paul-gauthier/aider) (Apache-2.0) — coding agent git-native con soporte Ollama
- [mlflow/mlflow](https://github.com/mlflow/mlflow) (Apache-2.0) — MLOps tracking completamente on-premise

**Arquitectura**:
```
Ollama (servidor GPU interno, modelos locales)
     ↓
Open WebUI (chat interno, RAG sobre docs de la empresa)
     ↓
Aider (coding agent local → Git commits automáticos)
     ↓
LangChain: chains custom sobre sistemas legacy (API internas)
     ↓
MLflow: tracking de uso y calidad
```

**Resultado**: Zero data leaves the building. Compliance total con LGPD/GDPR.

---

## P3 — Multi-Agent Software Team (MetaGPT Pattern) (3-4 semanas)

> **Problema**: Cliente quiere generar un MVP completo desde un PRD (Product Requirements Document).

**Stack**:
- [geekan/MetaGPT](https://github.com/geekan/MetaGPT) (MIT) — multi-agent software company
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) (MIT) — orquestación del workflow multi-agente con estado
- [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) (MIT) — crew alternativo para tareas especializadas (QA, security)
- [all-hands-ai/OpenHands](https://github.com/all-hands-ai/OpenHands) (MIT) — ejecución de código en sandbox

**Arquitectura**:
```
Input: PRD del cliente
     ↓
MetaGPT: roles asignados a LLMs
  - Product Manager → user stories, backlog
  - Architect → diseño de sistema, tech stack
  - Developer → código (usa OpenHands para ejecución)
  - QA → tests, casos de edge
  - Security → review con claude-code-security-review
     ↓
Output: repo Git con código, tests, docs y CI/CD configurado
```

**Tiempo estimado**: 3-4 semanas para customizar MetaGPT al stack del cliente.

---

## P4 — AI-Powered DevOps Automation con n8n (2-3 semanas)

> **Problema**: DevOps team quiere automatizar triage de issues, generación de runbooks y alertas inteligentes.

**Stack**:
- [n8n-io/n8n](https://github.com/n8n-io/n8n) (Apache-2.0) — workflow orchestration con AI nativo
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) (MIT) — agentes para análisis de logs
- [mlflow/mlflow](https://github.com/mlflow/mlflow) (Apache-2.0) — tracking de incidentes y métricas
- [dynatrace-oss/dtctl](https://github.com/dynatrace-oss/dtctl) (Apache-2.0) — CLI Dynatrace para AI agents

**Arquitectura**:
```
Alert (PagerDuty / Dynatrace → dtctl)
     ↓
n8n trigger → AI analysis (LangGraph agent con logs)
     ↓
Auto-triage: clasifica severidad, asigna owner
     ↓
Si P1: crea runbook AI + escalación Slack/Teams automática
Si P2-P3: crea ticket + draft solución en GitLab/Jira
     ↓
Post-mortem: MLflow tracking del incidente + métricas de resolución
```

**Tiempo estimado**: 2-3 semanas. Muy buen ROI visible desde la primera semana.

---

## P5 — Internal Knowledge Base + Code Assistant (3-4 semanas)

> **Problema**: Dev team pierde 2+ horas/día buscando cómo funciona el sistema legacy.

**Stack**:
- [langgenius/dify](https://github.com/langgenius/dify) (Apache-2.0) — plataforma AI con RAG nativo
- [ollama/ollama](https://github.com/ollama/ollama) (MIT) — modelos locales para privacidad
- [open-webui/open-webui](https://github.com/open-webui/open-webui) (MIT) — UI de chat para el equipo
- [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph) (MIT) — grafo de conocimiento del codebase

**Arquitectura**:
```
Codebase (repos legacy) → code-review-graph (indexa el grafo de código)
Docs internas (Confluence, Notion, PDFs) → Dify (embeddings + RAG)
     ↓
Open WebUI: "¿Cómo funciona el módulo de pagos?" → respuesta con contexto real
     ↓
Dify: si la pregunta requiere código → tool call a code-review-graph → respuesta con refs exactas al repo
```

**Resultado**: Onboarding de nuevos devs de 3 semanas → 3 días.

---

## P6 — Automated Code Quality Gates (1-2 semanas)

> **Problema**: Equipo no tiene tiempo para code review manual de todos los PRs.

**Stack**:
- [anthropics/claude-code-security-review](https://github.com/anthropics/claude-code-security-review) (MIT) — GitHub Action de security review
- [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph) (MIT) — contexto del codebase para review más preciso
- [mlflow/mlflow](https://github.com/mlflow/mlflow) (Apache-2.0) — tracking de hallazgos y métricas de calidad

**Arquitectura**:
```
PR creado → GitHub Actions trigger
     ↓
claude-code-security-review: analiza diff vs OWASP Top 10
     ↓
code-review-graph: añade contexto del codebase (¿esta función ya existe?)
     ↓
Si crítico: bloquea PR + comenta con fix sugerido
Si warning: aprueba con comentarios opcionales
     ↓
MLflow: tracking de vulnerabilidades encontradas/ciclo, tiempo de resolución
```

**Tiempo estimado**: 1-2 semanas para configurar + integrar en CI/CD existente. Rápido win.
