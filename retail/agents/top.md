# Top AI Agents & Tools — Retail Industry

> Last updated: 2026-07-04 | Focus: MIT / Apache 2.0 / BSD licenses Globant can build on

## AI Agents Table

| # | Name | GitHub | License | Stars | Description |
|---|------|--------|---------|-------|-------------|
| 1 | Gorse | [gorse-io/gorse](https://github.com/gorse-io/gorse) | Apache 2.0 | 9.6k+ | AI-powered open-source recommender system engine (Go); supports classical ML + LLM rankers and multimodal content via embeddings — integrates with any retail catalog via REST API in minutes |
| 2 | NVIDIA Retail Shopping Assistant | [NVIDIA-AI-Blueprints/retail-shopping-assistant](https://github.com/NVIDIA-AI-Blueprints/retail-shopping-assistant) | NVIDIA License* | 2k+ | Production-ready multi-agent blueprint built with LangGraph; handles natural-language queries, image-based product search, real-time streaming responses, and intelligent cart management |
| 3 | NVIDIA Retail Catalog Enrichment | [NVIDIA-AI-Blueprints/Retail-Catalog-Enrichment](https://github.com/NVIDIA-AI-Blueprints/Retail-Catalog-Enrichment) | Apache 2.0 | 1k+ | GenAI-powered catalog enrichment system (Apache 2.0): transforms basic product images into comprehensive rich catalog entries — titles, descriptions, attributes, tags — at scale using vision-language models |
| 4 | Microsoft Recommenders | [microsoft/recommenders](https://github.com/microsoft/recommenders) | MIT | 18k+ | Best-practice implementations of 30+ recommendation algorithms (collaborative filtering, content-based, deep learning, RL); includes SAR, NCF, xDeepFM, LightGBM with Jupyter notebooks |
| 5 | NeuralForecast | [Nixtla/neuralforecast](https://github.com/Nixtla/neuralforecast) | Apache 2.0 | 3.5k+ | Scalable neural forecasting library (NHITS, N-BEATS, PatchTST, TimesNet, Moirai); purpose-built for SKU-level retail demand prediction across thousands of stores and long horizons |
| 6 | TimeGPT SDK (Nixtla) | [Nixtla/nixtla](https://github.com/Nixtla/nixtla) | Apache 2.0 | 2k+ | SDK for TimeGPT-1: pre-trained time-series transformer trained on 100B+ data points; handles retail promotions, holidays, and intermittent sales with zero-shot accuracy out of the box |
| 7 | Rasa | [RasaHQ/rasa](https://github.com/RasaHQ/rasa) | Apache 2.0 | 19k+ | Open-source conversational AI framework for retail customer service chatbots; new CALM architecture (2025) augments NLU with LLM reasoning for handling complex customer journeys |
| 8 | Apache PredictionIO | [apache/predictionio](https://github.com/apache/predictionio) | Apache 2.0 | 13k+ | ML server for building and deploying predictive recommendation and purchase-propensity engines; exposes REST API that plugs directly into any commerce platform stack |
| 9 | CrewAI | [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | 55k+ | Multi-agent orchestration framework; coordinates retail AI crews (catalog curator, pricing agent, support agent, inventory watcher) with role-based task delegation and 5.2M monthly downloads |
| 10 | LangChain | [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | MIT | 100k+ | LLM orchestration framework; foundation for building retail chatbots, semantic product search chains, and agentic workflows with retrieval-augmented generation over product catalogs |

*NVIDIA Shopping Assistant blueprint uses NVIDIA License for models/data but orchestration code is open-source; Retail-Catalog-Enrichment (row 3) is cleanly Apache 2.0 for commercial use.

## Notes

- **Gorse (1)** is the strongest self-hosted recommendation engine — drop-in alternative to AWS Personalize or Recombee, with LLM re-ranking layer; now at 9.6k stars (was 8.5k in July 2).
- **NVIDIA Catalog Enrichment (3)** is new on this update — Apache 2.0, the most commercially usable of the NVIDIA retail blueprints; pair with Medusa/Saleor for automated catalog ops.
- **Rasa (7)** upgraded to CALM (Contextual Autonomous Language Model) architecture in 2025; the 2026 standard for intent-aware retail customer service bots with on-prem/private-cloud deployment.
- **NeuralForecast + TimeGPT (5–6)** are the 2026 leaders for demand forecasting; NeuralForecast for self-hosted fine-tuned models, TimeGPT for zero-shot accuracy without training.
- **CrewAI + LangChain (9–10)** are complementary: LangChain for individual chains/tools, CrewAI for multi-agent crews that coordinate pricing, inventory, and support simultaneously.
- All entries carry MIT, Apache 2.0, or BSD licenses suitable for commercial Globant client engagements (except NVIDIA Shopping Assistant — use Catalog Enrichment Blueprint instead for Apache-clean projects).
