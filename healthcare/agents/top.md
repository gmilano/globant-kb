# 🎯 Top AI Agents — Healthcare

> Open source AI agents and tools for the healthcare industry. Focus: MIT / Apache 2.0 licenses — safe for Globant to build on.
> Last updated: 2026-07-12 (v10)

## Featured Agents & Tools

| Name | Repo | License | Stars | Description |
|------|------|---------|-------|-------------|
| scientific-agent-skills | [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) | MIT | 30.7k | **Breakout 2026.** 148 skills + 100+ scientific databases (biology, chemistry, medicine, drug discovery). Used by 160k+ scientists worldwide. Works with Claude Code, Cursor, Codex, Google Antigravity. Covers PubChem, ChEMBL, UniProt, ClinicalTrials.gov, RDKit, Scanpy, lab automation (Opentrons, Benchling). |
| MedAgents | [urban-health-labs/MedAgents](https://github.com/urban-health-labs/MedAgents) | Apache-2.0 | ~2.9k | Multi-agent medical reasoning via LLM collaboration for complex clinical QA. ACL 2024. Most-cited multi-agent framework for general medical reasoning. |
| TxAgent | [mims-harvard/TxAgent](https://github.com/mims-harvard/TxAgent) | MIT | ~700 | Therapeutic reasoning agent (Harvard MIMS). 211 FDA-drug tools; 92.1% accuracy on drug reasoning, beats GPT-4o by 25.8%. arXiv:2503.10970 |
| ToolUniverse | [mims-harvard/ToolUniverse](https://github.com/mims-harvard/ToolUniverse) | MIT | ~1.3k | 211-tool biomedical toolkit powering TxAgent: all FDA-approved drugs since 1939, Open Targets validated insights. |
| MedRAX | [bowang-lab/MedRAX](https://github.com/bowang-lab/MedRAX) | Apache-2.0 | ~993 | Medical Reasoning Agent for Chest X-ray (ICML 2025). Orchestrates CheXagent, LLaVA-Med, MedSAM, Maira-2, DenseNet-121 in one agent. ChestAgentBench: 2,500 queries across 7 categories. |
| MedRAX-2 | [bowang-lab/MedRAX2](https://github.com/bowang-lab/MedRAX2) | Apache-2.0 | ~200 | Successor expanding beyond chest X-ray to multi-organ medical imaging. Released 2026. |
| MedAgentGym | [wshi83/MedAgentGym](https://github.com/wshi83/MedAgentGym) | MIT | ~79 | **ICLR'26.** First publicly available training environment for LLM agents on code-based medical reasoning. 72,413 task instances across 129 categories from MIMIC-III, eICU. SFT + DPO training support. |
| EvoClinician | [yf-he/EvoClinician](https://github.com/yf-he/EvoClinician) | MIT | ~80 | Self-evolving agent for multi-turn medical diagnosis via test-time evolutionary learning (arXiv Jan 2026). Diagnose→Grade→Evolve loop. Actor agent + Process Grader + Evolver. Learns efficient diagnostic strategies without retraining. |
| CheXagent | [Stanford-AIMI/CheXagent](https://github.com/Stanford-AIMI/CheXagent) | Apache-2.0 | ~1.2k | Stanford AIMI instruction-tuned chest X-ray foundation model. Disease classification, findings generation, image-text matching. |
| MedSAM-Agent | [CUHK-AIM-Group/MedSAM-Agent](https://github.com/CUHK-AIM-Group/MedSAM-Agent) | Apache-2.0 | ~120 | Interactive medical image segmentation with multi-turn agentic reinforcement learning (2026). Extends Segment Anything for medical imaging. |
| MedAgentBench | [stanfordmlgroup/MedAgentBench](https://github.com/stanfordmlgroup/MedAgentBench) | MIT | ~500 | Realistic virtual EHR environment to benchmark medical LLM agents on clinical tasks (Stanford ML Group). |
| FHIR-AgentBench | [glee4810/FHIR-AgentBench](https://github.com/glee4810/FHIR-AgentBench) | MIT | ~60 | Benchmarking LLM agents for realistic interoperable EHR question answering over FHIR data models. 2026. |
| DrugAgent | [AI4Science-AI/DrugAgent](https://github.com/AI4Science-AI/DrugAgent) | Apache-2.0 | ~300 | Explainable drug repurposing agent using knowledge graphs + LLM reasoning across PubMed, DrugBank, ChEMBL. |
| ClinicalAgent | [lingyue404/clinical-agent](https://github.com/lingyue404/clinical-agent) | MIT | ~150 | Clinical Trial Multi-Agent System with LLM reasoning for trial enrollment, drug-bank lookups, risk modeling. BCB'24. |
| agentic-healthcare-ai | [amitpuri/agentic-healthcare-ai](https://github.com/amitpuri/agentic-healthcare-ai) | MIT | ~200 | Reference demo: multi-agent healthcare AI covering scheduling, triage, radiology, prior auth using LangGraph + FHIR. |
| Awesome-AI-Agents-Healthcare | [AgenticHealthAI/Awesome-AI-Agents-for-Healthcare](https://github.com/AgenticHealthAI/Awesome-AI-Agents-for-Healthcare) | CC-BY-4.0 | ~900 | Curated list tracking latest advances: medical imaging, EHR manipulation, counseling, drug discovery, patient dialogue. |

## Key Observations (v10 — July 2026)

- **scientific-agent-skills** (30.7k stars, MIT) is the breakout find for healthcare/pharma: 148 skills covering the entire drug discovery pipeline — PubChem, ChEMBL, UniProt, ClinicalTrials.gov, RDKit, Scanpy, and lab automation (Opentrons, Benchling). Used by 160k+ scientists. Drop-in for Claude Code or any agent supporting Agent Skills standard. Build a pharma copilot in days.
- **MedAgentGym** (ICLR'26, MIT) is the new standard for training healthcare agents — 72k+ coding tasks from real hospital data (MIMIC-III, eICU). Use it to fine-tune models for ICD-10 coding, lab interpretation, and clinical reasoning workflows.
- **EvoClinician** introduces test-time evolutionary learning to medicine — agents that improve at diagnosis *during* deployment, without retraining. The Diagnose→Grade→Evolve loop is novel and production-viable.
- **TxAgent + ToolUniverse** remains the strongest open source foundation for drug safety and therapeutic reasoning — MIT, Harvard-backed, 211 FDA-sourced tools.
- **MedRAX** (ICML 2025) + **MedRAX-2** is the go-to for radiology AI pipelines — Apache-2.0, unified imaging agent architecture now expanding to multi-organ.
- All top agents integrate well with FHIR (via HAPI FHIR or Medplum) as the data layer.

## Clinical NLP Foundations (for agent tooling)

| Name | Repo | License | Stars | Use |
|------|------|---------|-------|-----|
| medspacy | [medspacy/medspacy](https://github.com/medspacy/medspacy) | MIT | 667 | Clinical NLP built on spaCy: section detection, NER, negation, temporal |
| cTAKES | [apache/ctakes](https://github.com/apache/ctakes) | Apache-2.0 | 131 | Mayo Clinic NLP for clinical text — mature Apache TLP, NER, relation extraction |
| openmed | [maziyarpanahi/openmed](https://github.com/maziyarpanahi/openmed) | Apache-2.0 | 4.0k | Local-first healthcare AI: clinical NER, HIPAA PII de-identification |
| torchio | [TorchIO-project/torchio](https://github.com/TorchIO-project/torchio) | Apache-2.0 | 2.4k | Medical imaging data augmentation and preprocessing for AI |
| hi-ml | [microsoft/hi-ml](https://github.com/microsoft/hi-ml) | MIT | 308 | Microsoft HI-ML: deep learning toolbox for medical imaging + Azure integration |

---
*Auto-updated by ingest pipeline.*
