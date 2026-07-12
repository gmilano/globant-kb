# 🧩 Composition Patterns — Healthcare

> Concrete recipes for building solutions combining repos + agents + AI.
> Last updated: 2026-07-12 (v11)

## Base Stack

```
[Vertical EHR Platform (OpenEMR / OpenMRS / CARE)]
          ↓
[HAPI FHIR — standard interoperability layer]
          ↓
[openmed — HIPAA de-identification + clinical NER]
          ↓
[Specialized Agents (MDAgents / CHA / MedRAX)]
          ↓
[Claude / MedGemma local — reasoning layer]
          ↓
[Conversational UI / REST API for client]
```

---

## Recipe 1: AI Ambient Scribe for LATAM Clinics

**Goal**: Automatically transcribe and structure medical consultations in Spanish/Portuguese, generating SOAP notes in OpenEMR.

**Key repos**:
- `openai/whisper` (MIT) — audio → text transcription
- `maziyarpanahi/openmed` (Apache-2.0) — HIPAA de-identification before sending to cloud
- Claude API (Anthropic) — structured SOAP note generation in ES/PT
- `openemr/openemr` (GPL-3.0) — FHIR ingest of generated note

**Wiring**:
```
Consultation audio → Whisper (transcription)
→ openmed (de-identify PHI before cloud send)
→ Claude API (prompt: "Generate SOAP note: {clean_text}")
→ FHIR DocumentReference → OpenEMR via REST API
```

**Estimated time**: 4-6 weeks MVP  
**Client ROI**: -65% physician documentation time

---

## Recipe 2: Multi-Agent Clinical Decision Support

**Goal**: Multi-agent clinical decision support system for complex cases (virtual MDTeam).

**Key repos**:
- `mitmedialab/MDAgents` (MIT) — multi-LLM clinical orchestration
- `hapifhir/hapi-fhir` (Apache-2.0) — FHIR R4 patient data access
- `medspacy/medspacy` (MIT) — entity extraction from clinical history
- `openmrs/openmrs-core` (MPL-2.0) — EHR data source
- Claude Sonnet 5 — "internist" agent + Haiku 4.5 — specialist agents (cardio, neuro, etc.)

**Wiring**:
```
Clinical case trigger (OpenMRS webhook)
→ HAPI FHIR: GET /Patient/{id}/everything
→ medspacy: extract entities (diagnoses, medications, labs)
→ MDAgents: assign team (solo vs. group based on complexity)
  → Internist Agent (Claude Sonnet): summary + hypothesis
  → Cardiologist / Neurologist Agent (Claude Haiku): specialist perspective
  → Critic Agent: evaluates evidence, requests more info if data gaps
→ Consensus → structured recommendation → OpenMRS note + physician alert
```

**Estimated time**: 8-10 weeks  
**Regulatory**: Requires clinical validation + ANVISA/COFEPRIS approval for diagnostic support

---

## Recipe 3: Automated Pharmacovigilance (ANVISA / COFEPRIS)

**Goal**: Automatically detect adverse drug event signals and generate regulatory reports.

**Key repos**:
- `jihyechoi77/malade` (MIT) — multi-agent RAG over FDA/ANVISA drug labels
- `langroid/langroid` (MIT) — underlying multi-agent framework of MALADE
- `openemr/openemr` (GPL-3.0) — prescription + history data source
- `hapifhir/hapi-fhir` (Apache-2.0) — structured MedicationRequest + AdverseEvent FHIR

**Wiring**:
```
OpenEMR: new prescriptions + follow-up notes (via FHIR webhook)
→ HAPI FHIR: GET /MedicationRequest + /Condition + /Observation
→ MALADE:
  Agent 1 (Researcher): finds ADE in drug label (RAG over FDA labels / ANVISA)
  Agent 2 (Pharmacovigilance): cross-references patient symptoms with known ADEs
  Agent 3 (Critic): evaluates causality (WHO-UMC scale)
→ If signal > threshold: generate structured MedDRA + E2B(R3) report
→ Alert physician + record in OpenEMR + optional send to ANVISA/COFEPRIS
```

**Estimated time**: 6-8 weeks  
**Differentiator**: Spanish/Portuguese support for LATAM regulatory reports

---

## Recipe 4: AI Radiology Pipeline

**Goal**: Automated chest X-ray analysis with structured report integrated in radiology workflow.

**Key repos**:
- `OHIF/Viewers` (MIT) — web DICOM viewer with plugin system
- `TorchIO-project/torchio` (Apache-2.0) — 3D medical image preprocessing
- `bowang-lab/MedRAX` (MIT) — multi-tool reasoning agent for chest X-ray
- `hapifhir/hapi-fhir` (Apache-2.0) — ImagingStudy + DiagnosticReport FHIR

**Wiring**:
```
DICOM upload (PACS / Orthanc) → DICOMweb endpoint
→ OHIF Viewer: display to radiologist
→ torchio: preprocessing + normalization → tensor
→ MedRAX:
  Tool 1: Pathology detection (pneumonia, effusion, cardiomegaly)
  Tool 2: Structure segmentation
  Tool 3: Comparison with prior studies (FHIR ImagingStudy history)
  Tool 4: Structured SNOMED/LOINC report generation
→ FHIR DiagnosticReport → HAPI FHIR → OpenEMR
→ OHIF Viewer overlay: findings with probabilities + marked areas
```

**Estimated time**: 10-12 weeks (includes radiologist validation)

---

## Recipe 5: Rural Healthcare Delivery (Salud Sin Fronteras)

**Goal**: AI support for rural LATAM clinics: triage, differential diagnosis, and referral without permanent connectivity.

**Key repos**:
- `uheal/imas` (MIT) — agentic framework for rural healthcare delivery
- `openmrs/openmrs-core` (MPL-2.0) — EHR adapted for low-resource settings
- `Institute4FutureHealth/CHA` (MIT) — conversational health agent
- `maziyarpanahi/openmed` (Apache-2.0) — on-device models without cloud (12 languages)
- MedGemma-4B (Apache-2.0, Google) — local model via Ollama

**Wiring**:
```
Health promoter (Android mobile, no stable internet)
→ CHA: guided symptom conversation (ES / PT / indigenous languages)
→ openmed on-device: local clinical NER, no PHI to cloud
→ IMAS: care plan based on PAHO/WHO protocols
→ MedGemma-4B (Ollama local): differential diagnosis
→ OpenMRS local (SQLite sync): EHR registration
→ When connected: sync to central OpenMRS + referral if needed
```

**Estimated time**: 12-16 weeks (includes field work + validation)  
**Social impact**: Healthcare coverage in zones without permanent physicians

---

## Recipe 6: Revenue Cycle Management (RCM) Automation

**Goal**: Automate prior authorization, coverage verification, and denial prediction for LATAM hospitals.

**Key repos**:
- `openemr/openemr` (GPL-3.0) — claims + clinical data source
- `hapifhir/hapi-fhir` (Apache-2.0) — Claim + CoverageEligibilityRequest FHIR
- Claude API — agent for form completion and denial prediction
- `medspacy/medspacy` (MIT) — diagnosis extraction for clinical justification

**Wiring**:
```
Physician creates order / prescription in OpenEMR
→ FHIR Claim draft: CoverageEligibilityRequest to insurer
→ RCM Agent:
  Sub-agent Eligibility: verifies coverage in real-time
  Sub-agent Justification: extracts DX + medspacy → generates medical letter
  Sub-agent Prior Auth: fills insurer form + predicts approval probability
  Sub-agent Denial Predictor: if high risk → suggests alternative codes
→ Dashboard: authorization status per order + alerts
→ If denied: Appeal Agent drafts appeal with evidence
```

**Estimated time**: 6-8 weeks  
**ROI**: 15-25% denial reduction + 70% less administrative time
