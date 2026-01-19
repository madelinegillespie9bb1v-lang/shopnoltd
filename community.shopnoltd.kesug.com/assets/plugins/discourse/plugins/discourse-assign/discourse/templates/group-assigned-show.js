define("discourse/plugins/discourse-assign/discourse/templates/group-assigned-show", ["exports", "@ember/template-factory"], function(_exports, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          <div class="topic-search-div">
          <div class="inline-form full-width">
            <Input
              {{on "input" (action "onChangeFilter" value="target.value")}}
              @value={{readonly this.search}}
              @type="search"
              placeholder={{i18n "discourse_assign.topic_search_placeholder"}}
              autocomplete="off"
              class="no-blur"
            />
          </div>
        </div>
  
        <LoadMore
          @selector=".paginated-topics-list .topic-list tr"
          @action={{action "loadMore"}}
          class="paginated-topics-list"
        >
          <BasicTopicList
            @topicList={{this.model}}
            @hideCategory={{this.hideCategory}}
            @showPosters={{this.showPosters}}
            @bulkSelectEnabled={{this.bulkSelectEnabled}}
            @canBulkSelect={{this.canBulkSelect}}
            @selected={{this.selected}}
            @hasIncoming={{this.hasIncoming}}
            @incomingCount={{this.incomingCount}}
            @showInserted={{action "showInserted"}}
            @tagsForUser={{this.tagsForUser}}
            @changeSort={{action "changeSort"}}
            @toggleBulkSelect={{action "toggleBulkSelect"}}
            @bulkSelectAction={{action "refresh"}}
            @bulkSelectHelper={{this.bulkSelectHelper}}
            @unassign={{action "unassign"}}
            @reassign={{action "reassign"}}
            @onScroll={{this.saveScrollPosition}}
            @scrollOnLoad={{true}}
          />
  
          <ConditionalLoadingSpinner @condition={{this.model.loadingMore}} />
        </LoadMore>
        */
        {
            "id": "8IcXMtCZ",
            "block": "[[[10,0],[14,0,\"topic-search-div\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"inline-form full-width\"],[12],[1,\"\\n    \"],[8,[39,0],[[16,\"placeholder\",[28,[37,1],[\"discourse_assign.topic_search_placeholder\"],null]],[24,\"autocomplete\",\"off\"],[24,0,\"no-blur\"],[4,[38,3],[\"input\",[28,[37,4],[[30,0],\"onChangeFilter\"],[[\"value\"],[\"target.value\"]]]],null]],[[\"@value\",\"@type\"],[[28,[37,2],[[30,0,[\"search\"]]],null],\"search\"]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[8,[39,5],[[24,0,\"paginated-topics-list\"]],[[\"@selector\",\"@action\"],[\".paginated-topics-list .topic-list tr\",[28,[37,4],[[30,0],\"loadMore\"],null]]],[[\"default\"],[[[[1,\"\\n  \"],[8,[39,6],null,[[\"@topicList\",\"@hideCategory\",\"@showPosters\",\"@bulkSelectEnabled\",\"@canBulkSelect\",\"@selected\",\"@hasIncoming\",\"@incomingCount\",\"@showInserted\",\"@tagsForUser\",\"@changeSort\",\"@toggleBulkSelect\",\"@bulkSelectAction\",\"@bulkSelectHelper\",\"@unassign\",\"@reassign\",\"@onScroll\",\"@scrollOnLoad\"],[[30,0,[\"model\"]],[30,0,[\"hideCategory\"]],[30,0,[\"showPosters\"]],[30,0,[\"bulkSelectEnabled\"]],[30,0,[\"canBulkSelect\"]],[30,0,[\"selected\"]],[30,0,[\"hasIncoming\"]],[30,0,[\"incomingCount\"]],[28,[37,4],[[30,0],\"showInserted\"],null],[30,0,[\"tagsForUser\"]],[28,[37,4],[[30,0],\"changeSort\"],null],[28,[37,4],[[30,0],\"toggleBulkSelect\"],null],[28,[37,4],[[30,0],\"refresh\"],null],[30,0,[\"bulkSelectHelper\"]],[28,[37,4],[[30,0],\"unassign\"],null],[28,[37,4],[[30,0],\"reassign\"],null],[30,0,[\"saveScrollPosition\"]],true]],null],[1,\"\\n\\n  \"],[8,[39,7],null,[[\"@condition\"],[[30,0,[\"model\",\"loadingMore\"]]]],null],[1,\"\\n\"]],[]]]]]],[],false,[\"input\",\"i18n\",\"readonly\",\"on\",\"action\",\"load-more\",\"basic-topic-list\",\"conditional-loading-spinner\"]]",
            "moduleName": "discourse/plugins/discourse-assign/discourse/templates/group-assigned-show.hbs",
            "isStrictMode": false
        });
});