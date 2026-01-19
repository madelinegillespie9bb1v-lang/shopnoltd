import {
    template as compiler
} from "discourse-common/lib/raw-handlebars";
import {
    addRawTemplate
} from "discourse-common/lib/raw-templates";

let template = compiler({
    "1": function(container, depth0, helpers, partials, data) {
        var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined
        };

        return "  <th class=\"bulk-select topic-list-data\">\n" +
            ((stack1 = lookupProperty(helpers, "if").call(depth0 != null ? depth0 : (container.nullContext || {}), "canBulkSelect", {
                "name": "if",
                "hash": {},
                "hashTypes": {},
                "hashContexts": {},
                "fn": container.program(2, data, 0),
                "inverse": container.noop,
                "types": ["PathExpression"],
                "contexts": [depth0],
                "data": data,
                "loc": {
                    "start": {
                        "line": 5,
                        "column": 4
                    },
                    "end": {
                        "line": 7,
                        "column": 11
                    }
                }
            })) != null ? stack1 : "") +
            "  </th>\n";
    },
    "2": function(container, depth0, helpers, partials, data) {
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
                        "line": 6,
                        "column": 6
                    },
                    "end": {
                        "line": 6,
                        "column": 92
                    }
                }
            })) +
            "\n";
    },
    "4": function(container, depth0, helpers, partials, data) {
        var lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined
        };

        return "  " +
            container.escapeExpression((lookupProperty(helpers, "raw") || (depth0 && lookupProperty(depth0, "raw")) || container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}), "topic-list-header-column", {
                "name": "raw",
                "hash": {
                    "screenreaderOnly": "true",
                    "name": "posters"
                },
                "hashTypes": {
                    "screenreaderOnly": "StringLiteral",
                    "name": "StringLiteral"
                },
                "hashContexts": {
                    "screenreaderOnly": depth0,
                    "name": depth0
                },
                "types": ["StringLiteral"],
                "contexts": [depth0],
                "data": data,
                "loc": {
                    "start": {
                        "line": 14,
                        "column": 2
                    },
                    "end": {
                        "line": 14,
                        "column": 75
                    }
                }
            })) +
            "\n";
    },
    "6": function(container, depth0, helpers, partials, data) {
        var lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined
        };

        return "  " +
            container.escapeExpression((lookupProperty(helpers, "raw") || (depth0 && lookupProperty(depth0, "raw")) || container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}), "topic-list-header-column", {
                "name": "raw",
                "hash": {
                    "name": "likes",
                    "order": "likes",
                    "number": "true",
                    "sortable": "sortable"
                },
                "hashTypes": {
                    "name": "StringLiteral",
                    "order": "StringLiteral",
                    "number": "StringLiteral",
                    "sortable": "PathExpression"
                },
                "hashContexts": {
                    "name": depth0,
                    "order": depth0,
                    "number": depth0,
                    "sortable": depth0
                },
                "types": ["StringLiteral"],
                "contexts": [depth0],
                "data": data,
                "loc": {
                    "start": {
                        "line": 18,
                        "column": 2
                    },
                    "end": {
                        "line": 18,
                        "column": 95
                    }
                }
            })) +
            "\n";
    },
    "8": function(container, depth0, helpers, partials, data) {
        var lookupProperty = container.lookupProperty || function(parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                return parent[propertyName];
            }
            return undefined
        };

        return "  " +
            container.escapeExpression((lookupProperty(helpers, "raw") || (depth0 && lookupProperty(depth0, "raw")) || container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}), "topic-list-header-column", {
                "name": "raw",
                "hash": {
                    "name": "likes",
                    "order": "op_likes",
                    "number": "true",
                    "sortable": "sortable"
                },
                "hashTypes": {
                    "name": "StringLiteral",
                    "order": "StringLiteral",
                    "number": "StringLiteral",
                    "sortable": "PathExpression"
                },
                "hashContexts": {
                    "name": depth0,
                    "order": depth0,
                    "number": depth0,
                    "sortable": depth0
                },
                "types": ["StringLiteral"],
                "contexts": [depth0],
                "data": data,
                "loc": {
                    "start": {
                        "line": 21,
                        "column": 2
                    },
                    "end": {
                        "line": 21,
                        "column": 98
                    }
                }
            })) +
            "\n";
    },
    "compiler": [8, ">= 4.3.0"],
    "main": function(container, depth0, helpers, partials, data) {
        var stack1, alias1 = depth0 != null ? depth0 : (container.nullContext || {}),
            alias2 = container.hooks.helperMissing,
            alias3 = container.escapeExpression,
            lookupProperty = container.lookupProperty || function(parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

        return alias3((lookupProperty(helpers, "raw-plugin-outlet") || (depth0 && lookupProperty(depth0, "raw-plugin-outlet")) || alias2).call(alias1, {
                "name": "raw-plugin-outlet",
                "hash": {
                    "name": "topic-list-header-before"
                },
                "hashTypes": {
                    "name": "StringLiteral"
                },
                "hashContexts": {
                    "name": depth0
                },
                "types": [],
                "contexts": [],
                "data": data,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 55
                    }
                }
            })) +
            alias3((lookupProperty(helpers, "plugin-outlet") || (depth0 && lookupProperty(depth0, "plugin-outlet")) || alias2).call(alias1, {
                "name": "plugin-outlet",
                "hash": {
                    "name": "topic-list-header-before"
                },
                "hashTypes": {
                    "name": "StringLiteral"
                },
                "hashContexts": {
                    "name": depth0
                },
                "types": [],
                "contexts": [],
                "data": data,
                "loc": {
                    "start": {
                        "line": 2,
                        "column": 0
                    },
                    "end": {
                        "line": 2,
                        "column": 51
                    }
                }
            })) +
            ((stack1 = lookupProperty(helpers, "if").call(alias1, "bulkSelectEnabled", {
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
                        "line": 3,
                        "column": 0
                    },
                    "end": {
                        "line": 9,
                        "column": 7
                    }
                }
            })) != null ? stack1 : "") +
            alias3((lookupProperty(helpers, "raw") || (depth0 && lookupProperty(depth0, "raw")) || alias2).call(alias1, "topic-list-header-column", {
                "name": "raw",
                "hash": {
                    "bulkSelectHelper": "bulkSelectHelper",
                    "newTopicsCount": "newTopicsCount",
                    "newRepliesCount": "newRepliesCount",
                    "newListSubset": "newListSubset",
                    "showTopicsAndRepliesToggle": "showTopicsAndRepliesToggle",
                    "canDoBulkActions": "canDoBulkActions",
                    "canBulkSelect": "canBulkSelect",
                    "showBulkToggle": "toggleInTitle",
                    "bulkSelectEnabled": "bulkSelectEnabled",
                    "name": "listTitle",
                    "order": "default"
                },
                "hashTypes": {
                    "bulkSelectHelper": "PathExpression",
                    "newTopicsCount": "PathExpression",
                    "newRepliesCount": "PathExpression",
                    "newListSubset": "PathExpression",
                    "showTopicsAndRepliesToggle": "PathExpression",
                    "canDoBulkActions": "PathExpression",
                    "canBulkSelect": "PathExpression",
                    "showBulkToggle": "PathExpression",
                    "bulkSelectEnabled": "PathExpression",
                    "name": "PathExpression",
                    "order": "StringLiteral"
                },
                "hashContexts": {
                    "bulkSelectHelper": depth0,
                    "newTopicsCount": depth0,
                    "newRepliesCount": depth0,
                    "newListSubset": depth0,
                    "showTopicsAndRepliesToggle": depth0,
                    "canDoBulkActions": depth0,
                    "canBulkSelect": depth0,
                    "showBulkToggle": depth0,
                    "bulkSelectEnabled": depth0,
                    "name": depth0,
                    "order": depth0
                },
                "types": ["StringLiteral"],
                "contexts": [depth0],
                "data": data,
                "loc": {
                    "start": {
                        "line": 10,
                        "column": 0
                    },
                    "end": {
                        "line": 10,
                        "column": 371
                    }
                }
            })) +
            "\n" +
            alias3((lookupProperty(helpers, "raw-plugin-outlet") || (depth0 && lookupProperty(depth0, "raw-plugin-outlet")) || alias2).call(alias1, {
                "name": "raw-plugin-outlet",
                "hash": {
                    "name": "topic-list-header-after-main-link"
                },
                "hashTypes": {
                    "name": "StringLiteral"
                },
                "hashContexts": {
                    "name": depth0
                },
                "types": [],
                "contexts": [],
                "data": data,
                "loc": {
                    "start": {
                        "line": 11,
                        "column": 0
                    },
                    "end": {
                        "line": 11,
                        "column": 62
                    }
                }
            })) +
            "\n" +
            alias3((lookupProperty(helpers, "plugin-outlet") || (depth0 && lookupProperty(depth0, "plugin-outlet")) || alias2).call(alias1, {
                "name": "plugin-outlet",
                "hash": {
                    "name": "topic-list-header-after-main-link"
                },
                "hashTypes": {
                    "name": "StringLiteral"
                },
                "hashContexts": {
                    "name": depth0
                },
                "types": [],
                "contexts": [],
                "data": data,
                "loc": {
                    "start": {
                        "line": 12,
                        "column": 0
                    },
                    "end": {
                        "line": 12,
                        "column": 58
                    }
                }
            })) +
            "\n" +
            ((stack1 = lookupProperty(helpers, "if").call(alias1, "showPosters", {
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
                        "line": 13,
                        "column": 0
                    },
                    "end": {
                        "line": 15,
                        "column": 7
                    }
                }
            })) != null ? stack1 : "") +
            alias3((lookupProperty(helpers, "raw") || (depth0 && lookupProperty(depth0, "raw")) || alias2).call(alias1, "topic-list-header-column", {
                "name": "raw",
                "hash": {
                    "name": "replies",
                    "order": "posts",
                    "number": "true",
                    "sortable": "sortable"
                },
                "hashTypes": {
                    "name": "StringLiteral",
                    "order": "StringLiteral",
                    "number": "StringLiteral",
                    "sortable": "PathExpression"
                },
                "hashContexts": {
                    "name": depth0,
                    "order": depth0,
                    "number": depth0,
                    "sortable": depth0
                },
                "types": ["StringLiteral"],
                "contexts": [depth0],
                "data": data,
                "loc": {
                    "start": {
                        "line": 16,
                        "column": 0
                    },
                    "end": {
                        "line": 16,
                        "column": 95
                    }
                }
            })) +
            "\n" +
            ((stack1 = lookupProperty(helpers, "if").call(alias1, "showLikes", {
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
                        "line": 17,
                        "column": 0
                    },
                    "end": {
                        "line": 19,
                        "column": 7
                    }
                }
            })) != null ? stack1 : "") +
            ((stack1 = lookupProperty(helpers, "if").call(alias1, "showOpLikes", {
                "name": "if",
                "hash": {},
                "hashTypes": {},
                "hashContexts": {},
                "fn": container.program(8, data, 0),
                "inverse": container.noop,
                "types": ["PathExpression"],
                "contexts": [depth0],
                "data": data,
                "loc": {
                    "start": {
                        "line": 20,
                        "column": 0
                    },
                    "end": {
                        "line": 22,
                        "column": 7
                    }
                }
            })) != null ? stack1 : "") +
            alias3((lookupProperty(helpers, "raw") || (depth0 && lookupProperty(depth0, "raw")) || alias2).call(alias1, "topic-list-header-column", {
                "name": "raw",
                "hash": {
                    "name": "views",
                    "order": "views",
                    "number": "true",
                    "sortable": "sortable"
                },
                "hashTypes": {
                    "name": "StringLiteral",
                    "order": "StringLiteral",
                    "number": "StringLiteral",
                    "sortable": "PathExpression"
                },
                "hashContexts": {
                    "name": depth0,
                    "order": depth0,
                    "number": depth0,
                    "sortable": depth0
                },
                "types": ["StringLiteral"],
                "contexts": [depth0],
                "data": data,
                "loc": {
                    "start": {
                        "line": 23,
                        "column": 0
                    },
                    "end": {
                        "line": 23,
                        "column": 93
                    }
                }
            })) +
            "\n" +
            alias3((lookupProperty(helpers, "raw") || (depth0 && lookupProperty(depth0, "raw")) || alias2).call(alias1, "topic-list-header-column", {
                "name": "raw",
                "hash": {
                    "name": "activity",
                    "order": "activity",
                    "number": "true",
                    "sortable": "sortable"
                },
                "hashTypes": {
                    "name": "StringLiteral",
                    "order": "StringLiteral",
                    "number": "StringLiteral",
                    "sortable": "PathExpression"
                },
                "hashContexts": {
                    "name": depth0,
                    "order": depth0,
                    "number": depth0,
                    "sortable": depth0
                },
                "types": ["StringLiteral"],
                "contexts": [depth0],
                "data": data,
                "loc": {
                    "start": {
                        "line": 24,
                        "column": 0
                    },
                    "end": {
                        "line": 24,
                        "column": 99
                    }
                }
            })) +
            alias3((lookupProperty(helpers, "raw-plugin-outlet") || (depth0 && lookupProperty(depth0, "raw-plugin-outlet")) || alias2).call(alias1, {
                "name": "raw-plugin-outlet",
                "hash": {
                    "name": "topic-list-header-after"
                },
                "hashTypes": {
                    "name": "StringLiteral"
                },
                "hashContexts": {
                    "name": depth0
                },
                "types": [],
                "contexts": [],
                "data": data,
                "loc": {
                    "start": {
                        "line": 25,
                        "column": 0
                    },
                    "end": {
                        "line": 25,
                        "column": 54
                    }
                }
            })) +
            alias3((lookupProperty(helpers, "plugin-outlet") || (depth0 && lookupProperty(depth0, "plugin-outlet")) || alias2).call(alias1, {
                "name": "plugin-outlet",
                "hash": {
                    "name": "topic-list-header-after"
                },
                "hashTypes": {
                    "name": "StringLiteral"
                },
                "hashContexts": {
                    "name": depth0
                },
                "types": [],
                "contexts": [],
                "data": data,
                "loc": {
                    "start": {
                        "line": 26,
                        "column": 0
                    },
                    "end": {
                        "line": 26,
                        "column": 50
                    }
                }
            }));
    },
    "useData": true
});

addRawTemplate("topic-list-header", template, {
    core: true
});
export default template;