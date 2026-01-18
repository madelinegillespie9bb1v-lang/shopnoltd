import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    on
} from "@ember/modifier";
import {
    action
} from "@ember/object";
import i18n from "discourse-common/helpers/i18n";
export default class ActivationEmailForm extends Component {
    @action
    newEmailChanged(event1) {
        this.args.updateNewEmail(event1.target.value);
    }
    static {
        template(`
    <p>{{i18n "login.provide_new_email"}}</p>
    <input
      {{on "input" this.newEmailChanged}}
      value={{@email}}
      type="text"
      class="activate-new-email"
    />
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}