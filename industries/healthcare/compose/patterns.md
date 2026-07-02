# Healthcare AI Compose Patterns

> Concrete recipes for Globant engagements. Names the specific repos, how to wire them, and what to build.

---

## Pattern 1: Ambient Clinical Documentation Agent

**Problem**: Physicians spend 2-3 hours/shift on documentation. Client wants ambient AI scribe.

**Stack**:
```
Audio Capture
    └── Whisper (openai/whisper, MIT) — real-time transcription
    └── pyannote/audio (MIT) — speaker diarization (doctor vs patient)
Transcript Processing
    └── Meditron-70B (epfLLM/meditron, Apache 2.0) OR
        LangChain (langchain-ai/langchain, MIT) + any HIPAA-compliant LLM
    └── Prompt: clinical note structure (SOAP: Subjective/Objective/Assessment/Plan)
Output
    └── OpenEMR REST API (openemr/openemr) — write structured note
        OR HAPI FHIR (hapifhir/hapi-fhir, Apache 2.0) — write as FHIR DocumentReference
```

**Wiring**:
1. Deploy Whisper on-prem (GPU) for PHI compliance
2. Run pyannote for turn-by-turn diarization
3. Feed transcript to Meditron-70B with SOAP prompt template
4. POST generated note to OpenEMR `/api/note` endpoint
5. Physician reviews + signs in OpenEMR UI

**Time to MVP**: 4-6 weeks | **Key risk**: HIPAA compliance requires on-prem or BAA-signed cloud

---

## Pattern 2: Multi-Agent Clinical Reasoning (Diagnostic Support)

**Problem**: Complex case with multiple specialists needed. Client wants AI differential diagnosis support.

**Stack**:
```
Patient Data Retrieval
    └── HAPI FHIR (hapifhir/hapi-fhir, Apache 2.0) — pull patient history
    └── OpenMRS FHIR2 module — structured clinical data
Orchestration
    └── LangGraph (langchain-ai/langgraph, MIT) — agent state machine
    OR CrewAI (joaomdmoura/crewAI, MIT) — role-based agent crews
Specialist Agents (each is a persona-prompted LLM)
    └── PCP Agent — synthesizes overall history
    └── Specialist Agent (e.g., Cardiologist) — focused diagnostic reasoning
    └── Pharmacist Agent — drug interaction checks
    └── Radiologist Agent — interprets imaging report text
LLM Backend
    └── Meditron-70B (Apache 2.0) — on-prem for PHI
        OR GPT-4 via Azure OpenAI (BAA available) for cloud deployments
Output
    └── Structured differential diagnosis + confidence + evidence citations
    └── Written to FHIR DiagnosticReport resource
```

**Wiring** (LangGraph):
```python
# Simplified sketch
from langgraph.graph import StateGraph
from langchain_community.llms import HuggingFacePipeline  # Meditron

graph = StateGraph(ClinicalState)
graph.add_node("fetch_fhir", fetch_patient_fhir_data)
graph.add_node("pcp_agent", run_pcp_analysis)
graph.add_node("specialist_agent", run_specialist_analysis)
graph.add_node("synthesis", synthesize_differential)
graph.add_edge("fetch_fhir", "pcp_agent")
graph.add_edge("pcp_agent", "specialist_agent")
graph.add_edge("specialist_agent", "synthesis")
```

**Time to MVP**: 8-12 weeks | **Key risk**: Hallucination safety — always present as decision support, not decision maker

---

## Pattern 3: AI Radiology Assistant

**Problem**: Radiologist needs AI-assisted analysis of CT/MRI scans with auto-report generation.

**Stack**:
```
DICOM Ingestion
    └── pydicom (pydicom/pydicom, MIT) — read DICOM files
    └── OHIF Viewers (OHIF/Viewers, MIT) — web-based review UI
AI Analysis
    └── MONAI Core (Project-MONAI/MONAI, Apache 2.0) — segmentation + detection models
    └── MONAI Model Zoo — pre-trained models: organ segmentation, lesion detection
    └── MONAI Label — active learning for annotation if custom model needed
Report Generation
    └── BioGPT (microsoft/BioGPT, MIT) — structured radiology report text generation
        OR Meditron-70B with radiology report prompts
Integration
    └── OHIF extension plugin — overlay AI findings on viewer
    └── HAPI FHIR — output as FHIR ImagingStudy + DiagnosticReport
```

**Wiring**:
1. DICOM study arrives via DICOMweb (WADO-RS)
2. MONAI inference pipeline runs segmentation (organ/lesion)
3. Findings serialized as FHIR ImagingStudy annotations
4. BioGPT generates draft radiology report from structured findings
5. Report displayed in OHIF AI panel for radiologist review + sign-off

**Time to MVP**: 10-14 weeks | **Key risk**: FDA SaMD clearance if used for diagnosis (position as decision support)

---

## Pattern 4: FHIR-Native Prior Authorization Agent

**Problem**: Prior auth is 45+ minutes per request for staff. Client wants AI-automated prior auth.

**Stack**:
```
Trigger
    └── CDS Hooks (CDS Hooks spec) — intercept ordering event in Epic/Cerner
Data Retrieval
    └── SMART on FHIR — access patient record with provider OAuth
    └── HAPI FHIR — retrieve relevant clinical history
Policy Matching Agent
    └── LangChain ReAct agent (langchain-ai/langchain, MIT)
    └── RAG over payer coverage policies (vector DB: qdrant/qdrant, Apache 2.0)
    └── Meditron or BioGPT for clinical text interpretation
Prior Auth Submission
    └── Da Vinci PAS FHIR IG — standard for electronic prior auth
    └── X12 278 transaction (US payer standard)
Output
    └── Auto-populated prior auth form with clinical evidence
    └── CDS Hook suggestion card returned to EHR UI
```

**Time to MVP**: 12-16 weeks | **High ROI**: 45 min → 2 min per request; measurable labor savings

---

## Pattern 5: Population Health Intelligence Agent

**Problem**: Health system needs to identify high-risk patients for proactive outreach.

**Stack**:
```
Data Layer
    └── HAPI FHIR Bulk Data export — extract population dataset
    └── OpenMRS reporting module — aggregate clinical metrics
Risk Modeling
    └── scikit-learn / XGBoost — readmission risk, chronic disease progression
    └── MONAI — imaging-based risk stratification if imaging data available
Agent Orchestration
    └── LangChain agent — natural language querying over population dataset
    └── Pandas + DuckDB — fast in-process analytics
Outreach Integration
    └── OpenEMR patient portal API — generate care gap notifications
    └── Twilio / messaging layer — automated outreach workflows
```

**Wiring**:
```python
# Population health agent example
agent = create_react_agent(
    llm=meditron_llm,
    tools=[
        FHIRBulkDataTool(fhir_server="https://client-fhir.hospital.org"),
        PandasAnalyticsTool(population_df=df),
        RiskScoringTool(model=readmission_model),
    ]
)
result = agent.invoke({"input": "Identify diabetic patients overdue for HbA1c with last reading >8.0"})
```

**Time to MVP**: 6-8 weeks | **Key metric**: Reduction in preventable readmissions, care gap closure rate

---

## Cross-Pattern Infrastructure Notes

| Component | Recommended OSS | License | Notes |
|-----------|----------------|---------|-------|
| LLM inference | vLLM (vllm-project/vllm) | Apache 2.0 | High-throughput serving for Meditron/BioMedLM |
| Vector store | Qdrant (qdrant/qdrant) | Apache 2.0 | Best for medical document RAG |
| Agent framework | LangGraph or CrewAI | MIT | LangGraph for complex state machines; CrewAI for role-based teams |
| Observability | LangSmith or Arize Phoenix | Apache 2.0 | Agent trace visibility — critical for clinical AI auditing |
| FHIR server | HAPI FHIR | Apache 2.0 | Use as data hub regardless of source EHR |
| Containerization | Docker + Helm | Apache 2.0 | MONAI and HAPI FHIR have official Helm charts |
