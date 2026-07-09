# Patrones de composición — Automotive

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-09 (v2 — P9 OpenDriveVLA Evaluation Pipeline VLA+CARLA+Claude)

## Arquitectura base

```
[Plataforma vertical base (open source)]
          ↓
[Capa de integración AI (MCP / API / SDK)]
          ↓
[Agentes especializados (LangGraph / Claude)]
          ↓
[UI conversacional / API para el cliente]
```

---

## Patrón 1: Fleet Intelligence Agent (Traccar + Claude)

**Objetivo**: Asistente conversacional de gestión de flota sobre GPS tracking real.

**Stack**:
- `traccar/traccar` (Apache-2.0) — backend GPS
- `langchain-ai/langgraph` (MIT) — orquestación agente
- `anthropic/anthropic-sdk-python` — Claude como LLM
- MCP server sobre Traccar REST API

**Tiempo**: 3-4 semanas | **Costo estimado**: $80k-250k

```python
# fleet_intelligence_agent.py
from langgraph.graph import StateGraph, END
from anthropic import Anthropic
import httpx
from typing import TypedDict

client = Anthropic()
TRACCAR_URL = "http://traccar:8082/api"
AUTH = ("admin", "fleet_password")

class FleetState(TypedDict):
    query: str
    fleet_data: dict
    response: str

def fetch_fleet_context(state: FleetState) -> FleetState:
    """Obtiene contexto actual de la flota."""
    with httpx.Client() as http:
        positions = http.get(f"{TRACCAR_URL}/positions", auth=AUTH).json()
        devices = http.get(f"{TRACCAR_URL}/devices", auth=AUTH).json()
        # Eventos de las últimas 24h
        events = http.get(
            f"{TRACCAR_URL}/reports/events",
            params={"from": "now-24h", "to": "now", "type": "alarm"},
            auth=AUTH
        ).json()
    state["fleet_data"] = {
        "active_vehicles": len(positions),
        "devices": len(devices),
        "recent_alarms": len(events),
        "positions": positions[:5]  # muestra de posiciones
    }
    return state

def fleet_analyst(state: FleetState) -> FleetState:
    """Claude analiza estado de flota y responde query."""
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        system="""Eres el asistente inteligente de gestión de flota de la empresa.
        Analizas datos GPS en tiempo real y das respuestas accionables en español.""",
        messages=[{
            "role": "user",
            "content": f"Query: {state['query']}\n\nDatos de flota: {state['fleet_data']}"
        }]
    )
    state["response"] = response.content[0].text
    return state

# Grafo LangGraph
builder = StateGraph(FleetState)
builder.add_node("fetch_context", fetch_fleet_context)
builder.add_node("analyst", fleet_analyst)
builder.add_edge("fetch_context", "analyst")
builder.add_edge("analyst", END)
builder.set_entry_point("fetch_context")
fleet_agent = builder.compile()

# Uso
result = fleet_agent.invoke({
    "query": "¿Qué vehículos no han reportado posición en las últimas 2 horas?",
    "fleet_data": {},
    "response": ""
})
print(result["response"])
```

---

## Patrón 2: Predictive Maintenance Agent (OBD-II + LangGraph + Claude)

**Objetivo**: Agente que lee diagnósticos vehiculares OBD-II y genera recomendaciones de mantenimiento predictivo.

**Stack**:
- `brendan-w/python-OBD` (GPL-3.0) — lectura OBD-II
- `unit8co/darts` (Apache-2.0) — time series anomaly detection
- `anthropic/anthropic-sdk-python` — Claude diagnóstico
- PostgreSQL — historial de telemetría

**Tiempo**: 4-6 semanas | **Costo estimado**: $150k-400k

```python
# predictive_maintenance.py
import obd
import pandas as pd
from darts import TimeSeries
from darts.models import NaiveDrift
from anthropic import Anthropic

client = Anthropic()

HEALTH_THRESHOLDS = {
    "coolant_temp": (70, 105),    # grados Celsius normales
    "oil_temp": (80, 130),
    "rpm": (600, 6000),
    "throttle_pos": (0, 100),
}

def read_obd_snapshot(port="/dev/ttyUSB0") -> dict:
    """Lee snapshot de sensores OBD-II."""
    conn = obd.Async(port)
    conn.watch(obd.commands.COOLANT_TEMP)
    conn.watch(obd.commands.RPM)
    conn.watch(obd.commands.GET_DTC)
    conn.watch(obd.commands.THROTTLE_POS)
    conn.start()
    import time; time.sleep(2)
    
    data = {
        "coolant_temp": conn.query(obd.commands.COOLANT_TEMP).value.magnitude,
        "rpm": conn.query(obd.commands.RPM).value.magnitude,
        "dtcs": [str(d) for d in conn.query(obd.commands.GET_DTC).value],
        "throttle_pos": conn.query(obd.commands.THROTTLE_POS).value.magnitude,
    }
    conn.stop()
    return data

def detect_anomalies(telemetry_history: pd.DataFrame) -> list:
    """Detecta anomalías en series temporales de telemetría."""
    anomalies = []
    for sensor, (low, high) in HEALTH_THRESHOLDS.items():
        if sensor in telemetry_history.columns:
            recent = telemetry_history[sensor].tail(24)  # últimas 24h
            if recent.max() > high * 0.9 or recent.min() < low * 1.1:
                anomalies.append({
                    "sensor": sensor,
                    "value": recent.iloc[-1],
                    "threshold": (low, high),
                    "trend": "increasing" if recent.is_monotonic_increasing else "variable"
                })
    return anomalies

def maintenance_agent(vehicle_id: str, obd_data: dict, anomalies: list) -> str:
    """Claude genera reporte de mantenimiento predictivo."""
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2048,
        system="""Eres un mecánico experto certificado ASE. Analizas datos de diagnóstico
        OBD-II y anomalías de telemetría para generar recomendaciones de mantenimiento
        preventivo y correctivo. Prioriza seguridad. Responde en español.""",
        messages=[{
            "role": "user",
            "content": f"""
Vehículo ID: {vehicle_id}
Diagnóstico OBD-II: {obd_data}
Anomalías detectadas: {anomalies}

Genera:
1. Evaluación de estado actual (1-10)
2. Problemas detectados (DTC codes y significado)
3. Recomendaciones inmediatas (próximas 24h)
4. Mantenimiento preventivo (próximas 2 semanas)
5. Partes a reemplazar con urgencia
"""
        }]
    )
    return response.content[0].text
```

---

## Patrón 3: AV Testing Pipeline (CARLA + LangGraph + Claude)

**Objetivo**: Pipeline agéntico para generar, ejecutar y analizar escenarios de prueba de conducción autónoma en CARLA.

**Stack**:
- `carla-simulator/carla` (MIT) — simulador
- `MasoudJTehrani/PCLA` (Apache-2.0) — testing framework
- `langchain-ai/langgraph` (MIT) — orquestación
- `anthropic/anthropic-sdk-python` — análisis de resultados

**Tiempo**: 6-8 semanas | **Costo estimado**: $250k-700k

```python
# av_testing_agent.py
import carla
import json
from langgraph.graph import StateGraph, END
from anthropic import Anthropic
from typing import TypedDict, List

client = Anthropic()

class AVTestState(TypedDict):
    scenario_description: str
    scenario_config: dict
    test_results: List[dict]
    analysis: str
    pass_fail: str

def scenario_generator(state: AVTestState) -> AVTestState:
    """Claude genera configuración de escenario CARLA."""
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        system="Eres un experto en testing de conducción autónoma. Generas configuraciones CARLA en JSON.",
        messages=[{
            "role": "user",
            "content": f"Genera escenario CARLA para: {state['scenario_description']}\n\nJSON válido con: weather, traffic_density, pedestrian_density, route_length_km, special_conditions"
        }]
    )
    import re
    json_match = re.search(r'\{.*\}', response.content[0].text, re.DOTALL)
    if json_match:
        state["scenario_config"] = json.loads(json_match.group())
    return state

def run_carla_scenario(state: AVTestState) -> AVTestState:
    """Ejecuta escenario en CARLA y recolecta métricas."""
    config = state["scenario_config"]
    
    client_carla = carla.Client("localhost", 2000)
    world = client_carla.get_world()
    
    # Aplicar condiciones del escenario
    weather = carla.WeatherParameters(
        cloudiness=config.get("weather", {}).get("cloudiness", 20),
        precipitation=config.get("weather", {}).get("precipitation", 0)
    )
    world.set_weather(weather)
    
    # Simulación simplificada (en producción: agente completo + métricas)
    results = {
        "route_completion": 0.87,
        "infractions": [{"type": "speed_limit", "severity": "minor"}],
        "collision_count": 0,
        "traffic_light_violations": 0,
        "duration_seconds": 120,
        "scenario": config
    }
    state["test_results"].append(results)
    return state

def result_analyzer(state: AVTestState) -> AVTestState:
    """Claude analiza resultados de la prueba."""
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1500,
        system="Analiza resultados de pruebas de conducción autónoma según estándares ISO 26262 y UNECE WP.29.",
        messages=[{
            "role": "user",
            "content": f"Resultados: {json.dumps(state['test_results'], indent=2)}\n\nEvalúa: 1) Pass/Fail, 2) Problemas críticos, 3) Recomendaciones mejora."
        }]
    )
    state["analysis"] = response.content[0].text
    state["pass_fail"] = "PASS" if state["test_results"][0]["collision_count"] == 0 else "FAIL"
    return state

# Pipeline
builder = StateGraph(AVTestState)
builder.add_node("generate", scenario_generator)
builder.add_node("execute", run_carla_scenario)
builder.add_node("analyze", result_analyzer)
builder.add_edge("generate", "execute")
builder.add_edge("execute", "analyze")
builder.add_edge("analyze", END)
builder.set_entry_point("generate")
av_pipeline = builder.compile()
```

---

## Patrón 4: EV Charging Route Optimizer (LangGraph + HERE Maps + Claude)

**Objetivo**: Agente que optimiza rutas para vehículos eléctricos considerando estado de carga, estaciones disponibles y tiempo de viaje.

**Stack**:
- HERE Maps MCP (routing + EV stations)
- `langchain-ai/langgraph` (MIT)
- `anthropic/anthropic-sdk-python` (Claude)
- `ev-charging-optimization` MIT como referencia

**Tiempo**: 3-5 semanas | **Costo estimado**: $100k-300k

```python
# ev_route_agent.py
from langgraph.graph import StateGraph, END
from anthropic import Anthropic
import httpx
from typing import TypedDict, List

client = Anthropic()
HERE_API_KEY = "your_here_api_key"

class EVRouteState(TypedDict):
    origin: str
    destination: str
    current_soc: float  # State of Charge 0-100%
    vehicle_range_km: float
    charging_stops: List[dict]
    route_plan: str

def find_charging_stations(state: EVRouteState) -> EVRouteState:
    """Encuentra estaciones de carga en la ruta."""
    with httpx.Client() as http:
        # HERE EV Stations API
        r = http.get(
            "https://ev.ls.hereapi.com/v3/discover",
            params={
                "apiKey": HERE_API_KEY,
                "q": "charging station",
                "at": state["origin"],
                "limit": 10,
                "connectorTypes": "IEC_62196_T2,CHADEMO,CCS"
            }
        )
        stations = r.json().get("items", [])
    
    # Filtrar por distancia máxima basada en SoC actual
    max_range = state["vehicle_range_km"] * (state["current_soc"] / 100) * 0.8  # 80% safety buffer
    state["charging_stops"] = [
        s for s in stations
        if s.get("distance", float("inf")) < max_range * 1000
    ][:5]
    return state

def route_planner(state: EVRouteState) -> EVRouteState:
    """Claude planifica la ruta óptima con paradas de carga."""
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2048,
        system="""Eres un asistente de viaje especializado en vehículos eléctricos.
        Optimizas rutas considerando range anxiety, tiempo de carga y comodidad del conductor.
        Responde en español con empatía.""",
        messages=[{
            "role": "user",
            "content": f"""
Origen: {state["origin"]}
Destino: {state["destination"]}
Carga actual (SoC): {state["current_soc"]}%
Autonomía total: {state["vehicle_range_km"]} km
Estaciones disponibles: {state["charging_stops"]}

Crea plan de viaje optimizado:
1. Paradas de carga recomendadas (ubicación, cuánto cargar, tiempo estimado)
2. Ruta alternativa si hay problemas
3. Tiempo total estimado (conducción + carga)
4. Tips de conducción eficiente para maximizar autonomía
"""
        }]
    )
    state["route_plan"] = response.content[0].text
    return state

builder = StateGraph(EVRouteState)
builder.add_node("find_stations", find_charging_stations)
builder.add_node("plan_route", route_planner)
builder.add_edge("find_stations", "plan_route")
builder.add_edge("plan_route", END)
builder.set_entry_point("find_stations")
ev_agent = builder.compile()
```

---

## Patrón 5: AI Dealership Assistant (Odoo DMS + Claude MCP)

**Objetivo**: Asistente AI para concesionario automotriz sobre Odoo — consultas de inventario, órdenes de servicio, CRM.

**Stack**:
- `odoo/odoo` (LGPL-3.0) — DMS base
- MCP server sobre Odoo XML-RPC API
- `anthropic/anthropic-sdk-python` — Claude
- `langfuse/langfuse` (MIT) — observabilidad

**Tiempo**: 4-6 semanas | **Costo estimado**: $150k-450k

```python
# dealership_assistant.py
import xmlrpc.client
from anthropic import Anthropic
from mcp.server import FastMCP

client_ai = Anthropic()
mcp = FastMCP("odoo-dealership")

# Odoo connection
ODOO_URL = "http://odoo:8069"
DB = "dealership_db"
USER = "admin"
PASSWORD = "odoo_password"

common = xmlrpc.client.ServerProxy(f"{ODOO_URL}/xmlrpc/2/common")
uid = common.authenticate(DB, USER, PASSWORD, {})
models = xmlrpc.client.ServerProxy(f"{ODOO_URL}/xmlrpc/2/object")

@mcp.tool()
def search_vehicle_inventory(brand: str = "", max_price: float = 0) -> list:
    """Busca vehículos en inventario del concesionario."""
    domain = [["state", "=", "available"]]
    if brand:
        domain.append(["product_id.name", "ilike", brand])
    if max_price > 0:
        domain.append(["price", "<=", max_price])
    
    return models.execute_kw(DB, uid, PASSWORD, "stock.lot", "search_read",
        [domain], {"fields": ["name", "product_id", "price", "color", "km"], "limit": 10})

@mcp.tool()
def create_service_order(vehicle_id: int, symptoms: str, customer_id: int) -> dict:
    """Crea orden de servicio en Odoo para vehículo."""
    return models.execute_kw(DB, uid, PASSWORD, "repair.order", "create", [{
        "product_id": vehicle_id,
        "partner_id": customer_id,
        "internal_notes": symptoms,
        "state": "draft"
    }])

@mcp.tool()
def get_customer_vehicles(customer_email: str) -> list:
    """Obtiene historial de vehículos de un cliente."""
    partner_ids = models.execute_kw(DB, uid, PASSWORD, "res.partner", "search",
        [[["email", "=", customer_email]]])
    if not partner_ids:
        return []
    return models.execute_kw(DB, uid, PASSWORD, "repair.order", "search_read",
        [[["partner_id", "in", partner_ids]]],
        {"fields": ["product_id", "date_planned_start", "state", "amount_total"]})

# Claude assistant con herramientas MCP
def dealership_chat(user_message: str) -> str:
    tools = [
        {"name": "search_vehicle_inventory", "description": "Busca vehículos disponibles"},
        {"name": "create_service_order", "description": "Crea orden de servicio"},
        {"name": "get_customer_vehicles", "description": "Historial del cliente"},
    ]
    response = client_ai.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        system="Eres el asistente del concesionario. Ayudas con ventas, servicio y CRM. Siempre amable.",
        messages=[{"role": "user", "content": user_message}],
        tools=tools
    )
    return response.content[0].text
```

---

## Patrón 6: In-Vehicle LLM Cockpit Assistant (Edge + Claude API)

**Objetivo**: Asistente de cockpit inteligente que corre parcialmente on-device, consulta Claude para reasoning complejo.

**Stack**:
- NVIDIA TensorRT Edge-LLM (edge inference)
- `anthropic/anthropic-sdk-python` (cloud reasoning)
- CAN bus data via OBD-II bridge
- `whisper.cpp` (MIT) — STT para comandos de voz

**Tiempo**: 8-12 semanas | **Costo estimado**: $400k-1.2M (con hardware)

```python
# cockpit_assistant.py — Architecture híbrida edge+cloud
import asyncio
from anthropic import AsyncAnthropic
import json

client = AsyncAnthropic()

EDGE_THRESHOLD_MS = 200  # Si edge responde en <200ms, usarlo; si no, escalar a Claude

async def edge_intent_classifier(voice_input: str) -> dict:
    """Clasifica intención usando modelo edge (TensorRT quantizado 3B params)."""
    # Simulación — en producción usa TensorRT inference
    simple_intents = {
        "temperatura": {"intent": "climate_control", "confidence": 0.95},
        "navegar": {"intent": "navigation", "confidence": 0.92},
        "música": {"intent": "media_control", "confidence": 0.90},
        "llamar": {"intent": "phone_call", "confidence": 0.88},
    }
    for keyword, result in simple_intents.items():
        if keyword in voice_input.lower():
            return result
    return {"intent": "unknown", "confidence": 0.3}

async def vehicle_state_context() -> dict:
    """Contexto del estado actual del vehículo."""
    return {
        "speed_kmh": 65,
        "fuel_level_pct": 45,
        "engine_temp_c": 88,
        "current_destination": "Aeropuerto Internacional",
        "eta_minutes": 23,
        "weather": "lluvia ligera",
        "time_of_day": "noche"
    }

async def cockpit_ai(voice_command: str) -> str:
    """
    Arquitectura híbrida:
    - Intenciones simples → edge model (rápido, sin latencia)
    - Intenciones complejas → Claude cloud (razonamiento profundo)
    """
    # 1. Intent classification en edge
    intent = await edge_intent_classifier(voice_command)
    
    if intent["confidence"] > 0.85 and intent["intent"] != "unknown":
        # Respuesta rápida del edge model
        responses = {
            "climate_control": "Ajustando temperatura a 22°C.",
            "navigation": "Buscando ruta...",
            "media_control": "Reproduciendo playlist.",
            "phone_call": "Iniciando llamada.",
        }
        return responses.get(intent["intent"], "Entendido.")
    
    # 2. Escalar a Claude para intenciones complejas
    vehicle_ctx = await vehicle_state_context()
    response = await client.messages.create(
        model="claude-haiku-4-5",  # Haiku para latencia mínima en cockpit
        max_tokens=150,
        system=f"""Eres el asistente de cockpit del vehículo. Respuestas breves (<2 oraciones).
        Estado actual: {json.dumps(vehicle_ctx)}
        Regla de seguridad: Si el conductor está en movimiento, minimiza distracción.""",
        messages=[{"role": "user", "content": voice_command}]
    )
    return response.content[0].text

# Uso
if __name__ == "__main__":
    response = asyncio.run(cockpit_ai("¿Cuánto tiempo me falta para llegar y hay gasolineras en la ruta?"))
    print(f"Cockpit: {response}")
```

---

## Patrón 7: V2X Cooperative Driving Agent (CARMA + LLM)

**Objetivo**: Agente que procesa mensajes V2X (Vehicle-to-Everything) y planifica respuestas agénticas.

**Stack**:
- `usdot-fhwa-stol/carma-platform` (Apache-2.0) — V2X platform
- `anthropic/anthropic-sdk-python` — reasoning
- DSRC/C-V2X comunicación vehicular
- ROS 2 para integración con stack AV

**Tiempo**: 10-14 semanas | **Costo estimado**: $500k-1.5M

```python
# v2x_agent.py — Procesa mensajes V2X y planifica respuestas
from anthropic import Anthropic
import json

client = Anthropic()

V2X_MESSAGE_TYPES = {
    "BSM": "Basic Safety Message — posición/velocidad de otros vehículos",
    "SPaT": "Signal Phase and Timing — estado de semáforos",
    "MAP": "Map Data — geometría de intersección",
    "TIM": "Traveler Information Message — advertencias de ruta",
    "EVA": "Emergency Vehicle Alert — vehículo de emergencia"
}

def process_v2x_messages(messages: list) -> dict:
    """Procesa mensajes V2X del ambiente."""
    processed = {"vehicles": [], "signals": [], "alerts": []}
    for msg in messages:
        msg_type = msg.get("type")
        if msg_type == "BSM":
            processed["vehicles"].append({
                "id": msg["vehicleId"],
                "speed": msg["speed"],
                "heading": msg["heading"],
                "distance_m": msg["distance"]
            })
        elif msg_type == "SPaT":
            processed["signals"].append({
                "intersection": msg["intersectionId"],
                "phase": msg["phase"],  # "green", "yellow", "red"
                "time_remaining_s": msg["timeToChange"]
            })
        elif msg_type == "EVA":
            processed["alerts"].append({
                "type": "emergency",
                "vehicle_type": msg["vehicleType"],
                "heading": msg["heading"]
            })
    return processed

def cooperative_driving_agent(ego_state: dict, v2x_context: dict) -> dict:
    """Claude planifica respuesta cooperativa basada en contexto V2X."""
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=512,
        system="""Eres un planificador de conducción cooperativa. Analizas mensajes V2X y
        el estado del ego-vehículo para recomendar acciones de conducción seguras.
        Responde en JSON: {"action": str, "target_speed_kmh": float, "reasoning": str}""",
        messages=[{
            "role": "user",
            "content": f"Estado ego: {json.dumps(ego_state)}\nContexto V2X: {json.dumps(v2x_context)}"
        }]
    )
    return json.loads(response.content[0].text)
```

---

## Patrón 8: LATAM EV Fleet Intelligence (Fleetbase + Claude + BYD)

**Objetivo**: Plataforma de inteligencia de flota EV para operadores LATAM con BYD/EVs chinos.

**Stack**:
- `fleetbase/fleetbase` (AGPL-3.0) — OS de logística base
- `traccar/traccar` (Apache-2.0) — telemetría GPS + OBD
- `anthropic/anthropic-sdk-python` — Claude análisis
- PostgreSQL + TimescaleDB — series temporales de telemetría EV

**Tiempo**: 6-8 semanas | **Costo estimado**: $200k-600k

```python
# latam_ev_fleet.py — Inteligencia de flota EV para LATAM
from anthropic import Anthropic
import httpx
from datetime import datetime, timedelta

client = Anthropic()
FLEETBASE_URL = "http://fleetbase:8000/api/v1"

class EVFleetIntelligence:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.headers = {"Authorization": f"Bearer {api_key}"}
    
    def get_ev_metrics(self, vehicle_id: str) -> dict:
        """Obtiene métricas específicas de EV del vehículo."""
        with httpx.Client() as http:
            # Telemetría básica de Fleetbase
            r = http.get(
                f"{FLEETBASE_URL}/vehicles/{vehicle_id}/telemetry",
                headers=self.headers
            )
            telemetry = r.json()
        
        # Métricas EV (via OBD-II para BYD/Chery/SAIC)
        return {
            "vehicle_id": vehicle_id,
            "soc_percent": telemetry.get("battery_soc", 0),
            "range_km": telemetry.get("estimated_range", 0),
            "charging_status": telemetry.get("charging_status", "idle"),
            "battery_temp_c": telemetry.get("battery_temp", 25),
            "total_energy_kwh": telemetry.get("odometer_kwh", 0),
            "location": telemetry.get("coordinates"),
            "speed_kmh": telemetry.get("speed", 0)
        }
    
    def fleet_health_report(self, fleet_id: str) -> str:
        """Genera reporte de salud de flota EV con Claude."""
        with httpx.Client() as http:
            vehicles = http.get(
                f"{FLEETBASE_URL}/fleets/{fleet_id}/vehicles",
                headers=self.headers
            ).json()
        
        ev_metrics = [self.get_ev_metrics(v["id"]) for v in vehicles[:20]]
        
        # Análisis crítico: vehículos con SoC bajo
        low_soc = [m for m in ev_metrics if m["soc_percent"] < 20]
        high_temp = [m for m in ev_metrics if m["battery_temp_c"] > 40]
        
        response = client.messages.create(
            model="claude-sonnet-5",
            max_tokens=2048,
            system="""Eres el analista de flotas EV para operadores en LATAM. 
            Consideras el clima (calor extremo en Brasil/México), infraestructura de carga
            limitada, y necesidades de flotas comerciales. Responde en español.""",
            messages=[{
                "role": "user",
                "content": f"""
Flota EV — Reporte {datetime.now().strftime('%Y-%m-%d %H:%M')}
Total vehículos: {len(ev_metrics)}
SoC bajo (<20%): {len(low_soc)} vehículos
Temperatura batería alta: {len(high_temp)} vehículos
Métricas: {ev_metrics[:5]}

Genera reporte ejecutivo con:
1. Estado general de la flota (semáforo: verde/amarillo/rojo)
2. Vehículos que necesitan carga urgente
3. Alertas de salud de batería
4. Recomendaciones operativas para hoy
5. Proyección de costos operativos vs combustible
"""
            }]
        )
        return response.content[0].text

# Uso
fleet = EVFleetIntelligence(api_key="your_fleetbase_key")
report = fleet.fleet_health_report("byd_fleet_sao_paulo")
print(report)
```

---

## Patrón 9: OpenDriveVLA Evaluation Pipeline (VLA + CARLA + Claude)

**Objetivo**: Pipeline para evaluar y comparar modelos VLA (OpenDriveVLA, Alpamayo-1) en CARLA Leaderboard 2.1 con análisis agéntico de resultados.

**Stack**:
- `DriveVLA/OpenDriveVLA` (Apache-2.0) — modelo VLA a evaluar
- `carla-simulator/carla` (MIT) — simulador
- `carla-simulator/leaderboard` (MIT) — benchmark CARLA Leaderboard 2.1
- `anthropic/anthropic-sdk-python` — análisis de resultados y diagnóstico

**Tiempo**: 4-6 semanas | **Costo estimado**: $100k-350k (+ GPU compute para inferencia VLA)

```python
# vla_eval_pipeline.py — Evaluación de VLA models en CARLA con análisis Claude
import subprocess
import json
from pathlib import Path
from anthropic import Anthropic

client = Anthropic()

class VLAEvaluationPipeline:
    """
    Pipeline para evaluar OpenDriveVLA u otro VLA en CARLA Leaderboard 2.1
    y generar análisis agéntico de resultados con Claude.
    """
    def __init__(self, model_name: str, carla_port: int = 2000):
        self.model_name = model_name
        self.carla_port = carla_port
        self.results_dir = Path(f"results/{model_name}")
        self.results_dir.mkdir(parents=True, exist_ok=True)
    
    def run_leaderboard_route(self, route_file: str, scenario_file: str) -> dict:
        """
        Ejecuta una ruta de evaluación del CARLA Leaderboard 2.1.
        En producción: usa leaderboard_evaluator.py del repo oficial.
        """
        cmd = [
            "python", "leaderboard/leaderboard_evaluator.py",
            "--routes", route_file,
            "--scenarios", scenario_file,
            "--agent", f"agents/{self.model_name}_agent.py",
            "--checkpoint", f"checkpoints/{self.model_name}.pth",
            "--port", str(self.carla_port),
            "--trafficManagerPort", str(self.carla_port + 6000),
        ]
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=3600)
        
        # Parsear resultados del JSON de salida del leaderboard
        results_file = self.results_dir / "results.json"
        if results_file.exists():
            with open(results_file) as f:
                return json.load(f)
        return {"error": result.stderr, "stdout": result.stdout}
    
    def parse_leaderboard_metrics(self, raw_results: dict) -> dict:
        """Extrae métricas clave del formato CARLA Leaderboard 2.1."""
        records = raw_results.get("_checkpoint", {}).get("records", [])
        
        metrics = {
            "driving_score": 0.0,
            "route_completion": 0.0,
            "infraction_penalty": 1.0,
            "collisions_layout": 0,
            "collisions_pedestrian": 0,
            "collisions_vehicle": 0,
            "red_light_violations": 0,
            "stop_sign_violations": 0,
            "route_dev_count": 0,
            "agent_blocked_count": 0,
            "num_routes": len(records),
        }
        
        if not records:
            return metrics
        
        for record in records:
            metrics["route_completion"] += record.get("scores", {}).get("score_route", 0)
            infractions = record.get("infractions", {})
            metrics["collisions_layout"] += len(infractions.get("collisions_layout", []))
            metrics["collisions_pedestrian"] += len(infractions.get("collisions_pedestrian", []))
            metrics["collisions_vehicle"] += len(infractions.get("collisions_vehicle", []))
            metrics["red_light_violations"] += len(infractions.get("red_light", []))
        
        n = len(records)
        metrics["route_completion"] /= n
        metrics["driving_score"] = (
            metrics["route_completion"] *
            (0.65 ** (metrics["collisions_pedestrian"] / n)) *
            (0.65 ** (metrics["red_light_violations"] / n))
        )
        return metrics

    def analyze_with_claude(self, metrics: dict, model_card: str = "") -> str:
        """Claude analiza métricas y genera diagnóstico del modelo VLA."""
        response = client.messages.create(
            model="claude-sonnet-5",
            max_tokens=2000,
            system="""Eres un experto en evaluación de modelos de conducción autónoma.
            Analizas métricas del CARLA Leaderboard 2.1 para identificar debilidades y
            oportunidades de mejora en modelos VLA (Vision-Language-Action).
            Estándares de referencia: ISO 26262, UNECE WP.29, EU AI Act Art. 13.""",
            messages=[{
                "role": "user",
                "content": f"""
Modelo evaluado: {self.model_name}
{f"Model card: {model_card}" if model_card else ""}

Métricas CARLA Leaderboard 2.1:
{json.dumps(metrics, indent=2)}

Genera:
1. **Driving Score final** y comparación con SOTA (OpenDriveVLA baseline ~65%, Alpamayo-1 ~82%)
2. **Debilidades críticas** (tipo de infracción más frecuente y causa probable)
3. **Fortalezas** del modelo en este dataset
4. **Recomendaciones de fine-tuning** priorizadas por impacto en seguridad
5. **Conformidad EU AI Act**: ¿La salida chain-of-thought del VLA satisface Art. 13 explicabilidad?
6. **Próximos pasos** para mejora iterativa
"""
            }]
        )
        return response.content[0].text
    
    def compare_models(self, model_results: dict) -> str:
        """Compara múltiples modelos VLA y recomienda el mejor para producción."""
        response = client.messages.create(
            model="claude-sonnet-5",
            max_tokens=1500,
            system="Eres consultor de selección de modelos AV para producción vehicular. Priorizas seguridad, explicabilidad y licencia open source.",
            messages=[{
                "role": "user",
                "content": f"""
Comparación de modelos VLA en CARLA Leaderboard 2.1:
{json.dumps(model_results, indent=2)}

Recomienda:
1. Modelo ganador para producción (safety-first)
2. Tabla comparativa con score, licencia, inferencia ms, EU AI Act readiness
3. Modelo para MVP rápido vs producción de largo plazo
4. Integración con Autoware/openpilot para el modelo ganador
"""
            }]
        )
        return response.content[0].text

# Uso típico en proyecto Globant
if __name__ == "__main__":
    pipeline = VLAEvaluationPipeline("OpenDriveVLA")
    
    # Ejecutar evaluación en rutas de LATAM (custom: Brasil, México)
    raw_results = pipeline.run_leaderboard_route(
        route_file="routes/latam_urban_routes.xml",
        scenario_file="scenarios/latam_traffic_scenarios.json"
    )
    
    # Parsear métricas
    metrics = pipeline.parse_leaderboard_metrics(raw_results)
    print(f"Driving Score: {metrics['driving_score']:.3f}")
    
    # Análisis con Claude
    diagnosis = pipeline.analyze_with_claude(metrics, model_card="OpenDriveVLA AAAI 2026, TUM, Apache-2.0")
    print(diagnosis)
    
    # Comparar vs Alpamayo-1
    comparison = pipeline.compare_models({
        "OpenDriveVLA": metrics,
        "Alpamayo-1": {"driving_score": 0.82, "route_completion": 0.91, "license": "Apache-2.0", "latency_ms": 45},
        "LEAD (CVPR 2026)": {"driving_score": 0.78, "route_completion": 0.88, "license": "MIT", "latency_ms": 38},
    })
    print(comparison)
```

---

## Matriz de selección de patrón

| Caso de uso | Patrón | Complejidad | Tiempo | Deal size LATAM |
|-------------|---------|-------------|--------|-----------------|
| Gestión de flota GPS | P1: Fleet Intelligence | Baja | 3-4w | $80k-250k |
| Taller + diagnóstico | P2: Predictive Maintenance | Media | 4-6w | $150k-400k |
| Testing AV | P3: AV Testing Pipeline | Alta | 6-8w | $250k-700k |
| EV route planning | P4: EV Route Optimizer | Baja-Media | 3-5w | $100k-300k |
| Concesionario BYD | P5: Dealership Assistant | Media | 4-6w | $150k-450k |
| Cockpit inteligente | P6: Cockpit Assistant | Muy Alta | 8-12w | $400k-1.2M |
| V2X cooperativo | P7: V2X Agent | Muy Alta | 10-14w | $500k-1.5M |
| Flota EV LATAM | P8: EV Fleet Intelligence | Media | 6-8w | $200k-600k |
| Evaluación VLA / AV | P9: OpenDriveVLA Eval Pipeline | Alta | 4-6w | $100k-350k |
