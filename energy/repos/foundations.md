# Foundational Repos — Energy

> Bases to build on: open license, active community, production-proven.
> Last updated: 2026-07-14

## Core Platforms & Frameworks

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|----------|
| [rte-france/Grid2Op](https://github.com/rte-france/Grid2Op) | LGPL-2.1 | ~1.1k★ | RTE France's power grid simulation framework for RL/AI agents — realistic AC dynamics, N-1 contingencies, thermal limits; backbone of NeurIPS L2RPN competitions | Yes — native RL gym |
| [FlexMeasures/flexmeasures](https://github.com/FlexMeasures/flexmeasures) | Apache-2.0 | ~630★ | Intelligent EMS: schedules batteries, EVs, heat pumps using forecasts, market prices, OpenADR/S2; LF Energy incubation; PyPI v0.30.3 | Yes — REST API + AI scheduling |
| [intelligent-environments-lab/CityLearn](https://github.com/intelligent-environments-lab/CityLearn) | BSD-3-Clause | ~750★ | Farama Gymnasium env for multi-agent RL on building energy: demand response, heat pumps, batteries, EVs (v2.6.0) | Yes — MARL environment |
| [EVerest/EVerest](https://github.com/EVerest/EVerest) | Apache-2.0 | ~500★ | LF Energy EV charging software stack: full firmware for AC/DC chargers, OCPP 1.6/2.0.1/2.1, ISO 15118-20, Plug&Charge, TPM 2.0 (v2026.02.0-LTS) | Yes — modular, LLM-extensible |
| [ugr-sail/sinergym](https://github.com/ugr-sail/sinergym) | MIT | ~400★ | Gymnasium environment wrapping EnergyPlus for building simulation: HVAC control, demand response, multi-agent; integrates with Stable-Baselines3 | Yes — native RL gym |
| [gpu2grid/openg2g](https://github.com/gpu2grid/openg2g) | MIT | ~160★ | AI datacenter–power grid co-simulation: models inference workloads as controllable flexible loads (arXiv:2605.05519) | Yes — AI-first design |
| [AI4Electricity/RL2Grid](https://github.com/AI4Electricity/RL2Grid) | MIT | ~220★ | ICLR 2026 benchmark for RL in power grid operations — standardized tasks, state/action spaces, reward functions built on Grid2Op | Yes — evaluation framework |
| [openremote/openremote](https://github.com/openremote/openremote) | AGPL-3.0 | ~1.8k★ | Full-stack IoT/energy platform: device management, rules engine, dashboards, REST+MQTT APIs | Partial — REST APIs for AI integration |
| [Power-Agent/PowerFM](https://github.com/Power-Agent/PowerFM) | MIT | ~90★ | Foundation models for power/energy: fine-tuned and domain-trained models for load forecasting, fault detection, grid simulation, agent control | Yes — model hub |
| [lfenergy/opengridfm](https://lfenergy.org/projects/opengridfm/) | Apache-2.0 | ~120★ | LF Energy grid foundation model framework: Foundational Grid Simulator, network topology specs, profile generators for training GridFMs | Yes — pre-training platform |

## Supporting Libraries

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [IBM/rl-testbed-for-energyplus](https://github.com/IBM/rl-testbed-for-energyplus) | MIT | ~217★ | IBM RL testbed for power consumption optimization using EnergyPlus |
| [santoshphilip/eppy](https://github.com/santoshphilip/eppy) | MIT | ~199★ | Python scripting language for EnergyPlus IDF files |
| [Power-Agent/PowerMCP](https://github.com/Power-Agent/PowerMCP) | MIT | ~120★ | MCP servers for PowerWorld, PSS/E, OpenDSS, PSCAD — LLM-to-simulator interface |
| [ChargePi/oscp-go](https://github.com/ChargePi/oscp-go) | MIT | ~3★ | Open Smart Charging Protocol (OSCP) SDK for Go |
| [AI4Electricity/Awesome-AI-for-Electricity](https://github.com/AI4Electricity/Awesome-AI-for-Electricity) | MIT | ~300★ | Curated collection: papers, datasets, software, benchmarks for ML × electricity |

---
*See also: `verticals/solutions.md` for full vertical platforms.*
