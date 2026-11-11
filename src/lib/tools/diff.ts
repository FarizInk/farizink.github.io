// Text Diff logic: pure, two strings in → ordered line rows out. Built on jsdiff (`diff` v9).
// Comparison options (ignoreWhitespace / ignoreCase) only change how lines are COMPARED;
// every row carries the user's original text.
// Kept in one module: node --test can't resolve extensionless relative imports.

import { diffArrays, diffChars, diffWordsWithSpace, createTwoFilesPatch } from 'diff';
import type { Change } from 'diff';

export type RowType = 'equal' | 'added' | 'removed';
export type InlineMode = 'word' | 'char';

export interface Segment {
  text: string;
  /** true when this piece differs from the paired line (removed on the old side, added on the new side). */
  changed: boolean;
}

export interface DiffRow {
  type: RowType;
  /** 1-based line number in the original text (null for added rows). */
  oldNo: number | null;
  /** 1-based line number in the changed text (null for removed rows). */
  newNo: number | null;
  /** Original text of the line (from the side it belongs to; the new side for equal rows). */
  text: string;
  /** For equal rows, the old side's text (may differ when ignore options are on). */
  oldText?: string;
  /** Inline highlights, present on removed/added rows that were paired with a counterpart. */
  segments?: Segment[];
}

export interface DiffStats {
  added: number;
  removed: number;
  unchanged: number;
}

export interface DiffOptions {
  ignoreWhitespace?: boolean;
  ignoreCase?: boolean;
  inline?: InlineMode;
  /** Milliseconds before giving up on the line diff (falls back to "all removed, all added"). */
  timeout?: number;
}

export interface DiffResult {
  rows: DiffRow[];
  stats: DiffStats;
  /** No added or removed lines (under the chosen comparison options). */
  identical: boolean;
  /** The line diff hit the timeout and fell back to replacing everything. */
  approximate: boolean;
}

/** Lines longer than this (combined) get a whole-line highlight instead of an inline diff. */
const INLINE_LIMIT = 4000;

/** Split text into lines; accepts LF, CRLF and CR. Empty text has no lines. */
export function splitLines(text: string): string[] {
  if (text === '') return [];
  return text.split(/\r\n|\r|\n/);
}

function normalizeLine(line: string, opts: DiffOptions): string {
  let s = line;
  if (opts.ignoreWhitespace) s = s.trim().replace(/\s+/g, ' ');
  if (opts.ignoreCase) s = s.toLowerCase();
  return s;
}

/** Word- or char-level highlights for a changed line pair. */
export function inlineSegments(
  oldLine: string,
  newLine: string,
  opts: DiffOptions = {}
): { old: Segment[]; new: Segment[] } {
  if (oldLine.length + newLine.length > INLINE_LIMIT) {
    return {
      old: oldLine ? [{ text: oldLine, changed: true }] : [],
      new: newLine ? [{ text: newLine, changed: true }] : []
    };
  }
  // Compare lowercased copies when ignoring case, but only if lowercasing keeps lengths,
  // so we can slice the ORIGINAL strings by each change's length.
  const lowerOk =
    opts.ignoreCase &&
    oldLine.toLowerCase().length === oldLine.length &&
    newLine.toLowerCase().length === newLine.length;
  const a = lowerOk ? oldLine.toLowerCase() : oldLine;
  const b = lowerOk ? newLine.toLowerCase() : newLine;
  const changes: Change[] = opts.inline === 'char' ? diffChars(a, b) : diffWordsWithSpace(a, b);

  const oldSegs: Segment[] = [];
  const newSegs: Segment[] = [];
  let i = 0;
  let j = 0;
  const push = (list: Segment[], text: string, changed: boolean) => {
    if (!text) return;
    // Whitespace-only edits aren't differences when ignoring whitespace.
    const isChanged = changed && !(opts.ignoreWhitespace && text.trim() === '');
    const last = list[list.length - 1];
    if (last && last.changed === isChanged) last.text += text;
    else list.push({ text, changed: isChanged });
  };
  for (const c of changes) {
    const len = c.value.length;
    if (c.added) {
      push(newSegs, newLine.slice(j, j + len), true);
      j += len;
    } else if (c.removed) {
      push(oldSegs, oldLine.slice(i, i + len), true);
      i += len;
    } else {
      push(oldSegs, oldLine.slice(i, i + len), false);
      push(newSegs, newLine.slice(j, j + len), false);
      i += len;
      j += len;
    }
  }
  return { old: oldSegs, new: newSegs };
}

/** Line diff of `a` (original) against `b` (changed), rows in display order. */
export function computeDiff(a: string, b: string, opts: DiffOptions = {}): DiffResult {
  const oldLines = splitLines(a);
  const newLines = splitLines(b);
  const oldKeys = oldLines.map(l => normalizeLine(l, opts));
  const newKeys = newLines.map(l => normalizeLine(l, opts));

  let changes = diffArrays(oldKeys, newKeys, { timeout: opts.timeout ?? 2000 });
  let approximate = false;
  if (!changes) {
    approximate = true;
    changes = [];
    if (oldKeys.length)
      changes.push({ value: oldKeys, count: oldKeys.length, added: false, removed: true });
    if (newKeys.length)
      changes.push({ value: newKeys, count: newKeys.length, added: true, removed: false });
  }

  const rows: DiffRow[] = [];
  const stats: DiffStats = { added: 0, removed: 0, unchanged: 0 };
  let i = 0; // index into oldLines
  let j = 0; // index into newLines
  let removedRun: DiffRow[] = [];

  for (const c of changes) {
    const n = c.count ?? c.value.length;
    if (c.removed) {
      removedRun = [];
      for (let k = 0; k < n; k++) {
        const row: DiffRow = { type: 'removed', oldNo: i + 1, newNo: null, text: oldLines[i] };
        rows.push(row);
        removedRun.push(row);
        i++;
      }
      stats.removed += n;
    } else if (c.added) {
      for (let k = 0; k < n; k++) {
        const row: DiffRow = { type: 'added', oldNo: null, newNo: j + 1, text: newLines[j] };
        // Pair with the k-th line of the removed run right before this one.
        const partner = removedRun[k];
        if (partner) {
          const segs = inlineSegments(partner.text, row.text, opts);
          partner.segments = segs.old;
          row.segments = segs.new;
        }
        rows.push(row);
        j++;
      }
      removedRun = [];
      stats.added += n;
    } else {
      removedRun = [];
      for (let k = 0; k < n; k++) {
        const row: DiffRow = { type: 'equal', oldNo: i + 1, newNo: j + 1, text: newLines[j] };
        if (oldLines[i] !== newLines[j]) row.oldText = oldLines[i];
        rows.push(row);
        i++;
        j++;
      }
      stats.unchanged += n;
    }
  }

  return { rows, stats, identical: stats.added === 0 && stats.removed === 0, approximate };
}

export interface SplitRow {
  left: DiffRow | null;
  right: DiffRow | null;
}

/** Side-by-side alignment: equal rows on both sides, removed/added runs zipped. */
export function toSplitRows(rows: DiffRow[]): SplitRow[] {
  const out: SplitRow[] = [];
  let k = 0;
  while (k < rows.length) {
    const row = rows[k];
    if (row.type === 'equal') {
      out.push({ left: row, right: row });
      k++;
      continue;
    }
    const removed: DiffRow[] = [];
    const added: DiffRow[] = [];
    while (k < rows.length && rows[k].type === 'removed') removed.push(rows[k++]);
    while (k < rows.length && rows[k].type === 'added') added.push(rows[k++]);
    const n = Math.max(removed.length, added.length);
    for (let m = 0; m < n; m++) out.push({ left: removed[m] ?? null, right: added[m] ?? null });
  }
  return out;
}

export type CollapsedItem<T> =
  | { kind: 'row'; row: T; index: number }
  | { kind: 'gap'; start: number; end: number; count: number };

/**
 * Hide long unchanged runs, keeping `context` lines next to each change.
 * A gap covers rows[start..end) and is only made when it would hide at least `minHidden` rows.
 */
export function collapseRows<T>(
  rows: T[],
  isEqual: (row: T) => boolean,
  context = 3,
  minHidden = 4
): CollapsedItem<T>[] {
  const out: CollapsedItem<T>[] = [];
  let k = 0;
  while (k < rows.length) {
    if (!isEqual(rows[k])) {
      out.push({ kind: 'row', row: rows[k], index: k });
      k++;
      continue;
    }
    let end = k;
    while (end < rows.length && isEqual(rows[end])) end++;
    const keepBefore = k === 0 ? 0 : context; // after a change
    const keepAfter = end === rows.length ? 0 : context; // before a change
    const hideStart = k + keepBefore;
    const hideEnd = end - keepAfter;
    const hidden = hideEnd - hideStart;
    if (hidden >= minHidden) {
      for (let m = k; m < hideStart; m++) out.push({ kind: 'row', row: rows[m], index: m });
      out.push({ kind: 'gap', start: hideStart, end: hideEnd, count: hidden });
      for (let m = hideEnd; m < end; m++) out.push({ kind: 'row', row: rows[m], index: m });
    } else {
      for (let m = k; m < end; m++) out.push({ kind: 'row', row: rows[m], index: m });
    }
    k = end;
  }
  return out;
}

/** Unified patch (exact comparison, LF line endings) for copy/download. */
export function unifiedPatch(
  a: string,
  b: string,
  nameA = 'original.txt',
  nameB = 'changed.txt',
  context = 3
): string {
  const lf = (s: string) => s.replace(/\r\n?/g, '\n');
  return createTwoFilesPatch(nameA, nameB, lf(a), lf(b), undefined, undefined, { context });
}
