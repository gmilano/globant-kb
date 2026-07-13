# 🏭 Verticales de partida — Education

> Plataformas existentes, customizables con AI. Estrategia: partir de algo funcional → añadir capa agéntica.
> Última actualización: 2026-07-13

## Plataformas recomendadas

| Plataforma | Licencia | Repo / URL | Stack | Usuarios / Escala | Caso de uso Globant |
|------------|----------|-----------|-------|-------------------|---------------------|
| **Moodle** | GPL-3.0+ | [moodle/moodle](https://github.com/moodle/moodle) | PHP/MySQL | 300M+ usuarios, 50k+ sitios | AI quiz gen, tutoría, detección riesgo académico, LMS corporativo |
| **Open edX** | Apache-2.0 | [openedx/openedx-platform](https://github.com/openedx/openedx-platform) | Python/Django + React | 45M+ learners | MOOCs universitarios, certificaciones empresariales, XBlock AI |
| **Frappe LMS** | MIT | [frappe/lms](https://github.com/frappe/lms) | Python/Vue/MariaDB | Startups + empresas medianas | L&D corporativo, cursos open, Mon School clone |
| **Frappe Education** | MIT | [frappe/education](https://github.com/frappe/education) | Python/Vue + ERPNext | Escuelas K-12, universidades LATAM | ERP escolar: admisiones + asistencia + notas + cuotas + AI |
| **OpenEduCat** | LGPLv3 | [openeducat.org](https://www.openeducat.org/) | Python/Odoo | Universidades medianas | ERP educativo: LMS + SIS + fees + parent app (PostgreSQL) |
| **Chamilo** | GPL-3.0 | [chamilo/chamilo-lms](https://github.com/chamilo/chamilo-lms) | PHP/MySQL | LATAM y Europa | LMS liviano, español nativo, adopción alta Colombia/Ecuador/Perú |
| **Sakai** | Apache-2.0 | [sakaiproject/sakai](https://github.com/sakaiproject/sakai) | Java/Spring | Consorcio US (Michigan, Indiana, MIT, Stanford) | LMS universitario, AI assessment via plugin API Java |
| **OATutor** | MIT | [CAHLR/OATutor](https://github.com/CAHLR/OATutor) | React/Firebase | Investigación + K-12 | ITS con BKT para matemáticas adaptativas |

## Mapa de selección por caso de uso

```
¿Qué necesita el cliente?
├── LMS corporativo / L&D → Frappe LMS (MIT, Python, fácil de customizar)
├── MOOC universitario → Open edX (Apache-2.0, escala probada, XBlock AI)
├── Escuela K-12 LATAM → Frappe Education o Chamilo (español, comunidad activa)
├── Universidad con ERP → OpenEduCat o Frappe Education (ERP + LMS en uno)
├── Tutoría adaptativa → OATutor + pyBKT o DeepTutor (agente AI)
└── AI-first desde cero → DeepTutor + Frappe LMS + Open edX XBlock
```

## Cómo añadir AI a cada plataforma

### Moodle
1. Habilitar AI subsystem (core desde Moodle 4.5), configurar proveedor Ollama/OpenAI
2. Instalar `moodle-qbank_genai` o `moodle-local_aiquestions` para quiz gen
3. Añadir agente de tutoría via LTI 1.3
4. Pipeline: datos Moodle → LangGraph agent → respuestas contextuales

### Open edX
1. Crear XBlock custom con lógica del agente AI
2. Conectar openedx-events para reactividad a enrollment/grade/completion
3. Integrar API REST de Open edX para datos de progreso

### Frappe LMS / Education
1. Fork + activar API REST nativa de Frappe
2. Crear DocType "AI Session" (conversaciones, evaluaciones)
3. Webhooks Frappe → disparar agentes en eventos (bajo rendimiento, abandono)

### OATutor (tutoría adaptativa)
1. Fork del repo, cargar banco de preguntas (OATutor JSON)
2. Extender motor BKT con pyBKT + LLM para hints inteligentes
3. Conectar a Frappe LMS como sistema de registro de progreso

---
*Ver también: `repos/foundations.md` para repos técnicos fundacionales.*
