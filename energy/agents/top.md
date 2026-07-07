# Top AI Agents — Energy Industry

> Open-source AI agents and frameworks for smart grid, energy management, renewable forecasting, and demand response.
> Last updated: 2026-07-07

---

## Tier 1 — Core Energy AI Agents

### 1. PowerMCP
- **Repo:** https://github.com/Power-Agent/PowerMCP
- **License:** MIT
- **Stars:** ~178 (rapidly growing, Harvard SEAS)
- **What it does:** Open-source collection of MCP (Model Context Protocol) servers that enable LLMs to directly interact with power system software — PowerWorld, PSSE, OpenDSS, pandapower, PyPSA, and more. Functions as a universal adapter between AI agents and industrial power grid simulators.
- **Key capability:** LLMs can now directly run power flow calculations, fault analysis, and grid simulations through natural language commands via MCP.
- **Part of:** Harvard SEAS PowerAgent initiative — first open-source community for LLM-powered agentic AI in power systems.

### 2. PowerFM
- **Repo:** https://github.com/Power-Agent/PowerFM
- **License:** MIT
- **Stars:** ~90
- **What it does:** Foundation models for the power and energy domain. Maintains fine-tuned and domain-trained models for tasks including load forecasting, fault detection, grid simulation, and agent control. Collects community-contributed open-source power AI models.
- **Key models:** Fine-tuned Llama/Mistral variants on power systems data; LSTM-based load forecasting; GNN-based fault classification.

### 3. PowerWorkflow (PowerWF)
- **Repo:** https://github.com/Power-Agent/PowerWF
- **License:** MIT
- **Stars:** ~65
- **What it does:** Open-source collection of agentic workflows for power system applications. Enables intelligent automation and coordination of power system operations — from outage response to optimal dispatch.
- **Use cases:** Automated N-1 contingency analysis, restoration planning, multi-objective dispatch optimization.

### 4. CityLearn
- **Repo:** https://github.com/intelligent-environments-lab/CityLearn
- **License:** MIT
- **Stars:** 621
- **What it does:** Farama Foundation Gymnasium-compatible environment for multi-agent reinforcement learning applied to building energy coordination and demand response in cities. RL agents control HVAC, EV charging, batteries, and heat pumps to minimize grid stress.
- **Why it matters:** Production reference for demand-response RL agents — utilities and building operators deploy CityLearn-trained policies for real-time load shaping.

### 5. OpenSTEF
- **Repo:** https://github.com/OpenSTEF/openstef
- **License:** Apache-2.0
- **Stars:** ~180
- **What it does:** AutoML pipeline for probabilistic short-term energy forecasting. Developed by Alliander (major Dutch utility) and open-sourced. Handles the full ML lifecycle: data preprocessing, feature engineering, model training (XGBoost, LightGBM, linear boosting), and forecast evaluation.
- **Key capability:** Incorporates external predictors (weather, market prices) and outputs probabilistic forecasts with uncertainty bands — critical for grid balancing.

---

## Tier 2 — Research & Specialized Agents

### 6. Grid-Agent
- **Reference:** arXiv:2508.05702 (2025)
- **GitHub:** Power-Agent org
- **What it does:** LLM-powered multi-agent system for power grid control. Multiple specialized agents cooperate on real-time grid management decisions — frequency regulation, voltage control, economic dispatch.
- **Status:** Research, moving toward production prototypes.

### 7. X-GridAgent
- **Reference:** ResearchGate, 2025
- **What it does:** LLM-powered agentic AI system for assisting power grid analysis — natural language interface to complex power flow and contingency analysis workflows.
- **Key insight:** Demonstrates LLMs can meaningfully assist power engineers on grid analysis tasks previously requiring specialized software expertise.

### 8. AI-for-energy-sector
- **Repo:** https://github.com/kaymen99/AI-for-energy-sector
- **License:** MIT
- **Stars:** ~350
- **What it does:** Comprehensive collection of ML and DL models applied to the energy sector: load forecasting, fault detection, demand response optimization, renewable generation prediction. Practical reference implementation with multiple algorithms.

### 9. GreenGuard
- **Repo:** Available via awesome-sustainable-technology
- **License:** Open source
- **What it does:** End-to-end ML solutions for wind energy monitoring. Covers turbine fault detection, performance degradation tracking, and predictive maintenance using sensor time-series data.

### 10. SMART-GRID Multi-Agent RL
- **Repo:** Referenced in Medium + GitHub
- **License:** Open source
- **What it does:** Multi-agent reinforcement learning simulator for electric grids. Each generator, consumer, and storage unit is modeled as an independent DQN agent. Improves grid efficiency and robustness through cooperative RL.

### 11. SmartGrid-Optimizer-AI
- **Repo:** https://github.com/starlinks123/SmartGrid-Optimizer-AI-Driven-Renewable-Energy-Management
- **License:** Open source
- **What it does:** Predictive AI system that reduces renewable energy waste 20-30% through optimized storage and distribution. Forecasts solar/wind generation and dynamically manages battery storage to stabilize grids.

### 12. Awesome-AI-for-Electricity
- **Repo:** https://github.com/AI4Electricity/Awesome-AI-for-Electricity
- **License:** Open source
- **Stars:** ~400
- **What it does:** Curated collection of papers, datasets, software, benchmarks, and resources at the intersection of ML and electric power systems. Focus areas: Smart Grids, Load Forecasting, Power System Optimization, Electricity Markets, Digital Twins.
- **Value:** Research compass for energy AI practitioners — identifies state-of-the-art across all sub-domains.

---

## Agent Selection Guide

| Use Case | Agent | Maturity |
|----------|-------|----------|
| LLM ↔ power simulator integration | PowerMCP | Production-ready |
| Demand response / HVAC control | CityLearn | Production-ready |
| Short-term load forecasting | OpenSTEF | Production-ready |
| Foundation models for power domain | PowerFM | Research/Beta |
| Agentic grid workflows | PowerWorkflow | Beta |
| Wind turbine monitoring | GreenGuard | Beta |
| Grid control multi-agent | Grid-Agent | Research |

---
*Auto-updated by the ingest pipeline.*
