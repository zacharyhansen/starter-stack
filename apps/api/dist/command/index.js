"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _common = require("@nestjs/common");
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from '../app.module';
function bootstrap() {
    // const application = await NestFactory.createApplicationContext(AppModule);
    const command = process.argv[2];
    const logger = new _common.Logger('COMMAND');
    logger.log(`Running ${command} ⌛️`);
    switch(command){
        default:
            {
                logger.error(`${command} not found`);
                // eslint-disable-next-line unicorn/no-process-exit
                process.exit(1);
            }
    }
// logger.log(`${command} complete ✅`);
// await application.close();
// process.exit(0);
}
bootstrap();

//# sourceMappingURL=index.js.map