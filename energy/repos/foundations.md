# 🏗️ Repos fundacionales — Energy

> Bases sobre las cuales construir soluciones AI para el sector energético.
> Foco: licencias abiertas (MIT, BSD, Apache 2.0), comunidades activas, alta adoptabilidad.
> Última actualización: 2026-07-05

## Plataformas y frameworks base

| Repo | Licencia | Descripción | ¿Base para AI? |
|------|----------|-------------|----------------|
| [PyPSA/PyPSA](https://github.com/PyPSA/PyPSA) | MIT | Python for Power System Analysis: optimización lineal/no-lineal de sistemas eléctricos, renovables, almacenamiento, redes de gas e hidrógeno | Sí — ~2k★ |
| [e2nIEE/pandapower](https://github.com/e2nIEE/pandapower) | BSD-3-Clause | Power flow, OPF, state estimation, short-circuit IEC 60909; base pandas, interfaz MATPOWER/PYPOWER; backend optimizado con numba | Sí — ~900★ |
| [pvlib/pvlib-python](https://github.com/pvlib/pvlib-python) | BSD-3-Clause | Librería estándar de simulación fotovoltaica: modelado de irradiación, temperatura, inverters; usado por utilities y desarrolladores PV globales | Sí — ~1.1k★ |
| [ugr-sail/sinergym](https://github.com/ugr-sail/sinergym) | MIT | Entorno OpenAI Gym sobre EnergyPlus para entrenamiento RL en control de edificios; soporte multi-agente, wrappers de recompensa personalizables | Sí — ~231★ |
| [IBM/rl-testbed-for-energyplus](https://github.com/IBM/rl-testbed-for-energyplus) | MIT | Testbed IBM para optimización RL de consumo energético en edificios; EnergyPlus + OpenAI Gym; benchmarks incluidos | Sí — ~217★ |
| [MyEMS/myems](https://github.com/MyEMS/myems) | MIT | EMS completo (Python backend + React frontend): colección de datos, análisis, reportes de energía/carbono; VPP, microgrid, PV nativo | Sí — ~400★ |
| [GRIDAPPSD/GOSS-GridAPPS-D](https://github.com/GRIDAPPSD/GOSS-GridAPPS-D) | Apache 2.0 | Plataforma DOE para aplicaciones avanzadas de distribución; APIs CIM, integración OpenDSS/GridLAB-D, DERMS, optimización de red | Sí — ~150★ |
| [openremote/openremote](https://github.com/openremote/openremote) | AGPL-3.0 | Plataforma IoT 100% open source: integración dispositivos, inteligencia, BESS, EV charging, tarifas dinámicas, APIs de mercado eléctrico | Sí — ~1.8k★ |
| [PyPSA/pypsa-eur](https://github.com/PyPSA/pypsa-eur) | MIT | Modelo de optimización sector-coupled del sistema energético europeo; workflow Snakemake completo; transportable a otras regiones | Sí — ~584★ |
| [pypsa-meets-earth/pypsa-earth](https://github.com/pypsa-meets-earth/pypsa-earth) | MIT | Extensión global de PyPSA-Eur: modela sistemas energéticos nacionales con datos abiertos; cubre LATAM, África, Asia | Sí — ~200★ |

## Simuladores y herramientas de análisis

| Repo | Licencia | Descripción | Uso principal |
|------|----------|-------------|---------------|
| [gridlab-d/gridlab-d](https://github.com/gridlab-d/gridlab-d) | BSD-3-Clause | Simulador de distribución eléctrica con modelos agente; metering, mercados, SCADA; desarrollado por DOE/PNNL | Simulación distribución |
| [RyanCMann/OSESMO](https://github.com/RyanCMann/OSESMO) | MIT | Open Source Energy Storage Model: optimización de despacho de baterías (BESS) para minimizar facturas comerciales | BESS optimization |
| [santoshphilip/eppy](https://github.com/santoshphilip/eppy) | MIT | Scripting Python para EnergyPlus: generación y modificación de archivos IDF/IDD; automatización de simulaciones de edificios | Building simulation |
| [sogno-platform/proloaf](https://github.com/sogno-platform/proloaf) | Apache 2.0 | Pronóstico probabilístico de carga eléctrica con redes recurrentes (RNN); intervalos de confianza para operaciones de mercado | Load forecasting |

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas (EMS, SCADA, DERMS).*
