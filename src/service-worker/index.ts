/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope
import { build, files, version } from '$service-worker'

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`

const ASSETS = [
    ...build, // the app itself
    ...files, // everything in `static`
]

// install service worker
self.addEventListener('install', (event) => {
    // Create a new cache and add all files to it
    async function addFilesToCache() {
        const cache = await caches.open(CACHE)
        await cache.addAll(ASSETS)
    }
    event.waitUntil(addFilesToCache())
})

// activate service worker
self.addEventListener('activate', (event) => {
    // Remove previous cached data from disk
    async function deleteOldCaches() {
        for (const key of await caches.keys()) {
            if (key !== CACHE) await caches.delete(key)
        }
    }
    event.waitUntil(deleteOldCaches())
})

// fetch service worker
self.addEventListener('fetch', (event) => {
    // ignore POST requests etc
    if (event.request.method !== 'GET') return

    async function respond() {
        const url = new URL(event.request.url)
        const cache = await caches.open(CACHE)
        // check if the requested resource can be found in the cache
        if (ASSETS.includes(url.pathname)) {
            const response = await cache.match(url.pathname)
            // if we found cached files, respond with them
            if (response) {
                return response
            }
        }

        try {
            // if we can't find the resource in the cache, try to connect to the network
            const response = await fetch(event.request)
            // if we're offline, fetch can return a value that is not a Response
            // instead of throwing - and we can't pass this non-Response to respondWith
            if (!(response instanceof Response)) {
                throw new Error('invalid response from fetch')
            }
            if (response.status === 200) {
                cache.put(event.request, response.clone())
            }
            return response
        } catch (err) {
            // fall back to the cache if we're offline
            const response = await cache.match(event.request)
            if (response) {
                return response
            }
            // if there's no cache, then just error out
            // as there is nothing we can do to respond to this request
            throw err
        }
    }
    event.respondWith(respond())
})

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting()
    }
})
