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
const _server = require("@trpc/server");
const _nestjstrpc = require("nestjs-trpc");
const _zod = require("zod");
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
const userSchema = _zod.z.string();
let ViewRouter = class ViewRouter {
    userById(userId) {
        if (userId == null) {
            throw new _server.TRPCError({
                code: 'NOT_FOUND',
                message: 'Could not find user.'
            });
        }
        return Promise.resolve(userId);
    }
    relationTree() {
        return Promise.resolve({});
    }
};
_ts_decorate([
    (0, _nestjstrpc.Query)({
        input: _zod.z.object({
            userId: _zod.z.string()
        }),
        output: userSchema
    }),
    _ts_param(0, (0, _nestjstrpc.Input)('userId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], ViewRouter.prototype, "userById", null);
_ts_decorate([
    (0, _nestjstrpc.Query)({
        output: _zod.z.object({})
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise)
], ViewRouter.prototype, "relationTree", null);
ViewRouter = _ts_decorate([
    (0, _nestjstrpc.Router)({
        alias: 'view'
    })
], ViewRouter);

//# sourceMappingURL=view.router.js.map