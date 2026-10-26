// Fariz design system — shared maps. Class strings are written out in full so Tailwind can see them.
export type Tone = 'surface' | 'deep' | 'violet' | 'lilac' | 'lime' | 'accent' | 'void';
/** Event Horizon palette: purple scale deep → violet → lilac, plus one lime pop (max one lime tile per screen). */
export type TileTone = 'deep' | 'violet' | 'lilac' | 'lime';

export const toneClass: Record<Tone, string> = {
  surface: 'bg-card text-ink',
  deep: 'bg-tile-deep text-ink-on-dark',
  violet: 'bg-tile-violet text-ink-on-dark',
  lilac: 'bg-tile-lilac text-ink-on-bright',
  lime: 'bg-tile-lime text-ink-on-bright',
  accent: 'bg-accent text-ink-on-accent',
  void: 'bg-tile-void text-ink-on-dark'
};

/** Eyebrow label colour per tone (muted on neutral grounds, full ink on tinted tiles). */
export const labelClass: Record<Tone, string> = {
  surface: 'text-ink-muted',
  deep: 'text-ink-on-dark',
  violet: 'text-ink-on-dark',
  lilac: 'text-ink-on-bright',
  lime: 'text-ink-on-bright',
  accent: 'text-ink-on-accent',
  void: 'text-ink-on-dark-muted'
};

/** Secondary text on each tone (muted only where it still passes 4.5:1). */
export const mutedClass: Record<Tone, string> = {
  surface: 'text-ink-muted',
  deep: 'text-ink-on-dark-muted',
  violet: 'text-ink-on-dark',
  lilac: 'text-ink-on-bright',
  lime: 'text-ink-on-bright',
  accent: 'text-ink-on-accent',
  void: 'text-ink-on-dark-muted'
};

/** Small tinted squares (tool icons, service marks): fill + matching foreground. */
export const tileClass: Record<TileTone, string> = {
  deep: 'bg-tile-deep text-ink-on-dark',
  violet: 'bg-tile-violet text-ink-on-dark',
  lilac: 'bg-tile-lilac text-ink-on-bright',
  lime: 'bg-tile-lime text-ink-on-bright'
};

/** 4 columns on desktop, 2 on mobile: spans above 2 collapse to full width on mobile. */
export const colSpanClass = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-2 md:col-span-3',
  4: 'col-span-2 md:col-span-4'
} as const;
export const rowSpanClass = { 1: 'row-span-1', 2: 'row-span-2' } as const;

/** Tool category → tile (from DESIGN_SYSTEM.md). */
export const categoryTone: Record<string, TileTone> = {
  'text-data': 'lilac',
  generators: 'violet',
  'web-dev': 'deep',
  utilities: 'lime'
};
