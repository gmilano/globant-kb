# Verticales de partida — Legal Services

> Plataformas verticales existentes, customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-10 (v7)

## Plataformas Self-hosted Legal AI (nuevo 2026)

Las plataformas completas de legal AI open source que emergieron en mayo 2026 — diseñadas para ser clonadas, modificadas y desplegadas por el cliente:

| Plataforma | Licencia | URL | Arquitectura | Ventaja Globant |
|------------|----------|-----|--------------|-----------------|
| [Mike](https://github.com/willchen96/mike) | AGPL-3.0 | willchen96/mike | Next.js + Express + Supabase + R2 | Fork, personaliza por jurisdicción LATAM, despliega en AWS/GCP del cliente |
| [Suzie Law](https://github.com/firelex/suzielaw) | Apache-2.0 | firelex/suzielaw | Node.js + React + PostgreSQL | 160+ workflows como base, extiende con Claude Code para área de práctica específica |
| [claude-for-legal](https://github.com/anthropics/claude-for-legal) | Apache-2.0 | anthropics/claude-for-legal | Plugin SDK + Managed Agents API | Integra con stack existente del cliente (Ironclad, iManage, Everlaw) sin reemplazarlo. **8.7k★** |
| [GLAW](https://github.com/lawve-ai/glaw) | MIT | lawve-ai/glaw | Skills SKILL.md + Claude Code + MCP | Virtual law firm completo — instalar como skill y adaptar depts por jurisdicción LATAM |
| [Nomos](https://github.com/haqq-ai/nomos) | MIT | haqq-ai/nomos | Agent-native workspace + skills | **NUEVO v6** — "Cursor para abogados": AI engine + abogado como co-usuarios; integra GLAW + claude-for-legal; ideal como UI layer para soluciones verticales Globant |

### Cuándo usar cada uno

```
Mike:           Cliente quiere plataforma ALL-IN-ONE propia, financiero para hosting.
                AGPL-3.0 = ok si el cliente no distribuye comercialmente.
                Benchmark 41.8/50 (supera Harvey en tests independientes).

Suzie Law:      Cliente quiere base extensible, prefiere Apache-2.0 permisivo.
                Ideal para construir verticales específicas (M&A, laboral, tributario).

claude-for-legal: Cliente ya tiene stack (iManage, Ironclad, DocuSign) y quiere
                  añadir AI sin reemplazar plataformas existentes.

GLAW:           Cliente quiere un despacho virtual completo operativo desde día 1.
                MIT = máxima permisividad. Skills se extienden agregando SKILL.md.
                Ideal para firmas pequeñas o especialización jurisdiccional rápida.

Nomos (v6):     Cliente quiere un workspace donde el abogado Y el AI engine sean
                ciudadanos de primera clase. "Cursor para abogados". Self-hosted MIT.
                UI layer ideal para empaqueter soluciones Globant — sin construir UI.
                Combinar con GLAW (skills) + Master Claude for Legal (starter skills).
```

---

## Plataformas verticales establecidas (customizables con AI)

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| [Docassemble](https://github.com/jhpyle/docassemble) | MIT | jhpyle/docassemble | Python + YAML + Django | Entrevistas guiadas, formularios legales, ensamblado de documentos PDF/DOCX; base de Suffolk LIT Lab y juzgados de Massachusetts |
| [CourtListener](https://github.com/freelawproject/courtlistener) | Apache-2.0 | freelawproject/courtlistener | Django + Elasticsearch + PostgreSQL | Archivo judicial EE.UU.: 8M+ opiniones, PACER, citas, jueces; API REST + MCP connector para Claude (mayo 2026) |
| [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) | Apache-2.0 | Open-Source-Legal/OpenContracts | Python + React + GraphQL | DMS para inteligencia documental: anotación de contratos, análisis semántico colaborativo, exportación JSON/CSV |
| [OpenLawOffice](https://github.com/NodineLegal/OpenLawOffice) | Apache-2.0 | NodineLegal/OpenLawOffice | ASP.NET + SQL Server | Gestión de despacho legal: casos, facturación, tareas, clientes; base ERP para despachos pequeños y medianos |
| [ArkCase](https://www.arkcase.com/product/arkcase-open-source-case-management-platform/) | LGPL | ArkCase Community Edition | Java + Spring + Angular | Gestión de casos FedRAMP + HIPAA; OCR integrado, gestión de tiempo/gastos, localización, API; enfocado en gobierno y compliance |
| [RECAP Archive](https://github.com/freelawproject/recap) | BSD-3 | freelawproject/recap | Python + Django | Extensión browser para liberar documentos PACER (tribunales EE.UU.) al dominio público; archivo de millones de expedientes federales |
| [OpenNyAI](https://github.com/OpenNyAI/Opennyai) | MIT | OpenNyAI/Opennyai | Python + spaCy + Transformers | NLP end-to-end para documentos legales indios: NER, etiquetado retórico, sumarización; base para asistentes legales en India y LATAM civil law |
| [Bots.law](https://github.com/freelawproject/bots.law) | Apache-2.0 | freelawproject/bots.law | Python + Playwright | Automatización de acceso a datos judiciales; scrapers para múltiples sistemas judiciales estatales |
| [Blackstone](https://github.com/ICLRandD/Blackstone) | Apache-2.0 | ICLRandD/Blackstone | Python + spaCy | NLP especializado para texto legal inglés; modelo preentrenado ICLR & D para análisis de sentencias y contratos |
| [legalbenchrag](https://github.com/zeroentropy-ai/legalbenchrag) | MIT | zeroentropy-ai/legalbenchrag | Python + FAISS + Qdrant | Benchmark + corpus RAG legal (NDAs, M&A, contratos); base para construir y evaluar sistemas de recuperación legal |

---

## Cómo customizar con AI — Guía rápida

### Patrón 0: Despliegue de Mike auto-hosted (plataforma completa)
```bash
# Fork y deploy de Mike: plataforma legal AI completa
git clone https://github.com/willchen96/mike.git my-legal-ai
cd my-legal-ai

# Configurar API key del cliente (multi-modelo)
cp .env.example .env
# Editar: ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_KEY, R2_BUCKET

# Deploy en Railway / Fly.io / AWS
npm install
npm run build
npm start

# Personalización para LATAM: agregar jurisdicción y práctica local
# Editar: src/personas/latam-laboral.ts, src/personas/tributario-br.ts
```

### Patrón 1: Docassemble + LLM (entrevistas legales inteligentes)
```
1. Fork jhpyle/docassemble
2. Añadir API call al LLM en cada paso de la entrevista (validación, sugerencia de respuesta)
3. Auto-rellenar campos del formulario con datos extraídos de documentos subidos (RAG)
4. Generar PDF final con firma digital integrada
Stack: Docassemble + Anthropic API + Tesseract OCR + weasyprint
```

### Patrón 2: CourtListener + Claude MCP (investigación legal)
```
1. Conectar CourtListener MCP a Claude Desktop o Claude Code
2. Agente consulta 8M+ opiniones + citas en lenguaje natural
3. Síntesis de precedentes con análisis IRAC automatizado
4. Output: memo legal con citas verificadas
Stack: CourtListener MCP + Claude Sonnet 5 + LangGraph
```

### Patrón 3: claude-for-legal + stack enterprise (integración sin reemplazar)
```python
# Usar plugins de claude-for-legal sobre stack existente del cliente
# anthropics/claude-for-legal — Apache 2.0

# Plugin /review-contract sobre Ironclad
curl -X POST "https://api.anthropic.com/v1/messages" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -d '{
    "model": "claude-sonnet-5",
    "max_tokens": 8192,
    "system": "You are a legal AI assistant using the claude-for-legal contract review plugin.",
    "tools": [{"type": "computer_use"}, {"name": "ironclad_get_contract"}],
    "messages": [{"role": "user", "content": "/review-contract --contract-id CLO-2026-4821"}]
  }'
```

### Patrón 4: OpenLawOffice + AI (ERP despacho)
```
1. Fork NodineLegal/OpenLawOffice
2. Añadir módulo AI: transcripción de llamadas (Whisper), resumen de casos (LLM)
3. Alertas proactivas: vencimientos de plazos procesales via agente calendario
4. Dashboard de rentabilidad por cliente/caso con predicción de facturación
Stack: OpenLawOffice + Whisper + Anthropic API + React dashboard
```

---

## Plataformas comerciales de referencia (para benchmarking)

| Plataforma | Tipo | Referencia |
|------------|------|------------|
| Harvey ($11B) | Agentic legal research | LAB benchmark open-source; Claude Fable 5 lidera 14.2% all-pass |
| **Legora ($5.55B) + aOS** | Agentic OS end-to-end | **NUEVO v7** — Mayo 2026: Outlook→DMS→draft→blackline→reply autónomo; adquirió Walter AI |
| Thomson Reuters CoCounsel | Document review + Deep Research agéntico | Q1 2026, integrado en Westlaw |
| LexisNexis Protégé Work | Agentic layer + Shepard's Verify | Mayo 2026 |
| Enter (Brasil) | Mass litigation agent platform | Unicornio LATAM $100M mayo 2026; patrón replicable |
| RivoLegal (Argentina) | LegalTech integrado al sistema judicial argentino | Referencia local LATAM |
| HAQQ Legal OS | AI OS para despachos, MENA + civil law | Referencia jurisdicciones árabes y civil law |

## Capa de datos legales via MCP (nueva infraestructura 2026) — NUEVO v7

| Servicio MCP | Cobertura | Modelo | Cuándo usar |
|--------------|-----------|--------|------------|
| [Legal Data Hunter](https://legaldatahunter.com) | 108 países, 18.6M+ docs, 533 fuentes | Freemium | Investigación global; LATAM incluido |
| [FOLIO MCP](https://github.com/alea-institute/folio-mcp) | 18,000+ conceptos, EN/ES/FR/JA/ZH | MIT / gratis | Clasificación y enriquecimiento de documentos |
| [CourtListener MCP](https://free.law) | 8M+ opiniones EE.UU. + PACER | Apache-2.0 / gratis | Investigación jurisprudencial EE.UU. |
| [Vaquill US MCP](https://github.com/Vaquill-AI/awesome-legaltech) | 8M+ sentencias + US Code + CFR | Apache-2.0 | EE.UU. federal y estatal |
| [Vaquill India MCP](https://github.com/Vaquill-AI/awesome-legaltech) | 20M+ sentencias (Supremo, High Courts) | Freemium | India: tribunal y estatuto |
| [Korean Law MCP](https://github.com/chrisryugj/korean-law-mcp) | 41 APIs gobierno coreano + anti-hallucination | MIT | Patrón modelo para LATAM MCPs |
| [us-legal-mcp](https://github.com/JamesANZ/us-legal-mcp) | Congress bills + Federal Register + courts | MIT / gratis | US legislativo y regulatorio |
| [open-legal-compliance-mcp](https://github.com/TCoder920x/open-legal-compliance-mcp) | US compliance vía APIs gobierno | MIT / gratis | Startups/compliance sin presupuesto para APIs |

> **Nota Globant**: En julio 2026, un agente AI puede acceder a **108 países** de jurisprudencia vía una sola integración MCP. El diferenciador ya no es "tener los datos" — es **saber qué hacer con ellos** en el contexto jurisdiccional específico del cliente LATAM.

---

## Landscape LATAM — Plataformas por país

| País | Plataforma judicial | Gap actual | Solución recomendada |
|------|---------------------|-----------|---------------------|
| Brasil | PJe / e-SAJ (integración parcial) | Reforma tributaria IBS/CBS; volumen litigios masivos | Suzie Law fork + API PJe + Claude |
| Argentina | CEJAT / presentaciones electrónicas | 69% abogados sin software; 82.6M casos pendientes | OpenLawOffice fork + integración CEJAT |
| México | FIREL / e-JUICIO | Reforma judicial 2025; digitalización en curso | Docassemble + API SCJN + claude-for-legal |
| Colombia | Expediente Judicial Electrónico (EJE) | Gap en AI sobre EJE | Mike fork + integración EJE Colombia |
| Chile | IURIS / SINAM | Mayor adopción tech; falta LLM español jurídico | Suzie Law + fine-tune español jurídico |
