/**
 * WebSocket Service
 *
 * Reusable WebSocket connection manager with Pusher-compatible protocol.
 * Handles registration, connection, subscription, and event handling.
 */

import { WS_BASE_URL, SPOTIFY_API } from './constants';

// ===== Types =====

export type WebSocketState = 'connecting' | 'connected' | 'disconnected' | 'error';

export interface WebSocketConfig {
  registerEndpoint: string;
  wsEndpoint: string;
  channel: string;
  events: Record<string, (data: unknown) => void>;
  onStateChange?: (state: WebSocketState) => void;
  reconnectInterval?: number;
}

export interface PusherMessage {
  event: string;
  data: string;
}

export interface PusherSubscribeData {
  channel: string;
  auth?: string;
}

// ===== WebSocket Manager Class =====

export class WebSocketManager {
  private ws: WebSocket | null = null;
  private config: Required<WebSocketConfig>;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private state: WebSocketState = 'disconnected';
  private dynamicEventName: string | null = null; // Event name from registration response

  constructor(config: WebSocketConfig) {
    this.config = {
      reconnectInterval: 5000,
      onStateChange: () => {},
      ...config
    };
  }

  /**
   * Get current connection state
   */
  getState(): WebSocketState {
    return this.state;
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.state === 'connected' && this.ws?.readyState === WebSocket.OPEN;
  }

  /**
   * Initialize WebSocket connection
   */
  async connect(): Promise<void> {
    // Prevent duplicate connections
    if (this.ws?.readyState === WebSocket.OPEN || this.ws?.readyState === WebSocket.CONNECTING) {
      return;
    }

    this.setState('connecting');

    try {
      // Step 1: Register to get app key and event name
      const { appKey, eventName } = await this.register();

      // Step 2: Connect WebSocket
      this.connectWebSocket(appKey, eventName);
    } catch (error) {
      console.error('WebSocket connection failed:', error);
      this.setState('error');
      this.scheduleReconnect();
    }
  }

  /**
   * Register with the backend to get app key
   */
  private async register(): Promise<{ appKey: string; eventName: string }> {
    console.log('[WebSocket] Registering at:', this.config.registerEndpoint);

    const response = await fetch(this.config.registerEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Registration failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[WebSocket] Registration response:', data);

    const appKey = data.data?.app_key || data.app_key || data.key || 'local-app-key';
    const eventName = data.data?.event || data.event || 'SpotifyTrackUpdated';
    const channel = data.data?.channel || data.channel || this.config.channel;

    console.log('[WebSocket] Using app key:', appKey);
    console.log('[WebSocket] Expected event name:', eventName);
    console.log('[WebSocket] Expected channel:', channel);

    return { appKey, eventName };
  }

  /**
   * Establish WebSocket connection
   */
  private connectWebSocket(appKey: string, eventName: string): void {
    const wsUrl = this.config.wsEndpoint.replace('{app_key}', appKey);
    console.log('[WebSocket] Connecting to:', wsUrl);
    console.log('[WebSocket] Will listen for event:', eventName);

    this.dynamicEventName = eventName;
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      this.setState('connected');
      // Subscribe to channel
      this.subscribe(this.config.channel);
    };

    this.ws.onmessage = event => {
      this.handleMessage(event.data);
    };

    this.ws.onclose = event => {
      this.setState('disconnected');
      // Auto reconnect unless it was intentional
      if (!event.wasClean) {
        this.scheduleReconnect();
      }
    };

    this.ws.onerror = error => {
      console.error('WebSocket error:', error);
      this.setState('error');
    };
  }

  /**
   * Subscribe to a channel (Pusher protocol)
   */
  private subscribe(channel: string): void {
    console.log('[WebSocket] Subscribing to channel:', channel);

    if (!this.isConnected()) {
      console.warn('[WebSocket] Cannot subscribe: not connected');
      return;
    }

    const message: PusherMessage = {
      event: 'pusher:subscribe',
      data: JSON.stringify({ channel })
    };

    const payload = JSON.stringify(message);
    console.log('[WebSocket] Sending subscribe message:', payload);

    this.ws?.send(payload);
  }

  /**
   * Handle incoming WebSocket messages
   */
  private handleMessage(data: string): void {
    // Log ALL messages with a visible marker
    console.log('🔴 [WebSocket] RAW MESSAGE:', data);
    console.log('='.repeat(80));

    try {
      const message: PusherMessage = JSON.parse(data);
      console.log('[WebSocket] Parsed message:', message);

      // Handle Pusher protocol events
      if (message.event === 'pusher:connection_established') {
        console.log('[WebSocket] Connection established');
        return;
      }

      if (message.event === 'pusher:ping') {
        console.log('[WebSocket] Ping received, sending pong');
        // Respond with pong
        this.ws?.send(JSON.stringify({ event: 'pusher:pong' }));
        return;
      }

      // Skip internal events
      if (message.event.startsWith('pusher_internal:')) {
        console.log('[WebSocket] Skipping internal event:', message.event);
        return;
      }

      // Log all available event handlers
      console.log('[WebSocket] Available handlers:', Object.keys(this.config.events));
      console.log('[WebSocket] Looking for handler for event:', message.event);
      console.log('[WebSocket] Dynamic event name from registration:', this.dynamicEventName);

      // ⭐ WILDCARD: Log ALL non-Pusher events for debugging
      if (!message.event.startsWith('pusher:')) {
        console.log('🎯 [WebSocket] CUSTOM EVENT DETECTED:', message.event);
        console.log('🎯 [WebSocket] Event data:', message.data);
        try {
          const parsedData = JSON.parse(message.data);
          console.log('🎯 [WebSocket] Parsed event data:', parsedData);
        } catch {
          console.log('🎯 [WebSocket] Could not parse event data as JSON');
        }
      }

      // Handle custom events
      // Try exact match first, then dynamic event name from registration
      let handler = this.config.events[message.event];

      // If no handler found and event matches dynamic name, use the first available handler
      if (!handler && this.dynamicEventName && message.event === this.dynamicEventName) {
        const handlerKeys = Object.keys(this.config.events);
        if (handlerKeys.length > 0) {
          console.log(
            '[WebSocket] Using dynamic event mapping:',
            message.event,
            '->',
            handlerKeys[0]
          );
          handler = this.config.events[handlerKeys[0]];
        }
      }

      if (handler) {
        console.log('[WebSocket] Handler found, parsing data:', message.data);
        const parsedData = JSON.parse(message.data);
        console.log('[WebSocket] Calling handler with parsed data:', parsedData);
        handler(parsedData);
      } else {
        console.warn('[WebSocket] No handler found for event:', message.event);
      }
    } catch (error) {
      console.error('[WebSocket] Failed to parse message:', error, 'Raw data:', data);
    }
  }

  /**
   * Update connection state
   */
  private setState(state: WebSocketState): void {
    this.state = state;
    this.config.onStateChange(state);
  }

  /**
   * Schedule reconnection attempt
   */
  private scheduleReconnect(): void {
    if (this.reconnectTimer) return;

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connect();
    }, this.config.reconnectInterval);
  }

  /**
   * Disconnect WebSocket
   */
  disconnect(): void {
    // Clear reconnect timer
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    // Close WebSocket
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    this.setState('disconnected');
  }

  /**
   * Send a message through WebSocket
   */
  send(event: string, data: unknown): void {
    if (!this.isConnected()) {
      console.warn('Cannot send message: WebSocket not connected');
      return;
    }

    const message: PusherMessage = {
      event,
      data: JSON.stringify(data)
    };

    this.ws?.send(JSON.stringify(message));
  }
}

// ===== Svelte Hook for WebSocket =====

export interface UseWebSocketReturn {
  state: WebSocketState;
  connect: () => Promise<void>;
  disconnect: () => void;
  send: (event: string, data: unknown) => void;
  isConnected: () => boolean;
}

/**
 * Create a WebSocket hook for Svelte components
 * Returns a reactive state and control functions
 */
export function createWebSocket(config: WebSocketConfig): UseWebSocketReturn {
  let managerState = $state<WebSocketState>('disconnected');
  const manager = new WebSocketManager({
    ...config,
    onStateChange: state => {
      managerState = state;
      config.onStateChange?.(state);
    }
  });

  return {
    get state(): WebSocketState {
      return managerState;
    },
    connect: () => manager.connect(),
    disconnect: () => manager.disconnect(),
    send: (event: string, data: unknown) => manager.send(event, data),
    isConnected: () => manager.isConnected()
  };
}

// ===== Spotify-specific WebSocket configuration =====

export const SPOTIFY_WEBSOCKET_CONFIG = {
  registerEndpoint: SPOTIFY_API.WS_REGISTER_ENDPOINT,
  wsEndpoint: `${WS_BASE_URL}/app/{app_key}`,
  channel: SPOTIFY_API.WS_CHANNEL
} as const;
