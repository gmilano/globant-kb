# 🏗️ Repos fundacionales — Financial Services

> Bases sobre las cuales construir soluciones de AI financiero. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-08

---

## Stack A — Plataformas de datos financieros

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|--------------|
| [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) | AGPLv3 | 38.4k | Open Data Platform: normaliza datos financieros de 30+ proveedores (FMP, FRED, Yahoo Finance, Polygon, SEC) en un único Python SDK. MCP server integrado | Sí — agentes pueden consultar cualquier dato vía MCP |
| [ccxt/ccxt](https://github.com/ccxt/ccxt) | MIT | 43.5k | Crypto exchange unification: API para 100+ exchanges (Binance, Coinbase, Kraken) en JS/Python/PHP. El estándar de facto para crypto trading | Sí — wrapper para agentes de trading crypto |
| [AI4Finance-Foundation/FinRL](https://github.com/AI4Finance-Foundation/FinRL) | MIT | 11.8k | Financial reinforcement learning framework. Entornos backtesting, múltiples activos, agentes DRL listos | Sí — RL training foundation |
| [AI4Finance-Foundation/FinRL-Trading](https://github.com/AI4Finance-Foundation/FinRL-Trading) | MIT | 3.1k | FinRL-X: next-gen AI-native modular trading, live deployment, production-focused | Sí — producción RL trading |

---

## Stack B — Quant Finance & Portfolio Optimization

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|--------------|
| [quantopian/zipline](https://github.com/quantopian/zipline) | Apache-2.0 | 17.2k | Algorithmic trading library en Python — backtesting engine estándar de la industria quant | Sí — backtesting foundation |
| [google/tf-quant-finance](https://github.com/google/tf-quant-finance) | Apache-2.0 | 5.4k | High-performance TensorFlow library para quantitative finance: opciones, derivados, tasas | Sí — pricing con GPU/TPU |
| [PyPortfolioOpt/PyPortfolioOpt](https://github.com/robertmartin8/PyPortfolioOpt) | MIT | 5.8k | Portfolio optimization en Python: Markowitz, Black-Litterman, HRP, CVaR | Sí — módulo de riesgo para agentes |
| [dcajasn/Riskfolio-Lib](https://github.com/dcajasn/Riskfolio-Lib) | BSD-3-Clause | 4.3k | Portfolio optimization avanzado: HRP, HERC, NCO, factores de riesgo, backtesting | Sí — optimización multi-objetivo |
| [avhz/RustQuant](https://github.com/avhz/RustQuant) | Apache-2.0 | 1.8k | Rust library para quant finance: opciones, stochastics, estadística — performance crítico | Sí — pricing de alta frecuencia |

---

## Stack C — Core Banking & Microfinance

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|--------------|
| [apache/fineract](https://github.com/apache/fineract) | Apache-2.0 | 1.4k | Apache Fineract: core banking open source para microfinanzas, cooperativas, digital banks en 80+ países. API-first, modular, REST | Sí — capa de data + workflows para agentes de crédito |
| [hummingbot/hummingbot](https://github.com/hummingbot/hummingbot) | Apache-2.0 | 19.0k | Market making y trading algorítmico: 100+ conectores de exchanges, estrategias pluggable, backtesting | Sí — estrategia de ejecución para agentes |

---

## Stack D — Compliance & RegTech

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|--------------|
| [finos/open-regtech-sig](https://github.com/finos/open-regtech-sig) | Apache-2.0 | 280 | FINOS RegTech SIG: soluciones open source para compliance regulatorio en financial services. AML, KYC, reporting automatizado | Sí — base para RegTech agéntico |
| [finos/fdc3](https://github.com/finos/FDC3) | Apache-2.0 | 580 | FDC3 3.0 — Financial Desktop Connectivity and Collaboration Standard. Cross-firm/industry interop para apps financieras | Sí — protocolo de integración |
| [finos/common-domain-model](https://github.com/finos/common-domain-model) | Apache-2.0 | 140 | CDM: representación canónica de contratos financieros. Usado por DTCC, ISDA | Sí — schema de datos para compliance AI |

---

## Stack E — Predicción & Análisis de Mercados

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|--------------|
| [huseinzol05/Stock-Prediction-Models](https://github.com/huseinzol05/Stock-Prediction-Models) | Apache-2.0 | 9.4k | 30+ ML/DL models para predicción de precios: LSTM, GAN, Transformer, ensemble | Sí — modelos de señal para agentes |
| [jon-becker/prediction-market-analysis](https://github.com/jon-becker/prediction-market-analysis) | MIT | 2.3k | 36GB dataset de Polymarket + Kalshi. Framework de análisis con Bayesian aggregation | Sí — datos de mercados de predicción |
| [georgezouq/awesome-ai-in-finance](https://github.com/georgezouq/awesome-ai-in-finance) | MIT | 4.2k | Curated list: LLMs, deep learning, estrategias y tools en financial markets | Sí — mapa del ecosistema |

---

## Cómo se conectan los stacks

```
Stack A (Datos)     →  OpenBB MCP  →  Agentes AI (Claude/LangGraph)
Stack B (Quant)     →  Portfolio signal  →  Stack A data  →  Ejecución hummingbot
Stack C (Banking)   →  Apache Fineract API  →  Agentes de crédito/KYC
Stack D (Compliance) →  FINOS CDM / FDC3  →  RegTech agents
Stack E (Predicción) →  señal  →  Stack B portfolio opt  →  Stack A ejecución
```

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
