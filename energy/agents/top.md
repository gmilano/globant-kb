# Top AI Agents & Tools — Energy

> Open source AI agents and tools for the energy industry. Focus: MIT / Apache 2.0 / BSD.
> Last updated: 2026-07-11 (v2)

## Featured Agents & Tools

| Name | Repo | License | Stars | Description |
|------|------|---------|-------|-------------|
| OpenSTEF | [OpenSTEF/openstef](https://github.com/OpenSTEF/openstef) | MPL-2.0 | ~380 | Alliander (Dutch DSO) — AutoML pipelines for probabilistic short-term grid load forecasting. Predicts horizons of hours to days. Used in production by a top-5 European DSO. |
| Grid2Op | [Grid2op/grid2op](https://github.com/Grid2op/grid2op) | MPL-2.0 | 413 | RTE France / LF Energy — Gymnasium-compatible testbed for sequential decision-making in power grids. Runs L2RPN challenges. Supports RL, heuristics, and hybrid agents for topology control and redispatching. |
| PyPSA | [PyPSA/PyPSA](https://github.com/PyPSA/PyPSA) | MIT | ~1.5k | TU Berlin — Python for Power System Analysis. Optimal power flow, unit commitment, storage, multi-sector coupling (H2, heat). The standard open tool for national/continental energy system modeling. |
| pandapower | [e2nIEE/pandapower](https://github.com/e2nIEE/pandapower) | BSD-3-Clause | ~1.1k | Fraunhofer IEE / Uni Kassel — Fast power system modeling and analysis. Newton-Raphson AC/DC power flow, short-circuit, OPF, state estimation. Pandas-based; easy to wrap with LLM agents. |
| sinergym | [ugr-sail/sinergym](https://github.com/ugr-sail/sinergym) | MIT | 231 | Universidad de Granada — Gymnasium interface over EnergyPlus for building HVAC/energy RL. Supports multi-agent control, custom weather files, real-time monitoring. |
| s4casting | [alliander-opensource/s4casting](https://github.com/alliander-opensource/s4casting) | Apache-2.0 | ~120 | Alliander — Time series foundation models specifically tuned for energy forecasting (demand, solar, wind). Fine-tunable on utility data with few-shot adaptation. |
| rl-testbed-for-energyplus | [IBM/rl-testbed-for-energyplus](https://github.com/IBM/rl-testbed-for-energyplus) | MIT | 217 | IBM — Reinforcement learning testbed for power consumption optimization using EnergyPlus building simulation. Stable Baselines 3 compatible. |
| energy-py | [ADGEfficiency/energy-py](https://github.com/ADGEfficiency/energy-py) | MIT | ~430 | Independent — RL environments for energy systems: battery dispatch, demand response, flexibility trading. Clean Gymnasium wrappers ready for LLM agent orchestration. |
| OperatorFabric | [opfab/operatorfabric-core](https://github.com/opfab/operatorfabric-core) | MPL-2.0 | ~120 | RTE France / LF Energy — Modular, industrial-strength platform for real-time utility grid operations. Centralizes alerts, process monitoring, operator notifications. Field-tested in European TSOs. |
| OpenEMS | [OpenEMS/openems](https://github.com/OpenEMS/openems) | EPL-2.0 | 384 | FENECON / OpenEMS Association — Modular energy management system for storage + solar + EV charging + heat pumps. OSGi-based, production-deployed in commercial and industrial sites. |

## How to Use These in Globant Engagements

- **Forecasting layer**: OpenSTEF or s4casting as the ML forecasting engine; wrap with a LangGraph agent for alerting and re-training triggers.
- **Grid simulation / RL**: Grid2Op environment + Stable Baselines 3 agent for topology optimization prototypes; demo to TSO/DSO clients.
- **System modeling**: PyPSA or pandapower as the physics layer; LLM agent generates scenarios and interprets OPF results in natural language.
- **Building/HVAC**: sinergym for building portfolio energy optimization; chain with a Claude Haiku agent for anomaly explanation.
- **Operator UI**: OperatorFabric as the operations dashboard; add MCP-based Claude agent for natural-language query over real-time grid events.
- **Site EMS**: OpenEMS for behind-the-meter assets (BESS, solar, EV); expose REST API to an orchestrating LLM agent for demand-response bids.

---
*Auto-updated by ingest pipeline.*
