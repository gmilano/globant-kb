# 🏗️ Repos fundacionales — Energy

> Bases sobre las cuales construir soluciones de AI para el sector energético. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-09

## Plataformas y frameworks base

| Repo | Licencia | Descripción | ¿Base para AI? |
|------|----------|-------------|----------------|
| [PyPSA/PyPSA](https://github.com/PyPSA/PyPSA) | MIT | Python for Power System Analysis. Optimización y simulación de sistemas eléctricos. MILP, OPF, sector-coupling. | Sí — 2.0k ★ |
| [e2nIEE/pandapower](https://github.com/e2nIEE/pandapower) | BSD-3-Clause | Modelado y análisis de redes de distribución eléctrica. Integra con PyPSA y scikit-learn para AI planning. | Sí — 1.2k ★ |
| [Grid2op/grid2op](https://github.com/Grid2op/grid2op) | LGPL-2.1 | Simulador de decisiones secuenciales en red eléctrica (RTE France). Interfaz Gymnasium para agentes RL. | Sí — 700+ ★ |
| [MyEMS/myems](https://github.com/MyEMS/myems) | MIT | Sistema de gestión energética full-stack ISO 50001. Python + React. BEMS, CEMS, FEMS, solar, EV charging, VPP. | Sí — 900+ ★ |
| [OpenEMS/openems](https://github.com/OpenEMS/openems) | AGPL-3.0 / EPL-2.0 | Sistema modular de gestión energética para renovables, baterías, EV y microgrids. Java + Angular. | Sí — 615 ★ |
| [VOLTTRON/volttron](https://github.com/VOLTTRON/volttron) | Apache-2.0 | Plataforma de agentes DOE/PNNL. Demand response, AFDD, HVAC AI, smart metering, grid services. | Sí — 700+ ★ |
| [OSeMOSYS/OSeMOSYS](https://github.com/OSeMOSYS/OSeMOSYS) | Apache-2.0 | Modelo de optimización energética de largo plazo usado por IEA, IRENA, UNDESA. Planificación de sistemas. | Sí — 400+ ★ |
| [ugr-sail/sinergym](https://github.com/ugr-sail/sinergym) | MIT | Gym environment RL para control climático y gestión energética de edificios (EnergyPlus backend). | Sí — 230+ ★ |
| [emoncms/emoncms](https://github.com/emoncms/emoncms) | AGPL-3.0 | Web-app para monitoreo, logging y visualización de energía. Base ideal para añadir anomaly detection AI. | Sí — 1.5k ★ |
| [DLR-RM/stable-baselines3](https://github.com/DLR-RM/stable-baselines3) | MIT | Implementaciones RL confiables (PPO, SAC, TD3, DQN) en PyTorch v2.9 (Jun 2026). Estándar para agentes energía. | Sí — 10k+ ★ |

---

## Por qué estos repos como base

### PyPSA + pandapower
El dúo estándar para power system analysis en Python. PyPSA para planificación de sistemas y sector-coupling (gas, H2, calor). pandapower para análisis de distribución y flujos de carga. Ambos se usan como backend para optimización con ML.

### Grid2Op (LF Energy)
Estandariza el ambiente de simulación para agentes RL en gestión de redes. RTE France lo usa en producción. Las competencias L2RPN definen el estado del arte en control autónomo de redes.

### MyEMS + OpenEMS
Los dos EMS open source más maduros. MyEMS tiene MIT license (más permisivo), OpenEMS tiene AGPL. Ambos soportan solar, BESS, EV charging, microgrids. MyEMS tiene módulo AI de optimización incorporado.

### VOLTTRON (DOE/PNNL)
La plataforma de agentes más robusta para integración building-grid. Licencia Apache-2.0. Usada en programas DOE de demand response. Arquitectura de agentes publicar/suscribir ideal para sistemas multi-agente.

### Stable-Baselines3
El estándar de facto para entrenar agentes RL sobre Grid2Op, sinergym y energym. Versión 2.9.0 (Jun 2026) activa.

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
