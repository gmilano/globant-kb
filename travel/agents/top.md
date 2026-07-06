# Top AI Agents — Travel Industry

> Open-source AI agents and tools for the travel industry. Focus: MIT / Apache 2.0 / LGPL licenses.
> Last updated: 2026-07-06

## Top Agents & Tools

| Name | Repo | License | Stars | Description |
|------|------|---------|-------|-------------|
| trvl | [MikkoParkkola/trvl](https://github.com/MikkoParkkola/trvl) | MIT | 27★ | MCP server + CLI giving Claude/Cursor/Windsurf direct access to Google Flights, Google Hotels, Trivago, Airbnb, Booking.com, Hostelworld, Ferryhopper & European ground transport. 43 MCP tools. Single Go binary, no API keys required. |
| OpenTripPlanner | [opentripplanner/OpenTripPlanner](https://github.com/opentripplanner/OpenTripPlanner) | LGPL-2.1 | ~5.5k★ | Industry-standard multi-modal trip planner. Combines scheduled transit (GTFS), walking, cycling, bike-share & ride-hailing. Powers transit apps for hundreds of cities worldwide. GraphQL API. |
| TravelPlanner | [OSU-NLP-Group/TravelPlanner](https://github.com/OSU-NLP-Group/TravelPlanner) | MIT | 468★ | ICML'24 Spotlight benchmark for LLM travel-planning agents. 4M data records, 1,225 curated planning intents, tool-use sandbox with flights/hotels/attractions/constraints. Reference for evaluating agent reasoning quality. |
| AI-Travel-Agent-Advanced | [naakaarafr/AI-Travel-Agent-Advanced](https://github.com/naakaarafr/AI-Travel-Agent-Advanced) | MIT | 120★ | CrewAI multi-agent travel planner powered by Google Gemini. Specialist agents for destination research, local expertise & full itinerary creation. Real-time web search for weather, flights, hotels & attractions. CLI-driven 7-day itineraries with budgets. |
| fli | [punitarani/fli](https://github.com/punitarani/fli) | MIT | 380★ | Google Flights MCP server, CLI & Python library. Programmatic flight search, price tracking & filtering via a clean API. Integrates with LLM workflows through the MCP protocol. |
| TREK | [mauriceboe/TREK](https://github.com/mauriceboe/TREK) | MIT | 210★ | Self-hosted trip planner with real-time collaboration, interactive maps, PWA support, SSO, budgets & packing lists. Designed for teams & families; deployable on any VPS. |
| LetsFG | [LetsFG/LetsFG](https://github.com/LetsFG/LetsFG) | Apache-2.0 | 95★ | Agent-native flight search & booking. Aggregates 400+ airlines across Skyscanner, Kiwi, Kayak, Momondo & direct sources in ~5 seconds. Saved $116 across 5 routes vs Google Flights (community-verified). CLI + API. |
| travel-agent (LangGraph) | [2020uce0047/travel-agent](https://github.com/2020uce0047/travel-agent) | MIT | 85★ | LangGraph-based RAG agentic app. Uses SERPAPI to search live flight & hotel data, GPT-3.5-turbo as backbone LLM. Good reference pattern for stateful multi-step travel orchestration. |
| opentraveldata | [opentraveldata/opentraveldata](https://github.com/opentraveldata/opentraveldata) | LGPL/CC-BY | 180★ | Curated open dataset covering 10,000+ airports, 900+ airlines, country/timezone/currency data. Powers reference lookups in travel search engines. Companion: OpenTREP full-text search C++ library. |
| AI-Travel-Concierge | [Bhardwaj-Saurabh/AI-Travel-Concierge](https://github.com/Bhardwaj-Saurabh/AI-Travel-Concierge) | MIT | 45★ | Semantic Kernel + Azure Foundry multi-agent concierge. Orchestrates 7 specialist tools: weather forecasts, currency conversion, restaurant discovery, multi-language translation, hotel booking & itinerary management. Premium card loyalty use-case. |

## Evaluation Notes

| Agent | Strengths | Limitations |
|-------|-----------|-------------|
| trvl | No API keys, MCP-native, Go binary — production-ready integration | 27★ = early stage, Parkkola is solo maintainer |
| OpenTripPlanner | Battle-tested, powers 100+ city apps, rich docs | Java ecosystem; LGPL requires care when embedding |
| TravelPlanner (OSU) | Gold standard for LLM benchmark; rich dataset | Research artifact — not a production booking agent |
| AI-Travel-Agent-Advanced | Excellent CrewAI pattern; easy to fork and extend | Depends on Gemini API; not self-contained |
| fli | Clean Python SDK, MCP-ready | Google Flights only (no hotel, no car) |
| LetsFG | True multi-source aggregation (400+ airlines) | Community project, variable data freshness |

---
*Updated automatically by the Globant AI Studios ingest pipeline.*
