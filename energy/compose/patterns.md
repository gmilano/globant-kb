# Composition Patterns — Energy Industry
> v9 · Updated 2026-07-14 · 8 concrete recipes with real repos

## Architecture Template

```
[Vertical platform (open source, production-proven)]
                  ↓
[Data layer: time-series DB + message broker]
                  ↓
[AI layer: LLM + agent framework + MCP tools]
                  ↓
[Output: schedule commands / operator alerts / user interface]
```

---

## P1 — Smart Home Energy Agent (Residential HEMS)

**Use case:** Residential customer bill reduction through intelligent load scheduling.
**Repos:** `agentic-ai-hems` + `FlexMeasures` + Ollama (local LLM)
**License:** MIT + Apache-2.0

```python
# Pattern: ReAct Agent for Home Energy Management
from langchain.agents import AgentExecutor, create_react_agent
from langchain_community.llms import Ollama
from flexmeasures_client import FlexMeasuresClient

# Tools the agent can use
tools = [
    get_spot_price_tool,          # Nordpool / EPEX day-ahead API
    get_appliance_state_tool,     # Home automation (Home Assistant / openHAB)
    set_appliance_schedule_tool,  # EV charger, washing machine, dishwasher
    get_weather_forecast_tool,    # PV generation forecast
    flexmeasures_schedule_tool,   # Battery/heat pump optimization
]

llm = Ollama(model="llama3.1:8b")  # Local LLM for LGPD/GDPR compliance
agent = create_react_agent(llm, tools, react_prompt)
executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# Run scheduling cycle (every 15 min or on price signal)
result = executor.invoke({
    "input": "It's 17:00. Peak price starts at 18:00 for 3 hours. "
             "EV at 40% charge (need 80% by 07:00 tomorrow). "
             "Battery at 60%. Optimize tonight's schedule to minimize cost."
})
# ReAct trace: visible reasoning chain → EU AI Act transparency requirement met
```

**Deployment:** Raspberry Pi + Ollama (Llama3.1-8B 4-bit) = €80/home, fully local, LGPD compliant.

**LATAM fit:** Brazil (ANEEL net metering Resolução 687), Chile solar prosumer, Colombia.

---

## P2 — VPP Orchestration with FlexMeasures + CrewAI

**Use case:** Virtual Power Plant managing 50+ prosumer assets for demand response.
**Repos:** `FlexMeasures` + `CrewAI` + `OpenADR 2.0b`
**License:** Apache-2.0 + MIT

```python
from crewai import Agent, Task, Crew
from flexmeasures_client import FlexMeasuresClient

fm = FlexMeasuresClient(host="https://vpp.utility.com", token=TOKEN)

# Specialist agents
forecast_agent = Agent(
    role="Demand Forecasting Specialist",
    goal="Predict aggregate prosumer load for next 24h",
    tools=[fm.get_forecasts, weather_api, historical_load_tool],
    llm="claude-sonnet-5"
)

schedule_agent = Agent(
    role="VPP Scheduler",
    goal="Maximize DR revenue while respecting comfort constraints",
    tools=[fm.post_schedule, grid_price_tool, constraint_check_tool],
    llm="claude-sonnet-5"
)

comms_agent = Agent(
    role="Prosumer Communication Manager",
    goal="Notify prosumers of DR events via WhatsApp/email",
    tools=[whatsapp_tool, email_tool, openadr_ven_tool],
    llm="claude-haiku-4-5"
)

tasks = [
    Task(description="Forecast tomorrow's aggregate load for enrolled assets",
         agent=forecast_agent, expected_output="24h probabilistic forecast JSON"),
    Task(description="Generate DR dispatch schedule for upcoming peak event",
         agent=schedule_agent, expected_output="Per-asset schedule commands"),
    Task(description="Send OpenADR event notifications to enrolled prosumers",
         agent=comms_agent, expected_output="Notification confirmation log"),
]

crew = Crew(agents=[forecast_agent, schedule_agent, comms_agent], tasks=tasks)
result = crew.kickoff()
```

**Scale:** Single FlexMeasures instance handles 10k+ assets. CrewAI crew runs per DR event.

---

## P3 — Grid Analysis Automation (PowerDAG + PowerMCP)

**Use case:** Automate distribution grid studies (load flow, fault analysis, DER dispatch optimization) for utility engineering teams.
**Repos:** `Power-Agent/PowerMCP` + `Power-Agent/PowerDAG` + `Power-Agent/PowerFM`
**License:** MIT

```python
from poweragent_mcp import PowerMCPClient
from poweragent_dag import PowerDAGAgent

# Connect to power system simulator via MCP
simulator = PowerMCPClient(
    tool="opendsss",  # or "powerworld", "psse"
    host="http://localhost:8000"
)

# Initialize agentic grid analysis
agent = PowerDAGAgent(
    simulator=simulator,
    foundation_model="PowerFM/LoadFormer",  # from Power-Agent/PowerFM
    llm="claude-sonnet-5",
    supervision_mode="just-in-time"  # human checkpoint at critical decisions
)

# Run distribution grid analysis task
report = agent.run(
    task="Analyze the impact of adding 500 kW solar PV at bus 23. "
         "Check voltage violations, identify corrective switching actions, "
         "and recommend DER dispatch schedule to maintain N-1 security.",
    grid_file="utility_33bus_network.dss",
    constraints={"voltage_pu": (0.95, 1.05), "thermal_loading_pct": 90}
)

# Output: structured report with PSABench-scored confidence
print(report.analysis)
print(report.recommendations)
print(report.reasoning_trace)  # Full audit trail for regulatory review
```

**Benchmark:** PowerDAG achieves 100% task success on PSABench (41 engineering tasks).

---

## P4 — EV Charging Fleet Manager (EVerest + FlexMeasures)

**Use case:** Managed EV charging fleet for corporate campus, logistics operator, or public network.
**Repos:** `EVerest/everest-core` + `FlexMeasures/flexmeasures` + `LangGraph`
**License:** Apache-2.0

```python
from langgraph.graph import StateGraph
from flexmeasures_client import FlexMeasuresClient
from everest_client import EVerestOCPPClient

fm = FlexMeasuresClient(host="https://fleet-ems.com", token=TOKEN)
ev = EVerestOCPPClient(csms_url="wss://fleet-ems.com/ocpp")

def fleet_scheduling_graph():
    workflow = StateGraph(FleetState)

    def observe(state):
        """Read all charger states and grid price"""
        state.charger_status = ev.get_all_charger_status()
        state.spot_price = get_spot_price()
        state.grid_limit_kw = get_grid_limit()
        return state

    def forecast_demand(state):
        """AI: predict charging demand for next 4h"""
        state.demand_forecast = fm.get_forecast(
            sensor_ids=state.ev_fleet_sensor_ids,
            horizon=timedelta(hours=4)
        )
        return state

    def optimize_schedule(state):
        """FlexMeasures: compute cost-optimal charging schedule"""
        state.schedule = fm.post_schedule(
            flex_model={
                "asset_ids": state.charger_asset_ids,
                "optimization_objective": "minimize_cost",
                "constraints": {
                    "grid_limit_kw": state.grid_limit_kw,
                    "soc_targets": state.driver_soc_targets  # from mobile app
                }
            }
        )
        return state

    def dispatch(state):
        """Apply schedule to chargers via OCPP 2.0.1"""
        for charger_id, charge_rate in state.schedule.items():
            ev.set_charging_profile(charger_id, charge_rate)
        return state

    workflow.add_sequence([observe, forecast_demand, optimize_schedule, dispatch])
    return workflow.compile()
```

**V2G extension:** ISO 15118-20 in EVerest 2026.02.0 LTS enables bidirectional charging — fleet sells energy back to grid during peak.

---

## P5 — P2P Energy Trading Agent (MARLEM + LLM Strategy)

**Use case:** Prosumer marketplace where homes/businesses trade surplus solar generation.
**Repos:** `arXiv:2602.16063 (MARLEM)` + LangGraph + FlexMeasures
**License:** MIT (MARLEM)

```python
from langchain_anthropic import ChatAnthropic
from langgraph.graph import StateGraph

class ProsumerTradingAgent:
    """LLM-enhanced bidding strategy + RL execution (arXiv:2507.14995 pattern)"""

    def __init__(self, prosumer_id: str, llm_model: str = "claude-sonnet-5"):
        self.llm = ChatAnthropic(model=llm_model)
        self.rl_policy = load_trained_rl_policy(prosumer_id)  # MARLEM-trained

    def generate_strategy(self, market_context: dict) -> dict:
        """LLM generates high-level bidding strategy"""
        strategy_prompt = f"""
        Current market: {market_context['spot_price']} $/kWh
        My solar forecast: {market_context['solar_forecast_kwh']} kWh next hour
        Battery SoC: {market_context['battery_soc_pct']}%
        Neighbors selling: {market_context['peer_offers']}

        Generate an optimal bidding strategy for the next P2P auction.
        Consider: maximize revenue, maintain min battery reserve 20%,
        prefer selling to neighbors over grid export.
        """
        strategy = self.llm.invoke(strategy_prompt)
        return parse_strategy(strategy.content)

    def execute_bid(self, strategy: dict) -> dict:
        """RL policy executes bid within strategy bounds"""
        action = self.rl_policy.act(
            state=get_current_state(),
            strategy_bounds=strategy  # LLM strategy constrains RL action space
        )
        return submit_market_bid(action)
```

**LATAM:** Chile P2P pilot markets; Brazil Resolução 482 prosumer rules create this opportunity.

---

## P6 — Building-Grid Co-Simulation (AutoB2G Pattern)

**Use case:** Utility or grid operator wants to study the impact of flexible buildings on grid stability — without writing simulation code.
**Repos:** `arXiv:2603.26005 (AutoB2G)` + CityLearn V2 + sinergym
**License:** Apache-2.0

```python
from autob2g import AutoB2GOrchestrator

# Natural language → full B2G co-simulation
orchestrator = AutoB2GOrchestrator(
    simulator="citylearn_v2",
    llm="claude-sonnet-5"
)

# Analyst describes task in natural language
result = orchestrator.run(
    task="""
    Simulate a district of 50 homes with rooftop solar (5 kW avg) and 
    EV chargers (7.4 kW). Study the impact of coordinated V2G charging
    on grid peak load for a typical Brazilian summer weekday.
    Objective: minimize peak grid demand between 18:00-21:00.
    """,
    iterations=3  # Auto-refine if simulation diverges
)

print(result.peak_reduction_pct)   # e.g., "38% peak reduction achieved"
print(result.narrative_report)     # LLM-written findings
print(result.simulation_code)      # Generated + validated CityLearn code
```

**Client value:** Energy consultants / utilities can run B2G studies without Python expertise.

---

## P7 — LATAM WhatsApp Energy Bot (FlexMeasures + WhatsApp Business API)

**Use case:** Residential prosumers in Brazil/Colombia receive energy advice and DR alerts via WhatsApp — the dominant channel in LATAM.
**Repos:** FlexMeasures + WhatsApp Business Cloud API + LangGraph + Ollama (local)
**License:** Apache-2.0 + MIT

```python
from langgraph.graph import StateGraph
from flexmeasures_client import FlexMeasuresClient
from whatsapp_business import WhatsAppClient

fm = FlexMeasuresClient(host="https://ems.utility.com.br", token=TOKEN)
wa = WhatsAppClient(token=WA_TOKEN, phone_id=PHONE_ID)

def handle_whatsapp_message(user_id: str, message: str) -> str:
    """Route WhatsApp energy queries to FlexMeasures + LLM"""

    # Detect intent
    if any(w in message.lower() for w in ["conta", "bill", "energia", "solar"]):
        # Fetch user's energy data from FlexMeasures
        consumption = fm.get_beliefs(
            sensor_id=get_user_sensor(user_id),
            event_starts_after=last_30_days()
        )
        solar = fm.get_beliefs(sensor_id=get_solar_sensor(user_id))

        # LLM in Portuguese
        response = llm.invoke(f"""
        O usuário perguntou: {message}
        Consumo últimos 30 dias: {consumption.to_json()}
        Geração solar: {solar.to_json()}
        Responda em português, de forma clara e amigável.
        """)
        return response.content

    elif "alerta" in message.lower() or "pico" in message.lower():
        # DR event check
        events = fm.get_upcoming_dr_events(user_id=user_id)
        return format_dr_alert_pt(events)

# WhatsApp webhook handler
@app.post("/webhook/whatsapp")
def whatsapp_webhook(payload: dict):
    user_id = payload["from"]
    message = payload["text"]["body"]
    reply = handle_whatsapp_message(user_id, message)
    wa.send_message(to=user_id, text=reply)
```

**LATAM context:**
- Brazil: 120M+ WhatsApp users; Pix payment integration for energy credits
- Colombia: 35M+ WhatsApp users; PSE meter payment integration
- Mexico: 88M+ users; CFE tariff queries

---

## P8 — EU AI Act Compliance Wrapper for Energy AI

**Use case:** Wrap any energy AI agent to meet EU AI Act requirements for high-risk systems (grid management, load dispatch, fault detection).
**Repos:** AINETUS + agentic-ai-hems ReAct traces + LangGraph interrupt-resume
**License:** Apache-2.0 + MIT

```python
from langgraph.graph import StateGraph, interrupt
from ainetus import XAIExplainer
import logging

audit_log = logging.getLogger("eu_ai_act_audit")

class EUAIActCompliantEnergyAgent:
    """Wrapper that adds human oversight, documentation, and XAI to energy agents"""

    def __init__(self, base_agent, xai_explainer: XAIExplainer):
        self.agent = base_agent
        self.xai = xai_explainer

    def run(self, task: str, require_human_approval: bool = True):
        # 1. Log input for technical documentation (Art. 11)
        audit_log.info(f"TASK_INPUT: {task}")

        # 2. Run agent with full reasoning trace
        result = self.agent.run(task)

        # 3. Generate XAI explanation (Art. 13 - transparency)
        explanation = self.xai.explain(
            action=result.action,
            reasoning_trace=result.reasoning_trace,
            shapley_values=self.xai.compute_shapley(result)
        )

        # 4. Human oversight checkpoint (Art. 14) for high-impact actions
        if require_human_approval and result.impact_level == "high":
            approval = interrupt({
                "action": result.action,
                "explanation": explanation,
                "confidence": result.confidence,
                "prompt": "Approve this grid action? [yes/no/modify]"
            })
            if approval["decision"] != "yes":
                result.action = approval.get("modified_action", "no_action")

        # 5. Audit trail (Art. 12 - logging)
        audit_log.info(f"ACTION: {result.action}, APPROVED: {require_human_approval}, "
                       f"EXPLANATION: {explanation.summary}")

        return result

# Usage with PowerDAG
base_agent = PowerDAGAgent(simulator=simulator, llm="claude-sonnet-5")
xai = XAIExplainer(method="shapley")  # AINETUS XAI backend
compliant_agent = EUAIActCompliantEnergyAgent(base_agent, xai)

# High-impact grid switching requires human approval
result = compliant_agent.run(
    task="Isolate fault on feeder F3, restore load via tie switch TS-12",
    require_human_approval=True
)
```

**Compliance checklist for this pattern:**
- ✅ Art. 9: Risk management system (interrupt for high-impact actions)
- ✅ Art. 11: Technical documentation (audit_log + reasoning traces)
- ✅ Art. 12: Logging (structured audit trail)
- ✅ Art. 13: Transparency (XAI explanation to operators)
- ✅ Art. 14: Human oversight (interrupt-resume checkpoint)
- ⚠️ Art. 15: Accuracy/robustness: add PSABench score to documentation

**Timeline:** Annex III high-risk deadline Dec 2, 2027; start implementation now.
