# 🏭 Verticales de partida — Education

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-05

## Plataformas recomendadas

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| **Open edX** | Apache-2.0 | [openedx/openedx-platform](https://github.com/openedx/openedx-platform) | Python/Django + React | LMS universitario / corporativo a escala. 150M+ learners. Añadir XBlocks AI, Khanmigo-style tutor, RAG sobre contenido de cursos. |
| **Moodle** | GPL-3.0 | [moodle/moodle](https://github.com/moodle/moodle) | PHP + MySQL/PostgreSQL | El LMS más deployed (400M usuarios, 150k sitios). AI subsystem nativo desde v4.5. Plugins: AI quiz generation, essay grading, learning analytics. |
| **Frappe Learning** | MIT | [frappe/lms](https://github.com/frappe/lms) | Python/Frappe + Vue.js | LMS empresarial / educadores. **Licencia MIT = ideal Globant**. Mismo stack que ERPNext → integración con HR, performance, onboarding corporativo. |
| **OpenEduCat** | LGPL-3.0 | [OCA/vertical-education](https://github.com/OCA/vertical-education) | Python/Odoo | Education ERP completo: admisiones, attendance, gradebook, fees, biblioteca, hostel. AI on top: predicción de deserción, tutoring, reporting automático. |
| **Sakai** | Apache-2.0 | [sakaiproject/sakai](https://github.com/sakaiproject/sakai) | Java/Spring | LMS consorcio universitario (Michigan, Indiana, MIT, Stanford). Fuerte en gradebook, evaluación peer, portfolios. AI: automatic feedback, plagiarism. |
| **Moodle App** | Apache-2.0 | [moodlehq/moodleapp](https://github.com/moodlehq/moodleapp) | Angular/Ionic | App móvil oficial Moodle. Base para UX móvil con AI: push notifications personalizadas, offline tutoring, voice Q&A. |
| **Richie CMS** | MIT | [openfun/richie](https://github.com/openfun/richie) | Python/Django | Portal educativo (catálogo, search, SEO). Complementa Open edX con AI search, recomendaciones de cursos, personalization layer. |

## Comparativa rápida para Globant

| Criterio | Open edX | Moodle | Frappe LMS |
|----------|----------|--------|------------|
| Licencia | Apache 2.0 ✅ | GPL 3.0 ⚠️ | MIT ✅✅ |
| Escala | Enterprise (150M) | Masivo (400M) | SMB/Mid |
| AI Ready | Buena (XBlocks) | Creciente (v4.5) | Alta (extensible) |
| LATAM presencia | Alta (universidades) | Muy alta | Media |
| Time-to-value | Semanas | Días | Días |
| Recomendado para | Universidades grandes | Instituciones K-12/HE | Corporativo/Upskilling |

## Cómo customizar con AI

### Patrón Open edX
1. Fork `openedx-platform` → deploy en cloud (AWS/GCP)
2. Crear XBlock AI (`openedx/XBlock`) → insertar tutor conversacional en cada unidad
3. Añadir pipeline RAG (LangChain + Pinecone/Qdrant) sobre contenido del curso
4. Integrar LangGraph para orquestar: assess skill → generate explanation → quiz → remediate
5. Dashboard de analytics con learning patterns por estudiante

### Patrón Frappe LMS (Corporativo)
1. Deploy Frappe LMS con ERPNext → cursos + HR integrados
2. Añadir AI grading vía Automated Essay Grader (LangChain + Claude/GPT-4)
3. Capa adaptativa: EduAdapt AI → paths personalizados por rol/performance
4. Reporting automático: agente LangGraph → genera reporte de progreso semanal por manager
5. Integración con Frappe HR → linking aprendizaje con evaluación de desempeño
