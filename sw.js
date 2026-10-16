// Canvas web — il service worker: tiene il sito su questo dispositivo, così si apre anche senza Internet e si installa
// come app (manifest.webmanifest). avvio/web.mjs ci scrive la versione (l'impronta di tutti i file) e l'elenco dei file.
// Una versione nuova: il browser vede che sw.js è cambiato e la scarica intera in una cache nuova, chiedendo ogni file al
// sito e non alla sua memoria (se un file non arriva resta quella di prima, intera); poi prende il posto della vecchia. La
// pagina già aperta continua con la sua: la nuova si usa dalla prossima apertura. Passano di qui solo i file del sito (GET
// della stessa origine): i tracker, i relè e il resto della rete no.
const VERSIONE = "1aab8624cd2f";
const FILE = ["./","LICENZE.txt","canvas.css","canvas.js","caratteri/bricolage-grotesque-latin-600-normal.woff2","caratteri/bricolage-grotesque-latin-700-normal.woff2","caratteri/bricolage-grotesque-latin-ext-600-normal.woff2","caratteri/bricolage-grotesque-latin-ext-700-normal.woff2","caratteri/ibm-plex-sans-latin-400-normal.woff2","caratteri/ibm-plex-sans-latin-500-normal.woff2","caratteri/ibm-plex-sans-latin-600-normal.woff2","caratteri/ibm-plex-sans-latin-ext-400-normal.woff2","caratteri/ibm-plex-sans-latin-ext-500-normal.woff2","caratteri/ibm-plex-sans-latin-ext-600-normal.woff2","caratteri/jetbrains-mono-latin-400-normal.woff2","caratteri/jetbrains-mono-latin-500-normal.woff2","caratteri/jetbrains-mono-latin-ext-400-normal.woff2","caratteri/jetbrains-mono-latin-ext-500-normal.woff2","favicon.ico","icone/canvas-192.png","icone/canvas-512.png","icone/canvas-maskable-512.png","index.html","manifest.webmanifest"];
const CACHE = 'canvas-' + VERSIONE;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILE.map(f => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('canvas-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== self.location.origin) return;
  // dalla cache (le pagine anche coi parametri: ?collaudo…); quello che non c'è, dal sito; senza rete, la pagina di Canvas
  e.respondWith(caches.open(CACHE).then(async c => (await c.match(r, { ignoreSearch: true })) || fetch(r).catch(async err => (r.mode === 'navigate' && await c.match('./')) || Promise.reject(err))));
});
