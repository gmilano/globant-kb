# 🏭 Verticales de partida — Financial Services

> Plataformas verticales open source customizables con AI. Modelo: partir de algo funcional + añadir capa agéntica.
> Última actualización: 2026-07-08

---

## 1. Core Banking & Microfinance

| Plataforma | Licencia | Repo | Stack | Caso de uso |
|------------|----------|------|-------|-------------|
| **Apache Fineract** | Apache-2.0 | [apache/fineract](https://github.com/apache/fineract) | Java/Spring Boot, REST API | Core banking para microfinanzas, cooperativas, digital banks en 80+ países. 2B unbanked como mercado objetivo |
| **Mifos X** | MPL-2.0 | [openMF/mifos-mobile](https://github.com/openMF/mifos-mobile) | Android/iOS Kotlin | Mobile banking app para microfinanzas construida sobre Apache Fineract |
| **open-bank-oss** | Apache-2.0 | [JiRaska/open-bank-oss](https://github.com/JiRaska/open-bank-oss) | Kotlin/Quarkus + Next.js + event-driven microservices | Retail banking platform reference implementation cloud-native |

**Setup rápido Apache Fineract + AI layer:**
```bash
# Fineract en Docker
git clone https://github.com/apache/fineract
cd fineract && docker-compose up -d

# Exponemos la API REST de Fineract
# Luego wire-up con Claude para consultas de crédito
curl http://localhost:8443/fineract-provider/api/v1/clients \
  -H "Authorization: Basic ..."
```

---

## 2. ERP & Contabilidad Financiera

| Plataforma | Licencia | Repo | Stack | Caso de uso |
|------------|----------|------|-------|-------------|
| **Odoo** | LGPL-3.0 | [odoo/odoo](https://github.com/odoo/odoo) | Python/OWL | ERP completo: contabilidad, facturación, nómina, CRM, tesorería. 12M+ empresas |
| **ERPNext** | GPL-3.0 | [frappe/erpnext](https://github.com/frappe/erpnext) | Python/Frappe | ERP SMB: contabilidad multi-moneda, impuestos, presupuestos, GST/VAT |
| **Dolibarr** | GPL-3.0 | [Dolibarr/dolibarr](https://github.com/Dolibarr/dolibarr) | PHP | ERP/CRM modular: facturas, pedidos, stock, contabilidad, RRHH |
| **LedgerSMB** | GPL-2.0 | [ledgersmb/LedgerSMB](https://github.com/ledgersmb/LedgerSMB) | Perl/PostgreSQL | Accounting ERP para SMB: doble entrada, multi-moneda, auditoría |

---

## 3. Plataformas de Datos & Analytics Financieros

| Plataforma | Licencia | Repo | Stack | Caso de uso |
|------------|----------|------|-------|-------------|
| **OpenBB** | AGPLv3 | [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) | Python | Open Data Platform: 30+ providers (Bloomberg, Polygon, FRED, SEC). MCP server nativo para AI agents |
| **Apache Superset** | Apache-2.0 | [apache/superset](https://github.com/apache/superset) | Python/React | BI y visualización financiera. Dashboards interactivos sobre cualquier base de datos |
| **Metabase** | AGPL-3.0 | [metabase/metabase](https://github.com/metabase/metabase) | Clojure/React | Analytics self-service para equipos de finanzas. Natural language queries |

---

## 4. RegTech & Compliance

| Plataforma | Licencia | Org | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| **FINOS RegTech SIG** | Apache-2.0 | [finos/open-regtech-sig](https://github.com/finos/open-regtech-sig) | Multi-lang | Soluciones open source para AML, KYC, reporting regulatorio en FS |
| **FINOS CDM** | Apache-2.0 | [finos/common-domain-model](https://github.com/finos/common-domain-model) | Java/Rosetta | Common Domain Model: representación canónica de contratos financieros (ISDA, DTCC) |
| **FINOS FDC3** | Apache-2.0 | [finos/FDC3](https://github.com/finos/FDC3) | TypeScript | Financial Desktop Connectivity 3.0 — interop estándar cross-firm para apps financieras |

---

## 5. Plataformas de Trading Algorítmico

| Plataforma | Licencia | Repo | Stack | Caso de uso |
|------------|----------|------|-------|-------------|
| **hummingbot** | Apache-2.0 | [hummingbot/hummingbot](https://github.com/hummingbot/hummingbot) | Python | Market making + trading algorítmico: 100+ conectores de exchanges, estrategias pluggable |
| **zipline** | Apache-2.0 | [quantopian/zipline](https://github.com/quantopian/zipline) | Python | Backtesting algorítmico — el estándar de la industria quant |
| **jesse** | MIT | [jesse-ai/jesse](https://github.com/jesse-ai/jesse) | Python | Crypto trading bot avanzado con backtesting y live trading |

---

## Landscape LATAM por país

| País | Plataformas dominantes | Oportunidad AI |
|------|----------------------|----------------|
| **Brasil** | Totvs (dominante), SAP B1, Oracle | Fineract-based digital bank para micro-empresas; Open Finance BCB 300+ fintechs |
| **México** | SAP B1, Microsiga, Aspel | ERPNext+AI para PYMES CFDI; SPEI/CoDi automation |
| **Argentina** | Tango Gestión, Bejerman, Odoo | Odoo+AI para contabilidad multi-moneda/inflación; facturación AFIP |
| **Colombia** | Siigo (dominant ERP), World Office | Apache Fineract para fintechs tipo Nequi/Daviplata clones |
| **Chile** | ERP local + SAP | CMF Open Banking pilot; APF (Administradoras de Fondos) AI agents |

---

## Arquitectura de referencia: Fineract + AI Agents

```
┌─────────────────────────────────────────────────────┐
│              Apache Fineract (Core Banking)         │
│   Clientes │ Créditos │ Ahorros │ Pagos │ Accounting│
└─────────────────────┬───────────────────────────────┘
                      │ REST API
┌─────────────────────▼───────────────────────────────┐
│           AI Orchestration Layer (LangGraph)        │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────┐ │
│   │ Credit Agent │  │ KYC/AML Agent│  │Risk Agent│ │
│   └──────────────┘  └──────────────┘  └──────────┘ │
└─────────────────────────────────────────────────────┘
                      │ Claude (Haiku for ops / Sonnet for analysis)
┌─────────────────────▼───────────────────────────────┐
│     MCP Servers: OpenBB + financial-datasets +      │
│     yahoo-finance + FINOS CDM schema validator      │
└─────────────────────────────────────────────────────┘
```
