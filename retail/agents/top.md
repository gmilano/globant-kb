# Top AI Agents & Tools — Retail Industry

> Last updated: 2026-07-02 | Focus: MIT / Apache 2.0 / BSD licenses Globant can build on

## AI Agents Table

| # | Name | GitHub | License | Stars | Description |
|---|------|--------|---------|-------|-------------|
| 1 | Gorse | [gorse-io/gorse](https://github.com/gorse-io/gorse) | Apache 2.0 | 8.5k+ | AI-powered open-source recommender system engine (Go); supports classical ML + LLM rankers and multimodal content via embeddings — integrates with any retail catalog via REST API in minutes |
| 2 | NVIDIA Retail Shopping Assistant | [NVIDIA-AI-Blueprints/retail-shopping-assistant](https://github.com/NVIDIA-AI-Blueprints/retail-shopping-assistant) | Apache 2.0 | 2k+ | Production-ready multi-agent blueprint built with LangGraph; handles natural-language queries, image-based product search, real-time streaming responses, and intelligent cart management |
| 3 | Microsoft Recommenders | [microsoft/recommenders](https://github.com/microsoft/recommenders) | MIT | 18k+ | Best-practice implementations of 30+ recommendation algorithms (collaborative filtering, content-based, deep learning, RL); includes SAR, NCF, xDeepFM, LightGBM with Jupyter notebooks |
| 4 | Retail Pricing Agent AI | [samhaldia/retail-pricing-agent-ai](https://github.com/samhaldia/retail-pricing-agent-ai) | MIT | 1k+ | Agentic AI system for real-time retail pricing and promotion; orchestrates a full pipeline — market data ingestion → demand forecasting → promotion strategy generation → price synchronization |
| 5 | NeuralForecast | [Nixtla/neuralforecast](https://github.com/Nixtla/neuralforecast) | Apache 2.0 | 3k+ | Scalable neural forecasting library (NHITS, N-BEATS, PatchTST, TimesNet, Moirai); purpose-built for SKU-level retail demand prediction across thousands of stores and long horizons |
| 6 | TimeGPT SDK (Nixtla) | [Nixtla/nixtla](https://github.com/Nixtla/nixtla) | Apache 2.0 | 2k+ | SDK for TimeGPT-1: pre-trained time-series transformer trained on 100B+ data points; handles retail promotions, holidays, and intermittent sales with zero-shot accuracy out of the box |
| 7 | Apache PredictionIO | [apache/predictionio](https://github.com/apache/predictionio) | Apache 2.0 | 13k+ | ML server for building and deploying predictive recommendation and purchase-propensity engines; exposes REST API that plugs directly into any commerce platform stack |
| 8 | CrewAI | [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | 52k+ | Multi-agent orchestration framework; coordinates retail AI crews (catalog curator, pricing agent, support agent, inventory watcher) with role-based task delegation and 5.2M monthly downloads |
| 9 | LangChain | [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | MIT | 95k+ | LLM orchestration framework; foundation for building retail chatbots, semantic product search chains, and agentic workflows with retrieval-augmented generation over product catalogs |
| 10 | 500 AI Agents Projects | [ashishpatel26/500-AI-Agents-Projects](https://github.com/ashishpatel26/500-AI-Agents-Projects) | MIT | 32k+ | Curated collection of 500+ AI agent use cases with retail patterns: 24/7 customer service bots, product recommendation agents, inventory management flows, and pricing agents |

## Notes

- **Gorse (1)** is the strongest self-hosted recommendation engine — drop-in alternative to AWS Personalize or Recombee, with new LLM re-ranking layer added in v0.5+.
- **NVIDIA Shopping Assistant (2)** is the most complete end-to-end reference architecture for retail AI; fork it as a starting point for any client shopping assistant engagement.
- **Microsoft Recommenders (3)** is the go-to benchmark library when evaluating recommendation algorithm choices before committing to a production stack.
- **NeuralForecast + TimeGPT (5–6)** are the 2026 leaders for demand forecasting; NeuralForecast for self-hosted fine-tuned models, TimeGPT for zero-shot accuracy without training.
- **CrewAI + LangChain (8–9)** are complementary: LangChain for individual chains/tools, CrewAI for multi-agent crews that coordinate pricing, inventory, and support simultaneously.
- All entries carry MIT, Apache 2.0, or BSD licenses suitable for commercial Globant client engagements.
