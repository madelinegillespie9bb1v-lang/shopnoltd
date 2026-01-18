define("discourse/plugins/discourse-assign/discourse/templates/user-activity-assigned", ["exports", "@ember/template-factory"], function(_exports, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          {{#if this.doesntHaveAssignments}}
          <EmptyState
            @title={{i18n "user.no_assignments_title"}}
            @body={{this.emptyStateBody}}
          />
        {{else}}
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
              @showPosters={{true}}
              @bulkSelectEnabled={{this.bulkSelectEnabled}}
              @selected={{this.selected}}
              @hasIncoming={{this.hasIncoming}}
              @incomingCount={{this.incomingCount}}
              @showInserted={{this.showInserted}}
              @tagsForUser={{this.tagsForUser}}
              @changeSort={{this.changeSort}}
              @unassign={{this.unassign}}
              @reassign={{this.reassign}}
              @onScroll={{this.saveScrollPosition}}
              @scrollOnLoad={{true}}
            />
  
            <ConditionalLoadingSpinner @condition={{this.model.loadingMore}} />
          </LoadMore>
        {{/if}}
        */
        {
            "id": "LEmOIykp",
            "block": "[[[41,[30,0,[\"doesntHaveAssignments\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@title\",\"@body\"],[[28,[37,2],[\"user.no_assignments_title\"],null],[30,0,[\"emptyStateBody\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"  \"],[10,0],[14,0,\"topic-search-div\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"inline-form full-width\"],[12],[1,\"\\n      \"],[8,[39,3],[[16,\"placeholder\",[28,[37,2],[\"discourse_assign.topic_search_placeholder\"],null]],[24,\"autocomplete\",\"off\"],[24,0,\"no-blur\"],[4,[38,5],[\"input\",[28,[37,6],[[30,0],\"onChangeFilter\"],[[\"value\"],[\"target.value\"]]]],null]],[[\"@value\",\"@type\"],[[28,[37,4],[[30,0,[\"search\"]]],null],\"search\"]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[8,[39,7],[[24,0,\"paginated-topics-list\"]],[[\"@selector\",\"@action\"],[\".paginated-topics-list .topic-list tr\",[28,[37,6],[[30,0],\"loadMore\"],null]]],[[\"default\"],[[[[1,\"\\n    \"],[8,[39,8],null,[[\"@topicList\",\"@hideCategory\",\"@showPosters\",\"@bulkSelectEnabled\",\"@selected\",\"@hasIncoming\",\"@incomingCount\",\"@showInserted\",\"@tagsForUser\",\"@changeSort\",\"@unassign\",\"@reassign\",\"@onScroll\",\"@scrollOnLoad\"],[[30,0,[\"model\"]],[30,0,[\"hideCategory\"]],true,[30,0,[\"bulkSelectEnabled\"]],[30,0,[\"selected\"]],[30,0,[\"hasIncoming\"]],[30,0,[\"incomingCount\"]],[30,0,[\"showInserted\"]],[30,0,[\"tagsForUser\"]],[30,0,[\"changeSort\"]],[30,0,[\"unassign\"]],[30,0,[\"reassign\"]],[30,0,[\"saveScrollPosition\"]],true]],null],[1,\"\\n\\n    \"],[8,[39,9],null,[[\"@condition\"],[[30,0,[\"model\",\"loadingMore\"]]]],null],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"]],[]]]],[],false,[\"if\",\"empty-state\",\"i18n\",\"input\",\"readonly\",\"on\",\"action\",\"load-more\",\"basic-topic-list\",\"conditional-loading-spinner\"]]",
            "moduleName": "discourse/plugins/discourse-assign/discourse/templates/user-activity-assigned.hbs",
            "isStrictMode": false
        });
});