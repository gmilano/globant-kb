# 🧩 Composition Patterns — Travel & Hospitality

> Concrete recipes for building solutions. Every pattern names specific repos + agents + wiring.
> Last updated: 2026-07-10

## Architecture Base

```
[Inventory Layer]                [Orchestration Layer]         [Channel Layer]
amadeus-python (flights)    →    LangGraph state machine   →   WhatsApp / Web / API
DIDA Hotel MCP (hotels)     →    Agent tool calls          →   Claude responses
flights-mcp (search)        →    Memory / preferences      →   B2B portal
                                 Policy enforcement
```

---

## P1 — Corporate Travel Approval Agent

**Problem**: Corporate travel booking requires policy validation, budget approval, preferred-vendor enforcement, and audit trails. Manual = slow + error-prone.

**Stack**:
- `amadeus4dev/amadeus-python` — flight search + pricing
- `DIDA-AI/Dida-hotel-MCP-CN` — hotel search (2M+ hotels, free)
- `langchain-ai/langgraph` — policy-enforcement state machine
- Claude Sonnet — reasoning + response generation
- PostgreSQL — travel policy store + PNR audit log

**Flow**:
```python
from langgraph.graph import StateGraph
from anthropic import Anthropic
from amadeus import Client as AmadeusClient

amadeus = AmadeusClient(client_id="...", client_secret="...")
claude = Anthropic()

def search_flights(state):
    results = amadeus.shopping.flight_offers_search.get(
        originLocationCode=state["origin"],
        destinationLocationCode=state["destination"],
        departureDate=state["date"],
        adults=1,
        travelClass="ECONOMY"
    )
    return {"flight_options": results.data[:5]}

def check_policy(state):
    policy = load_policy(state["employee_id"])
    violations = []
    for flight in state["flight_options"]:
        price = float(flight["price"]["total"])
        if price > policy["max_flight_budget"]:
            violations.append(f"Price ${price} exceeds policy ${policy['max_flight_budget']}")
        if flight["itineraries"][0]["duration"] > policy["max_duration"]:
            violations.append("Duration exceeds policy")
    return {"violations": violations, "policy": policy}

def get_approval(state):
    if state["violations"]:
        # Route to manager approval
        return {"status": "pending_approval", "approver": state["manager_email"]}
    return {"status": "auto_approved"}

graph = StateGraph(dict)
graph.add_node("search", search_flights)
graph.add_node("check_policy", check_policy)
graph.add_node("approval", get_approval)
graph.add_edge("search", "check_policy")
graph.add_edge("check_policy", "approval")
agent = graph.compile()
```

**Estimated effort**: 6–10 weeks | **Deal range**: $100k–$400k
**Target clients**: Regional corporations with 500+ employees, LATAM offices

---

## P2 — Hotel AI Concierge (QloApps + Claude)

**Problem**: Hotels need 24/7 multilingual guest communication (pre-arrival, upsell, FAQ) but can't staff it. QloApps handles reservations but has no AI layer.

**Stack**:
- `Qloapps/QloApps` — open-source PMS + booking engine (PHP)
- Claude Haiku — fast, low-cost responses for guest messages
- QloApps Hooks API — trigger AI on reservation events
- WhatsApp Business API — primary LATAM channel
- Redis — session memory for multi-turn conversations

**Integration point** (QloApps hook):
```php
// In QloApps/override/controllers/front/OrderConfirmationController.php
class OrderConfirmationControllerCore extends FrontController {
    public function postProcess() {
        parent::postProcess();
        // Trigger AI welcome message
        $booking = $this->context->cart;
        $this->sendAIWelcome($booking);
    }

    private function sendAIWelcome($booking) {
        $claude_response = $this->callClaude(
            "Generate a warm welcome message for a guest checking in on " .
            $booking->checkInDate . " for " . $booking->nights . " nights. " .
            "Mention breakfast at 7am, pool hours, and ask if they need airport transfer. " .
            "Language: " . $booking->guestLanguage
        );
        $this->sendWhatsApp($booking->guestPhone, $claude_response);
    }
}
```

**Upsell flow**:
- T-48h: AI sends upgrade offer based on room type + availability
- T-24h: AI offers airport transfer + breakfast package
- Day 2: AI asks for feedback, offers dinner reservation
- Checkout: AI requests review with direct TripAdvisor link

**Estimated effort**: 4–8 weeks | **Deal range**: $80k–$250k
**Target clients**: Boutique hotels in Argentina, Brazil, Mexico running QloApps or equivalent PMS

---

## P3 — Multi-Agent Flight + Hotel Search (MCP-Native)

**Problem**: Users want a single conversational interface to search flights + hotels + activities together, with price comparison and booking — not 3 separate sites.

**Stack**:
- `skarlekar/mcp_travelassistant` — base MCP server suite
- `ravinahp/flights-mcp` — flight search (no API key)
- `DIDA-AI/Dida-hotel-MCP-CN` — hotel search (2M+ hotels)
- `langchain-ai/langgraph` — orchestration
- Claude Sonnet — reasoning + structured tool calls
- FastAPI — REST API endpoint for web/mobile clients

**MCP wiring**:
```python
import anthropic
import json

client = anthropic.Anthropic()

# MCP servers registered in claude_desktop_config.json
# or loaded via subprocess for API use

tools = [
    {
        "name": "search_flights",
        "description": "Search available flights between two airports",
        "input_schema": {
            "type": "object",
            "properties": {
                "origin": {"type": "string", "description": "IATA airport code"},
                "destination": {"type": "string", "description": "IATA airport code"},
                "date": {"type": "string", "description": "YYYY-MM-DD"},
                "passengers": {"type": "integer"}
            },
            "required": ["origin", "destination", "date"]
        }
    },
    {
        "name": "search_hotels",
        "description": "Search hotels via DIDA API",
        "input_schema": {
            "type": "object",
            "properties": {
                "city": {"type": "string"},
                "checkin": {"type": "string"},
                "checkout": {"type": "string"},
                "guests": {"type": "integer"},
                "max_price_usd": {"type": "number"}
            },
            "required": ["city", "checkin", "checkout"]
        }
    }
]

def travel_agent(user_message: str, conversation_history: list):
    messages = conversation_history + [{"role": "user", "content": user_message}]
    
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=4096,
        system="You are a travel planning assistant. Help users find flights and hotels. Always confirm prices and dates before suggesting booking.",
        tools=tools,
        messages=messages
    )
    
    # Handle tool use in agentic loop
    while response.stop_reason == "tool_use":
        tool_results = []
        for block in response.content:
            if block.type == "tool_use":
                result = call_mcp_tool(block.name, block.input)
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": json.dumps(result)
                })
        messages = messages + [
            {"role": "assistant", "content": response.content},
            {"role": "user", "content": tool_results}
        ]
        response = client.messages.create(
            model="claude-sonnet-5",
            max_tokens=4096,
            tools=tools,
            messages=messages
        )
    
    return response.content[0].text
```

**Estimated effort**: 4–6 weeks | **Deal range**: $80k–$250k
**Target clients**: Digital travel agencies, OTA startups, travel super-apps

---

## P4 — Airline Customer Service Agent (KaibanJS Pattern)

**Problem**: Airlines handle thousands of daily queries (flight status, rebooking, refunds, loyalty points). Human agents are expensive; existing IVR is terrible UX.

**Stack**:
- `kaiban-ai/KaibanJS` — multi-agent orchestration (JS)
- Amadeus PNR APIs — booking retrieval + modification
- Claude Haiku — first-line response (low latency, cost-efficient)
- Claude Sonnet — escalated/complex cases
- WhatsApp Business / Web chat — channel
- Human-in-the-loop via Agent handoff tool

**Agent roles** (KaibanJS team):
```javascript
import { Agent, Task, Team } from 'kaibanjs';

const triageAgent = new Agent({
    name: 'Triage',
    role: 'Route customer queries to the right specialist',
    goal: 'Classify intent: booking-change, refund, status, loyalty, other',
    llmConfig: { provider: 'anthropic', model: 'claude-haiku-4-5-20251001' }
});

const rebookingAgent = new Agent({
    name: 'Rebooking Specialist',
    role: 'Handle flight changes and cancellations',
    goal: 'Rebook or cancel flight per customer request, maximize future credit retention',
    tools: [pnrLookupTool, flightSearchTool, pnrModifyTool],
    llmConfig: { provider: 'anthropic', model: 'claude-sonnet-5' }
});

const loyaltyAgent = new Agent({
    name: 'Loyalty Specialist',
    role: 'Handle miles/points queries and redemptions',
    goal: 'Explain point balances, expiry, and redemption options',
    tools: [loyaltyApiTool],
    llmConfig: { provider: 'anthropic', model: 'claude-haiku-4-5-20251001' }
});

const team = new Team({
    name: 'Airline Customer Service',
    agents: [triageAgent, rebookingAgent, loyaltyAgent],
    tasks: [
        new Task({ agent: triageAgent, description: 'Classify: {customer_query}' }),
        new Task({ agent: rebookingAgent, description: 'Process rebooking if applicable' }),
        new Task({ agent: loyaltyAgent, description: 'Answer loyalty query if applicable' })
    ]
});
```

**Estimated effort**: 8–14 weeks | **Deal range**: $150k–$500k
**Target clients**: LATAM Airlines, GOL, Avianca, Copa, Aerolíneas Argentinas

---

## P5 — LATAM WhatsApp Travel Bot (Pix + Agentic Payments)

**Problem**: Brazilian and LATAM travelers book travel via WhatsApp but agents are human, slow, and inconsistent. Pix + Visa Intelligent Commerce now enables agentic end-to-end payments in Brazil.

**Stack**:
- WhatsApp Business Cloud API (Meta)
- Claude Sonnet — conversation + itinerary generation
- `DIDA-AI/Dida-hotel-MCP-CN` — hotel search
- Amadeus NDC API — flight search
- Pix (Brazil) / Visa Intelligent Commerce — payment
- FastAPI + PostgreSQL — booking records

**Flow**:
```
User sends WhatsApp: "Quero viajar para Cancun em agosto, casal, budget R$8000"
        ↓
Claude extracts intent: destination=CUN, month=Aug, budget=8000 BRL, pax=2
        ↓
Agent calls DIDA MCP → hotel options [4★ all-inclusive R$4200/casal]
Agent calls Amadeus → flight options [GRU→CUN R$3200/casal]
        ↓
Claude summarizes: "Encontrei pacote completo por R$7400 — voo + hotel 7 noites.
                    Quer reservar? Pago via Pix 🇧🇷"
        ↓
User confirms → Pix payment initiated → PNR created → WhatsApp confirmation PDF
```

**Estimated effort**: 6–10 weeks | **Deal range**: $80k–$300k
**Target clients**: Brazilian travel agencies, Despegar.com Brazilian ops, Turismo Receptivo operators

---

## P6 — Hotel Revenue Intelligence (RAG + Competitive Pricing)

**Problem**: Hotel revenue managers spend hours manually pulling competitor rates, OTA performance, and demand signals. AI can automate this and surface actionable pricing recommendations.

**Stack**:
- `amadeus4dev/amadeus-python` — hotel offers + demand forecasts
- Claude Sonnet — analysis + narrative reporting
- Weaviate or Qdrant — vector store for historical rate data
- Python + FastAPI — scraping + API layer
- Looker Studio — dashboard

**Pattern**:
```python
import anthropic
from amadeus import Client as AmadeusClient

amadeus = AmadeusClient(client_id=..., client_secret=...)
client = anthropic.Anthropic()

def generate_revenue_report(hotel_id: str, date_range: tuple) -> str:
    # Pull competitor rates from Amadeus Hotel Offers
    offers = amadeus.shopping.hotel_offers_search.get(
        hotelIds=[hotel_id] + COMPETITOR_IDS,
        checkInDate=date_range[0],
        checkOutDate=date_range[1]
    )
    
    # Retrieve historical performance from vector store
    historical = vector_store.query(f"hotel {hotel_id} revenue {date_range[0][:7]}")
    
    report = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2000,
        messages=[{
            "role": "user",
            "content": f"""Analyze hotel revenue positioning:
            Current rates: {offers.data}
            Historical context: {historical}
            Recommend: pricing adjustments, length-of-stay restrictions, channel mix.
            Format as executive summary with 3 action items."""
        }]
    )
    return report.content[0].text
```

**Estimated effort**: 6–10 weeks | **Deal range**: $100k–$350k
**Target clients**: Hotel chains in LATAM, hotel management companies, revenue management consultancies

---

## P7 — Corporate OTA with Policy Guardrails (Full Stack)

**Problem**: Mid-market companies ($10M–$500M revenue) need corporate travel management but can't afford SAP Concur. They need Expedia UX + corporate policy control.

**Stack**:
- `Azure-Samples/azure-ai-travel-agents` — base architecture (MIT, ACA-deployable)
- `amadeus4dev/amadeus-python` — GDS inventory
- `DIDA-AI/Dida-hotel-MCP-CN` — hotel inventory
- LangGraph — policy enforcement state machine
- Azure Container Apps — deployment (scales to zero)
- Microsoft Entra ID — corporate SSO

**Deployment** (from azure-ai-travel-agents):
```bash
# Clone Microsoft's reference architecture
git clone https://github.com/Azure-Samples/azure-ai-travel-agents
cd azure-ai-travel-agents

# Configure orchestrator (LangChain.js, LlamaIndex.TS, or Microsoft Agent Framework)
cp .env.example .env
# Set ANTHROPIC_API_KEY, AMADEUS_CLIENT_ID, AMADEUS_CLIENT_SECRET, DIDA_API_KEY

# Deploy to Azure Container Apps
azd up
```

**Customization points**:
1. Add company travel policy JSON to the policy MCP server
2. Configure approval workflow (auto-approve under threshold, manager email above)
3. Add Pix / local payment methods for LATAM entities
4. White-label UI with company branding

**Estimated effort**: 10–16 weeks | **Deal range**: $200k–$600k
**Target clients**: LATAM multinationals, professional services firms, tech companies 500–5000 employees

---

## Quick-Start Matrix

| Problem | Time | Cost | Key Repos |
|---------|------|------|-----------|
| Hotel AI concierge | 4–8w | $80k–$250k | QloApps + Claude Haiku + WhatsApp |
| Multi-agent flight+hotel search | 4–6w | $80k–$250k | flights-mcp + DIDA MCP + LangGraph |
| Corporate travel approval | 6–10w | $100k–$400k | amadeus-python + LangGraph + policy store |
| Airline customer service | 8–14w | $150k–$500k | KaibanJS + Amadeus PNR + Claude |
| LATAM WhatsApp travel bot | 6–10w | $80k–$300k | WhatsApp API + DIDA MCP + Pix |
| Hotel revenue intelligence | 6–10w | $100k–$350k | amadeus-python + vector store + Claude |
| Corporate OTA (full stack) | 10–16w | $200k–$600k | azure-ai-travel-agents + Amadeus + DIDA |
