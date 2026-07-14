# Vertical Solutions — Education

> Existing open-source platforms Globant can customize with AI layers.
> Model: start from something functional, add an agentic layer on top.
> Last updated: 2026-07-14 (v5)

## Recommended Platforms

| Platform | License | Repo | Stack | Scale | AI Opportunity |
|----------|---------|------|-------|-------|----------------|
| **Moodle** | GPL-3.0 | [moodle/moodle](https://github.com/moodle/moodle) | PHP + MySQL/PostgreSQL | 400M+ users, 240+ countries | AI subsystem (v4.5): plug in tutoring agents, automated grading, copilot for instructors; Moodle AI plugin (tool/ai) provides provider abstraction |
| **Open edX** | AGPL-3.0 | [openedx/openedx-platform](https://github.com/openedx/openedx-platform) | Python/Django + React | edX.org + 1000s of institutions | XBlock for AI exercises; openedx-ai-extensions (streaming AI chat, flashcards, educator assistant); MOOC-at-scale |
| **Canvas LMS** | AGPL-3.0 | [instructure/canvas-lms](https://github.com/instructure/canvas-lms) | Ruby on Rails + React | 30M+ users, US HE #1 | LTI 1.3 integration point; AI tools via partnership APIs; gradebook + outcome data accessible |
| **Sakai** | ECL-2.0 | [sakai-project/sakai](https://github.com/sakai-project/sakai) | Java/Spring | University consortia | Gradebook, forums, assessments — wrap each with specialized AI agents; lower competition than Moodle/Canvas |
| **Tutor (Open edX distro)** | AGPL-3.0 | [overhangio/tutor](https://github.com/overhangio/tutor) | Docker + Python | Production standard | Plugin system: add AI tutoring, analytics, content generation as Tutor plugins; fastest Open edX deployment path |
| **Richie** | MIT | [richie-education/richie](https://github.com/richie-education/richie) | Django + React + Elasticsearch | FUN (France Université Numérique) scale | Course catalog + enrollment CMS; REST API → layer AI recommender + personalization on top |
| **Vacademy** | AGPL-3.0 | [Vacademy-io/vacademy_platform](https://github.com/Vacademy-io/vacademy_platform) | TypeScript + Java | APAC deployments | Modern LMS with learner tracking + assessment; AI content delivery ready; newer codebase |

## Specialized EdTech Verticals

| Platform | License | Repo | Use Case |
|----------|---------|------|----------|
| OATutor | MIT | [CAHLR/OATutor](https://github.com/CAHLR/OATutor) | Adaptive intelligent tutoring for STEM (math, CS); BKT-based; LTI for LMS integration |
| Open TutorAI CE | BSD-3-Clause | [Open-TutorAi/open-tutor-ai-CE](https://github.com/Open-TutorAi/open-tutor-ai-CE) | AI tutoring platform with voice/video + 3D avatars; multi-LLM; standalone or embedded |
| Richie CMS | MIT | [richie-education/richie](https://github.com/richie-education/richie) | Education portal CMS for course catalogs and search |

## How to Add AI to Any Platform

```
1. Deploy base platform (Moodle / Open edX / Canvas via Tutor)
           ↓
2. Expose LMS data via LTI 1.3 or REST API
           ↓
3. Add AI middleware (FastAPI / LangGraph / CrewAI) 
           — calls LMS API for grades, progress, course structure
           — calls LLM (Claude / Llama / Qwen) for tutoring, generation
           ↓
4. Embed AI widgets in LMS via LTI tool or iframe plugin
           — Chat tutor panel, quiz generator, feedback copilot
           ↓
5. Feed learner events back to Knowledge Tracing model (pyKT)
           — Adaptive difficulty sequencing
           — Dropout risk scoring → retention alerts
```

## LMS AI Plugin Landscape (2026)

| Platform | Native AI | Best Plugin/Extension |
|----------|-----------|-----------------------|
| Moodle | tool_ai (v4.5, provider-agnostic) | openai (community), local_ai, MoodleNet AI |
| Open edX | openedx-ai-extensions (Apache-2.0) | eduNEXT eox-core + AI persona XBlocks |
| Canvas | Closed AI (AWS Bedrock, OpenAI, Khanmigo) | LTI 1.3 custom tools |
| Sakai | Community plugins in development | LTI 1.3 + custom AI servlets |
