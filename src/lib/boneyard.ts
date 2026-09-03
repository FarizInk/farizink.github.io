/**
 * True only inside boneyard's headless capture browser. The vite plugin sets
 * `window.__BONEYARD_BUILD` via addInitScript before any page load, so this is
 * never true at runtime, in production builds, or in a human's dev browser.
 *
 * Loading branches use it to render their fixture content during capture so
 * boneyard can snapshot real layout without auth or network — see
 * src/lib/fixtures.ts and the "Skeleton Screens" section in CLAUDE.md.
 */
export const isBoneyardCapture =
  typeof window !== 'undefined' &&
  (window as { __BONEYARD_BUILD?: boolean }).__BONEYARD_BUILD === true;
