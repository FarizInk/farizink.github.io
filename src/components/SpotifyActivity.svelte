<script lang="ts">
  import { MonitorSmartphone, Play, Pause, X } from '@lucide/svelte';
  import SpotifyLogoIcon from './icons/SpotifyLogoIcon.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { SPOTIFY_API } from '../lib/constants';

  interface SpotifyDevice {
    id: string;
    name: string;
    type: string;
    is_active: boolean;
    volume_percent: number;
  }

  interface SpotifyCurrentlyPlayingResponse {
    is_playing: boolean;
    item: {
      name: string;
      duration_ms: number;
      external_urls: {
        spotify: string;
      };
      album: {
        external_urls: {
          spotify: string;
        };
        images: Array<{
          url: string;
        }>;
      };
      artists: Array<{
        name: string;
      }>;
    } | null;
    device: {
      id: string;
      name: string;
      type: string;
      is_active: boolean;
      volume_percent: number;
    };
    progress_ms: number;
  }

  let animationFrameId: number | null = null;
  let isComponentMounted = false;
  let pollIntervalId: ReturnType<typeof setInterval> | null = null;
  let accessToken: string | null = null;

  // Smooth progress tracking
  let baseProgressMs = $state(0);
  let lastUpdateTimestamp = $state(0);
  let durationMs = $state(0);
  let wasPlaying = false;

  // State
  let spotify = $state(false);
  let isPlaying = $state(false);
  let device = $state<SpotifyDevice | null>(null);
  let track = $state<{
    album_img: string | null;
    album_url: string | null;
    artists: string[];
    url: string | null;
    name: string | null;
    percent: number;
    duration_ms: number;
    progress_ms: number;
  }>({
    album_img: null,
    album_url: null,
    artists: [],
    url: null,
    name: null,
    percent: 0,
    duration_ms: 0,
    progress_ms: 0
  });

  // ===== Token Management =====

  const getAccessToken = async (): Promise<string | null> => {
    try {
      const response = await fetch(SPOTIFY_API.TOKEN_ENDPOINT);
      if (!response.ok) {
        console.error('Failed to get token:', response.statusText);
        return null;
      }

      const data = await response.json();
      return data.data?.access_token || null;
    } catch (error) {
      console.error('Error fetching token:', error);
      return null;
    }
  };

  // ===== Spotify API Calls =====

  const fetchCurrentlyPlaying = async () => {
    if (!accessToken) {
      accessToken = await getAccessToken();
      if (!accessToken) {
        setNotPlaying();
        return;
      }
    }

    try {
      const response = await fetch(`${SPOTIFY_API.BASE_URL}/me/player/currently-playing`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      // 204 = No content (nothing playing)
      if (response.status === 204) {
        setNotPlaying();
        return;
      }

      if (!response.ok) {
        // Token might be expired, try to get a new one
        if (response.status === 401) {
          accessToken = await getAccessToken();
          if (accessToken) {
            // Retry with new token
            return fetchCurrentlyPlaying();
          }
        }
        console.error('Spotify API error:', response.statusText);
        setNotPlaying();
        return;
      }

      const data: SpotifyCurrentlyPlayingResponse = await response.json();
      updateTrackData(data);
    } catch (error) {
      console.error('Error fetching currently playing:', error);
      setNotPlaying();
    }
  };

  const setNotPlaying = () => {
    spotify = false;
    isPlaying = false;
    wasPlaying = false;
    device = null;
    stopProgressAnimation();
  };

  const updateTrackData = (data: SpotifyCurrentlyPlayingResponse) => {
    if (!data.item) {
      setNotPlaying();
      return;
    }

    spotify = true;

    // Check if play state changed
    const playStateChanged = wasPlaying !== data.is_playing;
    wasPlaying = data.is_playing;
    isPlaying = data.is_playing;

    // Update track info
    track.name = data.item.name;
    track.artists = data.item.artists.map(a => a.name);
    track.album_img = data.item.album.images[0]?.url || null;
    track.album_url = data.item.album.external_urls.spotify;
    track.url = data.item.external_urls.spotify;
    durationMs = data.item.duration_ms;
    track.duration_ms = data.item.duration_ms;

    // Update device info
    device = data.device;

    // Store base progress for smooth animation
    baseProgressMs = data.progress_ms;
    lastUpdateTimestamp = Date.now();

    // Start/stop animation based on play state
    if (isPlaying) {
      startProgressAnimation();
    } else if (playStateChanged) {
      stopProgressAnimation();
      track.progress_ms = baseProgressMs;
      track.percent = (baseProgressMs * 100) / durationMs;
    }
  };

  // ===== Smooth Progress Animation =====

  const getSmoothProgress = (): number => {
    if (!isPlaying || baseProgressMs === 0 || durationMs === 0) {
      return baseProgressMs;
    }

    const elapsed = Date.now() - lastUpdateTimestamp;
    const smoothProgress = baseProgressMs + elapsed;
    return Math.min(smoothProgress, durationMs);
  };

  const startProgressAnimation = () => {
    if (animationFrameId !== null) return;

    const animate = () => {
      if (!isComponentMounted) return;

      if (isPlaying) {
        const smoothMs = getSmoothProgress();
        track.progress_ms = smoothMs;
        track.percent = (smoothMs * 100) / durationMs;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
  };

  const stopProgressAnimation = () => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  };

  // ===== Helper Functions =====

  const getRemainingTime = (): string => {
    if (!track.duration_ms || !track.progress_ms) return '';

    const remainingMs = track.duration_ms - track.progress_ms;
    const remainingMinutes = Math.ceil(remainingMs / 1000 / 60);

    if (remainingMinutes <= 0) return '';
    if (remainingMinutes === 1) return '1 min left';
    return `${remainingMinutes} min left`;
  };

  // ===== Lifecycle =====

  onMount(async () => {
    isComponentMounted = true;

    // Initial fetch
    await fetchCurrentlyPlaying();

    // Poll every 5 seconds for updates
    pollIntervalId = setInterval(async () => {
      if (isComponentMounted) {
        await fetchCurrentlyPlaying();
      }
    }, 5000);
  });

  onDestroy(() => {
    isComponentMounted = false;
    stopProgressAnimation();
    if (pollIntervalId) {
      clearInterval(pollIntervalId);
      pollIntervalId = null;
    }
  });
</script>

{#if spotify}
  <div
    class="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-xl border {isPlaying
      ? 'border-green-500/50 shadow-green-500/20'
      : 'border-gray-800/50'} overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-green-500/30"
  >
    <!-- Main content -->
    <div class="p-4">
      <!-- Header with album and track info -->
      <div class="flex items-center gap-4 mb-4">
        <!-- Album art -->
        <div class="relative">
          <a href={track.album_url} target="_blank" rel="noreferrer" class="block">
            <img
              src={track.album_img}
              alt=""
              class="w-16 h-16 rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105 object-cover"
            />
            {#if isPlaying}
              <div
                class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <Play class="w-2.5 h-2.5 text-white" />
              </div>
            {/if}
          </a>
        </div>

        <!-- Track information -->
        <div class="flex-1 min-w-0">
          <div
            class="font-bold text-white text-base mb-1 truncate group-hover:text-green-400 transition-colors duration-200"
          >
            <a target="_blank" rel="noreferrer" class="hover:underline" href={track.url}>
              {track.name}
            </a>
          </div>
          <div class="text-sm text-gray-300 truncate">
            {#each track.artists as artist, i (i)}
              <span class="hover:text-white transition-colors duration-200">
                {artist}
                {#if i + 1 !== track.artists.length}
                  <span class="text-gray-500 mx-1">•</span>
                {/if}
              </span>
            {/each}
          </div>
        </div>

        <!-- Spotify logo -->
        <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a href="https://open.spotify.com" rel="noreferrer" target="_blank" class="block">
            <SpotifyLogoIcon
              class="h-5 w-auto text-green-500 hover:scale-110 transition-transform duration-200"
            />
          </a>
        </div>
      </div>

      <!-- Progress bar section -->
      <div class="space-y-3">
        <!-- Progress bar -->
        <div class="relative">
          <div
            class="h-2 rounded-full overflow-hidden {isPlaying ? 'bg-gray-800' : 'bg-gray-800/50'}"
          >
            <div
              class="h-full rounded-full {isPlaying
                ? 'bg-gradient-to-r from-green-500 to-green-400'
                : 'bg-gradient-to-r from-gray-400 to-gray-500'}"
              style="width: {track.percent}%;"
            >
              {#if isPlaying}
                <div class="h-full rounded-full animate-pulse bg-white/20"></div>
              {/if}
            </div>
          </div>
          {#if isPlaying}
            <div
              class="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"
              style="left: calc({track.percent}% - 6px);"
            ></div>
          {/if}
        </div>

        <!-- Bottom info -->
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            {#if device}
              <div class="flex items-center gap-1 text-gray-400">
                <MonitorSmartphone class="w-3 h-3 opacity-70" />
                <span class="font-medium text-gray-300">{device.name}</span>
              </div>
            {/if}
          </div>

          <div class="flex items-center gap-3">
            {#if isPlaying && getRemainingTime()}
              <span class="text-gray-400 font-medium">
                {getRemainingTime()}
              </span>
            {/if}
            <div class="flex items-center gap-1">
              {#if isPlaying}
                <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span class="text-red-500 font-medium">LIVE</span>
              {:else}
                <Pause class="w-3 h-3 text-gray-400" />
                <span class="text-gray-400">PAUSED</span>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{:else}
  <div
    class="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-xl border border-gray-800/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-gray-600/30"
  >
    <!-- Offline state -->
    <div class="p-4">
      <div class="flex items-center gap-4 mb-4">
        <!-- Animated album placeholder -->
        <div class="relative">
          <div class="w-16 h-16 rounded-lg bg-gray-800 flex items-center justify-center">
            <div class="w-8 h-8 rounded bg-gray-700 animate-pulse"></div>
          </div>
          <div
            class="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center"
          >
            <X class="w-3 h-3 text-gray-400" />
          </div>
        </div>

        <!-- Offline info -->
        <div class="flex-1">
          <div class="font-bold text-gray-400 text-base mb-1">Not Playing</div>
          <div class="text-sm text-gray-500">No music playing right now</div>
        </div>

        <!-- Spotify logo -->
        <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a href="https://open.spotify.com" rel="noreferrer" target="_blank" class="block">
            <SpotifyLogoIcon
              class="h-5 w-auto text-gray-400 hover:text-green-500 hover:scale-110 transition-all duration-200"
            />
          </a>
        </div>
      </div>

      <!-- Offline progress bar placeholder -->
      <div class="space-y-3">
        <div class="h-2 rounded-full bg-gray-800/30 overflow-hidden">
          <div class="h-full w-0 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full"></div>
        </div>

        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-1 text-gray-500">
            <Pause class="w-3 h-3" />
            <span>Idle</span>
          </div>
          <span class="text-gray-500">--:--</span>
        </div>
      </div>
    </div>
  </div>
{/if}
