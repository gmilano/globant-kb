# 🏭 Verticales de partida — Travel & Hospitality

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-10

## Plataformas recomendadas

| Plataforma | Licencia | URL | Stack | Caso de uso | Usuarios/escala |
|------------|----------|-----|-------|-------------|-----------------|
| **HAIP** (Hotel AI Platform) | Apache-2.0 | [github.com/TelivityAI/haip](https://github.com/TelivityAI/haip) | TypeScript / Node.js / NestJS | PMS hotelero open source API-first. Reservas, housekeeping, revenue management, integración OTA. Base para añadir AI de pricing, yield management y concierge | Emergente — alternativa open source a Opera/Protel |
| **OTAIP** (Open Travel AI Platform) | Apache-2.0 | [github.com/TelivityAI/otaip](https://github.com/TelivityAI/otaip) | Python / multi-adapter | Orquestación de agentes travel: flight booking, IRROPS, compliance EU261/US DOT, BSP reconciliation. Para OTAs y TMCs que quieren automatizar operaciones | Emergente — usado por startups travel tech |
| **ExcursioX** | MIT | [github.com/moizkamran/ExcursioX](https://github.com/moizkamran/ExcursioX) | — | Travel CRM con ticketing, gestión de reservas y hoteles. Base para agencias que quieren añadir AI de ventas y servicio al cliente | Pequeña escala — ideal para agencias medianas |
| **PHPTRAVELS** | Open source (self-hosted) | [phptravels.com](https://phptravels.com/open-source-travel-management-software) | PHP / MySQL | Suite completa: booking engine, CRM, APIs de proveedores, vouchers, reporting. Soporta vuelos, hoteles, tours, transfers, visas. Amplia adopción en LATAM y Asia | Cientos de agencias en producción |
| **Odoo CE** | LGPL-3.0 | [github.com/odoo/odoo](https://github.com/odoo/odoo) | Python / JS | ERP/CRM generalista con módulo travel. Cubre accounting, CRM, HR, ventas. Base para agencias que necesitan back-office completo antes de añadir AI | ~41k ★, 7M+ usuarios globales |
| **Mews PMS** | Propietario (API pública) | [mews.com](https://mews.com) | Cloud SaaS | PMS hotelero moderno con API REST bien documentada. No es open source pero su API permite construir agentes AI encima. Referencia de arquitectura para haip | Miles de hoteles globales |
| **OpenTravelData** | MIT | [github.com/opentraveldata/opentraveldata](https://github.com/opentraveldata/opentraveldata) | Data files / CSV | Base de datos open de aeropuertos, aerolíneas, rutas. No es una plataforma operacional pero es indispensable como capa de datos para cualquier solución travel | ~640 ★ |
| **Duffel** | API propietaria (SDK MIT) | [github.com/duffelhq/duffel-api-python](https://github.com/duffelhq/duffel-api-python) | REST API / SDK Python | Aggregator moderno de aerolíneas NDC. SDK Python MIT. La opción más fácil para integrar booking de vuelos sin acceso directo a GDS | Creciente — usado por startups y fintechs |

---

## Cómo customizar con AI

### Estrategia recomendada por tipo de cliente

**Hoteles independientes (50-500 rooms):**
1. HAIP como PMS base (deploy propio)
2. DIDA MCP para conectar inventario de distribución
3. Agente de pricing dinámico sobre datos de HAIP
4. Concierge conversacional con Claude/GPT-4o integrado

**Agencias OTA (online travel agency):**
1. PHPTRAVELS como booking engine base
2. OTAIP para orquestar agentes de search + pricing + booking
3. LetsFG para flight search multi-fuente
4. CRM ExcursioX + agente de ventas sobre leads

**TMC (Travel Management Company) corporativo:**
1. Odoo CE como ERP/CRM base
2. jongalloway/travel-booking-agents para workflow de aprobaciones
3. Amadeus SDK (Python/Node) para acceso a tarifas corporativas GDS
4. Reporting AI sobre datos de viajes del corporativo

**Tour Operators:**
1. Odoo CE módulo travels + ExcursioX
2. Agente de itinerary generation (CrewAI/OTAIP)
3. Personalización basada en historial de cliente

---
*Actualizado automáticamente por el pipeline de ingest.*
