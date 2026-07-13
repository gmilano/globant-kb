# Top AI Agents & Tools — Energy

> Open source AI agents and tools for the energy industry. Focus: MIT / Apache 2.0 / LGPLv2+.
> Last updated: 2026-07-13

## Top AI Agents & Tools

| Name | License | Stars | Description |
|------|---------|-------|-------------|
| [Grid2Op](https://github.com/rte-france/Grid2Op) | LGPL-2.1 | ~1.1k | RTE France power grid RL environment; simulate real-time grid operations, topology changes, redispatching. Foundation of L2RPN competitions. LF Energy member. |
| [RL2Grid](https://github.com/emarche/RL2Grid) | MIT | ~200 | Standardized RL benchmark for power grid operations built on Grid2Op. 39 tasks, full AC power flow, stochastic events, expert heuristics. TSO collaboration, ICLR-adjacent 2026. |
| [FlexMeasures](https://github.com/FlexMeasures/flexmeasures) | Apache-2.0 | ~600 | LF Energy scheduling platform for BESS, demand response, and flexibility. v0.31 July 2026. API-first, multi-site, multi-commodity. Production: EV fleets, solar+storage. |
| [CityLearn](https://github.com/intelligent-environments-lab/CityLearn) | BSD-3-Clause | ~700 | Farama Foundation Gymnasium env for multi-agent RL in building energy coordination and demand response. Official NREL-backed environment for grid-interactive buildings. |
| [EVerest](https://github.com/EVerest/everest-core) | Apache-2.0 | ~500 | LF Energy full EV charging stack (OCPP 1.6/2.0.1, ISO 15118, OCPI). v2026.02.0 LTS released Feb 2026. OEM adopters: Tritium, Pionix. Used in 100+ EV charger deployments. |
| [sinergym](https://github.com/ugr-sail/sinergym) | MIT | ~400 | Gymnasium environment for building energy control via EnergyPlus simulation. RL training, multi-zone buildings, weather variability, reward customization. |
| [AINETUS](https://github.com/lf-energy/ainetus) | Apache-2.0 | ~150 | LF Energy project for AI-native energy control rooms. Combines RL with XAI (explainable AI) and HMI interfaces. Launched Jun 2026 targeting TSO/DSO operators. |
| [OpenGridFM](https://github.com/lf-energy/opengridfm) | Apache-2.0 | ~120 | LF Energy initiative for grid foundation models. IBM + Hydro-Québec. Pre-trained on large grid datasets; fine-tunable for fault detection, forecasting, anomaly detection. Jun 2026. |
| [AutoB2G](https://github.com/NREL/autob2g) | MIT | ~80 | NREL agentic simulation + RL for spatio-temporal grid-interactive building control (arXiv 2603.26005). Extends CityLearn with LLM orchestration for HVAC + DR scheduling. |
| [bess-optimizer](https://github.com/FlexPwr/bess-optimizer) | MIT | ~90 | FlexPwr three-market BESS optimization in Python + Pyomo. Charge/discharge scheduling across day-ahead, intraday, and balancing markets. Integrates with FlexMeasures. |

---

## Why These Matter for Globant

| Use Case | Key Agent | Time-to-POC |
|----------|-----------|-------------|
| Grid RL control | Grid2Op + RL2Grid | 6–10 wks |
| BESS scheduling / arbitrage | FlexMeasures + bess-optimizer | 4–8 wks |
| EV charging optimization | EVerest + evcc + FlexMeasures | 6–10 wks |
| Building demand response | CityLearn + sinergym | 4–6 wks |
| Grid foundation model | OpenGridFM + Grid2Op | 10–16 wks |
| XAI for control rooms | AINETUS + Grid2Op | 8–12 wks |

---
*Auto-updated by the ingest pipeline.*
