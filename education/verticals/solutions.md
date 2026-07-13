# 🏭 Verticales de partida — Education

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agentica arriba.
> Última actualización: 2026-07-13

## Plataformas recomendadas

| Plataforma | Licencia | Repo | Stack | Caso de uso |
|------------|----------|------|-------|-------------|
| **Moodle** | GPL-3.0 | [moodle/moodle](https://github.com/moodle/moodle) | PHP + PostgreSQL | LMS K-12 y universidad. 260M+ usuarios. Plugin MCP oficial disponible → cualquier LLM puede interactuar con el LMS vía JSON-RPC 2.0. Ideal para proyectos con instituciones educativas establecidas. |
| **Open edX** | AGPL-3.0 | [openedx/openedx-platform](https://github.com/openedx/openedx-platform) | Python/Django + XBlock | MOOC a escala. 70M+ usuarios. Usado por Harvard, MIT, instituciones LATAM. XBlock permite añadir AI tutors como componentes. LTI Advantage Complete. |
| **Frappe LMS** | MIT | [frappe/lms](https://github.com/frappe/lms) | Python + Frappe | L&D corporativo y cursos online. MIT = máxima libertad de customización. Deploy rápido con Frappe Cloud. Base ideal para AI coaching empresarial. |
| **Frappe Education** | MIT | [frappe/education](https://github.com/frappe/education) | Python + ERPNext | ERP escolar completo: admisiones, asistencia, notas, cuotas, biblioteca. MIT. Integra con Frappe LMS para combinar gestión escolar + contenido. LATAM-ready. |
| **OpenEduCat** | LGPL-3.0 | [openeducat/openeducat_erp](https://github.com/openeducat/openeducat_erp) | Python + Odoo | El único que integra LMS + SIS + cuotas + app de padres en una sola DB (Odoo/PostgreSQL). LGPL-3 = uso comercial libre. Ideal para colegios privados LATAM. |
| **Sakai** | Apache-2.0 | [sakaiproject/sakai](https://github.com/sakaiproject/sakai) | Java + Spring | LMS universitario de la Apereo Foundation. Muy presente en universidades latinoamericanas. Apache-2.0 = uso comercial sin restricciones. |
| **Richie** | MIT | [openfun/richie](https://github.com/openfun/richie) | Django + React | CMS de portal educativo. Front-end para Open edX o LMS independiente. Usado en France Université Numérique. MIT, ideal como capa UI con AI search. |
| **Vacademy** | AGPL-3.0 | [Vacademy-io/vacademy_platform](https://github.com/Vacademy-io/vacademy_platform) | TypeScript + Kotlin | Plataforma e-learning moderna con tracking de learners y gestión de assessments. Nueva (2025), creciendo rápido en Asia-Pacífico. |

## Cómo customizar con AI

### Capa 1: MCP sobre el LMS existente
```
Moodle / Open edX / Canvas
       ↓ MCP Plugin (JSON-RPC 2.0)
Claude / GPT / Ollama
       ↓ Tool calls
Acciones en el LMS (crear quiz, ver notas, asignar tarea)
```

### Capa 2: XBlock / Plugin AI
```
Open edX Platform
  └── XBlock AI Tutor
        ├── DeepTutor backend (Apache-2.0)
        ├── Quiz generation (GenMentor)
        └── Knowledge map personalizado por alumno
```

### Capa 3: ERP + AI agent side-car
```
Frappe Education (ERP escolar)
  └── Agent side-car (Python + CrewAI/Agno)
        ├── Agent de admisiones (procesa docs, responde consultas)
        ├── Agent de notas (análisis de rendimiento, alertas tempranas)
        └── Agent de cobros (recordatorios, planes de pago)
```

## Selección por tipo de cliente

| Cliente | Plataforma recomendada | Razón |
|---------|------------------------|-------|
| Universidad latinoamericana | Open edX + XBlock AI | Escala, MOOC, certificaciones |
| Colegio K-12 privado | Frappe Education + OpenEduCat | ERP escolar + app padres |
| Empresa (L&D corporativo) | Frappe LMS + DeepTutor | MIT, deploy rápido, AI coaching |
| Ministerio / institución pública | Moodle + MCP Plugin | GPL-3, mayor ecosistema, LATAM support |
| EdTech startup | Open edX Sumac o Vacademy | Escalable, moderno, cloud-native |
