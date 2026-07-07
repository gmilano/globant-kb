# Repos fundacionales — Financial AI

> Repositorios base de producción con años de adopción y comunidad sólida.
> Última actualización: 2026-07-07

## Plataformas de datos e investigación

| Repo | Licencia | Stars | Stack | Descripción |
|------|----------|-------|-------|-------------|
| [OpenBB](https://github.com/OpenBB-finance/OpenBB) | MIT | ~37k | Python, FastAPI, MCP | Open data platform: equities, crypto, opciones, macro, fundamentals. MCP server nativo. Alternativa a Bloomberg para quants y AI agents. |
| [awesome-ai-in-finance](https://github.com/georgezouq/awesome-ai-in-finance) | CC0-1.0 | ~6.2k | Lista curada | 200+ recursos: trading systems, LLMs, portfolio management, crypto, backtesting, datos. El punto de entrada para el ecosistema. |
| [FinAI](https://github.com/anusky95/FinAI) | MIT | ~800 | Lista curada | Hub con LLM research, datasets, benchmarks, RAG pipelines y herramientas de trading AI. |
| [Finance-LLMs](https://github.com/kennethleungty/Finance-LLMs) | MIT | ~1.5k | Lista curada | Documentación sistemática de implementaciones LLM en servicios financieros globales reales. |

---

## Frameworks de trading algorítmico

| Repo | Licencia | Stars | Stack | Descripción |
|------|----------|-------|-------|-------------|
| [LEAN](https://github.com/QuantConnect/Lean) | Apache-2.0 | ~12k | C#, Python | Motor de trading algorítmico QuantConnect: backtest + live trading. 300k+ usuarios. 180+ ingenieros contribuidores. Mia (AI agent) integrado. |
| [FinRL](https://github.com/AI4Finance-Foundation/FinRL) | MIT | ~15.7k | Python, Stable Baselines 3 | Primera librería DRL para trading. Algoritmos: A2C, DDPG, PPO, TD3, SAC. DOW30, crypto, HFT, portfolio allocation. |
| [zipline-reloaded](https://github.com/stefan-jansen/zipline-reloaded) | Apache-2.0 | ~1.2k | Python | Fork mantenido de Zipline (Robinhood original). Backtesting event-driven. Integración con pyfolio. |
| [backtrader](https://github.com/mementum/backtrader) | GPL-3.0 | ~15k | Python | Framework de backtesting con feeds múltiples, indicadores, estrategias y brokers simulados. |
| [rqalpha](https://github.com/ricequant/rqalpha) | Apache-2.0 | ~5.1k | Python | Framework extensible para investigación y backtesting de estrategias. Popular en Asia. |

---

## Portfolio management y risk analytics

| Repo | Licencia | Stars | Descripción |
|------|----------|-------|-------------|
| [pyfolio](https://github.com/quantopian/pyfolio) | Apache-2.0 | ~5.8k | Portfolio and risk analytics. Gráficos de drawdown, exposure, rolling returns. Integra con zipline. |
| [alphalens](https://github.com/quantopian/alphalens) | Apache-2.0 | ~3.2k | Análisis de factores predictivos de retornos. Quintile analysis, IC, turnover. |
| [empyrical](https://github.com/quantopian/empyrical) | Apache-2.0 | ~1.2k | Métricas comunes de riesgo y performance: Sharpe, Sortino, Calmar, max drawdown. |
| [skfolio](https://github.com/skfolio/skfolio) | BSD-3 | ~1.8k | Optimización de portfolio con scikit-learn. Mean-variance, risk parity, HRP, black-litterman. |
| [FinWorld](https://github.com/TradeMaster-NTU/FinWorld) | Apache-2.0 | ~300 | Framework unificado ML+DRL+LLM de NTU para las 4 tareas críticas en financial AI. |

---

## Compliance, AML y fraud detection

| Repo | Licencia | Stars | Descripción |
|------|----------|-------|-------------|
| [Marble](https://github.com/checkmarble/marble) | BSL-1.1 | ~553 | Motor de decisión en tiempo real: transaction monitoring, sanctions/PEP screening, case investigation. Alternativa a ComplyAdvantage. 15+ países. |
| [Jube](https://github.com/jube-home/aml-fraud-transaction-monitoring) | AGPL-3.0 | ~200 | AML + fraude con ML supervisado/no supervisado, detección por reglas, velocity checks, sanctions screening, case management con audit trail. Multi-tenant, Docker/K8s. |
| [awesome-financial-crime](https://github.com/topics/financial-crime) | Varios | — | Colección de recursos FCC: transaction monitoring, trade surveillance, sanctions screening, KYC/KYB, graph analytics. |

---

## LLMs financieros

| Modelo | Licencia | Stars | Base | Capacidad |
|--------|----------|-------|------|----------|
| [FinGPT v3](https://github.com/AI4Finance-Foundation/FinGPT) | MIT | ~20.8k | Llama-2/Falcon/Qwen | Sentiment, forecasting, robo-advisory. Fine-tune en <$300 con LoRA. |
| [PIXIU/FinMA](https://github.com/The-FinAI/PIXIU) | Apache-2.0 | ~800 | LLaMA | 136K muestras de instrucción financiera + benchmark FLARE para evaluación. |
| [FinBERT](https://github.com/ProsusAI/finBERT) | Apache-2.0 | ~1.8k | BERT | Análisis de sentimiento financiero. Entrenado en Reuters/Bloomberg/earnings calls. Estándar para NLP financiero. |
| [InvestLM](https://github.com/AbaciNLP/InvestLM) | GPL-3.0 | ~300 | LLaMA-65B | Fine-tuned en guías regulatorias de inversión (SEC, FINRA). |

---

## Datasets financieros para entrenamiento

| Dataset | Licencia | Descripción |
|---------|----------|-------------|
| [fingpt-sentiment-train](https://huggingface.co/datasets/FinGPT/fingpt-sentiment-train) | CC-BY-4.0 | 76.8K muestras de sentimiento financiero etiquetadas. Gold standard para fine-tuning. |
| [FLARE benchmark](https://github.com/The-FinAI/PIXIU) | Apache-2.0 | Benchmark para evaluación de LLMs financieros: 18 tareas en 4 dimensiones. |
| [SEC EDGAR full-text](https://efts.sec.gov/LATEST/search-index) | Public Domain | 35M+ filings 10-K/10-Q/8-K desde 1993. Base para fine-tuning en análisis de documentos regulatorios. |
| [Quandl/Nasdaq Data Link](https://data.nasdaq.com/) | Comercial/Gratis | Millones de datasets financieros. Tier gratuito suficiente para prototipos. |
