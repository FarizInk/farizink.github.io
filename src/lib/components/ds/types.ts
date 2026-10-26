import type { Snippet } from 'svelte';

/** Sidebar menu item. */
export interface NavItem { id: string; label: string; href?: string; icon?: Snippet; hint?: string; badge?: string | number; meta?: string; locked?: boolean }
export interface NavGroup { label: string; items: NavItem[] }

/** FileDrop list row. */
export interface UploadFile { name: string; meta: string; progress?: number; onremove?: () => void }
