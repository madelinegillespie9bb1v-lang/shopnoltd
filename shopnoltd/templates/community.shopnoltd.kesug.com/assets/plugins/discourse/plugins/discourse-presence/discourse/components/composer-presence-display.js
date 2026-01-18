define("discourse/plugins/discourse-presence/discourse/components/composer-presence-display", ["exports", "@ember/component", "@glimmer/component", "@glimmer/tracking", "@ember/object", "@ember/service", "@ember/template-factory"], function(_exports, _component, _component2, _tracking, _object, _service, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
        /*
          <div
          {{did-insert this.setupChannels}}
          {{did-update this.setupChannels @model.reply @model.whisper this.state}}
        >
          {{#if this.shouldDisplay}}
            <div class="presence-users">
              <div class="presence-avatars">
                {{#each this.users as |user|}}
                  <UserLink @user={{user}}>
                    {{avatar user imageSize="small"}}
                  </UserLink>
                {{/each}}
              </div>
              <span class="presence-text">
                <span class="description">
                  {{~#if this.isReply~}}
                    {{i18n "presence.replying" count=this.users.length}}
                  {{~else~}}
                    {{i18n "presence.editing" count=this.users.length}}
                  {{~/if~}}
                </span>
                <span class="wave">
                  <span class="dot">.</span>
                  <span class="dot">.</span>
                  <span class="dot">.</span>
                </span>
              </span>
            </div>
          {{/if}}
        </div>
        */
        {
            "id": "8VNX790D",
            "block": "[[[11,0],[4,[38,0],[[30,0,[\"setupChannels\"]]],null],[4,[38,1],[[30,0,[\"setupChannels\"]],[30,1,[\"reply\"]],[30,1,[\"whisper\"]],[30,0,[\"state\"]]],null],[12],[1,\"\\n\"],[41,[30,0,[\"shouldDisplay\"]],[[[1,\"    \"],[10,0],[14,0,\"presence-users\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"presence-avatars\"],[12],[1,\"\\n\"],[42,[28,[37,4],[[28,[37,4],[[30,0,[\"users\"]]],null]],null],null,[[[1,\"          \"],[8,[39,5],null,[[\"@user\"],[[30,2]]],[[\"default\"],[[[[1,\"\\n            \"],[1,[28,[35,6],[[30,2]],[[\"imageSize\"],[\"small\"]]]],[1,\"\\n          \"]],[]]]]],[1,\"\\n\"]],[2]],null],[1,\"      \"],[13],[1,\"\\n      \"],[10,1],[14,0,\"presence-text\"],[12],[1,\"\\n        \"],[10,1],[14,0,\"description\"],[12],[41,[30,0,[\"isReply\"]],[[[1,[28,[35,7],[\"presence.replying\"],[[\"count\"],[[30,0,[\"users\",\"length\"]]]]]]],[]],[[[1,[28,[35,7],[\"presence.editing\"],[[\"count\"],[[30,0,[\"users\",\"length\"]]]]]]],[]]],[13],[1,\"\\n        \"],[10,1],[14,0,\"wave\"],[12],[1,\"\\n          \"],[10,1],[14,0,\"dot\"],[12],[1,\".\"],[13],[1,\"\\n          \"],[10,1],[14,0,\"dot\"],[12],[1,\".\"],[13],[1,\"\\n          \"],[10,1],[14,0,\"dot\"],[12],[1,\".\"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[13]],[\"@model\",\"user\"],false,[\"did-insert\",\"did-update\",\"if\",\"each\",\"-track-array\",\"user-link\",\"avatar\",\"i18n\"]]",
            "moduleName": "discourse/plugins/discourse-presence/discourse/components/composer-presence-display.hbs",
            "isStrictMode": false
        });
    class ComposerPresenceDisplayComponent extends _component2.default {
        static# _ = (() => dt7948.g(this.prototype, "presence", [_service.service]))();#
        presence = (() => (dt7948.i(this, "presence"), void 0))();
        static# _2 = (() => dt7948.g(this.prototype, "composerPresenceManager", [_service.service]))();#
        composerPresenceManager = (() => (dt7948.i(this, "composerPresenceManager"), void 0))();
        static# _3 = (() => dt7948.g(this.prototype, "currentUser", [_service.service]))();#
        currentUser = (() => (dt7948.i(this, "currentUser"), void 0))();
        static# _4 = (() => dt7948.g(this.prototype, "siteSettings", [_service.service]))();#
        siteSettings = (() => (dt7948.i(this, "siteSettings"), void 0))();
        static# _5 = (() => dt7948.g(this.prototype, "replyChannel", [_tracking.tracked]))();#
        replyChannel = (() => (dt7948.i(this, "replyChannel"), void 0))();
        static# _6 = (() => dt7948.g(this.prototype, "whisperChannel", [_tracking.tracked]))();#
        whisperChannel = (() => (dt7948.i(this, "whisperChannel"), void 0))();
        static# _7 = (() => dt7948.g(this.prototype, "editChannel", [_tracking.tracked]))();#
        editChannel = (() => (dt7948.i(this, "editChannel"), void 0))();
        get isReply() {
            return this.state === "reply" || this.state === "whisper";
        }
        get isEdit() {
            return this.state === "edit";
        }
        get state() {
            const {
                editingPost,
                whisper,
                replyingToTopic
            } = this.args.model;
            if (editingPost) {
                return "edit";
            } else if (whisper) {
                return "whisper";
            } else if (replyingToTopic) {
                return "reply";
            }
        }
        get replyChannelName() {
            const topicId = this.args.model ? .topic ? .id;
            if (topicId && this.isReply) {
                return `/discourse-presence/reply/${topicId}`;
            }
        }
        get whisperChannelName() {
            const topicId = this.args.model ? .topic ? .id;
            if (topicId && this.isReply && this.currentUser.whisperer) {
                return `/discourse-presence/whisper/${topicId}`;
            }
        }
        get editChannelName() {
            const postId = this.args.model ? .post ? .id;
            if (postId && this.isEdit) {
                return `/discourse-presence/edit/${postId}`;
            }
        }
        get replyUsers() {
            return this.replyChannel ? .users || [];
        }
        get whisperUsers() {
            return this.whisperChannel ? .users || [];
        }
        get replyingUsers() {
            return [...this.replyUsers, ...this.whisperUsers];
        }
        get editingUsers() {
            return this.editChannel ? .users || [];
        }
        get users() {
            const users = this.isEdit ? this.editingUsers : this.replyingUsers;
            return users.filter(u => u.id !== this.currentUser.id).slice(0, this.siteSettings.presence_max_users_shown);
        }
        get shouldDisplay() {
            return this.users.length > 0;
        }
        setupChannels() {
            this.setupReplyChannel();
            this.setupWhisperChannel();
            this.setupEditChannel();
            this.notifyState();
        }
        static# _8 = (() => dt7948.n(this.prototype, "setupChannels", [_object.action]))();
        setupReplyChannel() {
            this.setupChannel("replyChannel", this.replyChannelName);
        }
        setupWhisperChannel() {
            if (this.currentUser.staff) {
                this.setupChannel("whisperChannel", this.whisperChannelName);
            }
        }
        setupEditChannel() {
            this.setupChannel("editChannel", this.editChannelName);
        }
        setupChannel(key, name) {
            if (this[key] ? .name !== name) {
                this[key] ? .unsubscribe();
                if (name) {
                    this[key] = this.presence.getChannel(name);
                    this[key].subscribe();
                }
            }
        }
        notifyState() {
            const {
                reply,
                post,
                topic
            } = this.args.model;
            const raw = this.isEdit ? post ? .raw || "" : "";
            const entity = this.isEdit ? post : topic;
            if (reply !== raw) {
                this.composerPresenceManager.notifyState(this.state, entity ? .id);
            }
        }
        willDestroy() {
            super.willDestroy(...arguments);
            this.unsubscribeFromChannels();
            this.composerPresenceManager.leave();
        }
        unsubscribeFromChannels() {
            this.replyChannel ? .unsubscribe();
            this.whisperChannel ? .unsubscribe();
            this.editChannel ? .unsubscribe();
        }
    }
    _exports.default = ComposerPresenceDisplayComponent;
    (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, ComposerPresenceDisplayComponent);
});