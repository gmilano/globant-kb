# Top AI Agents & Tools — Travel Industry

> Last updated: 2026-07-02 | Focus: MIT / Apache 2.0 licenses Globant can build on

## AI Agents Table

| # | Name | GitHub | License | Stars | Description |
|---|------|--------|---------|-------|-------------|
| 1 | ai-travel-agent (nirbar1985) | [nirbar1985/ai-travel-agent](https://github.com/nirbar1985/ai-travel-agent) | MIT | 500+ | LangGraph-based multi-agent travel assistant; handles flight search, hotel booking, and personalized email confirmation using tool-calling LLMs |
| 2 | LangGraph Travel Planner Assistant | [sergio11/langgraph_travel_planner_assistant](https://github.com/sergio11/langgraph_travel_planner_assistant) | MIT | 300+ | Autonomous travel planner using LangGraph + Tavily real-time search; orchestrates flights, hotels, and activities from minimal user input |
| 3 | MultiAgents Travel Itinerary Planner | [vikrambhat2/MultiAgents-with-Langgraph-TravelItineraryPlanner](https://github.com/vikrambhat2/MultiAgents-with-Langgraph-TravelItineraryPlanner) | MIT | 200+ | Multi-agent LangGraph app with Streamlit UI; separate specialist agents for flights, hotels, activities, and budget optimization |
| 4 | Travel-Assistant-Agent-OpenAI-SDK | [FarazF19/Travel-Assistant-Agent-OpenAI-SDK](https://github.com/FarazF19/Travel-Assistant-Agent-OpenAI-SDK) | MIT | 150+ | Travel assistant built on OpenAI Agents SDK with Streamlit; delivers personalized travel plans, flight options, and hotel recommendations |
| 5 | AI-Travel-Planner (Llama 4) | [thrishank007/AI-Travel-Planner](https://github.com/thrishank007/AI-Travel-Planner) | MIT | 200+ | Llama 4-powered itinerary generator with Streamlit UI; fully local inference via HuggingFace, no OpenAI API key required |
| 6 | CrewAI | [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | 52k+ | Role-based multi-agent orchestration framework; widely used for travel planning crews (Researcher, Booker, Concierge roles) with 5M+ monthly downloads |
| 7 | Smolagents | [huggingface/smolagents](https://github.com/huggingface/smolagents) | Apache 2.0 | 27k+ | HuggingFace's minimal code-first agent framework; compose tool-using agents for travel search, price comparison, and content generation |
| 8 | open-agent-platform | [langchain-ai/open-agent-platform](https://github.com/langchain-ai/open-agent-platform) | MIT | 5k+ | No-code LangGraph agent builder with visual editor; deploy travel concierge agents without writing orchestration code |
| 9 | raunaqness/ai-travel-agent | [raunaqness/ai-travel-agent](https://github.com/raunaqness/ai-travel-agent) | MIT | 400+ | LangGraph travel agent with real GDS API calls; demonstrates Amadeus API integration for live flight and hotel data |
| 10 | ai-travel-planner (zinedkaloc) | [zinedkaloc/ai-travel-planner](https://github.com/zinedkaloc/ai-travel-planner) | MIT | 250+ | OpenAI Chat Completion-based itinerary generator; minimal footprint, easily extended with booking tool calls and streaming UI |

## Notes

- **LangGraph dominance**: items 1-4 all use LangGraph for stateful multi-step travel workflows — the go-to choice for 2026 travel agent builds due to native support for retries, human-in-the-loop checkpointing, and streaming.
- **Local-first option**: AI-Travel-Planner (item 5) runs Llama 4 fully locally — critical for enterprise clients or markets with data-residency requirements.
- **Framework vs. application**: CrewAI and Smolagents are agent frameworks; items 1-5, 9-10 are ready-to-fork reference applications targeting travel specifically.
- **GDS connectivity**: item 9 (raunaqness) is the only reference project with live Amadeus API wiring — start here when a production flight search is required.
- **Agentic trend**: 61% of travel businesses are experimenting with or scaling agentic AI (Phocuswright 2026); MCP and A2A interoperability standards are being adopted by major hotel groups (Marriott, IHG) to expose inventory to autonomous agents.
