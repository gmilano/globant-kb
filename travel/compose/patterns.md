# 🧩 Patrones de composición — Travel & Hospitality

> Recetas concretas para construir soluciones usando los repos y agentes identificados.
> Última actualización: 2026-07-11

## Arquitectura base

```
[Plataforma vertical] QloApps / ExcursioX / Wander-Desk
          ↓
[Datos de viaje] OpenTravelData + Dida Hotel MCP + SerpAPI
          ↓
[Orquestador] LangGraph (datarootsio template) / azure-ai-travel-agents
          ↓
[MCP Servers] mcp_travelassistant + wanderlog-mcp + Dida MCP
          ↓
[Canal] Chat web / WhatsApp (Twilio) / API REST / Email
```

---

## Patrón P1: AI Travel Concierge para Hotel (QloApps + LangGraph + Claude)

**Caso de uso**: Chatbot de reservas para cadena hotelera boutique en LATAM.

**Stack**:
- Base: [QloApps](https://github.com/Qloapps/QloApps) (PMS + booking engine, OSL-3.0)
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

## Patrón P2: Agente de Búsqueda WhatsApp-first (Dida MCP + Twilio + LangGraph)

**Caso de uso**: Agente de viajes por WhatsApp para LATAM — el huésped escribe en español y recibe opciones de hotel con precios reales.

**Stack**:
- Hotel data: [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) (MIT, 2M+ hoteles)
- Canal: Twilio WhatsApp Business API
- Orquestador: LangGraph con [HarimxChoi/langgraph-travel-agent](https://github.com/HarimxChoi/langgraph-travel-agent) (MIT)
- Vuelos: SerpAPI / Amadeus for Developers (freemium)
- Memoria: Mem0 (Apache-2.0) para preferencias del usuario entre conversaciones

**Flujo**:
```
WhatsApp: "Necesito hotel en Cartagena para semana santa, 4 noches, 2 adultos, menos de 200 USD/noche"
  ↓
LangGraph Agent
  ├─ Tool: dida_search_hotels(destination="Cartagena", dates=..., guests=2, max_price=200)
  │   → Lista de 5 hoteles con precios + políticas de cancelación (Dida MCP)
  ├─ Tool: mem0_recall(user_id) → preferencias previas (e.g., "prefiere piscina", "no fumador")
  └─ Tool: filter_by_preferences(hotels, preferences)
  ↓
Claude genera respuesta en español con fotos (WhatsApp media)
  ↓
"¿Te interesa el Hilton a $175/noche con piscina? Puedo reservar 🏖️"
  ↓
Tool: dida_create_booking(hotel_id, dates, guest_data)
  ↓
Confirmación + voucher PDF por WhatsApp
```

**Tiempo estimado**: 6-8 semanas | **Diferenciador LATAM**: 100% en español, WhatsApp-native

---

## Patrón P3: Sales Copilot para Agencia de Viajes (Wander-Desk + Claude)

**Caso de uso**: Copilot para agentes de viaje humanos — asiste en generar propuestas, calcular pricing y dar seguimiento a leads.

**Stack**:
- Base: [Wander-Desk](https://github.com/UjjwalSaini07/Wander-Desk) (MIT — CRM + ops + revenue)
- LLM: Claude con tool use habilitado
- CRM: HubSpot API (o el CRM interno de Wander-Desk)
- Datos: OpenTravelData + Amadeus

**Herramientas del agente**:
```python
tools = [
    get_client_history(client_id),        # Historial de viajes del cliente
    get_available_packages(destination),   # Paquetes disponibles
    calculate_revenue_forecast(booking),   # Revenue estimado
    draft_travel_proposal(client, trip),   # Genera propuesta PDF
    create_follow_up_task(client_id, date),# Agenda seguimiento en CRM
    send_whatsapp_message(phone, text),    # Notifica al cliente
]
```

**Flujo**:
```
Agente humano: "El cliente Martínez pregunta por Machu Picchu en octubre para 2 pax"
  ↓
Sales Copilot (Claude)
  ├─ Recupera historial Martínez: "viajó a Chile 2024, prefiere hoteles 4★, budget ~$3000/pax"
  ├─ Busca paquetes: Cusco + Machu Picchu + Lima, vuelos disponibles
  ├─ Calcula revenue: costo $4200, precio $5800, margen 38%
  └─ Genera propuesta Word/PDF en español con fotos e itinerario detallado
  ↓
"Propuesta lista: 8 días Perú $5,800/pax | Margen: $1,600 (38%) | ¿Envío a Martínez?"
```

**Tiempo estimado**: 4-6 semanas | **ROI**: +30-50% eficiencia de agente de viajes

---

## Patrón P4: Motor de Búsqueda Multi-fuente (OpenTravelData + Dida + SerpAPI)

**Caso de uso**: Motor de búsqueda de viajes open source que agrega múltiples fuentes (alternativa a Amadeus/GDS).

**Stack**:
- Datos base: [opentraveldata/opentraveldata](https://github.com/opentraveldata/opentraveldata) (CC-BY, aeropuertos/rutas/aerolíneas)
- Hotel search: [Dida MCP](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) (MIT, 2M+ hoteles)
- Vuelos en tiempo real: SerpAPI Google Flights (freemium)
- Grafo de rutas: [travel-search-engine-v1](https://github.com/opentraveldata/travel-search-engine-v1) (MIT, neo4j)
- Orquestador: [mcp_travelassistant](https://github.com/skarlekar/mcp_travelassistant) (MIT)

**Arquitectura**:
```
Query: "Vuelo + hotel Madrid desde Buenos Aires, 10-17 oct, budget $1500 total"
  ↓
mcp_travelassistant (orquesta MCP servers en paralelo)
  ├─ flight_search_mcp → SerpAPI: mejores vuelos EZE→MAD
  ├─ hotel_search_mcp → Dida: hoteles Madrid disponibles <$100/noche
  ├─ budget_mcp → calcula: vuelo $650 + hotel $700 = $1350 (dentro de budget)
  └─ weather_mcp → clima Madrid en octubre: 15°C, lluvia posible
  ↓
Claude sintetiza y rankea opciones
  ↓
UI: tabla comparativa con precios, cancellation policy, rating
```

**Tiempo estimado**: 8-12 semanas para MVP | **Valor**: independencia de GDS propietario

---

## Patrón P5: Itinerario Completo Multi-Agente (Multi-Agent-AI-Travel-Advisor + Claude)

**Caso de uso**: Planner de viaje end-to-end para consumidor final — de "quiero ir a Japón" a itinerario detallado con bookings.

**Stack**:
- Base: [Multi-Agent-AI-Travel-Advisor](https://github.com/kbhujbal/Multi-Agent-AI-Travel-Advisor) (MIT, 7 agentes + RAG)
- Vuelos: Amadeus for Developers API
- Hoteles: Dida MCP
- Actividades: Viator API / TripAdvisor API
- LLM: Claude (narración) + GPT-4 (tool calling)
- Memoria: [Mem0](https://github.com/mem-ai/mem0) (Apache-2.0)

**Los 7 agentes especializados**:
```
1. FlightAgent      → busca y compara vuelos (Amadeus)
2. HotelAgent       → recomienda hoteles según preferencias (Dida MCP)
3. ActivityAgent    → actividades y atracciones (RAG sobre base de datos destinos)
4. CultureAgent     → tips culturales, etiqueta, idioma
5. BudgetAgent      → calcula presupuesto total y sugiere prioridades
6. WeatherAgent     → clima en las fechas del viaje
7. ReportAgent      → genera documento PDF final del itinerario
```

**Output**: PDF con itinerario día a día, vuelos reservados, hoteles con confirmación, mapa de actividades, presupuesto desglosado.

**Tiempo estimado**: 8-10 semanas | **Diferenciador**: 7 expertos especializados vs. 1 agente generalista

---

## Patrón P6: Disruption Management Agent (Aerolínea/Hotel)

**Caso de uso**: Agente que detecta disrupciones (vuelo cancelado, overbooking) y rebook automáticamente a pasajeros.

**Stack**:
- Orquestador: [HarimxChoi/langgraph-travel-agent](https://github.com/HarimxChoi/langgraph-travel-agent) (MIT, Amadeus + Twilio)
- Amadeus for Developers: search vuelos alternativos
- Twilio: notificaciones SMS/WhatsApp
- HubSpot: registro en CRM del cliente afectado

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

## Patrón P7: Revenue Management AI para Aerolínea

**Caso de uso**: Sistema de pricing dinámico personalizado con AI para maximizar ingreso por asiento + ancillaries.

**Stack**:
- Core: LangGraph + Claude como orquestador
- Datos: historial de ventas, datos de competencia (SerpAPI), eventos locales (Eventbrite API)
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

**Tiempo estimado**: 12-18 meses para enterprise | **ROI estimado**: 5-15% aumento en revenue por ASK (Available Seat Kilometer)

---

## Patrón P8: Tour Operator Digital (ExcursioX + Claude + OPTD)

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

*Ver también: `agents/top.md` para agentes específicos disponibles.*
