import { clerkClient } from '@clerk/clerk-sdk-node';
import { type ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtGuard {
  private readonly logger = new Logger();

  constructor(private reflector: Reflector) {}

  getRequest(context: ExecutionContext) {
    return context;
  }

  /** Override canActivate function.
   * If decorated by Public then it is accessable otherwise we fall back to checking the request context
   */
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride('public', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    try {
      await clerkClient.verifyToken('need to fix');
    } catch (error) {
      this.logger.error(error);
      return false;
    }

    return true;
  }
}
