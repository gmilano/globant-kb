# 🧩 Composition Patterns — Healthcare AI

> Concrete recipes combining real repos + agents. Copy-paste starting points for client engagements.
> Last updated: 2026-07-06

## Architecture Base

```
[Open Source EHR/Platform (OpenMRS / OpenEMR / Bahmni / HAPI FHIR)]
          ↓  FHIR R4 REST API
[Interoperability Layer — HAPI FHIR server or SMART on FHIR]
          ↓
[AI Agent Orchestration — LangGraph / CrewAI]
          ↓  tool calls
[Specialized Clinical Agents]
  ├── Clinical NLP (medspaCy / openmed / ctakes)
  ├── Medical Reasoning (MedAgents / BioGPT)
  └── Domain-specific (torchio / hi-ml for imaging)
          ↓
[UI / API layer — conversational or embedded in EHR]
```

---

## Recipe 1: Ambient Clinical Documentation Agent

**Use case**: Automate SOAP note generation from voice recordings during physician encounters. 10–15 minutes/patient saved.

**Stack**:
- `openai/whisper` (MIT) — voice-to-text transcription
- `medspacy/medspacy` (MIT) — clinical entity extraction from transcript
- `hapifhir/hapi-fhir` (Apache-2.0) — store structured encounter in FHIR
- `microsoft/BioGPT` (MIT) or Claude — SOAP note generation from entities
- `openmrs/openmrs-core` (MPL-2.0) — backend EHR persistence

**Wiring**:
```python
# 1. Transcribe encounter audio
transcript = whisper.transcribe("encounter_audio.mp3")["text"]

# 2. Extract clinical entities
import medspacy
nlp = medspacy.load()
doc = nlp(transcript)
entities = [(e.text, e.label_) for e in doc.ents]  # medications, symptoms, findings

# 3. Generate structured SOAP note
prompt = f"Generate SOAP note from clinical entities: {entities}"
soap_note = claude.messages.create(
    model="claude-sonnet-5",
    messages=[{"role": "user", "content": prompt}]
)

# 4. Write to OpenMRS via FHIR
fhir_encounter = build_fhir_encounter(soap_note, patient_id)
requests.post("http://localhost:8080/fhir/Encounter", json=fhir_encounter)
```

**Estimated build time**: 6–10 weeks
**Privacy**: Run whisper + medspaCy on-prem; BioMedLM instead of Claude for full air-gap

---

## Recipe 2: Multi-Specialist Clinical Decision Support Agent (MedAgents Pattern)

**Use case**: Complex case review where multiple specialist perspectives improve diagnostic accuracy. Oncology tumor boards, ICU case review, rare disease.

**Stack**:
- `gersteinlab/MedAgents` (MIT) — multi-agent collaborative reasoning framework
- `hapifhir/hapi-fhir` (Apache-2.0) — FHIR data source for patient context
- `LangGraph` (MIT) — agent orchestration with memory and state
- `microsoft/BioGPT` (MIT) — medical knowledge base
- OpenMRS REST API — patient data

**Wiring**:
```python
# LangGraph multi-agent state machine
from langgraph.graph import StateGraph

# Define specialist agents (MedAgents pattern)
agents = {
    "cardiologist": create_specialist_agent("cardiology guidelines", fhir_tools),
    "pharmacologist": create_specialist_agent("drug interactions", fhir_tools),
    "radiologist": create_specialist_agent("imaging findings", imaging_tools),
    "internist": create_moderator_agent()  # synthesizes consensus
}

# Each agent gets patient FHIR data + their specialty prompt
# Agents debate via message passing until consensus
# Internist agent produces final recommendation

graph = build_medagents_graph(agents)
result = graph.invoke({"patient_id": "P123", "question": "Optimal treatment?"})
```

**Estimated build time**: 8–14 weeks (including clinical validation)
**Note**: Requires physician oversight loop (EU AI Act high-risk compliance)

---

## Recipe 3: FHIR MCP Server — AI Agents with Live Patient Data

**Use case**: Give Claude / GPT-4 direct access to live EHR data via FHIR. Power any AI application with patient-specific context.

**Stack**:
- `hapifhir/hapi-fhir` (Apache-2.0) — FHIR server
- `smart-on-fhir/client-js` (Apache-2.0) — OAuth2 SMART on FHIR auth
- Custom MCP server — wraps FHIR REST as MCP tools
- Claude via Anthropic API — AI reasoning layer

**Wiring**:
```python
# MCP server wrapping FHIR API as tools
@mcp_tool
def get_patient_observations(patient_id: str, code: str) -> list:
    """Get lab results for a patient by LOINC code"""
    response = fhir_client.get(
        f"/Observation?patient={patient_id}&code={code}&_sort=-date&_count=10"
    )
    return parse_fhir_bundle(response)

@mcp_tool
def get_patient_medications(patient_id: str) -> list:
    """Get active medication list for a patient"""
    return fhir_client.get(f"/MedicationRequest?patient={patient_id}&status=active")

# Claude with FHIR tools via MCP
# "What are the last 3 HbA1c values for patient 123?"
# → get_patient_observations("123", "4548-4") → structured results → LLM synthesis
```

**Estimated build time**: 4–8 weeks
**Security**: SMART on FHIR OAuth2 scopes limit data access per clinician role

---

## Recipe 4: On-Device HIPAA-Compliant Clinical NER (openmed pattern)

**Use case**: Extract clinical entities from notes/reports without PHI leaving the hospital network. HIPAA/LGPD/GDPR compliant by design.

**Stack**:
- `maziyarpanahi/openmed` (Apache-2.0) — 1,000+ on-device medical models
- `openmed-labs/openmed-agent` (MIT) — terminal AI assistant, local inference
- Ollama (MIT) — local LLM runner
- `medspacy/medspacy` (MIT) — entity extraction pipeline

**Wiring**:
```bash
# Install openmed
pip install openmed

# Run clinical NER locally — no network call
python -c "
from openmed import MedNER, PIIDeidentifier
ner = MedNER(language='en', model='clinical-ner-large')
deidentifier = PIIDeidentifier()

note = 'Patient John Smith (DOB 1965-03-12) presents with HbA1c of 9.2...'
safe_note = deidentifier.deidentify(note)  # Removes PII, stays local
entities = ner.extract(safe_note)
print(entities)
# [('HbA1c', 'LAB_VALUE'), ('9.2', 'NUMERIC'), ('diabetes', 'CONDITION')]
"
```

```python
# Pair with Ollama local LLM for full on-prem AI
import ollama
from openmed import MedNER

entities = MedNER().extract(clinical_note)
response = ollama.chat(
    model="biomistral",  # medical fine-tuned Mistral
    messages=[{"role": "user", "content": f"Summarize findings: {entities}"}]
)
```

**Estimated build time**: 2–4 weeks (proof of concept), 6–10 weeks (production)
**HIPAA compliance**: Yes — no PHI transmission, all inference on-device

---

## Recipe 5: Prior Authorization Automation Agent

**Use case**: Automate prior authorization requests that currently take 2–5 hours per physician per week. CDS Hooks integration triggers at order entry.

**Stack**:
- `openmrs/openmrs-core` (MPL-2.0) or OpenEMR (GPL-3.0) — EHR with FHIR API
- `DBCG/org-opencds-cqf-cds` (Apache-2.0) — CDS Hooks implementation
- LangGraph (MIT) — multi-step auth workflow agent
- `microsoft/BioGPT` (MIT) — clinical evidence retrieval
- Claude API — document drafting

**Wiring**:
```
1. Physician orders high-cost procedure in OpenEMR
2. CDS Hooks fires: "order-sign" hook → Prior Auth Agent
3. LangGraph agent:
   - Step 1: Evidence Agent → RAG on clinical guidelines (does this procedure have Level A evidence?)
   - Step 2: Patient Context Agent → FHIR query for prior treatments, diagnoses, labs
   - Step 3: Payer Rules Agent → Check payer-specific criteria (configurable rules engine)
   - Step 4: If criteria met → auto-approve and log
   - Step 5: If not → Draft clinical justification letter with Claude
4. CDS Card returned: "Auto-approved" or "Draft letter ready for review"
```

**Estimated build time**: 10–16 weeks (includes payer rules configuration)
**ROI**: 2–5 hours/physician/week saved; $15–40/auth administrative cost eliminated

---

## Recipe 6: Radiology AI Pipeline (Low-Resource Settings)

**Use case**: Chest X-ray analysis for TB detection in settings with limited radiologist access (LATAM, Africa). Run locally on clinic GPU.

**Stack**:
- `TorchIO-project/torchio` (Apache-2.0) — DICOM/NIfTI preprocessing and augmentation
- `microsoft/hi-ml` (MIT) — model training and evaluation pipeline
- PyTorch (BSD) — deep learning framework
- `openmrs/openmrs-core` (MPL-2.0) — result persistence and clinical workflow
- `hapifhir/hapi-fhir` (Apache-2.0) — FHIR DiagnosticReport output

**Wiring**:
```python
import torchio as tio
from monai.networks.nets import DenseNet121  # radiologist-grade architecture

# Preprocessing pipeline (torchio)
transform = tio.Compose([
    tio.RescaleIntensity(out_min_max=(0, 1)),
    tio.RandomFlip(axes=("LR",)),
    tio.Resize((224, 224, 1))
])

# Load chest X-ray, preprocess
subject = tio.Subject(image=tio.ScalarImage("chest_xr.dcm"))
preprocessed = transform(subject)

# Run classification model
model = DenseNet121(spatial_dims=2, in_channels=1, out_channels=3)
# outputs: [Normal, TB, Other pathology]
prediction = model(preprocessed.image.data.unsqueeze(0))

# Write FHIR DiagnosticReport to OpenMRS
fhir_report = build_diagnostic_report(patient_id, prediction, confidence)
fhir_client.post("/DiagnosticReport", json=fhir_report)
```

**Estimated build time**: 8–14 weeks (including model validation and clinical sign-off)
**Setting**: Works with NVIDIA T4 ($3k) or local CPU for inference (slower)

---

## Pattern Selection Guide

| Client Situation | Recommended Pattern |
|-----------------|-------------------|
| US hospital, HIPAA strict, no cloud PHI | Recipe 4 (openmed on-device) |
| Complex clinical decisions, needs specialist opinions | Recipe 2 (MedAgents multi-specialist) |
| Want AI to query their EHR via chat | Recipe 3 (FHIR MCP server) |
| Physicians drowning in documentation | Recipe 1 (Ambient documentation) |
| High prior auth burden, US payers | Recipe 5 (Prior auth agent) |
| LATAM/Africa, radiology scarce | Recipe 6 (Radiology AI pipeline) |
| Quick demo / prototype | Recipe 3 + 4 (FHIR MCP + openmed) |
