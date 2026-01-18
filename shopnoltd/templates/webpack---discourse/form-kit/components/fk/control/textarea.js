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
import {
    htmlSafe
} from "@ember/template";
import {
    escapeExpression
} from "discourse/lib/utilities";
export default class FKControlTextarea extends Component {
    static controlType = "textarea";
    @action
    handleInput(event1) {
        this.args.field.set(event1.target.value);
    }
    get style() {
        if (!this.args.height) {
            return;
        }
        return htmlSafe(`height: ${escapeExpression(this.args.height)}px`);
    }
    static {
        template(`
    <textarea
      class="form-kit__control-textarea"
      style={{this.style}}
      ...attributes
      {{on "input" this.handleInput}}
    >{{@value}}</textarea>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}