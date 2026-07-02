# Foundational Repos — Travel Industry

> The bedrock open-source projects every travel AI initiative should know

| # | Repo | License | Stars | Role |
|---|------|---------|-------|------|
| 1 | [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | 12k+ | Graph-based agent orchestration library; the standard backbone for multi-step travel agents (flight → hotel → activity → confirm); supports retries, human-in-the-loop, and streaming out of the box |
| 2 | [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | MIT | 95k+ | Core LLM framework for tool-calling agents; provides the travel tool ecosystem (web search, calendar, email) and prompt templates used by most travel agent projects |
| 3 | [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | 52k+ | Multi-agent crew orchestration; use to define travel specialist agents (Flight Researcher, Hotel Scout, Itinerary Writer, Budget Optimizer) with role-based memory and task delegation |
| 4 | [Qloapps/QloApps](https://github.com/Qloapps/QloApps) | OSL-3.0 | 1.5k+ | Full open-source hotel PMS + booking engine + channel manager; the hospitality equivalent of Medusa — the base platform when building AI on top of hotel operations |
| 5 | [moizkamran/ExcursioX](https://github.com/moizkamran/ExcursioX) | MIT | 200+ | Open-source Travel CRM with integrated ticketing, hotel management, and booking modules; MERN stack + Redux Toolkit; the only MIT-licensed travel CRM with full booking flows |
| 6 | [amadeus4dev/amadeus-python](https://github.com/amadeus4dev/amadeus-python) | MIT | 700+ | Official Amadeus GDS Python SDK; provides REST access to live flight search, hotel rates, seat maps, and trip purpose prediction — the primary GDS integration layer for agent tool calls |
| 7 | [amadeus4dev/amadeus-node](https://github.com/amadeus4dev/amadeus-node) | MIT | 500+ | Official Amadeus GDS Node.js SDK; same live flight + hotel APIs for TypeScript/JavaScript travel agent stacks; widely used in serverless booking microservices |
| 8 | [frappe/erpnext](https://github.com/frappe/erpnext) | GPL-3.0 | 20k+ | ERPNext with travel agency module: invoice management, supplier payments, itinerary costing, and CRM; Python REST API pairs cleanly with LangChain agent tools for automated back-office ops |
| 9 | [huggingface/smolagents](https://github.com/huggingface/smolagents) | Apache 2.0 | 27k+ | Minimal code-first agent framework for composing travel tool pipelines (price scraping, content generation, translation); low overhead, no vendor lock-in |
| 10 | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Apache 2.0 | 3k+ | Apache OFBiz ERP/CRM — mature Java framework with order management, supplier catalog, and accounting; deployed in large tour operators as the operational backbone; ML models embed via Java service layer |

## Selection Rationale

- **Agent layer**: LangGraph (complex stateful flows) or CrewAI (role-based crews) — both MIT, both production-proven in travel by 2026.
- **GDS connectivity**: Amadeus Python/Node SDKs (both MIT) for live flight and hotel data; free self-service tier available; enterprise tier for production volume.
- **Hotel PMS**: QloApps (OSL-3.0, free to self-host) for hotel-side clients; wrap its booking API as a LangChain tool.
- **Back-office ERP**: ERPNext for SMB travel agencies (GPL-3.0, cost-conscious); Apache OFBiz for enterprise tour operators (Apache 2.0, Java).
- **CRM**: ExcursioX (MIT) is the only fully open travel CRM — fork it, add AI suggestion sidebar, ship.
- **License posture**: MIT (ExcursioX, LangGraph, CrewAI, Amadeus SDKs, LangChain) and Apache 2.0 (OFBiz, Smolagents) are commercially safe. OSL-3.0 (QloApps) is copyleft but commonly used for SaaS-style deployment. GPL (ERPNext) requires care if distributing modified code.
