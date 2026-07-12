# 🏭 Verticales de partida — Financial Services

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agentica arriba.
> Última actualización: 2026-07-12

## Plataformas recomendadas

| Plataforma | Licencia | Repo / URL | Stack | Caso de uso principal |
|------------|----------|------------|-------|----------------------|
| Apache Fineract | Apache-2.0 | [apache/fineract](https://github.com/apache/fineract) | Java/Spring, REST API | Core banking: préstamos, ahorro, GL, KYC; usado en 80+ países; release 24.09 |
| ERPNext (Frappe) | GPL-3.0 | [frappe/erpnext](https://github.com/frappe/erpnext) | Python/JS, Frappe Framework | ERP contabilidad + finanzas para instituciones financieras; módulos de cuentas, activos, nómina |
| Apache OFBiz | Apache-2.0 | [apache/ofbiz-framework](https://github.com/apache/ofbiz-framework) | Java EE | ERP completo con GL, cuentas por cobrar/pagar, presupuestos, inventario; versión 24.09 |
| Dolibarr ERP/CRM | GPL-3.0 | [Dolibarr/dolibarr](https://github.com/Dolibarr/dolibarr) | PHP | ERP/CRM para PyMEs: facturas, inventario, POS, cuentas bancarias; muy popular en LATAM |
| OpenBB Platform | AGPLv3 | [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) | Python | Terminal quant e investigación: múltiples data providers, extensible, MCP-native |
| Backtrader | GPL-3.0 | [mementum/backtrader](https://github.com/mementum/backtrader) | Python | Backtesting y live trading; broker connectors para Interactive Brokers, Alpaca |
| jube AML/Fraud | AGPL-3.0 | [jube-home/aml-fraud-transaction-monitoring](https://github.com/jube-home/aml-fraud-transaction-monitoring) | .NET/PostgreSQL | Monitoreo de transacciones en tiempo real: AML + fraude + sanctions screening + case management |
| Hummingbot | Apache-2.0 | [hummingbot/hummingbot](https://github.com/hummingbot/hummingbot) | Python | Market making y arbitraje en crypto/DeFi; high-frequency, 19k ★ |

## Cómo customizar con AI

### Opción A — Apache Fineract + agentes compliance
```
Apache Fineract (core banking API)
    ↓
Webhook events (desembolso, pago, apertura cuenta)
    ↓
kyc-analyst agent (KYC/AML scoring con Claude)
    ↓
jube (monitoreo continuo de transacciones)
    ↓
Dashboard compliance para oficiales de riesgo
```

### Opción B — OpenBB + TradingAgents (research desk)
```
OpenBB MCP server (datos equities, macro, noticias)
    ↓
TradingAgents framework (bull/bear/riesgo debate)
    ↓
FinGPT sentiment layer (noticias + tweets en tiempo real)
    ↓
Reporte de inversión generado + trazabilidad de decisión
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

## Stack LATAM recomendado para PoC rápido

Para un banco o fintech en Argentina/Brasil/México:
1. **Fineract** como core banking (o conectar al core existente vía API)
2. **kyc-analyst** para KYC/AML con revisores humanos
3. **FinGPT** fine-tuned sobre noticias en español/portugués (datos de Bloomberg Brasil, Ambito)
4. **Claude** como orquestador conversacional del agente bancario

---
*Ver también: `agents/top.md` para agentes AI especializados.*
