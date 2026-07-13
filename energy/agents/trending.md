# 📈 Agentes trending — Energy (semana del 2026-07-13)

> Qué está ganando momentum esta semana en la intersección AI × energía.
> Última actualización: 2026-07-13

## Repos con actividad destacada

| Nombre | Licencia | Descripción | Señal |
|--------|----------|-------------|-------|
| [EVerest/EVerest](https://github.com/EVerest/EVerest) | Apache-2.0 | Stack open source de EV charging (LF Energy); v2026.02.0 es la primera versión bajo nueva estrategia LTS. En producción en OEMs (Tritium, Pionix). | LTS estable, adopción OEM |
| [FlexMeasures/flexmeasures](https://github.com/FlexMeasures/flexmeasures) | Apache-2.0 | EMS de flexibilidad (LF Energy); v0.31 lanzada. Usado por startups de energía en Europa y LATAM para BESS y demand response. | v0.31 lanzada jul 2026 |
| [emarche/RL2Grid](https://github.com/emarche/RL2Grid) | MIT | Benchmark RL para operaciones de red eléctrica; desarrollado con TSOs europeos, 39 tareas, paper en OpenReview. | Paper + benchmark activo |
| [Grid2op/grid2op](https://github.com/Grid2op/grid2op) | LGPLv2.1 | Testbed LF Energy para agentes RL; base de RL2Grid y múltiples papers de benchmark 2026. 7° Power Grid Model Meetup 2026. | Meetup LF Energy jul 2026 |
| [openremote/openremote](https://github.com/openremote/openremote) | AGPL-3.0 | Plataforma IoT open source para gestión de activos energéticos; nuevo tutorial EMS publicado. | Tutorial EMS publicado |
| [OpenEMS/openems](https://github.com/OpenEMS/openems) | Apache-2.0 | Sistema modular de gestión energética; nuevas integraciones ML para predicción de demanda y soporte AI en EV charging. | Release reciente |
| [pypsa-meets-earth/pypsa-earth](https://github.com/pypsa-meets-earth/pypsa-earth) | MIT | Modelo global sector-coupled de alta resolución; paper sector-coupled en Applied Energy 2025; adopción en proyectos de hidrógeno. | Adopción global creciente |
| [OpenEnergyPlatform/awesome-sustainable-technology](https://github.com/OpenEnergyPlatform/awesome-sustainable-technology) | MIT | Lista curada actualizada de proyectos open source para energía sostenible. | Referencia activa ~1.1k★ |

## Señal de investigación (papers clave jul 2026)

- **[EnergyAgentBench](https://arxiv.org/pdf/2605.15230)** (arXiv 2605.15230): primer benchmark multi-familia de agentes LLM sobre datos reales de infraestructura energética — 70 variantes de tareas en 5 familias, 1,414 runs evaluados en mayo 2026.
- **[PowerAgentBench-Dyn](https://arxiv.org/abs/2606.20401)** (arXiv 2606.20401, Harvard + Politecnico di Milano + UBITECH): benchmark para agentic AI en estudios dinámicos de sistemas eléctricos; tareas que requieren razonamiento, uso de herramientas e ingeniería iterativa.
- **[Power Systems Agent Benchmark (PSAB)](https://arxiv.org/pdf/2606.20950)** (arXiv 2606.20950): benchmark ejecutable con 41 familias de tareas en 8 áreas de ingeniería eléctrica — evaluación determinista con flags de factibilidad, scores normalizados y violaciones explícitas.
- **[How Do Tool-Augmented LLM Agents Perform?](https://arxiv.org/pdf/2606.26346)** (arXiv 2606.26346): evaluación de agentes LLM con herramientas en tareas reales de analítica energética; señales positivas para adopción en producción.
- **[RL2Grid](https://arxiv.org/abs/2503.23101)** (arXiv 2503.23101): benchmark RL estandarizado desarrollado con TSOs europeos sobre Grid2Op; 39 tareas, baselines DQN/PPO/SAC/TD3.

## LF Energy — Noticias junio 2026

LF Energy anunció en junio 2026:
- **3 nuevos proyectos hosted**: OpenGridFM, AINETUS, y CUPID (ver verticals/solutions.md)
- **Nuevos miembros**: utilities y vendors adicionales sumados al consorcio
- **Power Grid Model** superó **10 millones de descargas** y avanzó a stage "Early Adoption"; en producción en los 3 grandes DSOs holandeses (Alliander, Enexis, Stedin)
- **EVerest v2026.02.0**: primera versión LTS bajo nueva estrategia de soporte a largo plazo

## OpenGridFM — Foundation Models para el Grid (nuevo proyecto LF Energy)

**Qué es**: framework open source para hacer emerger foundation models específicos para redes eléctricas (GridFMs).
**Por qué importa**: los foundation models generales (LLMs) tienen limitaciones para razonamiento sobre sistemas de potencia — OpenGridFM busca el "momento GPT" para el sector eléctrico con modelos pre-entrenados sobre datos de red.
**Para Globant**: posición temprana en el stack de modelos energéticos del futuro.

## Tendencia de la semana

> **Benchmarking de agentes LLM en energía** es la aceleración de la semana: PSAB (41 familias), EnergyAgentBench (70 variantes), PowerAgentBench-Dyn y PFBench salieron en pocas semanas. La industria ya tiene los criterios objetivos para contratar agentes AI — Globant puede usar estos benchmarks para demostrar calidad en propuestas a utilities.

---
*Pipeline automático — se actualiza cada hora.*
