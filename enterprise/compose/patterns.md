# 🧩 Patrones de composición — Enterprise

> Recetas concretas combinando repos + agentes + AI. Listas para proponer a clientes.
> Última actualización: 2026-07-13 (v6)

## Arquitectura base

```
[Plataforma vertical base: Odoo / ERPNext / Twenty / iTop]
          ↓ (MCP Server o REST API)
[Capa de orquestación: n8n / Dify / LangGraph / CrewAI]
          ↓
[Agentes especializados: PydanticAI / OpenAI Agents SDK / Agno]
          ↓ (A2A Protocol para multi-org)
[LLM Backend: Claude / GPT-4o / Ollama on-prem]
          ↓
[UI conversacional: chatbot web / Slack bot / Teams bot]
```

---

## P1 — ERP Copilot sobre Odoo/ERPNext

**Propósito**: Asistente conversacional en lenguaje natural para empleados del ERP; consultas, actualizaciones y reportes sin navegar módulos.

**Stack**:
- `odoo/odoo` (LGPL-3.0, ~52k★) — base ERP
- `rakeshgangwar/erpnext-mcp-server` (MIT) — bridge MCP para ERPNext
- `n8n-io/n8n` (fair-code, ~100k★) — trigger/router de workflows
- `langchain-ai/langchain` (MIT, ~126k★) — cadena RAG sobre documentación ERP
- Claude (Anthropic API) — LLM con razonamiento sobre contexto empresarial

**Wiring**:
```
Usuario → chatbot web → n8n webhook → LangChain RAG (docs Odoo + datos cliente)
        → MCP Server Odoo → operación (crear factura, buscar proveedor, etc.)
        → Claude genera respuesta en lenguaje natural → usuario
```

**Tiempo estimado**: 6–10 semanas  
**Caso LATAM**: clientes con Odoo en Brasil/México que necesitan cumplimiento Reforma Tributaria + NF-e

---

## P2 — Agente de Mesa de Servicio IT (ITSM)

**Propósito**: Agente multi-step que resuelve tickets de IT de nivel 1 sin intervención humana: reset passwords, provisión de accesos, diagnóstico básico.

**Stack**:
- `Combodo/iTop` (AGPL-3.0, ~1k★) — ITSM/CMDB base
- `crewAIInc/crewAI` (MIT, ~44k★) — multi-agente con roles: Triage, Diagnóstico, Acción, Escalado
- `langchain-ai/langgraph` (MIT, ~24k★) — grafo stateful para flujo incident → resolve/escalate
- `pydantic/pydantic-ai` (MIT, ~18k★) — validación type-safe de acciones en CMDB
- `n8n-io/n8n` — integración con Active Directory, email, Slack

**Wiring**:
```
Ticket iTop → CrewAI Triage Agent → LangGraph decisión → 
  si resolvible: n8n ejecuta acción (reset pass / AD group)
  si no: escalar con contexto completo a agente humano
        → PydanticAI valida + actualiza CMDB → cierra ticket
```

**Tiempo estimado**: 8–12 semanas  
**Métricas**: reducción 40% tickets Nivel 1, tiempo resolución −60%

---

## P3 — Pipeline de Inteligencia Documental

**Propósito**: Procesar automáticamente contratos, facturas, órdenes de compra entrantes: clasificar, extraer datos estructurados, actualizar ERP.

**Stack**:
- `deepset-ai/haystack` (Apache-2.0, ~18k★) — pipelines RAG + extracción documental
- `pydantic/pydantic-ai` (MIT, ~18k★) — schemas tipo-seguros para extracción
- `n8n-io/n8n` — intake (email, S3, Drive) + output (ERP update, notificaciones)
- `frappe/erpnext` (GPL-3.0, ~36k★) — destino de datos estructurados
- Claude (claude-sonnet-5) — extracción + clasificación avanzada

**Wiring**:
```
Email/S3 → n8n trigger → Haystack PDF/OCR pipeline →
  PydanticAI extrae: vendor, monto, líneas, fechas, tipo_doc →
  Claude valida y completa campos ambiguos →
  n8n actualiza ERPNext vía API → alerta Slack si confianza < 0.85
```

**Tiempo estimado**: 4–6 semanas  
**Caso real**: automatización facturación en empresas con 500+ facturas/mes

---

## P4 — CRM Intelligence con Twenty + MCP

**Propósito**: Enriquecer el CRM automáticamente: investigar prospectos, redactar emails personalizados, generar seguimientos basados en señales de actividad.

**Stack**:
- `twentyhq/twenty` (AGPL-3.0, ~45k★) — CRM con MCP Server nativo
- `openai/openai-agents-python` (MIT, ~25k★) — agente con handoff entre especialistas
- `agno-agi/agno` (MIT, ~39k★) — orquestación de swarm en alta concurrencia
- Claude (via MCP) — investigación web + redacción contextual

**Wiring**:
```
Nuevo contacto en Twenty → MCP trigger → OpenAI Agents SDK →
  Agente Investigador: busca empresa/persona en web → 
  Agente Redactor: draft email personalizado →
  Agente Seguimiento: programa tarea en Twenty vía MCP →
  Todo escrito directamente al CRM sin intervención humana
```

**Tiempo estimado**: 3–5 semanas  
**Diferenciador**: Twenty MCP nativo elimina integraciones custom frágiles

---

## P5 — Knowledge Base Corporativa (RAG + Collab)

**Propósito**: Base de conocimiento interna que responde en lenguaje natural sobre políticas, procedimientos, manuales técnicos y decisiones históricas.

**Stack**:
- `nextcloud/server` (AGPL-3.0, ~27k★) — almacenamiento docs empresa
- `FlowiseAI/Flowise` (MIT, ~51k★) — builder visual RAG + chatbot
- `langchain-ai/langchain` (MIT) — índice vectorial sobre documentos Nextcloud
- Qdrant / pgvector — vector store self-hosted
- Ollama (on-prem) o Claude — LLM según restricciones de datos

**Wiring**:
```
Docs Nextcloud → Flowise indexer (chunking + embedding) → Qdrant →
  Empleado pregunta en chatbot → Flowise RAG → 
  Claude/Ollama responde con fuentes citadas → 
  Flowise guarda historial para analytics uso
```

**Tiempo estimado**: 3–4 semanas  
**On-prem**: 100% self-hosted para clientes con datos sensibles (legal, salud, gobierno)

---

## P6 — Multi-Agente Financiero (Reporting + Forecast)

**Propósito**: Automatizar el cierre financiero mensual: conciliaciones, detección de anomalías, generación de reportes narrativos para directivos.

**Stack**:
- `frappe/erpnext` (GPL-3.0, ~36k★) — datos contables fuente
- `langchain-ai/langgraph` (MIT, ~24k★) — pipeline stateful: extrae → analiza → narra
- `crewAIInc/crewAI` (MIT, ~44k★) — roles: CFO Agent, Auditor Agent, Narrator Agent
- `pydantic/pydantic-ai` (MIT) — schemas para datos financieros (sin errores de tipo)
- Claude (claude-sonnet-5) — narración ejecutiva + detección anomalías

**Wiring**:
```
ERPNext cierre mes → LangGraph extrae cuentas + movimientos →
  CrewAI CFO Agent: análisis varianza vs presupuesto →
  CrewAI Auditor Agent: detecta anomalías (regla 3σ + ML) →
  CrewAI Narrator: redacta MD ejecutivo con gráficos →
  Output: PDF + Slack summary → aprobación CFO (HITL)
```

**Tiempo estimado**: 8–14 semanas  
**ROI esperado**: cierre financiero 30–50% más rápido (dato IDC 2026)

---

## P7 — Microsoft Ecosystem Agent Mesh

**Propósito**: Para clientes 100% Microsoft: agente enterprise que orquesta Copilot Studio, MAF 1.0, Azure AI Foundry y sistemas existentes.

**Stack**:
- Microsoft Agent Framework 1.0 (MAF, MIT, base AutoGen) — orquestación
- Azure AI Foundry — runtime managed + monitoreo
- A2A Protocol (Linux Foundation) — coordinación entre agentes de distintos vendors
- MCP Servers para Dynamics 365, SharePoint, Teams
- `microsoft/autogen` (~54k★) — agentes custom si se necesita
- Claude / GPT-4o / Phi-4 — según task

**Wiring**:
```
Teams bot → MAF 1.0 router →
  A2A: coordina con agente externo (proveedor, cliente) →
  MCP: lee/escribe en Dynamics 365 / SharePoint →
  Sub-agentes MAF: Finance Agent, HR Agent, Supply Chain Agent →
  Azure AI Foundry: logging, tracing, cost control →
  Respuesta final en Teams con HITL si decisión > umbral
```

**Tiempo estimado**: 10–16 semanas  
**Para**: clientes Fortune 500 con Azure como cloud primario

---

## P8 — Onboarding Agente de Empleados

**Propósito**: Automatizar el proceso completo de onboarding: creación de cuentas, asignación de equipos, plan de capacitación, buddy assignment, check-ins.

**Stack**:
- `mattermost/mattermost` (AGPL-3.0, ~30k★) — canal onboarding + bot
- `opf/openproject` (GPL-3.0, ~9k★) — tareas y milestones de onboarding
- `crewAIInc/crewAI` (MIT) — roles: HR Coordinator, IT Provisioner, Buddy Matcher
- `n8n-io/n8n` — integraciones: AD, email, Google Workspace, sistemas RRHH
- Claude — personalización de mensajes y materiales de bienvenida

**Wiring**:
```
HRIS nuevo empleado → n8n trigger → CrewAI HR Coordinator →
  IT Provisioner: crea cuentas AD + email + accesos →
  Buddy Matcher: sugiere buddy basado en skills/equipo →
  Mattermost: mensaje bienvenida + channel #onboarding-{nombre} →
  OpenProject: crea plan 90 días con milestones →
  Check-in automático día 30/60/90 con Claude-drafted preguntas
```

**Tiempo estimado**: 4–6 semanas  
**LATAM**: adaptable a requisitos legales laborales de cada país
