/* import __COLOCATED_TEMPLATE__ from './reviewable-histories.hbs'; */
import Component from "@ember/component";
import {
    filterBy
} from "@ember/object/computed";

export default class ReviewableHistories extends Component {
    @filterBy("histories", "created", false) filteredHistories;
}