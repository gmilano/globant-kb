# 🏗️ Repos Fundacionales — Energy

> Bases sobre las cuales construir soluciones AI para la industria energética.
> Licencia abierta, comunidad activa, uso en producción verificado.
> Última actualización: 2026-07-10

## Simulación y Análisis de Redes Eléctricas

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|--------------|
| [rte-france/Grid2Op](https://github.com/rte-france/Grid2Op) | LGPL-3.0 | ~1.1k | Framework RL para operación de redes eléctricas; usado en competiciones L2RPN; LF Energy project | Sí — agentes RL de despacho y control de red |
| [pandapower](https://github.com/e2nIEE/pandapower) | BSD-3-Clause | ~1.0k | Biblioteca Python para análisis de flujo de potencia, cortocircuito y optimización; base de PowerMCP | Sí — simulación rápida para validar decisiones de agentes |
| [PyPSA/PyPSA](https://github.com/PyPSA/PyPSA) | MIT | ~1.4k | Python for Power System Analysis; planificación de sistemas de energía con optimización linear; base de PowerMCP | Sí — optimización de portfolios renovables, CO2 constraints |
| [dpsim-simulator/dpsim](https://github.com/sogno-platform/dpsim) | MPL-2.0 | ~230 | Simulador de sistemas de potencia en tiempo real; base sogno/RWTH Aachen; integrado con OpenEMS | Sí — validación en tiempo real |

## Gestión de Energía (EMS/BEMS)

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|--------------|
| [OpenEMS/openems](https://github.com/OpenEMS/openems) | Eclipse PL 2.0 | ~1.2k | EMS modular para renovables, almacenamiento, EV charging; FENECON; usado en miles de instalaciones industriales y comerciales | Sí — plataforma base para añadir agentes de optimización |
| [OpenSTEF/openstef](https://github.com/OpenSTEF/openstef) | MPL-2.0 | ~400 | AutoML pipelines para forecasting probabilístico de carga a corto plazo; LF Energy project; Alliander NL en producción | Sí — forecasting de demanda como servicio para agentes de despacho |
| [openremote/openremote](https://github.com/openremote/openremote) | AGPL-3.0 | ~1.8k | Plataforma IoT 100% open source; rules engine, protocols MQTT/HTTP/WebSocket/Modbus; dashboards; flows de automatización | Sí — capa de integración IoT para sensores de red y edificios |

## Optimización y RL para Edificios

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|--------------|
| [ugr-sail/sinergym](https://github.com/ugr-sail/sinergym) | MIT | ~231 | Gym environment para simulación y control de edificios con RL + EnergyPlus; soporte multi-zona, multi-objetivo | Sí — entrenamiento de agentes RL para HVAC y gestión energética |
| [IBM/rl-testbed-for-energyplus](https://github.com/IBM/rl-testbed-for-energyplus) | MIT | ~217 | RL Testbed de IBM para optimización de consumo energético en edificios; EnergyPlus backend | Sí — baseline RL para comparar contra agentes LLM |
| [santoshphilip/eppy](https://github.com/santoshphilip/eppy) | MIT | ~199 | Scripting language para EnergyPlus; parametrización de modelos de edificios | Sí — automatización de simulaciones EnergyPlus desde agentes |

## Mercados de Energía y P2P

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|--------------|
| [tum-ewk/lemlab](https://github.com/tum-ewk/lemlab) | GPL-3.0 | ~120 | Framework multi-agente para mercados locales de energía P2P; TU Munich; data time-series prosumidores reales; clearing algorithms | Sí — simulación de mercados P2P para agentes de trading energético |
| [energywebfoundation/ew-dos-token-interface](https://github.com/energywebfoundation/ew-dos-token-interface) | Apache-2.0 | ~80 | Energy Web: certificados de energía renovable (RECs) en blockchain EW Chain; API para agentes de compra/venta de energía verde | Sí — integración de atributos de origen renovable en decisiones de agentes |

## SCADA y Telemetría Industrial

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|--------------|
| [riclolsen/json-scada](https://github.com/riclolsen/json-scada) | GPL-2.0 | ~400 | SCADA completo para sistemas de potencia; soporte IEC 61850, IEC 104, DNP3, OPC UA, MQTT; usado en subestaciones reales | Sí — ingestión de datos operacionales reales para agentes |
| [emoncms/emoncms](https://github.com/emoncms/emoncms) | AGPL-3.0 | ~1.5k | Plataforma de monitoreo energético open source; serie de tiempo, dashboards; base de OpenEnergyMonitor | Sí — datos de consumo residencial/comercial para agentes de eficiencia |

---

## Stack Mínimo para Proyecto AI Energético

```
1. Datos operacionales: OpenEMS / emoncms / json-scada (telemetría real)
2. Simulación: pandapower + PyPSA (validación de decisiones)
3. Forecasting: OpenSTEF (carga y generación a corto plazo)
4. Agentes: PowerMCP + Claude / GPT-4o (razonamiento y herramientas)
5. RL especializado: Grid2Op + sinergym (control de red y edificios)
6. Orquestación: PowerWF (workflows de ingeniería de potencia)
```

---
*Ver también: `agents/top.md` para los agentes AI específicos.*
