(self.webpackChunk_workable_candidate = self.webpackChunk_workable_candidate || []).push([
    [8537], {
        37444: (e, t, n) => {
            "use strict";
            n.d(t, {
                A: () => r
            });
            const r = n(34554).createContext()
        },
        25911: (e, t, n) => {
            "use strict";
            n.d(t, {
                IK: () => Be,
                HR: () => Ve,
                sF: () => Ye,
                _B: () => He,
                Ay: () => $e
            });
            var r = n(34554),
                o = n(86295),
                i = n(7567),
                a = n(49230),
                l = (n(93832), n(81984), n(56030), n(1233), n(52979), n(89001), n(85927), n(8153), n(48991), n(94773), n(46187), n(33951), n(1496), n(94119), n(52209), n(48996), n(29882), n(97358), n(58981), n(74697), n(28028), n(95714)),
                u = n(86760),
                c = n(83491);

            function s(e) {
                return s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, s(e)
            }

            function f(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), n.push.apply(n, r)
                }
                return n
            }

            function y(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? f(Object(n), !0).forEach((function(t) {
                        d(e, t, n[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : f(Object(n)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    }))
                }
                return e
            }

            function d(e, t, n) {
                return (t = function(e) {
                    var t = function(e, t) {
                        if ("object" != s(e) || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                            var r = n.call(e, "string");
                            if ("object" != s(r)) return r;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == s(t) ? t : t + ""
                }(t)) in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n, e
            }

            function p(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
                return r
            }
            var b = {
                eeoc: !1,
                gdpr: null,
                mailbox: {
                    email: "_____"
                },
                overview: {
                    description: ["________________________________________", "______________________________", "_______________________________________________________"].join("<br /><br />")
                }
            };
            const m = r.memo((function(e) {
                var t, n, o = e.children,
                    i = (0, r.useContext)(u.A),
                    a = (t = (0, r.useState)(), n = 2, function(e) {
                        if (Array.isArray(e)) return e
                    }(t) || function(e, t) {
                        var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                        if (null != n) {
                            var r, o, i, a, l = [],
                                u = !0,
                                c = !1;
                            try {
                                if (i = (n = n.call(e)).next, 0 === t) {
                                    if (Object(n) !== n) return;
                                    u = !1
                                } else
                                    for (; !(u = (r = i.call(n)).done) && (l.push(r.value), l.length !== t); u = !0);
                            } catch (e) {
                                c = !0, o = e
                            } finally {
                                try {
                                    if (!u && null != n.return && (a = n.return(), Object(a) !== a)) return
                                } finally {
                                    if (c) throw o
                                }
                            }
                            return l
                        }
                    }(t, n) || function(e, t) {
                        if (e) {
                            if ("string" == typeof e) return p(e, t);
                            var n = {}.toString.call(e).slice(8, -1);
                            return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? p(e, t) : void 0
                        }
                    }(t, n) || function() {
                        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }()),
                    s = a[0],
                    f = a[1];
                (0, r.useEffect)((function() {
                    l.A.account(i).details().then((function(e) {
                        f(y(y({}, e), {}, {
                            details: y(y({}, e && e.details), b),
                            languages: {
                                default: "en",
                                options: ["en"]
                            }
                        }))
                    }))
                }), []);
                var d = (0, r.useCallback)((function(e) {
                    return f(y(y({}, s), e))
                }), [s]);
                return r.createElement(c.A.Provider, {
                    value: {
                        accountDetails: s,
                        updateAccountDetails: d
                    }
                }, o)
            }));
            var v = n(79510),
                g = (n(85218), n(61347), n(56687)),
                h = n(37444);

            function _(e) {
                return _ = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, _(e)
            }

            function w(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), n.push.apply(n, r)
                }
                return n
            }

            function O(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? w(Object(n), !0).forEach((function(t) {
                        j(e, t, n[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : w(Object(n)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    }))
                }
                return e
            }

            function j(e, t, n) {
                return (t = function(e) {
                    var t = function(e, t) {
                        if ("object" != _(e) || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                            var r = n.call(e, "string");
                            if ("object" != _(r)) return r;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == _(t) ? t : t + ""
                }(t)) in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n, e
            }
            var S = Object.freeze({
                appointed_representative: "[appointed_representative]",
                company_name: "[company_name]",
                data_retention_months: "[data_retention_months]",
                internal_data_processing_location: "[internal_data_processing_location]",
                privacy_contact_email: "[privacy_contact_email]",
                representative_contact_info: "[representative_contact_info]",
                trading_info: "[trading_info]"
            });
            const A = function(e) {
                var t = e.children,
                    n = e.search,
                    o = void 0 === n ? window.location.search : n,
                    i = {
                        latest: !0,
                        policy: O(O({}, S), g.parse(o || ""))
                    };
                return r.createElement(h.A.Provider, {
                    value: i
                }, t)
            };
            var P = n(18287),
                E = (n(37629), n(60896), n(18544), n(38314), n(42167), n(55152), n(41434), n(7597)),
                D = n(27365),
                C = n(17896),
                x = n(7853),
                T = (n(83283), n(37511), n(19548)),
                L = n.n(T),
                k = n(91912),
                I = n.n(k),
                q = n(41270),
                M = [".pdf", ".doc", ".docx", ".odt", ".rtf", ".txt"],
                N = [".gif", ".jpeg", ".png", ".pjpeg"],
                F = 5242880;

            function W(e) {
                return W = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, W(e)
            }

            function R(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), n.push.apply(n, r)
                }
                return n
            }

            function V(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? R(Object(n), !0).forEach((function(t) {
                        H(e, t, n[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : R(Object(n)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    }))
                }
                return e
            }

            function H(e, t, n) {
                return (t = function(e) {
                    var t = function(e, t) {
                        if ("object" != W(e) || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                            var r = n.call(e, "string");
                            if ("object" != W(r)) return r;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == W(t) ? t : t + ""
                }(t)) in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n, e
            }
            n(76158);
            var B = function(e) {
                    var t = e.field,
                        n = e.language,
                        r = e.translations;
                    if (n) {
                        var o = r.find((function(e) {
                            return e[n]
                        }));
                        return o && o[n] && o[n][t]
                    }
                },
                U = function(e) {
                    var t = e.defaultAccountLanguage,
                        n = e.defaultDisplayedValue,
                        r = e.fieldTranslationKey,
                        o = void 0 === r ? "label" : r,
                        i = e.language,
                        a = e.translations;
                    if (!a || !Array.isArray(a)) return n;
                    var l = B({
                            field: o,
                            language: i,
                            translations: a
                        }),
                        u = B({
                            field: o,
                            language: t,
                            translations: a
                        });
                    return l || u || n
                },
                Y = function(e) {
                    var t = e.defaultAccountLanguage,
                        n = e.defaultDisplayedValue,
                        r = e.language,
                        o = e.translations;
                    return U({
                        defaultAccountLanguage: t,
                        defaultDisplayedValue: n,
                        fieldTranslationKey: "body",
                        language: r,
                        translations: o
                    })
                },
                $ = function(e) {
                    var t = e.defaultAccountLanguage,
                        n = e.defaultDisplayedValue,
                        r = e.language,
                        o = e.translations;
                    return U({
                        defaultAccountLanguage: t,
                        defaultDisplayedValue: n,
                        fieldTranslationKey: "label",
                        language: r,
                        translations: o
                    })
                };

            function z(e) {
                return z = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, z(e)
            }

            function J(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), n.push.apply(n, r)
                }
                return n
            }

            function K(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? J(Object(n), !0).forEach((function(t) {
                        G(e, t, n[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : J(Object(n)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    }))
                }
                return e
            }

            function G(e, t, n) {
                return (t = function(e) {
                    var t = function(e, t) {
                        if ("object" != z(e) || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                            var r = n.call(e, "string");
                            if ("object" != z(r)) return r;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == z(t) ? t : t + ""
                }(t)) in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n, e
            }

            function Q(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
                return r
            }
            const X = function(e) {
                if (e && q.C8.TYPES[e.type] && !1 !== e.enabled) {
                    var t = function(e, t) {
                            if (1 === t._destroy) return e;
                            var n, r = {
                                value: t.body
                            };
                            return [].concat(function(e) {
                                if (Array.isArray(e)) return Q(e)
                            }(n = e) || function(e) {
                                if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
                            }(n) || function(e, t) {
                                if (e) {
                                    if ("string" == typeof e) return Q(e, t);
                                    var n = {}.toString.call(e).slice(8, -1);
                                    return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Q(e, t) : void 0
                                }
                            }(n) || function() {
                                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                            }(), [r])
                        },
                        n = {};
                    switch ("multiple" !== q.C8.TYPES[e.type] && "dropdown" !== q.C8.TYPES[e.type] || (n = {
                        options: e.choices_attributes.reduce(t, []),
                        singleOption: e.single_answer
                    }), q.C8.TYPES[e.type]) {
                        case "multiple":
                        case "dropdown":
                            n = {
                                options: e.choices_attributes.reduce(t, []),
                                singleOption: e.single_answer
                            };
                            break;
                        case "file":
                            n = {
                                maxFileSize: F,
                                supportedFileTypes: M
                            }
                    }
                    return K(K({}, n), {}, {
                        id: e.id,
                        label: e.body,
                        required: e.required,
                        type: q.C8.TYPES[e.type]
                    })
                }
            };

            function Z(e) {
                return Z = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, Z(e)
            }

            function ee(e) {
                return function(e) {
                    if (Array.isArray(e)) return te(e)
                }(e) || function(e) {
                    if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
                }(e) || function(e, t) {
                    if (e) {
                        if ("string" == typeof e) return te(e, t);
                        var n = {}.toString.call(e).slice(8, -1);
                        return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? te(e, t) : void 0
                    }
                }(e) || function() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function te(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
                return r
            }

            function ne(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), n.push.apply(n, r)
                }
                return n
            }

            function re(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? ne(Object(n), !0).forEach((function(t) {
                        oe(e, t, n[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ne(Object(n)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    }))
                }
                return e
            }

            function oe(e, t, n) {
                return (t = function(e) {
                    var t = function(e, t) {
                        if ("object" != Z(e) || !e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                            var r = n.call(e, "string");
                            if ("object" != Z(r)) return r;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == Z(t) ? t : t + ""
                }(t)) in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n, e
            }
            var ie = [{
                    id: "school",
                    label: "School",
                    maxLength: 255,
                    required: !1,
                    type: "text"
                }],
                ae = function(e) {
                    var t = e.defaultAccountLanguage,
                        n = e.language,
                        r = e.settings;
                    return function(e, o) {
                        return "disabled" === r[o.field] || "disabled" === r[o.id] || "name" === o.field || "email" === o.field ? e : (o.custom ? i = function(e) {
                            var t = e.defaultAccountLanguage,
                                n = e.field,
                                r = e.fieldSetting,
                                o = e.language,
                                i = void 0 === o ? E.Ay.language : o;
                            if (n && q.C8.TYPES[n.type]) {
                                var a = {};
                                switch (q.C8.TYPES[n.type]) {
                                    case "multiple":
                                    case "dropdown":
                                        a = {
                                            options: n && n.choices && n.choices.map && n.choices.map((function(e) {
                                                return {
                                                    value: Y({
                                                        defaultAccountLanguage: t,
                                                        defaultDisplayedValue: e.body,
                                                        language: i,
                                                        translations: e.translations
                                                    })
                                                }
                                            })),
                                            singleOption: n.single_answer
                                        };
                                        break;
                                    case "file":
                                        a = {
                                            maxFileSize: F,
                                            supportedFileTypes: M
                                        }
                                }
                                return V(V({}, a), {}, {
                                    id: n.id,
                                    label: $({
                                        defaultAccountLanguage: t,
                                        defaultDisplayedValue: n.label,
                                        language: i,
                                        translations: n.translations
                                    }),
                                    required: "required" === r,
                                    type: q.C8.TYPES[n.type]
                                })
                            }
                        }({
                            defaultAccountLanguage: t,
                            field: o,
                            fieldSetting: r[o.id],
                            language: n
                        }) : (i = function(e, t) {
                            var n = {
                                id: e.id,
                                label: q.C8.LABELS[e.id](),
                                required: "required" === t,
                                type: q.C8.TYPES[e.id]
                            };
                            return "avatar" !== e.id && "resume" !== e.id || (n = re(re({}, n), {}, {
                                maxFileSize: F
                            }), Object.assign(n, "avatar" === e.id ? {
                                supportedFileTypes: N
                            } : {
                                supportedFileTypes: M
                            })), n
                        }(o, r[o.id]), "phone" === o.id && Object.assign(i, {
                            helper: "The hiring team may use this number to contact you about this job."
                        }), "address" === o.id && Object.assign(i, {
                            helper: "Include your city, region, and country, so that employers can easily manage your application."
                        }), Object.assign(i, "education" === o.id || "experience" === o.id ? {
                            fields: ie
                        } : null)), i ? [].concat(ee(e), [i]) : e);
                        var i
                    }
                };
            const le = function() {
                var e, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    n = t.defaultAccountLanguage,
                    r = t.gdpr,
                    o = t.language,
                    i = t.questions,
                    a = t.sections,
                    l = t.settings;
                if (a && l) {
                    var u = {
                            id: "firstname",
                            label: q.C8.LABELS.firstname(),
                            required: !0,
                            type: "text"
                        },
                        c = {
                            id: "lastname",
                            label: q.C8.LABELS.lastname(),
                            required: !0,
                            type: "text"
                        },
                        s = {
                            id: "email",
                            label: q.C8.LABELS.email(),
                            required: !0,
                            type: "email"
                        },
                        f = ae({
                            defaultAccountLanguage: n,
                            language: o,
                            settings: l
                        }),
                        y = [{
                            fields: null == a || null === (e = a.personal_information) || void 0 === e ? void 0 : e.reduce(f, [u, c, s]),
                            id: "personal",
                            name: E.Ay.t("form.sections.personal")
                        }];
                    if (!I()(a.candidate_profile)) {
                        var d, p = {
                            fields: null == a || null === (d = a.candidate_profile) || void 0 === d ? void 0 : d.reduce(f, []),
                            id: "profile",
                            name: E.Ay.t("form.sections.profile")
                        };
                        y = [].concat(ee(y), [p])
                    }
                    y = function(e) {
                        var t = e.details,
                            n = e.fieldReducer,
                            r = e.form,
                            o = e.questions;
                        if (I()(t) && I()(o)) return r;
                        var i = t.reduce(n, []),
                            a = o && L()(o.map((function(e) {
                                return X(e)
                            }))),
                            l = {
                                id: "details",
                                name: E.Ay.t("form.sections.details")
                            };
                        return Object.assign(l, I()(a) ? {
                            fields: i
                        } : {
                            fields: null == i ? void 0 : i.concat(a)
                        }), [].concat(ee(r), [l])
                    }({
                        details: null == a ? void 0 : a.application_details,
                        fieldReducer: f,
                        form: y,
                        questions: i
                    });
                    var b = function(e) {
                        var t = [];
                        return e ? (e && t.push({
                            id: "gdpr",
                            required: !0,
                            type: "boolean"
                        }), t) : t
                    }(r);
                    return I()(b) || y.push({
                        fields: b,
                        id: "privacy"
                    }), y
                }
            };

            function ue(e) {
                return ue = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, ue(e)
            }

            function ce() {
                return ce = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var r in n)({}).hasOwnProperty.call(n, r) && (e[r] = n[r])
                    }
                    return e
                }, ce.apply(null, arguments)
            }

            function se(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
                return r
            }

            function fe(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, ye(r.key), r)
                }
            }

            function ye(e) {
                var t = function(e, t) {
                    if ("object" != ue(e) || !e) return e;
                    var n = e[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var r = n.call(e, "string");
                        if ("object" != ue(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(e)
                }(e);
                return "symbol" == ue(t) ? t : t + ""
            }

            function de(e, t, n) {
                return t = be(t),
                    function(e, t) {
                        if (t && ("object" == ue(t) || "function" == typeof t)) return t;
                        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                        return function(e) {
                            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return e
                        }(e)
                    }(e, pe() ? Reflect.construct(t, n || [], be(e).constructor) : t.apply(e, n))
            }

            function pe() {
                try {
                    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (e) {}
                return (pe = function() {
                    return !!e
                })()
            }

            function be(e) {
                return be = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                }, be(e)
            }

            function me(e, t) {
                return me = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                    return e.__proto__ = t, e
                }, me(e, t)
            }
            var ve = function(e) {
                function t(e) {
                    var n;
                    return function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), (n = de(this, t, [e])).state = {
                        form: void 0,
                        job: void 0
                    }, n.setData = n.setData.bind(n), n
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
                    }), t && me(e, t)
                }(t, e), n = t, (o = [{
                    key: "componentDidMount",
                    value: function() {
                        window.addEventListener("message", this.setData);
                        var e = function(e, t) {
                                return function(e) {
                                    if (Array.isArray(e)) return e
                                }(e) || function(e, t) {
                                    var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                                    if (null != n) {
                                        var r, o, i, a, l = [],
                                            u = !0,
                                            c = !1;
                                        try {
                                            if (i = (n = n.call(e)).next, 0 === t) {
                                                if (Object(n) !== n) return;
                                                u = !1
                                            } else
                                                for (; !(u = (r = i.call(n)).done) && (l.push(r.value), l.length !== t); u = !0);
                                        } catch (e) {
                                            c = !0, o = e
                                        } finally {
                                            try {
                                                if (!u && null != n.return && (a = n.return(), Object(a) !== a)) return
                                            } finally {
                                                if (c) throw o
                                            }
                                        }
                                        return l
                                    }
                                }(e, t) || function(e, t) {
                                    if (e) {
                                        if ("string" == typeof e) return se(e, t);
                                        var n = {}.toString.call(e).slice(8, -1);
                                        return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? se(e, t) : void 0
                                    }
                                }(e, t) || function() {
                                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                                }()
                            }(window.location.hostname.split("."), 3),
                            t = (e[0], e[1]),
                            n = e[2];
                        t && n && (this.domain = "".concat(t, ".").concat(n), this.sendMessage()), ["workable.dev", "lvh.me"].includes(window.location.hostname) && (this.domain = "".concat(window.location.hostname, ":").concat("3443"), this.sendMessage())
                    }
                }, {
                    key: "componentWillUnmount",
                    value: function() {
                        window.removeEventListener("message", this.setData)
                    }
                }, {
                    key: "sendMessage",
                    value: function() {
                        if (window.parent) {
                            var e = this.props.subdomain;
                            e && this.domain && window.parent.postMessage("loaded", "https://".concat(e, ".").concat(this.domain))
                        }
                    }
                }, {
                    key: "sendHeight",
                    value: function() {
                        if (window.parent) {
                            var e = this.props.subdomain;
                            e && this.domain && window.parent.postMessage({
                                type: "height",
                                value: document.body.scrollHeight
                            }, "https://".concat(e, ".").concat(this.domain))
                        }
                    }
                }, {
                    key: "setData",
                    value: function(e) {
                        var t = this;
                        if (e.origin && e.origin.endsWith(this.domain) && "string" == typeof e.data && e.data) {
                            var n = JSON.parse(e.data);
                            if ("preview" === n.type) {
                                var r, o = n && n.job,
                                    i = o && o.language;
                                return (r = i, Promise.resolve(r && r !== E.Ay.language && (0, E.v2)(r))).then((function() {
                                    var e = n || {},
                                        r = e.questions,
                                        a = e.sections,
                                        l = e.settings,
                                        u = e.subject_to_gdpr,
                                        c = t.props.defaultAccountLanguage;
                                    t.setState({
                                        form: le({
                                            defaultAccountLanguage: c,
                                            gdpr: u,
                                            language: i,
                                            questions: r,
                                            sections: a,
                                            settings: l
                                        }),
                                        job: o
                                    }, (function() {
                                        return t.sendHeight()
                                    }))
                                }))
                            }
                        }
                    }
                }, {
                    key: "render",
                    value: function() {
                        var e = this.state,
                            t = e.form,
                            n = e.job;
                        return r.createElement(x.A.Provider, {
                            value: {
                                form: t
                            }
                        }, r.createElement(C.A.Provider, {
                            value: {
                                job: n
                            }
                        }, this.props.children))
                    }
                }]) && fe(n.prototype, o), Object.defineProperty(n, "prototype", {
                    writable: !1
                }), n;
                var n, o
            }(r.Component);
            const ge = function(e) {
                return r.createElement(D.A.Consumer, null, (function(t) {
                    var n, o = t.accountDetails;
                    return o ? r.createElement(ve, ce({
                        defaultAccountLanguage: null == o || null === (n = o.languages) || void 0 === n ? void 0 : n.default,
                        subdomain: o.subdomain
                    }, e)) : null
                }))
            };
            var he = n(77595),
                _e = n.n(he),
                we = n(98672);

            function Oe(e) {
                return Oe = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, Oe(e)
            }

            function je() {
                return je = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var r in n)({}).hasOwnProperty.call(n, r) && (e[r] = n[r])
                    }
                    return e
                }, je.apply(null, arguments)
            }

            function Se(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
                return r
            }

            function Ae(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, Pe(r.key), r)
                }
            }

            function Pe(e) {
                var t = function(e, t) {
                    if ("object" != Oe(e) || !e) return e;
                    var n = e[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var r = n.call(e, "string");
                        if ("object" != Oe(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(e)
                }(e);
                return "symbol" == Oe(t) ? t : t + ""
            }

            function Ee(e, t, n) {
                return t = Ce(t),
                    function(e, t) {
                        if (t && ("object" == Oe(t) || "function" == typeof t)) return t;
                        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                        return function(e) {
                            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return e
                        }(e)
                    }(e, De() ? Reflect.construct(t, n || [], Ce(e).constructor) : t.apply(e, n))
            }

            function De() {
                try {
                    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (e) {}
                return (De = function() {
                    return !!e
                })()
            }

            function Ce(e) {
                return Ce = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                }, Ce(e)
            }

            function xe(e, t) {
                return xe = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                    return e.__proto__ = t, e
                }, xe(e, t)
            }
            var Te = function(e) {
                function t(e) {
                    var n;
                    return function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), (n = Ee(this, t, [e])).state = {
                        job: void 0
                    }, n.setData = n.setData.bind(n), n.observer = null, n
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
                    }), t && xe(e, t)
                }(t, e), n = t, (o = [{
                    key: "componentDidMount",
                    value: function() {
                        window.addEventListener("message", this.setData);
                        var e = function(e, t) {
                                return function(e) {
                                    if (Array.isArray(e)) return e
                                }(e) || function(e, t) {
                                    var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                                    if (null != n) {
                                        var r, o, i, a, l = [],
                                            u = !0,
                                            c = !1;
                                        try {
                                            if (i = (n = n.call(e)).next, 0 === t) {
                                                if (Object(n) !== n) return;
                                                u = !1
                                            } else
                                                for (; !(u = (r = i.call(n)).done) && (l.push(r.value), l.length !== t); u = !0);
                                        } catch (e) {
                                            c = !0, o = e
                                        } finally {
                                            try {
                                                if (!u && null != n.return && (a = n.return(), Object(a) !== a)) return
                                            } finally {
                                                if (c) throw o
                                            }
                                        }
                                        return l
                                    }
                                }(e, t) || function(e, t) {
                                    if (e) {
                                        if ("string" == typeof e) return Se(e, t);
                                        var n = {}.toString.call(e).slice(8, -1);
                                        return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Se(e, t) : void 0
                                    }
                                }(e, t) || function() {
                                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                                }()
                            }(window.location.hostname.split("."), 3),
                            t = (e[0], e[1]),
                            n = e[2];
                        t && n && (this.domain = "".concat(t, ".").concat(n), this.sendMessage())
                    }
                }, {
                    key: "componentWillUnmount",
                    value: function() {
                        window.removeEventListener("message", this.setData)
                    }
                }, {
                    key: "componentDidUpdate",
                    value: function() {
                        var e = this;
                        this.state.job && !this.observer && (this.observer = new MutationObserver((function() {
                            var t = document.body.scrollHeight;
                            t && (window.parent.postMessage(JSON.stringify({
                                height: t,
                                type: "height"
                            }), e.getOrigin()), e.observer.disconnect(), e.observer = null)
                        })), this.observer.observe(document.body, {
                            attributes: !0,
                            childList: !0,
                            subtree: !0
                        }))
                    }
                }, {
                    key: "getOrigin",
                    value: function() {
                        var e = this.props.subdomain;
                        return "https://".concat(e, ".").concat(this.domain)
                    }
                }, {
                    key: "sendMessage",
                    value: function() {
                        window.parent && this.props.subdomain && this.domain && window.parent.postMessage("loaded", this.getOrigin())
                    }
                }, {
                    key: "setData",
                    value: function(e) {
                        if (e.origin && e.origin.endsWith(this.domain) && "string" == typeof e.data && e.data) {
                            var t = JSON.parse(e.data);
                            "preview" === t.type && this.setState({
                                job: t.job
                            })
                        }
                    }
                }, {
                    key: "render",
                    value: function() {
                        var e = this.state.job,
                            t = this.props.children;
                        return r.createElement(we.A.Provider, {
                            value: e && (e.shortcode || e.id)
                        }, r.createElement(C.A.Provider, {
                            value: {
                                job: e
                            }
                        }, t))
                    }
                }]) && Ae(n.prototype, o), Object.defineProperty(n, "prototype", {
                    writable: !1
                }), n;
                var n, o
            }(r.Component);
            Te.propTypes = {
                children: _e().node.isRequired,
                subdomain: _e().string.isRequired
            };
            const Le = function(e) {
                return r.createElement(D.A.Consumer, null, (function(t) {
                    var n = t.accountDetails;
                    return n ? r.createElement(Te, je({
                        subdomain: n.subdomain
                    }, e)) : null
                }))
            };
            var ke = n(26906),
                Ie = n(365),
                qe = n(95531),
                Me = n(70588),
                Ne = n(84881),
                Fe = n(74471),
                We = n(53150),
                Re = function(e) {
                    var t = e.children;
                    return r.createElement(i.A, {
                        key: (0, r.useContext)(qe.A).locale
                    }, r.createElement(v.A, null, r.createElement(Ne.A, null, r.createElement(Fe.A, null, r.createElement(We.A, null, r.createElement(ke.A, null, r.createElement(a.A, null, r.createElement(P.Ay, null, r.createElement(Ie.A, null, t)))))))))
                },
                Ve = function(e) {
                    var t = e.children;
                    return r.createElement(i.A, null, r.createElement(a.A, null, r.createElement(ge, null, r.createElement(o.A, null, t))))
                },
                He = function(e) {
                    var t = e.children;
                    return r.createElement(i.A, null, r.createElement(a.A, null, r.createElement(Le, null, r.createElement(o.A, null, t))))
                },
                Be = function(e) {
                    var t = e.children;
                    return r.createElement(i.A, null, r.createElement(m, null, t))
                },
                Ue = function(e) {
                    var t = e.children;
                    return r.createElement(i.A, {
                        key: (0, r.useContext)(qe.A).locale
                    }, r.createElement(a.A, null, r.createElement(A, null, t)))
                },
                Ye = function(e) {
                    var t = e.children;
                    return r.createElement(Me.A, null, r.createElement(Ue, null, t))
                };
            const $e = 9304 == n.j ? function(e) {
                var t = e.children;
                return r.createElement(Me.A, null, r.createElement(Re, null, t))
            } : null
        },
        7853: (e, t, n) => {
            "use strict";
            n.d(t, {
                A: () => r.A
            });
            var r = n(34719)
        },
        34719: (e, t, n) => {
            "use strict";
            n.d(t, {
                A: () => r
            });
            const r = n(34554).createContext({
                form: void 0,
                setAppliedWithLinkedin: function() {},
                updateForm: function() {}
            })
        },
        86295: (e, t, n) => {
            "use strict";
            n.d(t, {
                A: () => c
            }), n(93832), n(81984), n(56030), n(89001), n(85927), n(48991), n(46187), n(48996), n(42167), n(29882), n(97358), n(58981), n(28028);
            var r = n(34554),
                o = n(7597),
                i = n(17896),
                a = n(95531),
                l = n(20678);

            function u(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
                return r
            }
            const c = function(e) {
                var t, n, c = e.children,
                    s = (t = (0, r.useState)(o.Ay.language), n = 2, function(e) {
                        if (Array.isArray(e)) return e
                    }(t) || function(e, t) {
                        var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                        if (null != n) {
                            var r, o, i, a, l = [],
                                u = !0,
                                c = !1;
                            try {
                                if (i = (n = n.call(e)).next, 0 === t) {
                                    if (Object(n) !== n) return;
                                    u = !1
                                } else
                                    for (; !(u = (r = i.call(n)).done) && (l.push(r.value), l.length !== t); u = !0);
                            } catch (e) {
                                c = !0, o = e
                            } finally {
                                try {
                                    if (!u && null != n.return && (a = n.return(), Object(a) !== a)) return
                                } finally {
                                    if (c) throw o
                                }
                            }
                            return l
                        }
                    }(t, n) || function(e, t) {
                        if (e) {
                            if ("string" == typeof e) return u(e, t);
                            var n = {}.toString.call(e).slice(8, -1);
                            return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? u(e, t) : void 0
                        }
                    }(t, n) || function() {
                        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }()),
                    f = s[0],
                    y = s[1],
                    d = (0, r.useContext)(i.A).job,
                    p = (void 0 === d ? {} : d).language,
                    b = (0, r.useContext)(a.A),
                    m = b.locale,
                    v = b.setCareersLocale;
                return (0, r.useEffect)((function() {
                    p && Promise.resolve(p === o.Ay.language ? void 0 : (0, o.v2)(p)).then((function() {
                        return y(p)
                    }))
                }), [p]), (0, r.useEffect)((function() {
                    return function() {
                        m && v(m)
                    }
                }), []), r.createElement(l.A.Provider, {
                    value: f
                }, c instanceof Function ? c(f) : c)
            }
        },
        20678: (e, t, n) => {
            "use strict";
            n.d(t, {
                A: () => r
            });
            const r = n(34554).createContext(void 0)
        },
        75787: (e, t, n) => {
            "use strict";
            n.d(t, {
                A: () => r
            });
            const r = n(34554).createContext()
        },
        12441: (e, t, n) => {
            "use strict";
            n.d(t, {
                Ay: () => v
            }), n(93832), n(81984), n(56030), n(1233), n(60896), n(85927), n(94773), n(33951), n(18544), n(48996), n(86342), n(58981), n(28028), n(46187);
            var r = n(34554),
                o = n(70851),
                i = n(19548),
                a = n.n(i),
                l = n(16520),
                u = n(27365),
                c = n(32260);

            function s(e) {
                return s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, s(e)
            }
            var f = ["className"],
                y = ["account", "className"];

            function d() {
                return d = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var r in n)({}).hasOwnProperty.call(n, r) && (e[r] = n[r])
                    }
                    return e
                }, d.apply(null, arguments)
            }

            function p(e, t) {
                if (null == e) return {};
                var n, r, o = function(e, t) {
                    if (null == e) return {};
                    var n = {};
                    for (var r in e)
                        if ({}.hasOwnProperty.call(e, r)) {
                            if (t.includes(r)) continue;
                            n[r] = e[r]
                        }
                    return n
                }(e, t);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    for (r = 0; r < i.length; r++) n = i[r], t.includes(n) || {}.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
                }
                return o
            }
            var b = function(e) {
                var t = e.className,
                    n = p(e, f);
                return r.createElement("a", d({
                    className: (0, o.A)(a()(["styles--sHnPs styles--3CvIg shimmer--2pnJ5", t])),
                    "data-ui": "company-logo",
                    href: c.Ay.root()
                }, n))
            };
            l.isIE && n(34002);
            var m = function(e) {
                var t = e.account,
                    n = e.className,
                    i = p(e, y);
                if ((0, r.useEffect)((function() {
                        window.setTimeout((function() {
                            return window.requestAnimationFrame((function() {
                                return window.objectFitPolyfill && window.objectFitPolyfill()
                            }))
                        }), 0)
                    })), !t) return r.createElement(b, d({
                    className: n
                }, i));
                var l, u, f, m, v = t.logo,
                    g = t.name,
                    h = (0, o.A)(a()(["styles--3CvIg", n, (u = {}, f = "styles--2IGO7", m = !!v, (f = function(e) {
                        var t = function(e, t) {
                            if ("object" != s(e) || !e) return e;
                            var n = e[Symbol.toPrimitive];
                            if (void 0 !== n) {
                                var r = n.call(e, "string");
                                if ("object" != s(r)) return r;
                                throw new TypeError("@@toPrimitive must return a primitive value.")
                            }
                            return String(e)
                        }(e);
                        return "symbol" == s(t) ? t : t + ""
                    }(f)) in u ? Object.defineProperty(u, f, {
                        value: m,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : u[f] = m, u)]));
                return l = v ? r.createElement("img", {
                    alt: g,
                    "data-object-fit": "contain",
                    src: v
                }) : r.createElement("span", null, g), r.createElement("a", d({
                    className: h,
                    "data-ui": "company-logo",
                    href: c.Ay.root()
                }, i), l)
            };
            const v = function(e) {
                return r.createElement(u.A.Consumer, null, (function(t) {
                    var n = t.accountDetails;
                    return r.createElement(m, d({
                        account: n
                    }, e))
                }))
            }
        },
        34002: () => {
            ! function() {
                "use strict";
                if ("undefined" != typeof window) {
                    var e = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
                        t = !!e && 16 <= parseInt(e[1], 10);
                    if ("objectFit" in document.documentElement.style == 0 || t) {
                        var n = function(e, t, n) {
                                var r, o, i, a, l;
                                if ((n = n.split(" ")).length < 2 && (n[1] = n[0]), "x" === e) r = n[0], o = n[1], i = "left", a = "right", l = t.clientWidth;
                                else {
                                    if ("y" !== e) return;
                                    r = n[1], o = n[0], i = "top", a = "bottom", l = t.clientHeight
                                }
                                if (r !== i && o !== i) {
                                    if (r !== a && o !== a) return "center" === r || "50%" === r ? (t.style[i] = "50%", void(t.style["margin-" + i] = l / -2 + "px")) : void(0 <= r.indexOf("%") ? (r = parseInt(r)) < 50 ? (t.style[i] = r + "%", t.style["margin-" + i] = l * (r / -100) + "px") : (r = 100 - r, t.style[a] = r + "%", t.style["margin-" + a] = l * (r / -100) + "px") : t.style[i] = r);
                                    t.style[a] = "0"
                                } else t.style[i] = "0"
                            },
                            r = function(e) {
                                var t = e.dataset ? e.dataset.objectFit : e.getAttribute("data-object-fit"),
                                    r = e.dataset ? e.dataset.objectPosition : e.getAttribute("data-object-position");
                                t = t || "cover", r = r || "50% 50%";
                                var o = e.parentNode;
                                return function(e) {
                                        var t = window.getComputedStyle(e, null),
                                            n = t.getPropertyValue("position"),
                                            r = t.getPropertyValue("overflow"),
                                            o = t.getPropertyValue("display");
                                        n && "static" !== n || (e.style.position = "relative"), "hidden" !== r && (e.style.overflow = "hidden"), o && "inline" !== o || (e.style.display = "block"), 0 === e.clientHeight && (e.style.height = "100%"), -1 === e.className.indexOf("object-fit-polyfill") && (e.className = e.className + " object-fit-polyfill")
                                    }(o),
                                    function(e) {
                                        var t = window.getComputedStyle(e, null),
                                            n = {
                                                "max-width": "none",
                                                "max-height": "none",
                                                "min-width": "0px",
                                                "min-height": "0px",
                                                top: "auto",
                                                right: "auto",
                                                bottom: "auto",
                                                left: "auto",
                                                "margin-top": "0px",
                                                "margin-right": "0px",
                                                "margin-bottom": "0px",
                                                "margin-left": "0px"
                                            };
                                        for (var r in n) t.getPropertyValue(r) !== n[r] && (e.style[r] = n[r])
                                    }(e), e.style.position = "absolute", e.style.width = "auto", e.style.height = "auto", "scale-down" === t && (t = e.clientWidth < o.clientWidth && e.clientHeight < o.clientHeight ? "none" : "contain"), "none" === t ? (n("x", e, r), void n("y", e, r)) : "fill" === t ? (e.style.width = "100%", e.style.height = "100%", n("x", e, r), void n("y", e, r)) : (e.style.height = "100%", void("cover" === t && e.clientWidth > o.clientWidth || "contain" === t && e.clientWidth < o.clientWidth ? (e.style.top = "0", e.style.marginTop = "0", n("x", e, r)) : (e.style.width = "100%", e.style.height = "auto", e.style.left = "0", e.style.marginLeft = "0", n("y", e, r))))
                            },
                            o = function(e) {
                                if (void 0 === e || e instanceof Event) e = document.querySelectorAll("[data-object-fit]");
                                else if (e && e.nodeName) e = [e];
                                else if ("object" != typeof e || !e.length || !e[0].nodeName) return !1;
                                for (var n = 0; n < e.length; n++)
                                    if (e[n].nodeName) {
                                        var o = e[n].nodeName.toLowerCase();
                                        if ("img" === o) {
                                            if (t) continue;
                                            e[n].complete ? r(e[n]) : e[n].addEventListener("load", (function() {
                                                r(this)
                                            }))
                                        } else "video" === o ? 0 < e[n].readyState ? r(e[n]) : e[n].addEventListener("loadedmetadata", (function() {
                                            r(this)
                                        })) : r(e[n])
                                    }
                                return !0
                            };
                        "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", o) : o(), window.addEventListener("resize", o), window.objectFitPolyfill = o
                    } else window.objectFitPolyfill = function() {
                        return !1
                    }
                }
            }()
        }
    }
]);