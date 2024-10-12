"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ClerkContext", {
    enumerable: true,
    get: function() {
        return ClerkContext;
    }
});
const _clerksdknode = require("@clerk/clerk-sdk-node");
const _common = require("@nestjs/common");
const ClerkContext = (0, _common.createParamDecorator)((data, context)=>_clerksdknode.clerkClient.verifyToken('need fix'));

//# sourceMappingURL=clerk-context.decorator.js.map