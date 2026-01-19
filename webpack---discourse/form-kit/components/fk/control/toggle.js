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
import DToggleSwitch from "discourse/components/d-toggle-switch";
export default class FKControlToggle extends Component {
    static controlType = "toggle";
    @action
    handleInput() {
        this.args.field.set(!this.args.value);
    }
    static {
        template(`
    <DToggleSwitch
      @state={{@value}}
      {{on "click" this.handleInput}}
      class="form-kit__control-toggle"
    />
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}