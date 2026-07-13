# 🏭 Verticales de partida — Energy

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agentica arriba.
> Última actualización: 2026-07-13

## Plataformas recomendadas

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| **OpenEMS** | Apache-2.0 | [OpenEMS/openems](https://github.com/OpenEMS/openems) | Java, OSGi, TypeScript/Angular | EMS completo para BESS, FV, microrredes, EV charging; edge runtime + cloud backend |
| **FlexMeasures** | Apache-2.0 | [FlexMeasures/flexmeasures](https://github.com/FlexMeasures/flexmeasures) | Python, REST API, plugins | EMS de flexibilidad (LF Energy/Seita) para BESS, bombas de calor, carga industrial; scheduling optimizado |
| **EVerest** | Apache-2.0 | [EVerest/EVerest](https://github.com/EVerest/EVerest) | C++, Python, modular | Stack firmware open source LF Energy para cargadores EV (AC/DC); v2026.02.0 LTS, múltiples OEMs en producción |
| **openremote** | AGPL-3.0 | [openremote/openremote](https://github.com/openremote/openremote) | Java, Kotlin, TypeScript, Docker | IoT platform para gestión de activos energéticos, automatización, API REST/MQTT/WS |
| **Node-RED** | Apache-2.0 | [node-red/node-red](https://github.com/node-red/node-red) | Node.js, flow-based | Integración de PLCs, APIs, MQTT, SCADA; backbone de IIoT y automatización energética |
| **PyPSA** | MIT | [PyPSA/PyPSA](https://github.com/PyPSA/PyPSA) | Python, SciPy, linopt | Modelo de optimización de sistema eléctrico; base para planificación de utilities |
| **SEAPATH** | Apache-2.0 | [seapath](https://github.com/seapath) | Linux, KVM, Yocto | Hipervisor para subestaciones digitales IEC 61850; producción en utilities europeas |
| **ThingsBoard** | Apache-2.0 | [thingsboard/thingsboard](https://github.com/thingsboard/thingsboard) | Java, React, Docker | IoT platform con dashboards SCADA + AI rules engine; casos de uso en utilities |
| **sinergym** | MIT | [ugr-sail/sinergym](https://github.com/ugr-sail/sinergym) | Python, EnergyPlus, Gymnasium | Simulador de edificios para optimización RL de consumo; base para agentes de demanda |
| **CUPID** | Apache-2.0 | [LF Energy CUPID](https://lfenergy.org/projects/cupid/) | C++, IEEE 2030.5 | Toolkit de interoperabilidad DER; client/server library + convertidor de protocolos legacy para ADMS/DERMS |
| **SOGNO** | Apache-2.0 | [LF Energy SOGNO](https://lfenergy.org/projects/sogno/) | Microservicios, APIs abiertas | Plataforma modular para automatización de redes; reemplaza monolitos de sala de control por microservicios |

## Plataformas especializadas por dominio

### EV Charging (EVerest ecosystem)
- **EVerest**: el stack más completo y abierto para cargadores EV — desde firmware hasta OCPP 2.0.1
- **Pionix**: empresa que comercializa EVerest con soporte; provee a Tritium y otros OEMs
- **Patrón**: EVerest (firmware) + OpenEMS (gestión energética edificio) + FlexMeasures (demand response)

### Flexibilidad y BESS
- **FlexMeasures**: el "FastAPI para flexibilidad energética" — scheduling BESS en 15 minutos, APIs REST, plugins
- **OpenEMS**: control en tiempo real de cada activo BESS/FV; deploy en edge gateways
- **openremote**: agregación de portafolio de activos distribuidos con MQTT/REST

### Simulación y planificación de red
- **PyPSA**: estándar de investigación para optimización de sistemas eléctricos con renovables
- **pandapower**: análisis de distribución con integración Python/ML directa
- **pypsa-earth**: cuando el cliente necesita modelar a escala nacional o regional
- **Grid2Op + RL2Grid**: entrenamiento y benchmarking de agentes RL para control de red

### SCADA / OT / Subestaciones
- **Node-RED**: flow-based, fácil de integrar con Modbus/MQTT/OPC-UA y endpoints AI
- **SEAPATH**: subestaciones digitales — el estándar IEC 61850 con Linux (LF Energy, prod. 2025)
- **SOGNO**: modernización de sala de control hacia microservicios; APIs abiertas para integración AI

### DER / Interoperabilidad
- **CUPID**: resolver la fragmentación en comunicación DER — IEEE 2030.5 sobre arquitectura message-driven
- **openremote + FlexMeasures**: gestión y optimización de portafolios DER (FV + BESS + EV + FV)

### Edificios y eficiencia
- **sinergym**: base para agentes RL de optimización de HVAC y consumo de edificios
- **IBM/rl-testbed-for-energyplus**: testbed RL específico para EnergyPlus

## Cómo customizar con AI

1. **Fork del repo base** (ej. OpenEMS, FlexMeasures, EVerest)
2. **Exposición de datos**: conectar fuentes (MQTT, REST, OPC-UA, SQL) con Node-RED o adaptadores
3. **Capa de agentes**: integrar agente LLM (Claude/GPT-4o/Gemini) con herramientas sobre el sistema base
4. **Entrenamiento RL** (opcional): usar sinergym/opfgym/Grid2Op para entrenar agentes de control
5. **UI conversacional**: chat interface sobre el sistema base para operadores / clientes finales
6. **Observabilidad**: MLflow o similar para tracking de decisiones del agente
7. **Benchmarking**: usar PSAB / EnergyAgentBench / RL2Grid para validar calidad del agente

---
*Ver también: `agents/top.md` para agentes AI específicos del sector.*
