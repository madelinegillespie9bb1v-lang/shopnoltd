/* import __COLOCATED_TEMPLATE__ from './blurb.hbs'; */
import Component from "@glimmer/component";
import {
    service
} from "@ember/service";

export default class Blurb extends Component {
    @service siteSettings;
    @service site;
}