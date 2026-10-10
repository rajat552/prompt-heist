# Prompt Heist: Refactoring & Customization Plan

**Document Version**: 1.0.0  
**Status**: In Progress  
**Document**: `docs/REFACTORING_PLAN.md`  

---

## 1. Action Classification Key

- **KEEP**: Required, working, and unchanged.
- **UPDATE**: Modifying branding, team references, links, or documentation.
- **REFACTOR**: Code improvements, configuration consolidation, or error handling.
- **CONSOLIDATE**: Merging duplicate functionality.
- **REMOVE**: Obsolete, generated, or unneeded files.

---

## 2. File & Directory Inventory Plan

| Path | Current Purpose | Identified Problem | Proposed Action | Dependencies & Risks | Verification | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| `LICENSE` | Open-source MIT license | Lists previous team owner (`Shree Santh B`) | **UPDATE**: Change copyright holder to `Team Zero Spot (2026)` | Legal clarity only | Inspect text | ✅ Completed |
| `README.md` | Primary repository document | Contains previous team table, obsolete tunnel link, old git author notes | **UPDATE**: Full rewrite with Team Zero Spot, new GitHub repo, accurate setup commands, and architecture | Core project presentation | Manual review & link validation | ✅ Completed |
| `docs/ROLES.md` | Role assignment breakdown | Outlines 4 previous members | **UPDATE**: Update to 3 members (Rajat, Hridanshu, Prince) | Reference document | Text review | ✅ Completed |
| `docs/DEV_POST.md` | Hackathon submission writeup | Mentions previous team name (`Team StromBreaker`) | **UPDATE**: Replace team name with `Zero Spot` and event context | Reference document | Text review | ✅ Completed |
| `docs/DEMO_SCRIPT.md` | Video recording script | Mentions previous team in script outro | **UPDATE**: Change outro to `Team Zero Spot` | Demo presentation | Text review | ✅ Completed |
| `docs/DEPLOY.md` | Deployment guide | Points to old GitHub account and dead tunnel | **UPDATE**: Update to `rajat552/prompt-heist` and clean up instructions | Operational guide | Step verification | ✅ Completed |
| `deploy/huggingface/README.md` | HF Spaces card | Mentions previous team name | **UPDATE**: Update team metadata to `Zero Spot` | HF deployment | YAML/metadata check | ✅ Completed |
| `.env.example` | Root environment template | Incomplete frontend variable documentation | **UPDATE**: Standardize variable definitions | Config hygiene | Test `.env` load | ✅ Completed |
| `frontend/.env.example` | Frontend environment template | Separate from root `.env.example` | **KEEP**: Working and useful for local client development | None | Verified | ✅ Kept |
| `backend/app/*` | Core FastAPI application | Fully working and passes 155 unit tests | **KEEP**: Preserved exactly | Core backend logic | 155 Pytest tests | ✅ Kept |
| `ai/guard.py` | Ollama model bridge | Fully working with fallback stub | **KEEP**: Preserved | AI integration | Test suite | ✅ Kept |
| `frontend/src/*` | React UI components and pages | Fully styled with ancient fantasy/heist theme | **KEEP**: Working and passing 18 unit tests | Core UI | 18 Node tests | ✅ Kept |
| `levels/level_*.json` | 30 level definitions | High-quality, balanced levels | **KEEP**: Preserved | Game content | Level loader validation | ✅ Kept |
| `tests/*` | Pytest test suites | Complete coverage of guard, server, and rules | **KEEP**: Preserved | Regression safety | Pytest suite | ✅ Kept |
| `tools/*` | Helper scripts (level builder, dev server, smoke test) | Useful engineering utilities | **KEEP**: Preserved | Tooling | Run smoke test | ✅ Kept |

---

## 3. Implementation Sequence

1. Update `LICENSE` to copyright `Team Zero Spot`.
2. Rewrite `README.md` with Team Zero Spot, event details (Hacktoberfest Hack Day NITH GDG 2026), architecture, and clean setup instructions.
3. Update supporting documentation in `docs/` (`ROLES.md`, `DEV_POST.md`, `DEMO_SCRIPT.md`, `DEPLOY.md`) and `deploy/huggingface/README.md`.
4. Create `docs/INTEGRATIONS_AND_ENV.md` with complete environment configuration instructions.
5. Re-run complete test suites (Pytest + Node tests) to verify 100% test integrity.
6. Commit changes to Git with structured messages.
