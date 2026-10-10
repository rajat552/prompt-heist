# Prompt Heist

> An interactive cybersecurity simulator where you infiltrate corporate AI data vaults through adversarial prompt injection, then master production-grade defense techniques. Powered by open-weight models (Gemma 4 via Ollama) and a deterministic security engine.

**Status**: Fully functional and playable locally.  
**Repository**: [https://github.com/rajat552/prompt-heist](https://github.com/rajat552/prompt-heist)  
**Event**: Hacktoberfest Hack Day NITH GDG 2026  

---

## Team: Zero Spot

| Member | Role | Core Contributions |
| :--- | :--- | :--- |
| **Rajat** | Team Lead, Full-Stack & DevOps | Repository orchestration, React 19 UI & SVG game maps, single-port unified deployment pipeline, build engineering |
| **Hridanshu** | AI Security & Level Design | Adversarial prompts across 5 kingdoms, Gemma 4 Ollama bridge, adaptive learning boss prompt-hardening, security debriefs |
| **Prince** | Backend & Data Architecture | FastAPI endpoints, SQLite schema & migrations, campaign rules, concurrency locking, deterministic win adjudication & Echo Guard |

---

## Project Overview

### The Problem
As modern software increasingly integrates Large Language Models (LLMs), a significant blind spot has emerged in junior developer security training. Developers frequently treat system prompts (e.g., *"Never reveal the secret key"*) as rigid security controls rather than probabilistic text generation guidance. Consequently, production applications remain susceptible to prompt injection, roleplay bypasses, context fragmentation, and jailbreaks.

### Why We Chose This Problem
Defensive AI security cannot be absorbed through static slides—it must be experienced interactively. By simulating realistic enterprise failure modes in a sandboxed, legal environment where failure is cost-free, developers build intuitive mental models of how adversarial prompts operate and how to architect deterministic software barriers to protect their systems.

### The Solution: Prompt Heist
**Prompt Heist** places players in the role of the **Cipher Phantom** navigating **Silicon Bastion**—a corporate landscape of data fortresses where AI gatekeepers protect critical enterprise infrastructure. Players converse with domain-specific AI guards across 5 distinct corporate kingdoms, attempting to extract guarded ciphers within 3 conversational attempts per level.

#### Key Features (Implemented & Verified)
- **30 Progressive Levels across 5 Kingdoms**:
  - *The Civic Grids* (Water-leak triage infrastructure)
  - *The Bio-Archives* (Clinical-trial matching datasets)
  - *The Trade Ports* (Customs and tariff classification)
  - *The Risk Ledgers* (Insurance policies and grant ledgers)
  - *The Scrap Wastes* (E-waste recycling and decommissioning copilot)
- **Consistent Difficulty Curve per Kingdom**:
  1. *Rookie* (Direct inquiry)
  2. *Pretext* (Believable scenario fabrication)
  3. *Authority* (**Checkpoint**: Impersonation & administrative pretexts)
  4. *Reframing* (Hypothetical puzzles, word games, and poetry)
  5. *Decomposition* (Format fragmentation, spelling, and character splitting)
  6. *Adaptive Boss* (Adversarial Learner)
- **Deterministic Python Adjudication**: Security rules are executed in Python, *not* judged by the probabilistic LLM. The server strictly verifies secret revelation through regex and normalization.
- **Echo Guard**: Rejects fraudulent self-supplied echoes (prevents winning by merely typing the cipher into the input).
- **Adaptive Learning Bosses**: The kingdom boss dynamically inspects the player's prior winning prompts in SQLite and hardens its system prompt against those specific techniques.
- **Actionable Security Debriefs**: Every level unlocks a post-game debrief analyzing the vulnerability exploited and demonstrating how real production software defends against it.
- **Campaign Persistence & Global Leaderboard**: SQLite-backed campaign tracking storing attempts, high scores, checkpoints, and completion status.
- **Dual Runtime Support**: Operates against live local Ollama models (`gemma4:e2b`) or an offline stub mode (`GUARD_STUB=1`) for automated testing.
- **Client Fallback**: Includes a standalone client-side mock (`USE_MOCK=true`) for instant browser demonstration without a backend.

---

## System Architecture

```text
+-------------------------------------------------------------+
|                      React 19 Frontend                      |
| (Vite 6, React Router 7, Parchment HUD, Responsive SVG Art)  |
+------------------------------+------------------------------+
                               | REST API (/api/*)
                               v
+-------------------------------------------------------------+
|                       FastAPI Backend                       |
|   - Concurrency Locks (threading.Lock per session/campaign) |
|   - Deterministic Win & Echo Guard Adjudication (game.py)   |
|   - Campaign & Checkpoint Rule Engine (campaign.py)         |
|   - Static SPA Asset Server (serving frontend/dist)         |
+-------------------+---------------------+-------------------+
                    |                     |
     SQL Queries    |                     | Adversarial Chat
                    v                     v
+---------------------------+   +-----------------------------+
|      SQLite Database      |   |       AI Guard Module       |
|    (prompt_heist.db)      |   |       (ai/guard.py)         |
| - campaigns & sessions    |   +--------------+--------------+
| - campaign_wins (tactics) |                  |
| - messages & leaderboard  |                  | HTTP /api/chat
+---------------------------+                  v
                                +-----------------------------+
                                |     Ollama Local Server     |
                                |     Gemma 4 (gemma4:e2b)    |
                                +-----------------------------+
```

---

## Repository Structure

```text
prompt-heist/
├── .github/workflows/       # GitHub Actions CI workflow (Pages static preview)
├── ai/                      # AI Guard bridge to Ollama
│   ├── __init__.py
│   └── guard.py             # System prompt builder, learned attack injection, API caller
├── backend/                 # FastAPI REST API
│   ├── app/
│   │   ├── ai_status.py     # Ollama health probe
│   │   ├── campaign.py      # Campaign progression & respawn logic
│   │   ├── config.py        # Settings and environment loader
│   │   ├── db.py            # SQLite schema, indices, queries, and migrations
│   │   ├── errors.py        # Custom API error handlers
│   │   ├── game.py          # Deterministic win rules, Echo Guard, and scoring
│   │   ├── levels.py        # Level validator and registry loader
│   │   ├── main.py          # FastAPI application factory and routing
│   │   └── schemas.py       # Pydantic v2 data models
│   ├── requirements.txt     # Python dependencies
│   ├── scripts/             # End-to-end integration scripts
│   └── tests/               # 126 backend Pytest unit tests
├── deploy/                  # Cloud deployment manifests
│   └── huggingface/         # Hugging Face Space Dockerfile & startup script
├── docs/                    # Technical specifications & audit logs
│   ├── BACKEND_CAMPAIGN_SPEC.md
│   ├── INTEGRATIONS_AND_ENV.md
│   ├── PROJECT_AUDIT.md
│   ├── PROJECT_REQUIREMENTS.md
│   ├── REFACTORING_PLAN.md
│   └── TEAM_AND_BRANDING_AUDIT.md
├── frontend/                # React 19 SPA (Vite)
│   ├── dist/                # Precompiled production build
│   ├── src/                 # React source code (pages, components, hooks, services)
│   ├── package.json
│   └── vite.config.js
├── levels/                  # 30 JSON level specifications
├── tests/                   # 29 AI module, dev server, and rule Pytest tests
├── tools/                   # Developer utilities (level builder, smoke test, trial runner)
├── .env.example             # Environment variable configuration template
├── Dockerfile               # Production container configuration
├── LICENSE                  # MIT License (Team Zero Spot)
├── README.md                # Project documentation
└── render.yaml              # Render Blueprint deployment configuration
```

---

## Prerequisites & Requirements

- **Python**: 3.10, 3.11, 3.12, or 3.13 (Tested on Python 3.13.1)
- **Node.js**: Node 18+ (Node 20+ or Node 24 recommended for frontend building)
- **Ollama** (Optional for local AI inference): [https://ollama.com](https://ollama.com)
  - Target Model: `gemma4:e2b` (`ollama pull gemma4:e2b`)
  - *Note: Offline development and automated testing can run without Ollama using `GUARD_STUB=1`.*

---

## Quick Start & Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/rajat552/prompt-heist.git
cd prompt-heist
```

### 2. Configure Environment Variables
```bash
cp .env.example .env
```
To run immediately in stub mode (without needing Ollama running):
```env
GUARD_STUB=1
DATABASE_PATH=./prompt_heist.db
CORS_ORIGINS=http://localhost:5173
```
To run with real local AI models:
```bash
ollama serve
ollama pull gemma4:e2b
```
And ensure your `.env` contains:
```env
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=gemma4:e2b
OLLAMA_TIMEOUT_SECONDS=60
```

### 3. Backend Setup
Create a virtual environment and install dependencies:
```bash
# Windows (PowerShell)
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r backend/requirements.txt

# Linux / macOS
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
```

Start the FastAPI server:
```bash
uvicorn backend.app.main:create_app --factory --port 8000
```
- API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)
- Health Check: [http://localhost:8000/api/health](http://localhost:8000/api/health)
- AI Model Health: [http://localhost:8000/api/health/ai](http://localhost:8000/api/health/ai)

### 4. Frontend Setup
In a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

*Pro-tip: If you run only the FastAPI backend on port 8000, it automatically serves the prebuilt frontend at [http://localhost:8000](http://localhost:8000).*

---

## Automated Testing & Verification

The project includes thorough, automated regression test suites covering the backend API, deterministic security rules, AI guard bridges, and frontend service adapters.

### Backend & AI Unit Tests (Pytest)
From the repository root:
```bash
pytest
```
**Result**: 155 passed tests (100% passing across `backend/tests/` and `tests/`).

### Frontend Unit Tests (Node Native Test Runner)
From the `frontend/` directory:
```bash
npm test
```
**Result**: 18 passed tests covering campaign state, session creation, strike calculation, debrief mapping, and error handling.

### Frontend Production Build
```bash
cd frontend
npm run build
```
Generates optimized production assets in `frontend/dist/`.

---

## API Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Basic service health check |
| `GET` | `/api/health/ai` | Probes Ollama reachability and model availability |
| `GET` | `/api/levels` | Retrieves public list of all 30 levels (omits secrets) |
| `POST` | `/api/campaigns` | Creates or resumes a player campaign |
| `GET` | `/api/campaigns/{id}` | Retrieves campaign state, score, and unlocked levels |
| `POST` | `/api/campaigns/sessions` | Initiates a gate encounter session |
| `POST` | `/api/sessions/{id}/message` | Submits player prompt; returns guard reply & strike count |
| `GET` | `/api/campaigns/leaderboard` | Returns top campaigns ranked by score and cleared gates |

---

## Deployment Options

### Option 1: Render (Unified Blueprint)
The repository includes [`render.yaml`](render.yaml) configured as a native Python web service. Because the prebuilt frontend bundle in `frontend/dist` is served directly by FastAPI, Render requires no Node.js build runtime.
1. Connect repository `https://github.com/rajat552/prompt-heist` to Render.
2. Select **New Blueprint Instance**.
3. Supply `OLLAMA_HOST` (or configure `GUARD_STUB=1`).

### Option 2: Docker Container
A multi-stage [`Dockerfile`](Dockerfile) is included:
```bash
docker build -t prompt-heist .
docker run -p 8000:8000 prompt-heist
```

### Option 3: Hugging Face Spaces
Manifest files in [`deploy/huggingface/`](deploy/huggingface/) enable deploying Prompt Heist as a Docker-based Space on CPU.

---

## Open Source & AI Attributions

- **Google Gemma 4 (`gemma4:e2b`)**: Open-weight foundation model provided by Google under the [Apache 2.0 License](https://ai.google.dev/gemma/apache_2).
- **Ollama**: Local model execution engine licensed under the [MIT License](https://github.com/ollama/ollama/blob/main/LICENSE).
- **FastAPI & Starlette**: High-performance ASGI framework licensed under the [MIT License](https://github.com/tiangolo/fastapi/blob/master/LICENSE).
- **React, Vite & React Router**: Frontend web frameworks licensed under the [MIT License](https://github.com/facebook/react/blob/main/LICENSE).
- **SQLite**: In-process SQL database engine in the [Public Domain](https://www.sqlite.org/copyright.html).

---

## Challenges & Engineering Learnings

1. **Non-Deterministic LLMs vs. Deterministic Security Rules**: Early prototypes relied on the LLM to decide whether a player won. In practice, LLM responses are variable and easily bamboozled. We decoupled adjudication entirely from the model: victory is evaluated deterministically in Python (`game.py`), ensuring fair, reproducible gameplay.
2. **The "Echo" Attack Loophole**: Attackers can sometimes trick an AI guard by providing the secret themselves and asking the model to repeat it. We engineered the **Echo Guard**, which analyzes user inputs and denies victory if the user already provided the cipher components.
3. **Reasoning Model Token Exhaustion**: Certain models spend token limits performing hidden chain-of-thought analysis. We explicitly passed `"think": False` and configured `num_predict: 80` in Ollama API calls to ensure lightning-fast conversational turns (under 3 seconds on standard GPU).
4. **Adaptive Boss Prompt Injection**: Dynamically immunizing the kingdom boss against prior attacks required storing previous winning payloads in SQLite and appending structured refusal guidance without causing prompt bloat.

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.  
Copyright (c) 2026 **Team Zero Spot**.
