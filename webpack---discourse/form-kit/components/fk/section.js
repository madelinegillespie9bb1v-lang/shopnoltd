import {
    template
} from "@ember/template-compiler";
import concatClass from "discourse/helpers/concat-class";
const FKSection = template(`
  <div class={{concatClass "form-kit__section" @class}} ...attributes>
    {{#if @title}}
      <h2 class="form-kit__section-title">{{@title}}</h2>
    {{/if}}

    {{#if @subtitle}}
      <span class="form-kit__section-subtitle">{{@subtitle}}</span>
    {{/if}}

    {{yield}}
  </div>
`, {
    eval() {
        return eval(arguments[0]);
    }
});
export default FKSection;