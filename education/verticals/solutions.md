# 🏭 Vertical Solutions — Education

> Real platforms to customize with AI. Build on proven foundations, add an agentic layer on top.
> Strategy: fork a working platform → inject AI capabilities → deliver 10x faster than greenfield.
> Last updated: 2026-07-06 (second pass)

## Core LMS Platforms

| Platform | License | Stars | URL | Stack | Best for |
|----------|---------|-------|-----|-------|----------|
| **Open edX** | Apache 2.0 | 8.1k | [github.com/openedx/openedx-platform](https://github.com/openedx/openedx-platform) | Django/Python, React MFEs | Universities, MOOCs, corporate academies with 10k+ learners. 140M+ users globally. XBlock AI plugin system. |
| **Moodle** | GPL 3.0 | 5.5k | [github.com/moodle/moodle](https://github.com/moodle/moodle) | PHP, Mustache templates | K-12 and higher education with existing Moodle installations. 300M+ users. Built-in AI subsystem in v4.5. |
| **Canvas LMS** | AGPL 3.0 | 5.6k | [github.com/instructure/canvas-lms](https://github.com/instructure/canvas-lms) | Ruby on Rails, React | US higher education market (40% of universities). LTI 1.3 native. Strong accessibility (a11y). |
| **Frappe LMS** | AGPL 3.0 | 2.1k | [github.com/frappe/lms](https://github.com/frappe/lms) | Python/Frappe, Vue.js | SMB corporate training, startups. Simple admin, ERPNext-compatible, easy Python scripting for AI. |
| **ClassroomIO** | Apache 2.0 | 1.4k | [github.com/classroomio/classroomio](https://github.com/classroomio/classroomio) | SvelteKit, Supabase | Corporate L&D teams moving off Google Classroom/Thinkific. Beautiful UI, Apache-2.0 clean license. |
| **Chamilo LMS** | GPL 3.0 | 820+ | [github.com/chamilo/chamilo-lms](https://github.com/chamilo/chamilo-lms) | PHP, Symfony | LATAM universities and governments — largest in Spanish-speaking markets. French + Spanish communities. |

## Deployment Infrastructure

| Platform | License | Stars | Description |
|----------|---------|-------|-------------|
| **Tutor (Open edX)** | AGPL 3.0 | 5.2k | [github.com/overhangio/tutor](https://github.com/overhangio/tutor) — Docker-based Open edX deployment. Install Open edX in 5 min. Plugin system. The standard self-hosted edX distribution. |
| **Moodle Docker** | GPL 3.0 | 600+ | [github.com/moodlehq/moodle-docker](https://github.com/moodlehq/moodle-docker) — Official Moodle Docker containers. Instant dev environment, CI-friendly. |

## AI Plugins & Extensions (Plug Into Existing LMS)

| Plugin | License | Platform | Description |
|--------|---------|----------|-------------|
| [moodle-ai-assistant](https://github.com/microsoft/moodle-ai-assistant) | MIT | Moodle | Microsoft accelerator: floating chatbot, Azure OpenAI, RAG over course content |
| [SOLA](https://github.com/saylordotorg/moodle-local_ai_course_assistant) | GPL 3.0 | Moodle | Multi-provider (Claude/OpenAI/Ollama), streaming, role-aware; in production May 2026 |
| [moodle-block_openai_chat](https://github.com/Limekiller/moodle-block_openai_chat) | GPL 3.0 | Moodle | 24/7 AI chat support block; persona customization |
| [openedx/XBlock](https://github.com/openedx/XBlock) | Apache 2.0 | Open edX | Framework for custom learning components — embed AI tutors, adaptive problems |

## Offline & Low-Connectivity Education

| Platform | License | Stars | URL | Best for |
|----------|---------|-------|-----|----------|
| **Kolibri** | MIT | 700+ | [github.com/learningequality/kolibri](https://github.com/learningequality/kolibri) | Schools with no reliable internet. 220+ countries, 173+ languages, Raspberry Pi-ready. Offline AI Phase 3 (post-July 2026) adds on-device LLM tutoring. UNHCR refugee camps, rural LATAM. |
| **Kolibri Studio** | MIT | 200+ | [github.com/learningequality/studio](https://github.com/learningequality/studio) | Content curation tool for Kolibri. Build custom offline content channels for specific national curricula. |

## Micro-credentials & Digital Badging

| Platform | License | Stars | URL | Description |
|----------|---------|-------|-----|-------------|
| **Badgr Server** | Apache 2.0 | 300+ | [github.com/concentricsky/badgr-server](https://github.com/concentricsky/badgr-server) | Open Badges 3.0 issuing server. W3C Verifiable Credentials backed. Django/Python. Powers Canvas Credentials. Issue verifiable skill badges from any LMS. |
| **Open Badges Validator** | MIT | 100+ | [github.com/1EdTech/openbadges-validator-core](https://github.com/1EdTech/openbadges-validator-core) | Reference OB3 validator from 1EdTech (IMS Global). Verify badge integrity and interoperability across Credly, Accredible, Canvas Credentials, etc. |

> Open Badges 3.0 finalized June 2024 by 1EdTech. Built on W3C Verifiable Credentials. Google, IBM, Microsoft, Amazon now issue and recognize OB3 badges in recruitment.

## Specialized Vertical Platforms

| Platform | License | Description |
|----------|---------|-------------|
| **OpenMCT** (NASA) | Apache 2.0 | [github.com/nasa/openmct](https://github.com/nasa/openmct) — Mission control web framework. Used as base for advanced STEM education dashboards + learning analytics visualization. |
| **H5P** | MIT | [github.com/h5p/h5p-php-library](https://github.com/h5p/h5p-php-library) — Interactive content framework (quizzes, interactive video, flashcards). Integrates with Moodle/Canvas/edX. 500+ content types. AI content generation layer being built on top. |
| **BigBlueButton** | LGPL 3.0 | [github.com/bigbluebutton/bigbluebutton](https://github.com/bigbluebutton/bigbluebutton) — Open source virtual classroom. WebRTC video. AI transcription, note-taking, and engagement analytics plugins available. |

## How to Add AI to Any Platform

```
1. Fork the platform repo (Open edX, Moodle, Chamilo, Kolibri, etc.)
2. Pick your AI entry point:
   - Open edX: build an XBlock with LangChain RAG
   - Moodle: install SOLA plugin (GPL) or build local_* plugin
   - Canvas: build an LTI 1.3 tool with AI backend
   - Frappe LMS: write a Python frappe.whitelist() API + Vue frontend
   - Kolibri: build a Kolibri plugin with offline LLM (Ollama) backend
3. Connect to LLM:
   - Cloud: OpenAI / Anthropic API
   - On-premise: Ollama (MIT) running Llama 3.1 / Mistral 7B
   - Ultra-low-power: Llama 3.2 3B on Raspberry Pi 5
4. Add memory science:
   - FSRS (MIT) for spaced repetition review scheduling post-concept
   - pyBKT (BSD) for mastery-based problem selection
5. Wrap with agents:
   - Simple Q&A: LangChain + FAISS RAG
   - Adaptive tutoring: pyBKT + OATutor BKT engine
   - Persistent tutor: DeepTutor architecture reference
6. Issue credentials:
   - Badgr Server (Apache 2.0) for Open Badges 3.0 on skill milestones
7. Deploy:
   - Open edX: via Tutor plugin system
   - Moodle: as local_* plugin (standard Moodle dir structure)
   - Kolibri: as kolibri plugin (offline-safe)
```

---
*See also: `agents/top.md` for the AI agents that go on top of these platforms.*
