define("discourse/plugins/docker_manager/discourse/models/repo", ["exports", "@glimmer/tracking", "@ember/string", "@ember-compat/tracked-built-ins", "discourse/lib/ajax", "admin/models/admin-plugin"], function(_exports, _tracking, _string, _trackedBuiltIns, _ajax, _adminPlugin) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.needsImageUpgrade = _exports.default = void 0;
    let loaded = [];
    let needsImageUpgrade = _exports.needsImageUpgrade = false;

    function concatVersions(repos) {
        return repos.map(repo => repo.version).join(", ");
    }
    class Repo {
        static create() {
            return new Repo(...arguments);
        }
        static async findAll() {
            if (loaded.length) {
                return loaded;
            }
            const result = await (0, _ajax.ajax)("/admin/docker/repos");
            loaded = result.repos.map(r => new Repo(r));
            _exports.needsImageUpgrade = needsImageUpgrade = result.upgrade_required;
            return loaded;
        }
        static async findUpgrading() {
            const result = await Repo.findAll();
            return result.findBy("upgrading", true);
        }
        static async find(id) {
            const result = await Repo.findAll();
            return result.findBy("id", id);
        }
        static upgradeAll() {
            return (0, _ajax.ajax)("/admin/docker/update", {
                dataType: "text",
                type: "POST",
                data: {
                    path: "all"
                }
            });
        }
        static resetAll(repos) {
            return (0, _ajax.ajax)("/admin/docker/update", {
                dataType: "text",
                type: "DELETE",
                data: {
                    path: "all",
                    version: concatVersions(repos)
                }
            });
        }
        static async findLatestAll() {
            const result = await (0, _ajax.ajax)("/admin/docker/latest", {
                dataType: "json",
                type: "GET",
                data: {
                    path: "all"
                }
            });
            return result.repos;
        }
        static async findAllProgress(repos) {
            const result = await (0, _ajax.ajax)("/admin/docker/progress", {
                dataType: "json",
                type: "GET",
                data: {
                    path: "all",
                    version: concatVersions(repos)
                }
            });
            return result.progress;
        }
        static# _ = (() => dt7948.g(this.prototype, "unloaded", [_tracking.tracked], function() {
            return true;
        }))();#
        unloaded = (() => (dt7948.i(this, "unloaded"), void 0))();
        static# _2 = (() => dt7948.g(this.prototype, "checking", [_tracking.tracked], function() {
            return false;
        }))();#
        checking = (() => (dt7948.i(this, "checking"), void 0))();
        static# _3 = (() => dt7948.g(this.prototype, "lastCheckedAt", [_tracking.tracked], function() {
            return null;
        }))();#
        lastCheckedAt = (() => (dt7948.i(this, "lastCheckedAt"), void 0))();
        static# _4 = (() => dt7948.g(this.prototype, "latest", [_tracking.tracked], function() {
            return new _trackedBuiltIns.TrackedObject({});
        }))();#
        latest = (() => (dt7948.i(this, "latest"), void 0))();
        static# _5 = (() => dt7948.g(this.prototype, "plugin", [_tracking.tracked], function() {
            return null;
        }))();#
        plugin = (() => (dt7948.i(this, "plugin"), void 0))();
        static# _6 = (() => dt7948.g(this.prototype, "name", [_tracking.tracked], function() {
            return null;
        }))();#
        name = (() => (dt7948.i(this, "name"), void 0))(); // model attributes
        static# _7 = (() => dt7948.g(this.prototype, "path", [_tracking.tracked], function() {
            return null;
        }))();#
        path = (() => (dt7948.i(this, "path"), void 0))();
        static# _8 = (() => dt7948.g(this.prototype, "branch", [_tracking.tracked], function() {
            return null;
        }))();#
        branch = (() => (dt7948.i(this, "branch"), void 0))();
        static# _9 = (() => dt7948.g(this.prototype, "official", [_tracking.tracked], function() {
            return false;
        }))();#
        official = (() => (dt7948.i(this, "official"), void 0))();
        static# _10 = (() => dt7948.g(this.prototype, "fork", [_tracking.tracked], function() {
            return false;
        }))();#
        fork = (() => (dt7948.i(this, "fork"), void 0))();
        static# _11 = (() => dt7948.g(this.prototype, "id", [_tracking.tracked], function() {
            return null;
        }))();#
        id = (() => (dt7948.i(this, "id"), void 0))();
        static# _12 = (() => dt7948.g(this.prototype, "version", [_tracking.tracked], function() {
            return null;
        }))();#
        version = (() => (dt7948.i(this, "version"), void 0))();
        static# _13 = (() => dt7948.g(this.prototype, "pretty_version", [_tracking.tracked], function() {
            return null;
        }))();#
        pretty_version = (() => (dt7948.i(this, "pretty_version"), void 0))();
        static# _14 = (() => dt7948.g(this.prototype, "url", [_tracking.tracked], function() {
            return null;
        }))();#
        url = (() => (dt7948.i(this, "url"), void 0))();
        static# _15 = (() => dt7948.g(this.prototype, "upgrading", [_tracking.tracked], function() {
            return false;
        }))();#
        upgrading = (() => (dt7948.i(this, "upgrading"), void 0))();
        constructor() {
            let attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            if (attributes.latest) {
                for (const [key, value] of Object.entries(attributes.latest)) {
                    this.latest[key] = value;
                }
            }
            if (attributes.plugin) {
                this.plugin = _adminPlugin.default.create(attributes.plugin);
            }
            for (const [key, value] of Object.entries(attributes)) {
                if (["latest", "plugin"].includes(key)) {
                    continue;
                }
                this[key] = value;
            }
        }
        get nameTitleized() {
            if (this.plugin) {
                return this.plugin.nameTitleized;
            }
            return (0, _string.capitalize)(this.name);
        }
        static# _16 = (() => dt7948.n(this.prototype, "nameTitleized", [_tracking.cached]))();
        get linkUrl() {
            if (this.plugin) {
                return this.plugin.linkUrl;
            }
            return this.url;
        }
        get author() {
            if (this.plugin) {
                return this.plugin.author;
            }
            return null;
        }
        get checkingStatus() {
            return this.unloaded || this.checking;
        }
        get upToDate() {
            return !this.upgrading && this.version === this.latest ? .version;
        }
        get hasNewVersion() {
            return !this.checkingStatus && !this.upToDate;
        }
        get prettyVersion() {
            return this.pretty_version || this.version ? .substring(0, 8);
        }
        get prettyLatestVersion() {
            return this.latest ? .pretty_version || this.latest ? .version ? .substring(0, 8);
        }
        get shouldCheck() {
            if (this.version === null) {
                return false;
            }
            if (this.checking) {
                return false;
            }

            // Only check once every minute
            if (this.lastCheckedAt) {
                const ago = new Date().getTime() - this.lastCheckedAt;
                return ago > 60 * 1000;
            }
            return true;
        }
        repoAjax(url) {
            let args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            args.data = {
                path: this.path,
                version: this.version,
                branch: this.branch
            };
            return (0, _ajax.ajax)(url, args);
        }
        async findLatest() {
            if (!this.shouldCheck) {
                this.unloaded = false;
                return;
            }
            this.checking = true;
            const result = await this.repoAjax("/admin/docker/latest");
            this.unloaded = false;
            this.checking = false;
            this.lastCheckedAt = new Date().getTime();
            for (const [key, value] of Object.entries(result.latest)) {
                this.latest[key] = value;
            }
        }
        async findProgress() {
            const result = await this.repoAjax("/admin/docker/progress");
            return result.progress;
        }
        async resetUpgrade() {
            await this.repoAjax("/admin/docker/update", {
                dataType: "text",
                type: "DELETE"
            });
            this.upgrading = false;
        }
        async startUpgrade() {
            this.upgrading = true;
            try {
                await this.repoAjax("/admin/docker/update", {
                    dataType: "text",
                    type: "POST"
                });
            } catch (e) {
                this.upgrading = false;
            }
        }
    }
    _exports.default = Repo;
});