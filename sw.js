const CACHE_NAME = 'applied-philosophy-v2';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/main.js',
    'https://cdn.jsdelivr.net/npm/chart.js@3.7.0/dist/chart.min.js',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap'
];

// Helper to filter valid cacheable requests
const isValidRequest = (request) => {
    const url = new URL(request.url);
    // Cache our own origin and specific CDNs
    return url.origin === self.location.origin ||
        url.hostname === 'cdn.tailwindcss.com' ||
        url.hostname === 'cdn.jsdelivr.net' ||
        url.hostname === 'fonts.googleapis.com' ||
        url.hostname === 'fonts.gstatic.com';
};

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                // We don't want to fail everything if one simple asset fails, 
                // but for critical ones we should ensure they are cached.
                // sections/ are many files, let's cache them on demand (runtime caching)
                // to avoid a massive initial download if not needed immediately,
                // BUT the goal is performance, so let's stick to core assets here.
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    if (!isValidRequest(event.request)) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }

                // Clone the request because it's a stream and can only be consumed once
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    (response) => {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic' && response.type !== 'cors') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});
