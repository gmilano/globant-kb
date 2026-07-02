# Top AI Agents & Tools — Gaming Industry

> Last updated: 2026-07-02 | Focus: MIT / Apache 2.0 licenses Globant can build on

## AI Agents Table

| # | Name | GitHub | License | Stars | Description |
|---|------|--------|---------|-------|-------------|
| 1 | Unity ML-Agents | [Unity-Technologies/ml-agents](https://github.com/Unity-Technologies/ml-agents) | Apache 2.0 | 17k+ | Train NPCs and game agents with deep RL and imitation learning inside Unity; supports multi-agent adversarial, automated game testing |
| 2 | Godot RL Agents | [edbeeching/godot_rl_agents](https://github.com/edbeeching/godot_rl_agents) | MIT | 2k+ | Open-source package for training complex NPC behaviors in Godot 4 via reinforcement learning; integrates with PyTorch, Stable-Baselines3 |
| 3 | godot-llm | [Adriankhl/godot-llm](https://github.com/Adriankhl/godot-llm) | MIT | 1k+ | Run local LLMs (llama.cpp) inside Godot — nodes for text gen, embeddings, and vision; powers NPC dialogue offline without GPU |
| 4 | NobodyWho | [nobodywho-ooo/nobodywho](https://github.com/nobodywho-ooo/nobodywho) | MIT | 500+ | Godot plugin for open-ended NPC dialogue using fully local, offline LLMs; zero cloud dependency, ships in the game binary |
| 5 | Player2 AI NPC (Godot) | [elefant-ai/player2-ai-npc-godot](https://github.com/elefant-ai/player2-ai-npc-godot) | MIT | 300+ | Official Godot plugin for Player2's AI NPC platform; adds memory, personality, and voice to NPCs with simple node API |
| 6 | OpenHands | [All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands) | MIT | 50k+ | Autonomous AI software engineer: writes code, runs tests, fixes bugs, opens PRs inside sandboxed Docker — usable for game code generation pipelines |
| 7 | MetaGPT | [geekan/MetaGPT](https://github.com/geekan/MetaGPT) | MIT | 45k+ | Multi-agent framework where LLM agents act as Product Manager, Engineer, QA — input a game requirement, output code, specs, and tests |
| 8 | Smolagents | [huggingface/smolagents](https://github.com/huggingface/smolagents) | Apache 2.0 | 27k+ | Hugging Face's minimal agent framework; compose tool-using agents for game automation, testing, or content pipelines |
| 9 | ART (Agent Reinforcement Trainer) | [OpenPipe/ART](https://github.com/OpenPipe/ART) | Apache 2.0 | 5k+ | Train multi-step agents with GRPO for real-world tasks; supports Llama, Qwen, GPT-class models — adaptable for game AI fine-tuning |
| 10 | Open-AgentRL | [Gen-Verse/Open-AgentRL](https://github.com/Gen-Verse/Open-AgentRL) | Apache 2.0 | 2k+ | ICML 2026: open-source RL framework for LLM-based agentic scenarios; DemyAgent and AutoTool published here — basis for game LLM agents |

## Notes

- **Godot-first**: items 2–5 all target Godot 4, the dominant open-source engine (MIT). Unity ML-Agents remains the deepest RL integration for Unity projects.
- **Offline NPC priority**: NobodyWho and godot-llm both run fully offline via llama.cpp — critical for console/mobile titles or privacy-sensitive deployments.
- **Code-gen agents** (OpenHands, MetaGPT) are increasingly used in game studios to automate boilerplate: quest systems, UI screens, shader variants.
- **RL training** (ML-Agents, Godot RL Agents, ART) is the backbone for enemy AI, playtesting bots, and procedural difficulty adjustment.
