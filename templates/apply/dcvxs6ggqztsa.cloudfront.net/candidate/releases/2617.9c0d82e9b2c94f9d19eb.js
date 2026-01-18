"use strict";
(self.webpackChunk_workable_candidate = self.webpackChunk_workable_candidate || []).push([
    [2617], {
        65846: (e, t, r) => {
            r.d(t, {
                A: () => f
            }), r(93832), r(81984), r(56030), r(1233), r(52979), r(60896), r(85927), r(94773), r(33951), r(1496), r(94119), r(52209), r(48996), r(86342), r(58981), r(74697), r(28028), r(46187);
            var n = r(34554),
                a = r(32833),
                i = r(99860);

            function o(e) {
                return o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, o(e)
            }
            var l = ["children", "onLoad"];

            function u(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function c(e, t, r) {
                return (t = function(e) {
                    var t = function(e, t) {
                        if ("object" != o(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, "string");
                            if ("object" != o(n)) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == o(t) ? t : t + ""
                }(t)) in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }
            var s = function(e) {
                return e
            };
            const f = function(e) {
                var t = e.children,
                    r = e.onLoad,
                    o = void 0 === r ? s : r,
                    f = function(e, t) {
                        if (null == e) return {};
                        var r, n, a = function(e, t) {
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
                            for (n = 0; n < i.length; n++) r = i[n], t.includes(r) || {}.propertyIsEnumerable.call(e, r) && (a[r] = e[r])
                        }
                        return a
                    }(e, l);
                if (!t) return null;
                var y = function(e) {
                    var t = {
                        replace: function(r) {
                            var o = r.attribs,
                                l = r.children,
                                s = r.name,
                                f = r.type;
                            if ("tag" === f && "a" === s) {
                                o.target = "_blank";
                                var y = (0, a.$5)(o);
                                return n.createElement(i.A, y, (0, a.zd)(l, t))
                            }
                            if ("tag" === f && "img" === s) {
                                o.alt = o.alt || "";
                                var m = (0, a.$5)(o);
                                return n.createElement("img", function(e) {
                                    for (var t = 1; t < arguments.length; t++) {
                                        var r = null != arguments[t] ? arguments[t] : {};
                                        t % 2 ? u(Object(r), !0).forEach((function(t) {
                                            c(e, t, r[t])
                                        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : u(Object(r)).forEach((function(t) {
                                            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                                        }))
                                    }
                                    return e
                                }({
                                    onLoad: e
                                }, m))
                            }
                        }
                    };
                    return t
                }(o);
                return n.createElement("div", f, (0, a.Ay)(t, y))
            }
        },
        77932: (e, t, r) => {
            r.d(t, {
                A: () => E
            }), r(93832), r(81984);
            var n = r(34554),
                a = r(19266),
                i = r(65846),
                o = (r(83283), r(46187), r(18544), r(80440)),
                l = r(7597),
                u = (r(60896), r(86342), r(37629), r(56030), r(89001), r(85927), r(48991), r(48996), r(29882), r(97358), r(58981), r(28028), r(41130)),
                c = r(37190),
                s = r(37407),
                f = r(90123);

            function y(e, t) {
                return function(e) {
                    if (Array.isArray(e)) return e
                }(e) || function(e, t) {
                    var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                    if (null != r) {
                        var n, a, i, o, l = [],
                            u = !0,
                            c = !1;
                        try {
                            if (i = (r = r.call(e)).next, 0 === t) {
                                if (Object(r) !== r) return;
                                u = !1
                            } else
                                for (; !(u = (n = i.call(r)).done) && (l.push(n.value), l.length !== t); u = !0);
                        } catch (e) {
                            c = !0, a = e
                        } finally {
                            try {
                                if (!u && null != r.return && (o = r.return(), Object(o) !== o)) return
                            } finally {
                                if (c) throw a
                            }
                        }
                        return l
                    }
                }(e, t) || function(e, t) {
                    if (e) {
                        if ("string" == typeof e) return m(e, t);
                        var r = {}.toString.call(e).slice(8, -1);
                        return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? m(e, t) : void 0
                    }
                }(e, t) || function() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function m(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }
            const v = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = e.description,
                    r = e.label,
                    a = e.name,
                    i = e.options,
                    o = y((0, n.useState)(!1), 2),
                    l = o[0],
                    m = o[1],
                    v = y((0, n.useState)(""), 2),
                    p = v[0],
                    b = v[1],
                    d = (0, n.useCallback)((function(e, t) {
                        var r = t.current;
                        m(r)
                    }), []),
                    h = (0, n.useCallback)((function(e) {
                        b(e.target.value)
                    }), []),
                    g = (0, n.useCallback)((function(e) {
                        e.stopPropagation()
                    }));
                return i && r && a ? n.createElement("fieldset", null, n.createElement("legend", {
                    className: "styles--3MwEH"
                }, r, t && n.createElement("span", null, t)), n.createElement(s.A, {
                    className: "styles--QmfxN",
                    name: a,
                    onChange: d,
                    stacked: !0
                }, i && i.map((function(e, t) {
                    var r;
                    return e && e.value && n.createElement(c.A, {
                        className: "".concat("styles--AHvMk", " ").concat(null !== (r = e.supportsFreeText && l === e.value.toString() && "styles--GtTs9") && void 0 !== r ? r : ""),
                        "data-ui": "option",
                        helper: e.description,
                        key: t,
                        labelWrap: !1,
                        value: e.value.toString()
                    }, n.createElement("h6", null, e.name), e.supportsFreeText && l === e.value.toString() && n.createElement(u.A, {
                        className: "styles--14ing",
                        maxLength: 256,
                        name: (0, f.R)(a, e.value),
                        onChange: h,
                        onKeyDown: g,
                        resizeAuto: !1,
                        resizeX: !1,
                        resizeY: !1,
                        rows: 1,
                        value: p
                    }))
                })))) : null
            };
            var p = ["multiple", "paragraph", "dropdown", "number"],
                b = function() {
                    return null
                };
            var d = ["id", "singleOption", "type"];

            function h() {
                return h = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, h.apply(null, arguments)
            }
            const g = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = e.id,
                    r = e.singleOption,
                    a = e.type,
                    i = function(e, t) {
                        if (null == e) return {};
                        var r, n, a = function(e, t) {
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
                            for (n = 0; n < i.length; n++) r = i[n], t.includes(r) || {}.propertyIsEnumerable.call(e, r) && (a[r] = e[r])
                        }
                        return a
                    }(e, d),
                    o = (0, n.useMemo)((function() {
                        return function(e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                            if (!p.includes(e)) throw Error("Unsupported question type");
                            return "multiple" === e && t ? v : b
                        }(a, r)
                    }), [a, r]),
                    l = "".concat(t, "-").concat(a);
                return n.createElement("div", {
                    className: "styles--2JC1l",
                    "data-ui": "question"
                }, n.createElement(o, h({}, i, {
                    name: l
                })))
            };

            function O() {
                return O = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, O.apply(null, arguments)
            }
            var w = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = e.fields,
                    r = e.name;
                return n.createElement(n.Fragment, null, n.createElement("h4", {
                    className: "styles--3mItx",
                    "data-ui": "section-title"
                }, r || l.Ay.t("survey.questions")), t && t.map((function(e) {
                    return n.createElement(g, O({
                        key: e.id
                    }, e))
                })))
            };
            const S = function(e) {
                    var t = e.onSkip,
                        r = e.onSubmit,
                        a = e.sections,
                        i = e.submitting;
                    return a ? n.createElement("main", {
                        role: "main"
                    }, n.createElement("form", {
                        "data-ui": "survey-form",
                        onSubmit: r
                    }, a.map((function(e, t) {
                        return n.createElement(w, O({
                            key: t
                        }, e))
                    })), n.createElement("div", {
                        className: "styles--1yi3f"
                    }, n.createElement(o.A.Primary, {
                        "data-ui": "submit-button",
                        disabled: i,
                        type: "submit"
                    }, l.Ay.t("survey.submit")), t && n.createElement(o.A.Secondary, {
                        className: "styles--T-XPC",
                        "data-ui": "skip-survey",
                        onClick: t
                    }, l.Ay.t("survey.skip"))))) : null
                },
                E = function(e) {
                    var t = e.onSkip,
                        r = e.onSubmit,
                        o = e.submitting,
                        l = e.survey;
                    if (!l) return null;
                    var u = l.description,
                        c = l.sections;
                    return n.createElement("div", {
                        className: "styles--1fB-H"
                    }, n.createElement(a.Ay, {
                        elevation: "1"
                    }, u && n.createElement(i.A, {
                        className: "styles--11Vnt",
                        "data-ui": "survey-description"
                    }, u), c ? n.createElement(S, {
                        onSkip: t,
                        onSubmit: r,
                        sections: c,
                        submitting: o
                    }) : null))
                }
        },
        65003: (e, t, r) => {
            r.d(t, {
                A: () => u
            }), r(93832), r(81984), r(56030), r(89001), r(85927), r(48991), r(46187), r(48996), r(29882), r(97358), r(58981), r(28028);
            var n = r(38728),
                a = r(34554);

            function i(e, t) {
                return function(e) {
                    if (Array.isArray(e)) return e
                }(e) || function(e, t) {
                    var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                    if (null != r) {
                        var n, a, i, o, l = [],
                            u = !0,
                            c = !1;
                        try {
                            if (i = (r = r.call(e)).next, 0 === t) {
                                if (Object(r) !== r) return;
                                u = !1
                            } else
                                for (; !(u = (n = i.call(r)).done) && (l.push(n.value), l.length !== t); u = !0);
                        } catch (e) {
                            c = !0, a = e
                        } finally {
                            try {
                                if (!u && null != r.return && (o = r.return(), Object(o) !== o)) return
                            } finally {
                                if (c) throw a
                            }
                        }
                        return l
                    }
                }(e, t) || o(e, t) || function() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function o(e, t) {
                if (e) {
                    if ("string" == typeof e) return l(e, t);
                    var r = {}.toString.call(e).slice(8, -1);
                    return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? l(e, t) : void 0
                }
            }

            function l(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }

            function u() {
                var e = i((0, a.useState)({
                        width: 0,
                        height: 0
                    }), 2),
                    t = e[0],
                    r = e[1],
                    l = i((0, a.useState)(null), 2),
                    u = l[0],
                    c = l[1],
                    s = (0, a.useCallback)((function(e) {
                        if (c(e), !e) return r({
                            width: 0,
                            height: 0
                        });
                        r({
                            width: e.offsetWidth,
                            height: e.offsetHeight
                        })
                    }), []);
                return (0, a.useEffect)((function() {
                    if (u) {
                        var e = new n.A((function(e) {
                            var t, n = function(e, t) {
                                var r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                                if (!r) {
                                    if (Array.isArray(e) || (r = o(e))) {
                                        r && (e = r);
                                        var n = 0,
                                            a = function() {};
                                        return {
                                            s: a,
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
                                            f: a
                                        }
                                    }
                                    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                                }
                                var i, l = !0,
                                    u = !1;
                                return {
                                    s: function() {
                                        r = r.call(e)
                                    },
                                    n: function() {
                                        var e = r.next();
                                        return l = e.done, e
                                    },
                                    e: function(e) {
                                        u = !0, i = e
                                    },
                                    f: function() {
                                        try {
                                            l || null == r.return || r.return()
                                        } finally {
                                            if (u) throw i
                                        }
                                    }
                                }
                            }(e);
                            try {
                                for (n.s(); !(t = n.n()).done;) {
                                    var a = t.value;
                                    r({
                                        width: a.target.offsetWidth,
                                        height: a.target.offsetHeight
                                    })
                                }
                            } catch (e) {
                                n.e(e)
                            } finally {
                                n.f()
                            }
                        }));
                        return e.observe(u),
                            function() {
                                e.disconnect()
                            }
                    }
                }), [u]), {
                    setElement: s,
                    size: t
                }
            }
        }
    }
]);