# 📡 Tendencias — Legal Services AI

> Última actualización: 2026-07-05

## Tendencias técnicas

### 1. De pilotos a despliegues (2026 es el año de ejecución)
El auge de agentes en 2025 fue experimental. En 2026, la tendencia dominante es **deployment**: equipos legales integran AI en flujos de trabajo reales.
- 47% de departamentos legales corporativos ya usan GenAI (vs 23% en 2025)
- 92% de profesionales legales usan al menos 1 herramienta AI
- Las firmas que no adoptan AI están perdiendo talento joven (80% de nuevos asociados esperan herramientas AI)

### 2. Arquitecturas híbridas LLM + reglas
Los sistemas de mayor rendimiento en análisis de contratos combinan LLMs con extractores basados en reglas:
- F1 = 0.912 en CUAD con arquitectura híbrida LLM + LexNLP
- F1 = 0.883 con LLMs especializados solos
- F1 = 0.847 con LLMs de propósito general
- **Implicación**: usar LexNLP para extracción determinística + LLM para razonamiento contextual

### 3. MCP como interfaz legal estándar
El patrón **MCP (Model Context Protocol) + APIs legales** está emergiendo como estándar:
- `OpenContracts` lanzó su MCP server integrado (MIT)
- `uspto_fpd_mcp` expone decisiones USPTO como MCP tools
- Se anticipan MCP servers para: PACER (US courts), EUR-Lex, BOE España, Diario Oficial LATAM
- Los agentes Claude ya pueden buscar jurisprudencia y contratos sin código personalizado

### 4. LLMs open source líderes para texto legal
Los tres mejores modelos open-source para análisis de documentos legales en 2026:
1. **DeepSeek-R1** (Apache-2.0) — razonamiento multi-paso, ventana 128k
2. **Qwen3-235B-A22B** (Apache-2.0) — mejor relación calidad/coste en producción
3. **Qwen2.5-VL-72B** (Apache-2.0) — multimodal: analiza PDFs escaneados y tablas

### 5. RAG legal especializado
LegalBench-RAG (2025) demostró que los benchmarks genéricos de RAG no sirven para legal:
- Los retrievers genéricos tienen 34% menos precisión en búsqueda jurisprudencial
- Los modelos entrenados en CUAD mejoran extracción de cláusulas en 28%
- **Implicación**: usar `legalbenchrag` para evaluar cualquier sistema RAG legal antes de producción

---

## Tendencias regulatorias

### EU AI Act — Agosto 2026 (impacto crítico)
La UE clasifica AI usada en servicios legales como **alto riesgo** (Annex III):
- Requiere: transparencia, supervisión humana, gestión de riesgos
- Requiere: documentación técnica, registro en base de datos EU
- Sanciones: hasta €30M o 6% de facturación global
- **Para Globant**: toda implementación de AI legal para clientes EU/regulados en EU debe cumplir EU AI Act
- Los pipelines de due diligence (lavern, dd-agents) necesitan human gates documentadas como evidence

### Confidencialidad y privilege attorney-client
- Las firmas rechazan SaaS cloud para contratos sensibles → oportunidad para soluciones on-premise
- `OpenContracts` (self-hosted), `contract-review-agent` (local-first), `arin` (local) responden a esto
- GDPR + Bar Association rules → los datos del cliente no pueden salir de la jurisdicción

### Consolidación CLM (Contract Lifecycle Management)
- El mercado CLM está fusionándose con AI de análisis: Ironclad, Icertis, Conga añaden LLMs
- Oportunidad: implementar CLM open source + AI encima para clientes que no quieren vendor lock-in

---

## Repos más activos esta semana

- [AnttiHero/lavern](https://github.com/AnttiHero/lavern) — Firma legal agentica Apache-2.0: 267★ y subiendo
- [Open-Source-Legal/OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) — DMS agéntico MIT con MCP server; 920★
- [zeroentropy-ai/legalbenchrag](https://github.com/zeroentropy-ai/legalbenchrag) — Benchmark RAG legal (ICAIL 2025); 310★
- [Vaquill-AI/awesome-legaltech](https://github.com/Vaquill-AI/awesome-legaltech) — Directorio curatorial legaltech OSS; 320★
- [Romelium/dd-agents](https://github.com/Romelium/dd-agents) — Due diligence M&A multi-agente; 90★

---

## Lo que viene (próximas 12 semanas)

| Tendencia | Probabilidad | Impacto |
|-----------|-------------|----------|
| MCP servers para cortes/BOE/EUR-Lex | Alta | Acceso a jurisprudencia en tiempo real para agentes |
| Fine-tuned Qwen3 en datos CUAD públicos | Alta | LLM legal open source de referencia |
| Primeras sanciones EU AI Act en legal | Media | Presión para auditorías de sistemas AI |
| CLM open source con AI integrado de serie | Media | Alternativa real a Ironclad/Icertis |
| Agentes de litigación (predicción de outcomes) | Baja | Requiere fine-tuning sobre jurisprudencia nacional |
