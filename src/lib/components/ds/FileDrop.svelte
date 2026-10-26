<script lang="ts">
  import IconButton from './IconButton.svelte';
  import Icon from './Icon.svelte';
  import type { UploadFile } from './types';
  interface Props { hint?: string; multiple?: boolean; accept?: string; files?: UploadFile[]; onfiles?: (files: FileList) => void }
  let { hint = 'Max 50 MB · link expires in 24h', multiple = false, accept, files = [], onfiles }: Props = $props();
  let over = $state(false);
  let input: HTMLInputElement | undefined = $state();
</script>

<div>
  <div class="fz-drop" role="button" tabindex="0" data-over={over}
    onclick={() => input?.click()}
    onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input?.click(); } }}
    ondragover={(e) => { e.preventDefault(); over = true; }}
    ondragleave={() => (over = false)}
    ondrop={(e) => { e.preventDefault(); over = false; if (e.dataTransfer?.files.length) onfiles?.(e.dataTransfer.files); }}>
    <span class="fz-drop-icon"><Icon name="upload" /></span>
    <p class="fz-drop-title">{#if over}Release to upload{:else}Drop files or <u>browse</u>{/if}</p>
    <p class="fz-drop-hint">{hint}</p>
    <input bind:this={input} type="file" {multiple} {accept} hidden onchange={(e) => { const f = e.currentTarget.files; if (f?.length) onfiles?.(f); }} />
  </div>
  {#if files.length}
    <div class="fz-files">
      {#each files as f (f.name)}
        <div class="fz-file">
          <span class="fz-file-ext">{f.name.split('.').pop()?.slice(0, 4)}</span>
          <div class="min-w-0 flex-1">
            <p class="fz-file-name">{f.name}</p>
            <p class="fz-file-meta">{f.meta}</p>
            {#if f.progress != null && f.progress < 100}<div class="fz-file-bar"><span style="width:{f.progress}%"></span></div>{/if}
          </div>
          {#if f.onremove}<IconButton label={`Remove ${f.name}`} onclick={f.onremove}><Icon name="x" /></IconButton>{/if}
        </div>
      {/each}
    </div>
  {/if}
</div>
