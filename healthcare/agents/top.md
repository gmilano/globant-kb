# 🎯 Top AI Agents — Healthcare (v6)

> Open-source AI agents & tools for the healthcare industry. Focus: MIT / Apache 2.0 / BSD.
> Last updated: 2026-07-14

## Featured Agents & Tools

| Name | License | Repo | Stars | Description |
|------|---------|------|-------|-------------|
| [openmed](https://github.com/maziyarpanahi/openmed) | Apache-2.0 | maziyarpanahi/openmed | 4.0k | Local-first healthcare AI: clinical NER & HIPAA PII de-identification. Runs 1,000+ local medical models in 12 languages via Apple MLX. Zero cloud — patient data never leaves the network. |
| [MedAgents](https://github.com/gersteinlab/MedAgents) | MIT | gersteinlab/MedAgents | 359 | [ACL 2024 Findings] Multi-disciplinary collaboration framework: assembles virtual domain experts per clinical question, runs consensus discussion rounds, produces zero-shot medical reasoning. Benchmarked on MedQA, MedMCQA, PubMedQA, MMLU. |
| [openmed-agent](https://github.com/openmed-labs/openmed-agent) | Apache-2.0 | openmed-labs/openmed-agent | 26 | AI-powered terminal for clinical workflows: 62 built-in tools, 13 deterministic workflows. Covers prior authorization, appeal analysis, coding audits, ICD-10/CPT/SNOMED/LOINC/RxNorm. FHIR export. Local operator with draft/finalize review cycles. |
| [MedAgentGym](https://github.com/wshi83/MedAgentGym) | Research | wshi83/MedAgentGym | 121 | [ICLR 2026] First publicly available training environment for LLM agents on code-based medical reasoning. 72,413 task instances across 129 categories from 12 real biomedical scenarios. Supports SFT + DPO + RL training. Dockerized isolated execution. |
| [HealthFlow](https://github.com/yhzhu99/HealthFlow) | Apache-2.0 | yhzhu99/HealthFlow | 48 | Self-evolving multi-agent framework for EHR analysis: Meta Agent (plans) → Executor Agent (codes) → Evaluator Agent (validates) → Reflector Agent (writes reusable experience). Five benchmark suites including MedAgentBoard + CureBench. |
| [MedSAM-Agent](https://github.com/CUHK-AIM-Group/MedSAM-Agent) | Apache-2.0 | CUHK-AIM-Group/MedSAM-Agent | 86 | Interactive medical image segmentation via multi-turn agentic reinforcement learning. Hybrid prompting + dual-stage training (SFT + RL). Covers 6 imaging modalities, 21 datasets. Supports MedSAM2, SAM2.1, IMISNet backbones. |
| [SurgBox](https://github.com/franciszchen/SurgBox) | MIT | franciszchen/SurgBox | 16 | [IEEE BigData 2024] Agent-driven operating room sandbox with surgery copilot. Built on MetaGPT. Simulates multi-role surgical environments and AI-assisted surgical decision support. |
| [ReflecTool](https://github.com/BlueZeros/ReflecTool) | MIT | BlueZeros/ReflecTool | 42 | [ACL 2025] Reflection-aware tool-augmented clinical agents. Agents self-reflect on tool calls, correct reasoning chains, and improve clinical decision support accuracy iteratively. |
| [CHA](https://github.com/Institute4FutureHealth/CHA) | Apache-2.0 | Institute4FutureHealth/CHA | 38 | Personalized LLM-powered conversational health agent framework. Modular: data sources (wearables, EHR, FHIR), reasoning engine, memory, multi-modal outputs. Designed for chronic disease management. |
| [Chain-of-Diagnosis](https://github.com/FreedomIntelligence/Chain-of-Diagnosis) | Apache-2.0 | FreedomIntelligence/Chain-of-Diagnosis | 67 | Interpretable medical agent via chain-of-thought diagnostics. Step-by-step diagnosis pipeline with explainable reasoning trace — critical for clinical trust and auditability. |

## Secondary Agents Worth Tracking

| Name | Repo | Key Signal |
|------|------|-----------|
| EvoClinician | yf-he/EvoClinician | Self-evolving agent for multi-turn medical diagnosis via test-time evolutionary learning |
| MDTeamGPT | KaiChenNJ/MDTeamGPT | Multi-disciplinary team consultation simulator: specialists debate, consensus emerges |
| IMAS | uheal/imas | Agentic approach to rural healthcare delivery — targets low-resource settings |
| KGARevion | mims-harvard/KGARevion | Knowledge graph-augmented agent for biomedical QA (Harvard MIMS) |
| STELLA | zaixizhang/STELLA | Self-evolving LLM agent for biomedical research; autonomously designs experiments |
| MedResearcher-R1 | AQ-MedAI/MedResearcher-R1 | Expert-level medical deep researcher — R1-style reasoning for clinical evidence synthesis |
| PIORS | FudanDISC/PIORS | Personalized intelligent outpatient reception — patient triage + scheduling agent |
| Patho-AgenticRAG | Wenchuan-Zhang/Patho-AgenticRAG | Multimodal agentic RAG for pathology VLMs via reinforcement learning |

## License Key
- **Apache-2.0 / MIT**: Fully permissive — Globant can build commercial products directly.
- **Research license**: Free for non-commercial/research use; negotiate for commercial deployment.
- **PhysioNet HL**: Data access credentialed; code itself typically MIT-compatible.

---
*Auto-updated by ingest pipeline. v6 — 2026-07-14*
