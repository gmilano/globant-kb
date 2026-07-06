# Foundational Repos — Travel & Hospitality

> Real bases to build on. Open license, active community.
> Last updated: 2026-07-06

## Flight Search & Booking

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|----------|
| [punitarani/fli](https://github.com/punitarani/fli) | MIT | ~2.4k★ | Google Flights MCP + CLI + Python library. Reverse-engineered Google Flights API — no scraping, no paid keys. Supports one-way, round-trip, multi-city, flexible dates, cabin class filters. MCP server + `fli-js` TS port. | Yes — MCP server ready |
| [ravinahp/flights-mcp](https://github.com/ravinahp/flights-mcp) | MIT | ~205★ | MCP server wrapping Duffel API. Duffel connects to 300+ airlines. Supports complex multi-city, contextual multi-turn conversation. Containerized (Dockerfile included). | Yes — MCP server ready |
| [donghyun-chae/mcp-amadeus](https://github.com/donghyun-chae/mcp-amadeus) | MIT | ~60★ | Amadeus Self-Service API MCP server. Connects agents to Amadeus GDS: flight offers, hotel offers, airport search, airline info. Requires free Amadeus dev account. | Yes — MCP server ready |
| [amadeus4dev/amadeus-python](https://github.com/amadeus4dev/amadeus-python) | MIT | ~650★ | Official Amadeus Python SDK. Flight Offers Search, Hotel Search, Points of Interest, Trip Purpose Prediction, Seat Maps, Flight Delay Prediction. The production-grade GDS integration. | Yes — add LangChain/LangGraph wrapper |

## Hotel & Hospitality Platforms

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|----------|
| [Qloapps/QloApps](https://github.com/Qloapps/QloApps) | OSL-3.0 / AFL-3.0 | ~731★ | Full hotel PMS + Booking Engine + Hotel Website. Open-source, self-hosted. Handles reservations, front desk, housekeeping, rate management, OTA channel manager. PHP/PrestaShop base. 13k+ forks, updated Mar 2026. | Yes — add REST API hooks + LangGraph agent on top |
| [RollingGo-AI/rollinggo-hotel-mcp](https://github.com/RollingGo-AI/rollinggo-hotel-mcp) | MIT | ~80★ | Hotel booking MCP from DIDA (world's #3 B2B travel platform). 2M+ hotels, 500+ global suppliers, real-time pricing/inventory. Free unlimited API. Hotel search, room types, price plans, cancellation policies. | Yes — MCP server ready |
| [esakrissa/hotels_mcp_server](https://github.com/esakrissa/hotels_mcp_server) | MIT | ~35★ | MCP server for hotel search via Booking.com API. Searches by location, dates, price range, ratings. Returns real availability and reviews. | Yes — MCP server ready |

## Full Travel Platform

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|----------|
| [alibaba-flyai/flyai-skill](https://github.com/alibaba-flyai/flyai-skill) | MIT | ~150★ | Fliggy (Alibaba) full-stack travel MCP skill. Flights, hotels, attractions, ground transport, leisure activities, flight passes, hotel packages. Production-grade from one of the world's largest OTAs. Full booking, not just search. | Yes — MCP skill ready |

## Agent Coordination Infrastructure

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|----------|
| [a2aproject/A2A](https://github.com/a2aproject/A2A) | Apache 2.0 | ~20k★ | Google's Agent2Agent open protocol. Enables communication and interoperability between opaque agentic applications — the "how agents talk to other agents" standard. Adopted by Microsoft Azure, Salesforce, and 50+ frameworks. | Yes — protocol layer |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | ~15k★ | Agent orchestration framework — StateGraph, parallel execution, human-in-the-loop. Used by the best travel agent implementations (HarimxChoi, BjornMelin). | Yes — orchestration layer |
| [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | ~30k★ | Multi-agent framework. Role-based agents with defined goals and backstories. Most travel agent tutorials use this. | Yes — agent framework |

---
*See also: `verticals/solutions.md` for full vertical platform assessment.*
