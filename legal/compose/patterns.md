# Patrones de composición — Legal Services AI

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Actualización: 2026-07-06

---

## Stack base recomendado

```
[Plataforma vertical: OpenContracts / OpenLawOffice / SuiteCRM]
          ↓
[Ingesta de documentos: PDF, DOCX, emails → chunks]
          ↓
[NLP pre-processing: LexNLP / Blackstone → entidades, fechas, partes]
          ↓
[Vector DB: Qdrant / pgvector / Chroma → embeddings]
          ↓
[Agente: Claude API (claude-sonnet-5) + MCP server OpenContracts]
          ↓
[Verificación: citation check + human gate (patrón lavern)]
          ↓
[UI: chat sobre plataforma base ó API para integración]
```

---

## Patrón 1: Contract Review Agent (4-6 semanas)

**Objetivo**: Automatizar primera pasada de revisión contractual — identificar cláusulas problemáticas, sugerir lenguaje alternativo, generar reporte de riesgo.

**Repos**:
- [OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) — DMS + MCP server + citation graph
- [lowtidebuild/contract-review-agent](https://github.com/lowtidebuild/contract-review-agent) — agente local-first de revisión
- LexNLP — pre-processing de entidades y cláusulas
- CUAD dataset — fine-tuning o few-shot examples para detección de cláusulas

**Wiring**:

```python
import anthropic
from opencontracts_mcp import OpenContractsMCPClient

client = anthropic.Anthropic()
mcp = OpenContractsMCPClient(base_url="http://localhost:8000")

# 1. Subir contrato a OpenContracts (indexa + vectoriza automáticamente)
doc_id = mcp.upload_document("contrato_proveedor.pdf")

# 2. Obtener annotation graph del contrato
annotations = mcp.get_annotations(doc_id)

# 3. Claude revisa con contexto del citation graph
response = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=4096,
    tools=mcp.get_tools(),  # buscar_clausulas, comparar_contratos, citar_precedente
    messages=[{
        "role": "user",
        "content": f"""Revisa el contrato {doc_id}. 
        Identifica: (1) cláusulas de indemnización con exposición ilimitada,
        (2) penalidades desproporcionadas, (3) ausencia de limitación de responsabilidad.
        Para cada hallazgo: cita el span exacto, el riesgo, y sugiere lenguaje alternativo.
        Basa tus hallazgos únicamente en el texto del contrato, sin supuestos externos."""
    }]
)

# 4. Human gate: abogado aprueba/modifica antes de entregar reporte
print(response.content)
```

**Costo estimado**: ~$0.01-0.05 por contrato de 10-30 páginas (Claude Sonnet 5)
**Reducción de tiempo**: 70-80% en primera pasada de revisión

---

## Patrón 2: RAG Legal Research Assistant (3-4 semanas)

**Objetivo**: Asistente de investigación jurídica sobre corpus indexado (jurisprudencia, doctrina, normativa).

**Repos**:
- [lawglance/lawglance](https://github.com/lawglance/lawglance) — arquitectura RAG base
- [Qdrant](https://github.com/qdrant/qdrant) — vector search (Apache-2.0)
- MCP servers jurisdiccionales (Korea/Germany/Taiwan como referencia, o construir LATAM)

**Wiring**:

```python
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance
import anthropic

# Setup
client = anthropic.Anthropic()
qdrant = QdrantClient(host="localhost", port=6333)

# 1. Indexar corpus (jurisprudencia, doctrina, normativa)
# Ver lawglance/lawglance para pipeline de ingesta

# 2. Consulta con retrieval
def legal_research(query: str, jurisdiction: str = "argentina") -> str:
    # Retrieval
    query_vector = embed(query)  # usar text-embedding-3-small o claude embeddings
    results = qdrant.search(
        collection_name=f"legal_{jurisdiction}",
        query_vector=query_vector,
        limit=8
    )
    
    context = "\n\n".join([r.payload["text"] for r in results])
    sources = [r.payload["source"] for r in results]
    
    # Generation con citation enforcement
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2048,
        system="""Sos un asistente de investigación jurídica.
        Respondé ÚNICAMENTE basándote en los documentos proporcionados.
        Citá siempre la fuente exacta (nombre del documento, sección, párrafo).
        Si la información no está en los documentos, decilo explícitamente.""",
        messages=[{
            "role": "user",
            "content": f"Documentos de referencia:\n{context}\n\nConsulta: {query}"
        }]
    )
    
    return response.content[0].text, sources
```

**LATAM quick-win**: indexar Boletín Oficial Argentina, DOF México, Diário Oficial Brasil → asistente de monitoreo regulatorio.

---

## Patrón 3: Agentic Law Firm (8-12 semanas)

**Objetivo**: Plataforma multi-agente completa, inspirada en lavern — múltiples agentes especializados con debate y human gates.

**Repos**:
- [AnttiHero/lavern](https://github.com/AnttiHero/lavern) — arquitectura de referencia (fork + customizar)
- [Open-Source-Legal/OpenContracts](https://github.com/Open-Source-Legal/OpenContracts) — DMS backend
- [willchen96/mike](https://github.com/willchen96/mike) — referencia de UI/UX y flujo completo
- [HazyResearch/legalbench](https://github.com/HazyResearch/legalbench) — eval suite

**Arquitectura**:

```
Orchestrator Agent (Claude Sonnet 5)
    │
    ├── Research Agent → RAG sobre corpus legal indexado
    ├── Draft Agent → generación de documentos desde templates
    ├── Review Agent → revisión de contratos (patrón 1)
    ├── Compliance Agent → chequeo contra normativa vigente
    └── Citation Verifier → verificación de toda cita antes de salida
           │
           └── [HUMAN GATE] → abogado aprueba antes de entrega final
```

**Implementación de Human Gate** (inspirado en lavern):

```python
from anthropic import Anthropic

def run_with_human_gate(task: str, risk_level: str = "high"):
    client = Anthropic()
    
    # Paso 1: Agentes analizan y proponen
    proposal = orchestrate_agents(client, task)
    
    # Paso 2: Si riesgo alto → human gate obligatorio
    if risk_level == "high":
        print(f"\n[HUMAN GATE] Propuesta del agente:\n{proposal}")
        approval = input("¿Aprobás esta acción? (s/n/modificar): ")
        
        if approval == "n":
            return "Acción cancelada por el usuario"
        elif approval == "modificar":
            modification = input("Ingresá tu modificación: ")
            return apply_modification(proposal, modification)
    
    return proposal
```

**Costo estimado**: $500-2000/mes para firma de 10-20 abogados con uso intensivo.

---

## Patrón 4: Multi-Jurisdiction MCP Server (LATAM) (6-10 semanas)

**Objetivo**: Construir MCP server propio para normativa LATAM (análogo a Korean Law MCP / German Law MCP).

**Repos base**:
- [Model Context Protocol SDK](https://github.com/modelcontextprotocol/python-sdk) — MIT
- Fuentes: Diário Oficial BR (dados.gov.br), DOF México API, BO Argentina

**Estructura del MCP server**:

```python
# latam_legal_mcp/server.py
from mcp.server import Server
from mcp.server.models import InitializationOptions
import mcp.types as types

app = Server("latam-legal")

@app.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    return [
        types.Tool(
            name="buscar_normativa",
            description="Busca normativa legal en Argentina, Brasil, México, Colombia, Chile, Perú",
            inputSchema={
                "type": "object",
                "properties": {
                    "pais": {"type": "string", "enum": ["AR", "BR", "MX", "CO", "CL", "PE"]},
                    "query": {"type": "string"},
                    "desde": {"type": "string", "description": "Fecha desde (YYYY-MM-DD)"},
                },
                "required": ["pais", "query"]
            }
        ),
        types.Tool(
            name="verificar_vigencia",
            description="Verifica si una norma está vigente o fue derogada",
            inputSchema={
                "type": "object",
                "properties": {
                    "pais": {"type": "string"},
                    "norma": {"type": "string", "description": "Número y tipo de norma"},
                },
                "required": ["pais", "norma"]
            }
        ),
        types.Tool(
            name="diff_temporal",
            description="Compara versiones de una norma en dos fechas distintas",
            inputSchema={
                "type": "object",
                "properties": {
                    "pais": {"type": "string"},
                    "norma": {"type": "string"},
                    "fecha_a": {"type": "string"},
                    "fecha_b": {"type": "string"},
                },
                "required": ["pais", "norma", "fecha_a", "fecha_b"]
            }
        )
    ]

@app.call_tool()
async def handle_call_tool(name: str, arguments: dict) -> list[types.TextContent]:
    if name == "buscar_normativa":
        results = await fetch_from_official_gazette(
            country=arguments["pais"],
            query=arguments["query"],
            since=arguments.get("desde")
        )
        return [types.TextContent(type="text", text=results)]
    # ... otros handlers
```

**Uso con Claude**:

```python
# Conectar MCP server a Claude
response = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=2048,
    tools=[{"type": "mcp", "server": "latam-legal"}],
    messages=[{"role": "user", "content": 
        "¿Qué cambios hubo en la normativa de protección de datos en Argentina y Brasil en 2026?"}]
)
```

---

## Patrón 5: SuiteCRM + AI Layer (Despacho Digital) (2-4 semanas)

**Objetivo**: Modernizar despacho con CRM open source + AI para automatizar comunicaciones, billing, y gestión de casos.

**Repos**:
- [salesagility/SuiteCRM](https://github.com/salesagility/SuiteCRM) — AGPL-3.0 (uso interno OK)
- n8n (fair-code) — automatización de workflows
- Claude API — drafting + summarization

**Flujos a automatizar**:

```
Nuevo caso entra (email/formulario)
  → n8n detecta → crea Case en SuiteCRM
  → Claude extrae: partes, tipo de caso, urgencia, jurisdicción
  → Asigna al abogado correcto (reglas configurable)
  → Draft email de bienvenida personalizado (Claude)
  → Crea carpeta de documentos + checklist de tareas

Vence un plazo en SuiteCRM
  → n8n detecta D-7 antes del vencimiento
  → Claude genera briefing del caso con contexto relevante
  → Envía notificación al abogado con acciones sugeridas

Cliente envía contrato para revisión
  → n8n recibe adjunto → llama a Patrón 1 (Contract Review Agent)
  → Reporte de riesgo adjuntado automáticamente al Case
  → Abogado revisa reporte + aprueba → envía al cliente
```

**Tiempo**: 2 semanas setup SuiteCRM + n8n, 2 semanas configurar flujos AI
**Costo infra**: ~$100-300/mes (VPS + API Claude)
**ROI**: 40-60% reducción en tareas administrativas por caso

---

## Tabla de selección rápida

| Necesidad del cliente | Patrón | Semanas | Costo/mes |
|-----------------------|--------|---------|-----------|
| Revisar contratos rápido | Patrón 1: Contract Review | 4-6 | $50-500 |
| Investigar jurisprudencia | Patrón 2: RAG Research | 3-4 | $100-300 |
| Plataforma legal completa | Patrón 3: Agentic Law Firm | 8-12 | $500-2000 |
| Monitoreo regulatorio LATAM | Patrón 4: MCP Server LATAM | 6-10 | $200-800 |
| Modernizar despacho | Patrón 5: SuiteCRM + AI | 2-4 | $100-300 |

---
*Ver también: `agents/top.md` para detalles de cada componente. `verticals/solutions.md` para plataformas base.*
