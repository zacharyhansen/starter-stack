"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const config = {
    development: {
        client: 'postgresql',
        connection: {
            database: 'odigos',
            host: 'localhost',
            password: 'password',
            port: 5432,
            user: 'postgres'
        },
        migrations: {
            directory: 'src/migrations/migs_public',
            extension: 'ts',
            schemaName: 'public',
            tableName: 'knex_migrations'
        },
        pool: {
            max: 10,
            min: 2
        },
        seeds: {
            directory: '../seeds'
        }
    },
    production: {
        client: 'postgresql',
        connection: {
            // database: process.env.DATABASE_NAME,
            // host: process.env.DATABASE_HOST,
            // password: process.env.DATABASE_PASSWORD,
            // port: parseInt(process.env.DATABASE_PORT!.toString()),
            // user: process.env.DATABASE_USER,
            database: 'odigos',
            host: 'localhost',
            password: 'password',
            port: 5432,
            user: 'poszgres'
        },
        migrations: {
            directory: 'src/migrations/migs_public',
            extension: 'ts',
            schemaName: 'public',
            tableName: 'knex_migrations'
        },
        pool: {
            max: 10,
            min: 2
        },
        seeds: {
            directory: '../seeds'
        }
    }
};
const _default = config;

//# sourceMappingURL=public.js.map