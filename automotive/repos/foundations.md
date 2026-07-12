# 🏗️ Repos fundacionales — Automotive

> Bases sobre las cuales construir soluciones de AI para la industria automotriz.
> Foco: licencia abierta, comunidad activa, usable en producción.
> Última actualización: 2026-07-12 (v7)

## Plataformas y frameworks base

| Repo | Licencia | Stars | Descripción | ¿Base para AI? |
|------|----------|-------|-------------|----------------|
| [autowarefoundation/autoware](https://github.com/autowarefoundation/autoware) | Apache-2.0 | ~11.7k | Stack AV completo sobre ROS 2: percepción, fusión de sensores, planificación, control. 100+ empresas en producción en 20+ países. | Sí — backbone AV |
| [commaai/openpilot](https://github.com/commaai/openpilot) | MIT | ~11k | OS robótico para ADAS; 300+ vehículos soportados en producción. ACC + ALC mejorados, dataset público de millones de km. | Sí — ADAS en producción |
| [carla-simulator/carla](https://github.com/carla-simulator/carla) | MIT | ~14k | Simulador AV gold-standard (Unreal Engine). Generación de escenarios, sensores fotorrealistas, API Python. Base de entrenamiento para todos los modelos actuales. | Sí — simulación |
| [autowarefoundation/autoware_vision_pilot](https://github.com/autowarefoundation/autoware_vision_pilot) | Apache-2.0 | ~500 | Stack L2 ADAS open-source con pesos de modelo incluidos. Modo mapless (no requiere mapas 3D). Diseñado para integración OEM directa. | Sí — L2 ADAS |
| [OpenDriveLab/UniAD](https://github.com/OpenDriveLab/UniAD) | Apache-2.0 | ~4.6k | CVPR 2023 Best Paper — framework unificado para AD: percepción + predicción + planificación en un modelo. UniAD 2.0 actualizado a torch 2.x. | Sí — research/prod |
| [NVlabs/OmniDrive](https://github.com/NVlabs/OmniDrive) | Apache-2.0 | ~700 | Drive LLM-Agent de NVIDIA con representación 3D sparse-query + benchmark VQA nuScenes. TensorRT Edge-LLM en DRIVE AGX Thor. | Sí — LLM+3D |
| [opendilab/LMDrive](https://github.com/opendilab/LMDrive) | Apache-2.0 | ~1.2k | CVPR 2024 — conducción closed-loop guiada por lenguaje. Vision encoder + instruction fine-tuning. Validado en CARLA. | Sí — LLM driving |
| [traccar/traccar](https://github.com/traccar/traccar) | Apache-2.0 | ~5k | Sistema GPS tracking open-source. Java backend, 200+ protocolos GPS, 2000+ modelos de dispositivo. API REST + WebSocket. | Sí — fleet AI |
| [erdos-project/pylot](https://github.com/erdos-project/pylot) | Apache-2.0 | ~534 | Plataforma AV modular sobre CARLA y hardware real. Módulos hot-swappable, soporte ERDOS streaming. | Sí — middleware |
| [MasoudJTehrani/PCLA](https://github.com/MasoudJTehrani/PCLA) | Apache-2.0 | ~77 | Framework de testing para agentes autónomos en CARLA. Evaluación reproducible y automatizada. | Sí — QA/testing |

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
