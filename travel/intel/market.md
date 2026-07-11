# 🗺️ Mapa de mercado — Travel & Hospitality

> Players, oportunidades, posicionamiento. Foco LATAM + global.
> Última actualización: 2026-07-11 (v9)

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
| % VC travel funding a AI-enabled (H1 2025) | 45% (vs 10% en 2023) | Skift |
| Bookings AI por agentes (by 2030) | 30% del total | IDC |
| % AI budgets hospitality → personalización (2030) | 50% | IDC |
| Aumento satisfacción huésped con AI (2030) | +25% | IDC |
| Viajeros US usando AI tools (late 2025) | 58% | Phocuswright |
| Viajeros US usando AI para travel research | 39% | Phocuswright |
| Empresas travel experimentando con agentic AI | 60%+ | Phocuswright |
| Viajeros abiertos a usar más AI | 62% | Kantar |
| McKinsey: valor agentic AI multi-industria | USD 2.6T–4.4T/año | McKinsey |

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
- Búsqueda: OTAIP (75 agentes), LetsFG (vuelos), Dida MCP (hoteles)
- Booking: HAIP (hotel), langgraph-travel-agent (Amadeus + Hotelbeds)
- Post-viaje: wanderlog-mcp (gestión itinerario), Mem0 (memoria entre viajes)

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
|---------------|-----------|-----------------|
| AI Travel Concierge para cadena hotelera regional | HAIP + Claude (WhatsApp gateway) | 4-8 meses |
| Agente de búsqueda de viajes WhatsApp-first | Dida MCP + LetsFG + Twilio + LangGraph | 4-8 meses |
| OTA/Agencia digital AI-native | OTAIP + Claude + HAIP | 6-12 meses |
| Sales Copilot para agencia de viajes corporativa | Wander-Desk + Claude + HubSpot | 3-6 meses |
| Revenue management AI para aerolínea | PROS-like, custom ML + agentic pricing | 12-18 meses |
| Tour operator en LATAM digitalizado | ExcursioX + Claude + OPTD | 4-8 meses |

---
*Fuentes: Skift, McKinsey, IDC, MarketIntelo, Research & Markets, Phocuswright, Kantar, TripGenie, Dida.*
