import Lenis from 'lenis';
import { motionAllowed } from './motion';

let lenisInstance: Lenis | null = null;
let rafId: number | null = null;
// Reference count so nested overlays (modal + drawer) resume only when all close.
let stopDepth = 0;

/**
 * Create the global Lenis instance + start its RAF loop. Client-only.
 * No-op when the user prefers reduced motion (decision A).
 */
export function initLenis(): Lenis | null {
  if (typeof window === 'undefined') return null;
  if (lenisInstance) return lenisInstance;
  if (!motionAllowed()) return null; // reduced-motion → native scroll

  lenisInstance = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    // Let nested scrollables (modal/drawer/palette content) scroll natively
    // instead of being hijacked by Lenis. Checked before isStopped, so it works
    // even while stopLenis() holds the background.
    allowNestedScroll: true,
    // Touch left to native momentum scroll (Lenis default does not smooth touch).
  });

  const raf = (time: number): void => {
    lenisInstance?.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  return lenisInstance;
}

export function destroyLenis(): void {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  lenisInstance?.destroy();
  lenisInstance = null;
  stopDepth = 0;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function lenisScrollTo(
  target: number | string | HTMLElement,
  opts?: Record<string, unknown>,
): void {
  lenisInstance?.scrollTo(target, opts);
}

/** Pause background scrolling while an overlay is open. Safe to nest. */
export function stopLenis(): void {
  if (!lenisInstance) return;
  stopDepth += 1;
  lenisInstance.stop();
}

/** Resume background scrolling when the last overlay closes. Safe to nest. */
export function startLenis(): void {
  if (!lenisInstance) return;
  stopDepth = Math.max(0, stopDepth - 1);
  if (stopDepth === 0) lenisInstance.start();
}
