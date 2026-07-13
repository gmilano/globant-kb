# 🏗️ Repos fundacionales — Technology

> Bases sobre las cuales construir soluciones de AI para tecnología. Licencia abierta, comunidad activa.
> Última actualización: 2026-07-13

## Plataformas y frameworks base

| Repo | Licencia | Stars | Descripción | Base para AI |
|------|----------|-------|-------------|--------------|
| [vllm-project/vllm](https://github.com/vllm-project/vllm) | Apache-2.0 | ~86k | Inference engine high-throughput y memory-efficient para LLMs; v0.25.0 jul-2026; 2000+ contributors; PagedAttention | Sí — capa de serving local/cloud |
| [langgenius/dify](https://github.com/langgenius/dify) | Apache-2.0 | ~144k | Plataforma LLM con workflow visual, RAG nativo, observability, 1M+ apps desplegadas | Sí — base full-stack para apps |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | ~34k | Graph-based orchestration de agentes; 34.5M monthly downloads; estándar enterprise 2026 | Sí — orchestration layer |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Apache-2.0 | ~61k | Capa de memoria universal para agentes; v2.0 jun-2026; soporta vector DB, graph, key-value | Sí — persistencia entre sesiones |
| [BerriAI/litellm](https://github.com/BerriAI/litellm) | MIT | ~53k | Gateway/proxy para 100+ LLM APIs en formato OpenAI; cost tracking, guardrails, load balancing | Sí — abstracción multi-provider |
| [langfuse/langfuse](https://github.com/langfuse/langfuse) | MIT | ~31k | Open source LLM observability: trazas, evals, métricas, prompt management, datasets | Sí — observabilidad LLMOps |
| [huggingface/smolagents](https://github.com/huggingface/smolagents) | Apache-2.0 | ~27k | Agentes que razonan y actúan en código Python (no JSON); mínimo overhead, máxima flexibilidad | Sí — agentes ligeros HuggingFace |
| [All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands) | MIT | ~80k | Software dev agent de gama completa: escribe código, corre tests, gestiona repos; sandbox dockerizado | Sí — agente dev autónomo |
| [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | ~44k | Multi-agent teams con roles definidos; 5.2M monthly downloads; YAML-driven, enterprise-ready | Sí — multi-agent orchestration |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | MIT | ~50k+ | Convierte cualquier LLM en agente de browser; CDP nativo (no Playwright), web scraping + automation | Sí — browser automation layer |

## MCP Ecosystem (base de integración)

| Repo | Licencia | Stars | Descripción |
|------|----------|-------|-------------|
| [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | Apache-2.0 | ~10k | Implementaciones de referencia MCP: filesystem, git, GitHub, postgres, fetch, memory, etc. |
| [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) | Apache-2.0 | ~30k | MCP server para automatización de browser con Playwright; integra con Claude Code y Copilot |
| [Sqcows/forgejo-mcp](https://github.com/Sqcows/forgejo-mcp) | MIT | — | MCP server para Forgejo/Gitea: 103 tools, repos/issues/PRs/orgs/users/admin |

## Self-hosted Git + Developer Platforms

| Repo | Licencia | Stars | Descripción |
|------|----------|-------|-------------|
| [go-gitea/gitea](https://github.com/go-gitea/gitea) | MIT | ~46k | Self-hosted git service ligero escrito en Go; MCP-ready, GitHub-compatible API |
| [forgejo/forgejo](https://codeberg.org/forgejo/forgejo) | GPL-3.0 | — | Fork community de Gitea; gobernanza abierta; foco en privacidad y autonomía |
| [backstage/backstage](https://github.com/backstage/backstage) | Apache-2.0 | ~30k | Developer portal de Spotify (ahora CNCF); catálogo de servicios, templates, TechDocs |
| [ollama/ollama](https://github.com/ollama/ollama) | MIT | ~120k+ | Servidor local para modelos LLM (Llama, Mistral, Gemma, etc.); API compatible con OpenAI |

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
