# 🎯 Agentes AI — Financial Services

> Agentes y herramientas AI open source para la industria financiera. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-14 (v6)

## Agentes y herramientas destacadas

| Nombre | Repo | Licencia | Descripción | Stars |
|--------|------|----------|-------------|-------|
| TradingAgents | [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | MIT | Multi-agent LLM trading firm: analysts bull/bear, fundamentals, técnicos, riesgo, portfolio manager y fondo debatiendo en cadena antes de cada trade. **v0.3.1 (jul 2026)**: fix crítico de look-ahead bias en Alpha Vantage (backtests v0.2.x inflados), soporte Claude Sonnet 5 / Fable 5, Bedrock auth, FRED + Polymarket como data vendors | 82k+ |
| ai-hedge-fund | [virattt/ai-hedge-fund](https://github.com/virattt/ai-hedge-fund) | MIT | 14 agentes modelados sobre inversores legendarios (Buffett, Munger, Burry…) + 5 agentes analíticos (Valuación, Sentimiento, Fundamentals, Técnicos, Riesgo). El más popular por claridad de código y documentación | 60k+ |
| FinRobot | [AI4Finance-Foundation/FinRobot](https://github.com/AI4Finance-Foundation/FinRobot) | MIT | Plataforma multi-agent para análisis financiero; unifica LLMs, RL y quant analytics. **Desktop v0.1.0** (jul 2026): app macOS nativa con PydanticAI + FastAPI + React/Tauri para research workflows sin código | 7.3k |
| FinGPT | [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | MIT | LLM financiero open source; LoRA fine-tuning sobre noticias y tweets para sentiment analysis; benchmarks sobre FLARE suite; modelos en HuggingFace | 14.5k |
| FinRL | [AI4Finance-Foundation/FinRL](https://github.com/AI4Finance-Foundation/FinRL) | MIT | Reinforcement learning aplicado a finanzas; entornos de mercado (equities, crypto, FX), PPO/SAC/TD3 out-of-the-box | 10.2k |
| Vibe-Trading | [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) | MIT | Research workspace conversacional: 48 herramientas, 77 finance skills, 29 presets multi-agente. NL → estrategia → backtest → reporte, lookahead-banned alphas, audit ledger y kill-switch. HKUDS (mismo equipo que DeepTutor) | 19.9k |
| OpenBB | [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) | AGPLv3 | Open Data Platform para quants y agentes AI; v4 MCP-native por defecto; "connect once, consume everywhere" — Python, Workspace, Excel, MCP y REST desde un hub; alternativa open a Bloomberg/Refinitiv | 39k |
| kyc-analyst | [vyayasan/kyc-analyst](https://github.com/vyayasan/kyc-analyst) | MIT | Plugin KYC/AML compliance automation con 17 checkpoints human-in-the-loop, fuentes de datos públicas gratuitas y scoring de riesgo determinístico; corre sobre Claude | 420 |
| jube | [jube-home/aml-fraud-transaction-monitoring](https://github.com/jube-home/aml-fraud-transaction-monitoring) | AGPL-3.0 | AML y detección de fraude en tiempo real: ML supervisado/no-supervisado, reglas con velocity checks, sanctions screening, case management con audit trail | 920 |
| FinSight | [RUC-NLPIR/FinSight](https://github.com/RUC-NLPIR/FinSight) | MIT | **ACL 2026 Main** — pipeline de investigación financiera multi-etapa: recolección de datos → análisis + VLM chart refinement → redacción → reporte publicable. Score **8.09** vs OpenAI Deep Research 6.11 y Gemini Deep Research 6.82. Un ticker → reporte institucional en 20 min | ~800 |
| FinMem | [pipiku915/FinMem-LLM-StockTrading](https://github.com/pipiku915/FinMem-LLM-StockTrading) | MIT | LLM trading agent con memoria en capas (short/long-term layered memory) y perfil de carácter; supera baselines en retornos Sharpe ratio-ajustados | 1.2k |
| finance-trading-ai-agents-mcp | [aitrados/finance-trading-ai-agents-mcp](https://github.com/aitrados/finance-trading-ai-agents-mcp) | MIT | MCP server con arquitectura departamental (Research/Quant/Risk/Macro): one-click deploy local, expone análisis financiero completo a cualquier agente LLM sin SDK custom | nuevo |

---

## Benchmarks de referencia

### BigFinanceBench (jun 2026)

[RogoAI/big-finance-benchmark](https://huggingface.co/datasets/RogoAI/big-finance-benchmark) · arXiv:2606.03829 · Rogo + OpenAI

928 tareas de research financiero con rúbricas de 36,241 puntos que evalúan derivación completa (selección de fuente, definición contable, cálculo, supuestos) — no solo el resultado. Mejor agente frontier: **58.8%** — headroom masivo vs analistas humanos. El benchmark más riguroso para financial research agents en 2026, proveniente de contexto de producción buy-side.

### ICBCBench (jun 2026)

[DeepFin-Intelligence/ICBCBench](https://github.com/DeepFin-Intelligence/ICBCBench) · arXiv:2606.17458 · 50+ expertos, 40+ organizaciones

Primer benchmark de consorcio industrial para financial deep research. Dual-track: tareas objetivas verificables + evaluación de reportes long-form (expert alignment, citation consistency, source quality). Resultados revelan gaps en complex reasoning, factual grounding y calidad de reporte.

### FinGAIA (jul 2025)

[SUFE-AIFLM-Lab/FinGAIA](https://github.com/SUFE-AIFLM-Lab/FinGAIA) · MIT · arXiv:2507.17186

407 tareas en 7 subdominios financieros. Mejor LLM zero-shot: **48.9%** — 35+ puntos debajo de expertos humanos.

---

## MCP Ecosystem financiero — infraestructura 2026

| MCP Server | Licencia | Casos de uso |
|------------|----------|--------------|
| finance-trading-ai-agents-mcp | MIT | Arquitectura departamental completa |
| tradingview-mcp | MIT | TA en tiempo real, screeners, backtesting |
| financekit-mcp | MIT | Risk metrics (Sharpe, Sortino, Beta) + crypto |
| OpenBB MCP v4 | AGPLv3 | Multi-provider: Bloomberg, AlphaVantage, QuiverQuant |
| Alpaca MCP | Apache-2.0 | Live trade execution regulada |
| Open Finance MCP | MIT | Datos bancarios reales BR/CL vía Open Finance |
| Sharpe crypto MCP | Comercial | 13 venues perpetual, Deribit options |

---

## Notas de uso para Globant

- **TradingAgents + ai-hedge-fund**: los dos frameworks de trading multi-agente más maduros; combinarlos con OpenBB como data layer es el stack de referencia 2026. TradingAgents v0.3.1 fix de look-ahead bias es crítico antes de cualquier demo o propuesta.
- **FinRobot Desktop v0.1.0**: app nativa macOS para research sin código; útil para demos a bancos de inversión LATAM donde los analistas no programan.
- **kyc-analyst**: plug-and-play sobre Claude; acelera compliance en bancos LATAM que aún procesan KYC manualmente. Stack: kyc-analyst + jube + Claude API ≈ $500-2k/mes vs $30-50k/año de vendor.
- **finance-trading-ai-agents-mcp**: nuevo patrón — exponer el stack de análisis completo como MCP en lugar de integrar herramientas directamente. Permite a cualquier LLM acceder a análisis departamental sin código custom.
- **FinSight** (ACL 2026, MIT): primer agente open source que supera a OpenAI Deep Research y Gemini — ideal para sell-side y IR teams. 20 min por reporte vs 8h de analista.
- **BigFinanceBench + ICBCBench**: usar ambos como criterio de aceptación en proyectos de financial AI. BigFinanceBench para research workflow; ICBCBench para deep research institucional.
- **MAS SAFR**: incluir como framework de governance en toda propuesta de agentes financieros. Globant puede diferenciarse ofreciendo SAFR-compliant agent design desde el diseño inicial.

---
*Actualizado automáticamente por el pipeline de ingest.*
