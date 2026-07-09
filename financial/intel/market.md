# 🗺️ Market Intelligence — Financial Services AI

> Key players, market map, and positioning for Globant AI Studios.
> Last updated: 2026-07-09

## Market Size

| Segment | 2026 Value | 2030-2031 Forecast | CAGR |
|---------|-----------|-------------------|------|
| Agentic AI in Financial Services | $7.78B | $43.52B (2031) | 41.12% |
| AI Agents in Financial Services | $985M | $6.71B (2033) | 31.5% |
| AI in FinTech (overall) | est. $15B+ | $41B (2030) | 16.5% |
| Agentic AI in Fraud Detection | $11.53B | $55.66B (2030) | 49.1% |
| AI-powered FinTech VC (Q1 2026) | $2.1B (single quarter) | — | — |

> Sources: Mordor Intelligence, Grand View Research, Precedence Research, IndustryARC (Jul 2026)

## Global Players Map

### Data & Research Platforms
| Company | Type | Relevance to Globant |
|---------|------|---------------------|
| Bloomberg | Proprietary terminal | Data source for AI agents via Terminal/BQL APIs |
| Refinitiv (LSEG) | Data provider | Machine-readable news + financial data feeds for agents |
| OpenBB (YC) | Open source alt | MIT-adjacent; MCP server; Globant can embed in client solutions |
| FactSet | Proprietary | API-accessible for institutional clients |

### AI Infrastructure
| Company | Offering | Open Source Angle |
|---------|----------|------------------|
| Anthropic | Claude API | Best-in-class reasoning for financial research agents (FinSight uses Claude) |
| Microsoft | Azure OpenAI + Qlib | Qlib is MIT; Azure AI Foundry for enterprise deployment |
| Google | Gemini + Vertex AI | Competing in financial deep research (FinSight vs Gemini-2.5-Pro) |
| AI4Finance Foundation | FinRL, FinRobot | Academic/open source; Globant can fork + customize |
| HKU Data Science Lab | AI-Trader, Vibe-Trading | 2026 breakout; agent-native trading architecture |

### Enterprise Fintech Platforms
| Company | Product | AI Status |
|---------|---------|----------|
| Salesforce | Financial Services Cloud | Einstein Copilot for banking workflows |
| SAP | S/4HANA Finance | Joule AI copilot; integration via MCP |
| Oracle | Fusion Cloud Financials | AI-powered reconciliation and forecasting |
| Temenos | Core banking SaaS | AI-native LOS, fraud, compliance |
| Finastra | Open banking platform | Embedded AI in FusionFabric.cloud |

### Payments & Settlement
| Player | AI Initiative |
|--------|--------------|
| Visa | AI agent payment verification framework (Jul 2026) — merchants verify AI agents for autonomous payments |
| Mastercard | AI-driven transaction verification framework; AI at point-of-sale without human "click" |
| Stripe | Stablecoin-ready + AI fraud; Stripe AI docs for embedded finance |
| Nubank (Brazil) | Largest LATAM neobank; AI-native credit scoring; 100M+ customers |

## LATAM Market Intelligence

### Market Structure
- Brazil, Mexico, Colombia: >50% of total LATAM fintech market
- Brazil: 14.92% of regional investment; dominated Q1 2026 (4 of top 10 deals)
- Mexico: 77% consumer AI adoption; 80% fintech-bank partnership rate
- Capital is now flowing to **profitable verticals**: B2B payments, SME credit, embedded finance (not consumer neobanks)

### Country Intelligence
| Country | Regulator | AI Stance | Globant Opportunity |
|---------|-----------|-----------|---------------------|
| Brazil | BCB | Progressive; PIX open banking; model governance required; explainability mandatory | PIX-integrated AI agents; credit scoring; KYC automation |
| Mexico | CNBV | Prescriptive model governance; written explainability for high-impact decisions | SPEI-integrated agents; SOFIPO microfinance; SME credit |
| Colombia | SFC | Principles-based; lighter paperwork than BR/MX; growing DER regulations | Fraud detection; conversational banking; AML |
| Argentina | BCRA | Evolving; multi-currency critical (ARS/USD) | Stablecoin-aware treasury; FX hedging agents |
| Chile | CMF | Similar to Colombia; light-touch AI regulation | Embedded finance; retail banking agents |

### LATAM Pain Points → AI Opportunities
| Pain Point | AI Solution | Repo Starting Point |
|-----------|-------------|---------------------|
| Credit invisible population (50%+ unbanked) | Alternative data credit scoring | FinRL + Fineract |
| KYC/AML cost and friction | Automated document verification + compliance agent | Custom LLM + Apache Atlas |
| Fraud in PIX/SPEI real-time payments | Real-time anomaly detection agent | FinRL + hummingbot risk models |
| SME financial management complexity | AI CFO agent on ERPNext | FinRobot + ERPNext |
| FX volatility in AR, VE | Multi-currency hedge advisory agent | Qlib + OpenBB |

## Regulatory Calendar

| Deadline | Regulation | Impact |
|----------|-----------|--------|
| **Aug 2, 2026** | EU AI Act — High-Risk AI Systems | Credit scoring, insurance pricing, financial standing assessment = high-risk; €15M or 3% global turnover penalty; full audit trails required |
| Ongoing 2026 | Brazil BCB Open Finance | Third-party AI agent access to banking data with customer consent |
| 2026 | Mexico CNBV Model Governance | Written model governance docs; ongoing monitoring; human oversight on high-impact decisions |

## Positioning for Globant

### Differentiated Play
1. **Fineract + AI Studio for LATAM banks** — fork Fineract, add FinRL credit scoring, KYC agent, compliance reporting; productize as white-label SaaS for regional banks
2. **ERPNext + AI CFO** — layer FinRobot-style agents onto ERPNext for SME market; LATAM accounting standards built in
3. **Trading Desk AI** — TradingAgents + OpenBB MCP for Latin American asset managers and family offices
4. **EU AI Act Compliance Accelerator** — audit trail infrastructure + explainable AI wrappers for European financial institution clients

### Deal Sizes (indicative)
| Engagement | Size | Tech Stack |
|-----------|------|-----------|
| Credit scoring agent (microfinance) | $80k–$200k | Fineract + FinRL + Claude |
| AML/KYC automation | $150k–$500k | Custom LLM + Apache Atlas + Fineract APIs |
| SME AI CFO | $60k–$150k | ERPNext + FinRobot + Claude |
| Trading research platform | $100k–$400k | OpenBB + TradingAgents + FinSight |
| EU AI Act compliance audit | $50k–$200k | LLM audit trails + explainability layer |
| Full fintech platform build | $500k–$2M | Fineract + AI agents + mobile + compliance |

---
*Sources: Mordor Intelligence, Grand View Research, Precedence Research, Galileo-FT, Fintech.Global, Finastra, Patechlabs (all Jul 2026).*
