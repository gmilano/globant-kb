# Composition Patterns — Travel & Hospitality AI

> Concrete recipes combining specific open-source repos + AI agents + wiring instructions.
> Each pattern is a Globant studio-ready starting point. Last updated: 2026-07-06.

---

## Pattern 1: WhatsApp Conversational Booking Agent (LATAM)

**Problem:** Tour operators and mid-size travel agencies in LATAM lose leads because their booking process requires web forms. Customers already live in WhatsApp.  
**Solution:** Conversational booking agent on WhatsApp, in Spanish/Portuguese, connected to live flight & hotel data.

**Stack:**
```
WhatsApp Business API
      ↓
Rasa (Apache-2.0) — NLU + dialogue management
      ↓
LangGraph (MIT) — stateful multi-step orchestration
      ↓
trvl MCP (MIT) — Google Flights + Hotels + Airbnb
Duffel API     — NDC booking (free tier for prototyping)
      ↓
ExcursioX (MIT) — CRM: store booking, customer history
      ↓
WhatsApp confirmation message + booking reference
```

**Repos:**
- [MikkoParkkola/trvl](https://github.com/MikkoParkkola/trvl) — flight + hotel search
- [RasaHQ/rasa](https://github.com/RasaHQ/rasa) — conversational AI
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — agent orchestration
- [moizkamran/ExcursioX](https://github.com/moizkamran/ExcursioX) — travel CRM

**Architecture notes:**
1. Rasa handles intent classification (book_flight, book_hotel, check_itinerary, cancel)
2. LangGraph maintains trip state across the multi-turn conversation
3. trvl MCP provides live search results without GDS API keys
4. Duffel handles actual ticketing via NDC (direct from airlines)
5. ExcursioX stores confirmed bookings + customer profile for future trips

**Estimated timeline:** 10–14 weeks  
**LATAM fit:** High — WhatsApp penetration >80% in Brazil, Colombia, Argentina; Spanish/Portuguese LLMs via Claude Haiku 4.5 or Llama 3.1-8B fine-tuned on LATAM travel data

---

## Pattern 2: AI Hotel Concierge (Pre-Stay, In-Stay, Post-Stay)

**Problem:** Hotel chains running QloApps (or similar PMS) have no AI-powered guest engagement. Competitors offer AI chat for room requests, upsell, and support.  
**Solution:** LangGraph agent wired into QloApps backend, accessible via WhatsApp or hotel web widget.

**Stack:**
```
QloApps (OSL-3.0) — PMS: rooms, rates, reservations, F&B
      ↓ REST API
LangGraph (MIT) — orchestration with memory
      ↓ Tools
check_availability() → QloApps API
book_room()          → QloApps API
get_amenities()      → RAG over hotel knowledge base (Weaviate)
upsell_room()        → LLM-generated upgrade offer
request_service()    → QloApps housekeeping ticket
      ↓
WhatsApp / Web chat widget
```

**Repos:**
- [Qloapps/QloApps](https://github.com/Qloapps/QloApps) — hotel PMS base
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — agent
- [weaviate/weaviate](https://github.com/weaviate/weaviate) — MIT, vector DB for hotel knowledge
- [naakaarafr/AI-Travel-Agent-Advanced](https://github.com/naakaarafr/AI-Travel-Agent-Advanced) — CrewAI reference pattern

**Guest journey:**
- **Pre-stay (T-3 days):** Agent sends WhatsApp: "Your room is ready. Would you like early check-in ($30) or a room upgrade ($50/night)?" → upsell conversion
- **In-stay:** Guest texts "I need extra towels" → agent creates housekeeping ticket → confirms ETA
- **Post-stay:** Agent sends "How was your stay? Leave a Google review for 10% off your next booking" → review automation

**Estimated timeline:** 8–12 weeks  
**Revenue impact:** Hotel upsell revenue typically +15–25% with AI-assisted pre-stay engagement

---

## Pattern 3: Transit AI Assistant (OpenTripPlanner + LLM)

**Problem:** City governments and transit authorities running OpenTripPlanner have no NL interface. Users must know bus numbers and timetables.  
**Solution:** Conversational transit assistant that answers "How do I get from X to Y by 9pm?" with real-time delays.

**Stack:**
```
OpenStreetMap + GTFS data → OpenTripPlanner (LGPL-2.1)
                                    ↓ GraphQL API
LangGraph agent:
  parse_nl_query()    → extract origin, destination, time, preferences
  query_otp()         → OpenTripPlanner GraphQL
  fetch_realtime()    → GTFS-RT for delay/alert data
  format_response()   → human-readable itinerary
                                    ↓
Web widget / WhatsApp / SMS / Alexa
```

**Repos:**
- [opentripplanner/OpenTripPlanner](https://github.com/opentripplanner/OpenTripPlanner) — routing engine
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — agent orchestration
- [opentraveldata/opentraveldata](https://github.com/opentraveldata/opentraveldata) — airport/station reference data

**Example interaction:**
```
User: "How do I get from Palermo to Retiro this evening around 9pm? 
       I need to be there by 9:30"
Agent: "Take Line D from Palermo station at 9:08pm → Plaza Italia → 
        Retiro, arrives 9:24pm. 
        ⚠️ Line D is running 3 min late tonight — take 9:05pm to be safe.
        Alternative: Taxi via Rappi ~$4, 12 min."
```

**Estimated timeline:** 6–10 weeks  
**Clients:** City governments, airports, transit authorities, tourism boards

---

## Pattern 4: Agentic Flight + Hotel Search Pipeline (MCP-Native)

**Problem:** Travel apps require expensive GDS contracts for flight/hotel data. Teams want to prototype without Amadeus API fees.  
**Solution:** MCP-native search pipeline using free-tier tools that gives LLM agents real-time flight + hotel data.

**Stack:**
```
User NL request
      ↓
LangGraph orchestrator
      ↓ MCP calls
trvl: search_flights(origin, dest, date)       → Google Flights + Kiwi + Skiplagged merged
trvl: search_hotels(location, check_in, nights) → Booking.com + Airbnb + Hotels.com
fli:  track_price(flight_id)                    → price alert on specific flight
Dida-hotel-MCP: get_hotel_details(hotel_id)     → 2M hotels, real-time rates
      ↓
LLM formats ranked options with reasoning
      ↓
User confirms → Duffel API books (NDC, direct airline)
```

**Repos:**
- [MikkoParkkola/trvl](https://github.com/MikkoParkkola/trvl) — flight + hotel MCP, no API keys
- [punitarani/fli](https://github.com/punitarani/fli) — Google Flights Python SDK
- [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) — 2M hotels, free tier
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — orchestration

**Zero-to-demo time:** 2–3 days with trvl + Claude Code MCP integration  
**Full production:** Add Duffel account for booking, Stripe for payment, ~6–8 weeks

---

## Pattern 5: Corporate Travel + Expense Automation Agent

**Problem:** Enterprise clients spend 30% of travel admin time on expense submission, receipt parsing & policy compliance.  
**Solution:** AI agent that enforces travel policy at booking time, parses receipts, and auto-submits expenses to ERP.

**Stack:**
```
TREK (MIT) — trip planning & collaboration (self-hosted)
      ↓ Trip data
LangGraph policy agent:
  check_policy()       → fetch company travel policy (RAG over policy docs)
  validate_booking()   → flag out-of-policy segments (>$X hotel, non-preferred airline)
  approve_or_escalate()→ auto-approve in-policy / route to manager
      ↓ Confirmed trip
Odoo / ERPNext — expense management + accounting
      ↓
LLM receipt parser:
  parse_receipt_image()→ extract vendor, amount, category, date (via Claude Vision)
  match_to_trip()      → link receipt to approved trip in ERP
  submit_expense()     → create expense report in Odoo
      ↓
CFO dashboard: policy compliance %, spend by category, anomaly alerts
```

**Repos:**
- [mauriceboe/TREK](https://github.com/mauriceboe/TREK) — trip planner
- [odoo/odoo](https://github.com/odoo/odoo) or [frappe/erpnext](https://github.com/frappe/erpnext) — ERP
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — agent

**ROI:** 60–70% reduction in expense processing time; 15–20% reduction in out-of-policy spend  
**Estimated timeline:** 12–16 weeks for full enterprise deployment  
**Clients:** Mid-size corporations, consulting firms, NGOs with distributed staff

---

## Pattern 6: LLM-Evaluated Travel Agent (Benchmark-Driven Development)

**Problem:** "Our AI travel agent is good" is not a client pitch. How do you prove it's better than competitors?  
**Solution:** Use the TravelPlanner benchmark (ICML'24) as a continuous eval harness. Show clients pass-rate improvements sprint-over-sprint.

**Stack:**
```
TravelPlanner dataset (MIT):
  - 1,225 planning intents with hard constraints (budget, diet, mobility)
  - 4M records: flights, hotels, attractions, cities
      ↓
Your travel agent under test
      ↓
TravelPlanner evaluator:
  delivery_rate()      → did the agent produce a valid plan?
  commonsense_score()  → does the plan pass basic logic checks?
  final_trip_score()   → does it satisfy all user constraints?
      ↓
Sprint dashboard: quality curve over time
```

**Repos:**
- [OSU-NLP-Group/TravelPlanner](https://github.com/OSU-NLP-Group/TravelPlanner) — benchmark dataset + eval
- [naakaarafr/AI-Travel-Agent-Advanced](https://github.com/naakaarafr/AI-Travel-Agent-Advanced) — agent to test
- [2020uce0047/travel-agent](https://github.com/2020uce0047/travel-agent) — LangGraph agent reference

**Why this matters for Globant:** Benchmark-driven development lets the studio present a quality narrative at client kickoff ("current state: 0.6% success rate on GPT-4 — our agent targets 15%+") and report measurable improvement each sprint. Client confidence multiplier.

**Estimated setup:** 1–2 days to run first baseline evaluation

---

*See also: `verticals/solutions.md` for platform details and `agents/top.md` for agent specs.*  
*Updated automatically by the Globant AI Studios ingest pipeline.*
