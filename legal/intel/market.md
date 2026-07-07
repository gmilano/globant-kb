# Mapa de mercado — Legal AI

> Players, oportunidades, posicionamiento. Foco LATAM + global.
> Última actualización: 2026-07-07

## Tamaño de mercado

| Métrica | Valor 2026 | Proyección | CAGR |
|---------|-----------|------------|------|
| Legal AI Software (global) | $2.67B | $40B+ (2030) | ~28-35% |
| LATAM Legal Tech (total) | $1.7B (2024) | $4.8B (2033) | 11.12% |
| Contract Analytics (global) | $1.1B | $5.2B (2030) | 25% |
| E-Discovery AI (global) | $2.1B | $8.3B (2030) | 21% |
| Firmas usando AI activamente | 60%+ | 85% (2027) | — |

---

## Players globales — competidores y ecosystem

### Plataformas AI legales (comerciales)
| Empresa | Tipo | Fortaleza | Debilidad |
|---------|------|-----------|----------|
| Harvey AI | AI para Big Law | Calidad, adopción AmLaw 100 | Caro, no personalizable, no open source |
| Clio | Practice management | 150k+ firmas, ecosystem amplio | No AI-native, integración superficial |
| Kira Systems (LITERA) | Contract review | Accuracy contrastada | Caro para midmarket |
| Relativity | E-discovery | Estándar de industria | $$$, curva de aprendizaje |
| Ironclad | Contract lifecycle | UX excelente | Vendor lock-in, no customizable |
| Lexis+ AI | Research | Dataset propietario enorme | No LATAM, no español |
| Westlaw AI | Research | Thomson Reuters, edge data | No LATAM, muy caro |
| Juro | Contract management | Midmarket focus | Funcionalidades limitadas |

### Open source / customizable
| Proyecto | Tipo | Adopción | Posicionamiento |
|----------|------|----------|------------------|
| Docassemble | Document automation | US courts, legal aid orgs, firmas SMB | El Odoo de legal doc assembly |
| OpenContracts | Contract DMS + AI | Growing: builders y hackathons | Harvey open source self-hosted |
| OpenSign | E-signature | 6.3k+ ★, empresas midmarket | DocuSign killer |
| lavern | Multi-agent law firm | Firmas experimentando con AI | AutoGen para legal |
| SaulLM | Legal LLM | Fine-tuning base en producción | Llama para derecho |

---

## Mapa LATAM

### Brasil — mercado dominante
- Mercado legal LATAM más grande (40%+ del total regional)
- 1.2M+ abogados registrados (OAB) — más que EE.UU. en proporción
- Tribunales digitalizados: STJ, TRF, TRT usan sistemas electrónicos nativos
- Reforma tributária 2024-2026 (IBS, CBS) genera enorme demanda de asesoría
- **Stack recomendado:** Docassemble (PT) + SaulLM fine-tuned en PT jurídico + direito-familiar-imobiliario

### México — segundo mercado
- Nearshoring boom: contratos internacionales US-MX en record
- CDMX como hub fintech con necesidad de compliance legal
- **Stack recomendado:** lavern + OpenContracts + vaquill-mcp (US side) + módulo MX custom

### Argentina
- Desregulación post-2023: DNU y reforma legal masiva crea demanda de re-documentación
- Oportunidades: actualización contractual en masa, due diligence SA→SAS

### Colombia
- Hub regional para legal services BPO
- Compliance para minería y energía (sectores regulados con alta demanda)

### Chile
- Inversión minera y energética exige contratos internacionales
- Contract management para proyectos mineros (inglés/español)

---

## 5 Gaps en LATAM — oportunidades para Globant

| # | Gap | Tamaño estimado |
|---|-----|------------------|
| 1 | **Docassemble en español** — Fork mantenido + templates para jurisdicciones LATAM | Alto |
| 2 | **Legal RAG jurisdiccional** — No existe CourtListener para LATAM (STJ, SCJN, CSJ sin API) | Muy alto |
| 3 | **Contract review bilingüe** — CUAD y claude-legal-skill son US/EN-only | Alto |
| 4 | **Legal aid automation** — 400M personas sin acceso a abogados en LATAM | Social + comercial |
| 5 | **Compliance tributario** — IBS/CBS Brasil, reformas Argentina: alert agents necesarios | Alto |

---

## Posicionamiento Globant

**GTM tabla:**

| Segmento | Pain point | Solución Globant | Deal size |
|----------|-----------|------------------|----------|
| Firma mediana BR/MX | Harvey es muy caro | Suzie Law + SaulLM customizado | $150k-500k |
| In-house corporativo | Contract review manual | OpenContracts + claude-legal-skill + OpenSign | $200k-800k |
| Legal aid ONG | Sin herramientas para escalar | Docassemble ES/PT + Opennyai-like | $50k-200k |
| Compliance consultora | EU AI Act tracking | EU-Compliance-MCP + LangGraph | $100k-400k |
