# 🏗️ Repos fundacionales — Education

> Bases sólidas con licencia abierta y comunidad activa sobre las cuales construir soluciones AI.
> Última actualización: 2026-07-13

## Plataformas LMS y ERP

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|---------------|
| [openedx/openedx-platform](https://github.com/openedx/openedx-platform) | Apache-2.0 | ~8.5k | Plataforma LMS y Studio de Open edX. Powers edX.org y miles de sitios educativos. Backend Python/Django. | ✅ XBlock API + webhooks para agentes |
| [frappe/lms](https://github.com/frappe/lms) | MIT | ~3.1k | LMS 100% open-source. Frappe/ERPNext. Portal de cursos, cohorts, evaluaciones. Python/Vue. | ✅ API REST nativa + integración ERPNext |
| [frappe/education](https://github.com/frappe/education) | MIT | ~850 | Sistema de gestión escolar/universitaria completo. Admisiones, asistencia, calificaciones, biblioteca, cuotas. On-top ERPNext. | ✅ Datos ricos para agentes (riesgo académico) |
| [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) | Apache-2.0 | ~23.7k | Agente de tutoría personalizada nativo-agente de HKU. Multi-agente, 30+ LLM providers, 200k+ LOC. | ✅ Arquitectura de referencia lista para fork |
| [CAHLR/OATutor](https://github.com/CAHLR/OATutor) | MIT | ~520 | Primer ITS totalmente open-source. Bayesian Knowledge Tracing, ReactJS + Firebase. UC Berkeley CAHLR Lab. | ✅ BKT engine reutilizable para knowledge tracing |
| [CAHLR/pyBKT](https://github.com/CAHLR/pyBKT) | MIT | ~350 | Implementación Python de Bayesian Knowledge Tracing. Librería académica de referencia. | ✅ Drop-in library para knowledge tracing |
| [openedx/XBlock](https://github.com/openedx/XBlock) | Apache-2.0 | ~468 | Framework para construir componentes de aprendizaje custom en Open edX. | ✅ SDK estándar para extender Open edX con AI |
| [Open-TutorAi/open-tutor-ai-CE](https://github.com/Open-TutorAi/open-tutor-ai-CE) | MIT | ~1.8k | Plataforma AI educativa open-source (Community Edition). Tutoría personalizada multi-modal. | ✅ Arquitectura modular lista para customizar |

## Herramientas de soporte

| Repo | Licencia | Stars | Descripción |
|------|----------|-------|-------------|
| [moodle/moodle](https://github.com/moodle/moodle) | GPL-3.0 | ~5.5k | LMS más usado del mundo. 300M+ usuarios. AI subsystem nativo desde Moodle 4.5. 1,800+ plugins. |
| [openedx/openedx-events](https://github.com/openedx/openedx-events) | Apache-2.0 | ~55 | Framework de eventos Open edX para hooks. Agentes reactivos a enrollment/grade/completion. |
| [cgrevisse/moodle-qbank_genai](https://github.com/cgrevisse/moodle-qbank_genai) | MIT | ~90 | Plugin GenAI para quiz generation en Moodle. |

## Notas de arquitectura

- **Open edX + XBlock**: La combinación más usada en universidades empresariales. XBlock = contrato de integración.
- **Frappe LMS + Education**: La opción más adecuada para LATAM — Python moderno, comunidad en español/portugués.
- **OATutor + pyBKT**: Combinación académicamente rigurosa para knowledge tracing real.
- **DeepTutor**: El punto de entrada más rápido para tutoría AI production-ready.

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas desplegables.*
