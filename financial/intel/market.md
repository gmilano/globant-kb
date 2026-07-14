# 🗺️ Mapa de mercado — Financial Services AI

> Players, oportunidades, posicionamiento. Foco LATAM + global.
> Última actualización: 2026-07-14 (v6)

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
| JPMorgan presupuesto AI 2026 | $2 B / año; 2 000 AI specialists; 400+ use cases | JPMorgan |
| JPMorgan ahorro acumulado AI | $1.5 B en cumulative savings | JPMorgan |
| Goldman Sachs AI adoption | GenAI a 46 000 empleados; 1M+ prompts/mes | Goldman |
| BlackRock Aladdin AUM bajo gestión AI | ~$25 T en activos | BlackRock |

## Players globales — Instituciones Financieras

| Empresa | Iniciativa AI | Detalle |
|---------|--------------|----------|
| JPMorgan Chase | COIN + Agentes LLM | COIN: 360 000 horas abogado/año ahorradas; agentes sobre OpenAI/Anthropic para estrategias de inversión dinámicas; $2B presupuesto AI 2026 |
| Goldman Sachs | Firmwide GenAI + Devin | GenAI a 46 000 empleados; 1M+ prompts/mes; Devin en 12 000 devs → 3-4× productividad |
| BlackRock | RockAI + Aladdin Copilot | Aladdin gestiona ~$25T en activos; RockAI: plataforma no-code interna |
| Morgan Stanley | AskResearch | Agente RAG sobre research reports; 16 000 asesores financieros con acceso |
| Lloyds Banking Group | Agentic AI 2026 strategy | Declaró 2026 "el año de la IA agentica en finanzas" |
| BMO | FIS Financial Crimes Agent | Early adopter del agente AML FIS+Anthropic; en desarrollo, GA H2 2026 |
| Amalgamated Bank | FIS Financial Crimes Agent | Banco cooperativo; early adopter FIS+Anthropic AML |

## Players globales — Vendors Tech / Fintech

| Empresa | Tipo | Fortaleza |
|---------|------|----------|
| FIS | Banking Infrastructure | **Financial Crimes AI Agent** (con Anthropic, mayo 2026); AML en horas → minutos; GA H2 2026 |
| Fiserv | Banking Infrastructure | **agentOS** (mayo 2026) — OS para agentic AI: marketplace, governance, 4 agentes propios + 9 partners; GA agosto 2026 |
| Palantir | Enterprise AI | AIP financiero; contratos con bancos regulados; fuerte en compliance |
| Fintool (acq. Microsoft) | Fintech AI | Document intelligence financiero; adquirida por Microsoft H1 2026 |
| Kensho (S&P Global) | Quant/NLP | Extracción de datos no estructurados de earnings calls, filings |
| Ayasdi (adq. SymphonyAI) | AML/Fraude | Anti-money laundering con ML; en producción en bancos tier-1 |
| Sardine | KYC/AML | Behavioral biometrics + ML para compliance en tiempo real |

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
|--------|---------|--------|----------------|----------|
| Mastercard | **Agent Pay for Machines** | 10 jun 2026 | Stripe, Adyen, Coinbase, Cloudflare, OKX, Ripple, Polygon, Solana | Tarjetas + cuentas bancarias + stablecoins; micropagos sub-centavo |
| Mastercard | **Agent Pay (Consumer)** | Nov 2025 (EEUU full) | Microsoft, PayPal, Google, Citi, US Bank | Agentic Tokens: credencial tokenizada vinculada a agent+merchant+policy |
| Visa | **Intelligent Commerce** | Activo 2026 | OpenAI, Anthropic, Microsoft | Credenciales tokenizadas para agentes AI; behavioral auth |

## Governance Frameworks para Agentes Financieros (jul 2026)

| Framework | Origen | Tipo | Pilares | Aplicación |
|-----------|--------|------|---------|------------|
| **MAS SAFR v1.0** | MAS + Ant Int, Circle, HSBC, JPMorgan, Manulife, Mastercard, OCBC, Visa | Referencia industria | Policy Bound Execution, Real-Time Validation, Auditability, Interoperability | APAC primario; referencia global |
| **Fiserv agentOS** | Fiserv + OpenAI + AWS | Plataforma comercial | Identity-bound execution, policy enforcement, observability, traceability | Bancos y credit unions usuarios de Fiserv |
| **EU AI Act Anexo III** | Unión Europea | Regulación obligatoria | Risk management, human oversight, technical documentation, conformity assessment | UE — deadline: 2 ago 2026 |
| **DORA** | Unión Europea | Regulación obligatoria | Operational resilience, audit trail, vendor management | Entidades financieras en UE — en vigor desde ene 2025 |

## Benchmark Landscape 2026

| Benchmark | Origen | Tareas | Mejor Resultado | Para Globant |
|-----------|--------|--------|-----------------|-------------|
| **BigFinanceBench** | Rogo + OpenAI (arXiv:2606.03829, jun 2026) | **928**, 36k pts rúbrica, workflow-grounded | **58.8%** | Eval harness para buy-side; argumento de venta robusto |
| **ICBCBench** | DeepFin-Intelligence (arXiv:2606.17458, jun 2026) | multi-track | gaps sustanciales | Consorcio industrial; 50+ expertos; deep research institucional |
| FinGAIA | SUFE + Fudan (arXiv:2507.17186) | 407, 7 subdominios | 48.9% ChatGPT zero-shot | Conocimiento financiero general |
| FinSight | ACL 2026 / RUC-NLPIR | financial research | 8.09 (vs OAI 6.11) | Research automation sell-side |

## Oportunidades AI en LATAM

| Oportunidad | País/Región | Por qué ahora |
|-------------|-------------|---------------|
| KYC/AML digital para fintechs | Brasil, México, Colombia | Reformas regulatorias LGPD, CNBV; fintechs obligadas a compliance robusto sin budget de banco tradicional |
| Core banking para microfinanzas | Perú, Bolivia, Ecuador, Centroamérica | Fineract + agentes puede reemplazar sistemas legacy de SACCOs y cooperativas |
| Forecasting macro para PyMEs | Argentina, Brasil | Volatilidad FX y tasas; demanda de asistentes financieros accesibles |
| Compliance tributario con IA | Brasil (Reforma Tributaria 2026) | IBS/CBS/IS en implementación gradual 2026-2032 |
| Open Finance APIs — personal finance agent | Brasil (operacional), Chile (desde abr 2026) | Mandatos regulatorios abren datos; Open Finance MCP + Claude = producto diferenciado |
| Gestión de portafolio LATAM | Argentina, Brasil, México | Riskfolio-Lib + datos locales (CCL, bonos soberanos) — no cubierto por soluciones globales |
| SAFR-compliant agent governance | Bancos LATAM con operaciones en APAC/UE | MAS SAFR + EU AI Act como diferenciador de compliance |

## Posicionamiento Globant

- **Fortaleza diferencial**: capacidad de integrar agentes AI sobre sistemas core bancarios legacy (COBOL, AS/400) via API layers + governance SAFR-compliant desde diseño.
- **Anthropic insider**: FIS, Mastercard y Visa eligieron Claude para infraestructura bancaria regulada. Globant como Anthropic partner tiene acceso preferencial a estos casos de uso.
- **LATAM anchor**: conocimiento regulatorio local (BCRA, Banco de México, CMF Chile, Bacen Brasil) difícil de replicar desde EEUU/Europa.
- **Stack sugerido para propuestas**: Fineract/sistema-cliente + FinRobot + Claude + OpenBB + MAS SAFR governance = Research Desk AI con compliance from day 1.
- **Quick win**: kyc-analyst sobre Claude → PoC de compliance KYC en 2-3 semanas para banco mediano.
- **Benchmark como herramienta de venta**: BigFinanceBench (58.8%) + ICBCBench justifican por qué agentes genéricos no son suficientes y por qué se necesita integración experta.

## LATAM — Deal Share Q1 2026

| País | Deal Share Q1 2026 | Señal clave | Oportunidad AI |
|------|---------------------|------------|----------------|
| Brasil | **55%** (18 txns) | Open Finance BACEN + Pix 2.0 scheduled payments | AML + fraud en rails Pix; agentes de datos Open Finance |
| México | ~15% | 77% adopción AI; sandbox CNBV activo | KYC automation; agentes de pago SPEI |
| Colombia | ~10% | Daviplata 40M+ usuarios | Credit scoring economía informal; WhatsApp banking |
| Argentina | ~8% | Multi-currency (ARS/USD/CCL) | Monitoreo FX; contabilidad multi-moneda con AI |
| Chile | ~7% | Open banking regs CMF 2026 | Gestión de consentimiento; reporting regulatorio |

---
*Fuentes: IDC, Finastra, Mordor Intelligence, KPMG, MAS SAFR v1.0, FIS/Anthropic PR, Fiserv agentOS PR, arXiv:2606.03829, arXiv:2606.17458, Mastercard/Visa press releases, CB Insights — jul 2026.*
