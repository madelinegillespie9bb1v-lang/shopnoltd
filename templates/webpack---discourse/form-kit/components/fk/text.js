import {
    template
} from "@ember/template-compiler";
const FKText = template(`
  <p class="form-kit-text" ...attributes>
    {{yield}}
  </p>
`, {
    eval() {
        return eval(arguments[0]);
    }
});
export default FKText;