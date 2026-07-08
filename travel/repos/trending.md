# Trending Repos — Travel & Hospitality

> GitHub velocity this week. Mix of production-grade and experiment-grade repos.
> Last updated: 2026-07-08 (v4)

## Velocity Table (Stars / Momentum)

| Repo | License | Stars | Momentum | Why Notable |
|------|---------|-------|----------|-------------|
| [MikkoParkkola/trvl](https://github.com/MikkoParkkola/trvl) | MIT | ~400★ | 🔥🔥🔥 | MCP super-server covering 8+ travel platforms via 1 tool endpoint. Zero API keys. 98.9% token reduction vs 65 separate tools. Single Go binary. The canonical "how to design a travel MCP server" reference |
| [LetsFG/LetsFG](https://github.com/LetsFG/LetsFG) | MIT | ~220★ | 🔥🔥🔥 | Agent-native flight search. $116 savings verified vs Google Flights same day. 400+ airlines 5s search. Building community for agentic travel distribution |
| [BjornMelin/openai-agents-travel-graph](https://github.com/BjornMelin/openai-agents-travel-graph) | MIT | ~150★ | 🔥🔥 | OpenAI Agents SDK + LangGraph + Playwright — complete autonomous travel research & booking loop |
| [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) | MIT | ~85★ | 🔥🔥 | Hotel MCP server, 2M+ hotels. Chinese B2B hotel GDS exposed as MCP tool. Zero rate limit |
| [lev-corrupted/travel-mcp-server](https://github.com/lev-corrupted/travel-mcp-server) | MIT | ~45★ | 🔥🔥 | New: Amadeus + AviationStack MCP server with real-time flight tracking and cheapest date search |
| [shaheennabi/Production-Ready-TripPlanner-Multi-AI-Agents-Project](https://github.com/shaheennabi/Production-Ready-TripPlanner-Multi-AI-Agents-Project) | MIT | ~90★ | 🔥 | Production-grade multi-agent trip planner. Good reference architecture |
| [jongalloway/travel-booking-agents](https://github.com/jongalloway/travel-booking-agents) | MIT | ~50★ | 🔥 | Corporate travel + approval workflow. Policy enforcement agent |
| [kbhujbal/Multi-Agent-AI-Travel-Advisor](https://github.com/kbhujbal/Multi-Agent-AI-Travel-Advisor) | MIT | ~65★ | 🔥 | 7 specialized agents + RAG. Visa, currency, packing agents included |
| [privilegemendes/amadeus-mcp-server-standalone](https://github.com/privilegemendes/amadeus-mcp-server-standalone) | MIT | ~35★ | ↗ | Richest Amadeus MCP: flight search + price analysis + cheapest dates. Production-ready |
| [EmmanuelSibi/Travel-Yathri](https://github.com/EmmanuelSibi/Travel-Yathri) | MIT | ~20★ | ↗ | First WhatsApp-native open source AI travel chatbot. PDF itinerary generation. LATAM-relevant |
| [Vipul-Mhatre/Yatra-Vritta](https://github.com/Vipul-Mhatre/Yatra-Vritta) | MIT | ~15★ | ↗ | AI for specialized travel: medical tourism + MICE + destination weddings. KNN + multi-criteria ranking |
| [HarimxChoi/langgraph-travel-agent](https://github.com/HarimxChoi/langgraph-travel-agent) | MIT | ~120★ | 🔥🔥🔥 | **NEW Jul-2026** — Production LangGraph travel agent. Amadeus + Hotelbeds + Twilio + HubSpot. Budget/Balanced/Premium package generation. First repo to integrate Hotelbeds with LangGraph. |
| [abh2050/langgraph_multi_agent_ai_travel_agent](https://github.com/abh2050/langgraph_multi_agent_ai_travel_agent) | MIT | ~35★ | 🔥🔥 | LangGraph + Gemini Flash 2.0 multi-agent travel. Three planning modes. Good architecture reference. |
| [pesanio/pesan-pms](https://github.com/pesanio/pesan-pms) | MIT | ~80★ | 🔥🔥 | **NEW 2026** — MIT-licensed open source PMS from Pesan.io. Multi-property, Docker-ready. First MIT PMS that Globant can fork without license friction (vs QloApps OSL-3.0 or HotelDruid AGPL-3.0). |
| [Fieldy76/Agentic-Travel-Planner](https://github.com/Fieldy76/Agentic-Travel-Planner) | MIT | ~60★ | 🔥🔥 | **NEW Jul-2026** — Framework-free agentic travel planner using pure Python + MCP. No LangGraph/CrewAI. Shows production-grade agents without heavy frameworks. MCP server covers flights, hotels, cars, weather, payments. |
| [embabel/tripper](https://github.com/embabel/tripper) | Apache-2.0 | ~55★ | 🔥 | **NEW Jul-2026** — Travel planner with web search, mapping, and Airbnb integration via Embabel Agent Platform (Spring AI). First open-source agent with direct Airbnb data access. Good for Java/enterprise teams. |
| [mantrabrain/yatra](https://github.com/mantrabrain/yatra) | GPL-2.0 | ~300★ | → | WordPress travel booking plugin, 700+ active sites, WhatsApp notifications, Viator/GetYourGuide OTA distribution |
| [esradag/LangChain-TravelPlanner](https://github.com/esradag/LangChain-TravelPlanner) | MIT | ~40★ | → | GPT-4 + Google Maps + Folium interactive map. Clean demo code |
| [Vipul-Mhatre/Yatra-Vritta](https://github.com/Vipul-Mhatre/Yatra-Vritta) | MIT | ~15★ | ↗ | Medical tourism AI: KNN destination ranking by medical quality/affordability. MICE event management |

## Emerging Patterns in Trending Repos

**1. Token-Efficient MCP Super-Server (trvl)**
`trvl` defines the 2026 standard: one smart router tool instead of dozens of specialized tools. 378 tokens vs 33,500 tokens. The benchmark every future MCP travel server will be compared against. Key insight: LLMs don't need rigid tool schemas when the router understands natural language routing.

**2. Amadeus MCP Ecosystem Explosion**
Three independent community Amadeus MCP implementations in 6 months (donghyun-chae, lev-corrupted, privilegemendes). Competitive differentiation now happening around price intelligence, cheapest date finding, and real-time tracking. Signals official Amadeus MCP coming.

**3. Agentic flight search with real savings data (LetsFG)**
LetsFG is the first repo showing *verified* price savings over Google Flights. This is the killer metric the market was waiting for.

**4. Corporate travel as first production beachhead**
`jongalloway/travel-booking-agents` shows corporate travel as the first real production use case. Policy is machine-readable; employees already delegate bookings; approval workflows are well-defined.

**5. WhatsApp-native travel AI for LATAM**
`Travel-Yathri` is the first open source WhatsApp travel chatbot. With WhatsApp at 3B+ MAU and dominant in Brazil/Argentina/Colombia/Mexico, this is the distribution channel Globant should build on.

**6. Specialized verticals getting AI-native**
`Yatra-Vritta` shows medical tourism and MICE as adjacent markets with AI-specific requirements (destination quality scoring, vendor coordination) that general travel tools don't address.

**7. Framework-free agents challenging the orthodoxy (Fieldy76)**
`Agentic-Travel-Planner` demonstrates that travel agents with full booking capability can be built without LangGraph or CrewAI. The pattern: Python + direct MCP tool calls + a loop. Fewer dependencies, easier to debug, faster to deploy. Signal: framework adoption in travel is bifurcating between heavy orchestration (multi-agent parallel workflows) and lightweight MCP-native patterns (single conversational agents).

**8. Airbnb data enters open source agent ecosystem (embabel/tripper)**
`tripper` is the first open-source travel agent incorporating real Airbnb listing data. The Airbnb distribution partnership ecosystem is opening up to AI agents — signal that accommodation platforms beyond Booking.com and DIDA will follow.

## Commercial Platform Velocity (Jul-2026)

| Platform | Signal | Travel AI Milestone |
|----------|--------|---------------------|
| Sabre | Mosaic API → Mindtrip launch May 6, 2026 | First complete agentic booking stack (GDS + conversational AI + payment) |
| Expedia | Claude integration, Explore 2026 May 2026 | OTA + LLM provider partnership model |
| Booking.com | Confirmed Google AI Mode partner | Positioned as agentic booking executor |
| Google | AI Mode travel (flights + hotels) — no launch date | Discovery layer; will reshape OTA traffic |
| PayPal | Agentic commerce API (Buy Now Pay Later in chat) | Payment in chat without redirect — industry first |
| MindTrip | Flights live May 6, 2026 — Sabre + PayPal powered | Template for conversational travel booking UX |

---
*Pipeline auto-update — refreshed daily.*
