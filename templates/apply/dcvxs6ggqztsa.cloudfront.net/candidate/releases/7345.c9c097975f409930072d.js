"use strict";
(self.webpackChunk_workable_candidate = self.webpackChunk_workable_candidate || []).push([
    [7345], {
        65482: (e, r, t) => {
            t.d(r, {
                h: () => Le,
                A: () => xe
            }), t(93832), t(81984), t(56030), t(1233), t(52979), t(89001), t(85927), t(48991), t(94773), t(46187), t(33951), t(18544), t(1496), t(94119), t(97358), t(58981), t(74697), t(28028), t(60896), t(52209), t(48996), t(42167), t(870), t(29882), t(86342), t(18623);
            var n = t(34554),
                o = t(81396),
                a = t.n(o),
                i = t(17438);
            t(99399);
            const l = n.lazy((function() {
                return Promise.all([t.e(4121), t.e(5875), t.e(1804), t.e(6179), t.e(9734), t.e(7925), t.e(7550), t.e(6730), t.e(3958)]).then(t.bind(t, 59588))
            }));
            var c = t(28074),
                u = t(92493),
                f = t(95714),
                s = t(71452),
                d = t(58411),
                p = t(7597),
                b = t(40868),
                y = t.n(b),
                m = t(27365),
                v = t(7853),
                g = t(98672),
                h = t(23391),
                A = {
                    BUTTON_DATA: "BUTTON_DATA",
                    CONVERSION: "CONVERSION"
                },
                O = function(e) {
                    var r = e.appId,
                        t = e.awliOrganizationId,
                        n = e.mode,
                        o = e.shortcode;
                    if (A[n] && r && o && t) {
                        var a = document.createElement("script");
                        return a.setAttribute("data-size", "small"), a.setAttribute("data-api-key", r), a.setAttribute("data-company-job-code", o), a.setAttribute("data-integration-context", t), a.setAttribute("data-mode", n), a.setAttribute("data-allow-sign-in", "true"), a.setAttribute("data-callback-method", n === A.BUTTON_DATA ? "awliCallback" : ""), a.type = "IN/AwliWidget", a
                    }
                },
                S = function() {
                    if (0 !== document.querySelectorAll('script[type="IN/AwliWidget"]').length) {
                        var e = "https://www.linkedin.com/mjobs/awli/awliWidget";
                        if (document.querySelectorAll('script[src="'.concat(e, '"]')).length > 0 && t.g.AwliWidget && t.g.AwliWidget.load) return t.g.AwliWidget.load();
                        var r = document.createElement("script");
                        return r.src = e, r
                    }
                },
                w = (t(76158), t(83283), t(37511), t(38875)),
                E = t.n(w);

            function I(e) {
                return I = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, I(e)
            }

            function _(e) {
                return function(e) {
                    if (Array.isArray(e)) return k(e)
                }(e) || function(e) {
                    if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
                }(e) || function(e, r) {
                    if (e) {
                        if ("string" == typeof e) return k(e, r);
                        var t = {}.toString.call(e).slice(8, -1);
                        return "Object" === t && e.constructor && (t = e.constructor.name), "Map" === t || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? k(e, r) : void 0
                    }
                }(e) || function() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function k(e, r) {
                (null == r || r > e.length) && (r = e.length);
                for (var t = 0, n = Array(r); t < r; t++) n[t] = e[t];
                return n
            }

            function C(e, r) {
                var t = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    r && (n = n.filter((function(r) {
                        return Object.getOwnPropertyDescriptor(e, r).enumerable
                    }))), t.push.apply(t, n)
                }
                return t
            }

            function j(e) {
                for (var r = 1; r < arguments.length; r++) {
                    var t = null != arguments[r] ? arguments[r] : {};
                    r % 2 ? C(Object(t), !0).forEach((function(r) {
                        R(e, r, t[r])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : C(Object(t)).forEach((function(r) {
                        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r))
                    }))
                }
                return e
            }

            function R(e, r, t) {
                return (r = function(e) {
                    var r = function(e, r) {
                        if ("object" != I(e) || !e) return e;
                        var t = e[Symbol.toPrimitive];
                        if (void 0 !== t) {
                            var n = t.call(e, "string");
                            if ("object" != I(n)) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == I(r) ? r : r + ""
                }(r)) in e ? Object.defineProperty(e, r, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[r] = t, e
            }
            var T = "education",
                D = "experience",
                P = {
                    educations: T,
                    emailAddress: "email",
                    firstName: "firstname",
                    headline: "headline",
                    lastName: "lastname",
                    phoneNumber: "phone",
                    positions: D,
                    profileImageUrl: "avatar",
                    summary: "summary"
                },
                L = {
                    degree: "degree",
                    endDate: "end_date",
                    fieldOfStudy: "field_of_study",
                    schoolName: "school",
                    startDate: "start_date"
                },
                x = {
                    companyName: "company",
                    endDate: "end_date",
                    isCurrent: "current",
                    startDate: "start_date",
                    summary: "summary",
                    title: "title"
                },
                N = R({}, P.profileImageUrl, (function(e) {
                    return !!e && ("string" == typeof e ? e.length > 0 : "string" == typeof e.url && e.url.length > 0)
                }));
            const U = function(e, r) {
                if (!e || !r) return null;
                var t, n = (t = e, Object.keys(t).reduce((function(e, r) {
                        var n = N[P[r]];
                        return (!n || n(t[r])) && (e[P[r]] = t[r]), e
                    }), {})),
                    o = E()(_(r.map((function(e) {
                        return e && _(e.fields)
                    }))));
                return Object.keys(n).forEach((function(e) {
                    var r = o.find((function(r) {
                        return r.id === e
                    }));
                    if (r) {
                        var t = function(e, r) {
                            if (!r || !e) return null;
                            var t = function(r) {
                                return e.id === r
                            };
                            return t(T) || t(D) ? r.map((function(e) {
                                var r = {};
                                return Object.keys(e).forEach((function(n) {
                                    var o = t(T) ? L[n] : x[n];
                                    o && (r = j(j({}, r), {}, R({}, o, function(e, r) {
                                        if (!e || !r) return null;
                                        if (e === L.startDate || e === L.endDate) {
                                            var t = r.month,
                                                n = r.year;
                                            return n ? new Date(Date.UTC(n, t ? t - 1 : 0)).toISOString() : null
                                        }
                                        return r
                                    }(o, e[n]))))
                                })), r
                            })) : r
                        }(r, n[e]);
                        t && (r.value = t)
                    }
                })), r
            };
            var M = ["fetchExternalAvatar", "form", "updateForm"];

            function F() {
                return F = Object.assign ? Object.assign.bind() : function(e) {
                    for (var r = 1; r < arguments.length; r++) {
                        var t = arguments[r];
                        for (var n in t)({}).hasOwnProperty.call(t, n) && (e[n] = t[n])
                    }
                    return e
                }, F.apply(null, arguments)
            }

            function B(e, r) {
                return function(e) {
                    if (Array.isArray(e)) return e
                }(e) || function(e, r) {
                    var t = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                    if (null != t) {
                        var n, o, a, i, l = [],
                            c = !0,
                            u = !1;
                        try {
                            if (a = (t = t.call(e)).next, 0 === r) {
                                if (Object(t) !== t) return;
                                c = !1
                            } else
                                for (; !(c = (n = a.call(t)).done) && (l.push(n.value), l.length !== r); c = !0);
                        } catch (e) {
                            u = !0, o = e
                        } finally {
                            try {
                                if (!c && null != t.return && (i = t.return(), Object(i) !== i)) return
                            } finally {
                                if (u) throw o
                            }
                        }
                        return l
                    }
                }(e, r) || function(e, r) {
                    if (e) {
                        if ("string" == typeof e) return V(e, r);
                        var t = {}.toString.call(e).slice(8, -1);
                        return "Object" === t && e.constructor && (t = e.constructor.name), "Map" === t || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? V(e, r) : void 0
                    }
                }(e, r) || function() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function V(e, r) {
                (null == r || r > e.length) && (r = e.length);
                for (var t = 0, n = Array(r); t < r; t++) n[t] = e[t];
                return n
            }
            var G = function(e) {
                    var r = e.analytics,
                        t = e.analyticsEventData,
                        o = e.appId,
                        a = e.awliOrganizationId,
                        i = e.closeButton,
                        l = e.fetchExternalAvatar,
                        c = e.form,
                        u = e.scriptLoadedWatcher,
                        f = e.shortcode,
                        s = e.updateForm,
                        d = !!u,
                        p = B((0, n.useState)(null), 2),
                        b = p[0],
                        m = p[1],
                        g = B((0, n.useState)(d), 2),
                        w = g[0],
                        E = g[1],
                        I = (0, n.useContext)(v.A).setAppliedWithLinkedin,
                        _ = n.createRef(),
                        k = function(e) {
                            var r = S();
                            r.onerror = m;
                            var t = document.getElementById("app");
                            return t && t.appendChild ? (t.appendChild(r), [e, r]) : [e]
                        };
                    return (0, n.useEffect)((function() {
                        if (_.current && _.current.appendChild) {
                            var e, n = [];
                            return E(d), (e = O({
                                    appId: o,
                                    awliOrganizationId: a,
                                    mode: A.BUTTON_DATA,
                                    shortcode: f
                                }), window.awliCallback = y()((function(e) {
                                    return new Promise((function(r) {
                                        var t = e && e.profileImageUrl;
                                        return t ? l(t).then(r) : r({
                                            name: null,
                                            url: null
                                        })
                                    })).then((function() {
                                        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
                                                name: null,
                                                url: null
                                            },
                                            o = n.name,
                                            a = void 0 === o ? null : o,
                                            l = n.url,
                                            u = void 0 === l ? null : l;
                                        if (i && i(), e) return e.profileImageUrl = {
                                            name: a || u,
                                            url: u || null
                                        }, r && r.then((function(e) {
                                            var r;
                                            return e.event(null == t ? void 0 : t.category, null == t || null === (r = t.actions) || void 0 === r ? void 0 : r.LinkedinButton, "linkedin").send()
                                        })), I(!0), s(U(e, c))
                                    }))
                                })), _.current.appendChild(e), Promise.resolve(e)).then(k).then((function(e) {
                                    n = e.filter(Boolean)
                                })), d && u(_.current).then((function() {
                                    E(!1)
                                })),
                                function() {
                                    n.forEach((function(e) {
                                        return e.remove()
                                    })), document.querySelectorAll('script[src^="https://www.linkedin.com"]').forEach((function(e) {
                                        return e.remove()
                                    }))
                                }
                        }
                    }), [i, s]), f && o && a ? b ? null : n.createElement("div", {
                        className: "styles--1MTJ8"
                    }, n.createElement("div", {
                        className: "styles--1ht92",
                        "data-ui": "apply-with-linkedin"
                    }, n.createElement("div", {
                        className: "styles--26rE2",
                        ref: _
                    }, n.createElement("div", {
                        className: "styles--u35Am"
                    }, w && n.createElement(h.A, null))))) : null
                },
                W = function(e) {
                    return new Promise((function(r) {
                        var t = new MutationObserver((function(e) {
                            e.forEach((function(e) {
                                e.addedNodes.forEach((function(e) {
                                    (function(e) {
                                        return !!e.querySelector("iframe")
                                    })(e) && (e.firstChild.onload = function() {
                                        r(), t.disconnect()
                                    })
                                }))
                            }))
                        }));
                        t.observe(e, {
                            childList: !0
                        })
                    }))
                },
                z = function(e) {
                    var r = e.fetchExternalAvatar,
                        t = e.form,
                        o = e.updateForm,
                        a = function(e, r) {
                            if (null == e) return {};
                            var t, n, o = function(e, r) {
                                if (null == e) return {};
                                var t = {};
                                for (var n in e)
                                    if ({}.hasOwnProperty.call(e, n)) {
                                        if (r.includes(n)) continue;
                                        t[n] = e[n]
                                    }
                                return t
                            }(e, r);
                            if (Object.getOwnPropertySymbols) {
                                var a = Object.getOwnPropertySymbols(e);
                                for (n = 0; n < a.length; n++) t = a[n], r.includes(t) || {}.propertyIsEnumerable.call(e, t) && (o[t] = e[t])
                            }
                            return o
                        }(e, M),
                        i = (0, n.useContext)(g.A),
                        l = (0, n.useContext)(m.A).accountDetails;
                    if (!l) return null;
                    var c = l.details,
                        u = (void 0 === c ? {} : c).applyWithLinkedin,
                        f = void 0 === u ? {} : u,
                        s = f.appId,
                        d = f.awliOrganizationId;
                    return s && d ? n.createElement(G, F({}, a, {
                        appId: s,
                        awliOrganizationId: d,
                        fetchExternalAvatar: r,
                        form: t,
                        scriptLoadedWatcher: W,
                        shortcode: i,
                        updateForm: o
                    })) : null
                };
            const H = a()({
                loader: function() {
                    return s.default.then((function(e) {
                        var r = e.enableLinkedin;
                        return function(e) {
                            return r ? n.createElement(z, e) : null
                        }
                    }))
                },
                loading: function() {
                    return null
                }
            });
            var K = t(38355),
                q = t(17896),
                $ = t(6241),
                J = t(65750),
                X = t.n(J),
                Y = t(92925),
                Q = t(98428),
                Z = t(30757),
                ee = t(43236);

            function re(e, r) {
                return function(e) {
                    if (Array.isArray(e)) return e
                }(e) || function(e, r) {
                    var t = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                    if (null != t) {
                        var n, o, a, i, l = [],
                            c = !0,
                            u = !1;
                        try {
                            if (a = (t = t.call(e)).next, 0 === r) {
                                if (Object(t) !== t) return;
                                c = !1
                            } else
                                for (; !(c = (n = a.call(t)).done) && (l.push(n.value), l.length !== r); c = !0);
                        } catch (e) {
                            u = !0, o = e
                        } finally {
                            try {
                                if (!c && null != t.return && (i = t.return(), Object(i) !== i)) return
                            } finally {
                                if (u) throw o
                            }
                        }
                        return l
                    }
                }(e, r) || function(e, r) {
                    if (e) {
                        if ("string" == typeof e) return te(e, r);
                        var t = {}.toString.call(e).slice(8, -1);
                        return "Object" === t && e.constructor && (t = e.constructor.name), "Map" === t || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? te(e, r) : void 0
                    }
                }(e, r) || function() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function te(e, r) {
                (null == r || r > e.length) && (r = e.length);
                for (var t = 0, n = Array(r); t < r; t++) n[t] = e[t];
                return n
            }
            const ne = function(e) {
                    var r = e.applicationId,
                        t = e.id,
                        o = e.onSkip,
                        a = e.onSubmit,
                        i = re((0, ee.A)(), 3),
                        l = i[0],
                        c = i[1],
                        u = i[2],
                        f = re((0, n.useState)(!1), 2),
                        s = f[0],
                        d = f[1],
                        b = ((0, n.useContext)(m.A) || {}).accountDetails,
                        y = (void 0 === b ? {} : b).name,
                        v = void 0 === y ? "" : y,
                        g = (0, n.useContext)(Y.A),
                        h = (0, n.useCallback)(X()((function(e) {
                            if (!l) return null;
                            g("submit_survey").then((function(n) {
                                return l(t, {
                                    answers: e,
                                    candidate: {
                                        application_form_id: r
                                    },
                                    uid: t
                                }, n)
                            })).then((function() {
                                if (!a) return null;
                                a()
                            }))
                        }), 200), [l, t, a, r]);
                    return u || s ? n.createElement($.A, {
                        footer: s ? null : p.Ay.t("survey.success.footer"),
                        message: s ? p.Ay.t("survey.skipped.message") : p.Ay.t("survey.success.message"),
                        title: s ? p.Ay.t("survey.skipped.title") : p.Ay.t("survey.success.title")
                    }) : n.createElement("div", {
                        className: Z.A.main
                    }, n.createElement("h3", {
                        className: Z.A.intro
                    }, p.Ay.t("survey.participation", {
                        name: v
                    })), n.createElement(Q.A, {
                        id: t,
                        onSkip: function() {
                            o && o(), d(!0)
                        },
                        onSubmit: h,
                        submitting: c
                    }))
                },
                oe = function(e) {
                    var r = e.id,
                        t = ((0, n.useContext)(m.A) || {}).accountDetails,
                        o = (void 0 === t ? {} : t).trackingPixelUrl;
                    return r && o ? n.createElement("img", {
                        height: 0,
                        src: o + (-1 === o.indexOf("?") ? "?" : "&") + "wid=".concat(r),
                        width: 0
                    }) : null
                };

            function ae(e, r) {
                return function(e) {
                    if (Array.isArray(e)) return e
                }(e) || function(e, r) {
                    var t = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                    if (null != t) {
                        var n, o, a, i, l = [],
                            c = !0,
                            u = !1;
                        try {
                            if (a = (t = t.call(e)).next, 0 === r) {
                                if (Object(t) !== t) return;
                                c = !1
                            } else
                                for (; !(c = (n = a.call(t)).done) && (l.push(n.value), l.length !== r); c = !0);
                        } catch (e) {
                            u = !0, o = e
                        } finally {
                            try {
                                if (!c && null != t.return && (i = t.return(), Object(i) !== i)) return
                            } finally {
                                if (u) throw o
                            }
                        }
                        return l
                    }
                }(e, r) || function(e, r) {
                    if (e) {
                        if ("string" == typeof e) return ie(e, r);
                        var t = {}.toString.call(e).slice(8, -1);
                        return "Object" === t && e.constructor && (t = e.constructor.name), "Map" === t || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? ie(e, r) : void 0
                    }
                }(e, r) || function() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function ie(e, r) {
                (null == r || r > e.length) && (r = e.length);
                for (var t = 0, n = Array(r); t < r; t++) n[t] = e[t];
                return n
            }
            const le = (0, i.A)((function(e) {
                var r = e.email,
                    t = void 0 === r ? "" : r,
                    o = e.history,
                    a = e.id,
                    i = e.surveyId,
                    l = e.withApplyState,
                    u = ae((0, n.useState)(!1), 2),
                    f = u[0],
                    s = u[1],
                    d = ae((0, n.useState)(!1), 2),
                    b = d[0],
                    y = d[1],
                    v = (0, n.useContext)(m.A).accountDetails,
                    g = ((0, n.useContext)(q.A) || {}).job,
                    h = (void 0 === g ? {} : g).location,
                    A = (void 0 === h ? {} : h).countryCode,
                    O = v && v.details;
                (0, n.useEffect)((function() {
                    o && o.push && l && o.push({
                        search: "?success"
                    })
                }), [o, l]);
                var S = (0, n.useCallback)((function() {
                        return y(!0)
                    })),
                    w = (0, n.useCallback)((function() {
                        return s(!0)
                    })),
                    E = (0, n.useMemo)((function() {
                        return (null == O ? void 0 : O.eeoc) && "US" === A && !f
                    }), [A, b, f, null == O ? void 0 : O.eeoc]),
                    I = (0, n.useMemo)((function() {
                        return !b && !f
                    }), [b, f]),
                    _ = (0, n.useMemo)((function() {
                        return (b || !E) && i
                    }), [E, b, i]);
                return n.createElement(n.Fragment, null, n.createElement(oe, {
                    id: a
                }), n.createElement(c.A, null), n.createElement("div", {
                    className: "styles--PaaiU"
                }, I && n.createElement($.A, {
                    footer: p.Ay.t("form.success.footer.formSubmitted", {
                        email: t
                    }),
                    message: p.Ay.t("form.success.message.formSubmitted")
                }), E && n.createElement(K.A, {
                    id: a,
                    onSkip: S,
                    onSubmit: S,
                    withApplyState: l
                }), _ && n.createElement(ne, {
                    applicationId: a,
                    id: i,
                    onSkip: w,
                    onSubmit: w
                })))
            }));
            var ce = t(83491),
                ue = t(79845),
                fe = t(32490),
                se = t(26221),
                de = t(47962),
                pe = t.n(de),
                be = t(79347),
                ye = t.n(be);

            function me(e, r) {
                (null == r || r > e.length) && (r = e.length);
                for (var t = 0, n = Array(r); t < r; t++) n[t] = e[t];
                return n
            }
            const ve = function() {
                var e, r, t = (e = (0, n.useState)(0), r = 2, function(e) {
                        if (Array.isArray(e)) return e
                    }(e) || function(e, r) {
                        var t = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                        if (null != t) {
                            var n, o, a, i, l = [],
                                c = !0,
                                u = !1;
                            try {
                                if (a = (t = t.call(e)).next, 0 === r) {
                                    if (Object(t) !== t) return;
                                    c = !1
                                } else
                                    for (; !(c = (n = a.call(t)).done) && (l.push(n.value), l.length !== r); c = !0);
                            } catch (e) {
                                u = !0, o = e
                            } finally {
                                try {
                                    if (!c && null != t.return && (i = t.return(), Object(i) !== i)) return
                                } finally {
                                    if (u) throw o
                                }
                            }
                            return l
                        }
                    }(e, r) || function(e, r) {
                        if (e) {
                            if ("string" == typeof e) return me(e, r);
                            var t = {}.toString.call(e).slice(8, -1);
                            return "Object" === t && e.constructor && (t = e.constructor.name), "Map" === t || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? me(e, r) : void 0
                        }
                    }(e, r) || function() {
                        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }()),
                    o = t[0],
                    a = t[1];
                return n.useEffect((function() {
                    var e = function() {
                        var e = document.documentElement,
                            r = document.body;
                        if (e && r) {
                            var t = (e.scrollTop || r.scrollTop) / ((e.scrollHeight || r.scrollHeight) - e.clientHeight);
                            a(pe()(t, 0, 1))
                        }
                    };
                    return window.addEventListener("scroll", e),
                        function() {
                            return window.removeEventListener("scroll", e)
                        }
                }), []), n.createElement("div", {
                    "aria-valuemax": 1,
                    "aria-valuemin": 0,
                    "aria-valuenow": ye()(o, 1),
                    className: "styles--3TxAr",
                    role: "progressbar",
                    style: {
                        transform: "scaleX(".concat(o, ")")
                    }
                })
            };
            t(85218);
            var ge = t(54070),
                he = t(97941);

            function Ae(e) {
                return Ae = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, Ae(e)
            }

            function Oe(e, r) {
                var t = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    r && (n = n.filter((function(r) {
                        return Object.getOwnPropertyDescriptor(e, r).enumerable
                    }))), t.push.apply(t, n)
                }
                return t
            }

            function Se(e) {
                for (var r = 1; r < arguments.length; r++) {
                    var t = null != arguments[r] ? arguments[r] : {};
                    r % 2 ? Oe(Object(t), !0).forEach((function(r) {
                        we(e, r, t[r])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : Oe(Object(t)).forEach((function(r) {
                        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r))
                    }))
                }
                return e
            }

            function we(e, r, t) {
                return (r = function(e) {
                    var r = function(e, r) {
                        if ("object" != Ae(e) || !e) return e;
                        var t = e[Symbol.toPrimitive];
                        if (void 0 !== t) {
                            var n = t.call(e, "string");
                            if ("object" != Ae(n)) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == Ae(r) ? r : r + ""
                }(r)) in e ? Object.defineProperty(e, r, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[r] = t, e
            }
            var Ee = {
                    ACTION: he.A.Actions.QuickApply,
                    CATEGORY: he.A.Categories.ApplicationForm
                },
                Ie = Object.freeze(we(we(we(we(we(we(we({}, ge.A.AUTOFILL_FORM_USING_CV_FROM_COMPUTER, Se(Se({}, Ee), {}, {
                    LABEL: "computer"
                })), ge.A.AUTOFILL_FORM_USING_CV_FROM_DROPBOX, Se(Se({}, Ee), {}, {
                    LABEL: "dropbox"
                })), ge.A.AUTOFILL_FORM_USING_CV_FROM_GOOGLE_DRIVE, Se(Se({}, Ee), {}, {
                    LABEL: "googledrive"
                })), ge.A.FORM_SUBMIT, {
                    ACTION: he.A.Actions.Submit,
                    CATEGORY: he.A.Categories.ApplicationForm
                }), ge.A.FORM_SUBMIT_SUCCESS, {
                    ACTION: he.A.Actions.Submit,
                    CATEGORY: he.A.Categories.ApplicationForm,
                    LABEL: "success"
                }), ge.A.FORM_SUBMIT_SERVER_VALIDATION_ERROR, {
                    ACTION: he.A.Actions.ServerValidationError,
                    CATEGORY: he.A.Categories.ApplicationForm,
                    HOTJAR_TAG: "submit-errors"
                }), ge.A.INLINE_VALIDATION_ERROR, {
                    CATEGORY: he.A.Categories.ValidationError,
                    HOTJAR_TAG: "inline-errors"
                }));

            function _e(e) {
                return _e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, _e(e)
            }
            var ke = ["surveyId", "uid"];

            function Ce() {
                return Ce = Object.assign ? Object.assign.bind() : function(e) {
                    for (var r = 1; r < arguments.length; r++) {
                        var t = arguments[r];
                        for (var n in t)({}).hasOwnProperty.call(t, n) && (e[n] = t[n])
                    }
                    return e
                }, Ce.apply(null, arguments)
            }

            function je(e, r) {
                var t = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    r && (n = n.filter((function(r) {
                        return Object.getOwnPropertyDescriptor(e, r).enumerable
                    }))), t.push.apply(t, n)
                }
                return t
            }

            function Re(e, r, t) {
                return (r = function(e) {
                    var r = function(e, r) {
                        if ("object" != _e(e) || !e) return e;
                        var t = e[Symbol.toPrimitive];
                        if (void 0 !== t) {
                            var n = t.call(e, "string");
                            if ("object" != _e(n)) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == _e(r) ? r : r + ""
                }(r)) in e ? Object.defineProperty(e, r, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[r] = t, e
            }

            function Te(e, r) {
                (null == r || r > e.length) && (r = e.length);
                for (var t = 0, n = Array(r); t < r; t++) n[t] = e[t];
                return n
            }
            var De = function() {},
                Pe = function(e, r) {
                    var t = function(e, r) {
                        var t = Ie[e];
                        return e === ge.A[ge.A.INLINE_VALIDATION_ERROR] && (t.ACTION = r.field, t.LABEL = r.error), t
                    }(e, r);
                    u.Ay && u.Ay.then((function(e) {
                        return e.event(t.CATEGORY, t.ACTION, t.LABEL).send()
                    })), t.HOTJAR_TAG && se.A.tag(t.HOTJAR_TAG)
                },
                Le = (0, i.A)((function(e) {
                    var r, t, o, a = e.appliedWithLinkedin,
                        i = e.dropboxAppKey,
                        u = e.googleApiConfig,
                        s = e.hasCustomDomain,
                        b = e.history,
                        y = void 0 === b ? {} : b,
                        m = e.isLinkedInApplyEnabled,
                        v = e.recaptchaClientKey,
                        g = e.sections,
                        w = e.shortcode,
                        E = e.sourcedCandidate,
                        I = (t = (0, n.useState)(), o = 2, function(e) {
                            if (Array.isArray(e)) return e
                        }(t) || function(e, r) {
                            var t = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                            if (null != t) {
                                var n, o, a, i, l = [],
                                    c = !0,
                                    u = !1;
                                try {
                                    if (a = (t = t.call(e)).next, 0 === r) {
                                        if (Object(t) !== t) return;
                                        c = !1
                                    } else
                                        for (; !(c = (n = a.call(t)).done) && (l.push(n.value), l.length !== r); c = !0);
                                } catch (e) {
                                    u = !0, o = e
                                } finally {
                                    try {
                                        if (!c && null != t.return && (i = t.return(), Object(i) !== i)) return
                                    } finally {
                                        if (u) throw o
                                    }
                                }
                                return l
                            }
                        }(t, o) || function(e, r) {
                            if (e) {
                                if ("string" == typeof e) return Te(e, r);
                                var t = {}.toString.call(e).slice(8, -1);
                                return "Object" === t && e.constructor && (t = e.constructor.name), "Map" === t || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? Te(e, r) : void 0
                            }
                        }(t, o) || function() {
                            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                        }()),
                        _ = I[0],
                        k = I[1],
                        C = (0, n.useContext)(ce.A).accountDetails,
                        j = !(null == C || null === (r = C.details) || void 0 === r || !r.guessAvatar),
                        R = (0, d.A)(),
                        T = (0, d.A)((function() {
                            var e;
                            return (null === (e = window) || void 0 === e || null === (e = e.careers) || void 0 === e ? void 0 : e.config) || {}
                        })).features(),
                        D = Object.keys(R.features()).includes("recaptcha") && R.allows("recaptcha"),
                        P = (0, n.useCallback)((function(e) {
                            var r, t;
                            null === (r = window.grecaptcha) || void 0 === r || null === (t = r.execute) || void 0 === t || t.call(r, v, {
                                action: e
                            })
                        }), [v]),
                        L = (0, n.useCallback)((function() {
                            var e;
                            return null === (e = y.replace) || void 0 === e ? void 0 : e.call(y, {
                                search: "?autofill"
                            })
                        }), [y.replace]),
                        x = (0, n.useCallback)((function(e, r) {
                            var t = r.headers;
                            return k(), E && (t = function(e) {
                                for (var r = 1; r < arguments.length; r++) {
                                    var t = null != arguments[r] ? arguments[r] : {};
                                    r % 2 ? je(Object(t), !0).forEach((function(r) {
                                        Re(e, r, t[r])
                                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : je(Object(t)).forEach((function(r) {
                                        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r))
                                    }))
                                }
                                return e
                            }({
                                cid: E
                            }, t)), f.A.apply(w).withAnswers(e, {
                                headers: t
                            })
                        }), [E]),
                        N = (0, n.useCallback)((function(e) {
                            k(e);
                            var r = De;
                            if (a) {
                                var t = function(e, r) {
                                        var t = (e || {}).details,
                                            n = (void 0 === t ? {} : t).applyWithLinkedin,
                                            o = void 0 === n ? {} : n,
                                            a = o.appId,
                                            i = o.awliOrganizationId,
                                            l = O({
                                                appId: a,
                                                awliOrganizationId: i,
                                                mode: A.CONVERSION,
                                                shortcode: r
                                            });
                                        document.body.append(l);
                                        var c = S();
                                        return document.body.append(c), {
                                            linkedinDataScript: l,
                                            linkedinScript: c
                                        }
                                    }(C, w),
                                    n = t.linkedinDataScript,
                                    o = t.linkedinScript;
                                r = function() {
                                    Promise.resolve().then((function() {
                                        null == n || n.remove(), null == o || o.remove()
                                    }))
                                }
                            }
                            null != e && e.uid ? f.A.attribute(w, {
                                applicationId: e.uid
                            }).catch(De).finally(r) : r()
                        }), [w, a]),
                        U = (0, n.useCallback)((function(e, r) {
                            (null === fe.A || void 0 === fe.A ? void 0 : fe.A.error(e, r)) || console.error(e)
                        }), []);
                    if (_) {
                        var M = _.surveyId,
                            F = _.uid,
                            B = function(e, r) {
                                if (null == e) return {};
                                var t, n, o = function(e, r) {
                                    if (null == e) return {};
                                    var t = {};
                                    for (var n in e)
                                        if ({}.hasOwnProperty.call(e, n)) {
                                            if (r.includes(n)) continue;
                                            t[n] = e[n]
                                        }
                                    return t
                                }(e, r);
                                if (Object.getOwnPropertySymbols) {
                                    var a = Object.getOwnPropertySymbols(e);
                                    for (n = 0; n < a.length; n++) t = a[n], r.includes(t) || {}.propertyIsEnumerable.call(e, t) && (o[t] = e[t])
                                }
                                return o
                            }(_, ke);
                        return n.createElement(le, Ce({}, B, {
                            id: F,
                            surveyId: M,
                            withApplyState: !0
                        }))
                    }
                    return n.createElement(n.Fragment, null, n.createElement(c.A, null), n.createElement(ve, null), n.createElement("main", {
                        className: "styles--2ZUgk",
                        role: "main"
                    }, n.createElement(n.Suspense, {
                        fallback: n.createElement(h.A, null)
                    }, n.createElement(l, {
                        ApplyWithLinkedin: m ? H : null,
                        dropboxAppKey: i,
                        executeRecaptcha: D ? P : void 0,
                        findAvatarUsingEmail: f.A.avatar,
                        getUploadedCVDetails: f.A.cv(w).autofill,
                        googleApiConfig: u,
                        handleAnalyticsEvent: Pe,
                        i18n: p.Ay,
                        isTurnstileEnabled: R.allows("wjb_acp_turnstile_captcha_enabled"),
                        isUploadCvFromGoogleDriveEnabled: !0 !== s && "true" !== s,
                        jobShortcode: w,
                        logError: U,
                        onSuccess: N,
                        onUsedUploadedCvDetails: L,
                        presignFile: f.A.cv(w).presigned,
                        sections: g,
                        shouldGuessAvatar: j,
                        shouldPropagateErrors: !0,
                        submit: x,
                        turnstileSiteKey: T.turnstileWidgetSiteKey,
                        withSubmitButton: !0
                    }))))
                }));
            const xe = a()({
                loader: function() {
                    return s.default.then((function(e) {
                        var r = e.dropbox,
                            t = void 0 === r ? {} : r,
                            o = e.enableLinkedin,
                            a = e.gapi,
                            i = void 0 === a ? {} : a,
                            l = e.meta,
                            c = void 0 === l ? {} : l,
                            u = e.recaptcha,
                            f = void 0 === u ? {} : u;
                        return function(e) {
                            return n.createElement(g.A.Consumer, null, (function(r) {
                                return n.createElement(ue.A.Consumer, null, (function(a) {
                                    return n.createElement(v.A.Consumer, null, (function(l) {
                                        var u = l.appliedWithLinkedin,
                                            s = l.form;
                                        return n.createElement(Le, Ce({
                                            appliedWithLinkedin: u,
                                            dropboxAppKey: t.key,
                                            googleApiConfig: i,
                                            hasCustomDomain: c.hasCustomDomain,
                                            isLinkedInApplyEnabled: o,
                                            recaptchaClientKey: f.clientKey,
                                            sections: s,
                                            shortcode: r,
                                            sourcedCandidate: a
                                        }, e))
                                    }))
                                }))
                            }))
                        }
                    }))
                },
                loading: function() {
                    return n.createElement(h.A, null)
                }
            })
        },
        43236: (e, r, t) => {
            t.d(r, {
                A: () => f
            }), t(93832), t(81984), t(56030), t(89001), t(85927), t(48991), t(46187), t(48996), t(42167), t(870), t(29882), t(97358), t(58981), t(28028);
            var n = t(34554),
                o = t(85497),
                a = t.n(o),
                i = t(95714),
                l = t(43127);

            function c(e, r) {
                return function(e) {
                    if (Array.isArray(e)) return e
                }(e) || function(e, r) {
                    var t = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                    if (null != t) {
                        var n, o, a, i, l = [],
                            c = !0,
                            u = !1;
                        try {
                            if (a = (t = t.call(e)).next, 0 === r) {
                                if (Object(t) !== t) return;
                                c = !1
                            } else
                                for (; !(c = (n = a.call(t)).done) && (l.push(n.value), l.length !== r); c = !0);
                        } catch (e) {
                            u = !0, o = e
                        } finally {
                            try {
                                if (!c && null != t.return && (i = t.return(), Object(i) !== i)) return
                            } finally {
                                if (u) throw o
                            }
                        }
                        return l
                    }
                }(e, r) || function(e, r) {
                    if (e) {
                        if ("string" == typeof e) return u(e, r);
                        var t = {}.toString.call(e).slice(8, -1);
                        return "Object" === t && e.constructor && (t = e.constructor.name), "Map" === t || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? u(e, r) : void 0
                    }
                }(e, r) || function() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function u(e, r) {
                (null == r || r > e.length) && (r = e.length);
                for (var t = 0, n = Array(r); t < r; t++) n[t] = e[t];
                return n
            }
            const f = function() {
                var e = c((0, n.useState)(!1), 2),
                    r = e[0],
                    t = e[1],
                    o = c((0, n.useState)(!1), 2),
                    u = o[0],
                    f = o[1],
                    s = c((0, n.useState)(!1), 2),
                    d = s[0],
                    p = s[1];
                return [(0, n.useCallback)((function(e, r, n) {
                    return e && r ? (t(!0), i.A.survey.submit(e, r, {
                        headers: {
                            "recaptcha-token": n || ""
                        }
                    }).then((function() {
                        return f(!0)
                    })).catch((function(e) {
                        e && p(a()((0, l.qg)(e)))
                    })).finally((function() {
                        return t(!1)
                    }))) : null
                }), [d, u]), r, u, d]
            }
        },
        71139: (e, r, t) => {
            t.d(r, {
                A: () => n.A
            });
            var n = t(20678)
        },
        77428: (e, r, t) => {
            t.d(r, {
                A: () => p
            }), t(93832), t(81984), t(56030), t(1233), t(85927), t(8153), t(94773), t(33951), t(38314), t(48996), t(55152), t(58981), t(28028);
            var n = t(34554),
                o = t(10565);

            function a(e) {
                return a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, a(e)
            }

            function i(e, r) {
                for (var t = 0; t < r.length; t++) {
                    var n = r[t];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, l(n.key), n)
                }
            }

            function l(e) {
                var r = function(e, r) {
                    if ("object" != a(e) || !e) return e;
                    var t = e[Symbol.toPrimitive];
                    if (void 0 !== t) {
                        var n = t.call(e, "string");
                        if ("object" != a(n)) return n;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(e)
                }(e);
                return "symbol" == a(r) ? r : r + ""
            }

            function c(e, r, t) {
                return r = f(r),
                    function(e, r) {
                        if (r && ("object" == a(r) || "function" == typeof r)) return r;
                        if (void 0 !== r) throw new TypeError("Derived constructors may only return object or undefined");
                        return function(e) {
                            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return e
                        }(e)
                    }(e, u() ? Reflect.construct(r, t || [], f(e).constructor) : r.apply(e, t))
            }

            function u() {
                try {
                    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (e) {}
                return (u = function() {
                    return !!e
                })()
            }

            function f(e) {
                return f = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                }, f(e)
            }

            function s(e, r) {
                return s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, r) {
                    return e.__proto__ = r, e
                }, s(e, r)
            }
            var d = "a".concat(["", o.A.active.split(" ")].join("."));
            const p = function(e) {
                function r(e) {
                    var t;
                    return function(e, r) {
                        if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function")
                    }(this, r), (t = c(this, r, [e])).runner = n.createRef(), t.positionRunner = t.positionRunner.bind(t), t
                }
                return function(e, r) {
                    if ("function" != typeof r && null !== r) throw new TypeError("Super expression must either be null or a function");
                    e.prototype = Object.create(r && r.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    }), Object.defineProperty(e, "prototype", {
                        writable: !1
                    }), r && s(e, r)
                }(r, e), t = r, (a = [{
                    key: "componentDidMount",
                    value: function() {
                        window.addEventListener("resize", this.positionRunner), window.addEventListener("orientationchange", this.positionRunner), this.positionRunner()
                    }
                }, {
                    key: "componentDidUpdate",
                    value: function() {
                        this.positionRunner()
                    }
                }, {
                    key: "componentWillUnmount",
                    value: function() {
                        window.removeEventListener("resize", this.positionRunner), window.removeEventListener("orientationchange", this.positionRunner)
                    }
                }, {
                    key: "positionRunner",
                    value: function() {
                        var e;
                        (e = this.runner.current) && window.requestAnimationFrame((function() {
                            var r = document.querySelector(d) || {},
                                t = r.offsetLeft,
                                n = void 0 === t ? 0 : t,
                                o = r.offsetWidth,
                                a = void 0 === o ? 0 : o;
                            e.style.transform = n ? "translateX(".concat(n, "px)") : "translateX(0)", e.style.width = a && "".concat(a, "px")
                        }))
                    }
                }, {
                    key: "render",
                    value: function() {
                        return n.createElement("span", {
                            className: o.A.runner,
                            ref: this.runner
                        })
                    }
                }]) && i(t.prototype, a), Object.defineProperty(t, "prototype", {
                    writable: !1
                }), t;
                var t, a
            }(n.Component)
        },
        98428: (e, r, t) => {
            t.d(r, {
                A: () => n.A
            });
            var n = t(90123)
        },
        54070: (e, r, t) => {
            t.d(r, {
                A: () => n
            }), t(85218);
            const n = Object.freeze({
                AUTOFILL_FORM_USING_CV_FROM_COMPUTER: "AUTOFILL_FORM_USING_CV_FROM_COMPUTER",
                AUTOFILL_FORM_USING_CV_FROM_DROPBOX: "AUTOFILL_FORM_USING_CV_FROM_DROPBOX",
                AUTOFILL_FORM_USING_CV_FROM_GOOGLE_DRIVE: "AUTOFILL_FORM_USING_CV_FROM_GOOGLE_DRIVE",
                FORM_SUBMIT: "FORM_SUBMIT",
                FORM_SUBMIT_SUCCESS: "FORM_SUBMIT_SUCCESS",
                FORM_SUBMIT_SERVER_VALIDATION_ERROR: "FORM_SUBMIT_SERVER_VALIDATION_ERROR",
                INLINE_VALIDATION_ERROR: "INLINE_VALIDATION_ERROR"
            })
        },
        99399: (e, r, t) => {
            t.d(r, {
                A: () => o
            });
            var n = t(34554);
            const o = function() {
                return n.createElement("div", {
                    className: "styles--1WgS8"
                }, n.createElement("div", {
                    className: "styles--3bU4I"
                }, n.createElement("div", {
                    className: "styles--1fJA8 styles--2V4ST"
                }), n.createElement("div", {
                    className: "styles--1U4av styles--2V4ST"
                }), n.createElement("div", {
                    className: "styles--3xiB9 styles--2V4ST"
                }), n.createElement("div", {
                    className: "styles--1rak3 styles--2V4ST"
                })))
            }
        },
        30757: (e, r, t) => {
            t.d(r, {
                A: () => n
            });
            const n = {
                "tablet-width": "767px",
                tabletWidth: "767px",
                "mobile-width": "420px",
                mobileWidth: "420px",
                white: "#ffffff",
                grey100: "#fbfbfb",
                grey200: "#f3f5f8",
                grey300: "#e7ecf3",
                grey400: "#d0d8e4",
                grey500: "#919bab",
                grey600: "#6a7381",
                grey700: "#313b46",
                grey800: "#0f161e",
                green50: "#e9fcf4",
                green100: "#ccf4dd",
                green200: "#7edcaf",
                green300: "#06cb8a",
                green400: "#05b279",
                green500: "#00756a",
                green600: "#00665b",
                green700: "#00554b",
                blue50: "#eef8ff",
                blue100: "#c7e2ff",
                blue200: "#75acff",
                blue300: "#5d9aee",
                blue400: "#4385e0",
                blue500: "#226ace",
                blue600: "#1859b5",
                blue700: "#0f4897",
                petrol50: "#e3fbfb",
                petrol100: "#c5f5f5",
                petrol200: "#65e2ea",
                petrol300: "#00bcc9",
                petrol400: "#00a5ae",
                petrol500: "#107191",
                petrol600: "#005e7f",
                petrol700: "#004561",
                purple50: "#fbf4ff",
                purple100: "#edd5ff",
                purple200: "#d8adff",
                purple300: "#b46efe",
                purple400: "#9e4ff0",
                purple500: "#8736dc",
                purple600: "#6509bf",
                purple700: "#430080",
                red50: "#fff1f1",
                red100: "#ffd2cf",
                red200: "#fa8373",
                red300: "#f1674f",
                red400: "#e54d33",
                red500: "#cc2c11",
                red600: "#af0200",
                red700: "#990000",
                orange50: "#fffadf",
                orange100: "#fff0b8",
                orange200: "#ffdb73",
                orange300: "#ffb420",
                orange400: "#ffa740",
                orange500: "#ff8f0d",
                orange600: "#ad4800",
                orange700: "#943e00",
                "color-default": "#00756a",
                colorDefault: "#00756a",
                "color-white": "#ffffff",
                colorWhite: "#ffffff",
                "color-font-primary": "#313b46",
                colorFontPrimary: "#313b46",
                "color-font-secondary": "#6a7381",
                colorFontSecondary: "#6a7381",
                "color-font-primary-light": "#ffffff",
                colorFontPrimaryLight: "#ffffff",
                "color-font-primary-dark": "#313b46",
                colorFontPrimaryDark: "#313b46",
                "color-border-default": "#d0d8e4",
                colorBorderDefault: "#d0d8e4",
                "color-success": "#05b279",
                colorSuccess: "#05b279",
                "color-success-button": "#7edcaf",
                colorSuccessButton: "#7edcaf",
                "color-success-background": "#e9fcf4",
                colorSuccessBackground: "#e9fcf4",
                "color-success-outline": "#ccf4dd",
                colorSuccessOutline: "#ccf4dd",
                "color-danger": "#cc2c11",
                colorDanger: "#cc2c11",
                "color-danger-background": "#fff1f1",
                colorDangerBackground: "#fff1f1",
                "color-danger-outline": "#ffd2cf",
                colorDangerOutline: "#ffd2cf",
                "color-caution": "#ad4800",
                colorCaution: "#ad4800",
                "color-caution-button": "#ffdb73",
                colorCautionButton: "#ffdb73",
                "color-caution-background": "#fffadf",
                colorCautionBackground: "#fffadf",
                "color-caution-outline": "#fff0b8",
                colorCautionOutline: "#fff0b8",
                "color-informational": "#226ace",
                colorInformational: "#226ace",
                "color-informational-background": "#eef8ff",
                colorInformationalBackground: "#eef8ff",
                "color-informational-outline": "#c7e2ff",
                colorInformationalOutline: "#c7e2ff",
                "color-warning": "#ffb420",
                colorWarning: "#ffb420",
                "color-ai": "#8736dc",
                colorAi: "#8736dc",
                "color-ai-background": "#fbf4ff",
                colorAiBackground: "#fbf4ff",
                "color-ai-outline": "#edd5ff",
                colorAiOutline: "#edd5ff",
                "color-beta-primary": "#107191",
                colorBetaPrimary: "#107191",
                "color-beta-secondary": "#c5f5f5",
                colorBetaSecondary: "#c5f5f5",
                "color-neutral": "#6a7381",
                colorNeutral: "#6a7381",
                "color-muted": "#f3f5f8",
                colorMuted: "#f3f5f8",
                "background-color": "#ffffff",
                backgroundColor: "#ffffff",
                "background-color-secondary": "#f3f5f8",
                backgroundColorSecondary: "#f3f5f8",
                "background-color-dark": "#313b46",
                backgroundColorDark: "#313b46",
                "color-outline": "#226ace",
                colorOutline: "#226ace",
                "color-outline-focus": "#6a7381",
                colorOutlineFocus: "#6a7381",
                "color-input-default": "#d0d8e4",
                colorInputDefault: "#d0d8e4",
                "color-input-muted": "#919bab",
                colorInputMuted: "#919bab",
                "color-input-placeholder": "#6a7381",
                colorInputPlaceholder: "#6a7381",
                "color-input-label-optional": "#919bab",
                colorInputLabelOptional: "#919bab",
                "color-input-helper-default": "#6a7381",
                colorInputHelperDefault: "#6a7381",
                "color-dismiss-default": "#919bab",
                colorDismissDefault: "#919bab",
                survey: "styles--10rb4",
                surveyPage: "styles--1po-D styles--10rb4",
                main: "styles--KLzVS",
                intro: "styles--2QQ4c"
            }
        },
        10565: (e, r, t) => {
            t.d(r, {
                A: () => n
            });
            const n = {
                white: "#ffffff",
                grey100: "#fbfbfb",
                grey200: "#f3f5f8",
                grey300: "#e7ecf3",
                grey400: "#d0d8e4",
                grey500: "#919bab",
                grey600: "#6a7381",
                grey700: "#313b46",
                grey800: "#0f161e",
                green50: "#e9fcf4",
                green100: "#ccf4dd",
                green200: "#7edcaf",
                green300: "#06cb8a",
                green400: "#05b279",
                green500: "#00756a",
                green600: "#00665b",
                green700: "#00554b",
                blue50: "#eef8ff",
                blue100: "#c7e2ff",
                blue200: "#75acff",
                blue300: "#5d9aee",
                blue400: "#4385e0",
                blue500: "#226ace",
                blue600: "#1859b5",
                blue700: "#0f4897",
                petrol50: "#e3fbfb",
                petrol100: "#c5f5f5",
                petrol200: "#65e2ea",
                petrol300: "#00bcc9",
                petrol400: "#00a5ae",
                petrol500: "#107191",
                petrol600: "#005e7f",
                petrol700: "#004561",
                purple50: "#fbf4ff",
                purple100: "#edd5ff",
                purple200: "#d8adff",
                purple300: "#b46efe",
                purple400: "#9e4ff0",
                purple500: "#8736dc",
                purple600: "#6509bf",
                purple700: "#430080",
                red50: "#fff1f1",
                red100: "#ffd2cf",
                red200: "#fa8373",
                red300: "#f1674f",
                red400: "#e54d33",
                red500: "#cc2c11",
                red600: "#af0200",
                red700: "#990000",
                orange50: "#fffadf",
                orange100: "#fff0b8",
                orange200: "#ffdb73",
                orange300: "#ffb420",
                orange400: "#ffa740",
                orange500: "#ff8f0d",
                orange600: "#ad4800",
                orange700: "#943e00",
                "color-default": "#00756a",
                colorDefault: "#00756a",
                "color-white": "#ffffff",
                colorWhite: "#ffffff",
                "color-font-primary": "#313b46",
                colorFontPrimary: "#313b46",
                "color-font-secondary": "#6a7381",
                colorFontSecondary: "#6a7381",
                "color-font-primary-light": "#ffffff",
                colorFontPrimaryLight: "#ffffff",
                "color-font-primary-dark": "#313b46",
                colorFontPrimaryDark: "#313b46",
                "color-border-default": "#d0d8e4",
                colorBorderDefault: "#d0d8e4",
                "color-success": "#05b279",
                colorSuccess: "#05b279",
                "color-success-button": "#7edcaf",
                colorSuccessButton: "#7edcaf",
                "color-success-background": "#e9fcf4",
                colorSuccessBackground: "#e9fcf4",
                "color-success-outline": "#ccf4dd",
                colorSuccessOutline: "#ccf4dd",
                "color-danger": "#cc2c11",
                colorDanger: "#cc2c11",
                "color-danger-background": "#fff1f1",
                colorDangerBackground: "#fff1f1",
                "color-danger-outline": "#ffd2cf",
                colorDangerOutline: "#ffd2cf",
                "color-caution": "#ad4800",
                colorCaution: "#ad4800",
                "color-caution-button": "#ffdb73",
                colorCautionButton: "#ffdb73",
                "color-caution-background": "#fffadf",
                colorCautionBackground: "#fffadf",
                "color-caution-outline": "#fff0b8",
                colorCautionOutline: "#fff0b8",
                "color-informational": "#226ace",
                colorInformational: "#226ace",
                "color-informational-background": "#eef8ff",
                colorInformationalBackground: "#eef8ff",
                "color-informational-outline": "#c7e2ff",
                colorInformationalOutline: "#c7e2ff",
                "color-warning": "#ffb420",
                colorWarning: "#ffb420",
                "color-ai": "#8736dc",
                colorAi: "#8736dc",
                "color-ai-background": "#fbf4ff",
                colorAiBackground: "#fbf4ff",
                "color-ai-outline": "#edd5ff",
                colorAiOutline: "#edd5ff",
                "color-beta-primary": "#107191",
                colorBetaPrimary: "#107191",
                "color-beta-secondary": "#c5f5f5",
                colorBetaSecondary: "#c5f5f5",
                "color-neutral": "#6a7381",
                colorNeutral: "#6a7381",
                "color-muted": "#f3f5f8",
                colorMuted: "#f3f5f8",
                "background-color": "#ffffff",
                backgroundColor: "#ffffff",
                "background-color-secondary": "#f3f5f8",
                backgroundColorSecondary: "#f3f5f8",
                "background-color-dark": "#313b46",
                backgroundColorDark: "#313b46",
                "color-outline": "#226ace",
                colorOutline: "#226ace",
                "color-outline-focus": "#6a7381",
                colorOutlineFocus: "#6a7381",
                "color-input-default": "#d0d8e4",
                colorInputDefault: "#d0d8e4",
                "color-input-muted": "#919bab",
                colorInputMuted: "#919bab",
                "color-input-placeholder": "#6a7381",
                colorInputPlaceholder: "#6a7381",
                "color-input-label-optional": "#919bab",
                colorInputLabelOptional: "#919bab",
                "color-input-helper-default": "#6a7381",
                colorInputHelperDefault: "#6a7381",
                "color-dismiss-default": "#919bab",
                colorDismissDefault: "#919bab",
                "heading1-large": "48px",
                heading1Large: "48px",
                "heading1-large-tablet": "36px",
                heading1LargeTablet: "36px",
                "heading1-large-mobile": "32px",
                heading1LargeMobile: "32px",
                heading1: "32px",
                "heading1-mobile": "24px",
                heading1Mobile: "24px",
                heading2: "24px",
                "heading2-tablet-mobile": "20px",
                heading2TabletMobile: "20px",
                heading3: "18px",
                subheading: "16px",
                "text-main-body": "16px",
                textMainBody: "16px",
                "text-body": "14px",
                textBody: "14px",
                "text-secondary": "13px",
                textSecondary: "13px",
                caption1: "14px",
                caption2: "13px",
                caption3: "11px",
                "heading1-tablet": "28px",
                heading1Tablet: "28px",
                inner: "styles--2Vt9E",
                navbar: "styles--k_2aS",
                tab: "styles--1kn9O",
                active: "styles--2VVDz styles--1kn9O",
                runner: "styles--ZGfjq"
            }
        }
    }
]);