# Composition Patterns — Travel & Hospitality AI

> Concrete recipes using real repos. Build times for 2-3 dev Globant team.
> Last updated: 2026-07-07

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
    instructions="Warm hotel concierge. Confirm price+dates before booking. Match guest language."
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
    "approved_airlines": ["AA", "UA", "DL", "LH", "IB"],
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
        violations.append(f"Flight ${flight_price} exceeds limit")
    if airline not in TRAVEL_POLICY["approved_airlines"]:
        violations.append(f"Airline {airline} not approved")
    return {"compliant": not violations, "violations": violations}
```

**Workflow**: Request → Search Agent → Policy Check → Approval Router ($500 auto/$500-2k manager/$2k+ finance) → Book → Expense Record

**Build time**: 4-6 weeks | **Cost**: ~$0.10-0.30/booking | **Savings**: 2-3hr admin → 5 min per trip

---

## Pattern 3: Multi-Modal Trip Planner (OpenTripPlanner + Amadeus + LangGraph)

**Stack**: OpenTripPlanner (Java/GTFS/OSM) + OpenTravelData + Amadeus + LangGraph

**Repos**: [opentripplanner/OpenTripPlanner](https://github.com/opentripplanner/OpenTripPlanner) + [opentraveldata/opentraveldata](https://github.com/opentraveldata/opentraveldata) + [amadeus4dev/amadeus-python](https://github.com/amadeus4dev/amadeus-python)

```
User: "Plan 5-day trip to Buenos Aires for 2, budget $3000, from NYC"
  1. FlightAgent → Amadeus → JFK-EZE $580 RT/person
  2. HotelAgent → Amadeus/DIDA → Palermo hotels $120-180/night
  3. RoutingAgent → OpenTripPlanner → daily transit routes
  4. ActivityAgent → Amadeus Activities → Tango show, Tigre Delta, winery
  5. BudgetAgent → $1160 + $700 + $400 = $2260 ✓
  6. SynthesisAgent → formatted itinerary with map links
```

**Build time**: 6-8 weeks | **Deliverable**: Embeddable widget for tourism boards

---

## Pattern 4: Flight Deal Discovery (Duffel NDC-First)

**Stack**: Duffel API (400+ airlines, NDC-first) + LangGraph + PostgreSQL + WhatsApp notifications

**Key insight**: Duffel gives direct airline pricing (no GDS markup) — how LetsFG achieved $116 savings vs Google Flights.

```python
from duffel_api import Duffel

client = Duffel(access_token="...")

def search_route(origin: str, destination: str, date: str) -> dict:
    offer_requests = client.offer_requests.create({
        "slices": [{"origin": origin, "destination": destination, "departure_date": date}],
        "passengers": [{"type": "adult"}], "cabin_class": "economy"})
    offers = list(client.offers.list(offer_requests.id))
    return min(offers, key=lambda o: float(o.total_amount))
```

**Repos**: [duffelhq/duffel-api-python](https://github.com/duffelhq/duffel-api-python) + Reference: [LetsFG/LetsFG](https://github.com/LetsFG/LetsFG)

**Build time**: 3-4 weeks | **Margin**: Affiliate/white-label for travel agencies

---

## Pattern 5: LATAM Tour Operator CRM + AI Agent

**Stack**: ExcursioX (MIT) + OpenAI Agents SDK + Claude + Twilio WhatsApp + Google Sheets (migration)

**Repos**: [moizkamran/ExcursioX](https://github.com/moizkamran/ExcursioX) + [openai/openai-agents-python](https://github.com/openai/openai-agents-python)

```
WhatsApp inquiry
  → Lead Qualification Agent (budget? dates? group size? interests?)
  → Quote Generation Agent → ExcursioX pricing API → PDF quote
  → Follow-up Agent → 24h follow-up → objection handling
  → Booking Confirmation Agent → ExcursioX booking → confirmation
  → Pre-departure Agent → 48h before: packing list + meeting point + weather
```

**Build time**: 3-4 weeks | **Impact**: 3-5x faster quotes, -40-60% admin | **Lift**: 20-30% more bookings

---

## Pattern 6: Hotel Revenue Management AI Agent

**Stack**: QloApps (historical data) + DIDA hotel MCP (competitor rates) + darts (forecasting) + Claude

**Repos**: [Qloapps/QloApps](https://github.com/Qloapps/QloApps) + [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) + [unit8co/darts](https://github.com/unit8co/darts) (Apache 2.0)

```python
async def daily_pricing_review():
    occupancy = forecast_occupancy(qlo_booking_history, horizon_days=30)
    comp_rates = await dida_mcp.search_hotels(location=HOTEL_LOCATION, date=tomorrow)
    events = scrape_local_events_calendar(city=HOTEL_CITY, days=30)
    rec = claude.messages.create(
        model="claude-sonnet-5",
        messages=[{"role": "user", "content": f"""
        Hotel: {HOTEL_NAME}, current rate: ${current_rate}/night
        Occupancy forecast: {occupancy}% | Competitor rates: {comp_rates} | Events: {events}
        Recommend rate adjustments for next 30 days with exact dollar amounts.
        """}])
    post_to_slack(rec.content[0].text)
```

**Build time**: 4-5 weeks | **Impact**: 8-15% RevPAR improvement | **vs IDeaS G3 RMS**: ~$50k/yr commercial alternative

---
*Updated: 2026-07-07*
