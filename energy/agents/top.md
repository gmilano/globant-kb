# Top AI Agents & Tools — Energy

> Open source AI agents and tools for the energy industry. Focus: MIT / Apache 2.0 / BSD.
> Last updated: 2026-07-12 (v4)

## Featured Agents & Tools

| Name | Repo | License | Stars | Description |
|------|------|---------|-------|-------------|
| OpenSTEF | [OpenSTEF/openstef](https://github.com/OpenSTEF/openstef) | MPL-2.0 | ~380 | Alliander (Dutch DSO) — AutoML pipelines for probabilistic short-term grid load forecasting. Predicts horizons of hours to days. Used in production by a top-5 European DSO. MLflow integration + OpenMeteo connector shipped 2026. |
| Grid2Op | [Grid2op/grid2op](https://github.com/Grid2op/grid2op) | MPL-2.0 | ~450 | RTE France / LF Energy — Gymnasium-compatible testbed for sequential decision-making in power grids. Runs L2RPN challenges. Supports RL, heuristics, and hybrid agents for topology control and redispatching. |
| PyPSA | [PyPSA/PyPSA](https://github.com/PyPSA/PyPSA) | MIT | ~2,100 | TU Berlin — Python for Power System Analysis. Optimal power flow, unit commitment, storage, multi-sector coupling (H2, heat). The standard open tool for national/continental energy system modeling. |
| pandapower | [e2nIEE/pandapower](https://github.com/e2nIEE/pandapower) | BSD-3-Clause | ~1,200 | Fraunhofer IEE / Uni Kassel — Fast power system modeling and analysis. Newton-Raphson AC/DC power flow, short-circuit, OPF, state estimation. Pandas-based; easy to wrap with LLM agents. |
| sinergym | [ugr-sail/sinergym](https://github.com/ugr-sail/sinergym) | MIT | ~240 | Universidad de Granada — Gymnasium interface over EnergyPlus for building HVAC/energy RL. EnergyPlus 24 support. Supports multi-agent control, custom weather files. |
| PowerMCP | [Power-Agent/PowerMCP](https://github.com/Power-Agent/PowerMCP) | MIT | ~80 | Harvard SEAS / Power-Agent community — Open-source MCP servers for power system software: PowerWorld, PSS/E, OpenDSS, PSCAD. Enables LLMs to directly issue simulation commands to industry-standard power tools via MCP protocol. The fastest path to AI-driven grid analysis. |
| PowerSkills | [Power-Agent/PowerSkills](https://github.com/Power-Agent/PowerSkills) | MIT | ~60 | Harvard SEAS — Agent skill layer on top of PowerMCP. Provides AI agents with domain knowledge: which tool to reach for first, what to verify, what mitigation playbooks to apply when a study finds an operating problem. |
| PowerWF | [Power-Agent/PowerWF](https://github.com/Power-Agent/PowerWF) | MIT | ~45 | Harvard SEAS — Open-source agentic workflows for power system applications. Pre-built workflow templates: contingency analysis, N-1 studies, OPF runs, protection coordination — composable for complex multi-step tasks. |
| s4casting | [alliander-opensource/s4casting](https://github.com/alliander-opensource/s4casting) | Apache-2.0 | ~120 | Alliander — Time series foundation models specifically tuned for energy forecasting (demand, solar, wind). Fine-tunable on utility data with few-shot adaptation. Zero-shot on new substations. |
| rl-testbed-for-energyplus | [IBM/rl-testbed-for-energyplus](https://github.com/IBM/rl-testbed-for-energyplus) | MIT | ~217 | IBM — Reinforcement learning testbed for power consumption optimization using EnergyPlus building simulation. Stable Baselines 3 compatible. |
| energy-py | [ADGEfficiency/energy-py](https://github.com/ADGEfficiency/energy-py) | MIT | ~430 | Independent — RL environments for energy systems: battery dispatch, demand response, flexibility trading. Clean Gymnasium wrappers ready for LLM agent orchestration. |
| OperatorFabric | [opfab/operatorfabric-core](https://github.com/opfab/operatorfabric-core) | MPL-2.0 | ~120 | RTE France / LF Energy — Modular, industrial-strength platform for real-time utility grid operations. v4.11.0 Mar 2026. Centralizes alerts, process monitoring, operator notifications. Field-tested in European TSOs. |
| OpenEMS | [OpenEMS/openems](https://github.com/OpenEMS/openems) | EPL-2.0 | ~400 | FENECON / OpenEMS Association — Modular energy management system for storage + solar + EV charging + heat pumps. OSGi-based, production-deployed in commercial and industrial sites. |

## NEW in v4: Additional Agentic Tools (2026)

| Name | Repo | License | Stars | Description |
|------|------|---------|-------|-------------|
| EnergyAgent | [tsinghua-fib-lab/EnergyAgent](https://github.com/tsinghua-fib-lab/EnergyAgent) | MIT | ~150 | Tsinghua University FIB Lab — LLM Agent Framework specifically for electric power time series modeling and reasoning. Combines LLM tool use with energy domain time series analysis: load forecasting, fault detection, generation dispatch reasoning. Bridges LLMs and energy data pipelines. |
| agentic-ai-hems | [RedaElMakroum/agentic-ai-hems](https://github.com/RedaElMakroum/agentic-ai-hems) | MIT | ~80 | Community — Agentic AI Home Energy Management System (HEMS). LLM-based framework for residential load scheduling with autonomous specialist sub-agents, real-time electricity price optimization, transparent ReAct reasoning chains, and multi-appliance coordination. Provider-agnostic (Claude, GPT, local Ollama). Excellent reference architecture for C&I HEMS agents. |
| kaymen99/AI-for-energy-sector | [kaymen99/AI-for-energy-sector](https://github.com/kaymen99/AI-for-energy-sector) | MIT | ~200 | Community — Comprehensive ML/DL reference implementations for energy sector: predictive maintenance, grid stability prediction, demand forecasting, anomaly detection. Well-structured for rapid PoC scaffolding. |

## NEW in v4: Research-Grade Agentic Tools (2025–2026)

| Name | Reference | License | Description |
|------|-----------|---------|-------------|
| Grid-Orch | [arXiv:2605.12728](https://arxiv.org/abs/2605.12728) (May 2026) | MIT | LLM-powered orchestrator for distribution grid simulation via OpenDSS + MCP. 36 domain-specific tools across 11 categories: power flow, voltage analysis, QSTS, automated optimization. Most complete OpenDSS LLM integration. |
| PowerDAG | [arXiv:2603.17418](https://arxiv.org/abs/2603.17418) (Apr 2026) | Research | Reliable agentic AI for distribution grid analysis. Adaptive retrieval + just-in-time supervision. 100% success rate with GPT-5.2; 94.4–96.7% with open-source models. Outperforms base ReAct, LangChain, CrewAI. |
| PowerChain | [arXiv:2508.17094](https://arxiv.org/abs/2508.17094) | Research | Verifiable agentic AI for distribution grid analyses. Generates DAG workflows from natural language → executes without human-in-loop using annotated expert knowledge. |
| GridMind | [ANL / arXiv:2509.02494](https://arxiv.org/abs/2509.02494) | Research | Argonne National Lab — LLM-coordinated multi-agent system for grid control room: scheduling agent + weather/contingency agent + explanation layer. Announced Mar 2026. Promising results across multiple LLMs. |
| X-GridAgent | [arXiv:2512.20789](https://arxiv.org/abs/2512.20789) | Research | LLM-powered agentic AI for comprehensive power grid analysis via natural language. 3-layer hierarchical architecture (planning / coordination / action). Integrates RAG, MCP, domain tools: power flow, OPF, short-circuit, contingency, topology search. |
| PowerAgentBench | [Power-Agent/PowerAgentBench](https://github.com/Power-Agent) | MIT | Harvard SEAS — Benchmark for evaluating power system agents on complex multi-step operational tasks. Standardized tasks, environments, and metrics for reproducible comparison. |

## How to Use These in Globant Engagements

- **Fastest MVP path**: PowerMCP + Claude + PowerSkills → 2-3 week proof-of-concept for any utility with OpenDSS or PSS/E
- **Forecasting layer**: OpenSTEF or s4casting as the ML forecasting engine; wrap with a LangGraph agent for alerting and re-training triggers
- **Grid simulation / RL**: Grid2Op environment + Stable Baselines 3 agent for topology optimization prototypes; demo to TSO/DSO clients
- **System modeling**: PyPSA or pandapower as the physics layer; LLM agent generates scenarios and interprets OPF results in natural language
- **Building/HVAC**: sinergym for building portfolio energy optimization; chain with a Claude Haiku agent for anomaly explanation
- **Operator UI**: OperatorFabric as the operations dashboard; add MCP-based Claude agent for natural-language query over real-time grid events
- **Site EMS**: OpenEMS for behind-the-meter assets (BESS, solar, EV); expose REST API to an orchestrating LLM agent for demand-response bids
- **Reliable production agents**: PowerDAG + PowerChain patterns for utility-grade reliability (critical for regulated utility deployments)
- **HEMS / C&I building energy**: agentic-ai-hems reference architecture + EnergyAgent time series layer
- **Energy time series reasoning**: EnergyAgent (Tsinghua) for power-specific LLM+time series pipelines beyond generic forecasting

---
*Auto-updated by ingest pipeline.*
