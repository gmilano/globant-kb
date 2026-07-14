# Trending AI Agents & Repos — Energy · Week of 2026-07-14
> v9 · Cycle 2 refresh — new signals since v8

## What's New This Week

### 🔥 P2P Energy Trading LLM Agent (Jul 2026)
**arXiv:2507.14995 · "LLM-Enhanced Multi-Agent RL for Real-Time P2P Energy Trading"**

Jul 2026 paper combining multi-agent reinforcement learning with LLM strategic reasoning for peer-to-peer energy markets. Each prosumer agent uses an LLM to generate high-level bidding strategies, then RL executes in real time. Benchmarked on IEEE 33-bus and real Spanish wholesale market data.
- +23% prosumer revenue vs pure RL baseline
- Dynamic coalition formation based on LLM-negotiated contracts
- **Significance:** First work combining LLM strategy + RL execution in live P2P market settings

---

### 🔥 MARLEM — Multi-Agent RL for Local Energy Markets (Feb 2026)
**[arXiv:2602.16063](https://arxiv.org/abs/2602.16063) — MIT**

Framework for simulating implicit cooperation in decentralized local energy markets (LEMs). Multi-agent RL where prosumers (homes, EV owners, BESS operators) learn competitive + cooperative strategies without explicit communication.
- Supports CityLearn V2 and custom grid topologies
- LEM auction mechanisms: pay-as-bid, uniform pricing, double auction
- Open datasets: NERL EULP + Ausgrid solar + UK SMARTEES

---

### 🔥 AutoB2G (Mar 2026)
**[arXiv:2603.26005](https://arxiv.org/abs/2603.26005) — Apache-2.0**

LLM-driven automated building-to-grid co-simulation framework. Given only a natural-language task description, the system generates, executes, and iteratively refines the full B2G simulation. Extends CityLearn V2.
- Zero code required from the analyst: "Optimize EV charging for grid peak reduction tomorrow 6–9pm" → full simulation run
- Iterative refinement: if simulation diverges, LLM corrects parameters
- **Key enabler:** Democratizes B2G studies for utilities without simulation expertise

---

### 🔥 PowerDAG Update — 100% Success Rate (Jun 2026)
**[arXiv:2603.17418](https://arxiv.org/abs/2603.17418) — evaluated on PSABench (arXiv:2606.20950)**

PowerDAG now benchmarked against PSABench (41 executable tasks across 4 power engineering domains). Key result: 100% task success with GPT-5.2, 94–97% with open-source models.
- PSABench published Jun 2026 — now the standard eval for energy AI agents
- PowerAgentBench-Dyn companion benchmark for dynamic studies (Harvard+Polimi+UBITECH)
- **Action:** Use PSABench scores to evaluate any energy AI agent before deployment

---

### 🔥 LF Energy New Projects — Jun 2026
**[LF Energy Portfolio Update](https://lfenergy.org/lf-energy-new-members-projects-and-portfolio-growth/)**

LF Energy announced new members, three new projects, and portfolio updates:
- **OpenGridFM** — grid foundation model pre-training framework (Apache-2.0)
- **AINETUS** — RL+XAI for control-room operators (Apache-2.0, graduated to LF Energy)
- **PowSyBl 2026.0.0** — final release train, IIDM 1.16, AC/DC load flow improvements
- **TenneT ReFlow** — built on PowSyBl, 10× grid security analysis speedup (production)
- **EVerest 2026.02.0 LTS** — first long-term support release, TPM 2.0, ISO 15118-20

---

### 🔥 OpenEMS 2026.3.0 (Mar 2026)
**[github.com/OpenEMS/openems](https://github.com/OpenEMS/openems)**

- Improved ENTSO-E Time-of-Use-Tariff integration
- EWS Schönau ToU tariff driver
- 2026.2.0 (Feb): Janitza UMG806 + Hager ECR380D energy meters

---

### 🔥 PSABench — Standard Energy Agent Benchmark (Jun 2026)
**[arXiv:2606.20950](https://arxiv.org/abs/2606.20950) — Executable evaluation standard**

The first executable benchmark for AI agents in electric power engineering:
- 41 tasks across 4 domains: load flow analysis, protection coordination, DER dispatch, market clearing
- PowerAgentBench-Dyn: dynamic studies (Harvard + Polimi + UBITECH)
- EnergyAgentBench: 70 live-infrastructure task variants
- **Action:** Run clients' AI energy systems against PSABench before signing off

---

### 🔥 Eletrobras + C3 AI Partnership (Brazil, Aug 2025 → production 2026)
**C3 AI Grid Intelligence platform**

Brazil's Eletrobras deployed C3 AI Grid Intelligence for real-time fault prediction across thousands of km of transmission lines. Entering production operations phase Q1 2026.
- Near-real-time SCADA monitoring at continental scale
- Predictive maintenance: identifies faults before outage
- **LATAM significance:** First continental-scale AI grid deployment in South America

---

## New Paper Radar (Jul 2026)

| Paper | Topic | Signal |
|-------|-------|--------|
| arXiv:2507.14995 | LLM + MARL for P2P energy trading | ⬆ NEW Jul 8 |
| arXiv:2606.20950 | PSABench — energy agent evaluation | ⬆ Standard |
| arXiv:2606.20401 | PowerAgentBench-Dyn | ⬆ Harvard+Polimi |
| arXiv:2603.26005 | AutoB2G building-grid co-sim | ⬆ Adopted |
| arXiv:2603.17418 | PowerDAG 100% task success | ✅ Benchmark leader |
| arXiv:2602.16063 | MARLEM P2P energy markets | 🔄 Growing |
| arXiv:2601.20005 | OptAgent building operations | 🔄 Practical |
| arXiv:2509.02494 | GridMind Argonne Lab | ✅ Production ref |

## This Week's Priority Action

1. **Start PSABench evaluation** for any energy AI proposal — it's now the credibility gate
2. **Watch P2P trading space** (arXiv:2507.14995) — utility clients asking about prosumer programs
3. **EVerest 2026.02.0 LTS** is ready for EV charging production projects — recommend over custom implementations
4. **LATAM:** Eletrobras+C3 AI sets the bar; position FlexMeasures + PowerDAG as open-source alternative for smaller utilities
