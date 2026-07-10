# Tendencias — Legal AI

> Última actualización: 2026-07-10 (v8)

## Tendencias 2026

### T1 — Lavern: el agentic law firm open source
- AnttiHero/lavern (Apache 2.0): primera implementación completa de firma legal agéntica open source
- 67 agentes especializados + debate protocol + human gates + 10-pass verification
- Lanzado May 20 2026; 2.1k★ en 7 semanas (+780% desde lanzamiento)
- Señal: abogados individuales y firmas pequeñas podrán tener su propia "firma AI"
- Globant angle: construir verticales LATAM sobre Lavern ($20k-$300k)

### T2 — Anthropic entra al vertical legal con stack completo
- claude-for-legal (Apache 2.0, May 2026): 12 plugins × área de práctica, 80+ agentes, 20+ conectores MCP
- Managed Agents API para workflows background sin intervención humana
- TechCrunch (May 12 2026): "The AI legal services industry is heating up — Anthropic is getting in on the action"
- Señal: Anthropic se posiciona como infraestructura para legal AI, no solo modelo
- Globant angle: Managed Partner para extender claude-for-legal en LATAM

### T3 — EU AI Act: T-23 días al deadline de alto riesgo (Aug 2 2026)
- Sistemas de alto riesgo en ámbito legal desde Aug 2 2026: credit scoring, AML, insurance pricing
- Penalidad: €15M o 3% global revenue
- EU Digital Omnibus (aprobado Consejo EU Jun 29 2026): Annex III 'per use' extendido a Dec 2027 pero 'built-in' mantiene Aug 2 2026
- Vaara (AGPL-3.0): audit logs hash-chained + TPM attestation → herramienta clave
- microsoft/agent-governance-toolkit (MIT): cubre los 10 OWASP Agentic AI risks, EU AI Act + HIPAA + SOC 2
- AegisAI (MIT): AI-GRC platform open source
- Globant angle: sprints de compliance ($50k-$200k, 4-8 semanas) — ventana crítica NOW

### T4 — Harvey vs. Legora duopolio + fragmentación downstream
- $16.6B combined enterprise value en un mercado que casi no existía hace 5 años
- Legora aOS (May 2026): primera demo pública de workflows legales autónomos end-to-end (Outlook→DMS→draft→blackline→client reply)
- Legora: $100M ARR en 18 meses desde GA — récord en legaltech
- Legora adquirió Walter AI (Vancouver) para capacidades agénticas Mar 2026
- Efecto downstream: firmas medianas (50-500 abogados) fuera del alcance de precios Harvey/Legora
- Globant angle: stack open source para mid-market que Harvey/Legora ignoran

### T5 — MCP wave legal: primer YC-backed law firm con MCP en producción
- General Legal (YC26): primera firma legal con MCP server en producción (legalmcp.org, Abr 2026)
- CourtListener MCP: Claude Connector oficial — 250M+ páginas US jurisprudencia
- FOLIO MCP (MIT, 95★): 18k+ conceptos legales multilingüe directamente en Claude
- Thomson Reuters + Free Law Project: ambos lanzan MCP con Claude en May 2026 (LawSites)
- Señal: el stack legal AI se convierte en MCP-first — agentes acceden a datos en lugar de copiar
- Globant angle: construir MCP servers para datos legales LATAM (BR legislativo, MX CPEUM, CL BCN)

### T6 — LLMs especializados en derecho: la receta funciona
- Saul (Equall.ai): primer open-weights LLM con continued-pretraining en corpus legales → prueba que receta "domain-pretrain Llama" funciona para derecho
- DISC-LawLLM (Apache 2.0, 937★): modelo chino en producción; mismo patrón aplicable a LATAM
- MultiLegal Pile: 689B tokens legales en 24 idiomas — disponible para fine-tuning
- Señal: dominio legal tiene suficiente corpus público para fine-tuning efectivo
- Globant angle: fine-tune Llama 3.3 / Qwen3 sobre corpus LATAM ($80k-$200k proyecto)

### T7 — Alternativas open source a Harvey: la pila se madura
- Mike (AGPL-3.0, 3.9k★, 900+ forks): plataforma self-hostable Next.js + Supabase; chat docs, redlines .docx
- Lavern (Apache 2.0, 2.1k★): 67 agentes especializados; multi-LLM; Ollama local
- Nomos (HAQQ): interfaz agéntica legal "Cursor for legal" — skills-first
- LegalMD (MIT): Markdown dialect para contratos con @party, @cite, @clause, @deadline; TypeScript parser + VS Code extension
- Señal: 2026 = año en que la pila legal open source alcanza viabilidad productiva
- Globant angle: integrar y customizar estos proyectos para clientes LATAM

### T8 — Tamper-evident audit trails: requerimiento regulatorio
- Vaara (AGPL-3.0): hash-chained logs + TPM 2.0 → demostrar qué hizo exactamente el agente
- EU AI Act Art. 12 (record-keeping) + Art. 14 (human oversight): obligatorio para sistemas alto riesgo
- Reconocido en IMDA Model AI Governance Framework v1.5 (Singapur, May 2026)
- Señal: compliance = diferenciador, no solo requisito regulatorio
- Globant angle: añadir Vaara como capa de compliance en cualquier solución legal AI

### T9 — Privilege bombshell: clientes demandan a firmas por AI work product
- HAQQ Legal AI Market Report (Abr 2026): "$145K en sanciones" en primeros casos de malpractice AI
- Juzgados US imponiendo $145k en sanciones a firmas que sometieron "AI-hallucinated citations"
- EU AI Act agrava exposición: sistemas de alto riesgo requieren supervisión humana documentada
- Señal: human-in-the-loop no es opcional en legal AI — es protección legal
- Globant angle: diseñar sistemas con gates humanos obligatorios (patrón Lavern)

### T10 — LATAM: Reforma Tributária Brasil + NEARSHORING México = catalizadores
- Brasil: Reforma Tributária 2026 crea IBS + CBS → toda empresa necesita asesoría tributaria AI
- México: NEARSHORING record FDI → contratación masiva de abogados corporativos → oportunidad AI copilot
- LGPD enforcement activo en Brasil → compliance legal AI = must-have
- LATAM Legal Tech: $1.9B (2025) → $4.9B (2034) CAGR 10.68%
- Señal: los drivers legales de LATAM son específicos y no cubiertos por Harvey/Legora
- Globant angle: productos específicos (BR tributario, MX laboral, CL minería)

### T11 — Legal AI Quality: LegalBench como estándar de evaluación
- legalbench (MIT, 1.1k★): 162 tareas — IRAC, statutory interpretation, contract analysis
- Cualquier equipo que construya LLM para legal DEBE reportar scores en LegalBench
- legalbenchrag (MIT, 280★): específicamente para RAG legal — 6,858 pares expert-annotated
- Señal: el campo se profesionaliza → evaluación rigurosa = diferenciador
- Globant angle: añadir LegalBench eval en cualquier entrega de legal AI

### T12 — Gartner: presupuestos Legal Tech se duplican para 2028
- Gartner (May 26 2026): "Legal AI Use Expands" → presupuestos 2x by 2028
- Driver: automatización departamentos legales corporativos (in-house counsel)
- Segmento más rápido: in-house legal teams en corporaciones Fortune 500 LATAM
- Globant angle: partners con GCs y CLOs de clientes enterprise existentes

### T13 — Primer "privilege bombshell" abre debate sobre work product doctrine
- Debate: ¿documentos generados por AI están protegidos por attorney-client privilege?
- 3 circuitos US en 2026 con posiciones divergentes
- Señal: legal AI en litigación requiere asesoría sobre privilege before deployment
- Globant angle: incluir legal counsel en proyectos de litigación AI

### T14 — LegalMD: contratos como código
- LegalMD (MIT): @party, @cite, @clause, @deadline — TypeScript parser + resolver + VS Code extension
- Tesis: abogados no deberían escribir contratos en DOCX en 2026 como developers no usan Word para código
- Early pero shipping — HAQQ dogfooding internamente
- Señal: en 5 años, contratos en texto plano estructurado serán el estándar para AI processing
- Globant angle: adoptar LegalMD en pipelines de contract automation

### T15 — Legora aOS: workflows legales autónomos end-to-end
- Legora aOS (May 2026): Outlook→DMS→draft→blackline→client reply en un loop de agente
- Primera demostración pública de "agente legal que trabaja solo overnight"
- Señal: el nivel de autonomía que se creía ciencia ficción está en producción comercial en 2026
- Globant angle: diseñar soluciones con este nivel de autonomía para el segmento mid-market

---
*Actualizado automáticamente por el pipeline de ingest.*
