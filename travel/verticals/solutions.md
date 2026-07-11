# 🏭 Verticales de partida — Travel & Hospitality

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agentica arriba.
> Última actualización: 2026-07-11

## Plataformas recomendadas

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| **QloApps** | OSL-3.0 | [github.com/Qloapps/QloApps](https://github.com/Qloapps/QloApps) | PHP (PrestaShop base), MySQL | PMS + Booking Engine + Hotel Website. Gestión de propiedades hoteleras: reservas, disponibilidad, tarifas, check-in/out. 500+ ★ |
| **ExcursioX** | MIT | [github.com/moizkamran/ExcursioX](https://github.com/moizkamran/ExcursioX) | PHP/JS | Travel CRM con ticketing, booking y hotel management. Para agencias de viaje. |
| **Wander-Desk** | MIT | [github.com/UjjwalSaini07/Wander-Desk](https://github.com/UjjwalSaini07/Wander-Desk) | React / Node.js | Travel Ops Platform: CRM + Trip Management + Sales Copilot + Traveler Intelligence + Revenue Forecasting + Analytics. |
| **OpenTravelData (OPTD)** | CC-BY | [github.com/opentraveldata/opentraveldata](https://github.com/opentraveldata/opentraveldata) | CSV/JSON datasets | Datos abiertos de aeropuertos, aerolíneas, rutas, PaxIS. Base de datos para cualquier motor de búsqueda de viajes. 255 ★ |
| **Travel Search Engine v1** | MIT | [github.com/opentraveldata/travel-search-engine-v1](https://github.com/opentraveldata/travel-search-engine-v1) | Python, Neo4j | Motor de búsqueda de viajes con grafo (neo4j). Conexiones entre aeropuertos, rutas y precios. |
| **Dida Hotel MCP** | MIT | [github.com/DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) | MCP / REST | Gateway B2B: 2M+ hoteles, inventario real-time, precios, políticas de cancelación. Sin límite de llamadas (plan free). |
| **PHPTRAVELS** | Comercial (versión OS) | [phptravels.com](https://phptravels.com/open-source-travel-management-software) | PHP / MySQL | Travel management completo: vuelos, hoteles, tours, GDS, CRM, vouchers, multi-moneda. Self-hosted. |
| **AlpineClubBookingsNZ** | MIT | [github.com/thatskiff33/AlpineClubBookingsNZ](https://github.com/thatskiff33/AlpineClubBookingsNZ) | PHP/JS | Booking y membership management para clubs / tour operators pequeños. Customizable. |

## Comparativa para proyectos Globant

| Necesidad del cliente | Plataforma recomendada | Ventaja |
|-----------------------|----------------------|---------|
| Hotel boutique / cadena | QloApps | PMS completo, OSS, customizable |
| Agencia de viajes digital | ExcursioX o Wander-Desk | CRM + booking + ops en un repo |
| Motor de búsqueda de vuelos | OPTD + Travel Search Engine v1 | Datos abiertos + grafo |
| Booking B2B hoteles via AI | Dida Hotel MCP | 2M+ hoteles, MCP nativo, real-time |
| Tour operator / paquetes | PHPTRAVELS | GDS + tours + vouchers |

## Cómo customizar con AI

### Patrón A: PMS + AI Concierge (QloApps)
```
QloApps (reservas, disponibilidad, precios)
  ├─ API REST existente
  └─ Agente LangGraph con MCP server custom
       ├─ Tool: check_availability(hotel_id, dates)
       ├─ Tool: create_booking(guest_data, room_id)
       ├─ Tool: get_pricing(room_type, dates)
       └─ Tool: send_confirmation(booking_id)
```

### Patrón B: Agencia digital con Sales Copilot (ExcursioX / Wander-Desk)
```
Wander-Desk (CRM + trips + ops)
  └─ Claude/GPT como Sales Copilot
       ├─ Consulta historial del cliente (CRM)
       ├─ Genera propuesta de viaje personalizada
       ├─ Calcula revenue forecast
       └─ Draft automático de vouchers
```

### Patrón C: Búsqueda multimodal (OPTD + Dida MCP)
```
Usuario → query en lenguaje natural (o imagen de destino)
  └─ Agente multimodal
       ├─ OPTD: busca aeropuertos y rutas disponibles
       ├─ Dida MCP: busca hoteles disponibles (2M+ propiedades)
       ├─ SerpAPI: precios de vuelos en tiempo real
       └─ Respuesta: itinerario completo con precios
```

---
*Ver también: `repos/foundations.md` para repos de bajo nivel.*
