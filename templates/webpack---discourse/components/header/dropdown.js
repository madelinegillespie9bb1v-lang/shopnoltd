import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    hash
} from "@ember/helper";
import {
    on
} from "@ember/modifier";
import {
    action
} from "@ember/object";
import {
    and
} from "truth-helpers";
import DButton from "discourse/components/d-button";
import concatClass from "discourse/helpers/concat-class";
import {
    wantsNewWindow
} from "discourse/lib/intercept-click";
import i18n from "discourse-common/helpers/i18n";
import closeOnClickOutside from "../../modifiers/close-on-click-outside";
export default class Dropdown extends Component {
    @action
    click(e1) {
        if (wantsNewWindow(e1)) {
            return;
        }
        e1.preventDefault();
        this.args.onClick(e1);
        // remove the focus of the header dropdown button after clicking
        e1.target.tagName.toLowerCase() === "button" ? e1.target.blur() : e1.target.closest("button").blur();
    }
    static {
        template(`
    <li
      class={{concatClass
        @className
        (if @active "active")
        "header-dropdown-toggle"
      }}
      {{(if
        (and @active @targetSelector)
        (modifier
          closeOnClickOutside @onClick (hash targetSelector=@targetSelector)
        )
      )}}
    >
      <DButton
        class="icon btn-flat"
        aria-expanded={{@active}}
        aria-haspopup="true"
        @translatedTitle={{i18n @title}}
        aria-label={{i18n @title}}
        id={{@iconId}}
        @icon={{@icon}}
        @translatedLabel={{@contents}}
        {{on "click" this.click}}
      />

    </li>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}