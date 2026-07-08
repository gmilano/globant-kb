# 🏭 Vertical Platforms — Education

> Real platforms to customise with AI. Strategy: start from a working system, add agentic layer on top.
> Last updated: 2026-07-08

## Learning Management Systems (LMS)

| Platform | License | GitHub | Users/Scale | Stack | AI Customisation Points |
|----------|---------|--------|-------------|-------|------------------------|
| **Moodle** | GPL v3 | [moodle/moodle](https://github.com/moodle/moodle) | 400M users, 150k sites | PHP + PostgreSQL/MySQL | Web Services API, plugin system (1,800+ plugins), AI subsystem (Moodle 4.x) |
| **Open edX** | AGPLv3 | [openedx/openedx-platform](https://github.com/openedx/openedx-platform) | 100M+ learners, Harvard/MIT/Google | Python/Django + React | XBlock API for custom AI components; Tutor plugin system; REST API |
| **Frappe LMS** | MIT | [frappe/lms](https://github.com/frappe/lms) | SMB/startups, 3k stars | Python + Vue.js | Frappe framework hooks, REST API, Python extensible |
| **Canvas LMS** | AGPLv3 | [instructure/canvas-lms](https://github.com/instructure/canvas-lms) | 30M+ users, US universities | Ruby on Rails + React | LTI 1.3 (AI tool integrations), REST API, GraphQL |
| **Chamilo** | GPL v3 | [chamilo/chamilo-lms](https://github.com/chamilo/chamilo-lms) | 30M+ users, LATAM focus | PHP | Plugin system, REST API; strong in Spanish-speaking markets |

## School & University ERP

| Platform | License | GitHub | Description | AI Layer |
|----------|---------|--------|-------------|----------|
| **Frappe Education** | GPL v3 | [frappe/education](https://github.com/frappe/education) | Full school ERP on ERPNext: admissions, attendance, grades, fees, timetable | ERPNext AI, Python hooks |
| **OpenEduCat** | LGPLv3 | [openeducat/openeducat_erp](https://github.com/openeducat/openeducat_erp) | Odoo-based education ERP: admissions, fees, library, exams, parent portal | Odoo AI extensions |
| **Fedena** | Apache 2.0 | [projectfedena/fedena](https://github.com/projectfedena/fedena) | Ruby on Rails school management: attendance, grades, reports | REST API |

## Adaptive / Intelligent Tutoring

| Platform | License | GitHub | Description | AI Layer |
|----------|---------|--------|-------------|----------|
| **OATutor** | MIT | [CAHLR/OATutor](https://github.com/CAHLR/OATutor) | Berkeley open-source ITS with Bayesian Knowledge Tracing | BKT + LLM hint generation |
| **studyield** | MIT | [studyield/studyield](https://github.com/studyield/studyield) | Self-hosted AI learning: multi-agent, knowledge graphs, teach-back | Multi-agent native |
| **Open-TutorAI CE** | BSD-3 | [Open-TutorAi/open-tutor-ai-CE](https://github.com/Open-TutorAi/open-tutor-ai-CE) | AI tutor with Ollama local RAG, avatars, voice, video | Fully AI-native |

## Content Portals & CMS

| Platform | License | GitHub | Description | AI Layer |
|----------|---------|--------|-------------|----------|
| **Richie** | MIT | [openfun/richie](https://github.com/openfun/richie) | Django CMS for education portals: course catalog, search, enrollment | Search AI; course recommendation |
| **DeepTutor** | Apache 2.0 | [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) | Document-centric tutoring: upload PDF → AI tutor across 6 modes | GraphRAG native |

## How to Add AI to Any LMS

```
Strategy 1 — LTI Tool (works with Moodle, Canvas, Open edX)
  1. Build AI tool as LTI 1.3 provider (FastAPI + PyLTI1p3)
  2. Register tool in LMS admin
  3. Embed AI tutor/quiz-gen/assessor as LMS activity
  → Time: 1–2 weeks for POC

Strategy 2 — Open edX XBlock
  1. pip install -e ./my-ai-xblock
  2. Register in INSTALLED_APPS + xblocks
  3. AI component available in Studio (course authoring)
  → Time: 2–3 weeks for first XBlock

Strategy 3 — Frappe Hook (frappe/lms or frappe/education)
  1. Create Frappe app: bench new-app my_edu_ai
  2. Add document hooks: on_submit, on_update
  3. Call AI agent (LangChain/CrewAI) from hook
  → Time: 1 week for basic integration

Strategy 4 — Moodle Plugin
  1. PHP plugin in /local/ or /mod/ directory
  2. Use Moodle AI subsystem (4.x) or Web Services API
  3. AI assistant surfaces in course context
  → Time: 2–3 weeks
```

---
*See `compose/patterns.md` for end-to-end architecture recipes.*
