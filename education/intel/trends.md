# 📡 Tendencias — Education

> Última actualización: 2026-07-10

## Tendencias activas (T1–T12)

### T1 — 86% de organizaciones educativas usan GenAI — líder de industria
**fuente**: Microsoft Education Report 2025  
**señal**: Educación tiene la tasa de adopción de GenAI más alta de cualquier industria. El cambio de "chatbot de respuesta" a "agente de iniciativa" está acelerando en 2026.  
**impacto Globant**: Clientes universitarios y K-12 ya tienen budget activo. No hay que convencer de la tecnología — hay que mostrar implementaciones de calidad.

---

### T2 — Agentic AI como infraestructura central del campus
**fuente**: UPCEA "Rise of the Agentic AI University 2026"; 8allocate.com; Gartner  
**señal**: 40% de aplicaciones empresariales embedará agentes task-específicos para fin de 2026. En educación: 80% de tareas rutinarias (grading, explicaciones básicas, seguimiento de progreso) serán manejadas por agentes. Los agentes no son features opcionales — son la infraestructura.  
**impacto Globant**: Los clientes necesitan arquitecturas multi-agente, no bots únicos. Proyectos de 3–6 agentes orquestados con LangGraph.

---

### T3 — AI proactiva: el agente inicia, el estudiante responde
**fuente**: 8allocate.com "Agentic AI in Education 2026"  
**señal**: En 2025 los estudiantes preguntaban al chatbot. En 2026 el agente AI detecta riesgo de abandono (días sin login, quiz scores bajos, video completion bajo), envía nudge personalizado, agenda sesión de tutoría, ajusta el plan de estudio — sin que el estudiante haga nada.  
**impacto Globant**: Requiere pipelines de datos de engagement (xAPI), state management de larga duración, y observabilidad de agentes. Deals de $300k–$1.5M.

---

### T4 — DeepTutor v1.0 GA: arquitectura de referencia para edtech agentico
**fuente**: HKUDS/DeepTutor, Apache-2.0, Apr 2026; 23.7k★  
**señal**: Reescritura completa (200k LOC). 30+ proveedores LLM. Dual-loop reasoning: outer loop mantiene knowledge state del estudiante, inner loop genera explicaciones y ejercicios personalizados. Docker Compose self-hostable. v1.0 released April 2026.  
**impacto Globant**: Estándar de facto open source para tutoring agentico. Fork viable — fork + customize + add enterprise support = producto Globant.

---

### T5 — LectūraAgents: enseñanza encarnada multi-agente (arXiv:2606.16428, Jun 2026)
**fuente**: arxiv.org/abs/2606.16428  
**señal**: ProfessorAgent + subagentes (research, planning, review). TASA algorithm (Teaching Action-Speech Alignment) alinea acciones pedagógicas (escribir, subrayar, destacar) con el speech del avatar. Evaluado por expertos educadores en niveles K-12, undergrad, grad.  
**impacto Globant**: Habilita clases asíncronas con avatar IA que actúa como docente real. Nuevo formato para MOOCs y e-learning corporativo. Reemplaza video production costosa ($50–$200/min → <$5/min con AI).

---

### T6 — GenAI EdTech: CAGR 43.6%, el segmento AI más rápido del mercado
**fuente**: The Business Research Company / GlobeNewswire Jul 8 2026  
**señal**: $0.76B (2026) → $3.22B (2030). Impulsado por tutores virtuales, contenido adaptativo, y grading automatizado. GenAI en EdTech supera en CAGR a healthcare, fintech y retail AI.  
**impacto Globant**: Ventana de oportunidad abierta. Los integradores que construyan expertise ahora capturan el mercado dominante de 2028–2030.

---

### T7 — LATAM: aceleración masiva con apoyo institucional
**fuente**: Google.org / Digital Education Council AI in Higher Education LATAM Survey 2026  
**señal**: Google.org $4.6M en AI educativa LATAM (entrenamiento docente + 1.25M estudiantes). DEC LATAM Survey 2026: 30k+ respuestas de 29 instituciones universitarias. LATAM AI in Education CAGR 32.4% → $1.5B 2030. Brazil edtech: Elevify seed $1.35M.  
**impacto Globant**: LATAM roots + AI expertise = ventaja diferencial. Oportunidad de ser el integrador de referencia en la región.

---

### T8 — Transparent AI / Explainable AI en grading
**fuente**: Faculty Focus 2026; emerline.com EdTech Trends 2025–2030  
**señal**: Reguladores, sindicatos docentes y estudiantes exigen que la IA muestre el razonamiento detrás de cada calificación, recomendación y diagnóstico de riesgo. Las plataformas que no implementen XAI están en riesgo regulatorio.  
**impacto Globant**: Todas las implementaciones deben incluir chain-of-thought visible, audit log de decisiones, y panel de docente con override. Diferenciador de calidad.

---

### T9 — Multi-agent reemplaza single-task bots: ola de re-arquitectura
**fuente**: 8allocate.com / Gartner 2026  
**señal**: Las instituciones que desplegaron chatbots en 2023–2024 los están migrando a arquitecturas multi-agente: grader agent + tutor agent + at-risk alert agent + content recommendation agent, orquestados con LangGraph o CrewAI. Los bots standalone no escalan ni generalizan.  
**impacto Globant**: Proyectos de re-arquitectura = deal size 3–5× mayor que el chatbot original. Oportunidad de reemplazo.

---

### T10 — Open TutorAI CE: plataforma de tutoring LLM-native con data ownership
**fuente**: arXiv:2602.07176, Feb 2026 / Open-TutorAi/open-tutor-ai-CE (Apache-2.0)  
**señal**: Arquitectura LLM-native: RAG sobre PDFs de curso, generación adaptativa de hints, tracking de progreso. Community Edition mantenida activamente. Alternativa open source a Khanmigo con plena data ownership.  
**impacto Globant**: Ideal para clientes que quieren control total sobre datos de estudiantes (GDPR/LGPD compliance en EU/LATAM).

---

### T11 — AI fluency como habilidad requerida → demanda de corporate AI training
**fuente**: 8allocate.com / Microsoft 2026  
**señal**: "AI fluency is emerging as a hiring requirement." Las empresas buscan plataformas para enseñar a sus empleados a trabajar con agentes AI: prompt engineering, orchestration, tool use. El corporate training market para AI skills es un segmento emergente.  
**impacto Globant**: Nuevo mercado: AI-training-as-a-platform. ClassroomIO + Claude API + cursos Globant-designed = producto propio potencial.

---

### T12 — SKILL.md wave llega a EdTech: composición modular de agentes
**fuente**: OpenClaw ecosystem / SKILL.md protocolo (ver technology-kb)  
**señal**: Los agentes de educación comienzan a usar SKILL.md para declarar capacidades (quiz_generation, grading, tutoring, knowledge_tracing, at_risk_detection). Primeros skill packs para Moodle y Open edX en desarrollo.  
**impacto Globant**: Habilita composición modular — un cliente puede activar/desactivar skills de agentes educativos sin redeploy. Arquitectura de producto más flexible y escalable.

---

## Radar de señales (próximas 4 semanas)

| Señal a monitorear | ¿Por qué importa? |
|--------------------|--------------------|
| DeepTutor v1.1 / roadmap | Próximas features de orquestación multi-agente |
| Open edX Summit 2026 (Q3) | Novedades en openedx-ai-extensions y XBlock AI |
| LATAM EdTech investment rounds | Nuevos clientes potenciales / partners |
| EU AI Act aplicación a educación | Requisitos XAI y datos de menores en EU |
| LectūraAgents GitHub repo | Si publican código — forkable para Globant |
