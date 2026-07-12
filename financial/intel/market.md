# 🗺️ Mapa de mercado — Financial Services AI

> Players, oportunidades, posicionamiento. Foco LATAM + global.
> Última actualización: 2026-07-12 (v10)

## Tamaño de mercado

| Segmento | 2026 | 2031 | CAGR | Fuente |
|----------|------|------|------|--------|
| Agentic AI en servicios financieros | $7.78B | $43.52B | 41.12% | Azilen, 2026 |
| AI en FinTech (broad) | — | $33.26B (2030) | — | Uvik, 2026 |
| VC en AI fintech (Q1 2026 solo) | $2.1B | — | — | UltraLab, 2026 |
| AI en detección de fraude | ~$10B | ~$40B (2030) | ~32% | Industry est. |

## Adopción actual (2026)

- **44%** de los equipos de finanzas usan agentic AI (aumento de 600% vs 2025)
- **52%** de la industria financiera tiene agentic AI en producción o piloto
- **57%** de fintechs vs **45%** de bancos tradicionales lideran adopción
- **70%** del onboarding de nuevas cuentas será completamente automatizado (proyección 2026)
- **$8 ROI** por cada $1 invertido en agentic AI (top performers, KPMG)
- **2.3x retorno** promedio sobre inversión en agentic AI en 13 meses (KPMG 2026)
- **2.1B VC** fluyó a AI fintech solo en Q1 2026

## Players globales clave

| Empresa | Tipo | Fortaleza | Relevancia para Globant |
|---------|------|-----------|------------------------|
| Bloomberg | Data/Terminal | Terminal financiero + Bloomberg Intelligence (AI) propietario | Competidor en research AI; clientes quieren alternativa open |
| Palantir | Enterprise AI | AIP para servicios financieros, GOTHAM para compliance | Referencia de precio; Globant puede ofrecer implementaciones similares sobre OSS |
| Kensho (S&P) | Analytics AI | NLP financiero, event detection, data normalization | Casos de uso replicables con FinGPT + OpenBB |
| Upstart | Credit AI | Scoring crediticio alternativo con ML | Modelo replicable con FinRL + Apache Fineract |
| Ayasdi (now SAS) | AML/Compliance | Detección de lavado de dinero con topological data analysis | Open source stack: LangGraph + Claude + pgvector puede competir |
| AI4Finance Foundation | OSS Research | FinGPT, FinRL, FinRobot, TradingAgents | Partner natural para contribuciones y adopción enterprise |
| LLMQuant | Community | awesome-trading-agents, MCP servers financieros | Comunidad de referencia para practicioners |

## Regulación clave que impacta adoption

| Regulación | Impacto | Oportunidad Globant |
|-----------|---------|---------------------|
| EU AI Act (en vigor Aug 2026) | Sistemas de scoring crediticio = riesgo alto; requiere explicabilidad, audit log, human-in-the-loop | Implementación de governance frameworks sobre stack OSS |
| MiFID II (UE) | Trazabilidad de decisiones de trading, mejor ejecución, reporting | LangGraph con audit log + Apache Fineract reporting |
| SOX (USA) | Controles sobre reporting financiero, pistas de auditoría | Workflow agentes con human approval gates |
| GDPR / LGPD (LATAM) | Privacidad de datos en modelos de scoring y KYC | On-premise + modelos locales (Ollama) en vez de cloud APIs |
| BCRA / CMF / CVM (LATAM local) | Reguladores nacionales adoptando frameworks EU AI Act equivalentes | Consultoría de compliance AI para bancos LATAM |

## Oportunidades AI en LATAM

| Oportunidad | Tamaño / Urgencia | Stack sugerido |
|-------------|-------------------|----------------|
| Scoring crediticio para no-bancarizados | 160M adultos no bancarizados en LATAM | FinRL + Fineract + datos alternativos (telco, retail) |
| KYC/AML automatizado para bancos regionales | Costo promedio: 10-15% headcount en compliance | LangGraph + Claude Vision + pgvector + sanctions APIs |
| CFO asistente para PYMEs | 99% de empresas LATAM son PYME, subservidas por ERP | ERPNext + Frappe CRM + Claude (NL queries sobre datos) |
| Trading algorítmico para brokers locales | Democratización del quant trading en LATAM | TradingAgents + ccxt (BVC, B3, BYMA) + OpenBB |
| Detección de fraude en pagos digitales | PIX (Brasil) +1B transacciones/día; fraude creciendo | Hummingbot streams + LangGraph anomaly agents + Claude |

## Posicionamiento Globant

- **Fortaleza**: Presencia en bancos top de LATAM + USA; conocimiento regulatorio local
- **Diferenciador**: Implementar TradingAgents / FinRobot sobre infraestructura regulatoria real (no POCs)
- **Oferta natural**: Compliance-first agentic AI — governance + audit log + explainability desde el inicio
- **GTM**: EU AI Act compliance como entrada a Europa; scoring alternativo como entrada a LATAM no bancarizado
