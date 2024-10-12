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
    PORT: _zod.z.coerce.number().optional().default(5001),
    CLIENT_ORIGIN: _zod.z.string()
});

//# sourceMappingURL=env.schema.js.map