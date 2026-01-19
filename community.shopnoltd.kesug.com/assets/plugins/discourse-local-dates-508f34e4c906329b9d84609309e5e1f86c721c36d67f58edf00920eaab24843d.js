define("discourse/plugins/discourse-local-dates/discourse/components/modal/local-dates-create", ["exports", "@ember/component", "@ember/object", "@ember/object/computed", "@ember/runloop", "@ember-decorators/object", "discourse/lib/computed", "discourse/lib/local-dates", "discourse/lib/text", "discourse-common/config/environment", "discourse-common/utils/decorators", "discourse-i18n", "discourse/plugins/discourse-local-dates/lib/local-date-markup-generator", "@ember/template-factory"], (function(e, t, o, a, i, n, s, r, l, d, m, c, u, f) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = void 0
    const p = (0, f.createTemplateFactory)({
        id: "G8c0lIEZ",
        block: '[[[8,[39,0],[[24,0,"discourse-local-dates-create-modal -large"]],[["@title","@closeModal"],[[28,[37,1],["discourse_local_dates.title"],null],[30,1]]],[["body","footer"],[[[[1,"\\n    "],[10,0],[14,0,"form"],[12],[1,"\\n"],[41,[30,0,["isValid"]],[[[41,[30,0,["timezoneIsDifferentFromUserTimezone"]],[[[1,"          "],[10,0],[14,0,"preview alert alert-info"],[12],[1,"\\n            "],[1,[28,[35,1],["discourse_local_dates.create.form.current_timezone"],null]],[1,"\\n            "],[10,"b"],[12],[1,[30,0,["formattedCurrentUserTimezone"]]],[13],[1,[30,0,["currentPreview"]]],[1,"\\n          "],[13],[1,"\\n"]],[]],null]],[]],[[[1,"        "],[10,0],[14,0,"validation-error alert alert-error"],[12],[1,"\\n          "],[1,[28,[35,1],["discourse_local_dates.create.form.invalid_date"],null]],[1,"\\n        "],[13],[1,"\\n"]],[]]],[1,"\\n      "],[1,[30,0,["computeDate"]]],[1,"\\n\\n      "],[10,0],[14,0,"date-time-configuration"],[12],[1,"\\n        "],[10,0],[14,0,"inputs-panel"],[12],[1,"\\n          "],[10,0],[15,0,[29,["date-time-control from\\n              ",[52,[30,0,["fromSelected"]],"is-selected"],"\\n              ",[52,[30,0,["fromFilled"]],"is-filled"]]]],[12],[1,"\\n            "],[1,[28,[35,3],["calendar-days"],null]],[1,"\\n            "],[8,[39,4],[[24,1,"from-date-time"],[24,0,"date-time"],[24,"autofocus",""]],[["@action","@translatedLabel"],[[30,0,["focusFrom"]],[30,0,["formattedFrom"]]]],null],[1,"\\n          "],[13],[1,"\\n\\n          "],[10,0],[15,0,[29,["date-time-control to\\n              ",[52,[30,0,["toSelected"]],"is-selected"],"\\n              ",[52,[30,0,["toFilled"]],"is-filled"]]]],[12],[1,"\\n            "],[1,[28,[35,3],["calendar-days"],null]],[1,"\\n            "],[8,[39,4],[[24,0,"date-time"]],[["@action","@translatedLabel"],[[30,0,["focusTo"]],[30,0,["formattedTo"]]]],null],[1,"\\n"],[41,[30,0,["toFilled"]],[[[1,"              "],[8,[39,4],[[24,0,"delete-to-date"]],[["@action","@icon"],[[30,0,["eraseToDateTime"]],"xmark"]],null],[1,"\\n"]],[]],null],[1,"          "],[13],[1,"\\n\\n"],[41,[30,0,["site","desktopView"]],[[[1,"            "],[8,[39,5],null,[["@options","@value","@onChange"],[[28,[37,6],null,[["icon"],["globe"]]],[30,0,["timezone"]],[28,[37,7],[[28,[37,8],[[30,0,["timezone"]]],null]],null]]],null],[1,"\\n"]],[]],null],[1,"        "],[13],[1,"\\n\\n        "],[10,0],[14,0,"picker-panel"],[12],[1,"\\n          "],[8,[39,9],null,[["@datePickerId","@date","@time","@minDate","@timeFormat","@dateFormat","@onChangeDate","@onChangeTime"],["local-date-create-form",[30,0,["selectedDate"]],[30,0,["selectedTime"]],[30,0,["minDate"]],[30,0,["timeFormat"]],[30,0,["dateFormat"]],[30,0,["changeSelectedDate"]],[30,0,["changeSelectedTime"]]]],null],[1,"\\n        "],[13],[1,"\\n\\n"],[41,[30,0,["site","mobileView"]],[[[1,"          "],[8,[39,5],null,[["@value","@options","@onChange"],[[30,0,["timezone"]],[28,[37,6],null,[["icon"],["globe"]]],[28,[37,7],[[28,[37,8],[[30,0,["timezone"]]],null]],null]]],null],[1,"\\n"]],[]],null],[1,"      "],[13],[1,"\\n\\n"],[41,[30,0,["advancedMode"]],[[[1,"        "],[10,0],[14,0,"advanced-options"],[12],[1,"\\n"],[41,[51,[30,0,["isRange"]]],[[[1,"            "],[10,0],[14,0,"control-group recurrence"],[12],[1,"\\n              "],[10,"label"],[14,0,"control-label"],[12],[1,"\\n                "],[1,[28,[35,1],["discourse_local_dates.create.form.recurring_title"],null]],[1,"\\n              "],[13],[1,"\\n              "],[10,2],[12],[1,[28,[35,11],[[28,[37,1],["discourse_local_dates.create.form.recurring_description"],null]],null]],[13],[1,"\\n              "],[10,0],[14,0,"controls"],[12],[1,"\\n                "],[8,[39,12],[[24,0,"recurrence-input"]],[["@content","@value","@onChange","@options"],[[30,0,["recurringOptions"]],[30,0,["recurring"]],[28,[37,7],[[28,[37,8],[[30,0,["recurring"]]],null]],null],[28,[37,6],null,[["none"],["discourse_local_dates.create.form.recurring_none"]]]]],null],[1,"\\n              "],[13],[1,"\\n            "],[13],[1,"\\n"]],[]],null],[1,"\\n          "],[10,0],[14,0,"control-group timezones"],[12],[1,"\\n            "],[10,"label"],[12],[1,[28,[35,1],["discourse_local_dates.create.form.timezones_title"],null]],[13],[1,"\\n            "],[10,2],[12],[1,[28,[35,1],["discourse_local_dates.create.form.timezones_description"],null]],[13],[1,"\\n            "],[10,0],[14,0,"controls"],[12],[1,"\\n              "],[8,[39,13],[[24,0,"timezones-input"]],[["@valueProperty","@nameProperty","@content","@value","@options"],[null,null,[30,0,["allTimezones"]],[30,0,["timezones"]],[28,[37,6],null,[["allowAny","maximum"],[false,5]]]]],null],[1,"\\n            "],[13],[1,"\\n          "],[13],[1,"\\n\\n          "],[10,0],[14,0,"control-group format"],[12],[1,"\\n            "],[10,"label"],[12],[1,[28,[35,1],["discourse_local_dates.create.form.format_title"],null]],[13],[1,"\\n            "],[10,2],[12],[1,"\\n              "],[1,[28,[35,1],["discourse_local_dates.create.form.format_description"],null]],[1,"\\n              "],[10,3],[14,"target","_blank"],[14,6,"https://momentjs.com/docs/#/parsing/string-format/"],[14,"rel","noopener noreferrer"],[12],[1,"\\n                "],[1,[28,[35,3],["circle-question"],null]],[1,"\\n              "],[13],[1,"\\n            "],[13],[1,"\\n            "],[10,0],[14,0,"controls"],[12],[1,"\\n              "],[8,[39,14],[[24,0,"format-input"]],[["@value"],[[30,0,["format"]]]],null],[1,"\\n            "],[13],[1,"\\n          "],[13],[1,"\\n          "],[10,0],[14,0,"control-group"],[12],[1,"\\n            "],[10,"ul"],[14,0,"formats"],[12],[1,"\\n"],[42,[28,[37,16],[[28,[37,16],[[30,0,["previewedFormats"]]],null]],null],null,[[[1,"                "],[10,"li"],[14,0,"format"],[12],[1,"\\n                  "],[11,3],[24,0,"moment-format"],[24,6,""],[4,[38,17],["click",[28,[37,7],[[30,0,["updateFormat"]],[30,2,["format"]]],null]],null],[12],[1,"\\n                    "],[1,[30,2,["format"]]],[1,"\\n                  "],[13],[1,"\\n                  "],[10,1],[14,0,"previewed-format"],[12],[1,"\\n                    "],[1,[30,2,["preview"]]],[1,"\\n                  "],[13],[1,"\\n                "],[13],[1,"\\n"]],[2]],null],[1,"            "],[13],[1,"\\n          "],[13],[1,"\\n        "],[13],[1,"\\n"]],[]],null],[1,"    "],[13],[1,"\\n  "]],[]],[[[1,"\\n\\n"],[41,[30,0,["isValid"]],[[[1,"      "],[8,[39,4],[[24,0,"btn-primary"]],[["@action","@label"],[[30,0,["save"]],"discourse_local_dates.create.form.insert"]],null],[1,"\\n"]],[]],null],[1,"\\n    "],[8,[39,4],[[24,0,"btn-flat"]],[["@action","@translatedLabel"],[[30,0,["cancel"]],[28,[37,1],["cancel"],null]]],null],[1,"\\n\\n    "],[8,[39,4],[[24,0,"btn-default advanced-mode-btn"]],[["@action","@icon","@label"],[[30,0,["toggleAdvancedMode"]],"gear",[30,0,["toggleModeBtnLabel"]]]],null],[1,"\\n  "]],[]]]]]],["@closeModal","previewedFormat"],false,["d-modal","i18n","if","d-icon","d-button","timezone-input","hash","fn","mut","calendar-date-time-input","unless","html-safe","combo-box","multi-select","text-field","each","-track-array","on"]]',
        moduleName: "discourse/plugins/discourse-local-dates/discourse/components/modal/local-dates-create.hbs",
        isStrictMode: !1
    })
    class h extends t.default {
        timeFormat = "HH:mm:ss"
        dateFormat = "YYYY-MM-DD"
        dateTimeFormat = "YYYY-MM-DD HH:mm:ss"
        date = null
        toDate = null
        time = null
        toTime = null
        format = null
        formats = null
        recurring = null
        advancedMode = !1
        timezone = null
        fromSelected = null
        toSelected = null
        static# e = (() => dt7948.g(this.prototype, "fromFilled", [(0, a.notEmpty)("date")]))()# t = (() => {
            dt7948.i(this, "fromFilled")
        })()
        static# o = (() => dt7948.g(this.prototype, "toFilled", [(0, a.notEmpty)("toDate")]))()# a = (() => {
            dt7948.i(this, "toFilled")
        })()
        static# i = (() => dt7948.g(this.prototype, "timezoneIsDifferentFromUserTimezone", [(0, s.propertyNotEqual)("currentUserTimezone", "options.timezone")]))()# n = (() => {
            dt7948.i(this, "timezoneIsDifferentFromUserTimezone")
        })()
        init() {
            super.init(...arguments), this._picker = null, this.setProperties({
                timezones: [],
                formats: (this.siteSettings.discourse_local_dates_default_formats || "").split("|").filter((e => e)),
                timezone: this.currentUserTimezone,
                date: moment().format(this.dateFormat)
            })
        }
        didInsertElement() {
            super.didInsertElement(...arguments), this.send("focusFrom")
        }
        configChanged() {
            this._renderPreview()
        }
        static# s = (() => dt7948.n(this.prototype, "configChanged", [(0, n.observes)("computedConfig.{from,to,options}", "options", "isValid", "isRange")]))()
        async _renderPreview() {
            if (this.markup) {
                const e = await (0, l.cook)(this.markup)
                this.set("currentPreview", e), (0, i.schedule)("afterRender", (() => {
                    (0, r.applyLocalDates)(document.querySelectorAll(".preview .discourse-local-date"), this.siteSettings)
                }))
            }
        }
        static# r = (() => dt7948.n(this.prototype, "_renderPreview", [(0, m.debounce)(d.INPUT_DELAY)]))()
        isRange(e, t, o) {
            return e && (t || o)
        }
        static# l = (() => dt7948.n(this.prototype, "isRange", [(0, m.default)("date", "toDate", "toTime")]))()
        isValid(e, t) {
            const o = e.from
            if (!e.from.dateTime || !e.from.dateTime.isValid()) return !1
            if (t) {
                const t = e.to
                if (!t.dateTime || !t.dateTime.isValid() || t.dateTime.diff(o.dateTime) < 0) return !1
            }
            return !0
        }
        static# d = (() => dt7948.n(this.prototype, "isValid", [(0, m.default)("computedConfig", "isRange")]))()
        fromConfig(e, t, a) {
            let i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}
            const n = !t
            let s
            s = n ? moment.tz(e, i.timezone) : moment.tz(`${e} ${t}`, i.timezone), n || (t = s.format(this.timeFormat))
            let r = i.format
            return n && this.formats.includes(r) && (r = "LL"), o.default.create({
                date: s.format(this.dateFormat),
                time: t,
                dateTime: s,
                format: r,
                range: !!a && "start"
            })
        }
        static# m = (() => dt7948.n(this.prototype, "fromConfig", [(0, m.default)("date", "time", "isRange", "options.{format,timezone}")]))()
        toConfig(e, t, a) {
            let i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}
            const n = !t
            let s
            t && !e && (e = moment().format(this.dateFormat)), s = n ? moment.tz(e, i.timezone).endOf("day") : moment.tz(`${e} ${t}`, i.timezone), n || (t = s.format(this.timeFormat))
            let r = i.format
            return n && this.formats.includes(r) && (r = "LL"), o.default.create({
                date: s.format(this.dateFormat),
                time: t,
                dateTime: s,
                format: r,
                range: !!a && "end"
            })
        }
        static# c = (() => dt7948.n(this.prototype, "toConfig", [(0, m.default)("toDate", "toTime", "isRange", "options.{timezone,format}")]))()
        options(e, t, a, i) {
            return o.default.create({
                recurring: e,
                timezones: t,
                timezone: a,
                format: i
            })
        }
        static# u = (() => dt7948.n(this.prototype, "options", [(0, m.default)("recurring", "timezones", "timezone", "format")]))()
        computedConfig(e, t, a) {
            return o.default.create({
                from: e,
                to: t,
                options: a
            })
        }
        static# f = (() => dt7948.n(this.prototype, "computedConfig", [(0, m.default)("fromConfig.{date}", "toConfig.{date}", "options.{recurring,timezones,timezone,format}")]))()
        currentUserTimezone() {
            return this.currentUser.user_option.timezone || moment.tz.guess()
        }
        static# p = (() => dt7948.n(this.prototype, "currentUserTimezone", [m.default]))()
        allTimezones() {
            return moment.tz.names()
        }
        static# h = (() => dt7948.n(this.prototype, "allTimezones", [m.default]))()
        formattedCurrentUserTimezone(e) {
            return e.replace("_", " ").replace("Etc/", "").replace("/", ", ")
        }
        static# g = (() => dt7948.n(this.prototype, "formattedCurrentUserTimezone", [(0, m.default)("currentUserTimezone")]))()
        previewedFormats(e) {
            return e.map((e => ({
                format: e,
                preview: moment().format(e)
            })))
        }
        static# _ = (() => dt7948.n(this.prototype, "previewedFormats", [(0, m.default)("formats")]))()
        recurringOptions() {
            const e = "discourse_local_dates.create.form.recurring"
            return [{
                name: c.default.t(`${e}.every_day`),
                id: "1.days"
            }, {
                name: c.default.t(`${e}.every_week`),
                id: "1.weeks"
            }, {
                name: c.default.t(`${e}.every_two_weeks`),
                id: "2.weeks"
            }, {
                name: c.default.t(`${e}.every_month`),
                id: "1.months"
            }, {
                name: c.default.t(`${e}.every_two_months`),
                id: "2.months"
            }, {
                name: c.default.t(`${e}.every_three_months`),
                id: "3.months"
            }, {
                name: c.default.t(`${e}.every_six_months`),
                id: "6.months"
            }, {
                name: c.default.t(`${e}.every_year`),
                id: "1.years"
            }]
        }
        static# z = (() => dt7948.n(this.prototype, "recurringOptions", [m.default]))()
        _generateDateMarkup(e, t, o, a) {
            return (0, u.default)(e, t, o, a)
        }
        toggleModeBtnLabel(e) {
            return e ? "discourse_local_dates.create.form.simple_mode" : "discourse_local_dates.create.form.advanced_mode"
        }
        static# T = (() => dt7948.n(this.prototype, "toggleModeBtnLabel", [(0, m.default)("advancedMode")]))()
        markup(e, t, o, a) {
            let i
            return o && e.from && (i = e.to && e.to.range ? this._generateDateMarkup(e.from, t, a, e.to) : this._generateDateMarkup(e.from, t, a)), i
        }
        static# y = (() => dt7948.n(this.prototype, "markup", [(0, m.default)("computedConfig.{from,to,options}", "options", "isValid", "isRange")]))()
        formattedFrom(e) {
            return e.format("LLLL")
        }
        static# b = (() => dt7948.n(this.prototype, "formattedFrom", [(0, m.default)("fromConfig.dateTime")]))()
        formattedTo(e, t) {
            const o = t ? "&nbsp;" : c.default.t("discourse_local_dates.create.form.until")
            return e.isValid() ? e.format("LLLL") : o
        }
        static# v = (() => dt7948.n(this.prototype, "formattedTo", [(0, m.default)("toConfig.dateTime", "toSelected")]))()
        updateFormat(e, t) {
            t ? .preventDefault(), this.set("format", e)
        }
        static# w = (() => dt7948.n(this.prototype, "updateFormat", [o.action]))()
        selectedDate(e) {
            return e ? this.date : this.toDate
        }
        static# D = (() => dt7948.n(this.prototype, "selectedDate", [(0, m.default)("fromSelected", "toSelected")]))()
        selectedTime(e) {
            return e ? this.time : this.toTime
        }
        static# L = (() => dt7948.n(this.prototype, "selectedTime", [(0, m.default)("fromSelected", "toSelected")]))()
        changeSelectedDate(e) {
            this.fromSelected ? this.set("date", e) : this.set("toDate", e)
        }
        static# F = (() => dt7948.n(this.prototype, "changeSelectedDate", [o.action]))()
        changeSelectedTime(e) {
            this.fromSelected ? this.set("time", e) : this.set("toTime", e)
        }
        static# S = (() => dt7948.n(this.prototype, "changeSelectedTime", [o.action]))()
        eraseToDateTime() {
            this.setProperties({
                toDate: null,
                toTime: null
            }), this.focusFrom()
        }
        static# C = (() => dt7948.n(this.prototype, "eraseToDateTime", [o.action]))()
        focusFrom() {
            this.setProperties({
                fromSelected: !0,
                toSelected: !1,
                minDate: null
            })
        }
        static# $ = (() => dt7948.n(this.prototype, "focusFrom", [o.action]))()
        focusTo() {
            this.setProperties({
                toSelected: !0,
                fromSelected: !1,
                minDate: this.get("fromConfig.date")
            })
        }
        static# k = (() => dt7948.n(this.prototype, "focusTo", [o.action]))()
        toggleAdvancedMode() {
            this.toggleProperty("advancedMode")
        }
        static# P = (() => dt7948.n(this.prototype, "toggleAdvancedMode", [o.action]))()
        save() {
            const e = this.markup
            e && (this.closeModal(), this.model.insertDate(e))
        }
        static# E = (() => dt7948.n(this.prototype, "save", [o.action]))()
        cancel() {
            this.closeModal()
        }
        static# M = (() => dt7948.n(this.prototype, "cancel", [o.action]))()
    }
    e.default = h, (0, t.setComponentTemplate)(p, h)
})), define("discourse/plugins/discourse-local-dates/initializers/discourse-local-dates", ["exports", "@ember/owner", "@ember/service", "@ember/template", "discourse/lib/download-calendar", "discourse/lib/plugin-api", "discourse/lib/to-markdown", "discourse-common/lib/icon-library", "discourse-common/utils/decorators", "discourse-i18n", "discourse/plugins/discourse-local-dates/lib/local-date-markup-generator", "discourse/plugins/discourse-local-dates/discourse/components/modal/local-dates-create", "discourse/plugins/discourse-local-dates/lib/local-date-builder"], (function(e, t, o, a, i, n, s, r, l, d, m, c, u) {
    "use strict"

    function f(e, t) {
        if (!t.discourse_local_dates_enabled) return
        const o = moment.tz.guess()
        e.forEach(((e, a, i) => {
            const n = h(e, t)
            if ("to" === e.attributes["data-range"] ? .value && 0 !== a && "from" === i[a - 1].attributes["data-range"] ? .value) {
                (function(e, t) {
                    if (!e.attributes["data-time"] || !t.attributes["data-time"]) return !1
                    const o = e.attributes["data-timezone"].value,
                        a = moment(p(e)).tz(o),
                        i = moment(p(t)).tz(o)
                    return a.isSame(i, "day")
                })(i[a - 1], e) && (n.sameLocalDayAsFrom = !0)
            }
            const s = new u.default(n, o).build()
            e.innerText = "", e.insertAdjacentHTML("beforeend", `${(0,r.iconHTML)("earth-americas")}\n        <span class="relative-time">${s.formatted}</span>`), e.setAttribute("aria-label", s.textPreview)
            const l = ["cooked-date"]
            s.pastEvent && l.push("past"), e.classList.add(...l)
        }))
    }

    function p(e) {
        return `${e.attributes["data-date"].value}T${e.attributes["data-time"].value}`
    }

    function h(e, t) {
        const o = {},
            a = e.dataset
        return 2 === _(e).length && (o.duration = function(e) {
            const [t, o] = _(e).map((e => e.dataset)), a = moment(`${t.date} ${t.time||""}`.trim()), i = moment(`${o.date} ${o.time||""}`.trim()).diff(a, "minutes")
            return e.dataset === t ? i : -i
        }(e)), o.time = a.time, o.date = a.date, o.recurring = a.recurring, o.timezones = (a.timezones || t.discourse_local_dates_default_timezones || "Etc/UTC").split("|").filter(Boolean), o.timezone = a.timezone, o.calendar = "on" === (a.calendar || "on"), o.displayedTimezone = a.displayedTimezone, o.format = a.format || (o.time ? "LLL" : "LL"), o.countdown = a.countdown, o
    }

    function g(e) {
        const t = {}
        return t.time = e.attributes["data-time"], t.date = e.attributes["data-date"], t.recurring = e.attributes["data-recurring"], t.timezones = e.attributes["data-timezones"], t.timezone = e.attributes["data-timezone"], t.calendar = "on" === (e.attributes["data-calendar"] || "on"), t.displayedTimezone = e.attributes["data-displayed-timezone"], t.format = e.attributes["data-format"], t.countdown = e.attributes["data-countdown"], t.range = e.attributes["data-range"], t
    }

    function _(e) {
        return e.parentElement ? e.dataset.range ? function(e) {
            const t = [],
                o = Array.from(e.parentElement.children).filter((e => e.dataset.range))
            for (; o.length > 0;) t.push(o.splice(0, 2))
            return t
        }(e).find((t => t.includes(e))) : [e] : []
    }

    function z(e) {
        const t = e.container.lookup("service:site-settings"),
            a = d.default.t("discourse_local_dates.default_title", {
                site_name: t.title
            })
        e.decorateCookedElement(((e, o) => {
            const i = e.querySelectorAll(".discourse-local-date")
            f(i, t)
            const n = o ? .getModel() ? .topic ? .title
            i.forEach((e => {
                e.dataset.title = e.dataset.title || n || a
            }))
        })), e.onToolbarCreate((e => {
            e.addButton({
                title: "discourse_local_dates.title",
                id: "local-dates",
                group: "extras",
                icon: "calendar-days",
                sendAction: t => e.context.send("insertDiscourseLocalDate", t)
            })
        })), e.modifyClass("component:d-editor", {
            modal: (0, o.service)(),
            pluginId: "discourse-local-dates",
            actions: {
                insertDiscourseLocalDate(e) {
                    this.modal.show(c.default, {
                        model: {
                            insertDate: t => {
                                e.addText(t)
                            }
                        }
                    })
                }
            }
        }), (0, s.addTextDecorateCallback)((function(e, t, o, a) {
            if (a.discourseLocalDateStartRangeOpts && t ? .attributes.class ? .includes("discourse-local-date") && "→" === e) return ""
        })), (0, s.addTagDecorateCallback)((function() {
            if (this.element.attributes.class ? .includes("discourse-local-date")) {
                if (this.metadata.discourseLocalDateStartRangeOpts) {
                    const e = this.metadata.discourseLocalDateStartRangeOpts,
                        t = g(this.element),
                        o = (0, m.default)({
                            date: e.date,
                            time: e.time,
                            format: e.format
                        }, t, !0, {
                            date: t.date,
                            time: t.time,
                            format: t.format
                        })
                    return this.prefix = o, this.metadata.discourseLocalDateStartRangeOpts = null, ""
                }
                if ("true" === this.element.attributes["data-range"] || "from" === this.element.attributes["data-range"] || "to" === this.element.attributes["data-range"]) return this.metadata.discourseLocalDateStartRangeOpts = g(this.element), ""
                const e = g(this.element),
                    t = (0, m.default)({
                        date: e.date,
                        time: e.time,
                        format: e.format
                    }, e, !1)
                return this.prefix = t, ""
            }
        }))
    }

    function T(e, t) {
        const o = h(e, t),
            a = new u.default(o, moment.tz.guess()).build().previews.map((e => {
                const t = document.createElement("div")
                t.classList.add("preview"), e.current && t.classList.add("current")
                const o = document.createElement("span")
                o.classList.add("timezone"), o.innerText = e.timezone, t.appendChild(o)
                const a = document.createElement("span")
                return a.classList.add("date-time"), a.innerHTML = e.formatted, t.appendChild(a), t
            })),
            i = document.createElement("div")
        i.classList.add("locale-dates-previews"), a.forEach((e => i.appendChild(e)))
        const n = function(e) {
            const [t, o] = _(e).map((e => e.dataset)), [a, i] = function(e, t) {
                let o, a
                o = moment.tz(`${e.date} ${e.time||""}`.trim(), e.timezone), t && (a = moment.tz(`${t.date} ${t.time||""}`.trim(), t.timezone))
                return [o, a]
            }(t, o)
            if (a < moment().tz(t.timezone)) return !1
            const n = document.createElement("div")
            n.classList.add("download-calendar"), n.innerHTML = `${(0,r.renderIcon)("string","file")} ${d.default.t("download_calendar.add_to_calendar")}`, n.setAttribute("data-starts-at", a.toISOString()), o && n.setAttribute("data-ends-at", i.toISOString())
            t.time || o || n.setAttribute("data-ends-at", a.add(24, "hours").toISOString())
            return n.setAttribute("data-title", t.title), n
        }(e)
        return n && i.appendChild(n), i.outerHTML
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.applyLocalDates = f, e.default = void 0
    class y {
        static# e = (() => dt7948.g(this.prototype, "siteSettings", [o.service]))()# x = (() => {
            dt7948.i(this, "siteSettings")
        })()
        static# o = (() => dt7948.g(this.prototype, "tooltip", [o.service]))()# A = (() => {
            dt7948.i(this, "tooltip")
        })()
        constructor(e) {
            (0, t.setOwner)(this, e), window.addEventListener("click", this.showDatePopover, {
                passive: !0
            }), this.siteSettings.discourse_local_dates_enabled && (0, n.withPluginApi)("0.8.8", z)
        }
        showDatePopover(e) {
            if (e ? .target ? .classList ? .contains("download-calendar")) {
                const t = e.target.dataset
                return (0, i.downloadCalendar)(t.title, [{
                    startsAt: t.startsAt,
                    endsAt: t.endsAt
                }]), this.tooltip.close("local-date")
            }
            if (e ? .target ? .classList ? .contains("discourse-local-date")) return this.tooltip.show(e.target, {
                identifier: "local-date",
                content: (0, a.htmlSafe)(T(e.target, this.siteSettings))
            })
        }
        static# i = (() => dt7948.n(this.prototype, "showDatePopover", [l.bind]))()
        teardown() {
            window.removeEventListener("click", this.showDatePopover)
        }
    }
    e.default = {
        initialize(e) {
            this.instance = new y(e)
        },
        teardown() {
            this.instance.teardown(), this.instance = null
        }
    }
})), define("discourse/plugins/discourse-local-dates/lib/date-with-zone-helper", ["exports", "@ember/object"], (function(e, t) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = void 0
    class o {
        static fromDatetime(e, t, a) {
            return new o({
                year: e.year(),
                month: e.month(),
                day: e.date(),
                hour: e.hour(),
                minute: e.minute(),
                second: e.second(),
                timezone: t,
                localTimezone: a
            })
        }
        constructor() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
            this.timezone = e.timezone || "UTC", this.localTimezone = e.localTimezone || moment.tz.guess(), this.datetime = moment.tz((0, t.getProperties)(e, ["year", "month", "day", "hour", "minute", "second"]), this.timezone)
        }
        isDST() {
            return this.datetime.tz(this.localTimezone).isDST()
        }
        unitRepetitionsBetweenDates(e, t) {
            const [o, a] = e.split("."), i = Math.abs(this.datetime.diff(t, a, !0)), n = i / o % 1
            return Math.trunc(i / o) * parseInt(o, 10) + (n > 0 ? parseInt(o, 10) : 0)
        }
        add(e, t) {
            return this._fromDatetime(this.datetime.clone().add(e, t), this.timezone, this.localTimezone)
        }
        subtract(e, t) {
            return this._fromDatetime(this.datetime.clone().subtract(e, t), this.timezone, this.localTimezone)
        }
        datetimeWithZone(e) {
            return this.datetime.clone().tz(e)
        }
        format(e) {
            return e ? this.datetime.tz(this.localTimezone).format(e) : this.datetime.tz(this.localTimezone).toISOString(!0)
        }
        _fromDatetime(e, t, a) {
            return o.fromDatetime(e, t, a)
        }
    }
    e.default = o
})), define("discourse/plugins/discourse-local-dates/lib/discourse-markdown/discourse-local-dates", ["exports"], (function(e) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.setup = function(e) {
        e.allowList(["span.discourse-local-date", "span[aria-label]", "span[data-calendar]", "span[data-countdown]", "span[data-date]", "span[data-displayed-timezone]", "span[data-email-preview]", "span[data-format]", "span[data-recurring]", "span[data-time]", "span[data-timezone]", "span[data-timezones]"]), e.registerOptions(((e, t) => {
            e.datesEmailFormat = t.discourse_local_dates_email_format, e.features["discourse-local-dates"] = !!t.discourse_local_dates_enabled
        })), e.registerPlugin((e => {
            e.core.textPostProcess.ruler.push("date", {
                matcher: /\[date=.+?\]/,
                onMatch: a
            }), e.core.textPostProcess.ruler.push("date-range", {
                matcher: /\[date-range .+?\]/,
                onMatch: i
            })
        }))
    }, moment.tz.link(["Asia/Kolkata|IST", "Asia/Seoul|KST", "Asia/Tokyo|JST"])
    const t = moment.tz.names()

    function o(e, o, a, i) {
        e.timezone && (t.includes(e.timezone) || delete e.timezone), e.displayedTimezone && (t.includes(e.displayedTimezone) || delete e.displayedTimezone), e.timezones && (e.timezones = e.timezones.split("|").filter((e => t.includes(e))).join("|"))
        const n = moment.tz([e._default || e.date, e.time].filter(Boolean).join("T"), e.timezone || "Etc/UTC"),
            s = o.md.options.discourse.datesEmailFormat || moment.defaultFormat
        e.emailPreview = `${n.utc().format(s)} UTC`
        let r = new o.Token("span_open", "span", 1)
        r.attrs = [
            ["class", "discourse-local-date"]
        ], i(r, e, "date"), a.push(r), r = new o.Token("text", "", 0), r.content = n.utc().format(e.format), a.push(r), r = new o.Token("span_close", "span", -1), a.push(r)
    }

    function a(e, t, a, i) {
        let {
            parseBBCodeTag: n,
            applyDataAttributes: s
        } = i
        const r = n(t[0], 0, t[0].length)
        if ("date" === r ? .tag) o(r.attrs, a, e, s)
        else {
            let o = new a.Token("text", "", 0)
            o.content = t[0], e.push(o)
        }
    }

    function i(e, t, a, i) {
        let n, {
            parseBBCodeTag: s,
            applyDataAttributes: r
        } = i
        const l = s(t[0], 0, t[0].length)
        if ("date-range" === l ? .tag) {
            if (l.attrs.from) {
                const {
                    from: t,
                    ...i
                } = { ...l.attrs,
                    range: "from"
                }
                delete i.to, [i.date, i.time] = t.split("T"), o(i, a, e, r)
            }
            if (l.attrs.from && l.attrs.to && (n = new a.Token("text", "", 0), n.content = "→", e.push(n)), l.attrs.to) {
                const {
                    to: t,
                    ...i
                } = { ...l.attrs,
                    range: "to"
                }
                delete i.from, [i.date, i.time] = t.split("T"), o(i, a, e, r)
            }
        } else n = new a.Token("text", "", 0), n.content = t[0], e.push(n)
    }
})), define("discourse/plugins/discourse-local-dates/lib/local-date-builder", ["exports", "discourse-common/lib/icon-library", "discourse-i18n", "discourse/plugins/discourse-local-dates/lib/date-with-zone-helper"], (function(e, t, o, a) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = void 0
    const i = "h:mm A"
    e.default = class {
        constructor() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = arguments.length > 1 ? arguments[1] : void 0
            this.time = e.time, this.date = e.date, this.recurring = e.recurring, this.sameLocalDayAsFrom = e.sameLocalDayAsFrom, this.timezones = Array.from(new Set((e.timezones || []).filter(Boolean))), this.timezone = e.timezone || "UTC", this.calendar = void 0 === e.calendar || e.calendar, this.displayedTimezone = e.displayedTimezone, this.format = e.format || (this.time ? "LLL" : "LL"), this.countdown = e.countdown, this.duration = e.duration, this.localTimezone = t
        }
        build() {
            const [e, t, o] = this.date.split("-").map((e => parseInt(e, 10))), [i, n, s] = (this.time || "").split(":").map((e => e ? parseInt(e, 10) : void 0))
            let r
            r = this.time ? this.displayedTimezone || this.localTimezone : this.displayedTimezone || this.timezone || this.localTimezone
            let l = new a.default({
                year: e,
                month: t ? t - 1 : null,
                day: o,
                hour: i,
                minute: n,
                second: s,
                timezone: this.timezone,
                localTimezone: this.localTimezone
            })
            if (this.recurring && moment().isAfter(l.datetime)) {
                const e = this.recurring.split(".")[1],
                    t = l.unitRepetitionsBetweenDates(this.recurring, moment.tz(this.localTimezone))
                l = l.add(t, e)
            }
            const d = this._generatePreviews(l, r),
                m = void 0 !== i
            return {
                pastEvent: !this.recurring && moment.tz(this.localTimezone).isAfter(l.datetime),
                formatted: this._applyFormatting(l, r, m),
                previews: d,
                textPreview: this._generateTextPreviews(d)
            }
        }
        _generateTextPreviews(e) {
            return e.map((e => `${this._zoneWithoutPrefix(e.timezone)} ${e.formatted}`)).join(", ")
        }
        _generatePreviews(e, t) {
            const o = [],
                i = this.timezones.filter((e => !this._isEqualZones(e, this.localTimezone)))
            return o.push({
                timezone: this._zoneWithoutPrefix(this.localTimezone),
                current: !0,
                formatted: this._createDateTimeRange(a.default.fromDatetime(e.datetime, e.timezone, this.localTimezone), this.time, this.duration)
            }), !this.timezone || t !== this.localTimezone || this.timezone === t || this._isEqualZones(t, this.timezone) || this.timezones.any((e => this._isEqualZones(e, this.timezone))) || i.unshift(this.timezone), i.forEach((i => {
                this._isEqualZones(i, t) || (this._isEqualZones(i, this.localTimezone) && (i = this.localTimezone), o.push({
                    timezone: this._zoneWithoutPrefix(i),
                    formatted: this._createDateTimeRange(a.default.fromDatetime(e.datetime, e.timezone, i), this.time, this.duration)
                }))
            })), o.uniqBy("timezone")
        }
        _isEqualZones(e, t) {
            return !!(!e && !t || e && t) && (!(!e.includes(t) && !t.includes(e)) || moment.tz(e).utcOffset() === moment.tz(t).utcOffset())
        }
        _createDateTimeRange(e, t, o) {
            const [a, n] = this._calculateDatesForRange(e, t, o)
            let s = [a.format("dddd, LL"), this._optionalTimeIcon(a, n), a.format(i)]
            return n && (s = s.concat(["→", n.format(this._endDateFormat(a, n))])), s.filter(Boolean).join(" ")
        }
        _shortFormat(e, t) {
            return t.datetime.diff(e.datetime, "days") < 1
        }
        _optionalTimeIcon(e, o) {
            if (!o || this._shortFormat(e, o)) return `<br />${(0,t.renderIcon)("string","clock")}`
        }
        _endDateFormat(e, t) {
            return this._shortFormat(e, t) ? i : "LLLL"
        }
        _calculateDatesForRange(e, t, o) {
            if (t && !o) return [e]
            const a = [e, o ? e.add(o, "minutes") : e.add(24, "hours")]
            return o < 0 ? a.reverse() : a
        }
        _applyFormatting(e, t, a) {
            if (this.countdown) {
                const t = moment.tz(this.localTimezone).diff(e.datetime)
                return t < 0 ? moment.duration(t).humanize() : o.default.t("discourse_local_dates.relative_dates.countdown.passed")
            }
            const i = this._isEqualZones(t, this.localTimezone)
            if (this.calendar) {
                const o = moment.tz(this.localTimezone).isBetween(e.subtract(2, "day").datetime, e.add(1, "day").datetime.endOf("day"))
                if (this.sameLocalDayAsFrom) return this._timeOnlyFormat(e, t)
                if (o && i) {
                    const t = e.datetimeWithZone(this.localTimezone)
                    return a && 0 === t.hours() && 0 === t.minutes() ? t.format("dddd") : t.calendar(moment.tz(e.timezone), this._calendarFormats(this.time ? this.time : null))
                }
            }
            return i ? e.format(this.format) : this._formatWithZone(e, t, this.format)
        }
        _calendarFormats(e) {
            return {
                sameDay: this._translateCalendarKey(e, "today"),
                nextDay: this._translateCalendarKey(e, "tomorrow"),
                lastDay: this._translateCalendarKey(e, "yesterday"),
                sameElse: "L"
            }
        }
        _translateCalendarKey(e, t) {
            const a = o.default.t(`discourse_local_dates.relative_dates.${t}`, {
                time: "LT"
            })
            return e ? a.split("LT").map((e => `[${e}]`)).join("LT") : `[${a.replace(" LT","")}]`
        }
        _formatTimezone(e) {
            return e.replace("_", " ").replace("Etc/", "").split("/")
        }
        _zoneWithoutPrefix(e) {
            const [t, o] = this._formatTimezone(e)
            return o || t
        }
        _formatWithZone(e, t, o) {
            return `${e.datetimeWithZone(t).format(o)} (${this._zoneWithoutPrefix(t)})`
        }
        _timeOnlyFormat(e, t) {
            return this._formatWithZone(e, t, "LT")
        }
    }
})), define("discourse/plugins/discourse-local-dates/lib/local-date-markup-generator", ["exports", "@ember/utils"], (function(e, t) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = function(e, o, a, i) {
        let n = ""
        if (a) {
            n += `[date-range from=${[e.date,e.time].filter((e=>!(0,t.isEmpty)(e))).join("T")} to=${[i.date,i.time].filter((e=>!(0,t.isEmpty)(e))).join("T")}`
        } else n += `[date=${e.date}`
        e.time && !a && (n += ` time=${e.time}`)
        e.format && e.format.length && (n += ` format="${e.format}"`)
        o.timezone && (n += ` timezone="${o.timezone}"`)
        o.countdown && (n += ` countdown="${o.countdown}"`)
        o.displayedTimezone && (n += ` displayedTimezone="${o.displayedTimezone}"`)
        o.timezones && o.timezones.length && (Array.isArray(o.timezones) ? n += ` timezones="${o.timezones.join("|")}"` : n += ` timezones="${o.timezones}"`)
        o.recurring && !a && (n += ` recurring="${o.recurring}"`)
        return n += "]", n
    }
}))

//# sourceMappingURL=discourse-local-dates-4e3a93a0f658f6861b7b58ccb405f754539bde917a3b0b4c644fac591b9a8fa7.map
//!

;