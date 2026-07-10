# 🏗️ Repos fundacionales — Travel & Hospitality

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-10

## Plataformas y frameworks base

| Repo | Licencia | Descripción | ¿Base para AI? |
|------|----------|-------------|----------------|
| [opentraveldata/opentraveldata](https://github.com/opentraveldata/opentraveldata) | MIT | Colección open data de transporte, viajes y turismo: aeropuertos (con IATA/ICAO codes), aerolíneas, rutas, países, ciudades, regiones. Construido sobre Geonames + Wikipedia. Base de datos de referencia para enriquecer cualquier agente travel. | Sí — ~640 ★ |
| [TelivityAI/otaip](https://github.com/TelivityAI/otaip) | Apache-2.0 | Open Travel AI Platform — orquestación de 75 agentes especializados en 12 etapas operativas del ciclo travel: search → price → book → ticket → service → settlement. Incluye ATPCO fare logic, BSP reconciliation, IRROPS handling, NDC/EDIFACT normalization. La plataforma más completa de agentes travel open source. | Sí — ~340 ★ |
| [TelivityAI/haip](https://github.com/TelivityAI/haip) | Apache-2.0 | Hotel AI Platform — PMS (Property Management System) open source API-first. TypeScript/Node.js/NestJS. Cubre reservas, housekeeping, revenue management, integración OTA. Alternativa a Opera/Protel/Mews para hoteles que quieren construir AI encima. | Sí — ~190 ★ |
| [amadeus4dev/amadeus-python](https://github.com/amadeus4dev/amadeus-python) | MIT | Python SDK oficial para Amadeus Self-Service APIs: flight search (low-fare, inspired), hotel booking, airport & city search, airline routes, AI flight delay prediction, seat map. El GDS más grande del mundo con 500+ aerolíneas. Requiere Python 3.8+. | Sí — ~1.2k ★ |
| [amadeus4dev/amadeus-node](https://github.com/amadeus4dev/amadeus-node) | MIT | Node.js SDK oficial para Amadeus Self-Service APIs. Acceso a los mismos endpoints que el Python SDK. Compatible con cualquier framework Node (Express, Next.js, NestJS). Ideal para integrar en agentes TypeScript/JavaScript. | Sí — ~870 ★ |
| [LetsFG/LetsFG](https://github.com/LetsFG/LetsFG) | MIT | Agent-native flight search con 200+ conectores de aerolíneas y GDS (Amadeus, Duffel, Sabre). MCP server incluido. El repo más completo para flight search open source con arquitectura agentic-first. | Sí — ~980 ★ |
| [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) | Apache-2.0 | MCP server con acceso directo a inventario y precios de 2M+ hoteles globales (DIDA Travel, 3er B2B de viajes más grande del mundo). Sin API keys, sin límite de llamadas. Base sólida para cualquier agente de reserva hotelera. | Sí — ~420 ★ |
| [moizkamran/ExcursioX](https://github.com/moizkamran/ExcursioX) | MIT | Travel CRM open source con ticketing integrado, gestión de reservas y hoteles. Stack moderno. Base para agencias OTA que quieren añadir AI sobre un CRM funcional. | Sí — ~45 ★ |

---

## Notas de arquitectura

- **Stack completo vuelos:** `opentraveldata` (datos) + `amadeus-python/node` (GDS access) + `LetsFG` (multi-fuente search) + `otaip` (agentes de negocio)
- **Stack completo hoteles:** `haip` (PMS base) + `DIDA MCP` (inventario B2B) + `hotels_mcp_server` (Booking.com retail)
- **El problema del dato:** OpenTravelData resuelve la capa de datos maestros (aeropuertos, rutas, aerolíneas) que ningún agente debería hardcodear

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
