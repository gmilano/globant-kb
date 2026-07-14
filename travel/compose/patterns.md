# 🧩 Patrones de composición — Travel & Hospitality

> Recetas concretas combinando repos + agentes + AI. Todo con URLs reales.
> Última actualización: 2026-07-14 (v7)

## Arquitectura base

```
[Data Layer: opentraveldata OPTD (IATA/POR/aeropuertos)]
          ↓
[MCP Layer: mcp-amadeus (flights) + Dida-hotel-MCP-CN (hotels)]
          ↓
[Agent Orchestrator: trip_planner_agent / travel-booking-agents]
          ↓
[Guardrail: Iti-Validator (temporal consistency)]
          ↓
[UI: WhatsApp (LATAM) / Web Chat / Voice / API]
```

---

## P1 — Agente de planificación de viajes con CrewAI + MCP (MVP rápido)

**Objetivo**: itinerario completo en 60 segundos desde prompt en lenguaje natural.

**Stack**: `tonykipkemboi/trip_planner_agent` + `donghyun-chae/mcp-amadeus` + `DIDA-AI/Dida-hotel-MCP-CN` (todos MIT)

```python
from crewai import Agent, Task, Crew

flight_agent = Agent(
    role="Flight Specialist",
    goal="Find best flights for the trip",
    tools=amadeus_mcp_tools,  # from mcp-amadeus
    llm="claude-sonnet-5"
)

hotel_agent = Agent(
    role="Hotel Specialist",
    goal="Find best hotels matching budget and preferences",
    tools=dida_mcp_tools,  # from Dida-hotel-MCP-CN (2M+ hotels)
    llm="claude-sonnet-5"
)

itinerary_agent = Agent(
    role="Itinerary Planner",
    goal="Compose a complete, temporally consistent day-by-day itinerary",
    llm="claude-sonnet-5"
)

crew = Crew(agents=[flight_agent, hotel_agent, itinerary_agent], tasks=[...])
result = crew.kickoff(inputs={"destination": "Buenos Aires", "days": 5, "budget": 2000})
```

**Tiempo estimado**: 1 sprint (2 semanas) para POC funcional.

---

## P2 — Corporate Travel Agent con policy compliance (TMC pattern)

**Objetivo**: agente de viajes corporativo con aprobación, policy check y expense tracking.

**Stack**: `jongalloway/travel-booking-agents` (MIT) + `donghyun-chae/mcp-amadeus` (MIT)

```python
from crewai import Agent, Task, Crew, Process

# 5 agentes: Research → PolicyCheck → BudgetApproval → Optimizer → BookingCoordinator
research_agent = Agent(role="Travel Researcher", ...)
policy_agent = Agent(role="Policy Compliance Officer", ...)
budget_agent = Agent(role="Budget Approval Manager", ...)  # HITL para >$3000
optimizer_agent = Agent(role="Itinerary Optimizer", ...)
coordinator_agent = Agent(role="Booking Coordinator", ...)

tasks = [
    Task(description="Find flight and hotel options for {trip_request}", agent=research_agent),
    Task(description="Validate options against corporate travel policy", agent=policy_agent),
    Task(description="Check against department budget allocation", agent=budget_agent),
    Task(description="Optimize itinerary for cost and convenience", agent=optimizer_agent),
    Task(description="Confirm and finalize booking, send confirmation", agent=coordinator_agent),
]

crew = Crew(agents=[...], tasks=tasks, process=Process.sequential)
```

**Casos de uso**: TMCs, empresas con 50+ viajeros/mes, aerolíneas con segmento corporate.

---

## P3 — WhatsApp Travel Agent para LATAM (booking conversacional)

**Objetivo**: agente de viajes via WhatsApp con pago Pix/OXXO/PSE.

**Stack**: WhatsApp Business API + `naakaarafr/AI-Travel-Agent-Advanced` (MIT) + `mcp-amadeus` + `Dida-hotel-MCP-CN`

```python
from fastapi import FastAPI, Request
from crewai import Crew

app = FastAPI()

@app.post("/webhook/whatsapp")
async def handle_whatsapp(request: Request):
    data = await request.json()
    message = data["entry"][0]["changes"][0]["value"]["messages"][0]
    user_text = message["text"]["body"]
    phone_number = message["from"]
    lang = detect_language(user_text)  # ES/PT
    
    result = travel_crew.kickoff(inputs={
        "query": user_text,
        "lang": lang,
        "payment_method": PAYMENT_METHODS.get(phone_number[:3], "card")
    })
    
    await send_whatsapp_message(phone_number, result.raw, lang)
    return {"status": "ok"}

PAYMENT_METHODS = {
    "+55": "pix",   # Brasil
    "+52": "oxxo",  # México
    "+57": "pse",   # Colombia
    "+51": "yape",  # Perú
}
```

---

## P4 — Hotel AI en QloApps (PMS open source + agente)

**Objetivo**: hotelero independiente con asistente AI para check-in, preguntas y upgrades.

**Stack**: `Qloapps/QloApps` (OSL-3.0, ~1.8k★) + FastMCP wrapper

```python
from mcp.server.fastmcp import FastMCP
import httpx

mcp = FastMCP("qloapps-hotel")
QLOAPPS_BASE = "http://your-hotel.com/api"

@mcp.tool()
async def check_availability(checkin: str, checkout: str, guests: int) -> dict:
    """Check room availability for dates."""
    async with httpx.AsyncClient() as c:
        resp = await c.get(f"{QLOAPPS_BASE}/rooms", params={
            "checkin": checkin, "checkout": checkout, "guests": guests
        })
        return resp.json()

@mcp.tool()
async def get_booking(pnr: str) -> dict:
    """Get reservation details by PNR."""
    async with httpx.AsyncClient() as c:
        resp = await c.get(f"{QLOAPPS_BASE}/bookings/{pnr}")
        return resp.json()

mcp.run(transport="http")  # Stateless (MCP RC 2026-07-28 compatible)
```

**Beneficio**: el hotelero no cambia PMS; el AI layer es un add-on de MCP tools encima.

---

## P5 — Itinerary Validator con Iti-Validator (guardrail de producción)

**Objetivo**: detectar y corregir itinerarios temporalmente imposibles antes de entregarlos.

**Stack**: AeroDataBox API + Iti-Validator logic (arXiv:2510.24719)

```python
import httpx
from datetime import timedelta

async def validate_itinerary(itinerary: list[dict]) -> tuple[bool, list[str]]:
    errors = []
    
    for i, segment in enumerate(itinerary[:-1]):
        next_seg = itinerary[i + 1]
        
        if segment["type"] == "flight":
            duration = await get_real_flight_duration(segment["from"], segment["to"])
            estimated_arrival = segment["departure"] + timedelta(minutes=duration)
            min_connection = timedelta(minutes=90 if is_international(segment) else 45)
            
            if estimated_arrival + min_connection > next_seg["departure"]:
                errors.append(
                    f"Segment {i}: connection impossible "
                    f"({segment['from']}→{segment['to']} → {next_seg['from']})"
                )
    
    return len(errors) == 0, errors

async def get_real_flight_duration(origin: str, dest: str) -> int:
    async with httpx.AsyncClient() as c:
        resp = await c.get(
            f"https://aerodatabox.p.rapidapi.com/flights/airports/icao/{origin}/{dest}",
            headers={"X-RapidAPI-Key": AERODATABOX_KEY}
        )
        return resp.json()["durationMin"]
```

---

## P6 — RAG de Travel Knowledge con OpenTravelData (OPTD)

**Objetivo**: base de conocimiento aérea + geográfica para que el agente responda sobre aeropuertos, IATA, conexiones.

**Stack**: `opentraveldata/opentraveldata` (LGPL) + LlamaIndex/pgvector + MCP tool

```python
import pandas as pd
from llama_index.core import VectorStoreIndex, Document

# Cargar 20K+ POR IATA
optd_df = pd.read_csv("optd_por_public.csv", sep="^")

documents = [
    Document(
        text=(
            f"Airport/City: {row.get('name', '')} ({row.get('iata_code', '')}). "
            f"Country: {row.get('country_code', '')}. "
            f"Timezone: {row.get('timezone', '')}. "
            f"Coords: {row.get('latitude', '')},{row.get('longitude', '')}."
        ),
        metadata={"iata": row.get("iata_code")}
    )
    for _, row in optd_df.iterrows()
    if pd.notna(row.get("iata_code"))
]

index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()

# El agente puede preguntar: "What is the timezone of EZE?"
```

---

## P7 — Travel Eval Pipeline (TripCraft + GroupTravelBench)

**Objetivo**: validar calidad de un agente de viajes antes de entregar al cliente.

**Stack**: `Soumyabrata2003/TripCraft` (MIT) + GroupTravelBench (arXiv:2605.25200)

```python
async def evaluate_travel_agent(agent_fn, benchmark="tripcraft"):
    if benchmark == "tripcraft":
        # 5 métricas: temporal_meal, attraction, spatial, ordering, persona
        test_cases = load_tripcraft_cases()
        results = []
        
        for case in test_cases:
            generated_plan = await agent_fn(case["query"])
            scores = evaluate_plan(generated_plan, case["ground_truth"])
            results.append(scores)
        
        avg = {m: sum(r[m] for r in results) / len(results)
               for m in ["temporal_meal", "attraction", "spatial", "ordering", "persona"]}
        
        # Quality gate: all metrics > 0.75 before go-live
        passed = all(v >= 0.75 for v in avg.values())
        return avg, passed
```

---

## P8 — MICE Agent (viajes grupales con conflict resolution)

**Objetivo**: planificación de viajes para grupos con preferencias conflictivas (incentivos, conferencias).

**Stack**: `kbhujbal/Multi-Agent-AI-Travel-Advisor` (MIT) + GroupTravelBench eval

```python
from crewai import Agent

preference_collector = Agent(
    role="Preference Elicitor",
    goal="Collect travel preferences from each group member via multi-turn dialogue",
    backstory="Expert facilitator who surfaces hidden constraints through targeted questions"
)

conflict_resolver = Agent(
    role="Group Conflict Resolver",
    goal="Find compromises or subgrouping strategies when preferences conflict",
    backstory="MICE coordinator who balances group fairness and utility",
    tools=[subgroup_optimizer_tool, utility_calculator_tool]
)

group_planner = Agent(
    role="Group Itinerary Planner",
    goal="Generate fair itinerary maximizing group utility",
    backstory="10+ years MICE specialist"
)
# Eval: GroupTravelBench fairness metric > 0.7 before client delivery
```

---

## P9 — MCP Travel Stack stateless (arquitectura Jul 2026)

**Objetivo**: MCP travel server listo para el RC 2026-07-28 (stateless).

**Stack**: FastMCP + `mcp-amadeus` + `Dida-hotel-MCP-CN` como referencia

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("travel-mcp-server")

@mcp.tool()
async def search_flights(origin: str, destination: str, date: str, passengers: int = 1) -> dict:
    """Search flights between two airports on a given date."""
    results = await amadeus_client.shopping.flight_offers_search.get(
        originLocationCode=origin,
        destinationLocationCode=destination,
        departureDate=date,
        adults=passengers
    )
    return {"flights": results.data[:5]}

@mcp.tool()
async def search_hotels(city: str, checkin: str, checkout: str, guests: int = 1) -> dict:
    """Search hotels in a city for given dates via Dida (2M+ properties)."""
    results = await dida_client.search_hotels(city=city, checkin=checkin,
                                               checkout=checkout, guests=guests)
    return {"hotels": results[:5]}

if __name__ == "__main__":
    mcp.run(transport="http")  # Stateless HTTP — no session IDs
```

---

## P10 — Full-Stack Travel AI para OTA (producción)

**Objetivo**: OTA completa con agente AI integrado — desde discovery hasta confirmación real.

```
Arquitectura de producción:

User (WhatsApp/Web/App)
    ↓
API Gateway (FastAPI)
    ↓
LLM Orchestrator (Claude claude-sonnet-5 via Anthropic API)
    ↓ MCP calls
Tools Layer:
  ├─ mcp-amadeus → Amadeus GDS (flights)
  ├─ Dida-hotel-MCP-CN → Dida (2M+ hotels)
  ├─ Travelport TripServices → GDS NDC + LCC
  └─ optd-rag-mcp → OpenTravelData (knowledge)
    ↓
Guardrail: Iti-Validator (temporal consistency check)
    ↓
Human-in-the-loop Gate (>$500 USD: approval required)
    ↓
Booking Execution (Travelport TripServices — confirmed status guaranteed)
    ↓
Confirmation → WhatsApp/Email/PNR
```

**Pagos LATAM**: Brasil=Pix, México=OXXO Pay/SPEI, Colombia=PSE, Perú=Yape/Plin

**Quality gate**: TripCraft score > 0.75 en las 5 métricas antes de go-live.

**Eval pre-producción**: TripCraft (individual) + GroupTravelBench (MICE) + TravelEval (multi-constraint)
