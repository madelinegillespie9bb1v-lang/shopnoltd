define("discourse/plugins/docker_manager/discourse/components/docker-manager/console", ["exports", "@ember/component", "@glimmer/component", "discourse-common/utils/decorators", "@ember/template-factory"], (function(e, t, r, s, n) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = void 0
    const a = (0, n.createTemplateFactory)({
        id: "E4gmFwOC",
        block: '[[[11,0],[24,0,"console-logs"],[4,[38,0],[[30,0,["scrollToBottom"]]],null],[4,[38,1],[[30,0,["scrollToBottom"]],[30,1]],null],[12],[1,[30,1]],[13]],["@output"],false,["did-insert","did-update"]]',
        moduleName: "discourse/plugins/docker_manager/discourse/components/docker-manager/console.hbs",
        isStrictMode: !1
    })
    class i extends r.default {
        scrollToBottom(e) {
            this.args.followOutput && (e.scrollTop = e.scrollHeight)
        }
        static# e = (() => dt7948.n(this.prototype, "scrollToBottom", [s.bind]))()
    }
    e.default = i, (0, t.setComponentTemplate)(a, i)
})), define("discourse/plugins/docker_manager/discourse/components/docker-manager/progress-bar", ["exports", "@ember/component", "@glimmer/component", "@ember/template", "@ember/template-factory"], (function(e, t, r, s, n) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = void 0
    const a = (0, n.createTemplateFactory)({
        id: "uEtfDzBs",
        block: '[[[10,0],[15,0,[29,["progress-bar ",[52,[30,0,["active"]],"active"]]]],[12],[1,"\\n  "],[10,0],[14,0,"progress-bar-inner"],[15,5,[30,0,["barStyle"]]],[12],[13],[1,"\\n"],[13]],[],false,["if"]]',
        moduleName: "discourse/plugins/docker_manager/discourse/components/docker-manager/progress-bar.hbs",
        isStrictMode: !1
    })
    class i extends r.default {
        get active() {
            return 100 !== parseInt(this.args.percent, 10)
        }
        get barStyle() {
            let e = parseInt(this.args.percent, 10)
            return e > 100 && (e = 100), (0, s.htmlSafe)(`width: ${e}%`)
        }
    }
    e.default = i, (0, t.setComponentTemplate)(a, i)
})), define("discourse/plugins/docker_manager/discourse/components/docker-manager/upgrade-notice", ["exports", "@ember/component", "@glimmer/component", "@ember/service", "@ember/template-factory"], (function(e, t, r, s, n) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = void 0
    const a = (0, n.createTemplateFactory)({
        id: "krKeSpiQ",
        block: '[[[41,[30,0,["currentUser","admin"]],[[[41,[51,[30,1,["upToDate"]]],[[[1,"    "],[10,0],[14,0,"upgrades-banner"],[12],[1,"\\n      "],[1,[28,[35,2],["admin.docker.outdated_notice"],null]],[1,"\\n\\n      "],[8,[39,3],null,[["@route"],["update"]],[["default"],[[[[1,"\\n        "],[1,[28,[35,2],["admin.docker.perform_update"],null]],[1,"\\n      "]],[]]]]],[1,"\\n    "],[13],[1,"\\n"]],[]],null]],[]],null]],["@versionCheck"],false,["if","unless","i18n","link-to"]]',
        moduleName: "discourse/plugins/docker_manager/discourse/components/docker-manager/upgrade-notice.hbs",
        isStrictMode: !1
    })
    class i extends r.default {
        static# e = (() => dt7948.g(this.prototype, "currentUser", [s.inject]))()# t = (() => {
            dt7948.i(this, "currentUser")
        })()
    }
    e.default = i, (0, t.setComponentTemplate)(a, i)
})), define("discourse/plugins/docker_manager/discourse/components/repo-status", ["exports", "@glimmer/component", "@ember/object", "@ember/service", "discourse/components/d-button", "discourse/helpers/format-date", "discourse-common/helpers/d-icon", "discourse-common/helpers/i18n", "I18n", "discourse/plugins/docker_manager/discourse/helpers/commit-url", "discourse/plugins/docker_manager/discourse/helpers/new-commits", "@ember/component", "@ember/template-factory"], (function(e, t, r, s, n, a, i, o, d, u, l, c, p) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = void 0
    class g extends t.default {
        static# e = (() => dt7948.g(this.prototype, "router", [s.inject]))()# r = (() => {
            dt7948.i(this, "router")
        })()
        static# s = (() => dt7948.g(this.prototype, "upgradeStore", [s.inject]))()# n = (() => {
            dt7948.i(this, "upgradeStore")
        })()
        get upgradeDisabled() {
            return !this.args.upgradingRepo && (!!this.upgradeStore.running || !this.args.managerRepo.upToDate && this.args.managerRepo !== this.args.repo)
        }
        get upgradeButtonLabel() {
            return this.args.repo.upgrading ? d.default.t("admin.docker.updating") : d.default.t("admin.docker.update_action")
        }
        upgrade() {
            this.router.transitionTo("update.show", this.args.repo)
        }
        static# a = (() => dt7948.n(this.prototype, "upgrade", [r.action]))()
        static# i = (() => (0, c.setComponentTemplate)((0, p.createTemplateFactory)({
            id: "6BNb/NY8",
            block: '[[[1,"\\n    "],[10,"tr"],[15,0,[29,["repo ",[52,[30,1,["hasNewVersion"]],"new-version"]]]],[12],[1,"\\n      "],[10,"td"],[12],[1,"\\n        "],[10,0],[14,0,"repo__name"],[12],[1,"\\n          "],[1,[30,1,["nameTitleized"]]],[1,"\\n        "],[13],[1,"\\n"],[41,[30,1,["author"]],[[[1,"          "],[10,0],[14,0,"repo__author"],[12],[1,"\\n            "],[1,[30,1,["author"]]],[1,"\\n          "],[13],[1,"\\n"]],[]],null],[41,[30,1,["plugin"]],[[[1,"          "],[10,0],[14,0,"repo__about"],[12],[1,"\\n            "],[1,[30,1,["plugin","about"]]],[1,"\\n"],[41,[30,1,["linkUrl"]],[[[1,"              "],[10,3],[15,6,[30,1,["linkUrl"]]],[14,"rel","noopener noreferrer"],[14,"target","_blank"],[12],[1,"\\n                "],[1,[28,[32,0],["admin.plugins.learn_more"],null]],[1,"\\n                "],[1,[28,[32,1],["external-link-alt"],null]],[1,"\\n              "],[13],[1,"\\n"]],[]],null],[1,"          "],[13],[1,"\\n"]],[]],null],[41,[30,1,["hasNewVersion"]],[[[1,"          "],[10,0],[14,0,"repo__new-version"],[12],[1,"\\n            "],[1,[28,[32,0],["admin.docker.new_version_available"],null]],[1,"\\n          "],[13],[1,"\\n"]],[]],null],[1,"      "],[13],[1,"\\n\\n      "],[10,"td"],[12],[1,"\\n        "],[1,[28,[32,2],["current",[30,1,["version"]],[30,1,["prettyVersion"]],[30,1,["url"]]],null]],[1,"\\n      "],[13],[1,"\\n\\n      "],[10,"td"],[12],[1,[28,[32,3],[[30,1,["latest","date"]]],[["leaveAgo"],["true"]]]],[13],[1,"\\n      "],[10,"td"],[12],[1,"\\n        "],[10,"ul"],[14,0,"repo__latest-version"],[12],[1,"\\n          "],[10,"li"],[12],[1,"\\n            "],[1,[28,[32,2],["new",[30,1,["latest","version"]],[30,1,["prettyLatestVersion"]],[30,1,["url"]]],null]],[1,"\\n          "],[13],[1,"\\n          "],[10,"li"],[14,0,"new-commits"],[12],[1,"\\n            "],[1,[28,[32,4],[[30,1,["latest","commits_behind"]],[30,1,["version"]],[30,1,["latest","version"]],[30,1,["url"]]],null]],[1,"\\n          "],[13],[1,"\\n        "],[13],[1,"\\n      "],[13],[1,"\\n      "],[10,"td"],[14,0,"repo__status"],[12],[1,"\\n"],[41,[30,1,["checkingStatus"]],[[[1,"          "],[1,[28,[32,0],["admin.docker.checking"],null]],[1,"\\n"]],[]],[[[41,[30,1,["upToDate"]],[[[1,"          "],[1,[28,[32,0],["admin.docker.up_to_date"],null]],[1,"\\n"]],[]],[[[1,"          "],[8,[32,5],[[24,0,"upgrade-button"]],[["@action","@disabled","@translatedLabel"],[[30,0,["upgrade"]],[30,0,["upgradeDisabled"]],[30,0,["upgradeButtonLabel"]]]],null],[1,"\\n        "]],[]]]],[]]],[1,"      "],[13],[1,"\\n    "],[13],[1,"\\n  "]],["@repo"],false,["if"]]',
            moduleName: "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/docker_manager/discourse/components/repo-status.js",
            scope: () => [o.default, i.default, u.default, a.default, l.default, n.default],
            isStrictMode: !0
        }), this))()
    }
    e.default = g
})), define("discourse/plugins/docker_manager/discourse/controllers/update-index", ["exports", "@glimmer/tracking", "@ember/controller", "@ember/object", "@ember/service", "discourse/plugins/docker_manager/discourse/models/repo"], (function(e, t, r, s, n, a) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = void 0
    class i extends r.default {
        static# e = (() => dt7948.g(this.prototype, "router", [n.inject]))()# r = (() => {
            dt7948.i(this, "router")
        })()
        get managerRepo() {
            return this.model.find((e => "docker_manager" === e.id))
        }
        static# s = (() => dt7948.n(this.prototype, "managerRepo", [t.cached]))()
        get outdated() {
            return a.needsImageUpgrade
        }
        get upgradeAllButtonDisabled() {
            return !this.managerRepo.upToDate || this.allUpToDate
        }
        get allUpToDate() {
            return this.model.every((e => e.upToDate))
        }
        upgradeAllButton() {
            this.router.transitionTo("update.show", "all")
        }
        static# a = (() => dt7948.n(this.prototype, "upgradeAllButton", [s.action]))()
    }
    e.default = i
})), define("discourse/plugins/docker_manager/discourse/controllers/update-show", ["exports", "@ember/controller", "@ember/object", "@ember/service", "discourse-common/lib/helpers", "I18n", "discourse/plugins/docker_manager/discourse/models/repo"], (function(e, t, r, s, n, a, i) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = void 0
    class o extends t.default {
        static# e = (() => dt7948.g(this.prototype, "messageBus", [s.inject]))()# o = (() => {
            dt7948.i(this, "messageBus")
        })()
        static# s = (() => dt7948.g(this.prototype, "dialog", [s.inject]))()# d = (() => {
            dt7948.i(this, "dialog")
        })()
        static# a = (() => dt7948.g(this.prototype, "upgradeStore", [s.inject]))()# n = (() => {
            dt7948.i(this, "upgradeStore")
        })()
        get complete() {
            return "complete" === this.upgradeStore.upgradeStatus
        }
        get failed() {
            return "failed" === this.upgradeStore.upgradeStatus
        }
        get multiUpgrade() {
            return this.model.length > 1
        }
        get title() {
            return this.multiUpgrade ? a.default.t("admin.docker.update_everything") : a.default.t("admin.docker.update_repo", {
                name: this.model.name
            })
        }
        get isUpToDate() {
            return (0, n.makeArray)(this.model).every((e => e.upToDate))
        }
        get upgrading() {
            return (0, n.makeArray)(this.model).some((e => e.upgrading))
        }
        start() {
            if (this.upgradeStore.reset(), this.multiUpgrade) {
                for (const e of this.model) e.upToDate || (e.upgrading = !0)
                return i.default.upgradeAll()
            }
            if (!this.model.upgrading) return this.model.startUpgrade()
        }
        static# i = (() => dt7948.n(this.prototype, "start", [r.action]))()
        resetUpgrade() {
            this.dialog.confirm({
                message: a.default.t("admin.docker.reset_warning"),
                didConfirm: async () => {
                    if (this.multiUpgrade) try {
                        await i.default.resetAll(this.model.filter((e => !e.upToDate)))
                    } finally {
                        this.upgradeStore.reset()
                        for (const e of this.model) e.upgrading = !1
                    } else await this.model.resetUpgrade(), this.upgradeStore.reset()
                }
            })
        }
        static# u = (() => dt7948.n(this.prototype, "resetUpgrade", [r.action]))()
    }
    e.default = o
})), define("discourse/plugins/docker_manager/discourse/controllers/update", ["exports", "@glimmer/tracking", "@ember/controller", "@ember/object", "@ember-compat/tracked-built-ins"], (function(e, t, r, s, n) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = void 0
    class a extends r.default {
        static# e = (() => dt7948.g(this.prototype, "banner", [t.tracked], (function() {
            return new n.TrackedArray([])
        })))()# l = (() => {
            dt7948.i(this, "banner")
        })()
        static# s = (() => dt7948.g(this.prototype, "bannerDismissed", [t.tracked], (function() {
            return !1
        })))()# c = (() => {
            dt7948.i(this, "bannerDismissed")
        })()
        get showBanner() {
            return !this.bannerDismissed && this.banner ? .length > 0
        }
        appendBannerHtml(e) {
            this.banner.includes(e) || this.banner.push(e)
        }
        dismiss() {
            this.bannerDismissed = !0
        }
        static# a = (() => dt7948.n(this.prototype, "dismiss", [s.action]))()
    }
    e.default = a
})), define("discourse/plugins/docker_manager/discourse/docker-manager-route-map", ["exports"], (function(e) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = void 0
    e.default = {
        resource: "admin",
        map() {
            this.route("update", {
                resetNamespace: !0
            }, (function() {
                this.route("processes"), this.route("show", {
                    path: "/:id"
                })
            }))
        }
    }
})), define("discourse/plugins/docker_manager/discourse/helpers/commit-url", ["exports", "@ember/template"], (function(e, t) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = function(e, r, s, n) {
        if (!s) return ""
        if (!n) return s
        const a = n.substr(0, n.search(/(\.git)?$/)),
            i = `<a class='${e} commit-hash' title='${r}' href='${a}/commit/${r}'>${s}</a>`
        return new t.htmlSafe(i)
    }
})), define("discourse/plugins/docker_manager/discourse/helpers/new-commits", ["exports", "@ember/component/helper", "@ember/template", "I18n"], (function(e, t, r, s) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = void 0
    e.default = (0, t.helper)((function(e) {
        const [t, n, a, i] = e
        if (!t) return ""
        if (0 === parseInt(t, 10)) return ""
        let o = s.default.t("admin.docker.commits", {
            count: t
        })
        if (!i) return o
        return o = `<a href='${i.substr(0,i.search(/(\.git)?$/))}/compare/${n}...${a}'>${o}</a>`, new r.htmlSafe(o)
    }))
})), define("discourse/plugins/docker_manager/discourse/initializers/admin-sidebar", ["exports", "discourse/lib/plugin-api"], (function(e, t) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = void 0
    e.default = {
        name: "docker-manager-admin-sidebar",
        initialize() {
            (0, t.withPluginApi)("1.24.0", (e => {
                e.addAdminSidebarSectionLink("root", {
                    name: "admin_upgrade",
                    route: "update.index",
                    label: "admin.docker.update_tab",
                    icon: "rocket"
                })
            }))
        }
    }
})), define("discourse/plugins/docker_manager/discourse/models/process-list", ["exports", "@glimmer/tracking", "discourse/lib/ajax"], (function(e, t, r) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = void 0
    class s {
        static# e = (() => dt7948.g(this.prototype, "output", [t.tracked], (function() {
            return null
        })))()# p = (() => {
            dt7948.i(this, "output")
        })()
        async refresh() {
            const e = await (0, r.ajax)("/admin/docker/ps", {
                dataType: "text"
            })
            this.output = e
        }
    }
    e.default = s
})), define("discourse/plugins/docker_manager/discourse/models/repo", ["exports", "@glimmer/tracking", "@ember/string", "@ember-compat/tracked-built-ins", "discourse/lib/ajax", "admin/models/admin-plugin"], (function(e, t, r, s, n, a) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.needsImageUpgrade = e.default = void 0
    let i = [],
        o = e.needsImageUpgrade = !1

    function d(e) {
        return e.map((e => e.version)).join(", ")
    }
    class u {
        static create() {
            return new u(...arguments)
        }
        static async findAll() {
            if (i.length) return i
            const t = await (0, n.ajax)("/admin/docker/repos")
            return i = t.repos.map((e => new u(e))), e.needsImageUpgrade = o = t.upgrade_required, i
        }
        static async findUpgrading() {
            return (await u.findAll()).findBy("upgrading", !0)
        }
        static async find(e) {
            return (await u.findAll()).findBy("id", e)
        }
        static upgradeAll() {
            return (0, n.ajax)("/admin/docker/update", {
                dataType: "text",
                type: "POST",
                data: {
                    path: "all"
                }
            })
        }
        static resetAll(e) {
            return (0, n.ajax)("/admin/docker/update", {
                dataType: "text",
                type: "DELETE",
                data: {
                    path: "all",
                    version: d(e)
                }
            })
        }
        static async findLatestAll() {
            return (await (0, n.ajax)("/admin/docker/latest", {
                dataType: "json",
                type: "GET",
                data: {
                    path: "all"
                }
            })).repos
        }
        static async findAllProgress(e) {
            return (await (0, n.ajax)("/admin/docker/progress", {
                dataType: "json",
                type: "GET",
                data: {
                    path: "all",
                    version: d(e)
                }
            })).progress
        }
        static# e = (() => dt7948.g(this.prototype, "unloaded", [t.tracked], (function() {
            return !0
        })))()# g = (() => {
            dt7948.i(this, "unloaded")
        })()
        static# s = (() => dt7948.g(this.prototype, "checking", [t.tracked], (function() {
            return !1
        })))()# m = (() => {
            dt7948.i(this, "checking")
        })()
        static# a = (() => dt7948.g(this.prototype, "lastCheckedAt", [t.tracked], (function() {
            return null
        })))()# h = (() => {
            dt7948.i(this, "lastCheckedAt")
        })()
        static# i = (() => dt7948.g(this.prototype, "latest", [t.tracked], (function() {
            return new s.TrackedObject({})
        })))()# f = (() => {
            dt7948.i(this, "latest")
        })()
        static# u = (() => dt7948.g(this.prototype, "plugin", [t.tracked], (function() {
            return null
        })))()# b = (() => {
            dt7948.i(this, "plugin")
        })()
        static# k = (() => dt7948.g(this.prototype, "name", [t.tracked], (function() {
            return null
        })))()# _ = (() => {
            dt7948.i(this, "name")
        })()
        static# y = (() => dt7948.g(this.prototype, "path", [t.tracked], (function() {
            return null
        })))()# v = (() => {
            dt7948.i(this, "path")
        })()
        static# w = (() => dt7948.g(this.prototype, "branch", [t.tracked], (function() {
            return null
        })))()# j = (() => {
            dt7948.i(this, "branch")
        })()
        static# x = (() => dt7948.g(this.prototype, "official", [t.tracked], (function() {
            return !1
        })))()# T = (() => {
            dt7948.i(this, "official")
        })()
        static# S = (() => dt7948.g(this.prototype, "fork", [t.tracked], (function() {
            return !1
        })))()# O = (() => {
            dt7948.i(this, "fork")
        })()
        static# P = (() => dt7948.g(this.prototype, "id", [t.tracked], (function() {
            return null
        })))()# M = (() => {
            dt7948.i(this, "id")
        })()
        static# A = (() => dt7948.g(this.prototype, "version", [t.tracked], (function() {
            return null
        })))()# U = (() => {
            dt7948.i(this, "version")
        })()
        static# D = (() => dt7948.g(this.prototype, "pretty_version", [t.tracked], (function() {
            return null
        })))()# B = (() => {
            dt7948.i(this, "pretty_version")
        })()
        static# C = (() => dt7948.g(this.prototype, "url", [t.tracked], (function() {
            return null
        })))()# N = (() => {
            dt7948.i(this, "url")
        })()
        static# R = (() => dt7948.g(this.prototype, "upgrading", [t.tracked], (function() {
            return !1
        })))()# L = (() => {
            dt7948.i(this, "upgrading")
        })()
        constructor() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
            if (e.latest)
                for (const [t, r] of Object.entries(e.latest)) this.latest[t] = r
            e.plugin && (this.plugin = a.default.create(e.plugin))
            for (const [t, r] of Object.entries(e))["latest", "plugin"].includes(t) || (this[t] = r)
        }
        get nameTitleized() {
            return this.plugin ? this.plugin.nameTitleized : (0, r.capitalize)(this.name)
        }
        static# F = (() => dt7948.n(this.prototype, "nameTitleized", [t.cached]))()
        get linkUrl() {
            return this.plugin ? this.plugin.linkUrl : this.url
        }
        get author() {
            return this.plugin ? this.plugin.author : null
        }
        get checkingStatus() {
            return this.unloaded || this.checking
        }
        get upToDate() {
            return !this.upgrading && this.version === this.latest ? .version
        }
        get hasNewVersion() {
            return !this.checkingStatus && !this.upToDate
        }
        get prettyVersion() {
            return this.pretty_version || this.version ? .substring(0, 8)
        }
        get prettyLatestVersion() {
            return this.latest ? .pretty_version || this.latest ? .version ? .substring(0, 8)
        }
        get shouldCheck() {
            if (null === this.version) return !1
            if (this.checking) return !1
            if (this.lastCheckedAt) {
                return (new Date).getTime() - this.lastCheckedAt > 6e4
            }
            return !0
        }
        repoAjax(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
            return t.data = {
                path: this.path,
                version: this.version,
                branch: this.branch
            }, (0, n.ajax)(e, t)
        }
        async findLatest() {
            if (!this.shouldCheck) return void(this.unloaded = !1)
            this.checking = !0
            const e = await this.repoAjax("/admin/docker/latest")
            this.unloaded = !1, this.checking = !1, this.lastCheckedAt = (new Date).getTime()
            for (const [t, r] of Object.entries(e.latest)) this.latest[t] = r
        }
        async findProgress() {
            return (await this.repoAjax("/admin/docker/progress")).progress
        }
        async resetUpgrade() {
            await this.repoAjax("/admin/docker/update", {
                dataType: "text",
                type: "DELETE"
            }), this.upgrading = !1
        }
        async startUpgrade() {
            this.upgrading = !0
            try {
                await this.repoAjax("/admin/docker/update", {
                    dataType: "text",
                    type: "POST"
                })
            } catch (e) {
                this.upgrading = !1
            }
        }
    }
    e.default = u
})), define("discourse/plugins/docker_manager/discourse/routes/update-index", ["exports", "@ember/routing/route"], (function(e, t) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = void 0
    class r extends t.default {
        model() {
            return this.modelFor("update")
        }
        async loadRepos(e) {
            for (const t of e) await t.findLatest()
        }
        setupController(e, t) {
            super.setupController(...arguments), this.loadRepos(t)
        }
    }
    e.default = r
})), define("discourse/plugins/docker_manager/discourse/routes/update-processes", ["exports", "@ember/routing/route", "@ember/runloop", "discourse-common/lib/later", "discourse-common/utils/decorators", "discourse/plugins/docker_manager/discourse/models/process-list"], (function(e, t, r, s, n, a) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = void 0
    class i extends t.default {
        processes = null
        refreshTimer = null
        autoRefresh = !1
        model() {
            return this.processes = new a.default, this.autoRefresh = !0, this.refresh(), this.processes
        }
        deactivate() {
            this.autoRefresh = !1
        }
        async refresh() {
            this.autoRefresh ? (await this.processes.refresh(), this.refreshTimer = (0, s.default)(this.refresh, 5e3)) : (0, r.cancel)(this.refreshTimer)
        }
        static# e = (() => dt7948.n(this.prototype, "refresh", [n.bind]))()
    }
    e.default = i
})), define("discourse/plugins/docker_manager/discourse/routes/update-show", ["exports", "@ember/routing/route", "@ember/service", "discourse/plugins/docker_manager/discourse/models/repo"], (function(e, t, r, s) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = void 0
    class n extends t.default {
        static# e = (() => dt7948.g(this.prototype, "upgradeStore", [r.inject]))()# n = (() => {
            dt7948.i(this, "upgradeStore")
        })()
        static# s = (() => dt7948.g(this.prototype, "router", [r.inject]))()# r = (() => {
            dt7948.i(this, "router")
        })()
        model(e) {
            return "all" === e.id ? s.default.findAll() : s.default.find(e.id)
        }
        async afterModel(e) {
            if (!e) return void this.router.replaceWith("/404")
            if (Array.isArray(e)) {
                const t = await s.default.findLatestAll()
                for (const s of t) {
                    const t = e.find((e => e.path === s.path))
                    if (!t) return
                    delete s.path
                    for (const [e, r] of Object.entries(s)) t.latest[e] = r
                }
                const r = await s.default.findAllProgress(e.filter((e => !e.upToDate)))
                return void this.upgradeStore.reset({
                    consoleOutput: r.logs,
                    progressPercentage: r.percentage,
                    upgradeStatus: r.status,
                    repos: t
                })
            }
            await s.default.findUpgrading(), await e.findLatest()
            const t = await e.findProgress()
            this.upgradeStore.reset({
                consoleOutput: t.logs,
                progressPercentage: t.percentage,
                upgradeStatus: t.status,
                repos: [e.id]
            })
        }
    }
    e.default = n
})), define("discourse/plugins/docker_manager/discourse/routes/update", ["exports", "@ember/routing/route", "@ember/service", "discourse-common/utils/decorators", "I18n", "discourse/plugins/docker_manager/discourse/models/repo"], (function(e, t, r, s, n, a) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = void 0
    class i extends t.default {
        static# e = (() => dt7948.g(this.prototype, "messageBus", [r.inject]))()# o = (() => {
            dt7948.i(this, "messageBus")
        })()
        static# s = (() => dt7948.g(this.prototype, "upgradeStore", [r.inject]))()# n = (() => {
            dt7948.i(this, "upgradeStore")
        })()
        model() {
            return a.default.findAll()
        }
        activate() {
            this.messageBus.subscribe("/docker/update", this.onUpgradeMessage)
        }
        deactivate() {
            this.messageBus.unsubscribe("/docker/update", this.onUpgradeMessage)
        }
        setupController(e, t) {
            const r = t.find((e => "discourse" === e.id))
            "origin/main" === r ? .branch && e.appendBannerHtml(n.default.t("admin.docker.main_branch_warning", {
                url: "https://meta.discourse.org/t/17014"
            }))
        }
        onUpgradeMessage(e) {
            switch (e.type) {
                case "log":
                    this.upgradeStore.consoleOutput = this.upgradeStore.consoleOutput + e.value + "\n"
                    break
                case "percent":
                    this.upgradeStore.progressPercentage = e.value
                    break
                case "status":
                    this.upgradeStore.upgradeStatus = e.value
                    const t = this.modelFor("update")
                    if ("complete" === e.value) {
                        for (const e of t) e.upgrading && (e.version = e.latest ? .version)
                        this.session.requiresRefresh = !0
                    }
                    if ("complete" === e.value || "failed" === e.value)
                        for (const e of t) e.upgrading = !1
            }
        }
        static# a = (() => dt7948.n(this.prototype, "onUpgradeMessage", [s.bind]))()
    }
    e.default = i
})), define("discourse/plugins/docker_manager/discourse/services/upgrade-store", ["exports", "@glimmer/tracking", "@ember/service"], (function(e, t, r) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = void 0
    class s extends r.default {
        static# e = (() => dt7948.g(this.prototype, "consoleOutput", [t.tracked], (function() {
            return ""
        })))()# $ = (() => {
            dt7948.i(this, "consoleOutput")
        })()
        static# s = (() => dt7948.g(this.prototype, "progressPercentage", [t.tracked], (function() {
            return 0
        })))()# I = (() => {
            dt7948.i(this, "progressPercentage")
        })()
        static# a = (() => dt7948.g(this.prototype, "upgradeStatus", [t.tracked], (function() {
            return null
        })))()# E = (() => {
            dt7948.i(this, "upgradeStatus")
        })()
        static# i = (() => dt7948.g(this.prototype, "repos", [t.tracked], (function() {
            return []
        })))()# z = (() => {
            dt7948.i(this, "repos")
        })()
        get running() {
            return "running" === this.upgradeStatus
        }
        reset() {
            let {
                consoleOutput: e,
                progressPercentage: t,
                upgradeStatus: r,
                repos: s
            } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
            this.consoleOutput = e ? ? "", this.progressPercentage = t ? ? 0, this.upgradeStatus = r ? ? null, this.repos = s ? ? []
        }
    }
    e.default = s
})), define("discourse/plugins/docker_manager/discourse/templates/connectors/admin-menu/upgrade-link", ["exports", "@ember/template-factory"], (function(e, t) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = void 0
    e.default = (0, t.createTemplateFactory)({
        id: "NugvYRqo",
        block: '[[[41,[30,0,["currentUser","admin"]],[[[1,"  "],[8,[39,1],null,[["@route","@label"],["update","admin.docker.update_tab"]],null],[1,"\\n"]],[]],null]],[],false,["if","nav-item"]]',
        moduleName: "discourse/plugins/docker_manager/discourse/templates/connectors/admin-menu/upgrade-link.hbs",
        isStrictMode: !1
    })
})), define("discourse/plugins/docker_manager/discourse/templates/connectors/admin-upgrade-header/upgrade-header", ["exports", "@ember/template-factory"], (function(e, t) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = void 0
    e.default = (0, t.createTemplateFactory)({
        id: "8s3istjp",
        block: '[[[8,[39,0],null,[["@versionCheck"],[[30,0,["versionCheck"]]]],null]],[],false,["docker-manager/upgrade-notice"]]',
        moduleName: "discourse/plugins/docker_manager/discourse/templates/connectors/admin-upgrade-header/upgrade-header.hbs",
        isStrictMode: !1
    })
})), define("discourse/plugins/docker_manager/discourse/templates/update-index", ["exports", "@ember/template-factory"], (function(e, t) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = void 0
    e.default = (0, t.createTemplateFactory)({
        id: "LD2omxOf",
        block: '[[[10,0],[14,0,"updates-heading"],[12],[1,"\\n  "],[10,"h3"],[12],[1,[28,[35,0],["admin.docker.update_title"],null]],[13],[1,"\\n"],[41,[51,[30,0,["outdated"]]],[[[1,"    "],[8,[39,2],[[16,"disabled",[30,0,["upgradeAllButtonDisabled"]]],[24,1,"upgrade-all"],[24,0,"btn btn-primary"],[24,4,"button"],[4,[38,3],["click",[30,0,["upgradeAllButton"]]],null]],null,[["default"],[[[[1,"\\n"],[41,[30,0,["allUpToDate"]],[[[1,"        "],[1,[28,[35,0],["admin.docker.all_up_to_date"],null]],[1,"\\n"]],[]],[[[1,"        "],[1,[28,[35,0],["admin.docker.update_all"],null]],[1,"\\n"]],[]]],[1,"    "]],[]]]]],[1,"\\n"]],[]],null],[13],[1,"\\n\\n"],[41,[30,0,["outdated"]],[[[1,"  "],[10,"h2"],[12],[1,[28,[35,0],["admin.docker.outdated_image_header"],null]],[13],[1,"\\n  "],[10,2],[12],[1,[28,[35,0],["admin.docker.outdated_image_info"],null]],[13],[1,"\\n\\n"],[1,"  "],[10,"pre"],[12],[1,"    cd /var/discourse\\n    git pull\\n    ./launcher rebuild app\\n  "],[13],[1,"\\n  "],[10,2],[12],[1,"\\n    "],[10,3],[14,6,"https://meta.discourse.org/t/how-do-i-update-my-docker-image-to-latest/23325"],[12],[1,"\\n      "],[1,[28,[35,0],["admin.docker.outdated_image_link"],null]],[1,"\\n    "],[13],[1,"\\n  "],[13],[1,"\\n"]],[]],[[[1,"\\n  "],[10,"table"],[14,0,"table admin-repos"],[14,1,"repos"],[12],[1,"\\n    "],[10,"thead"],[12],[1,"\\n      "],[10,"th"],[14,5,"width: 40%"],[12],[1,[28,[35,0],["admin.docker.repo.name"],null]],[13],[1,"\\n      "],[10,"th"],[12],[1,[28,[35,0],["admin.docker.repo.commit_hash"],null]],[13],[1,"\\n      "],[10,"th"],[12],[1,[28,[35,0],["admin.docker.repo.last_updated"],null]],[13],[1,"\\n      "],[10,"th"],[12],[1,[28,[35,0],["admin.docker.repo.latest_version"],null]],[13],[1,"\\n      "],[10,"th"],[14,"align","center"],[12],[1,[28,[35,0],["admin.docker.repo.status"],null]],[13],[1,"\\n    "],[13],[1,"\\n    "],[10,"tbody"],[12],[1,"\\n"],[42,[28,[37,6],[[28,[37,6],[[30,0,["model"]]],null]],null],null,[[[1,"        "],[8,[39,7],null,[["@repo","@upgradingRepo","@managerRepo"],[[30,1],[30,1,["upgrading"]],[30,0,["managerRepo"]]]],null],[1,"\\n"]],[1]],null],[1,"    "],[13],[1,"\\n  "],[13],[1,"\\n"]],[]]]],["repo"],false,["i18n","unless","d-button","on","if","each","-track-array","repo-status"]]',
        moduleName: "discourse/plugins/docker_manager/discourse/templates/update-index.hbs",
        isStrictMode: !1
    })
})), define("discourse/plugins/docker_manager/discourse/templates/update-processes", ["exports", "ember-this-fallback/deprecations-helper", "@ember/template-factory"], (function(e, t, r) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = void 0
    e.default = (0, r.createTemplateFactory)({
        id: "p3BAywVZ",
        block: '[[[8,[39,0],null,[["@output"],[[30,0,["model","output"]]]],null],[1,[28,[32,0],["[[\\"The `model` property path was used in the `discourse/plugins/docker_manager/discourse/templates/update-processes.hbs` template without using `this`. This fallback behavior has been deprecated, all properties must be looked up on `this` when used in the template: {{this.model}}\\",false,{\\"id\\":\\"ember-this-fallback.this-property-fallback\\",\\"until\\":\\"n/a\\",\\"for\\":\\"ember-this-fallback\\",\\"url\\":\\"https://deprecations.emberjs.com/v3.x#toc_this-property-fallback\\",\\"since\\":{\\"available\\":\\"0.2.0\\"}}]]"],null]]],[],false,["docker-manager/console"]]',
        moduleName: "discourse/plugins/docker_manager/discourse/templates/update-processes.hbs",
        scope: () => [t.default],
        isStrictMode: !1
    })
})), define("discourse/plugins/docker_manager/discourse/templates/update-show", ["exports", "@ember/template-factory"], (function(e, t) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = void 0
    e.default = (0, t.createTemplateFactory)({
        id: "jGd5/pG0",
        block: '[[[10,"h1"],[12],[1,[30,0,["title"]]],[13],[1,"\\n\\n"],[8,[39,0],null,[["@percent"],[[30,0,["upgradeStore","progressPercentage"]]]],null],[1,"\\n\\n"],[41,[30,0,["complete"]],[[[1,"  "],[10,2],[12],[1,[28,[35,2],["admin.docker.update_successful"],null]],[13],[1,"\\n"]],[]],[[[41,[30,0,["failed"]],[[[1,"  "],[10,2],[12],[1,[28,[35,2],["admin.docker.update_error"],null]],[13],[1,"\\n"]],[]],null]],[]]],[1,"\\n"],[41,[30,0,["isUpToDate"]],[[[41,[30,0,["multiUpgrade"]],[[[1,"    "],[10,2],[12],[1,[28,[35,2],["admin.docker.everything_up_to_date"],null]],[13],[1,"\\n"]],[]],[[[1,"    "],[10,2],[12],[1,[28,[35,2],["admin.docker.repo_newest_version"],[["name"],[[30,0,["model","name"]]]]]],[13],[1,"\\n"]],[]]]],[]],[[[1,"  "],[10,0],[14,0,"upgrade-actions"],[12],[1,"\\n    "],[11,"button"],[16,"disabled",[30,0,["upgrading"]]],[24,0,"btn start-upgrade"],[24,4,"button"],[4,[38,3],["click",[30,0,["start"]]],null],[12],[1,"\\n"],[41,[30,0,["upgrading"]],[[[1,"        "],[1,[28,[35,2],["admin.docker.updating"],null]],[1,"\\n"]],[]],[[[1,"        "],[1,[28,[35,2],["admin.docker.start_updating"],null]],[1,"\\n"]],[]]],[1,"    "],[13],[1,"\\n\\n"],[41,[30,0,["upgrading"]],[[[1,"      "],[11,"button"],[24,0,"btn unlock"],[24,4,"button"],[4,[38,3],["click",[30,0,["resetUpgrade"]]],null],[12],[1,"\\n        "],[1,[28,[35,2],["admin.docker.reset_update"],null]],[1,"\\n      "],[13],[1,"\\n"]],[]],null],[1,"  "],[13],[1,"\\n"]],[]]],[1,"\\n"],[8,[39,4],null,[["@output","@followOutput"],[[30,0,["upgradeStore","consoleOutput"]],true]],null]],[],false,["docker-manager/progress-bar","if","i18n","on","docker-manager/console"]]',
        moduleName: "discourse/plugins/docker_manager/discourse/templates/update-show.hbs",
        isStrictMode: !1
    })
})), define("discourse/plugins/docker_manager/discourse/templates/update", ["exports", "@ember/template-factory"], (function(e, t) {
    "use strict"
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = void 0
    e.default = (0, t.createTemplateFactory)({
        id: "7/fPGwJe",
        block: '[[[10,0],[14,0,"admin-controls"],[12],[1,"\\n  "],[10,"nav"],[12],[1,"\\n    "],[10,"ul"],[14,0,"nav nav-pills"],[12],[1,"\\n      "],[10,"li"],[12],[1,"\\n        "],[8,[39,0],null,[["@route"],["update.index"]],[["default"],[[[[1,"\\n          "],[1,[28,[35,1],["admin.docker.navigation.versions"],null]],[1,"\\n        "]],[]]]]],[1,"\\n      "],[13],[1,"\\n\\n      "],[10,"li"],[12],[1,"\\n        "],[8,[39,0],null,[["@route"],["update.processes"]],[["default"],[[[[1,"\\n          "],[1,[28,[35,1],["admin.docker.navigation.processes"],null]],[1,"\\n        "]],[]]]]],[1,"\\n      "],[13],[1,"\\n    "],[13],[1,"\\n  "],[13],[1,"\\n"],[13],[1,"\\n\\n"],[10,0],[14,0,"docker-manager"],[12],[1,"\\n"],[41,[30,0,["showBanner"]],[[[1,"    "],[10,0],[14,1,"banner"],[12],[1,"\\n      "],[10,0],[14,1,"banner-content"],[12],[1,"\\n        "],[10,0],[14,0,"floated-buttons"],[12],[1,"\\n          "],[8,[39,3],[[24,0,"btn btn-flat close"]],[["@icon","@action","@title"],["times",[30,0,["dismiss"]],"banner.close"]],null],[1,"\\n        "],[13],[1,"\\n\\n"],[42,[28,[37,5],[[28,[37,5],[[30,0,["banner"]]],null]],null],null,[[[1,"          "],[10,2],[12],[1,[28,[35,6],[[30,1]],null]],[13],[1,"\\n"]],[1]],null],[1,"      "],[13],[1,"\\n    "],[13],[1,"\\n"]],[]],null],[1,"\\n  "],[46,[28,[37,8],null,null],null,null,null],[1,"\\n"],[13]],["row"],false,["link-to","i18n","if","d-button","each","-track-array","html-safe","component","-outlet"]]',
        moduleName: "discourse/plugins/docker_manager/discourse/templates/update.hbs",
        isStrictMode: !1
    })
}))

//# sourceMappingURL=docker_manager_admin-1cace3130877e9e70eb2d664fc6ae9a95ee8612c5f1a86db7a24dade08a72fc6.map
//!

;