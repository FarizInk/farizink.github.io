import { addRefreshParam, isPresignedUrl } from './notes';
import { Image as ImageIcon, File } from '@lucide/svelte';

/**
 * Truncate text to specified max length with ellipsis
 */
export function truncateText(text: string | null, maxLength: number = 100): string {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

/**
 * Format file name for display with max length
 */
export function formatFileName(name?: string, maxLength: number = 20): string {
  if (!name) return 'Unnamed file';
  if (name.length <= maxLength) return name;
  return name.substring(0, maxLength) + '...';
}

/**
 * Get icon component for file based on mime type
 * Returns a Lucide icon component constructor
 */
export function getFileIconType(mimeType?: string): typeof ImageIcon | typeof File {
  if (!mimeType) return File;

  if (mimeType.startsWith('image/')) {
    return ImageIcon;
  }

  // For PDFs, documents, text files, we can add more specific icons later
  // For now, return File icon for non-image types
  return File;
}

/**
 * Get icon color class based on mime type
 */
export function getFileIconColor(mimeType?: string): string {
  if (!mimeType) return 'text-secondary-600 dark:text-secondary-400';

  if (mimeType === 'application/pdf') {
    return 'text-red-600 dark:text-red-400';
  }

  if (mimeType.includes('document') || mimeType.includes('word') || mimeType.includes('office')) {
    return 'text-blue-600 dark:text-blue-400';
  }

  if (mimeType.includes('text') || mimeType.includes('code')) {
    return 'text-green-600 dark:text-green-400';
  }

  return 'text-secondary-600 dark:text-secondary-400';
}

/**
 * Get display text for mime type
 */
export function formatMimeType(mimeType?: string): string {
  if (!mimeType) return 'file';

  // Remove common prefixes for cleaner display
  return mimeType.replace('application/', '').replace('image/', '').replace('text/', '');
}

/**
 * Handle image loading errors with refresh attempt for presigned URLs
 * Call this function on onerror event of img elements
 */
export function handleImageError(event: Event): void {
  const img = event.target as HTMLImageElement;
  const originalSrc = img.src;

  // Try to refresh the URL once if it's a presigned URL
  if (isPresignedUrl(originalSrc) && !img.dataset.refreshed) {
    img.dataset.refreshed = 'true';
    img.src = addRefreshParam(originalSrc);
  } else {
    // Fallback: hide image and show placeholder
    img.style.display = 'none';
    const placeholder = img.nextElementSibling as HTMLElement;
    if (placeholder) {
      placeholder.style.display = 'flex';
    }
  }
}

/**
 * Get file URL for display - wrapper around notes.ts function for convenience
 * Import this from uiUtils instead of notes for UI components
 */
export { getFileUrl, isPresignedUrl, addRefreshParam } from './notes';

/**
 * Get CSS background color with opacity for tag colors
 * Useful for tag badge styling
 */
export function getTagBackgroundColor(
  color: string | null,
  opacity: number = 0.2
): string | undefined {
  if (!color) return undefined;

  // If color is already in hex format, add opacity
  if (color.startsWith('#')) {
    // Convert hex to rgba with opacity
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // If it's a named color or rgb, append opacity
  return color;
}

/**
 * Get CSS border color with opacity for tag colors
 */
export function getTagBorderColor(color: string | null, opacity: number = 0.4): string | undefined {
  return getTagBackgroundColor(color, opacity);
}

/**
 * Get fallback tag color for when no color is specified
 */
export function getFallbackTagColor(isDark: boolean = false): string {
  return isDark ? '#a855f7' : '#ca8a04'; // purple in dark, yellow in light
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.');
  if (lastDot === -1) return '';
  return filename.substring(lastDot + 1).toLowerCase();
}
