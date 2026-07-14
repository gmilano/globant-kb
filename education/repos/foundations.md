# Foundational Repos — Education

> Bases to build on. Open license, active community, real-world deployments.
> Last updated: 2026-07-14 (v5)

## Core Platforms & Frameworks

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [moodle/moodle](https://github.com/moodle/moodle) | GPL-3.0 | ~7.2k | World's most deployed LMS — 400M+ users, 240+ countries; Moodle AI subsystem in v4.5 (tool/ai plugin) | Yes — plugin API, MoodleNet, AI subsystem |
| [openedx/openedx-platform](https://github.com/openedx/openedx-platform) | AGPL-3.0 | ~7.4k | Open edX LMS + Studio powering edX.org (Harvard/MIT origin); Python/Django; XBlock extensibility; AI plugin layer | Yes — XBlock, openedx-ai-extensions |
| [openedx/XBlock](https://github.com/openedx/XBlock) | Apache-2.0 | ~468 | Framework for building custom learning components in Open edX LMS; the right extension point for AI tutors | Yes — core extension mechanism |
| [pykt-team/pykt-toolkit](https://github.com/pykt-team/pykt-toolkit) | MIT | ~700 | Python library for 10+ Deep Knowledge Tracing models (DKT, SAKT, AKT, MoC-KT, DenoiseKT); 7 benchmark datasets; active through 2026 | Yes — student modeling backbone |
| [CAHLR/OATutor](https://github.com/CAHLR/OATutor) | MIT | ~280 | Open Adaptive Tutoring System with BKT; ReactJS + Firebase; LTI integration; Section 508 accessible; CHI 2023 award | Yes — full ITS stack |
| [overhangio/tutor](https://github.com/overhangio/tutor) | AGPLv3 | ~3.4k | Docker-based Open edX distribution — standard deploy tool for institutions; plugin system for extensions | Yes — plugin system for AI add-ons |
| [instructure/canvas-lms](https://github.com/instructure/canvas-lms) | AGPL-3.0 | ~5.3k | Canvas LMS — 30M+ users, US HE market leader; Ruby on Rails; active fork/plugin ecosystem | Partial — closed AI features, but hooks available |
| [sakai-project/sakai](https://github.com/sakai-project/sakai) | ECL-2.0 | ~1.2k | Sakai CLE — university consortium LMS (Michigan, Indiana, MIT, Stanford origins); Java/Spring; gradebook, forums, assessment | Partial — community AI extensions emerging |
| [richie-education/richie](https://github.com/richie-education/richie) | MIT | ~311 | Open-source CMS for education portals (France Université Numérique); Django + React; course catalog, search, enrollment | Yes — REST API for AI overlays |
| [moodlehq/moodleapp](https://github.com/moodlehq/moodleapp) | Apache-2.0 | ~979 | Official Moodle mobile app (iOS + Android); Ionic + Angular; push notifications, offline mode | Yes — mobile AI channel |

## Knowledge Tracing & Student Modeling

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [pykt-team/pykt-toolkit](https://github.com/pykt-team/pykt-toolkit) | MIT | ~700 | Benchmark library: DKT, SAKT, AKT, SimpleKT, MoC-KT, DenoiseKT, 10+ models |
| [CAHLR/OATutor](https://github.com/CAHLR/OATutor) | MIT | ~280 | BKT-based adaptive problem selection; extensible step/hint/mastery system |
| [CAHLR/OATutor-LLM-Learner](https://github.com/CAHLR/OATutor-LLM-Learner) | MIT | ~40 | OATutor + LLM hint/explanation generation; drop-in for math tutoring |

## AI Extension Points

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [openedx/openedx-ai-extensions](https://github.com/openedx/openedx-ai-extensions) | Apache-2.0 | ~30 | Official Open edX AI plugin: streaming chat, educator assistant, flashcards, function calling |
| [openedx/openedx-tutor-plugins](https://github.com/openedx/openedx-tutor-plugins) | Apache-2.0 | ~80 | Community Tutor plugin collection — discovery, forum, credentials, notes |
| [eduNEXT/eox-core](https://github.com/eduNEXT/eox-core) | AGPL-3.0 | ~120 | Open edX extension plugin (eduNEXT): enrollment, grading overrides, AI hooks |

---
*See also: `verticals/solutions.md` for full vertical platforms.*
