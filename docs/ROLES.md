# Roles and Task Plan: Team Zero Spot

**Team**: Zero Spot  
**Event**: Hacktoberfest Hack Day NITH GDG 2026  
**Members**: Rajat, Hridanshu, Prince  

---

## 1. Repository Layout & Ownership

```text
backend/     Prince (FastAPI, SQLite, Campaign rules, API endpoints)
ai/          Hridanshu (Ollama model bridge, Guard prompts, Learned attacks)
levels/      Hridanshu (30 JSON levels, attack patterns, debriefs)
frontend/    Rajat (React 19 UI, Vite, Game HUD, Map traversal)
deploy/      Rajat (Render, Docker, Hugging Face Spaces configuration)
docs/        Shared team documentation & specifications
tests/       Shared automated test suites
```

---

## 2. Member Responsibilities

### Role 1: Team Lead, Full-Stack & DevOps (Rajat)
- Repository setup, version control hygiene, and release workflows.
- Frontend architecture (React 19 + Vite 6), responsive UI components, SVG map systems.
- Unified single-port deployment (serving prebuilt SPA from FastAPI).
- Cloud deployment pipelines (Render, Docker, Hugging Face).
- Final documentation and submission coordination.

### Role 2: AI Security & Level Design (Hridanshu)
- Guard system prompts and adversarial injection scenarios across 5 kingdoms.
- Local model integration (Ollama + Gemma 4 runtime bridge).
- Adaptive learning boss algorithm (`build_system_prompt` and learned attacks).
- Security debrief authoring (real-world vulnerabilities and production mitigation advice).
- AI readiness verification and offline test stub mode (`GUARD_STUB=1`).

### Role 3: Backend & Database Architecture (Prince)
- FastAPI endpoints implementation (`/api/health`, `/api/levels`, `/api/campaigns`, `/api/sessions`, `/api/leaderboard`).
- SQLite database schema, index design, foreign key constraints, and connection pooling.
- Campaign progression, scoring formulas, checkpoint bonuses, and respawn logic.
- Concurrency locking for simultaneous session requests.
- Deterministic win detection and Echo Guard implementation.

---

## 3. Team Working Agreements

1. **Clean Version Control**: Small, focused commits with meaningful commit messages.
2. **Zero Secrets in Git**: No `.env` files or API credentials committed to version control.
3. **Automated Verification**: Run complete test suites before pushing changes.
4. **Reproducibility**: Ensure all dependencies install cleanly on a fresh development machine.
