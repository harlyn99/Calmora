// Calmora Service Worker - PWA with Offline Support & Background Sync
const CACHE_NAME = 'calmora-v1'
const OFFLINE_URL = '/offline.html'

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/dashboard',
  '/todo',
  '/journal',
  '/planner',
  '/habits',
  '/mood',
  '/goals',
  '/notes',
  '/cute-pet',
  '/stats',
  '/review'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Caching static assets')
      return cache.addAll(STATIC_ASSETS)
    })
  )
  // Force activation immediately
  self.skipWaiting()
})

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    })
  )
  // Claim all clients immediately
  self.clients.claim()
})

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return

  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) return

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone response for cache
        const responseClone = response.clone()
        
        // Cache successful responses
        if (response.status === 200) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone)
          })
        }
        
        return response
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse
          }
          
          // Show offline page for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match(OFFLINE_URL)
          }
          
          // Return empty response for other requests
          return new Response('Offline', { status: 503 })
        })
      })
  )
})

// Background Sync for data sync
self.addEventListener('sync', (event) => {
  console.log('[ServiceWorker] Sync event triggered:', event.tag)
  
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData())
  }
})

// Background sync function
async function syncData() {
  try {
    // Get pending sync operations from IndexedDB or localStorage
    const pendingSyncs = await getPendingSyncs()
    
    if (pendingSyncs.length === 0) {
      console.log('[ServiceWorker] No pending syncs')
      return
    }

    console.log('[ServiceWorker] Syncing', pendingSyncs.length, 'operations')

    // Process each pending sync
    for (const operation of pendingSyncs) {
      try {
        await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(operation)
        })
        
        // Remove successful operation from pending
        await removePendingSync(operation.id)
      } catch (error) {
        console.error('[ServiceWorker] Failed to sync operation:', operation.id, error)
      }
    }

    // Notify clients that sync is complete
    const clients = await self.clients.matchAll()
    clients.forEach((client) => {
      client.postMessage({
        type: 'SYNC_COMPLETE',
        timestamp: new Date().toISOString()
      })
    })

  } catch (error) {
    console.error('[ServiceWorker] Sync failed:', error)
  }
}

// Helper functions for pending syncs (using IndexedDB would be better)
async function getPendingSyncs() {
  // For now, return empty array - will be implemented with full backend
  return []
}

async function removePendingSync(id) {
  // For now, no-op - will be implemented with full backend
}

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data?.text() || 'New notification from Calmora',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'open',
        title: 'Open Calmora',
        icon: '/icon-192.png'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('Calmora', options)
  )
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'open') {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        // Focus existing window if available
        for (const client of clientList) {
          if (client.url === '/dashboard' && 'focus' in client) {
            return client.focus()
          }
        }
        // Open new window if none available
        if (clients.openWindow) {
          return clients.openWindow('/dashboard')
        }
      })
    )
  }
})

// Message handler for skip waiting
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

console.log('[ServiceWorker] Service Worker loaded')
