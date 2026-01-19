import {
    template
} from "@ember/template-compiler";
import icon from "discourse-common/helpers/d-icon";
const ActionList = template(`
  {{#if @postNumbers}}
    <div class="post-actions" ...attributes>
      {{icon @icon}}
      {{#each @postNumbers as |postNumber|}}
        <a href="{{@topic.url}}/{{postNumber}}">#{{postNumber}}</a>
      {{/each}}
    </div>
  {{/if}}
`, {
    eval() {
        return eval(arguments[0]);
    }
});
export default ActionList;