<script lang="ts">
  // Dark (default) / Light / Auto. State and persistence live in lib/theme.svelte.ts.
  import Segmented from './Segmented.svelte';
  import Icon from './Icon.svelte';
  import { theme, setThemeMode, type ThemeMode } from '../../theme.svelte';
</script>

{#snippet moon()}<Icon name="moon" />{/snippet}
{#snippet sun()}<Icon name="sun" />{/snippet}
{#snippet auto()}<Icon name="monitor" />{/snippet}

<Segmented
  label="Theme"
  value={theme.mode}
  onchange={(v) => setThemeMode(v as ThemeMode)}
  options={[{ value: 'dark', label: 'Dark', icon: moon }, { value: 'light', label: 'Light', icon: sun }, { value: 'system', label: 'Auto', icon: auto }]}
/>
