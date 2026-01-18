import {
    template
} from "@ember/template-compiler";
import Component from "@glimmer/component";
import {
    service
} from "@ember/service";
import {
    modifier
} from "ember-modifier";
import {
    eq
} from "truth-helpers";
import concatClass from "discourse/helpers/concat-class";
export default class DBreadcrumbsContainer extends Component {
    @service
    breadcrumbs;
    registerContainer = modifier((element1) => {
        const container1 = {
            element: element1
        };
        this.breadcrumbs.containers.add(container1);
        return () => this.breadcrumbs.containers.delete(container1);
    });
    get lastItemIndex() {
        return this.breadcrumbs.items.size - 1;
    }
    static {
        template(`
    <ul {{this.registerContainer}} class="d-breadcrumbs" ...attributes>
      {{#each this.breadcrumbs.items as |item index|}}
        {{#let item.templateForContainer as |Template|}}
          <Template
            @linkClass={{concatClass
              "d-breadcrumbs__link"
              @additionalLinkClasses
            }}
            aria-current={{if (eq index this.lastItemIndex) "page"}}
            class={{concatClass "d-breadcrumbs__item" @additionalItemClasses}}
          />
        {{/let}}
      {{/each}}
    </ul>
  `, {
            component: this,
            eval() {
                return eval(arguments[0]);
            }
        });
    }
}