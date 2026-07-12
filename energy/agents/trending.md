# Trending — Energy AI (Week of 2026-07-12)

> What's new and gaining momentum this week. v4 update.

## Hot Repos This Week

| Repo | License | Why Trending |
|------|---------|--------------|
| [Power-Agent/PowerMCP](https://github.com/Power-Agent/PowerMCP) | MIT | Harvard SEAS — MCP servers for PowerWorld, PSSE, OpenDSS, PSCAD. First open collection of MCP tools for industry-standard power simulators; enabling instant LLM-driven grid studies without custom API wrappers |
| [Power-Agent/PowerSkills](https://github.com/Power-Agent/PowerSkills) | MIT | Harvard SEAS — Domain-aware agent skills on top of PowerMCP; tells agents which tool to reach for first and what mitigation playbooks to apply; completes the PowerAgent stack |
| [PowerGridModel/power-grid-model](https://github.com/PowerGridModel/power-grid-model) | MIT | Alliander/LF Energy — Python/C++ distribution power system analysis library hitting 10M+ PyPI downloads; production at three main Dutch DSOs; 7th meetup May 2026 — reaching critical mass |
| [tsinghua-fib-lab/EnergyAgent](https://github.com/tsinghua-fib-lab/EnergyAgent) | MIT | Tsinghua FIB Lab — LLM agent framework specifically for electric power time series reasoning; fills the gap between generic LLM agents and power-domain reasoning |
| [RedaElMakroum/agentic-ai-hems](https://github.com/RedaElMakroum/agentic-ai-hems) | MIT | Agentic AI Home Energy Management System — multi-agent LLM architecture for residential/C&I load scheduling; transparent ReAct chains + multi-appliance coordination; provider-agnostic |
| [alliander-opensource/s4casting](https://github.com/alliander-opensource/s4casting) | Apache-2.0 | Alliander — Zero-shot energy forecasting on new substations; outperforming classic XGBoost; driving DSO adoption |
| [emarche/RL2Grid](https://github.com/emarche/RL2Grid) | MIT | ICLR 2026 workshop paper gaining traction — the new standardized Grid2Op benchmark |
| [gridfm/gridfm-datakit](https://github.com/gridfm/gridfm-datakit) | Apache-2.0 | IBM / Hydro-Quebec / LF Energy — OPF training data generator for grid foundation models; picking up contributors as GridFM community grows |
| [openremote/openremote](https://github.com/openremote/openremote) | AGPL-3.0 | 1,800+ stars; EV charger + BESS + solar integrations shipped; gaining energy vertical traction with flow-based rules engine |
| [VectorInstitute/HV-Ai-C](https://github.com/VectorInstitute/HV-Ai-C) | Apache-2.0 | Vector Institute + TELUS RL for HVAC; rare published production result: 15–20% energy reduction; referenced for DR agent design |

## Emerging Signals

### Power Grid Model Reaches 10M Downloads — Production at Three Dutch DSOs (NEW)

**Power Grid Model** (`PowerGridModel/power-grid-model`, MIT, Alliander/LF Energy) has crossed 10 million PyPI downloads and is in production at Alliander, Enexis, and Stedin — the three main Netherlands DSOs. The 7th Power Grid Model Meetup was held May 2026 with growing community. Key features:
- High-performance Python/C++ calculation core for distribution power flow and state estimation
- `power-grid-model-ds`: Data Science toolkit — graph algorithms via rustworkx, network mutation modeling, visualization
- `power-grid-model-io`: Converts IEC CIM, CGMES, and other formats to PGM
- LF Energy Early Adoption stage — production-validated at scale
- Enables batch simulation of millions of scenarios for grid planning AI

**Significance**: This is now the most production-proven open-source distribution grid engine in Europe. Pair with LangGraph agents for AI-driven distribution planning.

### Eletrobras + C3 AI Grid Intelligence — LATAM Benchmark Case (NEW)

The largest power utility in Latin America (**Eletrobras**) has scaled C3 AI Grid Intelligence from 10 substations (2024 pilot) to **full transmission network deployment** (2026). Key capability: detects and resolves disruptions — wildfires near lines, equipment failures — in **under 10 seconds** (vs. minutes-to-hours manually). Built on C3 Agentic AI Platform processing real-time IoT sensor data. This sets the LATAM benchmark for:
- What "production AI for grid operations" looks like
- Speed targets that open-source alternatives must match
- The type of engagement Globant should position for with other LATAM utilities

### Brazil + Chile: Structural LATAM Demand for Grid AI (NEW)

- **Brazil**: National smart meter rollout + AI for transmission network (ANEEL mandate). Eletrobras/C3 AI scaling proves the market. GridTech LATAM 2026 conference active.
- **Brazil**: 40%+ of LATAM data center investment — aging transmission network is the key bottleneck as AI data centers surge.
- **Chile**: 63% renewable electricity in 2025 — leading LATAM in renewables. Grid management AI needed to handle curtailment and volatility.
- **LATAM data center boom**: Mega-campuses in Rio de Janeiro, Santiago, Mexico City, Campinas — each requiring reliable AI-managed power. Direct opportunity for grid AI consulting.

### MCP Protocol Becomes the Standard Interface for Power System AI

The Model Context Protocol (MCP) is rapidly becoming the standard way to connect LLMs to power system simulators. **PowerMCP** (Harvard SEAS) provides MCP servers for PowerWorld, PSS/E, OpenDSS, and PSCAD. **Grid-Orch** (arXiv:2605.12728, May 2026) provides 36 MCP tools for OpenDSS. **X-GridAgent** uses MCP as the action layer in its 3-tier architecture. This convergence means:
- Utilities that already have OpenDSS/PSS/E can connect an LLM in days
- No bespoke API wrapper code required per simulator
- Skills (PowerSkills) and workflows (PowerWF) become portable across simulators

### Verified / Reliable Agentic AI for Utility-Grade Deployments

Two important papers address the reliability gap for deploying AI agents in regulated utility environments:
- **PowerDAG** (Apr 2026, arXiv:2603.17418): Adaptive retrieval + just-in-time supervision → 100% success rate with GPT-5.2; 94.4–96.7% with open-source models.
- **PowerChain** (arXiv:2508.17094): Verifiable agentic AI that generates auditable DAG workflows from natural language; outputs are traceable — critical for NERC CIP and EU regulatory environments.

### Agentic AI Market Growth Revised Upward

Mordor Intelligence 2026 report: **Agentic AI in Energy & Utilities** growing at **37.49% CAGR** from $0.64B (2025) → **$3.14B by 2030**. Renewable energy integration is the fastest segment at **40.98% CAGR**. This is the fastest-growing energy AI sub-segment and represents the biggest near-term opportunity for Globant.

## LATAM-Specific Activity

- **Brazil**: Eletrobras + C3 AI Grid Intelligence scaling to full national transmission network — sets LATAM benchmark
- **Brazil**: ANEEL smart grid AI guidelines (May 2026) creating demand for grid AI consulting engagements
- **Colombia**: XM (grid operator) piloting ML-based congestion forecasting — potential Globant engagement
- **Chile**: 63% renewable electricity; CNE renewable curtailment reduction RFPs — PyPSA-based modeling is the open standard
- **Mexico**: CFE AI pilot for predictive maintenance of transmission assets — Globant should track RFP
- **LATAM-wide**: AI data center boom (Santiago, Rio, Campinas, CDMX) creating grid pressure that requires AI grid management investment

---
*Auto-updated by ingest pipeline.*
