define("discourse/plugins/discourse-assign/discourse/templates/group/assigned", ["exports", "@ember/template-factory"], function(_exports, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          <section class="user-secondary-navigation group-assignments">
          <MobileNav
            @desktopClass="action-list activity-list nav-stacked"
            class="activity-nav"
          >
            {{#if this.isDesktop}}
              <div class="search-div">
                <Input
                  {{on "input" (action this.onChangeFilterName value="target.value")}}
                  @type="text"
                  @value={{readonly this.filterName}}
                  placeholder={{i18n
                    "discourse_assign.sidebar_name_filter_placeholder"
                  }}
                  class="search"
                />
              </div>
            {{/if}}
  
            <LoadMore @selector=".activity-nav li" @action={{action "loadMore"}}>
              <GroupAssignedFilter
                @showAvatar={{false}}
                @filter="everyone"
                @routeType={{this.route_type}}
                @assignmentCount={{this.group.assignment_count}}
                @search={{this.search}}
                @ascending={{this.ascending}}
                @order={{this.order}}
              />
  
              <GroupAssignedFilter
                @showAvatar={{false}}
                @groupName={{this.group.name}}
                @filter={{this.group.name}}
                @routeType={{this.route_type}}
                @assignmentCount={{this.group.group_assignment_count}}
                @search={{this.search}}
                @ascending={{this.ascending}}
                @order={{this.order}}
              />
  
              {{#each this.members as |member|}}
                <GroupAssignedFilter
                  @showAvatar={{true}}
                  @filter={{member}}
                  @routeType={{this.route_type}}
                  @search={{this.search}}
                  @ascending={{this.ascending}}
                  @order={{this.order}}
                />
              {{/each}}
  
              <ConditionalLoadingSpinner @condition={{this.loading}} />
            </LoadMore>
          </MobileNav>
        </section>
  
        <section class="user-content">
          {{outlet}}
        </section>
        */
        {
            "id": "/YkeCVLZ",
            "block": "[[[10,\"section\"],[14,0,\"user-secondary-navigation group-assignments\"],[12],[1,\"\\n  \"],[8,[39,0],[[24,0,\"activity-nav\"]],[[\"@desktopClass\"],[\"action-list activity-list nav-stacked\"]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"isDesktop\"]],[[[1,\"      \"],[10,0],[14,0,\"search-div\"],[12],[1,\"\\n        \"],[8,[39,2],[[16,\"placeholder\",[28,[37,3],[\"discourse_assign.sidebar_name_filter_placeholder\"],null]],[24,0,\"search\"],[4,[38,5],[\"input\",[28,[37,6],[[30,0],[30,0,[\"onChangeFilterName\"]]],[[\"value\"],[\"target.value\"]]]],null]],[[\"@type\",\"@value\"],[\"text\",[28,[37,4],[[30,0,[\"filterName\"]]],null]]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[8,[39,7],null,[[\"@selector\",\"@action\"],[\".activity-nav li\",[28,[37,6],[[30,0],\"loadMore\"],null]]],[[\"default\"],[[[[1,\"\\n      \"],[8,[39,8],null,[[\"@showAvatar\",\"@filter\",\"@routeType\",\"@assignmentCount\",\"@search\",\"@ascending\",\"@order\"],[false,\"everyone\",[30,0,[\"route_type\"]],[30,0,[\"group\",\"assignment_count\"]],[30,0,[\"search\"]],[30,0,[\"ascending\"]],[30,0,[\"order\"]]]],null],[1,\"\\n\\n      \"],[8,[39,8],null,[[\"@showAvatar\",\"@groupName\",\"@filter\",\"@routeType\",\"@assignmentCount\",\"@search\",\"@ascending\",\"@order\"],[false,[30,0,[\"group\",\"name\"]],[30,0,[\"group\",\"name\"]],[30,0,[\"route_type\"]],[30,0,[\"group\",\"group_assignment_count\"]],[30,0,[\"search\"]],[30,0,[\"ascending\"]],[30,0,[\"order\"]]]],null],[1,\"\\n\\n\"],[42,[28,[37,10],[[28,[37,10],[[30,0,[\"members\"]]],null]],null],null,[[[1,\"        \"],[8,[39,8],null,[[\"@showAvatar\",\"@filter\",\"@routeType\",\"@search\",\"@ascending\",\"@order\"],[true,[30,1],[30,0,[\"route_type\"]],[30,0,[\"search\"]],[30,0,[\"ascending\"]],[30,0,[\"order\"]]]],null],[1,\"\\n\"]],[1]],null],[1,\"\\n      \"],[8,[39,11],null,[[\"@condition\"],[[30,0,[\"loading\"]]]],null],[1,\"\\n    \"]],[]]]]],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"section\"],[14,0,\"user-content\"],[12],[1,\"\\n  \"],[46,[28,[37,13],null,null],null,null,null],[1,\"\\n\"],[13]],[\"member\"],false,[\"mobile-nav\",\"if\",\"input\",\"i18n\",\"readonly\",\"on\",\"action\",\"load-more\",\"group-assigned-filter\",\"each\",\"-track-array\",\"conditional-loading-spinner\",\"component\",\"-outlet\"]]",
            "moduleName": "discourse/plugins/discourse-assign/discourse/templates/group/assigned.hbs",
            "isStrictMode": false
        });
});