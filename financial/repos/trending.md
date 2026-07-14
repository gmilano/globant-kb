# 📈 Repos trending — Financial Services

> Lo más caliente en GitHub esta semana. Última actualización: 2026-07-14 (v6)

| Nombre | Repo | Licencia | Descripción | Stars |
|--------|------|----------|-------------|-------|
| TradingAgents | [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | MIT | El repo de trading AI más destacado de 2026. **v0.3.1 (jul 2026)**: fix crítico de look-ahead bias en Alpha Vantage (invalida benchmarks v0.2.x), Claude Sonnet 5 / Fable 5 support, Bedrock auth, FRED + Polymarket data vendors | 82k+ |
| ai-hedge-fund | [virattt/ai-hedge-fund](https://github.com/virattt/ai-hedge-fund) | MIT | 14 agentes con personalidad de inversores legendarios + 5 analíticos; popularizó el concepto de "open source hedge fund" | 60k+ |
| Vibe-Trading | [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) | MIT | Personal trading agent con 48 tools, 77 finance skills, 29 multi-agente presets; audit ledger y kill-switch para entornos regulados | 19.9k |
| FinGPT | [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | MIT | LLM financiero open source con LoRA fine-tuning; sentiment + forecast; outperforms GPT-4 en tareas de sentimiento financiero específico | 14.5k |
| OpenBB | [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) | AGPLv3 | Open Data Platform para quants; v4 MCP-native; "connect once, consume everywhere"; crecimiento constante | 39k |
| FinRobot | [AI4Finance-Foundation/FinRobot](https://github.com/AI4Finance-Foundation/FinRobot) | MIT | Plataforma de agentes AI + Desktop v0.1.0 nativo (macOS, PydanticAI + Tauri) para equity research sin código | 7.3k |
| **finance-trading-ai-agents-mcp** | [aitrados/finance-trading-ai-agents-mcp](https://github.com/aitrados/finance-trading-ai-agents-mcp) | MIT | **NUEVO (jul 2026)** — MCP server con arquitectura departamental (Research/Quant/Risk/Macro); one-click deploy; mirrors una firma financiera real | trending |
| **tradingview-mcp** | [atilaahmettaner/tradingview-mcp](https://github.com/atilaahmettaner/tradingview-mcp) | MIT | **NUEVO** — TradingView data vía MCP: TA en tiempo real, screeners, backtesting — stocks/crypto/forex/futuros | trending |
| **financekit-mcp** | [vdalhambra/financekit-mcp](https://github.com/vdalhambra/financekit-mcp) | MIT | **NUEVO** — Financial Market Intelligence MCP: 17 herramientas, risk metrics (Sharpe/Sortino/Beta), crypto CoinGecko | trending |
| ICBCBench | [DeepFin-Intelligence/ICBCBench](https://github.com/DeepFin-Intelligence/ICBCBench) | — | arXiv:2606.17458, jun 2026 — benchmark industrial para financial deep research: 50+ expertos, 40+ organizaciones, dual-track objetivo+subjetivo | nuevo |
| AgenticTrading | [Open-Finance-Lab/AgenticTrading](https://github.com/Open-Finance-Lab/AgenticTrading) | Apache-2.0 | FinAgent Orchestration Framework + FinLLM-Leaderboard; benchmark académico de agentes financieros | 900 |
| FinGAIA | [SUFE-AIFLM-Lab/FinGAIA](https://github.com/SUFE-AIFLM-Lab/FinGAIA) | MIT | Benchmark 407-tareas (arXiv:2507.17186); best LLM: 48.9% — gap de 35+ pts vs expertos humanos | 800 |
| **FinSight** | [RUC-NLPIR/FinSight](https://github.com/RUC-NLPIR/FinSight) | MIT | **ACL 2026 Main** — supera a OpenAI Deep Research (8.09 vs 6.11); pipeline multi-etapa con VLM chart refinement | ~800 |
| kyc-analyst | [vyayasan/kyc-analyst](https://github.com/vyayasan/kyc-analyst) | MIT | KYC/AML compliance automation con Claude; 17 checkpoints human-in-the-loop | 420 |

---

## Señal de 2026: el ecosistema MCP financiero explota

Más de **171 MCP servers financieros** disponibles en julio 2026 (mcpservers.org/category/finance). Tres niveles:

**Capa de datos** (información de mercado):
- OpenBB MCP v4 (Bloomberg, Alpha Vantage, Quiver Quant)
- tradingview-mcp (TA + screeners + backtesting)
- financekit-mcp (risk metrics + crypto + fundamentals)
- Sharpe crypto MCP (13 venues perpetual, Deribit options)
- financial-datasets-mcp (SEC filings, balance sheets)

**Capa de ejecución** (transacciones reales):
- Alpaca MCP (live trading: stocks, ETFs, crypto, options)
- Open Finance MCP (datos bancarios reales BR/CL)
- Mastercard Agent Pay (pagos M2M con credenciales tokenizadas)

**Capa de arquitectura** (organización y governance):
- finance-trading-ai-agents-mcp (arquitectura departamental)
- agentOS by Fiserv (governance layer para bancos)
- MAS SAFR (framework de referencia: policy bound + audit)

**Implicación**: el stack de un financial AI agent en 2026 ya no requiere escribir conectores a APIs de datos. El patrón dominante es **3-5 MCP servers especializados + orquestador LLM + governance layer**.

## Tres convergencias que marcan el campo — H2 2026

1. **Governance-first design**: MAS SAFR + Fiserv agentOS + EU AI Act deadline → los agentes financieros sin audit log inmutable y policy enforcement están fuera del mercado regulado. No es feature opcional — es requisito de producción.

2. **Anthropic como infraestructura bancaria**: FIS Financial Crimes Agent (AML), Mastercard Agent Pay, Visa Intelligent Commerce — tres jugadores tier-1 eligieron Claude como LLM central. Globant tiene ventaja diferencial en implementaciones que usan Anthropic.

3. **Industrial benchmarks como criterio de aceptación**: BigFinanceBench (58.8%), ICBCBench (industrial, 50+ expertos), FinGAIA (48.9%) — los clientes sofisticados pedirán scores en estos benchmarks antes del go-live.

---
*Pipeline automático — se actualiza cada hora.*
