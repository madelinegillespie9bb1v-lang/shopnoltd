"use strict";
(self.webpackChunk_fundraiseup_checkout = self.webpackChunk_fundraiseup_checkout || []).push([
    [897], {
        764: function(e, n, t) {
            t.r(n), t.d(n, {
                initSentry: function() {
                    return v
                }
            });
            var r = t(9469),
                o = t(9617),
                i = t(5911),
                a = t(2642),
                s = t(1681),
                u = t(9451),
                c = t(140);
            class l {
                constructor(e) {
                    this.validators = e
                }
                run(e) {
                    for (const n of this.validators)
                        if (!n(e)) return null;
                    return e
                }
            }
            const d = [function(e) {
                    return e.stacktrace && e.stacktrace.frames && e.type && -1 === ["ChunkLoadError", "LoadScriptError"].indexOf(e.type) ? e : null
                }, function(e) {
                    const n = e.value;
                    return n ? -1 !== ["17 is not provided", "19 is not provided", "response status 0", "ResizeObserver loop limit exceeded", "r._mergeOptions is not a function", "google_tag_manager", "Stripe.js could not be loaded", "Unexpected number '0'. Expected an opening '('", "Campaign page render aborted", "Checkout render aborted", "this.getSetOfTimeouts(...).flat is not a function", "Cannot read properties of null (reading 'getComputedStyle')", "TypeError: Cannot read property 'getComputedStyle' of null", "TypeError: can't access dead object"].findIndex((e => n.includes(e))) ? null : e : null
                }, function(e) {
                    return (e.userAgent || "").includes("Yeti") ? null : e
                }, function(e) {
                    return e.stacktrace && e.stacktrace.frames && 1 === e.stacktrace.frames.length && e.stacktrace.frames[0] && e.stacktrace.frames[0].filename && /checkout-sentry-vendor/i.test(e.stacktrace.frames[0].filename) ? null : e
                }, function(e) {
                    return e.stacktrace && e.stacktrace.frames ? [
                        ["stripWithBlacklist", "newHandler"],
                        ["SetMWCustomDimensions", "getUrlParameter"]
                    ].some((n => n.every((n => {
                        var t, r;
                        return null === (r = null === (t = e.stacktrace) || void 0 === t ? void 0 : t.frames) || void 0 === r ? void 0 : r.some((e => {
                            var t;
                            return null === (t = e.function) || void 0 === t ? void 0 : t.includes(n)
                        }))
                    })))) ? null : e : null
                }],
                f = /widget\/[A-Z\d]{8}$/g;

            function v(e, n, t) {
                if (!e.uri) return null;
                if (!("navigator" in window && window.navigator instanceof window.Navigator)) return null;
                const v = new l(d),
                    p = e.mainDomain.split(":").shift(),
                    g = p ? [p] : [];
                return o.S({
                    enabled: e.env !== u.CB.TESTING,
                    dsn: e.uri,
                    environment: e.env,
                    release: e.version,
                    integrations: [new i.gE],
                    initialScope: n => {
                        var r;
                        n.setTag("scope", e.scope), n.setTag("malformed", !!window.FUN_IS_MALFORMED_ENV), n.setTag("supported_browser", e.isBrowserSupported), n.setTag("supported_browser_version", e.isBrowserSupportedVersion), n.setTag("look_like_bot", "" === window.navigator.userAgent || 0 === (null === (r = window.navigator.languages) || void 0 === r ? void 0 : r.length) || window.navigator.webdriver);
                        const o = (e, n) => !!n && -1 !== n.indexOf(e);
                        let i = 0;
                        return n.addEventProcessor(((e, n) => {
                            var r, a, u;
                            if (i >= 10) return null;
                            const l = n.originalException;
                            if (null == t ? void 0 : t.some((e => l instanceof e))) return null;
                            if (l instanceof c.Lu) {
                                const n = l[s.qH];
                                n && Array.isArray(n) && (e.fingerprint = n)
                            }
                            if (null === (r = e.exception) || void 0 === r ? void 0 : r.values)
                                for (let n = 0; n < e.exception.values.length; n++) {
                                    const t = v.run(Object.assign(Object.assign({}, e.exception.values[n]), {
                                        userAgent: null === (a = null === window || void 0 === window ? void 0 : window.navigator) || void 0 === a ? void 0 : a.userAgent
                                    }));
                                    if (!t || !t.stacktrace || !t.stacktrace.frames) return null;
                                    const r = t.stacktrace.frames.every((e => g.some((n => o(n, e.filename))))),
                                        s = t.stacktrace.frames[0];
                                    if ((null === (u = s.filename) || void 0 === u ? void 0 : u.match(f)) && s.function && (e.fingerprint = ["{{ default }}", String(s.function)]), r) return i += 1, e
                                }
                            return null
                        })), n
                    }
                }), n.forEach((e => {
                    a.Tb(e)
                })), r
            }
        }
    }
]);