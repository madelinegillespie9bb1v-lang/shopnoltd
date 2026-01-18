/* import __COLOCATED_TEMPLATE__ from './link-to-input.hbs'; */
import Component from "@ember/component";
import {
    schedule
} from "@ember/runloop";
import $ from "jquery";

export default class LinkToInput extends Component {
    showInput = false;

    click() {
        this.onClick();

        schedule("afterRender", () => {
            $(this.element).find("input").focus();
        });

        return false;
    }
}