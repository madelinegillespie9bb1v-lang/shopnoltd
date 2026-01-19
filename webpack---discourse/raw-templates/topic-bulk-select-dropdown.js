import {
    template as compiler
} from "discourse-common/lib/raw-handlebars";
import {
    addRawTemplate
} from "discourse-common/lib/raw-templates";

let template = compiler({
    "compiler": [8, ">= 4.3.0"],
    "main": function(container, depth0, helpers, partials, data) {
        var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined
        };

        return ((stack1 = lookupProperty(helpers, "get").call(depth0 != null ? depth0 : (container.nullContext || {}), "view.html", {
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
        })) != null ? stack1 : "");
    },
    "useData": true
});

addRawTemplate("topic-bulk-select-dropdown", template, {
    core: true
});
export default template;