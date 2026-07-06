# 🏗️ Foundational Repos — Energy

> Core open-source foundations to build AI energy solutions on top of.
> Focus: permissive licenses, active maintenance, production-proven.
> Last updated: 2026-07-06

## Grid Simulation & Analysis

| Repo | License | Stars | Description | AI Use |
|------|---------|-------|-------------|--------|
| [PyPSA/PyPSA](https://github.com/PyPSA/PyPSA) | MIT | ~2.8k | Python for Power System Analysis — AC/DC OPF, multi-carrier energy systems, investment optimization | Agent-controlled dispatch, RL environment for grid optimization |
| [e2nIEE/pandapower](https://github.com/e2nIEE/pandapower) | BSD-3 | ~1.6k | Power flow, OPF, short-circuit analysis on pandas DataFrames | Fast grid state evaluation inside AI optimization loops |
| [gridlab-d/gridlab-d](https://github.com/gridlab-d/gridlab-d) | BSD-3 | ~620 | PNNL distribution grid + transactive energy simulator | RL training environment for DER dispatch, demand response |
| [dss-extensions/OpenDSSDirect.py](https://github.com/dss-extensions/OpenDSSDirect.py) | MIT | ~210 | Python API for OpenDSS distribution simulator | DER hosting capacity, voltage regulation AI |
| [pnnl/tesp](https://github.com/pnnl/tesp) | BSD-3 | ~110 | PNNL Transactive Energy Simulation Platform — HELICS co-simulation | Multi-agent price signal simulation, VPP AI |

## Renewable Energy Modeling

| Repo | License | Stars | Description | AI Use |
|------|---------|-------|-------------|--------|
| [pvlib/pvlib-python](https://github.com/pvlib/pvlib-python) | BSD-3 | ~1.3k | Solar irradiance models, cell temperature, PV system simulation | Feature engineering for solar forecasting agents |
| [wind-python/windpowerlib](https://github.com/wind-python/windpowerlib) | MIT | ~320 | Wind power curves, wake effects, site-specific wind modeling | Wind generation forecasting, turbine health AI |
| [pypsa-meets-earth/pypsa-earth](https://github.com/pypsa-meets-earth/pypsa-earth) | MIT | ~590 | Global open energy model — any country/region, Snakemake workflow | National energy transition planning, AI scenario analysis |
| [NREL/rex](https://github.com/NREL/rex) | BSD-3 | ~95 | NREL renewable energy resource extraction (wind, solar, wave HDF5 datasets) | Dataset backbone for renewable AI models |

## Building Energy & HVAC

| Repo | License | Stars | Description | AI Use |
|------|---------|-------|-------------|--------|
| [ugr-sail/sinergym](https://github.com/ugr-sail/sinergym) | MIT | ~310 | EnergyPlus Gym env for RL HVAC/building control | RL policy training for net-zero buildings |
| [IBM/rl-testbed-for-energyplus](https://github.com/IBM/rl-testbed-for-energyplus) | MIT | ~240 | RL testbed (PPO/SAC) for EnergyPlus HVAC optimization | Proven -15% to -25% energy reduction baselines |
| [NREL/Wattile](https://github.com/NREL/Wattile) | BSD-3 | ~180 | NREL probabilistic building load forecasting — LSTM + uncertainty | Short-term load forecasting for demand response agents |
| [santoshphilip/eppy](https://github.com/santoshphilip/eppy) | MIT | ~200 | Scripting and automation for EnergyPlus IDF files | Programmatic building model generation for AI training |

## Data & Market Integration

| Repo | License | Stars | Description | AI Use |
|------|---------|-------|-------------|--------|
| [EnergieID/entsoe-py](https://github.com/EnergieID/entsoe-py) | MIT | ~530 | ENTSO-E Transparency Platform Python REST client — EU grid data | Real-time price/generation data for trading agents |
| [tmrowco/electricitymap-contrib](https://github.com/tmrowco/electricitymap-contrib) | MIT | ~3.5k | Real-time carbon intensity per grid zone — 100+ parsers | Carbon-aware AI workload scheduling |
| [pydata/pandas-datareader](https://github.com/pydata/pandas-datareader) | BSD-3 | ~2.8k | Energy data from EIA, Quandl, World Bank APIs | Data pipeline for energy market AI agents |

---
*See `verticals/solutions.md` for full vertical platforms.*
