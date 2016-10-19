var contentImgsCache = 'pictr-content-imgs';

function servePhoto(req) {
  var storageUrl = req.url;
  return caches.open(contentImgsCache).then(function(cache) {
    return cache.match(storageUrl).then(function (res) {
      if (res) return res;

      return fetch(req).then(function (netResponse) {
        cache.put(storageUrl, netResponse.clone());
        return netResponse;
      }).catch(function (err) {
        console.error('dang', err);
      });
    })
  });
}

self.addEventListener('activate', function (event) {
  console.log('sw activated by sheniff');

  event.waitUntil(
    caches.open(contentImgsCache).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            return cache.delete(existingRequest);
          })
        );
      });
    })
  );
});

self.addEventListener('fetch', function (event) {
  var requestUrl = new URL(event.request.url);

  if(requestUrl.host === 'i.imgur.com') {
    event.respondWith(servePhoto(event.request));
    return;
  }
});
