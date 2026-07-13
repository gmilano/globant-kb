# 🏗️ Repos fundacionales — Travel & Hospitality

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-13 (v11)

## Plataformas y frameworks base

| Repo | Licencia | Descripción | ¿Base para AI? |
|------|----------|-------------|----------------|
| [QloApps/QloApps](https://github.com/Qloapps/QloApps) | OSL-3.0 | PMS hotelero open source con motor de reservas y sitio web. PHP. Multimoneda/multiidioma. Para pequeñas-medianas propiedades. Capa AI encima del motor de reservas. | Sí — ~780★ |
| [TelivityAI/haip](https://github.com/TelivityAI/haip) | Apache-2.0 | Hotel AI Platform: PMS API-first (TypeScript/NestJS) con 12 agentes AI nativos. Revenue management, channel manager (450+ OTAs), booking engine directo sin comisiones, PCI DSS + GDPR. El más apto para AI. | Sí — ~19★ |
| [amadeus4dev/amadeus-python](https://github.com/amadeus4dev/amadeus-python) | MIT | SDK Python oficial para Amadeus APIs. ⚠️ Self-Service sunset July 17 2026. Para enterprise, usar portal Enterprise de Amadeus. Para startups, migrar a Duffel. | Sí — ~680★ |
| [Iter-X/open-poi-datasets](https://github.com/Iter-X/open-poi-datasets) | MIT | Dataset abierto de puntos de interés globales (POI): monumentos, atracciones, landmarks. Estructurado para GIS, planificación de viajes e investigación. Base para recomendadores. | Sí — ~200★ |
| [lev-corrupted/travel-mcp-server](https://github.com/lev-corrupted/travel-mcp-server) | MIT | MCP server para agregación: vuelos (Amadeus), hoteles (Amadeus), tracking real-time (AviationStack), mejores fechas. Blueprint para MCP travel. | Sí — ~15★ |
| [MikkoParkkola/trvl](https://github.com/MikkoParkkola/trvl) | PolyForm-NC-1.0* | Go binary MCP: vuelos, hoteles, trenes, ferries, coches. 21+ proveedores, sin API keys. 1 herramienta inteligente vs 66 individuales. *Comercial: EUR 500/mes. | Sí — ~47★ |
| [opentraveldata](https://github.com/opentraveldata) | Apache-2.0 | Organización con datos abiertos de viajes: aeropuertos, aerolíneas, rutas, tarifas. Fundacional para cualquier producto de viajes. | Sí — varios repos |
| [nicolv23/OpenHotelFR](https://github.com/nicolv23/OpenHotelFR) | MIT | App web Python/Flask para gestión hotelera. Ligera, buena base para prototipos y demos en LATAM. | Sí — ~1★ |

## Por qué estos repos

### QloApps
El PMS open source más maduro y usado a nivel global para hoteles boutique e independientes. Permite arrancar con un sistema funcional de reservas en días. Ideal como base para añadir:
- Chatbot de reservas conversacional
- Revenue management con AI
- Personalización de tarifas

### HAIP
El proyecto más ambicioso: un PMS moderno con AI nativa. Sus 12 agentes cubren las áreas de mayor ROI en hospitalidad:
- **Demand Forecasting Agent**: predicción de ocupación
- **Dynamic Pricing Agent**: ajuste de tarifas en tiempo real
- **Cancellation Prediction Agent**: retención proactiva
- **Night Audit Anomaly Detection**: control financiero
- **Guest Communication Agent**: mensajería personalizada

### Duffel (API, no OSS pero fundacional)
Post-sunset Amadeus SS, [Duffel](https://duffel.com) es la referencia para vuelos: $3/orden, NDC nativo, sandbox gratuito con Duffel Airways. Migración limpia desde amadeus-python.

### opentraveldata
Datos estructurados de aeropuertos, rutas, aerolíneas y schedule. Esencial para cualquier agente que necesite razonar sobre conectividad aérea sin depender de APIs de pago.

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
