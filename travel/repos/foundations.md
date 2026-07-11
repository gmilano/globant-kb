# 🏗️ Repos fundacionales — Travel & Hospitality

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-11

## Plataformas y frameworks base

| Repo | Licencia | Descripción | ¿Base para AI? |
|------|----------|-------------|----------------|
| [opentraveldata/opentraveldata](https://github.com/opentraveldata/opentraveldata) | CC-BY | Colección de datos abiertos de transporte, viajes y turismo: aeropuertos, rutas, operadores, PaxIS, schedules. Integra Geonames + Wikipedia. ~255 ★ | Sí — dataset base para búsqueda de vuelos y destinos |
| [opentraveldata/travel-search-engine-v1](https://github.com/opentraveldata/travel-search-engine-v1) | MIT | Motor de búsqueda de viajes con base de datos de grafos (neo4j). Primera versión funcional. | Sí — arquitectura de búsqueda de viajes con grafos |
| [Qloapps/QloApps](https://github.com/Qloapps/QloApps) | OSL-3.0 | PMS + Booking Engine + Hotel Website open source. Gestión completa de propiedades hoteleras: reservas, disponibilidad, tarifas, check-in/out. ~500 ★ | Sí — base para hotel AI agent con capa de orquestación |
| [moizkamran/ExcursioX](https://github.com/moizkamran/ExcursioX) | MIT | Travel CRM open source con ticketing integrado, gestión de bookings y hotel management. Stack completo para agencias. | Sí — base para sales copilot y automatización de agencias |
| [Azure-Samples/azure-ai-travel-agents](https://github.com/Azure-Samples/azure-ai-travel-agents) | MIT | Referencia enterprise: múltiples MCP servers + 3 orquestadores (LangChain.js, LlamaIndex.TS, MAF). Deployable en Azure Container Apps. ~450 ★ | Sí — referencia enterprise para arquitecturas multi-agente |
| [datarootsio/langgraph-template-travel-planner](https://github.com/datarootsio/langgraph-template-travel-planner) | MIT | Template LangGraph con HITL, routing condicional, observabilidad Langfuse, Reflex UI. Base de patrones de producción para agentes de viajes. | Sí — plantilla production-ready con observabilidad incluida |
| [skarlekar/mcp_travelassistant](https://github.com/skarlekar/mcp_travelassistant) | MIT | Suite MCP servers: itinerarios, vuelos, alojamiento, eventos locales, clima, presupuesto. Ejemplo de composición MCP para travel. | Sí — referencia de arquitectura MCP para travel |
| [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) | MIT | MCP gateway B2B: 2M+ hoteles, inventario real-time, sin límite de llamadas. OAuth-based. Lanzado jul 2026. | Sí — gateway de datos hoteleros para agentes AI |

## Data fundacional

| Dataset / API | Licencia | Descripción |
|---------------|----------|-------------|
| [opentraveldata](https://github.com/opentraveldata/opentraveldata) | CC-BY | Aeropuertos, aerolíneas, rutas, PaxIS, schedules |
| OpenStreetMap + Nominatim | ODbL / MIT | Geocodificación, rutas, puntos de interés turístico |
| [Amadeus for Developers](https://developers.amadeus.com/) | API (freemium) | Vuelos, hoteles, actividades, ofertas de viaje |
| [SerpAPI Google Flights/Hotels](https://serpapi.com/) | API (freemium) | Datos en tiempo real de vuelos y hoteles |

## Cómo construir sobre estas bases

```
[Datos] opentraveldata + OpenStreetMap
              ↓
[PMS/CRM] QloApps (hotel) / ExcursioX (agencia)
              ↓
[MCP Servers] Dida-hotel-MCP + mcp_travelassistant
              ↓
[Orquestador] LangGraph (datarootsio template) / Azure AI Travel Agents
              ↓
[UI/API] Chat conversacional / API REST / WhatsApp
```

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
