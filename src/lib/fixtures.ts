/**
 * Mock data fixtures for boneyard skeleton capture.
 *
 * Boneyard generates skeletons by snapshotting the real rendered DOM in a
 * headless browser. Pages that require auth (Notes/Finance/Dashboard) won't
 * render their data-driven content without a Bearer token, so each
 * `<Skeleton>` wraps a `fixture`-rendered version of its content. These
 * fixtures only render during the boneyard capture pass — never at runtime —
 * but their code is bundled, so they are kept small and representative.
 */
import type { Note, NoteFile } from './notes';
import type { Transaction, FinanceSummary } from './finance';
import type { Tag } from './tags';

// --- Tags ---
export const fixtureTags: Tag[] = [
  {
    id: 'tag-1',
    tag: 'rust',
    name: 'Rust',
    color: '#f59e0b',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'tag-2',
    tag: 'web',
    name: 'Web Dev',
    color: '#8b5cf6',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'tag-3',
    tag: 'personal',
    name: 'Personal',
    color: null,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'tag-4',
    tag: 'linux',
    name: 'Linux',
    color: '#22c55e',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  }
];

// --- Notes (3 representative cards for list skeleton) ---
export const fixtureNotes: Note[] = [
  {
    id: 'note-1',
    name: 'Rust ownership and borrowing cheatsheet',
    link: 'https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html',
    link_summarize: null,
    summarize_status: 'idle',
    description: '<p>A quick reference for ownership rules, borrows, and lifetimes in Rust.</p>',
    is_public: false,
    is_favorite: false,
    is_pinned: true,
    created_at: '2026-08-20T10:00:00Z',
    updated_at: '2026-08-20T10:00:00Z',
    deleted_at: null,
    tags: [fixtureTags[0], fixtureTags[1]],
    files: []
  },
  {
    id: 'note-2',
    name: 'Svelte 5 runes migration notes',
    link: null,
    link_summarize: null,
    summarize_status: null,
    description:
      '<p>Key differences between Svelte 4 and 5: $state, $derived, $props, $effect.</p>',
    is_public: true,
    is_favorite: true,
    is_pinned: false,
    created_at: '2026-08-22T14:30:00Z',
    updated_at: '2026-08-22T14:30:00Z',
    deleted_at: null,
    tags: [fixtureTags[1]],
    files: []
  },
  {
    id: 'note-3',
    name: 'Homelab server setup log',
    link: null,
    link_summarize: null,
    summarize_status: null,
    description:
      '<p>Notes on setting up Tailscale, Docker, and reverse proxy on the home server.</p>',
    is_public: false,
    is_favorite: false,
    is_pinned: false,
    created_at: '2026-08-25T09:15:00Z',
    updated_at: '2026-08-25T09:15:00Z',
    deleted_at: null,
    tags: [fixtureTags[2], fixtureTags[3]],
    files: []
  }
];

// --- Single note for detail-view skeleton ---
export const fixtureSingleNote: Note = {
  ...fixtureNotes[1],
  is_pinned: false,
  files: [
    {
      id: 'file-1',
      note_id: 'note-2',
      data: '',
      url: 'https://example.com/file.pdf',
      presigned_url: 'https://example.com/file.pdf',
      filename: 'file.pdf',
      original_name: 'svelte-cheatsheet.pdf',
      mime_type: 'application/pdf',
      size: 245000,
      metadata: {},
      created_at: '2026-08-22T14:30:00Z',
      updated_at: '2026-08-22T14:30:00Z',
      deleted_at: null,
      related_id: 'note-2',
      related_type: 'note',
      upload_source: 'manual'
    } satisfies NoteFile
  ]
};

// --- Transactions (5 rows for finance list skeleton) ---
export const fixtureTransactions: Transaction[] = [
  {
    id: 'tx-1',
    type: 'income',
    amount: 5000000,
    description: 'Salary',
    transaction_date: '2026-08-25T00:00:00Z',
    created_at: '2026-08-25T00:00:00Z',
    updated_at: '2026-08-25T00:00:00Z',
    tags: [fixtureTags[2]]
  },
  {
    id: 'tx-2',
    type: 'expense',
    amount: 45000,
    description: 'Lunch at padang',
    transaction_date: '2026-08-25T12:00:00Z',
    created_at: '2026-08-25T12:00:00Z',
    updated_at: '2026-08-25T12:00:00Z',
    tags: []
  },
  {
    id: 'tx-3',
    type: 'expense',
    amount: 150000,
    description: 'Groceries',
    transaction_date: '2026-08-24T18:00:00Z',
    created_at: '2026-08-24T18:00:00Z',
    updated_at: '2026-08-24T18:00:00Z',
    tags: [fixtureTags[2]]
  },
  {
    id: 'tx-4',
    type: 'income',
    amount: 200000,
    description: 'Freelance project',
    transaction_date: '2026-08-23T10:00:00Z',
    created_at: '2026-08-23T10:00:00Z',
    updated_at: '2026-08-23T10:00:00Z',
    tags: [fixtureTags[1]]
  },
  {
    id: 'tx-5',
    type: 'expense',
    amount: 35000,
    description: 'Coffee',
    transaction_date: '2026-08-23T08:00:00Z',
    created_at: '2026-08-23T08:00:00Z',
    updated_at: '2026-08-23T08:00:00Z',
    tags: []
  }
];

// --- Finance summary (3 stat cards) ---
export const fixtureFinanceSummary: FinanceSummary = {
  total_income: 5200000,
  total_expense: 230000,
  balance: 4970000
};

// --- Files (ShortlinkData; type is inline in Files.svelte) ---
export interface FixtureShortlinkFile {
  id: string;
  original_name: string;
  presigned_url: string;
}
export interface FixtureShortlinkData {
  shortlink_code: string;
  expires_at: string;
  files: FixtureShortlinkFile[];
}
export const fixtureShortlinkData: FixtureShortlinkData = {
  shortlink_code: 'abc12345',
  expires_at: '2026-08-28T20:00:00Z',
  files: [
    { id: 'f1', original_name: 'project-report.pdf', presigned_url: 'https://example.com/f1' },
    {
      id: 'f2',
      original_name: 'screenshot-2026-08-27.png',
      presigned_url: 'https://example.com/f2'
    },
    { id: 'f3', original_name: 'source-code.zip', presigned_url: 'https://example.com/f3' }
  ]
};

// --- Tags for TagModal skeleton (pill-shaped 2-col grid) ---
export const fixtureTagsForModal: Tag[] = [
  ...fixtureTags,
  {
    id: 'tag-5',
    tag: 'docker',
    name: 'Docker',
    color: '#0db7ed',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'tag-6',
    tag: 'postgres',
    name: 'PostgreSQL',
    color: '#336791',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  }
];
