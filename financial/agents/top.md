# 🎯 Agentes AI — Financial Services

> Agentes y herramientas AI open source para la industria financiera. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-14 (v6)

## Agentes y herramientas destacadas

| Nombre | Repo | Licencia | Descripción | Stars |
|--------|------|----------|-------------|-------|
| TradingAgents | [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | MIT | Multi-agent LLM trading firm: analistas bull/bear, fundamentals, técnicos, riesgo, portfolio manager debatiendo en cadena antes de cada trade. **v0.3.1 (jul 2026)**: fix crítico de look-ahead bias en Alpha Vantage, soporte Claude Sonnet 5 / Fable 5, Bedrock auth, FRED + Polymarket como data vendors | 82k+ |
| ai-hedge-fund | [virattt/ai-hedge-fund](https://github.com/virattt/ai-hedge-fund) | MIT | 14 agentes modelados sobre inversores legendarios (Buffett, Munger, Burry…) + 5 agentes analíticos (Valuación, Sentimiento, Fundamentals, Técnicos, Riesgo). El más popular por claridad de código y documentación | 60k+ |
| ATLAS | [chrisworsey55/atlas-gic](https://github.com/chrisworsey55/atlas-gic) | MIT | Sistema de trading auto-mejorante: 25 agentes en 4 capas (macro/sector/filosofía/decisión) con Darwinian selection usando Sharpe ratio como loss function. El peor agente reescribe sus propios prompts cada 5 días. 9 agentes generados autónomamente; +22% return en 173 días deployment real. **NUEVO v6** | 2.1k |
| Vibe-Trading | [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) | MIT | Research workspace conversacional: 48 herramientas, 77 finance skills, 29 presets multi-agente. NL → estrategia → backtest → reporte, lookahead-banned alphas, audit ledger y kill-switch | 19.9k |
| AI-Trader | [HKUDS/AI-Trader](https://github.com/HKUDS/AI-Trader) | MIT | **100% fully automated agent-native trading platform** (may 2026, HKUDS). Agentes se conectan en segundos, colaboran y debaten para hallar las mejores ideas. Cross-Platform Signal Sync, One-Click Copy Trading, cobertura Stocks/Crypto/Forex/Options/Futures. Compatible con Claude Code, Cursor, OpenClaw, Codex. **NUEVO v6** | 8.7k |
| FinRobot | [AI4Finance-Foundation/FinRobot](https://github.com/AI4Finance-Foundation/FinRobot) | MIT | Plataforma multi-agent para análisis financiero. **Desktop v0.1.0** (jul 2026): app macOS nativa con PydanticAI + FastAPI + React/Tauri para research sin código. Separa cómputo determinístico (DCF, DDM, LBO, Monte Carlo) de narración LLM | 7.3k |
| FinGPT | [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | MIT | LLM financiero open source; LoRA fine-tuning sobre noticias y tweets para sentiment analysis; benchmarks sobre FLARE suite; modelos en HuggingFace | 14.5k |
| FinRL | [AI4Finance-Foundation/FinRL](https://github.com/AI4Finance-Foundation/FinRL) | MIT | Reinforcement learning aplicado a finanzas; entornos multi-asset (equities, crypto, FX), PPO/SAC/TD3 out-of-the-box | 10.2k |
| FinSight | [RUC-NLPIR/FinSight](https://github.com/RUC-NLPIR/FinSight) | MIT | **ACL 2026 Main** — pipeline multi-etapa: recolección → análisis + VLM chart refinement → redacción → reporte institucional. Score **8.09** vs OpenAI Deep Research 6.11 y Gemini 6.82. Un ticker → reporte en 20 min | ~800 |
| OpenBB | [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) | AGPLv3 | Open Data Platform para quants y agentes AI; v4 MCP-native; "connect once, consume everywhere" — Python, Workspace, Excel, MCP y REST; alternativa open a Bloomberg/Refinitiv | 39k |
| kyc-analyst | [vyayasan/kyc-analyst](https://github.com/vyayasan/kyc-analyst) | MIT | Plugin KYC/AML con 17 checkpoints human-in-the-loop, fuentes de datos públicas y scoring de riesgo determinístico; corre sobre Claude | 420 |
| open-paper-trading-mcp | [Open-Agent-Tools/open-paper-trading-mcp](https://github.com/Open-Agent-Tools/open-paper-trading-mcp) | MIT | Simulador paper trading dual-interface (REST API + MCP server) con 43 herramientas. Options chain + Greeks, multi-asset. Diseñado para entrenar AI agents sin riesgo financiero. **NUEVO v6** | 1.2k |
| jube | [jube-home/aml-fraud-transaction-monitoring](https://github.com/jube-home/aml-fraud-transaction-monitoring) | AGPL-3.0 | AML y detección de fraude en tiempo real: ML supervisado/no-supervisado, reglas con velocity checks, sanctions screening, case management con audit trail | 920 |
| FinMem | [pipiku915/FinMem-LLM-StockTrading](https://github.com/pipiku915/FinMem-LLM-StockTrading) | MIT | LLM trading agent con memoria en capas (short/long-term) y perfil de carácter; supera baselines en Sharpe ratio | 1.2k |

---

## MCP Servers financieros — Ecosistema 2026

| MCP Server | Repo | Licencia | Descripción |
|------------|------|----------|-------------|
| open-paper-trading-mcp | [Open-Agent-Tools/open-paper-trading-mcp](https://github.com/Open-Agent-Tools/open-paper-trading-mcp) | MIT | Paper trading + AI agent training sandbox — 43 tools |
| tradingview-mcp | [atilaahmettaner/tradingview-mcp](https://github.com/atilaahmettaner/tradingview-mcp) | MIT | Datos en tiempo real, análisis técnico, screeners desde TradingView |
| financial-datasets-mcp | [financial-datasets/mcp-server](https://github.com/financial-datasets/mcp-server) | MIT | API de datos de acciones vía MCP; el más estrellado por ser el más universal |
| mcp-trader | [wshobson/mcp-trader](https://github.com/wshobson/mcp-trader) | MIT | MCP server para stock traders: portfolio, watchlist, análisis |
| Alpaca MCP | [alpaca.markets/mcp-server](https://alpaca.markets/mcp-server) | Apache-2.0 | Ejecución de trades REALES vía MCP — stocks, ETFs, crypto, options |
| FinAegis MCP | [finaegis.org/features/mcp](https://finaegis.org/features/mcp) | Apache-2.0 | 12 herramientas bancarias OAuth-protected con límites de gasto por token; endpoint: mcp.zelta.app |
| FINOS AIGF MCP | [finos.org AIGF MCP](https://www.finos.org/blog/operationalizing-ai-governance-finos-aigf-mcp-server) | Apache-2.0 | AI Governance Framework como MCP: risk catalogues, EU AI Act, OWASP — para regulated finance |
| OpenBB MCP | [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) | AGPLv3 | Datos multi-provider expuestos como MCP — v4 default |

> 💡 **Stack recomendado**: financial-datasets-mcp (raw data) + open-paper-trading-mcp (simulación sin riesgo) + Alpaca MCP (live execution) + FINOS AIGF MCP (compliance EU AI Act).

---

## Benchmarks de referencia — Suite 2026

### FinGAIA (jul 2025)
[SUFE-AIFLM-Lab/FinGAIA](https://github.com/SUFE-AIFLM-Lab/FinGAIA) · MIT · arXiv:2507.17186

407 tareas en 7 subdominios financieros. Resultado: **el mejor LLM alcanzó 48.9%** vs >84% expertos humanos.

### BigFinanceBench (jun 2026)
[RogoAI/big-finance-benchmark](https://huggingface.co/datasets/RogoAI/big-finance-benchmark) · arXiv:2606.03829

928 tareas workflow-grounded con rúbricas de 36,241 puntos evaluando derivación completa (fuente + cálculo + supuestos). El mejor agente frontier: **solo 58.8% del rubric score**.

---

## Notas de uso para Globant

- **AI-Trader + Vibe-Trading (HKUDS)**: mismo equipo HKU — Vibe-Trading es el research workspace (NL → análisis), AI-Trader es el exchange nativo para agentes (análisis → ejecución). Stack complementario potente.
- **ATLAS**: primer agente en producción real que auto-reescribe sus propios prompts basado en Sharpe ratio — patrón Karpathy autoresearch aplicado a finanzas. Replicable para otros dominios.
- **TradingAgents v0.3.1**: fix de look-ahead bias crítico — cualquier benchmark anterior al fix no es válido. Exigir v0.3.1+ en propuestas y demos.
- **MCP stack completo**: financial-datasets-mcp + Alpaca MCP + FinAegis MCP + FINOS AIGF MCP cubre ciclo completo: dato → análisis → ejecución → compliance. Arquitectura lista para EU AI Act.
- **open-paper-trading-mcp**: sandbox zero-risk para entrenar y evaluar agentes de trading antes de conectar a Alpaca live — crítico para demos en bancos regulados.
- **FinRobot Desktop v0.1.0**: diferenciador en demos a bancos LATAM donde analistas no programan en Python.
- **jube (AGPL-3.0)**: requiere análisis de copyleft antes de embeber en producto cliente; considerar kyc-analyst (MIT) para compliance más simple.

---
*Actualizado automáticamente por el pipeline de ingest. v6.*
