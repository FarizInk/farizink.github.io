<script lang="ts">
  import { NowPlaying } from '$lib/components/ds';
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

  let { colSpan = 2 }: { colSpan?: 1 | 2 | 3 | 4 } = $props();

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

<NowPlaying
  isPlaying={spotify && isPlaying}
  title={track.name ?? undefined}
  artist={track.artists.join(' · ')}
  albumArt={spotify && isPlaying ? (track.album_img ?? undefined) : undefined}
  progress={track.progress_ms / 1000}
  duration={track.duration_ms / 1000}
  href={spotify && isPlaying && track.url ? track.url : undefined}
  {colSpan}
/>
