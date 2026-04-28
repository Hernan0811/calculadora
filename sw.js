const CACHE_NAME = 'jessica-app-v1';

self.addEventListener('install', (e) => {
  console.log('Instalando App...');
});

self.addEventListener('fetch', (e) => {
  // Esto permite que la app funcione incluso si hay mala conexión
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});