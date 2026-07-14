# 🏗️ Repos Fundacionales — Automotive

> Bases sobre las cuales construir soluciones AI para la industria automotriz.
> Licencia abierta, comunidad activa, mantenimiento sostenido.
> Última actualización: 2026-07-14 (v11)

## Stack de Conducción Autónoma

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|--------------|
| [commaai/openpilot](https://github.com/commaai/openpilot) | MIT | 60.6k | ADAS OS en producción; 300+ autos; v0.11.1 (World Model training); driver monitoring con VLM | ★★★ — base ideal para custom ADAS |
| [autowarefoundation/autoware](https://github.com/autowarefoundation/autoware) | Apache-2.0 | 11.8k | Stack L4 completo: percepción, predicción, planificación, control; ROS 2 | ★★★ — arquitectura de referencia OEM |
| [autowarefoundation/autoware_vision_pilot](https://github.com/autowarefoundation/autoware_vision_pilot) | Apache-2.0 | ~600 | L2 ADAS end-to-end; una cámara, sin mapas HD; pesos + pipelines de training incluidos | ★★★ — costo de entrada más bajo L2 |
| [carla-simulator/carla](https://github.com/carla-simulator/carla) | MIT | 14.1k | Simulador AV: sensores LiDAR/cámara/radar, clima, towns; UE5 en desarrollo; NuRec 25.07 | ★★★ — entorno de validación estándar |
| [erdos-project/pylot](https://github.com/erdos-project/pylot) | Apache-2.0 | 534 | Plataforma AV modular sobre CARLA y autos reales; latency-accuracy tradeoffs | ★★ — investigación + PoC |
| [MasoudJTehrani/PCLA](https://github.com/MasoudJTehrani/PCLA) | Apache-2.0 | 77 | Framework para probar agentes autónomos en CARLA | ★★ — CI/testing de agentes AV |
| [cjy1992/gym-carla](https://github.com/cjy1992/gym-carla) | MIT | 620 | OpenAI Gym wrapper para CARLA; entrenamiento RL de políticas | ★★ — RL research en conducción |
| [carla-simulator/ros-bridge](https://github.com/carla-simulator/ros-bridge) | MIT | 637 | Puente ROS/ROS2 ↔ CARLA; necesario para integrar stack Autoware con simulador | ★★ — integración ROS |

## Stack VLA (Vision-Language-Action) — nuevo en 2026

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|--------------|
| [DriveVLA/OpenDriveVLA](https://github.com/DriveVLA/OpenDriveVLA) | Apache-2.0 | ~400 | AAAI 2026; VLA 3B/7B E2E; L2 error 0.33m SOTA nuScenes; hierarchical 2D+3D alignment | ★★★ — VLA AD más validado open-source |
| [liulin815/DriveWorld-VLA](https://github.com/liulin815/DriveWorld-VLA) | Apache-2.0 | ~200 | World model como motor de razonamiento VLA; NAVSIM v1/v2 + nuScenes | ★★ — world model + AD research |
| [autonomousvision/navsim](https://github.com/autonomousvision/navsim) | Apache-2.0 | ~1k | Benchmark NAVSIMv1/v2 para evaluación no-reactiva de planificación | ★★ — evaluación de agentes AD |
| [nutonomy/nuscenes-devkit](https://github.com/nutonomy/nuscenes-devkit) | Apache-2.0 | 2.3k | Devkit para el dataset nuScenes; gold standard de evaluación AV | ★★★ — benchmark referencia industria |

## Stack de Conectividad e IoT Vehicular

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|--------------|
| [emqx/emqx](https://github.com/emqx/emqx) | Apache-2.0 | 15k | Broker MQTT 5.0 distribuido; < 1ms latencia; V2X y telemática; SAIC, VW en prod | ★★★ — backbone telemática |
| [openremote/openremote](https://github.com/openremote/openremote) | AGPLv3 | ~4k | Plataforma IoT + fleet telematics; soporte Teltonika nativo; geofencing, alertas | ★★ — IoT vehicular self-hosted |
| [openremote/fleet-management](https://github.com/openremote/fleet-management) | AGPLv3 | 180 | Implementación completa de fleet management sobre OpenRemote | ★★ — fleet telemática |

## Stack SDV (Software-Defined Vehicle)

| Repo | Licencia | Repos | Descripción | Base para AI |
|------|----------|-------|-------------|--------------|
| [eclipse-sdv org](https://github.com/orgs/eclipse-sdv/repositories) | Apache-2.0 | 76 | Middleware SDV: S-CORE, Kuksa, Velocitas, uProtocol; 32 OEMs; v1.0 target 2026 | ★★★ — futuro del software vehicular |
| [eclipse-kuksa/kuksa-databroker](https://github.com/eclipse-kuksa/kuksa-databroker) | Apache-2.0 | 450+ | Data broker vehicular VSS en Rust; gRPC; interfaz estándar SDV; security audit 2026 | ★★★ — señales vehiculares estándar |
| [eclipse-velocitas](https://github.com/eclipse-velocitas) | Apache-2.0 | — | Toolchain para vehicle apps portables; CI/CD nativo; AUTOSAR Adaptive | ★★ — development toolchain SDV |

## Stack de Gestión de Flotas

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|--------------|
| [fleetbase/fleetbase](https://github.com/fleetbase/fleetbase) | AGPL-3.0 | 2k | OS de logística y flota; despacho, tracking, órdenes, ERP integrado; 8000+ operaciones | ★★★ — flota self-hosted completo |

## Simulación de Sensores

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|--------------|
| [PJLab-ADG/PCSim](https://github.com/PJLab-ADG/PCSim) | Apache-2.0 | 272 | Simulación LiDAR point cloud; colocación óptima de sensores (ICRA 2023) | ★ — research sensors |

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas (ERP, DMS, fleet).*
