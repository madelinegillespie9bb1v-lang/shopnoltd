import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    action
} from "@ember/object";
import {
    htmlSafe
} from "@ember/template";
import DEditor from "discourse/components/d-editor";
import {
    escapeExpression
} from "discourse/lib/utilities";
export default class FKControlComposer extends Component {
    static controlType = "composer";
    @action
    handleInput(event1) {
        this.args.field.set(event1.target.value);
    }
    get style() {
        if (this.args.height) {
            return;
        }
        return htmlSafe(`height: ${escapeExpression(this.args.height)}px`);
    }
    static {
        template(`
    <DEditor
      @value={{readonly @value}}
      @change={{this.handleInput}}
      @disabled={{@field.disabled}}
      class="form-kit__control-composer"
      style={{this.style}}
      @textAreaId={{@field.id}}
    />
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}