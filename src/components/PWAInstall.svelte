<script lang="ts">
  import { onMount } from 'svelte';

  let deferredPrompt: Event | null = null;
  let canInstall = $state(false);
  let isInstalled = $state(false);

  onMount(() => {
    // Check if already installed
    checkIfInstalled();

    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for app installed event
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  });

  function handleBeforeInstallPrompt(e: Event) {
    e.preventDefault();
    deferredPrompt = e;
    canInstall = true;
  }

  function handleAppInstalled() {
    console.log('PWA was installed');
    isInstalled = true;
    canInstall = false;
    deferredPrompt = null;
  }

  function checkIfInstalled() {
    // Check if running in standalone mode (installed PWA)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      isInstalled = true;
    }
  }

  async function installPWA() {
    if (!deferredPrompt) return;

    const promptEvent = deferredPrompt as unknown as { prompt: () => void; userChoice: Promise<{ outcome: string }> };
    promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;

    console.log(`User response to install prompt: ${outcome}`);
    deferredPrompt = null;
    canInstall = false;
  }

  // Expose functions to parent
  export function promptInstall() {
    return installPWA();
  }

  export function getCanInstall() {
    return canInstall;
  }

  export function getIsInstalled() {
    return isInstalled;
  }
</script>

<!-- This component provides PWA install functionality to parent components -->