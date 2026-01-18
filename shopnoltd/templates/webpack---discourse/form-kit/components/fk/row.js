import {
    template
} from "@ember/template-compiler";
import {
    hash
} from "@ember/helper";
import FKCol from "discourse/form-kit/components/fk/col";
const FKRow = template(`
  <div class="form-kit__row" ...attributes>
    {{yield (hash Col=FKCol)}}
  </div>
`, {
    eval() {
        return eval(arguments[0]);
    }
});
export default FKRow;