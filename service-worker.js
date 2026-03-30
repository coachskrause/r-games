// service-worker.js

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open('calendar-cache').then(cache =>
      cache.match(event.request).then(response => {
        return (
          response ||
          fetch(event.request).then(networkResponse => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
        );
      })
    )
  );
});
