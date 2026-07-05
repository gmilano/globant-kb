# 🏭 Verticales de partida — Energy

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional y probado, añadir capa agéntica encima.
> Última actualización: 2026-07-05

## Plataformas recomendadas

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| **MyEMS** | MIT | [github.com/MyEMS/myems](https://github.com/MyEMS/myems) | Python + React + MySQL/InfluxDB | EMS completo: edificios, fábricas, hospitales, parques; ISO 50001; VPP nativo; añadir agente LLM para recomendaciones |
| **OpenEMS** | Eclipse PL 2.0 | [github.com/OpenEMS/openems](https://github.com/OpenEMS/openems) | Java + TypeScript + InfluxDB | EMS para almacenamiento + renovables + EV charging + heat pumps; detrás de FEMS (FENECON); añadir ML para predicción |
| **OpenRemote** | AGPL-3.0 | [github.com/openremote/openremote](https://github.com/openremote/openremote) | Java + Angular + PostgreSQL | IoT platform + EMS: tarifas dinámicas, mercados eléctricos, BESS, EV; API REST + MQTT + WebSocket |
| **OperatorFabric** | MPL-2.0 | [github.com/opfab/operatorfabric-core](https://github.com/opfab/operatorfabric-core) | Spring Boot + Angular + RabbitMQ | Plataforma industrial para operadores de utilities: notificaciones, procesos, SCADA integration; LF Energy project |
| **GridAPPS-D** | Apache 2.0 | [github.com/GRIDAPPSD/GOSS-GridAPPS-D](https://github.com/GRIDAPPSD/GOSS-GridAPPS-D) | Python + Java + Apache ActiveMQ | Plataforma DOE para DERMS/DMS: apps de distribución avanzada; CIM + OpenDSS + GridLAB-D; base para agentes de red |

## Sistemas de monitoreo de activos

| Plataforma | Licencia | URL | Uso |
|------------|----------|-----|-----|
| **Zabbix** | AGPL-3.0 | github.com/zabbix/zabbix | Monitoreo de infraestructura; adaptable a activos SCADA vía templates |
| **Grafana** | AGPL-3.0 | github.com/grafana/grafana | Dashboards para telemetría energética; plugin para análisis con AI |
| **Apache Superset** | Apache 2.0 | github.com/apache/superset | BI para datos energéticos; drill-down en KPIs de consumo y generación |

## Cómo customizar con AI

### Opción A: MyEMS + LLM Agent (recomendada para EMS)
```
MyEMS (base MIT) 
  → añadir endpoint: POST /api/ai/recommend
  → LangGraph agent: lee datos históricos, genera recomendaciones
  → Claude API: respuestas en lenguaje natural para operadores
  → Notificaciones: alertas proactivas cuando consumo anomalía detectada
Tiempo estimado: 3-4 semanas MVP
```

### Opción B: OpenEMS + ML Forecasting
```
OpenEMS (FEMS base) 
  → añadir microservicio Python: pronóstico 24h con pvlib + pandapower
  → API REST: predicción entregada a OpenEMS Controller
  → Optimización: schedule de BESS basado en pronóstico + tarifas
  → Dashboard: Grafana con intervalos de confianza
Tiempo estimado: 4-6 semanas MVP
```

### Opción C: GridAPPS-D + DERMS Agent
```
GridAPPS-D (Apache 2.0 base)
  → App Python: agente LangGraph que lee estado de red vía CIM API
  → pandapower: cálculo de power flow en tiempo real
  → Acciones: reconfiguración automática de switches, despacho DERs
  → Logging: trazabilidad completa de decisiones del agente
Tiempo estimado: 6-8 semanas MVP
```
