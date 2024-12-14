import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { type Request, type Response } from 'express';

import { Database } from '../database/database';

import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly database: Database) {}

  @Get('test-public')
  @Public()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  testPublic(@Query() query: any): Promise<any[]> {
    return this.database
      .withSchema(query.schema)
      .selectFrom('role')
      .selectAll()
      .execute();
  }

  @Get('test-private')
  testPrivate(@Req() request: Request, @Res() response: Response) {
    return response.send('OK');
  }
}
