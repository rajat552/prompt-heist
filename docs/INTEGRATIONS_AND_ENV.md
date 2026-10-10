# Prompt Heist: Integrations and Environment Inventory

**Document**: `docs/INTEGRATIONS_AND_ENV.md`  
**Security Notice**: Do NOT store real credentials, API tokens, or private secrets in this document or in version control.

---

## 1. Environment Variables Inventory

| Variable Name | Purpose | Required Status | Used By | Provider | Setup Instructions | Validation |
| :--- | :--- | :---: | :--- | :--- | :--- | :--- |
| `OLLAMA_HOST` | Base URL of the Ollama server hosting LLM models | Optional (Defaults to `http://localhost:11434`) | `ai/guard.py`, `backend/app/ai_status.py` | Ollama (Local or remote) | Set in `.env` if Ollama is running on a custom port or remote host. | `GET /api/health/ai` returns `status: ok` |
| `OLLAMA_MODEL` | Identifier of the model to use for AI guards | Required when `GUARD_STUB` is not `1` (Defaults to `gemma4:e2b`) | `ai/guard.py` | Ollama / Google Gemma | Pull the model locally (`ollama pull gemma4:e2b`) and set tag in `.env`. | Run `pytest backend/tests/test_ai_readiness.py` |
| `OLLAMA_TIMEOUT_SECONDS` | Maximum seconds to wait for model response before raising timeout | Optional (Defaults to `60`) | `ai/guard.py` | Ollama | Adjust in `.env` for slower or GPU-constrained hardware. | Guard replies within allotted window without `AITimeoutError` |
| `OLLAMA_API_KEY` | Bearer token for authenticating with hosted Ollama instances | Optional | `ai/guard.py` | Hosted Ollama / Proxy | Set in `.env` if utilizing cloud-hosted Ollama endpoints. | Authorization header successfully accepted |
| `GUARD_STUB` | Toggles simulated mock guard responses (disables Ollama calls) | Optional (Defaults to `0`) | `ai/guard.py` | Internal Stub | Set `GUARD_STUB=1` in `.env` for offline development and testing. | Guard returns deterministic stub replies instantly |
| `DATABASE_PATH` | File path to the SQLite campaign database | Optional (Defaults to `./prompt_heist.db`) | `backend/app/config.py`, `backend/app/db.py` | SQLite3 | Set in `.env` if placing database in a persistent volume. | Database file created and writable on application startup |
| `CORS_ORIGINS` | Comma-separated list of allowed frontend origins | Optional (Defaults to `http://localhost:5173`) | `backend/app/config.py`, `backend/app/main.py` | FastAPI CORS Middleware | Set in `.env` when hosting frontend on a separate domain. | Browser preflight OPTIONS requests succeed |
| `FRONTEND_DIST` | Directory path containing built frontend assets to serve statically | Optional (Defaults to `./frontend/dist`) | `backend/app/config.py`, `backend/app/main.py` | FastAPI Static Router | Set in `.env` or leave default to enable unified single-service hosting. | Navigating to `http://localhost:8000/` loads React UI |
| `VITE_USE_BACKEND` | Directs frontend to route API requests to the real FastAPI backend | Optional (Defaults to `false`) | `frontend/src/services/api.js` | Frontend build / Vite | Set `VITE_USE_BACKEND=true` in `frontend/.env.local` or environment. | Frontend communicates with `/api` instead of client-side mock |
| `VITE_API_URL` | Explicit backend base URL if running on a separate host/port | Optional (Defaults to same-origin) | `frontend/src/services/api.js` | Frontend client | Configure in `frontend/.env.local` when not using Vite dev proxy. | API fetch calls hit specified URL |

---

## 2. Safe Local Setup Instructions

1. **Backend Environment**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` as needed. For offline development without Ollama:
   ```env
   GUARD_STUB=1
   ```
2. **Frontend Environment**:
   ```bash
   cp frontend/.env.example frontend/.env.local
   ```
   For local development connecting to the backend via Vite proxy:
   ```env
   VITE_USE_BACKEND=true
   ```
