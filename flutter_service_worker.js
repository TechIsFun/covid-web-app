'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "/index.html": "78b46f57e607ee90566ebd25579a690b",
"/main.dart.js": "6a4b8e2143706884db437e867c000b7b",
"/icons/Icon-192.png": "fde2cddc4424cc122f939b77bbab9610",
"/icons/Icon-512.png": "c82a566865bbb7a5b21e344e6577b1f8",
"/manifest.json": "5bcee1151db694d24ed40cf99eb91593",
"/assets/LICENSE": "06adcf8b80f2dc06b4a3043cf3312c75",
"/assets/AssetManifest.json": "6fc3684c256969076b54757696462122",
"/assets/FontManifest.json": "01700ba55b08a6141f33e168c4a6c22f",
"/assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"/assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"/assets/assets/faq.json": "51abd069ebd7cf5ba6567595fb5fcac8"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request, {
          credentials: 'include'
        });
      })
  );
});
