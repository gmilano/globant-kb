# Verticales de partida — Financial AI

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-07

## Plataformas recomendadas

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| [OpenBB](https://github.com/OpenBB-finance/OpenBB) | MIT | openbb.co | Python, FastAPI, MCP | Investment research platform para analistas, quants y AI agents. MCP server nativo. Alternativa open source a Bloomberg Terminal. |
| [LEAN Engine](https://github.com/QuantConnect/Lean) | Apache-2.0 | quantconnect.com | C#, Python | Motor de trading algorítmico de producción: backtest + live trading. 180+ contribuidores, 300k+ usuarios. Mia AI agent integrado. |
| [FinRL](https://github.com/AI4Finance-Foundation/FinRL) | MIT | finrl.org | Python, Stable Baselines 3 | Librería de DRL para trading: DOW30, crypto, HFT, portfolio. Train-test-trade pipeline en 3 archivos. |
| [Marble](https://github.com/checkmarble/marble) | BSL-1.1 | checkmarble.com | Go, React | Motor de decisión para AML y fraud: transaction monitoring, sanctions screening, case management. 15+ países, SOC 2 Type II. |
| [Jube](https://github.com/jube-home/aml-fraud-transaction-monitoring) | AGPL-3.0 | jube.io | .NET, Docker | AML/fraud con ML, reglas, velocity checks, case management con audit trail. Multi-tenant, Kubernetes. |
| [Apache Fineract](https://github.com/apache/fineract) | Apache-2.0 | fineract.apache.org | Java/Spring | Core banking para microfinanzas y neobancos: cuentas, préstamos, ahorros. Base de Mifos. Muy usado en LATAM. |
| [ERPNext/Frappe](https://github.com/frappe/erpnext) | GPL-3.0 | erpnext.com | Python/Frappe, Vue | ERP con módulo financiero completo: accounting, AP/AR, fixed assets, payroll. Alternativa a SAP. |
| [GnuCash](https://github.com/Gnucash/gnucash) | GPL-2.0 | gnucash.org | C/C++, Guile | Contabilidad de doble entrada para SMBs. Estándar en organizaciones sin fines de lucro y firmas pequeñas. |
| [Akaunting](https://github.com/akaunting/akaunting) | GPL-3.0 | akaunting.com | PHP/Laravel | Contabilidad online open source: facturas, gastos, reportes. 100k+ empresas. App ecosystem. |
| [zipline-reloaded](https://github.com/stefan-jansen/zipline-reloaded) | Apache-2.0 | ml4trading.io | Python | Fork mantenido de Zipline (Robinhood). Backtesting event-driven; integra con pyfolio para reporting. |
| [Hummingbot](https://github.com/hummingbot/hummingbot) | Apache-2.0 | hummingbot.io | Python | Market making y arbitraje automatizados en crypto. 40+ exchanges. High-frequency trading open source. |
| [Rotki](https://github.com/rotki/rotki) | AGPL-3.0 | rotki.com | Python, Vue.js | Portfolio tracker y contabilidad de crypto con privacidad (datos locales). Tax reporting automático. |

---

## Mapas de stack por tipo de proyecto

### Para trading algorítmico / quant research
```
OpenBB (MIT)         → Datos: equities, crypto, macro, fundamentals
    ↓
LEAN Engine (Apache) → Motor de ejecución: backtest + live trading
    ↓
FinRL (MIT)          → Agentes DRL: A2C/PPO/SAC para estrategias RL
    ↓
TradingAgents (Apache) → Orquestación LLM: analistas + debate + portfolio manager
    ↓ resultado
Plataforma quant completa: investigación → estrategia → ejecución → performance analytics
```

### Para compliance financiero / AML
```
Marble (BSL)         → Transaction monitoring en tiempo real + screening
    ↓
LangGraph (MIT)      → Orquestación de alertas y escalamiento automático
    ↓
Jube (AGPL)         → Case management + audit trail + ML risk scoring
    ↓
OpenSign (AGPL)      → Firma de reportes de compliance y actas de investigación
    ↓ resultado
Pipeline AML completo: detección → investigación → reporte → archivo
```

### Para neobancos y banca digital (LATAM)
```
Apache Fineract (Apache-2.0)  → Core banking: cuentas, préstamos, ahorros
    ↓
FinGPT fine-tuned (MIT)       → Credit scoring con datos alternativos
    ↓
Marble (BSL)                  → AML/KYC en tiempo real
    ↓
OpenBB MCP (MIT)              → Análisis macroeconómico para risk management
    ↓ resultado
Neobank stack completo: core → credit → compliance → analytics
```

---

## Cómo customizar con AI

1. **Fork del repo base** — OpenBB, Fineract o LEAN según el caso
2. **Añadir MCP layer** — sec-edgar-mcp + openbb-mcp + alpha-vantage-mcp para datos financieros
3. **Integrar LLM** — FinGPT fine-tuned en datos del cliente, o Claude API vía MCP
4. **Wrappear flujos con agentes** — LangGraph o TradingAgents pattern para orquestación multi-step
5. **UI conversacional** — OpenBB Workspace (enterprise) o custom React/Next.js sobre el sistema base
6. **Compliance audit trail** — Logging de todas las decisiones AI con human-in-the-loop gates (crítico para BCBS 239, Basel IV, EU AI Act)

---

## Plataformas relevantes para LATAM

| País | Plataforma | Contexto |
|------|-----------|----------|
| Brasil | Apache Fineract + FinGPT PT-BR | BCB Open Finance mandatado. Fineract como core de neobancos. FinGPT fine-tuneado en documentos BCB y CVM. |
| Brasil | Marble | Compliance BACEN: prevenção à lavagem de dinheiro (PLD). Transaction monitoring para PIX e TED de alto volumen. |
| México | LEAN + TradingAgents | Nearshoring boom: fondos de inversión MX necesitan backtest + live trading. CNBV compliance integrado. |
| Argentina | zipline-reloaded + FinRL | Volatilidad e inflación: estrategias de hedge automatizadas. Contratos indexados requieren modelos sofisticados. |
| Colombia | Jube (AML) | Hub de legal BPO: compliance de operaciones para sectores minería y energía con alta regulación. |
| LATAM general | Apache Fineract | 70%+ de adultos en LATAM sin acceso bancario tradicional. Fineract como base para fintech de inclusión financiera. |
