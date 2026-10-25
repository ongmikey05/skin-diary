/* Skin Diary offline cache. After the first open, the whole app loads from the phone, no internet needed.
   Your diary itself (photos, notes, products) lives in the phone's app storage, never in this cache. */
const CACHE = 'skin-diary-10e02aeab0';
const FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './fraunces.woff2',
  './icon-v2-180.png',
  './icon-v2-192.png',
  './icon-v2-512.png',
  './icon-v2-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('skin-diary-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache first, so the app opens instantly and offline. Quietly refresh in the background when online.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const key = req.mode === 'navigate' ? './index.html' : req;
    const cached = await cache.match(key, { ignoreSearch: true });
    const network = fetch(req).then(res => {
      if (res && res.ok && res.type === 'basic') cache.put(key, res.clone());
      return res;
    }).catch(() => null);
    if (cached) { e.waitUntil(network); return cached; }
    return (await network) || new Response('Skin Diary is offline and this file was not saved yet.', { status: 503 });
  })());
});
