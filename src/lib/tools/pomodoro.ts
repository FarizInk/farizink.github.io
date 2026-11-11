// Pure state machine for the Pomodoro Timer (tested in tests/pomodoro.test.ts).
// Time is never decremented: a running timer stores the wall-clock `endsAt` and the
// remaining time is always `endsAt - now`, so throttled background tabs stay exact.
// Self-contained: no relative imports (node --test runs this file directly).

export type Phase = 'focus' | 'short' | 'long';

export interface Settings {
  focusMin: number;
  shortBreakMin: number;
  longBreakMin: number;
  /** A long break follows every N completed focus sessions. */
  longBreakEvery: number;
  autoStartBreaks: boolean;
  autoStartFocus: boolean;
  sound: boolean;
}

export interface TimerState {
  phase: Phase;
  running: boolean;
  /** Epoch ms when the running phase ends; null while paused/idle. */
  endsAt: number | null;
  /** Remaining ms while paused/idle (ignored while running). */
  remainingMs: number;
  /** Completed focus sessions (drives the long-break cycle). */
  completedFocus: number;
}

export interface TickResult {
  state: TimerState;
  /** The phase that just ended, if any. */
  finished?: Phase;
}

export const DEFAULT_SETTINGS: Settings = {
  focusMin: 25,
  shortBreakMin: 5,
  longBreakMin: 15,
  longBreakEvery: 4,
  autoStartBreaks: false,
  autoStartFocus: false,
  sound: true
};

export const LIMITS = {
  focusMin: { min: 1, max: 180 },
  shortBreakMin: { min: 1, max: 60 },
  longBreakMin: { min: 1, max: 60 },
  longBreakEvery: { min: 2, max: 10 }
} as const;

export const PHASE_LABEL: Record<Phase, string> = {
  focus: 'Focus',
  short: 'Short break',
  long: 'Long break'
};

const MINUTE = 60_000;

/** Missing → fallback; empty, 0, NaN or out of range → clamped into [min, max]. */
function clampInt(v: unknown, min: number, max: number, fallback: number): number {
  if (v === undefined || v === null) return fallback;
  const n = typeof v === 'number' ? v : typeof v === 'string' ? Number(v.trim() || NaN) : NaN;
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, Math.round(n)));
}

export function clampSettings(raw: Partial<Record<keyof Settings, unknown>> | null | undefined): Settings {
  const r = raw ?? {};
  const bool = (v: unknown, d: boolean) => (typeof v === 'boolean' ? v : d);
  const d = DEFAULT_SETTINGS;
  return {
    focusMin: clampInt(r.focusMin, LIMITS.focusMin.min, LIMITS.focusMin.max, d.focusMin),
    shortBreakMin: clampInt(r.shortBreakMin, LIMITS.shortBreakMin.min, LIMITS.shortBreakMin.max, d.shortBreakMin),
    longBreakMin: clampInt(r.longBreakMin, LIMITS.longBreakMin.min, LIMITS.longBreakMin.max, d.longBreakMin),
    longBreakEvery: clampInt(r.longBreakEvery, LIMITS.longBreakEvery.min, LIMITS.longBreakEvery.max, d.longBreakEvery),
    autoStartBreaks: bool(r.autoStartBreaks, d.autoStartBreaks),
    autoStartFocus: bool(r.autoStartFocus, d.autoStartFocus),
    sound: bool(r.sound, d.sound)
  };
}

/** Parse settings saved as JSON; anything invalid falls back to defaults. */
export function parseSettings(json: string | null): Settings {
  if (!json) return { ...DEFAULT_SETTINGS };
  try {
    const v: unknown = JSON.parse(json);
    return clampSettings(v && typeof v === 'object' ? (v as Record<string, unknown>) : null);
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function durationMs(phase: Phase, settings: Settings): number {
  const s = clampSettings(settings);
  const min = phase === 'focus' ? s.focusMin : phase === 'short' ? s.shortBreakMin : s.longBreakMin;
  return min * MINUTE;
}

export function initialState(settings: Settings, completedFocus = 0): TimerState {
  return { phase: 'focus', running: false, endsAt: null, remainingMs: durationMs('focus', settings), completedFocus };
}

export function remaining(state: TimerState, now: number): number {
  if (state.running && state.endsAt !== null) return Math.max(0, state.endsAt - now);
  return Math.max(0, state.remainingMs);
}

export function start(state: TimerState, now: number): TimerState {
  if (state.running) return state;
  return { ...state, running: true, endsAt: now + Math.max(0, state.remainingMs) };
}

export function pause(state: TimerState, now: number): TimerState {
  if (!state.running) return state;
  return { ...state, running: false, endsAt: null, remainingMs: remaining(state, now) };
}

/** Back to the full length of the current phase, stopped. */
export function reset(state: TimerState, settings: Settings): TimerState {
  return { ...state, running: false, endsAt: null, remainingMs: durationMs(state.phase, settings) };
}

/** Jump to a phase, stopped, at its full length. */
export function setPhase(state: TimerState, settings: Settings, phase: Phase): TimerState {
  return reset({ ...state, phase }, settings);
}

/** Phase after `phase`, given the completed-focus count after it ended. */
export function nextPhase(phase: Phase, completedFocus: number, settings: Settings, counted = true): Phase {
  if (phase !== 'focus') return 'focus';
  const every = clampSettings(settings).longBreakEvery;
  return counted && completedFocus > 0 && completedFocus % every === 0 ? 'long' : 'short';
}

function enter(settings: Settings, phase: Phase, completedFocus: number, run: boolean, now: number): TimerState {
  const ms = durationMs(phase, settings);
  return run
    ? { phase, running: true, endsAt: now + ms, remainingMs: ms, completedFocus }
    : { phase, running: false, endsAt: null, remainingMs: ms, completedFocus };
}

/** Skip to the next phase. A skipped focus session is not counted; keeps running if it was. */
export function skip(state: TimerState, settings: Settings, now: number): TimerState {
  const next = nextPhase(state.phase, state.completedFocus, settings, false);
  return enter(settings, next, state.completedFocus, state.running, now);
}

/** Advance when the running phase has reached its end; auto-start flags decide whether the next one runs. */
export function tick(state: TimerState, settings: Settings, now: number): TickResult {
  if (!state.running || remaining(state, now) > 0) return { state };
  const s = clampSettings(settings);
  const completed = state.phase === 'focus' ? state.completedFocus + 1 : state.completedFocus;
  const next = nextPhase(state.phase, completed, s);
  const run = next === 'focus' ? s.autoStartFocus : s.autoStartBreaks;
  return { state: enter(s, next, completed, run, now), finished: state.phase };
}

/** Apply new settings: an untouched phase takes the new length, a started one is capped to it. */
export function applySettings(state: TimerState, prev: Settings, next: Settings, now: number): TimerState {
  const oldMs = durationMs(state.phase, prev);
  const newMs = durationMs(state.phase, next);
  if (!state.running) {
    const untouched = state.remainingMs >= oldMs;
    return { ...state, remainingMs: untouched ? newMs : Math.min(state.remainingMs, newMs) };
  }
  return { ...state, endsAt: Math.min(state.endsAt ?? now, now + newMs) };
}

/** 0–1, never NaN. */
export function progress(state: TimerState, settings: Settings, now: number): number {
  const total = durationMs(state.phase, settings);
  if (!(total > 0)) return 0;
  const p = 1 - remaining(state, now) / total;
  return Number.isFinite(p) ? Math.min(1, Math.max(0, p)) : 0;
}

/** MM:SS, rounding up to the next whole second (so 0:00 only shows at the end). */
export function formatMMSS(ms: number): string {
  const total = Number.isFinite(ms) ? Math.ceil(Math.max(0, ms) / 1000) : 0;
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/** Local calendar day, e.g. 2026-11-11. */
export function dayKey(date: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}`;
}

/** Today's completed count from `{ day, count }` JSON; another day or bad data → 0. */
export function parseDailyCount(json: string | null, today: string): number {
  if (!json) return 0;
  try {
    const v = JSON.parse(json) as { day?: unknown; count?: unknown };
    if (v?.day !== today) return 0;
    const n = Number(v.count);
    return Number.isInteger(n) && n > 0 ? n : 0;
  } catch {
    return 0;
  }
}
