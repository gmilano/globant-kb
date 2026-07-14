# 📈 Trending Agents — Healthcare (v6)

> What's new and gaining momentum in healthcare AI agents. Week of 2026-07-14.

## Breakout Projects (July 2026)

| Name | Repo | Signal | Why It Matters |
|------|------|--------|----------------|
| **MedAgentGym** | [wshi83/MedAgentGym](https://github.com/wshi83/MedAgentGym) | ICLR 2026 accepted, 121★ | First training gym for healthcare LLM agents. 72,413 task instances. Sets the standard for how to fine-tune medical reasoning agents. |
| **HealthFlow** | [yhzhu99/HealthFlow](https://github.com/yhzhu99/HealthFlow) | 48★, rapid growth | Self-evolving 4-agent EHR analysis system. The reflector agent writes reusable experience — each run makes the system smarter. |
| **openmed-agent** | [openmed-labs/openmed-agent](https://github.com/openmed-labs/openmed-agent) | Apache-2.0, 26★ | Clinical workflow terminal with 62 tools + 13 deterministic workflows. Prior auth automation is the killer use case: directly reduces $40B/yr administrative waste. |
| **MedSAM-Agent** | [CUHK-AIM-Group/MedSAM-Agent](https://github.com/CUHK-AIM-Group/MedSAM-Agent) | 86★, multi-modal | Interactive medical image segmentation with agentic RL. First system that learns from radiologist interactions turn-by-turn to improve segmentation. |
| **EvoClinician** | [yf-he/EvoClinician](https://github.com/yf-he/EvoClinician) | Preprint 2026 | Test-time evolutionary learning for multi-turn diagnosis. Agent evolves its diagnostic strategy at inference time — no retraining needed. |
| **MDTeamGPT** | [KaiChenNJ/MDTeamGPT](https://github.com/KaiChenNJ/MDTeamGPT) | Self-evolving | Multi-disciplinary team consultation: cardiologist + oncologist + radiologist agents debate → consensus diagnosis. Mirrors real tumor board dynamics. |
| **MedResearcher-R1** | [AQ-MedAI/MedResearcher-R1](https://github.com/AQ-MedAI/MedResearcher-R1) | R1-style | Expert-level medical literature synthesis. Applies DeepSeek-R1 reasoning style to clinical evidence — produces structured clinical recommendations with citations. |
| **FHIR-AgentBench** | [glee4810/FHIR-AgentBench](https://github.com/glee4810/FHIR-AgentBench) | New benchmark | Benchmarks AI agents on realistic interoperable EHR QA. Critical for evaluating agents before deploying to real healthcare systems. |
| **STELLA** | [zaixizhang/STELLA](https://github.com/zaixizhang/STELLA) | Self-evolving | Self-evolving LLM agent for biomedical research. Autonomously formulates hypotheses, designs experiments, interprets results. Drug discovery acceleration. |
| **MedSAM3** | Research 2026 | Preprint | Next iteration of MedSAM — 3D medical image segmentation foundation model. Extends to volumetric CT/MRI with agentic interaction. |

## Key Papers Driving Agent Development (2026)

| Paper | Signal | Implication |
|-------|--------|-------------|
| CHI-Bench (arXiv:2605.16679) | Best frontier agents fail 72% of real clinical workflows | Benchmark gap — room for specialized agents |
| PhysicianBench (arXiv:2605.02240) | Best agents: 46% complete / 28% reliable | Human-in-the-loop still required |
| MedAgentGym (ICLR 2026) | Code-based medical reasoning trainable at scale | Training frameworks > prompting for reliability |
| FHIR-AgentBench | EHR interoperability as agent eval axis | FHIR literacy is a key agent capability |
| ReflecTool (ACL 2025) | Reflection improves clinical tool use | Self-correction is a clinical safety mechanism |

## Trends to Watch

- **Local-first AI surge**: HIPAA + EU AI Act pushing healthcare orgs toward on-premise models (openmed trend)
- **FHIR-native agents**: Agents that speak FHIR natively (read/write FHIR resources) becoming the standard
- **Multi-modal clinical agents**: Text + imaging + labs + vitals in one agent context
- **Specialized training gyms**: MedAgentGym shows the path — domain-specific RL environments for medical agents

---
*v6 — 2026-07-14*
