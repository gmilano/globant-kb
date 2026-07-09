# 📡 Tendencias — Travel & Hospitality AI

> Última actualización: 2026-07-09 (v6 — +4 nuevas tendencias: trvl, Google AI Mode confirmed, LATAM airlines, vibe-based)

## T1 — Agentic Booking: del chatbot al agente que compra por ti
**Señal**: Sabre + MindTrip + PayPal — primer pipeline agentic E2E en producción (mayo 2026)  
**Trust gap**: Solo 2% de consumidores US confía en AI para booking autónomo. 80% ejecutivos planean deploy.  
**Nuevo**: 61% millennials/Gen Z dispuestos a delegar trip planning a AI (2026). 38% más conversión vs funnel tradicional.  
**Horizonte**: IDC estima 30% de bookings por AI agents para 2030. Agentic AI Travel Booking market: $2.1B → $12.1B CAGR 22.5%.

## T2 — MCP como protocolo estándar de inventario de viaje
**Señal**: Sabre Mosaic MCP (mayo 2026), DIDA Hotel MCP (julio 2026), trvl (julio 2026), fli (2026), mcp_travelassistant (2026).  
**Stack emergente 2026**: trvl + DIDA Hotel MCP + fli + mcp_travelassistant = travel agent completo sin API keys.  
**Por qué MCP gana**: 98.9% ahorro de tokens (trvl: 1 tool vs 65 herramientas individuales = 378 vs 33,500 tokens).

## T3 — LLMs integrados en OTAs (Expedia x Claude, Google AI Mode incoming)
**Señal**: Expedia + Claude lanzado junio 2026 (US). Google AI Mode: Booking.com + Choice Hotels + Expedia + IHG + Marriott + Wyndham confirmados.  
**LATAM**: Despegar SOFIA (multimodal GenAI) en producción. Decolar + Best Day + Viajes Falabella incluidos en el mismo ecosistema.  
**Para Globant**: agencias independientes LATAM que no pueden hacer lo que hace Despegar = mayor oportunidad de mercado no atendido.

## T4 — Business Travel leads, Leisure follows
**Señal**: McKinsey 2026 — corporate travel adopta agentic AI más rápido por safeguards corporativos.  
**Nuevo**: Corporate travel market = $1.5T global 2026. Navan Edge para viajeros no-gestionados. "Vibe-based booking" emergiendo.  
**Oportunidad Globant**: Corporate travel management AI para empresas LATAM medianas (500-5k empleados) — Navan-like con stack OS.

## T5 — AEO (Answer Engine Optimization) reemplaza parte del SEO
**Señal**: Google AI Mode travel + Claude con Expedia = AI search como canal de descubrimiento.  
**Urgencia alta**: Google AI Mode partners confirmados. Hoteles/OTAs sin schema.org serán invisibles.  
**Stack AEO**: Schema.org/LodgingBusiness + JSON-LD + FAQ pages + precios sin login + audit tool (P8 en patterns.md).

## T6 — Disruption Management Proactivo
**Señal**: LATAM Airlines usando ML + cloud-native para prevenir disrupciones en todas las Américas (jun 2026). Delta, United en producción (US).  
**Stack open source**: OpenSky API (gratis) + GTFS-Realtime + LangGraph + Amadeus rebooking API.  
**Nuevo**: LATAM Airlines = referencia regional validada. Avianca, Copa, GOL (post-reestructuración), Azul = próximos candidatos.

## T7 — WhatsApp como canal principal en LATAM
**Señal**: 95%+ de penetración de WhatsApp en Argentina, Brasil, México, Colombia.  
**Stack**: Twilio WhatsApp + Claude API + LangGraph + trvl MCP (sin API keys) = travel agent en WhatsApp.  
**Nuevo**: trvl elimina la necesidad de Amadeus/Hotelbeds para POCs de WhatsApp — simplifica el stack inicial.

## T8 — Routing AI multimodal para ciudades LATAM
**Señal**: OpenTripPlanner v2.9.0 (marzo 2026). Ciudades LATAM con GTFS públicos: Bogotá, CDMX, Lima, Santiago, Buenos Aires, São Paulo.  
**Oportunidad**: Municipios y operadores de transporte LATAM buscan modernizar experiencia. Sin competencia de AI local.

## T9 — Revenue Management AI para hotelería LATAM
**Stack**: scikit-learn + Claude (interpretación) + competitor scraper + Amadeus Max (NLQ).  
**Nuevo**: Amadeus Max (HITEC jun 2026) = revenue data por pregunta en lenguaje natural. Para cadenas que ya usan Amadeus.  
Hoteles que no pueden pagar IDeaS o Duetto pueden usar open source + Claude para pricing.

## T10 — Visa & Requirement Agent (LATAM-specific)
**Stack**: RAG sobre bases de datos de visas (IATA Travel Centre) + Claude + actualización periódica.  
Diferenciador para agencias LATAM por la complejidad de visas en la región.

## T11 — Multi-agent para itinerarios personalizados
**Adopción**: CrewAI + LangGraph como estándar. Referencias: naakaarafr/AI-Travel-Agent-Advanced, Ctrip-Style, mcp_travelassistant.  
Especialistas (flight, hotel, activity, weather, budget) producen mejores resultados que un único LLM generalista.

## T12 — EU AI Act impacto en travel (deadline agosto 2026)
**Deadline**: 2 agosto 2026. Pricing dinámico en aerolíneas/hoteles = potential high-risk en EU.  
Cualquier solución para clientes europeos necesita audit trail + explicabilidad.

## T13 — Safe Travel AI Agents
**Stack**: RAG sobre OSAC, CDC travel alerts + Claude + notification pipeline.  
Alto valor en segmentos premium y viajeros de negocios.

## T14 — trvl y el "terminal travel agent": zero-API-key pattern ⭐ NUEVO v6
**Señal**: trvl (MikkoParkkola/trvl, MIT, jul 2026) — Go binary, 1 MCP tool = 65 capacidades. Google Flights + Hotels + Airbnb + Booking + ferries + trenes EU + lounges + alerts. Sin API keys.  
**Patrón nuevo**: Desarrollar travel agents con cero dependencia de APIs externas en fase de prototipado. Cuando el cliente decide escalar, se migra a APIs enterprise (Sabre, Amadeus) sin cambiar el LLM ni el orchestrator.  
**Implicación**: Globant puede demostrar un travel agent funcional completo en < 30 minutos de setup. Reducción de fricción para venta.

## T15 — LATAM Airlines / Despegar: de early adopters a referencia regional ⭐ NUEVO v6
**Señal**: LATAM Airlines AI Virtual Agent (Google Vertex AI) en producción en Chile, Colombia, Perú, Ecuador. Despegar SOFIA multimodal live en todo LATAM.  
**Por qué importa**: Ya no es necesario justificar la viabilidad del AI en travel en LATAM. Los líderes regionales ya lo hicieron.  
**Nuevo framing**: "Nosotros hacemos para [Avianca / Copa / agencia regional] lo que Google Vertex hizo para LATAM Airlines, con stack open source y sin vendor lock-in."

## T16 — Vibe-based booking y digital identity wallets ⭐ NUEVO v6
**Señal**: Navan introduce vibe-based booking (2026) — usuario describe la "vibra" del viaje; AI filtra opciones reales. Digital identity wallets emergiendo para one-click agent booking con credenciales verificadas + preferencias + payment.  
**Implicación**: La UX del booking agéntico evoluciona de "formulario en chat" a "intención-to-booking". Los agentes necesitarán acceder y mantener perfiles de usuario detallados (cf. trvl preferences.json como modelo minimalista).

---

## Prioridades Globant Travel AI (actualización v6)

| Tendencia | Urgencia | Esfuerzo | Revenue potencial | Nuevo en v6 |
|-----------|----------|----------|-------------------|-------------|
| T14 trvl zero-API-key | Alta | Muy Baja | Medio (reducción fricción ventas) | ✓ |
| T15 LATAM ref regional | Alta | Baja | Alto (narrative change) | ✓ |
| T2 MCP inventory stack | Alta | Baja | Medio | |
| T3 OTA conversational | Alta | Media | Alto | |
| T4 Corporate travel LATAM | Alta | Media | Alto | |
| T7 WhatsApp agent | Alta | Baja | Medio-Alto | |
| T5 AEO optimization | Alta | Baja | Medio | |
| T6 Disruption management | Media | Alta | Alto | |
| T16 Vibe-based + wallets | Media | Media | Medio (2027 horizonte) | ✓ |
| T10 Visa & Requirements | Media | Media | Medio | |
| T8 Routing LATAM cities | Baja-Media | Media | Medio | |
