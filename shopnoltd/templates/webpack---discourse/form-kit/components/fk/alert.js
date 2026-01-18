import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import icon from "discourse-common/helpers/d-icon";
export default class FKAlert extends Component {
    get type() {
        return this.args.type || "info";
    }
    static {
        template(`
    <div class="form-kit__alert alert alert-{{this.type}}" ...attributes>
      {{#if @icon}}
        {{icon @icon}}
      {{/if}}

      <span class="form-kit__alert-message">{{yield}}</span>
    </div>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}