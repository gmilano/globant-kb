# 🏭 Verticales de partida — Travel & Hospitality

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-14 (v7)

## Plataformas recomendadas

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| QloApps | OSL-3.0 (free) | [github.com/Qloapps/QloApps](https://github.com/Qloapps/QloApps) | PHP/MySQL, Docker | PMS hotelero + booking engine + website; base para hoteles boutique y cadenas independientes |
| OpenTravelData (OPTD) | LGPL | [github.com/opentraveldata/opentraveldata](https://github.com/opentraveldata/opentraveldata) | CSV/Python | Data layer: 20K+ POR IATA, aeropuertos, rutas, ciudades — fundación para RAG travel |
| Travelport TripServices | Commercial API (free dev tier) | [developer.travelport.com](https://developer.travelport.com) | REST, MCP | GDS agentic-ready: flights NDC + LCC + hotel; MCP server nativo desde Jun 2026 |
| Sabre Mosaic + MCP Server | Commercial API | [developer.sabre.com/product-collection/mcp-server](https://developer.sabre.com/product-collection/mcp-server) | REST, MCP | GDS enterprise; MCP server expone 420+ airlines + retailing APIs a agentes AI |
| Amadeus APIs | Commercial API (free sandbox) | [developers.amadeus.com](https://developers.amadeus.com) | REST | Vuelos, hoteles, actividades, punto de venta; sandbox gratuito hasta prod |
| Expedia Intelligent Experience Platform | Commercial API | [developers.expediagroup.com/docs/ai-solutions](https://developers.expediagroup.com/docs/ai-solutions) | REST, MCP | Inventario OTA: hoteles + vuelos + actividades + autos; MCP server live May 2026 |
| Dida Hotel MCP | MIT (MCP server) | [github.com/DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) | MCP/OAuth | 2M+ hoteles B2B; OAuth auth; gratis para socios aprobados; lanzado Jul 9 2026 |
| mcp-amadeus (community) | MIT | [github.com/donghyun-chae/mcp-amadeus](https://github.com/donghyun-chae/mcp-amadeus) | MCP/Python | Wrapper MCP sobre Amadeus APIs; self-hosted; ideal para POCs rápidos |
| ftl-booking | MIT | [github.com/GlenDC/ftl-booking](https://github.com/GlenDC/ftl-booking) | Python, API-first | Booking engine hotelero seguro; minimalista, extensible con AI layer |
| PHPTRAVELS (framework) | Commercial (open core) | [phptravels.com](https://phptravels.com/open-source-travel-management-software) | PHP | Agencia de viajes: flights + hotels + tours + visa + transfers; open core |

## Cómo customizar con AI (patrón Globant)

```
1. Seleccionar plataforma vertical base (QloApps / ftl-booking / PHPTRAVELS)
2. Exponer APIs internas como MCP tools (usar FastMCP o sdk oficial)
3. Conectar MCP servers de GDS (mcp-amadeus + Dida-hotel-MCP-CN)
4. Desplegar agente orquestador (trip_planner_agent / travel-booking-agents)
5. UI conversacional (WhatsApp LATAM / web chat / voice)
6. Eval continuo con TripCraft + GroupTravelBench métricas
```

## Comparativa licencias

| Plataforma | ¿Globant puede deployar para cliente? | Restricciones |
|------------|--------------------------------------|---------------|
| QloApps (OSL-3.0) | Sí con restricciones | Modificaciones deben ser open source |
| OPTD (LGPL) | Sí, uso libre | Modificaciones de la lib deben compartirse |
| ftl-booking (MIT) | Sí, sin restricciones | — |
| mcp-amadeus (MIT) | Sí | Requiere cuenta Amadeus (sandbox gratis) |
| Dida-hotel-MCP-CN (MIT) | Sí | Requiere aprobación como socio B2B Dida |
| Travelport / Sabre / Amadeus APIs | Sí | Contratos comerciales; free tiers para dev |
