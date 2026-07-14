# 🎯 Agentes AI — Financial Services

> Agentes y herramientas AI open source para la industria financiera. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-14 (v5)

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

---

## Benchmarks de referencia

### FinGAIA (jul 2025) (julio 2025)

[SUFE-AIFLM-Lab/FinGAIA](https://github.com/SUFE-AIFLM-Lab/FinGAIA) · MIT · arXiv:2507.17186

407 tareas cubriendo 7 subdominios financieros (securities, funds, banking, insurance, futures, trusts, asset management) en tres niveles de dificultad. Evaluó 10 LLMs en zero-shot: **el mejor (ChatGPT) alcanzó 48.9%**, aún 35+ puntos por debajo de expertos humanos.

**Falla más común**: Cross-modal Alignment Deficiency (no conectar datos tabulares con contexto textual) y Financial Terminological Bias.

### BigFinanceBench (jun 2026) — NUEVO

[RogoAI/big-finance-benchmark](https://huggingface.co/datasets/RogoAI/big-finance-benchmark) · arXiv:2606.03829 · Rogo + OpenAI

928 tareas de investigación financiera con rúbricas de derivación de 36,241 puntos que evalúan el proceso completo (selección de fuente, definición contable, cálculo, supuestos) — no solo el resultado final. Evalúa 10 agentes frontier: **el mejor alcanza solo 58.8% del rubric score**, identificando dónde fallan los agentes en flujos de trabajo de analistas reales.

**Diferencia con FinGAIA**: BigFinanceBench es workflow-grounded (evalúa la derivación, no el resultado) y viene de un contexto de producción (Rogo sirve a buy-side funds). Es el benchmark más riguroso para financial research agents en 2026.

---

## Notas de uso para Globant

- **TradingAgents + ai-hedge-fund**: los dos frameworks de trading multi-agente más maduros; combinarlos con OpenBB como data layer es el stack de referencia 2026. TradingAgents v0.2.4 agrega soporte multi-provider (Azure, DeepSeek, Qwen) — ideal para clientes que no quieren depender de un solo LLM vendor.
- **FinRobot Desktop v0.1.0**: nuevo differenciador — app nativa macOS para research sin código; útil para demos a bancos de inversión LATAM donde los analistas no programan.
- **FinGPT / FinRL / FinRobot** (AI4Finance Foundation): ecosistema cohesivo, ideal como base de investigación o PoC para clientes bancarios.
- **kyc-analyst**: plug-and-play sobre Claude; acelera compliance en bancos LATAM que aún procesan KYC manualmente.
- **jube**: AGPL-3.0 permite uso pero requiere análisis de copyleft antes de embeber en producto cliente.
- **FinSight** (ACL 2026, MIT): primer agente de investigación financiera open source que supera a OpenAI Deep Research y Gemini — ideal para sell-side y IR teams. 20 min por reporte vs 8h de analista.
- **FinGAIA + BigFinanceBench**: úsalos como benchmarks en propuestas — FinGAIA (48.9%) para tareas de conocimiento financiero; BigFinanceBench (58.8%) para flujos de research de analistas. Ambos justifican por qué se necesita integración experta más allá de LLMs genéricos.
- **TradingAgents v0.3.1**: el fix de look-ahead bias hace que los backtests sean confiables ahora — resultados de v0.2.x eran inflados.

---
*Actualizado automáticamente por el pipeline de ingest.*
