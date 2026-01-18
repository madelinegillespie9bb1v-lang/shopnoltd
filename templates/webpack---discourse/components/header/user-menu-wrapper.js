import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    hash
} from "@ember/helper";
import {
    action
} from "@ember/object";
import {
    isDocumentRTL
} from "discourse/lib/text-direction";
import {
    prefersReducedMotion
} from "discourse/lib/utilities";
import {
    isTesting
} from "discourse-common/config/environment";
import discourseLater from "discourse-common/lib/later";
import closeOnClickOutside from "../../modifiers/close-on-click-outside";
import UserMenu from "../user-menu/menu";
export default class UserMenuWrapper extends Component {
    @action
    clickOutside(e1) {
        if (e1.target.classList.contains("header-cloak") && !prefersReducedMotion()) {
            const panel1 = document.querySelector(".menu-panel");
            const headerCloak1 = document.querySelector(".header-cloak");
            const finishPosition1 = isDocumentRTL() ? "-340px" : "340px";
            panel1.animate([{
                transform: `translate3d(${finishPosition1}, 0, 0)`
            }], {
                duration: 200,
                fill: "forwards",
                easing: "ease-in"
            }).finished.then(() => {
                if (isTesting()) {
                    this.args.toggleUserMenu();
                } else {
                    discourseLater(() => this.args.toggleUserMenu());
                }
            });
            headerCloak1.animate([{
                opacity: 0
            }], {
                duration: 200,
                fill: "forwards",
                easing: "ease-in"
            });
        } else {
            this.args.toggleUserMenu();
        }
    }
    static {
        template(`
    <div
      class="user-menu-dropdown-wrapper"
      {{closeOnClickOutside
        this.clickOutside
        (hash
          targetSelector=".user-menu-panel"
          secondaryTargetSelector=".user-menu-panel"
        )
      }}
      ...attributes
    >
      <UserMenu @closeUserMenu={{@toggleUserMenu}} />
    </div>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}