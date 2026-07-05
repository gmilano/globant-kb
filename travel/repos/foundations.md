# Foundational Repos — Travel Industry

> The bedrock open-source projects every travel AI initiative should know
> Last updated: 2026-07-05

## Agent Orchestration

| # | Repo | License | Stars | Role |
|---|------|---------|-------|------|
| 1 | [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | 35k+ | Graph-based agent orchestration library; the standard backbone for multi-step travel agents (flight → hotel → activity → confirm); supports retries, human-in-the-loop, and streaming out of the box |
| 2 | [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | MIT | 100k+ | Core LLM framework for tool-calling agents; provides the travel tool ecosystem (web search, calendar, email) and prompt templates used by most travel agent projects |
| 3 | [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | 52k+ | Multi-agent crew orchestration; use to define travel specialist agents (Flight Researcher, Hotel Scout, Itinerary Writer, Budget Optimizer) with role-based memory and task delegation |
| 4 | [huggingface/smolagents](https://github.com/huggingface/smolagents) | Apache 2.0 | 27k+ | Minimal code-first agent framework for composing travel tool pipelines (price scraping, content generation, translation); low overhead, no vendor lock-in |

## Hotel & Travel Platforms

| # | Repo | License | Stars | Role |
|---|------|---------|-------|------|
| 5 | [Qloapps/QloApps](https://github.com/Qloapps/QloApps) | OSL-3.0 | 1.5k+ | Full open-source hotel PMS + booking engine + channel manager; the hospitality equivalent of Medusa — the base platform when building AI on top of hotel operations |
| 6 | [moizkamran/ExcursioX](https://github.com/moizkamran/ExcursioX) | MIT | 200+ | Open-source Travel CRM with integrated ticketing, hotel management, and booking modules; MERN stack + Redux Toolkit; the only MIT-licensed travel CRM with full booking flows |
| 7 | [frappe/erpnext](https://github.com/frappe/erpnext) | GPL-3.0 | 22k+ | ERPNext with travel agency module: invoice management, supplier payments, itinerary costing, and CRM; Python REST API pairs cleanly with LangChain agent tools for automated back-office ops |
| 8 | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Apache 2.0 | 3k+ | Apache OFBiz ERP/CRM — mature Java framework with order management, supplier catalog, and accounting; deployed in large tour operators as the operational backbone |

## GDS / Flight & Hotel Data

| # | Repo | License | Stars | Role |
|---|------|---------|-------|------|
| 9 | [amadeus4dev/amadeus-python](https://github.com/amadeus4dev/amadeus-python) | MIT | 700+ | Official Amadeus GDS Python SDK; provides REST access to live flight search, hotel rates, seat maps, and trip purpose prediction — the primary GDS integration layer for agent tool calls |
| 10 | [amadeus4dev/amadeus-node](https://github.com/amadeus4dev/amadeus-node) | MIT | 500+ | Official Amadeus GDS Node.js SDK; same live flight + hotel APIs for TypeScript/JavaScript travel agent stacks; widely used in serverless booking microservices |

## Routing & Geospatial Infrastructure (NEW Jul 2026)

| # | Repo | License | Stars | Role |
|---|------|---------|-------|------|
| 11 | [Project-OSRM/osrm-backend](https://github.com/Project-OSRM/osrm-backend) | BSD-2-Clause | 7.7k+ | C++ high-performance routing on OpenStreetMap; sub-millisecond queries; map-matching, traveling salesman; production-tested at Uber scale; expose as LangChain tool for "route from A to B" queries |
| 12 | [valhalla/valhalla](https://github.com/valhalla/valhalla) | MIT | 5.6k+ | Multi-modal routing engine (car/bike/walk/transit) on OSM; isochrones + time matrices; great for fleet management and multi-modal itinerary agents |
| 13 | [graphhopper/graphhopper](https://github.com/graphhopper/graphhopper) | Apache 2.0 | 5k+ | Java routing engine with REST API; commercial-friendly Apache 2.0; isochrones, matrix API, custom vehicle profiles; preferred when Java stack required |
| 14 | [opentripplanner/OpenTripPlanner](https://github.com/opentripplanner/OpenTripPlanner) | LGPL-3.0 | 2.6k+ | Multi-modal trip planner combining GTFS transit + OSM; GraphQL API; transit agency data available for São Paulo, Buenos Aires, Mexico City, Bogotá, Santiago |
| 15 | [NERVsystems/osmmcp](https://github.com/NERVsystems/osmmcp) | MIT | 300+ | OpenStreetMap as MCP server; geocoding, routing, nearby POI, neighborhood analysis for LLMs via Model Context Protocol — no API keys, no custom SDK, just wire to agent |

## Selection Rationale

- **Agent layer**: LangGraph (complex stateful flows) or CrewAI (role-based crews) — both MIT, both production-proven in travel by 2026.
- **GDS connectivity**: Amadeus Python/Node SDKs (both MIT) for live flight and hotel data; free self-service tier available; enterprise tier for production volume.
- **Hotel PMS**: QloApps (OSL-3.0, free to self-host) for hotel-side clients; wrap its booking API as a LangChain tool.
- **Back-office ERP**: ERPNext for SMB travel agencies (GPL-3.0, cost-conscious); Apache OFBiz for enterprise tour operators (Apache 2.0, Java).
- **CRM**: ExcursioX (MIT) is the only fully open travel CRM — fork it, add AI suggestion sidebar, ship.
- **Routing (NEW)**: OSRM for raw performance (BSD-2-Clause), Valhalla for multi-modal (MIT), GraphHopper for Java stacks (Apache 2.0), OTP for public transit (LGPL). Use osmmcp to expose any of these to LLM agents via MCP without custom integration code.
- **License posture**: MIT (ExcursioX, LangGraph, CrewAI, Amadeus SDKs, Valhalla, osmmcp) and Apache 2.0 (OFBiz, Smolagents, GraphHopper) are commercially safe. OSRM is BSD-2-Clause (also safe). OSL-3.0 (QloApps) and GPL (ERPNext) require care if distributing modified code.
