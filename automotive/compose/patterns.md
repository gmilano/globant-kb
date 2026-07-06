# 🧩 Composition Patterns — Automotive AI

> Concrete recipes using real repos + agents. Ready to prototype.
> Last updated: 2026-07-06

---

## Architecture Template

```
[Open-source vertical platform]    (Traccar / Autoware / KUKSA / Odoo)
          ↓
[Event stream / API bridge]        (webhook, gRPC, REST)
          ↓
[AI agent layer]                   (LangGraph / CrewAI + Claude API)
          ↓
[Action executors]                 (Odoo service order / SMS alert / KUKSA write)
          ↓
[Conversational UI / Dashboard]    (Chainlit / React + WebSocket)
```

---

## Pattern 1: AI-Powered Fleet Intelligence Platform

**Goal:** Give a commercial fleet operator a natural-language interface to their fleet data + proactive maintenance alerts.

**Stack:**
- Base: [Traccar](https://github.com/traccar/traccar) (Apache-2.0) — GPS tracking, event stream
- Fleet ops: [Fleetbase](https://github.com/fleetbase/fleetbase) (AGPL-3.0) — dispatch + maintenance
- AI: LangGraph + Claude Sonnet 5 (`claude-sonnet-5`)
- ERP: Odoo Community (LGPL-3.0) — service order generation

**Wiring:**
```python
# Traccar webhook → event normalizer → LangGraph agent
from langgraph.graph import StateGraph, END
from anthropic import Anthropic

client = Anthropic()

def analyze_telemetry(state):
    """Analyze OBD-II telemetry event from Traccar webhook."""
    event = state["event"]
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": f"""Analyze this vehicle telemetry event and determine if maintenance is needed:
Vehicle: {event['deviceName']} ({event['vehicleId']})
Event type: {event['type']}
Attributes: {event['attributes']}
Recent history: {event['history']}

Return JSON: {{"action": "none|alert|schedule_maintenance", "severity": "low|medium|high", "reason": "..."}}"""
        }]
    )
    return {"analysis": response.content[0].text}

def create_service_order(state):
    """Create Odoo service order if maintenance required."""
    if state["analysis"]["action"] == "schedule_maintenance":
        # POST to Odoo JSON-RPC endpoint
        odoo_rpc("fleet.vehicle.log.services", "create", {
            "vehicle_id": state["vehicle_id"],
            "description": state["analysis"]["reason"],
            "date": "today"
        })
    return state

graph = StateGraph(dict)
graph.add_node("analyze", analyze_telemetry)
graph.add_node("act", create_service_order)
graph.add_edge("analyze", "act")
graph.add_edge("act", END)
```

**Natural language query endpoint:**
```python
# "Which trucks in the São Paulo fleet need service this week?"
response = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=2048,
    tools=[traccar_query_tool, fleetbase_query_tool],
    messages=[{"role": "user", "content": user_query}]
)
```

**Time to build:** 3–4 weeks
**Cost:** ~$0.003–0.01 per alert generated (Claude API) + Traccar/Fleetbase self-hosted
**LATAM fit:** Direct fit for Brazilian logistics companies (JBS, BRF, Ambev fleets)

---

## Pattern 2: ADAS Simulation CI/CD Pipeline

**Goal:** Automate regression testing of ADAS algorithms in simulation on every code push.

**Stack:**
- Simulator: [CARLA](https://github.com/carla-simulator/carla) (MIT)
- AV stack: [Autoware](https://github.com/autowarefoundation/autoware) (Apache-2.0)
- Policy testing: [AlpaSim](https://github.com/NVlabs/alpasim) (Apache-2.0)
- ROS bridge: [carla-simulator/ros-bridge](https://github.com/carla-simulator/ros-bridge) (MIT)
- CI: GitHub Actions / GitLab CI
- Reporting: LLM-generated test summaries (Claude API)

**Pipeline:**
```yaml
# .github/workflows/adas-sim.yml
name: ADAS Simulation Tests
on: [push, pull_request]

jobs:
  simulate:
    runs-on: [self-hosted, gpu]
    steps:
      - name: Start CARLA server
        run: docker run -d --gpus all carlasimulator/carla:0.9.15

      - name: Run Autoware in simulation
        run: |
          ros2 launch autoware_launch planning_simulator.launch.xml \
            map_path:=./maps/test_town \
            scenario:=./scenarios/highway_merge.yaml

      - name: Run AlpaSim policy eval
        run: |
          python alpasim/eval.py \
            --policy autoware_policy \
            --scenarios all \
            --output results/

      - name: Generate AI test report
        run: |
          python scripts/ai_report.py results/ \
            # Uses Claude API to interpret pass/fail metrics,
            # highlight regressions, suggest root causes
```

**Test scenario generation with Claude:**
```python
# Generate edge-case scenario descriptions from natural language
scenario = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=1024,
    messages=[{"role": "user", "content": 
        "Generate a CARLA scenario YAML for: pedestrian crossing in rain at night, "
        "two cars in adjacent lanes, ego vehicle at 50 km/h. OpenSCENARIO format."}]
)
```

**Time to build:** 4–6 weeks (infrastructure setup dominates)
**Value:** Catch regressions before hardware testing — estimated 60–70% test cycle cost reduction

---

## Pattern 3: SDV Cockpit AI Agent (On-Device, Privacy-First)

**Goal:** Voice-controlled in-car AI agent that runs entirely on the vehicle compute unit, no cloud dependency.

**Stack:**
- Vehicle signals: [Eclipse KUKSA databroker](https://github.com/eclipse-kuksa/kuksa-databroker) (Apache-2.0) → gRPC
- Vehicle apps: [Eclipse Velocitas](https://github.com/eclipse-velocitas) (Apache-2.0) → Python
- Speech-to-text: OpenAI Whisper (MIT) — on device
- Edge LLM: Phi-3 Mini (3.8B, MIT) or Llama 3.2 3B (Meta Community) via Ollama
- Text-to-speech: Coqui TTS (MPL-2.0)
- OS: Eclipse Leda (Apache-2.0) on vehicle compute

**Architecture:**
```
Microphone → Whisper (on-device STT)
           → LLM reasoning (Phi-3 Mini, Ollama)
           → Intent parser
           → KUKSA databroker (gRPC write)
           → Vehicle actuators (HVAC, nav, seat, infotainment)
           → Coqui TTS response (on-device)
```

**KUKSA vehicle app (Velocitas pattern):**
```python
from vehicle import Vehicle, VehicleApp
from sdv.vdb.subscriptions import DataPointReply

class CockpitAIApp(VehicleApp):
    def __init__(self):
        super().__init__()
        self.Vehicle = Vehicle()

    async def on_start(self):
        await self.subscribe_data_points([
            self.Vehicle.Cabin.HVAC.Station.Row1.Left.Temperature,
            self.Vehicle.CurrentLocation.Latitude,
            self.Vehicle.Speed,
        ])

    async def on_command(self, natural_language_command: str):
        """Process voice command via on-device LLM."""
        # Ollama inference (on-device)
        import ollama
        response = ollama.chat(model='phi3:mini', messages=[
            {"role": "system", "content": "You control vehicle systems. Return JSON actions only."},
            {"role": "user", "content": f"Command: {natural_language_command}\n"
                f"Current speed: {await self.Vehicle.Speed.get()}\n"
                f"Current temp: {await self.Vehicle.Cabin.HVAC.Station.Row1.Left.Temperature.get()}"}
        ])
        actions = parse_actions(response['message']['content'])
        for action in actions:
            await self.execute_vehicle_action(action)
```

**Time to build:** 6–8 weeks (KUKSA + Velocitas setup + edge ML optimization)
**Cost per query:** $0 after hardware (fully on-device)
**Target clients:** EV OEMs, Tier-1 suppliers building cockpit software, premium aftermarket

---

## Pattern 4: AI-Powered Dealership CRM + Service Assistant

**Goal:** AI assistant for dealership staff — answers customer questions, qualifies leads, schedules service, generates repair estimates.

**Stack:**
- Base: [Odoo Community](https://github.com/odoo/odoo) (LGPL-3.0) — CRM + Service modules
- AI: Claude Sonnet 5 via Anthropic API
- Voice/chat: Chainlit or React + WebSocket
- Channels: WhatsApp Business API, SMS (Twilio)

**Lead qualification agent:**
```python
# Odoo webhook: new CRM lead created
@app.post("/webhook/odoo-lead")
async def qualify_lead(lead: dict):
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1500,
        system="""You are a dealership CRM assistant. Given a lead, 
        score it (1-10), suggest follow-up action, and draft a personalized 
        response message. Output JSON.""",
        messages=[{"role": "user", "content": f"""
Lead details:
Name: {lead['partner_name']}
Source: {lead['source_id']}
Vehicle interest: {lead['tag_ids']}
Message: {lead['description']}
Budget mentioned: {lead.get('planned_revenue', 'unknown')}
        """}]
    )
    qualification = json.loads(response.content[0].text)
    
    # Update Odoo CRM via JSON-RPC
    odoo_write("crm.lead", lead["id"], {
        "priority": str(min(qualification["score"] // 4, 2)),
        "description": qualification["follow_up"] + "\n\n" + lead["description"]
    })
    
    # Send WhatsApp via Twilio
    if qualification["score"] >= 7:
        send_whatsapp(lead["mobile"], qualification["personalized_message"])
```

**Service estimate generator:**
```python
# Service advisor describes problem in plain language
estimate = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=1024,
    messages=[{"role": "user", "content": f"""
Customer complaint: {complaint}
Vehicle: {year} {make} {model}, {mileage}km
Dealer labor rate: ${labor_rate}/hr
Parts catalog: {parts_db_excerpt}

Generate a service estimate with: diagnosis steps, parts needed (with part numbers), 
labor hours, total cost range, and customer-friendly explanation.
    """}]
)
```

**Time to build:** 2–3 weeks
**Cost:** ~$0.01–0.05 per lead qualification + $0.005 per service estimate
**LATAM fit:** High — Odoo is already popular in LATAM auto workshops; AI layer adds immediate ROI

---

## Pattern 5: Predictive Maintenance for Mining/Agricultural Fleets

**Goal:** Detect equipment failure 2–7 days in advance using vehicle telemetry + ML, reducing unplanned downtime by 20–30%.

**Stack:**
- Telemetry ingest: [Traccar](https://github.com/traccar/traccar) (Apache-2.0) + OBD-II adapters
- Time-series ML: Prophet (MIT) + scikit-learn (BSD-3)
- Anomaly detection: [Isolation Forest / LSTM Autoencoder]
- Agent: LangGraph + Claude Haiku (cost-optimized for high-volume alerts)
- CMMS: [Fleetbase](https://github.com/fleetbase/fleetbase) (AGPL) or Odoo Maintenance

**High-level flow:**
```
OBD-II adapter → Traccar (5-min telemetry intervals)
               → Time-series database (InfluxDB / TimescaleDB)
               → Anomaly detection model (runs hourly)
               → LangGraph alert agent (Claude Haiku)
               → Maintenance schedule creation in Fleetbase/Odoo
               → SMS/WhatsApp alert to fleet supervisor
```

**Anomaly → work order:**
```python
async def anomaly_to_workorder(anomaly: dict) -> dict:
    """Convert ML anomaly signal into a structured maintenance work order."""
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",  # cost-optimized for high volume
        max_tokens=512,
        messages=[{"role": "user", "content": f"""
Anomaly detected on vehicle {anomaly['vehicle_id']}:
Signal: {anomaly['signal_name']} ({anomaly['current_value']} vs baseline {anomaly['baseline']})
Anomaly score: {anomaly['score']:.2f}
Vehicle type: {anomaly['vehicle_type']}
Last maintenance: {anomaly['last_service_date']}

Generate: (1) likely root cause, (2) urgency (immediate/within 48h/scheduled), 
(3) maintenance action, (4) estimated downtime if ignored.
Output JSON.
        """}]
    )
    return {"work_order": json.loads(response.content[0].text), **anomaly}
```

**Time to build:** 5–7 weeks (ML model training requires historical data)
**ROI:** 20–30% reduction in unplanned downtime, 15% reduction in parts costs
**LATAM fit:** Direct fit for Chilean copper mines (Codelco, Anglo American), Brazilian agribusiness (JBS, Cargill fleets), Colombian logistics

---

## Quick-Start Selection Matrix

| Use Case | Base Platform | AI Model | Build Time | Team Size |
|----------|--------------|----------|------------|-----------|
| Fleet intelligence + NL query | Traccar + Fleetbase | Claude Sonnet 5 | 3–4 wks | 2–3 devs |
| ADAS simulation CI/CD | CARLA + Autoware + AlpaSim | Claude Sonnet 5 | 4–6 wks | 3–4 devs |
| SDV cockpit AI (on-device) | KUKSA + Velocitas + Phi-3 | Phi-3 Mini / Llama 3.2 | 6–8 wks | 3–5 devs |
| Dealership CRM + service AI | Odoo + WhatsApp | Claude Sonnet 5 | 2–3 wks | 1–2 devs |
| Predictive maintenance | Traccar + Prophet + LSTM | Claude Haiku 4.5 | 5–7 wks | 3–4 devs |
