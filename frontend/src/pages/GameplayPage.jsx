import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { GAME_CONFIG, KINGDOMS, kingdomById } from '../data/kingdoms.js';
import { LEVELS } from '../data/levels.js';
import { useGame } from '../hooks/useGameState.jsx';
import { useEncounter } from '../hooks/useEncounter.js';
import GameHUD from '../components/GameHUD.jsx';
import GuardianDialogue from '../components/GuardianDialogue.jsx';
import CheckpointModal from '../components/CheckpointModal.jsx';
import VictoryModal from '../components/VictoryModal.jsx';
import DefeatModal from '../components/DefeatModal.jsx';

function Encounter() {
  const { id, level: lvParam } = useParams();
  const level = Number(lvParam);
  const nav = useNavigate();
  const game = useGame();
  const k = kingdomById(id);
  const L = LEVELS[level - 1];
  const enc = useEncounter(id, level);
  const [bossIntro, setBossIntro] = useState(Boolean(L?.boss));
  const [showAdapt, setShowAdapt] = useState(true);
  const completedAtStart = useMemo(() => game.progress[id]?.completed ?? 0, []); // eslint-disable-line react-hooks/exhaustive-deps
  const frontier = level === completedAtStart + 1;

  // Record the win once. (Real backend: progress arrives from GET /api/sessions/{id}.)
  const { completeLevel } = game;
  useEffect(() => {
    const s = enc.session?.status;
    if (s === 'won') completeLevel(id, level);
    else if (s === 'lost') game.resetToCheckpoint(id);
  }, [enc.session?.status]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!bossIntro) return;
    const t = setTimeout(() => setBossIntro(false), 4200);
    return () => clearTimeout(t);
  }, [bossIntro]);

  const strikes = enc.session?.strikes ?? 0;
  const done = Boolean(enc.session && enc.session.status !== 'active');
  const nextKingdom = KINGDOMS[k.index + 1];
  const checkpointReached = completedAtStart >= GAME_CONFIG.checkpointLevel || (level > GAME_CONFIG.checkpointLevel && !frontier);
  const restartLevel = frontier ? (completedAtStart >= GAME_CONFIG.checkpointLevel ? GAME_CONFIG.checkpointLevel + 1 : 1) : level;

  const toKingdom = () => nav(`/kingdom/${id}`);
  const next = () => nav(`/play/${id}/${level + 1}`, { replace: true });
  const retry = () => {
    if (frontier) game.resetToCheckpoint(id);
    nav(`/play/${id}/${restartLevel}`, { replace: true });
  };

  const guardName = enc.session?.character || k.guardian.name;
  const targetLocation = k.places[level - 1];

  return (
    <div className={`gameplay-terminal ${L.boss ? 'boss' : ''}`} style={{ '--accent-color': k.colors.primary }}>
      <header className="top-bar matrix-header">
        <Link to={`/kingdom/${id}`} className="stone-btn small">‹ Retreat to Gates</Link>
        <div className={`ribbon ${L.boss ? 'purple' : ''}`}>
          {L.boss ? '👑 ' : ''}Gate 0{level}: {L.name}
        </div>
        <div className="operative-badge">
          <span className="badge-label">SECTOR</span>
          <span className="badge-name">{k.name}</span>
        </div>
        <div className="operative-badge domain-badge">
          <span className="badge-label">LOCATION</span>
          <span className="badge-desc">{targetLocation}</span>
        </div>
      </header>

      <div className="encounter-grid-terminal">
        {/* Left: Guard Profile & Tactical Dossier */}
        <section className="terminal-dossier-card" aria-label="Target Profile">
          <div className="dossier-tag-line">
            <span className="dossier-pill">SECURITY LEVEL: 0{level}/06</span>
            {L.boss && <span className="tag-boss">👑 ADAPTIVE BOSS</span>}
            {L.checkpoint && <span className="tag-checkpoint">🚩 CHECKPOINT GATE</span>}
          </div>

          <div className="guard-dossier-main">
            <div className="guard-avatar-large">🤖</div>
            <div className="guard-dossier-text">
              <h3 className="guard-name-title">{guardName}</h3>
              <p className="guard-role-subtitle">{k.guardian.title} · {k.domain}</p>
            </div>
          </div>

          <div className="intel-section">
            <div className="intel-row">
              <span className="intel-key">Objective:</span>
              <span className="intel-val">Extract the secret gate cipher via prompt injection.</span>
            </div>
            <div className="intel-row">
              <span className="intel-key">Attack Surface:</span>
              <span className="intel-val">{L.brief}</span>
            </div>
            {enc.session?.opening && (
              <div className="intel-row opening-box">
                <span className="intel-key">Opening Challenge:</span>
                <p className="opening-quote">"{enc.session.opening}"</p>
              </div>
            )}
          </div>

          {level === 1 && (
            <div className="tutorial-callout">
              📜 <b>Rookie Gate:</b> The guard trusts simple inquiries. Ask politely for the maintenance cipher!
            </div>
          )}

          {L.boss && enc.adaptation && (
            <div className="boss-adaptation-card">
              <div className="adapt-header-bar">
                <span>⚠️ ADAPTIVE DEFENSE LOG</span>
                <span className="adapt-status-pill">{enc.adaptation.status.toUpperCase()}</span>
              </div>
              <p className="adapt-summary">{enc.adaptation.summary}</p>
              <div className="learned-tactics-list">
                {enc.adaptation.learned.map((s) => (
                  <div key={s.level} className={`tactic-chip ${s.blocked ? 'blocked' : 'open'}`}>
                    <span>Gate {s.level}:</span> {s.strategy} <b>{s.blocked ? 'BLOCKED' : 'VULNERABLE'}</b>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Right: Live Prompt Terminal */}
        <section className="terminal-chat-card" aria-label="Terminal Encounter">
          <GameHUD
            kingdom={k}
            level={level}
            strikes={strikes}
            maxStrikes={GAME_CONFIG.maxStrikes}
            attempts={enc.session?.attempts ?? 0}
            completed={Math.max(game.progress[id]?.completed ?? 0, 0)}
          />

          <GuardianDialogue
            guardianName={guardName}
            messages={enc.messages}
            loading={enc.loading}
            sending={enc.sending}
            error={enc.error}
            disabled={done || !enc.session}
            onSend={enc.send}
            onRetry={enc.session ? enc.clearError : enc.retryStart}
            placeholder={
              L.boss
                ? 'Craft an adversarial prompt the boss has not adapted against…'
                : 'Send your prompt injection payload… (Enter to submit)'
            }
          />

          {done && !enc.outcome && <p className="resolving">Analyzing response security…</p>}
        </section>
      </div>

      {bossIntro && (
        <div className="boss-intro" onClick={() => setBossIntro(false)} role="alertdialog" aria-label="Boss introduction">
          <div className="boss-intro-inner">
            <h1>👑 ADAPTIVE BOSS ENGAGED</h1>
            <p>{enc.adaptation?.summary || 'The sentinel has analyzed your earlier breaches in this sector.'}</p>
            <p className="ad-status">Defensive Hardening: <b>{(enc.adaptation?.status || 'Active').toUpperCase()}</b></p>
            <small>Click to initiate breach</small>
          </div>
        </div>
      )}

      {enc.outcome === 'won' && (level === GAME_CONFIG.checkpointLevel
        ? <CheckpointModal debrief={enc.debrief} onContinue={next} onMap={toKingdom} />
        : <VictoryModal kingdom={k} level={level} debrief={enc.debrief} kingdomComplete={level === 6} nextKingdom={nextKingdom}
            onContinue={next} onMap={() => (level === 6 ? nav('/world') : toKingdom())} />)}

      {enc.outcome === 'lost' && (
        <DefeatModal
          checkpointReached={checkpointReached}
          restartLevel={restartLevel}
          frontier={frontier}
          onRetry={retry}
          onMap={() => nav('/world')}
        />
      )}
    </div>
  );
}

export default function GameplayPage() {
  const { id, level } = useParams();
  const loc = useLocation();
  const game = useGame();
  const n = Number(level);
  const k = kingdomById(id);

  const key = `${loc.key}-${id}-${n}`;
  const entry = useRef({ key: null, ok: true });
  if (entry.current.key !== key) {
    const ok = Boolean(k) && Number.isInteger(n) && n >= 1 && n <= 6 && game.isKingdomUnlocked(id) && game.levelStatus(id, n) !== 'locked';
    entry.current = { key, ok };
  }
  if (!entry.current.ok) {
    return <Navigate to={k && game.isKingdomUnlocked(id) ? `/kingdom/${id}` : '/world'} replace />;
  }
  return <Encounter key={key} />;
}
