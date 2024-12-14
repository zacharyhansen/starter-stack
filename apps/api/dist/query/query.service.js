"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "QueryService", {
    enumerable: true,
    get: function() {
        return QueryService;
    }
});
const _common = require("@nestjs/common");
const _database = require("../database/database");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let QueryService = class QueryService {
    constructor(database, poolReadOnly){
        this.database = database;
        this.poolReadOnly = poolReadOnly;
    }
    async execute({ query }) {
        return await this.poolReadOnly.query({
            rowMode: 'array',
            text: query.sql
        }, query.parameters);
    }
};
QueryService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_database.Database)),
    _ts_param(1, (0, _common.Inject)('PoolReadOnly')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _database.Database === "undefined" ? Object : _database.Database,
        typeof Pool === "undefined" ? Object : Pool
    ])
], QueryService);

//# sourceMappingURL=query.service.js.map