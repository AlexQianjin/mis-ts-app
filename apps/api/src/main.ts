import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module.js';
import { migrateAuthDatabase } from './auth.js';

async function bootstrap() {
  await migrateAuthDatabase();

  const app = await NestFactory.create(AppModule, { bodyParser: false });
  const port = Number(process.env.API_PORT ?? 3000);

  app.setGlobalPrefix('api');
  app.enableCors({
    credentials: true,
    origin: process.env.WEB_ORIGIN?.trim() || 'http://localhost:5173'
  });

  await app.listen(port);
}

void bootstrap();
