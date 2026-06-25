const CACHE = 'opa-ventas-v1';
const SHELL = ['./','./index.html','./ventas.html','./ventas-reporte.html','./ventas_data.js','./auth.js','./manifest.webmanifest','./logo_opaustro.png','./EMPRESA.jpeg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==self.location.origin)return;e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(CACHE).then(ca=>ca.put(r,c));return res;}).catch(()=>caches.match(r).then(cached=>cached||caches.match('./index.html'))));});
