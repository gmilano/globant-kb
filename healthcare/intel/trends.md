# 📡 Trends — Healthcare AI

> Last updated: 2026-07-12 (v10)

## Macro Trends (2026)

### 1. Ambient AI Scribes: Mass Adoption Reached
- Microsoft DAX Copilot at 600+ health systems. Google Ambient Assist. Epic-native ambient documentation in production.
- **Hard data**: Autonomous documentation agents have cut physician clerical time by 41% in live deployments. 60+ minutes/day saved per physician.
- **Tech stack**: Whisper (ASR) → medspacy/cTAKES (NER) → LLM (SOAP note generation) → FHIR DocumentReference write.
- **Status**: "Table stakes" — health systems without ambient AI are behind. 66% of providers face nursing vacancies, driving accelerated adoption.
- **LATAM note**: White-label ambient scribe on open stack (Whisper + Claude Haiku + OpenEMR) is competitive vs DAX Copilot for mid-market hospitals in Brazil/Mexico at 20% of cost.

### 2. Agentic Prior Authorization — Highest Near-Term ROI
- PA requests (historically 2-3 days) now resolved same-day with agentic AI. PrescriberPoint live in 2026: full lifecycle PA — script capture → payer approval → appeals → pharmacy routing.
- **Market**: AI Prior Authorization: $1.69B (2025) → $10.32B (2035), CAGR 19.92%. Clinicians spend 14+ hours/week on PA; agents cut this near-zero.
- **Stack**: Medplum FHIR + LangGraph coverage rules + Claude Haiku (criteria matching) + payer APIs → automated PA workflow.
- **Globant angle**: Agentic PA layer on any hospital EHR. ROI is immediate and measurable ($300-500 saved per automated PA request).

### 3. Self-Evolving Clinical Agents (Test-Time Learning)
- **EvoClinician** (arXiv Jan 2026): Diagnose→Grade→Evolve loop. Agent learns efficient diagnostic strategies at test time — no retraining. Actor agent + Process Grader (clinical yield + resource efficiency) + Evolver (prompt + memory evolution).
- **Why matters**: Healthcare AI historically fails in deployment because patient populations differ from training data. EvoClinician adapts in deployment.
- **Next wave**: Expect multiple architectures adopting test-time evolutionary learning — YAQIN (mental health, 2026), RexDrug (multi-drug combination reasoning).

### 4. LLM Agents Trained on Real Hospital Data (MedAgentGym era)
- **MedAgentGym** (ICLR'26): First gym-style training environment for medical coding agents. 72,413 tasks from MIMIC-III + eICU across 129 categories.
- SFT warm-up + DPO fine-tuning combination achieves best performance — especially for ICD-10 coding, lab interpretation, discharge summaries.
- Enables fine-tuned open models (Llama 3, MedGemma) to outperform GPT-4 on specific clinical tasks at 10% of API cost.
- **Signal**: ICLR'26 publication = credibility; enterprise healthcare AI teams already building on top.

### 5. Drug Discovery Acceleration via Agent Skills
- **scientific-agent-skills** (30.7k stars): 148 skills covering the entire drug discovery pipeline. 160k+ scientists using it. Integrates PubChem, ChEMBL, UniProt, ClinicalTrials.gov, RDKit, Scanpy, lab automation (Opentrons, Benchling, DNAnexus).
- AI compressing drug development timeline from years to months (BCG 2026). Target identification → compound screening → clinical trial matching → regulatory submission — each stage has AI agents now.
- **TxAgent** (Harvard MIMS): 211 FDA-sourced tools + LLM reasoning; 92.1% accuracy on therapeutic decision making, beats GPT-4o by 25.8%.
- **Next**: Autonomous lab agents that run wet lab experiments triggered by AI discoveries.

### 6. FHIR as the Universal AI Data Layer
- FHIR R4/R5 becoming the standard interface for all AI pipelines — replacing HL7 v2 integration headaches.
- Medplum, Ottehr, HAPI FHIR enabling FHIR-native architectures from day one. US Cures Act mandates FHIR API access (enforced 2026).
- AI agents subscribe to FHIR events (patient admitted, prescription written, encounter closed, lab resulted) as triggers → event-driven agentic healthcare.
- **FHIR-AgentBench** (2026) now provides standardized evaluation of LLM agents on realistic FHIR EHR tasks.

### 7. Multimodal Clinical AI: Text + Imaging + Genomics
- Moving beyond text: models that understand clinical notes + imaging + genomics + lab values simultaneously.
- Google Med-Gemini: 91.1% on MedQA (vs GPT-4's ~86%) — multimodal advantage. MedGemma open-weight for on-prem.
- **MedRAX-2**: Expanding from chest X-ray to multi-organ medical imaging agent (2026).
- **MedSAM-Agent**: Multi-turn agentic RL for interactive image segmentation — conversational radiology workflow.
- Meissa (2026): "Multi-modal Medical Agentic Intelligence" — comprehensive multimodal system.

### 8. EHR Benchmarking Maturation
- New benchmarks matching real clinical complexity: EHR-Complex (arXiv:2606.23301), PhysicianBench (arXiv:2605.02240), FHIR-AgentBench (2026).
- Previously benchmarks tested medical knowledge QA (MedQA, MedMCQA); now testing actual EHR workflow completion.
- Models that score well on MedQA ≠ models that work in real EHR environments. PhysicianBench exposing this gap.
- **Implication for Globant**: Always evaluate candidate models on task-specific benchmarks, not just generic medical QA.

### 9. Regulatory AI Compliance: EU AI Act + FDA SaMD
- EU AI Act high-risk provisions took effect Aug 2 2026 — medical AI classified high-risk. Audit trails, human oversight, explainability required.
- FDA AI/ML action plan: pre-market approval pathway for AI as Software as Medical Device (SaMD) evolving.
- **MedOpenClaw** (FreedomIntelligence): Auditable medical imaging agents — directly addresses explainability requirement.
- Opportunity: Globant can position as "compliance-first AI integrator" for healthcare clients navigating EU AI Act + ANVISA.

### 10. WhatsApp Health Agents in LATAM
- >90% WhatsApp penetration in Brazil/Colombia/Argentina → healthcare bots on WhatsApp are the primary patient interface.
- Medplum FHIR + WhatsApp Business API → conversational triage, medication reminders, follow-up scheduling.
- Mental health support (YAQIN-inspired) via WhatsApp in Portuguese/Spanish — massive underserved market.
- Telehealth regulatory frameworks now permanent across LATAM → enables AI-augmented video consultations at scale.
