# Patrones de composición — Automotive AI

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-14 (v12)

---

## P1 — Fleet Intelligence Agent con WhatsApp (LATAM MVP)

**Problema**: flotas en LATAM tienen despacho manual, alertas de mantenimiento tardías, conductores no conectados a sistemas digitales.
**Solución**: agente de flota que notifica conductores y dispatch vía WhatsApp, con alertas predictivas de mantenimiento.

**Stack**:
- `navariltd/Fleet-Management-System` (Apache-2.0, Frappe/ERPNext) — datos de flota
- `LangGraph` — orquestación del agente de alertas
- `Twilio WhatsApp API` — canal de comunicación
- `openpilot` telematics (opcional, para datos de conducción real)

```python
# P1: Fleet WhatsApp Alert Agent
from langgraph.graph import StateGraph, MessagesState
from langchain_anthropic import ChatAnthropic
from typing import TypedDict
import requests

class FleetState(TypedDict):
    vehicle_id: str
    odometer: float
    last_service_km: float
    fault_codes: list[str]
    driver_phone: str
    alert_sent: bool

def check_maintenance_needed(state: FleetState) -> FleetState:
    km_since_service = state["odometer"] - state["last_service_km"]
    if km_since_service > 9500 or state["fault_codes"]:
        state["needs_alert"] = True
    return state

def generate_alert_message(state: FleetState) -> FleetState:
    llm = ChatAnthropic(model="claude-haiku-4-5-20251001")
    prompt = f"""
    Vehículo {state['vehicle_id']}:
    - Km desde último servicio: {state['odometer'] - state['last_service_km']:.0f}
    - Códigos de falla: {state['fault_codes']}
    
    Genera un mensaje WhatsApp amigable en español para el conductor
    indicando que debe llevar el vehículo a servicio. Máximo 3 líneas.
    """
    response = llm.invoke(prompt)
    state["alert_message"] = response.content
    return state

def send_whatsapp_alert(state: FleetState) -> FleetState:
    payload = {
        "From": "whatsapp:+14155238886",
        "To": f"whatsapp:{state['driver_phone']}",
        "Body": state["alert_message"]
    }
    requests.post("https://api.twilio.com/2010-04-01/Accounts/{SID}/Messages.json",
                  data=payload, auth=(TWILIO_SID, TWILIO_TOKEN))
    state["alert_sent"] = True
    return state

graph = StateGraph(FleetState)
graph.add_node("check", check_maintenance_needed)
graph.add_node("generate", generate_alert_message)
graph.add_node("send", send_whatsapp_alert)
graph.add_conditional_edges("check", lambda s: "generate" if s.get("needs_alert") else "end")
graph.add_edge("generate", "send")
graph.set_entry_point("check")
fleet_agent = graph.compile()
```

**Tiempo de construcción**: 2-3 semanas. **ROI**: reducción 30-40% mantenimientos correctivos.

---

## P2 — VLA Evaluation Pipeline (OpenDriveVLA + CARLA + PCLA)

**Problema**: cliente OEM quiere evaluar y comparar modelos VLA para su stack de AD.
**Solución**: pipeline automatizado de evaluación en CARLA con métricas estándar.

**Stack**:
- `carla-simulator/carla` (MIT) — simulación E2E
- `DriveVLA/OpenDriveVLA` (Apache-2.0) — modelo base VLA a evaluar
- `MasoudJTehrani/PCLA` (Apache-2.0) — testing harness para agentes en CARLA
- `LangGraph` — orquestación del pipeline de eval

```python
# P2: VLA Evaluation Pipeline
import subprocess
import json
from langgraph.graph import StateGraph
from langchain_anthropic import ChatAnthropic
from typing import TypedDict

class EvalState(TypedDict):
    model_name: str
    carla_config: dict
    scenarios: list[str]
    metrics: dict
    report: str

def run_carla_evaluation(state: EvalState) -> EvalState:
    results = {}
    for scenario in state["scenarios"]:
        proc = subprocess.run(
            ["python", "pcla/evaluate.py",
             "--model", state["model_name"],
             "--scenario", scenario,
             "--config", json.dumps(state["carla_config"])],
            capture_output=True, text=True, timeout=300
        )
        scenario_metrics = json.loads(proc.stdout)
        results[scenario] = scenario_metrics
    
    state["metrics"] = {
        "avg_l2_error": sum(r["l2_error"] for r in results.values()) / len(results),
        "collision_rate": sum(r["collisions"] for r in results.values()) / len(results),
        "route_completion": sum(r["completion"] for r in results.values()) / len(results),
        "per_scenario": results
    }
    return state

def generate_eval_report(state: EvalState) -> EvalState:
    llm = ChatAnthropic(model="claude-sonnet-5")
    prompt = f"""
    Analiza los resultados de evaluación del modelo VLA {state['model_name']}:
    {json.dumps(state['metrics'], indent=2)}
    
    Genera un reporte ejecutivo en español (máx 500 palabras) con:
    1. Performance summary vs benchmarks estándar (OpenDriveVLA L2=0.33m, PDMS NAVSIM=91.3)
    2. Escenarios donde el modelo falla (long-tail)
    3. Recomendaciones de fine-tuning
    4. ¿Apto para producción? (sí/no con condiciones)
    """
    state["report"] = llm.invoke(prompt).content
    return state

graph = StateGraph(EvalState)
graph.add_node("eval", run_carla_evaluation)
graph.add_node("report", generate_eval_report)
graph.add_edge("eval", "report")
graph.set_entry_point("eval")
eval_pipeline = graph.compile()
```

**Tiempo de construcción**: 3-4 semanas. **Valor**: benchmark reproducible para selección de modelo VLA.

---

## P3 — Intelligent Cockpit Agent (Eclipse Kuksa + LLM + VAL safety)

**Problema**: OEM quiere implementar un asistente cognitivo en cabina que ejecute tareas reales con seguridad.
**Solución**: arquitectura cloud-edge con Eclipse Kuksa como data layer y LLM en nube.

**Stack**:
- `eclipse-kuksa/kuksa-databroker` (Apache-2.0) — Vehicle Signal Specification
- `SuperdeMan/cockpit-agent` (MIT) — arquitectura multi-agent de referencia
- `LangGraph` — orquestación de agentes
- Claude Haiku 4.5 on-edge, Claude Sonnet 5 cloud

```python
# P3: Cockpit Multi-Agent with VAL Safety
from langgraph.graph import StateGraph
from langchain_anthropic import ChatAnthropic
from dataclasses import dataclass
from enum import Enum

class SafetyLevel(Enum):
    SAFE = "safe"
    REQUIRES_CONFIRMATION = "confirmation"
    BLOCKED = "blocked"

@dataclass
class CockpitState:
    user_intent: str
    vehicle_speed_kmh: float
    vehicle_signals: dict
    action_plan: str
    safety_check: SafetyLevel
    response: str

def classify_intent(state: CockpitState) -> CockpitState:
    edge_llm = ChatAnthropic(model="claude-haiku-4-5-20251001")
    response = edge_llm.invoke(
        f"Classify intent: '{state.user_intent}'\n"
        "Categories: navigation|climate|call|music|vehicle_control|info|other\n"
        "Output JSON: {\"intent\": \"...\", \"requires_action\": true/false}"
    )
    import json
    parsed = json.loads(response.content)
    state.action_plan = parsed["intent"]
    return state

def vsl_safety_check(state: CockpitState) -> CockpitState:
    dangerous_while_driving = ["vehicle_control"]
    if (state.vehicle_speed_kmh > 60 and 
        state.action_plan in dangerous_while_driving):
        state.safety_check = SafetyLevel.BLOCKED
    elif state.vehicle_speed_kmh > 30 and state.action_plan == "vehicle_control":
        state.safety_check = SafetyLevel.REQUIRES_CONFIRMATION
    else:
        state.safety_check = SafetyLevel.SAFE
    return state

def execute_action(state: CockpitState) -> CockpitState:
    if state.safety_check == SafetyLevel.BLOCKED:
        state.response = "Por seguridad, esta acción no está disponible mientras conduces."
        return state
    cloud_llm = ChatAnthropic(model="claude-sonnet-5")
    vehicle_context = f"""
    Señales del vehículo:
    - Velocidad: {state.vehicle_speed_kmh} km/h
    - Temperatura exterior: {state.vehicle_signals.get('exterior_temp', 'N/A')}°C
    - Batería: {state.vehicle_signals.get('battery_soc', 'N/A')}%
    """
    response = cloud_llm.invoke(
        f"Eres el asistente de cabina del vehículo.\n"
        f"{vehicle_context}\n"
        f"Solicitud del conductor: {state.user_intent}\n"
        f"Ejecuta la acción y responde en español, máx 2 oraciones."
    )
    state.response = response.content
    return state

graph = StateGraph(CockpitState)
graph.add_node("classify", classify_intent)
graph.add_node("safety", vsl_safety_check)
graph.add_node("execute", execute_action)
graph.add_edge("classify", "safety")
graph.add_edge("safety", "execute")
graph.set_entry_point("classify")
cockpit_agent = graph.compile()
```

**Tiempo de construcción**: 4-6 semanas. **Valor**: cockpit AI con safety layer certificable.

---

## P4 — Predictive Maintenance Agent (OBD2 + LLM + ERPNext)

**Problema**: concesionarios y flotas pierden dinero por mantenimiento reactivo cuando el predictivo es posible con datos OBD2.
**Solución**: agente que lee datos OBD2, detecta anomalías, crea órdenes de trabajo en ERPNext.

```python
# P4: Predictive Maintenance Agent
from langgraph.graph import StateGraph
from langchain_anthropic import ChatAnthropic
import requests
from typing import TypedDict

class MaintenanceState(TypedDict):
    vehicle_vin: str
    obd_data: dict
    diagnosis: str
    work_order_id: str
    notification_sent: bool

def fetch_obd_data(state: MaintenanceState) -> MaintenanceState:
    response = requests.get(f"http://obd-bridge/vehicle/{state['vehicle_vin']}/diagnostics")
    state["obd_data"] = response.json()
    return state

def diagnose_with_llm(state: MaintenanceState) -> MaintenanceState:
    llm = ChatAnthropic(model="claude-haiku-4-5-20251001")
    dtc_codes = state["obd_data"].get("dtc_codes", [])
    sensor_data = state["obd_data"].get("sensors", {})
    prompt = f"""
    Vehículo VIN: {state['vehicle_vin']}
    Códigos DTC activos: {dtc_codes}
    Lecturas de sensores: {sensor_data}
    
    Como técnico automotriz experto:
    1. Diagnóstica la causa probable para cada código DTC
    2. Evalúa urgencia (crítico/moderado/preventivo)
    3. Lista las reparaciones necesarias en orden de prioridad
    4. Estima horas de mano de obra
    
    Responde en JSON con campos: diagnosis, urgency, repairs, labor_hours
    """
    response = llm.invoke(prompt)
    import json
    state["diagnosis"] = json.loads(response.content)
    return state

def create_work_order(state: MaintenanceState) -> MaintenanceState:
    diagnosis = state["diagnosis"]
    work_order_data = {
        "doctype": "Maintenance Schedule",
        "vehicle": state["vehicle_vin"],
        "status": "Open",
        "priority": diagnosis["urgency"],
        "description": diagnosis["diagnosis"],
        "items": [{"activity_type": r, "hours": diagnosis["labor_hours"] / len(diagnosis["repairs"])} 
                  for r in diagnosis["repairs"]]
    }
    response = requests.post(
        f"{ERPNEXT_BASE}/api/resource/Maintenance Schedule",
        json=work_order_data,
        headers={"Authorization": f"token {ERPNEXT_API_KEY}:{ERPNEXT_API_SECRET}"}
    )
    state["work_order_id"] = response.json()["data"]["name"]
    return state

graph = StateGraph(MaintenanceState)
graph.add_node("fetch", fetch_obd_data)
graph.add_node("diagnose", diagnose_with_llm)
graph.add_node("order", create_work_order)
graph.add_edge("fetch", "diagnose")
graph.add_edge("diagnose", "order")
graph.set_entry_point("fetch")
maintenance_agent = graph.compile()
```

**Tiempo de construcción**: 3-4 semanas. **ROI**: reducción 25-35% tiempo de diagnóstico.

---

## P5 — EU AI Act Compliance Layer para VLA (Alpamayo + Audit)

**Problema**: clientes europeos necesitan que los sistemas AD sean EU AI Act compliant (high-risk, Art. 9-15).
**Solución**: wrapper de compliance sobre VLA que genera reasoning traces y audit log.

```python
# P5: EU AI Act Compliance Wrapper for VLA
import json, time, hashlib
from dataclasses import dataclass, field
from typing import Any

@dataclass
class VLADecisionLog:
    timestamp: float
    vehicle_id: str
    scene_description: str
    model_id: str = "alpamayo-1.5"
    reasoning_trace: str = ""
    action_taken: dict = field(default_factory=dict)
    confidence: float = 0.0
    human_override: bool = False
    log_hash: str = ""
    
    def to_audit_record(self) -> dict:
        record = {
            "ts": self.timestamp,
            "vehicle": self.vehicle_id,
            "model": self.model_id,
            "scene": self.scene_description,
            "reasoning": self.reasoning_trace,
            "action": self.action_taken,
            "confidence": self.confidence,
            "human_override": self.human_override
        }
        record_str = json.dumps(record, sort_keys=True)
        self.log_hash = hashlib.sha256(record_str.encode()).hexdigest()
        record["hash"] = self.log_hash
        return record

class EUCompliantVLAWrapper:
    def __init__(self, vla_model, audit_log_path: str, vehicle_id: str):
        self.model = vla_model
        self.audit_path = audit_log_path
        self.vehicle_id = vehicle_id
    
    def decide(self, camera_frames, vehicle_state) -> dict:
        result = self.model.infer(camera_frames, vehicle_state)
        log = VLADecisionLog(
            timestamp=time.time(),
            vehicle_id=self.vehicle_id,
            scene_description=result.get("scene_description", ""),
            reasoning_trace=result.get("reasoning_trace", ""),
            action_taken=result.get("trajectory", {}),
            confidence=result.get("confidence", 0.0)
        )
        with open(self.audit_path, "a") as f:
            f.write(json.dumps(log.to_audit_record()) + "\n")
        return result
    
    def human_override(self, override_action: dict) -> None:
        log = VLADecisionLog(
            timestamp=time.time(),
            vehicle_id=self.vehicle_id,
            scene_description="HUMAN_OVERRIDE",
            action_taken=override_action,
            human_override=True
        )
        with open(self.audit_path, "a") as f:
            f.write(json.dumps(log.to_audit_record()) + "\n")
```

**Tiempo de construcción**: 1-2 semanas. **Valor**: compliance EU AI Act para clientes EU.

---

## P6 — EV Fleet Charging Optimizer (LATAM)

**Problema**: flotas de vehículos eléctricos en LATAM necesitan optimizar rutas de carga para minimizar downtime.

```python
# P6: EV Fleet Charging Optimizer
from langgraph.graph import StateGraph
from langchain_anthropic import ChatAnthropic
import heapq
from typing import TypedDict, List

class EVFleetState(TypedDict):
    vehicles: List[dict]
    charging_stations: List[dict]
    optimization_plan: List[dict]
    total_downtime_mins: float

def optimize_charging_routes(state: EVFleetState) -> EVFleetState:
    plan = []
    occupied_slots = {}
    pq = []
    for v in state["vehicles"]:
        urgency = 100 - v["battery_soc"]
        heapq.heappush(pq, (-urgency, v["id"]))
    while pq:
        _, vehicle_id = heapq.heappop(pq)
        vehicle = next(v for v in state["vehicles"] if v["id"] == vehicle_id)
        if vehicle["battery_soc"] > 20:
            continue
        best_station = min(
            [s for s in state["charging_stations"] 
             if s["available_plugs"] > occupied_slots.get(s["id"], 0)],
            key=lambda s: abs(s["location"]["lat"] - vehicle["location"]["lat"]) +
                         abs(s["location"]["lng"] - vehicle["location"]["lng"])
        )
        occupied_slots[best_station["id"]] = occupied_slots.get(best_station["id"], 0) + 1
        charge_time = (100 - vehicle["battery_soc"]) * 0.8
        plan.append({
            "vehicle_id": vehicle_id,
            "station_id": best_station["id"],
            "estimated_charge_time_mins": charge_time,
            "priority": "URGENT" if vehicle["battery_soc"] < 10 else "NORMAL"
        })
    state["optimization_plan"] = plan
    state["total_downtime_mins"] = sum(p["estimated_charge_time_mins"] for p in plan)
    return state

def generate_dispatch_instructions(state: EVFleetState) -> EVFleetState:
    llm = ChatAnthropic(model="claude-haiku-4-5-20251001")
    prompt = f"""
    Plan de carga de flota EV:
    {state['optimization_plan']}
    Tiempo total de inactividad estimado: {state['total_downtime_mins']:.0f} minutos
    Genera instrucciones de despacho en español para cada vehículo.
    """
    state["dispatch_messages"] = llm.invoke(prompt).content
    return state

graph = StateGraph(EVFleetState)
graph.add_node("optimize", optimize_charging_routes)
graph.add_node("dispatch", generate_dispatch_instructions)
graph.add_edge("optimize", "dispatch")
graph.set_entry_point("optimize")
ev_optimizer = graph.compile()
```

**Aplicación LATAM**: buses eléctricos Bogotá, São Paulo, Santiago.

---

## P7 — SDV OTA AI Update Pipeline (Eclipse SDV + CI/CD)

**Problema**: vehículos SDV necesitan recibir actualizaciones de modelos AI de forma segura y auditada.

```python
# P7: SDV AI Model OTA Pipeline
import hashlib, json, requests
from pathlib import Path

class SDVModelDeployer:
    def __init__(self, kuksa_databroker_url: str, ota_backend_url: str):
        self.kuksa_url = kuksa_databroker_url
        self.ota_url = ota_backend_url
    
    def package_model(self, model_path: str, version: str, metadata: dict) -> dict:
        model_bytes = Path(model_path).read_bytes()
        return {
            "version": version,
            "model_type": metadata["model_type"],
            "target_hardware": metadata["hardware"],
            "sha256": hashlib.sha256(model_bytes).hexdigest(),
            "size_mb": len(model_bytes) / 1024 / 1024,
            "metadata": metadata
        }
    
    def deploy_to_fleet(self, package: dict, vehicle_ids: list, rollout_pct: float = 0.1):
        fleet_size = len(vehicle_ids)
        initial_batch = vehicle_ids[:int(fleet_size * rollout_pct)]
        for vehicle_id in initial_batch:
            self._set_kuksa_signal(vehicle_id, {
                "Vehicle.AI.ModelUpdate.Pending": True,
                "Vehicle.AI.ModelUpdate.Version": package["version"],
                "Vehicle.AI.ModelUpdate.Package": json.dumps(package)
            })
        return initial_batch
    
    def _set_kuksa_signal(self, vehicle_id: str, signals: dict):
        for signal_path, value in signals.items():
            requests.post(f"{self.kuksa_url}/api/v1/signals", json={
                "signal": signal_path,
                "vehicle": vehicle_id,
                "value": value
            })
```

**Tiempo de construcción**: 4-6 semanas. **Valor**: deployment seguro y auditado de AI en flotas SDV.

---

## P8 — AD Simulation Loop: CARLA + OpenDriveVLA + LangGraph Eval

**Problema**: equipo de I+D necesita ciclo continuo train → simulate → evaluate → report para su modelo VLA.

```python
# P8: Continuous AD Simulation Loop
from langgraph.graph import StateGraph
from langchain_anthropic import ChatAnthropic
import subprocess, json
from typing import TypedDict

class SimLoopState(TypedDict):
    model_checkpoint: str
    test_scenarios: list[str]
    carla_metrics: dict
    comparison_baseline: dict
    regression_detected: bool
    report: str
    action: str

BASELINE = {
    "OpenDriveVLA-3B": {"l2_error": 0.33, "collision_rate": 0.05, "completion": 0.94},
    "DriveWorld-VLA": {"pdms_navsim": 91.3, "epdms_navsim": 86.8}
}

def run_simulation(state: SimLoopState) -> SimLoopState:
    result = subprocess.run(
        ["python", "-m", "pcla.evaluate",
         "--model", state["model_checkpoint"],
         "--scenarios", ",".join(state["test_scenarios"]),
         "--output", "json"],
        capture_output=True, text=True, timeout=600
    )
    state["carla_metrics"] = json.loads(result.stdout)
    return state

def detect_regression(state: SimLoopState) -> SimLoopState:
    metrics = state["carla_metrics"]
    baseline = state["comparison_baseline"]
    regressions = []
    if metrics.get("l2_error", 0) > baseline.get("l2_error", 0.33) * 1.1:
        regressions.append(f"L2 error regression: {metrics['l2_error']:.3f}")
    if metrics.get("collision_rate", 0) > baseline.get("collision_rate", 0.05) * 1.2:
        regressions.append(f"Collision rate regression: {metrics['collision_rate']:.3f}")
    state["regression_detected"] = len(regressions) > 0
    state["regression_details"] = regressions
    return state

def generate_report_and_action(state: SimLoopState) -> SimLoopState:
    llm = ChatAnthropic(model="claude-sonnet-5")
    status = "REGRESION DETECTADA" if state["regression_detected"] else "OK"
    prompt = f"""
    Resultado de evaluación VLA en CARLA:
    Checkpoint: {state['model_checkpoint']}
    Status: {status}
    Métricas: {json.dumps(state['carla_metrics'], indent=2)}
    Baseline: {json.dumps(state['comparison_baseline'], indent=2)}
    
    Recomienda acción: "approve" | "flag" | "rollback"
    Output JSON: {{action: "...", summary: "...", next_steps: [...]}}
    """
    response = llm.invoke(prompt)
    parsed = json.loads(response.content)
    state["action"] = parsed["action"]
    state["report"] = json.dumps(parsed, indent=2, ensure_ascii=False)
    return state

graph = StateGraph(SimLoopState)
graph.add_node("simulate", run_simulation)
graph.add_node("detect", detect_regression)
graph.add_node("report", generate_report_and_action)
graph.add_edge("simulate", "detect")
graph.add_edge("detect", "report")
graph.set_entry_point("simulate")
sim_loop = graph.compile()
```

**Tiempo de construcción**: 4-5 semanas. **Valor**: CI/CD para modelos AD con evaluación automática y safety gate.

---

## Resumen de patrones

| Patrón | Tiempo | Stack principal | Quick win LATAM |
|--------|--------|-----------------|------------------|
| P1 Fleet WhatsApp | 2-3w | Fleetbase + LangGraph + Twilio | Sí — directo |
| P2 VLA Evaluation | 3-4w | CARLA + OpenDriveVLA + PCLA | No (R&D) |
| P3 Cockpit Agent | 4-6w | Kuksa + LLM + VAL | OEM LATAM |
| P4 Predictive Maint | 3-4w | OBD2 + ERPNext + LangGraph | Sí — concesionarios |
| P5 EU AI Act Compliance | 1-2w | Alpamayo + Audit log | EU clients |
| P6 EV Fleet Charging | 2-3w | ev-charging-opt + LangGraph | Sí — buses EV |
| P7 SDV OTA Pipeline | 4-6w | Eclipse Kuksa + CI/CD | OEM SDV |
| P8 AD Sim Loop | 4-5w | CARLA + LangGraph + VLA | R&D teams |
