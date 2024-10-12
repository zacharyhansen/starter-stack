"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fetchGCPSecrets", {
    enumerable: true,
    get: function() {
        return fetchGCPSecrets;
    }
});
const _secretmanager = require("@google-cloud/secret-manager");
const _config = require("@nestjs/config");
const fetchGCPSecrets = async ()=>{
    const client = new _secretmanager.SecretManagerServiceClient();
    const config = new _config.ConfigService();
    function getSecret(name) {
        return client.accessSecretVersion({
            name: `projects/${config.get('GOOGLE_PROJECT')}/secrets/${name}/versions/latest`
        }).then((res)=>{
            const [response] = res;
            return {
                [name]: response.payload?.data?.toString()
            };
        });
    }
    try {
        const secrets = await Promise.all([
            getSecret('DATABASE_NAME'),
            getSecret('DATABASE_HOST'),
            getSecret('DATABASE_PASSWORD'),
            getSecret('DATABASE_PORT'),
            getSecret('DATABASE_USER'),
            getSecret('GOOGLE_PROJECT')
        ]);
        return secrets.reduce((current, accumulator)=>({
                ...accumulator,
                ...current
            }), {});
    } catch (error) {
        throw error;
    }
};

//# sourceMappingURL=fetchSecrets.js.map