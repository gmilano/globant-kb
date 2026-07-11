# Trending — Energy AI (Week of 2026-07-11)

> What's new and gaining momentum this week. v3 update.

## Hot Repos This Week

| Repo | License | Why Trending |
|------|---------|--------------|
| [Power-Agent/PowerMCP](https://github.com/Power-Agent/PowerMCP) | MIT | Harvard SEAS — MCP servers for PowerWorld, PSSE, OpenDSS, PSCAD. First open collection of MCP tools for industry-standard power simulators; enabling instant LLM-driven grid studies without custom API wrappers |
| [Power-Agent/PowerSkills](https://github.com/Power-Agent/PowerSkills) | MIT | Harvard SEAS — Domain-aware agent skills on top of PowerMCP; tells agents which tool to reach for first and what mitigation playbooks to apply; completes the PowerAgent stack |
| [Power-Agent/PowerWF](https://github.com/Power-Agent/PowerWF) | MIT | Harvard SEAS — Pre-built agentic workflows for contingency analysis, N-1 studies, OPF; drastically shortens time to first working power system agent |
| [alliander-opensource/s4casting](https://github.com/alliander-opensource/s4casting) | Apache-2.0 | Alliander — Zero-shot energy forecasting on new substations; outperforming classic XGBoost; driving DSO adoption |
| [emarche/RL2Grid](https://github.com/emarche/RL2Grid) | MIT | ICLR 2026 workshop paper gaining traction — the new standardized Grid2Op benchmark |
| [gridfm/gridfm-datakit](https://github.com/gridfm/gridfm-datakit) | Apache-2.0 | IBM / Hydro-Quebec / LF Energy — OPF training data generator for grid foundation models; picking up contributors as GridFM community grows |
| [openremote/openremote](https://github.com/openremote/openremote) | AGPL-3.0 | 1,800+ stars; EV charger + BESS + solar integrations shipped; gaining energy vertical traction with flow-based rules engine |
| [VectorInstitute/HV-Ai-C](https://github.com/VectorInstitute/HV-Ai-C) | Apache-2.0 | Vector Institute + TELUS RL for HVAC; rare published production result: 15–20% energy reduction; referenced for DR agent design |

## Emerging Signals

### MCP Protocol Becomes the Standard Interface for Power System AI

The Model Context Protocol (MCP) is rapidly becoming the standard way to connect LLMs to power system simulators. **PowerMCP** (Harvard SEAS) provides MCP servers for PowerWorld, PSS/E, OpenDSS, and PSCAD. **Grid-Orch** (arXiv:2605.12728, May 2026) provides 36 MCP tools for OpenDSS. **X-GridAgent** uses MCP as the action layer in its 3-tier architecture. This convergence means:
- Utilities that already have OpenDSS/PSS/E can connect an LLM in days
- No bespoke API wrapper code required per simulator
- Skills (PowerSkills) and workflows (PowerWF) become portable across simulators

### Verified / Reliable Agentic AI for Utility-Grade Deployments

Two important papers address the reliability gap for deploying AI agents in regulated utility environments:
- **PowerDAG** (Apr 2026, arXiv:2603.17418): Adaptive retrieval + just-in-time supervision → 100% success rate with GPT-5.2; 94.4–96.7% with open-source models. Specifically designed to be more reliable than base ReAct/LangChain/CrewAI.
- **PowerChain** (arXiv:2508.17094): Verifiable agentic AI that generates auditable DAG workflows from natural language; outputs are traceable and explainable — critical for NERC CIP and EU regulatory environments.
- **Key signal**: Utilities are ready to move from PoC to production; reliability and auditability are now the gating criteria.

### Argonne National Lab GridMind (Announced Mar 2026)

Argonne National Laboratory publicly announced **GridMind** (arXiv:2509.02494) — a multi-agent AI system for grid control room operations. A scheduling agent + weather/contingency simulation agent + LLM-based explanation layer work in concert. Argonne ran experiments across multiple state-of-the-art LLMs with promising accuracy and reliability results. This is the US DOE national lab equivalent of what GridMind does — a major credibility signal for energy AI agents at utility grade.

### Virtual Power Plant (VPP) Orchestration with LLM Agents

Multiple new repos this month build VPP controllers on top of OpenEMS + LangGraph. Pattern: OpenEMS handles device-level BESS/EV/solar telemetry → LangGraph multi-agent decides dispatch → MQTT pushes commands back. smartEMS-MultiAgent-Demo is the community reference.

### Foundation Models for Energy Time Series

s4casting (Alliander) and Moirai-Energy forks are replacing classic XGBoost/LightGBM in utility forecasting stacks. Zero-shot forecasting on new substations is the killer app — DSOs expanding the grid can't wait 2 years for training data.

### Carbon-Aware Scheduling

New open-source tools for carbon-intensity-aware workload scheduling: `microsoft/carbon-aware-sdk` (MIT), `tmrowco/electricitymap-contrib` (MIT). Growing demand from data center and industrial clients with Scope 2 commitments.

### IEC 61850 Python Bindings

`pyiec61850-ng` (GPL-3.0) gaining activity — enables Python AI agents to communicate natively with substation automation equipment (IEDs). Critical for brownfield grid AI deployments.

## LATAM-Specific Activity

- **Brazil**: ANEEL smart grid AI guidelines published May 2026 — creating demand for grid AI consulting engagements
- **Colombia**: XM (grid operator) piloting ML-based congestion forecasting — potential Globant engagement
- **Chile**: CNE issued renewable curtailment reduction RFPs — PyPSA-based modeling is the open standard
- **Mexico**: CFE announced AI pilot for predictive maintenance of transmission assets — Globant should track RFP

---
*Auto-updated by ingest pipeline.*
