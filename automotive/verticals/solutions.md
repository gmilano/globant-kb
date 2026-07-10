# Verticales de partida — Automotive

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-10 (v3 — Eclipse SDV Stack añadido como vertical SDV/in-vehicle, Fleetbase "best OSS 2026", BMW OS X referenciado)

## Fleet Management y Telemática

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| **Traccar** | Apache-2.0 | [github.com/traccar/traccar](https://github.com/traccar/traccar) | Java + MySQL/PostgreSQL + Web UI | GPS tracking de flota: 2000+ dispositivos, 200+ protocolos. REST API + WebSocket. |
| **Fleetbase** | AGPL-3.0 | [github.com/fleetbase/fleetbase](https://github.com/fleetbase/fleetbase) | PHP/Laravel + Vue.js + PostgreSQL | Mejor plataforma OSS fleet management 2026 (Fleetbase Blog). OS modular de logística: fleet, fulfillment, warehouse. No per-driver fee. |
| **OpenRemote** | Apache-2.0 | [openremote.io/fleet-telematics-open-source](https://openremote.io/fleet-telematics-open-source/) | Java + TypeScript + TimescaleDB | Plataforma IoT open 100% para fleet telematics: live tracking, geofences, trip reports, OBD-II, alertas. Self-hosted. |
| **OpenGTS** | Apache-2.0 | [opengts.org](http://www.opengts.org) | Java + MySQL + Tomcat | Fleet tracking web clásico. Maduro, estable. Base para tracking legacy. |

## ERP / DMS (Dealer Management System)

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| **Odoo** | LGPL-3.0 | [github.com/odoo/odoo](https://github.com/odoo/odoo) | Python + PostgreSQL + JS | Módulos: Ventas, CRM, Inventario, Taller, Compras. Ideal DMS con AI layer. LATAM ampliamente adoptado. |
| **ERPNext** | GPL-3.0 | [github.com/frappe/erpnext](https://github.com/frappe/erpnext) | Python/Frappe + MariaDB + Vue | Módulo Service Management para talleres. LATAM popular (Spanish UI). |
| **Apache OFBiz** | Apache-2.0 | [github.com/apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Java + Derby/PostgreSQL | ERP maduro con módulos CRM, inventory, manufactura. Customizable. |
| **Flectra** | LGPL | [flectrahq.com](https://flectrahq.com/industry/open-source-solution-for-automotive-industry-107) | Python/Odoo fork | Fork Odoo con vertical automotriz preconfigurado. Taller, ventas, CRM. |

## Eclipse SDV Stack — Software Defined Vehicle (NUEVO v3)

> Stack de middleware open source para crear Vehicle Apps containerizadas in-vehicle con AI. OEMs y Tier 1 lo adoptan en 2026 como estándar de interoperabilidad. 100% Apache-2.0.

| Componente | Licencia | URL | Descripción |
|-----------|----------|-----|-------------|
| **Eclipse KUKSA** | Apache-2.0 | [eclipse-kuksa.github.io](https://eclipse-kuksa.github.io/kuksa-website/) | Data Broker de señales VSS. gRPC + MQTT. La "POSIX layer" del SDV — lee CAN bus, ADAS, sensores del vehículo. |
| **Eclipse Velocitas** | Apache-2.0 | [eclipse.dev/velocitas](https://eclipse.dev/velocitas/) | Toolchain Vehicle Apps: templates, SDK Python/C++, CI/CD containerizado, Velocitas CLI. 28 repos. |
| **Eclipse Leda** | Apache-2.0 | [eclipse-leda.github.io](https://eclipse-leda.github.io/leda/) | Distro Linux mínima para SDV edge. OTA updates, container orchestration, Fluentd logging. |
| **Eclipse Autowrx / SDV Runtime** | Apache-2.0 | [github.com/eclipse-autowrx/sdv-runtime](https://github.com/eclipse-autowrx/sdv-runtime) | Runtime de referencia SDV para prototipado. KUKSA + Leda + Vehicle Apps. |
| **SDV Blueprints** | Apache-2.0 | [github.com/eclipse-sdv-blueprints](https://github.com/eclipse-sdv-blueprints) | Blueprints E2E: in-vehicle edge → fleet backend con Eclipse SDV. |

**Flujo de integración con AI**:
```
CAN Bus / Sensores → KUKSA Data Broker (VSS) → Vehicle App (Velocitas SDK)
    → Claude API (análisis en edge o nube) → Alerta / Acción / HMI update
```

**Cuándo usar**: Cuando el cliente necesita construir software in-vehicle (no solo fleet mgmt externo). OEMs Tier 1, startups SDV, proyectos de cockpit inteligente.

## Diagnóstico y OBD

| Plataforma | Licencia | URL | Descripción |
|------------|----------|-----|-------------|
| **pyobd** | GPL-2.0 | [github.com/barracuda-fsh/pyobd](https://github.com/barracuda-fsh/pyobd) | Python library para leer datos OBD-II desde ECU. 1.8k★. Diagnóstico vehicular. |
| **python-OBD** | GPL-3.0 | [github.com/brendan-w/python-OBD](https://github.com/brendan-w/python-OBD) | Async OBD-II + ELM327. DTCs, sensores en tiempo real. Base para AI predictive maintenance. |
| **freediag** | GPL-2.0 | [github.com/fenugrec/freediag](https://github.com/fenugrec/freediag) | Herramienta de diagnóstico vehicular multi-protocolo. C. Linux/macOS/Windows. |

## ADAS / AD Stacks Production-Ready

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| **Autoware Vision Pilot** | Apache-2.0 | [github.com/autowarefoundation/autoware_vision_pilot](https://github.com/autowarefoundation/autoware_vision_pilot) | ROS 2 + E2E AI | Stack ADAS L2 completamente open source, production-ready (abr 2026). Primera alternativa OSS seria a Tesla FSD para OEMs. |
| **openpilot** | MIT | [github.com/commaai/openpilot](https://github.com/commaai/openpilot) | Python + CAN bus | ADAS L2+ en 325+ vehículos. 300M+ millas acumuladas. Hardware: comma 4. |
| **Apollo** | Apache-2.0 | [github.com/ApolloAuto/apollo](https://github.com/ApolloAuto/apollo) | C++/Python/ROS | Plataforma AV completa Baidu. Apollo 11.0 (jun 2026). Producción en China. |

## Simulación AV (para testing)

| Plataforma | Licencia | URL | Descripción |
|------------|----------|-----|-------------|
| **CARLA** | MIT | [github.com/carla-simulator/carla](https://github.com/carla-simulator/carla) | Simulador AV fotorrealista. Unreal Engine. 14.1k★. CARLA Leaderboard 2.1 (mar 2026). |
| **LGSVL/SVL** | Apache-2.0 | [github.com/lgsvl/simulator](https://github.com/lgsvl/simulator) | Simulador AV de LG Electronics. Unity. Integra ROS/Autoware. |
| **AirSim** | MIT | [github.com/microsoft/AirSim](https://github.com/microsoft/AirSim) | Simulador Microsoft para drones y vehículos. Unreal/Unity. |

## EV y Carga

| Plataforma | Licencia | URL | Descripción |
|------------|----------|-----|-------------|
| **OCPP** (Open Charge Point Protocol) | Apache-2.0 | [github.com/nickvdyck/OCPP.Net](https://github.com/nickvdyck/OCPP.Net) | Protocolo abierto estándar para EV charging stations. Base para redes de carga. |
| **OpenEVSE** | MIT | [github.com/OpenEVSE/ESP32_WiFi_V4.x](https://github.com/OpenEVSE/ESP32_WiFi_V4.x) | Controlador EVSE open source. ESP32. Carga inteligente. |
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
        r = await client.get(f"{TRACCAR_URL}/positions", auth=("admin", "admin"))
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

### Estrategia 2: Eclipse SDV Vehicle App + Claude para In-Vehicle AI
```python
# vehicle_ai_app.py — Vehicle App sobre Eclipse SDV (KUKSA + Velocitas)
from vehicle import Vehicle, VehicleApp
from sdv.vss import Vehicle as VSS
from anthropic import Anthropic

class AIVehicleApp(VehicleApp):
    """Vehicle App que analiza señales del vehículo con Claude."""

    def __init__(self):
        super().__init__()
        self.vehicle = Vehicle()
        self.client = Anthropic()

    async def on_start(self):
        """Subscribe a señales VSS relevantes."""
        await self.vehicle.OBD.EngineLoad.subscribe(self.on_engine_load_change)
        await self.vehicle.Chassis.Brake.PedalPosition.subscribe(self.on_brake)

    async def on_engine_load_change(self, data):
        """Detecta anomalías en carga del motor."""
        load = data.value
        if load > 85:  # threshold configurable
            diagnosis = await self.analyze_with_claude(f"Engine load: {load}%")
            await self.publish_event("vehicle.ai.alert", {"diagnosis": diagnosis, "value": load})

    async def analyze_with_claude(self, signal_context: str) -> str:
        response = self.client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=200,
            messages=[{"role": "user", "content": f"Vehicle signal anomaly: {signal_context}. Brief diagnosis (50 words):"}]
        )
        return response.content[0].text
```
