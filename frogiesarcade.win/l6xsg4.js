importScripts("/za9eu/9jq8ere3.js");

const PREFIX = "/7f5m14/171y8v/";
const REVIVE_TIMEOUT = 10000;

self.skipWaiting();
addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

addEventListener("message", (event) => {
	if (event.data === "$keepalive$" && event.source) event.source.postMessage("$keepalive$");
});

async function revive() {
	const windows = await self.clients.matchAll({ includeUncontrolled: true, type: "window" });
	for (const client of windows) client.postMessage({ $conductor$swrevive: {} });
}

async function routeWhenRevived(event) {
	const deadline = Date.now() + REVIVE_TIMEOUT;
	while (Date.now() < deadline) {
		await revive();
		for (let i = 0; i < 20; i++) {
			await new Promise((resolve) => setTimeout(resolve, 50));
			if ($lumenjetConductor.shouldRoute(event)) return $lumenjetConductor.route(event);
		}
	}
	return new Response("proxy session expired - reload the page", {
		status: 503,
		headers: { "Content-Type": "text/plain; charset=UTF-8" },
	});
}

addEventListener("fetch", (event) => {
	if ($lumenjetConductor.shouldRoute(event)) {
		event.respondWith($lumenjetConductor.route(event));
		return;
	}
	if (new URL(event.request.url).pathname.startsWith(PREFIX))
		event.respondWith(routeWhenRevived(event));
});
