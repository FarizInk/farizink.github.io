<!--
  Create / edit a shortlink in the DS Modal. Create ends on a "ready" step with
  the short URL to copy; edit closes and hands the updated link back.
-->
<script lang="ts">
  import { untrack } from 'svelte';
  import { TriangleAlert, Loader2, Plus, Save, ChartColumn } from '@lucide/svelte';
  import { Button, CopyChip, Modal, TextField } from '$lib/components/ds';
  import {
    createLink,
    updateLink,
    describeError,
    validateForm,
    createPayload,
    updatePayload,
    formValuesFrom,
    normalizeSlug,
    toLocalInput,
    type Link,
    type LinkFormValues
  } from '../../lib/links';

  interface Props {
    open: boolean;
    /** Present = edit mode. */
    link?: Link | null;
    onclose: () => void;
    oncreated?: (link: Link) => void;
    onsaved?: (link: Link) => void;
  }
  let { open = $bindable(), link = null, onclose, oncreated, onsaved }: Props = $props();

  // The form edits a snapshot of the link it was opened with.
  const initial = untrack(() => link);
  const mode: 'create' | 'edit' = initial ? 'edit' : 'create';
  const empty: LinkFormValues = { destination_url: '', slug: '', title: '', expires_at: '' };

  let values = $state<LinkFormValues>(initial ? formValuesFrom(initial) : { ...empty });
  let errors = $state<Record<string, string>>({});
  let formError = $state('');
  let submitting = $state(false);
  let created = $state<Link | null>(null);

  const formId = `link-form-${Math.random().toString(36).slice(2, 8)}`;
  const minExpiry = toLocalInput(new Date(Date.now() + 60_000).toISOString());
  const slugChanged = $derived(mode === 'edit' && !!link && normalizeSlug(values.slug) !== link.slug);
  // Everything before the slug in the API's own short URL ("https://fariz.dev/s/").
  const shortPrefix = $derived(link && link.short_url.endsWith(link.slug) ? link.short_url.slice(0, -link.slug.length) : '');

  const KNOWN = ['destination_url', 'slug', 'title', 'expires_at'];

  async function submit(e?: Event) {
    e?.preventDefault();
    if (submitting) return;
    formError = '';
    errors = validateForm(values, mode, link ?? undefined);
    if (Object.keys(errors).length) return;

    submitting = true;
    try {
      if (mode === 'create') {
        created = await createLink(createPayload(values));
        oncreated?.(created);
      } else if (link) {
        const payload = updatePayload(values, link);
        const saved = Object.keys(payload).length ? await updateLink(link.id, payload) : link;
        onsaved?.(saved);
        close();
      }
    } catch (err) {
      const info = describeError(err);
      errors = Object.fromEntries(Object.entries(info.fields).filter(([k]) => KNOWN.includes(k)));
      const other = Object.entries(info.fields).filter(([k]) => !KNOWN.includes(k));
      formError = other.length ? other.map(([, m]) => m).join(' ') : Object.keys(errors).length ? '' : info.message;
    } finally {
      submitting = false;
    }
  }

  function close() {
    open = false;
    onclose();
  }

  function createAnother() {
    created = null;
    values = { ...empty };
    errors = {};
    formError = '';
  }
</script>

<Modal
  bind:open
  onclose={onclose}
  title={created ? 'Link ready' : mode === 'create' ? 'New short link' : 'Edit link'}
  description={created
    ? 'Copy it and share it anywhere.'
    : mode === 'create'
      ? 'Paste where it should go. Everything else is optional.'
      : undefined}
>
  {#if created}
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-1 rounded-md bg-control p-4">
        <span class="text-label text-ink-muted">Short link</span>
        <span class="font-mono text-body-sm break-all text-ink">{created.short_url}</span>
        <span class="text-body-sm break-all text-ink-muted">→ {created.destination_url}</span>
      </div>
      <div class="flex flex-wrap gap-2">
        <CopyChip value={created.short_url}>Copy link</CopyChip>
        <Button variant="secondary" href={`/links/${created.id}`}>
          <ChartColumn class="size-4" /> Stats
        </Button>
      </div>
    </div>
  {:else}
    <form id={formId} class="flex flex-col gap-4" onsubmit={submit} novalidate>
      {#if formError}
        <p class="status-error flex items-start gap-2 rounded-md p-3 text-body-sm" role="alert">
          <TriangleAlert class="mt-0.5 size-4 flex-none" />{formError}
        </p>
      {/if}

      <TextField
        label="Destination URL"
        type="url"
        inputmode="url"
        autocomplete="off"
        spellcheck={false}
        mono
        placeholder="https://…"
        bind:value={values.destination_url}
        error={errors.destination_url}
        oninput={() => delete errors.destination_url}
      />

      <div class="flex flex-col gap-2">
        <TextField
          label="Slug"
          optional={mode === 'create'}
          prefix="/s/"
          mono
          autocomplete="off"
          autocapitalize="none"
          spellcheck={false}
          maxlength={64}
          placeholder={mode === 'create' ? 'random' : ''}
          hint={mode === 'create' ? 'a–z, 0–9 and hyphens. Leave empty for a random one.' : 'a–z, 0–9 and hyphens.'}
          bind:value={values.slug}
          error={errors.slug}
          oninput={() => delete errors.slug}
        />
        {#if slugChanged && link}
          <p class="status-warning flex items-start gap-2 rounded-md p-3 text-body-sm" role="status">
            <TriangleAlert class="mt-0.5 size-4 flex-none" />
            <span>
              Changing the slug retires the old address: <span class="font-mono break-all">{link.short_url}</span> will stop
              working for everyone who already has it.
              {#if shortPrefix && normalizeSlug(values.slug)}
                New: <span class="font-mono break-all">{shortPrefix}{normalizeSlug(values.slug)}</span>
              {/if}
            </span>
          </p>
        {/if}
      </div>

      <TextField
        label="Title"
        optional
        maxlength={255}
        placeholder="Shown in your list instead of the host"
        bind:value={values.title}
        error={errors.title}
        oninput={() => delete errors.title}
      />

      <div class="flex flex-col gap-1">
        <TextField
          label="Expires"
          optional
          type="datetime-local"
          min={minExpiry}
          hint="Your local time. After this the link stops redirecting."
          bind:value={values.expires_at}
          error={errors.expires_at}
          oninput={() => delete errors.expires_at}
        />
        {#if values.expires_at}
          <button
            type="button"
            class="self-start rounded-pill px-1 text-body-sm text-accent-text underline-offset-2 hover:underline"
            onclick={() => {
              values.expires_at = '';
              delete errors.expires_at;
            }}
          >
            Remove expiry
          </button>
        {/if}
      </div>
    </form>
  {/if}

  {#snippet actions()}
    {#if created}
      <Button variant="secondary" onclick={createAnother}><Plus class="size-4" /> Another</Button>
      <Button onclick={close}>Done</Button>
    {:else}
      <Button variant="secondary" onclick={close}>Cancel</Button>
      <Button type="submit" form={formId} disabled={submitting}>
        {#if submitting}
          <Loader2 class="size-4 animate-spin" />
        {:else if mode === 'create'}
          <Plus class="size-4" />
        {:else}
          <Save class="size-4" />
        {/if}
        {submitting ? 'Saving…' : mode === 'create' ? 'Create link' : 'Save changes'}
      </Button>
    {/if}
  {/snippet}
</Modal>
