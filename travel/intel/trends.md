# 📡 Tendencias — Travel & Hospitality AI (julio 2026)

> Última actualización: 2026-07-10

## T1 — Agentic booking: hype vs. realidad
80% de los ejecutivos travel planean desplegar agentes autónomos de booking en 2026. Solo 2% de consumidores US los usaría en su estado actual. La oportunidad está en **asistencia aumentada** (el agente hace propuestas, el humano confirma) — no en autonomía total. Booking.com, Expedia y Google Travel están en esta carrera.

**Implicación para Globant:** Proyectos de "autonomous booking" para aerolíneas/OTAs son prioritarios. El patrón human-in-the-loop es el safe bet para 2026.

## T2 — NDC generalizándose, GDS en transformación
New Distribution Capability (NDC) de IATA ya es estándar para aerolíneas de nivel 1. Sabre y Amadeus tienen certificación Level 3. Los adaptadores NDC open source (OTAIP) están reduciendo la barrera para conectar directamente con aerolíneas sin GDS fee.

**Implicación:** Proyectos de modernización NDC son fáciles de vender a aerolíneas mid-tier que pagan fees de distribución altos.

## T3 — MCP como protocolo estándar para datos travel
Los MCP servers de viaje (LetsFG, DIDA hotel, swiss-transport-mcp) están emergiendo como el estándar de facto para conectar datos de inventario a agentes AI. Cualquier agente compatible con MCP puede consumir vuelos, hoteles y transporte sin código custom.

**Implicación:** La estrategia de integración travel debe pasar por MCP primero. Desarrollar adaptadores MCP para sistemas legacy es un servicio con alta demanda.

## T4 — Open source PMS desafía al mercado
TelivityAI/haip es la primera amenaza real open source al mercado PMS hotelero (~$5-15/room/month para Opera, Mews, etc.). Hoteles independientes en mercados emergentes no pueden pagar PMS cloud; HAIP les da alternativa.

**Implicación:** Integrar y customizar HAIP para clientes hoteleros en LATAM es una propuesta única. El mercado de hoteles boutique en Buenos Aires, México DF, Bogotá no tiene un player tech regional fuerte.

## T5 — Multimodal travel planning: vuelo + tren + bus
Los agentes de viaje están dejando de ser solo flight/hotel. La integración de transporte terrestre (swiss-transport-mcp para Europa, APIs de Redbus para LATAM) permite planificación door-to-door real. Marriott e IHG ya integran transfers y transporte local en sus sistemas.

## T6 — IRROPS automation: el mayor ROI para aerolíneas
Irregular Operations (IRROPS) — rebooking en cancelaciones y delays — cuesta a las aerolíneas $9B+ anuales en compensaciones y pérdida de clientes. OTAIP automatiza este flujo con EU261/US DOT compliance. Es el caso de uso con ROI más claro para AI en aerolíneas.

**Implicación:** Pitch para aerolíneas: IRROPS automation con OTAIP = payback < 6 meses en casos de uso típicos.

## T7 — Corporate travel AI: approval workflows
El mercado de Travel Management Companies (TMC) está adoptando AI para aprobaciones automáticas de viajes, policy compliance y expense prediction. GitHub: jongalloway/travel-booking-agents es el patrón de referencia. Netsuite/SAP Concur + agentes = mercado underserved.

## T8 — Hotel revenue management AI
La anticipación dinámica de demanda y pricing en tiempo real (yield management) es el uso de AI más maduro en hotelería. Hoteles con más de 50 rooms están adoptando herramientas como Duetto y IDeaS pero sin acceso a alternativas open source. HAIP + modelos de ML propio puede democratizarlo.

## T9 — AI travel data quality: "garbage in, garbage out"
Todos los analistas coinciden: "AI needs clean data." Las aerolíneas y hoteles tienen décadas de datos en sistemas legacy mal estructurados. El primer paso antes de cualquier proyecto AI es data governance. OpenTravelData es la referencia para datos maestros limpios.

## T10 — Sostenibilidad y carbon footprint en booking
Los agentes de viaje están incorporando calculo de huella de carbono en tiempo real. Skyscanner, Google Flights y Expedia ya muestran emisiones por vuelo. Los agentes AI que no incluyan esta información quedarán fuera de política de muchas empresas europeas.

## T11 — Voice-first travel agents
Con Alexa+, Google Assistant y Claude Voice madurando, los agentes de viaje por voz están tomando tracción. Booking by voice requiere confirmaciones de alta confianza — el patrón de "lee en voz alta el itinerario, pide confirmación explícita antes de cobrar" es el estándar emergente.

## T12 — Personalización con privacy-first
Las cookies de terceros están deprecadas. Los agentes travel deben construir perfiles de preferencias primero-cero (zero-party data): el agente pregunta activamente al viajero sus preferencias en lugar de inferirlas de tracking. Patrón: onboarding conversacional + preferencias almacenadas en local storage o wallet.

## T13 — B2B hotel inventory democratizado vía AI
DIDA Travel abriendo su inventario B2B como MCP server es una señal: los wholesale hoteleros están viendo AI/MCP como canal de distribución del futuro. El modelo tradicional de XML B2B está siendo reemplazado por MCP servers públicos con autenticación simple.

## T14 — LATAM: mercado en construcción
En LATAM no hay un equivalente a Booking.com, Expedia o Google Travel con la misma penetración. Despegar (Argentina/LATAM) y Almundo son los players más grandes pero con tech legacy. Hay espacio para una OTA AI-native construida sobre stacks open source (OTAIP + HAIP + DIDA MCP).

## T15 — Agentic AI y el "travel agent" digital
La profesión de agente de viajes humano está siendo redefinida: de "reservador" a "curador de experiencias complejas". Los agentes AI hacen el trabajo de reserva básica; los humanos manejan los casos complejos (grupos, eventos, viajes médicos). Las TMCs que entiendan esto y construyan herramientas AI para sus consultores (no contra ellos) ganarán.

---
*Actualizado automáticamente por el pipeline de ingest.*
