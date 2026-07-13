# 🏗️ Repos fundacionales — Energy

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-13

## Simuladores y análisis de sistemas de potencia

| Repo | Licencia | Descripción | ¿Base para AI? |
|------|----------|-------------|----------------|
| [PyPSA/PyPSA](https://github.com/PyPSA/PyPSA) | MIT | Python for Power System Analysis — flujo de potencia, OPF, planificación con renovables y almacenamiento. Estándar de investigación y utilities. | Sí — ~2k★ |
| [e2nIEE/pandapower](https://github.com/e2nIEE/pandapower) | BSD-3-Clause | Modelado conveniente de redes eléctricas sobre pandas; integración directa con PYPOWER y MATPOWER. Ampliamente usado en agentes de análisis. | Sí — ~1.2k★ |
| [PowerGridModel/power-grid-model](https://github.com/PowerGridModel/power-grid-model) | MPL-2.0 | Librería Python/C++ de cálculo batch para distribución; 10M+ descargas; usada en producción por los 3 grandes DSOs holandeses (Alliander, Enexis, Stedin). | Sí — ~290★ |
| [gridlab-d/gridlab-d](https://github.com/gridlab-d/gridlab-d) | BSD-style (DOE/PNNL) | Simulador de distribución nivel avanzado del DOE; modelo de HVAC, EV, almacenamiento y respuesta a demanda. | Sí — ~210★ |
| [dss-extensions/dss_capi](https://github.com/dss-extensions/dss_capi) | BSD-3-Clause | Implementación multi-plataforma de OpenDSS (C-API); distribución y recursos energéticos distribuidos. | Sí — ~130★ |

## Entrenamiento y benchmark de agentes RL

| Repo | Licencia | Descripción | ¿Base para AI? |
|------|----------|-------------|----------------|
| [Grid2op/grid2op](https://github.com/Grid2op/grid2op) | LGPLv2.1 | Testbed LF Energy para agentes RL en sistemas de potencia; base de competiciones L2RPN y múltiples papers 2026. Soporta AC completo, eventos estocásticos, restricciones de seguridad. | Sí — ~1.1k★ |
| [emarche/RL2Grid](https://github.com/emarche/RL2Grid) | MIT | Benchmark RL estandarizado sobre Grid2Op, desarrollado con TSOs europeos; 39 tareas (topología + redispatch/curtailment), baselines DQN/PPO/SAC/TD3, integración wandb. | Sí — ~180★ |
| [ugr-sail/sinergym](https://github.com/ugr-sail/sinergym) | MIT | Gymnasium para RL en edificios con EnergyPlus; multi-zona, multi-agente, cloud-ready. Ideal para optimización HVAC y eficiencia de edificios comerciales. | Sí — ~280★ |
| [Digitalized-Energy-Systems/opfgym](https://github.com/Digitalized-Energy-Systems/opfgym) | MIT | Framework RL para OPF; 5 entornos benchmark (IEEE 14, 30, 118 bus) listos para entrenar y comparar agentes. | Sí — ~85★ |

## Gestión energética y control

| Repo | Licencia | Descripción | ¿Base para AI? |
|------|----------|-------------|----------------|
| [OpenEMS/openems](https://github.com/OpenEMS/openems) | Apache-2.0 | Plataforma modular para gestión de BESS, renovables, EV charging y microgrid; edge runtime + cloud backend. Extensible con plugins Java. | Sí — ~780★ |
| [FlexMeasures/flexmeasures](https://github.com/FlexMeasures/flexmeasures) | Apache-2.0 | EMS open source (LF Energy, Seita) para optimizar flexibilidad energética en tiempo real; gestiona BESS, bombas de calor y cargas flexibles; API REST + plugins. v0.31 jul 2026. | Sí — ~300★ |
| [openremote/openremote](https://github.com/openremote/openremote) | AGPL-3.0 | Plataforma IoT open source para dispositivos energéticos; reglas, dashboards, API REST/MQTT. Tutorial EMS disponible en wiki. | Sí — ~1.8k★ |
| [EVerest/EVerest](https://github.com/EVerest/EVerest) | Apache-2.0 | Stack firmware open source (LF Energy) para cargadores EV — AC doméstico a DC público; v2026.02.0 LTS en producción en múltiples OEMs. | Sí — ~620★ |

## Modelos de sistema energético global

| Repo | Licencia | Descripción | ¿Base para AI? |
|------|----------|-------------|----------------|
| [pypsa-meets-earth/pypsa-earth](https://github.com/pypsa-meets-earth/pypsa-earth) | MIT | Modelo abierto del sistema energético mundial con alta resolución espacio-temporal; reproducible, paper Applied Energy 2025. | Sí — ~350★ |
| [OpenEnergyPlatform/awesome-sustainable-technology](https://github.com/OpenEnergyPlatform/awesome-sustainable-technology) | MIT | Lista curada de proyectos open source para energía sostenible; referencia de ecosistema activa. | Referencia — ~1.1k★ |

## Infraestructura y protocolo

| Repo | Licencia | Descripción | ¿Base para AI? |
|------|----------|-------------|----------------|
| [seapath](https://github.com/seapath) | Apache-2.0 | Hipervisor software para subestaciones digitales IEC 61850 (LF Energy); v1.0 en producción en utilities europeas. | Sí — base OT |
| [GRIDAPPSD/Powergrid-Models](https://github.com/GRIDAPPSD/Powergrid-Models) | BSD | Interfaces CIM para GridLAB-D y OpenDSS; feeders de prueba IEEE, EPRI y PNNL. | Sí — datos |

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
