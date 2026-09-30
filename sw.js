/* Service worker PWA Reunion IKU 1/97
 * Tukar VERSI setiap kali deploy kemas kini supaya telefon ambil fail baharu. */
const VERSI = 'iku97-v1.0.0';
const ASET = ['./', './index.html', './config.js', './manifest.json',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSI).then(c => c.addAll(ASET)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSI).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Fon Google: cache dahulu
  if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.open(VERSI).then(c => c.match(req).then(hit => hit ||
      fetch(req).then(res => { c.put(req, res.clone()); return res; }))));
    return;
  }
  if (url.origin !== self.location.origin) return; // API Apps Script terus ke rangkaian

  // Fail app: rangkaian dahulu (supaya kemas kini cepat), cache jika luar talian
  e.respondWith(fetch(req)
    .then(res => { const salin = res.clone(); caches.open(VERSI).then(c => c.put(req, salin)); return res; })
    .catch(() => caches.match(req).then(hit => hit || caches.match('./index.html'))));
});
