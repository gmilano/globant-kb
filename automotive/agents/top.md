# Agentes AI — Automotive

> Agentes y herramientas AI open source para la industria. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-13

## Agentes y herramientas destacadas

| Nombre | Licencia | Repo | Stars | Descripción |
|--------|----------|------|-------|-------------|
| openpilot | MIT | [commaai/openpilot](https://github.com/commaai/openpilot) | ~50k | Sistema operativo de conducción autónoma. Actualiza ADAS en 300+ vehículos comerciales. Agente de conducción end-to-end con percepción, planificación y control. |
| Autoware | Apache-2.0 | [autowarefoundation/autoware](https://github.com/autowarefoundation/autoware) | ~11.8k | Stack completo de conducción autónoma. Usado por 100+ empresas en 30+ vehículos en 20 países. Basado en ROS 2. Incluye percepción, localización, planificación, control. |
| CARLA Simulator | MIT | [carla-simulator/carla](https://github.com/carla-simulator/carla) | ~14k | Simulador open-source para desarrollo e investigación de conducción autónoma. API Python/C++ rica. Referencia estándar para validar agentes antes de pruebas reales. |
| predictive-maintenance-mcp | MIT | [LGDiMaggio/predictive-maintenance-mcp](https://github.com/LGDiMaggio/predictive-maintenance-mcp) | ~200 | Servidor MCP para integrar LLMs (Claude, GPT, Ollama) con flujos de mantenimiento predictivo y diagnóstico de fallas. Análisis de vibración, detección de fallas en rodamientos, reportes en lenguaje natural. |
| Alpamayo (NVlabs) | Open Weights | [NVlabs/alpamayo](https://github.com/NVlabs/alpamayo) | — | Familia de modelos open-source de NVIDIA para vehículos autónomos. 10B params, entrada video, genera trayectorias con trazas de razonamiento. Lanzado CES 2026. Incluye AlpaSim (simulación end-to-end). |
| EMQX | Apache-2.0 | [emqx/emqx](https://github.com/emqx/emqx) | ~15k | Broker MQTT ultra-escalable para IoT, IIoT y vehículos conectados. Backbone de comunicación V2X en tiempo real. SAIC-Volkswagen procesa millones de vehículos conectados con EMQX. |
| Pylot | Apache-2.0 | [erdos-project/pylot](https://github.com/erdos-project/pylot) | ~534 | Plataforma modular de conducción autónoma sobre CARLA. Pipelines de percepción, predicción y planificación componibles. Ideal como base para investigación y prototipos. |
| mcp-motor-current-signature-analysis | MIT | [LGDiMaggio/mcp-motor-current-signature-analysis](https://github.com/LGDiMaggio/mcp-motor-current-signature-analysis) | ~80 | Servidor MCP para análisis espectral de corriente de motor (MCSA) y detección de fallas en motores eléctricos mediante LLMs. Diagnóstico en lenguaje natural. |
| PCLA | Apache-2.0 | [MasoudJTehrani/PCLA](https://github.com/MasoudJTehrani/PCLA) | ~77 | Framework para evaluar y testear agentes autónomos en el simulador CARLA. Métricas de seguridad, eficiencia y confort de conducción. |
| cockpit-agent | MIT | [SuperdeMan/cockpit-agent](https://github.com/SuperdeMan/cockpit-agent) | ~10 | Sistema Multi-Agent cloud-edge para cabinas inteligentes. Intención local rápida, planificación LLM en la nube, orquestación cross-domain, ejecución VAL segura, interacción HMI streaming. |

---

## Por qué estos agentes importan para Globant

- **openpilot + Autoware**: puntos de partida para proyectos ADAS con OEMs o Tier-1 suppliers
- **predictive-maintenance-mcp**: integración directa con Claude para mantenimiento de flotas — caso B2B inmediato
- **Alpamayo**: modelos razonadores open-source para proyectos de autonomía — alternativa a modelos propietarios
- **EMQX**: infraestructura de datos en tiempo real para vehículos conectados y flotas
- **CARLA + PCLA**: pipeline de testing y validación de agentes autónomos

---
*Actualizado automáticamente por el pipeline de ingest.*
