# 🏭 Verticales de partida — Education

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-11

## Plataformas recomendadas

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| **Moodle** | GPL-3.0 | [moodle.com](https://moodle.com) / [github](https://github.com/moodle/moodle) | PHP + PostgreSQL/MySQL | LMS institucional: 400M+ usuarios, 240 países, 1.800+ plugins. Base ideal para AI via Moodle AI Subsystem (4.5+) y external tools (LTI 1.3). |
| **Open edX** | AGPLv3 | [openedx.org](https://openedx.org) / [github](https://github.com/openedx/edx-platform) | Python/Django + React + MySQL | MOOC enterprise: Harvard, MIT, IBM, Microsoft. 70M+ usuarios. XBlocks para componentes AI custom. Escalable a 100k+ alumnos. |
| **Canvas LMS** | AGPLv3 | [instructure.com](https://www.instructure.com) / [github](https://github.com/instructure/canvas-lms) | Ruby on Rails + React + PostgreSQL | Higher ed: +30M estudiantes, API REST completa, OAuth2, LTI 1.3. Punto de entrada AI via API o canvas-ai-integration. |
| **LearnHouse** | MIT | [learnhouse.app](https://www.learnhouse.app) / [github](https://github.com/learnhouse/learnhouse) | Next.js + FastAPI + PostgreSQL | LMS moderno self-hosted: AI nativa, code execution 30+ lenguajes, auto-grading, whiteboard, Docker Compose. Mejor opción para proyectos nuevos. |
| **Kolibri** | MIT | [learningequality.org/kolibri](https://learningequality.org/kolibri/) / [github](https://github.com/learningequality/kolibri) | Python/Django + Vue.js | Offline-first: 200+ países, dispositivos de bajo costo, OER completo. Crítico para LATAM y mercados emergentes. Integrable con Ollama para AI offline. |
| **OpenEduCat** | LGPLv3 | [openeducat.org](https://www.openeducat.org) | Odoo (Python) + PostgreSQL | Education ERP: admisiones, asistencia, notas, fees, biblioteca, portal padres — todo en Odoo. Base ideal para instituciones con Odoo ya instalado. |
| **Chamilo** | GPL-3.0 | [chamilo.org](https://chamilo.org) | PHP + MySQL/MariaDB | LMS latinoamericano: soporte nativo español/portugués, 600+ instituciones LATAM, base excelente para customización regional. |
| **ILIAS** | GPL-3.0 | [ilias.de](https://www.ilias.de) | PHP + MySQL | LMS europeo: compliance fuerte, SCORM/xAPI, popular en Alemania/Suiza/Austria. Base para proyectos en la región DACH. |

---

## Cómo customizar con AI

### Para Moodle
1. Activar **Moodle AI Subsystem** (disponible desde Moodle 4.5+)
2. Conectar proveedor AI via `ai_config` (OpenAI, Anthropic, Azure)
3. Instalar plugin [moodle-ai-playground](https://github.com/moodlehq/moodle-ai-playground) para prototipado rápido
4. Usar **External Tool (LTI 1.3)** para integrar DeepTutor o LearnHouse como herramienta externa
5. Webhooks de Moodle → LangGraph para automatizar coaching personalizado

### Para Open edX
1. Construir un **XBlock** que llame a LangGraph/DeepTutor via API
2. El XBlock aparece como actividad nativa en el LMS — sin fricción para el estudiante
3. Usar **Tutor** (tutor.overhang.io) para deployment Docker de edX con extensiones AI
4. edX Analytics API → pipeline de datos → agente de coaching personalizado

### Para LearnHouse (stack nuevo, recomendado)
1. Fork de [learnhouse/learnhouse](https://github.com/learnhouse/learnhouse)
2. Configurar FastAPI backend + PostgreSQL + Redis
3. Integrar DeepTutor como servicio de tutoring via API interna
4. Añadir EduAgent (LangGraph) para RAG sobre materiales del cliente
5. Deploy via Docker Compose en AWS/GCP/Azure

### Para Kolibri (offline + LATAM)
1. Configurar Kolibri en servidor local o Raspberry Pi 5 (8GB)
2. Añadir Llama 3.1 8B via Ollama (corre offline, ~5GB VRAM)
3. Plugin Kolibri custom (Python) que llama a Ollama API para Q&A sobre el contenido
4. Sync periódico cuando hay conexión: actualizar modelos, contenido OER, logs de progreso

---

## Decision tree: ¿Qué plataforma recomendar?

```
¿El cliente tiene Odoo?     → OpenEduCat (LGPLv3)
¿Proyecto legacy Moodle?    → Moodle + AI plugins (Moodle 4.5+ AI Subsystem)
¿Universidad escala >10k?   → Open edX + XBlock AI custom
¿Startup / proyecto nuevo?  → LearnHouse (MIT, stack moderno)
¿Sin internet confiable?    → Kolibri + Ollama local (MIT)
¿Experiencia inmersiva AI?  → OpenMAIC (MIT desde jun 2026)
¿LATAM con español nativo?  → Chamilo o Moodle (soporte es nativo)
¿Canvas ya instalado?       → canvas-lms + extensiones AI via REST API
```

---
*Ingest education v9 — 2026-07-11*
