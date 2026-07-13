# 🧩 Patrones de composición — Energy

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-13

## Arquitectura base

```
[Plataforma vertical base (OpenEMS / FlexMeasures / EVerest / PyPSA)]
          ↓
[Capa de integración: Node-RED / MQTT / REST / MCP Server]
          ↓
[Agentes AI: LLM + herramientas especializadas (pandapower, Grid2Op, sinergym)]
          ↓
[UI conversacional + dashboards (operador / cliente final)]
```

---

## P1: Grid Operations Copilot (EMS + LLM Agent)

**Objetivo**: Operador de red con un asistente LLM que responde preguntas, detecta anomalías y sugiere acciones en lenguaje natural.

**Stack**:
- `OpenEMS/openems` (Apache-2.0) — EMS base con datos de red en tiempo real
- `openremote/openremote` (AGPL-3.0) — capa IoT para agregar activos distribuidos
- `node-red/node-red` (Apache-2.0) — integración con MQTT/Modbus/OPC-UA
- Claude claude-sonnet-5 via MCP server — razonamiento sobre estado de red

**Flujo**:
```
Activos BESS/FV/EV → MQTT → Node-RED → OpenEMS API
                                           ↓
                                    MCP Server (herramientas: read_grid_state, get_alarms, run_load_flow)
                                           ↓
                                    Claude Agent (razona + sugiere)
                                           ↓
                                    Operador (chat UI / Slack)
```

**Implementación clave**:
```python
# MCP Server tool — expone estado del grid al agente
@tool
def get_grid_state() -> dict:
    """Returns current grid topology, load, generation, SoC of BESS."""
    return openems_client.get_grid_summary()

@tool
def run_pandapower_analysis(scenario: str) -> dict:
    """Runs power flow analysis for given scenario using pandapower."""
    net = build_network_from_openems()
    pp.runpp(net)
    return extract_violations(net)
```

**Tiempo estimado**: 3-4 semanas para POC funcional
**Quick win**: reducción del 30-40% en tiempo de respuesta a alarmas

---

## P2: Forecasting de Demanda con Agente Adaptativo

**Objetivo**: Sistema de predicción de demanda que combina modelos estadísticos + ML + un agente que decide cuál modelo usar según el contexto (festivos, clima, eventos).

**Stack**:
- `PyPSA/PyPSA` (MIT) — integración del forecast en optimización del sistema
- `e2nIEE/pandapower` (BSD-3) — validación de la red con la demanda proyectada
- XGBoost / Prophet / SARIMAX (MIT) — ensemble de modelos de forecasting
- `mlflow/mlflow` (Apache-2.0) — tracking y comparación de modelos

**Agente orquestador**:
```python
def select_forecast_model(context: ForecastContext) -> str:
    if context.has_holiday or context.unusual_weather:
        return "prophet"   # mejor en eventos atípicos
    elif context.horizon_hours > 48:
        return "sarimax"   # mejor a largo plazo
    else:
        return "xgboost"   # mejor en operación normal

def validate_forecast_against_grid(forecast_mw: float, net):
    net.load.p_mw = forecast_mw
    pp.runpp(net)
    return check_voltage_violations(net)
```

**Tiempo estimado**: 2-3 semanas para POC con datos históricos del cliente
**Integración LATAM**: conectar con datos de CCEE (Brasil), CAMMESA (Argentina), XM (Colombia)

---

## P3: Building Energy RL Agent (Edificios Comerciales)

**Objetivo**: Agente de RL que optimiza el consumo HVAC de edificios comerciales minimizando costo energético y respetando confort.

**Stack**:
- `ugr-sail/sinergym` (MIT) — entorno de simulación EnergyPlus
- `Digitalized-Energy-Systems/opfgym` (MIT) — benchmark de entornos OPF para validación
- Stable-Baselines3 (MIT) — librería de algoritmos RL (PPO, SAC)
- `OpenEMS/openems` (Apache-2.0) — deploy del agente entrenado en producción

**Pipeline de entrenamiento → producción**:
```
Sinergym (simulación EnergyPlus)
    ↓ entrenamiento PPO/SAC (SB3)
Modelo RL exportado (ONNX)
    ↓ deploy como controlador
OpenEMS (controller plugin)
    ↓ actúa sobre activos reales
HVAC / BESS / EV Charger
```

**Customización para cliente**:
```python
env_config = {
    "building_file": "client_office_medellin.idf",
    "weather_file": "COL_Bogota_weather.epw",
    "reward": lambda obs: -obs["energy_cost"] + 0.5 * obs["comfort_score"],
    "max_episode_steps": 8760  # 1 año horario
}
env = gym.make("Sinergym-v1", config=env_config)
```

**Tiempo estimado**: 4-6 semanas (2 semanas setup + 2 entrenamiento + 2 integración)
**Ahorro típico**: 15-25% reducción consumo energético en edificios comerciales

---

## P4: DER Aggregation + Demand Response Agent

**Objetivo**: Agregar recursos energéticos distribuidos (BESS, FV, EV) y participar automáticamente en mercados de respuesta a demanda.

**Stack**:
- `FlexMeasures/flexmeasures` (Apache-2.0) — scheduling y optimización de portafolio DER (LF Energy)
- `openremote/openremote` (AGPL-3.0) — plataforma de gestión de activos DER
- `OpenEMS/openems` (Apache-2.0) — control en tiempo real de cada activo
- Claude claude-sonnet-5 (Anthropic) — agente de negociación con operador de red

**Agente de negociación**:
```python
@tool
def get_portfolio_flexibility(horizon_hours: int) -> dict:
    """Returns available up/down flexibility of the DER portfolio via FlexMeasures."""
    return flexmeasures_client.get_flexibility_prognosis(horizon_hours)

@tool  
def submit_demand_response_bid(mw: float, duration_h: float, price_eur_mwh: float):
    """Submits a flexibility bid to the grid operator / energy market."""
    return market_client.submit_bid(mw, duration_h, price_eur_mwh)
```

**Tiempo estimado**: 4-8 semanas (depende de integración con mercado local)
**Revenue**: utilities LATAM pagan $20-80 USD/MWh por capacidad de respuesta

---

## P5: Predictive Maintenance de Subestaciones

**Objetivo**: Sistema que predice fallas en transformadores y equipos de subestación usando datos de sensores + LLM para diagnóstico.

**Stack**:
- `seapath` (Apache-2.0) — plataforma de subestación digital IEC 61850
- `openremote/openremote` (AGPL-3.0) — agregación de telemetría de activos
- XGBoost / Prophet (MIT) — modelos de anomaly detection
- Claude claude-sonnet-5 — diagnóstico en lenguaje natural + recomendaciones

**Flujo de datos**:
```
Sensores IEC 61850 (temperatura, vibración, DGA, carga)
    → SEAPATH → IEC 61850 MMS
    → openremote (normalización + almacenamiento)
    → Anomaly detection (XGBoost)
    → Si anomalía: Claude Agent diagnostica + genera work order
    → CMMS del cliente (SAP PM / Maximo)
```

**Tiempo estimado**: 6-8 semanas (alto depende de acceso a datos de sensores)
**ROI**: evitar 1 falla mayor de transformador = $500k-$5M ahorrados

---

## P6: MCP-over-MQTT para Activos Energéticos

**Objetivo**: Exponer activos energéticos (inversores, BESS, medidores) como herramientas MCP para que agentes LLM los controlen directamente.

**Stack**:
- Node-RED (Apache-2.0) — bridge MQTT ↔ MCP
- EMQX / Mosquitto — broker MQTT
- Anthropic MCP SDK — servidor de herramientas
- Claude claude-sonnet-5 — agente que actúa sobre activos

**Bridge MQTT ↔ MCP**:
```javascript
// Node-RED flow: MQTT topic → MCP tool
const mcpServer = new Server({ name: "energy-assets" });
mcpServer.tool("set_inverter_setpoint", async ({ device_id, kw }) => {
    await mqttClient.publish(`cmd/${device_id}/setpoint`, JSON.stringify({ kw }));
    return { status: "sent", device_id, kw };
});
mcpServer.tool("get_meter_reading", async ({ meter_id }) => {
    const reading = await mqttClient.subscribe_once(`tel/${meter_id}/reading`);
    return JSON.parse(reading);
});
```

**Tiempo estimado**: 1-2 semanas para MVP con MQTT + Claude
**Impacto**: operador puede controlar activos en lenguaje natural sin código

---

## P7: Energy Analytics Agent (Reporting Automático)

**Objetivo**: Agente que genera reportes energéticos automáticos (consumo, emisiones, costos) en lenguaje natural para clientes corporativos.

**Stack**:
- `openremote/openremote` (AGPL-3.0) — datos de activos energéticos
- ClickHouse / TimescaleDB — time-series de medición
- `mlflow/mlflow` (Apache-2.0) — tracking de modelos y métricas
- Claude claude-sonnet-5 — generación del reporte + Q&A

**Agente de reportes**:
```python
tools = [
    get_consumption_by_period,    # consulta ClickHouse
    get_renewable_percentage,      # calcula % renovable del portafolio
    compute_carbon_footprint,      # Scope 2 emissions por activo
    compare_with_baseline,         # variación vs período anterior
    generate_regulatory_report,    # formato ANEEL/CRE/CREG
]
agent = ClaudeAgent(model="claude-sonnet-5", tools=tools)
report = agent.run("Generate monthly energy report for November 2026")
```

**Tiempo estimado**: 2-3 semanas
**Clientes**: corporativos con objetivos ESG, utilities con reportes regulatorios

---

## P8: Grid Foundation Model Pipeline (OpenGridFM + Grid2Op + RL2Grid)

**Objetivo**: Fine-tuning y evaluación de un foundation model específico para redes eléctricas del cliente, usando el stack LF Energy completo.

**Cuándo usar**: cliente utility/TSO que quiere un modelo propio entrenado sobre sus datos históricos de red para razonamiento avanzado sobre topología, contingencias y flujo de potencia.

**Stack**:
- `OpenGridFM` (LF Energy 2026) — framework para entrenar y desplegar GridFMs
- `Grid2op/grid2op` (LGPLv2.1, LF Energy) — entorno de simulación realista para el pre-entrenamiento
- `emarche/RL2Grid` (MIT) — benchmark estandarizado con TSOs para evaluación objetiva
- `AINETUS` (LF Energy 2026) — capa XAI + HMI para integración en sala de control
- Claude claude-sonnet-5 — orquestador de alto nivel para tareas de razonamiento complejo

**Pipeline de desarrollo**:
```
1. Datos históricos de red del cliente (SCADA, EMS, mercado)
         ↓
2. Pre-procesamiento + Grid2Op (simulación de red + eventos históricos)
         ↓
3. Fine-tuning con OpenGridFM (GridFM sobre datos del cliente)
         ↓
4. Evaluación con RL2Grid (39 tareas estandarizadas con TSOs)
         ↓
5. AINETUS (capa XAI: el modelo explica sus decisiones al operador)
         ↓
6. Despliegue en sala de control (HMI + alerta proactiva)
```

**Implementación clave**:
```python
# Evaluación del modelo con RL2Grid
from rl2grid import GridBenchmark, RL2GridEnv

benchmark = GridBenchmark(tasks="all_39", client_grid=client_network)
results = benchmark.evaluate(model=gridFM_client, episodes=100)

# Resultado: score normalizado por familia de tareas
print(results.summary())
# -> topology_optimization: 0.87, redispatch: 0.91, curtailment: 0.83
```

**Tiempo estimado**: 10-16 semanas (piloto con 6 meses de datos históricos)
**ROI**: reducción de violaciones de red en 30-50%; apoyo a operadores en contingencias N-1

---

## P9: EV Charging AI Platform (EVerest + OpenEMS + FlexMeasures)

**Objetivo**: Plataforma de EV charging inteligente que optimiza la carga según precio de energía, capacidad de la red y demanda del edificio — todo open source.

**Cuándo usar**: cliente con flota de cargadores propios (empresa, parking, hotel) que quiere AI para reducir costos y gestionar la carga inteligentemente.

**Stack**:
- `EVerest/EVerest` (Apache-2.0, LF Energy) — firmware de cargadores EV; OCPP 2.0.1; AC/DC
- `OpenEMS/openems` (Apache-2.0) — gestión energética del edificio (BESS, FV, red)
- `FlexMeasures/flexmeasures` (Apache-2.0, LF Energy) — scheduling inteligente de carga según precio spot
- `node-red/node-red` (Apache-2.0) — integración entre sistemas
- Claude claude-haiku-4-5 via MCP — decisiones rápidas de scheduling (costo-latencia óptimo)

**Arquitectura**:
```
EV Plugged In → EVerest (OCPP 2.0.1)
                     ↓
              OpenEMS (monitoreo del edificio: BESS SoC, FV generation, demand)
                     ↓
              FlexMeasures (scheduling: cuándo cargar, a qué potencia)
                     ↓
              MCP Server (herramientas: get_price_forecast, get_ev_soc, set_charge_rate)
                     ↓
              Claude Agent (decide: cargar ahora vs diferir vs V2G si disponible)
```

**Lógica de scheduling**:
```python
@tool
def get_optimal_charge_schedule(ev_id: str, target_soc: float, departure_time: str) -> dict:
    """
    Uses FlexMeasures to compute optimal charge schedule.
    Minimizes cost while guaranteeing target SoC at departure.
    """
    ev_asset = flexmeasures.get_asset(ev_id)
    schedule = flexmeasures.compute_schedule(
        asset=ev_asset,
        target_soc=target_soc,
        deadline=departure_time,
        price_sensor="day_ahead_price",
        constraints={"max_power_kw": 22.0}
    )
    return schedule

@tool
def set_ev_charge_rate(ev_id: str, power_kw: float):
    """Sets EV charge rate via EVerest OCPP interface."""
    return everest_client.set_charging_profile(ev_id, power_kw)
```

**Casos de uso LATAM**:
- **Chile**: optimización según precio spot CDEC (variación horaria)
- **Brasil**: integración con bandeiras tarifárias (verde/amarela/vermelha) de ANEEL
- **México**: gestión de demanda máxima para evitar cargos de capacidad CFE
- **Colombia**: demand response con XM para participar en mercado de regulación

**Tiempo estimado**: 6-10 semanas (incluyendo integración con cargadores reales)
**Ahorro típico**: 20-35% reducción en costos de energía para carga de flotas EV

---

## Selección de patrón según cliente

| Tipo de cliente | Patrón recomendado | Quick win |
|-----------------|--------------------|----------|
| Utility de distribución | P1 Grid Copilot + P5 Predictive Maintenance | P1 (3-4 sem) |
| Generadora renovable | P2 Forecasting + P4 DER Aggregation | P2 (2-3 sem) |
| Corporativo con edificios | P3 Building RL + P7 Analytics | P7 (2-3 sem) |
| Startup de flexibilidad | P4 DER Aggregation + P6 MCP-MQTT | P6 (1-2 sem) |
| Operador de red (TSO/DSO) | P8 Grid Foundation Model + P1 Grid Copilot | P1 (3-4 sem) |
| Empresa con flota EV / parking | P9 EV Charging AI | P9 (6-10 sem) |
| Operador de red avanzado | P8 Grid Foundation Model (OpenGridFM+RL2Grid) | Piloto 10-16 sem |
