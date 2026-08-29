/*
 * Media cache for the hero video.
 *
 * Firebase already serves /media/* with `max-age=31536000, immutable`, so a
 * returning visitor normally gets the video from the HTTP cache. That cache is
 * best-effort though — the browser evicts it under storage pressure, and it is
 * cleared by "clear browsing data". Cache Storage is not evicted the same way,
 * so putting the 2.3 MB plate here makes the hero reliably instant on repeat
 * visits and available offline.
 *
 * Scope is deliberately tiny: only same-origin GETs under /media/ are
 * intercepted. HTML and the Next.js chunks are never touched, so this can
 * never serve a stale page or a stale bundle after a deploy.
 *
 * Bump CACHE when the media filenames change; `activate` drops every other
 * cache this origin owns.
 */

// Bump on every media change. The fetch handler is cache-first over /media/,
// so without a new cache name a returning visitor keeps being served the
// previous asset out of Cache Storage. `activate` deletes every other cache,
// which evicts the superseded files on the next visit.
const CACHE = "jerome-media-v3";

// Poster only — the hero video is deliberately NOT precached while it is
// ~21 MB. Precaching uses `cache: "reload"`, which forces a second full
// download on top of the one the <video> element is already making, so a
// first-time visitor would pull ~42 MB. Firebase serves mp4 with
// `max-age=31536000, immutable`, so repeat visits are already covered by the
// HTTP cache. Once the video is re-encoded to a sane web bitrate (~3 MB),
// add it back to this array.
const PRECACHE = ["/media/hero-poster-voice.jpg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      // Individually, not addAll: addAll rejects atomically, so one failed
      // asset would leave the visitor with no cache at all.
      .then((cache) =>
        Promise.all(
          PRECACHE.map((url) =>
            cache.add(new Request(url, { cache: "reload" })).catch(() => {})
          )
        )
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

/**
 * Media elements request byte ranges, and a cached 200 cannot answer a Range
 * request — Safari in particular refuses to play if it asks for a range and
 * gets a full body. So the full response is stored once and sliced here into
 * a proper 206.
 */
async function rangeResponse(cached, rangeHeader) {
  const buffer = await cached.arrayBuffer();
  const total = buffer.byteLength;

  const match = /bytes=(\d*)-(\d*)/.exec(rangeHeader);
  if (!match) return cached;

  const start = match[1] ? parseInt(match[1], 10) : 0;
  const end = match[2] ? parseInt(match[2], 10) : total - 1;

  if (Number.isNaN(start) || start >= total) {
    return new Response(null, {
      status: 416,
      headers: { "Content-Range": `bytes */${total}` },
    });
  }

  const last = Math.min(end, total - 1);
  return new Response(buffer.slice(start, last + 1), {
    status: 206,
    statusText: "Partial Content",
    headers: {
      "Content-Type": cached.headers.get("Content-Type") || "application/octet-stream",
      "Content-Range": `bytes ${start}-${last}/${total}`,
      "Content-Length": String(last - start + 1),
      "Accept-Ranges": "bytes",
    },
  });
}

async function serveMedia(request) {
  const cache = await caches.open(CACHE);

  // Keyed by URL, never by the ranged Request: one stored full response backs
  // every range the player asks for.
  const cached = await cache.match(request.url);

  if (cached) {
    const range = request.headers.get("range");
    return range ? rangeResponse(cached, range) : cached;
  }

  // Cache miss: pass straight through to the network.
  //
  // The previous version fetched the whole file here before answering, so a
  // player asking for the first few bytes had to wait for the entire download.
  // At ~21 MB that stalls the hero for the length of the download on a first
  // visit — the one visit where the impression matters most. Passing the
  // request through lets the browser stream and seek natively, and the
  // immutable HTTP cache still covers the visit after this one.
  return fetch(request);
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (!url.pathname.startsWith("/media/")) return;

  event.respondWith(serveMedia(request));
});
