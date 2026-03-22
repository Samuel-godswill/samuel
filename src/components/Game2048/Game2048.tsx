import { useState, useEffect, useCallback } from "react";
import "./Game2048.css";

type Board = (number | null)[][];

const SIZE = 4;

function emptyBoard(): Board {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
}

function randomEmpty(board: Board): { r: number; c: number } | null {
  const empties: { r: number; c: number }[] = [];
  board.forEach((row, r) => row.forEach((val, c) => { if (!val) empties.push({ r, c }); }));
  if (!empties.length) return null;
  return empties[Math.floor(Math.random() * empties.length)];
}

function addTile(board: Board): Board {
  const next = board.map((r) => [...r]);
  const pos = randomEmpty(next);
  if (pos) next[pos.r][pos.c] = Math.random() < 0.9 ? 2 : 4;
  return next;
}

function initBoard(): Board {
  let b = emptyBoard();
  b = addTile(b);
  b = addTile(b);
  return b;
}

function slideRow(row: (number | null)[]): { row: (number | null)[]; score: number } {
  const vals = row.filter(Boolean) as number[];
  let score = 0;
  const merged: number[] = [];
  let i = 0;
  while (i < vals.length) {
    if (i + 1 < vals.length && vals[i] === vals[i + 1]) {
      merged.push(vals[i] * 2);
      score += vals[i] * 2;
      i += 2;
    } else {
      merged.push(vals[i]);
      i++;
    }
  }
  while (merged.length < SIZE) merged.push(0);
  return { row: merged.map((v) => (v === 0 ? null : v)), score };
}

function moveLeft(board: Board): { board: Board; score: number; moved: boolean } {
  let score = 0;
  let moved = false;
  const next = board.map((row) => {
    const { row: newRow, score: s } = slideRow(row);
    score += s;
    if (JSON.stringify(newRow) !== JSON.stringify(row)) moved = true;
    return newRow;
  });
  return { board: next, score, moved };
}

function rotateRight(board: Board): Board {
  return board[0].map((_, c) => board.map((row) => row[c]).reverse());
}

function rotateLeft(board: Board): Board {
  return board[0].map((_, c) => board.map((row) => row[SIZE - 1 - c]));
}

function move(board: Board, dir: "left" | "right" | "up" | "down"): { board: Board; score: number; moved: boolean } {
  let b = board;
  if (dir === "right") b = b.map((r) => [...r].reverse());
  if (dir === "up") b = rotateLeft(b);
  if (dir === "down") b = rotateRight(b);
  const result = moveLeft(b);
  let nb = result.board;
  if (dir === "right") nb = nb.map((r) => [...r].reverse());
  if (dir === "up") nb = rotateRight(nb);
  if (dir === "down") nb = rotateLeft(nb);
  return { board: nb, score: result.score, moved: result.moved };
}

function isGameOver(board: Board): boolean {
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) {
      if (!board[r][c]) return false;
      if (c + 1 < SIZE && board[r][c] === board[r][c + 1]) return false;
      if (r + 1 < SIZE && board[r][c] === board[r + 1][c]) return false;
    }
  return true;
}

function hasWon(board: Board): boolean {
  return board.some((row) => row.some((v) => v === 2048));
}

function MobileBlock() {
  return (
    <div className="g2048-mobile">
      <div className="g2048-mobile__inner">
        <div className="g2048-mobile__icon">⌨️</div>
        <h2 className="g2048-mobile__title">Desktop Only</h2>
        <p className="g2048-mobile__body">
          Use arrow keys to play 2048. Come back on a desktop or laptop.
        </p>
      </div>
    </div>
  );
}

export default function Game2048() {
  const [isMobile, setIsMobile] = useState(false);
  const [board, setBoard] = useState<Board>(initBoard);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => Number(localStorage.getItem("g2048-best") || 0));
  const [won, setWon] = useState(false);
  const [over, setOver] = useState(false);
  const [keepPlaying, setKeepPlaying] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const reset = useCallback(() => {
    setBoard(initBoard());
    setScore(0);
    setWon(false);
    setOver(false);
    setKeepPlaying(false);
  }, []);

  const handleMove = useCallback((dir: "left" | "right" | "up" | "down") => {
    if (over || (won && !keepPlaying)) return;
    setBoard((prev) => {
      const { board: next, score: gained, moved } = move(prev, dir);
      if (!moved) return prev;
      const withTile = addTile(next);
      setScore((s) => {
        const ns = s + gained;
        setBest((b) => {
          const nb = Math.max(b, ns);
          localStorage.setItem("g2048-best", String(nb));
          return nb;
        });
        return ns;
      });
      if (!keepPlaying && hasWon(withTile)) setWon(true);
      if (isGameOver(withTile)) setOver(true);
      return withTile;
    });
  }, [over, won, keepPlaying]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, "left" | "right" | "up" | "down"> = {
        ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down",
      };
      if (map[e.key]) { e.preventDefault(); handleMove(map[e.key]); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleMove]);

  if (isMobile) return <MobileBlock />;

  return (
    <div className="g2048-page">
      <div className="g2048-shimmer" />
      <div className="g2048-wrapper">
        <div className="g2048-header">
          <div>
            <p className="g2048-label">game / 2048</p>
            <h1 className="g2048-title">2048</h1>
          </div>
          <div className="g2048-scores">
            <div className="g2048-score-card">
              <span className="g2048-score-val">{score}</span>
              <span className="g2048-score-label">Score</span>
            </div>
            <div className="g2048-score-card">
              <span className="g2048-score-val g2048-score-val--best">{best}</span>
              <span className="g2048-score-label">Best</span>
            </div>
          </div>
        </div>

        <div className="g2048-hint">Use arrow keys to merge tiles → reach <strong>2048</strong></div>

        <div className="g2048-board-wrap">
          {(won && !keepPlaying) && (
            <div className="g2048-overlay g2048-overlay--win">
              <p className="g2048-overlay-title">You won! 🎉</p>
              <div className="g2048-overlay-btns">
                <button className="g2048-btn g2048-btn--primary" onClick={() => setKeepPlaying(true)}>Keep going</button>
                <button className="g2048-btn" onClick={reset}>New game</button>
              </div>
            </div>
          )}
          {over && (
            <div className="g2048-overlay g2048-overlay--over">
              <p className="g2048-overlay-title">Game over</p>
              <button className="g2048-btn g2048-btn--primary" onClick={reset}>Try again</button>
            </div>
          )}
          <div className="g2048-board">
            {board.map((row, r) =>
              row.map((val, c) => (
                <div
                  key={`${r}-${c}`}
                  className={`g2048-tile${val ? ` g2048-tile--${val}` : ""}`}
                >
                  {val ?? ""}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="g2048-footer-row">
          <button className="g2048-btn" onClick={reset}>New game</button>
          <p className="g2048-tip">↑ ↓ ← → to move</p>
        </div>
      </div>
    </div>
  );
}