# Trending — Energy AI (Week of 2026-07-11)

> What's new and gaining momentum this week.

## Hot Repos This Week

| Repo | License | Why Trending |
|------|---------|--------------|
| [alliander-opensource/s4casting](https://github.com/alliander-opensource/s4casting) | Apache-2.0 | Time series foundation models for energy; Alliander results show superior accuracy vs. classic XGBoost on new substations with zero-shot adaptation |
| [OpenSTEF/openstef](https://github.com/OpenSTEF/openstef) | MPL-2.0 | New release with MLflow integration; community PRs adding OpenMeteo weather connector — makes forecasting pipelines fully reproducible |
| [ugr-sail/sinergym](https://github.com/ugr-sail/sinergym) | MIT | EnergyPlus 24 support + new multi-zone building environments; Dec 2025 paper (arXiv:2412.08293) driving academic citations |
| [emarche/RL2Grid](https://github.com/emarche/RL2Grid) | MIT | Standardized RL benchmark for Grid2Op environments; ICLR 2026 workshop paper gaining traction in power systems ML community |
| [sariekiriyuu/smartEMS-MultiAgent-Demo](https://github.com/sariekiriyuu/smartEMS-MultiAgent-Demo) | MIT | Multi-agent energy management demo with LangGraph + real-time power data; referenced in 3 recent blog posts on agentic energy |
| [VectorInstitute/HV-Ai-C](https://github.com/VectorInstitute/HV-Ai-C) | Apache-2.0 | Vector Institute + TELUS RL solution for HVAC; production results published showing 15–20% HVAC energy reduction |
| [openremote/openremote](https://github.com/openremote/openremote) | AGPL-3.0 | 1.8k stars; IoT platform gaining energy vertical traction — EV charger + BESS + solar integrations now shipped |

## Emerging Signals

### Virtual Power Plant (VPP) Orchestration with LLM Agents
Multiple new repos this month build VPP controllers on top of OpenEMS + LangGraph. Pattern: OpenEMS handles device-level BESS/EV/solar telemetry → LangGraph multi-agent decides dispatch → MQTT pushes commands back. smartEMS-MultiAgent-Demo is the reference implementation.

### Foundation Models for Energy Time Series
s4casting and similar repos (Moirai-Energy, TimesFM-grid forks) are replacing classic XGBoost/LightGBM in utility forecasting stacks. Key advantage: zero-shot forecasting on new substations without historical training data — critical for grid expansion projects.

### Grid2Op / L2RPN 2026 Challenge
RTE France / LF Energy L2RPN 2026 challenge driving agent development. Best open-source agents use GNN + PPO hybrid. RL2Grid provides the new standardized benchmark. Highly relevant for TSO/DSO clients evaluating AI grid control.

### Carbon-Aware Scheduling
New open-source tools for carbon-intensity-aware workload scheduling: `microsoft/carbon-aware-sdk` (MIT), `tmrowco/electricitymap-contrib` (MIT). Growing demand from data center and industrial clients with Scope 2 commitments.

### IEC 61850 Python Bindings
`pyiec61850-ng` (GPL-3.0) gaining activity — enables Python AI agents to communicate natively with substation automation equipment (IEDs). Critical for brownfield grid AI deployments.

## LATAM-Specific Activity

- **Brazil**: ANEEL smart grid AI guidelines published May 2026 — creating demand for grid AI consulting engagements
- **Colombia**: XM (grid operator) piloting ML-based congestion forecasting — potential Globant engagement opportunity
- **Chile**: CNE issued renewable curtailment reduction RFPs — PyPSA-based modeling is the open standard reference tool
- **Mexico**: CFE announced AI pilot for predictive maintenance of transmission assets — Globant should track RFP

---
*Auto-updated by ingest pipeline.*
