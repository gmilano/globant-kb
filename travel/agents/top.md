# 🎯 Top AI Agents — Travel & Hospitality

> Agentes y herramientas AI open source para la industria. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-14 (v7)

## Agentes y herramientas destacadas

| Nombre | Repo | Licencia | Stars | Descripción |
|--------|------|----------|-------|-------------|
| trip_planner_agent | [tonykipkemboi/trip_planner_agent](https://github.com/tonykipkemboi/trip_planner_agent) | MIT | ~800 | CrewAI multi-agent vacation planner; reference example for CrewAI travel use case |
| AI-Travel-Agent-Advanced | [naakaarafr/AI-Travel-Agent-Advanced](https://github.com/naakaarafr/AI-Travel-Agent-Advanced) | MIT | ~200 | CrewAI + Google Gemini; destination analysis, local expert agents, 7-day itinerary with real-time flight/hotel/weather data |
| travel-booking-agents | [jongalloway/travel-booking-agents](https://github.com/jongalloway/travel-booking-agents) | MIT | ~150 | Enterprise multi-agent booking workflow: Research→Policy→Budget→Optimizer→Coordinator agents; corporate travel automation demo |
| ai-travelassistant | [bala-ceg/ai-travelassistant](https://github.com/bala-ceg/ai-travelassistant) | MIT | ~120 | LangChain + Apify; flight search, hotel booking, sightseeing recommendations → structured itinerary |
| Multi-Agent-AI-Travel-Advisor | [kbhujbal/Multi-Agent-AI-Travel-Advisor](https://github.com/kbhujbal/Multi-Agent-AI-Travel-Advisor) | MIT | 53 | 7 specialized agents, RAG over travel corpus, tool-calling for live pricing |
| mcp-amadeus | [donghyun-chae/mcp-amadeus](https://github.com/donghyun-chae/mcp-amadeus) | MIT | ~40 | Community MCP server wrapping Amadeus REST APIs; flights, hotels, activities; Claude/GPT-4 ready |
| Dida-hotel-MCP-CN | [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) | MIT | — | Official Dida Holdings hotel MCP: 2M+ hotels, real-time inventory/pricing, OAuth auth; launched Jul 9 2026 |
| Production-Ready-TripPlanner | [shaheennabi/Production-Ready-TripPlanner-Multi-AI-Agents-Project](https://github.com/shaheennabi/Production-Ready-TripPlanner-Multi-AI-Agents-Project) | MIT | 74 | Production-grade multi-agent trip planner: budget optimization, preference modeling, booking orchestration |
| travel-agent (MozartofCode) | [MozartofCode/travel-agent](https://github.com/MozartofCode/travel-agent) | MIT | ~60 | CrewAI 7-agent system: transport + accommodations + activities + weather + clothing + history + report |
| TripCraft | [Soumyabrata2003/TripCraft](https://github.com/Soumyabrata2003/TripCraft) | MIT | ~80 | ACL 2025 benchmark for LLM travel planning; spatio-temporal constraints, public transit, events, 5 eval metrics |

## Notas de uso

- **Best starter** para Globant: `trip_planner_agent` + `ai-travelassistant` combinados sobre QloApps o Travelport TripServices
- **MCP layer**: `mcp-amadeus` + `Dida-hotel-MCP-CN` brindan flights + hotels en minutos con protocolo estándar
- **Corporate travel**: `travel-booking-agents` tiene el pattern de aprobación/policy compliance que los TMC clients necesitan
- **Benchmark**: usar TripCraft y GroupTravelBench para evaluar soluciones antes de entregar a cliente

---
*Actualizado automáticamente por el pipeline de ingest.*
