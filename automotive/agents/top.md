# Agentes AI top — automotive

> Agentes y herramientas AI open source para la industria automotriz. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-14 (v12)

## Top 10 agentes y herramientas AI para automotive

| Nombre | Repo | Licencia | Stars | Descripción |
|--------|------|----------|-------|-------------|
| **OpenDriveVLA** | [DriveVLA/OpenDriveVLA](https://github.com/DriveVLA/OpenDriveVLA) | Apache-2.0 | ~800 | AAAI 2026 — E2E autonomous driving VLA 3B/7B. L2 error 0.33m SOTA nuScenes open-loop. Builds on open pre-trained VLMs with 3D perception + ego state conditioning. arXiv:2503.23463 |
| **openpilot** | [commaai/openpilot](https://github.com/commaai/openpilot) | MIT | 61k+ | L2 ADAS OS for 325+ supported cars. Neural net trained on millions of miles. World model training paradigm since v0.11. Production-grade, used by 50M+ miles of real-world driving |
| **NVIDIA Alpamayo** | [NVlabs/alpamayo](https://github.com/NVlabs/alpamayo) | Apache-2.0 | ~2k | CES 2026 — 10B chain-of-thought reasoning VLA built on Cosmos-Reason VLM. First AV model exposing explicit reasoning traces. Alpamayo 1.5 released Mar 2026. HuggingFace model weights (gated) |
| **autoware_vision_pilot** | [autowarefoundation/autoware_vision_pilot](https://github.com/autowarefoundation/autoware_vision_pilot) | Apache-2.0 | ~400 | Free E2E AI L2 ADAS stack for OEM/Tier-1 series production. Hybrid architecture: perception AI for safety + E2E AI for performance. Includes model weights, training pipelines, all open |
| **DriveWorld-VLA** | [liulin815/DriveWorld-VLA](https://github.com/liulin815/DriveWorld-VLA) | MIT | ~300 | Feb 2026 — Unified latent-space world modeling + VLA. 91.3 PDMS NAVSIMv1, 86.8 EPDMS NAVSIMv2, 0.16 3s collision rate nuScenes SOTA. arXiv:2602.06521 |
| **Pylot** | [erdos-project/pylot](https://github.com/erdos-project/pylot) | Apache-2.0 | 534 | Modular autonomous driving platform on CARLA + real-world. Perception, prediction, planning modules. ROS-compatible. Research platform for composing AD pipelines |
| **cockpit-agent** | [SuperdeMan/cockpit-agent](https://github.com/SuperdeMan/cockpit-agent) | MIT | ~50 | Cloud-edge collaborative multi-agent system for intelligent cockpit. Edge: fast intent detection; cloud: LLM planning; VAL safety execution; HMI streaming; Chinese SDV-first design |
| **PCLA** | [MasoudJTehrani/PCLA](https://github.com/MasoudJTehrani/PCLA) | Apache-2.0 | 77 | Framework for testing autonomous agents in CARLA simulator. Scenario generation + evaluation harness for AD agents in urban scenarios |
| **ev-charging-optimization** | [philippnormann/ev-charging-optimization](https://github.com/philippnormann/ev-charging-optimization) | MIT | 20 | EV fleet charge-route optimization simulation. Finds shortest charging routes using graph algorithms. Base for fleet EV energy management agents |
| **gym-carla** | [cjy1992/gym-carla](https://github.com/cjy1992/gym-carla) | MIT | 620 | OpenAI gym wrapper for CARLA simulator. RL training environment for autonomous driving agents. Reward shaping, sensor configs, multi-task learning |

---

## Agentes emergentes (arXiv 2026 — sin repo público aún)

| Nombre | Ref | Descripción |
|--------|-----|-------------|
| **BLUE** | [arXiv:2606.08684](https://arxiv.org/abs/2606.08684) | Jun 2026 — 0.11M-param efficiency gate on frozen VLA. 76.2% Bench2Drive, 2.54x inference speedup. Enables VLA on vehicle hardware |
| **nuReasoning** | [arXiv:2605.31572](https://arxiv.org/abs/2605.31572) | May 2026 — 20k-clip long-tail AD benchmark. Tests reasoning in rare/adverse scenarios where standard benchmarks fail |
| **WCog-VLA** | [arXiv:2607.08375](https://arxiv.org/abs/2607.08375) | Jul 2026 — Dual-level world-cognitive VLA for E2E AD. Cognitive world modeling at scene + object level |
| **CLEAR** | [arXiv:2607.02841](https://arxiv.org/abs/2607.02841) | Jul 2026 — Closed-loop RL at scale for E2E AD on CARLA. Scalable reward + curriculum for real closed-loop training |

---

## Casos de uso por capa de la cadena de valor

| Capa | Agente/Herramienta | Problema resuelto |
|------|-------------------|-------------------|
| Percepción E2E | OpenDriveVLA, Alpamayo | Sustitución del stack modular por VLA unificado |
| ADAS producción | openpilot, autoware_vision_pilot | L2 ADAS certificable para OEM/Tier-1 |
| Simulación | CARLA, Pylot, PCLA | Entrenamiento y validación de agentes AD |
| Cockpit inteligente | cockpit-agent | Asistente en cabina con ejecución segura |
| Flota EV | ev-charging-optimization | Optimización de rutas de carga para flotas |
| Mundo modelado | DriveWorld-VLA | Planificación con predicción de evolución de escena |

---
*Actualizado automáticamente por el pipeline de ingest.*
