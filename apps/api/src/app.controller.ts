import { Controller, Get } from '@nestjs/common';
import { AllowAnonymous, Session, type UserSession } from '@thallesp/nestjs-better-auth';

import type { CurrentUserResponse, HealthResponse } from '@repo/shared-types';

import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @AllowAnonymous()
  health(): HealthResponse {
    return this.appService.health();
  }

  @Get('me')
  me(@Session() session: UserSession): CurrentUserResponse {
    return {
      user: {
        ...session.user,
        createdAt: session.user.createdAt.toISOString(),
        updatedAt: session.user.updatedAt.toISOString()
      }
    };
  }
}
