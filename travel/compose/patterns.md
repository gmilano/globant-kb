# 🧩 Patrones de composición — Travel & Hospitality

> Recetas concretas para construir soluciones usando los repos y agentes identificados.
> Última actualización: 2026-07-13 (v10)

## Arquitectura base

```
[Plataforma vertical] HAIP (hotel AI-native) / OTAIP (agencia/OTA) / QloApps / ExcursioX
          ↓
[Datos de viaje] OpenTravelData + LetsFG (vuelos) + Dida Hotel MCP (hoteles) + trvl (multi-proveedor)
          ↓
[Orquestador] LangGraph (datarootsio template) / azure-ai-travel-agents / OTAIP
          ↓
[MCP Servers] trvl + mcp_travelassistant + wanderlog-mcp + Dida MCP + LetsFG MCP + tripgo-mcp
          ↓
[Canal] Chat web / WhatsApp (Twilio) / API REST / Email / ChatGPT gateway (HAIP)
```

---

## Patrón P1: Hotel AI-Native Completo (HAIP + Claude)

**Caso de uso**: Cadena hotelera que quiere PMS moderno con AI de serie — no un PMS legacy con chatbot añadido.

**Stack**:
- Base: [TelivityAI/haip](https://github.com/TelivityAI/haip) (Apache-2.0) — PMS con 12 agentes AI nativos
- Canal: ChatGPT gateway integrado (booking conversacional) + WhatsApp via Twilio
- LLM: Claude (via Anthropic API) con system prompt en español para LATAM
- Pagos: Stripe (integrado en HAIP)
- Auth: Keycloak (integrado en HAIP)

**Los 12 agentes AI nativos de HAIP**:
```
1. PricingAgent       → optimiza tarifas en tiempo real (demanda, eventos, competencia)
2. CancellationAgent  → predice cancelaciones y sugiere overbooking estratégico
3. AuditAgent         → detecta anomalías en auditoría nocturna
4. HousekeepingAgent  → programa limpieza por prioridades (check-out primero, VIPs)
5. GuestCommAgent     → automatiza comunicación pre/durante/post estancia
6. ReviewAgent        → draft de respuestas a reseñas en Google/TripAdvisor
7. GroupForecastAgent → pronostica pickup de grupos y gestiona bloqueos de inventario
8. ReceivablesAgent   → prioriza cobros pendientes y genera alertas
9. RevenueAgent       → reportes de RevPAR, ADR, occupancy con narrativa AI
10. ChannelAgent      → gestiona paridad de precios en 450+ OTAs
11. BookingAgent      → booking conversacional via ChatGPT gateway
12. UpsellAgent       → sugiere upgrades / ancillaries personalizados al check-in
```

**Customización Globant**:
- Añadir agentes de loyalty, sostenibilidad, integración con sistemas regionalizados (AFIP Argentina, SAT México)
- WhatsApp-first para LATAM: huésped escribe en español, HAIP gestiona todo

**Tiempo estimado**: 6-10 semanas para MVP | **Costo infra**: ~$100-400/mes

---

## Patrón P2: AI Travel Concierge para Hotel Clásico (QloApps + LangGraph + Claude)

**Caso de uso**: Chatbot de reservas para hotel boutique con PMS legacy (QloApps).

**Stack**:
- Base: [QloApps](https://github.com/Qloapps/QloApps) (OSL-3.0) — PMS + booking engine PHP
- Orquestador: [datarootsio/langgraph-template-travel-planner](https://github.com/datarootsio/langgraph-template-travel-planner) (MIT)
- LLM: Claude (via Anthropic API) con spanish prompt system
- Observabilidad: Langfuse (incluido en template)
- UI: Reflex UI o WhatsApp via Twilio

**Flujo**:
```
Huésped: "Quiero una habitación doble del 15 al 18 de agosto para 2 personas"
  ↓
Agente LangGraph → Tool: check_availability(hotel_id, "2026-08-15", "2026-08-18", guests=2)
  ↓ (QloApps API REST)
Resultado: 3 habitaciones disponibles, precios, fotos
  ↓
Agente → Tool: get_ancillaries(room_type) → desayuno, spa, transfer
  ↓
Claude genera propuesta personalizada con bundle
  ↓
Human-in-the-loop (HITL): "¿Confirma reserva con desayuno incluido por USD 380?"
  ↓
Tool: create_booking(guest_data, room_id, extras)
  ↓
Tool: send_confirmation(booking_id) → email + WhatsApp
```

**Tiempo estimado**: 4-6 semanas | **Costo infra**: ~$50-200/mes

---

## Patrón P3: Agente de Búsqueda WhatsApp-first (Dida MCP + LetsFG + Twilio + LangGraph)

**Caso de uso**: Agente de viajes por WhatsApp para LATAM — el usuario escribe en español y recibe opciones de vuelo + hotel con precios reales.

**Stack**:
- Vuelos: [LetsFG/LetsFG](https://github.com/LetsFG/LetsFG) (MIT) — 400+ aerolíneas via MCP Server
- Hoteles: [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) (MIT) — 2M+ hoteles
- Canal: Twilio WhatsApp Business API
- Orquestador: LangGraph con [HarimxChoi/langgraph-travel-agent](https://github.com/HarimxChoi/langgraph-travel-agent) (MIT)
- Memoria: Mem0 (Apache-2.0) para preferencias entre conversaciones

**Flujo**:
```
WhatsApp: "Necesito vuelo + hotel en Cartagena para semana santa, 4 noches, 2 adultos, budget USD 1500"
  ↓
LangGraph Agent
  ├─ LetsFG MCP: busca vuelos → 400+ aerolíneas, precios sin markup OTA
  ├─ Dida MCP: busca hoteles → 5 opciones <$100/noche
  ├─ mem0_recall(user_id) → preferencias: "prefiere ventana", "no fumador"
  └─ budget_check: vuelo $400 + hotel $380 = $780 (dentro de $1500)
  ↓
Claude genera respuesta en español con opciones rankeadas
  ↓
"Te encontré vuelo a $398 (Avianca directo) + hotel a $92/noche ¿Reservo?"
  ↓
Tool: letsfg_book(flight_offer) → confirmación
Tool: dida_book(hotel_id, dates, guest_data) → voucher PDF
```

**Tiempo estimado**: 6-8 semanas | **Diferenciador LATAM**: 100% en español, WhatsApp-native, precios sin markup OTA

---

## Patrón P4: OTA/Agencia Digital con OTAIP (75 Agentes)

**Caso de uso**: Agencia de viajes o pequeña OTA que quiere un stack agentico completo para operar su negocio.

**Stack**:
- Framework: [telivity-otaip/otaip](https://github.com/telivity-otaip/otaip) (Apache-2.0) — 75 agentes en 12 etapas
- Vuelos: LetsFG (MIT) + Amadeus (freemium API)
- Hoteles: Dida MCP (MIT)
- LLM: Claude (Anthropic API)

**Las 12 etapas de OTAIP**:
```
Etapa 1:  Search agents        → destinos, vuelos, hoteles
Etapa 2:  Pricing agents       → pricing dinámico, markup automático
Etapa 3:  Booking agents       → orquestación de reserva multi-proveedor
Etapa 4:  Ticketing agents     → emisión de tickets, vouchers, confirmaciones
Etapa 5:  Servicing agents     → cambios, cancelaciones, quejas
Etapa 6:  Settlement agents    → conciliación, pago a proveedores
Etapa 7:  Hotel ops agents     → coordinación con hoteles
Etapa 8:  Content agents       → descripciones, fotos, traducciones
Etapa 9:  Sales agents         → propuestas, seguimiento de leads
Etapa 10: Revenue agents       → análisis de margen, comisiones
Etapa 11: Compliance agents    → controles regulatorios IATA/ATOL
Etapa 12: Analytics agents     → dashboards, forecasts, KPIs
```

**Tiempo estimado**: 10-16 semanas para OTA completa | **Valor**: stack de agentes de viaje enterprise completo OSS

---

## Patrón P5: Sales Copilot para Agencia de Viajes (Wander-Desk + Claude)

**Caso de uso**: Copilot para agentes de viaje humanos — asiste en generar propuestas, calcular pricing y dar seguimiento a leads.

**Stack**:
- Base: [Wander-Desk](https://github.com/UjjwalSaini07/Wander-Desk) (MIT — CRM + ops + revenue)
- LLM: Claude con tool use
- CRM: HubSpot API (o el CRM interno de Wander-Desk)
- Datos: OpenTravelData + Amadeus

**Flujo**:
```
Agente humano: "El cliente Martínez pregunta por Machu Picchu en octubre para 2 pax"
  ↓
Sales Copilot (Claude)
  ├─ Recupera historial Martínez: "viajó a Chile 2024, prefiere hoteles 4★, budget ~$3000/pax"
  ├─ Busca paquetes: Cusco + Machu Picchu + Lima, vuelos disponibles (LetsFG)
  ├─ Calcula revenue: costo $4200, precio $5800, margen 38%
  └─ Genera propuesta Word/PDF en español con fotos e itinerario detallado
  ↓
"Propuesta lista: 8 días Perú $5,800/pax | Margen: $1,600 (38%) | ¿Envío a Martínez?"
```

**Tiempo estimado**: 4-6 semanas | **ROI**: +30-50% eficiencia del agente de viajes

---

## Patrón P6: Motor de Búsqueda Multi-fuente (OpenTravelData + LetsFG + Dida MCP)

**Caso de uso**: Motor de búsqueda de viajes open source que agrega múltiples fuentes (alternativa a Amadeus/GDS tradicional).

**Stack**:
- Datos base: [opentraveldata/opentraveldata](https://github.com/opentraveldata/opentraveldata) (CC-BY)
- Vuelos: [LetsFG/LetsFG](https://github.com/LetsFG/LetsFG) (MIT, 400+ aerolíneas sin markup)
- Hoteles: [Dida MCP](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) (MIT, 2M+ hoteles)
- Grafo de rutas: [travel-search-engine-v1](https://github.com/opentraveldata/travel-search-engine-v1) (MIT, neo4j)
- Orquestador: [mcp_travelassistant](https://github.com/skarlekar/mcp_travelassistant) (MIT)

**Arquitectura**:
```
Query: "Vuelo + hotel Madrid desde Buenos Aires, 10-17 oct, budget $1500 total"
  ↓
mcp_travelassistant (orquesta MCP servers en paralelo)
  ├─ LetsFG MCP → vuelos EZE→MAD: 400+ aerolíneas, precios raw (sin markup OTA)
  ├─ Dida MCP → hoteles Madrid disponibles <$100/noche
  ├─ budget_mcp → calcula: vuelo $650 + hotel $700 = $1350 (dentro de budget)
  └─ weather_mcp → clima Madrid en octubre: 15°C, lluvia posible
  ↓
Claude sintetiza y rankea opciones
  ↓
UI: tabla comparativa con precios, cancellation policy, rating
```

**Ahorro vs GDS tradicional**: sin fees de distribución, precios directos de aerolínea

**Tiempo estimado**: 8-12 semanas para MVP | **Valor**: independencia de GDS propietario

---

## Patrón P7: Itinerario Completo Multi-Agente (Multi-Agent-AI-Travel-Advisor + Claude)

**Caso de uso**: Planner de viaje end-to-end para consumidor final — de "quiero ir a Japón" a itinerario detallado con bookings.

**Stack**:
- Base: [Multi-Agent-AI-Travel-Advisor](https://github.com/kbhujbal/Multi-Agent-AI-Travel-Advisor) (MIT, 7 agentes + RAG)
- Vuelos: LetsFG (MIT) — sin markup OTA
- Hoteles: Dida MCP (MIT) — 2M+ propiedades
- Actividades: Viator API / TripAdvisor API
- LLM: Claude (narración) + GPT-4 (tool calling)
- Memoria: [Mem0](https://github.com/mem-ai/mem0) (Apache-2.0)

**Los 7 agentes especializados**:
```
1. FlightAgent      → busca y compara vuelos (LetsFG: sin markup)
2. HotelAgent       → recomienda hoteles según preferencias (Dida MCP)
3. ActivityAgent    → actividades y atracciones (RAG sobre base de datos destinos)
4. CultureAgent     → tips culturales, etiqueta, idioma
5. BudgetAgent      → calcula presupuesto total y sugiere prioridades
6. WeatherAgent     → clima en las fechas del viaje
7. ReportAgent      → genera documento PDF final del itinerario
```

**Output**: PDF con itinerario día a día, vuelos reservados, hoteles con confirmación, mapa de actividades, presupuesto desglosado.

**Tiempo estimado**: 8-10 semanas | **Diferenciador**: 7 expertos especializados + precios sin markup OTA

---

## Patrón P8: Disruption Management Agent (Aerolínea/Hotel)

**Caso de uso**: Agente que detecta disrupciones (vuelo cancelado, overbooking) y rebook automáticamente a pasajeros.

**Stack**:
- Orquestador: [HarimxChoi/langgraph-travel-agent](https://github.com/HarimxChoi/langgraph-travel-agent) (MIT, Amadeus + Twilio)
- Vuelos alternativos: Amadeus for Developers + LetsFG (MIT)
- Notificaciones: Twilio SMS/WhatsApp
- CRM: HubSpot

**Flujo de disrupción**:
```
Evento: Vuelo AA123 cancelado por meteorología
  ↓
Disruption Agent (LangGraph)
  ├─ get_affected_passengers(flight_id) → 180 pasajeros
  ├─ search_alternatives(origin, dest, date+0d, date+1d) → vuelos disponibles
  ├─ rank_alternatives(passengers, alternatives) → prioridad por status frequent flyer
  ├─ batch_rebook(passengers, new_flights) → Amadeus booking API
  ├─ notify_passengers(method="whatsapp") → Twilio
  └─ log_to_crm(affected_passengers) → HubSpot
  ↓
180 pasajeros rebookeados automáticamente en <5 minutos
```

**Tiempo estimado**: 10-14 semanas | **ROI**: $200-500K ahorro por disrupción evitada en costos de atención

---

## Patrón P9: Revenue Management AI para Aerolínea

**Caso de uso**: Sistema de pricing dinámico personalizado con AI para maximizar ingreso por asiento + ancillaries.

**Stack**:
- Core: LangGraph + Claude como orquestador
- Datos: historial de ventas, competencia (SerpAPI), eventos locales (Eventbrite API)
- ML: modelo de demand forecasting (scikit-learn / Prophet)
- Delivery: integración con PSS (Passenger Service System) de la aerolínea

**Personalización de oferta**:
```
Pasajero A (frequent flyer Gold, viaja por negocios):
  → Oferta: asiento ejecutivo + wifi + equipaje prioridad en bundle $45 extra
  → Precio base: +8% vs. tarifa lista (price sensitivity baja)

Pasajero B (primera vez, compró tarifa económica):
  → Oferta: upgrade de asiento por $15 + snack por $5
  → Precio base: tarifa mínima para capturar reserva
```

**Tiempo estimado**: 12-18 meses para enterprise | **ROI estimado**: 5-15% aumento en revenue por ASK

---

## Patrón P10: Tour Operator Digital (ExcursioX + Claude + OPTD)

**Caso de uso**: Tour operator pequeño en LATAM que digitaliza y automatiza su operación con AI.

**Stack**:
- Base: [ExcursioX](https://github.com/moizkamran/ExcursioX) (MIT, travel CRM + booking + hotel management)
- Datos de rutas: [opentraveldata/opentraveldata](https://github.com/opentraveldata/opentraveldata) (CC-BY)
- LLM: Claude para generación de propuestas y atención al cliente
- Canal: WhatsApp Business + web widget

**Módulos automatizados**:
```
├─ Cotizador inteligente: cliente describe viaje → propuesta en <30 segundos
├─ Gestión de vouchers: generación y envío automático de vouchers PDF
├─ Seguimiento de pagos: alertas automáticas de cuotas pendientes
├─ Reviews automáticas: solicitud y gestión post-viaje
└─ Reportes: dashboard de revenue, ocupación y márgenes
```

**Tiempo estimado**: 6-8 semanas | **Impacto**: operador puede manejar 3x más clientes con el mismo equipo

---

## Patrón P11: Universal Travel Search sin API Keys (trvl + Claude)

**Caso de uso**: Agente de búsqueda de viajes que funciona en cualquier contexto (Claude Desktop, VS Code, Cursor) sin configurar APIs — del usuario final al developer.

**Stack**:
- Búsqueda: [MikkoParkkola/trvl](https://github.com/MikkoParkkola/trvl) (MIT) — Go binary, sin API keys, 21 providers
- LLM: Claude (via MCP client nativo)
- Instalación: `trvl mcp install --client claude` — listo en 30 segundos
- Reviews: [pab1it0/tripadvisor-mcp](https://github.com/pab1it0/tripadvisor-mcp) (MIT) — calidad de destino
- Routing local: [skedgo/tripgo-mcp-server](https://github.com/skedgo/tripgo-mcp-server) — movilidad last mile

**Flujo**:
```
Usuario en Claude Desktop: "Vuelo + hotel + cómo llegar desde el aeropuerto en Barcelona, 10-15 ago, budget EUR800"
  ↓
Claude usa MCP tools de trvl
  ├─ trvl.search_flights(origin, dest, dates) → Google Flights: EUR320 (directo 8h)
  ├─ trvl.search_hotels(dest, dates) → Google Hotels: 5 opciones EUR60-120/noche
  ├─ tripadvisor_mcp.get_reviews(hotel_id) → 4.5★, 1,200 reseñas
  └─ tripgo_mcp.route(BCN_airport, hotel_address) → Metro L9 EUR5.15 + bus → 40 min
  ↓
Claude presenta: "Encontré vuelo por EUR322 (Vueling directo) + Hotel Catalonia (4★, EUR82/noche, 4.5★) + ruta metro EUR5.15. Total: EUR730 de EUR800 budget."
  ↓
Usuario: "Reserva" → trvl genera booking URLs reales (Aviasales/Hotellook/RentalCars)
  ↓
Usuario completa pago en la página del partner (segura, sin datos en el agente)
```

**Ventajas**:
- **Zero API keys**: trvl ruta a través de 21 providers sin credenciales del developer
- **Instala en 30 segundos**: `trvl mcp install --client claude`
- **Multi-modal completo**: vuelo + hotel + transporte local en una conversación
- **98.9% menos tokens**: 1 herramienta inteligente vs 66 herramientas separadas

**Tiempo estimado**: 1-2 días para MVP | **Costo infra**: $0 (solo Claude API)

---

## Patrón P12: Corporate Travel Policy Agent (Amadeus + LangGraph + Policy Engine)

**Caso de uso**: Agente de gestión de viajes corporativos que verifica y aplica políticas de la empresa en tiempo real — no después con auditorías.

**Stack**:
- Vuelos: [Fieldy76/Agentic-Travel-Planner](https://github.com/Fieldy76/Agentic-Travel-Planner) (MIT) — Amadeus Self-Service + multi-modelo
- Framework: LangGraph con [datarootsio/langgraph-template-travel-planner](https://github.com/datarootsio/langgraph-template-travel-planner) (MIT)
- Policy engine: JSON config con reglas de empresa (clase, budget por destino, aerolíneas preferidas)
- Expense tracking: integración con Ramp/Navan/SAP Concur vía API
- LLM: Claude (policy interpretation + explicación en lenguaje natural)

**Flujo**:
```
Viajero: "Necesito vuelo a NYC para reunión 18-20 agosto, vuelo de regreso el lunes"
  ↓
Policy Agent (LangGraph)
  ├─ check_policy(user_role="manager", route="BUE→NYC", days=3)
  │     → Policy: Business class si vuelo >8h, hotel hasta $250/noche, budget trip $3,500
  ├─ search_flights(Amadeus) → 3 opciones business class $2,100-2,400
  ├─ search_hotels(Amadeus Hotels) → 4 opciones $180-240/noche OK dentro de policy
  ├─ budget_check: $2,400 + $720 hotel + $200 misc = $3,320 OK dentro de $3,500
  ├─ pre_approve(trip_id) → booking autorizado con referencia
  └─ notify_manager(trip_summary) → email automático con PDF aprobación
  ↓
"Tu viaje está pre-aprobado. Vuelo Business $2,280 (United, JFK directo) + Hotel Marriott Times Sq $215/noche. ¿Confirmo?"
  ↓
Tool: create_booking(amadeus, flight_offer) → PNR generado
Tool: add_to_expense_tracker(ramp_api, booking_data) → registrado en Ramp
```

**Contexto de negocio**:
- Solo 31% de programas corporativos tienen enforcement real-time → oportunidad
- AI-enabled programs capturan 8-15% savings vs manuales
- Expense processing AI: $6.85 vs $26.63 manual (74% reducción)

**Tiempo estimado**: 8-12 semanas | **ROI**: 8-15% savings en T&E + >70% reducción en tiempo de administración

---

*Ver también: `agents/top.md` para agentes específicos disponibles.*
