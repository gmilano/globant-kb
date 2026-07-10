# 🎯 Top AI Agents — Energy

> Agentes y herramientas AI open source para la industria energética. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-10

## Agentes y herramientas destacadas

| Nombre | Repo | Licencia | Stars | Descripción |
|--------|------|----------|-------|-------------|
| PowerMCP | [Power-Agent/PowerMCP](https://github.com/Power-Agent/PowerMCP) | MIT | ~160 | MCP servers para PowerWorld, PSSE, OpenDSS, pandapower, PyPSA; permite a LLMs interactuar directamente con simuladores de red eléctrica |
| PowerSkills | [Power-Agent/PowerSkills](https://github.com/Power-Agent/PowerSkills) | MIT | ~90 | Agent Skills para análisis de sistemas de potencia: flujo de carga, cortocircuito, estabilidad dinámica; Claude Code + Cursor compatible |
| PowerFM | [Power-Agent/PowerFM](https://github.com/Power-Agent/PowerFM) | MIT | ~75 | Foundation models para dominio energético: forecasting de carga, detección de fallos, simulación de red; fine-tuning dataset incluido |
| PowerWF | [Power-Agent/PowerWF](https://github.com/Power-Agent/PowerWF) | MIT | ~55 | Agentic workflows para operaciones de sistemas de potencia; automatiza análisis de distribución y despacho |
| kaymen99/AI-for-energy-sector | [kaymen99/AI-for-energy-sector](https://github.com/kaymen99/AI-for-energy-sector) | MIT | ~320 | ML/DL models para forecasting de demanda, optimización renovable, eficiencia en edificios, estabilidad de red |
| sinergym | [ugr-sail/sinergym](https://github.com/ugr-sail/sinergym) | MIT | ~231 | Gym environment para simulación y control de edificios con RL + EnergyPlus; soporte multi-zona, multi-objetivo |
| rl-testbed-for-energyplus | [IBM/rl-testbed-for-energyplus](https://github.com/IBM/rl-testbed-for-energyplus) | MIT | ~217 | RL Testbed de IBM para optimización de consumo energético en edificios con EnergyPlus |
| Grid2Op | [rte-france/Grid2Op](https://github.com/rte-france/Grid2Op) | LGPL-3.0 | ~1.1k | Framework RL para agentes de operación de red eléctrica (LF Energy project); usado en competiciones L2RPN |
| OpenSTEF | [OpenSTEF/openstef](https://github.com/OpenSTEF/openstef) | MPL-2.0 | ~400 | AutoML pipelines para forecasting probabilístico de corto plazo de carga eléctrica; usado en producción por Alliander NL |
| lemlab | [tum-ewk/lemlab](https://github.com/tum-ewk/lemlab) | GPL-3.0 | ~120 | Framework multi-agente para mercados locales de energía P2P; TU Munich; incluye data time-series de prosumidores reales |

---

## Ecosistema Power-Agent (julio 2026)

El grupo [Power-Agent en GitHub](https://github.com/Power-Agent) es la iniciativa open source más cohesionada para LLMs en sistemas de potencia en 2026:

- **PowerMCP**: capa de herramientas (MCP servers) → expone simuladores como tools para LLMs
- **PowerSkills**: capa de conocimiento → instrucciones especializadas por tipo de análisis
- **PowerFM**: capa de modelos → foundation models fine-tuned en dominio energético
- **PowerWF**: capa de orquestación → workflows completos para tareas de ingeniería de potencia
- **PowerAgentBench**: capa de evaluación → benchmark para comparar agentes en tareas reales

Compatible con Claude Code, Cursor, y cualquier cliente MCP. Base pandapower + PyPSA no requiere licencias comerciales.

---

## Benchmarks de Agentes en Sistemas de Potencia (2026)

| Paper | arXiv | Foco |
|-------|-------|------|
| Power Systems Agent Benchmark | [2606.20950](https://arxiv.org/abs/2606.20950) | Evaluación ejecutable de agentes en ingeniería de potencia |
| PowerAgentBench-SS | [2606.18789](https://arxiv.org/abs/2606.18789) | Estudios en estado estacionario |
| PowerAgentBench-Dyn | [2606.20401](https://arxiv.org/abs/2606.20401) | Estudios de dinámica y estabilidad |
| PowerDAG | [2603.17418](https://arxiv.org/abs/2603.17418) | Agente agentic confiable para análisis de distribución |
| RL2Grid | [2503.23101](https://arxiv.org/abs/2503.23101) | Benchmark RL para operaciones de red eléctrica |

---
*Actualizado automáticamente por el pipeline de ingest.*
