# 🎯 Top AI Agents & Tools — Automotive

> Agentes y herramientas AI open source para la industria automotriz. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-14 (v11)

## Agentes y herramientas destacadas

| Nombre | Repo | Licencia | Stars | Descripción |
|--------|------|----------|-------|-------------|
| openpilot | [commaai/openpilot](https://github.com/commaai/openpilot) | MIT | 60.6k | ADAS OS para 300+ autos; v0.11.1 (World Model training, VLM-labeled DM); comma four focus |
| Autoware | [autowarefoundation/autoware](https://github.com/autowarefoundation/autoware) | Apache-2.0 | 11.8k | Stack L4 de conducción autónoma; ROS 2, modular; referencia de industria para OEMs |
| autoware_vision_pilot | [autowarefoundation/autoware_vision_pilot](https://github.com/autowarefoundation/autoware_vision_pilot) | Apache-2.0 | ~600 | L2 ADAS end-to-end AI con una cámara frontal; sin mapas HD; pesos + training incluidos |
| OpenDriveVLA | [DriveVLA/OpenDriveVLA](https://github.com/DriveVLA/OpenDriveVLA) | Apache-2.0 | ~400 | AAAI 2026: VLA 3B/7B para conducción autónoma E2E; L2 error 0.33m SOTA nuScenes; arXiv:2503.23463 |
| DriveWorld-VLA | [liulin815/DriveWorld-VLA](https://github.com/liulin815/DriveWorld-VLA) | Apache-2.0 | ~200 | World model como motor de razonamiento para VLA; NAVSIM + nuScenes; arXiv:2602.06521 |
| BLUE | *(código/checkpoints públicos)* | Apache-2.0 | — | Jun 2026: gate 0.11M params sobre VLA frozen; 76.2% Bench2Drive, 2.54x speedup; arXiv:2606.08684 |
| CARLA Simulator | [carla-simulator/carla](https://github.com/carla-simulator/carla) | MIT | 14.1k | Simulador AV; migración UE5 en progreso; soporte NVIDIA NuRec 25.07; digital twins v0.1 |
| Pylot | [erdos-project/pylot](https://github.com/erdos-project/pylot) | Apache-2.0 | 534 | Plataforma AV modular: detección, tracking, predicción, planificación, control |
| EMQX | [emqx/emqx](https://github.com/emqx/emqx) | Apache-2.0 | 15k | Broker MQTT 5.0 para V2X y telemática; < 1ms latencia; SAIC, VW en producción |
| Fleetbase | [fleetbase/fleetbase](https://github.com/fleetbase/fleetbase) | AGPL-3.0 | 2k | OS de logística y flota: despacho, tracking conductores, órdenes, sin fee/driver |
| Eclipse Kuksa | [eclipse-kuksa/kuksa-databroker](https://github.com/eclipse-kuksa/kuksa-databroker) | Apache-2.0 | 450+ | Data broker VSS en Rust; señales vehiculares estándar (speed, fuel, temp); gRPC |
| Eclipse S-CORE | [eclipse-sdv org](https://github.com/orgs/eclipse-sdv/repositories) | Apache-2.0 | 76 repos | Middleware SDV; 32 OEMs; S-CORE v1.0 planned 2026; uProtocol, Velocitas |

## Por qué estos agentes

- **OpenDriveVLA** (AAAI 2026) es el VLA de conducción autónoma más validado del ecosistema open-source: 3B y 7B modelos, L2 error SOTA (0.33m) en nuScenes, Apache-2.0. La explosión de VLAs para AD es la tendencia más importante de 2026.
- **BLUE** resuelve el problema práctico de los VLA: el lenguaje generado degrada el rendimiento en 23.6% de rutas. Su gate de 0.11M params da 2.54x speedup con mejor success rate — clave para inferencia on-vehicle.
- **openpilot 0.11** marca un cambio de paradigma: el primer modelo de conducción entrenado con World Model en lugar de labels humanos. VLM-labeled driver monitoring. El ADAS OS más maduro en producción (60.6k★).
- **autoware_vision_pilot** sigue siendo el punto de entrada más bajo para OEMs que quieren L2: Apache-2.0, una cámara, sin mapas HD.
- **Eclipse Kuksa** (Rust, Apache-2.0) es la interfaz estándar de señales vehiculares del ecosistema SDV de 32 OEMs; necesario conocerlo para cualquier proyecto SDV.
- **EMQX** maneja millones de mensajes V2X por segundo con latencia < 1ms; backbone estándar de telemática automotriz.

## Agentes adicionales notables

| Nombre | Repo | Licencia | Stars | Descripción |
|--------|------|----------|-------|-------------|
| PCLA | [MasoudJTehrani/PCLA](https://github.com/MasoudJTehrani/PCLA) | Apache-2.0 | 77 | Framework de testing para agentes autónomos en CARLA |
| cockpit-agent | [SuperdeMan/cockpit-agent](https://github.com/SuperdeMan/cockpit-agent) | MIT | ~10 | Sistema multi-agente cloud-edge para cabina inteligente; intent→LLM→vehicle-ctrl |
| gym-carla | [cjy1992/gym-carla](https://github.com/cjy1992/gym-carla) | MIT | 620 | Wrapper OpenAI Gym para CARLA; entrenamiento RL de políticas de conducción |
| carla-ros-bridge | [carla-simulator/ros-bridge](https://github.com/carla-simulator/ros-bridge) | MIT | 637 | Puente ROS/ROS2 para CARLA; conecta con stack Autoware |
| PCSim | [PJLab-ADG/PCSim](https://github.com/PJLab-ADG/PCSim) | Apache-2.0 | 272 | Simulación LiDAR point cloud; colocación óptima de sensores (ICRA 2023) |

## Benchmark race 2026 — dónde evaluar agentes AV

| Benchmark | Repo / URL | Qué mide |
|-----------|-----------|----------|
| nuScenes (open-loop) | [nutonomy/nuscenes-devkit](https://github.com/nutonomy/nuscenes-devkit) | Trajectory planning; L2 error — OpenDriveVLA SOTA: 0.33m |
| nuReasoning | [arXiv:2605.31572](https://arxiv.org/abs/2605.31572) | Reasoning long-tail: Spatial, Decision, Counterfactual (20k clips) |
| Bench2Drive | academia/benchmark | Closed-loop success rate — BLUE: 76.2% |
| NAVSIM | [autonomousvision/navsim](https://github.com/autonomousvision/navsim) | Non-reactive simulation; NAVSIMv1 + v2 |

---
*Actualizado automáticamente por el pipeline de ingest — v11 2026-07-14.*
