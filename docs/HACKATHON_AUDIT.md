# Prompt Heist: Hackathon Technical & Frontend Complexity Audit

**Document**: `docs/HACKATHON_AUDIT.md`  
**Date**: October 2026  
**Auditor**: Senior Full-Stack Engineer & Hackathon Technical Lead  
**Target Repository**: `https://github.com/rajat552/prompt-heist.git`  

---

## 1. Project Overview & Architecture

**Prompt Heist** is an educational AI cybersecurity simulator developed for Hacktoberfest Hack Day NITH GDG 2026. The application trains developers on adversarial LLM prompt injection and defensive prompt engineering.

The system consists of:
1. **Frontend (React 19 + Vite 6)**: A single-page application navigating 5 kingdoms and 30 gate encounters, communicating via REST with the backend or falling back to an in-browser mock.
2. **Backend (FastAPI + Python 3.13)**: Manages campaign sessions, atomic locks, deterministic win adjudication (`game.py`), Echo Guard validation, and SQLite persistence.
3. **AI Layer (Ollama / Gemma 4 / Test Stub)**: Connects to local `gemma4:e2b` or executes deterministic stub responses (`GUARD_STUB=1`).

---

## 2. Complete Page & Component Inventory

| Page / Component | File | Responsibilities | Current State |
| :--- | :--- | :--- | :--- |
| **Landing Screen** | `frontend/src/pages/LandingPage.jsx` | Player name input, session start/resume, leaderboard link | Working; burdened by large procedural SVG scenery. |
| **World Map** | `frontend/src/pages/WorldMapPage.jsx`, `components/WorldMap.jsx` | 5 Kingdom selection with animated walking path interpolation | Working, but high visual overhead (14KB SVG, bezier math). |
| **Kingdom Region** | `frontend/src/pages/KingdomPage.jsx`, `components/KingdomRegion.jsx` | 6 gate nodes per kingdom with path progression | Working, but complex SVG node rendering. |
| **Encounter Stage** | `frontend/src/pages/GameplayPage.jsx` | Active chat with guard, attempts counter, hint, debrief | Core functionality works; weighed down by multi-layered SVG castle/tower backdrops. |
| **Leaderboard** | `frontend/src/pages/LeaderboardPage.jsx` | Top 10 campaign scores table | Working and clean. |
| **Art & Sprite Engines** | `components/art.jsx`, `PlayerCharacter.jsx`, `GuardianCharacter.jsx` | SVG clouds, trees, columns, animated eyes/torches | High decorative overhead; distracting from core AI security demo. |
| **State Hooks** | `hooks/useGameState.jsx`, `hooks/useEncounter.js`, `hooks/usePathWalker.js` | Local storage syncing, REST calls, movement math | Core hooks work reliably; `usePathWalker` is unneeded complexity. |

---

## 3. Frontend Complexity Assessment

### Identified Over-Engineering & Pain Points
1. **Heavy Procedural SVG Scenery**:
   - `art.jsx`, `Backdrop`, and `WorldMap.jsx` generate over 500 lines of complex inline SVG markup (trees, pines, animated clouds, torches, stone paths).
   - This creates rendering overhead on lower-end devices or mobile viewports without adding educational or judging value.
2. **Path Walking Interpolation (`usePathWalker.js`)**:
   - The application calculates bezier curves to animate a 2D avatar walking between kingdom nodes.
   - For a cybersecurity prompt-injection demo, judges want to immediately inspect the prompt injection and defensive debrief—not wait for a 3-second walking animation.
3. **Styling Bloat (`game.css` & `world-map.css`)**:
   - Over 30 KB of custom CSS filled with complex skew transforms, parchment drop shadows, floating keyframe animations, and custom textures.
4. **Visual Distraction from Core Value**:
   - The fantasy RPG theme partially obscures the real technical innovation: **Deterministic Python Adjudication, the Echo Guard, and the Adaptive Learning Boss**.

---

## 4. Working vs. Incomplete Functionality

| Feature | Status | Verification Method |
| :--- | :---: | :--- |
| **30 Levels & Content** | ✅ 100% Working | Validated by 155 Pytest tests |
| **Deterministic Win Logic** | ✅ 100% Working | Verified in `backend/app/game.py` |
| **Echo Guard** | ✅ 100% Working | Verified in `backend/app/game.py` |
| **Adaptive Learning Boss** | ✅ 100% Working | Verified in `ai/guard.py` |
| **SQLite Campaigns & Persistence** | ✅ 100% Working | Verified in `backend/app/db.py` |
| **Offline Stub Mode (`GUARD_STUB=1`)** | ✅ 100% Working | Verified with running backend |
| **In-Browser Client Mock** | ✅ 100% Working | Verified in `frontend/src/services/mockServer.js` |
| **Defender Mode (Prompt Hardening UI)** | ⚠️ Not Implemented | Conceptual only; omitted from scope |

---

## 5. One-Day Implementation Risks

1. **Risk 1: Breaking API Contracts During UI Simplification**:
   - If UI components stop passing exact fields expected by `useEncounter` or `useGameState`, campaign progression will break.
   - *Mitigation*: Keep all hook logic and API services (`api.js`, `backend.js`, `useGameState.jsx`, `useEncounter.js`) 100% intact. Only simplify the presentational layer.
2. **Risk 2: Asset Build Desync**:
   - If `frontend/dist` is not rebuilt after UI cleanup, production single-service serving (`http://localhost:8000`) will serve stale bundles.
   - *Mitigation*: Re-run `npm run build` immediately following component simplification.
3. **Risk 3: Over-Simplification Looking Generic**:
   - Stripping the theme completely could make it look like an unstyled wireframe.
   - *Mitigation*: Replace bulky SVG illustrations with a sleek, modern **Cybersecurity / Security Operations Terminal** aesthetic: crisp dark-mode container cards, clean typography, badge indicators for difficulty/checkpoint/boss, and focused console dialogues.

---

## 6. Recommended Simplifications

1. **Streamline Landing Screen**:
   - Replace complex background SVG terrain with a sleek, professional cybersecurity mission briefing card.
2. **Transform World Map into a Clean Mission Selector**:
   - Replace the 14KB SVG interactive bezier world map with a responsive, high-contrast **5-Kingdom Mission Matrix** showing domain, difficulty, completion status, and clear "Enter Vault" buttons.
3. **Streamline Kingdom Level Selection**:
   - Replace SVG stone gate nodes and walking paths with a clean **6-Gate Security Ladder** displaying gate name, attack focus (Pretext, Authority, Boss), checkpoint badges, and status.
4. **Focus Encounter Screen on the Security Console**:
   - Remove heavy castle backdrops, torches, and animated robotic sprites.
   - Highlight the **Guard Interrogation Terminal**: guard character info, strike counter (3 lives), live chat history, hint reveal button, and security debrief scroll.
5. **Retain 100% Core Functionality**:
   - Zero changes to backend APIs, win detection, or database rules.
