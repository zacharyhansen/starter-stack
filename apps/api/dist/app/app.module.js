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
const _viewmodule = require("../view/view.module");
const _databasemodule = require("../database/database.module");
const _getconfigservice = /*#__PURE__*/ _interop_require_default(require("../config/gcp-secrets/get-config-service"));
const _querymodule = require("../query/query.module");
const _queryrouter = require("../query/query.router");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
                load: [
                    _getconfigservice.default
                ],
                validate: (env)=>_env.envSchema.parse(env),
                isGlobal: true
            }),
            _databasemodule.DatabaseModule,
            _env.EnvModule,
            _querymodule.QueryModule,
            _viewmodule.ViewModule
        ],
        providers: [
            _approuter.AppRouter,
            _viewrouter.ViewRouter,
            _queryrouter.QueryRouter
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map