# Agentes en tendencia — Healthcare AI

> Señales calientes de la semana. Foco en agentic AI clínica y digital health.
> Última actualización: 2026-07-07

## 6 Señales calientes

### 1. ARPA-H lanza programa para primer agente clínico AI autorizado por FDA

**Qué está pasando:** La Advanced Research Projects Agency for Health (ARPA-H) anunció financiamiento para desarrollar el primer sistema de AI agéntica autorizado por FDA para atención clínica real. El sistema incluye un **agente de cara al paciente** (ajuste autónomo de citas, medicamentos, dieta, ejercicio) y un **agente supervisor** que monitorea los agentes desplegados para seguridad continua.

**Por qué importa para Globant:** El marco regulatorio para AI agentic en clínica comienza a existir. Las firmas que desarrollan capacidad de conformidad FDA/ANVISA con agentic AI hoy tendrán ventaja enorme en 24-36 meses.

---

### 2. Ambient clinical documentation: primer AI use case en alcanzar 100% de adopción

**Qué está pasando:** La documentación clínica ambiental (AI que transcribe y estructura consultas médicas en tiempo real) ha alcanzado **100% de adopción** entre los sistemas de salud encuestados en 2026 — la primera aplicación AI en lograr penetración cuasi-universal en cuidados agudos. Nuance DAX, Suki, Abridge y soluciones open source (OpenScribe) dominan.

**Por qué importa para Globant:** El mercado de ambient AI ya es maduro. El diferenciador ahora es **integración con workflows clínicos posteriores**: derivaciones automáticas, prescripciones pre-cargadas, alertas de interacción farmacológica — todo lo que viene después de la transcripción.

---

### 3. MONAI v1.6.0 (junio 2026): production-ready medical imaging AI

**Qué está pasando:** MONAI (Apache-2.0, 8.4k★) lanzó la versión 1.6.0 en junio 2026 con soporte mejorado para multi-GPU inference, modelos de foundation para segmentación, y deployment en NVIDIA Holoscan. Usado por hospitales de investigación como Stanford, Mayo Clinic y NHS UK.

**Por qué importa:** MONAI es el PyTorch de la imagen médica. Los proyectos de AI de radiología, oncología y patología se construyen sobre él. Globant puede proponer stacks MONAI + OHIF (DICOM viewer) + LangGraph agents.

---

### 4. MCP-FHIR: Bloomberg Terminal de datos clínicos para agentes

**Qué está pasando:** Apareció el paper "Enhancing Clinical Decision Support and EHR Insights through LLMs and MCP: An Open-Source MCP-FHIR Framework" (arxiv 2506.13800). Permite acceso declarativo a recursos FHIR R4 (Patient, Observation, Condition, MedicationRequest) para cualquier LLM agent, similar a como sec-edgar-mcp hizo accesible SEC para agentes financieros.

**Por qué importa:** Cualquier agente clínico puede ahora acceder a datos EHR estructurados via FHIR sin integration custom. El mismo patrón MCP que explotó en finanzas está llegando a healthcare.

---

### 5. Healthcare AI LATAM: $12.82B (2024) → $66.40B (2033), CAGR 20%

**Qué está pasando:** Brasil, México y Colombia lideran el boom de digital health en LATAM. Brasil's Law 14.874/24 moderniza el framework para medical devices AI (incluyendo PCCP-ready software de ANVISA). ConecteSUS llega a 150M+ ciudadanos. Telesalud representa 46.7% del revenue de digital health LATAM.

**Por qué importa:** El mercado LATAM de healthcare AI está en fase de adopción temprana → crecimiento masivo. La ventana para posicionarse como proveedor de referencia es 2026-2028.

---

### 6. Multi-disciplinary AI tumor boards: el patrón TradingAgents aplicado a oncología

**Qué está pasando:** MDTeamGPT, Healthcare Agent Orchestrator (Microsoft) y DoctorAgent-RL implementan el mismo patrón que TradingAgents en finanzas: múltiples agentes especializados (oncólogo, radiólogo, patólogo, cirujano) en debate estructurado, con un agente coordinador que sintetiza el plan de tratamiento. Publicaciones en EMNLP 2025 y NEJM AI validan el patrón.

**Por qué importa para Globant:** El patrón multi-agent debate + human gate es replicable: "el tumor board de un hospital de investigación, disponible para hospitales regionales a un costo accesible."

---

## Momentum — delta semanal estimado

| Señal | Tendencia | Driver |
|-------|-----------|--------|
| Clinical AI agents (LangGraph + FHIR) | ↑↑↑ | ARPA-H + NEJM AI publications |
| MONAI v1.6.0 imaging | ↑↑ | Production deployments NHS/Mayo |
| Ambient documentation AI | ↑ (maduro) | 100% adoptado, valor está en integraciones |
| MCP-FHIR ecosystem | ↑↑↑ | Paper arxiv 2506, explosión similar a MCP financiero |
| LATAM digital health | ↑↑↑ | Regulación Brasil 14.874/24, ConecteSUS scale |
| Multi-agent tumor boards | ↑↑ | Azure Healthcare Agent Orchestrator en producción |
| Medical LLM fine-tuning (MEDITRON, BioMistral) | ↑↑ | Alternativa open source a GPT-4 en clínica |
