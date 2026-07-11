# 🎯 Top AI Agents & Tools — Retail & E-Commerce

> Curated open-source agents for retail, e-commerce, and consumer goods. Focus: MIT / Apache 2.0 licenses suitable for commercial use.
> Last updated: 2026-07-11

## Core AI Agents & Frameworks

| Name | Repo | License | Stars | Description |
|------|------|---------|-------|-------------|
| **Enthusiast** | [upsidelab/enthusiast](https://github.com/upsidelab/enthusiast) | MIT | ~800 | Production-ready agentic AI framework for e-commerce. RAG + vector search + workflow orchestrator. Native connectors for Shopify, Shopware, Medusa.js, Solidus. Agents for product search, catalog enrichment, content generation, support Q&A. Stack: Python/Django + React + LangChain. |
| **NVIDIA Retail Agentic Commerce** | [NVIDIA-AI-Blueprints/Retail-Agentic-Commerce](https://github.com/NVIDIA-AI-Blueprints/Retail-Agentic-Commerce) | Apache-2.0 | ~600 | Reference implementation of the Agentic Commerce Protocol (ACP) and Universal Commerce Protocol (UCP). Enables AI-powered checkout negotiation while maintaining merchant control. Blueprint for agent-to-merchant transactions. |
| **LightFM** | [lyst/lightfm](https://github.com/lyst/lightfm) | Apache-2.0 | ~4.7k | Hybrid collaborative + content-based recommendation algorithm. Supports BPR and WARP ranking losses. Scales to large datasets via Cython. Used in production at Lyst, Catalant. Incorporates user & item metadata into matrix factorization. |
| **RecBole** | [RUCAIBox/RecBole](https://github.com/RUCAIBox/RecBole) | MIT | ~3.5k | Unified recommendation framework with 100+ algorithms (CF, sequential, knowledge-aware, context-aware). One-stop pipeline: data processing → training → evaluation. Benchmarking packages for reproducible research. |
| **NVIDIA Merlin** | [NVIDIA-Merlin/Merlin](https://github.com/NVIDIA-Merlin/Merlin) | Apache-2.0 | ~1.8k | End-to-end GPU-accelerated recommender system. NVTabular for fast preprocessing, HugeCTR for high-throughput training & inference, Transformers4Rec for sequential/session-based recommendations. Used by large retailers for sub-millisecond inference. |
| **reco-gym** | [criteo-research/reco-gym](https://github.com/criteo-research/reco-gym) | Apache-2.0 | ~482 | Reinforcement learning environment for online advertising / product recommendation. Simulates user interactions for training and evaluating RL-based recommenders. From Criteo Research. |
| **stockpyl** | [LarrySnyder/stockpyl](https://github.com/LarrySnyder/stockpyl) | MIT | ~164 | Python library for inventory optimization and simulation. Implements EOQ, newsvendor, stochastic inventory models. Useful for AI-driven replenishment agents. |
| **eCommerce.ai** | [AmitXShukla/eCommerce.ai](https://github.com/AmitXShukla/eCommerce.ai) | MIT | ~300 | Complete end-to-end framework with a live virtual AI assistant to power in-store e-commerce. Covers product catalog, search, recommendations, and checkout flows with conversational AI. |
| **awesome-agentic-commerce** | [yifeizhangcs/awesome-agentic-commerce](https://github.com/yifeizhangcs/awesome-agentic-commerce) | MIT | ~400 | Curated list and survey of agentic commerce resources. Covers multi-agent market systems, conversational commerce, autonomous negotiation, pricing agents, supply chain agents, payment agents. Companion to the TechRxiv 2026 survey paper. |
| **awesome-agentic-commerce (GOAT)** | [GOATNetwork/awesome-agentic-commerce](https://github.com/GOATNetwork/awesome-agentic-commerce) | MIT | ~350 | Community-maintained curated list: agentic commerce ideas, best practices, implementations. Includes ACP-compatible agent patterns, negotiation protocols, and merchant API integrations. |

## Inventory & Supply Chain Agents

| Name | Repo | License | Stars | Description |
|------|------|---------|-------|-------------|
| **Demand-Forecasting** | [DavieObi/Demand-Forecasting-and-Inventory-Optimization](https://github.com/DavieObi/Demand-Forecasting-and-Inventory-Optimization) | MIT | ~50 | Time-series forecasting (ARIMA) for retail demand prediction and inventory optimization. Shows integration of ML forecasting into replenishment decisions. |
| **cortana-intelligence-inventory** | [Azure/cortana-intelligence-inventory-optimization](https://github.com/Azure/cortana-intelligence-inventory-optimization) | MIT | ~45 | Microsoft's inventory optimization solution guide. Azure-based but the optimization models (stochastic DP, simulation) are portable. Good reference architecture. |

## Why These Matter for Globant

- **Enthusiast** is the most plug-and-play agent toolkit for retail AI — drop it on top of Medusa.js or Shopify in days.
- **NVIDIA Retail-Agentic-Commerce** is the reference for ACP/UCP — the emerging protocol standard for agent-to-merchant transactions.
- **LightFM + RecBole** cover the full spectrum of recommendation use cases from cold-start to large-scale sequential.
- **Merlin** is the GPU path for enterprises needing sub-10ms recommendation inference.
- **stockpyl** is the building block for agentic inventory optimization agents.

---
*Updated automatically by the ingest pipeline.*
