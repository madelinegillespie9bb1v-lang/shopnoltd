import {
    template
} from "@ember/template-compiler";
const FKControlMenuDivider = template(`
  <@divider class="form-kit__control-menu-divider" />
`, {
    eval() {
        return eval(arguments[0]);
    }
});
export default FKControlMenuDivider;