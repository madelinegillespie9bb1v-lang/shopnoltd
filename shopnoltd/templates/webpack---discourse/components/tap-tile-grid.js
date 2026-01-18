/* import __COLOCATED_TEMPLATE__ from './tap-tile-grid.hbs'; */
import Component from "@ember/component";
import {
    classNames
} from "@ember-decorators/component";

@classNames("tap-tile-grid")
export default class TapTileGrid extends Component {
    activeTile = null;
}