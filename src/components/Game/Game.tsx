import { useState, useEffect, useRef, useCallback } from "react";
import "./Game.css";

const WORD_SETS: Record<string, string[]> = {
  easy: [
    "the","and","for","are","but","not","you","all","any","can","her","was",
    "one","our","out","day","get","has","him","his","how","man","new","now",
    "old","see","two","way","who","boy","did","its","let","put","say","she",
    "too","use","dad","mom","run","sit","eat","big","cat","dog","fun","go",
    "hat","job","key","map","net","red","sun","top",
  ],
  medium: [
    "about","after","again","below","could","every","first","found","great",
    "house","large","learn","never","other","place","plant","point","right",
    "small","sound","spell","still","study","their","there","these","think",
    "three","water","where","which","while","world","would","write","years",
    "young","above","cause","close","comes","earth","eight","often","until",
    "voice","along","light","might","night","since","thing",
  ],
  hard: [
    "abstract","algorithm","benchmark","callback","compiler","constant",
    "database","debugging","declare","document","execute","function","integer",
    "iterate","library","maintain","network","optimize","parameter","protocol",
    "recursion","reference","runtime","sequence","software","structure",
    "template","variable","viewport","webpack","component","interface",
    "keyboard","asynchronous","deployment","frontend","javascript","typescript",
    "framework","repository","responsive","stylesheet","transform","developer",
    "performance",
  ],
};

const TOTAL_TIME = 30;

function generateText(diff: string): string {
  const pool = WORD_SETS[diff];
  const arr: string[] = [];
  for (let i = 0; i < 60; i++)
    arr.push(pool[Math.floor(Math.random() * pool.length)]);
  return arr.join(" ");
}

function MobileBlock() {
  return (
    <div className="mobile-block">
      <div className="mobile-block__inner">
        <div className="mobile-block__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="5" y="2" width="14" height="20" rx="2" />
            <circle cx="12" cy="17.5" r="0.75" fill="currentColor" />
          </svg>
        </div>
        <h2 className="mobile-block__title">Desktop Only</h2>
        <p className="mobile-block__body">
          This game requires a physical keyboard to play. Come back on a
          desktop or laptop for the full experience.
        </p>
        <div className="mobile-block__hint">
          <span className="mobile-block__hint-key">↩</span>
          <span className="mobile-block__hint-key">⌘</span>
          <span className="mobile-block__hint-key">⌥</span>
          <span className="mobile-block__hint-text">bring a real keyboard</span>
        </div>
      </div>
    </div>
  );
}

export default function Game() {
  const [isMobile, setIsMobile] = useState(false);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const [text, setText] = useState("");
  const [typed, setTyped] = useState("");
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const correct = [...typed].filter((c, i) => c === text[i]).length;
  const charIndex = typed.length;
  const accuracy = charIndex > 0 ? Math.round((correct / charIndex) * 100) : 100;
  const elapsed = (TOTAL_TIME - timeLeft) / 60;
  const wpm = elapsed > 0 ? Math.round(correct / 5 / elapsed) : 0;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const reset = useCallback(() => {
    clearInterval(timerRef.current!);
    setTyped("");
    setTimeLeft(TOTAL_TIME);
    setStarted(false);
    setFinished(false);
    setText(generateText(difficulty));
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [difficulty]);

  useEffect(() => { reset(); }, [difficulty]);

  useEffect(() => {
    if (started && !finished) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) { clearInterval(timerRef.current!); setFinished(true); return 0; }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current!);
  }, [started, finished]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (finished) return;
    const val = e.target.value;
    if (!started && val.length > 0) setStarted(true);
    setTyped(val);
    if (val.length >= text.length) setFinished(true);
  };

  const progress = (timeLeft / TOTAL_TIME) * 100;

  if (isMobile) return <MobileBlock />;

  return (
    <div className="game-page">
      <div className="game-page__shimmer" />

      <div className="game-wrapper">
        <div className="game-header">
          <div>
            <p className="game-label">game / typing test</p>
            <h1 className="game-title">How fast do you type?</h1>
          </div>
          <div className="diff-group">
            {(["easy", "medium", "hard"] as const).map((d) => (
              <button
                key={d}
                className={`diff-btn${difficulty === d ? " diff-btn--active" : ""}`}
                onClick={() => setDifficulty(d)}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-val stat-val--wpm">{wpm}</span>
            <span className="stat-label">WPM</span>
          </div>
          <div className="stat-card">
            <span className="stat-val stat-val--acc">{accuracy}%</span>
            <span className="stat-label">Accuracy</span>
          </div>
          <div className="stat-card">
            <span className="stat-val stat-val--time">{timeLeft}</span>
            <span className="stat-label">Seconds</span>
          </div>
        </div>

        {/* progress bar */}
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {!finished ? (
          <>
            <div className="word-display" onClick={() => inputRef.current?.focus()}>
              {[...text].map((char, i) => {
                let cls = "char char--pending";
                if (i < charIndex)
                  cls = `char ${typed[i] === char ? "char--correct" : "char--wrong"}`;
                else if (i === charIndex) cls += " char--cursor";
                return (
                  <span key={i} className={cls}>
                    {char}
                  </span>
                );
              })}
            </div>
            <div className="input-row">
              <input
                ref={inputRef}
                className="type-input"
                value={typed}
                onChange={handleInput}
                placeholder="Click here and start typing…"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                disabled={finished}
              />
              <button className="restart-btn" onClick={reset}>
                Restart
              </button>
            </div>
          </>
        ) : (
          <div className="result-panel">
            <div className="result-wpm">{wpm}</div>
            <p className="result-sub">words per minute</p>
            <div className="result-details">
              <div className="result-detail">
                <span className="result-detail__label">Accuracy</span>
                <span className="result-detail__val">{accuracy}%</span>
              </div>
              <div className="result-divider" />
              <div className="result-detail">
                <span className="result-detail__label">Correct</span>
                <span className="result-detail__val result-detail__val--correct">{correct}</span>
              </div>
              <div className="result-divider" />
              <div className="result-detail">
                <span className="result-detail__label">Errors</span>
                <span className="result-detail__val result-detail__val--error">
                  {Math.max(0, charIndex - correct)}
                </span>
              </div>
            </div>
            <button className="try-again-btn" onClick={reset}>
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}