import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
export default class FKControlCustom extends Component {
    static controlType = "custom";
    static {
        template(`
    <div class="form-kit__control-custom">
      {{yield}}
    </div>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}