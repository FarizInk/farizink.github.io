/**
 * Application Constants
 *
 * This file contains all constant values used throughout the application.
 * Centralize configuration here for easy management.
 */

/**
 * API Base URLs
 */
export const API_BASE_URL = 'http://localhost:3000';

/**
 * Spotify API Configuration
 */
export const SPOTIFY_API = {
  BASE_URL: 'https://api.spotify.com/v1',
  TOKEN_ENDPOINT: `${API_BASE_URL}/api/spotify/token`,
  REFRESH_ENDPOINT: `${API_BASE_URL}/api/spotify/refresh`,
  MARKET: 'ID'
} as const;

/**
 * Application Metadata
 */
export const APP_META = {
  NAME: 'Fariz Portfolio',
  DESCRIPTION: 'Software Engineer & Developer Tools Creator',
  AUTHOR: 'Fariz'
} as const;
