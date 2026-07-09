# 🧩 Patrones de composición — Energy AI

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-09

## Arquitectura base

```
[Plataforma vertical open source (MyEMS / OpenEMS / VOLTTRON)]
          ↓
[Capa de integración (FastAPI bridge / MQTT / REST)]
          ↓
[Agentes especializados (RL / LLM / ML forecasting)]
          ↓
[UI conversacional / Dashboard / API para el cliente]
```

---

## Patrón 1 — EMS Inteligente con LLM (MyEMS + Claude)

**Caso de uso**: Operador de edificio o planta industrial que quiere gestionar consumo energético en lenguaje natural y recibir alertas proactivas.

**Stack**:
- [MyEMS](https://github.com/MyEMS/myems) — EMS base (MIT) con API REST + MQTT
- [anthropic-sdk-python](https://github.com/anthropic/anthropic-sdk-python) — Claude Haiku para NL interface
- Prophet / LightGBM — forecasting de consumo
- Redis — cache de series temporales

**Arquitectura**:
```python
# FastAPI bridge sobre MyEMS
from anthropic import Anthropic
import requests

client = Anthropic()

tools = [
    {"name": "get_energy_consumption", "description": "Get real-time and historical energy data",
     "input_schema": {"type": "object", "properties": {
         "meter_id": {"type": "string"},
         "period": {"type": "string", "enum": ["1h", "24h", "7d", "30d"]}
     }}},
    {"name": "get_carbon_emissions", "description": "Get carbon emissions report",
     "input_schema": {"type": "object", "properties": {
         "facility_id": {"type": "string"},
         "scope": {"type": "string", "enum": ["scope1", "scope2", "scope3"]}
     }}},
    {"name": "set_demand_limit", "description": "Set maximum demand limit for a meter",
     "input_schema": {"type": "object", "properties": {
         "meter_id": {"type": "string"},
         "limit_kw": {"type": "number"}
     }}}
]

def energy_agent(user_query: str, facility_context: dict) -> str:
    messages = [{"role": "user", "content": user_query}]
    system = f"You are an energy management AI for {facility_context['name']}. Current consumption: {facility_context['current_kw']} kW. Carbon intensity: {facility_context['carbon_intensity']} gCO2/kWh."
    
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1024,
        system=system,
        tools=tools,
        messages=messages
    )
    # Handle tool calls → MyEMS REST API
    return response
```

**Tiempo estimado**: 3-5 semanas | **Deal size**: $60k-$180k

---

## Patrón 2 — Agente RL para Control de Red Eléctrica (Grid2Op + SB3)

**Caso de uso**: Utility o TSO que quiere automatizar decisiones de topología de red para evitar congestiones y maximizar estabilidad.

**Stack**:
- [Grid2op/grid2op](https://github.com/Grid2op/grid2op) — simulador de red (LGPL-2.1)
- [DLR-RM/stable-baselines3](https://github.com/DLR-RM/stable-baselines3) v2.9.0 — PPO/SAC (MIT)
- [emarche/RL2Grid](https://github.com/emarche/RL2Grid) — benchmark y baselines (MIT)
- [PyPSA/PyPSA](https://github.com/PyPSA/PyPSA) — validación con AC power flow (MIT)

**Arquitectura**:
```python
import grid2op
from stable_baselines3 import PPO
from lightsim2grid import LightSimBackend  # fast AC power flow

# 1. Crear ambiente
env = grid2op.make("l2rpn_wcci_2022", backend=LightSimBackend())

# 2. Definir observación y acción
obs_space_size = env.observation_space.size()
act_space_size = env.action_space.n  # topology actions

# 3. Entrenar agente PPO
model = PPO(
    "MlpPolicy", 
    env,
    learning_rate=3e-4,
    n_steps=2048,
    batch_size=64,
    n_epochs=10,
    verbose=1
)
model.learn(total_timesteps=1_000_000)
model.save("grid_rl_agent_v1")

# 4. Evaluar con RL2Grid benchmark
from rl2grid.evaluation import benchmark_agent
results = benchmark_agent(model, env, n_episodes=100)
print(f"Mean survival time: {results['mean_survival']:.1f} steps")
```

**Tiempo estimado**: 8-16 semanas | **Deal size**: $200k-$800k

---

## Patrón 3 — Carbon-Aware Workload Scheduler (Carbon Aware SDK + LangGraph)

**Caso de uso**: Empresa tech que quiere ejecutar batches de AI/ML en los momentos de menor intensidad carbónica de la red eléctrica.

**Stack**:
- [Green-Software-Foundation/carbon-aware-sdk](https://github.com/Green-Software-Foundation/carbon-aware-sdk) — MIT, WebAPI
- [WattTime API](https://watttime.org) — datos de emisiones marginales en tiempo real
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — orquestación de agentes
- Claude Haiku — generación de reportes de huella de carbono

**Arquitectura**:
```python
import httpx
from langgraph.graph import StateGraph
from anthropic import Anthropic
from datetime import datetime, timedelta

CARBON_SDK_URL = "http://localhost:5000"  # Carbon Aware SDK local

async def get_optimal_window(location: str, duration_minutes: int) -> dict:
    """Get lowest carbon intensity window in next 24h"""
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{CARBON_SDK_URL}/emissions/forecasts/best",
            params={
                "location": location,
                "requestedAt": datetime.utcnow().isoformat(),
                "windowSize": duration_minutes,
                "duration": "24"
            }
        )
        return response.json()

def carbon_aware_scheduler_node(state: dict) -> dict:
    """LangGraph node: decide when to run workload"""
    window = await get_optimal_window(state["location"], state["duration_minutes"])
    state["optimal_start"] = window["optimalDataPoints"][0]["timestamp"]
    state["expected_carbon_gco2"] = window["optimalDataPoints"][0]["rating"]
    return state

def carbon_report_node(state: dict) -> dict:
    """LangGraph node: generate carbon report with Claude"""
    client = Anthropic()
    report = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=500,
        messages=[{"role": "user", "content": 
            f"Generate a concise carbon report for a workload scheduled at {state['optimal_start']} "
            f"with {state['expected_carbon_gco2']} gCO2/kWh intensity vs current {state['current_intensity']} gCO2/kWh. "
            f"Include carbon savings estimate for a {state['duration_minutes']}-minute, {state['compute_kw']} kW workload."
        }]
    )
    state["carbon_report"] = report.content[0].text
    return state

# Build graph
builder = StateGraph(dict)
builder.add_node("schedule", carbon_aware_scheduler_node)
builder.add_node("report", carbon_report_node)
builder.add_edge("schedule", "report")
graph = builder.compile()
```

**Tiempo estimado**: 2-4 semanas | **Deal size**: $40k-$100k

---

## Patrón 4 — Predictive Maintenance Agent para Activos Energéticos

**Caso de uso**: Planta industrial o utility que quiere detectar anomalías en turbinas, transformadores o líneas de transmisión y generar work orders automáticos.

**Stack**:
- [emoncms/emoncms](https://github.com/emoncms/emoncms) — monitoreo en tiempo real (AGPL-3.0)
- scikit-learn (Isolation Forest) o PyTorch (LSTM Autoencoder) — anomaly detection
- [anthropic-sdk-python](https://github.com/anthropic/anthropic-sdk-python) — Claude para NL work orders
- MQTT + InfluxDB — time series pipeline

**Arquitectura**:
```python
import numpy as np
from sklearn.ensemble import IsolationForest
from anthropic import Anthropic

class EnergyAssetMaintenanceAgent:
    def __init__(self, asset_id: str, asset_type: str):
        self.asset_id = asset_id
        self.asset_type = asset_type
        self.anomaly_detector = IsolationForest(contamination=0.05, random_state=42)
        self.client = Anthropic()
        self.trained = False
    
    def train(self, historical_data: np.ndarray):
        """Train on 90 days of normal operation data"""
        self.anomaly_detector.fit(historical_data)
        self.trained = True
        self.feature_baseline = {
            "mean": historical_data.mean(axis=0),
            "std": historical_data.std(axis=0)
        }
    
    def detect_anomaly(self, current_reading: np.ndarray) -> dict:
        """Returns anomaly score and severity"""
        score = self.anomaly_detector.score_samples(current_reading.reshape(1, -1))[0]
        is_anomaly = score < -0.5
        severity = "critical" if score < -0.8 else "warning" if score < -0.5 else "normal"
        return {"is_anomaly": is_anomaly, "score": float(score), "severity": severity}
    
    def generate_work_order(self, anomaly: dict, sensor_data: dict) -> str:
        """Generate NL work order using Claude"""
        response = self.client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=600,
            messages=[{"role": "user", "content": 
                f"Asset: {self.asset_type} (ID: {self.asset_id})\n"
                f"Anomaly severity: {anomaly['severity']} (score: {anomaly['score']:.3f})\n"
                f"Sensor readings: {sensor_data}\n"
                f"Baseline: {self.feature_baseline}\n\n"
                f"Generate a maintenance work order in Spanish with: "
                f"1) diagnosis, 2) recommended action, 3) priority (1-5), 4) estimated repair time."
            }]
        )
        return response.content[0].text

agent = EnergyAssetMaintenanceAgent("TR-001", "Power Transformer 110kV")
# → Integrar con emoncms MQTT → detect → work order → CMMS API
```

**Tiempo estimado**: 4-6 semanas | **Deal size**: $80k-$250k

---

## Patrón 5 — VPP Orchestrator con Multi-Agent (OpenEMS + PyPSA + LangGraph)

**Caso de uso**: Utility que agrega DERs (solar rooftop + BESS residenciales + EV fleet) en una Virtual Power Plant para participar en mercado de flexibilidad.

**Stack**:
- [OpenEMS/openems](https://github.com/OpenEMS/openems) — control de activos DER en el edge (AGPL)
- [PyPSA/PyPSA](https://github.com/PyPSA/PyPSA) — optimización de despacho (MIT)
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — orquestación multi-agente
- Claude Sonnet — razonamiento de mercado y estrategia de oferta

**Arquitectura conceptual**:
```
VPP Orchestrator (LangGraph)
├── Asset Monitor Agent (OpenEMS REST API)
│   ├── Solar PV state (generation, forecast)
│   ├── BESS state (SOC, charge/discharge rates)
│   └── EV fleet state (connected, SOC, departure times)
├── Grid Signal Agent (ENTSO-E / local TSO API)
│   ├── Day-ahead prices
│   ├── Frequency regulation signals
│   └── Carbon intensity (WattTime/Electricity Maps)
├── Optimization Agent (PyPSA LP solver)
│   └── Optimal dispatch schedule (MILP)
└── Market Bidding Agent (Claude Sonnet)
    └── Generate optimal bid strategy in natural language + JSON
```

**Tiempo estimado**: 12-20 semanas | **Deal size**: $300k-$1.5M

---

## Patrón 6 — BESS Control con RL (sinergym + Stable-Baselines3 + OpenEMS)

**Caso de uso**: Operador de almacenamiento de energía que quiere optimizar ciclos de carga/descarga de baterías para maximizar arbitraje y duración de vida.

**Stack**:
- [ugr-sail/sinergym](https://github.com/ugr-sail/sinergym) — ambiente RL para edificios con BESS (MIT)
- [DLR-RM/stable-baselines3](https://github.com/DLR-RM/stable-baselines3) — SAC (mejor para continuous control) (MIT)
- [OpenEMS/openems](https://github.com/OpenEMS/openems) — control real del BESS en edge

```python
import sinergym
import gymnasium as gym
from stable_baselines3 import SAC

# 1. Ambiente sinergym con BESS
env = gym.make(
    "Eplus-datacenter-hot-continuous-stochastic-v1",
    config_params={
        "battery_capacity_kwh": 500,
        "max_charge_rate_kw": 250,
        "max_discharge_rate_kw": 250,
        "round_trip_efficiency": 0.92,
    }
)

# 2. Entrenar SAC (ideal para control continuo)
model = SAC(
    "MlpPolicy",
    env,
    learning_rate=3e-4,
    buffer_size=1_000_000,
    batch_size=256,
    tau=0.005,
    gamma=0.99,
    verbose=1
)
model.learn(total_timesteps=500_000)

# 3. Deploy: OpenEMS REST API para BESS real
# model.predict(observation) → charge_rate (kW) → POST /openems/battery/setpoint
```

**Tiempo estimado**: 6-10 semanas | **Deal size**: $100k-$350k

---

## Resumen de patrones

| Patrón | Stack principal | Tiempo | Deal size | Complejidad |
|--------|----------------|--------|-----------|-------------|
| P1 — EMS + LLM (MyEMS + Claude) | MyEMS + Anthropic SDK | 3-5 sem | $60k-$180k | ⭐⭐ |
| P2 — Grid RL (Grid2Op + SB3) | Grid2Op + SB3 + PyPSA | 8-16 sem | $200k-$800k | ⭐⭐⭐⭐ |
| P3 — Carbon-Aware Scheduler | Carbon SDK + LangGraph | 2-4 sem | $40k-$100k | ⭐⭐ |
| P4 — Predictive Maintenance | emoncms + IsolationForest + Claude | 4-6 sem | $80k-$250k | ⭐⭐⭐ |
| P5 — VPP Orchestrator | OpenEMS + PyPSA + LangGraph + Claude | 12-20 sem | $300k-$1.5M | ⭐⭐⭐⭐⭐ |
| P6 — BESS RL Control | sinergym + SAC + OpenEMS | 6-10 sem | $100k-$350k | ⭐⭐⭐⭐ |
