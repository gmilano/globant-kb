# Foundational Repos — Energy Industry
> v9 · Updated 2026-07-14 · Real repos with active maintainership

## Core Platforms

| # | Repo | License | Stars | Description |
|---|------|---------|-------|-------------|
| 1 | [OpenEMS/openems](https://github.com/OpenEMS/openems) | Apache-2.0 | ~2.5k | Modular open-source EMS: solar, BESS, EV charging, heat pumps, ToU tariffs; Java; v2026.3.0 |
| 2 | [openenergymonitor/emonCMS](https://github.com/openenergymonitor/emoncms) | Apache-2.0 | ~1.4k | Web-based energy monitoring: time-series logging, dashboards, feeds; PHP + MySQL; production deployments worldwide |
| 3 | [FlexMeasures/flexmeasures](https://github.com/FlexMeasures/flexmeasures) | Apache-2.0 | ~900 | LF Energy intelligent EMS: VPP, demand response, OpenADR, S2 protocol; Python/Flask |
| 4 | [EVerest/everest-core](https://github.com/EVerest/everest-core) | Apache-2.0 | ~600 | LF Energy EV charging firmware stack; ISO 15118-20, OCPP 2.0.1, TPM 2.0; 2026.02.0 LTS |
| 5 | [OSGP/open-smart-grid-platform](https://github.com/OSGP/open-smart-grid-platform) | Apache-2.0 | ~500 | Grid eXchange Fabric (GXF) — IoT platform for smart grid devices: OSLP, IEC 61850, DLMS protocols |
| 6 | [Power-Agent/PowerMCP](https://github.com/Power-Agent/PowerMCP) | MIT | ~400 | MCP servers for PowerWorld/PSS-E/OpenDSS — LLMs interact with power simulation software |
| 7 | [pypsa/PyPSA](https://github.com/PyPSA/PyPSA) | MIT | ~1.3k | Python for Power System Analysis — energy system optimization at sector-coupled network level |
| 8 | [lf-energy/powsybl-core](https://github.com/powsybl/powsybl-core) | MPL-2.0 | ~150 | PowSyBl — grid modelling and simulation; 2026.0.0; powers TenneT's ReFlow (10× speedup) |
| 9 | [ugr-sail/sinergym](https://github.com/ugr-sail/sinergym) | MIT | ~400 | Gym environment for building energy simulation with RL; wraps EnergyPlus; used for B2G research |
| 10 | [IBM/rl-testbed-for-energyplus](https://github.com/IBM/rl-testbed-for-energyplus) | MIT | ~220 | RL testbed for EnergyPlus building simulation; PPO/DQN baselines; pairs with sinergym |

## Why These Are Foundational

### OpenEMS — The European EMS Standard
Java-based, component framework. Every device (inverter, BESS, meter, EV charger) is an OSGi component. AI layer goes on top as a Controller component.
- **Real deployments:** German utilities, community energy projects, industrial facilities
- **AI hooks:** REST API + OSGi event bus → plug in FlexMeasures or custom LLM scheduler

### FlexMeasures — VPP & DR Core
The only open-source platform with built-in belief propagation forecasting, scheduling optimization, and OpenADR support. LF Energy stewardship = long-term stability.
- **AI-native by design:** Every sensor has a forecast, every asset has a schedule
- **Quickstart:** `docker compose up` → live in 10 minutes with sample data

### EVerest — EV Charging Firmware
The Linux of EV charging. OEM-validated (multiple commercial charger vendors ship EVerest-based firmware). 2026.02.0 is the first LTS release.
- **ISO 15118-20:** Bidirectional charging (V2G) out of box
- **AI integration point:** EXI/ISO 15118 session → FlexMeasures schedule → EVerest set-point

### PyPSA — Energy System Optimization
Sector-coupled optimization: electricity + heat + hydrogen + mobility. Used by research groups and national grid operators for capacity expansion planning.
- **AI use:** LLM-driven scenario generation → PyPSA optimization → result interpretation
- **Key feature:** Handles European interconnected grid models at continental scale

### sinergym — RL for Buildings
The standard gym environment for building energy RL research. Wraps EnergyPlus with a clean OpenAI Gym interface.
- **Links to AutoB2G** (arXiv:2603.26005) which extends sinergym's successor CityLearn V2
- **Production path:** Train in sinergym → deploy policy in BMS via REST API

## Support Infrastructure

| Repo | License | Stars | Role |
|------|---------|-------|------|
| [lf-energy/operatorfabric-core](https://github.com/opfab/operatorfabric-core) | MPL-2.0 | ~200 | Control room UI — structured cards for operator alerts; AINETUS integration |
| [lf-energy/seapath](https://github.com/seapath) | Apache-2.0 | — | Real-time grid automation platform for virtualized protection apps (LF Energy) |
| [openremote/openremote](https://github.com/openremote/openremote) | AGPL-3.0 | ~1.8k | IoT platform for energy + smart city; MQTT/WebSocket; strong LATAM presence |
| [ArsamAryandoust/awesome-ml-power-systems](https://github.com/ArsamAryandoust/awesome-ml-power-systems) | MIT | ~180 | Curated ML for power systems: papers, datasets, benchmarks, software |
| [OpenEnergyPlatform/awesome-sustainable-technology](https://github.com/OpenEnergyPlatform/awesome-sustainable-technology) | MIT | ~2k | Master list of sustainable energy OSS — discovery resource |

## Maturity Assessment

| Repo | Production Ready | LATAM Viable | AI-Native | Globant Build-On Score |
|------|-----------------|--------------|-----------|----------------------|
| OpenEMS | ✅ | ✅ | 🔧 | ★★★★☆ |
| FlexMeasures | ✅ | ✅ | ✅ | ★★★★★ |
| EVerest | ✅ | 🔧 (emerging) | 🔧 | ★★★★☆ |
| PyPSA | ✅ | ✅ | 🔧 | ★★★★☆ |
| PowerMCP | 🔧 | ✅ | ✅ | ★★★★★ |
| sinergym | Research | ✅ | ✅ | ★★★☆☆ |
| GXF / OSGP | ✅ (EU focus) | 🔧 | 🔧 | ★★★☆☆ |

`✅` = yes · `🔧` = with effort · `Research` = not yet production
