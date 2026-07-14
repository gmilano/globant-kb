# 🏗️ Foundational Repos — Travel & Hospitality

> Bases to build on: open license, active community, AI-extensible.
> Last updated: 2026-07-14 (v6)

## Core Foundations

| Repo | License | Stars | Description | AI Extension Point |
|------|---------|-------|-------------|-------------------|
| [Qloapps/QloApps](https://github.com/Qloapps/QloApps) | OSL-3.0 | ~1.2k★ | Full-stack open-source hotel PMS + booking engine + OTA channel manager. Multilingual, multicurrency, Booking.com/Expedia sync. PHP/PrestaShop base. | Add AI concierge layer on top of existing booking flows; wrap availability APIs with LLM agents |
| [amadeus4dev/amadeus-python](https://github.com/amadeus4dev/amadeus-python) | MIT | ~400★ | Official Amadeus Python SDK: flight inspiration, cheapest dates, flight offers search, real-time pricing, booking creation, hotel search, points of interest | Direct agent tool for flight search and booking; backbone of most open travel agents |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | ~18k★ | State-machine agent framework — all major open travel multi-agent systems (HarimxChoi, Ctrip-Style, TripMate, etc.) are built on this | Foundation for stateful, multi-step travel planning agents with HITL support |
| [lastmile-ai/mcp-agent](https://github.com/lastmile-ai/mcp-agent) | Apache-2.0 | ~6k★ | Build effective agents using Model Context Protocol — the right glue layer for wiring travel MCP servers (Sabre MCP, DIDA MCP, Flights MCP) together | Orchestration layer for composing multiple travel MCP servers |
| [amadeus4dev/amadeus-flight-booking-django](https://github.com/amadeus4dev/amadeus-flight-booking-django) | MIT | ~200★ | Reference Python/Django app demonstrating Amadeus Self-Service flight booking APIs end-to-end — updated Jan 2026 | Working reference for building flight booking UI + agent backend |
| [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) | MIT | ~15★ | DIDA hotel MCP: 2M+ hotels, world's 3rd-largest B2B travel data, real-time inventory/pricing/cancellation policies, no API key required, no rate limit | Drop-in hotel search tool for any MCP-compatible agent — zero credential friction |
| [smamidipaka6/flights-mcp-server](https://github.com/smamidipaka6/flights-mcp-server) | MIT | ~30★ | Google Flights MCP server: real-time pricing and availability without GDS account — good for prototyping or markets where Amadeus is inaccessible | Fastest path to flight search in an agent without GDS partnership |
| [GongRzhe/TRAVEL-PLANNER-MCP-Server](https://github.com/GongRzhe/TRAVEL-PLANNER-MCP-Server) | MIT | ~120★ | Google Maps + travel planning MCP: location lookup, POI details, distance/time calculations — plugs into any MCP client | Destination intelligence layer: activities, navigation, local discovery |

## GDS / Distribution Platforms (commercial, AI-ready)

| Platform | Type | AI Integration |
|----------|------|----------------|
| Sabre Mosaic | Commercial GDS | Industry's first MCP server (May 2026); 420+ airlines, 2M hotels; agentic APIs |
| Amadeus | Commercial GDS | Python SDK (MIT); self-service portal closing Jul 17 2026; community MCP servers available |
| Hotelbeds | Commercial B2B | Used by HarimxChoi/langgraph-travel-agent for hotel wholesale rates |

## Framework Compatibility Matrix

| Foundation Repo | Claude | OpenAI | LangGraph | MCP |
|----------------|--------|--------|-----------|-----|
| amadeus-python | ✅ tool | ✅ tool | ✅ tool node | ✅ via wrapper |
| DIDA MCP | ✅ native | ✅ via MCP | ✅ tool node | ✅ native |
| Google Flights MCP | ✅ native | ✅ via MCP | ✅ tool node | ✅ native |
| QloApps REST API | ✅ via API | ✅ via API | ✅ tool node | ✅ via wrapper |
| Sabre Mosaic MCP | ✅ native | ✅ via MCP | ✅ tool node | ✅ native |

---
*See also: `verticals/solutions.md` for complete vertical platforms.*
