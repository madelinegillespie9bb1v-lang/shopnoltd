import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import icon from "discourse-common/helpers/d-icon";
export default class FKErrors extends Component {
    concatErrors(errors1) {
        return errors1.join(", ");
    }
    static {
        template(`
    <p class="form-kit__errors" id={{@id}} aria-live="assertive" ...attributes>
      <span>
        {{icon "triangle-exclamation"}}
        {{this.concatErrors @error.messages}}
      </span>
    </p>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}