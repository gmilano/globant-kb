# 🏗️ Repos Fundacionales — Technology

> Bases sobre las cuales construir soluciones AI para la industria tech.
> Licencia abierta, comunidad activa, probados en producción.
> Última actualización: 2026-07-12

## Plataformas y frameworks base

| Repo | Licencia | Descripción | Stars | ¿Base para AI? |
|------|----------|-------------|-------|----------------|
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | MIT | Framework LLM más popular; chains, RAG, tool calling, memory, agents sobre cualquier modelo | ~100k | Sí — framework base |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | MIT | Flujos de agentes con estado persistente (grafos cíclicos); ideal para workflows multi-step complejos | ~18k | Sí — orquestación |
| [langgenius/dify](https://github.com/langgenius/dify) | Apache-2.0 | Plataforma completa de producción para apps AI: RAG, workflow builder, model management, API, self-hosted | ~136k | Sí — plataforma completa |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | Apache-2.0 | Workflow automation con AI nativo y soporte MCP client/server; 162k estrellas, alternativa open source a Zapier | ~162k | Sí — automatización |
| [ollama/ollama](https://github.com/ollama/ollama) | MIT | Corre LLMs localmente (Llama, Mistral, Gemma, Phi, DeepSeek); API compatible OpenAI; Linux/Mac/Windows | ~120k | Sí — inferencia local |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | MIT | Chat UI self-hosted para LLMs locales y APIs; soporte Ollama + OpenAI; RAG integrado | ~60k | Sí — frontend AI |
| [mlflow/mlflow](https://github.com/mlflow/mlflow) | Apache-2.0 | Plataforma ML lifecycle: tracking, model registry, serving, evaluación; 20k estrellas, estándar de facto MLOps | ~20k | Sí — MLOps |
| [kubeflow/kubeflow](https://github.com/kubeflow/kubeflow) | Apache-2.0 | ML workflows nativos en Kubernetes: pipelines, model training, serving; estándar enterprise k8s ML | ~14k | Sí — ML at scale |
| [zenml-io/zenml](https://github.com/zenml-io/zenml) | Apache-2.0 | ML pipeline platform modular; integra con Airflow, Kubeflow, MLflow, Seldon; de pipelines a agentes | ~4.5k | Sí — pipelines |
| [iterative/dvc](https://github.com/iterative/dvc) | Apache-2.0 | Data Version Control — versiona datasets y modelos en Git; estándar para reproducibilidad ML | ~14k | Sí — data versioning |

## Frameworks de agentes especializados

| Repo | Licencia | Descripción | Stars |
|------|----------|-------------|-------|
| [microsoft/autogen](https://github.com/microsoft/autogen) | MIT | Multi-agent framework de Microsoft; conversaciones entre agentes, human-in-the-loop, tool calling | ~58k |
| [geekan/MetaGPT](https://github.com/geekan/MetaGPT) | MIT | Software company en código: roles PM/Arch/Dev/QA coordinados por LLMs; genera código completo desde spec | ~50k |
| [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | MIT | Orquestación de crews de agentes especializados; mejor-en-clase para multi-agent coordination | ~30k |
| [huggingface/smolagents](https://github.com/huggingface/smolagents) | Apache-2.0 | Agentes minimalistas donde el LLM escribe Python code como actions; sin DSL, máxima flexibilidad | ~27k |

---
*Ver también: `verticals/solutions.md` para plataformas verticales completas.*
