define("discourse/plugins/discourse-user-notes/discourse/components/show-user-notes", ["exports", "@ember/component", "@glimmer/component", "I18n", "@ember/template-factory"], function(_exports, _component, _component2, _I18n, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
        /*
          <DButton
          class="btn-default show-user-notes-btn"
          @action={{@show}}
          @icon="pencil-alt"
          @translatedLabel={{this.label}}
        />
        */
        {
            "id": "9cFtjB6k",
            "block": "[[[8,[39,0],[[24,0,\"btn-default show-user-notes-btn\"]],[[\"@action\",\"@icon\",\"@translatedLabel\"],[[30,1],\"pencil-alt\",[30,0,[\"label\"]]]],null]],[\"@show\"],false,[\"d-button\"]]",
            "moduleName": "discourse/plugins/discourse-user-notes/discourse/components/show-user-notes.hbs",
            "isStrictMode": false
        });
    class ShowUserNotes extends _component2.default {
        get label() {
            if (this.args.count > 0) {
                return _I18n.default.t("user_notes.show", {
                    count: this.args.count
                });
            } else {
                return _I18n.default.t("user_notes.title");
            }
        }
    }
    _exports.default = ShowUserNotes;
    (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, ShowUserNotes);
});