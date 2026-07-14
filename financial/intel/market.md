# 🗺️ Mapa de mercado — Financial Services AI

> Players, oportunidades, posicionamiento. Foco LATAM + global.
> Última actualización: 2026-07-14 (v5)

## Tamaño de mercado

| Métrica | Valor | Fuente |
|---------|-------|--------|
| AI en banca global (2026) | USD 45.6 B (+20% YoY desde $26.2B en 2024) | IDC / Finastra |
| AI en banca global (2030, proyectado) | USD 143.6 B — CAGR >30% | IDC |
| **Agentic AI en servicios financieros (2026)** | **USD 7.78 B** | Mordor Intelligence |
| **Agentic AI en servicios financieros (2031)** | **USD 43.52 B — CAGR 41.12%** | Mordor Intelligence |
| AI en finanzas global (2026, estimado estrecho) | USD 21.2 B (desde $17.7B en 2025, CAGR 19.5%) | AiBusiness Weekly |
| VC en AI fintech (Q1 2026 solo) | USD 2.1 B | CB Insights |
| Adopción agentic AI en finserv (2026) | **44% de equipos de finanzas** (600% más que en 2025) | Onereach AI |
| Adopción bancaria total (explorando/desplegando) | 70%; 14% full-scale | IDC |
| ROI agentic AI (promedio industria) | **2.3× en 13 meses** | KPMG / IDC |
| ROI top performers | hasta $8 por cada $1 invertido | KPMG |
| ROI promedio reportado | 171% en EEUU (192% para grandes enterprises) | Raftlabs |
| JPMorgan presupuesto AI 2026 | $2 B / año; 2 000 AI specialists; 400+ use cases | JPMorgan |
| JPMorgan ahorro acumulado AI | $1.5 B en cumulative savings | JPMorgan |
| Goldman Sachs AI adoption | GenAI a 46 000 empleados; 1M+ prompts/mes | Goldman |
| BlackRock Aladdin AUM bajo gestión AI | ~$25 T en activos | BlackRock |
| Mercado AI-agents en finanzas (2030) | USD 50 B+ (estimado industria amplia) | varios |

## Players globales — Instituciones Financieras

| Empresa | Iniciativa AI | Detalle |
|---------|--------------|----------|
| JPMorgan Chase | COIN + Agentes LLM | COIN: 360 000 horas abogado/año ahorradas en revisión de contratos; agentes sobre OpenAI/Anthropic para estrategias de inversión dinámicas; $2B presupuesto AI 2026 |
| Goldman Sachs | Firmwide GenAI + Devin | GenAI a 46 000 empleados; 1M+ prompts/mes; Devin (Cognition) en 12 000 devs → 3-4× productividad |
| BlackRock | RockAI + Aladdin Copilot | Aladdin gestiona ~$25T en activos; RockAI: plataforma no-code interna para deployar agentes sin escribir código |
| Morgan Stanley | AskResearch | Agente RAG sobre research reports; 16 000 asesores financieros con acceso |
| Lloyds Banking Group | Agentic AI 2026 strategy | Declaró 2026 "el año de la IA agentica en finanzas"; foco en automation de reconciliación y customer journeys |

## Players globales — Vendors Tech / Fintech

| Empresa | Tipo | Fortaleza |
|---------|------|----------|
| Palantir | Enterprise AI | AIP financiero; contratos con bancos regulados; fuerte en compliance |
| Fintool (acq. Microsoft) | Fintech AI | Document intelligence financiero; adquirida por Microsoft H1 2026 |
| Kensho (S&P Global) | Quant/NLP | Extracción de datos no estructurados de earnings calls, filings |
| Ayasdi (adq. SymphonyAI) | AML/Fraude | Anti-money laundering con ML; en producción en bancos tier-1 |
| Featurespace | Fraud/Risk | Adaptive behavioral analytics para fraude de tarjetas |
| Sardine | KYC/AML | Startup; behavioral biometrics + ML para compliance en tiempo real |

## Open Source — Ecosistema AI4Finance Foundation

| Proyecto | Stars | Rol en ecosistema |
|----------|-------|-------------------|
| FinRL | 10.2k | RL base para trading agents |
| FinGPT | 14.5k | LLM financiero, fine-tuning, sentiment |
| FinRobot | 7.3k | Plataforma de agentes multi-modal + Desktop v0.1.0 |
| ElegantRL | 2.8k | RL de alta performance en GPU |
| FinNLP | 1.2k | NLP financiero: NER, sentiment, event detection |

## Infraestructura de Pagos Agenticos (jul 2026)

| Player | Producto | Launch | Partners clave | Cobertura |
|--------|---------|--------|----------------|-----------|
| Mastercard | **Agent Pay for Machines** | 10 jun 2026 | Stripe, Adyen, Coinbase, Cloudflare, OKX, Ripple, Polygon, Solana | Tarjetas + cuentas bancarias + stablecoins; micropagos sub-centavo |
| Mastercard | **Agent Pay (Consumer)** | Nov 2025 (EEUU full) | Microsoft, PayPal, Google, Citi, US Bank | Agentic Tokens: credencial tokenizada vinculada a agent+merchant+policy |
| Visa | **Intelligent Commerce** | Activo 2026 | OpenAI (integración estratégica jun 10), Anthropic, Microsoft | Credenciales tokenizadas para agentes AI; behavioral auth |
| Visa + Inflow | Virtual card para agentes | May 2026 | Inflow | Agentes AI reciben tarjetas Visa reales para compras autónomas |

**Implicación estratégica**: los payment rails para agentes AI son infraestructura de producción desde junio 2026. Los agentes financieros pueden ahora transaccionar, no solo recomendar. Globant puede construir agentes de treasury, procurement y arbitraje que cierren el loop end-to-end.

## Benchmark Landscape 2026

| Benchmark | Origen | Tareas | Mejor Resultado | Para Globant |
|-----------|--------|--------|-----------------|-------------|
| **BigFinanceBench** | Rogo + OpenAI (arXiv:2606.03829, jun 2026) | **928 tareas**, 36k puntos de rúbrica, workflow-grounded | Mejor agente: **58.8%**; headroom masivo | Eval harness para buy-side; argumento de venta más robusto |
| FinGAIA | SUFE + Fudan (arXiv:2507.17186) | 407 tareas, 7 subdominios, 3 niveles | ChatGPT: 48.9% zero-shot; humanos: >84% | Benchmark de conocimiento financiero general |
| FLARE Suite | AI4Finance | Benchmarks NLP financiero (NER, Headline, sentiment) | FinGPT supera GPT-4 en tareas específicas | NLP financiero en español/portugués |
| FinLLM-Leaderboard | Open-Finance-Lab | Trading tasks + analysis | Referencia académica activa | — |
| Look-Ahead-Bench | arXiv:2601.13770 | Bias temporal en LLMs financieros (point-in-time) | Detecta LLMs que usan datos del futuro — relevante post TradingAgents v0.3.1 fix | Evaluación de honestidad de backtests |

## Oportunidades AI en LATAM

| Oportunidad | País/Región | Por qué ahora |
|-------------|-------------|---------------|
| KYC/AML digital para fintechs | Brasil, México, Colombia | Reformas regulatorias LGPD, CNBV; fintechs obligadas a compliance robusto sin budget de banco tradicional |
| Core banking para microfinanzas | Perú, Bolivia, Ecuador, Centroamérica | Fineract + agentes puede reemplazar sistemas legacy de SACCOs y cooperativas |
| Forecasting macro para PyMEs | Argentina, Brasil | Volatilidad FX y tasas; demanda de asistentes financieros accesibles |
| Compliance tributario con IA | Brasil (Reforma Tributaria 2026) | IBS/CBS/IS en implementación gradual 2026-2032; AI que entiende ambos regímenes |
| Open Finance APIs — personal finance agent | Brasil (operacional), Chile (desde abr 2026) | Mandatos regulatorios abren datos; Open Finance MCP + Claude = producto diferenciado |
| Gestión de portafolio LATAM | Argentina, Brasil, México | Riskfolio-Lib + datos locales (CCL, bonos soberanos) — no cubierto por soluciones globales |

## Posicionamiento Globant

- **Fortaleza diferencial**: capacidad de integrar agentes AI sobre sistemas core bancarios legacy (COBOL, AS/400) via API layers — algo que los pure-play AI startups no hacen.
- **LATAM anchor**: conocimiento regulatorio local (BCRA, Banco de México, CMF Chile, Bacen Brasil) difícil de replicar desde EEUU/Europa.
- **Stack sugerido para propuestas**: Fineract/sistema-cliente + FinRobot + Claude + OpenBB = Research Desk AI con data room interno del cliente.
- **Quick win**: kyc-analyst sobre Claude → PoC de compliance KYC en 2-3 semanas para banco mediano.
- **Argumento de ROI**: KPMG documenta 2.3× ROI en 13 meses; top performers $8 por $1. Financiero tiene el mayor ROI de AI por industria ($4.20 por $1 invertido).
- **Benchmark como herramienta de venta**: FinGAIA (48.9% best LLM vs 84%+ humanos) justifica por qué los agentes genéricos no son suficientes y por qué se necesita integración experta.

## LATAM — Deal Share actualizado Q1 2026

Brazil: **55% de todos los deals fintech de LatAm** en Q1 2026 (18 transacciones) — subió desde posiciones anteriores. Consolidación del mercado: solo los que ejecutan, sobreviven (QED Investors, jul 2026).

| País | Deal Share Q1 2026 | Señal clave | Oportunidad AI |
|------|---------------------|------------|----------------|
| Brasil | **55%** (18 txns) | Open Finance BACEN + Pix 2.0 scheduled payments | AML + fraud en rails Pix; agentes de datos Open Finance |
| México | ~15% | 77% adopción AI; 80% partnerships banco-AI; sandbox CNBV activo | KYC automation; agentes de pago SPEI |
| Colombia | ~10% | Daviplata 40M+ usuarios; open banking en desarrollo | Credit scoring economía informal; WhatsApp banking |
| Argentina | ~8% | Multi-currency (ARS/USD/CCL); controles de capital en flux | Monitoreo FX; contabilidad multi-moneda con AI |
| Chile | ~7% | Regs CMF open banking 2026; alta madurez fintech | Gestión de consentimiento; automatización de reporting regulatorio |

---
*Fuentes: IDC, Finastra, Mordor Intelligence, KPMG, Neurons Lab, Bloomberg, Lloyds Banking Group, Citizens Bank, AiBusiness Weekly, Mastercard/Visa press releases, arXiv:2606.03829, Brazil 55% Brazil Fintech Q1 2026 — jul 2026.*
