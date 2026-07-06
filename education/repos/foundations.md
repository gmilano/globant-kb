# 🏗️ Foundational Repos — Education

> Core open source infrastructure to build AI-powered education solutions on top of.
> Foco: real repos with active communities, open licenses, Globant-buildable.
> Last updated: 2026-07-06

## LMS Platforms (Learning Management Systems)

| Repo | License | Stars | Description | AI-Ready? |
|------|---------|-------|-------------|-----------|
| [openedx/openedx-platform](https://github.com/openedx/openedx-platform) | Apache 2.0 | 8.1k | Open edX LMS + Studio. Harvard + MIT origin. 140M+ learners. Django/Python. XBlock plugin system for AI extensions. AGPL-clean fork via 2021 license change. | ✅ XBlock AI plugins |
| [moodle/moodle](https://github.com/moodle/moodle) | GPL 3.0 | 5.5k | The world's most deployed LMS. 300M+ users, 150k+ sites, massive plugin ecosystem. PHP. Built-in AI subsystem (Moodle 4.5+) with provider abstraction. | ✅ AI subsystem + plugins |
| [instructure/canvas-lms](https://github.com/instructure/canvas-lms) | AGPL 3.0 | 5.6k | Canvas LMS by Instructure. Used by ~40% US universities. Ruby on Rails. LTI 1.3 standard support. Active AI integrations via partner marketplace. | ✅ LTI AI integrations |
| [frappe/lms](https://github.com/frappe/lms) | AGPL 3.0 | 2.1k | Frappe LMS — simple, beautiful self-hosted LMS. Python/Frappe framework. ERPNext-compatible. Easy to extend with Python agents. | ✅ Native Python AI |
| [classroomio/classroomio](https://github.com/classroomio/classroomio) | Apache 2.0 | 1.4k | Open source education platform for companies. SvelteKit + Supabase. Simple alternative to Moodle for corporate L&D. AI-friendly REST API. | ✅ Corporate L&D |

## LMS Deployment & Infrastructure

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [overhangio/tutor](https://github.com/overhangio/tutor) | AGPL 3.0 | 5.2k | Docker-based Open edX deployment tool. The de facto way to self-host Open edX. Plugin system (tutor-mfe, tutor-notes, tutor-android). AI plugins can be installed via `tutor plugins`. |
| [openedx/XBlock](https://github.com/openedx/XBlock) | Apache 2.0 | 500+ | XBlock framework — build custom learning components for Open edX. The canonical way to embed AI tutors, adaptive problems, and auto-graders into edX courses. |

## Adaptive Learning & Knowledge Tracing

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [CAHLR/pyBKT](https://github.com/CAHLR/pyBKT) | BSD 3-Clause | 300+ | Bayesian Knowledge Tracing in Python. UC Berkeley. Standard library for modeling student mastery. Sklearn-compatible API. The backbone of any adaptive learning system. |
| [pykt-team/pykt-toolkit](https://github.com/pykt-team/pykt-toolkit) | MIT | 620+ | 20+ deep learning knowledge tracing models (DKT, SAKT, SAINT+, AKT, DIMKT, etc.) benchmarked on standard EDM datasets. PyTorch. The reference toolkit for KT research turning to production. |
| [CAHLR/OATutor](https://github.com/CAHLR/OATutor) | MIT | 250+ | Open Adaptive Tutoring System. ReactJS + Firebase. BKT-based mastery. Deploy to GitHub Pages in minutes. LTI middleware for Moodle/Canvas integration. 550+ math problems library included. |

## NLP & Language Processing for Education

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [openai/openai-python](https://github.com/openai/openai-python) | MIT | 28k | OpenAI SDK — standard interface for GPT-4o in edu apps. Used by most edu AI plugins. |
| [anthropics/anthropic-sdk-python](https://github.com/anthropics/anthropic-sdk-python) | MIT | 3.5k | Anthropic SDK. Claude's extended context and instruction-following make it well-suited for document-heavy tutoring RAGs. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | MIT | 105k | Standard RAG + document Q&A framework. Core infrastructure for course-aware AI tutors — load course PDFs, syllabuses, textbooks → retrieval-augmented answers. |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | 26k | Stateful multi-agent graphs. Powers persistent tutoring agents, multi-step assessment workflows, and adaptive curriculum orchestration. |

## Analytics & Early Warning

| Repo | License | Stars | Description |
|------|---------|-------|-------------|
| [dssg/student-early-warning](https://github.com/dssg/student-early-warning) | MIT | 450+ | ML-based dropout predictor from Data Science for Social Good. Longitudinal student data → risk scores + explainable feature breakdown for counselors. |
| [youngsaver/predicting_dropouts](https://github.com/youngsaver/predicting_dropouts) | MIT | 80+ | OpenSDP guide: ML dropout prediction R code + sample data. Designed for education data analysts without ML background. |

---
*See also: `verticals/solutions.md` for full vertical platforms.*
