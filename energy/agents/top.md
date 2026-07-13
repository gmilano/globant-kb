# 🎯 Agentes AI — Energy

> Agentes y herramientas AI open source para la industria energética. Foco: MIT / Apache 2.0 / BSD.
> Última actualización: 2026-07-13

## Agentes y herramientas destacadas

| Nombre | Licencia | Descripción | Stars |
|--------|----------|-------------|-------|
| [pandapower](https://github.com/e2nIEE/pandapower) | BSD-3-Clause | Modelado, análisis y optimización de redes eléctricas sobre pandas; simulación de flujo de carga, cortocircuito y óptimo. Base para agentes que razonan sobre distribución. | ~1.2k |
| [PyPSA](https://github.com/PyPSA/PyPSA) | MIT | Python for Power System Analysis — optimización de sistemas de energía con almacenamiento, renovables y redes de transmisión. Estándar de investigación y planificación. | ~2k |
| [Grid2Op/grid2op](https://github.com/Grid2op/grid2op) | LGPLv2.1 | Testbed LF Energy para agentes RL en sistemas de potencia; base de las competiciones L2RPN (Learning To Run Power Network) de RTE France. Plataforma de evaluación de agentes de control. | ~1.1k |
| [emarche/RL2Grid](https://github.com/emarche/RL2Grid) | MIT | Benchmark estandarizado de RL sobre Grid2Op para operaciones reales de red; 39 tareas (topología + redispatch/curtailment), desarrollado con TSOs europeos. Extiende CleanRL. | ~180 |
| [sinergym](https://github.com/ugr-sail/sinergym) | MIT | Entorno Gymnasium para simulación y control de edificios con RL; integra EnergyPlus, soporte multi-agente y Google Cloud. Ideal para optimización HVAC y eficiencia de edificios. | ~280 |
| [OpenEMS/openems](https://github.com/OpenEMS/openems) | Apache-2.0 | Plataforma modular de gestión energética para almacenamiento, renovables y carga EV; edge runtime + backend + UI. El "Odoo del sector energético europeo". | ~780 |
| [FlexMeasures/flexmeasures](https://github.com/FlexMeasures/flexmeasures) | Apache-2.0 | EMS inteligente de LF Energy para optimizar flexibilidad energética en tiempo real; gestiona BESS, bombas de calor y procesos industriales flexibles. API REST + plugins. | ~300 |
| [EVerest/EVerest](https://github.com/EVerest/EVerest) | Apache-2.0 | Stack de firmware open source (LF Energy) para cargadores EV — desde AC doméstico hasta DC público. v2026.02.0 = primera versión LTS. Usado en producción por Tritium, Pionix y otros OEMs. | ~620 |
| [opfgym](https://github.com/Digitalized-Energy-Systems/opfgym) | MIT | Framework Gymnasium para RL en flujo de potencia óptimo (OPF); cinco entornos benchmark comparables (IEEE 14, 30, 118 bus). | ~85 |
| [pypsa-meets-earth/pypsa-earth](https://github.com/pypsa-meets-earth/pypsa-earth) | MIT | Primer modelo abierto cross-sectorial del sistema energético global con alta resolución; aplicaciones de hidrógeno y Global South. Paper en Applied Energy 2025. | ~350 |

## Plataformas de evaluación / benchmarks (2026)

| Nombre | Fuente | Descripción |
|--------|--------|-------------|
| **Power Systems Agent Benchmark (PSAB)** | [arXiv:2606.20950](https://arxiv.org/pdf/2606.20950) | Benchmark ejecutable para agentes en ingeniería eléctrica — 41 familias de tareas: flujo de potencia, protección, estabilidad, DER, microrredes, confiabilidad, calidad y forecasting. Evaluador determinista. |
| **EnergyAgentBench** | [arXiv:2605.15230](https://arxiv.org/pdf/2605.15230) | Primer benchmark multi-familia de agentes LLM sobre datos reales de infraestructura energética — 70 variantes de tareas en 5 familias; 1,414 runs evaluados (período mayo 2026). |
| **PowerAgentBench-Dyn** | [arXiv:2606.20401](https://arxiv.org/abs/2606.20401) | Benchmark para Agentic AI en estudios dinámicos de sistemas eléctricos; tareas de razonamiento e ingeniería iterativa. Harvard + Politecnico di Milano + UBITECH. |
| **PFBench** | [IEEE DataPort](https://ieee-dataport.org/documents/power-flow-benchmark-llm-based-power-system-agent-evaluation-pfbench) | Dataset benchmark reproducible para razonamiento de flujo de potencia, output estructurado y uso de herramientas. Publicado mar 2026. |
| **RL2Grid** | [github.com/emarche/RL2Grid](https://github.com/emarche/RL2Grid) | Benchmark RL sobre Grid2Op desarrollado con TSOs; estandariza espacios de estado/acción, reward structures y baselines (DQN, PPO, SAC, TD3, Lagrangian PPO). |

## Agentes LLM emergentes (investigación activa 2026)

| Nombre | Fuente | Descripción |
|--------|--------|-------------|
| **OpenGridFM** | [LF Energy](https://lfenergy.org/projects/opengridfm/) | Framework open source (LF Energy 2026) para el surgimiento de foundation models para redes eléctricas (GridFMs); alta velocidad de cómputo y representaciones de propósito general. |
| **AINETUS** | [LF Energy](https://lfenergy.org/lf-energy-new-members-projects-and-portfolio-growth/) | AI for Safety-Critical Network Infrastructures — RL + XAI + estimación de incertidumbre + HMI para salas de control de operadores de red. Integra Grid2Op y OperatorFabric. |
| **Grid-Agent** | [arXiv:2508.05702](https://arxiv.org/abs/2508.05702) | Framework multi-agente LLM para detección y corrección de violaciones en redes (IEEE 69-bus, CIGRE MV). |
| **PowerDAG** | [arXiv:2603.17418](https://arxiv.org/pdf/2603.17418) | Sistema agentico confiable para automatizar análisis de distribución; DAG de herramientas + validación. |
| **GridMind / X-GridAgent** | [Power-Agent](https://github.com/Power-Agent) | Agentes LLM para análisis de sistemas de potencia; incubados en la comunidad Power-Agent, presentados en Supercomputing '25. |

---
*Actualizado automáticamente por el pipeline de ingest.*
