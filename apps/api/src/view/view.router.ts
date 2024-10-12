import { TRPCError } from '@trpc/server';
import { Input, Query, Router } from 'nestjs-trpc';
import { z } from 'zod';

import { Public } from '~/auth/decorators/public.decorator';

const userSchema = z.string();

type User = z.infer<typeof userSchema>;

@Router({ alias: 'view' })
export class ViewRouter {
  @Query({
    input: z.object({ userId: z.string() }),
    output: userSchema,
  })
  userById(@Input('userId') userId: string | null): Promise<User> {
    if (userId == null) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Could not find user.',
      });
    }

    return Promise.resolve(userId);
  }

  @Query({
    output: z.object({}),
  })
  relationTree(): Promise<object> {
    return Promise.resolve({});
  }
}
