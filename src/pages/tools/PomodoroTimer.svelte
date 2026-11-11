<script lang="ts">
  import { onDestroy } from 'svelte';
  import { Bell, Pause, Play, RotateCcw, Settings2, SkipForward, Timer } from '@lucide/svelte';
  import ToolLayout from '../../components/ToolLayout.svelte';
  import { BentoCard, Button, Segmented, Slider, Switch } from '$lib/components/ds';
  import {
    DEFAULT_SETTINGS, LIMITS, PHASE_LABEL, applySettings, clampSettings, dayKey, durationMs, formatMMSS, initialState,
    nextPhase, parseDailyCount, parseSettings, pause, progress, remaining, reset, setPhase, skip, start, tick,
    type Phase, type Settings, type TimerState
  } from '$lib/tools/pomodoro';

  const SETTINGS_KEY = 'pomodoro.settings';
  const DAILY_KEY = 'pomodoro.daily';

  function load(key: string): string | null {
    try { return localStorage.getItem(key); } catch { return null; }
  }
  function save(key: string, value: string) {
    try { localStorage.setItem(key, value); } catch { /* storage blocked: keep in memory only */ }
  }

  type Perm = 'default' | 'denied' | 'granted' | 'unsupported';
  const readPerm = (): Perm => (typeof Notification === 'undefined' ? 'unsupported' : Notification.permission);

  const savedSettings = parseSettings(load(SETTINGS_KEY));
  const savedToday = parseDailyCount(load(DAILY_KEY), dayKey(new Date()));
  let settings = $state.raw<Settings>(savedSettings);
  let today = $state(savedToday);
  let timer = $state.raw<TimerState>(initialState(savedSettings, savedToday));
  let now = $state(Date.now());
  let announcement = $state('');
  let perm = $state<Perm>(readPerm());
  let settingsOpen = $state(false);
  let draft = $state<Settings>({ ...savedSettings });

  const left = $derived(remaining(timer, now));
  const timeText = $derived(formatMMSS(left));
  const pct = $derived(Math.round(progress(timer, settings, now) * 100));
  const inCycle = $derived(timer.completedFocus % settings.longBreakEvery);
  const untilLong = $derived(settings.longBreakEvery - inCycle);
  const upNext = $derived(PHASE_LABEL[nextPhase(timer.phase, timer.completedFocus + (timer.phase === 'focus' ? 1 : 0), settings)]);
  const phaseOptions = (Object.keys(PHASE_LABEL) as Phase[]).map((p) => ({ value: p, label: PHASE_LABEL[p] }));

  // ---- Sound: one AudioContext, created/resumed from the Start click (autoplay policy) ----
  let audio: AudioContext | null = null;
  function primeAudio() {
    try {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return;
      audio ??= new AC();
      if (audio.state === 'suspended') void audio.resume().catch(() => {});
    } catch {
      audio = null;
    }
  }
  function chime() {
    const ctx = audio;
    if (!ctx || !settings.sound) return;
    if (ctx.state === 'suspended') void ctx.resume().catch(() => {});
    const t = ctx.currentTime;
    [880, 1318.5].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const at = t + i * 0.18;
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.exponentialRampToValueAtTime(0.25, at + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.6);
      osc.connect(gain).connect(ctx.destination);
      osc.start(at);
      osc.stop(at + 0.65);
    });
  }

  async function enableNotifications() {
    if (typeof Notification === 'undefined') return;
    try {
      perm = await Notification.requestPermission();
    } catch {
      perm = readPerm();
    }
  }

  function notify(body: string) {
    if (perm !== 'granted') return;
    try { new Notification('Pomodoro Timer', { body, tag: 'pomodoro', icon: '/android-chrome-192x192.png' }); } catch {
      /* some platforms only allow notifications from a service worker */
    }
  }

  // ---- Timer ----
  function finished(phase: Phase, next: TimerState) {
    if (phase === 'focus') {
      const day = dayKey(new Date());
      today = parseDailyCount(load(DAILY_KEY), day) + 1;
      save(DAILY_KEY, JSON.stringify({ day, count: today }));
    }
    const msg = `${PHASE_LABEL[phase]} finished. ${PHASE_LABEL[next.phase]} ${next.running ? 'started' : 'is ready'}.`;
    announcement = msg;
    chime();
    notify(msg);
  }

  function step() {
    now = Date.now();
    const r = tick(timer, settings, now);
    if (r.finished) {
      timer = r.state;
      finished(r.finished, r.state);
    }
  }

  /** Apply a pure transition at the current time. */
  function act(fn: (t: TimerState, at: number) => TimerState) {
    now = Date.now();
    timer = fn(timer, now);
  }
  function toggle() {
    if (!timer.running) primeAudio();
    act((t, at) => (t.running ? pause(t, at) : start(t, at)));
  }
  function skipPhase() {
    act((t, at) => skip(t, settings, at));
    announcement = `Skipped to ${PHASE_LABEL[timer.phase]}.`;
  }

  // The interval only re-renders; time always comes from endsAt.
  $effect(() => {
    if (!timer.running) return;
    const id = setInterval(step, 250);
    return () => clearInterval(id);
  });

  // Tab title shows the countdown only while running.
  let savedTitle: string | null = null;
  $effect(() => {
    if (timer.running) {
      savedTitle ??= document.title;
      document.title = `${timeText} · ${PHASE_LABEL[timer.phase]}`;
    } else if (savedTitle !== null) {
      document.title = savedTitle;
      savedTitle = null;
    }
  });

  onDestroy(() => {
    if (savedTitle !== null) document.title = savedTitle;
    void audio?.close().catch(() => {});
    audio = null;
  });

  function onKey(e: KeyboardEvent) {
    if (e.code !== 'Space' || e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target as HTMLElement | null;
    if (t?.closest('input, textarea, select, button, a, [contenteditable], [role="switch"], [role="radio"], [role="slider"], [role="dialog"]')) return;
    e.preventDefault();
    toggle();
  }

  // ---- Settings: edits go to a draft until Save ----
  function openSettings() {
    if (!settingsOpen) draft = { ...settings };
    settingsOpen = !settingsOpen;
  }
  function saveSettings() {
    const next = clampSettings(draft);
    now = Date.now();
    timer = applySettings(timer, settings, next, now);
    settings = next;
    save(SETTINGS_KEY, JSON.stringify(next));
    settingsOpen = false;
  }
</script>

<svelte:window onkeydown={onKey} />
<svelte:document onvisibilitychange={step} />

<ToolLayout
  title="Pomodoro Timer"
  description="Boost your productivity with focused work sessions and regular breaks"
  icon={Timer}
  color="warning"
>
  <div class="grid gap-4 lg:grid-cols-3">
    <BentoCard class="items-center text-center lg:col-span-2">
      <div class="w-full max-w-md">
        <Segmented label="Phase" options={phaseOptions} value={timer.phase} onchange={(p) => act((t) => setPhase(t, settings, p as Phase))} />
      </div>
      <p class="text-label text-ink-muted mt-4">
        {PHASE_LABEL[timer.phase]} · {timer.running ? 'running' : left >= durationMs(timer.phase, settings) ? 'ready' : 'paused'}
      </p>
      <div role="timer" aria-live={timer.running ? 'off' : 'polite'} aria-atomic="true" class="text-display-xl tabular-nums sm:text-[112px] sm:leading-[112px]">
        {timeText}
      </div>
      <div
        class="h-2 w-full max-w-md overflow-hidden rounded-pill bg-sunken"
        role="progressbar"
        aria-label="{PHASE_LABEL[timer.phase]} progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
      >
        <div class="h-full rounded-pill bg-accent" style="width: {pct}%"></div>
      </div>
      <div class="mt-4 flex flex-wrap justify-center gap-3">
        <Button onclick={toggle} aria-label={timer.running ? 'Pause timer' : 'Start timer'}>
          {#snippet icon()}
            {#if timer.running}<Pause class="size-4" />{:else}<Play class="size-4" />{/if}
          {/snippet}
          {timer.running ? 'Pause' : 'Start'}
        </Button>
        <Button variant="secondary" onclick={() => act((t) => reset(t, settings))} aria-label="Reset {PHASE_LABEL[timer.phase]} timer">
          {#snippet icon()}<RotateCcw class="size-4" />{/snippet}
          Reset
        </Button>
        <Button variant="secondary" onclick={skipPhase} aria-label="Skip to next phase">
          {#snippet icon()}<SkipForward class="size-4" />{/snippet}
          Skip
        </Button>
      </div>
      <p class="text-body-sm text-ink-muted">Press <kbd class="text-code">Space</kbd> to start or pause.</p>
      <p class="sr-only" aria-live="polite">{announcement}</p>
    </BentoCard>

    <BentoCard tone="deep" label="Today">
      <p class="m-0"><span class="text-display tabular-nums">{today}</span> focus {today === 1 ? 'session' : 'sessions'}</p>
      <div class="flex gap-2" aria-hidden="true">
        {#each Array.from({ length: settings.longBreakEvery }, (_, i) => i) as i (i)}
          <span class="size-3 rounded-pill {i < inCycle ? 'bg-tile-lilac' : 'bg-tile-void'}"></span>
        {/each}
      </div>
      <p class="text-body-sm m-0 text-ink-on-dark-muted">
        Long break after {untilLong} more focus {untilLong === 1 ? 'session' : 'sessions'}. Up next: {upNext}.
      </p>
    </BentoCard>

    <BentoCard class="lg:col-span-3">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 class="text-title m-0">Settings</h2>
          <p class="text-body-sm m-0 text-ink-muted">
            {settings.focusMin} / {settings.shortBreakMin} / {settings.longBreakMin} min · long break every {settings.longBreakEvery}
          </p>
        </div>
        <Button variant="secondary" size="sm" onclick={openSettings} aria-expanded={settingsOpen} aria-controls="pomodoro-settings">
          {#snippet icon()}<Settings2 class="size-4" />{/snippet}
          {settingsOpen ? 'Close' : 'Edit'}
        </Button>
      </div>

      {#if settingsOpen}
        <div id="pomodoro-settings" class="mt-2 flex flex-col gap-5">
          <div class="grid gap-5 md:grid-cols-2">
            <Slider label="Focus" bind:value={draft.focusMin} min={LIMITS.focusMin.min} max={LIMITS.focusMin.max} unit=" min" />
            <Slider label="Short break" bind:value={draft.shortBreakMin} min={LIMITS.shortBreakMin.min} max={LIMITS.shortBreakMin.max} unit=" min" />
            <Slider label="Long break" bind:value={draft.longBreakMin} min={LIMITS.longBreakMin.min} max={LIMITS.longBreakMin.max} unit=" min" />
            <Slider label="Long break every" bind:value={draft.longBreakEvery} min={LIMITS.longBreakEvery.min} max={LIMITS.longBreakEvery.max} unit=" focus" />
          </div>
          <div class="flex flex-col gap-3">
            <Switch label="Auto-start breaks" bind:checked={draft.autoStartBreaks} />
            <Switch label="Auto-start focus" bind:checked={draft.autoStartFocus} />
            <Switch label="Chime when a phase ends" description="Plays after you have pressed Start once" bind:checked={draft.sound} />
          </div>
          <div class="flex flex-wrap items-center gap-3">
            {#if perm === 'default'}
              <Button variant="secondary" size="sm" onclick={enableNotifications}>
                {#snippet icon()}<Bell class="size-4" />{/snippet}
                Enable notifications
              </Button>
            {:else}
              <p class="text-body-sm m-0 text-ink-muted">
                {perm === 'granted'
                  ? 'Notifications are on.'
                  : perm === 'denied'
                    ? 'Notifications are blocked in your browser settings.'
                    : 'This browser does not support notifications.'}
              </p>
            {/if}
          </div>
          <div class="flex flex-wrap gap-3">
            <Button size="sm" onclick={saveSettings}>Save</Button>
            <Button variant="secondary" size="sm" onclick={() => (settingsOpen = false)}>Cancel</Button>
            <Button variant="ghost" size="sm" onclick={() => (draft = { ...DEFAULT_SETTINGS })}>Restore defaults</Button>
          </div>
        </div>
      {/if}
    </BentoCard>
  </div>
</ToolLayout>
