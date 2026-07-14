# 🏭 Verticales de partida — Financial Services

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agentica arriba.
> Última actualización: 2026-07-14 (v6)

## Plataformas recomendadas

| Plataforma | Licencia | Repo / URL | Stack | Caso de uso principal |
|------------|----------|------------|-------|----------------------|
| Apache Fineract | Apache-2.0 | [apache/fineract](https://github.com/apache/fineract) | Java/Spring, REST API | Core banking: préstamos, ahorro, GL, KYC; 400+ instituciones en 80+ países, 20M+ clientes; API-first |
| ERPNext (Frappe) | GPL-3.0 | [frappe/erpnext](https://github.com/frappe/erpnext) | Python/JS | ERP contabilidad + finanzas; módulos de cuentas, activos, nómina; popular en LATAM |
| Apache OFBiz | Apache-2.0 | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Java EE | ERP completo con GL, cuentas por cobrar/pagar, presupuestos, inventario |
| Dolibarr ERP/CRM | GPL-3.0 | [Dolibarr/dolibarr](https://github.com/Dolibarr/dolibarr) | PHP | ERP/CRM para PyMEs: facturas, inventario, POS, cuentas bancarias; muy popular en LATAM |
| FinAegis | Apache-2.0 | [finaegis.org](https://finaegis.org/) | Laravel/DDD | Core banking production-grade con 61 módulos: pagos, lending, compliance, cross-border |
| OpenBB Platform | AGPLv3 | [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) | Python | Open Data Platform: multi-provider (Bloomberg, Alpha Vantage, Quiver Quant), MCP-native v4 |
| Backtrader | GPL-3.0 | [mementum/backtrader](https://github.com/mementum/backtrader) | Python | Backtesting y live trading; broker connectors para Interactive Brokers, Alpaca |
| jube AML/Fraud | AGPL-3.0 | [jube-home/aml-fraud-transaction-monitoring](https://github.com/jube-home/aml-fraud-transaction-monitoring) | .NET/PostgreSQL | Monitoreo de transacciones en tiempo real: AML + fraude + sanctions screening |
| Hummingbot | Apache-2.0 | [hummingbot/hummingbot](https://github.com/hummingbot/hummingbot) | Python | Market making y arbitraje en crypto/DeFi; high-frequency; 19k ★ |
| Open Finance MCP | MIT | [open-finance-ai/open-finance-mcp](https://github.com/open-finance-ai) | Python/MCP | Conecta cuentas bancarias de Brasil (Open Finance v4) y Chile a Claude vía MCP |

## MCP Servers financieros — infraestructura de datos 2026

| MCP Server | Licencia | URL | Caso de uso |
|------------|----------|-----|-------------|
| finance-trading-ai-agents-mcp | MIT | [aitrados/finance-trading-ai-agents-mcp](https://github.com/aitrados/finance-trading-ai-agents-mcp) | Arquitectura departamental (Research/Quant/Risk/Macro); one-click deploy; análisis financiero completo |
| tradingview-mcp | MIT | [atilaahmettaner/tradingview-mcp](https://github.com/atilaahmettaner/tradingview-mcp) | Datos de mercado TradingView: TA, screeners, backtesting — stocks/crypto/forex/futuros |
| financekit-mcp | MIT | [vdalhambra/financekit-mcp](https://github.com/vdalhambra/financekit-mcp) | 17 herramientas: quotes, TA, crypto CoinGecko, risk metrics (Sharpe/Sortino/Beta) |
| financial-datasets-mcp | MIT | [financial-datasets/mcp-server](https://github.com/financial-datasets/mcp-server) | SEC filings, income statements, balance sheets, stock prices |
| Alpaca MCP | Apache-2.0 | Alpaca Markets | Live trade execution: stocks, ETFs, crypto, options |
| Sharpe crypto MCP | Comercial | sharpe.ai | Funding rates 13 venues perpetual, Deribit options, futures en 10 exchanges |
| OpenBB MCP v4 | AGPLv3 | OpenBB-finance/OpenBB | Multi-provider hub: Bloomberg, Alpha Vantage, Quiver Quant |

## Ecosistema Open Finance LATAM

| País | Estado Open Finance | API Estándar | Oportunidad |
|------|---------------------|--------------|-------------|
| Brasil | Fase 4 — operacional | API Banco Central BR + Open Finance MCP | Personal finance agent, comparador de productos, AML sobre rails Pix. **55% del deal flow fintech LatAm Q1 2026** |
| Chile | Implementación obligatoria desde abr 2026 | CMF Chile — APIs en definición final | Primeros movers: advisory bots sobre datos bancarios reales |
| México | Regulación CNBV en curso | CNBV APIs | Conexión con Fintechs Ley Fintech; SPEI data |
| Colombia | Marco en desarrollo | SFC Colombia | Market en early stage — ventana competitiva |
| Argentina | Sin marco regulatorio aún | — | Oportunidad en FinTechs no-bancarias |

## Cómo customizar con AI

### Opción A — Apache Fineract + agentes compliance + MAS SAFR governance
```
Apache Fineract (core banking API)
    ↓
Webhook events (desembolso, pago, apertura cuenta)
    ↓
kyc-analyst agent (KYC/AML scoring con Claude — MIT)
    • Policy Bound: mandato pre-aprobado por riesgo officer
    • Real-Time Validation: score verificado antes de aprobar onboarding
    ↓
jube (monitoreo continuo de transacciones — AGPL-3.0)
    ↓
Audit Log inmutable (MAS SAFR Auditability pillar)
    ↓
Dashboard compliance para oficiales de riesgo
```

### Opción B — OpenBB + TradingAgents + MCP financial stack
```
tradingview-mcp + financekit-mcp + OpenBB MCP v4 (datos, TA, risk metrics)
    ↓
TradingAgents v0.3.1 (bull/bear/riesgo debate, structured-output, multi-provider)
    [IMPORTANTE: usar v0.3.1 — v0.2.x tenía look-ahead bias]
    ↓
FinGPT sentiment layer (noticias + tweets en tiempo real)
    ↓
Reporte de inversión + trazabilidad de decisión (LangGraph checkpoints)
    ↓
Alpaca MCP para ejecución live (si autorizado por cliente)
```

### Opción C — ERPNext + FinRobot (CFO assistant)
```
ERPNext (contabilidad + GL + cash flow)
    ↓
Conector MCP que expone GL, cash flow, AR/AP como contexto
    ↓
FinRobot (AI4Finance-Foundation/FinRobot — MIT)
    • Análisis de estados financieros
    • Comparación con peers de la industria (datos OpenBB)
    • Proyección de flujo de caja a 30/60/90 días
    ↓
Claude como orquestador + generador de reportes narrativos
    ↓
CFO dashboard: semáforo de liquidez, alertas de deuda, escenarios
```

### Opción D — Open Finance MCP + Claude (personal finance LATAM)
```
Open Finance de Brasil/Chile (conector MCP)
    ↓
Datos de cuenta real (extractos, movimientos, balance) vía MCP
    ↓
Claude como asistente personal financiero
    ↓
Features: resumen de gastos, alerta de saldo, forecast de flujo, comparador de créditos
```

### Opción E — finance-trading-ai-agents-mcp + Claude (financial AI agent one-click)
```
finance-trading-ai-agents-mcp (one-click deploy local)
    • Research Department: fundamentals, noticias
    • Quant Department: indicadores técnicos, backtesting
    • Risk Department: VAR, correlation, drawdown
    • Macro Department: económico, FX, bonos
    ↓
Claude Desktop o Cursor con MCP habilitado
    ↓
Analista puede consultar en lenguaje natural sin código:
    "¿cuál es el VAR de AAPL a 95% en los últimos 6 meses?"
    "dame el momentum ranking del sector financiero LATAM"
```

## Stack LATAM recomendado para PoC rápido

Para un banco o fintech en Argentina/Brasil/México:
1. **Fineract** como core banking (o conectar al core existente vía API)
2. **kyc-analyst** para KYC/AML con revisores humanos (SAFR-compliant: policy bound + audit log)
3. **FinGPT** fine-tuned sobre noticias en español/portugués (datos de Bloomberg Brasil, Ambito)
4. **Claude** como orquestador conversacional del agente bancario
5. **Open Finance MCP** (si Brasil/Chile) para datos bancarios reales sin scraping
6. **financekit-mcp** para risk metrics y comparación de portfolios

---
*Ver también: `agents/top.md` para agentes AI especializados.*
