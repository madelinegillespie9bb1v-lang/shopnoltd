define("discourse/plugins/discourse-user-notes/discourse-user-notes/connectors/user-card-post-names/show-user-notes-on-card", ["exports", "@glimmer/component", "@ember/object", "@ember/service", "discourse/components/d-button", "discourse/helpers/emoji", "discourse-common/helpers/d-icon", "I18n", "discourse/plugins/discourse-user-notes/discourse-user-notes/lib/user-notes", "@ember/component", "@ember/template-factory"], function(_exports, _component, _object, _service, _dButton, _emoji, _dIcon, _I18n, _userNotes, _component2, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    class _default extends _component.default {
        static shouldRender(args1, context1) {
            const {
                siteSettings: siteSettings1,
                currentUser: currentUser1
            } = context1;
            return siteSettings1.user_notes_enabled && currentUser1 ? .staff;
        }
        static# _ = (() => dt7948.g(this.prototype, "siteSettings", [_service.service]))();#
        siteSettings = (() => (dt7948.i(this, "siteSettings"), void 0))();
        static# _2 = (() => dt7948.g(this.prototype, "currentUser", [_service.service]))();#
        currentUser = (() => (dt7948.i(this, "currentUser"), void 0))();
        static# _3 = (() => dt7948.g(this.prototype, "store", [_service.service]))();#
        store = (() => (dt7948.i(this, "store"), void 0))();
        get userNotesCount() {
            return parseInt(this.args.outletArgs.user.get("user_notes_count") || this.args.outletArgs.user.get("custom_fields.user_notes_count") || 0, 10);
        }
        showUserNotes() {
            (0, _userNotes.showUserNotes)(this.store, this.args.outletArgs.user.id);
        }
        static# _4 = (() => dt7948.n(this.prototype, "showUserNotes", [_object.action]))();
        static# _5 = (() => (0, _component2.setComponentTemplate)((0, _templateFactory.createTemplateFactory)(
            /*
              
                <div class="show-user-notes-on-card">
                  {{#if this.userNotesCount}}
                    <DButton
                      @translatedTitle={{I18n.t
                        "user_notes.show"
                        count=this.userNotesCount
                      }}
                      @action={{this.showUserNotes}}
                      class="btn-flat"
                    >
                      {{#if this.siteSettings.enable_emoji}}
                        {{emoji "pencil"}}
                      {{else}}
                        {{icon "sticky-note"}}
                      {{/if}}
                    </DButton>
                  {{/if}}
                </div>
              
            */
            {
                "id": "BZWDPISr",
                "block": "[[[1,\"\\n    \"],[10,0],[14,0,\"show-user-notes-on-card\"],[12],[1,\"\\n\"],[41,[30,0,[\"userNotesCount\"]],[[[1,\"        \"],[8,[32,0],[[24,0,\"btn-flat\"]],[[\"@translatedTitle\",\"@action\"],[[28,[32,1,[\"t\"]],[\"user_notes.show\"],[[\"count\"],[[30,0,[\"userNotesCount\"]]]]],[30,0,[\"showUserNotes\"]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"siteSettings\",\"enable_emoji\"]],[[[1,\"            \"],[1,[28,[32,2],[\"pencil\"],null]],[1,\"\\n\"]],[]],[[[1,\"            \"],[1,[28,[32,3],[\"sticky-note\"],null]],[1,\"\\n\"]],[]]],[1,\"        \"]],[]]]]],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n  \"]],[],false,[\"if\"]]",
                "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/plugins/discourse-user-notes/discourse-user-notes/connectors/user-card-post-names/show-user-notes-on-card.js",
                "scope": () => [_dButton.default, _I18n.default, _emoji.default, _dIcon.default],
                "isStrictMode": true
            }), this))();
    }
    _exports.default = _default;
});