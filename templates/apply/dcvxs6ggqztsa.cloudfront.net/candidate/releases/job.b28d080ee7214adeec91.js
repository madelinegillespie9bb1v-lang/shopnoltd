"use strict";
(self.webpackChunk_workable_candidate = self.webpackChunk_workable_candidate || []).push([
    [5684], {
        70666: (e, t, r) => {
            r.r(t), r.d(t, {
                default: () => X
            }), r(18544);
            var n = r(34554),
                o = r(7597),
                i = (r(93832), r(60896), r(29882), r(86342), r(61347), r(56687)),
                a = r(17438),
                u = r(85353),
                c = r(98672),
                l = r(7853);
            const f = n.createContext();
            var s = ["children", "form", "shortcode", "updateForm"],
                p = ["children"];

            function d() {
                return d = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, d.apply(null, arguments)
            }

            function m(e, t) {
                if (null == e) return {};
                var r, n, o = function(e, t) {
                    if (null == e) return {};
                    var r = {};
                    for (var n in e)
                        if ({}.hasOwnProperty.call(e, n)) {
                            if (t.includes(n)) continue;
                            r[n] = e[n]
                        }
                    return r
                }(e, t);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    for (n = 0; n < i.length; n++) r = i[n], t.includes(r) || {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r])
                }
                return o
            }
            var v = function(e) {
                    var t = e.children,
                        r = e.location,
                        o = e.shortcode,
                        a = e.updateForm,
                        c = i.parse((null == r ? void 0 : r.search) || ""),
                        l = c.utm_campaign,
                        s = c.utm_medium;
                    return (0, n.useEffect)((function() {
                        s && l && o && a && "bridge" === s && u.A.cv(o).autofill({
                            params: {
                                pId: l
                            }
                        }).then(a).catch((function() {}))
                    }), [o, s, l, a]), n.createElement(f.Provider, null, t instanceof Function ? t() : t)
                },
                y = function(e) {
                    var t = e.children,
                        r = e.form,
                        o = e.shortcode,
                        i = e.updateForm,
                        a = m(e, s);
                    return r ? n.createElement(v, d({
                        form: r,
                        shortcode: o,
                        updateForm: i
                    }, a), t) : t instanceof Function ? t() : t || null
                };
            const b = (0, a.A)((function(e) {
                var t = e.children,
                    r = m(e, p);
                return n.createElement(c.A.Consumer, null, (function(e) {
                    return n.createElement(l.A.Consumer, null, (function(o) {
                        var i = o.form,
                            a = o.updateForm;
                        return n.createElement(y, d({
                            form: i,
                            shortcode: e,
                            updateForm: a
                        }, r), t)
                    }))
                }))
            }));
            r(81984), r(56030), r(1233), r(52979), r(85927), r(83283), r(94773), r(33951), r(1496), r(94119), r(38314), r(52209), r(48996), r(55152), r(58981), r(74697), r(28028);
            var h = r(22487),
                O = r.n(h),
                w = r(95714),
                g = r(34719);

            function j(e) {
                return j = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, j(e)
            }

            function A() {
                return A = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, A.apply(null, arguments)
            }

            function E(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, x(n.key), n)
                }
            }

            function S(e, t, r) {
                return t = k(t),
                    function(e, t) {
                        if (t && ("object" == j(t) || "function" == typeof t)) return t;
                        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                        return function(e) {
                            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return e
                        }(e)
                    }(e, P() ? Reflect.construct(t, r || [], k(e).constructor) : t.apply(e, r))
            }

            function P() {
                try {
                    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (e) {}
                return (P = function() {
                    return !!e
                })()
            }

            function k(e) {
                return k = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                }, k(e)
            }

            function F(e, t) {
                return F = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                    return e.__proto__ = t, e
                }, F(e, t)
            }

            function _(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function C(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? _(Object(r), !0).forEach((function(t) {
                        I(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : _(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }

            function I(e, t, r) {
                return (t = x(t)) in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }

            function x(e) {
                var t = function(e, t) {
                    if ("object" != j(e) || !e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var n = r.call(e, "string");
                        if ("object" != j(n)) return n;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(e)
                }(e);
                return "symbol" == j(t) ? t : t + ""
            }
            var D = function(e) {
                function t(e) {
                    var r;
                    return function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), (r = S(this, t, [e])).state = {
                        appliedWithLinkedin: !1,
                        error: e.error,
                        form: e.form
                    }, r.fetchForm = r.fetchForm.bind(r), r.updateForm = r.updateForm.bind(r), r.setAppliedWithLinkedin = r.setAppliedWithLinkedin.bind(r), r
                }
                return function(e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    }), Object.defineProperty(e, "prototype", {
                        writable: !1
                    }), t && F(e, t)
                }(t, e), r = t, o = [{
                    key: "componentDidMount",
                    value: function() {
                        this.fetchForm()
                    }
                }, {
                    key: "componentDidUpdate",
                    value: function(e) {
                        this.props.shortcode !== e.shortcode && this.fetchForm()
                    }
                }, {
                    key: "fetchForm",
                    value: function() {
                        var e = this,
                            t = this.props.shortcode;
                        t && this.setState({
                            error: void 0,
                            form: void 0
                        }, (function() {
                            return w.A.form(t).then(e.updateForm).catch((function(t) {
                                return e.setState({
                                    error: t,
                                    form: void 0
                                })
                            }))
                        }))
                    }
                }, {
                    key: "updateForm",
                    value: function(e) {
                        var t = e && e.map((function(t, r) {
                            return C(C({}, t), {}, {
                                fields: (n = t.fields, o = e.geoipcountry, n && n.map((function(e) {
                                    if (e) switch (e.type) {
                                        case "phone":
                                            return C(C({}, e), {}, {
                                                countryCode: o
                                            });
                                        case "group":
                                            return C(C({}, e), {}, {
                                                value: e.value && e.value.map((function(e) {
                                                    return C(C({}, e), {}, {
                                                        id: O()("section-")
                                                    })
                                                }))
                                            });
                                        default:
                                            return e
                                    }
                                }))),
                                id: "section-".concat(r)
                            });
                            var n, o
                        }));
                        this.setState({
                            error: void 0,
                            form: t
                        })
                    }
                }, {
                    key: "setAppliedWithLinkedin",
                    value: function(e) {
                        this.setState({
                            appliedWithLinkedin: e
                        })
                    }
                }, {
                    key: "render",
                    value: function() {
                        var e = this.state,
                            t = e.appliedWithLinkedin,
                            r = e.error,
                            o = e.form;
                        if (r) throw r;
                        return n.createElement(g.A.Provider, {
                            value: {
                                appliedWithLinkedin: t,
                                form: o,
                                setAppliedWithLinkedin: this.setAppliedWithLinkedin,
                                updateForm: this.updateForm
                            }
                        }, this.props.children instanceof Function ? this.props.children({
                            form: o
                        }) : this.props.children || null)
                    }
                }], o && E(r.prototype, o), Object.defineProperty(r, "prototype", {
                    writable: !1
                }), r;
                var r, o
            }(n.Component);
            const L = function(e) {
                    return n.createElement(c.A.Consumer, null, (function(t) {
                        return n.createElement(D, A({
                            shortcode: t
                        }, e))
                    }))
                },
                W = function(e) {
                    var t = e.children;
                    return n.createElement(L, null, n.createElement(b, null, t))
                };
            var T = r(71139),
                N = r(86295),
                R = r(23391),
                B = r(32260),
                M = (r(8153), r(46187), r(47442)),
                U = r(77428),
                $ = r(10565),
                q = ["children", "location", "root"];
            const z = function(e) {
                var t = e.children,
                    r = e.location,
                    o = void 0 === r ? window.location.pathname : r,
                    i = e.root,
                    a = void 0 === i ? "" : i,
                    u = function(e, t) {
                        if (null == e) return {};
                        var r, n, o = function(e, t) {
                            if (null == e) return {};
                            var r = {};
                            for (var n in e)
                                if ({}.hasOwnProperty.call(e, n)) {
                                    if (t.includes(n)) continue;
                                    r[n] = e[n]
                                }
                            return r
                        }(e, t);
                        if (Object.getOwnPropertySymbols) {
                            var i = Object.getOwnPropertySymbols(e);
                            for (n = 0; n < i.length; n++) r = i[n], t.includes(r) || {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r])
                        }
                        return o
                    }(e, q);
                if (!n.Children.count(t)) return null;
                var c = {};
                return n.Children.forEach(t, (function(e) {
                    return c[("/" + a + e.props.path).split("//").join("/")] = e
                })), n.createElement("div", u, n.createElement("div", {
                    className: $.A.inner
                }, n.createElement("nav", {
                    className: $.A.navbar,
                    role: "navigation"
                }, n.createElement(U.A, null), Object.keys(c).map((function(e) {
                    return n.createElement(M.A, {
                        activeClassName: $.A.active,
                        className: $.A.tab,
                        "data-ui": c[e].props["data-ui"],
                        exact: !0,
                        key: e,
                        replace: !0,
                        to: e
                    }, c[e].props.name || e)
                })))), c[o])
            };
            var G = r(65482),
                H = r(72263),
                J = r(36821);

            function K() {
                return K = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, K.apply(null, arguments)
            }
            var Q = function(e) {
                    var t = e.shortcode;
                    return t ? n.createElement(n.Fragment, null, n.createElement(H.A, null), n.createElement(z, {
                        root: B.Ay.job(t)
                    }, n.createElement(J.A, {
                        "data-ui": "role-overview-tab",
                        name: o.Ay.t("job.overview"),
                        path: "/"
                    }), n.createElement(G.A, {
                        "data-ui": "application-form-tab",
                        name: o.Ay.t("job.applicationForm"),
                        path: "/apply/"
                    }))) : n.createElement(R.A, null)
                },
                V = function(e) {
                    return n.createElement(T.A.Consumer, null, (function(t) {
                        return n.createElement(W, null, n.createElement(c.A.Consumer, null, (function(r) {
                            return n.createElement(Q, K({
                                key: t,
                                shortcode: r
                            }, e))
                        })))
                    }))
                };
            const X = function(e) {
                return n.createElement(N.A, null, n.createElement(V, e))
            }
        },
        90123: (e, t, r) => {
            r.d(t, {
                A: () => v,
                R: () => m
            }), r(93832), r(81984), r(56030), r(37629), r(52979), r(89001), r(60896), r(85927), r(83283), r(48991), r(46187), r(18544), r(48996), r(29882), r(97358), r(86342), r(58981), r(28028);
            var n = r(34554),
                o = r(16520),
                i = r(95714),
                a = r(23391),
                u = r(68262),
                c = ["_error", "id", "onSubmit"];

            function l() {
                return l = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, l.apply(null, arguments)
            }

            function f(e) {
                return function(e) {
                    if (Array.isArray(e)) return d(e)
                }(e) || function(e) {
                    if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
                }(e) || p(e) || function() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function s(e, t) {
                return function(e) {
                    if (Array.isArray(e)) return e
                }(e) || function(e, t) {
                    var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                    if (null != r) {
                        var n, o, i, a, u = [],
                            c = !0,
                            l = !1;
                        try {
                            if (i = (r = r.call(e)).next, 0 === t) {
                                if (Object(r) !== r) return;
                                c = !1
                            } else
                                for (; !(c = (n = i.call(r)).done) && (u.push(n.value), u.length !== t); c = !0);
                        } catch (e) {
                            l = !0, o = e
                        } finally {
                            try {
                                if (!c && null != r.return && (a = r.return(), Object(a) !== a)) return
                            } finally {
                                if (l) throw o
                            }
                        }
                        return u
                    }
                }(e, t) || p(e, t) || function() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function p(e, t) {
                if (e) {
                    if ("string" == typeof e) return d(e, t);
                    var r = {}.toString.call(e).slice(8, -1);
                    return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? d(e, t) : void 0
                }
            }

            function d(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }
            o.isIE && r(3055);
            var m = function(e, t) {
                return "".concat(e, "-extra-").concat(t.toString())
            };
            const v = function(e) {
                var t = e._error,
                    r = void 0 === t ? null : t,
                    o = e.id,
                    d = e.onSubmit,
                    v = function(e, t) {
                        if (null == e) return {};
                        var r, n, o = function(e, t) {
                            if (null == e) return {};
                            var r = {};
                            for (var n in e)
                                if ({}.hasOwnProperty.call(e, n)) {
                                    if (t.includes(n)) continue;
                                    r[n] = e[n]
                                }
                            return r
                        }(e, t);
                        if (Object.getOwnPropertySymbols) {
                            var i = Object.getOwnPropertySymbols(e);
                            for (n = 0; n < i.length; n++) r = i[n], t.includes(r) || {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r])
                        }
                        return o
                    }(e, c),
                    y = s((0, n.useState)(null), 2),
                    b = y[0],
                    h = y[1],
                    O = s((0, n.useState)(r), 2),
                    w = O[0],
                    g = O[1];
                (0, n.useEffect)((function() {
                    i.A.survey.view(o).then(h).catch(g)
                }), [o]);
                var j = (0, n.useCallback)((function(e) {
                    if (e.preventDefault(), d) {
                        var t, r = [],
                            n = new FormData(e.target),
                            o = function(e, t) {
                                var r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                                if (!r) {
                                    if (Array.isArray(e) || (r = p(e))) {
                                        r && (e = r);
                                        var n = 0,
                                            o = function() {};
                                        return {
                                            s: o,
                                            n: function() {
                                                return n >= e.length ? {
                                                    done: !0
                                                } : {
                                                    done: !1,
                                                    value: e[n++]
                                                }
                                            },
                                            e: function(e) {
                                                throw e
                                            },
                                            f: o
                                        }
                                    }
                                    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                                }
                                var i, a = !0,
                                    u = !1;
                                return {
                                    s: function() {
                                        r = r.call(e)
                                    },
                                    n: function() {
                                        var e = r.next();
                                        return a = e.done, e
                                    },
                                    e: function(e) {
                                        u = !0, i = e
                                    },
                                    f: function() {
                                        try {
                                            a || null == r.return || r.return()
                                        } finally {
                                            if (u) throw i
                                        }
                                    }
                                }
                            }(n.keys());
                        try {
                            var i = function() {
                                var e, o = t.value,
                                    i = s(o.split("-"), 3),
                                    a = i[0],
                                    u = i[1];
                                if (i[2]) return 1;
                                if ("multiple" === u) {
                                    var c = (e = n.getAll(o)).map((function(e) {
                                        var t = m(o, e);
                                        return {
                                            choice_id: e,
                                            free_text: n.get(t)
                                        }
                                    })).filter((function(e) {
                                        return null !== e.free_text
                                    }));
                                    r = c.length > 0 ? [].concat(f(r), [{
                                        extra: c,
                                        id: a,
                                        value: e
                                    }]) : [].concat(f(r), [{
                                        id: a,
                                        value: e
                                    }])
                                } else e = n.get(o), r = [].concat(f(r), [{
                                    id: a,
                                    value: e
                                }])
                            };
                            for (o.s(); !(t = o.n()).done;) i()
                        } catch (e) {
                            o.e(e)
                        } finally {
                            o.f()
                        }
                        d(r)
                    }
                }), [d]);
                if (w) throw w;
                return o ? b ? n.createElement(u.A, l({
                    onSubmit: j,
                    survey: b
                }, v)) : n.createElement(a.A, null) : null
            }
        },
        68262: (e, t, r) => {
            r.d(t, {
                A: () => n.A
            });
            var n = r(77932)
        }
    }
]);