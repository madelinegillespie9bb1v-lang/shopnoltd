import {
    template
} from "@ember/template-compiler";
import SearchMenuPanel from "../search-menu-panel";
const SearchMenuWrapper = template(`
  <div class="search-menu glimmer-search-menu" aria-live="polite" ...attributes>
    <SearchMenuPanel @closeSearchMenu={{@closeSearchMenu}} />
  </div>
`, {
    eval() {
        return eval(arguments[0]);
    }
});
export default SearchMenuWrapper;