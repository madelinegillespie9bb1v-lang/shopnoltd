define("discourse/plugins/docker_manager/discourse/controllers/update", ["exports", "@glimmer/tracking", "@ember/controller", "@ember/object", "@ember-compat/tracked-built-ins"], function(_exports, _tracking, _controller, _object, _trackedBuiltIns) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class Upgrade extends _controller.default {
        static# _ = (() => dt7948.g(this.prototype, "banner", [_tracking.tracked], function() {
            return new _trackedBuiltIns.TrackedArray([]);
        }))();#
        banner = (() => (dt7948.i(this, "banner"), void 0))();
        static# _2 = (() => dt7948.g(this.prototype, "bannerDismissed", [_tracking.tracked], function() {
            return false;
        }))();#
        bannerDismissed = (() => (dt7948.i(this, "bannerDismissed"), void 0))();
        get showBanner() {
            if (this.bannerDismissed) {
                return false;
            }
            return this.banner ? .length > 0;
        }
        appendBannerHtml(html) {
            if (!this.banner.includes(html)) {
                this.banner.push(html);
            }
        }
        dismiss() {
            this.bannerDismissed = true;
        }
        static# _3 = (() => dt7948.n(this.prototype, "dismiss", [_object.action]))();
    }
    _exports.default = Upgrade;
});