define("discourse/plugins/discourse-assign/discourse/raw-templates/assign-topic-buttons", ["exports", "discourse-common/lib/raw-handlebars", "discourse-common/lib/raw-templates"], function(_exports, _rawHandlebars, _rawTemplates) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    let template = (0, _rawHandlebars.template)({
        "compiler": [8, ">= 4.3.0"],
        "main": function(container, depth0, helpers, partials, data) {
            var stack1,
                lookupProperty = container.lookupProperty || function(parent, propertyName) {
                    if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                        return parent[propertyName];
                    }
                    return undefined;
                };
            return (stack1 = lookupProperty(helpers, "get").call(depth0 != null ? depth0 : container.nullContext || {}, "view.html", {
                "name": "get",
                "hash": {},
                "hashTypes": {},
                "hashContexts": {},
                "types": ["PathExpression"],
                "contexts": [depth0],
                "data": data,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 15
                    }
                }
            })) != null ? stack1 : "";
        },
        "useData": true
    });
    (0, _rawTemplates.addRawTemplate)("javascripts/assign-topic-buttons", template, {
        core: true
    });
    var _default = _exports.default = template;
});