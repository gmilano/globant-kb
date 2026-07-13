# 🧩 Patrones de composición — Technology

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-13

## Arquitectura base

```
[Plataforma DevOps base (Gitea/Backstage/n8n)]
          ↓
[MCP server (forgejo-mcp / API wrapper)]
          ↓
[Orchestration (LangGraph / smolagents / Dify)]
          ↓
[Agente especializado (opencode / OpenHands / Cline)]
          ↓
[Memoria persistente (Mem0)]  +  [Observabilidad (Langfuse)]
          ↓
[UI conversacional / API / ChatOps (Mattermost bot)]
```

---

## P1: AI Code Review Pipeline (CI/CD → PR automático)

**Objetivo:** Revisar seguridad y calidad en cada PR sin intervención humana.

**Stack:**
- `anthropics/claude-code-security-review` (MIT, ~5.4k★) — GitHub Action que llama a Claude
- `tirth8205/code-review-graph` (MIT, ~19k★) — grafo de inteligencia de código local-first
- `langfuse/langfuse` (MIT, ~31k★) — traza y registra cada review
- `modelcontextprotocol/servers` (Apache-2.0) — MCP filesystem para acceso al repo

**Cómo wiring:**
```yaml
# .github/workflows/ai-review.yml
on: [pull_request]
jobs:
  security-review:
    uses: anthropics/claude-code-security-review/.github/workflows/review.yml@main
    with:
      model: claude-sonnet-5
      langfuse_enabled: true
```

**Tiempo estimado:** 1 día de setup  
**ROI:** Reduce ciclo de security review de días a minutos; detección de vulnerabilidades antes de merge

---

## P2: Legacy Modernization Agent (COBOL/RPG → Cloud-native)

**Objetivo:** Analizar, documentar y migrar código legacy a lenguajes modernos con validación funcional.

**Stack:**
- `All-Hands-AI/OpenHands` (MIT, ~80k★) — agente dev completo con sandbox dockerizado
- `langchain-ai/langgraph` (MIT, ~34k★) — orchestration del pipeline multi-paso
- `mem0ai/mem0` (Apache-2.0, ~61k★) — persistir contexto del codebase entre sesiones largas
- `langfuse/langfuse` (MIT) — audit trail completo de cada decisión del agente
- `BerriAI/litellm` (MIT, ~53k★) — abstracción multi-provider (Claude para análisis, Gemini para traducción)

**Flujo:**
```
1. Análizar módulo COBOL → documentación en Markdown (agente 1: análisis)
2. Identificar dependencias y flujo de datos (grafo)
3. Generar tests de comportamiento en base a la documentación
4. Traducir a Python/TypeScript (agente 2: traducción)
5. Correr tests de equivalencia funcional
6. Si pasan → PR automático; si fallan → iteración del agente
```

**Tiempo estimado:** 8–16 semanas (por módulo de ~50k LOC COBOL)  
**Diferenciador LATAM:** Bancos y telcos de Argentina, Brasil, Colombia tienen deuda legacy crítica

---

## P3: Multi-Agent Coding Fleet (Orca + LangGraph)

**Objetivo:** Acelerar desarrollo paralelizando tareas con fleet de coding agents.

**Stack:**
- `stablyai/orca` (MIT) — ADE para gestionar fleet de agentes en worktrees paralelos
- `sst/opencode` (MIT, ~183k★) — coding agent para cada worktree
- `langchain-ai/langgraph` (MIT, ~34k★) — orchestration y coordinación entre agentes
- `mem0ai/mem0` (Apache-2.0) — memoria compartida entre agentes del fleet

**Patrón:**
```
Orquestador (LangGraph)
├── Agente A (opencode en worktree-feature-A): implementa feature X
├── Agente B (opencode en worktree-feature-B): implementa feature Y
├── Agente C (opencode en worktree-tests): escribe tests de integración
└── Agente D (opencode en worktree-docs): actualiza documentación
          ↓
Merge automático con validación cruzada
```

**Tiempo estimado:** 2–4 semanas de setup; luego productivo desde día 1  
**Reducción de ciclo:** 4× vs desarrollo secuencial en proyectos medianos-grandes

---

## P4: LLMOps Stack Self-Hosted (LATAM enterprise)

**Objetivo:** Stack completo de AI engineering observable, auditable y sin lock-in cloud para enterprise con restricciones de data residency.

**Stack:**
- `ollama/ollama` (MIT, ~120k★) — inference local (modelos hasta 70B con GPU)
- `vllm-project/vllm` (Apache-2.0, ~86k★) — serving distribuido para modelos grandes
- `BerriAI/litellm` (MIT, ~53k★) — gateway unificado OpenAI-compatible
- `langfuse/langfuse` (MIT, ~31k★) — observabilidad self-hosted
- `langgenius/dify` (Apache-2.0, ~144k★) — plataforma de apps LLM

**Arquitectura:**
```
Clientes (app / agente / IDE)
          ↓
LiteLLM Proxy (gateway unificado, routing, cost control)
    ├── Ollama (modelos locales: Llama 3, Mistral, Gemma)
    ├── vLLM (modelos grandes: Qwen 72B, DeepSeek)
    └── API externa (Claude / GPT-4.1 para tareas complejas)
          ↓
Langfuse (trazas, evals, costos, dashboards)
          ↓
Dify (workflow builder, RAG, API management)
```

**Tiempo estimado:** 3–5 semanas  
**Por qué LATAM:** Regulaciones de LGPD (Brasil), Ley 1581 (Colombia) exigen que datos sensibles no salgan del país

---

## P5: ChatOps DevOps Agent (Mattermost + MCP)

**Objetivo:** Agente conversacional en Slack/Mattermost que actúa sobre el DevOps stack.

**Stack:**
- `mattermost/mattermost` (Apache-2.0) — plataforma self-hosted de mensajería
- `Sqcows/forgejo-mcp` (MIT) — 103 tools sobre Gitea/Forgejo (repos, issues, PRs)
- `modelcontextprotocol/servers` (Apache-2.0) — MCP servers adicionales (DB, monitoring)
- `langchain-ai/langgraph` (MIT) — orchestration del agente ChatOps
- `langfuse/langfuse` (MIT) — audit trail de comandos ejecutados por el agente

**Capacidades del agente:**
```
"@devbot: ¿cuántos PRs abiertos tiene el equipo backend?"
"@devbot: crea un issue con los bugs del standup de hoy"
"@devbot: mergea los PRs que pasaron CI en el repo payments"
"@devbot: ¿qué se deployó ayer a producción?"
"@devbot: rollback del último deploy en staging"
```

**Tiempo estimado:** 4–8 semanas  
**Clave de governance:** Bounded autonomy — el agente ejecuta acciones rutinarias pero pide confirmación humana en deploys a producción

---

## P6: Developer Portal AI-Native (Backstage + AI)

**Objetivo:** Portal de developer experience con capacidades AI: onboarding automatizado, búsqueda semántica, runbooks inteligentes.

**Stack:**
- `backstage/backstage` (Apache-2.0, ~30k★) — developer portal base (Spotify/CNCF)
- Plugin AI custom con LiteLLM + LangGraph
- `mem0ai/mem0` (Apache-2.0) — personalización por developer
- `langfuse/langfuse` (MIT) — tracking de consultas y satisfacción

**Features AI añadidas:**
- **Onboarding agent**: guía a nuevo dev por setup, docs relevantes, a quién preguntar
- **Búsqueda semántica**: "¿dónde está el código que maneja pagos?" → responde con links reales
- **Runbook navigator**: "el servicio payments está caído" → agente recorre runbook y ejecuta pasos
- **Tech radar explicado**: "¿por qué dejamos de usar Kafka?" → agente busca ADRs y explica la decisión

**Tiempo estimado:** 6–10 semanas  
**Impacto medible:** -40% tiempo de onboarding; -60% tickets "¿dónde está X?" en Slack

---

## P7: Spec-Driven Development Pipeline

**Objetivo:** Desarrollo riguroso donde el agente genera código que debe validar contra una especificación formal.

**Stack:**
- `github/spec-kit` (MIT) — toolkit spec-driven de GitHub (mayo 2026)
- `sst/opencode` (MIT, ~183k★) o `All-Hands-AI/OpenHands` (MIT) — coding agent
- `langchain-ai/langgraph` (MIT) — pipeline de validación iterativa
- `langfuse/langfuse` (MIT) — traza iteraciones y métricas de conformidad

**Flujo:**
```
1. Humano escribe especificación formal (OpenAPI, schema, comportamiento esperado)
2. Spec-Kit la parsea y genera casos de prueba
3. Coding agent implementa código que intenta pasar los tests
4. Validador verifica conformidad con spec
5. Si falla → agente itera con razonamiento sobre el error
6. Si pasa → PR con coverage report de spec conformance
```

**Cuándo usar:** Enterprise con requisitos de compliance, auditoría o cuando "vibe coding" no da garantías suficientes  
**Tiempo estimado:** 2–3 semanas de framework; luego por feature

---

## Guía de selección de patrón

| Si el cliente tiene... | Usar patrón |
|------------------------|-------------|
| Código legacy COBOL/RPG | P2 Legacy Modernization |
| Equipo grande, proyectos paralelos | P3 Multi-Agent Fleet |
| Requisitos de data residency | P4 LLMOps Self-Hosted |
| Stack DevOps en Gitea/Forgejo | P5 ChatOps Agent |
| Muchos developers, onboarding lento | P6 Developer Portal |
| Enterprise con compliance estricto | P7 Spec-Driven |
| Cualquier proyecto con PRs | P1 Code Review CI/CD |
