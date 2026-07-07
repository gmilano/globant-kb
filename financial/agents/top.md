# Top AI Agents — Financial Industry

> Selección curada de los mejores agentes open source para finanzas.
> Última actualización: 2026-07-07

## Los 12 agentes más relevantes

| # | Nombre | Licencia | Stars | Descripción |
|---|--------|----------|-------|-------------|
| 1 | [TradingAgents](https://github.com/TauricResearch/TradingAgents) | Apache-2.0 | ~91.6k | Multi-agent LLM framework que simula una trading firm completa: analistas, researchers, trader, risk manager, portfolio manager. Usa LangGraph. |
| 2 | [ai-hedge-fund](https://github.com/virattt/ai-hedge-fund) | MIT | ~60.9k | 19 agentes: 13 inversores legendarios (Buffett, Munger, Burry...) + agentes de valuación, sentiment, fundamentals, técnicos, risk, portfolio manager. |
| 3 | [FinRobot](https://github.com/AI4Finance-Foundation/FinRobot) | Apache-2.0 | ~7.5k | Plataforma de agentes financieros con pipeline agents (data/análisis/modelado/síntesis/reporte) + debate agents (bull/bear/judge). DCF, LBO, comps. |
| 4 | [FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | MIT | ~20.8k | Fine-tuning de LLMs para finanzas: sentiment, forecasting, robo-advisory. $300 en lugar de $2.67M de BloombergGPT. LoRA sobre Llama-2/Falcon/Qwen. |
| 5 | [FinRL](https://github.com/AI4Finance-Foundation/FinRL) | MIT | ~15.7k | Primer framework open source de reinforcement learning financiero. Agentes DRL (A2C/DDPG/PPO/TD3/SAC) para trading DOW30, crypto, HFT, portfolios. |
| 6 | [OpenBB](https://github.com/OpenBB-finance/OpenBB) | MIT | ~37k | Open data platform para analistas, quants y AI agents. MCP server nativo; "connect once, consume everywhere". Alternativa open source a Bloomberg Terminal. |
| 7 | [LEAN](https://github.com/QuantConnect/Lean) | Apache-2.0 | ~12k | Motor de trading algorítmico en producción: backtest + live trading. Python/C#. 300k+ inversores. Mia (AI agent) integrado para diseño y ejecución de estrategias. |
| 8 | [Marble](https://github.com/checkmarble/marble) | BSL-1.1 | ~553 | Motor de decisiones en tiempo real para AML y fraude. Transaction monitoring, screening sanctions/PEP, investigación de casos. Alternativa a ComplyAdvantage. |
| 9 | [Jube](https://github.com/jube-home/aml-fraud-transaction-monitoring) | AGPL-3.0 | ~200 | AML + fraud: ML supervisado y no supervisado, rule-based detection, sanctions screening, workflow de case management con audit trail. Docker/Kubernetes. |
| 10 | [FinWorld](https://github.com/TradeMaster-NTU/FinWorld) | Apache-2.0 | ~300 | Framework unificado de NTU para investigación end-to-end: ML+DRL+LLM agents en forecasting de series temporales, trading algorítmico, gestión de portfolios. |
| 11 | [Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) | MIT | ~500 | Multi-agent workspace de HKUDS: generación de estrategias, backtests y análisis de mercado en tiempo real. Research conversacional para trading. |
| 12 | [OpenAlice](https://github.com/TraderAlice/OpenAlice) | MIT | ~400 | "One-person Wall Street": AI trading agent para equities, crypto, commodities, forex y macro — desde research hasta ejecución y salida de posición. |

---

## Frameworks de agentes aplicados a finanzas

| Framework | Licencia | Uso financiero | Ventaja |
|-----------|----------|---------------|----------|
| [LangGraph](https://github.com/langchain-ai/langgraph) | MIT | TradingAgents, workflows de riesgo | Stateful, human-in-the-loop, checkpoints para resumir runs |
| [CrewAI](https://github.com/crewAIInc/crewAI) | MIT | Equipos bull/bear/judge, research multi-rol | Role-playing, memoria compartida, orchestration natural |
| [AutoGen](https://github.com/microsoft/autogen) | MIT | FinRobot debate agents, análisis colaborativo | Conversación multi-agente, code execution integrado |
| [PydanticAI](https://github.com/pydantic/pydantic-ai) | MIT | Agentes tipados en producción | Type safety, validación de outputs críticos en finanzas |

---

## MCP Servers para datos financieros

| Servidor MCP | Licencia | Fuente de datos | Herramientas |
|-------------|----------|----------------|-------------|
| [openbb-mcp](https://github.com/OpenBB-finance/OpenBB/tree/develop/openbb_platform/extensions/mcp_server) | MIT | OpenBB Platform: equities, crypto, macro, opciones | Discovery dinámica; skill guides incluidos |
| [sec-edgar-mcp](https://github.com/stefanoamorelli/sec-edgar-mcp) | MIT | SEC EDGAR: 10-K, 10-Q, 8-K, insider trading, XBRL | Filings por empresa, búsqueda de texto completo, sin API key |
| [financial-datasets/mcp-server](https://github.com/financial-datasets/mcp-server) | MIT | Financial Datasets API: stocks, crypto, indicadores | Precio, fundamentals, earnings; API key requerida |
| [yahoo-finance-mcp](https://github.com/topics/yahoo-finance-mcp) | MIT | Yahoo Finance | 13 tools, precios en tiempo real, sin API key |
| [isofinancial-mcp](https://github.com/Niels-8/isofinancial-mcp) | MIT | SEC EDGAR + FINRA short data + institutional holdings | Mini Bloomberg Terminal auto-hospedado |
| [alpha-vantage-mcp](https://github.com/topics/alpha-vantage) | MIT | Alpha Vantage | Datos institucionales: equities, forex, crypto, indicadores técnicos |
