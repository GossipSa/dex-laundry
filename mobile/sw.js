const CACHE='dex-mobile-v14-20261126-notices';
const ROOT=new URL('../',self.location.href);
const CORE=['mobile/','mobile/index.html','mobile/manifest.webmanifest','mobile/icon-192.png','assets/home.webp','assets/laundry.webp','assets/board.webp','assets/reception.webp','assets/rest.webp','assets/storage.webp','assets/dex-start.png','assets/portrait.jpg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE.map(p=>new URL(p,ROOT).href))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('dex-mobile-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==ROOT.origin||!u.pathname.startsWith(ROOT.pathname)||r.headers.has('range'))return;
if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(new URL('mobile/',ROOT).href,copy))}return res}).catch(()=>caches.match(new URL('mobile/',ROOT).href)));return}
e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok&&res.status===200){const copy=res.clone();caches.open(CACHE).then(c=>c.put(r,copy))}return res})))});
