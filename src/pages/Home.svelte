<script lang="ts">
  import { onMount } from 'svelte';
  import photoOne from '../assets/me/1.jpg';
  import photoTwo from '../assets/me/2.jpg';
  import SpotifyActivity from '../components/SpotifyActivity.svelte';
  import ConnectWithMe from '../components/ConnectWithMe.svelte';
  import DashboardView from '../components/DashboardView.svelte';
  import DiaryView from '../components/diary/DiaryView.svelte';
  import { Command, LayoutDashboard, NotebookPen, User, X } from '@lucide/svelte';
  import { isBoneyardCapture } from '../lib/boneyard';
  import { getAllTools } from '../lib/toolsConfig';
  import { BentoCard, BentoGrid, Segmented, Tag } from '$lib/components/ds';
  import { readHomeView, writeHomeView, type HomeView } from '../lib/diary';

  const toolCount = getAllTools().length;
  const stack = ['php', 'laravel', 'typescript', 'svelte', 'linux'];

  let showPhoto = $state(false);
  let randPhoto = $state<string | null>(null);
  let imageLoading = $state(false);

  // Home view (logged in): Profile / Dashboard / Diary, remembered in localStorage.
  let view = $state<HomeView>('profile');
  let isLoggedIn = $state(false);

  // Boneyard capture forces the data views so their skeletons get snapshotted.
  const capturedView: HomeView | null = isBoneyardCapture
    ? new URLSearchParams(window.location.search).get('view') === 'diary'
      ? 'diary'
      : 'dashboard'
    : null;
  const shownView = $derived(capturedView ?? (isLoggedIn ? view : 'profile'));

  function setView(next: string) {
    view = next as HomeView;
    writeHomeView(localStorage, view);
  }

  const togglePhoto = () => {
    const photos = [photoOne, photoTwo];
    if (!showPhoto) {
      showPhoto = true;
      imageLoading = true;
      randPhoto = null;

      const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
      const img = new Image();

      img.onload = () => {
        randPhoto = randomPhoto;
        imageLoading = false;
      };

      img.onerror = () => {
        console.error('Failed to load image');
        randPhoto = randomPhoto;
        imageLoading = false;
      };

      img.src = randomPhoto;

      if (img.complete) {
        randPhoto = randomPhoto;
        imageLoading = false;
      }
    } else {
      showPhoto = false;
      randPhoto = null;
      imageLoading = false;
    }
  };

  onMount(() => {
    isLoggedIn = !!localStorage.getItem('authToken');
    if (isLoggedIn) {
      view = readHomeView(localStorage);
    }

    const handleAuthChange = () => {
      const wasLoggedIn = isLoggedIn;
      isLoggedIn = !!localStorage.getItem('authToken');

      if (isLoggedIn && !wasLoggedIn) {
        view = readHomeView(localStorage);
      }

      if (!isLoggedIn) {
        view = 'profile';
      }
    };

    document.addEventListener('logout-success', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    return () => {
      document.removeEventListener('logout-success', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  });
</script>

<main class="mx-auto flex min-h-screen max-w-[1120px] flex-col gap-6 pt-24 pb-12">
  {#snippet profileIcon()}<User class="size-4" />{/snippet}
  {#snippet dashboardIcon()}<LayoutDashboard class="size-4" />{/snippet}
  {#snippet diaryIcon()}<NotebookPen class="size-4" />{/snippet}

  {#if isLoggedIn}
    <div class="flex justify-end">
      <div class="w-full sm:w-[380px]">
        <Segmented
          label="Home view"
          value={view}
          onchange={setView}
          options={[
            { value: 'profile', label: 'Profile', icon: profileIcon },
            { value: 'dashboard', label: 'Dashboard', icon: dashboardIcon },
            { value: 'diary', label: 'Diary', icon: diaryIcon }
          ]}
        />
      </div>
    </div>
  {/if}

  {#if shownView === 'dashboard'}
    <DashboardView />
  {:else if shownView === 'diary'}
    <DiaryView />
  {:else}
    <BentoGrid>
      <BentoCard tone="accent" colSpan={2} rowSpan={2} size="lg" label="Hi, I'm">
        <h1 class="text-display-xl m-0 max-sm:text-[48px] max-sm:leading-[48px]">
          <button type="button" onclick={togglePhoto}>Fariz</button>
        </h1>
        <p class="text-body-lg m-0 max-w-[480px]">
          Nizar Alfarizi Akbar — software engineer based in Sidoarjo, Indonesia. Backend, mostly,
          plus high-quality web apps. Currently building <strong class="font-semibold">gabut</strong>
          projects and crushing work tasks 🙂
        </p>
        <div class="mt-auto pt-4">
          <ConnectWithMe />
        </div>
      </BentoCard>

      <BentoCard tone="lilac" label="Stack">
        <div class="flex flex-wrap gap-2">
          {#each stack as item (item)}<Tag>{item}</Tag>{/each}
        </div>
      </BentoCard>

      <BentoCard tone="lime" label="Tools" title="{toolCount} utilities" href="/tools">
        <p class="text-body-sm m-0 mt-auto font-normal">Free dev tools that run in your browser.</p>
      </BentoCard>

      <SpotifyActivity />

      <BentoCard tone="deep" label="Based in" colSpan={4}>
        <p class="text-title m-0">Sidoarjo, Indonesia</p>
        <p class="text-body-sm m-0 mt-auto flex flex-wrap items-center gap-2 font-normal">
          Press
          <kbd class="inline-flex items-center gap-1 rounded-md bg-ink-on-dark/15 px-1.5 font-mono text-xs">
            <Command class="size-3" />K
          </kbd>
          to jump anywhere on the site.
        </p>
      </BentoCard>
    </BentoGrid>
  {/if}

  <!-- Floating Photo Card -->
  {#if showPhoto}
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4 backdrop-blur-sm"
      onclick={() => (showPhoto = false)}
      onkeydown={e => e.key === 'Escape' && (showPhoto = false)}
      role="dialog"
      aria-modal="true"
      aria-label="Photo of Fariz"
      tabindex="-1"
    >
      <div class="relative" role="document" tabindex="-1">
        <button
          onclick={() => (showPhoto = false)}
          class="absolute -top-3 -right-3 z-10 grid size-10 place-items-center rounded-pill bg-raised text-ink hover:bg-control"
          aria-label="Close photo"
        >
          <X class="size-5" />
        </button>

        <div
          class="relative w-fit max-w-sm min-w-[280px] overflow-hidden rounded-lg bg-raised sm:min-w-[320px] md:max-w-md lg:max-w-lg"
        >
          {#if imageLoading}
            <div class="aspect-[3/4] min-h-[300px] w-full bg-sunken sm:min-h-[400px]"></div>
          {/if}
          {#if randPhoto}
            <img
              src={randPhoto}
              alt="Fariz"
              class="block h-auto max-h-[calc(100dvh-4rem)] w-auto max-w-full {imageLoading ? 'opacity-0' : 'opacity-100'}"
            />
          {/if}
        </div>
      </div>
    </div>
  {/if}
</main>
