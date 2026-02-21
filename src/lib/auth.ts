import { apiClient, isAxiosError } from './axios';

export interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  token: string | null;
  isValid: boolean;
}

// Laravel API Response Types
export interface LoginResponse {
  token: {
    accessToken?: object;
    plainTextToken: string;
    [key: string]: any;
  };
  token_type: string;
  expires_in: number;
  user: {
    id: string;
    name: string;
    email: string;
    is_admin?: boolean;
    role?: string;
  };
}

export interface MeResponse {
  id: string;
  name: string;
  email: string;
  is_admin?: boolean;
  role?: string;
}

export interface LogoutResponse {
  message: string;
}

export interface ErrorResponse {
  message?: string;
  error?: string;
}

/**
 * Get current authentication state from localStorage
 */
export function getAuthState(): AuthState {
  const token = localStorage.getItem('authToken');
  const username = localStorage.getItem('username');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return {
    isLoggedIn,
    username,
    token,
    isValid: false // Will be updated by validateToken
  };
}

/**
 * Check API health status
 */
async function checkHealth(): Promise<boolean> {
  try {
    await apiClient.get('/api/health', {
      timeout: 3000
    });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Validate stored token using /api/me with health check fallback
 */
export async function validateToken(): Promise<boolean> {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;

  if (!token) {
    return false;
  }

  try {
    const response = await apiClient.get('/api/me', {
      timeout: 5000
    });

    const data: MeResponse = response.data;
    return !!(data.id && data.email);
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        return false;
      }
      if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
        return true;
      }
    }

    const isApiHealthy = await checkHealth();
    return !isApiHealthy;
  }
}

/**
 * Get current user info using /api/me
 */
export async function getCurrentUser(): Promise<{ username: string } | null> {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;

  if (!token) {
    return null;
  }

  try {
    const response = await apiClient.get('/api/me', {
      timeout: 5000
    });

    // Laravel API returns user data directly
    const data: MeResponse = response.data;
    return data.name ? { username: data.name } : null;
  } catch (error) {
    return null;
  }
}

/**
 * Validate and get complete auth state
 */
export async function getValidatedAuthState(): Promise<AuthState> {
  const basicState = getAuthState();

  if (!basicState.token || !basicState.isLoggedIn) {
    return { ...basicState, isValid: false };
  }

  const isValid = await validateToken();

  // Try to get current user info to update username
  const userInfo = await getCurrentUser();
  if (userInfo) {
    // Update stored username if different
    if (userInfo.username !== basicState.username) {
      localStorage.setItem('username', userInfo.username);
      basicState.username = userInfo.username;
    }
  }

  const validatedState = { ...basicState, isValid };

  // Only clear auth and logout if token is actually invalid (not just network error)
  // The validateToken() function already handles network errors by returning true
  if (!isValid) {
    clearAuth();
    document.dispatchEvent(new CustomEvent('logout-success'));
    return { isLoggedIn: false, username: null, token: null, isValid: false };
  }

  return validatedState;
}

/**
 * Clear authentication data from localStorage
 */
export function clearAuth(): void {
  localStorage.removeItem('authToken');
  localStorage.removeItem('authTokenExpiry');
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('username');
}

/**
 * Save authentication data to localStorage
 */
export function saveAuth(token: string | { plainTextToken: string }, username: string, expiresIn?: string): void {
  const tokenValue = typeof token === 'string' ? token : token.plainTextToken;
  localStorage.setItem('authToken', tokenValue);
  localStorage.setItem('authTokenExpiry', expiresIn || '');
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('username', username);
}

/**
 * Login with email and password using Laravel API
 */
export async function login(
  email: string,
  password: string
): Promise<{ success: boolean; data?: LoginResponse; error?: string }> {
  try {
    const response = await apiClient.post('/api/login', { email, password }, {
      timeout: 10000
    });

    return {
      success: true,
      data: response.data as LoginResponse
    };
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      return {
        success: false,
        error: errorMessage
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error'
    };
  }
}

/**
 * Logout user
 */
export async function logout(): Promise<void> {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;

  try {
    // Call Laravel logout endpoint
    if (token) {
      await apiClient.post('/api/logout', {}, {
        timeout: 5000
      });
    }
  } catch (error) {
    // Continue with local logout even if API call fails
  } finally {
    // Clear local auth data
    clearAuth();

    // Dispatch logout event for other components
    document.dispatchEvent(new CustomEvent('logout-success'));
  }
}
