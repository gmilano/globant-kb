# Vertical Platforms — Energy

> Full-featured platforms customizable with AI. Strategy: start with a working system, add agentic layer on top.
> Last updated: 2026-07-14

## Recommended Platforms

| Platform | License | URL | Stack | Use Case |
|----------|---------|-----|-------|----------|
| **EVerest** | Apache-2.0 | [github.com/EVerest/EVerest](https://github.com/EVerest/EVerest) | C++17, Python, MQTT | EV charging firmware stack — AC/DC chargers, OCPP 1.6/2.0.1/2.1, ISO 15118-20, Plug&Charge, TPM 2.0 (v2026.02.0-LTS, LF Energy) |
| **FlexMeasures** | Apache-2.0 | [github.com/FlexMeasures/flexmeasures](https://github.com/FlexMeasures/flexmeasures) | Python, PostgreSQL, Redis | Energy management & scheduling EMS — batteries, EV chargers, heat pumps; OpenADR, S2, VPP support (LF Energy) |
| **Open e-Mobility** | Apache-2.0 | [github.com/SAP/e-mobility-charging-stations-simulator](https://github.com/SAP/e-mobility-charging-stations-simulator) | Node.js, MongoDB (MEAN) | Smart charging CSMS — multi-protocol OCPP, smart charging profiles, load balancing for EV fleets |
| **OpenOCPP** | Apache-2.0 | [openocpp.com](https://openocpp.com/) | C++ embedded | Hardware-agnostic OCPP 1.6J + 2.0.1 pre-certified firmware for EV charger manufacturers (ChargeLab) |
| **openremote** | AGPL-3.0 | [github.com/openremote/openremote](https://github.com/openremote/openremote) | Java, TypeScript, MQTT | 100% open-source IoT + energy platform: device management, rules engine, REST/MQTT APIs |
| **RapidSCADA** | LGPL-3.0 | [rapidscada.org](https://rapidscada.org/) | C#, .NET | Full-featured open SCADA: real-time data, alarms, trending, Modbus/OPC-UA |
| **sinergym** | MIT | [github.com/ugr-sail/sinergym](https://github.com/ugr-sail/sinergym) | Python, EnergyPlus | Building energy simulation Gym: HVAC control, demand response — AI agent training environment |
| **CityLearn** | BSD-3-Clause | [github.com/intelligent-environments-lab/CityLearn](https://github.com/intelligent-environments-lab/CityLearn) | Python, Gymnasium | Multi-building MARL for demand response and urban energy coordination (v2.6.0b2) |
| **Grid2Op** | LGPL-2.1 | [github.com/rte-france/Grid2Op](https://github.com/rte-france/Grid2Op) | Python | Power grid control simulation — N-1 contingencies, AC power flow, RL agent interface |
| **OpenPLC** | GPL-3.0 | [openplcproject.com](https://openplcproject.com/) | C, Python | Open-source PLC runtime (IEC 61131-3 languages) + editor — low-cost automation control |

## How to Add AI on Top

### EMS + AI Scheduling Agent
```
FlexMeasures (base EMS scheduling)
  ↓ REST API  
LangGraph agent (decision loop)
  ↓  
PowerMCP (query grid simulator for constraints)
  ↓  
Claude API (natural-language flexibility reports for operators)
```

### EV Fleet Intelligence
```
EVerest (charger firmware, OCPP 2.0.1)
  ↓ MQTT events
Open e-Mobility (CSMS — charge point management)
  ↓ REST API
FlexMeasures (optimization scheduling)
  ↓
LLM agent (operator chat, anomaly explanation)
```

### AI-Augmented SCADA
```
RapidSCADA (real-time data acquisition, alarms, trends)
  ↓ OPC-UA / REST
PowerMCP (MCP server exposing grid data to LLM)
  ↓
Claude API (natural-language operations assistant)
  ↓
PowerDAG (agentic analysis pipeline for distribution faults)
```

## LATAM Specifics

| Country | Key Opportunity | Recommended Stack |
|---------|----------------|------------------|
| Brazil | Grid expansion + EV fleet growth (Petrobras, Electra) | EVerest + Open e-Mobility + FlexMeasures |
| Chile | Solar curtailment crisis, dispatch optimization | FlexMeasures + Grid2Op RL agents |
| Colombia | Rural electrification microgrids (IPSE) | CityLearn + EVerest mini-grid modules |
| Mexico | Industrial demand response (CENACE) | RapidSCADA + PowerMCP + FlexMeasures |
| Argentina | Smart metering (EDESUR, EDENOR) | openremote + FlexMeasures |
