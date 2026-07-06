# Mapa de mercado — Legal Services AI

> Players, oportunidades, posicionamiento. Foco LATAM + global.
> Última actualización: 2026-07-06

## Mercado global

| Segmento | 2025 | 2026 | CAGR | Horizonte |
|----------|------|------|------|-----------|
| LegalTech AI (específico) | $2.82B | $3.7B | 31.4% | → 2030 |
| LegalTech total (broad) | $34.1B | $38.67B | 13.22% | → $71.95B (2031) |
| Legal AI Software (MarketsandMarkets) | $1.2B | $1.8B | ~35% | → $6B (2030) |

---

## Players globales

| Empresa | Tipo | Fortaleza | Debilidad | Relevancia para Globant |
|---------|------|-----------|-----------|------------------------|
| **Harvey** | Startup AI | Modelo LLM propio entrenado en texto legal, $2B+ valutación | Caja negra, precio premium | Competidor en proyectos de firmas grandes |
| **Thomson Reuters** | Enterprise | Westlaw AI, $200M+ inversión en AI 2025, adquisición SafeSend $600M | Legacy systems, lento | Partner potencial para proyectos corporativos |
| **RELX / LexisNexis** | Enterprise | Lexis+AI, corpus inmenso, global | Mismo problema que TR | Integrar APIs LexisNexis en soluciones custom |
| **Clio** | SaaS mid-market | Adquirió vLex $1B (2025), fuerte en firmas pequeñas/medianas | Solo cloud, US-centric | Oportunidad: alternativa open-source on-prem para LATAM |
| **Everlaw** | Startup | eDiscovery AI, corporate adoption 23%→54% 2024→2025 | Niche (eDiscovery) | Inspiration para patrones de document review |
| **Relativity** | Enterprise | eDiscovery, AI-powered review | Precio prohibitivo LATAM | Nicho de oportunidad con alternativas open |
| **Legora** | Startup EU | Multi-agente legal, fuerte en Europa | No LATAM | Referencia de arquitectura (Mike OSS lo reimplementó) |
| **Spellbook** | Startup | Contract drafting AI, integrado en Word | Solo inglés | Referencia UX para proyectos de contratos |

---

## Mercado LATAM

| País | Tamaño mercado LegalTech | Drivers | Oportunidades Globant |
|------|--------------------------|---------|----------------------|
| **Brasil** | Mayor mercado LATAM | Reforma Tributária (IBS/CBS), digitalización judicial, LGPD | Automatización tributaria, document intelligence, compliance LGPD |
| **México** | 2do mercado | Reforma judicial 2025, digitalización SATL | E-discovery, contratos gobierno, compliance fiscal |
| **Argentina** | 3er mercado | Deregulación Milei, ajuste legal masivo, necesidad de celeridad | Contract review, regulatory monitoring, AI para bufetes PYME |
| **Colombia** | Creciente | Digitalización Rama Judicial | Acceso a justicia, legal aid, transcripción audiencias |
| **Chile** | Maduro digitalmente | Mercado tech avanzado | Premium: AI para M&A, due diligence, banca |
| **Perú** | Emergente | Digitalización juzgados | Herramientas básicas AI + acceso a justicia |

**LATAM total**: $1.9B (2025) → $4.9B (2034) CAGR ~11.12%

**Hito clave**: Enter (Brazil) se convirtió en el primer unicornio legaltech AI de LATAM (Series B $100M, Founders Fund + Sequoia + Ribbit Capital).

---

## Posicionamiento Globant — Zonas de ganancia

### 1. Contract Intelligence para Corporate Legal Depts
- **Target**: equipos legales in-house en multinacionales con presencia LATAM
- **Propuesta**: OpenContracts + Claude → review, extracción, alertas de vencimiento, comparación de cláusulas
- **Diferencial**: soberanía de datos (on-prem o VPC privada), multilingüe (ES/PT/EN)
- **Tiempo a valor**: 4-6 semanas MVP

### 2. Legal Aid + Acceso a Justicia
- **Target**: gobiernos, ONGs, operadores de justicia (Colombia, Perú, Brasil)
- **Propuesta**: lawglance/RAG + corpus público → asistente legal ciudadano
- **Diferencial**: open source + self-hosted + multilingüe
- **Tiempo a valor**: 6-8 semanas

### 3. Regulatory Monitoring & Compliance
- **Target**: sector financiero, farmacéutico, energético con operaciones LATAM
- **Propuesta**: MCP servers de normativa local + Claude → alertas regulatorias automáticas
- **Diferencial**: jurisdicciones múltiples en un stack unificado
- **Tiempo a valor**: 6-10 semanas

### 4. eDiscovery & Document Review
- **Target**: firmas de abogados medianas-grandes, M&A
- **Propuesta**: OpenContracts + Blackstone NER + vector search → review masivo
- **Diferencial**: costo 10-50x menor que Relativity/Everlaw
- **Tiempo a valor**: 8-12 semanas

### 5. Despacho Digital (Law Firm Modernization)
- **Target**: firmas medianas LATAM aún en papel/email
- **Propuesta**: OpenLawOffice o SuiteCRM + AI layer → gestión completa + AI
- **Diferencial**: open source, ningún vendor lock-in, hosting local
- **Tiempo a valor**: 4-8 semanas

---

## Riesgos y consideraciones

| Riesgo | Mitigación |
|--------|-----------|
| AI hallucinations en decisiones legales | Mandatory citation verification, human-in-the-loop gates (patrón lavern), LegalBench eval |
| Regulación de AI en práctica legal | Documentar uso como "asistente", disclaimers, logging de todas las respuestas |
| Confidencialidad / privilege | Self-hosted, zero telemetría, OpenContracts MIT license audit |
| Licencia AGPL (Mike, LexNLP) | Uso interno no triggerea AGPL; solo si se expone a terceros |

---
*Actualizado: 2026-07-06. Fuentes: IMARC Group, Markets&Markets, Thomson Reuters Institute, HAQQ Blog.*
