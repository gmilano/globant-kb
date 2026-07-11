# 🏭 Verticales de partida — Education

> Plataformas verticales existentes customizables con AI.
> Modelo: partir de algo funcional, añadir capa agéntica arriba.
> Última actualización: 2026-07-11

## Plataformas LMS — punto de entrada recomendado

| Plataforma | Licencia | URL | Stack | Usuarios / Escala | Caso de uso |
|------------|----------|-----|-------|-------------------|-------------|
| **Moodle** | GPL-3.0 | [github.com/moodle/moodle](https://github.com/moodle/moodle) | PHP + JS + PostgreSQL/MySQL | 300M+ usuarios, 240+ países | K-12, universidad, corporativo — el más customizable vía plugins |
| **Open edX** | AGPL-3.0 | [github.com/openedx/edx-platform](https://github.com/openedx/edx-platform) | Django + React + MongoDB | 70M+ usuarios, base de edX/Coursera | MOOCs, certificaciones, upskilling corporativo |
| **Canvas LMS** | AGPL-3.0 | [github.com/instructure/canvas-lms](https://github.com/instructure/canvas-lms) | Ruby on Rails + React | #1 en educación superior EE.UU. | Higher education, distritos K-12 grandes |
| **Vacademy** | AGPL-3.0 | [github.com/Vacademy-io/vacademy_platform](https://github.com/Vacademy-io/vacademy_platform) | Python + TypeScript | Emergente, 200+ stars | E-learning moderno con AI hooks nativos |
| **Richie** | MIT | [github.com/openfun/richie](https://github.com/openfun/richie) | Django + React | France Université Numérique | Portal educativo / catálogo de cursos — MIT ✅ |

## Plataformas de Assessment y Quiz

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| **Open Assessment Tool (OAT)** | Apache-2.0 | [github.com/oat-sa/tao-core](https://github.com/oat-sa/tao-core) | PHP + JavaScript | Assessments adaptativos IRT, SCORM, QTI 2.2 — adoptado por ETS, Pearson |
| **Oppia** | Apache-2.0 | [github.com/oppia/oppia](https://github.com/oppia/oppia) | Python + TypeScript | Lecciones interactivas con feedback inteligente; usado por Khan Academy Foundation |
| **H5P** | MIT | [github.com/h5p/h5p-php-library](https://github.com/h5p/h5p-php-library) | PHP + JS | Contenido interactivo embebible en Moodle/Canvas/WP; 75+ tipos de actividad |

## Plataformas de Tutoring Adaptativo

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| **OATutor** | MIT | [github.com/CAHLR/OATutor](https://github.com/CAHLR/OATutor) | React + Firebase | Tutoring matemáticas con BKT; sin backend propio — deploy estático |
| **Open-TutorAI CE** | Apache-2.0 | [github.com/Open-TutorAi/open-tutor-ai-CE](https://github.com/Open-TutorAi/open-tutor-ai-CE) | Python + Web | Multi-agente, knowledge graphs, 12 idiomas; LATAM-ready |
| **DeepTutor** | Apache-2.0 | [github.com/HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) | FastAPI + Next.js | Learning workspace completo: Chat, Quiz, Research, Mastery Path |

## Plataformas de Contenido y Video

| Plataforma | Licencia | URL | Stack | Caso de uso |
|------------|----------|-----|-------|-------------|
| **PeerTube** | AGPL-3.0 | [github.com/Chocobozzz/PeerTube](https://github.com/Chocobozzz/PeerTube) | TypeScript + PostgreSQL | Video educativo federado; auto-hosted con HLS adaptive streaming |
| **Jellyfin** | GPL-2.0 | [github.com/jellyfin/jellyfin](https://github.com/jellyfin/jellyfin) | C# .NET | Media server para biblioteca de contenido educativo; API para AI search |

## Cómo customizar con AI (patrón recomendado)

```
1. Fork del LMS base (Moodle / Open edX / Vacademy)
2. Añadir AI service layer:
   - Endpoint OpenAI-compatible (Ollama local para privacy, Claude API para calidad)
   - MCP server custom para exponer herramientas LMS al agente
3. Wrap flujos existentes:
   - Quiz generation: LMS grades API → LLM → nuevas preguntas calibradas
   - Adaptive content: BKT score → LLM selector → siguiente lección
   - Tutoring chat: contexto del curso en RAG → Claude → respuesta fundamentada
4. UI conversacional (Next.js / React) sobre la plataforma base
5. Métricas de aprendizaje: LRS (xAPI / SCORM) → dashboard AI-powered
```

## Decisión rápida: ¿qué plataforma elegir?

| Contexto del cliente | Recomendación |
|---------------------|---------------|
| Corporativo / upskilling | **Open edX** — XBlock API + LTI 1.3, escala |
| K-12 / Universidad LATAM | **Moodle** — GPL, más plugins, comunidad ES/PT |
| Startup EdTech | **Vacademy** o **Richie** — más ligeros, MIT/AGPL |
| Tutoring 1-a-1 AI-first | **DeepTutor** — agent-native desde el inicio |
| Assessments / Certificaciones | **Open Assessment Tool** — QTI, IRT, adoptado por ETS |
