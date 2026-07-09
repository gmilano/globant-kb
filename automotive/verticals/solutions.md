# Verticales de partida — Automotive

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-08

## Fleet Management y Telemática

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| **Traccar** | Apache-2.0 | [github.com/traccar/traccar](https://github.com/traccar/traccar) | Java + MySQL/PostgreSQL + Web UI | GPS tracking de flota: 2000+ dispositivos, 200+ protocolos. REST API + WebSocket. |
| **Fleetbase** | AGPL-3.0 | [github.com/fleetbase/fleetbase](https://github.com/fleetbase/fleetbase) | PHP/Laravel + Vue.js + PostgreSQL | OS modular de logística: fleet, fulfillment, warehouse. No per-driver fee. |
| **OpenGTS** | Apache-2.0 | [opengts.org](http://www.opengts.org) | Java + MySQL + Tomcat | Fleet tracking web clásico. Maduro, estable. Base para tracking legacy. |
| **Fleetdm** | MIT | [github.com/fleetdm/fleet](https://github.com/fleetdm/fleet) | Go + MySQL + React | MDM open source para computadoras en flotas. Parches + vuln management. |

## ERP / DMS (Dealer Management System)

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| **Odoo** | LGPL-3.0 | [github.com/odoo/odoo](https://github.com/odoo/odoo) | Python + PostgreSQL + JS | Módulos: Ventas, CRM, Inventario, Taller, Compras. Ideal DMS con AI layer. |
| **ERPNext** | GPL-3.0 | [github.com/frappe/erpnext](https://github.com/frappe/erpnext) | Python/Frappe + MariaDB + Vue | Módulo Service Management para talleres. LATAM popular (Spanish UI). |
| **Apache OFBiz** | Apache-2.0 | [github.com/apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Java + Derby/PostgreSQL | ERP maduro con módulos CRM, inventory, manufactura. Customizable. |
| **Flectra** | LGPL | [flectrahq.com](https://flectrahq.com/industry/open-source-solution-for-automotive-industry-107) | Python/Odoo fork | Fork Odoo con vertical automotriz preconfigurado. Taller, ventas, CRM. |

## Diagnóstico y OBD

| Plataforma | Licencia | URL | Descripción |
|------------|----------|-----|-------------|
| **pyobd** | GPL-2.0 | [github.com/barracuda-fsh/pyobd](https://github.com/barracuda-fsh/pyobd) | Python library para leer datos OBD-II desde ECU. Diagnóstico vehicular. |
| **python-OBD** | GPL-3.0 | [github.com/brendan-w/python-OBD](https://github.com/brendan-w/python-OBD) | Async OBD-II + ELM327. DTCs, sensores en tiempo real. Base para AI predictive maintenance. |
| **freediag** | GPL-2.0 | [github.com/fenugrec/freediag](https://github.com/fenugrec/freediag) | Herramienta de diagnóstico vehicular multi-protocolo. C. Linux/macOS/Windows. |

## Simulación AV (para testing)

| Plataforma | Licencia | URL | Descripción |
|------------|----------|-----|-------------|
| **CARLA** | MIT | [github.com/carla-simulator/carla](https://github.com/carla-simulator/carla) | Simulador AV fotorrealista. Unreal Engine. 14.1k★. |
| **LGSVL/SVL** | Apache-2.0 | [github.com/lgsvl/simulator](https://github.com/lgsvl/simulator) | Simulador AV de LG Electronics. Unity. Integra ROS/Autoware. |
| **AirSim** | MIT | [github.com/microsoft/AirSim](https://github.com/microsoft/AirSim) | Simulador Microsoft para drones y vehículos. Unreal/Unity. |

## EV y Carga

| Plataforma | Licencia | URL | Descripción |
|------------|----------|-----|-------------|
| **OCPP** (Open Charge Point Protocol) | Apache-2.0 | [github.com/nickvdyck/OCPP.Net](https://github.com/nickvdyck/OCPP.Net) | Protocolo abierto estándar para EV charging stations. Base para redes de carga. |
| **OpenEVSE** | MIT | [github.com/OpenEVSE/ESP32_WiFi_V4.x](https://github.com/OpenEVSE/ESP32_WiFi_V4.x) | Controlador EVSE (Electric Vehicle Supply Equipment) open source. ESP32. |
| **RISE-V2G** | MIT | [github.com/SwitchEV/RISE-V2G](https://github.com/SwitchEV/RISE-V2G) | Implementación V2G (Vehicle-to-Grid) ISO 15118. Bidirectional charging. |

---

## Cómo customizar con AI

### Estrategia 1: Traccar + Claude MCP para Fleet Intelligence
```python
# traccar_mcp.py — MCP server sobre API Traccar
from mcp.server import FastMCP
import httpx

mcp = FastMCP("traccar-fleet")
TRACCAR_URL = "http://localhost:8082/api"

@mcp.tool()
async def get_fleet_positions() -> dict:
    """Obtiene posiciones actuales de toda la flota."""
    async with httpx.AsyncClient() as client:
        r = await client.get(f"{TRACCAR_URL}/positions",
                           auth=("admin", "admin"))
        return r.json()

@mcp.tool()
async def get_device_events(device_id: int, days: int = 7) -> list:
    """Historial de eventos de un vehículo."""
    async with httpx.AsyncClient() as client:
        r = await client.get(
            f"{TRACCAR_URL}/events",
            params={"deviceId": device_id, "type": "alarm"},
            auth=("admin", "admin")
        )
        return r.json()
```

### Estrategia 2: Odoo DMS + AI para Taller Automotriz
```python
# odoo_workshop_agent.py — AI agent sobre Odoo taller
import xmlrpc.client
from anthropic import Anthropic

ODOO_URL = "http://localhost:8069"
client = Anthropic()

def get_service_orders(uid, models, password):
    """Obtiene órdenes de servicio abiertas de Odoo."""
    return models.execute_kw(
        'mydb', uid, password,
        'repair.order', 'search_read',
        [[['state', '=', 'confirmed']]],
        {'fields': ['name', 'vehicle_id', 'partner_id', 'operations']}
    )

def ai_diagnostic_assistant(vehicle_symptoms: str) -> str:
    """Asistente de diagnóstico con Claude."""
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": f"Síntomas vehiculares: {vehicle_symptoms}\n\nSugiere diagnóstico diferencial y próximos pasos."
        }]
    )
    return response.content[0].text
```

### Estrategia 3: python-OBD + LLM para Predictive Maintenance
```python
# obd_agent.py — Lee OBD-II y consulta LLM para mantenimiento predictivo
import obd
from anthropic import Anthropic

client = Anthropic()

def read_vehicle_diagnostics():
    """Lee DTCs y sensores del vehículo via OBD-II."""
    connection = obd.OBD()
    dtcs = connection.query(obd.commands.GET_DTC).value
    rpm = connection.query(obd.commands.RPM).value.magnitude
    coolant_temp = connection.query(obd.commands.COOLANT_TEMP).value.magnitude
    return {"dtcs": dtcs, "rpm": rpm, "coolant_temp": coolant_temp}

def predictive_maintenance_agent(diagnostics: dict) -> str:
    """Analiza diagnósticos y recomienda mantenimiento."""
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2048,
        system="Eres un mecánico experto. Analiza datos de diagnóstico OBD-II y recomienda acciones de mantenimiento preventivo y correctivo.",
        messages=[{"role": "user", "content": str(diagnostics)}]
    )
    return response.content[0].text
```
