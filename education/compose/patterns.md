# 🧩 Patrones de composición — Education

> Recetas concretas para construir soluciones combinando repos + agentes + AI.
> Última actualización: 2026-07-13

## Arquitectura base

```
[Plataforma vertical base (Moodle / Open edX / Frappe LMS)]
          ↓  MCP Plugin / XBlock / REST API
[Capa de orquestación agentica (CrewAI / Agno / LangChain)]
          ↓
[Agentes especializados de Education]
  ├── Tutor Agent (DeepTutor / GenMentor)
  ├── Assessment Agent (quiz, grading, feedback)
  ├── Analytics Agent (alertas deserción, rendimiento)
  └── Admin Agent (admisiones, horarios, cuotas)
          ↓
[UI conversacional / API para el cliente]
```

---

## Patrón P1: AI Tutor sobre Moodle/Canvas (MVP 2-3 semanas)

**Caso de uso**: Universidad con Moodle/Canvas existente quiere añadir tutor AI sin cambiar su LMS.

**Stack**:
- **LMS**: Moodle (GPL-3.0) + `webservice_mcp` plugin **o** Canvas + `canvas-mcp` (MIT, 107★)
- **LLM**: Claude Sonnet 5 via Anthropic API (o Ollama local para privacidad)
- **Tutor**: DeepTutor (Apache-2.0, 22k★) en modo API
- **Orquestación**: Agno (MIT, 39.8k★) para el loop agentico

**Flujo**:
```
Alumno pregunta en el chat del LMS
→ MCP Plugin captura contexto (curso, tema, historial)
→ LLM determina intent (explicar / generar quiz / dar hint)
→ DeepTutor genera respuesta pedagógica con Socratic dialogue
→ Respuesta vuelve al LMS con citación de fuentes del curso
→ Progreso se registra en el perfil del alumno
```

**Tiempo estimado**: 2-3 semanas (MVP), 6-8 semanas (producción con FERPA/LGPD compliance)  
**Inversión**: ~$50k USD para MVP universitario  
**Diferenciador Globant**: FERPA/LGPD-compliant por diseño (anonimización antes del LLM call)

---

## Patrón P2: ERP Escolar + AI Agents (8-12 semanas)

**Caso de uso**: Colegio K-12 privado LATAM quiere automatizar admisiones, cobranzas y comunicación con padres.

**Stack**:
- **ERP Base**: Frappe Education (MIT, 1.8k★) + OpenEduCat (LGPL-3.0) para gestión de cuotas
- **Orquestación**: CrewAI (MIT, 52k★) con 3 agentes especializados
- **LLM**: Claude Haiku 4.5 (rapidez + costo bajo para alta frecuencia)
- **Canal**: WhatsApp Business API + Web chat

**Agentes**:
```
AdmisionesAgent:
  - Lee formularios de inscripción (PDF/web)
  - Valida documentos con AI (visión)
  - Responde preguntas de proceso 24/7
  - Escala a humano si hay casos edge

CobranzasAgent:
  - Revisa estado de cuotas en Frappe Education
  - Envía recordatorios personalizados (WhatsApp)
  - Ofrece planes de pago alternativos
  - Reportes mensuales para dirección

ComunicacionAgent:
  - Resume boletines de notas en lenguaje simple para padres
  - Alerta sobre ausencias y bajo rendimiento
  - Coordina reuniones en agenda de docentes
```

**Tiempo estimado**: 8-12 semanas  
**ROI esperado**: 40-60% reducción carga administrativa, 15-25% mejora retención

---

## Patrón P3: Adaptive Quiz Engine (4-6 semanas)

**Caso de uso**: EdTech startup o universidad quiere quizzes adaptativos que ajusten dificultad en tiempo real.

**Stack**:
- **Plataforma**: Open edX (AGPL-3.0) + XBlock custom
- **Quiz generation**: GenMentor (MIT, 250★) para generación de preguntas goal-oriented
- **Adaptive engine**: Reinforcement Learning con bandits multi-armed (Python + Gymnasium)
- **Almacenamiento**: Knowledge Graph del alumno (Neo4j o NetworkX)
- **LLM**: Claude Sonnet 5 para generación de explicaciones

**Flujo**:
```
Alumno completa quiz inicial
→ GenMentor mapea conceptos evaluados a Knowledge Graph
→ RL agent selecciona próxima pregunta (maximiza aprendizaje, minimiza frustración)
→ Si respuesta incorrecta: LLM genera explicación Socrática (DeepTutor style)
→ Si respuesta correcta: sube dificultad, expande knowledge map
→ Mastery report al docente: qué saben, qué falta, tiempo estimado para completar
```

**Métricas target**: 42% mejora en outcomes (benchmarks 2026), 23% mejora vs quiz estático

---

## Patrón P4: L&D Corporativo con AI Coach (6-8 semanas)

**Caso de uso**: Empresa con 500-5000 empleados quiere modernizar capacitación interna con AI coaching.

**Stack**:
- **LMS base**: Frappe LMS (MIT, 1.8k★) — deploy en Frappe Cloud en horas
- **AI Coach**: StudyAlpha pattern (Apache-2.0) — multi-agent con memoria + predicción de debilidades
- **Contenido**: cursos existentes + generación AI de nuevo contenido (Claude + DALL-E)
- **Analytics**: dashboard de progreso por equipo, identificación de skill gaps

**Agentes**:
```
OnboardingAgent: personalized 30-60-90 day plan por rol
CoachAgent: available 24/7, responde dudas del job-specific content
AssessmentAgent: crea evaluaciones basadas en KPIs del rol
ManagerReportAgent: resumen semanal de progreso por equipo para HRBP
```

**Tiempo estimado**: 6-8 semanas  
**ROI benchmark**: Sana Labs (HP, Spotify, Volvo) reporta 23% mejora en retención de conocimiento

---

## Patrón P5: LATAM University MOOCs + AI Tutor (12-16 semanas)

**Caso de uso**: Universidad latinoamericana con 10k-100k estudiantes quiere un tutor AI masivo en español/portugués.

**Stack**:
- **LMS**: Open edX Sumac (AGPL-3.0) — producción en AWS/GCP
- **Tutor AI**: DeepTutor (Apache-2.0) fork con prompts en ES/PT
- **TTS**: Kokoro-82M (Apache-2.0, 8k★) para síntesis de voz en español
- **LLM**: Claude Sonnet 5 (español nativo, razonamiento) + Ollama fallback local
- **Analytics**: detección temprana de deserción con ML (scikit-learn + alertas)

**Diferenciadores LATAM**:
- Español/Portugués nativo en todos los agentes
- Modo offline-first para zonas con conectividad limitada
- LGPD/Ley 25.326 compliance por diseño
- Costo por estudiante: ~$0.02 USD/interacción (vs $5-10 USD tutor humano)

**Tiempo estimado**: 12-16 semanas  
**Escala**: validado para 50k+ estudiantes concurrentes con arquitectura event-driven

---

## Patrón P6: AI para Admisiones Universitarias (4-6 semanas)

**Caso de uso**: Departamento de admisiones con alta demanda en temporada (nov-feb).

**Stack**:
- **CRM Base**: Frappe CRM (MIT) o integración con Salesforce Edu
- **MCP Bridge**: canvas-mcp o moodle-mcp para verificar historial de interés del prospecto
- **Agent**: Agno (MIT) con tool calls a CRM, calendario, documentos
- **LLM**: Claude Haiku 4.5 (velocidad + bajo costo en alta frecuencia)

**Capacidades**:
```
✅ Responde preguntas sobre programas, requisitos, costos (24/7)
✅ Procesa documentos de aplicación (transcripts, cartas)
✅ Agenda tours y entrevistas (integra con Google Calendar)
✅ Hace seguimiento personalizado por etapa del funnel
✅ Escala a asesor humano para casos complejos (HITL)
✅ Reportes de conversión por canal/campaña para marketing
```

**Tiempo estimado**: 4-6 semanas  
**ROI**: 40-60% reducción costo/lead, 25% mejora en tasa de conversión prospecto→matriculado

---

## Patrón P7: Self-Hosted Tutor sin Cloud (2-3 semanas)

**Caso de uso**: Institución pública con restricciones de privacidad estrictas (datos no pueden salir a cloud).

**Stack**:
- **LLM local**: Ollama (MIT) con Llama 3.3 70B o Mistral 7B
- **Tutor**: OpenTutor (MIT, zijinz456) — diseñado para correr 100% local
- **LMS**: Moodle (GPL-3.0) + webservice_mcp plugin
- **Hardware**: servidor on-prem con GPU A100/H100 (o cloud privado)

**Ventajas**:
- Zero dependencia de APIs externas
- Datos de alumnos nunca salen del datacenter institucional
- Cumple con GDPR, LGPD, regulaciones estatales EEUU (Ohio Jul 2026)
- Costo operativo predecible (hardware propio)

**Limitación**: capacidad de razonamiento limitada vs GPT-4o/Claude — compensar con RAG robusto sobre el contenido del curso.
