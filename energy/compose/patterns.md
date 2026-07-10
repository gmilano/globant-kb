# 🧩 Patrones de Composición — Energy AI

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Cada patrón incluye los repos exactos, cómo conectarlos y estimación de esfuerzo.
> Última actualización: 2026-07-10

---

## P1 — Grid Intelligence Agent (PowerMCP + Claude + pandapower/PyPSA)

**Problema**: Ingenieros eléctricos pasan semanas en estudios de flujo de potencia y análisis de contingencias que LLMs + simuladores pueden automatizar parcialmente.

**Stack**:
- [Power-Agent/PowerMCP](https://github.com/Power-Agent/PowerMCP) (MIT) — MCP servers para pandapower + PyPSA + OpenDSS
- [Power-Agent/PowerSkills](https://github.com/Power-Agent/PowerSkills) (MIT) — instrucciones especializadas para el agente
- [Power-Agent/PowerWF](https://github.com/Power-Agent/PowerWF) (MIT) — workflows de análisis de potencia
- Claude claude-sonnet-5 o claude-opus-4-8 vía Anthropic API — LLM con razonamiento

**Arquitectura**:
```
Engineer → Claude Agent (PowerSkills loaded)
               ↓ MCP tool calls
          PowerMCP server
         ↙        ↓        ↘
   pandapower   PyPSA    OpenDSS
   (AC power   (renewable  (distribution
    flow)       planning)   networks)
               ↓
         PowerWF orchestrates
         multi-step analysis
               ↓
         PDF Report + Recommendations
```

**Código clave**:
```python
import anthropic
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

# 1. Inicializar servidor PowerMCP
server_params = StdioServerParameters(
    command="python",
    args=["-m", "powermcp.servers.pandapower"]
)

async def run_grid_analysis(network_case_file: str, query: str):
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            
            # 2. Cargar PowerSkills como contexto del sistema
            with open("power_skills/load_flow.md") as f:
                system_prompt = f.read()
            
            # 3. Agente Claude con tools PowerMCP
            client = anthropic.Anthropic()
            tools = await session.list_tools()
            
            response = client.messages.create(
                model="claude-sonnet-5-20261001",
                max_tokens=4096,
                system=system_prompt,
                messages=[{
                    "role": "user", 
                    "content": f"Load case {network_case_file} and {query}"
                }],
                tools=[{
                    "name": t.name,
                    "description": t.description,
                    "input_schema": t.inputSchema
                } for t in tools.tools]
            )
            return response
```

**Estimado**: $80k-$300k | 6-12 semanas | 2-4 ingenieros (1 power systems, 1-2 AI/MCP)

---

## P2 — Load Forecasting Service (OpenSTEF + API + Agent)

**Problema**: Utilities y comercializadoras necesitan forecasts probabilísticos de carga para despacho y trading; los sistemas actuales son propietarios y caros.

**Stack**:
- [OpenSTEF/openstef](https://github.com/OpenSTEF/openstef) (MPL-2.0) — AutoML para forecasting de carga
- FastAPI — servicio REST de forecasting
- Claude como agente de interpretación y alertas
- [unit8co/darts](https://github.com/unit8co/darts) (Apache-2.0) — modelos complementarios

**Arquitectura**:
```
Weather API ──┐
Market prices ──┤→ OpenSTEF Pipeline → Probabilistic Forecast
Historical load ──┘        (P10/P50/P90)
                                ↓
                         FastAPI endpoint
                                ↓
                    Claude Forecast Interpreter
                    (alerts on unusual patterns,
                     explain drivers, recommend actions)
                                ↓
                    Dashboard + Notifications
```

**Código clave**:
```python
from openstef.pipeline.train_model import train_model_and_forecast_pipeline
from openstef.data_classes.prediction_job import PredictionJobDataClass
import anthropic

def create_forecast_pipeline(location_id: str, horizon_hours: int = 48):
    # 1. Configurar trabajo de forecasting
    pj = PredictionJobDataClass(
        id=1,
        model="xgb",
        forecast_type="demand",
        horizon=horizon_hours,
        resolution_minutes=15,
        lat=52.3, lon=4.9,  # Amsterdam ejemplo
        sid=f"loc_{location_id}",
    )
    
    # 2. Ejecutar pipeline AutoML
    forecasts, model, report = train_model_and_forecast_pipeline(
        pj=pj,
        context=context  # datos históricos + clima
    )
    
    return forecasts  # DataFrame con P10/P50/P90

def interpret_forecast(forecasts_df, client: anthropic.Anthropic):
    # 3. Claude analiza el forecast para alertas
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",  # rápido para alertas
        max_tokens=500,
        messages=[{
            "role": "user",
            "content": f"Analiza este forecast de carga y genera alertas si hay patrones inusuales:\n{forecasts_df.to_json()}"
        }]
    )
    return response.content[0].text
```

**Estimado**: $60k-$150k | 4-8 semanas | 2 ingenieros (1 ML/data, 1 backend)

---

## P3 — Building Energy Optimization Agent (sinergym + RL + Claude)

**Problema**: Los sistemas HVAC de edificios comerciales consumen 40-60% de la energía y se controlan con reglas fijas; un agente RL puede reducir 20-40% de consumo.

**Stack**:
- [ugr-sail/sinergym](https://github.com/ugr-sail/sinergym) (MIT) — entorno de simulación
- [IBM/rl-testbed-for-energyplus](https://github.com/IBM/rl-testbed-for-energyplus) (MIT) — baseline RL
- Stable-Baselines3 — PPO/SAC para entrenamiento RL
- Claude claude-haiku-4-5 — explicabilidad y override manual

**Arquitectura**:
```
EnergyPlus Building Model
        ↓
   sinergym Env (Gymnasium)
        ↓
   RL Agent (PPO/SAC)
   trained on historical data
        ↓
   Setpoints: Temp, Ventilation, Lighting
        ↓
   BMS (Building Management System)
        ↑
   Claude Override Interface
   (facility manager asks in natural language)
```

**Código clave**:
```python
import gymnasium as gym
import sinergym
from stable_baselines3 import PPO
import anthropic

# 1. Crear entorno de simulación
env = gym.make(
    "Eplus-5zone-hot-continuous-v1",
    reward=sinergym.utils.rewards.LinearReward(
        temperature_variable=["Zone Air Temperature"],
        energy_variable="Facility Total HVAC Electricity Demand Rate",
        range_comfort_winter=(20.0, 23.5),
        range_comfort_summer=(23.0, 26.0),
        energy_weight=0.5,
        comfort_penalty=-1.0,
    )
)

# 2. Entrenar agente RL (offline con datos históricos simulados)
model = PPO(
    "MlpPolicy", 
    env, 
    verbose=1,
    learning_rate=3e-4,
    n_steps=2048,
    batch_size=64,
)
model.learn(total_timesteps=500_000)
model.save("hvac_agent_v1")

# 3. Interfaz de override con Claude
def handle_facility_manager_request(request: str, current_setpoints: dict):
    client = anthropic.Anthropic()
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=200,
        system="Eres el asistente del sistema de gestión energética del edificio. Puedes ajustar setpoints de temperatura, ventilación e iluminación dentro de rangos de confort (18-26°C).",
        messages=[{
            "role": "user",
            "content": f"Setpoints actuales: {current_setpoints}\nSolicitud: {request}"
        }]
    )
    return response.content[0].text
```

**Estimado**: $100k-$400k | 8-16 semanas | 3 ingenieros (1 RL/ML, 1 BMS integración, 1 AI/UX)

---

## P4 — Predictive Maintenance Agent para Activos de Red

**Problema**: Fallo imprevisto de transformadores, generadores o turbinas cuesta 10-100x más que mantenimiento planificado; las utilities necesitan anticipar fallos con semanas de antelación.

**Stack**:
- [openremote/openremote](https://github.com/openremote/openremote) (AGPL-3.0) — ingestión IoT y telemetría
- scikit-learn + XGBoost — modelos ML de detección de anomalías
- [emoncms/emoncms](https://github.com/emoncms/emoncms) (AGPL-3.0) — historial de consumo (alternativa)
- Claude claude-sonnet-5 — generación de órdenes de trabajo y diagnóstico
- Anthropic API tool use — integración con CMMS (Maximo/SAP PM)

**Arquitectura**:
```
Sensors (vibration, temperature, oil quality, current)
        ↓ MQTT
   openremote (IoT aggregation + rules)
        ↓ REST API
   ML Pipeline (feature engineering + anomaly detection)
        ↓ alert if anomaly score > threshold
   Claude Diagnostic Agent
   - interpreta la anomalía
   - consulta historial de mantenimiento
   - genera orden de trabajo priorizada
        ↓ tool call
   CMMS Integration (Maximo API / SAP PM API)
        ↓
   Work Order Created + Maintenance Team Notified
```

**Código clave**:
```python
import anthropic
import json

TOOLS = [
    {
        "name": "get_asset_history",
        "description": "Obtiene historial de mantenimiento y fallos de un activo",
        "input_schema": {
            "type": "object",
            "properties": {
                "asset_id": {"type": "string"},
                "months_back": {"type": "integer", "default": 12}
            },
            "required": ["asset_id"]
        }
    },
    {
        "name": "create_work_order",
        "description": "Crea orden de trabajo en CMMS con prioridad y descripción",
        "input_schema": {
            "type": "object",
            "properties": {
                "asset_id": {"type": "string"},
                "priority": {"type": "string", "enum": ["critical", "high", "medium", "low"]},
                "description": {"type": "string"},
                "estimated_hours": {"type": "number"},
                "parts_needed": {"type": "array", "items": {"type": "string"}}
            },
            "required": ["asset_id", "priority", "description"]
        }
    }
]

def run_maintenance_agent(asset_id: str, anomaly_data: dict):
    client = anthropic.Anthropic()
    
    messages = [{
        "role": "user",
        "content": f"""
        Se detectó una anomalía en el activo {asset_id}.
        
        Datos del sensor: {json.dumps(anomaly_data, indent=2)}
        Anomaly score: {anomaly_data['score']:.2f} (threshold: 0.7)
        
        Por favor:
        1. Consulta el historial del activo
        2. Diagnostica el posible problema
        3. Crea una orden de trabajo con la prioridad y acción correcta
        """
    }]
    
    # Agentic loop
    while True:
        response = client.messages.create(
            model="claude-sonnet-5-20261001",
            max_tokens=2048,
            tools=TOOLS,
            messages=messages
        )
        
        if response.stop_reason == "end_turn":
            break
            
        if response.stop_reason == "tool_use":
            tool_results = []
            for content_block in response.content:
                if content_block.type == "tool_use":
                    result = execute_tool(content_block.name, content_block.input)
                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": content_block.id,
                        "content": json.dumps(result)
                    })
            
            messages.append({"role": "assistant", "content": response.content})
            messages.append({"role": "user", "content": tool_results})
    
    return response
```

**Estimado**: $120k-$500k | 10-16 semanas | 3-4 ingenieros (1 IoT, 1 ML, 1 AI/agents, 1 CMMS integración)

---

## P5 — P2P Energy Market Agent (lemlab + LLM + Estrategia MARL)

**Problema**: Los mercados locales de energía P2P entre prosumidores (solar + BESS + EV) necesitan agentes que maximicen beneficio individual respetando restricciones de red y reglas de mercado.

**Stack**:
- [tum-ewk/lemlab](https://github.com/tum-ewk/lemlab) (GPL-3.0) — simulación de mercado local P2P
- PyTorch + MARL (Multi-Agent RL) — política de trading
- Claude claude-sonnet-5 — razonamiento estratégico de alto nivel
- [energywebfoundation](https://github.com/energywebfoundation) (Apache-2.0) — liquidación en blockchain opcional

**Arquitectura**:
```
Prosumer Assets (solar, BESS, EV, load)
        ↓ real-time state
   MARL Trading Agent (fast execution)
   (trained on lemlab simulations)
        ↑ strategic guidance (daily)
   Claude Strategic Planner
   (evaluates market conditions, forecasts,
    adjusts MARL reward shaping)
        ↓ bids/offers
   lemlab Market Clearing Engine
        ↓ settlement
   EW Chain (RECs + settlement, optional)
```

**Estimado**: $200k-$600k | 12-20 semanas | 4 ingenieros (1 energy market domain, 2 ML/MARL, 1 AI/agents)

---

## P6 — Grid Interconnection Study Automation (Open Power AI + PyPSA)

**Problema**: Los estudios de interconexión para proyectos renovables tardan 2-5 años en EE.UU. y LATAM; el EPRI Open Power AI Consortium apunta a reducirlos 5x con AI.

**Stack**:
- Open Power AI Consortium model (NVIDIA NIM, early access) — dominio energético
- [PyPSA/PyPSA](https://github.com/PyPSA/PyPSA) (MIT) — simulación de flujo de potencia
- [Power-Agent/PowerMCP](https://github.com/Power-Agent/PowerMCP) (MIT) — MCP server PyPSA
- Claude claude-opus-4-8 — razonamiento complejo, documentación de resultados

**Arquitectura**:
```
Project Data (location, capacity, interconnection point)
        ↓
   Claude Agent (PowerSkills system prompt)
   + Open Power AI domain model via NIM
        ↓ MCP tool calls
   PowerMCP (PyPSA server)
   - thermal analysis
   - voltage analysis
   - stability studies
   - contingency analysis (N-1, N-2)
        ↓
   Automated Study Report (PDF)
   - findings and violations
   - mitigation options
   - cost estimates
        ↓
   Human Engineer Review (reduced from weeks to hours)
```

**Estimado**: $300k-$1.5M | 12-24 semanas | 4-6 ingenieros (2 power systems engineers, 2 AI/MCP, 1 PM, 1 QA)  
**ROI para cliente**: reducción de 18-24 meses → 3-6 meses en time-to-interconnection

---

## P7 — Energy AI Assistant para Utilities (Claude + OpenEMS API + NL Interface)

**Problema**: Los operadores de utilities necesitan consultar el estado de la red, disparar diagnósticos y gestionar activos distribuidos en lenguaje natural desde dashboards o mobile.

**Stack**:
- [OpenEMS/openems](https://github.com/OpenEMS/openems) (Eclipse PL 2.0) — EMS backend
- Claude claude-sonnet-5 — interfaz conversacional
- OpenEMS REST API + WebSocket — herramientas del agente
- Streaming con SSE — respuestas en tiempo real

**Código clave**:
```python
import anthropic
import httpx

OPENEMS_TOOLS = [
    {
        "name": "get_grid_status",
        "description": "Obtiene el estado actual de la red: carga, generación solar, estado BESS, EVs conectados",
        "input_schema": {"type": "object", "properties": {}, "required": []}
    },
    {
        "name": "set_ess_discharge_power",
        "description": "Configura la potencia de descarga del sistema de almacenamiento (BESS)",
        "input_schema": {
            "type": "object",
            "properties": {
                "power_w": {"type": "integer", "description": "Potencia en vatios (negativo = carga, positivo = descarga)"},
                "duration_minutes": {"type": "integer"}
            },
            "required": ["power_w"]
        }
    },
    {
        "name": "get_consumption_forecast",
        "description": "Obtiene forecast de consumo para las próximas N horas desde OpenSTEF",
        "input_schema": {
            "type": "object",
            "properties": {
                "hours_ahead": {"type": "integer", "default": 24}
            }
        }
    }
]

async def energy_chat(user_message: str, openems_base_url: str):
    client = anthropic.AsyncAnthropic()
    
    async with client.messages.stream(
        model="claude-sonnet-5-20261001",
        max_tokens=1024,
        system="""Eres el asistente de gestión energética de esta microgrid.
        Tienes acceso al estado de la red, BESS, paneles solares y puntos de carga EV.
        Puedes modificar setpoints de operación dentro de límites seguros.
        Siempre explica las acciones que tomas y su impacto esperado.""",
        tools=OPENEMS_TOOLS,
        messages=[{"role": "user", "content": user_message}]
    ) as stream:
        async for event in stream:
            yield event
```

**Estimado**: $50k-$200k | 4-10 semanas | 2-3 ingenieros (1 OpenEMS specialist, 1-2 AI/backend)

---

## Matriz de Patrones

| Patrón | Segmento | Licenses | Esfuerzo | Deal Size |
|--------|----------|----------|----------|-----------|
| P1 Grid Intelligence Agent | TSO/DSO/Consultoras | MIT | 6-12w | $80k-$300k |
| P2 Load Forecasting Service | Utilities/Comercializadoras | MPL-2.0+Apache | 4-8w | $60k-$150k |
| P3 Building Energy Optimization | Facilities/Real Estate | MIT | 8-16w | $100k-$400k |
| P4 Predictive Maintenance | Utilities/IPPs | AGPL+Apache | 10-16w | $120k-$500k |
| P5 P2P Energy Market | Utilities/Agregadores | GPL+Apache | 12-20w | $200k-$600k |
| P6 Interconnection Study | Consultoras/Developers | MIT | 12-24w | $300k-$1.5M |
| P7 Energy AI Assistant | Utilities/Microgrids | Eclipse PL | 4-10w | $50k-$200k |

---
*Ver también: `agents/top.md` para el detalle de cada herramienta AI mencionada.*
