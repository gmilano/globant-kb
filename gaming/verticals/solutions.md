# Vertical Platforms & Solutions — Gaming

> Real systems that can be customized with AI on top. Focus on permissive licenses.

## Game Backend Platforms

| Platform | Repo | License | Description | AI Integration Potential |
|----------|------|---------|-------------|-------------------------|
| **Nakama** | [heroiclabs/nakama](https://github.com/heroiclabs/nakama) | Apache 2.0 | Complete game server: auth, matchmaking, leaderboards, real-time sockets, economy, social graph | Add ML-based matchmaking, anti-cheat AI, personalized leaderboards, AI chat moderation |
| **Talo** | [TaloDev/backend](https://github.com/TaloDev/backend) | MIT | Self-hostable backend: leaderboards, player stats, save data, events; Godot + Unity SDKs | Plug in AI difficulty adjustment using player stats; personalize event triggers |
| **Open Match** | [googleforgames/open-match](https://github.com/googleforgames/open-match) | Apache 2.0 | Kubernetes-native matchmaking orchestration from Google; pluggable match functions | Replace default match function with trained ML model for skill-adaptive matching |

## Game Engines (as Platforms)

| Platform | Repo | License | Description | AI Integration Potential |
|----------|------|---------|-------------|-------------------------|
| **Godot 4** | [godotengine/godot](https://github.com/godotengine/godot) | MIT | Full 2D/3D engine; scripting via GDScript/C#; large asset marketplace | godot-llm, Godot RL Agents, NobodyWho plugins; NVIDIA path-tracing fork |
| **O3DE** | [o3de/o3de](https://github.com/o3de/o3de) | Apache 2.0 | AAA multi-platform engine from Linux Foundation; Gem (module) system | Integrate ML-Agents-style RL; custom AI Gems for procedural content |
| **OGRE** | [OGRECave/ogre](https://github.com/OGRECave/ogre) | MIT | C++ rendering engine; used for custom engines in serious games & simulation | Embed AI inference (ONNX Runtime) directly into custom engine built on OGRE |

## AI NPC & Dialogue Platforms

| Platform | Repo | License | Description | Notes |
|----------|------|---------|-------------|-------|
| **NobodyWho** | [nobodywho-ooo/nobodywho](https://github.com/nobodywho-ooo/nobodywho) | MIT | Godot plugin: fully offline LLM NPC dialogue, no cloud dependency | Ships in-game binary; supports quantized models (GGUF) |
| **godot-llm** | [Adriankhl/godot-llm](https://github.com/Adriankhl/godot-llm) | MIT | Godot nodes: GdLlama, GdEmbedding, GdLlava; wraps llama.cpp | Multimodal: text + image understanding for game world interactions |
| **Player2 Godot Plugin** | [elefant-ai/player2-ai-npc-godot](https://github.com/elefant-ai/player2-ai-npc-godot) | MIT | Cloud-connected AI NPC with persistent memory and voice | Cloud-based; best for online games needing persistent NPC world state |

## Asset Pipeline Platforms

| Platform | Repo | License | Description | Notes |
|----------|------|---------|-------------|-------|
| **Stable Diffusion WebUI** | [AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui) | AGPL-3.0 | Most-used SD interface; REST API for pipeline integration | 68% of indie studios use SD for assets (Unity survey 2026) |
| **ComfyUI** | [comfyanonymous/ComfyUI](https://github.com/comfyanonymous/ComfyUI) | GPL-3.0 | Node-graph SD pipeline; automatable for batch asset generation | Best for style-consistent sprite sheets, UI elements, concept art batches |
| **InvokeAI** | [invoke-ai/InvokeAI](https://github.com/invoke-ai/InvokeAI) | Apache 2.0 | Professional Stable Diffusion interface with workflow automation | Apache 2.0 makes it the cleanest license for Globant client deliverables |
