"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewRouter", {
    enumerable: true,
    get: function() {
        return ViewRouter;
    }
});
const _nestjstrpc = require("nestjs-trpc");
const _zod = require("zod");
const _common = require("@nestjs/common");
const _viewservice = require("./view.service");
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
let ViewRouter = class ViewRouter {
    constructor(viewService){
        this.viewService = viewService;
    }
    columnByRoleView(name) {
        return this.viewService.columnsByRoleView({
            name
        });
    }
    async mutateViewsForRoles(name, columnEnabledRecords) {
        await this.viewService.mutateViewsForRoles({
            name,
            columnEnabledRecords
        });
        return 'ok';
    }
};
_ts_decorate([
    (0, _nestjstrpc.Query)({
        input: _zod.z.object({
            name: _zod.z.string()
        }),
        output: _zod.z.any()
    }),
    _ts_param(0, (0, _nestjstrpc.Input)('name')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], ViewRouter.prototype, "columnByRoleView", null);
_ts_decorate([
    (0, _nestjstrpc.Mutation)({
        input: _zod.z.object({
            name: _zod.z.string(),
            columnEnabledRecords: _zod.z.object({
                column_name: _zod.z.string()
            }).catchall(_zod.z.any()).array()
        }),
        output: _zod.z.literal('ok')
    }),
    _ts_param(0, (0, _nestjstrpc.Input)('name')),
    _ts_param(1, (0, _nestjstrpc.Input)('columnEnabledRecords')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Array
    ]),
    _ts_metadata("design:returntype", Promise)
], ViewRouter.prototype, "mutateViewsForRoles", null);
ViewRouter = _ts_decorate([
    (0, _nestjstrpc.Router)({
        alias: 'view'
    }),
    _ts_param(0, (0, _common.Inject)(_viewservice.ViewService)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewservice.ViewService === "undefined" ? Object : _viewservice.ViewService
    ])
], ViewRouter);

//# sourceMappingURL=view.router.js.map