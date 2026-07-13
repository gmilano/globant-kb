# 📡 Tendencias — Education AI

> Tendencias con señal real, no hype. Foco en lo que impacta decisiones de proyecto.
> Última actualización: 2026-07-13

## T1 — Agentes de tutoría AI como mainstream (no experimento)

DeepTutor 23.7k★, deeptutor.info live, paper arXiv abr 2026. HolonIQ lista tutoría AI como mainstream 2026. Khanmigo millones de usuarios activos. Gap: versiones open-source institucionales que universidades puedan desplegar con sus propios datos.

**Para Globant**: DeepTutor fork como base para tutores personalizados por materia/cliente.

---

## T2 — Aprendizaje adaptativo con knowledge tracing real

Bayesian Knowledge Tracing (pyBKT) y Deep Knowledge Tracing adoptados en producción. OATutor (UC Berkeley) demostró que es posible open-source. LLMs integrados al loop BKT para hints inteligentes cuando p(conocimiento) < threshold.

**Para Globant**: pyBKT + LangGraph + DeepTutor = tutoría adaptativa con evidencia pedagógica rigurosa.

---

## T3 — AI nativa en LMS (Moodle 5.0, Open edX, Canvas)

Moodle 4.5: AI subsystem plugin-based. Moodle 5.0 (feb 2026): API estandarizada para cualquier LLM. Open edX: modelo XBlock. Canvas: LTI 1.3 + canvas-mcp (MIT). Los LMS son plataformas abiertas a agentes.

**Para Globant**: Build plugins Moodle/XBlock reutilizables como producto horizontal.

---

## T4 — Self-hosted AI por privacidad y presupuesto (FERPA, LGPD, LPDP)

Instituciones educativas no pueden enviar datos a APIs externas. Tendencia: modelos locales (Llama 3.3, Phi-4) con Ollama on-prem. LiteLLM como proxy unificado. OpenTutor (100% local) como referencia.

**Para Globant**: Oferta "AI Education Stack Self-Hosted" = LMS + Ollama + LiteLLM + Langfuse.

---

## T5 — Generación automática de evaluaciones (quiz gen)

moodle-qbank_genai (MIT), moodle-local_aiquestions (GPL), EduGears AI (LTI 1.3). Quiz gen = mayor ROI inmediato y menor riesgo percibido. Menor fricción: no requiere cambio de plataforma.

**Para Globant**: MVP 4-8 semanas con impacto medible. Puerta de entrada a deals más grandes.

---

## T6 — LATAM EdTech boom con foco en equity

- Google.org $4.6M en LATAM para AI education (2026)
- UNESCO Observatory on AI in Education LATAM (jun 2026)
- 92% estudiantes + 79% faculty LATAM usando AI
- Elevify (Brasil) $1.35M seed
- Chamilo: adopción alta Colombia/Ecuador/Perú, comunidad en español
- IDB: 193 soluciones AI education analizadas para LATAM

**Para Globant**: LATAM = mayor urgencia + menor cobertura. Ventana 18-24 meses.

---

## T7 — Evaluación de calidad pedagógica de agentes AI

AITutor-EvalKit (arXiv:2512.03688): scaffolding, Socratic guidance, feedback accuracy, hallucination rate. AIED 2026 publicó benchmarks de tutores AI. Instituciones piden eval frameworks — no solo "¿funciona?" sino "¿es pedagógicamente sólido?".

**Para Globant**: Incluir eval harness en todos los proyectos de tutoría AI.

---

## T8 — Agentes para gestión escolar y administrativa

Admisiones automatizadas, detección de abandono, scheduling, comunicación con padres. Frappe Education tiene los datos + webhooks = ideal para disparar agentes en eventos escolares.

**Para Globant**: Deal tipo con áreas administrativas universitarias (ROI: -30-50% carga administrativa).

---

## T9 — Corporate L&D como mercado prioritario 2026

L&D corporativo adopta AI más rápido: presupuesto, ROI medible, sin burocracia regulatoria, urgencia de reskilling. Frappe LMS ideal para L&D: Python moderno, sin costo de licencia.

**Para Globant**: L&D AI = Frappe LMS + DeepTutor + Langfuse para clientes del portafolio actual.

---

## T10 — Detección de riesgo académico con AI

Modelos predictivos de abandono usando datos LMS (tiempo, completitud, quizzes). Open edX + Moodle exponen datos vía API. LangGraph orquesta: datos LMS → modelo de riesgo → alerta docente → intervención.

**Para Globant**: Add-on de alto valor en cualquier proyecto LMS — ROI en retención de estudiantes.

---

## T11 — Immersive learning: AR/VR + AI Simulation

Meta Quest 3 ($499) en laboratorios universitarios. AI genera escenarios simulados. Horizonte de implementación real: 2027-2028. Monitorear.

---

## T12 — Multilingüismo y accesibilidad LATAM

Español/Portugués requisitos no opcionales. Llama 3.3, Mistral Nemo 12B, Phi-4: buen soporte multi-idioma. Oportunidad diferenciadora: tutores AI en lenguas indígenas (Quechua, Nahuatl, Guaraní) para contratos gubernamentales.

---

## T13 — Regulación: AI en educación como "high-risk"

EU AI Act (full obligations ago 2026) clasifica AI de evaluación en educación como "high-risk" (Art. 10). FERPA (US) + LGPD (Brasil) + LPDP (Argentina). Oportunidad: arquitecturas privacy-by-design con Langfuse + Ollama self-hosted.

---

## Señales para monitorear

| Señal | Por qué importa | Horizonte |
|-------|----------------|----------|
| Moodle 5.1 AI subsystem core | Estándar de plugins AI Moodle | Q3 2026 |
| Open edX Sumac (2026.1) | AI features nativas | Q4 2026 |
| UNESCO AI Education Policy Guidelines | Marco regulatorio LATAM | 2026-2027 |
| Google Classroom + Gemini | Puede desplazar Open edX en K-12 LATAM | 2026 |
| AITutor-EvalKit en RFPs | Si aparece en licitaciones, se vuelve requisito | 2026 |
