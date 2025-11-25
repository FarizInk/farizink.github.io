import { API_BASE_URL } from './constants';

export interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  token: string | null;
  isValid: boolean;
}

export interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    type: string;
    expiresIn: string | null;
  };
  meta: {
    timestamp: string;
    path: string;
  };
}

export interface MeResponse {
  success: boolean;
  data: {
    username: string;
    authenticated: boolean;
  };
  meta: {
    timestamp: string;
    path: string;
  };
}

export interface ValidateResponse {
  success: boolean;
  data: {
    valid: boolean;
    token: string;
    type: string;
  };
  meta: {
    timestamp: string;
    path: string;
  };
}

/**
 * @deprecated This function is kept for reference but not used due to rate limiting
 * Use validateToken() which uses /api/me and /health endpoints instead
 */
export async function validateTokenDeprecated(): Promise<boolean> {
  const token = localStorage.getItem('authToken');

  if (!token) {
    return false;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      signal: AbortSignal.timeout(5000)
    });

    if (!response.ok) {
      return false;
    }

    const data: ValidateResponse = await response.json();
    return data.success && data.data.valid;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
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
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(3000) // 3 second timeout
    });

    return response.ok;
  } catch (error) {
    console.error('Health check error:', error);
    return false;
  }
}

/**
 * Validate stored token using /api/me with health check fallback
 */
export async function validateToken(): Promise<boolean> {
  const token = localStorage.getItem('authToken');

  if (!token) {
    return false;
  }

  try {
    // Try to get current user using /api/me
    const response = await fetch(`${API_BASE_URL}/api/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });

    if (response.ok) {
      const data: MeResponse = await response.json();
      return data.success && data.data.authenticated;
    }

    // If /api/me failed, check if API is healthy
    const isApiHealthy = await checkHealth();
    if (isApiHealthy) {
      // API is healthy but /api/me failed, so token is invalid
      return false;
    } else {
      // API is not healthy, can't determine token validity
      console.warn('API is not healthy, unable to validate token');
      return true; // Assume token is valid to avoid unnecessary logout during API issues
    }
  } catch (error) {
    console.error('Token validation error:', error);

    // Try health check as fallback
    const isApiHealthy = await checkHealth();
    if (!isApiHealthy) {
      console.warn('API is not healthy, assuming token is valid');
      return true; // Assume valid during API issues
    }

    return false;
  }
}

/**
 * Get current user info using /api/me
 */
export async function getCurrentUser(): Promise<{ username: string } | null> {
  const token = localStorage.getItem('authToken');

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
      signal: AbortSignal.timeout(5000)
    });

    if (!response.ok) {
      return null;
    }

    const data: MeResponse = await response.json();
    return data.success && data.data.authenticated ? { username: data.data.username } : null;
  } catch (error) {
    console.error('Get current user error:', error);
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
  if (!isValid) {
    // Token is invalid, clear auth data and logout user
    console.log('Token validation failed, logging out user');
    clearAuth();

    // Dispatch logout event for other components
    document.dispatchEvent(new CustomEvent('logout-success'));

    return { isLoggedIn: false, username: null, token: null, isValid: false };
  }

  // Try to get current user info to update username
  const userInfo = await getCurrentUser();
  if (userInfo) {
    // Update stored username if different
    if (userInfo.username !== basicState.username) {
      localStorage.setItem('username', userInfo.username);
      basicState.username = userInfo.username;
    }
  }

  return { ...basicState, isValid: true };
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
export function saveAuth(token: string, username: string, expiresIn?: string): void {
  localStorage.setItem('authToken', token);
  localStorage.setItem('authTokenExpiry', expiresIn || '');
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('username', username);
}

/**
 * Logout user
 */
export async function logout(): Promise<void> {
  // Clear local auth data
  clearAuth();

  // Dispatch logout event for other components
  document.dispatchEvent(new CustomEvent('logout-success'));
}
