const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");
const { StaleWhileRevalidate } = require("workbox-strategies");

//takes an array of urls to precache
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  // asset caching
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  new StaleWhileRevalidate({
    // Name of the cache storage
    cacheName: "asset-cache",
    plugins: [
      // caches responses with headers with a max age of 30 days
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
