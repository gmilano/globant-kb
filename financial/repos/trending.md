# 📈 Repos trending — Financial Services

> Lo más caliente en GitHub esta semana. Última actualización: 2026-07-13

| Nombre | Repo | Licencia | Descripción | Stars |
|--------|------|----------|-------------|-------|
| TradingAgents | [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | Apache-2.0 | El repo de trading AI más destacado de 2026: multi-agent LLM hedge fund, arquitectura debate bull/bear. v0.2.4: structured-output, LangGraph checkpoint resume, multi-provider (DeepSeek/Qwen/Azure) | 82k+ |
| ai-hedge-fund | [virattt/ai-hedge-fund](https://github.com/virattt/ai-hedge-fund) | MIT | 14 agentes con personalidad de inversores legendarios + 5 analíticos; popularizó el concepto de "open source hedge fund" | 60k+ |
| Vibe-Trading | [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) | MIT | Personal trading agent con 48 tools, 77 finance skills, 29 multi-agente presets; audit ledger y kill-switch para entornos regulados; de HKUDS | 19.9k |
| FinGPT | [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | MIT | LLM financiero open source con LoRA fine-tuning; models en HuggingFace; sentiment + forecast; outperforms GPT-4 en tareas de sentimiento financiero específico | 14.5k |
| OpenBB | [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) | AGPLv3 | Open Data Platform para quants; v4 MCP-native; "connect once, consume everywhere"; crecimiento constante | 39k |
| FinRobot | [AI4Finance-Foundation/FinRobot](https://github.com/AI4Finance-Foundation/FinRobot) | MIT | Plataforma de agentes AI + Desktop v0.1.0 nativo (macOS, PydanticAI + Tauri) para equity research sin código | 7.3k |
| AgenticTrading | [Open-Finance-Lab/AgenticTrading](https://github.com/Open-Finance-Lab/AgenticTrading) | Apache-2.0 | FinAgent Orchestration Framework + FinLLM-Leaderboard; benchmark académico de agentes financieros | 900 |
| FinGAIA | [SUFE-AIFLM-Lab/FinGAIA](https://github.com/SUFE-AIFLM-Lab/FinGAIA) | MIT | Benchmark 407-tareas para AI agents en finanzas (julio 2025, arXiv:2507.17186); SUFE + Fudan; dataset público parcial | 800 |
| awesome-trading-agents | [LLMQuant/awesome-trading-agents](https://github.com/LLMQuant/awesome-trading-agents) | MIT | Lista curada de MCP servers + agent skills para trading; referencia emergente de la comunidad quant | 650 |
| kyc-analyst | [vyayasan/kyc-analyst](https://github.com/vyayasan/kyc-analyst) | MIT | KYC/AML compliance automation con Claude; 17 checkpoints human-in-the-loop; MIT | 420 |

---

## Señal de 2026: multi-provider y structured-output son la nueva base

Tres patrones que todos los repos maduros están convergiendo en H2 2026:

1. **Multi-provider LLM**: no depender de un solo vendor (OpenAI, Anthropic, DeepSeek, Azure) — TradingAgents v0.2.4 y FinRobot lo implementaron en Q1-Q2 2026. Los bancos exigen vendor-independence por regulación y riesgo operacional.

2. **Structured output**: los agentes que devuelven JSON tipado (no texto libre) son más auditables y testeables. TradingAgents migró sus agentes críticos (Trader, Risk Manager) a structured-output en v0.2.4.

3. **Checkpoint resume**: para análisis largos (earnings season, due diligence) los pipelines necesitan poder pausarse y reanudarse. LangGraph en TradingAgents; Vibe-Trading con audit ledger.

**Benchmarks como baseline**: FinGAIA establece que el mejor LLM en tareas financieras complejas alcanza ~49% en zero-shot. Esto fundamenta por qué los agentes necesitan fine-tuning, RAG sobre normativas y human-in-the-loop para llegar a producción regulada.

---
*Pipeline automático — se actualiza cada hora.*
