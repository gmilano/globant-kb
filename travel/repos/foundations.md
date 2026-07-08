# Foundational Repos — Travel & Hospitality

> Base infrastructure to build on. Open license, active community.
> Last updated: 2026-07-08 (v3)

## Trip Planning & Routing Infrastructure

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|----------|
| [opentripplanner/OpenTripPlanner](https://github.com/opentripplanner/OpenTripPlanner) | LGPL-3.0 | ~5.5k★ | Open source multi-modal trip planner (public transit + walking + cycling + rideshare). Consumes GTFS + OpenStreetMap data. REST + GraphQL APIs. Java. | Yes — query via API, wrap as MCP tool |
| [jpatokal/openflights](https://github.com/jpatokal/openflights) | Unlicense / CC | ~3.2k★ | Free database of 10,000+ airports, 5,700+ airlines, 67,000 routes worldwide. CSV/JSON. Used in ML training for flight recommendation models | Yes — reference data for flight agents |
| [opentraveldata/opentraveldata](https://github.com/opentraveldata/opentraveldata) | Apache-2.0 | ~800★ | IATA-aligned open travel data: Points of Reference (POR), airline codes, airport geolocations, schedule data. Maintained by travel industry contributors | Yes — ground truth for flight/routing agents |

## Hotel & Property Management Systems

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|----------|
| [Qloapps/QloApps](https://github.com/Qloapps/QloApps) | OSL-3.0 | ~1.4k★ | Free, open-source hotel management system: Property Management System (PMS) + Booking Engine + hotel website. PHP/MySQL. Complete hotel operations. LATAM-deployable. | Yes — fork + add AI concierge layer |
| [digital-druid/hoteldruid](https://github.com/digital-druid/hoteldruid) | AGPL-3.0 | ~200★ | HotelDruid v3.0.8 (Dec 2025): flexible open source hotel PMS for complex room allocation + scheduling. Multi-language support, customizable booking engine, automated email notifications, detailed occupancy/revenue reporting. PHP. | Yes — AI booking assistant wraps REST API |
| [pesanio/pesan-pms](https://github.com/pesanio/pesan-pms) | MIT | ~80★ | **NEW 2026** — Open Source PMS from Pesan.io. Dashboard overview, booking management, guest management, room/unit management, staff management, multi-property support, responsive design. Docker deployment ready. MIT license — preferred for Globant forks. | Yes — MIT license ideal for commercial deployments |
| [moizkamran/ExcursioX](https://github.com/moizkamran/ExcursioX) | MIT | ~120★ | Open source Travel CRM with integrated ticketing, booking, and hotel management. Built for travel agencies and tour operators | Yes — CRM data for personalization agents |

## GDS & Flight Booking APIs

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|----------|
| [amadeus4dev/amadeus-python](https://github.com/amadeus4dev/amadeus-python) | MIT | ~800★ | Official Amadeus GDS Python SDK. Access to 30 Self-Service APIs: flight search, booking, hotel search, AI-powered predictions, trip purpose prediction, cheapest dates | Yes — primary GDS integration for Python agents |
| [amadeus4dev/amadeus-node](https://github.com/amadeus4dev/amadeus-node) | MIT | ~600★ | Official Amadeus GDS Node.js SDK. Same 30 APIs. Updated Jan 2026. NDC-compatible | Yes — Node.js agent integration |
| [amadeus4dev/amadeus-java](https://github.com/amadeus4dev/amadeus-java) | MIT | ~300★ | Official Amadeus GDS Java SDK. Requires Java 1.7+. 30 APIs including flight inspiration | Yes — JVM agent integration |
| [duffelhq/duffel-api-python](https://github.com/duffelhq/duffel-api-python) | MIT | ~200★ | Duffel API Python client. Access to 400+ airlines directly (NDC-first). Modern alternative to Amadeus for agent-native flight search. Better for agentic flows than traditional GDS | Yes — NDC-first, preferred for agentic booking |
| [duffelhq/duffel-api-java](https://github.com/duffelhq/duffel-api-java) | MIT | ~80★ | Duffel API Java client. 400+ airlines, NDC-first | Yes — JVM Duffel integration |
| [airheartdev/duffel](https://github.com/airheartdev/duffel) | Apache-2.0 | ~120★ | Go client for Duffel flights API. Community-maintained | Yes — Go agent integration |

## Travel Booking Plugins & CMS

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|----------|
| [mantrabrain/yatra](https://github.com/mantrabrain/yatra) | GPL-2.0 | ~300★ | WordPress travel booking plugin for tour operators, travel agencies, and adventure businesses. 700+ active sites. 11 free features + 19 Pro modules: trips, departures, dynamic pricing, multi-gateway payments, WhatsApp notifications, OTA distribution (Viator + GetYourGuide). Active since 2018. | Yes — AI trip recommendations + chatbot layer on top |

## MCP Travel Servers

| Repo | License | Stars | Description | Notes |
|------|---------|-------|-------------|-------|
| [MikkoParkkola/trvl](https://github.com/MikkoParkkola/trvl) | MIT | ~400★ | MCP super-server: 1 smart tool covering Google Flights, Google Hotels, Trivago, Airbnb, Booking.com, Hostelworld, Ferryhopper, European ground transport. 65 aliases, zero API keys, 378-token context footprint | The recommended zero-key MCP entry point |
| [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) | MIT | ~85★ | Hotel MCP server. 2M+ hotels via DIDA B2B (world's 3rd largest travel B2B). Real-time inventory/pricing. Free, no rate limit | Best hotel inventory depth |
| [lev-corrupted/travel-mcp-server](https://github.com/lev-corrupted/travel-mcp-server) | MIT | ~45★ | Multi-API MCP: Amadeus (flights+hotels) + AviationStack (real-time tracking). Cheapest dates + flight status | Best for real-time + cheapest dates |
| [privilegemendes/amadeus-mcp-server-standalone](https://github.com/privilegemendes/amadeus-mcp-server-standalone) | MIT | ~35★ | Full Amadeus MCP: search, price analysis (high/low), cheapest dates, airport search, detailed offers. Production-ready | Best Amadeus MCP feature set |
| [donghyun-chae/mcp-amadeus](https://github.com/donghyun-chae/mcp-amadeus) | MIT | ~30★ | Lightweight community Amadeus MCP server. Natural language → flight results via Amadeus Flight Offers API | Simplest Amadeus MCP entry point |
| [abhinavmathur-atlan/mcp-travel-assistant](https://github.com/abhinavmathur-atlan/mcp-travel-assistant) | MIT | ~10★ | MCP Travel Concierge: Google Maps API for itinerary, POI search, distance calculation | Lightweight travel MCP server |

## Forecasting & Analytics (Travel Revenue Management)

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|----------|
| [unit8co/darts](https://github.com/unit8co/darts) | Apache-2.0 | ~8k★ | Python time series forecasting library: Exponential Smoothing, ARIMA, Prophet, LSTM, Transformer models. Used in Pattern 7 (Hotel Revenue Management) for occupancy forecasting. Self-contained, no external API needed. | Yes — drop-in for RevPAR forecasting |

## AI Agent Frameworks (Travel-Compatible)

| Repo | License | Stars | Description | Notes |
|------|---------|-------|-------------|-------|
| [openai/openai-agents-python](https://github.com/openai/openai-agents-python) | MIT | ~10k★ | OpenAI Agents SDK. MCP-compatible (v1.3+). Tool use, handoffs, guardrails, streaming. Best framework for travel agent orchestration | Foundation for all travel agent patterns |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | ~11k★ | Graph-based agent orchestration. LangGraph 1.0 GA Oct 2025 — per-node timeouts, error handlers, DeltaChannel type, v2 streaming API. Best for multi-step booking state machines. | Use for complex booking state machines |
| [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | ~27k★ | Role-based multi-agent orchestration. 5.2M monthly downloads. Natural fit for travel: Researcher, Booker, Advisor, Concierge roles | Use for role-based travel agent teams |

## Production Travel Agent References (New Jul-2026)

| Repo | License | Stars | Description | Notes |
|------|---------|-------|-------------|-------|
| [HarimxChoi/langgraph-travel-agent](https://github.com/HarimxChoi/langgraph-travel-agent) | MIT | ~120★ | Production-ready LangGraph travel planner. Async parallel orchestration across Amadeus, Hotelbeds, Twilio, HubSpot. First open-source agent using Hotelbeds API alongside Amadeus. | Best LangGraph travel reference 2026 |
| [abh2050/langgraph_multi_agent_ai_travel_agent](https://github.com/abh2050/langgraph_multi_agent_ai_travel_agent) | MIT | ~35★ | LangGraph + Gemini Flash 2.0 + DuckDuckGo. Three planning architectures in one repo (single/multi/collaborative). Good for teams evaluating agent architectures. | Good LangGraph comparison reference |

---
*See also: `verticals/solutions.md` for complete vertical platforms.*
