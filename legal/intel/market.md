# 🗺️ Mapa de mercado — Legal AI

> Players, datos de mercado, oportunidades, posicionamiento. Foco LATAM + global.
> Última actualización: 2026-07-07

---

## Tamaño de mercado global

| Fuente | 2025 | 2026 | 2030 | CAGR |
|--------|------|------|------|------|
| MarketsandMarkets | $2.82B | — | $10.82B | 28.3% |
| Technavio | $1.83B | — | +$5.53B (2026-2030) | 32.1% |
| Grand View Research (LegalTech AI) | — | $3.7B | $11.06B | 31.5% |
| Meticulous Research | — | — | — (2026-2036) | — |
| Consenso mercado | ~$2.5-3.7B | ~$3.7B | ~$11B | **~31% CAGR** |

**Acelerador clave 2026:** shift hacia agentic AI y autonomous workflows → intensifica demanda en todas las verticales.

---

## Players globales

| Empresa | Tipo | Valuación/Revenue | Fortaleza | Debilidad |
|---------|------|------------------|-----------|-----------|
| Harvey | Propietario | $11B (2026) | LLM legal especializado, enterprise adoption | Caro, vendor lock-in |
| Legora | Propietario | $5.6B (2026) | Colaboración legal agentica | Caro, europeo |
| Clio | SaaS | $3B+ | Case management + billing dominant | No AI nativo aún |
| LexisNexis AI | Propietario | Parte de RELX $70B+ | Datos propietarios masivos, Lexis+ AI | Cerrado, legacy |
| Thomson Reuters CoCounsel | Propietario | Parte de TR $8.5B | Westlaw integration, enterprise trust | Costoso |
| Ironclad | SaaS | $3.2B | CLM (Contract Lifecycle Management) leader | No legal reasoning |
| Litera | SaaS | ~$500M | Document automation, Word integration | Herramienta puntual |
| **Mike OSS** | **Open Source** | **AGPL-3.0** | Replica Harvey/Legora, self-hosted | AGPL compliance para SaaS |
| **lavern** | **Open Source** | **Apache-2.0** | 67-agent debate protocol, enterprise-quality | Requiere LLM API costs |
| **OpenContracts** | **Open Source** | **MIT** | MCP nativo, DMS agentico, citation graph | Requiere DevOps |

---

## LATAM: Mapa de oportunidades

### Métricas clave

| Métrica | Valor | Fuente |
|---------|-------|--------|
| LATAM LegalTech Market 2025 | $1.9B | IMARC Group |
| LATAM LegalTech Market 2034 | $4.9B | IMARC Group |
| LATAM LegalTech CAGR | 11.12% | IMARC Group |
| Brasil litigios pendientes | ~75 millones | Enter data 2026 |
| Brasil % casos laborales globales | >90% | Enter data 2026 |
| Enter valuation (Mayo 2026) | $1.2B | Sequoia/Founders Fund |

### Enter: Primer unicornio AI de LATAM ($1.2B — Mayo 2026)

**Ronda:** Series B $100M — Founders Fund + Sequoia Capital + Ribbit Capital

**Tecnología:**
- AI que gestiona proceso judicial completo: drafting mociones → estimación settlement → coordinación → escalación humana
- Clientes: Nubank, Bradesco, Mercado Livre, Airbnb, LATAM Airlines
- ROI reportado: billones de reais ahorrados + mayor tasa de éxito + reducción costos operativos

**Señal para Globant:** El mercado LATAM no está esperando — hay demanda real y capital validado. Enter se enfoca en litigios masivos (B2C). Oportunidad Globant: M&A, corporate legal, compliance para empresas medianas.

### País por país

| País | Mercado | Oportunidad AI | Plataforma sugerida | Regulación AI |
|------|---------|----------------|---------------------|---------------|
| Brasil | Dominante en LATAM. 75M litigios. | Acceso a justicia, automación de demandas laborales, due diligence corporativo | OpenContracts + Mike OSS | Marco AI en proceso (PL 2338/2023) |
| México | CFDI + reforma fiscal constante | Compliance fiscal SAT, contratos comerciales, IP | Odoo legal + lavern | LFPIORPI compliance |
| Argentina | Alta rotación regulatoria | Contratos laborales, reestructuración deuda, contratos USD | ERPNext + Claude | Sin ley AI específica |
| Colombia | M&A creciente, inversión extranjera | Due diligence M&A, contratos minería/energía | OpenContracts + lavern | Ley 1581 datos personales |
| Chile | Minería + infraestructura | Contratos B2G, licitaciones públicas | ArkCase + AI layer | Reforma Ley datos 2024 |
| Perú | Minería + construcción | Contratos concesiones, compliance ambiental | ERPNext + módulo legal | Sin ley AI específica |

---

## Proprietary vs Open Source — Comparativa

| Dimensión | Harvey/Legora/Clio | Mike + OpenContracts + lavern |
|-----------|-------------------|-------------------------------|
| Costo mensual | $200-500/usuario/mes | $0 licencia + infra + LLM API |
| Customización | Limitada (API) | Total (source code) |
| Data sovereignty | Cloud vendor | Self-hosted, cliente controla |
| Vendor risk | Alto (depende de roadmap) | Bajo (fork si es necesario) |
| Compliance (regulado) | Depende del vendor | Control total |
| Time to value | Semanas (SaaS onboarding) | 4-8 semanas con Globant |
| Soporte | Vendor SLA | Globant SLA (oportunidad) |

---

## 6 Zonas de win para Globant

1. **Mike OSS Implementation + Support**: Firmas que quieren salir de Harvey/Legora. Globant implementa, customiza, soporta Mike bajo AGPL-3.0. Diferencial: soporte enterprise + integraciones locales.

2. **OpenContracts para Due Diligence M&A**: Bancos de inversión y firmas M&A en LATAM necesitan repositorios de documentos inteligentes. OpenContracts MIT es el punto de partida.

3. **lavern para High-Volume Contract Review**: Aseguradoras, bancos, telecos con contratos estándar de alto volumen. 67 agentes lavern + customización Globant para jurisdicción local.

4. **Enter-style Access to Justice**: Replicar modelo Enter para mercados diferentes a Brasil (Chile, Colombia, Perú). Open source stack + Globant engineering.

5. **LATAM Compliance AI**: Reforma tributaria Brasil, CFDI México, NIIF regional → herramientas AI para compliance fiscal + contractual. Stack: LexNLP + Claude + ERPNext.

6. **ArkCase AI Layer para Sector Público**: Gobiernos LATAM con necesidades FOIA, case management, transparencia. ArkCase CE Apache-2.0 + capa AI Globant.

---
*Actualizado automáticamente por el pipeline de ingest.*
