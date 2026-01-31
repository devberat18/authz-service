import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = app.get(ConfigService);

  const port = config.get<number>('app.port', 3000);
  const appName = config.get<string>('app.name');

  await app.listen(port);
  console.log(`[BOOT] ${appName} listening on port ${port}`);
}
bootstrap();
