# Composition Patterns — Energy AI

> Concrete recipes for building solutions. Each pattern names specific repos + how to wire them.
> Last updated: 2026-07-11 (v2)

## Architecture Template

```
[Vertical Platform (open source base)]
          ↓
[Data & Integration Layer]
          ↓
[AI / ML Engine]  ←→  [LLM Agent Orchestrator]
          ↓
[Operator UI / API]
```

---

## P1 — Grid Load Forecasting Service for DSOs

**Business case**: DSOs need probabilistic load forecasts to avoid congestion and optimize grid operations. Forecast accuracy translates directly to CapEx savings on grid reinforcement.

**Stack:**
- Base: [OpenSTEF/openstef](https://github.com/OpenSTEF/openstef) (MPL-2.0) — AutoML forecasting engine
- Foundation model layer: [alliander-opensource/s4casting](https://github.com/alliander-opensource/s4casting) (Apache-2.0) — zero-shot on new substations
- Orchestration: LangGraph agent monitors forecast quality → triggers MLflow re-training if MAPE > threshold
- Alerting: Claude Haiku generates natural-language forecast reports for operations team

**Wiring:**
```
OpenMeteo API → OpenSTEF (weather + historical load) → MLflow model registry
  → FastAPI forecast endpoint
  → LangGraph monitor agent (polls endpoint every 30 min)
  → Claude Haiku: "Substation X expected to exceed 95% capacity Thursday 14:00-18:00"
  → Slack/email alert to grid operator
```

**Effort**: 6-10 weeks MVP | **Revenue target**: $80k-$200k engagement | **Reuse**: 80% reusable across DSO clients

---

## P2 — BESS Virtual Power Plant (VPP) Dispatch Agent

**Business case**: Behind-the-meter BESS assets can generate revenue through energy arbitrage, frequency regulation, and capacity market bidding. Optimal dispatch requires real-time multi-signal decision making.

**Stack:**
- EMS: [OpenEMS/openems](https://github.com/OpenEMS/openems) (EPL-2.0) — device control for BESS/solar/EV
- Market signals: spot price API + frequency signal feed + local PV forecast
- Battery model: [pybamm-team/PyBaMM](https://github.com/pybamm-team/PyBaMM) (BSD-3-Clause) — SOH and degradation tracking
- Agent: LangGraph multi-step agent; CrewAI for multi-BESS coordination
- Inference: Ollama (local) for air-gapped sites

**Wiring:**
```
OpenEMS REST API → real-time BESS state (SOC, SOH, power)
  + Market price API (MIBEL, CAMEX, ERCOT)
  + Grid frequency (from DSO SCADA feed)
  → LangGraph Dispatch Agent:
      Tool 1: PyBaMM SOH check → is cycling OK?
      Tool 2: Price arbitrage optimizer → optimal buy/sell schedule
      Tool 3: Frequency regulation eligibility check
  → Decision: issue OpenEMS REST setpoint command
  → Log: append to time-series DB for audit trail
  → Report: daily P&L summary via Claude Haiku
```

**Effort**: 8-14 weeks MVP | **Revenue target**: $120k-$350k | **Note**: EPL-2.0 requires license review for commercial deployment

---

## P3 — EV Fleet Smart Charging Agent

**Business case**: Commercial EV fleets (trucks, buses, delivery vans) spend 20-35% more on energy than optimal due to unmanaged charging. Smart charging agents reduce cost and grid impact.

**Stack:**
- Charger software: [EVerest/everest-core](https://github.com/EVerest/everest-core) (Apache-2.0) — OCPP 2.1 interface
- Scheduling: LangGraph agent with OCPP SetChargingProfile tool
- Grid awareness: pandapower distribution grid model for local congestion check
- Optimization: scipy.optimize or Google OR-Tools for fleet charge schedule

**Wiring:**
```
EVerest OCPP 2.1 interface ← all EV chargers in fleet depot
  ↑ LangGraph Smart Charging Agent:
    Input: fleet departure schedules, SOC targets, ToU tariff, local PV availability
    Tool 1: pandapower.runpf() → check if charging plan causes local congestion
    Tool 2: optimize_schedule() → scipy minimize total cost subject to grid constraints
    Tool 3: everest_api.set_charging_profile() → push schedule to EVerest
  → Monitoring: real-time SOC dashboard + deviation alerts
  → Outcome: 15-30% charging cost reduction + grid congestion relief
```

**Effort**: 6-10 weeks MVP | **Revenue target**: $80k-$200k | **LATAM angle**: Rappi, LATAM Airlines, Metrobus operators all transitioning to EV fleets

---

## P4 — Predictive Maintenance Agent for Energy Assets

**Business case**: Wind turbines, solar inverters, and substation transformers fail unexpectedly, causing outages worth $100k-$1M per event. AI predictive maintenance gives 2-4 weeks lead time to schedule maintenance before failure.

**Stack:**
- Data collection: [VOLTTRON/volttron](https://github.com/VOLTTRON/volttron) (Apache-2.0) — SCADA/BMS data ingestion
- ML: scikit-learn / XGBoost anomaly detection on vibration, temperature, current signatures
- Battery assets: [pybamm-team/PyBaMM](https://github.com/pybamm-team/PyBaMM) (BSD-3-Clause) — degradation modeling
- Agent: CrewAI multi-agent crew: Anomaly Detector → Root Cause Analyst → Dispatch Coordinator
- LLM: Claude Haiku (or local Llama 3.1 via Ollama) for maintenance report generation

**Wiring:**
```
VOLTTRON historian (time-series store)
  → Anomaly Detection Agent (VOLTTRON agent process)
      Runs: isolation forest / LSTM autoencoder on rolling 24h window
      Threshold exceeded → alert event published to VOLTTRON bus
  → CrewAI Crew triggered:
      Agent 1 (Root Cause): "Based on vibration pattern X, likely bearing wear in wind turbine T-07"
      Agent 2 (Parts Check): query spare parts inventory API
      Agent 3 (Dispatch): create maintenance work order in SAP PM / Maximo
  → Notification: WhatsApp/Slack to field crew + daily digest email to plant manager
```

**Effort**: 8-12 weeks MVP | **Revenue target**: $100k-$250k | **ROI for client**: 1-3 averted failures = full project payback

---

## P5 — Grid RL Agent Demo for TSO/DSO Clients

**Business case**: TSO/DSO clients are evaluating AI for autonomous grid control. A working Grid2Op demo with a trained RL agent is the most compelling sales artifact. Credibility builder for $500k+ engagements.

**Stack:**
- Environment: [Grid2op/grid2op](https://github.com/Grid2op/grid2op) (MPL-2.0) — real RTE France network data
- RL training: Stable Baselines 3 (PPO/SAC) + l2rpn-baselines reference agents
- Benchmark: [emarche/RL2Grid](https://github.com/emarche/RL2Grid) (MIT) — standardized evaluation
- Backend: pandapower AC power flow simulation
- Frontend: Streamlit + network graph visualization

**Wiring:**
```
Grid2Op environment (IEEE 14/118-bus or RTE 36-bus network)
  → Train PPO agent (SB3) for topology optimization
  → Evaluate on RL2Grid benchmark: survival rate, N-1 compliance, redispatch cost
  → Streamlit demo:
      - Real-time grid visualization (networkx + plotly)
      - Compare: rule-based operator vs. AI agent
      - Interactive: user-initiated N-1 contingency → watch AI respond
  → Output: PDF benchmark report for client
```

**Effort**: 3-5 weeks demo | **Revenue target**: Lead generation for $200k-$500k engagement | **Note**: Powerful for regulatory/safety-conscious utilities

---

## P6 — Energy System Planning LLM Agent

**Business case**: Utilities and governments pay $200k-$1M for energy system planning studies. PyPSA + LLM agent can deliver first-cut analysis in days vs. months, with natural-language interface for non-engineers.

**Stack:**
- Modeling: [PyPSA/PyPSA](https://github.com/PyPSA/PyPSA) (MIT) — OPF + capacity expansion
- Reference model: [PyPSA/pypsa-eur](https://github.com/PyPSA/pypsa-eur) (MIT) — adapt to LATAM topology
- Scenario generation: Claude claude-sonnet-5 (latest) — translates natural language → PyPSA component additions
- Visualization: PyPSA built-in + matplotlib + plotly
- Delivery: Jupyter notebook + executive PDF via nbconvert

**Wiring:**
```
User: "Model Chile adding 3GW solar in Atacama + 1GW offshore wind by 2032"
  → Claude parses intent → generates PyPSA network modifications (Python code)
  → PyPSA runs: optimal power flow + capacity expansion optimization (HiGHS solver)
  → Results: optimal generator dispatch, line loading, total system cost
  → Claude interprets results → generates executive summary:
      "The 3GW solar addition reduces system cost by 18% but requires 450km new transmission..."
  → Output: interactive Jupyter notebook + PDF report + cost breakdown chart
```

**Effort**: 6-10 weeks | **Revenue target**: $150k-$400k | **LATAM gap**: PyPSA-LATAM reference model doesn't exist — Globant can create it

---

## P7 — Grid Operator AI Assistant (OperatorFabric + Claude)

**Business case**: Grid operators monitor hundreds of real-time alerts. LLM-powered assistant reduces alert fatigue, accelerates incident triage, and enables voice/text Q&A over grid state.

**Stack:**
- Platform: [opfab/operatorfabric-core](https://github.com/opfab/operatorfabric-core) (MPL-2.0) — utility operations backbone
- AI layer: MCP server wrapping OperatorFabric REST API
- LLM: Claude claude-sonnet-5 (or Haiku for cost at scale)
- Language: Spanish (LATAM utilities) / English / French (European TSOs)

**Wiring:**
```
OperatorFabric (real-time grid events, process cards, alerts)
  → Custom MCP server: exposes OF REST API as Claude tools
      get_active_alerts(), get_grid_state(), acknowledge_card(), create_process()
  → Claude Agent (chat interface for operators):
      Operator: "¿Cuáles son los 3 eventos más críticos ahora mismo?"
      Claude: queries MCP tools → ranks by severity → explains in plain Spanish
      Operator: "Escalar el evento de la subestación Norte al supervisor"
      Claude: calls escalate_card() → logs action → confirms
  → Dashboard: embedded chat widget in OperatorFabric UI
  → Voice: Whisper (local) → Claude → TTS for voice-controlled operations
```

**Effort**: 8-12 weeks | **Revenue target**: $100k-$300k | **First-mover**: Spanish-language grid operator assistant doesn't exist commercially

---

## P8 — Building Portfolio Demand Response Agent

**Business case**: Commercial building operators (offices, hospitals, malls) can earn $50k-$200k/year by participating in utility demand response programs. AI agents automate the complex multi-HVAC optimization.

**Stack:**
- RL training: [intelligent-environments-lab/CityLearn](https://github.com/intelligent-environments-lab/CityLearn) (MIT) — multi-agent RL for building portfolios
- Simulation: [ugr-sail/sinergym](https://github.com/ugr-sail/sinergym) (MIT) — EnergyPlus building simulation for training
- Production agent: LangGraph agent with HVAC BMS tool calls
- BMS integration: BACnet/IP via bacpypes library (BSD-3-Clause)
- Reporting: Claude generates daily demand response performance reports

**Wiring:**
```
Train: CityLearn + sinergym (EnergyPlus)
  → PPO multi-agent policy for HVAC setpoint optimization per building zone
  → Policy validation: 15-20% energy reduction benchmark (per VectorInstitute/TELUS result)

Production:
  BACnet/IP ← all HVAC units in building portfolio
  → LangGraph agent runs trained policy:
      Input: DR signal from utility AMI + indoor temp sensors + occupancy schedule
      Action: adjust setpoints per trained policy
      Constraint: comfort bounds (22-26°C, per user config)
  → Reports: daily kWh saved + $ earned in DR program
  → Client dashboard: Streamlit with building-level breakdown
```

**Effort**: 10-16 weeks | **Revenue target**: $120k-$350k | **Reuse**: same agent across all commercial buildings

---

## Quick-Start Decision Tree

```
Client type?
├── DSO / Grid operator
│   ├── Load forecasting pain? → P1 (OpenSTEF + LangGraph)
│   ├── Grid operations complexity? → P5 demo → P7 production
│   └── Grid planning backlog? → P6 (PyPSA + Claude)
├── Utility / IPP with BESS
│   ├── Revenue optimization? → P2 (OpenEMS VPP Agent)
│   └── Asset maintenance? → P4 (VOLTTRON + CrewAI)
├── Fleet / Mobility operator
│   └── EV charging cost? → P3 (EVerest + Smart Charging)
└── Commercial real estate
    └── Energy cost + DR revenue? → P8 (CityLearn + LangGraph)
```

---
*See also: `intel/trends.md` for context on why each pattern is timely.*
