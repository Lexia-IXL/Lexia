var $lumenjetConductor;
( () => {
    var e = {
        286(e, t, r) {
            r.d(t, {
                I: () => o
            });
            let o = Symbol.for("conductor frame handle")
        },
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
        355(e, t, r) {
            r.d(t, {
                O: () => s,
                x: () => o
            });
            let o = "0.0.14";
            function s() {
                if ("undefined" == typeof $lumenjet)
                    throw Error("lantern-core is not loaded. Load lumenjet before the conductor.");
                var e = "2.0.67-alpha.2"
                  , t = $lumenjet.versionInfo.version;
                if (e !== t)
                    throw Error(`lantern-core version mismatch: this build expects ${e}, but the loaded runtime is ${t}`)
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
        },
        986(e) {
            let t = Object.getPrototypeOf({});
            function r() {
                return function(e) {
                    return "object" == typeof e && null !== e && !(e instanceof RegExp) && !(e instanceof Date)
                }
            }
            function o(e) {
                function o(e) {
                    return "constructor" !== e && "prototype" !== e && "__proto__" !== e
                }
                let s = Object.prototype.propertyIsEnumerable
                  , n = e?.symbols ? function(e) {
                    let t = Object.keys(e)
                      , r = Object.getOwnPropertySymbols(e);
                    for (let o = 0, n = r.length; o < n; ++o)
                        s.call(e, r[o]) && t.push(r[o]);
                    return t
                }
                : Object.keys
                  , i = "function" == typeof e?.cloneProtoObject ? e.cloneProtoObject : void 0
                  , a = "function" == typeof e?.isMergeableObject ? e.isMergeableObject : r()
                  , c = e?.onlyDefinedProperties === !0
                  , l = e && "function" == typeof e.mergeArray ? e.mergeArray({
                    clone: d,
                    deepmerge: h,
                    getKeys: n,
                    isMergeableObject: a
                }) : function(e, t) {
                    let r = e.length
                      , o = t.length
                      , s = 0
                      , n = Array(r + o);
                    for (; s < r; ++s)
                        n[s] = d(e[s]);
                    for (s = 0; s < o; ++s)
                        n[s + r] = d(t[s]);
                    return n
                }
                ;
                function d(e) {
                    return a(e) ? Array.isArray(e) ? function(e) {
                        let t = 0
                          , r = e.length
                          , o = Array(r);
                        for (; t < r; ++t)
                            o[t] = d(e[t]);
                        return o
                    }(e) : function(e) {
                        let r, s, a, c = {};
                        if (i && Object.getPrototypeOf(e) !== t)
                            return i(e);
                        let l = n(e);
                        for (r = 0,
                        s = l.length; r < s; ++r)
                            o(a = l[r]) && (c[a] = d(e[a]));
                        return c
                    }(e) : e
                }
                function h(e, r) {
                    if (c && void 0 === r)
                        return d(e);
                    let s = Array.isArray(r)
                      , f = Array.isArray(e);
                    return "object" != typeof r || null === r ? r : a(e) ? s && f ? l(e, r) : s !== f ? d(r) : function(e, r) {
                        let s, l, f, u = {}, p = n(e), y = n(r);
                        for (s = 0,
                        l = p.length; s < l; ++s)
                            o(f = p[s]) && -1 === y.indexOf(f) && (u[f] = d(e[f]));
                        for (s = 0,
                        l = y.length; s < l; ++s)
                            if (o(f = y[s]))
                                if (f in e)
                                    -1 !== p.indexOf(f) && (i && a(r[f]) && Object.getPrototypeOf(r[f]) !== t ? u[f] = i(r[f]) : u[f] = h(e[f], r[f]));
                                else {
                                    if (c && void 0 === r[f])
                                        continue;
                                    u[f] = d(r[f])
                                }
                        return u
                    }(e, r) : d(r)
                }
                return e?.all ? function() {
                    let e;
                    switch (arguments.length) {
                    case 0:
                        return {};
                    case 1:
                        return d(arguments[0]);
                    case 2:
                        return h(arguments[0], arguments[1])
                    }
                    for (let t = 0, r = arguments.length; t < r; ++t)
                        e = h(e, arguments[t]);
                    return e
                }
                : h
            }
            e.exports = o,
            e.exports.default = o,
            e.exports.deepmerge = o,
            Object.defineProperty(e.exports, "isMergeableObject", {
                get: r
            })
        },
        235(e, t, r) {
            r.d(t, {
                Sr: () => s
            }),
            WebSocket.CLOSED,
            WebSocket.CONNECTING,
            WebSocket.OPEN,
            EventTarget;
            let o = [101, 204, 205, 304];
            class s extends Response {
                url;
                rawHeaders;
                redirected = !1;
                static fromTransferrableResponse(e, t) {
                    let r = new s(o.includes(e.status) ? void 0 : e.body,{
                        headers: new Headers(e.headers),
                        status: e.status,
                        statusText: e.statusText
                    });
                    return r.url = t,
                    r.redirected = e.status >= 300 && e.status < 400 && void 0 !== e.headers.location,
                    r.rawHeaders = e.headers,
                    r
                }
                static fromNativeResponse(e) {
                    let t = new s(o.includes(e.status) ? void 0 : e.body,{
                        headers: e.headers,
                        status: e.status,
                        statusText: e.statusText
                    });
                    return t.url = e.url,
                    t.rawHeaders = [...e.headers],
                    t.redirected = e.redirected,
                    t
                }
            }
        },
        423(e, t, r) {
            r.d(t, {
                Cx: () => u,
                Oy: () => z,
                cP: () => s,
                ht: () => V,
                k_: () => i,
                mK: () => d,
                sb: () => y,
                uh: () => f
            });
            let {DuctResponse: o, CookieJar: s, IncrementalHtmlRewriter: n, Plugin: i, LUMENJETCLIENT: a, LUMENJETCLIENTNAME: c, LumenjetClient: l, LumenjetFetchHandler: d, LumenjetFetchTrackedClient: h, LumenjetHeaders: f, Tap: u, createLocationProxy: p, defaultConfig: y, defaultConfigDev: m, flagEnabled: g, getOwnPropertyDescriptorHandler: w, getRewriter: k, getScriptBlockTypeString: b, htmlRules: S, isArchiveMimeType: j, isAudioOrVideoMimeType: v, isFontMimeType: C, isHtmlMimeType: x, isImageMimeType: $, isInlineDisplayableMimeType: P, isJavascriptMimeType: O, isJavascriptMimeTypeEssenceMatch: R, isModuleScriptType: A, isScriptType: E, isScriptableMimeType: M, isXmlMimeType: U, isZipBasedMimeType: T, isdedicated: W, isshared: D, issw: _, iswindow: L, isworker: I, parseMimeType: N, rewriteBlob: J, rewriteCss: H, rewriteHtml: q, rewriteJs: B, rewriteJsInner: F, rewriteSrcset: K, rewriteUrl: z, rewriteWorkers: G, setWasm: V, unrewriteBlob: Q, unrewriteCss: X, unrewriteHtml: Y, unrewriteUrl: Z, versionInfo: ee} = globalThis.$lumenjet
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
    r.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return r.d(t, {
            a: t
        }),
        t
    }
    ,
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
            Conductor: () => $,
            Frame: () => P,
            ManagedPlugin: () => p,
            VERSION: () => c.x,
            assertRuntimeLumenjetVersion: () => c.O,
            config: () => h
        });
        var e = r(805)
          , t = r(932)
          , s = r(235)
          , n = r(986)
          , i = r(423)
          , a = r(286)
          , c = r(355);
        let l = "/0d69cd/8uo1ah31aj.js"
          , d = "k8u8c96yzv.js"
          , h = {
            prefix: "/7f5m14/171y8v/",
            lumenjetPath: "/toj9sr/xlsdptsb8u.js",
            injectPath: l,
            wasmPath: "/gz1yfh/6la4t8nblm.wasm",
            virtualWasmPath: d,
            codec: {
                encode: e => {
                    if (!e)
                        return e;
                    let t = new TextEncoder().encode(e)
                      , r = "";
                    for (let e = 0; e < t.length; e++)
                        r += String.fromCharCode(t[e]);
                    return btoa(r).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
                }
                ,
                decode: e => {
                    if (!e)
                        return e;
                    let t = atob(e.replace(/-/g, "+").replace(/_/g, "/"))
                      , r = new Uint8Array(t.length);
                    for (let e = 0; e < t.length; e++)
                        r[e] = t.charCodeAt(e);
                    return new TextDecoder().decode(r)
                }
            }
        }
          , f = l.split("/").pop() || l
          , u = {
            flags: {
                ...i.sb.flags,
                allowFailedIntercepts: !0
            },
            maskedfiles: [f, d]
        };
        class p extends i.k_ {
            frame = null;
            dependencies = [];
            constructor(e, t) {
                super(e),
                this.dependencies = t
            }
            install(e) {
                this.frame = e
            }
        }
        let y = "state"
          , m = "cookies"
          , g = null;
        function w(e) {
            return "object" == typeof e && null !== e && "number" == typeof e.updatedAt && Number.isFinite(e.updatedAt) && "string" == typeof e.cookies ? e : null
        }
        function k(e) {
            return new Promise( (t, r) => {
                e.onsuccess = () => t(e.result),
                e.onerror = () => r(e.error ?? Error("IndexedDB request failed"))
            }
            )
        }
        function b(e) {
            return new Promise( (t, r) => {
                e.oncomplete = () => t(),
                e.onabort = () => r(e.error ?? Error("IndexedDB transaction aborted")),
                e.onerror = () => r(e.error ?? Error("IndexedDB transaction failed"))
            }
            )
        }
        function S() {
            return g || (g = new Promise( (e, t) => {
                let r = indexedDB.open("__lumenjet_conductor", 1);
                r.onupgradeneeded = () => {
                    let e = r.result;
                    e.objectStoreNames.contains(y) || e.createObjectStore(y)
                }
                ,
                r.onsuccess = () => e(r.result),
                r.onerror = () => t(r.error ?? Error("Failed to open cookie database"))
            }
            ))
        }
        async function j() {
            try {
                let e = (await S()).transaction(y, "readonly")
                  , t = e.objectStore(y)
                  , r = await k(t.get(m));
                return await b(e),
                w(r)
            } catch (e) {
                return console.error("Failed to read persisted conductor cookies:", e),
                null
            }
        }
        async function v(e, t) {
            try {
                let r = (await S()).transaction(y, "readwrite")
                  , o = r.objectStore(y)
                  , s = w(await k(o.get(m)))
                  , n = Math.max(Date.now(), t + 1, (s?.updatedAt ?? 0) + 1);
                return o.put({
                    updatedAt: n,
                    cookies: e
                }, m),
                await b(r),
                n
            } catch (e) {
                return console.error("Failed to persist conductor cookies:", e),
                t
            }
        }
        function C() {
            return Math.random().toString(36).substring(2, 10)
        }
        let x = (0,
        n.deepmerge)();
        class $ {
            init;
            id;
            config;
            lumenjetConfig;
            prefix;
            cookieJar = new i.cP;
            frames = [];
            serviceWorkerConductor;
            guardServiceWorkerRevive = !0;
            ready;
            readyResolve;
            isReady = !1;
            rpc;
            port = null;
            transport;
            cookieUpdatedAt = 0;
            cookieSyncPromise = null;
            cookieSyncDirty = !0;
            cookieSyncChannel = new BroadcastChannel("__lumenjet_conductor_channel");
            wasmAlreadyFetched = !1;
            wasmPayload = null;
            onTabChannelMessage = e => {
                this.rpc.recieve(e.data)
            }
            ;
            onCookieSyncMessage = e => {
                let t = "object" == typeof e.data && null !== e.data ? e.data.updatedAt : void 0;
                "number" != typeof t || t <= this.cookieUpdatedAt || (this.cookieSyncDirty = !0,
                this.loadSavedCookies())
            }
            ;
            async loadLumenjetWasm() {
                if (this.wasmAlreadyFetched)
                    return;
                let e = await fetch(this.config.wasmPath);
                (0,
                i.ht)(await e.arrayBuffer()),
                this.wasmAlreadyFetched = !0
            }
            methods = {
                ready: async () => {
                    this.readyResolve(),
                    setTimeout( () => {
                        this.guardServiceWorkerRevive = !1
                    }
                    , 5e3)
                }
                ,
                request: async e => {
                    let r = new URL(e.rawUrl).pathname
                      , o = this.frames.find(e => r.startsWith(e.prefix));
                    if (!o)
                        throw Error("No frame found for request");
                    try {
                        if (await this.loadSavedCookies(),
                        r === o.prefix + this.config.virtualWasmPath) {
                            if (!this.wasmPayload) {
                                let e = await fetch(this.config.wasmPath)
                                  , t = await e.arrayBuffer()
                                  , r = btoa(new Uint8Array(t).reduce( (e, t) => (e.push(String.fromCharCode(t)),
                                e), []).join(""));
                                this.wasmPayload = `self.WASM = '${r}';`
                            }
                            return [{
                                body: this.wasmPayload,
                                status: 200,
                                statusText: "OK",
                                headers: [["Content-Type", "application/javascript"]]
                            }, []]
                        }
                        let s = i.uh.fromRawHeaders(e.initialHeaders)
                          , n = await o.fetchHandler.handleFetch({
                            initialHeaders: s,
                            rawClientUrl: e.rawClientUrl ? new URL(e.rawClientUrl) : void 0,
                            rawUrl: new URL(e.rawUrl),
                            rawReferrer: e.rawReferrer,
                            rawDestination: e.destination,
                            method: e.method,
                            mode: e.mode,
                            referrer: e.referrer,
                            body: e.body,
                            cache: e.cache,
                            clientId: e.clientId
                        })
                          , [a,c] = await (0,
                        t.j)(n.body);
                        return [{
                            body: a,
                            status: n.status,
                            statusText: n.statusText,
                            headers: n.headers.toRawHeaders()
                        }, c]
                    } catch (r) {
                        let t = {
                            setResponse: void 0,
                            suppressError: !1
                        };
                        if (await i.Cx.dispatch(o.hooks.error.request, {
                            rawrequest: e,
                            error: r
                        }, t),
                        t.suppressError || console.error("Error in conductor request handler:", r),
                        t.setResponse)
                            return [t.setResponse, []];
                        throw r
                    }
                }
                ,
                initRemoteTransport: async r => {
                    let o = new e.C({
                        request: async ({remote: e, method: r, body: o, headers: s}) => {
                            let n = await this.transport.request(new URL(e), r, o, s, void 0)
                              , [i,a] = await (0,
                            t.j)(n.body);
                            return n.body = i,
                            [n, a]
                        }
                        ,
                        sendSetCookie: async ({cookies: e, options: t}) => {
                            await this.loadSavedCookies(!0),
                            t?.clear && this.cookieJar.clear(),
                            this.applyCookieSyncEntries(e),
                            await this.persistCookies(),
                            await this.propagateCookieSync(e, t)
                        }
                        ,
                        connect: async ({url: e, protocols: t, requestHeaders: r, port: o}) => {
                            let s, n = new Promise(e => s = e), [i,a] = this.transport.connect(new URL(e), t, r, (e, t) => {
                                s({
                                    result: "success",
                                    protocol: e,
                                    extensions: t
                                })
                            }
                            , e => {
                                o.postMessage({
                                    type: "data",
                                    data: e
                                }, e instanceof ArrayBuffer ? [e] : [])
                            }
                            , (e, t) => {
                                o.postMessage({
                                    type: "close",
                                    code: e,
                                    reason: t
                                })
                            }
                            , e => {
                                s({
                                    result: "failure",
                                    error: e
                                })
                            }
                            );
                            return o.onmessageerror = e => {
                                console.error("Transport port messageerror (this should never happen!)", e)
                            }
                            ,
                            o.onmessage = ({data: e}) => {
                                "data" === e.type ? i(e.data) : "close" === e.type && a(e.code, e.reason)
                            }
                            ,
                            [await n, []]
                        }
                    },"transport", (e, t) => r.postMessage(e, t));
                    r.onmessageerror = e => {
                        console.error("Transport port messageerror (this should never happen!)", e)
                    }
                    ,
                    r.onmessage = e => {
                        o.recieve(e.data)
                    }
                    ,
                    o.call("ready", void 0, [])
                }
            };
            constructor(t) {
                this.init = t,
                (0,
                c.O)(),
                this.id = C(),
                this.config = x(h, t.config || {}),
                this.lumenjetConfig = x(u, i.sb),
                this.lumenjetConfig = x(this.lumenjetConfig, t.lumenjetConfig || {}),
                this.prefix = this.config.prefix + this.id + "/",
                this.serviceWorkerConductor = t.serviceworker,
                this.ready = Promise.all([new Promise(e => {
                    this.readyResolve = e
                }
                ), this.loadLumenjetWasm(), this.loadSavedCookies(!0)]).then( () => void 0),
                this.rpc = new e.C(this.methods,"tabchannel-" + this.id, (e, t) => {
                    if (!this.port)
                        throw Error("Port not found");
                    this.port.postMessage(e, t)
                }
                ),
                this.transport = t.transport,
                this.cookieSyncChannel.addEventListener("message", this.onCookieSyncMessage),
                this.setupMessagePort(),
                navigator.serviceWorker.addEventListener("message", e => {
                    if (e.data?.$conductor$setCookie && "object" == typeof e.data.$conductor$setCookie) {
                        let t = e.data.$conductor$setCookie;
                        t.options?.clear && this.cookieJar.clear(),
                        this.applyCookieSyncEntries(t.cookies),
                        "string" == typeof t.id && this.serviceWorkerConductor.postMessage({
                            $hub$setCookieDone: {
                                id: t.id
                            }
                        });
                        return
                    }
                    if (e.data.$conductor$swrevive) {
                        if (this.guardServiceWorkerRevive)
                            return;
                        this.setupMessagePort()
                    }
                }
                )
            }
            setupMessagePort() {
                if (this.port) {
                    this.port.removeEventListener("message", this.onTabChannelMessage);
                    try {
                        this.port.close()
                    } catch {}
                    this.port = null
                }
                let e = new MessageChannel;
                this.port = e.port1,
                this.port.addEventListener("message", this.onTabChannelMessage),
                this.port.start(),
                this.serviceWorkerConductor.postMessage({
                    $conductor$init: {
                        prefix: this.prefix,
                        id: this.id
                    }
                }, [e.port2])
            }
            applyCookieSyncEntries(e) {
                if (Array.isArray(e))
                    for (let t of e)
                        "string" == typeof t?.url && "string" == typeof t.cookie && this.cookieJar.setCookies(t.cookie, new URL(t.url))
            }
            async propagateCookieSync(e, t={}) {
                this.port && await this.rpc.call("sendSetCookie", {
                    cookies: e,
                    options: t
                })
            }
            async loadSavedCookies(e=!1) {
                if (e || this.cookieSyncDirty)
                    return this.cookieSyncPromise || (this.cookieSyncPromise = (async () => {
                        let e = await j();
                        e && e.updatedAt > this.cookieUpdatedAt && (this.cookieJar.load(e.cookies),
                        this.cookieUpdatedAt = e.updatedAt),
                        this.cookieSyncDirty = !1
                    }
                    )().finally( () => {
                        this.cookieSyncPromise = null
                    }
                    )),
                    this.cookieSyncPromise
            }
            async persistCookies() {
                let e = await v(this.cookieJar.dump(), this.cookieUpdatedAt);
                e <= this.cookieUpdatedAt || (this.cookieUpdatedAt = e,
                this.cookieSyncDirty = !1,
                this.cookieSyncChannel.postMessage({
                    updatedAt: e
                }))
            }
            setTransport(e) {
                for (let t of (this.transport = e,
                this.frames))
                    t.conductor.transport = e,
                    t.fetchHandler.client.transport = e
            }
            createFrame(e, t={}) {
                if (!this.ready)
                    throw Error("Conductor is not ready! Try awaiting conductor.wait()");
                let r = new P(this,e ??= document.createElement("iframe"),t);
                return this.frames.push(r),
                r
            }
            async wait() {
                await this.ready
            }
        }
        class P {
            conductor;
            element;
            options;
            id;
            prefix;
            fetchHandler;
            hooks;
            get context() {
                return {
                    config: this.conductor.lumenjetConfig,
                    prefix: new URL(this.prefix,location.href),
                    cookieJar: this.conductor.cookieJar,
                    interface: {
                        getInjectScripts: function e(t, r, o, s, n, i) {
                            return (a, c, l, d) => {
                                var h;
                                return [d(t.lumenjetPath), d(o.href + t.virtualWasmPath), d(t.injectPath), d("data:text/javascript;charset=utf-8;base64," + (h = `
					document.querySelectorAll("script[lumenjet-injected]").forEach(script => script.remove());
					$lumenjetConductor.load({
						config: ${JSON.stringify(t)},
						lumenconfig: ${JSON.stringify(r)},
						prefix: new URL("${o.href}"),
						cookies: ${JSON.stringify(s.dump())},
						yieldGetInjectScripts: ${e.toString()},
						codecEncode: ${n.toString()},
						codecDecode: ${i.toString()},
						initHeaders: ${JSON.stringify(l.headers ?? [])},
						history: ${JSON.stringify(l.history ?? [])},
					})
				`,
                                btoa(new TextEncoder().encode(h).reduce( (e, t) => (e.push(String.fromCharCode(t)),
                                e), []).join(""))))]
                            }
                        }(this.conductor.config, this.conductor.lumenjetConfig, new URL(this.prefix,location.href), this.conductor.cookieJar, this.conductor.config.codec.encode, this.conductor.config.codec.decode),
                        getWorkerInjectScripts: (e, t, r) => {
                            var o;
                            let s = "";
                            return s += r(this.conductor.config.lumenjetPath),
                            s += r(this.prefix + this.conductor.config.virtualWasmPath),
                            s += r("data:text/javascript;charset=utf-8;base64," + (o = `
					(()=>{
						const { LumenjetClient, CookieJar, setWasm } = $lumenjet;

						setWasm(Uint8Array.from(atob(self.WASM), (c) => c.charCodeAt(0)));
						delete self.WASM;

						const lumenconfig = ${JSON.stringify(this.conductor.lumenjetConfig)};
						const prefix = new URL("${this.prefix}", location.href);

						const context = {
							config: lumenconfig,
							prefix,
							interface: {
								codecEncode: ${this.conductor.config.codec.encode.toString()},
								codecDecode: ${this.conductor.config.codec.decode.toString()},
							},
						};

						const client = new LumenjetClient(globalThis, {
							context,
							transport: null,
						});

						client.hook();
					})();
					`,
                            btoa(new TextEncoder().encode(o).reduce( (e, t) => (e.push(String.fromCharCode(t)),
                            e), []).join(""))))
                        }
                        ,
                        codecEncode: this.conductor.config.codec.encode,
                        codecDecode: this.conductor.config.codec.decode
                    }
                }
            }
            plugins = [];
            constructor(e, t, r={}) {
                for (const o of (this.conductor = e,
                this.element = t,
                this.options = r,
                this.id = C(),
                this.prefix = this.conductor.prefix + this.id + "/",
                this.fetchHandler = new i.mK({
                    crossOriginIsolated: self.crossOriginIsolated,
                    context: this.context,
                    transport: e.transport,
                    async sendSetCookie(t, r) {
                        await e.persistCookies(),
                        await e.propagateCookieSync(t.map( ({url: e, cookie: t}) => ({
                            url: e.href,
                            cookie: t
                        })), r)
                    },
                    fetchBlobUrl: async e => s.Sr.fromNativeResponse(await fetch(e)),
                    fetchDataUrl: async e => s.Sr.fromNativeResponse(await fetch(e))
                }),
                this.hooks = {
                    fetch: this.fetchHandler.hooks.fetch,
                    init: i.Cx.create(),
                    error: i.Cx.create()
                },
                t[a.I] = this,
                this.plugins = r.plugins ?? [],
                this.plugins)) {
                    for (const e of o.dependencies)
                        if (!this.plugins.find(t => t.name === e))
                            throw Error(`Dependency ${e} not found for plugin ${o.name}`);
                    o.install(this)
                }
            }
            getPlugin(e) {
                let t = this.plugins.find(t => t.name === e);
                if (!t)
                    throw Error(`Plugin ${e} not found`);
                return t
            }
            back() {
                this.element.contentWindow?.history.back()
            }
            forward() {
                this.element.contentWindow?.history.forward()
            }
            reload() {
                this.element.contentWindow?.location.reload()
            }
            go(e) {
                let t = (0,
                i.Oy)(e, this.context, {
                    origin: new URL(location.href),
                    base: new URL(location.href)
                });
                this.element.src = t
            }
        }
    }
    )(),
    $lumenjetConductor = o
}
)();
//# sourceMappingURL=conductor.api.js.map
