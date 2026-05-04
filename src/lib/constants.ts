/**
 * Application Constants
 *
 * This file contains all constant values used throughout the application.
 * Centralize configuration here for easy management.
 */

/**
 * API Base URLs
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://soul.fariz.dev';

/**
 * WebSocket Configuration
 */
export const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:8080';

/**
 * Spotify API Configuration
 */
export const SPOTIFY_API = {
  BASE_URL: 'https://api.spotify.com/v1',
  TOKEN_ENDPOINT: `${API_BASE_URL}/api/spotify/token`,
  MARKET: 'ID'
} as const;

/**
 * Application Metadata
 */
export const APP_META = {
  NAME: 'Fariz',
  DESCRIPTION: 'Software Engineer',
  AUTHOR: 'Fariz'
} as const;
