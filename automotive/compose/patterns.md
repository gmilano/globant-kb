# Composition Patterns — Automotive AI

> Concrete recipes for building automotive AI solutions. Specific repos + agents + wiring.
> Last updated: 2026-07-06

## Architecture Blueprint

```
[Vertical Platform (Fleetbase / Odoo / AGL SoDeV)]
          ↓  REST API / OBD-II / ROS2
[Agent Orchestration Layer (LangGraph / CrewAI)]
          ↓  tools + memory
[AI Model (Claude / Ollama local / NVIDIA Alpamayo)]
          ↓
[Interface: WhatsApp / Voice / Web / In-cabin HMI]
```

---

## Pattern 1: Conversational Fleet Dispatch Agent

**Problem**: Dispatchers manage 50+ vehicles via spreadsheets and radio. No real-time AI assistance.

**Stack**:
- [fleetbase/fleetops](https://github.com/fleetbase/fleetops) — Fleet-Ops REST API (AGPL-3.0)
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — Agent orchestration (MIT)
- Claude claude-sonnet-5 — reasoning and natural language (Anthropic API)
- WhatsApp Business API — dispatcher interface

**Wiring**:
```python
# LangGraph tool wrapping Fleetbase Fleet-Ops API
@tool
def get_nearest_driver(pickup_lat: float, pickup_lon: float) -> dict:
    """Query Fleetbase for driver nearest to pickup coordinates."""
    response = requests.get(
        f"{FLEETBASE_URL}/api/fleet-ops/drivers/nearest",
        params={"lat": pickup_lat, "lon": pickup_lon},
        headers={"Authorization": f"Bearer {FLEETBASE_TOKEN}"}
    )
    return response.json()

# LangGraph agent with dispatch tools
tools = [get_nearest_driver, assign_driver, get_vehicle_status, get_route_eta]
agent = create_react_agent(claude_sonnet, tools)
```

**Estimated build time**: 3-4 weeks MVP
**ROI**: Dispatcher handles 3x more vehicles; 40% reduction in dispatch errors

---

## Pattern 2: OBD-II AI Workshop Diagnostics

**Problem**: Independent mechanics lack access to expensive OEM diagnostic tools (DealerConnect, Xentry). ~80% of LATAM workshops are independent.

**Stack**:
- [speed785/open-mechanic](https://github.com/speed785/open-mechanic) — OBD-II + Claude connector (MIT)
- ELM327 Bluetooth OBD-II dongle ($10-20 hardware)
- Claude API — fault code explanation + repair guidance
- React Native mobile app — mechanic UI

**Wiring**:
```python
# open-mechanic core pattern (simplified)
import obd
from anthropic import Anthropic

connection = obd.OBD("/dev/rfcomm0")  # ELM327 Bluetooth
dtc_codes = connection.query(obd.commands.GET_DTC).value

client = Anthropic()
response = client.messages.create(
    model="claude-sonnet-5",
    messages=[{
        "role": "user",
        "content": f"Vehicle: {make} {model} {year}. DTCs: {dtc_codes}. "
                   f"Explain in plain Spanish what's wrong and step-by-step repair guide."
    }]
)
```

**Estimated build time**: 2-3 weeks MVP
**ROI**: $0 diagnostic tool vs $20k OEM scanner; serves 90% of LATAM market

---

## Pattern 3: AV Testing Pipeline (CARLA + DriveMLM + PCLA)

**Problem**: AV/ADAS teams need automated adversarial test generation and CI/CD integration for safety validation.

**Stack**:
- [carla-simulator/carla](https://github.com/carla-simulator/carla) — simulation environment (MIT)
- [OpenGVLab/DriveMLM](https://github.com/OpenGVLab/DriveMLM) — LLM-based AV under test (Apache 2.0)
- [MasoudJTehrani/PCLA](https://github.com/MasoudJTehrani/PCLA) — CARLA test framework (Apache 2.0)
- [BerkeleyLearnVerify/Scenic](https://github.com/BerkeleyLearnVerify/Scenic) — adversarial scenario generation (BSD-3)
- LLM4ADSTest — LLM-driven scenario mutation (MIT)

**Wiring**:
```python
# Scenic scenario generation → CARLA → DriveMLM evaluation
from scenic.simulators.carla import CarlaSimulator
from pcla import AgentTestRunner

# 1. Generate adversarial scenarios via Scenic DSL
scenario = compile_scenic("adversarial_pedestrian.scenic")

# 2. Run in CARLA with DriveMLM as the driving agent
simulator = CarlaSimulator(map="Town05", timeout=60)
runner = AgentTestRunner(agent=DriveMLMAgent(), simulator=simulator)

# 3. Collect metrics: collision rate, comfort score, scenario completion
results = runner.run_batch(scenarios=[scenario], repetitions=100)

# 4. LLM generates new harder scenarios based on failures
new_scenarios = llm_mutate_failing_scenarios(results.failures)
```

**Estimated build time**: 6-8 weeks for full CI/CD integration
**ROI**: Replace $500k/year dSPACE licenses with open stack + cloud CARLA simulation

---

## Pattern 4: In-Cabin Voice AI Agent

**Problem**: OEMs want intelligent, personalized in-cabin assistants beyond basic Siri/Google commands. Dealers want differentiator.

**Stack**:
- [openai/whisper](https://github.com/openai/whisper) — Speech-to-text (MIT, 104k★)
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — Multi-domain agent (MIT)
- Claude claude-haiku-4-5 — fast inference for in-cabin latency (<500ms) (Anthropic API)
- Vehicle API / MQTT broker — car state (window, HVAC, navigation, media)
- [SuperdeMan/cockpit-agent](https://github.com/SuperdeMan/cockpit-agent) — reference architecture

**Wiring**:
```python
# LangGraph in-cabin agent with vehicle domain tools
tools = [
    control_hvac,      # "Set temperature to 22°C"
    navigate_to,       # "Take me to the nearest charging station"
    get_vehicle_status, # "How's my tire pressure?"
    play_media,        # "Play jazz music"
    call_contact,      # "Call Maria"
]

# Fast inference: Haiku for intent classification, Sonnet for complex reasoning
intent_agent = create_react_agent(claude_haiku, intent_tools)
reasoning_agent = create_react_agent(claude_sonnet, full_tools)
```

**Estimated build time**: 4-6 weeks MVP (without hardware integration)
**ROI**: OEM differentiator vs Alexa Auto; sells as premium feature at $300-500/vehicle

---

## Pattern 5: Predictive Fleet Maintenance Agent

**Problem**: Fleet operators (logistics, bus companies) lose 15-20% of vehicle uptime to reactive maintenance.

**Stack**:
- OBD-II dongles (all vehicles) → MQTT → time-series DB (InfluxDB or TimescaleDB)
- [Eloquent-Algorithmics/Automotive-AI](https://github.com/Eloquent-Algorithmics/Automotive-AI) — OBD-II integration (MIT)
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — maintenance agent (MIT)
- [odoo/odoo](https://github.com/odoo/odoo) — fleet maintenance module + spare parts (LGPL-3)
- Claude — anomaly explanation + repair scheduling

**Wiring**:
```python
# Maintenance prediction agent
class MaintenanceAgent:
    def analyze_telemetry(self, vehicle_id: str, window_hours: int = 168):
        telemetry = self.influx.query(vehicle_id, hours=window_hours)
        
        # Statistical anomaly detection on OBD-II signals
        anomalies = detect_anomalies(telemetry, signals=[
            "coolant_temp", "oil_pressure", "battery_voltage",
            "rpm_variance", "fuel_trim"
        ])
        
        if anomalies:
            # LLM explains + recommends action
            explanation = claude.messages.create(
                model="claude-sonnet-5",
                messages=[{"role": "user", "content":
                    f"Vehicle {vehicle_id} showing anomalies: {anomalies}. "
                    f"Predict failure mode, urgency (1-5), and recommended action."
                }]
            )
            # Create Odoo maintenance order if urgent
            if urgency >= 4:
                self.odoo.create_maintenance_order(vehicle_id, explanation)
```

**Estimated build time**: 5-7 weeks (includes IoT integration)
**ROI**: 25-40% reduction in unplanned downtime; typical ROI 8-12 months for fleets of 50+ vehicles

---

## Pattern 6: Autonomous Driving QA Agent (for ADAS Clients)

**Problem**: ADAS engineering teams spend 60% of QA time on manual test execution in simulation.

**Stack**:
- [autowarefoundation/autoware](https://github.com/autowarefoundation/autoware) — AV under test (Apache 2.0)
- [carla-simulator/carla](https://github.com/carla-simulator/carla) — simulation (MIT)
- [yaodongC/DriveLLM](https://github.com/yaodongC/DriveLLM) — LLM decision agent (MIT)
- [AkbasLab/scenic-sumo](https://github.com/AkbasLab/scenic-sumo) — traffic scenario generation (BSD-3)
- CrewAI — multi-agent QA crew (MIT)

**Agent Crew Design**:
```
ScenarioGeneratorAgent  →  runs Scenic + SUMO to create test scenarios
SimulationRunnerAgent   →  executes scenarios in CARLA with Autoware stack
MetricsCollectorAgent   →  collects collision rate, comfort, scenario completion
FailureAnalystAgent     →  LLM analyzes failures, identifies root cause
ReportWriterAgent       →  generates safety validation report (SOTIF/ISO 21448)
```

**Estimated build time**: 8-12 weeks for full AV QA pipeline
**ROI**: Reduce AV QA cycle from 6 weeks → 1 week per release; enables continuous delivery for AV software

---

## Recommended Starting Point for New Engagements

| Client Type | Start With | Time to Demo |
|-------------|-----------|--------------|
| Fleet/logistics company | Pattern 1 (Fleet Dispatch Agent) | 1 week demo |
| Independent auto workshop | Pattern 2 (OBD-II Diagnostics) | 3 days demo |
| Auto dealership | Pattern 5 (Predictive Maintenance) | 2 weeks POC |
| OEM / Tier-1 (ADAS team) | Pattern 3 (AV Testing Pipeline) | 4 weeks POC |
| OEM (infotainment team) | Pattern 4 (In-Cabin Voice Agent) | 3 weeks POC |
