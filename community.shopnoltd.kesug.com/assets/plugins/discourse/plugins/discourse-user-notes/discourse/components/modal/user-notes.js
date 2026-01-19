define("discourse/plugins/discourse-user-notes/discourse/components/modal/user-notes", ["exports", "@ember/component", "@glimmer/component", "@glimmer/tracking", "@ember/object", "@ember/service", "discourse/lib/ajax-error", "I18n", "@ember/template-factory"], function(_exports, _component, _component2, _tracking, _object, _service, _ajaxError, _I18n, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
        /*
          <DModal
          @closeModal={{@closeModal}}
          @title={{i18n "user_notes.title"}}
          class="user-notes-modal"
        >
          <Textarea @value={{this.newNote}} />
          <DButton
            @action={{this.attachNote}}
            @label="user_notes.attach"
            @disabled={{this.attachDisabled}}
            class="btn-primary"
          />
  
          {{#each @model.note as |n|}}
            <div class="user-note">
              <div class="posted-by">
                <UserLink @user={{n.created_by}}>
                  {{avatar n.created_by imageSize="small"}}
                </UserLink>
              </div>
              <div class="note-contents">
                <div class="note-info">
                  <span class="username">{{n.created_by.username}}</span>
                  <span class="post-date">{{age-with-tooltip n.created_at}}</span>
  
                  {{#if n.can_delete}}
                    <span class="controls">
                      <DButton
                        @action={{fn this.removeNote n}}
                        @icon="far-trash-alt"
                        @title="user_notes.remove"
                        class="btn-small btn-danger"
                      />
                    </span>
                  {{/if}}
                </div>
  
                <div class="cooked">
                  <CookText @rawText={{n.raw}} />
                </div>
  
                {{#if n.post_id}}
                  <a href={{n.post_url}} class="btn btn-small">
                    {{i18n "user_notes.show_post"}}
                  </a>
                {{/if}}
              </div>
  
              <div class="clearfix"></div>
            </div>
          {{/each}}
        </DModal>
        */
        {
            "id": "D/DqTRRA",
            "block": "[[[8,[39,0],[[24,0,\"user-notes-modal\"]],[[\"@closeModal\",\"@title\"],[[30,1],[28,[37,1],[\"user_notes.title\"],null]]],[[\"default\"],[[[[1,\"\\n  \"],[8,[39,2],null,[[\"@value\"],[[30,0,[\"newNote\"]]]],null],[1,\"  \"],[8,[39,3],[[24,0,\"btn-primary\"]],[[\"@action\",\"@label\",\"@disabled\"],[[30,0,[\"attachNote\"]],\"user_notes.attach\",[30,0,[\"attachDisabled\"]]]],null],[1,\"\\n\\n\"],[42,[28,[37,5],[[28,[37,5],[[30,2,[\"note\"]]],null]],null],null,[[[1,\"    \"],[10,0],[14,0,\"user-note\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"posted-by\"],[12],[1,\"\\n        \"],[8,[39,6],null,[[\"@user\"],[[30,3,[\"created_by\"]]]],[[\"default\"],[[[[1,\"\\n          \"],[1,[28,[35,7],[[30,3,[\"created_by\"]]],[[\"imageSize\"],[\"small\"]]]],[1,\"\\n        \"]],[]]]]],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"note-contents\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"note-info\"],[12],[1,\"\\n          \"],[10,1],[14,0,\"username\"],[12],[1,[30,3,[\"created_by\",\"username\"]]],[13],[1,\"\\n          \"],[10,1],[14,0,\"post-date\"],[12],[1,[28,[35,8],[[30,3,[\"created_at\"]]],null]],[13],[1,\"\\n\\n\"],[41,[30,3,[\"can_delete\"]],[[[1,\"            \"],[10,1],[14,0,\"controls\"],[12],[1,\"\\n              \"],[8,[39,3],[[24,0,\"btn-small btn-danger\"]],[[\"@action\",\"@icon\",\"@title\"],[[28,[37,10],[[30,0,[\"removeNote\"]],[30,3]],null],\"far-trash-alt\",\"user_notes.remove\"]],null],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n\\n        \"],[10,0],[14,0,\"cooked\"],[12],[1,\"\\n          \"],[8,[39,11],null,[[\"@rawText\"],[[30,3,[\"raw\"]]]],null],[1,\"\\n        \"],[13],[1,\"\\n\\n\"],[41,[30,3,[\"post_id\"]],[[[1,\"          \"],[10,3],[15,6,[30,3,[\"post_url\"]]],[14,0,\"btn btn-small\"],[12],[1,\"\\n            \"],[1,[28,[35,1],[\"user_notes.show_post\"],null]],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"clearfix\"],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[3]],null]],[]]]]]],[\"@closeModal\",\"@model\",\"n\"],false,[\"d-modal\",\"i18n\",\"textarea\",\"d-button\",\"each\",\"-track-array\",\"user-link\",\"avatar\",\"age-with-tooltip\",\"if\",\"fn\",\"cook-text\"]]",
            "moduleName": "discourse/plugins/discourse-user-notes/discourse/components/modal/user-notes.hbs",
            "isStrictMode": false
        });
    class UserNotesModal extends _component2.default {
        static# _ = (() => dt7948.g(this.prototype, "dialog", [_service.inject]))();#
        dialog = (() => (dt7948.i(this, "dialog"), void 0))();
        static# _2 = (() => dt7948.g(this.prototype, "store", [_service.inject]))();#
        store = (() => (dt7948.i(this, "store"), void 0))();
        static# _3 = (() => dt7948.g(this.prototype, "newNote", [_tracking.tracked]))();#
        newNote = (() => (dt7948.i(this, "newNote"), void 0))();
        static# _4 = (() => dt7948.g(this.prototype, "userId", [_tracking.tracked], function() {
            return this.args.model.userId;
        }))();#
        userId = (() => (dt7948.i(this, "userId"), void 0))();
        static# _5 = (() => dt7948.g(this.prototype, "saving", [_tracking.tracked], function() {
            return false;
        }))();#
        saving = (() => (dt7948.i(this, "saving"), void 0))();
        postId = this.args.model.postId;
        callback = this.args.model.callback;#
        refreshCount() {
            if (this.callback) {
                this.callback(this.args.model.note.length);
            }
        }
        get attachDisabled() {
            return this.saving || !this.newNote || this.newNote.length === 0;
        }
        async attachNote() {
            const note = this.store.createRecord("user-note");
            const userId = parseInt(this.userId, 10);
            this.saving = true;
            const args = {
                raw: this.newNote,
                user_id: userId
            };
            if (this.postId) {
                args.post_id = parseInt(this.postId, 10);
            }
            try {
                await note.save(args);
                this.newNote = "";
                this.args.model.note.insertAt(0, note);
                this.#refreshCount();
            } catch (error) {
                (0, _ajaxError.popupAjaxError)(error);
            } finally {
                this.saving = false;
            }
        }
        static# _6 = (() => dt7948.n(this.prototype, "attachNote", [_object.action]))();
        removeNote(note) {
            this.dialog.deleteConfirm({
                message: _I18n.default.t("user_notes.delete_confirm"),
                didConfirm: () => {
                    note.destroyRecord().then(() => {
                        this.args.model.note.removeObject(note);
                        this.#refreshCount();
                    }).catch(_ajaxError.popupAjaxError);
                }
            });
        }
        static# _7 = (() => dt7948.n(this.prototype, "removeNote", [_object.action]))();
    }
    _exports.default = UserNotesModal;
    (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, UserNotesModal);
});