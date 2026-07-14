# Composition Patterns — Healthcare AI

> Concrete recipes combining repos + agents + AI.
> Version: v5 — Updated: 2026-07-14

## Architecture Base

```
[Open-source vertical platform (OpenMRS / Medplum / OpenEMR)]
          ↓
[FHIR R4 API + FHIR-MCP server (xSoVx/fhir-mcp)]
          ↓
[LLM Agent (Claude Sonnet 5 / claude-sonnet-5)]
          ↓
[Safety layer (MedGuards multi-agent error correction)]
          ↓
[On-device PHI processing (OpenMed Apache-2.0)]
          ↓
[Conversational UI / REST API for client]
```

---

## Pattern 1: Local-First Clinical NLP Pipeline (HIPAA by Design)

**Use case**: Extract clinical entities + de-identify PHI from clinical notes without data leaving client infrastructure.

**Repos**: `maziyarpanahi/openmed` + `medspacy/medspacy` + `apache/ctakes`

**Stack**:
```python
# Step 1: De-identify PHI on-device with OpenMed
from openmed import MedPipeline
pipeline = MedPipeline(model="openmed/de-id-multilingual", device="local")
clean_text = pipeline.deidentify(raw_note)  # 55+ PHI types removed

# Step 2: Clinical NER with medspacy
import medspacy
nlp = medspacy.load()
doc = nlp(clean_text)
entities = [(e.text, e.label_) for e in doc.ents]  # medications, diagnoses, etc.

# Step 3: Send clean structured data to Claude for reasoning
import anthropic
client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-sonnet-5",
    messages=[{"role": "user", "content": f"Analyze this clinical note: {entities}"}]
)
```

**Estimated timeline**: 3-4 weeks | **Target**: LATAM hospitals needing LGPD-safe NLP

---

## Pattern 2: FHIR-Native Clinical Decision Support Agent

**Use case**: Clinician queries patient records in natural language; agent fetches FHIR data + provides evidence-based recommendations.

**Repos**: `xSoVx/fhir-mcp` + `medplum/medplum` + Claude claude-sonnet-5 with MCP

**Stack**:
```python
# Configure FHIR-MCP server (xSoVx/fhir-mcp)
# fhir-mcp connects to Medplum FHIR server

import anthropic
client = anthropic.Anthropic()

# Claude calls FHIR-MCP tools automatically
response = client.messages.create(
    model="claude-sonnet-5",
    tools=[{
        "name": "fhir_search",
        "description": "Search FHIR server for patient data",
        "input_schema": {"type": "object", "properties": {"query": {"type": "string"}}}
    }],
    messages=[{
        "role": "user",
        "content": "What medications is patient #P12345 currently on? Any drug interactions?"
    }]
)
# Agent fetches Patient, MedicationRequest, AllergyIntolerance resources
# Returns structured drug interaction analysis
```

**Estimated timeline**: 4-6 weeks | **CMS-0057-F compliant** | **Target**: Clinician copilot at US/LATAM health systems

---

## Pattern 3: Autonomous Revenue Cycle Agent

**Use case**: Automate prior authorization requests, claim submission, and denial management.

**Repos**: `openemr/openemr` (FHIR API) + `xSoVx/fhir-mcp` + CHI-Bench eval harness

**Pipeline**:
```
[Claim / PA request] → [FHIR-MCP reads patient data] → [Claude agent]
    → [Policy library RAG (1,290+ doc managed-care handbook)]
    → [Authorization decision + documentation]
    → [Submit via FHIR]
    → [MedGuards safety check on output]
```

**CHI-Bench baseline**: Best frontier agent achieves 28% on these workflows → custom orchestration + policy RAG + fine-tuning can push toward 60%+.

**Estimated timeline**: 8-12 weeks | **Pricing**: $150k-$500k engagement | **Target**: US insurers, large health systems

---

## Pattern 4: Medical Imaging AI Pipeline (MONAI + Claude)

**Use case**: Automated radiology triage: segment → classify → generate structured radiology report.

**Repos**: `Project-MONAI/MONAI` + `Project-MONAI/monai-deploy` + Claude Vision

**Stack**:
```python
import monai
from monai.transforms import Compose, LoadImage, EnsureChannelFirst, ScaleIntensity
from monai.networks.nets import UNet
import anthropic

# Step 1: MONAI Auto3DSeg for organ/lesion segmentation
model = UNet(...)  # or monai.auto3dseg for automated model selection
seg_mask = model(dicom_image)

# Step 2: Claude Vision for structured report generation
client = anthropic.Anthropic()
response = client.messages.create(
    model="claude-sonnet-5",
    messages=[{
        "role": "user",
        "content": [
            {"type": "image", "source": {"type": "base64", "data": encoded_image}},
            {"type": "text", "text": f"Segmentation findings: {seg_mask.summary()}. Generate structured radiology report."}
        ]
    }]
)
```

**Auto3DSeg**: 2-day training time vs weeks manually | **Estimated timeline**: 5-7 weeks

---

## Pattern 5: Multi-Agent Clinical Safety Stack

**Use case**: Any clinical LLM output passes through MedGuards before reaching clinicians.

**Repos**: `congboma/MedGuards` + any base LLM

```
[Base LLM generates clinical recommendation]
    → [MedGuards Detector Agent: identify potential errors]
    → [MedGuards Localizer Agent: pinpoint error location]
    → [MedGuards Corrector Agent: fix with KPCS scoring]
    → [Confidence Arbitrator: resolve disagreements]
    → [Verified safe output to clinician]
```

**No base LLM retraining required** | **Multilingual** (handles Spanish/Portuguese clinical notes) | **Estimated timeline**: 2-3 weeks as standalone add-on

---

## Pattern 6: Greenfield FHIR Health App (Medplum + Agents)

**Use case**: Build a new telehealth or care coordination app AI-native from day one.

**Repos**: `medplum/medplum` + `xSoVx/fhir-mcp` + `maziyarpanahi/openmed`

```
[Medplum FHIR backend (TypeScript, HIPAA+SOC2)]
    ↓ Serverless Bots (event-driven workflows)
[FHIR-MCP server for LLM access]
    ↓
[Claude claude-sonnet-5 clinical agent]
    ↓
[OpenMed for on-device PHI de-id (mobile)]
    ↓
[Medplum React UI Kit]
```

**Estimated timeline**: 6-8 weeks | **Pricing**: $80k-$250k | **Target**: Health tech startups, payer member apps, care coordination

---

## Pattern 7: LATAM Hospital EMR + AI Triage

**Use case**: Deploy OpenMRS for underserved LATAM facilities + AI triage layer.

**Repos**: `openmrs/openmrs-core` + `maziyarpanahi/openmed` (Spanish/Portuguese models) + `gnuhealth/gnuhealth`

```
[OpenMRS EMR (mobile-first, offline-capable)]
    ↓ FHIR R4 API
[OpenMed local NLP → Spanish/Portuguese clinical NER]
    ↓ Clean structured data
[Claude claude-haiku-4-5 (lightweight) for triage scoring]
    ↓
[Priority queue: urgent / non-urgent / telehealth referral]
```

**Works offline-first** | **LGPD/LATAM privacy compliant** | **Estimated timeline**: 8-10 weeks | **Target**: NGO-partnered hospitals in Brazil, Colombia, Peru

---

## Pattern 8: NemoClaw Enterprise HIPAA Deployment

**Use case**: Large US health system needing enterprise AI with zero-PHI-to-cloud guarantee.

**Stack**:
```
[NemoClaw (NVIDIA, Apache-2.0) — PHI stays on Nemotron local]
    ↓ de-identified clinical context
[Claude claude-sonnet-5 (cloud) for reasoning + generation]
    ↓
[MedGuards safety layer]
    ↓
[Epic/Cerner FHIR API for structured data read-back]
```

**HIPAA-by-design** | **Estimated timeline**: 10-16 weeks | **Pricing**: $400k-$1.5M | **Target**: US large hospital systems, enterprise

---

## Pattern 9: Clinical Research Data Extraction Agent

**Use case**: Extract structured data from unstructured clinical notes for research cohorts.

**Repos**: `medspacy/medspacy` + `apache/ctakes` + `maziyarpanahi/openmed` + Claude

```python
import anthropic
client = anthropic.Anthropic()

# 1. OpenMed de-identification (on-device)
# 2. medspacy for entity extraction
# 3. ctakes for UMLS/SNOMED coding
# 4. Claude for structured output per research protocol schema

response = client.messages.create(
    model="claude-sonnet-5",
    messages=[{"role": "user", "content": f"Extract: {entities}. Output: CRF JSON schema."}]
)
```

**Estimated timeline**: 3-5 weeks | **Target**: Academic medical centers, CRO organizations

---

## Pattern 10: OpenAPS AI Glucose Management Agent

**Use case**: AI layer on top of open-source artificial pancreas for T1D diabetes management.

**Repos**: `openaps/openaps` (MIT) — 2,500+ patients on production

```
[CGM glucose readings + pump data]
    ↓ OpenAPS closed-loop algorithm
[Claude claude-haiku-4-5 agent for anomaly detection + patient explanation]
    ↓
[Personalized dosing narrative in patient language]
    ↓ (alert if deviation from model)
[Clinician dashboard + FHIR export]
```

**Estimated timeline**: 4-6 weeks | **Target**: Diabetes care platforms, patient-facing health apps

---

## Quick-Start Decision Matrix

| Client Need | Starting Platform | Key Agent | Timeline |
|-------------|-----------------|-----------|---------|
| Physician documentation | Medplum + FHIR-MCP | Claude Sonnet 5 | 3-4w |
| Revenue cycle automation | OpenEMR + CHI-Bench eval | Claude + policy RAG | 8-12w |
| Radiology AI | MONAI + Claude Vision | Auto3DSeg + ClinSeek | 5-7w |
| LATAM EMR + triage | OpenMRS + OpenMed | Claude Haiku | 8-10w |
| Clinical safety layer | MedGuards + any LLM | Multi-agent guardrails | 2-3w |
| On-device PHI de-id | OpenMed | On-device NLP | 1-2w |
| Enterprise HIPAA | NemoClaw + Claude | Hybrid local/cloud | 10-16w |

---
*Auto-updated by ingest pipeline — v5.*
