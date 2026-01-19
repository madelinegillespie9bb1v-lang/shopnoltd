import {
    template as compiler
} from "discourse-common/lib/raw-handlebars";
import {
    addRawTemplate
} from "discourse-common/lib/raw-templates";

let template = compiler({
    "1": function(container, depth0, helpers, partials, data) {
        var lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined
        };

        return "aria-sort='" +
            container.escapeExpression(lookupProperty(helpers, "get").call(depth0 != null ? depth0 : (container.nullContext || {}), "view.ariaSort", {
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
                        "column": 119
                    },
                    "end": {
                        "line": 1,
                        "column": 136
                    }
                }
            })) +
            "'";
    },
    "3": function(container, depth0, helpers, partials, data) {
        var stack1, alias1 = depth0 != null ? depth0 : (container.nullContext || {}),
            lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

        return ((stack1 = lookupProperty(helpers, "if").call(alias1, "showBulkToggle", {
                "name": "if",
                "hash": {},
                "hashTypes": {},
                "hashContexts": {},
                "fn": container.program(4, data, 0),
                "inverse": container.noop,
                "types": ["PathExpression"],
                "contexts": [depth0],
                "data": data,
                "loc": {
                    "start": {
                        "line": 3,
                        "column": 4
                    },
                    "end": {
                        "line": 5,
                        "column": 13
                    }
                }
            })) != null ? stack1 : "") +
            ((stack1 = lookupProperty(helpers, "if").call(alias1, "bulkSelectEnabled", {
                "name": "if",
                "hash": {},
                "hashTypes": {},
                "hashContexts": {},
                "fn": container.program(6, data, 0),
                "inverse": container.noop,
                "types": ["PathExpression"],
                "contexts": [depth0],
                "data": data,
                "loc": {
                    "start": {
                        "line": 6,
                        "column": 4
                    },
                    "end": {
                        "line": 14,
                        "column": 13
                    }
                }
            })) != null ? stack1 : "");
    },
    "4": function(container, depth0, helpers, partials, data) {
        var lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined
        };

        return "      " +
            container.escapeExpression((lookupProperty(helpers, "raw") || (depth0 && lookupProperty(depth0, "raw")) || container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}), "flat-button", {
                "name": "raw",
                "hash": {
                    "title": "topics.bulk.toggle",
                    "icon": "list-check",
                    "class": "bulk-select"
                },
                "hashTypes": {
                    "title": "StringLiteral",
                    "icon": "StringLiteral",
                    "class": "StringLiteral"
                },
                "hashContexts": {
                    "title": depth0,
                    "icon": depth0,
                    "class": depth0
                },
                "types": ["StringLiteral"],
                "contexts": [depth0],
                "data": data,
                "loc": {
                    "start": {
                        "line": 4,
                        "column": 6
                    },
                    "end": {
                        "line": 4,
                        "column": 92
                    }
                }
            })) +
            "\n";
    },
    "6": function(container, depth0, helpers, partials, data) {
        var stack1, alias1 = depth0 != null ? depth0 : (container.nullContext || {}),
            alias2 = container.hooks.helperMissing,
            alias3 = container.escapeExpression,
            lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

        return "      <span class='bulk-select-topics'>" +
            ((stack1 = lookupProperty(helpers, "if").call(alias1, "canDoBulkActions", {
                "name": "if",
                "hash": {},
                "hashTypes": {},
                "hashContexts": {},
                "fn": container.program(7, data, 0),
                "inverse": container.noop,
                "types": ["PathExpression"],
                "contexts": [depth0],
                "data": data,
                "loc": {
                    "start": {
                        "line": 8,
                        "column": 8
                    },
                    "end": {
                        "line": 10,
                        "column": 17
                    }
                }
            })) != null ? stack1 : "") +
            "<button class='btn btn-default bulk-select-all'>" +
            alias3((lookupProperty(helpers, "i18n") || (depth0 && lookupProperty(depth0, "i18n")) || alias2).call(alias1, "topics.bulk.select_all", {
                "name": "i18n",
                "hash": {},
                "hashTypes": {},
                "hashContexts": {},
                "types": ["StringLiteral"],
                "contexts": [depth0],
                "data": data,
                "loc": {
                    "start": {
                        "line": 11,
                        "column": 56
                    },
                    "end": {
                        "line": 11,
                        "column": 89
                    }
                }
            })) +
            "</button>\n        <button class='btn btn-default bulk-clear-all'>" +
            alias3((lookupProperty(helpers, "i18n") || (depth0 && lookupProperty(depth0, "i18n")) || alias2).call(alias1, "topics.bulk.clear_all", {
                "name": "i18n",
                "hash": {},
                "hashTypes": {},
                "hashContexts": {},
                "types": ["StringLiteral"],
                "contexts": [depth0],
                "data": data,
                "loc": {
                    "start": {
                        "line": 12,
                        "column": 55
                    },
                    "end": {
                        "line": 12,
                        "column": 87
                    }
                }
            })) +
            "</button>\n      </span>\n";
    },
    "7": function(container, depth0, helpers, partials, data) {
        var lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined
        };

        return "          " +
            container.escapeExpression((lookupProperty(helpers, "raw") || (depth0 && lookupProperty(depth0, "raw")) || container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}), "topic-bulk-select-dropdown", {
                "name": "raw",
                "hash": {
                    "bulkSelectHelper": "bulkSelectHelper"
                },
                "hashTypes": {
                    "bulkSelectHelper": "PathExpression"
                },
                "hashContexts": {
                    "bulkSelectHelper": depth0
                },
                "types": ["StringLiteral"],
                "contexts": [depth0],
                "data": data,
                "loc": {
                    "start": {
                        "line": 9,
                        "column": 10
                    },
                    "end": {
                        "line": 9,
                        "column": 80
                    }
                }
            })) +
            "\n";
    },
    "9": function(container, depth0, helpers, partials, data) {
        var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined
        };

        return ((stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : (container.nullContext || {}), "view.showTopicsAndRepliesToggle", {
            "name": "if",
            "hash": {},
            "hashTypes": {},
            "hashContexts": {},
            "fn": container.program(10, data, 0),
            "inverse": container.program(12, data, 0),
            "types": ["PathExpression"],
            "contexts": [depth0],
            "data": data,
            "loc": {
                "start": {
                    "line": 17,
                    "column": 4
                },
                "end": {
                    "line": 21,
                    "column": 13
                }
            }
        })) != null ? stack1 : "");
    },
    "10": function(container, depth0, helpers, partials, data) {
        var lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined
        };

        return "      " +
            container.escapeExpression((lookupProperty(helpers, "raw") || (depth0 && lookupProperty(depth0, "raw")) || container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}), "list.new-list-header-controls", {
                "name": "raw",
                "hash": {
                    "newTopicsCount": "newTopicsCount",
                    "newRepliesCount": "newRepliesCount",
                    "current": "newListSubset"
                },
                "hashTypes": {
                    "newTopicsCount": "PathExpression",
                    "newRepliesCount": "PathExpression",
                    "current": "PathExpression"
                },
                "hashContexts": {
                    "newTopicsCount": depth0,
                    "newRepliesCount": depth0,
                    "current": depth0
                },
                "types": ["StringLiteral"],
                "contexts": [depth0],
                "data": data,
                "loc": {
                    "start": {
                        "line": 18,
                        "column": 6
                    },
                    "end": {
                        "line": 18,
                        "column": 129
                    }
                }
            })) +
            "\n";
    },
    "12": function(container, depth0, helpers, partials, data) {
        var stack1, alias1 = depth0 != null ? depth0 : (container.nullContext || {}),
            lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

        return "      <span " +
            ((stack1 = lookupProperty(helpers, "if").call(alias1, "view.screenreaderOnly", {
                "name": "if",
                "hash": {},
                "hashTypes": {},
                "hashContexts": {},
                "fn": container.program(13, data, 0),
                "inverse": container.noop,
                "types": ["PathExpression"],
                "contexts": [depth0],
                "data": data,
                "loc": {
                    "start": {
                        "line": 20,
                        "column": 12
                    },
                    "end": {
                        "line": 20,
                        "column": 63
                    }
                }
            })) != null ? stack1 : "") +
            " " +
            ((stack1 = lookupProperty(helpers, "if").call(alias1, "sortable", {
                "name": "if",
                "hash": {},
                "hashTypes": {},
                "hashContexts": {},
                "fn": container.program(15, data, 0),
                "inverse": container.noop,
                "types": ["PathExpression"],
                "contexts": [depth0],
                "data": data,
                "loc": {
                    "start": {
                        "line": 20,
                        "column": 64
                    },
                    "end": {
                        "line": 20,
                        "column": 149
                    }
                }
            })) != null ? stack1 : "") +
            ">" +
            container.escapeExpression(lookupProperty(helpers, "get").call(alias1, "view.localizedName", {
                "name": "get",
                "hash": {},
                "hashTypes": {},
                "hashContexts": {},
                "types": ["PathExpression"],
                "contexts": [depth0],
                "data": data,
                "loc": {
                    "start": {
                        "line": 20,
                        "column": 150
                    },
                    "end": {
                        "line": 20,
                        "column": 172
                    }
                }
            })) +
            "</span>\n";
    },
    "13": function(container, depth0, helpers, partials, data) {
        return "class=\"sr-only\"";
    },
    "15": function(container, depth0, helpers, partials, data) {
        var lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined
        };

        return "tabindex=\"0\" role=\"button\" aria-pressed='" +
            container.escapeExpression(lookupProperty(helpers, "get").call(depth0 != null ? depth0 : (container.nullContext || {}), "view.ariaPressed", {
                "name": "get",
                "hash": {},
                "hashTypes": {},
                "hashContexts": {},
                "types": ["PathExpression"],
                "contexts": [depth0],
                "data": data,
                "loc": {
                    "start": {
                        "line": 20,
                        "column": 121
                    },
                    "end": {
                        "line": 20,
                        "column": 141
                    }
                }
            })) +
            "'";
    },
    "17": function(container, depth0, helpers, partials, data) {
        var lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined
        };

        return "    " +
            container.escapeExpression((lookupProperty(helpers, "d-icon") || (depth0 && lookupProperty(depth0, "d-icon")) || container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}), "view.sortIcon", {
                "name": "d-icon",
                "hash": {},
                "hashTypes": {},
                "hashContexts": {},
                "types": ["PathExpression"],
                "contexts": [depth0],
                "data": data,
                "loc": {
                    "start": {
                        "line": 24,
                        "column": 4
                    },
                    "end": {
                        "line": 24,
                        "column": 28
                    }
                }
            })) +
            "\n";
    },
    "compiler": [8, ">= 4.3.0"],
    "main": function(container, depth0, helpers, partials, data) {
        var stack1, alias1 = depth0 != null ? depth0 : (container.nullContext || {}),
            alias2 = container.escapeExpression,
            lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

        return "<th data-sort-order='" +
            alias2(lookupProperty(helpers, "get").call(alias1, "order", {
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
                        "column": 21
                    },
                    "end": {
                        "line": 1,
                        "column": 30
                    }
                }
            })) +
            "' class='" +
            alias2(lookupProperty(helpers, "get").call(alias1, "view.className", {
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
                        "column": 39
                    },
                    "end": {
                        "line": 1,
                        "column": 57
                    }
                }
            })) +
            " topic-list-data' scope=\"col\" " +
            ((stack1 = lookupProperty(helpers, "if").call(alias1, "view.ariaSort", {
                "name": "if",
                "hash": {},
                "hashTypes": {},
                "hashContexts": {},
                "fn": container.program(1, data, 0),
                "inverse": container.noop,
                "types": ["PathExpression"],
                "contexts": [depth0],
                "data": data,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 87
                    },
                    "end": {
                        "line": 1,
                        "column": 144
                    }
                }
            })) != null ? stack1 : "") +
            ">" +
            ((stack1 = lookupProperty(helpers, "if").call(alias1, "canBulkSelect", {
                "name": "if",
                "hash": {},
                "hashTypes": {},
                "hashContexts": {},
                "fn": container.program(3, data, 0),
                "inverse": container.noop,
                "types": ["PathExpression"],
                "contexts": [depth0],
                "data": data,
                "loc": {
                    "start": {
                        "line": 2,
                        "column": 2
                    },
                    "end": {
                        "line": 15,
                        "column": 11
                    }
                }
            })) != null ? stack1 : "") +
            ((stack1 = lookupProperty(helpers, "unless").call(alias1, "bulkSelectEnabled", {
                "name": "unless",
                "hash": {},
                "hashTypes": {},
                "hashContexts": {},
                "fn": container.program(9, data, 0),
                "inverse": container.noop,
                "types": ["PathExpression"],
                "contexts": [depth0],
                "data": data,
                "loc": {
                    "start": {
                        "line": 16,
                        "column": 2
                    },
                    "end": {
                        "line": 22,
                        "column": 15
                    }
                }
            })) != null ? stack1 : "") +
            ((stack1 = lookupProperty(helpers, "if").call(alias1, "view.isSorting", {
                "name": "if",
                "hash": {},
                "hashTypes": {},
                "hashContexts": {},
                "fn": container.program(17, data, 0),
                "inverse": container.noop,
                "types": ["PathExpression"],
                "contexts": [depth0],
                "data": data,
                "loc": {
                    "start": {
                        "line": 23,
                        "column": 2
                    },
                    "end": {
                        "line": 25,
                        "column": 11
                    }
                }
            })) != null ? stack1 : "") +
            "</th>\n";
    },
    "useData": true
});

addRawTemplate("topic-list-header-column", template, {
    core: true
});
export default template;