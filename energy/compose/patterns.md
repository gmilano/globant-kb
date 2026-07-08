# Composition Patterns — Energy AI

> Concrete recipes for building AI solutions using the identified repos + agents.
> Each pattern names the specific repos, shows how to wire them, and gives a delivery estimate.
> Last updated: 2026-07-08 (v3)

---

## Pattern 1: Smart Grid Anomaly Detection Agent (OpenEMS + LangGraph + Claude)

**Use case:** Monitor an energy management system in real time. Detect abnormal consumption, generation, or storage behavior. Alert operators and suggest root causes. Ideal for Brazilian and Chilean utilities managing distributed solar + storage portfolios.

**Stack:**
- `OpenEMS/openems` — energy management IoT backbone (AGPL/EPL)
- `langchain-ai/langgraph` — agent orchestration (MIT)
- Anthropic Claude API (`claude-sonnet-5`) — anomaly reasoning
- Slack/WhatsApp (Twilio) — operator notification (WhatsApp preferred in LATAM)

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
Operator dashboard + WhatsApp #grid-alerts (Portuguese/Spanish)
```

**Key code — Anomaly Assessment Agent:**
```python
from langgraph.graph import StateGraph, END
from anthropic import Anthropic

client = Anthropic()

def anomaly_agent(state: dict) -> dict:
    telemetry = state["telemetry"]
    baseline = state["baseline"]
    lang = state.get("language", "pt-BR")  # Portuguese for Brazil, Spanish for Chile/Colombia

    system_pt = "Você é um analista de operações de rede elétrica. Detecte anomalias e sugira causas raiz."
    system_es = "Eres un analista de operaciones de red eléctrica. Detecta anomalías y sugiere causas raíz."
    system_prompt = system_pt if lang == "pt-BR" else system_es

    prompt = f"""
    Site: {telemetry['site_id']} — {telemetry['site_name']}
    Current readings:
    - Grid import: {telemetry['grid_import_kw']} kW (baseline: {baseline['grid_import_kw']} kW)
    - Solar PV output: {telemetry['pv_output_kw']} kW (expected: {baseline['pv_output_kw']} kW)
    - Battery SoC: {telemetry['battery_soc_pct']}% (target range: {baseline['soc_target_range']})
    - Total consumption: {telemetry['consumption_kw']} kW (baseline: {baseline['consumption_kw']} kW)
    Weather: {telemetry['weather_condition']}, {telemetry['irradiance_wm2']} W/m²

    Is this anomalous? If yes: what is the most likely cause and recommended operator action?
    Rate severity: low / medium / high / critical.
    """

    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=600,
        system=system_prompt,
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

**Use case:** Optimize energy consumption across a commercial building or campus. RL agent controls HVAC, EV charging, and battery to minimize peak demand and costs. Claude explains decisions to building managers in plain language.

**Stack:**
- `intelligent-environments-lab/CityLearn` — RL training environment (MIT)
- `Stable-Baselines3` — RL training (MIT)
- `langchain-ai/langgraph` — orchestration for multi-building coordination (MIT)
- Anthropic Claude API (`claude-sonnet-5`) — plain-language explainer

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
    └── Claude explains actions to building manager in local language
        "A bateria está descarregando agora para reduzir o pico — economizando ~R$180 vs. importação da rede"
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

def act_and_explain(building_state: dict, currency: str = "BRL") -> dict:
    obs = normalize_state(building_state)
    action, _ = model.predict(obs, deterministic=True)

    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=200,
        messages=[{"role": "user", "content": f"""
        Building state: {building_state}
        RL agent decided: {interpret_action(action)}
        Currency: {currency}
        Explain this decision in one sentence for a non-technical building manager.
        Focus on cost and comfort impact. Use Portuguese if currency is BRL.
        """}]
    )

    return {
        "action": action.tolist(),
        "explanation": response.content[0].text,
        "estimated_savings": estimate_savings(action, building_state, currency)
    }
```

**Delivery estimate:** 5-8 weeks (includes RL training on client building data)
**ROI baseline:** 10-20% peak demand reduction; 15-25% energy cost savings for flexible loads
**LATAM fit:** High — São Paulo commercial real estate (high electricity tariffs + TUSD demand charges); Chilean office parks with solar + storage

---

## Pattern 3: Utility Load Forecasting Agent (OpenSTEF + LangGraph + Claude)

**Use case:** A distribution utility needs accurate 24-48h load forecasts for grid balancing. AutoML pipeline trains and maintains forecasting models. Claude generates operator-facing forecast summaries and flags unusual demand patterns.

**Stack:**
- `OpenSTEF/openstef` — AutoML energy forecasting pipeline (Apache-2.0)
- `langchain-ai/langgraph` — orchestration (MIT)
- Weather API (INMET Brazil / DMC Chile / Open-Meteo — free)
- Anthropic Claude API (`claude-sonnet-5`) — narrative forecast summaries
- Langfuse — forecast accuracy tracking

**Architecture:**
```
Smart meter AMI data (15-min intervals) + Weather forecast (INMET/DMC)
    ↓
OpenSTEF AutoML pipeline
    → Feature engineering (load lags, temperature, day-of-week, Brazilian/Chilean holidays)
    → Model selection + training (XGBoost/LightGBM)
    → Probabilistic output: P10 / P50 / P90 for next 48h
    ↓
LangGraph forecast agent
    ├── quality_checker: flag anomalous forecasts (vs. last week same day)
    ├── narrative_agent: Claude writes operator briefing in Portuguese/Spanish
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
    lang = grid_metadata.get("language", "pt-BR")

    system = {
        "pt-BR": "Você é um analista de operações de rede elétrica. Escreva briefings concisos em português.",
        "es": "Eres un analista de operaciones de red eléctrica. Escribe briefings concisos en español."
    }[lang]

    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=400,
        system=system,
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
**LATAM fit:** Excellent — Brazilian AMI rollout (85M meters by 2028); Alliander-tested model transfers to LATAM data with INMET/DMC weather retraining

---

## Pattern 4: Grid Planning LLM Agent (PyPSA + PowerMCP + Claude)

**Use case:** Power system planning engineer asks natural language questions about grid impact of new renewable projects, transmission upgrades, or demand growth scenarios. Claude uses PowerMCP to run PyPSA simulations and interpret results.

**Stack:**
- `PyPSA/PyPSA` + `pypsa-meets-earth/pypsa-earth` — power system models (MIT)
- `Power-Agent/PowerMCP` — MCP servers for power system software (MIT)
- `Power-Agent/PowerSkills` — agent skill library for power system reasoning (MIT)
- Anthropic Claude API (`claude-sonnet-5`) — reasoning + interpretation
- FastAPI — REST endpoint for planning teams

**Architecture:**
```
Planning engineer query (natural language, Portuguese/Spanish)
    ↓
Claude (via PowerMCP as MCP tools + PowerSkills domain knowledge)
    ├── load_grid_model(region="brazil_south")
    ├── add_generator(type="offshore_wind", capacity_mw=1000, location="SC")
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

def run_grid_planning_query(engineer_question: str, grid_region: str, lang: str = "pt-BR") -> str:
    system_map = {
        "pt-BR": "Você é um especialista em planejamento de sistemas de energia elétrica.",
        "es": "Eres un especialista en planificación de sistemas de energía eléctrica."
    }

    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2000,
        system=f"""{system_map[lang]} You have access to PyPSA grid models via PowerMCP tools.
        When analyzing grid scenarios:
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
    engineer_question="""Qual é o impacto de adicionar 1 GW de eólica offshore no
    litoral de Santa Catarina na congestão de transmissão para São Paulo?
    Quais reforços de transmissão seriam necessários?""",
    grid_region="brazil",
    lang="pt-BR"
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
CMMS work order + WhatsApp #maintenance-wind-farm (Spanish/Portuguese)
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
- Anthropic Claude API (`claude-sonnet-5`) — strategy reasoning + report generation
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
    ├── market_reader: fetch spot + forward electricity prices (CCEE/CEN API)
    ├── portfolio_optimizer: PyPSA/oemof OPF for optimal PPA mix
    ├── carbon_accountant: compute Scope 2 emissions per scenario
    └── report_generator: Claude writes procurement strategy memo in English/Portuguese/Spanish
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

## Pattern 7: AI Datacenter-Grid Coordination Agent (OpenG2G Pattern)

**Use case:** A hyperscale data center or AI cloud provider in LATAM needs to intelligently shift AI workloads in time to avoid contributing to peak grid stress — reducing peak demand charges and preventing grid outages while meeting SLAs.

**Context:** LATAM power grids straining under AI data center demand surge (2025-2026). Data center electricity demand surged 17% in 2025 alone. Brazil and Chile are attracting data centers for renewable energy access, but grid infrastructure cannot expand as fast as demand.

**Stack:**
- OpenG2G pattern (arXiv:2605.05519) — datacenter-grid coordination framework
- `langchain-ai/langgraph` — orchestration (MIT)
- Grid operator API (ANEEL/ONS Brazil, CEN Chile) — real-time grid stress signals
- Anthropic Claude API (`claude-sonnet-5`) — workload scheduling strategy
- Kubernetes/Slurm — job scheduler integration for AI workloads

**Architecture:**
```
Grid stress signal (real-time from grid operator / spot price / frequency deviation)
    ↓
LangGraph Grid Coordination Agent
    ├── grid_monitor: poll ONS/CEN API for frequency, reserves, spot price
    ├── forecast_agent: predict grid stress for next 4-8h (OpenSTEF pattern)
    ├── workload_classifier: classify jobs by deferability (batch / streaming / real-time)
    ├── scheduling_agent: Claude decides optimal job deferral/migration strategy
    └── executor: push scheduling commands to Kubernetes / Slurm
    ↓
AI workload scheduler (defer batch jobs during peak, run during valley)
```

**Key code — Grid-Aware Workload Scheduler:**
```python
from anthropic import Anthropic
import httpx

client = Anthropic()

def schedule_with_grid_awareness(
    pending_jobs: list[dict],
    grid_status: dict,
    price_forecast: list[float]
) -> dict:
    """Defer deferrable AI jobs when grid is stressed; run during cheap/clean periods."""

    deferrable = [j for j in pending_jobs if j["type"] == "batch"]
    urgent = [j for j in pending_jobs if j["type"] in ("streaming", "real-time")]

    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=800,
        system="""You are an AI workload scheduler optimizing for grid friendliness and cost.
        Defer batch jobs during peak grid stress. Run them during low-stress periods.
        Always prioritize real-time and streaming jobs.""",
        messages=[{"role": "user", "content": f"""
        Current grid status:
        - Grid frequency: {grid_status['frequency_hz']} Hz (nominal: 60 Hz)
        - Reserve margin: {grid_status['reserve_margin_pct']}%
        - Current spot price: R${grid_status['spot_price_brl_mwh']}/MWh
        - Grid stress level: {grid_status['stress_level']}  # low/medium/high/critical

        Spot price forecast (next 8h, hourly): {price_forecast}

        Deferrable batch jobs ({len(deferrable)} jobs, total GPU-hours: {sum(j['gpu_hours'] for j in deferrable)}):
        {deferrable}

        Urgent jobs that MUST run now: {urgent}

        Decide: which batch jobs to defer and to what time? Justify based on grid stress and price.
        Format: {{"run_now": [...], "defer_to": {{"job_id": "HH:MM", ...}}}}
        """}]
    )

    return {
        "schedule": response.content[0].text,
        "estimated_cost_savings_brl": estimate_savings(deferrable, price_forecast),
        "grid_stress_avoided_mwh": estimate_peak_reduction(deferrable)
    }
```

**Delivery estimate:** 4-7 weeks
**ROI baseline:** 15-25% reduction in peak demand charges (TUSD Demanda in Brazil); avoidance of grid emergency penalties; carbon footprint reduction via load shifting to high-renewable periods
**LATAM fit:** Excellent — Brazil data center boom (AWS, Google, Microsoft in São Paulo / Rio) urgently needs this as grid strain grows

---

## Pattern 8: RL Grid Operations Pilot (Grid2Op + RL2Grid + TSO Interface)

**Use case:** A transmission or distribution system operator wants to pilot RL-based grid operations — where an RL agent recommends topological reconfigurations to resolve overloads, validated against the RL2Grid benchmark.

**Stack:**
- `Grid2op/grid2op` — grid RL simulation environment (MPL v2.0)
- `Stable-Baselines3` — RL training (MIT)
- `intelligent-environments-lab/CityLearn` — demand-side companion (MIT)
- Anthropic Claude API — natural language explanation of RL agent decisions to operators

**Architecture:**
```
Grid2Op environment (realistic power grid with N-1 security constraints)
    ↓
RL agent training:
    State: line flows + topology + generation dispatch
    Action: line switching + redispatch
    Reward: -overloads - curtailment - topology_complexity
    ↓
RL2Grid benchmark evaluation (standardized performance score)
    ↓
Human-in-the-loop pilot:
    RL agent suggests action → Claude explains in plain language → operator approves/rejects
    ↓
TSO decision support dashboard
```

**Key code — RL + LLM Explanation:**
```python
import grid2op
from stable_baselines3 import PPO
from anthropic import Anthropic

client = Anthropic()

env = grid2op.make("l2rpn_case14_sandbox")
model = PPO("MlpPolicy", env, verbose=1)
model.learn(total_timesteps=1_000_000)

def suggest_grid_action(obs, lang: str = "pt-BR") -> dict:
    action, _ = model.predict(obs.to_vect(), deterministic=True)
    grid2op_action = env.action_space.from_vect(action)

    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=400,
        system={
            "pt-BR": "Você é um assistente de operações de rede elétrica. Explique ações do agente de RL para operadores.",
            "es": "Eres un asistente de operaciones de red eléctrica. Explica las acciones del agente RL a los operadores."
        }[lang],
        messages=[{"role": "user", "content": f"""
        Current grid state:
        - Overloaded lines: {obs.rho[obs.rho > 0.9].tolist()} (ρ > 0.9)
        - Renewable curtailment: {obs.curtailment_prod.sum():.1f} MW

        Proposed RL agent action:
        {str(grid2op_action)}

        Explain in 2 sentences what this action does and why it should resolve the overload.
        Use language appropriate for a power grid operator (not ML jargon).
        """}]
    )

    return {
        "action": grid2op_action,
        "explanation": response.content[0].text,
        "rl2grid_score": benchmark_action(obs, grid2op_action)
    }
```

**Delivery estimate:** 8-12 weeks (includes RL training, Grid2Op customization to client grid, dashboard)
**Target clients:** Brazilian TSO (ONS), ANEEL sandbox program, Chilean CEN, Colombian XM
**LATAM fit:** Medium/High — Brazilian and Chilean grid operators actively looking at AI-assisted grid management; RL2Grid benchmark provides credible validation framework

---

## Pattern 9: PowerDAG-Based Distribution Grid Analysis Agent

**Use case:** A distribution utility or engineering firm needs to automate complex distribution grid analysis tasks — power flow studies, contingency analysis, fault analysis — that currently require senior power engineers to manually drive simulator software. PowerDAG enables LLMs to perform these analyses reliably with JIT supervision.

**Context:** PowerDAG (arXiv:2603.17418, March 2026) achieves 100% success rate on distribution grid analysis benchmarks — the first agentic system designed specifically for the reliability constraints of power distribution engineering. LATAM utility context: ANEEL (Brazil) and CNE (Chile) require explainable, auditable AI for grid operations decisions.

**Stack:**
- `Power-Agent/PowerMCP` — MCP servers for power system software (MIT); provides the tool layer
- `Power-Agent/PowerSkills` — domain skill library for power system reasoning (MIT)
- `e2nIEE/pandapower` — power flow and distribution analysis (BSD-3)
- `Power-Agent/PowerFM` or open-source LLM — foundation model for power domain (MIT)
- Anthropic Claude API (`claude-sonnet-5`) — LLM reasoning engine with PowerMCP tools
- FastAPI + React — engineer-facing interface with audit trail (PowerChain pattern)
- Langfuse — trace agent tool calls for regulatory audit log

**Architecture (PowerDAG pattern):**
```
Distribution grid query (engineer, Portuguese/Spanish)
    ↓
Agent orchestrator (PowerDAG pattern: adaptive retrieval + JIT supervision)
    ├── retriever: select most relevant annotated examples for this query type
    │   (similarity-decay cutoff algorithm — prevents irrelevant context contamination)
    ├── JIT supervisor: validate each tool call before execution
    │   (intercepts tool misuse: wrong parameters, invalid grid topology, unsafe operations)
    ├── pandapower/PyPSA tool calls (via PowerMCP MCP interface)
    │   ├── run_power_flow(grid_model, scenario)
    │   ├── analyze_contingency(line_outage, topology)
    │   ├── compute_voltage_profile(bus_list)
    │   └── identify_overloads(thermal_limits)
    └── result_agent: Claude interprets simulation output → engineering narrative + recommendations
    ↓
PowerChain audit log: full trace of tool calls + intermediate results
    ↓
Engineer report (Portuguese/Spanish) + ANEEL/CNE compliant documentation
```

**Key code — PowerDAG Pattern Implementation:**
```python
from anthropic import Anthropic
import pandapower as pp
from langfuse import Langfuse

client = Anthropic()
langfuse = Langfuse()

# JIT supervisor: validates tool calls before execution
def jit_supervisor(tool_call: dict, grid_context: dict) -> dict:
    """Intercept and validate tool calls before they reach the power system."""
    validations = {
        "run_power_flow": lambda t: t.get("net") is not None,
        "create_line": lambda t: t.get("from_bus") != t.get("to_bus"),
        "create_load": lambda t: t.get("p_mw", 0) >= 0,
        "set_bus_type": lambda t: t.get("type") in ["b", "m", "n"],
    }
    tool_name = tool_call.get("name")
    if tool_name in validations and not validations[tool_name](tool_call.get("parameters", {})):
        return {"error": f"JIT supervision blocked invalid {tool_name} call", "blocked": True}
    return {"allowed": True, "tool_call": tool_call}

# PowerDAG adaptive retrieval: select relevant exemplars
def adaptive_retrieval(query: str, exemplar_library: list, cutoff: float = 0.7) -> list:
    """Select exemplars above similarity-decay cutoff to avoid irrelevant context."""
    from sklearn.metrics.pairwise import cosine_similarity
    import numpy as np
    # Simplified: in production, use PowerFM embeddings
    similarities = [compute_similarity(query, ex["query"]) for ex in exemplar_library]
    # Apply decay cutoff: only include exemplars above threshold
    selected = [ex for ex, sim in zip(exemplar_library, similarities) if sim >= cutoff]
    return selected[:5]  # max 5 exemplars

def run_distribution_analysis(
    query: str,
    grid_model_path: str,
    lang: str = "pt-BR",
    trace_id: str = None
) -> dict:
    """PowerDAG-pattern distribution grid analysis with full audit trail."""

    trace = langfuse.trace(id=trace_id, name="distribution_grid_analysis")
    audit_log = []

    system_map = {
        "pt-BR": """Você é um especialista em sistemas de distribuição de energia elétrica.
        Use as ferramentas PowerMCP para realizar análises precisas de rede de distribuição.
        Cada passo deve ser documentado para conformidade regulatória ANEEL.""",
        "es": """Eres un especialista en sistemas de distribución de energía eléctrica.
        Usa las herramientas PowerMCP para realizar análisis precisos de red de distribución.
        Cada paso debe ser documentado para cumplimiento regulatorio."""
    }

    # Load pandapower network
    net = pp.from_json(grid_model_path)

    # Run power flow via PowerMCP (MCP tool interface)
    # In production: Claude calls these via MCP; here shown as direct calls for clarity
    pp.runpp(net)
    audit_log.append({"step": "power_flow", "converged": net.converged, "params": grid_model_path})

    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2000,
        system=system_map.get(lang, system_map["pt-BR"]),
        messages=[{"role": "user", "content": f"""
        Query: {query}

        Power flow results:
        - Converged: {net.converged}
        - Bus voltages (pu): {net.res_bus['vm_pu'].describe().to_dict()}
        - Overloaded lines (loading > 90%): {net.res_line[net.res_line['loading_percent'] > 90][['loading_percent', 'p_from_mw']].to_dict()}
        - Transformer loading: {net.res_trafo[['loading_percent']].to_dict() if len(net.res_trafo) > 0 else 'No transformers'}

        Provide: (1) Analysis of current grid state, (2) Risk assessment, (3) Recommended corrective actions.
        Format for ANEEL regulatory documentation.
        """}]
    )

    audit_log.append({"step": "llm_analysis", "model": "claude-sonnet-5", "tokens": response.usage.input_tokens})
    trace.span(name="powerdag_complete", metadata={"audit_log": audit_log})

    return {
        "analysis": response.content[0].text,
        "audit_log": audit_log,
        "grid_state": {"converged": net.converged, "overloads": len(net.res_line[net.res_line['loading_percent'] > 90])}
    }

# Usage
result = run_distribution_analysis(
    query="Análise o impacto da integração de 50 MW de geração solar distribuída no alimentador A-3",
    grid_model_path="/data/feeder_A3.json",
    lang="pt-BR",
    trace_id="analysis-001"
)
```

**Delivery estimate:** 4-8 weeks (includes grid model integration, JIT supervisor tuning, ANEEL documentation format)
**Target clients:** CPFL, Cemig, Enel Brasil (distribution grid analysis automation); ANEEL pilot projects; Chilean distribution utilities (Enel Chile Distribución, CGE)
**LATAM fit:** Very High — Brazilian and Chilean distribution utilities managing large numbers of DERs (solar + storage + EVs) need automated analysis tools; ANEEL and CNE regulatory requirements for audit-traceable AI decisions are met by the PowerChain audit log
**Deal size:** $120k–$600k (depending on grid size, number of feeders, regulatory documentation scope)

---

## Pattern 10: Chile Renewable Curtailment Minimization Agent

**Use case:** Chilean renewable energy operators (solar + wind + storage) are wasting 6,084 GWh/year in curtailment (2025 data, +7.8% YoY). An AI agent that monitors CEN (Coordinador Eléctrico Nacional) signals and dynamically adjusts storage dispatch and flexible loads can capture significant revenue from curtailed energy.

**Context:** Chile has 63% clean electricity but a grid that cannot absorb all renewable generation. Amazon's $4B AWS region (late 2026) will add new demand that needs to be matched intelligently. Turbo Energy is already deploying AI solar+storage in Chile (May 2026).

**Stack:**
- `PyPSA/PyPSA` — power system modeling for curtailment scenarios (MIT)
- `intelligent-environments-lab/CityLearn` — RL for battery dispatch optimization (MIT)
- `Stable-Baselines3` — RL training (MIT)
- CEN market API (Chilean grid operator real-time signals)
- Anthropic Claude API (`claude-sonnet-5`) — strategy reasoning + operator reports in Spanish
- `OpenSTEF/openstef` — renewable generation forecasting (Apache-2.0)

**Architecture:**
```
CEN real-time signals (spot price, curtailment alerts, frequency deviation)
    +
OpenSTEF solar/wind generation forecast (next 4-48h)
    +
Battery SoC + flexible load availability
    ↓
LangGraph Curtailment Minimizer
    ├── forecast_agent: predict solar/wind generation next 48h (OpenSTEF + DMC Chile weather)
    ├── market_agent: read CEN spot prices + curtailment risk signals
    ├── rl_dispatch: CityLearn-trained RL policy → battery charge/discharge schedule
    ├── flexible_load_agent: shift deferrable loads to peak-curtailment periods
    └── strategy_agent: Claude generates daily operational plan in Spanish
    ↓
SCADA commands: battery charge/discharge + flexible load schedule
    ↓
CEN dispatch notification + operator dashboard (Spanish)
```

**Key code — Curtailment Detection + Dispatch:**
```python
from anthropic import Anthropic
from stable_baselines3 import SAC
import pandas as pd

client = Anthropic()

def curtailment_response_strategy(
    cen_signals: dict,
    forecast: pd.DataFrame,
    battery_state: dict,
    flexible_loads: list
) -> dict:
    """Generate curtailment minimization strategy using CEN signals + forecast."""

    # RL dispatch: CityLearn-trained SAC policy
    # (trained offline on Chilean grid data + CityLearn RL environment)
    model = SAC.load("chile_battery_dispatch_policy")
    obs = build_observation(cen_signals, forecast, battery_state)
    action, _ = model.predict(obs, deterministic=True)
    battery_schedule = interpret_battery_action(action)

    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1000,
        system="""Eres un analista de operaciones de energía renovable en Chile.
        Optimiza el despacho de almacenamiento y cargas flexibles para minimizar el vertimiento.
        Considera los señales del CEN, pronósticos de generación y disponibilidad de almacenamiento.""",
        messages=[{"role": "user", "content": f"""
        Señales CEN actuales:
        - Precio spot: ${cen_signals['spot_price_clp_mwh']:,.0f} CLP/MWh (umbral vertimiento: ${cen_signals['curtailment_threshold_clp']:,.0f})
        - Alerta vertimiento: {cen_signals['curtailment_alert']}
        - Reserva del sistema: {cen_signals['system_reserve_pct']}%

        Pronóstico generación solar (próximas 8h, MW): {forecast['solar_mw'].values[:8].tolist()}

        Estado batería: {battery_state['soc_pct']}% SoC, {battery_state['capacity_mwh']} MWh total

        Despacho RL propuesto: {battery_schedule}

        Cargas flexibles disponibles: {flexible_loads}

        Plan de acción: ¿Cómo maximizamos el aprovechamiento de la energía renovable evitando el vertimiento?
        Explica en términos de operaciones para el equipo técnico de planta.
        """}]
    )

    return {
        "battery_schedule": battery_schedule,
        "strategy": response.content[0].text,
        "estimated_curtailment_avoided_mwh": estimate_curtailment_avoided(battery_schedule, forecast, cen_signals),
        "revenue_recovered_clp": estimate_revenue(battery_schedule, cen_signals)
    }
```

**Delivery estimate:** 5-8 weeks (includes CEN API integration, RL training on Chilean data, operator dashboard in Spanish)
**ROI baseline:** Chile curtailed 6,084 GWh in 2025; at average spot price of $50/MWh, reducing curtailment by 10% = $30M+ in recovered revenue across the national fleet
**Target clients:** Grenergy Chile (340 MW solar + 960 MWh storage under construction), Colbún, AES Chile, Engie Chile, Turbo Energy, Amazon AWS Chile (demand side)
**Deal size:** $150k–$800k per renewable operator + potential % of recovered revenue

---

## Pattern Selection Guide (v3)

| Client scenario | Pattern | Time | Complexity | Deal Size |
|----------------|---------|------|------------|-----------|
| Building / campus energy management | Pattern 1: Smart Grid Anomaly Detection | 3-5 wk | Low | $60k-200k |
| Commercial building demand response | Pattern 2: CityLearn RL Agent | 5-8 wk | Medium | $100k-400k |
| Distribution utility (AMI rollout) | Pattern 3: Load Forecasting Agent | 4-6 wk | Medium | $80k-300k |
| Grid planning / regulatory | Pattern 4: PyPSA + PowerMCP | 4-6 wk | Medium | $100k-400k |
| Wind / solar farm O&M | Pattern 5: Predictive Maintenance | 6-9 wk | Medium | $150k-600k |
| Data center / large industrial (PPA) | Pattern 6: Procurement Optimizer | 6-10 wk | High | $200k-800k |
| AI data center grid coordination | Pattern 7: Datacenter-Grid AI | 4-7 wk | Medium | $150k-600k |
| TSO/ISO grid operations pilot | Pattern 8: RL Grid Operations | 8-12 wk | High | $300k-1.5M |
| Distribution utility analysis automation | Pattern 9: PowerDAG Grid Analysis | 4-8 wk | Medium | $120k-600k |
| Chilean renewable curtailment | Pattern 10: Curtailment Minimizer | 5-8 wk | Medium | $150k-800k |

---
*Auto-updated by the ingest pipeline.*
