# 🧩 Composition Patterns — Energy

> Concrete recipes for building energy AI solutions by wiring together real repos and agents.
> Each recipe names specific repos, integration points, and realistic timelines.
> Last updated: 2026-07-06

## Base Pattern

```
[Open-source vertical platform (EMS / Grid sim / IoT)]
          ↓
[Data pipeline (MQTT / REST / SCADA adapter)]
          ↓
[LangGraph / CrewAI agent orchestration layer]
          ↓
[LLM reasoning (Claude API / Ollama for on-prem)]
          ↓
[Operator UI (Streamlit / React dashboard)]
```

---

## Pattern 1: Agentic DERMS — DER Dispatch Agent

**Problem**: Utility has 50-500 MW of distributed solar, BESS, and EV chargers. Rule-based dispatch leaves 15-25% value on the table.

**Stack**:
- **Grid model**: [PyPSA](https://github.com/PyPSA/PyPSA) (MIT) — AC OPF, multi-period dispatch
- **Platform**: [GridAPPS-D](https://github.com/GRIDAPPSD/GRIDAPPSD) (BSD-3) — SCADA bridge, asset APIs
- **Forecasting**: [pvlib](https://github.com/pvlib/pvlib-python) (BSD-3) + [NREL/Wattile](https://github.com/NREL/Wattile) (BSD-3)
- **Agent framework**: [LangGraph](https://github.com/langchain-ai/langgraph) (MIT)
- **LLM**: Claude Haiku 4.5 (fast + cheap for real-time decisions)

**Architecture**:
```
GridAPPS-D SCADA ──► LangGraph supervisor agent
                           ├── Forecasting subagent (pvlib + Wattile)
                           ├── OPF subagent (PyPSA dispatch)
                           ├── BESS scheduler subagent
                           └── Alert/explanation subagent (Claude Haiku)
```

**Key integration points**:
1. GridAPPS-D REST API → LangGraph tool `get_grid_state()`
2. pvlib hourly solar forecast → state input to OPF subagent
3. PyPSA `network.optimize()` → optimal dispatch per asset
4. Claude Haiku explains dispatch decision to operator in plain language

**Estimated timeline**: 8-10 weeks (POC: 3 weeks)
**Expected ROI**: 15-25% BESS revenue increase, 10-15% curtailment reduction

---

## Pattern 2: Building Energy Optimizer (RL-based HVAC)

**Problem**: Commercial building HVAC = 40-50% of total energy. Rule-based controls are inefficient. RL agents can cut costs 15-25%.

**Stack**:
- **Simulation env**: [Sinergym](https://github.com/ugr-sail/sinergym) (MIT) over EnergyPlus
- **RL framework**: [Stable-Baselines3](https://github.com/DLR-RM/stable-baselines3) (MIT) — PPO or SAC agent
- **EMS platform**: [MyEMS](https://github.com/myems/myems) (MIT) — production monitoring + control
- **Monitoring**: Grafana + InfluxDB (OSS)
- **LLM layer**: [rl-testbed-for-energyplus](https://github.com/IBM/rl-testbed-for-energyplus) (MIT) adapted + Claude API for explanation

**Architecture**:
```
EnergyPlus building model
       ↓
Sinergym Gym environment
       ↓
SB3 PPO agent (train offline 1-2 weeks)
       ↓
MyEMS real-time controller (deploy trained policy)
       ↓
Claude API: "Why did the agent lower setpoint to 22°C at 3pm?"
```

**Training recipe**:
```python
import sinergym
import gymnasium as gym
from stable_baselines3 import PPO

env = gym.make('Eplus-5Zone-hot-continuous-v1')
model = PPO('MlpPolicy', env, verbose=1, tensorboard_log='./tb/')
model.learn(total_timesteps=1_000_000)
model.save('hvac_policy')
```

**Estimated timeline**: 5-7 weeks (sim train + MyEMS deploy)
**Expected ROI**: 15-25% HVAC energy reduction on TOU tariffs

---

## Pattern 3: Renewable Energy Forecasting Agent

**Problem**: Solar/wind IPP needs 24-72 hour generation forecasts for grid commitments and curtailment minimization.

**Stack**:
- **Solar modeling**: [pvlib](https://github.com/pvlib/pvlib-python) (BSD-3) — physics-based irradiance → power
- **Wind modeling**: [windpowerlib](https://github.com/wind-python/windpowerlib) (MIT) — power curves, wake effects
- **Probabilistic forecast**: [NREL/Wattile](https://github.com/NREL/Wattile) (BSD-3) — LSTM + uncertainty
- **Weather data**: ERA5 reanalysis via [NREL/rex](https://github.com/NREL/rex) (BSD-3)
- **Agent**: LangGraph — orchestrates forecast pipeline, handles re-training triggers
- **Reporting**: Claude API — generate plain-language daily forecast briefings

**Architecture**:
```
ERA5/NWP weather data (hourly)
       ↓
pvlib irradiance → PV power (or windpowerlib for wind)
       ↓
Wattile LSTM → probabilistic P10/P50/P90 forecast
       ↓
LangGraph agent: decides if re-training triggered (MAE > threshold)
       ↓
Claude API: "Tomorrow's solar output: 42 MWh ±8. Recommend holding back 3 MW reserve."
```

**Estimated timeline**: 4-6 weeks
**Expected ROI**: 5-12% reduction in imbalance penalties, better grid commitment bids

---

## Pattern 4: Carbon-Aware AI Workload Scheduler

**Problem**: Enterprise running ML training, batch jobs, data processing. Energy cost + carbon footprint both reducible by shifting workloads to green grid windows.

**Stack**:
- **Carbon data**: [electricitymap-contrib](https://github.com/tmrowco/electricitymap-contrib) (MIT) — real-time CI per grid zone
- **Scheduler**: LangGraph agent with Kubernetes/cloud batch job APIs as tools
- **LLM**: Claude Haiku 4.5 — fast decisions on defer/run
- **Integration**: electricityMap REST API (free tier covers 5 countries)

**Architecture**:
```
electricityMap API (carbon intensity, now + 24h forecast)
       ↓
LangGraph scheduler agent
   ├── tool: get_carbon_intensity(zone, hours=24)
   ├── tool: list_pending_jobs(priority='deferrable')
   ├── tool: schedule_job(job_id, start_time)
   └── tool: send_slack_notification(message)
LLM decision: "Defer 3 training jobs 6h → save 40% carbon, $280 cost"
```

**Integration snippet**:
```python
from langchain_anthropic import ChatAnthropic
from langgraph.graph import StateGraph

def get_carbon_intensity(zone: str) -> dict:
    r = requests.get(f"https://api.electricitymap.org/v3/carbon-intensity/latest?zone={zone}",
                     headers={"auth-token": EM_TOKEN})
    return r.json()
```

**Estimated timeline**: 2-3 weeks (quickest win in energy portfolio)
**Expected ROI**: 20-40% carbon reduction for deferrable workloads; 5-15% cost saving off-peak

---

## Pattern 5: Grid Operator AI Assistant (LLM + SCADA)

**Problem**: Grid operators handle 100-500 alarms/shift. 80% are false positives or low-priority. LLM assistant triages, annotates, and suggests actions.

**Stack**:
- **Platform**: [OperatorFabric](https://github.com/opfab/operatorfabric-core) (MPL-2.0) — card-based operator UI
- **Grid model**: [pandapower](https://github.com/e2nIEE/pandapower) (BSD-3) — real-time state estimation
- **Agent**: LangGraph with RAG over grid topology docs, operating procedures
- **LLM**: Claude Sonnet 5 — complex grid event reasoning
- **Vector store**: FAISS (MIT) — index of NOC procedures, historical incidents

**Architecture**:
```
SCADA alarm feed → OperatorFabric REST
       ↓
LangGraph triage agent
   ├── Classify alarm (tool: pandapower state check)
   ├── RAG lookup: relevant operating procedure
   ├── Generate annotation (Claude Sonnet): "Transformer T-221 thermal alarm.
   │   Cause: 98% loading for 45min. Recommended action: Transfer load to T-223."
   └── Push card back to OperatorFabric operator console
```

**Estimated timeline**: 10-14 weeks (SCADA integration + NOC procedure RAG build)
**Expected ROI**: 60-80% reduction in alarm fatigue; operator response time -40%

---

## Pattern 6: PyPSA-Earth National Energy Transition Modeler

**Problem**: Ministry of Energy / IPP needs to model scenarios: "What does 80% renewable by 2035 cost? Where do we need new transmission?"

**Stack**:
- **Model**: [PyPSA-Earth](https://github.com/pypsa-meets-earth/pypsa-earth) (MIT) — full country network
- **Data**: OSM + ERA5 + entso-e via automated Snakemake pipeline
- **Scenarios**: LangGraph agent parameterizes and runs PyPSA-Earth scenarios
- **LLM**: Claude Opus 4.8 — interprets results, writes policy briefing
- **Visualization**: Plotly + Dash (MIT)

**Architecture**:
```
User NL input: "Model 70% solar + 20% wind scenario for Brazil 2035"
       ↓
LangGraph planning agent
   ├── Parse scenario parameters
   ├── Configure PyPSA-Earth Snakemake config.yaml
   ├── Run: snakemake solve_all_networks (async, 30-120 min)
   ├── Collect results: cost, CO2, transmission expansion
   └── Claude Opus: generate 2-page policy brief with charts
```

**Snakemake trigger from agent**:
```python
import subprocess
def run_pypsa_scenario(config_overrides: dict) -> str:
    with open('config/config.yaml', 'w') as f:
        yaml.dump({**BASE_CONFIG, **config_overrides}, f)
    result = subprocess.run(['snakemake', '-j4', 'solve_all_networks'],
                            capture_output=True, cwd=PYPSA_EARTH_DIR)
    return result.stdout.decode()
```

**Estimated timeline**: 6-8 weeks (data pipeline + scenario UI)
**Expected ROI**: Replace 3-month consultant study with 2-hour AI run; $200K+ per engagement

---
*Each recipe can be delivered as a Globant AI Accelerator (4-week POC) before full build.*
