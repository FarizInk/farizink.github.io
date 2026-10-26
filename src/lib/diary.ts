/**
 * Diary helpers — pure functions shared by the Diary view and Home.
 * No DOM globals and no path aliases, so `node --test` can run them directly.
 */

export type HomeView = 'profile' | 'dashboard' | 'diary';

/** What the Diary edit modal saves (description already converted with textToHtml). */
export interface DiaryEditData {
  name: string;
  description: string;
  isPublic: boolean;
}

/** The part of Storage these helpers use (localStorage in the app, a Map in tests). */
export interface KVStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

const TAG_IDS_KEY = 'diaryTagIds';
const HOME_VIEW_KEY = 'homeView';
const LEGACY_DASHBOARD_KEY = 'homeShowDashboard';
const HOME_VIEWS: HomeView[] = ['profile', 'dashboard', 'diary'];

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function decodeEntities(text: string): string {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

/** Plain text → HTML paragraphs: blank lines split paragraphs, single newlines become <br>. */
export function textToHtml(text: string): string {
  const trimmed = text.replace(/\r\n/g, '\n').trim();
  if (!trimmed) return '';
  return trimmed
    .split(/\n{2,}/)
    .map(block => `<p>${escapeHtml(block.trim()).replace(/\n/g, '<br>')}</p>`)
    .join('');
}

/**
 * Description to send when saving from Diary. An empty string is turned into null by the
 * backend and ignored (old text kept), so a cleared description is sent as an empty paragraph.
 */
export function descriptionForSave(text: string): string {
  return textToHtml(text) || '<p></p>';
}

/** Newest first by created_at (the API floats pinned notes to the top; Diary is a timeline). */
export function sortNewestFirst<T extends { created_at: string }>(list: T[]): T[] {
  return [...list].sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
}

/** HTML (from Diary or the rich Notes editor) → editable plain text. Inverse of textToHtml. */
export function htmlToText(html: string | null): string {
  if (!html) return '';
  return decodeEntities(
    html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|li|h[1-6]|blockquote|pre|div)>/gi, '\n\n')
      .replace(/<li[^>]*>/gi, '- ')
      .replace(/<[^>]+>/g, '')
  )
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** One-line plain-text preview for the feed. */
export function excerpt(html: string | null, max = 140): string {
  const text = htmlToText(html).replace(/\s+/g, ' ').trim();
  return text.length > max ? text.slice(0, max) + '…' : text;
}

export function readTagIds(storage: KVStorage): string[] {
  try {
    const parsed: unknown = JSON.parse(storage.getItem(TAG_IDS_KEY) ?? '[]');
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : [];
  } catch {
    return [];
  }
}

export function writeTagIds(storage: KVStorage, ids: string[]): void {
  storage.setItem(TAG_IDS_KEY, JSON.stringify(ids));
}

/** "just now", "5m ago", "3h ago", "2d ago", then a short date. */
export function relativeTime(iso: string, now: Date = new Date()): string {
  const then = new Date(iso);
  const seconds = Math.max(0, (now.getTime() - then.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 7 * 86400) return `${Math.floor(seconds / 86400)}d ago`;
  return then.toLocaleDateString('en', {
    month: 'short',
    day: 'numeric',
    ...(then.getFullYear() !== now.getFullYear() ? { year: 'numeric' } : {})
  });
}

/** Home view choice; migrates the old boolean dashboard flag. */
export function readHomeView(storage: KVStorage): HomeView {
  const saved = storage.getItem(HOME_VIEW_KEY);
  if (saved !== null) return HOME_VIEWS.includes(saved as HomeView) ? (saved as HomeView) : 'profile';
  return storage.getItem(LEGACY_DASHBOARD_KEY) === 'true' ? 'dashboard' : 'profile';
}

export function writeHomeView(storage: KVStorage, view: HomeView): void {
  storage.setItem(HOME_VIEW_KEY, view);
}
