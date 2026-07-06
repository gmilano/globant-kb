# Composition Patterns — Healthcare AI

> Concrete recipes combining open-source repos + AI agents + integration patterns.
> Last updated: 2026-07-06

## Architecture Blueprint

```
[EHR / Clinical Data Store]        [OpenMRS | OpenEMR | Medplum | Epic FHIR]
          ↓ FHIR R4 API
[Interoperability Layer]           [HAPI FHIR | Medplum | smart-on-fhir/client-py]
          ↓ SMART on FHIR OAuth2
[AI Orchestration Layer]           [LangGraph | Claude API | AutoGen]
     ↓               ↓
[NLP Agents]    [Specialty Agents]  [openmed | medspacy | LLM-Medical-Agent]
          ↓
[FHIR Write-back / UI]             [DocumentReference | CarePlan | React UI]
```

---

## Recipe 1: Ambient Clinical Documentation (Spanish/English)

**Problem**: Physicians spend 35-50% of their time on documentation. No affordable ambient tool supports Spanish.

**Stack**:
- ASR: `openai/whisper` (MIT) — multilingual, runs on-premise
- Clinical NLP: `medspacy` (MIT) — section detection, negation, temporal
- FHIR write: `medplum/medplum` (Apache-2.0) or `hapifhir/hapi-fhir` (Apache-2.0)
- LLM summarization: Claude API (`claude-opus-4-8` for clinical reasoning)

**Implementation**:
```python
import whisper
import spacy
from medspacy import load as medspacy_load
import anthropic

# 1. Transcribe appointment audio (on-premise)
model = whisper.load_model("large-v3")
transcript = model.transcribe("appointment.wav", language="es")["text"]

# 2. NLP: extract entities, negations, sections
nlp = medspacy_load("es_core_news_sm")  # Spanish clinical model
doc = nlp(transcript)
entities = [(ent.text, ent.label_, ent._.is_negated) for ent in doc.ents]

# 3. Structure into SOAP note via LLM
client = anthropic.Anthropic()
note = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=2000,
    system="You are a clinical documentation specialist. Structure the following clinical transcript into a SOAP note. Output valid JSON matching FHIR Composition resource structure.",
    messages=[{"role": "user", "content": f"Transcript: {transcript}\nEntities: {entities}"}]
)

# 4. Write to FHIR as DocumentReference
# POST /fhir/R4/DocumentReference with note.content
```

**Timeline**: 3-4 weeks for MVP; 2-3 months for production with human review workflow  
**ROI**: 30-40% physician documentation time reduction

---

## Recipe 2: Multi-Agent Clinical Decision Support

**Problem**: Clinicians lack real-time synthesis of lab results, imaging, medications, and guidelines.

**Stack**:
- Orchestration: `LangGraph` (MIT) + Claude API
- Data access: `smart-on-fhir/client-py` (Apache-2.0) via SMART on FHIR
- Clinical NLP: `openmed` (Apache-2.0) for on-device processing
- Reference: [TUDB-Labs/LLM-Medical-Agent](https://github.com/TUDB-Labs/LLM-Medical-Agent) (MIT)

**Agent Team**:
```
PatientContextAgent     → reads FHIR Patient, Observation, MedicationRequest
LabInterpretationAgent  → analyzes lab trends vs reference ranges
DDxAgent                → generates differential diagnosis
GuidelinesAgent         → retrieves relevant clinical guidelines (RAG over NICE/UpToDate)
SafetyAgent             → checks drug interactions, contraindications
SynthesisAgent          → produces final clinical summary for physician
```

**Key Code Pattern (LangGraph)**:
```python
from langgraph.graph import StateGraph, END
from anthropic import Anthropic

# Define state
class ClinicalState(TypedDict):
    patient_id: str
    fhir_data: dict
    lab_interpretation: str
    ddx: list[str]
    guidelines: str
    safety_flags: list[str]
    final_summary: str

# Each node calls Claude with specialist system prompt
def lab_agent(state: ClinicalState) -> ClinicalState:
    client = Anthropic()
    response = client.messages.create(
        model="claude-opus-4-8",
        system="You are a clinical pathologist. Interpret these lab results...",
        messages=[{"role": "user", "content": str(state["fhir_data"]["labs"])}]
    )
    return {**state, "lab_interpretation": response.content[0].text}

# Build graph
graph = StateGraph(ClinicalState)
graph.add_node("lab_agent", lab_agent)
# ... add all agents, define edges, compile
```

**Human-in-loop**: Final synthesis is always presented to physician for approval. Never auto-order.  
**Timeline**: 6-8 weeks for pilot; requires physician advisory involvement

---

## Recipe 3: FHIR Data Pipeline with AI-Powered NLP Mining

**Problem**: Hospitals have millions of unstructured clinical notes; value locked in text.

**Stack**:
- FHIR server: `hapifhir/hapi-fhir` (Apache-2.0)
- Clinical NLP batch: `apache/ctakes` (Apache-2.0) + `allenai/scispacy` (MIT)
- On-device PHI handling: `maziyarpanahi/openmed` (Apache-2.0)
- Analytics: PostgreSQL + pgvector for semantic search

**Pipeline**:
```
FHIR DocumentReference (unstructured notes)
    ↓ openmed: HIPAA PII de-identification
    ↓ ctakes: entity extraction (diseases, medications, procedures)
    ↓ scispacy: UMLS linking → standard codes (ICD-10, RxNorm, SNOMED)
    ↓ pgvector: semantic embeddings for similarity search
    ↓ LLM analytics: population health insights, cohort identification
    ↓ FHIR Observation: write back structured data
```

**Output**: Structured, coded, de-identified clinical data warehouse  
**Use cases**: Quality metrics, research cohort identification, population health management  
**Timeline**: 8-12 weeks; requires clinical informatics expertise for validation

---

## Recipe 4: OpenMRS + AI Clinical Decision Support for LATAM Hospital

**Problem**: Hospital in LATAM using OpenMRS without clinical decision support.

**Stack**:
- EHR: `openmrs/openmrs-core` (MPL-2.0)
- AI integration: OpenMRS REST API → Python agent middleware
- Clinical NLP: `medspacy` Spanish models (MIT)
- LLM: Local `ollama` with `medllama` or Claude API with BAA

**Integration Points**:
```
OpenMRS REST API: /ws/rest/v1/obs (observations)
                  /ws/rest/v1/encounter (encounters)
                  /ws/rest/v1/patient (demographics)

AI Middleware:
  - POST /encounter → trigger AI analysis
  - AI reads: vitals, diagnoses, medications, allergies
  - AI produces: suggested interventions, drug interaction alerts
  - Write back: /ws/rest/v1/obs (new structured observation)
```

**Spanish NLP for note parsing**:
```python
import medspacy
nlp = medspacy.load()
# Add Spanish clinical text processing
# Extract: symptoms, diagnoses, medication mentions
# Detect: negation ("no tiene fiebre"), uncertainty ("posiblemente")
```

**Timeline**: 4-6 weeks for integration; 2-3 months for clinical validation  
**Key risk**: OpenMRS MPL-2.0 is a weak copyleft; code changes to OpenMRS modules must be shared, but the AI layer on top can be proprietary.

---

## Recipe 5: Radiology AI Agent Pipeline

**Problem**: Radiologist reading backlog; need AI-assisted anomaly flagging.

**Stack**:
- Imaging preprocessing: `torchio` (Apache-2.0) for 3D MRI/CT
- Deep learning: NVIDIA MONAI (Apache-2.0) for segmentation models
- LLM report generation: Claude API with structured output
- FHIR: ImagingStudy + DiagnosticReport resources

**Pipeline**:
```python
import torchio as tio
import anthropic

# 1. Load and preprocess DICOM
subject = tio.Subject(mri=tio.ScalarImage("scan.dcm"))
transform = tio.Compose([tio.RescaleIntensity(), tio.CropOrPad(256)])
processed = transform(subject)

# 2. Run segmentation model (MONAI)
# ... inference → anomaly_mask, confidence_scores

# 3. Generate structured radiology report
client = anthropic.Anthropic()
report = client.messages.create(
    model="claude-opus-4-8",
    system="You are a radiologist. Generate a structured radiology report from the following AI analysis findings...",
    messages=[{"role": "user", "content": f"Findings: {anomaly_findings}"}]
)

# 4. Write FHIR DiagnosticReport for radiologist review
```

**Regulatory note**: AI findings flagged as "AI-assisted preliminary read" — always requires radiologist sign-off per FDA guidance.  
**Benchmark**: Validate against ABRA (Agent Benchmark for Radiology Applications, 2026)  
**Timeline**: 10-14 weeks; requires annotated local dataset for fine-tuning

---

## Recipe 6: Prior Authorization Automation Agent

**Problem**: Prior auth takes 14+ days, consumes 40+ hours/week per practice.

**Stack**:
- Data: `medplum/medplum` (Apache-2.0) as FHIR store
- Agent: LangGraph orchestration + Claude API
- Integration: CoverMyMeds API or payer-specific EDI

**Agent Workflow**:
```
1. Trigger: New MedicationRequest or ServiceRequest in FHIR
2. ClaimsAgent: retrieves payer requirements (payer API or web scrape)
3. DocumentationAgent: pulls supporting clinical documentation from FHIR
4. CriteriaMatchAgent: checks if clinical criteria are met
5. FormAgent: generates prior auth form content
6. SubmissionAgent: submits to payer portal (with human approval step)
7. StatusAgent: polls for payer decision; updates FHIR Task resource
```

**Human gate**: Submission requires clinician e-signature (EHR integration required)  
**ROI**: 40-60% reduction in PA processing time; 25-35% approval rate improvement  
**Timeline**: 8-12 weeks; payer API access is the critical path

---

## Anti-Patterns to Avoid

| Pattern | Why Bad | Better Alternative |
|---------|---------|-------------------|
| Sending raw PHI to public LLM APIs without BAA | HIPAA violation | Use openmed on-device or Claude API with BAA |
| AI making autonomous clinical decisions | Regulatory/liability risk | Always human-in-the-loop for clinical output |
| GPL-3.0 code in commercial product core | Copyleft spreads to entire product | Use MIT/Apache-2.0 components in the AI layer |
| Single LLM agent for all clinical tasks | Hallucination risk, no specialization | Multi-agent with specialist prompts + verification |
| Skipping clinical validation | FDA SaMD risk, patient harm | Validate against HealthBench / AgentClinic; involve clinical advisors |
| Hard-coding clinical guidelines | Guidelines change; outdated advice is dangerous | RAG over versioned guideline documents |

---
*Patterns validated against: HL7 FHIR R4 spec, SMART on FHIR v2.2, FDA AI/ML SaMD guidance, EU AI Act Article 22 high-risk AI requirements.*
