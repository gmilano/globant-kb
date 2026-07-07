# 🎯 Agentes AI — Retail & Consumer

> Agentes y herramientas AI open source para la industria retail. Foco: MIT / Apache 2.0.
> Última actualización: 2026-07-07 (quinto pase — agentic commerce, NVIDIA Blueprints, UCP)

## Agentes y herramientas destacadas

| Nombre | Licencia | Descripción | Stars |
|--------|----------|-------------|-------|
| [NVIDIA Retail Shopping Assistant](https://github.com/NVIDIA-AI-Blueprints/retail-shopping-assistant) | Apache-2.0 | Blueprint multi-agente (LangGraph) para advisor de compras: visual search, cart management, streaming responses, 5 agentes especializados (Planner→Product Search→Cart→Q&A→Checkout) | ~400 |
| [gorse](https://github.com/gorse-io/gorse) | Apache-2.0 | Motor de recomendación en Go con soporte para LLM rankers, embeddings multimodales (texto, imagen, video), classical CF; REST API lista para producción | 9.6k |
| [Microsoft Recommenders](https://github.com/recommenders-team/recommenders) | MIT | Best practices para sistemas de recomendación: 100+ algoritmos (ALS, SAR, NCF, xDeepFM, LightGBM), notebooks Jupyter, benchmarks | 20k |
| [RecBole](https://github.com/RUCAIBox/RecBole) | MIT | Framework unificado PyTorch para 94 algoritmos de recomendación (CF, content-based, knowledge-aware, sequential); 44 benchmarks incluidos | 3.5k |
| [tensor-house](https://github.com/ikatsov/tensor-house) | MIT | Colección de notebooks ML para enterprise: pricing con DQN RL, supply chain optimization, marketing mix, LTV prediction con BTYD, demand forecasting | 1.8k |
| [retailGPT](https://github.com/unicamp-dl/retailGPT) | MIT | Chatbot RAG para e-commerce: retrieval sobre catálogo de productos, LLM para respuestas conversacionales, integración con bases de datos de inventario | 180 |
| [multi-agent-rag-customer-support](https://github.com/ro-anderson/multi-agent-rag-customer-support) | MIT | Sistema multi-agente de soporte al cliente con LangChain + LangGraph: routing de intenciones, RAG sobre FAQs/políticas, escalamiento a humano | 120 |
| [NVIDIA Multi-Agent Intelligent Warehouse](https://github.com/NVIDIA-AI-Blueprints/Multi-Agent-Intelligent-Warehouse) | Apache-2.0 | Blueprint multi-agente para logística: optimización de picking, gestión de inventario en tiempo real, integración con sistemas WMS/ERP | ~300 |
| [LightFM](https://github.com/lyst/lightfm) | Apache-2.0 | Recomendador híbrido (colaborativo + content-based) en Python/Cython: escalable, soporta cold start, usado en producción por múltiples retailers | 4.7k |
| [shelfops](https://github.com/IFAKA/shelfops) | MIT | Auditoría de estantería retail con visión: compara inferencia Cerebras Gemma 4 vs. Gemma local; detecta gaps, productos fuera de lugar, planogramas | ~30 |
| [retail-ai-store-level-intelligence](https://github.com/Svyatoslavpech/retail-ai-store-level-intelligence) | Apache-2.0 | Inteligencia a nivel de tienda: análisis de tráfico, patrones de compra, optimización de layout usando ML; demo con datos sintéticos realistas | ~10 |
| [ikatsov/algorithmic-marketing](https://github.com/ikatsov/algorithmic-marketing) | MIT | Notebooks de marketing algorítmico: atribución multi-touch, optimización de presupuesto, modelos de uplift, bid optimization para ads retail | 900 |

---

## Cuándo usar cada uno

| Caso de uso | Agente recomendado |
|-------------|-------------------|
| Shopping assistant conversacional | NVIDIA Retail Shopping Assistant |
| Recomendaciones en producción (API) | Gorse |
| Investigación/prototipo de recomendaciones | Microsoft Recommenders o RecBole |
| Cold start + hybrid recommendations | LightFM |
| Pricing dinámico / supply chain | tensor-house |
| Chatbot de soporte al cliente | retailGPT + multi-agent-rag-customer-support |
| Auditoría de estantería con visión | shelfops |
| Logística / warehouse management | NVIDIA Multi-Agent Intelligent Warehouse |

---
*Actualizado automáticamente por el pipeline de ingest.*
