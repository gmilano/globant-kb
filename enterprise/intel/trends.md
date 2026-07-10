# 📡 Tendencias — Enterprise AI

> Tendencias con evidencia real. Cada trend tiene un dato concreto y una implicación para Globant.
> Última actualización: 2026-07-10 v4

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

## Trend 4: EU AI Act enforcement total Aug 2, 2026 (23 días)
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

## Trend 13: Enterprise Coding Agents — Control Plane emergente (May–Jul 2026)
**Evidencia:** OpenHands lanzó Enterprise Control Plane (May 6, 2026): 65k ★, RBAC, cost guardrails, audit trails, Docker/Kubernetes. El paper arxiv:2511.03690 (Software Agent SDK) demuestra reducción en system-attributable failures vs v0 con overhead mínimo. SWE-bench 72% (Jun 2026). Claude Mythos 5: 95.5% (Jul 6, 2026).

**Impacto:** Los coding agents ya no son prototipos. Hay ahora un path production-ready: OpenHands Enterprise + LangGraph + Claude. Casos de uso enterprise con ROI medible: legacy migration ($300k-$2M), automated test generation (-40% tiempo QA), code review continuo (-30% bugs en PR).

**Posicionamiento Globant:** Ofrecer "AI-Accelerated Software Delivery" — Globant construye y opera la infraestructura de coding agents para el cliente. Diferenciador único vs Big 4 consulting que solo habla de agentes pero no opera.

---

## Trend 14: 60% Governance Gap — El próximo campo de batalla enterprise (Jul 2026)
**Evidencia:** Agentic AI Institute (Jul 2026): 72% enterprises en producción con agentes, pero solo 12% tienen governance adecuado. Gap del 60%. EU AI Act enforcement Aug 2 (24 días). McKinsey: $2.6-$4.4T valor de AI, pero 40% proyectos cancelados por governance insuficiente (Gartner 2027 forecast).

**Impacto:** El governance gap es la mayor oportunidad de servicios de 2026-2027. Las empresas que lanzaron agentes en 2025 ahora necesitan urgentemente: data lineage, decision audit trails, policy enforcement, risk classification, HITL workflows. Stack OSS existe: OpenMetadata + Langfuse + OPA + LangGraph.

**Posicionamiento Globant:** "Governance-First AI Studio" — el player que construye agentes Y los gobierna. Diferenciador frente a firmas que solo hacen el deployment inicial sin considerar lifecycle governance.

---

## Trend 15: CodeAct — el patrón de ejecución de agentes que reemplaza tool-calling clásico (Jun 2026)
**Evidencia:** Microsoft Agent Framework BUILD 2026 lanzó CodeAct: en lugar de que el LLM llame una tool, espere resultado, llame otra — el modelo escribe un programa Python que llama TODAS las tools de una vez via `call_tool(...)`. Se ejecuta en un Hyperlight micro-VM (overhead <5ms, aislamiento de contenedor). Una sola llamada LLM → múltiples tool calls paralelos → resultado consolidado.

**Impacto:** Reducción dramática de round-trips LLM en agentes multi-step. Para enterprise workflows complejos (consultar CRM + ERP + base de datos + generar reporte), CodeAct pasa de N llamadas a 1. Latencia y costo se reducen proporcionalmente. El patrón es reproducible en cualquier framework con sandbox Python.

**Analogía:** CodeAct en MAF es para agentes lo que SQL fue para bases de datos: en lugar de loops imperativo sobre cada elemento, declaras el objetivo y el sistema lo ejecuta de forma eficiente.

**Adopción esperada:** MAF es el primero en integrar el patrón; LangGraph y CrewAI lo adoptarán en H2 2026.

---

## Trend 16: Hosted Agent Runtimes — producción enterprise sin ops overhead (Jul 2026)
**Evidencia:** Microsoft Foundry Agent Service GA (expected Jul 2026): agentes como containers, managed infrastructure, scale-to-zero, filesystem persistente entre scale-downs, identity built-in, observabilidad incluida. El modelo: `docker push agent-image → deploying → available` sin gestionar K8s.

**Impacto:** El "last mile" de production para agentes enterprise dejó de ser el problema difícil. Antes: "¿cómo orquesto, escalo, persisto estado, gestiono identidad?" — todo custom. Ahora: el runtime lo resuelve. Esto libera a Globant para enfocarse en la lógica del agente (el valor diferenciador) en lugar de la infraestructura.

**Señal complementaria:** AWS Bedrock Agents, Google Vertex AI Agents ya ofrecen hosting managed. El mercado converge: cada cloud major tiene su managed agent runtime. El diferenciador de Globant es la lógica de negocio + integración con sistemas legacy, no el runtime.

**Posicionamiento:** "Hosted runtime + Globant implementation" = time-to-production 60% más rápido que custom K8s.

---

## Trend 17: Agentes en canales de mensajería como interfaz enterprise (2026)
**Evidencia:** OpenClaw (MIT, 210k+ ★) creció de 9k a 210k+ ★ en pocas semanas — el crecimiento más rápido en historia de GitHub. El concepto: agente que vive donde el usuario ya pasa tiempo (WhatsApp, Teams, Slack, Telegram, iMessage). Anthropic Claude en Slack Teams Copilot. n8n 2.0 integra directamente Slack/Teams como trigger nodes con AI.

**Impacto:** La interfaz enterprise del futuro no es una app nueva — es el canal de mensajería existente. Los usuarios no aprenden nuevas UIs; el agente llega a donde ya están. Para Globant: en lugar de construir una app web para el agente, construir un bot en Microsoft Teams o WhatsApp Business que actúa como interfaz del agente enterprise.

**Patrón arquitectónico:** Teams/Slack webhook → n8n trigger → LangGraph agent → MCP tools (ERP/CRM) → respuesta en el canal.

**Deal size típico:** $30k–$120k (menor que una app custom; ROI más rápido por adopción inmediata).

---

## Trend 18: ROI accountability — de proyectos a outcomes medibles (2026)
**Evidencia:** Solo 41% de rollouts de agentes AI cruzan ROI positivo en 12 meses. 40% de proyectos AI serán cancelados para 2027 (Gartner). 39% de organizaciones reportan impacto EBIT medible. El gap: 171% ROI proyectado vs 39% que lo miden realmente. McKinsey: el problema no es el modelo — es la implementación sin métricas.

**Impacto para Globant:** El mercado está madurando de "implementemos AI agents" a "prueba que genera ROI". Los clientes van a pedir SLAs de negocio, no solo técnicos. Diferenciador: Globant entrega agents WITH instrumentation desde día 1 — Langfuse traces vinculados a KPIs de negocio (tiempo de resolución, costo por transacción, revenue generado).

**Stack "ROI-visible":** LangGraph (workflow) + Langfuse (traces) + Superset dashboard (KPIs) + OPA (governance). Cada agent call queda trazada con el outcome de negocio asociado.

**Deal evolution:** Q1 2026: "construye el agente" ($100k). Q3 2026: "demuestra el ROI" ($50k adicional). 2027: "escala a producción si ROI confirmado" ($300k+).

---

## Trend 19: Sovereign AI — Dato de Origen del Vendor como Criterio de Compra (Jul 2026)
**Evidencia:** Deloitte State of AI Enterprise 2026: **77% de las empresas** incluyen el país de origen del vendor AI en sus criterios de selección. Gartner Predicts 2026: >75% de empresas europeas y Medio Oriente geopatriarán workloads AI antes de 2030 (desde <5% actual). arXiv 2026: self-hosted inference = $0.001–$0.04/M tokens vs cloud API $2.50–$15/M tokens (75x–15,000x más económico a escala).

**Impacto:** El Sovereign AI no es solo un trend de seguridad — tiene un componente económico poderoso. A partir de ~$50k/mes de gasto en API, la ecuación de self-hosted se vuelve racional. Reguladores (LGPD, EU AI Act, DORA) son el catalizador legal; la economía es el catalizador de adopción masiva.

**Stack Globant "Sovereign Enterprise AI":**
- **Inferencia local:** Ollama (MIT) + LiteLLM proxy (MIT) — modelos Llama/Mistral/Phi en HW propio
- **Workflow:** Dify self-hosted (Apache-2.0) + LangGraph (MIT)
- **Observabilidad:** Langfuse self-hosted (MIT) — Art. 12 EU AI Act
- **AuthN/AuthZ:** Keycloak (Apache-2.0)
- **Data catalog:** OpenMetadata (Apache-2.0)

**Deal size típico:** $150k–$600k (on-premise) | $80k–$300k (cloud privado del cliente)

---

## Trend 20: Vertical-First AI — El mercado premia especialización sobre genericidad (2026)
**Evidencia:** Tech Radar Jul 2026: tools de AI específicas de industria (healthcare, finance, engineering, education, security) están ganando deals contra tools genéricas. Deloitte 2026: enterprises donde liderazgo senior moldea governance AI activamente logran "significativamente mayor valor de negocio". LATAM: 95% pilotando AI pero <25% a escala industrial — el gap NO es la tecnología, es la falta de especialización.

**Impacto:** Los clientes enterprise quieren "agente para mi industria" configurado con sus workflows, compliance y terminología, no un framework que deben customizar ellos. Este shift favorece a firmas como Globant que ya tienen verticales construidas (financial services, healthcare, retail, automotive).

**Señal adicional (Jul 8 2026):** Akeneo lanzó **Agentic Ziggy** — capa agéntica dentro de su Product Cloud (PIM líder de mercado) con specialist agents para data modeling, schema mapping, enrichment y quality checks. Señal de que cada plataforma SaaS vertical está añadiendo orquestación agéntica propia — y necesita socios de implementación.

**Posicionamiento Globant:** "AI agents para TU industria" con aceleradores pre-configurados por vertical. No vender "un framework", sino "el agente de ventas para retail LATAM" o "el agente de compliance para banca regulada en Brasil". Los aceleradores verticales permiten go-to-market 40% más rápido.

**KPI a rastrear:** % de propuestas Globant que llevan el nombre de la vertical del cliente en el título (vs "AI agent project"). Este KPI mide diferenciación efectiva.

---

## Timeline de señales clave 2026

| Fecha | Evento | Impacto |
|-------|--------|--------|
| 2026-01 | n8n 2.0: 70+ AI nodes + MCP nativo | Workflow + AI convergence |
| 2026-04-02 | Microsoft Agent Framework 1.0 GA | Framework consolidation |
| 2026-04 | Dify $30M + 138k ★ | Visual builder maturation |
| 2026-04 | Google Gemini CLI GA (Apache-2.0, 80k+ ★) | Open-source CLI agent |
| 2026-05-06 | OpenHands Enterprise Control Plane GA | Coding agents production-ready |
| 2026-06 | MAF BUILD 2026: CodeAct + Hosted Agents | Agent runtime maturation |
| 2026-06-22 | LlamaIndex Workflows 1.0 | Ecosystem expansion |
| 2026-06-23 | Pydantic AI v2 | Type-safe agents Python |
| 2026-06-25 | AI agents dominate GitHub trending | Mass adoption signal |
| 2026-07-01 | Gartner: $234B SaaS at risk from agentic AI | Enterprise disruption signal |
| 2026-07-06 | Claude Fable 5: 95.5% SWE-bench | Coding agents frontier |
| 2026-07-07 | OpenClaw: 210k+ ★ (fastest-growing repo ever) | Agent-on-messaging explosion |
| 2026-07-09 | Agentic AI Institute: 72% en producción; 60% governance gap | Compliance urgency |
| 2026-07-10 | TODAY: 23 días para EU AI Act enforcement. Deloitte: 20% talento preparado. Sovereign AI 77% orgs | Talent gap + Sovereignty |
| 2026-early Jul | MAF Hosted Agents GA (Foundry Agent Service) | Managed agent runtime |
| 2026-08-02 | EU AI Act full enforcement | Compliance deadline |
| 2026-Q4 | Gartner target: 40% enterprise apps con AI agents | Adoption milestone |
| 2027 | Agentic arbitrage impact visible en SaaS revenues | Market disruption |

---
*Actualizado por pipeline de ingest. Ver `intel/market.md` para datos de mercado.*
