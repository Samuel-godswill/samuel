import { useState, useEffect, useCallback } from "react";
import "./GameMemory.css";

// ── icons (SVG paths as strings) ─────────────────────────────────────────
// Using minimal tech-themed symbols that fit a dev portfolio
const SYMBOLS = [
  // terminal
  { id: "terminal", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg> },
  // code brackets
  { id: "code", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
  // git branch
  { id: "git", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><path d="M6 8v8M6 8c6 0 10 2 12-2"/></svg> },
  // cloud
  { id: "cloud", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg> },
  // cpu
  { id: "cpu", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="9" y="9" width="6" height="6"/><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="9" y1="2" x2="9" y2="5"/><line x1="15" y1="2" x2="15" y2="5"/><line x1="9" y1="19" x2="9" y2="22"/><line x1="15" y1="19" x2="15" y2="22"/><line x1="2" y1="9" x2="5" y2="9"/><line x1="2" y1="15" x2="5" y2="15"/><line x1="19" y1="9" x2="22" y2="9"/><line x1="19" y1="15" x2="22" y2="15"/></svg> },
  // wifi / signal
  { id: "wifi", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg> },
  // database
  { id: "db", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg> },
  // layers
  { id: "layers", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg> },
];

interface Card {
  id: string;
  symbolId: string;
  flipped: boolean;
  matched: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function initCards(): Card[] {
  const pairs = [...SYMBOLS, ...SYMBOLS].map((s, i) => ({
    id: `${s.id}-${i}`,
    symbolId: s.id,
    flipped: false,
    matched: false,
  }));
  return shuffle(pairs);
}

function MobileBlock() {
  return (
    <div className="gmem-mobile">
      <div className="gmem-mobile__inner">
        <div className="gmem-mobile__icon">🃏</div>
        <h2 className="gmem-mobile__title">Desktop Only</h2>
        <p className="gmem-mobile__body">
          This game is best experienced on a larger screen. Come back on a desktop or laptop.
        </p>
      </div>
    </div>
  );
}

export default function GameMemory() {
  const [isMobile, setIsMobile] = useState(false);
  const [cards, setCards] = useState<Card[]>(initCards);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!started || finished) return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [started, finished]);

  const reset = useCallback(() => {
    setCards(initCards());
    setFlipped([]);
    setMoves(0);
    setLocked(false);
    setElapsed(0);
    setStarted(false);
    setFinished(false);
  }, []);

  const handleFlip = (id: string) => {
    if (locked || finished) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.flipped || card.matched) return;
    if (!started) setStarted(true);

    const newFlipped = [...flipped, id];
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, flipped: true } : c)));
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setLocked(true);
      const [a, b] = newFlipped.map((fid) => cards.find((c) => c.id === fid)!);
      if (a.symbolId === b.symbolId) {
        setCards((prev) =>
          prev.map((c) =>
            newFlipped.includes(c.id) ? { ...c, matched: true } : c
          )
        );
        setFlipped([]);
        setLocked(false);
        // check win
        setCards((prev) => {
          const allMatched = prev.every((c) => c.matched || newFlipped.includes(c.id));
          if (allMatched) setFinished(true);
          return prev;
        });
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              newFlipped.includes(c.id) ? { ...c, flipped: false } : c
            )
          );
          setFlipped([]);
          setLocked(false);
        }, 900);
      }
    }
  };

  const matched = cards.filter((c) => c.matched).length / 2;
  const total = SYMBOLS.length;
  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const symbolMap = Object.fromEntries(SYMBOLS.map((s) => [s.id, s.svg]));

  if (isMobile) return <MobileBlock />;

  return (
    <div className="gmem-page">
      <div className="gmem-shimmer" />
      <div className="gmem-wrapper">
        {/* header */}
        <div className="gmem-header">
          <div>
            <p className="gmem-label">game / memory</p>
            <h1 className="gmem-title">Memory Flip</h1>
          </div>
          <div className="gmem-stats">
            <div className="gmem-stat">
              <span className="gmem-stat-val">{moves}</span>
              <span className="gmem-stat-label">Moves</span>
            </div>
            <div className="gmem-stat">
              <span className="gmem-stat-val gmem-stat-val--green">{matched}/{total}</span>
              <span className="gmem-stat-label">Pairs</span>
            </div>
            <div className="gmem-stat">
              <span className="gmem-stat-val gmem-stat-val--blue">{formatTime(elapsed)}</span>
              <span className="gmem-stat-label">Time</span>
            </div>
          </div>
        </div>

        {/* progress bar */}
        <div className="gmem-progress-track">
          <div className="gmem-progress-fill" style={{ width: `${(matched / total) * 100}%` }} />
        </div>

        {/* board */}
        <div className="gmem-board">
          {cards.map((card) => (
            <button
              key={card.id}
              className={`gmem-card${card.flipped || card.matched ? " gmem-card--flipped" : ""}${card.matched ? " gmem-card--matched" : ""}`}
              onClick={() => handleFlip(card.id)}
              aria-label={card.flipped || card.matched ? card.symbolId : "hidden card"}
            >
              <span className="gmem-card__back">?</span>
              <span className="gmem-card__front">{symbolMap[card.symbolId]}</span>
            </button>
          ))}
        </div>

        {/* footer */}
        <div className="gmem-footer-row">
          <button className="gmem-btn" onClick={reset}>New game</button>
          <p className="gmem-tip">Match all {total} pairs</p>
        </div>

        {/* win overlay */}
        {finished && (
          <div className="gmem-win-overlay">
            <div className="gmem-win-box">
              <p className="gmem-win-title">You won! 🎉</p>
              <div className="gmem-win-details">
                <div className="gmem-win-detail">
                  <span className="gmem-win-detail__label">Moves</span>
                  <span className="gmem-win-detail__val">{moves}</span>
                </div>
                <div className="gmem-win-divider" />
                <div className="gmem-win-detail">
                  <span className="gmem-win-detail__label">Time</span>
                  <span className="gmem-win-detail__val gmem-win-detail__val--blue">{formatTime(elapsed)}</span>
                </div>
              </div>
              <button className="gmem-btn gmem-btn--primary" onClick={reset}>Play again</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}