# Repos fundacionales — automotive

> Bases sobre las cuales construir soluciones de AI para la industria automotriz. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-14 (v12)

## Plataformas y frameworks base

| Repo | Licencia | Stars | ¿Base para AI? | Descripción |
|------|----------|-------|----------------|-------------|
| [commaai/openpilot](https://github.com/commaai/openpilot) | MIT | 61k+ | Sí — ADAS OS | L2 ADAS OS para 325+ vehículos. Red neuronal E2E entrenada en 50M+ millas reales. World model paradigm v0.11+. Incluye entorno de entrenamiento y simulación |
| [autowarefoundation/autoware](https://github.com/autowarefoundation/autoware) | Apache-2.0 | 9k+ | Sí — AD stack | Lider mundial OSS para conducción autónoma. Stack modular: percepción, predicción, planificación, control. 70+ miembros globales (Toyota, Tier IV, etc.) |
| [autowarefoundation/autoware_vision_pilot](https://github.com/autowarefoundation/autoware_vision_pilot) | Apache-2.0 | ~400 | Sí — OEM ADAS | E2E AI L2 ADAS stack libre para integración en producción OEM/Tier-1. Incluye pesos de modelo, pipelines de entrenamiento, código certificable |
| [carla-simulator/carla](https://github.com/carla-simulator/carla) | MIT | 14k+ | Sí — simulación | Simulador de conducción autónoma. UE5 migration activa (branch ue5-dev). Leaderboard AD v2.1. Estándar de facto para benchmark de agentes AD |
| [DriveVLA/OpenDriveVLA](https://github.com/DriveVLA/OpenDriveVLA) | Apache-2.0 | ~800 | Sí — VLA E2E | AAAI 2026. VLA 3B/7B para AD E2E. SOTA nuScenes L2 0.33m. Primer VLA open completamente reproducible para AD |
| [NVlabs/alpamayo](https://github.com/NVlabs/alpamayo) | Apache-2.0 | ~2k | Sí — reasoning VLA | NVIDIA CES 2026. 10B chain-of-thought VLA. Reasoning traces públicos. AlpaSim simulation framework incluido. Pesos en HuggingFace (acceso solicitado) |
| [erdos-project/pylot](https://github.com/erdos-project/pylot) | Apache-2.0 | 534 | Sí — modular AD | Plataforma modular de AD en CARLA + mundo real. Percepción, predicción, planificación. Compatible con ROS. Para composición de pipelines de investigación |
| [carla-simulator/ros-bridge](https://github.com/carla-simulator/ros-bridge) | MIT | 637 | Sí — integración | Bridge ROS/ROS2 para CARLA. Integra simulación CARLA con el ecosistema ROS (nav2, MoveIt, etc.) |
| [eclipse-kuksa/kuksa-databroker](https://github.com/eclipse-kuksa/kuksa-databroker) | Apache-2.0 | ~500 | Sí — SDV layer | Eclipse Kuksa data broker para SDV. Capa de orquestación de datos entre sensores hardware y apps de software. El "sistema nervioso" del SDV |
| [cjy1992/gym-carla](https://github.com/cjy1992/gym-carla) | MIT | 620 | Sí — RL training | OpenAI gym wrapper para CARLA. Entrenamiento RL para agentes AD. Reward shaping, sensor configs, multi-task. Base para entornos de RL automotive |

---

## Repos de soporte — simulación y benchmarking

| Repo | Licencia | Stars | Descripción |
|------|----------|-------|-------------|
| [MasoudJTehrani/PCLA](https://github.com/MasoudJTehrani/PCLA) | Apache-2.0 | 77 | Framework de testing para agentes autónomos en CARLA |
| [PJLab-ADG/PCSim](https://github.com/PJLab-ADG/PCSim) | Apache-2.0 | 272 | LiDAR point cloud simulation y sensor placement (ICRA 2023) |
| [cjy1992/gym-carla](https://github.com/cjy1992/gym-carla) | MIT | 620 | RL gym wrapper para CARLA |
| [liulin815/DriveWorld-VLA](https://github.com/liulin815/DriveWorld-VLA) | MIT | ~300 | World-model + VLA unificado — NAVSIMv1 SOTA |

---

## Repos SDV (Software Defined Vehicle)

| Repo | Licencia | Descripción |
|------|----------|-------------|
| [eclipse-sdv-blueprints](https://github.com/eclipse-sdv-blueprints) | Apache-2.0 | Blueprints de referencia para SDV completo: in-vehicle apps, OTA, connectivity |
| [eclipse-kuksa/kuksa.val.services](https://github.com/eclipse-kuksa/kuksa.val.services) | Apache-2.0 | Vehicle service implementations para Eclipse SDV |
| [autowarefoundation/autoware_universe](https://github.com/autowarefoundation/autoware_universe) | Apache-2.0 | Autoware Universe: stack completo de AD incluyendo todos los componentes |

---

## Árbol de dependencias típico

```
[CARLA Simulator] ──── [ros-bridge] ──────────────┐
      │                                             │
[gym-carla / PCLA]                         [ROS2 / nav2]
      │                                             │
[OpenDriveVLA / Pylot]          [Autoware Universe / vision_pilot]
      │                                             │
[Alpamayo AlpaSim]              [Eclipse Kuksa SDV data layer]
      │                                             │
      └────────── [Agent evaluation / LangGraph] ──┘
```

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
