<script lang="ts">
  import { Button, Modal, Switch, TextField, Textarea } from '$lib/components/ds';
  import type { Note } from '../../lib/notes';
  import { descriptionForSave, htmlToText, type DiaryEditData } from '../../lib/diary';

  interface Props {
    /** The entry being edited; the modal is open while this is set. */
    note: Note | null;
    /** `description` is already HTML (descriptionForSave). Resolve true to close. */
    onsave: (id: string, data: DiaryEditData) => Promise<boolean>;
    ondelete: (id: string) => Promise<boolean>;
    onclose: () => void;
  }
  let { note, onsave, ondelete, onclose }: Props = $props();

  let name = $state('');
  let text = $state('');
  let isPublic = $state(true);
  let saving = $state(false);
  let confirmDelete = $state(false);
  let confirmTimer: ReturnType<typeof setTimeout> | undefined;

  // Rich formatting written in Notes (anything beyond <p>/<br>) is flattened on save.
  const hasRichText = $derived(!!note?.description && /<(?!\/?(p|br)\b)[a-z]/i.test(note.description));

  $effect(() => {
    if (!note) return;
    name = note.name ?? '';
    text = htmlToText(note.description);
    isPublic = note.is_public;
    confirmDelete = false;
  });

  async function save() {
    if (!note || saving || !name.trim()) return;
    saving = true;
    try {
      await onsave(note.id, { name: name.trim(), description: descriptionForSave(text), isPublic });
    } finally {
      saving = false;
    }
  }

  async function remove() {
    if (!note || saving) return;
    if (!confirmDelete) {
      confirmDelete = true;
      clearTimeout(confirmTimer);
      confirmTimer = setTimeout(() => (confirmDelete = false), 3000);
      return;
    }
    clearTimeout(confirmTimer);
    saving = true;
    try {
      await ondelete(note.id);
    } finally {
      saving = false;
      confirmDelete = false;
    }
  }
</script>

<Modal open={note !== null} title="Edit entry" {onclose}>
  <form
    id="diary-edit-form"
    class="flex flex-col gap-4"
    onsubmit={e => {
      e.preventDefault();
      save();
    }}
  >
    <TextField label="Title" bind:value={name} maxlength={255} />
    <Textarea
      label="Description"
      bind:value={text}
      rows={6}
      hint={hasRichText ? 'Formatting from Notes will be simplified' : undefined}
    />
    <Switch label="Public" bind:checked={isPublic} />
  </form>
  {#snippet actions()}
    <Button variant="ghost" class="mr-auto text-negative" onclick={remove} disabled={saving}>
      {confirmDelete ? 'Tap again to delete' : 'Delete'}
    </Button>
    <Button variant="secondary" onclick={onclose} disabled={saving}>Cancel</Button>
    <Button type="submit" form="diary-edit-form" disabled={saving || !name.trim()}>Save</Button>
  {/snippet}
</Modal>
