# AI Agents — Travel & Hospitality

> Top open source AI agents and tools for the travel industry. Focus: MIT / Apache 2.0 licenses Globant can build on.
> Last updated: 2026-07-07

## Top Agents & Tools

| Name | License | Stars | Description |
|------|---------|-------|-------------|
| [openai-agents-travel-graph](https://github.com/BjornMelin/openai-agents-travel-graph) | MIT | ~120★ | State-of-the-art multi-agent travel planner: OpenAI Agents SDK + LangGraph orchestration + Stagehand/Playwright browser automation + Supabase persistence + Firecrawl/Tavily research |
| [Production-Ready-TripPlanner-Multi-AI-Agents](https://github.com/shaheennabi/Production-Ready-TripPlanner-Multi-AI-Agents-Project) | MIT | 74★ | Production-grade multi-agent trip planner with specialized agents for flights, hotels, activities, weather, and budget optimization |
| [Multi-Agent-AI-Travel-Advisor](https://github.com/kbhujbal/Multi-Agent-AI-Travel-Advisor) | MIT | 53★ | 7 specialized agents with RAG (retrieval-augmented generation) + tool-calling for personalized itinerary, visa info, currency, and packing advice |
| [travel-agent (CrewAI)](https://github.com/MozartofCode/travel-agent) | MIT | ~30★ | CrewAI-powered multi-agent travel orchestrator: transportation finder, accommodation agent, activities agent, weather advisor, destination historian |
| [ai-travelassistant](https://github.com/bala-ceg/ai-travelassistant) | MIT | ~25★ | Full-stack travel assistant integrating LangChain + Apify (flight search) + OpenAI, generates structured itineraries with real-time pricing |
| [travel-booking-agents](https://github.com/jongalloway/travel-booking-agents) | MIT | ~40★ | Corporate travel booking and policy approval workflow agent: validates per-diem limits ($195-$285/night hotels, $395-$520 flights), budget compliance automation |
| [Dida-hotel-MCP-CN](https://github.com/DIDA-AI/Dida-hotel-MCP-CN) | MIT | ~80★ | MCP server for hotel booking: 2M+ hotels via DIDA B2B API (world's 3rd largest travel B2B), real-time inventory/pricing, search by location/date/stars/guests |
| [mcp-travel-assistant](https://github.com/abhinavmathur-atlan/mcp-travel-assistant) | MIT | 6★ | MCP Travel Concierge Server with Google Maps integration for itinerary planning, POI discovery, and distance calculations |
| [concierge-ai](https://github.com/kimeshan/concierge-ai) | MIT | 8★ | Personal travel concierge that learns preferences, suggests destinations and routes, conversational booking assistant |
| [yay-travel-agent](https://github.com/Prosusware/yay-travel-agent) | Apache-2.0 | 7★ | Raise Your Hack Paris winner — concierge AI travel agent with multi-provider search and booking orchestration |

## Agent Protocol Compatibility

| Agent | MCP | OpenAI Agents SDK | LangGraph | CrewAI | Notes |
|-------|-----|-------------------|-----------|--------|-------|
| openai-agents-travel-graph | — | ✅ | ✅ | — | Most sophisticated stack |
| Dida-hotel-MCP-CN | ✅ | — | — | — | Drop-in MCP tool for any agent |
| mcp-travel-assistant | ✅ | — | — | — | Google Maps + travel MCP |
| Multi-Agent-AI-Travel-Advisor | — | — | ✅ | — | RAG-enhanced |
| travel-agent (CrewAI) | — | — | — | ✅ | Role-based agent orchestration |
| travel-booking-agents | — | ✅ | — | — | Corporate / approval workflow |

## Key Capabilities Matrix

| Capability | Best Agent(s) |
|-----------|---------------|
| Real-time flight search | ai-travelassistant (Apify), travel-booking-agents |
| Hotel booking / MCP | Dida-hotel-MCP-CN, mcp-travel-assistant |
| Full itinerary generation | openai-agents-travel-graph, Production-Ready-TripPlanner |
| Corporate policy enforcement | travel-booking-agents |
| Multi-agent orchestration | travel-agent (CrewAI), Multi-Agent-AI-Travel-Advisor |
| Visa / regulatory info | Multi-Agent-AI-Travel-Advisor |
| Browser automation (real booking) | openai-agents-travel-graph (Stagehand/Playwright) |

---
*Auto-updated by ingest pipeline.*
