# Top AI Agents — Healthcare

> Agentes y frameworks para AI clínica, imaging médico, EHR y telemedicina.
> Última actualización: 2026-07-07

## 12 Agentes clave

| Nombre | Licencia | URL | Stars | Descripción |
|--------|----------|-----|-------|-------------|
| Healthcare Agent Orchestrator | MIT | [github.com/Azure-Samples/healthcare-agent-orchestrator](https://github.com/Azure-Samples/healthcare-agent-orchestrator) | 800+ | Framework Microsoft para agentes especializados multi-disciplinarios. Tumor boards oncológicos, integración FHIR nativa. Disponible en Azure AI Foundry Agent Catalog. |
| MedAgentBench | Apache-2.0 | [github.com/stanfordmlgroup/MedAgentBench](https://github.com/stanfordmlgroup/MedAgentBench) | 600+ | Benchmark Stanford: 300 tareas clínicas, 100 pacientes con 700k+ data elements, entorno FHIR-compliant. Publicado en NEJM AI. Claude 3.5 Sonnet v2 → 69.67% success rate. |
| DoctorAgent-RL | Apache-2.0 | [github.com/JarvisUSTC/DoctorAgent-RL](https://github.com/JarvisUSTC/DoctorAgent-RL) | 400+ | Sistema multi-agente con RL colaborativo para diálogo clínico multi-turno. EMNLP 2025. Simula especialistas coordinando diagnóstico. |
| EvoClinician | MIT | [github.com/yf-he/EvoClinician](https://github.com/yf-he/EvoClinician) | 350+ | Agente auto-evolutivo para diagnóstico médico multi-turno con evolutionary learning en test-time. arxiv 2026.1. |
| MDTeamGPT | MIT | [github.com/KaiChenNJ/MDTeamGPT](https://github.com/KaiChenNJ/MDTeamGPT) | 300+ | Simulación de tumor board: múltiples especialistas (oncólogo, radiólogo, patólogo, cirujano) en debate estructurado para decisión clínica. |
| ReflecTool | Apache-2.0 | [github.com/BlueZeros/ReflecTool](https://github.com/BlueZeros/ReflecTool) | 280+ | Agentes clínicos con herramientas externas + reflection-aware reasoning. ACL 2025. Accede a bases de conocimiento clínico (PubMed, UpToDate). |
| MedSAM-Agent | MIT | [github.com/CUHK-AIM-Group/MedSAM-Agent](https://github.com/CUHK-AIM-Group/MedSAM-Agent) | 400+ | Agente de segmentación de imágenes médicas con agentic reinforcement learning. Multi-turn interaction para 2D/3D imaging (CT, MRI, PET). arxiv 2026.2. |
| Meissa | Apache-2.0 | [github.com/Schuture/Meissa](https://github.com/Schuture/Meissa) | 250+ | Multi-modal Medical Agentic Intelligence: combina texto clínico + imaging + labs + historiales para razonamiento diagnóstico integral. |
| CHI-Bench | Apache-2.0 | [github.com/actava-ai/chi-bench](https://github.com/actava-ai/chi-bench) | 200+ | Benchmark end-to-end para flujos de trabajo hospitalarios: admisiones, alta, derivaciones, prior authorizations. arxiv 2026.5. |
| FHIR-AgentBench | MIT | [github.com/glee4810/FHIR-AgentBench](https://github.com/glee4810/FHIR-AgentBench) | 180+ | Evalúa LLM agents sobre preguntas de EHR reales usando APIs FHIR estándar. Mide precisión en lectura de registros clínicos estructurados. arxiv 2025.9. |
| OpenClaw Medical Skills | MIT | [github.com/FreedomIntelligence/OpenClaw-Medical-Skills](https://github.com/FreedomIntelligence/OpenClaw-Medical-Skills) | 400+ | La mayor librería open source de skills médicas para agentes: radiology reading, pathology analysis, clinical note extraction, drug interaction checking. |
| Awesome AI Agents for Healthcare | CC0 | [github.com/AgenticHealthAI/Awesome-AI-Agents-for-Healthcare](https://github.com/AgenticHealthAI/Awesome-AI-Agents-for-Healthcare) | 900+ | 240+ papers (2023-2026) categorizados: diagnóstico, imaging, EHR, clinical dialogue, drug discovery. Referencia viva del estado del arte. |

---

## 4 Frameworks de orquestación

| Framework | Licencia | URL | Caso de uso en Healthcare |
|-----------|----------|-----|---------------------------|
| LangGraph | MIT | [github.com/langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | Human-in-the-loop gates (requerido por FDA + reguladores LATAM). Checkpoints para audit trail de decisiones clínicas. |
| CrewAI | MIT | [github.com/crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | Simulación de tumor boards y comités multidisciplinarios. Roles como "Radiólogo", "Oncólogo", "Médico Clínico". |
| AutoGen (Microsoft) | MIT | [github.com/microsoft/autogen](https://github.com/microsoft/autogen) | Agentes colaborativos para investigación clínica y análisis de trials. Usado en Healthcare Agent Orchestrator. |
| HealthChain | MIT | [github.com/healthchainai/healthchain](https://github.com/healthchainai/healthchain) | Python SDK especializado: conecta modelos AI directamente a EHRs en vivo, elimina la complejidad de integración FHIR. |

---

## 6 MCP Servers para datos clínicos

| Servidor | Licencia | URL | Datos disponibles |
|----------|----------|-----|-------------------|
| mcp-fhir | MIT | [github.com/flexpa/mcp-fhir](https://github.com/flexpa/mcp-fhir) | Acceso declarativo a recursos FHIR R4: Patient, Observation, Condition, MedicationRequest, DiagnosticReport. No key needed en sandbox HAPI. |
| clinicaltrial-mcp | MIT | [github.com/topics/mcp-server](https://github.com/topics/mcp-server) | ClinicalTrials.gov API: búsqueda de trials por condición, fase, sitio. Matching de pacientes a trials activos. |
| pubmed-mcp | Apache-2.0 | [github.com/topics/pubmed-mcp](https://github.com/topics/pubmed-mcp) | PubMed/MEDLINE: búsqueda de literatura clínica, meta-análisis, guidelines. 35M+ publicaciones sin API key. |
| icd-mcp | MIT | — | ICD-10/ICD-11 coding, SNOMED CT lookups, drug interaction databases (RxNorm, DrugBank API). |
| nihreporter-mcp | Apache-2.0 | — | NIH Reporter: grants activos, proyectos de investigación, outcomes de estudios financiados por NIH. |
| openfdamcp | MIT | — | OpenFDA: adverse events, drug labels, device recalls, 510(k) clearances, PMA approvals. Sin API key. |
