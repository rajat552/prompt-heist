import { useCallback, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { kingdomById } from '../data/kingdoms.js';
import { LEVELS } from '../data/levels.js';
import { useGame } from '../hooks/useGameState.jsx';

export default function KingdomPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const game = useGame();
  const k = kingdomById(id);

  const completed = k ? game.progress[k.id]?.completed ?? 0 : 0;
  const unlocked = k ? game.isKingdomUnlocked(k.id) : false;
  const statusOf = useCallback((n) => game.levelStatus(id, n), [game, id]);

  // Default selection to current active level (or Level 1)
  const [sel, setSel] = useState(() => Math.min(6, (completed || 0) + 1));
  const [toast, setToast] = useState('');

  if (!k || !unlocked) return <Navigate to="/world" replace />;

  const L = LEVELS[sel - 1];
  const totalScore = game.campaign?.total_score ?? 0;

  const onSelectGate = (n) => {
    const st = statusOf(n);
    if (st === 'locked') {
      setToast(`Gate ${n} is locked. Breaching Gate ${n - 1} is required.`);
      setTimeout(() => setToast(''), 3000);
      return;
    }
    setSel(n);
  };

  const begin = () => {
    if (sel && statusOf(sel) !== 'locked') {
      nav(`/play/${k.id}/${sel}`);
    }
  };

  return (
    <div
      className="kingdom-ladder-view"
      style={{
        '--accent-color': k.colors.primary,
        '--accent-dark': k.colors.dark,
        '--accent-light': k.colors.accent,
      }}
    >
      <header className="top-bar matrix-header">
        <Link to="/world" className="stone-btn small">‹ Mission Matrix</Link>
        <div className="operative-badge sector-badge">
          <span className="badge-label">SECTOR</span>
          <span className="badge-name">{k.name}</span>
        </div>
        <div className="operative-badge domain-badge">
          <span className="badge-label">DOMAIN</span>
          <span className="badge-desc">{k.domain}</span>
        </div>
        <div className="operative-badge score-badge">
          <span className="badge-label">SCORE</span>
          <span className="badge-score">{totalScore.toLocaleString()}</span>
        </div>
      </header>

      <main className="ladder-container">
        {toast && <div className="toast-notification" role="alert">{toast}</div>}

        <div className="ladder-grid">
          {/* Left: 6-Gate Security Ladder */}
          <section className="gates-column" aria-label="Security Gates Ladder">
            <div className="section-title">
              <h3>SECURITY GATES (6 LEVELS)</h3>
              <span className="ladder-progress">{completed} / 6 Cleared</span>
            </div>

            <div className="gates-list">
              {LEVELS.map((lv) => {
                const st = statusOf(lv.n);
                const isSelected = sel === lv.n;

                return (
                  <button
                    key={lv.n}
                    type="button"
                    className={`gate-row-btn ${st} ${isSelected ? 'selected' : ''}`}
                    onClick={() => onSelectGate(lv.n)}
                  >
                    <div className="gate-number-badge">
                      {st === 'completed' ? '✓' : `0${lv.n}`}
                    </div>

                    <div className="gate-meta">
                      <div className="gate-title-line">
                        <span className="gate-name">{lv.name}</span>
                        {lv.boss && <span className="tag-boss">👑 BOSS</span>}
                        {lv.checkpoint && <span className="tag-checkpoint">🚩 CHECKPOINT</span>}
                      </div>
                      <span className="gate-target">📍 {k.places[lv.n - 1]}</span>
                    </div>

                    <div className={`gate-status-pill ${st}`}>
                      {st === 'completed' ? 'CLEARED' : st === 'available' ? 'ACTIVE' : 'LOCKED'}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Right: Selected Gate Dossier */}
          <aside className="dossier-column" aria-live="polite">
            {L && (
              <div className="gate-dossier-card">
                <div className="dossier-header">
                  <div className="dossier-tag">GATE 0{L.n} DOSSIER</div>
                  {L.boss && <span className="tag-boss large">👑 ADAPTIVE BOSS</span>}
                  {L.checkpoint && <span className="tag-checkpoint large">🚩 CAMPAIGN CHECKPOINT</span>}
                </div>

                <h2 className="dossier-title">{L.name}</h2>
                <div className="dossier-location">📍 Target Location: <b>{k.places[L.n - 1]}</b></div>

                <div className="guardian-profile">
                  <div className="guardian-avatar-badge">🤖</div>
                  <div className="guardian-info">
                    <span className="guardian-name">{k.guardian.name}</span>
                    <span className="guardian-role">{k.guardian.title}</span>
                  </div>
                </div>

                <div className="dossier-briefing">
                  <h4>Vulnerability Profile & Briefing</h4>
                  <p>{L.brief}</p>
                  {L.n === 1 && (
                    <div className="intel-box">
                      💡 <b>Rookie Guard:</b> The cipher is stored directly in the prompt. A polite, direct inquiry will reveal the secret.
                    </div>
                  )}
                  {L.checkpoint && (
                    <div className="intel-box warning">
                      🚩 <b>Checkpoint Notice:</b> Successfully breaching this gate saves your campaign. If you run out of lives on Gates 4–6, you will respawn at Gate 4.
                    </div>
                  )}
                  {L.boss && (
                    <div className="intel-box alert">
                      ⚠️ <b>Adaptive Defense Protocol:</b> The boss will analyze and refuse the attack patterns you used earlier in this sector!
                    </div>
                  )}
                </div>

                <div className="dossier-actions">
                  <button
                    type="button"
                    className={`stone-btn big full-width ${statusOf(L.n) === 'completed' ? 'cleared-btn' : L.boss ? 'boss-btn' : ''}`}
                    disabled={statusOf(L.n) === 'locked'}
                    onClick={begin}
                  >
                    {statusOf(L.n) === 'completed'
                      ? `Replay Gate ${L.n} (Practice) ›`
                      : L.boss
                      ? `Breach the Boss (Gate ${L.n}) ›`
                      : `Infiltrate Gate ${L.n} ›`}
                  </button>
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
