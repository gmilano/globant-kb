# Repos trending — Legal AI

> Novedades destacadas en GitHub. Última actualización: 2026-07-08 (v4)

## Nuevos y en ascenso (julio 2026)

| Nombre | Licencia | Descripción | Stars |
|--------|----------|-------------|-------|
| [claude-for-legal](https://github.com/anthropics/claude-for-legal) | Apache-2.0 | Suite oficial Anthropic: 12 plugins por área práctica, 80+ agentes, 20+ MCP connectors; 882★ y 165 forks en las primeras 24h — record Anthropic open source | 882 |
| [Mike](https://github.com/willchen96/mike) | AGPL-3.0 | Plataforma legal AI self-hostable (Harvey alternativa): Next.js+Express+Supabase; 2.2k★ y 614 forks en 72h — mayor adopción de cualquier legaltech project en la historia | 2200 |
| [Suzie Law](https://github.com/firelex/suzielaw) | Apache-2.0 | Harvey alternativa de Scissero: 160+ agentic workflows, 12 personas por área de práctica, 19 jurisdicciones; auto-migración hosted→self-hosted | 800 |
| [lawglance](https://github.com/lawglance/lawglance) | MIT | RAG-based legal assistant gratuito open source; multi-jurisdicción; orientado a acceso democrático a asistencia legal | 150 |
| [lavern](https://github.com/AnttiHero/lavern) | Apache-2.0 | Agentic law firm: 67 agentes especialistas, debate multi-evidencia, human gates obligatorios, 10-pass verification loop; arquitectura de referencia trending en comunidad LegalTech | 267 |
| [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | Apache-2.0 | DMS agéntico open: anotación semántica, análisis colaborativo, API REST; en ascenso con integración Claude + MCP | 390 |
| [awesome-legaltech](https://github.com/Vaquill-AI/awesome-legaltech) | MIT | Lista curada 2026: MCP servers legales (US/India/Canadá), plataformas, benchmarks, datasets globales | 185 |
| [claude-legal-skill](https://github.com/evolsb/claude-legal-skill) | MIT | Contract review CUAD + redlines .docx + memos negociación; 26+ herramientas compatibles | 355 |
| [LRAGE](https://github.com/hoorangyee/LRAGE) | MIT | Framework evaluación RAG legal: BM25+FAISS precompilados, integración smolagents, soporte LegalBench/LawBench/Pile-of-Law | 180 |
| [courtlistener-api-client](https://github.com/freelawproject/courtlistener-api-client) | Apache-2.0 | Python SDK oficial CourtListener: opiniones, dockets, jueces, citas; actualizado con MCP mayo 2026 | 120 |

---

## Hitos de la semana en Legal AI

### OLA OPEN SOURCE — Mayo 2026: la semana que cambió legaltech

En la semana del 4-13 de mayo de 2026, tres proyectos open source se lanzaron casi simultáneamente, marcando un punto de inflexión en el ecosistema:

#### Anthropic lanza Claude for Legal — 13 mayo 2026 (Apache 2.0)
Anthropic publicó `anthropics/claude-for-legal`: suite open source con 12 plugins por área de práctica, 80+ agentes, 20+ conectores MCP y una Managed Agents API para rutinas background.
- 882★ y 165 forks en las primeras 24 horas
- Conectores MCP incluyen: CourtListener, Ironclad, DocuSign, iManage, Everlaw
- Commands: `/review-contract`, `/triage-nda`, `/vendor-check`, `/brief`, `/respond`
- Managed Agents cookbook: renewal watcher, docket watcher, regulatory feed monitor, diligence grid
- Fuente: [lawnext.com — Anthropic Goes All-In on Legal](https://www.lawnext.com/2026/05/anthropic-goes-all-in-on-legal-releasing-more-than-20-connectors-and-12-practice-area-plugins-for-claude.html)

#### Mike OSS — 5 mayo 2026 (AGPL-3.0)
Will Chen, ex-asociado de Latham & Watkins, construyó Mike en 2 semanas y lo liberó bajo AGPL-3.0.
- Pitch: "Feature parity [con Harvey]. Zero cost. Self-hostable."
- 2.2k★ y 614 forks en 72h — mayor adopción inicial en la historia de legaltech
- Arquitectura: Next.js + Express + Supabase Auth/Postgres + Cloudflare R2
- Multi-modelo: Anthropic, Gemini, OpenAI con clave propia
- Fuente: [artificiallawyer.com](https://www.artificiallawyer.com/2026/05/04/mike-the-open-source-legal-ai-platform-will-chen-interview/)

#### Suzie Law — 7 mayo 2026 (Apache-2.0)
Scissero lanzó Suzie Law como base extensible para construir soluciones legales AI:
- 12 practice-area personas + 160+ agentic workflows inspectable y modificables
- Redlines DOCX, investigación en 19 jurisdicciones
- Diseñado para clonar, modificar y adaptar; base ideal para soluciones verticales Globant
- Fuente: [artificiallawyer.com — Scissero Launches Suzie Law](https://www.artificiallawyer.com/2026/05/07/scissero-launches-suzie-law-open-source-ai-assistant/)

---

### HAQQ-LAB — Primer Benchmark de Derecho Civil (junio 2026)

HAQQ lanzó el primer benchmark público para AI en sistemas de derecho civil y jurisdicciones MENA:
- **300 tareas** en 51 áreas de práctica
- **20+ jurisdicciones**: US, UK, EU, UAE, DIFC, Saudi Arabia, Lebanon, Egypt, Qatar, Singapore, Australia
- **Hallazgo crítico**: 24% de 3,000 respuestas de los 10 mejores modelos frontier citaron ley incorrectamente
- **Ganador**: Claude Opus 4.8 — 30.02/35 puntos
- 1,313 casos judiciales documentados con AI hallucinations a julio 2026
- Fuente: [haqq.ai/blog/civil-law-legal-ai-benchmark](https://haqq.ai/blog/civil-law-legal-ai-benchmark)

---

### CourtListener → Claude MCP (12 mayo 2026)
Free Law Project lanzó el conector MCP oficial: Claude y otros agentes AI tienen ahora acceso nativo a 8M+ opiniones judiciales, datos PACER, análisis de citas y transcripciones de argumentos orales.  
Fuente: [free.law/2026/05/12/courtlistener-is-now-available-inside-claude](https://free.law/2026/05/12/courtlistener-is-now-available-inside-claude/)

### Harvey LAB Benchmark (mayo 2026)
Primer benchmark open-source de largo horizonte para agentes legales: 1,200+ tareas, 24 áreas de práctica, avalado por OpenAI/Anthropic/Mistral/NVIDIA.  
Fuente: [harvey.ai/blog/legal-agent-benchmark-initial-results](https://www.harvey.ai/blog/legal-agent-benchmark-initial-results)

### Enter (Brasil) — Primer unicornio legal-AI de LATAM (mayo 2026)
$100M ronda Founders Fund + Sequoia; plataforma de agentes IA para litigios masivos de consumo y laboral; referencia para escalar soluciones legales en LATAM.  
Fuente: [getenter.ai](https://www.getenter.ai/en)

### LexisNexis Protégé Work (mayo 2026)
Capa agéntica sobre Protégé: planning multi-step, ejecución autónoma sobre habilidades legales, Shepard's Verify para validar citas en tiempo real.

### EU AI Act — Deadline 2 agosto 2026
Aplicación completa para sistemas de alto riesgo (Anexo III incluye aplicaciones legales). Penalidad: hasta €35M o 7% de ingresos globales.  
**Quedan 25 días. Si tu cliente tiene AI en contexto legal en la UE, debe actuar ahora.**

---
*Pipeline automático — se actualiza cada hora.*
