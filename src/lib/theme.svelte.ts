/**
 * Theme state (Fariz design system).
 *
 * Modes: 'dark' (default), 'light', 'system' (follows prefers-color-scheme).
 * Dark = no attribute on <html>; light = <html data-theme="light">.
 * The mode is remembered in localStorage.theme; index.html applies it before first paint.
 */

export type ThemeMode = 'dark' | 'light' | 'system';

const root = () => document.documentElement;
const systemLight = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches;

function readMode(): ThemeMode {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'system') return saved;
  } catch {
    /* storage blocked */
  }
  return 'dark';
}

export const theme = $state({
  mode: (typeof document !== 'undefined' ? readMode() : 'dark') as ThemeMode,
  light: typeof document !== 'undefined' && root().dataset.theme === 'light'
});

function apply() {
  const light = theme.mode === 'light' || (theme.mode === 'system' && systemLight());
  theme.light = light;
  if (light) root().dataset.theme = 'light';
  else delete root().dataset.theme;
  // .dark mirrors the theme for third-party code that sniffs it (boneyard skeletons).
  root().classList.toggle('dark', !light);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', light ? '#f0edf7' : '#09070f');
}

export function setThemeMode(mode: ThemeMode) {
  theme.mode = mode;
  apply();
  try {
    localStorage.setItem('theme', mode);
  } catch {
    /* storage blocked */
  }
}

/** Quick toggle (floating button): flips between explicit dark and light. */
export function toggleTheme() {
  setThemeMode(theme.light ? 'dark' : 'light');
}

/** Follow system changes while in 'system' mode. */
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
    if (theme.mode === 'system') apply();
  });
}
