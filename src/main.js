import './app.css';
import App from './App.svelte';
import { mount } from 'svelte';
const target = document.getElementById('app');
if (!target) {
  throw new Error('Could not find app element');
}
mount(App, { target });
//# sourceMappingURL=main.js.map
