# 📡 Tendencias — Travel & Hospitality AI

> Última actualización: 2026-07-09 (v5 — era agentic booking)

## T1 — Agentic Booking: del chatbot al agente que compra por ti
**Señal**: Sabre + MindTrip + PayPal — primer pipeline agentic E2E en producción (mayo 2026)  
**Trust gap**: Solo 2% de consumidores US confía en AI para booking autónomo. 80% ejecutivos planean deploy.  
**Horizonte**: IDC estima 30% de bookings por AI agents para 2030.

## T2 — MCP como protocolo estándar de inventario de viaje
**Señal**: Sabre Mosaic expone MCP server (mayo 2026). DIDA Hotel MCP (julio 2026). hotels_mcp_server (julio 2026).  
**Stack emergente**: Claude + Sabre MCP + DIDA Hotel MCP + OTP GraphQL = booking agent completo.

## T3 — LLMs integrados en OTAs (Expedia x Claude, Booking x Google)
**Señal**: Expedia + Claude lanzado junio 2026 (US). Google AI Mode con Booking.com + 4 cadenas hoteleras (pending).  
**Para LATAM**: Despegar y Decolar son candidatos naturales para el mismo modelo.

## T4 — Business Travel leads, Leisure follows
**Señal**: McKinsey 2026 — corporate travel adopta agentic AI más rápido por safeguards corporativos.  
**Oportunidad Globant**: Corporate travel management AI para empresas LATAM medianas — Navan-like, pero local.

## T5 — AEO (Answer Engine Optimization) reemplaza parte del SEO
**Señal**: Google AI Mode en travel + Claude con Expedia = AI search como canal de descubrimiento.  
**Implicación**: Las marcas que no expongan datos en formato AI-legible serán invisibles en AI search.

## T6 — Disruption Management Proactivo
**Señal**: Delta, United usando AI para rebooked antes de que el pasajero lo pida.  
**Stack open source**: OpenSky API (gratis) + GTFS-Realtime + LangGraph + Amadeus rebooking API.

## T7 — WhatsApp como canal principal en LATAM
**Señal**: 95%+ de penetración de WhatsApp en Argentina, Brasil, México, Colombia.  
**Stack**: Twilio WhatsApp + Claude API + LangGraph + Amadeus/DIDA MCP = travel agent en WhatsApp.

## T8 — Routing AI multimodal para ciudades LATAM
**Señal**: OpenTripPlanner v2.9.0 (marzo 2026). Ciudades LATAM con GTFS públicos: Bogotá, CDMX, Lima.  
**Oportunidad**: Municipios y operadores de transporte LATAM buscan modernizar experiencia.

## T9 — Revenue Management AI para hotelería LATAM
**Stack**: scikit-learn + Claude (interpretación) + competitor scraper.  
Hoteles que no pueden pagar IDeaS o Duetto pueden usar open source + Claude para pricing.

## T10 — Visa & Requirement Agent (LATAM-specific)
**Stack**: RAG sobre bases de datos de visas (IATA Travel Centre) + Claude + actualización periódica.  
Diferenciador para agencias LATAM por la complejidad de visas en la región.

## T11 — Multi-agent para itinerarios personalizados
**Adopción**: CrewAI + LangGraph como estándar. Referencias: naakaarafr/AI-Travel-Agent-Advanced, Ctrip-Style.  
Especialistas (flight, hotel, activity, weather) producen mejores resultados que un único LLM generalista.

## T12 — EU AI Act impacto en travel (deadline agosto 2026)
**Deadline**: 2 agosto 2026. Pricing dinámico en aerolíneas/hoteles = potential high-risk en EU.  
Cualquier solución para clientes europeos necesita audit trail + explicabilidad.

## T13 — Safe Travel AI Agents
**Stack**: RAG sobre OSAC, CDC travel alerts + Claude + notification pipeline.  
Alto valor en segmentos premium y viajeros de negocios.

---

## Prioridades Globant Travel AI

| Tendencia | Urgencia | Esfuerzo | Revenue potencial |
|-----------|----------|----------|-------------------|
| T2 MCP inventory servers | Alta | Baja | Medio |
| T3 OTA conversational layer | Alta | Media | Alto |
| T4 Corporate travel LATAM | Alta | Media | Alto |
| T7 WhatsApp agent | Alta | Baja | Medio-Alto |
| T6 Disruption management | Media | Alta | Alto |
| T5 AEO optimization | Media | Baja | Medio |
| T10 Visa & Requirements agent | Media | Media | Medio |
| T8 Routing LATAM cities | Baja-Media | Media | Medio |
