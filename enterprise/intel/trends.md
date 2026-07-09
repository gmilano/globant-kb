# 📡 Tendencias — Enterprise AI

> Tendencias con evidencia real. Cada trend tiene un dato concreto y una implicación para Globant.
> Última actualización: 2026-07-08

---

## Trend 1: Agentic Arbitrage — $234B en SaaS en riesgo (Gartner Jul 2026)
**Evidencia:** Gartner (Jul 1, 2026): hasta $234B en enterprise software SaaS spending expuesto a "agentic arbitrage" antes de 2030. Los agentes AI completan tareas cruzando sistemas sin interactuar con interfaces, rompiendo el modelo seat-based licensing.

**Impacto:** SAP, Salesforce, ServiceNow van a perder ingresos de licencias. Las empresas que adopten agentes pueden reducir costos de SaaS significativamente. Oportunidad: vender "la capa agentic" que reemplaza licencias.

**Señal de monitoreo:** [Gartner Newsroom](https://www.gartner.com/en/newsroom/press-releases/2026-07-01-gartner-says-us-dollars-234-billion-in-enterprise-application-software-spend-is-at-risk-from-agentic-artificial-intelligence)

---

## Trend 2: Consolidación de frameworks — Microsoft Agent Framework 1.0 (Apr 2026)
**Evidencia:** Microsoft lanzó MAF 1.0 (Apr 3, 2026): AutoGen + Semantic Kernel unificados. Repositorio AG2 (ag2ai/ag2, Apache-2.0, 22k ★). Ahora hay 3 tier-1 frameworks: LangGraph (open-source leader), MAF (Microsoft enterprise), CrewAI (accessible mid-tier).

**Impacto:** Fin de la fragmentación AutoGen vs SK. Clientes .NET/Azure tienen ahora stack enterprise completo open-source. LangGraph consolida liderazgo en producción cross-cloud.

**Tech watch:** LangGraph v1.1 Jun 2026 (DeltaChannel, streaming v2), CrewAI v1.14 Jun 2026 (pluggable backends).

---

## Trend 3: Visual builders dominan el tier medio (2026)
**Evidencia:** Langflow 146k ★, Dify 138k ★, Flowise 40k ★. CB Insights: >300k ★ combinados, mayoría del crecimiento últimos 18 meses. Dify $30M raised 2026. IBM adquiere Langflow via DataStax.

**Impacto:** Domain experts (ops managers, analistas financieros, RRHH) construyen agentes sin ML engineers. Esto democratiza pero también baja el valor percibido de "construir un agente". Globant debe subir la escalera hacia implementaciones complejas, gobernanza y producción.

**Señal clave:** n8n 2.0 (Jan 2026) — 70+ AI nodes, MCP nativo. El workflow automation y el agent builder convergen.

---

## Trend 4: EU AI Act enforcement total Aug 2, 2026 (25 días)
**Evidencia:** EU AI Act entra en vigencia plena el 2 de agosto de 2026. Sistemas high-risk (Annex III: empleos, crédito, salud, educación, biometría, infraestructura crítica) requieren: evaluación de conformidad, documentación técnica, gestión de riesgos continua, registro EU.

**Impacto:** Clientes europeos (y LATAM con operaciones en Europa) necesitan governance stack urgente. OpenMetadata + Langfuse + OPA = el stack OSS preferido para compliance. Ventana de proyectos urgentes en los próximos 25 días.

**Stack compliance:** OpenMetadata (data catalog) + Langfuse (audit trail LLM) + OPA (policy enforcement) + LangGraph (workflow con HITL).

---

## Trend 5: MCP como estándar enterprise AI (2026)
**Evidencia:** Model Context Protocol: 5000+ servers en ecosistema (Jul 2026 RC). 97M descargas/mes (modelcontextprotocol/servers MIT, 18k ★). Linux Foundation adoptó MCP. n8n 2.0 integra MCP nativo. Dify + Langflow adoptaron MCP 2026. Zapier MCP con 9000+ apps.

**Impacto:** MCP se convierte en el "USB-C de la IA empresarial" — estándar de conexión entre agentes y herramientas enterprise. Cualquier sistema con MCP server puede ser orquestado por Claude, GPT-4, Gemini. ERPNext, Odoo, OpenMetadata ya tienen MCP servers.

**Posicionamiento Globant:** Construir MCP servers para sistemas ERP/CRM legacy de clientes = diferenciador técnico de alto valor.

---

## Trend 6: HITL (Human-in-the-Loop) mandatorio en enterprise (2026)
**Evidencia:** En 2026, n8n, Dify, Flowise, LangFlow y Langchain todos añadieron soporte nativo HITL. EU AI Act Annex III exige aprobación humana para decisiones de alto riesgo. LangGraph añadió interrupt() y checkpointing en v1.0.

**Impacto:** Agentes en producción enterprise no corren en full-autopilot — tienen puntos de aprobación humana, especialmente en: contratación, crédito, diagnóstico médico, compliance. Los patrones de orquestación deben diseñarse con HITL desde el inicio.

**Patrón arquitectónico:** LangGraph interrupt() → Slack/Teams webhook → aprobación humana → resume().

---

## Trend 7: LLM Observabilidad — de nice-to-have a mandatoria (2026)
**Evidencia:** Langfuse 28k ★ (MIT), Opik 8.5k ★ (Apache-2.0), Arize Phoenix 7.2k ★. EU AI Act requiere audit trails. 57% organizations tienen AI agents en producción — sin observabilidad, es "black box" no auditable.

**Impacto:** Todo deployment enterprise en producción debe incluir LLM observabilidad desde día 1. Langfuse self-hosted es el estándar OSS: Docker Compose listo, integración con LangChain/Claude/OpenAI nativa.

**Costo omitirlo:** Imposibilidad de compliance EU AI Act + ausencia de diagnóstico de fallos en producción.

---

## Trend 8: Coding agents en producción enterprise (2026)
**Evidencia:** OpenHands 70k ★, 72% SWE-bench Verified (Jun 2026). Claude Mythos 5 alcanzó 95.5% SWE-bench (Jul 6, 2026). OpenHands Software Agent SDK (MIT) lanzado para production deployments. Claude Code mandatory hiring requirement en BEON.tech.

**Impacto:** Casos de uso enterprise: legacy migration (COBOL→Python, SAP→cloud), code review automatizado, test generation, refactoring. Reducción 30–50% en tiempo de desarrollo en proyectos piloto. Globant puede ofrecer "AI-accelerated software delivery" como servicio diferenciado.

**Benchmark:** SWE-bench Verified evolución: 2024 ~20% → Jun 2026 72% (OpenHands) → Jul 2026 95.5% (Claude Mythos 5).

---

## Trend 9: Hyperautomation enterprise — workflow + agent convergen (2026)
**Evidencia:** n8n 2.0 (Jan 2026) unifica workflow automation + AI agents. 57% enterprises ya tienen agentes en production workflows. Deloitte Tech Trends 2026: "agentic AI strategy" como prioridad #1. Gartner predice que 40% enterprise apps tendrán agents para fin 2026.

**Impacto:** El mercado de automation (RPA, BPM) se está comiendo el mercado de AI agents, y viceversa. Las plataformas de hyperautomation (n8n, Make.com) añaden AI; los frameworks de agentes añaden workflow. Clientes preguntan: "¿debo usar RPA o AI agents?" — la respuesta es: "ambos en capas".

**Arquitectura ganadora:** RPA/automation (n8n) para tareas estructuradas → Agentes AI (LangGraph/CrewAI) para tareas semiestructuradas y razonamiento.

---

## Trend 10: LATAM como next wave enterprise AI (2026-2028)
**Evidencia:** LATAM AI market $40.5B (2026) → $504.7B (2034) CAGR 37.07%. 47% enterprise deployment rate. 75% business leaders esperan agentes autónomos para fin 2026. 150k posiciones ML/AI shortage en LATAM.

**Impacto:** LATAM está 18–24 meses detrás de US/EU en adopción enterprise AI — ventana de oportunidad. Brasil (LGPD) y Chile (Política AI) son los más maduros regulatoriamente. México tiene el mayor mercado sin regulación (riesgo pero también agilidad).

**Brecha clave Globant:** La mayoría de frameworks y soluciones enterprise AI están en inglés, sin adaptación para regulación local ni integración con sistemas ERP/CRM locales (Tango, TOTVS, iDempiere). Globant puede ser el puente.

---

## Trend 11: SLMs (Small Language Models) para enterprise edge (2026)
**Evidencia:** Microsoft Phi-4 (14B), Mistral 7B, Llama 3.2 (1B/3B). Beneficios: 10–30x más económicos que GPT-4/Claude para tareas simples, self-hosted para LGPD/compliance, latencia <100ms edge. Khan Academy + Phi-3 para tutoring offline.

**Impacto enterprise:** Clasificación de tickets, extracción de datos de documentos, routing de workflows — estas tareas no necesitan frontier models. Stack recomendado: Haiku/Phi-4 para tasks simples, Claude Sonnet para reasoning, Claude Sonnet 5/Opus para tasks complejos.

**Ahorro estimado:** 60–80% reducción en costos de inferencia usando SLM/small models para tareas simples + frontier model para reasoning.

---

## Trend 12: Agentic AI governance como disciplina emergente (2026)
**Evidencia:** 40% de proyectos AI enterprise serán cancelados para 2027 por falta de governance (Gartner). EU AI Act Annex III activo. OpenMetadata + DataHub se posicionan como "AI system of record". OPA (Open Policy Agent, CNCF) para policy enforcement en pipelines agentic.

**Impacto:** No es suficiente desplegar agentes — hay que gobernarlos: qué datos acceden, qué acciones pueden ejecutar, cómo se auditan las decisiones. El "AI Control Plane" emerge como capa mandatoria en enterprise deployments.

**Stack governance:** OpenMetadata (catalog) + Langfuse (traces) + OPA (policies) + LangGraph (checkpointing/HITL) + Keycloak (AuthN/AuthZ).

---

## Timeline de señales clave 2026

| Fecha | Evento | Impacto |
|-------|--------|---------|
| 2026-01 | n8n 2.0: 70+ AI nodes + MCP nativo | Workflow + AI convergence |
| 2026-04-03 | Microsoft Agent Framework 1.0 GA | Framework consolidation |
| 2026-04 | Dify $30M + 138k ★ | Visual builder maduration |
| 2026-06-22 | LlamaIndex Workflows 1.0 | Ecosystem expansion |
| 2026-06-23 | Pydantic AI v2 | Type-safe agents Python |
| 2026-06-25 | AI agents dominate GitHub trending | Mass adoption signal |
| 2026-07-01 | Gartner: $234B SaaS at risk | Enterprise disruption signal |
| 2026-07-06 | Claude Mythos 5: 95.5% SWE-bench | Coding agents frontier |
| 2026-07-08 | TODAY: 25 días para EU AI Act enforcement | Compliance urgency |
| 2026-08-02 | EU AI Act full enforcement | Compliance deadline |
| 2026-Q4 | Gartner target: 40% enterprise apps con AI agents | Adoption milestone |
| 2027 | Agentic arbitrage impact visible en SaaS revenues | Market disruption |

---
*Actualizado por pipeline de ingest. Ver `intel/market.md` para datos de mercado.*
