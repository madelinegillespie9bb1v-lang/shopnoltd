"use strict";
(self.funElementsApi = self.funElementsApi || []).push([
    [9554], {
        6464: (t, e, n) => {
            n.d(e, {
                A: () => o
            });
            var i = n(22009),
                a = n(7503),
                r = n(88856);
            const o = {
                data: () => ({
                    unsubscribeResize: () => {}
                }),
                mounted() {
                    let t, e, n = this.$el.offsetHeight,
                        o = this.$el.offsetWidth;
                    const s = "Firefox" === (0, i.y)(window.navigator.userAgent).browser.name,
                        l = () => {
                            if ("function" != typeof this.$el.getBoundingClientRect) return t = 0, e = 0, a.call(this), n = t, void(o = e);
                            const i = this.$el.getBoundingClientRect();

                            function a() {
                                !this.changeHeightWidth || n === t && o === e || (this.changeHeightWidth({
                                    height: Math.ceil(t),
                                    width: Math.ceil(e)
                                }), this.$root.$emit(r.cT.ELEMENT_RESIZE, {
                                    height: Math.ceil(t),
                                    width: Math.ceil(e)
                                })), n = t, o = e
                            }
                            0 === i.height && 0 === i.width || (t = Math.abs(n - i.height) < 1 ? Math.max(n, i.height) : i.height, e = Math.abs(o - i.width) < 1 ? Math.max(o, i.width) : i.width, a.call(this))
                        };
                    let c, d;
                    if (void 0 === window.ResizeObserver || s) {
                        const t = () => {
                            l(), d = setTimeout(t, 66)
                        };
                        t()
                    } else {
                        if (c = new window.ResizeObserver((0, a.s)(l, 16)), !(this.$el instanceof HTMLElement)) return;
                        d = setTimeout(l, 0), c.observe(this.$el)
                    }
                    this.unsubscribeResize = () => {
                        c && c.disconnect(), window.removeEventListener("resize", l), clearTimeout(d)
                    }, this.unsubscribeResize.forceCheck = l
                },
                beforeDestroy() {
                    this.unsubscribeResize()
                }
            }
        },
        6205: (t, e, n) => {
            function i(t, e) {
                void 0 !== e && function(n) {
                    var i;

                    function a() {
                        i || (i = !0, n())
                    }["interactive", "complete"].indexOf(e.readyState) >= 0 ? n() : (i = !1, e.addEventListener("DOMContentLoaded", a, !1), t.addEventListener("load", a, !1))
                }((function() {
                    var n = !0,
                        i = !1,
                        a = null,
                        r = {
                            text: !0,
                            search: !0,
                            url: !0,
                            tel: !0,
                            email: !0,
                            password: !0,
                            number: !0,
                            date: !0,
                            month: !0,
                            week: !0,
                            time: !0,
                            datetime: !0,
                            "datetime-local": !0
                        };

                    function o(t) {
                        return !!(t && t !== e && "HTML" !== t.nodeName && "BODY" !== t.nodeName && "classList" in t && "contains" in t.classList)
                    }

                    function s(t) {
                        t.classList.contains("focus-visible") || (t.classList.add("focus-visible"), t.setAttribute("data-focus-visible-added", ""))
                    }

                    function l(t) {
                        n = !1
                    }

                    function c() {
                        e.addEventListener("mousemove", d), e.addEventListener("mousedown", d), e.addEventListener("mouseup", d), e.addEventListener("pointermove", d), e.addEventListener("pointerdown", d), e.addEventListener("pointerup", d), e.addEventListener("touchmove", d), e.addEventListener("touchstart", d), e.addEventListener("touchend", d)
                    }

                    function d(t) {
                        var i, a;
                        "html" !== (null == t || null === (i = t.target) || void 0 === i || null === (a = i.nodeName) || void 0 === a ? void 0 : a.toLowerCase()) && (n = !1, e.removeEventListener("mousemove", d), e.removeEventListener("mousedown", d), e.removeEventListener("mouseup", d), e.removeEventListener("pointermove", d), e.removeEventListener("pointerdown", d), e.removeEventListener("pointerup", d), e.removeEventListener("touchmove", d), e.removeEventListener("touchstart", d), e.removeEventListener("touchend", d))
                    }
                    e.addEventListener("keydown", (function(t) {
                        o(e.activeElement) && s(e.activeElement), n = !0
                    }), !0), e.addEventListener("mousedown", l, !0), e.addEventListener("pointerdown", l, !0), e.addEventListener("touchstart", l, !0), e.addEventListener("focus", (function(t) {
                        var e, i, a;
                        o(t.target) && (n || (i = (e = t.target).type, "INPUT" == (a = e.tagName) && r[i] && !e.readOnly || "TEXTAREA" == a && !e.readOnly || e.isContentEditable)) && s(t.target)
                    }), !0), e.addEventListener("blur", (function(e) {
                        var n;
                        o(e.target) && (e.target.classList.contains("focus-visible") || e.target.hasAttribute("data-focus-visible-added")) && (i = !0, t.clearTimeout(a), a = t.setTimeout((function() {
                            i = !1, t.clearTimeout(a)
                        }), 100), (n = e.target).hasAttribute("data-focus-visible-added") && (n.classList.remove("focus-visible"), n.removeAttribute("data-focus-visible-added")))
                    }), !0), e.addEventListener("visibilitychange", (function(t) {
                        "hidden" == e.visibilityState && (i && (n = !0), c())
                    }), !0), c(), e.body.classList.add("js-focus-visible")
                }))
            }
            n.d(e, {
                N: () => i
            })
        },
        27672: (t, e, n) => {
            n.d(e, {
                v: () => m
            });
            class i {
                constructor(t) {
                    this.intl = t
                }
                get locale() {
                    return this.intl.locale
                }
                get language() {
                    return this.intl.language
                }
                get availableLocales() {
                    return this.intl.availableLocales
                }
                onElementInserted(t) {}
                translate(t, e) {
                    return this.intl.translate(t, e)
                }
                formatCurrency(t, e, n, i, a) {
                    return this.intl.formatCurrency(t, {
                        currency: e,
                        display: n,
                        withoutPrefix: i,
                        withoutSuffix: a
                    })
                }
                formatSymbol(t, e) {
                    return this.intl.formatSymbol(t, e)
                }
                enrichWithPluralField(t) {
                    return { ...t,
                        count: t.$count
                    }
                }
                formatDate(t, e) {
                    return this.intl.formatDate(t, e)
                }
                setLocale(t) {
                    return this.intl.setLocale(t)
                }
                formatNumber(t, e, n) {
                    return this.intl.formatNumber(t, {
                        minimumFractionDigits: e,
                        maximumFractionDigits: n
                    })
                }
            }
            class a {
                constructor(t) {
                    this.intlPlugin = t
                }
                get locale() {
                    return this.intlPlugin.locale
                }
                get language() {
                    return this.intlPlugin.language
                }
                get availableLocales() {
                    return this.intlPlugin.availableLocales
                }
                onElementInserted(t) {
                    this.intlPlugin.onElementInserted(t)
                }
                translate(t, e) {
                    return this.intlPlugin.translate(t, e)
                }
                enrichWithPluralField(t) {
                    return this.intlPlugin.enrichWithPluralField(t)
                }
                formatDate(t, e) {
                    return this.intlPlugin.formatDate(t, e)
                }
                formatCurrency(t, e, n, i, a) {
                    return this.intlPlugin.formatCurrency(t, e, n, i, a)
                }
                formatSymbol(t, e) {
                    return this.intlPlugin.formatSymbol(t, e)
                }
                setLocale(t) {
                    return this.intlPlugin.setLocale(t)
                }
                formatNumber(t, e, n) {
                    return this.intlPlugin.formatNumber(t, e, n)
                }
            }
            const r = "intl-translate-test";
            var o;
            ! function(t) {
                t.FONT_SIZE = "--intl-font-size", t.COLOR = "--intl-color"
            }(o || (o = {}));
            class s extends a {
                constructor() {
                    super(...arguments), this.initialized = !1
                }
                onElementInserted(t) {
                    this.maskTranslation(t)
                }
                translate(t, e) {
                    return function(t) {
                        return `▌${t}▐`
                    }(this.intlPlugin.translate(t, e))
                }
                maskTranslation(t) {
                    this.tryInit(t),
                        function(t) {
                            t.classList.add(r);
                            const e = window.getComputedStyle(t),
                                n = e.getPropertyValue("font-size"),
                                i = e.getPropertyValue("color");
                            t.style.setProperty(o.FONT_SIZE, n), t.style.setProperty(o.COLOR, i)
                        }(t)
                }
                tryInit(t) {
                    this.initialized || (this.initialized = !0, function(t) {
                        ! function(t, e) {
                            t.forEach((t => {
                                e.ownerDocument.styleSheets[0].insertRule(t, 0)
                            }))
                        }([`.${r} {\n      position: relative;\n    }`, `.${r}::after {\n      display: block;\n      position: absolute;\n      top: 50%;\n      left: 0;\n      right: 0;\n\n      height: calc(var(${o.FONT_SIZE}) + 6px);\n\n      background-color: var(${o.COLOR});\n\n      transform: translateY(-50%);\n\n      content: '';\n\n      transition: opacity 0.075s ease-in-out;\n    }`, `.${r}:hover::after {\n      opacity: 0;\n    }`], t)
                    }(t))
                }
            }
            var l = n(8138),
                c = n.n(l);
            const d = {
                name: "intlTranslate",
                bind(t, e, n) {
                    u(e.value, t, n.context.$intl, {
                        attribute: e.arg,
                        isHtml: e.modifiers.html
                    })
                },
                inserted(t, e, n) {
                    n.context.$intl.onElementInserted(t)
                },
                update(t, e, n) {
                    var i, a;
                    e.modifiers.once || (i = e.value, a = e.oldValue, (c()(i) ? i === a : Object.keys(i).every((t => i[t] === a[t]))) || u(e.value, t, n.context.$intl, {
                        attribute: e.arg,
                        isHtml: e.modifiers.html
                    }))
                }
            };

            function u(t, e, n, i) {
                const a = function(t, e) {
                    return c()(t) ? e.translate(t) : function(t, e) {
                        let n = t;
                        return function(t) {
                            return void 0 !== t.$count
                        }(t) && (n = e.enrichWithPluralField(t)), e.translate(n.$path, n)
                    }(t, e)
                }(t, n);
                ! function(t, e, n) {
                    void 0 !== n.attribute ? e.setAttribute(n.attribute, t) : n.isHtml ? e.innerHTML = t : e.textContent = t
                }(a, e, {
                    attribute: i.attribute,
                    isHtml: i.isHtml
                })
            }
            class m extends i {
                static install(t, e) {
                    let {
                        intl: n,
                        isTestMode: i
                    } = e;
                    t.prototype.$intl = m.initialize(t, {
                        intl: n,
                        isTestMode: i
                    })
                }
                static initialize(t, e) {
                    let {
                        intl: n,
                        isTestMode: i
                    } = e;
                    return m.registerDirectives(t), m.createInstance(n, {
                        isTestMode: i
                    })
                }
                static registerDirectives(t) {
                    t.directive("intl-translate", d)
                }
                static createInstance(t, e) {
                    const n = new m(t);
                    return e.isTestMode ? new s(n) : n
                }
            }
        },
        50467: (t, e, n) => {
            n.d(e, {
                qk: () => s,
                vT: () => o
            });
            var i = n(76272),
                a = n.n(i);
            a()(.25, .1, .25, 1), a()(.42, 0, 1, 1);
            const r = a()(0, 0, .58, 1);

            function o(t) {
                return r(t)
            }

            function s(t, e, n) {
                let i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
                    a = 0,
                    r = 0;
                requestAnimationFrame((function s(l) {
                    a || (a = l);
                    const c = (l - a) % e / e + r;
                    if (c >= 1) return n(t);
                    r = c;
                    const d = o(c),
                        u = t * d;
                    u >= i && n(u), a = l, requestAnimationFrame(s)
                }))
            }
            a()(.42, 0, .58, 1)
        },
        91983: (t, e, n) => {
            n.d(e, {
                m: () => r
            });
            var i = n(76272),
                a = n.n(i);
            class r {
                constructor(t) {
                    this.rippleNode = t.ripple, this.pulseNode = t.pulse, this.buttonNode = t.button
                }
                updateRippleWidth(t, e) {
                    this.rippleNode.style.width = Math.trunc(2 * e) + "px", this.rippleNode.style.height = Math.trunc(2 * e) + "px", this.rippleNode.style.backgroundColor = t
                }
                showAnimate() {
                    this.buttonNode.addEventListener("mouseenter", (function() {
                        u(1.8)
                    })), this.buttonNode.addEventListener("mouseleave", (function() {
                        u(.8)
                    }));
                    const t = a()(.59, 0, .3, .3),
                        e = a()(0, .2, .8, 1);
                    let n = 0,
                        i = .8,
                        r = 0;
                    const o = this,
                        s = !0 === window.matchMedia("(prefers-reduced-motion: reduce)").matches,
                        l = window.requestAnimationFrame((function a(o) {
                            window.requestAnimationFrame(a), n || (n = o), o - n > 10 && (function() {
                                r = (r + .01 * i) % 1, c(t(r));
                                const n = e(r >= .5 ? 1 - r : r);
                                d((0, .5, 1, 1.3, (n - 0) * (1.3 - 1) / .5 + 1))
                            }(), n = o)
                        }));
                    s && window.cancelAnimationFrame(l);
                    const c = t => {
                            o.rippleNode.style.transform = `translate(-50%, -50%) scale(${t})`, o.rippleNode.style.opacity = "" + (1 - t)
                        },
                        d = t => {
                            o.pulseNode.style.transform = `scale(${t})`
                        };

                    function u(t) {
                        i = t
                    }
                }
            }
        },
        44940: (t, e, n) => {
            n.d(e, {
                S: () => i
            });
            class i {
                constructor(t) {
                    let e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    this.idealButtonHeight = 48, this.idealButtonMargins = 8, this.idealButtonFontSize = 16, this.height = "string" == typeof t ? parseInt(t) : t, this.idealButtonWidth = e ? 159 : 106, this.width = this.getWidth()
                }
                getMarginRatio() {
                    return parseFloat((this.idealButtonWidth / this.idealButtonMargins).toFixed(2))
                }
                getFontSizeRatio() {
                    return parseFloat((this.idealButtonHeight / this.idealButtonFontSize).toFixed(2))
                }
                getWidthRatio() {
                    return parseFloat((this.idealButtonWidth / this.idealButtonHeight).toFixed(2))
                }
                getMargin() {
                    return Math.round(this.width / this.getMarginRatio())
                }
                getWidth() {
                    return Math.round(this.height * this.getWidthRatio())
                }
                getHeight() {
                    return this.height
                }
                getFontSize() {
                    return Math.round(this.height / this.getFontSizeRatio())
                }
            }
        },
        66728: (t, e, n) => {
            n.d(e, {
                A: () => i
            });
            const i = () => Boolean(window.wixCustomElements || window.wixEmbedsAPI || window.wixTagManager)
        },
        86812: (t, e, n) => {
            n.d(e, {
                M: () => a
            });
            var i = n(92978);

            function a(t) {
                return t.defaultAmountBehavior === i.v.CUSTOM
            }
        },
        58476: (t, e, n) => {
            n.d(e, {
                Cq: () => m,
                Hz: () => d,
                bl: () => u
            });
            var i = n(17455),
                a = n(98252),
                r = n(54702),
                o = n(53245),
                s = n(70942),
                l = n(86812);

            function c(t) {
                return "boolean" != typeof t.allowToModifyAmount || t.allowToModifyAmount
            }

            function d(t, e) {
                const n = t.getConfig(),
                    i = t.getData();
                let d, u = i && "frequency" in i ? i.frequency : null;
                "frequency" in n && (u = n.frequency || null);
                let m, h, f, E, p = !1;
                if ((0, l.M)(n) && (d = n.defaultAmount, p = !0), i && t.elementType === r.a.IMAGE_CARD && n.follow) {
                    let e = n.title,
                        i = n.text;
                    const r = null == n ? void 0 : n.localization;
                    if (r) {
                        const n = a.V.getByLanguage(r, t.elementLang);
                        e = n.title || e, i = n.text || i
                    }
                    m = {
                        show: !0,
                        title: e,
                        text: i
                    }
                }
                return function(t) {
                    return t && t.checkoutTypes && t.donorPortalUrl
                }(i) && (h = i.checkoutTypes, f = i.donorPortalUrl, E = i.customHash), new s.F({
                    elementData: {
                        splitTestName: t.splitTestName,
                        splitTestVariant: t.splitTestVariant,
                        elementKey: t.elementKey,
                        elementLocale: t.elementLocale,
                        elementType: t.elementType,
                        elementName: t.elementName,
                        elementTitle: t.elementTitle,
                        widgetKey: n.openWidget || "",
                        customFields: (0, o.X$)(t.elementType, n) ? n.customFields : void 0,
                        checkoutTypes: h,
                        donorPortalUrl: f,
                        customHash: E
                    },
                    checkoutData: {
                        designationId: n.designation,
                        recurring: u,
                        modifyDesignation: n.allowToModifyDesignation,
                        amount: d,
                        modifyAmount: c(n),
                        ask: m,
                        isCustomAmount: p
                    },
                    queryParams: t.queryParams,
                    localeConfig: t.localeConfig,
                    elementRenderId: t.renderId,
                    tracker: e
                })
            }

            function u(t, e) {
                if (!(t && t instanceof HTMLAnchorElement)) return {};
                const n = (0, i.UA)(e || null);
                return {
                    nodeQueryParams: (0, i.UA)(t.href || null),
                    configQueryParams: n
                }
            }

            function m() {
                return (0, i.UA)(window.location.search, !1).fundraiseupLivemode
            }
        },
        8717: (t, e, n) => {
            function i(t, e) {
                const n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
                return n ? `rgba(${parseInt(n[1],16)},${parseInt(n[2],16)},${parseInt(n[3],16)},${e})` : ""
            }
            n.d(e, {
                b: () => i
            })
        },
        40389: (t, e, n) => {
            function i(t) {
                let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 158;
                if (t) {
                    if (t instanceof String || "string" == typeof t) {
                        const e = "#" === t[0] ? t : "#" + t;
                        t = {
                            r: parseInt(e.slice(1, 3), 16),
                            g: parseInt(e.slice(3, 5), 16),
                            b: parseInt(e.slice(5, 7), 16)
                        }
                    }
                    return (299 * t.r + 587 * t.g + 114 * t.b) / 1e3 > e ? "#000000" : "#FFFFFF"
                }
            }
            n.d(e, {
                L: () => i
            })
        },
        5: (t, e, n) => {
            n.d(e, {
                _: () => r
            });
            var i = n(56837),
                a = n(44400);

            function r(t) {
                var e, n;
                if (!this.data) throw new Error("Element data is not available");
                if (this.showcase) return "currency" in this.data && this.data.currency || "";
                const r = i.v.getDefaultFrequencyWithOverride(this.data.frequencies || {}, this.config.frequency);
                if (!r) throw new Error("Frequency is not available");
                if (!("stripeCurrencies" in this.data)) throw new Error("StripeCurrencies are not available");
                const o = function(t, e) {
                    if (!e) throw new Error("Element data is not available");
                    if (!("currencyEnabledOneTime" in e)) throw new Error("currencyEnabledOneTime is not available");
                    if (!("currencyEnabledRecurrings" in e)) throw new Error("currencyEnabledOneTime is not available");
                    return t === a.m.ONCE ? e.currencyEnabledOneTime : e.currencyEnabledRecurrings
                }(r, this.data);
                return t.guessedCurrency({
                    currencies: {
                        langCurrencies: (null === (e = this.meta) || void 0 === e ? void 0 : e.user.langCurrencies) || [],
                        countryCurrencies: (null === (n = this.meta) || void 0 === n ? void 0 : n.user.countryCurrencies) || [],
                        stripe: {
                            default: this.data.stripeCurrencies.default,
                            list: this.data.stripeCurrencies.list
                        }
                    },
                    defaultCurrency: this.data.currency,
                    guessCurrency: !!this.meta && this.data.guessCurrency,
                    showcase: this.showcase,
                    isCurrencyEnabled: o
                })
            }
        },
        47331: (t, e, n) => {
            n.d(e, {
                C: () => i
            });
            const i = !(!("ontouchstart" in window) && !navigator.maxTouchPoints)
        },
        73776: (t, e, n) => {
            function i() {
                return a
            }
            n.d(e, {
                A: () => i
            });
            const a = `\n@font-face {\n  font-family: 'IBM Plex Sans';\n  font-style: normal;\n  font-weight: 300;\n  font-display: swap;\n  src: url(${n(78552)}) format('woff2');\n}\n@font-face {\n  font-family: 'IBM Plex Sans';\n  font-style: normal;\n  font-weight: 400;\n  font-display: swap;\n  src: url(${n(11755)}) format('woff2');\n}\n@font-face {\n  font-family: 'IBM Plex Sans';\n  font-style: normal;\n  font-weight: 500;\n  font-display: swap;\n  src: url(${n(59706)}) format('woff2');\n}\n@font-face {\n  font-family: 'IBM Plex Sans';\n  font-style: normal;\n  font-weight: 600;\n  font-display: swap;\n  src: url(${n(33717)}) format('woff2');\n}\n@font-face {\n  font-family: 'IBM Plex Sans';\n  font-style: normal;\n  font-weight: 700;\n  font-display: swap;\n  src: url(${n(18676)}) format('woff2');\n}\n@font-face {\n  font-family: 'IBM Plex Sans Arabic';\n  font-style: normal;\n  font-weight: 300;\n  font-display: swap;\n  src: url(${n(66843)}) format('woff2');\n}\n@font-face {\n  font-family: 'IBM Plex Sans Arabic';\n  font-style: normal;\n  font-weight: 400;\n  font-display: swap;\n  src: url(${n(94312)}) format('woff2');\n}\n@font-face {\n  font-family: 'IBM Plex Sans Arabic';\n  font-style: normal;\n  font-weight: 500;\n  font-display: swap;\n  src: url(${n(17977)}) format('woff2');\n}\n@font-face {\n  font-family: 'IBM Plex Sans Arabic';\n  font-style: normal;\n  font-weight: 600;\n  font-display: swap;\n  src: url(${n(95870)}) format('woff2');\n}\n@font-face {\n  font-family: 'IBM Plex Sans Arabic';\n  font-style: normal;\n  font-weight: 700;\n  font-display: swap;\n  src: url(${n(89807)}) format('woff2');\n}\n`
        },
        46593: (t, e, n) => {
            n.d(e, {
                x: () => a
            });
            const i = {
                GP: "FR",
                NC: "FR",
                BL: "FR",
                MQ: "FR",
                YT: "FR"
            };

            function a(t, e) {
                return `${t}/common-images/country-flags/${i[e]?i[e]:e}.png`
            }
        },
        15950: (t, e, n) => {
            n.d(e, {
                w: () => i
            });
            const i = (t, e) => {
                var n, i;
                return e && e.alts && 0 !== e.alts.length && null !== (n = null === (i = e.alts.find((e => e.lang === t))) || void 0 === i ? void 0 : i.text) && void 0 !== n ? n : ""
            }
        },
        21412: (t, e, n) => {
            var i;
            n.d(e, {
                    m: () => i
                }),
                function(t) {
                    t.ENTER = "Enter", t.SPACE = "Space"
                }(i || (i = {}))
        },
        52957: (t, e, n) => {
            n.d(e, {
                K: () => r
            });
            var i = n(76272),
                a = n.n(i);
            class r {
                constructor(t) {
                    this.pulseNode = t.pulse, this.buttonNode = t.button
                }
                showAnimate() {
                    this.buttonNode.addEventListener("mouseenter", (function() {
                        s(1.8)
                    })), this.buttonNode.addEventListener("mouseleave", (function() {
                        s(.8)
                    }));
                    const t = a()(0, .2, .8, 1);
                    let e = 0,
                        n = .8,
                        i = 0;
                    const r = this;
                    window.requestAnimationFrame((function a(r) {
                        window.requestAnimationFrame(a), e || (e = r), r - e > 10 && (function() {
                            i = (i + .01 * n) % 1;
                            const e = t(i >= .5 ? 1 - i : i);
                            o((0, .5, 1, 1.3, (e - 0) * (1.3 - 1) / .5 + 1))
                        }(), e = r)
                    }));
                    const o = t => {
                        r.pulseNode.style.transform = `scale(${t})`
                    };

                    function s(t) {
                        n = t
                    }
                }
            }
        },
        13796: (t, e, n) => {
            n.d(e, {
                E: () => i
            });
            class i {
                constructor(t) {
                    this.idealMaxSize = 80, this.idealMinSize = 30, this.idealMaxMargin = 25, this.idealMinMargin = 10, this.idealMaxPadding = 40, this.idealMinPadding = 13, this.idealMaxWidth = 184, this.idealMinWidth = 79, this.idealMonthlyMaxWidth = 226, this.idealMonthlyMinWidth = 100, this.fontSizeRatio = 2.5, this.borderWidthConditionSize = 40, this.size = "string" == typeof t ? parseInt(t) : t
                }
                getWidth(t) {
                    return t ? this.getResized(this.idealMonthlyMinWidth, this.idealMonthlyMaxWidth) : this.getResized(this.idealMinWidth, this.idealMaxWidth)
                }
                getMargin() {
                    return this.getResized(this.idealMinMargin, this.idealMaxMargin)
                }
                getPadding() {
                    return this.getResized(this.idealMinPadding, this.idealMaxPadding)
                }
                getFontSize() {
                    return Math.round(this.size / this.fontSizeRatio)
                }
                getBorderWidth() {
                    return this.size < this.borderWidthConditionSize ? 1 : 2
                }
                getLineHeight(t) {
                    return this.getHeightBy(t)
                }
                getAmountHeight(t) {
                    return this.getHeightBy(t)
                }
                getResized(t, e) {
                    const n = this.idealMaxSize - this.idealMinSize,
                        i = e - t,
                        a = (this.size - this.idealMinSize) * i / n + t;
                    return Math.round(a)
                }
                getHeightBy() {
                    let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                    return this.size - 2 * t
                }
            }
        },
        22586: (t, e, n) => {
            n.d(e, {
                j: () => s
            });
            var i = n(41178),
                a = n(92488),
                r = n(27457),
                o = n(36787);
            class s extends r.E {
                constructor(t, e) {
                    super(t, e), (0, a.N)() || (this.formatCurrency = i.currencyFilter, this.formatSymbol = (t, e) => e === o.I.PREFIX ? t : "", this.getCurrencyFormat = i.getCurrencyFormat)
                }
            }
        },
        41178: (t, e, n) => {
            n.r(e), n.d(e, {
                currencyCodeFilter: () => l,
                currencyFilter: () => d,
                getCurrencyFormat: () => u
            });
            var i = n(92997),
                a = n(71267),
                r = n(87148),
                o = n(93227),
                s = n(7274);

            function l(t, e) {
                return e && r.F.includes(t) ? "" : t
            }
            const c = (0, i.Ay)(),
                d = function(t) {
                    let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "USD",
                        n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "full",
                        i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                        s = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                        l = arguments.length > 5 ? arguments[5] : void 0,
                        d = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : {};
                    const u = c[e] || {
                            digits: 2
                        },
                        f = u.type === o.Z.CRYPTO,
                        E = u.symbol,
                        p = u.digits;
                    let g, A = !1,
                        T = !1,
                        v = E || e;
                    t = t ? t / Math.pow(10, p) : 0;
                    const N = Math.abs(t),
                        y = l && (0, r.f)(e);
                    switch (n) {
                        case "short":
                            g = m(N, 0, l);
                            break;
                        case "shortlabel":
                            v = E || "", g = m(N, 0, l);
                            break;
                        case "round":
                            g = h(Math.round(N), 0, 0, l);
                            break;
                        case "roundstrict":
                            A = !0, g = h(Math.round(N), 0, 0, l);
                            break;
                        case "roundlabel":
                            v = E || "", g = h(Math.round(N), 0, 0, l);
                            break;
                        case "full":
                            T = !s && f, g = h(N, f ? a.lt : p, p, l);
                            break;
                        case "fullstrict":
                            A = !0, T = !s && f, g = h(N, f ? a.lt : p, p, l);
                            break;
                        case "floatcents":
                            g = N % 1 > 0 ? h(N, p, p, l) : h(N, 0, 0, l);
                            break;
                        case "trimzeroes":
                            g = h(N, 0, p, l);
                            break;
                        case "scopeFloatCents":
                            v = "", g = h(N * Math.pow(10, p), p, p, l);
                            break;
                        case "fulltrimzeroes":
                            T = !0, g = f ? h(N, 0, u.digits, l) : Math.round(t) !== t ? h(N, u.digits, u.digits, l) : h(N, 0, 0, l);
                            break;
                        default:
                            throw new Error(`Unknown display type ${n}`)
                    }
                    const S = d.notUseLetterSymbol && (null == E ? void 0 : E.match(/[a-zA-Z]/));
                    (i || f) && (v = "");
                    let M = t < 0 ? "-" : "";
                    return v && E && (d.notUseCodeInsteadOfSymbol && S || (M += S ? e + " " : E)), M += g, (!v || E && !A || s || y) && !T || S || (M += " " + e), M
                },
                u = t => {
                    const e = h(1.1, 0, 2, t).replace(/\d/g, "");
                    return {
                        groupSeparator: h(1e5, 0, 0, t).replace(/\d/g, ""),
                        decimalSeparator: e
                    }
                },
                m = (t, e, n) => {
                    const i = Math.ceil(Math.log10(t + 1));
                    switch (!0) {
                        case i <= 6:
                            return h(t, e, e, n);
                        case i < 8:
                            return h(t / 1e3, e, e, n) + "K";
                        default:
                            return h(t / 1e6, e, e, n) + "M"
                    }
                },
                h = function(t) {
                    let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2,
                        n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 2,
                        i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : s.D.EN_US;
                    return (t || 0).toLocaleString(i, {
                        style: "decimal",
                        minimumFractionDigits: e,
                        maximumFractionDigits: n
                    })
                }
        },
        55880: (t, e, n) => {
            n.d(e, {
                K: () => r
            });
            var i = n(6205),
                a = n(63312);
            class r {
                constructor(t) {
                    this.onLoadHandlers = [], this.ready = !1, this.localeCode = t.locale, this.node = t.node, this.overrideTemplate = t.overrideTemplate, this.fonts = t.fonts || "", this.styles = t.styles || "", this.id = t.id || "", this.title = t.title, this.initialize = t.initialize, this.scripts = t.scripts || [], this.metaTags = t.metaTags || [], this.isMobile = t.isMobile || !1, this.env = t.env, this.disableRtl = t.disableRtl || !1, this.iframe = document.createElement("iframe"), this.addEventListeners(), t.initialStyles && this.setStyles(t.initialStyles), this.setIframeAttributes()
                }
                resize(t) {
                    if (t.height) {
                        const e = r.getSizeInCssUnit(t.height),
                            n = t.minHeight ? r.getSizeInCssUnit(t.minHeight) : e,
                            i = t.maxHeight ? r.getSizeInCssUnit(t.maxHeight) : e;
                        this.iframe.setAttribute("height", e), this.iframe.style.setProperty("height", e, "important"), this.iframe.style.setProperty("min-height", n, "important"), this.iframe.style.setProperty("max-height", i, "important")
                    }
                    if (t.width) {
                        const e = r.getSizeInCssUnit(t.width),
                            n = t.minWidth ? r.getSizeInCssUnit(t.minWidth) : e,
                            i = t.maxWidth ? r.getSizeInCssUnit(t.maxWidth) : e;
                        this.iframe.setAttribute("width", e), this.iframe.style.setProperty("width", e, "important"), this.iframe.style.setProperty("min-width", n, "important"), this.iframe.style.setProperty("max-width", i, "important")
                    }
                }
                showDocument() {
                    r.isContentDocumentAvailable(this.iframe.contentDocument) && this.iframe.contentDocument.body.setAttribute("style", "")
                }
                setStyles(t) {
                    t.forEach((t => {
                        let [e, n] = t;
                        this.iframe.style.setProperty(e, String(n), "important")
                    }))
                }
                addClass(t) {
                    t.forEach((t => {
                        this.iframe.className += ` ${t}`
                    }))
                }
                removeStyles(t) {
                    r.isContentDocumentAvailable(this.iframe.contentDocument) && t.forEach((t => {
                        this.iframe.style.removeProperty(t)
                    }))
                }
                appendElement(t) {
                    r.isContentWindowAvailable(this.iframe.contentWindow) && r.isContentDocumentAvailable(this.iframe.contentDocument) && ((0, i.N)(this.iframe.contentWindow, this.iframe.contentDocument), this.iframe.contentDocument.body.appendChild(t))
                }
                addOnLoadHandler(t) {
                    if (this.ready) return t();
                    this.onLoadHandlers.push(t)
                }
                addDocumentEventListener(t, e) {
                    r.isContentDocumentAvailable(this.iframe.contentDocument) && this.iframe.contentDocument.addEventListener(t, e)
                }
                removeDocumentEventListener(t, e) {
                    r.isContentDocumentAvailable(this.iframe.contentDocument) && this.iframe.contentDocument.removeEventListener(t, e)
                }
                findElement(t) {
                    return r.isContentDocumentAvailable(this.iframe.contentDocument) ? this.iframe.contentDocument.querySelector(t) : null
                }
                matchMedia(t) {
                    return r.isContentWindowAvailable(this.iframe.contentWindow) ? this.iframe.contentWindow.matchMedia(t) : null
                }
                get iframeNode() {
                    return this.iframe
                }
                setGlobalData(t) {
                    if (r.isContentWindowAvailable(this.iframe.contentWindow)) {
                        for (const [e, n] of Object.entries(t)) this.iframe.contentWindow[e] = n;
                        return !0
                    }
                    return !1
                }
                get iframeWindow() {
                    return this.iframe.contentWindow
                }
                get iframeDocument() {
                    return this.iframe.contentDocument
                }
                setIframeAttributes() {
                    this.iframe.setAttribute("title", this.title), this.iframe.setAttribute("src", "about:blank"), this.iframe.setAttribute("frameborder", "0"), this.iframe.setAttribute("marginheight", "0"), this.iframe.setAttribute("marginwidth", "0"), this.iframe.setAttribute("width", "1"), this.iframe.setAttribute("height", "1"), this.id && this.iframe.setAttribute("id", this.id)
                }
                addEventListeners() {
                    this.iframe.addEventListener("load", (() => {
                        this.initialize && this.iframe.contentWindow && this.iframe.contentDocument && this.initialize(this.iframe.contentWindow, this.iframe.contentDocument), this.ready = !0, this.onLoadHandlers.forEach((t => t()))
                    }))
                }
                getIframeTemplate() {
                    const t = t => Object.keys(t).map((e => `${e}="${t[e]}"`)).join(" "),
                        e = this.scripts.map((e => `<script ${t(e)}><\/script>`)).join(""),
                        n = this.metaTags.map((e => `<meta ${t(e)}>`)).join("");
                    return this.overrideTemplate ? this.overrideTemplate({
                        title: this.title,
                        styles: this.styles,
                        fonts: this.fonts,
                        scripts: e,
                        metaTags: n,
                        isMobile: this.isMobile
                    }) : `\n      <!DOCTYPE html>\n      <html style="overflow: hidden;" lang="${this.localeCode}" dir="${(0,a.N_)(this.localeCode,this.disableRtl)}">\n          <head>\n              <meta charset="utf-8">\n              <meta http-equiv="X-UA-Compatible" content="IE=edge">\n              ${n}\n              <title>${this.title}</title>\n              <style>${this.styles}</style>\n              <style>${this.fonts}</style>\n              ${e}\n          </head>\n          <body style="opacity: 0;"></body>\n      </html>\n    `
                }
                static isContentDocumentAvailable(t) {
                    return !!t || (console.warn("ContentDocument is not available"), !1)
                }
                static isContentWindowAvailable(t) {
                    return !!t || (console.warn("ContentWindow is not available"), !1)
                }
                static getSizeInCssUnit(t) {
                    const e = String(t);
                    return /^\d+$/.test(e) ? `${e}px` : e
                }
            }
        },
        24180: (t, e, n) => {
            n.d(e, {
                C: () => d
            });
            var i = n(6205),
                a = n(55880),
                r = n(65936),
                o = n(82385),
                s = n(63821),
                l = n(63312);

            function c() {
                return `display: block !important;margin: 0 !important;padding: 0 !important;border: 0 !important; width: 100% !important; height: 100% !important; position: fixed !important; opacity: 1 !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; transform: translateZ(100px) !important;z-index: ${arguments.length>0&&void 0!==arguments[0]?arguments[0]:2147483647} !important;`
            }
            class d extends a.K {
                constructor(t, e) {
                    super(t), this.htmlElementStyleManager = e, this.render()
                }
                render() {
                    let t = document.documentElement;
                    this.env !== s.hY.PRODUCTION && this.env !== s.hY.STAGING && (t = document.body), this.isMobile ? (this.containerDiv = document.createElement("div"), this.overlay = document.createElement("div"), this.overlay.setAttribute("id", "fun-mobile-overlay-container"), this.containerDiv.setAttribute("id", "fun-iframe-container"), this.containerDiv.appendChild(this.iframe), t.appendChild(this.overlay), t.appendChild(this.containerDiv)) : this.node ? (this.htmlElementStyleManager.setStyle("border: 0 !important; height: 100% !important; width: 100% !important; margin: 0 auto !important; padding: 0 !important; border-radius: 0 !important; display: block !important;", this.iframe), this.node.appendChild(this.iframe)) : t.appendChild(this.iframe), this.setParentViewPort(), a.K.isContentWindowAvailable(this.iframe.contentWindow) && (this.iframe.contentWindow.document.open("text/html", "replace"), this.iframe.contentWindow.document.write(this.getIframeTemplate()), (0, i.N)(this.iframe.contentWindow, this.iframe.contentWindow.document), this.iframe.contentWindow.document.close())
                }
                onShow() {
                    this.htmlElementStyleManager.setStyle(c(), this.iframe)
                }
                open() {
                    this.htmlElementStyleManager.saveDocumentOriginalStyles(), this.node || (this.isMobile && this.containerDiv && this.overlay && (this.htmlElementStyleManager.setStyle("display: block !important;margin: 0 !important;padding: 0 !important;float: none !important;visibility: visible !important;opacity: 1 !important;position: absolute !important;width: 100% !important;height: 100% !important;top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; background: #f5f5f5 !important;z-index: 2147483647 !important;transform: translateZ(100px) !important;", this.containerDiv), this.htmlElementStyleManager.setStyle("position: fixed !important;top: 0 !important;left: 0 !important;right: 0 !important;bottom: 0 !important;margin: 0 !important;padding: 0 !important;background: #f5f5f5 !important;z-index: 2147483646 !important;transform: translateZ(99px) !important;", this.overlay)), this.htmlElementStyleManager.setStyle(this.isMobile ? "display: block !important;border: none !important;margin: 0 !important;padding: 0 !important;width: 100% !important;height: 100% !important;" : c(2147483646), this.iframe), this.resize({
                        width: "100%",
                        height: "100%"
                    }), this.node || (this.htmlElementStyleManager.appendStyle(this.isMobile ? "all: initial !important;position: static !important;margin: 0 !important;padding: 0 !important;min-height: 0 !important;min-width: 0 !important;width: auto !important;height: 100% !important;overscroll-behavior-y: none !important;" : "overflow: hidden !important; overscroll-behavior-y: none !important;", document.documentElement), (0, r.c7)(document, (() => {
                        this.htmlElementStyleManager.appendStyle(this.isMobile ? "all: initial !important;overflow: auto !important;position: static !important;display: block !important;min-height: 0 !important;min-width: 0 !important;height: 100% !important;width: auto !important;margin: 0 !important;padding: 0 !important;overscroll-behavior-y: none !important;" : "padding-right: 0 !important; overscroll-behavior-y: none !important;", document.body)
                    }))), this.setGlobalStyles())
                }
                close() {
                    this.htmlElementStyleManager.setStyle("border: 0 !important; width: 1px !important; height: 1px !important; position: fixed !important; opacity: 0 !important;", this.iframe), this.removeGlobalStyles(), this.htmlElementStyleManager.restoreOriginalStyles(document.documentElement), this.htmlElementStyleManager.restoreOriginalStyles(document.body), this.restoreParentViewPort()
                }
                destroy() {
                    this.iframe.remove(), this.containerDiv && (this.containerDiv.remove(), this.containerDiv = void 0), this.overlay && (this.overlay.remove(), this.overlay = void 0)
                }
                setParentViewPort() {
                    if (this.node) return;
                    this.viewport = d.getViewport("width=device-width, initial-scale=1, shrink-to-fit=no");
                    const t = this.viewport,
                        e = document.querySelector("meta[name=viewport]");
                    e ? (this.parentViewport = e, this.parentViewport.remove()) : this.parentViewport = d.getViewport(""), document.head.appendChild(t)
                }
                restoreParentViewPort() {
                    this.node || (this.viewport && (this.viewport.remove(), this.viewport = void 0), this.parentViewport && (document.head.appendChild(this.parentViewport), this.parentViewport = void 0))
                }
                setGlobalStyles() {
                    if (this.isMobile) {
                        this.headStyle = document.createElement("style");
                        const t = this.headStyle;
                        t.appendChild(document.createTextNode("body > *:not(#fun-iframe-container){ position: fixed !important; width: 100% !important; display: block !important }")), document.head.appendChild(t)
                    }
                }
                removeGlobalStyles() {
                    this.headStyle && this.headStyle.remove()
                }
                setIframeAttributes() {
                    super.setIframeAttributes(), this.iframe.setAttribute("allowpaymentrequest", "true"), this.iframe.setAttribute("allow", "payment web-share"), (0, o.A)(window) && this.iframe.setAttribute("src", location.origin)
                }
                static getViewport(t) {
                    const e = document.createElement("meta");
                    return e.setAttribute("name", "viewport"), e.setAttribute("content", t), e
                }
                configure(t) {
                    if (this.localeCode = t.locale, !a.K.isContentWindowAvailable(this.iframe.contentWindow)) return;
                    if (this.iframe.contentWindow.document.documentElement.setAttribute("lang", this.localeCode), this.iframe.contentWindow.document.documentElement.setAttribute("dir", (0, l.N_)(this.localeCode)), void 0 === t.styles) return;
                    if (t.showcase) {
                        const t = this.iframe.contentWindow.document.getElementById("main-showcase-style");
                        null == t || t.remove()
                    }
                    const e = this.iframe.contentWindow.document.createElement("style");
                    t.showcase && e.setAttribute("id", "main-showcase-style"), this.styles = t.styles || "", e.appendChild(this.iframe.contentWindow.document.createTextNode(this.styles)), this.iframe.contentWindow.document.head.appendChild(e)
                }
                async waitUntilFontsLoaded() {
                    let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1e3;
                    if (!this.iframe.contentWindow) return;
                    const e = (0, r.We)(this.iframe.contentWindow.document, '1em "IBM Plex Sans"'),
                        n = (0, r.uk)(t);
                    await Promise.race([e, n])
                }
            }
        },
        45118: (t, e, n) => {
            n.d(e, {
                s: () => T
            });
            class i {}
            var a, r, o, s;
            ! function(t) {
                t.MR = "Mr", t.MRS = "Mrs", t.MISS = "Miss", t.MS = "Ms", t.MX = "Mx", t.SIR = "Sir", t.DR = "Dr", t.REV = "Rev", t.DCN = "Dcn", t.FR = "Fr", t.BR = "Br", t.SR = "Sr", t.PROF = "Prof"
            }(a || (a = {})),
            function(t) {
                t.M = "M", t.MME = "Mme", t.MLLE = "Mlle", t.AUTRE = "Autre"
            }(r || (r = {})),
            function(t) {
                t.HERR = "Herr", t.FRAU = "Frau", t.DR = "Dr", t.PROF = "Prof"
            }(o || (o = {})),
            function(t) {
                t.HERR = "Herr", t.FRAU = "Frau"
            }(s || (s = {}));
            class l extends i {
                constructor() {
                    super(...arguments), this.isEnabled = !0, this.titles = A(Object.values(s))
                }
            }
            class c extends i {
                constructor() {
                    super(...arguments), this.isEnabled = !1, this.titles = []
                }
            }
            var d = n(82438),
                u = n.n(d),
                m = n(10392);
            u()([m.o.NONE, ...Object.values(a), ...Object.values(r), ...Object.values(o), ...Object.values(s)]);
            class h extends i {
                constructor() {
                    super(...arguments), this.isEnabled = !0, this.titles = A(Object.values(r))
                }
            }
            class f extends i {
                constructor() {
                    super(...arguments), this.isEnabled = !0, this.titles = A(Object.values(o))
                }
            }
            class E extends i {
                constructor() {
                    super(...arguments), this.isEnabled = !0, this.titles = A(Object.values(a))
                }
            }
            var p = n(63821),
                g = n(7274);

            function A(t) {
                return [m.o.NONE, ...t]
            }

            function T(t) {
                return function(t, e) {
                    switch (t) {
                        case p.tg.UNITED_KINGDOM:
                            return new E;
                        case p.tg.FRANCE:
                            return new h;
                        case p.tg.GERMANY:
                            return new f;
                        case p.tg.AUSTRIA:
                            return new l;
                        case p.tg.CANADA:
                            return e === g.D.FR_CA ? new h : new c;
                        default:
                            return new c
                    }
                }(t.companyCountry, t.companyDefaultLocale)
            }
        },
        39505: (t, e, n) => {
            n.d(e, {
                p: () => i
            });
            class i {
                constructor(t) {
                    this._locale = t
                }
                get locale() {
                    return this._locale
                }
                set locale(t) {
                    this._locale = t
                }
                changeLocale(t) {
                    return this.locale = t, this.locale
                }
                set intl(t) {
                    this._intl = t
                }
                get intl() {
                    if (!this._intl) throw new Error("Intl service is undefined in date formatter");
                    return this._intl
                }
            }
        },
        87003: (t, e, n) => {
            n.d(e, {
                M: () => l
            });
            var i = n(70343),
                a = n(94099),
                r = n(34932);
            class o {
                constructor(t, e) {
                    this.baseLocale = t, this.lingui = (0, a.sK)({
                        locale: t,
                        messages: {
                            [t]: e || {}
                        },
                        localeData: {
                            [t]: o.makeLocaleData(t)
                        }
                    })
                }
                static extractLanguageFromLocale(t) {
                    const [e] = t.split("-");
                    return e
                }
                static makeLocaleData(t) {
                    const e = this.extractLanguageFromLocale(t);
                    return {
                        plurals: r[e]
                    }
                }
                get defaultMessages() {
                    return this.lingui._messages[this.baseLocale]
                }
                locale(t) {
                    if (void 0 !== t) {
                        const e = o.makeLocaleData(t);
                        this.lingui.loadLocaleData(t, e), this.lingui.activate(t)
                    }
                    return this.lingui.locale
                }
                t(t, e) {
                    const n = this.lingui._(t, e, {
                        formats: {
                            number: {
                                numberingSystem: "latn"
                            }
                        }
                    });
                    return n === t ? "" : n
                }
                extend(t) {
                    const e = Object.assign({}, this.defaultMessages, t);
                    this.lingui.load(this.locale(), e)
                }
            }
            class s {
                constructor(t, e) {
                    this.translationProvider = t, this.translationLoader = e
                }
                changeLocale(t) {
                    return this.loadTranslation(t).then((e => {
                        this.translationProvider.locale(t), this.translationProvider.extend(e)
                    }))
                }
                translate(t, e) {
                    return this.translationProvider.t(t, e)
                }
                loadTranslation(t) {
                    return this.translationLoader.load(t)
                }
            }

            function l(t) {
                let {
                    dateFormatter: e,
                    currencyFormatter: n,
                    numberFormatter: a,
                    availableLocales: r = [i.O.DEFAULT_LOCALE],
                    translationLoader: l,
                    locale: c = i.O.DEFAULT_LOCALE,
                    phrases: d,
                    company: u = "",
                    donateToPayTokens: m = []
                } = t;
                const h = new o(c, d),
                    f = new s(h, l);
                return new i.O(f, e, n, a, u, m, {
                    locale: c,
                    availableLocales: r
                })
            }
        },
        75385: (t, e, n) => {
            n.d(e, {
                v: () => s
            }), n(44400);
            var i = n(29755);
            i.n.SHORT, i.n.ADVERB, i.n.NOUN;
            const a = {
                daily: {
                    short: "day",
                    noun: "day",
                    adverb: "daily",
                    adjective: "daily"
                },
                weekly: {
                    short: "w",
                    noun: "week",
                    adverb: "weekly",
                    adjective: "weekly"
                },
                biweekly: {
                    short: "2w",
                    noun: "2 weeks",
                    adverb: "biweekly",
                    adjective: "biweekly"
                },
                every4weeks: {
                    short: "4w",
                    noun: "4 weeks",
                    adverb: "every 4 weeks",
                    adjective: "4-weekly"
                },
                monthly: {
                    short: "mo",
                    noun: "month",
                    adverb: "monthly",
                    adjective: "monthly"
                },
                bimonthly: {
                    short: "2mo",
                    noun: "2 months",
                    adverb: "bimonthly",
                    adjective: "bimonthly"
                },
                quarterly: {
                    short: "qrt",
                    noun: "quarter",
                    adverb: "quarterly",
                    adjective: "quarterly"
                },
                semiannual: {
                    short: "6mo",
                    noun: "6 months",
                    adverb: "semiannually",
                    adjective: "semiannual"
                },
                annual: {
                    short: "yr",
                    noun: "year",
                    adverb: "annually",
                    adjective: "annual"
                }
            };
            class r {
                get all() {
                    return a
                }
            }
            class o {
                constructor(t) {
                    this.subscriptionPeriodLabelsProvider = t
                }
                getLabel(t) {
                    let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : i.n.ADVERB;
                    if (!t) return;
                    const n = this.subscriptionPeriodLabelsProvider.all[t];
                    return n && n[e]
                }
                getValueWithLabel(t, e) {
                    let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : i.n.SHORT;
                    return function(t, e) {
                        let n, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : i.n.SHORT;
                        return e ? (n = (arguments.length > 3 ? arguments[3] : void 0) || function(t) {
                            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : i.n.ADVERB;
                            const n = a[t];
                            return n && n[e]
                        }(e, r), n ? `${t}/${n}` : t) : t
                    }(t, e, n, this.getLabel(e, n))
                }
            }

            function s(t) {
                const e = t || new r;
                return new o(e)
            }
        },
        77953: (t, e, n) => {
            n.d(e, {
                $: () => i
            });
            class i {
                load(t) {
                    const e = this.getTranslationFilename(t);
                    return this.loadFile(e)
                }
                getTranslationFilename(t) {
                    return t.replace("-", "_")
                }
            }
        },
        98252: (t, e, n) => {
            n.d(e, {
                V: () => a
            });
            var i = n(63312);
            class a {
                static getByLocale(t, e) {
                    const n = (0, i.Qk)(e);
                    let a = t.fields.find((t => {
                        let {
                            lang: e
                        } = t;
                        return e === n
                    }));
                    if (!a) {
                        const e = (0, i.Qk)(t.defaultLocale);
                        a = t.fields.find((t => {
                            let {
                                lang: n
                            } = t;
                            return n === e
                        }))
                    }
                    return a
                }
                static getByLanguage(t, e) {
                    let n = t.fields.find((t => {
                        let {
                            lang: n
                        } = t;
                        return n === e
                    }));
                    if (!n) {
                        const e = (0, i.Qk)(t.defaultLocale);
                        n = t.fields.find((t => {
                            let {
                                lang: n
                            } = t;
                            return n === e
                        }))
                    }
                    return n
                }
                static findByLocale(t, e) {
                    const n = (0, i.Qk)(e);
                    return t.fields.find((t => {
                        let {
                            lang: e
                        } = t;
                        return e === n
                    })) || null
                }
            }
        },
        76772: (t, e, n) => {
            n.d(e, {
                t: () => r
            });
            class i {
                constructor(t) {
                    this._locale = t
                }
                get locale() {
                    return this._locale
                }
                set locale(t) {
                    this._locale = t
                }
                changeLocale(t) {
                    return this.locale = t, this.locale
                }
            }
            var a = n(89585);
            class r extends i {
                constructor(t) {
                    super(t), this.formatNumber = a.K
                }
                format(t) {
                    let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    };
                    return this.formatNumber(t, e.minimumFractionDigits, e.maximumFractionDigits, this.locale)
                }
            }
        },
        89585: (t, e, n) => {
            function i(t, e, n, i) {
                return (Number(t) || 0).toLocaleString(i || "en-US", {
                    style: "decimal",
                    currency: "USD",
                    minimumFractionDigits: e || 0,
                    maximumFractionDigits: n || 0,
                    numberingSystem: "latn"
                })
            }
            n.d(e, {
                K: () => i
            })
        },
        89915: (t, e, n) => {
            n.d(e, {
                g: () => i
            });
            const i = (t, e) => {
                const n = new URL(t.location.href);
                e.forEach((t => n.searchParams.delete(t))), t.history.replaceState({}, "", n.toString())
            }
        },
        90496: (t, e, n) => {
            function i(t) {
                let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : " ";
                return t.filter((t => "string" == typeof t || "number" == typeof t)).map((t => "string" == typeof t ? t.trim() : t)).filter((t => "" !== t)).join(e)
            }
            n.d(e, {
                V: () => i
            })
        },
        7503: (t, e, n) => {
            function i(t) {
                let e, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 300;
                return () => {
                    clearTimeout(e), e = setTimeout((() => {
                        t()
                    }), n)
                }
            }
            n.d(e, {
                s: () => i
            })
        },
        38651: (t, e, n) => {
            function i() {
                const t = /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
                return Boolean(t)
            }
            n.d(e, {
                A: () => i
            })
        },
        33490: (t, e, n) => {
            function i(t) {
                return /^(([a-zA-Z0-9-_+.']+(\.[a-zA-Z0-9-_+.']+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(t))
            }
            n.d(e, {
                d: () => i
            })
        },
        93926: (t, e, n) => {
            n.d(e, {
                Z: () => l
            });
            var i = n(63821);
            const a = "static.localtest.me",
                r = "static.fun.internal",
                o = "static.fundraiseup.com",
                s = "static.funstaging.com";

            function l(t) {
                switch (t) {
                    case i.hY.DEVELOPMENT:
                        return {
                            path: a,
                            protocol: "https"
                        };
                    case i.hY.TESTING:
                        return {
                            path: r,
                            protocol: "http"
                        };
                    case i.hY.STAGING:
                        return {
                            path: s,
                            protocol: "https"
                        };
                    default:
                        return {
                            path: o,
                            protocol: "https"
                        }
                }
            }
        },
        11847: (t, e, n) => {
            n.d(e, {
                O9: () => o,
                TB: () => s,
                mZ: () => d,
                tX: () => r,
                xK: () => l
            });
            var i = n(68032),
                a = n(90496);
            const r = "facebook",
                o = "twitter",
                s = "linkedin",
                l = "email";

            function c(t, e) {
                if (void 0 !== e) {
                    let n = "?";
                    return t.includes("?") && (n = "&"), `${t}${n}ref=${e}`
                }
                return t
            }

            function d(t, e, n, d, u) {
                let m = "";
                switch (t) {
                    case s:
                        return m = i.stringify({
                            mini: "true",
                            url: c(e, u),
                            summary: n
                        }), `https://www.linkedin.com/shareArticle?${m}`;
                    case o:
                        return m = i.stringify({
                            url: c(e, u),
                            text: n
                        }), `https://twitter.com/intent/tweet?${m}`;
                    case r:
                        return m = i.stringify({
                            u: c(e, u),
                            quote: n
                        }), `https://www.facebook.com/sharer.html?${m}`;
                    case l:
                        return m = i.stringify({
                            body: (0, a.V)([n, e], "\n"),
                            subject: d || ""
                        }), `mailto:?${m}`;
                    default:
                        return ""
                }
            }
        },
        56837: (t, e, n) => {
            n.d(e, {
                v: () => o
            });
            var i = n(15620),
                a = n(63821),
                r = n(44400);
            class o {
                static getDefaultFrequency(t) {
                    const e = Object.keys(t).find((e => t[e].enabled && t[e].default));
                    if (!e) throw new Error("No default frequency found");
                    return e
                }
                static getDefaultFrequencyWithOverride(t, e) {
                    return e && this.getEnabledFrequencies(t).includes(e) ? e : Object.keys(t).find((e => t[e].enabled && t[e].default)) || null
                }
                static getSecondaryFrequency(t) {
                    return Object.keys(t).find((e => t[e].enabled && !t[e].default))
                }
                static getEnabledFrequencies(t) {
                    const e = Object.keys(t).filter((e => t[e].enabled)).map((t => t));
                    if (0 === e.length) throw new Error("No enabled frequencies found");
                    return this.sortByWeights(e)
                }
                static isOnetimeOnly(t) {
                    const e = this.getEnabledFrequencies(t);
                    return 1 === e.length && e.includes(r.m.ONCE)
                }
                static isRecurringOnly(t) {
                    return !this.getEnabledFrequencies(t).includes(r.m.ONCE)
                }
                static isOnetimeEnabled(t) {
                    return this.getEnabledFrequencies(t).includes(r.m.ONCE)
                }
                static isRecurringEnabled(t) {
                    return !!this.getEnabledFrequencies(t).find((t => t !== r.m.ONCE))
                }
                static frequencySettingsToWidgetRepeat(t) {
                    const e = this.isOnetimeEnabled(t),
                        n = this.isRecurringEnabled(t);
                    return e && !n ? a.VN.ONLY_ONETIME : !e && n ? a.VN.ONLY_MONTHLY : this.getDefaultFrequency(t) === r.m.ONCE ? a.VN.DEFAULT_ONETIME : a.VN.DEFAULT_MONTHLY
                }
                static isFrequencyEnabled(t, e) {
                    return null !== e && (Object.values(r.m).includes(e) && o.getEnabledFrequencies(t).includes(e))
                }
                static sortByWeights(t) {
                    return t.sort(((t, e) => i.Jj[t] - i.Jj[e]))
                }
            }
        },
        82491: (t, e, n) => {
            n.d(e, {
                h: () => r
            });
            var i = n(15620),
                a = n(44400);

            function r(t) {
                let {
                    index: e,
                    frequency: n,
                    enabledAI: r,
                    lastAmount: o
                } = t;
                const s = n === a.m.ONCE,
                    l = s ? i.fy : i.T7,
                    c = s ? i.eq : i.Ck,
                    d = r ? c : l,
                    u = d.length;
                return u >= e + 1 ? d[e] : o ? (m = o + i.zC) % i.zC == 0 ? m : Math.ceil(m / i.zC) * i.zC : d[u - 1] + (e + 1 - u) * i.zC;
                var m
            }
        },
        99422: (t, e, n) => {
            var i;
            n.d(e, {
                    e5: () => r,
                    T6: () => o,
                    rF: () => s,
                    c_: () => l
                }),
                function(t) {
                    t.BUTTONS = "buttons", t.DATA = "data", t.FORMS = "forms", t.LINKS = "links", t.LISTS = "lists", t.OVERLAYS = "overlays"
                }(i || (i = {}));
            var a = n(54702);
            i.BUTTONS, i.DATA, i.FORMS, i.LINKS, i.LISTS, i.OVERLAYS;
            const r = 5,
                o = 11,
                s = 3,
                l = {
                    WIDTH: 480,
                    HEIGHT: 270
                };
            a.a.P2P_LINK, a.a.TEXT_LINK, a.a.QR_CODE, a.a.P2P_LINK, a.a.TEXT_LINK, a.a.DONATION_FORM, a.a.SIMPLE_FORM, a.a.DONATION_FORM, a.a.IMAGE_CARD, a.a.QR_CODE, a.a.SIMPLE_FORM, a.a.IMPACT_SLIDER, a.a.BUTTON_GROUP, a.a.DONATION_LEVELS, a.a.TEXT_LINK, a.a.DONATE_BUTTON, a.a.LIGHTBOX, a.a.STICKY_BUTTON, a.a.MESSAGE_BAR
        },
        38952: (t, e, n) => {
            n.d(e, {
                K: () => a
            });
            const i = "/elements";

            function a(t, e) {
                return `${t}${i}${e}`
            }
        },
        29301: (t, e, n) => {
            n.d(e, {
                k: () => i
            });
            const i = 40
        },
        32055: (t, e, n) => {
            n.d(e, {
                t: () => a
            }), n(19891);
            var i = n(43628);
            const a = [i.i.US, i.i.AU, i.i.CA]
        },
        15620: (t, e, n) => {
            n.d(e, {
                Ck: () => d,
                Jj: () => r,
                T7: () => l,
                eq: () => u,
                fy: () => c,
                kI: () => s,
                p4: () => o,
                q2: () => a,
                zC: () => m
            });
            var i = n(44400);
            const a = {
                    [i.m.DAILY]: [2e4, 1e4, 5e3, 3e3, 1e3, 500],
                    [i.m.WEEKLY]: [2e4, 1e4, 5e3, 3e3, 1e3, 500],
                    [i.m.BIWEEKLY]: [2e4, 1e4, 5e3, 3e3, 1e3, 500],
                    [i.m.EVERY_4_WEEKS]: [2e4, 1e4, 5e3, 3e3, 1e3, 500],
                    [i.m.MONTHLY]: [2e4, 1e4, 5e3, 3e3, 1e3, 500],
                    [i.m.BIMONTHLY]: [2e4, 1e4, 5e3, 3e3, 1e3, 500],
                    [i.m.QUARTERLY]: [2e4, 1e4, 5e3, 3e3, 1e3, 500],
                    [i.m.SEMIANNUAL]: [2e4, 1e4, 5e3, 3e3, 1e3, 500],
                    [i.m.ANNUAL]: [2e4, 1e4, 5e3, 3e3, 1e3, 500],
                    [i.m.ONCE]: [1e5, 5e4, 25e3, 1e4, 5e3, 2500]
                },
                r = {
                    [i.m.ONCE]: 10,
                    [i.m.ANNUAL]: 20,
                    [i.m.SEMIANNUAL]: 30,
                    [i.m.QUARTERLY]: 40,
                    [i.m.MONTHLY]: 50,
                    [i.m.EVERY_4_WEEKS]: 60,
                    [i.m.BIMONTHLY]: 70,
                    [i.m.WEEKLY]: 80,
                    [i.m.BIWEEKLY]: 90,
                    [i.m.DAILY]: 100
                },
                o = 3,
                s = 6,
                l = [500, 1e3, 3e3],
                c = [2500, 5e3, 1e4],
                d = [500, 1e3, 3e3, 5e3, 1e4, 2e4],
                u = [2500, 5e3, 1e4, 25e3, 5e4, 1e5],
                m = 2500
        },
        22422: (t, e, n) => {
            var i;
            n.d(e, {
                    m: () => i
                }),
                function(t) {
                    t.MONEY = "money", t.STOCK = "stock", t.CRYPTO = "crypto"
                }(i || (i = {}))
        },
        44400: (t, e, n) => {
            var i;
            n.d(e, {
                    m: () => i
                }),
                function(t) {
                    t.ONCE = "once", t.DAILY = "daily", t.WEEKLY = "weekly", t.BIWEEKLY = "biweekly", t.EVERY_4_WEEKS = "every4weeks", t.MONTHLY = "monthly", t.BIMONTHLY = "bimonthly", t.QUARTERLY = "quarterly", t.SEMIANNUAL = "semiannual", t.ANNUAL = "annual"
                }(i || (i = {}))
        },
        99200: (t, e, n) => {
            var i;
            n.d(e, {
                    Q: () => i
                }),
                function(t) {
                    t.US_BANK_ACCOUNT = "us-bank-account", t.US_BANK_ACCOUNT_DONATE_OPTIONS = "us-bank-account-donate-options", t.US_BANK_ACCOUNT_CONFIRMATION = "us-bank-account-confirmation", t.US_BANK_ACCOUNT_VERIFICATION_GUIDE = "us-bank-account-verification-guide", t.AU_BECS = "au-becs", t.CREDIT_CARD = "credit-card", t.DONATE = "donate-form", t.DOUBLE = "double", t.GIFT_AID = "gift-aid", t.PAYMENT_OPTIONS = "payment-method", t.POST_DONATION_UPSELL = "post-donation-upsell", t.SEPA = "sepa", t.IDEAL = "ideal", t.UK_BACS = "uk-bacs", t.UK_BACS_CONFIRMATION = "uk-bacs-confirmation", t.IDEAL_CONFIRMATION = "ideal-confirmation", t.UPSELL = "upsell", t.EXIT_CONFIRMATION = "exit-confirmation", t.COMMUNICATION_CONSENT = "communication-consent"
                }(i || (i = {}))
        },
        43414: (t, e, n) => {
            var i;
            n.d(e, {
                    z: () => i
                }),
                function(t) {
                    t.CLOSE = "close", t.CLOSED = "closed", t.OPEN = "open", t.CLICK = "click", t.KEYDOWN = "keydown", t.DIRTY = "dirty", t.INPUT = "input", t.LOADING = "loading", t.MOUNTED = "mounted", t.PAGE_CREATED = "page:created", t.TEAM_CREATED = "team:created", t.SUGGESTION_SELECTED = "suggestion-selected", t.READY = "ready", t.SUBMIT = "submit", t.UPDATE = "update", t.UPDATED = "updated", t.CREATE = "create", t.ARCHIVE = "archive", t.UNARCHIVE = "unarchive", t.ADD = "add", t.SAVE = "save", t.SAVED = "saved", t.CHANGE = "change", t.DUPLICATE = "duplicate", t.REMOVE = "remove", t.UPDATE_LOADING = "update:loading"
                }(i || (i = {}))
        },
        41395: (t, e, n) => {
            var i;
            n.d(e, {
                    K: () => i
                }),
                function(t) {
                    t[t.NAME_MIN_LENGTH = 1] = "NAME_MIN_LENGTH", t[t.NAME_MAX_LENGTH = 100] = "NAME_MAX_LENGTH", t[t.EMAIL_MAX_LENGTH = 320] = "EMAIL_MAX_LENGTH", t[t.ON_BEHALF_OF_MAX_LENGTH = 60] = "ON_BEHALF_OF_MAX_LENGTH"
                }(i || (i = {}))
        },
        92978: (t, e, n) => {
            var i;
            n.d(e, {
                    v: () => i
                }),
                function(t) {
                    t.NO = "no", t.CHECKOUT = "checkout", t.CUSTOM = "custom"
                }(i || (i = {}))
        },
        70282: (t, e, n) => {
            var i;
            n.d(e, {
                    U: () => i
                }),
                function(t) {
                    t.MOBILE = "Mobile", t.DESKTOP = "Desktop"
                }(i || (i = {}))
        },
        66923: (t, e, n) => {
            var i;
            n.d(e, {
                    $: () => i
                }),
                function(t) {
                    t.AMOUNT = "amount", t.LEVEL = "level"
                }(i || (i = {}))
        },
        55133: (t, e, n) => {
            var i;
            n.d(e, {
                    z: () => i
                }),
                function(t) {
                    t.PAYMENT_DATA = "PaymentData", t.PAYMENT_DATA_WITH_SUGGESTED_AMOUNT_HINTS = "PaymentDataWithSuggestedAmountHints", t.GOAL_DATA = "GoalData", t.RAISED_DATA = "RaisedData", t.SUPPORTERS_DATA = "SupportersData", t.DONATIONS_DATA = "DonationsData", t.RECURRINGS_DATA = "RecurringsData", t.RECURRINGS_AMOUNT_DATA = "RecurringsAmountData", t.PAYMENT_EXTRAS = "PaymentExtras", t.EXPERIMENTS_DATA = "ExperimentsData", t.TOP_FUNDRAISERS = "TopFundraisers", t.TOP_SUPPORTERS = "TopSupporters", t.QR_CODE = "QrCode", t.P2P_FORM = "P2P_FORM", t.SOCIAL_PROOF_CHARGES = "SocialProofCharges", t.WIDGET_CONFIG = "WidgetConfig", t.RECENT_DONATIONS = "RecentDonations", t.STATISTIC_DATA = "StatisticData", t.DONOR_MAP = "DonorMap", t.QUESTIONS_DATA = "QuestionsData", t.TOP_LOCATIONS = "TopLocations", t.TOP_COUNTRIES = "TopCountries", t.TOP_REGIONS = "TopRegions", t.TOP_CITIES = "TopCities", t.PROXY = "Proxy", t.PROXY_EXTENDED = "ProxyExtended", t.P2P_LINK_PROXY = "P2PLinkProxy", t.SCHEDULED_ELEMENT = "ScheduledElement"
                }(i || (i = {}))
        },
        51154: (t, e, n) => {
            var i;
            n.d(e, {
                    Y: () => i
                }),
                function(t) {
                    t.IMPACT_TO_AMOUNT = "impactToAmount", t.AMOUNT_TO_IMPACT = "amountToImpact"
                }(i || (i = {}))
        },
        3220: (t, e, n) => {
            var i;
            n.d(e, {
                    w: () => i
                }),
                function(t) {
                    t.FUNDRAISER_NAME = "fundraiserName", t.FULL_NAME = "fullName", t.SHORTED_FULL_NAME = "shortedFullName", t.FIRST_NAME = "firstName", t.HIDE = "hide"
                }(i || (i = {}))
        },
        82630: (t, e, n) => {
            var i;
            n.d(e, {
                    _: () => i
                }),
                function(t) {
                    t.CUSTOMER_ALREADY_IN_FUNDRAISING_PAGE = "customerAlreadyInFundraisingPage"
                }(i || (i = {}))
        },
        33049: (t, e, n) => {
            var i;
            n.d(e, {
                    n: () => i
                }),
                function(t) {
                    t.COUNTRIES = "countries", t.REGIONS = "regions", t.CITIES = "cities"
                }(i || (i = {}))
        },
        41998: (t, e, n) => {
            n.d(e, {
                O: () => a
            });
            var i = n(54702);
            const a = {
                [i.a.REMINDER]: "Reminder",
                [i.a.DONATE_BUTTON]: "Donate Button",
                [i.a.DONATION_FORM]: "Donation Form",
                [i.a.DONATION_LEVELS]: "Donation Levels",
                [i.a.RECENT_DONATIONS]: "Recent Donations",
                [i.a.SIMPLE_FORM]: "Simple Form",
                [i.a.SOCIAL_PROOF]: "Social Proof",
                [i.a.STAT_COUNTER]: "Stat Counter",
                [i.a.STICKY_BUTTON]: "Sticky Button",
                [i.a.IMPACT_SLIDER]: "Impact Slider",
                [i.a.TOP_SUPPORTERS]: "Top Supporters",
                [i.a.MESSAGE_BAR]: "Message Bar",
                [i.a.QR_CODE]: "QR Code",
                [i.a.BUTTON_GROUP]: "Button Group",
                [i.a.FLOATING_BUTTON]: "Floating Button",
                [i.a.TEXT_LINK]: "Donate Link",
                [i.a.GOAL_METER]: "Goal Meter",
                [i.a.IMAGE_CARD]: "Image Card",
                [i.a.P2P_BUTTON]: "Fundraisers Button",
                [i.a.TOP_FUNDRAISERS]: "Top Fundraisers",
                [i.a.TOP_LOCATIONS]: "Top Locations",
                [i.a.P2P_LINK]: "Fundraisers Link",
                [i.a.DONOR_MAP]: "Donor Map",
                [i.a.LIGHTBOX]: "Popup",
                [i.a.LINK]: "",
                [i.a.DEBUG_PANEL]: "",
                [i.a.TEST_MODE_PANEL]: "",
                [i.a.SPLIT_TESTING]: "",
                [i.a.DIRECT_LINK]: "",
                [i.a.FUNDRAISING_PAGE_LINK]: "",
                [i.a.FUNDRAISING_PAGE_INVITE_LINK]: "",
                [i.a.JS_API]: ""
            }
        },
        98076: (t, e, n) => {
            var i;
            n.d(e, {
                    e: () => i
                }),
                function(t) {
                    t.STRING = "string", t.OBJECT = "object"
                }(i || (i = {}))
        },
        89786: (t, e, n) => {
            var i;
            n.d(e, {
                    F: () => i
                }),
                function(t) {
                    t.URL = "URL", t.WINDOW = "WINDOW", t.URL_MATCHING = "URL_MATCHING", t.BROWSER = "BROWSER"
                }(i || (i = {}))
        },
        46863: (t, e, n) => {
            var i;
            n.d(e, {
                    C: () => i
                }),
                function(t) {
                    t.SCREEN_CHANGED = "screenChanged", t.FLOW_CHANGED = "flowChanged", t.DONE = "done", t.LOCKED = "locked", t.UNLOCKED = "unlocked"
                }(i || (i = {}))
        },
        43628: (t, e, n) => {
            var i;
            n.d(e, {
                    i: () => i
                }),
                function(t) {
                    t[t.AD = 3041565] = "AD", t[t.AE = 290557] = "AE", t[t.AF = 1149361] = "AF", t[t.AG = 3576396] = "AG", t[t.AI = 3573511] = "AI", t[t.AL = 783754] = "AL", t[t.AM = 174982] = "AM", t[t.AO = 3351879] = "AO", t[t.AQ = 6697173] = "AQ", t[t.AR = 3865483] = "AR", t[t.AS = 5880801] = "AS", t[t.AT = 2782113] = "AT", t[t.AU = 2077456] = "AU", t[t.AW = 3577279] = "AW", t[t.AX = 661882] = "AX", t[t.AZ = 587116] = "AZ", t[t.BA = 3277605] = "BA", t[t.BB = 3374084] = "BB", t[t.BD = 1210997] = "BD", t[t.BE = 2802361] = "BE", t[t.BF = 2361809] = "BF", t[t.BG = 732800] = "BG", t[t.BH = 290291] = "BH", t[t.BI = 433561] = "BI", t[t.BJ = 2395170] = "BJ", t[t.BL = 3578476] = "BL", t[t.BM = 3573345] = "BM", t[t.BN = 1820814] = "BN", t[t.BO = 3923057] = "BO", t[t.BQ = 7626844] = "BQ", t[t.BR = 3469034] = "BR", t[t.BS = 3572887] = "BS", t[t.BT = 1252634] = "BT", t[t.BV = 3371123] = "BV", t[t.BW = 933860] = "BW", t[t.BY = 630336] = "BY", t[t.BZ = 3582678] = "BZ", t[t.CA = 6251999] = "CA", t[t.CC = 1547376] = "CC", t[t.CD = 203312] = "CD", t[t.CF = 239880] = "CF", t[t.CG = 2260494] = "CG", t[t.CH = 2658434] = "CH", t[t.CI = 2287781] = "CI", t[t.CK = 1899402] = "CK", t[t.CL = 3895114] = "CL", t[t.CM = 2233387] = "CM", t[t.CN = 1814991] = "CN", t[t.CO = 3686110] = "CO", t[t.CR = 3624060] = "CR", t[t.CU = 3562981] = "CU", t[t.CV = 3374766] = "CV", t[t.CW = 7626836] = "CW", t[t.CX = 2078138] = "CX", t[t.CY = 146669] = "CY", t[t.CZ = 3077311] = "CZ", t[t.DE = 2921044] = "DE", t[t.DJ = 223816] = "DJ", t[t.DK = 2623032] = "DK", t[t.DM = 3575830] = "DM", t[t.DO = 3508796] = "DO", t[t.DZ = 2589581] = "DZ", t[t.EC = 3658394] = "EC", t[t.EE = 453733] = "EE", t[t.EG = 357994] = "EG", t[t.EH = 2461445] = "EH", t[t.ER = 338010] = "ER", t[t.ES = 2510769] = "ES", t[t.ET = 337996] = "ET", t[t.FI = 660013] = "FI", t[t.FJ = 2205218] = "FJ", t[t.FK = 3474414] = "FK", t[t.FM = 2081918] = "FM", t[t.FO = 2622320] = "FO", t[t.FR = 3017382] = "FR", t[t.GA = 2400553] = "GA", t[t.GB = 2635167] = "GB", t[t.GD = 3580239] = "GD", t[t.GE = 614540] = "GE", t[t.GF = 3381670] = "GF", t[t.GG = 3042362] = "GG", t[t.GH = 2300660] = "GH", t[t.GI = 2411586] = "GI", t[t.GL = 3425505] = "GL", t[t.GM = 2413451] = "GM", t[t.GN = 2420477] = "GN", t[t.GP = 3579143] = "GP", t[t.GQ = 2309096] = "GQ", t[t.GR = 390903] = "GR", t[t.GS = 3474415] = "GS", t[t.GT = 3595528] = "GT", t[t.GU = 4043988] = "GU", t[t.GW = 2372248] = "GW", t[t.GY = 3378535] = "GY", t[t.HK = 1819730] = "HK", t[t.HM = 1547314] = "HM", t[t.HN = 3608932] = "HN", t[t.HR = 3202326] = "HR", t[t.HT = 3723988] = "HT", t[t.HU = 719819] = "HU", t[t.ID = 1643084] = "ID", t[t.IE = 2963597] = "IE", t[t.IL = 294640] = "IL", t[t.IM = 3042225] = "IM", t[t.IN = 1269750] = "IN", t[t.IO = 1282588] = "IO", t[t.IQ = 99237] = "IQ", t[t.IR = 130758] = "IR", t[t.IS = 2629691] = "IS", t[t.IT = 3175395] = "IT", t[t.JE = 3042142] = "JE", t[t.JM = 3489940] = "JM", t[t.JO = 248816] = "JO", t[t.JP = 1861060] = "JP", t[t.KE = 192950] = "KE", t[t.KG = 1527747] = "KG", t[t.KH = 1831722] = "KH", t[t.KI = 4030945] = "KI", t[t.KM = 921929] = "KM", t[t.KN = 3575174] = "KN", t[t.KP = 1873107] = "KP", t[t.KR = 1835841] = "KR", t[t.KW = 285570] = "KW", t[t.KY = 3580718] = "KY", t[t.KZ = 1522867] = "KZ", t[t.LA = 1655842] = "LA", t[t.LB = 272103] = "LB", t[t.LC = 3576468] = "LC", t[t.LI = 3042058] = "LI", t[t.LK = 1227603] = "LK", t[t.LR = 2275384] = "LR", t[t.LS = 932692] = "LS", t[t.LT = 597427] = "LT", t[t.LU = 2960313] = "LU", t[t.LV = 458258] = "LV", t[t.LY = 2215636] = "LY", t[t.MA = 2542007] = "MA", t[t.MC = 2993457] = "MC", t[t.MD = 617790] = "MD", t[t.ME = 3194884] = "ME", t[t.MF = 3578421] = "MF", t[t.MG = 1062947] = "MG", t[t.MH = 2080185] = "MH", t[t.MK = 718075] = "MK", t[t.ML = 2453866] = "ML", t[t.MM = 1327865] = "MM", t[t.MN = 2029969] = "MN", t[t.MO = 1821275] = "MO", t[t.MP = 4041468] = "MP", t[t.MQ = 3570311] = "MQ", t[t.MR = 2378080] = "MR", t[t.MS = 3578097] = "MS", t[t.MT = 2562770] = "MT", t[t.MU = 934292] = "MU", t[t.MV = 1282028] = "MV", t[t.MW = 927384] = "MW", t[t.MX = 3996063] = "MX", t[t.MY = 1733045] = "MY", t[t.MZ = 1036973] = "MZ", t[t.NA = 3355338] = "NA", t[t.NC = 2139685] = "NC", t[t.NE = 2440476] = "NE", t[t.NF = 2155115] = "NF", t[t.NG = 2328926] = "NG", t[t.NI = 3617476] = "NI", t[t.NL = 2750405] = "NL", t[t.NO = 3144096] = "NO", t[t.NP = 1282988] = "NP", t[t.NR = 2110425] = "NR", t[t.NU = 4036232] = "NU", t[t.NZ = 2186224] = "NZ", t[t.OM = 286963] = "OM", t[t.PA = 3703430] = "PA", t[t.PE = 3932488] = "PE", t[t.PF = 4030656] = "PF", t[t.PG = 2088628] = "PG", t[t.PH = 1694008] = "PH", t[t.PK = 1168579] = "PK", t[t.PL = 798544] = "PL", t[t.PM = 3424932] = "PM", t[t.PN = 4030699] = "PN", t[t.PR = 4566966] = "PR", t[t.PS = 6254930] = "PS", t[t.PT = 2264397] = "PT", t[t.PW = 1559582] = "PW", t[t.PY = 3437598] = "PY", t[t.QA = 289688] = "QA", t[t.RE = 935317] = "RE", t[t.RO = 798549] = "RO", t[t.RS = 6290252] = "RS", t[t.RU = 2017370] = "RU", t[t.RW = 49518] = "RW", t[t.SA = 102358] = "SA", t[t.SB = 2103350] = "SB", t[t.SC = 241170] = "SC", t[t.SD = 366755] = "SD", t[t.SS = 7909807] = "SS", t[t.SE = 2661886] = "SE", t[t.SG = 1880251] = "SG", t[t.SH = 3370751] = "SH", t[t.SI = 3190538] = "SI", t[t.SJ = 607072] = "SJ", t[t.SK = 3057568] = "SK", t[t.SL = 2403846] = "SL", t[t.SM = 3168068] = "SM", t[t.SN = 2245662] = "SN", t[t.SO = 51537] = "SO", t[t.SR = 3382998] = "SR", t[t.ST = 2410758] = "ST", t[t.SV = 3585968] = "SV", t[t.SX = 7609695] = "SX", t[t.SY = 163843] = "SY", t[t.SZ = 934841] = "SZ", t[t.TC = 3576916] = "TC", t[t.TD = 2434508] = "TD", t[t.TF = 1546748] = "TF", t[t.TG = 2363686] = "TG", t[t.TH = 1605651] = "TH", t[t.TJ = 1220409] = "TJ", t[t.TK = 4031074] = "TK", t[t.TL = 1966436] = "TL", t[t.TM = 1218197] = "TM", t[t.TN = 2464461] = "TN", t[t.TO = 4032283] = "TO", t[t.TR = 298795] = "TR", t[t.TT = 3573591] = "TT", t[t.TV = 2110297] = "TV", t[t.TW = 1668284] = "TW", t[t.TZ = 149590] = "TZ", t[t.UA = 690791] = "UA", t[t.UG = 226074] = "UG", t[t.UM = 5854968] = "UM", t[t.US = 6252001] = "US", t[t.UY = 3439705] = "UY", t[t.UZ = 1512440] = "UZ", t[t.VA = 3164670] = "VA", t[t.VC = 3577815] = "VC", t[t.VE = 3625428] = "VE", t[t.VG = 3577718] = "VG", t[t.VI = 4796775] = "VI", t[t.VN = 1562822] = "VN", t[t.VU = 2134431] = "VU", t[t.WF = 4034749] = "WF", t[t.WS = 4034894] = "WS", t[t.YE = 69543] = "YE", t[t.YT = 1024031] = "YT", t[t.ZA = 953987] = "ZA", t[t.ZM = 895949] = "ZM", t[t.ZW = 878675] = "ZW", t[t.CS = 8505033] = "CS", t[t.AN = 8505032] = "AN"
                }(i || (i = {}))
        },
        45856: (t, e, n) => {
            var i;
            n.d(e, {
                    T: () => i
                }),
                function(t) {
                    t.ELEMENT_IMAGE_CARD = "elementImageCard", t.ELEMENT_POPUP = "elementPopup", t.ELEMENT_QR_CODE = "elementQrCode", t.P2P_PHOTO = "p2pPhoto", t.DONOR_PORTAL_HERO = "donorPortalHero", t.DONOR_PORTAL_FAVICON = "donorPortalFavicon", t.DONOR_PORTAL_P2P_GOAL_REACHED = "donorPortalP2pGoalReached", t.EMAIL_LOGO = "emailLogo", t.EMAIL_IMAGE = "emailImage", t.EMAIL_TRIBUTE = "emailTribute", t.RECEIPT_LOGO = "receiptLogo", t.RECEIPT_SIGNATURE = "receiptSignature", t.CHECKOUT_LOGO = "checkoutLogo", t.CHECKOUT_ASK = "checkoutAsk", t.PAGE_LOGO = "pageLogo", t.PAGE_MAIN_IMAGE = "pageMainImage", t.ORGANIZATION_LOGO = "organizationLogo"
                }(i || (i = {}))
        },
        10392: (t, e, n) => {
            var i;
            n.d(e, {
                    o: () => i
                }),
                function(t) {
                    t.NONE = ""
                }(i || (i = {}))
        },
        30631: (t, e, n) => {
            var i;
            n.d(e, {
                    D: () => i
                }),
                function(t) {
                    t.NUMERIC = "numeric", t.TWO_DIGIT = "2-digit"
                }(i || (i = {}))
        },
        79251: (t, e, n) => {
            var i;
            n.d(e, {
                    v: () => i
                }),
                function(t) {
                    t.NUMERIC = "numeric", t.TWO_DIGIT = "2-digit", t.SHORT = "short", t.LONG = "long", t.NARROW = "narrow"
                }(i || (i = {}))
        },
        1900: (t, e, n) => {
            var i;
            n.d(e, {
                    E: () => i
                }),
                function(t) {
                    t.NUMERIC = "numeric", t.TWO_DIGIT = "2-digit"
                }(i || (i = {}))
        },
        29755: (t, e, n) => {
            var i;
            n.d(e, {
                    n: () => i
                }),
                function(t) {
                    t.SHORT = "short", t.ADVERB = "adverb", t.NOUN = "noun", t.ADJECTIVE = "adjective"
                }(i || (i = {}))
        },
        72935: (t, e, n) => {
            var i, a, r, o;
            n.d(e, {
                    $8: () => r
                }),
                function(t) {
                    t[t.MIN = 80] = "MIN", t[t.MAX = 250] = "MAX"
                }(i || (i = {})),
                function(t) {
                    t.EMAIL = "email", t.ADDRESS = "address", t.NOT_SHARE = "not_share"
                }(a || (a = {})),
                function(t) {
                    t.NONE = "none", t.HONOR = "honor", t.MEMORY = "memory"
                }(r || (r = {})),
                function(t) {
                    t.POSTAL_CARD = "card", t.LETTER = "letter"
                }(o || (o = {}))
        },
        93330: (t, e, n) => {
            var i, a, r, o, s, l, c, d, u;
            n.d(e, {
                    FE: () => r,
                    Yp: () => i,
                    k9: () => a
                }),
                function(t) {
                    t.RELATIVE = "relative", t.ABSOLUTE = "absolute"
                }(i || (i = {})),
                function(t) {
                    t.TWO_WEEKS = "2weeks", t.ONE_MONTH = "1month", t.THREE_MONTHS = "3months"
                }(a || (a = {})),
                function(t) {
                    t.ASC = "asc", t.DESC = "desc"
                }(r || (r = {})),
                function(t) {
                    t.WITHOUT = "without", t.SELECT = "select"
                }(o || (o = {})),
                function(t) {
                    t.ENABLED = "enabled", t.DISABLED = "disabled"
                }(s || (s = {})),
                function(t) {
                    t.ACTIVE = "active", t.DISABLED = "disabled", t.AUTO_ARCHIVE = "autoArchive"
                }(l || (l = {})),
                function(t) {
                    t.FULL_NAME = "fullName", t.FIRST_NAME_LAST_INITIALS = "firstNameLastInitials", t.FIRST_NAME = "firstName", t.NONE = "none"
                }(c || (c = {})),
                function(t) {
                    t.SPECIFIED = "specified", t.DETECTED = "detected", t.ACTUAL = "actual"
                }(d || (d = {})),
                function(t) {
                    t.ROUNDED = "rounded", t.SHARP = "sharp", t.PILL = "pill"
                }(u || (u = {}));
            Object.values({
                "2:1": 1.5,
                "1:1": 2,
                "1:2": 3,
                "1:3": 4,
                "1:4": 5,
                "1:5": 6,
                "1:6": 7,
                "1:7": 8,
                "1:8": 9,
                "1:9": 10,
                "1:10": 11
            })
        },
        35540: (t, e, n) => {
            var i;
            n.d(e, {
                    E: () => i
                }),
                function(t) {
                    t.RECURRING = "recurring", t.ONE_TIME = "one-time", t.ALL = "all"
                }(i || (i = {}))
        },
        66843: (t, e, n) => {
            t.exports = n.p + "static/../common-fonts/ibm-plex-sans-arabic/ibmplexsans-arabic-v12-300.woff2"
        },
        94312: (t, e, n) => {
            t.exports = n.p + "static/../common-fonts/ibm-plex-sans-arabic/ibmplexsans-arabic-v12-400.woff2"
        },
        17977: (t, e, n) => {
            t.exports = n.p + "static/../common-fonts/ibm-plex-sans-arabic/ibmplexsans-arabic-v12-500.woff2"
        },
        95870: (t, e, n) => {
            t.exports = n.p + "static/../common-fonts/ibm-plex-sans-arabic/ibmplexsans-arabic-v12-600.woff2"
        },
        89807: (t, e, n) => {
            t.exports = n.p + "static/../common-fonts/ibm-plex-sans-arabic/ibmplexsans-arabic-v12-700.woff2"
        },
        78552: (t, e, n) => {
            t.exports = n.p + "static/../common-fonts/ibm-plex-sans/ibmplexsans-v19-300.woff2"
        },
        11755: (t, e, n) => {
            t.exports = n.p + "static/../common-fonts/ibm-plex-sans/ibmplexsans-v19-400.woff2"
        },
        59706: (t, e, n) => {
            t.exports = n.p + "static/../common-fonts/ibm-plex-sans/ibmplexsans-v19-500.woff2"
        },
        33717: (t, e, n) => {
            t.exports = n.p + "static/../common-fonts/ibm-plex-sans/ibmplexsans-v19-600.woff2"
        },
        18676: (t, e, n) => {
            t.exports = n.p + "static/../common-fonts/ibm-plex-sans/ibmplexsans-v19-700.woff2"
        }
    }
]);