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
import AceEditor from "discourse/components/ace-editor";
import {
    escapeExpression
} from "discourse/lib/utilities";
export default class FKControlCode extends Component {
    static controlType = "code";
    initialValue = this.args.value || "";
    @action
    handleInput(content1) {
        this.args.field.set(content1);
    }
    get style() {
        if (!this.args.height) {
            return;
        }
        return htmlSafe(`height: ${escapeExpression(this.args.height)}px`);
    }
    static {
        template(`
    <AceEditor
      @content={{this.initialValue}}
      @onChange={{this.handleInput}}
      @mode={{@lang}}
      @disabled={{@field.disabled}}
      class="form-kit__control-code"
      style={{this.style}}
      ...attributes
    />
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}