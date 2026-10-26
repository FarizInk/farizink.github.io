export interface Option { value: string; label: string; hint?: string; description?: string; disabled?: boolean }
/** Close when clicking outside `node`. */
export function clickOutside(node: HTMLElement, cb: () => void) {
  const f = (e: MouseEvent) => { if (!node.contains(e.target as Node)) cb(); };
  document.addEventListener('mousedown', f);
  return { destroy: () => document.removeEventListener('mousedown', f) };
}
