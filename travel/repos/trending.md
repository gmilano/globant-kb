# Trending Repos — Travel & Hospitality

> GitHub velocity this week. Mix of production-grade and experiment-grade repos.
> Last updated: 2026-07-08 (v2)

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

---
*Pipeline auto-update — refreshed daily.*
