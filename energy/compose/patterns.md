# 🧩 Patrones de composición — Energy

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Cada receta nombra repos específicos y cómo conectarlos.
> Última actualización: 2026-07-05

## Arquitectura base

```
[Plataforma vertical base (OpenEMS / MyEMS / GridAPPS-D)]
          ↓
[Capa de datos: InfluxDB / TimescaleDB / PI Historian]
          ↓
[Capa AI: PyPSA / pandapower / pvlib / proloaf]
          ↓
[Orquestación agéntica: LangGraph + MCP Tools]
          ↓
[Interfaz: dashboard Grafana + chatbot Claude API + alertas]
```

---

## Receta 1: EMS Inteligente con Agente Conversacional

**Objetivo**: EMS open source con asistente LLM que explica consumos, detecta anomalías y sugiere acciones de ahorro.

- **Base**: [MyEMS](https://github.com/MyEMS/myems) (MIT) — Python + React + MySQL + InfluxDB
- **Agente**: LangGraph + Claude API (Sonnet 5)
- **Tools MCP**:
  - `read_meter_data` → consulta InfluxDB de MyEMS
  - `get_anomaly_alerts` → activa cuando Z-score > 3σ sobre consumo base
  - `get_cost_breakdown` → lectura de tarifas + consumo por período
  - `generate_retrofit_report` → ejecuta simulación EnergyPlus vía eppy
- **Stack adicional**: [santoshphilip/eppy](https://github.com/santoshphilip/eppy) (MIT) para simulaciones
- **Flujo**:
  1. Operador pregunta: "¿Por qué subió el consumo un 20% esta semana?"
  2. Agente lee datos de MyEMS API → identifica HVAC como causa vía Z-score
  3. Agente sugiere ajuste de setpoints + simula ahorro con eppy
  4. Genera reporte PDF con proyección de ahorro anual
- **Tiempo MVP**: 3-4 semanas
- **Clientes objetivo**: edificios corporativos, hospitales, shoppings LATAM

---

## Receta 2: Pronóstico Solar/Eólico para Traders de Energía

**Objetivo**: sistema de pronóstico 24-72h con intervalos de confianza para ofertas en mercados eléctricos de corto plazo.

- **Base**: [pvlib/pvlib-python](https://github.com/pvlib/pvlib-python) (BSD-3-Clause) para solar; [PyPSA/PyPSA](https://github.com/PyPSA/PyPSA) (MIT) para optimización de despacho
- **Forecasting**: [sogno-platform/proloaf](https://github.com/sogno-platform/proloaf) (Apache 2.0) — RNN probabilístico
- **Datos**: ERA5 (Copernicus) para meteorología histórica; API SMHI/OpenMeteo para pronóstico
- **Agente**: LangGraph + tool `optimize_bid_strategy`
- **Flujo**:
  1. proloaf genera distribución de probabilidad de generación para las próximas 24h
  2. pvlib valida con datos de irradiación y temperatura del parque específico
  3. PyPSA resuelve OPF con generación estocástica → identifica precio de oferta óptimo
  4. Agente LangGraph genera recomendación: "Oferta 85 MWh a 42 USD/MWh con 80% confianza"
- **Alertas**: notificación automática si pronóstico se desvía > 15% del real en tiempo real
- **Tiempo MVP**: 4-6 semanas
- **Clientes objetivo**: desarrolladores de parques solares/eólicos, traders de energía, utilities

---

## Receta 3: Mantenimiento Predictivo de Activos de Red

**Objetivo**: detectar fallas inminentes en transformadores, cables y protecciones antes de que ocurran usando ML sobre señales SCADA.

- **Simulación de red**: [e2nIEE/pandapower](https://github.com/e2nIEE/pandapower) (BSD-3-Clause) — power flow + state estimation
- **ML**: [kaymen99/AI-for-energy-sector](https://github.com/kaymen99/AI-for-energy-sector) (MIT) — modelos de anomalía en activos
- **Agente**: LangGraph con tool `run_state_estimation` y `classify_anomaly`
- **Datos**: lecturas SCADA/IEC 61850 vía [pyiec61850-ng](https://github.com/f0rw4rd/pyiec61850-ng) o PI Historian
- **Alertas**: [OperatorFabric](https://github.com/opfab/operatorfabric-core) (MPL-2.0, LF Energy) — plataforma industrial de notificaciones a operadores
- **Flujo**:
  1. Lecturas SCADA cada 15s → state estimation en pandapower
  2. ML detecta desviación en voltaje/corriente → agente clasifica: degradación térmica / falla incipiente / normal
  3. Si crítico: OperatorFabric emite alerta a operador con diagnóstico en lenguaje natural
  4. Agente genera orden de trabajo con urgencia priorizada
- **KPI target**: reducción 25-35% fallas inesperadas; extensión 20% vida útil activos
- **Tiempo MVP**: 6-8 semanas
- **Clientes objetivo**: distribuidoras eléctricas LATAM (Brasil, Chile, México)

---

## Receta 4: DERMS Agéntico para Gestión de DERs

**Objetivo**: plataforma de gestión de recursos energéticos distribuidos (solar, BESS, EV, cargas flexibles) con orquestación AI.

- **Base**: [GRIDAPPSD/GOSS-GridAPPS-D](https://github.com/GRIDAPPSD/GOSS-GridAPPS-D) (Apache 2.0) — DERMS framework DOE
- **Optimización de red**: [e2nIEE/pandapower](https://github.com/e2nIEE/pandapower) (BSD-3-Clause) — OPF en tiempo real
- **EV charging**: [ChargePi/oscp-go](https://github.com/ChargePi/oscp-go) (MIT) — Open Smart Charging Protocol
- **Agente**: LangGraph multi-agente:
  - `GridStateAgent`: monitorea voltaje/flujos en red de distribución
  - `DERDispatchAgent`: despacha BESS, pausa EV charging, activa carga flexible
  - `MarketPriceAgent`: captura precio spot + señales de sistema
- **Flujo**:
  1. GridStateAgent detecta sobrecarga en alimentador (potencia > 95% capacidad)
  2. DERDispatchAgent calcula: cuánto BESS descargar + qué EV pausar + qué cargas diferir
  3. pandapower valida que la acción resuelve la violación de voltaje antes de ejecutar
  4. Acciones enviadas vía GridAPPS-D API y OSCP a dispositivos
  5. Log completo con razón de cada decisión para auditoría regulatoria
- **KPI target**: reducción 40% curtailment solar; evitar 30% inversiones en refuerzo de red
- **Tiempo MVP**: 8-10 semanas
- **Clientes objetivo**: cooperativas eléctricas, distribuidoras con alta penetración solar (Chile, nordeste Brasil)

---

## Receta 5: Optimizador RL para Edificios y Microgrids

**Objetivo**: agente de RL que aprende a controlar HVAC, iluminación y carga de BESS para minimizar costo energético manteniendo confort.

- **Entorno simulación**: [ugr-sail/sinergym](https://github.com/ugr-sail/sinergym) (MIT) — EnergyPlus + Gym
- **Testbed**: [IBM/rl-testbed-for-energyplus](https://github.com/IBM/rl-testbed-for-energyplus) (MIT) — benchmarks de entrenamiento
- **Scripting IDF**: [santoshphilip/eppy](https://github.com/santoshphilip/eppy) (MIT) — parametrización de modelos de edificios
- **Algoritmo RL**: PPO / SAC (stable-baselines3) entrenado en sinergym; transferencia a edificio real
- **Despliegue**: agente Python expuesto como API REST → integración con BMS (Siemens Desigo, Honeywell)
- **Flujo training → producción**:
  1. Crear modelo EnergyPlus del edificio real con eppy
  2. Entrenar agente RL en sinergym durante 500k steps (~2h en GPU)
  3. Validar en modo shadow (observa pero no actúa) durante 2 semanas
  4. Activar control real; monitoreo continuo con Grafana
  5. Reentrenamiento mensual con datos reales del edificio
- **KPI target**: ahorro 15-25% en factura energética; reducción 20% emisiones CO₂
- **Tiempo MVP**: 6-8 semanas (incluyendo modelado del edificio)
- **Clientes objetivo**: corporativos, hospitales, malls, universidades LATAM

---

## Receta 6: Modelo Nacional de Transición Energética con PyPSA-Earth

**Objetivo**: modelo de sistema energético nacional open source para análisis de escenarios de transición energética (consultores, reguladores, academias).

- **Base**: [pypsa-meets-earth/pypsa-earth](https://github.com/pypsa-meets-earth/pypsa-earth) (MIT) — modelo global PyPSA
- **Datos**: OpenStreetMap (red eléctrica), ERA5 (recurso solar/eólico), ENTSO-E / operadores nacionales
- **Optimización**: [PyPSA/pypsa-eur](https://github.com/pypsa/pypsa-eur) (MIT) como referencia metodológica
- **Agente de análisis**: LangGraph + Claude API
  - `run_scenario_optimization` → ejecuta PyPSA con parámetros dados
  - `compare_scenarios` → compara KPIs: costo, emisiones, curtailment, inversión
  - `generate_policy_brief` → redacta informe ejecutivo con hallazgos
- **Workflow Snakemake**: pipeline reproducible desde datos raw hasta resultados
- **Flujo**:
  1. Analista especifica escenario: "Chile 2035 con 70% renovables, sin carbón"
  2. Agente configura PyPSA-Earth con parámetros del escenario
  3. Snakemake ejecuta pipeline: descarga datos → construye red → optimiza → reporta
  4. Claude API genera narrative de política: "Para lograr el escenario, se requieren 8 GW de BESS y 2,400 km de nuevas líneas de transmisión en el eje norte-sur"
- **Entregable**: informe PDF + visualizaciones de Grafana con rutas de inversión óptimas
- **Tiempo MVP**: 8-12 semanas (incluye calibración del modelo)
- **Clientes objetivo**: ministerios de energía, reguladores (CNE Chile, ANEEL Brasil), consultoras de inversión

---

*Para más contexto de mercado: ver `intel/market.md` y `intel/trends.md`.*
*Para repos base detallados: ver `repos/foundations.md`.*
