import './app.css';
import './bones/registry';
import { configureBoneyard } from 'boneyard-js/svelte';
import { mount } from 'svelte';
import App from './App.svelte';

// Bone colors — must stay in sync with boneyard.config.json (the config file
// is dev/capture-time only; the runtime reads colors from here). Matches the
// --bg-control token of the Fariz design system (light / dark). 'shimmer' is the
// design system's one looping animation, used only while loading.
configureBoneyard({ color: '#e6e0f2', darkColor: '#30284a', animate: 'shimmer' });

const target = document.getElementById('app');
if (!target) {
  throw new Error('Could not find app element');
}

mount(App, { target });
