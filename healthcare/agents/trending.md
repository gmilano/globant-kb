# 📈 Agentes Healthcare trending — Julio 2026

> Qué está ganando tracción esta semana en el ecosistema AI de salud.
> Última actualización: 2026-07-08 (v3 — FDA clearance K253281, MedRAX, FHIR-AgentBench)

## 🚨 Señal crítica: primer LLM aprobado como dispositivo médico (FDA, Jun 2026)

**UpDoc FDA 510(k) K253281** (aprobado dic 2025, anunciado 25 jun 2026):
- **Primer SaMD (Software as Medical Device) con LLM patient-facing aprobado por la FDA**
- Aplicación: titulación de insulina para adultos con diabetes tipo 2
- Modalidad: voz o texto → orientación de dosis → EHR-integrado
- Evidencia: ensayo Stanford de titulación de insulina
- Despliegues iniciales: Cleveland Clinic, AHN, UCSF
- Predicado: calculadora de dosis (510k pathway)
- Implicación regulatoria: abre **pathway claro** para futuros clinical LLM agents

**¿Qué significa para Globant?** Cualquier proyecto de AI clínica con pacientes en EEUU ahora tiene un precedente regulatorio concreto. El patrón de sandboxing, evidencia clínica y predicado 510(k) es el modelo a seguir.

---

## 🔥 Repos con mayor momentum

| Nombre | Licencia | Descripción | Stars |
|--------|----------|-------------|-------|
| [MedRAX](https://github.com/bowang-lab/MedRAX) | Apache-2.0 | Medical Reasoning Agent for Chest X-ray — ICML 2025. Framework que integra LLMs multimodales con herramientas de análisis radiológico. ChestAgentBench: 2,500 consultas diagnósticas CXR en 7 categorías. Gana tracción en workflows de radiología hospitalaria. | ~1.2k |
| [OpenClaw-Medical-Skills](https://github.com/FreedomIntelligence/OpenClaw-Medical-Skills) | Apache-2.0 | 869 skills médicos curados para OpenClaw. El repo padre OpenClaw pasó de 9k a 188k★ en 60 días, el mayor crecimiento en historia GitHub. Medical Skills una de las librerías más descargadas en healthcare AI. | 2.8k |
| [Awesome-AI-Agents-for-Healthcare](https://github.com/AgenticHealthAI/Awesome-AI-Agents-for-Healthcare) | CC-BY-4.0 | Lista curada de avances en Agentic AI para salud: papers Mar 2026 sobre SEMA-RAG, CHI-Bench, DermAgent, MedMemoryBench. Referencia de investigación más citada del área. | ~1.2k |
| [openmed-agent](https://github.com/openmed-labs/openmed-agent) | MIT | Asistente médico terminal privado. Tracción acelerada desde que los costos de prior authorization (PA) automation dominan el debate en revenue cycle management en EEUU. | ~800 |
| [fhir-mcp-server (Momentum)](https://github.com/the-momentum/fhir-mcp-server) | MIT | Lanzamiento oficial Momentum FHIR MCP: "eliminar semanas de aprendizaje FHIR". Se volvió el estándar de integración AI↔EHR en semanas de su lanzamiento. | ~500 |
| [xSoVx/fhir-mcp](https://github.com/xSoVx/fhir-mcp) | MIT | FHIR-MCP con PHI protection y audit logging. Ganó tracción en hospitales que necesitan compliance vs. la opción de Momentum sin audit logs empresariales. | ~300 |
| [Multi-Agent-Medical-Assistant](https://github.com/souvikmajumder26/Multi-Agent-Medical-Assistant) | MIT | Demo multi-agente para diagnóstico y research. Muy citado en Reddit/HackerNews como punto de partida para proyectos de diagnóstico asistido. | ~400 |
| [AI-Healthcare-System (pavanbadempet)](https://github.com/pavanbadempet/AI-Healthcare-System) | MIT | Stack completo: React 19, FastAPI, LangGraph RAG, Ollama local, XGBoost diagnóstico (Diabetes/Corazón/Hígado), HL7 FHIR R4, AWS EKS. Arquitectura de referencia para plataformas clínicas privadas. | ~200 |
| [Healthcare-AI-CDSS-LangGraph](https://github.com/SayamAlt/Healthcare-AI-Clinical-Decision-Support-System-using-LangGraph) | MIT | CDSS con StateGraph no-lineal, PubMed RAG, validación de drug interactions. Destaca en la comunidad LangGraph como caso de uso médico canónico. | ~100 |

---

## 📰 Señales de mercado esta semana

- **FDA K253281 (Jun 25, 2026)**: UpDoc — primer LLM patient-facing clearado como SaMD. Pathway 510(k) con predicado calculadora de dosis. Deployed en Cleveland Clinic, AHN, UCSF.
- **Deloitte (2026)**: "Agentic AI Health Care Operating Model Change" — 80% de ejecutivos healthcare esperan valor significativo; hybrid workforce AI+clinician inminente.
- **BCG (Ene 2026)**: "AI Agents Will Transform Health Care in 2026" — 61% ya tiene budget aprobado; solo 3% en producción → ventana masiva.
- **MedAgentBench publicado en NEJM AI** (Stanford): benchmark con 300 tareas FHIR reales, Claude 3.5 Sonnet v2 lidera con 69.67% success rate.
- **FHIR-AgentBench** (arXiv:2509.19319): 2,931 preguntas clínicas reales para evaluar agentes EHR interoperables.
- **OpenEMR 8.0.0** (Mar 2026): ONC Ambulatory EHR Certification, US Core 8.0, USCDI v5, SMART on FHIR v2.2.0.
- **Brazil Lula AI Plan**: $4 billion en 4 años para adopción de AI en sector público, incluyendo salud. Acelerador clave para LATAM.
- **NVIDIA + Foxconn + Taiwan "Healthy Taiwan"**: Inversión $1.5B en AI-native infrastructure hospitalaria (Jun 2026).

---

## 🆕 Papers recientes (Mar–Jul 2026)

| Paper | Arxiv / Fuente | Descripción |
|-------|---------------|-------------|
| SEMA-RAG | AgenticHealthAI list | Self-Evolving Multi-Agent RAG para razonamiento médico |
| CHI-Bench | AgenticHealthAI list | Benchmark de agentes AI para flujos de trabajo en healthcare |
| DermAgent | AgenticHealthAI list | Agente multimodal para análisis dermatológico |
| MedMemoryBench | AgenticHealthAI list | Benchmark de memoria de agentes en atención médica personalizada |
| COTCAgent | AgenticHealthAI list | Consulta preventiva via chain-of-thought clínico |
| PhysicianBench | arXiv:2605.02240 | Evaluación de agentes LLM en EHR de mundo real (nivel physician) |
| FHIR-AgentBench | arXiv:2509.19319 | 2,931 preguntas clínicas reales FHIR para benchmark de agentes EHR |
| MedBeads | arXiv:2602.01086 | Substrate inmutable para medical AI trustworthy — trazabilidad de datos |
| ClinSeekAgent | arXiv:2605.20176 | Automatización de búsqueda de evidencia multimodal para razonamiento clínico |
| No Black Boxes | arXiv:2505.16288 | AI predictiva en salud con causalidad + interoperabilidad interpretable |
| When OpenClaw Meets Hospital | AgenticHealthAI list | Agentic Operating System para flujos dinámicos clínicos |

---
*Pipeline automático — se actualiza cada hora.*
