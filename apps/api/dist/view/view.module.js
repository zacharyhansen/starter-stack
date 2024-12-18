"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewModule", {
    enumerable: true,
    get: function() {
        return ViewModule;
    }
});
const _common = require("@nestjs/common");
const _viewservice = require("./view.service");
const _databasemodule = require("../database/database.module");
const _querymodule = require("../query/query.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ViewModule = class ViewModule {
};
ViewModule = _ts_decorate([
    (0, _common.Module)({
        exports: [
            _viewservice.ViewService
        ],
        imports: [
            _databasemodule.DatabaseModule,
            _querymodule.QueryModule
        ],
        providers: [
            _viewservice.ViewService
        ]
    })
], ViewModule);

//# sourceMappingURL=view.module.js.map