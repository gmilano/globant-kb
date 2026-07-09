# 🏭 Verticales de partida — Energy

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica encima.
> Última actualización: 2026-07-09

## Plataformas recomendadas

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| **MyEMS** | MIT | [github.com/MyEMS/myems](https://github.com/MyEMS/myems) | Python + React + MySQL | EMS completo: edificios, fábricas, hospitales, solar, VPP, EV charging, carbon tracking |
| **OpenEMS** | AGPL-3.0 / EPL-2.0 | [github.com/OpenEMS/openems](https://github.com/OpenEMS/openems) | Java + Angular | Renovables, BESS, EV charging, microgrids. FENECON FEMS stack. |
| **VOLTTRON** | Apache-2.0 | [github.com/VOLTTRON/volttron](https://github.com/VOLTTRON/volttron) | Python (agentes pub/sub) | Building-to-grid: demand response, AFDD HVAC, smart metering, VPP |
| **emoncms** | AGPL-3.0 | [github.com/emoncms/emoncms](https://github.com/emoncms/emoncms) | PHP + JS | Monitoreo energético residencial e industrial. Base para anomaly detection. |
| **openremote** | AGPL-3.0 | [github.com/openremote/openremote](https://github.com/openremote/openremote) | Java + TypeScript | IoT platform: integra dispositivos de energía, dashboards, alertas IA |
| **OSeMOSYS** | Apache-2.0 | [github.com/OSeMOSYS/OSeMOSYS](https://github.com/OSeMOSYS/OSeMOSYS) | Python/MathProg | Planificación energética nacional/regional de largo plazo (IEA, IRENA) |

---

## Cómo customizar con AI

### 1. MyEMS + AI Layer (MIT license — máxima libertad)
```
MyEMS core (MIT) 
  → API FastAPI AI module
  → Claude Haiku para alertas de anomalías y reportes NL
  → Forecasting (Prophet / LightGBM) sobre time series de consumo
  → Chatbot de gestión energética sobre los datos del EMS
```
**Tiempo**: 4-8 semanas para MVP. Deal size: $80k-$300k.

### 2. OpenEMS + LangChain (AGPL — self-hosted)
```
OpenEMS edge (microgrid/BESS/solar control)
  → REST bridge → LangChain agent
  → Herramientas: consultar estado, ajustar setpoints, pronosticar demanda
  → Interfaz conversacional para operadores de planta
```
**Tiempo**: 6-10 semanas. Deal size: $100k-$400k.

### 3. VOLTTRON + Multi-Agent Demand Response (Apache-2.0)
```
VOLTTRON platform (building/grid agents)
  → Agentes demand response con RL (Stable-Baselines3)
  → Grid2Op simulator para validación
  → Integración con señales de precio spot / carbon intensity
  → Orquestador LangGraph para decisiones multi-criterio
```
**Tiempo**: 8-12 semanas. Deal size: $150k-$600k.

### 4. emoncms + Anomaly Detection Agent
```
emoncms (monitoreo en tiempo real)
  → stream MQTT → Kafka/Redis
  → modelo Isolation Forest o LSTM autoencoder
  → agente Claude que genera work orders en lenguaje natural
  → integración con CMMS (Maximo, SAP PM)
```
**Tiempo**: 3-5 semanas. Deal size: $40k-$120k.

---

## Comparación de licencias

| Plataforma | Licencia | Uso comercial | Fork privado | Distribuir modificaciones |
|------------|----------|---------------|--------------|--------------------------|
| MyEMS | MIT | ✅ Libre | ✅ Sí | ✅ No obligatorio |
| VOLTTRON | Apache-2.0 | ✅ Libre | ✅ Sí | ✅ No obligatorio |
| OSeMOSYS | Apache-2.0 | ✅ Libre | ✅ Sí | ✅ No obligatorio |
| emoncms | AGPL-3.0 | ⚠️ SaaS copyleft | ⚠️ Condicional | ❗ Obligatorio (red) |
| openremote | AGPL-3.0 | ⚠️ SaaS copyleft | ⚠️ Condicional | ❗ Obligatorio (red) |
| OpenEMS | AGPL-3.0 + EPL-2.0 | ⚠️ Dual license | ⚠️ Ver licencia | ❗ Ver AGPL/EPL |

**Recomendación Globant**: Partir de MyEMS (MIT) o VOLTTRON (Apache) para proyectos comerciales. OpenEMS tiene dual licensing con opción comercial de FENECON.
