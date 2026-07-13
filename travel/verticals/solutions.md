# 🏭 Verticales de partida — Travel & Hospitality

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agentica arriba.
> Última actualización: 2026-07-13 (v10)

## Plataformas recomendadas

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| **HAIP** | Apache-2.0 | [github.com/TelivityAI/haip](https://github.com/TelivityAI/haip) | TypeScript / Node.js / NestJS | Hotel AI Platform: PMS completo con 12 agentes AI nativos. Reservas, folio, tarifas, housekeeping, auditoría nocturna, channel 450+ OTAs, booking directo, Stripe, Keycloak. ChatGPT gateway para booking conversacional. ~40 ★ |
| **Apaleo** | Comercial + API abierta | [apaleo.com](https://apaleo.com/) | Cloud / REST + MCP | PMS cloud API-first con MCP server nativo (primero en la industria). Apaleo Agent Hub = marketplace de agentes AI para hoteles. La API expone reservas, folio, housekeeping, revenue como herramientas MCP. Arquitectura abierta para integrar n agentes via un protocolo. |
| **OTAIP** | Apache-2.0 | [github.com/telivity-otaip/otaip](https://github.com/telivity-otaip/otaip) | Python / TypeScript | Open Travel AI Platform: 75 agentes en 12 etapas operativas para OTAs y agencias de viaje. Integración a APIs de proveedores reales. ~25 ★ |
| **QloApps** | OSL-3.0 | [github.com/Qloapps/QloApps](https://github.com/Qloapps/QloApps) | PHP (PrestaShop base), MySQL | PMS + Booking Engine + Hotel Website open source. Reservas, disponibilidad, tarifas, check-in/out. Customizable. ~500 ★ |
| **ExcursioX** | MIT | [github.com/moizkamran/ExcursioX](https://github.com/moizkamran/ExcursioX) | PHP/JS | Travel CRM con ticketing, booking y hotel management. Para agencias de viaje. |
| **Wander-Desk** | MIT | [github.com/UjjwalSaini07/Wander-Desk](https://github.com/UjjwalSaini07/Wander-Desk) | React / Node.js | Travel Ops Platform: CRM + Trip Management + Sales Copilot + Traveler Intelligence + Revenue Forecasting + Analytics. |
| **OpenTravelData (OPTD)** | CC-BY | [github.com/opentraveldata/opentraveldata](https://github.com/opentraveldata/opentraveldata) | CSV/JSON datasets | Datos abiertos de aeropuertos, aerolíneas, rutas, PaxIS. Base de datos para cualquier motor de búsqueda de viajes. ~255 ★ |
| **Travel Search Engine v1** | MIT | [github.com/opentraveldata/travel-search-engine-v1](https://github.com/opentraveldata/travel-search-engine-v1) | Python, Neo4j | Motor de búsqueda de viajes con grafo (neo4j). Conexiones entre aeropuertos, rutas y precios. |
| **LetsFG** | MIT | [github.com/LetsFG/LetsFG](https://github.com/LetsFG/LetsFG) | Python / MCP | Agent-native flight search: 400+ aerolíneas, CLI + SDK + MCP Server. Sin markup de OTA. ~500 ★ |
| **Dida Hotel MCP** | MIT | [github.com/DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) | MCP / REST | Gateway B2B: 2M+ hoteles, inventario real-time, precios, políticas de cancelación. Sin límite de llamadas (plan free). |

## Comparativa para proyectos Globant

| Necesidad del cliente | Plataforma recomendada | Ventaja |
|-----------------------|----------------------|---------|
| Hotel boutique / cadena con AI nativo (OSS) | HAIP | PMS con 12 agentes AI de serie, Apache-2.0, channel 450+ OTAs |
| Hotel con PMS cloud moderno + Agent Hub | Apaleo | MCP server nativo, marketplace de agentes, API abierta |
| Hotel boutique / cadena clásico | QloApps | PMS completo, OSS, customizable, PHP maduro |
| OTA o agencia grande | OTAIP | 75 agentes en 12 etapas, orquestación domain-specific |
| Agencia de viajes digital | ExcursioX o Wander-Desk | CRM + booking + ops en un repo |
| Motor de búsqueda de vuelos | LetsFG | 400+ aerolíneas sin markup, MCP Server incluido |
| Motor de búsqueda multi-proveedor (zero-config) | trvl | Go binary, sin API keys, 21 providers, instala en 1 min |
| Booking con APIs reales + multi-modelo | Agentic-Travel-Planner | Amadeus+Aviasales, Claude/OpenAI/Gemini intercambiables |
| Motor de búsqueda de vuelos (datos) | OPTD + Travel Search Engine v1 | Datos abiertos + grafo |
| Booking B2B hoteles via AI | Dida Hotel MCP | 2M+ hoteles, MCP nativo, real-time, gratis |
| Reviews y calidad de destino | tripadvisor-mcp | TripAdvisor Content API via MCP, MIT |
| Routing multi-modal "last mile" | tripgo-mcp-server | Tren+bus+ferry+bici+rideshare combinados |
| Tour operator / paquetes LATAM | ExcursioX + OPTD + Dida MCP | CRM + rutas + hoteles, 100% open source |

## Cómo customizar con AI

### Patrón A: Hotel AI-Native (HAIP + agentes custom)
```
HAIP (PMS + 12 agentes AI nativos)
  ├─ Añadir agentes domain-specific del cliente:
  │     ├─ Agente de upsell de spa/restaurante
  │     ├─ Agente de loyalty (preferencias recurrentes)
  │     └─ Agente de sustentabilidad (compensación CO2)
  ├─ ChatGPT gateway → booking conversacional en WhatsApp/web
  └─ Dashboard AI: pricing dinámico + demanda en tiempo real
```

### Patrón B: PMS Clásico + AI Concierge (QloApps + LangGraph)
```
QloApps (reservas, disponibilidad, precios)
  ├─ API REST existente
  └─ Agente LangGraph con MCP server custom
       ├─ Tool: check_availability(hotel_id, dates)
       ├─ Tool: create_booking(guest_data, room_id)
       ├─ Tool: get_pricing(room_type, dates)
       └─ Tool: send_confirmation(booking_id)
```

### Patrón C: OTA/Agencia con OTAIP
```
OTAIP (75 agentes en 12 etapas)
  ├─ Etapa 1: Search agents (destinos, disponibilidad)
  ├─ Etapa 2: Pricing agents (dinámica + ancillaries)
  ├─ Etapa 3: Booking agents (reserva + pago)
  ├─ Etapa 4: Ticketing agents (emisión + entrega)
  └─ Etapa 12: Settlement agents (conciliación + pago a proveedor)
```

### Patrón D: Búsqueda multimodal (OPTD + LetsFG + Dida MCP)
```
Usuario → query en lenguaje natural (o imagen de destino)
  └─ Agente multimodal
       ├─ OPTD: busca aeropuertos y rutas disponibles
       ├─ LetsFG MCP: precios vuelos de 400+ aerolíneas (sin markup)
       ├─ Dida MCP: hoteles disponibles (2M+ propiedades)
       └─ Respuesta: itinerario completo con precios reales
```

---
*Ver también: `repos/foundations.md` para repos de bajo nivel.*
