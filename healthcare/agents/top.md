# Top AI Agents & Tools — Healthcare

> Open-source AI agents and tools for healthcare. Focus: MIT / Apache 2.0 licenses Globant can build on.
> Last updated: 2026-07-06

## Featured Agents & Tools

| Name | License | Stars | Description |
|------|---------|-------|-------------|
| [openmed](https://github.com/maziyarpanahi/openmed) | Apache-2.0 | ~4.2k | Local-first healthcare AI: clinical NER & HIPAA PII de-identification running 100% on-device. 1,500+ open medical models across 12 languages using Apple MLX + Python. 340M model downloads as of Jun 2026. |
| [medspacy](https://github.com/medspacy/medspacy) | MIT | ~680 | Clinical NLP library built on spaCy. Provides sentence segmentation, contextual analysis, attribute assertion (negation, temporality), and section detection for clinical notes. Production-ready. |
| [scispacy](https://github.com/allenai/scispacy) | MIT | ~3.9k | Allen AI's spaCy models for biomedical and scientific text. Includes NER models for diseases, chemicals, genes, and linking to UMLS/MeSH ontologies. |
| [torchio](https://github.com/TorchIO-project/torchio) | Apache-2.0 | ~2.4k | Medical imaging processing for AI/deep learning. Data augmentation, preprocessing, and loading for 3D MRI/CT. Integrates with PyTorch. |
| [Multi-Agent-Medical-Assistant](https://github.com/souvikmajumder26/Multi-Agent-Medical-Assistant) | Apache-2.0 | ~850 | GenAI-powered multi-agentic medical diagnostics and healthcare research chatbot. Designed for clinicians, researchers, and patients. Uses LangGraph + RAG over clinical literature. |
| [edsnlp](https://github.com/aphp/edsnlp) | BSD-3-Clause | ~200 | Fast modular NLP framework from AP-HP (Paris public hospitals), compatible with PyTorch and spaCy. Specialized in French and multilingual clinical text, OMOP CDM output. |
| [ctakes](https://github.com/apache/ctakes) | Apache-2.0 | ~135 | Apache cTAKES: battle-tested clinical NLP platform for extracting information from clinical notes. Identifies diseases, symptoms, medications, procedures using UMLS. |
| [hi-ml](https://github.com/microsoft/hi-ml) | MIT | ~315 | Microsoft's HI-ML toolbox for deep learning in medical imaging. Integrates with Azure ML and InnerEye. Supports segmentation, classification on DICOM data. |
| [LLM-Medical-Agent](https://github.com/TUDB-Labs/LLM-Medical-Agent) | MIT | ~290 | Multi-agent framework for medical data processing. Orchestrates specialist agents (cardiologist, radiologist, pharmacist) to analyze complex cases end-to-end. |
| [AI-Agents-for-Medical-Diagnostics](https://github.com/ahmadvh/AI-Agents-for-Medical-Diagnostics) | MIT | ~460 | LLM-based AI agents simulating a multidisciplinary medical team for complex case analysis. Produces treatment recommendations from structured specialist perspectives. |

## Emerging / Research-Grade Agents (2026)

| Name | License | Description |
|------|---------|-------------|
| [AgentClinic](https://agentclinic.github.io/) | MIT | Multimodal benchmark for tool-using clinical AI agents. Simulates patient interactions, multimodal data collection, and tool use across 9 medical specialties and 7 languages. |
| [Awesome-AI-Agents-for-Healthcare](https://github.com/AgenticHealthAI/Awesome-AI-Agents-for-Healthcare) | MIT | ~398★ curated list tracking latest research papers: radiology agents (ABRA), EHR agents, surgical agents, mental health agents, clinical dialogue agents. |
| [Awesome-Medical-LLM-Agent](https://github.com/yczhou001/Awesome-Medical-LLM-Agent) | MIT | Survey repo: "Reasoning as the Engine — The Evolution from Medical LLMs to Versatile Medical Agents." Comprehensive taxonomy of medical agent architectures. |
| [SEMA-RAG](https://github.com/AIM-Research-Lab/Awesome-AI-Agents-Medicine) | Apache-2.0 | Self-evolving multi-agent RAG for medical reasoning. Featured in 2026 literature. Dynamic agent routing based on query complexity. |

## Selection Rationale (for Globant engagements)

- **Best for HIPAA-compliant on-prem NLP**: `openmed` (Apache-2.0, fully on-device, no PHI leaves the network)
- **Best for clinical note parsing**: `medspacy` + `scispacy` combo (MIT, production-proven at major hospitals)
- **Best for medical imaging AI**: `torchio` (Apache-2.0, integrates with any PyTorch pipeline)
- **Best for multi-agent clinical workflows**: `Multi-Agent-Medical-Assistant` or `LLM-Medical-Agent` (Apache-2.0 / MIT)
- **Avoid**: Models that require sending PHI to third-party cloud APIs without BAA

---
*Auto-updated by the ingest pipeline. 2026-07-06 pass.*
