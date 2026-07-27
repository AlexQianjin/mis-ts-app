import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.API_PORT ?? 3000);

  app.setGlobalPrefix('api');
  app.enableCors();

  await app.listen(port);
}

void bootstrap();
