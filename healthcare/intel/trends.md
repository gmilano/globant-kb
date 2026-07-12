# 📡 Trends — Healthcare AI

> Last updated: 2026-07-12 (v11)

## Macro-trends 2026

### 1. Agentic AI as the New Clinical Standard
- 80%+ of health executives expect moderate-to-significant value from agentic AI in 2026
- Shift from simple chatbots → multi-step agents completing full clinical workflows
- Mayo Clinic, Mount Sinai already deploying agents in production for triage + documentation
- Deloitte 2026: agentic AI as part of "hybrid healthcare workforce"

### 2. FHIR-Native as Prerequisite for AI Interoperability
- OpenEMR v8.0.0 (March 2026): SMART on FHIR v2.2, USCDI v5 — clinical data accessible via standard APIs
- FHIR-AgentBench: first benchmark of LLM agents on EHR interoperability via FHIR APIs
- MedAgentBench (Stanford, NEJM AI): evaluates LLMs on real FHIR tasks — Claude 3.5 Sonnet v2 leads at 69.67%
- Implication: non-FHIR-native projects become obsolete within 12-18 months

### 3. On-Device AI for HIPAA / LGPD Compliance
- openmed (Apache-2.0): 1,500+ medical models running on-device. iOS, Android, GPU, CPU.
- MedGemma / TxGemma (Google, Apache-2.0): multimodal medical models available via Ollama local
- LATAM hospitals without robust cloud infrastructure = ideal use case for on-device AI
- Zero PHI to cloud = elimination of regulatory risk → adoption accelerator

### 4. Ambient Clinical Intelligence (AI Scribing)
- Nuance DAX (Microsoft) leading in US; LATAM opportunity with open-source solution
- Stack: Whisper (transcription) + openmed (de-identification) + LLM (SOAP note) + OpenEMR (FHIR ingest)
- Reduces administrative burden 60-70% in pilot studies
- Trend: from note scribing → order scribing + automatic prior authorization

### 5. Multi-Agent Clinical Reasoning
- MDAgents (NeurIPS'24): team of LLMs collaborating as "virtual medical committee"
- MDTeamGPT: multi-disciplinary team simulation for complex cases
- LungNoduleAgent: specialized agent panel by nodule type
- MESHAgents: multi-agent for cardiovascular imaging phenotype analysis
- Pattern: complex clinical problem → multiple specialist LLMs → consensus → recommendation

### 6. Automated Pharmacovigilance
- MALADE: multi-agent RAG over FDA labels → ADE extraction with AUC-ROC 0.90
- LATAM regulators (ANVISA, COFEPRIS) pressing for faster adverse event reporting
- Opportunity: automate 80% of signal detection process in pharmacovigilance

### 7. Benchmarking as Adoption Driver
- MedAgentBench (Stanford) → NEJM AI: brings clinical AI into peer-reviewed mainstream
- CHI-Bench: end-to-end healthcare workflow benchmarks
- CP-Env: controllable hospital virtual environment for policy compliance evaluation
- Best models in clinical benchmarks → enterprise contracts → virtuous cycle

### 8. AI for Rural Health & Low-Resource Settings
- IMAS: agentic framework for rural healthcare delivery
- OpenMRS multilingual + CHA + MedGemma local = rural clinic with AI support without permanent internet
- LATAM: 40% of population in zones without specialist access
- Regulations like Chile Ley 21.545 (mental health) + SUS expansion (Brazil) create demand

### 9. Revenue Cycle Management (RCM) Automation
- Prior authorization: 30% of physician administrative time in US; LATAM similar
- Agents over OpenEMR: auto-fill forms, verify eligibility, predict denials
- Immediate measurable ROI: perfect first engagement with hospitals

### 10. Genomics + Precision Medicine AI
- TxGemma: pharmacological model for therapy prediction
- PathGen-1.6M: 1.6M pathology image-text pairs for model training
- STELLA (zaixizhang): self-evolving LLM agent for biomedical research automation
- Precision oncology + pharmacogenomics = premium market in LATAM (Brazil, Argentina)

## Most Active Repos This Week (July 2026)

- [maziyarpanahi/openmed](https://github.com/maziyarpanahi/openmed) — OpenMedKit mobile launch
- [mitmedialab/MDAgents](https://github.com/mitmedialab/MDAgents) — featured in Deloitte Agentic AI Report 2026
- [ohcnetwork/care_fe](https://github.com/ohcnetwork/care_fe) — July sprint: AI triage + telemedicine
- [bowang-lab/MedRAX](https://github.com/bowang-lab/MedRAX) — OHIF Viewer integration
- [yhzhu99/HealthFlow](https://github.com/yhzhu99/HealthFlow) — PubMed/ClinicalTrials.gov preprint
