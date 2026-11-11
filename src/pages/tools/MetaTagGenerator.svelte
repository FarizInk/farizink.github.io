<script lang="ts">
  import { FileText, Download, RotateCcw, Sparkles } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import {
    Button,
    CopyChip,
    EmptyState,
    Icon,
    Segmented,
    Select,
    Switch,
    TextField,
    Textarea
  } from '$lib/components/ds';
  import {
    EMPTY_INPUT,
    EXAMPLE_INPUT,
    TITLE_MAX,
    DESCRIPTION_MAX,
    buildMetaTags,
    buildHtmlDocument,
    validate,
    resolve,
    truncate,
    breadcrumb,
    hostOf,
    isAbsoluteUrl,
    parseSaved,
    currentOffsetLabel,
    type MetaInput,
    type OgType,
    type TwitterCard
  } from '$lib/tools/metatags';

  const STORAGE_KEY = 'tool.metaTagGenerator';

  function load(): MetaInput {
    try {
      return parseSaved(localStorage.getItem(STORAGE_KEY));
    } catch {
      return { ...EMPTY_INPUT };
    }
  }

  let form = $state<MetaInput>(load());

  $effect(() => {
    const json = JSON.stringify(form);
    try {
      localStorage.setItem(STORAGE_KEY, json);
    } catch {
      /* storage unavailable: keep working without persistence */
    }
  });

  const output = $derived(buildMetaTags(form));
  const warnings = $derived(validate(form));
  const r = $derived(resolve(form));
  const warn = (field: keyof MetaInput) => warnings.find((w) => w.field === field)?.message;

  const count = (text: string, max: number) => {
    const n = text.trim().length;
    return n > max ? `${n} / ${max} · likely truncated in search results` : `${n} / ${max}`;
  };

  // Previews
  const pageUrl = $derived(r.url || r.ogUrl);
  const crumb = $derived(breadcrumb(pageUrl) || 'example.com');
  const siteLabel = $derived(form.siteName.trim() || hostOf(pageUrl) || 'Your site');
  const socialHost = $derived(hostOf(r.ogUrl) || 'example.com');
  const previewImage = $derived(isAbsoluteUrl(r.image) ? r.image : '');
  let failedImage = $state('');
  const largeCard = $derived(form.twitterCard === 'summary_large_image');

  const ogTypes = [
    { value: 'website', label: 'Website' },
    { value: 'article', label: 'Article' },
    { value: 'profile', label: 'Profile' }
  ];
  const cardTypes = [
    { value: 'summary_large_image', label: 'Large image' },
    { value: 'summary', label: 'Summary' }
  ];
  const robotsOptions = [
    { value: '', label: 'Default (index, follow)' },
    { value: 'noindex', label: 'noindex' },
    { value: 'nofollow', label: 'nofollow' },
    { value: 'noindex, nofollow', label: 'noindex, nofollow' }
  ];

  function loadExample() {
    form = { ...EXAMPLE_INPUT };
  }

  function reset() {
    form = { ...EMPTY_INPUT };
  }

  function download() {
    const blob = new Blob([buildHtmlDocument(form)], { type: 'text/html;charset=utf-8' });
    const href = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = href;
    a.download = 'meta-tags.html';
    a.click();
    URL.revokeObjectURL(href);
  }
</script>

{#snippet section(id: string, title: string, text: string)}
  <div class="flex flex-col gap-1">
    <h2 {id} class="text-title text-ink">{title}</h2>
    <p class="text-body-sm text-ink-muted">{text}</p>
  </div>
{/snippet}

<ToolLayout
  title="Meta Tag Generator"
  description="Generate SEO-friendly meta tags for better search engine optimization."
  icon={FileText}
  color="warning"
>
  <div class="flex flex-wrap gap-3">
    <Button variant="secondary" onclick={loadExample}>
      {#snippet icon()}<Sparkles class="size-4" />{/snippet}
      Load example
    </Button>
    <Button variant="ghost" onclick={reset}>
      {#snippet icon()}<RotateCcw class="size-4" />{/snippet}
      Reset
    </Button>
  </div>

  <div class="grid items-start gap-6 lg:grid-cols-2">
    <!-- Form -->
    <div class="flex min-w-0 flex-col gap-6">
      <section aria-labelledby="mt-basics" class="flex flex-col gap-5 rounded-lg bg-card p-6">
        {@render section('mt-basics', 'Basics', 'What search engines show for this page.')}
        <TextField label="Page title" bind:value={form.title} placeholder="My awesome page" hint={count(form.title, TITLE_MAX)} />
        <Textarea
          label="Description"
          bind:value={form.description}
          rows={3}
          placeholder="A short summary of the page"
          hint={count(form.description, DESCRIPTION_MAX)}
        />
        <TextField
          label="Canonical URL"
          type="url"
          mono
          bind:value={form.url}
          placeholder="https://example.com/page"
          hint={warn('url') ?? 'The preferred address of this page.'}
          optional
        />
        <TextField label="Author" bind:value={form.author} placeholder="Jane Doe" optional />
      </section>

      <section aria-labelledby="mt-social" class="flex flex-col gap-5 rounded-lg bg-card p-6">
        {@render section('mt-social', 'Social', 'Open Graph and X cards. Empty overrides fall back to Basics.')}
        <div class="flex flex-col gap-2">
          <span class="text-label text-ink-muted" aria-hidden="true">Content type</span>
          <Segmented
            label="Content type (og:type)"
            options={ogTypes}
            bind:value={() => form.ogType, (v) => (form.ogType = (v ?? 'website') as OgType)}
          />
        </div>
        <TextField
          label="Image URL"
          type="url"
          mono
          bind:value={form.image}
          placeholder="https://example.com/og.png"
          hint={warn('image') ?? 'Absolute URL; 1200 × 630 works everywhere.'}
        />
        <TextField label="Image alt text" bind:value={form.imageAlt} placeholder="Describe the image" optional />
        <div class="grid grid-cols-2 gap-4">
          <TextField label="Image width" inputmode="numeric" bind:value={form.imageWidth} placeholder="1200" optional />
          <TextField label="Image height" inputmode="numeric" bind:value={form.imageHeight} placeholder="630" optional />
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <TextField label="Site name" bind:value={form.siteName} placeholder="Example" optional />
          <TextField label="Locale" bind:value={form.locale} placeholder="en_US" optional />
        </div>
        <TextField label="Social title" bind:value={form.ogTitle} placeholder="Uses page title" optional />
        <Textarea label="Social description" bind:value={form.ogDescription} rows={2} placeholder="Uses description" optional />
        <TextField
          label="Social URL"
          type="url"
          mono
          bind:value={form.ogUrl}
          placeholder="Uses canonical URL"
          hint={warn('ogUrl')}
          optional
        />

        <h3 class="text-body font-medium text-ink">X (Twitter)</h3>
        <div class="flex flex-col gap-2">
          <span class="text-label text-ink-muted" aria-hidden="true">Card</span>
          <Segmented
            label="X card type"
            options={cardTypes}
            bind:value={() => form.twitterCard, (v) => (form.twitterCard = (v ?? 'summary_large_image') as TwitterCard)}
          />
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <TextField label="Site handle" bind:value={form.twitterSite} placeholder="@example" optional />
          <TextField label="Creator handle" bind:value={form.twitterCreator} placeholder="@author" optional />
        </div>
        <TextField label="X title" bind:value={form.twitterTitle} placeholder="Uses social title" optional />
        <Textarea label="X description" bind:value={form.twitterDescription} rows={2} placeholder="Uses social description" optional />
        <TextField
          label="X image URL"
          type="url"
          mono
          bind:value={form.twitterImage}
          placeholder="Uses social image"
          hint={warn('twitterImage')}
          optional
        />
      </section>

      {#if form.ogType === 'article'}
        <section aria-labelledby="mt-article" class="flex flex-col gap-5 rounded-lg bg-card p-6">
          {@render section('mt-article', 'Article', `Times are saved with your offset (UTC${currentOffsetLabel()}).`)}
          <div class="grid gap-4 sm:grid-cols-2">
            <TextField label="Published" type="datetime-local" bind:value={form.publishedTime} optional />
            <TextField label="Modified" type="datetime-local" bind:value={form.modifiedTime} optional />
          </div>
          <div class="grid gap-4 sm:grid-cols-2">
            <TextField label="Article author" bind:value={form.articleAuthor} placeholder="Jane Doe or profile URL" optional />
            <TextField label="Section" bind:value={form.articleSection} placeholder="Technology" optional />
          </div>
          <TextField
            label="Tags"
            bind:value={form.articleTags}
            placeholder="svelte, seo, web"
            hint="Comma-separated; each becomes its own article:tag."
            optional
          />
        </section>
      {/if}

      <section aria-labelledby="mt-advanced" class="flex flex-col gap-5 rounded-lg bg-card p-6">
        {@render section('mt-advanced', 'Advanced', 'Crawling, browser chrome and structured data.')}
        <Select label="Robots" options={robotsOptions} bind:value={form.robots} />
        <div class="grid gap-4 sm:grid-cols-2">
          <TextField label="Theme color" mono bind:value={form.themeColor} placeholder="#9b6bff" optional />
          <TextField label="Document language" bind:value={form.lang} placeholder="en" hint="Used for the downloaded file." optional />
        </div>
        <Switch label="Include viewport tag" description="width=device-width, initial-scale=1" bind:checked={form.viewport} />
        <Switch
          label="Add JSON-LD structured data"
          description={form.ogType === 'article' ? 'schema.org Article' : 'schema.org WebSite'}
          bind:checked={form.jsonLd}
        />
      </section>
    </div>

    <!-- Previews + output -->
    <div class="flex min-w-0 flex-col gap-6 lg:sticky lg:top-6">
      <section aria-labelledby="mt-preview" class="flex flex-col gap-5 rounded-lg bg-card p-6">
        {@render section('mt-preview', 'Preview', 'Approximate; every site renders a little differently.')}

        <div class="flex flex-col gap-2">
          <h3 class="text-label text-ink-muted">Search result</h3>
          <div class="flex flex-col gap-1.5 rounded-md bg-sunken p-4">
            <div class="flex min-w-0 items-center gap-3">
              <span
                class="grid size-7 shrink-0 place-items-center rounded-pill bg-control text-body-sm font-medium text-ink"
                aria-hidden="true">{siteLabel.charAt(0).toUpperCase()}</span
              >
              <div class="flex min-w-0 flex-col">
                <span class="truncate text-body-sm text-ink">{siteLabel}</span>
                <span class="truncate text-body-sm text-ink-muted">{crumb}</span>
              </div>
            </div>
            <p class="text-body-lg break-words text-accent-text">{truncate(r.title || 'Page title', TITLE_MAX)}</p>
            <p class="text-body-sm break-words text-ink-muted">
              {r.description ? truncate(r.description, DESCRIPTION_MAX) : 'Add a description to control this snippet.'}
            </p>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <h3 class="text-label text-ink-muted">Social card · {largeCard ? 'large image' : 'summary'}</h3>
          <div class="flex overflow-hidden rounded-md bg-sunken {largeCard ? 'flex-col' : 'flex-row'}">
            <div
              class="grid shrink-0 place-items-center overflow-hidden bg-control {largeCard ? 'aspect-[1.91/1] w-full' : 'size-28'}"
            >
              {#if previewImage && failedImage !== previewImage}
                <img
                  src={previewImage}
                  alt={form.imageAlt}
                  class="size-full object-cover"
                  onerror={() => (failedImage = previewImage)}
                />
              {:else}
                <span class="px-2 text-center text-body-sm text-ink-muted">
                  {previewImage ? 'Image failed to load' : r.image ? 'Relative URL' : 'No image'}
                </span>
              {/if}
            </div>
            <div class="flex min-w-0 flex-col gap-1 p-4">
              <span class="text-label truncate text-ink-muted">{socialHost}</span>
              <p class="truncate font-medium text-ink">{r.twitterTitle || 'Page title'}</p>
              <p class="line-clamp-2 text-body-sm text-ink-muted">{r.twitterDescription || 'Description'}</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="mt-output" class="flex flex-col gap-5 rounded-lg bg-card p-6">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <h2 id="mt-output" class="text-title text-ink">Tags</h2>
          {#if output.html}
            <div class="flex flex-wrap gap-3">
              <CopyChip value={output.html}>Copy tags</CopyChip>
              <Button variant="secondary" onclick={download}>
                {#snippet icon()}<Download class="size-4" />{/snippet}
                Download .html
              </Button>
            </div>
          {/if}
        </div>

        {#if output.html}
          {#if warnings.length}
            <ul class="flex flex-col gap-2" aria-label="Warnings">
              {#each warnings as w (w.field + w.message)}
                <li class="flex items-start gap-2 rounded-md bg-sunken px-4 py-3 text-body-sm text-ink">
                  <Icon name="alert" class="mt-0.5 size-4 shrink-0 text-accent-text" />
                  {w.message}
                </li>
              {/each}
            </ul>
          {/if}
          <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
          <pre
            class="text-code m-0 max-h-[480px] overflow-auto rounded-md bg-sunken p-4 font-mono text-ink"
            tabindex="0"
            aria-label="Generated meta tags ({output.tags.length} lines)">{output.html}</pre>
        {:else}
          <EmptyState title="No tags yet" text="Fill in a title or description, or load the example to see the generated tags.">
            {#snippet actions()}
              <Button variant="secondary" onclick={loadExample}>Load example</Button>
            {/snippet}
          </EmptyState>
        {/if}
      </section>
    </div>
  </div>
</ToolLayout>
