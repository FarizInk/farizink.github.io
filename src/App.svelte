<script lang="ts">
  import { onMount } from 'svelte';
  import { createRouter } from './lib/router.js';
  import Router from './lib/Router.svelte';
  import Navigation from './components/Navigation.svelte';
  import PixelBackground from './components/PixelBackground.svelte';
  import LoveIcon from './components/icons/LoveIcon.svelte';
  import Thanks from './components/Thanks.svelte';
  import Modal from './components/Modal.svelte';

  // Import pages
  import Home from './pages/Home.svelte';
  import Project from './pages/Project.svelte';

  // Define routes
  const routes = [
    { path: '/', component: Home, title: 'Fariz - Software Engineer' },
    { path: '/projects', component: Project, title: 'Project - Fariz' }
  ];

  let showThanksModal = $state(false);

  const openThanksModal = () => {
    showThanksModal = true;
  };

  const closeThanksModal = () => {
    showThanksModal = false;
  };

  onMount(() => {
    createRouter(routes);
  });
</script>

<div class="min-h-screen flex flex-col justify-between relative">
  <PixelBackground />
  <Navigation />
  <div class="flex-1 pt-[56px]">
    <div class="container mx-auto">
      <Router />
    </div>
  </div>

  <footer class="flex justify-center items-center text-black dark:text-white py-4">
    Made with <button type="button" onclick={openThanksModal} class="hover:cursor-pointer">
      <LoveIcon class="w-5 h-5 mx-1 text-rose-600" />
    </button> in Surabaya.
  </footer>
</div>

<Modal isOpen={showThanksModal} onClose={closeThanksModal} maxW="max-w-2xl">
  <Thanks />
</Modal>
