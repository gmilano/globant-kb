# Foundational Repos — Energy

> Production-grade open source bases to build on. Open license, active community.
> Last updated: 2026-07-13

## Power Grid Simulation & Analysis

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|----------|
| [rte-france/Grid2Op](https://github.com/rte-france/Grid2Op) | LGPL-2.1 | ~1.1k | RTE France power grid RL environment. Simulates real-time grid operations: topology control, redispatching, N-1 contingency. L2RPN competition base. LF Energy member. | Yes — Gymnasium-compatible, reward shaping |
| [e2nIEE/pandapower](https://github.com/e2nIEE/pandapower) | BSD-3-Clause | ~1.5k | Python power flow calculation tool (Newton-Raphson, DC/AC). Used in GridLearn, AutoB2G, research pipelines. Integrates with PowerGridModel C++ solvers. | Yes — programmatic power flow for AI agents |
| [PyPSA/PyPSA](https://github.com/PyPSA/PyPSA) | MIT | ~2.5k | Python for Power System Analysis. Energy system optimization (linear/non-linear). Used for capacity expansion, grid planning, sector coupling (power+heat+hydrogen). | Yes — LP/MILP optimization backbone |
| [PowerGridModel/power-grid-model](https://github.com/PowerGridModel/power-grid-model) | Apache-2.0 | ~400 | LF Energy C++ library for distribution power system analysis. 10M+ PyPI downloads. Pandapower and Alliander use it as core solver. Fast batch calculations for ML pipelines. | Yes — high-throughput power flow for ML |

## Energy Management Systems

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|----------|
| [OpenEMS/openems](https://github.com/OpenEMS/openems) | Apache-2.0 | ~1.1k | Modular Java platform for energy storage, renewable integration, EV charging, heat pumps, and time-of-use tariffs. REST/JSON-RPC API. Commercial deployments in Europe. | Yes — REST API for AI orchestration |
| [evcc-io/evcc](https://github.com/evcc-io/evcc) | MIT | ~12k | Go-based smart EV charging + home energy management. 200+ charger integrations, solar surplus charging, tariff-aware scheduling. Active weekly releases. | Yes — API hooks for AI optimization |
| [FlexMeasures/flexmeasures](https://github.com/FlexMeasures/flexmeasures) | Apache-2.0 | ~600 | LF Energy scheduling/optimization platform for BESS, demand response, EV fleets, and solar+storage. v0.31 Jul 2026. REST API + plugin system. | Yes — AI scheduling engine core |

## EV Charging Stack

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|----------|
| [EVerest/everest-core](https://github.com/EVerest/everest-core) | Apache-2.0 | ~500 | LF Energy EV charging OS. OCPP 1.6/2.0.1, ISO 15118, OCPI, V2G, Plug & Charge. v2026.02.0 LTS. OEMs: Tritium, Pionix. FlexMeasures plugin for AI scheduling. | Yes — FlexMeasures integration |
| [OpenEMS/openems](https://github.com/OpenEMS/openems) | Apache-2.0 | ~1.1k | (see above) — also covers EV charging integration | Yes |

## RL / ML Environments

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|----------|
| [intelligent-environments-lab/CityLearn](https://github.com/intelligent-environments-lab/CityLearn) | BSD-3-Clause | ~700 | Farama Foundation Gymnasium env for MARL in building energy coordination and grid demand response. Official NREL-backed. Used in competition tracks. | Core RL environment |
| [ugr-sail/sinergym](https://github.com/ugr-sail/sinergym) | MIT | ~400 | Gymnasium env for building energy control via EnergyPlus. Multi-zone buildings, weather variability, reward customization. Integrates with Stable-Baselines3. | Core RL environment |
| [emarche/RL2Grid](https://github.com/emarche/RL2Grid) | MIT | ~200 | Standardized RL benchmark for power grids (39 tasks). Full AC power flow, N-1 contingency, stochastic events. Enables reproducible agent comparison. | Benchmark harness |

## Energy System Modeling

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|----------|
| [MyEMS/myems](https://github.com/MyEMS/myems) | MIT (core) | ~1k | Building/factory/hospital energy monitoring + optimization. Python + React. Supports electricity, water, gas, cooling, heating, solar, BESS, microgrids, VPPs. | Yes — REST API + data export |
| [FlexPwr/bess-optimizer](https://github.com/FlexPwr/bess-optimizer) | MIT | ~90 | Three-market BESS optimization (day-ahead, intraday, balancing) using Pyomo. Integrates with FlexMeasures for deployment. | Yes — optimization core for BESS |

---
*See also: `verticals/solutions.md` for full vertical platforms.*
