# 🧩 Patrones de composición — Technology / Software Development

> Recetas concretas para construir soluciones AI combinando repos + agentes.
> Cada patrón: repos específicos + cómo conectarlos + tiempo estimado.
> Última actualización: 2026-07-13 (v12)

---

## P1 — AI Code Review en Pull Requests (CI)

**Problema**: el code review manual es el cuello de botella más común en equipos de software.

```
Gitea o GitHub (PR event webhook)
  → GitHub Actions / Gitea CI
  → OpenHands (All-Hands-AI/OpenHands, MIT) en modo headless
      · Lee el diff del PR
      · Ejecuta tests en sandbox
      · Analiza calidad con SonarQube (LGPL) via MCP
  → Comentarios automáticos en el PR con findings
  → Cline (cline/cline, Apache-2.0) en IDE del developer para fix suggestions
```

**Repos clave**: `All-Hands-AI/OpenHands` + `SonarSource/sonarqube` + `cline/cline`  
**Licencias**: MIT + LGPL-3.0 + Apache-2.0  
**Tiempo estimado**: 2–3 semanas para MVP con Gitea self-hosted  
**ROI**: reducción 40-60% en tiempo de code review; detección de bugs antes de merge

---

## P2 — Terminal Coding Agent con MCP Stack Corporativo

**Problema**: el developer necesita un agente que entienda el stack completo de la empresa (Jira, Confluence, Postgres, GitHub, Kubernetes).

```
opencode (anomalyco/opencode, MIT) — agente terminal principal
  └─ MCP servers conectados:
      · @modelcontextprotocol/server-filesystem — acceso al repo local
      · @modelcontextprotocol/server-postgres — queries a BD de producción (read-only)
      · Gitea MCP server — PRs, issues, wikis
      · Kubernetes MCP server — estado del cluster
      · Confluence MCP server — documentación técnica
  └─ opencode "sabe todo" sobre el sistema del cliente
  └─ Developer escribe en lenguaje natural: "fix el bug del ticket JIRA-4821"
```

**Repos clave**: `anomalyco/opencode` + `wong2/awesome-mcp-servers` (catálogo)  
**Licencias**: MIT  
**Tiempo estimado**: 1–2 semanas para instalar y configurar el stack MCP  
**ROI**: 9.4h ahorradas/developer/semana (industria promedio)

---

## P3 — Visual Agent Builder para Non-Developers

**Problema**: áreas de negocio (producto, ops, legal) quieren agentes pero no pueden escribir código.

```
Dify (langgenius/dify, Apache-2.0) — plataforma self-hosted
  └─ Workflow visual builder:
      · Nodo LLM (Anthropic claude-sonnet-5 o Ollama local)
      · Nodo Knowledge Base (documentos internos, PDFs, wikis)
      · Nodo Tool: browser-use (browser-use/browser-use, MIT) para scraping web
      · Nodo Output: email / Slack / Webhook
  └─ Usuarios de negocio construyen y modifican flujos sin código
  └─ IT mantiene el Dify self-hosted (Docker Compose)
```

**Repos clave**: `langgenius/dify` + `browser-use/browser-use`  
**Licencias**: Apache-2.0 + MIT  
**Tiempo estimado**: 1 semana setup + 2–3 semanas para primeros workflows de negocio  
**ROI**: autonomía de áreas de negocio; reducción de backlog de IT para automatizaciones simples

---

## P4 — Migración / Refactoring Masivo con Parallel Agent Fleet

**Problema**: migrar un monolito legacy (50k+ archivos) a microservicios o modernizar tech stack requiere meses de trabajo manual.

```
Orca (stablyai/orca, Apache-2.0) — orchestrator de fleet de agentes
  └─ Divide el repositorio en módulos independientes
  └─ Lanza N instancias paralelas de OpenHands (MIT):
      · Agente 1: módulo auth → microservicio FastAPI
      · Agente 2: módulo payments → microservicio Go
      · Agente N: módulo reports → microservicio Python
  └─ Cada agente ejecuta tests locales en su sandbox
  └─ Agente orquestador valida integración entre módulos
  └─ aider (paul-gauthier/aider, Apache-2.0) para commits disciplinados
  └─ SonarQube valida calidad del código generado antes de merge
```

**Repos clave**: `stablyai/orca` + `All-Hands-AI/OpenHands` + `paul-gauthier/aider` + `SonarSource/sonarqube`  
**Licencias**: Apache-2.0 + MIT + Apache-2.0 + LGPL-3.0  
**Tiempo estimado**: 4–8 semanas para migración que tomaría 6–12 meses manual  
**ROI**: 5–10x aceleración en modernización de legado; diferenciador competitivo de Globant

---

## P5 — DevOps ChatOps Agent sobre Mattermost

**Problema**: el equipo de ops recibe alertas en Grafana pero necesita actuar en Kubernetes y GitHub. Flujo manual y lento.

```
Grafana (grafana/grafana, AGPL-3.0) — alertas de observabilidad
  → Webhook a Mattermost (mattermost/mattermost, Apache-2.0)
  → Bot de ChatOps con MCP tools:
      · Kubernetes MCP — listar pods, escalar deployments, rollback
      · GitHub MCP — listar PRs, mergear hotfix aprobado
      · Dify MCP — invocar flujo de diagnóstico automatizado
  → Developer escribe en canal: "/rollback payment-service v2.3.1"
  → Agente ejecuta rollback con confirmación HITL (bounded autonomy)
  → Log auditado en Mattermost para compliance
```

**Repos clave**: `mattermost/mattermost` + `grafana/grafana` + MCP servers propios  
**Licencias**: Apache-2.0 + AGPL-3.0  
**Tiempo estimado**: 3–4 semanas  
**ROI**: MTTR (Mean Time to Recover) reducido 50–70%; cumplimiento de audit trail

---

## P6 — AI Onboarding Agent para Nuevos Developers

**Problema**: onboarding de un developer nuevo en una codebase grande toma 2–4 semanas. El conocimiento del repo está disperso en Confluence + código + Slack.

```
Graphify (Graphify-Labs/graphify, MIT)
  → Indexa el codebase → knowledge graph consultable
  → MCP server sobre el graph

opencode (MIT) o Cline (Apache-2.0)
  → Conectado al MCP de Graphify + Confluence MCP + GitHub MCP
  → Developer nuevo pregunta en lenguaje natural:
      "¿Qué módulos debo modificar para añadir un nuevo tipo de pago?"
      "¿Quién es el owner de la autenticación y cuándo fue el último cambio?"
  → Agente responde con context del grafo + links a código + historia de cambios

smolagents (huggingface/smolagents, Apache-2.0)
  → Agente ligero que responde preguntas de arquitectura en el chat interno
```

**Repos clave**: `Graphify-Labs/graphify` + `anomalyco/opencode` + `huggingface/smolagents`  
**Licencias**: MIT + MIT + Apache-2.0  
**Tiempo estimado**: 2–3 semanas (indexar repo + configurar agente)  
**ROI**: onboarding de 2–4 semanas → 3–5 días; retención de conocimiento institucional

---

## P7 — MCP Security Scanner en Pipeline CI/CD

**Problema**: la adopción de MCP servers sin revisión crea vulnerabilidades de supply chain en el stack de AI.

```
Bumblebee (PerplexityAI/bumblebee, Apache-2.0)
  → Escanea: dependencias npm/pip, MCP servers en .mcp.json, extensiones de editor
  → CI pipeline: bloquea MCP servers con indicadores de riesgo
  → Reporte de supply chain risk en cada PR

Integrado con:
  · GitHub Actions (YAML)
  · Gitea CI (si self-hosted)
  · Slack/Mattermost alert si se detecta paquete sospechoso
  · SonarQube (LGPL) para correlacionar con code quality

Governance:
  · Lista blanca de MCP servers aprobados por el cliente
  · Bounded autonomy: agentes solo pueden usar MCP servers del registry aprobado
```

**Repos clave**: `PerplexityAI/bumblebee` + `SonarSource/sonarqube` + CI de elección  
**Licencias**: Apache-2.0 + LGPL-3.0  
**Tiempo estimado**: 1 semana para integración básica  
**ROI**: prevención de incidentes de seguridad en stack AI; requerimiento creciente en enterprise

---
*Fuentes: benchmark de adopción JetBrains 2025; Gartner 2026 AI Coding Agents Market Guide; New Stack — 5 Key Trends Agentic Development 2026.*
