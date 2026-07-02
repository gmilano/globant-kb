# Composition Patterns — Gaming AI

> Concrete recipes using real repos. Each pattern is buildable from open-source components.

---

## Pattern 1: Offline AI NPC System (Godot)

**Use case:** RPG/adventure game with rich NPC dialogue, fully on-device, no cloud cost or latency.

**Components:**
- **Engine:** [godotengine/godot](https://github.com/godotengine/godot) 4.7 (MIT)
- **LLM runtime:** [Adriankhl/godot-llm](https://github.com/Adriankhl/godot-llm) — GdLlama node (MIT)
- **Dialogue plugin:** [nobodywho-ooo/nobodywho](https://github.com/nobodywho-ooo/nobodywho) (MIT)
- **Model:** Gemma 3n 4B GGUF Q4_K_M (~2.5GB RAM) or Llama 3.2 3B GGUF

**Wiring:**
```gdscript
# In your NPC scene
var llm = GdLlama.new()
llm.model_path = "res://models/gemma-3n-q4.gguf"
llm.system_prompt = "You are Aldric, a gruff blacksmith in Ironforge. Stay in character."
add_child(llm)

func _on_player_spoke(text: String):
    var response = await llm.run_generate_text(text)
    npc_dialogue_box.text = response
```
**NobodyWho alternative:** Attach `NobodyWhoNode` to the NPC, set `model` and `system_prompt` properties in the Inspector — no code needed.

**Deployment:** Bundle GGUF model in `res://models/`; works on Windows/Linux/macOS PC games. Console deployment requires platform-specific llama.cpp build.

---

## Pattern 2: RL NPC Training Pipeline (Godot)

**Use case:** Train enemy AI agents for a platformer/shooter that adapt to player skill level.

**Components:**
- **Engine:** [godotengine/godot](https://github.com/godotengine/godot) 4.7 (MIT)
- **RL bridge:** [edbeeching/godot_rl_agents](https://github.com/edbeeching/godot_rl_agents) (MIT)
- **Training:** Stable-Baselines3 + PyTorch (Python-side)
- **Fine-tuning loop:** [OpenPipe/ART](https://github.com/OpenPipe/ART) (Apache 2.0) if LLM-augmented

**Wiring:**
1. Add `AIController3D` node to enemy in Godot scene
2. Define observation space (player position, health, ammo) and action space (move, shoot, dodge) in GDScript
3. Launch Python training: `python train.py --env-name MyGame --algo ppo --n-envs 8`
4. Export trained model as ONNX, load in Godot via `GodotONNX` addon or ML-Agents-compatible runtime
5. At runtime, call `onnx_model.run(observations)` → action each frame

**Reward function example:**
```python
def compute_reward(obs, action, next_obs):
    damage_dealt = next_obs["player_health_delta"]
    survival_bonus = 0.1 if next_obs["enemy_alive"] else 0
    return damage_dealt * 2.0 + survival_bonus
```

---

## Pattern 3: Multiplayer Backend with AI Matchmaking

**Use case:** Online multiplayer game with skill-adaptive matchmaking and AI-powered chat moderation.

**Components:**
- **Backend:** [heroiclabs/nakama](https://github.com/heroiclabs/nakama) (Apache 2.0)
- **Matchmaking:** [googleforgames/open-match](https://github.com/googleforgames/open-match) (Apache 2.0)
- **ML matchmaking model:** scikit-learn / TensorFlow Serving (custom)
- **Chat moderation:** Llamaguard (open weights) or fine-tuned Llama 3.2

**Wiring:**
```
Game Client → Nakama REST/WS API
                 │
                 ├── Auth, Leaderboards, Social (Nakama built-in)
                 │
                 └── Matchmaking ticket → Open Match Director
                                              │
                                              └── ML Match Function
                                                    (queries player MMR, latency,
                                                     churn risk from ML model)
```
**Nakama custom runtime (Go/Lua/TypeScript):**
```typescript
const matchmakerMatched: nkruntime.MatchmakerMatchedFunction = (ctx, logger, nk, matches) => {
  // Call internal ML service to score team balance
  const score = nk.httpRequest("http://ml-matchmaker/score", "POST", {}, JSON.stringify(matches));
  if (JSON.parse(score.body).balance_score > 0.8) {
    return { matchId: nk.matchCreate("game_match", {}) };
  }
  return null; // re-queue
};
```

---

## Pattern 4: AI Game Asset Pipeline

**Use case:** Indie studio needs continuous generation of character sprites, backgrounds, and UI elements with visual consistency.

**Components:**
- **Image gen:** [invoke-ai/InvokeAI](https://github.com/invoke-ai/InvokeAI) (Apache 2.0) or [comfyanonymous/ComfyUI](https://github.com/comfyanonymous/ComfyUI) (GPL-3.0)
- **Models:** FLUX.1-dev (open weights) or SDXL + custom LoRA trained on style guide
- **Batch runner:** Python script invoking ComfyUI REST API
- **Integration:** Godot `EditorPlugin` to import generated assets directly

**Workflow:**
```
Art Director writes style_guide.md
    │
    ▼
Train LoRA on 50–100 reference images (ComfyUI LoRA training workflow)
    │
    ▼
Define asset manifest (asset_list.json):
  [{"name": "warrior_idle", "prompt": "pixel art warrior, idle animation frame, <lora:style:0.8>"}]
    │
    ▼
Batch generate via InvokeAI API:
  POST /api/v1/images/generate  {prompt, lora_weights, seed_range}
    │
    ▼
Review pass (human) → accept/regenerate
    │
    ▼
Export to Godot res:// via Python import script
```

---

## Pattern 5: Autonomous Game QA Bot (RL Playtesting)

**Use case:** Replace manual regression testing with RL agents that explore the game map, find stuck states, and report balance issues.

**Components:**
- **RL framework:** [Unity-Technologies/ml-agents](https://github.com/Unity-Technologies/ml-agents) (Apache 2.0) or [edbeeching/godot_rl_agents](https://github.com/edbeeching/godot_rl_agents) (MIT)
- **Bug reporting:** Custom Python sink to GitHub Issues or Jira
- **Coverage tracking:** Custom Godot/Unity telemetry plugin

**Wiring:**
```
Headless game instance (Docker)
    │
    └── ML-Agents Python API
          │
          ├── Curiosity-driven exploration reward → finds all map areas
          ├── Anomaly detector (reward spike = potential exploit)
          └── Reporter: screenshot + state dump → GitHub Issue
```

**Reward function for exploration:**
```python
# Curiosity-based intrinsic reward (count-based exploration)
def intrinsic_reward(state_hash, visit_counts):
    visit_counts[state_hash] = visit_counts.get(state_hash, 0) + 1
    return 1.0 / math.sqrt(visit_counts[state_hash])  # decays with revisits
```

**Output:** Weekly coverage report + bug list with screenshots; replaces 80% of manual regression testing for level traversal and physics.

---

## Pattern 6: AI-Powered Game Studio Copilot (Code Generation)

**Use case:** Game studio wants to 10x developer velocity with an AI agent that generates game systems, shaders, and quest logic.

**Components:**
- **Agent framework:** [All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands) (MIT) or [geekan/MetaGPT](https://github.com/geekan/MetaGPT) (MIT)
- **LLM backbone:** Claude Sonnet 5 or Llama 3.3 70B (for on-prem)
- **Integration:** Godot AI Native C++ Module [spardanviro/Godot_AI](https://github.com/spardanviro/Godot_AI) for editor-side assistance

**Flow (MetaGPT for game feature):**
```
Game Designer prompt: "Add a crafting system where players combine 2 items to make a new item"
    │
    ▼
MetaGPT Product Manager → User Story + Acceptance Criteria
    │
    ▼
MetaGPT Architect → Data model (ItemDB, RecipeDB), API spec
    │
    ▼
MetaGPT Engineer → GDScript code: CraftingSystem.gd, CraftingUI.gd
    │
    ▼
MetaGPT QA → Unit test stubs for crafting logic
    │
    ▼
Human review → merge to Godot project
```

**Time savings:** 2-day feature → 2-hour feature with iteration loop.
