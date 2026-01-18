"use strict";
(self.webpackChunk_workable_candidate = self.webpackChunk_workable_candidate || []).push([
    [6821], {
        36821: (e, t, n) => {
            n.d(t, {
                A: () => ue
            }), n(93832), n(81984);
            var a = n(34554),
                r = n(28074),
                i = n(17896),
                l = n(4343),
                s = n(80440),
                o = n(7597),
                c = n(98672),
                u = n(32260);
            const d = {
                "tablet-width": "767px",
                tabletWidth: "767px",
                "mobile-width": "420px",
                mobileWidth: "420px",
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
                section: "styles--3vx-H",
                preview: "styles--2d3Fz",
                shimmerApply: "styles--1bmT3 shimmer--2pnJ5",
                "shimmer-text-small": "styles--2cZ29 shimmer--2pnJ5",
                shimmerTextSmall: "styles--2cZ29 shimmer--2pnJ5",
                "shimmer-text-medium": "styles--1xj1x styles--2cZ29 shimmer--2pnJ5",
                shimmerTextMedium: "styles--1xj1x styles--2cZ29 shimmer--2pnJ5",
                "shimmer-text-large": "styles--WOrhG styles--2cZ29 shimmer--2pnJ5",
                shimmerTextLarge: "styles--WOrhG styles--2cZ29 shimmer--2pnJ5",
                buttons: "styles--2z_5t",
                applyButton: "styles--35QFH",
                applyIndeed: "styles--1E_FM"
            };
            var m = function() {
                return a.createElement("div", {
                    className: d.shimmerApply
                })
            };
            const p = function() {
                var e = a.useContext(c.A);
                return e ? a.createElement(s.A.Primary, {
                    as: l.A,
                    className: d.apply,
                    "data-ui": "apply-button",
                    responsive: !0,
                    to: u.Ay.apply(e)
                }, o.Ay.t("job.apply")) : a.createElement(m, null)
            };
            n(56030), n(37629), n(89001), n(60896), n(85927), n(8153), n(48991), n(46187), n(18544), n(48996), n(29882), n(97358), n(86342), n(58981), n(28028);
            var h = n(19548),
                b = n.n(h),
                y = n(81396),
                f = n.n(y),
                v = n(92493),
                g = n(71452),
                x = n(27365);

            function E() {
                return E = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var a in n)({}).hasOwnProperty.call(n, a) && (e[a] = n[a])
                    }
                    return e
                }, E.apply(null, arguments)
            }

            function j(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var n = 0, a = Array(t); n < t; n++) a[n] = e[n];
                return a
            }
            var w = function(e) {
                var t = e.token,
                    n = ((0, a.useContext)(i.A) || {}).job,
                    r = (0, a.useContext)(c.A),
                    l = ((0, a.useContext)(x.A) || {}).accountDetails,
                    s = document.referrer && document.referrer.includes("indeed.");
                if ((0, a.useEffect)((function() {
                        if (l) {
                            var e = l.details;
                            (void 0 === e ? {} : e).applyWithIndeed && s && function() {
                                if (!document.getElementById("indeed-apply-js")) {
                                    var e = document.createElement("script");
                                    e.id = "indeed-apply-js", e.async = !0, e.src = "https://apply.indeed.com/indeedapply/static/scripts/app/bootstrap.js", window.onIndeedButtonClick = function() {
                                        return v.Ay.then((function(e) {
                                            return e.event(v.sV.Categories.Job, v.sV.Actions.IndeedButton, "indeed").send()
                                        }))
                                    };
                                    var t = document.getElementById("app");
                                    t && t.appendChild && t.appendChild(e)
                                }
                            }()
                        }
                    }), [JSON.stringify(l)]), !n || !l) return null;
                var o = n.location,
                    u = void 0 === o ? {} : o,
                    d = u.city,
                    m = u.country,
                    p = u.region,
                    h = n.shortcode,
                    y = n.title,
                    f = l.details,
                    g = (void 0 === f ? {} : f).applyWithIndeed,
                    E = l.name;
                if (!g || !s) return null;
                var w, A, k = (w = window.location.hostname.split("."), A = 3, function(e) {
                        if (Array.isArray(e)) return e
                    }(w) || function(e, t) {
                        var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                        if (null != n) {
                            var a, r, i, l, s = [],
                                o = !0,
                                c = !1;
                            try {
                                if (i = (n = n.call(e)).next, 0 === t) {
                                    if (Object(n) !== n) return;
                                    o = !1
                                } else
                                    for (; !(o = (a = i.call(n)).done) && (s.push(a.value), s.length !== t); o = !0);
                            } catch (e) {
                                c = !0, r = e
                            } finally {
                                try {
                                    if (!o && null != n.return && (l = n.return(), Object(l) !== l)) return
                                } finally {
                                    if (c) throw r
                                }
                            }
                            return s
                        }
                    }(w, A) || function(e, t) {
                        if (e) {
                            if ("string" == typeof e) return j(e, t);
                            var n = {}.toString.call(e).slice(8, -1);
                            return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? j(e, t) : void 0
                        }
                    }(w, A) || function() {
                        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }()),
                    N = (k[0], k[1]),
                    C = k[2];
                if (!N || !C) return null;
                var O = "https://apply.".concat(N, ".").concat(C),
                    T = "".concat(O, "/api/v1/jobboards/indeed/jobs/").concat(r),
                    P = "".concat(O, "/j/").concat(r),
                    S = "".concat(T, "/apply"),
                    _ = "".concat(T, "/questions");
                return a.createElement("span", {
                    className: "indeed-apply-widget",
                    "data-indeed-apply-apitoken": t,
                    "data-indeed-apply-jobcompanyname": E,
                    "data-indeed-apply-jobid": h,
                    "data-indeed-apply-joblocation": b()([d, p, m]).join(", "),
                    "data-indeed-apply-jobmeta": "right-rail-apply-button",
                    "data-indeed-apply-jobtitle": y,
                    "data-indeed-apply-joburl": P,
                    "data-indeed-apply-onclick": "onIndeedButtonClick",
                    "data-indeed-apply-posturl": S,
                    "data-indeed-apply-questions": _
                })
            };
            const A = f()({
                loader: function() {
                    return g.default.then((function(e) {
                        var t = e.indeedToken;
                        return function(e) {
                            return t ? a.createElement(w, E({}, e, {
                                token: t
                            })) : null
                        }
                    }))
                },
                loading: function() {
                    return null
                }
            });
            var k = n(70851),
                N = n(77595),
                C = n.n(N),
                O = n(65846);
            const T = function(e) {
                return a.createElement("div", e, a.createElement("h4", {
                    className: d.shimmerTextSmall
                }), a.createElement("p", {
                    className: d.shimmerTextLarge
                }), a.createElement("p", {
                    className: d.shimmerTextMedium
                }), a.createElement("p", {
                    className: d.shimmerTextLarge
                }), a.createElement("p", {
                    className: d.shimmerTextMedium
                }), a.createElement("p", {
                    className: d.shimmerTextLarge
                }), a.createElement("p", {
                    className: d.shimmerTextMedium
                }), a.createElement("p", {
                    className: d.shimmerTextLarge
                }))
            };
            var P = ["children", "className", "dataUi", "title"];

            function S() {
                return S = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var a in n)({}).hasOwnProperty.call(n, a) && (e[a] = n[a])
                    }
                    return e
                }, S.apply(null, arguments)
            }
            var _ = function(e) {
                var t = e.children,
                    n = e.className,
                    r = e.dataUi,
                    i = e.title,
                    l = function(e, t) {
                        if (null == e) return {};
                        var n, a, r = function(e, t) {
                            if (null == e) return {};
                            var n = {};
                            for (var a in e)
                                if ({}.hasOwnProperty.call(e, a)) {
                                    if (t.includes(a)) continue;
                                    n[a] = e[a]
                                }
                            return n
                        }(e, t);
                        if (Object.getOwnPropertySymbols) {
                            var i = Object.getOwnPropertySymbols(e);
                            for (a = 0; a < i.length; a++) n = i[a], t.includes(n) || {}.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
                        }
                        return r
                    }(e, P);
                if (null == t) return a.createElement(T, {
                    className: d.section
                });
                var s = "".concat(r, "-title");
                return "" === t ? null : a.createElement("section", S({
                    "aria-labelledby": s,
                    className: (0, k.A)(d.section, n),
                    "data-ui": r
                }, l), a.createElement("h2", {
                    id: s
                }, i), a.createElement(O.A, null, t))
            };
            _.propTypes = {
                children: C().node,
                className: C().string,
                dataUi: C().string.isRequired,
                title: C().string
            };
            const I = _,
                B = function(e) {
                    var t = e.benefits,
                        n = e.description,
                        r = e.requirements;
                    return a.createElement(a.Fragment, null, a.createElement(I, {
                        dataUi: "job-description",
                        title: o.Ay.t("job.description")
                    }, n), a.createElement(I, {
                        dataUi: "job-requirements",
                        title: o.Ay.t("job.requirements")
                    }, r), a.createElement(I, {
                        dataUi: "job-benefits",
                        title: o.Ay.t("job.benefits")
                    }, t))
                };
            var L = n(16520),
                U = n(15634),
                M = n(99860),
                q = n(63631),
                J = n(77104),
                z = n(43066),
                F = n(50077),
                W = n(92348),
                Z = n(86058),
                R = n(31826);
            const D = "styles--3Kowv",
                V = "styles--2U3aa";
            var H = function() {
                    return a.createElement(R.A, {
                        fill: !0,
                        size: 12,
                        svg: F.A,
                        transparent: !0
                    })
                },
                G = function() {
                    return a.createElement(R.A, {
                        className: D,
                        size: 16,
                        svg: J.A
                    })
                },
                K = function() {
                    return a.createElement(R.A, {
                        className: D,
                        size: 16,
                        svg: W.A
                    })
                },
                Q = function() {
                    return a.createElement(R.A, {
                        className: D,
                        size: 16,
                        svg: z.A
                    })
                };
            (0, Z.j)(H), (0, Z.j)(G), (0, Z.j)(K), (0, Z.j)(Q);
            var X = H,
                $ = G,
                Y = K,
                ee = Q,
                te = ["_Share", "job", "root"];

            function ne() {
                return ne = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var a in n)({}).hasOwnProperty.call(n, a) && (e[a] = n[a])
                    }
                    return e
                }, ne.apply(null, arguments)
            }
            var ae = M.A,
                re = function(e) {
                    return v.Ay.then((function(t) {
                        return t.event(v.sV.Categories.Job, v.sV.Actions.SocialShare, e).send()
                    }))
                },
                ie = "noreferrer=true",
                le = function(e) {
                    var t = e._window,
                        n = void 0 === t ? window : t,
                        r = e.url,
                        i = (0, a.useCallback)((function() {
                            n.open(U.A.withBaseURL("https://www.facebook.com").withPath("share.php").withParameters({
                                u: r
                            }).build(), "_blank", ie), re("facebook")
                        }), [n, r]),
                        l = (0, a.useCallback)((function() {
                            n.open(U.A.withBaseURL("https://twitter.com").withPath("intent/tweet").withParameters({
                                url: r
                            }).build(), "_blank", ie), re("twitter")
                        }), [n, r]),
                        s = (0, a.useCallback)((function() {
                            n.open(U.A.withBaseURL("https://www.linkedin.com").withPath("shareArticle").withParameters({
                                mini: !0,
                                url: r
                            }).build(), "_blank", ie), re("linkedin")
                        }), [n, r]);
                    return a.createElement(q.Ay, {
                        as: M.A,
                        className: "styles--eqtxl",
                        "data-ui": "share-job-button",
                        disabled: !r,
                        right: !0
                    }, o.Ay.t("job.share"), " ", a.createElement(X, null), a.createElement(ae, {
                        onClick: i
                    }, a.createElement("span", {
                        className: V,
                        "data-ui": "share-job-facebook"
                    }, a.createElement($, null), "Facebook")), a.createElement(ae, {
                        onClick: l
                    }, a.createElement("span", {
                        className: V,
                        "data-ui": "share-job-twitter"
                    }, a.createElement(Y, null), "X (Twitter)")), a.createElement(ae, {
                        onClick: s
                    }, a.createElement("span", {
                        className: V,
                        "data-ui": "share-job-linkedin"
                    }, a.createElement(ee, null), "LinkedIn")))
                };
            le.propTypes = {
                _window: C().object,
                url: C().string
            };
            var se = function(e) {
                var t = e.url,
                    n = (0, a.useCallback)((function() {
                        return t && navigator.share({
                            url: t
                        }).then((function() {
                            return re("native")
                        }))
                    }), [t]);
                return a.createElement(M.A, {
                    className: "styles--2HTwh styles--eqtxl",
                    "data-ui": "share-job-button",
                    disabled: !t,
                    onClick: n
                }, o.Ay.t("job.share"), " ", a.createElement(X, null))
            };
            se.propTypes = {
                url: C().string
            };
            var oe = function(e) {
                var t = e._Share,
                    n = void 0 === t ? navigator.share && L.isMobile ? se : le : t,
                    r = e.job,
                    l = e.root,
                    s = void 0 === l ? location.origin : l,
                    o = function(e, t) {
                        if (null == e) return {};
                        var n, a, r = function(e, t) {
                            if (null == e) return {};
                            var n = {};
                            for (var a in e)
                                if ({}.hasOwnProperty.call(e, a)) {
                                    if (t.includes(a)) continue;
                                    n[a] = e[a]
                                }
                            return n
                        }(e, t);
                        if (Object.getOwnPropertySymbols) {
                            var i = Object.getOwnPropertySymbols(e);
                            for (a = 0; a < i.length; a++) n = i[a], t.includes(n) || {}.propertyIsEnumerable.call(e, n) && (r[n] = e[n])
                        }
                        return r
                    }(e, te),
                    c = ((0, a.useContext)(i.A) || r).job,
                    d = void 0 === c ? {} : c,
                    m = d.isInternal,
                    p = d.shortcode,
                    h = ((0, a.useContext)(x.A) || {}).accountDetails,
                    b = (void 0 === h ? {} : h).hasCustomDomain;
                if (m) return null;
                var y = p && s && U.A.withBaseURL(s).withPath(u.Ay.j(p, {
                    hasCustomDomain: b
                })).withParameters({
                    utm_medium: "social_share_link"
                }).build();
                return a.createElement(n, ne({
                    url: y
                }, o))
            };
            oe.propTypes = {
                _Share: C().elementType,
                job: C().object,
                root: C().string
            };
            const ce = oe,
                ue = function(e) {
                    var t = e.job,
                        n = ((0, a.useContext)(i.A) || t).job,
                        l = void 0 === n ? {} : n,
                        s = l.benefits,
                        o = l.description,
                        c = l.requirements;
                    return a.createElement(a.Fragment, null, a.createElement(r.A, null), a.createElement("main", {
                        className: d.preview,
                        role: "main"
                    }, a.createElement(ce, null), a.createElement(B, {
                        benefits: s,
                        description: o,
                        requirements: c
                    }), a.createElement("div", {
                        className: d.buttons
                    }, a.createElement("div", {
                        className: d.applyButton
                    }, a.createElement(p, null)), a.createElement("div", {
                        className: d.applyIndeed
                    }, a.createElement(A, null)))))
                }
        }
    }
]);