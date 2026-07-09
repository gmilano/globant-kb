# Agentes AI — Automotive

> Agentes y herramientas AI open source para la industria automotriz. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-08

## Agentes y herramientas destacadas

| Nombre | Licencia | Stars | Descripción |
|--------|----------|-------|-------------|
| [openpilot](https://github.com/commaai/openpilot) | MIT | 60.8k | Sistema operativo de robótica para vehículos — ADAS nivel 2+ en 325+ modelos de autos. 100M+ millas acumuladas. STT+control+planning end-to-end. |
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
| [PCLA](https://github.com/MasoudJTehrani/PCLA) | Apache-2.0 | 77 | Framework de testing de agentes autónomos en CARLA. Escenarios parametrizables, métricas de seguridad. |

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
| CARLA Leaderboard 2.0 | Benchmark AV en CARLA simulador: route completion + infractions | carla.org |
| DriveLM-Challenge | VLM driving challenge CVPR 2024 | OpenDriveLab |
| Agent2Agent Safety Taxonomy | Vulnerabilidades en LLM assistants automotrices (arXiv 2026) | arXiv |

---
*Actualizado automáticamente por el pipeline de ingest.*
