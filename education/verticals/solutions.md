# 🏭 Vertical Platforms — Education

> Real platforms to customise with AI. Strategy: start from a working system, add agentic layer on top.
> Last updated: 2026-07-08 (v2)

## Learning Management Systems (LMS)

| Platform | License | GitHub | Users/Scale | Stack | AI Customisation Points |
|----------|---------|--------|-------------|-------|------------------------|
| **Moodle** | GPL v3 | [moodle/moodle](https://github.com/moodle/moodle) | 400M users, 150k sites, 240 countries | PHP + PostgreSQL/MySQL | Web Services API, 1,800+ plugins, AI subsystem (4.x), Gemini LTI (2026) |
| **Open edX** | AGPLv3 | [openedx/openedx-platform](https://github.com/openedx/openedx-platform) | 100M+ learners, Harvard/MIT/Google/NASA | Python/Django + React | XBlock API; Tutor plugin system; REST API; LTI 1.3 |
| **Frappe LMS** | AGPL-3.0 | [frappe/lms](https://github.com/frappe/lms) | SMB/startups, 3k stars | Python + Vue.js | Frappe framework hooks, REST API, Python extensible. Note: AGPL-3.0 (not MIT). |
| **Canvas LMS** | AGPLv3 | [instructure/canvas-lms](https://github.com/instructure/canvas-lms) | 30M+ users, US universities | Ruby on Rails + React | LTI 1.3 (AI tool integrations), REST API, GraphQL |
| **Chamilo** | GPL v3 | [chamilo/chamilo-lms](https://github.com/chamilo/chamilo-lms) | 30M+ users, **strong LATAM focus** | PHP | Plugin system, REST API; leading open-source LMS in Spanish-speaking markets |
| **Google Classroom** | Proprietary + MCP | classroom.google.com | 150M+ students/teachers | Google Workspace | **Google Classroom MCP server** (ISTE 2026): external AI platforms can securely access Classroom context via MCP. Gemini AI tools at no cost. |

## School & University ERP

| Platform | License | GitHub | Description | AI Layer |
|----------|---------|--------|-------------|----------|
| **Frappe Education** | GPL v3 | [frappe/education](https://github.com/frappe/education) | Full school ERP on ERPNext: admissions, attendance, grades, fees, timetable | ERPNext AI, Python hooks, LLM-ready |
| **OpenEduCat** | LGPLv3 | [openeducat/openeducat_erp](https://github.com/openeducat/openeducat_erp) | Odoo-based education ERP: admissions, fees, library, exams, parent portal | Odoo AI extensions |
| **Fedena** | Apache 2.0 | [projectfedena/fedena](https://github.com/projectfedena/fedena) | Ruby on Rails school management: attendance, grades, reports | REST API for AI integration |
| **OpenEMIS** | Apache 2.0 | [openemis/core](https://github.com/openemis/core) | UNESCO-backed Education Management Info System for national-scale deployments | API-first |

## Adaptive / Intelligent Tutoring

| Platform | License | GitHub | Description | AI Layer |
|----------|---------|--------|-------------|----------|
| **DeepTutor** | Apache 2.0 | [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) | Document-centric agent-native tutoring: upload PDF → AI tutor in 6 modes. 22k stars. | GraphRAG + LightRAG + Math Animator |
| **OATutor** | MIT | [CAHLR/OATutor](https://github.com/CAHLR/OATutor) | Berkeley open-source ITS with Bayesian Knowledge Tracing | BKT + LLM hint generation |
| **studyield** | MIT | [studyield/studyield](https://github.com/studyield/studyield) | Self-hosted AI learning: multi-agent, knowledge graphs, teach-back | Multi-agent native |
| **Open-TutorAI CE** | BSD-3 | [Open-TutorAi/open-tutor-ai-CE](https://github.com/Open-TutorAi/open-tutor-ai-CE) | AI tutor with Ollama local RAG, avatars, voice, video | Fully AI-native, offline-capable |

## Content Portals & CMS

| Platform | License | GitHub | Description | AI Layer |
|----------|---------|--------|-------------|----------|
| **Richie** | MIT | [openfun/richie](https://github.com/openfun/richie) | Django CMS for education portals: course catalog, search, enrollment | Search AI; course recommendation |

## AI Integration Patterns by Platform

```
Strategy 1 — Google Classroom MCP (NEW 2026)
  1. Implement MCP client pointing to Google Classroom MCP server
  2. AI agents read/write roster, assignments, grades via MCP
  3. Build AI tutor that has Classroom context without custom integration
  → Time: 1–2 weeks for first MCP integration
  → Requires: Google Workspace for Education account + MCP client

Strategy 2 — Gemini LTI for Moodle (NEW 2026)
  1. Install Gemini LTI plugin in Moodle admin
  2. Students/teachers access Gemini, NotebookLM, AI Podcast Lessons directly in Moodle
  3. Extend with custom LTI tools for advanced AI use cases
  → Time: 1 day setup; 1–2 weeks for custom extension
  → Note: Moodle AI subsystem (4.x) handles data privacy

Strategy 3 — LTI Tool (works with Moodle, Canvas, Open edX, Google Classroom)
  1. Build AI tool as LTI 1.3 provider (FastAPI + PyLTI1p3)
  2. Register tool in LMS admin
  3. Embed AI tutor/quiz-gen/assessor as LMS activity
  → Time: 1–2 weeks for POC

Strategy 4 — Open edX XBlock
  1. pip install -e ./my-ai-xblock
  2. Register in INSTALLED_APPS + xblocks
  3. AI component available in Studio (course authoring)
  → Time: 2–3 weeks for first XBlock

Strategy 5 — Frappe Hook (frappe/lms or frappe/education)
  1. Create Frappe app: bench new-app my_edu_ai
  2. Add document hooks: on_submit, on_update
  3. Call AI agent (LangChain/CrewAI) from hook
  → Time: 1 week for basic integration
  
Strategy 6 — Moodle Plugin (+ Gemini LTI)
  1. PHP plugin in /local/ or /mod/ directory
  2. Use Moodle AI subsystem (4.x) + Gemini LTI bridge
  3. AI assistant surfaces in course context
  → Time: 2–3 weeks
```

## LATAM Platform Landscape

| Region | Dominant Platform | Opportunity |
|--------|------------------|-------------|
| Brazil | Moodle + Google Classroom + homegrown | LGPD-compliant AI layer; local hosting required |
| Mexico | Google Classroom (SEP program) + Moodle | Classroom MCP integration for SEP school AI programs |
| Argentina | Moodle + Chamilo (economic constraints) | Low-cost self-hosted AI (Ollama + Open-TutorAI) |
| Colombia | Chamilo + Moodle + Platzi (commercial) | Spanish-language AI tutor for higher ed |
| Chile | Canvas + Open edX (university focus) | University AI advisor + degree planning agents |

---
*See `compose/patterns.md` for end-to-end architecture recipes.*
