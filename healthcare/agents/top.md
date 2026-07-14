# Top AI Agents — Healthcare

> Open source AI agents and tools for the healthcare industry. Focus: MIT / Apache 2.0.
> Version: v5 — Updated: 2026-07-14

## Top Agents & Tools

| Name | License | Stars | Description |
|------|---------|-------|-------------|
| [openmed](https://github.com/maziyarpanahi/openmed) | Apache-2.0 | 3.4k | Local-first healthcare AI: clinical NER + HIPAA PII de-identification. 1,500+ medical models, 12 languages, Apple MLX + Python. Runs 100% on-device — no PHI ever leaves the network. 340M model downloads. |
| [MONAI](https://github.com/Project-MONAI/MONAI) | Apache-2.0 | 6.2k | NVIDIA's medical imaging AI toolkit (PyTorch). Auto3DSeg trains 3D segmentation in 2 days vs weeks. Federated learning across hospital sites. Powers 15,000+ clinical devices worldwide. |
| [medspacy](https://github.com/medspacy/medspacy) | MIT | 700 | Clinical NLP with spaCy: negation detection, section tagging, temporal reasoning. Drop-in for EHR text pipelines. |
| [PhysicianBench](https://github.com/HealthRex/PhysicianBench) | MIT | — | Stanford HealthRex benchmark: 100 long-horizon clinical tasks, 21 specialties, real FHIR EHRs. Best agents complete only 46% / 28% reliably. Use as eval harness for clinical agent development. (arXiv:2605.02240) |
| [chi-bench](https://github.com/actava-ai/chi-bench) | MIT | — | CHI-Bench: 75 end-to-end healthcare workflow tasks across prior auth, utilization mgmt, and care mgmt. 87 MCP tools, 1,290-doc managed-care handbook. Best frontier agent fails 72%. Johns Hopkins/Yale/Stanford coalition. (arXiv:2605.16679) |
| [fhir-mcp](https://github.com/xSoVx/fhir-mcp) | Apache-2.0 | — | MCP server enabling LLMs to securely interact with FHIR R4/R5 servers + HL7 terminology services. Built-in PHI protection, audit logging, token-efficient ops. Compliant with CMS-0057-F interop mandate. |
| [MedGuards](https://github.com/congboma/MedGuards) | MIT | — | Multi-agent system for medical error detection and correction. Specialized detect/localize/correct agents with confidence-guided arbitration. Multilingual (4 clinical note datasets). No extra training required. (arXiv:2606.25651) |
| [Medplum](https://github.com/medplum/medplum) | Apache-2.0 | 1.6k | TypeScript-first FHIR R4 platform — HIPAA + SOC2. Serverless Bots for workflow automation, built-in auth, React UI kit. Preferred greenfield platform for AI-enhanced clinical apps. |
| [ClinSeekAgent](https://github.com/UCSC-VLAA/ClinSeekAgent) | Apache-2.0 | — | UC Santa Cruz multimodal evidence-seeking agent for clinical reasoning. Queries medical KBs, navigates raw EHRs, invokes imaging tools. Improves Claude on CXR tasks: 47.5 → 62.6 F1 (+15.1). (arXiv:2605.20176) |
| [Multi-Agent-Medical-Assistant](https://github.com/souvikmajumder26/Multi-Agent-Medical-Assistant) | MIT | 280 | GenAI-powered multi-agent diagnostics + healthcare research chatbot. Designed for clinicians, researchers, and patients. LangChain + LLM orchestration. |
| [edsnlp](https://github.com/aphp/edsnlp) | BSD-3-Clause | 170 | AP-HP (Paris) fast clinical NLP, PyTorch + spaCy compatible. Modular pipeline for French + English EHR text. Production-grade at largest European hospital group. |
| [ctakes](https://github.com/apache/ctakes) | Apache-2.0 | 131 | Apache clinical NLP for information extraction from clinical notes. UIMA-based pipeline, NCI/NLM vocabularies, 15+ year track record. |

## Benchmark Summary (July 2026)

| Benchmark | Tasks | Best Agent Score | Gap vs Human |
|-----------|-------|-----------------|--------------|
| CHI-Bench (arXiv:2605.16679) | 75 policy-rich workflows | 28% complete | ~72% fail rate |
| PhysicianBench (arXiv:2605.02240) | 100 long-horizon EHR | 46% complete / 28% reliable | Significant gap |
| MedAgentBench (NEJM AI) | EHR action tasks | ~40% | Moderate gap |

> **Insight for Globant**: The 72% failure rate in CHI-Bench is a market signal — clients who deploy off-the-shelf frontier LLMs for clinical workflows will underperform. Custom fine-tuning + domain-specific orchestration is where Globant adds value.

---
*Auto-updated by ingest pipeline — v5.*
