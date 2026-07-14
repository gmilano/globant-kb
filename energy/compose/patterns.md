# Composition Patterns — Energy AI

> Concrete recipes for building solutions combining repos + agents + AI.
> Last updated: 2026-07-14

## Architecture Base

```
[Open Source Vertical Platform]   ← EVerest / FlexMeasures / Grid2Op / RapidSCADA
          ↓
[Data & Simulation Layer]         ← Grid2Op / OpenG2G / sinergym / CityLearn
          ↓
[Agentic AI Layer]                ← PowerMCP / PowerDAG / LangGraph / CrewAI
          ↓
[Foundation Model / LLM]         ← PowerFM fine-tuned + Claude API
          ↓
[Operator UI / API]               ← Conversational control room or REST endpoint
```

---

## P1 — Grid RL Agent: Topology Control (Flagship)

**Goal**: Train an RL agent that keeps a transmission network operational under N-1 contingencies.

**Stack**: Grid2Op + RL2Grid + Stable-Baselines3 + PowerFM

```python
import grid2op
from lightsim2grid import LightSimBackend
from stable_baselines3 import PPO

env = grid2op.make(
    "l2rpn_wcci_2020",
    backend=LightSimBackend(),     # 100x faster than PandaPower
    reward_class=L2RPNReward
)

from rl2grid import RL2GridEnv
rl_env = RL2GridEnv(env, difficulty="hard")

model = PPO("MlpPolicy", rl_env, verbose=1, n_steps=2048)
model.learn(total_timesteps=500_000)

from rl2grid.eval import BenchmarkRunner
scores = BenchmarkRunner(rl_env).run(model, n_episodes=100)
print(scores)
```

**Repos**: [rte-france/Grid2Op](https://github.com/rte-france/Grid2Op) + [AI4Electricity/RL2Grid](https://github.com/AI4Electricity/RL2Grid)
**Estimated build time**: 4-6 weeks (training included)

---

## P2 — LLM Power System Analyst via MCP

**Goal**: Let operators query grid simulators in natural language and get structured analysis.

**Stack**: PowerMCP + Claude API (claude-sonnet-5) + PowerDAG workflow

```python
import anthropic

client = anthropic.Anthropic()

def grid_analyst(operator_query: str, grid_model_path: str) -> dict:
    response = client.beta.messages.create(
        model="claude-sonnet-5",
        max_tokens=4096,
        tools=[
            {"type": "mcp", "server": "powermcp-opendss", "tool": "run_power_flow"},
            {"type": "mcp", "server": "powermcp-opendss", "tool": "check_n1_contingency"},
            {"type": "mcp", "server": "powermcp-opendss", "tool": "get_violations"},
            {"type": "mcp", "server": "powermcp-psse", "tool": "run_fault_analysis"},
        ],
        messages=[{
            "role": "user",
            "content": f"Grid model: {grid_model_path}\n\nOperator query: {operator_query}"
        }],
        system="""You are a senior power systems engineer. Use the available grid simulation
        tools to answer operator queries. Always check N-1 contingency security.
        Return structured findings with: severity, affected equipment, recommended action."""
    )
    return response

result = grid_analyst(
    "Is the substation at bus 47 secure after the outage on line 12-14?",
    "/models/rte_118bus.json"
)
```

**Repos**: [Power-Agent/PowerMCP](https://github.com/Power-Agent/PowerMCP) + Claude API
**Key insight**: PowerMCP gives any LLM access to PowerWorld, PSS/E, OpenDSS, PSCAD via MCP — no custom integration needed.

---

## P3 — EV Fleet Smart Charging (Most Commercial)

**Goal**: Optimize EV fleet charging to minimize cost, reduce peak demand, and earn DR revenue.

**Stack**: EVerest → Open e-Mobility CSMS → FlexMeasures → LangGraph agent

```python
from flexmeasures_client import FlexMeasuresClient
from langgraph.graph import StateGraph
from anthropic import Anthropic

client = Anthropic()
fm = FlexMeasuresClient(url="https://your-flexmeasures.io")

def create_ev_fleet_agent():
    graph = StateGraph(FleetState)

    def forecast_node(state):
        price_forecast = fm.get_sensor_data("day_ahead_price", hours=24)
        grid_capacity = fm.get_sensor_data("grid_connection_limit", hours=24)
        return {**state, "price_forecast": price_forecast, "grid_capacity": grid_capacity}

    def schedule_node(state):
        schedule = fm.trigger_schedule(
            asset_id="ev_fleet_1",
            flex_model={"max_soc_pct": 95, "min_soc_pct": 20, "prefer_cheap_hours": True},
            flex_context={"price_sensor": "entsoe_da", "grid_sensor": "dso_limit"}
        )
        return {**state, "schedule": schedule}

    def explain_node(state):
        explanation = client.messages.create(
            model="claude-haiku-4-5",
            max_tokens=512,
            messages=[{"role": "user", "content":
                f"Explain this EV charging schedule to a fleet manager: {state['schedule']}\n"
                f"Price forecast: {state['price_forecast']}\n"
                f"Estimated cost savings vs unmanaged charging?"}]
        )
        return {**state, "explanation": explanation.content[0].text}

    graph.add_node("forecast", forecast_node)
    graph.add_node("schedule", schedule_node)
    graph.add_node("explain", explain_node)
    graph.add_edge("forecast", "schedule")
    graph.add_edge("schedule", "explain")
    graph.set_entry_point("forecast")
    return graph.compile()

fleet_agent = create_ev_fleet_agent()
result = fleet_agent.invoke({"fleet_id": "depot_BR_001", "date": "2026-07-15"})
print(result["explanation"])
```

**Repos**: [EVerest/EVerest](https://github.com/EVerest/EVerest) + [FlexMeasures/flexmeasures](https://github.com/FlexMeasures/flexmeasures)
**Revenue angle**: DR revenue from managed charging can offset 20-40% of charging costs for large fleets.

---

## P4 — Building Energy MARL Demand Response

**Goal**: Coordinate 50-200 buildings with shared MARL policy to reduce district peak demand 20-40%.

**Stack**: CityLearn + Stable-Baselines3 (MAPPO) + FlexMeasures (OpenADR dispatch)

```python
from citylearn.citylearn import CityLearnEnv
from citylearn.wrappers import NormalizedObservationWrapper
from stable_baselines3 import PPO
from stable_baselines3.common.vec_env import DummyVecEnv

schema = {
    "buildings": [f"Building_{i}" for i in range(50)],
    "simulation_start_date": "2026-01-01",
    "simulation_end_date": "2026-12-31",
    "reward_function": "IndependentSACReward"
}
env = NormalizedObservationWrapper(CityLearnEnv(schema=schema))
vec_env = DummyVecEnv([lambda: env])

model = PPO("MlpPolicy", vec_env, verbose=1, n_steps=8760, batch_size=256, n_epochs=10)
model.learn(total_timesteps=2_000_000)
# Actions → FlexMeasures → OpenADR → BMS
```

**Repos**: [intelligent-environments-lab/CityLearn](https://github.com/intelligent-environments-lab/CityLearn) + FlexMeasures
**LATAM fit**: Colombia (IPSE rural microgrids), Chile (solar curtailment management)

---

## P5 — AI-Augmented SCADA Operations

**Goal**: Add conversational AI to existing SCADA — explain alarms, diagnose faults, suggest corrective actions.

**Stack**: RapidSCADA + PowerMCP + LangGraph + Claude API

```python
from langgraph.graph import StateGraph, MessagesState
from anthropic import Anthropic
import requests

client = Anthropic()
SCADA_API = "http://rapidscada-server:8888/api"

def build_scada_assistant():
    graph = StateGraph(MessagesState)

    def fetch_alarms(state):
        alarms = requests.get(f"{SCADA_API}/alarms/active").json()
        critical = [a for a in alarms if a["severity"] in ("HIGH", "CRITICAL")]
        return {"messages": state["messages"] + [
            {"role": "tool", "content": f"Active critical alarms: {critical}"}
        ]}

    def diagnose(state):
        response = client.messages.create(
            model="claude-sonnet-5",
            max_tokens=2048,
            system="""You are a power systems control room expert.
            Analyze SCADA alarms, identify root cause, and suggest corrective actions.
            Prioritize safety: never suggest actions that could cause cascading failures.
            Format: Root Cause | Affected Equipment | Immediate Action | Long-term Fix""",
            messages=state["messages"]
        )
        return {"messages": state["messages"] + [response]}

    graph.add_node("fetch_alarms", fetch_alarms)
    graph.add_node("diagnose", diagnose)
    graph.add_edge("fetch_alarms", "diagnose")
    graph.set_entry_point("fetch_alarms")
    return graph.compile()

assistant = build_scada_assistant()
result = assistant.invoke({"messages": [
    {"role": "user", "content": "We have 3 transformer alarms on feeder F-12 after the storm"}
]})
```

**Repos**: [RapidSCADA](https://rapidscada.org/) + [Power-Agent/PowerMCP](https://github.com/Power-Agent/PowerMCP)
**LATAM fit**: Industrial utilities in MX, BR, AR where SCADA is established but AI layer is missing.

---

## P6 — AI Datacenter-Grid Coordination

**Goal**: Help AI infrastructure clients design demand-response strategies to accelerate grid interconnection.

**Stack**: OpenG2G + LangGraph optimization agent + utility API

```python
from openg2g import DatacenterGridSimulator, InferenceWorkload, GridBackend
from anthropic import Anthropic

client = Anthropic()

def datacenter_flexibility_analysis(
    datacenter_config: dict,
    grid_model: str,
    interconnection_capacity_mw: float
) -> dict:
    sim = DatacenterGridSimulator(
        datacenter=InferenceWorkload(**datacenter_config),
        grid=GridBackend(model=grid_model),
        timestep_minutes=5
    )
    baseline = sim.run(controller="passthrough", duration_hours=24)
    flex = sim.run(controller="inference_scheduler",
                   target_peak_mw=interconnection_capacity_mw,
                   duration_hours=24)
    analysis = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        messages=[{"role": "user", "content":
            f"Baseline peak: {baseline.peak_demand_mw:.1f} MW\n"
            f"Interconnection limit: {interconnection_capacity_mw:.1f} MW\n"
            f"Flexible schedule peak: {flex.peak_demand_mw:.1f} MW\n"
            f"Inference SLA impact: {flex.p99_latency_vs_baseline:.1%}\n\n"
            f"Recommend DR contract strategy and estimated queue-jump benefit?"}]
    )
    return {"simulation": flex, "recommendation": analysis.content[0].text}
```

**Repos**: [gpu2grid/openg2g](https://github.com/gpu2grid/openg2g) + Claude API
**Market**: Every hyperscaler and colo provider building >100 MW AI compute faces this problem.

---

## P7 — VPP Orchestration (FlexMeasures + OpenADR)

**Goal**: Aggregate distributed assets (batteries, EV chargers, HVAC) into a virtual power plant.

**Stack**: FlexMeasures + OpenADR 2.0 + LangGraph + PowerFM demand forecasting

```python
from flexmeasures_client import FlexMeasuresClient
from anthropic import Anthropic

fm = FlexMeasuresClient(url="https://vpp.flexmeasures.io")
client = Anthropic()

def vpp_daily_bid(assets: list, market_date: str) -> dict:
    total_flex_up_kw = sum(fm.get_flex_capacity(a, direction="up") for a in assets)
    total_flex_down_kw = sum(fm.get_flex_capacity(a, direction="down") for a in assets)

    bid_strategy = client.messages.create(
        model="claude-haiku-4-5",
        max_tokens=512,
        messages=[{"role": "user", "content":
            f"VPP portfolio: {len(assets)} assets\n"
            f"Available flex up: {total_flex_up_kw:.0f} kW\n"
            f"Available flex down: {total_flex_down_kw:.0f} kW\n"
            f"Day-ahead prices (EUR/MWh): {fm.get_da_prices(market_date)}\n\n"
            f"Suggest optimal bid: volume, price floor, activation probability?"}]
    )

    schedule = fm.trigger_schedule(
        asset_group="vpp_portfolio_1",
        flex_model={"bid_strategy": bid_strategy.content[0].text},
        flex_context={"market": "day_ahead", "openADR_endpoint": "https://utility.oadr.io"}
    )
    return {"bid_strategy": bid_strategy.content[0].text, "schedule": schedule}
```

**Repos**: [FlexMeasures/flexmeasures](https://github.com/FlexMeasures/flexmeasures) + [Power-Agent/PowerFM](https://github.com/Power-Agent/PowerFM)
**Revenue model**: VPP operators earn $15-40/MWh capacity payments; Globant builds and operates the platform.

---

## P8 — Grid Foundation Model Fine-Tuning (LATAM Utility)

**Goal**: Fine-tune OpenGridFM on a LATAM utility's grid data for load forecasting + fault prediction.

**Stack**: OpenGridFM + PowerFM + utility SCADA historian + Anthropic API

```python
from opengridfm import GridFMTrainer, GridSimulator, NetworkTopology
from anthropic import Anthropic
import pandas as pd

# Load utility grid topology (ANAREDE / PSS/E format common in LATAM)
network = NetworkTopology.from_psse("/data/utility_mx_network.raw")
simulator = GridSimulator(network)

# Generate synthetic training profiles
trainer = GridFMTrainer(
    simulator=simulator,
    n_scenarios=50_000,
    weather_integration=True,
    output_dir="/data/gridfm_pretraining"
)
trainer.generate_profiles()

# Fine-tune PowerFM on utility historical data
historical = pd.read_parquet("/data/utility_mx_historian_2022_2026.parquet")
trainer.fine_tune(
    base_model="PowerFM/powerFM-base",
    training_data=historical,
    tasks=["load_forecast_15min", "fault_detection", "voltage_anomaly"],
    output_model="/models/utility_mx_gridfm_v1"
)

# Deploy as LLM tool
client = Anthropic()
def grid_forecast_with_llm(query: str):
    return client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        tools=[{
            "name": "load_forecast",
            "description": "Forecast load for utility MX grid (fine-tuned GridFM)",
            "input_schema": {"type": "object", "properties": {
                "horizon_hours": {"type": "integer"},
                "substation_id": {"type": "string"}
            }}
        }],
        messages=[{"role": "user", "content": query}]
    )
```

**Repos**: [LF Energy OpenGridFM](https://lfenergy.org/projects/opengridfm/) + [Power-Agent/PowerFM](https://github.com/Power-Agent/PowerFM)
**LATAM fit**: Utility SCADA historians in BR/MX/CL hold 10-20 years of grid data — perfect for GridFM fine-tuning.
