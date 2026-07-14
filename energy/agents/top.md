# Top AI Agents & Tools — Energy Industry
> v9 · Updated 2026-07-14 · Cycle 2 deep-refresh

## Quick Reference

| # | Agent / Tool | Repo | License | Stars | Description |
|---|---|---|---|---|---|
| 1 | **PowerMCP** | [Power-Agent/PowerMCP](https://github.com/Power-Agent/PowerMCP) | MIT | ~400 | MCP servers for PowerWorld, PSS-E, OpenDSS — LLMs call power simulation tools natively |
| 2 | **PowerDAG** | [Power-Agent/PowerDAG](https://github.com/Power-Agent/PowerDAG) | MIT | ~350 | Supervisory agentic AI for distribution grid analysis; 100% task success on PSABench (arXiv:2603.17418) |
| 3 | **PowerFM** | [Power-Agent/PowerFM](https://github.com/Power-Agent/PowerFM) | MIT | ~250 | Foundation-model registry for power domain: load forecasting, fault detection, grid Q&A |
| 4 | **PowerWF** | [Power-Agent/PowerWF](https://github.com/Power-Agent/PowerWF) | MIT | ~150 | Agentic workflow library for power system automation — wires PowerMCP + PowerFM into pipelines |
| 5 | **FlexMeasures** | [FlexMeasures/flexmeasures](https://github.com/FlexMeasures/flexmeasures) | Apache-2.0 | ~900 | LF Energy intelligent EMS: demand response, VPP scheduling, OpenADR/S2; v0.31 adds forecasting API |
| 6 | **agentic-ai-hems** | [RedaElMakroum/agentic-ai-hems](https://github.com/RedaElMakroum/agentic-ai-hems) | MIT | ~200 | Home Energy Management System — ReAct agent optimizing real-time tariffs + multi-appliance scheduling |
| 7 | **GridMind** | [Argonne-National-Laboratory/GridMind](https://github.com/Argonne-National-Laboratory/GridMind) | MIT | ~320 | Argonne National Lab — LLM + deterministic solvers for conversational power system analysis (arXiv:2509.02494) |
| 8 | **AutoB2G** | [arXiv:2603.26005](https://arxiv.org/abs/2603.26005) | Apache-2.0 | — | LLM-driven building-to-grid co-simulation; extends CityLearn V2 for B2G interaction (Mar 2026) |
| 9 | **AINETUS** | [lf-energy/ainetus](https://github.com/lf-energy/ainetus) | Apache-2.0 | ~130 | RL + XAI decision support for grid control-room operators; Shapley-value explanations |
| 10 | **OptAgent** | [arXiv:2601.20005](https://arxiv.org/abs/2601.20005) | MIT | — | Agentic AI for intelligent building operations: HVAC scheduling, occupancy prediction, demand flex |

## Detailed Profiles

### 1. PowerMCP — `Power-Agent/PowerMCP`
**Harvard SEAS PowerAgent ecosystem**

Wraps commercial and open power system simulators as MCP tool servers. Enables Claude, GPT, and local LLMs to call `run_powerflow()`, `run_contingency()`, `get_bus_voltage()` as first-class tool calls.

**Supported backends:**
- PowerWorld Simulator (COM API)
- Siemens PSS-E (Python API)
- OpenDSS (py-dss-interface)
- PSCAD (via command-line wrapper)

**Install:**
```bash
pip install poweragent-mcp
python -m poweragent_mcp.server --tool opendsss --port 8000
```

**When to use:** Client runs commercial power system software and wants AI reasoning on top of simulation results. The MCP layer means zero simulator code rewrite.

---

### 2. PowerDAG — `Power-Agent/PowerDAG`
**arXiv:2603.17418 · Harvard SEAS, Mar 2026**

Supervisory agent system for multi-step distribution grid analysis. Introduces _adaptive retrieval_ (selects the right tool call from a scored candidate set) and _just-in-time supervision_ (human-in-the-loop injection at decision nodes).

**Benchmark results:**
- 100% task success with GPT-5.2 on PSABench (41 tasks)
- 94.4–96.7% with Llama 3.3 / Mistral-24B open-source backends
- Compared to ReAct baseline: +38 pp success, 2.1× fewer hallucinated tool calls

**Typical tasks automated:**
- Load profile analysis → DER dispatch recommendation
- Fault isolation → switching sequence plan
- Voltage violation → corrective action list

---

### 3. PowerFM — `Power-Agent/PowerFM`
**Foundation Model Registry for Power & Energy**

Not a single model but a standardized registry of domain-adapted checkpoints with unified inference interface.

**Included models:**
| Model | Task | Base | Delta vs baseline |
|-------|------|------|------------------|
| PowerBERT | Fault classification from SCADA logs | BERT-large | +19% F1 |
| LoadFormer | Probabilistic 24h load forecasting | PatchTST | −12% MAPE |
| GridSim-LLM | IEC 61968/61970 topology Q&A | Llama-3.1-8B | 78% exact-match |
| FaultScan-VLM | Inspection image → defect type | InternVL2 | 91% acc (7-class) |

---

### 4. FlexMeasures — `FlexMeasures/flexmeasures` ⭐ LF Energy
**v0.31 (Jun 2026) — Production-grade demand response EMS**

The go-to open platform for building virtual power plant (VPP) applications and demand-response services.

**v0.31 highlights:**
- Forecasting REST API (`GET /forecasts/{sensor_id}`) — hourly/15-min probabilistic forecasts
- OpenADR 2.0b VEN stable (connects to utility DR programs out of box)
- S2 protocol (CER-IoP) connector in beta — for residential HEMS integration
- Visual annotations restored on time-series dashboard
- Scheduling: battery, EV, heat pump, industrial load

**Deployment:** Docker + PostgreSQL (single `docker compose up`). Runs on Raspberry Pi through AWS/Azure enterprise.

---

### 5. agentic-ai-hems — `RedaElMakroum/agentic-ai-hems`
**ReAct-based Home Energy Management, arXiv:2510.26603**

Proof-of-concept (and growing production template) for residential agentic HEMS. Uses ReAct reasoning chains to make load scheduling decisions transparent and auditable.

**Architecture:**
```
[Electricity spot price API] → [ReAct Agent (LLM)]
[Appliance state sensors]  →           ↓
[Comfort constraints]      → [Schedule plan + reasoning trace]
                                        ↓
                           [Home automation commands]
```

**Key feature:** Every scheduling decision includes a reasoning trace — critical for consumer trust and regulatory explainability (EU AI Act).

---

### 6. GridMind — Argonne National Laboratory
**Multi-agent system for power system operators, arXiv:2509.02494**

Bridges LLM reasoning with deterministic AC/DC optimal power flow solvers and contingency analysis engines — conversational scientific computing for the control room.

**Multi-agent setup:**
- `PlannerAgent` — decomposes operator natural-language query into solver steps
- `ExecutorAgent` — runs MATPOWER / PowerModels.jl / OpenDSS computations
- `ValidatorAgent` — checks results for physical plausibility before presenting

---

### 7. AINETUS — LF Energy
**RL + XAI for control-room operators**

Trains RL policies (PPO/SAC via Stable Baselines3) for N-1 contingency handling and load shedding, then wraps every recommended action with Shapley-value XAI explanations so operators understand _why_.

**Integration:** OperatorFabric card API — alerts appear directly in the operator console as structured recommendation cards with explanation text.

---

## License Quick-Reference

| License | Agents | Commercial use | Patent grant |
|---------|--------|----------------|--------------|
| MIT | PowerMCP, PowerDAG, PowerFM, PowerWF, agentic-ai-hems, GridMind | ✅ | ❌ |
| Apache-2.0 | FlexMeasures, AutoB2G, AINETUS | ✅ | ✅ |

## Selection Matrix

| Use Case | Recommended Stack |
|---|---|
| Power simulation + AI reasoning | PowerMCP + PowerDAG |
| VPP / demand response | FlexMeasures (+ OpenADR) |
| Residential HEMS | agentic-ai-hems |
| Control room decision support | GridMind + AINETUS |
| Building-grid co-simulation | AutoB2G + OptAgent |
| EV charging network | EVerest + FlexMeasures |
| LATAM residential + WhatsApp | agentic-ai-hems + WhatsApp Business API |
