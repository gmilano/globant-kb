# 🏭 Verticales de partida — Financial Services

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agentica arriba.
> Última actualización: 2026-07-14 (v5)

## Plataformas recomendadas

| Plataforma | Licencia | Repo / URL | Stack | Caso de uso principal |
|------------|----------|------------|-------|----------------------|
| Apache Fineract | Apache-2.0 | [apache/fineract](https://github.com/apache/fineract) | Java/Spring, REST API | Core banking: préstamos, ahorro, GL, KYC; 400+ instituciones en 80+ países, 20M+ clientes; release 24.09; API-first para integración con agentes |
| ERPNext (Frappe) | GPL-3.0 | [frappe/erpnext](https://github.com/frappe/erpnext) | Python/JS, Frappe Framework | ERP contabilidad + finanzas; módulos de cuentas, activos, nómina; popular en empresas medianas LATAM |
| Apache OFBiz | Apache-2.0 | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Java EE | ERP completo con GL, cuentas por cobrar/pagar, presupuestos, inventario; versión 24.09 |
| Dolibarr ERP/CRM | GPL-3.0 | [Dolibarr/dolibarr](https://github.com/Dolibarr/dolibarr) | PHP | ERP/CRM para PyMEs: facturas, inventario, POS, cuentas bancarias; muy popular en LATAM; 1.7k ★ |
| FinAegis | Apache-2.0 | [finaegis.org](https://finaegis.org/) | Laravel/DDD | Core banking production-grade con 61 módulos: pagos, lending, compliance, cross-border transfers; diseño domain-driven |
| OpenBB Platform | AGPLv3 | [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) | Python | Open Data Platform: multi-provider (Bloomberg, Alpha Vantage, Quiver Quant), MCP-native v4, Workspace para analistas |
| Backtrader | GPL-3.0 | [mementum/backtrader](https://github.com/mementum/backtrader) | Python | Backtesting y live trading; broker connectors para Interactive Brokers, Alpaca |
| jube AML/Fraud | AGPL-3.0 | [jube-home/aml-fraud-transaction-monitoring](https://github.com/jube-home/aml-fraud-transaction-monitoring) | .NET/PostgreSQL | Monitoreo de transacciones en tiempo real: AML + fraude + sanctions screening + case management |
| Hummingbot | Apache-2.0 | [hummingbot/hummingbot](https://github.com/hummingbot/hummingbot) | Python | Market making y arbitraje en crypto/DeFi; high-frequency; 19k ★ |
| Open Finance MCP | MIT | [open-finance-ai/open-finance-mcp](https://github.com/open-finance-ai) | Python/MCP | Conecta cuentas bancarias de Brasil (Open Finance v4) a Claude/ChatGPT vía MCP; sin datos sensibles externos; extensible a Chile (abr 2026), México |

## Ecosistema Open Finance LATAM

| País | Estado Open Finance | API Estandar | Oportunidad |
|------|---------------------|--------------|-------------|
| Brasil | Fase 4 — operacional | API Banco Central BR + Open Finance MCP | Personal finance agent, comparador de productos, alertas de liquidez PyME. **55% del deal flow fintech LatAm en Q1 2026** — mercado más activo de la región |
| Chile | Implementación obligatoria desde abr 2026 | CMF Chile — APIs en definición final | Primeros movers: advisory bots sobre datos bancarios reales |
| México | Regulación CNBV en curso | CNBV APIs | Conexión con Fintechs Ley Fintech; SPEI data |
| Colombia | Marco en desarrollo | SFC Colombia | Market en early stage — ventana competitiva |
| Argentina | Sin marco regulatorio aún | — | Oportunidad en FinTechs no-bancarias |

## Cómo customizar con AI

### Opción A — Apache Fineract + agentes compliance
```
Apache Fineract (core banking API)
    ↓
Webhook events (desembolso, pago, apertura cuenta)
    ↓
kyc-analyst agent (KYC/AML scoring con Claude — MIT)
    ↓
jube (monitoreo continuo de transacciones — AGPL-3.0)
    ↓
Dashboard compliance para oficiales de riesgo
```

### Opción B — OpenBB + TradingAgents (research desk)
```
OpenBB MCP server v4 (datos equities, macro, noticias)
    ↓
TradingAgents v0.3.1 (bull/bear/riesgo debate, structured-output, multi-provider)
    ↓ [fix look-ahead bias — usar v0.3.1, no v0.2.x]
FinGPT sentiment layer (noticias + tweets en tiempo real)
    ↓
Reporte de inversión generado + trazabilidad de decisión (LangGraph checkpoints)
```

### Opción C — ERPNext + FinRobot (CFO assistant)
```
ERPNext (contabilidad + GL + cash flow)
    ↓
FinRobot agents (análisis de estados financieros)
    ↓
RAG sobre reportes internos (documentos PDF del cliente)
    ↓
CFO dashboard: alertas de liquidez, proyecciones, escenarios
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

## Stack LATAM recomendado para PoC rápido

Para un banco o fintech en Argentina/Brasil/México:
1. **Fineract** como core banking (o conectar al core existente vía API)
2. **kyc-analyst** para KYC/AML con revisores humanos
3. **FinGPT** fine-tuned sobre noticias en español/portugués (datos de Bloomberg Brasil, Ambito)
4. **Claude** como orquestador conversacional del agente bancario
5. **Open Finance MCP** (si Brasil/Chile) para datos bancarios reales sin scraping

---
*Ver también: `agents/top.md` para agentes AI especializados.*
