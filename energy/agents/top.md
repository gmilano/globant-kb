# Top AI Agents — Energy Industry

> Open-source AI agents and frameworks for smart grid, energy management, renewable forecasting, and demand response.
> Last updated: 2026-07-08

---

## Tier 1 — Core Energy AI Agents

### 1. PowerMCP
- **Repo:** https://github.com/Power-Agent/PowerMCP
- **License:** MIT
- **Stars:** ~178+ (rapidly growing, Harvard SEAS)
- **What it does:** Open-source collection of MCP (Model Context Protocol) servers that enable LLMs to directly interact with power system software — PowerWorld, PSSE, OpenDSS, pandapower, PyPSA, ANDES, PSCAD, PowerFactory, and more. Functions as a universal adapter between AI agents and industrial power grid simulators. CLI wizard auto-configures Claude Desktop and Claude Code for power grid workflows.
- **Key capability:** LLMs can now directly run power flow calculations, fault analysis, and grid simulations through natural language commands via MCP. Base install includes open-source engines (pandapower, PyPSA, PowerIO); other tools are opt-in extras.
- **Part of:** Harvard SEAS PowerAgent initiative — first open-source community for LLM-powered agentic AI in power systems.

### 2. PowerFM
- **Repo:** https://github.com/Power-Agent/PowerFM
- **License:** MIT
- **Stars:** ~90
- **What it does:** Foundation models for the power and energy domain. Maintains fine-tuned and domain-trained models for tasks including load forecasting, fault detection, grid simulation, and agent control. Community-contributed power AI models.
- **Key models:** Fine-tuned Llama/Mistral variants on power systems data; LSTM-based load forecasting; GNN-based fault classification.

### 3. PowerWorkflow (PowerWF)
- **Repo:** https://github.com/Power-Agent/PowerWF
- **License:** MIT
- **Stars:** ~65
- **What it does:** Open-source collection of agentic workflows for power system applications. Enables intelligent automation and coordination of power system operations — from outage response to optimal dispatch.
- **Use cases:** Automated N-1 contingency analysis, restoration planning, multi-objective dispatch optimization.

### 4. PowerSkills
- **Repo:** https://github.com/Power-Agent/PowerSkills
- **License:** MIT
- **What it does:** Agent skills for power system analysis. Provides AI agents with specialized knowledge and instructions for performing power system simulations, analysis, and optimization. Companions to PowerMCP providing domain-specific prompt engineering and tool-use patterns.
- **Key skills:** Load flow interpretation, contingency ranking, unit commitment, economic dispatch, grid topology reasoning.

### 5. CityLearn
- **Repo:** https://github.com/intelligent-environments-lab/CityLearn
- **License:** MIT
- **Stars:** 621
- **What it does:** Farama Foundation Gymnasium-compatible environment for multi-agent reinforcement learning applied to building energy coordination and demand response in cities. RL agents control HVAC, EV charging, batteries, and heat pumps to minimize grid stress.
- **Why it matters:** Production reference for demand-response RL agents — utilities and building operators deploy CityLearn-trained policies for real-time load shaping. Compatible with Stable-Baselines3, RLlib, TF-Agents, CleanRL.

### 6. OpenSTEF
- **Repo:** https://github.com/OpenSTEF/openstef
- **License:** Apache-2.0
- **Stars:** ~180
- **What it does:** AutoML pipeline for probabilistic short-term energy forecasting. Developed by Alliander (major Dutch utility) and open-sourced under LF Energy. Handles the full ML lifecycle: data preprocessing, feature engineering, model training (XGBoost, LightGBM, linear boosting), forecast evaluation, and retraining triggers.
- **Key capability:** Incorporates external predictors (weather, market prices) and outputs probabilistic forecasts (P10/P50/P90) with uncertainty bands — critical for grid balancing and reserve scheduling.
- **Production proof:** Alliander runs OpenSTEF in production across its entire Dutch distribution network.

---

## Tier 2 — Research & Specialized Agents

### 7. Grid2Op
- **Repo:** https://github.com/Grid2op/grid2op
- **License:** MPL v2.0
- **Stars:** ~700
- **What it does:** Versatile open-source Python framework by RTE France (French TSO) for modeling and simulating sequential decision-making in power systems. Supports advanced RL algorithms, heuristic methods, and optimization strategies for realistic grid operations. RL2Grid (arXiv:2503.23101, 2026) establishes it as the standard benchmark for evaluating RL agents in power grid operations.
- **Key capability:** Realistic grid constraints (thermal limits, reconnection time, N-1 security) that test RL agent robustness under actual power system physics.

### 8. energy-py
- **Repo:** https://github.com/ADGEfficiency/energy-py
- **License:** MIT
- **What it does:** Reinforcement learning for energy systems — focused on building energy management and demand response. Lightweight and hackable RL framework for experimenting with energy agent designs before scaling to production.

### 9. AI-for-energy-sector
- **Repo:** https://github.com/kaymen99/AI-for-energy-sector
- **License:** MIT
- **Stars:** ~350
- **What it does:** Comprehensive collection of ML and DL models applied to the energy sector: load forecasting, fault detection, demand response optimization, renewable generation prediction. Practical reference implementation with multiple algorithms — good starting point for LATAM utility pilots.

### 10. SmartGrid-Optimizer-AI
- **Repo:** https://github.com/starlinks123/SmartGrid-Optimizer-AI-Driven-Renewable-Energy-Management
- **License:** Open source
- **What it does:** Predictive AI system that reduces renewable energy waste 20-30% through optimized storage and distribution. Forecasts solar/wind generation and dynamically manages battery storage to stabilize grids.

### 11. Awesome-AI-for-Electricity
- **Repo:** https://github.com/AI4Electricity/Awesome-AI-for-Electricity
- **License:** Open source
- **Stars:** ~400
- **What it does:** Curated collection of papers, datasets, software, benchmarks, and resources at the intersection of ML and electric power systems. Focus areas: Smart Grids, Load Forecasting, Power System Optimization, Electricity Markets, Digital Twins.
- **Value:** Research compass for energy AI practitioners — identifies state-of-the-art across all sub-domains.

### 12. OpenG2G
- **Repo:** arXiv:2605.05519 (2026) — simulation platform for AI Datacenter-Grid Runtime Coordination
- **License:** Open source (forthcoming)
- **What it does:** Simulation and coordination platform for managing the real-time interaction between AI data centers and power grids. Addresses the emerging challenge of AI workloads consuming 17%+ more grid electricity in 2025 and requiring intelligent load-shifting to avoid grid stress.
- **Why it matters now:** LATAM power grids (Brazil, Chile, Colombia) are straining under AI data center demand surges — OpenG2G provides the AI ↔ grid coordination framework to manage this load.

---

## Agent Selection Guide

| Use Case | Agent | Maturity |
|----------|-------|----------|
| LLM ↔ power simulator integration | PowerMCP | Production-ready |
| Demand response / HVAC / EV / battery control | CityLearn | Production-ready |
| Short-term load forecasting (utility-grade) | OpenSTEF | Production-ready |
| Grid RL simulation & benchmarking | Grid2Op | Research / Production pilots |
| Foundation models for power domain | PowerFM | Research/Beta |
| Agentic grid workflows (outage, dispatch) | PowerWorkflow | Beta |
| Power system agent skill prompts | PowerSkills | Beta |
| Renewable energy waste reduction | SmartGrid-Optimizer-AI | Beta |
| Grid control multi-agent (LLM) | Grid-Agent (PowerAgent) | Research |
| Datacenter-grid load coordination | OpenG2G | Research / Emerging |

---
*Auto-updated by the ingest pipeline.*
