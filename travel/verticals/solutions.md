# 🏭 Verticales de Partida — Travel & Hospitality

> Plataformas verticales existentes customizables con AI.
> Última actualización: 2026-07-09 (v6 — QloApps, corporate travel section, LATAM players actualizados)

## Plataformas recomendadas

| Plataforma | Licencia | Repo / URL | Stack | Caso de uso |
|------------|----------|-----------|-------|-------------|
| **OpenTripPlanner** | LGPL-2.1 | [github.com/opentripplanner](https://github.com/opentripplanner/OpenTripPlanner) | Java, GraphQL | Routing multimodal (transit + bike + walk). Municipios, apps de movilidad. |
| **QloApps** | OSL-3.0 | [github.com/Qloapps/QloApps](https://github.com/Qloapps/QloApps) | PHP, MySQL | PMS + Booking Engine + Hotel Website completo. Integra OTAs (Booking, Airbnb, Expedia) vía Channel Manager. AI content generator integrado 2026. Para hoteles y cadenas pequeñas. ⭐ NUEVO v6 |
| **Odoo Travel** | LGPL-3.0 | [github.com/odoo/odoo](https://github.com/odoo/odoo) | Python, JS | ERP con módulos de travel agency, CRM, facturación. Base para agencias LATAM. |
| **ERPNext** | GPL-3.0 | [github.com/frappe/erpnext](https://github.com/frappe/erpnext) | Python, JS | ERP alternativo con hospitality module. Menor complejidad que Odoo. |
| **PHPTravels** | Open source | [phptravels.com](https://phptravels.com/open-source-travel-management-software) | PHP, MySQL | B2C/B2B booking: vuelos, hoteles, transfers, paquetes. Customizable. |
| **GTFS / OpenMobilityData** | Open spec | [gtfs.org](https://gtfs.org/) | CSV/Protobuf | Standard de datos de transporte. Base para routing o disruption agent. |
| **OpenTravel 2.0 Schemas** | Apache-2.0 | [github.com/OpenTravel](https://github.com/OpenTravel/OpenTravel2-Model) | OpenAPI, JSON | Schemas de mensajería para integración entre sistemas travel. |

---

## Plataformas por segmento

### Aerolíneas
| Plataforma | Tipo | Notas |
|------------|------|-------|
| Sabre Mosaic APIs | Commercial + MCP | 420+ airlines, MCP server desde mayo 2026. Pipeline completo con MindTrip + PayPal. |
| Amadeus for Developers | Commercial + SDK MIT | Tier free: vuelos, hoteles, POI. AI Commerce: hoteles bookables vía Claude (HITEC jun 2026). |
| OpenSky Network API | Open/free | Datos de vuelos en tiempo real. Disruption signals. |
| amadeus-cli | MIT | CLI open source oficial para Amadeus APIs, JSON output para AI agents. |

### Hoteles
| Plataforma | Tipo | Notas |
|------------|------|-------|
| DIDA Hotel MCP | MIT free | 2M+ hoteles, MCP server, mejor relación valor/esfuerzo |
| QloApps | OSL-3.0 free | PMS + Booking Engine completo. Canal Manager OTA. AI content gen 2026. Base para hoteles pequeños/medianos. |
| Hotelbeds API | Commercial | SDK community MIT. B2B, muchos hoteles no en OTAs |
| Amadeus Max | Commercial | Revenue management por lenguaje natural para hotel staff (HITEC jun 2026) |

### Transporte Terrestre
| Plataforma | Tipo | Notas |
|------------|------|-------|
| OpenTripPlanner | LGPL-2.1 | El estándar del sector para routing multimodal |
| OSRM (Project-OSRM) | BSD-2 | Routing por carretera ultra-rápido. OSM data. |
| Valhalla | MIT | Router alternativo, más configurable que OSRM |

### Corporate Travel
| Plataforma | Tipo | Notas |
|------------|------|-------|
| Navan | Commercial SaaS | Líder corporate travel AI. "Book with AI" + Navan Edge 2026. Modelo a replicar open source para LATAM. |
| Perk (ex-TravelPerk) | Commercial SaaS | Rebranding 2026. FlexiPerk + AI travel management. Fuerte en Europa/LATAM. |
| SAP Concur | Commercial | Legacy ERP travel + expense. Integraciones nativas SAP. |
| Travel Code | Commercial SaaS | AI-native corporate travel. MCP TravelCode server open source para AI agents. |

---

## LATAM específico

### Argentina
- **Despegar.com**: OTA líder LATAM. SOFIA GenAI assistant live (multimodal). Oportunidad: AI layer para agencias independientes que no pueden invertir a nivel Despegar.
- **Almundo**: agencia + OTA, oportunidad de AI layer sobre CRM
- **Aerolíneas Argentinas**: integración NDC vía Sabre/Amadeus

### Brasil
- **CVC Corp**: mayor operadora de viajes LATAM, mercado CRM+IA
- **Decolar (Despegar BR)**: OTA, SOFIA también disponible en BR. Mismo ecosistema Despegar.
- **Azul + GOL + LATAM Brasil**: aerolíneas con NDC activo. GOL en proceso de restructuración financiera.

### México
- **VivaAerobus + Volaris**: LCCs con API de distribución
- **Best Day Travel**: mayorista parte del grupo Despegar. Oportunidad AI pricing.
- **Booking.com MX**: gran adopción, oportunidad AEO

### Colombia/Perú/Ecuador
- **LATAM Airlines**: AI Virtual Agent ya en producción en estos 3 países (jun 2025 rollout). Caso de éxito regional.
- **Copa Airlines**: aerolínea hub Panamá con fuerte presencia. Sin AI agent conocido aún.

---

## Cómo seleccionar plataforma base

```
¿El cliente es...?

Hotel individual/pequeña cadena:
  → QloApps (PMS + booking engine gratuito) + DIDA Hotel MCP + Claude Haiku

Agencia de viajes tradicional:
  → Odoo Travel (CRM + facturación) + trvl MCP + Claude Haiku para asesoría

OTA regional (100k+ bookings/año):
  → Stack propio + Sabre Mosaic MCP + Amadeus SDK + LangGraph + Claude Sonnet 5

Municipio / operador de transporte:
  → OpenTripPlanner + GTFS local + Claude Haiku para conversational interface

Empresa (corporate travel):
  → SAP Concur / Odoo + Policy RAG + Amadeus + Claude Sonnet 5 (compliance layer)

Aerolínea:
  → Sabre Mosaic o Amadeus (existente) + disruption agent (OpenSky + LangGraph) + Claude
```

---
*Ver también: `repos/foundations.md` para frameworks base.*
