# Prompt Heist: Project Requirements & Specifications

**Project Name**: Prompt Heist  
**Team**: Zero Spot  
**Members**: Rajat (Team Lead), Hridanshu, Prince  
**Organization / Event**: Hacktoberfest Hack Day NITH GDG 2026  
**License**: MIT License (Copyright (c) 2026 Team Zero Spot)  
**Document**: `docs/PROJECT_REQUIREMENTS.md`  

---

## 1. Project Purpose & Scope

Prompt Heist is an interactive AI-security game designed to teach students, developers, and security enthusiasts the fundamentals of adversarial prompt injection and defensive LLM design.

### Core Objectives
1. Sandboxed adversarial learning: Provide a realistic, safe environment where users interact with domain-specific AI guards across 30 progressive levels.
2. Defensive security focus: Provide actionable post-level debriefs that explain why an attack succeeded and how production applications mitigate such vulnerabilities.
3. Deterministic scoring and progression: Adjudicate victories in deterministic application code rather than delegating security checks back to the LLM.
4. Adaptive defenses: Implement learning boss encounters that dynamically harden against previous breach techniques within each kingdom.

---

## 2. Team Structure & Responsibilities

| Member | Focus Area | Core Responsibilities |
| :--- | :--- | :--- |
| **Rajat** | Team Lead & DevOps / Full-Stack | Repository management, deployment pipeline, frontend integration, release engineering |
| **Hridanshu** | AI Security & Level Design | Adversarial prompt engineering, guard system prompts, level debriefs, Ollama integration |
| **Prince** | Backend & Data Architecture | FastAPI routes, campaign rules, SQLite schemas, session management, leaderboard API |

---

## 3. Product & Technical Requirements

### Gameplay & Content
- **Kingdom Structure**: 5 kingdoms (Water Infrastructure, Clinical Trials, Customs Tariffs, Insurance/Grants, and E-Waste).
- **Levels**: 30 levels (6 per kingdom) with standard difficulty progression:
  1. Rookie
  2. Pretext
  3. Authority (Checkpoint)
  4. Reframing
  5. Decomposition
  6. Boss (Adaptive Learner)
- **Life System**: 3 attempts per level; hints provided after attempt 2.
- **Scoring**: Base score based on remaining attempts + bonus for first-attempt clearances.
- **Checkpoints**: Progress saved at level 3 of each kingdom; defeat at levels 4-6 respawns the player at level 4.

### Architecture & Integrations
- **AI Backend**: Ollama HTTP API interfacing with open-weight models (default: `gemma4:e2b`).
- **Offline / CI Capability**: `GUARD_STUB=1` mode to ensure tests and demonstrations run without external model dependencies.
- **Unified Deployment**: FastAPI backend serves prebuilt React SPA (`frontend/dist`) on a single port for seamless cloud deployment.
- **Client Fallback**: Standalone in-browser mock mode for zero-backend client-only demonstrations.
