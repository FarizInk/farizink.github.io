// Global modal scroll state manager
// This ensures all modal instances share the same counter

let openModalCount = 0;
let originalBodyOverflow = '';
let originalBodyPaddingRight = '';

// Track modal instances for nested modal support
// Each modal gets a unique ID when it opens
let modalStack: string[] = [];
let modalIdCounter = 0;

export function preventBodyScroll(): string {
  const body = document.body;

  // Store original values only on first modal
  if (openModalCount === 0) {
    originalBodyOverflow = body.style.overflow || '';
    originalBodyPaddingRight = body.style.paddingRight || '';
  }

  // Check if body has scrollbar
  const hasScrollbar = body.scrollHeight > window.innerHeight;

  // Prevent scrolling
  body.style.overflow = 'hidden';

  // Add padding to prevent layout shift due to scrollbar disappearing
  if (hasScrollbar && openModalCount === 0) {
    const scrollbarWidth = window.innerWidth - body.clientWidth;
    body.style.paddingRight = `${scrollbarWidth}px`;
  }

  openModalCount++;

  // Generate and register modal ID
  const modalId = `modal-${++modalIdCounter}-${Date.now()}`;
  modalStack.push(modalId);

  return modalId;
}

export function restoreBodyScroll(modalId: string) {
  // Remove this modal from the stack
  const index = modalStack.indexOf(modalId);
  if (index > -1) {
    modalStack.splice(index, 1);
  }

  openModalCount--;

  // Only restore when all modals are closed
  if (openModalCount <= 0) {
    openModalCount = 0;
    const body = document.body;
    body.style.overflow = originalBodyOverflow;
    body.style.paddingRight = originalBodyPaddingRight;
  }
}

/**
 * Check if the given modal ID is the topmost modal
 * Only the topmost modal should handle ESC key
 */
export function isTopmostModal(modalId: string): boolean {
  return modalStack.length > 0 && modalStack[modalStack.length - 1] === modalId;
}

/**
 * Get the number of open modals
 */
export function getOpenModalCount(): number {
  return openModalCount;
}

/**
 * Get the modal stack (for debugging)
 */
export function getModalStack(): string[] {
  return [...modalStack];
}
