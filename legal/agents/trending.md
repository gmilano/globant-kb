# Repos trending — Legal AI

> Novedades destacadas en GitHub. Última actualización: 2026-07-09 (v6)

## Nuevos y en ascenso (julio 2026)

| Nombre | Licencia | Descripción | Stars |
|--------|----------|-------------|-------|
| [claude-for-legal](https://github.com/anthropics/claude-for-legal) | Apache-2.0 | Suite oficial Anthropic: 12 plugins por área práctica, 80+ agentes, 20+ MCP connectors; **8.7k★ y 1.6k forks** en jul 2026 (9.8x vs lanzamiento mayo) | 8700 |
| [Mike](https://github.com/willchen96/mike) | AGPL-3.0 | Plataforma legal AI self-hostable (Harvey alternativa): Next.js+Express+Supabase; **3.9k★ y 900+ forks** — mayor adopción de cualquier legaltech project en la historia; benchmark 41.8/50 (vs Harvey) | 3900 |
| [Nomos](https://github.com/haqq-ai/nomos) | MIT | **NUEVO v6** — HAQQ: interface legal agent-native, auto-hostable, skills-first; "Cursor para abogados"; el AI engine y el abogado son usuarios de primer nivel del mismo workspace; integra skills de GLAW + plugins de claude-for-legal | 310 |
| [Master Claude for Legal](https://github.com/haqq-ai/master-claude-for-legal) | MIT | **NUEVO v6** — HAQQ: community skill pack — 5 starter skills (NDA triage, multi-party version diff, meeting brief, citation verifier, status synthesis) + privilege architecture docs + MCP permission hardening | 185 |
| [harvey-labs](https://github.com/harveyai/harvey-labs) | MIT | **NUEVO v6** — Harvey: benchmark open-source para agentes legales; 1,200+ tareas, 24 áreas de práctica, 75k+ criterios; repositorio oficial del LAB benchmark | 920 |
| [korean-law-mcp](https://github.com/chrisryugj/korean-law-mcp) | MIT | **NUEVO v5**: MCP server para leyes coreanas — 41 APIs del National Law Information Center (법제처), verificación anti-hallucination de citas, grafo de impacto legal; v4.4.0 con 9 tools optimizadas; **2.1k★** | 2155 |
| [GLAW](https://github.com/lawve-ai/glaw) | MIT | **NUEVO v5**: Virtual law firm skill self-contained — 10 departamentos, 179 source skills, 63 seated roles, hard-gated matter pipeline, fraud dossiers, OCR orchestration; genera work-product con supervisión humana integrada | 340 |
| [Suzie Law](https://github.com/firelex/suzielaw) | Apache-2.0 | Harvey alternativa de Scissero: 160+ agentic workflows, 12 personas por área de práctica, 19 jurisdicciones; auto-migración hosted→self-hosted | 800 |
| [lawglance](https://github.com/lawglance/lawglance) | MIT | RAG-based legal assistant gratuito open source; multi-jurisdicción; orientado a acceso democrático a asistencia legal | 150 |
| [lavern](https://github.com/AnttiHero/lavern) | Apache-2.0 | Agentic law firm: 67 agentes especialistas, debate multi-evidencia, human gates obligatorios, 10-pass verification loop; arquitectura de referencia trending en comunidad LegalTech | 267 |
| [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | Apache-2.0 | DMS agéntico open: anotación semántica, análisis colaborativa, API REST + MCP server propio; en ascenso | 390 |
| [awesome-legaltech](https://github.com/Vaquill-AI/awesome-legaltech) | MIT | Lista curada 2026: MCP servers legales (US/India/Canadá/Korea), plataformas, benchmarks, datasets globales | 195 |
| [claude-legal-skill](https://github.com/evolsb/claude-legal-skill) | MIT | Contract review CUAD + redlines .docx + memos negociación; 26+ herramientas compatibles | 355 |
| [ai-legal-claude](https://github.com/zubair-trabzada/ai-legal-claude) | MIT | **NUEVO v5**: 14 legal skills + 5 agentes paralelos; NDA generation, compliance auditing, negotiation strategy, PDF reports — compatible con Claude Code, Codex, Cursor | 178 |
| [legal-rag-bench](https://github.com/isaacus-dev/legal-rag-bench) | MIT | **NUEVO v5**: Benchmark reasoning-intensive para RAG legal end-to-end; evalúa precisión + recuperación + razonamiento sobre documentos reales | 165 |
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

### EU AI Act — Deadline 2 agosto 2026 + Propuesta de prórroga (v6)
Aplicación completa para sistemas de alto riesgo (Anexo III incluye aplicaciones legales). Penalidad: hasta €35M o 7% de ingresos globales.
- **Propuesta Digital AI Omnibus** (mayo 2026): extensión de 16 meses para Anexo III HRAIS → nueva fecha propuesta 2 dic 2027
- **PERO**: a junio 2026, la propuesta NO está promulgada como ley — el 2 agosto 2026 sigue siendo la fecha operativa
- **78% de organizaciones** no han dado pasos significativos hacia el cumplimiento (abril 2026)
- **50%+ carecen de inventario básico de AI**
- Fuente: DLA Piper GENIE, Latham & Watkins, AI Act EU tracker

**Estrategia recomendada**: Preparar para el 2 agosto mientras se monitorea el proceso legislativo del Omnibus. Los clientes que esperen la prórroga asumen riesgo regulatorio.

---

### Legal Skills Ecosystem — Explosión julio 2026

Una nueva capa de infraestructura legal AI emergió en forma de "skills" portátiles para Claude Code y agentes:

| Repo | Tipo | Descripción |
|------|------|-------------|
| [lawve-ai/awesome-legal-skills](https://github.com/lawve-ai/awesome-legal-skills) | Curada | Lista de Agent Skills para automatizar trabajo legal — curatorial |
| [skala-io/legal-skills](https://github.com/skala-io/legal-skills) | Skills | Skills legales construidas por abogados de Skala.io — revisión de contratos, due diligence |
| [lawvable/agent-skills](https://github.com/lawvable/agent-skills) | Skills | Colección curada de Agent Skills para trabajo legal — multi-area |
| [harvard-lil/skills-hub-demo](https://github.com/harvard-lil/skills-hub-demo) | Skills | Harvard Law Innovation Lab: skills de AI para educación legal y práctica |
| [ai-legal-claude](https://github.com/zubair-trabzada/ai-legal-claude) | Skills | 14 skills + 5 agentes paralelos: NDA, compliance, contract review, PDF reports |
| [GLAW](https://github.com/lawve-ai/glaw) | Virtual Firm | 179 skills, 10 departamentos: la skill más completa del ecosistema |

**Patrón emergente**: Los "skills" (SKILL.md en Claude Code) democratizan el expertise legal — cualquier abogado puede leer, modificar y desplegar. El moat competitivo se desplaza hacia la calidad de la especialización jurisdiccional, no hacia el software.

---

### Korean Law MCP — Caso de estudio de expansión jurisdiccional (2026)

chrisryugj/korean-law-mcp (2.1k★ MIT) demuestra el patrón de "jurisdicción-específica MCP":
- 41 APIs del gobierno coreano (법제처) accesibles vía Claude/LangChain
- Verificación de citas con anti-hallucination integrado
- Grafo de impacto legal: ¿qué casos cita esta sentencia?
- 4 versiones en 6 meses: 89 tools → 54 tools → 14 tools → 9 tools (simplificación agresiva)

**Por qué importa para Globant**: el mismo patrón aplica para Argentina (CEJAT), Brasil (PJe), México (SCJN), Colombia (EJE) — jurisdicción-específica MCP es la próxima capa de diferenciación en LATAM legal AI.

---

### AI Legal Drafting Tools Market — Nuevo segmento confirmado (julio 2026)

GlobeNewswire (7 julio 2026): El mercado de herramientas AI de redacción legal es un sub-segmento de $0.9B (2025) en fuerte crecimiento:
- **2025**: $0.9B → **2026**: $1.17B → **2030**: $3.42B
- CAGR 31% — el mismo ritmo que el mercado Legal AI completo
- Drivers: demanda de redacción de contratos, cumplimiento regulatorio y automatización de documentos legales
- Fuente: [GlobeNewswire 2026-07-07](https://www.globenewswire.com/news-release/2026/07/07/3323004/0/en/AI-Legal-Drafting-Tools-Market-Projected-to-Surge-from-0-9-Billion-in-2025-to-3-42-Billion-by-2030.html)

---

### S8: Claude Fable 5 lidera Harvey LAB-AA con 14.2% all-pass (v6)

Artificial Analysis publicó evaluación independiente del Harvey LAB (LAB-AA):
- **Claude Fable 5**: 14.2% all-pass — casi el doble del segundo puesto
- **Claude Opus 4.8 + GLM-5.2**: 7.5% all-pass (empatados en 2do)
- **Claude Sonnet 4.6**: 5.0% (Harvey final score)
- **Frontera**: <10% de modelos frontier completan tareas end-to-end bajo all-pass estricto
- Costo por tarea: Fable 5 ~$18.9 | Sonnet 5 ~$11.8 | Opus 4.8 ~$8.2

**Por qué importa**: El Harvey LAB es el nuevo criterio de compra para enterprise legal AI. Las firmas que adopten AI sin validar contra HAL compran a ciegas. Para Globant: evaluar prototipos cliente con harvey-labs antes de ir a producción.

Fuentes: [Artificial Analysis Harvey LAB-AA](https://artificialanalysis.ai/articles/harvey-lab-aa) · [Harvey Blog](https://www.harvey.ai/blog/legal-agent-benchmark-initial-results)

---

### S9: HAQQ lanza Nomos + LegalMD + Master Claude for Legal (v6)

HAQQ open-sourced 3 nuevas herramientas de infraestructura legal (julio 2026):

**Nomos** (MIT): Interface legal agent-native, self-hostable, skills-first — el "Cursor para abogados". El AI engine y el abogado son usuarios de primer nivel del mismo workspace. Se integra con skills de GLAW y plugins de claude-for-legal.

**LegalMD** (MIT, openlegaldata/legal-md): Markdown dialect para documentos legales con 4 primitivos tipados: `@party`, `@cite`, `@clause`, `@deadline`. Parser TypeScript, resolver de citas contra datos legales abiertos, dos renderers (HTML/JSON), extensión VS Code. Filosofía: los contratos del 2026 no deberían escribirse en DOCX, como el código no se escribe en Word.

**Master Claude for Legal** (MIT): Community skill pack con 5 skills operativos (NDA triage, multi-party version diff, meeting brief, citation verifier, status synthesis) + docs sobre privilege architecture y MCP permission hardening.

**Implicación para Globant**: Nomos + GLAW + Master Claude for Legal es el stack completo para un despacho virtual self-hosted, sin costo de licencia. Ideal para firmas medianas LATAM que no quieren depender de Harvey/TR.

---

### S10: LATAM AI regulation se acelera (v6)

Los 3 mercados LATAM prioritarios para Globant están regulando AI:

**Brasil**: PL 2.338/2023 aprobado en Senado, pendiente en Cámara de Diputados. ANPD lanzó Sandbox Regulatorio AI + Data Protection (hasta dic 2026). Marco risk-based + supervisión arquitectural.

**Argentina**: Propuesta de Registro Nacional de Sistemas de Inteligencia Artificial — obligatoria para entidades públicas y privadas que desarrollen/usen AI, con información sobre propósito, estructura algorítmica y salvaguardas de seguridad.

**México**: Sin marco formal avanzado aún, pero enmiendas a ley laboral y de propiedad intelectual para regular image rights y AI en trámite. Ley de protección de datos incluye opt-out para toma de decisiones automatizadas.

**Oportunidad Globant**: posicionarse como advisory + implementación de AI legal compliance en LATAM — el "EU AI Act para América Latina" está en construcción ahora. Globant puede liderar el framework antes que Big4.

---

### S11: Mike OS puntúa 41.8/50 — supera a Harvey en benchmark (v6)

Mike OS (AGPL-3.0, willchen96/mike) alcanzó un benchmark promedio de 41.8/50, superando a Harvey según evaluaciones independientes. Harvey levantó $200M a una valoración de $11B en marzo 2026. La comparación:

| Sistema | Puntaje (benchmark) | Tipo | Costo/mes |
|---------|---------------------|------|-----------|
| Mike OS | 41.8/50 | Open source, self-hosted | Costo de API propia |
| Harvey | <41.8/50 | Propietario SaaS | $1,200+ |

**Narrativa**: Mike, construido por un abogado de Latham & Watkins en 2 semanas, supera a Harvey en tests de razonamiento. El "moat" de Harvey está en los datos privados, la cuenta enterprise y el soporte — no en la calidad del modelo.

---
*Pipeline automático — se actualiza cada hora. v6 2026-07-09.*
