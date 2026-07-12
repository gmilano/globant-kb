# 🎯 Agentes AI — Financial Services

> Agentes y herramientas AI open source para la industria financiera. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-12

## Agentes y herramientas destacadas

| Nombre | Repo | Licencia | Descripción | Stars |
|--------|------|----------|-------------|-------|
| TradingAgents | [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | Apache-2.0 | Multi-agent LLM trading firm: analysts bull/bear, fundamentals, técnicos, riesgo, portfolio manager y fondo debatiendo en cadena antes de cada trade | 80k+ |
| ai-hedge-fund | [virattt/ai-hedge-fund](https://github.com/virattt/ai-hedge-fund) | MIT | 14 agentes modelados sobre inversores legendarios (Buffett, Munger, Burry…) + 5 agentes analíticos (Valuación, Sentimiento, Fundamentals, Técnicos, Riesgo) | 59k |
| FinRobot | [AI4Finance-Foundation/FinRobot](https://github.com/AI4Finance-Foundation/FinRobot) | MIT | Plataforma de agentes AI para análisis financiero; unifica LLMs, RL y quant analytics; research automation + algorithmic trading | 4.5k |
| FinGPT | [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | MIT | LLM financiero open source; LoRA fine-tuning sobre noticias y tweets para sentiment analysis; benchmarks sobre FLARE suite | 14k |
| FinRL | [AI4Finance-Foundation/FinRL](https://github.com/AI4Finance-Foundation/FinRL) | MIT | Reinforcement learning aplicado a finanzas; entornos de mercado (equities, crypto, FX), PPO/SAC/TD3 out-of-the-box | 10k |
| Vibe-Trading | [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) | MIT | Research workspace conversacional: conecta prompts NL con loaders de datos de mercado, generación de estrategias, backtest, reports y memoria persistente | 16.9k |
| OpenBB | [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) | AGPLv3 | Open Data Platform para quants y agentes AI; integra múltiples fuentes de datos, MCP-native desde v4, hub de extensiones | 38k |
| kyc-analyst | [vyayasan/kyc-analyst](https://github.com/vyayasan/kyc-analyst) | MIT | Plugin KYC/AML compliance automation con 17 checkpoints human-in-the-loop, fuentes de datos públicas gratuitas y scoring de riesgo determinístico; corre sobre Claude | 350 |
| jube | [jube-home/aml-fraud-transaction-monitoring](https://github.com/jube-home/aml-fraud-transaction-monitoring) | AGPL-3.0 | AML y detección de fraude en tiempo real: ML supervisado/no-supervisado, reglas con velocity checks, sanctions screening, case management con audit trail | 890 |
| FinMem | [pipiku915/FinMem-LLM-StockTrading](https://github.com/pipiku915/FinMem-LLM-StockTrading) | MIT | LLM trading agent con memoria en capas (short/long-term layered memory) y perfil de carácter; supera baselines en retornos Sharpe ratio-ajustados | 1.2k |

---

## Notas de uso para Globant

- **TradingAgents + ai-hedge-fund**: los dos frameworks de trading multi-agente más maduros; combinarlos con OpenBB como data layer es el stack de referencia 2026.
- **FinRobot / FinRL / FinGPT** (AI4Finance Foundation): ecosistema cerrado y cohesivo, ideal como base de investigación o PoC para clientes bancarios.
- **kyc-analyst**: plug-and-play sobre Claude; acelera compliance en bancos LATAM que aún procesan KYC manualmente.
- **jube**: AGPL-3.0 permite uso pero requiere análisis de copyleft antes de embeber en producto cliente.

---
*Actualizado automáticamente por el pipeline de ingest.*
