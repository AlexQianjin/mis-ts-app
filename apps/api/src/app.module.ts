import { Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { auth } from './auth.js';

@Module({
  imports: [AuthModule.forRoot({ auth })],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
