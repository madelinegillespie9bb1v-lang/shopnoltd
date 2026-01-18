import {
    template
} from "@ember/template-compiler";
import {
    hash
} from "@ember/helper";
const DropdownItem = template(`
  <li class="dropdown-menu__item" ...attributes>{{yield}}</li>
`, {
    eval() {
        return eval(arguments[0]);
    }
});
const DropdownDivider = template(`
  <li ...attributes><hr class="dropdown-menu__divider" /></li>
`, {
    eval() {
        return eval(arguments[0]);
    }
});
const DropdownMenu = template(`
  <ul class="dropdown-menu" ...attributes>
    {{yield (hash item=DropdownItem divider=DropdownDivider)}}
  </ul>
`, {
    eval() {
        return eval(arguments[0]);
    }
});
export default DropdownMenu;