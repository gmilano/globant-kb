# 📡 Tendencias — Travel & Hospitality

> Última actualización: 2026-07-11 (v9)

## Tendencias clave 2026

### T1 — Agentic AI ejecuta bookings (no solo recomienda)
- IDC: 30% de los bookings de viaje serán ejecutados por AI agents para 2030
- Trip.com/TripGenie: 60% de interacciones ya son booking-related
- Phocuswright: 60%+ de empresas travel experimentando con agentic AI
- Kantar: 40% de viajeros ya usan AI tools para planificación; 62% abiertos a usar más
- El gap: business travel lidera (safeguards corporativos), leisure market desconfía (~30%)
- **Implicación Globant**: diseñar agentes con "human-in-the-loop" como opción configurable

### T2 — MCP como protocolo de travel tech
- Julio 2026: Dida lanza primer MCP gateway B2B (2M+ hoteles, 3er mayor B2B travel del mundo)
- Microsoft Azure lanza azure-ai-travel-agents como referencia enterprise con MCP
- Airbnb MCP server: AI agents buscan alojamiento sin API key
- Expedia B2B MCP server: anunciado, permitirá a partners conectar AI agents al inventario de Expedia
- Ecosistema: wanderlog-mcp, mcp_travelassistant, LetsFG MCP — creciendo rápido
- AltexSoft: "MCP está cambiando cómo las plataformas de travel acceden a datos en tiempo real"
- **Implicación Globant**: construir con MCP desde el día 1 para cualquier cliente travel

### T3 — AI-native PMS vs. AI bolt-on
- HAIP: primer PMS hotel donde los agentes AI son "ciudadanos de primera clase" desde la arquitectura
- 12 agentes nativos (pricing dinámico, predicción cancelaciones, housekeeping scheduling, etc.)
- OTAIP: orquestación de 75 agentes en 12 etapas para OTAs/agencias — domain-specific
- Contraste con soluciones tradicionales: añaden AI como feature, no como fundamento
- **Implicación Globant**: diferenciarse con arquitecturas AI-native, no AI bolt-on

### T4 — Agent-native flight search (sin markup de OTA)
- LetsFG: 400+ aerolíneas via NDC/GDS en paralelo; $20-50 más barato que Booking.com/Kayak
- Los agentes AI acceden a precios de aerolínea directamente, sin intermediario OTA
- Modelo: MCP Server + SDK para integrar en cualquier agente
- Amenaza para OTAs: IDC y PYMNTS notan que "AI travel agents pack a threat for travel aggregators"
- **Implicación Globant**: integrar LetsFG como componente de búsqueda de vuelos en agentes de viaje

### T5 — Google AI Mode booking (anunciado, pendiente launch)
- Google anunció booking agentico de vuelos/hoteles en AI Mode
- Usuario describe viaje → IA compara vuelos/hoteles reales → booking sin cambiar de pestaña
- Google NO será merchant of record; transacciones van a Booking.com, Expedia, Marriott, IHG, Wyndham
- Como Jun 2026: no lanzado públicamente, sin fecha confirmada
- **Implicación Globant**: el inventario de los clientes hoteleros/aéreos necesita estar listo para agentes (structured data, direct API)

### T6 — Pricing dinámico AI (airlines + hotels)
- Shift de sistemas rule-based hacia pricing personalizado y multi-canal
- HAIP: agente de pricing dinámico nativo en el PMS
- PROS: "next leap in airline offer creation via agentic AI"
- Crecimiento fuerte en patentes de AI pricing en aerolíneas (2026)
- **Implicación Globant**: oportunidad con aerolíneas LATAM para revenue management AI

### T7 — Memoria persistente entre viajes
- Los agentes más avanzados recuerdan preferencias entre sesiones y viajes
- TripGenie: +45% tasa de revisita a 7 días con AI que recuerda
- IDC: 50% de presupuestos AI en hospitality irán a personalización para 2030
- Stack de memoria: Mem0 (Apache-2.0), Zep, MemGPT
- **Implicación Globant**: incluir capa de memoria en todos los agentes de viaje

### T8 — WhatsApp como canal de booking en LATAM
- >90% penetración WhatsApp en Brasil, México, Colombia, Argentina
- Turistas esperan reservar por chat; baja penetración de apps nativas
- HAIP tiene ChatGPT gateway integrado para booking conversacional
- Twilio WhatsApp + LangGraph + MCP = stack completo de travel agent por WhatsApp
- **Implicación Globant**: diferenciación regional con agentes Spanish-native en WhatsApp

### T9 — Disruption management autónomo
- Agentes de nueva generación manejan disrupciones: vuelo cancelado → alternativas → rebook → notificación
- langgraph-travel-agent: Amadeus + Twilio para rerouting en tiempo real
- "Military-grade SOS protocols" en algunos proyectos emergentes
- **Implicación Globant**: sell to airlines/hotels como "disruption management agent"

### T10 — Turismo regenerativo + sostenibilidad
- Viajeros (especialmente Millennials/Gen Z) buscan viajes con impacto positivo
- AI para calcular huella de carbono, sugerir alternativas sostenibles, conectar con comunidades locales
- Tendencia creciente en 2026 especialmente en LATAM (ecoturismo)
- **Implicación Globant**: diferenciación con "sustainable travel agent" para operadores eco

### T11 — Consolidación GDS vs Direct Connect
- Amadeus primer target multi-año EPS (2026-2028): AI como driver de distribución
- Agentic AI podría bypassear GDS conectando directamente con aerolíneas via NDC
- LetsFG: 195 conectores directos NDC como alternativa al GDS tradicional
- Tensión entre distribución tradicional (GDS) y direct connect via MCP/API
- **Implicación Globant**: clientes aerolínea quieren Direct Booking API con AI layer

## Tendencias confirmadas desde v8 (jul 2026)

| Tendencia | Estado | Update |
|-----------|--------|--------|
| AI in Tourism USD 13.38B por 2030 CAGR 28.7% | ✅ Confirmado | Agentic AI booking market añade +$12.1B layer |
| Agentic AI como diferenciador | ✅ En ejecución | TripGenie 400% YoY; 60%+ empresas travel experimentando |
| MCP para travel APIs | ✅ Acelerado | Dida MCP + Airbnb MCP + Expedia B2B MCP anunciado |
| WhatsApp LATAM | ✅ Validado | HAIP tiene ChatGPT gateway integrado |
| AI-native PMS | ✅ Confirmado | HAIP: primer PMS con 12 agentes AI nativos de serie |

---
*Fuentes: IDC, McKinsey, Skift, AltexSoft, Phocuswright, Kantar, PYMNTS, TravelDailyNews, eHotelier, PROS, Trip.com.*
