# 🏭 Verticales de Partida — Travel & Hospitality

> Plataformas verticales existentes customizables con AI.
> Última actualización: 2026-07-09 (v5)

## Plataformas recomendadas

| Plataforma | Licencia | Repo / URL | Stack | Caso de uso |
|------------|----------|-----------|-------|-------------|
| **OpenTripPlanner** | LGPL-2.1 | [github.com/opentripplanner](https://github.com/opentripplanner/OpenTripPlanner) | Java, GraphQL | Routing multimodal (transit + bike + walk). Municipios, apps de movilidad. |
| **Odoo Travel** | LGPL-3.0 | [github.com/odoo/odoo](https://github.com/odoo/odoo) | Python, JS | ERP con módulos de travel agency, CRM, facturación. Base para agencias LATAM. |
| **ERPNext** | GPL-3.0 | [github.com/frappe/erpnext](https://github.com/frappe/erpnext) | Python, JS | ERP alternativo con hospitality module. Menor complejidad que Odoo. |
| **OpenHotelFR** | MIT | [github.com/nicolv23/OpenHotelFR](https://github.com/nicolv23/OpenHotelFR) | Python/Flask | Gestión básica de hotel. Punto de partida para AI layer. |
| **GTFS / OpenMobilityData** | Open spec | [gtfs.org](https://gtfs.org/) | CSV/Protobuf | Standard de datos de transporte. Base para routing o disruption agent. |
| **OpenTravel 2.0 Schemas** | Apache-2.0 | [github.com/OpenTravel](https://github.com/OpenTravel/OpenTravel2-Model) | OpenAPI, JSON | Schemas de mensajería para integración entre sistemas travel. |
| **PHPTravels** | Open source | [phptravels.com](https://phptravels.com/open-source-travel-management-software) | PHP, MySQL | B2C/B2B booking: vuelos, hoteles, transfers, paquetes. |

---

## Plataformas por segmento

### Aerolíneas
| Plataforma | Tipo | Notas |
|------------|------|-------|
| Sabre Mosaic APIs | Commercial + MCP | 420+ airlines, MCP server desde mayo 2026 |
| Amadeus for Developers | Commercial + SDK MIT | Tier free: vuelos, hoteles, POI |
| OpenSky Network API | Open/free | Datos de vuelos en tiempo real. Disruption signals. |

### Hoteles
| Plataforma | Tipo | Notas |
|------------|------|-------|
| DIDA Hotel MCP | MIT free | 2M+ hoteles, MCP server, mejor relación valor/esfuerzo |
| Hotelbeds API | Commercial | SDK community MIT. B2B, muchos hoteles no en OTAs |
| OpenHotelFR | MIT | PMS minimalista, base para AI layer propio |

### Transporte Terrestre
| Plataforma | Tipo | Notas |
|------------|------|-------|
| OpenTripPlanner | LGPL-2.1 | El estándar del sector para routing multimodal |
| OSRM (Project-OSRM) | BSD-2 | Routing por carretera ultra-rápido. OSM data. |
| Valhalla | MIT | Router alternativo, más configurable que OSRM |

---

## LATAM específico

### Argentina
- **Despegar.com**: OTA líder, partner API disponible. Oportunidad: AI conversacional
- **Almundo**: agencia + OTA, oportunidad de AI layer sobre CRM
- **Aerolíneas Argentinas**: integración NDC vía Sabre/Amadeus

### Brasil
- **CVC Corp**: mayor operadora de viajes LATAM, mercado CRM+IA
- **Decolar (Despegar BR)**: OTA, misma oportunidad que AR
- **Azul + GOL + LATAM Brasil**: aerolíneas con NDC activo

### México
- **VivaAerobus + Volaris**: LCCs con API de distribución
- **Best Day Travel**: mayorista, oportunidad de AI pricing
- **Booking.com MX**: gran adopción, oportunidad AEO

---
*Ver también: `repos/foundations.md` para frameworks base.*
