# 🏭 Verticales de partida — Education (v6)

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-14

## Plataformas recomendadas

| Plataforma | Repo | Licencia | Users/Sites | Stack | Caso de uso |
|------------|------|----------|-------------|-------|-------------|
| **Moodle** | [moodle/moodle](https://github.com/moodle/moodle) | GPL-3.0 | 400M usuarios / 150k sites | PHP + MySQL/PostgreSQL | LMS universal: K-12, HE, corporativo. Plugin AI v4.5+. |
| **Open edX** | [openedx/edx-platform](https://github.com/openedx/edx-platform) | Apache-2.0 | 50M+ estudiantes (edX.org) | Python/Django + React | MOOC, formación corporativa, universidades grandes. XBlock. |
| **OpenEduCat** | [OpenEduCat-Inc/OpenEduCat](https://github.com/OpenEduCat-Inc/OpenEduCat) | LGPL-3.0 | 3M+ usuarios / 100+ países | Odoo (Python) | Education ERP: admisiones + SIS + gradebook + LMS. |
| **Gibbon SIS** | [GibbonEdu/core](https://github.com/GibbonEdu/core) | GPL-3.0 | 1,200+ schools | PHP + MySQL | School management: SIS + scheduling + academic records. Complementa Moodle. |
| **Chamilo LMS** | [chamilo/chamilo-lms](https://github.com/chamilo/chamilo-lms) | GPL-2.0 | 70M+ users | PHP | LMS lightweight, muy popular LATAM (Colombia, Ecuador, Bolivia). |
| **Richie CMS** | [openfun/richie](https://github.com/openfun/richie) | MIT | 5+ national MOOC portals | Django + React | Portal MOOC. France Université Numérique. MIT — máxima libertad. |
| **Sakai LMS** | [sakaiproject/sakai](https://github.com/sakaiproject/sakai) | Apache-2.0 | 400+ institutions | Java/Spring | LMS institucional universitario norteamericano. |
| **ILIAS** | [ILIAS-eLearning/ILIAS](https://github.com/ILIAS-eLearning/ILIAS) | GPL-3.0 | 14M users | PHP | LMS robusto Europa (Alemania, Suiza, Austria). |

## Cómo customizar con AI

### Patrón 1: Moodle + AI Agents (recomendado K-12 y universidades LATAM)

```
Moodle LMS (GPL-3.0)
  └── tool_ai subsystem (Moodle 4.5+)
       ├── Provider: OpenAI / Azure OpenAI / Ollama (local)
       ├── Placements: course assistant, text editor, question bank
       └── Custom plugins: qbank_genai, local_aiquestions, block_ai_chat
  └── Moodle REST API
       └── pyKT agent — knowledge tracing sobre logs
       └── DeepTutor adapter — tutoring personalizado
```
**Tiempo**: 4-6 sem | **Licencia**: GPL-3.0 | **Para**: UNAM, USP, UBA, UNAL (ya tienen Moodle)

### Patrón 2: Open edX + XBlock AI (corporativo / MOOC)

```
Open edX (Apache-2.0)
  └── XBlock AI: DeepTutor + Instructional Agents + pyKT
  └── Analytics Pipeline: Dropout Prediction Agent
       (Input: EventTracking logs → pyKT → alertas instructores)
```
**Tiempo**: 6-10 sem | **Licencia**: Apache-2.0 propietizable | **Para**: Retail, banca, telco LATAM

### Patrón 3: OpenEduCat + AI Admin Agents (ERP institucional)

```
OpenEduCat (LGPL-3.0, base Odoo)
  └── Odoo AI module:
       Enrolment Agent + Attendance Agent + Grading Agent + Parent Communication Agent
```
**Tiempo**: 3-5 sem | **Licencia**: LGPL propietizable | **Para**: Colegios privados y redes LATAM

### Patrón 4: Chamilo + WhatsApp LATAM

```
Chamilo LMS (GPL-2.0)
  └── Chamilo REST API → n8n → WhatsApp Business API
       Agentes: Quiz, Progress, Reminder
```
**Tiempo**: 2-4 sem | **Para**: LATAM — WhatsApp como canal primario

## AI Features disponibles en plataformas (2026)

| Feature | Moodle (4.5+) | Open edX | OpenEduCat |
|---------|---------------|----------|------------|
| AI Chat en curso | ✅ (plugin) | ✅ (XBlock) | Parcial |
| Generación de preguntas | ✅ (qbank_genai) | Via XBlock | ❌ |
| Resúmenes automáticos | ✅ | ✅ | ❌ |
| Knowledge Tracing | Via plugin | Via XBlock | ❌ |
| Dropout Prediction | Via plugin | ✅ (Insights) | Via Odoo |
| Proveedor local (Ollama) | ✅ | Parcial | ❌ |
| API REST | ✅ | ✅ | ✅ (Odoo) |
| LATAM compliance (LGPD) | Via config | Via config | Via Odoo |

---
*v6 — actualizado automáticamente por el pipeline de ingest.*
