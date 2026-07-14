# 🏗️ Repos fundacionales — Financial Services

> Bases sobre las cuales construir. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-14 (v6)

## Plataformas y frameworks base

| Repo | Licencia | Descripción | Stars / Estado |
|------|----------|-------------|----------------|
| [zipline-reloaded](https://github.com/stefan-jansen/zipline-reloaded) | Apache-2.0 | Fork mantenido del motor de backtesting de Quantopian; integración con zipline-live para paper/live trading | 1.5k ★ — activo 2026 |
| [tf-quant-finance](https://github.com/google/tf-quant-finance) | Apache-2.0 | Librería TensorFlow de Google para finanzas cuantitativas: pricing de derivados, calibración de modelos estocásticos, Monte Carlo GPU-acelerado | 5.4k ★ |
| [QuantLib](https://github.com/lballabio/QuantLib) | BSD-3-Clause | La librería quant de referencia en C++: opciones, bonos, FX, swaps, curvas de tasa, Monte Carlo, más de 20 años de historia y uso en producción en bancos globales | 5.2k ★ |
| [FinRL](https://github.com/AI4Finance-Foundation/FinRL) | MIT | Reinforcement learning financiero: entornos multi-asset (equities, crypto, FX), algoritmos PPO/SAC/TD3, benchmarks NASDAQ/DOW/S&P | 10.2k ★ |
| [Apache Fineract](https://github.com/apache/fineract) | Apache-2.0 | Core banking open source: gestión de clientes, cuentas de ahorro/préstamos, GL, reporting; usado en 400+ instituciones en 80+ países; 20M+ clientes activos. Release 24.09 con API-first architecture | 1.9k ★ — producción |
| [PyPortfolioOpt](https://github.com/robertmartin8/PyPortfolioOpt) | MIT | Optimización de portfolios en Python: Mean-Variance, Black-Litterman, hierarchical risk parity, integración con pandas | 5.8k ★ |
| [backtrader](https://github.com/mementum/backtrader) | GPL-3.0 | Framework de backtesting en Python; soporte multi-data, multi-strategy; cerebro integrado con broker simulado | 15.5k ★ |
| [awesome-ai-in-finance](https://github.com/georgezouq/awesome-ai-in-finance) | MIT | Lista curada de LLMs, deep learning y estrategias quant en finanzas; referencia de investigación de la comunidad | 3.5k ★ |
| [Riskfolio-Lib](https://github.com/dcajasn/Riskfolio-Lib) | BSD-3-Clause | Portfolio optimization avanzado: CVaR, CDaR, risk parity, robust optimization; especialmente útil para gestoras LATAM | 4.4k ★ |
| [OpenBB Platform](https://github.com/OpenBB-finance/OpenBB) | AGPLv3 | Open Data Platform para quants y agentes AI; extensible con providers; MCP-native desde v4; "connect once, consume everywhere" — Python, Workspace, Excel, MCP, REST; alternativa open a Bloomberg/Refinitiv | 39k ★ |

## Librerías de datos financieros

| Repo | Licencia | Descripción |
|------|----------|-------------|
| [yfinance](https://github.com/ranaroussi/yfinance) | Apache-2.0 | Descarga datos de Yahoo Finance; la más usada en PoCs financieros; 14.5k ★ |
| [pandas-datareader](https://github.com/pydata/pandas-datareader) | BSD-3 | Acceso a FRED, World Bank, Quandl desde pandas |
| [ccxt](https://github.com/ccxt/ccxt) | MIT | API unificada para +100 exchanges crypto; 43k ★; base para todo bot crypto |
| [alpaca-trade-api](https://github.com/alpacahq/alpaca-trade-api-python) | Apache-2.0 | SDK para Alpaca (broker regulado EEUU con API gratuita); ideal para paper trading en agentes |

## Benchmarks — Suite 2026

| Repo | Licencia | Tareas | Mejor Agente | Descripción |
|------|----------|--------|-------------|-------------|
| [SUFE-AIFLM-Lab/FinGAIA](https://github.com/SUFE-AIFLM-Lab/FinGAIA) | MIT | 407 | 48.9% (ChatGPT zero-shot) | Benchmark de conocimiento financiero en 7 subdominios; SUFE + Fudan — arXiv:2507.17186 |
| [RogoAI/big-finance-benchmark](https://huggingface.co/datasets/RogoAI/big-finance-benchmark) | — | 928 | **58.8% rubric score** | BigFinanceBench — workflow-grounded, evalúa derivación completa; Rogo + OpenAI — arXiv:2606.03829 (jun 2026) |
| [DeepFin-Intelligence/ICBCBench](https://github.com/DeepFin-Intelligence/ICBCBench) | — | multi-track | sustancial gap | **ICBCBench** — consorcio industrial, 50+ expertos, 40+ orgs; dual-track objetivo+subjetivo; arXiv:2606.17458 (jun 2026) |
| [RUC-NLPIR/FinSight](https://github.com/RUC-NLPIR/FinSight) | MIT | benchmark incluido | FinSight: 8.09 (vs OAI 6.11) | Dataset de tareas de research financiero profundo — equity + industry level |

### Cómo usar los benchmarks en propuestas

| Benchmark | Para qué usarlo |
|-----------|------------------|
| FinGAIA (48.9%) | Conocimiento financiero general; 7 subdominios; argumentar por qué base models no son suficientes |
| BigFinanceBench (58.8%) | Financial research workflow buy-side; evalúa el proceso, no solo el resultado |
| ICBCBench | Deep research institucional; aval de 50+ expertos de 40+ orgs; más rigoroso para enterprise |
| FinSight (8.09) | Comparar vs OpenAI/Gemini Deep Research; sell-side y IR teams |

Ejecutar los 4 sobre el sistema del cliente antes del go-live. Los gaps identificados justifican fine-tuning, RAG sobre normativas y human-in-the-loop — especialmente para cumplimiento con EU AI Act Anexo III y MAS SAFR.

---

## MCP Ecosystem — infraestructura fundacional 2026

| MCP Server | Licencia | Función |
|------------|----------|---------|
| finance-trading-ai-agents-mcp | MIT | Arquitectura departamental completa |
| tradingview-mcp | MIT | Datos de mercado + TA en tiempo real |
| OpenBB MCP v4 | AGPLv3 | Multi-provider data hub |
| Alpaca MCP | Apache-2.0 | Live trade execution regulada |
| Open Finance MCP | MIT | Banking data reales BR/CL |

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
