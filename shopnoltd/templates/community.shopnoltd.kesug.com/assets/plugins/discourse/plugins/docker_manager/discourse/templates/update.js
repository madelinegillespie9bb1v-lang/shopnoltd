define("discourse/plugins/docker_manager/discourse/templates/update", ["exports", "@ember/template-factory"], function(_exports, _templateFactory) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    var _default = _exports.default = (0, _templateFactory.createTemplateFactory)(
        /*
          <div class="admin-controls">
          <nav>
            <ul class="nav nav-pills">
              <li>
                <LinkTo @route="update.index">
                  {{i18n "admin.docker.navigation.versions"}}
                </LinkTo>
              </li>
  
              <li>
                <LinkTo @route="update.processes">
                  {{i18n "admin.docker.navigation.processes"}}
                </LinkTo>
              </li>
            </ul>
          </nav>
        </div>
  
        <div class="docker-manager">
          {{#if this.showBanner}}
            <div id="banner">
              <div id="banner-content">
                <div class="floated-buttons">
                  <DButton
                    @icon="times"
                    @action={{this.dismiss}}
                    @title="banner.close"
                    class="btn btn-flat close"
                  />
                </div>
  
                {{#each this.banner as |row|}}
                  <p>{{html-safe row}}</p>
                {{/each}}
              </div>
            </div>
          {{/if}}
  
          {{outlet}}
        </div>
        */
        {
            "id": "7/fPGwJe",
            "block": "[[[10,0],[14,0,\"admin-controls\"],[12],[1,\"\\n  \"],[10,\"nav\"],[12],[1,\"\\n    \"],[10,\"ul\"],[14,0,\"nav nav-pills\"],[12],[1,\"\\n      \"],[10,\"li\"],[12],[1,\"\\n        \"],[8,[39,0],null,[[\"@route\"],[\"update.index\"]],[[\"default\"],[[[[1,\"\\n          \"],[1,[28,[35,1],[\"admin.docker.navigation.versions\"],null]],[1,\"\\n        \"]],[]]]]],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,\"li\"],[12],[1,\"\\n        \"],[8,[39,0],null,[[\"@route\"],[\"update.processes\"]],[[\"default\"],[[[[1,\"\\n          \"],[1,[28,[35,1],[\"admin.docker.navigation.processes\"],null]],[1,\"\\n        \"]],[]]]]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"docker-manager\"],[12],[1,\"\\n\"],[41,[30,0,[\"showBanner\"]],[[[1,\"    \"],[10,0],[14,1,\"banner\"],[12],[1,\"\\n      \"],[10,0],[14,1,\"banner-content\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"floated-buttons\"],[12],[1,\"\\n          \"],[8,[39,3],[[24,0,\"btn btn-flat close\"]],[[\"@icon\",\"@action\",\"@title\"],[\"times\",[30,0,[\"dismiss\"]],\"banner.close\"]],null],[1,\"\\n        \"],[13],[1,\"\\n\\n\"],[42,[28,[37,5],[[28,[37,5],[[30,0,[\"banner\"]]],null]],null],null,[[[1,\"          \"],[10,2],[12],[1,[28,[35,6],[[30,1]],null]],[13],[1,\"\\n\"]],[1]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[46,[28,[37,8],null,null],null,null,null],[1,\"\\n\"],[13]],[\"row\"],false,[\"link-to\",\"i18n\",\"if\",\"d-button\",\"each\",\"-track-array\",\"html-safe\",\"component\",\"-outlet\"]]",
            "moduleName": "discourse/plugins/docker_manager/discourse/templates/update.hbs",
            "isStrictMode": false
        });
});