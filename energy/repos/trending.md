# Trending Repositories — Energy AI (2026-07-08)

> Fast-moving repos and emerging signals in energy AI. Updated weekly.

---

## Velocity Table

| Repo | Stars | Velocity | Signal |
|------|-------|----------|--------|
| [Power-Agent/PowerMCP](https://github.com/Power-Agent/PowerMCP) | ~178 | ↑↑↑ Breakout | First MCP bridge for power grid software; Harvard SEAS; Claude integration |
| [Grid2op/grid2op](https://github.com/Grid2op/grid2op) | ~700 | ↑↑ Growing | RL2Grid (2026) makes Grid2Op the standard RL power grid benchmark |
| [PyPSA/PyPSA](https://github.com/PyPSA/PyPSA) | 2,000 | ↑↑ High | PyPSA-Earth (global power model) gaining adoption for LATAM grid planning |
| [OpenEMS/openems](https://github.com/OpenEMS/openems) | 1,400 | ↑ Steady | 2026.7.0 released July 2026; most actively released energy platform (138 releases) |
| [emoncms/emoncms](https://github.com/emoncms/emoncms) | 1,600 | ↑ Steady | Open-source SCADA for distributed PV/storage deployments; widely deployed |
| [intelligent-environments-lab/CityLearn](https://github.com/intelligent-environments-lab/CityLearn) | 621 | ↑↑ Growing | RL demand response reaching production deployments in EU/US |
| [OpenSTEF/openstef](https://github.com/OpenSTEF/openstef) | ~180 | ↑↑ Growing | Alliander-backed AutoML forecasting; expanding to LATAM utilities |
| [e2nIEE/pandapower](https://github.com/e2nIEE/pandapower) | 1,200 | ↑ Steady | PowerMCP integration → new LLM-driven power flow use cases |
| [Power-Agent/PowerFM](https://github.com/Power-Agent/PowerFM) | ~90 | ↑↑ Early | Domain-tuned foundation models for power; watching star growth trajectory |
| [AI4Electricity/Awesome-AI-for-Electricity](https://github.com/AI4Electricity/Awesome-AI-for-Electricity) | ~400 | ↑ Growing | Research compass for energy AI; broad cross-domain adoption |
| [kaymen99/AI-for-energy-sector](https://github.com/kaymen99/AI-for-energy-sector) | ~350 | ↑ Steady | Practical ML implementations for energy; widely forked by utility teams |
| [starlinks123/SmartGrid-Optimizer-AI-Driven-Renewable-Energy-Management](https://github.com/starlinks123/SmartGrid-Optimizer-AI-Driven-Renewable-Energy-Management) | Growing | ↑ New | 20-30% renewable waste reduction claims; gaining traction |

---

## Emerging Signals

### Signal 1: MCP × Power Systems — The Inflection Point
PowerMCP (MIT, Harvard SEAS) is applying the Model Context Protocol to industrial power system software — the same architecture that lets Claude read files or browse the web, now letting Claude run power flow calculations in PowerWorld or simulate faults in OpenDSS. This is the inflection point that starts moving LLM agents from text analysis tools to active power grid engineering assistants.

**New repos in the PowerAgent ecosystem:**
- `Power-Agent/PowerSkills` — agent skills (prompt library + tool patterns for power system tasks)
- `Power-Agent/PowerWF` — agentic workflows (N-1 contingency, restoration, economic dispatch)
- `Power-Agent/PowerFM` — foundation models (fine-tuned load forecasting, fault classification)

**Early adopters to watch:** ERCOT (Texas grid operator), national labs (NREL, Argonne), and European TSOs (Elia, TenneT, RTE France) have all published roadmaps toward AI-assisted grid operations.

---

### Signal 2: Grid2Op + RL2Grid — RL for Grids Goes Scientific
RL2Grid (arXiv:2503.23101, March 2026) established Grid2Op as the scientific benchmark for RL in power grid operations — with standardized tasks, environments, and metrics enabling reproducible comparison across agent designs. This benchmark maturity mirrors what the Atari benchmark did for DRL: accelerates research-to-production transfer.

**Significance:** Utilities and grid operators can now evaluate RL agents on standardized grid scenarios before committing to production pilots. Lowers the trust barrier to deploying RL in actual grid operations.

**GitHub:** https://github.com/Grid2op/grid2op

---

### Signal 3: PyPSA-Earth — Open Power Systems for Every Country
PyPSA-Earth (extension of PyPSA by an open international team) is building validated power system models for every country globally. LATAM is a priority region. Once validated, Globant can use these models for AI-driven grid planning studies for Brazilian and Chilean utilities — without needing proprietary data from day one.

**GitHub:** https://github.com/pypsa-meets-earth/pypsa-earth

---

### Signal 4: OpenSTEF Expanding Beyond Netherlands
OpenSTEF was built for Alliander's Dutch distribution grid. Now being evaluated by utilities in Germany, Belgium, and LATAM. Its architecture (pluggable ML models, weather-feature integration, probabilistic output) is directly applicable to any distribution grid — including Brazil's Cemig, Enel Brasil, and CPFL.

**Key upgrade path:** Retrain OpenSTEF on Brazilian/Chilean smart meter data with INMET (Brazil) and DMC (Chile) weather features → out-of-the-box performance improvement vs. European-trained models.

---

### Signal 5: OpenG2G — AI Datacenter-Grid Coordination (2026 Emerging)
arXiv:2605.05519 (May 2026): simulation platform for AI Datacenter-Grid Runtime Coordination. Addresses the 2025-2026 challenge: data center electricity demand surged 17% in 2025, putting unprecedented strain on grids. OpenG2G models real-time load-shifting — AI workloads pausing or migrating during peak grid stress — to prevent outages and reduce energy cost.

**Why it's trending:** LATAM power grids (Brazil, Chile, Colombia) straining under AI data center demand surge. Companies building data centers in LATAM for renewable energy access now need this AI ↔ grid coordination framework urgently.

---

### Signal 6: RL Demand Response Moving to Production
CityLearn hit 621★ and multiple academic/industry papers now report **production** RL deployments (not just simulations). Buildings in the EU and US are running CityLearn-trained policies for real-time demand response. First LATAM commercial building RL demand-response deployment expected H2 2026 or 2027 (Chile or Colombia likely first movers, given grid stability incentives and commercial building energy tariff structures).

---
*Auto-updated by the ingest pipeline.*
