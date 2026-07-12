# 🏭 Verticales de partida — Energy

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agentica arriba.
> Última actualización: 2026-07-12

## Plataformas recomendadas

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| **OpenEMS** | Apache-2.0 | [OpenEMS/openems](https://github.com/OpenEMS/openems) | Java, OSGi, TypeScript/Angular | EMS completo para BESS, FV, microrredes, EV charging; edge runtime + cloud backend |
| **openremote** | AGPL-3.0 | [openremote/openremote](https://github.com/openremote/openremote) | Java, Kotlin, TypeScript, Docker | IoT platform para gestión de activos energéticos, automatización, API REST/MQTT/WS |
| **Node-RED** | Apache-2.0 | [node-red/node-red](https://github.com/node-red/node-red) | Node.js, flow-based | Integración de PLCs, APIs, MQTT, SCADA; backbone de IIoT y automatización energética |
| **Rapid SCADA** | GPL-3.0 | [rapidscada/scada](https://github.com/rapidscada/scada) | .NET/C# | SCADA industrial sin límite de tags; monitoreo energético y automatización de edificios |
| **PyPSA** | MIT | [PyPSA/PyPSA](https://github.com/PyPSA/PyPSA) | Python, SciPy, linopt | Modelo de optimización de sistema eléctrico; base para planificación de utilities |
| **SEAPATH** | Apache-2.0 | [seapath](https://github.com/seapath) | Linux, KVM, Yocto | Hipervisor para subestaciones digitales IEC 61850; producción en utilities europeas |
| **ThingsBoard** | Apache-2.0 | [thingsboard/thingsboard](https://github.com/thingsboard/thingsboard) | Java, React, Docker | IoT platform con dashboards SCADA + AI rules engine; casos de uso en utilities |
| **sinergym** | MIT | [ugr-sail/sinergym](https://github.com/ugr-sail/sinergym) | Python, EnergyPlus, Gymnasium | Simulador de edificios para optimización RL de consumo; base para agentes de demanda |

## Plataformas especializadas por dominio

### Gestión energética distribuida (DER/BESS/FV)
- **OpenEMS**: el Odoo del sector energético europeo; modular, extensible, con comunidad activa
- **openremote**: ideal para utilities que gestionan activos distribuidos con MQTT/REST
- **ThingsBoard**: telemetría + reglas + dashboards; ya integrado con varios OEMs de inversores

### Simulación y planificación de red
- **PyPSA**: estándar de investigación para optimización de sistemas eléctricos con renovables
- **pandapower**: análisis de distribución con integración Python/ML directa
- **pypsa-earth**: cuando el cliente necesita modelar a escala nacional o regional

### SCADA / OT
- **Node-RED**: flow-based, fácil de integrar con Modbus/MQTT/OPC-UA y endpoints AI
- **Rapid SCADA**: SCADA clásico sin licencia; añadir capa AI sobre sus datos
- **SEAPATH**: subestaciones digitales — el estándar IEC 61850 con Linux

### Edificios y eficiencia
- **sinergym**: base para agentes RL de optimización de HVAC y consumo de edificios
- **IBM/rl-testbed-for-energyplus**: testbed RL específico para EnergyPlus

## Cómo customizar con AI

1. **Fork del repo base** (ej. OpenEMS, openremote)
2. **Exposición de datos**: conectar fuentes (MQTT, REST, OPC-UA, SQL) con Node-RED o adaptadores
3. **Capa de agentes**: integrar agente LLM (Claude/GPT-4o/Gemini) con herramientas sobre el sistema base
4. **Entrenamiento RL** (opcional): usar sinergym/opfgym para entrenar agentes de control
5. **UI conversacional**: chat interface sobre el sistema base para operadores / clientes finales
6. **Observabilidad**: MLflow o similar para tracking de decisiones del agente

---
*Ver también: `agents/top.md` para agentes AI específicos del sector.*
