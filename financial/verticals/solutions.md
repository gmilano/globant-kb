# 🏭 Verticales de partida — Financial Services

> Plataformas verticales open-source customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-12 (v10)

## Core Banking & Infraestructura Financiera

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| Apache Fineract | Apache-2.0 | [fineract.apache.org](https://github.com/apache/fineract) | Java/Spring Boot | Core banking engine: cuentas, préstamos, pagos, microfinanzas. Usado por bancos, IMFs, cooperativas. Integra APIs AI por encima. |
| FinAegis | Apache-2.0 | [github.com/FinAegis](https://github.com/FinAegis/core-banking) | Laravel/PHP, DDD | Core banking moderno con 61 módulos: pagos, lending, compliance, cross-border transfers. Arquitectura DDD lista para AI agents. |
| Mifos Initiative | MPL-2.0 | [github.com/openMF/mifos-mobile](https://github.com/openMF/mifos-mobile) | Java/Android/Kotlin | Plataforma de microfinanzas. Enfocado en inclusión financiera LATAM/África. Base para agentes de crédito para no bancarizados. |

## ERP / Contabilidad / Finanzas Empresariales

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| ERPNext | MIT | [github.com/frappe/erpnext](https://github.com/frappe/erpnext) | Python/Frappe | ERP completo: contabilidad, cuentas por cobrar/pagar, nómina, banking. 18k+ stars. Punto de partida para agentes CFO asistentes. |
| Akaunting | LGPL-3.0 | [github.com/akaunting/akaunting](https://github.com/akaunting/akaunting) | PHP/Laravel | Contabilidad cloud open-source para PYMEs. Módulos de facturación, gastos, nómina. Integración REST API para agentes. |
| Dolibarr | GPL-3.0 | [github.com/Dolibarr/dolibarr](https://github.com/Dolibarr/dolibarr) | PHP | ERP/CRM para PYMEs: facturación, inventario, proyectos, banca. Activo con 100+ módulos contrib. |
| Frappe CRM | MIT | [github.com/frappe/crm](https://github.com/frappe/crm) | Python/Vue.js | CRM moderno sobre Frappe. Integra con ERPNext para pipeline de ventas + finanzas. ~2k stars. |

## Plataformas de Trading & Datos

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| OpenBB Platform | MIT | [github.com/OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) | Python | Data layer para analistas y agentes: 50+ proveedores, MCP server, CLI. Base para cualquier solución de research AI. |
| Qlib | MIT | [github.com/microsoft/qlib](https://github.com/microsoft/qlib) | Python | Plataforma de investigación cuantitativa de Microsoft. Pipeline desde datos crudos hasta backtesting. 15k+ stars. |
| QuantConnect Lean | Apache-2.0 | [github.com/QuantConnect/Lean](https://github.com/QuantConnect/Lean) | C# | Motor de backtesting y live trading multi-asset. Cloud + local. Base para estrategias AI institucionales. |

## Cómo customizar con AI — pasos concretos

### Sobre Apache Fineract
1. Fork + deploy con Docker Compose
2. Añadir microservicio Python con LangGraph para orquestación de agentes
3. Conectar OpenBB Platform como data layer de mercado
4. Agente de onboarding KYC: lectura de documentos (Claude Vision) + validación contra sanction lists
5. Agente de scoring crediticio: ingesta datos transaccionales Fineract → PyPortfolioOpt → decisión

### Sobre ERPNext
1. Instalar vía Frappe Bench
2. Añadir app personalizada Frappe con endpoint `/api/ai-agent`
3. Claude como CFO asistente: pregunta en lenguaje natural sobre P&L, cuentas por cobrar, flujo de caja
4. Integrar FinRL para forecast de flujo de caja con RL
