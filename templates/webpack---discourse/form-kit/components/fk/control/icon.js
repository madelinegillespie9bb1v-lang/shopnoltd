import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    hash
} from "@ember/helper";
import {
    action
} from "@ember/object";
import IconPicker from "select-kit/components/icon-picker";
export default class FKControlIcon extends Component {
    static controlType = "icon";
    @action
    handleInput(value1) {
        this.args.field.set(value1);
    }
    static {
        template(`
    <IconPicker
      @value={{readonly @value}}
      @onlyAvailable={{true}}
      @options={{hash
        maximum=1
        disabled=@field.disabled
        caretDownIcon="angle-down"
        caretUpIcon="angle-up"
        icons=@value
      }}
      @onChange={{this.handleInput}}
      class="form-kit__control-icon"
    />
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}