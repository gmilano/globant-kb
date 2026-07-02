# Vertical Solutions — Education Industry

> Real platforms Globant can customize, extend with AI, or integrate as the backend for client engagements

---

## Learning Management Systems (LMS)

### Moodle
- **Repo**: [moodle/moodle](https://github.com/moodle/moodle)
- **License**: GPL-3.0
- **Deployed to**: 300M+ users, 240 countries, 180k+ active installations
- **Stack**: PHP / MySQL / PostgreSQL
- **AI integration path**: `local_ai_manager` + `aiprovider_openaicompatible` plugins connect any OpenAI-compatible endpoint (incl. self-hosted Ollama/LocalAI) to Moodle's core features — quiz generation, summarization, writing assistance
- **When to use**: K-12, universities, government training — wherever there's an existing Moodle investment or the client needs a proven, massively-supported platform
- **Globant angle**: Build AI plugins on top of Moodle's plugin API (PHP); or wrap Moodle as the learning backend behind a custom AI tutoring frontend

### Open edX
- **Repo**: [openedx/openedx-platform](https://github.com/openedx/openedx-platform)
- **License**: AGPLv3 (plugins can be Apache 2.0)
- **Deployed to**: edX.org, Microsoft Learn, 70M+ learners
- **Stack**: Python/Django / MySQL / MongoDB / React
- **AI integration path**: [openedx/openedx-ai-extensions](https://github.com/openedx/openedx-ai-extensions) (Apache 2.0) — the official plugin for AI-powered content summarization, question generation, and learner feedback within the platform
- **When to use**: University MOOCs, corporate learning at scale, government upskilling programs — wherever MOOC-style paced courses are needed
- **Globant angle**: Extend with AI agents for adaptive pacing, automated assessment, and learner path personalization

### Frappe LMS
- **Repo**: [frappe/lms](https://github.com/frappe/lms)
- **License**: MIT ← commercially cleanest option
- **Stack**: Python (Frappe Framework) / MariaDB / Vue.js
- **AI integration path**: Frappe's REST API + Python backend make it trivial to add LangChain/CrewAI-powered features as custom Frappe DocTypes or background jobs
- **When to use**: Greenfield builds where the client wants a modern, beautiful LMS with MIT license and no GPL concerns; corporate L&D, professional training
- **Globant angle**: Best base for a custom AI-enhanced LMS product; pair with AnythingLLM for document RAG and DeepTutor for tutoring

### ClassroomIO
- **Repo**: [classroomio/classroomio](https://github.com/classroomio/classroomio)
- **License**: MIT
- **Stack**: SvelteKit / Supabase / TailwindCSS
- **AI features built-in**: AI lesson outline generation, auto video transcription, AI-powered grading assistance
- **When to use**: Corporate training teams, bootcamps, professional education companies wanting a Teachable/Thinkific alternative they own and can extend
- **Globant angle**: Fast to customize; Supabase backend means easy integration with OpenAI/Anthropic via Edge Functions

---

## Virtual Classroom / Synchronous Learning

### BigBlueButton (BBB)
- **Repo**: [bigbluebutton/bigbluebutton](https://github.com/bigbluebutton/bigbluebutton)
- **License**: LGPLv3
- **Users**: Millions; integrated with Moodle, Open edX, Canvas, Sakai
- **AI integration path**: BBB's recording + transcript pipeline feeds into LLM summarization; meeting notes, action items, and Q&A extraction post-session
- **When to use**: Any synchronous/live teaching requirement; mandatory when deploying Moodle or Open edX for live classes
- **Globant angle**: Post-session AI digest agents — auto-generate summary, quiz questions, and knowledge gaps report from BBB recordings

### Jitsi Meet
- **Repo**: [jitsi/jitsi-meet](https://github.com/jitsi/jitsi-meet)
- **License**: Apache 2.0
- **When to use**: Lighter-weight 1:1 or small group tutoring sessions; simpler to self-host than BBB
- **Globant angle**: Embed into AI tutoring applications for live video tutoring with an AI co-pilot

---

## Offline / Edge Learning

### Kolibri (Learning Equality)
- **Repo**: [learningequality/kolibri](https://github.com/learningequality/kolibri)
- **License**: MIT
- **Mission**: Free, offline-first education for students without reliable internet
- **Stack**: Python (Django) / SQLite / Vue.js / Electron (desktop app)
- **Backed by**: USAID, UNESCO, Bill & Melinda Gates Foundation
- **AI integration path**: Add LocalAI as a sidecar for offline LLM tutoring; Kolibri's content plugin system supports custom learning apps
- **When to use**: NGO/government clients in emerging markets, rural K-12, refugee education programs
- **Globant angle**: AI tutoring on Raspberry Pi — pair Kolibri + Kolibri Studio content + LocalAI (Phi-3 quantized) for a fully offline AI tutor device

---

## Spaced Repetition / Adaptive Study

### Anki / AnkiDroid
- **Repo**: [ankidroid/Anki-Android](https://github.com/ankidroid/Anki-Android)
- **License**: GPL-3.0
- **Users**: 10M+ active learners; proven spaced repetition algorithm
- **AI integration path**: LLM agents auto-generate Anki decks from PDFs, lecture notes, or web pages; upload via AnkiConnect API
- **When to use**: Medical/law/professional certification training where memorization + retention is measured
- **Globant angle**: "AI Study Companion" — ingest course materials → generate personalized Anki decks → track mastery → adapt with spaced repetition

---

## Student Information Systems (SIS) / Administration

### OpenSIS
- **URL**: [os4ed.com](https://www.os4ed.com/) (PHP, GPL)
- **Purpose**: K-12 student information system — enrollment, grades, attendance, transcripts
- **AI integration**: Connect to LLM agent for automated report generation, attendance anomaly detection, at-risk student identification

### ERPNext Education Module
- **Repo**: [frappe/erpnext](https://github.com/frappe/erpnext) (Education module)
- **License**: GPL-3.0
- **Purpose**: Full ERP with education module: admissions, fee management, course scheduling, LMS
- **When to use**: Educational institutions needing unified ERP + LMS + finance

---

## Platform Selection Guide for Globant Engagements

| Client Type | Recommended Stack | Rationale |
|------------|------------------|-----------|
| Large university (existing Moodle) | Moodle + local_ai_manager + BigBlueButton | Extend existing investment; 2,000+ plugins |
| MOOC / online course platform | Open edX + openedx-ai-extensions | Purpose-built for scale; 70M learner battle-tested |
| Corporate L&D (greenfield) | Frappe LMS + AnythingLLM + CrewAI | MIT license, beautiful UX, AI-native architecture |
| Bootcamp / edtech startup | ClassroomIO + DeepTutor | Modern stack, AI built in, fast to customize |
| Emerging market / NGO | Kolibri + LocalAI (Phi-3) | Offline-first, runs on Raspberry Pi, MIT |
| Professional certification | Frappe LMS + Anki + OATutor | Adaptive learning + spaced repetition for retention |
