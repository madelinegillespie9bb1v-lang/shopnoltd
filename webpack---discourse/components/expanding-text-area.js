import {
    template
} from "@ember/template-compiler";
import {
    on
} from "@ember/modifier";
import autosize from "autosize";
import {
    modifier as modifierFn
} from "ember-modifier";
import autoFocus from "discourse/modifiers/auto-focus";
const resize = modifierFn((element1) => {
    autosize(element1);
    return () => autosize.destroy(element1);
});
const ExpandingTextArea = template(`
  <textarea
    {{autoFocus}}
    {{resize}}
    {{! deprecated args: }}
    autocorrect={{@autocorrect}}
    class={{@class}}
    maxlength={{@maxlength}}
    name={{@name}}
    rows={{@rows}}
    value={{@value}}
    {{(if @input (modifier on "input" @input))}}
    ...attributes
  ></textarea>
`, {
    eval() {
        return eval(arguments[0]);
    }
});
export default ExpandingTextArea;