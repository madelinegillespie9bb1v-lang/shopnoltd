import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    tracked
} from "@glimmer/tracking";
import {
    hash
} from "@ember/helper";
import {
    action
} from "@ember/object";
import FKControlConditionalDisplayCondition from "./conditional-content/condition";
import FKControlConditionalContentContent from "./conditional-content/content";
const Conditions = template(`
  <div class="form-kit__inline-radio">
    {{yield
      (component
        FKControlConditionalDisplayCondition
        activeName=@activeName
        setCondition=@setCondition
      )
    }}
  </div>
`, {
    eval() {
        return eval(arguments[0]);
    }
});
const Contents = template(`
  {{yield
    (component FKControlConditionalContentContent activeName=@activeName)
  }}
`, {
    eval() {
        return eval(arguments[0]);
    }
});
export default class FKControlConditionalContent extends Component {
    @tracked
    activeName = this.args.activeName;
    @action
    setCondition(name1) {
        this.activeName = name1;
    }
    static {
        template(`
    <div class="form-kit__conditional-display">
      {{yield
        (hash
          Conditions=(component
            Conditions activeName=this.activeName setCondition=this.setCondition
          )
          Contents=(component Contents activeName=this.activeName)
        )
      }}
    </div>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}