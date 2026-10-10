import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGame } from '../hooks/useGameState.jsx';
import { USE_MOCK } from '../services/api.js';

export default function LandingPage() {
  const game = useGame();
  const nav = useNavigate();
  const started = Object.values(game.progress).some((p) => p.completed > 0);
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const begin = async (e) => {
    e.preventDefault();
    const clean = name.trim();
    if (!clean || busy) return;
    setBusy(true);
    setErr('');
    try {
      await game.startGame(clean);
      nav('/world');
    } catch (ex) {
      setErr(ex.message);
    } finally {
      setBusy(false);
    }
  };

  const newGame = async () => {
    if (window.confirm('Start a new game? Your current campaign will be reset.')) {
      await game.resetAll();
    }
  };

  return (
    <main className="landing">
      <div className="landing-card parchment">
        <div className="cyber-badge">CYBERSECURITY AI-SAFETY SIMULATOR</div>
        <h1>PROMPT HEIST</h1>
        <p className="lede">
          Infiltrate five corporate data fortresses across 30 progressive security gates.
          Bypass adversarial AI guards with prompt injection, witness real-world vulnerabilities,
          and learn how production systems defend their crown jewels.
        </p>

        {USE_MOCK && (
          <p className="preview-note" role="note">
            <b>Client Preview Mode:</b> Running in-browser mock rules. Connect to FastAPI backend for live Gemma 4 inference.
          </p>
        )}

        <p className="responsible-note" role="note">
          <b>Responsible Disclosure Notice:</b> All systems, enterprise domains, and ciphers in Prompt Heist are fictional.
          Only conduct security assessments on systems you own or have explicit authorization to test.
        </p>

        {game.hasGame && game.playerName ? (
          <div className="landing-actions">
            <p className="welcome-back">Welcome back, <b>{game.playerName}</b>.</p>
            <Link className="stone-btn big" to="/world">
              {started ? 'Continue Campaign ›' : 'Enter Mission Matrix ›'}
            </Link>
            <button type="button" className="stone-btn secondary" onClick={newGame}>Reset Campaign</button>
          </div>
        ) : (
          <form className="landing-actions name-form" onSubmit={begin}>
            <label htmlFor="player-name">Operative Handle</label>
            <input
              id="player-name"
              type="text"
              value={name}
              maxLength={30}
              autoComplete="off"
              placeholder="e.g. Cipher Phantom"
              onChange={(e) => setName(e.target.value)}
              aria-describedby="name-error"
            />
            {err && <p id="name-error" className="form-error" role="alert">{err}</p>}
            <div className="landing-buttons">
              <button type="submit" className="stone-btn big" disabled={!name.trim() || busy}>
                {busy ? 'Initiating Breach…' : 'Initialize Mission ›'}
              </button>
            </div>
          </form>
        )}

        <div className="mission-stats-bar">
          <div className="stat-pill"><span className="stat-val">5</span> Kingdoms</div>
          <div className="stat-pill"><span className="stat-val">30</span> Security Gates</div>
          <div className="stat-pill"><span className="stat-val">Gate 3</span> Checkpoints</div>
          <div className="stat-pill"><span className="stat-val">Gate 6</span> Adaptive Boss</div>
        </div>

        <small className="footer-subtext">
          Team Zero Spot · Hacktoberfest Hack Day NITH GDG 2026 · Powered by Gemma 4 & FastAPI
        </small>
      </div>
    </main>
  );
}
