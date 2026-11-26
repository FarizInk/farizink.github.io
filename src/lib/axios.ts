import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  isAxiosError
} from 'axios';
import { API_BASE_URL } from './constants';

declare module 'axios' {
  interface AxiosRequestConfig {
    /**
     * Treat a 403 as "logged in but not allowed" instead of an expired session:
     * keep the token and let the caller show the message (e.g. admin-only /links).
     */
    keepSessionOnForbidden?: boolean;
  }
}

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Handle 302 redirects (authentication issues)
    if (error.response?.status === 302 || error.code === 'ERR_NETWORK') {
      console.error('Network or authentication error:', error.message);
    }

    // Handle 401/403 - unauthorized
    const status = error.response?.status;
    const forbiddenOnly = status === 403 && error.config?.keepSessionOnForbidden;
    if (status === 401 || (status === 403 && !forbiddenOnly)) {
      // Clear auth and dispatch logout event
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authTokenExpiry');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        document.dispatchEvent(new CustomEvent('logout-success'));
      }
    }

    return Promise.reject(error);
  }
);

// Export isAxiosError for use in other modules
export { isAxiosError };

// Helper function to get headers without auth
export function getPublicHeaders() {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };
}

// Helper function to get auth headers
export function getAuthHeaders() {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}
