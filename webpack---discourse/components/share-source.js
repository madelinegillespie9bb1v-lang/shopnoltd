import {
    template
} from "@ember/template-compiler";
import {
    fn
} from "@ember/helper";
import {
    or
} from "truth-helpers";
import DButton from "discourse/components/d-button";
const ShareSource = template(`
  <DButton
    @action={{fn @action @source}}
    @translatedTitle={{@source.title}}
    @icon={{or @source.icon @source.htmlIcon}}
    class="btn-default share-{{@source.id}}"
    ...attributes
  />
`, {
    eval() {
        return eval(arguments[0]);
    }
});
export default ShareSource;