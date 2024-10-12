"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _common = require("@nestjs/common");
const _core = require("@nestjs/core");
const _swagger = require("@nestjs/swagger");
const _app = require("./app");
const _env = require("./config/env");
async function bootstrap() {
    const logger = new _common.Logger('EntryPoint');
    const app = await _core.NestFactory.create(_app.AppModule, {
        cors: true
    });
    const envService = app.get(_env.EnvService);
    app.enableCors({
        credentials: true,
        origin: [
            envService.get('CLIENT_ORIGIN')
        ]
    });
    const config = new _swagger.DocumentBuilder().setTitle('Tracker').setDescription('Api Docs').setVersion('1.0').build();
    const document = _swagger.SwaggerModule.createDocument(app, config);
    _swagger.SwaggerModule.setup('docs', app, document);
    await app.listen(envService.get('PORT'));
    logger.log(`Server running on ${envService.get('PORT')} `);
}
bootstrap();

//# sourceMappingURL=main.js.map