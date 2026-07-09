# Agentes AI — Automotive

> Agentes y herramientas AI open source para la industria automotriz. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-09 (v2 — OpenDriveVLA AAAI 2026, HERMES ICCV 2025, awesome-vla-for-ad)

## Agentes y herramientas destacadas

| Nombre | Licencia | Stars | Descripción |
|--------|----------|-------|-------------|
| [Alpamayo-1](https://huggingface.co/nvidia/alpamayo-1) | Apache-2.0 | — | **NUEVO CES 2026** — Primer modelo VLA (Vision-Language-Action) razonador open source para vehículos autónomos. 10B parámetros. Chain-of-thought: el vehículo razona el escenario antes de actuar. Adoptado por Mercedes-Benz, JLR, Lucid, Uber. HuggingFace. |
| [AlpaSim](https://github.com/NVlabs/alpasim) | Apache-2.0 | — | Framework de simulación closed-loop para entrenamiento y evaluación de modelos AV razonadores. Se distribuye junto con Alpamayo-1 e incluye +1.700h de datos de conducción real. |
| [openpilot](https://github.com/commaai/openpilot) | MIT | 63k | Sistema operativo de robótica para vehículos — ADAS nivel 2+ en 300+ modelos de autos. 50M+ millas acumuladas. STT+control+planning end-to-end. comma 4 hardware 2026. |
| [apollo](https://github.com/ApolloAuto/apollo) | Apache-2.0 | 26.7k | Plataforma autónoma abierta de Baidu. Percepción, localización, planning, control. Apollo 11.0 (2026): bajo threshold de hardware. C++/Python/ROS. |
| [autoware](https://github.com/autowarefoundation/autoware) | Apache-2.0 | 10k+ | El stack AV open source más usado del mundo (100+ empresas, 30 vehículos, 20 países). ROS 2 nativo. Autoware Foundation. |
| [carla](https://github.com/carla-simulator/carla) | MIT | 14.1k | Simulador fotorrealista de conducción autónoma basado en Unreal Engine. RGB/LiDAR/Radar/IMU. Integra con ROS, Autoware, Apollo. |
| [Awesome-LLM4AD](https://github.com/Thinklab-SJTU/Awesome-LLM4AD) | MIT | 2.1k | Lista curada de LLM/VLM/VLA/World Models para conducción autónoma. Actualización continua. SJTU Thinklab. |
| [DriveLM](https://github.com/OpenDriveLab/DriveLM) | Apache-2.0 | 1.8k | Graph Visual Question Answering para driving. Baseline VLM end-to-end. ECCV 2024 Oral. OpenDriveLab. |
| [DriveMLM](https://github.com/OpenGVLab/DriveMLM) | Apache-2.0 | 850 | Framework LLM para conducción autónoma close-loop. Multimodal + behavior planning con reglas de tráfico + sensor input. OpenGVLab. |
| [traccar](https://github.com/traccar/traccar) | Apache-2.0 | 5.2k | Sistema GPS tracking open source. 200+ protocolos, 2000+ modelos de dispositivos. Backend Java, dashboard web. Flota, logística. |
| [carma-platform](https://github.com/usdot-fhwa-stol/carma-platform) | Apache-2.0 | 312 | Plataforma USDOT para Cooperative Driving Automation (CDA). SAE L2, ROS2. V2X infrastructure communication. Plugin API para algoritmos propios. |
| [pylot](https://github.com/erdos-project/pylot) | Apache-2.0 | 534 | Plataforma modular AV sobre CARLA + vehículos reales. Percepción, predicción, planning independientes. Python. |
| [autoware_universe](https://github.com/autowarefoundation/autoware_universe) | Apache-2.0 | 1.7k | Core de Autoware: planning, perception, control, localization. El repo activo principal de Autoware Foundation. |
| [PCLA](https://github.com/MasoudJTehrani/PCLA) | Apache-2.0 | 77 | Framework de testing de agentes autónomos en CARLA. Escenarios parametrizables, métricas de seguridad. Alineado con CARLA Leaderboard 2.1 (mar 2026). |
| [OpenDriveVLA](https://github.com/DriveVLA/OpenDriveVLA) | Apache-2.0 | 380 | **AAAI 2026** — End-to-end autonomous driving con Vision-Language Action Model. Alineación jerárquica visión-lenguaje: proyecta tokens 2D+3D a espacio semántico unificado. Condicionado en ego-state, comandos del conductor y percepción 3D del entorno. TUM. |
| [HERMES](https://github.com/LMD0311/HERMES) | Apache-2.0 | 950 | **ICCV 2025** — World Model unificado para conducción autónoma: 3D scene understanding + future scene generation en un solo modelo. Pesos preentrenados open. Base para simulación agentica. |
| [LEAD](https://github.com/kesai-labs/lead) | MIT | New | **CVPR 2026** — LEAD: minimiza la asimetría aprendiz-experto en conducción end-to-end. Nuevo SOTA en CARLA Leaderboard 2. kesai-labs. |
| [Vehicle-Diagnostic-Assistant](https://github.com/castlebbs/Vehicle-Diagnostic-Assistant) | MIT | 200 | Agente LangChain + Claude que conecta directo al auto vía OBD2. Decodifica DTCs, VINs, busca tutoriales de reparación. Patrón MCP+OBD2 validado. |
| [open-mechanic](https://github.com/speed785/open-mechanic) | MIT | 120 | OBD-II adapter + Claude API = diagnóstico en lenguaje natural. Retorna: severidad, causa raíz, pasos de reparación, costo estimado. Stack: pyobd + Anthropic SDK. |

---

## Surveys y Listas Curadas — VLA / World Models para AD

| Repo | Licencia | Stars | Descripción |
|------|----------|-------|-------------|
| [awesome-vla-for-ad](https://github.com/worldbench/awesome-vla-for-ad) | MIT | 520 | Lista curada de VLA models para AD — dos paradigmas: End-to-End VLA y Dual-System VLA (VLM lento + planner rápido). worldbench. |
| [Awesome-LLM4AD](https://github.com/Thinklab-SJTU/Awesome-LLM4AD) | MIT | 2.1k | Lista curada LLM/VLM/VLA/World Models para AV. Continually updated. SJTU Thinklab. 300+ repos. |
| [World-Models-Autonomous-Driving-Survey](https://github.com/HaoranZhuExplorer/World-Models-Autonomous-Driving-Survey) | MIT | 680 | Survey exhaustivo de world models para AV: CoWorld-VLA, DriveFuture, GEM, Driver-WM. Actualizado 2026. |
| [Awesome-World-Model](https://github.com/LMD0311/Awesome-World-Model) | MIT | 1.2k | World models para AD + robótica: papers, código, sitios. HERMES author. |

---

## MCP Servers para Automotive

| Servidor MCP | Descripción | Fuente |
|--------------|-------------|--------|
| NVIDIA DriveOS MCP | APIs de vehículo (CAN bus, sensores, actuadores) via MCP para agentes in-vehicle | NVIDIA Developer Blog 2026 |
| Traccar MCP | Telemetría GPS de flota via MCP — posición, velocidad, fuel, alertas | Comunidad |
| HERE Maps MCP | Routing, traffic, EV charging stations via MCP | HERE Technologies |
| OBD-II Bridge MCP | Diagnóstico vehicular (DTCs, sensor data) via MCP + Bluetooth OBD adapter | OSS |

---

## Benchmarks Automotrices

| Benchmark | Descripción | Referencia |
|-----------|-------------|------------|
| nuScenes | Dataset 3D perception + tracking (1000 escenas, Boston+Singapur) | nuScenes.org |
| Waymo Open Dataset | 1000+ segmentos 3D LiDAR + cámara, 12M objetos 3D | waymo.com/open |
| CARLA Leaderboard 2.1 | Benchmark AV en CARLA simulador: route completion + infractions. v2.1 (mar 2026): nuevo scoring de infracciones. Fail2Drive 2026 para long-tail. | carla.org |
| DriveLM-Challenge | VLM driving challenge CVPR 2024 | OpenDriveLab |
| Agent2Agent Safety Taxonomy | Vulnerabilidades en LLM assistants automotrices (arXiv 2026) | arXiv |

---
*Actualizado automáticamente por el pipeline de ingest.*
