# AI Agents — Travel & Hospitality

> Top open source AI agents and tools for the travel industry. Focus: MIT / Apache 2.0 licenses Globant can build on.
> Last updated: 2026-07-08 (v4)

## Top Agents & Tools

| Name | License | Stars | Description |
|------|---------|-------|-------------|
| [trvl](https://github.com/MikkoParkkola/trvl) | MIT | ~400★ | MCP super-server + CLI: 1 smart tool exposing 65 aliases covering Google Flights, Google Hotels, Trivago, Airbnb, Booking.com, Hostelworld, Ferryhopper, European ground transport, award sweet spots, airport lounges, baggage rules, weather, price alerts. No API keys. Single Go binary. Token-efficient design: 378 tokens vs 33,500 for 65 separate tools (98.9% smaller context footprint). Updated April 2026. |
| [openai-agents-travel-graph](https://github.com/BjornMelin/openai-agents-travel-graph) | MIT | ~150★ | State-of-the-art multi-agent travel planner: OpenAI Agents SDK + LangGraph orchestration + Stagehand/Playwright browser automation + Supabase persistence + Firecrawl/Tavily research |
| [Production-Ready-TripPlanner-Multi-AI-Agents](https://github.com/shaheennabi/Production-Ready-TripPlanner-Multi-AI-Agents-Project) | MIT | ~90★ | Production-grade multi-agent trip planner with specialized agents for flights, hotels, activities, weather, and budget optimization |
| [Multi-Agent-AI-Travel-Advisor](https://github.com/kbhujbal/Multi-Agent-AI-Travel-Advisor) | MIT | ~65★ | 7 specialized agents with RAG (retrieval-augmented generation) + tool-calling for personalized itinerary, visa info, currency, and packing advice |
| [travel-booking-agents](https://github.com/jongalloway/travel-booking-agents) | MIT | ~50★ | Corporate travel booking and policy approval workflow agent: validates per-diem limits ($195-$285/night hotels, $395-$520 flights), budget compliance, manager approval workflows |
| [travel-mcp-server](https://github.com/lev-corrupted/travel-mcp-server) | MIT | ~45★ | Multi-API MCP server for travel aggregation: Amadeus GDS (flights + hotels) + AviationStack (real-time flight tracking). Finds cheapest travel dates, searches multi-city, tracks live flight status |
| [amadeus-mcp-server-standalone](https://github.com/privilegemendes/amadeus-mcp-server-standalone) | MIT | ~35★ | Full Amadeus MCP server: flight search, price analysis (high/low indicator vs historical), cheapest dates finder, airport search, detailed offer retrieval. Production-ready |
| [mcp-amadeus](https://github.com/donghyun-chae/mcp-amadeus) | MIT | ~30★ | Community Amadeus MCP server integrating with Amadeus Flight Offers Search API. Natural language flight queries → structured results |
| [Travel-Yathri](https://github.com/EmmanuelSibi/Travel-Yathri) | MIT | ~20★ | AI-powered WhatsApp chatbot for trip planning. NLP + flight/hotel/POI data integration + PDF itinerary generation. Designed for WhatsApp-first markets (LATAM, India, Middle East) |
| [Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) | MIT | ~85★ | MCP server for hotel booking: 2M+ hotels via DIDA B2B API (world's 3rd largest travel B2B), real-time inventory/pricing, search by location/date/stars/guests. Free, no rate limit |
| [mcp-travel-assistant](https://github.com/abhinavmathur-atlan/mcp-travel-assistant) | MIT | ~10★ | MCP Travel Concierge Server with Google Maps integration for itinerary planning, POI discovery, and distance calculations |
| [Yatra-Vritta](https://github.com/Vipul-Mhatre/Yatra-Vritta) | MIT | ~15★ | AI platform for specialized travel verticals: medical tourism (KNN-based destination ranking by medical quality + affordability + accessibility + safety), MICE events, destination weddings. Multi-criteria decision models + min-max normalization + regression predictions |
| [yay-travel-agent](https://github.com/Prosusware/yay-travel-agent) | Apache-2.0 | ~10★ | Raise Your Hack Paris winner — concierge AI travel agent with multi-provider search and booking orchestration |
| [langgraph-travel-agent](https://github.com/HarimxChoi/langgraph-travel-agent) | MIT | ~120★ | **NEW Jul-2026** — Production-ready LangGraph multi-agent system. Async parallel orchestration across Amadeus (flights), Hotelbeds (hotels), Amadeus Activities, Twilio (SMS), HubSpot (CRM). Generates Budget / Balanced / Premium travel packages. |
| [langgraph_multi_agent_ai_travel_agent](https://github.com/abh2050/langgraph_multi_agent_ai_travel_agent) | MIT | ~35★ | Multi-agent travel planning system using LangGraph + Gemini Flash 2.0 + DuckDuckGo Search. Three planning modes: single-agent, multi-agent, and collaborative. Clean reference architecture for LangGraph-based travel agents. |
| [Fieldy76/Agentic-Travel-Planner](https://github.com/Fieldy76/Agentic-Travel-Planner) | MIT | ~60★ | **NEW Jul-2026** — Production-ready, framework-free agentic workflow for travel planning built with Python and MCP. No LangGraph/CrewAI dependency. MCP server exposes flights, hotels, cars, weather, and payment tools as a clean interface. Demonstrates that agent orchestration can be built without heavy frameworks. |
| [embabel/tripper](https://github.com/embabel/tripper) | Apache-2.0 | ~55★ | **NEW Jul-2026** — Travel planner agent with web search, mapping, and Airbnb integration. Built on the Embabel Agent Platform (Spring AI). Creates personalized itineraries combining search + real Airbnb listings. First open-source travel agent with direct Airbnb data access. |
| [kaiban-ai/KaibanJS](https://github.com/kaiban-ai/KaibanJS) | MIT | ~5.2k★ | JavaScript-native multi-agent framework using Kanban-inspired coordination. HuggingFace tutorial uses KaibanJS for travel planning with City Selector Agent + Local Expert Agent + Travel Concierge Agent. Ideal for Node.js/frontend travel agent implementations. |

## Agent Protocol Compatibility

| Agent | MCP | OpenAI Agents SDK | LangGraph | CrewAI | Notes |
|-------|-----|-------------------|-----------|--------|-------|
| trvl | ✅ (65 aliases, 1 endpoint) | — | — | — | Most token-efficient MCP option |
| openai-agents-travel-graph | — | ✅ | ✅ | — | Most sophisticated orchestration stack |
| Dida-hotel-MCP-CN | ✅ | — | — | — | Drop-in hotel inventory MCP |
| travel-mcp-server | ✅ | — | — | — | Amadeus + AviationStack dual-API |
| amadeus-mcp-server-standalone | ✅ | — | — | — | Richest Amadeus MCP feature set |
| mcp-amadeus | ✅ | — | — | — | Lightweight community Amadeus MCP |
| mcp-travel-assistant | ✅ | — | — | — | Google Maps routing + POI |
| Multi-Agent-AI-Travel-Advisor | — | — | ✅ | — | RAG-enhanced 7-agent system |
| travel-agent (CrewAI) | — | — | — | ✅ | Role-based agent orchestration |
| langgraph-travel-agent | — | — | ✅ | — | Amadeus + Hotelbeds + Twilio + HubSpot async orchestration |
| langgraph_multi_agent_ai_travel_agent | — | — | ✅ | — | Three planning modes, Gemini Flash 2.0 |
| Agentic-Travel-Planner (Fieldy76) | ✅ (framework-free) | — | — | — | No framework dependency, pure MCP |
| tripper (embabel) | — | — | — | — | Spring AI / Embabel platform, Airbnb data |
| KaibanJS | — | ✅-compatible | ✅-compatible | ✅-compatible | JavaScript-native, Kanban coordination |
| travel-booking-agents | — | ✅ | — | — | Corporate / approval workflow |
| Travel-Yathri | — | — | — | — | WhatsApp-native standalone |
| Yatra-Vritta | — | — | — | — | Medical tourism / MICE specialist |

## Key Capabilities Matrix

| Capability | Best Agent(s) |
|-----------|---------------|
| Multi-platform flight search (no API key) | trvl (Google Flights, Trivago, Booking.com) |
| Real-time flight search via GDS | travel-mcp-server (Amadeus), amadeus-mcp-server-standalone |
| Hotel inventory depth | Dida-hotel-MCP-CN (2M+ hotels B2B pricing) |
| Hotel search breadth | trvl (Airbnb, Booking.com, Hostelworld, Trivago) |
| Ground transport (trains, ferries, buses) | trvl (Ferryhopper, European rail — only option) |
| Award travel + lounge intel | trvl (award sweet spots, lounge access data) |
| Full itinerary generation | openai-agents-travel-graph, Production-Ready-TripPlanner |
| Corporate policy enforcement | travel-booking-agents |
| Price intelligence (high/low, cheapest dates) | amadeus-mcp-server-standalone, travel-mcp-server |
| Live flight tracking | travel-mcp-server (AviationStack) |
| Multi-agent orchestration | travel-agent (CrewAI), Multi-Agent-AI-Travel-Advisor |
| Visa / regulatory info | Multi-Agent-AI-Travel-Advisor |
| Browser automation (real booking) | openai-agents-travel-graph (Stagehand/Playwright) |
| WhatsApp-native travel | Travel-Yathri |
| Medical tourism / MICE | Yatra-Vritta |

## MCP Travel Ecosystem — Current State (July 2026)

MCP has become the de facto integration layer for travel data. The ecosystem:

| MCP Server | Data Source | Coverage | API Key Required |
|-----------|-------------|----------|-----------------|
| trvl | Google Flights, Hotels, Trivago, Airbnb, Booking.com, Hostelworld, Ferryhopper | Flights + Hotels + Ground | No (zero keys) |
| Dida-hotel-MCP-CN | DIDA B2B (2M+ hotels) | Hotels only | DIDA B2B account |
| travel-mcp-server | Amadeus + AviationStack | Flights + Hotels + Tracking | Amadeus + AviationStack keys |
| amadeus-mcp-server-standalone | Amadeus GDS | Flights + price analysis | Amadeus key |
| mcp-amadeus | Amadeus GDS | Flight search | Amadeus key |
| mcp-travel-assistant | Google Maps | POI + routing | Google Maps key |

## Commercial Platform SDKs (Agentic-Ready, MIT Licensed)

| Platform | SDK Repo | License | Notes |
|----------|----------|---------|-------|
| Sabre Mosaic | No open SDK (enterprise contract) | Proprietary | Sabre Mosaic™ — "agentic-ready Air APIs". Powers Mindtrip + PayPal end-to-end agentic booking (launched May 6, 2026). Contact Sabre for enterprise access. |
| Amadeus Self-Service | [amadeus4dev/amadeus-python](https://github.com/amadeus4dev/amadeus-python) | MIT | 30 APIs: flights, hotels, activities, AI predictions. GDS #2 globally. Community MCP servers active. |
| Duffel | [duffelhq/duffel-api-python](https://github.com/duffelhq/duffel-api-python) | MIT | NDC-first, 400+ airlines. LetsFG uses this pattern for $116 savings over Google Flights. |
| Expedia | No open SDK | Proprietary | Expedia's Claude integration (announced Explore 2026, May 2026): U.S. travelers search flights/hotels via Claude in natural language → click through to Expedia to book. Affiliate/white-label API available. |

**Recommended MCP composition for production:**
- Layer 1 (discovery, zero keys): `trvl` for flights/hotels/transport/awards
- Layer 2 (depth + B2B pricing): `Dida-hotel-MCP-CN` for hotel inventory
- Layer 3 (GDS validation + cheapest dates): `amadeus-mcp-server-standalone`
- Layer 4 (live status): `travel-mcp-server` for real-time flight tracking

---
*Auto-updated by ingest pipeline.*
