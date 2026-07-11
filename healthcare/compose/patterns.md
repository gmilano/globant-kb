# 🧩 Composition Patterns — Healthcare

> Concrete recipes for building healthcare AI solutions using real repos + agents. Each pattern names specific tools and how to wire them.
> Last updated: 2026-07-11

## Architecture Base

```
[Vertical Platform (OpenEMR / OpenMRS / Medplum)]
               ↓ FHIR R4 events + REST API
[AI Integration Layer (HAPI FHIR + LangGraph/CrewAI)]
               ↓
[Specialized Healthcare Agents]
   ├── Clinical NLP (medspacy / cTAKES)
   ├── Drug Safety (TxAgent + ToolUniverse)
   ├── Imaging AI (MedRAX / CheXagent)
   └── LLM Reasoning (Claude Haiku / MedGemma)
               ↓
[UI (conversational) / API (downstream systems)]
```

---

## Pattern 1: Ambient AI Clinical Scribe

**What it does**: Records patient-physician conversations, generates SOAP notes, writes them back to the EHR — physician reviews and signs off.

**Stack**:
```
Audio → OpenAI Whisper (ASR) 
      → medspacy NER (symptom/medication/procedure extraction)
      → Claude Haiku or MedGemma (SOAP note generation with clinical structure)
      → HAPI FHIR DocumentReference write → OpenEMR / Medplum
```

**Key Repos**:
- ASR: `openai/whisper` (MIT)
- NLP: `medspacy/medspacy` (MIT)
- LLM: Claude Haiku via API (HIPAA BAA available) OR `google/medgemma` (open-weight, on-prem)
- EHR: `openemr/openemr` (GPL-2.0) or `medplum/medplum` (Apache-2.0)
- FHIR: `hapifhir/hapi-fhir` (Apache-2.0)

**FHIR Events**: On Encounter.status → "finished" trigger → scribe agent → DocumentReference.write

**Estimated Build Time**: 4-6 weeks prototype; 10-12 weeks production-ready
**ROI**: 60+ min/day saved per physician. Massive burnout reduction signal.

---

## Pattern 2: Drug Safety & Therapeutic Reasoning Agent

**What it does**: On every new prescription, checks drug-drug interactions, contraindications, patient-specific allergy risks, and dosing — before the pharmacist dispenses.

**Stack**:
```
FHIR MedicationRequest event
      → TxAgent (mims-harvard/TxAgent, MIT)
         ├── ToolUniverse: 211 FDA-approved drug tools
         ├── Drug interaction database (DrugBank via tool)
         └── Patient allergy/condition context from FHIR
      → Safety verdict: APPROVE / FLAG / CONTRAINDICATED
      → FHIR Task write (clinician notification if flagged)
```

**Key Repos**:
- Agent: `mims-harvard/TxAgent` (MIT) — 92.1% drug reasoning accuracy
- Tools: `mims-harvard/ToolUniverse` (MIT) — 211 tools, all FDA drugs since 1939
- EHR: `medplum/medplum` (Apache-2.0) or `openmrs/openmrs-core` (MPL-2.0)
- FHIR: `hapifhir/hapi-fhir` (Apache-2.0)

**FHIR Events**: MedicationRequest.status → "active" trigger → TxAgent pipeline → Task / Flag

**Estimated Build Time**: 2-3 weeks prototype; 6-8 weeks production + clinical validation
**ROI**: Prevents adverse drug events (ADEs costing US hospitals $3.5B/year).

---

## Pattern 3: Radiology AI Pipeline

**What it does**: Automatic chest X-ray analysis — generates structured findings, abnormality detection, and a preliminary radiology report. Radiologist reviews and signs.

**Stack**:
```
DICOM upload → Orthanc DICOM server (GPL-3.0)
             → OHIF Viewer (MIT) for display
             → MedRAX agent (Apache-2.0, ICML 2025)
                ├── CheXagent (Stanford-AIMI, Apache-2.0): disease classification
                ├── MedSAM: anatomical segmentation
                ├── LLaVA-Med: VQA for complex findings
                ├── DenseNet-121: pathology scoring
                └── LLM reasoning: structured report generation
             → FHIR DiagnosticReport write
             → Radiologist review queue in OHIF Viewer
```

**Key Repos**:
- Orchestration: `bowang-lab/MedRAX` (Apache-2.0)
- Imaging foundation: `Stanford-AIMI/CheXagent` (Apache-2.0)
- DICOM server: `orthanc-team/orthanc` (GPL-3.0)
- Viewer: `OHIF/Viewers` (MIT)
- FHIR: `hapifhir/hapi-fhir` (Apache-2.0)

**Estimated Build Time**: 6-8 weeks prototype; 14-16 weeks + FDA/ANVISA clearance path
**ROI**: Radiologist productivity 2-4x. Catches findings human readers miss (~10-15% improvement in sensitivity).

---

## Pattern 4: Prior Authorization Automation Agent

**What it does**: Automatically assembles the PA packet (clinical notes, diagnosis codes, criteria evidence), submits to payer, tracks status, and escalates only when human review needed.

**Stack**:
```
FHIR ServiceRequest / MedicationRequest event
      → LangGraph multi-agent (LangChain/LangGraph, MIT)
         ├── Evidence Collector: pulls relevant FHIR observations, conditions, procedures
         ├── Criteria Matcher: checks against payer clinical criteria (rules engine)
         ├── Document Assembler: generates PA narrative (Claude claude-haiku-4-5 / Haiku)
         └── Submission Agent: X12 278 EDI or payer portal API
      → FHIR CoverageEligibilityResponse / Task write
      → Status: AUTO-APPROVED / PENDING-REVIEW / ESCALATE
```

**Key Repos**:
- Orchestration: `langchain-ai/langgraph` (MIT)
- EHR/FHIR: `medplum/medplum` (Apache-2.0) — native bot system
- Clinical rules: Custom rules engine over payer criteria documents
- LLM: Claude claude-haiku-4-5 (via Anthropic API with HIPAA BAA)

**Estimated Build Time**: 6-10 weeks; integration complexity depends on payer APIs
**ROI**: PA completion: 2-3 days → same-day. BCG cites highest near-term healthcare AI ROI.

---

## Pattern 5: Patient Triage Voice Agent

**What it does**: Patients call or chat; the agent collects symptoms, scores urgency, maps to appropriate specialist/care setting, and books an appointment — or routes to emergency.

**Stack**:
```
Patient call/chat → Twilio (voice) or Web Widget
                 → STT: Whisper or Deepgram (MIT/API)
                 → Symptom Extraction: medspacy NER + UMLS concept linking
                 → Triage Scoring: LLM with clinical triage protocols (CTAS/ESI)
                 → Specialist Mapping: rules + specialty knowledge base
                 → Appointment Booking: OpenEMR scheduling API or Medplum
                 → Summary FHIR Observation write
```

**Key Repos**:
- NLP: `medspacy/medspacy` (MIT)
- Orchestration: `urban-health-labs/MedAgents` (Apache-2.0) as reasoning backbone
- EHR: `openemr/openemr` (GPL-2.0) scheduling API
- FHIR: `hapifhir/hapi-fhir` (Apache-2.0)

**Estimated Build Time**: 4-6 weeks; requires clinical protocol review before go-live
**ROI**: Reduces ED overcrowding 15-20%. Improves patient access in understaffed clinics.
**LATAM Note**: High value for regions with 1 physician per 1,000+ patients.

---

## Pattern 6: Clinical Trial Matching Agent

**What it does**: For oncology / rare disease patients, automatically scans available clinical trials and ranks eligibility based on the patient's FHIR record.

**Stack**:
```
Patient FHIR record (diagnosis, labs, genomics, treatments)
      → ClinicalAgent (lingyue404/clinical-agent, MIT)
         ├── Eligibility criteria extraction from ClinicalTrials.gov API
         ├── Patient profile matching (DrugBank, hetionet KG)
         └── Risk model scoring per trial
      → Ranked trial list with eligibility explanation
      → FHIR CarePlan write with trial recommendations
      → Physician review dashboard
```

**Key Repos**:
- Agent: `lingyue404/clinical-agent` (MIT) — BCB'24
- Trial data: ClinicalTrials.gov FHIR API (public)
- Knowledge graphs: DrugBank + Hetionet (via ClinicalAgent tools)
- EHR: Any FHIR-compliant EHR

**Estimated Build Time**: 5-8 weeks; specialty-specific calibration needed
**ROI**: 30-40% increase in trial enrollment rates (underenrollment costs pharma ~$8B/year).

---

## Pattern 7: Population Health Risk Stratification

**What it does**: Across an OpenMRS population cohort, identifies high-risk patients (readmission, deterioration, chronic disease progression) and generates intervention recommendations.

**Stack**:
```
OpenMRS patient population → FHIR Bulk Export (ndjson)
                           → Feature extraction pipeline (Python + medspacy)
                           → Risk scoring models (FinRL-style RL or traditional ML)
                           → LLM reasoning: intervention recommendation narratives
                           → Population health dashboard (Metabase / Superset)
                           → FHIR Flag + CareTeam notification
```

**Key Repos**:
- EHR: `openmrs/openmrs-core` (MPL-2.0) — bulk export
- NLP: `medspacy/medspacy` (MIT)
- Imaging/ML: `microsoft/hi-ml` (MIT) if imaging data available
- Analytics: Apache Superset (Apache-2.0)

**Target**: LATAM public health programs using OpenMRS — Bolivia, Peru, Nicaragua, Haiti
**Estimated Build Time**: 8-12 weeks; requires 3-6 months of patient data for model training
**ROI**: 20-30% reduction in preventable hospitalizations for high-risk cohorts.

---

## Pattern 8: Mental Health Screening & Routing Agent

**What it does**: Conducts validated mental health screenings (PHQ-9, GAD-7, AUDIT) via conversational AI, scores the results, and routes to appropriate care pathway or crisis intervention.

**Stack**:
```
Patient intake portal / SMS
      → Conversational LLM agent (Claude claude-haiku-4-5-20251001 / MedGemma)
         ├── Administers PHQ-9, GAD-7, AUDIT-C in natural conversation
         ├── Scores responses per validated instruments
         └── Safety screening: passive SI / active SI detection
      → Score: MINIMAL / MILD / MODERATE / SEVERE / CRISIS
      → Routing: self-help resources / therapist booking / crisis line / emergency
      → FHIR Observation write (score + instrument)
      → Follow-up scheduling in OpenEMR
```

**Key Repos**:
- Orchestration: LangGraph (MIT) with screening logic nodes
- LLM: Claude claude-haiku-4-5-20251001 (HIPAA BAA) — low latency, appropriate tone
- EHR: `openemr/openemr` (GPL-2.0) for scheduling
- FHIR: `hapifhir/hapi-fhir` (Apache-2.0)

**Clinical validation required**: PHQ-9/GAD-7 scoring must match reference instruments exactly. Safety escalation must be 100% reliable.
**Estimated Build Time**: 4-6 weeks; requires clinical psychologist sign-off
**ROI**: Addresses mental health clinician shortage (1 psychiatrist per 30,000 people in LATAM). Scalable preventive care.

---

## Pattern Selection Guide

| Client Situation | Recommended Pattern |
|-----------------|---------------------|
| Large health system, burnout problem | P1: Ambient Scribe |
| Hospital pharmacy, drug safety concerns | P2: Drug Safety Agent |
| Radiology department, reporting backlog | P3: Radiology Pipeline |
| Health insurer / payer, admin costs | P4: Prior Auth Automation |
| Primary care clinic, access bottleneck | P5: Patient Triage Voice |
| Cancer center / rare disease | P6: Clinical Trial Matching |
| Public health LATAM, OpenMRS deployment | P7: Population Health |
| Mental health / behavioral health org | P8: Mental Health Screening |

---
*Updated by ingest pipeline.*
