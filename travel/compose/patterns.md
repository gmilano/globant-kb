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

**Stack**:
- `tonykipkemboi/trip_planner_agent` (MIT) — scaffolding base
- `donghyun-chae/mcp-amadeus` (MIT) — vuelos en tiempo real
- `DIDA-AI/Dida-hotel-MCP-CN` (MIT) — hoteles 2M+ propiedades

```python
# pyproject.toml
# crewai>=0.105, anthropic>=0.30, mcp>=1.0

from crewai import Agent, Task, Crew
from mcp import ClientSession, StdioServerParameters
import asyncio

# MCP tools desde mcp-amadeus y Dida MCP
async def get_mcp_tools():
    amadeus_params = StdioServerParameters(command="python", args=["amadeus_mcp_server.py"])
    dida_params = StdioServerParameters(command="python", args=["dida_mcp_server.py"])
    # ... setup sessions, return tools list

flight_agent = Agent(
    role="Flight Specialist",
    goal="Find best flights for the trip",
    backstory="Expert in flight search and pricing using Amadeus GDS",
    tools=amadeus_mcp_tools,
    llm="claude-sonnet-5"
)

hotel_agent = Agent(
    role="Hotel Specialist",
    goal="Find best hotels matching budget and preferences",
    backstory="Expert in hotel search with access to 2M+ properties via Dida",
    tools=dida_mcp_tools,
    llm="claude-sonnet-5"
)

itinerary_agent = Agent(
    role="Itinerary Planner",
    goal="Compose a complete, temporally consistent day-by-day itinerary",
    backstory="Travel expert that synthesizes flights, hotels, and activities into coherent plans",
    llm="claude-sonnet-5"
)

crew = Crew(agents=[flight_agent, hotel_agent, itinerary_agent], tasks=[...])
result = crew.kickoff(inputs={"destination": "Buenos Aires", "days": 5, "budget": 2000})
```

**Tiempo estimado**: 1 sprint (2 semanas) para POC funcional.

---

## P2 — Corporate Travel Agent con policy compliance (TMC pattern)

**Objetivo**: agente de viajes corporativo con aprobación, policy check y expense tracking.

**Stack**:
- `jongalloway/travel-booking-agents` (MIT) — pipeline completo
- `donghyun-chae/mcp-amadeus` (MIT) — inventario flights
- Custom policy MCP tool (reglas corporativas del cliente)

```python
# Pattern: Research → PolicyCheck → BudgetApproval → Optimizer → BookingCoordinator

from crewai import Agent, Task, Crew, Process

# 5 agentes según jongalloway/travel-booking-agents
research_agent = Agent(role="Travel Researcher", ...)
policy_agent = Agent(role="Policy Compliance Officer", ...)
budget_agent = Agent(role="Budget Approval Manager", ...)
optimizer_agent = Agent(role="Itinerary Optimizer", ...)
coordinator_agent = Agent(role="Booking Coordinator", ...)

# Tasks en secuencia
tasks = [
    Task(description="Find flight and hotel options for {trip_request}", agent=research_agent),
    Task(description="Validate options against corporate travel policy", agent=policy_agent),
    Task(description="Check against department budget allocation", agent=budget_agent),
    Task(description="Optimize itinerary for cost and convenience", agent=optimizer_agent),
    Task(description="Confirm and finalize booking, send confirmation email", agent=coordinator_agent),
]

crew = Crew(agents=[...], tasks=tasks, process=Process.sequential, verbose=True)
# Human-in-the-loop en budget_agent para aprobaciones >$3000
```

**Casos de uso**: TMCs, empresas con 50+ viajeros/mes, aerolíneas con segmento corporate.

---

## P3 — WhatsApp Travel Agent para LATAM (booking conversacional)

**Objetivo**: agente de viajes via WhatsApp con pago Pix/OXXO/PSE.

**Stack**:
- WhatsApp Business API (Meta)
- `naakaarafr/AI-Travel-Agent-Advanced` (MIT) — orquestación multi-agente
- `donghyun-chae/mcp-amadeus` (MIT) — vuelos
- `DIDA-AI/Dida-hotel-MCP-CN` (MIT) — hoteles
- Payment: Pix API (Brasil) / OXXO API (México) / PSE (Colombia)

```python
# Webhook WhatsApp → FastAPI → CrewAI agent → respuesta
from fastapi import FastAPI, Request
from crewai import Crew
import httpx

app = FastAPI()

@app.post("/webhook/whatsapp")
async def handle_whatsapp(request: Request):
    data = await request.json()
    message = data["entry"][0]["changes"][0]["value"]["messages"][0]
    user_text = message["text"]["body"]
    phone_number = message["from"]
    
    # Detectar idioma (ES/PT) y contexto
    lang = detect_language(user_text)
    
    # Ejecutar agente de viajes
    result = travel_crew.kickoff(inputs={
        "query": user_text,
        "lang": lang,
        "payment_country": detect_country_by_phone(phone_number)
    })
    
    # Enviar respuesta via WhatsApp API
    await send_whatsapp_message(phone_number, result.raw, lang)
    
    return {"status": "ok"}

# Payment routing por país
PAYMENT_METHODS = {
    "+55": "pix",    # Brasil
    "+52": "oxxo",   # México
    "+57": "pse",    # Colombia
    "+51": "yape",   # Perú
}
```

**Locales soportados**: ES (MX/CO/PE/CL/AR), PT-BR.

---

## P4 — Hotel AI en QloApps (PMS open source + agente)

**Objetivo**: hotelero independiente con asistente AI para check-in, preguntas y upgrades.

**Stack**:
- `Qloapps/QloApps` (OSL-3.0) — PMS base (PHP/MySQL)
- FastMCP wrapper sobre QloApps REST API
- LangChain agent con herramientas: check_availability, get_booking, upsell_upgrade

```python
# MCP server wrapper sobre QloApps API
from mcp.server import Server
from mcp.server.models import InitializationOptions
import httpx

QLOAPPS_BASE = "http://your-qloapps-install.com/api"

@server.list_tools()
async def list_tools():
    return [
        Tool(name="check_availability", description="Check room availability for dates"),
        Tool(name="get_booking_details", description="Get details of a reservation by PNR"),
        Tool(name="propose_upgrade", description="Check if room upgrades are available"),
        Tool(name="add_amenity", description="Add amenity to existing booking"),
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict):
    if name == "check_availability":
        async with httpx.AsyncClient() as c:
            resp = await c.get(f"{QLOAPPS_BASE}/rooms", params={
                "checkin": arguments["checkin"],
                "checkout": arguments["checkout"],
                "guests": arguments["guests"]
            })
            return [TextContent(text=resp.json())]
```

**Beneficio**: el hotelero no cambia PMS; el AI layer es un add-on de MCP tools encima.

---

## P5 — Itinerary Validator con Iti-Validator (guardrail de producción)

**Objetivo**: detectar y corregir itinerarios temporalmente imposibles antes de entregarlos al usuario.

**Stack**:
- Cualquier LLM generador de itinerarios
- AeroDataBox API (flight durations real-time)
- Iti-Validator logic (arXiv:2510.24719)

```python
# Guardrail de itinerario - implementación del patrón Iti-Validator
import httpx
from datetime import datetime, timedelta

async def validate_itinerary(itinerary: list[dict]) -> tuple[bool, list[str]]:
    """
    Valida que un itinerario sea temporalmente consistente.
    itinerary: lista de segmentos con {from, to, departure, arrival, type}
    """
    errors = []
    
    for i, segment in enumerate(itinerary[:-1]):
        next_seg = itinerary[i + 1]
        
        if segment["type"] == "flight":
            # Verificar duración real del vuelo via AeroDataBox
            duration = await get_real_flight_duration(
                segment["from"], segment["to"],
                segment["departure"]
            )
            estimated_arrival = segment["departure"] + timedelta(minutes=duration)
            
            # Margen de conexión mínimo: 90 min para internacionales
            min_connection = timedelta(minutes=90 if is_international(segment) else 45)
            
            if estimated_arrival + min_connection > next_seg["departure"]:
                errors.append(
                    f"Segment {i}: insufficient connection time "
                    f"({segment['from']}→{segment['to']} → {next_seg['from']})"
                )
    
    return len(errors) == 0, errors

async def get_real_flight_duration(origin: str, dest: str, date: datetime) -> int:
    """Devuelve duración en minutos via AeroDataBox API."""
    async with httpx.AsyncClient() as c:
        resp = await c.get(
            f"https://aerodatabox.p.rapidapi.com/flights/airports/icao/{origin}",
            params={"withAircraftImage": False},
            headers={"X-RapidAPI-Key": AERODATABOX_KEY}
        )
        # ... parse response
        return resp.json()["durationMin"]
```

**Integrar**: añadir como step entre generación y entrega en cualquier pipeline de itinerarios.

---

## P6 — RAG de Travel Knowledge con OpenTravelData (OPTD)

**Objetivo**: base de conocimiento geográfica + aérea para que el agente responda preguntas sobre aeropuertos, códigos IATA, conexiones posibles.

**Stack**:
- `opentraveldata/opentraveldata` (LGPL) — CSV de 20K+ POR IATA
- LlamaIndex / ChromaDB / pgvector
- FastAPI MCP server

```python
# Ingest OPTD data into vector store
import pandas as pd
from llama_index.core import VectorStoreIndex, Document

# Cargar dataset OPTD
optd_df = pd.read_csv("optd_por_public.csv", sep="^")

# Crear documentos por aeropuerto/ciudad
documents = []
for _, row in optd_df.iterrows():
    if pd.notna(row.get("iata_code")):
        doc_text = (
            f"Airport/City: {row.get('name', '')} ({row.get('iata_code', '')}). "
            f"Country: {row.get('country_code', '')}. "
            f"Type: {row.get('location_type', '')}. "
            f"Timezone: {row.get('timezone', '')}. "
            f"Coordinates: {row.get('latitude', '')}, {row.get('longitude', '')}."
        )
        documents.append(Document(text=doc_text, metadata={"iata": row.get("iata_code")}))

index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()

# Exponer como MCP tool
@server.call_tool()
async def call_tool(name: str, arguments: dict):
    if name == "lookup_airport":
        result = query_engine.query(arguments["query"])
        return [TextContent(text=str(result))]
```

---

## P7 — Travel Eval Pipeline (TripCraft + GroupTravelBench)

**Objetivo**: validar calidad de un agente de viajes antes de entregar al cliente.

**Stack**:
- `Soumyabrata2003/TripCraft` (MIT) — benchmark spatio-temporal individual
- GroupTravelBench (arXiv:2605.25200) — benchmark multi-persona

```python
# Eval runner para agente de viajes
import json
from pathlib import Path

async def evaluate_travel_agent(agent_fn, benchmark="tripcraft"):
    if benchmark == "tripcraft":
        test_cases = load_tripcraft_cases()  # 5 métricas: temporal_meal, attraction, spatial, ordering, persona
        results = []
        
        for case in test_cases:
            generated_plan = await agent_fn(case["query"])
            scores = evaluate_plan(generated_plan, case["ground_truth"])
            results.append(scores)
        
        # Report
        avg_scores = {metric: sum(r[metric] for r in results) / len(results) 
                      for metric in ["temporal_meal", "attraction", "spatial", "ordering", "persona"]}
        print(f"TripCraft scores: {json.dumps(avg_scores, indent=2)}")
        return avg_scores
    
    elif benchmark == "group_travel":
        # GroupTravelBench: 650 tareas x 22 arquetipos
        # Métricas: preference_coverage, group_fairness, feasibility
        ...
```

---

## P8 — MICE Agent (viajes grupales con conflict resolution)

**Objetivo**: planificación de viajes para grupos con preferencias conflictivas (incentivos, conferencias).

**Stack**:
- `kbhujbal/Multi-Agent-AI-Travel-Advisor` (MIT) — base multi-agente
- Custom conflict resolution agent
- GroupTravelBench como eval (arXiv:2605.25200)

```python
# Conflict resolution agent para grupos
from crewai import Agent

preference_collector = Agent(
    role="Preference Elicitor",
    goal="Collect travel preferences from each group member via multi-turn dialogue",
    backstory="Expert facilitator who asks targeted questions to surface hidden constraints"
)

conflict_resolver = Agent(
    role="Group Conflict Resolver",
    goal="Find compromises or subgrouping strategies when preferences conflict",
    backstory="Experienced group travel coordinator who balances fairness and utility",
    tools=[
        subgroup_optimizer_tool,  # Divide grupo cuando los conflictos son irreconciliables
        utility_calculator_tool,   # Calcula utilidad agregada del grupo
    ]
)

group_planner = Agent(
    role="Group Itinerary Planner",
    goal="Generate a fair itinerary maximizing group utility while respecting constraints",
    backstory="MICE specialist with 10+ years organizing group travel"
)
```

---

## P9 — MCP Travel Stack stateless (arquitectura Jul 2026)

**Objetivo**: construir un MCP travel server listo para el RC 2026-07-28 (stateless).

**Stack**:
- FastMCP (Python) — framework stateless MCP
- `donghyun-chae/mcp-amadeus` + `DIDA-AI/Dida-hotel-MCP-CN` como referencia

```python
# Stateless MCP server para travel (compatible con RC 2026-07-28)
# Sin Mcp-Session-Id, sin initialize handshake, HTTP stateless

from mcp.server.fastmcp import FastMCP

mcp = FastMCP("travel-mcp-server")

@mcp.tool()
async def search_flights(origin: str, destination: str, date: str, passengers: int = 1) -> dict:
    """Search flights between two airports on a given date."""
    # Llamar Amadeus API - stateless, sin contexto de sesión
    results = await amadeus_client.shopping.flight_offers_search.get(
        originLocationCode=origin,
        destinationLocationCode=destination,
        departureDate=date,
        adults=passengers
    )
    return {"flights": results.data[:5]}  # Top 5

@mcp.tool()
async def search_hotels(city: str, checkin: str, checkout: str, guests: int = 1) -> dict:
    """Search hotels in a city for given dates."""
    # Llamar Dida API - stateless
    results = await dida_client.search_hotels(
        city=city, checkin=checkin, checkout=checkout, guests=guests
    )
    return {"hotels": results[:5]}

if __name__ == "__main__":
    mcp.run(transport="http")  # Stateless HTTP (RC 2026-07-28 compatible)
```

---

## P10 — Full-Stack Travel AI para OTA (producción)

**Objetivo**: OTA completa con agente AI integrado — desde discovery hasta confirmación real.

**Stack**:
- Travelport TripServices (REST + MCP) — booking execution
- `jongalloway/travel-booking-agents` (MIT) — orchestration pattern
- Iti-Validator (guardrail) — temporal consistency
- TripCraft (eval) — quality gate pre-release
- WhatsApp Business API — canal LATAM

```
Arquitectura de producción:

User (WhatsApp/Web/App)
    ↓
API Gateway (FastAPI)
    ↓
LLM Orchestrator (Claude claude-sonnet-5 via Anthropic API)
    ↓ calls
MCP Tools Layer:
  ├── mcp-amadeus → Amadeus GDS (flights)
  ├── Dida-hotel-MCP-CN → Dida (2M+ hotels)
  ├── travelport-tripservices → Travelport GDS (NDC + LCC)
  └── optd-rag-mcp → OpenTravelData (knowledge)
    ↓
Guardrail Layer:
  └── Iti-Validator (temporal + spatial consistency check)
    ↓
Human-in-the-loop Gate (>$500 USD: approval required)
    ↓
Booking Execution (Travelport TripServices API — confirmed status guaranteed)
    ↓
Confirmation → WhatsApp/Email/PNR
```

**Integración de pagos LATAM**:
- Brasil: Pix (instantáneo, 24/7)
- México: OXXO Pay o tarjeta SPEI
- Colombia: PSE
- Perú: Yape/Plin

**Eval pre-producción**: TripCraft score > 0.75 en las 5 métricas antes de go-live.
