# Diary — design

Date: 2026-10-26 · Status: draft for review

## Purpose

Writing a note today means the full note form (title, link, rich-text description, tags, files, toggles). Diary makes the common case — jotting a quick thought — as light as posting a social-media status: one input at the top ("What's going on?"), a compact feed of past entries below. Mobile first.

Diary is a **view over the existing Notes API**, not a new data type. An entry is a regular note.

## Decisions (agreed in chat)

| Topic | Decision |
|---|---|
| Access | Logged-in only (same rule as Dashboard). |
| Placement | A third view on Home, next to Dashboard: segmented **Profile · Dashboard · Diary**. No new route. |
| Which notes | Filtered by tags the user picks; the tag IDs are stored in `localStorage` (`diaryTagIds`), not hardcoded. **Empty filter = all notes** (the feed then also shows non-diary notes; that is intended flexibility). |
| Create | Only a title (`name`). Tags = the current filter (none if the filter is empty). `isPublic: true` by default. |
| Visibility | Default **public** — accepted knowing public notes are readable by anyone on `/notes`. Switch to private in the edit modal. |
| Description | Only editable in the edit modal, via a plain textarea. Stored as HTML paragraphs so it renders correctly in Notes. |
| Edit modal | Title, description, Public switch, plus **Delete**. |
| Feed | Newest first, infinite scroll. |

Known, accepted consequences: diary entries are ordinary notes, so they also appear (and are fully editable) in Notes; the tag filter is per device (localStorage).

## UI

- **Home switcher** (logged in): DS `Segmented` with Profile / Dashboard / Diary replaces the single Dashboard button. The choice persists in `localStorage.homeView` (`'profile' | 'dashboard' | 'diary'`). The old boolean `homeShowDashboard` is migrated once (`true` → `'dashboard'`). On logout the view falls back to Profile.
- **Diary view** — single column, full width on mobile, `max-w-[640px]` centered on desktop, flat DS surfaces.
  1. **Tag filter row**: active tags as small chips + a "Tags" control that opens a DS `MultiSelect` of all tags. Empty shows "All notes".
  2. **Composer** (`bg-card`, sticky under the top on scroll): one-line input "What's going on?" + send `IconButton`. Enter submits; trims; ignores empty; disabled while sending.
  3. **Feed**: compact `bg-card` items, `gap-2`. Each item: title (fallback "Untitled"), description excerpt (plain text, 2 lines), relative time ("2h ago", absolute date in `title`), public/private icon, tag chips (small), edit `IconButton`. Tapping the item also opens edit.
  4. **Sentinel** below the feed: when visible, load the next page; small `Skeleton` rows while loading; "That's everything" when done.
- **Edit modal** (DS `Modal`): `TextField` title, `Textarea` description (rows ~6), `Switch` Public, actions: Delete (ghost, asks a second tap "Tap again to delete"), Cancel, Save.

## Architecture

```
src/lib/diary.ts                       pure helpers (tested)
src/components/diary/DiaryView.svelte  state + data flow (filter, feed, paging)
src/components/diary/DiaryComposer.svelte
src/components/diary/DiaryItem.svelte
src/components/diary/DiaryEditModal.svelte
src/pages/Home.svelte                  view switcher (Profile/Dashboard/Diary)
```

`src/lib/diary.ts` (no DOM, no aliases — runnable under `node --test`):
- `textToHtml(text)` — split on blank lines into `<p>`, single newlines → `<br>`, HTML-escaped; empty → `''`.
- `htmlToText(html)` — inverse for editing: `<p>` → blank-line separated, `<br>` → newline, strip other tags, decode entities. Must round-trip `textToHtml` output; for rich HTML written in Notes it yields readable plain text.
- `excerpt(html, max)` — plain text, collapsed whitespace, for the feed.
- `readTagIds(storage)` / `writeTagIds(storage, ids)` — JSON array of strings; invalid/missing → `[]`.
- `relativeTime(iso, now)` — "just now", "5m ago", "3h ago", "2d ago", else a short date.
- `readHomeView(storage)` — `homeView`, else migrate `homeShowDashboard`, else `'profile'`.

Data flow (existing functions in `src/lib/notes.ts`, unchanged):
- Load: `getNotes(page, { includeTags: tagIds.length ? tagIds : undefined, sortBy: 'created_at', sortOrder: 'desc' })`; append `notes`, stop when `page >= pagination.totalPages`. Changing the filter resets to page 1.
- Create: `createNote({ name, tags: tagIds, isPublic: true })` → prepend the returned note.
- Save: `updateNote(id, { name, description: textToHtml(text), isPublic })` → replace in place.
- Delete: `deleteNote(id)` (soft delete — the note goes to Notes' trash and can be restored there) → remove from the list.
- Tags for the picker: existing `tags` store (`src/lib/stores/tags.ts`, values are tag UUIDs). Stored IDs no longer present in the tag list are dropped silently.

Description editing note: if a note's description was written in Notes with rich formatting, saving it from Diary converts it to plain paragraphs. The modal shows a one-line hint in that case ("Formatting from Notes will be simplified").

## Errors and states

- Initial load: `Skeleton` items. Load error: inline message + Retry button.
- Send/save/delete failure: `toast.error`, input/modal content kept.
- Empty feed: `EmptyState` ("No entries yet — write the first one above").
- Logged out (token cleared): Home already falls back to Profile.

## Verification

- `node --test src/lib/diary.test.ts` (Node 24 runs TypeScript directly; no new dependency) covering every helper, including the `textToHtml` ↔ `htmlToText` round trip and the `homeShowDashboard` migration.
- `npm run check` (no new errors over the 78 baseline), `npm run lint`, `npm run build`.
- Browser check on mobile (390px) and desktop, both themes: composer, feed, infinite scroll, edit modal. Logged-in data cannot be produced headlessly, so the view renders a fixture under `isBoneyardCapture` (same pattern as Dashboard), which also lets boneyard capture its skeleton.

## Out of scope

Images/files, links, rich text, favorites/pins, comments/reactions, a `/diary` route, syncing the tag filter across devices, backend changes.
