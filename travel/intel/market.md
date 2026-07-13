# 🗺️ Mapa de mercado — Travel & Hospitality

> Players, oportunidades, posicionamiento. Foco LATAM + global.
> Última actualización: 2026-07-13 (v10)

## Cifras clave del mercado (2026)

| Métrica | Valor | Fuente |
|---------|-------|--------|
| AI en turismo (2024) | USD 2.95B | Research & Markets |
| AI en turismo (2030) | USD 13.38B | Research & Markets |
| CAGR AI turismo (2024-2030) | 28.7% | Research & Markets |
| Agentic AI travel booking platforms (2025) | USD 2.1B | MarketIntelo |
| Agentic AI travel booking platforms (2034) | USD 12.1B | MarketIntelo |
| CAGR Agentic AI travel booking (2026-2034) | 22.5% | MarketIntelo |
| Travel Agency Services (2025) | USD 464.91B | Research & Markets |
| Travel Agency Services (2026) | USD 500.22B | Research & Markets |
| Online Travel Agencies revenue (2026) | ~USD 107B | Skift |
| % VC travel funding a AI-enabled (H1 2025) | 45% (vs 10% en 2023) | McKinsey/Skift |
| Bookings AI por agentes (by 2030) | 30% del total | IDC |
| % AI budgets hospitality → personalización (2030) | 50% | IDC |
| Aumento satisfacción huésped con AI (2030) | +25% | IDC |
| Viajeros US usando AI tools (late 2025) | 58% | Phocuswright |
| Viajeros US usando AI para travel research | 39% | Phocuswright |
| Empresas travel experimentando con agentic AI | 60%+ | Phocuswright |
| Viajeros abiertos a usar más AI | 62% | Kantar |
| McKinsey: valor agentic AI multi-industria | USD 2.6T–4.4T/año | McKinsey |
| Smart hospitality market (2024) | USD 16.45B | HITEC 2026 |
| Smart hospitality market (2030) | USD 52B+ | HITEC 2026 |
| Ejecutivos que dan crédito a AI por productividad | ~60% | McKinsey/Skift "Remapping Travel" |
| AI-driven visitors que llegan al booking engine | 44.7% (vs 25.9% orgánico) | HITEC 2026 |
| Global business travel spend (2026) | USD 1.64T | GBTA BTI Outlook |
| Corporate travel programs con automation | 67% (vs 49% en 2022) | StealthAgents 2026 |
| Corp. travel con real-time AI policy enforcement | 31% | StealthAgents 2026 |
| Ahorro AI en procesamiento de expense reports | 74% ($6.85 vs $26.63) | StealthAgents 2026 |
| AI-enabled travel programs: savings range | 8–15% | Business Travel News 2026 |
| Mayores empresas travel que citan AI en annual reports | 35% (2024, vs 4% en 2022) | McKinsey |

## Players globales

| Empresa | Tipo | Fortaleza AI | Modelo |
|---------|------|--------------|--------|
| **Trip.com / TripGenie** | OTA + AI-native | 400% crecimiento YoY en bookings AI; 60% interacciones son booking-related; -80% clicks en comparación hoteles | Agentic AI end-to-end: search → book |
| **Amadeus** | GDS / Travel Tech | Primer target multi-año EPS (2026-2028); AI + cloud como drivers. Infraestructura para 1/3 de vuelos mundiales | B2B SaaS + API |
| **Booking.com / Expedia** | OTA | Inversión fuerte en agentic AI; Expedia B2B MCP server anunciado (para partners de AI) | OTA tradicional evolucionando a infra de AI |
| **Dida Holdings** | B2B Travel Infra | Lanzó primer MCP gateway B2B (9 jul 2026); 2M+ hoteles; 3er mayor B2B travel | Wholesale B2B + MCP |
| **Google Travel** | Superdistributor | Gemini + AI Mode para búsqueda y booking de vuelos/hoteles (anunciado, pendiente launch); partners: Booking.com, Expedia, Marriott, IHG, Wyndham | Plataforma de plataformas |
| **Microsoft (Azure)** | Tech + AI | azure-ai-travel-agents como referencia enterprise; GPT-4o + MCP | Enterprise B2B |
| **Airbnb** | Alojamiento alternativo | MCP server público: AI agents pueden buscar alojamiento sin API key | P2P marketplace |
| **PROS** | Revenue Management | Agentic AI para offer creation en aerolíneas (pricing dinámico, ancillaries) | Software B2B aerolíneas |
| **TelivityAI** | AI Travel Infra | HAIP (hotel PMS AI-native) + OTAIP (OTA agents) — OSS Apache-2.0 | Open-source platform |
| **Apaleo** | PMS Cloud + AI Hub | Primer PMS comercial con MCP server nativo + Apaleo Agent Hub (marketplace de agentes AI). API-first, arquitectura abierta. | SaaS hotelero + marketplace |
| **Skift + McKinsey** | Research | "Remapping Travel with Agentic AI" (2026) — informe estratégico de referencia; 1,002 viajeros + 86 ejecutivos encuestados. | Inteligencia de mercado |

## Cadena de valor y dónde entra AI

```
[Inspiración] → [Búsqueda] → [Comparación] → [Booking] → [Viaje] → [Post-viaje]
     ↓               ↓              ↓              ↓           ↓            ↓
  GenAI + RAG    Multimodal    Agentic AI      Autónomo    IoT + AI     Memory AI
  (destino por  (imagen →      (compara y      (book sin   (soporte,    (preferencias
   imagen)       destino)       recomienda)     clicks)     SOS)         para próximo)
```

**Proveedores OSS por etapa**:
- Inspiración: Multi-Agent-AI-Travel-Advisor (RAG sobre destinos), LangGraph template
- Búsqueda: OTAIP (75 agentes), LetsFG (vuelos), Dida MCP (hoteles), trvl (21 providers)
- Booking: HAIP (hotel), langgraph-travel-agent (Amadeus + Hotelbeds), Agentic-Travel-Planner
- Post-viaje: wanderlog-mcp (gestión itinerario), Mem0 (memoria entre viajes), tripadvisor-mcp (reviews)

## Oportunidades AI en LATAM

| Oportunidad | Contexto | Tamaño |
|-------------|----------|--------|
| **WhatsApp Travel Commerce** | >90% penetración de WhatsApp en LATAM; viajeros esperan booking por chat | Alto: Brasil, México, Colombia, Argentina |
| **Operadores turísticos pequeños** | Fragmentación: miles de tour operators sin tecnología. AI puede democratizar acceso | Alto: Perú, Colombia, México |
| **Turismo de naturaleza / aventura** | LATAM tiene 40% de la biodiversidad mundial. Poco digitalizado. | Medio-Alto: Costa Rica, Colombia, Ecuador, Perú |
| **Corporativo regional** | Empresas multinacionales con travel managers; alta demanda de automatización | Alto: Brasil, México, Argentina |
| **Idioma español** | Falta de agentes de viaje AI nativos en español | Alto: toda Hispanoamérica |
| **LATAM Airlines / Avianca** | Aerolíneas con loyalty + datos de vuelo; oportunidad de ancillary AI | Medio: Colombia, Chile, Perú |
| **Hotel PMS modernización** | Miles de hoteles en LATAM con PMS legacy sin AI; HAIP como alternativa OSS | Alto: Caribe, México, Brasil |

## Dónde puede entrar Globant

| Proyecto tipo | Tecnología | Tamaño estimado |
|---------------|-----------|------------------|
| AI Travel Concierge para cadena hotelera regional | HAIP + Claude (WhatsApp gateway) | 4-8 meses |
| Agente de búsqueda de viajes WhatsApp-first | Dida MCP + LetsFG + Twilio + LangGraph | 4-8 meses |
| OTA/Agencia digital AI-native | OTAIP + Claude + HAIP | 6-12 meses |
| Sales Copilot para agencia de viajes corporativa | Wander-Desk + Claude + HubSpot | 3-6 meses |
| Corporate Travel Policy Agent | Agentic-Travel-Planner + LangGraph + Policy Engine | 2-3 meses |
| Revenue management AI para aerolínea | PROS-like, custom ML + agentic pricing | 12-18 meses |
| Tour operator en LATAM digitalizado | ExcursioX + Claude + OPTD | 4-8 meses |

## HITEC 2026 (junio, San Antonio) — Señales clave

HITEC 2026 reunió 6,000+ ejecutivos de hospitality. Tema dominante: **"de la experimentación a la implementación"**.

| Señal | Detalle |
|-------|----------|
| "Vibe operating" | Nuevo término para AI operationalizado en hoteles — agentes que actúan, no solo recomiendan |
| Cuello de botella = datos, no modelo | La mayor limitante es la conectividad de datos, no la calidad del LLM |
| AI-driven booking convierte más | 44.7% de visitantes AI-driven llegan al booking engine (vs 25.9% de organic search) |
| Smart hospitality $16.45B → $52B (2030) | IoT + AI + conectividad = mercado de $52B proyectado para 2030 |
| Apaleo Agent Hub lanzado | Primer marketplace de agentes AI para hospitalidad — modelo a seguir |
| Amadeus anuncia nuevas AI tools para hoteles | Presentado en HITEC, enfocado en revenue management y personalización |
| El software ahora actúa autónomamente | "El software que resumía reseñas ahora responde al huésped, trabaja el lead, y mueve el precio solo" |

## McKinsey/Skift — "Remapping Travel with Agentic AI" (2026)

Informe de referencia: 1,002 viajeros + 86 ejecutivos travel encuestados.

- En 2022: 4% de las empresas travel más grandes citaban AI en sus reportes anuales → 2024: 35%.
- VC funding para travel: 10% AI-enabled (2023) → 45% AI-enabled (H1 2025).
- Cerca del 60% de ejecutivos atribuye a AI mejoras de productividad.
- Gen AI = consejero (aconseja); Agentic AI = reporte directo (ejecuta).

---
*Fuentes: Skift, McKinsey, IDC, MarketIntelo, Research & Markets, Phocuswright, Kantar, TripGenie, Dida, HITEC 2026, GBTA, Business Travel News, StealthAgents.*
