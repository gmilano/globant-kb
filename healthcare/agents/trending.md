# 📈 Trending AI Agents — Healthcare

> What's new and gaining traction this week in healthcare AI. Updated: 2026-07-12 (v10)

## Hot This Week

### 1. scientific-agent-skills — 30.7k Stars, 160k Scientists, Drug Discovery Pipeline
- **Repo**: [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) — MIT
- **Why now**: The #1 AI agent skills library for science, crossed 30k stars in mid-2026. 148 ready-to-use skills + 100+ scientific databases. Native compatibility with Claude Code, Cursor, Codex, Google Antigravity. Covers PubChem, ChEMBL, UniProt, ClinicalTrials.gov, RDKit, Scanpy, plus lab automation (Opentrons, Benchling, DNAnexus).
- **Signal**: "Used by 160,000+ scientists worldwide" per repo — viral growth in pharma and academic research communities. K-Dense BYOK (free, open-source AI co-scientist) released as companion.
- **Globant angle**: Drop this into Claude Code to give any pharma client a 148-skill drug discovery copilot. Works with any Agent Skills-compatible framework. Zero integration code.

### 2. EvoClinician — Self-Evolving Medical Diagnosis Agent (arXiv Jan 2026)
- **Repo**: [yf-he/EvoClinician](https://github.com/yf-he/EvoClinician) — MIT
- **Why now**: Novel architecture: Diagnose→Grade→Evolve loop. Actor agent attempts diagnosis; Process Grader evaluates each action for clinical yield AND resource efficiency; Evolver updates Actor's strategy by evolving its prompt + memory. Improves at test time — no retraining required.
- **Signal**: arXiv:2601.22964 — fast citations in 2026. Pattern is directly applicable to any multi-turn clinical dialogue.
- **Globant angle**: Build an adaptive triage agent for LATAM telehealth. MIT license, fully on-prem viable.

### 3. MedAgentGym — ICLR'26 Training Gym for Clinical LLM Agents
- **Repo**: [wshi83/MedAgentGym](https://github.com/wshi83/MedAgentGym) — MIT
- **Why now**: Accepted at ICLR 2026. First publicly available training environment for LLM medical coding agents. 72,413 task instances across 129 categories from MIMIC-III and eICU. Supports SFT warm-up + DPO fine-tuning.
- **Signal**: Already driving multiple follow-up fine-tuned model releases. ICD-10 coding, lab interpretation, clinical reasoning tasks all covered.
- **Globant angle**: Use to fine-tune open models (Llama, MedGemma) for LATAM hospital clients — specialized, cost-efficient agents for high-volume admin tasks.

### 4. MedSAM-Agent — Agentic RL for Medical Image Segmentation
- **Repo**: [CUHK-AIM-Group/MedSAM-Agent](https://github.com/CUHK-AIM-Group/MedSAM-Agent) — Apache-2.0
- **Why now**: Extends Segment Anything (SAM) with multi-turn agentic reinforcement learning for medical imaging. Interactive, iterative segmentation with conversational feedback loops.
- **Signal**: 2026 paper; growing citations from radiology AI community.
- **Globant angle**: Pair with Orthanc DICOM + OHIF Viewer for a full radiology workflow.

### 5. FHIR-AgentBench — Benchmarking LLM Agents on Real EHR Data
- **Repo**: [glee4810/FHIR-AgentBench](https://github.com/glee4810/FHIR-AgentBench) — MIT
- **Why now**: Benchmarks LLM agents on realistic FHIR-formatted EHR QA. Fills gap between generic medical QA and real-world EHR workflows.
- **Globant angle**: Use to select the right base model before deploying clinical decision support to hospital clients.

### 6. Agentic Prior Authorization Goes Live
- **What**: PrescriberPoint launched full lifecycle agentic PA in 2026 — script capture in EMR through payer approval, appeals, pharmacy routing.
- **Why now**: AI Prior Authorization Market: $1.69B (2025) → $10.32B (2035), CAGR 19.92%.
- **Open source stack**: Medplum FHIR + LangGraph + Claude Haiku + payer APIs → automated PA. Buildable in 6-8 weeks.
- **Globant angle**: $300-500 saved per automated PA request. Immediate, measurable ROI.

### 7. MedOpenClaw — Auditable Medical Imaging Agents
- **Repo**: [FreedomIntelligence/OpenClaw-Medical-Skills](https://github.com/FreedomIntelligence/OpenClaw-Medical-Skills)
- **Why now**: Auditable imaging agents — addresses the #1 regulatory concern (explainability) for FDA/ANVISA compliance.
- **Globant angle**: Use when hospital clients need audit trails for radiology AI decisions.

### 8. TxAgent v2 — Therapeutic Reasoning at Scale (Continuing Momentum)
- **Repo**: [mims-harvard/TxAgent](https://github.com/mims-harvard/TxAgent) — MIT
- **Why now**: NeurIPS CURE-Bench competition winner. 92.1% drug reasoning accuracy. Harvard MIMS + Microsoft Health partnership.
- **Globant angle**: FHIR-integrated drug safety layer on OpenEMR or Medplum — production-ready in 3-4 weeks.

---
*Pipeline auto-updated every hour.*
