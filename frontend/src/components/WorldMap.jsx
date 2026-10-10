import { Link, useNavigate } from 'react-router-dom';
import { KINGDOMS } from '../data/kingdoms.js';
import { useGame } from '../hooks/useGameState.jsx';

export default function WorldMap({ devTools }) {
  const game = useGame();
  const nav = useNavigate();

  const totalCleared = Object.values(game.progress).reduce((acc, p) => acc + (p.completed || 0), 0);
  const totalScore = game.campaign?.total_score ?? 0;

  return (
    <div className="world-matrix-view">
      <header className="top-bar matrix-header">
        <Link to="/" className="stone-btn small">‹ Mission Briefing</Link>
        <div className="operative-badge">
          <span className="badge-label">OPERATIVE</span>
          <span className="badge-name">{game.playerName || 'Cipher Phantom'}</span>
        </div>
        <div className="operative-badge score-badge">
          <span className="badge-label">SCORE</span>
          <span className="badge-score">{totalScore.toLocaleString()}</span>
        </div>
        <div className="operative-badge progress-badge">
          <span className="badge-label">PROGRESS</span>
          <span className="badge-count">{totalCleared} / 30 Gates</span>
        </div>
        <Link to="/leaderboard" className="stone-btn small">🏆 Leaderboard</Link>
      </header>

      <main className="matrix-container">
        <div className="matrix-title-banner">
          <h2>MISSION MATRIX: SILICON BASTION</h2>
          <p>Adversarial LLM Infiltration Campaign · Select an active sector below</p>
        </div>

        <div className="kingdoms-grid">
          {KINGDOMS.map((k) => {
            const unlocked = game.isKingdomUnlocked(k.id);
            const completed = game.progress[k.id]?.completed ?? 0;
            const isFinished = completed >= 6;
            const percent = Math.round((completed / 6) * 100);

            return (
              <div
                key={k.id}
                className={`kingdom-card ${unlocked ? 'unlocked' : 'locked'} ${isFinished ? 'cleared' : ''}`}
                style={{ '--accent-color': k.colors.primary }}
              >
                <div className="card-header">
                  <div className="sector-tag">SECTOR 0{k.index + 1}</div>
                  <div className={`status-pill ${isFinished ? 'done' : unlocked ? 'active' : 'sealed'}`}>
                    {isFinished ? 'CLEARED' : unlocked ? 'ACTIVE' : 'SEALED'}
                  </div>
                </div>

                <h3 className="kingdom-name">{k.name}</h3>
                <div className="domain-tag">Domain: {k.domain}</div>
                <p className="kingdom-desc">{k.description}</p>

                <div className="guardian-preview">
                  <span className="preview-label">Guardian:</span> {k.guardian.name} ({k.guardian.title})
                </div>

                <div className="progress-section">
                  <div className="progress-labels">
                    <span>Gate Progress</span>
                    <span>{completed} / 6 Cleared</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${percent}%`, backgroundColor: k.colors.primary }} />
                  </div>
                </div>

                <div className="card-actions">
                  {unlocked ? (
                    <button
                      type="button"
                      className="stone-btn big full-width"
                      onClick={() => nav(`/kingdom/${k.id}`)}
                    >
                      {isFinished ? 'Review Sector ›' : completed > 0 ? 'Continue Breach ›' : 'Infiltrate Sector ›'}
                    </button>
                  ) : (
                    <button type="button" className="stone-btn disabled full-width" disabled>
                      🔒 Complete Previous Sector
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {devTools && (
          <div className="dev-tools-panel">
            <span className="dev-title">Dev Controls (Mock Only):</span>
            <button type="button" className="stone-btn tiny" onClick={game.unlockAll}>Unlock All Sectors</button>
            <button type="button" className="stone-btn tiny" onClick={game.resetAll}>Reset Progress</button>
          </div>
        )}
      </main>
    </div>
  );
}
