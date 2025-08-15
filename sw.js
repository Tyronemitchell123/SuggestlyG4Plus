// SUGGESTLY ELITE - Service Worker
// Provides caching, offline functionality, and performance optimization

const CACHE_NAME = 'suggestly-elite-v1.0.0';
const STATIC_CACHE = 'suggestly-static-v1.0.0';
const DYNAMIC_CACHE = 'suggestly-dynamic-v1.0.0';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/homepage-preview.html',
  '/homepage-view.html',
  '/pages/dashboard.html',
  '/pages/ai-models.html',
  '/pages/clients.html',
  '/pages/quantum-status.html',
  '/pages/live-data.html',
  '/performance-optimizations.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/chart.js',
];

// Install event - cache static files
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');

  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then(cache => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Service Worker: Static files cached');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Error caching static files:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different types of requests
  if (url.pathname === '/' || url.pathname.includes('.html')) {
    // HTML pages - cache first, then network
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else if (url.pathname.includes('.css') || url.pathname.includes('.js')) {
    // Static assets - cache first, then network
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else if (
    url.pathname.includes('.png') ||
    url.pathname.includes('.jpg') ||
    url.pathname.includes('.svg')
  ) {
    // Images - network first, then cache
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  } else if (
    url.origin === 'https://fonts.googleapis.com' ||
    url.origin === 'https://cdnjs.cloudflare.com'
  ) {
    // External resources - cache first, then network
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else {
    // API calls - network first, then cache
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  }
});

// Cache first strategy
async function cacheFirst(request, cacheName) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Cache first strategy failed:', error);
    return new Response('Offline content not available', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({
        'Content-Type': 'text/plain',
      }),
    });
  }
}

// Network first strategy
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Network first strategy failed:', error);

    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    return new Response('Offline content not available', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({
        'Content-Type': 'text/plain',
      }),
    });
  }
}

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Handle background sync
async function doBackgroundSync() {
  try {
    // Sync any pending data
    console.log('Service Worker: Performing background sync');

    // Example: Sync form submissions
    const pendingSubmissions = await getPendingSubmissions();
    for (const submission of pendingSubmissions) {
      await syncSubmission(submission);
    }

    console.log('Service Worker: Background sync completed');
  } catch (error) {
    console.error('Service Worker: Background sync failed:', error);
  }
}

// Get pending submissions from IndexedDB
async function getPendingSubmissions() {
  // Implementation for getting pending submissions
  return [];
}

// Sync submission to server
async function syncSubmission(submission) {
  // Implementation for syncing submission
  console.log('Syncing submission:', submission);
}

// Push notification handling
self.addEventListener('push', event => {
  console.log('Service Worker: Push notification received');

  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: 'explore',
        title: 'View Dashboard',
        icon: '/icon-192x192.png',
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icon-192x192.png',
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification('SUGGESTLY ELITE', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  console.log('Service Worker: Notification clicked');

  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(clients.openWindow('/pages/dashboard.html'));
  }
});

// Message handling for communication with main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Error handling
self.addEventListener('error', event => {
  console.error('Service Worker: Error occurred:', event.error);
});

// Unhandled rejection handling
self.addEventListener('unhandledrejection', event => {
  console.error('Service Worker: Unhandled rejection:', event.reason);
});
