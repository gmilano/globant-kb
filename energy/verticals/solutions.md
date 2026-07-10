# 🏭 Plataformas Verticales — Energy

> Plataformas existentes customizables con AI. Partir de algo funcional, añadir capa agentic arriba.
> Última actualización: 2026-07-10

## Plataformas Clave por Categoría

### Gestión de Energía (EMS / BEMS / HEMS)

| Plataforma | Licencia | Repo | Stack | Caso de uso AI |
|------------|----------|------|-------|----------------|
| **OpenEMS** | Eclipse PL 2.0 | [OpenEMS/openems](https://github.com/OpenEMS/openems) | Java (edge) + TypeScript (UI) + REST/JSON | EMS para renovables, almacenamiento BESS, carga de EVs; añadir agente de optimización en capa backend |
| **emoncms** | AGPL-3.0 | [emoncms/emoncms](https://github.com/emoncms/emoncms) | PHP + MySQL + Redis + MQTT | Monitoreo de consumo residencial/comercial; añadir agente de anomaly detection y recomendaciones de eficiencia |
| **openremote** | AGPL-3.0 | [openremote/openremote](https://github.com/openremote/openremote) | Java + Docker + Keycloak + PostgreSQL | IoT platform general; reglas automáticas + dashboards; añadir LLM para consultas en lenguaje natural sobre activos |
| **Home Assistant** | Apache-2.0 | [home-assistant/core](https://github.com/home-assistant/core) | Python + YAML + REST/MQTT | HEMS residencial más adoptado del mundo; 3k+ integraciones; añadir agente de gestión energética conversacional |

### SCADA e Infraestructura de Grid

| Plataforma | Licencia | Repo | Stack | Caso de uso AI |
|------------|----------|------|-------|----------------|
| **JSON-SCADA** | GPL-2.0 | [riclolsen/json-scada](https://github.com/riclolsen/json-scada) | Node.js + MongoDB + Redis + PostgreSQL | SCADA completo para subestaciones; IEC 61850, IEC 104, DNP3, OPC UA; añadir agente de detección de anomalías |
| **Rapid SCADA** | Apache-2.0 | [RapidScada/scada](https://github.com/RapidScada/scada) | C# + Windows/Linux | SCADA industrial general; sin límite de tags; añadir ML para mantenimiento predictivo de equipos |
| **Node-RED** | Apache-2.0 | [node-red/node-red](https://github.com/node-red/node-red) | Node.js + flows JSON | Flow-based programming para integrar PLCs, APIs, sensores; añadir nodo AI para clasificación y alertas |

### Simulación y Planificación

| Plataforma | Licencia | Repo | Stack | Caso de uso AI |
|------------|----------|------|-------|----------------|
| **pandapower** | BSD-3-Clause | [e2nIEE/pandapower](https://github.com/e2nIEE/pandapower) | Python | Análisis de flujo de potencia y optimización; base de PowerMCP; validación de decisiones de agentes |
| **PyPSA** | MIT | [PyPSA/PyPSA](https://github.com/PyPSA/PyPSA) | Python + Linopy | Planificación de sistemas de potencia con restricciones de CO2 y renovables; optimización de largo plazo |
| **Grid2Op** | LGPL-3.0 | [rte-france/Grid2Op](https://github.com/rte-france/Grid2Op) | Python | Framework RL para operación de red; LF Energy; L2RPN competition; entrenamiento de agentes de despacho |

### Forecasting y Analytics

| Plataforma | Licencia | Repo | Stack | Caso de uso AI |
|------------|----------|------|-------|----------------|
| **OpenSTEF** | MPL-2.0 | [OpenSTEF/openstef](https://github.com/OpenSTEF/openstef) | Python + MLflow + XGBoost/LightGBM | AutoML para forecasting probabilístico de carga; LF Energy; producción en Alliander NL |
| **Darts** | Apache-2.0 | [unit8co/darts](https://github.com/unit8co/darts) | Python | Series de tiempo para forecasting energético; 30+ modelos; Prophet, NBEATS, TFT |

### Mercados de Energía y RECs

| Plataforma | Licencia | Repo | Stack | Caso de uso AI |
|------------|----------|------|-------|----------------|
| **lemlab (TU Munich)** | GPL-3.0 | [tum-ewk/lemlab](https://github.com/tum-ewk/lemlab) | Python | Mercados locales P2P; clearing algorithms; prosumer data real; base para agentes de trading P2P |
| **Energy Web Chain** | Apache-2.0 | [energywebfoundation](https://github.com/energywebfoundation) | Substrate + Solidity | Blockchain para RECs y mercados de energía; API para agentes que compran/venden certificados verdes |

---

## Cómo Customizar con AI

### Patrón estándar de "AI sobre plataforma existente"

```
[Plataforma vertical (OpenEMS / emoncms / JSON-SCADA)]
          ↓ datos operacionales via API/MQTT
[Capa de ingestión + normalización]
          ↓
[Agente AI (Claude + PowerMCP / LangGraph)]
     ↙               ↘
[Forecasting]    [Optimización]
(OpenSTEF)       (pandapower/PyPSA)
          ↓
[UI conversacional o alertas automáticas]
```

### Consideraciones de integración

1. **OpenEMS** tiene REST API nativa y sistema de componentes; el agente puede leer estado del sistema y escribir setpoints de forma programática
2. **emoncms** expone API de feeds y inputs; ideal para contexto de consumo en agentes de eficiencia
3. **Grid2Op** + **sinergym** son los entornos de entrenamiento para agentes RL especializados antes de producción
4. **OpenSTEF** puede servirse como microservicio REST; el agente llama al endpoint de forecast como herramienta

---
*Ver también: `agents/top.md` y `repos/foundations.md`.*
