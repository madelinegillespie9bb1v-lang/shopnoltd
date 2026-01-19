/* import __COLOCATED_TEMPLATE__ from './user-summary-category-search.hbs'; */
import Component from "@ember/component";
import {
    tagName
} from "@ember-decorators/component";
import discourseComputed from "discourse-common/utils/decorators";

@tagName("")
export default class UserSummaryCategorySearch extends Component {
    @discourseComputed("user", "category")
    searchParams() {
        let query = `@${this.get("user.username")} #${this.get("category.slug")}`;
        if (this.searchOnlyFirstPosts) {
            query += " in:first";
        }
        return query;
    }
}