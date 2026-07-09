# Composition Patterns — Travel & Hospitality AI

> Concrete recipes using real repos. Build times for 2-3 dev Globant team.
> Last updated: 2026-07-08 (v4)

## Pattern 1: Hotel AI Concierge (WhatsApp + QloApps + Claude)

**Stack**: QloApps + DIDA hotel MCP + Twilio WhatsApp + Claude claude-sonnet-5 + OpenAI Agents SDK + FastAPI

**Repos**: [Qloapps/QloApps](https://github.com/Qloapps/QloApps) + [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) + [openai/openai-agents-python](https://github.com/openai/openai-agents-python)

```python
from agents import Agent, tool
import requests

QLOAPPS_API = "https://hotel.example.com/api"

@tool
def check_room_availability(check_in: str, check_out: str, guests: int) -> dict:
    """Check available rooms in QloApps"""
    resp = requests.get(f"{QLOAPPS_API}/rooms/available",
        params={"date_from": check_in, "date_to": check_out, "guests": guests})
    return resp.json()

@tool
def create_reservation(room_id: str, guest_name: str, guest_email: str,
                        check_in: str, check_out: str) -> dict:
    """Create a booking in QloApps"""
    resp = requests.post(f"{QLOAPPS_API}/bookings", json={
        "room_id": room_id, "name": guest_name, "email": guest_email,
        "date_from": check_in, "date_to": check_out})
    return resp.json()

concierge = Agent(
    name="Hotel Concierge",
    model="claude-sonnet-5",
    tools=[check_room_availability, create_reservation],
    instructions=(
        "Warm hotel concierge. Confirm price+dates before booking. "
        "Match guest language (English/Spanish/Portuguese for LATAM). "
        "Always confirm: name, email, check-in, check-out, total price before final booking."
    )
)
```

**Build time**: 2-3 weeks | **Cost**: ~$0.01-0.05/conversation | **Lift**: 15-25% upsell, -40% front desk calls

---

## Pattern 2: Corporate Travel Agent (Amadeus + LangGraph + Slack)

**Stack**: Amadeus Python SDK + OpenAI Agents SDK + LangGraph + PostgreSQL + Slack

**Repos**: [amadeus4dev/amadeus-python](https://github.com/amadeus4dev/amadeus-python) + [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) + Reference: [jongalloway/travel-booking-agents](https://github.com/jongalloway/travel-booking-agents)

```python
from amadeus import Client
from agents import Agent, tool

amadeus = Client(client_id="...", client_secret="...")

TRAVEL_POLICY = {
    "max_hotel_per_night": 285,
    "max_flight_economy": 520,
    "max_flight_international": 2000,
    "approved_airlines": ["AA", "UA", "DL", "LH", "IB", "LA", "G3", "AD"],  # includes LATAM, Gol, Azul
    "approval_thresholds": {"auto": 500, "manager": 2000, "finance": float("inf")}
}

@tool
def search_flights(origin: str, destination: str, date: str, max_price: float) -> list:
    """Search flights via Amadeus GDS"""
    response = amadeus.shopping.flight_offers_search.get(
        originLocationCode=origin, destinationLocationCode=destination,
        departureDate=date, adults=1, maxPrice=max_price, currencyCode="USD")
    return [{"price": o["price"]["total"], "carrier": o["validatingAirlineCodes"][0]}
            for o in response.data[:5]]

@tool
def check_policy_compliance(flight_price: float, airline: str) -> dict:
    """Validate against corporate travel policy"""
    violations = []
    if float(flight_price) > TRAVEL_POLICY["max_flight_economy"]:
        violations.append(f"Flight ${flight_price} exceeds ${TRAVEL_POLICY['max_flight_economy']} limit")
    if airline not in TRAVEL_POLICY["approved_airlines"]:
        violations.append(f"Airline {airline} not on approved list")
    total = float(flight_price)
    approval = "auto" if total < 500 else "manager" if total < 2000 else "finance"
    return {"compliant": not violations, "violations": violations, "approval_level": approval}

@tool
def find_cheapest_dates(origin: str, destination: str, month: str) -> dict:
    """Use Amadeus cheapest dates to find best week to fly"""
    response = amadeus.shopping.flight_offers_search.get(
        originLocationCode=origin, destinationLocationCode=destination,
        departureDate=f"{month}-01", adults=1, nonStop=True)
    sorted_offers = sorted(response.data, key=lambda x: float(x["price"]["total"]))
    return {"cheapest_date": sorted_offers[0]["itineraries"][0]["segments"][0]["departure"]["at"],
            "price": sorted_offers[0]["price"]["total"]} if sorted_offers else {}
```

**Workflow**: Request → Search Agent → Policy Check → Approval Router ($500 auto/$500-2k manager/$2k+ finance) → Book → Expense Record

**Build time**: 4-6 weeks | **Cost**: ~$0.10-0.30/booking | **Savings**: 2-3hr admin → 5 min per trip

---

## Pattern 3: Multi-Modal Trip Planner (OpenTripPlanner + Amadeus + LangGraph)

**Stack**: OpenTripPlanner (Java/GTFS/OSM) + OpenTravelData + Amadeus + LangGraph

**Repos**: [opentripplanner/OpenTripPlanner](https://github.com/opentripplanner/OpenTripPlanner) + [opentraveldata/opentraveldata](https://github.com/opentraveldata/opentraveldata) + [amadeus4dev/amadeus-python](https://github.com/amadeus4dev/amadeus-python)

```
User: "Plan 5-day trip to Buenos Aires for 2, budget $3000, from NYC"

  Agent orchestration via LangGraph:
  1. FlightAgent → Amadeus → JFK-EZE $580 RT/person (LA 8512)
  2. HotelAgent → DIDA hotel MCP → Palermo SoHo $130-160/night
  3. RoutingAgent → OpenTripPlanner (Buenos Aires GTFS) → daily Subte + bus routes
  4. ActivityAgent → Amadeus Activities API → Tango show ($45), Tigre Delta ($35), Winery tour ($60)
  5. BudgetAgent → $1160 flights + $650 hotel + $420 activities = $2230 ✓ under $3000
  6. SynthesisAgent → formatted PDF itinerary with maps, booking links, and packing list
```

**Key**: OpenTripPlanner requires Buenos Aires GTFS feed (publicly available from BA government open data portal).

**Build time**: 6-8 weeks | **Deliverable**: Embeddable widget for tourism boards | **Target clients**: LATAM tourism boards, DMOs

---

## Pattern 4: Flight Deal Discovery — Zero API Key Stack (trvl)

**Stack**: trvl MCP server + Claude + LangGraph + PostgreSQL + WhatsApp/email alerts

**Repos**: [MikkoParkkola/trvl](https://github.com/MikkoParkkola/trvl) + [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph)

The key insight: `trvl` gives Claude access to Google Flights, Trivago, Airbnb, Booking.com, Hostelworld, Ferryhopper, and European ground transport with **zero API keys** — using a single MCP tool (65 aliases, 378 tokens).

```python
# Claude Desktop / Cursor config
{
  "mcpServers": {
    "trvl": {
      "command": "trvl",
      "args": ["mcp"]
    }
  }
}

# Claude can now answer:
# "Find the cheapest week to fly SAO to LIS in October, including stopovers"
# "Search hotels in Medellín for 5 nights, 2 adults, $80-120/night"
# "Get ferry options from Split to Dubrovnik"
# "Find award flights New York to Tokyo on United miles, business class"
# "What's the baggage allowance on Copa Airlines economy?"
```

**For Globant — custom price alert system on top:**
```python
import anthropic
import json

client = anthropic.Anthropic()

def check_route_price(origin: str, destination: str, date: str, target_price: float):
    """Use trvl MCP to check if a route has dropped to target price"""
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        system="Search flights and return JSON with {price, airline, departure_time, direct}.",
        messages=[{"role": "user",
                   "content": f"Find cheapest flight {origin} to {destination} on {date}. Return JSON only."}]
    )
    # Parse response, compare to target_price, send WhatsApp alert if under threshold
    result = json.loads(response.content[0].text)
    if float(result["price"]) < target_price:
        send_whatsapp_alert(f"Price alert: {origin}→{destination} now ${result['price']}!")
    return result
```

**Build time**: 2-3 weeks (vs 6-8 weeks for GDS integration) | **Cost**: $0 API keys for discovery layer

---

## Pattern 5: NDC-First Flight Deal System (Duffel)

**Stack**: Duffel API (400+ airlines, NDC-first) + LangGraph + PostgreSQL + WhatsApp notifications

**Key insight**: Duffel gives direct airline pricing (no GDS markup) — how LetsFG achieved $116 savings vs Google Flights.

**Repos**: [duffelhq/duffel-api-python](https://github.com/duffelhq/duffel-api-python) + Reference: [LetsFG/LetsFG](https://github.com/LetsFG/LetsFG)

```python
from duffel_api import Duffel

client = Duffel(access_token="...")

def search_route_ndc(origin: str, destination: str, date: str) -> dict:
    """NDC-first flight search via Duffel — direct airline pricing"""
    offer_requests = client.offer_requests.create({
        "slices": [{"origin": origin, "destination": destination, "departure_date": date}],
        "passengers": [{"type": "adult"}], "cabin_class": "economy",
        "max_connections": 0  # non-stop only for apples-to-apples comparison
    })
    offers = list(client.offers.list(offer_requests.id))
    best = min(offers, key=lambda o: float(o.total_amount))
    return {
        "price": best.total_amount,
        "currency": best.total_currency,
        "airline": best.slices[0].segments[0].marketing_carrier.name,
        "departure": best.slices[0].segments[0].departing_at,
        "arrival": best.slices[0].segments[-1].arriving_at
    }

def compare_vs_gds(route: dict, amadeus_price: float) -> dict:
    """Compare NDC price vs GDS to show savings"""
    ndc_price = float(route["price"])
    savings = amadeus_price - ndc_price
    return {"ndc_price": ndc_price, "gds_price": amadeus_price, "savings": savings,
            "savings_pct": round((savings / amadeus_price) * 100, 1)}
```

**Build time**: 3-4 weeks | **Margin**: Affiliate/white-label for travel agencies | **Impact**: 5-15% savings demonstrated to end users

---

## Pattern 6: LATAM Tour Operator CRM + AI Agent

**Stack**: ExcursioX (MIT) + OpenAI Agents SDK + Claude + Twilio WhatsApp + Yatra (WordPress) for booking pages

**Repos**: [moizkamran/ExcursioX](https://github.com/moizkamran/ExcursioX) + [openai/openai-agents-python](https://github.com/openai/openai-agents-python) + [mantrabrain/yatra](https://github.com/mantrabrain/yatra)

```
WhatsApp message: "Quero fazer um tour em Paraty para 4 pessoas em setembro"
  ↓
Lead Qualification Agent (Portuguese)
  → "Ótimo! Para montar o roteiro ideal: qual data exata? Quantos adultos/crianças?"
  → "Qual é o orçamento por pessoa?"
  ↓
Quote Generation Agent → ExcursioX pricing API → PDF quote in 30 seconds
  ↓
Follow-up Agent → 24h: "Oi! Viu nossa proposta? Tem alguma dúvida?"
  → Objection handling scripts (price / dates / group size)
  ↓
Booking Confirmation Agent
  → PIX payment link (Brazil) / MercadoPago (Argentina/Colombia)
  → ExcursioX booking created automatically
  ↓
Pre-departure Agent (48h before)
  → Lista de bagagem + ponto de encontro + previsão do tempo
  → WhatsApp reminder with exact meeting location on Google Maps
```

**Build time**: 3-4 weeks | **Impact**: 3-5x faster quotes, -40-60% admin | **Lift**: 20-30% more bookings | **LATAM languages**: Portuguese (Brazil), Spanish (LATAM)

---

## Pattern 7: Hotel Revenue Management AI (QloApps + Competitive Rate Intel)

**Stack**: QloApps (historical data) + DIDA hotel MCP (competitor rates) + darts (forecasting) + Claude

**Repos**: [Qloapps/QloApps](https://github.com/Qloapps/QloApps) + [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) + [unit8co/darts](https://github.com/unit8co/darts) (Apache 2.0)

```python
import anthropic
from darts import TimeSeries
from darts.models import ExponentialSmoothing

client = anthropic.Anthropic()

async def daily_pricing_review(hotel_id: str):
    # 1. Forecast occupancy with darts
    historical_occupancy = get_qlo_booking_history(hotel_id, days=365)
    ts = TimeSeries.from_values(historical_occupancy)
    model = ExponentialSmoothing()
    model.fit(ts)
    forecast = model.predict(30)  # 30-day occupancy forecast

    # 2. Get competitor rates via DIDA MCP
    comp_rates = await dida_mcp.search_hotels(
        location=get_hotel_location(hotel_id), date=tomorrow_str())

    # 3. Get local events that affect demand
    events = get_local_events(city=get_hotel_city(hotel_id), days=30)

    # 4. Claude generates rate recommendations
    rec = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2048,
        messages=[{"role": "user", "content": f"""
        Hotel revenue management recommendations.
        Current rate: ${get_current_rate(hotel_id)}/night
        30-day occupancy forecast: {forecast.values().tolist()}
        Competitor rates (check-in {tomorrow_str()}): {comp_rates}
        Local events next 30 days: {events}

        Recommend daily rate adjustments for the next 30 days.
        Format as JSON: [{{"date": "YYYY-MM-DD", "recommended_rate": NNN, "reason": "..."}}]
        """}])

    recommendations = parse_rate_recommendations(rec.content[0].text)
    post_to_slack(f"Rate recommendations for {hotel_id}: {len(recommendations)} adjustments")
    apply_rates_to_qlo(hotel_id, recommendations)
    return recommendations
```

**Build time**: 4-5 weeks | **Impact**: 8-15% RevPAR improvement | **vs IDeaS G3 RMS**: ~$50k/yr commercial alternative

---

## Pattern 8: Medical Tourism Platform (Yatra-Vritta Pattern)

**Stack**: Yatra-Vritta base + Claude + FastAPI + destination scoring API + partner hospital integrations

**Repos**: [Vipul-Mhatre/Yatra-Vritta](https://github.com/Vipul-Mhatre/Yatra-Vritta) + [openai/openai-agents-python](https://github.com/openai/openai-agents-python)

```python
from agents import Agent, tool
import numpy as np
from sklearn.neighbors import KNeighborsClassifier

# Destination scoring matrix (weights from Yatra-Vritta methodology)
SCORING_WEIGHTS = {
    "medical_quality": 0.30,      # JCI accreditation, specialist density
    "cost_vs_origin": 0.25,        # treatment cost relative to patient's home country
    "accessibility": 0.20,         # flight connections, visa ease
    "safety": 0.15,               # political stability, crime index
    "tourism_infrastructure": 0.10 # hotels near hospitals, recovery facilities
}

@tool
def rank_destinations_for_procedure(procedure: str, budget_usd: float,
                                     origin_country: str) -> list:
    """Rank global medical tourism destinations for a specific procedure"""
    destinations = get_medical_destinations_data(procedure)  # from Yatra-Vritta dataset
    scored = []
    for dest in destinations:
        score = sum(dest[k] * w for k, w in SCORING_WEIGHTS.items())
        scored.append({**dest, "score": round(score, 3)})
    return sorted(scored, key=lambda x: x["score"], reverse=True)[:5]

@tool
def build_medical_itinerary(destination: str, procedure: str,
                              recovery_days: int) -> dict:
    """Build full medical + tourism itinerary"""
    return {
        "hospital": get_top_hospital(destination, procedure),
        "accommodation": get_recovery_hotels(destination, budget="medical"),
        "post_recovery_activities": get_light_activities(destination, recovery_days),
        "travel_logistics": get_flight_options(destination),
        "total_cost_estimate": estimate_total_cost(procedure, destination, recovery_days)
    }

medical_agent = Agent(
    name="Medical Tourism Advisor",
    model="claude-sonnet-5",
    tools=[rank_destinations_for_procedure, build_medical_itinerary],
    instructions=(
        "You are a medical tourism advisor. Never give medical advice. "
        "Help patients understand destination options, costs, and logistics. "
        "Always recommend consulting with their doctor before traveling for treatment. "
        "Focus on: cost savings, quality indicators (JCI accreditation), accessibility."
    )
)
```

**Build time**: 6-8 weeks | **Target**: Healthcare networks, insurance companies, medical brokers | **Market**: $100B+ global medical tourism market

---

## Pattern 9: Zero-Key Travel Assistant (trvl + Claude — Quickest to Deploy)

This is the fastest pattern to production: no API keys, no GDS contract, no setup beyond a Go binary.

```bash
# Install trvl (single Go binary)
go install github.com/MikkoParkkola/trvl@latest

# Start as MCP server
trvl mcp

# Claude Desktop config (~/.claude/settings.json)
{
  "mcpServers": {
    "travel": {
      "command": "trvl",
      "args": ["mcp"]
    }
  }
}
```

**What Claude can now do with zero API keys:**
- "Find flights from GRU to MAD in November, cheapest option"
- "Hotels near Ipanema beach September 15-20, under $120/night"
- "Ferry from Lisbon to Sesimbra"
- "What's the baggage policy on LATAM Airlines economy?"
- "Award flights Buenos Aires to Miami on American miles"
- "Compare hotel prices Airbnb vs Booking.com for Medellín"

**Build time**: 2 hours to demo | **Production readiness**: 1-2 weeks (add conversation persistence, user auth, WhatsApp integration)

---

## Pattern 10: Production LangGraph Travel Planner (Amadeus + Hotelbeds + Twilio)

**Stack**: LangGraph + Amadeus Python SDK + Hotelbeds API + Twilio SMS + HubSpot CRM + Claude claude-sonnet-5

**Repos**: [HarimxChoi/langgraph-travel-agent](https://github.com/HarimxChoi/langgraph-travel-agent) + [amadeus4dev/amadeus-python](https://github.com/amadeus4dev/amadeus-python)

**Why this pattern (Jul-2026)**: First open-source architecture combining Amadeus + Hotelbeds for professional travel package generation. Generates Budget/Balanced/Premium tiers automatically. Hotelbeds provides contracted B2B hotel rates below OTA pricing.

```python
from langgraph.graph import StateGraph, END
from amadeus import Client as AmadeusClient
from anthropic import Anthropic
from typing import TypedDict, Annotated
import operator
import requests

anthropic_client = Anthropic()
amadeus = AmadeusClient(client_id="...", client_secret="...")
HOTELBEDS_API = "https://api.test.hotelbeds.com/hotel-api/1.0"
HOTELBEDS_KEY = "..."
HOTELBEDS_SECRET = "..."

class TravelState(TypedDict):
    request: str
    destination: str
    check_in: str
    check_out: str
    origin: str
    passengers: int
    budget_usd: float
    flights: Annotated[list, operator.add]
    hotels: Annotated[list, operator.add]
    activities: Annotated[list, operator.add]
    packages: dict  # budget / balanced / premium
    itinerary: str

def parse_request_node(state: TravelState) -> TravelState:
    """Use Claude to extract structured fields from natural language request"""
    response = anthropic_client.messages.create(
        model="claude-sonnet-5",
        max_tokens=512,
        messages=[{"role": "user", "content": f"""
        Extract travel details from this request as JSON:
        {state['request']}
        Return: {{"destination": "", "origin": "", "check_in": "YYYY-MM-DD", 
                  "check_out": "YYYY-MM-DD", "passengers": 1, "budget_usd": 0}}
        """}]
    )
    import json
    parsed = json.loads(response.content[0].text)
    return {**state, **parsed}

def search_flights_node(state: TravelState) -> TravelState:
    """Search Amadeus for flights — NDC-aware pricing"""
    try:
        result = amadeus.shopping.flight_offers_search.get(
            originLocationCode=state["origin"],
            destinationLocationCode=state["destination"],
            departureDate=state["check_in"],
            adults=state["passengers"],
            max=5,
            currencyCode="USD"
        )
        flights = [{"price": float(o["price"]["total"]),
                    "airline": o["validatingAirlineCodes"][0],
                    "departure": o["itineraries"][0]["segments"][0]["departure"]["at"]}
                   for o in result.data[:3]]
    except Exception:
        flights = []
    return {**state, "flights": flights}

def search_hotels_hotelbeds_node(state: TravelState) -> TravelState:
    """Search Hotelbeds for contracted B2B hotel rates"""
    import hashlib, time
    timestamp = str(int(time.time()))
    signature = hashlib.sha256(
        f"{HOTELBEDS_KEY}{HOTELBEDS_SECRET}{timestamp}".encode()
    ).hexdigest()
    headers = {"Api-key": HOTELBEDS_KEY, "X-Signature": signature,
               "Accept": "application/json"}
    payload = {
        "stay": {"checkIn": state["check_in"], "checkOut": state["check_out"]},
        "occupancies": [{"rooms": 1, "adults": state["passengers"], "children": 0}],
        "destination": {"code": state["destination"]},
        "filter": {"maxHotels": 5, "maxRooms": 3}
    }
    try:
        resp = requests.post(f"{HOTELBEDS_API}/hotels", json=payload, headers=headers)
        hotels = [{"name": h["name"], "price": h["minRate"], "stars": h["categoryCode"]}
                  for h in resp.json().get("hotels", {}).get("hotels", [])[:3]]
    except Exception:
        hotels = []
    return {**state, "hotels": hotels}

def generate_packages_node(state: TravelState) -> TravelState:
    """Claude generates Budget / Balanced / Premium travel packages"""
    response = anthropic_client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2048,
        messages=[{"role": "user", "content": f"""
        Create 3 travel packages from these options:
        Flights: {state['flights']}
        Hotels (Hotelbeds B2B rates): {state['hotels']}
        Budget: ${state['budget_usd']} total for {state['passengers']} passengers
        
        Generate Budget (minimize cost), Balanced (value/quality), Premium (best quality) packages.
        For each: selected flight, selected hotel, estimated total, key inclusions, pros/cons.
        Return JSON: {{"budget": {{}}, "balanced": {{}}, "premium": {{}}}}
        """}]
    )
    import json
    packages = json.loads(response.content[0].text)
    return {**state, "packages": packages}

def format_itinerary_node(state: TravelState) -> TravelState:
    """Claude formats the recommended package as a readable itinerary"""
    recommended = state["packages"].get("balanced", state["packages"])
    response = anthropic_client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        messages=[{"role": "user", "content": f"""
        Format this travel package as a friendly itinerary for WhatsApp/SMS:
        {recommended}
        Trip: {state['origin']} → {state['destination']}
        Dates: {state['check_in']} to {state['check_out']}
        Keep it concise, use emojis, under 500 chars for SMS.
        """}]
    )
    return {**state, "itinerary": response.content[0].text}

# Build the LangGraph state machine
builder = StateGraph(TravelState)
builder.add_node("parse", parse_request_node)
builder.add_node("search_flights", search_flights_node)
builder.add_node("search_hotels", search_hotels_hotelbeds_node)
builder.add_node("generate_packages", generate_packages_node)
builder.add_node("format_itinerary", format_itinerary_node)

builder.set_entry_point("parse")
builder.add_edge("parse", "search_flights")
builder.add_edge("parse", "search_hotels")   # parallel with search_flights
builder.add_edge("search_flights", "generate_packages")
builder.add_edge("search_hotels", "generate_packages")
builder.add_edge("generate_packages", "format_itinerary")
builder.add_edge("format_itinerary", END)

travel_graph = builder.compile()

# Usage
result = travel_graph.invoke({
    "request": "Plan a 5-day trip to Buenos Aires for 2 people from São Paulo, budget $2500",
    "flights": [], "hotels": [], "activities": [], "packages": {}, "itinerary": ""
})
print(result["itinerary"])  # SMS-ready itinerary
```

**Build time**: 3-4 weeks | **Target**: Travel agencies, tour operators, online travel portals | **Advantage vs Pattern 2**: Hotelbeds B2B rates give 10-20% price advantage over OTA rates shown by Amadeus hotel search

---

## Pattern 11: OTA × Claude Discovery Layer (Expedia Blueprint)

**Stack**: Claude claude-sonnet-5 + Anthropic SDK tool use + Client OTA booking engine + Amadeus (for price history)

**Repos**: [amadeus4dev/amadeus-python](https://github.com/amadeus4dev/amadeus-python) | **Model**: `claude-sonnet-5`

**The Expedia pattern, recreatable for any LATAM OTA:**

```python
import anthropic
import json

client = anthropic.Anthropic()

# Tool definitions — Claude calls these, then routes to OTA checkout
tools = [
    {
        "name": "search_flights",
        "description": "Search available flights between two cities for given dates",
        "input_schema": {
            "type": "object",
            "properties": {
                "origin": {"type": "string", "description": "IATA code (e.g. GRU, MIA)"},
                "destination": {"type": "string", "description": "IATA code"},
                "depart_date": {"type": "string", "description": "YYYY-MM-DD"},
                "return_date": {"type": "string", "description": "YYYY-MM-DD, optional"},
                "adults": {"type": "integer", "default": 1}
            },
            "required": ["origin", "destination", "depart_date"]
        }
    },
    {
        "name": "search_hotels",
        "description": "Search hotels in a city for given dates",
        "input_schema": {
            "type": "object",
            "properties": {
                "city_code": {"type": "string", "description": "IATA city code"},
                "check_in": {"type": "string"},
                "check_out": {"type": "string"},
                "adults": {"type": "integer", "default": 1},
                "max_price": {"type": "number", "description": "Maximum price per night in USD"}
            },
            "required": ["city_code", "check_in", "check_out"]
        }
    },
    {
        "name": "check_price_intelligence",
        "description": "Check if a flight or hotel price is typical, high, or low vs historical data",
        "input_schema": {
            "type": "object",
            "properties": {
                "type": {"type": "string", "enum": ["flight", "hotel"]},
                "origin": {"type": "string"},
                "destination": {"type": "string"},
                "price": {"type": "number"},
                "travel_date": {"type": "string"}
            },
            "required": ["type", "destination", "price", "travel_date"]
        }
    },
    {
        "name": "generate_booking_link",
        "description": "Generate a deep link to the OTA checkout page for a selected option",
        "input_schema": {
            "type": "object",
            "properties": {
                "option_id": {"type": "string"},
                "option_type": {"type": "string", "enum": ["flight", "hotel", "package"]}
            },
            "required": ["option_id", "option_type"]
        }
    }
]

def run_ota_discovery_agent(user_message: str, conversation_history: list) -> dict:
    """OTA discovery layer: Claude searches, user chooses, OTA closes the sale."""
    conversation_history.append({"role": "user", "content": user_message})
    
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2048,
        system=(
            "You are a friendly travel planning assistant for {CLIENT_OTA_NAME}. "
            "Help travelers find great flights and hotels. "
            "Always use price intelligence to tell travelers if a price is typical, high, or low. "
            "When the traveler is ready to book, use generate_booking_link to send them to checkout. "
            "Never complete the booking yourself — always generate a booking link for the traveler to confirm. "
            "Respond in the traveler's language (Spanish or Portuguese for LATAM, English by default)."
        ),
        tools=tools,
        messages=conversation_history
    )
    
    # Handle tool calls
    if response.stop_reason == "tool_use":
        tool_results = []
        for block in response.content:
            if block.type == "tool_use":
                result = execute_tool(block.name, block.input)  # call Amadeus / OTA APIs
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": json.dumps(result)
                })
        
        conversation_history.append({"role": "assistant", "content": response.content})
        conversation_history.append({"role": "user", "content": tool_results})
        
        # Get final response with tool results
        final_response = client.messages.create(
            model="claude-sonnet-5",
            max_tokens=2048,
            system=response.system,
            tools=tools,
            messages=conversation_history
        )
        return {"text": final_response.content[-1].text, "history": conversation_history}
    
    return {"text": response.content[-1].text, "history": conversation_history}

# Example usage — LATAM OTA integration
history = []
result = run_ota_discovery_agent(
    "Quero ir de São Paulo para Cancún para o carnaval, quero hotéis na praia", history)
print(result["text"])
# Claude searches flights GRU→CUN, searches beach hotels Cancún, checks prices,
# then generates deep link to OTA checkout with pre-filled parameters
```

**Key difference from full autonomous booking**: `generate_booking_link` sends the traveler to a checkout page they confirm. Claude never completes payment.

**Build time**: 3-4 weeks | **Target**: LATAM OTAs wanting AI discovery without building full AI platform | **Deal size**: $60-200k | **Model**: Referral traffic improvement + conversion lift

---

## Pattern 12: Framework-Free MCP Travel Agent (Minimal Dependencies)

**Stack**: Python + MCP client (no LangGraph, no CrewAI) + travel-mcp-server + Claude

**Repos**: [Fieldy76/Agentic-Travel-Planner](https://github.com/Fieldy76/Agentic-Travel-Planner) | [lev-corrupted/travel-mcp-server](https://github.com/lev-corrupted/travel-mcp-server)

**When to use**: Quick deployment, small team, want to avoid framework lock-in, or the task is conversational (not parallelizable).

```python
import anthropic
import asyncio
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def travel_agent(user_request: str) -> str:
    """Framework-free travel agent: direct MCP tool calls in a Python loop."""
    
    server_params = StdioServerParameters(
        command="python",
        args=["travel_mcp_server.py"],  # or use lev-corrupted/travel-mcp-server
    )
    
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            
            # Get available tools from MCP server
            tools_result = await session.list_tools()
            tools = [
                {
                    "name": t.name,
                    "description": t.description,
                    "input_schema": t.inputSchema
                }
                for t in tools_result.tools
            ]
            
            client = anthropic.Anthropic()
            messages = [{"role": "user", "content": user_request}]
            
            # Agent loop: no framework, just Python
            while True:
                response = client.messages.create(
                    model="claude-haiku-4-5-20251001",  # Use Haiku for cost efficiency
                    max_tokens=4096,
                    tools=tools,
                    messages=messages
                )
                
                if response.stop_reason == "end_turn":
                    return response.content[-1].text
                
                # Process all tool calls
                tool_results = []
                for block in response.content:
                    if block.type == "tool_use":
                        result = await session.call_tool(block.name, block.input)
                        tool_results.append({
                            "type": "tool_result",
                            "tool_use_id": block.id,
                            "content": str(result.content[0].text if result.content else "")
                        })
                
                messages.append({"role": "assistant", "content": response.content})
                messages.append({"role": "user", "content": tool_results})

# Run
result = asyncio.run(travel_agent(
    "Find the cheapest week to fly from Buenos Aires to Miami in October. "
    "Also find 3-star hotels under $100/night near South Beach."
))
print(result)
```

**Framework comparison for travel agents:**
| Approach | Best For | Overhead | Debuggability |
|----------|----------|----------|---------------|
| Framework-free (this pattern) | Linear tasks, quick PoC, small teams | Minimal | Excellent |
| LangGraph | Parallel agents, complex state machines | Medium | Good |
| CrewAI | Role-based delegation, longer pipelines | Medium | Good |
| OpenAI Agents SDK | OpenAI-native teams, MCP integration | Low | Good |

**Build time**: 1-2 weeks | **Dependencies**: anthropic + mcp Python packages only | **Cost**: ~$0.001-0.005/query with Haiku

---

## Pattern Selection Matrix (Updated v4)

| Situation | Pattern | Stack | Build Time | Deal Size |
|-----------|---------|-------|------------|-----------|
| LATAM hotel wants WhatsApp chatbot | P1 | QloApps + Claude + Twilio | 2-3 weeks | $30-80k |
| Corporate travel needs policy automation | P2 | Amadeus + LangGraph + Slack | 4-6 weeks | $80-200k |
| Tourism board wants destination planner | P3 | OpenTripPlanner + Amadeus | 6-8 weeks | $100-300k |
| Client wants quick demo (no API keys) | P4 | trvl + Claude | 2-3 days | PoC |
| Travel agency wants direct pricing | P5 | Duffel NDC + LangGraph | 3-4 weeks | $50-150k |
| Tour operator has WhatsApp leads | P6 | ExcursioX + Claude + WhatsApp | 3-4 weeks | $40-120k |
| Hotel wants dynamic pricing | P7 | QloApps + darts + Claude | 4-5 weeks | $60-180k |
| Client needs medical tourism platform | P8 | Yatra-Vritta + Claude | 6-8 weeks | $100-250k |
| Zero-key proof of concept | P9 | trvl MCP | 2 hours | Demo |
| OTA / agency needs full package builder | P10 | LangGraph + Amadeus + Hotelbeds | 3-4 weeks | $60-200k |
| LATAM OTA wants "Expedia × Claude" pattern | P11 | Claude SDK + Amadeus + OTA checkout | 3-4 weeks | $60-200k |
| Small team, fast deployment, no framework | P12 | Python + MCP + Claude Haiku | 1-2 weeks | $30-80k |

---
*Updated: 2026-07-08 (v3)*
