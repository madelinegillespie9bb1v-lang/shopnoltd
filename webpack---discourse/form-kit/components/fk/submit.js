import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import DButton from "discourse/components/d-button";
export default class FKSubmit extends Component {
    get label() {
        return this.args.label ? ? "submit";
    }
    static {
        template(`
    <DButton
      @label={{this.label}}
      @action={{@onSubmit}}
      @forwardEvent="true"
      class="btn-primary form-kit__button"
      type="submit"
      @isLoading={{@isLoading}}
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