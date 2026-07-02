# Foundational Repos — Education Industry

> Core open source infrastructure Globant engagements can build on top of

---

## LMS / Course Platforms

| # | Repo | License | Stars | Language | Description |
|---|------|---------|-------|----------|-------------|
| 1 | [moodle/moodle](https://github.com/moodle/moodle) | GPL-3.0 | 7.5k | PHP | World's most deployed LMS; 300M+ users in 240 countries; 2,000+ plugins including AI, gamification, anti-plagiarism, video conferencing; plugin system in PHP makes extension straightforward |
| 2 | [openedx/openedx-platform](https://github.com/openedx/openedx-platform) | AGPLv3 | 8.1k | Python | The MOOC platform from MIT/Harvard; Django-based; powers edX.org, Microsoft Learn, and 70M+ learners; battle-tested for large-scale asynchronous learning |
| 3 | [frappe/lms](https://github.com/frappe/lms) | MIT | 2.2k | Python | Frappe-based LMS; 3-level hierarchy (course → chapter → lesson); text/video/quiz lesson types; in-lesson discussions; one-click deploy on Frappe Cloud; best MIT-licensed full LMS |
| 4 | [classroomio/classroomio](https://github.com/classroomio/classroomio) | MIT | 1.5k | Svelte | Modern alternative to Moodle for corporate training; SvelteKit + Supabase; AI lesson outline generation, auto video transcription, grading, attendance; prettier UX than legacy LMSes |
| 5 | [learningequality/kolibri](https://github.com/learningequality/kolibri) | MIT | 1.2k | Python | Offline-first education platform for underserved communities; runs on Raspberry Pi with no internet; bundles Khan Academy content, interactive exercises, and student progress tracking; critical for emerging-market engagements |

---

## Virtual Classroom / Collaboration

| # | Repo | License | Stars | Language | Description |
|---|------|---------|-------|----------|-------------|
| 6 | [bigbluebutton/bigbluebutton](https://github.com/bigbluebutton/bigbluebutton) | LGPLv3 | 8.6k | JavaScript | Open-source virtual classroom with real-time slides, whiteboard, breakout rooms, polling, screen share, and recording; integrates directly with Moodle and Open edX; Zoom alternative for educational institutions |
| 7 | [jitsi/jitsi-meet](https://github.com/jitsi/jitsi-meet) | Apache 2.0 | 23k | JavaScript | Self-hosted video conferencing; no account required; embeds into LMS portals; end-to-end encryption; lighter-weight BBB alternative for simple video tutoring |

---

## Assessment & Student Tools

| # | Repo | License | Stars | Language | Description |
|---|------|---------|-------|----------|-------------|
| 8 | [Khan/perseus](https://github.com/Khan/perseus) | MIT | 1.6k | TypeScript | Khan Academy's exercise question editor and renderer; supports math (KaTeX), graphs, interactive widgets; used to render 10M+ exercises; building block for AI-generated interactive assessments |
| 9 | [ankidroid/Anki-Android](https://github.com/ankidroid/Anki-Android) | GPL-3.0 | 7.5k | Kotlin | Android client for Anki spaced-repetition flashcard system; algorithm proven to maximize memory retention; increasingly paired with LLMs for auto-generated flashcard creation from course materials |
| 10 | [CAHLR/OATutor](https://github.com/CAHLR/OATutor) | MIT | 800+ | JavaScript | UC Berkeley's open-source Intelligent Tutoring System; Bayesian Knowledge Tracing for skill mastery estimation; problem-step-level hints; ReactJS + Firebase; proven in randomized controlled trials |

---

## AI/ML Foundations for EdTech

| # | Repo | License | Stars | Language | Description |
|---|------|---------|-------|----------|-------------|
| 11 | [openedx/openedx-ai-extensions](https://github.com/openedx/openedx-ai-extensions) | Apache 2.0 | 300+ | Python | Official Open edX AI plugin: content summarization, question generation, learner feedback — the production-ready integration point for adding AI to any Open edX deployment |
| 12 | [mintplex-labs/anything-llm](https://github.com/mintplex-labs/anything-llm) | MIT | 54k | JavaScript | Full-featured document-chat + multi-agent workspace; build course material Q&A bots in minutes; MCP-compatible, multi-user, self-hosted; the fastest path from "PDF syllabus" to "AI teaching assistant" |
| 13 | [mudler/LocalAI](https://github.com/mudler/LocalAI) | MIT | 29k | Go | Runs LLMs + vision + voice locally; OpenAI-compatible API; no GPU required; FERPA/GDPR-safe for institutional deployments — the infrastructure layer for privacy-first education AI |

---

## Key Architecture Notes

- **LMS selection drives AI integration complexity**: Moodle (GPL, PHP plugins) and Open edX (AGPLv3, Python/Django) have the largest ecosystems. Frappe LMS (MIT, Python) is the cleanest base for greenfield builds.
- **Offline-first is non-negotiable for global clients**: Kolibri + LocalAI is the stack for developing-market education deployments.
- **Perseus as assessment engine**: Khan Academy's Perseus is the most battle-tested open-source assessment renderer; pair it with LLM question generators (CrewAI, DeepTutor) for fully AI-generated adaptive assessments.
- **BigBlueButton for synchronous**: Every async LMS should pair with BBB for live sessions — it's the only open-source virtual classroom with full LMS integration.
