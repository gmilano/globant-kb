# 🧩 Patrones de composición — Legal Services AI

> Recetas concretas para construir soluciones legales combinando repos + agentes + AI.
> Última actualización: 2026-07-11 (v10)

## Arquitectura base

```
[Plataforma vertical base (open source)]
          ↓
[Capa de integración AI / MCP]
          ↓
[Agentes especializados legales (skills + orquestación)]
          ↓
[UI conversacional / API / portal cliente]
```

---

## Patrón 1: Contract Review Agent (MVP en 1-2 días)

**Caso de uso**: Cliente legal quiere revisar contratos rápidamente, detectar cláusulas de riesgo, generar redlines.

**Stack**:
- [`claude-legal-skill`](https://github.com/evolsb/claude-legal-skill) — CUAD risk detection + redlines (MIT)
- [`ContractGuard`](https://github.com/he-yufeng/ContractGuard) — identificación de unfair terms (MIT)
- [`ai-legal-claude`](https://github.com/zubair-trabzada/ai-legal-claude) — 5 parallel agents (MIT)
- Claude API (claude-opus-4-8 / claude-sonnet-5)
- FastAPI backend + Streamlit/React frontend

**Flujo**:
```
PDF/DOCX upload
    → ContractGuard: extrae cláusulas, flags red flags
    → claude-legal-skill: CUAD 41-category risk analysis
    → ai-legal-claude: 5 parallel agents (compliance, IP, liability, privacy, commercial)
    → Claude: genera redlines + plain-English summary
    → Output: PDF/DOCX con marcas + reporte de riesgos
```

**Tiempo estimado**: 1-2 días para MVP  
**ROI cliente**: Revisión de contrato en 30 segundos vs 4-8 horas de associate  
**Costo build**: Bajo — todo MIT + Claude API  

---

## Patrón 2: Document Intelligence Platform (Enterprise)

**Caso de uso**: Bufete o legal department necesita corpus documental consultable, con citation graph, anotaciones humanas y agentes.

**Stack**:
- [`OpenContracts (cite)`](https://github.com/Open-Source-Legal/OpenContracts) — DMS con MCP server, annotation graph, GraphQL API (MIT, 1.4k ★)
- Claude via MCP (claude-sonnet-5 para queries, claude-opus-4-8 para análisis profundo)
- [`LegalBench-RAG`](https://github.com/ZeroEntropy-AI/legalbenchrag) — para evaluar calidad de retrieval (Apache-2.0)
- React frontend nativo de OpenContracts + customización

**Flujo**:
```
Documentos ingested → OpenContracts citation graph
    → Abogados anotan con label schema customizado
    → MCP server expone corpus a Claude/Cursor
    → Claude queries: "¿qué cláusulas de indemnización usamos en contratos con tech companies?"
    → Respuestas con citations verificables (LegalMD @cite format)
    → LegalBench-RAG evalúa calidad de retrieval en background
    → Audit trail completo de cada query + output
```

**Tiempo estimado**: 1-2 semanas para primera versión  
**ROI cliente**: Knowledge management: 10x más rápido localizar precedentes internos  
**Diferenciador**: MCP server nativo = integración con cualquier herramienta del abogado (Cursor, VS Code, Claude Desktop)

---

## Patrón 3: Agentic Law Firm (Multi-agent con Debate)

**Caso de uso**: Bufete quiere automatizar revisión completa de contratos complejos con múltiples especialistas y verificación.

**Stack**:
- [`lavern`](https://github.com/AnttiHero/lavern) — 67 specialist AI agents + debate pattern + mandatory human gates (Apache-2.0)
- Claude API (multi-agent con LangGraph)
- [`AgentCounsel`](https://github.com/zgbrenner/agentcounsel) — 198 legal skills SKILL.md para cada agente especialista (Apache-2.0)
- Human-in-the-loop interface (custom UI sobre lavern)

**Flujo**:
```
Contrato M&A complejo ingresa
    → lavern: asigna a 10-15 agentes especializados (IP, tax, employment, antitrust, etc.)
    → Cada agente usa AgentCounsel skills de su área de práctica
    → Evidence-backed debate: agentes presentan findings, los otros los cuestionan
    → 10-pass verification loop: output verificado 10 veces antes de salir
    → Human gate: abogado senior revisa summary + flags críticos
    → Reporte final: consolidated memo + cada hallazgo con evidencia
```

**Tiempo estimado**: 4-8 semanas  
**ROI cliente**: -70% tiempo de associate en due diligence; 0% hallazgos críticos perdidos  
**Riesgo**: Requiere calibración de los 67 agentes con datos del cliente  

---

## Patrón 4: Legal Intake + Document Automation

**Caso de uso**: Portal de acceso a la justicia, intake de clientes, generación de documentos legales automáticos.

**Stack**:
- [`Docassemble`](https://github.com/jhpyle/docassemble) — guided interview + document assembly (MIT, 1.2k ★)
- Claude API para análisis de respuestas y recomendaciones
- [`AgentCounsel`](https://github.com/zgbrenner/agentcounsel) — skills de área de práctica correspondiente (Apache-2.0)
- Docassemble Docker + PostgreSQL

**Flujo**:
```
Cliente responde guided interview (Docassemble)
    → Claude analiza respuestas: identifica tipo de caso, complejidad, jurisdicción
    → AgentCounsel: selecciona skills de práctica relevante
    → Docassemble genera documentos automáticamente (demanda, motion, contrato)
    → Claude: revisa coherencia + agrega recomendaciones en lenguaje llano
    → Output: documentos listos para firma + resumen para el abogado
```

**Tiempo estimado**: 2-4 semanas  
**Casos de uso fuertes**: Divorcios sin contención, small claims, arrendamiento, inmigración básica  
**ROI social**: Acceso a la justicia para población sin capacidad de pagar abogado  

---

## Patrón 5: Legal Research RAG Agent

**Caso de uso**: Abogados necesitan investigación jurisprudencial rápida con citaciones verificables.

**Stack**:
- [`CourtListener`](https://github.com/freelawproject/courtlistener) — 7M+ opiniones US + API (Apache-2.0, 967 ★)
- [`SCALES-OKN NLP`](https://github.com/scales-okn/scales-nlp) — clasificación de docket entries con 70+ labels (MIT)
- RAGFlow o Qdrant como vector store
- [`LegalBench`](https://github.com/HazyResearch/legalbench) — para validar calidad de respuestas (Apache-2.0)
- Claude API con citations mode
- [`nl-rag-qdrant-legal`](https://github.com/kjgdgch65g/nl-rag-qdrant-legal) — starter template (MIT)

**Flujo**:
```
Query: "precedentes sobre responsabilidad por cláusulas de limitación de daños en SaaS"
    → SCALES-OKN NLP: clasifica y pre-procesa dockets (70+ labels)
    → Búsqueda semántica en CourtListener corpus (RAGFlow/Qdrant)
    → Top-10 opiniones relevantes recuperadas
    → Claude: sintetiza razonamiento + extrae holdings
    → LegalBench: evalúa calidad de respuesta en background
    → Output: memo de investigación con @cite en formato LegalMD
```

**Tiempo estimado**: 1-2 semanas  
**ROI cliente**: 4 horas de investigación → 10 minutos  
**Adaptación LATAM**: Reemplazar CourtListener por corpus de jurisprudencia local (ej. CSJN Argentina, STF Brasil)

---

## Patrón 6: Legal AI Compliance Audit (LATAM)

**Caso de uso**: Empresa multinacional necesita analizar impacto de Reforma Tributaria Brasil o cambios regulatorios LATAM con AI.

**Stack**:
- Claude API (claude-opus-4-8 para análisis profundo)
- [`AgentCounsel`](https://github.com/zgbrenner/agentcounsel) — skills de Tax + Regulatory (Apache-2.0)
- RAGFlow con corpus de normas locales (SEFAZ, SRF, regulaciones LATAM)
- Inspirado en: `Consultor-Tributario-AI` pattern (análisis Reforma Tributaria Brasil)

**Flujo**:
```
Pregunta: "¿Qué impacto tiene la implementación IBS/CBS en nuestras operaciones en Brasil?"
    → RAGFlow recupera normativa relevante (IBS, CBS, transición, DRT)
    → AgentCounsel tax skills analizan impacto por tipo de transacción
    → Claude: genera análisis de impacto + recomendaciones de acción
    → Output: reporte ejecutivo + action items para equipo legal/financiero
```

**Tiempo estimado**: 1-2 semanas  
**Mercado**: Brasil Q4 2026 — implementación gradual reforma tributaria  
**Ventaja Globant**: Presencia local + expertise regulatorio + AI Studios  

---

## Patrón 7: CLM Agéntico Full-Cycle (v10 nuevo)

**Caso de uso**: Corporate legal department quiere agentes que gestionen el ciclo completo de contratos — de solicitud a archivo — con mínima intervención humana en contratos estándar.

**Stack**:
- [`OpenContracts (cite)`](https://github.com/Open-Source-Legal/OpenContracts) — DMS + MCP server como repositorio central (MIT)
- [`lavern`](https://github.com/AnttiHero/lavern) — orquestación multi-agente + human gates (Apache-2.0)
- [`claude-legal-skill`](https://github.com/evolsb/claude-legal-skill) — CUAD risk detection + redlines (MIT)
- [`AgentCounsel`](https://github.com/zgbrenner/agentcounsel) — skills de contract management (Apache-2.0)
- Referencia comercial: patrón Ironclad agéntico (archive agent + intake agent + redlining agent + search)
- Claude API (claude-sonnet-5 para routing/clasificación, claude-opus-4-8 para negociación/redlines)

**Flujo**:
```
Solicitud de contrato entrante (email/form)
    → Intake agent: clasifica tipo (NDA, MSA, SOW, PO), extrae partes, jurisdicción
    → Archive agent: busca contratos previos similares en OpenContracts como precedentes
    → Redlining agent: claude-legal-skill + AgentCounsel comparan con playbook + generan redlines
    → [Standard contract]: enviar automáticamente con redlines
    → [Complex contract]: human gate — abogado senior revisa redlines + firma
    → Archive: versión firmada ingresada a OpenContracts con metadata + citations
    → Búsqueda conversacional: "¿cuántos contratos activos con cláusula X expiran en Q3?"
```

**Tiempo estimado**: 4-6 semanas  
**ROI cliente**: -80% tiempo de handling en contratos estándar (NDA, POs simples); abogados se enfocan en contratos complejos  
**Diferenciador Globant**: El mismo patrón que Ironclad cobra como SaaS, Globant lo entrega como SI sobre OpenContracts (open source) a medida  

---

## Patrón 8: Jurisdicción Internacional — Multi-MCP Legal Agent (v10 nuevo)

**Caso de uso**: Empresa multinacional necesita research legal en múltiples jurisdicciones simultáneamente (EE.UU., Alemania, Indonesia, Corea, etc.).

**Stack**:
- [`OpenContracts (cite)`](https://github.com/Open-Source-Legal/OpenContracts) — corpus central + MCP server (MIT)
- MCP servers jurisdiccionales (conectados en paralelo):
  - [uspto_fpd_mcp](https://github.com/Tam1379/uspto_fpd_mcp) — USPTO patents (MIT)
  - [ayunis-legal-mcp](https://github.com/ayunis/ayunis-legal-mcp) — German BGB/HGB (MIT)
  - Pasal MCP — 40,000+ regulaciones indonesias (MIT)
  - Korean Law MCP — 41 government APIs (MIT)
  - [`CourtListener`](https://github.com/freelawproject/courtlistener) — US case law (Apache-2.0)
- Claude API con multi-tool use (un query, múltiples jurisdicciones en paralelo)
- [`Nomos`](https://github.com/nomos-legal/nomos) — para codificar reglas transfronterizas como lógica formal (Apache-2.0)

**Flujo**:
```
Query: "¿Puede nuestra empresa usar datos de clientes de esta forma bajo GDPR, US privacy law e Indonesian PDP?"
    → Router agent: identifica jurisdicciones relevantes
    → Parallel MCP calls: German law MCP (GDPR), CourtListener (US), Pasal MCP (Indonesia)
    → Cada MCP devuelve normas relevantes + casos aplicables
    → Nomos: codifica reglas interseccionadas como defeasible logic
    → Claude: sintetiza análisis comparativo con citations verificables por jurisdicción
    → Output: memo comparativo con recomendaciones jurisdicción por jurisdicción
```

**Tiempo estimado**: 3-5 semanas  
**ROI cliente**: Research cross-jurisdictional de semanas → horas  
**Ventaja Globant**: El mismo patrón permite construir adaptadores MCP para jurisdicciones LATAM que aún no existen (Argentina, Colombia, México) — IP propio  

---

*Ver: `agents/top.md` para el inventario completo de agentes, `repos/foundations.md` para repos base. v10.*
