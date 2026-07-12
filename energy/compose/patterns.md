# Composition Patterns — Energy AI

> Concrete recipes for building solutions. Each pattern names specific repos + how to wire them.
> Last updated: 2026-07-12 (v4)

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

**Effort**: 6-10 weeks MVP | **Revenue target**: $80k-$200k | **Reuse**: 80% reusable across DSO clients

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
**LATAM anchor**: Cite Eletrobras + C3 AI Grid Intelligence as validation ($100B company chose AI for this exact use case)

---

## P5 — Grid RL Agent Demo for TSO/DSO Clients

**Business case**: TSO/DSO clients are evaluating AI for autonomous grid control. A working Grid2Op demo with a trained RL agent is the most compelling sales artifact. Credibility builder for $500k+ engagements.

**Stack:**
- Environment: [Grid2op/grid2op](https://github.com/Grid2op/grid2op) (MPL-2.0) — real RTE France network data
- RL training: Stable Baselines 3 (PPO/SAC) + l2rpn-baselines reference agents
- Benchmark: [emarche/RL2Grid](https://github.com/emarche/RL2Grid) (MIT) — standardized evaluation (ICLR 2026)
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

**Effort**: 3-5 weeks demo | **Revenue target**: Lead generation for $200k-$500k engagement

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

**Effort**: 6-10 weeks | **Revenue target**: $150k-$400k | **LATAM gap**: PyPSA-LATAM reference model doesn't exist — Globant can create it | **Chile**: 63% renewable electricity = urgent planning need

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

## P9 — PowerMCP Rapid Grid Analysis PoC

**Business case**: The fastest way to land a utility client is a working PoC in 2-3 weeks that lets engineers talk to their own OpenDSS/PSS/E models in natural language. PowerMCP makes this possible without custom API wrapper code.

**Stack:**
- Interface layer: [Power-Agent/PowerMCP](https://github.com/Power-Agent/PowerMCP) (MIT) — MCP servers for OpenDSS, PSS/E, PowerWorld, PSCAD
- Skills: [Power-Agent/PowerSkills](https://github.com/Power-Agent/PowerSkills) (MIT) — domain-aware tool selection + mitigation playbooks
- Workflows: [Power-Agent/PowerWF](https://github.com/Power-Agent/PowerWF) (MIT) — pre-built N-1, OPF, contingency workflows
- LLM: Claude claude-sonnet-5 (best tool use) or any MCP-compatible LLM
- Deployment: Docker on utility server (air-gapped) or Claude.ai (cloud)

**Wiring:**
```
Utility already has OpenDSS distribution grid model (standard tool)
  → Deploy PowerMCP as local MCP server: exposes OpenDSS as MCP tools
  → Connect Claude via MCP protocol
  → Load PowerSkills (domain prompt + tool selection heuristics)
  → Compose PowerWF workflow: N-1 contingency analysis pipeline

Engineer: "Run N-1 contingency on all feeder switches and show me the top 5 violations"
  → Claude selects PowerMCP tools: run_powerflow(), get_element_loads(), get_violations()
  → PowerMCP issues OpenDSS commands → collects results
  → Claude interprets: "5 violations found. Worst case: switch SW-47 opens → bus 12 undervoltage (0.91 pu)"
  → Auto-generates PDF contingency report

Next request: "What happens if I add 5MW solar at bus 23?"
  → Claude uses PowerMCP to add PV element → re-run OPF → report delta
```

**Effort**: 2-3 weeks PoC | **Revenue target**: $30k-$60k PoC → $200k-$500k production engagement

---

## P10 — Reliable Agentic Distribution Grid Analysis (PowerDAG Pattern)

**Business case**: Utilities need utility-grade reliability for AI agents before production deployment. NERC CIP and EU NIS2 require audit trails. The PowerDAG pattern delivers 94-100% task success with verifiable outputs.

**Stack:**
- Pattern reference: PowerDAG (arXiv:2603.17418, Apr 2026) — adaptive retrieval + just-in-time supervision
- Audit trail: PowerChain pattern (arXiv:2508.17094) — DAG workflow generation for traceability
- Grid tool: [e2nIEE/pandapower](https://github.com/e2nIEE/pandapower) (BSD-3-Clause) — power flow and analysis
- LLM: Claude claude-sonnet-5 for planning + tool use; Haiku for execution steps
- Logging: structured JSON audit log per analysis step

**Wiring:**
```
Utility engineer submits task: "Check voltage violations across the 11kV network after adding 50 substations"

Phase 1 — Planning (PowerDAG adaptive retrieval):
  → Claude retrieves relevant domain knowledge: voltage standards, analysis procedure
  → Generates DAG workflow: load_network() → add_substations() → run_powerflow() → check_violations() → report()
  → DAG is logged as structured JSON (audit trail step 1)

Phase 2 — Just-in-time supervision:
  → Each DAG node executes with pandapower
  → Before each step: Claude verifies preconditions ("substations loaded, parameters valid")
  → After each step: Claude verifies result plausibility ("voltage values in reasonable range?")
  → On anomaly: pause → explain → ask for confirmation (not silent failure)

Phase 3 — Verifiable output:
  → Final report with: inputs, intermediate results, final violations table
  → Full DAG execution trace in JSON (regulatorily auditable)
  → Engineer can replay any step or override individual nodes

Outcome: 94-100% task success rate vs. 60-70% for naive LangChain/ReAct baselines
```

**Effort**: 10-14 weeks (production-grade) | **Revenue target**: $150k-$400k | **Differentiator**: First Globant engagement to claim utility-grade AI agent reliability

---

## P11 — NEW: Grid Intelligence at Scale (Eletrobras Pattern, Open Source)

**Business case**: Eletrobras + C3 AI deployed Grid Intelligence across Brazil's full national transmission network — detecting and resolving disruptions in <10 seconds. C3 AI is commercial. Globant can deliver the same capability with open-source + Claude for smaller LATAM utilities that can't afford C3 AI licensing.

**Stack:**
- Data collection: [VOLTTRON/volttron](https://github.com/VOLTTRON/volttron) (Apache-2.0) — real-time IoT/SCADA sensor data ingestion
- Grid model: [PowerGridModel/power-grid-model](https://github.com/PowerGridModel/power-grid-model) (MIT) — high-performance power flow for the affected substation network
- Stream processing: Apache Kafka or MQTT broker — real-time sensor event routing
- Agent: LangGraph reactive agent — event-triggered, not polling
- LLM: Claude claude-sonnet-5 for fault classification + dispatch recommendations
- Integration: MCP server wrapping EMS/SCADA REST API for acknowledgement and dispatch

**Wiring:**
```
Real-time IoT/SCADA sensors (substations, transformers, line monitors)
  → VOLTTRON historian: all readings at 1-second resolution
  → Kafka stream: high-priority events (overcurrent, temperature spike, frequency deviation)
  → LangGraph Grid Intelligence Agent (event-triggered):

      On event: "Overcurrent alarm at substation Norte-47"
      Step 1: Claude fetches context via MCP tools:
          - get_substation_status(Norte-47)
          - get_nearby_alarms(radius=50km, window=5min)
          - get_grid_topology_near(Norte-47)
      Step 2: Power Grid Model batch calculation:
          - Simulate N-1 contingency with Norte-47 tripped
          - Identify affected loads and downstream voltage impact
          - Assess severity: which customers lose power?
      Step 3: Claude generates dispatch decision:
          - "Likely cause: transformer overload. Recommend: isolate feeder 7, reroute via feeder 12"
          - Estimated impact: 2,400 customers in district Zona Norte
          - Recommended action: dispatch field crew to Norte-47 within 45 min
      Step 4: Action execution (with human approval gate):
          - Draft dispatch order → send to operator dashboard for one-click approval
          - On approval: trigger SCADA switching command + create SAP work order

Goal: detection-to-recommendation in <10 seconds (Eletrobras benchmark)
      approval-to-dispatch in <30 seconds (vs. minutes-to-hours historically)
```

**Effort**: 12-16 weeks (full production) | 4-6 weeks (pilot at 10 substations, Eletrobras v1 model)
**Revenue target**: $150k-$500k | **LATAM anchor**: Cite Eletrobras/C3 AI as industry validation; offer open-source alternative

---

## P12 — NEW: Distribution Planning at Scale (Power Grid Model + LLM)

**Business case**: Distribution utilities must plan for EV charger load growth, renewable DER integration, and data center connections — all simultaneously, across thousands of grid nodes. Traditional planning tools (one simulation at a time) can't handle this. Power Grid Model (10M+ downloads, three Dutch DSOs) enables AI-driven Monte Carlo planning.

**Stack:**
- Data ingestion: [PowerGridModel/power-grid-model-io](https://github.com/PowerGridModel/power-grid-model-io) (MIT) — import IEC CIM/CGMES
- Simulation core: [PowerGridModel/power-grid-model](https://github.com/PowerGridModel/power-grid-model) (MIT) — millions of batch scenarios in seconds
- Data science interface: [PowerGridModel/power-grid-model-ds](https://github.com/PowerGridModel/power-grid-model-ds) (MIT) — Pythonic graph API
- Scenario generation: LangGraph agent generates EV/solar/data-center growth scenarios from natural language
- LLM: Claude claude-sonnet-5 for scenario interpretation and executive reporting
- Visualization: matplotlib + networkx for grid topology + violation heat maps

**Wiring:**
```
Utility provides IEC CIM grid model (standard export from GIS/SCADA)
  → power-grid-model-io: converts CIM to PGM format
  → power-grid-model-ds: Pythonic network object (nodes, branches, loads)

Client request: "What grid reinforcements are needed if 30% of district 7 installs EV chargers by 2028?"

Step 1 — Scenario generation (Claude):
  → Translates "30% EV penetration by 2028" to load growth parameters
  → Generates 1,000 Monte Carlo scenarios (varied EV adoption curves, charging times, weather)

Step 2 — Batch calculation (Power Grid Model):
  → Runs 1,000 power flow scenarios in parallel (numpy batch mode)
  → Runtime: ~30 seconds for 1,000 scenarios on a modern server

Step 3 — Violation analysis (LangGraph + Claude):
  → Identifies nodes that violate voltage/thermal limits in >10% of scenarios
  → Ranks by severity (population affected × violation frequency)
  → Recommends: "Upgrade transformer T-23, add shunt capacitor at node 156, reinforce feeder F-7 by 2026"

Step 4 — Executive reporting:
  → Claude generates: cost estimates, risk map, investment timeline
  → Output: PDF technical report + boardroom-ready executive summary

Value delivered: 3-week planning study (previously 6-12 months)
```

**Effort**: 8-12 weeks | **Revenue target**: $120k-$350k | **Reuse**: Same engine across any DSO with CIM-compatible SCADA/GIS

---

## Quick-Start Decision Tree

```
Client type?
├── DSO / Grid operator
│   ├── Load forecasting pain? → P1 (OpenSTEF + LangGraph)
│   ├── Grid operations complexity? → P5 demo → P7 production
│   ├── Grid planning backlog? → P6 (PyPSA + Claude)
│   ├── Distribution planning at scale? → P12 (Power Grid Model + LLM)
│   ├── Has OpenDSS/PSS/E? → P9 PowerMCP PoC (fastest!)
│   ├── Needs regulatory audit trail? → P10 (PowerDAG pattern)
│   └── Real-time fault response? → P11 (Grid Intelligence at Scale)
├── Utility / IPP with BESS
│   ├── Revenue optimization? → P2 (OpenEMS VPP Agent)
│   └── Asset maintenance? → P4 (VOLTTRON + CrewAI)
├── Transmission utility (LATAM)
│   └── Grid intelligence at scale? → P11 (Eletrobras pattern)
├── Fleet / Mobility operator
│   └── EV charging cost? → P3 (EVerest + Smart Charging)
└── Commercial real estate
    └── Energy cost + DR revenue? → P8 (CityLearn + LangGraph)
```

---
*See also: `intel/trends.md` for context on why each pattern is timely.*
