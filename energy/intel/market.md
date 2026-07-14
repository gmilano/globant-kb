# Market Map — Energy AI

> Key players, market sizing, LATAM opportunities, Globant positioning.
> Last updated: 2026-07-14

## Market Size (2026)

| Segment | 2026 Size | 2030 Target | CAGR | Source |
|---------|-----------|-------------|------|--------|
| AI in Energy (broad) | $22.82B | $60.6B | 21.4% | StartUs Insights / GlobeNewswire Jun 2026 |
| AI-Powered Smart Grid | $7.54B | $12.79B | 13.9% | Research and Markets |
| AI in Energy Distribution | $7.1B | $42.7B (2033) | 29.2% | Persistence MR |
| AI in Renewable Energy | Growing rapidly | TBD | ~20%+ | Datam Intelligence |
| GenAI in Energy (sub-segment) | Fast-scaling | — | 18.73% | StartUs Insights |

**Reference**: AI in Energy Distribution is the fastest-growing sub-segment at 29.2% CAGR to 2033.

## Global Players

| Company | Type | Strength | AI Energy Play |
|---------|------|----------|----------------|
| Siemens AG | Industrial OEM | Grid manufacturing, SCADA, DERs | $1B US grid investment (Feb 2026); Siemens Xcelerator AI platform |
| Schneider Electric | Industrial OEM | EMS, SCADA, building automation | EcoStruxure AI-enhanced grid management |
| ABB | Industrial OEM | HVDC, grid automation, robotics | Ability platform + AI grid control |
| GE Vernova | Utility tech | Grid software, wind/gas turbines | Predix AI for grid analytics |
| Google / DeepMind | Hyperscaler | Data center power optimization | 30% cooling energy reduction with RL |
| Microsoft | Hyperscaler | AI-datacenter-grid coordination | OpenG2G ecosystem, nuclear PPA (TMI restart 2025) |
| RTE France | TSO | Grid2Op, L2RPN research competitions | Open-source RL for grid control |
| Seita / LF Energy | OSS | FlexMeasures EMS, Apache-2.0 | Demand flexibility scheduling, VPP |
| Harvard SEAS (Power-Agent) | Research | PowerAgent suite, benchmarks | Open-source agentic AI for all grid layers |
| LF Energy | Foundation | EVerest, FlexMeasures, AINETUS, OpenGridFM | Open ecosystem for energy transition |

## Open Source Ecosystem Map

```
Grid Simulation & RL Training
  └── Grid2Op (LGPL) — RTE France, L2RPN
  └── RL2Grid (MIT) — ICLR 2026 benchmark
  └── sinergym (MIT) — building sim, EnergyPlus
  └── CityLearn (BSD) — multi-building MARL

Agentic AI Layer
  └── PowerAgent Suite (MIT) — Harvard SEAS
      ├── PowerMCP — LLM-to-simulator bridge
      ├── PowerDAG — distribution grid analysis
      ├── PowerWF — operational workflows
      └── PowerFM — domain foundation models
  └── AINETUS (Apache) — LF Energy, RL+XAI for operators
  └── OpenGridFM (Apache) — LF Energy, GridFM pre-training

Energy Management & Scheduling
  └── FlexMeasures (Apache) — LF Energy, EMS + VPP
  └── openremote (AGPL) — IoT + energy platform
  └── CityLearn (BSD) — demand response MARL

EV Charging
  └── EVerest (Apache) — LF Energy, charger firmware LTS
  └── Open e-Mobility (Apache) — CSMS
  └── OpenOCPP (Apache) — charger embedded software

SCADA / Control
  └── RapidSCADA (LGPL) — industrial SCADA
  └── OpenPLC (GPL) — PLC runtime

Datacenter-Grid
  └── OpenG2G (MIT) — AI load as grid flexibility
```

## LATAM Opportunities

| Opportunity | Country | Size Signal | Approach |
|------------|---------|-------------|----------|
| EV charging network rollout | Brazil, Mexico, Chile | EV sales +40% YoY in BR (2025) | EVerest + Open e-Mobility CSMS build |
| Solar curtailment optimization | Chile | Atacama overproduction crisis | FlexMeasures + Grid2Op RL dispatch agent |
| Rural microgrid electrification | Colombia, Peru, Bolivia | IPSE, MINEM targets | CityLearn MARL + EVerest mini-grid |
| Industrial demand response | Mexico, Brazil | CENACE, ANEEL DR programs | RapidSCADA + FlexMeasures + PowerMCP |
| Smart meter AI analytics | Argentina, Colombia | AMI rollout (EDESUR, ENEL) | openremote + PowerFM load forecasting |
| AI datacenter grid coordination | Brazil, Chile | Hyperscaler buildouts | OpenG2G simulation + inference scheduling |

## Globant Positioning

**Core differentiators**:
1. **Full-stack energy AI**: Grid simulation (Grid2Op + RL2Grid) → EMS scheduling (FlexMeasures) → operator UX (LLM + Claude API).
2. **EV charging expertise**: EVerest + Open e-Mobility + OCPP 2.1 + ISO 15118-20 — complete open-source stack.
3. **Agentic grid operations**: PowerAgent suite + LangGraph + Claude API → conversational grid control room passing PSABench.
4. **LATAM presence**: Physical delivery in BR, MX, AR, CO, CL aligned with highest-growth energy AI markets.
5. **Open-source contribution**: Globant as LF Energy member + EVerest/FlexMeasures contributor — early access and client credibility.

**Recommended GTM**: Lead with EV charging (EVerest + FlexMeasures) as fastest-moving market, expand to demand response and grid analytics.
