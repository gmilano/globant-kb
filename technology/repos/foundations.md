# 🏗️ Repos fundacionales — Technology / Software Development

> Bases sobre las cuales construir soluciones AI para clientes tech.
> Licencia abierta, comunidad activa, producción-ready.
> Última actualización: 2026-07-13 (v12)

## Frameworks de agentes y LLM

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|-------------|
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | MIT | ~142k | Framework estándar para apps LLM: chains, memory, tools, RAG. La "stdlib" del ecosistema. | Sí — toda la cadena de valor |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | ~33k | Multi-agent con state machines y grafos cíclicos. 34.5M descargas/mes. Arquitectura de facto para flujos complejos. | Sí — orquestación multi-step |
| [All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands) | MIT | ~80k | Agente de coding autónomo y sandboxed (ex-OpenDevin). Corre en CI, headless, con Docker. | Sí — base para coding automation |
| [huggingface/smolagents](https://github.com/huggingface/smolagents) | Apache-2.0 | ~27k | Framework minimalista: LLM escribe Python, no JSON. Setup en 5 minutos. | Sí — prototipado ágil |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | MIT | ~86k | Web automation para agentes: click, forms, scraping. Convierte cualquier web en API para agents. | Sí — integración web legacy |

## Coding agents (terminal / IDE)

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|-------------|
| [anomalyco/opencode](https://github.com/anomalyco/opencode) | MIT | ~181k | Terminal coding agent con 75+ providers y LSP. Referencia del mercado. | Sí — punto de entrada standard |
| [paul-gauthier/aider](https://github.com/paul-gauthier/aider) | Apache-2.0 | ~45k | Git-native pair programmer: edita archivos, hace commits, trabaja con todo modelo. | Sí — workflows disciplinados |
| [block/goose](https://github.com/block/goose) | Apache-2.0 | ~51k | MCP-first agent de Block. 3000+ servidores MCP. Linux Foundation governance. | Sí — ecosistema MCP |

## Plataformas LLM / aplicaciones

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|-------------|
| [langgenius/dify](https://github.com/langgenius/dify) | Apache-2.0 | ~144k | LLM app platform con GUI, RAG, agents, 300+ modelos. Auto-hosteable. | Sí — plataforma end-to-end |
| [langflow-ai/langflow](https://github.com/langflow-ai/langflow) | MIT | ~140k | Visual builder drag-and-drop para agentes y RAG. Demo-ready para clientes. | Sí — MVP visual en horas |

## Evaluación y benchmarks

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|-------------|
| [princeton-nlp/SWE-bench](https://github.com/princeton-nlp/SWE-bench) | MIT | ~8k | Benchmark estándar para evaluar coding agents en issues reales de GitHub. | Sí — medir calidad de agentes |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | MIT | ~3k | Convierte codebases en grafos de conocimiento consultables. Base para onboarding agents. | Sí — context sobre repos grandes |

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
