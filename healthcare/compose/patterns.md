# 🧩 Composition Patterns — Healthcare

> Concrete recipes for building healthcare AI solutions using real repos + agents. Each pattern names specific tools and how to wire them.
> Last updated: 2026-07-12 (v10)

## Architecture Base

```
[Vertical Platform (OpenEMR / OpenMRS / Medplum)]
               ↓ FHIR R4 events + REST API
[AI Integration Layer (HAPI FHIR + LangGraph/CrewAI)]
               ↓
[Specialized Healthcare Agents]
   ├── Clinical NLP (medspacy / cTAKES)
   ├── Drug Safety (TxAgent + ToolUniverse)
   ├── Imaging AI (MedRAX-2 / CheXagent / MedSAM-Agent)
   ├── Drug Discovery (scientific-agent-skills)
   └── LLM Reasoning (Claude Haiku / MedGemma)
               ↓
[UI (conversational) / API (downstream systems)]
```

---

## Pattern 1: Ambient AI Clinical Scribe

**What it does**: Records patient-physician conversations, generates SOAP notes, writes them back to the EHR.

**Stack**:
```
Audio → OpenAI Whisper (ASR, MIT)
      → medspacy NER (symptom/medication/procedure extraction)
      → Claude Haiku or MedGemma (SOAP note generation)
      → HAPI FHIR DocumentReference write → OpenEMR / Medplum
```

**Key Repos**: `openai/whisper` (MIT), `medspacy/medspacy` (MIT), `openemr/openemr` (GPL-2.0) or `medplum/medplum` (Apache-2.0), `hapifhir/hapi-fhir` (Apache-2.0)

**FHIR Events**: On Encounter.status → "finished" trigger → scribe agent → DocumentReference.write

**Estimated Build Time**: 4-6 weeks prototype; 10-12 weeks production-ready
**ROI**: 41% reduction in physician clerical time (live deployment data). 60+ min/day saved per physician.

---

## Pattern 2: Drug Safety & Therapeutic Reasoning Agent

**What it does**: On every new prescription, checks drug-drug interactions, contraindications, allergy risks, and dosing.

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

**Key Repos**: `mims-harvard/TxAgent` (MIT), `mims-harvard/ToolUniverse` (MIT), `medplum/medplum` (Apache-2.0), `hapifhir/hapi-fhir` (Apache-2.0)

**Estimated Build Time**: 2-3 weeks prototype; 6-8 weeks production + clinical validation
**ROI**: Prevents adverse drug events (ADEs costing US hospitals $3.5B/year).

---

## Pattern 3: Radiology AI Pipeline (MedRAX-2 + MedSAM-Agent)

**What it does**: Automatic multi-organ medical imaging analysis — structured findings, segmentation, preliminary report. Radiologist reviews and signs.

**Stack**:
```
DICOM upload → Orthanc DICOM server (GPL-3.0)
             → OHIF Viewer (MIT) for display
             → MedRAX-2 agent (Apache-2.0, 2026)
                ├── CheXagent (Apache-2.0): organ-specific classification
                ├── MedSAM-Agent (Apache-2.0): interactive multi-turn segmentation
                ├── LLaVA-Med: VQA for complex findings
                └── LLM reasoning: structured report generation
             → FHIR DiagnosticReport write
             → Radiologist review queue in OHIF Viewer
```

**Key Repos**: `bowang-lab/MedRAX2` (Apache-2.0), `CUHK-AIM-Group/MedSAM-Agent` (Apache-2.0), `Stanford-AIMI/CheXagent` (Apache-2.0), `orthanc-team/orthanc` (GPL-3.0), `OHIF/Viewers` (MIT)

**Estimated Build Time**: 6-8 weeks prototype; 14-16 weeks + FDA/ANVISA clearance path
**ROI**: Radiologist productivity 2-4x. 10-15% improvement in sensitivity vs human-only reading.

---

## Pattern 4: Agentic Prior Authorization (End-to-End)

**What it does**: Automatically assembles PA packet, submits to payer, tracks status, escalates only when needed.

**Stack**:
```
FHIR ServiceRequest / MedicationRequest event
      → LangGraph multi-agent (MIT)
         ├── Evidence Collector: pulls FHIR observations, conditions, procedures
         ├── Criteria Matcher: checks against payer clinical criteria
         ├── Document Assembler: generates PA narrative (Claude Haiku)
         └── Submission Agent: X12 278 EDI or payer portal API
      → FHIR CoverageEligibilityResponse / Task write
      → Status: AUTO-APPROVED / PENDING-REVIEW / ESCALATE
```

**Key Repos**: `langchain-ai/langgraph` (MIT), `medplum/medplum` (Apache-2.0)
**Reference**: PrescriberPoint (2026 commercial benchmark — full lifecycle PA automated)

**Estimated Build Time**: 6-10 weeks
**ROI**: PA completion: 2-3 days → same-day. $300-500 saved per automated PA request. BCG cites highest near-term healthcare AI ROI.

---

## Pattern 5: Patient Triage Voice Agent

**What it does**: Collects symptoms via call/chat, scores urgency, maps to appropriate care setting, books appointment or routes to emergency.

**Stack**:
```
Patient call/chat → Twilio or Web Widget
                 → STT: Whisper or Deepgram
                 → Symptom Extraction: medspacy NER + UMLS concept linking
                 → Triage Scoring: LLM with clinical triage protocols (CTAS/ESI)
                 → Specialist Mapping: rules + specialty knowledge base
                 → Appointment Booking: OpenEMR scheduling API or Medplum
                 → Summary FHIR Observation write
```

**Key Repos**: `medspacy/medspacy` (MIT), `urban-health-labs/MedAgents` (Apache-2.0), `openemr/openemr` (GPL-2.0)

**Estimated Build Time**: 4-6 weeks; requires clinical protocol review before go-live
**ROI**: Reduces ED overcrowding 15-20%. High value for LATAM regions with 1 physician per 1,000+ patients.

---

## Pattern 6: Clinical Trial Matching Agent

**What it does**: For oncology/rare disease patients, scans available clinical trials and ranks eligibility based on FHIR record.

**Stack**:
```
Patient FHIR record (diagnosis, labs, genomics, treatments)
      → ClinicalAgent (lingyue404/clinical-agent, MIT)
         ├── Eligibility criteria extraction from ClinicalTrials.gov API
         ├── Patient profile matching (DrugBank, hetionet KG)
         └── Risk model scoring per trial
      + scientific-agent-skills (MIT): ClinicalTrials.gov + PubMed skills
      → Ranked trial list with eligibility explanation
      → FHIR CarePlan write
```

**Key Repos**: `lingyue404/clinical-agent` (MIT), `K-Dense-AI/scientific-agent-skills` (MIT)

**Estimated Build Time**: 5-8 weeks
**ROI**: 30-40% increase in trial enrollment rates (underenrollment costs pharma ~$8B/year).

---

## Pattern 7: Population Health Risk Stratification

**What it does**: Across OpenMRS cohort, identifies high-risk patients and generates intervention recommendations.

**Stack**:
```
OpenMRS patient population → FHIR Bulk Export (ndjson)
                           → Feature extraction (Python + medspacy)
                           → Risk scoring models (ML or LLM-based)
                           → LLM: intervention recommendation narratives
                           → Population health dashboard (Apache Superset)
                           → FHIR Flag + CareTeam notification
```

**Key Repos**: `openmrs/openmrs-core` (MPL-2.0), `medspacy/medspacy` (MIT), Apache Superset (Apache-2.0)

**Target**: LATAM public health programs — Bolivia, Peru, Nicaragua, Haiti
**Estimated Build Time**: 8-12 weeks
**ROI**: 20-30% reduction in preventable hospitalizations for high-risk cohorts.

---

## Pattern 8: Mental Health Screening & Routing Agent (WhatsApp-first for LATAM)

**What it does**: Validated mental health screenings (PHQ-9, GAD-7, AUDIT) via WhatsApp — scores results, routes to appropriate care.

**Stack**:
```
Patient WhatsApp / SMS / Web
      → WhatsApp Business API (Meta)
      → LLM agent (Claude Haiku / MedGemma) in Portuguese/Spanish
         ├── Administers PHQ-9, GAD-7, AUDIT-C conversationally
         ├── Scores responses per validated instruments
         └── Safety screening: passive SI / active SI detection
      → Score: MINIMAL / MILD / MODERATE / SEVERE / CRISIS
      → Routing: self-help / therapist booking / crisis line / emergency
      → FHIR Observation write → OpenEMR follow-up scheduling
```

**Key Repos**: LangGraph (MIT), Claude Haiku (HIPAA BAA), `openemr/openemr` (GPL-2.0)
**Watch**: YAQIN (arXiv 2026) — culturally-sensitive mental health AI agent

**Estimated Build Time**: 4-6 weeks; clinical psychologist sign-off required
**ROI**: 1 psychiatrist per 30,000 people in LATAM — scalable preventive care at <$1/screening.

---

## Pattern 9: Drug Discovery Pipeline (scientific-agent-skills + TxAgent)

**What it does**: Full-stack pharma research pipeline — target identification, compound screening, mechanism analysis, competitive landscape, clinical trial design. 148 skills + 100+ scientific databases.

**Stack**:
```
Research Question (e.g., "Find KRAS inhibitors for NSCLC")
      → scientific-agent-skills (K-Dense-AI, MIT, 30.7k stars)
         ├── PubChem: compound search + property lookup
         ├── ChEMBL: bioactivity data + ADMET screening
         ├── UniProt: target protein structure + function
         ├── ClinicalTrials.gov: competing trials + enrollment status
         ├── PubMed: literature review + mechanism extraction
         ├── RDKit: molecular fingerprinting + similarity
         └── Scanpy: single-cell expression analysis
      → Hypothesis validation via TxAgent (drug-target reasoning)
      → DrugAgent (drug repurposing KG reasoning)
      → Research report: ranked candidates + mechanism + competitive landscape
      (Optional): Lab automation trigger → Opentrons / Benchling
```

**Key Repos**:
- Core skills: `K-Dense-AI/scientific-agent-skills` (MIT) — works with Claude Code
- Drug safety validation: `mims-harvard/TxAgent` + `mims-harvard/ToolUniverse` (MIT)
- Repurposing: `AI4Science-AI/DrugAgent` (Apache-2.0)
- Orchestration: Claude Code with scientific-agent-skills OR any Agent Skills-compatible framework

**Estimated Build Time**: 1-2 weeks for research copilot; 4-6 weeks for full pipeline with lab integration
**ROI**: Drug discovery phase compression from 18 months → weeks for target-to-candidate analysis. Used by 160k+ scientists globally.
**LATAM angle**: Pharma clients in Brazil (EMS, Aché), Argentina (Laboratorios Bagó) — competitive intelligence + drug repurposing for tropical diseases (dengue, Chagas).

---

## Pattern 10: Self-Evolving Adaptive Triage Agent (EvoClinician Architecture)

**What it does**: A triage agent that learns which diagnostic questions are most efficient for local patient populations — improving accuracy and reducing unnecessary tests over time, without retraining.

**Stack**:
```
Patient intake → Initial symptom collection (medspacy NER)
              → EvoClinician-inspired loop (yf-he/EvoClinician, MIT)
                 [ACTOR agent]: generates diagnostic questions + tentative diagnosis
                 [PROCESS GRADER]: evaluates each action for:
                    ├── Clinical yield (information gained per question)
                    └── Resource efficiency (cost/time of each test ordered)
                 [EVOLVER]: updates Actor's strategy (prompt + memory evolution)
                    → Strategy improves per patient episode
              → Appointment Booking / Care Pathway (Medplum)
              → FHIR Encounter + Observation write
              → Outcome feedback → next evolution cycle
```

**Key Repos**:
- Architecture: `yf-he/EvoClinician` (MIT) — Diagnose→Grade→Evolve
- EHR: `medplum/medplum` (Apache-2.0)
- NLP: `medspacy/medspacy` (MIT)
- Training scaffold: `wshi83/MedAgentGym` (MIT) — use to train initial Actor agent

**Key Insight**: Standard triage agents fail when deployed to new hospital populations because patient mix differs from training data. EvoClinician architecture adapts at test time — ideal for LATAM deployments where local disease burden (dengue, Chagas, TB) differs from North American training sets.

**Estimated Build Time**: 8-10 weeks (core); 4-6 more weeks for clinical validation
**ROI**: 20-30% diagnostic efficiency improvement over static agents in deployment. No retraining cost.

---

## Pattern Selection Guide

| Client Situation | Recommended Pattern |
|--------------------|---------------------|
| Large health system, burnout problem | P1: Ambient Scribe |
| Hospital pharmacy, drug safety concerns | P2: Drug Safety Agent |
| Radiology department, reporting backlog | P3: Radiology Pipeline |
| Health insurer / payer, admin costs | P4: Prior Auth Automation |
| Primary care clinic, access bottleneck | P5: Patient Triage Voice |
| Cancer center / rare disease | P6: Clinical Trial Matching |
| Public health LATAM, OpenMRS deployment | P7: Population Health |
| Mental health / LATAM WhatsApp-first | P8: Mental Health Screening |
| Pharma client, drug discovery | P9: Drug Discovery Pipeline |
| LATAM triage, diverse patient population | P10: Self-Evolving Triage |

---
*Updated by ingest pipeline.*
