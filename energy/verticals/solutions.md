# Vertical Solutions — Energy Industry
> v9 · Updated 2026-07-14 · Real platforms with AI integration paths

## Strategy: Platform + Agentic Layer

```
[Vertical platform (open source, production-proven)]
                  ↓
[AI integration: LLM + agent framework + MCP tools]
                  ↓
[Client-facing: dashboard / chatbot / API / mobile]
```

Start with a platform that already handles domain complexity (protocols, device drivers, data models), add intelligence on top.

---

## Tier 1 — Build On These Today

### 1. FlexMeasures (LF Energy)
**[github.com/FlexMeasures/flexmeasures](https://github.com/FlexMeasures/flexmeasures)**
- **License:** Apache-2.0
- **Stack:** Python, Flask, PostgreSQL, Redis, Celery
- **Focus:** Demand response, VPP, battery scheduling, EV charging optimization
- **AI-native:** Built-in probabilistic forecasting, schedule optimization API, sensor belief propagation
- **Protocols:** OpenADR 2.0b, S2 (CER-IoP), REST API
- **Quickstart:** `docker compose up` → running EMS in 10 min
- **AI integration:** Plug FlexMeasures schedules into CrewAI / LangGraph for multi-asset coordination

**Globant engagement template:**
> FlexMeasures as EMS backbone + PowerDAG for operator-facing LLM → Complete AI-augmented EMS in 8 weeks

---

### 2. OpenEMS
**[github.com/OpenEMS/openems](https://github.com/OpenEMS/openems)**
- **License:** Apache-2.0 (LGPL-2.1 for OSGI components)
- **Stack:** Java, OSGi, React frontend
- **Focus:** Full EMS: solar PV, BESS, EV charging, heat pumps, grid metering, ToU tariffs
- **Protocols:** Modbus, KEBA P30, SunSpec, MQTT, REST
- **Version:** 2026.3.0 (Mar 2026)
- **AI integration:** Add a Controller component that calls FlexMeasures or an LLM for schedule decisions

**Production deployments:** German community energy, Austrian industrial, LATAM solar-BESS installations

---

### 3. EVerest (LF Energy)
**[github.com/EVerest/everest-core](https://github.com/EVerest/everest-core)**
- **License:** Apache-2.0
- **Stack:** C++17, Python modules, MQTT internal bus
- **Focus:** EV charging station firmware — the complete charging stack
- **Version:** 2026.02.0 LTS (first long-term support release)
- **Protocols:** OCPP 1.6 / 2.0.1, ISO 15118-2 / -20 (V2G), OCPI, OpenADR
- **OEMs using EVerest:** Multiple commercial charger manufacturers (NDA-protected)
- **TPM 2.0:** Hardware security module support for fleet key management
- **AI integration:** ISO 15118 session data → FlexMeasures schedule → EVerest set-point via OCPP

---

### 4. OpenEnergyMonitor / emonCMS
**[github.com/openenergymonitor/emoncms](https://github.com/openenergymonitor/emoncms)**
- **License:** Apache-2.0
- **Stack:** PHP, MySQL, Redis, MQTT
- **Focus:** Energy monitoring, visualization, time-series data management
- **Hardware:** emonPi (Raspberry Pi shield), emonTx, CT clamps
- **Community:** 100k+ installations globally; strong LATAM hobbyist/SMB community
- **AI integration:** emonCMS feeds → FlexMeasures sensor data → AI scheduling

**LATAM fit:** Low cost, Raspberry Pi based, community-maintained Spanish docs. Good fit for Brazilian/Colombian SMB solar monitoring.

---

## Tier 2 — Grid Infrastructure

### 5. Open Smart Grid Platform / Grid eXchange Fabric (GXF)
**[github.com/OSGP/open-smart-grid-platform](https://github.com/OSGP/open-smart-grid-platform)**
- **License:** Apache-2.0
- **Stack:** Java, Spring Boot, PostgreSQL
- **Focus:** Generic IoT platform for grid devices — smart meters, street lighting, substations
- **Protocols:** OSLP (own protocol), IEC 61850, DLMS/COSEM, OSLP
- **Operator:** Dutch public space (cities, DSOs in Netherlands)
- **AI integration:** GXF event stream → LLM anomaly detection → OperatorFabric alert card

---

### 6. PowSyBl (LF Energy)
**[github.com/powsybl/powsybl-core](https://github.com/powsybl/powsybl-core)**
- **License:** MPL-2.0
- **Stack:** Java
- **Focus:** Grid modeling, load flow analysis, security analysis, contingency calculation
- **Version:** 2026.0.0 (final release train, IIDM 1.16, AC/DC load flow)
- **Production use:** TenneT ReFlow platform (10× grid security analysis speedup)
- **AI integration:** PowSyBl simulation results → PowerDAG / GridMind reasoning → operator recommendation

---

### 7. OperatorFabric (LF Energy)
**[github.com/opfab/operatorfabric-core](https://github.com/opfab/operatorfabric-core)**
- **License:** MPL-2.0
- **Stack:** Java, Angular, Spring Cloud
- **Focus:** Control room operator UI — structured notification cards, real-time grid events
- **Version:** v4.0.0.RELEASE
- **AI integration:** AINETUS / GridMind recommendations → OperatorFabric card with explanation + action buttons

---

### 8. PyPSA (Python for Power System Analysis)
**[github.com/PyPSA/PyPSA](https://github.com/PyPSA/PyPSA)**
- **License:** MIT
- **Stack:** Python, pandas, scipy, linopt
- **Focus:** Sector-coupled energy system optimization: electricity + heat + hydrogen + transport
- **Scale:** Continental European grid models (PyPSA-Eur), national energy plans
- **AI integration:** LLM generates scenario narratives → PyPSA computes cost/capacity → LLM interprets and recommends

---

### 9. SEAPATH (LF Energy)
**[github.com/seapath](https://github.com/seapath)**
- **License:** Apache-2.0
- **Stack:** Linux, DPDK, Kubernetes, Yocto
- **Focus:** Real-time grid automation platform for running virtualized protection and automation apps
- **Key:** Replaces proprietary RTUs with open Linux-based real-time systems
- **AI integration:** SEAPATH event bus → agentic protection coordination agent

---

### 10. OpenRemote
**[github.com/openremote/openremote](https://github.com/openremote/openremote)**
- **License:** AGPL-3.0 (commercial license available)
- **Stack:** Java, TypeScript, PostgreSQL, MQTT
- **Focus:** IoT + energy management + smart city — rules engine, asset modeling, dashboards
- **Stars:** ~1.8k — strong LATAM community presence
- **AI integration:** OpenRemote rules → LangGraph agent for complex multi-asset decisions → OpenRemote actuate

---

## Customization Playbook

### Standard AI Integration Pattern
```python
# 1. Read from vertical platform
readings = platform_api.get_sensor_data(asset_id, last_24h=True)

# 2. Forecast with FlexMeasures
forecast = flexmeasures.get_forecast(sensor_id, horizon_hours=24)

# 3. Optimize with PowerDAG / LLM agent
schedule = powerdag_agent.run(
    readings=readings,
    forecast=forecast,
    constraints=client_constraints,
    objective="minimize_cost"
)

# 4. Apply to platform
platform_api.set_schedule(asset_id, schedule)
```

### Platform Decision Matrix

| Client Scenario | Primary Platform | AI Layer | Notes |
|-----------------|------------------|----------|-------|
| Community energy / prosumer | FlexMeasures | agentic-ai-hems | OpenADR connects to utility |
| Industrial facility EMS | OpenEMS | FlexMeasures + LLM | OSGi controller |
| EV charging network | EVerest | FlexMeasures + V2G | ISO 15118 V2G |
| Grid operator control room | PowSyBl + OperatorFabric | GridMind + AINETUS | Deterministic + explainable |
| National grid planning | PyPSA | LLM scenario builder | Scenario narratives |
| IoT / LATAM SMB | OpenRemote / emonCMS | Ollama local LLM | Low cost, Spanish docs |
| Smart city / DSO | GXF (OSGP) | LangGraph + alerts | Protocol variety |
