# 🎯 Agentes AI — Automotive

> Agentes y herramientas AI open source para la industria. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-12 (v8)

## Agentes y herramientas destacadas

| Nombre | Repo | Licencia | Stars | Descripción |
|--------|------|----------|-------|-------------|
| Alpamayo | [NVlabs/alpamayo](https://github.com/NVlabs/alpamayo) | Apache-2.0 | ~3k | NVIDIA — familia de modelos VLA open source para AV; Alpamayo 1 es un modelo chain-of-thought de 10B parámetros que genera trayectorias + razonamiento para L4 autonomy. Lanzado CES 2026; v1.5 en marzo 2026. Early adopters: Lucid, JLR, Uber, Berkeley DeepDrive. |
| LCDrive | [NVIDIA/LCDrive](https://github.com/NVIDIA/LCDrive) | Apache-2.0 | ~500 | CVPR 2026 (NVIDIA Research) — reemplaza el chain-of-thought basado en texto con representaciones latentes compactas. El vehículo "piensa" en espacio latente (estados espaciales en lugar de tokens de texto), logrando calidad de trayectoria comparable a la mitad del costo de tokens en hardware embebido. Presentado junto a GraspGen-X y NitroGen en CVPR 2026. |
| OpenDriveVLA | [DriveVLA/OpenDriveVLA](https://github.com/DriveVLA/OpenDriveVLA) | Apache-2.0 | ~800 | AAAI 2026 — modelo VLA end-to-end para conducción autónoma. Alinea visión 2D/3D con embeddings de lenguaje; modela ego ↔ agentes ↔ entorno de forma autorregresiva. SOTA en nuScenes open-loop planning. |
| DriveAgent-R1 | [Zwc2003/DriveAgent-R1](https://github.com/Zwc2003/DriveAgent-R1) | MIT | ~600 | ICLR 2026 (Tsinghua MARS Lab) — 3B parámetros, Active Perception (invoca herramientas de visión bajo incertidumbre) + Hybrid Thinking (razonamiento text-only para escenas simples, tool-augmented para complejas). 2× DriveLM en percepción; competitivo con GPT-5. |
| Metis | [arXiv:2606.15869](https://arxiv.org/abs/2606.15869) | Apache-2.0 | — | World-Action Model generalizable y eficiente para conducción autónoma y navegación urbana. Combina modelado del mundo con predicción de acciones; diseñado para generalizar a escenarios no vistos. Código y pesos en proceso de liberación (jul 2026). |
| openpilot | [commaai/openpilot](https://github.com/commaai/openpilot) | MIT | ~11k | comma.ai — OS de robótica para ADAS. Upgradea ACC + ALC en 300+ vehículos soportados. Despliegue real en producción; base de datos de conducción pública. Principal open-source ADAS en producción del mundo. |
| Autoware | [autowarefoundation/autoware](https://github.com/autowarefoundation/autoware) | Apache-2.0 | ~11.7k | Autoware Foundation — el stack AV open-source más adoptado. ROS 2, full pipeline percepción → planificación → control. +100 empresas en +30 vehículos en +20 países. |
| UniAD | [OpenDriveLab/UniAD](https://github.com/OpenDriveLab/UniAD) | Apache-2.0 | ~4.6k | CVPR 2023 Best Paper (HKU OpenDriveLab) — framework unificado planning-oriented: percepción, predicción y planificación jerárquica en un solo modelo. UniAD 2.0 migrado a mmdet3d 1.x + torch 2.x. |
| OmniDrive | [NVlabs/OmniDrive](https://github.com/NVlabs/OmniDrive) | Apache-2.0 | ~700 | NVIDIA Labs — Drive LLM-Agent holístico; eleva representación visual 2D a 3D mediante sparse queries; benchmark OmniDrive-nuScenes con VQA tasks. Soporte TensorRT Edge-LLM en NVIDIA DRIVE AGX Thor (feb 2026). |
| LMDrive | [opendilab/LMDrive](https://github.com/opendilab/LMDrive) | Apache-2.0 | ~1.2k | CVPR 2024 (OpenDILab) — conducción closed-loop end-to-end guiada por instrucciones de lenguaje natural. Pipeline: vision encoder pre-training → instruction fine-tuning. Benchmarked en CARLA. |
| CARLA | [carla-simulator/carla](https://github.com/carla-simulator/carla) | MIT | ~14k | Intel ISL / Microsoft — simulador open-source gold standard para AD. Unreal Engine, sensores fotorrealistas (cámara, lidar, radar), escenarios de ciudad generativos. Actualizado junio 2026. Base de entrenamiento y validación para todos los proyectos anteriores. |

---
*Actualizado automáticamente por el pipeline de ingest.*
