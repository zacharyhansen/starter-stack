import { clerkClient } from '@clerk/clerk-sdk-node';
import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';

export const ClerkContext = createParamDecorator(
  (data: unknown, context: ExecutionContext) =>
    clerkClient.verifyToken('need fix')
);
