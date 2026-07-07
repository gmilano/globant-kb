# Composition Patterns — Automotive AI

> Concrete recipes for building AI solutions using the identified repos + agents.
> Each pattern names the specific repos, shows how to wire them, and gives a delivery estimate.
> Last updated: 2026-07-07

---

## Pattern 1: AI-Enhanced Fleet Tracking (Traccar + LangGraph)

**Use case:** Add predictive maintenance alerts, route anomaly detection, and driver coaching to an existing GPS fleet.

**Stack:** `traccar/traccar` (Apache-2.0) + `langchain-ai/langgraph` (MIT) + Anthropic Claude API

**Architecture:**
```
Traccar REST API (speed, fuel, GPS, engine temp)
    ↓
LangGraph supervisor agent
    ├── anomaly_agent: detect abnormal patterns vs. historical baseline
    ├── maintenance_agent: predict breakdown (48-72h horizon)
    ├── route_agent: re-route based on traffic + fuel cost
    └── coach_agent: weekly driver behavior report
    ↓
Notification layer (Slack / WhatsApp / email)
```

**Key code — Anomaly Detection Agent:**
```python
from langgraph.graph import StateGraph
from anthropic import Anthropic

client = Anthropic()

def anomaly_detector(state: dict) -> dict:
    telemetry = state["telemetry"]
    baseline = state["baseline"]
    
    prompt = f"""
    Vehicle {telemetry['vehicle_id']} telemetry:
    - Fuel consumption: {telemetry['fuel_l_per_100km']} L/100km (baseline: {baseline['fuel_l_per_100km']})
    - Engine temp: {telemetry['engine_temp_c']}°C
    - Speed variance: {telemetry['speed_variance']}
    
    Is this anomalous? What is the likely cause and recommended action?
    """
    
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=500,
        messages=[{"role": "user", "content": prompt}]
    )
    return {**state, "anomaly_assessment": response.content[0].text}
```

**Delivery estimate:** 3-5 weeks | **Cost:** ~$0.05-0.15/vehicle/day | **LATAM fit:** Excellent

---

## Pattern 2: Predictive Maintenance Agent for Automotive Manufacturing

**Use case:** Monitor plant equipment (CNC, welding robots, presses). Predict failures 48-72h ahead. Auto-schedule maintenance.

**Stack:** `microsoft/agentic-factory-hack` (MIT) + `langchain-ai/langgraph` (MIT) + `scikit-learn` + Claude API

**Architecture:**
```
IoT Sensors (vibration, temp, current, acoustic) → MQTT/OPC-UA
    ↓
LangGraph Multi-Agent Orchestrator
    ├── sensor_reader_agent: collect + normalize
    ├── anomaly_agent: Z-score + ML deviation detection
    ├── forecaster_agent: LSTM Remaining Useful Life prediction
    ├── diagnosis_agent: Claude root cause analysis
    ├── parts_agent: inventory check + auto-PO
    └── scheduler_agent: book maintenance in ERP calendar
```

**Key code — Diagnosis Agent:**
```python
def diagnosis_agent(state: dict) -> dict:
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=800,
        system="You are an industrial equipment diagnostics expert for automotive manufacturing.",
        messages=[{"role": "user", "content": f"""
            Equipment: {state['equipment_metadata']['name']}
            Vibration RMS: {state['sensor_readings']['vibration']} g
            Temperature: {state['sensor_readings']['temp']}°C
            Motor current: {state['sensor_readings']['current']} A
            Anomaly score: {state['anomaly_score']:.2f} (threshold: 0.75)
            Diagnose: failure mode? Time to failure? Recommended action?
        """}]
    )
    return {**state, "diagnosis": response.content[0].text, "action_required": state["anomaly_score"] > 0.75}
```

**Delivery estimate:** 6-10 weeks | **ROI:** 15-25% maintenance cost reduction, 40% downtime reduction (McKinsey) | **LATAM fit:** High

---

## Pattern 3: Vehicle Damage Inspection Agent (CV + Gen AI)

**Use case:** Automated visual damage assessment at dealerships, rental companies, or insurance adjusters.

**Stack:** `ultralytics/ultralytics` YOLO v11 (AGPL-3.0) + `A.I.-AutoInspector` (MIT) + Claude vision API + FastAPI

**Architecture:**
```
Mobile camera
    ↓
YOLO v11 (detects: dent, scratch, crack, rust)
    ↓
Claude vision (severity assessment, cost estimate, insurance classification)
    ↓
Structured JSON report → PDF → Insurance API / DMS
```

**Key code — Inspection Pipeline:**
```python
import base64
from ultralytics import YOLO
from anthropic import Anthropic

model = YOLO("yolov11-automotive-damage.pt")
client = Anthropic()

def inspect_vehicle(image_path: str, vehicle_info: dict) -> dict:
    results = model(image_path)
    damage_boxes = [
        {"class": results[0].names[int(c)], "confidence": float(conf)}
        for c, conf in zip(results[0].boxes.cls, results[0].boxes.conf) if conf > 0.5
    ]
    with open(image_path, "rb") as f:
        image_data = base64.standard_b64encode(f.read()).decode("utf-8")
    response = client.messages.create(
        model="claude-opus-4-8",
        max_tokens=1000,
        messages=[{"role": "user", "content": [
            {"type": "image", "source": {"type": "base64", "media_type": "image/jpeg", "data": image_data}},
            {"type": "text", "text": f"Vehicle: {vehicle_info}\nDetected: {damage_boxes}\nAssess severity, cost range, repair priority, insurance classification. Return JSON."}
        ]}]
    )
    return {"vehicle": vehicle_info, "detections": damage_boxes, "assessment": response.content[0].text}
```

**Delivery estimate:** 4-6 weeks | **Cost:** ~$0.08-0.15/inspection | **LATAM fit:** Excellent (MercadoLibre Autos, OLX, Porto Seguro)

---

## Pattern 4: Smart Cockpit AI Agent (Cloud-Edge Multi-Agent)

**Use case:** In-vehicle AI assistant — fast intent on device, complex reasoning in cloud.

**Stack:** `SuperdeMan/cockpit-agent` pattern + Llama 3.2 3B via Ollama (edge) + Claude claude-sonnet-5 (cloud)

**Architecture:**
```
Driver voice input
    ↓
Edge: Llama 3.2 3B (<10ms) → simple intents (play music, set temp) → CAN bus
    └── complex intents → Claude (cloud) → reasoning → HMI response + VAL commands
```

**Key code — Intent Routing:**
```python
import ollama
from anthropic import Anthropic

client = Anthropic()
SIMPLE_INTENTS = {"play_music", "set_temperature", "call_contact", "set_volume"}

def route_intent(voice_input: str, vehicle_state: dict) -> dict:
    edge = ollama.chat(model="llama3.2:3b",
        messages=[{"role": "user", "content": f"Classify as one of {SIMPLE_INTENTS} or 'complex': '{voice_input}'"}])
    intent = edge["message"]["content"].strip()
    if intent in SIMPLE_INTENTS:
        return {"intent": intent, "handled_by": "edge"}
    cloud = client.messages.create(model="claude-sonnet-5", max_tokens=500,
        system=f"Intelligent vehicle assistant. State: {vehicle_state}",
        messages=[{"role": "user", "content": voice_input}])
    return {"intent": "complex", "action": cloud.content[0].text, "handled_by": "cloud"}
```

**Delivery estimate:** 8-12 weeks | **LATAM fit:** Medium (Chinese OEMs entering Brazil: BYD, Chery, JAC)

---

## Pattern 5: Autonomous Driving Research Pipeline (CARLA + Autoware + LLM)

**Use case:** LLM agents generate test scenarios → CARLA executes → Autoware navigates → Claude evaluates → loop.

**Stack:** `carla-simulator/carla` (MIT) + `autowarefoundation/autoware` (Apache-2.0) + `MasoudJTehrani/PCLA` (Apache-2.0) + Claude

**Key code — Scenario Generation Loop:**
```python
failure_history = []
for i in range(100):
    response = client.messages.create(
        model="claude-sonnet-5", max_tokens=800,
        system="Generate CARLA ScenarioRunner JSON configs for autonomous driving testing. Focus on edge cases.",
        messages=[{"role": "user", "content": f"""
            Previous failures: {chr(10).join(failure_history[-5:])}
            Generate a new scenario targeting a DIFFERENT failure mode.
            Must be realistic for a Brazilian city. Include: weather, traffic, pedestrian behavior.
            Return as CARLA ScenarioRunner JSON.
        """}]
    )
    scenario = response.content[0].text
    result = run_carla_scenario(scenario)
    if result["outcome"] == "failure":
        failure_history.append(f"Scenario {i}: {result['failure_reason']}")
```

**Delivery estimate:** 4-8 weeks | **Target:** OEM R&D labs, Tier-1 ADAS suppliers, ITA/USP/UNICAMP/UNAM

---

## Pattern 6: EV Fleet Smart Charging Optimizer

**Use case:** Manage charging for 50-500 EVs to minimize cost, avoid grid peaks, maximize availability.

**Stack:** `TUMFTM/REVOL-E-TION` (Apache-2.0) + `ev-charging-optimization` (MIT) + `traccar/traccar` (Apache-2.0) + LangGraph

**Architecture:**
```
Fleet State (Traccar: battery %, location, next trip) + Grid State (tariff, load forecast) + Weather
    ↓
LangGraph Charging Optimizer
    ├── demand_forecaster: predict which vehicles need charge by when
    ├── grid_reader: find optimal charging windows (low tariff + low grid load)
    ├── scheduler: assign vehicle → charger → time window
    └── override_handler: emergency charging
    ↓
Charging station commands (OCPP protocol) + Fleet dashboard update
```

**Estimated savings:** 20-35% charging energy cost reduction | **Delivery:** 5-8 weeks | **LATAM fit:** High

---

## Pattern Selection Guide

| Client scenario | Pattern | Time | Complexity |
|----------------|---------|------|------------|
| Fleet operator (trucks/vans) | Pattern 1: Fleet Tracking AI | 3-5 wk | Low |
| Auto plant (quality/maintenance) | Pattern 2: Predictive Maintenance | 6-10 wk | Medium |
| Dealership / insurance / rental | Pattern 3: Damage Inspection | 4-6 wk | Medium |
| OEM / SDV cockpit project | Pattern 4: Smart Cockpit | 8-12 wk | High |
| AD research lab | Pattern 5: CARLA + LLM pipeline | 4-8 wk | Medium |
| EV fleet operator | Pattern 6: Smart Charging | 5-8 wk | Medium |

---
*Auto-updated by the ingest pipeline.*
