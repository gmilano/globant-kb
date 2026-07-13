# Repos Fundacionales — Automotive

> Bases sobre las cuales construir soluciones. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-13

## Plataformas y frameworks base

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|---------------|
| [commaai/openpilot](https://github.com/commaai/openpilot) | MIT | ~50k | Sistema operativo de conducción autónoma. Upgrading a ADAS en 300+ vehículos soportados (Toyota, Honda, Hyundai, GM, Ford). Pipeline completo de percepción, control y logging. | Sí — ADAS production-grade |
| [autowarefoundation/autoware](https://github.com/autowarefoundation/autoware) | Apache-2.0 | ~11.8k | Stack líder mundial de conducción autónoma open-source. ROS 2-based. Módulos: percepción, localización, planificación, control. Usado en shuttles, delivery robots, vehículos de prueba L4. | Sí — L4 autonomy stack |
| [carla-simulator/carla](https://github.com/carla-simulator/carla) | MIT | ~14k | Simulador open-source para investigación y desarrollo de conducción autónoma. Soporte de sensores LiDAR, cámara, radar, GPS. Escenarios configurables, tráfico generativo, API Python/C++. | Sí — validación y entrenamiento |
| [emqx/emqx](https://github.com/emqx/emqx) | Apache-2.0 | ~15k | Broker MQTT más escalable del mundo. Backbone de comunicación en tiempo real para IoT, IIoT, vehículos conectados y V2X. SAIC-VW procesa millones de vehículos con EMQX. MCP-native con Agent Hub. | Sí — data backbone IoV |
| [ros2/ros2](https://github.com/ros2/ros2) | Apache-2.0 | ~5.6k | Robot Operating System 2.0 — meta-OS para robótica. Base de Autoware y la mayoría de stacks AV. Arquitectura de nodos y topics ideal para sistemas vehiculares complejos en evolución. | Sí — middleware fundamental |
| [eclipse-score](https://github.com/eclipse-score) | Apache-2.0 | (org, 76 repos) | Eclipse Safe Open Vehicle Core. Core de software seguro y modular para SDVs. Multi-processor interop, ECUs de alto rendimiento. Primera versión pública nov 2025. Release completa 2026. | Sí — SDV foundation |
| [eclipse-sdv-blueprints](https://github.com/eclipse-sdv-blueprints) | Apache-2.0 | (org) | Blueprints de referencia para Software-Defined Vehicles del Eclipse Foundation. Digital twins, comunicación, orquestación, in-vehicle services. Usado por Bosch, BMW, Continental. | Sí — SDV reference architecture |
| [fleetbase/fleetbase](https://github.com/fleetbase/fleetbase) | AGPL-3.0 | ~2k | OS modular de logística y cadena de suministro. Fleet-Ops integrado. GPS tracking, despacho, optimización de rutas, facturas, nómina. 8.000+ operaciones logísticas en producción. | Sí — fleet management base |

## Repos CARLA ecosystem

| Repo | Licencia | Stars | Descripción |
|------|----------|-------|-------------|
| [carla-simulator/ros-bridge](https://github.com/carla-simulator/ros-bridge) | MIT | ~637 | Bridge ROS ↔ CARLA. Conecta el simulador con el ecosistema ROS 2 / Autoware. |
| [cjy1992/gym-carla](https://github.com/cjy1992/gym-carla) | MIT | ~620 | Wrapper OpenAI Gym para CARLA. Entrena agentes RL directamente en el simulador. |
| [erdos-project/pylot](https://github.com/erdos-project/pylot) | Apache-2.0 | ~534 | Plataforma AV modular sobre CARLA. Pipelines de percepción, predicción y planificación componibles. |
| [MasoudJTehrani/PCLA](https://github.com/MasoudJTehrani/PCLA) | Apache-2.0 | ~77 | Framework de testing y evaluación de agentes autónomos en CARLA. |

## Repos MCP / Mantenimiento Predictivo

| Repo | Licencia | Descripción |
|------|----------|-------------|
| [LGDiMaggio/predictive-maintenance-mcp](https://github.com/LGDiMaggio/predictive-maintenance-mcp) | MIT | Servidor MCP para mantenimiento predictivo con LLMs. Análisis de vibraciones, detección de fallas, reportes. |
| [LGDiMaggio/mcp-motor-current-signature-analysis](https://github.com/LGDiMaggio/mcp-motor-current-signature-analysis) | MIT | MCP para MCSA — detección de fallas en motores eléctricos por firma de corriente. |

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
