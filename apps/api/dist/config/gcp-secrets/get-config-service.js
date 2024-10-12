"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return getConfigService;
    }
});
const _config = require("@nestjs/config");
const _fetchSecrets = require("./fetchSecrets");
async function getConfigService() {
    const config = new _config.ConfigService();
    // If loading from local we dont get any extra env variables
    if (config.get('SECRET_SOURCE') === 'LOCAL') {
        return {};
    }
    const secrets = await (0, _fetchSecrets.fetchGCPSecrets)();
    // TODO: validate secrets
    return {
        ...secrets
    };
}

//# sourceMappingURL=get-config-service.js.map