import {
    template
} from "@ember/template-compiler";
import {
    eq
} from "truth-helpers";
const FKControlConditionalContentItem = template(`
  {{#if (eq @name @activeName)}}
    <div class="form-kit__conditional-display-content">
      {{yield}}
    </div>
  {{/if}}
`, {
    eval() {
        return eval(arguments[0]);
    }
});
export default FKControlConditionalContentItem;