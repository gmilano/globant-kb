# Foundational Repos — Travel & Hospitality

> Base infrastructure to build on. Open license, active community.
> Last updated: 2026-07-07

## Trip Planning & Routing Infrastructure

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|----------|
| [opentripplanner/OpenTripPlanner](https://github.com/opentripplanner/OpenTripPlanner) | LGPL-3.0 | ~5.5k★ | Open source multi-modal trip planner (public transit + walking + cycling + rideshare). Consumes GTFS + OpenStreetMap data. REST + GraphQL APIs. Java. | Yes — query via API, wrap with agent |
| [jpatokal/openflights](https://github.com/jpatokal/openflights) | Unlicense / CC | ~3.2k★ | Free database of 10,000+ airports, 5,700+ airlines, 67,000 routes worldwide. CSV/JSON. Used in ML training datasets for flight recommendation | Yes — reference data for flight agents |
| [opentraveldata/opentraveldata](https://github.com/opentraveldata/opentraveldata) | Apache-2.0 | ~800★ | IATA-aligned open travel data: Points of Reference (POR), airline codes, airport geolocations, schedule data. Maintained by travel industry contributors | Yes — ground truth for flight/routing agents |

## Hotel & Property Management Systems

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|----------|
| [Qloapps/QloApps](https://github.com/Qloapps/QloApps) | OSL-3.0 | ~1.4k★ | Free, open-source hotel management system: Property Management System (PMS) + Booking Engine + hotel website. PHP/MySQL. Supports Apache/Nginx. Complete hotel operations | Yes — fork + add AI concierge layer |
| [moizkamran/ExcursioX](https://github.com/moizkamran/ExcursioX) | MIT | ~120★ | Open source Travel CRM with integrated ticketing, booking, and hotel management. Built for travel agencies and tour operators | Yes — CRM data for personalization agents |

## GDS & Flight Booking APIs

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|----------|
| [amadeus4dev/amadeus-python](https://github.com/amadeus4dev/amadeus-python) | MIT | ~800★ | Official Amadeus GDS Python SDK. Access to 30 Self-Service APIs: flight search, booking, hotel search, AI-powered predictions, trip purpose prediction | Yes — primary GDS integration for Python agents |
| [amadeus4dev/amadeus-node](https://github.com/amadeus4dev/amadeus-node) | MIT | ~600★ | Official Amadeus GDS Node.js SDK. Same 30 APIs as Python SDK. Updated Jan 2026. NDC-compatible | Yes — Node.js agent integration |
| [amadeus4dev/amadeus-java](https://github.com/amadeus4dev/amadeus-java) | MIT | ~300★ | Official Amadeus GDS Java SDK. Requires Java 1.7+ | Yes — JVM agent integration |
| [duffelhq/duffel-api-python](https://github.com/duffelhq/duffel-api-python) | MIT | ~200★ | Duffel API Python client. Access to 400+ airlines directly (NDC-first). Modern alternative to Amadeus for agent-native flight search | Yes — NDC-first, better for agentic flows |
| [duffelhq/duffel-api-java](https://github.com/duffelhq/duffel-api-java) | MIT | ~80★ | Duffel API Java client. 400+ airlines, NDC-first | Yes — JVM Duffel integration |
| [airheartdev/duffel](https://github.com/airheartdev/duffel) | Apache-2.0 | ~120★ | Go client for Duffel flights API. Community-maintained | Yes — Go agent integration |

## AI Agent Frameworks (Travel-Compatible)

| Repo | License | Stars | Description | Notes |
|------|---------|-------|-------------|-------|
| [openai/openai-agents-python](https://github.com/openai/openai-agents-python) | MIT | ~10k★ | OpenAI Agents SDK. MCP-compatible (v1.3+). Tool use, handoffs, guardrails, streaming. Best framework for travel agent orchestration | Foundation for all travel agent patterns |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | ~11k★ | Graph-based agent orchestration. State machines for multi-step travel workflows (search → validate → book → confirm) | Use for complex booking state machines |
| [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | ~27k★ | Role-based multi-agent orchestration. 5.2M monthly downloads. Natural fit for travel: Researcher, Booker, Advisor roles | Use for role-based travel agent teams |

## MCP Travel Servers

| Repo | License | Stars | Description | Notes |
|------|---------|-------|-------------|-------|
| [DIDA-AI/Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) | MIT | ~80★ | Hotel MCP server. 2M+ hotels via DIDA B2B (world's 3rd largest travel B2B). Real-time inventory/pricing. Free, no rate limit | Drop-in hotel tool for Claude/GPT |
| [abhinavmathur-atlan/mcp-travel-assistant](https://github.com/abhinavmathur-atlan/mcp-travel-assistant) | MIT | 6★ | MCP Travel Concierge: Google Maps API for itinerary, POI search, distance calculation | Lightweight travel MCP server |

---
*See also: `verticals/solutions.md` for complete vertical platforms.*
