# 📡 Tendencias — Energy AI

> Última actualización: 2026-07-09

## Tendencias macro (2026)

### T1 — IA para optimización de red reduce outages 30-50%
AI-based fault detection puede identificar y aislar fallas de red en tiempo real, reduciendo la duración de interrupciones en 30-50% (IEA 2026). Topología optimization con RL (Grid2Op) en evaluación por TSOs europeos. **Oportunidad Globant**: agentes de diagnóstico de red para utilities LATAM.

### T2 — Renovables superan carbón por primera vez
793 GW de capacidad renovable agregados en 2025. Solar fotovoltaico = 83% del nuevo capacity. Renovables superan carbón en generación eléctrica global por primera vez (hito histórico). El forecasting AI de generación solar/eólica es ahora operativo crítico. **Oportunidad Globant**: plataformas de forecasting de generación con ML (PyPSA + Prophet/LSTM).

### T3 — Hybrid solar-plus-storage: 12% → 20% en un año
Los proyectos híbridos solar + BESS pasaron del 12% al 20% de las simulaciones en Q4 2025 (RatedPower). Control óptimo de carga/descarga de baterías con RL es el siguiente problema. **Oportunidad Globant**: agentes RL para BESS sobre OpenEMS/sinergym.

### T4 — AI reduce exceso de renovables del 95% al 65%
Usando AI para gestionar buffers de energía virtuales y peak shaving, se puede reducir el overprovisioning de renovables del 95% al 65% de la demanda máxima (IEA). Impacto masivo en CAPEX de parques solares/eólicos. **Oportunidad Globant**: optimización de diseño de parques con OSeMOSYS + ML.

### T5 — Carbon-aware computing mainstream
Carbon Aware SDK (Green Software Foundation, MIT, 1.5k★) adoptado por Microsoft Azure, Google Cloud. Scheduling de workloads AI según intensidad carbónica en tiempo real. WattTime API (nueva versión March 2026) ofrece datos históricos + forecast por región. **Oportunidad Globant**: plataformas cloud carbon-aware para clientes enterprise.

### T6 — Virtual Power Plants (VPP) con AI
Agregación de DERs (solar + BESS + EV + demanda flexible) en VPPs gestionados por AI. AutoGrid y otros actores creciendo rápido. OpenEMS + MyEMS soportan VPP. **Oportunidad Globant**: VPP-as-a-Service para utilities medianas en LATAM.

### T7 — V2G (Vehicle-to-Grid) bidireccional
Flotas EV como activos de storage para la red. Protocolos OCPP 2.0.1 + ISO 15118 (V2G). Demand response inteligente para flotas. **Oportunidad Globant**: EV Fleet AI Management con V2G para corporativos en Brasil/Chile/México.

### T8 — Digital twins de sistemas energéticos
Gemelos digitales de subestaciones, microgrids y plantas industriales para simulación y optimización. PyPSA, pandapower y Grid2Op son los motores de simulación open source. **Oportunidad Globant**: digital twin de activos energéticos para O&G y utilities.

### T9 — AI Data Center ↔ Grid coordination
El consumo de data centers AI se vuelve crítico para la gestión de red (IEA: +3-4% demanda global para 2030). OpenG2G (Apache-2.0) introduce coordinación runtime entre data centers y la red. Los hyperscalers buscan socios para optimizar su huella energética. **Oportunidad Globant**: carbon-aware MLOps para clientes tech.

### T10 — Predictive maintenance con LLM
Integrar datos de SCADA + vibración + corriente con LLMs para diagnóstico en lenguaje natural y generación de work orders automáticos. Reemplaza reglas estáticas por agentes que "leen" el estado del activo. **Oportunidad Globant**: agentes de mantenimiento predictivo para O&G, utilities y manufactura.

### T11 — EU AI Act Aug-2 2026 y energía
El EU AI Act clasifica sistemas de IA en infraestructura crítica (redes eléctricas) como "High-Risk". Compliance obligatorio: documentación, auditoría, explicabilidad. **Impacto**: clientes europeos y de utilities multinacionales necesitan AI explicable y auditable. LLM wrappers sobre Grid2Op deben ser explicables.

### T12 — LLMs para análisis de mercados energéticos
Agentes AI para arbitraje de precios eléctricos spot, optimización de contratos de futuros y análisis de volatilidad de commodities energéticos (gas, petróleo). Modelos: FinRL, TradingAgents adaptados a mercados eléctricos.

## Repos más activos esta semana

- [PyPSA/PyPSA](https://github.com/PyPSA/PyPSA) — commits diarios, v0.32 con sector-coupling mejorado
- [e2nIEE/pandapower](https://github.com/e2nIEE/pandapower) — integración creciente con ML para state estimation
- [emarche/RL2Grid](https://github.com/emarche/RL2Grid) — nuevo benchmark RL para grid, Jun 2026
- [Green-Software-Foundation/carbon-aware-sdk](https://github.com/Green-Software-Foundation/carbon-aware-sdk) — WattTime API 2026-03-01 integrada
- [Grid2op/grid2op](https://github.com/Grid2op/grid2op) — L2RPN 2026 competition en preparación
