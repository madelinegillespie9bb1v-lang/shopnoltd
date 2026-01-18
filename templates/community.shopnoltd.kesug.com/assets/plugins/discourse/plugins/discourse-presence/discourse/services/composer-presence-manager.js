define("discourse/plugins/discourse-presence/discourse/services/composer-presence-manager", ["exports", "@ember/runloop", "@ember/service", "discourse-common/config/environment"], function(_exports, _runloop, _service, _environment) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const PRESENCE_CHANNEL_PREFIX = "/discourse-presence";
    const KEEP_ALIVE_DURATION_SECONDS = 10;
    class ComposerPresenceManager extends _service.default {
        static# _ = (() => dt7948.g(this.prototype, "presence", [_service.service]))();#
        presence = (() => (dt7948.i(this, "presence"), void 0))();
        notifyState(intent, id) {
            if (this.siteSettings.allow_users_to_hide_profile && this.currentUser.user_option.hide_profile_and_presence) {
                return;
            }
            if (intent === undefined) {
                return this.leave();
            }
            if (!["reply", "whisper", "edit"].includes(intent)) {
                throw `Unknown intent ${intent}`;
            }
            const state = `${intent}/${id}`;
            if (this._state !== state) {
                this._enter(intent, id);
                this._state = state;
            }
            if (!(0, _environment.isTesting)()) {
                this._autoLeaveTimer = (0, _runloop.debounce)(this, this.leave, KEEP_ALIVE_DURATION_SECONDS * 1000);
            }
        }
        leave() {
            this._presentChannel ? .leave();
            this._presentChannel = null;
            this._state = null;
            if (this._autoLeaveTimer) {
                (0, _runloop.cancel)(this._autoLeaveTimer);
                this._autoLeaveTimer = null;
            }
        }
        _enter(intent, id) {
            this.leave();
            let channelName = `${PRESENCE_CHANNEL_PREFIX}/${intent}/${id}`;
            this._presentChannel = this.presence.getChannel(channelName);
            this._presentChannel.enter();
        }
        willDestroy() {
            this.leave();
        }
    }
    _exports.default = ComposerPresenceManager;
});