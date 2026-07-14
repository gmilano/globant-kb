# 🏗️ Repos fundacionales — Financial Services

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-14 (v6)

## Plataformas y frameworks base

| Repo | Licencia | Descripción | Stars / Estado |
|------|----------|-------------|----------------|
| [zipline-reloaded](https://github.com/stefan-jansen/zipline-reloaded) | Apache-2.0 | Fork mantenido del motor de backtesting de Quantopian; integración con zipline-live para paper/live trading | 1.5k ★ — activo 2026 |
| [tf-quant-finance](https://github.com/google/tf-quant-finance) | Apache-2.0 | Librería TensorFlow de Google para finanzas cuantitativas: pricing de derivados, calibración de modelos estocásticos, Monte Carlo GPU-acelerado | 5.4k ★ |
| [QuantLib](https://github.com/lballabio/QuantLib) | BSD-3-Clause | La librería quant de referencia en C++: opciones, bonos, FX, swaps, curvas de tasa, Monte Carlo; +20 años en producción en bancos globales | 5.2k ★ |
| [FinRL](https://github.com/AI4Finance-Foundation/FinRL) | MIT | Reinforcement learning financiero: entornos multi-asset (equities, crypto, FX), algoritmos PPO/SAC/TD3, benchmarks NASDAQ/DOW/S&P | 10.2k ★ |
| [Apache Fineract](https://github.com/apache/fineract) | Apache-2.0 | Core banking open source: gestión de clientes, cuentas de ahorro/préstamos, GL, reporting; 400+ instituciones en 80+ países; 20M+ clientes activos. Release 24.09 con API-first architecture | 1.9k ★ — producción |
| [PyPortfolioOpt](https://github.com/robertmartin8/PyPortfolioOpt) | MIT | Optimización de portfolios en Python: Mean-Variance, Black-Litterman, hierarchical risk parity, integración con pandas | 5.8k ★ |
| [backtrader](https://github.com/mementum/backtrader) | GPL-3.0 | Framework de backtesting en Python; soporte multi-data, multi-strategy; cerebro integrado con broker simulado | 15.5k ★ |
| [awesome-ai-in-finance](https://github.com/georgezouq/awesome-ai-in-finance) | MIT | Lista curada de LLMs, deep learning y estrategias quant en finanzas; referencia de investigación de la comunidad | 3.5k ★ |
| [Riskfolio-Lib](https://github.com/dcajasn/Riskfolio-Lib) | BSD-3-Clause | Portfolio optimization avanzado: CVaR, CDaR, risk parity, robust optimization; especialmente útil para gestoras LATAM | 4.4k ★ |
| [OpenBB Platform](https://github.com/OpenBB-finance/OpenBB) | AGPLv3 | Open Data Platform para quants y agentes AI; extensible con providers; MCP-native desde v4; "connect once, consume everywhere" — Python, Workspace, Excel, MCP, REST | 39k ★ |

## Librerías de datos financieros

| Repo | Licencia | Descripción |
|------|----------|-------------|
| [yfinance](https://github.com/ranaroussi/yfinance) | Apache-2.0 | Descarga datos de Yahoo Finance; la más usada en PoCs financieros; 14.5k ★ |
| [pandas-datareader](https://github.com/pydata/pandas-datareader) | BSD-3 | Acceso a FRED, World Bank, Quandl desde pandas |
| [ccxt](https://github.com/ccxt/ccxt) | MIT | API unificada para +100 exchanges crypto; 43k ★; base para todo bot crypto |
| [alpaca-trade-api](https://github.com/alpacahq/alpaca-trade-api-python) | Apache-2.0 | SDK para Alpaca (broker regulado EEUU con API gratuita); ideal para paper trading en agentes |

## Infrastructure FINOS — OSS para Finanzas Reguladas

> FINOS (Fintech Open Source Foundation, Linux Foundation) — bancos tier-1 contribuyendo compliance como OSS

| Proyecto | Licencia | Descripción |
|----------|----------|-------------|
| [finos/AIGF](https://github.com/finos/AIGF) | Apache-2.0 | AI Governance Framework: catálogo de amenazas AI, mitigaciones, EU AI Act mapping + MCP server. **NUEVO v6** |
| [finos/common-cloud-controls](https://github.com/finos/common-cloud-controls) | Apache-2.0 | Common Controls for AI Services: BMO, Citi, Morgan Stanley, RBC, BofA + Microsoft, Google Cloud, AWS. **NUEVO v6** |
| [finos/open-resource-broker](https://github.com/finos/open-resource-broker) | Apache-2.0 | ORB: API unificada para HPC (compute, GPU) con MCP server — Morgan Stanley + AWS + RBC. **NUEVO v6** |
| [finos/CALM](https://github.com/finos/CALM) | Apache-2.0 | Compliant Architecture for Lightweight Messaging: estándar de mensajería para AI en finanzas reguladas |
| [finos/HTC-Grid](https://github.com/finos/HTC-Grid) | Apache-2.0 | High-throughput computing grid para workloads financieros; AWS-native |

## Benchmarks — Suite 2026

| Repo | Licencia | Tareas | Mejor Agente | Descripción |
|------|----------|--------|-------------|-------------|
| [SUFE-AIFLM-Lab/FinGAIA](https://github.com/SUFE-AIFLM-Lab/FinGAIA) | MIT | 407 | 48.9% (ChatGPT zero-shot) | Benchmark de conocimiento financiero en 7 subdominios (valores, fondos, banca, seguros, futuros, trusts, gestión de activos) — arXiv:2507.17186 |
| [RogoAI/big-finance-benchmark](https://huggingface.co/datasets/RogoAI/big-finance-benchmark) | — | 928 | **58.8% rubric score** | BigFinanceBench — workflow-grounded, evalúa derivación completa; Rogo + OpenAI — arXiv:2606.03829 (jun 2026) |
| [RUC-NLPIR/FinSight](https://github.com/RUC-NLPIR/FinSight) | MIT | dataset incluido | FinSight: 8.09 (vs OpenAI 6.11) | Equity + industry research tasks — ACL 2026 Main |

**Cómo usar en propuestas**: ejecutar FinGAIA (conocimiento general) + BigFinanceBench (research workflow) sobre el stack del cliente antes de go-live. Los gaps justifican fine-tuning, RAG sobre normativas y human-in-the-loop — especialmente para EU AI Act Anexo III.

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas. v6.*
