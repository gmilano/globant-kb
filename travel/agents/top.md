# 🎯 Agentes AI — Travel & Hospitality

> Agentes y herramientas AI open source para la industria. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-11

## Agentes y herramientas destacadas

| Nombre | Licencia | Descripción | Stars |
|--------|----------|-------------|-------|
| [azure-ai-travel-agents](https://github.com/Azure-Samples/azure-ai-travel-agents) | MIT | Flagship enterprise reference app: MCP + LangChain.js + LlamaIndex.TS + Microsoft Agent Framework. Múltiples agentes MCP (Python, Node.js, Java, .NET) para consultas de clientes, recomendaciones de destino e itinerarios. | ~450 |
| [Multi-Agent-AI-Travel-Advisor](https://github.com/kbhujbal/Multi-Agent-AI-Travel-Advisor) | MIT | 7 agentes especializados (vuelos, hoteles, actividades, cultura, clima, presupuesto, reporte), RAG + tool-calling. Construido con CrewAI + LangChain. Genera itinerarios personalizados completos. | ~53 |
| [Production-Ready-TripPlanner-Multi-AI-Agents-Project](https://github.com/shaheennabi/Production-Ready-TripPlanner-Multi-AI-Agents-Project) | MIT | TripPlanner multi-agente con TaskFlowAI, Python, AWS. Agentes para investigación web, planificación, reporting, búsqueda de vuelos, clima e imágenes. Arquitectura modular production-ready. | ~74 |
| [mcp_travelassistant](https://github.com/skarlekar/mcp_travelassistant) | MIT | Suite de MCP servers que permite a un LLM orquestar servicios especializados: itinerarios, vuelos, alojamiento, eventos locales, condiciones climáticas y gestión de presupuesto. | ~35 |
| [langgraph-template-travel-planner](https://github.com/datarootsio/langgraph-template-travel-planner) | MIT | Template LangGraph con human-in-the-loop, routing condicional, observabilidad Langfuse y Reflex UI. Ejemplo canónico de agente de viajes con patrones de producción. | ~40 |
| [wanderlog-mcp](https://github.com/shaikhspeare/wanderlog-mcp) | MIT | MCP server para Wanderlog — crea y edita itinerarios de viaje por conversación. Integración con el ecosistema MCP, autenticación OAuth, gestión de presupuesto y gastos. | ~33 |
| [mcp-travel-assistant](https://github.com/abhinavmathur-atlan/mcp-travel-assistant) | MIT | MCP Travel Concierge Server — planificación con integración Google Travel + Amadeus. Búsqueda de vuelos, hoteles y atracciones desde un solo servidor MCP. | ~6 |
| [AI-Trip-Planner](https://github.com/ebythomas23/AI-Trip-Planner) | MIT | App agentica LangGraph + LangChain con herramientas modulares (clima, lugares, moneda, gastos) y APIs reales. Backend FastAPI + frontend Streamlit. Planes guardados como Markdown. | ~25 |
| [langgraph-travel-agent](https://github.com/HarimxChoi/langgraph-travel-agent) | MIT | Sistema multi-agente LangGraph production-ready con orquestación paralela async. Integra Amadeus, Hotelbeds, Twilio y HubSpot. Gestión de bookings end-to-end. | ~18 |
| [AI-Travel-Agent-Advanced](https://github.com/naakaarafr/AI-Travel-Agent-Advanced) | MIT | Planificador CrewAI + Google Gemini con análisis de destino, experto local, itinerario de 7 días con presupuesto. Búsqueda web en tiempo real (clima, vuelos, hoteles, atracciones). | ~22 |

---

## Por qué estos agentes son clave para Globant

| Patrón | Agente recomendado | Razón |
|--------|-------------------|-------|
| Enterprise multi-orquestador | azure-ai-travel-agents | Soporta LangChain.js + LlamaIndex + MAF; desplegable en ACA |
| MCP gateway hotel | mcp_travelassistant + wanderlog-mcp | Protocolo MCP está convirtiéndose en estándar (Dida lanzó MCP gateway Jul 2026) |
| Itinerario completo multi-agente | Multi-Agent-AI-Travel-Advisor | 7 especialistas + RAG, listo para customizar |
| Observabilidad + HITL | langgraph-template-travel-planner | Langfuse integrado, human-in-the-loop, patrón de producción |
| Booking end-to-end | langgraph-travel-agent | Amadeus + Hotelbeds + Twilio, async paralelo |

---
*Actualizado automáticamente por el pipeline de ingest.*
