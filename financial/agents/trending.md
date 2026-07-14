# 📈 Agentes trending — Financial Services

> Lo más nuevo y en crecimiento esta semana. Última actualización: 2026-07-14 (v6)
> ⚠️ EU AI Act deadline: **2026-08-02 — 19 días** | MAS SAFR framework v1.0 publicado

## Qué está explotando — semana del 14 jul 2026

### 🔥 NUEVO: MAS SAFR (jul 2026) — el marco de referencia global para agentes financieros
La Monetary Authority of Singapore (MAS) publicó **Safeguards for Agentic Finance at Runtime (SAFR) v1.0** en julio 2026, co-escrito con Ant International, Circle, HSBC, JP Morgan, Manulife, Mastercard, OCBC y Visa.

SAFR define cómo se autorizan las acciones de los agentes, cómo se activa la supervisión humana y qué se registra en cada decisión. Los cuatro pilares:
- **Policy Bound Execution**: el agente solo ejecuta dentro de mandatos pre-aprobados
- **Real-Time Validation**: validación de acción antes de ejecutar (no post-hoc)
- **Auditability**: log inmutable de cada paso de razonamiento y acción
- **Interoperability**: agentes de distintos vendors operan bajo el mismo contrato de governance

Casos de uso aplicados: agent-assisted payments, treasury sweeps, wealth management, client engagement.

**No es regulación obligatoria** — es un framework de referencia de la industria (no guidance supervisora). Pero al venir de MAS con JP Morgan, Mastercard y Visa como co-autores, **se convertirá en el estándar de facto en APAC y referencia global**. Globant debe incluir SAFR en propuestas para clientes financieros en Asia, Europa y LATAM.

### 🔥 NUEVO: Fiserv agentOS (mayo 2026) — el sistema operativo para agentes bancarios
[Fiserv](https://www.fiserv.com/en/lp/agentos-by-fiserv.html) lanzó **agentOS** en mayo de 2026 como el "sistema operativo para agentic AI en banca". Principios de diseño: identity-bound execution, policy enforcement, observability y trazabilidad end-to-end.

**Agent Marketplace**: 4 agentes propios de Fiserv + 9 third-party partners:
- Commercial Loan Onboarding Agent
- Daily Operational Analysis & Reporting Agent
- Agentic Deposit Intelligence
- Agentic AML Triage Analysis

Partners en el marketplace cubren: customer engagement, financial crimes compliance, deposit intelligence, regulatory compliance, dispute management, reconciliation.

GA prevista: **agosto 2026** (coincide con EU AI Act deadline). Desarrollado con OpenAI; AWS es partner estratégico de infraestructura.

**Por qué importa para Globant**: agentOS define el estándar de governance para bancos que usan Fiserv (centenares de instituciones). Si los clientes de Globant usan Fiserv, la arquitectura de agentes debe ser compatible con agentOS.

### 🔥 NUEVO: FIS + Anthropic Financial Crimes Agent (mayo 2026)
[FIS anunció](https://www.fisglobal.com/about-us/media-room/press-release/2026/fis-brings-agentic-ai-to-banking-with-anthropic-starting-with-financial-crimes) partnership con Anthropic para construir el primer agente de AI para crímenes financieros de producción. El agente comprime investigaciones AML de horas a minutos:

1. Ensambla evidencia automáticamente a través de sistemas core del banco
2. Evalúa actividad contra tipologías conocidas de AML
3. Surfea casos de mayor riesgo al investigador con trazabilidad completa

Cada conclusión está vinculada a su fuente de datos; cada decisión queda con el investigador. Early adopters: BMO y Amalgamated Bank. GA: H2 2026.

El equipo de Applied AI y forward-deployed engineers de Anthropic está embebido con FIS para co-diseño y transferencia de conocimiento.

**Implicación**: Anthropic está posicionando Claude no solo como LLM genérico sino como componente central en infraestructura bancaria regulada. Agentes basados en Claude con audit trail nativo son el patrón emergente para AML + financial crimes.

### 🔥 NUEVO: finance-trading-ai-agents-mcp — MCP de arquitectura departamental
[aitrados/finance-trading-ai-agents-mcp](https://github.com/aitrados/finance-trading-ai-agents-mcp) es un MCP server comprehensivo y gratuito para análisis financiero y trading cuantitativo. Deploy en un comando. La arquitectura imita la estructura real de una firma financiera:
- **Research Department**: fundamentals, noticias, análisis sectorial
- **Quant Department**: indicadores técnicos, backtesting, modelos estadísticos
- **Risk Department**: VAR, correlation, drawdown analysis
- **Macro Department**: calendarios económicos, FX, bonos soberanos

Integra con LLMs y permite a agentes acceder a análisis completo de mercado sin construir conectores individuales.

### TradingAgents v0.3.1 (jul 2026) — fix crítico de look-ahead bias
[TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | MIT | 82k+★

**v0.3.1**: fix crítico de look-ahead filtering en Alpha Vantage — backtests con v0.2.x usaban datos del futuro. Claude Sonnet 5 + Fable 5 support; Bedrock auth; FRED + Polymarket como data vendors. Todos los benchmarks publicados con v0.2.x son sospechosos.

### BigFinanceBench (arXiv:2606.03829, jun 2026) — 58.8% gap
928 tareas financieras de nivel experto, 36,241 puntos de rúbrica que evalúan derivación completa (no solo resultado). Mejor agente frontier: **58.8%** rubric score. Headroom masivo vs analistas humanos.

### ICBCBench (arXiv:2606.17458, jun 2026) — consorcio de 50+ expertos
[DeepFin-Intelligence/ICBCBench](https://github.com/DeepFin-Intelligence/ICBCBench) — benchmark industrial para financial deep research. 50+ expertos de 40+ organizaciones financieras. Dual-track: tareas objetivas con respuestas verificables + evaluación de reportes long-form (expert alignment, citation consistency, source quality). Resultado: gaps sustanciales en reasoning complejo, grounding factual y calidad de reporte.

### FinSight ACL 2026 — supera a OpenAI Deep Research
[RUC-NLPIR/FinSight](https://github.com/RUC-NLPIR/FinSight) | MIT | ~800★

Pipeline multi-etapa: DataCollectionAgent → AnalysisAgent → VLMChartAgent → Chain-of-Analysis → ReportGenerationAgent. Score: **8.09** vs OpenAI Deep Research 6.11. Un ticker → reporte institucional en ~20 min.

### Mastercard Agent Pay for Machines (10 jun 2026) — pagos M2M en producción
30+ partners: Stripe, Adyen, Coinbase, Cloudflare, OKX, Ripple, Polygon, Solana. Micropagos M2M, stablecoins. Los agentes ya no solo recomiendan — **transaccionan**.

## MCP Ecosystem financiero — explosión de servidores (julio 2026)

| MCP Server | Repo | Licencia | Descripción |
|------------|------|----------|-------------|
| finance-trading-ai-agents-mcp | [aitrados/finance-trading-ai-agents-mcp](https://github.com/aitrados/finance-trading-ai-agents-mcp) | MIT | Deploy en un comando; arquitectura departamental (research/quant/risk/macro) |
| tradingview-mcp | [atilaahmettaner/tradingview-mcp](https://github.com/atilaahmettaner/tradingview-mcp) | MIT | Real-time market data, TA, screeners, backtesting — stocks/crypto/forex/futuros |
| financekit-mcp | [vdalhambra/financekit-mcp](https://github.com/vdalhambra/financekit-mcp) | MIT | 17 herramientas: quotes, TA, crypto CoinGecko, risk metrics (Sharpe/Sortino/Beta) |
| Sharpe crypto MCP | [sharpe.ai/crypto-mcp](https://sharpe.ai/crypto-mcp) | — | Funding rates de 13 venues perpetual, options Deribit, futures en 10 exchanges |
| financial-datasets-mcp | [financial-datasets/mcp-server](https://github.com/financial-datasets/mcp-server) | MIT | SEC filings, income statements, balance sheets, cash flow, stock prices via Financial Datasets API |
| Alpaca MCP | Alpaca Markets | Apache-2.0 | Live trade execution — stocks, ETFs, crypto, options vía broker regulado |
| Open Finance MCP | open-finance-ai | MIT | Open Finance de Brasil/Chile conectado a Claude vía MCP |
| OpenBB MCP v4 | [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) | AGPLv3 | MCP-native: Bloomberg, Alpha Vantage, Quiver Quant en un hub |

> 171+ financial MCP servers en mcpservers.org/category/finance — el ecosistema de datos de mercado más denso de todo MCP.

## Patrones emergentes — semana del 14 jul 2026

| Patrón | Descripción |
|--------|-------------|
| SAFR-compliant agent design | Policy bound execution + real-time validation + audit log inmutable desde diseño inicial |
| Anthropic-in-core-banking | Claude como componente de infraestructura regulada (FIS AML, Visa, Mastercard) |
| Department-architecture MCP | finance-trading-ai-agents-mcp como patrón de organización de herramientas en roles reales |
| agentOS marketplace pattern | Compose Fiserv/third-party agents en un governance layer unificado |
| ICBCBench as go-live gate | Usar benchmark industrial (50+ expertos) como criterio de aceptación antes de producción |
| Multi-MCP financial stack | 3-5 MCP servers especializados (data/execution/compliance/research) vs SDK monolítico |
| Structured-output trading agents | Agentes que devuelven JSON tipado, auditables y testeables |
| Agentic payments closed-loop | Mastercard Agent Pay / Visa Intelligent Commerce — transacción autónoma end-to-end |
| Look-ahead hygiene | TradingAgents v0.3.1 fix — backtests v0.2.x inflados; re-evaluación requerida |

## ⏰ EU AI Act — Countdown

**Deadline: 2026-08-02 — 19 días**

Sistemas AI de alto riesgo en finanzas (Anexo III):
- Scoring crediticio / decisiones de préstamo → alto riesgo
- Monitoreo AML / transacciones → alto riesgo (FIS + Anthropic cubrirá esto)
- Suscripción de seguros / pricing → alto riesgo
- Detección de fraude que restringe acceso → alto riesgo

Sanción: **€35M o 7% del facturado global anual**.

---
*Pipeline automático — se actualiza en cada ingest.*
