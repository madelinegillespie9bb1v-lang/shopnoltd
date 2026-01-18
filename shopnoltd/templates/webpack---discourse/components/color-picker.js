/* import __COLOCATED_TEMPLATE__ from './color-picker.hbs'; */
import Component from "@ember/component";
import {
    action
} from "@ember/object";
import {
    classNames
} from "@ember-decorators/component";

@classNames("colors-container")
export default class ColorPicker extends Component {
    @action
    selectColor(color) {
        this.set("value", color);
    }
}