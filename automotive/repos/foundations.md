# Repos fundacionales — Automotive

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-10 (v3 — Eclipse SDV stack: KUKSA, Velocitas, Leda, SDV Blueprints)

## Simulación y Testing

| Repo | Licencia | Stars | Descripción | Base para AI? |
|------|----------|-------|-------------|---------------|
| [carla](https://github.com/carla-simulator/carla) | MIT | 14.1k | Simulador fotorrealista AV en Unreal Engine. RGB/LiDAR/Radar/IMU. Python/C++ API. Integra ROS, Autoware, Apollo. CARLA Leaderboard 2.1 mar 2026. | Sí — el estándar |
| [ros-bridge](https://github.com/carla-simulator/ros-bridge) | MIT | 637 | Bridge ROS para CARLA. Conecta CARLA a ROS stack (Autoware, CARMA, etc.). | Sí |
| [gym-carla](https://github.com/cjy1992/gym-carla) | MIT | 620 | OpenAI Gym wrapper para CARLA. Entrenamiento de agentes RL en simulador. | Sí — RL training |
| [PCLA](https://github.com/MasoudJTehrani/PCLA) | Apache-2.0 | 77 | Framework de testing de agentes en CARLA. Escenarios parametrizables + métricas seguridad. | Sí — CI/CD para AV |
| [pylot](https://github.com/erdos-project/pylot) | Apache-2.0 | 534 | Plataforma modular AV sobre CARLA + real. Percepción/predicción/planning modulares. | Sí |

## Stacks de Conducción Autónoma

| Repo | Licencia | Stars | Descripción | Base para AI? |
|------|----------|-------|-------------|---------------|
| [openpilot](https://github.com/commaai/openpilot) | MIT | 60.6k | OS de robótica automotriz. ADAS L2+ en 325+ autos. Python. Probado con 300M+ millas reales. | Sí — más maduro |
| [autoware](https://github.com/autowarefoundation/autoware) | Apache-2.0 | 11.8k | Stack AV más adoptado por industria. ROS 2 nativo. 100+ empresas. Modular: perception/planning/control/localization. | Sí — industria |
| [autoware_universe](https://github.com/autowarefoundation/autoware_universe) | Apache-2.0 | 1.7k | Core activo de Autoware. Planning, perception, control. El repo principal. | Sí |
| [autoware_vision_pilot](https://github.com/autowarefoundation/autoware_vision_pilot) | Apache-2.0 | 800 | Stack ADAS L2 production-ready. End-to-End AI. "Free self-driving car stack". Abr 2026. | Sí — production |
| [apollo](https://github.com/ApolloAuto/apollo) | Apache-2.0 | 26.7k | Plataforma AV de Baidu. Apollo 11.0 (jun 2026). C++. Perception/localization/planning/control completo. | Sí — más completo |
| [carma-platform](https://github.com/usdot-fhwa-stol/carma-platform) | Apache-2.0 | 312 | USDOT Cooperative Driving Automation. SAE L2, ROS2. V2X. Plugin API. | Sí — V2X focus |

## Eclipse SDV — Software Defined Vehicle Stack

> Stack de middleware open source de la Eclipse Foundation para in-vehicle apps. Apache-2.0. OEMs y Tier 1 lo adoptan en 2026 como estándar de interoperabilidad.

| Repo | Licencia | Stars | Descripción | Base para AI? |
|------|----------|-------|-------------|---------------|
| [eclipse-kuksa/kuksa.val](https://github.com/eclipse-kuksa/kuksa.val) | Apache-2.0 | 400+ | KUKSA Data Broker: broker de señales VSS (Vehicle Signal Specification). gRPC + MQTT. La "POSIX layer" del SDV — todo lo que pasa por él. | Sí — datos vehículo |
| [eclipse-velocitas/vehicle-app-python-sdk](https://github.com/eclipse-velocitas/vehicle-app-python-sdk) | Apache-2.0 | — | SDK Python para Vehicle Apps containerizadas. Templates, CI/CD, Velocitas CLI. 28 repos en la org. | Sí — Vehicle Apps |
| [eclipse-velocitas/vehicle-app-cpp-sdk](https://github.com/eclipse-velocitas/vehicle-app-cpp-sdk) | Apache-2.0 | — | SDK C++ para Vehicle Apps de bajo nivel con rendimiento. | Sí — embedded |
| [eclipse-leda/leda-distro](https://github.com/eclipse-leda/leda-distro) | Apache-2.0 | — | Distro Linux mínima para SDV edge. OTA updates, container orchestration, Fluentd. | Sí — edge runtime |
| [eclipse-autowrx/sdv-runtime](https://github.com/eclipse-autowrx/sdv-runtime) | Apache-2.0 | — | Runtime de referencia SDV. Prototipado rápido de Vehicle Apps sobre KUKSA. | Sí — prototipo |
| [eclipse-sdv-blueprints](https://github.com/eclipse-sdv-blueprints) | Apache-2.0 | — | Blueprints end-to-end: in-vehicle edge → fleet backend. Conecta KUKSA + Leda + nube. | Sí — full stack |

## Datasets y Benchmarks

| Repo | Licencia | Descripción | Uso |
|------|----------|-------------|-----|
| [nuscenes-devkit](https://github.com/nutonomy/nuscenes-devkit) | Apache-2.0 | SDK para nuScenes: 1000 escenas, 1.4M anotaciones 3D, Boston+Singapur. | Evaluación percepción |
| [waymo-open-dataset](https://github.com/waymo-research/waymo-open-dataset) | Apache-2.0 | 1000+ segmentos LiDAR + cámara, 12M+ objetos 3D anotados. Estado del arte. | Benchmark percepción |
| [Awesome-LLM4AD](https://github.com/Thinklab-SJTU/Awesome-LLM4AD) | MIT | Lista curada LLM/VLM/VLA/World Models para AV. Actualización continua SJTU. | Research reference |
| [DriveLM](https://github.com/OpenDriveLab/DriveLM) | Apache-2.0 | Dataset VQA + baseline VLM end-to-end para AV. ECCV 2024 Oral. | LLM driving eval |

## Fleet Management y Telemática

| Repo | Licencia | Stars | Descripción | Base para AI? |
|------|----------|-------|-------------|---------------|
| [traccar](https://github.com/traccar/traccar) | Apache-2.0 | 5.2k | GPS tracking: 200+ protocolos, 2000+ dispositivos. Java backend. Dashboard web + API REST + WebSocket. | Sí — telemetría base |
| [fleetbase](https://github.com/fleetbase/fleetbase) | AGPL-3.0 | 900 | OS modular de logística + supply chain. Fleet, fulfillment, warehouse. API REST. Mejor plataforma OSS fleet 2026. | Sí — plataforma base |

## AI / LLM Infra para Automotive

| Repo | Licencia | Stars | Descripción |
|------|----------|-------|-------------|
| [TensorRT](https://github.com/NVIDIA/TensorRT) | Apache-2.0 | 10.5k | SDK de inferencia NVIDIA. TensorRT Edge-LLM para automotive embedded. Bosch+MediaTek+ThunderSoft (CES 2026). |
| [DriveMLM](https://github.com/OpenGVLab/DriveMLM) | Apache-2.0 | 850 | Framework multimodal LLM para AV close-loop. Behavior planning + sensor input. OpenGVLab. |

## VLA y World Models — Generación 2025-2026

| Repo | Licencia | Stars | Descripción |
|------|----------|-------|-------------|
| [OpenDriveVLA](https://github.com/DriveVLA/OpenDriveVLA) | Apache-2.0 | 380 | **AAAI 2026** — VLA end-to-end para AD. Alineación jerárquica 2D+3D → espacio semántico unificado. TUM. |
| [HERMES](https://github.com/LMD0311/HERMES) | Apache-2.0 | 950 | **ICCV 2025** — Unified driving world model: 3D scene understanding + future generation. Pesos open. |
| [World-Models-Autonomous-Driving-Survey](https://github.com/HaoranZhuExplorer/World-Models-Autonomous-Driving-Survey) | MIT | 680 | Survey curado de world models para AV: CoWorld-VLA, DriveFuture, GEM, Driver-WM. 2026. |
| [awesome-vla-for-ad](https://github.com/worldbench/awesome-vla-for-ad) | MIT | 520 | VLA models para AD — End-to-End VLA vs Dual-System VLA (VLM lento + planner rápido). |

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
