"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "QueryRouter", {
    enumerable: true,
    get: function() {
        return QueryRouter;
    }
});
const _nestjstrpc = require("nestjs-trpc");
const _zod = require("zod");
const _common = require("@nestjs/common");
const _kysely = require("kysely");
const _queryservice = require("./query.service");
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
let QueryRouter = class QueryRouter {
    constructor(queryService, database){
        this.queryService = queryService;
        this.database = database;
    }
    async execute(query) {
        return this.queryService.execute({
            query: _kysely.sql.raw(query).compile(this.database)
        });
    }
};
_ts_decorate([
    (0, _nestjstrpc.Query)({
        input: _zod.z.object({
            query: _zod.z.string()
        }),
        output: _zod.z.any()
    }),
    _ts_param(0, (0, _nestjstrpc.Input)('query')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], QueryRouter.prototype, "execute", null);
QueryRouter = _ts_decorate([
    (0, _nestjstrpc.Router)({
        alias: 'query'
    }),
    _ts_param(0, (0, _common.Inject)(_queryservice.QueryService)),
    _ts_param(1, (0, _common.Inject)(_database.Database)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _queryservice.QueryService === "undefined" ? Object : _queryservice.QueryService,
        typeof _database.Database === "undefined" ? Object : _database.Database
    ])
], QueryRouter);

//# sourceMappingURL=query.router.js.map