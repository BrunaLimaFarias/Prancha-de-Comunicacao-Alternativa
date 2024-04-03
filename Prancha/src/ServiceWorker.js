// ServiceWorker define quais arquivos devem ficar disponiveis offline

self.addEventListener("install", e => {
    console.log("Install!");
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll([
                "./",
                "./prancha.html",
                "./css/index.css",
                "./js/adiciona-item.js",
                "./img/logo.png"]);
        })
    );
  });
  
  self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
  });