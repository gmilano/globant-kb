# 🏗️ Repos fundacionales — Travel & Hospitality

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-14 (v7)

## Plataformas y frameworks base

| Repo | Licencia | Stars | Descripción | ¿Base para AI? |
|------|----------|-------|-------------|----------------|
| [opentraveldata/opentraveldata](https://github.com/opentraveldata/opentraveldata) | LGPL | ~400 | Datos abiertos de transporte, viajes y turismo: 20K+ POR con código IATA, aeropuertos, rutas, ciudades. Integra Geonames + Wikipedia | Sí — data layer para RAG y routing |
| [Qloapps/QloApps](https://github.com/Qloapps/QloApps) | OSL-3.0 | ~1.8k | PMS hotelero open source + booking engine + website. PHP/MySQL, Docker-ready, activo abr 2026 | Sí — base PMS para AI layer |
| [donghyun-chae/mcp-amadeus](https://github.com/donghyun-chae/mcp-amadeus) | MIT | ~40 | MCP server comunitario para Amadeus APIs (vuelos, hoteles, actividades). Claude/GPT listo | Sí — MCP flight+hotel |
| [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) | MIT | — | MCP oficial Dida Holdings: 2M+ hoteles, OAuth, inventory real-time, sin límite de llamadas | Sí — MCP hotel global |
| [tonykipkemboi/trip_planner_agent](https://github.com/tonykipkemboi/trip_planner_agent) | MIT | ~800 | Agente CrewAI de referencia para planificación de viajes; usado en tutorials oficiales de CrewAI | Sí — scaffolding base |
| [jongalloway/travel-booking-agents](https://github.com/jongalloway/travel-booking-agents) | MIT | ~150 | Flujo multi-agente enterprise: Research→PolicyCheck→BudgetApproval→Optimizer→BookingCoordinator | Sí — corporate booking pattern |
| [Soumyabrata2003/TripCraft](https://github.com/Soumyabrata2003/TripCraft) | MIT | ~80 | Benchmark ACL 2025 para LLM travel planning; dataset spatio-temporal con transporte público real y 5 métricas de evaluación | Sí — eval suite |
| [bala-ceg/ai-travelassistant](https://github.com/bala-ceg/ai-travelassistant) | MIT | ~120 | LangChain + LangGraph + Apify: flight search, hotel booking, sightseeing → itinerario estructurado | Sí — integración API travel |
| [GlenDC/ftl-booking](https://github.com/GlenDC/ftl-booking) | MIT | ~20 | Booking engine hotelero seguro para el siglo 21; Python, API-first, diseño minimalista | Sí — booking engine base |
| [kbhujbal/Multi-Agent-AI-Travel-Advisor](https://github.com/kbhujbal/Multi-Agent-AI-Travel-Advisor) | MIT | 53 | 7 agentes especializados + RAG + tool-calling. Incluye pricing en vivo y recomendaciones personalizadas | Sí — multi-agent template |

## Stack recomendado Globant (Travel AI)

```
Data Layer:       opentraveldata (IATA/POR) + Dida-hotel-MCP-CN
Booking Layer:    mcp-amadeus (flights) + Dida-hotel-MCP-CN (hotels)
Agent Layer:      trip_planner_agent o travel-booking-agents (corporate)
PMS Base:         QloApps (si el cliente necesita PMS propio)
Eval:             TripCraft + GroupTravelBench
```

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
