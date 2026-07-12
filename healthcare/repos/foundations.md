# 🏗️ Foundational Repos — Healthcare

> The bases to build on. Open licenses, active communities. These are what you fork, extend, and add AI on top of.
> Last updated: 2026-07-12 (v10)

## EHR / Clinical Systems

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|----------|
| [openemr/openemr](https://github.com/openemr/openemr) | GPL-2.0 | ~3.3k | Most popular open source EHR: scheduling, billing, patient records, FHIR API. Used in 100+ countries. | ✅ FHIR R4 + REST hooks |
| [openmrs/openmrs-core](https://github.com/openmrs/openmrs-core) | MPL-2.0 | ~1.9k | Open medical record system, ~36M patient records, 40+ countries. Key in LATAM (Bolivia, Haiti, Peru). AI module: openmrs-esm-chartsearchai. | ✅ REST API + event system + FHIR module |
| [medplum/medplum](https://github.com/medplum/medplum) | Apache-2.0 | ~2.4k | FHIR-native cloud healthcare platform. React + TypeScript + Node. Best for building new AI-enabled apps. Updated July 11, 2026. | ✅ Native FHIR R4, subscriptions, bots |
| [hapifhir/hapi-fhir](https://github.com/hapifhir/hapi-fhir) | Apache-2.0 | ~2.1k | Most used Java FHIR server implementation. Powers many hospital integrations. Updated July 10, 2026. | ✅ Full FHIR R4/R5 server |
| [ohcnetwork/care](https://github.com/ohcnetwork/care) | MIT | ~500 | Digital Public Good EHR (India/international). ICU management, telehealth, COVID response tested. | ✅ REST API |
| [Bahmni/openmrs-distro-bahmni](https://github.com/Bahmni/openmrs-distro-bahmni) | GPL-3.0 | ~400 | Full hospital system for resource-constrained settings. Built on OpenMRS + OpenERP. Used in Nepal, India, LATAM. | ✅ via OpenMRS APIs |

## Clinical NLP

| Repo | License | Stars | Description | Use Case |
|------|---------|-------|-------------|----------|
| [medspacy/medspacy](https://github.com/medspacy/medspacy) | MIT | 667 | Clinical NLP with spaCy: section detection, NER, negation, temporal reasoning. | Parsing clinical notes |
| [apache/ctakes](https://github.com/apache/ctakes) | Apache-2.0 | 131 | Mayo Clinic NLP for clinical free text. Mature Apache TLP. NER, relation extraction, coreference. | EHR text mining |
| [maziyarpanahi/openmed](https://github.com/maziyarpanahi/openmed) | Apache-2.0 | ~4.0k | Local-first healthcare AI: clinical NER, HIPAA PII de-identification, medical coding. 1000+ medical models. | HIPAA-safe pipelines |

## Medical Imaging

| Repo | License | Stars | Description | Use Case |
|------|---------|-------|-------------|----------|
| [TorchIO-project/torchio](https://github.com/TorchIO-project/torchio) | Apache-2.0 | 2.4k | Medical imaging data augmentation, preprocessing for AI. Supports MRI, CT, PET. | Imaging data pipelines |
| [microsoft/hi-ml](https://github.com/microsoft/hi-ml) | MIT | 308 | HI-ML: deep learning toolbox for medical imaging. Azure integration. | Medical imaging ML |
| [bowang-lab/MedRAX](https://github.com/bowang-lab/MedRAX) | Apache-2.0 | ~993 | Medical Reasoning Agent for Chest X-ray (ICML 2025). Orchestrates 7 specialized models. | Radiology AI agents |
| [bowang-lab/MedRAX2](https://github.com/bowang-lab/MedRAX2) | Apache-2.0 | ~200 | MedRAX-2: extending unified agent architecture to multi-organ medical imaging. 2026. | Radiology AI (multi-organ) |
| [Stanford-AIMI/CheXagent](https://github.com/Stanford-AIMI/CheXagent) | Apache-2.0 | ~1.2k | Chest X-ray foundation model from Stanford AIMI. Multi-task: classification, findings generation. | Radiology foundation model |
| [CUHK-AIM-Group/MedSAM-Agent](https://github.com/CUHK-AIM-Group/MedSAM-Agent) | Apache-2.0 | ~120 | Interactive medical image segmentation with multi-turn agentic RL. 2026. | Interactive segmentation |

## AI Agents, Drug Discovery & Benchmarks

| Repo | License | Stars | Description | Use Case |
|------|---------|-------|-------------|----------|
| [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) | MIT | 30.7k | **Breakout 2026.** 148 skills + 100+ scientific databases. Drug discovery, genomics, chemistry. 160k+ scientist users. | Pharma/research agent skills |
| [urban-health-labs/MedAgents](https://github.com/urban-health-labs/MedAgents) | Apache-2.0 | ~2.9k | Multi-agent medical reasoning system for complex clinical QA via LLM collaboration. ACL 2024. | Clinical decision support |
| [mims-harvard/TxAgent](https://github.com/mims-harvard/TxAgent) | MIT | ~700 | Therapeutic reasoning agent with 211 FDA tools. Drug safety, interactions, treatment strategies. | Drug safety automation |
| [mims-harvard/ToolUniverse](https://github.com/mims-harvard/ToolUniverse) | MIT | ~1.3k | 211-tool biomedical toolkit: all FDA drugs since 1939 + Open Targets. Powers TxAgent. | Drug knowledge base |
| [wshi83/MedAgentGym](https://github.com/wshi83/MedAgentGym) | MIT | ~79 | ICLR'26. Training environment: 72k+ coding tasks from MIMIC-III/eICU. SFT + DPO support. | Agent training / fine-tuning |
| [yf-he/EvoClinician](https://github.com/yf-he/EvoClinician) | MIT | ~80 | Self-evolving diagnosis agent. Diagnose→Grade→Evolve test-time learning. arXiv Jan 2026. | Adaptive triage / diagnosis |
| [stanfordmlgroup/MedAgentBench](https://github.com/stanfordmlgroup/MedAgentBench) | MIT | ~500 | Realistic virtual EHR environment to benchmark medical LLM agents. | Agent evaluation |
| [glee4810/FHIR-AgentBench](https://github.com/glee4810/FHIR-AgentBench) | MIT | ~60 | Benchmarking LLM agents on realistic FHIR EHR question answering. 2026. | FHIR agent evaluation |
