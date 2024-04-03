// ServiceWorker define quais arquivos devem ficar disponiveis offline

const staticPrancha = "tcc_prancha_caa";

const assets = [
    "./",
    "./prancha.html",
    "./css/index.css",
    "./js/adiciona-item.js",
    "./img/logo.png"
]


self.addEventListener("install", installEvent => {
    console.log("Install!");
    installEvent.waitUntil(
        caches.open(staticPrancha).then(cache => {
            return cache.addAll(assets);
        })
    );
  });
  
  self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(response => {
            return response || fetch(fetchEvent.request);
        })
    );
  });