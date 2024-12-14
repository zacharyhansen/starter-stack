"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DatabaseModule", {
    enumerable: true,
    get: function() {
        return DatabaseModule;
    }
});
const _common = require("@nestjs/common");
const _kysely = require("kysely");
const _config = require("@nestjs/config");
const _pg = require("pg");
const _database = require("./database");
const _fetchSecrets = require("../config/gcp-secrets/fetchSecrets");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = _ts_decorate([
    (0, _common.Global)(),
    (0, _common.Module)({
        exports: [
            _database.Database,
            'PoolReadOnly'
        ],
        providers: [
            {
                inject: [
                    _config.ConfigService
                ],
                provide: _database.Database,
                useFactory: async (configService)=>{
                    console.log({
                        SECRET_SOURCE: configService.get('SECRET_SOURCE')
                    });
                    if (configService.get('SECRET_SOURCE') === 'LOCAL' || !configService.get('SECRET_SOURCE')) {
                        return new _database.Database({
                            dialect: new _kysely.PostgresDialect({
                                pool: new _pg.Pool({
                                    database: process.env.DATABASE_NAME,
                                    host: process.env.DATABASE_HOST,
                                    password: process.env.DATABASE_PASSWORD,
                                    port: Number.parseInt(process.env.DATABASE_PORT.toString()),
                                    user: process.env.DATABASE_USER
                                })
                            })
                        });
                    }
                    const secrets = await (0, _fetchSecrets.fetchGCPSecrets)();
                    return new _database.Database({
                        dialect: new _kysely.PostgresDialect({
                            pool: new _pg.Pool({
                                database: secrets.DATABASE_NAME,
                                host: secrets.DATABASE_HOST,
                                password: secrets.DATABASE_PASSWORD,
                                port: Number.parseInt(secrets.DATABASE_PORT.toString()),
                                user: secrets.DATABASE_USER
                            })
                        })
                    });
                }
            },
            {
                inject: [
                    _config.ConfigService
                ],
                provide: 'PoolReadOnly',
                useFactory: async (configService)=>{
                    console.log({
                        SECRET_SOURCE: configService.get('SECRET_SOURCE')
                    });
                    if (configService.get('SECRET_SOURCE') === 'LOCAL' || !configService.get('SECRET_SOURCE')) {
                        return new _pg.Pool({
                            database: process.env.DATABASE_NAME,
                            host: process.env.DATABASE_HOST,
                            password: process.env.DATABASE_PASSWORD,
                            port: Number.parseInt(process.env.DATABASE_PORT.toString()),
                            user: process.env.DATABASE_USER
                        });
                    }
                    const secrets = await (0, _fetchSecrets.fetchGCPSecrets)();
                    return new _pg.Pool({
                        database: secrets.DATABASE_NAME,
                        host: secrets.DATABASE_HOST,
                        password: secrets.DATABASE_PASSWORD,
                        port: Number.parseInt(secrets.DATABASE_PORT.toString()),
                        user: secrets.DATABASE_USER
                    });
                }
            }
        ]
    })
], DatabaseModule);

//# sourceMappingURL=database.module.js.map