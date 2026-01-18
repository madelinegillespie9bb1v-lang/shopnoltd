/* import __COLOCATED_TEMPLATE__ from './mobile-category-topic.hbs'; */
import Component from "@ember/component";
import {
    classNameBindings,
    tagName
} from "@ember-decorators/component";
import {
    showEntrance
} from "discourse/components/topic-list-item";

@tagName("tr")
@classNameBindings(":category-topic-link", "topic.archived", "topic.visited")
export default class MobileCategoryTopic extends Component {
    click = showEntrance;
}