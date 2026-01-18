/* import __COLOCATED_TEMPLATE__ from './group-manage-logs-row.hbs'; */
import Component from "@ember/component";
import {
    action
} from "@ember/object";
import {
    tagName
} from "@ember-decorators/component";

@tagName("")
export default class GroupManageLogsRow extends Component {
    expandDetails = false;

    @action
    toggleDetails() {
        this.toggleProperty("expandDetails");
    }

    @action
    filter(params) {
        this.set(`filters.${params.key}`, params.value);
    }
}