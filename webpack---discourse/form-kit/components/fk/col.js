import {
    template
} from "@ember/template-compiler";
import {
    concat
} from "@ember/helper";
import concatClass from "discourse/helpers/concat-class";
const FKCol = template(`
  <div class={{concatClass "form-kit__col" (if @size (concat "--col-" @size))}}>
    {{yield}}
  </div>
`, {
    eval() {
        return eval(arguments[0]);
    }
});
export default FKCol;