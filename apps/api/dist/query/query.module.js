"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "QueryModule", {
    enumerable: true,
    get: function() {
        return QueryModule;
    }
});
const _common = require("@nestjs/common");
const _queryservice = require("./query.service");
const _databasemodule = require("../database/database.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let QueryModule = class QueryModule {
};
QueryModule = _ts_decorate([
    (0, _common.Module)({
        exports: [
            _queryservice.QueryService
        ],
        imports: [
            _databasemodule.DatabaseModule
        ],
        providers: [
            _queryservice.QueryService
        ]
    })
], QueryModule);

//# sourceMappingURL=query.module.js.map