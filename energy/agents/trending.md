# Trending AI Agents — Energy (Week of 2026-07-07)

> What's new and gaining momentum in energy AI this week.
> Last updated: 2026-07-09 (v2)

## Hot This Week

### 1. OpenG2G — AI Datacenter-Grid Runtime Coordination
- **Repo**: https://github.com/gpu2grid/openg2g
- **Paper**: arXiv:2605.05519 (May 2026)
- **License**: Apache-2.0
- **Why it matters**: As AI data centers account for 8-15% of grid load by 2026, OpenG2G provides the first open simulation platform for coordinating GPU workloads with real-time grid state. Modular: swap in any grid simulator (Pandapower, PyPSA) or AI scheduler. Microsoft and Google are building proprietary versions; this is the open alternative.

### 2. Grid-Agent — LLM Multi-Agent for Grid Control
- **Paper**: arXiv:2508.05702 (Aug 2025 → updated v3 2026)
- **License**: Research (code in supplementary)
- **Why it matters**: First published system combining LLM semantic reasoning with numerical power flow solvers for autonomous grid remediation. Outperforms classical rule-based dispatch on IEEE 118-bus scenarios. Foundation for enterprise grid copilots.

### 3. X-GridAgent — LLM Power Grid Analysis
- **Paper**: arXiv:2512.20789 (Dec 2025)
- **License**: Research
- **Why it matters**: Three-layer hierarchical architecture (planning → coordination → action) for natural language power grid queries. Schema-adaptive hybrid RAG over large-scale grid datasets. Enables non-expert operators to query complex grid state in plain language.

### 4. PowerDAG — Agentic AI for Distribution Grids
- **Paper**: arXiv:2603.17418 (Mar 2026)
- **License**: Research
- **Why it matters**: Reliable agentic AI for automating distribution grid analysis. DAG execution model for deterministic multi-step analysis pipelines. Addresses utility reliability requirements for AI in critical infrastructure.

### 5. Buildrix — Agentic AI Skills for Building Engineering
- **Paper**: arXiv:2606.25139 (Jun 2026)
- **Platform**: Open community platform
- **Why it matters**: SKILL.md-style open platform for sharing and benchmarking agentic AI skills specific to building engineering (HVAC, energy, BIM). Marks the beginning of a building+energy skills marketplace.

### 6. AutoB2G — LLM Building-Grid Co-Simulation
- **Paper**: arXiv:2603.26005 (Mar 2026)
- **License**: Research
- **Why it matters**: LLM-driven framework for automated building-grid co-simulation. Bridges building energy management and grid optimization — critical for demand response and VPP aggregation.

### 7. Power Systems Agent Benchmark
- **Paper**: arXiv:2606.20950 (Jun 2026)
- **License**: MIT (dataset + eval)
- **Why it matters**: First executable benchmark for evaluating AI agents on real electric power engineering tasks. Like SWE-bench but for energy systems.

## Emerging Repos to Watch

| Repo | Why Watch |
|------|----------|
| [AI4Electricity/Awesome-AI-for-Electricity](https://github.com/AI4Electricity/Awesome-AI-for-Electricity) | Curated list of AI for electricity — growing fast with 2026 papers |
| [ps-wiki/best-of-ps](https://github.com/ps-wiki/best-of-ps) | Weekly-ranked open source power system tools |
| [OpenEnergyPlatform/awesome-sustainable-technology](https://github.com/OpenEnergyPlatform/awesome-sustainable-technology) | Sustainability-focused open dev environments, active community |
| [kaymen99/AI-for-energy-sector](https://github.com/kaymen99/AI-for-energy-sector) | Applied ML/DL models in energy — practical tutorials |
| [AvansETI/SmartGridAI](https://github.com/AvansETI/SmartGridAI) | SmartGrid AI applied research, ML for energy management |

## Key Signal: Energy AI Entering Agentic Phase (2026)

- 2022-2024: ML models for forecasting (load, price, generation)
- 2025: RL agents for single-system control (Grid2Op, sinergym)
- **2026: LLM-powered multi-agent systems for autonomous grid operations** (Grid-Agent, X-GridAgent, PowerDAG)

Energy sector is 12-18 months behind software in agent adoption — Globant has a **first-mover window** for enterprise energy agent deployments.

---
*Updated by Globant AI Studios ingestion pipeline.*
