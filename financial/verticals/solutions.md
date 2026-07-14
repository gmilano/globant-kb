# 🏭 Verticales de partida — Financial Services

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agentica arriba.
> Última actualización: 2026-07-14 (v6)

## Plataformas recomendadas

| Plataforma | Licencia | Repo / URL | Stack | Caso de uso principal |
|------------|----------|------------|-------|----------------------|
| Apache Fineract | Apache-2.0 | [apache/fineract](https://github.com/apache/fineract) | Java/Spring, REST API | Core banking: préstamos, ahorro, GL, KYC; 400+ instituciones en 80+ países, 20M+ clientes; release 24.09; API-first para integración con agentes |
| FinAegis | Apache-2.0 | [FinAegis/core-banking-prototype-laravel](https://github.com/FinAegis/core-banking-prototype-laravel) | Laravel 12 / PHP 8.4, DDD, CQRS | Core banking production-grade con 61 módulos DDD con event sourcing: pagos, lending, compliance, x402/MPP machine payments, wallet non-custodial. **MCP-native**: mcp.zelta.app expone 12 herramientas bancarias OAuth-protected. **NUEVO v6** |
| ERPNext (Frappe) | GPL-3.0 | [frappe/erpnext](https://github.com/frappe/erpnext) | Python/JS, Frappe Framework | ERP contabilidad + finanzas; módulos de cuentas, activos, nómina; popular en empresas medianas LATAM |
| Apache OFBiz | Apache-2.0 | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Java EE | ERP completo con GL, cuentas por cobrar/pagar, presupuestos, inventario |
| Dolibarr ERP/CRM | GPL-3.0 | [Dolibarr/dolibarr](https://github.com/Dolibarr/dolibarr) | PHP | ERP/CRM para PyMEs: facturas, inventario, POS, cuentas bancarias; muy popular en LATAM |
| OpenBB Platform | AGPLv3 | [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) | Python | Open Data Platform: multi-provider (Bloomberg, Alpha Vantage, Quiver Quant), MCP-native v4, Workspace para analistas |
| Backtrader | GPL-3.0 | [mementum/backtrader](https://github.com/mementum/backtrader) | Python | Backtesting y live trading; broker connectors para Interactive Brokers, Alpaca |
| jube AML/Fraud | AGPL-3.0 | [jube-home/aml-fraud-transaction-monitoring](https://github.com/jube-home/aml-fraud-transaction-monitoring) | .NET/PostgreSQL | Monitoreo de transacciones AML + fraude en tiempo real: ML, velocity checks, sanctions screening, case management |
| Hummingbot | Apache-2.0 | [hummingbot/hummingbot](https://github.com/hummingbot/hummingbot) | Python | Market making y arbitraje en crypto/DeFi; high-frequency; 19k ★ |
| open-paper-trading-mcp | MIT | [Open-Agent-Tools/open-paper-trading-mcp](https://github.com/Open-Agent-Tools/open-paper-trading-mcp) | Python/FastAPI | Paper trading simulator con MCP server (43 tools): sandbox zero-risk para entrenar agentes. **NUEVO v6** |

## Ecosistema Open Finance LATAM

| País | Estado Open Finance | API Estándar | Métricas / Oportunidad |
|------|---------------------|--------------|------------------------|
| Brasil | Fase 4 — operacional | API Banco Central BR | **42M consents activos, 1.5B llamadas API/semana**, Pix 54.7% de TODAS las transacciones (42.9B ops H2 2025). **Pix Automático** (H2 2026): pagos recurrentes automáticos. 55% del deal flow fintech LatAm Q1 2026 |
| Chile | Implementación obligatoria desde abr 2026 | CMF Chile — APIs finalizadas | Primeros movers: advisory bots sobre datos bancarios reales; Open Finance activo |
| México | Regulación CNBV en curso | CNBV APIs (Ley Fintech) | 77% AI adoption, 80% bank partnerships; Fintech Law pionera pero estancada en regulación secundaria |
| Colombia | Marco obligatorio en curso | SFC Colombia | Early stage — ventana competitiva open |
| Argentina | Sin marco regulatorio formal | — | Oportunidad en FinTechs no-bancarias y wallets digitales |

> **Señal clave Brasil**: 42B+ operaciones Pix en H2 2025. El Open Finance brasileño es el más activo del mundo. El patrón "Open Finance → MCP → LLM" tiene product-market fit demostrado aquí primero.

## Infraestructura de Pagos Agenticos

| Player | Producto | Launch | Descripción |
|--------|----------|--------|-------------|
| Mastercard | Agent Pay for Machines (AP4M) | 10 jun 2026 | Pagos M2M: agentes pagan a agentes con velocidad de máquina. Agentic Tokens (credential + agent + merchant + consent en blockchain). 30+ partners: Stripe, Adyen, Coinbase, Cloudflare, OKX, Ripple, Polygon, Solana |
| Visa | Intelligent Commerce | jun 2026 | Integración estratégica con OpenAI; Anthropic también es partner. Tokens de commerce para agentes |
| Alpaca | MCP Server | 2026 | Live trade execution vía MCP: "compra 10 acciones de AAPL" → ejecuta. Regulado en EEUU |

## Cómo customizar con AI

### Opción A — Apache Fineract + agentes compliance (KYC/AML)
```
Apache Fineract (core banking API)
    ↓
Webhook events (desembolso, pago, apertura cuenta)
    ↓
kyc-analyst agent (KYC/AML scoring con Claude — MIT)
    ↓
jube (monitoreo continuo de transacciones — AGPL-3.0)
    ↓
FINOS AIGF MCP (EU AI Act compliance layer — Apache-2.0)
    ↓
Dashboard compliance para oficiales de riesgo
```

### Opción B — FinAegis + MCP (core banking agentico)
```
FinAegis (core banking — 61 módulos DDD, event sourcing)
    ↓
mcp.zelta.app (12 banking tools OAuth-protected)
    ↓
Claude / cualquier LLM + FINOS AIGF MCP (governance)
    ↓
AI-powered CFO assistant: alertas liquidez, reconciliación, préstamos auto-aprobados con HITL
```

### Opción C — OpenBB + TradingAgents (research desk)
```
OpenBB MCP v4 (datos equities, macro, noticias — multi-provider)
    ↓
TradingAgents v0.3.1 (bull/bear/riesgo debate, structured-output, multi-provider)
    ↓ [fix look-ahead bias — usar v0.3.1, no v0.2.x]
FinGPT sentiment layer (noticias + tweets en tiempo real)
    ↓
Reporte de inversión + trazabilidad de decisión (LangGraph checkpoints)
```

### Opción D — Open Finance MCP + Claude (personal finance LATAM)
```
Open Finance de Brasil/Chile (conector MCP)
    ↓
Datos de cuenta real (extractos, movimientos, balance) vía MCP
    ↓
Claude como asistente personal financiero (con Pix Automático integration H2 2026)
    ↓
Features: resumen de gastos, alerta saldo, forecast flujo, comparador de créditos, pagos automáticos
```

### Opción E — ATLAS pattern (self-improving trading agents)
```
TradingAgents v0.3.1 (agentes base con point-in-time correctness)
    ↓
ATLAS Darwinian selection loop (Sharpe ratio como loss function)
    ↓
Agentes con peor performance → prompt rewrite automático cada 5 días
    ↓
open-paper-trading-mcp (validación sin riesgo antes de Alpaca live)
    ↓
Alpaca MCP (ejecución live regulada)
```

## Stack LATAM recomendado para PoC rápido

```python
# Stack mínimo para demo de personal finance LATAM (Brasil / Chile)
stack = {
    "core_banking": "Apache Fineract (Apache-2.0) OR FinAegis (Apache-2.0)",
    "data_layer": "OpenBB Platform MCP v4 (AGPLv3) + financial-datasets-mcp (MIT)",
    "trading_sim": "open-paper-trading-mcp (MIT)",
    "compliance": "FINOS AIGF MCP (Apache-2.0) + kyc-analyst (MIT)",
    "llm": "Claude Sonnet 5 via Anthropic API",
    "payments": "Alpaca MCP (live) OR Mastercard AP4M (enterprise)",
}
# Total tiempo estimado PoC: 3-4 semanas
# Costo infra: <$500/mes en cloud para piloto
# Licencias: Apache-2.0 / MIT — sin riesgo legal para producto cliente
```

---
*Actualizado automáticamente por el pipeline de ingest. v6.*
