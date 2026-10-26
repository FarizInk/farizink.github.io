// Fariz motion helpers for Svelte transitions (CSS animations read the tokens directly).
import { cubicBezier } from './easing';

/** Token durations in ms (keep in sync with fariz-tokens.css). */
export const DURATION = { instant: 90, fast: 140, base: 200, slow: 240, stagger: 35 } as const;
export const EASE = {
  soft: cubicBezier(0.2, 0.8, 0.2, 1),
  spring: cubicBezier(0.34, 1.56, 0.64, 1),
  smooth: cubicBezier(0.4, 0, 0.2, 1),
  exit: cubicBezier(0.4, 0, 1, 1)
};

/** True when the OS asks for reduced motion. */
export function reduced(): boolean {
  return typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}
/** Duration that collapses to 0 under reduced motion — use for every Svelte transition. */
export function dur(ms: number): number {
  return reduced() ? 0 : ms;
}
