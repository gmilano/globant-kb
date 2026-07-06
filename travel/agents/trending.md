# Trending — Travel AI Agents (July 2026)

> What's new and gaining momentum this week.
> Last updated: 2026-07-06

## Hot This Month

### flyai-skill — Alibaba Fliggy's Production MCP Skill
- **Repo**: [alibaba-flyai/flyai-skill](https://github.com/alibaba-flyai/flyai-skill)
- **License**: MIT
- **Why it's hot**: Fliggy is one of the world's largest OTAs (Alibaba Travel). This MCP skill is the first production-grade, full-stack travel skill from a Tier-1 OTA — covering flights, hotels, attractions, ground transport, and packages from initial planning to booking. Launched on ClawHub and GitHub in Q2 2026, ranked #1 travel skill by install volume on ClawHub within days.
- **Signal**: Major OTAs are now building native MCP skills, not just APIs. This is the new distribution model for travel inventory.

### RollingGo Hotel MCP — DIDA's Free Unlimited Hotel API
- **Repo**: [RollingGo-AI/rollinggo-hotel-mcp](https://github.com/RollingGo-AI/rollinggo-hotel-mcp)
- **License**: MIT
- **Why it's hot**: Backed by DIDA (world's #3 B2B travel supplier), 2M+ hotels, real-time inventory, completely free with no call limits. Permanent unlimited free access unlocked after first tool call within 3 days of API key approval (1-3 min auto-approval).
- **Signal**: B2B travel suppliers are opening free MCP interfaces to capture the AI agent distribution channel before Booking.com and Expedia lock it down.

### fli — 2.4k Stars for Google Flights MCP
- **Repo**: [punitarani/fli](https://github.com/punitarani/fli)
- **License**: MIT | **Stars**: ~2.4k★
- **Why it's hot**: Reverse-engineered Google Flights internal API — no scraping, no paid API key. Works with Claude Code, Codex CLI, ChatGPT. TypeScript port (`fli-js` on npm) enables frontend. De facto flight search layer for AI developers.
- **Signal**: ~2.4k★ and growing weekly. Featured on multiple "top MCP servers" lists.

### A2A Travel Reference Implementation — extrawest
- **Repo**: [extrawest/a2a_protocol_fundamentals_python](https://github.com/extrawest/a2a_protocol_fundamentals_python)
- **License**: MIT
- **Why it's hot**: Google's Agent2Agent (A2A) protocol is gaining rapid adoption, and this is the canonical travel reference showing specialized agents (hotel/CrewAI, car/LangGraph, currency, planner/ADK) communicating over A2A. Master planner on port 10001, hotel agent on 10002, car rental on 10003, currency on 10004.
- **Signal**: A2A is becoming the standard for agent-to-agent communication in travel, complementing MCP (tools) with coordination layer.

### Azure App Service A2A Travel Agent
- **Repo**: [Azure-Samples/app-service-a2a-travel-agent](https://github.com/Azure-Samples/app-service-a2a-travel-agent)
- **License**: MIT
- **Why it's hot**: Microsoft's official sample deploying A2A multi-agent travel to Azure App Service. Enterprise deployment reference — shows how to containerize and scale travel agents in production.
- **Signal**: Major cloud vendors publishing travel-specific A2A samples accelerates enterprise adoption.

## Ecosystem Context

The travel MCP ecosystem has expanded significantly in 2026:
- **Flight MCP servers**: `fli` (Google Flights), `flights-mcp` (Duffel), `mcp-amadeus` (GDS), `amadeus-mcp-server-standalone`
- **Hotel MCP servers**: `rollinggo-hotel-mcp` (DIDA 2M+ hotels), `hotels_mcp_server` (Booking.com), `Dida-hotel-MCP-CN` (Chinese market)
- **Full-stack**: `flyai-skill` (Fliggy — flights + hotels + attractions + transport)
- **Coordination**: A2A protocol for multi-agent orchestration

**Key dynamic**: OTAs and B2B suppliers are racing to publish MCP/A2A interfaces before platform aggregators capture the AI agent distribution channel.

---
*Updated weekly by ingest pipeline.*
