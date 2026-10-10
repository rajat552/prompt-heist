# Prompt Heist: Hackathon MVP Scope & Priority Matrix

**Document**: `docs/MVP_SCOPE.md`  
**Purpose**: Define the minimal, most reliable, demo-ready feature set for a 1-day hackathon.

---

## 1. Feature Priority Classification

### P0 — Essential (Core Hackathon Demo Journey)
*These must work flawlessly end-to-end with zero latency or rendering bugs.*
- **Player Session & Identity**: Name registration and campaign session creation in `localStorage` & SQLite.
- **Kingdom & Level Selection**: Clear navigation across the 5 kingdoms and 30 levels.
- **Active Encounter Terminal**:
  - Guard persona & opening scenario display.
  - User prompt submission (500 character limit).
  - 3-strike life system with visible counters.
  - Tactical hint unlock after 2 strikes.
  - Deterministic Python win verification (regex + normalisation).
  - Echo Guard rejection (preventing win by repeating the cipher).
- **Post-Level Security Debrief**: Educational scroll explaining the vulnerability and production defense.
- **Adaptive Boss Mechanism**: Gate 6 dynamically adapting to prior winning prompts in SQLite.
- **Checkpoints & Respawns**: Level 3 checkpoint preservation and safe respawn on loss.
- **Offline / Local Execution**: Flawless execution with `GUARD_STUB=1` or local Ollama.

### P1 — Important (Judging Impact & Usability)
- **Hall of Phantoms Leaderboard**: Displaying top campaign runs sorted by score.
- **Visual Feedback**: Distinct indicators for strikes, wins, defeats, and adaptive boss status.
- **Single-Port Production Serving**: FastAPI serving compiled frontend directly on port 8000.
- **Defensive Ethics Notice**: Clear disclaimer regarding authorized educational use only.

### P2 — Optional (Post-Hackathon Roadmap)
- Sound effects and ambient audio toggles.
- Additional multilingual translations.
- Custom user avatar selection.

### P3 — Remove / Defer (Over-Engineered Overhead)
- **Procedural SVG Landscape Generation** (`art.jsx`): Replaced with clean CSS layouts.
- **Bezier Path Walker Engine** (`usePathWalker.js`): Replaced with instant card/button navigation.
- **Complex Animated Sprites** (`PlayerCharacter.jsx`, `GuardianCharacter.jsx`): Replaced with clean character status badges and avatar emblems.
- **Unimplemented Defender Mode**: Cleanly omitted from UI to prevent user confusion.

---

## 2. MVP Acceptance Criteria

1. **Immediate Discovery**: A judge can launch the app, enter a name, and start Level 1 in under 10 seconds.
2. **Zero Animation Friction**: Zero delays waiting for sprites to walk along curves.
3. **Rock-Solid Core Loop**: Submitting a winning prompt triggers the win modal and security debrief every time.
4. **Resilient Offline Demo**: The entire workflow functions flawlessly without internet access or GPU dependencies using the built-in stub mode.
5. **Clean Responsive Design**: Works seamlessly on laptop displays and standard projector resolutions.
