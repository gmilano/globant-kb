# Composition Patterns — Energy AI

> Concrete recipes for building AI solutions using the identified repos + agents.
> Each pattern names the specific repos, shows how to wire them, and gives a delivery estimate.
> Last updated: 2026-07-07

---

## Pattern 1: Smart Grid Anomaly Detection Agent (OpenEMS + LangGraph + Claude)

**Use case:** Monitor an energy management system in real time. Detect abnormal consumption, generation, or storage behavior. Alert operators and suggest root causes.

**Stack:**
- `OpenEMS/openems` — energy management IoT backbone (AGPL/EPL)
- `langchain-ai/langgraph` — agent orchestration (MIT)
- Anthropic Claude API (`claude-sonnet-5`) — anomaly reasoning
- Slack/WhatsApp (Twilio) — operator notification

**Architecture:**
```
OpenEMS REST API (real-time: meter readings, device states, PV output, battery SoC)
    ↓ (poll every 60s)
LangGraph supervisor agent
    ├── data_agent: fetch + normalize telemetry
    ├── baseline_agent: compare vs. expected profile (time-of-week + weather)
    ├── anomaly_agent: Claude assesses deviations → severity + root cause
    └── alert_agent: notify operator if severity > threshold
    ↓
Operator dashboard + Slack #grid-alerts
```

**Key code — Anomaly Assessment Agent:**
```python
from langgraph.graph import StateGraph, END
from anthropic import Anthropic

client = Anthropic()

def anomaly_agent(state: dict) -> dict:
    telemetry = state["telemetry"]
    baseline = state["baseline"]
    
    prompt = f"""
    Site: {telemetry['site_id']} — {telemetry['site_name']}
    Current readings:
    - Grid import: {telemetry['grid_import_kw']} kW (baseline: {baseline['grid_import_kw']} kW)
    - Solar PV output: {telemetry['pv_output_kw']} kW (expected: {baseline['pv_output_kw']} kW)
    - Battery SoC: {telemetry['battery_soc_pct']}% (target range: {baseline['soc_target_range']})
    - Total consumption: {telemetry['consumption_kw']} kW (baseline: {baseline['consumption_kw']} kW)
    Weather: {telemetry['weather_condition']}, {telemetry['irradiance_wm2']} W/m²
    
    Is this anomalous? If yes: what is the most likely cause and what should the operator do?
    Rate severity: low / medium / high / critical.
    """
    
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=600,
        messages=[{"role": "user", "content": prompt}]
    )
    
    return {
        **state,
        "anomaly_assessment": response.content[0].text,
        "alert_required": state["deviation_pct"] > 25
    }
```

**Delivery estimate:** 3-5 weeks  
**Cost at scale:** ~$0.02-0.05 per site per day (Claude API, 100-site portfolio)  
**LATAM fit:** Excellent — Brazilian and Chilean utilities managing distributed solar + storage portfolios

---

## Pattern 2: Demand Response RL Agent (CityLearn + LangGraph + Claude)

**Use case:** Optimize energy consumption across a commercial building or campus. RL agent controls HVAC, EV charging, and battery to minimize peak demand and costs. Claude explains decisions to building managers.

**Stack:**
- `intelligent-environments-lab/CityLearn` — RL training environment (MIT)
- `Stable-Baselines3` — RL training (MIT)
- `langchain-ai/langgraph` — orchestration for multi-building coordination (MIT)
- Anthropic Claude API — plain-language explainer for building managers

**Architecture:**
```
CityLearn environment (simulation on historical building data)
    ↓
PPO/SAC RL agent training (Stable-Baselines3)
    ↓
Export trained policy (ONNX)
    ↓
Production deployment:
    Building BMS → state → RL policy → control commands → HVAC/EV/Battery
    ↓
LangGraph explanation layer:
    └── Claude explains actions to building manager in plain language
        "Battery discharging now to reduce peak — saving ~$180 vs. grid import"
```

**Key code — Training and Deployment:**
```python
from citylearn.citylearn import CityLearnEnv
from citylearn.wrappers import NormalizedObservationWrapper
from stable_baselines3 import SAC
from anthropic import Anthropic

# Training phase
env = CityLearnEnv(schema="my_building.json")
env = NormalizedObservationWrapper(env)
model = SAC("MlpPolicy", env, verbose=1)
model.learn(total_timesteps=500_000)
model.save("building_demand_response_policy")

# Production inference with LLM explainer
client = Anthropic()

def act_and_explain(building_state: dict) -> dict:
    # RL policy decides action
    obs = normalize_state(building_state)
    action, _ = model.predict(obs, deterministic=True)
    
    # Claude explains the action
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=200,
        messages=[{"role": "user", "content": f"""
        Building state: {building_state}
        RL agent decided: {interpret_action(action)}
        Explain this decision in one sentence for a non-technical building manager.
        Focus on cost and comfort impact.
        """}]
    )
    
    return {
        "action": action.tolist(),
        "explanation": response.content[0].text,
        "estimated_savings_usd": estimate_savings(action, building_state)
    }
```

**Delivery estimate:** 5-8 weeks (includes RL training on client building data)  
**ROI baseline:** 10-20% peak demand reduction; 15-25% energy cost savings for flexible loads  
**LATAM fit:** High — São Paulo commercial real estate (high electricity tariffs); Chilean office parks with solar + storage

---

## Pattern 3: Utility Load Forecasting Agent (OpenSTEF + LangGraph + Claude)

**Use case:** A distribution utility needs accurate 24-48h load forecasts for grid balancing. AutoML pipeline trains and maintains forecasting models. Claude generates operator-facing forecast summaries and flags unusual demand patterns.

**Stack:**
- `OpenSTEF/openstef` — AutoML energy forecasting pipeline (Apache-2.0)
- `langchain-ai/langgraph` — orchestration (MIT)
- Weather API (INMET Brazil / DMC Chile / Open-Meteo)
- Anthropic Claude API — narrative forecast summaries
- Langfuse — forecast accuracy tracking

**Architecture:**
```
Smart meter AMI data (15-min intervals) + Weather forecast
    ↓
OpenSTEF AutoML pipeline
    → Feature engineering (load lags, temperature, day-of-week, holidays)
    → Model selection + training (XGBoost/LightGBM)
    → Probabilistic output: P10 / P50 / P90 for next 48h
    ↓
LangGraph forecast agent
    ├── quality_checker: flag anomalous forecasts (vs. last week same day)
    ├── narrative_agent: Claude writes operator briefing from forecast data
    └── alert_agent: flag scenarios requiring operator action
    ↓
Operator dashboard + morning briefing email
```

**Key code — Forecast + Narrative Agent:**
```python
from openstef.pipeline.optimize_hyperparameters import optimize_hyperparameters_pipeline
from openstef.pipeline.create_forecast import create_forecast_pipeline
from anthropic import Anthropic

client = Anthropic()

def generate_forecast_briefing(forecast_df, grid_metadata: dict) -> str:
    peak_hour = forecast_df.loc[forecast_df["forecast"].idxmax()]
    valley_hour = forecast_df.loc[forecast_df["forecast"].idxmin()]
    uncertainty_band = (
        forecast_df["forecast_solar_upper"] - forecast_df["forecast_solar_lower"]
    ).mean()
    
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=400,
        system="You are a power grid operations analyst. Write concise, actionable briefings for grid operators.",
        messages=[{"role": "user", "content": f"""
        Grid: {grid_metadata['name']} — {grid_metadata['region']}
        Forecast period: next 48 hours
        
        Key metrics:
        - Peak demand: {peak_hour['forecast']:.1f} MW at {peak_hour.name.strftime('%H:%M')} tomorrow
        - Valley demand: {valley_hour['forecast']:.1f} MW at {valley_hour.name.strftime('%H:%M')}
        - P90 vs P10 uncertainty band: ±{uncertainty_band:.1f} MW avg
        - Renewable generation forecast: {grid_metadata['renewables_pct']}% of expected supply
        
        Write a 3-sentence operator briefing: what to expect, any concerns, recommended action.
        """}]
    )
    
    return response.content[0].text
```

**Delivery estimate:** 4-6 weeks  
**Cost per utility:** ~$500-2,000/month (Claude API + infrastructure for 1M meter network)  
**LATAM fit:** Excellent — Brazilian AMI rollout (85M meters by 2028); Alliander-tested model transfers to LATAM data

---

## Pattern 4: Grid Planning LLM Agent (PyPSA + PowerMCP + Claude)

**Use case:** Power system planning engineer asks natural language questions about grid impact of new renewable projects, transmission upgrades, or demand growth scenarios. Claude uses PowerMCP to run PyPSA simulations and interpret results.

**Stack:**
- `PyPSA/PyPSA` + `pypsa-meets-earth/pypsa-earth` — power system models (MIT)
- `Power-Agent/PowerMCP` — MCP servers for power system software (MIT)
- Anthropic Claude API — reasoning + interpretation
- FastAPI — REST endpoint for planning teams

**Architecture:**
```
Planning engineer query (natural language)
    ↓
Claude (via PowerMCP as MCP tools)
    ├── load_grid_model(region="brazil_south")
    ├── add_generator(type="wind", capacity_mw=500, location="RS")
    ├── run_optimal_power_flow()
    ├── get_congestion_report()
    └── compute_curtailment_delta()
    ↓
Claude interprets OPF results → narrative + tables → planning team
```

**Key code — Planning Agent:**
```python
from anthropic import Anthropic

client = Anthropic()

# PowerMCP tools are exposed as Claude tools via MCP
def run_grid_planning_query(engineer_question: str, grid_region: str) -> str:
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2000,
        system=f"""You are a power systems planning expert. You have access to PyPSA grid models
        via PowerMCP tools. When analyzing grid scenarios:
        1. Always run a baseline OPF before adding new generation/load
        2. Report congestion in MW and $/h terms
        3. Quantify curtailment as % of potential generation
        4. Recommend mitigation options with rough cost estimates
        Grid region: {grid_region}""",
        messages=[{"role": "user", "content": engineer_question}]
        # PowerMCP tools injected via MCP configuration (Claude Desktop / Claude Code)
    )
    return response.content[0].text

# Example call:
result = run_grid_planning_query(
    engineer_question="""What is the impact of adding 1 GW of offshore wind in 
    the coast of Santa Catarina on transmission congestion to São Paulo?
    What transmission upgrades would be needed?""",
    grid_region="brazil"
)
```

**Delivery estimate:** 4-6 weeks (PyPSA-Earth Brazil model + PowerMCP integration + UI)  
**Target clients:** ANEEL (Brazilian regulator), EPE (energy planning), transmission utilities (Taesa, Cteep)  
**LATAM fit:** High — Brazilian energy transition requires massive grid planning for offshore wind + solar expansion

---

## Pattern 5: Renewable Asset Predictive Maintenance Agent

**Use case:** Monitor wind farm or solar plant SCADA data. Predict equipment failures 48-72 hours in advance. Auto-schedule maintenance and order spare parts.

**Stack:**
- `emoncms/emoncms` or plant SCADA (MQTT/OPC-UA) — telemetry data (AGPL)
- `langchain-ai/langgraph` — orchestration (MIT)
- `scikit-learn` + `statsmodels` — anomaly detection (BSD/MIT)
- Anthropic Claude API (`claude-sonnet-5`) — maintenance diagnosis
- CMMS integration (SAP PM / Maximo / Limble)

**Architecture:**
```
Wind/Solar SCADA data (turbine vibration, temp, power output, nacelle direction)
    ↓ MQTT / OPC-UA / REST
LangGraph Maintenance Agent
    ├── telemetry_reader: normalize SCADA signals to standard units
    ├── anomaly_detector: Z-score + isolation forest on sensor streams
    ├── forecaster: predict RUL (Remaining Useful Life) via LSTM on vibration data
    ├── diagnosis_agent: Claude identifies failure mode from sensor pattern
    ├── parts_agent: check CMMS inventory + generate PO if part needed
    └── scheduler_agent: book maintenance window avoiding peak generation hours
    ↓
CMMS work order + Slack #maintenance-wind-farm
```

**Key code — Diagnosis Agent:**
```python
def wind_turbine_diagnosis(state: dict) -> dict:
    sensor = state["sensor_readings"]
    turbine = state["turbine_metadata"]
    anomaly_score = state["anomaly_score"]
    
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=800,
        system="You are a wind turbine maintenance expert. Analyze sensor patterns and identify failure modes.",
        messages=[{"role": "user", "content": f"""
        Turbine: {turbine['id']} — {turbine['model']} — {turbine['site']}
        Wind conditions: {sensor['wind_speed_ms']} m/s, direction {sensor['wind_dir_deg']}°
        
        Sensor readings (vs. baseline):
        - Main bearing vibration: {sensor['bearing_vib_mm_s']} mm/s (baseline: {turbine['baseline_vib']} mm/s)
        - Gearbox oil temp: {sensor['gearbox_oil_temp_c']}°C (max: {turbine['gearbox_temp_max']}°C)
        - Generator winding temp: {sensor['gen_winding_temp_c']}°C
        - Power output: {sensor['power_kw']} kW (expected at this wind: {sensor['expected_power_kw']} kW)
        - Rotor speed: {sensor['rotor_rpm']} RPM
        
        Anomaly score: {anomaly_score:.2f} (alert threshold: 0.70)
        
        Diagnose: What is the likely failure mode? Estimated hours to failure? 
        Which maintenance action? Priority: routine / urgent / emergency?
        """}]
    )
    
    return {
        **state,
        "diagnosis": response.content[0].text,
        "maintenance_required": anomaly_score > 0.70
    }
```

**Delivery estimate:** 6-9 weeks (includes SCADA integration + CMMS connector)  
**ROI baseline:** Avoid one major gearbox failure = $300K-$800K savings; predictive maintenance reduces O&M costs 20-30%  
**LATAM fit:** High — Chilean and Brazilian wind farms (Rio Grande do Norte, Ceará, Atacama) with 10-20 year asset lives

---

## Pattern 6: Energy Procurement AI Agent (PPA + Carbon + Cost Optimizer)

**Use case:** Data center or large industrial consumer needs to optimize energy procurement — mix of PPAs (Power Purchase Agreements), spot market, and on-site renewables — while minimizing cost and maximizing renewable percentage for carbon reporting.

**Stack:**
- `PyPSA/PyPSA` or `oemof/oemof-solph` — energy system modeling (MIT)
- `langchain-ai/langgraph` — orchestration (MIT)
- Electricity market API (CCEE Brazil / CEN Chile / MISO/CAISO)
- Anthropic Claude API — strategy reasoning + report generation
- Carbon accounting: custom GHG protocol implementation

**Architecture:**
```
Data Center / Industrial Consumer
    Energy demand forecast (next 12 months, hourly granularity)
    +
Market data (spot prices, PPA offers, renewable certificates)
    +
Carbon goals (Scope 2 target, RE100 commitment)
    ↓
LangGraph Procurement Optimizer
    ├── demand_forecaster: predict load profile with growth assumptions
    ├── market_reader: fetch spot + forward electricity prices
    ├── portfolio_optimizer: PyPSA/oemof OPF for optimal PPA mix
    ├── carbon_accountant: compute Scope 2 emissions per scenario
    └── report_generator: Claude writes procurement strategy memo
    ↓
Procurement recommendation:
    - Optimal PPA mix (MW by source + geography + term)
    - Expected cost vs. all-spot baseline
    - Renewable % trajectory to meet RE100 target
    - Carbon credit purchases needed to fill gap
```

**Estimated savings:** 15-30% energy cost reduction vs. all-spot procurement; 100% renewable target achievable in 2-3 years with optimized PPA portfolio  
**Delivery estimate:** 6-10 weeks  
**LATAM fit:** Excellent — Brazilian data centers (AWS, Google, Microsoft building in São Paulo) need renewable PPAs given RE100 commitments; Chilean solar oversupply creates attractive PPA pricing

---

## Pattern Selection Guide

| Client scenario | Pattern | Time | Complexity |
|----------------|---------|------|------------|
| Building / campus energy management | Pattern 1: Smart Grid Anomaly Detection | 3-5 wk | Low |
| Commercial building demand response | Pattern 2: CityLearn RL Agent | 5-8 wk | Medium |
| Distribution utility (AMI rollout) | Pattern 3: Load Forecasting Agent | 4-6 wk | Medium |
| Grid planning / regulatory | Pattern 4: PyPSA + PowerMCP | 4-6 wk | Medium |
| Wind / solar farm O&M | Pattern 5: Predictive Maintenance | 6-9 wk | Medium |
| Data center / large industrial | Pattern 6: Procurement Optimizer | 6-10 wk | High |

---
*Auto-updated by the ingest pipeline.*
