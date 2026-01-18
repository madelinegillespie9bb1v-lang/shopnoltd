import {
    template
} from "@ember/template-compiler";
const FKControlMenuContainer = template(`
  <li class="form-kit__control-menu-container">
    {{yield}}
  </li>
`, {
    eval() {
        return eval(arguments[0]);
    }
});
export default FKControlMenuContainer;