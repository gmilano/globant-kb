# 🧩 Patrones de composición — Legal Services AI

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-05

## Arquitectura base

```
[Plataforma vertical OSS]          docassemble / OpenContracts / EspoCRM
          ↓
[Capa NLP / extracción]            LexNLP / Blackstone → cláusulas, partes, fechas
          ↓
[Motor de razonamiento LLM]        Claude Sonnet 5 / Qwen3-235B / DeepSeek-R1
          ↓
[Orquestador de agentes]           LangGraph / lavern / dd-agents
          ↓
[Interfaz / API]                   MCP server / REST API / UI conversacional
```

---

## Receta 1: Agente de Revisión de Contratos (2–3 semanas)

**Objetivo**: Revisar contratos en español/inglés, detectar cláusulas de riesgo, generar redlines.

**Stack**:
- `OpenContracts` (MIT) — repositorio de documentos + anotación
- `LexNLP` (Apache-2.0) — extracción determinística de cláusulas, fechas, partes
- `claude-legal-skill` (MIT) — skill de revisión con CUAD risk detection
- `Claude Sonnet 5` — razonamiento y redacción de redlines

**Wiring**:
```python
from lexnlp.extract.en import clauses, dates, parties
from anthropic import Anthropic

# 1. Extraer entidades con LexNLP (determinístico, rápido)
entities = {
    "clauses": list(clauses.get_clauses(contract_text)),
    "dates": list(dates.get_dates(contract_text)),
    "parties": list(parties.get_parties(contract_text)),
}

# 2. Razonamiento sobre riesgo con Claude
client = Anthropic()
response = client.messages.create(
    model="claude-sonnet-5-20251101",
    max_tokens=4096,
    system="You are a contract review specialist. Identify high-risk clauses and suggest redlines.",
    messages=[{
        "role": "user",
        "content": f"Contract entities extracted:\n{entities}\n\nFull contract:\n{contract_text}"
    }]
)

# 3. Almacenar en OpenContracts con anotaciones
opencontracts.create_annotation(
    document_id=doc_id,
    label="risk_analysis",
    content=response.content[0].text,
    entities=entities
)
```

**Tiempo estimado**: 2–3 semanas  
**Para qué cliente**: Firmas medianas 20-100 abogados, departamentos de compras con contratos de proveedores

---

## Receta 2: Pipeline de Due Diligence M&A Multi-Agente (3–5 semanas)

**Objetivo**: Análisis automatizado de data room para M&A: legal, financiero, compliance, cyber, HR.

**Stack**:
- `lavern` (Apache-2.0) — 67 agentes especialistas con human gates
- `dd-agents` (Apache-2.0) — pipeline 38-step: Legal + Finance + Commercial + Cyber + HR + Tax + ESG
- `OpenContracts` (MIT) — ingesta y almacenamiento del data room
- `LangGraph` (MIT) — orquestación del grafo de agentes
- `DeepSeek-R1` o `Claude Sonnet 5` — razonamiento de alto nivel

**Arquitectura**:
```
Data Room (PDFs/DOCX)
    ↓ OpenContracts ingesta y vectoriza
    ↓ LangGraph coordina pipeline
    ├─ Agente Legal → clausulas, litigios, IP
    ├─ Agente Finance → estados financieros, deuda
    ├─ Agente Commercial → contratos clientes/proveedores
    ├─ Agente Cyber → contratos SLA, incidentes
    ├─ Agente HR → contratos clave, no-compete
    ├─ Agente Tax → estructura, exposición fiscal
    └─ Judge Agent → red flags consolidados + executive summary
         ↓ Human Gate (abogado senior revisa)
    → Informe final PDF
```

**Human gate** (EU AI Act compliant):
```python
@langgraph.node
def human_review_gate(state):
    """Mandatory human checkpoint before final report generation."""
    flagged = [f for f in state["findings"] if f["risk"] == "HIGH"]
    if flagged:
        notify_reviewer(flagged)
        state["status"] = "awaiting_human_review"
        return state
    return state
```

**Tiempo estimado**: 3–5 semanas  
**Para qué cliente**: Fondos de PE/VC, corporate legal departments, bancos de inversión con deal flow alto

---

## Receta 3: Portal de Acceso a Justicia con AI (4–6 semanas)

**Objetivo**: Portal de autoservicio legal para ciudadanos; formularios guiados + generación de documentos.

**Stack**:
- `docassemble` (MIT) — entrevistas guiadas, lógica condicional, generación de documentos
- `Claude Sonnet 5` / `Qwen3-235B` (Apache-2.0) — explicación de términos legales en lenguaje simple
- `LexNLP` (Apache-2.0) — análisis de documentos subidos por el ciudadano
- `EspoCRM` (MIT) — gestión de casos derivados a clínica jurídica

**Flujo**:
```
Ciudadano llega al portal
    → Chatbot AI (Claude) explica sus opciones en lenguaje llano
    → docassemble lanza entrevista guiada (preguntas condicionales)
    → Sistema genera documento (denuncia, demanda pequeña cuantía, etc.)
    → Si complejidad alta → derivar a abogado via EspoCRM
    → Seguimiento del caso en EspoCRM
```

**Casos de uso en LATAM**: Formularios de denuncia (México: FEPADE, PROFECO), demandas de pequeña cuantía (Brasil: Juizado Especial), solicitudes de acceso a información pública.

**Tiempo estimado**: 4–6 semanas  
**Para qué cliente**: Ministerios de Justicia, ONGs de acceso a justicia, colegios de abogados

---

## Receta 4: RAG Legal Corporativo con Búsqueda de Jurisprudencia (2–4 semanas)

**Objetivo**: Sistema de búsqueda semántica sobre base documental legal interna + jurisprudencia pública.

**Stack**:
- `OpenContracts` (MIT) — ingesta y anotación de documentos internos
- `LegalBench` + `legalbenchrag` (MIT) — evaluación continua del pipeline RAG
- `Qdrant` (Apache-2.0) — vector store para búsqueda semántica
- `LlamaIndex` (MIT) — orquestación del pipeline RAG
- `DeepSeek-R1` o `Qwen3-235B` — generación de respuestas

**Pipeline**:
```python
from llama_index.core import VectorStoreIndex, StorageContext
from llama_index.vector_stores.qdrant import QdrantVectorStore

storage_context = StorageContext.from_defaults(vector_store=QdrantVectorStore(...))
index = VectorStoreIndex.from_documents(legal_docs, storage_context=storage_context)

query_engine = index.as_query_engine(
    similarity_top_k=10,
    node_postprocessors=[LegalReranker()],
)
response = query_engine.query(
    "¿Cuál es la jurisprudencia aplicable a cláusulas de limitación de responsabilidad?"
)
```

**Evaluación con LegalBench-RAG**:
```bash
python legalbenchrag/evaluate.py --retriever qdrant --corpus contract_corpus --tasks clause_retrieval,case_citation
```

**Tiempo estimado**: 2–4 semanas  
**Para qué cliente**: Firmas grandes con archivos > 10k documentos, corporate legal con múltiples jurisdicciones

---

## Receta 5: Agente de Compliance EU AI Act para Servicios Legales (3–4 semanas)

**Objetivo**: Auditar sistemas AI usados por firmas legales para cumplir EU AI Act (agosto 2026).

**Stack**:
- `agentcounsel` (MIT) — skills AI para equipos legales
- `OpenContracts` (MIT) — repositorio de evidencias de human oversight
- `LangGraph` (MIT) — pipeline de auditoría
- `Claude Sonnet 5` — análisis de conformidad y generación de informes

**Checklist EU AI Act (high-risk AI en legal)**:
```
□ Sistema registrado en base de datos EU
□ Documentación técnica completa (Art. 11)
□ Gestión de riesgos documentada (Art. 9)
□ Human oversight mecanismo activo (Art. 14)
□ Transparencia hacia usuarios finales (Art. 13)
□ Logs de decisiones almacenados ≥ 6 meses
□ Accuracy y robustez validadas con LegalBench
```

**Tiempo estimado**: 3–4 semanas  
**Para qué cliente**: Cualquier firma EU o con clientes EU que use AI en servicios legales a partir de agosto 2026

---

## Receta 6: MCP Server Legal + Claude Desktop para Abogados (1–2 semanas)

**Objetivo**: Exponer base documental legal como MCP server para que abogados usen Claude Desktop.

**Stack**:
- `OpenContracts` MCP server (MIT) — expone contratos y anotaciones como MCP tools
- `uspto_fpd_mcp` (MIT) — patents y decisiones USPTO como MCP tools
- `Claude Desktop` — interfaz de chat con herramientas MCP conectadas

**Configuración** (~1 día):
```json
{
  "mcpServers": {
    "opencontracts": {
      "command": "python",
      "args": ["-m", "opencontracts.mcp_server"],
      "env": { "OPENCONTRACTS_URL": "https://contracts.firma.com/api" }
    },
    "uspto": {
      "command": "node",
      "args": ["uspto_fpd_mcp/dist/index.js"]
    }
  }
}
```

**Herramientas disponibles**:
- `search_contracts(query, date_range, party)` — búsqueda semántica en contratos
- `get_clause(document_id, clause_type)` — extracción de cláusula específica
- `compare_clauses(doc_a, doc_b, clause)` — comparación entre contratos
- `search_patent_decisions(query)` — decisiones USPTO sobre patentes

**Tiempo estimado**: 1–2 semanas (si OpenContracts ya está desplegado)  
**Para qué cliente**: Firmas que ya usen Claude Pro/Team; onboarding muy rápido sin desarrollo frontend

---

## Matriz de selección de patrón

| Necesidad del cliente | Receta | Tiempo | Complejidad |
|----------------------|--------|--------|-------------|
| Revisar contratos de proveedores | 1 — Contract Review Agent | 2–3 sem | Media |
| Due diligence para M&A / inversión | 2 — Due Diligence Multi-Agente | 3–5 sem | Alta |
| Portal de acceso a justicia público | 3 — Portal Ciudadano | 4–6 sem | Media |
| Búsqueda en archivo de contratos | 4 — RAG Legal Corporativo | 2–4 sem | Media |
| Cumplir EU AI Act agosto 2026 | 5 — Compliance Auditor | 3–4 sem | Media |
| Abogados usando Claude Desktop hoy | 6 — MCP Server Legal | 1–2 sem | Baja |
