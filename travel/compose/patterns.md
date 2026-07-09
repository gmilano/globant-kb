# 🧩 Patrones de Composición — Travel & Hospitality

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-09 (v5 — 12 patrones con código)

---

## Arquitectura base

```
[Plataforma vertical base (OpenTripPlanner / Odoo / PHPTravels)]
              ↓
[MCP Servers de inventario (DIDA hotel, Sabre, Amadeus)]
              ↓
[Orchestration (LangGraph / CrewAI)]
              ↓
[LLM (Claude Haiku 4.5 / Sonnet 5)]
              ↓
[Canal (WhatsApp / Web / Slack)]
```

---

## P1 — WhatsApp Travel Agent (LATAM-first) ⭐ Recomendado

**Objetivo**: Agente de viajes en WhatsApp que cotiza vuelos + hoteles en español/portugués

**Stack**: Twilio WhatsApp + LangGraph + Amadeus SDK (MIT) + DIDA Hotel MCP (MIT) + Claude Haiku 4.5 + Redis

```python
from anthropic import Anthropic
import redis

client = Anthropic()
r = redis.Redis()

def search_flights_tool(origin: str, dest: str, date: str) -> list:
    from amadeus import Client
    amadeus = Client(client_id=AMADEUS_KEY, client_secret=AMADEUS_SECRET)
    offers = amadeus.shopping.flight_offers_search.get(
        originLocationCode=origin, destinationLocationCode=dest,
        departureDate=date, adults=1
    )
    return [{"price": o["price"]["total"], "airline": o["validatingAirlineCodes"][0],
             "departure": o["itineraries"][0]["segments"][0]["departure"]["at"]}
            for o in offers.data[:3]]

def handle_whatsapp_message(user_id: str, message: str) -> str:
    history = r.lrange(f"chat:{user_id}", 0, -1)
    messages = [{"role": "user" if i%2==0 else "assistant", "content": m.decode()}
                for i, m in enumerate(history)]
    messages.append({"role": "user", "content": message})
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1024,
        system="Eres un agente de viajes LATAM. Ayudas en español y portugués. "
               "Cuando pidan vuelos u hoteles, usa tus tools.",
        messages=messages, tools=TOOLS
    )
    return response.content[0].text
```

**Tiempo estimado**: 3-5 semanas | **Deal size**: $40k-$150k  
**Para**: Agencias tradicionales, OTAs regionales pequeñas

---

## P2 — Agentic Booking Pipeline (Sabre Mosaic MCP)

**Objetivo**: Replicar MindTrip/Sabre/PayPal con stack propio

**Stack**: Sabre Mosaic MCP + LangGraph + Stripe/PayPal + Claude Sonnet 5 + Next.js

**Flujo**:
```
Usuario: "Buenos Aires a Lima 15/08, hoteles centro histórico, presupuesto $800"
↓ Planning Agent → Flight Agent (Sabre MCP) + Hotel Agent (DIDA MCP)
↓ Comparison Agent → Booking Agent → Payment Agent (Stripe)
↓ Confirmación + itinerario PDF
```

**Tiempo estimado**: 10-14 semanas | **Deal size**: $200k-$800k

---

## P3 — Disruption Management Agent (Aerolíneas)

**Objetivo**: Rebooked proactivo. "Tu vuelo está demorado, ya te reubiqué."

**Stack**: OpenSky API (gratis) + GTFS-Realtime + Amadeus Orders API + Twilio + Claude Haiku 4.5

```python
import asyncio
from anthropic import Anthropic

async def monitor_and_rebook(flight_number: str, passenger_phone: str):
    client = Anthropic()
    while True:
        states = get_flight_states(flight_number)
        if is_disrupted(states):
            alternatives = search_alternatives(flight_number)
            decision = client.messages.create(
                model="claude-haiku-4-5-20251001",
                messages=[{"role": "user", "content":
                    f"Disruption {flight_number}. Alternatives: {alternatives}. "
                    f"Policy: {policy}. Select best rebooking."}]
            )
            send_whatsapp(passenger_phone,
                f"Tu vuelo {flight_number} tiene demora. "
                f"Te reubiqué en {decision.content[0].text}. "
                f"Responde SÍ para confirmar.")
        await asyncio.sleep(300)
```

**Tiempo estimado**: 6-8 semanas | **Deal size**: $150k-$600k  
**Para**: Aerolíneas LATAM (Avianca, Copa, GOL, Azul)

---

## P4 — OpenTripPlanner + LLM Routing Assistant

**Objetivo**: App de movilidad urbana con asistente conversacional

**Stack**: OpenTripPlanner v2.9 (LGPL-2.1, GraphQL) + GTFS ciudad + Claude Haiku 4.5

```python
import anthropic, requests
OTP_URL = "http://localhost:8080/otp/routers/default/index/graphql"

def plan_trip_tool(from_lat, from_lon, to_lat, to_lon) -> dict:
    query = f"""
    {{ plan(
        from: {{lat: {from_lat}, lon: {from_lon}}}
        to: {{lat: {to_lat}, lon: {to_lon}}}
        numItineraries: 3
        transportModes: [{{mode: TRANSIT}}, {{mode: WALK}}]
      ) {{ itineraries {{ duration legs {{ mode distance route {{ shortName }} }} }} }}
    }}"""
    return requests.post(OTP_URL, json={"query": query}).json()
```

```bash
# Docker setup con GTFS Bogotá
docker run -v /tmp/otp:/var/otp -p 8080:8080 \
  opentripplanner/opentripplanner:latest --load --serve /var/otp/bogota
curl https://www.sitp.gov.co/gtfs/feed.zip -o /tmp/otp/bogota/gtfs.zip
```

**Tiempo estimado**: 4-6 semanas | **Deal size**: $60k-$200k  
**Para**: Municipios LATAM (Bogotá SITP, CDMX Metro, Lima Metropolitano)

---

## P5 — Corporate Travel Policy Enforcer

**Objetivo**: Verifica si el booking cumple la política corporativa antes de confirmar

**Stack**: RAG (Qdrant + embeddings) sobre PDF de política + Claude Sonnet 5 + Amadeus

```python
from anthropic import Anthropic
import qdrant_client

client = Anthropic()
qdrant = qdrant_client.QdrantClient("localhost", port=6333)

def check_travel_policy(booking: dict, employee_level: str) -> dict:
    chunks = qdrant.search("travel_policy", embed(f"hotel {employee_level}"), limit=5)
    context = "\n".join([c.payload["text"] for c in chunks])
    response = client.messages.create(
        model="claude-sonnet-5",
        system="Eres el sistema de compliance de viajes corporativos.",
        messages=[{"role": "user", "content":
                   f"Política:\n{context}\nBooking:\n{booking}\nNivel: {employee_level}\n¿Cumple?"}]
    )
    return {"compliant": "cumple" in response.content[0].text.lower(),
            "explanation": response.content[0].text}
```

**Tiempo estimado**: 5-7 semanas | **Deal size**: $80k-$300k  
**Para**: Empresas LATAM con >500 empleados viajando

---

## P6 — Visa & Requirements Knowledge Agent

**Objetivo**: RAG con datos de visas en tiempo real para viajeros LATAM

```python
SYSTEM_PROMPT = """Experto en requisitos de viaje para ciudadanos LATAM.
IMPORTANTE: Solo usa el contexto proporcionado. Nunca inventes requisitos.
Siempre recomienda verificar en la embajada oficial."""

def answer_visa_question(question: str, nationality: str, destination: str) -> str:
    context = search_visa_db(nationality, destination)  # RAG sobre IATA Travel Centre
    response = client.messages.create(
        model="claude-sonnet-5", system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content":
                   f"Contexto:\n{context}\n\nPregunta: {question}\n"
                   f"Ciudadanía: {nationality} | Destino: {destination}"}]
    )
    return response.content[0].text
```

**Tiempo estimado**: 4-6 semanas | **Deal size**: $40k-$150k

---

## P7 — Hotel Concierge AI (PMS + LLM)

**Objetivo**: Concierge virtual: check-in, recomendaciones, room service, checkout

**Stack**: Mews API / OpenHotelFR (MIT) + RAG local + Claude Haiku 4.5 + WhatsApp

```
Guest check-in → WhatsApp bienvenida
Guest: "¿Restaurantes cerca?"
  → RAG gastronomía local → Claude recomienda + enlaza Maps
Guest: "Room service menú"
  → Claude consulta PMS → muestra menú + toma pedido
Checkout → Claude envía factura + solicita review
```

**Tiempo estimado**: 6-8 semanas | **Deal size**: $50k-$200k/hotel

---

## P8 — AEO Travel Content Agent

**Objetivo**: Optimiza contenido para aparecer en Claude, ChatGPT y Google AI Mode

```python
def audit_travel_aeo(website_url: str, business_type: str) -> dict:
    content = scrape_website(website_url)
    response = client.messages.create(
        model="claude-sonnet-5",
        messages=[{"role": "user", "content": f"""
Analiza este sitio de viajes para AEO: {website_url} | Tipo: {business_type}
Contenido: {content[:5000]}

Evalúa:
1. ¿Tiene schema.org? (LodgingBusiness, Flight, TouristAttraction)
2. ¿FAQs responden preguntas típicas a Claude/ChatGPT?
3. ¿Precios accesibles sin login?
4. Recomienda 5 mejoras de mayor impacto.
"""}])
    return {"audit": response.content[0].text}
```

**Tiempo estimado**: 2-4 semanas | **Deal size**: $15k-$60k + retainer mensual

---

## P9 — Multi-Agent Trip Planner (Full Stack)

**Agentes**: FlightAgent (Amadeus) + HotelAgent (DIDA MCP) + ActivityAgent (Amadeus POI) + WeatherAgent (OpenMeteo) + ItineraryAgent (Claude Sonnet 5)

```python
from crewai import Agent, Task, Crew

flight_agent = Agent(role="Flight Specialist", tools=[search_flights_tool],
                     llm="claude-haiku-4-5-20251001")
hotel_agent = Agent(role="Hotel Specialist", tools=[search_hotels_via_dida_mcp],
                    llm="claude-haiku-4-5-20251001")
planner_agent = Agent(role="Trip Planner", llm="claude-sonnet-5")

crew = Crew(
    agents=[flight_agent, hotel_agent, planner_agent],
    tasks=[
        Task(description="Busca mejores vuelos {origin}->{destination}", agent=flight_agent),
        Task(description="Busca hoteles {destination} para {dates}", agent=hotel_agent),
        Task(description="Crea itinerario {duration} días", agent=planner_agent)
    ]
)
result = crew.kickoff(inputs={"origin": "BUE", "destination": "Lima",
                              "dates": "2026-08-15/2026-08-22", "duration": 7})
```

**Tiempo estimado**: 8-12 semanas | **Deal size**: $120k-$500k

---

## P10 — Routing LATAM Cities (OTP + Claude)

**Cities con GTFS público**: Bogotá, CDMX, Lima, Santiago, Buenos Aires, São Paulo, Montevideo

**Tiempo estimado**: 2-4 semanas/ciudad | **Deal size**: $30k-$100k/ciudad  
**Para**: Municipios LATAM, apps de movilidad, operadores de transporte

---

## P11 — Revenue Management AI (Hotelería)

```python
import anthropic, pandas as pd
from sklearn.ensemble import RandomForestRegressor

def generate_pricing_recommendations(hotel_data, competitor_prices, upcoming_events):
    model = RandomForestRegressor().fit(X_train, y_train)
    demand_forecast = model.predict(X_next_30_days)
    client = anthropic.Anthropic()
    response = client.messages.create(
        model="claude-sonnet-5",
        messages=[{"role": "user", "content":
            f"Forecast demanda: {demand_forecast.tolist()}\n"
            f"Precios competencia: {competitor_prices}\n"
            f"Eventos próximos: {upcoming_events}\n"
            f"Genera recomendaciones de precios 30 días con justificación."}]
    )
    return response.content[0].text
```

**Tiempo estimado**: 6-10 semanas | **Deal size**: $60k-$250k + SaaS $500-$2k/hotel/mes

---

## P12 — Agencia Digital Full en WhatsApp (end-to-end)

**Objetivo**: Reemplazar agencia tradicional con AI agent. Cotización → booking → pago → post-viaje.

```
Twilio WhatsApp ← → LangGraph Orchestrator → Claude Sonnet 5
                         ↓ tool calls
    Amadeus (vuelos) + DIDA MCP (hoteles) + Stripe (pago) + Twilio (notify)
                         ↓
            Human handoff via Chatwoot / Tawk.to
```

**Casos cubiertos**: Cotización → cambios/cancelaciones → alertas disrupciones → post-trip

**Tiempo estimado**: 12-16 semanas | **Deal size**: $200k-$600k

---

## Quick-Start Matrix

| Patrón | Semanas | Costo estimado | LLM recomendado | Complejidad |
|--------|---------|---------------|-----------------|-------------|
| P1 WhatsApp Agent | 3-5 | $40k-$150k | Haiku 4.5 | Baja |
| P3 Disruption Agent | 6-8 | $150k-$600k | Haiku 4.5 | Media |
| P4 OTP Routing | 4-6 | $60k-$200k | Haiku 4.5 | Baja-Media |
| P5 Corporate Policy | 5-7 | $80k-$300k | Sonnet 5 | Media |
| P6 Visa Agent | 4-6 | $40k-$150k | Sonnet 5 | Media |
| P7 Hotel Concierge | 6-8 | $50k-$200k | Haiku 4.5 | Media |
| P8 AEO Optimizer | 2-4 | $15k-$60k | Sonnet 5 | Baja |
| P9 Multi-Agent Planner | 8-12 | $120k-$500k | Sonnet 5 | Alta |
| P10 LATAM Cities OTP | 2-4 | $30k-$100k | Haiku 4.5 | Baja |
| P11 Revenue Mgmt | 6-10 | $60k-$250k | Sonnet 5 | Media |
| P2 Agentic Pipeline | 10-14 | $200k-$800k | Sonnet 5 | Alta |
| P12 Full Agency WA | 12-16 | $200k-$600k | Sonnet 5 | Alta |
