# Repos fundacionales — Automotive

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-09 (v2 — OpenDriveVLA, HERMES, World Models survey, DriveWorld-VLA)

## Simulación y Testing

| Repo | Licencia | Stars | Descripción | Base para AI? |
|------|----------|-------|-------------|---------------|
| [carla](https://github.com/carla-simulator/carla) | MIT | 14.1k | Simulador fotorrealista AV en Unreal Engine. RGB/LiDAR/Radar/IMU. Python/C++ API. Integra ROS, Autoware, Apollo. | Sí — el estándar |
| [ros-bridge](https://github.com/carla-simulator/ros-bridge) | MIT | 637 | Bridge ROS para CARLA. Conecta CARLA a ROS stack (Autoware, CARMA, etc.). | Sí |
| [gym-carla](https://github.com/cjy1992/gym-carla) | MIT | 620 | OpenAI Gym wrapper para CARLA. Entrenamiento de agentes RL en simulador. | Sí — RL training |
| [PCLA](https://github.com/MasoudJTehrani/PCLA) | Apache-2.0 | 77 | Framework de testing de agentes en CARLA. Escenarios parametrizables + métricas seguridad. | Sí — CI/CD para AV |
| [pylot](https://github.com/erdos-project/pylot) | Apache-2.0 | 534 | Plataforma modular AV sobre CARLA + real. Percepción/predicción/planning modulares. | Sí |

## Stacks de Conducción Autónoma

| Repo | Licencia | Stars | Descripción | Base para AI? |
|------|----------|-------|-------------|---------------|
| [openpilot](https://github.com/commaai/openpilot) | MIT | 60.8k | OS de robótica automotriz. ADAS L2+ en 325+ autos. Python. Probado con 100M+ millas reales. | Sí — más maduro |
| [autoware](https://github.com/autowarefoundation/autoware) | Apache-2.0 | 10k+ | Stack AV más adoptado por industria. ROS 2 nativo. 100+ empresas. Modular: perception/planning/control/localization. | Sí — industria |
| [autoware_universe](https://github.com/autowarefoundation/autoware_universe) | Apache-2.0 | 1.7k | Core activo de Autoware. Planning, perception, control. El repo principal. | Sí |
| [apollo](https://github.com/ApolloAuto/apollo) | Apache-2.0 | 26.7k | Plataforma AV de Baidu. Apollo 11.0 (2026). C++. Perception/localization/planning/control completo. | Sí — más completo |
| [carma-platform](https://github.com/usdot-fhwa-stol/carma-platform) | Apache-2.0 | 312 | USDOT Cooperative Driving Automation. SAE L2, ROS2. V2X. Plugin API. | Sí — V2X focus |

## Datasets y Benchmarks

| Repo | Licencia | Descripción | Uso |
|------|----------|-------------|-----|
| [nuscenes-devkit](https://github.com/nutonomy/nuscenes-devkit) | Apache-2.0 | SDK para nuScenes dataset: 1000 escenas, 1.4M anotaciones 3D, Boston+Singapur. | Evaluación percepción |
| [waymo-open-dataset](https://github.com/waymo-research/waymo-open-dataset) | Apache-2.0 | 1000+ segmentos LiDAR + cámara, 12M+ objetos 3D anotados. Estado del arte. | Benchmark percepción |
| [Awesome-LLM4AD](https://github.com/Thinklab-SJTU/Awesome-LLM4AD) | MIT | Lista curada LLM/VLM/VLA/World Models para AV. Actualización continua SJTU. | Research reference |
| [DriveLM](https://github.com/OpenDriveLab/DriveLM) | Apache-2.0 | Dataset VQA + baseline VLM end-to-end para AV. ECCV 2024 Oral. | LLM driving eval |

## Fleet Management y Telemática

| Repo | Licencia | Stars | Descripción | Base para AI? |
|------|----------|-------|-------------|---------------|
| [traccar](https://github.com/traccar/traccar) | Apache-2.0 | 5.2k | GPS tracking: 200+ protocolos, 2000+ dispositivos. Java backend. Dashboard web + API REST. | Sí — telemetría base |
| [fleetbase](https://github.com/fleetbase/fleetbase) | AGPL-3.0 | 900 | OS modular de logística + supply chain. Fleet, fulfillment, warehouse. No per-driver fees. REST API. | Sí — plataforma base |

## AI / LLM Infra para Automotive

| Repo | Licencia | Stars | Descripción |
|------|----------|-------|-------------|
| [TensorRT](https://github.com/NVIDIA/TensorRT) | Apache-2.0 | 10.5k | SDK de inferencia NVIDIA. TensorRT Edge-LLM para automotive embedded. Bosch+MediaTek usan esto. |
| [DriveMLM](https://github.com/OpenGVLab/DriveMLM) | Apache-2.0 | 850 | Framework multimodal LLM para AV close-loop. Behavior planning + sensor input. OpenGVLab. |

## VLA y World Models — Generación 2025-2026

| Repo | Licencia | Stars | Descripción |
|------|----------|-------|-------------|
| [OpenDriveVLA](https://github.com/DriveVLA/OpenDriveVLA) | Apache-2.0 | 380 | **AAAI 2026** — VLA end-to-end para AD. Alineación jerárquica 2D+3D → espacio semántico unificado. Condicionado en percepción 3D + ego-state + comandos. TUM. |
| [HERMES](https://github.com/LMD0311/HERMES) | Apache-2.0 | 950 | **ICCV 2025** — Unified driving world model: 3D scene understanding + future generation. Pesos preentrenados open. |
| [World-Models-Autonomous-Driving-Survey](https://github.com/HaoranZhuExplorer/World-Models-Autonomous-Driving-Survey) | MIT | 680 | Survey curado de world models para AV: CoWorld-VLA, DriveFuture, GEM, Driver-WM. Actualizado 2026. |
| [awesome-vla-for-ad](https://github.com/worldbench/awesome-vla-for-ad) | MIT | 520 | VLA models para AD — End-to-End VLA vs Dual-System VLA (VLM lento + planner rápido). worldbench. |

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
