import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_SETTINGS,
  applySettings,
  clampSettings,
  dayKey,
  formatMMSS,
  initialState,
  nextPhase,
  parseDailyCount,
  parseSettings,
  pause,
  progress,
  remaining,
  reset,
  setPhase,
  skip,
  start,
  tick,
  type Settings,
  type TimerState
} from '../src/lib/tools/pomodoro.ts';

const MIN = 60_000;
const T0 = 1_700_000_000_000;
const S: Settings = { ...DEFAULT_SETTINGS };

/** Run a phase to its end and tick. */
function finish(state: TimerState, settings: Settings, now: number) {
  const running = start(state, now);
  const end = running.endsAt as number;
  return tick(running, settings, end);
}

test('remaining is computed from endsAt, exact after a 10-minute throttled jump', () => {
  const s = start(initialState(S), T0);
  assert.equal(s.endsAt, T0 + 25 * MIN);
  assert.equal(remaining(s, T0), 25 * MIN);
  // No ticks for 10 minutes (background tab): still exact.
  assert.equal(remaining(s, T0 + 10 * MIN), 15 * MIN);
  const r = tick(s, S, T0 + 10 * MIN);
  assert.equal(r.finished, undefined);
  assert.equal(r.state, s);
  assert.equal(remaining(s, T0 + 10 * MIN + 123), 15 * MIN - 123);
});

test('remaining never goes negative and tick finishes even when overdue', () => {
  const s = start(initialState(S), T0);
  assert.equal(remaining(s, T0 + 40 * MIN), 0);
  const r = tick(s, S, T0 + 40 * MIN);
  assert.equal(r.finished, 'focus');
  assert.equal(r.state.phase, 'short');
});

test('pause and resume preserve remaining time', () => {
  let s = start(initialState(S), T0);
  s = pause(s, T0 + 7 * MIN + 500);
  assert.equal(s.running, false);
  assert.equal(s.endsAt, null);
  assert.equal(remaining(s, T0 + 60 * MIN), 18 * MIN - 500);
  s = start(s, T0 + 60 * MIN);
  assert.equal(remaining(s, T0 + 60 * MIN), 18 * MIN - 500);
  assert.equal(s.endsAt, T0 + 60 * MIN + 18 * MIN - 500);
  // start/pause are idempotent
  assert.equal(start(s, T0 + 61 * MIN), s);
  const p = pause(s, T0 + 61 * MIN);
  assert.equal(pause(p, T0 + 99 * MIN), p);
});

test('finishing focus goes to a short break; the 4th goes to a long break', () => {
  let s = initialState(S);
  let now = T0;
  const seen: string[] = [];
  for (let i = 0; i < 8; i++) {
    const r = finish(s, S, now);
    seen.push(`${r.finished}->${r.state.phase}`);
    s = r.state;
    now += 30 * MIN;
  }
  assert.deepEqual(seen, [
    'focus->short',
    'short->focus',
    'focus->short',
    'short->focus',
    'focus->short',
    'short->focus',
    'focus->long',
    'long->focus'
  ]);
  assert.equal(s.completedFocus, 4);
  assert.equal(s.remainingMs, 25 * MIN);
});

test('longBreakEvery is respected', () => {
  const every2 = { ...S, longBreakEvery: 2 };
  assert.equal(nextPhase('focus', 1, every2), 'short');
  assert.equal(nextPhase('focus', 2, every2), 'long');
  assert.equal(nextPhase('long', 2, every2), 'focus');
  assert.equal(nextPhase('short', 3, every2), 'focus');
});

test('next phase stops unless its auto-start flag is set', () => {
  const r1 = finish(initialState(S), S, T0);
  assert.equal(r1.state.running, false);
  assert.equal(r1.state.remainingMs, 5 * MIN);

  const auto = { ...S, autoStartBreaks: true };
  const end = T0 + 25 * MIN;
  const r2 = tick(start(initialState(auto), T0), auto, end);
  assert.equal(r2.state.running, true);
  assert.equal(r2.state.endsAt, end + 5 * MIN);
  // breaks auto-start but focus does not
  const r3 = tick(r2.state, auto, end + 5 * MIN);
  assert.equal(r3.finished, 'short');
  assert.equal(r3.state.phase, 'focus');
  assert.equal(r3.state.running, false);

  const both = { ...S, autoStartBreaks: true, autoStartFocus: true };
  const r4 = tick({ ...r2.state }, both, end + 5 * MIN);
  assert.equal(r4.state.running, true);
  assert.equal(r4.state.endsAt, end + 5 * MIN + 25 * MIN);
});

test('tick does nothing while paused', () => {
  const s = initialState(S);
  assert.deepEqual(tick(s, S, T0 + 99 * MIN), { state: s });
});

test('skip moves on without counting focus and keeps the running state', () => {
  const idle = skip(initialState(S, 3), S, T0);
  assert.equal(idle.phase, 'short');
  assert.equal(idle.completedFocus, 3);
  assert.equal(idle.running, false);
  assert.equal(idle.remainingMs, 5 * MIN);

  const running = skip(start(idle, T0), S, T0 + MIN);
  assert.equal(running.phase, 'focus');
  assert.equal(running.running, true);
  assert.equal(running.endsAt, T0 + MIN + 25 * MIN);
});

test('reset and setPhase restore the full length, stopped', () => {
  let s = start(initialState(S, 2), T0);
  s = reset(s, S);
  assert.equal(s.running, false);
  assert.equal(s.remainingMs, 25 * MIN);
  assert.equal(s.completedFocus, 2);
  s = setPhase(s, S, 'long');
  assert.equal(s.phase, 'long');
  assert.equal(s.remainingMs, 15 * MIN);
});

test('clampSettings: 0, empty and NaN become minimums; huge values the maximum', () => {
  const c = clampSettings({ focusMin: 0, shortBreakMin: '', longBreakMin: 'abc', longBreakEvery: 0 });
  assert.equal(c.focusMin, 1);
  assert.equal(c.shortBreakMin, 1);
  assert.equal(c.longBreakMin, 1);
  assert.equal(c.longBreakEvery, 2);
  const big = clampSettings({ focusMin: 999, shortBreakMin: 61, longBreakMin: '75', longBreakEvery: 50 });
  assert.deepEqual([big.focusMin, big.shortBreakMin, big.longBreakMin, big.longBreakEvery], [180, 60, 60, 10]);
  assert.equal(clampSettings({ focusMin: '30' }).focusMin, 30);
  assert.equal(clampSettings({ focusMin: 12.6 }).focusMin, 13);
});

test('clampSettings: missing fields and non-booleans use defaults', () => {
  assert.deepEqual(clampSettings({}), DEFAULT_SETTINGS);
  assert.deepEqual(clampSettings(null), DEFAULT_SETTINGS);
  assert.equal(clampSettings({ autoStartBreaks: 'yes' }).autoStartBreaks, false);
  assert.equal(clampSettings({ sound: false }).sound, false);
});

test('parseSettings tolerates bad JSON', () => {
  assert.deepEqual(parseSettings(null), DEFAULT_SETTINGS);
  assert.deepEqual(parseSettings('{oops'), DEFAULT_SETTINGS);
  assert.deepEqual(parseSettings('42'), DEFAULT_SETTINGS);
  assert.equal(parseSettings('{"focusMin":50}').focusMin, 50);
});

test('progress stays within 0–1 and is never NaN', () => {
  const s = start(initialState(S), T0);
  assert.equal(progress(s, S, T0), 0);
  assert.equal(progress(s, S, T0 + 12.5 * MIN), 0.5);
  assert.equal(progress(s, S, T0 + 99 * MIN), 1);
  const broken = { ...S, focusMin: 0 } as Settings;
  const p = progress({ ...initialState(S), remainingMs: 10 * MIN }, broken, T0);
  assert.ok(Number.isFinite(p) && p >= 0 && p <= 1);
  assert.equal(progress({ ...initialState(S), remainingMs: NaN }, { ...S, focusMin: NaN }, T0), 0);
});

test('applySettings: untouched phase takes the new length, started ones are capped', () => {
  const longer = { ...S, focusMin: 50 };
  assert.equal(applySettings(initialState(S), S, longer, T0).remainingMs, 50 * MIN);
  const paused = pause(start(initialState(S), T0), T0 + 5 * MIN);
  assert.equal(applySettings(paused, S, longer, T0).remainingMs, 20 * MIN);
  const shorter = { ...S, focusMin: 10 };
  assert.equal(applySettings(paused, S, shorter, T0).remainingMs, 10 * MIN);
  const running = start(initialState(S), T0);
  assert.equal(applySettings(running, S, shorter, T0 + MIN).endsAt, T0 + 11 * MIN);
});

test('formatMMSS rounds up to whole seconds', () => {
  assert.equal(formatMMSS(25 * MIN), '25:00');
  assert.equal(formatMMSS(25 * MIN - 1), '25:00');
  assert.equal(formatMMSS(59_001), '01:00');
  assert.equal(formatMMSS(59_000), '00:59');
  assert.equal(formatMMSS(1), '00:01');
  assert.equal(formatMMSS(0), '00:00');
  assert.equal(formatMMSS(-500), '00:00');
  assert.equal(formatMMSS(NaN), '00:00');
  assert.equal(formatMMSS(180 * MIN), '180:00');
});

test('daily count only counts today', () => {
  const today = dayKey(new Date(2026, 10, 11, 23, 59));
  assert.equal(today, '2026-11-11');
  assert.equal(parseDailyCount(JSON.stringify({ day: today, count: 3 }), today), 3);
  assert.equal(parseDailyCount(JSON.stringify({ day: '2026-11-10', count: 3 }), today), 0);
  assert.equal(parseDailyCount('nope', today), 0);
  assert.equal(parseDailyCount(null, today), 0);
  assert.equal(parseDailyCount(JSON.stringify({ day: today, count: -2 }), today), 0);
});
