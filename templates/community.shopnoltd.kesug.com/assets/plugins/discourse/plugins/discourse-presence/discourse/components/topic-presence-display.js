define("discourse/plugins/discourse-presence/discourse/components/topic-presence-display", ["exports", "@ember/component", "@glimmer/component", "@glimmer/tracking", "@ember/object", "@ember/service", "@ember/template-factory"], function(_exports, _component, _component2, _tracking, _object, _service, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
        /*
          <div
          {{did-insert this.setupChannels}}
          {{did-update this.setupChannels @topic.id}}
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
                  {{i18n "presence.replying_to_topic" count=this.users.length}}
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
            "id": "48MbJy9j",
            "block": "[[[11,0],[4,[38,0],[[30,0,[\"setupChannels\"]]],null],[4,[38,1],[[30,0,[\"setupChannels\"]],[30,1,[\"id\"]]],null],[12],[1,\"\\n\"],[41,[30,0,[\"shouldDisplay\"]],[[[1,\"    \"],[10,0],[14,0,\"presence-users\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"presence-avatars\"],[12],[1,\"\\n\"],[42,[28,[37,4],[[28,[37,4],[[30,0,[\"users\"]]],null]],null],null,[[[1,\"          \"],[8,[39,5],null,[[\"@user\"],[[30,2]]],[[\"default\"],[[[[1,\"\\n            \"],[1,[28,[35,6],[[30,2]],[[\"imageSize\"],[\"small\"]]]],[1,\"\\n          \"]],[]]]]],[1,\"\\n\"]],[2]],null],[1,\"      \"],[13],[1,\"\\n      \"],[10,1],[14,0,\"presence-text\"],[12],[1,\"\\n        \"],[10,1],[14,0,\"description\"],[12],[1,\"\\n          \"],[1,[28,[35,7],[\"presence.replying_to_topic\"],[[\"count\"],[[30,0,[\"users\",\"length\"]]]]]],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,1],[14,0,\"wave\"],[12],[1,\"\\n          \"],[10,1],[14,0,\"dot\"],[12],[1,\".\"],[13],[1,\"\\n          \"],[10,1],[14,0,\"dot\"],[12],[1,\".\"],[13],[1,\"\\n          \"],[10,1],[14,0,\"dot\"],[12],[1,\".\"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[13]],[\"@topic\",\"user\"],false,[\"did-insert\",\"did-update\",\"if\",\"each\",\"-track-array\",\"user-link\",\"avatar\",\"i18n\"]]",
            "moduleName": "discourse/plugins/discourse-presence/discourse/components/topic-presence-display.hbs",
            "isStrictMode": false
        });
    class TopicPresenceDisplayComponent extends _component2.default {
        static# _ = (() => dt7948.g(this.prototype, "presence", [_service.service]))();#
        presence = (() => (dt7948.i(this, "presence"), void 0))();
        static# _2 = (() => dt7948.g(this.prototype, "currentUser", [_service.service]))();#
        currentUser = (() => (dt7948.i(this, "currentUser"), void 0))();
        static# _3 = (() => dt7948.g(this.prototype, "replyChannel", [_tracking.tracked]))();#
        replyChannel = (() => (dt7948.i(this, "replyChannel"), void 0))();
        static# _4 = (() => dt7948.g(this.prototype, "whisperChannel", [_tracking.tracked]))();#
        whisperChannel = (() => (dt7948.i(this, "whisperChannel"), void 0))();
        get replyChannelName() {
            return `/discourse-presence/reply/${this.args.topic.id}`;
        }
        get whisperChannelName() {
            return `/discourse-presence/whisper/${this.args.topic.id}`;
        }
        get replyUsers() {
            return this.replyChannel ? .users || [];
        }
        get whisperUsers() {
            return this.whisperChannel ? .users || [];
        }
        get users() {
            return [...this.replyUsers, ...this.whisperUsers].filter(u => u.id !== this.currentUser.id);
        }
        get shouldDisplay() {
            return this.users.length > 0;
        }
        setupChannels() {
            this.setupReplyChannel();
            this.setupWhisperChannel();
        }
        static# _5 = (() => dt7948.n(this.prototype, "setupChannels", [_object.action]))();
        willDestroy() {
            super.willDestroy(...arguments);
            this.unsubscribeFromChannels();
        }
        unsubscribeFromChannels() {
            this.replyChannel ? .unsubscribe();
            this.whisperChannel ? .unsubscribe();
        }
        setupReplyChannel() {
            if (this.replyChannel ? .name !== this.replyChannelName) {
                this.replyChannel ? .unsubscribe();
                this.replyChannel = this.presence.getChannel(this.replyChannelName);
                this.replyChannel.subscribe();
            }
        }
        setupWhisperChannel() {
            if (this.currentUser.staff) {
                if (this.whisperChannel ? .name !== this.whisperChannelName) {
                    this.whisperChannel ? .unsubscribe();
                    this.whisperChannel = this.presence.getChannel(this.whisperChannelName);
                    this.whisperChannel.subscribe();
                }
            }
        }
    }
    _exports.default = TopicPresenceDisplayComponent;
    (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, TopicPresenceDisplayComponent);
});