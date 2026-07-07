# 🧩 Patrones de composición — Healthcare AI

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-07 (v2 — patrones con código)

## Arquitectura base

```
[EHR Open Source (OpenMRS / OpenEMR / Bahmni)]
          ↓ FHIR R4 API
[FHIR MCP Server (the-momentum/fhir-mcp-server)]
          ↓ Model Context Protocol
[Agente AI (openmed-agent / Claude / LangGraph)]
          ↓ NLP / Reasoning / Imágenes
[Herramientas especializadas (medspaCy / torchio / cTAKES)]
          ↓
[UI conversacional / API REST para el cliente]
```

---

## Patrón 1: Ambient AI Scribe (Transcripción → Nota Clínica → EHR)

**Caso de uso**: Reducir 2-4h de carga administrativa diaria por médico; auto-generar notas SOAP.

**Repos**: `openai/whisper` + `biocypher/biochatter` + `the-momentum/fhir-mcp-server` + `openemr/openemr`

**Flujo**:
```
Consulta médico-paciente (audio)
    ↓ Whisper (transcripción ASR local)
Transcript de texto
    ↓ LLM (Claude claude-sonnet-5 o GPT-4o)
Nota SOAP estructurada
    ↓ fhir-mcp-server (write Patient/Encounter/Observation FHIR)
OpenEMR / OpenMRS actualizado automáticamente
```

**Código mínimo (Python)**:
```python
import whisper
import anthropic
import requests

# 1. Transcribir audio
model = whisper.load_model("base")
result = model.transcribe("consulta.mp3")
transcript = result["text"]

# 2. Generar nota SOAP con Claude
client = anthropic.Anthropic()
message = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": f"""Eres un asistente médico clínico. Genera una nota SOAP estructurada 
        a partir de esta transcripción de consulta médica:
        
        {transcript}
        
        Formato: Subjetivo, Objetivo, Análisis, Plan. Incluye ICD-10 codes cuando aplique."""
    }]
)
soap_note = message.content[0].text

# 3. Escribir en EHR via FHIR MCP
headers = {"Content-Type": "application/fhir+json"}
encounter = {
    "resourceType": "Encounter",
    "status": "finished",
    "text": {"status": "generated", "div": f"<div>{soap_note}</div>"}
}
requests.post("http://fhir-server:8080/fhir/Encounter",
              json=encounter, headers=headers)
```

**Time-to-value**: 4-6 semanas. **ROI**: 2-4h médico/día ahorradas.

---

## Patrón 2: Prior Authorization Agent (Revenue Cycle Automation)

**Caso de uso**: Automatizar 30-60% de solicitudes de prior authorization con aseguradoras.

**Repos**: `openmed-labs/openmed-agent` + `the-momentum/fhir-mcp-server` + `apache/ctakes`

**Flujo**:
```
Solicitud de PA (diagnóstico + procedimiento + datos del paciente)
    ↓ cTAKES (extrae ICD-10 + CPT de notas clínicas)
Códigos estructurados + criterios del plan de salud
    ↓ openmed-agent (evalúa criteria: medical necessity, coverage)
Decisión con justificación clínica + documentación de apoyo
    ↓ Submission automática vía FHIR Coverage/Claim resource
```

**Código mínimo (Python)**:
```python
from anthropic import Anthropic

client = Anthropic()
tools = [
    {
        "name": "check_coverage_criteria",
        "description": "Verifica criterios de cobertura de aseguradora para procedimiento",
        "input_schema": {
            "type": "object",
            "properties": {
                "icd10_codes": {"type": "array", "items": {"type": "string"}},
                "cpt_codes": {"type": "array", "items": {"type": "string"}},
                "payer": {"type": "string"}
            },
            "required": ["icd10_codes", "cpt_codes", "payer"]
        }
    },
    {
        "name": "submit_prior_auth_fhir",
        "description": "Envía solicitud de prior auth via FHIR ClaimResponse",
        "input_schema": {
            "type": "object",
            "properties": {
                "patient_id": {"type": "string"},
                "claim_data": {"type": "object"}
            },
            "required": ["patient_id", "claim_data"]
        }
    }
]

response = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=2048,
    tools=tools,
    messages=[{
        "role": "user",
        "content": """Paciente: J. González, 55 años, DM2 (E11.9).
        Procedimiento solicitado: Continuous Glucose Monitor (CPT 95249).
        Aseguradora: BlueCross LATAM Plan Premium.
        Evalúa la solicitud de prior authorization y envíala."""
    }]
)
```

**Time-to-value**: 6-8 semanas. **ROI**: 30-60% reducción en tiempo de PA, reducción de denials.

---

## Patrón 3: CDSS Multi-Agente (Clinical Decision Support System)

**Caso de uso**: Diagnóstico diferencial + recomendaciones basadas en evidencia para médicos.

**Repos**: `SayamAlt/Healthcare-AI-CDSS-LangGraph` + `the-momentum/fhir-mcp-server` + `medspacy/medspacy`

**Flujo**:
```
Datos del paciente (EHR FHIR) + síntomas del médico (texto)
    ↓ medspaCy (NER: síntomas, medicamentos, antecedentes)
Entidades clínicas estructuradas
    ↓ LangGraph StateGraph (paralelo):
        Agent 1: Diagnósticos diferenciales (ICD-10)
        Agent 2: Drug interactions check (OpenFDA API)
        Agent 3: Evidencia PubMed (RAG sobre 35M papers)
    ↓ Synthesis agent: recomendación final con referencias
Output: diagnósticos + tratamiento + evidencia + alertas
```

**Código mínimo (Python con LangGraph)**:
```python
from langgraph.graph import StateGraph, END
from typing import TypedDict, List
import anthropic

class ClinicalState(TypedDict):
    patient_data: str
    entities: List[str]
    differentials: List[str]
    drug_warnings: List[str]
    evidence: List[str]
    recommendation: str

def extract_entities(state: ClinicalState) -> ClinicalState:
    import medspacy
    nlp = medspacy.load()
    doc = nlp(state["patient_data"])
    entities = [f"{e.text} ({e.label_})" for e in doc.ents]
    return {**state, "entities": entities}

def generate_differentials(state: ClinicalState) -> ClinicalState:
    client = anthropic.Anthropic()
    msg = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        messages=[{"role": "user", "content":
            f"Entidades clínicas: {state['entities']}\n"
            "Lista los 5 diagnósticos diferenciales más probables con ICD-10."}]
    )
    return {**state, "differentials": [msg.content[0].text]}

def synthesize_recommendation(state: ClinicalState) -> ClinicalState:
    client = anthropic.Anthropic()
    msg = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2048,
        messages=[{"role": "user", "content":
            f"Diferenciales: {state['differentials']}\n"
            f"Alertas de fármacos: {state['drug_warnings']}\n"
            f"Evidencia PubMed: {state['evidence']}\n"
            "Genera recomendación clínica final con referencias."}]
    )
    return {**state, "recommendation": msg.content[0].text}

workflow = StateGraph(ClinicalState)
workflow.add_node("extract", extract_entities)
workflow.add_node("differentials", generate_differentials)
workflow.add_node("synthesize", synthesize_recommendation)
workflow.add_edge("extract", "differentials")
workflow.add_edge("differentials", "synthesize")
workflow.add_edge("synthesize", END)
workflow.set_entry_point("extract")
cdss = workflow.compile()
```

**Time-to-value**: 8-12 semanas. **ROI**: Reducción errores diagnósticos; reducción tiempo decisión clínica.

---

## Patrón 4: EHR AI Nativo con OpenMRS + FHIR MCP

**Caso de uso**: Hospital LATAM necesita EHR con capa AI; budget limitado; LGPD compliance.

**Repos**: `openmrs/openmrs-core` + `the-momentum/fhir-mcp-server` + `maziyarpanahi/openmed` (local)

**Arquitectura Docker Compose**:
```yaml
version: "3.9"
services:
  openmrs:
    image: openmrs/openmrs-reference-application-3-distro:nightly
    ports: ["8080:8080"]
    environment:
      DB_HOST: mysql
      DB_DATABASE: openmrs
    depends_on: [mysql]

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: openmrs

  fhir-mcp-server:
    image: themomentum/fhir-mcp-server:latest
    environment:
      FHIR_BASE_URL: http://openmrs:8080/openmrs/ws/fhir2/R4
    ports: ["3000:3000"]

  openmed-local:
    image: maziyarpanahi/openmed:latest
    environment:
      FHIR_MCP_URL: http://fhir-mcp-server:3000
    ports: ["8501:8501"]
```

**Costo estimado**: $0 licencias + infra cloud (~$500-2000/mes para hospital mediano)

---

## Patrón 5: Medical Imaging AI Pipeline (Radiología)

**Caso de uso**: Pre-análisis de imágenes médicas (chest X-ray, MRI) antes de revisión radiológica.

**Repos**: `TorchIO-project/torchio` + `microsoft/hi-ml` + `souvikmajumder26/Multi-Agent-Medical-Assistant`

**Flujo**:
```python
import torchio as tio
import torch
from anthropic import Anthropic

subject = tio.Subject(mri=tio.ScalarImage("patient_brain.nii.gz"))
transform = tio.Compose([
    tio.RescaleIntensity(out_min_max=(0, 1)),
    tio.CropOrPad((256, 256, 64)),
])
preprocessed = transform(subject)

model = torch.load("radiology_model.pt")
with torch.no_grad():
    prediction = model(preprocessed.mri.data.unsqueeze(0))
    anomaly_score = prediction.sigmoid().item()

if anomaly_score > 0.5:
    client = Anthropic()
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        messages=[{"role": "user", "content":
            f"Imagen médica cerebral. Score de anomalía: {anomaly_score:.2f}. "
            "Describe los hallazgos potenciales para revisión radiológica. "
            "Incluye nota: 'Requiere confirmación por radiólogo certificado.'"}]
    )
    print(response.content[0].text)
```

**Time-to-value**: 10-16 semanas (incluye validación clínica). **ROI**: Priorización de casos urgentes.

---

## Patrón 6: Drug Discovery / Research Assistant (BioChatter + Knowledge Graph)

**Caso de uso**: Investigadores de farmacología / laboratorios buscando candidatos a fármacos.

**Repos**: `biocypher/biochatter` + `biocypher/biocypher` + Neo4j + LLM local (Ollama)

**Flujo**:
```
Base de conocimiento biomédico (PubMed + UniProt + DrugBank + ClinicalTrials)
    ↓ BioCypher → Knowledge Graph (Neo4j)
Grafo: genes ↔ enfermedades ↔ proteínas ↔ compuestos ↔ trials
    ↓ BioChatter (RAG sobre knowledge graph)
Pregunta del investigador: "¿Qué inhibidores de PCSK9 están en fase 3?"
    ↓ LLM local (Mistral-7B o Llama-3 via Ollama)
Respuesta con fuentes verificadas del knowledge graph
    ↓ Opcional: export a tabla para análisis estadístico
```

**Por qué importa**: Privacidad total (datos propietarios de investigación no salen del datacenter). Costo: $0 licencias vs. $50k+/año de plataformas propietarias.

---

## Resumen — Tiempo y complejidad por patrón

| Patrón | Semanas | Complejidad | ROI principal |
|--------|---------|-------------|---------------|
| 1. Ambient Scribe | 4-6 | Media | 2-4h médico/día |
| 2. Prior Authorization Agent | 6-8 | Media-Alta | 30-60% reducción tiempo PA |
| 3. CDSS Multi-Agente | 8-12 | Alta | Reducción errores clínicos |
| 4. EHR AI Nativo (OpenMRS) | 6-10 | Media | EHR completo sin licencias |
| 5. Medical Imaging AI | 10-16 | Alta | Priorización radiología |
| 6. Drug Discovery Assistant | 8-12 | Media-Alta | $50k+/año vs. propietarios |
