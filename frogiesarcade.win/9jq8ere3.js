var $lumenjetConductor;
( () => {
    var e = {
        932(e, t, r) {
            r.d(t, {
                j: () => s
            });
            let o = null;
            async function s(e) {
                if (e instanceof ReadableStream) {
                    if (function() {
                        if (null !== o)
                            return o;
                        try {
                            let e = new ReadableStream
                              , t = new MessageChannel;
                            t.port1.postMessage(e, [e]),
                            t.port1.close(),
                            t.port2.close(),
                            o = !0
                        } catch {
                            o = !1
                        }
                        return o
                    }())
                        return [e, [e]];
                    let t = await new Response(e).arrayBuffer();
                    return [t, [t]]
                }
                return e instanceof ArrayBuffer ? [e, [e]] : [e, []]
            }
        },
        805(e, t, r) {
            r.d(t, {
                C: () => o
            });
            class o {
                methods;
                id;
                sendRaw;
                counter = 0;
                promiseCallbacks = new Map;
                constructor(e, t, r) {
                    this.methods = e,
                    this.id = t,
                    this.sendRaw = r
                }
                recieve(e) {
                    if (null == e || "object" != typeof e)
                        return;
                    let t = e[this.id];
                    if (null == t || "object" != typeof t)
                        return;
                    let r = t.$type;
                    if ("response" === r) {
                        let e = t.$token
                          , r = t.$data
                          , o = t.$error
                          , s = this.promiseCallbacks.get(e);
                        if (!s)
                            return;
                        this.promiseCallbacks.delete(e),
                        void 0 !== o ? s.reject(Error(o)) : s.resolve(r)
                    } else if ("request" === r) {
                        let e = t.$method
                          , r = t.$args;
                        this.methods[e](r).then(e => {
                            this.sendRaw({
                                [this.id]: {
                                    $type: "response",
                                    $token: t.$token,
                                    $data: e?.[0]
                                }
                            }, e?.[1])
                        }
                        ).catch(e => {
                            console.error(e),
                            this.sendRaw({
                                [this.id]: {
                                    $type: "response",
                                    $token: t.$token,
                                    $error: e?.toString() || "Unknown error"
                                }
                            }, [])
                        }
                        )
                    }
                }
                call(e, t, r=[]) {
                    let o = this.counter++;
                    return new Promise( (s, n) => {
                        this.promiseCallbacks.set(o, {
                            resolve: s,
                            reject: n
                        }),
                        this.sendRaw({
                            [this.id]: {
                                $type: "request",
                                $method: e,
                                $args: t,
                                $token: o
                            }
                        }, r)
                    }
                    )
                }
            }
        }
    }
      , t = {};
    function r(o) {
        var s = t[o];
        if (void 0 !== s)
            return s.exports;
        var n = t[o] = {
            exports: {}
        };
        return e[o](n, n.exports, r),
        n.exports
    }
    r.d = (e, t) => {
        for (var o in t)
            r.o(t, o) && !r.o(e, o) && Object.defineProperty(e, o, {
                enumerable: !0,
                get: t[o]
            })
    }
    ,
    r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t),
    r.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ;
    var o = {};
    ( () => {
        r.r(o),
        r.d(o, {
            route: () => l,
            shouldRoute: () => a
        });
        var e = r(805)
          , t = r(932);
        let s = {};
        addEventListener("message", e => {
            if (e.data && "object" == typeof e.data) {
                if (e.data.$hub$setCookieDone && "object" == typeof e.data.$hub$setCookieDone) {
                    let t = e.data.$hub$setCookieDone
                      , r = s[t.id];
                    r && (r(),
                    delete s[t.id])
                }
                if (e.data.$hub$initRemoteTransport && "object" == typeof e.data.$hub$initRemoteTransport) {
                    let {port: t, prefix: r} = e.data.$hub$initRemoteTransport
                      , o = i.find(e => new URL(r).pathname.startsWith(e.prefix));
                    if (!o)
                        return void console.error("No relevant conductor found for transport init");
                    o.rpc.call("initRemoteTransport", t, [t])
                }
            }
        }
        );
        class n {
            prefix;
            id;
            rpc;
            constructor(t, r, o) {
                this.prefix = t,
                this.id = r,
                this.rpc = new e.C({
                    sendSetCookie: async ({cookies: e, options: t}) => {
                        let r = await self.clients.matchAll()
                          , o = []
                          , n = []
                          , i = t?.destination === "document" || t?.destination === "iframe";
                        for (let a of r) {
                            let r = Math.random().toString(36).substring(2, 10);
                            o.push(r),
                            a.postMessage({
                                $conductor$setCookie: {
                                    cookies: e,
                                    options: t,
                                    id: r
                                }
                            }),
                            i || n.push(new Promise(e => {
                                s[r] = () => e(r)
                            }
                            ))
                        }
                        if (n.length > 0) {
                            let t, i = !1, a = new Promise(n => {
                                t = setTimeout( () => {
                                    if (!i) {
                                        let t = o.filter(e => void 0 !== s[e]);
                                        console.error(`timed out waiting for set cookie response (deadlock?): cookies=${e.length} clients=${r.length} pending=${t.length}/${o.length} clientUrls=${r.map(e => e.url).join(",")}`)
                                    }
                                    n()
                                }
                                , 1e3)
                            }
                            );
                            try {
                                await Promise.race([a, Promise.any(n).then( () => {
                                    i = !0
                                }
                                ).catch( () => {}
                                )])
                            } finally {
                                for (let e of (void 0 !== t && clearTimeout(t),
                                o))
                                    delete s[e]
                            }
                        }
                    }
                },"tabchannel-" + r, (e, t) => {
                    o.postMessage(e, t)
                }
                ),
                o.onmessage = e => {
                    this.rpc.recieve(e.data)
                }
                ,
                o.onmessageerror = console.error,
                this.rpc.call("ready", void 0)
            }
        }
        let i = [];
        function a(e) {
            let t = new URL(e.request.url);
            return void 0 !== i.find(e => t.pathname.startsWith(e.prefix))
        }
        async function l(e) {
            try {
                let r = new URL(e.request.url)
                  , o = i.find(e => r.pathname.startsWith(e.prefix))
                  , s = await clients.get(e.clientId)
                  , n = [...e.request.headers]
                  , [a,l] = await (0,
                t.j)(e.request.body)
                  , d = await o.rpc.call("request", {
                    rawUrl: e.request.url,
                    rawReferrer: e.request.referrer,
                    destination: e.request.destination,
                    mode: e.request.mode,
                    referrer: e.request.referrer,
                    method: e.request.method,
                    body: a,
                    cache: e.request.cache,
                    forceCrossOriginIsolated: !1,
                    initialHeaders: n,
                    rawClientUrl: s ? s.url : void 0,
                    clientId: e.clientId || e.resultingClientId
                }, l);
                return new Response(d.body,{
                    status: d.status,
                    statusText: d.statusText,
                    headers: d.headers
                })
            } catch (e) {
                return console.error("Service Worker error:", e),
                new Response("Internal Service Worker Error: " + e.message,{
                    status: 500
                })
            }
        }
        addEventListener("message", e => {
            if (!e.data || "object" != typeof e.data || !e.data.$conductor$init || "object" != typeof e.data.$conductor$init)
                return;
            let t = e.data.$conductor$init
              , r = i.findIndex(e => e.id === t.id);
            -1 !== r && i.splice(r, 1),
            i.push(new n(t.prefix,t.id,e.ports[0]))
        }
        ),
        addEventListener("install", () => {
            self.skipWaiting()
        }
        ),
        addEventListener("activate", e => {
            e.waitUntil(clients.claim())
        }
        ),
        setTimeout(async () => {
            for (let e of (console.log("service worker activated, notifying clients to revive"),
            await clients.matchAll()))
                e.postMessage({
                    $conductor$swrevive: {}
                })
        }
        , 100)
    }
    )(),
    $lumenjetConductor = o
}
)();
//# sourceMappingURL=conductor.sw.js.map
