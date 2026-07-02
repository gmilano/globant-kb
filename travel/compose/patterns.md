# Compose Patterns — Travel AI

> Concrete recipes: specific repos + agents + wiring instructions

---

## Pattern 1: Full-Stack AI Trip Planning Agent

**Use case:** A traveler describes their trip in natural language; the agent researches, books flights + hotel, generates a day-by-day itinerary, and sends a confirmation email — all autonomously.

**Components:**
- **[langchain-ai/langgraph](https://github.com/langchain-ai/langgraph)** (MIT) — stateful multi-step agent graph
- **[amadeus4dev/amadeus-python](https://github.com/amadeus4dev/amadeus-python)** (MIT) — live flight + hotel search
- **[sergio11/langgraph_travel_planner_assistant](https://github.com/sergio11/langgraph_travel_planner_assistant)** (MIT) — reference implementation
- **[nirbar1985/ai-travel-agent](https://github.com/nirbar1985/ai-travel-agent)** (MIT) — booking + email confirmation pattern

**Wiring:**
```python
# 1. Define LangGraph tool nodes
from amadeus import Client, ResponseError

amadeus = Client(client_id=AMADEUS_KEY, client_secret=AMADEUS_SECRET)

def search_flights(origin, destination, date, adults=1):
    response = amadeus.shopping.flight_offers_search.get(
        originLocationCode=origin,
        destinationLocationCode=destination,
        departureDate=date,
        adults=adults
    )
    return response.data[:5]  # top 5 offers

def search_hotels(city_code, check_in, check_out, adults=1):
    response = amadeus.shopping.hotel_offers_search.get(
        cityCode=city_code,
        checkInDate=check_in,
        checkOutDate=check_out,
        adults=adults
    )
    return response.data[:5]

# 2. Wire as LangChain tools
from langchain.tools import tool

@tool
def flight_search_tool(origin: str, destination: str, date: str) -> list:
    """Search for available flights. origin and destination are IATA codes."""
    return search_flights(origin, destination, date)

@tool
def hotel_search_tool(city_code: str, check_in: str, check_out: str) -> list:
    """Search for hotels in a city. city_code is IATA city code."""
    return search_hotels(city_code, check_in, check_out)

# 3. Build LangGraph state graph
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver

graph = StateGraph(TravelPlanState)
graph.add_node("parse_intent", parse_intent_node)     # extract dates, cities, preferences
graph.add_node("search_flights", flight_search_node)  # calls amadeus flight_search_tool
graph.add_node("search_hotels", hotel_search_node)    # calls amadeus hotel_search_tool
graph.add_node("select_options", selection_node)      # LLM picks best flight + hotel
graph.add_node("human_confirm", HumanInTheLoopNode()) # pause for user approval
graph.add_node("confirm_booking", booking_node)       # mock booking (real: Amadeus Orders API)
graph.add_node("generate_itinerary", itinerary_node)  # day-by-day plan via LLM
graph.add_node("send_confirmation", email_node)       # SMTP email with itinerary

# Edges
graph.set_entry_point("parse_intent")
graph.add_edge("parse_intent", "search_flights")
graph.add_edge("search_flights", "search_hotels")
graph.add_edge("search_hotels", "select_options")
graph.add_edge("select_options", "human_confirm")
graph.add_conditional_edges("human_confirm",
    lambda s: "confirm_booking" if s["approved"] else END)
graph.add_edge("confirm_booking", "generate_itinerary")
graph.add_edge("generate_itinerary", "send_confirmation")
graph.add_edge("send_confirmation", END)

# 4. Run with checkpointing (resume after user confirmation)
checkpointer = MemorySaver()
app = graph.compile(checkpointer=checkpointer, interrupt_before=["human_confirm"])
```

**Expected outcome:** End-to-end trip booked from natural language in < 60 seconds; human confirmation step prevents accidental charges; full itinerary emailed automatically.

---

## Pattern 2: Hotel Revenue Management Agent

**Use case:** Automatically optimize room pricing for a QloApps-managed hotel based on occupancy, local events, and competitor rates — without a costly RMS subscription.

**Components:**
- **[Qloapps/QloApps](https://github.com/Qloapps/QloApps)** (OSL-3.0) — hotel PMS with booking API
- **[crewAIInc/crewAI](https://github.com/crewAIInc/crewAI)** (MIT) — multi-agent crew
- **[Nixtla/neuralforecast](https://github.com/Nixtla/neuralforecast)** (Apache 2.0) — occupancy forecasting

**Wiring:**
```python
from crewai import Agent, Task, Crew

# Agent definitions
occupancy_forecaster = Agent(
    role='Occupancy Forecaster',
    goal='Predict next 30-day occupancy per room type using historical booking data',
    tools=[qloapps_bookings_tool, neuralforecast_tool],
    backstory='You are an expert hotel revenue analyst...'
)

competitor_monitor = Agent(
    role='Rate Monitor',
    goal='Fetch competitor room rates for the same dates from Booking.com/Expedia scraping',
    tools=[rate_scraper_tool, competitor_db_tool]
)

pricing_strategist = Agent(
    role='Pricing Strategist',
    goal='Set optimal room prices: maximize RevPAR within business rules (floor price, comp set positioning)',
    tools=[qloapps_rate_update_tool],
    backstory='You know hotel pricing theory: price floor = COGS × 1.25; never undercut comp set by >10%...'
)

# Tasks
forecast_task = Task(
    description='Pull 12 months of bookings from QloApps API. Train NHITS model per room type. Output 30-day occupancy forecast.',
    agent=occupancy_forecaster
)

competitor_task = Task(
    description='Scrape top 5 competitor rates for each of the next 30 days. Return {date: {competitor: rate}}.',
    agent=competitor_monitor
)

pricing_task = Task(
    description='''
    Using occupancy forecast and competitor rates:
    1. If forecast_occupancy > 85%: price = comp_avg × 1.08 (premium positioning)
    2. If forecast_occupancy 60-85%: price = comp_avg × 1.00 (parity)
    3. If forecast_occupancy < 60%: price = comp_avg × 0.95 (value positioning)
    Apply floor: max(proposed_price, room_cogs × 1.25)
    Update QloApps via PATCH /api/rooms/{id}/rates for each date.
    ''',
    agent=pricing_strategist,
    context=[forecast_task, competitor_task]
)

# Crew runs nightly at 02:00
crew = Crew(agents=[occupancy_forecaster, competitor_monitor, pricing_strategist],
            tasks=[forecast_task, competitor_task, pricing_task],
            verbose=True)
crew.kickoff()
```

**Expected outcome:** 8-15% RevPAR improvement vs. flat/manual pricing; full audit log of every rate change with reasoning.

---

## Pattern 3: AI Travel Concierge with RAG Knowledge Base

**Use case:** A white-label travel concierge chatbot for a hotel or tour operator that answers destination questions, suggests activities, and escalates to human agents when needed.

**Components:**
- **[huggingface/smolagents](https://github.com/huggingface/smolagents)** (Apache 2.0) — agent framework
- **[langchain-ai/langchain](https://github.com/langchain-ai/langchain)** (MIT) — RAG pipeline
- **[moizkamran/ExcursioX](https://github.com/moizkamran/ExcursioX)** (MIT) — CRM for escalation ticketing

**Wiring:**
```python
# 1. Build destination knowledge base
from langchain.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain.embeddings import HuggingFaceEmbeddings

loader = DirectoryLoader('./destination_guides/')  # curated PDFs/Markdown per destination
docs = loader.load()
splits = RecursiveCharacterTextSplitter(chunk_size=500).split_documents(docs)
vectorstore = Chroma.from_documents(splits, HuggingFaceEmbeddings())
retriever = vectorstore.as_retriever(search_kwargs={"k": 5})

# 2. Define smolagents tool set
from smolagents import tool, CodeAgent, LiteLLMModel

@tool
def destination_rag(query: str) -> str:
    """Answer questions about destinations, visa requirements, weather, and local tips."""
    docs = retriever.get_relevant_documents(query)
    return "\n".join([d.page_content for d in docs])

@tool
def excursiox_create_ticket(guest_name: str, issue: str, priority: str) -> str:
    """Escalate to human agent by creating a support ticket in ExcursioX CRM."""
    # POST /api/tickets via ExcursioX REST API
    resp = requests.post(f"{EXCURSIOX_URL}/api/tickets",
        json={"guest": guest_name, "issue": issue, "priority": priority},
        headers={"Authorization": f"Bearer {EXCURSIOX_TOKEN}"})
    return f"Ticket #{resp.json()['id']} created. Agent will contact within 30 min."

@tool
def search_local_activities(destination: str, interests: str, date: str) -> str:
    """Search for activities matching traveler interests at the destination."""
    # Integrate Viator API or curated local DB
    return activity_search(destination, interests, date)

# 3. Deploy concierge agent
model = LiteLLMModel("anthropic/claude-sonnet-5")  # or local Llama 4
concierge = CodeAgent(
    tools=[destination_rag, excursiox_create_ticket, search_local_activities],
    model=model,
    system_prompt="""You are a luxury travel concierge. Be warm and specific.
    Use destination_rag for factual questions. Suggest activities based on interests.
    If the guest reports a problem or you cannot help, always escalate via excursiox_create_ticket."""
)

# 4. Expose as WebSocket streaming endpoint
# Integrates with hotel website chat widget or WhatsApp via Twilio webhook
```

**Expected outcome:** 40% reduction in front-desk call volume; 24/7 concierge coverage without staffing cost; all escalations auto-logged in ExcursioX CRM.

---

## Pattern 4: Corporate Travel Policy Compliance Agent

**Use case:** When an employee submits a travel request, an AI agent checks policy compliance, finds the most cost-effective approved options, and auto-approves or routes to manager based on spend threshold.

**Components:**
- **[crewAIInc/crewAI](https://github.com/crewAIInc/crewAI)** (MIT) — multi-agent crew
- **[amadeus4dev/amadeus-python](https://github.com/amadeus4dev/amadeus-python)** (MIT) — live rates
- **[frappe/erpnext](https://github.com/frappe/erpnext)** (GPL-3.0) — expense and approval workflow

**Wiring:**
```python
# CrewAI Crew definition
policy_checker = Agent(
    role='Policy Compliance Agent',
    goal='Verify travel request against corporate policy (class of service, advance booking days, per diem)',
    tools=[policy_db_tool, amadeus_flight_tool]
)

cost_optimizer = Agent(
    role='Cost Optimizer',
    goal='Find the 3 cheapest compliant options (flight + hotel) within policy guardrails',
    tools=[amadeus_flight_tool, amadeus_hotel_tool, cost_comparison_tool]
)

approver = Agent(
    role='Auto-Approver',
    goal='Auto-approve if total cost < $2,000 AND policy_compliant=True; else route to manager',
    tools=[erpnext_approval_tool, slack_notify_tool]
)

# Task sequence
check_policy = Task(
    description=f"Check if this trip (route, dates, class) complies with policy ID {policy_id}. Flag any violations.",
    agent=policy_checker
)

find_options = Task(
    description="Find 3 best flight + hotel combos within policy. Include: airline, hotel, total cost, booking links.",
    agent=cost_optimizer,
    context=[check_policy]
)

approve_or_route = Task(
    description="""
    If policy_compliant AND total_cost < $2000:
        - ERPNext: POST /api/resource/Travel Request {'status': 'Approved', 'options': top_option}
        - Slack: notify employee with booking link
    Else:
        - ERPNext: POST /api/resource/Travel Request {'status': 'Pending Approval'}
        - Slack: notify manager with policy violations highlighted
    """,
    agent=approver,
    context=[check_policy, find_options]
)
```

**Expected outcome:** 70% of low-value travel requests auto-approved in < 2 minutes; policy violation rate drops due to pre-check before booking; manager workload reduced to high-value exception reviews only.

---

## Pattern 5: AI-Powered Tour Package Content Generator

**Use case:** A tour operator needs to publish 500 tour descriptions in 10 languages. A multi-agent pipeline generates, translates, SEO-optimizes, and publishes structured content automatically.

**Components:**
- **[huggingface/smolagents](https://github.com/huggingface/smolagents)** (Apache 2.0) — agent pipeline
- **[langchain-ai/langchain](https://github.com/langchain-ai/langchain)** (MIT) — prompt chains
- **[moizkamran/ExcursioX](https://github.com/moizkamran/ExcursioX)** (MIT) — content publishing API

**Wiring:**
```python
from smolagents import CodeAgent, LiteLLMModel, tool
import json

@tool
def generate_tour_description(tour_data: dict) -> str:
    """Generate a 400-word tour description from structured data (destination, highlights, duration, price)."""
    prompt = f"""
    Write a compelling 400-word tour description for:
    Destination: {tour_data['destination']}
    Duration: {tour_data['duration']} days
    Highlights: {', '.join(tour_data['highlights'])}
    Price from: ${tour_data['price_from']}
    Tone: Inspiring but factual. Include unique selling points. SEO-friendly.
    """
    return llm.invoke(prompt).content

@tool
def translate_content(text: str, target_language: str) -> str:
    """Translate tour content to target language preserving marketing tone."""
    return translation_llm.invoke(f"Translate to {target_language}, keep marketing tone:\n{text}").content

@tool
def publish_to_excursiox(tour_id: str, content: dict) -> str:
    """Publish translated content to ExcursioX tour catalog via REST API."""
    resp = requests.patch(f"{EXCURSIOX_URL}/api/tours/{tour_id}",
        json={"descriptions": content}, headers={"Authorization": f"Bearer {TOKEN}"})
    return f"Published {len(content)} language versions for tour {tour_id}"

# Pipeline: process 500 tours in parallel batches
languages = ["en", "es", "pt", "fr", "de", "it", "ja", "zh", "ar", "ko"]

for tour in tour_catalog:
    base_description = generate_tour_description(tour)
    translations = {lang: translate_content(base_description, lang) for lang in languages}
    publish_to_excursiox(tour['id'], translations)
```

**Expected outcome:** 500 tours × 10 languages = 5,000 pieces of content generated in < 2 hours; consistent tone; replaces 3-month manual localization project.
