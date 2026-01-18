import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    on
} from "@ember/modifier";
import {
    action
} from "@ember/object";
export default class TrackSelected extends Component {
    @action
    onToggle(e1) {
        if (e1.target.checked) {
            this.args.selectedList.addObject(this.args.selectedId);
        } else {
            this.args.selectedList.removeObject(this.args.selectedId);
        }
    }
    static {
        template(`
    <span class={{@class}} ...attributes>
      <input {{on "input" this.onToggle}} type="checkbox" />
    </span>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}