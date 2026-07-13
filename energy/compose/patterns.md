# Composition Patterns — Energy AI

> Concrete recipes for building energy AI solutions. Each pattern names specific repos + how to wire them.
> Last updated: 2026-07-13

## Architecture Baseline

```
[Vertical Platform (OpenEMS / EVerest / evcc / FlexMeasures)]
          ↓ REST / MQTT / gRPC
[Data Layer (EMQX / TimescaleDB / InfluxDB)]
          ↓
[AI Orchestration (LangGraph / FlexMeasures / Claude MCP)]
          ↓ schedules / setpoints
[Actuators (EV chargers / BESS inverters / smart meters)]
          ↑↓
[Operator UI (conversational Claude claude-sonnet-4-5 + dashboards)]
```

---

## P1 — BESS Arbitrage Agent (FlexMeasures + bess-optimizer + Claude Sonnet)

**Problem**: Battery storage operators leave money on the table by not optimally scheduling charge/discharge across day-ahead, intraday, and balancing markets.

**Stack**:
- [FlexMeasures](https://github.com/FlexMeasures/flexmeasures) v0.31 — scheduling engine + market price integration
- [bess-optimizer](https://github.com/FlexPwr/bess-optimizer) — Pyomo three-market optimization model
- Claude claude-sonnet-4-5 — natural language interface + exception handling
- TimescaleDB — price + telemetry history

**Wiring**:
1. BESS telemetry (SOC, power, temperature) → MQTT → FlexMeasures
2. Day-ahead market prices (API: EPEX SPOT, OMIE, XM, CENACE) → FlexMeasures
3. FlexMeasures triggers bess-optimizer every 15 min; Pyomo solves MILP schedule
4. Schedule sent to inverter via Modbus/SunSpec REST
5. Claude agent monitors deviations; explains schedule rationale to operator

**Time**: 6–10 weeks | **ROI**: 15–35% improvement in battery revenue | **LATAM fit**: Chile/Colombia wholesale markets, Brazil BESS-as-service

---

## P2 — EV Fleet Smart Charging (EVerest + evcc + FlexMeasures + Claude)

**Problem**: Fleet operators with 50–500 EVs face grid capacity constraints at depot charging; uncoordinated charging causes demand spikes and high energy costs.

**Stack**:
- [EVerest](https://github.com/EVerest/everest-core) — OCPP 2.0.1 charging station management
- [evcc](https://github.com/evcc-io/evcc) — per-vehicle smart charging logic + tariff optimization
- [FlexMeasures](https://github.com/FlexMeasures/flexmeasures) — fleet-level scheduling (V2G, DR participation)
- Claude claude-sonnet-4-5 + MCP — fleet operator natural language dashboard

**Wiring**:
1. EV chargers (OCPP) → EVerest CSMS → REST API
2. Fleet management system (vehicle SOC, schedules) → FlexMeasures
3. FlexMeasures optimizes overnight charging: minimize cost, respect grid capacity, meet readiness SLA
4. evcc per-charger logic executes setpoints from FlexMeasures
5. Claude agent: "Which vehicles won’t be ready by 6am?" → queries FlexMeasures → natural language answer

**Time**: 6–10 weeks | **ROI**: 20–40% energy cost reduction; eliminate demand charge penalties | **LATAM fit**: Brazil bus fleets, Mexico logistics, Chile delivery

---

## P3 — Grid RL Control Agent (Grid2Op + RL2Grid + AINETUS)

**Problem**: Power grid operators make real-time topology decisions under N-1 contingency constraints that are too complex and fast for manual analysis.

**Stack**:
- [Grid2Op](https://github.com/rte-france/Grid2Op) — grid simulation environment
- [RL2Grid](https://github.com/emarche/RL2Grid) — 39-task benchmark for training + evaluation
- [AINETUS](https://github.com/lf-energy/ainetus) — XAI layer for operator trust + regulatory compliance
- Stable-Baselines3 / RLlib — RL training
- [pandapower](https://github.com/e2nIEE/pandapower) — power flow validation

**Wiring**:
1. Train RL agent on Grid2Op environment; benchmark on RL2Grid tasks
2. Integrate AINETUS XAI: agent actions annotated with saliency maps + natural language explanations
3. Deploy in shadow mode alongside operators; measure decision quality vs. expert
4. AINETUS dashboard shows: proposed action, confidence, explanation, rollback option
5. Operator approves; action sent to SCADA via OPC-UA/IEC 61850

**Time**: 12–20 weeks (includes regulatory review) | **ROI**: reduce N-1 violations 40–70%; 30–50% outage reduction (IEA) | **LATAM fit**: Colombia XM, Brazil ONS, Chile Coordinator Eléctrico

---

## P4 — Building Demand Response Platform (CityLearn + sinergym + OpenEMS + FlexMeasures)

**Problem**: Commercial buildings (offices, malls, hospitals) can earn revenue by reducing energy demand during grid stress events, but current DR programs require manual participation.

**Stack**:
- [CityLearn](https://github.com/intelligent-environments-lab/CityLearn) — MARL training for building coordination
- [sinergym](https://github.com/ugr-sail/sinergym) — EnergyPlus-based RL environment per building type
- [OpenEMS](https://github.com/OpenEMS/openems) — production building EMS with REST API
- [FlexMeasures](https://github.com/FlexMeasures/flexmeasures) — DR event scheduling + utility program integration
- [AutoB2G](https://github.com/NREL/autob2g) — LLM orchestration layer for HVAC + EV + BESS

**Wiring**:
1. Train DR policy on sinergym (HVAC model) + CityLearn (multi-building coordination)
2. Deploy to OpenEMS; RL policy runs as custom OpenEMS Controller
3. FlexMeasures receives DR event from utility (Demand Response API); schedules pre-cooling + setpoint shift
4. AutoB2G coordinates HVAC, EV chargers, and BESS simultaneously during DR event
5. Post-event report auto-generated by Claude claude-sonnet-4-5 for utility submission

**Time**: 10–16 weeks | **ROI**: $50K–$500K/year per building cluster in DR payments | **LATAM fit**: Brazil ANEEL demand response program, Colombia SUI, Chilean industrial DR

---

## P5 — Grid Foundation Model Pipeline (OpenGridFM + Grid2Op + pandapower)

**Problem**: Utilities lack the labeled operational data and ML expertise to train grid AI models from scratch. Every utility reinvents the same models.

**Stack**:
- [OpenGridFM](https://github.com/lf-energy/opengridfm) — pre-trained grid foundation model (IBM + Hydro-Québec)
- [Grid2Op](https://github.com/rte-france/Grid2Op) — synthetic data generation for fine-tuning
- [pandapower](https://github.com/e2nIEE/pandapower) — power flow validation
- [Power Grid Model](https://github.com/PowerGridModel/power-grid-model) — fast batch inference

**Wiring**:
1. Utility provides 6–12 months of SCADA/ADMS logs (anonymized if needed)
2. Fine-tune OpenGridFM on utility-specific topology + operational history
3. Validate fine-tuned model on Grid2Op benchmark tasks + RL2Grid suite
4. Deploy to production: fault detection → pandapower power flow validation → alert to SCADA
5. Model continuously updated via FlexMeasures feedback loop

**Time**: 10–16 weeks | **ROI**: 30–50% outage reduction (IEA); 175 GW unlocked capacity potential | **LATAM fit**: Any T1/T2 utility in BR/CL/CO/MX; differentiated offering

---

## P6 — Renewable Curtailment Reduction (PyPSA + FlexMeasures + Claude Sonnet)

**Problem**: High-renewable grids (Chile 50%+, Brazil Nordeste) curtail GWh of wind/solar daily because grid constraints prevent export. BESS + AI dispatch can recover this revenue.

**Stack**:
- [PyPSA](https://github.com/PyPSA/PyPSA) — power system optimization (LP/MILP capacity + dispatch)
- [FlexMeasures](https://github.com/FlexMeasures/flexmeasures) — real-time BESS + flexible load dispatch
- Claude claude-sonnet-4-5 — renewable operator copilot
- Weather forecasting API (Open-Meteo, open-source) — solar/wind inflow forecasts

**Wiring**:
1. PyPSA models grid topology + renewable generation + BESS capacity
2. Weather forecast → PyPSA day-ahead curtailment prediction (16h horizon)
3. FlexMeasures schedules BESS charging during predicted curtailment windows
4. Claude claude-sonnet-4-5: "Should we curtail Unit 4 tomorrow?" → PyPSA run → natural language recommendation
5. Operator confirms; setpoints sent to inverter controller

**Time**: 8–12 weeks | **ROI**: 15–40% curtailment reduction; direct revenue for renewable operator | **LATAM fit**: Chile (50%+ renewable), Brazil Nordeste, Colombia Guajira wind

---

## P7 — Virtual Power Plant (OpenEMS + FlexMeasures + EMQX + LangGraph)

**Problem**: Small prosumers and industrial DER owners can’t individually participate in energy markets, but aggregated they represent significant grid flexibility.

**Stack**:
- [OpenEMS](https://github.com/OpenEMS/openems) — per-site EMS (BESS + solar + EV)
- [FlexMeasures](https://github.com/FlexMeasures/flexmeasures) — VPP aggregation + market bidding
- [EMQX](https://github.com/emqx/emqx) — MQTT broker for 1000s of DER telemetry streams
- [LangGraph](https://github.com/langchain-ai/langgraph) — multi-agent VPP coordination (forecast → bid → dispatch → settle)
- Claude claude-sonnet-4-5 — VPP operator dashboard + customer reporting

**Wiring**:
1. Each DER site runs OpenEMS; telemetry → EMQX → FlexMeasures
2. FlexMeasures aggregates flexibility; LangGraph VPP agent builds day-ahead bid
3. Market bid submitted to grid operator (OMIE, MIBEL, XM, CENACE)
4. Dispatch signals → EMQX → OpenEMS per site
5. Settlement: FlexMeasures calculates per-site earnings; Claude generates customer reports

**Time**: 14–20 weeks | **ROI**: 10–30% revenue from grid services for DER owners; 5–15% margin for aggregator | **LATAM fit**: Brazil ANEEL DER framework, Chile CNE prosumer regulations, Colombia DER rules 2025

---

## P8 — Predictive Maintenance for Renewable Assets (FlexMeasures + LangGraph + Claude)

**Problem**: Wind turbines and solar inverters generate terabytes of sensor data but maintenance is still time-based schedules. Unplanned downtime costs $22K/hour at large wind farms.

**Stack**:
- [FlexMeasures](https://github.com/FlexMeasures/flexmeasures) — asset monitoring + anomaly detection scheduling
- [EMQX](https://github.com/emqx/emqx) — MQTT IoT data ingestion from turbines/inverters
- [LangGraph](https://github.com/langchain-ai/langgraph) — multi-step diagnostic agent (anomaly → root cause → work order)
- Claude claude-sonnet-4-5 — maintenance copilot for field technicians
- TimescaleDB — time-series anomaly history

**Wiring**:
1. Wind turbine sensors (vibration, temperature, power curves) → EMQX → TimescaleDB
2. FlexMeasures anomaly detection: deviation from expected power curve → trigger LangGraph agent
3. LangGraph agent: correlate anomaly → retrieve similar past cases → generate diagnostic hypothesis
4. Claude mobile: technician asks "What’s wrong with Turbine 12?" → diagnosis + repair procedure
5. Work order auto-created; post-repair validation scheduled

**Time**: 8–12 weeks | **ROI**: 25–40% reduction in unplanned downtime; $22K/hour avoided at wind farms | **LATAM fit**: Brazil (18GW wind, Nordeste), Chile (3.5GW wind), Argentina (Patagonia wind)

---

## P9 — EV Charging + Building Energy AI (evcc + MyEMS + Claude + MCP)

**Problem**: Commercial buildings with EV parking lots need to balance building load, EV charging demand, and rooftop solar to minimize electricity bills and demand charges.

**Stack**:
- [evcc](https://github.com/evcc-io/evcc) — per-EV smart charging with solar surplus + tariff optimization
- [MyEMS](https://github.com/MyEMS/myems) — building energy monitoring (electricity, cooling, solar)
- Claude claude-sonnet-4-5 + MCP — building manager conversational interface
- [FlexMeasures](https://github.com/FlexMeasures/flexmeasures) — coordinated optimization across EV + building + solar

**Wiring**:
1. Building smart meters + EV chargers + solar inverter → MyEMS (REST/Modbus)
2. evcc handles individual EV sessions; passes aggregated EV load to FlexMeasures
3. FlexMeasures solves daily optimization: solar first, tariff valleys for EV charging, demand peak avoidance
4. Claude MCP: building manager asks "How much did we save this week?" → MyEMS query → narrative report
5. Weekly AI report emailed: energy cost, CO2 saved, EV sessions, solar self-consumption rate

**Time**: 4–8 weeks | **ROI**: 15–30% energy bill reduction; eliminate demand charge overruns | **LATAM fit**: Office parks, shopping centers, hospitals in BR/CL/CO/MX with EV fleets

---

## Pattern Selection Guide

| Client Type | Best Starting Pattern |
|-------------|---------------------|
| Utility / TSO / DSO | P3 (Grid RL) or P5 (Grid Foundation Model) |
| BESS / Storage Operator | P1 (BESS Arbitrage) |
| EV Fleet Operator | P2 (EV Fleet Charging) |
| Renewable Developer | P6 (Curtailment Reduction) or P8 (Predictive Maintenance) |
| Commercial Building Owner | P4 (Building DR) or P9 (EV + Building) |
| Energy Aggregator / VPP | P7 (VPP) |
| Small/Medium Enterprise (LATAM) | P9 (start small) → P4 (scale to DR) |
