/*! For license information please see a920c04dc304.elementsApi.js.LICENSE.txt */
(() => {
    var e, t, i, n, s = {
            46063: (e, t, i) => {
                "use strict";
                var n;
                i.d(t, {
                        DF: () => a,
                        j0: () => s,
                        wn: () => o
                    }),
                    function(e) {
                        e.NOT_SUBMITTED = "not_submitted", e.SUBSCRIBED = "subscribed", e.UNSUBSCRIBED = "unsubscribed"
                    }(n || (n = {}));
                const s = 2,
                    a = 80,
                    o = (n.NOT_SUBMITTED, n.SUBSCRIBED, n.UNSUBSCRIBED, 6e4);
                var r;
                ! function(e) {
                    e.RECEIPTS = "receipts", e.ANNUAL_SUMMARY_RECEIPTS = "annual-summary-receipts"
                }(r || (r = {}))
            },
            51710: (e, t, i) => {
                "use strict";
                i.d(t, {
                    QW: () => s,
                    S9: () => a,
                    SG: () => o
                });
                var n = i(538);
                const s = 10 * n.MS.MINUTE,
                    a = 30 * n.MS.MINUTE;
                class o {
                    constructor(e, t, i) {
                        this.storage = e, this.timeoutGenerator = t, this.eventEmitter = i, this.timeouts = [], this.data = this.storage.getField("socialProof") || {}
                    }
                    get lastShownCharge() {
                        var e;
                        return null !== (e = this.data.lastShownCharge) && void 0 !== e ? e : ""
                    }
                    get nextShowAt() {
                        var e;
                        return null !== (e = this.data.nextShowAt) && void 0 !== e ? e : 0
                    }
                    set lastShownCharge(e) {
                        this.data.lastShownCharge = e, this.storage.setField("socialProof", this.data)
                    }
                    set nextShowAt(e) {
                        this.data.nextShowAt = e, this.storage.setField("socialProof", this.data)
                    }
                    setupNextShow(e) {
                        const t = new Date;
                        t.setMilliseconds(t.getMilliseconds() + e), this.nextShowAt = t.getTime()
                    }
                    getChargesForShow(e) {
                        if (this.nextShowAt) return [];
                        if (this.lastShownCharge) {
                            const t = e.findIndex((e => e.chargeKey === this.lastShownCharge));
                            if (-1 !== t) return e.slice(0, t + 1)
                        }
                        return e
                    }
                    isNextShowAtExpire() {
                        return Date.now() > this.nextShowAt
                    }
                    getNextTimeout() {
                        if (this.timeouts.length || this.initializeTimeouts(), this.nextShowAt) return this.nextShowAt - Date.now();
                        return this.timeouts.shift() || 0 || (this.initializeTimeouts(), this.getNextTimeout())
                    }
                    initializeTimeouts() {
                        this.timeouts = this.timeoutGenerator.getTimeouts()
                    }
                }
            },
            96580: (e, t, i) => {
                "use strict";
                i.d(t, {
                    A: () => o,
                    S: () => a
                });
                var n = i(54702),
                    s = i(86011);
                class a {
                    constructor(e, t, i, n, s) {
                        this.eventBus = e, this.window = t, this.livemode = i, this.debug = n, this.isDisabledByParam = s, this.panel = null
                    }
                    createPanel(e) {
                        if (this.isDisabled) return;
                        this.debug && this.debug.log("create fake element - test mode panel");
                        const t = this.window.document.createElement("a");
                        this.window.document.documentElement.appendChild(t), this.eventBus.dispatch(s.J.CREATE, {
                            name: n.a.TEST_MODE_PANEL,
                            params: {
                                elementKey: "test-panel",
                                elementType: n.a.TEST_MODE_PANEL,
                                elementName: "",
                                config: {
                                    defaultLocale: e
                                },
                                elementFoundTimestamp: Date.now()
                            },
                            showcase: !1,
                            node: t,
                            onCreate: e => {
                                this.panel = e
                            }
                        })
                    }
                    hide() {
                        var e;
                        null === (e = this.panel) || void 0 === e || e.hide()
                    }
                    show() {
                        var e;
                        null === (e = this.panel) || void 0 === e || e.show()
                    }
                    get isDisabled() {
                        return !!window.FUN_DISABLE_GLOBAL_TEST_MODE_PANEL || Boolean(this.isDisabledByParam || this.livemode || this.panel)
                    }
                }
                const o = a
            },
            86011: (e, t, i) => {
                "use strict";
                var n;
                i.d(t, {
                        J: () => n
                    }),
                    function(e) {
                        e[e.CREATE = 1] = "CREATE", e[e.REMINDER_NEED_SHOW_FIRST = 2] = "REMINDER_NEED_SHOW_FIRST", e[e.ON_RENDER = 3] = "ON_RENDER"
                    }(n || (n = {}))
            },
            88856: (e, t, i) => {
                "use strict";
                i.d(t, {
                    Ue: () => s,
                    cT: () => o,
                    pW: () => a
                });
                var n = i(54702);
                const s = [n.a.GOAL_METER, n.a.TOP_FUNDRAISERS, n.a.TOP_SUPPORTERS, n.a.TOP_LOCATIONS, n.a.STAT_COUNTER, n.a.RECENT_DONATIONS, n.a.DONOR_MAP];
                var a, o;
                ! function(e) {
                    e.LEFT_TOP = "left-top", e.LEFT_CENTER = "left-center", e.LEFT_BOTTOM = "left-bottom", e.RIGHT_TOP = "right-top", e.RIGHT_CENTER = "right-center", e.RIGHT_BOTTOM = "right-bottom", e.TOP_CENTER = "top-center", e.TOP_LEFT = "top-left", e.TOP_RIGHT = "top-right", e.BOTTOM_CENTER = "bottom-center", e.BOTTOM_LEFT = "bottom-left", e.BOTTOM_RIGHT = "bottom-right", e.CENTER = "center"
                }(a || (a = {})),
                function(e) {
                    e.CLICK = "click", e.CLOSE = "close", e.OPEN_WIDGET = "openWidget", e.CHECKOUT_BEFORE_OPEN = "checkoutBeforeOpen", e.PRE_SHOW = "preShow", e.RENDERED = "rendered", e.SHOW = "show", e.USER_CLOSE = "user:close", e.ELEMENT_RESIZE = "resize-element", e.OPEN_MODAL = "openModal", e.CLOSE_MODAL = "clolseModal", e.SEARCH_FUNDRAISERS = "searchFundraisers", e.ANIMATION_START = "start:animation", e.CLOSED = "closed", e.DATA_UPDATED = "dataUpdated", e.CONFIG_UPDATED = "configUpdated", e.RETURN_FOCUS = "returnFocus"
                }(o || (o = {}))
            },
            37859: (e, t, i) => {
                "use strict";
                i.d(t, {
                    w: () => s
                });
                class n {
                    constructor() {
                        this.providers = new Map, this.cache = new Map
                    }
                    get(e) {
                        let t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                        const i = this.providers.get(e);
                        if (!i) throw new Error(`${String(e)} is not provided`);
                        if (t && this.cache.has(e)) return this.cache.get(e);
                        const n = i();
                        return t ? (this.cache.has(e) || this.cache.set(e, n), n) : n
                    }
                    provide(e, t) {
                        return this.providers.has(e) ? (console.warn(`14 ${String(e)}`), this) : (this.providers.set(e, t), this)
                    }
                }

                function s() {
                    return window.FUN_SERVICE_CONTAINER || (window.FUN_SERVICE_CONTAINER = new n), window.FUN_SERVICE_CONTAINER
                }
            },
            81617: (e, t, i) => {
                "use strict";
                var n;
                i.d(t, {
                        e: () => n
                    }),
                    function(e) {
                        e.SESSION = "fundraiseup_session", e.FUNC = "fundraiseup_func", e.PERFORMANCE = "fundraiseup_stat", e.CONSENT = "fundraiseup_consent", e.MARKETING = "fundraiseup_mark", e.CID = "fundraiseup_cid", e.DEBUG = "fundraiseup_debug", e.EXPERIMENTS = "fundraiseup_experiments", e.FUN_AB_STORAGE = "fundraiseup_ab_test"
                    }(n || (n = {}))
            },
            63312: (e, t, i) => {
                "use strict";
                i.d(t, {
                    Qk: () => r,
                    iJ: () => u,
                    N_: () => d,
                    n7: () => m,
                    Op: () => o,
                    ZD: () => l
                });
                var n = i(7274);
                n.D.AR_001;
                const s = [i(97786).L.AR],
                    a = [n.D.AR_001];

                function o(e, t) {
                    return t.some((t => e === t))
                }

                function r(e) {
                    return e.split("-")[0]
                }
                const c = {
                    "&amp;": "&"
                };

                function l(e) {
                    let t = e;
                    for (const a in c) Object.prototype.hasOwnProperty.call(c, a) && e.includes(a) && (i = t, n = a, s = c[a], t = i.replace(new RegExp(n, "g"), s));
                    var i, n, s;
                    return t
                }

                function d(e) {
                    return arguments.length > 1 && void 0 !== arguments[1] && arguments[1] || ! function(e) {
                        return a.includes(e)
                    }(e) ? "ltr" : "rtl"
                }

                function u(e) {
                    return arguments.length > 1 && void 0 !== arguments[1] && arguments[1] || ! function(e) {
                        return s.includes(e)
                    }(e) ? "ltr" : "rtl"
                }

                function m(e, t, i) {
                    const n = r(e);
                    return -1 !== t.indexOf(n) ? e : i
                }
            },
            97786: (e, t, i) => {
                "use strict";
                var n;
                i.d(t, {
                        L: () => n
                    }),
                    function(e) {
                        e.EN = "en", e.ES = "es", e.FR = "fr", e.NL = "nl", e.NO = "no", e.DE = "de", e.FI = "fi", e.AR = "ar", e.SV = "sv", e.IT = "it", e.PT = "pt", e.ZH = "zh", e.JA = "ja", e.KO = "ko", e.HU = "hu", e.DA = "da", e.RU = "ru", e.PL = "pl"
                    }(n || (n = {}))
            },
            7274: (e, t, i) => {
                "use strict";
                var n;
                i.d(t, {
                        D: () => n
                    }),
                    function(e) {
                        e.EN_US = "en-US", e.EN_GB = "en-GB", e.EN_CA = "en-CA", e.FR_CA = "fr-CA", e.FR_FR = "fr-FR", e.ES = "es", e.NL = "nl", e.NO = "no", e.DE = "de", e.FI_FI = "fi-FI", e.AR_001 = "ar-001", e.SV = "sv", e.IT = "it", e.PT_PT = "pt-PT", e.PT_BR = "pt-BR", e.ZH_CN = "zh-CN", e.ZH_TW = "zh-TW", e.JA = "ja", e.KO = "ko", e.HU = "hu", e.DA = "da", e.RU_RU = "ru-RU", e.ES_US = "es-US", e.PL_PL = "pl-PL"
                    }(n || (n = {}))
            },
            36416: (e, t, i) => {
                "use strict";

                function n(e) {
                    let t, i, n, s, a, o, r, c, l = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                    for (t = 3 & e.length, i = e.length - t, n = l, a = 3432918353, o = 461845907, c = 0; c < i;) r = 255 & e.charCodeAt(c) | (255 & e.charCodeAt(++c)) << 8 | (255 & e.charCodeAt(++c)) << 16 | (255 & e.charCodeAt(++c)) << 24, ++c, r = (65535 & r) * a + (((r >>> 16) * a & 65535) << 16) & 4294967295, r = r << 15 | r >>> 17, r = (65535 & r) * o + (((r >>> 16) * o & 65535) << 16) & 4294967295, n ^= r, n = n << 13 | n >>> 19, s = 5 * (65535 & n) + ((5 * (n >>> 16) & 65535) << 16) & 4294967295, n = 27492 + (65535 & s) + ((58964 + (s >>> 16) & 65535) << 16);
                    switch (r = 0, t) {
                        case 3:
                            r ^= (255 & e.charCodeAt(c + 2)) << 16;
                            break;
                        case 2:
                            r ^= (255 & e.charCodeAt(c + 1)) << 8;
                            break;
                        case 1:
                            r ^= 255 & e.charCodeAt(c), r = (65535 & r) * a + (((r >>> 16) * a & 65535) << 16) & 4294967295, r = r << 15 | r >>> 17, r = (65535 & r) * o + (((r >>> 16) * o & 65535) << 16) & 4294967295, n ^= r
                    }
                    return n ^= e.length, n ^= n >>> 16, n = 2246822507 * (65535 & n) + ((2246822507 * (n >>> 16) & 65535) << 16) & 4294967295, n ^= n >>> 13, n = 3266489909 * (65535 & n) + ((3266489909 * (n >>> 16) & 65535) << 16) & 4294967295, n ^= n >>> 16, n >>> 0
                }
                i.d(t, {
                    A: () => n
                })
            },
            50137: (e, t, i) => {
                "use strict";
                i.d(t, {
                    o: () => u
                });
                var n, s = i(71267),
                    a = i(87148),
                    o = i(93227),
                    r = i(36787),
                    c = i(7274);
                ! function(e) {
                    e.PREFIX = "prefix", e.POSTFIX = "postfix"
                }(n || (n = {}));
                const l = {
                    [c.D.EN_US]: n.PREFIX,
                    [c.D.EN_GB]: n.PREFIX,
                    [c.D.EN_CA]: n.PREFIX,
                    [c.D.FR_CA]: n.POSTFIX,
                    [c.D.ES]: n.POSTFIX,
                    [c.D.ES_US]: n.PREFIX,
                    [c.D.NL]: n.PREFIX,
                    [c.D.NO]: n.PREFIX,
                    [c.D.DE]: n.POSTFIX,
                    [c.D.FI_FI]: n.POSTFIX,
                    [c.D.FR_FR]: n.POSTFIX,
                    [c.D.SV]: n.POSTFIX,
                    [c.D.IT]: n.POSTFIX,
                    [c.D.PT_PT]: n.POSTFIX,
                    [c.D.PT_BR]: n.PREFIX,
                    [c.D.AR_001]: n.PREFIX,
                    [c.D.ZH_CN]: n.PREFIX,
                    [c.D.ZH_TW]: n.PREFIX,
                    [c.D.JA]: n.PREFIX,
                    [c.D.KO]: n.PREFIX,
                    [c.D.HU]: n.POSTFIX,
                    [c.D.DA]: n.POSTFIX,
                    [c.D.RU_RU]: n.POSTFIX,
                    [c.D.PL_PL]: n.POSTFIX
                };
                class d {
                    constructor() {
                        this._currenciesData = null, this.notUseLetterSymbol = !1, this.currenciesExtraData = new Map
                    }
                    setData(e) {
                        if (this._currenciesData = e, !this._currenciesData) return;
                        const t = this._currenciesData;
                        Object.keys(t).forEach((e => {
                            this.currenciesExtraData.set(e, {
                                symbolHasLetters: /[a-zA-Z]/.test(t[e].symbol)
                            })
                        }))
                    }
                    formatCurrency(e) {
                        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "USD",
                            i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "full",
                            n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                            s = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                            a = arguments.length > 5 ? arguments[5] : void 0,
                            o = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : "narrowSymbol";
                        const r = this.currenciesData[t];
                        e = (e || 0) / Math.pow(10, r.digits);
                        const l = this.buildOptions({
                            amount: e,
                            display: i,
                            currency: t,
                            displayCurrency: o,
                            datum: r,
                            withoutPrefix: n,
                            withoutSuffix: s
                        });
                        e < 0 && 0 === l.intlOptions.maximumFractionDigits && (e = 0), a === c.D.KO && e > 1e4 && (l.intlOptions.minimumFractionDigits = 0, l.intlOptions.maximumFractionDigits = 1);
                        const u = this.currenciesExtraData.get(r.code);
                        return null != u && u.symbolHasLetters && this.notUseLetterSymbol && (l.intlOptions.currencyDisplay = "code"), d.castIntl({
                            amount: e,
                            locale: a,
                            options: l,
                            datum: r
                        })
                    }
                    getCurrencyFormat(e) {
                        return {
                            decimalSeparator: Intl.NumberFormat(e).format(1.1).replace(/\d/g, ""),
                            groupSeparator: Intl.NumberFormat(e).format(1e5).replace(/\d/g, "")
                        }
                    }
                    static castIntl(e) {
                        let t, {
                            amount: i,
                            locale: n,
                            options: a,
                            datum: o
                        } = e;
                        try {
                            t = Intl.NumberFormat(n, a.intlOptions).format(i)
                        } catch (e) {
                            if (!d.isUnsupportedBrowserError(e, a)) throw e;
                            a.intlOptions.currencyDisplay = s.Uk, t = Intl.NumberFormat(n, a.intlOptions).format(i)
                        }
                        return o.symbol && t.includes(o.code) && "code" !== a.intlOptions.currencyDisplay && (t = t.replace(o.code, o.symbol)), a.internalOptions.pushSuffix && (t += ` ${o.code}`), t
                    }
                    formatSymbol(e, t, i) {
                        const s = d.currencySymbolPosition(i);
                        return s === n.PREFIX && t === r.I.PREFIX || s === n.POSTFIX && t === r.I.POSTFIX ? e : ""
                    }
                    get currenciesData() {
                        if (!this._currenciesData) throw new Error("Currencies data was not set");
                        return this._currenciesData
                    }
                    buildOptions(e) {
                        let {
                            amount: t,
                            display: i,
                            currency: n,
                            datum: r,
                            withoutPrefix: c,
                            withoutSuffix: l,
                            displayCurrency: d = "narrowSymbol"
                        } = e;
                        const u = r.type === o.Z.CRYPTO,
                            m = u ? void 0 : r.symbol,
                            E = {
                                style: m ? "currency" : "decimal",
                                currency: u ? void 0 : n,
                                notation: "standard",
                                currencyDisplay: d,
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                                numberingSystem: "latn"
                            },
                            h = {
                                pushSuffix: !m
                            };
                        switch (i) {
                            case "short":
                                {
                                    const e = this.shortFormatNotation(t),
                                        i = this.shortFormatFractionDigits(t);
                                    "compact" === e && (E.minimumFractionDigits = 0, E.maximumFractionDigits = i),
                                    E.notation = e;
                                    break
                                }
                            case "shortlabel":
                                {
                                    const e = this.shortFormatNotation(t),
                                        i = this.shortFormatFractionDigits(t);
                                    "compact" === e && (E.minimumFractionDigits = 0, E.maximumFractionDigits = i),
                                    E.notation = e,
                                    h.pushSuffix = !1;
                                    break
                                }
                            case "round":
                                break;
                            case "roundstrict":
                                throw new Error("Used only in non-localized parts, not rewritten at the moment");
                            case "roundlabel":
                                h.pushSuffix = !1;
                                break;
                            case "full":
                                u && (E.style = "decimal", h.pushSuffix = !0), E.maximumFractionDigits = r.digits, E.minimumFractionDigits = u ? s.lt : r.digits;
                                break;
                            case "fullstrict":
                                u && (E.style = "decimal"), h.pushSuffix = !0, E.maximumFractionDigits = r.digits, E.minimumFractionDigits = u ? s.lt : r.digits;
                                break;
                            case "floatcents":
                                Math.round(t) !== t ? (E.maximumFractionDigits = r.digits, E.minimumFractionDigits = r.digits) : (E.maximumFractionDigits = 0, E.minimumFractionDigits = 0);
                                break;
                            case "trimzeroes":
                                u ? (E.maximumFractionDigits = r.digits, E.minimumFractionDigits = 0) : Math.round(t) !== t ? (E.maximumFractionDigits = r.digits, E.minimumFractionDigits = r.digits) : (E.maximumFractionDigits = 0, E.minimumFractionDigits = 0);
                                break;
                            case "fulltrimzeroes":
                                h.pushSuffix = !0, u ? (E.maximumFractionDigits = r.digits, E.minimumFractionDigits = 0, E.style = "decimal") : Math.round(t) !== t ? (E.maximumFractionDigits = r.digits, E.minimumFractionDigits = r.digits) : (E.maximumFractionDigits = 0, E.minimumFractionDigits = 0);
                                break;
                            case "scopeFloatCents":
                                throw new Error("Unused, not rewritten at the moment");
                            default:
                                throw new Error(`Unknown display type ${i}`)
                        }
                        return c && (E.style = "decimal"), (l || (0, a.f)(n)) && (h.pushSuffix = !1), {
                            intlOptions: E,
                            internalOptions: h
                        }
                    }
                    shortFormatNotation(e) {
                        return Math.abs(e) < 1e4 ? "standard" : "compact"
                    }
                    shortFormatFractionDigits(e) {
                        const t = Math.abs(e),
                            i = this.calcDivisor(t);
                        let n = d.calcDigits(t, i);
                        return t >= d.TEN_THOUSAND && t < d.HUNDRED_THOUSAND && (n = 1), t % i == 0 && (n = 0), n
                    }
                    calcDivisor(e) {
                        let t = 1;
                        return e >= d.MILLION ? t = d.TEN_MILLIONS : e >= d.TEN_THOUSAND && (t = d.THOUSAND), t
                    }
                    static calcDigits(e) {
                        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                        const i = 2 - Math.ceil(Math.log10(e / t));
                        return Math.max(0, i)
                    }
                    static currencySymbolPosition(e) {
                        return l[e]
                    }
                    static isUnsupportedBrowserError(e, t) {
                        const i = "narrowSymbol" === t.intlOptions.currencyDisplay,
                            n = e.toString() === s.yb;
                        return i && n
                    }
                }
                d.THOUSAND = 1e3, d.TEN_THOUSAND = 1e4, d.HUNDRED_THOUSAND = 1e5, d.MILLION = 1e6, d.TEN_MILLIONS = 1e7;
                class u extends d {
                    constructor(e) {
                        super(), this.currencyDataLoader = e, this.loadFiat()
                    }
                    async loadCrypto() {
                        const e = { ...await this.currencyDataLoader.loadCrypto(),
                            ...this._currenciesData
                        };
                        this.setData(e)
                    }
                    loadFiat() {
                        const e = { ...this.currencyDataLoader.loadFiat(),
                            ...this._currenciesData
                        };
                        this.setData(e)
                    }
                }
            },
            348: (e, t, i) => {
                "use strict";
                i.d(t, {
                    t: () => c
                });
                var n = i(54601);
                const s = JSON.parse('{"GD":1.518,"CH":1.002,"SL":6145.659,"HU":180.67,"TW":13.811,"BB":2.292,"CI":240.968,"TN":1.04,"IT":0.645,"BJ":199.429,"ID":4764.324,"CV":45.652,"KN":1.647,"LA":4300.605,"UG":1348.76,"AD":0.602,"BI":1088.953,"ZA":7.163,"FR":0.728,"LY":1.272,"MX":9.998,"GA":291.061,"MK":19.739,"CN":3.759,"YE":416.043,"SB":7.042,"UZ":3115.457,"EG":7.3,"SN":244.407,"LK":55.699,"BD":32.913,"PE":1.855,"SG":0.891,"TR":10.819,"AF":21.476,"AW":1.244,"GB":0.682,"ZM":7.136,"FI":0.84,"NE":243.4,"GW":201.836,"AZ":0.672,"DJ":96.481,"MU":17.826,"CO":1612.196,"GR":0.54,"HR":0.466,"MA":3.763,"DZ":47.837,"NL":0.797,"SD":685.607,"FJ":0.827,"NP":36.943,"PR":0.86,"GE":0.942,"PK":65.169,"BW":5.349,"LB":949.837,"PG":2.735,"DO":25.147,"QA":2.639,"MG":1273.551,"IN":22.401,"ME":0.395,"SZ":6.589,"PY":2756.047,"SV":0.441,"UA":15.017,"NA":7.61,"AE":2.045,"BG":0.854,"DE":0.749,"KH":1361.159,"IQ":651.136,"SE":8.817,"KG":26.186,"RU":33.76,"MY":1.581,"ST":16.776,"CY":0.587,"CA":1.22,"MW":497.659,"SA":1.762,"BA":0.731,"ET":27.511,"ES":0.607,"SI":0.592,"OM":0.202,"MO":4.725,"SM":0.633,"LS":6.571,"MH":1.063,"IS":156.646,"LU":0.848,"AR":528.72,"NR":1.748,"DM":1.671,"CR":325.707,"AU":1.536,"TH":11.283,"HT":94.465,"TV":1.533,"HN":11.634,"GQ":222.86,"LC":1.931,"BY":0.973,"LV":0.538,"PW":1.003,"PH":19.073,"DK":6.131,"CM":225.324,"GN":4357.8,"BH":0.173,"SR":13.715,"CD":1250.999,"SO":0.376,"CZ":13.796,"VU":145.822,"TG":218.558,"KE":46.406,"RW":395.264,"EE":0.655,"RO":2.096,"TT":4.102,"GY":69.187,"TL":0.386,"VN":7209.154,"UY":30.433,"HK":5.573,"AT":0.791,"AG":2.03,"TM":2.202,"MZ":25.481,"PA":0.432,"FM":1.091,"IE":0.735,"NO":12.091,"CF":291.636,"BF":199.112,"ER":14.319,"TZ":859.187,"KR":765.841,"JO":0.269,"MR":12.024,"LT":0.521,"SK":0.546,"AO":304.472,"KZ":196.208,"MD":7.622,"ML":201.437,"AM":162.622,"WS":1.977,"JP":90.821,"BO":2.575,"CL":475.267,"US":1,"VC":1.428,"SC":7.158,"GT":4.039,"EC":0.453,"TJ":2.413,"MT":0.572,"GM":21.358,"NG":205.316,"BS":0.758,"KW":0.187,"MV":7.335,"SS":1546.212,"IR":115674.041,"AL":41.771,"BR":2.725,"RS":48.235,"BZ":1.267,"MM":554.135,"BT":20.862,"VE":26.701,"LR":0.454,"JM":84.375,"PL":2.029,"BN":0.61,"KM":176.299,"TO":1.875,"KI":1.022,"GH":4.353,"TD":232.671,"ZW":16556.168,"MN":1359.898,"PT":0.571,"CG":311.582,"BE":0.756,"IL":3.527,"NZ":1.477,"NI":12.553}');
                var a = i(93227);
                class o {
                    constructor(e, t) {
                        this.rates = e, this.sentry = t
                    }
                    getDigits(e) {
                        return this.currencyData[e] ? this.currencyData[e].digits : 2
                    }
                    getRate(e) {
                        return this.rates[e] || 1
                    }
                    setData(e, t, i) {
                        this._currencyData = e, t && (this._countriesData = t), i && (this._pppexData = i)
                    }
                    convertBase(e, t, i) {
                        let n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                            s = arguments.length > 4 ? arguments[4] : void 0;
                        if (!Number.isInteger(e)) {
                            var o;
                            const e = new Error("amount should be a finite number");
                            return null === (o = this.sentry) || void 0 === o || o.captureException(e), console.error(e), 0
                        }
                        if (0 === e) return 0;
                        if (t === i) return e;
                        const r = this.currencyData[t].type === a.Z.FIAT,
                            c = this.currencyData[i].type === a.Z.FIAT,
                            l = this.getDigits(t),
                            d = this.getDigits(i),
                            u = this.calcRate(t, i, r, c);
                        return n && s && r && c && (e = this.toAiAmount(e, s)), Math.ceil(e / Math.pow(10, l) * u * Math.pow(10, d))
                    }
                    calcRate(e, t, i, n) {
                        let s;
                        const a = this.getRate(e),
                            o = this.getRate(t);
                        return s = i && n ? o / a : i && !n ? 1 / (a * o) : !i && n ? a * o : a / o, s
                    }
                    toAiAmount(e, t) {
                        const i = this.pppexData[t] || 1,
                            n = this.rates[this.getCountryCurrency(t)] || 1;
                        return 1 === i || 1 === n ? e : e * i / n
                    }
                    getCountryCurrency(e) {
                        return this.countriesData[e] ? this.countriesData[e][0] : "USD"
                    }
                    get currencyData() {
                        if (!this._currencyData) throw new Error("Currency data was not set");
                        return this._currencyData
                    }
                    get countriesData() {
                        if (!this._countriesData) throw new Error("Countries data was not set");
                        return this._countriesData
                    }
                    get pppexData() {
                        if (!this._pppexData) throw new Error("Pppex data was not set");
                        return this._pppexData
                    }
                }
                class r extends o {
                    getCryptoCurrency(e) {
                        const t = this.currencyData[e];
                        if (!t) throw new Error(`Currency ${e} was not found`);
                        if (t.type !== a.Z.CRYPTO) throw new Error(`Currency ${e} is not a crypto`);
                        return t
                    }
                    getSymbol(e) {
                        return this.currencyData[e] ? this.currencyData[e].symbol : ""
                    }
                    getName(e) {
                        return this.currencyData[e] ? this.currencyData[e].name : ""
                    }
                    getRate(e) {
                        return this.rates[e] || 1
                    }
                    convert(e, t, i) {
                        let n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                            s = arguments.length > 4 ? arguments[4] : void 0;
                        return this.convertBase(e, t, i, n, s)
                    }
                    round(e) {
                        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2;
                        const i = Math.ceil(Math.log10(e + 1)) - t,
                            n = 5 * Math.pow(10, Math.max(i - 3, 0) + t);
                        return Math.ceil(e / n) * n
                    }
                    toFloatUnformattedStr(e, t) {
                        let i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 2;
                        const n = this.getDigits(t);
                        return (e / Math.pow(10, n)).toFixed(i)
                    }
                    toFloat(e, t) {
                        const i = this.getDigits(t);
                        return e / Math.pow(10, i)
                    }
                    fromFloat(e, t) {
                        const i = this.getDigits(t);
                        return Math.round(e * Math.pow(10, i))
                    }
                    ceil(e, t) {
                        return this.fromFloat(Math.ceil(this.toFloat(e, t)), t)
                    }
                    getMinAmount(e) {
                        return this.convert(70, "USD", e)
                    }
                    toInt(e, t) {
                        if (!Number.isFinite(e)) throw new Error("amount should be a finite number");
                        const i = this.getDigits(t);
                        return e * Math.pow(10, i)
                    }
                    getCurrencyCodesBySource(e) {
                        return Object.keys(this.currencyData).filter((t => this.currencyData[t].sources.includes(e)))
                    }
                    isCrypto(e) {
                        return this.currencyData[e].type === a.Z.CRYPTO
                    }
                }
                class c extends r {
                    constructor(e, t, i) {
                        super(t, i), this.currencyDataLoader = e, this.rates = t, this.sentry = i
                    }
                    loadFiat(e) {
                        const t = this.currencyDataLoader.loadFiat(e),
                            i = n,
                            a = s,
                            o = { ...t,
                                ...this._currencyData
                            };
                        this.setData(o, i, a)
                    }
                    async loadCrypto() {
                        const e = { ...await this.currencyDataLoader.loadCrypto(),
                            ...this._currencyData
                        };
                        this.setData(e)
                    }
                    convertFeeCurrency(e, t, i, n) {
                        const s = Math.abs(n || 1);
                        return this.convertBase(e, t, i) * s
                    }
                }
            },
            39392: (e, t, i) => {
                "use strict";
                i.d(t, {
                    $: () => a
                });
                var n = i(93227),
                    s = i(52177);
                class a {
                    loadFiat(e) {
                        const t = s;
                        return a.formatFiatCurrencies(t, e)
                    }
                    async loadCrypto() {
                        const e = await this.getCryptoCurrencies();
                        return a.formatCryptoCurrencies(e)
                    }
                    static formatFiatCurrencies(e, t) {
                        t || (t = {
                            translate: () => null
                        });
                        const i = {};
                        for (const s in e) {
                            const a = e[s];
                            i[s] = {
                                name: t.translate(`currencies.${s}`) || a.name,
                                code: s,
                                symbol: a.symbol,
                                digits: a.digits,
                                type: n.Z.FIAT,
                                sources: [n.Z.FIAT]
                            }
                        }
                        return i
                    }
                    static formatCryptoCurrencies(e) {
                        const t = {};
                        for (const i in e) {
                            const s = e[i];
                            t[i] = {
                                name: s.name,
                                code: i,
                                symbol: s.symbol,
                                digits: s.digits,
                                protocol: s.protocol,
                                networkName: s.networkName,
                                network: s.network,
                                provider: s.provider,
                                type: n.Z.CRYPTO,
                                sources: s.provider
                            }
                        }
                        return t
                    }
                }
            },
            45741: (e, t, i) => {
                "use strict";
                i.d(t, {
                    m: () => s
                });
                var n = i(39392);
                class s extends n.$ {
                    async getCryptoCurrencies() {
                        return (await i.e(1842).then(i.t.bind(i, 472, 19))).default
                    }
                }
            },
            71267: (e, t, i) => {
                "use strict";
                i.d(t, {
                    Uk: () => a,
                    lt: () => n,
                    yb: () => s
                });
                const n = 2,
                    s = 'RangeError: currencyDisplay must be either "code", "symbol", or "name"',
                    a = "symbol"
            },
            87148: (e, t, i) => {
                "use strict";
                i.d(t, {
                    F: () => n,
                    f: () => s
                });
                const n = ["GBP"];

                function s(e) {
                    return n.includes(e)
                }
            },
            93227: (e, t, i) => {
                "use strict";
                var n;
                i.d(t, {
                        Z: () => n
                    }),
                    function(e) {
                        e.FIAT = "fiat", e.CRYPTO = "crypto"
                    }(n || (n = {}))
            },
            79655: (e, t, i) => {
                "use strict";
                i.d(t, {
                    y: () => a
                });
                var n = i(36416),
                    s = i(24419);
                class a {
                    constructor(e) {
                        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                        this.codes = t, this.expose = (0, s._)(), this.prefix = e
                    }
                    createInstance(e) {
                        return new a(e, this.codes)
                    }
                    stringToColor(e) {
                        const t = (0, n.A)(e);
                        let i = "#";
                        for (let e = 0; e < 3; e++) i += ("00" + (t >> 8 * e & 255).toString(16)).substr(-2);
                        return i
                    }
                    log(e) {
                        if (this.expose) {
                            e = this.prefix ? `${this.prefix}:${e}` : e, console.groupCollapsed("%c" + (new Date).toISOString().slice(11, -1) + " %c" + e, "color:grey;", "font-weight:700;color:white;border-radius: 2px;padding:2px 5px;background-color:" + this.stringToColor(e));
                            for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) i[n - 1] = arguments[n];
                            console.log(...i), console.groupEnd(), this.push(e, ...i)
                        }
                    }
                    logCode(e) {
                        const t = this.codes ? this.codes[e] : String(e);
                        for (var i = arguments.length, n = new Array(i > 1 ? i - 1 : 0), s = 1; s < i; s++) n[s - 1] = arguments[s];
                        const a = n.map((e => "number" != typeof e ? e : this.codes && this.codes[e] || e));
                        this.log(t, ...a)
                    }
                    isExpose() {
                        return this.expose
                    }
                    push(e) {
                        const t = window;
                        if (Array.isArray(t.FUN_DEBUG_LOGS)) {
                            for (var i = arguments.length, n = new Array(i > 1 ? i - 1 : 0), s = 1; s < i; s++) n[s - 1] = arguments[s];
                            t.FUN_DEBUG_LOGS.push({
                                name: e,
                                content: n
                            })
                        }
                    }
                }
            },
            24419: (e, t, i) => {
                "use strict";
                i.d(t, {
                    _: () => a
                });
                var n = i(81617),
                    s = i(3478);
                const a = () => void 0 !== s.A.get(n.e.DEBUG)
            },
            17455: (e, t, i) => {
                "use strict";
                i.d(t, {
                    Ru: () => a,
                    UA: () => s,
                    Ws: () => c,
                    XU: () => d,
                    cH: () => o,
                    dy: () => r,
                    i: () => l
                });
                const n = /#(.+?)(&|$)/;

                function s(e) {
                    let t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    if (!e) return {};
                    const i = /([^=&#?]+)=([^=&#?]+)/gi,
                        n = {};
                    for (;;) {
                        const s = i.exec(e);
                        if (!s) break;
                        const [, a, o] = s;
                        try {
                            t ? n[decodeURIComponent(a)] = decodeURIComponent(o) : n[a] = o
                        } catch (e) {
                            console.error(e)
                        }
                    }
                    return n
                }

                function a(e, t) {
                    let i = e;
                    for (;;) {
                        if (t(i)) return i;
                        if (!i.parentNode) return;
                        i = i.parentNode
                    }
                }

                function o(e, t) {
                    if (e.getAttribute) return e.getAttribute("data-" + t) || void 0
                }

                function r(e) {
                    if (!e) return null;
                    if (!n.test(e)) return null;
                    const t = /(#.+?)$/.exec(e);
                    if (!t) return null;
                    const i = t[0],
                        a = n.exec(i);
                    if (!a) return null;
                    const o = a[1],
                        r = s(i),
                        c = {
                            key: o
                        };
                    return Object.assign(c, r), c
                }

                function c() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    const i = [];
                    for (const n in e) {
                        const s = e[n];
                        t ? i.push(`${encodeURIComponent(n)}=${encodeURIComponent(s)}`) : i.push(`${n}=${s}`)
                    }
                    return i.join("&")
                }

                function l(e) {
                    const t = [];
                    for (const [i, n] of e) t.push(`${encodeURIComponent(i)}=${encodeURIComponent(n)}`);
                    return t.join("&")
                }

                function d(e, t) {
                    const i = e.storage;
                    let n = 0;
                    const s = i.getField("xFactor");
                    if (s) return Number(s) || 0;
                    if (!e.sessionAt) return n;
                    try {
                        const i = Date.now(),
                            s = e.sessionPage,
                            a = i - e.sessionAt;
                        t && (n += 10), /win/i.test(window.navigator.platform) && (n -= 10), /mac/i.test(window.navigator.platform) && (n += 5), a > 648e4 && (n += 10), s <= 2 && (n += 15), s > 5 && (n += 5), a < 6e3 && (n += 5), a >= 18e3 && (n += 10)
                    } catch (e) {
                        n = 0, console.error(e)
                    }
                    return n && i.setField("xFactor", String(n)), n
                }
            },
            44313: (e, t, i) => {
                "use strict";
                i.d(t, {
                    Cf: () => n,
                    HP: () => s
                });
                class n extends Error {
                    constructor(e) {
                        super(e), this.name = this.constructor.name
                    }
                }
                class s extends n {
                    constructor(e, t) {
                        super(t ? `Unreachable statement: ${e} [${t}]` : `Unreachable statement: ${e}`)
                    }
                }
            },
            72115: (e, t, i) => {
                "use strict";

                function n(e) {
                    return Array.from(new Set(e))
                }
                i.d(t, {
                    P: () => s
                });
                class s {
                    constructor(e) {
                        this.currencyService = e
                    }
                    guessedCurrenciesList(e, t) {
                        const i = e.countryCurrencies[0],
                            s = e.stripe.default,
                            a = e.countryCurrencies.slice(1),
                            o = e.langCurrencies,
                            r = e.stripe.list;
                        return n([t, i, ...s, ...a, ...o].filter((e => r.includes(e))))
                    }
                    unsafeGuessedCurrenciesList(e, t) {
                        return n([t, e.countryCurrencies[0], ...e.countryCurrencies.slice(1), ...e.langCurrencies])
                    }
                    guessedCurrency(e) {
                        const t = e.currencies.countryCurrencies,
                            i = this.guessedCurrenciesList(e.currencies, e.defaultCurrency);
                        return !e.showcase && e.guessCurrency && e.isCurrencyEnabled && t.length && i.includes(t[0]) ? t[0] : e.defaultCurrency || "USD"
                    }
                    unsafeGuessedCurrency(e) {
                        const t = e.currencies.countryCurrencies,
                            i = this.unsafeGuessedCurrenciesList(e.currencies, e.defaultCurrency);
                        return !e.showcase && e.guessCurrency && t.length && i.includes(t[0]) ? t[0] : e.defaultCurrency || "USD"
                    }
                    getMinInWidgetCurrency(e) {
                        return this.currencyService.convert(70, "USD", e)
                    }
                }
            },
            92488: (e, t, i) => {
                "use strict";

                function n() {
                    try {
                        Intl.NumberFormat("fr-FR", {
                            style: "currency",
                            currency: "VND",
                            currencyDisplay: "narrowSymbol",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                        }).format(8e3)
                    } catch {
                        return !1
                    }
                    return !0
                }
                i.d(t, {
                    N: () => n
                })
            },
            24100: (e, t, i) => {
                "use strict";
                i.d(t, {
                    r: () => s
                });
                var n = i(28922);

                function s(e, t) {
                    const i = window.crypto || window.msCrypto;
                    if (i && "function" == typeof i.getRandomValues) {
                        const n = new Uint32Array(1);
                        i.getRandomValues(n);
                        const s = e + n[0] / 4294967295 * (t - e);
                        return Math.floor(s)
                    }
                    return (0, n.N)(e, t)
                }
            },
            28922: (e, t, i) => {
                "use strict";

                function n(e, t) {
                    return Math.floor(Math.random() * (t - e + 1)) + e
                }
                i.d(t, {
                    N: () => n
                })
            },
            65936: (e, t, i) => {
                "use strict";

                function n(e, t) {
                    if (e.body) return t();
                    setTimeout(n.bind(null, e, t), 10)
                }

                function s(e) {
                    return new Promise((t => {
                        setTimeout(t, e)
                    }))
                }
                async function a(e, t) {
                    return !!e.fonts && new Promise((i => e.fonts.load(t).finally((() => {
                        i(!0)
                    }))))
                }
                i.d(t, {
                    We: () => a,
                    c7: () => n,
                    uk: () => s
                })
            },
            27457: (e, t, i) => {
                "use strict";
                i.d(t, {
                    E: () => n
                });
                class n {
                    constructor(e, t) {
                        this._locale = e, this.commonCurrencyFilter = t, this.formatCurrency = t.formatCurrency.bind(t), this.formatSymbol = t.formatSymbol.bind(t), this.getCurrencyFormat = t.getCurrencyFormat.bind(t)
                    }
                    get locale() {
                        return this._locale
                    }
                    set locale(e) {
                        this._locale = e
                    }
                    changeLocale(e) {
                        return this.locale = e, this.locale
                    }
                    format(e, t) {
                        return this.formatCurrency(e, null == t ? void 0 : t.currency, null == t ? void 0 : t.display, null == t ? void 0 : t.withoutPrefix, null == t ? void 0 : t.withoutSuffix, this.locale, null == t ? void 0 : t.displayCurrency)
                    }
                    formatCurrencySymbol(e, t) {
                        return this.formatSymbol(e, t, this.locale)
                    }
                    getFormat() {
                        return this.getCurrencyFormat(this.locale)
                    }
                }
            },
            36787: (e, t, i) => {
                "use strict";
                var n;
                i.d(t, {
                        I: () => n
                    }),
                    function(e) {
                        e.PREFIX = "prefix", e.POSTFIX = "postfix"
                    }(n || (n = {}))
            },
            70343: (e, t, i) => {
                "use strict";
                i.d(t, {
                    O: () => o
                });
                var n = i(10961),
                    s = i(63312),
                    a = i(7274);
                class o {
                    constructor(e, t, i, n, s, a, r) {
                        this.translationService = e, this.dateFormatter = t, this.currencyFormatter = i, this.numberFormatter = n, this.company = s, this.donateToPayTokens = a, this._locale = o.DEFAULT_LOCALE, this.availableLocales = r.availableLocales, this.locale = r.locale, this.company = s, this.donateToPayTokens = a, this.dateFormatter.intl = this
                    }
                    static isLocaleCode(e) {
                        return void 0 !== e && n.O.includes(e)
                    }
                    get locale() {
                        return this._locale
                    }
                    set locale(e) {
                        this.isLocaleAvailable(e) ? this._locale = e : this._locale = o.DEFAULT_LOCALE
                    }
                    get language() {
                        return this.locale.split("-")[0]
                    }
                    setLocale(e) {
                        const t = this.locale;
                        this.locale = e;
                        const i = [this.translationService.changeLocale(this.locale)];
                        return Promise.all(i).then((() => this.locale)).catch((e => (this.locale = t, Promise.reject(e)))).finally((() => {
                            this.dateFormatter.changeLocale(this.locale), this.currencyFormatter.changeLocale(this.locale), this.numberFormatter.changeLocale(this.locale)
                        }))
                    }
                    translate(e, t) {
                        const i = (0, s.ZD)(this.translationService.translate(e, t));
                        return this.replaceDonateToPay(e, i)
                    }
                    formatDate(e, t) {
                        return this.dateFormatter.format(e, t)
                    }
                    formatCurrency(e, t) {
                        return this.currencyFormatter.format(e, t)
                    }
                    formatSymbol(e, t) {
                        return this.currencyFormatter.formatCurrencySymbol(e, t)
                    }
                    formatNumber(e, t) {
                        return this.numberFormatter.format(e, t)
                    }
                    isLocaleAvailable(e) {
                        return this.availableLocales.some((t => t === e))
                    }
                    replaceDonateToPay(e, t) {
                        if ("AFJCHFEK" === this.company && this.locale === a.D.EN_US && this.donateToPayTokens.includes(e)) {
                            const e = {
                                donation: "payment",
                                Donation: "Payment",
                                Donate: "Pay",
                                donate: "pay",
                                donating: "paying"
                            };
                            return t.replace(/donation|Donation|Donate|donate|donating/g, (t => e[t]))
                        }
                        return t
                    }
                    getCurrencyFormat() {
                        return this.currencyFormatter.getFormat()
                    }
                }
                o.DEFAULT_LOCALE = a.D.EN_US
            },
            2195: (e, t, i) => {
                "use strict";
                i.d(t, {
                    C: () => a
                });
                var n = i(27601),
                    s = i.n(n);
                class a {
                    constructor(e) {
                        this.currencyService = e, this.numbers = this.generateNumbers()
                    }
                    beautify(e, t, i) {
                        const n = Array.isArray(e);
                        let a = s()(e).map((e => this.currencyService.toFloat(e, t)));
                        const o = this.sortAsc(a);
                        a = o.list;
                        const r = o.positions;
                        let c = this.findNearestPosition(a[0], 0, this.numbers.length - a.length);
                        if (i) {
                            const e = this.currencyService.toFloat(i, t),
                                n = this.numbers[this.numbers.length - 1];
                            for (; e && this.numbers[c] < e && e < n;) c++
                        }
                        const l = this.getPositionsArray(c, a.length);
                        for (let e = l.length - 1; e > 0; e--) {
                            const t = this.findNearestPosition(a[e], l[e - 1] + 1, l[e + 1] - 1);
                            l[e] = t || l[e]
                        }
                        return a = this.restoreSort(l.map((e => this.numbers[e])), r).map((e => this.currencyService.fromFloat(e, t))), n ? a : a[0]
                    }
                    generateNumbers() {
                        const e = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 100, 120, 130, 140, 150, 160, 170, 180, 190, 200, 250, 300, 350, 400, 450, 500, 600, 650, 700, 750, 800, 900],
                            t = [10, 12, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90];
                        for (let i = 100; i < 1e7; i *= 10) t.forEach((t => e.push(t * i)));
                        return e
                    }
                    sortAsc(e) {
                        let t = 0;
                        const i = e.map((e => ({
                            val: e,
                            pos: t++
                        }))).sort(((e, t) => e.val - t.val));
                        return {
                            list: i.map((e => e.val)),
                            positions: i.map((e => e.pos))
                        }
                    }
                    restoreSort(e, t) {
                        let i = 0;
                        return t.map((t => ({
                            pos: t,
                            val: e[i++]
                        }))).sort(((e, t) => e.pos - t.pos)).map((e => e.val))
                    }
                    findNearestPosition(e, t, i) {
                        if (t = t || 0, i = i || this.numbers.length - 1, e >= this.numbers[i]) return i;
                        for (let n = i; n > t; n--)
                            if (this.numbers[n - 1] <= e && e <= this.numbers[n]) return e - this.numbers[n - 1] >= this.numbers[n] - e ? n : n - 1;
                        return 0
                    }
                    getPositionsArray(e, t) {
                        const i = [];
                        for (let n = e; n < e + t; n++) i.push(n);
                        return i
                    }
                }
            },
            86994: (e, t, i) => {
                "use strict";

                function n(e, t) {
                    let i = !1;
                    return n => {
                        i || (e(n), i = !0, setTimeout((() => {
                            i = !1
                        }), t))
                    }
                }
                i.d(t, {
                    n: () => n
                })
            },
            82385: (e, t, i) => {
                "use strict";
                i.d(t, {
                    A: () => n
                });
                const n = e => {
                    var t, i, n;
                    return "string" == typeof(null === (t = e.navigator) || void 0 === t ? void 0 : t.userAgent) && !(null === (i = e.navigator) || void 0 === i || null === (n = i.userAgent) || void 0 === n || !n.match("CriOS"))
                }
            },
            538: (e, t, i) => {
                "use strict";
                i.d(t, {
                    MS: () => a
                });
                const n = 36e5,
                    s = 24 * n,
                    a = {
                        SECOND: 1e3,
                        MINUTE: 6e4,
                        HOUR: n,
                        DAY: s,
                        YEAR: 365 * s
                    }
            },
            39752: (e, t, i) => {
                "use strict";
                i.d(t, {
                    Cf: () => a,
                    gr: () => n,
                    m$: () => o,
                    oF: () => s,
                    qG: () => r
                });
                const n = "_lang",
                    s = "_fundraiseup_country",
                    a = "fundraiseupLivemode",
                    o = "fundraiseupDebug",
                    r = "fundraiseupABTestDebug"
            },
            5541: (e, t, i) => {
                "use strict";
                var n;
                i.d(t, {
                        F: () => n
                    }),
                    function(e) {
                        e.TOP = "top", e.BOTTOM = "bottom", e.BEFORE_CONTENT = "beforeContent"
                    }(n || (n = {}))
            },
            54702: (e, t, i) => {
                "use strict";
                var n;
                i.d(t, {
                        a: () => n
                    }),
                    function(e) {
                        e.REMINDER = "reminder", e.DONATE_BUTTON = "donateButton", e.STICKY_BUTTON = "stickyButton", e.IMAGE_CARD = "imageCard", e.TEXT_LINK = "textLink", e.DONATION_FORM = "donationForm", e.SIMPLE_FORM = "simpleForm", e.GOAL_METER = "goalMeter", e.STAT_COUNTER = "statCounter", e.IMPACT_SLIDER = "impactSlider", e.DONATION_LEVELS = "donationLevels", e.BUTTON_GROUP = "buttonGroup", e.FLOATING_BUTTON = "floatingButton", e.MESSAGE_BAR = "messageBar", e.TOP_SUPPORTERS = "topSupporters", e.TOP_LOCATIONS = "topLocations", e.SOCIAL_PROOF = "socialProof", e.QR_CODE = "qrCode", e.RECENT_DONATIONS = "recentDonations", e.P2P_BUTTON = "p2pButton", e.P2P_LINK = "p2pLink", e.TOP_FUNDRAISERS = "topFundraisers", e.DONOR_MAP = "donorMap", e.LIGHTBOX = "lightbox", e.FUNDRAISING_PAGE_LINK = "fundraisingPageLink", e.FUNDRAISING_PAGE_INVITE_LINK = "fundraisingPageInviteLink", e.LINK = "link", e.DIRECT_LINK = "direct", e.DEBUG_PANEL = "debugPanel", e.TEST_MODE_PANEL = "testModePanel", e.SPLIT_TESTING = "splitTesting", e.JS_API = "jsApi"
                    }(n || (n = {}))
            },
            53245: (e, t, i) => {
                "use strict";
                i.d(t, {
                    gD: () => E,
                    X$: () => d,
                    CH: () => m,
                    qy: () => u,
                    yJ: () => c
                });
                var n = i(54702);
                const s = [n.a.FUNDRAISING_PAGE_LINK, n.a.FUNDRAISING_PAGE_INVITE_LINK, n.a.LINK, n.a.DIRECT_LINK, n.a.DEBUG_PANEL, n.a.TEST_MODE_PANEL, n.a.SPLIT_TESTING, n.a.JS_API];
                var a;
                n.a.STICKY_BUTTON, n.a.MESSAGE_BAR, n.a.LIGHTBOX,
                    function(e) {
                        e.ALL = "all", e.DESKTOP_ONLY = "desktopOnly", e.MOBILE_ONLY = "mobileOnly"
                    }(a || (a = {})), n.a.P2P_LINK, n.a.TEXT_LINK, n.a.QR_CODE;
                const o = [n.a.DONATE_BUTTON, n.a.STICKY_BUTTON, n.a.IMAGE_CARD, n.a.DONATION_FORM, n.a.SIMPLE_FORM, n.a.GOAL_METER, n.a.IMPACT_SLIDER, n.a.DONATION_LEVELS, n.a.BUTTON_GROUP, n.a.MESSAGE_BAR, n.a.TOP_SUPPORTERS, n.a.TOP_LOCATIONS, n.a.SOCIAL_PROOF, n.a.RECENT_DONATIONS, n.a.P2P_BUTTON, n.a.P2P_LINK, n.a.TOP_FUNDRAISERS, n.a.LIGHTBOX],
                    r = [n.a.REMINDER, n.a.STICKY_BUTTON, n.a.SOCIAL_PROOF, n.a.MESSAGE_BAR, n.a.FLOATING_BUTTON, n.a.LIGHTBOX];

                function c(e) {
                    return -1 !== o.indexOf(e)
                }
                n.a.SOCIAL_PROOF, n.a.TOP_FUNDRAISERS, n.a.TOP_SUPPORTERS, n.a.TOP_LOCATIONS, n.a.RECENT_DONATIONS, n.a.GOAL_METER, n.a.STAT_COUNTER, n.a.REMINDER, n.a.SOCIAL_PROOF, n.a.DONATE_BUTTON, n.a.DONATION_FORM, n.a.SIMPLE_FORM, n.a.STICKY_BUTTON, n.a.REMINDER, n.a.IMAGE_CARD, n.a.TEXT_LINK, n.a.BUTTON_GROUP, n.a.GOAL_METER, n.a.STAT_COUNTER, n.a.IMPACT_SLIDER, n.a.P2P_BUTTON, n.a.P2P_LINK, n.a.TOP_FUNDRAISERS, n.a.TOP_SUPPORTERS, n.a.TOP_LOCATIONS, n.a.QR_CODE, n.a.SOCIAL_PROOF, n.a.RECENT_DONATIONS, n.a.DONATION_LEVELS, n.a.MESSAGE_BAR, n.a.DONOR_MAP, n.a.LIGHTBOX, n.a.REMINDER, n.a.DONATE_BUTTON, n.a.STICKY_BUTTON, n.a.IMAGE_CARD, n.a.TEXT_LINK, n.a.DONATION_FORM, n.a.SIMPLE_FORM, n.a.GOAL_METER, n.a.STAT_COUNTER, n.a.IMPACT_SLIDER, n.a.DONATION_LEVELS, n.a.BUTTON_GROUP, n.a.FLOATING_BUTTON, n.a.MESSAGE_BAR, n.a.TOP_SUPPORTERS, n.a.TOP_LOCATIONS, n.a.SOCIAL_PROOF, n.a.QR_CODE, n.a.RECENT_DONATIONS, n.a.P2P_BUTTON, n.a.P2P_LINK, n.a.TOP_FUNDRAISERS, n.a.DONOR_MAP, n.a.LIGHTBOX, n.a.FUNDRAISING_PAGE_LINK, n.a.FUNDRAISING_PAGE_INVITE_LINK, n.a.LINK, n.a.DIRECT_LINK, n.a.DEBUG_PANEL, n.a.TEST_MODE_PANEL, n.a.SPLIT_TESTING, n.a.JS_API;
                const l = [n.a.DONATION_FORM, n.a.SIMPLE_FORM, n.a.IMPACT_SLIDER, n.a.BUTTON_GROUP, n.a.TEXT_LINK, n.a.IMAGE_CARD, n.a.DONATE_BUTTON, n.a.STICKY_BUTTON, n.a.P2P_BUTTON, n.a.P2P_LINK, n.a.QR_CODE, n.a.LIGHTBOX, n.a.DONATION_LEVELS, n.a.MESSAGE_BAR];

                function d(e, t) {
                    return l.includes(e)
                }

                function u(e) {
                    return !!e.localization
                }

                function m(e) {
                    return r.includes(e)
                }

                function E(e) {
                    return e !== n.a.TEXT_LINK && e !== n.a.P2P_LINK && !s.includes(e)
                }
            },
            63821: (e, t, i) => {
                "use strict";
                var n, s, a, o, r, c, l, d, u, m, E, h, _, T, A, D, g, R, p, N, f, S, I, C, b, y, O, P, L, U, F, M, v, w, B, G, K, H, k, x, Y, V, W, Z, X, J, $, j, z, Q, q;
                i.d(t, {
                        hY: () => F,
                        Jy: () => W,
                        tg: () => v,
                        VN: () => G
                    }),
                    function(e) {
                        e.DEFAULT_YES = "defaultYes", e.DEFAULT_NO = "defaultNo", e.ONLY_YES = "onlyYes", e.ONLY_NO = "onlyNo", e.SMART_COVERING = "smartCovering"
                    }(n || (n = {})),
                    function(e) {
                        e.ACH_VERIFICATION_REQUIRED = "ach_verification_required", e.INCOMPLETE = "incomplete", e.RETRYING = "retrying", e.WAITING_FOR_TRANSFER = "waiting_for_transfer", e.PAYPAL_ACTION_REQUIRED = "paypal_action_required", e.SCHEDULED = "scheduled", e.DISPUTE_LOST = "dispute_lost", e.ACCOUNT_CLOSED = "account_closed", e.ACCOUNT_FROZEN = "account_frozen", e.AUTHENTICATION_REQUIRED = "authentication_required", e.BANK_ACCOUNT_RESTRICTED = "bank_account_restricted", e.CARD_DECLINED = "card_declined", e.CREDIT_CARD_ACTION_REQUIRED = "credit_card_action_required", e.DEBIT_NOT_AUTHORIZED = "debit_not_authorized", e.EXPIRED_CARD = "expired_card", e.INCORRECT_CVC = "incorrect_cvc", e.INCORRECT_NUMBER = "incorrect_number", e.INCORRECT_ZIP = "incorrect_zip", e.INSUFFICIENT_FUNDS = "insufficient_funds", e.INVALID_ACCOUNT_NUMBER = "invalid_account_number", e.NO_ACCOUNT = "no_account", e.PARAMETER_INVALID_INTEGER = "parameter_invalid_integer", e.PROCESSING_ERROR = "processing_error", e.RESOURCE_MISSING = "resource_missing", e.ACH_VERIFICATION_FAILED = "ach_verification_failed", e.ACH_VERIFICATION_EXPIRED = "ach_verification_expired", e.FUN_VERIFICATION_CANCEL = "fun_verification_cancel", e.SUBSCRIPTION_CANCELLED_BY_COMPANY = "subscription_cancelled_by_company", e.SUBSCRIPTION_CANCELLED_BY_CUSTOMER = "subscription_cancelled_by_customer", e.SUBSCRIPTION_SKIPPED_BY_COMPANY = "subscription_skipped_by_company", e.SUBSCRIPTION_SKIPPED_BY_CUSTOMER = "subscription_skipped_by_customer", e.PAYMENT_METHOD_INVALIDATED = "payment_method_invalidated", e.FAILED_BY_TERMINATION_FLOW = "failed_by_termination_flow", e.NOT_ELIGIBLE = "not_eligible", e.UNKNOWN_REASON = "unknown_reason", e.CANCELLED_BY_CUSTOMER = "cancelled_by_customer", e.CANCELLED_BY_COMPANY = "cancelled_by_company"
                    }(s || (s = {})),
                    function(e) {
                        e.CARD = "creditCard", e.APPLE_PAY = "applePay", e.GOOGLE_PAY = "googlePay", e.CLICK_TO_PAY = "clickToPay", e.ACH = "ach", e.PLAID = "plaid", e.PAYPAL = "paypal", e.VENMO = "venmo", e.AU_BECS = "auBecsDebit", e.UK_BACS = "ukBacs", e.ACSS = "acss", e.SEPA = "sepa", e.IDEAL = "ideal", e.CRYPTO = "crypto", e.STOCK = "stock", e.US_BANK_ACCOUNT = "usBankAccount"
                    }(a || (a = {})),
                    function(e) {
                        e.BITCOIN = "bitcoin", e.ETHEREUM = "ethereum", e.BITCOINCASH = "bitcoincash", e.LITECOIN = "litecoin", e.ZCASH = "zcash", e.FILECOIN = "filecoin", e.DOGECOIN = "dogecoin", e.TEZOS = "tezos", e.SOLANA = "solana", e.POLKADOT = "polkadot"
                    }(o || (o = {})),
                    function(e) {
                        e.PENDING = "pending", e.FAILED = "failed", e.SUCCESS = "success", e.REFUNDED = "refunded"
                    }(r || (r = {})),
                    function(e) {
                        e.FAIL = "fail", e.FAIL_NOT_ELIGIBLE = "fail_not_eligible", e.WAIT_FOR_TRANSFER = "wait_for_transfer", e.SUCCEED = "succeed"
                    }(c || (c = {})),
                    function(e) {
                        e.PENDING = "pending", e.SUCCESS = "success", e.FAILED = "failed"
                    }(l || (l = {})),
                    function(e) {
                        e.ACH = "ach", e.GOOGLE_PAY = "android_pay", e.APPLE_PAY = "apple_pay", e.CLICK_TO_PAY = "masterpass", e.PLAID = "plaid"
                    }(d || (d = {})),
                    function(e) {
                        e.CARD = "card", e.BANK_ACCOUNT = "bank_account", e.PAYPAL = "paypal", e.VENMO = "venmo", e.SOURCE = "source", e.AU_BECS = "au_becs_debit", e.UK_BACS = "bacs_debit", e.ACSS = "acss_debit", e.SEPA = "sepa_debit", e.IDEAL = "ideal", e.CRYPTO = "crypto", e.STOCK = "stock", e.US_BANK_ACCOUNT = "us_bank_account"
                    }(u || (u = {})),
                    function(e) {
                        e.CHARGEABLE = "chargeable", e.NEW = "new", e.VERIFICATION_FAILED = "verification_failed", e.VERIFIED = "verified", e.VALIDATED = "validated", e.ERRORED = "errored"
                    }(m || (m = {})),
                    function(e) {
                        e.STRIPE = "stripe", e.PAYPAL = "paypal", e.MANUAL_BROKERAGE = "manualBrokerage", e.GEMINI = "gemini", e.COINBASE_COMMERCE = "coinbaseCommerce"
                    }(E || (E = {})),
                    function(e) {
                        e.STRIPE_TOKEN = "stripeToken", e.STRIPE_PAYMENT_METHOD = "stripePaymentMethod"
                    }(h || (h = {})),
                    function(e) {
                        e.ACTIVE = "active", e.CANCELLED = "cancelled", e.FAILED = "failed"
                    }(_ || (_ = {})),
                    function(e) {
                        e.RETRYING = "retrying", e.ACH_VERIFICATION_REQUIRED = "ach_verification_required", e.SCHEDULED = "scheduled", e.PAUSED = "paused", e.CANCELLED_BY_COMPANY = "cancelled_by_company", e.CANCELLED_BY_CUSTOMER = "cancelled_by_customer", e.CANCELLED_BY_TERMINATION_FLOW = "cancelled_by_termination_flow", e.CANCELLED_BY_DISPUTE_LOST = "cancelled_by_dispute_lost", e.CANCELLED_BY_LIMIT = "cancelled_by_limit", e.ACH_VERIFICATION_FAILED = "ach_verification_failed", e.ACH_VERIFICATION_EXPIRED = "ach_verification_expired", e.PAYMENT_METHOD_INVALIDATED = "payment_method_invalidated", e.FAILED_BY_INSUFFICIENT = "failed_by_insufficient_data"
                    }(T || (T = {})),
                    function(e) {
                        e.CARD = "card", e.BANK_ACCOUNT = "bank_account", e.US_BANK_ACCOUNT = "us_bank_account", e.AU_BECS = "au_becs_debit", e.UK_BACS = "bacs_debit", e.ACSS = "acss_debit", e.SEPA = "sepa_debit", e.IDEAL = "ideal"
                    }(A || (A = {})),
                    function(e) {
                        e.VISA = "Visa", e.VISA_ELECTRON = "Visa Electron", e.MASTER_CARD = "MasterCard", e.AMERICAN_EXPRESS = "American Express", e.DINERS_CLUB = "Diners Club", e.DISCOVER = "Discover", e.JCB = "JCB", e.UNION_PAY = "UnionPay"
                    }(D || (D = {})),
                    function(e) {
                        e.VISA = "visa", e.AMERICAN_EXPRESS = "amex", e.MASTERCARD = "mastercard", e.DISCOVER = "discover"
                    }(g || (g = {})),
                    function(e) {
                        e[e.STANDARD = 290] = "STANDARD", e[e.NON_PROFIT = 220] = "NON_PROFIT"
                    }(R || (R = {})),
                    function(e) {
                        e[e.AUTO = -1] = "AUTO", e[e.NEVER = 0] = "NEVER", e[e.ONE = 1] = "ONE", e[e.TWO = 2] = "TWO", e[e.THREE = 3] = "THREE", e[e.FOUR = 4] = "FOUR", e[e.FIVE = 5] = "FIVE", e[e.SIX = 6] = "SIX"
                    }(p || (p = {})),
                    function(e) {
                        e.NEW = "new", e.VALIDATED = "validated", e.VERIFIED = "verified", e.FAILED = "verification_failed", e.ERRORED = "errored"
                    }(N || (N = {})),
                    function(e) {
                        e.INDIVIDUAL = "individual", e.COMPANY = "company"
                    }(f || (f = {})),
                    function(e) {
                        e.ACTIVE = "active", e.INACTIVE = "inactive", e.DISABLED = "disabled"
                    }(S || (S = {})),
                    function(e) {
                        e.REQUIRES_ACTION = "requires_action", e.REQUIRES_CONFIRMATION = "requires_confirmation", e.REQUIRES_PAYMENT_METHOD = "requires_payment_method", e.REQUIRES_CAPTURE = "requires_capture", e.PROCESSING = "processing", e.SUCCEEDED = "succeeded", e.CANCELLED = "canceled"
                    }(I || (I = {})),
                    function(e) {
                        e.ACTIVE = "active", e.INACTIVE = "inactive"
                    }(C || (C = {})),
                    function(e) {
                        e.ACH_VERIFICATION_REQUIRED = "ach_verification_required", e.ACH_VERIFICATION_FAILED = "ach_verification_failed", e.ACH_VERIFICATION_CANCELLED = "ach_verification_cancelled", e.ACH_VERIFICATION_EXPIRED = "ach_verification_expired", e.UNKNOWN_ERROR = "unknown_error", e.DEACTIVATED_ON_PROVIDER_SIDE = "deactivated_on_provider_side", e.ACCOUNT_CLOSED = "account_closed", e.ACCOUNT_FROZEN = "account_frozen", e.AUTHENTICATION_REQUIRED = "authentication_required", e.BANK_ACCOUNT_RESTRICTED = "bank_account_restricted", e.CARD_DECLINED = "card_declined", e.DEBIT_NOT_AUTHORIZED = "debit_not_authorized", e.EXPIRED_CARD = "expired_card", e.FUN_VERIFICATION_CANCEL = "fun_verification_cancel", e.FUN_WRONG_PAYMENT_METHOD = "fun_wrong_payment_method", e.INCORRECT_CVC = "incorrect_cvc", e.INCORRECT_NUMBER = "incorrect_number", e.INCORRECT_ZIP = "incorrect_zip", e.INSUFFICIENT_FUNDS = "insufficient_funds", e.INVALID_ACCOUNT_NUMBER = "invalid_account_number", e.NO_ACCOUNT = "no_account", e.PROCESSING_ERROR = "processing_error", e.RESOURCE_MISSING = "resource_missing", e.MANDATE_INACTIVE = "mandate_inactive", e.STRIPE_CUSTOMER_REQUIRED = "stripe_customer_required", e.STRIPE_CUSTOMER_NONE = "stripe_customer_none"
                    }(b || (b = {})),
                    function(e) {
                        e.PAYMENT_METHOD_INVALIDATED = "fun_payment_method_invalidated", e.CHARGE_VERIFICATION_CANCELLED = "fun_verification_cancel", e.PAYMENT_METHOD_VERIFICATION_EXPIRED = "fun_verification_expired", e.PAYMENT_METHOD_VERIFICATION_FAILED = "fun_verification_failed", e.CHARGE_VERIFICATION_CANCELLED_BY_COMPANY = "fun_verification_cancel_by_company", e.CHARGE_VERIFICATION_CANCELLED_BY_SUPPORTER = "fun_verification_cancel_by_supporter", e.PAYMENT_WAS_CANCELLED = "fun_payment_was_cancelled", e.ACCOUNT_WAS_TERMINATED = "fun_account_was_terminated"
                    }(y || (y = {})),
                    function(e) {
                        e.UPDATE_SUBSCRIPTION_CUSTOMER_ADDRESS = "update_subscription_customer_address", e.UPDATE_SUBSCRIPTION_QUESTIONS = "update_subscription_questions", e.UPDATE_SUBSCRIPTION_AMOUNT = "update_subscription_amount", e.UPDATE_SUBSCRIPTION_CUSTOM_FIELDS = "update_subscription_custom_fields", e.UPDATE_SUBSCRIPTION_UTM = "update_subscription_utm", e.UPDATE_SUBSCRIPTION_GOAL = "update_subscription_goal", e.UPDATE_SUBSCRIPTION_LIMITS = "update_subscription_limits", e.UPDATE_SUBSCRIPTION_WIDGET = "update_subscription_widget", e.UPDATE_CHARGE_CUSTOMER_ADDRESS = "update_charge_customer_address", e.UPDATE_CHARGE_RECEIPT = "update_charge_receipt", e.UPDATE_CHARGE_CUSTOM_FIELDS = "update_charge_custom_fields", e.UPDATE_CHARGE_GOAL = "update_charge_goal", e.UPDATE_CHARGE_WIDGET = "update_charge_widget", e.REFUND_APPLICATION_FEE = "refund_application_fee", e.UPDATE_CUSTOMER_NAME = "update_customer_name"
                    }(O || (O = {})),
                    function(e) {
                        e.PAYPAL_ERROR = "PAYPAL_ERROR", e.PAYPAL_REQUEST_ERROR = "PAYPAL_REQUEST_ERROR", e.REFUND_FAILED_INSUFFICIENT_FUNDS = "REFUND_FAILED_INSUFFICIENT_FUNDS", e.TRANSACTION_REFUSED = "TRANSACTION_REFUSED", e.TRANSACTION_ALREADY_REFUNDED = "TRANSACTION_ALREADY_REFUNDED", e.USER_ACCOUNT_RESTRICTED = "USER_ACCOUNT_RESTRICTED", e.INTERNAL = "INTERNAL", e.UNAVAILABLE = "UNAVAILABLE", e.EXECUTE_AGREEMENT_BUYER_NOT_ACCEPTED = "EXECUTE_AGREEMENT_BUYER_NOT_ACCEPTED", e.ORDER_EXPIRED = "ORDER_EXPIRED", e.VALIDATION_ERROR = "VALIDATION_ERROR"
                    }(P || (P = {})),
                    function(e) {
                        let t;
                        ! function(e) {
                            let t, i, n, s, a, o, r;
                            ! function(e) {
                                e.CREATED = "charge.created", e.PENDING = "charge.pending", e.REFUNDED = "charge.refunded", e.FAILED = "charge.failed", e.UPDATED = "charge.updated", e.SUCCESS = "charge.success", e.SUCCESS_EARLY_FRAUD_WARNING = "charge.success_early_fraud_warning", e.PENDING_ACH_VERIFICATION_REQUIRED = "charge.pending_ach_verification_required", e.PENDING_INCOMPLETE = "charge.pending_incomplete", e.PENDING_SCHEDULED = "charge.pending_scheduled", e.PENDING_WAITING_FOR_TRANSFER = "charge.pending_waiting_for_transfer", e.PENDING_PAYPAL_ACTION_REQUIRED = "charge.pending_paypal_action_required", e.PENDING_RETRYING = "charge.pending_retrying", e.PERSONAL_DATA_DELETED = "charge.personal_data_deleted", e.SUCCESS_DISPUTE_CREATED = "charge.success_dispute_created", e.SUCCESS_DISPUTE_LOST = "charge.success_dispute_lost", e.SUCCESS_DISPUTE_WON = "charge.success_dispute_won", e.SUCCESS_DISPUTE_IN_REVIEW = "charge.success_dispute_in_review"
                            }(t = e.EChargeEvent || (e.EChargeEvent = {})),
                            function(e) {
                                e.ACTIVATED = "subscription.activated", e.SCHEDULED = "subscription.scheduled", e.FAILED = "subscription.failed", e.COMPLETED = "subscription.completed", e.CANCELLED = "subscription.cancelled", e.TERMS_UPDATED = "subscription.subscription_terms.updated", e.DETAILS_UPDATED = "subscription.details.updated", e.PAUSED = "subscription.paused", e.RETRYING = "subscription.retrying", e.PERSONAL_DATA_DELETED = "subscription.personal_data_deleted"
                            }(i = e.ESubscriptionEvent || (e.ESubscriptionEvent = {})),
                            function(e) {
                                e.PENDING = "charge_attempt.pending", e.SUCCESS = "charge_attempt.success", e.FAILED = "charge_attempt.failed"
                            }(n = e.EChargeAttemptEvent || (e.EChargeAttemptEvent = {})),
                            function(e) {
                                e.ACTIVATE = "payment_method.active", e.DEACTIVATE = "payment_method.inactive", e.CREATED = "payment_method.created", e.UPDATED = "payment_method.updated", e.PERSONAL_DATA_DELETED = "payment_method.personal_data_deleted"
                            }(s = e.EPaymentMethodEvent || (e.EPaymentMethodEvent = {})),
                            function(e) {
                                e.CREATED = "tribute.created", e.UPDATED = "tribute.updated", e.SHARED = "tribute.shared"
                            }(a = e.ETributeEvent || (e.ETributeEvent = {})),
                            function(e) {
                                e.CREATED = "abandoned_donation.created", e.OPEN = "abandoned_donation.open", e.CANCELLED = "abandoned_donation.cancelled", e.COMPLETED = "abandoned_donation.completed", e.PERSONAL_DATA_DELETED = "abandoned_donation.personal_data_deleted"
                            }(o = e.EAbandonedDonationEvent || (e.EAbandonedDonationEvent = {})),
                            function(e) {
                                e.PERSONAL_DATA_DELETED = "customer.personal_data_deleted", e.CREATED = "customer.created", e.UPDATED = "customer.updated"
                            }(r = e.ECustomerEvent || (e.ECustomerEvent = {}))
                        }(t = e.DomainEvent || (e.DomainEvent = {}))
                    }(L || (L = {})),
                    function(e) {
                        e.IN_HONOR_MEMORY = "inHonorMemory", e.DEDICATION = "dedication"
                    }(U || (U = {})),
                    function(e) {
                        e.DEVELOPMENT = "development", e.PRODUCTION = "production", e.STAGING = "staging", e.TESTING = "testing"
                    }(F || (F = {})),
                    function(e) {
                        e.DONOR_PORTAL = "donorPortal", e.PARTNER_PORTAL = "partnerPortal", e.DASHBOARD = "dashboard"
                    }(M || (M = {})),
                    function(e) {
                        e.AUSTRALIA = "AU", e.AUSTRIA = "AT", e.BELGIUM = "BE", e.BRAZIL = "BR", e.BULGARIA = "BG", e.CANADA = "CA", e.CROATIA = "HR", e.CYPRUS = "CY", e.CZECH_REPUBLIC = "CZ", e.DENMARK = "DK", e.ESTONIA = "EE", e.FINLAND = "FI", e.FRANCE = "FR", e.GERMANY = "DE", e.GREECE = "GR", e.HONG_KONG = "HK", e.HUNGARY = "HU", e.INDIA = "IN", e.INDONESIA = "ID", e.IRELAND = "IE", e.ITALY = "IT", e.JAPAN = "JP", e.LATVIA = "LV", e.LITHUANIA = "LT", e.LUXEMBOURG = "LU", e.MALAYSIA = "MY", e.MALTA = "MT", e.MEXICO = "MX", e.NETHERLANDS = "NL", e.NEW_ZEALAND = "NZ", e.NORWAY = "NO", e.POLAND = "PL", e.PORTUGAL = "PT", e.ROMANIA = "RO", e.SINGAPORE = "SG", e.SLOVAKIA = "SK", e.SLOVENIA = "SI", e.SPAIN = "ES", e.SWEDEN = "SE", e.SWITZERLAND = "CH", e.THAILAND = "TH", e.UNITED_ARAB_EMIRATES = "AE", e.UNITED_KINGDOM = "GB", e.UNITED_STATES = "US", e.GIBRALTAR = "GI", e.LIECHTENSTEIN = "LI", e.PHILIPPINES = "PH", e.ISRAEL = "IL"
                    }(v || (v = {})),
                    function(e) {
                        e.PAN_ONLY = "PAN_ONLY", e.CRYPTOGRAM_3DS = "CRYPTOGRAM_3DS"
                    }(w || (w = {})),
                    function(e) {
                        e.AMEX = "AMEX", e.DISCOVER = "DISCOVER", e.JCB = "JCB", e.MASTERCARD = "MASTERCARD", e.VISA = "VISA"
                    }(B || (B = {})),
                    function(e) {
                        e.DEFAULT_MONTHLY = "defaultMonthly", e.ONLY_MONTHLY = "onlyMonthly", e.DEFAULT_ONETIME = "defaultOnetime", e.ONLY_ONETIME = "onlyOnetime"
                    }(G || (G = {})),
                    function(e) {
                        e.FUNDRAISING_PAGE = "fundraisingPage", e.REDIRECT = "redirect", e.THANK_YOU_SCREEN = "thankYouScreen"
                    }(K || (K = {})),
                    function(e) {
                        e.NONE = "none", e.GENERAL = "general", e.CUSTOMIZED = "customized"
                    }(H || (H = {})),
                    function(e) {
                        e.GENERAL = "general", e.CUSTOMIZED = "customized"
                    }(k || (k = {})),
                    function(e) {
                        e.EMAIL = "email", e.POSTAL_MAIL = "postalMail", e.SMS = "sms", e.PHONE_CALLS = "phoneCalls", e.SOCIAL_MEDIA = "socialMedia"
                    }(x || (x = {})),
                    function(e) {
                        e.NOT_SUBMITTED = "notSubmitted", e.OPTED_IN = "optedIn", e.OPTED_OUT = "optedOut"
                    }(Y || (Y = {})),
                    function(e) {
                        e.EMAIL = "email", e.SMS = "sms", e.PHONE_CALLS = "phoneCalls", e.POSTAL_MAIL = "postalMail", e.SOCIAL_MEDIA = "socialMedia"
                    }(V || (V = {})),
                    function(e) {
                        e.DESKTOP = "desktop", e.MOBILE = "mobile"
                    }(W || (W = {})),
                    function(e) {
                        e.DISABLED = "disabled", e.DRY_RUN = "dry-run", e.ENABLED = "enabled"
                    }(Z || (Z = {})),
                    function(e) {
                        e.LIVE = "live", e.TEST = "test"
                    }(X || (X = {})),
                    function(e) {
                        e.TEXT = "text", e.EMAIL = "email"
                    }(J || (J = {})),
                    function(e) {
                        e.WEBSITE = "website", e.CAMPAIGN_PAGE = "campaignPage", e.VIRTUAL_TERMINAL = "virtualTerminal", e.DONOR_PORTAL = "donorPortal", e.DASHBOARD = "dashboard", e.RECURRING_MIGRATION = "recurringMigration", e.API = "api"
                    }($ || ($ = {})),
                    function(e) {
                        e.DAY_7 = "7d", e.MONTH = "1m", e.MONTH_3 = "3m", e.YEAR_TO_DAY = "ytd", e.YEAR = "1y", e.YEAR_5 = "5y"
                    }(j || (j = {})),
                    function(e) {
                        e.FULL = "full", e.CHUNK = "chunk"
                    }(z || (z = {})),
                    function(e) {
                        e.CHARGES = "charges", e.COMPANIES = "companies", e.CUSTOMERS = "customers", e.ELEMENTS = "elements", e.SUBSCRIPTIONS = "subscriptions", e.WIDGETS = "widgets", e.FUNDRAISING_PAGES = "fundraisingpages", e.USERS = "users"
                    }(Q || (Q = {})),
                    function(e) {
                        e.FULL = "full", e.FROM = "from"
                    }(q || (q = {})), j.DAY_7, j.MONTH, j.MONTH_3, j.YEAR_TO_DAY, j.YEAR, j.YEAR_5
            },
            10961: (e, t, i) => {
                "use strict";
                i.d(t, {
                    O: () => s
                });
                var n = i(7274);
                const s = [n.D.EN_US, n.D.EN_GB, n.D.EN_CA, n.D.FR_CA, n.D.FR_FR, n.D.ES, n.D.NL, n.D.NO, n.D.DE, n.D.FI_FI, n.D.SV, n.D.IT, n.D.PT_PT, n.D.PT_BR, n.D.AR_001, n.D.ZH_CN, n.D.ZH_TW, n.D.JA, n.D.KO, n.D.HU, n.D.DA, n.D.ES_US, n.D.PL_PL, n.D.RU_RU]
            },
            46258: (e, t, i) => {
                "use strict";
                i.d(t, {
                    Oi: () => c.O,
                    Lw: () => d
                });
                var n, s, a, o, r, c = i(10961),
                    l = i(7274);
                ! function(e) {
                    e.EN_US = "English (USA)", e.EN_GB = "English (Great Britain)", e.EN_CA = "English (Canada)", e.FR_CA = "French (Canada)", e.FR_FR = "French (France)", e.ES = "Spanish", e.NL = "Dutch", e.NO = "Norwegian", e.DE = "German", e.FI_FI = "Finnish", e.AR_001 = "Arabic (World)", e.SV = "Swedish", e.IT = "Italian", e.PT_PT = "Portuguese (Portugal)", e.PT_BR = "Portuguese (Brazil)", e.ZH_CN = "Chinese Simplified", e.ZH_TW = "Chinese Traditional", e.JA = "Japanese", e.KO = "Korean", e.HU = "Hungarian", e.DA = "Danish", e.ES_US = "Spanish (United States)", e.PL_PL = "Polish", e.RU_RU = "Russian"
                }(n || (n = {})),
                function(e) {
                    e.EN_US = "English", e.EN_GB = "English", e.EN_CA = "English", e.FR_CA = "French", e.FR_FR = "French", e.ES = "Spanish", e.NL = "Dutch", e.NO = "Norwegian", e.DE = "German", e.FI_FI = "Finnish", e.AR_001 = "Arabic", e.SV = "Swedish", e.IT = "Italian", e.PT_PT = "Portuguese", e.PT_BR = "Portuguese", e.ZH_CN = "Chinese", e.ZH_TW = "Chinese", e.JA = "Japanese", e.KO = "Korean", e.HU = "Hungarian", e.DA = "Danish", e.ES_US = "Spanish (United States)", e.PL_PL = "Polish", e.RU_RU = "Russian"
                }(s || (s = {})), (r = a || (a = {})).LOCALE = "locale", r.PREFERRED_LOCALE = "preferredLocale",
                    function(e) {
                        e.EN_US = "English (USA)", e.EN_GB = "English (Great Britain)", e.EN_CA = "English (Canada)", e.FR_CA = "Français (Canada)", e.FR_FR = "Français (France)", e.ES = "Español", e.NL = "Nederlands", e.NO = "Norsk", e.DE = "Deutsch", e.FI_FI = "Suomi", e.AR_100 = "اللغة العربية", e.SV = "Svenska", e.IT = "Italiano", e.PT_PT = "Português (Portugal)", e.PT_BR = "Português (Brazil)", e.ZH_CN = "简体中文", e.ZH_TW = "繁体中文", e.JA = "日本語", e.KO = "한국어", e.HU = "Magyar", e.DA = "Dansk", e.ES_US = "Español (Estados Unidos)", e.PL_PL = "Polska", e.RU_RU = "Русский"
                    }(o || (o = {}));
                const d = {
                    [l.D.EN_US]: n.EN_US,
                    [l.D.EN_GB]: n.EN_GB,
                    [l.D.EN_CA]: n.EN_CA,
                    [l.D.FR_CA]: n.FR_CA,
                    [l.D.FR_FR]: n.FR_FR,
                    [l.D.ES]: n.ES,
                    [l.D.NL]: n.NL,
                    [l.D.NO]: n.NO,
                    [l.D.DE]: n.DE,
                    [l.D.FI_FI]: n.FI_FI,
                    [l.D.AR_001]: n.AR_001,
                    [l.D.SV]: n.SV,
                    [l.D.IT]: n.IT,
                    [l.D.PT_PT]: n.PT_PT,
                    [l.D.PT_BR]: n.PT_BR,
                    [l.D.ZH_CN]: n.ZH_CN,
                    [l.D.ZH_TW]: n.ZH_TW,
                    [l.D.JA]: n.JA,
                    [l.D.KO]: n.KO,
                    [l.D.HU]: n.HU,
                    [l.D.DA]: n.DA,
                    [l.D.ES_US]: n.ES_US,
                    [l.D.PL_PL]: n.PL_PL,
                    [l.D.RU_RU]: n.RU_RU
                };
                var u;
                l.D.EN_US, s.EN_US, l.D.EN_GB, s.EN_GB, l.D.EN_CA, s.EN_CA, l.D.FR_CA, s.FR_CA, l.D.FR_FR, s.FR_FR, l.D.ES, s.ES, l.D.NL, s.NL, l.D.NO, s.NO, l.D.DE, s.DE, l.D.FI_FI, s.FI_FI, l.D.AR_001, s.AR_001, l.D.SV, s.SV, l.D.IT, s.IT, l.D.PT_PT, s.PT_PT, l.D.PT_BR, s.PT_BR, l.D.ZH_CN, s.ZH_CN, l.D.ZH_TW, s.ZH_TW, l.D.JA, s.JA, l.D.KO, s.KO, l.D.HU, s.HU, l.D.DA, s.DA, l.D.ES_US, s.ES_US, l.D.PL_PL, s.PL_PL, l.D.RU_RU, s.RU_RU, l.D.EN_US, o.EN_US, l.D.EN_GB, o.EN_GB, l.D.EN_CA, o.EN_CA, l.D.FR_CA, o.FR_CA, l.D.FR_FR, o.FR_FR, l.D.ES, o.ES, l.D.NL, o.NL, l.D.NO, o.NO, l.D.DE, o.DE, l.D.FI_FI, o.FI_FI, l.D.AR_001, o.AR_100, l.D.SV, o.SV, l.D.IT, o.IT, l.D.PT_PT, o.PT_PT, l.D.PT_BR, o.PT_BR, l.D.ZH_CN, o.ZH_CN, l.D.ZH_TW, o.ZH_TW, l.D.JA, o.JA, l.D.KO, o.KO, l.D.HU, o.HU, l.D.DA, o.DA, l.D.ES_US, o.ES_US, l.D.PL_PL, o.PL_PL, l.D.RU_RU, o.RU_RU,
                    function(e) {
                        e.LONG = "long", e.SHORT = "short", e.LONG_WITH_YEAR = "longWithYear", e.SHORT_WITH_YEAR = "shortWithYear"
                    }(u || (u = {}))
            },
            27601: e => {
                var t = Array.isArray;
                e.exports = function() {
                    if (!arguments.length) return [];
                    var e = arguments[0];
                    return t(e) ? e : [e]
                }
            },
            3478: (e, t, i) => {
                "use strict";

                function n(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var i = arguments[t];
                        for (var n in i) e[n] = i[n]
                    }
                    return e
                }
                i.d(t, {
                    A: () => s
                });
                const s = function e(t, i) {
                    function s(e, s, a) {
                        if ("undefined" != typeof document) {
                            "number" == typeof(a = n({}, i, a)).expires && (a.expires = new Date(Date.now() + 864e5 * a.expires)), a.expires && (a.expires = a.expires.toUTCString()), e = encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
                            var o = "";
                            for (var r in a) a[r] && (o += "; " + r, !0 !== a[r] && (o += "=" + a[r].split(";")[0]));
                            return document.cookie = e + "=" + t.write(s, e) + o
                        }
                    }
                    return Object.create({
                        set: s,
                        get: function(e) {
                            if ("undefined" != typeof document && (!arguments.length || e)) {
                                for (var i = document.cookie ? document.cookie.split("; ") : [], n = {}, s = 0; s < i.length; s++) {
                                    var a = i[s].split("="),
                                        o = a.slice(1).join("=");
                                    try {
                                        var r = decodeURIComponent(a[0]);
                                        if (n[r] = t.read(o, r), e === r) break
                                    } catch (e) {}
                                }
                                return e ? n[e] : n
                            }
                        },
                        remove: function(e, t) {
                            s(e, "", n({}, t, {
                                expires: -1
                            }))
                        },
                        withAttributes: function(t) {
                            return e(this.converter, n({}, this.attributes, t))
                        },
                        withConverter: function(t) {
                            return e(n({}, this.converter, t), this.attributes)
                        }
                    }, {
                        attributes: {
                            value: Object.freeze(i)
                        },
                        converter: {
                            value: Object.freeze(t)
                        }
                    })
                }({
                    read: function(e) {
                        return '"' === e[0] && (e = e.slice(1, -1)), e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
                    },
                    write: function(e) {
                        return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent)
                    }
                }, {
                    path: "/"
                })
            },
            52177: e => {
                "use strict";
                e.exports = JSON.parse('{"SHP":{"name":"St. Helena Pound","code":"SHP","symbol":"£","digits":2},"EUR":{"name":"Euro","code":"EUR","symbol":"€","digits":2},"AED":{"name":"United Arab Emirates Dirham","code":"AED","symbol":"","digits":2},"AFN":{"name":"Afghan Afghani","code":"AFN","symbol":"؋","digits":2},"XCD":{"name":"East Caribbean Dollar","code":"XCD","symbol":"$","digits":2},"ALL":{"name":"Albanian Lek","code":"ALL","symbol":"","digits":2},"AMD":{"name":"Armenian Dram","code":"AMD","symbol":"֏","digits":2},"AOA":{"name":"Angolan Kwanza","code":"AOA","symbol":"Kz","digits":2},"ARS":{"name":"Argentine Peso","code":"ARS","symbol":"$","digits":2},"USD":{"name":"US Dollar","code":"USD","symbol":"$","digits":2},"AUD":{"name":"Australian Dollar","code":"AUD","symbol":"$","digits":2},"ANG":{"name":"Netherlands Antillean Guilder","code":"ANG","symbol":"","digits":2},"AWG":{"name":"Aruban Florin","code":"AWG","symbol":"","digits":2},"AZN":{"name":"Azerbaijani Manat","code":"AZN","symbol":"₼","digits":2},"BAM":{"name":"Bosnia-Herzegovina Convertible Mark","code":"BAM","symbol":"KM","digits":2},"BBD":{"name":"Barbadian Dollar","code":"BBD","symbol":"$","digits":2},"INR":{"name":"Indian Rupee","code":"INR","symbol":"₹","digits":2},"PKR":{"name":"Pakistani Rupee","code":"PKR","symbol":"Rs","digits":2},"BDT":{"name":"Bangladeshi Taka","code":"BDT","symbol":"৳","digits":2},"XOF":{"name":"West African CFA Franc","code":"XOF","symbol":"","digits":0},"BGN":{"name":"Bulgarian Lev","code":"BGN","symbol":"","digits":2},"BHD":{"name":"Bahraini Dinar","code":"BHD","symbol":"","digits":2},"BIF":{"name":"Burundian Franc","code":"BIF","symbol":"","digits":0},"BMD":{"name":"Bermudan Dollar","code":"BMD","symbol":"$","digits":2},"MYR":{"name":"Malaysian Ringgit","code":"MYR","symbol":"RM","digits":2},"BND":{"name":"Brunei Dollar","code":"BND","symbol":"$","digits":2},"BOB":{"name":"Bolivian Boliviano","code":"BOB","symbol":"Bs","digits":2},"BRL":{"name":"Brazilian Real","code":"BRL","symbol":"R$","digits":2},"BSD":{"name":"Bahamian Dollar","code":"BSD","symbol":"$","digits":2},"BTN":{"name":"Bhutanese Ngultrum","code":"BTN","symbol":"","digits":2},"NOK":{"name":"Norwegian Krone","code":"NOK","symbol":"kr","digits":2},"ZAR":{"name":"South African Rand","code":"ZAR","symbol":"R","digits":2},"BWP":{"name":"Botswanan Pula","code":"BWP","symbol":"P","digits":2},"BYN":{"name":"Belarusian Ruble","code":"BYN","symbol":"","digits":2},"BZD":{"name":"Belize Dollar","code":"BZD","symbol":"$","digits":2},"CAD":{"name":"Canadian Dollar","code":"CAD","symbol":"$","digits":2},"CDF":{"name":"Congolese Franc","code":"CDF","symbol":"","digits":2},"XAF":{"name":"Central African CFA Franc","code":"XAF","symbol":"","digits":0},"CHF":{"name":"Swiss Franc","code":"CHF","symbol":"","digits":2},"NZD":{"name":"New Zealand Dollar","code":"NZD","symbol":"$","digits":2},"CLP":{"name":"Chilean Peso","code":"CLP","symbol":"$","digits":0},"CNY":{"name":"Chinese Yuan","code":"CNY","symbol":"¥","digits":2},"COP":{"name":"Colombian Peso","code":"COP","symbol":"$","digits":2},"CRC":{"name":"Costa Rican Colón","code":"CRC","symbol":"₡","digits":2},"CVE":{"name":"Cape Verdean Escudo","code":"CVE","symbol":"","digits":2},"CZK":{"name":"Czech Koruna","code":"CZK","symbol":"Kč","digits":2},"DJF":{"name":"Djiboutian Franc","code":"DJF","symbol":"","digits":0},"DKK":{"name":"Danish Krone","code":"DKK","symbol":"kr","digits":2},"DOP":{"name":"Dominican Peso","code":"DOP","symbol":"$","digits":2},"DZD":{"name":"Algerian Dinar","code":"DZD","symbol":"","digits":2},"EGP":{"name":"Egyptian Pound","code":"EGP","symbol":"E£","digits":2},"MAD":{"name":"Moroccan Dirham","code":"MAD","symbol":"","digits":2},"ETB":{"name":"Ethiopian Birr","code":"ETB","symbol":"","digits":2},"FJD":{"name":"Fijian Dollar","code":"FJD","symbol":"$","digits":2},"FKP":{"name":"Falkland Islands Pound","code":"FKP","symbol":"£","digits":2},"JPY":{"name":"Japanese Yen","code":"JPY","symbol":"¥","digits":0},"GBP":{"name":"British Pound","code":"GBP","symbol":"£","digits":2},"GEL":{"name":"Georgian Lari","code":"GEL","symbol":"₾","digits":2},"GHS":{"name":"Ghanaian Cedi","code":"GHS","symbol":"GH₵","digits":2},"GIP":{"name":"Gibraltar Pound","code":"GIP","symbol":"£","digits":2},"GMD":{"name":"Gambian Dalasi","code":"GMD","symbol":"","digits":2},"GNF":{"name":"Guinean Franc","code":"GNF","symbol":"FG","digits":0},"GTQ":{"name":"Guatemalan Quetzal","code":"GTQ","symbol":"Q","digits":2},"GYD":{"name":"Guyanaese Dollar","code":"GYD","symbol":"$","digits":2},"HKD":{"name":"Hong Kong Dollar","code":"HKD","symbol":"$","digits":2},"HNL":{"name":"Honduran Lempira","code":"HNL","symbol":"L","digits":2},"HRK":{"name":"Croatian Kuna","code":"HRK","symbol":"kn","digits":2},"HTG":{"name":"Haitian Gourde","code":"HTG","symbol":"","digits":2},"HUF":{"name":"Hungarian Forint","code":"HUF","symbol":"Ft","digits":2},"IDR":{"name":"Indonesian Rupiah","code":"IDR","symbol":"Rp","digits":2},"ILS":{"name":"Israeli New Shekel","code":"ILS","symbol":"₪","digits":2},"ISK":{"name":"Icelandic Króna","code":"ISK","symbol":"kr","digits":2},"JMD":{"name":"Jamaican Dollar","code":"JMD","symbol":"$","digits":2},"JOD":{"name":"Jordanian Dinar","code":"JOD","symbol":"","digits":2},"KES":{"name":"Kenyan Shilling","code":"KES","symbol":"","digits":2},"KGS":{"name":"Kyrgystani Som","code":"KGS","symbol":"","digits":2},"KHR":{"name":"Cambodian Riel","code":"KHR","symbol":"៛","digits":2},"KMF":{"name":"Comorian Franc","code":"KMF","symbol":"CF","digits":0},"KRW":{"name":"South Korean Won","code":"KRW","symbol":"₩","digits":0},"KWD":{"name":"Kuwaiti Dinar","code":"KWD","symbol":"","digits":2},"KYD":{"name":"Cayman Islands Dollar","code":"KYD","symbol":"$","digits":2},"KZT":{"name":"Kazakhstani Tenge","code":"KZT","symbol":"₸","digits":2},"LAK":{"name":"Laotian Kip","code":"LAK","symbol":"₭","digits":2},"LBP":{"name":"Lebanese Pound","code":"LBP","symbol":"L£","digits":2},"LKR":{"name":"Sri Lankan Rupee","code":"LKR","symbol":"Rs","digits":2},"LRD":{"name":"Liberian Dollar","code":"LRD","symbol":"$","digits":2},"LSL":{"name":"Lesotho Loti","code":"LSL","symbol":"","digits":2},"MDL":{"name":"Moldovan Leu","code":"MDL","symbol":"","digits":2},"MGA":{"name":"Malagasy Ariary","code":"MGA","symbol":"Ar","digits":0},"MKD":{"name":"Macedonian Denar","code":"MKD","symbol":"","digits":2},"MMK":{"name":"Myanmar Kyat","code":"MMK","symbol":"K","digits":2},"MNT":{"name":"Mongolian Tugrik","code":"MNT","symbol":"₮","digits":2},"MOP":{"name":"Macanese Pataca","code":"MOP","symbol":"","digits":2},"MRO":{"name":"Mauritanian Ouguiya (1973–2017)","code":"MRO","symbol":"","digits":2},"MUR":{"name":"Mauritian Rupee","code":"MUR","symbol":"Rs","digits":2},"MVR":{"name":"Maldivian Rufiyaa","code":"MVR","symbol":"","digits":2},"MWK":{"name":"Malawian Kwacha","code":"MWK","symbol":"","digits":2},"MXN":{"name":"Mexican Peso","code":"MXN","symbol":"$","digits":2},"MZN":{"name":"Mozambican Metical","code":"MZN","symbol":"","digits":2},"NAD":{"name":"Namibian Dollar","code":"NAD","symbol":"$","digits":2},"XPF":{"name":"CFP Franc","code":"XPF","symbol":"","digits":0},"NGN":{"name":"Nigerian Naira","code":"NGN","symbol":"₦","digits":2},"NIO":{"name":"Nicaraguan Córdoba","code":"NIO","symbol":"C$","digits":2},"SEK":{"name":"Swedish Krona","code":"SEK","symbol":"kr","digits":2},"NPR":{"name":"Nepalese Rupee","code":"NPR","symbol":"Rs","digits":2},"OMR":{"name":"Omani Rial","code":"OMR","symbol":"","digits":2},"PAB":{"name":"Panamanian Balboa","code":"PAB","symbol":"","digits":2},"PEN":{"name":"Peruvian Sol","code":"PEN","symbol":"","digits":2},"PGK":{"name":"Papua New Guinean Kina","code":"PGK","symbol":"","digits":2},"PHP":{"name":"Philippine Peso","code":"PHP","symbol":"₱","digits":2},"PLN":{"name":"Polish Zloty","code":"PLN","symbol":"zł","digits":2},"PYG":{"name":"Paraguayan Guarani","code":"PYG","symbol":"₲","digits":0},"QAR":{"name":"Qatari Riyal","code":"QAR","symbol":"","digits":2},"RON":{"name":"Romanian Leu","code":"RON","symbol":"lei","digits":2},"RSD":{"name":"Serbian Dinar","code":"RSD","symbol":"","digits":2},"RUB":{"name":"Russian Ruble","code":"RUB","symbol":"₽","digits":2},"RWF":{"name":"Rwandan Franc","code":"RWF","symbol":"RF","digits":0},"SAR":{"name":"Saudi Riyal","code":"SAR","symbol":"","digits":2},"SBD":{"name":"Solomon Islands Dollar","code":"SBD","symbol":"$","digits":2},"SCR":{"name":"Seychellois Rupee","code":"SCR","symbol":"","digits":2},"SGD":{"name":"Singapore Dollar","code":"SGD","symbol":"$","digits":2},"SLL":{"name":"Sierra Leonean Leone (1964—2022)","code":"SLL","symbol":"","digits":2},"SLE":{"name":"Sierra Leonean Leone","code":"SLE","symbol":"","digits":2},"SOS":{"name":"Somali Shilling","code":"SOS","symbol":"","digits":2},"SRD":{"name":"Surinamese Dollar","code":"SRD","symbol":"$","digits":2},"STD":{"name":"São Tomé & Príncipe Dobra (1977–2017)","code":"STD","symbol":"","digits":2},"SVC":{"name":"Salvadoran Colón","code":"SVC","symbol":"","digits":2},"SZL":{"name":"Swazi Lilangeni","code":"SZL","symbol":"","digits":2},"THB":{"name":"Thai Baht","code":"THB","symbol":"฿","digits":2},"TJS":{"name":"Tajikistani Somoni","code":"TJS","symbol":"","digits":2},"TND":{"name":"Tunisian Dinar","code":"TND","symbol":"","digits":2},"TOP":{"name":"Tongan Paʻanga","code":"TOP","symbol":"T$","digits":2},"TRY":{"name":"Turkish Lira","code":"TRY","symbol":"₺","digits":2},"TTD":{"name":"Trinidad & Tobago Dollar","code":"TTD","symbol":"$","digits":2},"TWD":{"name":"New Taiwan Dollar","code":"TWD","symbol":"$","digits":2},"TZS":{"name":"Tanzanian Shilling","code":"TZS","symbol":"","digits":2},"UAH":{"name":"Ukrainian Hryvnia","code":"UAH","symbol":"₴","digits":2},"UYU":{"name":"Uruguayan Peso","code":"UYU","symbol":"$","digits":2},"UZS":{"name":"Uzbekistani Som","code":"UZS","symbol":"","digits":2},"VND":{"name":"Vietnamese Dong","code":"VND","symbol":"₫","digits":0},"VUV":{"name":"Vanuatu Vatu","code":"VUV","symbol":"","digits":0},"WST":{"name":"Samoan Tala","code":"WST","symbol":"","digits":2},"YER":{"name":"Yemeni Rial","code":"YER","symbol":"","digits":2},"ZMW":{"name":"Zambian Kwacha","code":"ZMW","symbol":"ZK","digits":2}}')
            },
            54601: e => {
                "use strict";
                e.exports = JSON.parse('{"AC":["SHP"],"AD":["EUR"],"AE":["AED"],"AF":["AFN"],"AG":["XCD"],"AI":["XCD"],"AL":["ALL"],"AM":["AMD"],"AO":["AOA"],"AR":["ARS"],"AS":["USD"],"AT":["EUR"],"AU":["AUD"],"AW":["AWG","ANG"],"AX":["EUR"],"AZ":["AZN"],"BA":["BAM"],"BB":["BBD","XCD"],"BD":["BDT","PKR","INR"],"BE":["EUR"],"BF":["XOF"],"BG":["BGN","EUR"],"BH":["BHD"],"BI":["BIF"],"BJ":["XOF"],"BL":["EUR"],"BM":["BMD"],"BN":["BND","MYR"],"BO":["BOB"],"BQ":["USD","ANG"],"BR":["BRL"],"BS":["BSD"],"BT":["BTN","INR"],"BV":["NOK"],"BW":["BWP","ZAR"],"BY":["BYN","EUR"],"BZ":["BZD"],"CA":["CAD","USD"],"CC":["AUD"],"CD":["CDF"],"CF":["XAF"],"CG":["XAF"],"CH":["CHF"],"CI":["XOF"],"CK":["NZD"],"CL":["CLP"],"CM":["XAF"],"CN":["CNY"],"CO":["COP"],"CR":["CRC"],"CS":["EUR"],"CU":["USD"],"CV":["CVE"],"CW":["ANG"],"CX":["AUD"],"CY":["EUR"],"CZ":["CZK","EUR"],"DE":["EUR"],"DG":["USD"],"DJ":["DJF"],"DK":["DKK","EUR"],"DM":["XCD"],"DO":["DOP","USD"],"DZ":["DZD"],"EA":["EUR"],"EC":["USD"],"EE":["EUR"],"EG":["EGP"],"EH":["MAD"],"ER":["ETB"],"ES":["EUR"],"ET":["ETB"],"EU":["EUR"],"FI":["EUR"],"FJ":["FJD"],"FK":["FKP"],"FM":["USD","JPY"],"FO":["DKK"],"FR":["EUR"],"GA":["XAF"],"GB":["GBP","EUR"],"GD":["XCD"],"GE":["GEL"],"GF":["EUR"],"GG":["GBP"],"GH":["GHS"],"GI":["GIP"],"GL":["DKK"],"GM":["GMD"],"GN":["GNF"],"GP":["EUR"],"GQ":["XAF"],"GR":["EUR"],"GS":["GBP"],"GT":["GTQ"],"GU":["USD"],"GW":["XOF"],"GY":["GYD"],"HK":["HKD"],"HM":["AUD"],"HN":["HNL"],"HR":["EUR"],"HT":["USD","HTG"],"HU":["HUF","EUR"],"IC":["EUR"],"ID":["IDR"],"IE":["EUR","GBP"],"IL":["ILS"],"IM":["GBP"],"IN":["INR"],"IO":["USD"],"IQ":["INR","EGP"],"IS":["ISK","DKK"],"IT":["EUR"],"JE":["GBP"],"JM":["JMD"],"JO":["JOD"],"JP":["JPY"],"KE":["KES"],"KG":["KGS"],"KH":["KHR"],"KI":["AUD"],"KM":["KMF"],"KN":["XCD"],"KR":["KRW"],"KW":["KWD"],"KY":["KYD","JMD"],"KZ":["KZT"],"LA":["LAK"],"LB":["LBP"],"LC":["XCD"],"LI":["CHF"],"LK":["LKR"],"LR":["LRD"],"LS":["LSL","ZAR"],"LT":["EUR"],"LU":["EUR"],"LV":["EUR"],"MA":["MAD"],"MC":["EUR"],"MD":["MDL"],"ME":["EUR"],"MF":["EUR"],"MG":["MGA"],"MH":["USD"],"MK":["MKD"],"ML":["XOF","XOF"],"MM":["MMK"],"MN":["MNT"],"MO":["MOP"],"MP":["USD"],"MQ":["EUR"],"MR":["XOF"],"MS":["XCD"],"MT":["EUR"],"MU":["MUR"],"MV":["MVR"],"MW":["MWK"],"MX":["MXN","USD"],"MY":["MYR"],"MZ":["MZN"],"NA":["NAD","ZAR"],"NC":["XPF"],"NE":["XOF"],"NF":["AUD"],"NG":["NGN"],"NI":["NIO"],"NL":["EUR"],"NO":["NOK","SEK","EUR"],"NP":["NPR","INR"],"NR":["AUD"],"NU":["NZD"],"NZ":["NZD"],"OM":["OMR"],"PA":["USD","PAB"],"PE":["PEN"],"PF":["XPF"],"PG":["PGK","AUD"],"PH":["PHP"],"PK":["PKR","INR"],"PL":["PLN","EUR"],"PM":["EUR"],"PN":["NZD"],"PR":["USD"],"PS":["JOD","ILS","JOD"],"PT":["EUR"],"PW":["USD"],"PY":["PYG"],"QA":["QAR"],"RE":["EUR"],"RO":["RON","EUR"],"RS":["RSD"],"RU":["RUB","EUR"],"RW":["RWF"],"SA":["SAR"],"SB":["SBD","AUD"],"SC":["SCR"],"SD":["GBP","EGP"],"SE":["SEK","EUR"],"SG":["SGD","MYR"],"SH":["SHP"],"SI":["EUR"],"SJ":["NOK"],"SK":["EUR"],"SL":["SLE","SLL","GBP"],"SM":["EUR"],"SN":["XOF"],"SO":["SOS"],"SR":["SRD"],"ST":["USD"],"SV":["USD"],"SX":["ANG"],"SZ":["SZL"],"TA":["GBP"],"TC":["USD"],"TD":["XAF"],"TF":["EUR"],"TG":["XOF"],"TH":["THB"],"TJ":["TJS"],"TK":["NZD"],"TL":["USD","IDR"],"TN":["TND"],"TO":["TOP"],"TP":["IDR"],"TR":["TRY"],"TT":["TTD"],"TV":["AUD"],"TW":["TWD"],"TZ":["TZS"],"UA":["UAH","EUR"],"UM":["USD"],"US":["USD"],"UY":["UYU"],"UZ":["UZS"],"VA":["EUR"],"VC":["XCD"],"VG":["GBP","USD"],"VI":["USD"],"VN":["VND"],"VU":["VUV"],"WF":["XPF"],"WS":["WST"],"XK":["EUR"],"YE":["YER"],"YT":["EUR","KMF"],"ZA":["ZAR"],"ZM":["ZMW"],"ZW":["USD"]}')
            }
        },
        a = {};

    function o(e) {
        var t = a[e];
        if (void 0 !== t) return t.exports;
        var i = a[e] = {
            id: e,
            loaded: !1,
            exports: {}
        };
        return s[e].call(i.exports, i, i.exports, o), i.loaded = !0, i.exports
    }
    o.m = s, o.amdO = {}, o.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return o.d(t, {
            a: t
        }), t
    }, t = Object.getPrototypeOf ? e => Object.getPrototypeOf(e) : e => e.__proto__, o.t = function(i, n) {
        if (1 & n && (i = this(i)), 8 & n) return i;
        if ("object" == typeof i && i) {
            if (4 & n && i.__esModule) return i;
            if (16 & n && "function" == typeof i.then) return i
        }
        var s = Object.create(null);
        o.r(s);
        var a = {};
        e = e || [null, t({}), t([]), t(t)];
        for (var r = 2 & n && i;
            "object" == typeof r && !~e.indexOf(r); r = t(r)) Object.getOwnPropertyNames(r).forEach((e => a[e] = () => i[e]));
        return a.default = () => i, o.d(s, a), s
    }, o.d = (e, t) => {
        for (var i in t) o.o(t, i) && !o.o(e, i) && Object.defineProperty(e, i, {
            enumerable: !0,
            get: t[i]
        })
    }, o.f = {}, o.e = e => Promise.all(Object.keys(o.f).reduce(((t, i) => (o.f[i](e, t), t)), [])), o.u = e => e + "." + {
        3: "93faaca8f729",
        44: "dfffdeabce5d",
        93: "bfd6a7857bf7",
        173: "e0ce429a2ee0",
        186: "4938e3d2e9e3",
        444: "b48c6188b232",
        670: "d24a2d397a9c",
        691: "16535323578a",
        720: "cd70c397c52b",
        743: "c7eccdfde914",
        770: "97a09c348f81",
        796: "8868c654d71d",
        807: "5dc120e0a265",
        862: "03b6a3d0d7b0",
        896: "c85ad9ab576c",
        930: "63a84eeab234",
        951: "e788607a871f",
        1012: "f435954b23dd",
        1199: "6ee8e1d36bf3",
        1210: "0a7696fe2c90",
        1211: "4ba6065ec936",
        1216: "dcc629cf8315",
        1305: "c618c0a10078",
        1402: "c1883dce71e4",
        1416: "f5d585175bd6",
        1480: "5b4f34905569",
        1590: "51198bfba5e0",
        1719: "b571009dd27d",
        1784: "b87b3282e005",
        1792: "1e73cc36a4c9",
        1798: "edf5ab1fdb91",
        1842: "71f1dd44f17e",
        1886: "8b1cd546c6db",
        1987: "6e798ca93802",
        2001: "299cfed5fa7d",
        2062: "63c01b4f5527",
        2101: "e58e53fcecd9",
        2121: "a3b3e22ef7a6",
        2225: "ff43f989d128",
        2232: "f00061dee98f",
        2255: "08f9556e6b9c",
        2271: "67e2e3756985",
        2344: "9e7882539c5f",
        2347: "16b6d18370da",
        2597: "0af94568803f",
        2628: "052384bb113c",
        2729: "45aab827eff9",
        2760: "81a8ea6315ad",
        2799: "601750bcaa0e",
        2910: "bc81f18ba887",
        2935: "1aad1edc8b46",
        2974: "803838d72ae3",
        2978: "bf44408abd3e",
        3003: "1394ef4bcd3c",
        3015: "fa658d5054bb",
        3034: "4cca72d0dac1",
        3131: "48f3e2fae004",
        3200: "d9ca54df3c6b",
        3286: "f2578e113db8",
        3428: "7b38fc4b1580",
        3656: "752292b886c6",
        3703: "c8f60bb33b85",
        3737: "f927c5a47fc4",
        3746: "088c6c203307",
        3763: "3186ca4a5a93",
        3803: "5cfda1fc8fb5",
        3823: "d7182583eb55",
        3964: "574606945078",
        3994: "42bac80cab19",
        4138: "120de177abf8",
        4230: "9a233be2b564",
        4368: "e224960ef2ce",
        4593: "cc1bff7c40f0",
        4703: "4f4ba0dd7e0e",
        4800: "37a9dce6589f",
        4813: "ef43cb98a6c9",
        4880: "097b96f5f0fe",
        4916: "c1c60096a57f",
        4988: "9173149347dd",
        5048: "b48518960c9b",
        5061: "11cb4f9d8822",
        5164: "ffde3f69eb65",
        5187: "40ab5f7f6cd0",
        5189: "839798f9b5a0",
        5247: "f079200e2ef7",
        5292: "18eb94808278",
        5301: "50c1ad105c09",
        5360: "c3c88ec1f5f2",
        5395: "0c7a0d5cd5dc",
        5406: "9b9aff637434",
        5487: "7662b65d3f0a",
        5508: "510160e3af21",
        5569: "5fa89b65ae4f",
        5624: "45cab723ab37",
        5744: "dcb35823aed2",
        5762: "630e0d9a58fe",
        5784: "9212a5c9f3e6",
        5868: "e26355e707e3",
        5885: "1dde0a667dc5",
        6012: "f2c2fb81c369",
        6077: "55108d6d38d5",
        6150: "c4e894d38fb0",
        6166: "840b12e88080",
        6250: "1ff4731aa7cd",
        6252: "33d0a91ebaea",
        6369: "8c2d10020a57",
        6394: "c7cd7c248818",
        6463: "b6b2a0d19765",
        6475: "71793f264626",
        6505: "7113c85c72f8",
        6522: "6a6e20ba5ad8",
        6774: "881bb9e91c7e",
        6878: "9eb8aac66ca8",
        6936: "146d18c067ac",
        6969: "50d6d693f2f1",
        7093: "4c4ba1968011",
        7162: "3c8086a6f8f3",
        7175: "ca1198b0e409",
        7196: "a7a8d11ab745",
        7249: "0ac0821b951a",
        7297: "2d06e24ddfaf",
        7371: "afb3e3e951e2",
        7431: "fba35077aefd",
        7433: "cc93f30859fe",
        7488: "57bdbb6281d8",
        7541: "95adfedcd144",
        7673: "f6586263785b",
        7705: "84608dd287e2",
        7711: "381a127146f8",
        7785: "128f6ce7f0a2",
        7789: "0cdf49c3142f",
        7858: "6696d0c006c6",
        7932: "24a1b49f34ce",
        7987: "f61320288da6",
        7998: "07674c8c8cb7",
        8034: "4cd812ee89a8",
        8038: "73f42f7753b3",
        8078: "d35557951620",
        8106: "85dcbe0b0aa3",
        8113: "a12ec4b646c2",
        8122: "e959dd29169d",
        8197: "ea04b1a03b6a",
        8204: "7fd0f7dd5ed3",
        8215: "5ae4d33f1a21",
        8411: "13adf4151552",
        8498: "9dc7d881c47d",
        8593: "45b33e780db3",
        8671: "7c0cccc98eaf",
        8689: "8fb03f9254ae",
        8794: "d8c2e6c8a215",
        8841: "c4811d5e4a3b",
        8859: "2505435e68e9",
        8874: "c0f94043c7ed",
        8960: "d1d56ebdb472",
        8975: "48a52ac18fab",
        8986: "5d9efd4a8aa7",
        8992: "f1238619b84c",
        9032: "036df5331d2f",
        9033: "307ae873b3b9",
        9192: "8ef683ba7ced",
        9202: "9b68761ebfb2",
        9265: "87b0332edb30",
        9319: "0177575907d5",
        9444: "ebf5dbdf4567",
        9483: "824e086de1ce",
        9489: "e21eff49c267",
        9500: "8540e65633d5",
        9501: "6a26a94cb0b7",
        9509: "364ab4f3813b",
        9554: "7ec10c767c64",
        9700: "bda9e0be7956",
        9771: "e337b6a21fe9"
    }[e] + "." + ({
        44: "link-v2",
        93: "floating-button-v2-rtl-styles",
        173: "legacy-currency-filter",
        444: "simple-form-v2-styles",
        670: "fundraising-page-invite-link",
        770: "split-testing",
        796: "p2p-form-locale12",
        807: "p2p-form-locale11",
        896: "p2p-button-v2-styles",
        951: "p2p-button-v2-rtl-styles",
        1012: "sticky-button-v2-rtl-styles",
        1199: "async-vendors",
        1216: "lightbox",
        1305: "goal-meter-v2-rtl-styles",
        1402: "p2p-form-locale21",
        1480: "donation-levels-v2",
        1590: "elements-langs-vendors",
        1719: "social-proof-emoji-confetti-ball",
        1784: "p2p-form-locale16",
        1842: "elements-crypto-currencies",
        1987: "p2p-form-locale20",
        2001: "p2p-form-locale2",
        2062: "social-proof-emoji-thumbs-up",
        2101: "p2p-button-v2",
        2225: "top-fundraisers",
        2255: "goal-meter-v2",
        2271: "donate-button-v2-styles",
        2597: "p2p-form-locale6",
        2628: "donate-button-v2-rtl-styles",
        2799: "top-locations",
        2935: "donor-map-styles",
        2974: "goal-meter-v2-styles",
        2978: "p2p-form-locale9",
        3015: "stat-counter-v2",
        3034: "top-supporters",
        3286: "impact-slider-v2",
        3428: "sticky-button-v2",
        3703: "social-proof-emoji-grinning-face",
        3737: "reminder-v2-styles",
        3803: "recent-donations-v2-rtl-styles",
        3823: "qr-code-v2-rtl-styles",
        3964: "recent-donations-v2-styles",
        3994: "floating-button-v2-styles",
        4138: "button-group-v2",
        4368: "text-link-v2",
        4593: "p2p-form-locale17",
        4880: "reminder-v2-react",
        4988: "social-proof-emoji-balloon",
        5187: "floating-button-v2",
        5189: "p2p-form-locale13",
        5395: "p2p-form-locale0",
        5406: "p2p-form-locale5",
        5508: "social-proof-v2",
        5624: "qr-code-v2-styles",
        5762: "button-group-v2-rtl-styles",
        5784: "p2p-form-locale23",
        5868: "donor-map",
        6012: "social-proof-emoji-party-popper",
        6166: "p2p-form-locale18",
        6369: "social-proof-emoji-heart",
        6394: "p2p-form-locale1",
        7371: "p2p-form-locale8",
        7433: "recent-donations-v2",
        7488: "test-mode-panel",
        7541: "debug-panel",
        7705: "simple-form-v2",
        7711: "social-proof-v2-styles",
        7789: "social-proof-emoji-party-face",
        7858: "reminder-v2",
        7987: "p2p-form-locale15",
        7998: "p2p-form-locale10",
        8038: "fundraising-page-link",
        8113: "p2p-new-form",
        8204: "p2p-form-locale7",
        8215: "p2p-form-locale4",
        8411: "simple-form-v2-rtl-styles",
        8593: "p2p-form-locale22",
        8671: "sticky-button-v2-styles",
        8689: "button-group-v2-styles",
        8794: "reminder-v2-rtl-styles",
        8841: "donation-form-v2",
        8975: "p2p-form-locale19",
        8986: "p2p-form-locale14",
        9032: "donate-button-v2-preact",
        9192: "p2p-form-locale3",
        9202: "image-card-v2",
        9444: "social-proof-v2-rtl-styles",
        9489: "p2p-link-v2",
        9501: "message-bar-v2",
        9554: "elements-vendors",
        9700: "donate-button-v2"
    }[e] || e) + ".js", o.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window) return window
        }
    }(), o.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), i = {}, n = "@fundraiseup/elements:", o.l = (e, t, s, a) => {
        if (i[e]) i[e].push(t);
        else {
            var r, c;
            if (void 0 !== s)
                for (var l = document.getElementsByTagName("script"), d = 0; d < l.length; d++) {
                    var u = l[d];
                    if (u.getAttribute("src") == e || u.getAttribute("data-webpack") == n + s) {
                        r = u;
                        break
                    }
                }
            r || (c = !0, (r = document.createElement("script")).charset = "utf-8", r.timeout = 120, o.nc && r.setAttribute("nonce", o.nc), r.setAttribute("data-webpack", n + s), r.src = e), i[e] = [t];
            var m = (t, n) => {
                    r.onerror = r.onload = null, clearTimeout(E);
                    var s = i[e];
                    if (delete i[e], r.parentNode && r.parentNode.removeChild(r), s && s.forEach((e => e(n))), t) return t(n)
                },
                E = setTimeout(m.bind(null, void 0, {
                    type: "timeout",
                    target: r
                }), 12e4);
            r.onerror = m.bind(null, r.onerror), r.onload = m.bind(null, r.onload), c && document.head.appendChild(r)
        }
    }, o.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, o.nmd = e => (e.paths = [], e.children || (e.children = []), e), o.p = "https://static.fundraiseup.com/", (() => {
        if (void 0 !== o) {
            var e = o.u,
                t = o.e,
                i = {},
                n = {};
            o.u = function(t) {
                return e(t) + (i.hasOwnProperty(t) ? "?" + i[t] : "")
            }, o.e = function(s) {
                return t(s).catch((function(t) {
                    var a = n.hasOwnProperty(s) ? n[s] : 5;
                    if (a < 1) {
                        var r = e(s);
                        throw t.message = "Loading chunk " + s + " failed after 5 retries.\n(" + r + ")", t.request = r, t
                    }
                    return new Promise((function(e) {
                        var t = 5 - a + 1;
                        setTimeout((function() {
                            var r = "cache-bust=true&retry-attempt=" + t;
                            i[s] = r, n[s] = a - 1, e(o.e(s))
                        }), 0)
                    }))
                }))
            }
        }
    })(), (() => {
        o.b = document.baseURI || self.location.href;
        var e = {
            8012: 0
        };
        o.f.j = (t, i) => {
            var n = o.o(e, t) ? e[t] : void 0;
            if (0 !== n)
                if (n) i.push(n[2]);
                else {
                    var s = new Promise(((i, s) => n = e[t] = [i, s]));
                    i.push(n[2] = s);
                    var a = o.p + o.u(t),
                        r = new Error;
                    o.l(a, (i => {
                        if (o.o(e, t) && (0 !== (n = e[t]) && (e[t] = void 0), n)) {
                            var s = i && ("load" === i.type ? "missing" : i.type),
                                a = i && i.target && i.target.src;
                            r.message = "Loading chunk " + t + " failed.\n(" + s + ": " + a + ")", r.name = "ChunkLoadError", r.type = s, r.request = a, n[1](r)
                        }
                    }), "chunk-" + t, t)
                }
        };
        var t = (t, i) => {
                var n, s, [a, r, c] = i,
                    l = 0;
                if (a.some((t => 0 !== e[t]))) {
                    for (n in r) o.o(r, n) && (o.m[n] = r[n]);
                    c && c(o)
                }
                for (t && t(i); l < a.length; l++) s = a[l], o.o(e, s) && e[s] && e[s][0](), e[s] = 0
            },
            i = self.funElementsApi = self.funElementsApi || [];
        i.forEach(t.bind(null, 0)), i.push = t.bind(null, i.push.bind(i))
    })(), (() => {
        "use strict";
        const e = window.FUN_HOST || "https://api.fundraiseup.com",
            t = (window.FUN_CDN, window.FUN_STATIC);
        window.FUN_STATIC_S3, o.p = t || o.p;
        var i = o(37859),
            n = o(348),
            s = o(45741),
            a = o(72115),
            r = o(2195),
            c = o(86994);
        class l {
            constructor(e) {
                this.window = e
            }
            subscribeOnUserInteraction(e) {
                const t = (0, c.n)(e, 1e3);
                return this.window.addEventListener("mousemove", t), this.window.addEventListener("touchstart", e), this.window.addEventListener("keypress", e), () => {
                    this.window.removeEventListener("mousemove", t), this.window.removeEventListener("touchstart", e), this.window.removeEventListener("keypress", e)
                }
            }
        }
        var d = o(17455);
        const u = /#([\da-z_-]{1,25})(\?|&|$)/i;
        var m = o(82385);
        const E = /^X[\dA-Z]{7}/,
            h = new RegExp("\\/-\\/(N[\\dA-Z]{7})");
        new RegExp(`${h.source}(?!\\/join)`), new RegExp(`${h.source}\\/join`);
        var _, T, A = o(54702);
        ! function(e) {
            e.type = "type", e.recurring = "recurring", e.amount = "amount", e.modifyAmount = "modifyAmount", e.designationId = "designationId", e.fundraiser = "fundraiser", e.modifyDesignation = "modifyDesignation", e.firstName = "firstName", e.lastName = "lastName", e.email = "email", e.fundraiseupLivemode = "fundraiseupLivemode"
        }(_ || (_ = {})),
        function(e) {
            e.fundraiser = "fundraiser", e.element = "element"
        }(T || (T = {}));
        let D = !1;
        class g {
            constructor(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window;
                this.keysKeeper = e, this._disabled = !1, this.originalQueryStringAndHash = "", this.window = t
            }
            get disabled() {
                return this._disabled
            }
            set disabled(e) {
                e !== this._disabled && (this._disabled = e)
            }
            checkUrl() {
                if (this.disabled) return;
                if (!this.window.location.hash) return;
                if (!this.keysKeeper.exists("WIDGET", this.window.location.hash)) return;
                D = !1;
                const e = this.keysKeeper.getOriginalWidgetKey(this.window.location.hash),
                    t = this.window.location.href.replace(this.window.location.hash, "#" + e);
                this.window.history.replaceState(null, this.window.document.title, t)
            }
            setUrl(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                    i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                    n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                if (this.disabled) return;
                if (!this.keysKeeper.exists("WIDGET", e) && !this.isModalKey(e)) return;
                const s = this.getQueryString({
                        keyOrHash: e,
                        hrefParams: t,
                        queryString: this.window.location.search,
                        hash: this.window.location.hash,
                        fundraisingPageKey: i
                    }),
                    a = this.cleanHash(this.window.location.hash);
                this.originalQueryStringAndHash = this.cleanQueryString(s, t, n) + a;
                const o = this.window.location.origin + this.normalizePathname(this.window.location.pathname) + s + a;
                this.window.history.replaceState(null, this.window.document.title, o), D = !1
            }
            back() {
                (0, m.A)(this.window) || this.window.history.go(-2), setTimeout((() => {
                    const e = (0, d.UA)(this.window.location.search, !1).form;
                    if (this.keysKeeper.exists("WIDGET", e) || this.isModalKey(e)) return D ? void this.window.history.back() : this.clearUrl()
                }), 150)
            }
            clearUrl() {
                if (this.disabled) return;
                const e = (0, d.UA)(this.window.location.search, !1).form;
                if (!this.keysKeeper.exists("WIDGET", e) && !this.isModalKey(e)) return;
                const t = this.window.location.origin + this.normalizePathname(this.window.location.pathname) + this.originalQueryStringAndHash;
                this.window.history.replaceState(null, this.window.document.title, t), D = !0
            }
            isModalKey(e) {
                return [A.a.P2P_BUTTON, A.a.P2P_LINK].some((t => this.keysKeeper.checkElementType(t, e)))
            }
            getQueryString(e) {
                let {
                    keyOrHash: t,
                    hrefParams: i,
                    hash: n,
                    queryString: s,
                    fundraisingPageKey: a
                } = e;
                const o = (0, d.UA)(i, !0),
                    r = {
                        form: t
                    },
                    c = (0, d.UA)(n, !1),
                    l = (0, d.UA)(s, !1),
                    m = function(e) {
                        const t = u.exec(e);
                        return t && t[1] ? t[1] : ""
                    }(n) || l.form || "",
                    h = 0 !== m.length && m.toLowerCase() !== t.toLowerCase();
                return a && (r.fundraiser = a), Object.keys(c).forEach((e => {
                    h && e in r || (r[e] = c[e])
                })), Object.keys(l).forEach((e => {
                    h && e in r || (r[e] = l[e])
                })), Object.assign(r, o), r.form = t, r.element && E.test(r.element) && delete r.element, "?" + (0, d.Ws)(r, !1)
            }
            cleanHash(e) {
                const t = e.split("&", 1)[0];
                return this.keysKeeper.exists("WIDGET", t) || "#" === t || -1 !== t.indexOf("=") ? "" : t
            }
            cleanQueryString(e, t, i) {
                const n = (0, d.UA)(t, !1),
                    s = (0, d.UA)(e, !1);
                delete s.form, Object.keys(_).forEach((e => delete s[e])), Object.keys(T).forEach((e => delete s[e])), i || Object.keys(n).forEach((e => delete s[e]));
                const a = (0, d.Ws)(s, !1);
                return "" === a ? "" : "?" + a
            }
            normalizePathname(e) {
                return e.startsWith("//") ? e.slice(1) : e
            }
        }
        var R = o(54601),
            p = o(39752),
            N = o(53245);
        const f = [A.a.DONATION_FORM];
        var S = o(63312);
        class I {
            constructor(e, t) {
                this.locale = e, this.elementLocalizationConfig = t
            }
            getUILocale() {
                return (0, S.n7)(this.locale, this.elementLocalizationConfig.supportedLanguages, this.elementLocalizationConfig.defaultLocale)
            }
            getDataLanguage() {
                return (0, S.Qk)(this.getUILocale())
            }
        }
        let C;

        function b() {
            return void 0 === C && (C = !1), C
        }
        var y = o(50137),
            O = o(27457);
        class P extends O.E {
            constructor(e, t) {
                super(e, t)
            }
            replaceCurrencyFilter(e) {
                this.formatCurrency = e.formatCurrency, this.formatSymbol = e.formatSymbol, this.getCurrencyFormat = e.getCurrencyFormat
            }
        }
        var L = o(36787),
            U = o(92488),
            F = o(70343),
            M = o(46258);
        const v = [A.a.REMINDER, A.a.SOCIAL_PROOF, A.a.RECENT_DONATIONS];
        async function w(e) {
            const {
                elementsFactory: t,
                node: i,
                name: n,
                ...a
            } = e, {
                localeCode: r,
                languageCode: c,
                isRTL: l
            } = function(e, t, i, n) {
                if (n && i && i.defaultLocale) return {
                    localeCode: i.defaultLocale,
                    languageCode: (0, S.Qk)(i.defaultLocale),
                    isRTL: "rtl" === (0, S.N_)(i.defaultLocale)
                };
                if ((0, N.yJ)(e)) {
                    const e = new I(t, i),
                        n = e.getDataLanguage();
                    return {
                        localeCode: e.getUILocale(),
                        languageCode: n,
                        isRTL: "rtl" === (0, S.iJ)(n)
                    }
                }
                return {
                    languageCode: (0, S.Qk)(t),
                    localeCode: t,
                    isRTL: "rtl" === (0, S.N_)(t)
                }
            }(a.elementType, a.localeConfig.code, a.config.localization, a.showcase), d = v.includes(n), u = await async function(e) {
                let {
                    locale: t,
                    isCrypto: i
                } = e;
                const n = t || F.O.DEFAULT_LOCALE,
                    a = (0, S.Op)(n, M.Oi) ? n : F.O.DEFAULT_LOCALE,
                    r = new y.o(new s.m),
                    c = new P(a, r);
                if (!(0, U.N)()) {
                    const e = await async function() {
                        const e = await Promise.all([o.e(9554), o.e(173)]).then(o.bind(o, 41178));
                        return {
                            formatCurrency: e.currencyFilter,
                            formatSymbol: (e, t) => t === L.I.PREFIX ? e : "",
                            getCurrencyFormat: e.getCurrencyFormat,
                            loadCrypto: () => Promise.resolve()
                        }
                    }();
                    return c.replaceCurrencyFilter(e), c
                }
                return i && await r.loadCrypto(), c
            }({
                locale: r,
                isCrypto: d
            });
            return d && await e.currencyService.loadCrypto(), await t.create(n, { ...a,
                localeCode: r,
                languageCode: c,
                isRTL: l,
                currencyFormatter: u,
                isDevelopmentMode: b()
            }, i)
        }
        class B {
            constructor() {
                this.map = new Map
            }
            dispatch(e, t) {
                (this.map.get(e) || []).forEach((e => e(t)))
            }
            subscribe(e, t) {
                const i = this.map.get(e) || [];
                i.push(t), this.map.set(e, i)
            }
        }
        class G {
            elements(e) {
                this.builders = e
            }
            create(e, t, i) {
                const n = window.FUN.experiments,
                    {
                        module: s,
                        style: a
                    } = this.builders[e]({
                        isRTL: t.isRTL,
                        experiments: n,
                        showcase: !!t.showcase
                    });
                return Promise.all([s, a]).then((s => {
                    let [{
                        default: a
                    }, o] = s;
                    if (! function(e) {
                            try {
                                return !!new e
                            } catch (e) {
                                return !e.message.includes("is not a constructor")
                            }
                        }(a)) throw new Error(`Default import for ${e} is not a constructor. Default: ${JSON.stringify(a)}`);
                    const r = new a({ ...t,
                        experiments: n,
                        node: i,
                        styles: (null == o ? void 0 : o.default) || null
                    });
                    return r.initializeAsync().then((() => r))
                })).then((e => e.render()))
            }
        }
        const K = b() || !0 === window.FUN_FORCE_PREACT_ELEMENTS,
            H = {
                [A.a.DONATE_BUTTON]: e => {
                    let t;
                    return t = e.isRTL ? o.e(2628).then(o.t.bind(o, 53206, 23)) : o.e(2271).then(o.t.bind(o, 15824, 23)), K ? {
                        module: Promise.all([o.e(9554), o.e(1590), o.e(1199), o.e(8106), o.e(1210), o.e(4800), o.e(3200), o.e(9032)]).then(o.bind(o, 73834))
                    } : {
                        module: Promise.all([o.e(9554), o.e(1590), o.e(1199), o.e(8106), o.e(4800), o.e(9265), o.e(9700)]).then(o.bind(o, 80583)),
                        style: t
                    }
                },
                [A.a.STICKY_BUTTON]: e => {
                    let t;
                    return t = e.isRTL ? o.e(1012).then(o.t.bind(o, 61786, 23)) : o.e(8671).then(o.t.bind(o, 35228, 23)), {
                        module: Promise.all([o.e(9554), o.e(1590), o.e(1199), o.e(8106), o.e(4800), o.e(9265), o.e(3428)]).then(o.bind(o, 73496)),
                        style: t
                    }
                },
                [A.a.REMINDER]: e => {
                    if (K) return {
                        module: Promise.all([o.e(9554), o.e(1590), o.e(1199), o.e(8106), o.e(1210), o.e(4800), o.e(3200), o.e(4880)]).then(o.bind(o, 27696))
                    };
                    let t;
                    return t = e.isRTL ? o.e(8794).then(o.t.bind(o, 62192, 23)) : o.e(3737).then(o.t.bind(o, 69834, 23)), {
                        module: Promise.all([o.e(9554), o.e(1590), o.e(1199), o.e(8106), o.e(4800), o.e(9265), o.e(7858)]).then(o.bind(o, 93937)),
                        style: t
                    }
                },
                [A.a.IMAGE_CARD]: () => ({
                    module: Promise.all([o.e(9554), o.e(1590), o.e(1199), o.e(8106), o.e(1210), o.e(4800), o.e(3200), o.e(9202)]).then(o.bind(o, 33966))
                }),
                [A.a.TEXT_LINK]: () => ({
                    module: Promise.all([o.e(9554), o.e(1590), o.e(8106), o.e(4800), o.e(4368)]).then(o.bind(o, 1414))
                }),
                [A.a.LINK]: () => ({
                    module: Promise.all([o.e(9554), o.e(1590), o.e(8106), o.e(4800), o.e(44)]).then(o.bind(o, 78926))
                }),
                [A.a.DONATION_FORM]: () => ({
                    module: Promise.all([o.e(9554), o.e(1590), o.e(1199), o.e(8106), o.e(1210), o.e(5360), o.e(4800), o.e(3200), o.e(5061), o.e(8841)]).then(o.bind(o, 61464))
                }),
                [A.a.SIMPLE_FORM]: e => {
                    let t;
                    return t = e.isRTL ? o.e(8411).then(o.t.bind(o, 35084, 23)) : o.e(444).then(o.t.bind(o, 27990, 23)), {
                        module: Promise.all([o.e(9554), o.e(1590), o.e(1199), o.e(8106), o.e(4800), o.e(9265), o.e(5061), o.e(7705)]).then(o.bind(o, 41513)),
                        style: t
                    }
                },
                [A.a.GOAL_METER]: e => {
                    let t;
                    return t = e.isRTL ? o.e(1305).then(o.t.bind(o, 82614, 23)) : o.e(2974).then(o.t.bind(o, 53944, 23)), {
                        module: Promise.all([o.e(9554), o.e(1590), o.e(1199), o.e(8106), o.e(4800), o.e(9265), o.e(2255)]).then(o.bind(o, 21862)),
                        style: t
                    }
                },
                [A.a.STAT_COUNTER]: () => ({
                    module: Promise.all([o.e(9554), o.e(1590), o.e(8106), o.e(4800), o.e(3015)]).then(o.bind(o, 16274))
                }),
                [A.a.IMPACT_SLIDER]: () => ({
                    module: Promise.all([o.e(9554), o.e(1590), o.e(1199), o.e(8106), o.e(1210), o.e(4800), o.e(3200), o.e(3286)]).then(o.bind(o, 69294))
                }),
                [A.a.DONATION_LEVELS]: () => ({
                    module: Promise.all([o.e(9554), o.e(1590), o.e(1199), o.e(8106), o.e(1210), o.e(4800), o.e(3200), o.e(1480)]).then(o.bind(o, 634))
                }),
                [A.a.BUTTON_GROUP]: e => {
                    let t;
                    return t = e.isRTL ? o.e(5762).then(o.t.bind(o, 80982, 23)) : o.e(8689).then(o.t.bind(o, 26096, 23)), {
                        module: Promise.all([o.e(9554), o.e(1590), o.e(1199), o.e(8106), o.e(4800), o.e(9265), o.e(4138)]).then(o.bind(o, 92349)),
                        style: t
                    }
                },
                [A.a.FLOATING_BUTTON]: e => {
                    let t;
                    return t = e.isRTL ? o.e(93).then(o.t.bind(o, 53852, 23)) : o.e(3994).then(o.t.bind(o, 30462, 23)), {
                        module: Promise.all([o.e(9554), o.e(1590), o.e(1199), o.e(8106), o.e(4800), o.e(9265), o.e(5187)]).then(o.bind(o, 81927)),
                        style: t
                    }
                },
                [A.a.MESSAGE_BAR]: e => {
                    let t;
                    return t = e.isRTL ? o.e(93).then(o.t.bind(o, 27528, 23)) : o.e(3994).then(o.t.bind(o, 21194, 23)), {
                        module: Promise.all([o.e(9554), o.e(1590), o.e(1199), o.e(8106), o.e(4800), o.e(9265), o.e(9501)]).then(o.bind(o, 38680)),
                        style: t
                    }
                },
                [A.a.SOCIAL_PROOF]: e => {
                    let t;
                    return t = e.isRTL ? o.e(9444).then(o.t.bind(o, 78894, 23)) : o.e(7711).then(o.t.bind(o, 42728, 23)), {
                        module: Promise.all([o.e(9554), o.e(1590), o.e(1199), o.e(8106), o.e(4800), o.e(9265), o.e(5508)]).then(o.bind(o, 68452)),
                        style: t
                    }
                },
                [A.a.QR_CODE]: e => {
                    let t;
                    return t = e.isRTL ? o.e(3823).then(o.t.bind(o, 16348, 23)) : Promise.all([o.e(9554), o.e(1590), o.e(8106), o.e(4800), o.e(5624)]).then(o.t.bind(o, 91718, 23)), {
                        module: Promise.all([o.e(9554), o.e(1590), o.e(8106), o.e(4800), o.e(5624)]).then(o.bind(o, 37684)),
                        style: t
                    }
                },
                [A.a.RECENT_DONATIONS]: e => {
                    let t;
                    return t = e.isRTL ? o.e(3803).then(o.t.bind(o, 86586, 23)) : o.e(3964).then(o.t.bind(o, 15476, 23)), {
                        module: Promise.all([o.e(9554), o.e(1590), o.e(1199), o.e(8106), o.e(2347), o.e(4800), o.e(9265), o.e(7433)]).then(o.bind(o, 9817)),
                        style: t
                    }
                },
                [A.a.P2P_BUTTON]: e => {
                    let t;
                    return t = e.isRTL ? o.e(951).then(o.t.bind(o, 20182, 23)) : o.e(896).then(o.t.bind(o, 88024, 23)), {
                        module: Promise.all([o.e(9554), o.e(1590), o.e(1199), o.e(8106), o.e(4800), o.e(9265), o.e(2101)]).then(o.bind(o, 44820)),
                        style: t
                    }
                },
                [A.a.P2P_LINK]: () => ({
                    module: Promise.all([o.e(9554), o.e(1590), o.e(8106), o.e(4800), o.e(9489)]).then(o.bind(o, 53410))
                }),
                [A.a.FUNDRAISING_PAGE_LINK]: () => ({
                    module: Promise.all([o.e(9554), o.e(1590), o.e(8106), o.e(4800), o.e(8038)]).then(o.bind(o, 57986))
                }),
                [A.a.FUNDRAISING_PAGE_INVITE_LINK]: () => ({
                    module: Promise.all([o.e(9554), o.e(1590), o.e(8106), o.e(4800), o.e(670)]).then(o.bind(o, 92718))
                }),
                [A.a.TOP_FUNDRAISERS]: () => ({
                    module: Promise.all([o.e(9554), o.e(1590), o.e(1199), o.e(8106), o.e(1210), o.e(4800), o.e(3200), o.e(2225)]).then(o.bind(o, 38078))
                }),
                [A.a.TOP_SUPPORTERS]: () => ({
                    module: Promise.all([o.e(9554), o.e(1590), o.e(1199), o.e(8106), o.e(1210), o.e(4800), o.e(3200), o.e(3034)]).then(o.bind(o, 69801))
                }),
                [A.a.TOP_LOCATIONS]: () => ({
                    module: Promise.all([o.e(9554), o.e(1590), o.e(1199), o.e(8106), o.e(1210), o.e(1211), o.e(4800), o.e(3200), o.e(2799)]).then(o.bind(o, 91580))
                }),
                [A.a.DONOR_MAP]: () => {
                    const e = o.e(2935).then(o.t.bind(o, 63320, 23));
                    return {
                        module: Promise.all([o.e(9554), o.e(1590), o.e(8106), o.e(4800), o.e(5868)]).then(o.bind(o, 13906)),
                        style: e
                    }
                },
                [A.a.DEBUG_PANEL]: () => ({
                    module: Promise.all([o.e(9554), o.e(1590), o.e(8106), o.e(1210), o.e(930), o.e(4800), o.e(3200), o.e(7541)]).then(o.bind(o, 4560))
                }),
                [A.a.TEST_MODE_PANEL]: () => ({
                    module: Promise.all([o.e(9554), o.e(1590), o.e(8106), o.e(1210), o.e(1211), o.e(1416), o.e(4703), o.e(4800), o.e(3200), o.e(7488)]).then(o.bind(o, 97070))
                }),
                [A.a.SPLIT_TESTING]: () => ({
                    module: Promise.all([o.e(9554), o.e(1590), o.e(8106), o.e(4800), o.e(770)]).then(o.bind(o, 38988))
                }),
                [A.a.LIGHTBOX]: () => ({
                    module: Promise.all([o.e(9554), o.e(1590), o.e(8106), o.e(1210), o.e(4800), o.e(3200), o.e(1216)]).then(o.bind(o, 56694))
                })
            };
        class k {
            static forKey(e) {
                return new k(e)
            }
            constructor(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                    i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
                this.key = e, this.params = t, this.customParams = i
            }
            toString() {
                const e = [].concat(this.params, this.customParams);
                return ["#" + this.key, e.map((e => {
                    let [t, i] = e;
                    return t + "=" + encodeURIComponent(i)
                })).join("&")].filter(Boolean).join("&")
            }
            addRecurring(e) {
                return e && this.params.push([_.recurring, e]), this
            }
            addAmount(e) {
                return e && this.params.push([_.amount, e.toString()]), this
            }
            addModifyAmount(e) {
                return !1 !== e && "no" !== e || this.params.push([_.modifyAmount, "no"]), this
            }
            addModifyDesignation(e) {
                return !1 !== e && "no" !== e || this.params.push([_.modifyDesignation, "no"]), this
            }
            addDesignation(e) {
                return "no" === e ? this.params.push(["designation", e]) : e && this.params.push([_.designationId, e]), this
            }
            addFirstName(e) {
                return e && this.params.push([_.firstName, e]), this
            }
            addLastName(e) {
                return e && this.params.push([_.lastName, e]), this
            }
            addEmail(e) {
                return e && this.params.push([_.email, e]), this
            }
            addFundraiseupLivemode(e) {
                return !1 !== e && "no" !== e || this.params.push([_.fundraiseupLivemode, "no"]), this
            }
            addCustomQueryParams(e) {
                if (!e) return this;
                for (const [t, i] of Object.entries(e)) i && this.customParams.push([t, i]);
                return this
            }
        }
        class x {
            constructor(e) {
                this.window = e, this.hideTimeout = null, this.hiddenElementsList = [], this.elementsSelectorList = [".s.u.m.o"]
            }
            hideAll() {
                const e = () => {
                    this.elementsSelectorList.forEach((e => {
                        this.window.document.querySelectorAll(e).forEach(this.hideNode.bind(this))
                    }))
                };
                e(), this.hideTimeout = this.window.setInterval(e, 1e3)
            }
            restoreAll() {
                this.hideTimeout && clearTimeout(this.hideTimeout), this.hiddenElementsList.forEach((e => {
                    let {
                        node: t,
                        style: i
                    } = e;
                    null === i ? t.removeAttribute("style") : t.setAttribute("style", i)
                })), this.hiddenElementsList = []
            }
            hideNode(e) {
                this.hiddenElementsList.some((t => t.node === e)) || (this.hiddenElementsList.push({
                    node: e,
                    style: e.getAttribute("style")
                }), e.setAttribute("style", "display: none;"))
            }
        }
        var Y = o(79655);
        class V {
            get currentOpenedFormKey() {
                return this.currentKey
            }
            constructor(e, t, i, n) {
                this.tracker = e, this.urlRouter = t, this.window = i, this.params = n, this.currentKey = null, this.forms = new Map, this.formCreationParams = new Map, this.formCreationPromises = new Map, this.debug = new Y.y("Forms"), this.foreignElements = new x(i)
            }
            register(e, t) {
                this.debug.log("register form", {
                    type: e
                }), this.formCreationParams.set(e, t)
            }
            create(e, t, i, n) {
                this.debug.log("create form", {
                    key: t,
                    type: e
                });
                const s = this.formCreationParams.get(e);
                if (!s) throw new Error("11");
                let a = this.formCreationPromises.get(t);
                if (a) return this.debug.log("create form", "already creating", {
                    key: t,
                    type: e
                }), a;
                const o = this.forms.get(t);
                if (o) return this.debug.log("create form", "form already created", {
                    key: t,
                    type: e
                }), Promise.resolve(o);
                const {
                    getModule: r,
                    getStyles: c
                } = s, l = { ...i,
                    key: t,
                    tracker: this.tracker,
                    isMobile: this.params.isMobile,
                    embedConfig: this.params.embedConfig,
                    localeConfig: this.params.localeConfig,
                    apiHost: n
                };
                return a = Promise.all([r(), c(i.isRTL)]).then((e => {
                    let [{
                        default: t
                    }, {
                        default: i
                    }] = e;
                    return t({ ...l,
                        styles: i
                    })
                })).then((i => (this.forms.set(t, i), this.formCreationPromises.delete(t), i.on("open", (() => {
                    this.debug.log("form opened", {
                        key: t,
                        type: e
                    });
                    const i = k.forKey("").addCustomQueryParams(l.queryParams || {}).toString().slice(1);
                    this.urlRouter.setUrl(t, i, "", !0)
                })), i.on("close", (() => {
                    this.debug.log("form closed", {
                        key: t,
                        type: e
                    }), this.currentKey = null, this.forms.delete(t), this.foreignElements.restoreAll(), this.urlRouter.back()
                })), i))), this.formCreationPromises.set(t, a), a
            }
            open(e) {
                if (this.debug.log("open form", {
                        key: e
                    }), this.currentKey) return this.debug.log("open form", "form already opened", {
                    openedFormKey: this.currentKey,
                    formKeyToOpen: e
                }), Promise.resolve();
                const t = this.forms.get(e);
                return V.assertFormExists(t), this.currentKey = e, t.open()
            }
            close(e) {
                this.debug.log("close form", {
                    key: e
                });
                const t = this.forms.get(e);
                return V.assertFormExists(t), t.close()
            }
            get(e) {
                return this.forms.get(e)
            }
            static assertFormExists(e) {
                if (!e) throw new Error("12")
            }
        }
        class W {
            constructor(e, t, i, n, s, a, o, r, c, l) {
                this.elements = e, this.tracker = t, this.urlRouter = i, this.window = n, this.embedConfig = s, this.embedForms = a, this.localeConfig = o, this.isMobile = r, this.companyKey = c, this.apiHost = l, this.forms = this.instantiateForms()
            }
            openForm(e, t, i) {
                const n = this.getElement(e);
                return this.forms.create(t, e, {
                    elementParams: n,
                    url: this.window.location.href,
                    queryParams: null == i ? void 0 : i.queryParams,
                    companyKey: this.companyKey,
                    fundraisingPage: (null == i ? void 0 : i.fundraisingPage) || null,
                    isRTL: this.isRTL(null == n ? void 0 : n.data)
                }, this.apiHost).then((() => this.forms.open(e)))
            }
            resolveAndOpen(e) {
                return this.embedForms.open(e)
            }
            isRTL(e) {
                if (null == e || !e.widget || e.widget.useCompanyInterfaceLocales) return "rtl" === (0, S.N_)(this.localeConfig.code);
                const t = (0, S.n7)(this.localeConfig.code, e.widget.supportedLanguages, e.widget.defaultLocale);
                return "rtl" === (0, S.N_)(t)
            }
            instantiateForms() {
                const e = new V(this.tracker, this.urlRouter, this.window, {
                    embedConfig: this.embedConfig,
                    isMobile: this.isMobile,
                    localeConfig: this.localeConfig
                });
                return e.register("p2p", {
                    getModule: () => Promise.all([o.e(9554), o.e(1199), o.e(8106), o.e(1211), o.e(1416), o.e(5164), o.e(8113)]).then(o.bind(o, 67666)),
                    getStyles: e => e ? o.e(8874).then(o.t.bind(o, 58874, 23)) : o.e(2121).then(o.t.bind(o, 22121, 23))
                }), e
            }
            getElement(e) {
                return this.elements[e.toUpperCase()]
            }
        }
        var Z = o(63821),
            X = o(46063);
        class J {
            constructor(e, t, i, n, s) {
                this.embedElementsApi = e, this.embedElementsService = t, this.debug = i, this.tracker = n, this.eventEmitter = s, this.elements = new Map, this.suspendedElements = new Map, this.timeoutHandle = 0, this.ready = !1
            }
            setupAutoRefresh() {
                !this.ready && this.elements.size && (this.eventEmitter.on("checkoutClose", (e => {
                    let {
                        donation: t
                    } = e;
                    t && (this.debug.log("update elements data on checkout close"), clearTimeout(this.timeoutHandle), this.forceUpdateData())
                })), document.addEventListener("visibilitychange", (() => {
                    if (this.pageVisible) {
                        var e;
                        const t = Date.now(),
                            i = t - (null !== (e = this.lastCheckTimestamp) && void 0 !== e ? e : t);
                        this.scheduleUpdate(i), this.lastCheckTimestamp = void 0
                    } else this.lastCheckTimestamp = Date.now()
                })), this.scheduleUpdate(), this.ready = !0, this.embedElementsApi.onElementsLoad((e => this.processLoadedElements(e))))
            }
            forceRefresh() {
                clearTimeout(this.timeoutHandle), this.refreshData()
            }
            processLoadedElements(e) {
                if (this.scheduleUpdate(), null == e || !e.elements) return;
                const t = this.getRefreshableElements();
                e.elements.forEach((e => {
                    const i = t.get(e.key);
                    i && i.forEach((t => t.updateData(e.data)))
                }))
            }
            addElementToRefresh(e) {
                this.elements.set(e, e), this.scheduleUpdate()
            }
            startRefreshForElement(e) {
                this.suspendedElements.delete(e), this.scheduleUpdate()
            }
            stopRefreshForElement(e) {
                this.suspendedElements.set(e, e), this.scheduleUpdate()
            }
            get pageVisible() {
                return "visible" === document.visibilityState
            }
            get elementValues() {
                return function(e) {
                    const t = [];
                    return e.forEach((function(e) {
                        t.push(e)
                    })), t
                }(this.elements)
            }
            updateByDataEndpoint(e) {
                const t = this.getRefreshableElements(),
                    i = e.map((e => e.elementKey)),
                    n = new Set(i);
                this.embedElementsService.getData([...n], !1).then((e => {
                    Object.values(e).forEach((e => {
                        e.forEach((e => {
                            e.elements.forEach((i => {
                                const n = t.get(i);
                                n && n.length && n.forEach((t => t.updateData(e.data)))
                            }))
                        }))
                    }))
                }))
            }
            updateByElementCall(e) {
                e.forEach((e => e.refreshData()))
            }
            updateByJSONP(e) {
                const t = e.map((e => e.elementKey));
                this.embedElementsApi.getElements(t)
            }
            forceUpdateData() {
                const e = this.getRefreshableElementsFlat(),
                    t = e.filter((e => e.elementType !== A.a.DONOR_MAP));
                this.updateByDataEndpoint(t);
                const i = e.filter((e => e.elementType === A.a.DONOR_MAP));
                this.updateByElementCall(i)
            }
            refreshData() {
                const e = this.getRefreshableElementsFlat();
                if (!e.length) return void clearTimeout(this.timeoutHandle);
                const t = e.filter((e => e.elementType !== A.a.DONOR_MAP));
                this.updateByJSONP(t);
                const i = e.filter((e => e.elementType === A.a.DONOR_MAP));
                this.updateByElementCall(i), this.scheduleUpdate()
            }
            scheduleUpdate() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                clearTimeout(this.timeoutHandle);
                let t = X.wn - e;
                t < 0 && (t = 0), this.timeoutHandle = window.setTimeout((() => {
                    this.pageVisible && this.refreshData()
                }), t)
            }
            getRefreshableElements() {
                const e = new Map;
                return this.elementValues.forEach((t => {
                    if (!this.suspendedElements.has(t)) {
                        const i = e.get(t.elementKey) || [];
                        i.push(t), e.set(t.elementKey, i)
                    }
                })), e
            }
            getRefreshableElementsFlat() {
                return this.elementValues.filter((e => !this.suspendedElements.has(e)))
            }
        }
        var $ = o(538);
        class j {
            constructor() {
                var e;
                this.backdrop = (0, i.w)().get(1), this.storage = (0, i.w)().get(8), this.data = this.storage.getField("lightbox") || {}, this.lastSuccessDonationAt = null !== (e = this.storage.getField("lastSuccessDonationAt")) && void 0 !== e ? e : 0
            }
            get isWidgetOpen() {
                return this.backdrop.isExists
            }
            get isInteractionExpired() {
                return Date.now() > this.interactionAt + j.INTERACTION_LIMIT
            }
            get isSuccessDonationExpired() {
                return Date.now() > this.lastSuccessDonationAt + j.DONATION_LIMIT
            }
            beforeAppear(e) {
                e.hideBackdrop || this.backdrop.render(!1)
            }
            beforeHide(e) {
                this.interactionAt = Date.now(), e.hideBackdrop && this.backdrop.isExists && this.backdrop.remove()
            }
            get interactionAt() {
                var e;
                return null !== (e = this.data.interactionAt) && void 0 !== e ? e : 0
            }
            set interactionAt(e) {
                this.data.interactionAt = e, this.storage.setField("lightbox", this.data)
            }
        }
        j.INTERACTION_LIMIT = $.MS.HOUR, j.DONATION_LIMIT = $.MS.HOUR;
        class z {
            constructor() {
                this.storage = (0, i.w)().get(8)
            }
            get manuallyClosed() {
                var e;
                return null !== (e = (this.storage.getField("messageBar") || {}).manuallyClosed) && void 0 !== e && e
            }
            markAsManuallyClosed() {
                this.storage.setField("messageBar", {
                    manuallyClosed: !0
                })
            }
        }
        var Q, q = o(65936),
            ee = o(86011);
        class te {
            constructor(e, t, n, s, a, o) {
                this.eventBus = e, this.eventEmitter = t, this.debug = n, this.funSessionStorage = s, this.window = a, this.embedMeta = o, this.reminder = null, this.preventShow = !1, this.keysKeeper = (0, i.w)().get(3), this.backdrop = (0, i.w)().get(1)
            }
            get checkoutIntent() {
                var e;
                return null !== (e = this.funSessionStorage.getField("intent")) && void 0 !== e ? e : null
            }
            clearCheckoutIntent() {
                this.debug.log("clear checkout intent", {
                    donationIntent: this.checkoutIntent
                }), this.funSessionStorage.removeField("intent")
            }
            setupReminder(e) {
                if (window.ELEMENT_REMINDER_DISABLE) return void this.debug.log("REMINDER IS DISABLED");
                if (this.reminderElement = e, this.eventEmitter.on("checkoutBeforeOpen", (() => {
                        this.preventShow = !0, this.reminder && (this.debug.log("hide reminder before checkout open"), this.reminder.hide())
                    })), this.eventEmitter.on("donationComplete", (() => {
                        this.reminder && (this.debug.log("hide reminder after donation complete"), this.reminder.hide()), this.clearCheckoutIntent()
                    })), this.eventEmitter.on("checkoutIntent", (e => {
                        this.preventShow = !1, this.reminder && (this.debug.log("hide reminder if checkout intent changes"), this.reminder.hide()), e ? (this.funSessionStorage.setField("intent", e), this.createReminder(this.checkoutIntent)) : this.clearCheckoutIntent()
                    })), this.backdrop.isExists) return;
                const t = this.checkoutIntent;
                t && t.campaign && this.createReminder(t)
            }
            createReminder(e) {
                if (this.debug.log("try to create reminder"), !e) return void this.debug.log("there is not intent for reminder");
                if (this.preventShow) return void this.debug.log("prevent reminder show");
                if (!this.keysKeeper.exists("WIDGET", e.campaign.id || "")) return void this.debug.log("campaign does not exist");
                if (this.reminder) return this.debug.log("show reminder with intent", {
                    intent: e
                }), void this.reminder.showWith(e);
                const t = () => {
                    if (!this.reminderElement) return void this.debug.log("reminder config does not exist");
                    this.eventBus.dispatch(ee.J.REMINDER_NEED_SHOW_FIRST), this.debug.log("render reminder with config", {
                        reminderConfig: this.reminderElement
                    });
                    const t = this.window.document.createElement("a");
                    this.window.document.body.appendChild(t), this.eventBus.dispatch(ee.J.CREATE, {
                        name: this.reminderElement.type,
                        params: {
                            elementKey: this.reminderElement.key,
                            elementType: A.a.REMINDER,
                            elementName: this.reminderElement.name,
                            config: this.reminderElement.config,
                            meta: this.embedMeta,
                            elementFoundTimestamp: Date.now()
                        },
                        showcase: !1,
                        node: t,
                        onCreate: t => this.onCreate(t, e)
                    })
                };
                if (this.window.document.body) return t();
                (0, q.c7)(this.window.document, t)
            }
            onCreate(e, t) {
                e && (this.reminder = e, this.preventShow ? this.debug.log("prevent reminder components render") : this.reminder.showWith(t))
            }
        }! function(e) {
            e.AFTER_BEGIN = "afterbegin", e.BEFORE_END = "beforeend"
        }(Q || (Q = {}));
        class ie {
            constructor(e) {
                this.availableElements = [], this.isTestEnv = e.isTestEnv, this.eventBus = e.eventBus, this.debug = e.debug, this.globalElements = e.globalElements, this.window = e.window
            }
            get hasElementsToRender() {
                return Boolean(this.availableElements.length)
            }
            initialize() {
                this.availableElements = this.getAvailableElements()
            }
            render() {
                this.availableElements.forEach((e => {
                    if (!this.isElementAvailable(e)) return;
                    const t = this.window.document.createElement("a"),
                        i = this.getInsertPosition(e);
                    this.insertNode(t, i), this.eventBus.dispatch(ee.J.CREATE, {
                        name: e.type,
                        params: {
                            elementKey: e.key,
                            elementType: this.type,
                            config: e.config,
                            elementName: e.name,
                            data: e.data,
                            elementFoundTimestamp: Date.now()
                        },
                        showcase: !1,
                        node: t
                    }), this.afterEachElementRender(e)
                }))
            }
            getGlobalElementsByCurrentType(e) {
                return e.filter((e => (!this.isTestEnv || window.FUN_FORCE_GLOBAL_ELEMENT === e.key) && e.type === this.type))
            }
            afterEachElementRender(e) {}
            getInsertPosition(e) {
                return Q.BEFORE_END
            }
            insertNode(e, t) {
                this.window.document.body.insertAdjacentElement(t, e)
            }
            getAvailableElements() {
                return this.getGlobalElementsByCurrentType(this.globalElements).filter((e => this.isElementAvailable(e) && this.window.document.body))
            }
        }
        var ne = o(88856);
        class se {
            constructor(e) {
                if (this.slots = new Map, se.instances.has(e)) return se.instances.get(e);
                Object.keys(ne.pW).forEach((e => {
                    e in ne.pW && this.slots.set(ne.pW[e], !0)
                })), se.instances.set(e, this)
            }
            isFree(e) {
                return this.slots.has(e) || console.warn("It is not possible to take an unknown slot " + e), this.slots.get(e) || !1
            }
            take(e) {
                if (this.isFree(e)) return this.slots.set(e, !1);
                console.warn("It is not possible to take an occupied slot " + e)
            }
        }
        se.instances = new Map;
        const ae = se;
        class oe extends ie {
            constructor() {
                super(...arguments), this.type = A.a.LIGHTBOX, this.slots = new ae(this.type), this.slot = ne.pW.CENTER
            }
            isElementAvailable(e) {
                return this.slots.isFree(this.slot)
            }
            afterEachElementRender(e) {
                this.slots.take(this.slot)
            }
        }
        var re = o(5541);
        class ce extends ie {
            constructor() {
                super(...arguments), this.type = A.a.MESSAGE_BAR, this.availableElements = [], this.slots = new ae(this.type)
            }
            static getSlotByPosition(e) {
                if (e === re.F.TOP) return ne.pW.TOP_CENTER;
                if (e === re.F.BOTTOM) return ne.pW.BOTTOM_CENTER;
                throw new Error('Position "' + e + '" is not supported by Message Bar')
            }
            static shouldNotTakeSlot(e) {
                return e === re.F.BEFORE_CONTENT
            }
            getElementWithBottomPosition() {
                const e = this.availableElements.find((e => ce.getSlotByPosition(e.config.panelPosition) === ne.pW.BOTTOM_CENTER));
                return e ? e.key : null
            }
            getIsBottomPosition() {
                return this.availableElements.some((e => ce.getSlotByPosition(e.config.panelPosition) === ne.pW.BOTTOM_CENTER))
            }
            isElementAvailable(e) {
                if (ce.shouldNotTakeSlot(e.config.panelPosition)) return !0;
                const t = ce.getSlotByPosition(e.config.panelPosition);
                return this.slots.isFree(t)
            }
            afterEachElementRender(e) {
                if (ce.shouldNotTakeSlot(e.config.panelPosition)) return;
                const t = ce.getSlotByPosition(e.config.panelPosition);
                this.slots.take(t)
            }
            getInsertPosition(e) {
                return e.config.panelPosition === re.F.BEFORE_CONTENT ? Q.AFTER_BEGIN : Q.BEFORE_END
            }
        }
        class le extends ie {
            constructor(e) {
                super(e), this.type = A.a.SOCIAL_PROOF, this.slots = new ae(this.type), this.slot = ne.pW.LEFT_BOTTOM, this.isMobile = e.isMobile, this.reminderNeedShownFirst = e.reminderNeedShownFirst, this.localeConfig = e.localeConfig
            }
            isElementAvailable(e) {
                return this.slots.isFree(this.slot) && !(this.isMobile && this.reminderNeedShownFirst)
            }
            afterEachElementRender(e) {
                this.slots.take(this.slot)
            }
        }
        class de extends ie {
            constructor() {
                super(...arguments), this.type = A.a.STICKY_BUTTON, this.slots = new ae(this.type)
            }
            isElementAvailable(e) {
                return this.slots.isFree(e.config.align)
            }
            afterEachElementRender(e) {
                this.slots.take(e.config.align)
            }
        }
        var ue, me, Ee = o(51710),
            he = o(44313),
            _e = o(24100);
        ! function(e) {
            e.BETWEEN_SETS = "betweenSets", e.BETWEEN_SESSIONS = "betweenSessions", e.BETWEEN_SHOW_UPS = "betweenShowUps"
        }(ue || (ue = {})),
        function(e) {
            e.BIG = "big", e.MEDIUM = "medium", e.SMALL = "small"
        }(me || (me = {}));
        const Te = {
                [ue.BETWEEN_SETS]: {
                    min: $.MS.MINUTE,
                    max: 3 * $.MS.MINUTE
                },
                [ue.BETWEEN_SESSIONS]: {
                    min: 10 * $.MS.SECOND,
                    max: 25 * $.MS.SECOND
                },
                [ue.BETWEEN_SHOW_UPS]: {
                    min: 2 * $.MS.SECOND,
                    max: 5 * $.MS.SECOND
                }
            },
            Ae = {
                [me.BIG]: {
                    min: 3,
                    max: 6
                },
                [me.MEDIUM]: {
                    min: 2,
                    max: 4
                },
                [me.SMALL]: {
                    min: 1,
                    max: 4
                }
            };
        class De {
            constructor() {
                this.experiments = (0, i.w)().get(28)
            }
            getTimeouts() {
                return this.getSetOfTimeouts().flat()
            }
            getTimeout(e) {
                const t = Te[e];
                if (!t) throw new he.HP(e);
                return (0, _e.r)(t.min, t.max)
            }
            get sessionShowUpsRange() {
                return Ae
            }
            getSetOfTimeouts() {
                const e = [];
                let t = !1;
                for (let i = 0; i < 4; i++) {
                    const n = i ? me.SMALL : me.BIG;
                    let s = this.getItemsCount(n);
                    if (!s && t && (s = this.getItemsCount(me.MEDIUM)), s || t || (t = !0), s) {
                        const t = this.getSessionOfTimeouts(s);
                        e.push(t)
                    }
                    if (i + 1 !== 4) {
                        const t = this.getTimeout(ue.BETWEEN_SESSIONS);
                        e.push([t])
                    }
                }
                const i = this.getTimeout(ue.BETWEEN_SETS);
                return e.push([i]), e
            }
            getSessionOfTimeouts(e) {
                return Array.from({
                    length: e
                }, ((e, t) => this.getTimeout(ue.BETWEEN_SHOW_UPS)))
            }
            getItemsCount(e) {
                const t = this.sessionShowUpsRange[e];
                if (!t) throw new he.HP(e);
                const i = t.min - 1,
                    n = t.max - 1;
                return (0, _e.r)(i, n)
            }
        }

        function ge(e) {
            const t = (0, i.w)().get(8),
                n = new De;
            return new Ee.SG(t, n, e.eventEmitter)
        }
        var Re = o(96580);
        class pe {
            constructor(e) {
                this.globalElements = [], this._reminderNeedShownFirst = !1, this.messageBar = null;
                const {
                    reminderApi: t,
                    autoRefreshApi: i,
                    testModePanelApi: n,
                    socialProofApi: s,
                    messageBarApi: a,
                    lightboxApi: o
                } = this.instantiateAPIs(e);
                this.reminderApi = t, this.autoRefreshApi = i, this.testModePanelApi = n, this.socialProofApi = s, this.messageBarApi = a, this.lightboxApi = o, this.eventBus = e.eventBus, this.debug = e.debug, this.isMobile = e.isMobile, this.window = e.window, this.env = e.env, this.localeConfig = e.localeConfig, this.setupTestModePanel(e.eventEmitter), this.subscribeToEvents()
            }
            get reminderNeedShownFirst() {
                return this._reminderNeedShownFirst
            }
            set reminderNeedShownFirst(e) {
                this._reminderNeedShownFirst = e
            }
            getApi(e) {
                switch (e) {
                    case 1:
                        return this.messageBarApi;
                    case 2:
                        return this.socialProofApi;
                    case 3:
                        return this.autoRefreshApi;
                    case 4:
                        return this.lightboxApi;
                    case 5:
                        return this.reminderApi;
                    default:
                        throw new Error(`Unknown element api "${e}"`)
                }
            }
            async renderGlobalElements(e) {
                if (this.debug.log("create global elements", {
                        globalElements: e
                    }), !e.length) return;
                const t = e.filter((e => e.type === A.a.REMINDER))[0];
                this.reminderApi.setupReminder(t);
                const i = [Z.hY.DEVELOPMENT, Z.hY.STAGING, Z.hY.TESTING].includes(this.env),
                    n = new de({
                        eventBus: this.eventBus,
                        window: this.window,
                        isTestEnv: i,
                        globalElements: e,
                        debug: this.debug.createInstance("Sticky Button Renderer")
                    });
                n.initialize();
                const s = new ce({
                    eventBus: this.eventBus,
                    isTestEnv: i,
                    window: this.window,
                    globalElements: e,
                    debug: this.debug.createInstance("Message Bar Renderer")
                });
                s.initialize();
                const a = new le({
                    eventBus: this.eventBus,
                    isTestEnv: i,
                    window: this.window,
                    globalElements: e,
                    debug: this.debug.createInstance("Social Proof Renderer"),
                    isMobile: this.isMobile,
                    reminderNeedShownFirst: this.reminderNeedShownFirst,
                    localeConfig: this.localeConfig
                });
                a.initialize();
                const o = new oe({
                    eventBus: this.eventBus,
                    isTestEnv: i,
                    window: this.window,
                    globalElements: e,
                    debug: this.debug.createInstance("Lightbox Renderer")
                });
                o.initialize(), o.render(), n.render(), s.render(), this.renderSocialProof(a, s)
            }
            getMessageBar() {
                return this.messageBar
            }
            renderSocialProof(e, t) {
                t.getElementWithBottomPosition() ? this.messageBarApi.manuallyClosed ? e.render() : this.eventBus.subscribe(ee.J.ON_RENDER, (t => {
                    t.type === A.a.MESSAGE_BAR && (this.messageBar = t.instance, e.render())
                })) : e.render()
            }
            subscribeToEvents() {
                this.eventBus.subscribe(ee.J.REMINDER_NEED_SHOW_FIRST, (() => {
                    this._reminderNeedShownFirst = !0
                })), this.eventBus.subscribe(ee.J.CREATE, (e => {
                    e.params.elementType && (0, N.CH)(e.params.elementType) && this.globalElements.push(e.params)
                }))
            }
            instantiateAPIs(e) {
                return {
                    reminderApi: new te(e.eventBus, e.eventEmitter, e.debug.createInstance("Reminder API"), e.funSessionStorage, e.window, e.embedConfig.meta),
                    testModePanelApi: new Re.S(e.eventBus, e.window, e.livemode, e.debug.createInstance("Test Mode Panel API"), e.isDashboard),
                    socialProofApi: ge(e),
                    messageBarApi: new z,
                    autoRefreshApi: new J(e.embedElementsApi, e.embedElementsService, e.debug.createInstance("Auto Refresh API"), e.tracker, e.eventEmitter),
                    lightboxApi: new j
                }
            }
            setupTestModePanel(e) {
                this.testModePanelApi.createPanel(), e.on("checkoutOpen", (() => {
                    this.testModePanelApi.hide()
                })), e.on("checkoutClose", (() => {
                    this.testModePanelApi.show()
                }))
            }
        }
        class Ne {
            static createElementsFactory() {
                const e = new G;
                return e.elements(H), e
            }
            constructor(e, t, i, n, s, a, o, r, c, l, d, u, m, E, h, _, T, A, D, g, R, p, N, f, S) {
                this.embedElementsService = e, this.userInteraction = t, this.loadedTimestamp = i, this.embedElementsApi = n, this.embedFormApi = s, this.apiHost = a, this.window = o, this.debug = r, this.tracker = c, this.eventEmitter = l, this.funSessionStorage = d, this.keysKeeper = u, this.env = m, this.livemode = E, this.isMobile = h, this.localeConfig = _, this.urlRouter = T, this.embedConfig = A, this.companyKey = D, this.isMobileView = g, this.guessedCurrencyService = R, this.currencyService = p, this.suggestionsService = N, this.userSession = f, this.sentryClient = S, this.elements = {}, this.elementsInstances = new Map, this.elementsReady = !1, this.nodes = new WeakMap, this.setTestModePanelMeta(), this.elementsFactory = Ne.createElementsFactory(), this.eventBus = this.createEventBus(), this.globalElementsRepository = new pe({
                    window: o,
                    eventEmitter: l,
                    funSessionStorage: d,
                    debug: r,
                    eventBus: this.eventBus,
                    embedElementsApi: n,
                    embedConfig: A,
                    embedElementsService: e,
                    livemode: E,
                    tracker: c,
                    isDashboard: this.isDashboard,
                    isMobile: this.isMobile,
                    env: m,
                    localeConfig: _
                }), this.formOpener = new W(this.elements, this.tracker, this.urlRouter, this.window, this.embedConfig, this.embedFormApi, this.localeConfig, this.isMobile, this.companyKey, this.apiHost)
            }
            get globalElements() {
                return this.globalElementsRepository.globalElements
            }
            getRenderedElementsByType(e) {
                return Object.values(this.elements).filter((t => t.type === e)).map((e => e.key))
            }
            createTestModePanel(e, t) {
                let i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this.livemode;
                new Re.A(this.eventBus, e, i, this.debug).createPanel(t)
            }
            async addElements(e) {
                let {
                    elements: t,
                    globalElements: i,
                    nodes: n
                } = e;
                this.debug.log("add elements", {
                    elements: t,
                    globalElements: i
                }), t.forEach((e => {
                    this.elements[e.key] = e
                }));
                const s = [];
                if (i && i.length && !this.isDashboard) {
                    const e = this.globalElementsRepository.renderGlobalElements(i);
                    s.push(e)
                }
                const a = this.createElements(n);
                s.push(a), this.elementsReady || (this.elementsReady = !0), Promise.allSettled ? await Promise.allSettled(s) : await Promise.all(s)
            }
            getElementInstance(e) {
                return this.elementsInstances.get(e) || null
            }
            async createElementByType(e, t, i, n) {
                var s, a, o;
                const r = await w({
                    elementsFactory: this.elementsFactory,
                    name: e,
                    globalElementsRepository: this.globalElementsRepository,
                    formOpener: this.formOpener,
                    userInteraction: this.userInteraction,
                    loadedTimestamp: this.loadedTimestamp,
                    embedElementsService: this.embedElementsService,
                    elementKey: t.elementKey,
                    elementType: t.elementType,
                    elementName: t.elementName,
                    config: t.config,
                    externalConfig: t.externalConfig,
                    mlConfig: t.mlConfig,
                    data: t.data,
                    deviceType: t.deviceType,
                    queryParams: t.queryParams,
                    meta: this.embedConfig.meta,
                    localeConfig: this.localeConfig,
                    tracker: this.tracker,
                    isMobile: this.isMobile,
                    isAndroid: "Android" === this.embedConfig.browserData.os.name,
                    isMobileView: this.isMobileView,
                    companyKey: this.companyKey,
                    window: this.window,
                    guessedCurrencyService: this.guessedCurrencyService,
                    env: this.env,
                    currencyService: this.currencyService,
                    suggestionsService: this.suggestionsService,
                    userSession: this.userSession,
                    countryCode: null === (s = this.embedConfig.meta) || void 0 === s || null === (a = s.user) || void 0 === a || null === (o = a.location) || void 0 === o ? void 0 : o.countryCode,
                    positioning: t.positioning,
                    elementFoundTimestamp: t.elementFoundTimestamp,
                    company: this.company,
                    showcase: i,
                    node: n,
                    experimentsConfig: this.embedConfig.experimentsConfig || {
                        experiments: []
                    },
                    staticUrl: this.embedConfig.staticConfig.staticUrl,
                    apiUrl: this.embedConfig.staticConfig.apiUrl,
                    currentPageQueryParams: this.embedConfig.queryParams,
                    currencyRates: this.embedConfig.data.currencyRates,
                    sentryClient: this.sentryClient,
                    onRender: e => this.onRender(e)
                });
                return this.elementsInstances.set(r.elementKey, r), r
            }
            get isDashboard() {
                return !0 === window.FUN_DASHBOARD
            }
            get company() {
                return this.embedConfig.currentCompany
            }
            onRender(e) {
                this.eventBus.dispatch(ee.J.ON_RENDER, {
                    elementKey: e.elementKey,
                    type: e.elementType,
                    instance: e
                })
            }
            async createElement(e, t) {
                this.debug.log("_createUIV2 call", {
                    element: e,
                    params: t
                });
                try {
                    const i = await this.createElementByType(e.type, {
                        elementKey: t.key,
                        elementType: e.type,
                        elementName: e.name,
                        config: e.config,
                        externalConfig: e.externalConfig,
                        mlConfig: e.mlConfig,
                        data: e.data,
                        queryParams: null == t ? void 0 : t.queryParams,
                        meta: this.embedConfig.meta,
                        elementFoundTimestamp: t.elementFoundTimestamp
                    }, !1, t.node);
                    if (this.elementsInstances.set(t.key, i), t._instance = i.app, this.nodes.set(t.node, t), ne.Ue.includes(e.type)) {
                        const e = this.globalElementsRepository.getApi(3);
                        e.addElementToRefresh(i), e.setupAutoRefresh()
                    }
                } catch (t) {
                    f.includes(e.type) && this.sentryClient.captureException(t, {
                        elementKey: e.key,
                        hasMlConfig: Boolean(e.mlConfig),
                        hasExternalConfig: Boolean(e.externalConfig)
                    }), console.error("Error while creating element", t)
                }
            }
            createEventBus() {
                const e = new B;
                return e.subscribe(ee.J.CREATE, (e => {
                    this.createElementByType(e.name, e.params, e.showcase, e.node).then((t => {
                        e.onCreate && e.onCreate(t)
                    }))
                })), e
            }
            async createElements(e, t) {
                this.debug.log("create UI", {
                    elementParams: e,
                    data: t
                });
                const i = [];
                e.forEach((e => {
                    if (this.nodes.has(e.node)) return;
                    if (e.type === A.a.LINK && this.keysKeeper.exists("WIDGET", e.key)) {
                        const t = this.createElement({
                            key: "",
                            type: A.a.LINK,
                            name: "",
                            config: {
                                openWidget: e.key
                            },
                            data: null
                        }, e);
                        return this.nodes.set(e.node, e), void i.push(t)
                    }
                    if (e.type === A.a.FUNDRAISING_PAGE_INVITE_LINK) {
                        this.debug.log("create FAKE fundraising page invite link", {
                            key: e.key
                        });
                        const t = this.createElement({
                            key: e.key,
                            type: e.type,
                            name: "",
                            config: {
                                openWidget: ""
                            },
                            data: null
                        }, e);
                        return this.nodes.set(e.node, e), void i.push(t)
                    }
                    const t = this.elements[e.key];
                    if (t) {
                        if (!(0, N.CH)(t.type)) {
                            const n = this.createElement(t, e);
                            this.nodes.set(e.node, e), i.push(n)
                        }
                    } else e.type === A.a.DEBUG_PANEL && (this.debug.log("create fake element debug panel"), this.createElement({
                        key: "",
                        type: A.a.DEBUG_PANEL,
                        name: "",
                        config: {},
                        data: null
                    }, e)), this.debug.log("attempt to create an old element has failed", {
                        params: e
                    })
                })), Promise.allSettled ? await Promise.allSettled(i) : await Promise.all(i)
            }
            setTestModePanelMeta() {
                var e, t;
                const i = null === (e = this.embedConfig) || void 0 === e || null === (t = e.queryParams) || void 0 === t ? void 0 : t[p.oF];
                if (i && this.embedConfig.meta) {
                    const e = function(e) {
                        return function(e, t) {
                            const i = e[t];
                            return {
                                location: {
                                    countryCode: t,
                                    city: "TEST_PANEL",
                                    country: "TEST_PANEL"
                                },
                                langCurrencies: i || ["USD"],
                                countryCurrencies: i || ["USD"]
                            }
                        }(R, e)
                    }(i);
                    this.embedConfig.meta.user = {
                        location: e.location,
                        langCurrencies: e.langCurrencies,
                        countryCurrencies: e.countryCurrencies
                    }
                }
            }
        }
        const fe = (0, i.w)();
        fe.provide(18, (() => {
            const t = window.FUN.tracker,
                i = new l(window),
                o = fe.get(17),
                c = fe.get(13),
                d = fe.get(9),
                u = fe.get(12),
                m = fe.get(6).createInstance("ElementsApi"),
                E = fe.get(3),
                h = new g(E, window),
                _ = new s.m,
                T = new n.t(_, c.data.currencyRates),
                A = new r.C(T),
                D = new a.P(T),
                R = fe.get(8),
                p = fe.get(25),
                N = window.innerWidth < 768,
                f = fe.get(19),
                S = fe.get(27);
            return new Ne(o, i, c.loadedTimestamp, d, u, e, window, m, t, f, R, E, c.server.env, c.livemode, c.isMobile, c.locale, h, c, c.currentCompanyKey, N, D, T, A, p, S)
        }))
    })()
})();