"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "envSchema", {
    enumerable: true,
    get: function() {
        return envSchema;
    }
});
const _zod = require("zod");
const envSchema = _zod.z.object({
    CLIENT_ORIGIN: _zod.z.string(),
    SECRET_SOURCE: _zod.z.enum([
        'LOCAL',
        'GCP'
    ]),
    DATABASE_URL: _zod.z.string(),
    DATABASE_NAME: _zod.z.string(),
    DATABASE_USER: _zod.z.string(),
    DATABASE_PASSWORD: _zod.z.string(),
    DATABASE_HOST: _zod.z.string(),
    NODE_ENV: _zod.z.enum([
        'development',
        'production'
    ]),
    DATABASE_PORT: _zod.z.string(),
    CLERK_PUBLIC_JWT: _zod.z.string(),
    PORT: _zod.z.string()
});

//# sourceMappingURL=env.schema.js.map