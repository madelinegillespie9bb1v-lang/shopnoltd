define("discourse/plugins/discourse-assign/discourse/raw-templates/connectors/topic-list-after-columns/assign-buttons", ["exports", "discourse-common/lib/raw-handlebars", "discourse-common/lib/raw-templates"], function(_exports, _rawHandlebars, _rawTemplates) {
    "use strict";

    Object.defineProperty(_exports, "__esModule", {
        value: true
    });
    _exports.default = void 0;
    let template = (0, _rawHandlebars.template)({
        "compiler": [8, ">= 4.3.0"],
        "main": function(container, depth0, helpers, partials, data) {
            var lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined;
            };
            return container.escapeExpression((lookupProperty(helpers, "raw") || depth0 && lookupProperty(depth0, "raw") || container.hooks.helperMissing).call(depth0 != null ? depth0 : container.nullContext || {}, "assign-topic-buttons", {
                "name": "raw",
                "hash": {
                    "topic": "context.topic"
                },
                "hashTypes": {
                    "topic": "PathExpression"
                },
                "hashContexts": {
                    "topic": depth0
                },
                "types": ["StringLiteral"],
                "contexts": [depth0],
                "data": data,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 50
                    }
                }
            }));
        },
        "useData": true
    });
    (0, _rawTemplates.addRawTemplate)("javascripts/connectors/topic-list-after-columns/assign-buttons", template, {
        core: true
    });
    var _default = _exports.default = template;
});