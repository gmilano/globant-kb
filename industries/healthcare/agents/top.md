# Top Open Source AI Agents for Healthcare

> Last updated: 2026-07-02 | Focus: MIT / Apache 2.0 / BSD — licenses Globant can build on

## AI Agents & LLMs

| Agent | Repo | License | Stars | Description |
|-------|------|---------|-------|-------------|
| Meditron | [epfLLM/meditron](https://github.com/epfLLM/meditron) | Apache 2.0 | 5k+ | Suite of open medical LLMs (7B/70B) adapted from Llama-2 on PubMed, clinical guidelines, and medical Q&A. Best open model for clinical reasoning tasks. |
| BioGPT | [microsoft/BioGPT](https://github.com/microsoft/BioGPT) | MIT | 4k+ | Generative pre-trained transformer for biomedical text generation, relation extraction, and Q&A. Trained on 15M PubMed abstracts. |
| BioMedLM | [stanford-crfm/BioMedLM](https://github.com/stanford-crfm/BioMedLM) | Apache 2.0 | 2k+ | Stanford 2.7B parameter LLM trained exclusively on PubMed text. Lightweight, on-premise deployable. |
| MedAgents | [gersteinlab/MedAgents](https://github.com/gersteinlab/MedAgents) | MIT | 1k+ | Multi-agent LLM framework simulating multi-specialist consultation for zero-shot medical reasoning. Achieves GPT-4-level on USMLE without fine-tuning. |
| EHRAgent | [wshi83/EHRAgent](https://github.com/wshi83/EHRAgent) | MIT | 800+ | LLM agent that answers clinical questions by generating and executing code against EHR databases (MIMIC-III). |
| MONAI | [Project-MONAI/MONAI](https://github.com/Project-MONAI/MONAI) | Apache 2.0 | 6k+ | PyTorch-based deep learning toolkit for healthcare imaging. Includes Model Zoo, Label, and Deploy App SDK. NVIDIA + King's College London. |
| MONAI Label | [Project-MONAI/MONAILabel](https://github.com/Project-MONAI/MONAILabel) | Apache 2.0 | 1.5k+ | Intelligent active-learning image labeling tool; integrates with 3D Slicer and OHIF for iterative annotation and training. |
| MedLLMsPracticalGuide | [AI-in-Health/MedLLMsPracticalGuide](https://github.com/AI-in-Health/MedLLMsPracticalGuide) | MIT | 3k+ | Comprehensive practical guide for applying LLMs in medicine (Nature Reviews Bioengineering). Agent patterns, benchmarks, and evaluation datasets. |
| Awesome-AI-Agents-Healthcare | [AgenticHealthAI/Awesome-AI-Agents-for-Healthcare](https://github.com/AgenticHealthAI/Awesome-AI-Agents-for-Healthcare) | CC BY 4.0 | Active | Curated index of latest agentic AI systems: diagnostic agents, clinical dialogue, radiology, drug discovery, administration. |
| MedAgentGym | [gersteinlab/MedAgentGym](https://github.com/gersteinlab/MedAgentGym) | Apache 2.0 | New | Scalable training environment for agentic code-centric reasoning on biomedical data science tasks (arXiv June 2026). |

## Clinical Dialogue & Communication Agents

| Agent | Repo | License | Description |
|-------|------|---------|-------------|
| Clinical-Camel | [bowang-lab/clinical-camel](https://github.com/bowang-lab/clinical-camel) | Apache 2.0 | Medical QA and dialogue agent based on LLaMA-2-70B with USMLE + clinical corpus training |
| Agentic Clinical Dialogue | [xqz614/Awesome-Agentic-Clinical-Dialogue](https://github.com/xqz614/Awesome-Agentic-Clinical-Dialogue) | MIT | Resource collection of medical agents for clinical dialogue, health Q&A, and patient interaction |
| CHA | [Institute4FutureHealth/CHA](https://github.com/Institute4FutureHealth/CHA) | MIT | Conversational Health Agent — modular LLM-powered framework with wearable, EHR, and knowledge graph integration for personalized longitudinal health conversations |
| MDAgents | [mitmedialab/MDAgents](https://github.com/mitmedialab/MDAgents) | MIT | MIT Media Lab — adaptive LLM collaboration assembling GP + specialist + radiologist agents per query complexity. GPT-4 level on MedQA benchmarks. |

## Clinical NLP Tools

| Agent | Repo | License | Stars | Description |
|-------|------|---------|-------|-------------|
| medspacy | [medspacy/medspacy](https://github.com/medspacy/medspacy) | MIT | 667+ | Clinical NLP library built on spaCy. Section detection (HPI/Assessment/Plan), negation (NegEx), temporality, UMLS concept normalization. Production-grade; used at multiple health systems. |
| ctakes | [apache/ctakes](https://github.com/apache/ctakes) | Apache-2.0 | 131+ | Apache cTAKES from Mayo Clinic — extracts medications, diagnoses, procedures, anatomy from clinical notes. UMLS-backed, production-hardened. |

## Local-First AI & EHR Integration (New 2025–2026)

| Agent | Repo | License | Stars | Description |
|-------|------|---------|-------|-------------|
| openmed | [maziyarpanahi/openmed](https://github.com/maziyarpanahi/openmed) | Apache-2.0 | 4.0k+ | Local-first healthcare AI: clinical NER & HIPAA PII de-identification, 1,000+ medical models, 12 languages, 100% on-device (Apple MLX + Python). The go-to for clients with data residency requirements. |
| openmed-agent | [openmed-labs/openmed-agent](https://github.com/openmed-labs/openmed-agent) | Apache-2.0 | 23+ | Terminal-native clinical workspace — prior auth review, coding audits, care coordination. 62 built-in tools, SNOMED/ICD-10/RxNorm access. From the OpenMed team. |
| HealthChain | [healthchainai/HealthChain](https://github.com/healthchainai/HealthChain) | Apache-2.0 | 210+ | Python SDK connecting AI models to live EHR systems via FHIR. Multi-EHR aggregation, CDS-Hooks endpoints, SMART on FHIR OAuth2 (Epic + Cerner in v0.4). |
| open-wearables | [the-momentum/open-wearables](https://github.com/the-momentum/open-wearables) | MIT | 2.0k+ | Self-hosted platform unifying wearable health data (Garmin, Oura, Whoop, Apple HealthKit, Samsung) through a single AI-ready REST API. Docker Compose + native mobile SDKs. |

## Radiology & Medical Imaging Agents

| Agent | Repo | License | Stars | Description |
|-------|------|---------|-------|-------------|
| MedRAX | [bowang-lab/MedRAX](https://github.com/bowang-lab/MedRAX) | Apache-2.0 | 95+ | Medical reasoning agent for chest X-ray analysis via tool-calling LLM over specialized vision models (segmentation, grounding, pathology). SOTA on CheXBench Q1 2026. |
| STELLA | [zaixizhang/STELLA](https://github.com/zaixizhang/STELLA) | MIT | 62+ | Self-evolving LLM agent for biomedical research — autonomously retrieves PubMed literature, generates hypotheses, designs experiments. ReAct + tool use. |

## Benchmarks (Evaluate Your Agent Against These)

| Benchmark | Repo | What It Tests |
|-----------|------|---------------|
| MedAgentBench | [stanfordmlgroup/MedAgentBench](https://github.com/stanfordmlgroup/MedAgentBench) | Stanford virtual EHR environment for medical LLM agent tasks |
| CHI-Bench | [actava-ai/chi-bench](https://github.com/actava-ai/chi-bench) | End-to-end, long-horizon, policy-rich healthcare workflows |
| FHIR-AgentBench | [glee4810/FHIR-AgentBench](https://github.com/glee4810/FHIR-AgentBench) | EHR interoperability QA over FHIR APIs |

## Notes for Globant Engagements

- **Meditron + EHRAgent** = most production-ready combo for clinical reasoning over real EHR data
- **MONAI** = gold standard for any medical imaging project (segmentation, classification, detection)
- **openmed** = go-to for HIPAA/EU AI Act data residency requirements (on-prem, 4k stars, actively maintained)
- **HealthChain** = fastest path to integrating AI into Epic/Cerner via FHIR; skip only if EHR vendor has direct AI API
- **medspacy + ctakes** = standard clinical NLP preprocessing before sending text to any LLM
- **BioGPT / BioMedLM** = deployable on-premise for strict data-residency clients
- All Apache 2.0 / MIT above are safe for commercial use without GPL complications
