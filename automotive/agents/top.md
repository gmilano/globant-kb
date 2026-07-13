# 🎯 Top AI Agents & Tools — Automotive

> Agentes y herramientas AI open source para la industria automotriz. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-13 (v10)

## Agentes y herramientas destacadas

| Nombre | Repo | Licencia | Stars | Descripción |
|--------|------|----------|-------|-------------|
| openpilot | [commaai/openpilot](https://github.com/commaai/openpilot) | MIT | 60.6k | ADAS OS para 300+ autos; v0.11.1 jun-2026; driver monitoring, lane keep, ACC |
| Autoware | [autowarefoundation/autoware](https://github.com/autowarefoundation/autoware) | Apache-2.0 | 11.8k | Stack L4 de conducción autónoma más completo del mundo; ROS 2, modular |
| autoware_vision_pilot | [autowarefoundation/autoware_vision_pilot](https://github.com/autowarefoundation/autoware_vision_pilot) | Apache-2.0 | ~600 | L2 ADAS end-to-end AI con una sola cámara frontal; sin mapas HD; lanzado 2026 |
| CARLA Simulator | [carla-simulator/carla](https://github.com/carla-simulator/carla) | MIT | 14.1k | Simulador open-source para AV; sensores, clima, agentes de referencia incluidos |
| Pylot | [erdos-project/pylot](https://github.com/erdos-project/pylot) | Apache-2.0 | 534 | Plataforma AV modular: detección, tracking, predicción, planificación, control |
| EMQX | [emqx/emqx](https://github.com/emqx/emqx) | Apache-2.0 | 15k | Broker MQTT 5.0 de alta disponibilidad para V2X y telemática; SAIC, VW en prod |
| Fleetbase | [fleetbase/fleetbase](https://github.com/fleetbase/fleetbase) | AGPL-3.0 | 2k | OS de logística y flota: despacho, tracking conductores, órdenes, sin fee/driver |
| Eclipse S-CORE | [eclipse-sdv/](https://github.com/orgs/eclipse-sdv/repositories) | Apache-2.0 | 76 repos | Middleware SDV; AUTOSAR-based, POSIX; v0.5 GA nov-2025; 32 OEMs en el consorcio |
| PCLA | [MasoudJTehrani/PCLA](https://github.com/MasoudJTehrani/PCLA) | Apache-2.0 | 77 | Framework de testing para agentes autónomos en CARLA |
| cockpit-agent | [SuperdeMan/cockpit-agent](https://github.com/SuperdeMan/cockpit-agent) | MIT | ~10 | Sistema multi-agente cloud-edge para cabina inteligente; intent→LLM→vehicle-ctrl |

## Por qué estos agentes

- **openpilot** es el único ADAS OS open-source en producción con cobertura masiva (60k★, 300+ autos). Base perfecta para agregar capas de IA conversacional o diagnóstico.
- **autoware_vision_pilot** es el punto de entrada más bajo para OEMs que quieren L2: una cámara, sin mapas HD, Apache-2.0. Lanzado en 2026 por la Autoware Foundation.
- **CARLA + Pylot** son la combinación canónica para simulación + validación de agentes AV antes de desplegar en vehículos reales.
- **EMQX** maneja millones de mensajes V2X por segundo con latencia < 1ms, ideal para telemática flotilla y edge computing vehicular.
- **Fleetbase** reemplaza soluciones SaaS de $$/driver con un OS de flota completo y self-hostable.
- **Eclipse S-CORE** es la apuesta de 32 OEMs globales (Hyundai Mobis, TRATON y otros) para un SDV middleware common layer.

## Agentes adicionales notables

| Nombre | Repo | Licencia | Stars | Descripción |
|--------|------|----------|-------|-------------|
| gym-carla | [cjy1992/gym-carla](https://github.com/cjy1992/gym-carla) | MIT | 620 | Wrapper OpenAI Gym para CARLA; entrenamiento RL de políticas de conducción |
| OpenRemote Fleet | [openremote/fleet-management](https://github.com/openremote/fleet-management) | AGPLv3 | 180 | Telemática de flota sobre IoT platform; soporte nativo Teltonika |
| carla-ros-bridge | [carla-simulator/ros-bridge](https://github.com/carla-simulator/ros-bridge) | MIT | 637 | Puente ROS/ROS2 para CARLA; conecta con stack Autoware |
| PCSim | [PJLab-ADG/PCSim](https://github.com/PJLab-ADG/PCSim) | Apache-2.0 | 272 | Simulación LiDAR point cloud; colocación óptima de sensores (ICRA 2023) |

---
*Actualizado automáticamente por el pipeline de ingest — v10 2026-07-13.*
