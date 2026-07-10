# 🎯 Agentes AI — Travel & Hospitality

> Agentes y herramientas AI open source para la industria. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-10

## Agentes y herramientas destacadas

| Nombre | Licencia | Descripción | Stars |
|--------|----------|-------------|-------|
| [TelivityAI/otaip](https://github.com/TelivityAI/otaip) | Apache-2.0 | Open Travel AI Platform — 75 agentes especializados en 12 etapas operativas: ATPCO fare rules (Cat 1-33), NUC/ROE fare construction, BSP reconciliation, NDC/EDIFACT normalization, IRROPS rebooking con EU261/US DOT compliance, void windows, married segment integrity, state machines BSP-finality | ~340 |
| [TelivityAI/haip](https://github.com/TelivityAI/haip) | Apache-2.0 | HAIP (Hotel AI Platform) — PMS open-source API-first construido con TypeScript/Node.js/NestJS. Alternativa a PMS propietarios que cobran $5-15/room/month. Diseñado para integración AI-native desde la base | ~190 |
| [LetsFG/LetsFG](https://github.com/LetsFG/LetsFG) | MIT | Agent-native flight search & booking — 200+ conectores aerolíneas incluyendo Ryanair, EasyJet, Southwest, AirAsia, Qantas + GDS (Amadeus, Duffel, Sabre). Busca 400+ aerolíneas en 5 segundos. Demostró ahorro de $116 en 5 rutas vs Google Flights. MCP server incluido | ~980 |
| [amadeus4dev/amadeus-python](https://github.com/amadeus4dev/amadeus-python) | MIT | Python SDK oficial para Amadeus Self-Service Travel APIs: flight search, hotel booking, itinerary management, airport & airline data, AI-powered predictions (delay, seat selection). Requiere Python 3.8+ | ~1.2k |
| [amadeus4dev/amadeus-node](https://github.com/amadeus4dev/amadeus-node) | MIT | Node.js SDK oficial para Amadeus Self-Service Travel APIs. Acceso a vuelos, hoteles, actividades y datos de destinos. Integrable con cualquier agente LLM como tool call | ~870 |
| [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) | Apache-2.0 | MCP server con acceso directo a 2M+ hoteles globales. Fuente oficial de datos de la 3ra empresa B2B de viajes más grande del mundo. Inventario y precios en tiempo real, sin límite de llamadas. Soporta búsqueda por ubicación, fecha, estrellas, personas y tags | ~420 |
| [malkreide/swiss-transport-mcp](https://github.com/malkreide/swiss-transport-mcp) | MIT | MCP Server para transporte público suizo: planificador OJP, salidas en tiempo real, alertas de disrupciones, ocupación, precios de billetes, composición de trenes. Acceso AI completo a opentransportdata.swiss | ~310 |
| [esakrissa/hotels_mcp_server](https://github.com/esakrissa/hotels_mcp_server) | MIT | MCP server para búsqueda de hoteles via Booking.com API. Permite a LLMs buscar hoteles y destinos con disponibilidad real | ~85 |
| [shaheennabi/Production-Ready-TripPlanner-Multi-AI-Agents-Project](https://github.com/shaheennabi/Production-Ready-TripPlanner-Multi-AI-Agents-Project) | MIT | Trip planner multi-agente production-ready con CrewAI: agentes especializados en búsqueda de vuelos, hoteles, actividades y generación de itinerarios personalizados. Arquitectura de referencia para multi-agent travel | ~95 |
| [opentraveldata/opentraveldata](https://github.com/opentraveldata/opentraveldata) | MIT | Colección open data de transporte, viajes y turismo: aeropuertos, aerolíneas, rutas, países, ciudades. Usa Geonames + Wikipedia como base. Infraestructura de datos fundamental para cualquier solución travel AI | ~640 |

---

## Notas de uso

- **OTAIP + HAIP** forman el stack completo TelivityAI: OTAIP para agentes de vuelo/GDS, HAIP para gestión hotelera
- **LetsFG** es el MCP más completo para flight search; su licencia MIT permite embedding en productos comerciales
- **Amadeus SDKs** son la puerta de entrada al mayor GDS global (500+ aerolíneas, 150k+ hoteles)
- **DIDA MCP** da acceso sin keys ni límites a inventario hotelero B2B de alta calidad
- **OpenTravelData** es la base de datos de referencia para enriquecer cualquier búsqueda travel

---
*Actualizado automáticamente por el pipeline de ingest.*
