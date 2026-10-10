# Hack Day Checklist: Team Zero Spot

**Team**: Zero Spot  
**Event**: Hacktoberfest Hack Day NITH GDG 2026  
**Members**: Rajat, Hridanshu, Prince  
**Project**: Prompt Heist  

---

## 1. Hackathon Rules & Compliance

- [x] Team Zero Spot formed (Rajat, Hridanshu, Prince)
- [x] Repository configured at `https://github.com/rajat552/prompt-heist.git`
- [x] Clean Git history reinitialized with single root commit; old commit trails detached
- [x] Project files 100% verified with SHA-256 integrity (133 files preserved)
- [x] Repository is public on GitHub
- [x] Open-source MIT `LICENSE` in repository root (Copyright 2026 Team Zero Spot)
- [x] Working build runnable locally (`uvicorn` + `npm run dev`)
- [x] Open-weight model integration: Google Gemma 4 (`gemma4:e2b`) via Ollama HTTP API
- [x] Offline fallback stub supported (`GUARD_STUB=1`) for standalone environments
- [x] Model attribution and licenses documented in README (Gemma 4 Apache 2.0, Ollama MIT)

---

## 2. Setup & Configuration

- [x] README rewritten with complete architecture, endpoints, and reproduction steps
- [x] `.gitignore` verified (ignores `.env`, `node_modules`, `*.db`, caches)
- [x] `.env.example` and `frontend/.env.example` documented
- [x] Comprehensive documentation generated (`docs/PROJECT_AUDIT.md`, `docs/INTEGRATIONS_AND_ENV.md`, `docs/REFACTORING_PLAN.md`, `docs/TEAM_AND_BRANDING_AUDIT.md`)

---

## 3. AI & Level Design (Hridanshu)

- [x] 30 progressive levels authored across 5 corporate kingdoms (6 levels per kingdom)
- [x] Consistent difficulty curve: Rookie, Pretext, Authority (Checkpoint), Reframing, Decomposition, Adaptive Boss
- [x] AI guard bridge implemented (`ai/guard.py`) with token limits and timeout safety
- [x] Gemma 4 optimization: `think: false` and `num_predict: 80` to eliminate reasoning stalls
- [x] Adaptive learning boss: dynamic injection of player's prior winning tactics into the boss prompt
- [x] Actionable security debriefs authored for all 30 levels (technique, vulnerability, production defense)
- [x] Test stub mode (`GUARD_STUB=1`) enabling offline evaluation without live Ollama

---

## 4. Backend & Database Architecture (Prince)

- [x] FastAPI REST API service (`backend/app/main.py`)
- [x] SQLite3 schema with auto-migrations, foreign key constraints, and performance indices (`backend/app/db.py`)
- [x] Deterministic win adjudication: regex and normalization in Python (`backend/app/game.py`), not judged by LLM
- [x] Echo Guard: denies victory if player supplied the cipher words directly in their prompt
- [x] Campaign progression engine: checkpoints at level 3, respawns at level 4 on defeat (`backend/app/campaign.py`)
- [x] Concurrency locking: `threading.Lock` per session and per campaign to prevent race conditions
- [x] Global leaderboard endpoint (`/api/campaigns/leaderboard`)
- [x] Unified single-port deployment: FastAPI statically serves the precompiled SPA (`frontend/dist`)

---

## 5. Frontend & UI/UX (Rajat)

- [x] React 19 + Vite 6 Single Page Application (`frontend/src/`)
- [x] Ancient kingdom & parchment aesthetic with custom SVG map graphics
- [x] World map view with 5 selectable kingdoms and progression locks
- [x] Kingdom map view with 6 interactive gate nodes
- [x] Dialogue HUD with live guard typing indicator, strike counters, and hint reveal
- [x] Adaptive boss warning badge displaying learned defenses
- [x] Victory modal, checkpoint announcement, defeat/respawn screen, and debrief scrolls
- [x] Hall of Phantoms global leaderboard screen (`/leaderboard`)
- [x] Browser persistence: `campaign_id` stored in `localStorage` for session resumption
- [x] Standalone in-browser mock fallback (`USE_MOCK=true`) for zero-backend demos

---

## 6. Automated Verification & Quality Assurance

- [x] 155 Python/Pytest unit tests passing (100% test suite pass rate)
- [x] 18 Frontend unit tests passing (`npm test` via Node test runner)
- [x] Zero hardcoded secrets or credentials in codebase or Git history
- [x] Production build validated: `npm run build` succeeds cleanly
