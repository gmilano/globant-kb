# Composition Patterns — Travel & Hospitality

> Concrete recipes combining open-source repos + AI agents.
> Each pattern names specific repos, wiring, and estimated build time.
> Last updated: 2026-07-06

---

## Pattern 1: MCP-First Conversational Travel Search

**Use case**: Natural-language flight + hotel search for a web or WhatsApp interface. User types "I want to fly Buenos Aires to Miami next weekend, 4-star hotel, 3 nights" and gets ranked options.

**Components:**
- `punitarani/fli` — Google Flights search (free, no API key)
- `RollingGo-AI/rollinggo-hotel-mcp` — Hotel search (2M+ hotels, free)
- Claude 3.5 Sonnet (or claude-sonnet-5) as the conversational agent
- Optional: `esakrissa/hotels_mcp_server` for Booking.com Western coverage

**Architecture:**
```
User message
    ↓
Claude (tool_use) — interprets intent, extracts params
    ├── fli.search_flights(origin, dest, dates, cabin)
    └── rollinggo.search_hotels(city, checkin, checkout, guests, stars)
         ↓
Claude synthesizes results → ranked itinerary response
    ↓
User refines ("cheaper flights?", "only 5-star", "show beach hotels")
```

**Wire-up (Python):**
```python
import anthropic
from fli import FlightSearch  # punitarani/fli
# rollinggo-hotel-mcp runs as MCP server on port 3000

client = anthropic.Anthropic()
tools = [
    {
        "name": "search_flights",
        "description": "Search Google Flights for available routes",
        "input_schema": {
            "type": "object",
            "properties": {
                "origin": {"type": "string", "description": "IATA code"},
                "destination": {"type": "string"},
                "departure_date": {"type": "string", "description": "YYYY-MM-DD"},
                "return_date": {"type": "string"},
                "cabin_class": {"type": "string", "enum": ["economy", "business", "first"]}
            },
            "required": ["origin", "destination", "departure_date"]
        }
    },
    # rollinggo tools loaded from MCP server manifest
]
```

**Estimated build time**: 1-2 weeks (includes WhatsApp channel via Twilio if needed)

---

## Pattern 2: Full Agentic Trip Planner (LangGraph Multi-Agent)

**Use case**: End-to-end trip planning: user describes a trip, agent researches flights, books hotels, plans itinerary, includes activities, sends confirmation. Human-in-the-loop before final booking.

**Components:**
- `langchain-ai/langgraph` — StateGraph orchestration
- `punitarani/fli` — Flight search
- `ravinahp/flights-mcp` — Duffel for actual booking (creates real PNR)
- `RollingGo-AI/rollinggo-hotel-mcp` — Hotel search + booking
- `alibaba-flyai/flyai-skill` — Attractions, activities, local transport
- `crewAIInc/crewAI` — Itinerary drafting crew
- Tavily or Firecrawl — Live web research for activities/restaurants

**Architecture:**
```
User: "Plan a 7-day trip to Tokyo for 2, October, $6000 budget, love food and art"
    ↓
TripPlannerGraph (LangGraph StateGraph)
    ├── FlightNode: fli.search() → top 3 options → HITL confirm
    ├── HotelNode: rollinggo.search() → top 5 hotels → HITL confirm  
    ├── ActivitiesNode: flyai-skill.search_attractions() + Tavily web search
    ├── ItineraryNode: CrewAI crew (planner_agent + local_expert_agent)
    └── BookingNode: flights-mcp.book() + rollinggo.book() → confirmation
         ↓
Trip object: {flights, hotel, itinerary, budget_breakdown, confirmation_codes}
```

**LangGraph State:**
```python
from typing import TypedDict, List, Optional
from langgraph.graph import StateGraph, END

class TripState(TypedDict):
    user_request: str
    destination: str
    dates: dict
    budget: float
    travelers: int
    flights: Optional[List[dict]]
    hotel: Optional[dict]
    activities: Optional[List[dict]]
    itinerary: Optional[str]
    confirmed: bool
    booking_refs: Optional[dict]
```

**Estimated build time**: 4-6 weeks (MVP with human-in-the-loop; 8 weeks for auto-booking)

---

## Pattern 3: Hotel Concierge AI (WhatsApp + QloApps)

**Use case**: Hotel property deploys a 24/7 WhatsApp concierge. Guests can check availability, book rooms, request services (late checkout, restaurant reservation, housekeeping), get local recommendations — all via WhatsApp.

**Components:**
- `Qloapps/QloApps` — Hotel PMS backend (reservations, room inventory, front desk)
- `langchain-ai/langgraph` — Concierge agent orchestration
- Twilio WhatsApp API — Channel
- `RollingGo-AI/rollinggo-hotel-mcp` or QloApps REST API — Room search/booking
- Claude Haiku — Fast response generation (cost-optimized for high volume)

**Architecture:**
```
Guest WhatsApp message → Twilio webhook → FastAPI endpoint
    ↓
ConciergAgent (LangGraph)
    ├── IntentClassifier: "booking" | "service_request" | "info" | "complaint"
    ├── BookingAgent: QloApps REST API → check_availability → create_reservation
    ├── ServiceAgent: QloApps housekeeping/F&B API → create_service_request
    └── RecoAgent: local attractions search (flyai-skill or Google Places MCP)
         ↓
Response in guest language (Spanish/Portuguese/English)
    ↓
Twilio → WhatsApp message to guest
```

**QloApps REST Hook:**
```python
import httpx

async def check_hotel_availability(checkin: str, checkout: str, adults: int):
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{QLOAPPS_BASE}/api/rooms/availability",
            params={"checkin": checkin, "checkout": checkout, "adults": adults},
            headers={"Authorization": f"Bearer {QLOAPPS_API_KEY}"}
        )
        return response.json()
```

**Estimated build time**: 3-4 weeks (2 weeks QloApps setup + 2 weeks agent)

---

## Pattern 4: Corporate Travel Management Agent

**Use case**: Corporate travel bot enforces travel policy while searching best rates. Employee says "I need to fly to NYC for a client meeting next Tuesday," agent finds policy-compliant options, gets manager approval, books, adds to expense system.

**Components:**
- `donghyun-chae/mcp-amadeus` — Amadeus GDS (corporate fares, negotiated rates)
- `amadeus4dev/amadeus-python` — Trip Purpose Prediction, corporate hotel search
- `HarimxChoi/langgraph-travel-agent` — Production reference (Amadeus + Hotelbeds + HubSpot)
- `langchain-ai/langgraph` — Policy enforcement + approval workflow
- HubSpot or Salesforce CRM — Trip logging
- Slack API — Manager approval notifications

**Architecture:**
```
Employee Slack message: "Need flight NYC Jun 15-17, hotel near Midtown"
    ↓
TravelPolicyAgent (LangGraph)
    ├── PolicyChecker: max fare class, advance booking rules, preferred hotels
    ├── FlightAgent: amadeus.flight_offers_search(policy_params)
    ├── HotelAgent: amadeus.hotel_search(corporate_rate_code) 
    ├── ApprovalWorkflow: HITL → Slack notification to manager
    ├── BookingAgent: amadeus.flight_orders_create() (post-approval)
    └── ExpenseAgent: log to HubSpot deal / Concur expense system
         ↓
Employee gets booking confirmation + calendar invite
```

**Policy enforcement:**
```python
TRAVEL_POLICY = {
    "max_flight_cabin": "economy",  # business if >6hr or >$500 fare diff
    "advance_booking_days": 7,       # must book 7+ days out
    "preferred_hotel_chains": ["Marriott", "Hilton", "IHG"],
    "max_hotel_rate_usd": 250,
    "approval_required_above_usd": 1500
}
```

**Estimated build time**: 6-8 weeks (corporate policy complexity drives timeline)

---

## Pattern 5: LATAM Travel Intelligence Dashboard

**Use case**: Travel management company (TMC) or OTA wants competitive intelligence on LATAM routes: price trends, demand signals, competitor pricing, optimal booking windows.

**Components:**
- `crewAIInc/crewAI` — Research crew (multi-agent scraping + synthesis)
- `punitarani/fli` — Real-time Google Flights pricing
- `amadeus4dev/amadeus-python` — Amadeus Flight Delay Prediction + Inspiration Search
- Firecrawl — Despegar/Almundo pricing scraper (structured extraction)
- LangGraph — Daily batch pipeline
- PostgreSQL + pgvector — Price history + vector search

**Crew Architecture:**
```
PricingIntelligenceCrew (CrewAI)
    ├── PriceScraperAgent: fli + Firecrawl → Despegar/Almundo prices
    ├── TrendAnalystAgent: amadeus.flight_inspiration_search() → demand signals
    ├── CompetitorAgent: web search → competitor promotions, route changes
    └── ReportWriterAgent: synthesize → weekly intelligence brief
         ↓
Dashboard (Streamlit or Metabase) showing:
- Price trends by route (BUE→MIA, GRU→LIS, BOG→NYC)
- Demand index (search volume proxies)
- Optimal booking window recommendations
- Competitor promotional activity
```

**LangGraph pipeline:**
```python
from langgraph.graph import StateGraph

class IntelState(TypedDict):
    routes: List[str]
    price_data: dict
    demand_data: dict
    competitor_data: dict
    brief: str

pipeline = StateGraph(IntelState)
pipeline.add_node("scrape_prices", scrape_prices_node)
pipeline.add_node("fetch_amadeus", fetch_amadeus_node)
pipeline.add_node("research_competitors", research_competitors_node)
pipeline.add_node("generate_brief", generate_brief_node)
# Run daily via cron
```

**Estimated build time**: 4-6 weeks

---

## Pattern 6: A2A Federated Travel Platform

**Use case**: Platform aggregating multiple specialized travel agents that can be composed on demand. Each agent is independently deployable and communicates via A2A protocol. Enables a marketplace of travel capabilities.

**Components:**
- `a2aproject/A2A` — Protocol foundation (Apache 2.0, ~20k★)
- `extrawest/a2a_protocol_fundamentals_python` — Reference travel implementation
- `Azure-Samples/app-service-a2a-travel-agent` — Enterprise deployment reference
- Google ADK — Master trip planner agent
- CrewAI — Hotel booking specialist agent
- LangGraph — Flight search specialist agent
- FastAPI — A2A server transport layer per agent

**Architecture:**
```
TripPlannerAgent (Google ADK, port 10001) — master coordinator
    A2A →  FlightAgent      (LangGraph, port 10002) — fli + amadeus
    A2A →  HotelAgent       (CrewAI, port 10003)    — rollinggo + QloApps
    A2A →  CarRentalAgent   (LangGraph, port 10004) — partner APIs
    A2A →  CurrencyAgent    (FastAPI, port 10005)    — FX rates + budgeting
    A2A →  ActivitiesAgent  (CrewAI, port 10006)    — flyai-skill + Viator
```

**Agent Card (A2A spec):**
```json
{
  "name": "TravelHotelAgent",
  "description": "Search and book hotels from 2M+ properties worldwide",
  "url": "http://hotel-agent:10003",
  "version": "1.0.0",
  "capabilities": {
    "streaming": true,
    "pushNotifications": true
  },
  "skills": [
    {"id": "hotel_search", "name": "Search Hotels"},
    {"id": "hotel_book", "name": "Book Hotel"},
    {"id": "hotel_cancel", "name": "Cancel Reservation"}
  ]
}
```

**Why A2A over monolith**: Independent scaling, language-agnostic (each agent in best-fit language), team autonomy (hotel team owns hotel agent), incremental capability addition.

**Estimated build time**: 8-12 weeks (infrastructure-heavy; justified for platform products)

---

## Anti-Patterns to Avoid

| Anti-Pattern | Why It Fails | Better Alternative |
|--------------|-------------|-------------------|
| Scraping OTA websites for flight/hotel data | Fragile, TOS violation, rate-limited | Use fli (Google Flights reverse API), flights-mcp (Duffel), rollinggo-hotel-mcp |
| Building a proprietary hotel inventory | Expensive, stale data | Rollinggo-hotel-mcp: 2M+ hotels, real-time, free |
| Synchronous multi-step booking (no HITL) | Books wrong flights, angry customers | LangGraph HITL confirmation before booking step |
| Ignoring NDC | Miss ancillary revenue, poor offer quality | Duffel/Amadeus NDC APIs for ancillary-aware offers |
| One monolithic agent for all travel tasks | Context overflow, poor tool selection | Specialized agents per domain via A2A/LangGraph |

---
*Updated by ingest pipeline — 2026-07-06.*
