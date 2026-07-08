# Trending Repositories — Energy AI (2026-07-08)

> Fast-moving repos and emerging signals in energy AI. Updated weekly.
> Last updated: 2026-07-08 (v3)

---

## Velocity Table (v3 — July 2026)

| Repo | Stars | Velocity | Signal |
|------|-------|----------|--------|
| [Power-Agent/PowerMCP](https://github.com/Power-Agent/PowerMCP) | ~178+ | ↑↑↑ Breakout | First MCP bridge for power grid software; Harvard SEAS; EPE joined PAI March 2026 |
| [Grid2op/grid2op](https://github.com/Grid2op/grid2op) | ~700 | ↑↑ Growing | RL2Grid + PSAB (arXiv:2606.20950) dual-benchmark elevating Grid2Op to standard reference |
| [PyPSA/PyPSA](https://github.com/PyPSA/PyPSA) | 2,000 | ↑↑ High | PyPSA-Earth for LATAM grid planning; Amazon $4B Chile AWS driving demand for grid models |
| [OpenEMS/openems](https://github.com/OpenEMS/openems) | 1,400 | ↑ Steady | 10th anniversary Apr 2026; Fraunhofer ISE protocol integration; §14a EnWG compliance focus |
| [emoncms/emoncms](https://github.com/emoncms/emoncms) | 1,600 | ↑ Steady | Open-source SCADA for distributed PV/storage; widely deployed in LATAM solar farms |
| [intelligent-environments-lab/CityLearn](https://github.com/intelligent-environments-lab/CityLearn) | 621+ | ↑↑ Growing | RL demand response in production (EU/US); 37% HVAC energy savings validated 2026 |
| [OpenSTEF/openstef](https://github.com/OpenSTEF/openstef) | ~180 | ↑↑ Growing | Alliander AutoML forecasting; Brazil smart grid market $1.58B→$5.8B by 2033 creates demand |
| [e2nIEE/pandapower](https://github.com/e2nIEE/pandapower) | 1,200 | ↑ Steady | PowerMCP + PowerDAG integration → LLM-driven distribution grid analysis |
| [Power-Agent/PowerFM](https://github.com/Power-Agent/PowerFM) | ~90 | ↑↑ Early | Domain-tuned foundation models for power; PAI 14-project portfolio accelerating development |
| [AI4Electricity/Awesome-AI-for-Electricity](https://github.com/AI4Electricity/Awesome-AI-for-Electricity) | ~400 | ↑ Growing | Research compass for energy AI; broad cross-domain adoption |
| [kaymen99/AI-for-energy-sector](https://github.com/kaymen99/AI-for-energy-sector) | ~350 | ↑ Steady | Practical ML implementations for energy; widely forked by utility teams |
| PowerDAG (Power-Agent) | arXiv:2603.17418 | ↑↑↑ Breakout | 100% success rate on distribution grid analysis; JIT supervision; open-source pending |
| PowerChain (Power-Agent) | arXiv:2508.17094 | ↑↑ New | Verifiable agentic grid workflows; audit trail for ANEEL/SEC regulatory compliance |
| PSAB (Power Systems Agent Benchmark) | arXiv:2606.20950 | ↑↑ New | Executable AI agent evaluation for power engineering; June 2026 |

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

### Signal 7: PowerDAG and PowerChain — Agentic Grid Analysis with Reliability Guarantees (March–August 2026)
Two new papers from the Harvard SEAS Power-Agent ecosystem set a new bar for agentic AI reliability in power engineering:

**PowerDAG** (arXiv:2603.17418, March 2026):
- Adaptive retrieval + JIT supervision → 100% task completion on distribution grid analysis
- 6–50 percentage point improvement over ReAct, LangChain, and CrewAI baselines
- JIT supervision actively intercepts tool-usage violations in real time
- Enables non-expert engineers to run complex distribution analysis via LLM

**PowerChain** (arXiv:2508.17094, August 2026):
- Verifiable version of PowerDAG: full audit trail of tool calls and intermediate results
- Designed for regulatory-grade deployments where AI decisions must be traceable
- ANEEL (Brazil) and CNE (Chile) both require explainable AI for grid operations decisions

**Combined signal:** The Power-Agent ecosystem is systematically solving the two biggest barriers to agentic AI in power engineering: reliability and verifiability. Once both are demonstrated, enterprise and regulatory adoption follows. Utility clients evaluating AI vendors should request PSAB scores.

---

### Signal 8: AI HVAC Control — Validated Energy Savings at Scale (2026)
AI agents for HVAC control (building energy management) are delivering validated energy savings:
- Up to **37% savings in offices**
- Up to **23% savings in residential** buildings
- Up to **21% savings in educational** buildings

This makes building energy management one of the highest-ROI applications of AI in the energy sector — combining CityLearn-trained RL policies with OpenEMS IoT data and Claude reasoning for explainability. Half of advanced-market utilities are expected to use AI for coordinating distributed energy resources by the end of 2026.

---

### Signal 9: Amazon $4B Chile AWS Region — Grid Intelligence Urgency (2026)
Amazon's $4B investment to open an AWS infrastructure region in Chile (three Availability Zones, approved May 2026, operational late 2026) is the single most important LATAM energy AI signal of the year. Why:

- Chile's 63% clean electricity in 2025 is the draw, but renewable **curtailment reached 6,084 GWh in 2025** (up 7.8% YoY) — the grid is already stressed
- Adding a major AWS data center cluster intensifies demand during peak hours
- Creates urgent need for: (a) AI-driven renewable curtailment optimization, (b) datacenter-grid coordination (OpenG2G pattern), (c) demand response AI
- Turbo Energy already expanding its AI-driven energy platform in Chile for solar + storage
- EPE (Electric Power Engineers, joined Harvard SEAS PAI) is now LATAM-active after acquiring Estudios Eléctricos

**Globant opportunity window:** First mover on AI grid coordination for Chile AWS + hyperscaler clients = 12-18 month advantage before SAP/Oracle/C3.ai arrive with enterprise solutions.

---

### Signal 6: RL Demand Response Moving to Production
CityLearn hit 621★ and multiple academic/industry papers now report **production** RL deployments (not just simulations). Buildings in the EU and US are running CityLearn-trained policies for real-time demand response. First LATAM commercial building RL demand-response deployment expected H2 2026 or 2027 (Chile or Colombia likely first movers, given grid stability incentives and commercial building energy tariff structures).

---
*Auto-updated by the ingest pipeline.*
