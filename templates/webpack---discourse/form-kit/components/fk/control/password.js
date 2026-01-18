import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    tracked
} from "@glimmer/tracking";
import {
    on
} from "@ember/modifier";
import {
    action
} from "@ember/object";
import {
    modifier as modifierFn
} from "ember-modifier";
import {
    eq
} from "truth-helpers";
import DButton from "discourse/components/d-button";
import concatClass from "discourse/helpers/concat-class";
const TYPES = {
    text: "text",
    password: "password"
};
export default class FKControlInput extends Component {
    static controlType = "password";
    @tracked
    type = TYPES.password;
    @tracked
    isFocused = false;
    focusState = modifierFn((element1) => {
        const focusInHandler1 = () => {
            this.isFocused = true;
        };
        const focusOutHandler1 = () => {
            this.isFocused = false;
        };
        element1.addEventListener("focusin", focusInHandler1);
        element1.addEventListener("focusout", focusOutHandler1);
        return () => {
            element1.removeEventListener("focusin", focusInHandler1);
            element1.removeEventListener("focusout", focusOutHandler1);
        };
    });
    get iconForType() {
        return this.type === TYPES.password ? "far-eye" : "far-eye-slash";
    }
    @action
    handleInput(event1) {
        const value1 = event1.target.value === "" ? undefined : event1.target.value;
        this.args.field.set(value1);
    }
    @action
    toggleVisibility() {
        this.type = this.type === TYPES.password ? TYPES.text : TYPES.password;
    }
    static {
        template(`
    <div
      class={{concatClass
        "form-kit__control-password-wrapper"
        (if this.isFocused "is-focused")
      }}
    >
      <input
        type={{this.type}}
        value={{@value}}
        class="form-kit__control-password"
        disabled={{@field.disabled}}
        ...attributes
        {{on "input" this.handleInput}}
        {{this.focusState}}
      />

      <DButton
        class="btn-transparent form-kit__control-password-toggle"
        @action={{this.toggleVisibility}}
        @icon={{this.iconForType}}
        role="switch"
        aria-checked={{eq this.type TYPES.text}}
      />
    </div>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}