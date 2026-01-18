"use strict";
(self.webpackChunk_workable_candidate = self.webpackChunk_workable_candidate || []).push([
    [7168], {
        98056: (t, e, n) => {
            n.d(e, {
                Z: () => s,
                m: () => a
            });
            var r = n(43500),
                i = n(17573),
                o = n(78205);

            function a(t) {
                var e = (0, o.kp)({
                    version: "5.13.0",
                    onReady: function(t) {
                        t()
                    }
                }, t);
                return Object.defineProperty(e, "_setDebug", {
                    get: function() {
                        return i.pM
                    },
                    enumerable: !1
                }), e
            }

            function s(t, e, n) {
                var i = t[e];
                t[e] = n, i && i.q && i.q.forEach((function(t) {
                    return (0, r.y)(t, "onReady callback threw an error:")()
                }))
            }
        },
        8027: (t, e, n) => {
            n.d(e, {
                gX: () => r,
                lQ: () => s,
                q2: () => a
            });
            var r, i = n(17573),
                o = n(15304);

            function a(t, e, n, r, i) {
                return s(t, e, [n], r, i)
            }

            function s(t, e, n, r, a) {
                var s = void 0 === a ? {} : a,
                    c = s.once,
                    u = s.capture,
                    l = s.passive,
                    f = (0, i.dm)((function(e) {
                        (e.isTrusted || e.__ddIsTrusted || t.allowUntrustedEvents) && (c && p(), r(e))
                    })),
                    d = l ? {
                        capture: u,
                        passive: l
                    } : u,
                    v = (0, o.W)(e, "addEventListener");

                function p() {
                    var t = (0, o.W)(e, "removeEventListener");
                    n.forEach((function(n) {
                        return t.call(e, n, f, d)
                    }))
                }
                return n.forEach((function(t) {
                    return v.call(e, t, f, d)
                })), {
                    stop: p
                }
            }! function(t) {
                t.BEFORE_UNLOAD = "beforeunload", t.CLICK = "click", t.DBL_CLICK = "dblclick", t.KEY_DOWN = "keydown", t.LOAD = "load", t.POP_STATE = "popstate", t.SCROLL = "scroll", t.TOUCH_START = "touchstart", t.TOUCH_END = "touchend", t.TOUCH_MOVE = "touchmove", t.VISIBILITY_CHANGE = "visibilitychange", t.PAGE_SHOW = "pageshow", t.FREEZE = "freeze", t.RESUME = "resume", t.DOM_CONTENT_LOADED = "DOMContentLoaded", t.POINTER_DOWN = "pointerdown", t.POINTER_UP = "pointerup", t.POINTER_CANCEL = "pointercancel", t.HASH_CHANGE = "hashchange", t.PAGE_HIDE = "pagehide", t.MOUSE_DOWN = "mousedown", t.MOUSE_UP = "mouseup", t.MOUSE_MOVE = "mousemove", t.FOCUS = "focus", t.BLUR = "blur", t.CONTEXT_MENU = "contextmenu", t.RESIZE = "resize", t.CHANGE = "change", t.INPUT = "input", t.PLAY = "play", t.PAUSE = "pause", t.SECURITY_POLICY_VIOLATION = "securitypolicyviolation", t.SELECTION_CHANGE = "selectionchange", t.STORAGE = "storage"
            }(r || (r = {}))
        },
        96316: (t, e, n) => {
            n.d(e, {
                B9: () => l,
                DQ: () => v,
                Ri: () => u,
                TV: () => c,
                Yj: () => f,
                z$: () => d
            });
            var r, i, o = n(23549),
                a = n(56955),
                s = n(5187);

            function c(t, e, n, r) {
                var i = new Date;
                i.setTime(i.getTime() + n);
                var o = "expires=".concat(i.toUTCString()),
                    a = r && r.crossSite ? "none" : "strict",
                    s = r && r.domain ? ";domain=".concat(r.domain) : "",
                    c = r && r.secure ? ";secure" : "",
                    u = r && r.partitioned ? ";partitioned" : "";
                document.cookie = "".concat(t, "=").concat(e, ";").concat(o, ";path=/;samesite=").concat(a).concat(s).concat(c).concat(u)
            }

            function u(t) {
                return (0, s.rx)(document.cookie, t)
            }

            function l(t) {
                return r || (r = (0, s.it)(document.cookie)), r.get(t)
            }

            function f(t, e) {
                c(t, "", 0, e)
            }

            function d(t) {
                if (void 0 === document.cookie || null === document.cookie) return !1;
                try {
                    var e = "dd_cookie_test_".concat((0, s.lk)()),
                        n = "test";
                    c(e, n, a.iW, t);
                    var r = u(e) === n;
                    return f(e, t), r
                } catch (t) {
                    return o.Vy.error(t), !1
                }
            }

            function v() {
                if (void 0 === i) {
                    for (var t = "dd_site_test_".concat((0, s.lk)()), e = window.location.hostname.split("."), n = e.pop(); e.length && !u(t);) n = "".concat(e.pop(), ".").concat(n), c(t, "test", a.OY, {
                        domain: n
                    });
                    f(t, {
                        domain: n
                    }), i = n
                }
                return i
            }
        },
        49020: (t, e, n) => {
            n.d(e, {
                Kp: () => l,
                hL: () => u,
                y5: () => c
            });
            var r = n(13630),
                i = n(74206),
                o = n(78205),
                a = n(51752),
                s = n(8027),
                c = {
                    HIDDEN: "visibility_hidden",
                    UNLOADING: "before_unload",
                    PAGEHIDE: "page_hide",
                    FROZEN: "page_frozen"
                };

            function u(t) {
                return new i.c((function(e) {
                    var n = (0, r.sr)(r.R9.PAGEHIDE),
                        i = (0, s.lQ)(t, window, [s.gX.VISIBILITY_CHANGE, s.gX.FREEZE, s.gX.PAGE_HIDE], (function(t) {
                            t.type === s.gX.PAGE_HIDE && n ? e.notify({
                                reason: c.PAGEHIDE
                            }) : t.type === s.gX.VISIBILITY_CHANGE && "hidden" === document.visibilityState ? e.notify({
                                reason: c.HIDDEN
                            }) : t.type === s.gX.FREEZE && e.notify({
                                reason: c.FROZEN
                            })
                        }), {
                            capture: !0
                        }).stop,
                        o = a.l;
                    return n || (o = (0, s.q2)(t, window, s.gX.BEFORE_UNLOAD, (function() {
                            e.notify({
                                reason: c.UNLOADING
                            })
                        })).stop),
                        function() {
                            i(), o()
                        }
                }))
            }

            function l(t) {
                return (0, o.mK)((0, o.KQ)(c), t)
            }
        },
        3908: (t, e, n) => {
            n.d(e, {
                H: () => i
            });
            var r = n(8027);

            function i(t, e, n) {
                if (document.readyState === e || "complete" === document.readyState) n();
                else {
                    var i = "complete" === e ? r.gX.LOAD : r.gX.DOM_CONTENT_LOADED;
                    (0, r.q2)(t, window, i, n, {
                        once: !0
                    })
                }
            }
        },
        62256: (t, e, n) => {
            n.d(e, {
                WA: () => S,
                uT: () => w,
                hO: () => T,
                Sz: () => C
            });
            var r = n(43500),
                i = n(23549),
                o = n(13630),
                a = n(56955),
                s = n(88551),
                c = n(88790),
                u = n(51533),
                l = n(78205),
                f = n(17991),
                d = n(16069),
                v = n(63875),
                p = n(5187),
                m = n(94561);

            function g(t, e, n) {
                var r = function(t, e) {
                    var n = "/api/v2/".concat(e),
                        r = t.proxy;
                    if ("string" == typeof r) {
                        var i = (0, v.l2)(r);
                        return function(t) {
                            return "".concat(i, "?ddforward=").concat(encodeURIComponent("".concat(n, "?").concat(t)))
                        }
                    }
                    if ("function" == typeof r) return function(t) {
                        return r({
                            path: n,
                            parameters: t
                        })
                    };
                    var o = function(t, e) {
                        var n = e.site,
                            r = void 0 === n ? m.NW : n,
                            i = e.internalAnalyticsSubdomain;
                        if ("logs" === t && e.usePciIntake && r === m.NW) return m.$A;
                        if (i && r === m.NW) return "".concat(i, ".").concat(m.NW);
                        if (r === m.TC) return "http-intake.logs.".concat(r);
                        var o = r.split("."),
                            a = o.pop();
                        return "browser-intake-".concat(o.join("-"), ".").concat(a)
                    }(e, t);
                    return function(t) {
                        return "https://".concat(o).concat(n, "?").concat(t)
                    }
                }(t, e);
                return {
                    build: function(i, s) {
                        var c = function(t, e, n, r, i) {
                            var s = t.clientToken,
                                c = t.internalAnalyticsSubdomain,
                                u = i.retry,
                                l = i.flushReason,
                                f = i.encoding,
                                d = ["sdk_version:".concat("5.13.0"), "api:".concat(r)].concat(n);
                            l && (0, o.sr)(o.R9.COLLECT_FLUSH_REASON) && d.push("flush_reason:".concat(l)), u && d.push("retry_count:".concat(u.count), "retry_after:".concat(u.lastFailureStatus));
                            var v = ["ddsource=browser", "ddtags=".concat(encodeURIComponent(d.join(","))), "dd-api-key=".concat(s), "dd-evp-origin-version=".concat(encodeURIComponent("5.13.0")), "dd-evp-origin=browser", "dd-request-id=".concat((0, p.lk)())];
                            return f && v.push("dd-evp-encoding=".concat(f)), "rum" === e && v.push("batch_time=".concat((0, a.nx)())), c && v.reverse(), v.join("&")
                        }(t, e, n, i, s);
                        return r(c)
                    },
                    urlPrefix: r(""),
                    trackType: e
                }
            }
            var y = 200,
                h = /[^a-z0-9_:./-]/;

            function b(t, e) {
                var n = y - t.length - 1;
                (e.length > n || h.test(e)) && i.Vy.warn("".concat(t, " value doesn't meet tag requirements and will be sanitized"));
                var r = e.replace(/,/g, "_");
                return "".concat(t, ":").concat(r)
            }
            var S = {
                    ALLOW: "allow",
                    MASK: "mask",
                    MASK_USER_INPUT: "mask-user-input"
                },
                w = {
                    ALL: "all",
                    SAMPLED: "sampled"
                };

            function C(t) {
                var e, n, v, p;
                if (t && t.clientToken)
                    if (void 0 === t.sessionSampleRate || (0, s.fp)(t.sessionSampleRate))
                        if (void 0 === t.telemetrySampleRate || (0, s.fp)(t.telemetrySampleRate))
                            if (void 0 === t.telemetryConfigurationSampleRate || (0, s.fp)(t.telemetryConfigurationSampleRate)) {
                                if (void 0 === t.trackingConsent || (0, u.Rj)(d.w, t.trackingConsent)) return Array.isArray(t.enableExperimentalFeatures) && (0, o.jH)(t.enableExperimentalFeatures.filter((function(t) {
                                    return (0, u.Rj)(o.R9, t)
                                }))), (0, l.kp)({
                                    beforeSend: t.beforeSend && (0, r.y)(t.beforeSend, "beforeSend threw an error:"),
                                    sessionStoreStrategyType: (0, f.nd)(t),
                                    sessionSampleRate: null !== (e = t.sessionSampleRate) && void 0 !== e ? e : 100,
                                    telemetrySampleRate: null !== (n = t.telemetrySampleRate) && void 0 !== n ? n : 20,
                                    telemetryConfigurationSampleRate: null !== (v = t.telemetryConfigurationSampleRate) && void 0 !== v ? v : 5,
                                    service: t.service,
                                    silentMultipleInit: !!t.silentMultipleInit,
                                    allowUntrustedEvents: !!t.allowUntrustedEvents,
                                    trackingConsent: null !== (p = t.trackingConsent) && void 0 !== p ? p : d.w.GRANTED,
                                    batchBytesLimit: 16 * c._m,
                                    eventRateLimiterThreshold: 3e3,
                                    maxTelemetryEventsPerPage: 15,
                                    flushTimeout: 30 * a.OY,
                                    batchMessagesLimit: 50,
                                    messageBytesLimit: 256 * c._m
                                }, function(t) {
                                    var e = t.site || m.NW,
                                        n = function(t) {
                                            var e = t.env,
                                                n = t.service,
                                                r = t.version,
                                                i = t.datacenter,
                                                o = [];
                                            return e && o.push(b("env", e)), n && o.push(b("service", n)), r && o.push(b("version", r)), i && o.push(b("datacenter", i)), o
                                        }(t),
                                        r = function(t, e) {
                                            return {
                                                logsEndpointBuilder: g(t, "logs", e),
                                                rumEndpointBuilder: g(t, "rum", e),
                                                sessionReplayEndpointBuilder: g(t, "replay", e)
                                            }
                                        }(t, n),
                                        i = function(t, e) {
                                            var n = (0, l.KQ)(t).map((function(t) {
                                                return t.urlPrefix
                                            }));
                                            return e === m.NW && n.push("https://".concat(m.$A, "/")), n
                                        }(r, e),
                                        o = function(t, e, n) {
                                            if (t.replica) {
                                                var r = (0, l.kp)({}, t, {
                                                        site: m.NW,
                                                        clientToken: t.replica.clientToken
                                                    }),
                                                    i = {
                                                        logsEndpointBuilder: g(r, "logs", n),
                                                        rumEndpointBuilder: g(r, "rum", n)
                                                    };
                                                return e.push.apply(e, (0, l.KQ)(i).map((function(t) {
                                                    return t.urlPrefix
                                                }))), (0, l.kp)({
                                                    applicationId: t.replica.applicationId
                                                }, i)
                                            }
                                        }(t, i, n);
                                    return (0, l.kp)({
                                        isIntakeUrl: function(t) {
                                            return i.some((function(e) {
                                                return 0 === t.indexOf(e)
                                            }))
                                        },
                                        replica: o,
                                        site: e
                                    }, r)
                                }(t));
                                i.Vy.error('Tracking Consent should be either "granted" or "not-granted"')
                            } else i.Vy.error("Telemetry Configuration Sample Rate should be a number between 0 and 100");
                else i.Vy.error("Telemetry Sample Rate should be a number between 0 and 100");
                else i.Vy.error("Session Sample Rate should be a number between 0 and 100");
                else i.Vy.error("Client Token is not configured, we will not send any data.")
            }

            function T(t) {
                return {
                    session_sample_rate: t.sessionSampleRate,
                    telemetry_sample_rate: t.telemetrySampleRate,
                    telemetry_configuration_sample_rate: t.telemetryConfigurationSampleRate,
                    use_before_send: !!t.beforeSend,
                    use_cross_site_session_cookie: t.useCrossSiteSessionCookie,
                    use_partitioned_cross_site_session_cookie: t.usePartitionedCrossSiteSessionCookie,
                    use_secure_session_cookie: t.useSecureSessionCookie,
                    use_proxy: !!t.proxy,
                    silent_multiple_init: t.silentMultipleInit,
                    track_session_across_subdomains: t.trackSessionAcrossSubdomains,
                    allow_fallback_to_local_storage: !!t.allowFallbackToLocalStorage,
                    store_contexts_across_pages: !!t.storeContextsAcrossPages,
                    allow_untrusted_events: !!t.allowUntrustedEvents,
                    tracking_consent: t.trackingConsent
                }
            }
        },
        94561: (t, e, n) => {
            n.d(e, {
                $A: () => c,
                Bb: () => r,
                NW: () => o,
                R8: () => s,
                TC: () => i,
                dV: () => a
            });
            var r = "datad0g.com",
                i = "dd0g-gov.com",
                o = "datadoghq.com",
                a = "datadoghq.eu",
                s = "ddog-gov.com",
                c = "pci.browser-intake-datadoghq.com"
        },
        97095: (t, e, n) => {
            function r() {
                var t, e = window.navigator;
                return {
                    status: e.onLine ? "connected" : "not_connected",
                    interfaces: e.connection && e.connection.type ? [e.connection.type] : void 0,
                    effective_type: null === (t = e.connection) || void 0 === t ? void 0 : t.effectiveType
                }
            }
            n.d(e, {
                q: () => r
            })
        },
        46409: (t, e, n) => {
            n.d(e, {
                T: () => o,
                h: () => m
            });
            var r = n(78205),
                i = "?";

            function o(t) {
                var e = [],
                    n = p(t, "stack"),
                    o = String(t);
                return n && (0, r.w1)(n, o) && (n = n.slice(o.length)), n && n.split("\n").forEach((function(t) {
                    var n = function(t) {
                        var e = c.exec(t);
                        if (e) {
                            var n = e[2] && 0 === e[2].indexOf("native"),
                                r = e[2] && 0 === e[2].indexOf("eval"),
                                o = u.exec(e[2]);
                            return r && o && (e[2] = o[1], e[3] = o[2], e[4] = o[3]), {
                                args: n ? [e[2]] : [],
                                column: e[4] ? +e[4] : void 0,
                                func: e[1] || i,
                                line: e[3] ? +e[3] : void 0,
                                url: n ? void 0 : e[2]
                            }
                        }
                    }(t) || function(t) {
                        var e = l.exec(t);
                        if (e) return {
                            args: [],
                            column: e[3] ? +e[3] : void 0,
                            func: i,
                            line: e[2] ? +e[2] : void 0,
                            url: e[1]
                        }
                    }(t) || function(t) {
                        var e = f.exec(t);
                        if (e) return {
                            args: [],
                            column: e[4] ? +e[4] : void 0,
                            func: e[1] || i,
                            line: +e[3],
                            url: e[2]
                        }
                    }(t) || function(t) {
                        var e = d.exec(t);
                        if (e) {
                            var n = e[3] && e[3].indexOf(" > eval") > -1,
                                r = v.exec(e[3]);
                            return n && r && (e[3] = r[1], e[4] = r[2], e[5] = void 0), {
                                args: e[2] ? e[2].split(",") : [],
                                column: e[5] ? +e[5] : void 0,
                                func: e[1] || i,
                                line: e[4] ? +e[4] : void 0,
                                url: e[3]
                            }
                        }
                    }(t);
                    n && (!n.func && n.line && (n.func = i), e.push(n))
                })), {
                    message: p(t, "message"),
                    name: p(t, "name"),
                    stack: e
                }
            }
            var a = "((?:file|https?|blob|chrome-extension|native|eval|webpack|snippet|<anonymous>|\\w+\\.|\\/).*?)",
                s = "(?::(\\d+))",
                c = new RegExp("^\\s*at (.*?) ?\\(".concat(a).concat(s, "?").concat(s, "?\\)?\\s*$"), "i"),
                u = new RegExp("\\((\\S*)".concat(s).concat(s, "\\)")),
                l = new RegExp("^\\s*at ?".concat(a).concat(s, "?").concat(s, "??\\s*$"), "i"),
                f = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
                d = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|capacitor|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i,
                v = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;

            function p(t, e) {
                if ("object" == typeof t && t && e in t) {
                    var n = t[e];
                    return "string" == typeof n ? n : void 0
                }
            }

            function m(t, e, n, r) {
                var i = [{
                        url: e,
                        column: r,
                        line: n
                    }],
                    o = function(t) {
                        var e, n, r;
                        return "[object String]" === {}.toString.call(t) && (n = (e = g.exec(t))[1], r = e[2]), {
                            name: n,
                            message: r
                        }
                    }(t);
                return {
                    name: o.name,
                    message: o.message,
                    stack: i
                }
            }
            var g = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?([\s\S]*)$/
        },
        67047: (t, e, n) => {
            n.d(e, {
                As: () => u,
                Dr: () => p,
                NR: () => d,
                Nt: () => l,
                Yn: () => f,
                e6: () => c,
                uC: () => v
            });
            var r = n(17573),
                i = n(79106),
                o = n(51752),
                a = n(72154),
                s = n(46409),
                c = "No stack, consider using an instance of Error";

            function u(t) {
                var e = t.stackTrace,
                    n = t.originalError,
                    r = t.handlingStack,
                    o = t.startClocks,
                    s = t.nonErrorPrefix,
                    u = t.source,
                    d = t.handling,
                    v = n instanceof Error,
                    m = function(t, e, n, r) {
                        return (null == t ? void 0 : t.message) && (null == t ? void 0 : t.name) ? t.message : e ? "Empty message" : "".concat(n, " ").concat((0, a.s)((0, i.a)(r)))
                    }(e, v, s, n),
                    g = function(t, e) {
                        return void 0 !== e && (!!t || e.stack.length > 0 && (e.stack.length > 1 || void 0 !== e.stack[0].url))
                    }(v, e) ? f(e) : c,
                    y = v ? p(n, u) : void 0;
                return {
                    startClocks: o,
                    source: u,
                    handling: d,
                    handlingStack: r,
                    originalError: n,
                    type: null == e ? void 0 : e.name,
                    message: m,
                    stack: g,
                    causes: y,
                    fingerprint: l(n)
                }
            }

            function l(t) {
                return t instanceof Error && "dd_fingerprint" in t ? String(t.dd_fingerprint) : void 0
            }

            function f(t) {
                var e = d(t);
                return t.stack.forEach((function(t) {
                    var n = "?" === t.func ? "<anonymous>" : t.func,
                        r = t.args && t.args.length > 0 ? "(".concat(t.args.join(", "), ")") : "",
                        i = t.line ? ":".concat(t.line) : "",
                        o = t.line && t.column ? ":".concat(t.column) : "";
                    e += "\n  at ".concat(n).concat(r, " @ ").concat(t.url).concat(i).concat(o)
                })), e
            }

            function d(t) {
                return "".concat(t.name || "Error", ": ").concat(t.message)
            }

            function v() {
                var t, e = new Error;
                if (!e.stack) try {
                    throw e
                } catch (t) {
                    (0, o.l)()
                }
                return (0, r.um)((function() {
                    var n = (0, s.T)(e);
                    n.stack = n.stack.slice(2), t = f(n)
                })), t
            }

            function p(t, e) {
                for (var n = t, r = [];
                    (null == n ? void 0 : n.cause) instanceof Error && r.length < 10;) {
                    var i = (0, s.T)(n.cause);
                    r.push({
                        message: n.cause.message,
                        source: e,
                        type: null == i ? void 0 : i.name,
                        stack: i && f(i)
                    }), n = n.cause
                }
                return r.length ? r : void 0
            }
        },
        87792: (t, e, n) => {
            n.d(e, {
                g: () => r
            });
            var r = {
                AGENT: "agent",
                CONSOLE: "console",
                CUSTOM: "custom",
                LOGGER: "logger",
                NETWORK: "network",
                SOURCE: "source",
                REPORT: "report"
            }
        },
        93350: (t, e, n) => {
            n.d(e, {
                A: () => i,
                H: () => o
            });
            var r = n(56955),
                i = 4 * r.MA,
                o = 15 * r.iW
        },
        17991: (t, e, n) => {
            n.d(e, {
                nd: () => B,
                oC: () => j
            });
            var r = n(79358),
                i = n(74206),
                o = n(56955),
                a = n(51752),
                s = n(5187),
                c = n(93350),
                u = n(71114),
                l = n(96316),
                f = "_dd_s",
                d = n(51533),
                v = n(78205),
                p = /^([a-z]+)=([a-z0-9-]+)$/,
                m = "&";

            function g(t) {
                return (0, d.RI)(t)
            }

            function y(t) {
                t.expire = String((0, o.x3)() + c.H)
            }

            function h(t) {
                return (0, v.WP)(t).map((function(t) {
                    var e = t[0],
                        n = t[1];
                    return "".concat(e, "=").concat(n)
                })).join(m)
            }

            function b(t) {
                var e = {};
                return function(t) {
                    return !!t && (-1 !== t.indexOf(m) || p.test(t))
                }(t) && t.split(m).forEach((function(t) {
                    var n = p.exec(t);
                    if (null !== n) {
                        var r = n[1],
                            i = n[2];
                        e[r] = i
                    }
                })), e
            }
            var S = "_dd",
                w = "_dd_r",
                C = "_dd_l",
                T = "rum",
                E = "logs";

            function _() {
                return b((0, l.Ri)(f))
            }

            function k(t) {
                return function() {
                    (0, l.Yj)(f, t)
                }
            }
            var x = "_dd_test_";

            function A(t) {
                localStorage.setItem(f, h(t))
            }

            function R() {
                return b(localStorage.getItem(f))
            }

            function I() {
                localStorage.removeItem(f)
            }
            var O, N = 10,
                P = 100,
                L = [];

            function M(t, e, n) {
                var r;
                void 0 === n && (n = 0);
                var i = e.isLockEnabled,
                    o = e.retrieveSession,
                    a = e.persistSession,
                    c = e.clearSession;
                if (O || (O = t), t === O)
                    if (i && n >= P) V(e);
                    else {
                        var u, l = o();
                        if (i) {
                            if (l.lock) return void D(t, e, n);
                            if (u = (0, s.lk)(), l.lock = u, a(l), (l = o()).lock !== u) return void D(t, e, n)
                        }
                        var f = t.process(l);
                        if (i && (l = o()).lock !== u) D(t, e, n);
                        else {
                            if (f && (g(f) ? c() : (y(f), a(f))), i && (!f || !g(f))) {
                                if ((l = o()).lock !== u) return void D(t, e, n);
                                delete l.lock, a(l), f = l
                            }
                            null === (r = t.after) || void 0 === r || r.call(t, f || l), V(e)
                        }
                    }
                else L.push(t)
            }

            function D(t, e, n) {
                (0, r.wg)((function() {
                    M(t, e, n + 1)
                }), N)
            }

            function V(t) {
                O = void 0;
                var e = L.shift();
                e && M(e, t)
            }
            var U = o.OY;

            function B(t) {
                var e = function(t) {
                    var e = function(t) {
                        var e = {};
                        return e.secure = !!t.useSecureSessionCookie || !!t.usePartitionedCrossSiteSessionCookie || !!t.useCrossSiteSessionCookie, e.crossSite = !!t.usePartitionedCrossSiteSessionCookie || !!t.useCrossSiteSessionCookie, e.partitioned = !!t.usePartitionedCrossSiteSessionCookie, t.trackSessionAcrossSubdomains && (e.domain = (0, l.DQ)()), e
                    }(t);
                    return (0, l.z$)(e) ? {
                        type: "Cookie",
                        cookieOptions: e
                    } : void 0
                }(t);
                return !e && t.allowFallbackToLocalStorage && (e = function() {
                    try {
                        var t = (0, s.lk)(),
                            e = "".concat(x).concat(t);
                        localStorage.setItem(e, t);
                        var n = localStorage.getItem(e);
                        return localStorage.removeItem(e), t === n ? {
                            type: "LocalStorage"
                        } : void 0
                    } catch (t) {
                        return
                    }
                }()), e
            }

            function j(t, e, n) {
                var d, v, p, m, b = new i.c,
                    x = new i.c,
                    O = "Cookie" === t.type ? (v = t.cookieOptions, m = {
                        isLockEnabled: (0, u.F2)(),
                        persistSession: (p = v, function(t) {
                            (0, l.TV)(f, h(t), c.H, p)
                        }),
                        retrieveSession: _,
                        clearSession: k(v)
                    }, function(t) {
                        if (!(0, l.B9)(f)) {
                            var e = (0, l.B9)(S),
                                n = (0, l.B9)(w),
                                r = (0, l.B9)(C),
                                i = {};
                            e && (i.id = e), r && /^[01]$/.test(r) && (i[E] = r), n && /^[012]$/.test(n) && (i[T] = n), g(i) || (y(i), t.persistSession(i))
                        }
                    }(m), m) : {
                        isLockEnabled: !1,
                        persistSession: A,
                        retrieveSession: R,
                        clearSession: I
                    },
                    N = O.clearSession,
                    P = O.retrieveSession,
                    L = (0, r.yb)((function() {
                        M({
                            process: function(t) {
                                return q(t) ? void 0 : {}
                            },
                            after: F
                        }, O)
                    }), U),
                    D = q(d = P()) ? d : {},
                    V = (0, a.n)((function() {
                        var t;
                        M({
                            process: function(r) {
                                var i = F(r);
                                return t = function(t) {
                                    var r = n(t[e]),
                                        i = r.trackingType,
                                        a = r.isTracked;
                                    return t[e] = i, a && !t.id && (t.id = (0, s.lk)(), t.created = String((0, o.x3)())), a
                                }(i), i
                            },
                            after: function(e) {
                                t && !G() && function(t) {
                                    D = t, b.notify()
                                }(e), D = e
                            }
                        }, O)
                    }), U),
                    B = V.throttled,
                    j = V.cancel;

                function F(t) {
                    return q(t) || (t = {}), G() && (function(t) {
                        return D.id !== t.id || D[e] !== t[e]
                    }(t) ? (D = {}, x.notify()) : D = t), t
                }

                function G() {
                    return void 0 !== D[e]
                }

                function q(t) {
                    return (void 0 === t.created || (0, o.x3)() - Number(t.created) < c.A) && (void 0 === t.expire || (0, o.x3)() < Number(t.expire))
                }
                return {
                    expandOrRenewSession: B,
                    expandSession: function() {
                        M({
                            process: function(t) {
                                return G() ? F(t) : void 0
                            }
                        }, O)
                    },
                    getSession: function() {
                        return D
                    },
                    renewObservable: b,
                    expireObservable: x,
                    expire: function() {
                        j(), N(), F({})
                    },
                    stop: function() {
                        (0, r.vG)(L)
                    }
                }
            }
        },
        86560: (t, e, n) => {
            n.d(e, {
                Rr: () => k,
                A2: () => E,
                VJ: () => _,
                Wb: () => T,
                a5: () => C
            });
            var r, i = n(23549),
                o = n(67047),
                a = n(13630),
                s = n(94561),
                c = n(74206),
                u = n(56955),
                l = n(17573),
                f = n(5375),
                d = n(78205),
                v = n(88551),
                p = n(72154),
                m = n(90717),
                g = n(46409),
                y = n(97095),
                h = {
                    log: "log",
                    configuration: "configuration"
                },
                b = ["https://www.datadoghq-browser-agent.com", "https://www.datad0g-browser-agent.com", "https://d3uc069fcn7uxw.cloudfront.net", "https://d20xtzwzcl0ceb.cloudfront.net", "http://localhost", "<anonymous>"],
                S = [s.R8],
                w = {
                    maxEventsPerPage: 0,
                    sentEventCount: 0,
                    telemetryEnabled: !1,
                    telemetryConfigurationEnabled: !1
                };

            function C(t, e) {
                var n, i = new c.c;
                w.telemetryEnabled = !(0, d.mK)(S, e.site) && (0, v.ic)(e.telemetrySampleRate), w.telemetryConfigurationEnabled = w.telemetryEnabled && (0, v.ic)(e.telemetryConfigurationSampleRate);
                var o = {
                    is_local_file: "file:" === window.location.protocol,
                    is_worker: "WorkerGlobalScope" in self
                };
                return r = function(e) {
                    if (w.telemetryEnabled) {
                        var r = function(t, e, r) {
                            return (0, m.kg)({
                                type: "telemetry",
                                date: (0, u.nx)(),
                                service: t,
                                version: "5.13.0",
                                source: "browser",
                                _dd: {
                                    format_version: 2
                                },
                                telemetry: (0, m.kg)(e, {
                                    runtime_env: r,
                                    connectivity: (0, y.q)()
                                }),
                                experimental_features: (0, d.A6)((0, a.q7)())
                            }, void 0 !== n ? n() : {})
                        }(t, e, o);
                        i.notify(r), (0, f.b)("telemetry", r)
                    }
                }, (0, l.Bd)(_), (0, d.kp)(w, {
                    maxEventsPerPage: e.maxTelemetryEventsPerPage,
                    sentEventCount: 0
                }), {
                    setContextProvider: function(t) {
                        n = t
                    },
                    observable: i,
                    enabled: w.telemetryEnabled
                }
            }

            function T(t) {
                return t.site === s.Bb
            }

            function E(t, e) {
                (0, l.oO)(i.bP.debug, t, e), x((0, d.kp)({
                    type: h.log,
                    message: t,
                    status: "debug"
                }, e))
            }

            function _(t, e) {
                x((0, d.kp)({
                    type: h.log,
                    status: "error"
                }, function(t) {
                    if (t instanceof Error) {
                        var e = (0, g.T)(t);
                        return {
                            error: {
                                kind: e.name,
                                stack: (0, o.Yn)(A(e))
                            },
                            message: e.message
                        }
                    }
                    return {
                        error: {
                            stack: o.e6
                        },
                        message: "".concat("Uncaught", " ").concat((0, p.s)(t))
                    }
                }(t), e))
            }

            function k(t) {
                w.telemetryConfigurationEnabled && x({
                    type: h.configuration,
                    configuration: t
                })
            }

            function x(t) {
                r && w.sentEventCount < w.maxEventsPerPage && (w.sentEventCount += 1, r(t))
            }

            function A(t) {
                return t.stack = t.stack.filter((function(t) {
                    return !t.url || b.some((function(e) {
                        return (0, d.w1)(t.url, e)
                    }))
                })), t
            }
        },
        16069: (t, e, n) => {
            n.d(e, {
                D: () => o,
                w: () => i
            });
            var r = n(74206),
                i = {
                    GRANTED: "granted",
                    NOT_GRANTED: "not-granted"
                };

            function o(t) {
                var e = new r.c;
                return {
                    tryToInit: function(e) {
                        t || (t = e)
                    },
                    update: function(n) {
                        t = n, e.notify()
                    },
                    isGranted: function() {
                        return t === i.GRANTED
                    },
                    observable: e
                }
            }
        },
        43500: (t, e, n) => {
            n.d(e, {
                y: () => i
            });
            var r = n(23549);

            function i(t, e) {
                return function() {
                    for (var n = [], i = 0; i < arguments.length; i++) n[i] = arguments[i];
                    try {
                        return t.apply(void 0, n)
                    } catch (t) {
                        r.Vy.error(e, t)
                    }
                }
            }
        },
        23549: (t, e, n) => {
            n.d(e, {
                JZ: () => i,
                Vy: () => s,
                bP: () => r
            });
            var r = {
                    log: "log",
                    debug: "debug",
                    info: "info",
                    warn: "warn",
                    error: "error"
                },
                i = console,
                o = {};
            Object.keys(r).forEach((function(t) {
                o[t] = i[t]
            }));
            var a = "Datadog Browser SDK:",
                s = {
                    debug: o.debug.bind(i, a),
                    log: o.log.bind(i, a),
                    info: o.info.bind(i, a),
                    warn: o.warn.bind(i, a),
                    error: o.error.bind(i, a)
                }
        },
        13630: (t, e, n) => {
            var r;
            n.d(e, {
                    R9: () => r,
                    jH: () => o,
                    q7: () => s,
                    sr: () => a
                }),
                function(t) {
                    t.PAGEHIDE = "pagehide", t.FEATURE_FLAGS = "feature_flags", t.RESOURCE_PAGE_STATES = "resource_page_states", t.COLLECT_FLUSH_REASON = "collect_flush_reason", t.ZERO_LCP_TELEMETRY = "zero_lcp_telemetry", t.DISABLE_REPLAY_INLINE_CSS = "disable_replay_inline_css", t.WRITABLE_RESOURCE_GRAPHQL = "writable_resource_graphql", t.CUSTOM_VITALS = "custom_vitals"
                }(r || (r = {}));
            var i = new Set;

            function o(t) {
                t.forEach((function(t) {
                    i.add(t)
                }))
            }

            function a(t) {
                return i.has(t)
            }

            function s() {
                return i
            }
        },
        56603: (t, e, n) => {
            function r() {
                if ("object" == typeof globalThis) return globalThis;
                Object.defineProperty(Object.prototype, "_dd_temp_", {
                    get: function() {
                        return this
                    },
                    configurable: !0
                });
                var t = _dd_temp_;
                return delete Object.prototype._dd_temp_, "object" != typeof t && (t = "object" == typeof self ? self : "object" == typeof window ? window : {}), t
            }
            n.d(e, {
                V: () => r
            })
        },
        15304: (t, e, n) => {
            n.d(e, {
                W: () => i
            });
            var r = n(56603);

            function i(t, e) {
                var n, i = (0, r.V)();
                return i.Zone && "function" == typeof i.Zone.__symbol__ && (n = t[i.Zone.__symbol__(e)]), n || (n = t[e]), n
            }
        },
        20207: (t, e, n) => {
            n.d(e, {
                H: () => s,
                t: () => c
            });
            var r = n(79358),
                i = n(17573),
                o = n(51752),
                a = n(78205);

            function s(t, e, n) {
                var r = t[e];
                if ("function" != typeof r) {
                    if (!(0, a.w1)(e, "on")) return {
                        stop: o.l
                    };
                    r = o.l
                }
                var s = function(t, e) {
                        return function() {
                            var n, r = (0, a.A6)(arguments);
                            (0, i.um)(e, null, [{
                                target: this,
                                parameters: r,
                                onPostCall: function(t) {
                                    n = t
                                }
                            }]);
                            var o = t.apply(this, r);
                            return n && (0, i.um)(n, null, [o]), o
                        }
                    }(r, n),
                    c = function() {
                        if ("function" == typeof s) return s.apply(this, arguments)
                    };
                return t[e] = c, {
                    stop: function() {
                        t[e] === c ? t[e] = r : s = r
                    }
                }
            }

            function c(t, e, n) {
                var i = Object.getOwnPropertyDescriptor(t, e);
                if (!i || !i.set || !i.configurable) return {
                    stop: o.l
                };
                var a = o.l,
                    s = function(t, e) {
                        (0, r.wg)((function() {
                            s !== a && n(t, e)
                        }), 0)
                    },
                    c = function(t) {
                        i.set.call(this, t), s(this, t)
                    };
                return Object.defineProperty(t, e, {
                    set: c
                }), {
                    stop: function() {
                        var n;
                        (null === (n = Object.getOwnPropertyDescriptor(t, e)) || void 0 === n ? void 0 : n.set) === c && Object.defineProperty(t, e, i), s = a
                    }
                }
            }
        },
        90717: (t, e, n) => {
            n.d(e, {
                Go: () => o,
                kg: () => a
            });
            var r = n(73916);

            function i(t, e, n) {
                if (void 0 === n && (n = function() {
                        if ("undefined" != typeof WeakSet) {
                            var t = new WeakSet;
                            return {
                                hasAlreadyBeenSeen: function(e) {
                                    var n = t.has(e);
                                    return n || t.add(e), n
                                }
                            }
                        }
                        var e = [];
                        return {
                            hasAlreadyBeenSeen: function(t) {
                                var n = e.indexOf(t) >= 0;
                                return n || e.push(t), n
                            }
                        }
                    }()), void 0 === e) return t;
                if ("object" != typeof e || null === e) return e;
                if (e instanceof Date) return new Date(e.getTime());
                if (e instanceof RegExp) {
                    var o = e.flags || [e.global ? "g" : "", e.ignoreCase ? "i" : "", e.multiline ? "m" : "", e.sticky ? "y" : "", e.unicode ? "u" : ""].join("");
                    return new RegExp(e.source, o)
                }
                if (!n.hasAlreadyBeenSeen(e)) {
                    if (Array.isArray(e)) {
                        for (var a = Array.isArray(t) ? t : [], s = 0; s < e.length; ++s) a[s] = i(a[s], e[s], n);
                        return a
                    }
                    var c = "object" === (0, r.P)(t) ? t : {};
                    for (var u in e) Object.prototype.hasOwnProperty.call(e, u) && (c[u] = i(c[u], e[u], n));
                    return c
                }
            }

            function o(t) {
                return i(void 0, t)
            }

            function a() {
                for (var t, e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
                for (var r = 0, o = e; r < o.length; r++) {
                    var a = o[r];
                    null != a && (t = i(t, a))
                }
                return t
            }
        },
        17573: (t, e, n) => {
            n.d(e, {
                Bd: () => s,
                dm: () => u,
                oO: () => f,
                pM: () => c,
                um: () => l
            });
            var r, i = n(23549),
                o = function(t, e, n) {
                    if (n || 2 === arguments.length)
                        for (var r, i = 0, o = e.length; i < o; i++) !r && i in e || (r || (r = Array.prototype.slice.call(e, 0, i)), r[i] = e[i]);
                    return t.concat(r || Array.prototype.slice.call(e))
                },
                a = !1;

            function s(t) {
                r = t
            }

            function c(t) {
                a = t
            }

            function u(t) {
                return function() {
                    return l(t, this, arguments)
                }
            }

            function l(t, e, n) {
                try {
                    return t.apply(e, n)
                } catch (t) {
                    if (f(t), r) try {
                        r(t)
                    } catch (t) {
                        f(t)
                    }
                }
            }

            function f() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                a && i.Vy.error.apply(i.Vy, o(["[MONITOR]"], t, !1))
            }
        },
        74206: (t, e, n) => {
            n.d(e, {
                F: () => i,
                c: () => r
            });
            var r = function() {
                function t(t) {
                    this.onFirstSubscribe = t, this.observers = []
                }
                return t.prototype.subscribe = function(t) {
                    var e = this;
                    return !this.observers.length && this.onFirstSubscribe && (this.onLastUnsubscribe = this.onFirstSubscribe(this) || void 0), this.observers.push(t), {
                        unsubscribe: function() {
                            e.observers = e.observers.filter((function(e) {
                                return t !== e
                            })), !e.observers.length && e.onLastUnsubscribe && e.onLastUnsubscribe()
                        }
                    }
                }, t.prototype.notify = function(t) {
                    this.observers.forEach((function(e) {
                        return e(t)
                    }))
                }, t
            }();

            function i() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                return new r((function(e) {
                    var n = t.map((function(t) {
                        return t.subscribe((function(t) {
                            return e.notify(t)
                        }))
                    }));
                    return function() {
                        return n.forEach((function(t) {
                            return t.unsubscribe()
                        }))
                    }
                }))
            }
        },
        5375: (t, e, n) => {
            function r(t, e) {
                var n = window.__ddBrowserSdkExtensionCallback;
                n && n({
                    type: t,
                    payload: e
                })
            }
            n.d(e, {
                b: () => r
            })
        },
        72154: (t, e, n) => {
            n.d(e, {
                M: () => o,
                s: () => i
            });
            var r = n(51752);

            function i(t, e, n) {
                if ("object" != typeof t || null === t) return JSON.stringify(t);
                var r = o(Object.prototype),
                    i = o(Array.prototype),
                    a = o(Object.getPrototypeOf(t)),
                    s = o(t);
                try {
                    return JSON.stringify(t, e, n)
                } catch (t) {
                    return "<error: unable to serialize object>"
                } finally {
                    r(), i(), a(), s()
                }
            }

            function o(t) {
                var e = t,
                    n = e.toJSON;
                return n ? (delete e.toJSON, function() {
                    e.toJSON = n
                }) : r.l
            }
        },
        79106: (t, e, n) => {
            n.d(e, {
                a: () => u
            });
            var r = n(23549),
                i = n(88790),
                o = n(72154),
                a = 220 * i._m,
                s = "$",
                c = 3;

            function u(t, e) {
                var n;
                void 0 === e && (e = a);
                var r = (0, o.M)(Object.prototype),
                    i = (0, o.M)(Array.prototype),
                    u = [],
                    d = new WeakMap,
                    v = l(t, s, void 0, u, d),
                    p = (null === (n = JSON.stringify(v)) || void 0 === n ? void 0 : n.length) || 0;
                if (!(p > e)) {
                    for (; u.length > 0 && p < e;) {
                        var m = u.shift(),
                            g = 0;
                        if (Array.isArray(m.source))
                            for (var y = 0; y < m.source.length; y++) {
                                if (p += void 0 !== (h = l(m.source[y], m.path, y, u, d)) ? JSON.stringify(h).length : 4, p += g, g = 1, p > e) {
                                    f(e, "truncated", t);
                                    break
                                }
                                m.target[y] = h
                            } else
                                for (var y in m.source)
                                    if (Object.prototype.hasOwnProperty.call(m.source, y)) {
                                        var h;
                                        if (void 0 !== (h = l(m.source[y], m.path, y, u, d)) && (p += JSON.stringify(h).length + g + y.length + c, g = 1), p > e) {
                                            f(e, "truncated", t);
                                            break
                                        }
                                        m.target[y] = h
                                    }
                    }
                    return r(), i(), v
                }
                f(e, "discarded", t)
            }

            function l(t, e, n, r, i) {
                var o, a = function(t) {
                    var e = t;
                    if (e && "function" == typeof e.toJSON) try {
                        return e.toJSON()
                    } catch (t) {}
                    return t
                }(t);
                if (!a || "object" != typeof a) return "bigint" == typeof(o = a) ? "[BigInt] ".concat(o.toString()) : "function" == typeof o ? "[Function] ".concat(o.name || "unknown") : "symbol" == typeof o ? "[Symbol] ".concat(o.description || o.toString()) : o;
                var s = function(t) {
                    try {
                        if (t instanceof Event) return {
                            isTrusted: t.isTrusted
                        };
                        var e = Object.prototype.toString.call(t).match(/\[object (.*)\]/);
                        if (e && e[1]) return "[".concat(e[1], "]")
                    } catch (t) {}
                    return "[Unserializable]"
                }(a);
                if ("[Object]" !== s && "[Array]" !== s && "[Error]" !== s) return s;
                var c = t;
                if (i.has(c)) return "[Reference seen at ".concat(i.get(c), "]");
                var u = void 0 !== n ? "".concat(e, ".").concat(n) : e,
                    l = Array.isArray(a) ? [] : {};
                return i.set(c, u), r.push({
                    source: a,
                    target: l,
                    path: u
                }), l
            }

            function f(t, e, n) {
                r.Vy.warn("The data provided has been ".concat(e, " as it is over the limit of ").concat(t, " characters:"), n)
            }
        },
        79358: (t, e, n) => {
            n.d(e, {
                DJ: () => s,
                vG: () => u,
                wg: () => a,
                yb: () => c
            });
            var r = n(15304),
                i = n(17573),
                o = n(56603);

            function a(t, e) {
                return (0, r.W)((0, o.V)(), "setTimeout")((0, i.dm)(t), e)
            }

            function s(t) {
                (0, r.W)((0, o.V)(), "clearTimeout")(t)
            }

            function c(t, e) {
                return (0, r.W)((0, o.V)(), "setInterval")((0, i.dm)(t), e)
            }

            function u(t) {
                (0, r.W)((0, o.V)(), "clearInterval")(t)
            }
        },
        71114: (t, e, n) => {
            function r() {
                return 0 === s()
            }

            function i() {
                return 1 === s()
            }

            function o() {
                return 2 === s()
            }
            var a;

            function s() {
                return null != a ? a : a = function(t) {
                    var e;
                    void 0 === t && (t = window);
                    var n = t.navigator.userAgent;
                    return t.chrome || /HeadlessChrome/.test(n) ? 1 : 0 === (null === (e = t.navigator.vendor) || void 0 === e ? void 0 : e.indexOf("Apple")) || /safari/i.test(n) && !/chrome|android/i.test(n) ? 2 : t.document.documentMode ? 0 : 3
                }()
            }
            n.d(e, {
                F2: () => i,
                lT: () => r,
                nr: () => o
            })
        },
        88790: (t, e, n) => {
            n.d(e, {
                WW: () => a,
                _m: () => r,
                iH: () => i,
                wh: () => s
            });
            var r = 1024,
                i = 1024 * r,
                o = /[^\u0000-\u007F]/;

            function a(t) {
                return o.test(t) ? void 0 !== window.TextEncoder ? (new TextEncoder).encode(t).length : new Blob([t]).size : t.length
            }

            function s(t) {
                for (var e = t.reduce((function(t, e) {
                        return t + e.length
                    }), 0), n = new Uint8Array(e), r = 0, i = 0, o = t; i < o.length; i++) {
                    var a = o[i];
                    n.set(a, r), r += a.length
                }
                return n
            }
        },
        51752: (t, e, n) => {
            n.d(e, {
                l: () => o,
                n: () => i
            });
            var r = n(79358);

            function i(t, e, n) {
                var i, o, a = !n || void 0 === n.leading || n.leading,
                    s = !n || void 0 === n.trailing || n.trailing,
                    c = !1;
                return {
                    throttled: function() {
                        for (var n = [], u = 0; u < arguments.length; u++) n[u] = arguments[u];
                        c ? i = n : (a ? t.apply(void 0, n) : i = n, c = !0, o = (0, r.wg)((function() {
                            s && i && t.apply(void 0, i), c = !1, i = void 0
                        }), e))
                    },
                    cancel: function() {
                        (0, r.DJ)(o), c = !1, i = void 0
                    }
                }
            }

            function o() {}
        },
        88551: (t, e, n) => {
            function r(t) {
                return 0 !== t && 100 * Math.random() <= t
            }

            function i(t, e) {
                return +t.toFixed(e)
            }

            function o(t) {
                return a(t) && t >= 0 && t <= 100
            }

            function a(t) {
                return "number" == typeof t
            }
            n.d(e, {
                Et: () => a,
                LI: () => i,
                fp: () => o,
                ic: () => r
            })
        },
        51533: (t, e, n) => {
            n.d(e, {
                LG: () => s,
                RI: () => a,
                Rj: () => o,
                yG: () => i
            });
            var r = n(78205);

            function i(t) {
                return (0, r.kp)({}, t)
            }

            function o(t, e) {
                return Object.keys(t).some((function(n) {
                    return t[n] === e
                }))
            }

            function a(t) {
                return 0 === Object.keys(t).length
            }

            function s(t, e) {
                for (var n = {}, r = 0, i = Object.keys(t); r < i.length; r++) {
                    var o = i[r];
                    n[o] = e(t[o])
                }
                return n
            }
        },
        78205: (t, e, n) => {
            function r(t, e) {
                return -1 !== t.indexOf(e)
            }

            function i(t) {
                if (Array.from) return Array.from(t);
                var e = [];
                if (t instanceof Set) t.forEach((function(t) {
                    return e.push(t)
                }));
                else
                    for (var n = 0; n < t.length; n++) e.push(t[n]);
                return e
            }

            function o(t, e) {
                for (var n = 0; n < t.length; n += 1) {
                    var r = t[n];
                    if (e(r, n)) return r
                }
            }

            function a(t, e) {
                for (var n = t.length - 1; n >= 0; n -= 1) {
                    var r = t[n];
                    if (e(r, n, t)) return r
                }
            }

            function s(t, e) {
                Array.prototype.forEach.call(t, e)
            }

            function c(t) {
                return Object.keys(t).map((function(e) {
                    return t[e]
                }))
            }

            function u(t) {
                return Object.keys(t).map((function(e) {
                    return [e, t[e]]
                }))
            }

            function l(t, e) {
                return t.slice(0, e.length) === e
            }

            function f(t, e) {
                return t.slice(-e.length) === e
            }

            function d(t, e) {
                return t.matches ? t.matches(e) : !!t.msMatchesSelector && t.msMatchesSelector(e)
            }

            function v(t) {
                return window.CSS && window.CSS.escape ? window.CSS.escape(t) : t.replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, (function(t, e) {
                    return e ? "\0" === t ? "�" : "".concat(t.slice(0, -1), "\\").concat(t.charCodeAt(t.length - 1).toString(16), " ") : "\\".concat(t)
                }))
            }

            function p(t) {
                for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                return e.forEach((function(e) {
                    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
                })), t
            }
            n.d(e, {
                A6: () => i,
                C4: () => d,
                I6: () => o,
                KQ: () => c,
                Uk: () => a,
                WP: () => u,
                d5: () => f,
                jG: () => v,
                jJ: () => s,
                kp: () => p,
                mK: () => r,
                w1: () => l
            })
        },
        729: (t, e, n) => {
            function r(t) {
                return t >= 500
            }

            function i(t) {
                try {
                    return t.clone()
                } catch (t) {
                    return
                }
            }
            n.d(e, {
                G: () => r,
                i: () => i
            })
        },
        5187: (t, e, n) => {
            function r(t) {
                return t ? (parseInt(t, 10) ^ 16 * Math.random() >> parseInt(t, 10) / 4).toString(16) : "".concat(1e7, "-").concat(1e3, "-").concat(4e3, "-").concat(8e3, "-").concat(1e11).replace(/[018]/g, r)
            }
            n.d(e, {
                _R: () => s,
                it: () => a,
                lk: () => r,
                rx: () => o
            });
            var i = /([\w-]+)\s*=\s*([^;]+)/g;

            function o(t, e) {
                for (i.lastIndex = 0;;) {
                    var n = i.exec(t);
                    if (!n) break;
                    if (n[1] === e) return n[2]
                }
            }

            function a(t) {
                var e = new Map;
                for (i.lastIndex = 0;;) {
                    var n = i.exec(t);
                    if (!n) break;
                    e.set(n[1], n[2])
                }
                return e
            }

            function s(t, e, n) {
                void 0 === n && (n = "");
                var r = t.charCodeAt(e - 1),
                    i = r >= 55296 && r <= 56319 ? e + 1 : e;
                return t.length <= i ? t : "".concat(t.slice(0, i)).concat(n)
            }
        },
        56955: (t, e, n) => {
            n.d(e, {
                $S: () => m,
                FR: () => u,
                Gw: () => b,
                M8: () => g,
                MA: () => s,
                OY: () => o,
                Oc: () => y,
                TP: () => f,
                Zj: () => d,
                gs: () => S,
                iW: () => a,
                jR: () => l,
                nx: () => p,
                pu: () => w,
                vk: () => h,
                x3: () => v
            });
            var r, i = n(88551),
                o = 1e3,
                a = 60 * o,
                s = 60 * a,
                c = 24 * s * 365;

            function u(t) {
                return {
                    relative: t,
                    timeStamp: (e = t, n = v() - performance.now(), n > C() ? Math.round(b(n, e)) : function(t) {
                        return Math.round(b(C(), t))
                    }(e))
                };
                var e, n
            }

            function l(t) {
                return {
                    relative: S(t),
                    timeStamp: t
                }
            }

            function f() {
                return Math.round(v() - b(C(), performance.now()))
            }

            function d(t) {
                return (0, i.Et)(t) ? (0, i.LI)(1e6 * t, 0) : t
            }

            function v() {
                return (new Date).getTime()
            }

            function p() {
                return v()
            }

            function m() {
                return performance.now()
            }

            function g() {
                return {
                    relative: m(),
                    timeStamp: p()
                }
            }

            function y() {
                return {
                    relative: 0,
                    timeStamp: C()
                }
            }

            function h(t, e) {
                return e - t
            }

            function b(t, e) {
                return t + e
            }

            function S(t) {
                return t - C()
            }

            function w(t) {
                return t < c
            }

            function C() {
                return void 0 === r && (r = performance.timing.navigationStart), r
            }
        },
        73916: (t, e, n) => {
            function r(t) {
                return null === t ? "null" : Array.isArray(t) ? "array" : typeof t
            }
            n.d(e, {
                P: () => r
            })
        },
        63875: (t, e, n) => {
            n.d(e, {
                AY: () => o,
                L2: () => a,
                c$: () => s,
                l2: () => i
            });
            var r = n(72154);

            function i(t) {
                return s(t, location.href).href
            }

            function o(t) {
                try {
                    return !!s(t)
                } catch (t) {
                    return !1
                }
            }

            function a(t) {
                var e = s(t).pathname;
                return "/" === e[0] ? e : "/".concat(e)
            }

            function s(t, e) {
                var n = function() {
                    if (void 0 === c) try {
                        var t = new u("http://test/path");
                        c = "http://test/path" === t.href
                    } catch (t) {
                        c = !1
                    }
                    return c ? u : void 0
                }();
                if (n) try {
                    return void 0 !== e ? new n(t, e) : new n(t)
                } catch (n) {
                    throw new Error("Failed to construct URL: ".concat(String(n), " ").concat((0, r.s)({
                        url: t,
                        base: e
                    })))
                }
                if (void 0 === e && !/:/.test(t)) throw new Error("Invalid URL: '".concat(t, "'"));
                var i = document,
                    o = i.createElement("a");
                if (void 0 !== e) {
                    var a = (i = document.implementation.createHTMLDocument("")).createElement("base");
                    a.href = e, i.head.appendChild(a), i.body.appendChild(o)
                }
                return o.href = t, o
            }
            var c, u = URL
        },
        58059: (t, e, n) => {
            n.d(e, {
                Ww: () => a,
                Y9: () => o,
                d0: () => s
            });
            var r = n(78205),
                i = n(56603);

            function o() {
                var t = (0, i.V)().DatadogEventBridge;
                if (t) return {
                    getCapabilities: function() {
                        var e;
                        return JSON.parse((null === (e = t.getCapabilities) || void 0 === e ? void 0 : e.call(t)) || "[]")
                    },
                    getPrivacyLevel: function() {
                        var e;
                        return null === (e = t.getPrivacyLevel) || void 0 === e ? void 0 : e.call(t)
                    },
                    getAllowedWebViewHosts: function() {
                        return JSON.parse(t.getAllowedWebViewHosts())
                    },
                    send: function(e, n, r) {
                        var i = r ? {
                            id: r
                        } : void 0;
                        t.send(JSON.stringify({
                            eventType: e,
                            event: n,
                            view: i
                        }))
                    }
                }
            }

            function a(t) {
                var e = o();
                return !!e && (0, r.mK)(e.getCapabilities(), t)
            }

            function s(t) {
                var e;
                void 0 === t && (t = null === (e = (0, i.V)().location) || void 0 === e ? void 0 : e.hostname);
                var n = o();
                return !!n && n.getAllowedWebViewHosts().some((function(e) {
                    return t === e || (0, r.d5)(t, ".".concat(e))
                }))
            }
        },
        27871: (t, e, n) => {
            n.d(e, {
                sA: () => w
            });
            var r = n(86560),
                i = n(17573),
                o = n(8027),
                a = n(79358),
                s = n(56955),
                c = n(88790),
                u = n(729),
                l = n(87792),
                f = 80 * c._m,
                d = 32,
                v = 3 * c.iH,
                p = s.iW,
                m = s.OY;

            function g(t, e, n, r, i) {
                0 === e.transportStatus && 0 === e.queuedPayloads.size() && e.bandwidthMonitor.canHandle(t) ? h(t, e, n, {
                    onSuccess: function() {
                        return b(0, e, n, r, i)
                    },
                    onFailure: function() {
                        e.queuedPayloads.enqueue(t), y(e, n, r, i)
                    }
                }) : e.queuedPayloads.enqueue(t)
            }

            function y(t, e, n, r) {
                2 === t.transportStatus && (0, a.wg)((function() {
                    h(t.queuedPayloads.first(), t, e, {
                        onSuccess: function() {
                            t.queuedPayloads.dequeue(), t.currentBackoffTime = m, b(1, t, e, n, r)
                        },
                        onFailure: function() {
                            t.currentBackoffTime = Math.min(p, 2 * t.currentBackoffTime), y(t, e, n, r)
                        }
                    })
                }), t.currentBackoffTime)
            }

            function h(t, e, n, r) {
                var i = r.onSuccess,
                    o = r.onFailure;
                e.bandwidthMonitor.add(t), n(t, (function(n) {
                    e.bandwidthMonitor.remove(t),
                        function(t) {
                            return "opaque" !== t.type && (0 === t.status && !navigator.onLine || 408 === t.status || 429 === t.status || (0, u.G)(t.status))
                        }(n) ? (e.transportStatus = e.bandwidthMonitor.ongoingRequestCount > 0 ? 1 : 2, t.retry = {
                            count: t.retry ? t.retry.count + 1 : 1,
                            lastFailureStatus: n.status
                        }, o()) : (e.transportStatus = 0, i())
                }))
            }

            function b(t, e, n, r, i) {
                0 === t && e.queuedPayloads.isFull() && !e.queueFullReported && (i({
                    message: "Reached max ".concat(r, " events size queued for upload: ").concat(v / c.iH, "MiB"),
                    source: l.g.AGENT,
                    startClocks: (0, s.M8)()
                }), e.queueFullReported = !0);
                var o = e.queuedPayloads;
                for (e.queuedPayloads = S(); o.size() > 0;) g(o.dequeue(), e, n, r, i)
            }

            function S() {
                var t = [];
                return {
                    bytesCount: 0,
                    enqueue: function(e) {
                        this.isFull() || (t.push(e), this.bytesCount += e.bytesCount)
                    },
                    first: function() {
                        return t[0]
                    },
                    dequeue: function() {
                        var e = t.shift();
                        return e && (this.bytesCount -= e.bytesCount), e
                    },
                    size: function() {
                        return t.length
                    },
                    isFull: function() {
                        return this.bytesCount >= v
                    }
                }
            }

            function w(t, e, n, o) {
                var a = {
                        transportStatus: 0,
                        currentBackoffTime: m,
                        bandwidthMonitor: {
                            ongoingRequestCount: 0,
                            ongoingByteCount: 0,
                            canHandle: function(t) {
                                return 0 === this.ongoingRequestCount || this.ongoingByteCount + t.bytesCount <= f && this.ongoingRequestCount < d
                            },
                            add: function(t) {
                                this.ongoingRequestCount += 1, this.ongoingByteCount += t.bytesCount
                            },
                            remove: function(t) {
                                this.ongoingRequestCount -= 1, this.ongoingByteCount -= t.bytesCount
                            }
                        },
                        queuedPayloads: S(),
                        queueFullReported: !1
                    },
                    s = function(r, o) {
                        return function(t, e, n, r, o) {
                            if (function() {
                                    try {
                                        return window.Request && "keepalive" in new Request("http://a")
                                    } catch (t) {
                                        return !1
                                    }
                                }() && r.bytesCount < n) {
                                var a = e.build("fetch", r);
                                fetch(a, {
                                    method: "POST",
                                    body: r.data,
                                    keepalive: !0,
                                    mode: "cors"
                                }).then((0, i.dm)((function(t) {
                                    return null == o ? void 0 : o({
                                        status: t.status,
                                        type: t.type
                                    })
                                })), (0, i.dm)((function() {
                                    var n = e.build("xhr", r);
                                    T(t, n, r.data, o)
                                })))
                            } else {
                                var s = e.build("xhr", r);
                                T(t, s, r.data, o)
                            }
                        }(t, e, n, r, o)
                    };
                return {
                    send: function(t) {
                        g(t, a, s, e.trackType, o)
                    },
                    sendOnExit: function(i) {
                        ! function(t, e, n, i) {
                            if (!!navigator.sendBeacon && i.bytesCount < n) try {
                                var o = e.build("beacon", i);
                                if (navigator.sendBeacon(o, i.data)) return
                            } catch (t) {
                                ! function(t) {
                                    C || (C = !0, (0, r.VJ)(t))
                                }(t)
                            }
                            T(t, e.build("xhr", i), i.data)
                        }(t, e, n, i)
                    }
                }
            }
            var C = !1;

            function T(t, e, n, r) {
                var i = new XMLHttpRequest;
                i.open("POST", e, !0), n instanceof Blob && i.setRequestHeader("Content-Type", n.type), (0, o.q2)(t, i, "loadend", (function() {
                    null == r || r({
                        status: i.status
                    })
                }), {
                    once: !0
                }), i.send(n)
            }
        },
        17168: (t, e, n) => {
            n.d(e, {
                yF: () => Te,
                wI: () => wt,
                W3: () => nt,
                $4: () => Ct,
                Gn: () => Sn,
                zL: () => wn,
                dx: () => or,
                pB: () => Tn,
                wR: () => St,
                g1: () => Cn,
                nS: () => yt,
                XS: () => ht,
                p_: () => bt,
                ir: () => gt,
                AB: () => $,
                rJ: () => rr
            });
            var r = n(88790),
                i = n(51752),
                o = n(72154),
                a = n(23549),
                s = n(51533),
                c = 3 * r._m,
                u = 16 * r._m,
                l = 200;

            function f(t) {
                var e = 0,
                    n = (0, i.n)((function(n) {
                        e = (0, r.WW)((0, o.s)(n)), t()
                    }), l),
                    a = n.throttled,
                    c = n.cancel,
                    u = function() {
                        c(), e = 0
                    };
                return {
                    updateCustomerData: function(t) {
                        (0, s.RI)(t) ? u(): a(t)
                    },
                    resetCustomerData: u,
                    getBytesCount: function() {
                        return e
                    },
                    stop: function() {
                        c()
                    }
                }
            }
            var d = n(90717),
                v = n(73916),
                p = n(79106),
                m = n(74206);

            function g(t) {
                var e = {},
                    n = new m.c,
                    r = {
                        getContext: function() {
                            return (0, d.Go)(e)
                        },
                        setContext: function(i) {
                            "object" === (0, v.P)(i) ? (e = (0, p.a)(i), t.updateCustomerData(e)) : r.clearContext(), n.notify()
                        },
                        setContextProperty: function(r, i) {
                            e[r] = (0, p.a)(i), t.updateCustomerData(e), n.notify()
                        },
                        removeContextProperty: function(r) {
                            delete e[r], t.updateCustomerData(e), n.notify()
                        },
                        clearContext: function() {
                            e = {}, t.resetCustomerData(), n.notify()
                        },
                        changeObservable: n
                    };
                return r
            }
            var y = n(16069),
                h = n(13630),
                b = n(17573),
                S = n(56955),
                w = n(8027),
                C = "_dd_c",
                T = [];

            function E(t, e, n, r) {
                var i = function(t, e) {
                    return "".concat(C, "_").concat(t, "_").concat(e)
                }(n, r);

                function o() {
                    var t = localStorage.getItem(i);
                    return null !== t ? JSON.parse(t) : {}
                }
                T.push((0, w.q2)(t, window, w.gX.STORAGE, (function(t) {
                    var n = t.key;
                    i === n && e.setContext(o())
                }))), e.changeObservable.subscribe((function() {
                    localStorage.setItem(i, JSON.stringify(e.getContext()))
                })), e.setContext((0, d.kg)(o(), e.getContext()))
            }

            function _() {
                var t = "",
                    e = 0;
                return {
                    isAsync: !1,
                    get isEmpty() {
                        return !t
                    },
                    write: function(n, i) {
                        var o = (0, r.WW)(n);
                        e += o, t += n, i && i(o)
                    },
                    finish: function(t) {
                        t(this.finishSync())
                    },
                    finishSync: function() {
                        var n = {
                            output: t,
                            outputBytesCount: e,
                            rawBytesCount: e,
                            pendingData: ""
                        };
                        return t = "", e = 0, n
                    },
                    estimateEncodedBytesCount: function(t) {
                        return t.length
                    }
                }
            }
            var k = n(98056),
                x = n(67047),
                A = n(78205);

            function R(t) {
                var e = (0, A.kp)({}, t);
                return ["id", "name", "email"].forEach((function(t) {
                    t in e && (e[t] = String(e[t]))
                })), e
            }

            function I(t, e) {
                e.silentMultipleInit || a.Vy.error("".concat(t, " is already initialized."))
            }

            function O(t, e) {
                var n = t.indexOf(e);
                n >= 0 && t.splice(n, 1)
            }
            var N = function() {
                    function t() {
                        this.buffer = []
                    }
                    return t.prototype.add = function(t) {
                        this.buffer.push(t) > 500 && this.buffer.splice(0, 1)
                    }, t.prototype.remove = function(t) {
                        O(this.buffer, t)
                    }, t.prototype.drain = function(t) {
                        this.buffer.forEach((function(e) {
                            return e(t)
                        })), this.buffer.length = 0
                    }, t
                }(),
                P = n(58059),
                L = n(96316),
                M = "datadog-synthetics-public-id",
                D = "datadog-synthetics-result-id",
                V = "datadog-synthetics-injects-rum";

            function U() {
                return Boolean(window._DATADOG_SYNTHETICS_INJECTS_RUM || (0, L.B9)(V))
            }
            var B = n(88551),
                j = n(62256);

            function F(t) {
                var e = (0, v.P)(t);
                return "string" === e || "function" === e || t instanceof RegExp
            }

            function G(t, e, n) {
                return void 0 === n && (n = !1), t.some((function(t) {
                    try {
                        if ("function" == typeof t) return t(e);
                        if (t instanceof RegExp) return t.test(e);
                        if ("string" == typeof t) return n ? (0, A.w1)(e, t) : t === e
                    } catch (t) {
                        a.Vy.error(t)
                    }
                    return !1
                }))
            }

            function q(t) {
                0 !== t.status || t.isAborted || (t.traceId = void 0, t.spanId = void 0, t.traceSampled = void 0)
            }

            function H(t, e, n, r) {
                if (void 0 !== W() && n.findTrackedSession()) {
                    var i, o, a, s, c, u = (0, A.I6)(t.allowedTracingUrls, (function(t) {
                        return G([t.match], e.url, !0)
                    }));
                    u && (e.traceSampled = !(0, B.Et)(t.traceSampleRate) || (0, B.ic)(t.traceSampleRate), (e.traceSampled || t.traceContextInjection === j.uT.ALL) && (e.traceId = new X, e.spanId = new X, r((i = e.traceId, o = e.spanId, a = e.traceSampled, s = u.propagatorTypes, c = {}, s.forEach((function(t) {
                        switch (t) {
                            case "datadog":
                                (0, A.kp)(c, {
                                    "x-datadog-origin": "rum",
                                    "x-datadog-parent-id": o.toDecimalString(),
                                    "x-datadog-sampling-priority": a ? "1" : "0",
                                    "x-datadog-trace-id": i.toDecimalString()
                                });
                                break;
                            case "tracecontext":
                                (0, A.kp)(c, {
                                    traceparent: "00-0000000000000000".concat(i.toPaddedHexadecimalString(), "-").concat(o.toPaddedHexadecimalString(), "-0").concat(a ? "1" : "0")
                                });
                                break;
                            case "b3":
                                (0, A.kp)(c, {
                                    b3: "".concat(i.toPaddedHexadecimalString(), "-").concat(o.toPaddedHexadecimalString(), "-").concat(a ? "1" : "0")
                                });
                                break;
                            case "b3multi":
                                (0, A.kp)(c, {
                                    "X-B3-TraceId": i.toPaddedHexadecimalString(),
                                    "X-B3-SpanId": o.toPaddedHexadecimalString(),
                                    "X-B3-Sampled": a ? "1" : "0"
                                })
                        }
                    })), c))))
                }
            }

            function W() {
                return window.crypto || window.msCrypto
            }
            var X = function() {
                    function t() {
                        this.buffer = new Uint8Array(8), W().getRandomValues(this.buffer), this.buffer[0] = 127 & this.buffer[0]
                    }
                    return t.prototype.toString = function(t) {
                        var e = this.readInt32(0),
                            n = this.readInt32(4),
                            r = "";
                        do {
                            var i = e % t * 4294967296 + n;
                            e = Math.floor(e / t), n = Math.floor(i / t), r = (i % t).toString(t) + r
                        } while (e || n);
                        return r
                    }, t.prototype.toDecimalString = function() {
                        return this.toString(10)
                    }, t.prototype.toPaddedHexadecimalString = function() {
                        var t = this.toString(16);
                        return Array(17 - t.length).join("0") + t
                    }, t.prototype.readInt32 = function(t) {
                        return 16777216 * this.buffer[t] + (this.buffer[t + 1] << 16) + (this.buffer[t + 2] << 8) + this.buffer[t + 3]
                    }, t
                }(),
                Y = ["tracecontext", "datadog"];

            function z(t) {
                var e = new Set;
                return Array.isArray(t.allowedTracingUrls) && t.allowedTracingUrls.length > 0 && t.allowedTracingUrls.forEach((function(t) {
                    F(t) ? Y.forEach((function(t) {
                        return e.add(t)
                    })) : "object" === (0, v.P)(t) && Array.isArray(t.propagatorTypes) && t.propagatorTypes.forEach((function(t) {
                        return e.add(t)
                    }))
                })), (0, A.A6)(e)
            }

            function Z(t, e, n, r) {
                var o, c, u, l, f = t.ignoreInitIfSyntheticsWillInjectRum,
                    d = t.startDeflateWorker,
                    p = new N,
                    m = n.observable.subscribe(g);

                function g() {
                    if (u && l && n.isGranted()) {
                        var t;
                        if (m.unsubscribe(), l.trackViewsManually) {
                            if (!o) return;
                            p.remove(o.callback), t = o.options
                        }
                        var e = r(u, l, c, t);
                        p.drain(e)
                    }
                }
                return {
                    init: function(t) {
                        if (t) {
                            var e = (0, P.d0)();
                            if (e && (t = function(t) {
                                    var e, n;
                                    return (0, A.kp)({}, t, {
                                        applicationId: "00000000-aaaa-0000-aaaa-000000000000",
                                        clientToken: "empty",
                                        sessionSampleRate: 100,
                                        defaultPrivacyLevel: null !== (e = t.defaultPrivacyLevel) && void 0 !== e ? e : null === (n = (0, P.Y9)()) || void 0 === n ? void 0 : n.getPrivacyLevel()
                                    })
                                }(t)), u = t, l) I("DD_RUM", t);
                            else if (!f || !U()) {
                                var r = function(t) {
                                    var e, n;
                                    if (t.applicationId)
                                        if (void 0 === t.sessionReplaySampleRate || (0, B.fp)(t.sessionReplaySampleRate))
                                            if (void 0 === t.traceSampleRate || (0, B.fp)(t.traceSampleRate))
                                                if (void 0 === t.excludedActivityUrls || Array.isArray(t.excludedActivityUrls)) {
                                                    var r = function(t) {
                                                        if (void 0 !== t.allowedTracingUrls) {
                                                            if (!Array.isArray(t.allowedTracingUrls)) return void a.Vy.error("Allowed Tracing URLs should be an array");
                                                            if (0 !== t.allowedTracingUrls.length && void 0 === t.service) return void a.Vy.error("Service needs to be configured when tracing is enabled");
                                                            var e = [];
                                                            return t.allowedTracingUrls.forEach((function(t) {
                                                                var n;
                                                                F(t) ? e.push({
                                                                    match: t,
                                                                    propagatorTypes: Y
                                                                }) : (n = t, "object" === (0, v.P)(n) && F(n.match) && Array.isArray(n.propagatorTypes) ? e.push(t) : a.Vy.warn("Allowed Tracing Urls parameters should be a string, RegExp, function, or an object. Ignoring parameter", t))
                                                            })), e
                                                        }
                                                        return []
                                                    }(t);
                                                    if (r) {
                                                        var i = (0, j.Sz)(t);
                                                        if (i) return (0, A.kp)({
                                                            applicationId: t.applicationId,
                                                            version: t.version,
                                                            actionNameAttribute: t.actionNameAttribute,
                                                            sessionReplaySampleRate: null !== (e = t.sessionReplaySampleRate) && void 0 !== e ? e : 0,
                                                            startSessionReplayRecordingManually: !!t.startSessionReplayRecordingManually,
                                                            traceSampleRate: t.traceSampleRate,
                                                            allowedTracingUrls: r,
                                                            excludedActivityUrls: null !== (n = t.excludedActivityUrls) && void 0 !== n ? n : [],
                                                            workerUrl: t.workerUrl,
                                                            compressIntakeRequests: !!t.compressIntakeRequests,
                                                            trackUserInteractions: !!t.trackUserInteractions,
                                                            trackViewsManually: !!t.trackViewsManually,
                                                            trackResources: !!t.trackResources,
                                                            trackLongTasks: !!t.trackLongTasks,
                                                            subdomain: t.subdomain,
                                                            defaultPrivacyLevel: (0, s.Rj)(j.WA, t.defaultPrivacyLevel) ? t.defaultPrivacyLevel : j.WA.MASK,
                                                            customerDataTelemetrySampleRate: 1,
                                                            traceContextInjection: (0, s.Rj)(j.uT, t.traceContextInjection) ? t.traceContextInjection : j.uT.ALL
                                                        }, i)
                                                    }
                                                } else a.Vy.error("Excluded Activity Urls should be an array");
                                    else a.Vy.error("Trace Sample Rate should be a number between 0 and 100");
                                    else a.Vy.error("Session Replay Sample Rate should be a number between 0 and 100");
                                    else a.Vy.error("Application ID is not configured, no RUM data will be collected.")
                                }(t);
                                r && (e || r.sessionStoreStrategyType ? r.compressIntakeRequests && !e && d && !(c = d(r, "Datadog RUM", i.l)) || (l = r, n.tryToInit(r.trackingConsent), g()) : a.Vy.warn("No storage available for session. We will not send any data."))
                            }
                        } else a.Vy.error("Missing configuration")
                    },
                    get initConfiguration() {
                        return u
                    },
                    getInternalContext: i.l,
                    stopSession: i.l,
                    addTiming: function(t, e) {
                        void 0 === e && (e = (0, S.nx)()), p.add((function(n) {
                            return n.addTiming(t, e)
                        }))
                    },
                    startView: function(t, e) {
                        void 0 === e && (e = (0, S.M8)());
                        var n = function(n) {
                            n.startView(t, e)
                        };
                        p.add(n), o || (o = {
                            options: t,
                            callback: n
                        }, g())
                    },
                    addAction: function(t, n) {
                        void 0 === n && (n = e()), p.add((function(e) {
                            return e.addAction(t, n)
                        }))
                    },
                    addError: function(t, n) {
                        void 0 === n && (n = e()), p.add((function(e) {
                            return e.addError(t, n)
                        }))
                    },
                    addFeatureFlagEvaluation: function(t, e) {
                        p.add((function(n) {
                            return n.addFeatureFlagEvaluation(t, e)
                        }))
                    },
                    startDurationVital: function(t) {
                        p.add((function(e) {
                            return e.startDurationVital(t)
                        }))
                    },
                    stopDurationVital: function(t) {
                        p.add((function(e) {
                            return e.stopDurationVital(t)
                        }))
                    }
                }
            }
            var J = "rum";

            function $(t, e, n) {
                void 0 === n && (n = {});
                var i = function(t) {
                        void 0 === t && (t = 2);
                        var e = new Map,
                            n = !1;

                        function i(i) {
                            if (void 0 === i && (i = 0), !n && 0 !== t) {
                                var o = 2 === t ? c : u,
                                    s = i;
                                e.forEach((function(t) {
                                    s += t.getBytesCount()
                                })), s > o && (function(t) {
                                    a.Vy.warn("Customer data exceeds the recommended ".concat(t / r._m, "KiB threshold. More details: https://docs.datadoghq.com/real_user_monitoring/browser/troubleshooting/#customer-data-exceeds-the-recommended-threshold-warning"))
                                }(o), n = !0)
                            }
                        }
                        return {
                            createDetachedTracker: function() {
                                var t = f((function() {
                                    return i(t.getBytesCount())
                                }));
                                return t
                            },
                            getOrCreateTracker: function(t) {
                                return e.has(t) || e.set(t, f(i)), e.get(t)
                            },
                            setCompressionStatus: function(e) {
                                0 === t && (t = e, i())
                            },
                            getCompressionStatus: function() {
                                return t
                            },
                            stop: function() {
                                e.forEach((function(t) {
                                    return t.stop()
                                })), e.clear()
                            }
                        }
                    }(0),
                    o = g(i.getOrCreateTracker(2)),
                    s = g(i.getOrCreateTracker(1)),
                    l = (0, y.D)();

                function m() {
                    return function(t, e, n) {
                        return {
                            context: t.getContext(),
                            user: e.getContext(),
                            hasReplay: !!n.isRecording() || void 0
                        }
                    }(o, s, e)
                }
                var w = Z(n, m, l, (function(r, a, c, u) {
                        (0, h.sr)(h.R9.CUSTOM_VITALS) && (T.startDurationVital = (0, b.dm)((function(t, e) {
                            w.startDurationVital({
                                name: (0, p.a)(t),
                                startClocks: (null == e ? void 0 : e.startTime) ? (0, S.jR)(e.startTime) : (0, S.M8)(),
                                context: (0, p.a)(null == e ? void 0 : e.context)
                            })
                        })), T.stopDurationVital = (0, b.dm)((function(t, e) {
                            w.stopDurationVital({
                                name: (0, p.a)(t),
                                stopClocks: (null == e ? void 0 : e.stopTime) ? (0, S.jR)(e.stopTime) : (0, S.M8)(),
                                context: (0, p.a)(null == e ? void 0 : e.context)
                            })
                        }))), r.storeContextsAcrossPages && (E(a, o, J, 2), E(a, s, J, 1)), i.setCompressionStatus(c ? 1 : 2);
                        var f = t(r, a, e, i, m, u, c && n.createDeflateEncoder ? function(t) {
                            return n.createDeflateEncoder(a, c, t)
                        } : _, l);
                        return e.onRumStart(f.lifeCycle, a, f.session, f.viewContexts, c), w = function(t, e) {
                            return (0, A.kp)({
                                init: function(t) {
                                    I("DD_RUM", t)
                                },
                                initConfiguration: t
                            }, e)
                        }(r, f), f
                    })),
                    C = (0, b.dm)((function(t) {
                        var e = "object" == typeof t ? t : {
                            name: t
                        };
                        w.startView(e)
                    })),
                    T = (0, k.m)({
                        init: (0, b.dm)((function(t) {
                            return w.init(t)
                        })),
                        setTrackingConsent: (0, b.dm)((function(t) {
                            return l.update(t)
                        })),
                        setGlobalContextProperty: (0, b.dm)((function(t, e) {
                            return o.setContextProperty(t, e)
                        })),
                        removeGlobalContextProperty: (0, b.dm)((function(t) {
                            return o.removeContextProperty(t)
                        })),
                        getGlobalContext: (0, b.dm)((function() {
                            return o.getContext()
                        })),
                        setGlobalContext: (0, b.dm)((function(t) {
                            return o.setContext(t)
                        })),
                        clearGlobalContext: (0, b.dm)((function() {
                            return o.clearContext()
                        })),
                        getInternalContext: (0, b.dm)((function(t) {
                            return w.getInternalContext(t)
                        })),
                        getInitConfiguration: (0, b.dm)((function() {
                            return (0, d.Go)(w.initConfiguration)
                        })),
                        addAction: (0, b.dm)((function(t, e) {
                            w.addAction({
                                name: (0, p.a)(t),
                                context: (0, p.a)(e),
                                startClocks: (0, S.M8)(),
                                type: "custom"
                            })
                        })),
                        addError: function(t, e) {
                            var n = (0, x.uC)();
                            (0, b.um)((function() {
                                w.addError({
                                    error: t,
                                    handlingStack: n,
                                    context: (0, p.a)(e),
                                    startClocks: (0, S.M8)()
                                })
                            }))
                        },
                        addTiming: (0, b.dm)((function(t, e) {
                            w.addTiming((0, p.a)(t), e)
                        })),
                        setUser: (0, b.dm)((function(t) {
                            (function(t) {
                                var e = "object" === (0, v.P)(t);
                                return e || a.Vy.error("Unsupported user:", t), e
                            })(t) && s.setContext(R(t))
                        })),
                        getUser: (0, b.dm)((function() {
                            return s.getContext()
                        })),
                        setUserProperty: (0, b.dm)((function(t, e) {
                            var n, r = R((n = {}, n[t] = e, n))[t];
                            s.setContextProperty(t, r)
                        })),
                        removeUserProperty: (0, b.dm)((function(t) {
                            return s.removeContextProperty(t)
                        })),
                        clearUser: (0, b.dm)((function() {
                            return s.clearContext()
                        })),
                        startView: C,
                        stopSession: (0, b.dm)((function() {
                            w.stopSession()
                        })),
                        addFeatureFlagEvaluation: (0, b.dm)((function(t, e) {
                            w.addFeatureFlagEvaluation((0, p.a)(t), (0, p.a)(e))
                        })),
                        getSessionReplayLink: (0, b.dm)((function() {
                            return e.getSessionReplayLink()
                        })),
                        startSessionReplayRecording: (0, b.dm)((function() {
                            return e.start()
                        })),
                        stopSessionReplayRecording: (0, b.dm)((function() {
                            return e.stop()
                        }))
                    });
                return T
            }
            var K = n(5375),
                Q = n(86560),
                tt = n(49020),
                et = n(15304);

            function nt() {
                var t, e = window;
                if (e.Zone && (t = (0, et.W)(e, "MutationObserver"), e.MutationObserver && t === e.MutationObserver)) {
                    var n = new e.MutationObserver(i.l),
                        r = (0, et.W)(n, "originalInstance");
                    t = r && r.constructor
                }
                return t || (t = e.MutationObserver), t
            }
            var rt = n(79358),
                it = n(3908),
                ot = n(63875),
                at = "initial_document",
                st = [
                    ["document", function(t) {
                        return at === t
                    }],
                    ["xhr", function(t) {
                        return "xmlhttprequest" === t
                    }],
                    ["fetch", function(t) {
                        return "fetch" === t
                    }],
                    ["beacon", function(t) {
                        return "beacon" === t
                    }],
                    ["css", function(t, e) {
                        return /\.css$/i.test(e)
                    }],
                    ["js", function(t, e) {
                        return /\.js$/i.test(e)
                    }],
                    ["image", function(t, e) {
                        return (0, A.mK)(["image", "img", "icon"], t) || null !== /\.(gif|jpg|jpeg|tiff|png|svg|ico)$/i.exec(e)
                    }],
                    ["font", function(t, e) {
                        return null !== /\.(woff|eot|woff2|ttf)$/i.exec(e)
                    }],
                    ["media", function(t, e) {
                        return (0, A.mK)(["audio", "video"], t) || null !== /\.(mp3|mp4)$/i.exec(e)
                    }]
                ];

            function ct() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                for (var n = 1; n < t.length; n += 1)
                    if (t[n - 1] > t[n]) return !1;
                return !0
            }

            function ut(t) {
                var e = lt(t);
                if (e) {
                    var n = e.startTime,
                        r = e.fetchStart,
                        i = e.redirectStart,
                        o = e.redirectEnd,
                        a = e.domainLookupStart,
                        s = e.domainLookupEnd,
                        c = e.connectStart,
                        u = e.secureConnectionStart,
                        l = e.connectEnd,
                        f = e.requestStart,
                        d = e.responseStart,
                        v = {
                            download: dt(n, d, e.responseEnd),
                            first_byte: dt(n, f, d)
                        };
                    return l !== r && (v.connect = dt(n, c, l), ct(c, u, l) && (v.ssl = dt(n, u, l))), s !== r && (v.dns = dt(n, a, s)), ft(t) && (v.redirect = dt(n, i, o)), v
                }
            }

            function lt(t) {
                if (ct(t.startTime, t.fetchStart, t.domainLookupStart, t.domainLookupEnd, t.connectStart, t.connectEnd, t.requestStart, t.responseStart, t.responseEnd)) {
                    if (!ft(t)) return t;
                    var e = t.redirectStart,
                        n = t.redirectEnd;
                    if (e < t.startTime && (e = t.startTime), n < t.startTime && (n = t.fetchStart), ct(t.startTime, e, n, t.fetchStart)) return (0, A.kp)({}, t, {
                        redirectEnd: n,
                        redirectStart: e
                    })
                }
            }

            function ft(t) {
                return t.fetchStart !== t.startTime
            }

            function dt(t, e, n) {
                return {
                    duration: (0, S.Zj)((0, S.vk)(e, n)),
                    start: (0, S.Zj)((0, S.vk)(t, e))
                }
            }

            function vt(t) {
                if (t.startTime < t.responseStart) {
                    var e = t.encodedBodySize,
                        n = t.decodedBodySize;
                    return {
                        size: n,
                        encoded_body_size: e,
                        decoded_body_size: n,
                        transfer_size: t.transferSize
                    }
                }
                return {
                    size: void 0,
                    encoded_body_size: void 0,
                    decoded_body_size: void 0,
                    transfer_size: void 0
                }
            }

            function pt(t, e) {
                return e && !t.isIntakeUrl(e)
            }
            var mt = n(5187);

            function gt(t) {
                return t.nodeType === Node.TEXT_NODE
            }

            function yt(t) {
                return t.nodeType === Node.ELEMENT_NODE
            }

            function ht(t) {
                return yt(t) && Boolean(t.shadowRoot)
            }

            function bt(t) {
                var e = t;
                return !!e.host && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE && yt(e.host)
            }

            function St(t) {
                return t.childNodes.length > 0 || ht(t)
            }

            function wt(t, e) {
                for (var n = t.firstChild; n;) e(n), n = n.nextSibling;
                ht(t) && e(t.shadowRoot)
            }

            function Ct(t) {
                return bt(t) ? t.host : t.parentNode
            }
            var Tt, Et = 2 * S.iW;

            function _t(t) {
                var e = function(t) {
                    var e = t.querySelector("meta[name=dd-trace-id]"),
                        n = t.querySelector("meta[name=dd-trace-time]");
                    return kt(e && e.content, n && n.content)
                }(t) || function(t) {
                    var e = function(t) {
                        for (var e = 0; e < t.childNodes.length; e += 1)
                            if (n = xt(t.childNodes[e])) return n;
                        if (t.body)
                            for (e = t.body.childNodes.length - 1; e >= 0; e -= 1) {
                                var n, r = t.body.childNodes[e];
                                if (n = xt(r)) return n;
                                if (!gt(r)) break
                            }
                    }(t);
                    if (e) return kt((0, mt.rx)(e, "trace-id"), (0, mt.rx)(e, "trace-time"))
                }(t);
                if (e && !(e.traceTime <= (0, S.x3)() - Et)) return e.traceId
            }

            function kt(t, e) {
                var n = e && Number(e);
                if (t && n) return {
                    traceId: t,
                    traceTime: n
                }
            }

            function xt(t) {
                if (t && function(t) {
                        return t.nodeType === Node.COMMENT_NODE
                    }(t)) {
                    var e = /^\s*DATADOG;(.*?)\s*$/.exec(t.data);
                    if (e) return e[1]
                }
            }

            function At() {
                return void 0 !== window.performance && "getEntries" in performance
            }

            function Rt(t) {
                return window.PerformanceObserver && void 0 !== PerformanceObserver.supportedEntryTypes && PerformanceObserver.supportedEntryTypes.includes(t)
            }

            function It(t, e) {
                var n = [];
                if (function(t, e) {
                        (0, it.H)(t, "interactive", (function() {
                            var t, n = {
                                entryType: Tt.RESOURCE,
                                initiatorType: at,
                                traceId: _t(document),
                                toJSON: function() {
                                    return (0, A.kp)({}, t, {
                                        toJSON: void 0
                                    })
                                }
                            };
                            if (Rt(Tt.NAVIGATION) && performance.getEntriesByType(Tt.NAVIGATION).length > 0) {
                                var r = performance.getEntriesByType(Tt.NAVIGATION)[0];
                                t = (0, A.kp)(r.toJSON(), n)
                            } else {
                                var i = Ot();
                                t = (0, A.kp)(i, {
                                    decodedBodySize: 0,
                                    encodedBodySize: 0,
                                    transferSize: 0,
                                    renderBlockingStatus: "non-blocking",
                                    duration: i.responseEnd,
                                    name: window.location.href,
                                    startTime: 0
                                }, n)
                            }
                            e(t)
                        }))
                    }(e, (function(n) {
                        Nt(t, e, [n])
                    })), At()) {
                    var r = performance.getEntries();
                    (0, rt.wg)((function() {
                        return Nt(t, e, r)
                    }))
                }
                if (window.PerformanceObserver) {
                    var i = (0, b.dm)((function(n) {
                            return Nt(t, e, n.getEntries())
                        })),
                        o = [Tt.RESOURCE, Tt.NAVIGATION, Tt.LONG_TASK, Tt.PAINT],
                        a = [Tt.LARGEST_CONTENTFUL_PAINT, Tt.FIRST_INPUT, Tt.LAYOUT_SHIFT, Tt.EVENT];
                    try {
                        a.forEach((function(t) {
                            var e = new window.PerformanceObserver(i);
                            e.observe({
                                type: t,
                                buffered: !0,
                                durationThreshold: 40
                            }), n.push((function() {
                                return e.disconnect()
                            }))
                        }))
                    } catch (t) {
                        o.push.apply(o, a)
                    }
                    var s = new PerformanceObserver(i);
                    if (s.observe({
                            entryTypes: o
                        }), n.push((function() {
                            return s.disconnect()
                        })), At() && "addEventListener" in performance) {
                        var c = (0, w.q2)(e, performance, "resourcetimingbufferfull", (function() {
                            performance.clearResourceTimings()
                        })).stop;
                        n.push(c)
                    }
                }
                if (Rt(Tt.NAVIGATION) || function(t, e) {
                        function n() {
                            e((0, A.kp)(Ot(), {
                                entryType: Tt.NAVIGATION
                            }))
                        }(0, it.H)(t, "complete", (function() {
                            (0, rt.wg)(n)
                        }))
                    }(e, (function(n) {
                        Nt(t, e, [n])
                    })), !Rt(Tt.FIRST_INPUT)) {
                    var u = function(t, e) {
                        var n = (0, S.x3)(),
                            r = !1,
                            i = (0, w.lQ)(t, window, [w.gX.CLICK, w.gX.MOUSE_DOWN, w.gX.KEY_DOWN, w.gX.TOUCH_START, w.gX.POINTER_DOWN], (function(e) {
                                if (e.cancelable) {
                                    var n = {
                                        entryType: Tt.FIRST_INPUT,
                                        processingStart: (0, S.$S)(),
                                        processingEnd: (0, S.$S)(),
                                        startTime: e.timeStamp,
                                        duration: 0,
                                        name: ""
                                    };
                                    e.type === w.gX.POINTER_DOWN ? function(t, e) {
                                        (0, w.lQ)(t, window, [w.gX.POINTER_UP, w.gX.POINTER_CANCEL], (function(t) {
                                            t.type === w.gX.POINTER_UP && o(e)
                                        }), {
                                            once: !0
                                        })
                                    }(t, n) : o(n)
                                }
                            }), {
                                passive: !0,
                                capture: !0
                            }).stop;
                        return {
                            stop: i
                        };

                        function o(t) {
                            if (!r) {
                                r = !0, i();
                                var o = t.processingStart - t.startTime;
                                o >= 0 && o < (0, S.x3)() - n && e(t)
                            }
                        }
                    }(e, (function(n) {
                        Nt(t, e, [n])
                    })).stop;
                    n.push(u)
                }
                return {
                    stop: function() {
                        n.forEach((function(t) {
                            return t()
                        }))
                    }
                }
            }

            function Ot() {
                var t = {},
                    e = performance.timing;
                for (var n in e)
                    if ((0, B.Et)(e[n])) {
                        var r = n,
                            i = e[r];
                        t[r] = 0 === i ? 0 : (0, S.gs)(i)
                    }
                return t
            }

            function Nt(t, e, n) {
                var r = n.filter((function(t) {
                    return (0, s.Rj)(Tt, t.entryType)
                })).filter((function(t) {
                    return ! function(t) {
                        return t.entryType === Tt.NAVIGATION && t.loadEventEnd <= 0
                    }(t) && ! function(t, e) {
                        return e.entryType === Tt.RESOURCE && !pt(t, e.name)
                    }(e, t)
                }));
                r.length && t.notify(0, r)
            }! function(t) {
                t.EVENT = "event", t.FIRST_INPUT = "first-input", t.LARGEST_CONTENTFUL_PAINT = "largest-contentful-paint", t.LAYOUT_SHIFT = "layout-shift", t.LONG_TASK = "longtask", t.NAVIGATION = "navigation", t.PAINT = "paint", t.RESOURCE = "resource"
            }(Tt || (Tt = {}));
            var Pt = n(87792);

            function Lt(t, e, n) {
                var r = 0,
                    i = !1;
                return {
                    isLimitReached: function() {
                        if (0 === r && (0, rt.wg)((function() {
                                r = 0
                            }), S.iW), (r += 1) <= e || i) return i = !1, !1;
                        if (r === e + 1) {
                            i = !0;
                            try {
                                n({
                                    message: "Reached max number of ".concat(t, "s by minute: ").concat(e),
                                    source: Pt.g.AGENT,
                                    startClocks: (0, S.M8)()
                                })
                            } finally {
                                i = !1
                            }
                        }
                        return !0
                    }
                }
            }
            var Mt = n(97095);

            function Dt(t, e, n) {
                for (var r = t, i = e.split("."), o = 0; o < i.length; o += 1) {
                    var a = i[o];
                    if (!Vt(r)) return;
                    o !== i.length - 1 ? r = r[a] : r[a] = n
                }
            }

            function Vt(t) {
                return "object" === (0, v.P)(t)
            }

            function Ut(t, e) {
                return Vt(t) && Object.prototype.hasOwnProperty.call(t, e)
            }
            var Bt, jt = {
                    "view.name": "string",
                    "view.url": "string",
                    "view.referrer": "string"
                },
                Ft = {
                    context: "object"
                };

            function Gt(t, e, n, r, i, o, c, u, l) {
                var f, m;
                (f = {}).view = jt, f.error = (0, A.kp)({
                    "error.message": "string",
                    "error.stack": "string",
                    "error.resource.url": "string",
                    "error.fingerprint": "string"
                }, Ft, jt), f.resource = (0, A.kp)({
                    "resource.url": "string"
                }, (0, h.sr)(h.R9.WRITABLE_RESOURCE_GRAPHQL) && {
                    "resource.graphql": "object"
                }, Ft, jt), f.action = (0, A.kp)({
                    "action.target.name": "string"
                }, Ft, jt), f.long_task = (0, A.kp)({}, Ft, jt), f.vital = (0, A.kp)({}, Ft, jt), Bt = f;
                var g = ((m = {}).error = Lt("error", t.eventRateLimiterThreshold, l), m.action = Lt("action", t.eventRateLimiterThreshold, l), m.vital = Lt("vital", t.eventRateLimiterThreshold, l), m),
                    y = function() {
                        var t, e = "string" == typeof(t = window._DATADOG_SYNTHETICS_PUBLIC_ID || (0, L.B9)(M)) ? t : void 0,
                            n = function() {
                                var t = window._DATADOG_SYNTHETICS_RESULT_ID || (0, L.B9)(D);
                                return "string" == typeof t ? t : void 0
                            }();
                        if (e && n) return {
                            test_id: e,
                            result_id: n,
                            injected: U()
                        }
                    }(),
                    b = function() {
                        var t, e = null === (t = window.Cypress) || void 0 === t ? void 0 : t.env("traceId");
                        if ("string" == typeof e) return {
                            test_execution_id: e
                        }
                    }();
                e.subscribe(12, (function(l) {
                    var f, m = l.startTime,
                        h = l.rawRumEvent,
                        w = l.domainContext,
                        C = l.savedCommonContext,
                        T = l.customerContext,
                        E = r.findView(m),
                        _ = i.findUrl(m),
                        k = n.findTrackedSession(m);
                    if (k && E && _) {
                        var x = C || u(),
                            R = o.findActionId(m),
                            I = {
                                _dd: {
                                    format_version: 2,
                                    drift: (0, S.TP)(),
                                    configuration: {
                                        session_sample_rate: (0, B.LI)(t.sessionSampleRate, 3),
                                        session_replay_sample_rate: (0, B.LI)(t.sessionReplaySampleRate, 3)
                                    },
                                    browser_sdk_version: (0, P.d0)() ? "5.13.0" : void 0
                                },
                                application: {
                                    id: t.applicationId
                                },
                                date: (0, S.nx)(),
                                service: E.service || t.service,
                                version: E.version || t.version,
                                source: "browser",
                                session: {
                                    id: k.id,
                                    type: y ? "synthetics" : b ? "ci_test" : "user"
                                },
                                view: {
                                    id: E.id,
                                    name: E.name,
                                    url: _.url,
                                    referrer: _.referrer
                                },
                                action: (f = h, -1 !== ["error", "resource", "long_task"].indexOf(f.type) && R ? {
                                    id: R
                                } : void 0),
                                synthetics: y,
                                ci_test: b,
                                display: c.get(),
                                connectivity: (0, Mt.q)()
                            },
                            O = (0, d.kg)(I, h);
                        O.context = (0, d.kg)(x.context, T), "has_replay" in O.session || (O.session.has_replay = x.hasReplay), "view" === O.type && (O.session.sampled_for_replay = k.sessionReplayAllowed), (0, s.RI)(x.user) || (O.usr = x.user),
                            function(t, e, n, r) {
                                var i;
                                if (e) {
                                    var o = function(t, e, n) {
                                        var r = (0, d.Go)(t),
                                            i = n(r);
                                        return (0, A.WP)(e).forEach((function(e) {
                                            var n = e[0],
                                                i = e[1],
                                                o = function(t, e) {
                                                    for (var n = t, r = 0, i = e.split("."); r < i.length; r++) {
                                                        var o = i[r];
                                                        if (!Ut(n, o)) return;
                                                        n = n[o]
                                                    }
                                                    return n
                                                }(r, n),
                                                a = (0, v.P)(o);
                                            a === i ? Dt(t, n, (0, p.a)(o)) : "object" !== i || "undefined" !== a && "null" !== a || Dt(t, n, {})
                                        })), i
                                    }(t, Bt[t.type], (function(t) {
                                        return e(t, n)
                                    }));
                                    if (!1 === o && "view" !== t.type) return !1;
                                    !1 === o && a.Vy.warn("Can't dismiss view events using beforeSend!")
                                }
                                return !(null === (i = r[t.type]) || void 0 === i ? void 0 : i.isLimitReached())
                            }(O, t.beforeSend, w, g) && ((0, s.RI)(O.context) && delete O.context, e.notify(13, O))
                    }
                }))
            }
            var qt, Ht, Wt = function() {
                    function t() {
                        this.callbacks = {}
                    }
                    return t.prototype.notify = function(t, e) {
                        var n = this.callbacks[t];
                        n && n.forEach((function(t) {
                            return t(e)
                        }))
                    }, t.prototype.subscribe = function(t, e) {
                        var n = this;
                        return this.callbacks[t] || (this.callbacks[t] = []), this.callbacks[t].push(e), {
                            unsubscribe: function() {
                                n.callbacks[t] = n.callbacks[t].filter((function(t) {
                                    return e !== t
                                }))
                            }
                        }
                    }, t
                }(),
                Xt = n(93350),
                Yt = 1 / 0,
                zt = S.iW,
                Zt = function() {
                    function t(t, e) {
                        var n = this;
                        this.expireDelay = t, this.maxEntries = e, this.entries = [], this.clearOldValuesInterval = (0, rt.yb)((function() {
                            return n.clearOldValues()
                        }), zt)
                    }
                    return t.prototype.add = function(t, e) {
                        var n = this,
                            r = {
                                value: t,
                                startTime: e,
                                endTime: Yt,
                                remove: function() {
                                    O(n.entries, r)
                                },
                                close: function(t) {
                                    r.endTime = t
                                }
                            };
                        return this.maxEntries && this.entries.length >= this.maxEntries && this.entries.pop(), this.entries.unshift(r), r
                    }, t.prototype.find = function(t) {
                        void 0 === t && (t = Yt);
                        for (var e = 0, n = this.entries; e < n.length; e++) {
                            var r = n[e];
                            if (r.startTime <= t) {
                                if (t <= r.endTime) return r.value;
                                break
                            }
                        }
                    }, t.prototype.closeActive = function(t) {
                        var e = this.entries[0];
                        e && e.endTime === Yt && e.close(t)
                    }, t.prototype.findAll = function(t, e) {
                        void 0 === t && (t = Yt), void 0 === e && (e = 0);
                        var n = (0, S.Gw)(t, e);
                        return this.entries.filter((function(e) {
                            return e.startTime <= n && t <= e.endTime
                        })).map((function(t) {
                            return t.value
                        }))
                    }, t.prototype.reset = function() {
                        this.entries = []
                    }, t.prototype.stop = function() {
                        (0, rt.vG)(this.clearOldValuesInterval)
                    }, t.prototype.clearOldValues = function() {
                        for (var t = (0, S.$S)() - this.expireDelay; this.entries.length > 0 && this.entries[this.entries.length - 1].endTime < t;) this.entries.pop()
                    }, t
                }(),
                Jt = Xt.A,
                $t = n(20207),
                Kt = new WeakMap;

            function Qt(t) {
                var e = t.target,
                    n = t.parameters,
                    r = n[0],
                    i = n[1];
                Kt.set(e, {
                    state: "open",
                    method: String(r).toUpperCase(),
                    url: (0, ot.l2)(String(i))
                })
            }

            function te(t) {
                var e = t.target,
                    n = Kt.get(e);
                n && (n.isAborted = !0)
            }
            var ee = n(729),
                ne = 1;

            function re(t, e, n) {
                var r = function(t, e) {
                    return {
                        clearTracingIfNeeded: q,
                        traceFetch: function(n) {
                            return H(t, n, e, (function(t) {
                                var e;
                                if (n.input instanceof Request && !(null === (e = n.init) || void 0 === e ? void 0 : e.headers)) n.input = new Request(n.input), Object.keys(t).forEach((function(e) {
                                    n.input.headers.append(e, t[e])
                                }));
                                else {
                                    n.init = (0, s.yG)(n.init);
                                    var r = [];
                                    n.init.headers instanceof Headers ? n.init.headers.forEach((function(t, e) {
                                        r.push([e, t])
                                    })) : Array.isArray(n.init.headers) ? n.init.headers.forEach((function(t) {
                                        r.push(t)
                                    })) : n.init.headers && Object.keys(n.init.headers).forEach((function(t) {
                                        r.push([t, n.init.headers[t]])
                                    })), n.init.headers = r.concat((0, A.WP)(t))
                                }
                            }))
                        },
                        traceXhr: function(n, r) {
                            return H(t, n, e, (function(t) {
                                Object.keys(t).forEach((function(e) {
                                    r.setRequestHeader(e, t[e])
                                }))
                            }))
                        }
                    }
                }(e, n);
                ! function(t, e, n) {
                    (function(t) {
                        return qt || (qt = function(t) {
                            return new m.c((function(e) {
                                var n = (0, $t.H)(XMLHttpRequest.prototype, "open", Qt).stop,
                                    r = (0, $t.H)(XMLHttpRequest.prototype, "send", (function(n) {
                                        ! function(t, e, n) {
                                            var r = t.target,
                                                i = Kt.get(r);
                                            if (i) {
                                                var o = i;
                                                o.state = "start", o.startClocks = (0, S.M8)(), o.isAborted = !1, o.xhr = r;
                                                var a = !1,
                                                    c = (0, $t.H)(r, "onreadystatechange", (function() {
                                                        r.readyState === XMLHttpRequest.DONE && u()
                                                    })).stop,
                                                    u = function() {
                                                        if (l(), c(), !a) {
                                                            a = !0;
                                                            var t = i;
                                                            t.state = "complete", t.duration = (0, S.vk)(o.startClocks.timeStamp, (0, S.nx)()), t.status = r.status, n.notify((0, s.yG)(t))
                                                        }
                                                    },
                                                    l = (0, w.q2)(e, r, "loadend", u).stop;
                                                n.notify(o)
                                            }
                                        }(n, t, e)
                                    })).stop,
                                    i = (0, $t.H)(XMLHttpRequest.prototype, "abort", te).stop;
                                return function() {
                                    n(), r(), i()
                                }
                            }))
                        }(t)), qt
                    })(e).subscribe((function(r) {
                        var i = r;
                        if (pt(e, i.url)) switch (i.state) {
                            case "start":
                                n.traceXhr(i, i.xhr), i.requestIndex = ie(), t.notify(7, {
                                    requestIndex: i.requestIndex,
                                    url: i.url
                                });
                                break;
                            case "complete":
                                n.clearTracingIfNeeded(i), t.notify(8, {
                                    duration: i.duration,
                                    method: i.method,
                                    requestIndex: i.requestIndex,
                                    spanId: i.spanId,
                                    startClocks: i.startClocks,
                                    status: i.status,
                                    traceId: i.traceId,
                                    traceSampled: i.traceSampled,
                                    type: "xhr",
                                    url: i.url,
                                    xhr: i.xhr
                                })
                        }
                    }))
                }(t, e, r),
                function(t, e, n) {
                    (Ht || (Ht = new m.c((function(t) {
                        if (window.fetch) {
                            var e = (0, $t.H)(window, "fetch", (function(e) {
                                return function(t, e) {
                                    var n = t.parameters,
                                        r = t.onPostCall,
                                        i = n[0],
                                        o = n[1],
                                        a = o && o.method;
                                    void 0 === a && i instanceof Request && (a = i.method);
                                    var s = void 0 !== a ? String(a).toUpperCase() : "GET",
                                        c = i instanceof Request ? i.url : (0, ot.l2)(String(i)),
                                        u = {
                                            state: "start",
                                            init: o,
                                            input: i,
                                            method: s,
                                            startClocks: (0, S.M8)(),
                                            url: c
                                        };
                                    e.notify(u), n[0] = u.input, n[1] = u.init, r((function(t) {
                                        return function(t, e, n) {
                                            var r = function(e) {
                                                var r = n;
                                                r.state = "resolve", "stack" in e || e instanceof Error ? (r.status = 0, r.isAborted = e instanceof DOMException && e.code === DOMException.ABORT_ERR, r.error = e) : "status" in e && (r.response = e, r.responseType = e.type, r.status = e.status, r.isAborted = !1), t.notify(r)
                                            };
                                            e.then((0, b.dm)(r), (0, b.dm)(r))
                                        }(e, t, u)
                                    }))
                                }(e, t)
                            })).stop;
                            return e
                        }
                    }))), Ht).subscribe((function(r) {
                        var o = r;
                        if (pt(e, o.url)) switch (o.state) {
                            case "start":
                                n.traceFetch(o), o.requestIndex = ie(), t.notify(7, {
                                    requestIndex: o.requestIndex,
                                    url: o.url
                                });
                                break;
                            case "resolve":
                                ! function(t, e) {
                                    var n = t.response && (0, ee.i)(t.response);
                                    n && n.body ? function(t, e, n) {
                                        var r = t.getReader(),
                                            o = [],
                                            a = 0;

                                        function s() {
                                            if (r.cancel().catch(i.l), n.collectStreamBody) {
                                                var t;
                                                if (1 === o.length) t = o[0];
                                                else {
                                                    t = new Uint8Array(a);
                                                    var s = 0;
                                                    o.forEach((function(e) {
                                                        t.set(e, s), s += e.length
                                                    }))
                                                }
                                                t.slice(0, n.bytesLimit), t.length > n.bytesLimit
                                            }
                                            e()
                                        }! function t() {
                                            r.read().then((0, b.dm)((function(e) {
                                                e.done ? s() : (n.collectStreamBody && o.push(e.value), (a += e.value.length) > n.bytesLimit ? s() : t())
                                            })), (0, b.dm)((function(t) {
                                                return e()
                                            })))
                                        }()
                                    }(n.body, (function() {
                                        e((0, S.vk)(t.startClocks.timeStamp, (0, S.nx)()))
                                    }), {
                                        bytesLimit: Number.POSITIVE_INFINITY,
                                        collectStreamBody: !1
                                    }) : e((0, S.vk)(t.startClocks.timeStamp, (0, S.nx)()))
                                }(o, (function(e) {
                                    n.clearTracingIfNeeded(o), t.notify(8, {
                                        duration: e,
                                        method: o.method,
                                        requestIndex: o.requestIndex,
                                        responseType: o.responseType,
                                        spanId: o.spanId,
                                        startClocks: o.startClocks,
                                        status: o.status,
                                        traceId: o.traceId,
                                        traceSampled: o.traceSampled,
                                        type: "fetch",
                                        url: o.url,
                                        response: o.response,
                                        init: o.init,
                                        input: o.input
                                    })
                                }))
                        }
                    }))
                }(t, e, r)
            }

            function ie() {
                var t = ne;
                return ne += 1, t
            }

            function oe(t) {
                var e = t.lifeCycle,
                    n = t.isChildEvent,
                    r = t.onChange,
                    o = void 0 === r ? i.l : r,
                    a = {
                        errorCount: 0,
                        longTaskCount: 0,
                        resourceCount: 0,
                        actionCount: 0,
                        frustrationCount: 0
                    },
                    s = e.subscribe(13, (function(t) {
                        var e;
                        if ("view" !== t.type && "vital" !== t.type && n(t)) switch (t.type) {
                            case "error":
                                a.errorCount += 1, o();
                                break;
                            case "action":
                                a.actionCount += 1, t.action.frustration && (a.frustrationCount += t.action.frustration.type.length), o();
                                break;
                            case "long_task":
                                a.longTaskCount += 1, o();
                                break;
                            case "resource":
                                (null === (e = t._dd) || void 0 === e ? void 0 : e.discarded) || (a.resourceCount += 1, o())
                        }
                    }));
                return {
                    stop: function() {
                        s.unsubscribe()
                    },
                    eventCounts: a
                }
            }
            var ae = 100,
                se = 100;

            function ce(t, e, n, r, i) {
                var o = function(t, e, n) {
                    return new m.c((function(r) {
                        var i, o = [],
                            a = 0;
                        o.push(e.subscribe(u), t.subscribe(0, (function(t) {
                            t.some((function(t) {
                                return t.entryType === Tt.RESOURCE && !ue(n, t.name)
                            })) && u()
                        })), t.subscribe(7, (function(t) {
                            ue(n, t.url) || (void 0 === i && (i = t.requestIndex), a += 1, u())
                        })), t.subscribe(8, (function(t) {
                            ue(n, t.url) || void 0 === i || t.requestIndex < i || (a -= 1, u())
                        })));
                        var s, c = (s = u, (0, $t.H)(window, "open", s)).stop;
                        return function() {
                            c(), o.forEach((function(t) {
                                return t.unsubscribe()
                            }))
                        };

                        function u() {
                            r.notify({
                                isBusy: a > 0
                            })
                        }
                    }))
                }(t, e, n);
                return function(t, e, n) {
                    var r, i = !1,
                        o = (0, rt.wg)((0, b.dm)((function() {
                            return u({
                                hadActivity: !1
                            })
                        })), ae),
                        a = void 0 !== n ? (0, rt.wg)((0, b.dm)((function() {
                            return u({
                                hadActivity: !0,
                                end: (0, S.nx)()
                            })
                        })), n) : void 0,
                        s = t.subscribe((function(t) {
                            var e = t.isBusy;
                            (0, rt.DJ)(o), (0, rt.DJ)(r);
                            var n = (0, S.nx)();
                            e || (r = (0, rt.wg)((0, b.dm)((function() {
                                return u({
                                    hadActivity: !0,
                                    end: n
                                })
                            })), se))
                        })),
                        c = function() {
                            i = !0, (0, rt.DJ)(o), (0, rt.DJ)(r), (0, rt.DJ)(a), s.unsubscribe()
                        };

                    function u(t) {
                        i || (c(), e(t))
                    }
                    return {
                        stop: c
                    }
                }(o, r, i)
            }

            function ue(t, e) {
                return G(t.excludedActivityUrls, e)
            }
            var le = n(71114),
                fe = "data-dd-action-name";

            function de(t, e) {
                var n;
                if (void 0 === pe && (pe = "closest" in HTMLElement.prototype), pe) n = t.closest("[".concat(e, "]"));
                else
                    for (var r = t; r;) {
                        if (r.hasAttribute(e)) {
                            n = r;
                            break
                        }
                        r = r.parentElement
                    }
                if (n) return Se(be(n.getAttribute(e).trim()))
            }
            var ve, pe, me = [function(t, e) {
                    if (void 0 === ve && (ve = "labels" in HTMLInputElement.prototype), ve) {
                        if ("labels" in t && t.labels && t.labels.length > 0) return we(t.labels[0], e)
                    } else if (t.id) {
                        var n = t.ownerDocument && (0, A.I6)(t.ownerDocument.querySelectorAll("label"), (function(e) {
                            return e.htmlFor === t.id
                        }));
                        return n && we(n, e)
                    }
                }, function(t) {
                    if ("INPUT" === t.nodeName) {
                        var e = t,
                            n = e.getAttribute("type");
                        if ("button" === n || "submit" === n || "reset" === n) return e.value
                    }
                }, function(t, e) {
                    if ("BUTTON" === t.nodeName || "LABEL" === t.nodeName || "button" === t.getAttribute("role")) return we(t, e)
                }, function(t) {
                    return t.getAttribute("aria-label")
                }, function(t, e) {
                    var n = t.getAttribute("aria-labelledby");
                    if (n) return n.split(/\s+/).map((function(e) {
                        return function(t, e) {
                            return t.ownerDocument ? t.ownerDocument.getElementById(e) : null
                        }(t, e)
                    })).filter((function(t) {
                        return Boolean(t)
                    })).map((function(t) {
                        return we(t, e)
                    })).join(" ")
                }, function(t) {
                    return t.getAttribute("alt")
                }, function(t) {
                    return t.getAttribute("name")
                }, function(t) {
                    return t.getAttribute("title")
                }, function(t) {
                    return t.getAttribute("placeholder")
                }, function(t, e) {
                    if ("options" in t && t.options.length > 0) return we(t.options[0], e)
                }],
                ge = [function(t, e) {
                    return we(t, e)
                }],
                ye = 10;

            function he(t, e, n) {
                for (var r = t, i = 0; i <= ye && r && "BODY" !== r.nodeName && "HTML" !== r.nodeName && "HEAD" !== r.nodeName;) {
                    for (var o = 0, a = n; o < a.length; o++) {
                        var s = (0, a[o])(r, e);
                        if ("string" == typeof s) {
                            var c = s.trim();
                            if (c) return Se(be(c))
                        }
                    }
                    if ("FORM" === r.nodeName) break;
                    r = r.parentElement, i += 1
                }
            }

            function be(t) {
                return t.replace(/\s+/g, " ")
            }

            function Se(t) {
                return t.length > 100 ? "".concat((0, mt._R)(t, 100), " [...]") : t
            }

            function we(t, e) {
                if (!t.isContentEditable) {
                    if ("innerText" in t) {
                        var n = t.innerText,
                            r = function(e) {
                                for (var r = t.querySelectorAll(e), i = 0; i < r.length; i += 1) {
                                    var o = r[i];
                                    if ("innerText" in o) {
                                        var a = o.innerText;
                                        a && a.trim().length > 0 && (n = n.replace(a, ""))
                                    }
                                }
                            };
                        return (0, le.lT)() && r("script, style"), r("[".concat(fe, "]")), e && r("[".concat(e, "]")), n
                    }
                    return t.textContent
                }
            }
            var Ce, Te = [fe, "data-testid", "data-test", "data-qa", "data-cy", "data-test-id", "data-qa-id", "data-testing", "data-component", "data-element", "data-source-file"],
                Ee = [Ae, function(t) {
                    if (t.id && !xe(t.id)) return "#".concat((0, A.jG)(t.id))
                }],
                _e = [Ae, function(t) {
                    if ("BODY" !== t.tagName && t.classList.length > 0)
                        for (var e = 0; e < t.classList.length; e += 1) {
                            var n = t.classList[e];
                            if (!xe(n)) return "".concat((0, A.jG)(t.tagName), ".").concat((0, A.jG)(n))
                        }
                }, function(t) {
                    return (0, A.jG)(t.tagName)
                }];

            function ke(t, e) {
                for (var n = "", r = t; r && "HTML" !== r.nodeName;) {
                    var i = Ie(r, Ee, Oe, e, n);
                    if (i) return i;
                    n = Ie(r, _e, Ne, e, n) || Pe(Re(r), n), r = r.parentElement
                }
                return n
            }

            function xe(t) {
                return /[0-9]/.test(t)
            }

            function Ae(t, e) {
                if (e && (i = o(e))) return i;
                for (var n = 0, r = Te; n < r.length; n++) {
                    var i;
                    if (i = o(r[n])) return i
                }

                function o(e) {
                    if (t.hasAttribute(e)) return "".concat((0, A.jG)(t.tagName), "[").concat(e, '="').concat((0, A.jG)(t.getAttribute(e)), '"]')
                }
            }

            function Re(t) {
                for (var e = t.parentElement.firstElementChild, n = 1; e && e !== t;) e.tagName === t.tagName && (n += 1), e = e.nextElementSibling;
                return "".concat((0, A.jG)(t.tagName), ":nth-of-type(").concat(n, ")")
            }

            function Ie(t, e, n, r, i) {
                for (var o = 0, a = e; o < a.length; o++) {
                    var s = (0, a[o])(t, r);
                    if (s) {
                        var c = Pe(s, i);
                        if (n(t, c)) return c
                    }
                }
            }

            function Oe(t, e) {
                return 1 === t.ownerDocument.querySelectorAll(e).length
            }

            function Ne(t, e) {
                return 1 === t.parentElement.querySelectorAll(function() {
                    if (void 0 === Ce) try {
                        document.querySelector(":scope"), Ce = !0
                    } catch (t) {
                        Ce = !1
                    }
                    return Ce
                }() ? Pe(":scope", e) : e).length
            }

            function Pe(t, e) {
                return e ? "".concat(t, ">").concat(e) : t
            }
            var Le = S.OY,
                Me = 100;

            function De() {
                var t = window.getSelection();
                return !t || t.isCollapsed
            }

            function Ve(t) {
                return t.target instanceof Element && !1 !== t.isPrimary
            }
            var Ue = 3;
            var Be = 'input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="range"]),textarea,select,[contenteditable],[contenteditable] *,canvas,a[href],a[href] *';

            function je(t) {
                return !t.hasPageActivity && !t.getUserActivity().input && !(0, A.C4)(t.event.target, Be)
            }
            var Fe = 10 * S.OY,
                Ge = 5 * S.iW;

            function qe(t, e, n) {
                var r, i = new Zt(Ge),
                    o = new m.c;
                t.subscribe(10, (function() {
                    i.reset()
                })), t.subscribe(5, c);
                var a = function(t, e) {
                    var n, r, i = e.onPointerDown,
                        o = e.onPointerUp,
                        a = {
                            selection: !1,
                            input: !1
                        },
                        s = [(0, w.q2)(t, window, w.gX.POINTER_DOWN, (function(t) {
                            Ve(t) && (n = De(), a = {
                                selection: !1,
                                input: !1
                            }, r = i(t))
                        }), {
                            capture: !0
                        }), (0, w.q2)(t, window, w.gX.SELECTION_CHANGE, (function() {
                            n && De() || (a.selection = !0)
                        }), {
                            capture: !0
                        }), (0, w.q2)(t, window, w.gX.POINTER_UP, (function(t) {
                            if (Ve(t) && r) {
                                var e = a;
                                o(r, t, (function() {
                                    return e
                                })), r = void 0
                            }
                        }), {
                            capture: !0
                        }), (0, w.q2)(t, window, w.gX.INPUT, (function() {
                            a.input = !0
                        }), {
                            capture: !0
                        })];
                    return {
                        stop: function() {
                            s.forEach((function(t) {
                                return t.stop()
                            }))
                        }
                    }
                }(n, {
                    onPointerDown: function(r) {
                        return function(t, e, n, r) {
                            var i, o, a, s, c, u = (a = r, s = t.actionNameAttribute, c = a.target.getBoundingClientRect(), {
                                    type: "click",
                                    target: {
                                        width: Math.round(c.width),
                                        height: Math.round(c.height),
                                        selector: ke(a.target, s)
                                    },
                                    position: {
                                        x: Math.round(a.clientX - c.left),
                                        y: Math.round(a.clientY - c.top)
                                    },
                                    name: (i = a.target, o = s, de(i, fe) || o && de(i, o) || he(i, o, me) || he(i, o, ge) || "")
                                }),
                                l = !1;
                            return ce(e, n, t, (function(t) {
                                l = t.hadActivity
                            }), ae), {
                                clickActionBase: u,
                                hadActivityOnPointerDown: function() {
                                    return l
                                }
                            }
                        }(n, t, e, r)
                    },
                    onPointerUp: function(r, a, c) {
                        var u = r.clickActionBase,
                            l = r.hadActivityOnPointerDown;
                        return function(t, e, n, r, i, o, a, s, c, u) {
                            var l = He(e, r, c, a, s);
                            o(l);
                            var f = ce(e, n, t, (function(t) {
                                    t.hadActivity && t.end < l.startClocks.timeStamp ? l.discard() : t.hadActivity ? l.stop(t.end) : u() ? l.stop(l.startClocks.timeStamp) : l.stop()
                                }), Fe).stop,
                                d = e.subscribe(5, (function(t) {
                                    var e = t.endClocks;
                                    l.stop(e.timeStamp)
                                })),
                                v = i.subscribe((function() {
                                    l.stop()
                                }));
                            l.stopObservable.subscribe((function() {
                                d.unsubscribe(), f(), v.unsubscribe()
                            }))
                        }(n, t, e, i, o, s, u, a, c, l)
                    }
                }).stop;
                return {
                    stop: function() {
                        c(), o.notify(), a()
                    },
                    actionContexts: {
                        findActionId: function(t) {
                            return i.findAll(t)
                        }
                    }
                };

                function s(t) {
                    if (!r || !r.tryAppend(t)) {
                        var e = t.clone();
                        r = function(t, e) {
                            var n, r = [],
                                i = 0;

                            function o(t) {
                                t.stopObservable.subscribe(a), r.push(t), (0, rt.DJ)(n), n = (0, rt.wg)(s, Le)
                            }

                            function a() {
                                1 === i && r.every((function(t) {
                                    return t.isStopped()
                                })) && (i = 2, e(r))
                            }

                            function s() {
                                (0, rt.DJ)(n), 0 === i && (i = 1, a())
                            }
                            return o(t), {
                                tryAppend: function(t) {
                                    return 0 === i && (r.length > 0 && (e = r[r.length - 1].event, n = t.event, !(e.target === n.target && (a = e, c = n, Math.sqrt(Math.pow(a.clientX - c.clientX, 2) + Math.pow(a.clientY - c.clientY, 2)) <= Me) && e.timeStamp - n.timeStamp <= Le)) ? (s(), !1) : (o(t), !0));
                                    var e, n, a, c
                                },
                                stop: function() {
                                    s()
                                }
                            }
                        }(t, (function(t) {
                            ! function(t, e) {
                                var n = function(t, e) {
                                    if (function(t) {
                                            if (t.some((function(t) {
                                                    return t.getUserActivity().selection
                                                }))) return !1;
                                            for (var e = 0; e < t.length - (Ue - 1); e += 1)
                                                if (t[e + Ue - 1].event.timeStamp - t[e].event.timeStamp <= S.OY) return !0;
                                            return !1
                                        }(t)) return e.addFrustration("rage_click"), t.some(je) && e.addFrustration("dead_click"), e.hasError && e.addFrustration("error_click"), {
                                        isRage: !0
                                    };
                                    var n = t.some((function(t) {
                                        return t.getUserActivity().selection
                                    }));
                                    return t.forEach((function(t) {
                                        t.hasError && t.addFrustration("error_click"), je(t) && !n && t.addFrustration("dead_click")
                                    })), {
                                        isRage: !1
                                    }
                                }(t, e).isRage;
                                n ? (t.forEach((function(t) {
                                    return t.discard()
                                })), e.stop((0, S.nx)()), e.validate(t.map((function(t) {
                                    return t.event
                                })))) : (e.discard(), t.forEach((function(t) {
                                    return t.validate()
                                })))
                            }(t, e)
                        }))
                    }
                }

                function c() {
                    r && r.stop()
                }
            }

            function He(t, e, n, r, i) {
                var o, a = (0, mt.lk)(),
                    s = (0, S.M8)(),
                    c = e.add(a, s.relative),
                    u = oe({
                        lifeCycle: t,
                        isChildEvent: function(t) {
                            return void 0 !== t.action && (Array.isArray(t.action.id) ? (0, A.mK)(t.action.id, a) : t.action.id === a)
                        }
                    }),
                    l = 0,
                    f = [],
                    d = new m.c;

                function v(t) {
                    0 === l && (l = 1, (o = t) ? c.close((0, S.gs)(o)) : c.remove(), u.stop(), d.notify())
                }
                return {
                    event: i,
                    stop: v,
                    stopObservable: d,
                    get hasError() {
                        return u.eventCounts.errorCount > 0
                    },
                    get hasPageActivity() {
                        return void 0 !== o
                    },
                    getUserActivity: n,
                    addFrustration: function(t) {
                        f.push(t)
                    },
                    startClocks: s,
                    isStopped: function() {
                        return 1 === l || 2 === l
                    },
                    clone: function() {
                        return He(t, e, n, r, i)
                    },
                    validate: function(e) {
                        if (v(), 1 === l) {
                            var n = u.eventCounts,
                                c = n.resourceCount,
                                d = n.errorCount,
                                p = n.longTaskCount,
                                m = (0, A.kp)({
                                    type: "click",
                                    duration: o && (0, S.vk)(s.timeStamp, o),
                                    startClocks: s,
                                    id: a,
                                    frustrationTypes: f,
                                    counts: {
                                        resourceCount: c,
                                        errorCount: d,
                                        longTaskCount: p
                                    },
                                    events: null != e ? e : [i],
                                    event: i
                                }, r);
                            t.notify(1, m), l = 2
                        }
                    },
                    discard: function() {
                        v(), l = 2
                    }
                }
            }

            function We(t, e) {
                var n = Xe(t) ? {
                    action: {
                        id: t.id,
                        loading_time: (0, S.Zj)(t.duration),
                        frustration: {
                            type: t.frustrationTypes
                        },
                        error: {
                            count: t.counts.errorCount
                        },
                        long_task: {
                            count: t.counts.longTaskCount
                        },
                        resource: {
                            count: t.counts.resourceCount
                        }
                    },
                    _dd: {
                        action: {
                            target: t.target,
                            position: t.position
                        }
                    }
                } : void 0;
                return {
                    customerContext: Xe(t) ? void 0 : t.context,
                    rawRumEvent: (0, d.kg)({
                        action: {
                            id: (0, mt.lk)(),
                            target: {
                                name: t.name
                            },
                            type: t.type
                        },
                        date: t.startClocks.timeStamp,
                        type: "action",
                        view: {
                            in_foreground: e.wasInPageStateAt("active", t.startClocks.relative)
                        }
                    }, n),
                    startTime: t.startClocks.relative,
                    domainContext: Xe(t) ? {
                        events: t.events
                    } : {}
                }
            }

            function Xe(t) {
                return "custom" !== t.type
            }
            var Ye = n(46409);
            var ze = {};
            var Ze = {
                intervention: "intervention",
                deprecation: "deprecation",
                cspViolation: "csp_violation"
            };

            function Je(t, e, n, r, i) {
                return n ? (0, x.Yn)({
                    name: t,
                    message: e,
                    stack: [{
                        func: "?",
                        url: n,
                        line: null != r ? r : void 0,
                        column: null != i ? i : void 0
                    }]
                }) : void 0
            }

            function $e(t, e, n, r) {
                var i = new m.c;
                return function(t) {
                        var e, n;
                        (e = [a.bP.error], n = e.map((function(t) {
                            return ze[t] || (ze[t] = function(t) {
                                return new m.c((function(e) {
                                    var n = a.JZ[t];
                                    return a.JZ[t] = function() {
                                            for (var r = [], i = 0; i < arguments.length; i++) r[i] = arguments[i];
                                            n.apply(console, r);
                                            var s = (0, x.uC)();
                                            (0, b.um)((function() {
                                                e.notify(function(t, e, n) {
                                                    var r, i, s, c = t.map((function(t) {
                                                        return function(t) {
                                                            return "string" == typeof t ? (0, p.a)(t) : t instanceof Error ? (0, x.NR)((0, Ye.T)(t)) : (0, o.s)((0, p.a)(t), void 0, 2)
                                                        }(t)
                                                    })).join(" ");
                                                    if (e === a.bP.error) {
                                                        var u = (0, A.I6)(t, (function(t) {
                                                            return t instanceof Error
                                                        }));
                                                        r = u ? (0, x.Yn)((0, Ye.T)(u)) : void 0, i = (0, x.Nt)(u), s = u ? (0, x.Dr)(u, "console") : void 0
                                                    }
                                                    return {
                                                        api: e,
                                                        message: c,
                                                        stack: r,
                                                        handlingStack: n,
                                                        fingerprint: i,
                                                        causes: s
                                                    }
                                                }(r, t, s))
                                            }))
                                        },
                                        function() {
                                            a.JZ[t] = n
                                        }
                                }))
                            }(t)), ze[t]
                        })), m.F.apply(void 0, n)).subscribe((function(e) {
                            return t.notify({
                                startClocks: (0, S.M8)(),
                                message: e.message,
                                stack: e.stack,
                                fingerprint: e.fingerprint,
                                source: Pt.g.CONSOLE,
                                handling: "handled",
                                handlingStack: e.handlingStack
                            })
                        }))
                    }(i),
                    function(t) {
                        var e, n = function(e, n) {
                                var r = (0, x.As)({
                                    stackTrace: e,
                                    originalError: n,
                                    startClocks: (0, S.M8)(),
                                    nonErrorPrefix: "Uncaught",
                                    source: Pt.g.SOURCE,
                                    handling: "unhandled"
                                });
                                t.notify(r)
                            },
                            r = (e = n, (0, $t.H)(window, "onerror", (function(t) {
                                var n, r = t.parameters,
                                    i = r[0],
                                    o = r[1],
                                    a = r[2],
                                    s = r[3],
                                    c = r[4];
                                n = c instanceof Error ? (0, Ye.T)(c) : (0, Ye.h)(i, o, a, s), e(n, null != c ? c : i)
                            }))).stop,
                            i = function(t) {
                                return (0, $t.H)(window, "onunhandledrejection", (function(e) {
                                    var n = e.parameters[0].reason || "Empty reason",
                                        r = (0, Ye.T)(n);
                                    t(r, n)
                                }))
                            }(n).stop
                    }(i),
                    function(t, e) {
                        (function(t, e) {
                            var n = [];
                            (0, A.mK)(e, Ze.cspViolation) && n.push(function(t) {
                                return new m.c((function(e) {
                                    return (0, w.q2)(t, document, w.gX.SECURITY_POLICY_VIOLATION, (function(t) {
                                        e.notify(function(t) {
                                            var e = Ze.cspViolation,
                                                n = "'".concat(t.blockedURI, "' blocked by '").concat(t.effectiveDirective, "' directive");
                                            return {
                                                type: Ze.cspViolation,
                                                subtype: t.effectiveDirective,
                                                message: "".concat(e, ": ").concat(n),
                                                stack: Je(t.effectiveDirective, t.originalPolicy ? "".concat(n, ' of the policy "').concat((0, mt._R)(t.originalPolicy, 100, "..."), '"') : "no policy", t.sourceFile, t.lineNumber, t.columnNumber),
                                                originalReport: t
                                            }
                                        }(t))
                                    })).stop
                                }))
                            }(t));
                            var r = e.filter((function(t) {
                                return t !== Ze.cspViolation
                            }));
                            return r.length && n.push(function(t) {
                                return new m.c((function(e) {
                                    if (window.ReportingObserver) {
                                        var n = (0, b.dm)((function(t, n) {
                                                return t.forEach((function(t) {
                                                    e.notify(function(t) {
                                                        var e = t.type,
                                                            n = t.body;
                                                        return {
                                                            type: e,
                                                            subtype: n.id,
                                                            message: "".concat(e, ": ").concat(n.message),
                                                            originalReport: t,
                                                            stack: Je(n.id, n.message, n.sourceFile, n.lineNumber, n.columnNumber)
                                                        }
                                                    }(t))
                                                }))
                                            })),
                                            r = new window.ReportingObserver(n, {
                                                types: t,
                                                buffered: !0
                                            });
                                        return r.observe(),
                                            function() {
                                                r.disconnect()
                                            }
                                    }
                                }))
                            }(r)), m.F.apply(void 0, n)
                        })(t, [Ze.cspViolation, Ze.intervention]).subscribe((function(t) {
                            var n = {
                                startClocks: (0, S.M8)(),
                                message: t.message,
                                stack: t.stack,
                                type: t.subtype,
                                source: Pt.g.REPORT,
                                handling: "unhandled",
                                originalError: t.originalReport
                            };
                            return "securitypolicyviolation" === t.originalReport.type && (n.csp = {
                                disposition: t.originalReport.disposition
                            }), e.notify(n)
                        }))
                    }(e, i), i.subscribe((function(e) {
                        return t.notify(14, {
                            error: e
                        })
                    })),
                    function(t, e, n) {
                        return t.subscribe(14, (function(r) {
                            var i = r.error,
                                o = r.customerContext,
                                a = r.savedCommonContext;
                            t.notify(12, (0, A.kp)({
                                customerContext: o,
                                savedCommonContext: a
                            }, function(t, e, n) {
                                var r = {
                                        date: t.startClocks.timeStamp,
                                        error: {
                                            id: (0, mt.lk)(),
                                            message: t.message,
                                            source: t.source,
                                            stack: t.stack,
                                            handling_stack: t.handlingStack,
                                            type: t.type,
                                            handling: t.handling,
                                            causes: t.causes,
                                            source_type: "browser",
                                            fingerprint: t.fingerprint,
                                            csp: t.csp
                                        },
                                        type: "error",
                                        view: {
                                            in_foreground: e.wasInPageStateAt("active", t.startClocks.relative)
                                        }
                                    },
                                    i = n.findFeatureFlagEvaluations(t.startClocks.relative);
                                return i && !(0, s.RI)(i) && (r.feature_flags = i), {
                                    rawRumEvent: r,
                                    startTime: t.startClocks.relative,
                                    domainContext: {
                                        error: t.originalError
                                    }
                                }
                            }(i, e, n)))
                        })), {
                            addError: function(e, n) {
                                var r = e.error,
                                    i = e.handlingStack,
                                    o = e.startClocks,
                                    a = e.context,
                                    s = r instanceof Error ? (0, Ye.T)(r) : void 0,
                                    c = (0, x.As)({
                                        stackTrace: s,
                                        originalError: r,
                                        handlingStack: i,
                                        startClocks: o,
                                        nonErrorPrefix: "Provided",
                                        source: Pt.g.CUSTOM,
                                        handling: "handled"
                                    });
                                t.notify(14, {
                                    customerContext: a,
                                    savedCommonContext: n,
                                    error: c
                                })
                            }
                        }
                    }(t, n, r)
            }

            function Ke(t) {
                return (0, S.Gw)(t.startTime, t.duration)
            }

            function Qe(t, e, n, r) {
                t.subscribe(8, (function(i) {
                    var o = function(t, e, n, r) {
                        var i, o = function(t) {
                                if (performance && "getEntriesByName" in performance) {
                                    var e = performance.getEntriesByName(t.url, "resource");
                                    if (e.length && "toJSON" in e[0]) {
                                        var n = e.map((function(t) {
                                            return t.toJSON()
                                        })).filter(lt).filter((function(e) {
                                            return n = e, r = t.startClocks.relative, i = Ke({
                                                startTime: t.startClocks.relative,
                                                duration: t.duration
                                            }), n.startTime >= r - 1 && Ke(n) <= (0, S.Gw)(i, 1);
                                            var n, r, i
                                        }));
                                        return 1 === n.length ? n[0] : void 0
                                    }
                                }
                            }(t),
                            a = o ? (0, S.FR)(o.startTime) : t.startClocks,
                            s = en(e, n, a),
                            c = function(t, e) {
                                if (t.traceSampled && t.traceId && t.spanId) return {
                                    _dd: {
                                        span_id: t.spanId.toDecimalString(),
                                        trace_id: t.traceId.toDecimalString(),
                                        rule_psr: rn(e)
                                    }
                                }
                            }(t, e);
                        if (s || c) {
                            var u = "xhr" === t.type ? "xhr" : "fetch",
                                l = o ? nn(o) : void 0,
                                f = function(t, e, n) {
                                    return t.wasInPageStateDuringPeriod("frozen", e.relative, n) ? void 0 : (0, S.Zj)(n)
                                }(r, a, t.duration),
                                v = on(r, a, null !== (i = null == o ? void 0 : o.duration) && void 0 !== i ? i : t.duration),
                                p = (0, d.kg)({
                                    date: a.timeStamp,
                                    resource: {
                                        id: (0, mt.lk)(),
                                        type: u,
                                        duration: f,
                                        method: t.method,
                                        status_code: t.status,
                                        url: t.url
                                    },
                                    type: "resource",
                                    _dd: {
                                        discarded: !s
                                    }
                                }, c, l, v);
                            return {
                                startTime: a.relative,
                                rawRumEvent: p,
                                domainContext: {
                                    performanceEntry: o,
                                    xhr: t.xhr,
                                    response: t.response,
                                    requestInput: t.input,
                                    requestInit: t.init,
                                    error: t.error
                                }
                            }
                        }
                    }(i, e, n, r);
                    o && t.notify(12, o)
                })), t.subscribe(0, (function(i) {
                    for (var o = 0, a = i; o < a.length; o++) {
                        var s = a[o];
                        if (s.entryType === Tt.RESOURCE && "xmlhttprequest" !== (u = s).initiatorType && "fetch" !== u.initiatorType) {
                            var c = tn(s, e, n, r);
                            c && t.notify(12, c)
                        }
                    }
                    var u
                }))
            }

            function tn(t, e, n, r) {
                var i = (0, S.FR)(t.startTime),
                    o = en(e, n, i),
                    a = function(t, e) {
                        if (t.traceId) return {
                            _dd: {
                                trace_id: t.traceId,
                                rule_psr: rn(e)
                            }
                        }
                    }(t, e);
                if (o || a) {
                    var s, c = function(t) {
                            var e = t.name;
                            if (!(0, ot.AY)(e)) return (0, Q.A2)('Failed to construct URL for "'.concat(t.name, '"')), "other";
                            for (var n = (0, ot.L2)(e), r = 0, i = st; r < i.length; r++) {
                                var o = i[r],
                                    a = o[0];
                                if ((0, o[1])(t.initiatorType, n)) return a
                            }
                            return "other"
                        }(t),
                        u = nn(t),
                        l = on(r, i, t.duration),
                        f = (0, d.kg)({
                            date: i.timeStamp,
                            resource: {
                                id: (0, mt.lk)(),
                                type: c,
                                url: t.name,
                                status_code: (s = t.responseStatus, 0 === s ? void 0 : s)
                            },
                            type: "resource",
                            _dd: {
                                discarded: !o
                            }
                        }, a, u, l);
                    return {
                        startTime: i.relative,
                        rawRumEvent: f,
                        domainContext: {
                            performanceEntry: t
                        }
                    }
                }
            }

            function en(t, e, n) {
                return t.trackResources && e.findTrackedSession(n.relative)
            }

            function nn(t) {
                var e, n, r, i, o = t.renderBlockingStatus;
                return {
                    resource: (0, A.kp)({
                        duration: (e = t, n = e.duration, r = e.startTime, i = e.responseEnd, 0 === n && r < i ? (0, S.Zj)((0, S.vk)(r, i)) : (0, S.Zj)(n)),
                        render_blocking_status: o
                    }, vt(t), ut(t))
                }
            }

            function rn(t) {
                return (0, B.Et)(t.traceSampleRate) ? t.traceSampleRate / 100 : void 0
            }

            function on(t, e, n) {
                if ((0, h.sr)(h.R9.RESOURCE_PAGE_STATES)) return {
                    _dd: {
                        page_states: t.findAll(e.relative, n),
                        page_was_discarded: String(document.wasDiscarded)
                    }
                }
            }
            var an, sn, cn = 10 * S.iW,
                un = 10 * S.iW,
                ln = !1;

            function fn(t) {
                var e = t.toJSON();
                return delete e.element, e
            }

            function dn(t, e, n, r) {
                var i = {},
                    o = function(t, e) {
                        return {
                            stop: t.subscribe(0, (function(t) {
                                for (var e = 0, o = t; e < o.length; e++) {
                                    var a = o[e];
                                    a.entryType === Tt.NAVIGATION && (s = {
                                        domComplete: a.domComplete,
                                        domContentLoaded: a.domContentLoadedEventEnd,
                                        domInteractive: a.domInteractive,
                                        loadEvent: a.loadEventEnd,
                                        firstByte: a.responseStart >= 0 && a.responseStart <= (0, S.$S)() ? a.responseStart : void 0
                                    }, n(s.loadEvent), i.navigationTimings = s, r())
                                }
                                var s
                            })).unsubscribe
                        }
                    }(t).stop,
                    a = function(t, e) {
                        var n, r;
                        return void 0 === e && (e = window), "hidden" === document.visibilityState ? n = 0 : (n = 1 / 0, r = (0, w.lQ)(t, e, [w.gX.PAGE_HIDE, w.gX.VISIBILITY_CHANGE], (function(t) {
                            t.type !== w.gX.PAGE_HIDE && "hidden" !== document.visibilityState || (n = t.timeStamp, r())
                        }), {
                            capture: !0
                        }).stop), {
                            get timeStamp() {
                                return n
                            },
                            stop: function() {
                                null == r || r()
                            }
                        }
                    }(e),
                    s = function(t, e, n) {
                        return {
                            stop: t.subscribe(0, (function(t) {
                                var n, o = (0, A.I6)(t, (function(t) {
                                    return t.entryType === Tt.PAINT && "first-contentful-paint" === t.name && t.startTime < e.timeStamp && t.startTime < cn
                                }));
                                o && (n = o.startTime, i.firstContentfulPaint = n, r())
                            })).unsubscribe
                        }
                    }(t, a).stop,
                    c = function(t, e, n, r, i) {
                        var o = 1 / 0,
                            a = (0, w.lQ)(e, r, [w.gX.POINTER_DOWN, w.gX.KEY_DOWN], (function(t) {
                                o = t.timeStamp
                            }), {
                                capture: !0,
                                once: !0
                            }).stop,
                            s = 0,
                            c = t.subscribe(0, (function(t) {
                                var r = (0, A.Uk)(t, (function(t) {
                                    return t.entryType === Tt.LARGEST_CONTENTFUL_PAINT && t.startTime < o && t.startTime < n.timeStamp && t.startTime < un && t.size > s
                                }));
                                if (r) {
                                    var a = void 0;
                                    r.element && (a = ke(r.element, e.actionNameAttribute)), (0, h.sr)(h.R9.ZERO_LCP_TELEMETRY) && function(t, e) {
                                        if (!ln) {
                                            var n = 0 === t.startTime ? "LCP with startTime = 0" : void 0 !== an && t.startTime < an.startTime ? "LCP with startTime < previous LCP" : void 0 !== an && t.size < an.size ? "LCP with size < previous LCP" : void 0;
                                            n && (ln = !0, (0, Q.A2)(n, {
                                                debug: {
                                                    entry: fn(t),
                                                    previousLcp: an,
                                                    timeOrigin: performance.timeOrigin,
                                                    now: (0, S.$S)(),
                                                    lcpEntries: e.map(fn)
                                                }
                                            })), an = fn(t)
                                        }
                                    }(r, t.filter((function(t) {
                                        return t.entryType === Tt.LARGEST_CONTENTFUL_PAINT
                                    }))), i({
                                        value: r.startTime,
                                        targetSelector: a
                                    }), s = r.size
                                }
                            })).unsubscribe;
                        return {
                            stop: function() {
                                a(), c()
                            }
                        }
                    }(t, e, a, window, (function(t) {
                        i.largestContentfulPaint = t, r()
                    })).stop,
                    u = function(t, e, n, o) {
                        return {
                            stop: t.subscribe(0, (function(t) {
                                var o, a = (0, A.I6)(t, (function(t) {
                                    return t.entryType === Tt.FIRST_INPUT && t.startTime < n.timeStamp
                                }));
                                if (a) {
                                    var s = (0, S.vk)(a.startTime, a.processingStart),
                                        c = void 0;
                                    a.target && yt(a.target) && (c = ke(a.target, e.actionNameAttribute)), o = {
                                        delay: s >= 0 ? s : 0,
                                        time: a.startTime,
                                        targetSelector: c
                                    }, i.firstInput = o, r()
                                }
                            })).unsubscribe
                        }
                    }(t, e, a).stop;
                return {
                    stop: function() {
                        o(), s(), c(), u(), a.stop()
                    },
                    initialViewMetrics: i
                }
            }
            var vn, pn = 0,
                mn = 1 / 0,
                gn = 0,
                yn = function() {
                    return sn ? pn : window.performance.interactionCount || 0
                },
                hn = 10,
                bn = 1 * S.iW;

            function Sn() {
                var t, e = window.visualViewport;
                return t = e ? e.pageLeft - e.offsetLeft : void 0 !== window.scrollX ? window.scrollX : window.pageXOffset || 0, Math.round(t)
            }

            function wn() {
                var t, e = window.visualViewport;
                return t = e ? e.pageTop - e.offsetTop : void 0 !== window.scrollY ? window.scrollY : window.pageYOffset || 0, Math.round(t)
            }

            function Cn(t) {
                return vn || (vn = function(t) {
                    return new m.c((function(e) {
                        var n = (0, i.n)((function() {
                            e.notify(Tn())
                        }), 200).throttled;
                        return (0, w.q2)(t, window, w.gX.RESIZE, n, {
                            capture: !0,
                            passive: !0
                        }).stop
                    }))
                }(t)), vn
            }

            function Tn() {
                var t = window.visualViewport;
                return t ? {
                    width: Number(t.width * t.scale),
                    height: Number(t.height * t.scale)
                } : {
                    width: Number(window.innerWidth || 0),
                    height: Number(window.innerHeight || 0)
                }
            }
            var En = S.OY;

            function _n(t, e, n, r, o, a) {
                var s = {},
                    c = function(t, e, n, i, o, a) {
                        var c = "initial_load" === i,
                            u = !0,
                            l = [];

                        function f() {
                            var t;
                            !u && !c && l.length > 0 && (t = Math.max.apply(Math, l), s.loadingTime = t, r())
                        }
                        return {
                            stop: ce(t, e, n, (function(t) {
                                u && (u = !1, t.hadActivity && l.push((0, S.vk)(o.timeStamp, t.end)), f())
                            })).stop,
                            setLoadEvent: function(t) {
                                c && (c = !1, l.push(t), f())
                            }
                        }
                    }(t, e, n, o, a),
                    u = c.stop,
                    l = c.setLoadEvent,
                    f = function(t, e, n, r) {
                        void 0 === r && (r = function(t, e) {
                            return void 0 === e && (e = En), new m.c((function(n) {
                                if (window.ResizeObserver) {
                                    var r = (0, i.n)((function() {
                                            var t, e;
                                            n.notify((t = wn(), e = Tn().height, {
                                                scrollHeight: Math.round((document.scrollingElement || document.documentElement).scrollHeight),
                                                scrollDepth: Math.round(e + t),
                                                scrollTop: t
                                            }))
                                        }), e, {
                                            leading: !1,
                                            trailing: !0
                                        }),
                                        o = document.scrollingElement || document.documentElement,
                                        a = new ResizeObserver((0, b.dm)(r.throttled));
                                    a.observe(o);
                                    var s = (0, w.q2)(t, window, w.gX.SCROLL, r.throttled, {
                                        passive: !0
                                    });
                                    return function() {
                                        r.cancel(), a.unobserve(o), s.stop()
                                    }
                                }
                            }))
                        }(t));
                        var o = 0,
                            a = 0,
                            s = 0,
                            c = r.subscribe((function(t) {
                                var r = t.scrollDepth,
                                    i = t.scrollTop,
                                    c = t.scrollHeight,
                                    u = !1;
                                if (r > o && (o = r, u = !0), c > a) {
                                    a = c;
                                    var l = (0, S.$S)();
                                    s = (0, S.vk)(e.relative, l), u = !0
                                }
                                u && n({
                                    maxDepth: Math.min(o, a),
                                    maxDepthScrollTop: i,
                                    maxScrollHeight: a,
                                    maxScrollHeightTime: s
                                })
                            }));
                        return {
                            stop: function() {
                                return c.unsubscribe()
                            }
                        }
                    }(n, a, (function(t) {
                        s.scroll = t
                    })).stop,
                    d = function(t, e, n) {
                        if (!Rt(Tt.LAYOUT_SHIFT)) return {
                            stop: i.l
                        };
                        var r = 0;
                        n({
                            value: 0
                        });
                        var o = function() {
                            var t, e, n, r, i = 0,
                                o = 0;
                            return {
                                update: function(a) {
                                    var s, c;
                                    void 0 === t || a.startTime - e >= S.OY || a.startTime - t >= 5 * S.OY ? (t = e = a.startTime, i = a.value, o = 0, n = void 0) : (i += a.value, e = a.startTime), a.value > o && (o = a.value, r = a.startTime, n = (null === (s = a.sources) || void 0 === s ? void 0 : s.length) ? null === (c = (0, A.I6)(a.sources, (function(t) {
                                        return !!t.node && yt(t.node)
                                    }))) || void 0 === c ? void 0 : c.node : void 0)
                                },
                                value: function() {
                                    return i
                                },
                                largestLayoutShiftTarget: function() {
                                    return n
                                },
                                largestLayoutShiftTime: function() {
                                    return r
                                }
                            }
                        }();
                        return {
                            stop: e.subscribe(0, (function(e) {
                                for (var i = 0, a = e; i < a.length; i++) {
                                    var s = a[i];
                                    if (s.entryType === Tt.LAYOUT_SHIFT && !s.hadRecentInput && (o.update(s), o.value() > r)) {
                                        r = o.value();
                                        var c = (0, B.LI)(r, 4),
                                            u = o.largestLayoutShiftTarget(),
                                            l = void 0;
                                        u && u.isConnected && (l = ke(u, t.actionNameAttribute)), n({
                                            value: c,
                                            targetSelector: l
                                        })
                                    }
                                }
                            })).unsubscribe
                        }
                    }(n, t, (function(t) {
                        s.cumulativeLayoutShift = t, r()
                    })).stop,
                    v = function(t, e, n, r) {
                        if (!(Rt(Tt.EVENT) && window.PerformanceEventTiming && "interactionId" in PerformanceEventTiming.prototype)) return {
                            getInteractionToNextPaint: function() {},
                            setViewEnd: i.l,
                            stop: i.l
                        };
                        var o, a = function(t) {
                                "interactionCount" in performance || sn || (sn = new window.PerformanceObserver((0, b.dm)((function(t) {
                                    t.getEntries().forEach((function(t) {
                                        var e = t;
                                        e.interactionId && (mn = Math.min(mn, e.interactionId), gn = Math.max(gn, e.interactionId), pn = (gn - mn) / 7 + 1)
                                    }))
                                })))).observe({
                                    type: "event",
                                    buffered: !0,
                                    durationThreshold: 0
                                });
                                var e = "initial_load" === t ? 0 : yn(),
                                    n = {
                                        stopped: !1
                                    };

                                function r() {
                                    return yn() - e
                                }
                                return {
                                    getViewInteractionCount: function() {
                                        return n.stopped ? n.interactionCount : r()
                                    },
                                    stopViewInteractionCount: function() {
                                        n = {
                                            stopped: !0,
                                            interactionCount: r()
                                        }
                                    }
                                }
                            }(n),
                            s = a.getViewInteractionCount,
                            c = a.stopViewInteractionCount,
                            u = 1 / 0,
                            l = function(t) {
                                var e = [];

                                function n() {
                                    e.sort((function(t, e) {
                                        return e.duration - t.duration
                                    })).splice(hn)
                                }
                                return {
                                    process: function(t) {
                                        var r = e.findIndex((function(e) {
                                                return t.interactionId === e.interactionId
                                            })),
                                            i = e[e.length - 1]; - 1 !== r ? t.duration > e[r].duration && (e[r] = t, n()) : (e.length < hn || t.duration > i.duration) && (e.push(t), n())
                                    },
                                    estimateP98Interaction: function() {
                                        var n = Math.min(e.length - 1, Math.floor(t() / 50));
                                        return e[n]
                                    }
                                }
                            }(s),
                            f = -1;
                        return {
                            getInteractionToNextPaint: function() {
                                return f >= 0 ? {
                                    value: Math.min(f, bn),
                                    targetSelector: o
                                } : s() ? {
                                    value: 0
                                } : void 0
                            },
                            setViewEnd: function(t) {
                                u = t, c()
                            },
                            stop: r.subscribe(0, (function(n) {
                                for (var r = 0, i = n; r < i.length; r++) {
                                    var a = i[r];
                                    (a.entryType === Tt.EVENT || a.entryType === Tt.FIRST_INPUT) && a.interactionId && a.startTime >= e && a.startTime <= u && l.process(a)
                                }
                                var s = l.estimateP98Interaction();
                                s && s.duration !== f && (f = s.duration, o = s.target && yt(s.target) ? ke(s.target, t.actionNameAttribute) : void 0)
                            })).unsubscribe
                        }
                    }(n, a.relative, o, t),
                    p = v.stop,
                    g = v.getInteractionToNextPaint;
                return {
                    stop: function() {
                        u(), d(), f()
                    },
                    stopINPTracking: p,
                    setLoadEvent: l,
                    setViewEnd: v.setViewEnd,
                    getCommonViewMetrics: function() {
                        return s.interactionToNextPaint = g(), s
                    }
                }
            }
            var kn = 3e3,
                xn = 5 * S.iW,
                An = 5 * S.iW;

            function Rn(t) {
                var e = t.indexOf("?");
                return e < 0 ? t : t.slice(0, e)
            }

            function In(t, e, n, r, o, c, u, l, f) {
                return t.subscribe(4, (function(n) {
                        return t.notify(12, function(t, e, n, r, i) {
                            var o, a, c, u, l, f, d, v, p, m, g, y, h, b, w, C = r.getReplayStats(t.id),
                                T = n.findFeatureFlagEvaluations(t.startClocks.relative),
                                E = i.findAll(t.startClocks.relative, t.duration),
                                _ = {
                                    _dd: {
                                        document_version: t.documentVersion,
                                        replay_stats: C,
                                        page_states: E,
                                        configuration: {
                                            start_session_replay_recording_manually: e.startSessionReplayRecordingManually
                                        }
                                    },
                                    date: t.startClocks.timeStamp,
                                    type: "view",
                                    view: {
                                        action: {
                                            count: t.eventCounts.actionCount
                                        },
                                        frustration: {
                                            count: t.eventCounts.frustrationCount
                                        },
                                        cumulative_layout_shift: null === (o = t.commonViewMetrics.cumulativeLayoutShift) || void 0 === o ? void 0 : o.value,
                                        cumulative_layout_shift_target_selector: null === (a = t.commonViewMetrics.cumulativeLayoutShift) || void 0 === a ? void 0 : a.targetSelector,
                                        first_byte: (0, S.Zj)(null === (c = t.initialViewMetrics.navigationTimings) || void 0 === c ? void 0 : c.firstByte),
                                        dom_complete: (0, S.Zj)(null === (u = t.initialViewMetrics.navigationTimings) || void 0 === u ? void 0 : u.domComplete),
                                        dom_content_loaded: (0, S.Zj)(null === (l = t.initialViewMetrics.navigationTimings) || void 0 === l ? void 0 : l.domContentLoaded),
                                        dom_interactive: (0, S.Zj)(null === (f = t.initialViewMetrics.navigationTimings) || void 0 === f ? void 0 : f.domInteractive),
                                        error: {
                                            count: t.eventCounts.errorCount
                                        },
                                        first_contentful_paint: (0, S.Zj)(t.initialViewMetrics.firstContentfulPaint),
                                        first_input_delay: (0, S.Zj)(null === (d = t.initialViewMetrics.firstInput) || void 0 === d ? void 0 : d.delay),
                                        first_input_time: (0, S.Zj)(null === (v = t.initialViewMetrics.firstInput) || void 0 === v ? void 0 : v.time),
                                        first_input_target_selector: null === (p = t.initialViewMetrics.firstInput) || void 0 === p ? void 0 : p.targetSelector,
                                        interaction_to_next_paint: (0, S.Zj)(null === (m = t.commonViewMetrics.interactionToNextPaint) || void 0 === m ? void 0 : m.value),
                                        interaction_to_next_paint_target_selector: null === (g = t.commonViewMetrics.interactionToNextPaint) || void 0 === g ? void 0 : g.targetSelector,
                                        is_active: t.isActive,
                                        name: t.name,
                                        largest_contentful_paint: (0, S.Zj)(null === (y = t.initialViewMetrics.largestContentfulPaint) || void 0 === y ? void 0 : y.value),
                                        largest_contentful_paint_target_selector: null === (h = t.initialViewMetrics.largestContentfulPaint) || void 0 === h ? void 0 : h.targetSelector,
                                        load_event: (0, S.Zj)(null === (b = t.initialViewMetrics.navigationTimings) || void 0 === b ? void 0 : b.loadEvent),
                                        loading_time: (w = (0, S.Zj)(t.commonViewMetrics.loadingTime), (0, B.Et)(w) && w < 0 ? void 0 : w),
                                        loading_type: t.loadingType,
                                        long_task: {
                                            count: t.eventCounts.longTaskCount
                                        },
                                        resource: {
                                            count: t.eventCounts.resourceCount
                                        },
                                        time_spent: (0, S.Zj)(t.duration)
                                    },
                                    feature_flags: T && !(0, s.RI)(T) ? T : void 0,
                                    display: t.commonViewMetrics.scroll ? {
                                        scroll: {
                                            max_depth: t.commonViewMetrics.scroll.maxDepth,
                                            max_depth_scroll_top: t.commonViewMetrics.scroll.maxDepthScrollTop,
                                            max_scroll_height: t.commonViewMetrics.scroll.maxScrollHeight,
                                            max_scroll_height_time: (0, S.Zj)(t.commonViewMetrics.scroll.maxScrollHeightTime)
                                        }
                                    } : void 0,
                                    session: {
                                        has_replay: !!C || void 0,
                                        is_active: !!t.sessionIsActive && void 0
                                    },
                                    privacy: {
                                        replay_level: e.defaultPrivacyLevel
                                    }
                                };
                            return (0, s.RI)(t.customTimings) || (_.view.custom_timings = (0, s.LG)(t.customTimings, S.Zj)), {
                                rawRumEvent: _,
                                startTime: t.startClocks.relative,
                                domainContext: {
                                    location: t.location
                                }
                            }
                        }(n, e, c, l, u))
                    })),
                    function(t, e, n, r, o, c, u) {
                        var l, f = new Set,
                            d = v("initial_load", (0, S.Oc)(), u);

                        function v(o, c, u) {
                            var l = function(t, e, n, r, o, c, u) {
                                void 0 === c && (c = (0, S.M8)());
                                var l, f, d, v, p = (0, mt.lk)(),
                                    g = new m.c,
                                    y = {},
                                    h = 0,
                                    b = (0, s.yG)(r),
                                    w = !0;
                                u && (f = u.name, d = u.service, v = u.version);
                                var C = {
                                    id: p,
                                    name: f,
                                    startClocks: c,
                                    service: d,
                                    version: v
                                };
                                t.notify(2, C), t.notify(3, C);
                                var T = (0, i.n)(B, kn, {
                                        leading: !1
                                    }),
                                    E = T.throttled,
                                    _ = T.cancel,
                                    k = _n(t, e, n, E, o, c),
                                    x = k.setLoadEvent,
                                    A = k.setViewEnd,
                                    R = k.stop,
                                    I = k.stopINPTracking,
                                    O = k.getCommonViewMetrics,
                                    N = "initial_load" === o ? dn(t, n, x, E) : {
                                        stop: i.l,
                                        initialViewMetrics: {}
                                    },
                                    P = N.stop,
                                    L = N.initialViewMetrics,
                                    M = function(t, e, n) {
                                        var r = oe({
                                            lifeCycle: t,
                                            isChildEvent: function(t) {
                                                return t.view.id === e
                                            },
                                            onChange: n
                                        });
                                        return {
                                            stop: r.stop,
                                            eventCounts: r.eventCounts
                                        }
                                    }(t, p, E),
                                    D = M.stop,
                                    V = M.eventCounts,
                                    U = (0, rt.yb)(B, xn);

                                function B() {
                                    _(), h += 1;
                                    var e = void 0 === l ? (0, S.nx)() : l.timeStamp;
                                    t.notify(4, {
                                        customTimings: y,
                                        documentVersion: h,
                                        id: p,
                                        name: f,
                                        service: d,
                                        version: v,
                                        loadingType: o,
                                        location: b,
                                        startClocks: c,
                                        commonViewMetrics: O(),
                                        initialViewMetrics: L,
                                        duration: (0, S.vk)(c.timeStamp, e),
                                        isActive: void 0 === l,
                                        sessionIsActive: w,
                                        eventCounts: V
                                    })
                                }
                                return B(), {
                                    name: f,
                                    service: d,
                                    version: v,
                                    stopObservable: g,
                                    end: function(e) {
                                        var n, r, i = this;
                                        void 0 === e && (e = {}), l || (l = null !== (n = e.endClocks) && void 0 !== n ? n : (0, S.M8)(), w = null === (r = e.sessionIsActive) || void 0 === r || r, t.notify(5, {
                                            endClocks: l
                                        }), t.notify(6, {
                                            endClocks: l
                                        }), (0, rt.vG)(U), A(l.relative), R(), B(), (0, rt.wg)((function() {
                                            i.stop()
                                        }), An))
                                    },
                                    stop: function() {
                                        P(), D(), I(), g.notify()
                                    },
                                    addTiming: function(t, e) {
                                        if (!l) {
                                            var n = (0, S.pu)(e) ? e : (0, S.vk)(c.timeStamp, e);
                                            y[function(t) {
                                                var e = t.replace(/[^a-zA-Z0-9-_.@$]/g, "_");
                                                return e !== t && a.Vy.warn("Invalid timing name: ".concat(t, ", sanitized to: ").concat(e)), e
                                            }(t)] = n, E()
                                        }
                                    }
                                }
                            }(e, n, r, t, o, c, u);
                            return f.add(l), l.stopObservable.subscribe((function() {
                                f.delete(l)
                            })), l
                        }
                        return e.subscribe(10, (function() {
                            d = v("route_change", void 0, {
                                name: d.name,
                                service: d.service,
                                version: d.version
                            })
                        })), e.subscribe(9, (function() {
                            d.end({
                                sessionIsActive: !1
                            })
                        })), e.subscribe(11, (function(t) {
                            t.reason !== tt.y5.UNLOADING && t.reason !== tt.y5.PAGEHIDE || d.end()
                        })), c && (l = function(t) {
                            return t.subscribe((function(t) {
                                var e, n, r, i = t.oldLocation;
                                n = t.newLocation, (e = i).pathname === n.pathname && ("" !== (r = n.hash.substring(1)) && document.getElementById(r) || Rn(n.hash) === Rn(e.hash)) || (d.end(), d = v("route_change"))
                            }))
                        }(o)), {
                            addTiming: function(t, e) {
                                void 0 === e && (e = (0, S.nx)()), d.addTiming(t, e)
                            },
                            startView: function(t, e) {
                                d.end({
                                    endClocks: e
                                }), d = v("route_change", e, t)
                            },
                            stop: function() {
                                null == l || l.unsubscribe(), d.end(), f.forEach((function(t) {
                                    return t.stop()
                                }))
                            }
                        }
                    }(n, t, r, e, o, !e.trackViewsManually, f)
            }
            var On = n(17991),
                Nn = S.iW,
                Pn = Xt.A,
                Ln = [];

            function Mn(t, e, n, r) {
                var i = new m.c,
                    o = new m.c,
                    a = (0, On.oC)(t.sessionStoreStrategyType, e, n);
                Ln.push((function() {
                    return a.stop()
                }));
                var s = new Zt(Pn);

                function c() {
                    return {
                        id: a.getSession().id,
                        trackingType: a.getSession()[e]
                    }
                }
                return Ln.push((function() {
                        return s.stop()
                    })), a.renewObservable.subscribe((function() {
                        s.add(c(), (0, S.$S)()), i.notify()
                    })), a.expireObservable.subscribe((function() {
                        o.notify(), s.closeActive((0, S.$S)())
                    })), a.expandOrRenewSession(), s.add(c(), (0, S.Oc)().relative), r.observable.subscribe((function() {
                        r.isGranted() ? a.expandOrRenewSession() : a.expire()
                    })),
                    function(t, e) {
                        var n = (0, w.lQ)(t, window, [w.gX.CLICK, w.gX.TOUCH_START, w.gX.KEY_DOWN, w.gX.SCROLL], (function() {
                            r.isGranted() && a.expandOrRenewSession()
                        }), {
                            capture: !0,
                            passive: !0
                        }).stop;
                        Ln.push(n)
                    }(t),
                    function(t, e) {
                        var n = function() {
                                "visible" === document.visibilityState && a.expandSession()
                            },
                            r = (0, w.q2)(t, document, w.gX.VISIBILITY_CHANGE, n).stop;
                        Ln.push(r);
                        var i = (0, rt.yb)(n, Nn);
                        Ln.push((function() {
                            (0, rt.vG)(i)
                        }))
                    }(t), {
                        findActiveSession: function(t) {
                            return s.find(t)
                        },
                        renewObservable: i,
                        expireObservable: o,
                        expire: a.expire
                    }
            }
            var Dn = "rum";

            function Vn(t) {
                return "2" === t || "1" === t
            }
            var Un = function() {
                function t(t, e, n, r) {
                    var i = this;
                    this.encoder = t, this.request = e, this.flushController = n, this.messageBytesLimit = r, this.upsertBuffer = {}, this.flushSubscription = this.flushController.flushObservable.subscribe((function(t) {
                        return i.flush(t)
                    }))
                }
                return t.prototype.add = function(t) {
                    this.addOrUpdate(t)
                }, t.prototype.upsert = function(t, e) {
                    this.addOrUpdate(t, e)
                }, t.prototype.stop = function() {
                    this.flushSubscription.unsubscribe()
                }, t.prototype.flush = function(t) {
                    var e = (0, A.KQ)(this.upsertBuffer).join("\n");
                    this.upsertBuffer = {};
                    var n = (0, tt.Kp)(t.reason),
                        i = n ? this.request.sendOnExit : this.request.send;
                    if (n && this.encoder.isAsync) {
                        var o = this.encoder.finishSync();
                        o.outputBytesCount && i(Bn(o, t));
                        var a = [o.pendingData, e].filter(Boolean).join("\n");
                        a && i({
                            data: a,
                            bytesCount: (0, r.WW)(a),
                            flushReason: t.reason
                        })
                    } else e && this.encoder.write(this.encoder.isEmpty ? e : "\n".concat(e)), this.encoder.finish((function(e) {
                        i(Bn(e, t))
                    }))
                }, t.prototype.addOrUpdate = function(t, e) {
                    var n = (0, o.s)(t),
                        r = this.encoder.estimateEncodedBytesCount(n);
                    r >= this.messageBytesLimit ? a.Vy.warn("Discarded a message whose size was bigger than the maximum allowed size ".concat(this.messageBytesLimit, "KB.")) : (this.hasMessageFor(e) && this.remove(e), this.push(n, r, e))
                }, t.prototype.push = function(t, e, n) {
                    var r = this;
                    this.flushController.notifyBeforeAddMessage(e), void 0 !== n ? (this.upsertBuffer[n] = t, this.flushController.notifyAfterAddMessage()) : this.encoder.write(this.encoder.isEmpty ? t : "\n".concat(t), (function(t) {
                        r.flushController.notifyAfterAddMessage(t - e)
                    }))
                }, t.prototype.remove = function(t) {
                    var e = this.upsertBuffer[t];
                    delete this.upsertBuffer[t];
                    var n = this.encoder.estimateEncodedBytesCount(e);
                    this.flushController.notifyAfterRemoveMessage(n)
                }, t.prototype.hasMessageFor = function(t) {
                    return void 0 !== t && void 0 !== this.upsertBuffer[t]
                }, t
            }();

            function Bn(t, e) {
                return {
                    data: "string" == typeof t.output ? t.output : new Blob([t.output], {
                        type: "text/plain"
                    }),
                    bytesCount: t.outputBytesCount,
                    encoding: t.encoding,
                    flushReason: e.reason
                }
            }
            var jn = n(27871);

            function Fn(t, e, n, r, i, o, a) {
                var s = t.replica,
                    c = function(t, e, n, r, i, o) {
                        var a = c(t, e),
                            s = n && c(t, n);

                        function c(t, e) {
                            var n = e.endpoint,
                                a = e.encoder;
                            return new Un(a, (0, jn.sA)(t, n, t.batchBytesLimit, r), function(t) {
                                var e, n = t.messagesLimit,
                                    r = t.bytesLimit,
                                    i = t.durationLimit,
                                    o = t.pageExitObservable,
                                    a = t.sessionExpireObservable,
                                    s = o.subscribe((function(t) {
                                        return d(t.reason)
                                    })),
                                    c = a.subscribe((function() {
                                        return d("session_expire")
                                    })),
                                    u = new m.c((function() {
                                        return function() {
                                            s.unsubscribe(), c.unsubscribe()
                                        }
                                    })),
                                    l = 0,
                                    f = 0;

                                function d(t) {
                                    if (0 !== f) {
                                        var e = f,
                                            n = l;
                                        f = 0, l = 0, v(), u.notify({
                                            reason: t,
                                            messagesCount: e,
                                            bytesCount: n
                                        })
                                    }
                                }

                                function v() {
                                    (0, rt.DJ)(e), e = void 0
                                }
                                return {
                                    flushObservable: u,
                                    get messagesCount() {
                                        return f
                                    },
                                    notifyBeforeAddMessage: function(t) {
                                        l + t >= r && d("bytes_limit"), f += 1, l += t, void 0 === e && (e = (0, rt.wg)((function() {
                                            d("duration_limit")
                                        }), i))
                                    },
                                    notifyAfterAddMessage: function(t) {
                                        void 0 === t && (t = 0), l += t, f >= n ? d("messages_limit") : l >= r && d("bytes_limit")
                                    },
                                    notifyAfterRemoveMessage: function(t) {
                                        l -= t, 0 == (f -= 1) && v()
                                    }
                                }
                            }({
                                messagesLimit: t.batchMessagesLimit,
                                bytesLimit: t.batchBytesLimit,
                                durationLimit: t.flushTimeout,
                                pageExitObservable: i,
                                sessionExpireObservable: o
                            }), t.messageBytesLimit)
                        }
                        return {
                            flushObservable: a.flushController.flushObservable,
                            add: function(t, e) {
                                void 0 === e && (e = !0), a.add(t), s && e && s.add(n.transformMessage ? n.transformMessage(t) : t)
                            },
                            upsert: function(t, e) {
                                a.upsert(t, e), s && s.upsert(n.transformMessage ? n.transformMessage(t) : t, e)
                            },
                            stop: function() {
                                a.stop(), null == s || s.stop()
                            }
                        }
                    }(t, {
                        endpoint: t.rumEndpointBuilder,
                        encoder: a(2)
                    }, s && {
                        endpoint: s.rumEndpointBuilder,
                        transformMessage: function(t) {
                            return (0, d.kg)(t, {
                                application: {
                                    id: s.applicationId
                                }
                            })
                        },
                        encoder: a(3)
                    }, r, i, o);
                return e.subscribe(13, (function(t) {
                    "view" === t.type ? c.upsert(t, t.view.id) : c.add(t)
                })), n.subscribe((function(e) {
                    return c.add(e, (0, Q.Wb)(t))
                })), c
            }
            var Gn = Xt.A;
            var qn, Hn, Wn, Xn = Xt.A,
                Yn = 10 * S.OY;

            function zn() {
                0 !== qn.batchCount && ((0, Q.A2)("Customer data measures", qn), $n())
            }

            function Zn(t, e) {
                t.sum += e, t.min = Math.min(t.min, e), t.max = Math.max(t.max, e)
            }

            function Jn(t, e) {
                t.sum += e.sum, t.min = Math.min(t.min, e.min), t.max = Math.max(t.max, e.max)
            }

            function $n() {
                qn = {
                    batchCount: 0,
                    batchBytesCount: {
                        min: 1 / 0,
                        max: 0,
                        sum: 0
                    },
                    batchMessagesCount: {
                        min: 1 / 0,
                        max: 0,
                        sum: 0
                    },
                    globalContextBytes: {
                        min: 1 / 0,
                        max: 0,
                        sum: 0
                    },
                    userContextBytes: {
                        min: 1 / 0,
                        max: 0,
                        sum: 0
                    },
                    featureFlagBytes: {
                        min: 1 / 0,
                        max: 0,
                        sum: 0
                    }
                }
            }

            function Kn() {
                Wn = !1, Hn = {
                    globalContextBytes: {
                        min: 1 / 0,
                        max: 0,
                        sum: 0
                    },
                    userContextBytes: {
                        min: 1 / 0,
                        max: 0,
                        sum: 0
                    },
                    featureFlagBytes: {
                        min: 1 / 0,
                        max: 0,
                        sum: 0
                    }
                }
            }
            var Qn = 4e3,
                tr = 500,
                er = Xt.A;

            function nr() {
                return "hidden" === document.visibilityState ? "hidden" : document.hasFocus() ? "active" : "passive"
            }

            function rr(t, e, n, r, o, a, c, u) {
                var l = [],
                    f = new Wt;
                f.subscribe(13, (function(t) {
                    return (0, K.b)("rum", t)
                }));
                var v = function(t) {
                    var e = (0, Q.a5)("browser-rum-sdk", t);
                    if ((0, P.d0)()) {
                        var n = (0, P.Y9)();
                        e.observable.subscribe((function(t) {
                            return n.send("internal_telemetry", t)
                        }))
                    }
                    return e
                }(e);
                v.setContextProvider((function() {
                    var t, n;
                    return {
                        application: {
                            id: e.applicationId
                        },
                        session: {
                            id: null === (t = T.findTrackedSession()) || void 0 === t ? void 0 : t.id
                        },
                        view: {
                            id: null === (n = I.findView()) || void 0 === n ? void 0 : n.id
                        },
                        action: {
                            id: L.findActionId()
                        }
                    }
                }));
                var p = function(t) {
                        f.notify(14, {
                            error: t
                        }), (0, Q.A2)("Error reported to customer", {
                            "error.message": t.message
                        })
                    },
                    g = function(t, e) {
                        if (!(0, h.sr)(h.R9.FEATURE_FLAGS)) return {
                            findFeatureFlagEvaluations: function() {},
                            addFeatureFlagEvaluation: i.l,
                            stop: i.l
                        };
                        var n = new Zt(Xn);
                        return t.subscribe(2, (function(t) {
                            var r = t.startClocks;
                            n.add({}, r.relative), e.resetCustomerData()
                        })), t.subscribe(6, (function(t) {
                            var e = t.endClocks;
                            n.closeActive(e.relative)
                        })), {
                            findFeatureFlagEvaluations: function(t) {
                                return n.find(t)
                            },
                            addFeatureFlagEvaluation: function(t, r) {
                                var i = n.find();
                                i && (i[t] = r, e.updateCustomerData(i))
                            },
                            stop: function() {
                                return e.stop()
                            }
                        }
                    }(f, r.getOrCreateTracker(0)),
                    y = (0, tt.hL)(e),
                    C = y.subscribe((function(t) {
                        f.notify(11, t)
                    }));
                l.push((function() {
                    return C.unsubscribe()
                }));
                var T = (0, P.d0)() ? function() {
                    var t = {
                        id: "00000000-aaaa-0000-aaaa-000000000000",
                        sessionReplayAllowed: (0, P.Ww)("records")
                    };
                    return {
                        findTrackedSession: function() {
                            return t
                        },
                        expire: i.l,
                        expireObservable: new m.c
                    }
                }() : function(t, e, n) {
                    var r = Mn(t, Dn, (function(e) {
                        return function(t, e) {
                            var n;
                            return {
                                trackingType: n = function(t) {
                                    return "0" === t || "1" === t || "2" === t
                                }(e) ? e : (0, B.ic)(t.sessionSampleRate) ? (0, B.ic)(t.sessionReplaySampleRate) ? "1" : "2" : "0",
                                isTracked: Vn(n)
                            }
                        }(t, e)
                    }), n);
                    return r.expireObservable.subscribe((function() {
                        e.notify(9)
                    })), r.renewObservable.subscribe((function() {
                        e.notify(10)
                    })), {
                        findTrackedSession: function(t) {
                            var e = r.findActiveSession(t);
                            if (e && Vn(e.trackingType)) return {
                                id: e.id,
                                sessionReplayAllowed: "1" === e.trackingType
                            }
                        },
                        expire: r.expire,
                        expireObservable: r.expireObservable
                    }
                }(e, f, u);
                if ((0, P.d0)()) ! function(t) {
                    var e = (0, P.Y9)();
                    t.subscribe(13, (function(t) {
                        e.send("rum", t)
                    }))
                }(f);
                else {
                    var E = Fn(e, f, v.observable, p, y, T.expireObservable, c);
                    l.push((function() {
                            return E.stop()
                        })),
                        function(t, e, n, r, i) {
                            e.enabled && (0, B.ic)(t.customerDataTelemetrySampleRate) && ($n(), Kn(), n.subscribe(13, (function(t) {
                                Wn = !0, Zn(Hn.globalContextBytes, r.getOrCreateTracker(2).getBytesCount()), Zn(Hn.userContextBytes, r.getOrCreateTracker(1).getBytesCount()), Zn(Hn.featureFlagBytes, (0, A.mK)(["view", "error"], t.type) ? r.getOrCreateTracker(0).getBytesCount() : 0)
                            })), i.subscribe((function(t) {
                                var e = t.bytesCount,
                                    n = t.messagesCount;
                                Wn && (qn.batchCount += 1, Zn(qn.batchBytesCount, e), Zn(qn.batchMessagesCount, n), Jn(qn.globalContextBytes, Hn.globalContextBytes), Jn(qn.userContextBytes, Hn.userContextBytes), Jn(qn.featureFlagBytes, Hn.featureFlagBytes), Kn())
                            })), (0, rt.yb)(zn, Yn))
                        }(e, v, f, r, E.flushObservable)
                }
                var _, k = (_ = nt(), new m.c((function(t) {
                        if (_) {
                            var e = new _((0, b.dm)((function() {
                                return t.notify()
                            })));
                            return e.observe(document, {
                                    attributes: !0,
                                    characterData: !0,
                                    childList: !0,
                                    subtree: !0
                                }),
                                function() {
                                    return e.disconnect()
                                }
                        }
                    }))),
                    x = function(t, e) {
                        var n = (0, s.yG)(e);
                        return new m.c((function(r) {
                            var i = function(t, e) {
                                    var n = (0, $t.H)(history, "pushState", (function(t) {
                                            (0, t.onPostCall)(e)
                                        })).stop,
                                        r = (0, $t.H)(history, "replaceState", (function(t) {
                                            (0, t.onPostCall)(e)
                                        })).stop,
                                        i = (0, w.q2)(t, window, w.gX.POP_STATE, e).stop;
                                    return {
                                        stop: function() {
                                            n(), r(), i()
                                        }
                                    }
                                }(t, a).stop,
                                o = function(t, e) {
                                    return (0, w.q2)(t, window, w.gX.HASH_CHANGE, e)
                                }(t, a).stop;

                            function a() {
                                if (n.href !== e.href) {
                                    var t = (0, s.yG)(e);
                                    r.notify({
                                        newLocation: t,
                                        oldLocation: n
                                    }), n = t
                                }
                            }
                            return function() {
                                i(), o()
                            }
                        }))
                    }(e, location),
                    R = function(t, e, n, r, o, a, s, c) {
                        var u = function(t) {
                                var e = new Zt(Jt);
                                return t.subscribe(2, (function(t) {
                                    e.add(function(t) {
                                        return {
                                            service: t.service,
                                            version: t.version,
                                            id: t.id,
                                            name: t.name,
                                            startClocks: t.startClocks
                                        }
                                    }(t), t.startClocks.relative)
                                })), t.subscribe(6, (function(t) {
                                    var n = t.endClocks;
                                    e.closeActive(n.relative)
                                })), t.subscribe(10, (function() {
                                    e.reset()
                                })), {
                                    findView: function(t) {
                                        return e.find(t)
                                    },
                                    stop: function() {
                                        e.stop()
                                    }
                                }
                            }(t),
                            l = function(t, e, n) {
                                var r, i = new Zt(Gn);
                                t.subscribe(2, (function(t) {
                                    var e = t.startClocks,
                                        o = n.href;
                                    i.add(a({
                                        url: o,
                                        referrer: r || document.referrer
                                    }), e.relative), r = o
                                })), t.subscribe(6, (function(t) {
                                    var e = t.endClocks;
                                    i.closeActive(e.relative)
                                }));
                                var o = e.subscribe((function(t) {
                                    var e = t.newLocation,
                                        n = i.find();
                                    if (n) {
                                        var r = (0, S.$S)();
                                        i.closeActive(r), i.add(a({
                                            url: e.href,
                                            referrer: n.referrer
                                        }), r)
                                    }
                                }));

                                function a(t) {
                                    return {
                                        url: t.url,
                                        referrer: t.referrer
                                    }
                                }
                                return {
                                    findUrl: function(t) {
                                        return i.find(t)
                                    },
                                    stop: function() {
                                        o.unsubscribe(), i.stop()
                                    }
                                }
                            }(t, o, n),
                            f = function(t, e) {
                                void 0 === e && (e = tr);
                                var n, r = new Zt(er, Qn);
                                o(nr(), (0, S.$S)());
                                var i = (0, w.lQ)(t, window, [w.gX.PAGE_SHOW, w.gX.FOCUS, w.gX.BLUR, w.gX.VISIBILITY_CHANGE, w.gX.RESUME, w.gX.FREEZE, w.gX.PAGE_HIDE], (function(t) {
                                    o(function(t) {
                                        return t.type === w.gX.FREEZE ? "frozen" : t.type === w.gX.PAGE_HIDE ? t.persisted ? "frozen" : "terminated" : nr()
                                    }(t), t.timeStamp)
                                }), {
                                    capture: !0
                                }).stop;

                                function o(t, e) {
                                    void 0 === e && (e = (0, S.$S)()), t !== n && (n = t, r.closeActive(e), r.add({
                                        state: n,
                                        startTime: e
                                    }, e))
                                }
                                var a = {
                                    findAll: function(t, n) {
                                        var i = r.findAll(t, n);
                                        if (0 !== i.length) {
                                            for (var o = [], a = Math.max(0, i.length - e), s = i.length - 1; s >= a; s--) {
                                                var c = i[s],
                                                    u = (0, S.vk)(t, c.startTime);
                                                o.push({
                                                    state: c.state,
                                                    start: (0, S.Zj)(u)
                                                })
                                            }
                                            return o
                                        }
                                    },
                                    wasInPageStateAt: function(t, e) {
                                        return a.wasInPageStateDuringPeriod(t, e, 0)
                                    },
                                    wasInPageStateDuringPeriod: function(t, e, n) {
                                        return r.findAll(e, n).some((function(e) {
                                            return e.state === t
                                        }))
                                    },
                                    addPageState: o,
                                    stop: function() {
                                        i(), r.stop()
                                    }
                                };
                                return a
                            }(e),
                            d = function(t, e, n, r) {
                                t.subscribe(1, (function(e) {
                                    return t.notify(12, We(e, r))
                                }));
                                var o = {
                                    findActionId: i.l
                                };
                                return n.trackUserInteractions && (o = qe(t, e, n).actionContexts), {
                                    addAction: function(e, n) {
                                        t.notify(12, (0, A.kp)({
                                            savedCommonContext: n
                                        }, We(e, r)))
                                    },
                                    actionContexts: o
                                }
                            }(t, a, e, f),
                            v = d.addAction,
                            p = d.actionContexts,
                            m = function(t) {
                                var e = Tn();
                                return {
                                    get: function() {
                                        return {
                                            viewport: e
                                        }
                                    },
                                    stop: Cn(t).subscribe((function(t) {
                                        e = t
                                    })).unsubscribe
                                }
                            }(e);
                        return Gt(e, t, r, u, l, p, m, s, c), {
                            viewContexts: u,
                            pageStateHistory: f,
                            urlContexts: l,
                            addAction: v,
                            actionContexts: p,
                            stop: function() {
                                m.stop(), f.stop(), l.stop(), u.stop(), f.stop()
                            }
                        }
                    }(f, e, location, T, x, k, o, p),
                    I = R.viewContexts,
                    O = R.pageStateHistory,
                    N = R.urlContexts,
                    L = R.actionContexts,
                    M = R.addAction,
                    D = R.stop;
                l.push(D), (0, Q.Rr)(function(t) {
                        var e = (0, j.hO)(t);
                        return (0, A.kp)({
                            session_replay_sample_rate: t.sessionReplaySampleRate,
                            start_session_replay_recording_manually: t.startSessionReplayRecordingManually,
                            trace_sample_rate: t.traceSampleRate,
                            trace_context_injection: t.traceContextInjection,
                            action_name_attribute: t.actionNameAttribute,
                            use_allowed_tracing_urls: Array.isArray(t.allowedTracingUrls) && t.allowedTracingUrls.length > 0,
                            selected_tracing_propagators: z(t),
                            default_privacy_level: t.defaultPrivacyLevel,
                            use_excluded_activity_urls: Array.isArray(t.excludedActivityUrls) && t.excludedActivityUrls.length > 0,
                            use_worker_url: !!t.workerUrl,
                            compress_intake_requests: t.compressIntakeRequests,
                            track_views_manually: t.trackViewsManually,
                            track_user_interactions: t.trackUserInteractions,
                            track_resources: t.trackResources,
                            track_long_task: t.trackLongTasks
                        }, e)
                    }(t)),
                    function(t, e, n) {
                        t.subscribe(0, (function(r) {
                            for (var i = 0, o = r; i < o.length; i++) {
                                var a = o[i];
                                if (a.entryType !== Tt.LONG_TASK) break;
                                if (!n.findTrackedSession(a.startTime) || !e.trackLongTasks) break;
                                var s = (0, S.FR)(a.startTime),
                                    c = {
                                        date: s.timeStamp,
                                        long_task: {
                                            id: (0, mt.lk)(),
                                            duration: (0, S.Zj)(a.duration)
                                        },
                                        type: "long_task",
                                        _dd: {
                                            discarded: !1
                                        }
                                    };
                                t.notify(12, {
                                    rawRumEvent: c,
                                    startTime: s.relative,
                                    domainContext: {
                                        performanceEntry: a
                                    }
                                })
                            }
                        }))
                    }(f, e, T), Qe(f, e, T, O);
                var V = In(f, e, location, k, x, g, O, n, a),
                    U = V.addTiming,
                    F = V.startView,
                    G = V.stop;
                l.push(G);
                var q = $e(f, e, O, g).addError;
                re(f, e, T);
                var H = It(f, e).stop;
                l.push(H);
                var W = function(t, e) {
                        var n = new Map;
                        return t.subscribe(10, (function() {
                            n.clear()
                        })), {
                            startDurationVital: function(t) {
                                n.set(t.name, t)
                            },
                            stopDurationVital: function(r) {
                                var i = n.get(r.name);
                                if (i) {
                                    var o = function(t, e) {
                                        return {
                                            name: t.name,
                                            type: "duration",
                                            startClocks: t.startClocks,
                                            value: (0, S.vk)(t.startClocks.timeStamp, e.stopClocks.timeStamp),
                                            context: (0, d.kg)(t.context, e.context)
                                        }
                                    }(i, r);
                                    n.delete(o.name),
                                        function(t) {
                                            return !e.wasInPageStateDuringPeriod("frozen", t.startClocks.relative, t.value)
                                        }(o) && t.notify(12, function(t) {
                                            var e;
                                            return {
                                                rawRumEvent: {
                                                    date: t.startClocks.timeStamp,
                                                    vital: {
                                                        id: (0, mt.lk)(),
                                                        type: t.type,
                                                        name: t.name,
                                                        custom: (e = {}, e[t.name] = t.value, e)
                                                    },
                                                    type: "vital"
                                                },
                                                startTime: t.startClocks.relative,
                                                customerContext: t.context,
                                                domainContext: {}
                                            }
                                        }(o))
                                }
                            }
                        }
                    }(f, O),
                    X = function(t, e, n, r, i) {
                        return {
                            get: function(o) {
                                var a = n.findView(o),
                                    s = i.findUrl(o),
                                    c = e.findTrackedSession(o);
                                if (c && a && s) {
                                    var u = r.findActionId(o);
                                    return {
                                        application_id: t,
                                        session_id: c.id,
                                        user_action: u ? {
                                            id: u
                                        } : void 0,
                                        view: {
                                            id: a.id,
                                            name: a.name,
                                            referrer: s.referrer,
                                            url: s.url
                                        }
                                    }
                                }
                            }
                        }
                    }(e.applicationId, T, I, L, N);
                return {
                    addAction: M,
                    addError: q,
                    addTiming: U,
                    addFeatureFlagEvaluation: g.addFeatureFlagEvaluation,
                    startView: F,
                    lifeCycle: f,
                    viewContexts: I,
                    session: T,
                    stopSession: function() {
                        return T.expire()
                    },
                    getInternalContext: X.get,
                    startDurationVital: W.startDurationVital,
                    stopDurationVital: W.stopDurationVital,
                    stop: function() {
                        l.forEach((function(t) {
                            return t()
                        }))
                    }
                }
            }
            var ir = n(94561);

            function or(t, e) {
                var n = e.session,
                    r = e.viewContext,
                    i = e.errorType,
                    o = n ? n.id : "no-session-id",
                    a = [];
                void 0 !== i && a.push("error-type=".concat(i)), r && (a.push("seed=".concat(r.id)), a.push("from=".concat(r.startClocks.timeStamp)));
                var s, c, u, l = (c = (s = t).site, u = s.subdomain || function(t) {
                        switch (t.site) {
                            case ir.NW:
                            case ir.dV:
                                return "app";
                            case ir.Bb:
                                return "dd";
                            default:
                                return
                        }
                    }(s), "https://".concat(u ? "".concat(u, ".") : "").concat(c)),
                    f = "/rum/replay/sessions/".concat(o);
                return "".concat(l).concat(f, "?").concat(a.join("&"))
            }
        }
    }
]);