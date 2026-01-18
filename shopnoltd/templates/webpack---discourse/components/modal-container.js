import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    array
} from "@ember/helper";
import {
    action
} from "@ember/object";
import didInsert from "@ember/render-modifiers/modifiers/did-insert";
import {
    service
} from "@ember/service";
export default class ModalContainer extends Component {
    @service
    modal;
    @action
    closeModal(data1) {
        this.modal.close(data1);
    }
    static {
        template(`
    <div
      {{didInsert this.modal.setContainerElement}}
      class="modal-container"
    ></div>

    {{#if this.modal.activeModal}}
      {{#each (array this.modal.activeModal) as |activeModal|}}
        {{! #each ensures that the activeModal component/model are updated atomically }}
        <activeModal.component
          @model={{activeModal.opts.model}}
          @closeModal={{this.closeModal}}
        />
      {{/each}}
    {{/if}}
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}