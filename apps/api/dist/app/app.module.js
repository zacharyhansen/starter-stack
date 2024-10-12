"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppModule", {
    enumerable: true,
    get: function() {
        return AppModule;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _nestjstrpc = require("nestjs-trpc");
const _approuter = require("./app.router");
const _env = require("../config/env");
const _viewrouter = require("../view/view.router");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AppModule = class AppModule {
};
AppModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _nestjstrpc.TRPCModule.forRoot({
                autoSchemaFile: './@generated'
            }),
            _config.ConfigModule.forRoot({
                validate: (env)=>_env.envSchema.parse(env),
                isGlobal: true
            }),
            _env.EnvModule
        ],
        providers: [
            _approuter.AppRouter,
            _viewrouter.ViewRouter
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map