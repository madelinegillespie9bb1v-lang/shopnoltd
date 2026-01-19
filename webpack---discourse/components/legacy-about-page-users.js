import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import AboutPageUser from "discourse/components/about-page-user";
export default class LegacyAboutPageUsers extends Component {
    get users() {
        return this.args.users || [];
    }
    static {
        template(`
    {{#each this.users as |user|}}
      <AboutPageUser @user={{user}} />
    {{/each}}
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}