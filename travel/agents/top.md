# 🎯 Agentes AI — Travel & Hospitality

> Agentes y herramientas AI open source para la industria. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-09 (v5 — agentic booking era, MCP hotel servers)

## Agentes y herramientas destacadas

| Nombre | Licencia | Stars | Descripción |
|--------|----------|-------|-------------|
| [OpenTripPlanner](https://github.com/opentripplanner/OpenTripPlanner) | LGPL-2.1 | 5.0k+ | Multimodal trip planner: transit + bike + walk + rideshare. Consumes GTFS + OpenStreetMap. GraphQL API. v2.9.0 March 2026 (Java 25). Base para cualquier routing agent. |
| [langgraph-travel-agent](https://github.com/HarimxChoi/langgraph-travel-agent) | MIT | ~200 | Production-ready LangGraph multi-agent system. Async parallel orchestration: Amadeus (flights), Hotelbeds (hotels), Twilio (notifications), HubSpot (CRM). El patrón de referencia para agentic booking. |
| [openai-agents-travel-graph](https://github.com/BjornMelin/openai-agents-travel-graph) | MIT | ~150 | OpenAI Agents SDK + LangGraph + Stagehand/Playwright browser automation + Supabase + Firecrawl/Tavily. Búsqueda web real + booking form automation. |
| [Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) | MIT | ~80 | MCP server para 2M+ hoteles vía DIDA (3er mayor B2B travel). Búsqueda por ubicación, fecha, stars, capacidad, tags. Real-time inventory pricing. Free, sin límite de llamadas. |
| [hotels_mcp_server](https://github.com/esakrissa/hotels_mcp_server) | MIT | ~60 | MCP server para búsqueda de hoteles usando Booking.com API. Integrable con Claude/GPT-4/Gemini como tool call. |
| [hotels-skill](https://github.com/Anmoldureha/hotels-skill) | MIT | ~45 | Free Booking.com scraper vía Playwright. Sin API key requerida. SKILL.md pattern para AI agents. |
| [AI-Travel-Agent-Advanced](https://github.com/naakaarafr/AI-Travel-Agent-Advanced) | MIT | ~120 | CrewAI + Gemini. Real-time web search: weather, flights, hotels, atracciones. CLI con itinerarios detallados 7 días + presupuestos. |
| [Ctrip-Style-AI-Travel-Assistant](https://github.com/Haohao-end/Ctrip-Style-AI-Travel-Assistant) | MIT | ~90 | LangChain + LangGraph stateful multi-agent: flight booking, hotel reservations, car rentals, tours. Task delegation + human-in-the-loop verification. Inspirado en Ctrip/Trip.com. |
| [Agentic-Travel-Planner-CrewAI](https://github.com/Ratnesh-181998/Agentic-AI-Trip-Planner-CrewAI) | MIT | ~70 | 5-tier hybrid LLM (Groq + Gemini + Ollama local). Fail-safe multi-agent trip planner. Streamlit UI. |
| [Agentic-Travel-Planner](https://github.com/Fieldy76/Agentic-Travel-Planner) | MIT | ~55 | Framework-free MCP agentic workflow. Python puro, sin dependencia de LangChain/CrewAI. Útil como base mínima para entender el patrón. |

---

## Por qué estos 10

- **OpenTripPlanner**: único router multimodal open-source maduro (LGPL, usado por Helsinki, NYC, etc.). Base obligatoria para cualquier app de movilidad.
- **langgraph-travel-agent**: patrón de referencia para integrar APIs reales (Amadeus, Hotelbeds) con LangGraph stateful. El más productivo para POC → producción.
- **Dida-hotel-MCP-CN**: MCP server con 2M+ hoteles gratis = valor inmediato. Plug-in para cualquier Claude/GPT agent.
- **hotels-skill**: SKILL.md pattern, cero APIs requeridas, ideal para demos rápidas.
- **Ctrip-Style**: referencia para human-in-the-loop en booking real, con permission control.

---
*Actualizado automáticamente por el pipeline de ingest.*
