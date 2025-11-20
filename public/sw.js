const STATIC_CACHE = 'fariz-static-v1';
const RUNTIME_CACHE = 'fariz-runtime-v1';

// Assets to cache for offline functionality
const STATIC_ASSETS = [
  '/',
  '/tools',
  '/index.html',
  '/src/main.ts',
  '/src/app.css',
  '/site.webmanifest',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/apple-touch-icon.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  // CSS and JS bundles will be cached dynamically
];

// API patterns that should NOT be cached
const IGNORED_PATTERNS = [
  /^https:\/\/analytics\.umami\.is/,
  /^https:\/\/fonts\.googleapis\.com/,
  /^https:\/\/fonts\.gstatic\.com/,
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker');

  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached successfully');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== RUNTIME_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip external API calls and analytics
  if (IGNORED_PATTERNS.some(pattern => pattern.test(url.href))) {
    return;
  }

  // Skip Chrome extensions
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  // For navigation requests (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          // Return cached version if available
          if (response) {
            console.log('[SW] Serving cached page:', request.url);
            return response;
          }

          // Otherwise fetch from network
          return fetch(request)
            .then((response) => {
              // Cache successful responses
              if (response.ok || response.status === 0) {
                const responseClone = response.clone();
                caches.open(RUNTIME_CACHE)
                  .then((cache) => {
                    cache.put(request, responseClone);
                  });
              }
              return response;
            })
            .catch(() => {
              // If network fails and it's a navigation request, serve the index.html
              console.log('[SW] Network failed, serving offline page');
              return caches.match('/');
            });
        })
    );
    return;
  }

  // For static assets (CSS, JS, images, icons)
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            console.log('[SW] Serving cached asset:', request.url);
            return response;
          }

          // Fetch from network and cache
          return fetch(request)
            .then((response) => {
              if (response.ok || response.status === 0) {
                const responseClone = response.clone();
                caches.open(RUNTIME_CACHE)
                  .then((cache) => {
                    cache.put(request, responseClone);
                  });
              }
              return response;
            });
        })
    );
  }
});

// Background sync for form submissions (optional future feature)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('[SW] Background sync triggered');
    // Handle background sync tasks here
  }
});

// Push notifications (for Pomodoro Timer)
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const options = event.data.json();

  event.waitUntil(
    self.registration.showNotification(options.title, {
      body: options.body,
      icon: options.icon || '/favicon.ico',
      badge: '/favicon-32x32.png',
      vibrate: [200, 100, 200],
      requireInteraction: true,
      actions: [
        {
          action: 'open',
          title: 'Open Timer'
        }
      ]
    })
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      self.clients.openWindow('/tools/pomodoro-timer')
    );
  }
});

// Message handling for cache management
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CACHE_UPDATE') {
    // Manual cache update request
    event.waitUntil(
      caches.open(RUNTIME_CACHE)
        .then((cache) => {
          return cache.add(event.data.url);
        })
    );
  }
});