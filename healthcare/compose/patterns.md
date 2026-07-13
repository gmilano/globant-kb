# 🧩 Composition Patterns — Healthcare AI

> Concrete recipes combining real repos + agents for healthcare solutions.
> Last updated: 2026-07-13 (v12)

## Base Architecture

```
[EHR Platform (OpenEMR / Medplum / OpenMRS)]
                    ↓ FHIR R4 API
           [HAPI FHIR Server]
                    ↓
           [openmed — on-device NLP + PII scrubbing]
                    ↓
    [AI Agents Layer (MDAgents / EHRAgent)]
                    ↓
    [Evaluation (MedAgentBench / PhysicianBench)]
                    ↓
        [UI / API (Medplum React / OpenEMR modules)]
```

---

## Recipe 1 — AI Ambient Scribe (US Primary Care)

**Goal**: Reduce physician documentation time by 40%+ using open-source ambient transcription + auto-note generation.

**Stack**:
- **Base EHR**: [medplum/medplum](https://github.com/medplum/medplum) (Apache-2.0) — FHIR-native, HIPAA-compliant
- **Transcription**: [openai/whisper](https://github.com/openai/whisper) (MIT) — self-hosted for PHI-safe audio
- **NLP Pipeline**: [maziyarpanahi/openmed](https://github.com/maziyarpanahi/openmed) (Apache-2.0) — clinical NER + PII scrubbing before any LLM call
- **Note Generation**: MDAgents-style orchestration → GPT-4o / Claude Sonnet via API after PII removal
- **FHIR Write-back**: HAPI FHIR server writes structured note as FHIR DocumentReference

**Wiring**:
```python
# Simplified flow
audio = capture_encounter_audio()
transcript = whisper.transcribe(audio)  # self-hosted
clean_transcript = openmed.scrub_pii(transcript)  # PHI removed
clinical_note = claude.generate_soap_note(clean_transcript)
fhir_client.create_document_reference(note=clinical_note, patient_id=patient_fhir_id)
```

**Timeline**: 8–12 weeks | **Est. ROI**: 40% documentation reduction = ~2hrs/physician/day saved

---

## Recipe 2 — Prior Authorization Agent (Revenue Cycle Automation)

**Goal**: Automate prior authorization submission and tracking, reducing manual work by 70% and approval time from 3 days to 4 hours.

**Stack**:
- **EHR Data Source**: [openemr/openemr](https://github.com/openemr/openemr) (GPL-2.0) FHIR API for patient + procedure data
- **Agent Framework**: [mitmedialab/MDAgents](https://github.com/mitmedialab/MDAgents) (MIT) — multi-agent for payer-specific rule application
- **Computer Use**: Claude computer-use or Playwright for payer portal navigation
- **Clinical NLP**: [medspacy/medspacy](https://github.com/medspacy/medspacy) (MIT) — extract clinical criteria from notes
- **Audit Layer**: MedBeads pattern (immutable log of every AI action for compliance)

**Wiring**:
```
OpenEMR FHIR → extract [procedure, diagnosis, clinical notes]
                    ↓
medspacy: extract [medical necessity criteria, ICD-10/CPT codes]
                    ↓
MDAgents: [payer-rules-agent] + [clinical-criteria-agent] → prior auth package
                    ↓
computer-use agent: submit to payer portal + monitor status
                    ↓
OpenEMR: write authorization number + status back via FHIR
```

**Timeline**: 10–14 weeks | **Est. ROI**: 60-70% prior auth automation = $180K/year for 5-physician practice

---

## Recipe 3 — Multi-Agent Clinical Decision Support (MDAgents Pattern)

**Goal**: Deploy multi-LLM collaboration for complex differential diagnosis, matching specialist-level reasoning without specialist referral for common cases.

**Stack**:
- **Framework**: [mitmedialab/MDAgents](https://github.com/mitmedialab/MDAgents) (MIT)
- **EHR Context**: [wshi83/EhrAgent](https://github.com/wshi83/EhrAgent) (MIT) — retrieves relevant patient history from FHIR EHR
- **Evidence Retrieval**: [ninglab/KGARevion](https://github.com/ninglab/KGARevion) (MIT) — knowledge-graph RAG over clinical literature
- **Safety Check**: [ShenghaiRong/MALADE](https://github.com/ShenghaiRong/MALADE) (MIT) — drug interaction verification
- **Evaluation**: [stanfordmlgroup/MedAgentBench](https://github.com/stanfordmlgroup/MedAgentBench) (MIT)

**Agent Roles** (MDAgents pattern):
```
Clinical Query Input
       ↓
EHRAgent: fetch relevant patient history from FHIR
       ↓
[Diagnostic Team — MDAgents adaptive assembly]
  ├── Internist LLM: primary differential
  ├── Specialist LLM: domain-specific reasoning
  └── KGARevion RAG: evidence-based guidelines
       ↓
MALADE: drug safety check on proposed treatments
       ↓
Synthesis: final recommendation + confidence + sources
       ↓
MedAgentBench: automated evaluation before deployment
```

**Timeline**: 12–16 weeks | **Applicability**: Hospital systems, specialist clinics, telemedicine

---

## Recipe 4 — LATAM Community Health Worker Copilot (OpenMRS + WhatsApp)

**Goal**: Give community health workers (CHW) in rural Brazil/Colombia/Peru an AI copilot via WhatsApp to improve triage accuracy and care coordination.

**Stack**:
- **EHR**: [openmrs/openmrs-core](https://github.com/openmrs/openmrs-core) (MPL-2.0) — community health data
- **CHW Copilot Agent**: [LLM4IMAS/IMAS](https://github.com/LLM4IMAS/IMAS) (MIT) — low-resource multi-agent pipeline
- **On-Device NLP**: [maziyarpanahi/openmed](https://github.com/maziyarpanahi/openmed) (Apache-2.0) — clinical NLP in Portuguese/Spanish, no cloud
- **Messaging**: WhatsApp Business API → FastAPI bridge → IMAS agent
- **Clinical Data**: OpenMRS FHIR module for patient record access
- **Digital Public Good**: [ohcnetwork/care_fe](https://github.com/ohcnetwork/care_fe) (MIT) for facility management

**Flow**:
```
CHW sends symptom report via WhatsApp (PT/ES)
       ↓
openmed: clinical NER + PII check (on-device)
       ↓
IMAS: [triage-agent] → severity classification
      [referral-agent] → nearest facility recommendation
      [protocol-agent] → ministry-of-health protocol lookup
       ↓
OpenMRS: log encounter + update patient record via FHIR
       ↓
WhatsApp: response to CHW in local language
```

**Timeline**: 8–12 weeks | **Languages**: Portuguese, Spanish | **Connectivity**: Works on 2G (async queue)

---

## Recipe 5 — Radiology AI Second Read (Open-Source Stack)

**Goal**: AI-assisted second read for chest X-rays and CT scans, flagging critical findings for radiologist review — reducing missed findings.

**Stack**:
- **Viewer**: [OHIF/Viewers](https://github.com/OHIF/Viewers) (MIT) — DICOM web viewer
- **AI Framework**: [Project-MONAI/MONAI](https://github.com/Project-MONAI/MONAI) (Apache-2.0) — medical imaging AI
- **3D Preprocessing**: [TorchIO-project/torchio](https://github.com/TorchIO-project/torchio) (Apache-2.0) — 3D transforms + augmentation
- **Report Agent**: [bowang-lab/MedRAX](https://github.com/bowang-lab/MedRAX) (MIT) — multimodal RAG for radiology report generation
- **FHIR Integration**: HAPI FHIR for DiagnosticReport resource creation

**Architecture**:
```
DICOM Study arrives
       ↓
torchio: preprocess 3D volume (normalization, resampling)
       ↓
MONAI model: auto-segmentation + finding detection
       ↓
OHIF Viewer: overlay findings as annotations
       ↓
MedRAX: generate structured radiology report draft
       ↓
HAPI FHIR: create DiagnosticReport resource
       ↓
Radiologist: review + sign in OHIF
```

**Timeline**: 12–20 weeks (includes model training/fine-tuning) | **ROI**: 25-35% radiologist throughput increase

---

## Recipe 6 — OpenEMR + AI for Small Practice (LATAM SMB)

**Goal**: AI-powered practice management for small clinics in Brazil/Mexico/Argentina — affordable, deployable on local server, LGPD/NOM-compliant.

**Stack**:
- **EHR**: [openemr/openemr](https://github.com/openemr/openemr) (GPL-2.0) — free, self-hosted, ONC-certified
- **AI Module**: [maziyarpanahi/openmed](https://github.com/maziyarpanahi/openmed) (Apache-2.0) — on-device, no cloud costs
- **Appointment Agent**: Simple LangGraph agent on LangChain for scheduling optimization
- **Billing Agent**: ICD-10 code suggestion agent using medspacy + clinical note parsing
- **Deploy**: Docker Compose on local server (no cloud dependency)

**Modules Activated**:
```
OpenEMR core (scheduling + billing + clinical notes)
       ↓
openmed module (clinical NER, auto-coding suggestions)
       ↓
Appointment-AI: schedule optimization + patient reminders via WhatsApp
Billing-AI: ICD-10/procedure code validation before claim submission
Note-AI: SOAP note auto-draft from quick symptom input
```

**Timeline**: 6–8 weeks | **Cost**: $0 software + server (~$200/month)

---

## Recipe 7 — Clinical AI Evaluation Harness (Enterprise)

**Goal**: Before deploying any clinical AI product, run it through a standardized evaluation pipeline to meet health system procurement requirements.

**Stack**:
- **Primary Eval**: [stanfordmlgroup/MedAgentBench](https://github.com/stanfordmlgroup/MedAgentBench) (MIT) — EHR agent task completion
- **Clinical Tasks**: [HealthRex/PhysicianBench](https://github.com/HealthRex/PhysicianBench) (MIT) — 100 tasks, 21 specialties
- **LLM Comparison**: [nyuolab/clinical-llm-benchmarks](https://github.com/nyuolab/clinical-llm-benchmarks) (MIT) — general vs. specialized
- **Safety Check**: HealthBench scores (via OpenAI API) for baseline safety
- **Reporting**: Custom CI/CD pipeline generating clinical AI scorecard

**Output**: Clinical AI Scorecard per model/agent version:
- MedAgentBench task completion rate
- PhysicianBench specialty coverage
- Hallucination rate (HealthBench)
- FHIR tool use accuracy
- Safety refusal rate

**Timeline**: 4–6 weeks to set up harness | **Ongoing**: Run on every model/agent update

---

## Recipe 8 — Pharmacovigilance Agent (Pharma / CDISC)

**Goal**: AI agent that continuously monitors post-market drug safety signals from FDA FAERS, medical literature, and clinical notes.

**Stack**:
- **Core Agent**: [ShenghaiRong/MALADE](https://github.com/ShenghaiRong/MALADE) (MIT) — AUC 0.90 on drug-AE detection (NeurIPS 2024)
- **Evidence Retrieval**: KGARevion (Harvard) — knowledge graph over drug interaction databases
- **NLP**: openmed (Apache-2.0) — clinical note NER for adverse event extraction
- **Data Sources**: FDA FAERS (public), PubMed, clinical trial registries
- **Reporting**: FHIR AdverseEvent resources

**Timeline**: 8–12 weeks | **Applicability**: Pharma companies, large health systems, CROs

---
*Auto-updated by the ingest pipeline.*
