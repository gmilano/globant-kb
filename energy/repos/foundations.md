# Foundational Repos — Energy

> Battle-tested open source bases to build on. Open license, active community.
> Last updated: 2026-07-11 (v2)

## Core Platforms & Frameworks

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [PyPSA/PyPSA](https://github.com/PyPSA/PyPSA) | MIT | ~2,100 | TU Berlin — Python for Power System Analysis. OPF, unit commitment, storage, multi-sector coupling (electricity + heat + H2). The standard open tool for national/continental energy system modeling. Pandas-based DataFrame interface makes it trivially wrappable with LLM agents. | Yes — wrap OPF results with LLM explanation agent |
| [e2nIEE/pandapower](https://github.com/e2nIEE/pandapower) | BSD-3-Clause | ~1,200 | Fraunhofer IEE + Uni Kassel — Fast Newton-Raphson power flow, state estimation, short-circuit analysis, OPF. 500k+ PyPI downloads. PYPOWER-compatible, pandas-based. Well-maintained; ideal for distribution grid AI applications. | Yes — DataFrames expose grid topology directly to ML pipelines |
| [pybamm-team/PyBaMM](https://github.com/pybamm-team/PyBaMM) | BSD-3-Clause | ~1,600 | NumFOCUS — Fast, flexible physics-based battery modelling (Doyle-Fuller-Newman model). Critical for BESS state-of-health, degradation prediction, and BMS AI integration. Used by BMW, Northvolt, and national labs. | Yes — physics model + ML surrogate for real-time BMS AI |
| [VOLTTRON/volttron](https://github.com/VOLTTRON/volttron) | Apache-2.0 | ~495 | DOE / PNNL — Distributed sensing and control platform. Pub-sub message bus, SCADA/BMS driver framework, historian for time-series data. Lifecycle management for deployed Python AI agents. v10 migrating to Eclipse Foundation. The foundational OS for building AI microservices on energy infrastructure. | Yes — native agent lifecycle + SCADA integration |
| [EVerest/everest-core](https://github.com/EVerest/everest-core) | Apache-2.0 | ~221 | PIONIX / LF Energy — Full-stack EV charging software. OCPP 1.6/2.0.1/2.1, ISO 15118, IEC 61851, hardware drivers. Most active community in LF Energy. C++ + Python. Production-deployed by EVSE manufacturers across EU/US. | Yes — AI charging optimization layer on top of OCPP stack |
| [OpenSTEF/openstef](https://github.com/OpenSTEF/openstef) | MPL-2.0 | ~153 | Alliander / LF Energy — AutoML pipelines for probabilistic short-term grid load forecasting (hours to 48h ahead). Weather data ingestion, MLflow tracking, production-grade. Used by a top-5 European DSO. | Yes — already ML-native; add LLM alert layer |
| [rte-france/Grid2Op](https://github.com/Grid2op/grid2op) | MPL-2.0 | ~448 | RTE France / LF Energy — Gymnasium-compatible testbed for RL-based power grid control. L2RPN challenge platform. Supports pandapower, lightsim2grid, and Powsybl backends. Essential for training autonomous grid control agents. | Yes — designed for AI agents; drop in any RL framework |
| [intelligent-environments-lab/CityLearn](https://github.com/intelligent-environments-lab/CityLearn) | MIT | ~622 | Georgia Tech — Farama Gymnasium RL environment for multi-agent building demand response at city scale. Models BESS, heat pumps, electric heaters, EVs. v2.5.0 released Oct 2025. ASHRAE + IECC compliant loads. | Yes — multi-agent RL out of the box; Stable Baselines 3 compatible |
| [PyPSA/pypsa-eur](https://github.com/PyPSA/pypsa-eur) | MIT | ~577 | TU Berlin — Sector-coupled open optimization model of the European energy system. Covers all ENTSO-E + transport, heating, industry, agriculture sectors. Reference tool cited in EU policy documents. Snakemake workflow. | Yes — generate scenarios with LLM agent; explain results in plain language |
| [gridfm/gridfm-datakit](https://github.com/gridfm/gridfm-datakit) | Apache-2.0 | ~127 | IBM / Hydro-Quebec / LF Energy — Synthetic dataset generator for training ML/foundation models on OPF and power flow. Handles grids up to 30k buses. MATPOWER format, topology perturbations, constraint violations. Essential for training grid foundation models. | Yes — feeds foundation model training pipelines |

## Supporting Libraries

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [ugr-sail/sinergym](https://github.com/ugr-sail/sinergym) | MIT | 231 | Universidad de Granada — Gymnasium + EnergyPlus building RL. Multi-zone buildings, custom weather, real-time monitoring. |
| [alliander-opensource/s4casting](https://github.com/alliander-opensource/s4casting) | Apache-2.0 | ~120 | Alliander — Time series foundation models tuned for energy (demand, solar, wind). Zero-shot on new substations. |
| [ADGEfficiency/energy-py](https://github.com/ADGEfficiency/energy-py) | MIT | ~190 | RL environments for battery dispatch and energy arbitrage. Stable Baselines 3 compatible. |
| [Power-Agent/PowerFM](https://github.com/Power-Agent/PowerFM) | MIT | ~46 | Hub for power domain foundation models: GridLDM (latent diffusion for grid TS), OpenPowerBench, mAIEnergy (50k docs + 25M TS for LLM pre-training). |
| [OpenEnergyPlatform/awesome-sustainable-technology](https://github.com/OpenEnergyPlatform/awesome-sustainable-technology) | CC0 | ~1,000 | Community-curated list of all open source energy and climate tools. Best starting map of the ecosystem. |

---
*See also: `verticals/solutions.md` for full-stack vertical platforms.*
