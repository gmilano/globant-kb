# Composition Patterns — Energy AI

> Concrete recipes using real repos + agents + AI. Build these for clients.
> Last updated: 2026-07-10 (v3 — added PowerMCP copilot, B2G flexibility, interconnection study)

---

## P1: Industrial EMS AI Overlay (MyEMS + Claude + LangGraph)

**Use case**: Factory / hospital / mall with existing meters. Add AI anomaly detection, ISO 50001 reporting, optimization recommendations.
**Deal size**: $80k–$300k | **Timeline**: 6-10 weeks

**Stack**:
- Base: [MyEMS](https://github.com/MyEMS/myems) (MIT)
- AI: LangGraph + Claude Sonnet 5
- DB: TimescaleDB + pgvector
- Forecast: Google TimesFM 2.5 (Apache-2.0, zero-shot)

```python
from langgraph.graph import StateGraph
from anthropic import Anthropic
import httpx

client = Anthropic()

def fetch_energy_data(state):
    r = httpx.get(
        "http://myems-api/v3/reports/energyconsumption/meter",
        params={"meterid": state["meter_id"], "period": "day"}
    )
    return {"raw_data": r.json()}

def analyze_anomalies(state):
    response = client.messages.create(
        model="claude-sonnet-5-20261101",
        max_tokens=2048,
        messages=[{
            "role": "user",
            "content": f"""Analyze energy data for anomalies.
            Data: {state['raw_data']}
            Identify: unusual spikes, off-hours consumption, equipment faults.
            Return JSON with anomalies[], severity, recommended_action."""
        }]
    )
    return {"analysis": response.content[0].text}

graph = StateGraph(dict)
graph.add_node("fetch", fetch_energy_data)
graph.add_node("analyze", analyze_anomalies)
graph.add_edge("fetch", "analyze")
agent = graph.compile()
```

**LATAM fit**: Very high — ISO 50001 common in Brazil/Mexico factories.

---

## P2: Grid Reinforcement Learning Agent (Grid2Op + Stable-Baselines3)

**Use case**: Utility wants RL agent for grid topology optimization to minimize cascading failures.
**Deal size**: $200k–$800k | **Timeline**: 10-16 weeks

```python
import grid2op
from stable_baselines3 import PPO
from anthropic import Anthropic

client = Anthropic()

env = grid2op.make(
    "l2rpn_case14_sandbox",
    backend=grid2op.Backend.PandaPowerBackend()
)

model = PPO("MlpPolicy", env, verbose=1, n_steps=2048, learning_rate=3e-4)
model.learn(total_timesteps=500_000)

def explain_action(action, obs, reward):
    response = client.messages.create(
        model="claude-sonnet-5-20261101",
        max_tokens=512,
        messages=[{
            "role": "user",
            "content": f"""Power grid RL agent took action: {action}
            Grid state: voltages {obs.v_or}, flows {obs.p_or}, reward: {reward}
            Explain in plain language for a grid operator."""
        }]
    )
    return response.content[0].text
```

**LATAM fit**: High for Brazil (ONS), Chile (CEN renewable integration), Colombia (XM).

---

## P3: Carbon-Aware CI/CD Pipeline (Carbon Aware SDK + GitHub Actions)

**Use case**: Tech client shifts compute workloads to low-carbon grid windows. Fast-close, EU CSRD compliance.
**Deal size**: $40k–$150k | **Timeline**: 2-4 weeks (fast-close)

```python
import httpx
from anthropic import Anthropic

CARBON_SDK_URL = "http://carbon-aware-sdk:8090"
client = Anthropic()

def get_best_compute_window(location: str, duration_hours: int = 2) -> dict:
    response = httpx.get(
        f"{CARBON_SDK_URL}/emissions/forecasts/current",
        params={
            "location": location,
            "dataStartAt": "now",
            "dataEndAt": "+24h",
            "windowSize": duration_hours * 60
        }
    )
    data = response.json()
    best = min(data[0]["forecastData"], key=lambda w: w["value"])
    return {"optimal_time": best["timestamp"], "carbon_intensity": best["value"]}

def generate_carbon_report(run_data: dict) -> str:
    response = client.messages.create(
        model="claude-sonnet-5-20261101",
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": f"""Generate CSRD-compliant carbon footprint report for CI/CD:
            Data: {run_data}
            Include: total gCO2eq saved, EU CSRD Scope 2 classification."""
        }]
    )
    return response.content[0].text
```

**LATAM fit**: Medium — EU clients with LATAM tech teams; Brazil grid already 85% renewable.

---

## P4: VPP Orchestrator (VOLTTRON + VPP-Sim + LangGraph + OpenADR)

**Use case**: Energy retailer aggregates residential solar+BESS+EV into VPP, bids into wholesale market (Brazil ANEEL Q4 2026, Chile CEN).
**Deal size**: $300k–$1.5M | **Timeline**: 14-20 weeks

```python
from anthropic import Anthropic

client = Anthropic()

VPP_TOOLS = [
    {
        "name": "get_asset_state",
        "description": "Get current SOC, availability, constraints for VPP assets",
        "input_schema": {
            "type": "object",
            "properties": {"asset_type": {"type": "string", "enum": ["bess", "solar", "ev"]}},
            "required": ["asset_type"]
        }
    },
    {
        "name": "get_grid_price",
        "description": "Get current and forecast wholesale electricity price",
        "input_schema": {
            "type": "object",
            "properties": {"market": {"type": "string"}, "horizon_hours": {"type": "integer"}},
            "required": ["market"]
        }
    },
    {
        "name": "dispatch_asset",
        "description": "Send dispatch command via VOLTTRON OpenADR",
        "input_schema": {
            "type": "object",
            "properties": {
                "asset_id": {"type": "string"},
                "command": {"type": "string", "enum": ["charge", "discharge", "standby"]},
                "power_kw": {"type": "number"}
            },
            "required": ["asset_id", "command", "power_kw"]
        }
    }
]

def vpp_dispatch_agent(market_signal: dict, assets: list) -> dict:
    messages = [{
        "role": "user",
        "content": f"""You are a VPP dispatch manager.
        Market signal: {market_signal}
        Assets: {assets}
        Dispatch assets to maximize revenue while respecting SOC limits and grid constraints."""
    }]
    while True:
        response = client.messages.create(
            model="claude-sonnet-5-20261101",
            max_tokens=4096,
            tools=VPP_TOOLS,
            messages=messages
        )
        if response.stop_reason == "end_turn":
            return {"dispatch_plan": response.content[-1].text}
        tool_results = []
        for block in response.content:
            if block.type == "tool_use":
                result = execute_tool(block.name, block.input)
                tool_results.append({"type": "tool_result", "tool_use_id": block.id, "content": str(result)})
        messages.extend([{"role": "assistant", "content": response.content}, {"role": "user", "content": tool_results}])
```

**LATAM fit**: Very high — Brazil ANEEL VPP Q4 2026, Chile solar+BESS aggregation.

---

## P5: Predictive Maintenance Agent (TimescaleDB + Claude Vision)

**Use case**: Utility predicts transformer/grid failures before outages using thermal imaging + sensor data.
**Deal size**: $80k–$250k | **Timeline**: 6-10 weeks

```python
import base64
from anthropic import Anthropic

client = Anthropic()

def analyze_transformer(transformer_id: str, sensor_data: dict, thermal_image_path: str = None):
    content = [{
        "type": "text",
        "content": f"""Analyze transformer health:
        ID: {transformer_id}
        Oil temperature: {sensor_data['oil_temp_c']}C (limit: 95C)
        Load factor: {sensor_data['load_pct']}%
        Harmonics THD: {sensor_data['thd_pct']}%
        Age: {sensor_data['age_years']} years
        30d trend: {sensor_data['trend']}
        
        Return: health score (0-100), failure probability (30/60/90 days), maintenance priority."""
    }]
    if thermal_image_path:
        with open(thermal_image_path, "rb") as f:
            img_b64 = base64.standard_b64encode(f.read()).decode("utf-8")
        content.insert(0, {"type": "image", "source": {"type": "base64", "media_type": "image/jpeg", "data": img_b64}})
    response = client.messages.create(
        model="claude-sonnet-5-20261101",
        max_tokens=1024,
        messages=[{"role": "user", "content": content}]
    )
    return response.content[0].text
```

**LATAM fit**: Very high — Brazil 41+ year grid age; Argentina infrastructure stress; Mexico T&D losses >15%.

---

## P6: Grid Copilot — LLM Interface for Operators (PowerMCP + Claude)

**Use case**: Utility control room operators query grid state in natural language. Claude drives PowerWorld/PSSE/OpenDSS via PowerMCP.
**Deal size**: $200k–$800k | **Timeline**: 10-16 weeks

```python
from anthropic import Anthropic

client = Anthropic()

# PowerMCP provides these tools via MCP protocol
GRID_TOOLS = [
    {
        "name": "run_power_flow",
        "description": "Run AC power flow simulation on current grid state using pandapower/OpenDSS",
        "input_schema": {
            "type": "object",
            "properties": {
                "contingency": {"type": "string"},
                "load_scaling": {"type": "number"}
            }
        }
    },
    {
        "name": "get_line_loading",
        "description": "Get thermal loading percentage for all transmission lines",
        "input_schema": {"type": "object", "properties": {}}
    },
    {
        "name": "run_contingency_screening",
        "description": "Run N-1 contingency analysis and identify violations",
        "input_schema": {
            "type": "object",
            "properties": {"n_contingencies": {"type": "integer"}}
        }
    },
    {
        "name": "get_voltage_profile",
        "description": "Get bus voltage levels across the network",
        "input_schema": {"type": "object", "properties": {}}
    }
]

def grid_copilot(operator_query: str) -> str:
    response = client.messages.create(
        model="claude-sonnet-5-20261101",
        max_tokens=4096,
        system="""You are an AI copilot for power grid operators with expert knowledge of power systems.
        Always run power flow before making recommendations.
        Cite specific line names, bus IDs, and numerical values.
        Flag safety-critical findings immediately.
        Use PowerMCP tools to interact with the actual power system simulator.""",
        tools=GRID_TOOLS,
        messages=[{"role": "user", "content": operator_query}]
    )
    return process_agentic_response(response)
# Examples: "What happens if line 14-23 trips during tomorrow's peak?"
# "Run N-1 contingency and show violations above 90% loading"
```

**LATAM fit**: High for utilities with aging SCADA lacking natural language interface.

---

## P7: Building HVAC RL Agent (sinergym + LangGraph)

**Use case**: Commercial building AI-controlled HVAC minimizing energy cost while maintaining comfort.
**Deal size**: $60k–$200k | **Timeline**: 6-10 weeks

```python
import sinergym
import gymnasium as gym
from stable_baselines3 import PPO
from anthropic import Anthropic

client = Anthropic()

env = gym.make(
    "Eplus-5zone-hot-continuous-stochastic-v1",
    weather_variability=(("drybulb", 1.0, 0.0, 24),)
)

model = PPO("MlpPolicy", env, verbose=1, n_steps=4096)
model.learn(total_timesteps=200_000)

def explain_setpoint(setpoint: float, temp: float, price: float) -> str:
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=256,
        messages=[{
            "role": "user",
            "content": f"HVAC setpoint changed to {setpoint}C. Room: {temp}C. Price: ${price}/kWh. Explain in one sentence for a building manager."
        }]
    )
    return response.content[0].text
```

**LATAM fit**: Very high — office buildings in Sao Paulo, CDMX, Buenos Aires with high electricity costs.

---

## P8: Renewable Forecast Agent (TimesFM + Claude)

**Use case**: Solar/wind operator needs 48h forecasts for market bidding and BESS dispatch.
**Deal size**: $40k–$150k | **Timeline**: 3-6 weeks

```python
import timesfm
from anthropic import Anthropic
import numpy as np

client = Anthropic()

tfm = timesfm.TimesFm(
    hparams=timesfm.TimesFmHparams(per_core_batch_size=32, horizon_len=48, backend="gpu"),
    checkpoint=timesfm.TimesFmCheckpoint(huggingface_repo_id="google/timesfm-2.5-500m-pytorch")
)

def forecast_generation(historical_mw: list) -> np.ndarray:
    forecast, _ = tfm.forecast(inputs=[np.array(historical_mw)], freq=[0])
    return forecast[0]

def generate_market_bid(forecast_mw: np.ndarray, price_signal: list) -> str:
    response = client.messages.create(
        model="claude-sonnet-5-20261101",
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": f"""Generate day-ahead market bid strategy for solar plant.
            48h forecast (MW/h): {forecast_mw.tolist()}
            Price forecast ($/MWh): {price_signal}
            BESS: 50 MWh / 25 MW, current SOC: 80%
            Recommend: hourly bid schedule, BESS dispatch plan, expected revenue."""
        }]
    )
    return response.content[0].text
```

**LATAM fit**: Very high — Chile solar curtailment; Brazil wind+solar forecasting for ONS bidding.

---

## P9: PowerMCP Interconnection Study Accelerator (EPRI NIM + PowerWF + Claude)

**Use case**: Utility or grid operator needs to accelerate interconnection studies (currently 2-4 years). Target: 5x speedup using AI.
**Deal size**: $200k–$600k | **Timeline**: 8-14 weeks

**Stack**:
- [PowerMCP](https://github.com/Power-Agent/PowerMCP) (Apache-2.0) — MCP servers for OpenDSS/PSSE
- [PowerWF](https://github.com/Power-Agent/PowerWF) (Apache-2.0) — interconnection study workflows
- EPRI Open Power AI NIM microservice — domain LLM for power engineering knowledge
- Claude Sonnet 5 — multi-agent orchestration and report generation

```python
from anthropic import Anthropic
import anthropic

client = Anthropic()

INTERCONNECTION_TOOLS = [
    {
        "name": "run_interconnection_screening",
        "description": "Run initial interconnection screening using PowerMCP/OpenDSS",
        "input_schema": {
            "type": "object",
            "properties": {
                "project_type": {"type": "string", "enum": ["solar", "wind", "bess", "hybrid"]},
                "capacity_mw": {"type": "number"},
                "proposed_poc": {"type": "string"}  # Point of Connection bus ID
            },
            "required": ["project_type", "capacity_mw", "proposed_poc"]
        }
    },
    {
        "name": "run_power_flow_study",
        "description": "Run detailed power flow study for interconnection impact",
        "input_schema": {
            "type": "object",
            "properties": {
                "poc_bus": {"type": "string"},
                "injection_mw": {"type": "number"},
                "study_cases": {"type": "array", "items": {"type": "string"}}
            },
            "required": ["poc_bus", "injection_mw"]
        }
    },
    {
        "name": "identify_upgrades_required",
        "description": "Identify network upgrades required for interconnection",
        "input_schema": {
            "type": "object",
            "properties": {"violations": {"type": "array", "items": {"type": "object"}}},
            "required": ["violations"]
        }
    },
    {
        "name": "query_epri_knowledge",
        "description": "Query EPRI Open Power AI domain knowledge base for standards and precedents",
        "input_schema": {
            "type": "object",
            "properties": {"query": {"type": "string"}},
            "required": ["query"]
        }
    }
]

def run_interconnection_study(project: dict) -> str:
    messages = [{
        "role": "user",
        "content": f"""Run a complete interconnection feasibility study for:
        Project: {project['name']}
        Type: {project['type']} | Capacity: {project['capacity_mw']} MW
        Proposed Point of Connection: {project['poc_bus']}
        
        Follow NERC guidelines. Identify violations, required upgrades, and cost estimates.
        Generate executive summary and technical report sections."""
    }]
    while True:
        response = client.messages.create(
            model="claude-sonnet-5-20261101",
            max_tokens=8192,
            tools=INTERCONNECTION_TOOLS,
            messages=messages
        )
        if response.stop_reason == "end_turn":
            return response.content[-1].text
        tool_results = []
        for block in response.content:
            if block.type == "tool_use":
                result = execute_tool(block.name, block.input)
                tool_results.append({"type": "tool_result", "tool_use_id": block.id, "content": str(result)})
        messages.extend([{"role": "assistant", "content": response.content}, {"role": "user", "content": tool_results}])
```

**LATAM fit**: Very high — Brazil/Chile have large queues of renewable interconnection requests; ANEEL and CEN processes need acceleration.

---

## P10: Smart Meter Data AI Platform (Brazil CPFL / Neoenergia)

**Use case**: Brazilian utility has 3.6M+ new smart meters. Build AI layer for theft detection, demand forecasting, ToU pricing optimization.
**Deal size**: $100k–$400k | **Timeline**: 8-14 weeks

```python
from anthropic import Anthropic
import numpy as np
import timesfm

client = Anthropic()

def detect_energy_theft(meter_id: str, consumption_profile: list, peer_profiles: list) -> dict:
    """Compare meter profile against peer cohort for theft detection."""
    response = client.messages.create(
        model="claude-sonnet-5-20261101",
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": f"""Analyze electricity consumption for potential theft or tampering.
            Meter ID: {meter_id}
            Last 30 days hourly consumption (kWh): {consumption_profile}
            Peer cohort average (same location, size): {peer_profiles}
            
            Identify: anomalous periods, consumption cliff drops (potential bypass), 
            seasonal vs behavioral anomalies. 
            Return: theft_probability (0-1), anomaly_periods[], recommended_action."""
        }]
    )
    return {"analysis": response.content[0].text}

def forecast_demand(meter_ids: list, historical_data: dict) -> dict:
    """48-hour demand forecast per meter using TimesFM."""
    tfm = timesfm.TimesFm(
        hparams=timesfm.TimesFmHparams(per_core_batch_size=32, horizon_len=48, backend="gpu"),
        checkpoint=timesfm.TimesFmCheckpoint(huggingface_repo_id="google/timesfm-2.5-500m-pytorch")
    )
    forecasts = {}
    for meter_id in meter_ids:
        ts = np.array(historical_data[meter_id])
        forecast, _ = tfm.forecast(inputs=[ts], freq=[0])
        forecasts[meter_id] = forecast[0].tolist()
    return forecasts
```

**LATAM fit**: Very high — Brazil national mandate in progress, 3.6M year 1 target. Immediate commercial opportunity with CPFL, Neoenergia, Equatorial.

---

## P11: Building-to-Grid Flexibility (AutoB2G + sinergym + VOLTTRON)

**Use case**: Commercial building participates in grid demand response market, providing 10-20% peak load flexibility.
**Deal size**: $80k–$350k | **Timeline**: 8-14 weeks

```python
from anthropic import Anthropic

client = Anthropic()

B2G_TOOLS = [
    {
        "name": "get_building_loads",
        "description": "Get current HVAC, lighting, EV, BESS loads and flexibility windows",
        "input_schema": {"type": "object", "properties": {"building_id": {"type": "string"}}}
    },
    {
        "name": "get_dr_event",
        "description": "Get active demand response event from grid operator (VOLTTRON/OpenADR)",
        "input_schema": {"type": "object", "properties": {}}
    },
    {
        "name": "curtail_load",
        "description": "Reduce building load by adjusting HVAC setpoints or deferring EV charging",
        "input_schema": {
            "type": "object",
            "properties": {
                "load_type": {"type": "string", "enum": ["hvac", "ev", "lighting"]},
                "reduction_kw": {"type": "number"},
                "duration_min": {"type": "integer"}
            },
            "required": ["load_type", "reduction_kw"]
        }
    }
]

def b2g_flexibility_agent(dr_event: dict, building_state: dict) -> str:
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=2048,
        system="You are a building-to-grid flexibility manager. Maximize DR revenue while maintaining occupant comfort.",
        tools=B2G_TOOLS,
        messages=[{
            "role": "user",
            "content": f"DR event: {dr_event}. Building state: {building_state}. Execute optimal curtailment plan."
        }]
    )
    return process_agentic_response(response)
```

**LATAM fit**: High — commercial buildings in Sao Paulo, CDMX, Santiago with high peak tariffs.

---

## Pattern Selection Guide

| Client Situation | Pattern | Deal Size |
|-----------------|---------|-----------| 
| Factory / hospital with existing meters | P1: MyEMS AI Overlay | $80k-$300k |
| Utility with aging SCADA | P6: Grid Copilot (PowerMCP) | $200k-$800k |
| Renewable operator | P8: Forecast + P4: VPP | $40k-$1.5M |
| Tech client sustainability (fast-close) | P3: Carbon-Aware CI/CD | $40k-$150k |
| Building facility manager | P7: Building RL Agent | $60k-$200k |
| Distribution utility RL | P2: Grid RL Agent | $200k-$800k |
| Aging grid infrastructure | P5: Predictive Maintenance | $80k-$250k |
| Utility interconnection backlog | P9: Interconnection Accelerator | $200k-$600k |
| Brazilian utility (smart meters) | P10: Meter Data AI | $100k-$400k |
| Commercial building DR market | P11: B2G Flexibility | $80k-$350k |

---
*Updated by Globant AI Studios ingestion pipeline.*
