import {
    template
} from "@ember/template-compiler";
const FKLabel = template(`
  <label for={{@fieldId}} ...attributes>
    {{yield}}
  </label>
`, {
    eval() {
        return eval(arguments[0]);
    }
});
export default FKLabel;