# 🧩 Composition Patterns — Travel & Hospitality

> Concrete recipes using specific repos + agents + wiring. Globant-buildable.
> Last updated: 2026-07-14 (v6)

---

## Pattern Stack (Base Architecture)

```
[Vertical Platform Base (QloApps / Amadeus Django / custom)]
          ↓
[MCP Servers Layer: DIDA hotel + Google Flights + Maps + Sabre]
          ↓
[Orchestration: LangGraph state machine / mcp-agent]
          ↓
[LLM: Claude Sonnet 5 / GPT-4o]
          ↓
[Interface: React Chat UI / WhatsApp Business / Voice / REST API]
```

---

## P1 — Boutique Hotel AI Concierge

**Goal**: Give boutique/eco hotels an AI concierge that handles inquiries, checks availability, and upsells experiences — without replacing their existing PMS.

**Stack**:
- Base: [QloApps](https://github.com/Qloapps/QloApps) (hotel PMS + booking engine, OSL-3.0)
- Hotel inventory: [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) (2M+ hotels MCP, MIT)
- Maps/POI: [GongRzhe/TRAVEL-PLANNER-MCP-Server](https://github.com/GongRzhe/TRAVEL-PLANNER-MCP-Server) (MIT)
- Orchestration: [LangGraph](https://github.com/langchain-ai/langgraph) (MIT)
- LLM: Claude Sonnet 5

**Implementation**:
```python
from langgraph.graph import StateGraph, MessagesState
from anthropic import Anthropic
import subprocess  # MCP servers as subprocesses

# Wire MCP servers
mcp_servers = {
    "dida_hotel": "uvx dida-hotel-mcp",
    "google_maps": "uvx travel-planner-mcp",
}

# LangGraph state machine
builder = StateGraph(MessagesState)
builder.add_node("concierge", concierge_node)  # Claude with MCP tools
builder.add_node("booking", booking_node)       # QloApps REST API call
builder.add_node("upsell", upsell_node)         # experience recommendations
builder.set_entry_point("concierge")
graph = builder.compile()
```

**Estimated build**: 3-4 weeks · $40k-$80k engagement
**Target market**: LATAM boutique hotels (AR, MX, CO, PE)

---

## P2 — Agentic Flight Booking (Production)

**Goal**: Full conversational flight search → compare → book flow backed by real GDS inventory.

**Stack**:
- GDS: [amadeus4dev/amadeus-python](https://github.com/amadeus4dev/amadeus-python) (MIT) or Sabre Mosaic MCP
- Flight search fallback: [smamidipaka6/flights-mcp-server](https://github.com/smamidipaka6/flights-mcp-server) (MIT, no key)
- Orchestration: [HarimxChoi/langgraph-travel-agent](https://github.com/HarimxChoi/langgraph-travel-agent) (MIT) as reference
- Payment: PayPal Agentic Commerce API (production, Sabre+MindTrip pattern)
- Notifications: Twilio SMS/WhatsApp

**Implementation**:
```python
from amadeus import Client, ResponseError
from langgraph.graph import StateGraph

amadeus = Client(
    client_id='AMADEUS_CLIENT_ID',
    client_secret='AMADEUS_CLIENT_SECRET'
)

def search_flights(state):
    response = amadeus.shopping.flight_offers_search.get(
        originLocationCode=state["origin"],
        destinationLocationCode=state["destination"],
        departureDate=state["date"],
        adults=state["adults"]
    )
    return {"flight_options": response.data[:5]}

def book_flight(state):
    # amadeus.booking.flight_orders.post(...)
    pass

builder = StateGraph(dict)
builder.add_node("parse_intent", parse_travel_intent)
builder.add_node("search", search_flights)
builder.add_node("present_options", present_to_user)
builder.add_node("confirm", get_user_confirmation)
builder.add_node("book", book_flight)
builder.add_node("notify", send_twilio_confirmation)
# ... add edges with conditional routing
```

**Estimated build**: 4-6 weeks · $60k-$120k
**Note**: Requires Amadeus partner credentials after Jul 17 2026

---

## P3 — Full Trip Planner (Flights + Hotels + Activities)

**Goal**: Single conversational flow that builds a complete trip: flight → hotel → activities → itinerary PDF.

**Stack**:
- Reference: [Fieldy76/Agentic-Travel-Planner](https://github.com/Fieldy76/Agentic-Travel-Planner) (MIT)
- Flights: [smamidipaka6/flights-mcp-server](https://github.com/smamidipaka6/flights-mcp-server) (MIT)
- Hotels: [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) (MIT)
- Activities/POI: [GongRzhe/TRAVEL-PLANNER-MCP-Server](https://github.com/GongRzhe/TRAVEL-PLANNER-MCP-Server) (MIT)
- Orchestration: [skarlekar/mcp_travelassistant](https://github.com/skarlekar/mcp_travelassistant) (MIT) as template
- LLM: Claude Sonnet 5 (superior for multi-turn, itinerary synthesis)

**MCP wiring**:
```json
// claude_desktop_config.json or server config
{
  "mcpServers": {
    "flights": {
      "command": "uvx",
      "args": ["flights-mcp-server"]
    },
    "hotels": {
      "command": "uvx",
      "args": ["dida-hotel-mcp"]
    },
    "maps": {
      "command": "uvx",
      "args": ["travel-planner-mcp"]
    }
  }
}
```

**Estimated build**: 5-8 weeks · $80k-$150k
**Differentiator**: All three data sources are MIT/free — near-zero data licensing cost

---

## P4 — Corporate Travel Approval Bot (HITL)

**Goal**: Employees request travel in chat; AI builds options + checks policy + routes for manager approval + books confirmed trip.

**Stack**:
- Reference: [Haohao-end/Ctrip-Style-AI-Travel-Assistant](https://github.com/Haohao-end/Ctrip-Style-AI-Travel-Assistant) (MIT)
- Flights: amadeus-python (Amadeus partner) or Sabre Mosaic MCP
- Hotels: DIDA MCP or Hotelbeds API
- CRM/approval: HubSpot API or Slack Workflow
- Notifications: Twilio (SMS/WhatsApp) or Slack
- HITL: LangGraph interrupt_before pattern

**HITL Pattern**:
```python
from langgraph.graph import StateGraph
from langgraph.checkpoint.memory import MemorySaver

def approval_needed(state):
    return state["trip_cost"] > state["policy"]["auto_approve_limit"]

builder = StateGraph(TravelRequestState)
builder.add_node("parse_request", parse_travel_request)
builder.add_node("search_options", search_travel_options)
builder.add_node("policy_check", check_travel_policy)
# HITL: pause here for manager approval if policy check fails
builder.add_node("await_approval", await_human_approval)
builder.add_node("book", execute_booking)
builder.add_conditional_edges(
    "policy_check",
    approval_needed,
    {True: "await_approval", False: "book"}
)
checkpointer = MemorySaver()
graph = builder.compile(checkpointer=checkpointer, interrupt_before=["await_approval"])
```

**Estimated build**: 6-10 weeks · $100k-$200k
**Target**: Enterprise clients (LATAM large corps, financial sector)

---

## P5 — AI Customer Support Agent (Deflection at Scale)

**Goal**: Handle 30%+ of travel support contacts automatically — cancellations, rebooking, refund status, FAQs — with escalation to human.

**Stack**:
- Orchestration: LangGraph (MIT) with interrupt_before escalation
- Data: amadeus-python (booking lookup) + QloApps REST API
- Interface: WhatsApp Business API (LATAM) or web chat widget
- Escalation: Zendesk/Freshdesk API for human handoff

**Pattern** (Expedia model):
```python
SUPPORT_TOOLS = [
    lookup_booking,       # amadeus or QloApps
    cancel_booking,       # with policy check first
    rebook_flight,        # search alternatives + offer
    check_refund_status,  # PMS query
    answer_faq,           # RAG over policy docs
    escalate_to_human,    # Zendesk ticket creation
]

def support_agent(state: MessagesState):
    response = client.messages.create(
        model="claude-sonnet-5-20260701",
        tools=SUPPORT_TOOLS,
        messages=state["messages"],
        system=SUPPORT_SYSTEM_PROMPT
    )
    return {"messages": [response]}
```

**Estimated build**: 3-5 weeks · $40k-$80k
**ROI for client**: Each 1% deflection = significant agent cost reduction at scale

---

## P6 — WhatsApp Travel Booking (LATAM)

**Goal**: Complete travel booking via WhatsApp — the dominant interface in LATAM (90%+ penetration in BR/AR/MX).

**Stack**:
- Interface: WhatsApp Business Cloud API (Meta)
- Flights: Google Flights MCP (no key required) or amadeus-python
- Hotels: DIDA MCP (MIT, no key, 2M hotels)
- Payment: Mercado Pago API (LATAM) or PayPal
- Orchestration: LangGraph with session persistence (Redis)

**Architecture**:
```
WhatsApp message
    → Meta Webhook → FastAPI handler
    → LangGraph session (Redis checkpointer, by phone number)
    → Claude (tools: flights-mcp, dida-hotel-mcp, mercadopago)
    → Response → WhatsApp Business API reply
```

**Estimated build**: 4-6 weeks · $60k-$100k
**Target**: Tour operators, regional airlines, boutique hotels in LATAM

---

## P7 — LCC Yield Optimization Agent

**Goal**: Help low-cost carriers (GOL, Aerolíneas, LATAM) optimize seat pricing with AI — demand forecasting + competitor price monitoring.

**Stack**:
- Flight data: amadeus-python (Flight Inspiration Search, cheapest dates)
- Competitor prices: Google Flights MCP
- Forecasting: scikit-learn / Prophet (Python)
- Orchestration: LangGraph scheduled agent (cron pattern)
- Dashboard: Streamlit or React

**Pattern**:
```python
from amadeus import Client

def competitive_analysis_agent():
    # 1. Get own prices via amadeus
    own_prices = amadeus.shopping.flight_offers_search.get(
        originLocationCode="GRU",
        destinationLocationCode="EZE",
        departureDate="2026-08-15",
        adults=1
    )
    # 2. Monitor competitor routes via Google Flights MCP tool call
    # 3. ML model suggests price adjustment
    # 4. Alert yield manager if gap > threshold
    pass
```

**Estimated build**: 8-12 weeks · $150k-$300k
**Target**: LATAM airline revenue management departments

---

## P8 — Sustainable Travel Planner

**Goal**: Itinerary optimizer that balances price + carbon footprint + sustainable accommodation scoring.

**Stack**:
- Carbon calculation: climatiq.io API (carbon intensity per route)
- Sustainable hotels: Green Key / EarthCheck certified filter on DIDA MCP results
- Flights: amadeus-python (lower-emission route detection)
- Orchestration: LangGraph multi-criteria optimization
- LLM: Claude Sonnet 5 (strong at multi-factor reasoning)

**Estimated build**: 4-6 weeks · $60k-$100k
**Target**: EU travel companies needing sustainability reporting; eco-tourism LATAM

---

## P9 — Airline Virtual Concierge (Voice + Text)

**Goal**: Replace or augment airline IVR with voice AI agent — handles check-in, seat upgrades, meal preferences, rebooking.

**Pattern** (Malaysia Airlines Mavis template):
- Voice layer: ElevenLabs TTS + Whisper STT
- Orchestration: LangGraph
- Airline API: amadeus-python (PNR lookup, seat selection) + airline's own API
- Escalation: human agent handoff with full conversation transcript

**Estimated build**: 8-12 weeks · $150k-$250k
**Target**: LATAM regional carriers (Aerolíneas Argentinas, GOL, Azul)

---

## P10 — Multi-GDS Price Aggregator Agent

**Goal**: Search multiple flight sources simultaneously and present the best option — like Kayak but agentic.

**Stack**:
- Source 1: [amadeus4dev/amadeus-python](https://github.com/amadeus4dev/amadeus-python) (MIT)
- Source 2: [smamidipaka6/flights-mcp-server](https://github.com/smamidipaka6/flights-mcp-server) (Google Flights, MIT)
- Source 3: Sabre Mosaic MCP (enterprise)
- Deduplication: normalize flight offers by route/datetime/airline
- LLM ranking: Claude ranks by price + layover + carbon + user prefs
- Output: Top 3 options with comparison table

```python
async def parallel_flight_search(origin, dest, date):
    results = await asyncio.gather(
        search_amadeus(origin, dest, date),
        search_google_flights_mcp(origin, dest, date),
        search_sabre_mcp(origin, dest, date),  # if enterprise credentials
        return_exceptions=True
    )
    # deduplicate and rank with LLM
    all_flights = [f for r in results if isinstance(r, list) for f in r]
    return rank_with_llm(all_flights, user_preferences)
```

**Estimated build**: 3-4 weeks · $40k-$70k
**Differentiator**: No single GDS dependency; fault-tolerant price coverage

---

## P11 — DIDA + Claude Hotel Agent (Zero-Cost Data)

**Goal**: Hotel search and booking agent using only free/MIT-licensed data sources — lowest barrier entry point for Globant POCs.

**Stack**:
- Hotels: DIDA MCP (MIT, 2M hotels, no API key, no rate limit)
- Maps: Google Maps MCP (GongRzhe, MIT)
- Orchestration: [lastmile-ai/mcp-agent](https://github.com/lastmile-ai/mcp-agent) (Apache-2.0)
- LLM: Claude Haiku 4.5 (fastest, lowest cost for hotel search)

**Why this matters**: Zero data licensing cost for a POC that covers 2M+ hotels globally. Perfect for client demos.

**Estimated build**: 1-2 weeks · $15k-$25k POC

---

## P12 — AI-Native Tour Operator Platform

**Goal**: Full platform for tour operators: itinerary builder, booking management, guest communication, revenue analytics — all AI-native.

**Stack**:
- Base: [Free-Hotel-Booking-Engine](https://github.com/TravelXML/Free-Hotel-Booking-Engine) (MIT) or QloApps
- AI itinerary: CrewAI multi-agent ([naakaarafr/AI-Travel-Agent-Advanced](https://github.com/naakaarafr/AI-Travel-Agent-Advanced) pattern)
- Real-time web search: Tavily API for destination intelligence
- CRM: custom LangGraph agent with HubSpot
- Analytics: LLM-powered revenue forecasting (Wander-Desk pattern)

**Estimated build**: 12-16 weeks · $200k-$400k
**Target**: Adventure/eco tour operators in LATAM (BR, PE, MX, AR, CO)

---

*All patterns use MIT/Apache 2.0/free data sources where possible. Sabre/Amadeus require commercial credentials; Google Flights MCP and DIDA MCP are credential-free alternatives.*
