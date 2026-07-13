# 🎯 Top AI Agents — Healthcare

> Open-source AI agents and tools for the healthcare industry. Focus: MIT / Apache 2.0.
> Last updated: 2026-07-13 (v12)

## Featured Agents & Tools

| Name | License | Repo | Description | Stars |
|------|---------|------|-------------|-------|
| [openmed](https://github.com/maziyarpanahi/openmed) | Apache-2.0 | maziyarpanahi/openmed | Local-first healthcare AI: clinical NER & HIPAA PII de-identification. Runs 100% on-device. 1,000+ medical models, 12 languages, Apple MLX + Python. No cloud, no patient data leaving the network. | ~4k |
| [MDAgents](https://github.com/mitmedialab/MDAgents) | MIT | mitmedialab/MDAgents | Adaptive Collaboration of LLMs for Medical Decision-Making. NeurIPS 2024 paper from MIT Media Lab. Dynamically assigns multi-LLM collaboration structures for the complexity of each medical task. Endorsed by Deloitte 2026 for production readiness. | ~900 |
| [EHRAgent](https://github.com/wshi83/EhrAgent) | MIT | wshi83/EhrAgent | EMNLP 2024 — Code-Empowered Large Language Models for Complex Tabular Reasoning on Electronic Health Records. Generates and executes code to answer clinical queries over structured EHR data. | ~550 |
| [MedAgentBench](https://github.com/stanfordmlgroup/MedAgentBench) | MIT | stanfordmlgroup/MedAgentBench | Stanford / NEJM AI benchmark: realistic virtual EHR environment to evaluate medical LLM agents on clinical tasks (order entry, result interpretation, care coordination). Gold standard for EHR-agent evaluation in 2026. | ~400 |
| [openmed-agent](https://github.com/openmed-labs/openmed-agent) | MIT | openmed-labs/openmed-agent | Terminal-native clinical workspace for AI agents: prior authorization review, appeal review, coding audit, consumer health summaries, care coordination, and clinical documentation — all in the terminal with sandboxed execution. | ~200 |
| [PhysicianBench](https://github.com/HealthRex/PhysicianBench) | MIT | HealthRex/PhysicianBench | Evaluating LLM Agents in Real-World EHR Environments (arXiv 2605.02240, 2026). 100 long-horizon tasks, 670 sub-checkpoints, 21 specialties, executed in an EHR environment with real patient records via FHIR APIs. Stanford HealthRex. | ~180 |
| [torchio](https://github.com/TorchIO-project/torchio) | Apache-2.0 | TorchIO-project/torchio | Medical imaging AI toolkit: 3D transforms, augmentation, preprocessing for MRI/CT/PET. PyTorch-native, widely used in radiology AI pipelines. | 2.4k |
| [medspacy](https://github.com/medspacy/medspacy) | MIT | medspacy/medspacy | Clinical NLP library built on spaCy. Section detection, negation, context assertion, temporal reasoning for clinical text (physician notes, discharge summaries). | 667 |
| [ClinicalBERT / clinical-llm-benchmarks](https://github.com/nyuolab/clinical-llm-benchmarks) | MIT | nyuolab/clinical-llm-benchmarks | NYU benchmark suite tracking general vs. specialized LLM performance on clinical tasks — informed by Nature Medicine 2026 finding that general GPT-class models outperform most specialized clinical AI tools. | ~150 |
| [Awesome-AI-Agents-for-Healthcare](https://github.com/AgenticHealthAI/Awesome-AI-Agents-for-Healthcare) | CC-BY | AgenticHealthAI/Awesome-AI-Agents-for-Healthcare | Curated index: latest advances in agentic AI for healthcare. Covers papers, repos, benchmarks (MedAgentBench, PhysicianBench, PhysAssistBench, EHR-Complex, ClinEnv, HealthAdminBench) and application areas. Essential starting resource. | ~1.2k |

## Additional Notable Agents (from prior KB versions, still relevant)

| Name | License | Repo | Description |
|------|---------|------|-------------|
| [MALADE](https://github.com/ShenghaiRong/MALADE) | MIT | ShenghaiRong/MALADE | Multi-agent pharmacovigilance: orchestrating LLMs to detect drug-adverse-event associations (AUC 0.90). NeurIPS 2024. |
| [IMAS](https://github.com/LLM4IMAS/IMAS) | MIT | LLM4IMAS/IMAS | Intelligent Medical Agent System for rural/low-resource healthcare. Multi-agent pipeline from symptom triage to specialist routing. |
| [HealthFlow](https://github.com/healthflow-ai/healthflow) | MIT | healthflow-ai/healthflow | LangGraph-based multi-agent healthcare workflow: intake → triage → documentation → billing. |
| [KGARevion](https://github.com/ninglab/KGARevion) | MIT | ninglab/KGARevion | Harvard/NingLab — Knowledge-Graph-Augmented RAG for clinical evidence retrieval & verification. |
| [ReflecTool](https://github.com/med-llm/ReflecTool) | MIT | med-llm/ReflecTool | Self-reflective medical reasoning agent: generates, critiques, and revises clinical responses iteratively. |
| [MedRAX](https://github.com/bowang-lab/MedRAX) | MIT | bowang-lab/MedRAX | Multi-modal RAG for radiology: chest X-ray + clinical notes + literature retrieval for diagnostic support. |

## 2026 Benchmark Landscape

| Benchmark | Focus | Key Result |
|-----------|-------|------------|
| **HealthBench** (OpenAI, 2025) | 5,000 multi-turn clinical conversations, 262 clinicians, 60 countries | GPT-4o/o3 lead; specialist benchmarks still show gaps |
| **HealthBench Professional** (OpenAI, 2026) | Real clinician tasks — diagnosis, treatment recommendations | Launched alongside ChatGPT for Clinicians |
| **MedAgentBench** (Stanford/NEJM AI) | Virtual EHR task completion | Best agents solve ~60% of complex EHR tasks |
| **PhysicianBench** (HealthRex/Stanford, 2026) | 100 tasks, 21 specialties, real FHIR EHR | Long-horizon reasoning remains biggest gap |
| **PhysAssistBench** (arXiv 2606.18613, 2026) | Implicit queries + patient interaction + FHIR tool use | Only benchmark covering all 4 dimensions together |
| **EHR-Complex** (arXiv 2606.23301, 2026) | Complex clinical reasoning in EHR | Agents score 35-50% vs 85%+ for clinicians |
| **HealthAdminBench** (arXiv 2604.09937, 2026) | Computer-use agents on admin tasks (scheduling, billing) | 70%+ automation rate achievable |

---
*Auto-updated by the ingest pipeline.*
