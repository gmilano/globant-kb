# 🧩 Composition Patterns — Automotive AI

> Concrete recipes: which repos + agents + wiring. Updated: 2026-07-10 (v4)
> 13 patterns | Deal sizes $30k–$2M | Stacks: Python, TypeScript

---

## Architecture Base

```
[Open Source Vertical Platform]     ←— Odoo / Fleetbase / Eclipse SDV / OpenPilot
           ↓
[Vehicle Data Layer]                ←— KUKSA Databroker / OBD2 MCP / MCP-CAN / EMQX
           ↓
[AI Agent Orchestration]            ←— LangGraph / Eclipse LMOS / CrewAI
           ↓
[LLM Reasoning]                     ←— Claude Sonnet (cloud) or Haiku (edge/in-vehicle)
           ↓
[UI / Action Layer]                 ←— Dashboard / WhatsApp / Vehicle HMI / OTA update
```

---

## P1 — Smart Dealership Service Copilot
**Stack:** Odoo Fleet + OBD2 MCP + Claude Sonnet  
**Deal size:** $80k–$250k | **Timeline:** 4–6 weeks

**Problem:** Service advisors manually translate OBD fault codes into repair orders. Errors, delays, upsell misses.

**Solution:**
```python
# OBD2 MCP → Claude → Odoo work order
import anthropic
from mcp import ClientSession
import xmlrpc.client

client = anthropic.Anthropic()

# Step 1: Read vehicle via OBD2 MCP
async def get_vehicle_diagnosis(mcp_session: ClientSession, vin: str):
    dtcs = await mcp_session.call_tool("read_dtc_codes", {"connection": "obd2"})
    live_data = await mcp_session.call_tool("read_live_data", {
        "pids": ["ENGINE_COOLANT_TEMP", "RPM", "FUEL_PRESSURE", "O2_SENSORS"]
    })
    return {"dtcs": dtcs.content, "live": live_data.content, "vin": vin}

# Step 2: Claude interprets + recommends
def interpret_diagnosis(diagnosis: dict) -> dict:
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2048,
        system="""You are an expert automotive diagnostics advisor.
        Given OBD-II fault codes and live sensor data, provide:
        1. Plain-English explanation of each fault
        2. Root cause analysis (primary vs secondary faults)
        3. Prioritized repair recommendations with urgency level (critical/soon/monitor)
        4. Parts needed with estimated quantities
        5. Labor time estimate
        Return JSON with keys: explanation, root_cause, repairs[], parts[], labor_hours""",
        messages=[{"role": "user", "content": f"Vehicle data: {diagnosis}"}]
    )
    return json.loads(response.content[0].text)

# Step 3: Create Odoo work order automatically
def create_odoo_work_order(interpretation: dict, vehicle_id: int, odoo_url: str, db: str, uid: int, pwd: str):
    models = xmlrpc.client.ServerProxy(f"{odoo_url}/xmlrpc/2/object")
    # Create maintenance request
    order_id = models.execute_kw(db, uid, pwd, "fleet.vehicle.log.services", "create", [{
        "vehicle_id": vehicle_id,
        "description": interpretation["explanation"],
        "cost": estimate_cost(interpretation["parts"], interpretation["labor_hours"]),
        "note": "\n".join([f"• {r['repair']} [{r['urgency']}]" for r in interpretation["repairs"]])
    }])
    return order_id
```

**Components:**
- `petrpatek/obd2-mcp-server` — OBD data source
- `odoo/odoo` Fleet module — work order management
- Claude Sonnet — diagnosis interpretation
- React dashboard for service advisor

---

## P2 — Predictive Maintenance for Assembly Lines
**Stack:** predictive-maintenance-mcp + LangGraph + Claude + Odoo Manufacturing  
**Deal size:** $200k–$600k | **Timeline:** 6–10 weeks

**Problem:** $22,000/minute assembly-line downtime. Manual inspection misses early bearing failure signals.

**Solution:**
```python
from langgraph.graph import StateGraph, END
from typing import TypedDict

class MaintenanceState(TypedDict):
    asset_id: str
    vibration_data: dict
    fft_analysis: dict
    diagnosis: str
    action: str
    work_order_id: int | None

def build_maintenance_graph():
    graph = StateGraph(MaintenanceState)

    async def collect_vibration(state):
        # predictive-maintenance-mcp tool call
        fft = await mcp.call_tool("analyze_vibration_fft", {
            "asset_id": state["asset_id"],
            "duration_seconds": 10,
            "sampling_rate": 25600
        })
        envelope = await mcp.call_tool("analyze_envelope", {
            "signal": fft["raw_signal"],
            "shaft_frequency": fft["shaft_rpm"] / 60
        })
        return {**state, "fft_analysis": {"fft": fft, "envelope": envelope}}

    async def claude_diagnosis(state):
        response = client.messages.create(
            model="claude-sonnet-5",
            max_tokens=1024,
            system="You are an industrial maintenance expert. Analyze vibration FFT data to diagnose bearing faults, imbalance, misalignment, or resonance. Classify severity: OK / WATCH / SOON / CRITICAL. Return JSON.",
            messages=[{"role": "user", "content": f"Asset {state['asset_id']} FFT data: {state['fft_analysis']}"}]
        )
        result = json.loads(response.content[0].text)
        return {**state, "diagnosis": result["diagnosis"], "action": result["recommended_action"]}

    async def create_work_order(state):
        if state["action"] in ["SOON", "CRITICAL"]:
            wo_id = odoo.create_maintenance_request(
                name=f"Predictive Maintenance - {state['asset_id']}",
                description=state["diagnosis"],
                priority="2" if state["action"] == "CRITICAL" else "1"
            )
            return {**state, "work_order_id": wo_id}
        return state

    graph.add_node("collect", collect_vibration)
    graph.add_node("diagnose", claude_diagnosis)
    graph.add_node("create_order", create_work_order)
    graph.add_edge("collect", "diagnose")
    graph.add_edge("diagnose", "create_order")
    graph.add_edge("create_order", END)
    return graph.compile()
```

**Components:**
- `LGDiMaggio/predictive-maintenance-mcp` — vibration FFT analysis + ISO severity
- LangGraph — agent orchestration
- Claude Sonnet — diagnosis + action classification
- Odoo Manufacturing — work order creation
- PLC/IoT sensors via MQTT

---

## P3 — Eclipse SDV Vehicle App (OEM Integration)
**Stack:** Eclipse KUKSA + Velocitas + Claude Haiku (edge) + LMOS  
**Deal size:** $200k–$600k | **Timeline:** 5–8 weeks

**Problem:** OEM wants AI-powered vehicle app — cabin assistant that reads vehicle signals, adapts to driver, sends insights to cloud.

**Solution:**
```python
# Eclipse Velocitas Vehicle App with Claude Haiku
from sdv.vdb.client import VehicleDataBrokerClient
import asyncio

# Vehicle App that runs on Eclipse SDV stack
async def cabin_intelligence_app():
    vdb_client = VehicleDataBrokerClient()
    await vdb_client.connect()

    # Subscribe to VSS signals via KUKSA Databroker
    async for signal in vdb_client.subscribe([
        "Vehicle.Speed",
        "Vehicle.Cabin.Driver.HeartRate",          # if health sensors present
        "Vehicle.ADAS.ActiveAutonomyLevel",
        "Vehicle.Powertrain.FuelSystem.Level",
        "Vehicle.OBD.EngineLoad",
        "Vehicle.Exterior.AmbientAirTemperature"
    ]):
        state = {signal.path: signal.value for signal in signal.fields}

        # Only call LLM on meaningful state changes (edge filtering)
        if should_engage_ai(state):
            response = client.messages.create(
                model="claude-haiku-4-5-20251001",  # Haiku for edge latency
                max_tokens=256,
                system="""You are the vehicle cabin AI. Given vehicle state, determine if driver needs:
                - A proactive alert (fatigue, fuel, maintenance)
                - A helpful suggestion (route, charging stop, traffic)
                - Nothing (most common — return null)
                Respond with JSON: {action: "alert"|"suggest"|null, message: string|null}""",
                messages=[{"role": "user", "content": f"Vehicle state: {state}"}]
            )
            result = json.loads(response.content[0].text)

            if result["action"]:
                # Send to HMI via VSS actuator
                await vdb_client.set("Vehicle.Cabin.Infotainment.HMI.Notification",
                                      result["message"])
                # Sync to cloud via Eclipse LMOS
                await lmos_agent.publish("cabin_event", result)
```

**Components:**
- `eclipse-kuksa/kuksa-databroker` — VSS signal source
- `eclipse-velocitas/vehicle-app-python-sdk` — Vehicle App container
- `eclipse-lmos` — cloud multi-agent orchestration
- Claude Haiku — edge inference (low latency, low cost)
- Eclipse Leda — distro for target vehicle hardware

---

## P4 — Fleet Intelligence Platform
**Stack:** Fleetbase + LangGraph + Claude Sonnet + WhatsApp Business  
**Deal size:** $150k–$400k | **Timeline:** 6–8 weeks

**Problem:** LATAM logistics operators (Brazil, Mexico, Colombia) manage 50–500 vehicle fleets with manual dispatch and reactive maintenance.

**Solution:**
```python
# Fleetbase API → LangGraph agent → Claude → WhatsApp alerts
import httpx
from langgraph.graph import StateGraph

FLEETBASE_API = "https://api.fleetbase.io/v1"
HEADERS = {"Authorization": f"Bearer {FLEETBASE_KEY}"}

async def fetch_fleet_state():
    """Get all vehicles, orders, drivers from Fleetbase."""
    vehicles = httpx.get(f"{FLEETBASE_API}/fleets", headers=HEADERS).json()
    orders = httpx.get(f"{FLEETBASE_API}/orders?status=active", headers=HEADERS).json()
    return {"vehicles": vehicles["data"], "orders": orders["data"]}

async def fleet_intelligence_agent(state):
    """Claude analyzes fleet state and identifies issues."""
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2048,
        system="""You are a fleet operations intelligence agent. Analyze the fleet state and identify:
        1. Vehicles at risk of late delivery (ETA vs SLA)
        2. Drivers showing fatigue patterns (long shifts, many stops)
        3. Vehicles due for maintenance (based on km/days since last service)
        4. Route optimization opportunities
        Return JSON with arrays: alerts[], suggestions[], maintenance_alerts[]""",
        messages=[{"role": "user", "content": f"Current fleet state: {state}"}]
    )
    result = json.loads(response.content[0].text)

    # Send critical alerts via WhatsApp Business API
    for alert in result.get("alerts", []):
        if alert["severity"] == "critical":
            send_whatsapp(alert["driver_phone"],
                         f"🚨 Alerta: {alert['message']}")
    return result

# Fleetbase webhook → LangGraph → Claude → Action
async def handle_fleet_event(event: dict):
    graph = build_fleet_graph()
    state = await fetch_fleet_state()
    result = await graph.ainvoke({**state, "trigger": event})
    return result
```

**Components:**
- `fleetbase/fleetbase` — Fleet OS (self-hosted AGPL or cloud)
- LangGraph — agent state management
- Claude Sonnet — fleet analysis
- WhatsApp Business API — driver notifications (high adoption in LATAM)
- Traccar (GPS) — real-time positioning

---

## P5 — Connected Car MCP Service Layer
**Stack:** Tesla MCP + OBD2 MCP + MCP-CAN + Claude  
**Deal size:** $100k–$350k | **Timeline:** 4–6 weeks

**Problem:** OEM or fleet operator wants AI agents to interact with vehicles across the full stack (fleet cloud → diagnostic port → raw ECU).

**Solution:**
```python
# Multi-MCP automotive agent using all three vehicle MCP servers
from anthropic import Anthropic
import asyncio

client = Anthropic()

AUTOMOTIVE_TOOLS = [
    # Tesla Fleet API level
    {
        "name": "tesla_get_vehicle_state",
        "description": "Get Tesla vehicle state: charge, range, location, climate, lock status",
        "input_schema": {"type": "object", "properties": {"vehicle_id": {"type": "string"}}}
    },
    # OBD-II diagnostic level
    {
        "name": "obd2_read_dtc",
        "description": "Read Diagnostic Trouble Codes from vehicle via OBD-II port",
        "input_schema": {"type": "object", "properties": {"vehicle_id": {"type": "string"}}}
    },
    {
        "name": "obd2_live_data",
        "description": "Read live OBD-II sensor data: RPM, coolant temp, fuel pressure, O2 sensors",
        "input_schema": {"type": "object", "properties": {
            "vehicle_id": {"type": "string"},
            "pids": {"type": "array", "items": {"type": "string"}}
        }}
    },
    # CAN bus level
    {
        "name": "can_read_signal",
        "description": "Read raw ECU signal from vehicle CAN bus via DBC file decoding",
        "input_schema": {"type": "object", "properties": {
            "signal_name": {"type": "string"},
            "dbc_file": {"type": "string"}
        }}
    },
    {
        "name": "can_write_signal",
        "description": "Write command to vehicle ECU via CAN bus (requires authorization)",
        "input_schema": {"type": "object", "properties": {
            "signal_name": {"type": "string"},
            "value": {"type": "number"},
            "authorization_token": {"type": "string"}
        }}
    }
]

async def vehicle_ai_agent(user_request: str, vehicle_id: str):
    """Universal vehicle AI agent using full MCP stack."""
    messages = [{"role": "user", "content": f"Vehicle {vehicle_id}: {user_request}"}]

    while True:
        response = client.messages.create(
            model="claude-sonnet-5",
            max_tokens=4096,
            system="""You are a vehicle AI agent with access to full automotive MCP stack.
            You can read Tesla fleet data, OBD-II diagnostics, and CAN bus signals.
            Be precise about which level you're accessing and why.
            Prioritize non-destructive reads; only write CAN signals with explicit authorization.""",
            tools=AUTOMOTIVE_TOOLS,
            messages=messages
        )

        if response.stop_reason == "end_turn":
            break

        # Route tool calls to correct MCP server
        tool_results = []
        for block in response.content:
            if block.type == "tool_use":
                if block.name.startswith("tesla_"):
                    result = await tesla_mcp.call_tool(block.name, block.input)
                elif block.name.startswith("obd2_"):
                    result = await obd2_mcp.call_tool(block.name, block.input)
                elif block.name.startswith("can_"):
                    result = await can_mcp.call_tool(block.name, block.input)
                tool_results.append({"type": "tool_result", "tool_use_id": block.id, "content": str(result)})

        messages.extend([{"role": "assistant", "content": response.content},
                         {"role": "user", "content": tool_results}])

    return response.content[-1].text
```

**Components:**
- `scald/tesla-mcp` — Tesla Fleet API MCP
- `petrpatek/obd2-mcp-server` — OBD-II MCP
- `farzadnadiri/MCP-CAN` — CAN bus MCP
- Claude Sonnet — reasoning + routing
- FastAPI + React dashboard

---

## P6 — Autonomous Vehicle Evaluation with AgentDrive
**Stack:** AgentDrive + CARLA + LangGraph + Claude  
**Deal size:** $50k–$200k | **Timeline:** 3–5 weeks

**Problem:** Client building AV features needs a systematic LLM evaluation harness before deploying to real vehicles.

**Solution:**
```python
# AgentDrive + CARLA evaluation pipeline
from langgraph.graph import StateGraph
import subprocess

async def run_av_evaluation(agent_under_test, scenario_set: str = "urban_mixed"):
    """Run LLM AV agent against AgentDrive benchmark scenarios."""
    # Load 300k scenario subset from AgentDrive
    scenarios = load_agentdrive_scenarios(
        scenario_type="urban",
        difficulty=["medium", "hard"],
        count=1000  # start with 1k; full eval = 300k
    )

    results = []
    for scenario in scenarios:
        # Launch CARLA with scenario
        carla_proc = subprocess.Popen([
            "python", "carla_runner.py",
            "--scenario", json.dumps(scenario),
            "--agent", agent_under_test
        ])

        # Evaluate via AgentDrive MCQ
        mcq_question = scenario["evaluation_question"]
        agent_answer = await agent_under_test.answer(mcq_question, scenario["context"])
        correct = agent_answer == scenario["ground_truth"]

        results.append({
            "scenario_id": scenario["id"],
            "dimensions": scenario["dimensions"],
            "correct": correct,
            "agent_reasoning": agent_answer
        })

    # Claude analyzes failure patterns
    summary = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2048,
        system="Analyze autonomous driving agent evaluation results and identify failure patterns by dimension (scenario type, difficulty, traffic density, etc.). Provide specific improvement recommendations.",
        messages=[{"role": "user", "content": f"Results: {json.dumps(results[:100])}"}]
    )
    return {"pass_rate": sum(r["correct"] for r in results) / len(results), "analysis": summary.content[0].text}
```

**Components:**
- `maferrag/AgentDrive` — 300k AV scenarios + MCQ eval
- `carla-simulator/carla` — simulation environment
- LangGraph — evaluation pipeline orchestration
- Claude Sonnet — failure pattern analysis
- Python reporting + visualization

---

## P7 — Urban Traffic Intelligence (TrafficClaw Pattern)
**Stack:** TrafficClaw + LangGraph + Claude Sonnet + city traffic APIs  
**Deal size:** $150k–$500k | **Timeline:** 8–12 weeks

**Problem:** City municipality wants AI-driven traffic signal control that reduces congestion, adapts to incidents, and coordinates across intersections.

**Solution:**
```python
# TrafficClaw-inspired urban traffic control agent
# Based on arXiv:2604.17456

class TrafficControlState(TypedDict):
    intersection_id: str
    traffic_counts: dict          # {direction: vehicle_count}
    incident_reports: list        # active incidents nearby
    pedestrian_requests: list     # waiting pedestrians
    neighboring_signals: dict     # phase of adjacent intersections
    memory: dict                  # persistent spatiotemporal history
    action: dict                  # signal phase decision

async def traffic_perception_node(state: TrafficControlState):
    """Collect real-time traffic data from city APIs."""
    counts = await city_api.get_traffic_counts(state["intersection_id"])
    incidents = await city_api.get_incidents(radius_km=0.5)
    pedestrians = await city_api.get_pedestrian_requests(state["intersection_id"])
    neighbors = await city_api.get_signal_phases(radius_intersections=3)

    # Update persistent memory (TrafficClaw key insight: memory enables long-horizon adaptation)
    updated_memory = update_spatiotemporal_memory(
        state["memory"],
        new_observation={"counts": counts, "time": time.time()}
    )
    return {**state, "traffic_counts": counts, "incident_reports": incidents,
            "pedestrian_requests": pedestrians, "neighboring_signals": neighbors,
            "memory": updated_memory}

async def llm_traffic_planning(state: TrafficControlState):
    """Claude plans optimal signal phase using TrafficClaw reasoning."""
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        system="""You are an urban traffic signal control agent with spatiotemporal memory.
        Optimize signal phases to minimize total vehicle delay while ensuring pedestrian safety
        and coordinating with neighboring intersections.

        Consider:
        1. Current traffic volumes per direction
        2. Active incidents that may increase flow on alternative routes
        3. Neighboring signal phases (avoid creating stop-wave propagation)
        4. Historical patterns from memory
        5. Pedestrian waiting time (max 90 seconds)

        Return JSON: {green_direction: "NS"|"EW", duration_seconds: int, reason: string}""",
        messages=[{"role": "user", "content": f"""
        Intersection: {state['intersection_id']}
        Traffic counts: {state['traffic_counts']}
        Incidents: {state['incident_reports']}
        Pedestrian requests: {state['pedestrian_requests']}
        Neighboring signal phases: {state['neighboring_signals']}
        Recent history (last 30min): {state['memory'].get('recent', [])}
        """}]
    )
    action = json.loads(response.content[0].text)
    return {**state, "action": action}

async def execute_signal_action(state: TrafficControlState):
    """Send signal phase command to traffic controller hardware."""
    await city_api.set_signal_phase(
        intersection_id=state["intersection_id"],
        phase=state["action"]["green_direction"],
        duration=state["action"]["duration_seconds"]
    )
    return state

# Build and run graph
graph = StateGraph(TrafficControlState)
graph.add_node("perceive", traffic_perception_node)
graph.add_node("plan", llm_traffic_planning)
graph.add_node("execute", execute_signal_action)
graph.add_edge("perceive", "plan")
graph.add_edge("plan", "execute")
graph.add_edge("execute", "perceive")  # continuous loop
traffic_controller = graph.compile()
```

**Components:**
- TrafficClaw approach (arXiv:2604.17456) — persistent memory + agentic RL design
- LangGraph — stateful agent graph with continuous loop
- Claude Sonnet — traffic reasoning + phase planning
- City traffic management API (Siemens / Kapsch / SCATS / SCOOT)
- PostgreSQL — spatiotemporal memory store

---

## P8 — EV Fleet Charging Optimizer
**Stack:** Fleetbase + LangGraph + Claude + EV charging APIs  
**Deal size:** $80k–$250k | **Timeline:** 4–6 weeks

**Problem:** EV fleet (Brazil BYD expansion, Colombia electric buses) needs intelligent charging scheduling to minimize costs, avoid grid peaks, and maximize vehicle availability.

**Solution:**
```python
async def ev_charging_optimizer(fleet_state: dict, energy_prices: dict):
    """Optimize EV charging schedule across fleet using Claude + LangGraph."""
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2048,
        system="""You are an EV fleet charging optimizer. Given:
        - Fleet vehicles with current battery levels and next dispatch schedules
        - Energy price forecast (hourly, next 24h)
        - Charger availability (max simultaneous connections per depot)
        - Grid demand response windows

        Optimize: minimize energy cost while ensuring all vehicles are charged for next dispatch.
        Constraints: no vehicle below 20% SoC, respect charger capacity limits.
        Return JSON: {schedule: [{vehicle_id, start_time, end_time, target_soc, charger_id}]}""",
        messages=[{"role": "user", "content": f"Fleet: {fleet_state}, Prices: {energy_prices}"}]
    )
    schedule = json.loads(response.content[0].text)

    # Push schedule to Fleetbase + charger management
    for entry in schedule["schedule"]:
        await fleetbase.update_vehicle_schedule(entry["vehicle_id"], entry)
        await charger_api.reserve_charger(entry["charger_id"], entry["start_time"], entry["end_time"])

    return schedule
```

**Components:**
- `fleetbase/fleetbase` — Fleet OS with vehicle + schedule data
- Claude Sonnet — multi-constraint optimization
- Energy/grid pricing API (ANEEL in Brazil, utility providers)
- Charger management API (OCPP-compatible)
- WhatsApp alerts to drivers (schedule notifications)

---

## P9 — Intelligent Cockpit Assistant (Cerence CaLLM Alternative)
**Stack:** OpenPilot + Claude Haiku + Whisper + TTS  
**Deal size:** $150k–$500k | **Timeline:** 8–12 weeks

**Problem:** OEM or Tier-1 wants an open-source in-vehicle assistant that competes with Cerence CaLLM — without vendor lock-in.

**Solution:**
```python
# Open-source vehicle voice assistant
# OpenPilot perception data + Claude Haiku for assistant logic

import whisper
import anthropic
from gtts import gTTS  # or ElevenLabs for higher quality

asr_model = whisper.load_model("small")  # runs on car hardware
client = anthropic.Anthropic()

async def vehicle_assistant_turn(audio_input: bytes, vehicle_signals: dict) -> bytes:
    # 1. Speech-to-text (local Whisper)
    transcription = asr_model.transcribe(audio_input)
    user_text = transcription["text"]

    # 2. Route to Claude Haiku with vehicle context
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=256,
        system=f"""You are the vehicle's AI assistant. Current state:
        Speed: {vehicle_signals.get('Vehicle.Speed', 'unknown')} km/h
        Fuel: {vehicle_signals.get('Vehicle.Powertrain.FuelSystem.Level', 'unknown')}%
        ADAS: {vehicle_signals.get('Vehicle.ADAS.ActiveAutonomyLevel', 'unknown')}
        Ambient temp: {vehicle_signals.get('Vehicle.Exterior.AmbientAirTemperature', 'unknown')}°C

        Respond concisely (max 2 sentences). If speed>80 km/h, avoid complex tasks.
        If ADAS is active, confirm it before driver takes action.""",
        messages=[{"role": "user", "content": user_text}]
    )
    assistant_text = response.content[0].text

    # 3. Text-to-speech (local or cloud)
    tts = gTTS(text=assistant_text, lang="pt" if brazil_market else "es")
    return tts_to_bytes(tts)
```

**Components:**
- `commaai/openpilot` — ADAS perception + vehicle state
- `eclipse-kuksa/kuksa-databroker` — vehicle signals
- `openai/whisper` — local STT (MIT, no cloud dependency)
- Claude Haiku — low-latency assistant reasoning
- gTTS / ElevenLabs — TTS output
- Runs on comma 3X hardware or automotive-grade SoC

---

## P10 — AI-Powered Automotive OEM CRM
**Stack:** Odoo CRM + Claude + WhatsApp + OBD data  
**Deal size:** $100k–$350k | **Timeline:** 6–8 weeks

**Problem:** Dealership network (50+ locations) loses service revenue because vehicles reach customers 30+ days before proactive outreach. Manual CRM processes miss service windows.

**Solution:**
```python
async def proactive_service_outreach_agent():
    """Daily agent that identifies vehicles due for service and sends personalized outreach."""
    # Get all vehicles from Odoo Fleet
    vehicles = odoo.search_read("fleet.vehicle", domain=[("state_id.name", "=", "Active")],
                                 fields=["name", "partner_id", "last_service_date", "current_mileage"])

    for vehicle in vehicles:
        # Determine if service due
        days_since_service = (today - vehicle["last_service_date"]).days
        if days_since_service > 150 or vehicle["current_mileage"] > vehicle["next_service_km"]:

            # Personalize message with Claude
            response = client.messages.create(
                model="claude-haiku-4-5-20251001",
                max_tokens=200,
                system="Write a friendly WhatsApp message (max 3 sentences) in Brazilian Portuguese reminding a customer their vehicle is due for service. Be warm, not pushy. Include the specific service type.",
                messages=[{"role": "user", "content": f"Vehicle: {vehicle['name']}, Days since service: {days_since_service}, Customer: {vehicle['partner_id'][1]}"}]
            )

            # Send via WhatsApp Business API
            send_whatsapp(vehicle["partner_phone"], response.content[0].text)

            # Log in Odoo CRM
            odoo.create("crm.lead", {
                "name": f"Service Due - {vehicle['name']}",
                "partner_id": vehicle["partner_id"][0],
                "tag_ids": [service_outreach_tag_id]
            })
```

**Components:**
- Odoo CRM + Fleet modules
- Claude Haiku — personalized message generation
- WhatsApp Business API — high-open-rate channel (Brazil: 99% WhatsApp penetration)
- Scheduled LangGraph agent — daily batch

---

## P11 — Smart Factory Agentic Maintenance (IBM AssetOpsBench Pattern)
**Stack:** IBM AssetOpsBench + Claude + Odoo Manufacturing  
**Deal size:** $200k–$700k | **Timeline:** 8–14 weeks

**Problem:** Automotive assembly plant (Stellantis, VW, Toyota in LATAM) needs to reduce unplanned downtime using a multi-agent maintenance system.

**Architecture:**
```
Assembly Line Sensors (IoT / MQTT)
           ↓
AgentHive Orchestrator (IBM AssetOpsBench)
    ↙    ↓    ↓    ↓    ↘
 IoT   FMSR  TSFM  Work   Knowledge
Agent  Agent Agent  Order  Agent
           ↓
     Claude Sonnet
     (root cause + recommendation)
           ↓
   Odoo Manufacturing
   (work order + parts request)
```

**IBM AssetOpsBench agents (all MIT):**
- **IoT Agent**: reads sensor streams, detects anomalies
- **FMSR Agent**: Failure Mode, Symptom, Root-cause analysis
- **TSFM Agent**: Time Series Foundation Model for pattern detection
- **Work Order Agent**: creates + assigns maintenance tasks
- **Knowledge Agent**: queries maintenance manuals + parts catalog

**Investment:** $200k–$700k | **Timeline:** 8–14 weeks | **ROI:** $22k/min downtime prevented

---

## P12 — LLM Evaluation for AV Teams (Claude vs GPT-5 vs Gemini)
**Stack:** AgentDrive + CARLA + Claude + reporting  
**Deal size:** $30k–$100k | **Timeline:** 2–3 weeks

**Problem:** Client evaluating which LLM to use in their AV decision-making pipeline. Need systematic benchmark, not vibes.

**Solution:** Run all three against AgentDrive MCQ benchmark (100k questions across 7 AV dimensions). Generate comparative analysis with Claude. Key findings: proprietary models dominate contextual/policy reasoning; open models (Qwen3, Llama-4) close the gap on structured + physics reasoning.

**Deliverable:** Benchmark report + recommendation + AV-specific fine-tuning data (AgentDrive 300k scenarios).

---

## P13 — OBD2 Compliance Agent for LATAM Markets
**Stack:** OBD2 MCP + Claude + local regulatory APIs + WhatsApp  
**Deal size:** $30k–$80k | **Timeline:** 2–4 weeks

**Problem:** Vehicles in Brazil (Denatran) and Argentina (RUPE) need emissions compliance verification. Manual process for fleet operators.

**Solution:**
```python
async def latam_compliance_agent(vehicle_id: str, country: str):
    """Check vehicle OBD compliance and generate regulatory report."""
    # Read OBD data
    dtcs = await obd2_mcp.call_tool("read_dtc_codes", {"vehicle_id": vehicle_id})
    readiness = await obd2_mcp.call_tool("read_readiness_monitors", {"vehicle_id": vehicle_id})

    # Claude generates compliance report
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1024,
        system=f"""You are a vehicle emissions compliance specialist for {country}.
        Analyze OBD readiness monitors and DTCs to determine:
        1. Is the vehicle likely to pass emissions inspection?
        2. Which monitors are incomplete (preventing inspection)?
        3. Which faults need repair before inspection?
        Generate a compliance report in Spanish/Portuguese appropriate for {country}.""",
        messages=[{"role": "user", "content": f"DTCs: {dtcs}, Readiness monitors: {readiness}"}]
    )
    return response.content[0].text
```

**Components:**
- `petrpatek/obd2-mcp-server` — OBD diagnostics
- Claude Haiku — compliance analysis
- DETRAN/Denatran API (Brazil) or RUPE (Argentina) — official registration lookup
- WhatsApp — fleet operator notifications

---

## Quick-Start Decision Matrix

| Client Scenario | Start Here | Stack | Time | Budget |
|----------------|------------|-------|------|--------|
| Dealership wants AI service advisor | P1 | Odoo + OBD2 MCP + Claude | 4–6w | $80k–$250k |
| Manufacturing plant predictive maintenance | P2 | predictive-maintenance-mcp + LangGraph | 6–10w | $200k–$600k |
| OEM wants SDV Vehicle App | P3 | Eclipse KUKSA + Velocitas + Claude Haiku | 5–8w | $200k–$600k |
| LATAM fleet operator (logistics) | P4 | Fleetbase + LangGraph + WhatsApp | 6–8w | $150k–$400k |
| Fleet wants full vehicle MCP layer | P5 | Tesla/OBD2/CAN MCP + Claude | 4–6w | $100k–$350k |
| AV team needs LLM evaluation | P6 / P12 | AgentDrive + CARLA | 2–5w | $30k–$200k |
| Smart city traffic contract | P7 | TrafficClaw + LangGraph + Claude | 8–12w | $150k–$500k |
| EV fleet charging optimization | P8 | Fleetbase + Claude + charger API | 4–6w | $80k–$250k |
| OEM open-source cockpit assistant | P9 | OpenPilot + KUKSA + Claude Haiku | 8–12w | $150k–$500k |
| Dealership network CRM + service outreach | P10 | Odoo CRM + Claude + WhatsApp | 6–8w | $100k–$350k |
| Factory multi-agent maintenance (Tier 1) | P11 | IBM AssetOpsBench + Claude + Odoo | 8–14w | $200k–$700k |
| LATAM OBD compliance (Denatran/RUPE) | P13 | OBD2 MCP + Claude Haiku | 2–4w | $30k–$80k |
