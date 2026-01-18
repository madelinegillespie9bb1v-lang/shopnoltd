/* import __COLOCATED_TEMPLATE__ from './composer-container.hbs'; */
import Component from "@glimmer/component";
import {
    service
} from "@ember/service";

export default class ComposerContainer extends Component {
    @service composer;
    @service site;
}