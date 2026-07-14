# Trending This Week — Energy AI

> What's new and gaining traction in energy AI. Last updated: 2026-07-14

## Breaking: New Benchmarks Redefine Energy AI Evaluation (Jun 2026)

Three complementary benchmarks dropped in June 2026, establishing rigorous standards for power system AI agents:

- **PSABench** ([arXiv:2606.20950](https://arxiv.org/abs/2606.20950)): 41 executable task families across power flow, stability, protection, DER, microgrids, reliability, power quality, and forecasting. First truly executable benchmark for energy AI.
- **PowerAgentBench-Dyn** ([arXiv:2606.20401](https://arxiv.org/abs/2606.20401)): Harvard SEAS + Politecnico di Milano + UBITECH — evaluates agents on dynamic studies (transient stability, fault analysis).
- **EnergyAgentBench** ([arXiv:2605.15230](https://arxiv.org/abs/2605.15230)): 70 task variants spanning datacenter siting, LCOE optimization, causal grid diagnosis. First multi-family agentic benchmark on live energy infrastructure data.

**Signal**: The energy AI field is maturing fast — benchmarks are the leading indicator. Globant should track agent scores on PSABench as proxy for solution quality.

## OpenG2G: AI Inference Load as Grid Flexibility (May 2026)

[github.com/gpu2grid/openg2g](https://github.com/gpu2grid/openg2g) | MIT | arXiv:2605.05519

OpenG2G models AI datacenters and the power grid as a co-simulation loop. As hyperscalers build multi-GW campuses, their inference workloads become the largest controllable flexible load on the grid. Companion paper "Inference as Flexibility" (arXiv:2606.21833) shows transmission-connected AI data centres can provide meaningful ramp management.

**Why it matters**: Every large tech client building AI infra faces grid interconnection delays. OpenG2G provides the simulation layer to design demand-response strategies that get them interconnected faster.

## PowerDAG: 100% Task Success on Distribution Grid Analysis (Mar 2026)

[arXiv:2603.17418](https://arxiv.org/abs/2603.17418) | Power-Agent org | MIT

Supervisory agentic AI for distribution grid analysis. Achieved 100% success rate with GPT-5.2 on standardized distribution grid tasks vs. 41–88% for ReAct, 30–90% for LangChain, 9–41% for CrewAI baselines.

## EVerest 2026.02.0-LTS: Stable API for EV Charger Development

[github.com/EVerest/EVerest](https://github.com/EVerest/EVerest) | Apache-2.0 | LF Energy

First stable release under the new ~6-month cadence. Adds TPM 2.0 security, X.509-signed OTA updates, AsyncAPI reference docs, and ISO 15118-20 (Plug&Charge) readiness. US Joint Office of Energy + Transportation officially partnered with LF Energy on EVerest for national EVSE interoperability.

## FlexMeasures 0.30+ Road to VPP + S2 / OpenADR

v0.30.3 landed Jan 2026. Two biggest roadmap items confirmed: VPP algorithm module and OpenADR / S2 standard support. Both unlock DR revenue streams for fleet operators, municipalities, and building portfolios.

## Repos to Watch

| Repo | Why Watch |
|------|----------|
| [Power-Agent/PowerMCP](https://github.com/Power-Agent/PowerMCP) | MCP servers for PowerWorld/PSS/E/OpenDSS — standard grid-to-LLM interface |
| [AI4Electricity/RL2Grid](https://github.com/AI4Electricity/RL2Grid) | ICLR 2026 benchmark — standard comparison point for grid RL agents |
| [gpu2grid/openg2g](https://github.com/gpu2grid/openg2g) | Datacenter-grid coordination — emergent $100B+ market |
| [AI4Electricity/Awesome-AI-for-Electricity](https://github.com/AI4Electricity/Awesome-AI-for-Electricity) | Curated papers, datasets, software, benchmarks for ML + power systems |
