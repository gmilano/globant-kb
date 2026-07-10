# 🏗️ Foundation Repos — Financial Services

> Core open source libraries and platforms Globant can build AI solutions on top of.
> Focus: active maintenance, permissive licenses, real production deployments.
> Last updated: 2026-07-10 (v6)

## Core AI / Quant Finance Frameworks

| Repo | License | Stars | Description | Best For |
|------|---------|-------|-------------|---------|
| [microsoft/qlib](https://github.com/microsoft/qlib) | MIT | 44k+ | AI-oriented quant investment platform: data → signal → strategy → execution pipeline; RL, supervised, and market dynamics modeling; RD-Agent integration for automated quant R&D via LLM hypothesis generation | Quant research automation, AI strategy discovery |
| [AI4Finance-Foundation/FinRL](https://github.com/AI4Finance-Foundation/FinRL) | MIT | 12k | Financial reinforcement learning: PPO, SAC, TD3 DRL agents for stocks, crypto, forex; Gymnasium-compatible env; multi-task support; proven credit scoring + fraud detection use cases | Continuous RL trading strategies, credit scoring |
| [quantopian/zipline](https://github.com/quantopian/zipline) / [stefan-jansen/zipline-reloaded](https://github.com/stefan-jansen/zipline-reloaded) | Apache-2.0 | 17k / 1.7k | Pythonic event-driven backtester; zipline-reloaded is the actively maintained fork | Backtesting before live deployment |
| [QuantConnect/Lean](https://github.com/QuantConnect/Lean) | Apache-2.0 | 19.9k | Multi-asset algorithmic trading engine (equities, crypto, forex, options, futures) in Python + C#; cloud + local deploy; CLUE CI integration | Production-grade multi-asset algo trading |
| [google/tf-quant-finance](https://github.com/google/tf-quant-finance) | Apache-2.0 | 5.4k | High-performance TensorFlow quantitative finance: derivatives pricing, Monte Carlo, interest rate models | Derivatives, options, rate model pricing at scale |
| [robertmartin8/PyPortfolioOpt](https://github.com/robertmartin8/PyPortfolioOpt) | MIT | 5.8k | Portfolio optimization: mean-variance, Black-Litterman, HRP, CVaR; scikit-learn API; pair with AI signal generators | Portfolio construction from AI-generated signals |
| [ccxt/ccxt](https://github.com/ccxt/ccxt) | MIT | 43.5k | Unified API for 100+ crypto exchanges (JS/Python/PHP); de facto connector layer for any crypto trading agent | Crypto exchange connectivity |
| [avhz/RustQuant](https://github.com/avhz/RustQuant) | Apache-2.0 | 1.8k | Rust quantitative finance library — high-perf option pricing; growing community | High-performance derivatives pricing |

## Core Banking & Financial Platforms (build AI on top)

| Repo | License | Stars | Description | LATAM Relevance |
|------|---------|-------|-------------|----------------|
| [apache/fineract](https://github.com/apache/fineract) | Apache-2.0 | 2.3k | Cloud-ready core banking platform; REST API; loan portfolio, savings, KYC, accounting; 400+ institutions, 20M+ customers in 80+ countries | High — widely used in emerging market microfinance |
| [FinAegis/core-banking-prototype-laravel](https://github.com/FinAegis/core-banking-prototype-laravel) | Apache-2.0 | growing | **NEW v6** — Production-grade core banking with 61 DDD bounded contexts, event sourcing, CQRS, GraphQL; x402/MPP machine payments native; built-in MCP server for Claude/GPT; multi-asset, lending, compliance, cross-border; ISO 20022 / PSD2 / ACH / SEPA / FedNow; Laravel 12 / PHP 8.4 | High — modern PHP stack; MCP-native means instant AI agent integration |
| [frappe/erpnext](https://github.com/frappe/erpnext) | GPL-3.0 | 21k+ | Full ERP with accounting, banking, payroll, GST/tax; Frappe Python + Vue; strong LATAM community | SME financial management, AI CFO layer |
| [hummingbot/hummingbot](https://github.com/hummingbot/hummingbot) | Apache-2.0 | 19k | Open source market making + arbitrage bot; 40+ exchanges; Python strategy scripts; deployable as autonomous AI agent | Crypto market making automation |
| [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Apache-2.0 | 800+ | Enterprise ERP + CRM + GL + accounting; Java; mature and extensible; add AI agents as service engine tasks | Enterprise financial workflow automation |
| [openMF/mifos-mobile](https://github.com/openMF/mifos-mobile) | MPL-2.0 | 750+ | Mobile banking client for Mifos X / Fineract; Android/iOS; conversational AI on top for loan applications | LATAM mobile microfinance |

## Data & Infrastructure

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) | AGPLv3 | 38.4k | Open Data Platform; MCP server integration; connects analysts, quants, and AI agents to prices, fundamentals, macro, news |
| [wilsonfreitas/awesome-quant](https://github.com/wilsonfreitas/awesome-quant) | — | 5k+ | Curated index of quant finance libraries; use as discovery resource for gaps |
| [lballabio/QuantLib](https://github.com/lballabio/QuantLib) | BSD-3 | 4k+ | C++ derivatives pricing library; Python bindings via QuantLib-SWIG; bonds, rates, options |
| [georgezouq/awesome-ai-in-finance](https://github.com/georgezouq/awesome-ai-in-finance) | — | growing | Curated list of LLMs, DL strategies, and tools in financial markets; actively maintained 2026 |

## Agent Payment Infrastructure

| Repo | License | Description |
|------|---------|-------------|
| [xpaysh/awesome-x402](https://github.com/xpaysh/awesome-x402) | MIT | Curated x402 resources: HTTP 402 payment protocol for AI agents; TypeScript/Python/Rust SDKs; MCP integration; USDC payments in one line |
| Coinbase x402 SDK | MIT | Official TypeScript/Python/Rust SDKs; 69k active agents, 165M+ transactions, $600M annualized volume; AWS CloudFront + WAF integration |
| Coinbase Agentic Wallets | MIT | Non-custodial wallets in TEEs for AI agents; programmable spending limits; multi-party approval; audit logs |
| FinAegis x402 module | Apache-2.0 | x402/MPP machine payments built into FinAegis core banking — AI agents can initiate settlements directly via REST/GraphQL/MCP |

## Self-Improving Agent Frameworks (NEW v6)

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [chrisworsey55/atlas-gic](https://github.com/chrisworsey55/atlas-gic) | MIT | 2k | ATLAS: Karpathy-style autoresearch for trading agents; prompts as weights; Sharpe as loss; Darwinian selection; autonomous specialist spawning; PRISM Regime Training |
| [mirror29/openfinclaw-cli](https://github.com/mirror29/openfinclaw-cli) | MIT | 58 | OpenFinClaw-CLI: MCP-native quant agent; 60-second setup in Claude Code; 5 markets; self-evolving skills; community strategy leaderboard |

## Key Licenses at a Glance

| License | Repos | Commercial Use OK? |
|---------|-------|-------------------|
| MIT | FinRL, Qlib, CCXT, PyPortfolioOpt, x402 SDKs, ATLAS, OpenFinClaw-CLI | ✅ Yes, including SaaS |
| Apache-2.0 | Lean, Fineract, FinAegis, tf-quant-finance, OFBiz, hummingbot, zipline-reloaded, RustQuant | ✅ Yes, patent protection included |
| AGPLv3 | OpenBB | ⚠️ Copyleft — must open-source if serving over network; use OpenBB SDK under MIT for agent integrations |
| GPL-3.0 | ERPNext | ⚠️ Copyleft — OK for on-premise client deployments |
| BSD-3 | QuantLib | ✅ Yes |

---
*See also: `verticals/solutions.md` for vertical platforms and `agents/top.md` for AI agents.*
