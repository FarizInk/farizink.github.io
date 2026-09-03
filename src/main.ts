import './app.css';
import './lib/motion.css';
import './bones/registry';
import { configureBoneyard } from 'boneyard-js/svelte';
import { mount } from 'svelte';
import App from './App.svelte';

// Bone colors — must stay in sync with boneyard.config.json (the config file
// is dev/capture-time only; the runtime reads colors from here). Matches the
// --color-secondary-200/700 tokens used by the old hand-built skeletons.
configureBoneyard({ color: '#e2e8f0', darkColor: '#334155', animate: 'pulse' });

const target = document.getElementById('app');
if (!target) {
  throw new Error('Could not find app element');
}

mount(App, { target });
