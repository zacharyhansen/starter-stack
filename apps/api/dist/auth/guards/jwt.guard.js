"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "JwtGuard", {
    enumerable: true,
    get: function() {
        return JwtGuard;
    }
});
const _clerksdknode = require("@clerk/clerk-sdk-node");
const _common = require("@nestjs/common");
const _core = require("@nestjs/core");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let JwtGuard = class JwtGuard {
    constructor(reflector){
        this.reflector = reflector;
        this.logger = new _common.Logger();
    }
    getRequest(context) {
        return context;
    }
    /** Override canActivate function.
   * If decorated by Public then it is accessable otherwise we fall back to checking the request context
   */ async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride('public', [
            context.getHandler(),
            context.getClass()
        ]);
        if (isPublic) {
            return true;
        }
        try {
            await _clerksdknode.clerkClient.verifyToken('need to fix');
        } catch (error) {
            this.logger.error(error);
            return false;
        }
        return true;
    }
};
JwtGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _core.Reflector === "undefined" ? Object : _core.Reflector
    ])
], JwtGuard);

//# sourceMappingURL=jwt.guard.js.map