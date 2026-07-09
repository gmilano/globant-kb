# Trending Healthcare AI Agents — Week of 2026-07-06

> What's new and gaining momentum in healthcare AI this week.

## Breakout Projects (Jul 2026)

### 1. OpenMed — Milestone: 340M downloads, 1,500+ models
- **Repo**: https://github.com/maziyarpanahi/openmed
- **Why trending**: Launched Jul 16, 2025; crossed 340M model downloads by Jun 2026. Now 650+ models run fully on iPhone. Dominant on-device medical AI solution. Apache-2.0 means zero licensing friction.
- **Relevance**: HIPAA-safe inference for any healthcare deployment that can't send PHI to cloud.

### 2. Multi-Agent Medical Diagnostics Ecosystem
- **Repos**: [souvikmajumder26/Multi-Agent-Medical-Assistant](https://github.com/souvikmajumder26/Multi-Agent-Medical-Assistant), [ahmadvh/AI-Agents-for-Medical-Diagnostics](https://github.com/ahmadvh/AI-Agents-for-Medical-Diagnostics)
- **Why trending**: Agentic orchestration frameworks for clinical reasoning went from research to production-deployable stacks in H1 2026. LangGraph-based multi-agent systems for specialist simulation now have reference architectures.
- **Relevance**: Starting point for clinical decision support POCs.

### 3. AgentClinic Benchmark — Clinical AI Evaluation Becomes Standard
- **URL**: https://agentclinic.github.io/
- **Why trending**: Becoming the de-facto benchmark for evaluating clinical AI agents. 9 medical specialties, 7 languages, tests tool-use capabilities. OpenAI's HealthBench benchmarks GPT-5.4 (59.0) vs human doctors (43.7) — AI is now beating clinicians on benchmarks.
- **Relevance**: Any client engagement with a clinical AI component needs to report against these benchmarks.

### 4. FHIR + MCP Integration Pattern
- **Why trending**: MCP (Model Context Protocol) servers for FHIR R4 are emerging. Pattern: MCP server wraps FHIR API → Claude/GPT agents get structured access to patient data. HAPI FHIR + Medplum both have community MCP server implementations.
- **Key repos**: [medplum/medplum](https://github.com/medplum/medplum) (Apache-2.0), [hapifhir/hapi-fhir](https://github.com/hapifhir/hapi-fhir) (Apache-2.0)
- **Relevance**: Standard integration pattern for AI agents needing patient data access.

### 5. Ambient Clinical Documentation — Open-Source Alternatives to Nuance DAX
- **Why trending**: Epic AI Charting (Feb 2026) and Oracle Health Clinical AI Agent (Feb 2026) demonstrate that EHR vendors are embedding ambient AI. Open-source community is building alternatives using Whisper (ASR) + local LLMs + structured note generators.
- **Pattern**: `openai/whisper` (MIT) → `medspacy` (MIT) → structured SOAP note → FHIR DocumentReference
- **Relevance**: High-value use case for hospital systems not on Epic/Oracle.

### 6. CARE FE — Digital Public Good for Healthcare Delivery
- **Repo**: https://github.com/ohcnetwork/care_fe
- **License**: MIT
- **Stars**: ~650
- **Why trending**: OHC Network's open-source care coordination platform, being adopted across LATAM and Southeast Asia. React + Django stack, FHIR-compatible, designed for resource-constrained environments. AI layer additions underway.
- **Relevance**: Globant LATAM angle — open source healthcare delivery platform ready for AI customization.

## Research Papers Gaining Traction (2026)

| Paper | Focus | Implication |
|-------|-------|-------------|
| ABRA | Agent Benchmark for Radiology Applications | Radiology AI agents now have standardized evaluation |
| AgentRx | Multimodal clinical prediction agents | Drug recommendation agents benchmarked end-to-end |
| CHI-Bench | Healthcare workflow automation evaluation | Admin workflow agents being validated at scale |
| SEMA-RAG | Self-evolving multi-agent RAG for medical reasoning | Dynamic routing improves diagnostic accuracy |
| DeepTumorVQA | 3D CT hierarchical VLM benchmark | Medical vision-language agents advancing rapidly |

---
*Auto-updated by the ingest pipeline. 2026-07-06.*
