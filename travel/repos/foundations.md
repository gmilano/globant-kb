# 🏗️ Repos fundacionales — Travel & Hospitality

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-11 (v9)

## Plataformas y frameworks base

| Repo | Licencia | Descripción | ¿Base para AI? |
|------|----------|-------------|----------------|
| [TelivityAI/haip](https://github.com/TelivityAI/haip) | Apache-2.0 | Hotel AI Platform: PMS API-first (TypeScript/NestJS) con 12 agentes AI nativos. Reservas, folio y facturación, planes de tarifa, housekeeping digital, auditoría nocturna, channel distribution 450+ OTAs, booking engine directo, Stripe, Keycloak, revenue management. ChatGPT gateway para reserva conversacional. ~40 ★ | Sí — PMS completo con AI de serie, customizable |
| [telivity-otaip/otaip](https://github.com/telivity-otaip/otaip) | Apache-2.0 | Open Travel AI Platform: 75 agentes en 12 etapas operativas. Orquestación domain-specific para el sector turístico con integraciones a APIs de proveedores reales. ~25 ★ | Sí — framework de orquestación completo para agencias/OTAs |
| [opentraveldata/opentraveldata](https://github.com/opentraveldata/opentraveldata) | CC-BY | Colección de datos abiertos de transporte y turismo: aeropuertos, rutas, aerolíneas, PaxIS, schedules. Integra Geonames + Wikipedia. ~255 ★ | Sí — dataset base para búsqueda de vuelos y destinos |
| [opentraveldata/travel-search-engine-v1](https://github.com/opentraveldata/travel-search-engine-v1) | MIT | Motor de búsqueda de viajes con base de datos de grafos (neo4j). Primera versión funcional de búsqueda por grafo de rutas. | Sí — arquitectura de búsqueda de viajes con grafos |
| [Qloapps/QloApps](https://github.com/Qloapps/QloApps) | OSL-3.0 | PMS + Booking Engine + Hotel Website open source. Gestión completa de propiedades hoteleras: reservas, disponibilidad, tarifas, check-in/out. ~500 ★ | Sí — base para hotel AI agent con capa de orquestación |
| [moizkamran/ExcursioX](https://github.com/moizkamran/ExcursioX) | MIT | Travel CRM open source con ticketing integrado, gestión de bookings y hotel management. Stack completo para agencias de viaje. | Sí — base para sales copilot y automatización de agencias |
| [Azure-Samples/azure-ai-travel-agents](https://github.com/Azure-Samples/azure-ai-travel-agents) | MIT | Referencia enterprise: múltiples MCP servers + 3 orquestadores (LangChain.js, LlamaIndex.TS, MAF). Deployable en Azure Container Apps. ~450 ★ | Sí — referencia enterprise para arquitecturas multi-agente |
| [datarootsio/langgraph-template-travel-planner](https://github.com/datarootsio/langgraph-template-travel-planner) | MIT | Template LangGraph con HITL, routing condicional, observabilidad Langfuse, Reflex UI. Base de patrones de producción para agentes de viajes. ~40 ★ | Sí — plantilla production-ready con observabilidad incluida |
| [skarlekar/mcp_travelassistant](https://github.com/skarlekar/mcp_travelassistant) | MIT | Suite MCP servers: itinerarios, vuelos, alojamiento, eventos locales, clima, presupuesto. Ejemplo canónico de composición MCP para travel. ~35 ★ | Sí — referencia de arquitectura MCP para travel |
| [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) | MIT | MCP gateway B2B: 2M+ hoteles, inventario real-time, sin límite de llamadas. OAuth-based. Lanzado 9 jul 2026. | Sí — gateway de datos hoteleros para agentes AI |
| [LetsFG/LetsFG](https://github.com/LetsFG/LetsFG) | MIT | Agent-native flight search: 400+ aerolíneas, 200+ conectores NDC/GDS en paralelo. CLI + SDK + MCP Server. Precios sin markup de OTA. ~500 ★ | Sí — acceso directo a inventario aéreo para agentes AI |

## Data fundacional

| Dataset / API | Licencia | Descripción |
|---------------|----------|-------------|
| [opentraveldata](https://github.com/opentraveldata/opentraveldata) | CC-BY | Aeropuertos, aerolíneas, rutas, PaxIS, schedules |
| OpenStreetMap + Nominatim | ODbL / MIT | Geocodificación, rutas, puntos de interés turístico |
| [Amadeus for Developers](https://developers.amadeus.com/) | API (freemium) | Vuelos, hoteles, actividades, ofertas de viaje — SDK Python MIT 258 ★ |
| [SerpAPI Google Flights/Hotels](https://serpapi.com/) | API (freemium) | Datos en tiempo real de vuelos y hoteles de Google |
| [LetsFG](https://github.com/LetsFG/LetsFG) | MIT | 400+ aerolíneas a precios raw sin markup de OTA |

## Cómo construir sobre estas bases

```
[Datos] opentraveldata + OpenStreetMap
              ↓
[PMS/CRM] HAIP (hotel AI-native) / QloApps (hotel clásico) / ExcursioX (agencia)
              ↓
[Orquestación] OTAIP (75 agentes travel) / azure-ai-travel-agents (enterprise)
              ↓
[MCP Servers] Dida-hotel-MCP + mcp_travelassistant + LetsFG MCP
              ↓
[Orquestador] LangGraph (datarootsio template)
              ↓
[UI/API] Chat conversacional / API REST / WhatsApp / Booking engine
```

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
