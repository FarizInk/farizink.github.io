import { tick } from 'svelte';
import type { TransitionConfig } from 'svelte/transition';

/* ------------------------------------------------------------------ */
/* Reduced-motion guard (decision A: always-on, except reduced-motion) */
/* ------------------------------------------------------------------ */

let reducedMotion = false;
if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  reducedMotion = mq.matches;
  // keep the flag live if the user changes their OS setting mid-session
  mq.addEventListener('change', (e) => {
    reducedMotion = e.matches;
  });
}

export function prefersReducedMotion(): boolean {
  return reducedMotion;
}

/** True when View Transitions should run. */
export function motionAllowed(): boolean {
  return !reducedMotion;
}

/* ------------------------------------------------------------------ */
/* View Transitions helper                                             */
/* ------------------------------------------------------------------ */

type ViewTransitionDoc = Document & {
  startViewTransition?: (cb: () => Promise<void> | void) => {
    finished: Promise<void>;
  };
};

/**
 * Run a DOM-mutating callback inside a same-document View Transition when
 * the browser supports it and motion is allowed. The callback is awaited
 * (after a Svelte `tick()`) so the browser snapshots the NEW route DOM,
 * not the old one. Falls back to a direct swap otherwise.
 */
export function withViewTransition(swap: () => void | Promise<void>): void {
  const doc = document as ViewTransitionDoc;
  const canVT =
    typeof document !== 'undefined' &&
    typeof doc.startViewTransition === 'function' &&
    motionAllowed();

  if (!canVT) {
    void swap();
    return;
  }

  doc.startViewTransition(async () => {
    swap();
    await tick(); // let Svelte flush the new route's DOM before the snapshot
  });
}

/* ------------------------------------------------------------------ */
/* transitions.dev motion recipes (Svelte transition functions)        */
/* ------------------------------------------------------------------ */

// Snappy ease-out-back (transitions.dev-style "modal/panel" feel).
const tvEase = (t: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

/** Modal: scale 0.96→1 + rise 8px + fade. Replaces the old `modernScale`. */
export function tvModal(
  _node: HTMLElement,
  { duration = 220 }: { duration?: number } = {},
): TransitionConfig {
  if (prefersReducedMotion()) return { duration: 0 };
  return {
    duration,
    easing: tvEase,
    css: (t: number) =>
      `opacity: ${t}; transform: scale(${0.96 + 0.04 * t}) translateY(${(1 - t) * 8}px);`,
  };
}

/** Panel / side sheet: slide in from the edge (default +320px = right edge) + fade. */
export function tvPanel(
  _node: HTMLElement,
  { duration = 260, x = 320 }: { duration?: number; x?: number } = {},
): TransitionConfig {
  if (prefersReducedMotion()) return { duration: 0 };
  return {
    duration,
    easing: tvEase,
    css: (t: number) => `opacity: ${t}; transform: translateX(${(1 - t) * x}px);`,
  };
}
