# 🎯 Agentes AI — Travel & Hospitality

> Agentes y herramientas AI open source para la industria. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-09 (v6 — era MCP travel, trvl, SOFIA, LATAM Airlines)

## Agentes y herramientas destacadas

| Nombre | Licencia | Stars | Descripción |
|--------|----------|-------|-------------|
| [OpenTripPlanner](https://github.com/opentripplanner/OpenTripPlanner) | LGPL-2.1 | 5.0k+ | Multimodal trip planner: transit + bike + walk + rideshare. Consumes GTFS + OpenStreetMap. GraphQL API. v2.9.0 March 2026 (Java 25). Base para cualquier routing agent. |
| [trvl](https://github.com/MikkoParkkola/trvl) | MIT | ~800 | AI Travel Agent MCP: Google Flights + Hotels + Airbnb + Booking.com + Hostelworld + Ferryhopper + ground transport en una sola herramienta. 65 comandos CLI, 43 MCP tools expuestos como 1 router inteligente (98.9% menos tokens: 378 vs 33,500). Go binary, sin API keys, free. Perfil en ~/.trvl/preferences.json. ⭐ NUEVO v6 |
| [langgraph-travel-agent](https://github.com/HarimxChoi/langgraph-travel-agent) | MIT | ~200 | Production-ready LangGraph multi-agent system. Async parallel orchestration: Amadeus (flights), Hotelbeds (hotels), Twilio (notifications), HubSpot (CRM). El patrón de referencia para agentic booking. |
| [mcp_travelassistant](https://github.com/skarlekar/mcp_travelassistant) | MIT | ~150 | Suite de MCP servers especializados: vuelos, alojamiento, eventos locales, clima, presupuesto multimoneda. Permite que Claude orqueste múltiples proveedores de viaje en un solo itinerario. ⭐ NUEVO v6 |
| [azure-ai-travel-agents](https://github.com/Azure-Samples/azure-ai-travel-agents) | MIT | ~600 | Enterprise sample: LangChain.js + LlamaIndex.TS + Microsoft Agent Framework (MAF) + MCP. Multi-agent: flight, hotel, itinerary, customer query. Deployable en Azure Container Apps. Microsoft oficial. ⭐ NUEVO v6 |
| [openai-agents-travel-graph](https://github.com/BjornMelin/openai-agents-travel-graph) | MIT | ~150 | OpenAI Agents SDK + LangGraph + Stagehand/Playwright browser automation + Supabase + Firecrawl/Tavily. Búsqueda web real + booking form automation. |
| [fli](https://github.com/punitarani/fli) | MIT | ~300 | Google Flights MCP server + CLI + Python library. Búsqueda de vuelos directamente desde Claude o terminal. Sin API key. ⭐ NUEVO v6 |
| [Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) | MIT | ~80 | MCP server para 2M+ hoteles vía DIDA (3er mayor B2B travel). Búsqueda por ubicación, fecha, stars, capacidad, tags. Real-time inventory pricing. Free, sin límite de llamadas. |
| [AI-Travel-Agent-Advanced](https://github.com/naakaarafr/AI-Travel-Agent-Advanced) | MIT | ~120 | CrewAI + Gemini. Real-time web search: weather, flights, hotels, atracciones. CLI con itinerarios detallados 7 días + presupuestos. |
| [Ctrip-Style-AI-Travel-Assistant](https://github.com/Haohao-end/Ctrip-Style-AI-Travel-Assistant) | MIT | ~90 | LangChain + LangGraph stateful multi-agent: flight booking, hotel reservations, car rentals, tours. Task delegation + human-in-the-loop verification. Inspirado en Ctrip/Trip.com. |

---

## Por qué estos 10

- **trvl**: Un solo MCP tool = 43 capacidades + 65 comandos CLI. Cubre Google Flights/Hotels, Airbnb, Booking.com, ferries, trenes europeos, lounges. 98.9% ahorro de tokens vs exposición individual. El travel MCP más completo disponible. No requiere ninguna API key.
- **OpenTripPlanner**: único router multimodal open-source maduro (LGPL, usado por Helsinki, NYC, Bogotá, etc.). Base obligatoria para cualquier app de movilidad.
- **langgraph-travel-agent**: patrón de referencia para integrar APIs reales (Amadeus, Hotelbeds) con LangGraph stateful. El más productivo para POC → producción.
- **mcp_travelassistant**: suite MCP completa para orquestación. El patrón "hub-and-spoke" para travel agents.
- **azure-ai-travel-agents**: el ejemplo enterprise oficial de Microsoft. Útil para clientes Azure-first.
- **fli**: la forma más directa de exponer Google Flights a Claude. Setup en < 5 minutos.
- **Dida-hotel-MCP-CN**: MCP server con 2M+ hoteles gratis = valor inmediato. Plug-in para cualquier Claude/GPT agent.
- **Ctrip-Style**: referencia para human-in-the-loop en booking real, con permission control.

---

## Comparativa de MCP servers de travel

| MCP Server | Cobertura | API Key requerida | Licencia | Actualizacion |
|------------|-----------|-------------------|----------|---------------|
| trvl | Google Flights + Hotels + Airbnb + Booking + Ferries + Trenes EU | No | MIT | Jul 2026 |
| DIDA Hotel MCP | 2M+ hoteles B2B globales | No (rate limit generoso) | MIT | Jul 2026 |
| fli | Google Flights (búsqueda) | No | MIT | 2026 |
| hotels_mcp_server | Booking.com via API | Sí (Booking partner) | MIT | 2026 |
| mcp_travelassistant | Vuelos + hotel + eventos + clima | Sí (varias) | MIT | 2026 |
| Sabre Mosaic MCP | 420+ aerolíneas, 2M hoteles | Sí (Sabre partner) | Commercial | May 2026 |

---
*Actualizado automáticamente por el pipeline de ingest.*
