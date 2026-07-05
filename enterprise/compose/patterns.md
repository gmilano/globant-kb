# 🧩 Patrones de composición — Enterprise

> Recetas concretas para construir soluciones enterprise combinando repos + agentes + AI.
> Cada receta nombra repos específicos, cómo cablearlos, y el esfuerzo estimado.
> Última actualización: 2026-07-05

## Arquitectura base

```
[Plataforma vertical (Odoo / ERPNext / SuiteCRM)]
              ↓  API REST / XML-RPC / MCP
[Capa de integración (LangChain Tools / MCP Server)]
              ↓
[Orquestador de agentes (LangGraph / CrewAI)]
              ↓  LLM calls
[Modelo (Claude API / Azure OpenAI / Llama local)]
              ↓
[UI conversacional (Dify / Streamlit / custom)]
```

---

## Receta 1: ERP Conversacional — "Pregúntale a tu Odoo"

**Objetivo**: Chatbot empresarial que responde preguntas en lenguaje natural sobre el estado del negocio y ejecuta acciones en Odoo.

**Stack**:
- Base ERP: [odoo/odoo](https://github.com/odoo/odoo) — LGPL-3.0, 52.8k★
- Orquestador: [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — MIT, 13k★
- UI: [langgenius/dify](https://github.com/langgenius/dify) — Apache 2.0, 138k★
- LLM: Claude API (claude-sonnet-5) via Anthropic SDK

**Arquitectura**:
```
Usuario → Dify chatbot
              ↓
        LangGraph Agent
        ├── Tool: odoo_search_orders(partner, date_range)
        ├── Tool: odoo_get_stock_level(product_id)
        ├── Tool: odoo_create_po(vendor, lines)
        └── Tool: odoo_approve_invoice(invoice_id)
              ↓
        Odoo XML-RPC / REST API
```

**Código clave**:
```python
import xmlrpc.client
from langchain_core.tools import tool
from langgraph.prebuilt import create_react_agent
import anthropic

# Conexión Odoo
url = "https://mycompany.odoo.com"
db, uid = "mydb", authenticate(url, user, password)
models = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/object")

@tool
def get_pending_invoices(limit: int = 10) -> list:
    """Obtiene facturas pendientes de aprobación en Odoo"""
    return models.execute_kw(db, uid, pwd, 'account.move', 'search_read',
        [[['state', '=', 'posted'], ['payment_state', '=', 'not_paid']]],
        {'fields': ['name', 'partner_id', 'amount_total', 'invoice_date_due'], 'limit': limit})

@tool
def approve_invoice(invoice_id: int) -> bool:
    """Aprueba y registra el pago de una factura en Odoo"""
    # Requiere human-in-the-loop approval en LangGraph
    return models.execute_kw(db, uid, pwd, 'account.move', 'action_register_payment', [[invoice_id]])

# Agente con human-in-the-loop para acciones destructivas
from langgraph.checkpoint.memory import MemorySaver
graph = create_react_agent(
    model="claude-sonnet-5",
    tools=[get_pending_invoices, approve_invoice],
    checkpointer=MemorySaver(),
    interrupt_before=["approve_invoice"]  # pausa para confirmación humana
)
```

**Esfuerzo**: 3-4 semanas | **Equipo**: 2 desarrolladores Python

---

## Receta 2: Agente de Gobernanza de Datos — "Data Steward AI"

**Objetivo**: Agente que monitorea la calidad de datos en el data warehouse, detecta anomalías, y propone correcciones automáticamente.

**Stack**:
- Catálogo: [open-metadata/OpenMetadata](https://github.com/open-metadata/OpenMetadata) — Apache 2.0, 8k★
- Linaje: [datahub-project/datahub](https://github.com/datahub-project/datahub) — Apache 2.0, 11k★
- Orquestador: [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — MIT
- Calidad: Great Expectations / Soda Core — Apache 2.0
- LLM: Claude API (claude-sonnet-5)

**Arquitectura**:
```
[OpenMetadata — catálogo de activos]
        ↓ polling cada hora
[Data Steward Agent (LangGraph)]
├── Tool: openmetadata_get_quality_issues()
├── Tool: datahub_get_lineage(dataset)
├── Tool: run_great_expectations_suite(suite)
├── Tool: openmetadata_create_task(issue)
└── Tool: notify_data_owner(owner, issue)
        ↓
[Claude API — análisis y recomendación]
        ↓
[Slack / Email — notificación al data owner]
```

**Código clave**:
```python
from metadata.ingestion.ometa.ometa_api import OpenMetadata
from metadata.generated.schema.entity.services.connections.metadata.openMetadataConnection import OpenMetadataConnection

# Conectar OpenMetadata
connection = OpenMetadataConnection(hostPort="http://openmetadata:8585/api")
client = OpenMetadata(connection)

@tool
def get_tables_with_quality_issues(min_severity: str = "high") -> list:
    """Obtiene tablas con problemas de calidad de datos en OpenMetadata"""
    tables = client.list_entities(entity=Table)
    return [t for t in tables if t.dataQuality and t.dataQuality.failed > 0]

@tool  
def get_upstream_lineage(table_fqn: str) -> dict:
    """Obtiene el lineage upstream de una tabla en DataHub"""
    # DataHub GraphQL API
    return datahub_client.get_lineage(table_fqn, direction="upstream")
```

**Esfuerzo**: 4-5 semanas | **Equipo**: 2 devs (1 data engineer + 1 AI engineer)

---

## Receta 3: Pipeline Multi-Agente de Ventas — Lead-to-Cash

**Objetivo**: Pipeline de ventas completamente agéntico: califica leads, genera propuestas, actualiza CRM, agenda follow-ups — sin intervención humana para deals < $10k.

**Stack**:
- CRM: [salesagility/SuiteCRM](https://github.com/salesagility/SuiteCRM) — AGPL, 4.5k★ (o Odoo CRM)
- Orquestador: [crewAI-Inc/crewAI](https://github.com/crewAI-Inc/crewAI) — MIT, 45k★
- Automatización: [n8n-io/n8n](https://github.com/n8n-io/n8n) — Sustainable Use, 50k★
- LLM: Claude API (claude-sonnet-5)

**Arquitectura**:
```
[Lead entra (web form / email / LinkedIn)]
        ↓ n8n webhook
[CrewAI Lead Pipeline]
├── Agent: Lead Qualifier
│   ├── Tool: enrich_lead_data(email)    # Hunter.io / Apollo
│   ├── Tool: score_icp_fit(company)     # Reglas configurables
│   └── Tool: update_crm_score(lead_id)
├── Agent: Proposal Generator
│   ├── Tool: get_company_profile(domain)
│   ├── Tool: get_similar_deals(industry)
│   └── Tool: generate_proposal(context)  # Claude claude-sonnet-5
└── Agent: CRM Updater
    ├── Tool: suitecrm_create_opportunity(data)
    ├── Tool: suitecrm_schedule_activity(opp_id, date)
    └── Tool: send_proposal_email(contact, pdf)
```

**Código clave**:
```python
from crewai import Agent, Task, Crew
import anthropic

claude = anthropic.Anthropic()

lead_qualifier = Agent(
    role="Lead Qualification Specialist",
    goal="Evalúa si el lead cumple el perfil de cliente ideal (ICP)",
    backstory="Experto en ventas B2B con 10 años de experiencia en SaaS enterprise",
    tools=[enrich_lead_tool, score_icp_tool, crm_update_tool],
    llm="claude-sonnet-5"
)

proposal_writer = Agent(
    role="Enterprise Proposal Writer",
    goal="Genera propuestas personalizadas que convierten leads en oportunidades",
    tools=[get_company_profile_tool, get_similar_deals_tool, generate_pdf_tool],
    llm="claude-sonnet-5"
)

qualify_task = Task(
    description="Analiza el lead {lead_data} y determina ICP fit score (0-100)",
    agent=lead_qualifier,
    expected_output="JSON con icp_score, qualification_notes, recommended_action"
)

proposal_task = Task(
    description="Genera propuesta de valor personalizada para {company_name} en industria {industry}",
    agent=proposal_writer,
    context=[qualify_task]
)

crew = Crew(agents=[lead_qualifier, proposal_writer], tasks=[qualify_task, proposal_task])
```

**Esfuerzo**: 4-6 semanas | **Equipo**: 2 devs + 1 sales ops

---

## Receta 4: Automatización de Procesos Documentales — "Document Intelligence"

**Objetivo**: Agente que procesa documentos empresariales (facturas, contratos, RFPs, informes) extrayendo datos estructurados, validándolos, y ejecutando acciones en sistemas backend.

**Stack**:
- Flujos: [n8n-io/n8n](https://github.com/n8n-io/n8n) — Sustainable Use, 50k★
- RAG + UI: [langgenius/dify](https://github.com/langgenius/dify) — Apache 2.0, 138k★
- Orquestador: [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — MIT
- OCR: PaddleOCR (Apache 2.0) o Tesseract (Apache 2.0)
- ERP destino: Odoo / ERPNext
- LLM: Claude API claude-sonnet-5 (excelente para extracción estructurada)

**Arquitectura**:
```
[Documento entra: email, S3, SharePoint]
        ↓ n8n trigger
[Document Intelligence Agent (LangGraph)]
├── Node: classify_document(content)       # factura / contrato / RFP
├── Node: extract_structured_data(doc)     # Claude claude-sonnet-5 JSON mode
├── Node: validate_against_master(data)    # valida vendor, PO, monto
├── Node: human_review_checkpoint()        # pausa si confianza < 90%
└── Node: post_to_erp(validated_data)      # Odoo / ERPNext
        ↓
[Resultado: ERP actualizado + documento archivado]
```

**Código clave**:
```python
import anthropic

client = anthropic.Anthropic()

def extract_invoice_data(pdf_text: str) -> dict:
    """Extrae datos estructurados de una factura usando Claude"""
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": f"""Extrae los siguientes campos de esta factura en JSON:
            - vendor_name, vendor_tax_id, invoice_number, invoice_date
            - due_date, subtotal, tax_amount, total_amount
            - line_items: [{description, quantity, unit_price, total}]
            
            Factura:
            {pdf_text}
            
            Responde SOLO con JSON válido."""
        }]
    )
    return json.loads(response.content[0].text)

# LangGraph con human checkpoint
from langgraph.types import interrupt

def human_review_node(state):
    confidence = state["confidence_score"]
    if confidence < 0.9:
        # Pausa el flujo — un humano revisa en dashboard
        human_decision = interrupt({
            "type": "invoice_review",
            "data": state["extracted_data"],
            "confidence": confidence
        })
        return {"validated_data": human_decision["approved_data"]}
    return {"validated_data": state["extracted_data"]}
```

**Esfuerzo**: 5-6 semanas | **Equipo**: 2 devs + 1 QA

---

## Receta 5: IT Operations Agent — "AIOps para Enterprise"

**Objetivo**: Agente que monitorea infraestructura, diagnostica incidentes automáticamente, y toma acciones correctivas para problemas conocidos.

**Stack**:
- Framework: [microsoft/semantic-kernel](https://github.com/microsoft/semantic-kernel) — MIT, 27k★
- Automatización: [n8n-io/n8n](https://github.com/n8n-io/n8n) — Sustainable Use
- Observabilidad: Prometheus + Grafana (Apache 2.0)
- Ticketing: Jira / ServiceNow via API
- LLM: Azure OpenAI (claude-sonnet-5 si stacks no-Microsoft) | claude-sonnet-5 opcional

**Arquitectura**:
```
[Prometheus alertas / logs / métricas]
        ↓ webhook → n8n
[IT Ops Agent (Semantic Kernel)]
├── Plugin: InfraPlugin
│   ├── GetAlerts(severity, service)
│   ├── GetLogs(service, time_range)
│   └── GetMetrics(host, metrics)
├── Plugin: RemediationPlugin
│   ├── RestartService(service_name)
│   ├── ScaleDeployment(deployment, replicas)
│   └── FlushCache(service)
└── Plugin: TicketingPlugin
    ├── CreateIncident(title, severity, description)
    ├── UpdateIncident(incident_id, note)
    └── ResolveIncident(incident_id, resolution)
```

**Código clave (C# / Semantic Kernel)**:
```csharp
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;

var kernel = Kernel.CreateBuilder()
    .AddAzureOpenAIChatCompletion(deploymentName, endpoint, apiKey)
    .Build();

kernel.ImportPluginFromType<InfraPlugin>();
kernel.ImportPluginFromType<RemediationPlugin>();
kernel.ImportPluginFromType<TicketingPlugin>();

var agent = new ChatCompletionAgent
{
    Name = "ITOpsAgent",
    Instructions = """
        Eres un ingeniero de SRE senior. Cuando recibas una alerta:
        1. Analiza los logs y métricas del servicio afectado
        2. Diagnostica la causa raíz
        3. Para problemas conocidos (OOM, disco lleno, CPU spike): ejecuta remediación directa
        4. Para problemas desconocidos: crea un incidente P1 y escala al equipo
        Siempre documenta tus acciones en el ticket.
    """,
    Kernel = kernel
};
```

**Esfuerzo**: 6-8 semanas | **Equipo**: 2 devs + 1 SRE

---

## Receta 6: Knowledge Base Agéntica — "Enterprise Brain"

**Objetivo**: RAG enterprise sobre toda la documentación de la empresa (políticas, procedimientos, contratos, reportes), accesible via chatbot con respuestas citadas y verificadas.

**Stack**:
- RAG + UI: [langgenius/dify](https://github.com/langgenius/dify) — Apache 2.0, 138k★
- Catálogo de datos: [open-metadata/OpenMetadata](https://github.com/open-metadata/OpenMetadata) — Apache 2.0
- Vector DB: Qdrant (Apache 2.0) o Weaviate (BSD)
- Fuentes: SharePoint / Google Drive / Confluence via n8n connectors
- LLM: Claude API (claude-sonnet-5) — mejor en documentos largos y razonamiento

**Arquitectura**:
```
[Fuentes: SharePoint, Confluence, Notion, GDrive]
        ↓ n8n sync (cada 6h)
[Dify Knowledge Base]
├── Chunking: semantic chunks 512 tokens
├── Embedding: text-embedding-3-large
└── Index: Qdrant vector store
        ↓
[Dify Chatbot con RAG]
├── Query → Hybrid search (vector + BM25)
├── Reranking → Cohere Rerank / BGE
├── Generation → Claude claude-sonnet-5
└── Citation → Referencias a documentos fuente
        ↓
[UI: Dify web app / Slack bot / Teams bot]
```

**Configuración Dify**:
```yaml
# dify/docker-compose.yaml (self-hosted)
# Agregar en Dataset settings:
retrieval_model:
  search_method: hybrid_search
  reranking_enable: true
  reranking_model: BAAI/bge-reranker-v2-m3  # open source
  top_k: 5
  score_threshold: 0.5

# Model: claude-sonnet-5 via Anthropic provider
# System prompt: "Responde SOLO con información de los documentos. Cita la fuente."
```

**Esfuerzo**: 2-3 semanas (MVP) | **Equipo**: 1 dev + 1 knowledge manager

---

## Comparativa de recetas

| Receta | Caso de uso | Dificultad | Esfuerzo | Stack principal |
|--------|-------------|------------|----------|-----------------|
| 1. ERP Conversacional | Consultas y acciones en Odoo | Media | 3-4 sem | LangGraph + Odoo |
| 2. Data Governance | Calidad de datos automatizada | Alta | 4-5 sem | OpenMetadata + LangGraph |
| 3. Lead-to-Cash | Pipeline de ventas agéntico | Media | 4-6 sem | CrewAI + SuiteCRM |
| 4. Document Intelligence | Extracción y procesamiento docs | Media-Alta | 5-6 sem | n8n + Dify + LangGraph |
| 5. IT Ops Agent | AIOps, auto-remediación | Alta | 6-8 sem | Semantic Kernel + n8n |
| 6. Enterprise Brain | Knowledge base RAG | Baja-Media | 2-3 sem | Dify + Qdrant |
