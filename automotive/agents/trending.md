# 📈 Agentes en tendencia — semana del 2026-07-05

> Lo más nuevo y activo en el ecosistema automotive AI esta semana.

## Repos activos esta semana

| Nombre | Licencia | Novedad | Stars |
|--------|----------|---------|-------|
| [autoware_universe](https://github.com/autowarefoundation/autoware_universe) | Apache-2.0 | ROS 2 AV stack en constante actualización; nuevo módulo de detección de peatones en intersecciones | 1.7k |
| [cockpit-agent](https://github.com/SuperdeMan/cockpit-agent) | Apache-2.0 | Arquitectura Multi-Agent cloud-edge para cabina inteligente SDV; soporte VAL seguro + HMI streaming | ~5 |
| [InterFuser-UI](https://github.com/zubairm8580/InterFuser-UI) | Apache-2.0 | UI en tiempo real para CARLA con visualización de cámaras, LiDAR, velocidad y outputs de control | 1 |
| [PCLA](https://github.com/MasoudJTehrani/PCLA) | Apache-2.0 | Framework de test para agentes en CARLA; nuevos escenarios de intersección y lluvia | 77 |
| [predictive-maintenance-mcp](https://github.com/LGDiMaggio/predictive-maintenance-mcp) | MIT | Patrón MCP + LLM para mantenimiento predictivo; nuevo soporte para detección de fallas en cajas de cambio | ~40 |
| [ev-charging-optimization](https://github.com/philippnormann/ev-charging-optimization) | MIT | Optimización de rutas de recarga EV con RL; soporte para flotas mixtas ICE+EV | 20 |

## Tendencias que emergen esta semana

### 1. Agentes de cabina inteligente (SDV Cockpit Agents)
Con el despliegue masivo de Software-Defined Vehicles (SDV), proliferan agentes que dividen la inferencia entre el edge del vehículo (latencia baja, seguridad) y la nube (razonamiento complejo). El patrón `cockpit-agent` cristaliza esta arquitectura en open source.

### 2. MCP para diagnóstico vehicular
El servidor `predictive-maintenance-mcp` representa un patrón emergente: convertir el sistema de diagnóstico legacy en un servidor MCP y exponer cualquier LLM como copiloto del técnico de taller. Sin reescribir el stack.

### 3. Test frameworks para agentes AV
El crecimiento de PCLA y herramientas similares refleja la maduración del espacio: los equipos pasan de "construir el agente AV" a "cómo probarlo en 1000 escenarios reproduciiblemente".

### 4. Robotaxi y Level 4
NVIDIA Alpamayo (10B params), Waymo y Uber confirmaron despliegue de robotaxis en 2026. Esto acelera la demanda de stacks open-source compatibles (Autoware, Apollo) para OEMs tier-2 y tier-3 que no pueden usar soluciones propietarias.

---
*Pipeline automático — se actualiza cada hora.*
