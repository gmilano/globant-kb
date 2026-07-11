# 🎯 Top AI Agents — Healthcare

> Open source AI agents and tools for the healthcare industry. Focus: MIT / Apache 2.0 licenses — safe for Globant to build on.
> Last updated: 2026-07-11

## Featured Agents & Tools

| Name | Repo | License | Stars | Description |
|------|------|---------|-------|-------------|
| MedAgents | [urban-health-labs/MedAgents](https://github.com/urban-health-labs/MedAgents) | Apache-2.0 | ~2.9k | Multi-agent medical reasoning via LLM collaboration for complex clinical QA. ACL 2024. |
| TxAgent | [mims-harvard/TxAgent](https://github.com/mims-harvard/TxAgent) | MIT | 612 | Therapeutic reasoning agent (Harvard MIMS). 211 FDA-drug tools; 92.1% accuracy on drug reasoning, beats GPT-4o by 25.8%. arXiv:2503.10970 |
| ToolUniverse | [mims-harvard/ToolUniverse](https://github.com/mims-harvard/ToolUniverse) | MIT | 1.2k | 211-tool biomedical toolkit powering TxAgent: all FDA-approved drugs since 1939, Open Targets validated insights. |
| MedRAX | [bowang-lab/MedRAX](https://github.com/bowang-lab/MedRAX) | Apache-2.0 | ~500 | Medical Reasoning Agent for Chest X-ray (ICML 2025). Orchestrates CheXagent, LLaVA-Med, MedSAM, Maira-2, DenseNet-121. |
| CheXagent | [Stanford-AIMI/CheXagent](https://github.com/Stanford-AIMI/CheXagent) | Apache-2.0 | ~1.2k | Stanford AIMI instruction-tuned chest X-ray foundation model. Disease classification, findings generation, image-text matching. |
| MedAgentBench | [stanfordmlgroup/MedAgentBench](https://github.com/stanfordmlgroup/MedAgentBench) | MIT | ~400 | Realistic virtual EHR environment to benchmark medical LLM agents on clinical tasks (Stanford ML Group). |
| ClinicalAgent | [lingyue404/clinical-agent](https://github.com/lingyue404/clinical-agent) | MIT | ~150 | Clinical Trial Multi-Agent System with LLM reasoning for trial enrollment, drug-bank lookups, risk modeling. BCB'24. |
| agentic-healthcare-ai | [amitpuri/agentic-healthcare-ai](https://github.com/amitpuri/agentic-healthcare-ai) | MIT | ~200 | Reference demo: multi-agent healthcare AI covering scheduling, triage, radiology, prior auth using LangGraph + FHIR. |
| DrugAgent | [AI4Science-AI/DrugAgent](https://github.com/AI4Science-AI/DrugAgent) | Apache-2.0 | ~300 | Explainable drug repurposing agent using knowledge graphs + LLM reasoning across PubMed, DrugBank, ChEMBL. |
| Awesome-AI-Agents-Healthcare | [AgenticHealthAI/Awesome-AI-Agents-for-Healthcare](https://github.com/AgenticHealthAI/Awesome-AI-Agents-for-Healthcare) | CC-BY-4.0 | ~800 | Curated list tracking latest advances: medical imaging, EHR manipulation, counseling, drug discovery, patient dialogue agents. |

## Key Observations

- **TxAgent + ToolUniverse** is the strongest open source foundation for drug safety and therapeutic reasoning — MIT license, Harvard-backed, with 211 FDA-sourced tools ready to use.
- **MedRAX** is the go-to for radiology/imaging AI pipelines — Apache-2.0, ICML 2025, wraps the best imaging models in an agent architecture.
- **MedAgents** is the most cited multi-agent framework for general medical reasoning — Apache-2.0, ACL 2024, proven on complex QA benchmarks.
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
