# 🧩 Patrones de composición — Healthcare AI

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-09 (v5 — P11 CHI-Bench evaluation harness, P12 ARPA-H ADVOCATE dual-agent supervisory, P13 HealthFlow self-evolving EHR — 13 patrones totales)

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

---

## Patrón 7: MedRAX Chest X-Ray Agent (ICML 2025)

**Caso de uso**: Análisis automatizado de radiografías de tórax (CXR) para hospitales con backlog radiológico o escasez de especialistas.

**Repos**: `bowang-lab/MedRAX` + `TorchIO-project/torchio` + `the-momentum/fhir-mcp-server`

**Flujo**:
```
Chest X-ray DICOM recibido (HL7 ORU / PACS)
    ↓ torchio (preprocesamiento: normalización, CropOrPad)
Imagen preprocesada
    ↓ MedRAX framework (LLM multimodal + herramientas CXR especializadas)
        Tool 1: ChestXRay pathology detector (18 pathologies)
        Tool 2: FHIR read → historial del paciente
        Tool 3: Guidelines lookup (ATS/ERS/CHEST guidelines)
Análisis con razonamiento paso a paso (Chain-of-Thought)
    ↓ Claude claude-sonnet-5 (structured report generation)
Reporte radiólogo preliminar (ACR format) → FHIR DiagnosticReport
    ↓ fhir-mcp-server → write a PACS / EHR
Radiólogo revisa y aprueba (Human-in-the-loop)
```

**Código mínimo (Python)**:
```python
import anthropic
import torchio as tio
import base64
from pathlib import Path

def analyze_chest_xray(dicom_path: str, patient_fhir_id: str) -> dict:
    # 1. Preprocesar imagen
    subject = tio.Subject(cxr=tio.ScalarImage(dicom_path))
    transform = tio.Compose([
        tio.RescaleIntensity(out_min_max=(0, 255)),
        tio.CropOrPad((512, 512, 1)),
    ])
    processed = transform(subject)

    # 2. Exportar como PNG para Claude Vision
    png_path = "/tmp/cxr_processed.png"
    processed.cxr.save(png_path)
    with open(png_path, "rb") as f:
        img_b64 = base64.b64encode(f.read()).decode()

    # 3. Análisis con Claude multimodal (MedRAX-style)
    client = anthropic.Anthropic()
    tools = [
        {
            "name": "lookup_radiology_guideline",
            "description": "Busca guía clínica ATS/ERS para hallazgo específico",
            "input_schema": {
                "type": "object",
                "properties": {
                    "finding": {"type": "string"},
                    "severity": {"type": "string", "enum": ["mild", "moderate", "severe"]}
                },
                "required": ["finding"]
            }
        },
        {
            "name": "write_fhir_diagnostic_report",
            "description": "Escribe reporte diagnóstico preliminar en EHR via FHIR",
            "input_schema": {
                "type": "object",
                "properties": {
                    "patient_id": {"type": "string"},
                    "findings": {"type": "string"},
                    "impression": {"type": "string"},
                    "urgency": {"type": "string", "enum": ["routine", "urgent", "critical"]}
                },
                "required": ["patient_id", "findings", "impression", "urgency"]
            }
        }
    ]

    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=2048,
        tools=tools,
        messages=[{
            "role": "user",
            "content": [
                {
                    "type": "image",
                    "source": {"type": "base64", "media_type": "image/png", "data": img_b64}
                },
                {
                    "type": "text",
                    "text": f"""Analiza esta radiografía de tórax (CXR) como radiólogo experto.
                    Patient FHIR ID: {patient_fhir_id}
                    
                    1. Describe hallazgos en formato ACR (Findings, Impression)
                    2. Clasifica urgencia (routine/urgent/critical)
                    3. Si encuentras hallazgos significativos, busca guías ATS/ERS relevantes
                    4. Escribe el reporte preliminar en el EHR via FHIR
                    
                    IMPORTANTE: Este es un análisis preliminar que REQUIERE revisión por radiólogo certificado."""
                }
            ]
        }]
    )
    return {"response": response, "patient_id": patient_fhir_id}

# Uso
result = analyze_chest_xray("patient_cxr.dcm", "Patient/FHIR-12345")
```

**Benchmarks disponibles**: ChestAgentBench (2,500 consultas diagnósticas CXR en 7 categorías) permite validar la solución antes de despliegue.

**Time-to-value**: 10-14 semanas (incluye validación clínica + PACS integration). **Tamaño de deal**: $250k–$900k.

---

## Patrón 8: FDA SaMD Clinical LLM Agent (Chronic Disease Management)

**Caso de uso**: Plataforma de gestión de enfermedades crónicas con LLM patient-facing, siguiendo el pathway FDA 510(k) establecido por UpDoc (K253281, jun 2026).

**Indicación recomendada (seguir modelo UpDoc)**: Titulación de medicamentos en DM2, hipertensión o EPOC — indicación estrecha y bien definida.

**Repos**: `openmed-labs/openmed-agent` + `hapifhir/hapi-fhir` + `openemr/openemr`

**Arquitectura de compliance**:
```
Paciente interactúa (voz o texto)
    ↓ Input validation: solo preguntas dentro del scope definido
LLM Agent (Claude Haiku-4.5 — bajo costo, alta velocidad)
    ↓ Reglas de sandboxing: NO responde fuera del protocolo clínico
    ↓ Tool: read_fhir_patient_data() — última lectura glucosa/TA/SpO2
    ↓ Tool: check_dose_boundaries() — límites clínicos definidos por médico
    ↓ Tool: escalate_to_clinician() — si hay señales de alarma
Respuesta estructurada dentro del protocolo
    ↓ Audit log completo (inmutable) → HAPI FHIR AuditEvent
    ↓ write_fhir_observation() — registro de interacción
Clinician Dashboard: revisa interacciones, aprueba ajustes de dosis
```

**Código — sandboxing crítico para FDA compliance**:
```python
import anthropic
from enum import Enum

class ClinicalScope(Enum):
    IN_SCOPE = "in_scope"
    OUT_OF_SCOPE = "out_of_scope"

ALLOWED_TOPICS = [
    "insulin dose", "blood glucose", "A1C", "hypoglycemia symptoms",
    "hyperglycemia symptoms", "injection technique", "glucose monitoring",
    "medication schedule", "dose adjustment protocol"
]

def classify_query(query: str) -> ClinicalScope:
    """Classifies if query is within the clinical scope — critical for FDA compliance."""
    client = anthropic.Anthropic()
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",  # Fast + cheap for classification
        max_tokens=64,
        system="""You are a clinical scope classifier. Answer ONLY 'IN_SCOPE' or 'OUT_OF_SCOPE'.
        IN_SCOPE: questions about insulin dosing, blood glucose, T2DM medication management.
        OUT_OF_SCOPE: everything else including other medications, other diseases, general advice.""",
        messages=[{"role": "user", "content": f"Classify: {query}"}]
    )
    text = response.content[0].text.strip().upper()
    return ClinicalScope.IN_SCOPE if "IN_SCOPE" in text else ClinicalScope.OUT_OF_SCOPE

def diabetes_agent(patient_id: str, query: str, glucose_reading: float) -> str:
    scope = classify_query(query)
    if scope == ClinicalScope.OUT_OF_SCOPE:
        return "Esta consulta está fuera del alcance de este programa. Por favor contacte a su médico."

    client = anthropic.Anthropic()
    tools = [
        {
            "name": "read_fhir_observation",
            "description": "Lee últimas lecturas de glucosa del paciente",
            "input_schema": {
                "type": "object",
                "properties": {"patient_id": {"type": "string"}, "observation_type": {"type": "string"}},
                "required": ["patient_id", "observation_type"]
            }
        },
        {
            "name": "check_dose_boundaries",
            "description": "Verifica si ajuste de dosis está dentro de límites prescritos por médico",
            "input_schema": {
                "type": "object",
                "properties": {
                    "current_dose": {"type": "number"},
                    "proposed_adjustment": {"type": "number"}
                },
                "required": ["current_dose", "proposed_adjustment"]
            }
        },
        {
            "name": "escalate_to_clinician",
            "description": "Escala urgentemente al médico — usar si glucosa <70 o >400 mg/dL",
            "input_schema": {
                "type": "object",
                "properties": {
                    "reason": {"type": "string"},
                    "glucose_level": {"type": "number"}
                },
                "required": ["reason"]
            }
        }
    ]

    system = """You are an FDA-cleared insulin titration assistant (K253281 pathway).
    STRICT RULES:
    1. ONLY advise on insulin dosing per the pre-defined clinical protocol
    2. ALWAYS recommend confirming with physician before changing dose
    3. If glucose < 70 mg/dL: immediately escalate_to_clinician
    4. If glucose > 400 mg/dL: immediately escalate_to_clinician  
    5. Document every interaction via FHIR AuditEvent
    6. Never diagnose, never recommend new medications"""

    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=512,
        system=system,
        tools=tools,
        messages=[{
            "role": "user",
            "content": f"Patient {patient_id}. Current glucose: {glucose_reading} mg/dL. Query: {query}"
        }]
    )
    return response.content[0].text if response.content else "Por favor contacte a su médico."

# Uso
answer = diabetes_agent("P-12345", "¿Debo ajustar mi dosis de insulina?", glucose_reading=185.0)
```

**Elementos de compliance FDA**:
- Scope classifier antes de cada interacción (determina si dentro del scope aprobado)
- Claude Haiku (rápido, determinístico, costo mínimo para clasificación)
- Escalation automático a clínico si hay señales de alarma
- FHIR AuditEvent para trail completo (inmutable)
- Validación de límites prescritos por médico (no autorregulado)
- Human-in-the-loop: clínico aprueba ajustes

**Estrategia de evidence pre-lanzamiento** (siguiendo UpDoc):
1. Ensayo piloto con 50-100 pacientes (IRB-approved)
2. Comparar outcomes vs. control (titulación manual por enfermero)
3. Medir: A1C reduction, hypoglycemic events, patient satisfaction
4. Documentar adverse events (AE) con FHIR-compliant reporting

**Time-to-value**: 12-18 meses (incluye ensayo clínico + FDA 510k submission). **Deal size**: $500k–$2M.

---

---

## Patrón 9: NemoClaw + OpenClaw — Agentic Workflow HIPAA-Compliant (Enterprise US)

**Caso de uso**: Hospitales US grandes (VAs, sistemas académicos) que requieren agentes AI pero tienen políticas de zero-data-out — ningún dato de paciente puede salir a modelos en la nube.

**Repos**: NVIDIA NemoClaw (Apache-2.0) + OpenClaw-Medical-Skills (Apache-2.0) + HAPI FHIR + Claude API

**Arquitectura**:
```
Clínico solicita análisis de caso (PHI: nombre, MRN, diagnósticos)
    ↓ NemoClaw Privacy Router
PHI → Nemotron local (análisis con datos sensibles, sin salir del datacenter)
Contexto anonimizado → Claude via NemoClaw (razonamiento clínico complejo, no-PHI)
    ↓ OpenClaw-Medical-Skills (869 skills médicos)
Resultado del agente → NemoClaw audit logger → FHIR AuditEvent (inmutable)
    ↓
Respuesta estructurada al clínico (nota, diagnóstico diferencial, recomendación)
```

**Configuración Docker Compose**:
```yaml
version: "3.9"
services:
  nemoclaw:
    image: nvidia/nemoclaw:latest
    environment:
      PHI_LOCAL_MODEL: nemotron-nano-4b
      CLOUD_REASONING_ENDPOINT: https://api.anthropic.com/v1
      RBAC_CONFIG: /config/rbac.yaml
      AUDIT_FHIR_ENDPOINT: http://hapi-fhir:8080/fhir
    volumes:
      - ./nemoclaw-config:/config
    ports: ["7777:7777"]

  nemotron-local:
    image: nvidia/nemotron:nano-4b-local
    deploy:
      resources:
        reservations:
          devices:
            - capabilities: [gpu]

  hapi-fhir:
    image: hapiproject/hapi:latest
    ports: ["8080:8080"]
```

**Código mínimo (Python)**:
```python
import anthropic
import requests

NEMOCLAW_ENDPOINT = "http://nemoclaw:7777"
HAPI_FHIR_ENDPOINT = "http://hapi-fhir:8080/fhir"

def hipaa_compliant_clinical_agent(patient_fhir_id: str, clinical_query: str) -> str:
    # 1. Leer datos FHIR del paciente
    patient_response = requests.get(
        f"{HAPI_FHIR_ENDPOINT}/Patient/{patient_fhir_id}",
        headers={"Accept": "application/fhir+json"}
    )
    patient_data = patient_response.json()

    # 2. NemoClaw enruta PHI a Nemotron local; reasoning a Claude
    # El SDK de NemoClaw maneja el routing internamente
    nemoclaw_response = requests.post(
        f"{NEMOCLAW_ENDPOINT}/v1/agent",
        json={
            "patient_data": patient_data,    # PHI: queda local
            "query": clinical_query,
            "agent_skills": [
                "differential_diagnosis",
                "drug_interaction_check",
                "guideline_lookup"
            ],
            "routing_policy": "phi_local",    # PHI nunca sale
            "audit_enabled": True
        }
    )
    return nemoclaw_response.json()["response"]

# Uso con OpenClaw skills vía NemoClaw
response = hipaa_compliant_clinical_agent(
    patient_fhir_id="Patient-FHIR-12345",
    clinical_query="""Paciente 67F con DM2, HTA, ERC estadio 3.
    Ingresa con dolor torácico y disnea. ¿Diagnóstico diferencial y próximos pasos?"""
)
print(response)
```

**Por qué NemoClaw es diferente al Patrón 2 (Prior Auth)**:
- En el Patrón 2, los datos pueden salir a la nube (clínicas mid-market sin BAA estricto)
- En este patrón: hospital US grande, PHI zero-leakage policy, requiere audit inmutable
- NemoClaw: PHI → Nemotron local; reasoning → Claude (con contexto anonimizado)

**Compliance checklist**:
- ✅ PHI permanece en datacenter del hospital (Nemotron local)
- ✅ RBAC: solo roles autorizados pueden invocar el agente
- ✅ Audit log inmutable: FHIR AuditEvent por cada interacción
- ✅ Sandboxing: el agente no puede acceder a recursos fuera del scope definido
- ✅ Claude recibe contexto anonimizado → no procesa PHI → no requiere BAA con Anthropic

**Time-to-value**: 10-16 semanas (incluye configuración RBAC + audit + piloto clínico). **Deal size**: $400k–$1.5M.

---

## Patrón 10: Medplum + Claude Bots — Plataforma Healthcare AI Greenfield (TypeScript)

**Caso de uso**: Startup healthtech o hospital que quiere lanzar una nueva app AI clínica (portal de pacientes, telemedicina, chronic care management) sin construir infraestructura FHIR desde cero.

**Repos**: `medplum/medplum` (Apache-2.0) + `the-momentum/fhir-mcp-server` (MIT) + Claude API

**Por qué Medplum como base**:
- FHIR-native: todos los datos son recursos FHIR R4 out-of-box
- "Bots" = funciones serverless dentro de Medplum para AI logic (similar a Lambda)
- HIPAA+SOC2 listo sin configuración adicional
- UI Component Library React: formularios clínicos, timelines, chat — no rebuilds

**Flujo**:
```
Paciente interactúa via app (React con Medplum UI components)
    ↓ Medplum FHIR Server (datos estructurados R4)
Bot de Medplum disparado por evento FHIR (nuevo Observation, Encounter, etc.)
    ↓ Claude API (análisis + recomendación)
Bot escribe resultado como FHIR Observation/CommunicationRequest
    ↓ Notificación al clínico (Medplum Subscription)
Clínico revisa y aprueba vía Medplum App
```

**Código — Medplum Bot que llama a Claude**:
```typescript
import Anthropic from "@anthropic-ai/sdk";
import { BotEvent, MedplumClient, Observation, Patient } from "@medplum/core";

export async function handler(medplum: MedplumClient, event: BotEvent): Promise<void> {
  // Triggered when a new glucose Observation is created
  const observation = event.input as Observation;
  const patientRef = observation.subject?.reference;
  if (!patientRef) return;

  // 1. Leer datos del paciente desde FHIR
  const patient = await medplum.readReference<Patient>({ reference: patientRef });
  const glucoseValue = observation.valueQuantity?.value ?? 0;
  const glucoseUnit = observation.valueQuantity?.unit ?? "mg/dL";

  // 2. Llamar a Claude para análisis clínico
  const client = new Anthropic();
  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",  // Haiku: barato, rápido para triage
    max_tokens: 512,
    system: `Eres un asistente clínico de gestión de diabetes T2DM.
Responde SOLO sobre manejo de glucosa e insulina. Siempre recomienda confirmar con médico.`,
    messages: [{
      role: "user",
      content: `Paciente: ${patient.name?.[0]?.family}.
Lectura de glucosa: ${glucoseValue} ${glucoseUnit}.
¿Requiere alguna acción? ¿Alertar al médico?`
    }]
  });

  const aiAnalysis = (message.content[0] as { text: string }).text;
  const needsAlert = glucoseValue < 70 || glucoseValue > 300;

  // 3. Escribir resultado como FHIR Observation
  await medplum.createResource({
    resourceType: "Observation",
    status: "final",
    code: { text: "AI Clinical Analysis" },
    subject: { reference: patientRef },
    valueString: aiAnalysis,
    component: [{
      code: { text: "Alert Required" },
      valueBoolean: needsAlert
    }]
  });

  // 4. Si alerta: crear CommunicationRequest al médico
  if (needsAlert) {
    await medplum.createResource({
      resourceType: "Communication",
      status: "completed",
      subject: { reference: patientRef },
      payload: [{ contentString: `⚠️ ALERTA: Glucosa ${glucoseValue} ${glucoseUnit}. ${aiAnalysis}` }]
    });
  }
}
```

**Despliegue Medplum en AWS**:
```bash
# 1. Clonar y configurar
git clone https://github.com/medplum/medplum
cd medplum && npm install

# 2. Variables de entorno (HIPAA)
export ANTHROPIC_API_KEY=<your-key>
export MEDPLUM_BASE_URL=https://your-medplum.example.com
export AWS_REGION=us-east-1  # HIPAA BAA requerido con AWS

# 3. Deploy Bot
npx medplum deploy-bot --bot-name glucose-ai-analyzer --source bots/glucose-analyzer.ts

# 4. Registrar Subscription FHIR (trigger on new Observation)
curl -X POST "$MEDPLUM_BASE_URL/fhir/R4/Subscription" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"resourceType":"Subscription","status":"active",
       "criteria":"Observation?code=15074-8",
       "channel":{"type":"rest-hook","endpoint":"medplum-bot:glucose-ai-analyzer"}}'
```

**Time-to-value**: 3-5 semanas (vs 10+ semanas con EHR tradicional). **Deal size**: $80k–$400k (startup) / $200k–$800k (hospital).

---

## Resumen — Tiempo y complejidad por patrón

| Patrón | Semanas | Complejidad | ROI principal | Deal size |
|--------|---------|-------------|---------------|-----------|
| 1. Ambient Scribe | 4-6 | Media | 2-4h médico/día | $150k–$500k |
| 2. Prior Authorization Agent | 6-8 | Media-Alta | 30-60% reducción tiempo PA | $200k–$800k |
| 3. CDSS Multi-Agente | 8-12 | Alta | Reducción errores clínicos | $300k–$1.2M |
| 4. EHR AI Nativo (OpenMRS) | 6-10 | Media | EHR completo sin licencias | $200k–$600k |
| 5. Medical Imaging AI (torchio) | 10-16 | Alta | Priorización radiología | $200k–$700k |
| 6. Drug Discovery Assistant | 8-12 | Media-Alta | $50k+/año vs. propietarios | $100k–$400k |
| 7. MedRAX Chest X-Ray Agent | 10-14 | Alta | Backlog radiológico; escasez especialistas | $250k–$900k |
| 8. FDA SaMD Clinical LLM | 52-78 (1-1.5y) | Muy Alta | Precedente K253281; chronic disease | $500k–$2M |
| 9. NemoClaw Enterprise HIPAA | 10-16 | Alta | PHI zero-leakage; hospitales US grandes | $400k–$1.5M |
| 10. Medplum Greenfield AI | 3-5 | Media | Lanzamiento rápido; FHIR-native sin infra | $80k–$800k |

---

## Patrón 11: CHI-Bench Evaluation Harness — Quality Gate antes de Producción

**Caso de uso**: Validar un agente de prior authorization, utilization management o care coordination antes de despliegue en producción clínica real.

**Por qué es crítico**: CHI-Bench (arXiv:2605.16679) demuestra que el mejor agente frontier falla 72% de los flujos clínicos reales. Sin un gate de evaluación riguroso, un proyecto healthcare AI puede pasar meses de desarrollo para fallar en producción.

**Repos**: `actava-ai/chi-bench` (Apache-2.0) + `stanfordmlgroup/MedAgentBench` (Apache-2.0)

**Flujo de evaluación**:
```
Agente candidato (Claude + tools clínicos)
    ↓ CHI-Bench test suite (75 workflows, 3 dominios)
        Domain 1: Prior Authorization (PA) — 25 casos
        Domain 2: Utilization Management (UM) — 25 casos
        Domain 3: Care Management (CM) — 25 casos
    ↓ Puntuación por dominio
Si PA score > 60%: desplegar en prior auth
Si UM score > 60%: desplegar en utilization management
Si CM score > 60%: desplegar en care coordination
Si < 60% en cualquier dominio: iterar → re-evaluar
    ↓ MedAgentBench — validación adicional con EHR virtual
Decisión: go/no-go para producción
```

**Código — Evaluación automática con CHI-Bench**:
```python
import subprocess
import json
from anthropic import Anthropic

def evaluate_clinical_agent_chi(agent_fn, benchmark_domain: str = "prior_auth") -> dict:
    """
    Evalúa un agente clínico contra CHI-Bench antes de producción.
    Retorna métricas de pase/fallo por dominio.
    """
    client = Anthropic()

    # Cargar test cases del dominio específico
    # chi-bench provee 25 casos por dominio
    with open(f"chi-bench/cases/{benchmark_domain}.jsonl") as f:
        test_cases = [json.loads(line) for line in f]

    results = []
    for case in test_cases:
        try:
            # Ejecutar agente con el caso clínico
            response = agent_fn(
                clinical_case=case["scenario"],
                patient_data=case["patient_context"],
                policy_docs=case["relevant_policies"]  # 1,279-doc handbook subset
            )

            # Evaluar con Claude como juez
            eval_response = client.messages.create(
                model="claude-sonnet-5",  # Usar modelo más capaz como juez
                max_tokens=256,
                system="""You are a strict clinical workflow evaluator.
                Score the agent's response: PASS or FAIL.
                PASS: correct decision, proper documentation, followed all policies.
                FAIL: any policy violation, incorrect clinical decision, missing required steps.""",
                messages=[{
                    "role": "user",
                    "content": f"""Ground truth: {case['expected_outcome']}
                    Agent response: {response}
                    Required policies followed: {case['required_policies']}
                    Score: PASS or FAIL?"""
                }]
            )

            result = {
                "case_id": case["id"],
                "domain": benchmark_domain,
                "passed": "PASS" in eval_response.content[0].text.upper(),
                "agent_response": response[:200]  # Truncar para log
            }
            results.append(result)

        except Exception as e:
            results.append({"case_id": case["id"], "passed": False, "error": str(e)})

    # Calcular métricas
    total = len(results)
    passed = sum(1 for r in results if r.get("passed", False))
    pass_rate = passed / total if total > 0 else 0.0

    summary = {
        "domain": benchmark_domain,
        "total_cases": total,
        "passed": passed,
        "failed": total - passed,
        "pass_rate": f"{pass_rate:.1%}",
        "ready_for_production": pass_rate >= 0.60,  # 60% mínimo recomendado
        "benchmark_comparison": {
            "best_frontier_agent": "~28% (CHI-Bench 2026)",
            "our_agent": f"{pass_rate:.1%}",
            "delta": f"{(pass_rate - 0.28):.1%} vs. best available"
        }
    }
    return summary

# Uso — Gate de calidad antes de deployment
def prior_auth_agent(clinical_case: str, patient_data: dict, policy_docs: list) -> str:
    """Agente de prior authorization a evaluar."""
    client = Anthropic()
    # ... implementación del agente
    return "Authorization approved based on criteria XYZ"

results = evaluate_clinical_agent_chi(prior_auth_agent, "prior_auth")
print(json.dumps(results, indent=2))

if not results["ready_for_production"]:
    print("❌ AGENTE NO LISTO: iterar sobre política density y multi-role handoffs")
else:
    print(f"✅ AGENTE APROBADO para producción ({results['pass_rate']} pass rate)")
```

**Áreas de mejora cuando el agente falla** (basado en CHI-Bench findings):
1. **Policy density**: incorporar el handbook del cliente como Skill.md (no en el system prompt — muy largo)
2. **Multi-role**: separar agentes por rol (PA reviewer ≠ UM reviewer ≠ care coordinator)
3. **Multilateral interaction**: incluir ejemplos few-shot de diálogos peer-to-peer en el entrenamiento

**Time-to-value**: 2-4 semanas (como gate antes de producción de cualquier proyecto PA/UM/CM). **Costo**: bajo (evaluation suite open-source).

---

## Patrón 12: ARPA-H ADVOCATE Dual-Agent — Arquitectura Supervisora para Agentes Clínicos de Alto Riesgo

**Caso de uso**: Desplegar agentes AI en áreas de alto riesgo clínico (cardiovascular, diabetes, psiquiatría) con arquitectura de supervisión dual aprobada por el modelo ARPA-H ADVOCATE.

**Fuente**: ARPA-H ADVOCATE program (Jun 2026) — template para primer agente cardiovascular FDA-authorized.

**Repos**: Claude API + `hapifhir/hapi-fhir` + `medplum/medplum` + FHIR AuditEvent

**Arquitectura de referencia ADVOCATE**:
```
Paciente ──→ Agente Clínico Primario (clinical-agent)
                    │
                    ├──→ tools: read_patient_data, check_vitals, 
                    │           recommend_medication, schedule_followup
                    │
                    ↓
            Agente Supervisorio (safety-agent) ← monitorea toda acción
                    │
                    ├── Flag si: recomendación fuera de protocolo
                    ├── Flag si: vitales en rango de alarma
                    ├── Flag si: interacción medicamentosa detectada
                    └── Escalation automático → clínico humano
                    │
                    ↓
            Clínico Humano (in-the-loop)
                    │
                    └──→ Aprueba / Override / Escala
                    │
                    ↓
            FHIR AuditEvent (log inmutable de toda decisión)
```

**Código — Implementación del patrón dual-agent**:
```python
import anthropic
import json
from datetime import datetime

client = anthropic.Anthropic()

CLINICAL_PROTOCOL = """
You are a cardiovascular care AI assistant (ADVOCATE pattern).
ALWAYS follow these rules:
1. Never recommend medication changes without current vital signs
2. ALWAYS call check_safety_supervisor before any clinical recommendation
3. If HR > 120 or < 40, call escalate_to_clinician IMMEDIATELY
4. If SBP > 180 or < 90, call escalate_to_clinician IMMEDIATELY
5. Every action must be logged via write_fhir_audit_event
"""

SUPERVISOR_PROTOCOL = """
You are a safety supervisor for a cardiovascular AI agent.
Your job: identify any unsafe or non-compliant agent actions.
Flag any: off-protocol recommendations, missed contraindications,
inappropriate drug interactions, delayed escalation of critical vitals.
Output: {safe: bool, concerns: [str], override_required: bool}
"""

def cardiovascular_care_agent(patient_id: str, chief_complaint: str, vitals: dict) -> dict:
    """Agente primario de cuidado cardiovascular."""

    # Tools disponibles para el agente primario
    primary_tools = [
        {
            "name": "read_patient_history",
            "description": "Lee historial cardíaco del paciente via FHIR",
            "input_schema": {"type": "object",
                           "properties": {"patient_id": {"type": "string"}},
                           "required": ["patient_id"]}
        },
        {
            "name": "check_medication_interactions",
            "description": "Verifica interacciones medicamentosas con medicamentos actuales",
            "input_schema": {"type": "object",
                           "properties": {"medications": {"type": "array", "items": {"type": "string"}}},
                           "required": ["medications"]}
        },
        {
            "name": "recommend_care_action",
            "description": "Genera recomendación de acción clínica (requiere aprobación supervisora)",
            "input_schema": {"type": "object",
                           "properties": {
                               "action": {"type": "string"},
                               "rationale": {"type": "string"},
                               "urgency": {"type": "string", "enum": ["routine", "urgent", "emergent"]}
                           },
                           "required": ["action", "rationale", "urgency"]}
        },
        {
            "name": "escalate_to_clinician",
            "description": "Escala caso a clínico humano de forma urgente",
            "input_schema": {"type": "object",
                           "properties": {"reason": {"type": "string"}, "urgency": {"type": "string"}},
                           "required": ["reason", "urgency"]}
        }
    ]

    # Agente primario genera respuesta
    primary_response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        system=CLINICAL_PROTOCOL,
        tools=primary_tools,
        messages=[{
            "role": "user",
            "content": f"""
            Patient: {patient_id}
            Chief complaint: {chief_complaint}
            Current vitals: {json.dumps(vitals)}
            Generate a care recommendation following cardiovascular protocol.
            """
        }]
    )

    # Extraer acciones propuestas por el agente primario
    proposed_actions = []
    for block in primary_response.content:
        if block.type == "tool_use" and block.name == "recommend_care_action":
            proposed_actions.append(block.input)

    if not proposed_actions:
        return {"status": "no_action_recommended", "primary_response": primary_response.content}

    # === SUPERVISORY AGENT CHECK ===
    supervisor_response = client.messages.create(
        model="claude-sonnet-5",  # Mismo modelo, perspectiva diferente
        max_tokens=512,
        system=SUPERVISOR_PROTOCOL,
        messages=[{
            "role": "user",
            "content": f"""
            Patient vitals: {json.dumps(vitals)}
            Proposed clinical actions: {json.dumps(proposed_actions)}
            Patient medications from FHIR: ["aspirin 81mg", "metoprolol 25mg"]
            
            Evaluate safety and protocol compliance. Output JSON:
            {{safe: bool, concerns: [str], override_required: bool}}
            """
        }]
    )

    # Parsear evaluación del supervisor
    try:
        safety_eval = json.loads(supervisor_response.content[0].text)
    except:
        safety_eval = {"safe": False, "concerns": ["Unable to parse safety evaluation"], "override_required": True}

    # Escribir audit event en FHIR
    audit_event = {
        "resourceType": "AuditEvent",
        "type": {"code": "ai-clinical-decision"},
        "recorded": datetime.utcnow().isoformat() + "Z",
        "agent": [{"name": "cardiovascular-ai-agent", "requestor": True}],
        "entity": [{"reference": {"reference": f"Patient/{patient_id}"}}],
        "outcome": "0" if safety_eval.get("safe") else "4",
        "outcomeDesc": f"Safety check: {json.dumps(safety_eval)}"
    }
    # En producción: POST audit_event a HAPI FHIR

    # Retornar resultado con supervisión
    return {
        "patient_id": patient_id,
        "proposed_actions": proposed_actions,
        "safety_evaluation": safety_eval,
        "approved_for_action": safety_eval.get("safe", False) and not safety_eval.get("override_required", True),
        "requires_clinician_review": safety_eval.get("override_required", True),
        "audit_event": audit_event
    }

# Uso
result = cardiovascular_care_agent(
    patient_id="P-98765",
    chief_complaint="Chest pain and dyspnea for 2 hours",
    vitals={"hr": 105, "sbp": 165, "dbp": 95, "spo2": 96, "rr": 20}
)

if result.get("requires_clinician_review"):
    print("⚠️ SUPERVISORY AGENT: Escalating to clinician — concerns:", result["safety_evaluation"]["concerns"])
elif result.get("approved_for_action"):
    print("✅ DUAL-AGENT APPROVED: Safe to proceed with recommendations")
    print(result["proposed_actions"])
```

**Por qué esta arquitectura es clave post-ADVOCATE**:
- **Agente primario**: optimizado para razonamiento clínico, puede aluciñar en casos raros
- **Agente supervisor**: independiente, instrucciones distintas, detecta lo que el primario pierde
- **Human-in-the-loop**: el clínico siempre puede override
- **FHIR AuditEvent**: trazabilidad inmutable de toda acción para compliance y análisis post-hoc

**Extensión al stack**:
- Añadir MedAgentBench evaluación semanal: detecta si el agente empeora con updates del modelo
- Integrar CHI-Bench: validar que pass rate > 60% antes de actualizar a producción
- Alertas Slack/Teams: agente supervisor notifica equipo clínico directamente

**Time-to-value**: 14-20 semanas (incluye validación clínica + piloto). **Deal size**: $500k–$2M.

---

## Patrón 13: HealthFlow Multi-Agente Self-Evolving — EHR Analysis con Complejidad Adaptativa

**Caso de uso**: Análisis de EHR para pacientes complejos (comorbilidades múltiples, historial extenso) donde la complejidad del caso determina cuántos agentes y qué profundidad de razonamiento usar.

**Repos**: `yhzhu99/HealthFlow` (MIT) + `yhzhu99/MedAgentBoard` (MIT) + `medplum/medplum` + Claude API

**Problema que resuelve**: Los agentes clínicos con complejidad fija (siempre 3 agentes, siempre N pasos) son ineficientes:
- Casos simples: desperdician recursos ejecutando 10 pasos cuando 2 bastan
- Casos complejos: con 2 pasos llegan a conclusiones incorrectas

**Patrón HealthFlow** — complejidad adaptativa:
```
Caso clínico → Complexity Classifier
    ↓
Si simple (score < 0.3): Single agent → diagnóstico directo
Si moderado (0.3-0.7): 3 agentes especializados en paralelo → síntesis
Si complejo (> 0.7): N agentes, self-evolving — agentes deciden cuándo parar
    ↓
Evaluación por MedAgentBoard → registro en FHIR Observation
```

**Código — HealthFlow adaptive orchestration**:
```python
import anthropic
from typing import Literal

client = anthropic.Anthropic()

def classify_case_complexity(patient_summary: str, num_conditions: int, 
                              medication_count: int) -> float:
    """Clasifica complejidad del caso en 0.0 (simple) a 1.0 (muy complejo)."""
    # Heurística simple: complejidad ∝ condiciones y medicamentos
    base_score = min(num_conditions * 0.1 + medication_count * 0.05, 1.0)
    
    # Ajuste con LLM para detectar complejidad semántica (interacciones, contradicciones)
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",  # Haiku para clasificación rápida barata
        max_tokens=64,
        messages=[{
            "role": "user",
            "content": f"""Rate clinical complexity 0.0-1.0 based on:
            Patient summary: {patient_summary[:200]}
            Conditions: {num_conditions}, Medications: {medication_count}
            Base score: {base_score:.2f}
            Output only a number between 0.0 and 1.0."""
        }]
    )
    try:
        llm_score = float(response.content[0].text.strip())
        return (base_score + llm_score) / 2  # Combinar heurística + LLM
    except:
        return base_score

def healthflow_ehr_analysis(
    patient_id: str,
    patient_summary: str,
    num_conditions: int = 3,
    medication_count: int = 5
) -> dict:
    """
    Analiza caso clínico con complejidad adaptativa (patrón HealthFlow).
    """
    complexity = classify_case_complexity(patient_summary, num_conditions, medication_count)
    
    if complexity < 0.3:
        # CASO SIMPLE: agente único directo
        tier = "simple"
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=512,
            messages=[{"role": "user", "content": f"Brief clinical summary and recommendation for: {patient_summary}"}]
        )
        agents_used = 1
        analysis = response.content[0].text

    elif complexity < 0.7:
        # CASO MODERADO: 3 agentes especializados
        tier = "moderate"
        import concurrent.futures

        def diagnostic_agent(data):
            r = client.messages.create(
                model="claude-sonnet-5",
                max_tokens=512,
                system="You are a diagnostic specialist. Focus on differential diagnosis.",
                messages=[{"role": "user", "content": f"Differential diagnosis: {data}"}]
            )
            return r.content[0].text

        def treatment_agent(data):
            r = client.messages.create(
                model="claude-sonnet-5",
                max_tokens=512,
                system="You are a treatment planning specialist. Focus on evidence-based interventions.",
                messages=[{"role": "user", "content": f"Treatment plan: {data}"}]
            )
            return r.content[0].text

        def risk_agent(data):
            r = client.messages.create(
                model="claude-sonnet-5",
                max_tokens=512,
                system="You are a risk stratification specialist. Focus on complications and monitoring.",
                messages=[{"role": "user", "content": f"Risk assessment: {data}"}]
            )
            return r.content[0].text

        with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
            f1 = executor.submit(diagnostic_agent, patient_summary)
            f2 = executor.submit(treatment_agent, patient_summary)
            f3 = executor.submit(risk_agent, patient_summary)
            diag, treat, risk = f1.result(), f2.result(), f3.result()

        # Síntesis final
        synthesis = client.messages.create(
            model="claude-sonnet-5",
            max_tokens=1024,
            messages=[{"role": "user", "content":
                f"Synthesize into unified clinical recommendation:\n"
                f"Diagnosis: {diag}\nTreatment: {treat}\nRisk: {risk}"}]
        )
        agents_used = 4  # 3 + synthesis
        analysis = synthesis.content[0].text

    else:
        # CASO COMPLEJO: self-evolving, agentes deciden cuándo parar
        tier = "complex"
        conversation = [{"role": "user", "content": patient_summary}]
        analysis_rounds = []
        max_rounds = 5  # Safety cap

        for round_num in range(max_rounds):
            response = client.messages.create(
                model="claude-sonnet-5",
                max_tokens=1024,
                system="""You are a clinical specialist analyzing a complex case.
                After each response, indicate if more analysis is needed:
                [CONTINUE] if you need more information or analysis
                [COMPLETE] if you have a confident comprehensive recommendation""",
                messages=conversation
            )

            agent_text = response.content[0].text
            analysis_rounds.append(agent_text)
            conversation.append({"role": "assistant", "content": agent_text})

            if "[COMPLETE]" in agent_text:
                break
            elif round_num < max_rounds - 1:
                conversation.append({"role": "user",
                                   "content": "Continue with deeper analysis or provide final recommendation."})

        analysis = "\n---\n".join(analysis_rounds)
        agents_used = round_num + 1

    return {
        "patient_id": patient_id,
        "complexity_score": round(complexity, 2),
        "tier": tier,
        "agents_used": agents_used,
        "analysis": analysis,
        "benchmark_ready": True  # Compatible con MedAgentBoard evaluation
    }

# Uso
result = healthflow_ehr_analysis(
    patient_id="P-54321",
    patient_summary="78F, DM2 x 20yr, HTA, CHF NYHA III, CKD stage 3. Presents with worsening dyspnea, LE edema. Current: metformin, lisinopril, furosemide, metoprolol, spironolactone, insulin.",
    num_conditions=5,
    medication_count=6
)

print(f"Complexity: {result['complexity_score']} ({result['tier']} tier)")
print(f"Agents used: {result['agents_used']}")
print(f"Analysis: {result['analysis'][:300]}...")
```

**Ventajas del patrón adaptativo**:
- **Costo**: casos simples cuestan 10× menos (Haiku vs. Sonnet, 1 vs. 4 agentes)
- **Latencia**: casos simples resueltos en <2s vs. 15-30s para complejos
- **Calidad**: casos complejos obtienen profundidad necesaria sin limite arbitrario de pasos
- **Evaluación**: compatible con MedAgentBoard para benchmarking periódico

**Time-to-value**: 8-14 semanas. **Deal size**: $150k–$600k.

---

## Resumen — Tiempo y complejidad por patrón

| Patrón | Semanas | Complejidad | ROI principal | Deal size |
|--------|---------|-------------|---------------|-----------|
| 1. Ambient Scribe | 4-6 | Media | 2-4h médico/día | $150k–$500k |
| 2. Prior Authorization Agent | 6-8 | Media-Alta | 30-60% reducción tiempo PA | $200k–$800k |
| 3. CDSS Multi-Agente | 8-12 | Alta | Reducción errores clínicos | $300k–$1.2M |
| 4. EHR AI Nativo (OpenMRS) | 6-10 | Media | EHR completo sin licencias | $200k–$600k |
| 5. Medical Imaging AI (torchio) | 10-16 | Alta | Priorización radiología | $200k–$700k |
| 6. Drug Discovery Assistant | 8-12 | Media-Alta | $50k+/año vs. propietarios | $100k–$400k |
| 7. MedRAX Chest X-Ray Agent | 10-14 | Alta | Backlog radiológico; escasez especialistas | $250k–$900k |
| 8. FDA SaMD Clinical LLM | 52-78 (1-1.5y) | Muy Alta | Precedente K253281; chronic disease | $500k–$2M |
| 9. NemoClaw Enterprise HIPAA | 10-16 | Alta | PHI zero-leakage; hospitales US grandes | $400k–$1.5M |
| 10. Medplum Greenfield AI | 3-5 | Media | Lanzamiento rápido; FHIR-native sin infra | $80k–$800k |
| 11. CHI-Bench Evaluation Gate | 2-4 | Baja | Prevenir fallos en producción clínica | Cross-cutting |
| 12. ADVOCATE Dual-Agent | 14-20 | Muy Alta | Agentes alto riesgo (cardio, diabetes) | $500k–$2M |
| 13. HealthFlow Self-Evolving | 8-14 | Alta | Análisis EHR adaptativo; optimización costo/calidad | $150k–$600k |
