import { useState, useEffect, useRef, useCallback } from "react";
import "./Gamepiano.css";

// ── Key map: keyboard key → note ─────────────────────────────────────────
// Two octaves mapped across the keyboard rows
const KEY_MAP: Record<string, { note: string; freq: number; type: "white" | "black" }> = {
  // Lower octave — white keys: A S D F G H J K
  a: { note: "C3",  freq: 130.81, type: "white" },
  s: { note: "D3",  freq: 146.83, type: "white" },
  d: { note: "E3",  freq: 164.81, type: "white" },
  f: { note: "F3",  freq: 174.61, type: "white" },
  g: { note: "G3",  freq: 196.00, type: "white" },
  h: { note: "A3",  freq: 220.00, type: "white" },
  j: { note: "B3",  freq: 246.94, type: "white" },
  k: { note: "C4",  freq: 261.63, type: "white" },

  // Lower octave — black keys: W E  T Y U
  w: { note: "C#3", freq: 138.59, type: "black" },
  e: { note: "D#3", freq: 155.56, type: "black" },
  t: { note: "F#3", freq: 185.00, type: "black" },
  y: { note: "G#3", freq: 207.65, type: "black" },
  u: { note: "A#3", freq: 233.08, type: "black" },

  // Upper octave — white keys: Z X C V B N M ,
  z: { note: "C4",  freq: 261.63, type: "white" },
  x: { note: "D4",  freq: 293.66, type: "white" },
  c: { note: "E4",  freq: 329.63, type: "white" },
  v: { note: "F4",  freq: 349.23, type: "white" },
  b: { note: "G4",  freq: 392.00, type: "white" },
  n: { note: "A4",  freq: 440.00, type: "white" },
  m: { note: "B4",  freq: 493.88, type: "white" },
  ",": { note: "C5", freq: 523.25, type: "white" },

  // Upper octave — black keys: S D  G H J
  "s2": { note: "C#4", freq: 277.18, type: "black" }, // placeholder, mapped via Z row
};

// Visual piano layout — two octave groups
// Each octave: 8 white keys + 5 black keys
const LOWER_WHITES = ["a","s","d","f","g","h","j","k"];
const LOWER_BLACKS: (string | null)[] = ["w","e",null,"t","y","u",null,null];

const UPPER_WHITES = ["z","x","c","v","b","n","m",","];
const UPPER_BLACKS: (string | null)[] = ["","","",null,"","","",null]; // visual placeholders

// Black key kb labels for upper row
const UPPER_BLACK_KEYS: Record<number, string> = {
  0: "", // between z-x (C#4 — no distinct key, skip)
  1: "", // between x-c
};

// Actual playable black keys above upper whites
// C#4=277, D#4=311, F#4=370, G#4=415, A#4=466
const UPPER_BLACK_PLAYABLE: Array<{ whiteIndex: number; key: string; note: string; freq: number }> = [
  { whiteIndex: 0, key: "", note: "C#4", freq: 277.18 }, // no kb key assigned — click only
  { whiteIndex: 1, key: "", note: "D#4", freq: 311.13 },
  { whiteIndex: 3, key: "", note: "F#4", freq: 369.99 },
  { whiteIndex: 4, key: "", note: "G#4", freq: 415.30 },
  { whiteIndex: 5, key: "", note: "A#4", freq: 466.16 },
];

const LOWER_BLACK_PLAYABLE: Array<{ whiteIndex: number; key: string; note: string; freq: number }> = [
  { whiteIndex: 0, key: "w", note: "C#3", freq: 138.59 },
  { whiteIndex: 1, key: "e", note: "D#3", freq: 155.56 },
  { whiteIndex: 3, key: "t", note: "F#3", freq: 185.00 },
  { whiteIndex: 4, key: "y", note: "G#3", freq: 207.65 },
  { whiteIndex: 5, key: "u", note: "A#3", freq: 233.08 },
];

type WaveType = "sine" | "triangle" | "square" | "sawtooth";

function MobileBlock() {
  return (
    <div className="gpiano-mobile">
      <div className="gpiano-mobile__inner">
        <div className="gpiano-mobile__icon">🎹</div>
        <h2 className="gpiano-mobile__title">Desktop Only</h2>
        <p className="gpiano-mobile__body">
          This piano uses your laptop keyboard. Come back on a desktop or laptop to play.
        </p>
      </div>
    </div>
  );
}

export default function GamePiano() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [wave, setWave] = useState<WaveType>("sine");
  const [volume, setVolume] = useState(0.5);
  const [octaveShift, setOctaveShift] = useState(0);
  const [lastNote, setLastNote] = useState<string>("");
  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeNodesRef = useRef<Map<string, { osc: OscillatorNode; gain: GainNode }>>(new Map());

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playNote = useCallback((key: string, freq: number, noteName: string) => {
    if (activeNodesRef.current.has(key)) return;
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    const shiftedFreq = freq * Math.pow(2, octaveShift);

    osc.type = wave;
    osc.frequency.setValueAtTime(shiftedFreq, ctx.currentTime);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume * 0.4, ctx.currentTime + 0.01);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start();

    activeNodesRef.current.set(key, { osc, gain: gainNode });
    setActiveKeys((prev) => new Set(prev).add(key));
    setLastNote(noteName);
  }, [wave, volume, octaveShift, getCtx]);

  const stopNote = useCallback((key: string) => {
    const node = activeNodesRef.current.get(key);
    if (!node) return;
    const ctx = getCtx();
    node.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);
    node.osc.stop(ctx.currentTime + 0.15);
    activeNodesRef.current.delete(key);
    setActiveKeys((prev) => {
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
  }, [getCtx]);

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const key = e.key.toLowerCase();
      const info = KEY_MAP[key];
      if (info) { e.preventDefault(); playNote(key, info.freq, info.note); }
    };
    const onUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (KEY_MAP[key]) stopNote(key);
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, [playNote, stopNote]);

  const WAVES: WaveType[] = ["sine", "triangle", "square", "sawtooth"];
  const WAVE_LABELS: Record<WaveType, string> = {
    sine: "Sine", triangle: "Tri", square: "Sqr", sawtooth: "Saw",
  };

  if (isMobile) return <MobileBlock />;

  return (
    <div className="gpiano-page">
      <div className="gpiano-shimmer" />

      <div className="gpiano-wrapper">
        {/* header */}
        <div className="gpiano-header">
          <div>
            <p className="gpiano-label">game / piano</p>
            <h1 className="gpiano-title">Piano</h1>
          </div>
          <div className="gpiano-note-display">
            {lastNote ? (
              <span className="gpiano-note-display__note">{lastNote}</span>
            ) : (
              <span className="gpiano-note-display__idle">—</span>
            )}
            <span className="gpiano-note-display__label">playing</span>
          </div>
        </div>

        {/* controls */}
        <div className="gpiano-controls">
          <div className="gpiano-control-group">
            <span className="gpiano-control-label">Wave</span>
            <div className="gpiano-wave-btns">
              {WAVES.map((w) => (
                <button
                  key={w}
                  className={`gpiano-wave-btn${wave === w ? " gpiano-wave-btn--active" : ""}`}
                  onClick={() => setWave(w)}
                >
                  {WAVE_LABELS[w]}
                </button>
              ))}
            </div>
          </div>

          <div className="gpiano-control-group">
            <span className="gpiano-control-label">Volume</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="gpiano-slider"
            />
          </div>

          <div className="gpiano-control-group">
            <span className="gpiano-control-label">Octave</span>
            <div className="gpiano-octave-btns">
              <button className="gpiano-oct-btn" onClick={() => setOctaveShift((o) => Math.max(-2, o - 1))}>−</button>
              <span className="gpiano-oct-val">{octaveShift >= 0 ? `+${octaveShift}` : octaveShift}</span>
              <button className="gpiano-oct-btn" onClick={() => setOctaveShift((o) => Math.min(2, o + 1))}>+</button>
            </div>
          </div>
        </div>

        {/* piano keyboard */}
        <div className="gpiano-keyboard-wrap">
          {/* Lower octave */}
          <div className="gpiano-octave">
            <div className="gpiano-octave-label">Octave 3  ·  A S D F G H J K</div>
            <div className="gpiano-keys">
              {/* white keys */}
              {LOWER_WHITES.map((k) => (
                <button
                  key={k}
                  className={`gpiano-white${activeKeys.has(k) ? " gpiano-white--active" : ""}`}
                  onMouseDown={() => playNote(k, KEY_MAP[k].freq, KEY_MAP[k].note)}
                  onMouseUp={() => stopNote(k)}
                  onMouseLeave={() => stopNote(k)}
                >
                  <span className="gpiano-key-label">{k.toUpperCase()}</span>
                  <span className="gpiano-note-label">{KEY_MAP[k].note}</span>
                </button>
              ))}
              {/* black keys */}
              {LOWER_BLACK_PLAYABLE.map((bk) => (
                <button
                  key={bk.key}
                  className={`gpiano-black gpiano-black--pos-${bk.whiteIndex}${activeKeys.has(bk.key) ? " gpiano-black--active" : ""}`}
                  onMouseDown={() => playNote(bk.key, bk.freq, bk.note)}
                  onMouseUp={() => stopNote(bk.key)}
                  onMouseLeave={() => stopNote(bk.key)}
                >
                  <span className="gpiano-black-label">{bk.key.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="gpiano-divider" />

          {/* Upper octave */}
          <div className="gpiano-octave">
            <div className="gpiano-octave-label">Octave 4  ·  Z X C V B N M ,</div>
            <div className="gpiano-keys">
              {UPPER_WHITES.map((k) => (
                <button
                  key={k}
                  className={`gpiano-white${activeKeys.has(k) ? " gpiano-white--active" : ""}`}
                  onMouseDown={() => playNote(k, KEY_MAP[k].freq, KEY_MAP[k].note)}
                  onMouseUp={() => stopNote(k)}
                  onMouseLeave={() => stopNote(k)}
                >
                  <span className="gpiano-key-label">{k === "," ? "," : k.toUpperCase()}</span>
                  <span className="gpiano-note-label">{KEY_MAP[k].note}</span>
                </button>
              ))}
              {/* upper black — click only */}
              {UPPER_BLACK_PLAYABLE.map((bk) => (
                <button
                  key={bk.note}
                  className={`gpiano-black gpiano-black--pos-${bk.whiteIndex}`}
                  onMouseDown={() => playNote(bk.note, bk.freq, bk.note)}
                  onMouseUp={() => stopNote(bk.note)}
                  onMouseLeave={() => stopNote(bk.note)}
                >
                  <span className="gpiano-black-label" style={{ fontSize: "8px" }}>{bk.note}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* legend */}
        <div className="gpiano-legend">
          <div className="gpiano-legend-item">
            <span className="gpiano-legend-key">A–K</span>
            <span>white keys (oct 3)</span>
          </div>
          <div className="gpiano-legend-item">
            <span className="gpiano-legend-key">W E T Y U</span>
            <span>black keys (oct 3)</span>
          </div>
          <div className="gpiano-legend-item">
            <span className="gpiano-legend-key">Z–,</span>
            <span>white keys (oct 4)</span>
          </div>
        </div>
      </div>
    </div>
  );
}