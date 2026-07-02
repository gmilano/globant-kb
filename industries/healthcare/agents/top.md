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

## Notes for Globant Engagements

- **Meditron + EHRAgent** = most production-ready combo for clinical reasoning over real EHR data
- **MONAI** = gold standard for any medical imaging project (segmentation, classification, detection)
- **BioGPT / BioMedLM** = deployable on-premise for clients with strict data residency requirements
- All Apache 2.0 / MIT above are safe for commercial use without GPL complications
