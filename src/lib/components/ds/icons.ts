// Stroke icon paths (24px viewBox, 2px stroke) used inside the DS components. Pages should use lucide-svelte.
export const I = {
  x: ['M6 6l12 12', 'M18 6L6 18'],
  chev: ['M6 9l6 6 6-6'],
  check: ['M5 12l5 5 9-10'],
  search: ['M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z', 'M20 20l-4-4'],
  lock: ['M6 11h12v9H6z', 'M8 11V8a4 4 0 0 1 8 0v3'],
  upload: ['M12 16V4', 'M7 9l5-5 5 5', 'M4 20h16'],
  alert: ['M12 8v5', 'M12 16.5v.5', 'M10.3 3.9L2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z'],
  moon: ['M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z'],
  sun: ['M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z', 'M12 2v2', 'M12 20v2', 'M4.9 4.9l1.4 1.4', 'M17.7 17.7l1.4 1.4', 'M2 12h2', 'M20 12h2', 'M4.9 19.1l1.4-1.4', 'M17.7 6.3l1.4-1.4'],
  monitor: ['M3 4h18v12H3z', 'M8 20h8', 'M12 16v4']
} as const;
