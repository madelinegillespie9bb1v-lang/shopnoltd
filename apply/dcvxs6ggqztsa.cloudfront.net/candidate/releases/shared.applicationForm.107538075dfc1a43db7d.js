/*! For license information please see shared.applicationForm.107538075dfc1a43db7d.js.LICENSE.txt */
"use strict";
(self.webpackChunk_workable_candidate = self.webpackChunk_workable_candidate || []).push([
    [3958], {
        59588: (e, t, r) => {
            r.r(t), r.d(t, {
                default: () => Lu
            }), r(93832), r(52979), r(76158), r(60896), r(85927), r(83283), r(18544), r(48996), r(29882), r(97358), r(86342), r(58981), r(61347), r(28028), r(32771), r(90787), r(3375);
            var n = r(34554),
                o = r(70851),
                i = r(77595),
                a = r.n(i),
                l = r(93242),
                u = r(19387),
                c = r(57571),
                s = r(99399),
                f = (r(85218), r(22780));
            const p = n.createContext();
            r(81984), r(56030), r(89001), r(48991), r(46187);
            const d = n.createContext();
            r(1233), r(94773), r(33951), r(1496), r(94119), r(52209), r(74697);
            var v = r(22487),
                h = r.n(v);

            function y(e) {
                return y = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, y(e)
            }

            function m(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function b(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? m(Object(r), !0).forEach((function(t) {
                        g(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : m(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }

            function g(e, t, r) {
                return (t = function(e) {
                    var t = function(e, t) {
                        if ("object" != y(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, "string");
                            if ("object" != y(n)) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == y(t) ? t : t + ""
                }(t)) in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }
            var w = function(e) {
                var t, r = e.form;
                return null == r || null === (t = r.filter((function(e) {
                    var t;
                    return (null === (t = e.fields) || void 0 === t ? void 0 : t.length) > 0
                }))) || void 0 === t ? void 0 : t.map((function(e, t) {
                    var r, n = null == (r = e.fields) ? void 0 : r.map((function(e) {
                        if (e) {
                            if ("group" === e.type) {
                                var t = null != e && e.value ? {
                                    value: e.value.map((function(e) {
                                        return b(b({}, e), {}, {
                                            id: e.id || h()("section-")
                                        })
                                    }))
                                } : {};
                                return b(b({}, e), t)
                            }
                            return e
                        }
                    }));
                    return b(b({}, e), {}, {
                        fields: n,
                        id: e.id || "section-".concat(t)
                    })
                }))
            };

            function E(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }
            const O = function(e) {
                var t, r, o = e.children,
                    i = e.sections,
                    a = (t = (0, n.useState)(), r = 2, function(e) {
                        if (Array.isArray(e)) return e
                    }(t) || function(e, t) {
                        var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                        if (null != r) {
                            var n, o, i, a, l = [],
                                u = !0,
                                c = !1;
                            try {
                                if (i = (r = r.call(e)).next, 0 === t) {
                                    if (Object(r) !== r) return;
                                    u = !1
                                } else
                                    for (; !(u = (n = i.call(r)).done) && (l.push(n.value), l.length !== t); u = !0);
                            } catch (e) {
                                c = !0, o = e
                            } finally {
                                try {
                                    if (!u && null != r.return && (a = r.return(), Object(a) !== a)) return
                                } finally {
                                    if (c) throw o
                                }
                            }
                            return l
                        }
                    }(t, r) || function(e, t) {
                        if (e) {
                            if ("string" == typeof e) return E(e, t);
                            var r = {}.toString.call(e).slice(8, -1);
                            return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? E(e, t) : void 0
                        }
                    }(t, r) || function() {
                        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }()),
                    l = a[0],
                    u = a[1];
                (0, n.useLayoutEffect)((function() {
                    u((function(e) {
                        return e !== i ? w({
                            form: i
                        }) : e
                    }))
                }), [i]);
                var c = (0, n.useMemo)((function() {
                    return {
                        form: l,
                        updateForm: function(e) {
                            var t = w({
                                form: e
                            });
                            u(t)
                        }
                    }
                }), [l, w]);
                return n.createElement(d.Provider, {
                    value: c
                }, o instanceof Function ? o({
                    form: l
                }) : o || null)
            };
            r(37629), r(38545), r(37511), r(35818), r(38314), r(55575), r(55152);
            var S = r(91912),
                j = r.n(S),
                P = r(77685),
                A = r.n(P),
                C = r(65750),
                k = r.n(C),
                x = r(46010),
                M = function() {
                    var e = (0, n.useContext)(d);
                    if (void 0 === e) throw new Error("useFormStructure must be used within a FormStructureContext");
                    return e
                },
                F = (r(8153), r(10015), r(14752)),
                D = r.n(F),
                T = r(63873),
                z = r.n(T),
                L = r(65816),
                I = r.n(L),
                _ = r(19548),
                N = r.n(_),
                U = r(56950),
                V = r.n(U),
                R = r(34943),
                B = /[\d,.]+$/,
                G = function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window.navigator.language;
                    if (!B.test(e)) return null;
                    var r = (0, R.A)(t);
                    return V()(e.split(r.getThousandsMark()).join("").split(r.getDecimalMark()).join("."))
                };
            const q = n.createContext();

            function Y(e) {
                return Y = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, Y(e)
            }

            function W() {
                return W = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, W.apply(null, arguments)
            }

            function K(e) {
                return function(e) {
                    if (Array.isArray(e)) return $(e)
                }(e) || function(e) {
                    if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
                }(e) || function(e, t) {
                    if (e) {
                        if ("string" == typeof e) return $(e, t);
                        var r = {}.toString.call(e).slice(8, -1);
                        return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? $(e, t) : void 0
                    }
                }(e) || function() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function $(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }

            function H(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, ne(n.key), n)
                }
            }

            function X(e, t, r) {
                return t = J(t),
                    function(e, t) {
                        if (t && ("object" == Y(t) || "function" == typeof t)) return t;
                        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                        return function(e) {
                            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return e
                        }(e)
                    }(e, Z() ? Reflect.construct(t, r || [], J(e).constructor) : t.apply(e, r))
            }

            function Z() {
                try {
                    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (e) {}
                return (Z = function() {
                    return !!e
                })()
            }

            function J(e) {
                return J = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                }, J(e)
            }

            function Q(e, t) {
                return Q = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                    return e.__proto__ = t, e
                }, Q(e, t)
            }

            function ee(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function te(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? ee(Object(r), !0).forEach((function(t) {
                        re(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ee(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }

            function re(e, t, r) {
                return (t = ne(t)) in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }

            function ne(e) {
                var t = function(e, t) {
                    if ("object" != Y(e) || !e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var n = r.call(e, "string");
                        if ("object" != Y(n)) return n;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(e)
                }(e);
                return "symbol" == Y(t) ? t : t + ""
            }
            var oe = {},
                ie = function(e) {
                    return "education" === e || "experience" === e
                },
                ae = function(e, t) {
                    return e && e.flatMap((function(e) {
                        return e && e.fields
                    })).find((function(e) {
                        return e.id === t
                    }))
                },
                le = function(e, t, r) {
                    return null == e ? void 0 : e.map((function(e) {
                        var n;
                        return te(te({}, e), {}, {
                            fields: null === (n = e.fields) || void 0 === n ? void 0 : n.map((function(e) {
                                return e && (e.id !== t || e.readOnly ? e : te(te({}, e), {}, {
                                    value: r
                                }))
                            }))
                        })
                    }))
                },
                ue = function(e, t) {
                    var r;
                    return null === (r = ae(e, t)) || void 0 === r ? void 0 : r.value
                },
                ce = function(e, t) {
                    return !(null == e || !e.find((function(e) {
                        return e.fields.find((function(e) {
                            return e && e.id === t && e.readOnly
                        }))
                    })))
                },
                se = function(e) {
                    function t(e) {
                        var r;
                        return function(e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t), re(r = X(this, t, [e]), "updateForm", k()((function() {
                            var e = r.state.values,
                                t = r.props.form;
                            j()(e) || Object.keys(e).forEach((function(r) {
                                if (e[r] || ie(r))
                                    if (ie(r)) {
                                        var n = ae(t, r);
                                        if (n) {
                                            var o = e[r] || [],
                                                i = n.value || [];
                                            j()(o) && j()(i) ? t = le(t, r, void 0) : A()(o, i) || (t = le(t, r, [].concat(K(o), K(i))))
                                        }
                                    } else t = le(t, r, e[r])
                            })), r.setState({
                                form: t
                            })
                        }), 100)), r.state = {
                            form: e.form,
                            values: e.values
                        }, r.onChange = r.onChange.bind(r), r.isPristine = r.isPristine.bind(r), r.updateForm = r.updateForm.bind(r), r.getValues = r.getValues.bind(r), r.reduceValuesByFieldId = r.reduceValuesByFieldId.bind(r), r.resetValues = r.resetValues.bind(r), r.resetSectionValues = r.resetSectionValues.bind(r), r.clearSection = r.clearSection.bind(r), r.deleteValue = r.deleteValue.bind(r), r.getFieldWithId = r.getFieldWithId.bind(r), r.loadPersistenceValues = r.loadPersistenceValues.bind(r), r.checkEmptyState = r.checkEmptyState.bind(r), r.renderValuesProvider = r.renderValuesProvider.bind(r), r
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
                        }), t && Q(e, t)
                    }(t, e), r = t, o = [{
                        key: "componentDidUpdate",
                        value: function(e) {
                            var t = this.props.form;
                            t && !A()(t, e.form) && this.updateForm()
                        }
                    }, {
                        key: "isPristine",
                        value: function() {
                            var e = this.state.form,
                                t = this.props.form;
                            return null == e ? void 0 : e.every((function(e, r) {
                                return e.fields.every((function(e, n) {
                                    var o, i = null == t || null === (o = t[r]) || void 0 === o || null === (o = o.fields[n]) || void 0 === o ? void 0 : o.value;
                                    return j()(e.value) && j()(i) || A()(e.value, i)
                                }))
                            }))
                        }
                    }, {
                        key: "onChange",
                        value: function(e, t) {
                            var r = this;
                            this.setState((function(n) {
                                return {
                                    form: le(r.state.form, e, t),
                                    values: te(te({}, n.values), {}, re({}, e, ce(r.state.form, e) ? ue(r.state.form, e) : t))
                                }
                            }))
                        }
                    }, {
                        key: "deleteValue",
                        value: function(e) {
                            e && this.onChange(e, void 0)
                        }
                    }, {
                        key: "getValues",
                        value: function(e) {
                            return function(e) {
                                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                                    exclude: function() {
                                        return !1
                                    }
                                };
                                return e.flatMap((function(e) {
                                    return e && e.fields && e.fields.map && N()(e.fields.map((function(e) {
                                        if (e && (e.value || !1 === e.value) && !t.exclude(e)) switch (e.type) {
                                            case "group":
                                                return z()({
                                                    name: e.id,
                                                    value: e.value.map && e.value.map((function(e) {
                                                        return I()(e, "id")
                                                    }))
                                                });
                                            case "number":
                                                return z()({
                                                    name: e.id,
                                                    value: G(e.value)
                                                }, (function(e) {
                                                    return e || D()(e)
                                                }));
                                            case "boolean":
                                                return {
                                                    name: e.id,
                                                    value: e.value
                                                };
                                            default:
                                                return z()({
                                                    name: e.id,
                                                    value: e.value
                                                })
                                        }
                                    })))
                                }))
                            }(this.state.form, e)
                        }
                    }, {
                        key: "reduceValuesByFieldId",
                        value: function() {
                            return this.state.form.reduce((function(e, t) {
                                return te(te({}, e), t.fields.reduce((function(e, t) {
                                    return te(te({}, e), {}, re({}, t.id, t.value))
                                }), e))
                            }), {})
                        }
                    }, {
                        key: "clearSection",
                        value: function(e) {
                            return te(te({}, e), {}, {
                                fields: e.fields.map((function(e) {
                                    return e.readOnly ? e : te(te({}, e), {}, {
                                        value: void 0
                                    })
                                }))
                            })
                        }
                    }, {
                        key: "resetSectionValues",
                        value: function(e) {
                            var t = this;
                            this.setState((function(r) {
                                return {
                                    form: r.form.map((function(r) {
                                        return r.id === e ? t.clearSection(r) : r
                                    })),
                                    values: r.form.reduce((function(t, r) {
                                        return r.id === e ? te(te({}, t), function(e) {
                                            return e && e.fields && e.fields.reduce((function(e, t) {
                                                return t.value ? te(te({}, e), {}, re({}, t.id, void 0)) : e
                                            }), {})
                                        }(r)) : t
                                    }), r.values)
                                }
                            }))
                        }
                    }, {
                        key: "resetValues",
                        value: function() {
                            var e = this;
                            this.setState((function(t) {
                                return {
                                    form: t.form.map(e.clearSection),
                                    values: oe
                                }
                            }))
                        }
                    }, {
                        key: "loadPersistenceValues",
                        value: function(e) {
                            var t = this;
                            this.setState({
                                values: e
                            }, (function() {
                                t.updateForm()
                            }))
                        }
                    }, {
                        key: "getFieldWithId",
                        value: function(e) {
                            return ae(this.state.form, e)
                        }
                    }, {
                        key: "checkEmptyState",
                        value: function(e) {
                            return !e || !Object.values(e).some((function(e) {
                                return Array.isArray(e) ? e.length : e
                            }))
                        }
                    }, {
                        key: "getPersistenceValues",
                        value: function() {
                            var e = this.state.form && this.getValues({
                                exclude: function(e) {
                                    return e.prefilledByLocation
                                }
                            });
                            return e instanceof Array ? e.reduce((function(e, t) {
                                var r = t.name,
                                    n = t.value;
                                return e[r] = e[r] || n, e
                            }), te({}, this.state.values)) : this.state.values
                        }
                    }, {
                        key: "renderValuesProvider",
                        value: function() {
                            var e = this.state.form;
                            return n.createElement(q.Provider, {
                                value: {
                                    form: e,
                                    onChange: this.onChange,
                                    isPristine: this.isPristine,
                                    getValues: this.getValues,
                                    reduceValuesByFieldId: this.reduceValuesByFieldId,
                                    resetValues: this.resetValues,
                                    resetSectionValues: this.resetSectionValues,
                                    deleteValue: this.deleteValue,
                                    getFieldWithId: this.getFieldWithId
                                }
                            }, this.props.children instanceof Function ? this.props.children() : this.props.children || null)
                        }
                    }, {
                        key: "render",
                        value: function() {
                            var e = this.props,
                                t = e.shouldPersistValues,
                                r = void 0 === t || t,
                                o = e.persistenceKey;
                            return r ? n.createElement(x.A, {
                                value: this.getPersistenceValues(),
                                name: o,
                                ttl: 36e5,
                                isEmptyState: this.checkEmptyState,
                                onPersistenceLoaded: this.loadPersistenceValues,
                                shouldReset: this.state.values === oe
                            }, this.renderValuesProvider()) : this.renderValuesProvider()
                        }
                    }], o && H(r.prototype, o), Object.defineProperty(r, "prototype", {
                        writable: !1
                    }), r;
                    var r, o
                }(n.Component);
            const fe = function(e) {
                    return n.createElement(d.Consumer, null, (function(t) {
                        var r = t.form;
                        return n.createElement(se, W({
                            form: r
                        }, e))
                    }))
                },
                pe = (0, n.createContext)();
            var de = r(54070),
                ve = r(85124),
                he = r.n(ve),
                ye = r(19071),
                me = r.n(ye),
                be = r(85497),
                ge = r.n(be),
                we = function(e) {
                    var t, r, n = (null == e ? void 0 : e.status) || (null == e || null === (t = e.response) || void 0 === t ? void 0 : t.status);
                    return n ? r = n : he()(e) ? r = e : (me()(e) || null != e && e.message) && (r = e.message), ge()(r)
                },
                Ee = (r(38139), r(56687)),
                Oe = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[.\!\/\\w]*))?)/gi;
            var Se = r(28533);
            const je = function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    r = t.block,
                    n = t.xOffset,
                    o = void 0 === n ? 0 : n,
                    i = t.yOffset,
                    a = void 0 === i ? 0 : i;
                if (e) {
                    var l = (0, Se.A)(e, {
                            block: r,
                            behavior: "smooth",
                            scrollMode: "if-needed"
                        }),
                        u = "scrollBehavior" in document.body.style;
                    Array.isArray(l) && l.forEach((function(e) {
                        var t = e.el,
                            r = e.top,
                            n = e.left;
                        r += a, n += o, t.scroll && u ? window.requestAnimationFrame((function() {
                            t.scroll({
                                top: r,
                                left: n,
                                behavior: "smooth"
                            })
                        })) : (t.scrollTop = r, t.scrollLeft = n)
                    }))
                }
            };
            var Pe = r(398);
            const Ae = function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 768,
                        r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 768;
                    if (!e) return "";
                    var n = document.createElement("canvas"),
                        o = n.getContext("2d"),
                        i = e.width / e.height;
                    return i > 1 ? (n.width = t > e.width ? e.width : t, n.height = n.width / i) : i < 1 ? (n.height = r > e.height ? e.height : r, n.width = n.height * i) : (n.width = t > e.width ? e.width : t, n.height = r > e.height ? e.height : r), o.drawImage(e, 0, 0, (0, Pe.A)(n.width, 2), (0, Pe.A)(n.height, 2)), n.toDataURL("image/png")
                },
                Ce = n.createContext();
            var ke = function() {
                    var e = (0, n.useContext)(q);
                    if (void 0 === e) throw new Error("useFormValues must be used within a FormValuesContext");
                    return e
                },
                xe = (r(42167), r(73211), r(46556)),
                Me = /[\d,.]+$/,
                Fe = function(e, t) {
                    var r, n;
                    switch (e.type) {
                        case "boolean":
                            n = xe.zM(), e.onlyTrueAllowed && (n = n.oneOf([!0])), r = e.value;
                            break;
                        case "text":
                        case "email":
                        case "paragraph":
                        case "dropdown":
                        case "url":
                            n = xe.Yj(), r = e.value && e.value.trim();
                            break;
                        case "phone":
                            n = xe.Yj().phone(), r = e.value;
                            break;
                        case "number":
                            n = xe.Yj().isNumber(), r = e.value;
                            break;
                        case "date":
                            n = xe.p6(), r = e.value;
                            break;
                        default:
                            return Promise.resolve()
                    }
                    return e.required && (n = n.required(t.t("form.validations.required"))), e.maxLength && (n = n.max(e.maxLength, t.t("form.validations.number.tooLong", {
                        maxLength: e.maxLength
                    }))), "email" === e.type && (n = n.email(t.t("form.validations.email.invalid"))), "url" === e.type && (n = n.url(t.t("form.validations.url.invalid"))), n.validate("" !== r ? r : void 0)
                };

            function De(e) {
                return De = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, De(e)
            }

            function Te() {
                return Te = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, Te.apply(null, arguments)
            }

            function ze(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Be(n.key), n)
                }
            }

            function Le(e, t, r) {
                return t = _e(t),
                    function(e, t) {
                        if (t && ("object" == De(t) || "function" == typeof t)) return t;
                        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                        return function(e) {
                            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return e
                        }(e)
                    }(e, Ie() ? Reflect.construct(t, r || [], _e(e).constructor) : t.apply(e, r))
            }

            function Ie() {
                try {
                    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (e) {}
                return (Ie = function() {
                    return !!e
                })()
            }

            function _e(e) {
                return _e = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                }, _e(e)
            }

            function Ne(e, t) {
                return Ne = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                    return e.__proto__ = t, e
                }, Ne(e, t)
            }

            function Ue(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function Ve(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? Ue(Object(r), !0).forEach((function(t) {
                        Re(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ue(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }

            function Re(e, t, r) {
                return (t = Be(t)) in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }

            function Be(e) {
                var t = function(e, t) {
                    if ("object" != De(e) || !e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var n = r.call(e, "string");
                        if ("object" != De(n)) return n;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(e)
                }(e);
                return "symbol" == De(t) ? t : t + ""
            }
            var Ge = function(e) {
                function t(e) {
                    var r;
                    return function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t), (r = Le(this, t, [e])).state = {
                        errors: {}
                    }, r.validate = r.validate.bind(r), r.setError = r.setError.bind(r), r.setErrors = r.setErrors.bind(r), r.resetError = r.resetError.bind(r), r.resetErrors = r.resetErrors.bind(r), r.clearSectionErrors = r.clearSectionErrors.bind(r), r.scrollToFieldWithError = r.scrollToFieldWithError.bind(r), r
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
                    }), t && Ne(e, t)
                }(t, e), r = t, o = [{
                    key: "resetErrors",
                    value: function() {
                        this.setState({
                            errors: {}
                        })
                    }
                }, {
                    key: "validate",
                    value: function(e) {
                        var t = this,
                            r = this.props,
                            n = r.handleAnalyticsEvent,
                            o = r.i18n;
                        return Fe(e, o).then((function() {
                            return t.setState({
                                errors: Ve(Ve({}, t.state.errors), {}, Re({}, e.id, void 0))
                            })
                        })).catch((function(r) {
                            return t.setState({
                                errors: Ve(Ve({}, t.state.errors), {}, Re({}, e.id, r.message))
                            }, (function() {
                                n && n(de.A.INLINE_VALIDATION_ERROR, {
                                    field: e.id,
                                    error: r.message
                                })
                            }))
                        }))
                    }
                }, {
                    key: "setErrors",
                    value: function(e) {
                        this.setState((function(t) {
                            return {
                                errors: Ve(Ve({}, t.errors), e)
                            }
                        }))
                    }
                }, {
                    key: "setError",
                    value: function(e, t) {
                        this.setState((function(r) {
                            return {
                                errors: Ve(Ve({}, r.errors), {}, Re({}, e, t))
                            }
                        }))
                    }
                }, {
                    key: "clearSectionErrors",
                    value: function(e) {
                        var t = this;
                        this.props.form.find((function(t) {
                            return t.id === e
                        })).fields.forEach((function(e) {
                            t.state.errors[e.id] && t.resetError(e.id)
                        }))
                    }
                }, {
                    key: "resetError",
                    value: function(e) {
                        this.setError(e, void 0)
                    }
                }, {
                    key: "scrollToFieldWithError",
                    value: function() {
                        var e = this.state.errors,
                            t = Object.keys(e).find((function(t) {
                                return Boolean(e[t])
                            })),
                            r = document.querySelector("[data-ui=".concat(t, "]"));
                        je(r)
                    }
                }, {
                    key: "render",
                    value: function() {
                        var e = this.state.errors,
                            t = this.props.form;
                        j()(e) || Object.keys(e).forEach((function(r) {
                            t = function(e, t, r) {
                                return e && e.map((function(e) {
                                    return e && Ve(Ve({}, e), {}, {
                                        fields: e.fields && e.fields.map((function(e) {
                                            return e.id === t ? Ve(Ve({}, e), {}, {
                                                error: r
                                            }, r && {
                                                "data-error": !0
                                            }) : e
                                        }))
                                    })
                                }))
                            }(t, r, e[r])
                        }));
                        var r = !j()(e) && Object.values(e).some(Boolean);
                        return n.createElement(Ce.Provider, {
                            value: {
                                form: t,
                                hasErrors: r,
                                validate: this.validate,
                                setError: this.setError,
                                setErrors: this.setErrors,
                                resetError: this.resetError,
                                resetErrors: this.resetErrors,
                                clearSectionErrors: this.clearSectionErrors,
                                scrollToFieldWithError: this.scrollToFieldWithError
                            }
                        }, this.props.children instanceof Function ? this.props.children({
                            form: t,
                            validate: this.validate
                        }) : this.props.children || null)
                    }
                }], o && ze(r.prototype, o), Object.defineProperty(r, "prototype", {
                    writable: !1
                }), r;
                var r, o
            }(n.PureComponent);
            const qe = function(e) {
                    return n.createElement(f.A.Consumer, null, (function(t) {
                        return n.createElement(pe.Consumer, null, (function(r) {
                            return n.createElement(q.Consumer, null, (function(o) {
                                var i = o.form;
                                return n.createElement(Ge, Te({
                                    form: i,
                                    handleAnalyticsEvent: r,
                                    i18n: t
                                }, e))
                            }))
                        }))
                    }))
                },
                Ye = (0, n.createContext)();
            var We = function() {
                var e = (0, n.useContext)(Ye);
                if (void 0 === e) throw new Error("useConfig must be used within a ConfigContext");
                return e
            };
            r(69386);
            const Ke = n.createContext();

            function $e(e, t) {
                return function(e) {
                    if (Array.isArray(e)) return e
                }(e) || function(e, t) {
                    var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                    if (null != r) {
                        var n, o, i, a, l = [],
                            u = !0,
                            c = !1;
                        try {
                            if (i = (r = r.call(e)).next, 0 === t) {
                                if (Object(r) !== r) return;
                                u = !1
                            } else
                                for (; !(u = (n = i.call(r)).done) && (l.push(n.value), l.length !== t); u = !0);
                        } catch (e) {
                            c = !0, o = e
                        } finally {
                            try {
                                if (!u && null != r.return && (a = r.return(), Object(a) !== a)) return
                            } finally {
                                if (c) throw o
                            }
                        }
                        return l
                    }
                }(e, t) || function(e, t) {
                    if (e) {
                        if ("string" == typeof e) return He(e, t);
                        var r = {}.toString.call(e).slice(8, -1);
                        return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? He(e, t) : void 0
                    }
                }(e, t) || function() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function He(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }
            const Xe = function(e) {
                var t = e.children,
                    r = $e((0, n.useState)(!1), 2),
                    o = r[0],
                    i = r[1],
                    a = $e((0, n.useState)(new Set), 2),
                    l = a[0],
                    u = a[1];
                n.useEffect((function() {
                    !o && l.size > 0 ? i(!0) : o && 0 === l.size && i(!1)
                }), [l]);
                var c = (0, n.useCallback)((function(e) {
                        e && u((function(t) {
                            return new Set(t.add(e))
                        }))
                    }), []),
                    s = (0, n.useCallback)((function(e) {
                        u((function(t) {
                            return e && t.delete(e) ? new Set(t) : t
                        }))
                    }), []),
                    f = (0, n.useMemo)((function() {
                        return {
                            processing: o,
                            startProcessing: c,
                            endProcessing: s
                        }
                    }), [o, c, s]);
                return n.createElement(Ke.Provider, {
                    value: f
                }, t instanceof Function ? t(f) : t)
            };
            var Ze = r(34122);
            const Je = n.createContext(),
                Qe = "styles--3Wy3-";

            function et(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }
            var tt = "danger",
                rt = "informational",
                nt = {
                    last: void 0
                };
            const ot = function(e) {
                    var t, r, i = e.children,
                        a = e.text,
                        l = e.flavor,
                        u = e.className,
                        c = void 0 === u ? Qe : u,
                        s = e._setTimeout,
                        f = void 0 === s ? setTimeout : s,
                        p = e._clearTimeout,
                        d = void 0 === p ? clearTimeout : p,
                        v = (t = (0, n.useState)({
                            message: a || "",
                            flavor: l || rt,
                            timeout: void 0
                        }), r = 2, function(e) {
                            if (Array.isArray(e)) return e
                        }(t) || function(e, t) {
                            var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                            if (null != r) {
                                var n, o, i, a, l = [],
                                    u = !0,
                                    c = !1;
                                try {
                                    if (i = (r = r.call(e)).next, 0 === t) {
                                        if (Object(r) !== r) return;
                                        u = !1
                                    } else
                                        for (; !(u = (n = i.call(r)).done) && (l.push(n.value), l.length !== t); u = !0);
                                } catch (e) {
                                    c = !0, o = e
                                } finally {
                                    try {
                                        if (!u && null != r.return && (a = r.return(), Object(a) !== a)) return
                                    } finally {
                                        if (c) throw o
                                    }
                                }
                                return l
                            }
                        }(t, r) || function(e, t) {
                            if (e) {
                                if ("string" == typeof e) return et(e, t);
                                var r = {}.toString.call(e).slice(8, -1);
                                return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? et(e, t) : void 0
                            }
                        }(t, r) || function() {
                            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                        }()),
                        h = v[0],
                        y = v[1],
                        m = (0, n.useCallback)((function(e, t) {
                            y({
                                message: e,
                                flavor: tt,
                                timeout: t
                            })
                        }), [y]),
                        b = (0, n.useCallback)((function() {
                            return y({
                                message: ""
                            })
                        }), [y]),
                        g = (0, n.useCallback)((function(e, t) {
                            y({
                                message: e,
                                flavor: rt,
                                timeout: t
                            })
                        }), [y]);
                    (0, n.useEffect)((function() {
                        nt.last && d(nt.last), delete nt.last, h.timeout && (nt.last = f(b, h.timeout))
                    }), [h, b]);
                    var w = h || {},
                        E = w.message,
                        O = w.flavor;
                    return n.createElement(Je.Provider, {
                        value: {
                            flashInfo: g,
                            flashError: m
                        }
                    }, E && n.createElement(Ze.A, {
                        className: (0, o.A)(Qe, "styles--13gMm", c),
                        danger: O === tt,
                        "data-ui": "flash-container",
                        informational: O === rt,
                        message: E,
                        onClose: b
                    }), i)
                },
                it = n.createContext();
            var at = r(68079),
                lt = r.n(at);

            function ut(e) {
                return ut = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, ut(e)
            }

            function ct(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function st(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? ct(Object(r), !0).forEach((function(t) {
                        ft(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ct(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }

            function ft(e, t, r) {
                return (t = function(e) {
                    var t = function(e, t) {
                        if ("object" != ut(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, "string");
                            if ("object" != ut(n)) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == ut(t) ? t : t + ""
                }(t)) in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }

            function pt(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }
            const dt = function(e) {
                var t, r, o = e.children,
                    i = (t = (0, n.useState)({}), r = 2, function(e) {
                        if (Array.isArray(e)) return e
                    }(t) || function(e, t) {
                        var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                        if (null != r) {
                            var n, o, i, a, l = [],
                                u = !0,
                                c = !1;
                            try {
                                if (i = (r = r.call(e)).next, 0 === t) {
                                    if (Object(r) !== r) return;
                                    u = !1
                                } else
                                    for (; !(u = (n = i.call(r)).done) && (l.push(n.value), l.length !== t); u = !0);
                            } catch (e) {
                                c = !0, o = e
                            } finally {
                                try {
                                    if (!u && null != r.return && (a = r.return(), Object(a) !== a)) return
                                } finally {
                                    if (c) throw o
                                }
                            }
                            return l
                        }
                    }(t, r) || function(e, t) {
                        if (e) {
                            if ("string" == typeof e) return pt(e, t);
                            var r = {}.toString.call(e).slice(8, -1);
                            return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? pt(e, t) : void 0
                        }
                    }(t, r) || function() {
                        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }()),
                    a = i[0],
                    l = i[1],
                    u = function(e, t) {
                        l(st(st({}, a), {}, ft({}, e, t ? st(st({}, a[e]), t) : null)))
                    },
                    c = function(e) {
                        return u(e)
                    },
                    s = function() {
                        if (!a) return !1;
                        var e = a.education && lt()(a.education).some((function(e) {
                                return !0 === e
                            })),
                            t = a.experience && lt()(a.experience).some((function(e) {
                                return !0 === e
                            }));
                        return st(st({}, e ? {
                            education: !0
                        } : {}), t ? {
                            experience: !0
                        } : {})
                    };
                return n.createElement(it.Provider, {
                    value: {
                        getGroupsWithUnsavedChanges: s,
                        informForGroupChanges: u,
                        resetGroupChanges: c
                    }
                }, o instanceof Function ? o({
                    getGroupsWithUnsavedChanges: s,
                    informForGroupChanges: u,
                    resetGroupChanges: c
                }) : o)
            };
            var vt = function() {
                var e = (0, n.useContext)(Ce);
                if (void 0 === e) throw new Error("useFormErrors must be used within a ErrorsContext");
                return e
            };
            const ht = n.createContext();
            var yt = r(57470),
                mt = r.n(yt),
                bt = r(47962),
                gt = r.n(bt),
                wt = r(66708);
            const Et = (0, n.createContext)();
            var Ot = function() {
                var e = (0, n.useContext)(Et);
                if (void 0 === e) throw new Error("useErrorLogger must be used within an ErrorLoggerContext");
                return e
            };

            function St(e) {
                return St = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, St(e)
            }

            function jt() {
                jt = function() {
                    return t
                };
                var e, t = {},
                    r = Object.prototype,
                    n = r.hasOwnProperty,
                    o = Object.defineProperty || function(e, t, r) {
                        e[t] = r.value
                    },
                    i = "function" == typeof Symbol ? Symbol : {},
                    a = i.iterator || "@@iterator",
                    l = i.asyncIterator || "@@asyncIterator",
                    u = i.toStringTag || "@@toStringTag";

                function c(e, t, r) {
                    return Object.defineProperty(e, t, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }), e[t]
                }
                try {
                    c({}, "")
                } catch (e) {
                    c = function(e, t, r) {
                        return e[t] = r
                    }
                }

                function s(e, t, r, n) {
                    var i = t && t.prototype instanceof m ? t : m,
                        a = Object.create(i.prototype),
                        l = new M(n || []);
                    return o(a, "_invoke", {
                        value: A(e, r, l)
                    }), a
                }

                function f(e, t, r) {
                    try {
                        return {
                            type: "normal",
                            arg: e.call(t, r)
                        }
                    } catch (e) {
                        return {
                            type: "throw",
                            arg: e
                        }
                    }
                }
                t.wrap = s;
                var p = "suspendedStart",
                    d = "suspendedYield",
                    v = "executing",
                    h = "completed",
                    y = {};

                function m() {}

                function b() {}

                function g() {}
                var w = {};
                c(w, a, (function() {
                    return this
                }));
                var E = Object.getPrototypeOf,
                    O = E && E(E(F([])));
                O && O !== r && n.call(O, a) && (w = O);
                var S = g.prototype = m.prototype = Object.create(w);

                function j(e) {
                    ["next", "throw", "return"].forEach((function(t) {
                        c(e, t, (function(e) {
                            return this._invoke(t, e)
                        }))
                    }))
                }

                function P(e, t) {
                    function r(o, i, a, l) {
                        var u = f(e[o], e, i);
                        if ("throw" !== u.type) {
                            var c = u.arg,
                                s = c.value;
                            return s && "object" == St(s) && n.call(s, "__await") ? t.resolve(s.__await).then((function(e) {
                                r("next", e, a, l)
                            }), (function(e) {
                                r("throw", e, a, l)
                            })) : t.resolve(s).then((function(e) {
                                c.value = e, a(c)
                            }), (function(e) {
                                return r("throw", e, a, l)
                            }))
                        }
                        l(u.arg)
                    }
                    var i;
                    o(this, "_invoke", {
                        value: function(e, n) {
                            function o() {
                                return new t((function(t, o) {
                                    r(e, n, t, o)
                                }))
                            }
                            return i = i ? i.then(o, o) : o()
                        }
                    })
                }

                function A(t, r, n) {
                    var o = p;
                    return function(i, a) {
                        if (o === v) throw Error("Generator is already running");
                        if (o === h) {
                            if ("throw" === i) throw a;
                            return {
                                value: e,
                                done: !0
                            }
                        }
                        for (n.method = i, n.arg = a;;) {
                            var l = n.delegate;
                            if (l) {
                                var u = C(l, n);
                                if (u) {
                                    if (u === y) continue;
                                    return u
                                }
                            }
                            if ("next" === n.method) n.sent = n._sent = n.arg;
                            else if ("throw" === n.method) {
                                if (o === p) throw o = h, n.arg;
                                n.dispatchException(n.arg)
                            } else "return" === n.method && n.abrupt("return", n.arg);
                            o = v;
                            var c = f(t, r, n);
                            if ("normal" === c.type) {
                                if (o = n.done ? h : d, c.arg === y) continue;
                                return {
                                    value: c.arg,
                                    done: n.done
                                }
                            }
                            "throw" === c.type && (o = h, n.method = "throw", n.arg = c.arg)
                        }
                    }
                }

                function C(t, r) {
                    var n = r.method,
                        o = t.iterator[n];
                    if (o === e) return r.delegate = null, "throw" === n && t.iterator.return && (r.method = "return", r.arg = e, C(t, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
                    var i = f(o, t.iterator, r.arg);
                    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
                    var a = i.arg;
                    return a ? a.done ? (r[t.resultName] = a.value, r.next = t.nextLoc, "return" !== r.method && (r.method = "next", r.arg = e), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y)
                }

                function k(e) {
                    var t = {
                        tryLoc: e[0]
                    };
                    1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t)
                }

                function x(e) {
                    var t = e.completion || {};
                    t.type = "normal", delete t.arg, e.completion = t
                }

                function M(e) {
                    this.tryEntries = [{
                        tryLoc: "root"
                    }], e.forEach(k, this), this.reset(!0)
                }

                function F(t) {
                    if (t || "" === t) {
                        var r = t[a];
                        if (r) return r.call(t);
                        if ("function" == typeof t.next) return t;
                        if (!isNaN(t.length)) {
                            var o = -1,
                                i = function r() {
                                    for (; ++o < t.length;)
                                        if (n.call(t, o)) return r.value = t[o], r.done = !1, r;
                                    return r.value = e, r.done = !0, r
                                };
                            return i.next = i
                        }
                    }
                    throw new TypeError(St(t) + " is not iterable")
                }
                return b.prototype = g, o(S, "constructor", {
                    value: g,
                    configurable: !0
                }), o(g, "constructor", {
                    value: b,
                    configurable: !0
                }), b.displayName = c(g, u, "GeneratorFunction"), t.isGeneratorFunction = function(e) {
                    var t = "function" == typeof e && e.constructor;
                    return !!t && (t === b || "GeneratorFunction" === (t.displayName || t.name))
                }, t.mark = function(e) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(e, g) : (e.__proto__ = g, c(e, u, "GeneratorFunction")), e.prototype = Object.create(S), e
                }, t.awrap = function(e) {
                    return {
                        __await: e
                    }
                }, j(P.prototype), c(P.prototype, l, (function() {
                    return this
                })), t.AsyncIterator = P, t.async = function(e, r, n, o, i) {
                    void 0 === i && (i = Promise);
                    var a = new P(s(e, r, n, o), i);
                    return t.isGeneratorFunction(r) ? a : a.next().then((function(e) {
                        return e.done ? e.value : a.next()
                    }))
                }, j(S), c(S, u, "Generator"), c(S, a, (function() {
                    return this
                })), c(S, "toString", (function() {
                    return "[object Generator]"
                })), t.keys = function(e) {
                    var t = Object(e),
                        r = [];
                    for (var n in t) r.push(n);
                    return r.reverse(),
                        function e() {
                            for (; r.length;) {
                                var n = r.pop();
                                if (n in t) return e.value = n, e.done = !1, e
                            }
                            return e.done = !0, e
                        }
                }, t.values = F, M.prototype = {
                    constructor: M,
                    reset: function(t) {
                        if (this.prev = 0, this.next = 0, this.sent = this._sent = e, this.done = !1, this.delegate = null, this.method = "next", this.arg = e, this.tryEntries.forEach(x), !t)
                            for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = e)
                    },
                    stop: function() {
                        this.done = !0;
                        var e = this.tryEntries[0].completion;
                        if ("throw" === e.type) throw e.arg;
                        return this.rval
                    },
                    dispatchException: function(t) {
                        if (this.done) throw t;
                        var r = this;

                        function o(n, o) {
                            return l.type = "throw", l.arg = t, r.next = n, o && (r.method = "next", r.arg = e), !!o
                        }
                        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                            var a = this.tryEntries[i],
                                l = a.completion;
                            if ("root" === a.tryLoc) return o("end");
                            if (a.tryLoc <= this.prev) {
                                var u = n.call(a, "catchLoc"),
                                    c = n.call(a, "finallyLoc");
                                if (u && c) {
                                    if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                                    if (this.prev < a.finallyLoc) return o(a.finallyLoc)
                                } else if (u) {
                                    if (this.prev < a.catchLoc) return o(a.catchLoc, !0)
                                } else {
                                    if (!c) throw Error("try statement without catch or finally");
                                    if (this.prev < a.finallyLoc) return o(a.finallyLoc)
                                }
                            }
                        }
                    },
                    abrupt: function(e, t) {
                        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                            var o = this.tryEntries[r];
                            if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                                var i = o;
                                break
                            }
                        }
                        i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);
                        var a = i ? i.completion : {};
                        return a.type = e, a.arg = t, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a)
                    },
                    complete: function(e, t) {
                        if ("throw" === e.type) throw e.arg;
                        return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), y
                    },
                    finish: function(e) {
                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                            var r = this.tryEntries[t];
                            if (r.finallyLoc === e) return this.complete(r.completion, r.afterLoc), x(r), y
                        }
                    },
                    catch: function(e) {
                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                            var r = this.tryEntries[t];
                            if (r.tryLoc === e) {
                                var n = r.completion;
                                if ("throw" === n.type) {
                                    var o = n.arg;
                                    x(r)
                                }
                                return o
                            }
                        }
                        throw Error("illegal catch attempt")
                    },
                    delegateYield: function(t, r, n) {
                        return this.delegate = {
                            iterator: F(t),
                            resultName: r,
                            nextLoc: n
                        }, "next" === this.method && (this.arg = e), y
                    }
                }, t
            }

            function Pt(e, t, r, n, o, i, a) {
                try {
                    var l = e[i](a),
                        u = l.value
                } catch (e) {
                    return void r(e)
                }
                l.done ? t(u) : Promise.resolve(u).then(n, o)
            }

            function At(e) {
                return function() {
                    var t = this,
                        r = arguments;
                    return new Promise((function(n, o) {
                        var i = e.apply(t, r);

                        function a(e) {
                            Pt(i, n, o, a, l, "next", e)
                        }

                        function l(e) {
                            Pt(i, n, o, a, l, "throw", e)
                        }
                        a(void 0)
                    }))
                }
            }

            function Ct(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function kt(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? Ct(Object(r), !0).forEach((function(t) {
                        xt(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ct(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }

            function xt(e, t, r) {
                return (t = function(e) {
                    var t = function(e, t) {
                        if ("object" != St(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, "string");
                            if ("object" != St(n)) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == St(t) ? t : t + ""
                }(t)) in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }
            r(88081), r(96654), r(44123), r(98716), r(75464);
            var Mt = function(e, t) {
                    var r = new FormData;
                    return r.append("Content-Type", e && e.type), Object.keys(t).forEach((function(e) {
                        return r.append(e, t[e])
                    })), r.append("file", e), r
                },
                Ft = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return mt().get(e, t && kt({}, t) || {}).then((function() {
                        return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).data
                    }))
                },
                Dt = function() {
                    var e = At(jt().mark((function e(t) {
                        var r, n, o = arguments;
                        return jt().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return r = o.length > 1 && void 0 !== o[1] ? o[1] : {}, n = o.length > 2 && void 0 !== o[2] ? o[2] : {}, e.abrupt("return", mt().post(t, r, n && kt({}, n) || {}).then((function() {
                                        return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).data
                                    })));
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }();
            const Tt = {
                downloadBlob: (zt = At(jt().mark((function e(t) {
                    var r, n = arguments;
                    return jt().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                return r = n.length > 1 && void 0 !== n[1] ? n[1] : {}, e.next = 3, Ft(t, kt(kt({}, r), {}, {
                                    responseType: "blob"
                                }));
                            case 3:
                                return e.abrupt("return", e.sent);
                            case 4:
                            case "end":
                                return e.stop()
                        }
                    }), e)
                }))), function(e) {
                    return zt.apply(this, arguments)
                }),
                uploadFile: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = e.fields,
                        r = e.url,
                        n = arguments.length > 2 ? arguments[2] : void 0;
                    return Dt(r, Mt(arguments.length > 1 ? arguments[1] : void 0, t), n)
                },
                fallbackUploadFIle: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = e.fields,
                        r = e.url,
                        n = arguments.length > 1 ? arguments[1] : void 0;
                    return fetch(r, kt(kt({}, arguments.length > 2 ? arguments[2] : void 0), {}, {
                        method: "POST",
                        body: Mt(n, t)
                    }))
                }
            };
            var zt;

            function Lt() {
                return Lt = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, Lt.apply(null, arguments)
            }
            var It, _t = null,
                Nt = mt().CancelToken,
                Ut = function() {
                    var e, t;
                    null !== (e = _t) && void 0 !== e && e.cancel && _t.cancel(), null !== (t = It) && void 0 !== t && t.abort && It.abort()
                };
            const Vt = function(e) {
                    var t = function() {
                            var e = (0, n.useContext)(p);
                            if (void 0 === e) throw new Error("useQuickApplyApi must be used within a QuickApplyApiContext");
                            return e
                        }().presignFile,
                        r = Ot();
                    return n.createElement(wt.A, Lt({
                        throwsError: !0,
                        onCancel: Ut,
                        presignAndUpload: function(e, n) {
                            return function(e) {
                                var t = e.presign,
                                    r = e.file,
                                    n = e.extras,
                                    o = void 0 === n ? {} : n,
                                    i = o.fieldId,
                                    a = o.uploadProgress,
                                    l = e.logError;
                                return t && t(i, {
                                    params: {
                                        contentType: r.type
                                    }
                                }).then((function() {
                                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                                        t = e.uploadPostUrl,
                                        n = void 0 === t ? {} : t,
                                        o = e.downloadUrl,
                                        i = void 0 === o ? "" : o;
                                    return function(e, t) {
                                        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                                            n = arguments.length > 3 ? arguments[3] : void 0;
                                        if (!e || j()(t)) return Promise.reject("unable to upload missing file");
                                        var o = r.uploadProgress;
                                        _t = Nt.source();
                                        var i, a = o && (i = o, function(e) {
                                            var t = e.loaded,
                                                r = e.total;
                                            return i({
                                                loaded: gt()(t, 1, .9 * r),
                                                total: r
                                            })
                                        });
                                        return Promise.resolve().then((function() {
                                            return a && a({
                                                loaded: 1,
                                                total: 100
                                            })
                                        })).then((function() {
                                            return Tt.uploadFile(t, e, {
                                                onUploadProgress: a,
                                                cancelToken: _t.token
                                            }).catch((function(r) {
                                                if (mt().isCancel(r)) throw r;
                                                return n("[ApplicationFormError][s3Uploader] Axios upload failed: ".concat(r.message || r.data || r, ", retrying using fetch")), It = new AbortController, Tt.fallbackUploadFIle(t, e, {
                                                    signal: It.signal
                                                }).then((function(e) {
                                                    return e.ok ? e : Promise.reject({
                                                        status: e.status,
                                                        message: e.statusText
                                                    })
                                                }))
                                            }))
                                        })).then((function() {
                                            return o && o({
                                                loaded: 100,
                                                total: 100
                                            })
                                        }))
                                    }(r, n, {
                                        uploadProgress: a
                                    }, l).then((function() {
                                        return i
                                    }))
                                })).catch((function(e) {
                                    var t;
                                    return mt().isCancel(e) || "AbortError" === (null == e ? void 0 : e.name) || null != e && null !== (t = e.error) && void 0 !== t && t.includes("AbortError") ? null : Promise.reject(e)
                                }))
                            }({
                                presign: t,
                                file: e,
                                extras: n,
                                logError: r
                            })
                        }
                    }, e))
                },
                Rt = n.createContext();

            function Bt() {
                return Bt = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, Bt.apply(null, arguments)
            }

            function Gt(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }
            var qt = function(e) {
                    return e
                },
                Yt = "avatar",
                Wt = function(e) {
                    var t, r, o = e.children,
                        i = e.findAvatarUsingEmail,
                        a = e.handleFileChange,
                        l = (t = (0, n.useState)(null), r = 2, function(e) {
                            if (Array.isArray(e)) return e
                        }(t) || function(e, t) {
                            var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                            if (null != r) {
                                var n, o, i, a, l = [],
                                    u = !0,
                                    c = !1;
                                try {
                                    if (i = (r = r.call(e)).next, 0 === t) {
                                        if (Object(r) !== r) return;
                                        u = !1
                                    } else
                                        for (; !(u = (n = i.call(r)).done) && (l.push(n.value), l.length !== t); u = !0);
                                } catch (e) {
                                    c = !0, o = e
                                } finally {
                                    try {
                                        if (!u && null != r.return && (a = r.return(), Object(a) !== a)) return
                                    } finally {
                                        if (c) throw o
                                    }
                                }
                                return l
                            }
                        }(t, r) || function(e, t) {
                            if (e) {
                                if ("string" == typeof e) return Gt(e, t);
                                var r = {}.toString.call(e).slice(8, -1);
                                return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Gt(e, t) : void 0
                            }
                        }(t, r) || function() {
                            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                        }()),
                        u = l[0],
                        c = l[1],
                        s = (0, f.s)(),
                        p = (0, n.useContext)(ht),
                        d = (0, n.useContext)(q),
                        v = d.getFieldWithId,
                        h = d.onChange,
                        y = vt().resetError,
                        m = function(e) {
                            return Tt.downloadBlob(e).then((function(t) {
                                var r = e && e.split("/").pop().split("?")[0];
                                return t.name = r || e, a && a(t, Yt)
                            })).catch(qt)
                        },
                        b = function(e) {
                            var t = e && e.value,
                                r = v(Yt);
                            r && !r.value && (c("fetching"), Fe(e, s).then((function() {
                                return p("find_avatar")
                            })).then((function(e) {
                                return i({
                                    email: t
                                }, {
                                    headers: {
                                        "recaptcha-token": e || ""
                                    }
                                })
                            })).then((function(e) {
                                if (e && e.email && e.email === t && h) return m(e.url).then((function() {
                                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
                                            url: null,
                                            name: null
                                        },
                                        t = e.url,
                                        r = void 0 === t ? null : t,
                                        n = e.name,
                                        o = void 0 === n ? null : n;
                                    r ? (c("done"), h(Yt, {
                                        url: r,
                                        name: o || r
                                    }), y(Yt)) : c(null)
                                }))
                            })).catch((function() {
                                return c(null)
                            })))
                        },
                        g = function() {
                            return "done" === u
                        },
                        w = function() {
                            return "fetching" === u
                        };
                    return n.createElement(Rt.Provider, {
                        value: {
                            isFetching: w,
                            isDone: g,
                            resetProcess: function() {
                                return c(null)
                            },
                            fetchAvatar: b,
                            fetchExternalAvatar: m
                        }
                    }, o instanceof Function ? o({
                        isFetching: w,
                        isDone: g,
                        fetchAvatar: b
                    }) : o)
                };
            const Kt = function(e) {
                    return n.createElement(Vt, null, (function() {
                        var t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).handleFileChange;
                        return n.createElement(Wt, Bt({
                            handleFileChange: t
                        }, e))
                    }))
                },
                $t = function(e) {
                    var t = e.children,
                        r = e.executeRecaptcha,
                        o = function(e) {
                            return r ? Promise.resolve().then((function() {
                                return r(e)
                            })) : Promise.resolve("disabled")
                        };
                    return n.createElement(ht.Provider, {
                        value: o
                    }, t instanceof Function ? t(o) : t || null)
                };
            var Ht = r(98496);

            function Xt(e, t) {
                return function(e) {
                    if (Array.isArray(e)) return e
                }(e) || function(e, t) {
                    var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                    if (null != r) {
                        var n, o, i, a, l = [],
                            u = !0,
                            c = !1;
                        try {
                            if (i = (r = r.call(e)).next, 0 === t) {
                                if (Object(r) !== r) return;
                                u = !1
                            } else
                                for (; !(u = (n = i.call(r)).done) && (l.push(n.value), l.length !== t); u = !0);
                        } catch (e) {
                            c = !0, o = e
                        } finally {
                            try {
                                if (!u && null != r.return && (a = r.return(), Object(a) !== a)) return
                            } finally {
                                if (c) throw o
                            }
                        }
                        return l
                    }
                }(e, t) || function(e, t) {
                    if (e) {
                        if ("string" == typeof e) return Zt(e, t);
                        var r = {}.toString.call(e).slice(8, -1);
                        return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Zt(e, t) : void 0
                    }
                }(e, t) || function() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function Zt(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }
            const Jt = n.createContext();

            function Qt(e) {
                return Qt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, Qt(e)
            }

            function er(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function tr(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? er(Object(r), !0).forEach((function(t) {
                        rr(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : er(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }

            function rr(e, t, r) {
                return (t = function(e) {
                    var t = function(e, t) {
                        if ("object" != Qt(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, "string");
                            if ("object" != Qt(n)) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == Qt(t) ? t : t + ""
                }(t)) in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }

            function nr(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }
            const or = function(e) {
                var t, r, o = e.children,
                    i = e.isTurnstileEnabled,
                    a = e.siteKey,
                    l = (0, n.useRef)("turnstile-container-".concat(Date.now().toString().substring(7))),
                    u = (0, n.useRef)(0),
                    c = (0, n.useRef)(null),
                    s = (t = (0, n.useState)(), r = 2, function(e) {
                        if (Array.isArray(e)) return e
                    }(t) || function(e, t) {
                        var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                        if (null != r) {
                            var n, o, i, a, l = [],
                                u = !0,
                                c = !1;
                            try {
                                if (i = (r = r.call(e)).next, 0 === t) {
                                    if (Object(r) !== r) return;
                                    u = !1
                                } else
                                    for (; !(u = (n = i.call(r)).done) && (l.push(n.value), l.length !== t); u = !0);
                            } catch (e) {
                                c = !0, o = e
                            } finally {
                                try {
                                    if (!u && null != r.return && (a = r.return(), Object(a) !== a)) return
                                } finally {
                                    if (c) throw o
                                }
                            }
                            return l
                        }
                    }(t, r) || function(e, t) {
                        if (e) {
                            if ("string" == typeof e) return nr(e, t);
                            var r = {}.toString.call(e).slice(8, -1);
                            return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? nr(e, t) : void 0
                        }
                    }(t, r) || function() {
                        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }()),
                    f = s[0],
                    p = s[1],
                    d = function(e) {
                        var t = e.shouldInjectScript,
                            r = Xt((0, n.useState)(Boolean(t && !window.turnstile)), 2),
                            o = r[0],
                            i = r[1],
                            a = Xt((0, n.useState)(Boolean(t && window.turnstile)), 2),
                            l = a[0],
                            u = a[1],
                            c = (0, n.useCallback)((function() {
                                (0, Ht.unstable_batchedUpdates)((function() {
                                    i(!1), u(!0)
                                }))
                            }), []),
                            s = (0, n.useCallback)((function() {
                                (0, Ht.unstable_batchedUpdates)((function() {
                                    i(!1), u(!1)
                                }))
                            }), []);
                        return (0, n.useEffect)((function() {
                            if (!window.turnstile && t) {
                                var e = document.getElementById("turnstile-script");
                                if (e) e.onload = c, e.onerror = s;
                                else {
                                    var r = window.document.createElement("script");
                                    r.type = "text/javascript", r.src = "https://challenges.cloudflare.com/turnstile/v0/api.js", r.async = !0, r.id = "turnstile-script", r.onload = c, r.onerror = s, window.document.head.appendChild(r)
                                }
                            }
                        }), [t]), {
                            isLoading: o,
                            isSuccess: l
                        }
                    }({
                        shouldInjectScript: Boolean(i && a)
                    }),
                    v = d.isLoading,
                    h = d.isSuccess,
                    y = (0, n.useCallback)((function() {
                        p(null), u.current = 0
                    }), []),
                    m = (0, n.useCallback)((function() {
                        return new Promise((function(e) {
                            if (h)
                                if (!f || window.turnstile.isExpired("#".concat(l.current))) {
                                    var t = {
                                        appearance: "interaction-only",
                                        sitekey: a,
                                        action: "application-form-submit",
                                        "before-interactive-callback": function() {
                                            var e = document.getElementById(l.current);
                                            e && (e.removeAttribute("hidden"), je(e))
                                        },
                                        callback: function(t) {
                                            p(t), e(t)
                                        },
                                        "error-callback": function(r) {
                                            if (u.current >= 2 || ! function(e) {
                                                    return /^(?!100|105|110100|110110|110200|110420|110430|110500|110510|120|200010|200100).*/.test(e)
                                                }(r)) return e("error_code_".concat(r));
                                            u.current = u.current + 1, window.turnstile.remove(c.current), c.current = window.turnstile.render("#".concat(l.current), tr(tr({}, t), {}, {
                                                action: "application-form-submit-retry-".concat(u.current)
                                            }))
                                        },
                                        "response-field": !1,
                                        retry: "never",
                                        theme: "light"
                                    };
                                    c.current = window.turnstile.render("#".concat(l.current), t)
                                } else e(f);
                            else e("")
                        }))
                    }), [h, a, f]),
                    b = (0, n.useMemo)((function() {
                        return {
                            containerId: l.current,
                            executeChallenge: m,
                            isScriptInjectionLoading: v,
                            isScriptInjectionSuccess: h,
                            siteKey: a,
                            resetChallengeToken: y
                        }
                    }), [m, v, h, a, y]);
                return (0, n.useEffect)((function() {
                    return function() {
                        var e;
                        null === (e = window.turnstile) || void 0 === e || e.remove("#".concat(l.current))
                    }
                }), []), n.createElement(Jt.Provider, {
                    value: b
                }, o instanceof Function ? o(b) : o || null)
            };
            r(70949), r(870);
            var ir = function() {
                    var e = (0, n.useContext)(Jt);
                    if (void 0 === e) throw new Error("useTurnstile must be used within a TurnstileContext");
                    return e
                },
                ar = function() {
                    var e = (0, n.useContext)(pe);
                    if (void 0 === e) throw new Error("useAnalytics must be used within a AnalyticsContext");
                    return e
                };
            const lr = n.createContext();

            function ur(e) {
                return ur = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, ur(e)
            }

            function cr(e, t) {
                return function(e) {
                    if (Array.isArray(e)) return e
                }(e) || function(e, t) {
                    var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                    if (null != r) {
                        var n, o, i, a, l = [],
                            u = !0,
                            c = !1;
                        try {
                            if (i = (r = r.call(e)).next, 0 === t) {
                                if (Object(r) !== r) return;
                                u = !1
                            } else
                                for (; !(u = (n = i.call(r)).done) && (l.push(n.value), l.length !== t); u = !0);
                        } catch (e) {
                            c = !0, o = e
                        } finally {
                            try {
                                if (!u && null != r.return && (a = r.return(), Object(a) !== a)) return
                            } finally {
                                if (c) throw o
                            }
                        }
                        return l
                    }
                }(e, t) || function(e, t) {
                    if (e) {
                        if ("string" == typeof e) return sr(e, t);
                        var r = {}.toString.call(e).slice(8, -1);
                        return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? sr(e, t) : void 0
                    }
                }(e, t) || function() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function sr(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }

            function fr(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function pr(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? fr(Object(r), !0).forEach((function(t) {
                        dr(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : fr(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }

            function dr(e, t, r) {
                return (t = br(t)) in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }

            function vr() {
                vr = function() {
                    return t
                };
                var e, t = {},
                    r = Object.prototype,
                    n = r.hasOwnProperty,
                    o = Object.defineProperty || function(e, t, r) {
                        e[t] = r.value
                    },
                    i = "function" == typeof Symbol ? Symbol : {},
                    a = i.iterator || "@@iterator",
                    l = i.asyncIterator || "@@asyncIterator",
                    u = i.toStringTag || "@@toStringTag";

                function c(e, t, r) {
                    return Object.defineProperty(e, t, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }), e[t]
                }
                try {
                    c({}, "")
                } catch (e) {
                    c = function(e, t, r) {
                        return e[t] = r
                    }
                }

                function s(e, t, r, n) {
                    var i = t && t.prototype instanceof m ? t : m,
                        a = Object.create(i.prototype),
                        l = new M(n || []);
                    return o(a, "_invoke", {
                        value: A(e, r, l)
                    }), a
                }

                function f(e, t, r) {
                    try {
                        return {
                            type: "normal",
                            arg: e.call(t, r)
                        }
                    } catch (e) {
                        return {
                            type: "throw",
                            arg: e
                        }
                    }
                }
                t.wrap = s;
                var p = "suspendedStart",
                    d = "suspendedYield",
                    v = "executing",
                    h = "completed",
                    y = {};

                function m() {}

                function b() {}

                function g() {}
                var w = {};
                c(w, a, (function() {
                    return this
                }));
                var E = Object.getPrototypeOf,
                    O = E && E(E(F([])));
                O && O !== r && n.call(O, a) && (w = O);
                var S = g.prototype = m.prototype = Object.create(w);

                function j(e) {
                    ["next", "throw", "return"].forEach((function(t) {
                        c(e, t, (function(e) {
                            return this._invoke(t, e)
                        }))
                    }))
                }

                function P(e, t) {
                    function r(o, i, a, l) {
                        var u = f(e[o], e, i);
                        if ("throw" !== u.type) {
                            var c = u.arg,
                                s = c.value;
                            return s && "object" == ur(s) && n.call(s, "__await") ? t.resolve(s.__await).then((function(e) {
                                r("next", e, a, l)
                            }), (function(e) {
                                r("throw", e, a, l)
                            })) : t.resolve(s).then((function(e) {
                                c.value = e, a(c)
                            }), (function(e) {
                                return r("throw", e, a, l)
                            }))
                        }
                        l(u.arg)
                    }
                    var i;
                    o(this, "_invoke", {
                        value: function(e, n) {
                            function o() {
                                return new t((function(t, o) {
                                    r(e, n, t, o)
                                }))
                            }
                            return i = i ? i.then(o, o) : o()
                        }
                    })
                }

                function A(t, r, n) {
                    var o = p;
                    return function(i, a) {
                        if (o === v) throw Error("Generator is already running");
                        if (o === h) {
                            if ("throw" === i) throw a;
                            return {
                                value: e,
                                done: !0
                            }
                        }
                        for (n.method = i, n.arg = a;;) {
                            var l = n.delegate;
                            if (l) {
                                var u = C(l, n);
                                if (u) {
                                    if (u === y) continue;
                                    return u
                                }
                            }
                            if ("next" === n.method) n.sent = n._sent = n.arg;
                            else if ("throw" === n.method) {
                                if (o === p) throw o = h, n.arg;
                                n.dispatchException(n.arg)
                            } else "return" === n.method && n.abrupt("return", n.arg);
                            o = v;
                            var c = f(t, r, n);
                            if ("normal" === c.type) {
                                if (o = n.done ? h : d, c.arg === y) continue;
                                return {
                                    value: c.arg,
                                    done: n.done
                                }
                            }
                            "throw" === c.type && (o = h, n.method = "throw", n.arg = c.arg)
                        }
                    }
                }

                function C(t, r) {
                    var n = r.method,
                        o = t.iterator[n];
                    if (o === e) return r.delegate = null, "throw" === n && t.iterator.return && (r.method = "return", r.arg = e, C(t, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
                    var i = f(o, t.iterator, r.arg);
                    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
                    var a = i.arg;
                    return a ? a.done ? (r[t.resultName] = a.value, r.next = t.nextLoc, "return" !== r.method && (r.method = "next", r.arg = e), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y)
                }

                function k(e) {
                    var t = {
                        tryLoc: e[0]
                    };
                    1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t)
                }

                function x(e) {
                    var t = e.completion || {};
                    t.type = "normal", delete t.arg, e.completion = t
                }

                function M(e) {
                    this.tryEntries = [{
                        tryLoc: "root"
                    }], e.forEach(k, this), this.reset(!0)
                }

                function F(t) {
                    if (t || "" === t) {
                        var r = t[a];
                        if (r) return r.call(t);
                        if ("function" == typeof t.next) return t;
                        if (!isNaN(t.length)) {
                            var o = -1,
                                i = function r() {
                                    for (; ++o < t.length;)
                                        if (n.call(t, o)) return r.value = t[o], r.done = !1, r;
                                    return r.value = e, r.done = !0, r
                                };
                            return i.next = i
                        }
                    }
                    throw new TypeError(ur(t) + " is not iterable")
                }
                return b.prototype = g, o(S, "constructor", {
                    value: g,
                    configurable: !0
                }), o(g, "constructor", {
                    value: b,
                    configurable: !0
                }), b.displayName = c(g, u, "GeneratorFunction"), t.isGeneratorFunction = function(e) {
                    var t = "function" == typeof e && e.constructor;
                    return !!t && (t === b || "GeneratorFunction" === (t.displayName || t.name))
                }, t.mark = function(e) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(e, g) : (e.__proto__ = g, c(e, u, "GeneratorFunction")), e.prototype = Object.create(S), e
                }, t.awrap = function(e) {
                    return {
                        __await: e
                    }
                }, j(P.prototype), c(P.prototype, l, (function() {
                    return this
                })), t.AsyncIterator = P, t.async = function(e, r, n, o, i) {
                    void 0 === i && (i = Promise);
                    var a = new P(s(e, r, n, o), i);
                    return t.isGeneratorFunction(r) ? a : a.next().then((function(e) {
                        return e.done ? e.value : a.next()
                    }))
                }, j(S), c(S, u, "Generator"), c(S, a, (function() {
                    return this
                })), c(S, "toString", (function() {
                    return "[object Generator]"
                })), t.keys = function(e) {
                    var t = Object(e),
                        r = [];
                    for (var n in t) r.push(n);
                    return r.reverse(),
                        function e() {
                            for (; r.length;) {
                                var n = r.pop();
                                if (n in t) return e.value = n, e.done = !1, e
                            }
                            return e.done = !0, e
                        }
                }, t.values = F, M.prototype = {
                    constructor: M,
                    reset: function(t) {
                        if (this.prev = 0, this.next = 0, this.sent = this._sent = e, this.done = !1, this.delegate = null, this.method = "next", this.arg = e, this.tryEntries.forEach(x), !t)
                            for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = e)
                    },
                    stop: function() {
                        this.done = !0;
                        var e = this.tryEntries[0].completion;
                        if ("throw" === e.type) throw e.arg;
                        return this.rval
                    },
                    dispatchException: function(t) {
                        if (this.done) throw t;
                        var r = this;

                        function o(n, o) {
                            return l.type = "throw", l.arg = t, r.next = n, o && (r.method = "next", r.arg = e), !!o
                        }
                        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                            var a = this.tryEntries[i],
                                l = a.completion;
                            if ("root" === a.tryLoc) return o("end");
                            if (a.tryLoc <= this.prev) {
                                var u = n.call(a, "catchLoc"),
                                    c = n.call(a, "finallyLoc");
                                if (u && c) {
                                    if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                                    if (this.prev < a.finallyLoc) return o(a.finallyLoc)
                                } else if (u) {
                                    if (this.prev < a.catchLoc) return o(a.catchLoc, !0)
                                } else {
                                    if (!c) throw Error("try statement without catch or finally");
                                    if (this.prev < a.finallyLoc) return o(a.finallyLoc)
                                }
                            }
                        }
                    },
                    abrupt: function(e, t) {
                        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                            var o = this.tryEntries[r];
                            if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                                var i = o;
                                break
                            }
                        }
                        i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);
                        var a = i ? i.completion : {};
                        return a.type = e, a.arg = t, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a)
                    },
                    complete: function(e, t) {
                        if ("throw" === e.type) throw e.arg;
                        return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), y
                    },
                    finish: function(e) {
                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                            var r = this.tryEntries[t];
                            if (r.finallyLoc === e) return this.complete(r.completion, r.afterLoc), x(r), y
                        }
                    },
                    catch: function(e) {
                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                            var r = this.tryEntries[t];
                            if (r.tryLoc === e) {
                                var n = r.completion;
                                if ("throw" === n.type) {
                                    var o = n.arg;
                                    x(r)
                                }
                                return o
                            }
                        }
                        throw Error("illegal catch attempt")
                    },
                    delegateYield: function(t, r, n) {
                        return this.delegate = {
                            iterator: F(t),
                            resultName: r,
                            nextLoc: n
                        }, "next" === this.method && (this.arg = e), y
                    }
                }, t
            }

            function hr(e, t, r, n, o, i, a) {
                try {
                    var l = e[i](a),
                        u = l.value
                } catch (e) {
                    return void r(e)
                }
                l.done ? t(u) : Promise.resolve(u).then(n, o)
            }

            function yr(e) {
                return function() {
                    var t = this,
                        r = arguments;
                    return new Promise((function(n, o) {
                        var i = e.apply(t, r);

                        function a(e) {
                            hr(i, n, o, a, l, "next", e)
                        }

                        function l(e) {
                            hr(i, n, o, a, l, "throw", e)
                        }
                        a(void 0)
                    }))
                }
            }

            function mr(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, br(n.key), n)
                }
            }

            function br(e) {
                var t = function(e, t) {
                    if ("object" != ur(e) || !e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var n = r.call(e, "string");
                        if ("object" != ur(n)) return n;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(e)
                }(e);
                return "symbol" == ur(t) ? t : t + ""
            }

            function gr(e, t, r) {
                return t = Er(t),
                    function(e, t) {
                        if (t && ("object" == ur(t) || "function" == typeof t)) return t;
                        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                        return function(e) {
                            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return e
                        }(e)
                    }(e, wr() ? Reflect.construct(t, r || [], Er(e).constructor) : t.apply(e, r))
            }

            function wr() {
                try {
                    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (e) {}
                return (wr = function() {
                    return !!e
                })()
            }

            function Er(e) {
                return Er = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                }, Er(e)
            }

            function Or(e, t) {
                return Or = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                    return e.__proto__ = t, e
                }, Or(e, t)
            }
            var Sr = function() {},
                jr = function(e) {
                    var t = e && Object.keys(e)[0];
                    return new Promise((function(e) {
                        t && je(document.querySelector('[data-ui="'.concat(t, '"]'))), e()
                    }))
                },
                Pr = function(e) {
                    function t(e) {
                        var r;
                        return function(e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t), (r = gr(this, t, [e])).state = {
                            success: void 0,
                            isSubmitting: !1
                        }, r.onSubmit = k()(r.onSubmit.bind(r), 500, {
                            leading: !0
                        }), r.toggleSubmitting = r.toggleSubmitting.bind(r), r.handleSuccessfulSubmission = r.handleSuccessfulSubmission.bind(r), r
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
                        }), t && Or(e, t)
                    }(t, e), r = t, o = [{
                        key: "toggleSubmitting",
                        value: function(e) {
                            this.setState({
                                isSubmitting: e
                            })
                        }
                    }, {
                        key: "handleSuccessfulSubmission",
                        value: (a = yr(vr().mark((function e(t) {
                            var r, n, o, i, a, l, u, c, s, f = this;
                            return vr().wrap((function(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return r = this.props, n = r.form, o = r.resetForm, i = void 0 === o ? Sr : o, a = r.resetFormErrors, l = void 0 === a ? Sr : a, u = r.shouldResetFormOnSuccessfulSubmission, c = r.updateInitialFormStructure, s = void 0 === c ? Sr : c, e.abrupt("return", new Promise((function(e) {
                                            f.setState({
                                                success: t
                                            }, (function() {
                                                u ? i() : s(n), l(), e(t)
                                            }))
                                        })));
                                    case 2:
                                    case "end":
                                        return e.stop()
                                }
                            }), e, this)
                        }))), function(e) {
                            return a.apply(this, arguments)
                        })
                    }, {
                        key: "onSubmit",
                        value: (i = yr(vr().mark((function e(t) {
                            var r, n, o, i, a, l, u, c, s, f, p, d, v, h, y, m, b, g, w, E, O, S, P, A, C, k, x, M, F, D = this;
                            return vr().wrap((function(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        if (t.preventDefault(), r = this.props, n = r.executeRecaptcha, o = r.executeTurnstile, i = r.flashError, a = void 0 === i ? Sr : i, l = r.getFormValues, u = void 0 === l ? Sr : l, c = r.getGroupsWithUnsavedChanges, s = void 0 === c ? Sr : c, f = r.handleAnalyticsEvent, p = void 0 === f ? Sr : f, d = r.hasErrors, v = r.i18n, h = r.onError, y = void 0 === h ? Sr : h, m = r.onSuccess, b = void 0 === m ? Sr : m, g = r.resetTurnstileToken, w = void 0 === g ? Sr : g, E = r.scrollToFieldWithError, O = void 0 === E ? Sr : E, S = r.setFormErrors, P = void 0 === S ? Sr : S, A = r.submit, !d) {
                                            e.next = 5;
                                            break
                                        }
                                        return O(), e.abrupt("return");
                                    case 5:
                                        if (C = s && s(), j()(C)) {
                                            e.next = 10;
                                            break
                                        }
                                        return a(v.t("form.submit.groupUnsavedChanges")), jr(C), e.abrupt("return");
                                    case 10:
                                        return this.toggleSubmitting(!0), p(de.A.FORM_SUBMIT), e.next = 14, n("submit_form").catch(Sr);
                                    case 14:
                                        return k = e.sent, e.next = 17, o().catch(Sr);
                                    case 17:
                                        return x = e.sent, a(""), M = u() || [], F = pr(pr({}, x ? {
                                            "X-TURNSTILE-TOKEN": x
                                        } : {}), {}, {
                                            "recaptcha-token": k || ""
                                        }), e.abrupt("return", A(M, {
                                            headers: F
                                        }).then((function(e) {
                                            return D.handleSuccessfulSubmission(e)
                                        })).then((function(e) {
                                            p(de.A.FORM_SUBMIT_SUCCESS), b(e)
                                        })).catch((function(e) {
                                            var t;
                                            y();
                                            var r = we(e);
                                            switch (w(), r) {
                                                case "400":
                                                case "422":
                                                    var n = (null == e || null === (t = e.response) || void 0 === t ? void 0 : t.data) || (null == e ? void 0 : e.data);
                                                    if (n) return a(v.t("form.submit.validationError")), Object.entries(n).forEach((function(e) {
                                                        var t = cr(e, 2),
                                                            r = t[0],
                                                            n = t[1];
                                                        p(de.A.FORM_SUBMIT_SERVER_VALIDATION_ERROR, {
                                                            field: r,
                                                            error: n
                                                        })
                                                    })), jr(n).then((function() {
                                                        return P(n)
                                                    }));
                                                    p(de.A.FORM_SUBMIT_SERVER_VALIDATION_ERROR);
                                                case "409":
                                                    a(v.t("form.submit.turnstileError"));
                                                    break;
                                                default:
                                                    return a(v.t("form.submit.error"))
                                            }
                                        })).finally((function() {
                                            return D.toggleSubmitting(!1)
                                        })));
                                    case 23:
                                    case "end":
                                        return e.stop()
                                }
                            }), e, this)
                        }))), function(e) {
                            return i.apply(this, arguments)
                        })
                    }, {
                        key: "render",
                        value: function() {
                            var e = this.state.isSubmitting,
                                t = this.props,
                                r = t.isProcessing,
                                o = t.children,
                                i = {
                                    isSubmitDisabled: r || e,
                                    isSubmitting: e,
                                    onSubmit: this.onSubmit
                                };
                            return n.createElement(lr.Provider, {
                                value: i
                            }, o)
                        }
                    }], o && mr(r.prototype, o), Object.defineProperty(r, "prototype", {
                        writable: !1
                    }), r;
                    var r, o, i, a
                }(n.Component);
            const Ar = function(e) {
                var t = e.submit,
                    r = e.shouldResetFormOnSuccessfulSubmission,
                    o = e.onSuccess,
                    i = e.onError,
                    a = e.children,
                    l = (0, f.s)(),
                    u = M().updateForm,
                    c = ke(),
                    s = c.form,
                    p = c.getValues,
                    d = c.reduceValuesByFieldId,
                    v = c.resetValues,
                    h = vt(),
                    y = h.setErrors,
                    m = h.resetErrors,
                    b = h.hasErrors,
                    g = h.scrollToFieldWithError,
                    w = function() {
                        var e = (0, n.useContext)(Je);
                        if (void 0 === e) throw new Error("useFlash must be used within a FlashContext");
                        return e
                    }(),
                    E = w.flashError,
                    O = function() {
                        var e = (0, n.useContext)(ht);
                        if (void 0 === e) throw new Error("useRecaptcha must be used within a RecaptchaContext");
                        return e
                    }(),
                    S = ir(),
                    j = S.executeChallenge,
                    P = S.resetChallengeToken,
                    A = function() {
                        var e = (0, n.useContext)(it);
                        if (void 0 === e) throw new Error("useUnsavedChangesNotifier must be used within a UnsavedChangesNotifierContext");
                        return e
                    }().getGroupsWithUnsavedChanges,
                    C = function() {
                        var e = (0, n.useContext)(Ke);
                        if (void 0 === e) throw new Error("useProcessNotifier must be used within a ProcessNotifierContext");
                        return e
                    }().processing,
                    k = ar(),
                    x = Ot();
                return n.createElement(Pr, {
                    executeRecaptcha: O,
                    executeTurnstile: j,
                    resetTurnstileToken: P,
                    flashError: E,
                    form: s,
                    getFormValues: p,
                    getGroupsWithUnsavedChanges: A,
                    handleAnalyticsEvent: k,
                    hasErrors: b,
                    i18n: l,
                    isProcessing: C,
                    logError: x,
                    onError: i,
                    onSuccess: o,
                    reduceFormFieldValuesByFieldId: d,
                    resetForm: v,
                    resetFormErrors: m,
                    scrollToFieldWithError: g,
                    setFormErrors: y,
                    shouldResetFormOnSuccessfulSubmission: r,
                    submit: t,
                    updateInitialFormStructure: u
                }, a)
            };
            var Cr = function() {
                    var e = (0, n.useContext)(lr);
                    if (void 0 === e) throw new Error("useFormSubmit must be used within a FormSubmitContext");
                    return e
                },
                kr = Object.freeze(["address"]);
            const xr = function(e) {
                var t = e.children,
                    r = e.dropboxAppKey,
                    o = e.executeRecaptcha,
                    i = e.findAvatarUsingEmail,
                    a = e.getUploadedCVDetails,
                    l = e.googleApiConfig,
                    u = e.handleAnalyticsEvent,
                    c = e.i18n,
                    s = e.isTurnstileEnabled,
                    d = e.isUploadCvFromGoogleDriveEnabled,
                    v = e.jobShortcode,
                    h = e.logError,
                    y = e.onError,
                    m = e.onSuccess,
                    b = e.onUsedUploadedCvDetails,
                    g = e.presignFile,
                    w = e.sections,
                    E = e.shouldPersistValues,
                    S = e.shouldPropagateErrors,
                    j = e.shouldResetFormOnSuccessfulSubmission,
                    P = e.submit,
                    A = e.turnstileSiteKey,
                    C = (0, n.useMemo)((function() {
                        return {
                            dropboxAppKey: r,
                            googleApi: l,
                            isUploadCvFromGoogleDriveEnabled: d,
                            shouldPropagateErrors: S
                        }
                    }), [r, l, d, S]),
                    k = (0, n.useMemo)((function() {
                        return {
                            getUploadedCVDetails: a,
                            onUsedUploadedCvDetails: b,
                            presignFile: g
                        }
                    }), [a, b, g]),
                    x = (0, n.useMemo)((function() {
                        return E && (null == w ? void 0 : w.every((function(e) {
                            return e.fields.filter((function(e) {
                                return !kr.includes(e.id)
                            })).every((function(e) {
                                return !e.value
                            }))
                        })))
                    }), [E, w]);
                return n.createElement(Ye.Provider, {
                    value: C
                }, n.createElement(f.A.Provider, {
                    value: c
                }, n.createElement(p.Provider, {
                    value: k
                }, n.createElement(pe.Provider, {
                    value: u
                }, n.createElement(Et.Provider, {
                    value: h
                }, n.createElement(ot, null, n.createElement(Xe, null, n.createElement(O, {
                    sections: w
                }, n.createElement(fe, {
                    shouldPersistValues: x,
                    persistenceKey: v
                }, n.createElement(qe, null, n.createElement(dt, null, n.createElement($t, {
                    executeRecaptcha: o
                }, n.createElement(or, {
                    isTurnstileEnabled: s,
                    siteKey: A
                }, n.createElement(Ar, {
                    submit: P,
                    shouldResetFormOnSuccessfulSubmission: j,
                    onSuccess: m,
                    onError: y
                }, n.createElement(Kt, {
                    findAvatarUsingEmail: i
                }, t)))))))))))))))
            };
            var Mr = r(90783);
            var Fr = function() {
                var e = (0, f.s)();
                return n.createElement("span", {
                    className: "styles--332ku"
                }, n.createElement(Mr.A, {
                    danger: !0
                }, "*"), " ", n.createElement(Mr.A, null, e.t("form.hints.required")))
            };
            const Dr = (0, n.memo)(Fr);

            function Tr(e) {
                return Tr = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, Tr(e)
            }
            var zr = ["children"];

            function Lr() {
                return Lr = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, Lr.apply(null, arguments)
            }

            function Ir(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, _r(n.key), n)
                }
            }

            function _r(e) {
                var t = function(e, t) {
                    if ("object" != Tr(e) || !e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var n = r.call(e, "string");
                        if ("object" != Tr(n)) return n;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(e)
                }(e);
                return "symbol" == Tr(t) ? t : t + ""
            }

            function Nr(e, t, r) {
                return t = Vr(t),
                    function(e, t) {
                        if (t && ("object" == Tr(t) || "function" == typeof t)) return t;
                        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                        return function(e) {
                            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return e
                        }(e)
                    }(e, Ur() ? Reflect.construct(t, r || [], Vr(e).constructor) : t.apply(e, r))
            }

            function Ur() {
                try {
                    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (e) {}
                return (Ur = function() {
                    return !!e
                })()
            }

            function Vr(e) {
                return Vr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                }, Vr(e)
            }

            function Rr(e, t) {
                return Rr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                    return e.__proto__ = t, e
                }, Rr(e, t)
            }
            var Br = function() {},
                Gr = function(e) {
                    function t(e) {
                        var r;
                        return function(e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t), (r = Nr(this, t, [e])).state = {
                            error: e.error || void 0
                        }, r.clearError = r.clearError.bind(r), r
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
                        }), t && Rr(e, t)
                    }(t, e), r = t, (n = [{
                        key: "componentDidCatch",
                        value: function(e, t) {
                            var r, n, o = this.props.logError,
                                i = void 0 === o ? Br : o,
                                a = null == e || null === (r = e.response) || void 0 === r ? void 0 : r.status,
                                l = null == e || null === (n = e.response) || void 0 === n ? void 0 : n.data;
                            if (422 !== a || "Failed to parse resume." !== l) {
                                var u = e.message || e.data || e.error || ("string" == typeof e ? e : JSON.stringify(e));
                                i("[ApplicationFormError] ".concat(u), t)
                            }
                            this.setState({
                                error: e
                            })
                        }
                    }, {
                        key: "clearError",
                        value: function() {
                            this.setState({
                                error: void 0
                            })
                        }
                    }, {
                        key: "render",
                        value: function() {
                            var e = this.state.error,
                                t = this.props,
                                r = t.shouldHandleError,
                                n = t.shouldPropagateErrors;
                            if (e && n && r && !r(e)) throw e;
                            return this.props.children({
                                error: e,
                                clearError: this.clearError,
                                networkErrorStatus: we(e)
                            })
                        }
                    }]) && Ir(r.prototype, n), Object.defineProperty(r, "prototype", {
                        writable: !1
                    }), r;
                    var r, n
                }(n.Component);
            const qr = function(e) {
                var t = e.children,
                    r = function(e, t) {
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
                    }(e, zr),
                    o = Ot(),
                    i = We().shouldPropagateErrors;
                return n.createElement(Gr, Lr({
                    logError: o,
                    shouldPropagateErrors: i
                }, r), t)
            };
            r(18623), r(60159), r(7511);
            var Yr = r(19266),
                Wr = r(4813),
                Kr = function(e) {
                    return "avatar" === e
                };

            function $r(e) {
                return $r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, $r(e)
            }

            function Hr(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function Xr(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? Hr(Object(r), !0).forEach((function(t) {
                        Zr(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Hr(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }

            function Zr(e, t, r) {
                return (t = function(e) {
                    var t = function(e, t) {
                        if ("object" != $r(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, "string");
                            if ("object" != $r(n)) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == $r(t) ? t : t + ""
                }(t)) in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }
            var Jr = function(e, t) {
                    switch (e) {
                        case "500":
                        case "502":
                        case "503":
                        case "504":
                            return t.t("form.quickApply.alert.useDifferentFile");
                        case "network_error":
                            return t.t("form.quickApply.alert.offline");
                        default:
                            return t.t("form.quickApply.alert.parseFailure")
                    }
                },
                Qr = function(e) {
                    return (null == e ? void 0 : e.flatMap) && e.flatMap((function(e) {
                        return e && e.fields
                    })).find((function(e) {
                        return Kr(null == e ? void 0 : e.id)
                    }))
                },
                en = function(e) {
                    var t = e.form,
                        r = e.value;
                    return t.map((function(e) {
                        var t;
                        return e && Xr(Xr({}, e), {}, {
                            fields: null == e || null === (t = e.fields) || void 0 === t ? void 0 : t.map((function(e) {
                                return Kr(null == e ? void 0 : e.id) ? Xr(Xr({}, e), {}, {
                                    value: r
                                }) : e
                            }))
                        })
                    }))
                },
                tn = r(81396),
                rn = r.n(tn),
                nn = function() {},
                on = function(e) {
                    return e.then((function(e) {
                        var t = e.default.id;
                        return function(e) {
                            return n.createElement("svg", e, n.createElement("use", {
                                xlinkHref: "#".concat(t)
                            }))
                        }
                    })).catch(nn)
                },
                an = function(e, t) {
                    return rn()({
                        loader: function() {
                            return t
                        },
                        loading: (r = e, function() {
                            return n.createElement("svg", {
                                id: r
                            })
                        })
                    });
                    var r
                },
                ln = (an("empty", on(r.e(8909).then(r.bind(r, 20654)))), an("loader", on(r.e(5423).then(r.bind(r, 95826)))), an("thunder", on(r.e(5760).then(r.bind(r, 59433))))),
                un = an("pencil", on(r.e(5875).then(r.bind(r, 30053)))),
                cn = (an("refresh", on(r.e(5875).then(r.bind(r, 1117)))), an("trash", on(r.e(5875).then(r.bind(r, 75584))))),
                sn = an("bulb", on(Promise.resolve().then(r.bind(r, 23187)))),
                fn = an("warning", on(r.e(5875).then(r.bind(r, 80941))));
            an("check", on(r.e(5875).then(r.bind(r, 75070))));

            function pn(e) {
                return pn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, pn(e)
            }

            function dn(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function vn(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? dn(Object(r), !0).forEach((function(t) {
                        hn(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : dn(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }

            function hn(e, t, r) {
                return (t = function(e) {
                    var t = function(e, t) {
                        if ("object" != pn(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, "string");
                            if ("object" != pn(n)) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == pn(t) ? t : t + ""
                }(t)) in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }
            var yn = function(e) {
                var t = e.title,
                    r = e.fileTypes,
                    o = void 0 === r ? [] : r,
                    i = (0, f.s)(),
                    a = function(e, t) {
                        var r, n = null !== (r = Intl) && void 0 !== r && r.ListFormat ? new Intl.ListFormat(t, {
                            type: "disjunction"
                        }).format(e) : e.join(", ");
                        return {
                            fileTypes: e,
                            fileTypesString: n
                        }
                    }(o, i.language);
                return n.createElement("div", {
                    className: "styles--VzPaX"
                }, n.createElement("div", null, n.createElement(ln, null), n.createElement("strong", null, t || i.t("form.quickApply.title"))), n.createElement("p", null, i.t("form.quickApply.text", vn(vn({}, a), {}, {
                    count: o.length,
                    joinArrays: ", "
                }))))
            };
            const mn = (0, n.memo)(yn);
            var bn = r(75506),
                gn = r(3762),
                wn = r(18987);
            const En = "styles--3u7Cq",
                On = function() {
                    return n.createElement("svg", {
                        className: En,
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "132",
                        height: "122",
                        viewBox: "0 0 132 122"
                    }, n.createElement("g", {
                        fill: "none",
                        fillRule: "nonzero"
                    }, n.createElement("g", null, n.createElement("path", {
                        fill: "#e7ecf3",
                        d: "M123.8 79.9c2.1-4.1 3.8-8.3 5.1-12.6 3.4-11.2 3.5-23.5-1.6-34.2-4.2-8.7-11.4-16.3-20.4-20-4.6-1.9-9.6-2.7-14.6-2.2-10.1 1-17.5 7.5-25.8 12.6-7.1 4.3-14 5.4-22.2 3.9-6-1-11.8-2.9-17.9-3.2-7.6-.4-15.1 2.3-19.7 8.6C1.3 40.2-1.4 52 2.4 60.6c3.2 7.3 9.9 9.1 16.3 12.7 5.8 3.3 10.6 8.4 13.3 14.6 4.8 11 7.9 22.8 18.9 29.3 20.4 12 46.3-3.6 60.2-18.8 1-1.1 1.9-2.2 2.8-3.3 3.7-4.8 7.1-9.9 9.9-15.2z"
                    }), n.createElement("animate", {
                        attributeType: "CSS",
                        attributeName: "opacity",
                        from: "1",
                        to: "1",
                        values: "1; 0.8; 1",
                        keyTimes: "0; 0.5; 1",
                        dur: "4s",
                        repeatCount: "indefinite"
                    })), n.createElement("path", {
                        fill: "#919bab",
                        d: "M111.1 59.5h-9.5V69h9.5-18.8v9.5h-9.5v-19H54.3v19h9.5-19v-19h-9.5V69h-9.5v19h9.5-9.5v9.5h95V88h-9.5 9.5V59.5h-9.7zM82.7 88h-9.5 9.5z"
                    }), n.createElement("path", {
                        fill: "#98A4AF",
                        d: "M25.8 78.5h9.5V88h-9.5zM54.2 69h9.5v9.5h-9.5zM73.2 78.5h9.5V88h-9.5zM101.6 59.5h9.5V69h-9.5zM111.1 78.5h9.5V88h-9.5zM44.8 88h9.5v9.5h-9.5z"
                    }), n.createElement("g", {
                        fill: "#313b46"
                    }, n.createElement("path", {
                        d: "M115.6 87.1c0-.1-.1-.1-.1 0v.1l.1.1v-.2zM116.4 90.1l-.1.1v.1h.1v-.1c.1 0 .1 0 0-.1zM117.8 83h.1v-.1c0-.1-.1-.1-.1-.1l-.1.1.1.1zM116 80.9s-.1 0 0 0l-.1-.1V81.1h.1V81v-.1zM117.7 80.8c.1 0 .1 0 0 0h.1v-.1h-.1-.1v.1c.1-.2.1-.1.1 0 0-.1 0-.1 0 0zM117.6 88.5c.1 0 .1 0 0 0l.1.1v-.1l-.1-.1h-.1l.1.1zM116.2 83.6h-.1-.1s-.1 0 0 .1c0 0 0 .1.1.1h.1v.1c0 .1.1.1.1.1v-.1-.1l-.1-.2zM118.9 90.4c-.1 0-.1.1 0 0l-.1.1h.1c.1 0 .1 0 0-.1l.1.1-.1-.1zM117.5 85.9h-.1v.2h.2l.1-.1c-.1-.1-.1-.1-.2-.1zM119.3 92.6c-.1 0-.1 0 0 0h-.2v.1h.1v-.1h.1zM116.1 89c-.1 0-.1.1-.1.1h.1c0 .1.1.1 0-.1zM115.4 85h-.1V85.3h.1V85zM119.6 83.8c0-.1 0-.1 0 0l-.1-.1-.1.1v.1h.1l.1-.1zM119.1 81.8h-.1s-.1 0-.1.1v.1s0 .1.1.1h.1V82v-.2zM118.6 81.9h-.1v.2h.1c.1 0 .1-.1 0-.2.1.1.1.1 0 0zM119.8 87s0-.1 0 0l.1-.2v-.1h-.2-.1v.1h.1c0 .2 0 .2.1.2-.1 0-.1 0 0 0zM120.4 85c.1-.1.1-.1 0-.1 0 0-.1-.1-.1 0l-.1.1h.2c-.1 0 0 0 0 0zM119.3 79.3s0-.1 0 0l-.1-.1h-.1v.1c.1.1.1.1.2 0 0 .1 0 .1 0 0v.1-.1zM112.7 96.7h-.1v.1h.1c.1 0 .1-.1 0-.1zM110.2 85.7c-.1.1 0 .1 0 .2h.1v-.2h-.1zM111 86.2c-.1.1-.1.1 0 0-.1.1-.1.1 0 0l-.1.1v.1h.2s0-.1-.1-.2c0 .1 0 .1 0 0zM113.4 85.7l-.1-.1v.1c0 .1 0 .1.1 0-.1.1 0 .1 0 0zM114.7 86.4h-.1s-.1 0-.1.1v.1h.2v-.2zM112.7 85.5c0-.1 0-.1 0 0 .1-.1.1-.1 0 0 .1-.1.1-.1 0 0 .1-.1.1-.2 0-.2h-.1v.1c0 .1 0 .1.1.1-.1 0-.1 0 0 0zM114.8 88.3c-.1 0-.1.1-.2.1v.1l.1.1h.1v-.1-.1c.1-.1.1-.1 0-.1.1 0 .1 0 0 0zM117.1 91.6c.1 0 .1 0 0 0h.1v-.1h-.2c.1 0 .1.1.1.1zM118.6 92.2c.1.1.1.1.2.1v-.1c-.1-.1-.2 0-.2 0zM117.7 91.1c0-.1 0-.1-.1-.1h-.1v.1h.2c-.1 0-.1 0 0 0zM112.2 88.4h.1s0-.1-.1-.1h-.1c0 .1 0 .1.1.1-.1 0-.1 0 0 0zM114.9 89.7h-.1v.1s.1.1.1 0v-.1zM113.6 89.2v-.1h-.1v.1c.1.1.1.1.1 0zM114.4 84.8h.1v-.1h-.1-.1v.1h.1c-.1 0 0 0 0 0zM111.5 92.2l.1-.1V92h-.1v.2zM108.7 91.9h-.1v.2h.2V92l-.1-.1c.1 0 .1 0 0 0zM109.9 90.6s.1 0 0 0c.1-.1.1-.1 0 0 .1-.1.1-.1 0 0l.1-.1v-.1l-.1-.1h-.1-.1v.1l.2.2c-.1 0-.1 0 0 0zM115.1 96.3h.1v-.1-.1h-.1-.1v.1l.1.1zM110.7 93.7h-.1l-.1.1v.1h.1l.1-.1v.2h0v-.1-.1c.1-.1 0-.1 0-.1zM117.3 96.8v.1h.1v-.1h-.1zM119.2 86l-.1.1v.1h.2c.1-.1 0-.1-.1-.2.1.1.1.1 0 0 .1.1.1 0 0 0 .1 0 .1 0 0 0zM116.5 84.8s.1 0 0 0c.1 0 .1-.1 0 0v-.2h-.1l-.1.1v.1h.1c.1.1.1.1.1 0v.1-.1zM114.1 86.3c.1 0 .1 0 0 0h.1l.1-.1v-.1h-.2v.2c0-.1 0 0 0 0zM113.2 94.4c-.1 0-.1.1-.1.1v.1h.1s.1 0 .1-.1v-.1h-.1zM118.5 95.5c0 .1 0 .1 0 0 0 .1.1.1.1.1h.2v-.1-.1c-.2 0-.3 0-.3.1zM119.2 95.8h-.1v.2h.2v-.2h-.1c.1 0 .1 0 0 0zM111 95.3l-.1.1h.2c.1 0 .1-.1-.1-.1.1 0 .1 0 0 0zM120.1 92h-.2v.2h.2c.1-.1.1-.2 0-.2zM113.3 88c0-.1 0-.1 0 0v-.1h-.1v.1l.1.1V88c-.1 0 0 0 0 0zM116.9 89.6c0 .1 0 .1 0 0l-.1.1v.1h.1c.2-.2.1-.2 0-.2.1 0 .1 0 0 0zM115.6 90.9c0-.1 0-.1 0 0v-.1s-.1 0-.1-.1h-.1v.1l.1.1h.1z"
                    }), n.createElement("path", {
                        d: "M115.5 87.1c0-.1 0-.1-.1-.1h-.1v.1h.2c-.1.1-.1.1 0 0zM114 86.4c.1-.1.1-.2 0-.2 0 0-.1-.1-.2 0 0 .3.1.3.2.2-.1.1 0 .1 0 0zM120.4 90s-.1 0 0 0h-.1c-.1 0-.1.1-.1.1 0 .1.1.1.1.1h.1V90c0 .1 0 .1 0 0 0 .1 0 .1 0 0zM119.6 89h-.1v.2h.2l-.1-.2c.1.1.1.1 0 0 .1.1.1 0 0 0zM119.9 89.8s-.1 0-.1.1v.1h.1v-.1-.1c.1 0 .1 0 0 0zM117.6 88c0-.1 0-.1 0 0h-.1v.1h.1V88c.1 0 .1 0 0 0zM113.3 91.5h-.1v.1h.1c.1 0 .1 0 0-.1zM111.6 90.4c-.1 0-.1.1-.1.1v.1h.2v-.2c0 .1 0 0-.1 0zM111.4 90.8c-.1 0-.1 0 0 0v.2h.1v-.1s0-.1-.1-.1zM115.2 93.4c0-.1 0-.1 0 0v-.2h-.1H114.8h-.1.1c.3.3.3.3.4.2-.1 0-.1 0 0 0zM117.1 94.1v-.2h-.1s-.1 0-.1.1V94.3h.2v-.2zM120.1 95.5c0 .1 0 .1 0 0v.1h.1v-.1h-.1zM114.7 91.8c0-.1 0-.1-.1-.1h-.1v.1h.2c0 .1 0 .1 0 0zM113.8 90.6h-.1v.1h.1v-.1c.1.1.1 0 0 0zM115.7 91.2l-.1.1v.2h.2v-.1h-.1v-.2zM109.3 87.8s-.1 0 0 0h-.2v.1h.1s.1 0 .1-.1c0 .1 0 .1 0 0 0 .1 0 .1 0 0zM115.6 92c0 .1.1.1.1.1h.1V92c-.1-.1-.2 0-.2 0zM116.8 92.8c0 .1 0 .1 0 0v.1h.2v-.1h-.2zM104.5 96.1v.1s0 .1.1.1h.1v-.2h-.2zM106.4 96c0 .1.1.1.1.2h.1l.1-.1V96h-.1-.1c0-.1 0 0-.1 0zM109.8 93.9c0-.1 0-.1 0 0v-.1h-.1v.2c.1 0 .1-.1.1-.1zM110.5 92.4c.1-.1.1-.1.1-.2h-.1c-.1.2 0 .2 0 .2zM109.3 93.3c-.1 0-.1 0-.1.1v.1h.1c.1 0 .1-.1 0-.2.1.1 0 .1 0 0zM107.8 96.1v.1h.1l.1-.1c-.1-.1-.2-.1-.2 0zM107.3 97.3c-.1 0-.1 0 0 0h-.1v.1h.1c.1-.1.1-.1 0-.1zM102.9 96.3v-.1h-.1v.2h.1v-.1c0 .1 0 0 0 0zM116.4 96h.2v-.1l-.1.1h-.1zM114.4 96.1V96h-.1-.1v.2h.1c0 .1 0 0 .1-.1 0 .1 0 0 0 0zM115.1 94h.1v-.1h-.1v.1zM104.3 91.5l.1.1h.1v-.2c-.1 0-.1 0-.2.1.1-.1.1-.1 0 0 .1-.1.1-.1 0 0zM106.5 89.7v.1h.1v-.2c0-.1 0-.1-.1.1.1-.1.1-.1 0 0 0-.1 0-.1 0 0 0-.1 0-.1 0 0zM103 94.2c0-.1-.1-.1 0 0h-.2v.2h.1c.2-.1.2-.1.1-.2.1 0 .1 0 0 0zM106.3 90.3s-.1 0 0 0h-.1v.1h.1v-.1zM104.4 96.6v-.1l-.1-.1h-.1v.2h.2c-.1.1-.1.1 0 0 0 .1 0 0 0 0zM107.1 89.5h.1v-.1-.1h-.1v.2zM105 87.3c0 .1 0 .1 0 0 .1.1.1.1 0 0l.1.1h.1v-.1-.1h-.1l-.1.1c.1-.1.1 0 0 0 .1 0 .1 0 0 0zM109.5 87s0 .1 0 0c0 .1 0 .1 0 0l-.1.1h.1V87v-.1h-.2c.1 0 .1.1.2.1zM116.4 92.2c.1.1.1.1 0 0 .1.1.1.1 0 0l.1.1h.1v-.1h-.2c0-.1 0 0 0 0zM113.8 92.7c.1 0 .1 0 0 0 .1 0 .1 0 .1-.1v-.1-.1h-.1-.1c0 .2 0 .3.1.3zM114.1 92v.1h.2V92v-.1h-.1l-.1.1c0-.1 0-.1 0 0zM115.8 97s.1 0 0 0h.1v-.1h-.1v.1zM110.3 90.9v.2h.2V91v-.1c0-.1-.1-.1-.2 0zM107.9 94c0 .1 0 .1 0 0l.1.1h.1V94c-.2-.1-.3-.1-.2 0-.1-.1-.1 0 0 0zM112 89.6c0 .1.1.1 0 0l.1.1h.1v-.1-.1h-.1c-.1 0-.1 0-.1.1zM109 95.4h-.1s0 .1-.1.1v.1h.1s.1 0 .1-.1v-.1c.1 0 .1 0 0 0 .1 0 0 0 0 0zM105.3 95.4c-.1 0-.1 0 0 0h-.1v.1h.1v-.1zM104.5 96.8c-.1-.1-.1-.1-.2-.1 0 0-.1.1 0 .2.3.1.3 0 .2-.1.1.1.1 0 0 0zM108.4 90.6v.1c0 .1.1.1.1.1.1 0 .1-.1.1-.1v-.1h-.2c.1-.1.1-.1 0 0 .1-.1.1-.1 0 0zM107.3 91.3s.1 0 0 0c.1 0 .1.1 0 0v.1h.2v-.1-.1l-.2.1c.1-.1.1-.1 0 0 .1-.1.1-.1 0 0zM108.1 91s0 .1.1.1h.1V91h-.1-.1c.1-.1 0-.1 0 0zM106.2 93.2v.1h.1v-.1h-.1c.1 0 0 0 0 0zM111.5 95.9s-.1 0 0 0h-.2v.4c.3-.3.3-.3.2-.4.1.1 0 .1 0 0zM112.4 94h-.2v.1s0 .1.1.1H112.6V94h-.2zM113.9 91.1h.1V91h-.1v.1zM110 96.3c-.1 0-.1 0-.1.1v.1h.1v-.1-.1zM108.7 97.1c-.1.1-.1.1 0 0v.1h.1v-.1h-.1zM109.4 95.3l.1.1h.2v-.1-.1h-.1v.1h-.2zM110.1 95.4c.1 0 .1-.1.1-.1v-.1h-.1v.2zM111.1 94.3h.1v-.1-.1h-.1c-.1.1-.1.1 0 .2-.1 0-.1 0 0 0zM102.8 90.8s.1-.1 0 0l.1-.1v-.1c-.1 0-.2 0-.1.2-.1-.1-.1-.1 0 0zM99.6 96.7c-.1 0-.1 0 0 0-.1 0-.1 0 0 0l-.1.1v.1h.2c0-.2 0-.2-.1-.2zM98 96.4c-.1-.1-.2-.1-.2 0v.1c.2 0 .2 0 .2-.1zM99.2 97.3c0 .1.1.1.1.1s.1 0 .1-.1v-.1c-.1.1-.1.1-.2.1.1 0 0 0 0 0zM99.8 89.8v-.1h-.1v-.1h-.1.1c0 .2 0 .2.1.2zM105 94.8v.1c.1 0 .1 0 .1-.1v-.1l-.1.1zM107.7 94.5h.1v-.1-.1h-.2v.2h.1zM106.9 96c-.1 0-.1.1 0 0l-.1.1v.1h.2v-.1h-.1c.1 0 .1-.1 0-.1.1 0 .1 0 0 0zM100.5 91.7h-.1v.2h.1s.1 0 .1-.1v-.1h-.1zM105.4 93.2l.1-.1-.1.1.1-.1V93h-.1v0-.1h-.1.2v.1c-.2.2-.1.2-.1.2zM98.3 91.7v-.1h-.1v.1h.1zM102.8 93.1l.1-.1v-.1h-.1v.2c-.1 0-.1 0 0 0zM96.2 90.8c0-.1 0-.1 0 0 0-.1 0-.1 0 0l.1-.2h-.1v.1c-.1.1-.1.1 0 .1zM97.4 93.2c-.1-.1-.1-.1 0 0-.1-.1-.1-.1 0 0l-.1-.1h-.1s-.1 0-.1.1v.2c.2-.1.3-.1.3-.2zM96.6 93.1c.1 0 .1 0 0 0h.1V93s0-.1-.1-.1h-.1v.2h.1c-.1 0 0 0 0 0zM100.9 90.1c0-.1 0-.1-.1-.1l-.1.1v.1l.2-.1zM104.7 91.7s.1 0 0 0l.1-.1v-.1h-.1-.1c-.1.2-.1.2.1.2-.1 0-.1 0 0 0zM96.6 97s.1 0 0 0h.2v-.2h-.1-.1c-.1.1-.1.2 0 .2zM94.9 95.8c0-.1 0-.1 0 0 0-.1.1-.1.1-.2v-.1h-.1l-.1.1.1.1h.1c-.2.1-.2.1-.1.1zM101.3 97.1c0 .1 0 .1 0 0 .1.1.1.1.2.1h.1v-.1h-.1c-.2-.1-.2-.1-.2 0 0-.1 0-.1 0 0zM103.3 96c.1 0 .1 0 0 0h.1v-.1h-.1v.1c0-.1 0-.1 0 0zM105.3 96.6l.1-.1v-.1h-.1-.1v.1c0 .1 0 .1.1.1zM105.4 96.2s0-.1 0 0c0-.1 0-.1 0 0v-.1-.1h-.1v.1s0 .1.1.1zM101.1 94.5v.1l.1.1h0c0-.3 0-.3-.1-.2zM99 94.2v.2h.1l.1-.1v-.1-.1H99v.1zM95.8 93.5l-.1-.1s-.1 0-.1.1v.1c.1 0 .1 0 .2-.1 0 .1 0 .1 0 0zM101.9 95.9c0 .1 0 .1 0 0 .1.1.2.1.2 0v-.1l-.2.1zM103.1 96.9h.1-.1v.1c-.1-.2-.1-.2 0-.1-.1 0-.1 0 0 0zM101.1 96.7c.1-.1.1-.1 0-.1v-.1h-.1-.1-.1v.1h.1l.2.1zM101 96l-.1-.1v.2c.1 0 .1-.1.1-.1zM99.7 95.4l-.1-.1-.1.1v.1c.1 0 .1 0 .2-.1-.1.1 0 0 0 0zM93.8 97.1c0-.1 0-.1 0 0V97h-.1l-.1.1v.1c.1-.1.2-.1.2-.1zM94.9 95.9c.1 0 .1-.1.1-.1h-.1v.1zM93.5 96.4h-.1v.1h.1v-.1zM86.5 97.2v-.1h-.1v.1h.1c0 .1 0 .1 0 0zM89.3 93.1c0 .1.1.1.1.1h.1c.1-.1.1-.1 0-.2-.1 0-.1.1-.2.1.1 0 .1 0 0 0 .1 0 .1 0 0 0zM91.9 92v.1h.2V92c0-.1 0-.1-.2 0 .1 0 .1 0 0 0 .1 0 .1 0 0 0zM88.5 94.7l-.1-.1V94.9h.1c.1 0 .1-.1.1-.1l-.1-.1zM91.5 92.5h-.1v.1h.1v-.1zM92.5 92s.1.1 0 0l.1.1V92v-.1c.1 0 0 0-.1.1zM91.2 89.4c.1 0 .1 0 0 0 0 .1 0 .1.1.2h.1v-.1-.1h-.2c.1-.1.1-.1 0 0 .1-.1.1-.1 0 0zM95.6 90.4s0 .1 0 0c-.1.1-.1.1 0 0l-.1.1h.1v-.1c.1 0 .1-.1 0-.1h-.2c.2 0 .1 0 .2.1zM97.9 97.1h.1l.1-.1v-.1H98h-.1v.2zM98.5 96.6c-.1 0-.1 0 0 0v.1h.2s.1-.1 0-.1v-.1h-.1l-.1.1c0-.1 0-.1 0 0zM95.2 94.4c-.1.1-.1.1 0 0l-.1.1v.1h.2l.1-.1c0-.1-.1-.2-.2-.1zM91.9 96.6v.1h.2v-.1c-.1-.2-.2-.1-.2 0 0-.1 0-.1 0 0zM97.2 93.7l.1.1h.1l.1-.1v-.1h-.1c-.1-.1-.2 0-.2.1zM89 97.1h-.1v.1h.1c.1-.1.1-.1 0-.1zM93.5 93.5c-.1 0-.1 0 0 0-.1.2 0 .2 0 .3.1 0 .1 0 .2-.1v-.1h-.1c0-.2 0-.2-.1-.1.1-.1 0-.1 0 0zM92.2 93.8c0 .1 0 .1 0 0 0 .1 0 .1 0 0v.1h.2v-.1h-.2c.1 0 .1 0 0 0zM93.1 93.8v.1H93.4s.1-.1 0-.1h-.1-.1c0-.1-.1-.1-.1 0zM90.6 95.3c-.1.1-.1.1 0 0v.1h.1v-.1h-.1zM98.5 95.7c.1 0 .1 0 0 0h.1v-.1h-.1c.1-.1 0-.1 0 .1 0-.1 0-.1 0 0zM79.1 96.7H79v.1h.1c.1 0 .1-.1 0-.1zM81.5 96.3c.1 0 .1 0 0 0h.1v-.1-.1h-.1-.1v.1l.1.1zM83.7 96.8v.1h.1v-.1h-.1zM79.7 94.4c-.1 0-.1.1-.1.1v.1h.1s.1 0 .1-.1v-.1h-.1zM84.9 95.5c.1.1.1.1 0 0 0 .1.1.1.1.1h.2v-.1-.1c-.2 0-.2 0-.3.1zM85.7 95.8c-.1 0-.1 0 0 0h-.1v.2h.2v-.2h-.1zM77.5 95.3s-.1 0 0 0l-.1.1h.2s0-.1-.1-.1c.1 0 .1 0 0 0zM87.5 95.9c0 .1 0 .1 0 0v.1h.1v-.1h-.1c.1 0 .1 0 0 0zM74.3 96.1v.1h.1l.1-.1c-.2-.1-.2-.1-.2 0zM73.8 97.3c-.1 0-.1 0 0 0h-.1v.1h.1v-.1zM82.9 96h.2v-.1l-.1.1h-.1zM80.8 96.1c.1 0 .1 0 0 0V96h-.1-.1v.2h.1c.1.1.1 0 .1-.1 0 .1 0 0 0 0zM82.3 97h.1v-.1h-.1v.1zM71 96.8s-.1 0 0 0c-.1-.1-.1-.1-.2-.1 0 0-.1.1 0 .2.2.1.2 0 .2-.1 0 .1 0 0 0 0zM78 95.9c-.1 0-.1 0 0 0h-.2v.4c.3-.3.2-.3.2-.4 0 .1 0 .1 0 0zM76.4 96.3c-.1 0-.1 0-.1.1v.1h.1v-.1-.1zM75.1 97.1c0 .1 0 .1 0 0v.1h.1v-.1h-.1c.1 0 0 0 0 0zM76.6 95.4c.1 0 .1-.1.1-.1v-.1h-.1c-.1.2 0 .2 0 .2zM73.4 96c-.1 0-.1.1 0 0l-.1.1v.1h.2v-.1h-.1c.1 0 .1-.1 0-.1z"
                    })), n.createElement("polygon", {
                        fill: "#313b46",
                        points: "92.2 33.2 92.2 23.7 82.7 23.7 82.7 33.2 82.7 42.8 82.7 52.3 92.2 52.3 92.2 42.8 101.6 42.8 101.6 33.2"
                    }, n.createElement("animateTransform", {
                        attributeName: "transform",
                        attributeType: "XML",
                        type: "translate",
                        from: "0 0",
                        to: "0 26",
                        dur: "1.6s",
                        fill: "freeze"
                    })), n.createElement("g", {
                        transform: "translate(5 -25)"
                    }, n.createElement("polygon", {
                        fill: "#313b46",
                        points: "54 10.2 44.5 10.2 44.5 0.7 35.1 0.7 35.1 10.2 35.1 19.7 44.5 19.7 54 19.7 63.5 19.7 63.5 10.2"
                    }, n.createElement("animateTransform", {
                        attributeName: "transform",
                        attributeType: "XML",
                        type: "rotate",
                        from: "0 50 10",
                        to: "90 50 10",
                        begin: "3.2s",
                        dur: "0.3s",
                        fill: "freeze"
                    })), n.createElement("animateTransform", {
                        attributeName: "transform",
                        attributeType: "XML",
                        type: "translate",
                        from: "5 -25",
                        to: "5 55",
                        begin: "1s",
                        dur: "4.91s",
                        fill: "freeze"
                    }))))
                };
            var Sn = function(e) {
                var t = e.progress,
                    r = e.name,
                    o = e.onCancelUpload,
                    i = (0, f.s)();
                return n.createElement("div", {
                    className: "styles--1cGcB"
                }, n.createElement(gn.A, {
                    className: "styles--1tVXV",
                    strong: !0
                }, i.t("form.quickApply.modal.title")), n.createElement(Mr.A, null, i.t("form.quickApply.modal.subtitle")), n.createElement(On, {
                    className: En
                }), n.createElement("div", {
                    className: "styles--1Gjgo"
                }, n.createElement(wn.A, {
                    progressCurrent: t > 0 ? t : 0,
                    progressTotal: 100,
                    file: {
                        name: r
                    },
                    handleCancelUpload: o
                })))
            };
            Sn.propTypes = {
                progress: a().number,
                name: a().string
            }, Sn.defaultProps = {
                progress: 0,
                name: ""
            };
            const jn = Sn,
                Pn = n.memo((function(e) {
                    var t = e.isOpen,
                        r = e.onCancelUpload,
                        i = e.progress,
                        a = e.name;
                    return n.createElement(bn.Ay, {
                        className: (0, o.A)("styles--X9LjB", "styles--2UhMo"),
                        dismissable: !1,
                        onClose: r,
                        open: t,
                        size: 680
                    }, n.createElement(bn.UC, {
                        className: "styles--1LDMj"
                    }, n.createElement(jn, {
                        progress: i,
                        name: a,
                        onCancelUpload: r
                    })))
                }));
            var An = r(5490),
                Cn = r(9034),
                kn = r(99860);
            var xn = ["text", "flavor", "shouldDisplay", "onClose"];

            function Mn() {
                return Mn = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, Mn.apply(null, arguments)
            }
            var Fn = "success",
                Dn = "danger",
                Tn = function(e) {
                    var t = e.text,
                        r = e.flavor,
                        o = void 0 === r ? Fn : r,
                        i = e.shouldDisplay,
                        a = e.onClose,
                        l = function(e, t) {
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
                        }(e, xn);
                    return i ? n.createElement("div", {
                        className: "styles--2uMBk"
                    }, n.createElement(An.A.Static, Mn({}, l, {
                        danger: o === Dn,
                        success: o === Fn
                    }), n.createElement("div", {
                        className: "styles--7YPId"
                    }, n.createElement("p", null, t), n.createElement(kn.A, {
                        onClick: a,
                        as: "div",
                        "aria-label": "delete",
                        "data-action": "delete",
                        "data-ui": "close-".concat(o, "-alert")
                    }, n.createElement(Cn.A, {
                        muted: !0
                    }))))) : null
                };
            Tn.Flavors = {
                SUCCESS: Fn,
                DANGER: Dn
            };
            const zn = Tn;
            var Ln = r(16520),
                In = r(15542),
                _n = r(63631),
                Nn = r(34141),
                Un = r(21652),
                Vn = r(88309);
            const Rn = function(e) {
                var t = e.width;
                return n.createElement("div", {
                    className: "styles--3EwvM",
                    style: {
                        width: t
                    }
                })
            };
            var Bn = ["onLoadError"],
                Gn = function() {
                    return !!window.Dropbox
                },
                qn = function(e) {
                    var t = e.success,
                        r = e.cancel,
                        o = e.multiselect,
                        i = void 0 !== o && o,
                        a = e.linkType,
                        l = void 0 === a ? "direct" : a,
                        u = e.extensions,
                        c = e.disabled,
                        s = void 0 !== c && c,
                        p = e.className,
                        d = e.handleAnalyticsEvent,
                        v = (0, f.s)();
                    return s || !Gn() ? null : n.createElement("span", {
                        className: p,
                        onClick: function(e) {
                            if (e.preventDefault(), !Gn()) return null;
                            d && d(de.A.AUTOFILL_FORM_USING_CV_FROM_DROPBOX), window.Dropbox.choose({
                                cancel: r,
                                success: t,
                                linkType: l,
                                extensions: u,
                                multiselect: i
                            })
                        }
                    }, v.t("form.quickApply.button.dropbox"))
                };
            const Yn = function(e) {
                    var t = e.onLoadError,
                        r = function(e, t) {
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
                        }(e, Bn),
                        o = We().dropboxAppKey,
                        i = rn()({
                            loader: function() {
                                return Gn() ? Promise.resolve(qn) : (0, Vn.A)("https://www.dropbox.com/static/api/2/dropins.js", {
                                    attrs: {
                                        id: "dropboxjs",
                                        "data-app-key": o
                                    }
                                }).then((function() {
                                    return qn
                                })).catch(t)
                            },
                            loading: function() {
                                return n.createElement(Rn, {
                                    width: 90
                                })
                            }
                        });
                    return n.createElement(i, r)
                },
                Wn = function(e) {
                    var t = e.label,
                        r = e.onSelectFile,
                        o = e.supportedFileTypes,
                        i = e.handleAnalyticsEvent;
                    return n.createElement(n.Fragment, null, n.createElement("label", {
                        htmlFor: "file-upload"
                    }, t), n.createElement("input", {
                        id: "file-upload",
                        "data-ui": "autofill-computer",
                        multiple: !0,
                        type: "file",
                        hidden: !0,
                        onChange: n.useCallback((function(e) {
                            var t;
                            null != e && null !== (t = e.target) && void 0 !== t && t.value && (r && r(e), i && i(de.A.AUTOFILL_FORM_USING_CV_FROM_COMPUTER))
                        }), [r]),
                        accept: o
                    }))
                };

            function Kn(e) {
                return Kn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, Kn(e)
            }

            function $n() {
                $n = function() {
                    return t
                };
                var e, t = {},
                    r = Object.prototype,
                    n = r.hasOwnProperty,
                    o = Object.defineProperty || function(e, t, r) {
                        e[t] = r.value
                    },
                    i = "function" == typeof Symbol ? Symbol : {},
                    a = i.iterator || "@@iterator",
                    l = i.asyncIterator || "@@asyncIterator",
                    u = i.toStringTag || "@@toStringTag";

                function c(e, t, r) {
                    return Object.defineProperty(e, t, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }), e[t]
                }
                try {
                    c({}, "")
                } catch (e) {
                    c = function(e, t, r) {
                        return e[t] = r
                    }
                }

                function s(e, t, r, n) {
                    var i = t && t.prototype instanceof m ? t : m,
                        a = Object.create(i.prototype),
                        l = new M(n || []);
                    return o(a, "_invoke", {
                        value: A(e, r, l)
                    }), a
                }

                function f(e, t, r) {
                    try {
                        return {
                            type: "normal",
                            arg: e.call(t, r)
                        }
                    } catch (e) {
                        return {
                            type: "throw",
                            arg: e
                        }
                    }
                }
                t.wrap = s;
                var p = "suspendedStart",
                    d = "suspendedYield",
                    v = "executing",
                    h = "completed",
                    y = {};

                function m() {}

                function b() {}

                function g() {}
                var w = {};
                c(w, a, (function() {
                    return this
                }));
                var E = Object.getPrototypeOf,
                    O = E && E(E(F([])));
                O && O !== r && n.call(O, a) && (w = O);
                var S = g.prototype = m.prototype = Object.create(w);

                function j(e) {
                    ["next", "throw", "return"].forEach((function(t) {
                        c(e, t, (function(e) {
                            return this._invoke(t, e)
                        }))
                    }))
                }

                function P(e, t) {
                    function r(o, i, a, l) {
                        var u = f(e[o], e, i);
                        if ("throw" !== u.type) {
                            var c = u.arg,
                                s = c.value;
                            return s && "object" == Kn(s) && n.call(s, "__await") ? t.resolve(s.__await).then((function(e) {
                                r("next", e, a, l)
                            }), (function(e) {
                                r("throw", e, a, l)
                            })) : t.resolve(s).then((function(e) {
                                c.value = e, a(c)
                            }), (function(e) {
                                return r("throw", e, a, l)
                            }))
                        }
                        l(u.arg)
                    }
                    var i;
                    o(this, "_invoke", {
                        value: function(e, n) {
                            function o() {
                                return new t((function(t, o) {
                                    r(e, n, t, o)
                                }))
                            }
                            return i = i ? i.then(o, o) : o()
                        }
                    })
                }

                function A(t, r, n) {
                    var o = p;
                    return function(i, a) {
                        if (o === v) throw Error("Generator is already running");
                        if (o === h) {
                            if ("throw" === i) throw a;
                            return {
                                value: e,
                                done: !0
                            }
                        }
                        for (n.method = i, n.arg = a;;) {
                            var l = n.delegate;
                            if (l) {
                                var u = C(l, n);
                                if (u) {
                                    if (u === y) continue;
                                    return u
                                }
                            }
                            if ("next" === n.method) n.sent = n._sent = n.arg;
                            else if ("throw" === n.method) {
                                if (o === p) throw o = h, n.arg;
                                n.dispatchException(n.arg)
                            } else "return" === n.method && n.abrupt("return", n.arg);
                            o = v;
                            var c = f(t, r, n);
                            if ("normal" === c.type) {
                                if (o = n.done ? h : d, c.arg === y) continue;
                                return {
                                    value: c.arg,
                                    done: n.done
                                }
                            }
                            "throw" === c.type && (o = h, n.method = "throw", n.arg = c.arg)
                        }
                    }
                }

                function C(t, r) {
                    var n = r.method,
                        o = t.iterator[n];
                    if (o === e) return r.delegate = null, "throw" === n && t.iterator.return && (r.method = "return", r.arg = e, C(t, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
                    var i = f(o, t.iterator, r.arg);
                    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
                    var a = i.arg;
                    return a ? a.done ? (r[t.resultName] = a.value, r.next = t.nextLoc, "return" !== r.method && (r.method = "next", r.arg = e), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y)
                }

                function k(e) {
                    var t = {
                        tryLoc: e[0]
                    };
                    1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t)
                }

                function x(e) {
                    var t = e.completion || {};
                    t.type = "normal", delete t.arg, e.completion = t
                }

                function M(e) {
                    this.tryEntries = [{
                        tryLoc: "root"
                    }], e.forEach(k, this), this.reset(!0)
                }

                function F(t) {
                    if (t || "" === t) {
                        var r = t[a];
                        if (r) return r.call(t);
                        if ("function" == typeof t.next) return t;
                        if (!isNaN(t.length)) {
                            var o = -1,
                                i = function r() {
                                    for (; ++o < t.length;)
                                        if (n.call(t, o)) return r.value = t[o], r.done = !1, r;
                                    return r.value = e, r.done = !0, r
                                };
                            return i.next = i
                        }
                    }
                    throw new TypeError(Kn(t) + " is not iterable")
                }
                return b.prototype = g, o(S, "constructor", {
                    value: g,
                    configurable: !0
                }), o(g, "constructor", {
                    value: b,
                    configurable: !0
                }), b.displayName = c(g, u, "GeneratorFunction"), t.isGeneratorFunction = function(e) {
                    var t = "function" == typeof e && e.constructor;
                    return !!t && (t === b || "GeneratorFunction" === (t.displayName || t.name))
                }, t.mark = function(e) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(e, g) : (e.__proto__ = g, c(e, u, "GeneratorFunction")), e.prototype = Object.create(S), e
                }, t.awrap = function(e) {
                    return {
                        __await: e
                    }
                }, j(P.prototype), c(P.prototype, l, (function() {
                    return this
                })), t.AsyncIterator = P, t.async = function(e, r, n, o, i) {
                    void 0 === i && (i = Promise);
                    var a = new P(s(e, r, n, o), i);
                    return t.isGeneratorFunction(r) ? a : a.next().then((function(e) {
                        return e.done ? e.value : a.next()
                    }))
                }, j(S), c(S, u, "Generator"), c(S, a, (function() {
                    return this
                })), c(S, "toString", (function() {
                    return "[object Generator]"
                })), t.keys = function(e) {
                    var t = Object(e),
                        r = [];
                    for (var n in t) r.push(n);
                    return r.reverse(),
                        function e() {
                            for (; r.length;) {
                                var n = r.pop();
                                if (n in t) return e.value = n, e.done = !1, e
                            }
                            return e.done = !0, e
                        }
                }, t.values = F, M.prototype = {
                    constructor: M,
                    reset: function(t) {
                        if (this.prev = 0, this.next = 0, this.sent = this._sent = e, this.done = !1, this.delegate = null, this.method = "next", this.arg = e, this.tryEntries.forEach(x), !t)
                            for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = e)
                    },
                    stop: function() {
                        this.done = !0;
                        var e = this.tryEntries[0].completion;
                        if ("throw" === e.type) throw e.arg;
                        return this.rval
                    },
                    dispatchException: function(t) {
                        if (this.done) throw t;
                        var r = this;

                        function o(n, o) {
                            return l.type = "throw", l.arg = t, r.next = n, o && (r.method = "next", r.arg = e), !!o
                        }
                        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                            var a = this.tryEntries[i],
                                l = a.completion;
                            if ("root" === a.tryLoc) return o("end");
                            if (a.tryLoc <= this.prev) {
                                var u = n.call(a, "catchLoc"),
                                    c = n.call(a, "finallyLoc");
                                if (u && c) {
                                    if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                                    if (this.prev < a.finallyLoc) return o(a.finallyLoc)
                                } else if (u) {
                                    if (this.prev < a.catchLoc) return o(a.catchLoc, !0)
                                } else {
                                    if (!c) throw Error("try statement without catch or finally");
                                    if (this.prev < a.finallyLoc) return o(a.finallyLoc)
                                }
                            }
                        }
                    },
                    abrupt: function(e, t) {
                        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                            var o = this.tryEntries[r];
                            if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                                var i = o;
                                break
                            }
                        }
                        i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);
                        var a = i ? i.completion : {};
                        return a.type = e, a.arg = t, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a)
                    },
                    complete: function(e, t) {
                        if ("throw" === e.type) throw e.arg;
                        return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), y
                    },
                    finish: function(e) {
                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                            var r = this.tryEntries[t];
                            if (r.finallyLoc === e) return this.complete(r.completion, r.afterLoc), x(r), y
                        }
                    },
                    catch: function(e) {
                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                            var r = this.tryEntries[t];
                            if (r.tryLoc === e) {
                                var n = r.completion;
                                if ("throw" === n.type) {
                                    var o = n.arg;
                                    x(r)
                                }
                                return o
                            }
                        }
                        throw Error("illegal catch attempt")
                    },
                    delegateYield: function(t, r, n) {
                        return this.delegate = {
                            iterator: F(t),
                            resultName: r,
                            nextLoc: n
                        }, "next" === this.method && (this.arg = e), y
                    }
                }, t
            }

            function Hn(e, t, r, n, o, i, a) {
                try {
                    var l = e[i](a),
                        u = l.value
                } catch (e) {
                    return void r(e)
                }
                l.done ? t(u) : Promise.resolve(u).then(n, o)
            }
            var Xn = function(e) {
                    return "https://www.googleapis.com/drive/v3/files/".concat(e, "?alt=media")
                },
                Zn = function() {
                    var e, t = (e = $n().mark((function e() {
                        return $n().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, Promise.all([(0, Vn.A)("https://accounts.google.com/gsi/client"), (0, Vn.A)("https://apis.google.com/js/api.js")]);
                                case 2:
                                    return e.next = 4, new Promise((function(e, t) {
                                        window.gapi.load("client:picker", (function() {
                                            return window.gapi.client.load("https://www.googleapis.com/discovery/v1/apis/drive/v3/rest").then(e).catch(t)
                                        }))
                                    }));
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })), function() {
                        var t = this,
                            r = arguments;
                        return new Promise((function(n, o) {
                            var i = e.apply(t, r);

                            function a(e) {
                                Hn(i, n, o, a, l, "next", e)
                            }

                            function l(e) {
                                Hn(i, n, o, a, l, "throw", e)
                            }
                            a(void 0)
                        }))
                    });
                    return function() {
                        return t.apply(this, arguments)
                    }
                }();

            function Jn(e) {
                return Jn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, Jn(e)
            }

            function Qn() {
                Qn = function() {
                    return t
                };
                var e, t = {},
                    r = Object.prototype,
                    n = r.hasOwnProperty,
                    o = Object.defineProperty || function(e, t, r) {
                        e[t] = r.value
                    },
                    i = "function" == typeof Symbol ? Symbol : {},
                    a = i.iterator || "@@iterator",
                    l = i.asyncIterator || "@@asyncIterator",
                    u = i.toStringTag || "@@toStringTag";

                function c(e, t, r) {
                    return Object.defineProperty(e, t, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }), e[t]
                }
                try {
                    c({}, "")
                } catch (e) {
                    c = function(e, t, r) {
                        return e[t] = r
                    }
                }

                function s(e, t, r, n) {
                    var i = t && t.prototype instanceof m ? t : m,
                        a = Object.create(i.prototype),
                        l = new M(n || []);
                    return o(a, "_invoke", {
                        value: A(e, r, l)
                    }), a
                }

                function f(e, t, r) {
                    try {
                        return {
                            type: "normal",
                            arg: e.call(t, r)
                        }
                    } catch (e) {
                        return {
                            type: "throw",
                            arg: e
                        }
                    }
                }
                t.wrap = s;
                var p = "suspendedStart",
                    d = "suspendedYield",
                    v = "executing",
                    h = "completed",
                    y = {};

                function m() {}

                function b() {}

                function g() {}
                var w = {};
                c(w, a, (function() {
                    return this
                }));
                var E = Object.getPrototypeOf,
                    O = E && E(E(F([])));
                O && O !== r && n.call(O, a) && (w = O);
                var S = g.prototype = m.prototype = Object.create(w);

                function j(e) {
                    ["next", "throw", "return"].forEach((function(t) {
                        c(e, t, (function(e) {
                            return this._invoke(t, e)
                        }))
                    }))
                }

                function P(e, t) {
                    function r(o, i, a, l) {
                        var u = f(e[o], e, i);
                        if ("throw" !== u.type) {
                            var c = u.arg,
                                s = c.value;
                            return s && "object" == Jn(s) && n.call(s, "__await") ? t.resolve(s.__await).then((function(e) {
                                r("next", e, a, l)
                            }), (function(e) {
                                r("throw", e, a, l)
                            })) : t.resolve(s).then((function(e) {
                                c.value = e, a(c)
                            }), (function(e) {
                                return r("throw", e, a, l)
                            }))
                        }
                        l(u.arg)
                    }
                    var i;
                    o(this, "_invoke", {
                        value: function(e, n) {
                            function o() {
                                return new t((function(t, o) {
                                    r(e, n, t, o)
                                }))
                            }
                            return i = i ? i.then(o, o) : o()
                        }
                    })
                }

                function A(t, r, n) {
                    var o = p;
                    return function(i, a) {
                        if (o === v) throw Error("Generator is already running");
                        if (o === h) {
                            if ("throw" === i) throw a;
                            return {
                                value: e,
                                done: !0
                            }
                        }
                        for (n.method = i, n.arg = a;;) {
                            var l = n.delegate;
                            if (l) {
                                var u = C(l, n);
                                if (u) {
                                    if (u === y) continue;
                                    return u
                                }
                            }
                            if ("next" === n.method) n.sent = n._sent = n.arg;
                            else if ("throw" === n.method) {
                                if (o === p) throw o = h, n.arg;
                                n.dispatchException(n.arg)
                            } else "return" === n.method && n.abrupt("return", n.arg);
                            o = v;
                            var c = f(t, r, n);
                            if ("normal" === c.type) {
                                if (o = n.done ? h : d, c.arg === y) continue;
                                return {
                                    value: c.arg,
                                    done: n.done
                                }
                            }
                            "throw" === c.type && (o = h, n.method = "throw", n.arg = c.arg)
                        }
                    }
                }

                function C(t, r) {
                    var n = r.method,
                        o = t.iterator[n];
                    if (o === e) return r.delegate = null, "throw" === n && t.iterator.return && (r.method = "return", r.arg = e, C(t, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
                    var i = f(o, t.iterator, r.arg);
                    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
                    var a = i.arg;
                    return a ? a.done ? (r[t.resultName] = a.value, r.next = t.nextLoc, "return" !== r.method && (r.method = "next", r.arg = e), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y)
                }

                function k(e) {
                    var t = {
                        tryLoc: e[0]
                    };
                    1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t)
                }

                function x(e) {
                    var t = e.completion || {};
                    t.type = "normal", delete t.arg, e.completion = t
                }

                function M(e) {
                    this.tryEntries = [{
                        tryLoc: "root"
                    }], e.forEach(k, this), this.reset(!0)
                }

                function F(t) {
                    if (t || "" === t) {
                        var r = t[a];
                        if (r) return r.call(t);
                        if ("function" == typeof t.next) return t;
                        if (!isNaN(t.length)) {
                            var o = -1,
                                i = function r() {
                                    for (; ++o < t.length;)
                                        if (n.call(t, o)) return r.value = t[o], r.done = !1, r;
                                    return r.value = e, r.done = !0, r
                                };
                            return i.next = i
                        }
                    }
                    throw new TypeError(Jn(t) + " is not iterable")
                }
                return b.prototype = g, o(S, "constructor", {
                    value: g,
                    configurable: !0
                }), o(g, "constructor", {
                    value: b,
                    configurable: !0
                }), b.displayName = c(g, u, "GeneratorFunction"), t.isGeneratorFunction = function(e) {
                    var t = "function" == typeof e && e.constructor;
                    return !!t && (t === b || "GeneratorFunction" === (t.displayName || t.name))
                }, t.mark = function(e) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(e, g) : (e.__proto__ = g, c(e, u, "GeneratorFunction")), e.prototype = Object.create(S), e
                }, t.awrap = function(e) {
                    return {
                        __await: e
                    }
                }, j(P.prototype), c(P.prototype, l, (function() {
                    return this
                })), t.AsyncIterator = P, t.async = function(e, r, n, o, i) {
                    void 0 === i && (i = Promise);
                    var a = new P(s(e, r, n, o), i);
                    return t.isGeneratorFunction(r) ? a : a.next().then((function(e) {
                        return e.done ? e.value : a.next()
                    }))
                }, j(S), c(S, u, "Generator"), c(S, a, (function() {
                    return this
                })), c(S, "toString", (function() {
                    return "[object Generator]"
                })), t.keys = function(e) {
                    var t = Object(e),
                        r = [];
                    for (var n in t) r.push(n);
                    return r.reverse(),
                        function e() {
                            for (; r.length;) {
                                var n = r.pop();
                                if (n in t) return e.value = n, e.done = !1, e
                            }
                            return e.done = !0, e
                        }
                }, t.values = F, M.prototype = {
                    constructor: M,
                    reset: function(t) {
                        if (this.prev = 0, this.next = 0, this.sent = this._sent = e, this.done = !1, this.delegate = null, this.method = "next", this.arg = e, this.tryEntries.forEach(x), !t)
                            for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = e)
                    },
                    stop: function() {
                        this.done = !0;
                        var e = this.tryEntries[0].completion;
                        if ("throw" === e.type) throw e.arg;
                        return this.rval
                    },
                    dispatchException: function(t) {
                        if (this.done) throw t;
                        var r = this;

                        function o(n, o) {
                            return l.type = "throw", l.arg = t, r.next = n, o && (r.method = "next", r.arg = e), !!o
                        }
                        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                            var a = this.tryEntries[i],
                                l = a.completion;
                            if ("root" === a.tryLoc) return o("end");
                            if (a.tryLoc <= this.prev) {
                                var u = n.call(a, "catchLoc"),
                                    c = n.call(a, "finallyLoc");
                                if (u && c) {
                                    if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                                    if (this.prev < a.finallyLoc) return o(a.finallyLoc)
                                } else if (u) {
                                    if (this.prev < a.catchLoc) return o(a.catchLoc, !0)
                                } else {
                                    if (!c) throw Error("try statement without catch or finally");
                                    if (this.prev < a.finallyLoc) return o(a.finallyLoc)
                                }
                            }
                        }
                    },
                    abrupt: function(e, t) {
                        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                            var o = this.tryEntries[r];
                            if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                                var i = o;
                                break
                            }
                        }
                        i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);
                        var a = i ? i.completion : {};
                        return a.type = e, a.arg = t, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a)
                    },
                    complete: function(e, t) {
                        if ("throw" === e.type) throw e.arg;
                        return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), y
                    },
                    finish: function(e) {
                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                            var r = this.tryEntries[t];
                            if (r.finallyLoc === e) return this.complete(r.completion, r.afterLoc), x(r), y
                        }
                    },
                    catch: function(e) {
                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                            var r = this.tryEntries[t];
                            if (r.tryLoc === e) {
                                var n = r.completion;
                                if ("throw" === n.type) {
                                    var o = n.arg;
                                    x(r)
                                }
                                return o
                            }
                        }
                        throw Error("illegal catch attempt")
                    },
                    delegateYield: function(t, r, n) {
                        return this.delegate = {
                            iterator: F(t),
                            resultName: r,
                            nextLoc: n
                        }, "next" === this.method && (this.arg = e), y
                    }
                }, t
            }

            function eo(e, t, r, n, o, i, a) {
                try {
                    var l = e[i](a),
                        u = l.value
                } catch (e) {
                    return void r(e)
                }
                l.done ? t(u) : Promise.resolve(u).then(n, o)
            }
            var to = function(e) {
                var t, r, n = e.developerKey,
                    o = e.appId,
                    i = e.clientId;
                if (null !== (t = window.google) && void 0 !== t && t.picker && o && n && i) {
                    var a = window.google.accounts.oauth2.initTokenClient({
                        client_id: i,
                        scope: "https://www.googleapis.com/auth/drive.file",
                        prompt: ""
                    });
                    return {
                        open: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                                t = e.callback,
                                i = e.mimetypes,
                                l = new window.google.picker.View(window.google.picker.ViewId.DOCS);
                            l && i && l.setMimeTypes(i.join(",")), a.callback = function(e) {
                                var i;
                                void 0 === e.error && (r = e.access_token, (new window.google.picker.PickerBuilder).enableFeature(window.google.picker.Feature.NAV_HIDDEN).setDeveloperKey(n).setAppId(o).setOAuthToken(r).addView(l).hideTitleBar().setCallback((i = t, function(e) {
                                    var t = window.google.picker;
                                    if (function(e, t) {
                                            return function(e) {
                                                var t;
                                                return Boolean(null == e || null === (t = e.docs) || void 0 === t ? void 0 : t[0])
                                            }(e) && (null == e ? void 0 : e.action) === t
                                        }(e, t.Action.PICKED)) {
                                        var n = e[t.Response.DOCUMENTS][0],
                                            o = n[t.Document.ID],
                                            a = n[t.Document.NAME];
                                        return null == i ? void 0 : i({
                                            url: Xn(o),
                                            name: a,
                                            token: r
                                        })
                                    }
                                })).build().setVisible(!0))
                            }, a.requestAccessToken()
                        }
                    }
                }
            };
            const ro = function() {
                var e, t = (e = Qn().mark((function e(t) {
                    var r, n, o, i;
                    return Qn().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (n = (r = null != t ? t : {}).clientId, o = r.developerKey, i = r.appId, n && o && i) {
                                    e.next = 3;
                                    break
                                }
                                return e.abrupt("return");
                            case 3:
                                return e.prev = 3, e.next = 6, Zn();
                            case 6:
                                if (window.gapi) {
                                    e.next = 8;
                                    break
                                }
                                return e.abrupt("return");
                            case 8:
                                return e.abrupt("return", to(t));
                            case 11:
                                return e.prev = 11, e.t0 = e.catch(3), e.abrupt("return");
                            case 14:
                            case "end":
                                return e.stop()
                        }
                    }), e, null, [
                        [3, 11]
                    ])
                })), function() {
                    var t = this,
                        r = arguments;
                    return new Promise((function(n, o) {
                        var i = e.apply(t, r);

                        function a(e) {
                            eo(i, n, o, a, l, "next", e)
                        }

                        function l(e) {
                            eo(i, n, o, a, l, "throw", e)
                        }
                        a(void 0)
                    }))
                });
                return function(e) {
                    return t.apply(this, arguments)
                }
            }();
            var no = ["onLoadError"];

            function oo() {
                return oo = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, oo.apply(null, arguments)
            }
            var io = function(e) {
                var t = e.disabled,
                    r = e.picker,
                    o = e.onSuccess,
                    i = e.supportedMimeTypes,
                    a = e.className,
                    l = e.handleAnalyticsEvent,
                    u = (0, f.s)(),
                    c = n.useCallback((function(e) {
                        var t = e.url,
                            r = e.name,
                            n = e.token;
                        l && l(de.A.AUTOFILL_FORM_USING_CV_FROM_GOOGLE_DRIVE), o && o(t, r, n)
                    }), [l, o]),
                    s = n.useCallback((function() {
                        r.open({
                            callback: c,
                            mimetypes: i
                        })
                    }), [r, i, c]);
                return t || !r ? null : n.createElement("div", {
                    className: a,
                    onClick: s
                }, u.t("form.quickApply.button.googleDrive"))
            };
            const ao = function(e) {
                var t = e.onLoadError,
                    r = function(e, t) {
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
                    }(e, no),
                    o = We().googleApi,
                    i = rn()({
                        loader: function() {
                            return ro(o).then((function(e) {
                                return function(t) {
                                    return n.createElement(io, oo({
                                        picker: e
                                    }, t))
                                }
                            })).catch(t)
                        },
                        loading: function() {
                            return n.createElement(Rn, {
                                width: 100
                            })
                        }
                    });
                return n.createElement(i, r)
            };
            var lo = ["display", "visible"];

            function uo() {
                return uo = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, uo.apply(null, arguments)
            }

            function co(e, t) {
                return function(e) {
                    if (Array.isArray(e)) return e
                }(e) || function(e, t) {
                    var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                    if (null != r) {
                        var n, o, i, a, l = [],
                            u = !0,
                            c = !1;
                        try {
                            if (i = (r = r.call(e)).next, 0 === t) {
                                if (Object(r) !== r) return;
                                u = !1
                            } else
                                for (; !(u = (n = i.call(r)).done) && (l.push(n.value), l.length !== t); u = !0);
                        } catch (e) {
                            c = !0, o = e
                        } finally {
                            try {
                                if (!u && null != r.return && (a = r.return(), Object(a) !== a)) return
                            } finally {
                                if (c) throw o
                            }
                        }
                        return l
                    }
                }(e, t) || function(e, t) {
                    if (e) {
                        if ("string" == typeof e) return so(e, t);
                        var r = {}.toString.call(e).slice(8, -1);
                        return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? so(e, t) : void 0
                    }
                }(e, t) || function() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function so(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }
            const fo = (0, n.memo)((function(e) {
                var t = e.ApplyWithLinkedin,
                    r = e.open,
                    o = e.className,
                    i = e.closeButton,
                    a = e.toggleButton,
                    u = e.onSelectFile,
                    c = e.onDropboxSuccess,
                    s = e.supportedFileTypes,
                    p = e.supportedMimeTypes,
                    d = e.onGoogleDriveSuccess,
                    v = e.as,
                    h = void 0 === v ? l.A : v,
                    y = (0, f.s)(),
                    m = M(),
                    b = m.form,
                    g = m.updateForm,
                    w = ar(),
                    E = We().isUploadCvFromGoogleDriveEnabled,
                    O = function() {
                        var e = (0, n.useContext)(Rt);
                        if (void 0 === e) throw new Error("useAvatar must be used within a AvatarContext");
                        return e
                    }().fetchExternalAvatar,
                    S = co((0, n.useState)(!0), 2),
                    j = S[0],
                    P = S[1],
                    A = co((0, n.useState)(!0), 2),
                    C = A[0],
                    k = A[1],
                    x = (0, n.useCallback)((function() {
                        P(!1)
                    }), []),
                    F = (0, n.useCallback)((function() {
                        k(!1)
                    }), []),
                    D = (0, n.useMemo)((function() {
                        return {
                            value: "autofill-computer",
                            display: {
                                "data-ui": "autofill-computer",
                                children: n.createElement(Wn, {
                                    handleAnalyticsEvent: w,
                                    label: Ln.isMobile ? y.t("form.quickApply.button.device") : y.t("form.quickApply.button.computer"),
                                    onSelectFile: u,
                                    supportedFileTypes: s
                                })
                            }
                        }
                    }), [w, Ln.isMobile, u, s, y]),
                    T = (0, n.useMemo)((function() {
                        return {
                            value: "autofill-dropbox",
                            display: {
                                "data-ui": "autofill-dropbox",
                                children: n.createElement(Yn, {
                                    handleAnalyticsEvent: w,
                                    className: "styles--26vCp",
                                    success: c,
                                    extentions: s,
                                    onLoadError: x
                                })
                            },
                            visible: j
                        }
                    }), [w, j, c, s]),
                    z = (0, n.useMemo)((function() {
                        return {
                            value: "autofill-google-drive",
                            display: {
                                "data-ui": "autofill-google-drive",
                                children: n.createElement(ao, {
                                    handleAnalyticsEvent: w,
                                    className: "styles--20zHe",
                                    onSuccess: d,
                                    supportedMimeTypes: p,
                                    onLoadError: F
                                })
                            },
                            visible: C
                        }
                    }), [w, C, d, p]),
                    L = (0, n.useMemo)((function() {
                        var e = [D, T];
                        return E ? (e.push(z), e) : e
                    }), [z, T, D, E]),
                    I = (0, n.useMemo)((function() {
                        return function(e) {
                            var t = e.display,
                                r = e.visible,
                                o = function(e, t) {
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
                                }(e, lo);
                            return r ? n.createElement(Un.A, uo({}, t, o)) : null
                        }
                    }), []);
                return n.createElement("div", {
                    className: o,
                    "data-ui": "autofill-button"
                }, n.createElement(_n.Ay, {
                    open: r,
                    onClose: i,
                    as: h,
                    onClick: a,
                    responsive: !0
                }, y.t("form.quickApply.button.text"), n.createElement(In.Ay, null, n.createElement(Nn.qF, {
                    className: "styles--2Mm7_",
                    Item: I,
                    items: L
                }), r && !!t && n.createElement(t, {
                    closeButton: i,
                    fetchExternalAvatar: O,
                    form: b,
                    updateForm: g
                }))))
            }));

            function po(e) {
                return po = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, po(e)
            }

            function vo(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, ho(n.key), n)
                }
            }

            function ho(e) {
                var t = function(e, t) {
                    if ("object" != po(e) || !e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var n = r.call(e, "string");
                        if ("object" != po(n)) return n;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(e)
                }(e);
                return "symbol" == po(t) ? t : t + ""
            }

            function yo(e, t, r) {
                return t = bo(t),
                    function(e, t) {
                        if (t && ("object" == po(t) || "function" == typeof t)) return t;
                        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                        return function(e) {
                            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return e
                        }(e)
                    }(e, mo() ? Reflect.construct(t, r || [], bo(e).constructor) : t.apply(e, r))
            }

            function mo() {
                try {
                    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (e) {}
                return (mo = function() {
                    return !!e
                })()
            }

            function bo(e) {
                return bo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                }, bo(e)
            }

            function go(e, t) {
                return go = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                    return e.__proto__ = t, e
                }, go(e, t)
            }
            var wo = ["application/pdf", ".pdf", "application/msword", ".doc", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", ".docx", "application/vnd.oasis.opendocument.text", ".odt", "application/rtf", ".rtf"],
                Eo = function(e) {
                    function t(e) {
                        var r;
                        return function(e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t), (r = yo(this, t, [e])).abortController = null, r.progressReachTop = !1, r.state = {
                            form: e.form || void 0,
                            canceled: !1,
                            error: e.error,
                            processing: !1,
                            open: !1,
                            name: void 0,
                            displayNotifier: !0
                        }, r.setError = r.setError.bind(r), r.uploadFile = r.uploadFile.bind(r), r.getProgress = r.getProgress.bind(r), r.onSelectFile = r.onSelectFile.bind(r), r.onCancelUpload = r.onCancelUpload.bind(r), r.onDropboxSuccess = r.onDropboxSuccess.bind(r), r.toggleButton = r.toggleButton.bind(r), r.closeButton = r.closeButton.bind(r), r.startProcessing = r.startProcessing.bind(r), r.handleExternalFile = r.handleExternalFile.bind(r), r.onGoogleDriveSuccess = r.onGoogleDriveSuccess.bind(r), r.closeNotifier = r.closeNotifier.bind(r), r.shouldShowNotifier = r.shouldShowNotifier.bind(r), r.processAvatarFromResume = r.processAvatarFromResume.bind(r), r
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
                        }), t && go(e, t)
                    }(t, e), r = t, o = [{
                        key: "componentDidUpdate",
                        value: function(e, t) {
                            var r = this.state,
                                n = r.form,
                                o = r.canceled,
                                i = this.props,
                                a = i.onCancelUpload,
                                l = i.updateForm;
                            j()(n) || A()(n, t.form) || !l || l(n), o && o !== t.canceled && a && (a(), this.abortController && this.abortController.abort && this.abortController.abort())
                        }
                    }, {
                        key: "closeNotifier",
                        value: function() {
                            var e = this.props,
                                t = e.networkErrorStatus,
                                r = e.clearNetworkError;
                            this.setState({
                                displayNotifier: !1
                            }), t && "function" == typeof r && r()
                        }
                    }, {
                        key: "shouldShowNotifier",
                        value: function() {
                            var e = this.state,
                                t = e.canceled,
                                r = e.processing,
                                n = e.form,
                                o = e.displayNotifier,
                                i = this.props.networkErrorStatus;
                            return o && !(!t && r) && (!r && !j()(n) || i)
                        }
                    }, {
                        key: "setError",
                        value: function(e) {
                            this.setState({
                                error: e,
                                processing: !1,
                                open: !1
                            })
                        }
                    }, {
                        key: "startProcessing",
                        value: function(e, t) {
                            var r = this;
                            return this.props.networkErrorStatus && this.props.clearNetworkError && this.props.clearNetworkError(), this.progressReachTop = !1, new Promise((function(n) {
                                r.setState({
                                    name: e,
                                    form: void 0,
                                    canceled: !1,
                                    processing: !0,
                                    displayNotifier: !0
                                }, (function() {
                                    return t && t(n)
                                }))
                            }))
                        }
                    }, {
                        key: "uploadFile",
                        value: function(e, t, r) {
                            var n = this;
                            return this.startProcessing(t, (function(o) {
                                if (!e || !t) return o();
                                n.handleExternalFile(e, t, {
                                    configurations: r
                                }).then((function(e) {
                                    var t = e.url,
                                        r = e.name;
                                    return n.parseResume(t, r)
                                })).catch(n.setError).finally(o)
                            }))
                        }
                    }, {
                        key: "handleExternalFile",
                        value: function(e, t) {
                            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                                n = r.configurations,
                                o = r.fieldId,
                                i = void 0 === o ? this.props.id : o,
                                a = r.options,
                                l = void 0 === a ? {} : a,
                                u = this.props.handleFileChange;
                            return Tt.downloadBlob(e, n).then((function(e) {
                                return e.name = t, u && u(e, i, l)
                            }))
                        }
                    }, {
                        key: "onDropboxSuccess",
                        value: function(e) {
                            var t = e && e[0],
                                r = t.link,
                                n = t.name;
                            return this.uploadFile(r, n)
                        }
                    }, {
                        key: "onGoogleDriveSuccess",
                        value: function(e, t, r) {
                            return this.uploadFile(e, t, {
                                headers: {
                                    Authorization: "Bearer ".concat(r)
                                }
                            })
                        }
                    }, {
                        key: "onSelectFile",
                        value: function(e) {
                            var t = this,
                                r = this.props,
                                n = r.handleFileChange,
                                o = r.maxFileSize,
                                i = r.id,
                                a = r.i18n;
                            if (n) {
                                var l = function(e) {
                                    var t;
                                    return null === (t = e.target) || void 0 === t || null === (t = t.files) || void 0 === t ? void 0 : t[0]
                                }(e);
                                return function(e) {
                                        e && e.target && (e.target.value = null)
                                    }(e),
                                    function(e) {
                                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 52428800;
                                        return e && e.size && Number(t) >= e.size
                                    }(l, o) ? this.startProcessing(l && l.name, (function(e) {
                                        return n(l, i).then((function(r) {
                                            var n = r.url,
                                                o = r.name;
                                            return n ? t.parseResume(n, o).finally(e) : e()
                                        })).catch(t.setError)
                                    })) : this.setState({
                                        processing: !1,
                                        open: !1,
                                        error: {
                                            name: l && l.name,
                                            message: a.t("form.fields.resume.error.bigFile")
                                        }
                                    })
                            }
                        }
                    }, {
                        key: "processAvatarFromResume",
                        value: function(e) {
                            var t = this.props,
                                r = t.getAvatarField,
                                n = t.setAvatarFieldValue;
                            if (!r || !n) return Promise.resolve(e);
                            var o = r(e);
                            if (!o || o && !o.value) return Promise.resolve(e);
                            var i = o.value,
                                a = i.url,
                                l = i.name;
                            return this.handleExternalFile(a, l, {
                                fieldId: "avatar",
                                options: {
                                    updateState: !1,
                                    resetProgress: !1
                                }
                            }).then((function(t) {
                                var r = t.url,
                                    o = t.name;
                                return n({
                                    form: e,
                                    value: {
                                        url: r,
                                        name: o
                                    }
                                })
                            })).catch((function() {
                                return n({
                                    form: e,
                                    value: void 0
                                })
                            }))
                        }
                    }, {
                        key: "parseResume",
                        value: function(e, t) {
                            var r = this;
                            this.abortController = new AbortController;
                            var n, o = this.props,
                                i = o.getUploadedCVDetails,
                                a = o.onUsedUploadedCvDetails,
                                l = o.onFileChange,
                                u = o.resetErrors;
                            if (i) return i({
                                params: {
                                    url: e
                                },
                                headers: {
                                    "x-autofill-filename": (n = t, n && n.replace(/[^A-Za-z 0-9 -_\.]*/g, ""))
                                },
                                signal: this.abortController.signal
                            }).then((function(e) {
                                return r.processAvatarFromResume(e)
                            })).then((function(n) {
                                return new Promise((function(o) {
                                    return r.setState({
                                        form: n,
                                        error: void 0,
                                        processing: !1
                                    }, (function() {
                                        u && u(), l && l("resume", {
                                            url: e,
                                            name: t
                                        }), o()
                                    }))
                                }))
                            })).then((function() {
                                a && a()
                            })).catch((function(e) {
                                var t;
                                "AbortError" === (null == e ? void 0 : e.name) || null != e && null !== (t = e.error) && void 0 !== t && t.includes("AbortError") || r.setState({
                                    error: e,
                                    form: void 0,
                                    processing: !1
                                })
                            })).finally(this.closeButton)
                        }
                    }, {
                        key: "onCancelUpload",
                        value: function() {
                            this.setState({
                                canceled: !0
                            })
                        }
                    }, {
                        key: "getProgress",
                        value: function() {
                            var e = this.state.processing,
                                t = this.props.progress;
                            return this.progressReachTop && e ? 90 : (100 === t && (this.progressReachTop = !0), j()(this.state.form) ? .8 * this.props.progress : 100)
                        }
                    }, {
                        key: "closeButton",
                        value: function() {
                            this.setState({
                                open: !1
                            })
                        }
                    }, {
                        key: "toggleButton",
                        value: function() {
                            this.setState((function(e) {
                                return {
                                    open: !e.open
                                }
                            }))
                        }
                    }, {
                        key: "render",
                        value: function() {
                            var e = this.props,
                                t = e.ApplyWithLinkedin,
                                r = e.networkErrorStatus,
                                o = e.Button,
                                i = e.uploadButtonStyles,
                                a = void 0 === i ? "styles--11blb" : i,
                                u = e.i18n,
                                c = e.title,
                                s = this.state,
                                f = s.canceled,
                                p = s.name,
                                d = s.processing,
                                v = s.open,
                                h = s.error,
                                y = this.getProgress(),
                                m = !f && d;
                            if (h) throw h;
                            return n.createElement("div", {
                                className: "styles--1euHv"
                            }, n.createElement(Yr.Ay, null, n.createElement("div", {
                                className: "styles--3uFdJ"
                            }, n.createElement(mn, {
                                title: c,
                                fileTypes: wo.filter((function(e) {
                                    return e.startsWith(".")
                                }))
                            }), n.createElement(fo, {
                                as: o || l.A,
                                ApplyWithLinkedin: t,
                                className: a,
                                open: v,
                                supportedFileTypes: wo,
                                supportedMimeTypes: (0, Wr.A)(["DOCS"], !1),
                                onDropboxSuccess: this.onDropboxSuccess,
                                onSelectFile: this.onSelectFile,
                                closeButton: this.closeButton,
                                toggleButton: this.toggleButton,
                                onGoogleDriveSuccess: this.onGoogleDriveSuccess
                            })), n.createElement(zn, {
                                onClose: this.closeNotifier,
                                shouldDisplay: this.shouldShowNotifier(),
                                flavor: r ? zn.Flavors.DANGER : zn.Flavors.SUCCESS,
                                text: r ? Jr(r, u) : u.t("form.quickApply.alert.success")
                            })), n.createElement(Pn, {
                                isOpen: m,
                                progress: y,
                                onCancelUpload: this.onCancelUpload,
                                name: p
                            }))
                        }
                    }], o && vo(r.prototype, o), Object.defineProperty(r, "prototype", {
                        writable: !1
                    }), r;
                    var r, o
                }(n.Component);
            const Oo = Eo;

            function So() {
                return So = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, So.apply(null, arguments)
            }
            const jo = function(e) {
                return n.createElement(f.A.Consumer, null, (function(t) {
                    return n.createElement(d.Consumer, null, (function() {
                        var r = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).updateForm;
                        return n.createElement(q.Consumer, null, (function(o) {
                            var i = o.deleteValue,
                                a = o.onChange;
                            return n.createElement(Ce.Consumer, null, (function(o) {
                                var l = o.resetErrors;
                                return n.createElement(qr, null, (function(o) {
                                    var u = o.networkErrorStatus,
                                        c = o.clearError;
                                    return n.createElement(p.Consumer, null, (function(o) {
                                        var s = o.getUploadedCVDetails,
                                            f = o.onUsedUploadedCvDetails;
                                        return n.createElement(Vt, null, (function(o) {
                                            var p = o.progress,
                                                d = o.onCancelUpload,
                                                v = o.handleFileChange,
                                                h = o.resetData;
                                            return n.createElement(Oo, So({
                                                deleteValueFromState: i,
                                                getAvatarField: Qr,
                                                getUploadedCVDetails: s,
                                                handleFileChange: v,
                                                onCancelUpload: d,
                                                onFileChange: a,
                                                onUsedUploadedCvDetails: f,
                                                progress: p,
                                                resetErrors: l,
                                                resetS3Data: h,
                                                setAvatarFieldValue: en,
                                                i18n: t,
                                                updateForm: r,
                                                networkErrorStatus: u,
                                                clearNetworkError: c
                                            }, e))
                                        }))
                                    }))
                                }))
                            }))
                        }))
                    }))
                }))
            };
            var Po = r(80440),
                Ao = r(54166),
                Co = r(80617),
                ko = r(92594),
                xo = (r(4645), r(51648)),
                Mo = ["value"];

            function Fo() {
                return Fo = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, Fo.apply(null, arguments)
            }
            const Do = n.memo((function(e) {
                var t = e.value,
                    r = function(e, t) {
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
                    }(e, Mo),
                    o = n.createRef();
                return (0, n.useEffect)((function() {
                    o.current && o.current.defaultValue && (o.current.defaultValue = "")
                }), [t, o]), n.createElement(xo.A, Fo({
                    onLoad: function(e) {
                        return o.current = e
                    },
                    value: t
                }, r))
            }));
            var To = ["PickerComponent"],
                zo = function() {
                    var e = parseInt(Ln.browserVersion, 10) || 0;
                    return window.navigator.maxTouchPoints > 1 && !Ln.isFirefox && e > 5 && (Ln.isIOS || Ln.isAndroid)
                },
                Lo = Ln.isIOS && (parseInt(Ln.browserVersion, 10) || 0) > 5 ? Do : xo.A;
            const Io = function(e) {
                var t = e.PickerComponent,
                    r = void 0 === t ? Lo : t,
                    o = function(e, t) {
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
                    }(e, To);
                return n.createElement(r, o)
            };
            var _o = ["native"];

            function No() {
                return No = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, No.apply(null, arguments)
            }
            const Uo = function(e) {
                var t = e.native,
                    r = function(e, t) {
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
                    }(e, _o),
                    o = (0, f.s)();
                return (0, n.useMemo)((function() {
                    return null != t ? t : zo()
                }), [t]) ? n.createElement(Io, No({}, r, {
                    type: "date"
                })) : n.createElement(ko.A, No({}, r, {
                    locale: o.language,
                    isMonthYearSelect: !0
                }))
            };
            var Vo = r(48958),
                Ro = ["native", "value"];

            function Bo() {
                return Bo = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, Bo.apply(null, arguments)
            }
            const Go = function(e) {
                var t = e.native,
                    r = e.value,
                    o = function(e, t) {
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
                    }(e, Ro),
                    i = (0, f.s)();
                return (0, n.useMemo)((function() {
                    return null != t ? t : zo()
                }), [t]) ? n.createElement(Io, Bo({}, o, {
                    value: r && (0, Vo.A)(new Date(r), "YYYY-MM", {
                        useAdditionalDayOfYearTokens: !0,
                        useAdditionalWeekYearTokens: !0
                    }),
                    type: "month"
                })) : n.createElement(ko.A, Bo({
                    value: r
                }, o, {
                    locale: i.language
                }))
            };
            var qo = r(61197),
                Yo = ["options", "placeholder"];

            function Wo() {
                return Wo = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, Wo.apply(null, arguments)
            }
            const Ko = function(e) {
                var t = e.options,
                    r = e.placeholder,
                    o = function(e, t) {
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
                    }(e, Yo),
                    i = (0, f.s)();
                return n.createElement(qo.A, Wo({
                    placeholder: r || i.t("form.fields.select.placeholder")
                }, o, {
                    options: (0, n.useMemo)((function() {
                        return t && t.map((function(e) {
                            return {
                                value: e.name,
                                display: e.value
                            }
                        }))
                    }), [t])
                }))
            };
            var $o = r(20714);
            var Ho = ["onBlur", "onChange", "fetchAvatar", "avatarFetchingDone", "hideInfoSection", "texts", "shouldGuessAvatar"];

            function Xo() {
                return Xo = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, Xo.apply(null, arguments)
            }
            var Zo = function() {
                    var e = (0, f.s)();
                    return n.createElement(An.A.Static, {
                        className: "styles--XB1wE"
                    }, n.createElement(sn, null), n.createElement("span", null, e.t("form.fields.email.avatarFetched")))
                },
                Jo = function(e) {
                    var t = e.onBlur,
                        r = e.onChange,
                        o = e.fetchAvatar,
                        i = e.avatarFetchingDone,
                        a = e.hideInfoSection,
                        l = e.texts,
                        u = e.shouldGuessAvatar,
                        c = void 0 !== u && u,
                        s = function(e, t) {
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
                        }(e, Ho);
                    return (0, n.useEffect)((function() {
                        return function() {
                            return a && a()
                        }
                    }), []), n.createElement(n.Fragment, null, n.createElement($o.A.Text, Xo({
                        type: "email"
                    }, s, {
                        onBlur: c ? function(e) {
                            o && o(e.target), t && t(e)
                        } : t,
                        onChange: c ? function(e) {
                            r && r(e), i && i() && a && a()
                        } : r,
                        texts: l
                    })), i && i() && n.createElement(Zo, null))
                };
            const Qo = function(e) {
                return n.createElement(Rt.Consumer, null, (function(t) {
                    var r = t.fetchAvatar,
                        o = t.isDone,
                        i = t.resetProcess;
                    return n.createElement(Jo, Xo({
                        fetchAvatar: r,
                        hideInfoSection: i,
                        avatarFetchingDone: o
                    }, e))
                }))
            };
            var ei = r(79062),
                ti = r(87172),
                ri = r(86767),
                ni = r(32096);

            function oi(e) {
                return oi = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, oi(e)
            }

            function ii() {
                ii = function() {
                    return t
                };
                var e, t = {},
                    r = Object.prototype,
                    n = r.hasOwnProperty,
                    o = Object.defineProperty || function(e, t, r) {
                        e[t] = r.value
                    },
                    i = "function" == typeof Symbol ? Symbol : {},
                    a = i.iterator || "@@iterator",
                    l = i.asyncIterator || "@@asyncIterator",
                    u = i.toStringTag || "@@toStringTag";

                function c(e, t, r) {
                    return Object.defineProperty(e, t, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }), e[t]
                }
                try {
                    c({}, "")
                } catch (e) {
                    c = function(e, t, r) {
                        return e[t] = r
                    }
                }

                function s(e, t, r, n) {
                    var i = t && t.prototype instanceof m ? t : m,
                        a = Object.create(i.prototype),
                        l = new M(n || []);
                    return o(a, "_invoke", {
                        value: A(e, r, l)
                    }), a
                }

                function f(e, t, r) {
                    try {
                        return {
                            type: "normal",
                            arg: e.call(t, r)
                        }
                    } catch (e) {
                        return {
                            type: "throw",
                            arg: e
                        }
                    }
                }
                t.wrap = s;
                var p = "suspendedStart",
                    d = "suspendedYield",
                    v = "executing",
                    h = "completed",
                    y = {};

                function m() {}

                function b() {}

                function g() {}
                var w = {};
                c(w, a, (function() {
                    return this
                }));
                var E = Object.getPrototypeOf,
                    O = E && E(E(F([])));
                O && O !== r && n.call(O, a) && (w = O);
                var S = g.prototype = m.prototype = Object.create(w);

                function j(e) {
                    ["next", "throw", "return"].forEach((function(t) {
                        c(e, t, (function(e) {
                            return this._invoke(t, e)
                        }))
                    }))
                }

                function P(e, t) {
                    function r(o, i, a, l) {
                        var u = f(e[o], e, i);
                        if ("throw" !== u.type) {
                            var c = u.arg,
                                s = c.value;
                            return s && "object" == oi(s) && n.call(s, "__await") ? t.resolve(s.__await).then((function(e) {
                                r("next", e, a, l)
                            }), (function(e) {
                                r("throw", e, a, l)
                            })) : t.resolve(s).then((function(e) {
                                c.value = e, a(c)
                            }), (function(e) {
                                return r("throw", e, a, l)
                            }))
                        }
                        l(u.arg)
                    }
                    var i;
                    o(this, "_invoke", {
                        value: function(e, n) {
                            function o() {
                                return new t((function(t, o) {
                                    r(e, n, t, o)
                                }))
                            }
                            return i = i ? i.then(o, o) : o()
                        }
                    })
                }

                function A(t, r, n) {
                    var o = p;
                    return function(i, a) {
                        if (o === v) throw Error("Generator is already running");
                        if (o === h) {
                            if ("throw" === i) throw a;
                            return {
                                value: e,
                                done: !0
                            }
                        }
                        for (n.method = i, n.arg = a;;) {
                            var l = n.delegate;
                            if (l) {
                                var u = C(l, n);
                                if (u) {
                                    if (u === y) continue;
                                    return u
                                }
                            }
                            if ("next" === n.method) n.sent = n._sent = n.arg;
                            else if ("throw" === n.method) {
                                if (o === p) throw o = h, n.arg;
                                n.dispatchException(n.arg)
                            } else "return" === n.method && n.abrupt("return", n.arg);
                            o = v;
                            var c = f(t, r, n);
                            if ("normal" === c.type) {
                                if (o = n.done ? h : d, c.arg === y) continue;
                                return {
                                    value: c.arg,
                                    done: n.done
                                }
                            }
                            "throw" === c.type && (o = h, n.method = "throw", n.arg = c.arg)
                        }
                    }
                }

                function C(t, r) {
                    var n = r.method,
                        o = t.iterator[n];
                    if (o === e) return r.delegate = null, "throw" === n && t.iterator.return && (r.method = "return", r.arg = e, C(t, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
                    var i = f(o, t.iterator, r.arg);
                    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
                    var a = i.arg;
                    return a ? a.done ? (r[t.resultName] = a.value, r.next = t.nextLoc, "return" !== r.method && (r.method = "next", r.arg = e), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y)
                }

                function k(e) {
                    var t = {
                        tryLoc: e[0]
                    };
                    1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t)
                }

                function x(e) {
                    var t = e.completion || {};
                    t.type = "normal", delete t.arg, e.completion = t
                }

                function M(e) {
                    this.tryEntries = [{
                        tryLoc: "root"
                    }], e.forEach(k, this), this.reset(!0)
                }

                function F(t) {
                    if (t || "" === t) {
                        var r = t[a];
                        if (r) return r.call(t);
                        if ("function" == typeof t.next) return t;
                        if (!isNaN(t.length)) {
                            var o = -1,
                                i = function r() {
                                    for (; ++o < t.length;)
                                        if (n.call(t, o)) return r.value = t[o], r.done = !1, r;
                                    return r.value = e, r.done = !0, r
                                };
                            return i.next = i
                        }
                    }
                    throw new TypeError(oi(t) + " is not iterable")
                }
                return b.prototype = g, o(S, "constructor", {
                    value: g,
                    configurable: !0
                }), o(g, "constructor", {
                    value: b,
                    configurable: !0
                }), b.displayName = c(g, u, "GeneratorFunction"), t.isGeneratorFunction = function(e) {
                    var t = "function" == typeof e && e.constructor;
                    return !!t && (t === b || "GeneratorFunction" === (t.displayName || t.name))
                }, t.mark = function(e) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(e, g) : (e.__proto__ = g, c(e, u, "GeneratorFunction")), e.prototype = Object.create(S), e
                }, t.awrap = function(e) {
                    return {
                        __await: e
                    }
                }, j(P.prototype), c(P.prototype, l, (function() {
                    return this
                })), t.AsyncIterator = P, t.async = function(e, r, n, o, i) {
                    void 0 === i && (i = Promise);
                    var a = new P(s(e, r, n, o), i);
                    return t.isGeneratorFunction(r) ? a : a.next().then((function(e) {
                        return e.done ? e.value : a.next()
                    }))
                }, j(S), c(S, u, "Generator"), c(S, a, (function() {
                    return this
                })), c(S, "toString", (function() {
                    return "[object Generator]"
                })), t.keys = function(e) {
                    var t = Object(e),
                        r = [];
                    for (var n in t) r.push(n);
                    return r.reverse(),
                        function e() {
                            for (; r.length;) {
                                var n = r.pop();
                                if (n in t) return e.value = n, e.done = !1, e
                            }
                            return e.done = !0, e
                        }
                }, t.values = F, M.prototype = {
                    constructor: M,
                    reset: function(t) {
                        if (this.prev = 0, this.next = 0, this.sent = this._sent = e, this.done = !1, this.delegate = null, this.method = "next", this.arg = e, this.tryEntries.forEach(x), !t)
                            for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = e)
                    },
                    stop: function() {
                        this.done = !0;
                        var e = this.tryEntries[0].completion;
                        if ("throw" === e.type) throw e.arg;
                        return this.rval
                    },
                    dispatchException: function(t) {
                        if (this.done) throw t;
                        var r = this;

                        function o(n, o) {
                            return l.type = "throw", l.arg = t, r.next = n, o && (r.method = "next", r.arg = e), !!o
                        }
                        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                            var a = this.tryEntries[i],
                                l = a.completion;
                            if ("root" === a.tryLoc) return o("end");
                            if (a.tryLoc <= this.prev) {
                                var u = n.call(a, "catchLoc"),
                                    c = n.call(a, "finallyLoc");
                                if (u && c) {
                                    if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                                    if (this.prev < a.finallyLoc) return o(a.finallyLoc)
                                } else if (u) {
                                    if (this.prev < a.catchLoc) return o(a.catchLoc, !0)
                                } else {
                                    if (!c) throw Error("try statement without catch or finally");
                                    if (this.prev < a.finallyLoc) return o(a.finallyLoc)
                                }
                            }
                        }
                    },
                    abrupt: function(e, t) {
                        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                            var o = this.tryEntries[r];
                            if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                                var i = o;
                                break
                            }
                        }
                        i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);
                        var a = i ? i.completion : {};
                        return a.type = e, a.arg = t, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a)
                    },
                    complete: function(e, t) {
                        if ("throw" === e.type) throw e.arg;
                        return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), y
                    },
                    finish: function(e) {
                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                            var r = this.tryEntries[t];
                            if (r.finallyLoc === e) return this.complete(r.completion, r.afterLoc), x(r), y
                        }
                    },
                    catch: function(e) {
                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                            var r = this.tryEntries[t];
                            if (r.tryLoc === e) {
                                var n = r.completion;
                                if ("throw" === n.type) {
                                    var o = n.arg;
                                    x(r)
                                }
                                return o
                            }
                        }
                        throw Error("illegal catch attempt")
                    },
                    delegateYield: function(t, r, n) {
                        return this.delegate = {
                            iterator: F(t),
                            resultName: r,
                            nextLoc: n
                        }, "next" === this.method && (this.arg = e), y
                    }
                }, t
            }

            function ai(e, t, r, n, o, i, a) {
                try {
                    var l = e[i](a),
                        u = l.value
                } catch (e) {
                    return void r(e)
                }
                l.done ? t(u) : Promise.resolve(u).then(n, o)
            }

            function li(e) {
                return function() {
                    var t = this,
                        r = arguments;
                    return new Promise((function(n, o) {
                        var i = e.apply(t, r);

                        function a(e) {
                            ai(i, n, o, a, l, "next", e)
                        }

                        function l(e) {
                            ai(i, n, o, a, l, "throw", e)
                        }
                        a(void 0)
                    }))
                }
            }

            function ui(e, t) {
                return function(e) {
                    if (Array.isArray(e)) return e
                }(e) || function(e, t) {
                    var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                    if (null != r) {
                        var n, o, i, a, l = [],
                            u = !0,
                            c = !1;
                        try {
                            if (i = (r = r.call(e)).next, 0 === t) {
                                if (Object(r) !== r) return;
                                u = !1
                            } else
                                for (; !(u = (n = i.call(r)).done) && (l.push(n.value), l.length !== t); u = !0);
                        } catch (e) {
                            c = !0, o = e
                        } finally {
                            try {
                                if (!u && null != r.return && (a = r.return(), Object(a) !== a)) return
                            } finally {
                                if (c) throw o
                            }
                        }
                        return l
                    }
                }(e, t) || function(e, t) {
                    if (e) {
                        if ("string" == typeof e) return ci(e, t);
                        var r = {}.toString.call(e).slice(8, -1);
                        return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? ci(e, t) : void 0
                    }
                }(e, t) || function() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function ci(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }
            var si = function(e) {
                var t = e.i18n,
                    r = e.allowedFileTypes,
                    o = e.onFileChange;
                return n.createElement("div", {
                    className: "styles--2vtlS"
                }, n.createElement("label", {
                    className: "styles--3FVhP",
                    htmlFor: "avatar-upload"
                }, t.t("form.fields.avatar.crop.useAnother")), n.createElement("input", {
                    type: "file",
                    id: "avatar-upload",
                    hidden: !0,
                    accept: null == r ? void 0 : r.join(),
                    onChange: o
                }))
            };
            si[ti.Ay.Button.Tertiary] = !0;
            const fi = (0, n.memo)((function(e) {
                var t = e.name,
                    r = e.src,
                    i = e.onClose,
                    a = e.onUpload,
                    c = e.allowedFileTypes,
                    s = e.onSelectFile,
                    p = ui((0, n.useState)(null), 2),
                    d = p[0],
                    v = p[1],
                    h = ui((0, n.useState)(""), 2),
                    y = h[0],
                    m = h[1],
                    b = (0, f.s)(),
                    g = (0, n.useCallback)((function() {
                        (0, Ht.unstable_batchedUpdates)((function() {
                            v(null), m("")
                        }))
                    }), []),
                    w = (0, n.useCallback)((function(e) {
                        m(e);
                        var r = document.createElement("img");
                        r.onload = li(ii().mark((function e() {
                            var n, o;
                            return ii().wrap((function(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return n = Ae(r), e.next = 3, (0, ni.A)(n, t);
                                    case 3:
                                        o = e.sent, v(o);
                                    case 5:
                                    case "end":
                                        return e.stop()
                                }
                            }), e)
                        }))), r.src = e
                    }), [t]),
                    E = (0, n.useCallback)((function() {
                        i(), g()
                    }), [i]),
                    O = (0, n.useCallback)((function() {
                        a(d)
                    }), [d, a]),
                    S = (0, n.useCallback)((function(e) {
                        g(), s(e && e.target && e.target.files)
                    }), [s]);
                return n.createElement(bn.Ay, {
                    className: (0, o.A)("styles--QMpdY", "styles--2GFC9"),
                    open: !!r,
                    onClose: E,
                    size: 680,
                    sticky: !0
                }, n.createElement(bn.hE, null, b.t("form.fields.avatar.crop.title")), n.createElement(bn.UC, null, n.createElement(u.A, {
                    secondary: !0
                }, b.t("form.fields.avatar.crop.area")), n.createElement("div", {
                    className: "styles--2Cc_D"
                }, n.createElement("div", {
                    className: "styles--3Kkjv"
                }, n.createElement(ri.A, {
                    src: r,
                    ratio: 1,
                    circular: !0,
                    onChange: w,
                    className: "styles--gW537",
                    mobile: Ln.isMobile
                })), n.createElement("div", {
                    className: "styles--WOvJ-"
                }, n.createElement("img", {
                    id: "image-preview",
                    src: y
                }), n.createElement(u.A, {
                    className: "styles--If18l",
                    strong: !0
                }, b.t("form.fields.avatar.crop.preview"))))), n.createElement(bn.En, null, n.createElement(si, {
                    allowedFileTypes: c,
                    i18n: b,
                    onFileChange: S
                }), n.createElement(l.A, {
                    "data-ui": "crop-image",
                    onClick: O,
                    disabled: !d,
                    type: "button"
                }, b.t("form.fields.avatar.crop.action"))))
            }));
            var pi = r(21214);
            const di = rn()({
                loader: function() {
                    return r.e(2089).then(r.bind(r, 34053))
                },
                loading: function() {
                    return null
                }
            });

            function vi() {
                return vi = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, vi.apply(null, arguments)
            }
            var hi = function() {
                var e = (0, f.s)();
                return n.createElement("div", {
                    className: "styles--1i2Kp",
                    "data-ui": "avatar-fetching"
                }, n.createElement("div", {
                    className: "styles--1SN6I"
                }, n.createElement(di, null)), n.createElement("span", null, e.t("form.fields.avatar.fetching")))
            };

            function yi(e) {
                return yi = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, yi(e)
            }

            function mi() {
                return mi = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, mi.apply(null, arguments)
            }

            function bi(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function gi(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? bi(Object(r), !0).forEach((function(t) {
                        wi(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : bi(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }

            function wi(e, t, r) {
                return (t = function(e) {
                    var t = function(e, t) {
                        if ("object" != yi(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, "string");
                            if ("object" != yi(n)) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == yi(t) ? t : t + ""
                }(t)) in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }

            function Ei(e) {
                return function(e) {
                    if (Array.isArray(e)) return Si(e)
                }(e) || function(e) {
                    if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
                }(e) || Oi(e) || function() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function Oi(e, t) {
                if (e) {
                    if ("string" == typeof e) return Si(e, t);
                    var r = {}.toString.call(e).slice(8, -1);
                    return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Si(e, t) : void 0
                }
            }

            function Si(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }
            var ji = function(e) {
                var t, r, o = e.id,
                    i = e.value,
                    a = e.error,
                    l = e.label,
                    u = e.file,
                    c = e.required,
                    s = e.optional,
                    p = e.progress,
                    d = e.resetS3Data,
                    v = e.maxFileSize,
                    h = void 0 === v ? 52428800 : v,
                    y = e.resetError,
                    m = e.onFileChange,
                    b = e.setError,
                    g = e.handleFileChange,
                    w = e.supportedFileTypes,
                    E = e.supportedMimeTypes,
                    O = e.deleteValueFromState,
                    S = e.networkError,
                    j = e.startProcessing,
                    P = e.endProcessing,
                    A = e.isProcessing,
                    C = e.isFetchingAvatar,
                    k = e.onCancelUpload,
                    x = (t = (0, n.useState)(null), r = 2, function(e) {
                        if (Array.isArray(e)) return e
                    }(t) || function(e, t) {
                        var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                        if (null != r) {
                            var n, o, i, a, l = [],
                                u = !0,
                                c = !1;
                            try {
                                if (i = (r = r.call(e)).next, 0 === t) {
                                    if (Object(r) !== r) return;
                                    u = !1
                                } else
                                    for (; !(u = (n = i.call(r)).done) && (l.push(n.value), l.length !== t); u = !0);
                            } catch (e) {
                                c = !0, o = e
                            } finally {
                                try {
                                    if (!u && null != r.return && (a = r.return(), Object(a) !== a)) return
                                } finally {
                                    if (c) throw o
                                }
                            }
                            return l
                        }
                    }(t, r) || Oi(t, r) || function() {
                        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }()),
                    M = x[0],
                    F = x[1],
                    D = (0, f.s)(),
                    T = Cr().isSubmitting,
                    z = function() {
                        return y && y(o)
                    },
                    L = function() {
                        return d && d()
                    },
                    I = (0, n.useCallback)((function(e) {
                        return m && m(o, e)
                    }), [m, o]),
                    _ = function() {
                        return O && O(o)
                    },
                    N = (0, n.useCallback)((function() {
                        return F(null)
                    }), [F]),
                    U = (0, n.useMemo)((function() {
                        return (e = M) instanceof Blob ? URL && URL.createObjectURL && URL.createObjectURL(e) : e;
                        var e
                    }), [M]),
                    V = (0, n.useMemo)((function() {
                        var e = D.getSharedResources();
                        return e ? {
                            control: e.control,
                            dropfile: e.dropfile
                        } : {}
                    }), [D.language]),
                    R = (0, n.useCallback)((function() {
                        P && k && (P(o), k(), I(void 0))
                    }), [P, k, I, o]);
                (0, n.useEffect)((function() {
                    T && A && R()
                }), [T, A, R]), (0, n.useEffect)((function() {
                    !i && u && u.url && (L(), z())
                }), [i, null == u ? void 0 : u.url, y, d]), (0, n.useEffect)((function() {
                    S && b && (I(void 0), b(o, D.t("form.fields.resume.error.generalError")))
                }), [S, b]);
                var B, G = (0, n.useCallback)((function(e) {
                        var t;
                        if (k && (k(), I(void 0)), g) return j && j(o), I({
                            url: e
                        }), (null !== (t = g(e, o)) && void 0 !== t ? t : Promise.resolve()).then((function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                                t = e.url,
                                r = void 0 === t ? "" : t,
                                n = e.name,
                                o = void 0 === n ? "" : n;
                            r && o ? I({
                                url: r,
                                name: o
                            }) : (L(), I(void 0))
                        })).catch((function() {
                            return b && b(o, D.t("form.fields.resume.error.generalError"))
                        })).finally((function() {
                            return P && P(o)
                        }))
                    }), [o, j, P, b, g]),
                    q = (0, n.useCallback)((function(e) {
                        N(), G(e)
                    })),
                    Y = (0, n.useCallback)((function(e) {
                        var t = e && e[0];
                        return z(), Kr(o) ? F(t) : G(t)
                    }), [o]),
                    W = function(e) {
                        return function(t) {
                            I({
                                name: t.name
                            }), b && b(o, e)
                        }
                    },
                    K = (0, n.useCallback)(W(D.t("form.fields.resume.error.bigFile")), [o, b]),
                    $ = (0, n.useCallback)(W(D.t("form.quickApply.alert.useDifferentFile")), [o, b]),
                    H = (0, n.useCallback)((function() {
                        z(), _()
                    })),
                    X = [].concat(Ei(w || []), Ei(E || []));
                return n.createElement("div", {
                    className: "styles--2mJeY"
                }, n.createElement(ei.o, {
                    label: l,
                    tooltip: D.t("form.fields.resume.helperText", {
                        size: (B = h, "".concat(Math.floor(B / 1e4) / 100, " MB")),
                        types: w && w.join(", ")
                    }),
                    required: c,
                    optional: s,
                    maxFileSize: h / 1024,
                    handleFileSizeError: K,
                    handleFilesAdded: Y,
                    allowedFileTypes: X.length > 0 ? X : ei.o.constants.FILE_TYPE.DOCS,
                    handleUnsupportedFileTypeError: $,
                    "data-ui": o,
                    className: "styles--YBb-N",
                    texts: V
                }, function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = e.id,
                        r = void 0 === t ? void 0 : t,
                        o = e.file,
                        i = void 0 === o ? void 0 : o,
                        a = e.progress,
                        l = void 0 === a ? -1 : a,
                        u = e.onDelete,
                        c = void 0 === u ? void 0 : u,
                        s = e.onErrorClose,
                        f = e.isFetchingAvatar,
                        p = e.supportedMimeTypes,
                        d = e.onCancel,
                        v = e.error,
                        h = {
                            error: he()(v) ? v : v && v.url,
                            progressTotal: 100,
                            file: {
                                name: i && i.name,
                                url: i && i.url
                            },
                            progressCurrent: l,
                            handleFileDelete: c,
                            handleErroredFileClose: s,
                            handleCancelUpload: d
                        };
                    return f && f() && Kr(r) ? n.createElement(hi, null) : l >= 0 && l <= 100 || i && i.url || v ? function(e) {
                        return e && e.every((function(e) {
                            return e.includes("image/")
                        }))
                    }(p) ? n.createElement(pi.Ay, vi({}, h, {
                        as: pi.kE
                    })) : n.createElement(wn.A, vi({}, h, {
                        className: v ? "styles--3IS-f" : void 0
                    })) : null
                }({
                    id: o,
                    file: u,
                    error: a,
                    progress: p,
                    onDelete: function() {
                        L(), _()
                    },
                    onErrorClose: H,
                    isFetchingAvatar: C,
                    supportedMimeTypes: E,
                    onCancel: R
                })), n.createElement(fi, {
                    name: M && M.name,
                    src: U,
                    onClose: N,
                    onUpload: q,
                    allowedFileTypes: w,
                    onSelectFile: Y
                }))
            };
            const Pi = function(e) {
                return n.createElement(q.Consumer, null, (function(t) {
                    var r = t.deleteValue,
                        o = t.onChange;
                    return n.createElement(Ke.Consumer, null, (function(t) {
                        var i = t.startProcessing,
                            a = t.processing,
                            l = t.endProcessing;
                        return n.createElement(Ce.Consumer, null, (function(t) {
                            var u = t.setError,
                                c = t.resetError;
                            return n.createElement(qr, {
                                shouldHandleError: function(e) {
                                    var t = we(e);
                                    return parseInt(t, 10) >= 400 || "network_error" === t
                                }
                            }, (function(t) {
                                var s = t.error;
                                return n.createElement(Rt.Consumer, null, (function(t) {
                                    var f = t.isFetching;
                                    return n.createElement(Vt, null, (function() {
                                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                                            p = t.file,
                                            d = t.progress,
                                            v = t.handleFileChange,
                                            h = t.resetData,
                                            y = t.onCancelUpload;
                                        return n.createElement(ji, mi({}, e, {
                                            progress: d,
                                            handleFileChange: v,
                                            file: gi(gi({}, p), e.value),
                                            deleteValueFromState: r,
                                            onFileChange: o,
                                            resetS3Data: h,
                                            resetError: c,
                                            setError: u,
                                            networkError: s,
                                            startProcessing: i,
                                            endProcessing: l,
                                            isFetchingAvatar: f,
                                            onCancelUpload: y,
                                            isProcessing: a
                                        }))
                                    }))
                                }))
                            }))
                        }))
                    }))
                }))
            };
            var Ai = ["id", "name", "value", "onChange", "error", "url", "required", "onlyTrueAllowed", "onBlur", "errorMessage", "message"];

            function Ci() {
                return Ci = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, Ci.apply(null, arguments)
            }
            const ki = function(e) {
                var t = e.id,
                    r = e.name,
                    o = e.value,
                    i = e.onChange,
                    a = e.error,
                    l = e.url,
                    u = e.required,
                    s = (e.onlyTrueAllowed, e.onBlur),
                    p = e.errorMessage,
                    d = e.message,
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
                    }(e, Ai),
                    h = (0, f.s)(),
                    y = (0, n.useMemo)((function() {
                        return (0, c.A)(h)
                    }), [h]);
                return n.createElement("div", {
                    className: "styles--1C6Ij",
                    "data-ui": t
                }, n.createElement($o.A.Checkbox, Ci({}, v, {
                    className: u ? "styles--2BwKj styles--1-8C3" : "styles--1-8C3",
                    name: r || t,
                    checked: !!o,
                    onChange: (0, n.useCallback)((function(e) {
                        var r = e.target.checked;
                        i && i(t, r), s && s(e, r)
                    }), [i, s]),
                    error: a && h.t(p)
                }), n.createElement(y, {
                    Node: "span",
                    url: l
                }, d)))
            };

            function xi(e) {
                return xi = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, xi(e)
            }
            var Mi = ["gdprPrivacyNoticeUrl"];

            function Fi() {
                return Fi = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, Fi.apply(null, arguments)
            }

            function Di(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function Ti(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? Di(Object(r), !0).forEach((function(t) {
                        zi(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Di(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }

            function zi(e, t, r) {
                return (t = function(e) {
                    var t = function(e, t) {
                        if ("object" != xi(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, "string");
                            if ("object" != xi(n)) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == xi(t) ? t : t + ""
                }(t)) in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }
            var Li = function(e, t) {
                var n;
                if (t) {
                    var o = function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                            t = r.g.document.createElement("a");
                        return new RegExp(Oe).test(e) ? (t.href = e, {
                            original: e,
                            origin: t.origin,
                            host: t.host,
                            port: t.port,
                            protocol: t.protocol,
                            hostname: t.hostname,
                            domain: t.hostname.split(".")[0],
                            pathname: t.pathname,
                            search: t.search,
                            hash: t.hash,
                            querystring: Ee.parse(t.search || "") || {}
                        }) : {}
                    }(e);
                    n = "".concat(o.origin).concat(o.pathname, "?").concat(Ee.stringify(Ti(Ti({}, o.querystring || {}), {}, {
                        lng: t
                    }))).concat(o.hash)
                } else n = e;
                return n
            };
            const Ii = function(e) {
                var t = e.gdprPrivacyNoticeUrl,
                    r = function(e, t) {
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
                    }(e, Mi),
                    o = (0, f.s)(),
                    i = (0, n.useContext)(q).onChange;
                return n.createElement(ki, Fi({}, r, {
                    onChange: i,
                    url: t && Li(t, o.language),
                    message: "form.fields.gdpr.text",
                    errorMessage: "form.fields.gdpr.error"
                }))
            };
            r(32720);
            var _i = r(98781);
            const Ni = function(e) {
                var t = e.id,
                    r = e.children,
                    o = e.label,
                    i = e.optional,
                    a = e.disabled,
                    l = void 0 !== a && a,
                    u = e.onAddSection,
                    c = (0, f.s)();
                return n.createElement("div", {
                    className: "styles--1YIkW",
                    "data-ui": t
                }, n.createElement("div", {
                    className: "styles--36XiB"
                }, n.createElement("p", {
                    id: "".concat(t, "_label")
                }, o, " ", n.createElement("small", null, i && "(".concat(c.t("form.fields.optional"), ")"))), n.createElement(_i.A, {
                    small: !0,
                    onClick: u,
                    "data-ui": "add-section",
                    disabled: l,
                    "aria-label": "".concat(c.t("form.fields.add"), " ").concat(o),
                    type: "button"
                }, "+ ".concat(c.t("form.fields.add")))), r)
            };
            var Ui = r(25134),
                Vi = r(5692),
                Ri = r(31994),
                Bi = "RESET_ERROR",
                Gi = "CHANGE_VALUE",
                qi = "BATCH_UPDATE",
                Yi = "current",
                Wi = "end_date",
                Ki = "RESET_VALUE";

            function $i(e) {
                return $i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, $i(e)
            }

            function Hi(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function Xi(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? Hi(Object(r), !0).forEach((function(t) {
                        Zi(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Hi(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }

            function Zi(e, t, r) {
                return (t = function(e) {
                    var t = function(e, t) {
                        if ("object" != $i(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, "string");
                            if ("object" != $i(n)) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == $i(t) ? t : t + ""
                }(t)) in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }
            const Ji = function(e, t) {
                if (!t) throw new Error("reducer should have action");
                var r = t.options,
                    n = r.id,
                    o = r.value,
                    i = r.fields,
                    a = r.error;
                switch (t.type) {
                    case Gi:
                        return new Map(e.set(n, Xi(Xi({}, e.get(n)), {}, {
                            value: o
                        })));
                    case Ki:
                        return new Map(e.set(n, Xi(Xi({}, e.get(n)), {}, {
                            value: null,
                            error: null
                        })));
                    case qi:
                        return new Map(i.map((function(e) {
                            return [e.id, e]
                        })));
                    case "SET_ERROR":
                        return new Map(e.set(n, Xi(Xi({}, e.get(n)), {}, {
                            error: a
                        })));
                    case Bi:
                        return new Map(e.set(n, Xi(Xi({}, e.get(n)), {}, {
                            error: null
                        })));
                    default:
                        throw new Error("Unknown action type")
                }
            };
            var Qi = r(44450),
                ea = r(33201);

            function ta(e) {
                return ta = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, ta(e)
            }

            function ra(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function na(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? ra(Object(r), !0).forEach((function(t) {
                        oa(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ra(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }

            function oa(e, t, r) {
                return (t = function(e) {
                    var t = function(e, t) {
                        if ("object" != ta(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, "string");
                            if ("object" != ta(n)) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == ta(t) ? t : t + ""
                }(t)) in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }
            var ia = "end_date",
                aa = "start_date",
                la = function(e, t, r) {
                    if (!e || !e.find) return null;
                    var n = null,
                        o = null,
                        i = null;
                    e && e.find && (n = e.find((function(e) {
                        return e.id === aa
                    })), o = e.find((function(e) {
                        return e.id === ia
                    })), i = e.find((function(e) {
                        return "current" === e.id
                    })));
                    var a, l = n && n.value && new Date(n.value),
                        u = o && o.value && new Date(o.value);
                    if (i && i.value && (u = new Date), !l && !u) return "";
                    switch (t) {
                        case aa:
                            return l && (0, Qi.A)(new Date, l) ? r.t("form.fields.startDate.error") : "";
                        case ia:
                            return a = "", i && i.value ? a = "" : u && (0, Qi.A)(new Date, u) && !(0, ea.A)(u) ? a = r.t("form.fields.endDate.error.future") : l && u && !(0, Qi.A)(l, u) && !A()(l, u) && (a = r.t("form.fields.endDate.error.past")), a;
                        default:
                            return null
                    }
                },
                ua = function(e, t, r) {
                    if (e && t) {
                        var n = null;
                        switch (t.id) {
                            case aa:
                                var o = la(e, aa, r);
                                j()(o) || (n = o);
                                break;
                            case ia:
                                var i = la(e, ia, r);
                                j()(i) || (n = i);
                                break;
                            default:
                                !t.value && t.required && (n = r.t("form.fields.required"))
                        }
                        return n
                    }
                },
                ca = function(e, t) {
                    return e && e.map((function(r) {
                        return na(na({}, r), {}, {
                            error: ua(e, r, t)
                        })
                    }))
                },
                sa = function(e) {
                    return e instanceof Date ? e : new Date(e)
                },
                fa = function(e) {
                    return e && e.every((function(e) {
                        return !e.value
                    }))
                },
                pa = function(e) {
                    var t;
                    return null !== (t = null == e ? void 0 : e.some((function(e) {
                        return !!e.error
                    }))) && void 0 !== t && t
                };
            const da = {
                "tablet-width": "767px",
                tabletWidth: "767px",
                "mobile-width": "420px",
                mobileWidth: "420px",
                xsmall: "4px",
                small: "8px",
                seminormal: "12px",
                normal: "16px",
                semilarge: "24px",
                large: "32px",
                xlarge: "48px",
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
                editor: "styles--2dXiu",
                field: "styles--264A6",
                start_date: "styles--qZz77",
                startDate: "styles--qZz77",
                end_date: "styles--1PtRY",
                endDate: "styles--1PtRY",
                current: "styles--2Lrhq",
                actions: "styles--1OAsY",
                cancel: "styles--23Rsn",
                "expanded-editor": "styles--291Gt styles--2dXiu",
                expandedEditor: "styles--291Gt styles--2dXiu"
            };

            function va(e) {
                return va = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, va(e)
            }
            var ha = ["label", "value"];

            function ya(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function ma(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? ya(Object(r), !0).forEach((function(t) {
                        ga(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ya(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }

            function ba(e) {
                return function(e) {
                    if (Array.isArray(e)) return Oa(e)
                }(e) || function(e) {
                    if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
                }(e) || Ea(e) || function() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function ga(e, t, r) {
                return (t = function(e) {
                    var t = function(e, t) {
                        if ("object" != va(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, "string");
                            if ("object" != va(n)) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == va(t) ? t : t + ""
                }(t)) in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }

            function wa(e, t) {
                return function(e) {
                    if (Array.isArray(e)) return e
                }(e) || function(e, t) {
                    var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                    if (null != r) {
                        var n, o, i, a, l = [],
                            u = !0,
                            c = !1;
                        try {
                            if (i = (r = r.call(e)).next, 0 === t) {
                                if (Object(r) !== r) return;
                                u = !1
                            } else
                                for (; !(u = (n = i.call(r)).done) && (l.push(n.value), l.length !== t); u = !0);
                        } catch (e) {
                            c = !0, o = e
                        } finally {
                            try {
                                if (!u && null != r.return && (a = r.return(), Object(a) !== a)) return
                            } finally {
                                if (c) throw o
                            }
                        }
                        return l
                    }
                }(e, t) || Ea(e, t) || function() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function Ea(e, t) {
                if (e) {
                    if ("string" == typeof e) return Oa(e, t);
                    var r = {}.toString.call(e).slice(8, -1);
                    return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Oa(e, t) : void 0
                }
            }

            function Oa(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }

            function Sa() {
                return Sa = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, Sa.apply(null, arguments)
            }
            var ja = function(e) {
                    var t = e.label,
                        r = e.value,
                        o = function(e, t) {
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
                        }(e, ha);
                    return n.createElement(Vi.Ay, Sa({
                        checked: !!r
                    }, o), t)
                },
                Pa = (0, Co.c)().when().type("boolean").use(n.createElement(ja, null)).when().type("date").use(n.createElement(Go, {
                    monthPicker: !0
                })).build(),
                Aa = function(e) {
                    var t = e.fields,
                        r = e.onSave,
                        i = e.onCancel,
                        a = e.className,
                        l = void 0 === a ? da.editor : a,
                        u = e.sectionId,
                        c = e.groupId,
                        s = wa((0, n.useReducer)(Ji, t && t.map && new Map(t.map((function(e) {
                            return [e.id, e]
                        })))), 2),
                        p = s[0],
                        d = s[1],
                        v = (0, n.useContext)(it).informForGroupChanges,
                        h = (0, f.s)(),
                        y = (0, n.useMemo)((function() {
                            return h.getSharedResources()
                        }), [h.language]),
                        m = function(e, t) {
                            return d({
                                type: e,
                                options: t
                            })
                        },
                        b = k()((function(e) {
                            var t = e.hasChanges;
                            return u && v(c, ga({}, u, t))
                        }), 200),
                        g = (0, n.useCallback)((function() {
                            return m(qi, {
                                fields: ca(ba(p.values()), h)
                            })
                        }), [m, h]),
                        w = (0, n.useCallback)((function(e) {
                            e.preventDefault(), i && (i({
                                id: u,
                                isPristine: fa(t),
                                hasError: pa(t)
                            }), b({
                                hasChanges: !1
                            }))
                        }), [i, u, fa, t, b]),
                        E = (0, n.useCallback)((function(e) {
                            var t = ba(p.values());
                            return e === Wi && t.some((function(e) {
                                return e.id === Yi && e.value
                            }))
                        }), [p]);
                    if (j()(t)) return null;
                    var O, S = function(e) {
                        return function() {
                            return m(Bi, {
                                id: e
                            })
                        }
                    };
                    return n.createElement("li", {
                        className: l
                    }, n.createElement("div", {
                        "data-ui": "editor"
                    }, n.createElement(Pa, {
                        fields: (O = ba(p.values()), O && O.map((function(e) {
                            return ma(ma({}, e), {}, {
                                onChange: (t = e.id, function(e) {
                                    var r = function(e) {
                                        if (!e) return null;
                                        var t = e.target,
                                            r = t.checked,
                                            n = t.value;
                                        return "checkbox" === t.type ? !!r : n
                                    }(e);
                                    t === Yi && m(Ki, {
                                        id: Wi
                                    }), t === Wi && r && (r = (0, Vo.A)((0, Ui.A)((0, Ri.A)(r)), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")), m(Gi, {
                                        id: t,
                                        value: r
                                    }), b({
                                        hasChanges: !0
                                    })
                                }),
                                onFocus: S(e.id),
                                onBlur: g,
                                value: e.value || "",
                                disabled: E(e.id),
                                "data-hj-whitelist": !0,
                                className: (0, o.A)(da.field, da[e.id])
                            }, function(e, t) {
                                switch (t.id) {
                                    case ia:
                                        var r = e && e.find((function(e) {
                                                return e.id === aa
                                            })),
                                            n = new Date,
                                            o = new Date(n.getFullYear(), n.getMonth() + 1, 0);
                                        return {
                                            "data-lpignore": "true",
                                            min: r && r.value ? (0, Vo.A)(sa(r.value), "YYYY-MM", {
                                                useAdditionalDayOfYearTokens: !0,
                                                useAdditionalWeekYearTokens: !0
                                            }) : void 0,
                                            minDate: r && r.value ? sa(r.value) : null,
                                            max: (0, Vo.A)(o, "YYYY-MM", {
                                                useAdditionalDayOfYearTokens: !0,
                                                useAdditionalWeekYearTokens: !0
                                            }),
                                            maxDate: o
                                        };
                                    case aa:
                                        return {
                                            "data-lpignore": "true",
                                            maxDate: new Date,
                                            max: (0, Vo.A)(new Date, "YYYY-MM", {
                                                useAdditionalDayOfYearTokens: !0,
                                                useAdditionalWeekYearTokens: !0
                                            })
                                        };
                                    default:
                                        return {}
                                }
                            }(O, e));
                            var t
                        }))),
                        texts: y
                    }), n.createElement("div", {
                        className: da.actions
                    }, n.createElement(Po.A.Primary, {
                        "data-ui": "save-section",
                        onClick: function(e) {
                            e.preventDefault();
                            var t = ba(p.values()),
                                n = ca(t, h),
                                o = n.some((function(e) {
                                    return !!e.error
                                }));
                            r && !o ? function(e) {
                                r(u, e), b({
                                    hasChanges: !1
                                })
                            }(t) : (m(qi, {
                                fields: n
                            }), function(e) {
                                var t = null == e ? void 0 : e.find((function(e) {
                                    return e.error
                                }));
                                t && je(document.getElementById(t.id))
                            }(n))
                        },
                        type: "button"
                    }, h.t("form.fields.update")), n.createElement(Po.A.Tertiary, {
                        neutral: !0,
                        className: da.cancel,
                        "data-ui": "cancel-section",
                        onClick: w,
                        type: "button"
                    }, h.t("form.fields.cancel")))))
                };
            const Ca = "test" === r.g.__ENV__ ? Aa : function(e) {
                var t = wa(n.useState(da.editor), 2),
                    r = t[0],
                    o = t[1];
                return n.useLayoutEffect((function() {
                    o(da.expandedEditor)
                }), []), n.createElement(Aa, Sa({}, e, {
                    className: r
                }))
            };
            var ka = r(83942),
                xa = r(82165),
                Ma = r(86058),
                Fa = r(31826),
                Da = r(37550),
                Ta = r.n(Da),
                za = r(5339);
            const La = "styles--36na8",
                Ia = "styles--RfMYo";
            var _a = "LLLL yyyy",
                Na = function(e) {
                    var t = e.startDateError,
                        r = e.endDateError;
                    return n.createElement(n.Fragment, null, t ? n.createElement("span", {
                        className: Ia,
                        "data-ui": "error-start-date"
                    }, n.createElement(fn, null), t) : null, r ? n.createElement("span", {
                        className: Ia,
                        "data-ui": "error-end-date"
                    }, n.createElement(fn, null), r) : null)
                },
                Ua = function(e) {
                    var t = e.children,
                        r = (0, f.s)();
                    return n.createElement("dl", {
                        "data-ui": "date-range"
                    }, n.createElement("dt", null, r.t("form.fields.dates.period"), " "), n.createElement("dd", {
                        className: La,
                        "data-ui": "period"
                    }, t))
                };
            const Va = function(e) {
                var t = e.fields,
                    r = (0, f.s)(),
                    o = t.find((function(e) {
                        return "start_date" === e.id && e.value
                    })),
                    i = o && o.value ? (0, Ri.A)(o.value) : null,
                    a = o && o.error || "",
                    l = t.find((function(e) {
                        return "end_date" === e.id && e.value
                    })),
                    u = l && l.value ? (0, Ri.A)(l.value) : null,
                    c = l && l.error || "",
                    s = t.some((function(e) {
                        return "current" === e.id && e.value
                    }));
                if (!i && !u && s) return n.createElement(Ua, null, n.createElement("span", null, r.t("form.fields.dates.current")));
                if (!i && !u) return null;
                var p = i && r.localizedFormat(i, _a, {
                        useAdditionalDayOfYearTokens: !0,
                        useAdditionalWeekYearTokens: !0
                    }),
                    d = u && r.localizedFormat(u, _a, {
                        useAdditionalDayOfYearTokens: !0,
                        useAdditionalWeekYearTokens: !0
                    });
                if (!i && u) return n.createElement(Ua, null, n.createElement("span", null, "".concat(r.t("form.fields.dates.until"), " ").concat(d)), n.createElement(Na, {
                    startDateError: a,
                    endDateError: c
                }));
                var v = N()([p, s ? r.t("form.fields.dates.present") : u && d]).join(" - "),
                    h = s || u ? function(e, t, r, n) {
                        var o = new Date(e.getFullYear(), e.getMonth(), 1),
                            i = (0, Ui.A)(r ? new Date : t);
                        return i.getDate() <= 30 && (i = (0, za.A)(i, 31 - i.getDate())), n(o, i)
                    }(i, u, s, r.localizedFormatDistance) : null;
                return n.createElement(Ua, null, n.createElement("span", null, v), s || u ? n.createElement("span", {
                    className: "styles--1rkgu"
                }, "(", h, ")") : null, n.createElement(Na, {
                    startDateError: a,
                    endDateError: c
                }))
            };

            function Ra(e) {
                return Ra = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, Ra(e)
            }
            var Ba = ["display"];

            function Ga(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function qa(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? Ga(Object(r), !0).forEach((function(t) {
                        Ya(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ga(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }

            function Ya(e, t, r) {
                return (t = function(e) {
                    var t = function(e, t) {
                        if ("object" != Ra(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, "string");
                            if ("object" != Ra(n)) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == Ra(t) ? t : t + ""
                }(t)) in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }

            function Wa() {
                return Wa = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, Wa.apply(null, arguments)
            }
            var Ka = function() {
                return n.createElement(Fa.A, {
                    svg: xa.A,
                    transparent: !0,
                    fill: !0,
                    size: 16,
                    "data-ui": "extra-settings"
                })
            };
            (0, Ma.j)(Ka);
            var $a = function(e) {
                    var t = e.label,
                        r = e.value,
                        o = e.error;
                    return r || o ? n.createElement("dl", null, n.createElement("dt", null, t), n.createElement("dd", {
                        className: "styles--3MVhg",
                        "data-ui": "summary"
                    }, r && n.createElement("span", null, r), o && n.createElement("span", {
                        className: Ia,
                        "data-ui": "error-summary"
                    }, n.createElement(fn, null), o))) : null
                },
                Ha = function(e) {
                    var t = e.id,
                        r = e.label,
                        o = e.value,
                        i = e.error;
                    return o || i ? n.createElement("dl", null, n.createElement("dt", null, r), n.createElement("dd", {
                        className: La,
                        "data-ui": t
                    }, o && n.createElement("span", null, o), i && n.createElement("span", {
                        className: Ia,
                        "data-ui": "error-".concat(t)
                    }, n.createElement(fn, null), i))) : null
                },
                Xa = function(e) {
                    var t = e.display,
                        r = function(e, t) {
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
                        }(e, Ba);
                    return n.createElement(Un.A, Wa({}, t, r))
                },
                Za = function(e) {
                    ! function(e) {
                        if (null == e) throw new TypeError("Cannot destructure " + e)
                    }(e);
                    var t = (0, f.s)();
                    return n.createElement("div", null, t.t("form.fields.edit"))
                },
                Ja = function() {
                    var e = (0, f.s)();
                    return n.createElement("div", null, e.t("form.fields.delete"))
                };
            const Qa = function(e) {
                var t = e.fields,
                    r = e.onEdit,
                    i = e.onRemove,
                    a = e.sectionId,
                    l = (0, f.s)(),
                    u = function(e) {
                        e && e.preventDefault(), r && r(a)
                    },
                    c = function(e) {
                        e && e.preventDefault(), i && i(a)
                    },
                    s = function(e) {
                        if (!e) return "";
                        var t = e.school,
                            r = e.title;
                        return t ? t.value : r ? r.value : ""
                    },
                    p = (0, n.useMemo)((function() {
                        return j()(t) ? null : t.reduce((function(e, t) {
                            return qa(qa({}, e), {}, Ya({}, t.id, t))
                        }), {})
                    }), [t]),
                    d = (0, n.useMemo)((function() {
                        return [{
                            value: "edit",
                            display: {
                                onClick: u,
                                "data-ui": "edit-section",
                                children: n.createElement(Za, null),
                                "aria-label": "".concat(l.t("form.fields.edit"), " ").concat(s(p))
                            }
                        }, {
                            value: "remove-section",
                            display: {
                                "data-ui": "remove-section",
                                onClick: c,
                                children: n.createElement(Ja, null),
                                "aria-label": "".concat(l.t("form.fields.delete"), " ").concat(s(p))
                            }
                        }]
                    }), [i, r, p, l]);
                if (!p) return null;
                var v = p.title,
                    h = p.company,
                    y = p.industry,
                    m = p.summary,
                    b = p.school,
                    g = p.degree,
                    w = p.field_of_study,
                    E = t.some((function(e) {
                        return !!e.error
                    }));
                return n.createElement("li", {
                    className: (0, o.A)("styles--1ZOy4", Ya({}, "styles--2bVwH", E))
                }, n.createElement("div", Wa({
                    "data-ui": "group"
                }, E ? {
                    "data-error": !0
                } : {}), v ? n.createElement(Ha, {
                    id: v.id,
                    label: v.label,
                    value: v.value,
                    error: v.error
                }) : null, h ? n.createElement(Ha, {
                    id: h.id,
                    label: h.label,
                    value: h.value,
                    error: h.error
                }) : null, y ? n.createElement(Ha, {
                    id: y.id,
                    label: y.label,
                    value: y.value,
                    error: y.error
                }) : null, m ? n.createElement($a, {
                    label: m.label,
                    value: m.value,
                    error: m.error
                }) : null, b ? n.createElement(Ha, {
                    id: b.id,
                    label: b.label,
                    value: b.value,
                    error: b.error
                }) : null, w ? n.createElement(Ha, {
                    id: w.id,
                    label: w.label,
                    value: w.value
                }) : null, g ? n.createElement(Ha, {
                    id: g.id,
                    label: g.label,
                    value: g.value,
                    error: g.error
                }) : null, n.createElement(Va, {
                    fields: t
                }), n.createElement("div", {
                    className: "styles--3RCU1"
                }, n.createElement(Ta(), {
                    query: "(min-width: 799px)"
                }, n.createElement("div", null, n.createElement(ka.A, {
                    as: "a",
                    "data-ui": "edit-section",
                    onClick: u,
                    title: l.t("form.fields.edit"),
                    handleSpacePressed: u,
                    "aria-label": "".concat(l.t("form.fields.edit"), " ").concat(s(p))
                }, n.createElement(un, null)), n.createElement(ka.A, {
                    as: "a",
                    "data-ui": "remove-section",
                    onClick: c,
                    title: l.t("form.fields.delete"),
                    handleSpacePressed: c,
                    "aria-label": "".concat(l.t("form.fields.delete"), " ").concat(s(p))
                }, n.createElement(cn, null)))), n.createElement(Ta(), {
                    query: "(max-width: 798px)"
                }, n.createElement("div", null, n.createElement(_n.Ay, {
                    as: kn.A,
                    small: !1,
                    disabled: !1,
                    responsive: !1,
                    "data-ui": "section-actions",
                    type: "button",
                    neutral: !0,
                    right: !0,
                    "aria-label": "".concat(l.t("form.fields.options"), " ").concat(s(p))
                }, n.createElement(Ka, null), n.createElement(In.Ay, null, n.createElement(Nn.qF, {
                    Item: Xa,
                    items: d
                }))))))))
            };
            var el = ["sections"];

            function tl() {
                return tl = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, tl.apply(null, arguments)
            }
            var rl = function(e) {
                var t, r = e.id,
                    o = e.section,
                    i = e.onEditSection,
                    a = e.onRemoveSection,
                    l = e.onCancel,
                    u = e.onSectionSave;
                return !(null === (t = o.fields) || void 0 === t ? void 0 : t.some((function(e) {
                    return !!e.error
                }))) && null != o && o.view ? n.createElement(Qa, {
                    className: "styles--3TCGY",
                    fields: o.fields,
                    onEdit: i,
                    onRemove: a,
                    sectionId: o.id
                }) : n.createElement(Ca, {
                    groupId: r,
                    onCancel: l,
                    fields: o.fields,
                    sectionId: o.id,
                    onSave: u
                })
            };
            const nl = function(e) {
                var t = e.sections,
                    r = function(e, t) {
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
                    }(e, el);
                return t.length ? n.createElement("ul", null, t.map((function(e) {
                    return n.createElement(rl, tl({
                        key: e.id,
                        section: e
                    }, r))
                }))) : null
            };
            var ol = r(90712),
                il = r.n(ol);

            function al(e) {
                return al = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, al(e)
            }

            function ll(e) {
                return function(e) {
                    if (Array.isArray(e)) return ul(e)
                }(e) || function(e) {
                    if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
                }(e) || function(e, t) {
                    if (e) {
                        if ("string" == typeof e) return ul(e, t);
                        var r = {}.toString.call(e).slice(8, -1);
                        return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? ul(e, t) : void 0
                    }
                }(e) || function() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function ul(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }

            function cl(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function sl(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? cl(Object(r), !0).forEach((function(t) {
                        fl(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : cl(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }

            function fl(e, t, r) {
                return (t = function(e) {
                    var t = function(e, t) {
                        if ("object" != al(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, "string");
                            if ("object" != al(n)) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == al(t) ? t : t + ""
                }(t)) in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }
            var pl = function() {
                    return h()("section-")
                },
                dl = function(e, t) {
                    return e && e[t] && !j()(N()(lt()(e[t])))
                },
                vl = function(e, t, r, n) {
                    return t && Array.isArray(t) && t.map((function(t, o) {
                        if (t) {
                            var i = dl(r, o),
                                a = t.id || pl(),
                                l = e && ca(e.map((function(e) {
                                    var n;
                                    return sl(sl({}, e || {}), {}, {
                                        value: null !== (n = t[e.id]) && void 0 !== n ? n : "",
                                        error: i ? r[o][e.id] : null
                                    })
                                })), n);
                            return {
                                id: a,
                                view: !i,
                                fields: l
                            }
                        }
                    })) || []
                },
                hl = function(e) {
                    var t;
                    return null === (t = e.fields) || void 0 === t ? void 0 : t.reduce((function(e, t) {
                        return t.value || !1 === t.value ? (e[t.id] = t.value, e) : e
                    }), {
                        id: e.id
                    })
                },
                yl = function(e) {
                    return e.fields && e.fields.reduce((function(e, t) {
                        return t.error ? (e[t.id] = t.error || "", e) : e
                    }), {})
                },
                ml = function(e) {
                    var t = e.fields,
                        r = e.groupValues,
                        n = e.sections,
                        o = e.errors,
                        i = e.i18n;
                    return t && r && n ? [].concat(ll(function(e) {
                        var t = e.sections,
                            r = e.groupValues,
                            n = e.errors,
                            o = e.i18n;
                        return t.filter((function(e) {
                            return r.some((function(t) {
                                return e.id && e.id === t.id
                            }))
                        })).map((function(e) {
                            return function(e, t) {
                                return sl(sl({}, e), {}, {
                                    fields: ca(e.fields, t)
                                })
                            }(e, o)
                        })).map((function(e, t) {
                            return sl(sl({}, e), {}, {
                                view: e.view && !dl(n, t)
                            })
                        }))
                    }({
                        fields: t,
                        groupValues: r,
                        sections: n,
                        errors: o,
                        i18n: i
                    }) || []), ll(function(e) {
                        var t = e.sections,
                            r = e.fields,
                            n = e.groupValues,
                            o = e.errors,
                            i = e.i18n;
                        if (!r || !n || !t) return [];
                        var a = n.filter((function(e) {
                            return !t.some((function(t) {
                                return t.id && t.id === e.id
                            }))
                        }));
                        return vl(r, a, o, i)
                    }({
                        fields: t,
                        groupValues: r,
                        sections: n,
                        errors: o,
                        i18n: i
                    }) || [])) : []
                },
                bl = "CANCEL",
                gl = "REMOVE",
                wl = "EDIT",
                El = "UPDATE",
                Ol = "BATCH_UPDATE",
                Sl = "CLEAR";

            function jl(e) {
                return jl = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, jl(e)
            }

            function Pl(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function Al(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? Pl(Object(r), !0).forEach((function(t) {
                        Cl(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Pl(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }

            function Cl(e, t, r) {
                return (t = function(e) {
                    var t = function(e, t) {
                        if ("object" != jl(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, "string");
                            if ("object" != jl(n)) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == jl(t) ? t : t + ""
                }(t)) in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }

            function kl(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }
            const xl = function(e, t) {
                var r, n = t && t.options || {},
                    o = n.id,
                    i = void 0 === o ? pl() : o,
                    a = n.fields,
                    l = void 0 === a ? [] : a,
                    u = n.sections;
                switch (t.type) {
                    case "ADD":
                        return new Map([
                            [i, {
                                id: i,
                                fields: l,
                                view: !1
                            }]
                        ].concat(function(e) {
                            if (Array.isArray(e)) return kl(e)
                        }(r = e) || function(e) {
                            if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
                        }(r) || function(e, t) {
                            if (e) {
                                if ("string" == typeof e) return kl(e, t);
                                var r = {}.toString.call(e).slice(8, -1);
                                return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? kl(e, t) : void 0
                            }
                        }(r) || function() {
                            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                        }()));
                    case El:
                        return new Map(e.set(i, Al(Al({}, e.get(i)), {}, {
                            fields: l,
                            view: !0
                        })));
                    case bl:
                        return new Map(e.set(i, Al(Al({}, e.get(i)), {}, {
                            view: !0
                        })));
                    case gl:
                        return e.delete(i), new Map(e);
                    case wl:
                        return new Map(e.set(i, Al(Al({}, e.get(i)), {}, {
                            view: !1
                        })));
                    case Ol:
                        return new Map(u.map((function(e) {
                            return [e.id, e]
                        })));
                    case Sl:
                        return new Map;
                    default:
                        throw new Error("Unknown action type")
                }
            };

            function Ml() {
                return Ml = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, Ml.apply(null, arguments)
            }

            function Fl(e) {
                return function(e) {
                    if (Array.isArray(e)) return Tl(e)
                }(e) || function(e) {
                    if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
                }(e) || Dl(e) || function() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            function Dl(e, t) {
                if (e) {
                    if ("string" == typeof e) return Tl(e, t);
                    var r = {}.toString.call(e).slice(8, -1);
                    return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Tl(e, t) : void 0
                }
            }

            function Tl(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }
            var zl = function(e) {
                var t, r, o = e.id,
                    i = void 0 === o ? "" : o,
                    a = e.label,
                    l = void 0 === a ? "" : a,
                    u = e.optional,
                    c = e.error,
                    s = e.fields,
                    p = e.value,
                    d = e.onChange,
                    v = (0, n.useRef)(null),
                    h = (0, f.s)(),
                    y = (t = (0, n.useReducer)(xl, new Map(vl(s, p || [], c, h).map((function(e) {
                        return [e.id, e]
                    })))), r = 2, function(e) {
                        if (Array.isArray(e)) return e
                    }(t) || function(e, t) {
                        var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                        if (null != r) {
                            var n, o, i, a, l = [],
                                u = !0,
                                c = !1;
                            try {
                                if (i = (r = r.call(e)).next, 0 === t) {
                                    if (Object(r) !== r) return;
                                    u = !1
                                } else
                                    for (; !(u = (n = i.call(r)).done) && (l.push(n.value), l.length !== t); u = !0);
                            } catch (e) {
                                c = !0, o = e
                            } finally {
                                try {
                                    if (!u && null != r.return && (a = r.return(), Object(a) !== a)) return
                                } finally {
                                    if (c) throw o
                                }
                            }
                            return l
                        }
                    }(t, r) || Dl(t, r) || function() {
                        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }()),
                    m = y[0],
                    b = y[1],
                    g = (0, n.useContext)(it).resetGroupChanges,
                    w = (0, n.useCallback)((function(e, t) {
                        return b({
                            type: e,
                            options: t
                        })
                    }), []),
                    E = function() {
                        return ml({
                            fields: s,
                            groupValues: p,
                            sections: Fl(m.values()),
                            errors: c,
                            i18n: h
                        })
                    };
                (0, n.useEffect)((function() {
                    if ("function" == typeof d) {
                        var e = Fl(m.values());
                        d(i, j()(e) ? void 0 : function(e) {
                            return e && e.map(hl)
                        }(e), function(e) {
                            return e && e.map(yl)
                        }(e))
                    }
                }), [m]), (0, n.useEffect)((function() {
                    if (!p) return g(i), w(Sl);
                    (function(e, t) {
                        return e && t && t.every((function(t) {
                            return t.id && il()(ll(e.keys()), t.id)
                        }))
                    })(m, p) || w(Ol, {
                        sections: E()
                    })
                }), [p]), (0, n.useEffect)((function() {
                    return w(Ol, {
                        sections: E()
                    })
                }), [c]);
                var O = (0, n.useCallback)((function() {
                        return m.size > 0 && Fl(m.values()).some((function(e) {
                            return !e.view
                        }))
                    }), [m]),
                    S = (0, n.useCallback)((function(e) {
                        e && (e.preventDefault(), v.current = e.target), w("ADD", {
                            fields: s
                        })
                    }), [s]),
                    P = function(e, t) {
                        w(e, t), v.current && je(v.current)
                    };
                return n.createElement(Ni, {
                    id: i,
                    label: l,
                    optional: u,
                    disabled: O(),
                    onAddSection: S
                }, m.size > 0 ? n.createElement(nl, {
                    id: i,
                    onCancel: function(e) {
                        var t = e.hasError,
                            r = e.id,
                            n = e.isPristine;
                        P(t || n ? gl : bl, {
                            id: r
                        })
                    },
                    sections: Fl(m.values()),
                    onEditSection: function(e) {
                        return w(wl, {
                            id: e
                        })
                    },
                    onSectionSave: function(e, t) {
                        return P(El, {
                            id: e,
                            fields: t,
                            onChange: d
                        })
                    },
                    onRemoveSection: function(e) {
                        return w(gl, {
                            id: e
                        })
                    }
                }) : null)
            };
            const Ll = function(e) {
                return n.createElement(q.Consumer, null, (function(t) {
                    var r = t.onChange;
                    return n.createElement(zl, Ml({}, e, {
                        onChange: r
                    }))
                }))
            };
            var Il = r(73738);
            var _l = ["options", "value", "onChange", "texts", "data-ui"];

            function Nl() {
                return Nl = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, Nl.apply(null, arguments)
            }
            const Ul = (0, n.memo)((function(e) {
                var t = e.options,
                    r = e.value,
                    o = e.onChange,
                    i = e.texts,
                    a = e["data-ui"],
                    l = function(e, t) {
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
                    }(e, _l),
                    u = Ot();
                return (0, n.useEffect)((function() {
                    r && !Array.isArray(r) && u("MultipleChoice: value is not an array", {
                        value: r
                    })
                }), [u, r]), n.createElement(xo.A, Nl({
                    texts: i
                }, l, {
                    labelWrap: !1
                }), n.createElement(Il.A, {
                    stacked: !0,
                    "data-ui": a
                }, null == t ? void 0 : t.filter(Boolean).map((function(e, t) {
                    return n.createElement(Vi.Ay, {
                        key: t,
                        className: "styles--3QsA5",
                        name: e.name,
                        checked: !(null == r || !r.includes(e.name)),
                        onChange: o,
                        required: !r && l.required
                    }, e.value)
                }))))
            }));
            var Vl = r(30643);
            const Rl = {
                    "tablet-width": "767px",
                    tabletWidth: "767px",
                    "mobile-width": "420px",
                    mobileWidth: "420px",
                    xsmall: "4px",
                    small: "8px",
                    seminormal: "12px",
                    normal: "16px",
                    semilarge: "24px",
                    large: "32px",
                    xlarge: "48px",
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
                    section: "styles--QXNVJ",
                    header: "styles--r7_HT",
                    fields: "styles--1jc0L",
                    field: "styles--3JEd1",
                    firstname: "styles--1FXtc",
                    lastname: "styles--1Vdt-",
                    educations: "styles--eqrMY",
                    education: "styles--_W0Nu"
                },
                Bl = n.memo((function(e) {
                    var t = e.name,
                        r = e.label,
                        o = e.options,
                        i = e.error,
                        a = e.onChange,
                        l = e.value,
                        u = e.required,
                        c = e.optional,
                        s = e.texts,
                        f = e["data-ui"];
                    return n.createElement("div", {
                        className: Rl.field
                    }, n.createElement($o.A.RadioGroup, {
                        name: t,
                        error: i,
                        label: r,
                        optional: c,
                        stacked: !0,
                        onChange: a,
                        value: l && l[0],
                        required: u,
                        "data-ui": f,
                        texts: s
                    }, o && o.map((function(e, t) {
                        return e && n.createElement(Vl.Ay, {
                            key: t,
                            value: e.name
                        }, e.value)
                    }))))
                }));
            var Gl = ["id", "resetError", "singleOption", "onChange"];

            function ql() {
                return ql = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, ql.apply(null, arguments)
            }

            function Yl(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }
            var Wl = function(e) {
                var t = e.id,
                    r = e.resetError,
                    o = e.singleOption,
                    i = e.onChange,
                    a = function(e, t) {
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
                    }(e, Gl),
                    l = (0, n.useCallback)((function(e) {
                        var r, n = e.target,
                            o = n.name,
                            l = n.checked,
                            u = new Set(a && a.value || []);
                        l ? u.add(o) : u.delete(o), i(t, u.size ? function(e) {
                            if (Array.isArray(e)) return Yl(e)
                        }(r = u) || function(e) {
                            if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
                        }(r) || function(e, t) {
                            if (e) {
                                if ("string" == typeof e) return Yl(e, t);
                                var r = {}.toString.call(e).slice(8, -1);
                                return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Yl(e, t) : void 0
                            }
                        }(r) || function() {
                            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                        }() : void 0)
                    })),
                    u = (0, n.useCallback)((function(e) {
                        return i(t, [e.target && e.target.value])
                    })),
                    c = function(e) {
                        o ? u(e) : l(e), r && r(t)
                    };
                return o ? n.createElement(Bl, ql({}, a, {
                    onChange: c
                })) : n.createElement(Ul, ql({}, a, {
                    onChange: c
                }))
            };
            const Kl = function(e) {
                return n.createElement(q.Consumer, null, (function(t) {
                    var r = t.onChange;
                    return n.createElement(Ce.Consumer, null, (function(t) {
                        var o = t.resetError;
                        return n.createElement(Wl, ql({}, e, {
                            onChange: r,
                            resetError: o
                        }))
                    }))
                }))
            };
            var $l = r(49507),
                Hl = ["countryCode"];

            function Xl() {
                return Xl = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, Xl.apply(null, arguments)
            }
            const Zl = function(e) {
                var t = e.countryCode,
                    r = function(e, t) {
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
                    }(e, Hl),
                    o = t && "xx" !== t.toLocaleLowerCase() ? t : "US";
                return n.createElement($l.A, Xl({
                    countryCode: o
                }, r))
            };
            var Jl = r(31847);

            function Ql(e) {
                return Ql = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, Ql(e)
            }

            function eu() {
                return eu = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, eu.apply(null, arguments)
            }

            function tu(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function ru(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? tu(Object(r), !0).forEach((function(t) {
                        nu(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : tu(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }

            function nu(e, t, r) {
                return (t = function(e) {
                    var t = function(e, t) {
                        if ("object" != Ql(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, "string");
                            if ("object" != Ql(n)) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == Ql(t) ? t : t + ""
                }(t)) in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }
            const ou = function(e) {
                var t = (0, f.s)(),
                    r = (0, n.useMemo)((function() {
                        var e = t.getSharedResources();
                        return e ? e.yesno : {}
                    }), [t.language]);
                return n.createElement(Jl.A, eu({}, e, {
                    texts: ru(ru({}, e.texts), r)
                }))
            };

            function iu(e) {
                return iu = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, iu(e)
            }

            function au(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function lu(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? au(Object(r), !0).forEach((function(t) {
                        su(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : au(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }

            function uu(e, t) {
                if (e) {
                    if ("string" == typeof e) return cu(e, t);
                    var r = {}.toString.call(e).slice(8, -1);
                    return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? cu(e, t) : void 0
                }
            }

            function cu(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }

            function su(e, t, r) {
                return (t = function(e) {
                    var t = function(e, t) {
                        if ("object" != iu(e) || !e) return e;
                        var r = e[Symbol.toPrimitive];
                        if (void 0 !== r) {
                            var n = r.call(e, "string");
                            if ("object" != iu(n)) return n;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(e)
                    }(e);
                    return "symbol" == iu(t) ? t : t + ""
                }(t)) in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }
            var fu = Object.freeze({
                    position: "absolute",
                    width: 1,
                    height: 1,
                    overflow: "hidden"
                }),
                pu = Object.freeze(su(su(su(su({}, "aria-hidden", !0), "style", fu), "tabIndex", -1), "type", "text")),
                du = Object.freeze(["city", "postcode", "country"]),
                vu = Object.freeze(du.reduce((function(e, t) {
                    return e[t] = "", e
                }), {})),
                hu = (0, Co.c)().build();
            const yu = function(e) {
                var t, r, o = (0, f.s)(),
                    i = (0, n.useRef)(e.value),
                    a = (t = (0, n.useState)(vu), r = 2, function(e) {
                        if (Array.isArray(e)) return e
                    }(t) || function(e, t) {
                        var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                        if (null != r) {
                            var n, o, i, a, l = [],
                                u = !0,
                                c = !1;
                            try {
                                if (i = (r = r.call(e)).next, 0 === t) {
                                    if (Object(r) !== r) return;
                                    u = !1
                                } else
                                    for (; !(u = (n = i.call(r)).done) && (l.push(n.value), l.length !== t); u = !0);
                            } catch (e) {
                                c = !0, o = e
                            } finally {
                                try {
                                    if (!u && null != r.return && (a = r.return(), Object(a) !== a)) return
                                } finally {
                                    if (c) throw o
                                }
                            }
                            return l
                        }
                    }(t, r) || uu(t, r) || function() {
                        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }()),
                    l = a[0],
                    u = a[1],
                    c = (0, n.useRef)(!1);
                (0, n.useEffect)((function() {
                    i.current = e.value, u(vu), e.value || (c.current = !1)
                }), [e.value]);
                var s = (0, n.useCallback)(k()((function(t) {
                        e.onChange(t)
                    }), 300), [e.onChange]),
                    p = (0, n.useCallback)((function(e) {
                        c.current = "Unidentified" !== e.key
                    }), []),
                    d = (0, n.useCallback)((function(t) {
                        u(lu(lu({}, l), {}, su({}, t.target.name, t.target.value))), !c.current && t.target.value && (i.current = "".concat(i.current, ", ").concat(t.target.value), s({
                            preventDefault: t.preventDefault,
                            target: {
                                name: e.id,
                                value: i.current
                            }
                        }))
                    }), [l, s, e.id]),
                    v = (0, n.useMemo)((function() {
                        var t = e.prefilledByLocation ? o.t("form.fields.addressTooltip") : null;
                        return [lu(lu({}, e), {}, {
                            type: "text",
                            onKeyDown: p,
                            tooltip: t
                        })].concat(function(e) {
                            return function(e) {
                                if (Array.isArray(e)) return cu(e)
                            }(e) || function(e) {
                                if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
                            }(e) || uu(e) || function() {
                                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                            }()
                        }(du.map((function(e) {
                            return lu({
                                id: e,
                                value: l[e],
                                onChange: d
                            }, pu)
                        }))))
                    }), [e, s, l, p, d]);
                return n.createElement(hu, {
                    fields: v,
                    texts: o.getSharedResources()
                })
            };

            function mu(e) {
                return mu = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }, mu(e)
            }

            function bu() {
                return bu = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, bu.apply(null, arguments)
            }

            function gu(e, t) {
                var r = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var n = Object.getOwnPropertySymbols(e);
                    t && (n = n.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), r.push.apply(r, n)
                }
                return r
            }

            function wu(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? gu(Object(r), !0).forEach((function(t) {
                        Eu(e, t, r[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : gu(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                    }))
                }
                return e
            }

            function Eu(e, t, r) {
                return (t = Su(t)) in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }

            function Ou(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, Su(n.key), n)
                }
            }

            function Su(e) {
                var t = function(e, t) {
                    if ("object" != mu(e) || !e) return e;
                    var r = e[Symbol.toPrimitive];
                    if (void 0 !== r) {
                        var n = r.call(e, "string");
                        if ("object" != mu(n)) return n;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(e)
                }(e);
                return "symbol" == mu(t) ? t : t + ""
            }

            function ju(e, t, r) {
                return t = Au(t),
                    function(e, t) {
                        if (t && ("object" == mu(t) || "function" == typeof t)) return t;
                        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                        return function(e) {
                            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return e
                        }(e)
                    }(e, Pu() ? Reflect.construct(t, r || [], Au(e).constructor) : t.apply(e, r))
            }

            function Pu() {
                try {
                    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
                } catch (e) {}
                return (Pu = function() {
                    return !!e
                })()
            }

            function Au(e) {
                return Au = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                }, Au(e)
            }

            function Cu(e, t) {
                return Cu = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                    return e.__proto__ = t, e
                }, Cu(e, t)
            }
            var ku = (0, Co.c)().when().type("group").use(n.createElement(Ll, null)).when().id("resume").use(n.createElement(Pi, null)).when().type("file").use(n.createElement(Pi, null)).when().id("gdpr").use(n.createElement(Ii, null)).when().type("dropdown").use(n.createElement(Ko, null)).when().type("multiple").use(n.createElement(Kl, null)).when().type("email").use(n.createElement(Qo, null)).when().type("date").use(n.createElement(Uo, null)).when().type("month").use(n.createElement(Go, null)).when().type("number").use(n.createElement(Ao.A, null)).when().type("boolean").use(n.createElement(ou, null)).when().type("phone").use(n.createElement(Zl, null)).when().id("address").use(n.createElement(yu, null)).build(),
                xu = function(e) {
                    function t(e) {
                        var r;
                        return function(e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t), (r = ju(this, t, [e])).onClick = r.onClick.bind(r), r.onChange = r.onChange.bind(r), r.onBlur = r.onBlur.bind(r), r.onKeyDown = r.onKeyDown.bind(r), r.onFocus = r.onFocus.bind(r), r
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
                        }), t && Cu(e, t)
                    }(t, e), r = t, i = [{
                        key: "onClick",
                        value: function() {
                            this.props.resetSectionValues(this.props.data.id), this.props.clearSectionErrors(this.props.data.id)
                        }
                    }, {
                        key: "onChange",
                        value: function(e) {
                            e.preventDefault();
                            var t = e.target.querySelector && e.target.querySelector("input") || e.target,
                                r = t.name,
                                n = t.value;
                            this.props.onChange(r, n)
                        }
                    }, {
                        key: "onFocus",
                        value: function(e) {
                            var t = this;
                            return function() {
                                t.props.resetError && t.props.resetError(e)
                            }
                        }
                    }, {
                        key: "onBlur",
                        value: function(e) {
                            var t = this;
                            return function(r) {
                                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e.value;
                                t.props.validate(wu(wu({}, e), {}, {
                                    value: n
                                }))
                            }
                        }
                    }, {
                        key: "onKeyDown",
                        value: function(e) {
                            var t = this;
                            return function(r) {
                                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e.value;
                                "Enter" === r.key && t.props.validate(wu(wu({}, e), {}, {
                                    value: n
                                }))
                            }
                        }
                    }, {
                        key: "render",
                        value: function() {
                            var e = this,
                                t = this.props,
                                r = t.i18n,
                                i = t.shouldGuessAvatar,
                                a = this.props.data || {},
                                l = a.fields,
                                u = a.name,
                                c = a.id;
                            if (j()(l)) return null;
                            var s = r.getSharedResources(),
                                f = l.some((function(e) {
                                    return e && e.value && !j()(e.value) && !e.readOnly
                                })),
                                p = "".concat(c, "_section_name"),
                                d = l && N()(l.map((function(t) {
                                    var r = wu(wu({}, t), {}, {
                                        value: t.value || !1 !== t.value && "",
                                        onChange: e.onChange,
                                        onBlur: e.onBlur(t),
                                        onKeyDown: e.onKeyDown(t),
                                        onFocus: e.onFocus(t.id),
                                        className: (0, o.A)(Rl.field, Rl[t.id]),
                                        texts: s && s.control,
                                        "data-ui": t.id
                                    });
                                    return "gdpr" === t.id && (r.gdprPrivacyNoticeUrl = t.url), "email" === t.id && (r.shouldGuessAvatar = i), r
                                })));
                            return n.createElement("section", {
                                "data-ui": "section",
                                className: Rl.section
                            }, u && n.createElement("div", {
                                className: Rl.header
                            }, n.createElement("h2", {
                                id: p
                            }, u), n.createElement(Po.A.Tertiary, {
                                as: "a",
                                neutral: !0,
                                disabled: !f,
                                "data-ui": "clear-".concat(c),
                                onClick: this.onClick,
                                "aria-label": "".concat(r.t("form.fields.clear"), " ").concat(u)
                            }, n.createElement(cn, null), n.createElement("span", null, r.t("form.fields.clear")))), n.createElement("div", {
                                className: Rl.fields,
                                "data-ui": "section-fields"
                            }, n.createElement(ku, {
                                fields: d,
                                texts: r.getSharedResources()
                            })))
                        }
                    }], i && Ou(r.prototype, i), Object.defineProperty(r, "prototype", {
                        writable: !1
                    }), r;
                    var r, i
                }(n.Component);
            const Mu = function(e) {
                return n.createElement(f.A.Consumer, null, (function(t) {
                    return n.createElement(q.Consumer, null, (function(r) {
                        var o = r.onChange,
                            i = r.resetSectionValues;
                        return n.createElement(Ce.Consumer, null, (function(r) {
                            var a = r.validate,
                                l = r.clearSectionErrors,
                                u = r.resetError;
                            return n.createElement(xu, bu({
                                clearSectionErrors: l,
                                onChange: o,
                                resetError: u,
                                resetSectionValues: i,
                                i18n: t,
                                validate: a
                            }, e))
                        }))
                    }))
                }))
            };
            var Fu = ["dropboxAppKey", "executeRecaptcha", "findAvatarUsingEmail", "getUploadedCVDetails", "googleApiConfig", "handleAnalyticsEvent", "i18n", "isTurnstileEnabled", "isUploadCvFromGoogleDriveEnabled", "jobShortcode", "Loader", "logError", "onError", "onSuccess", "onUsedUploadedCvDetails", "presignFile", "sections", "shouldPersistValues", "shouldPropagateErrors", "shouldResetFormOnSuccessfulSubmission", "submit", "turnstileSiteKey"];

            function Du() {
                return Du = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n])
                    }
                    return e
                }, Du.apply(null, arguments)
            }
            var Tu = (0, n.forwardRef)((function(e, t) {
                    var i, a = e.accountMetadataSection,
                        s = e.accountName,
                        p = e.ApplyWithLinkedin,
                        d = e.ChangeRoutePreventer,
                        v = e.className,
                        h = e.jobShortcode,
                        y = e.onFormDisabledChange,
                        m = e.quickApplyTitle,
                        b = e.sections,
                        g = e.shouldGuessAvatar,
                        w = e.submitButtonLabel,
                        E = e.withSubmitButton,
                        O = (0, f.s)(),
                        S = Cr(),
                        j = S.isSubmitDisabled,
                        P = S.isSubmitting,
                        A = S.onSubmit,
                        C = ke().isPristine,
                        k = ir(),
                        x = k.containerId,
                        M = k.isScriptInjectionLoading,
                        F = k.isScriptInjectionSuccess,
                        D = j || M,
                        T = !C() && (!h || window.location.pathname.includes(h) || window.location.search.includes(h));
                    (0, n.useEffect)((function() {
                        "function" == typeof y && y(D)
                    }), [y, D]),
                    function(e) {
                        var t = e.shouldPrevent,
                            r = (0, f.s)().t("form.job.preventUser"),
                            o = (0, n.useCallback)((function(e) {
                                return t ? e && e.target ? (e.returnValue = r, r) : r : null
                            }), [r, t]);
                        (0, n.useEffect)((function() {
                            return window.addEventListener("beforeunload", o),
                                function() {
                                    window.removeEventListener("beforeunload", o)
                                }
                        }), [o])
                    }({
                        shouldPrevent: T
                    }), (0, n.useEffect)((function() {
                        ! function(e) {
                            xe.Zg(xe.Yj, "phone", (function() {
                                return this.test("phone validation", "", (function(t) {
                                    var n, o = r.g.intlTelInputUtils,
                                        i = o.isValidNumber,
                                        a = o.getNumberType,
                                        l = o.getValidationError,
                                        u = o.validationError,
                                        c = this.path,
                                        s = this.createError;
                                    if (!t || i(t) || a(t) >= 0) return !0;
                                    switch (l(t)) {
                                        case u.NOT_A_NUMBER:
                                            n = e.t("form.validations.phone.notNumber");
                                            break;
                                        case u.TOO_LONG:
                                            n = e.t("form.validations.phone.tooLong");
                                            break;
                                        case u.TOO_SHORT:
                                            n = e.t("form.validations.phone.tooShort");
                                            break;
                                        default:
                                            n = e.t("form.validations.phone.unknown")
                                    }
                                    return s({
                                        path: c,
                                        message: n
                                    })
                                }))
                            })), xe.Zg(xe.Yj, "isNumber", (function() {
                                return this.test("number validation", "", (function(t) {
                                    var r = this.path,
                                        n = this.createError;
                                    return !t || n({
                                        path: r,
                                        message: Me.test(t) ? "" : e.t("form.validations.number.notNumber")
                                    })
                                }))
                            }))
                        }(O)
                    }), [O]);
                    var z = (0, n.useMemo)((function() {
                            return w || (P ? O.t("form.submitting.button") : O.t("form.submit.button"))
                        }), [w, P]),
                        L = (0, n.useMemo)((function() {
                            return (0, c.A)(O)
                        }), [O]),
                        I = null == a || null === (i = a.accountMetadata) || void 0 === i ? void 0 : i.gdprPolicyUrl,
                        _ = (0, n.useMemo)((function() {
                            if (!I) return null;
                            try {
                                var e = new URL(I);
                                return e.searchParams.set("lng", O.language), e.toString()
                            } catch (e) {
                                return null
                            }
                        }), [I, O.language]);
                    return n.createElement(n.Fragment, null, d ? n.createElement(d, {
                        shouldPrevent: T
                    }) : null, n.createElement("form", {
                        className: (0, o.A)("styles--2I-rr", v),
                        onSubmit: A,
                        "data-ui": "application-form",
                        ref: t
                    }, n.createElement(jo, {
                        ApplyWithLinkedin: p,
                        title: m
                    }), n.createElement(Dr, null), null == b ? void 0 : b.map((function(e) {
                        return n.createElement(Mu, {
                            data: e,
                            key: e.id,
                            shouldGuessAvatar: g
                        })
                    })), F && n.createElement("div", {
                        id: x,
                        className: "styles--3c7V7",
                        hidden: !0
                    }), _ && n.createElement(L, {
                        Node: u.A,
                        accountName: s,
                        className: "styles--ILRWJ",
                        "data-ui": "account-gdpr-policy",
                        url: _
                    }, "form.accountGdpr"), E && n.createElement(l.A, {
                        type: "submit",
                        className: "styles--10XMc",
                        "data-ui": "apply-button",
                        disabled: D
                    }, z)))
                })),
                zu = (0, n.forwardRef)((function(e, t) {
                    var r = e.dropboxAppKey,
                        o = e.executeRecaptcha,
                        i = e.findAvatarUsingEmail,
                        a = e.getUploadedCVDetails,
                        l = e.googleApiConfig,
                        u = e.handleAnalyticsEvent,
                        c = e.i18n,
                        f = e.isTurnstileEnabled,
                        p = e.isUploadCvFromGoogleDriveEnabled,
                        d = e.jobShortcode,
                        v = e.Loader,
                        h = void 0 === v ? s.A : v,
                        y = e.logError,
                        m = e.onError,
                        b = e.onSuccess,
                        g = e.onUsedUploadedCvDetails,
                        w = e.presignFile,
                        E = e.sections,
                        O = e.shouldPersistValues,
                        S = void 0 === O || O,
                        j = e.shouldPropagateErrors,
                        P = e.shouldResetFormOnSuccessfulSubmission,
                        A = void 0 === P || P,
                        C = e.submit,
                        k = e.turnstileSiteKey,
                        x = function(e, t) {
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
                        }(e, Fu),
                        M = (0, n.useMemo)((function() {
                            return null == E ? void 0 : E.filter((function(e) {
                                return e.fields
                            }))
                        }), [E]),
                        F = (0, n.useMemo)((function() {
                            return null == E ? void 0 : E.find((function(e) {
                                return e.accountMetadata
                            }))
                        }), [E]);
                    return n.createElement(xr, {
                        dropboxAppKey: r,
                        executeRecaptcha: o,
                        findAvatarUsingEmail: i,
                        getUploadedCVDetails: a,
                        googleApiConfig: l,
                        handleAnalyticsEvent: u,
                        i18n: c,
                        isTurnstileEnabled: f,
                        isUploadCvFromGoogleDriveEnabled: p,
                        jobShortcode: d,
                        logError: y,
                        onError: m,
                        onSuccess: b,
                        onUsedUploadedCvDetails: g,
                        presignFile: w,
                        sections: M,
                        shouldPersistValues: S,
                        shouldPropagateErrors: j,
                        shouldResetFormOnSuccessfulSubmission: A,
                        submit: C,
                        turnstileSiteKey: k
                    }, n.createElement(Ce.Consumer, null, (function(e) {
                        var r = e.form;
                        return r ? n.createElement(Tu, Du({
                            sections: r,
                            ref: t,
                            jobShortcode: d,
                            accountMetadataSection: F
                        }, x)) : n.createElement(h, null)
                    })))
                }));
            const Lu = zu;
            zu.propTypes = {
                ApplyWithLinkedin: a().elementType,
                ChangeUrlPreventer: a().elementType,
                accountName: a().string,
                accountMetadataSection: a().shape({
                    accountMetadata: a().shape({
                        gdprPolicyUrl: a().string
                    })
                }),
                dropboxAppKey: a().string,
                executeRecaptcha: a().func,
                findAvatarUsingEmail: a().func,
                getUploadedCVDetails: a().func.isRequired,
                googleApiConfig: a().shape({
                    clientId: a().string,
                    developerKey: a().string,
                    appId: a().string
                }),
                handleAnalyticsEvent: a().func,
                i18n: a().shape({
                    t: a().func.isRequired,
                    language: a().string.isRequired,
                    localizedFormat: a().func.isRequired,
                    localizedFormatDistance: a().func.isRequired,
                    getSharedResources: a().func.isRequired
                }).isRequired,
                isTurnstileEnabled: a().bool,
                isUploadCvFromGoogleDriveEnabled: a().bool,
                jobShortcode: a().string,
                Loader: a().element,
                logError: a().func.isRequired,
                onError: a().func,
                onSuccess: a().func,
                onUsedUploadedCvDetails: a().func,
                presignFile: a().func.isRequired,
                quickApplyTitle: a().string,
                recaptchaClientKey: a().string,
                sections: a().arrayOf(a().shape({
                    fields: a().arrayOf(a().object).isRequired,
                    name: a().string
                })),
                shouldGuessAvatar: a().bool,
                shouldPersistValues: a().bool,
                shouldPropagateErrors: a().bool,
                shouldResetFormOnSuccessfulSubmission: a().bool,
                submit: a().func.isRequired,
                submitButtonLabel: a().string,
                turnstileSiteKey: a().string,
                withSubmitButton: a().bool,
                onFormDisabledChange: a().func
            }
        },
        95055: (e, t, r) => {
            r.d(t, {
                A: () => n
            }), r(85927), r(48996), r(42167), r(58981), r(28028);
            const n = function(e) {
                var t = new AbortController,
                    r = new Promise((function(e, r) {
                        t.signal.onabort = function() {
                            return r({
                                isCanceled: !0
                            })
                        }
                    }));
                return {
                    promise: Promise.race([e, r]),
                    cancel: function() {
                        return t.abort()
                    }
                }
            }
        },
        32096: (e, t, r) => {
            function n(e, t) {
                for (var r = atob(e.split(",")[1]), n = e.split(",")[0].split(":")[1].split(";")[0], o = new ArrayBuffer(r.length), i = new Uint8Array(o), a = 0; a < r.length; a += 1) i[a] = r.charCodeAt(a);
                var l = new Blob([o], {
                    type: n
                });
                return l.name = t, l
            }

            function o(e, t) {
                return Promise.resolve(n(e, t))
            }
            r.d(t, {
                A: () => o,
                s: () => n
            }), r(85927), r(17200), r(27934), r(46187), r(48996), r(42167), r(1364), r(93867), r(84775), r(14291), r(38e3), r(88089), r(73228), r(35957), r(92575), r(33700), r(61800), r(70254), r(66641), r(88550), r(71200), r(10903), r(11650), r(68436), r(33670), r(56358), r(31622), r(91581), r(53406), r(16789)
        },
        66174: (e, t, r) => {
            function n(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }

            function o(e) {
                var t, r, o = e.name,
                    i = e.firstName,
                    a = e.lastName,
                    l = function(e) {
                        if (Array.isArray(e)) return e
                    }(r = o ? o.split(" ").filter(Boolean) : []) || function(e) {
                        if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
                    }(r) || function(e, t) {
                        if (e) {
                            if ("string" == typeof e) return n(e, t);
                            var r = {}.toString.call(e).slice(8, -1);
                            return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? n(e, t) : void 0
                        }
                    }(r) || function() {
                        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }(),
                    u = l[0],
                    c = l.slice(1);
                if (c && c.length && (t = c[c.length - 1]), i && i.trim() && (u = i.trim()), a && a.trim() && (t = a.trim()), !u) throw new Error("Nothing passed in getNameInitials");
                return t ? "".concat(u.charAt(0)).concat(t.charAt(0)).toUpperCase() : "".concat(u.charAt(0)).concat(u.charAt(1) || u.charAt(0)).toUpperCase()
            }
            r.d(t, {
                A: () => o
            }), r(93832), r(81984), r(56030), r(37629), r(52979), r(89001), r(85927), r(48991), r(46187), r(48996), r(29882), r(97358), r(58981), r(73211), r(28028)
        },
        58492: (e, t, r) => {
            r.d(t, {
                L: () => o
            }), r(29882);
            var n = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
                o = function(e) {
                    return n.test(e)
                }
        },
        88309: (e, t, r) => {
            r.d(t, {
                A: () => o
            }), r(48996), r(42167);
            var n = {
                TIMEOUT: "timeout",
                SUCCESS: "success",
                SKIPPED: "skipped"
            };

            function o(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    r = t.async,
                    o = void 0 === r || r,
                    i = t.defer,
                    a = void 0 !== i && i,
                    l = t.insertAfter,
                    u = t.insertBefore,
                    c = t.timeout,
                    s = void 0 === c ? 5e3 : c,
                    f = t.attrs,
                    p = t.skipIf;
                return new Promise((function(t, r) {
                    if ("function" == typeof p && p()) t(n.SKIPPED);
                    else {
                        var i = setTimeout((function() {
                                return r(n.TIMEOUT)
                            }), s),
                            c = document.createElement("script");
                        if (c.type = "text/javascript", c.src = e, c.async = o, c.defer = a, f)
                            for (var d in f) c.setAttribute(d, f[d]);
                        c.onerror = function(e) {
                            r(new URIError("loadScript: the script ".concat(e.target.src, " is not accessible.")))
                        }, c.onload = function() {
                            clearTimeout(i), t(n.SUCCESS)
                        }, l ? l.parentNode.insertBefore(c, l.nextSibling) : u ? u.parentNode.insertBefore(c, u) : document.body.appendChild(c)
                    }
                }))
            }
        },
        57210: (e, t, r) => {
            r.d(t, {
                A: () => i
            }), r(93832), r(81984), r(56030), r(89001), r(85927), r(48991), r(46187), r(48996), r(29882), r(97358), r(58981), r(28028);
            var n = r(34554);

            function o(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
                return n
            }
            const i = function(e) {
                var t, r, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500,
                    a = (t = (0, n.useState)(e), r = 2, function(e) {
                        if (Array.isArray(e)) return e
                    }(t) || function(e, t) {
                        var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                        if (null != r) {
                            var n, o, i, a, l = [],
                                u = !0,
                                c = !1;
                            try {
                                if (i = (r = r.call(e)).next, 0 === t) {
                                    if (Object(r) !== r) return;
                                    u = !1
                                } else
                                    for (; !(u = (n = i.call(r)).done) && (l.push(n.value), l.length !== t); u = !0);
                            } catch (e) {
                                c = !0, o = e
                            } finally {
                                try {
                                    if (!u && null != r.return && (a = r.return(), Object(a) !== a)) return
                                } finally {
                                    if (c) throw o
                                }
                            }
                            return l
                        }
                    }(t, r) || function(e, t) {
                        if (e) {
                            if ("string" == typeof e) return o(e, t);
                            var r = {}.toString.call(e).slice(8, -1);
                            return "Object" === r && e.constructor && (r = e.constructor.name), "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? o(e, t) : void 0
                        }
                    }(t, r) || function() {
                        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }()),
                    l = a[0],
                    u = a[1];
                return (0, n.useEffect)((function() {
                    var t = setTimeout((function() {
                        u(e)
                    }), i);
                    return function() {
                        clearTimeout(t)
                    }
                }), [e, i]), l
            }
        }
    }
]);