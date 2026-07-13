# 🎯 Agentes AI — Travel & Hospitality

> Agentes y herramientas AI open source para la industria. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-13 (v10)

## Agentes y herramientas destacadas

| Nombre | Licencia | Descripción | Stars |
|--------|----------|-------------|-------|
| [azure-ai-travel-agents](https://github.com/Azure-Samples/azure-ai-travel-agents) | MIT | Flagship enterprise reference app: MCP + LangChain.js + LlamaIndex.TS + Microsoft Agent Framework. Múltiples agentes MCP (Python, Node.js, Java, .NET) para consultas de clientes, recomendaciones de destino e itinerarios. Deployable en Azure Container Apps. | ~450 |
| [telivity-otaip/otaip](https://github.com/telivity-otaip/otaip) | Apache-2.0 | Open Travel AI Platform: 75 agentes especializados en 12 etapas operativas (search, pricing, booking, ticketing, settlement, hotel ops). Integraciones con APIs de proveedores reales de vuelos y hoteles. Framework domain-specific diseñado desde cero para el sector turístico. | ~25 |
| [TelivityAI/haip](https://github.com/TelivityAI/haip) | Apache-2.0 | Hotel AI Platform: PMS open-source API-first (TypeScript/NestJS) con 12 agentes AI nativos — pricing dinámico, predicción de cancelaciones, anomalías en auditoría nocturna, comunicación con huéspedes, respuestas automáticas a reseñas. Channel distribution a 450+ OTAs. ChatGPT gateway para reserva conversacional. Stripe + Keycloak + Cloudflare. | ~40 |
| [LetsFG/LetsFG](https://github.com/LetsFG/LetsFG) | MIT | Agent-native flight search & booking: 400+ aerolíneas, 200+ conectores NDC/GDS ejecutados en paralelo en la máquina del cliente. CLI + SDK + MCP Server. Precios $20-50 más baratos que OTAs como Booking.com/Kayak. Verificado: ahorro de $116 en 5 rutas vs Google Flights. | ~500 |
| [Fieldy76/Agentic-Travel-Planner](https://github.com/Fieldy76/Agentic-Travel-Planner) | MIT | Framework-free agentic workflow en Python puro + MCP. Planifica viajes y ejecuta bookings reales via Amadeus (vuelos+hoteles), Aviasales, Hotellook, RentalCars. Multi-modelo: OpenAI / Claude / Gemini intercambiables. 100% async, in-process MCP server. Actualizado mayo 2026. | ~80 |
| [MikkoParkkola/trvl](https://github.com/MikkoParkkola/trvl) | MIT | Travel MCP server + CLI en Go — binario único sin API keys. 1 herramienta MCP inteligente + 66 aliases (98.9% menos tokens). 21 proveedores: Google Flights, Google Hotels, Trivago, Airbnb, transporte europeo. Multi-leg, hidden city, redemption de puntos. Instalación en 10 clientes AI (Claude, Cursor, Codex, VS Code, Zed…). | ~120 |
| [Multi-Agent-AI-Travel-Advisor](https://github.com/kbhujbal/Multi-Agent-AI-Travel-Advisor) | MIT | 7 agentes especializados (vuelos, hoteles, actividades, cultura, clima, presupuesto, reporte), RAG + tool-calling. Construido con CrewAI + LangChain. Genera itinerarios personalizados completos con PDF final. | ~53 |
| [Production-Ready-TripPlanner-Multi-AI-Agents-Project](https://github.com/shaheennabi/Production-Ready-TripPlanner-Multi-AI-Agents-Project) | MIT | TripPlanner multi-agente con TaskFlowAI, Python, AWS. Agentes para investigación web, planificación, reporting, búsqueda de vuelos, clima e imágenes. Arquitectura modular production-ready. | ~74 |
| [mcp_travelassistant](https://github.com/skarlekar/mcp_travelassistant) | MIT | Suite de MCP servers que permite a un LLM orquestar servicios especializados: itinerarios, vuelos, alojamiento, eventos locales, condiciones climáticas y gestión de presupuesto. | ~35 |
| [langgraph-template-travel-planner](https://github.com/datarootsio/langgraph-template-travel-planner) | MIT | Template LangGraph con human-in-the-loop, routing condicional, observabilidad Langfuse y Reflex UI. Ejemplo canónico de agente de viajes con patrones de producción. | ~40 |
| [wanderlog-mcp](https://github.com/shaikhspeare/wanderlog-mcp) | MIT | MCP server para Wanderlog — crea y edita itinerarios de viaje por conversación. Integración con el ecosistema MCP, autenticación OAuth, gestión de presupuesto y gastos. | ~33 |
| [langgraph-travel-agent](https://github.com/HarimxChoi/langgraph-travel-agent) | MIT | Sistema multi-agente LangGraph production-ready con orquestación paralela async. Integra Amadeus, Hotelbeds, Twilio y HubSpot. Gestión de bookings end-to-end. | ~18 |

---

## Por qué estos agentes son clave para Globant

| Patrón | Agente recomendado | Razón |
|--------|-------------------|-------|
| Enterprise multi-orquestador | azure-ai-travel-agents | Soporta LangChain.js + LlamaIndex + MAF; desplegable en ACA |
| OTA / travel ops completo | OTAIP | 75 agentes en 12 etapas, integraciones supplier reales, Apache-2.0 |
| Hotel PMS con AI de serie | HAIP | PMS completo con 12 agentes AI nativos, channel 450+ OTAs, Apache-2.0 |
| Vuelos sin markup OTA | LetsFG | MCP Server + SDK, 400+ aerolíneas, $20-50 más barato que OTAs |
| Search multi-proveedor sin API keys | trvl | Go binary, 21 providers, 66 capabilities, 10 clientes AI soportados |
| Booking con APIs reales (multi-modelo) | Agentic-Travel-Planner | Amadeus + Aviasales + Hotellook, Claude/OpenAI/Gemini intercambiables |
| MCP gateway hotel | mcp_travelassistant + wanderlog-mcp | MCP se está convirtiendo en el estándar de travel tech (jul 2026) |
| Itinerario completo multi-agente | Multi-Agent-AI-Travel-Advisor | 7 especialistas + RAG, listo para customizar |
| Observabilidad + HITL | langgraph-template-travel-planner | Langfuse integrado, human-in-the-loop, patrón de producción |
| Booking end-to-end con CRM | langgraph-travel-agent | Amadeus + Hotelbeds + Twilio + HubSpot, async paralelo |

---
*Actualizado automáticamente por el pipeline de ingest.*
